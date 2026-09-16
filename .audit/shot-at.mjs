// Screenshot a specific element by selector.
// Usage: node shot-at.mjs name=url[#selector] [name=url[#selector] ...]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve('.audit');
const OUT = path.join(ROOT, 'slices');
fs.mkdirSync(OUT, { recursive: true });

const W = 1440, H = 1000;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = process.argv.slice(2).map((a) => {
  const i = a.indexOf('=');
  const raw = a.slice(i + 1);
  const h = raw.indexOf('#');
  return {
    name: a.slice(0, i),
    url: h === -1 ? raw : raw.slice(0, h),
    selector: h === -1 ? null : raw.slice(h),
  };
});

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

async function shoot(name, url, selector, port) {
  const child = spawn(CHROME, [
    '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-features=Translate', '--disable-blink-features=AutomationControlled',
    `--user-agent=${UA}`, `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(ROOT, 'prof-at-' + name)}`, '--headless=new', 'about:blank',
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await sleep(400);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
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
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: W, height: H, deviceScaleFactor: 1, mobile: false,
  });

  await cdp.send('Page.navigate', { url });
  await sleep(6000);

  let info = 'full-page';
  if (selector) {
    // Scroll the whole page once so lazy sections mount, then target the selector.
    await cdp.send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, document.documentElement.scrollHeight)',
    });
    await sleep(2500);
    const r = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return 'MISSING';
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
        const rect = el.getBoundingClientRect();
        return JSON.stringify({ top: Math.round(rect.top), h: Math.round(rect.height) });
      })()`,
      returnByValue: true,
    });
    info = r.result.value;
    await sleep(1800);
  } else {
    await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });
    await sleep(1500);
  }

  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(shot.data, 'base64'));

  ws.close();
  spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  return info;
}

let port = 9900;
for (const t of targets) {
  try {
    const info = await shoot(t.name, t.url, t.selector, port++);
    console.log(`OK   ${t.name.padEnd(16)} ${info}`);
  } catch (e) {
    console.log(`FAIL ${t.name.padEnd(16)} ${e.message}`);
  }
  await sleep(400);
}
