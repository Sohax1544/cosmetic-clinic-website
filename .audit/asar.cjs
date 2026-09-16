const fs = require('fs');
const path = require('path');

const ASAR = 'C:\\Users\\Ace\\AppData\\Local\\Programs\\DSH Desktop\\resources\\app.asar';
const OUT = path.resolve('.audit/extracted');
fs.mkdirSync(OUT, { recursive: true });

const buf = fs.readFileSync(ASAR);
const pickleSize = buf.readUInt32LE(4);
const jsonSize = buf.readUInt32LE(8);
const header = JSON.parse(buf.toString('utf8', 16, 16 + jsonSize));
const base = 8 + pickleSize;

const hits = [];
(function walk(node, prefix) {
  for (const [name, entry] of Object.entries(node.files || {})) {
    const p = prefix ? prefix + '/' + name : name;
    if (entry.files) walk(entry, p);
    else hits.push({ p, entry });
  }
})(header, '');

const want = hits.filter((h) => /pi-ai/i.test(h.p));
console.log('pi-ai entries: ' + want.length);
want.forEach((h) => console.log('  ' + h.p + '  size=' + h.entry.size));

const keep = want.filter((h) => /\.(js|ts|json)$/.test(h.p) && !/\.map$/.test(h.p));
for (const h of keep) {
  const start = base + Number(h.entry.offset);
  const data = buf.subarray(start, start + h.entry.size);
  const dest = path.join(OUT, h.p.replace(/[\\/]/g, '__'));
  fs.writeFileSync(dest, data);
  console.log('wrote ' + dest + ' (' + h.entry.size + ' bytes)');
}

// grep extracted for modality keys
console.log('\n===== modality keys in pi-ai sources =====');
for (const f of fs.readdirSync(OUT)) {
  const t = fs.readFileSync(path.join(OUT, f), 'latin1');
  for (const key of ['inputModalities', 'modalities', 'imagePixelBudget', 'imageMaxBytes']) {
    let i = -1, c = 0;
    while ((i = t.indexOf(key, i + 1)) !== -1) c++;
    if (c) console.log(f + ' :: ' + key + ' x' + c);
  }
}
