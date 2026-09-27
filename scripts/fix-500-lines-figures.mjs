import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const targets = [
  ...fs
    .readdirSync(path.join(root, 'content', '500-lines'))
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(root, 'content', '500-lines', name)),
  ...fs
    .readdirSync(path.join(root, 'content-src', '500-lines'))
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(root, 'content-src', '500-lines', name)),
];

let figures = 0;
let references = 0;
let cleaned = 0;
let files = 0;

for (const file of targets) {
  const raw = fs.readFileSync(file, 'utf8');
  const captions = new Map();

  let text = raw.replace(
    /\\aosafigure(?:\[[^\]]*\])?\{([^}]+)\}\{([^}]*)\}\{([^}]*)\}/g,
    (match, image, caption, label) => {
      captions.set(label.trim(), caption.trim());
      figures += 1;
      return `![${caption.trim()}](${image.trim()})`;
    }
  );

  text = text.replace(
    /(\/images\/[^\s{]+)\{([^}]*)\}\{([^}]*)\}/g,
    (match, image, caption, label) => {
      captions.set(label.trim(), caption.trim());
      figures += 1;
      return `![${caption.trim()}](${image.trim()})`;
    }
  );

  text = text.replace(
    /\\aosafigref(?:\[[^\]]*\])?\{([^}]+)\}/g,
    (match, label) => {
      references += 1;
      const key = label.trim();
      const caption = captions.get(key);
      if (caption) return caption;
      const last = key.split('.').pop() || key;
      return last.replace(/[-_]/g, ' ');
    }
  );

  const before = text.length;
  text = text
    .replace(/\\newpage\b/g, '')
    .replace(/\\noindent\b/g, '')
    .replace(/\\aosafigure(?:\[[^\]]*\])?/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  cleaned += before - text.length;

  if (text !== raw) {
    fs.writeFileSync(file, `${text}\n`);
    files += 1;
  }
}

console.log(
  `figures converted: ${figures}, references resolved: ${references}, files updated: ${files}, chars cleaned: ${cleaned}`
);
