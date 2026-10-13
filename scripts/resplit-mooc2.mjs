/** Resplit remaining chunks (20, 60) into 3-page pieces. */
import fs from 'node:fs';

const remaining = [20, 60];

for (const num of remaining) {
  const input = `/tmp/opencode/mooc-translate-${num}.json`;
  if (!fs.existsSync(input)) {
    console.log(`Missing input ${input}`);
    continue;
  }
  const pages = JSON.parse(fs.readFileSync(input, 'utf8'));
  console.log(`Chunk ${num}: ${pages.length} pages`);
  for (let i = 0; i < pages.length; i += 3) {
    const chunk = pages.slice(i, i + 3);
    const outNum = num * 10 + Math.floor(i / 3);
    fs.writeFileSync(`/tmp/opencode/mooc-translate-${outNum}.json`, JSON.stringify(chunk, null, 2));
    console.log(`  -> Sub-chunk ${outNum}: ${chunk.length} pages (${chunk.map(p => p.key).join(', ')})`);
  }
}