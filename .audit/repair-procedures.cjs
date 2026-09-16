// Repair + re-inject the generated procedure objects with a corrected extractor.
// The first attempt used raw.indexOf('['), which matched the '[' inside the type
// annotation `Treatment[]` and injected a stray `] = [` fragment.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'src', 'client.config.ts');
const GEN = path.join(ROOT, '.audit', 'gen');

let src = fs.readFileSync(CONFIG, 'utf8');
const EOL = src.includes('\r\n') ? '\r\n' : '\n';
src = src.split('\r\n').join('\n');

const GEN_MARK = '      // --- generated: facialTreatments (4) ---';
const TAIL = '    ] as Treatment[],';

// --- 1. strip the corrupted injection ---
const genStart = src.indexOf(GEN_MARK);
if (genStart !== -1) {
  const tailAfter = src.indexOf(TAIL, genStart);
  if (tailAfter === -1) throw new Error('tail marker not found after corrupted block');
  src = src.slice(0, genStart) + src.slice(tailAfter);
  console.log('stripped corrupted generated block');
} else {
  console.log('no corrupted block found (already clean)');
}

// --- 2. extract bodies correctly (skip the type annotation) ---
const files = [
  ['facial.ts', 'facialTreatments'],
  ['longevity.ts', 'longevityTreatments'],
  ['laser.ts', 'laserTreatments'],
  ['contour.ts', 'contourTreatments'],
  ['surgical.ts', 'surgicalTreatments'],
];

function extractBody(file) {
  const raw = fs.readFileSync(path.join(GEN, file), 'utf8');
  const m = raw.match(/=\s*\[/);
  if (!m) throw new Error(`${file}: '= [' not found`);
  const open = m.index + m[0].length - 1; // the '[' of the array literal
  const close = raw.lastIndexOf(']');
  if (close <= open) throw new Error(`${file}: array bounds invalid`);

  const body = raw.slice(open + 1, close);
  const trimmed = body.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    throw new Error(`${file}: extracted body is not an object list`);
  }

  const lines = body.split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;

  return lines
    .map((l) => (l.trim() ? '      ' + l.slice(min) : ''))
    .join('\n')
    .replace(/^\s*\n/, '')
    .replace(/\s+$/, '');
}

let injected = '';
let total = 0;
for (const [file, name] of files) {
  const body = extractBody(file);
  const count = (body.match(/^\s*id: "/gm) || []).length;
  if (count === 0) throw new Error(`${file}: no objects extracted`);
  total += count;
  injected += `      // --- generated: ${name} (${count}) ---\n${body}\n\n`;
  console.log(`${name}: ${count}`);
}

// --- 3. inject before the array close ---
const insertAt = src.indexOf(TAIL, src.indexOf('    treatments: ['));
if (insertAt === -1) throw new Error('insert point not found');
src = src.slice(0, insertAt) + injected + src.slice(insertAt);

fs.writeFileSync(CONFIG, EOL === '\r\n' ? src.split('\n').join('\r\n') : src);
console.log(`\ninjected ${total} generated procedures`);
console.log('final file lines: ' + src.split('\n').length);