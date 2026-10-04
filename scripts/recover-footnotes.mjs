#!/usr/bin/env node
/**
 * Turn the footnote markup the HTML-to-markdown conversion left half-wired into
 * real markdown-it footnotes.
 *
 * Two shapes reach `content/`, and both of them render as broken links today:
 *
 * - AsciiDoctor sources keep the note in the file as an ordered-list item with
 *   a return link (`1. …&#160;[↩](#fnref:1)`) while the reference points at
 *   `#fn:1`. Neither end exists in the rendered page, which is how
 *   postgres-internals ended up with 19 dead anchors.
 * - The HTML-to-markdown conversion dropped the note bodies entirely and kept
 *   only `[1](#footnote-1)` in the prose, so aosabook has 108 dead anchors and
 *   use-the-index-luke has 3. The note bodies are still in the upstream HTML
 *   as `<li id="footnote-N">` inside the page's footnote list.
 *
 * Notes are only restored when the upstream page really defines them, and every
 * rewritten note is parsed back with markdown-it to confirm it produces exactly
 * one footnote definition and no stray links.
 *
 * Usage: node scripts/recover-footnotes.mjs [--write] [--log] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const log = args.includes('--log');
const requested = args.filter((arg) => !arg.startsWith('--'));

const probe = new MarkdownIt({ html: true, linkify: false, typographer: false }).use(markdownItFootnote);

/** `1. note&#160;[↩](#fnref:1)` — the AsciiDoctor definition the translations kept. */
const inlineDefinition = () => /^(\s*)(\d+)\.\s+(.+?)&#160;\[[^\]]*\]\(#fnref:(\d+)\)\s*$/;
/** `text[1](#fn:1)` — the matching reference. */
const asciidocReference = () => /\[(\d+)\]\(#fn:(\d+)\)/g;
/** `text[1](#footnote-1)` — the reference the HTML conversion left behind. */
const htmlReference = () => /\[(\d+)\]\(#footnote-(\d+)\)/g;

/** @param {string} markdown @param {(line: string) => string} transform @returns {string} */
function mapProseLines(markdown, transform) {
  let fence = null;
  return markdown
    .split('\n')
    .map((line) => {
      const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (open) {
        if (!fence) fence = open[1][0];
        else if (open[1][0] === fence && !line.trim().replace(/[`~]/g, '')) fence = null;
        return line;
      }
      return fence ? line : transform(line);
    })
    .join('\n');
}

/** @param {string} markdown @returns {boolean} whether the file ends outside a code fence */
function endsOutsideFence(markdown) {
  let fence = null;
  for (const line of markdown.split('\n')) {
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (!open) continue;
    if (!fence) fence = open[1][0];
    else if (open[1][0] === fence && !line.trim().replace(/[`~]/g, '')) fence = null;
  }
  return fence === null;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** @param {string} text @returns {string} */
function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, body) => {
    if (body[0] === '#') return String.fromCodePoint(Number.parseInt(body.slice(1), body[1] === 'x' ? 16 : 10));
    return ENTITIES[body] ?? whole;
  });
}

/**
 * The upstream note body as markdown.
 *
 * Only the inline markup these note bodies actually use is translated; anything
 * else is flattened to its text so no HTML can reach the reader. A note links
 * out with a relative href on the upstream site, which would resolve to a
 * 404 on ours, so those are rewritten with the absolute URL the rest of the
 * book already uses for the same file.
 *
 * @param {import('node-html-parser').HTMLElement} note @param {Map<string, string>} absolute @returns {string}
 */
function noteToMarkdown(note, absolute) {
  const clone = parse(note.innerHTML);
  clone.querySelectorAll('span.ref').forEach((span) => span.remove());
  const walk = (node) => {
    let text = '';
    for (const child of node.childNodes) {
      if (child.nodeType === 3) { text += child.rawText; continue; }
      const tag = child.rawTagName?.toLowerCase();
      const inner = walk(child);
      if (tag === 'code' || tag === 'tt' || tag === 'samp') text += `\`${inner.trim()}\``;
      else if (tag === 'em' || tag === 'i') text += `*${inner}*`;
      else if (tag === 'strong' || tag === 'b') text += `**${inner}**`;
      else if (tag === 'a') {
        const href = absolutize(child.getAttribute('href'), absolute);
        text += href ? `[${inner}](${href})` : inner;
      } else text += inner;
    }
    return text;
  };
  return decodeEntities(walk(clone)).replace(/\s+/g, ' ').trim();
}

/** @param {string | null | undefined} href @param {Map<string, string>} absolute @returns {string | null} */
function absolutize(href, absolute) {
  if (!href) return null;
  if (href.startsWith('#')) return null;
  if (/^https?:/.test(href)) return href;
  const [file, fragment] = href.split('#');
  const base = absolute.get(file.split('/').pop());
  return base ? `${base}${fragment ? `#${fragment}` : ''}` : null;
}

/**
 * How each linked page is addressed absolutely elsewhere in the book.
 *
 * A note links to a sibling page by bare file name, which would resolve to a
 * 404 on ours, and the upstream HTML only ever uses the bare name. The
 * translations already write the absolute form of the very same links, so the
 * canonical URL is read off those rather than guessed from a base URL.
 *
 * @param {string} book @param {Map<string, string>} [into] @returns {Map<string, string>}
 */
function absoluteLinkMap(book, into = new Map()) {
  const dir = path.join(root, 'content', book);
  const counts = new Map();
  if (!fs.existsSync(dir)) return into;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const source = fs.readFileSync(path.join(dir, entry.name), 'utf8');
    for (const match of source.matchAll(/https?:\/\/[^\s)"'#]+\.html/g)) {
      const href = match[0];
      const file = href.split('/').pop();
      const seen = counts.get(file) ?? new Map();
      seen.set(href, (seen.get(href) ?? 0) + 1);
      counts.set(file, seen);
    }
  }
  for (const [file, seen] of counts) {
    const [href] = [...seen].sort((a, b) => b[1] - a[1])[0];
    into.set(file, href);
  }
  return into;
}

/** @param {string} book @param {string} section @returns {Map<string, string>} note label to markdown */
function upstreamNotes(book, section, absolute) {
  const notes = new Map();
  const source = path.join(root, 'content-src', book, `${section.replace(/--index\.md$/, '')}.html`);
  if (!fs.existsSync(source)) return notes;
  for (const note of parse(fs.readFileSync(source, 'utf8')).querySelectorAll('li')) {
    const id = note.getAttribute('id');
    if (!id || !/^footnote-/.test(id)) continue;
    const body = noteToMarkdown(note, absolute);
    if (body) notes.set(id.replace('footnote-', ''), body);
  }
  return notes;
}

/**
 * A trailing numbered list that stands in for the note collection.
 *
 * Some translations kept the note bodies but lost the reference wiring, so the
 * notes sit at the bottom of the section as a plain list under a "footnotes"
 * heading. It is only read as the note collection when it starts at 1, runs
 * consecutively to the end of the section, and covers exactly the labels the
 * prose references — otherwise an ordinary numbered list would be swallowed.
 *
 * @param {string} body @param {Set<string>} referenced @returns {{body: string, notes: Map<string, string>}}
 */
function takeTrailingNoteList(body, referenced) {
  const lines = body.split('\n');
  let end = lines.length - 1;
  while (end >= 0 && !lines[end].trim()) end -= 1;
  const items = [];
  for (let index = end; index >= 0; index -= 1) {
    const match = lines[index].match(/^(\d+)\.\s+(.+)$/);
    if (!match) break;
    items.unshift({ line: index, label: match[1], text: match[2] });
  }
  const usable = items.length > 0
    && items.length === referenced.size
    && items.every((item, index) => item.label === String(index + 1))
    && [...referenced].every((label) => Number(label) >= 1 && Number(label) <= items.length);
  if (!usable) return { body, notes: new Map() };

  const kept = lines.slice(0, items[0].line);
  // The heading only labelled the list that is now a real footnote section.
  if (kept.length >= 2 && !kept[kept.length - 1].trim() && /^#{1,6}[ \t]/.test(kept[kept.length - 2])) {
    kept.length -= 2;
  }
  return {
    body: kept.join('\n').replace(/\n*$/, '\n'),
    notes: new Map(items.map((item) => [item.label, item.text])),
  };
}

/**
 * A note definition is only accepted when markdown-it reads it back as exactly
 * one footnote definition and no link, so a body full of stray brackets can
 * never leak a broken link into the page.
 *
 * @param {string} label @param {string} body
 */
function assertUsableNote(label, body) {
  const source = `[^${label}]\n\n[^${label}]: ${body}`;
  const tokens = probe.parse(source, {});
  if (tokens.filter((token) => token.type === 'footnote_open').length !== 1) {
    throw new Error(`note ${label} does not render as a footnote`);
  }
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type === 'image') throw new Error(`note ${label} renders an image`);
    if (token.type !== 'link_open') continue;
    const href = token.attrGet('href') ?? '';
    if (!/^https?:/.test(href)) throw new Error(`note ${label} links to ${href}`);
  }
}

