import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'patterns-dev');
const structure = JSON.parse(
  fs.readFileSync(
    path.join(root, 'content', 'patterns-dev-structure.json'),
    'utf8'
  )
);

const groupBySlug = new Map();
for (const chapter of structure.chapters) {
  for (const section of chapter.sections) {
    if (section.slug !== 'index') {
      groupBySlug.set(section.slug, chapter.key);
    }
  }
}

const rewrite = (target) => {
  if (/^\/images\//.test(target)) return target;
  const posts = target.match(/^\/posts\/(?:(vanilla|react|vue)\/)?([^/]+)\/?$/);
  if (posts) {
    const group = posts[1] || groupBySlug.get(posts[2]);
    if (group) return `/book/patterns-dev/${group}/${posts[2]}`;
    return target;
  }
  const direct = target.match(/^\/?(vanilla|react|vue)\/([a-z0-9-]+)\/?$/);
  if (direct) return `/book/patterns-dev/${direct[1]}/${direct[2]}`;
  return target;
};

let changed = 0;
let links = 0;
for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const path_ = path.join(contentDir, file);
  const raw = fs.readFileSync(path_, 'utf8');
  const next = raw.replace(
    /\]\((\/(?:posts\/)?[a-z0-9/_-]+|vanilla\/[a-z0-9-]+|react\/[a-z0-9-]+|vue\/[a-z0-9-]+)\)/g,
    (match, target) => {
      const value = rewrite(target);
      if (value !== target) links += 1;
      return `](${value})`;
    }
  );
  if (next !== raw) {
    fs.writeFileSync(path_, next);
    changed += 1;
  }
}

console.log(`files changed: ${changed}, links rewritten: ${links}`);
