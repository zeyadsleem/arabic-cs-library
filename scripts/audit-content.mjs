import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'src/lib/generated/sections');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/generated/manifest.json'), 'utf8'));
const books = new Map(manifest.books.map((book) => [book.id, book]));
const report = { sections: 0, books: {}, images: {}, missingImages: [], invalidImages: [], mismatchedImages: [], remoteImages: [] };
const imageCache = new Map();

function imageKind(buffer) {
  if (buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') return 'webp';
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png';
  if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return 'jpg';
  if (/^GIF8[79]a/.test(buffer.subarray(0, 6).toString())) return 'gif';
  const head = buffer.subarray(0, 4000).toString('utf8').trim();
  if (/<svg[\s>]/i.test(head)) return 'svg';
  if (buffer.subarray(4, 8).toString() === 'ftyp' && /avif|avis/.test(buffer.subarray(8, 32).toString())) return 'avif';
  if (/<html|<!doctype html/i.test(head)) return 'html';
  return 'unknown';
}

function visibleText(node) {
  if (['PRE', 'CODE', 'SCRIPT', 'STYLE'].includes(node.tagName) || node.classList?.contains('katex')) return '';
  if (node.nodeType === 3) return node.textContent;
  return (node.childNodes || []).map(visibleText).join(' ');
}

for (const filename of fs.readdirSync(directory).filter((file) => file.endsWith('.json'))) {
  const section = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8'));
  const book = books.get(section.book);
  if (!book?.chapters) continue;
  report.sections += 1;
  const summary = report.books[book.id] ||= { sections: 0, images: 0, mathErrors: 0, issues: [], errorExamples: [] };
  summary.sections += 1;
  const document = parse(section.html);
  const text = visibleText(document);
  const patterns = {
    replacementCharacter: /\ufffd/g,
    privateUseCharacter: /[\ue000-\uf8ff]/g,
    conversionPlaceholder: /(?:IMAGE|CODE)\d+END/g,
    latexCommand: /\\(?:begin|end|includegraphics|aosafigure|aosatable|section|subsection|caption|ref|label|textbf|textit|footnote|todo)\b/g,
    rawCallout: /:::/g,
    headingAttribute: /\{#[^}\s]+\}/g,
    foreignScript: /[\u3400-\u9fff\u0400-\u04ff]/g
  };
  for (const [kind, pattern] of Object.entries(patterns)) {
    const hits = [...text.matchAll(pattern)];
    if (hits.length) summary.issues.push({ file: filename, kind, count: hits.length, examples: hits.slice(0, 3).map((hit) => text.slice(Math.max(0, hit.index - 70), hit.index + 150).replace(/\s+/g, ' ')) });
  }
  const errors = document.querySelectorAll('.katex-error, .math-unrendered');
  summary.mathErrors += errors.length;
  for (const error of errors.slice(0, 3)) {
    if (summary.errorExamples.length < 8) summary.errorExamples.push({ file: filename, tex: error.textContent, error: error.getAttribute('title') || error.getAttribute('data-math-error') });
  }
  for (const image of document.querySelectorAll('img')) {
    summary.images += 1;
    const src = image.getAttribute('src') || '';
    const reference = { book: book.id, file: filename, src };
    if (/^https?:/.test(src)) {
      report.images.remote = (report.images.remote || 0) + 1;
      report.remoteImages.push(reference);
      continue;
    }
    if (src.startsWith('data:')) { report.images.embedded = (report.images.embedded || 0) + 1; continue; }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(src.trim(), `https://library.invalid/arabic-cs-library/book/${book.id}/${section.chapter}/${section.slug}/`).pathname).replace(/^\/arabic-cs-library(?=\/)/, '');
    } catch {
      report.invalidImages.push({ ...reference, reason: 'invalid URL' }); continue;
    }
    const target = path.resolve(root, `static/${pathname.replace(/^\//, '')}`);
    if (!target.startsWith(path.join(root, 'static') + path.sep)) {
      report.invalidImages.push({ ...reference, reason: 'outside static' }); continue;
    }
    report.images.local = (report.images.local || 0) + 1;
    let inspected = imageCache.get(target);
    if (!inspected) {
      if (fs.existsSync(target)) {
        const bytes = fs.readFileSync(target);
        inspected = { kind: imageKind(bytes), path: path.relative(root, target), bytes: bytes.length, head: bytes.subarray(0, 60).toString('hex') };
      } else inspected = { kind: 'missing', path: path.relative(root, target) };
      imageCache.set(target, inspected);
    }
    if (inspected.kind === 'missing') report.missingImages.push({ ...reference, ...inspected });
    else if (['html', 'unknown'].includes(inspected.kind)) report.invalidImages.push({ ...reference, ...inspected });
    else if (inspected.kind !== path.extname(target).slice(1).toLowerCase().replace('jpeg', 'jpg')) report.mismatchedImages.push({ ...reference, ...inspected });
  }
}
report.images.uniqueLocalFiles = imageCache.size;
const output = process.argv[2] || '/tmp/opencode/content-audit.json';
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(`Audited ${report.sections} sections across ${Object.keys(report.books).length} books. Images: ${JSON.stringify(report.images)}`);
console.log(`Missing image references: ${report.missingImages.length}; invalid: ${report.invalidImages.length}; mismatched MIME: ${report.mismatchedImages.length}`);
for (const [id, book] of Object.entries(report.books)) {
  if (book.issues.length || book.mathErrors) console.log(`${id}: ${book.mathErrors} math errors, ${book.issues.reduce((sum, issue) => sum + issue.count, 0)} text artifacts (${[...new Set(book.issues.map((issue) => issue.kind))].join(', ')})`);
}
console.log(`Full report: ${output}`);
