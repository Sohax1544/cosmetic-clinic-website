// Merge the 21 generated procedure objects into src/client.config.ts
// - adds slugs + Dubai currency + Dubai practitioners to the 3 kept legacy entries
// - removes the 3 legacy entries whose ids did not match their titles (and which
//   duplicate the generated facelift / laser-hair-removal / rhinoplasty content)
// - appends the generated category arrays as spread elements
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'src', 'client.config.ts');
const GEN = path.join(ROOT, '.audit', 'gen');

let src = fs.readFileSync(CONFIG, 'utf8');
// Normalise CRLF so the markers below match regardless of how the file was saved.
const EOL = src.includes('\r\n') ? '\r\n' : '\n';
src = src.split('\r\n').join('\n');

const report = [];
function sub(from, to, label) {
  if (!src.includes(from)) throw new Error(`marker not found: ${label}`);
  src = src.replace(from, to);
  report.push(`ok: ${label}`);
}

// --- 1. slugs + AED pricing + Dubai practitioners on the 3 kept legacy entries ---
sub(
  `        id: "facial-harmonization",\n        title: "Chemical Peeling",`,
  `        id: "facial-harmonization",\n        slug: "chemical-peeling",\n        title: "Chemical Peeling",`,
  'slug chemical-peeling',
);
sub(
  `        id: "polynucleotide-matrix",\n        title: "HydraFacial",`,
  `        id: "polynucleotide-matrix",\n        slug: "hydrafacial",\n        title: "HydraFacial",`,
  'slug hydrafacial',
);
sub(
  `        id: "hybrid-laser-resurfacing",\n        title: "Laser Skin Rejuvenation",`,
  `        id: "hybrid-laser-resurfacing",\n        slug: "laser-skin-rejuvenation",\n        title: "Laser Skin Rejuvenation",`,
  'slug laser-skin-rejuvenation',
);

sub('priceGuide: "From $120",', 'priceGuide: "From AED 700",', 'AED peel price');
sub('priceGuide: "From $180",', 'priceGuide: "From AED 750",', 'AED hydrafacial price');
sub('priceGuide: "From $250",', 'priceGuide: "From AED 1,400",', 'AED laser price');

sub(
  `            name: "Dr. Elena Vance, MBChB, MRCP",\n            role: "Medical Director & Lead Aesthetic Physician",`,
  `            name: "Dr. Layla Rahman, MBBS, MSc (Derm)",\n            role: "Dermatologist & Laser Physician",`,
  'practitioner peel',
);
sub(
  `            name: "Dr. Sophia Chen, MBBS, MSc (Derm)",\n            role: "Senior Regenerative Dermatologist",`,
  `            name: "Dr. Aisha Al Mansoori, MD",\n            role: "Aesthetic Physician",`,
  'practitioner hydrafacial',
);
sub(
  `        name: "Dr. Marcus Sterling, FRCS (Plast)",\n        role: "Consultant Aesthetic Surgeon",`,
  `        name: "Dr. Layla Rahman, MBBS, MSc (Derm)",\n        role: "Dermatologist & Laser Physician",`,
  'practitioner laser',
);

// --- 2. drop the 3 mismatched legacy entries (duplicates of generated content) ---
const dupeStart = src.indexOf(`      {\n        id: "botulinum-micro-tox",`);
if (dupeStart === -1) throw new Error('duplicate start marker not found');
const tailMarker = `    ] as Treatment[],`;
const tailIdx = src.indexOf(tailMarker, dupeStart);
if (tailIdx === -1) throw new Error('treatments close marker not found');
src = src.slice(0, dupeStart) + src.slice(tailIdx);
report.push('removed 3 mismatched legacy entries');

// --- 3. append generated objects ---
const files = [
  ['facial.ts', 'facialTreatments'],
  ['longevity.ts', 'longevityTreatments'],
  ['laser.ts', 'laserTreatments'],
  ['contour.ts', 'contourTreatments'],
  ['surgical.ts', 'surgicalTreatments'],
];

function extractBody(file) {
  const raw = fs.readFileSync(path.join(GEN, file), 'utf8');
  const open = raw.indexOf('[');
  const close = raw.lastIndexOf(']');
  if (open === -1 || close === -1) throw new Error(`${file}: array not found`);

  const body = raw.slice(open + 1, close);
  const lines = body.split(/\r?\n/);

  // normalise indentation: strip common leading whitespace, re-indent by 6 spaces
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^[ \t]*/)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;

  return lines
    .map((l) => (l.trim().length === 0 ? '' : '      ' + l.slice(min)))
    .join('\n')
    .replace(/^\s*\n/, '')
    .replace(/\s+$/, '');
}

let injected = '';
for (const [file, name] of files) {
  const body = extractBody(file);
  const count = (body.match(/^\s*id: "/gm) || []).length;
  if (count === 0) throw new Error(`${file}: no objects extracted`);
  injected += `\n      // --- generated: ${name} (${count}) ---\n${body}\n`;
  report.push(`${name}: ${count} objects`);
}

const insertAt = src.indexOf(tailMarker, dupeStart === -1 ? 0 : src.indexOf('    treatments: ['));
if (insertAt === -1) throw new Error('insert point not found');
src = src.slice(0, insertAt) + injected + '\n' + src.slice(insertAt);

fs.writeFileSync(CONFIG, EOL === '\r\n' ? src.split('\n').join('\r\n') : src);
console.log(report.join('\n'));
console.log('\nfinal file lines: ' + src.split('\n').length);
