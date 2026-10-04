import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let corrections = 0;
for (const directory of ['content/open-data-structures', 'content-src/open-data-structures']) {
  for (const name of fs.readdirSync(path.join(root, directory))) {
    if (!name.endsWith('.md')) continue;
    const file = path.join(root, directory, name);
    const before = fs.readFileSync(file, 'utf8');
    const after = outsideCode(before, (text) => text.replace(/\$\$([^\n]*?)\$\$/g, (match, tex, offset) => {
      const start = text.lastIndexOf('\n', offset - 1) + 1;
      const next = text.indexOf('\n', offset + match.length);
      const end = next === -1 ? text.length : next;
      // The legacy importer added extra dollars to every Math IMG alt. Preserve
      // standalone equations; inline expressions must not force paragraph breaks.
      if (!text.slice(start, offset).trim() && !text.slice(offset + match.length, end).trim()) return match;
      corrections++;
      return `$${tex}$`;
    }));
    if (after !== before) fs.writeFileSync(file, after);
  }
}
console.log(`Restored ${corrections} inline mathematical delimiters without changing expressions or code.`);
