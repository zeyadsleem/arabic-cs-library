// Pick the next batches of untranslated Kinney pages.
// Usage: node scripts/next-chunk.mjs [budget] [parts]
// Writes .chunks/next-chunk-1.txt … .chunks/next-chunk-<parts>.txt (one key per line).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'content-src/kinney');
const trDir = path.join(root, 'content-src/kinney-translations');
const budget = Number(process.argv[2] ?? 110000);
const parts = Number(process.argv[3] ?? 1);

const courseOrder = [
  'enterprise-ui',
  'full-stack-typescript',
  'visual-studio-code',
  'react-performance',
  'testing',
  'tailwind',
  'react-typescript',
  'self-testing-ai-agents',
  'aws',
];

const structure = JSON.parse(fs.readFileSync(path.join(root, 'content/kinney-structure.json'), 'utf8'));
const order = new Map();
for (const chapter of structure.chapters) {
  for (const [index, section] of chapter.sections.entries()) {
    order.set(`${chapter.key}--${section.slug}`, `${chapter.key}|${String(index).padStart(3, '0')}`);
  }
}

const missing = fs
  .readdirSync(srcDir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.slice(0, -3))
  .filter((key) => !fs.existsSync(path.join(trDir, `${key}.md`)));

const ranks = new Map(courseOrder.map((course, index) => [course, index]));
const ranked = missing
  .filter((key) => ranks.has(order.get(key)?.split('|')[0]))
  .sort((a, b) => {
    const courseA = ranks.get(order.get(a).split('|')[0]);
    const courseB = ranks.get(order.get(b).split('|')[0]);
    return courseA - courseB || order.get(a).split('|')[1].localeCompare(order.get(b).split('|')[1]);
  });

const sizeOf = (key) => fs.statSync(path.join(srcDir, `${key}.md`)).size;

const chunks = [];
let current = [];
let chars = 0;
for (const key of ranked) {
  const size = sizeOf(key);
  if (current.length && chars + size > budget) {
    chunks.push(current);
    current = [];
    chars = 0;
  }
  current.push(key);
  chars += size;
}
if (current.length) chunks.push(current);

const chunkDir = path.join(root, '.chunks');
fs.rmSync(chunkDir, { recursive: true, force: true });
fs.mkdirSync(chunkDir, { recursive: true });

const selected = chunks.slice(0, parts);
for (const [index, chunk] of selected.entries()) {
  fs.writeFileSync(path.join(chunkDir, `next-chunk-${index + 1}.txt`), chunk.join('\n') + '\n');
}

console.log(`missing total: ${missing.length}`);
for (const [index, chunk] of selected.entries()) {
  const byCourse = new Map();
  for (const key of chunk) {
    const course = key.split('--')[0];
    byCourse.set(course, (byCourse.get(course) ?? 0) + 1);
  }
  const total = chunk.reduce((sum, key) => sum + sizeOf(key), 0);
  console.log(
    `part ${index + 1}: ${chunk.length} page(s), ${total} chars — ${[...byCourse]
      .map(([course, count]) => `${course} ${count}`)
      .join(', ')} (${chunk[0]} … ${chunk.at(-1)})`
  );
}
