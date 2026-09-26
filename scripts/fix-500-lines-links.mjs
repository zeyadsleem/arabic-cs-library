import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', '500-lines');
const sourceDir = path.join(root, 'content-src', '500-lines');
const repo = 'https://github.com/aosabook/500lines/blob/master';

let fixed = 0;
let licenseLinks = 0;

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const source = path.join(sourceDir, file.replace('--index.md', '.md'));
  let text = fs.readFileSync(target, 'utf8');
  const original = text;

  text = text.replace(
    /(\[\^?\d+\]:\s*)\[([^\]]+)\]\(([^)]+)\)/g,
    (match, prefix, label, href) =>
      label === href ? `${prefix}${href}` : match
  );

  text = text.replace(
    /\]\((?!https?:|#|\/)([^)]+)\)/g,
    (match, href) => `](${repo}/${href})`
  );

  if (text !== original) {
    fs.writeFileSync(target, text);
    fixed += 1;
  }
  licenseLinks += (text.match(/500lines\/blob\/master\//g) || []).length;
}

console.log(`files changed: ${fixed}, repository links rewritten: ${licenseLinks}`);
