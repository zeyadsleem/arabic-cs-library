/** Restore the code fences of a Kinney translation from its English source.
 *
 * A translator (human or agent) may retype a code block by accident, and an
 * interrupted run may leave a half-written page behind. Both show up as
 * `code block N body changed` when the page is checked. This script rewrites
 * every fenced block of the translation with the matching block of the source,
 * in document order, and leaves everything outside the fences untouched.
 *
 * Usage: `node scripts/sync-kinney-fences.mjs [key ...]`
 * With no keys it syncs every page that currently breaks the fence rule.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  kinneyPages,
  readTranslation,
  translationsDirectory,
  validatePageTranslation,
} from './lib/kinney-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const closesFence = (marker, open) =>
  Boolean(marker) && marker[1][0] === open.char && marker[1].length >= open.len && !marker[2].trim();

/** Split markdown into text lines and fenced blocks, in document order.
 * @param {string} markdown
 * @returns {Array<{type: 'text' | 'code', lines?: string[], open?: string, body?: string[], close?: string}>}
 */
const parse = (markdown) => {
  const segments = [];
  let open = null;
  let body = [];
  for (const line of markdown.split('\n')) {
    const marker = line.match(FENCE);
    if (open) {
      if (closesFence(marker, open)) {
        segments.push({ type: 'code', open: open.line, body, close: line });
        open = null;
        body = [];
      } else {
        body.push(line);
      }
      continue;
    }
    if (marker) {
      open = { char: marker[1][0], len: marker[1].length, info: marker[2].trim(), line };
      continue;
    }
    segments.push({ type: 'text', lines: [line] });
  }
  if (open) segments.push({ type: 'code', open: open.line, body, close: null });
  return segments;
};

/** Replace every fenced block of `markdown` with the matching block of `blocks`.
 * @param {string} markdown @param {Array<{open: string, body: string[], close?: string}>} blocks
 * @returns {string}
 */
const rewrite = (markdown, blocks) => {
  const out = [];
  let index = 0;
  for (const segment of parse(markdown)) {
    if (segment.type === 'text') {
      out.push(...segment.lines);
      continue;
    }
    const block = blocks[index];
    index += 1;
    if (!block) {
      out.push(segment.open, ...segment.body);
      if (segment.close) out.push(segment.close);
      continue;
    }
    out.push(block.open, ...block.body);
    if (block.close) out.push(block.close);
  }
  return out.join('\n');
};

/** @param {string} key @returns {boolean} whether the page was rewritten */
const sync = (key) => {
  const sourcePath = path.join(root, 'content-src', 'kinney', `${key}.md`);
  const translationPath = path.join(translationsDirectory(root), `${key}.md`);
  if (!fs.existsSync(sourcePath) || !fs.existsSync(translationPath)) return false;

  const source = fs.readFileSync(sourcePath, 'utf8');
  const translation = fs.readFileSync(translationPath, 'utf8');
  const sourceBlocks = parse(source).filter((segment) => segment.type === 'code');
  const translationBlocks = parse(translation).filter((segment) => segment.type === 'code');
  if (sourceBlocks.length !== translationBlocks.length) {
    console.error(
      `SKIP ${key}: ${sourceBlocks.length} code blocks in the source, ${translationBlocks.length} in the translation`
    );
    return false;
  }
  const same = sourceBlocks.every((block, index) => {
    const other = translationBlocks[index];
    return (
      block.open === other.open &&
      block.close === other.close &&
      block.body.join('\n') === other.body.join('\n')
    );
  });
  if (same) return false;

  fs.writeFileSync(translationPath, rewrite(translation, sourceBlocks));
  return true;
};

const main = () => {
  const requested = process.argv.slice(2);
  const pages = kinneyPages(root);
  const keys = requested.length ? requested : pages.map((page) => page.key);

  let rewritten = 0;
  for (const key of keys) {
    if (!pages.some((page) => page.key === key)) {
      console.error(`unknown page: ${key}`);
      continue;
    }
    const translation = readTranslation(translationsDirectory(root), key);
    if (!translation) continue;
    const source = fs.readFileSync(path.join(root, 'content-src', 'kinney', `${key}.md`), 'utf8');
    const problems = validatePageTranslation(key, source, translation);
    if (!problems.some((problem) => problem.includes('code block'))) continue;
    if (sync(key)) {
      rewritten += 1;
      console.log(`SYNCED ${key}`);
    }
  }
  console.log(`\n${rewritten} page(s) rewritten`);
};

main();
