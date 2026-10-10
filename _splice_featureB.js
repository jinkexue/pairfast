const fs = require('fs');
const path = 'G:/code/round/bundle.js';
const replPath = 'G:/code/round/_featureB_replacement.js';
const src = fs.readFileSync(path, 'utf8');
const repl = fs.readFileSync(replPath, 'utf8').replace(/\r\n/g, '\n');
const startMarker = '  // --------------------------------------------------------------------------\n  // 5. Feature B: Activity Teamup System\n  // --------------------------------------------------------------------------';
const endMarker = '  function renderGameCategoryModal(onSaved) {';
const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0) {
  console.error('START not found');
  process.exit(1);
}
if (end < 0) {
  console.error('END not found');
  process.exit(1);
}
let out = src.slice(0, start) + repl.replace(/\s+$/, '') + '\n\n' + src.slice(end);

const oldIcon = '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:20px">${g.icon}</span><span><strong>${g.name}</strong></span></div>';
const newIcon = '<div style="display:flex;align-items:center;gap:10px"><span class="sport-icon-wrap">${renderSportIcon(g, 22)}</span><span><strong>${g.name}</strong></span></div>';
if (!out.includes(oldIcon)) {
  console.error('ICON pattern not found');
  const idx = out.indexOf('font-size:20px');
  console.log(JSON.stringify(out.slice(Math.max(0, idx - 80), idx + 140)));
  process.exit(1);
}
out = out.replace(oldIcon, newIcon);
fs.writeFileSync(path, out);
console.log('OK bytes', out.length, 'start', start, 'end', end);
