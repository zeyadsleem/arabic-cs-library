import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchImage, imageType, writeWebp } from './lib/image-assets.mjs';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/opencode/content-audit.json', 'utf8'));
const recoveryFile = path.join(root, 'content-src/introtcs/asset-sources.json');
const temporaryRecovery = '/tmp/opencode/introtcs-recovery-map.json';
const recovery = JSON.parse(fs.readFileSync(fs.existsSync(recoveryFile) ? recoveryFile : temporaryRecovery, 'utf8'));
if (fs.existsSync('/tmp/opencode/introtcs-extra-recovery-map.json')) {
  Object.assign(recovery, JSON.parse(fs.readFileSync('/tmp/opencode/introtcs-extra-recovery-map.json', 'utf8')));
}
const sourceCache = new Map();
const sources = {
  introtcs: { repo: 'boazbk/tcs', base: '', site: null },
  'game-programming-patterns': { repo: 'munificent/game-programming-patterns', base: 'book/', extension: 'markdown', site: 'https://gameprogrammingpatterns.com/' },
  'crafting-interpreters': { repo: 'munificent/craftinginterpreters', base: 'book/', site: 'https://craftinginterpreters.com/' }
};

async function originFor(reference) {
  const config = sources[reference.book];
  if (!config) throw new Error(`No recovery source for ${reference.path}`);
  const localPath = reference.path.replace(/^static/, '');
  const map = JSON.parse(fs.readFileSync(path.join(root, `content-src/${reference.book}/image-map.json`), 'utf8'));
  let original = Object.entries(map).find(([, local]) => local === localPath)?.[0];
  const figureStem = path.basename(reference.path).match(/^fig-(.*)\.webp$/)?.[1];
  if (!original && reference.book === 'introtcs' && figureStem) {
    const candidates = Object.keys(recovery).filter((name) => path.basename(name, path.extname(name)) === figureStem);
    if (candidates.length === 1) original = candidates[0];
  }
  if (!original) {
    const chapter = reference.file.slice(`${reference.book}__`.length).split('--')[0];
    const position = Number(path.basename(reference.path).match(/-(\d+)\.webp$/)?.[1]);
    if (!position) throw new Error(`Cannot determine image position: ${reference.path}`);
    const cacheKey = `${reference.book}/${chapter}`;
    if (!sourceCache.has(cacheKey)) {
      const url = `https://raw.githubusercontent.com/${config.repo}/master/${config.base}${chapter}.${config.extension || 'md'}`;
      const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`Source HTTP ${response.status}: ${url}`);
      const text = await response.text();
      sourceCache.set(cacheKey, [
        ...text.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g),
        ...text.matchAll(/<img[^>]*src="([^"]+)"/g)
      ].map((match) => match[1]));
    }
    original = sourceCache.get(cacheKey)[position - 1];
  }
  if (!original) throw new Error(`Original image not found: ${reference.path}`);
  if (reference.book === 'introtcs') {
    const asset = recovery[original];
    if (!asset?.url) throw new Error(`IntroTCS recovery not found: ${original}`);
    return { url: asset.url, original, provenance: asset.source };
  }
  return { url: new URL(original, config.site).href, original, provenance: config.site };
}

const recoveredBytes = new Map();
const failures = [];
let restored = 0, converted = 0;
const replacements = new Map();
for (const reference of [...new Map(report.invalidImages.map((image) => [image.path, image])).values()]) {
  if (reference.book === 'crypto-101') continue; // Rebuilt from the original illustration sources by its own script.
  if (fs.existsSync(path.join(root, reference.path)) && imageType(fs.readFileSync(path.join(root, reference.path))) === 'webp') continue;
  try {
    const origin = await originFor(reference);
    if (!recoveredBytes.has(origin.url)) recoveredBytes.set(origin.url, await fetchImage(origin.url));
    writeWebp(recoveredBytes.get(origin.url), path.join(root, reference.path));
    restored++;
    console.log(`Restored ${reference.path}`);
  } catch (error) {
    failures.push({ path: reference.path, error: error.message });
    console.error(error.message);
  }
}

for (const reference of [...new Map(report.mismatchedImages.map((image) => [image.path, image])).values()]) {
  const target = path.join(root, reference.path);
  if (!fs.existsSync(target)) continue; // An earlier pass migrated GIF/SVG references.
  const bytes = fs.readFileSync(target);
  const type = imageType(bytes);
  if (type === 'webp') continue;
  if (['svg', 'gif'].includes(type)) {
    // Retain vector clarity and animation rather than rasterizing them.
    const correct = target.replace(/\.webp$/, `.${type}`);
    fs.writeFileSync(correct, bytes);
    replacements.set(reference.path.replace(/^static/, ''), path.relative(path.join(root, 'static'), correct).replace(/^/, '/'));
    fs.rmSync(target);
  } else {
    writeWebp(bytes, target);
  }
  converted++;
}

function updateReferences(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { updateReferences(file); continue; }
    if (!/\.(md|json)$/.test(entry.name)) continue;
    const before = fs.readFileSync(file, 'utf8');
    let after;
    if (entry.name.endsWith('.json')) {
      function rewrite(value) {
        if (typeof value === 'string') return replacements.get(value) || value;
        if (Array.isArray(value)) return value.map(rewrite);
        if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [replacements.get(key) || key, rewrite(nested)]));
        return value;
      }
      const parsed = JSON.parse(before);
      const rewritten = rewrite(parsed);
      after = JSON.stringify(parsed) === JSON.stringify(rewritten) ? before : JSON.stringify(rewritten, null, 2) + '\n';
    } else after = outsideCode(before, (text) => {
      for (const [oldPath, newPath] of replacements) text = text.split(oldPath).join(newPath);
      return text;
    });
    if (after !== before) fs.writeFileSync(file, after);
  }
}
updateReferences(path.join(root, 'content'));
updateReferences(path.join(root, 'content-src'));
fs.writeFileSync(recoveryFile, JSON.stringify(Object.fromEntries(Object.entries(recovery).map(([name, asset]) => [name, { url: asset.url, source: asset.source }])), null, 2) + '\n');
fs.writeFileSync('/tmp/opencode/image-repair-failures.json', JSON.stringify(failures, null, 2) + '\n');
console.log(`Restored ${restored} bad files; corrected ${converted} MIME mismatches; unresolved ${failures.length}.`);
if (failures.length) process.exitCode = 1;
