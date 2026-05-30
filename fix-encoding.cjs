const fs = require('fs');
const path = require('path');

// Garbled sequences produced when UTF-8 bytes were mis-read as Windows-1252
// then re-written as UTF-8. Each entry: [garbled string as unicode escapes, correct char]
const FIXES = [
  ['â€”', '—'], // â€" → — (em dash)
  ['â€™', '’'], // â€™ → ' (right single quote)
  ['â€˜', '‘'], // â€˜ → ' (left single quote)
  ['â€œ', '“'], // â€œ → " (left double quote)
  ['â€', '”'], // â€  → " (right double quote)
  ['Â·', '·'],       // Â·  → · (middle dot)
  ['Â ', ' '],       // Â   → non-breaking space
  ['Ã©', 'é'],       // Ã©  → é
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = content;
  for (const [bad, good] of FIXES) {
    fixed = fixed.split(bad).join(good);
  }
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log('Fixed: ' + filePath);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      fixFile(full);
    }
  }
}

walkDir('src');
console.log('Done');
