import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const part = process.argv[2] === '2' ? '2' : '1';
const only = process.argv[3] || '';
const id = `nand2tetris-${part}`;
const origin = 'https://www.nand2tetris.org';
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', id);
const targetDir = path.join(contentDir, id);
const imageDir = path.join(root, 'static', 'images', id);
const structureFile = path.join(contentDir, `${id}-structure.json`);

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const numbers = part === '1' ? ['01', '02', '03', '04', '05', '06'] : ['07', '08', '09', '10', '11', '12'];

const titles = {
  '01': 'Project 1: Boolean Logic',
  '02': 'Project 2: Boolean Arithmetic',
  '03': 'Project 3: Memory',
  '04': 'Project 4: Machine Language',
  '05': 'Project 5: Computer Architecture',
  '06': 'Project 6: Assembler',
  '07': 'Project 7: VM I: Stack Arithmetic',
  '08': 'Project 8: VM II: Program Control',
  '09': 'Project 9: High-Level Language',
  '10': 'Project 10: Compiler I: Syntax Analysis',
  '11': 'Project 11: Compiler II: Code Generation',
  '12': 'Project 12: Operating System',
};

const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr', 'path', 'use', 'circle', 'rect']);

const fetchText = (url) => {
  const result = execFileSync('curl', ['-sSL', '--compressed', '-m', '300', '-w', '\n%{http_code}', url], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '120', url], {
    maxBuffer: 128 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync('magick', [raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target], {
      stdio: 'ignore',
      timeout: 60000,
    });
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const decodeEntities = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&copy;/g, '(c)');

const closeEnd = (html, open) => {
  let depth = 0;
  let i = open;
  while (i < html.length) {
    const next = html.indexOf('<', i);
    if (next < 0) return html.length;
    if (html.startsWith('</', next)) {
      depth -= 1;
      if (depth === 0) return html.indexOf('>', next) + 1;
      i = html.indexOf('>', next) + 1;
      continue;
    }
    if (html.startsWith('<!--', next)) {
      i = html.indexOf('-->', next) + 3;
      continue;
    }
    const tag = html.slice(next + 1).match(/^([a-zA-Z][a-zA-Z0-9]*)/)?.[1]?.toLowerCase();
    const gt = html.indexOf('>', next);
    if (gt < 0) return html.length;
    if (VOID.has(tag) || html[gt - 1] === '/') {
      if (depth === 0) return gt + 1;
      i = gt + 1;
      continue;
    }
    depth += 1;
    i = gt + 1;
  }
  return html.length;
};

const region = (html) => {
  const start = html.indexOf('data-testid="richTextElement"');
  if (start < 0) return '';
  const end = html.lastIndexOf('bottom of page');
  return end > start ? html.slice(start, end) : html.slice(start);
};

const keepLink = (href) =>
  Boolean(href) && href !== origin && href !== `${origin}/course` && !/wixstatic|parastorage|google\.com\/forms/i.test(href);

const inlineMarkdown = (html) => {
  let text = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, inner) => {
      const href = attrs.match(/href="([^"]*)"/)?.[1] || '';
      const label = inlineMarkdown(inner).trim();
      if (!label) return '';
      return keepLink(href) ? `[${label}](${href})` : label;
    })
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/g, (match, tag, inner) => `**${inlineMarkdown(inner)}**`)
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/g, (match, tag, inner) => `*${inlineMarkdown(inner)}*`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/g, (match, inner) => `\n- ${inlineMarkdown(inner).trim()}`)
    .replace(/<\/(p|ul|ol|div|h[1-6])>/g, '\n')
    .replace(/<[^>]+>/g, '');
  text = decodeEntities(text)
    .replace(/\u200b/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text;
};

const richTexts = (html) => {
  const found = [];
  let cursor = 0;
  while (cursor < html.length) {
    const next = html.indexOf('data-testid="richTextElement"', cursor);
    if (next < 0) break;
    const open = html.lastIndexOf('<div', next);
    const end = closeEnd(html, open);
    const inner = html.slice(open, end);
    const tag = inner.match(/<(p|h[1-6]|ul|ol)\b/)?.[1] || 'p';
    const text = inlineMarkdown(inner);
    if (text) {
      found.push({
        offset: open,
        end,
        tag,
        text,
        hidden: /F5F5DC|font-size:\s*10px/.test(inner.slice(0, 500)),
      });
    }
    cursor = end;
  }
  return found;
};

const rowContainers = (html) => {
  const found = [];
  let cursor = 0;
  while (cursor < html.length) {
    const next = html.indexOf('class="gpDCD5 ', cursor);
    if (next < 0) break;
    const open = html.lastIndexOf('<div', next);
    const end = closeEnd(html, open);
    const items = richTexts(html.slice(open, end));
    found.push({
      offset: open,
      end,
      values: items.filter((item) => !item.hidden).map((item) => item.text),
      labels: items.filter((item) => item.hidden).map((item) => item.text),
    });
    cursor = end;
  }
  return found;
};

