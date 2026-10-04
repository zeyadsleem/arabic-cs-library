import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { parse } from 'node-html-parser';
import { fetchImage, imageType, writeWebp } from './lib/image-assets.mjs';

// Emits an apply_patch patch; never rewrites Markdown or shared generated output.
// Run: node scripts/repair-ods-formulas.mjs > /tmp/opencode/ods-formulas/repair.patch
// Apply the emitted patch, then rerun to verify idempotence and provenance.
const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'https://opendatastructures.org/ods-java/';
const cache = '/tmp/opencode/ods-formulas';
const mapPath = 'content-src/open-data-structures/math-image-map.json';
const chapters = [
  ['4_Skiplists', 'تحليل الارتفاع وطول مسار البحث في قوائم التخطي'],
  ['5_Hash_Tables', 'تحليل الاحتمالات ودوال التجزئة في جداول التجزئة'],
  ['7_Random_Binary_Search_Tree', 'حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية'],
  ['11_Sorting_Algorithms', 'تحليل عدد المقارنات في خوارزميات الترتيب'],
  ['13_Data_Structures_Integers', 'ترتيب العناصر المخزنة في بنية واي فاست تراي'],
];
const sha = (value) => createHash('sha256').update(value).digest('hex');
const normalize = (tex) => tex.trim().replace(/^\$+|\$+$/g, '').trim().replace(/\s+/g, ' ');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
fs.mkdirSync(cache, { recursive: true });

function outsideCode(source, transform) {
  let fence = null, prose = '', result = '';
  const flush = () => {
    // Inline code cannot cross paragraph boundaries. The original edition also
    // uses unmatched double backticks as English opening quotation marks.
    for (const paragraph of prose.split(/(\n[ \t]*\n)/)) {
      let cursor = 0;
      for (const code of paragraph.matchAll(/<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/gi)) {
        result += transform(paragraph.slice(cursor, code.index)) + code[0];
        cursor = code.index + code[0].length;
      }
      result += transform(paragraph.slice(cursor));
    }
    prose = '';
  };
  for (const line of source.split(/(?<=\n)/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      result += line;
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
    } else if (marker) {
      flush(); fence = marker[1]; result += line;
    } else prose += line;
  }
  flush();
  return result;
}

