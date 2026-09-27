import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', 'crypto-101');
const imageDir = path.join(root, 'static', 'images', 'crypto-101');
const raw = 'https://raw.githubusercontent.com/crypto101/book/master/src';

const pages = [
  ['foreword', 'foreword.rst', 'الكلمة التمهيدية'],
  ['building-blocks', 'building-blocks.rst', 'اللبنات الأساسية'],
  ['exclusive-or', 'exclusive-or.rst', 'الاو الحصري (XOR)'],
  ['block-ciphers', 'block-ciphers.rst', 'شيفرات الكتل'],
  ['stream-ciphers', 'stream-ciphers.rst', 'شيفرات التيار'],
  ['key-exchange', 'key-exchange.rst', 'تبادل المفاتيح'],
  ['public-key-encryption', 'public-key-encryption.rst', 'التشفير بالمفتاح العام'],
  ['hash-functions', 'hash-functions.rst', 'دوال التجزئة'],
  ['message-authentication-codes', 'message-authentication-codes.rst', 'رموز التحقق من الرسالة'],
  ['signature-algorithms', 'signature-algorithms.rst', 'خوارزميات التوقيع'],
  ['key-derivation-functions', 'key-derivation-functions.rst', 'دوال اشتقاق المفاتيح'],
  ['random-number-generators', 'random-number-generators.rst', 'مولّدات الأعداد العشوائية'],
  ['complete-cryptosystems', 'complete-cryptosystems.rst', 'أنظمة تشفير متكاملة'],
  ['off-the-record-messaging', 'off-the-record-messaging.rst', 'الرسائل التي لا تُخزَّن'],
  ['openpgp-and-gpg', 'openpgp-and-gpg.rst', 'OpenPGP وGPG'],
  ['ssl-and-tls', 'ssl-and-tls.rst', 'SSL وTLS'],
  ['appendices', 'appendices.rst', 'الملاحق'],
  ['glossary', 'glossary.rst', 'المسرد'],
];

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return result.slice(0, split);
};

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', url], {
    maxBuffer: 32 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const rstToMarkdown = (text) => {
  const lines = text.split('\n');
  const out = [];
  const imageMap = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (/^\.\. (code-block|code|math)::/.test(line)) {
      const language = line.split('::')[0].replace('.. ', '').split('-')[1] || '';
      index += 1;
      while (index < lines.length && !lines[index].trim()) index += 1;
      const block = [];
      const indent = lines[index]?.match(/^\s+/)?.[0].length || 2;
      while (
        index < lines.length &&
        (lines[index].trim() === '' || (lines[index].match(/^\s+/)?.[0].length || 0) >= indent)
      ) {
        block.push(lines[index].slice(Math.min(indent, lines[index].match(/^\s+/)?.[0].length || 0)));
        index += 1;
      }
      out.push('```' + language.replace('code-block', '') + '\n' + block.join('\n').trimEnd() + '\n```', '');
      continue;
    }

    if (/^\.\. (image|figure)::\s*(\S+)/.test(line)) {
      const src = line.replace(/^\.\. (image|figure)::\s*/, '').trim();
      const next = lines[index + 1] || '';
      const alt = next.replace(/^\s*:\w+:\s*/, '').trim();
      const name = `fig-${imageMap.length}-${path.basename(src).replace(/[^\w.-]/g, '_')}`;
      const target = path.join(imageDir, name);
      if (!fs.existsSync(target)) {
        try {
          const rawPath = path.join(imageDir, `${name}.raw`);
          fs.writeFileSync(rawPath, download(`${raw}/${src}`));
          try {
            execFileSync(
              'magick',
              ['convert', rawPath, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
              { stdio: 'ignore', timeout: 60000 }
            );
            fs.rmSync(rawPath, { force: true });
          } catch {
            fs.renameSync(rawPath, target);
          }
        } catch (error) {
          console.warn(`تعذّر تنزيل ${src}`);
        }
      }
      const local = fs.existsSync(target)
        ? `/images/crypto-101/${path.basename(target)}`
        : src;
      imageMap.push({ src, local });
      out.push(`![${alt}](${local})`, '');
      index += 1;
      continue;
    }

    if (/^[A-Z][^:]{2,40}$/.test(line) && index + 1 < lines.length && /^\s*$/.test(lines[index + 1] || '')) {
      const after = lines[index + 2] || '';
      if (/^\s*$/.test(after) || /^[=~^"'-]{3,}\s*$/.test(lines[index + 1] || '')) {
        index += 1;
        continue;
      }
    }

    if (
      index + 2 < lines.length &&
      /^\S[^:]{2,40}$/.test(line) &&
      /^[=~^"'-]{3,}\s*$/.test(lines[index + 1] || '') &&
      /^[=~^"'-]{3,}\s*$/.test(lines[index + 2] || '')
    ) {
      index += 1;
      continue;
    }

    if (/^\.\. (note|warning|tip|important|danger)::/.test(line)) {
      const kind = line.replace(/^\.\. /, '').replace('::', '');
      const labels = { note: 'ملاحظة', warning: 'تحذير', tip: 'تلميح', important: 'مهم', danger: 'خطر' };
      index += 1;
      while (index < lines.length && !lines[index].trim()) index += 1;
      const body = [];
      const indent = lines[index]?.match(/^\s+/)?.[0].length || 3;
      while (
        index < lines.length &&
        (lines[index].trim() === '' || (lines[index].match(/^\s+/)?.[0].length || 0) >= indent)
      ) {
        body.push(lines[index].slice(indent));
        index += 1;
      }
      out.push(`> **${labels[kind]}:** ${body.join(' ').trim()}`, '');
      continue;
    }

    const heading = line.match(/^(=+|-+|\^+|~+|"+)$/);
    if (heading && index > 0 && lines[index - 1].trim()) {
      const level = { '=': 1, '-': 2, '^': 3, '~': 4, '"': 5 }[heading[1][0]] || 2;
      out.push(`${'#'.repeat(Math.min(level, 4))} ${lines[index - 1].trim()}`);
      index += 1;
      continue;
    }

    if (/^\.\.\s+\w[\w-]*::/.test(line)) {
      index += 1;
      continue;
    }
    if (/^\.\.\s+_/.test(line)) {
      index += 1;
      continue;
    }

    const inlineLine = line
      .replace(/:([a-zA-Z_]+):`([^`]+)`/g, '`$2`')
      .replace(/``([^`]+)``/g, '`$1`')
      .replace(/`([^`]+)`_/g, '*$1*')
      .replace(/_`([^`]+)`/g, '*$1*')
      .replace(/`([^`]+)`/g, '`$1`')
      .replace(/\*\*([^*]+)\*\*/g, '**$1**')
      .replace(/^\s*:\w+:\s*/, '');

    out.push(inlineLine);
    index += 1;
  }

  let body = out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\[([^\]]*)\]_\s*$/gm, '')
    .replace(/\[#\w+\]_/g, '')
    .trim();

  const cleaned = body.split('\n');
  const firstHeading = cleaned.find((line) => line.startsWith('#'));
  if (firstHeading) {
    const headingText = firstHeading.replace(/^#+\s*/, '').trim().toLowerCase();
    while (cleaned.length && !cleaned[0].trim()) cleaned.shift();
    if (cleaned[0].trim().toLowerCase() === headingText) cleaned.shift();
    while (cleaned.length && !cleaned[0].trim()) cleaned.shift();
    body = cleaned.join('\n');
  }
  return body;
};

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(path.join(contentDir, 'crypto-101'), { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const structure = { chapters: [] };

for (const [slug, file, title] of pages) {
  let text;
  try {
    text = fetchText(`${raw}/${file}`);
  } catch (error) {
    console.warn(`تخطّي ${slug}`);
    continue;
  }
  fs.writeFileSync(path.join(sourceDir, `${slug}.rst`), text);
  const body = rstToMarkdown(text);
  fs.writeFileSync(
    path.join(sourceDir, `${slug}.md`),
    `---\ntitle: "${title}"\nlang: en\n---\n\n${body}\n`
  );
  const target = path.join(contentDir, 'crypto-101', `${slug}--index.md`);
  const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      target,
      `---\ntitle: "${title}"\nlang: en\nsource: https://www.crypto101.io/\n---\n\n${body}\n`
    );
  }
  structure.chapters.push({
    key: slug,
    title,
    titleAr: title,
    sections: [{ slug: 'index', title, order: structure.chapters.length }],
  });
  console.log(`${slug}: ${body.length} chars`);
}

fs.writeFileSync(
  path.join(contentDir, 'crypto-101-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${structure.chapters.length} chapters`);
