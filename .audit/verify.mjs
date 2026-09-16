// Route + DOM assertions for the rebuilt site.
// Usage: node verify.mjs [baseUrl]
import { spawn } from 'node:child_process';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:4180';
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

const ROUTES = [
  {
    path: '/',
    checks: {
      'nav link count': 'document.querySelectorAll("header nav a").length',
      'packages section present': '!!document.querySelector("#packages")',
      'packages card count': 'document.querySelectorAll("#packages article").length',
      'press strip hidden (no real coverage)': 'document.querySelector("#press") === null',
      'results strip hidden (no consented photos)': 'document.querySelector("#results") === null',
      'hero tel: link present': '!!document.querySelector("header a[href^=\\"tel:\\"]")',
      'hero trust row items': 'document.querySelectorAll("#hero ul li").length',
      'hero h1 present': '!!document.querySelector("#hero h1")',
      'pricing section removed': 'document.querySelector("#pricing") === null',
      'pricing nav link removed': '![...document.querySelectorAll("header nav a")].some((a) => /pricing/i.test(a.textContent || ""))',
      'footer ground': '(()=>{const f=document.querySelector("footer");return f?getComputedStyle(f).backgroundColor:"no footer"})()',
      'footer secondary text contrast vs ground': '(()=>{const f=document.querySelector("footer");if(!f)return 0;const g=getComputedStyle(f).backgroundColor;const el=[...f.querySelectorAll("p,a,span")].find(e=>getComputedStyle(e).color==="rgb(163, 163, 163)");if(!el)return "no secondary text";const lum=(s)=>{const p=(s.match(/[\\d.]+/g)||[]).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*p[0]+0.7152*p[1]+0.0722*p[2]};const a=lum(g),b=lum(getComputedStyle(el).color);return ((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2)})()',
      'footer bronze contrast vs ground': '(()=>{const f=document.querySelector("footer");if(!f)return 0;const g=getComputedStyle(f).backgroundColor;const el=[...f.querySelectorAll("p,span,svg")].find(e=>getComputedStyle(e).color==="rgb(201, 168, 118)");if(!el)return "no bronze";const lum=(s)=>{const p=(s.match(/[\\d.]+/g)||[]).slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*p[0]+0.7152*p[1]+0.0722*p[2]};const a=lum(g),b=lum(getComputedStyle(el).color);return ((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2)})()',
      'section order': '[...document.querySelectorAll("section[id]")].map(s=>s.id).join(" > ")',
    },
  },
  {
    path: '/procedures',
    checks: {
      'h1': 'document.querySelector("h1")?.textContent',
      'filter buttons': 'document.querySelectorAll("button[aria-pressed]").length',
      'procedure cards': 'document.querySelectorAll("article").length',
      'all cards link to a slug': '[...document.querySelectorAll("a[href^=\\"/procedures/\\"]")].length',
      'category chip raw ids (expect 0)': '(()=>{const ids=["facial","longevity","laser","contour","surgical"];return [...document.querySelectorAll("span,div")].filter(el=>ids.includes((el.textContent||"").trim())).length})()',
      'authoring copy leaked (expect 0)': '(document.body.innerText.match(/in client\\.config|Add src|Add image via config/g)||[]).length',
      'tonal plates (18 expected)': 'document.querySelectorAll("div[class*=\\"bg-[#EFECE6]\\"]").length',
      'title': 'document.title',
    },
  },
  {
    path: '/procedures/rhinoplasty',
    checks: {
      'h1': 'document.querySelector("h1")?.textContent',
      'tel: link present': '!!document.querySelector("a[href^=\\"tel:\\"]")',
      'fact labels': '[...document.querySelectorAll("article section div")].length > 0',
      'before/after figures': 'document.querySelectorAll("figure").length',
      'slider present (role=slider)': 'document.querySelectorAll("[role=\\"slider\\"]").length',
      'sample disclaimer text count': '(document.body.innerText.match(/SAMPLE IMAGES/g)||[]).length',
      'pending-consent placeholder text (expect 0)': '(document.body.innerText.match(/pending written consent/g)||[]).length',
      'no duplicated price label': '!document.body.innerText.includes("Starting from")',
      'authoring copy leaked into UI (expect 0)': '(document.body.innerText.match(/in client\\.config|Add src|Add image via config/g)||[]).length',
      // Checks the actual defect signature — an element whose WHOLE text is a raw category id
      // like "facial" — rather than any uppercase occurrence. Two earlier versions of this
      // check were false positives: "SURGICAL" is itself the surgical label, and a process
      // step's title legitimately contains the word "facial".
      'category chip raw ids (expect 0)': '(()=>{const ids=["facial","longevity","laser","contour","surgical"];return [...document.querySelectorAll("span,div")].filter(el=>ids.includes((el.textContent||"").trim())).length})()',
      'overview eyebrow removed (expect 0)': '(document.body.innerText.match(/^OVERVIEW$/gm)||[]).length',
      'slider + suitable-for share one section': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.querySelector("figure")&&x.textContent.includes("Suitable for"));return !!s})()',
      'black bands remaining (expect 1 = closing CTA)': '[...document.querySelectorAll("section")].filter(s=>getComputedStyle(s).backgroundColor==="rgb(10, 10, 10)").length',
      'comparison chapter ground': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.querySelector("figure"));return s?getComputedStyle(s).backgroundColor:"not found"})()',
      'benefits inside comparison chapter': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.querySelector("figure"));return s?s.textContent.includes("What it helps with"):false})()',
      'rail cards in comparison chapter (expect 3)': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.querySelector("figure"));return s?s.querySelectorAll("div[class*=\\"bg-[#FAF8F5]\\"]").length:0})()',
      'process steps (expect 5)': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.textContent.startsWith("What happens"));return s?s.querySelectorAll("h3").length:0})()',
      'process step media slots (expect 5)': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.textContent.startsWith("What happens"));return s?s.querySelectorAll("div[class*=\\"aspect-\\"]").length:0})()',
      'gallery tile width px (was ~245)': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.textContent.startsWith("Clinic & Treatment"));if(!s)return 0;const d=s.querySelector("div[class*=\\"aspect-\\"]");return d?Math.round(d.getBoundingClientRect().width):0})()',
      'physician card beside FAQs': '(()=>{const s=[...document.querySelectorAll("section")].find(x=>x.textContent.includes("Common Questions"));return s?s.textContent.includes("Your Physician"):false})()',
      'procedure card media slots': 'document.querySelectorAll("article div[class*=\\"aspect-\\"]").length',
      'rail card height px': '(()=>{const a=[...document.querySelectorAll("article aside")].find(x=>x.textContent.includes("Suitable for"));return a?Math.round(a.getBoundingClientRect().height):0})()',
      'comparison column height px': '(()=>{const f=document.querySelector("article figure");return f?Math.round(f.parentElement.getBoundingClientRect().height):0})()',
      'faq details blocks': 'document.querySelectorAll("details").length',
      'related procedure links': 'document.querySelectorAll("a[href^=\\"/procedures/\\"]").length',
      'title': 'document.title',
    },
  },
  {
    path: '/procedures/does-not-exist',
    checks: {
      'renders 404 copy': 'document.body.innerText.includes("couldn\\u2019t find that page")',
      'recovery link present': '!!document.querySelector("a[href=\\"/procedures\\"]")',
      'title': 'document.title',
    },
  },
];

async function run(route, port) {
  const child = spawn(CHROME, [
    '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-features=Translate', '--disable-blink-features=AutomationControlled',
    `--user-agent=${UA}`, `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(ROOT, 'prof-verify-' + port)}`, '--headless=new', 'about:blank',
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
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: BASE + route.path });
  await sleep(5500);

  // Scroll through so lazy sections mount, then return to the top for measurement.
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.documentElement.scrollHeight)' });
  await sleep(2000);
  await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(800);

  console.log(`\n=== ${route.path} ===`);
  for (const [name, expr] of Object.entries(route.checks)) {
    const r = await cdp.send('Runtime.evaluate', { expression: `String(${expr})`, returnByValue: true });
    const value = r.exceptionDetails ? 'ERROR' : r.result.value;
    console.log(`  ${name.padEnd(44)} ${value}`);
  }

  ws.close();
  spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
}

let port = 9960;
for (const route of ROUTES) {
  try {
    await run(route, port++);
  } catch (e) {
    console.log(`FAIL ${route.path}: ${e.message}`);
  }
  await sleep(300);
}