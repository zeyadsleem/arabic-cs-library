import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { imageType, fetchImage, writeWebp } from './lib/image-assets.mjs';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src/introtcs');
const recovery = JSON.parse(fs.readFileSync(path.join(sourceDir, 'asset-sources.json'), 'utf8'));
const oldMap = JSON.parse(fs.readFileSync(path.join(sourceDir, 'image-map.json'), 'utf8'));
const structure = JSON.parse(fs.readFileSync(path.join(root, 'content/introtcs-structure.json'), 'utf8'));
const parser = new MarkdownIt({ html: true });
const anchors = {}, origins = {}, canonical = {};
const unavailable = [];
const cache = '/tmp/opencode/introtcs-original';
fs.mkdirSync(cache, { recursive: true });
const requiredIds = new Set();
for (const chapter of structure.chapters) {
  const file = path.join(root, 'content/introtcs', `${chapter.key}--index.md`);
  const text = fs.readFileSync(file, 'utf8');
  for (const figure of imageEntries(parser.parse(text, {}))) requiredIds.add(figure.id);
}

function imageEntries(tokens, result = []) {
  for (const token of tokens) {
    if (token.type === 'inline' && token.children) {
      token.children.forEach((child, index) => {
        if (child.type !== 'image') return;
        const after = token.children[index + 1]?.content || '';
        const id = after.match(/^\s*\{\s*#([\w:.-]+)/)?.[1];
        if (id) result.push({ id, src: child.attrGet('src') });
      });
    }
  }
  return result;
}

for (const chapter of structure.chapters) {
  const cached = path.join(cache, `${chapter.key}.md`);
  if (!fs.existsSync(cached)) {
    const original = execFileSync('curl', ['--fail', '-sSL', '--retry', '2', '--connect-timeout', '10', '--max-time', '40', `https://raw.githubusercontent.com/boazbk/tcs/master/${chapter.key}.md`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    fs.writeFileSync(cached, original);
  }
  for (const figure of imageEntries(parser.parse(fs.readFileSync(cached, 'utf8'), {}))) {
    if (!requiredIds.has(figure.id)) continue;
    if (!recovery[figure.src]) unavailable.push({ chapter: chapter.key, id: figure.id, src: figure.src });
    anchors[figure.id] = figure.src;
  }
}
if (unavailable.length) {
  fs.writeFileSync('/tmp/opencode/introtcs-unresolved-originals.json', JSON.stringify(unavailable, null, 2));
  throw new Error(`${unavailable.length} original figures require recovery; see /tmp/opencode/introtcs-unresolved-originals.json`);
}

for (const original of new Set(Object.values(anchors))) {
  const stem = path.basename(original, path.extname(original));
  const uri = `/images/introtcs/original-${stem}.webp`;
  const target = path.join(root, 'static', uri);
  if (!fs.existsSync(target) || imageType(fs.readFileSync(target)) !== 'webp') {
    const existing = [oldMap[original], `/images/introtcs/fig-${stem}.webp`]
      .filter(Boolean).map((local) => path.join(root, 'static', local))
      .find((file) => fs.existsSync(file) && imageType(fs.readFileSync(file)) === 'webp');
    if (existing) fs.copyFileSync(existing, target);
    else writeWebp(await fetchImage(recovery[original].url), target);
  }
  canonical[original] = uri;
  origins[uri] = { original, ...recovery[original] };
}

let corrected = 0;
for (const chapter of structure.chapters) {
  for (const directory of [path.join(root, 'content/introtcs'), sourceDir]) {
    const file = path.join(directory, directory === sourceDir ? `${chapter.key}.md` : `${chapter.key}--index.md`);
    if (!fs.existsSync(file)) continue;
    const before = fs.readFileSync(file, 'utf8');
    const after = outsideCode(before, (text) => text
      .replace(/\]\(([^\s)]+)(\s*)\)(\s*\{[^}\n]*#([\w:.-]+)[^}\n]*\})/g,
        (match, local, whitespace, attributes, id) => {
          if (!requiredIds.has(id)) return match;
          const original = anchors[id];
          if (!original) throw new Error(`Figure anchor missing in original: ${id} in ${file}`);
          if (local !== canonical[original]) corrected++;
          return `](${canonical[original]}${whitespace})${attributes}`;
        })
      .replace(/\[([\w:.-]+)\]\([^)]*\)(\{\s*\.(?:ref|eqref)\s*\})/g, '[$1](#$1)$2')
    );
    const code = (source) => parser.parse(source, {}).filter((token) => ['fence', 'code_block'].includes(token.type)).map((token) => token.content);
    assert.deepEqual(code(after), code(before), `Code modified: ${file}`);
    if (after !== before) fs.writeFileSync(file, after);
  }
}
fs.writeFileSync(path.join(sourceDir, 'canonical-image-map.json'), JSON.stringify(origins, null, 2) + '\n');
console.log(`Normalized ${corrected} figure destinations by original figure IDs (${Object.keys(origins).length} genuine originals).`);
