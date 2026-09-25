import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'patterns-dev');
const sourceDir = path.join(root, 'content-src', 'patterns-dev', 'markdown');

const splitBlocks = (raw) => {
  const parts = raw.split(/(```[\s\S]*?```)/g);
  return parts.map((part) => part.trim());
};

let fixedCode = 0;
let cleanedCss = 0;
let missing = 0;

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const source = path.join(sourceDir, file.replace('--index.md', '.md'));
  let text = fs.readFileSync(target, 'utf8');
  const original = text;

  const leaked = text
    .split('\n\n')
    .filter((block) => /^astro-island,astro-slot/.test(block.trim()));
  if (leaked.length) {
    text = text
      .split('\n\n')
      .filter((block) => !/^astro-island,astro-slot/.test(block.trim()))
      .join('\n\n');
    cleanedCss += leaked.length;
  }

  if (!fs.existsSync(source)) {
    missing += 1;
    continue;
  }

  const sourceBlocks = splitBlocks(fs.readFileSync(source, 'utf8'));
  const sourceCode = sourceBlocks.filter((block) => block.startsWith('```'));
  let index = 0;
  text = text
    .split(/(```[\s\S]*?```)/g)
    .map((part) => {
      if (!part.trim().startsWith('```')) return part;
      const replacement = sourceCode[index];
      index += 1;
      return replacement || part;
    })
    .join('');

  if (index !== sourceCode.length) {
    console.warn(
      `${file}: عدد أسوار الشيفرة مختلف (المترجم ${index} والمصدر ${sourceCode.length})`
    );
  } else {
    fixedCode += index;
  }

  if (text !== original) {
    fs.writeFileSync(target, text);
  }
}

console.log(
  `code blocks fixed: ${fixedCode}, css blocks removed: ${cleanedCss}, missing sources: ${missing}`
);
