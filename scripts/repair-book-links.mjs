import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = process.argv.slice(2);
const linkPattern = /\]\(([^)\s]*)\)/g;

for (const book of books) {
  const contentDir = path.join(root, 'content', book);
  const sourceDir = path.join(root, 'content-src', book);
  const structurePath = path.join(root, 'content', `${book}-structure.json`);
  if (!fs.existsSync(structurePath)) continue;

  const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'));
  const imageMap = {
    ...(fs.existsSync(path.join(sourceDir, 'image-map.json'))
      ? JSON.parse(fs.readFileSync(path.join(sourceDir, 'image-map.json'), 'utf8'))
      : {}),
    ...(fs.existsSync(path.join(sourceDir, 'figure-map.json'))
      ? JSON.parse(fs.readFileSync(path.join(sourceDir, 'figure-map.json'), 'utf8'))
      : {}),
  };
  const slugToChapter = new Map();
  for (const chapter of structure.chapters) {
    for (const section of chapter.sections) {
      slugToChapter.set(section.slug, chapter.key);
    }
  }

  const resolve = (destination) => {
    if (!destination) return destination;
    if (imageMap[destination]?.startsWith('/images/')) return imageMap[destination];
    const html = destination.match(/^([a-zA-Z0-9_-]+)\.html(#.*)?$/);
    if (html && slugToChapter.has(html[1])) {
      return `/book/${book}/${slugToChapter.get(html[1])}/${html[1]}${html[2] || ''}`;
    }
    return destination;
  };

  let repaired = 0;
  let files = 0;

  for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
    const source = path.join(sourceDir, file.replace('--index.md', '.md'));
    if (!fs.existsSync(source)) continue;

    const sourceDestinations = [
      ...fs.readFileSync(source, 'utf8').matchAll(linkPattern),
    ]
      .map((match) => resolve(match[1]))
      .filter(Boolean);

    const target = path.join(contentDir, file);
    const raw = fs.readFileSync(target, 'utf8');
    let index = 0;
    let changed = false;

    const next = raw.replace(linkPattern, (match, destination) => {
      const expected = sourceDestinations[index];
      index += 1;
      const broken = !destination || (!/^(https?:|mailto:|#|\/)/.test(destination) && !destination.startsWith('/book/'));
      if (broken && expected) {
        changed = true;
        repaired += 1;
        return `](${expected})`;
      }
      return match;
    });

    if (changed) fs.writeFileSync(target, next);
    files += 1;
    if (index !== sourceDestinations.length) {
      console.warn(`${book}/${file}: ${index}/${sourceDestinations.length} روابط`);
    }
  }

  console.log(`${book}: ${repaired} link(s) repaired in ${files} files`);
}
