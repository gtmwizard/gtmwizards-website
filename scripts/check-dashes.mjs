// House rule: no em dashes and no en dashes anywhere in the source.
// Run with `npm run check:dashes`. Exits non-zero if any are found.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'public', 'functions', 'docs', 'scripts'];
const FILES = ['README.md', 'CLAUDE.md', 'astro.config.mjs'];
const SKIP_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.woff', '.woff2', '.ico']);
const BAD = { '\u2014': 'em dash', '\u2013': 'en dash' };

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (!SKIP_EXT.has(extname(p))) out.push(p);
  }
  return out;
}

const targets = [...ROOTS.flatMap((r) => walk(r)), ...FILES];
let hits = 0;

for (const file of targets) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    for (const [ch, label] of Object.entries(BAD)) {
      if (line.includes(ch)) {
        hits++;
        console.log(`${file}:${i + 1}  ${label}  ${line.trim().slice(0, 110)}`);
      }
    }
  });
}

if (hits) {
  console.log(`\n${hits} dash violation(s). Use commas, colons, periods or parentheses.`);
  process.exit(1);
}
console.log('No em dashes or en dashes found.');
