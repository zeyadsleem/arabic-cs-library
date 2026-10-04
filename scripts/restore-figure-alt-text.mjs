#!/usr/bin/env node
/**
 * Replace image alt text the imports filled with a file name.
 *
 * A handful of books came out of the HTML conversion with `![<path>](<path>)`,
 * so the alternative text a screen reader announces is a file name. Where the
 * figure caption follows the image, the caption already is the description, so
 * it is reused as the alternative text; without a caption the alt text would
 * have to be written from scratch, which is left to a translator.
 *
 * A caption qualifies only when the paragraph after the image names a figure
 * (`الشكل 2.` / `Figure 2.`). Anything else is reported and left untouched.
 *
 * Usage: node scripts/restore-figure-alt-text.mjs [--write] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const requested = args.filter((arg) => !arg.startsWith('--'));

const imagePattern = () => /!\[([^\][]*)\]\(([^)\s]+)\)/g;
const captionPattern = /^(?:#{1,6}\s*)?(الشكل|Figure)\s*\d+\s*[.:]/;

/** One trailing permalink marker, with or without a glyph: `[↗](#id1)`, `[](#id1)`. */
const permalinkPattern = /\[[^\]]{0,4}\]\([^)]*\)/;
const verifier = new MarkdownIt({ html: true, linkify: false, typographer: false });

/**
 * Turn a figure caption into alternative text: no leading heading marker, no
 * trailing permalink, and nothing that could terminate the `![…](…)` token.
 * @param {string} caption @returns {string}
 */
function altFromCaption(caption) {
  let text = caption.replace(/\n$/, '').trim().replace(/^#{1,6}\s+/, '');
  while (permalinkPattern.test(text)) text = text.replace(permalinkPattern, '').trim();
  return text.replace(/\[\]|\[[^\]]{0,4}\]$/, '').trim();
}

/**
 * The alternative text goes inside `![…](…)`, where a bracket or a parenthesis
 * ends the token early and markdown-it then reads the rest of the caption as the
 * image source. Parse the rewritten token and refuse anything that does not come
 * back as exactly the image we wrote.
 * @param {string} alt @param {string} target @returns {boolean}
 */
function isUsableAlt(alt, target) {
  if (alt === '' || /[[\]\n]/.test(alt)) return false;
  const tokens = verifier.parse(`![${alt}](${target})`, {});
  const images = tokens.flatMap((token) => (token.children ?? []).filter((child) => child.type === 'image'));
  return images.length === 1 && images[0].attrGet('src') === target;
}

/**
 * True when the alternative text only repeats an image location, which tells a
 * reader nothing: the upstream path the converter kept, or the local path, the
 * file name or the file name with its directory.
 * @param {string} alt @param {string} target @returns {boolean}
 */
function isPathLike(alt, target) {
  const value = alt.trim();
  if (value === '') return false;
  if (/[\\/]/.test(value) && /\.(?:png|jpe?g|gif|svg|webp|avif|bmp|tiff?)$/i.test(value)) return true;
  const file = target.split(/[?#]/)[0];
  const name = path.basename(file);
  const stem = name.replace(/\.[a-z0-9]+$/i, '');
  return value === file || value === name || value === stem || value.endsWith(`/${name}`) || value.endsWith(`/${stem}`);
}

/**
 * @param {string} markdown @returns {{markdown: string, replaced: string[], skipped: string[], pathLike: number}}
 */
function restoreAltText(markdown) {
  const lines = markdown.split(/(?<=\n)/);
  const replaced = [];
  const skipped = [];
  let pathLike = 0;
  let fenced = false;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (/^ {0,3}(`{3,}|~{3,})/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    let edited = '';
    let cursor = 0;
    for (const match of line.matchAll(imagePattern())) {
      if (!isPathLike(match[1], match[2])) continue;
      pathLike += 1;
      const caption = lines.slice(index + 1).find((ahead) => ahead.trim() !== '');
      const text = caption ? caption.replace(/\n$/, '').trim() : '';
      if (!captionPattern.test(text)) {
        skipped.push(`${match[2]} (no figure caption after the image)`);
        continue;
      }
      const alt = altFromCaption(text);
      if (!isUsableAlt(alt, match[2])) {
        skipped.push(`${match[2]} (caption is not usable as alt text: ${JSON.stringify(alt.slice(0, 60))})`);
        continue;
      }
      edited += line.slice(cursor, match.index) + `![${alt}](${match[2]})`;
      cursor = match.index + match[0].length;
      replaced.push(alt);
    }
    if (cursor > 0) lines[index] = edited + line.slice(cursor);
  }
  return { markdown: lines.join(''), replaced, skipped, pathLike };
}

const contentDir = path.join(root, 'content');
const books =
  requested.length > 0
    ? requested
    : fs
        .readdirSync(contentDir)
        .filter((name) => fs.statSync(path.join(contentDir, name)).isDirectory())
        .sort();

let totalReplaced = 0;
let totalSkipped = 0;

for (const book of books) {
  const dir = path.join(contentDir, book);
  let bookReplaced = 0;
  const bookSkipped = [];
  for (const name of fs.readdirSync(dir).filter((entry) => entry.endsWith('.md')).sort()) {
    const file = path.join(dir, name);
    const result = restoreAltText(fs.readFileSync(file, 'utf8'));
    if (result.pathLike === 0) continue;
    if (result.replaced.length + result.skipped.length !== result.pathLike) {
      throw new Error(`${path.relative(root, file)}: ${result.pathLike} path-like alt texts but ${result.replaced.length + result.skipped.length} accounted for`);
    }
    if (write) fs.writeFileSync(file, result.markdown);
    bookReplaced += result.replaced.length;
    bookSkipped.push(...result.skipped);
  }
  totalReplaced += bookReplaced;
  totalSkipped += bookSkipped.length;
  if (bookReplaced > 0 || bookSkipped.length > 0) {
    console.log(`${book}: ${write ? 'restored' : 'would restore'} ${bookReplaced} alt texts`);
    for (const note of bookSkipped.slice(0, 5)) console.log(`    skip ${note}`);
  }
}

console.log(`\n${write ? 'Restored' : 'Would restore'} ${totalReplaced} alt texts (${totalSkipped} left for a translator).`);