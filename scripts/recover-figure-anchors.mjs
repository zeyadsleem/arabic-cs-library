#!/usr/bin/env node
/**
 * Restore the figure anchors that the HTML-to-markdown conversion dropped.
 *
 * Upstream sources keep figure identities on the HTML wrapper element
 * (`<div class="figure" id="fig.x">`, `<div id="FigY" class="imageblock">`),
 * while the translated markdown keeps only the caption and the image path, so
 * every `[الشكل 1](#fig.x)` reference becomes a dead link.
 *
 * The upstream image file name survives as a suffix of the local image path -
 * `_images/singleChannel.png` becomes `/images/aosabook/v1-asterisk-singleChannel.webp` -
 * which is what this script matches on. A figure may carry a second identity,
 * the empty label span Sphinx puts in front of the image, so an image receives
 * `{#wrapper #label}` when both are known. Only unambiguous one-to-one matches
 * are written; anything else is reported and left alone.
 *
 * Usage: node scripts/recover-figure-anchors.mjs [--write] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const requested = args.filter((arg) => !arg.startsWith('--'));

/** @param {string} name @returns {string} the file name without directories or extension */
const fileStem = (target) => path.basename(target.split(/[?#]/)[0]).replace(/\.[a-z0-9]+$/i, '');

/** @param {string} book @returns {string[]} translated section files, in reading order */
function sectionFiles(book) {
  const dir = path.join(root, 'content', book);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => path.join(dir, name));
}

/**
 * Locate the upstream HTML behind a translated chapter: either a flat
 * `<chapter>.html` or every file inside a `<chapter>/` directory.
 * @param {string} book @param {string} chapter @returns {string[]}
 */
function sourceFiles(book, chapter) {
  const dir = path.join(root, 'content-src', book);
  const flat = path.join(dir, `${chapter}.html`);
  if (fs.existsSync(flat)) return [flat];
  const nested = path.join(dir, chapter);
  if (!fs.existsSync(nested)) return [];
  return fs
    .readdirSync(nested)
    .filter((name) => name.endsWith('.html'))
    .sort()
    .map((name) => path.join(nested, name));
}

/**
 * Ids of the innermost elements wrapping an image, keyed by the image's file
 * stem. Innermost avoids capturing a whole page wrapper, which on themed books
 * also contains an image. Stems with conflicting ids are dropped.
 * @param {string[]} files @returns {Map<string, string>}
 */
function collectFigureIds(files) {
  const found = new Map();
  const conflicts = new Set();
  for (const file of files) {
    const document = parse(fs.readFileSync(file, 'utf8'));
    const candidates = [];
    for (const element of document.querySelectorAll('[id]')) {
      const image = element.querySelector('img');
      if (!image) continue;
      const stem = fileStem(image.getAttribute('src') ?? '');
      if (!stem) continue;
      candidates.push({ element, id: element.getAttribute('id'), stem });
    }
    const wrappers = new Set(candidates.map((entry) => entry.element));
    for (const entry of candidates) {
      const nested = entry.element
        .querySelectorAll('[id]')
        .some((child) => child !== entry.element && wrappers.has(child));
      if (nested) continue;
      const existing = found.get(entry.stem);
      if (existing && existing !== entry.id) conflicts.add(entry.stem);
      else found.set(entry.stem, entry.id);
    }
  }
  for (const stem of conflicts) found.delete(stem);
  return found;
}

/**
 * Labels that sit in front of an image inside the same figure, keyed by the
 * image's file stem. Sphinx renders an explicit figure name as an empty
 * `<span id="fig-name">` immediately before the image, which is the id the prose
 * references, while the caption permalink points at the wrapper id. Labels a
 * single label claimed by two images are dropped as ambiguous.
 * @param {string[]} files @returns {Map<string, string>}
 */
function collectFigureLabels(files) {
  const found = new Map();
  const owners = new Map();
  for (const file of files) {
    const document = parse(fs.readFileSync(file, 'utf8'));
    for (const image of document.querySelectorAll('img')) {
      const stem = fileStem(image.getAttribute('src') ?? '');
      if (!stem) continue;
      for (const label of precedingLabels(image)) {
        if (found.get(stem) === label) continue;
        found.set(stem, label);
        owners.set(label, (owners.get(label) ?? new Set()).add(stem));
      }
    }
  }
  for (const [label, stems] of owners) {
    if (stems.size < 2) continue;
    for (const stem of stems) if (found.get(stem) === label) found.delete(stem);
  }
  return found;
}

/**
 * Empty `[id]` elements standing immediately in front of an image, looking up
 * through the ancestors of the image. Scanning stops at the first sibling that
 * carries text or another image, so section labels never leak onto a figure.
 * @param {import('node-html-parser').HTMLElement} image @returns {string[]}
 */
function precedingLabels(image) {
  const labels = [];
  let node = image.parentNode;
  while (node) {
    let sibling = node.previousSibling;
    while (sibling) {
      if (sibling.nodeType === 1) {
        if (sibling.querySelector('img') || sibling.text.trim()) break;
        const id = sibling.getAttribute('id');
        if (id && labelNamePattern.test(id)) labels.unshift(id);
      }
      sibling = sibling.previousSibling;
    }
    if (labels.length > 0) return labels;
    node = node.parentNode;
  }
  return labels;
}

const labelNamePattern = /^[A-Za-z][\w:.-]*$/;

/**
 * Markdown image tokens in both the plain `![alt](path)` form and the wikilink
 * form `![[alt](path)]` several translations use. The anchor belongs directly
 * after the image, inside the wikilink brackets when present.
 * @returns {RegExp}
 */
const imagePattern = () => /(!\[((?:!?\[.*?\]|[^\][]*))\]\(([^)\s]+)\)(\{[^}]*\})?\]?)/g;

