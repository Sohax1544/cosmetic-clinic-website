// Viewport-accurate screenshot slicer w/ bot-wall handling.
// Usage: HEADED=1 node shot.mjs name=url [name=url ...]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve('.audit');
const OUT = path.join(ROOT, 'slices');
fs.mkdirSync(OUT, { recursive: true });

const W = 1440, H = 900, MAX_SLICES = 7;
const HEADED = !!process.env.HEADED;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      } else if (m.method && this.handlers.has(m.method)) this.handlers.get(m.method)(m.params);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
  on(m, fn) { this.handlers.set(m, fn); }
  once(m, timeout = 30000) {
    return new Promise((res) => {
      const t = setTimeout(() => res(false), timeout);
      this.on(m, () => { clearTimeout(t); res(true); });
    });
  }
}

const WALL = /verif|just a moment|checking your browser|attention required|enable javascript|cf-browser/i;

async function state(cdp) {
  const r = await cdp.send('Runtime.evaluate', {
    expression: 'JSON.stringify({h:document.documentElement.scrollHeight,t:document.title,x:(document.body.innerText||"").slice(0,400)})',
    returnByValue: true,
  });
  return JSON.parse(r.result.value);
}

/** Wait until the bot wall clears: page grows and no challenge text remains. */
async function waitClear(cdp, budgetMs) {
  const deadline = Date.now() + budgetMs;
  let last = null;
  while (Date.now() < deadline) {
    last = await state(cdp);
    if (last.h > 1200 && !WALL.test(last.x) && !WALL.test(last.t)) return { ok: true, ...last };
    await sleep(1500);
  }
  return { ok: false, ...(last || { h: 0, t: '', x: '' }) };
}

async function shoot(name, url, port) {
  const args = [
    '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-features=Translate',
    '--disable-blink-features=AutomationControlled',
    `--user-agent=${UA}`,
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(ROOT, 'prof-' + name)}`,
  ];
  if (HEADED) args.push('--window-position=-2600,-2600', `--window-size=${W},${H}`);
  else args.push('--headless=new');
  args.push('about:blank');

  const child = spawn(CHROME, args, { stdio: 'ignore' });

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

  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url });
  await loaded;

  const clear = await waitClear(cdp, 45000);
  await sleep(3000);

  const pageH = (await state(cdp)).h;
  for (let y = 0; y < pageH; y += H) {
    await cdp.send('Runtime.evaluate', { expression: `window.scrollTo(0,${y})` });
    await sleep(450);
  }
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });
  await sleep(2000);

  const slices = Math.min(MAX_SLICES, Math.max(1, Math.ceil(pageH / H)));
  for (let i = 0; i < slices; i++) {
    await cdp.send('Runtime.evaluate', { expression: `window.scrollTo(0,${i * H})` });
    await sleep(900);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT, `${name}-${String(i).padStart(2, '0')}.png`), Buffer.from(shot.data, 'base64'));
  }
  ws.close();
  spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  return { pageH, slices, wall: !clear.ok };
}

let port = 9800;
for (const t of targets) {
  try {
    const r = await shoot(t.name, t.url, port++);
    console.log(`${r.wall ? 'WALL' : 'OK  '} ${t.name.padEnd(14)} pageH=${r.pageH}px slices=${r.slices}`);
  } catch (e) {
    console.log(`FAIL ${t.name.padEnd(14)} ${e.message}`);
  }
  await sleep(500);
}