const books = requested.length
  ? requested
  : fs.readdirSync(path.join(root, 'content'))
    .filter((name) => name.endsWith('-structure.json'))
    .map((name) => name.replace(/-structure\.json$/, ''));

const report = [];
for (const book of books) {
  const dir = path.join(root, 'content', book);
  if (!fs.existsSync(dir)) continue;

  const counts = { sections: 0, references: 0, restored: 0, adopted: 0, inPlace: 0, unresolved: 0, skipped: 0 };
  const absolute = new Map();

  for (const section of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const file = path.join(dir, section);
    const original = fs.readFileSync(file, 'utf8');
    if (!asciidocReference().test(original) && !htmlReference().test(original)) continue;
    if (!endsOutsideFence(original)) { counts.skipped += 1; continue; }
    counts.sections += 1;

    if (!absolute.size) absoluteLinkMap(book, absolute);
    const upstream = upstreamNotes(book, section, absolute);
    const defined = new Set();

    // Notes the translation already carries keep their own translated body.
    let body = mapProseLines(original, (line) => {
      const match = line.match(inlineDefinition());
      if (!match) return line;
      const [, , label, text, back] = match;
      if (label !== back) throw new Error(`${file}: note ${label} returns to #fnref:${back}`);
      assertUsableNote(label, text);
      defined.add(label);
      return `[^${label}]: ${text}`;
    });

    // References become markdown-it footnote references, and every note they
    // point at has to be defined — either above or by the upstream page.
    const referenced = new Map();
    for (const [pattern, labelOf] of [
      [asciidocReference(), (match) => match[2]],
      [htmlReference(), (match) => match[2]],
    ]) {
      body = mapProseLines(body, (line) => {
        for (const match of line.matchAll(pattern)) {
          const label = labelOf(match);
          if (match[1] !== label) throw new Error(`${file}: reference [${match[1]}] points at ${label}`);
          referenced.set(label, (referenced.get(label) ?? 0) + 1);
        }
        return line.replace(pattern, (_whole, label) => `[^${label}]`);
      });
    }
    for (const times of referenced.values()) counts.references += times;

    // A note collection the translation kept as a plain list is preferred over
    // the upstream copy, so a translated body is never replaced by its English
    // original.
    const trailing = takeTrailingNoteList(body, new Set(referenced.keys()));
    if (trailing.notes.size) {
      body = trailing.body;
      for (const [label, text] of trailing.notes) assertUsableNote(label, text);
      counts.adopted += trailing.notes.size;
    }

    const appended = new Map(trailing.notes);
    for (const label of referenced.keys()) {
      if (appended.has(label) || defined.has(label)) { counts.inPlace += 1; continue; }
      const note = upstream.get(label);
      if (!note) { counts.unresolved += 1; continue; }
      assertUsableNote(label, note);
      appended.set(label, note);
      counts.restored += 1;
    }

    if (write && (body !== original || appended.size)) {
      const additions = [...appended]
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([label, text]) => `[^${label}]: ${text}`)
        .join('\n');
      fs.writeFileSync(file, `${body.replace(/\n*$/, '\n')}${additions ? `\n${additions}\n` : ''}`);
    }
    if (log) {
      const parts = [];
      if (trailing.notes.size) parts.push(`${trailing.notes.size} notes adopted`);
      if (appended.size - trailing.notes.size) parts.push(`${appended.size - trailing.notes.size} restored`);
      if (body !== original) parts.push('references rewired');
      if (parts.length) console.log(`  ${book}/${section}: ${parts.join(', ')}`);
    }
  }

  if (counts.sections) report.push({ book, ...counts });
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} sections ${String(row.sections).padStart(3)}  references ${String(row.references).padStart(4)}`
    + `  restored ${String(row.restored).padStart(4)}  adopted ${String(row.adopted).padStart(3)}`
    + `  in-place ${String(row.inPlace).padStart(3)}`
    + `  unresolved ${row.unresolved}  skipped ${row.skipped}`,
  );
}
console.log(`\n${write ? 'applied' : 'dry run — pass --write to apply'}`);