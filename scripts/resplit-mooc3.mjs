/** Resplit remaining chunks (200, 201) into single pages. */
import fs from 'node:fs';

const remaining = [200, 201];

for (const num of remaining) {
  const input = `/tmp/opencode/mooc-translate-${num}.json`;
  if (!fs.existsSync(input)) {
    console.log(`Missing input ${input}`);
    continue;
  }
  const pages = JSON.parse(fs.readFileSync(input, 'utf8'));
  console.log(`Chunk ${num}: ${pages.length} pages`);
  for (let i = 0; i < pages.length; i++) {
    const chunk = [pages[i]];
    const outNum = num * 10 + i;
    fs.writeFileSync(`/tmp/opencode/mooc-translate-${outNum}.json`, JSON.stringify(chunk, null, 2));
    console.log(`  -> Sub-chunk ${outNum}: 1 page (${chunk[0].key})`);
  }
}