import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const book = process.argv[2] || 'introtcs';
const prefix = process.argv[3] || 'figure';
const repo = process.argv[4] || 'boazbk/tcs';
const contentDir = path.join(root, 'content', book);
const imageDir = path.join(root, 'static', 'images', book);

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      ['convert', raw, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const references = new Set();
for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
  for (const match of raw.matchAll(
    /\]\(((?:\.\.\/)*(?:figure|images|img)\/[^)\s#]+)|<img[^>]*src="((?:\.\.\/)*(?:figure|images|img)\/[^"]+)"/g
  )) {
    const value = (match[1] || match[2]).replace(/^(\.\.\/)+/, '');
    references.add(value);
  }
}

const mapPath = path.join(root, 'content-src', book, 'figure-map.json');
const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};
let downloaded = 0;

for (const reference of references) {
  if (map[reference]) continue;
  const name = path.basename(reference).replace(/\.\w+$/, '');
  const target = path.join(imageDir, `fig-${name}.webp`);
  const local = `/images/${book}/${path.basename(target)}`;
  if (!fs.existsSync(target)) {
    const raw = path.join(imageDir, `fig-${name}.raw`);
    try {
      fs.writeFileSync(
        raw,
        download(`https://raw.githubusercontent.com/${repo}/master/${reference}`)
      );
      optimize(raw, target);
      downloaded += 1;
    } catch (error) {
      console.warn(`تعذّر تنزيل ${reference}`);
      continue;
    }
  }
  map[reference] = local;
}

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));

let fixed = 0;
for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const raw = fs.readFileSync(target, 'utf8');
  let next = raw;
  for (const [reference, local] of Object.entries(map)) {
    next = next.split(`](${reference})`).join(`](${local})`);
    next = next.split(`](../${reference})`).join(`](${local})`);
    next = next.split(`src="../${reference}"`).join(`src="${local}"`);
    next = next.split(`](${reference}#`).join(`](${local}#`);
    next = next.split(`src="${reference}"`).join(`src="${local}"`);
  }
  if (next !== raw) {
    fs.writeFileSync(target, next);
    fixed += 1;
  }
}

console.log(
  `${book}: ${downloaded} figures downloaded, ${fixed} files updated (${references.size} references)`
);
