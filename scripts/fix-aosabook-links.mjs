import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'aosabook');
const sourceDir = path.join(root, 'content-src', 'aosabook');
const origin = 'https://aosabook.org/en';
const structure = JSON.parse(
  fs.readFileSync(path.join(root, 'content', 'aosabook-structure.json'), 'utf8')
);

const slug = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');

const anchors = new Map();
const volumes = new Map();
for (const chapter of structure.chapters) {
  const file = path.join(contentDir, `${chapter.key}--index.md`);
  const text = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  for (const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)) ids.add(slug(match[1]));
  for (const match of text.matchAll(/\]\(([^)]*)\)/g)) {
    const id = match[1].split('#')[1];
    if (id) ids.add(id);
  }
  anchors.set(chapter.key, ids);
  volumes.set(chapter.key, chapter.key.startsWith('v2') ? 'v2' : 'v1');
}

const fileToKey = new Map();
for (const chapter of structure.chapters) {
  fileToKey.set(`${chapter.key.replace(/^v\d-/, '')}.html`, chapter.key);
}

const resolve = (target, currentKey) => {
  const [rawPath, anchor] = target.split('#');
  if (!rawPath) return `/book/aosabook/${currentKey}/#${anchor}`;

  const normalized = rawPath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
  if (/^book\/aosabook\//.test(normalized)) {
    const rest = normalized.replace(/^book\/aosabook\//, '');
    return `/book/aosabook/${rest}${anchor ? `#${anchor}` : ''}`;
  }
  if (/^v\d-/.test(normalized)) {
    return `/book/aosabook/${normalized}${anchor ? `#${anchor}` : ''}`;
  }

  if (rawPath.startsWith('static/') || rawPath.includes('/static/')) {
    const clean = rawPath.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    const volume = volumes.get(currentKey);
    return `${origin}/${volume}/${clean}${anchor ? `#${anchor}` : ''}`;
  }

  const file = rawPath.split('/').pop();
  const key = fileToKey.get(file);
  if (!key) return `${origin}/${volumes.get(currentKey)}/${rawPath}${anchor ? `#${anchor}` : ''}`;

  if (anchor && !anchors.get(key).has(anchor)) {
    return `${origin}/${volumes.get(key)}/${rawPath}`;
  }
  return `/book/aosabook/${key}/${anchor ? `#${anchor}` : ''}`;
};

let updated = 0;
let links = 0;
for (const chapter of structure.chapters) {
  const file = path.join(contentDir, `${chapter.key}--index.md`);
  const text = fs.readFileSync(file, 'utf8');
  const next = text.replace(
    /\]\((?!https?:\/\/|\/images\/|#|mailto:)([^)\s]+)\)/g,
    (match, target) => {
      links += 1;
      return `](${resolve(target, chapter.key)})`;
    }
  );
  if (next !== text) {
    fs.writeFileSync(file, next);
    updated += 1;
  }
}

console.log(`aosabook: ${links} relative links resolved across ${updated} files`);
