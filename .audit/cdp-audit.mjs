// Headless-Chrome CDP design extractor. Usage: node cdp-audit.mjs name=url [name=url ...]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve('.audit');
const extractSrc = fs.readFileSync(path.join(ROOT, 'extract.js'), 'utf8');
const targets = process.argv.slice(2).map((a) => {
  const i = a.indexOf('=');
  return { name: a.slice(0, i), url: a.slice(i + 1) };
});

class CDP {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = new Map();
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      } else if (m.method && this.handlers.has(m.method)) {
        this.handlers.get(m.method)(m.params);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
  on(method, fn) { this.handlers.set(method, fn); }
  once(method, timeout) {
    return new Promise((res) => {
      const t = setTimeout(() => res(false), timeout || 20000);
      this.on(method, () => { clearTimeout(t); res(true); });
    });
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function audit(name, url, port) {
  const profile = path.join(ROOT, `prof-${name}`);
  const child = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--no-default-browser-check', '--disable-features=Translate,OptimizationHints',
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--window-size=1440,1000', 'about:blank',
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await sleep(400);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) wsUrl = page.webSocketDebuggerUrl;
    } catch (e) { /* not up yet */ }
  }
  if (!wsUrl) { child.kill(); throw new Error('chrome devtools never came up'); }

  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res);
    ws.addEventListener('error', () => rej(new Error('ws error')));
  });
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  const loaded = cdp.once('Page.loadEventFired', 25000);
  await cdp.send('Page.navigate', { url });
  await loaded;
  await sleep(4500); // let hero animations / lazy content settle

  const out = await cdp.send('Runtime.evaluate', {
    expression: extractSrc, returnByValue: true, awaitPromise: false,
  });
  if (out.exceptionDetails) throw new Error(JSON.stringify(out.exceptionDetails).slice(0, 400));

  fs.writeFileSync(path.join(ROOT, `${name}.json`), JSON.stringify(out.result.value, null, 2));
  ws.close();
  spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  return out.result.value;
}

let port = 9500;
for (const t of targets) {
  try {
    const d = await audit(t.name, t.url, port++);
    const secs = d.sections.length;
    console.log(`OK   ${t.name.padEnd(11)} h=${d.viewport.scrollH}px  sections=${secs}  ctas=${d.ctaCount}  imgs=${d.media.imgs}  fonts=${[...new Set(d.headings.map(h=>h.font))].slice(0,3).join('/')}`);
  } catch (e) {
    console.log(`FAIL ${t.name.padEnd(11)} ${e.message}`);
  }
  await sleep(600);
}
