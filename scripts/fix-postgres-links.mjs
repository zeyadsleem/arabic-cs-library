import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = [
  path.join(root, 'content', 'postgres-internals'),
  path.join(root, 'content-src', 'postgres-internals'),
];

let files = 0;
let inPage = 0;
let crossChapter = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((file) => file.endsWith('.md'))) {
    const target = path.join(dir, name);
    const raw = fs.readFileSync(target, 'utf8');

    let text = raw.replace(
      /\[([^\]]+)\]\((?:\.\.\/)?pgsql(\d+)\/index\.html([^)]*)\)/g,
      (match, label, chapter, fragment) => {
        crossChapter += 1;
        return `[${label}](/book/postgres-internals/pgsql${chapter}/index${fragment || ''})`;
      }
    );

    text = text.replace(
      /\[([^\]]+)\]\((?:\.\.\/)?(?:pgsql\d+\/)?(\d+)\.html([^)]*)\)/g,
      (match, label) => {
        inPage += 1;
        return label;
      }
    );

    if (text !== raw) {
      fs.writeFileSync(target, text);
      files += 1;
    }
  }
}

console.log(
  `files updated: ${files}, in-page links unwrapped: ${inPage}, cross-chapter links mapped: ${crossChapter}`
);
