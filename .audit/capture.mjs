// One batched capture round for the impeccable finish review.
// Writes .impeccable/review/desktop.png, mobile.png, plus region crops.
// Usage: node capture.mjs [baseUrl]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:4180';
const OUT = path.resolve('.impeccable/review');
const PROF = path.resolve('.audit/prof-capture');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT, { recursive: true });

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
  `--user-agent=${UA}`, '--remote-debugging-port=9997',
  `--user-data-dir=${PROF}`, '--headless=new', 'about:blank',
], { stdio: 'ignore' });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(400);
  try {
    const list = await (await fetch('http://127.0.0.1:9997/json/list')).json();
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

async function setViewport(width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 640 });
}

async function goto(url, settle = 5000) {
  await cdp.send('Page.navigate', { url });
  await sleep(settle);
  // Settle every entrance animation: walk the page, then return to the top.
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.documentElement.scrollHeight)' });
  await sleep(2200);
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(1200);
}

async function shot(name) {
  const r = await cdp.send('Page.captureScreenshot', { format: 'png' });
  const file = path.join(OUT, name);
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  const kb = Math.round(fs.statSync(file).size / 1024);
  const dims = await cdp.send('Runtime.evaluate', {
    expression: '`${window.innerWidth}x${window.innerHeight}`', returnByValue: true,
  });
  console.log(`OK  ${name.padEnd(26)} ${dims.result.value.padEnd(10)} ${kb} KB`);
}

async function fullPage(name) {
  const m = await cdp.send('Page.getLayoutMetrics');
  const { width, height } = m.cssContentSize;
  const r = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  const file = path.join(OUT, name);
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`OK  ${name.padEnd(26)} ${`${Math.round(width)}x${Math.round(height)}`.padEnd(10)} ${kb} KB`);
}

// 1. Home, desktop
await setViewport(1440, 900);
await goto(BASE + '/');
await fullPage('desktop.png');
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(700);

// Objective header contrast probe: the wordmark/nav sit over the dark hero at scroll 0,
// so read their real computed colours instead of judging the screenshot by eye.
const probe = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const h = document.querySelector('header');
    if (!h) return 'no header';
    const nav = h.querySelector('nav a');
    const brand = h.querySelector('a span');
    const tel = h.querySelector('a[href^="tel:"]');
    const color = (el) => (el ? getComputedStyle(el).color : 'n/a');
    const lum = (rgb) => {
      const p = (rgb.match(/[\\d.]+/g) || []).slice(0, 3).map(Number).map((v) => {
        v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
    };
    const ratio = (a, b) => {
      const l1 = lum(a), l2 = lum(b);
      return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
    };
    return JSON.stringify({
      headerText: getComputedStyle(h).color,
      brand: color(brand),
      nav: color(nav),
      tel: color(tel),
      brandVsInk: ratio(color(brand), 'rgb(10, 10, 10)'),
      navVsInk: ratio(color(nav), 'rgb(10, 10, 10)'),
    });
  })()`,
  returnByValue: true,
});
console.log('header probe:', probe.result.value);

await shot('hero-desktop.png');

// Footer, at the bottom of the home page. Its ground is the one surface that must read as
// clearly not-the-page, so it gets its own capture rather than being judged from a
// downscaled full-page image.
await cdp.send('Runtime.evaluate', {
  // scroll-behavior is smooth in the stylesheet, so a plain scrollTo(0, scrollHeight)
  // animates and has not arrived after 700ms on a 10k-pixel page. Force it to jump.
  expression: `(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,document.body.scrollHeight);return Math.round(window.scrollY)+'/'+Math.round(document.body.scrollHeight)})()`,
  returnByValue: true,
});
await sleep(700);
await shot('footer-desktop.png');
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(300);

// 2. Home, mobile
await setViewport(390, 844);
await goto(BASE + '/');
await fullPage('mobile.png');
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(700);
await shot('hero-mobile.png');

// 3. Procedures index, desktop
await setViewport(1440, 900);
await goto(BASE + '/procedures');
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(700);
await shot('procedures-desktop.png');

// 4. One procedure page, desktop
await goto(BASE + '/procedures/rhinoplasty');
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(700);
await shot('procedure-desktop.png');

// 4b. The same procedure page in full, then section by section. One tall image gets
// downscaled past legibility, so each restructured block also gets its own viewport shot.
await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await sleep(400);
await fullPage('procedure-full.png');

const sections = await cdp.send('Runtime.evaluate', {
  expression: `JSON.stringify([...document.querySelectorAll('article section')].map(s => s.textContent.trim().slice(0, 22)))`,
  returnByValue: true,
});
const sectionNames = JSON.parse(sections.result.value);
console.log('procedure sections:', sectionNames.join(' | '));
for (let i = 0; i < sectionNames.length; i++) {
  await cdp.send('Runtime.evaluate', {
    // 72px clears the fixed header so the section's own top edge is visible.
    expression: `window.scrollTo(0, document.querySelectorAll('article section')[${i}].offsetTop - 72)`,
  });
  await sleep(450);
  await shot(`procedure-s${i + 1}.png`);
}

// 4b. The before/after comparison, with the slider moved by keyboard (also proves the
// handle is genuinely operable rather than a static picture).
const moved = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const handle = document.querySelector('figure [role="slider"]');
    if (!handle) return 'no slider handle on page';
    handle.focus();
    for (let i = 0; i < 6; i++) {
      handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    }
    return 'dispatched 6 ArrowRight presses';
  })()`,
  returnByValue: true,
});
console.log('slider keyboard:', moved.result.value);
await sleep(600);
const pos = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const h = document.querySelector('figure [role="slider"]');
    if (h) h.scrollIntoView({ block: 'center' });
    return h ? 'aria-valuenow=' + h.getAttribute('aria-valuenow') + '%' : 'gone';
  })()`,
  returnByValue: true,
});
console.log('slider position:', pos.result.value);
await sleep(900);
await shot('beforeafter-desktop.png');

// 5. Quick-view dialog, opened from the home treatments grid
await goto(BASE + '/');
const open = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const grid = document.querySelector('#treatments');
    if (!grid) return 'no #treatments';
    // The dialog opens from the card image / title (not from a <button>).
    const img = grid.querySelector('img[class*="object-cover"]');
    if (!img) return 'no card image';
    img.click();
    return 'clicked card image: ' + (img.getAttribute('alt') || '');
  })()`,
  returnByValue: true,
});
console.log('dialog trigger:', open.result.value);
await sleep(2500);
const hasDialog = await cdp.send('Runtime.evaluate', {
  expression: `(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return 'NOT OPEN';
    return 'open: ' + (d.getAttribute('aria-label') || '');
  })()`,
  returnByValue: true,
});
console.log('dialog state:', hasDialog.result.value);
await shot('dialog-desktop.png');

ws.close();
spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });