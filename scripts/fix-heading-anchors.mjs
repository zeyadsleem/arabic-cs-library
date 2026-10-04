import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import MarkdownIt from 'markdown-it';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const content = path.join(root, 'content');

// Translators kept the upstream anchors as links on each heading — `[#](#id)`
// after the title, `[](#id)` before it, and network-security's `[↗](#id)`
// permalink glyph after it. markdown-it renders the first two as empty
// hyperlinks whose target exists nowhere, and the third as a link to a target
// that exists nowhere, so every cross-reference to the heading is dead. The
// anchor belongs on the heading itself, which is the form the rest of the
// pipeline already understands (`{#id}`), so move it there and drop the link.
// Heading prose is left byte-for-byte identical; the ↗ glyph is Sphinx's own
// decoration for an anchor that the heading now carries directly.
const anchors = () => /\[(?:#|↗)?\]\(#([^)\s]+)\)/g;
const fence = /^ {0,3}(`{3,}|~{3,})(.*)$/;

function moveHeadingAnchors(source) {
  let open = null;
  return source
    .split(/(?<=\n)/)
    .map((line) => {
      const marker = line.match(fence);
      if (open) {
        if (marker && marker[1][0] === open[0] && marker[1].length >= open.length && !marker[2].trim()) open = null;
        return line;
      }
      if (marker) {
        open = marker[1];
        return line;
      }
      const heading = line.match(/^(#{1,6}[ \t]+)(.*)(\n?)$/);
      if (!heading) return line;
      const ids = [...heading[2].matchAll(anchors())].map((match) => match[1]);
      if (!ids.length) return line;
      const title = heading[2].replace(anchors(), '').trim();
      return `${heading[1]}${title} {#${ids.join(' #')}}${heading[3]}`;
    })
    .join('');
}

const parser = new MarkdownIt({ html: true });
function code(text) {
  const values = [];
  function visit(tokens) {
    for (const token of tokens) {
      if (['fence', 'code_block', 'code_inline'].includes(token.type)) values.push({ type: token.type, info: token.info, text: token.content });
      if (token.children) visit(token.children);
    }
  }
  visit(parser.parse(text, {}));
  return values;
}

let files = 0;
let moved = 0;
for (const book of fs.readdirSync(content)) {
  const directory = path.join(content, book);
  if (!fs.statSync(directory).isDirectory()) continue;
  for (const filename of fs.readdirSync(directory)) {
    if (!filename.endsWith('.md')) continue;
    const file = path.join(directory, filename);
    const before = fs.readFileSync(file, 'utf8');
    const targets = before.split('\n').filter((line) => /^#{1,6}[ \t]+/.test(line) && anchors().test(line));
    if (!targets.length) continue;
    const after = moveHeadingAnchors(before);
    assert.deepEqual(code(after), code(before), `Code changed in ${book}/${filename}`);
    for (const line of targets) {
      const heading = line.match(/^(#{1,6}[ \t]+)(.*)(\n?)$/);
      const ids = [...heading[2].matchAll(anchors())].map((match) => match[1]);
      const title = heading[2].replace(anchors(), '').trim();
      assert.ok(after.includes(`${heading[1]}${title} {#${ids.join(' #')}}`), `Lost heading text: ${line}`);
      moved += ids.length;
    }
    fs.writeFileSync(file, after);
    files += 1;
    console.log(`${book}/${filename}: ${targets.length} headings`);
  }
}
console.log(`Moved ${moved} heading anchors across ${files} files`);