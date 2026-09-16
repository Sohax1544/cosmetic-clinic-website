// Horizontal-overflow / nav-fit check across viewports.
// A 6-item nav can overflow a fixed header before it wraps, so this measures
// document horizontal overflow and header content width at each breakpoint.
import { spawn } from 'node:child_process';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:4180';
const ROOT = path.resolve('.audit');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const WIDTHS = [1440, 1280, 1180, 1024, 900, 820, 768, 640, 480, 390];

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
  `--user-agent=${UA}`, '--remote-debugging-port=9990',
  `--user-data-dir=${path.join(ROOT, 'prof-overflow')}`, '--headless=new', 'about:blank',
], { stdio: 'ignore' });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(400);
  try {
    const list = await (await fetch('http://127.0.0.1:9990/json/list')).json();
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

for (const route of ['/', '/procedures', '/procedures/rhinoplasty']) {
  console.log(`\n=== ${route} ===`);
  console.log('  width  docOverflow  headerOverflow  navVisible  navLinks  clipped');
  for (const width of WIDTHS) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Page.navigate', { url: BASE + route });
    await sleep(2500);
    const r = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const de = document.documentElement;
        const header = document.querySelector('header');
        const nav = header?.querySelector('nav');
        const navStyle = nav ? getComputedStyle(nav) : null;
        const navVisible = navStyle ? navStyle.display !== 'none' : false;
        const navLinks = nav ? nav.querySelectorAll('a').length : 0;
        const inner = header?.firstElementChild;
        const headerOverflow = inner ? Math.max(0, inner.scrollWidth - inner.clientWidth) : 0;
        // does any header child stick out past the viewport?
        let clipped = false;
        if (inner) {
          const limit = window.innerWidth;
          for (const el of inner.querySelectorAll('*')) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && (rect.right > limit + 1 || rect.left < -1)) clipped = true;
          }
        }
        return JSON.stringify({
          docOverflow: Math.max(0, de.scrollWidth - de.clientWidth),
          headerOverflow,
          navVisible,
          navLinks,
          clipped,
        });
      })()`,
      returnByValue: true,
    });
    const v = JSON.parse(r.result.value);
    const flag = v.docOverflow > 0 || v.headerOverflow > 0 || v.clipped ? '  <-- PROBLEM' : '';
    console.log(
      `  ${String(width).padEnd(6)} ${String(v.docOverflow).padEnd(12)} ${String(v.headerOverflow).padEnd(15)} ${String(v.navVisible).padEnd(11)} ${String(v.navLinks).padEnd(9)} ${String(v.clipped).padEnd(8)}${flag}`,
    );
  }
}

ws.close();
spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });