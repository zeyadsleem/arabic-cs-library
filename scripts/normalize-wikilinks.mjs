import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import MarkdownIt from 'markdown-it';
import { fileURLToPath } from 'node:url';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const content = path.join(root, 'content');

// The translator wrapped every image and citation in an extra pair of brackets.
// Two shapes reach `content/`: `![[alt]](path)`, where the brackets hold the alt
// text only, and `[[Knu74](url)]`, where they hold the whole token. markdown-it
// has no wikilink syntax, so it parses the inner image or link and leaves the
// outer brackets as literal text that reaches the reader as a stray `[` or `]`.
// Strip the outer pair and keep the inner token; prose stays byte-for-byte equal.
const label = '((?:[^\\][]|\\[[^\\][]*\\])*)';
const inlinePattern = () => new RegExp(`(!?)\\[\\[${label}\\]\\(([^)\\s]+)\\)(\\{[^}]*\\})?\\]`, 'g');
const imagePattern = () => new RegExp(`(!?)\\[\\[${label}\\]\\]\\(([^)\\s]+)\\)(\\{[^}]*\\})?\\]?`, 'g');
// A path never contains a brace, so the attribute group cannot swallow the
// target and leave `path{#id}` behind the closing parenthesis.
const repair = () => /\]\(([^)\s{}]+)(\{[^}]*\})\)/g;
const patterns = [imagePattern, inlinePattern];

function unwrap(_all, bang, text, target, attributes) {
  return `${bang}[${text}](${target}${attributes ?? ''})`;
}

function stripWikilinks(source) {
  const unwrapped = patterns.reduce((text, pattern) => outsideCode(text, (prose) => prose.replace(pattern(), unwrap)), source);
  return outsideCode(unwrapped, (prose) => prose.replace(repair(), (_all, target, attributes) => `](${target})${attributes}`));
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

const books = process.argv.slice(2).filter((name) => !name.startsWith('-'));
let files = 0;
let stripped = 0;
for (const book of books.length > 0 ? books : fs.readdirSync(content)) {
  const directory = path.join(content, book);
  if (!fs.statSync(directory).isDirectory()) continue;
  for (const filename of fs.readdirSync(directory)) {
    if (!filename.endsWith('.md')) continue;
    const file = path.join(directory, filename);
    const before = fs.readFileSync(file, 'utf8');
    const matches = patterns.flatMap((pattern) => [...before.matchAll(pattern())].map((match) => ({ expected: unwrap(...match.slice(0, 5)), gone: match[0] })));
    matches.push(...[...before.matchAll(repair())].map((match) => ({ expected: `](${match[1]})${match[2]}`, gone: match[0] })));
    if (!matches.length) continue;
    const after = stripWikilinks(before);
    assert.deepEqual(code(after), code(before), `Code changed in ${book}/${filename}`);
    for (const { expected, gone } of matches) {
      assert.ok(after.includes(expected), `Lost token in ${book}/${filename}: ${expected}`);
      assert.ok(!after.includes(gone), `Wikilink survived in ${book}/${filename}: ${gone}`);
    }
    fs.writeFileSync(file, after);
    files += 1;
    stripped += matches.length;
    console.log(`${book}/${filename}: ${matches.length} tokens`);
  }
}
console.log(`Stripped ${stripped} wikilink wrappers across ${files} files`);