/**
 * Resolve one markdown image stem against the upstream figure stems. A local
 * path keeps the upstream name as a `-`/`_` delimited suffix.
 * @param {string} local @param {Map<string, string>} byStem @param {Map<string, string>} labels
 * @returns {{id: string, label: string | null, stem: string} | null}
 */
function resolveFigure(local, byStem, labels) {
  for (const stem of byStem.keys()) {
    if (local === stem || local.endsWith(`-${stem}`) || local.endsWith(`_${stem}`)) {
      return { id: byStem.get(stem), label: labels.get(stem) ?? null, stem };
    }
  }
  return null;
}

/**
 * @param {string} markdown @param {Map<string, string>} byStem @param {Map<string, string>} labels
 * @returns {{markdown: string, added: {id: string, label: string | null, stem: string}[], skipped: string[]}}
 */
function applyAnchors(markdown, byStem, labels) {
  const added = [];
  const skipped = [];
  const uses = new Map();
  for (const match of markdown.matchAll(imagePattern())) {
    const resolved = resolveFigure(fileStem(match[3]), byStem, labels);
    if (resolved) uses.set(resolved.stem, (uses.get(resolved.stem) ?? 0) + 1);
  }
  // A repeated figure keeps a single id, on its first occurrence, so every
  // reference to it still resolves to the same target.
  const placed = new Set();
  const output = outsideCode(markdown, (text) => {
    let cursor = 0;
    let result = '';
    for (const match of text.matchAll(imagePattern())) {
      const resolved = resolveFigure(fileStem(match[3]), byStem, labels);
      if (!resolved) continue;
      const count = uses.get(resolved.stem);
      if (count > 1 && placed.has(resolved.stem)) continue;
      if (count > 1) skipped.push(`${resolved.stem} (${count} uses, anchored on the first)`);
      placed.add(resolved.stem);
      const attributes = match[4];
      const wanted = [resolved.id, ...(resolved.label ? [resolved.label] : [])];
      const present = attributes ? (attributes.match(/#[A-Za-z][\w:.-]*/g) ?? []).map((id) => id.slice(1)) : [];
      const missing = wanted.filter((id) => !present.includes(id));
      if (missing.length === 0) continue;
      const classes = attributes ? attributes.slice(1, -1).replace(/#[\w:.-]+/g, ' ').trim() : '';
      const ids = [...present, ...missing].map((id) => `#${id}`).join(' ');
      const anchor = classes ? `{${ids} ${classes}}` : `{${ids}}`;
      // `match[1]` still carries the attribute group the image had, so the new
      // anchor has to be written in its place rather than appended to it.
      const wikilink = match[1].endsWith(']');
      const token = match[1].slice(0, wikilink ? -1 : undefined);
      const image = token.slice(0, token.length - (attributes?.length ?? 0));
      const start = match.index;
      result += text.slice(cursor, start) + image + anchor + (wikilink ? ']' : '');
      cursor = start + match[0].length;
      added.push({ id: resolved.id, label: resolved.label, stem: resolved.stem });
    }
    return result + text.slice(cursor);
  });
  return { markdown: output, added, skipped };
}

const contentDir = path.join(root, 'content');
const books =
  requested.length > 0
    ? requested
    : fs
        .readdirSync(contentDir)
        .filter((name) => fs.statSync(path.join(contentDir, name)).isDirectory())
        .sort();

let totalAdded = 0;
let totalSkipped = 0;
const failures = [];

for (const book of books) {
  let bookAdded = 0;
  const bookSkipped = [];
  for (const file of sectionFiles(book)) {
    const chapter = path.basename(file).split('--')[0];
    const sources = sourceFiles(book, chapter);
    if (sources.length === 0) continue;
    const byStem = collectFigureIds(sources);
    if (byStem.size === 0) continue;
    const labels = collectFigureLabels(sources);
    const result = applyAnchors(fs.readFileSync(file, 'utf8'), byStem, labels);
    if (result.added.length === 0) continue;
    for (const entry of result.added) {
      const pattern = new RegExp(`\\{#${entry.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[ #}]`);
      if (!pattern.test(result.markdown)) {
        failures.push(`${path.relative(root, file)}: anchor for ${entry.stem} missing after rewrite`);
      }
    }
    if (write) fs.writeFileSync(file, result.markdown);
    bookAdded += result.added.length;
    bookSkipped.push(...result.skipped);
  }
  totalAdded += bookAdded;
  totalSkipped += bookSkipped.length;
  if (bookAdded > 0 || bookSkipped.length > 0) {
    console.log(
      `${book}: ${write ? 'added' : 'would add'} ${bookAdded} figure anchors${bookSkipped.length ? `, skipped ${bookSkipped.length} ambiguous` : ''}`
    );
    for (const note of bookSkipped.slice(0, 5)) console.log(`    skip ${note}`);
  }
}

console.log(
  `\n${write ? 'Added' : 'Would add'} ${totalAdded} figure anchors across ${books.length} books (${totalSkipped} ambiguous skipped).`
);
if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
}
