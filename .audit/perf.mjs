// Hero performance probe: LCP, CLS, transferred bytes, and hero asset requests.
// Usage: node perf.mjs [url]
import { spawn } from 'node:child_process';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4180/';
const ROOT = path.resolve('.audit');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
}

const child = spawn(CHROME, [
  '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-features=Translate', '--disable-blink-features=AutomationControlled',
  `--user-agent=${UA}`, '--remote-debugging-port=9995',
  `--user-data-dir=${path.join(ROOT, 'prof-perf')}`, '--headless=new', 'about:blank',
], { stdio: 'ignore' });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(400);
  try {
    const list = await (await fetch('http://127.0.0.1:9995/json/list')).json();
    const p = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
    if (p) wsUrl = p.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) { child.kill(); throw new Error('devtools never up'); }

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener('open', res);
  ws.addEventListener('error', () => rej(new Error('ws err')));
});
const cdp = new CDP(ws);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

// Install observers before any page script runs, so LCP/CLS are captured from the start.
await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
  source: `
    window.__lcp = 0; window.__cls = 0;
    try {
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; })
        .observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  `,
});

await cdp.send('Page.navigate', { url: URL_ });
// Wait for the hero to settle: the frame sequence keeps loading for a while after load.
await sleep(12000);

const r = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const res = performance.getEntriesByType('resource');
    const heroRe = /hero-\\d|amber_|honeycomb_|blue\\d?_|\\.mp4|\\.woff2/;
    const hero = res.filter((e) => heroRe.test(e.name));
    const total = res.reduce((s, e) => s + (e.transferSize || 0), 0);
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return JSON.stringify({
      lcp: Math.round(window.__lcp),
      cls: Number(window.__cls.toFixed(4)),
      fcp: fcp ? Math.round(fcp.startTime) : null,
      requests: res.length,
      transferredKB: Math.round(total / 1024),
      heroRequests: hero.length,
      heroTransferredKB: Math.round(hero.reduce((s, e) => s + (e.transferSize || 0), 0) / 1024),
      heroSample: hero.slice(0, 3).map((e) => e.name.split('/').slice(-2).join('/')),
      docHeight: document.documentElement.scrollHeight,
    });
  })()`,
  returnByValue: true,
});

const v = JSON.parse(r.result.value);
console.log(`URL                  ${URL_}`);
console.log(`LCP                  ${v.lcp} ms`);
console.log(`FCP                  ${v.fcp} ms`);
console.log(`CLS                  ${v.cls}`);
console.log(`Total requests       ${v.requests}`);
console.log(`Total transferred    ${v.transferredKB} KB`);
console.log(`Hero/font requests   ${v.heroRequests}  (${v.heroTransferredKB} KB)`);
console.log(`Hero sample          ${v.heroSample.join(', ') || '(none)'}`);
console.log(`Document height      ${v.docHeight} px`);

ws.close();
spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });