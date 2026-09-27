import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = process.argv.slice(2);
const pattern = /!\[[^\]]*\]\(([^)\s]+)\)|<img[^>]*src="([^"]+)"/g;

for (const id of books) {
  const contentDir = path.join(root, 'content', id);
  const sourceDir = path.join(root, 'content-src', id);
  if (!fs.existsSync(contentDir)) continue;

  let fixed = 0;
  let files = 0;

  for (const file of fs.readdirSync(contentDir).filter((n) => n.endsWith('.md'))) {
    const source = path.join(sourceDir, file.replace('--index.md', '.md'));
    if (!fs.existsSync(source)) continue;

    const sourceRefs = [...fs.readFileSync(source, 'utf8').matchAll(pattern)].map(
      (match) => match[1] || match[2]
    );
    if (!sourceRefs.length) continue;

    const target = path.join(contentDir, file);
    const raw = fs.readFileSync(target, 'utf8');
    let index = 0;
    const next = raw.replace(pattern, (match, md, html) => {
      const source_ = sourceRefs[index];
      index += 1;
      if (!source_ || !source_.startsWith('/images/')) return match;
      if (md) return `![${md}](${source_})`;
      return match.replace(/(src=")[^"]+(")/, `$1${source_}$2`);
    });

    if (next !== raw) {
      fs.writeFileSync(target, next);
      fixed += 1;
    }
    if (index !== sourceRefs.length) {
      console.warn(`${file}: ${index}/${sourceRefs.length} صورة`);
    }
    files += 1;
  }
  console.log(`${id}: ${fixed}/${files} files updated`);
}
