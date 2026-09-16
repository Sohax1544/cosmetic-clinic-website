// Robust rebuild of the treatments catalogue.
// 1. strip the previously corrupted generated block from client.config.ts
// 2. move the 5 generated category files into src/data/procedures/ as real modules
// 3. import their arrays into client.config.ts and spread them into `treatments`
// No bracket-matching heuristics: TypeScript validates the objects.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'src', 'client.config.ts');
const GEN = path.join(ROOT, '.audit', 'gen');
const DEST = path.join(ROOT, 'src', 'data', 'procedures');

const TAIL = '    ] as Treatment[],';
const GEN_MARK = '      // --- generated: facialTreatments (4) ---';

let src = fs.readFileSync(CONFIG, 'utf8');
const EOL = src.includes('\r\n') ? '\r\n' : '\n';
src = src.split('\r\n').join('\n');

// --- 1. strip any corrupted generated block ---
const genStart = src.indexOf(GEN_MARK);
if (genStart !== -1) {
  const tailAfter = src.indexOf(TAIL, genStart);
  if (tailAfter === -1) throw new Error('tail marker not found');
  src = src.slice(0, genStart) + src.slice(tailAfter);
  console.log('stripped corrupted generated block');
} else {
  const shortMark = '      // --- generated:';
  const s2 = src.indexOf(shortMark);
  if (s2 !== -1) {
    const t2 = src.indexOf(TAIL, s2);
    src = src.slice(0, s2) + src.slice(t2);
    console.log('stripped generated block (generic marker)');
  } else {
    console.log('no generated block present');
  }
}

// --- 2. write category modules ---
fs.mkdirSync(DEST, { recursive: true });

const files = [
  ['facial.ts', 'facialTreatments'],
  ['longevity.ts', 'longevityTreatments'],
  ['laser.ts', 'laserTreatments'],
  ['contour.ts', 'contourTreatments'],
  ['surgical.ts', 'surgicalTreatments'],
];

const IMPORT_TYPE = "import type { Treatment } from '../../client.config';";

for (const [file, name] of files) {
  let raw = fs.readFileSync(path.join(GEN, file), 'utf8');
  raw = raw.split('\r\n').join('\n');
  // strip markdown fences if the generator added any
  raw = raw.replace(/^\s*```[a-zA-Z]*\s*\n/, '').replace(/\n```\s*$/, '');
  // drop any pre-existing import lines; we control the header
  raw = raw
    .split('\n')
    .filter((l) => !/^\s*import\s/.test(l))
    .join('\n')
    .trim();
  // drop any interface redefinitions the generator may have emitted
  raw = raw.replace(/^\s*(export\s+)?interface\s+\w+\s*\{[\s\S]*?\n\}\s*/gm, '').trim();

  if (!raw.includes(`export const ${name}`)) {
    throw new Error(`${file}: expected export const ${name}`);
  }

  const count = (raw.match(/^\s*id: "/gm) || []).length;
  fs.writeFileSync(
    path.join(DEST, file),
    `${IMPORT_TYPE}\n\n${raw}\n`,
    'utf8',
  );
  console.log(`${file}: ${count} objects -> src/data/procedures/${file}`);
}

// --- 3. wire the imports into client.config.ts ---
const importBlock =
  files.map(([file]) => {
    const name = file.replace('.ts', '');
    return `import { ${name}Treatments } from './data/procedures/${name}';`;
  }).join('\n') + '\n\n';

if (!src.startsWith('import ')) {
  src = importBlock + src;
} else {
  // insert after the last existing top-of-file import
  const lines = src.split('\n');
  let last = -1;
  for (let i = 0; i < lines.length; i++) if (/^import\s/.test(lines[i])) last = i;
  lines.splice(last + 1, 0, ...importBlock.trimEnd().split('\n'));
  src = lines.join('\n');
}
console.log('added import block');

// --- 4. spread the arrays into the treatments list ---
if (src.includes('...facialTreatments,')) {
  console.log('spreads already present');
} else {
  const insertAt = src.indexOf(TAIL, src.indexOf('    treatments: ['));
  if (insertAt === -1) throw new Error('insert point not found');
  const spreads = files
    .map(([file]) => `      ...${file.replace('.ts', '')}Treatments,`)
    .join('\n');
  src = src.slice(0, insertAt) + `      // Generated category catalogues (src/data/procedures)\n${spreads}\n` + src.slice(insertAt);
  console.log('inserted spreads');
}

fs.writeFileSync(CONFIG, EOL === '\r\n' ? src.split('\n').join('\r\n') : src);
console.log('\nconfig lines: ' + src.split('\n').length);