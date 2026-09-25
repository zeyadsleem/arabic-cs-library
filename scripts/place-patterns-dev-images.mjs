import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'patterns-dev');
const sourceDir = path.join(root, 'content-src', 'patterns-dev', 'markdown');
const altMap = JSON.parse(
  fs.readFileSync(
    path.join(root, 'content-src', 'patterns-dev', 'image-alt-ar.json'),
    'utf8'
  )
);

const frontMatter = (raw) => {
  const match = raw.match(/^---\n[\s\S]*?\n---\n/);
  return match ? match[0] : '';
};

const items = (body) => {
  const parts = body.split(/\n\n+/);
  const list = [];
  let buffer = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith('```') && !/^```[\s\S]*```$/.test(trimmed)) {
      buffer.push(trimmed);
      continue;
    }
    if (buffer.length) {
      list.push({ type: 'code', text: buffer.join('\n\n') });
      buffer = [];
    }
    if (trimmed.startsWith('```')) {
      list.push({ type: 'code', text: trimmed });
    } else if (/^(!\[[^\]]*\]\([^)]+\)\s*)+$/.test(trimmed)) {
      for (const match of trimmed.matchAll(/!\[[^\]]*\]\([^)]+\)/g)) {
        list.push({ type: 'image', text: match[0] });
      }
    } else {
      const imageMatches = [...trimmed.matchAll(/!\[[^\]]*\]\([^)]+\)/g)];
      if (imageMatches.length) {
        let cursor = 0;
        for (const match of imageMatches) {
          const before = trimmed.slice(cursor, match.index).trim();
          if (before) list.push({ type: 'prose', text: before });
          list.push({ type: 'image', text: match[0] });
          cursor = match.index + match[0].length;
        }
        const after = trimmed.slice(cursor).trim();
        if (after) list.push({ type: 'prose', text: after });
        continue;
      }
      list.push({ type: 'prose', text: trimmed });
    }
  }
  if (buffer.length) list.push({ type: 'code', text: buffer.join('\n\n') });
  return list;
};

const count = (list, type) => list.filter((item) => item.type === type).length;

let placed = 0;
let appended = 0;
let altFixed = 0;
const report = [];

for (const file of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) {
  const target = path.join(contentDir, file);
  const source = path.join(sourceDir, file);
  if (!fs.existsSync(source)) continue;

  const sourceRaw = fs.readFileSync(source, 'utf8');
  const targetRaw = fs.readFileSync(target, 'utf8');

  const sourceBody = sourceRaw.slice(frontMatter(sourceRaw).length);
  const targetFm = frontMatter(targetRaw);
  const targetBody = targetRaw.slice(targetFm.length);

  const sourceItems = items(sourceBody).filter((item) => item.text);
  const targetItems = items(targetBody).filter((item) => item.text);

  const withoutImages = targetItems.filter((item) => item.type !== 'image');
  const aligned =
    count(sourceItems, 'prose') === count(withoutImages, 'prose') &&
    count(sourceItems, 'code') === count(withoutImages, 'code');

  const out = [];
  if (aligned) {
    let pointer = 0;
    const emitted = [];
    for (const item of sourceItems) {
      if (item.type === 'image') {
        out.push(item);
        emitted.push(item.text);
        continue;
      }
      while (
        pointer < withoutImages.length &&
        withoutImages[pointer].type !== item.type
      ) {
        pointer += 1;
      }
      const next = withoutImages[pointer];
      if (!next) break;
      out.push(next);
      pointer += 1;
    }
    for (const item of sourceItems) {
      if (item.type === 'image' && !emitted.includes(item.text)) {
        out.push(item);
        report.push(`${file}: صورة زائدة أُضيفت في النهاية`);
      }
    }
  } else {
    report.push(`${file}: تعذّر المحاذاة (${count(sourceItems, 'prose')}/${count(withoutImages, 'prose')} فقرة)`);
    out.push(...withoutImages);
    for (const item of sourceItems) {
      if (item.type === 'image') out.push(item);
    }
  }

  let body = out
    .filter((item) => item.text)
    .map((item) => item.text)
    .join('\n\n');

  for (const match of [...body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]) {
    const name = path.basename(match[2]);
    const arabic = altMap[name];
    if (arabic && arabic !== match[1]) {
      body = body.replace(match[0], `![${arabic}](${match[2]})`);
      altFixed += 1;
    }
  }

  const imageCount = body
    .split(/\n\n+/)
    .filter((block) => block.startsWith('![')).length;
  if (aligned) placed += imageCount;
  else appended += imageCount;

  fs.writeFileSync(target, `${targetFm}${body.replace(/\n{3,}/g, '\n\n').trim()}\n`);
}

console.log(
  `images placed inline: ${placed}, appended (unaligned): ${appended}, alt texts translated: ${altFixed}`
);
if (report.length) console.log(report.join('\n'));
