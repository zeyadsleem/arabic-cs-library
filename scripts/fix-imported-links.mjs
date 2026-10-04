import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = process.argv.slice(2);

const normalize = (url) => {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname.replace(/\/index\.html$/, '/');
    pathname = pathname.replace(/\.html$/, '');
    return pathname.replace(/\/+$/, '') || '/';
  } catch (error) {
    return url;
  }
};

for (const book of books) {
  const dir = path.join(root, 'content', book);
  if (!fs.existsSync(dir)) {
    console.warn(`تخطّي ${book}: لا مجلد`);
    continue;
  }

  const sources = new Map();
  const files = fs.readdirSync(dir).filter((name) => name.endsWith('.md'));

  for (const name of files) {
    const raw = fs.readFileSync(path.join(dir, name), 'utf8');
    const source = raw.match(/^source:\s*(\S+)\s*$/m)?.[1];
    if (!source) continue;
    sources.set(normalize(source), name.replace('--index.md', ''));
  }

  let rewritten = 0;
  let externalized = 0;
  let filesChanged = 0;

  for (const name of files) {
    const target = path.join(dir, name);
    const raw = fs.readFileSync(target, 'utf8');
    const source = raw.match(/^source:\s*(\S+)\s*$/m)?.[1];
    const origin = source ? new URL(source).origin : null;

    const next = outsideCode(raw, (text) => text.replace(
      /\]\((?!https?:|mailto:|#|\/(?:arabic-cs-library|images|book|go-browser)\/)([^)\s]+)\)/g,
      (match, href) => {
        let absolute;
        try {
          absolute = source ? new URL(href, source).href : null;
        } catch (error) {
          return match;
        }
        const key = sources.get(normalize(absolute));
        if (key) {
          rewritten += 1;
          const fragment = href.includes('#') ? `#${href.split('#')[1]}` : '';
          return `](/book/${book}/${key}/index${fragment})`;
        }
        if (absolute) {
          externalized += 1;
          return `](${absolute})`;
        }
        return match;
      }
    ));

    if (next !== raw) {
      fs.writeFileSync(target, next);
      filesChanged += 1;
    }
  }

  console.log(
    `${book}: ${filesChanged} files updated, ${rewritten} internal links mapped, ${externalized} externalized`
  );
}
