import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'db-design');
const sourceDir = path.join(root, 'content-src', 'db-design');

const codeBlocks = (raw) =>
  raw
    .split(/(```[\s\S]*?```)/g)
    .map((part) => part.trim())
    .filter((part) => part.startsWith('```'));

const spread = (text, blocks) => {
  const paragraphs = text.split(/\n{2,}/).filter((item) => item.trim());
  if (!paragraphs.length) return blocks.join('\n\n');
  const step = paragraphs.length / (blocks.length + 1);
  const out = [];
  let block = 0;
  paragraphs.forEach((paragraph, index) => {
    out.push(paragraph.trim());
    const next = Math.floor((index + 1) * step);
    if (block < blocks.length && next > index) {
      out.push(blocks[block]);
      block += 1;
    }
  });
  while (block < blocks.length) {
    out.push(blocks[block]);
    block += 1;
  }
  return out.join('\n\n');
};

let total = 0;
const report = [];

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const source = path.join(sourceDir, file.replace('--index.md', '.md'));
  if (!fs.existsSync(source)) continue;

  const sourceCode = codeBlocks(fs.readFileSync(source, 'utf8'));
  if (!sourceCode.length) continue;

  const raw = fs.readFileSync(target, 'utf8');
  const hasCode = raw.includes('```');
  let next;

  if (hasCode) {
    let index = 0;
    next = raw
      .split(/(```[\s\S]*?```)/g)
      .map((part) => {
        if (!part.trim().startsWith('```')) return part;
        const replacement = sourceCode[index] || part;
        index += 1;
        return `\n\n${replacement}\n\n`;
      })
      .join('');
  } else {
    const front = raw.match(/^---\n[\s\S]*?\n---\n/);
    const head = front ? front[0] : '';
    const body = raw.slice(head.length);
    next = head + spread(body, sourceCode);
  }

  fs.writeFileSync(target, next.replace(/\n{3,}/g, '\n\n').trim() + '\n');
  total += sourceCode.length;
  if (!hasCode) report.push(`${file}: ${sourceCode.length} blocks spread`);
}

console.log(`code blocks placed: ${total}`);
if (report.length) console.log(report.join('\n'));
