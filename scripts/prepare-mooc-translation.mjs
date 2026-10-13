/** Prepare MOOC page-level translation chunks.
 * Reads staged English source, creates JSON files with { title, body } per page
 * for subagents to translate. Outputs /tmp/opencode/mooc-translate-<N>.json
 * each containing an array of { key, title, body } for a batch of pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src', 'mooc');

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error('missing frontmatter');
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
  const pages = [];

  for (const file of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
    const key = `${data.chapter}--${data.slug}`;
    pages.push({ key, title: data.title, body });
  }

  console.log(`Total pages to translate: ${pages.length}`);

  // Split into chunks of 12 pages (~7-8 chunks)
  const chunkSize = 12;
  for (let i = 0; i < pages.length; i += chunkSize) {
    const chunk = pages.slice(i, i + chunkSize);
    const chunkNum = Math.floor(i / chunkSize);
    fs.writeFileSync(`/tmp/opencode/mooc-translate-${chunkNum}.json`, JSON.stringify(chunk, null, 2));
    console.log(`Chunk ${chunkNum}: ${chunk.length} pages (${chunk.map(p => p.key).join(', ')})`);
  }
}

main();