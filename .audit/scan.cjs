const fs = require('fs');
const buf = fs.readFileSync('C:\\Users\\Ace\\AppData\\Local\\Programs\\DSH Desktop\\resources\\app.asar');
const s = buf.toString('latin1');
const pats = ['llm-pi-ai', 'openai-completions', 'imagePixelBudget'];
for (const pat of pats) {
  const idx = [];
  let i = -1;
  while ((i = s.indexOf(pat, i + 1)) !== -1) idx.push(i);
  console.log('===== ' + pat + ' : ' + idx.length + ' hits =====');
  if (idx.length) console.log('first=' + idx[0] + ' last=' + idx[idx.length - 1]);
}
// dump region around first openai-completions schema
const oc = s.indexOf('openai-completions');
console.log('\n===== openai-completions region =====');
console.log(s.slice(Math.max(0, oc - 3000), oc + 3000).replace(/\s+/g, ' '));
