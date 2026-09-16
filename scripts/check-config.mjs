// Validates the plug-and-play contract of client.config.ts.
//
// Adding a procedure is meant to be "drop an object in and it works". These are the
// silent ways that can still go wrong — a duplicate slug that steals another page's
// URL, an id that no longer matches its slug, a featured price that never appears, or
// a footer link pointing at a page that does not exist. Run with: npm run check
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONFIG = path.join(ROOT, 'src', 'client.config.ts');
const DATA_DIR = path.join(ROOT, 'src', 'data', 'procedures');

const problems = [];
const notes = [];

const read = (file) => fs.readFileSync(file, 'utf8');
const label = (file) => path.basename(file);

/** Parse `id` / `slug` / `title` in source order within a treatments region. */
function parseEntries(file) {
  const source = read(file);
  const entries = [];
  const re = /^\s*id:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",/gm;
  let m;
  while ((m = re.exec(source)) !== null) {
    entries.push({ id: m[1], slug: m[2], title: m[3], file, index: m.index });
  }
  return entries;
}

/** First `category: "..."` occurring after this entry's id. */
function categoryOf(entry) {
  const source = read(entry.file);
  const after = source.slice(entry.index);
  const m = after.match(/category:\s*"([a-z]+)"/);
  return m ? m[1] : null;
}

const configSource = read(CONFIG);
const dataFiles = fs.existsSync(DATA_DIR)
  ? fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts')).map((f) => path.join(DATA_DIR, f))
  : [];

// The legacy entries live in client.config.ts itself; the generated ones live in
// src/data/procedures. Both belong to the same catalogue.
const legacy = parseEntries(CONFIG);
const generated = dataFiles.flatMap((file) => {
  const entries = parseEntries(file);
  if (entries.length === 0) problems.push(`${label(file)}: no procedure objects found — did the file shape change?`);
  return entries;
});
const all = [...legacy, ...generated];

if (all.length === 0) {
  problems.push('no procedures found at all — the parser or the config shape changed');
  console.error(problems.join('\n'));
  process.exit(1);
}

// 1. id must equal slug. They are two keys for the same procedure, and a mismatch
//    makes featured lists and lookups fail silently.
for (const e of all) {
  if (e.id !== e.slug) {
    problems.push(`${label(e.file)}: id "${e.id}" does not match slug "${e.slug}" (${e.title})`);
  }
}

// 2. slugs must be unique — duplicates mean one procedure's URL is unreachable.
const bySlug = new Map();
for (const e of all) {
  if (bySlug.has(e.slug)) {
    problems.push(`duplicate slug "${e.slug}" in ${label(e.file)} and ${label(bySlug.get(e.slug).file)}`);
  } else {
    bySlug.set(e.slug, e);
  }
}

// 3. every id referenced by featuredIds must exist.
const featuredBlock = configSource.match(/featuredIds:\s*\[([\s\S]*?)\]/);
if (featuredBlock) {
  const ids = [...featuredBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    if (!bySlug.has(id)) problems.push(`pricingSection.featuredIds references "${id}" which is not a procedure slug`);
  }
  notes.push(`featuredIds: ${ids.length} entries, ${ids.filter((i) => bySlug.has(i)).length} resolved`);
}

// 4. every hard-coded /procedures/<slug> reference must resolve to a real procedure.
for (const file of [CONFIG, ...dataFiles]) {
  for (const m of read(file).matchAll(/["'`]\/procedures\/([a-z0-9-]+)["'`]/g)) {
    if (!bySlug.has(m[1])) {
      problems.push(`${label(file)}: links to /procedures/${m[1]} but no procedure has that slug`);
    }
  }
}

// 5. required fields present on every entry.
const requiredFields = ['subtitle', 'category', 'description', 'duration', 'downtime', 'priceGuide'];
const fileCache = new Map();
for (const e of all) {
  if (!fileCache.has(e.file)) fileCache.set(e.file, read(e.file));
  const source = fileCache.get(e.file);
  const next = source.indexOf('\n    {', e.index + 1);
  const slice = source.slice(e.index, next === -1 ? source.length : next);
  for (const field of requiredFields) {
    if (!new RegExp(`\\b${field}:`).test(slice)) {
      problems.push(`${label(e.file)}: "${e.title}" is missing required field "${field}"`);
    }
  }
}

// 6. categories used must be declared in treatmentsSection.categories.
const declared = new Set(
  [...configSource.matchAll(/\{\s*id:\s*"(facial|longevity|laser|contour|surgical)",\s*label:/g)].map((m) => m[1]),
);
if (declared.size === 0) {
  problems.push('treatmentsSection.categories: could not read any category ids');
}
for (const e of all) {
  const category = categoryOf(e);
  if (!category) {
    problems.push(`${label(e.file)}: "${e.title}" has no category`);
  } else if (!declared.has(category)) {
    problems.push(`${label(e.file)}: "${e.title}" uses category "${category}" which is not in treatmentsSection.categories`);
  }
}

// 7. every package must reference procedures that exist.
const packagesBlock = configSource.match(/packages:\s*\{([\s\S]*?)\r?\n  \},\r?\n/);
if (packagesBlock) {
  const itemCount = (packagesBlock[1].match(/^\s+id:\s*"/gm) || []).length;
  for (const m of packagesBlock[1].matchAll(/treatmentIds:\s*\[([^\]]*)\]/g)) {
    for (const id of [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])) {
      if (!bySlug.has(id)) {
        problems.push(`packages: treatmentIds references "${id}" which is not a procedure id`);
      }
    }
  }
  notes.push(`packages: ${itemCount} items`);
} else {
  problems.push('packages block not found — did the config shape change?');
}

// 8. press entries must carry a name, since the strip renders wordmarks from it.
const pressBlock = configSource.match(/press:\s*\{([\s\S]*?)\r?\n  \},\r?\n/);
if (pressBlock) {
  const itemsBlock = pressBlock[1].match(/items:\s*\[([\s\S]*?)\]/);
  const entries = itemsBlock ? itemsBlock[1].trim() : '';
  if (entries.length === 0) {
    notes.push('press: empty (strip hidden by design)');
  } else {
    const braces = (entries.match(/\{/g) || []).length;
    const names = (entries.match(/name:\s*"/g) || []).length;
    if (braces !== names) {
      problems.push(`press: ${braces} entries but only ${names} have a "name"`);
    }
    notes.push(`press: ${braces} outlet(s)`);
  }
} else {
  problems.push('press block not found — did the config shape change?');
}

// --- report ---
const counts = {};
for (const e of all) {
  const c = categoryOf(e) || 'unknown';
  counts[c] = (counts[c] || 0) + 1;
}

console.log(`Procedures: ${all.length} total (${legacy.length} in client.config.ts, ${generated.length} in src/data/procedures)`);
console.log('By category: ' + Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(', '));
for (const n of notes) console.log(n);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}

console.log('\nConfig OK.');