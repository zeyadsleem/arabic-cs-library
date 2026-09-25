import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'patterns-dev');
const sourceDir = path.join(root, 'content-src', 'patterns-dev', 'markdown');

const splitBlocks = (raw) => raw.split(/(```[\s\S]*?```)/g);

const blocks = (raw) =>
  splitBlocks(raw)
    .map((part) => part.trim())
    .filter((part) => part.startsWith('```'));

const images = (raw) => [...raw.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[0]);

let fixedCode = 0;
let fixedImages = 0;
let cleanedCss = 0;
let missing = 0;

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const source = path.join(sourceDir, file);
  if (!fs.existsSync(source)) {
    missing += 1;
    continue;
  }
  const sourceRaw = fs.readFileSync(source, 'utf8');
  const sourceCode = blocks(sourceRaw);
  const sourceImages = images(sourceRaw);
  let text = fs.readFileSync(target, 'utf8');

  text = text
    .split(/\n{2,}/)
    .filter((block) => !/^astro-island,astro-slot/.test(block.trim()))
    .join('\n\n');

  let index = 0;
  let seenImages = 0;
  text = splitBlocks(text)
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed.startsWith('```')) {
        const lines = splitBlocks(part);
        return lines
          .map((line) =>
            line.trim().startsWith('```')
              ? line
              : line.replace(/!\[[^\]]*\]\([^)]+\)/g, (match) => {
                  const next = sourceImages[seenImages];
                  seenImages += 1;
                  return next || match;
                })
          )
          .join('');
      }
      const replacement = sourceCode[index];
      index += 1;
      return replacement ? `\n\n${replacement}\n\n` : part;
    })
    .join('');

  if (index !== sourceCode.length) {
    console.warn(
      `${file}: code fence mismatch (translated ${index}, source ${sourceCode.length})`
    );
  } else {
    fixedCode += index;
  }
  fixedImages += seenImages;

  text = text.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  fs.writeFileSync(target, text);
}

console.log(
  `code blocks fixed: ${fixedCode}, images placed: ${fixedImages}, missing sources: ${missing}`
);