async function page(name) {
  if (!/^\d+_[\w]+\.html$/.test(name)) throw new Error(`Unsafe section page: ${name}`);
  const target = path.join(cache, name);
  if (!fs.existsSync(target)) {
    const response = await fetch(new URL(name, base), { signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`Section HTTP ${response.status}: ${name}`);
    const html = await response.text();
    if (!/<html[\s>]/i.test(html)) throw new Error(`Not HTML: ${name}`);
    fs.writeFileSync(target, html);
  }
  return parse(fs.readFileSync(target, 'utf8'));
}

function expressions(source) {
  const result = [];
  outsideCode(source, (text) => {
    for (const match of text.matchAll(/\$\$([\s\S]*?)\$\$/g)) {
      if (match[1].includes('... ...')) result.push({ expression: match[0], tex: normalize(match[1]) });
    }
    return text;
  });
  return result;
}

function patchFile(name, before, after) {
  if (before === after) return '';
  if (before === null) return `*** Add File: ${name}\n${after.trimEnd().split('\n').map((line) => `+${line}`).join('\n')}\n`;
  const oldLines = before.split('\n');
  const newLines = after.split('\n');
  if (oldLines.length !== newLines.length) throw new Error(`Unexpected line count change: ${name}`);
  let patch = `*** Update File: ${name}\n`;
  for (let index = 0; index < oldLines.length; index++) {
    if (oldLines[index] !== newLines[index]) patch += `@@\n-${oldLines[index]}\n+${newLines[index]}\n`;
  }
  return patch;
}

const previous = fs.existsSync(path.join(root, mapPath)) ? JSON.parse(read(mapPath)) : null;
const entries = [];
const edits = [];
let total = 0;
for (const [chapter, description] of chapters) {
  const originalPath = `content-src/open-data-structures/${chapter}.md`;
  const arabicPath = `content/open-data-structures/${chapter}--index.md`;
  const source = read(originalPath);
  const targets = expressions(source);
  const saved = previous?.formulas.filter((entry) => entry.chapter === chapter) ?? [];
  const requested = targets.length ? targets : saved;
  if (!requested.length) throw new Error(`No formulas or saved mapping: ${chapter}`);
  const prefix = chapter.split('_')[0];
  const toc = parse(read(`content-src/open-data-structures/${chapter}.html`));
  const pending = [...new Set(toc.querySelectorAll('a[href]').map((link) => link.getAttribute('href').split('#')[0])
    .filter((href) => new RegExp(`^${prefix}_\\d+_.*\\.html$`).test(href)))];
  const seen = new Set();
  const images = [];
  while (pending.length) {
    const section = pending.shift();
    if (seen.has(section)) continue;
    seen.add(section);
    const html = await page(section);
    for (const image of html.querySelectorAll('img')) {
      const alt = image.getAttribute('alt') ?? '';
      const src = image.getAttribute('src') ?? '';
      if (normalize(alt).includes('... ...') && /^img\d+\.png$/.test(src)) {
        images.push({ tex: normalize(alt), sourceAlt: alt, page: new URL(section, base).href, png: new URL(src, base).href });
      }
    }
    for (const link of html.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href').split('#')[0];
      if (new RegExp(`^${prefix}_\\d+_.*\\.html$`).test(href) && !seen.has(href)) pending.push(href);
    }
  }
  const used = new Map();
  const chapterEntries = [];
  for (const target of requested) {
    const matches = images.filter((image) => image.tex === target.tex);
    const occurrence = used.get(target.tex) ?? 0;
    const match = matches[occurrence];
    if (!match) throw new Error(`Unmatched formula ${chapter} occurrence ${occurrence + 1}: ${target.tex}`);
    used.set(target.tex, occurrence + 1);
    const local = `/images/open-data-structures/math-${sha(match.png).slice(0, 20)}.webp`;
    const png = await fetchImage(match.png);
    if (imageType(png) !== 'png' || png.subarray(12, 16).toString() !== 'IHDR') throw new Error(`Not genuine PNG: ${match.png}`);
    const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
    if (!width || !height) throw new Error(`Invalid PNG dimensions: ${match.png}`);
    const filename = path.join(root, 'static', local);
    if (!fs.existsSync(filename)) writeWebp(png, filename);
    const webp = fs.readFileSync(filename);
    if (imageType(webp) !== 'webp') throw new Error(`Invalid WebP: ${local}`);
    const dimensions = execFileSync('magick', ['identify', '-format', '%w %h', filename], { encoding: 'utf8' }).trim();
    if (dimensions !== `${width} ${height}`) throw new Error(`Dimensions changed: ${local}`);
    // Lossless WebP may discard RGB underneath fully transparent pixels; compare
    // on both backgrounds to verify visible pixels and transparency exactly.
    const pixels = (input, background) => execFileSync('magick', ['-', '-background', background, '-alpha', 'remove', '-depth', '8', 'rgba:-'], { input, maxBuffer: 64 * 1024 * 1024 });
    for (const background of ['white', 'black']) {
      if (!pixels(png, background).equals(pixels(webp, background))) throw new Error(`Lossless pixel verification failed: ${local}`);
    }
    const alt = `المعادلة الأصلية: ${description}، الصيغة ${chapterEntries.length + 1}`;
    const replacement = `![${alt}](${local})`;
    const entry = { chapter, expression: target.expression, tex: target.tex, ...match, local, alt, replacement, width, height, pngSha256: sha(png), webpSha256: sha(webp) };
    if (saved.length && JSON.stringify(entry) !== JSON.stringify(saved[chapterEntries.length])) throw new Error(`Provenance changed: ${match.png}`);
    chapterEntries.push(entry);
  }
  for (const [tex, count] of used) {
    if (images.filter((image) => image.tex === tex).length !== count) throw new Error(`Ambiguous ALT occurrence count: ${chapter}: ${tex}`);
  }
  for (const name of [originalPath, arabicPath]) {
    const before = read(name);
    let index = 0;
    const after = outsideCode(before, (text) => text.replace(/\$\$([\s\S]*?)\$\$/g, (expression, tex) => {
      if (!tex.includes('... ...')) return expression;
      const entry = chapterEntries[index++];
      if (!entry || expression !== entry.expression) throw new Error(`Exact expression mismatch: ${name}: ${expression}`);
      return entry.replacement;
    }));
    if (index !== 0 && index !== chapterEntries.length) throw new Error(`Partial coverage: ${name}`);
    if (index === 0) {
      for (const entry of chapterEntries) if (!after.includes(entry.replacement)) throw new Error(`Missing repaired image: ${name}`);
    }
    // Reverse only the planned substitutions: all surrounding bytes, including code, must survive.
    let reversed = after;
    if (index) for (const entry of chapterEntries) reversed = reversed.replace(entry.replacement, () => entry.expression);
    if (reversed !== before) throw new Error(`Surrounding content changed: ${name}`);
    edits.push(patchFile(name, before, after));
    total += index;
  }
  entries.push(...chapterEntries);
  process.stderr.write(`${chapter}: ${chapterEntries.length} formulas verified across ${seen.size} section pages\n`);
}
const errors = JSON.parse(read('src/lib/generated/math-errors.json'))
  .filter((error) => error.section.startsWith('open-data-structures/') && error.tex.includes('... ...'));
for (const error of errors) {
  const chapter = error.section.split('/')[1].replace(/--index$/, '');
  if (!entries.some((entry) => entry.chapter === chapter && entry.tex === normalize(error.tex))) throw new Error(`Uncovered math error: ${error.section}: ${error.tex}`);
}
const mapping = `${JSON.stringify({ edition: base, normalization: 'Decode HTML entities; strip boundary dollars; collapse whitespace. Duplicate ALTs matched in section/document order.', formulas: entries }, null, 2)}\n`;
const oldMapping = previous ? read(mapPath) : null;
if (oldMapping !== mapping) {
  if (oldMapping) throw new Error('Mapping changed unexpectedly; review provenance before replacing it');
  edits.push(patchFile(mapPath, null, mapping));
}
const patch = edits.filter(Boolean).join('');
if (patch) process.stdout.write(`*** Begin Patch\n${patch}*** End Patch\n`);
process.stderr.write(`Verified ${entries.length} original PNGs; ${errors.length} elided error records covered; ${total} exact Markdown replacements planned.\n`);
