/** Extract translatable text segments from MOOC staged source.
 * Mirrors build-mooc.mjs tokenization: skips code fences, PROTECTED markup.
 * Records every prose run with /[a-zA-Z]{2}/ as a translation key (trimmed).
 * Also records page titles.
 * Outputs /tmp/opencode/mooc-keys.json (unique keys) and chunk files for translation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src', 'mooc');

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const isFenceEnd = (line, fence) => {
  const closer = line.match(FENCE);
  return Boolean(closer) && closer[1][0] === fence[0] && closer[1].length >= fence.length && !closer[2].trim();
};

const PROTECTED = /(``[^`\n]+``|`[^`\n]*`|\]\(\s*(?:<[^>\n]*>|[^()\s]*)(?:\s+"[^"\n]*")?\s*\)|<https?:\/\/[^>\s]+>|\{#[^}\s]+\})/g;

const segments = (line) => {
  const parts = [];
  let cursor = 0;
  for (const match of line.matchAll(PROTECTED)) {
    if (match.index > cursor) parts.push({ text: line.slice(cursor, match.index), preserved: false });
    parts.push({ text: match[0], preserved: true });
    cursor = match.index + match[0].length;
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor), preserved: false });
  return parts;
};

const translatable = (text) => /[a-zA-Z]{2}/.test(text.trim());
const hash = (text) => createHash('sha256').update(text).digest('hex');

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 1) continue;
    const value = line.slice(separator + 1).trim();
    data[line.slice(0, separator).trim()] = value.startsWith('"') ? JSON.parse(value) : value;
  }
  return { data, body: raw.slice(match[0].length) };
};

function main() {
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.md')).sort();
  const keys = new Set();
  const keyToPage = new Map();

  for (const file of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));

    // Record title
    if (translatable(data.title)) {
      const t = data.title.trim();
      keys.add(t);
      keyToPage.set(t, file);
    }

    // Record body segments
    const lines = body.split('\n');
    let fence = null;
    for (const line of lines) {
      const marker = line.match(FENCE);
      if (!fence && marker) {
        fence = marker[1];
        continue;
      }
      if (fence) {
        if (isFenceEnd(line, fence)) fence = null;
        continue;
      }
      for (const { text, preserved } of segments(line)) {
        if (preserved || !translatable(text)) continue;
        const trimmed = text.trim();
        if (trimmed) {
          keys.add(trimmed);
          keyToPage.set(trimmed, file);
        }
      }
    }
  }

  const keyArray = Array.from(keys).sort((a, b) => a.length - b.length);
  console.log(`Total unique translatable fragments: ${keyArray.length}`);
  console.log(`Total pages: ${files.length}`);

  // Write keys
  fs.writeFileSync('/tmp/opencode/mooc-keys.json', JSON.stringify(keyArray, null, 2));

  // Split into chunks of 200
  const chunkSize = 200;
  for (let i = 0; i < keyArray.length; i += chunkSize) {
    const chunk = keyArray.slice(i, i + chunkSize);
    fs.writeFileSync(`/tmp/opencode/mooc-chunk-${Math.floor(i / chunkSize)}.json`, JSON.stringify(chunk, null, 2));
  }
  console.log(`Created ${Math.ceil(keyArray.length / chunkSize)} chunk files`);
}

main();