import fs from 'node:fs';

const content = fs.readFileSync('apps/public-web/app/components/Navbar.jsx', 'utf8');
const lines = content.split('\n');
const hrefToLines = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/href=["']([^"']+)["']/);
  if (m) {
    const href = m[1];
    if (!hrefToLines[href]) hrefToLines[href] = [];
    hrefToLines[href].push({ line: i + 1, text: line.trim() });
  }
}

for (const [href, occurrences] of Object.entries(hrefToLines)) {
  if (occurrences.length > 1) {
    console.log(`\nDuplicate: ${href} (${occurrences.length} times):`);
    for (const occ of occurrences) {
      console.log(`  Line ${occ.line}: ${occ.text}`);
    }
  }
}