const imageTags = (html) => {
  const found = [];
  let cursor = 0;
  while (cursor < html.length) {
    const next = html.indexOf('<img', cursor);
    if (next < 0) break;
    const gt = html.indexOf('>', next);
    if (gt < 0) break;
    const tag = html.slice(next, gt);
    cursor = gt + 1;
    const src = tag.match(/https:\/\/static\.wixstatic\.com\/media\/([^\s"'<>?]+)/)?.[1];
    if (src) found.push({ offset: next, src });
  }
  return found;
};

const FOOTER = /^(Home|Projects|Book|Software|Demos|License|Cool Stuff|Team|Stay in Touch|Q&A|Copyright)/;

const HEADING_LEVEL = { h1: 2, h2: 2, h3: 3, h4: 4, h5: 4, h6: 3 };

export const extractPage = (html) => {
  const body = region(html);
  const rows = rowContainers(body);
  const texts = richTexts(body);
  const images = imageTags(body);
  const titleOffset = texts.find((item) => /^Project \d+/.test(item.text))?.offset ?? 0;
  const blocks = [];
  const table = [];
  let headers = [];
  let seenTitle = false;
  const flush = () => {
    if (table.length === 0) return;
    blocks.push({ type: 'table', rows: table.slice() });
    table.length = 0;
  };
  const items = [
    ...rows.map((row) => ({ offset: row.offset, row })),
    ...texts.map((text) => ({ offset: text.offset, text })),
    ...images.filter((image) => image.offset > titleOffset).map((image) => ({ offset: image.offset, image })),
  ].sort((a, b) => a.offset - b.offset);
  const insideRow = (item) => rows.some((row) => item.offset >= row.offset && item.offset < row.end);
  for (const item of items) {
    if (item.image) {
      blocks.push({ type: 'image', src: item.image.src });
      continue;
    }
    if (item.row) {
      if (FOOTER.test([...item.row.values, ...item.row.labels].join(' '))) continue;
      const single =
        item.row.values.length + item.row.labels.length === 1
          ? (item.row.values[0] || item.row.labels[0])
          : '';
      if (single && single.length <= 40) {
        const dataLabels = new Set(
          table.filter((row) => row.values.length > 0).flatMap((row) => row.labels)
        );
        if (dataLabels.size >= 2 && !dataLabels.has(single)) flush();
        headers.push(single);
        table.push({ values: [], labels: [single] });
        continue;
      }
      table.push(item.row);
      continue;
    }
    if (insideRow(item)) continue;
    flush();
    const { text } = item;
    if (FOOTER.test(text.tag !== 'p' ? '' : text.text)) continue;
    if (!seenTitle) {
      seenTitle = true;
      if (text.tag !== 'p' && !/^Project \d+/.test(text.text)) continue;
      blocks.push({ type: 'heading', level: 2, text: text.text });
      continue;
    }
    blocks.push(
      text.tag === 'p'
        ? { type: 'para', text: text.text }
        : { type: 'heading', level: HEADING_LEVEL[text.tag] || 3, text: text.text }
    );
  }
  flush();
  return blocks;
};

const cell = (text) => String(text).replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|').trim();

const buildTable = (rows) => {
  const columns = new Map();
  const order = [];
  const note = (label) => {
    if (!columns.has(label)) {
      columns.set(label, []);
      order.push(label);
    }
  };
  for (const row of rows) {
    if (row.values.length === 0 && row.labels.length === 1) {
      note(row.labels[0]);
      continue;
    }
    const labels = row.labels.length > 0 ? row.labels : [row.labels[0]].filter(Boolean);
    labels.forEach(note);
    const push = (label, value) => {
      if (!label) return;
      note(label);
      columns.get(label).push(cell(value));
    };
    if (labels.length >= row.values.length) {
      row.values.forEach((value, index) => push(labels[index], value));
      continue;
    }
    const [first, ...rest] = row.values;
    push(labels[0], first ?? '');
    const last = labels[labels.length - 1];
    const extra = rest.join(' ');
    if (extra) {
      const index = columns.get(last).length - 1;
      columns.get(last)[index] = cell(`${columns.get(last)[index] || ''} ${extra}`);
    }
  }
  const labels = order.filter((label) => columns.get(label).length > 0);
  if (labels.length === 0) return '';
  const stem = (value) => value.replace(/\.[^.\s]+$/, '');
  const fileColumns = labels.filter((label) =>
    columns.get(label).every((value) => /^[^\s]+\.[A-Za-z0-9]+$/.test(value))
  );
  const anchor = fileColumns[0];
  const anchors = anchor ? [...new Set(columns.get(anchor).map(stem))] : null;
  const lines = [`| ${labels.join(' | ')} |`, `|${labels.map(() => '---').join('|')}|`];
  const height = Math.max(...labels.map((label) => columns.get(label).length));
  for (let index = 0; index < height; index += 1) {
    const cells = labels.map((label) => {
      const values = columns.get(label);
      if (anchors && label !== anchor && fileColumns.includes(label)) {
        const target = anchors[index] ?? stem(values[index] ?? '');
        const found = values.find((value) => {
          const name = stem(value);
          return name.startsWith(target) || target.startsWith(name);
        });
        return cell(found ?? ' ');
      }
      return cell(values[index] ?? ' ');
    });
    lines.push(`| ${cells.join(' | ')} |`);
  }
  return lines.join('\n');
};

const tableLabels = (block) =>
  block.type === 'table' ? [...new Set(block.rows.flatMap((row) => [...row.labels, ...row.values]))] : [];

const nearbyLabels = (blocks, index) =>
  blocks
    .slice(index + 1, index + 3)
    .flatMap((block) => (block.type === 'table' ? tableLabels(block) : []));

const dropCaptions = (blocks) =>
  blocks.filter((block, index) => {
    if (block.type !== 'para' || !block.text) return true;
    return !nearbyLabels(blocks, index).includes(block.text);
  });

const toMarkdown = (blocks, resolveImage) =>
  dropCaptions(blocks)
    .map((block) => {
      if (block.type === 'heading') return `${'#'.repeat(block.level)} ${block.text}`;
      if (block.type === 'image') return `![](${resolveImage(block.src)})`;
      if (block.type === 'table') return buildTable(block.rows);
      return block.text;
    })
    .join('\n\n');

const imageNames = new Map();
const failures = [];
const structure = { chapters: [] };
const existing = fs.existsSync(structureFile) ? JSON.parse(fs.readFileSync(structureFile, 'utf8')) : { chapters: [] };
const translated = existing.chapters.reduce((acc, chapter) => {
  if (chapter.titleAr) acc[chapter.key] = chapter.titleAr;
  return acc;
}, {});

for (const number of numbers) {
  if (only && number !== only) continue;
  const url = `${origin}/project${number}`;
  const cached = path.join(sourceDir, `project${number}.html`);
  let raw;
  if (fs.existsSync(cached) && process.env.N2T_LOCAL === '1') {
    raw = fs.readFileSync(cached, 'utf8');
  } else {
    try {
      raw = fetchText(url);
    } catch (error) {
      if (!fs.existsSync(cached)) {
        console.warn(`تخطّي ${number}: ${error.message}`);
        failures.push({ url, reason: error.message });
        continue;
      }
      console.warn(`استخدام النسخة المحلية لـ ${number}: ${error.message}`);
      raw = fs.readFileSync(cached, 'utf8');
    }
  }
  const blocks = extractPage(raw);
  if (process.env.N2T_DEBUG === '1') {
    for (const [index, block] of blocks.entries()) {
      const summary =
        block.type === 'table'
          ? block.rows.map((row) => JSON.stringify([row.values, row.labels])).join(' ; ')
          : block.text?.slice(0, 40);
      console.log(`  #${index} ${block.type}: ${summary}`);
    }
  }
  for (const block of blocks) {
    if (block.type !== 'image' || imageNames.has(block.src)) continue;
    const name = `project${number}-${path.basename(block.src).replace(/[^\w.-]/g, '_').slice(0, 32)}`;
    const webp = path.join(imageDir, `${name}.webp`);
    if (!fs.existsSync(webp)) {
      const rawFile = path.join(imageDir, `${name}.tmp`);
      try {
        fs.writeFileSync(rawFile, downloadBinary(`https://static.wixstatic.com/media/${block.src}`));
        optimize(rawFile, webp);
      } catch (error) {
        fs.rmSync(rawFile, { force: true });
        console.warn(`صورة ${name}: ${error.message}`);
      }
    }
    imageNames.set(
      block.src,
      fs.existsSync(webp) ? `/images/${id}/${name}.webp` : `https://static.wixstatic.com/media/${block.src}`
    );
  }
  const markdown = toMarkdown(blocks, (src) => imageNames.get(src) || src).replace(/\n{3,}/g, '\n\n');
  const target = path.join(targetDir, `project${number}--index.md`);
  if (fs.existsSync(target) && /lang:\s*ar/.test(fs.readFileSync(target, 'utf8'))) {
    console.warn(`تخطّي الكتابة (lang: ar): ${target}`);
  } else {
    fs.writeFileSync(target, `---\ntitle: ${JSON.stringify(titles[number])}\nlang: en\n---\n\n${markdown}\n`);
  }
  fs.writeFileSync(path.join(sourceDir, `project${number}.md`), `${markdown}\n`);
  console.log(`project${number}: ${markdown.split(/\s+/).length} words, ${markdown.split('\n').length} lines`);
  structure.chapters.push({
    key: `project${number}`,
    title: titles[number],
    ...(translated[`project${number}`] ? { titleAr: translated[`project${number}`] } : {}),
    sections: [{ slug: 'index', title: titles[number], order: Number(number) }],
  });
}

fs.writeFileSync(structureFile, `${JSON.stringify(structure, null, 2)}\n`);
fs.writeFileSync(path.join(sourceDir, 'image-map.json'), `${JSON.stringify(imageNames, null, 2)}\n`);
console.log(`\n${id}: ${structure.chapters.length} chapters`);
if (failures.length) for (const failure of failures) console.log(`  ${failure.url} — ${failure.reason}`);
