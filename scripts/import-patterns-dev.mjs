import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', 'patterns-dev');
const imageDir = path.join(root, 'static', 'images', 'patterns-dev');

const origin = 'https://www.patterns.dev';

const groups = {
  vanilla: 'أنماط JavaScript',
  react: 'أنماط React وNext.js',
  vue: 'أنماط Vue',
};

const get = async (url, attempts = 5) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
  }
  throw new Error(`تعذّر التحميل بعد ${attempts} محاولات: ${url}`);
};

const decode = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const inline = (html) => {
  let out = html;
  out = out.replace(/<br\s*\/?>/g, ' ');
  out = out.replace(
    /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (_, href, text) => `[${text.trim()}](${href})`
  );
  out = out.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/g,
    (_, code) => `\`${decode(code.replace(/<[^>]+>/g, ''))}\``
  );
  out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1**');
  out = out.replace(/<b[^>]*>([\s\S]*?)<\/b>/g, '**$1**');
  out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, '*$1*');
  out = out.replace(/<i[^>]*>([\s\S]*?)<\/i>/g, '*$1*');
  out = out.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1');
  out = out.replace(/<[^>]+>/g, '');
  return decode(out).replace(/\s+/g, ' ').trim();
};

const list = (html) => {
  const items = [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const itemHtml = match[1];
    const nested = itemHtml.match(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/);
    if (nested) {
      items.push(`- ${inline(itemHtml.replace(nested[0], ''))}`);
      items.push(list(nested[2]));
    } else {
      items.push(`- ${inline(itemHtml)}`);
    }
  }
  return items.filter(Boolean).join('\n');
};

const toTable = (html) => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/g)].map((cell) =>
      inline(cell[2])
    )
  );
  if (rows.length < 2) return '';
  const width = Math.max(...rows.map((cells) => cells.length));
  const pad = (cells) => [
    ...cells,
    ...Array.from({ length: width - cells.length }, () => ''),
  ];
  return [
    `| ${pad(rows[0]).join(' | ')} |`,
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...rows.slice(1).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ].join('\n');
};

const languageMap = {
  js: 'javascript',
  jsx: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  typescript: 'typescript',
  sh: 'bash',
  shell: 'bash',
  bash: 'bash',
  html: 'xml',
  xml: 'xml',
  svg: 'xml',
  css: 'css',
  scss: 'css',
  json: 'json',
  json5: 'json',
  py: 'python',
  python: 'python',
  sql: 'sql',
  yaml: 'yaml',
  yml: 'yaml',
  php: 'php',
  go: 'go',
  rust: 'rust',
  diff: 'diff',
};

const detectLanguage = (code) => {
  const value = code.trim();
  if (!value) return '';
  if (/^<(\?xml|!DOCTYPE|html|svg)/i.test(value)) return 'xml';
  if (/^diff --git|^--- |\+\+\+ /m.test(value)) return 'diff';
  if (/^(\$\s|#!|\s*sudo |\s*apt |\s*npm |\s*npx |\s*curl |\s*git |\s*cd |\s*echo )/m.test(value))
    return 'bash';
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/im.test(value)) return 'sql';
  if (/\b(def |import \w+|print\(|self\.)/.test(value) && /:\s*\n\s+\S/.test(value))
    return 'python';
  if (/^[\w./-]+:\s/m.test(value) && /^\s{2,}\S/m.test(value) && !/[{};]/.test(value))
    return 'yaml';
  if (/\b(interface |type \w+ =|enum \w+)\b/.test(value)) return 'typescript';
  if (/\b(import |export |const |let |function |=>|document\.|console\.)/.test(value))
    return 'javascript';
  if (/^\s*[{[]/.test(value) && /[}\]]/.test(value)) return 'json';
  if (/\b(public|private|protected)\s+\w+|System\.out|#include/.test(value))
    return 'java';
  if (/package |func main|:= /m.test(value)) return 'go';
  return 'javascript';
};

const convert = (html, images = []) => {
  const codeBlocks = [];
  const rest0 = html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (_, attrs, code) => {
    const raw = `${attrs} ${code}`;
    const found = raw.match(/language-([\w-]+)/)?.[1] || '';
    const cleaned = code
      .replace(/<span[^>]*user-select:none[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<div class="token-line"[^>]*>/g, '\n')
      .replace(/<\/div>\s*<div class="token-line"[^>]*>/g, '\n')
      .replace(/<span class="line"[^>]*>/g, '\n')
      .replace(/<\/span>(?=\s*<span class="line")/g, '');
    const text = decode(
      cleaned.replace(/<[^>]+>/g, '').replace(/^\n+/, '').replace(/\s+$/, '')
    );
    const language = languageMap[found] || found || detectLanguage(text);
    codeBlocks.push({ language, text });
    return ` CODE${codeBlocks.length - 1}END `;
  });

  const rest = rest0.replace(
    / IMAGE(\d+)END /g,
    (match, index) => ` ![${images[Number(index)]?.alt || ''}](${images[Number(index)]?.local || ''}) `
  );

  const chunks = [];
  const segments = rest.split(/( CODE\d+END )/);
  const pattern =
    /<(h[1-6]|p|ul|ol|blockquote|table|figure)[^>]*>([\s\S]*?)<\/\1>|<hr\s*\/?>/g;

  for (const [index, segment] of segments.entries()) {
    if (index % 2 === 1) {
      const block = codeBlocks[Number(segment.match(/CODE(\d+)END/)[1])];
      chunks.push(`\`\`\`${block.language}\n${block.text}\n\`\`\``);
      continue;
    }

    const pushText = (text) => {
      const clean = text.replace(/CODE\d+END/g, '').trim();
      if (clean) chunks.push(inline(clean));
    };

    let cursor = 0;
    let match;
    while ((match = pattern.exec(segment)) !== null) {
      pushText(segment.slice(cursor, match.index));
      cursor = match.index + match[0].length;
      const tag = match[1];
      const inner = match[2] || '';
      if (tag === 'hr') {
        chunks.push('---');
      } else if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        const id = inner.match(/id="([^"]+)"/)?.[1];
        chunks.push(
          `${'#'.repeat(Math.min(level, 4))} ${inline(inner)}${
            id ? ` {#${id}}` : ''
          }`
        );
      } else if (tag === 'p') {
        const value = inline(inner);
        if (value) chunks.push(value);
      } else if (tag === 'ul' || tag === 'ol') {
        const value = list(inner);
        if (value) chunks.push(value);
      } else if (tag === 'blockquote') {
        const value = inner
          .split(/\n{2,}/)
          .map((line) => `> ${inline(line)}`)
          .join('\n> ');
        if (value) chunks.push(value);
      } else if (tag === 'table') {
        const value = toTable(inner);
        if (value) chunks.push(value);
      } else if (tag === 'figure') {
        const caption = inner.match(
          /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/
        );
        if (caption) chunks.push(`*${inline(caption[1])}*`);
      }
    }
    pushText(segment.slice(cursor));
  }

  return chunks.join('\n\n');
};

const saveImage = async (src, name) => {
  const target = path.join(imageDir, `${name}.webp`);
  const local = `/images/patterns-dev/${name}.webp`;
  if (fs.existsSync(target)) return local;
  try {
    const response = await get(new URL(src, origin), 3);
    const buffer = Buffer.from(await response.arrayBuffer());
    const raw = path.join(imageDir, `${name}.raw`);
    fs.writeFileSync(raw, buffer);
    try {
      execFileSync(
        'magick',
        [
          'convert',
          raw,
          '-auto-orient',
          '-resize',
          '1400x1400>',
          '-strip',
          '-define',
          'webp:method=6',
          '-quality',
          '72',
          target,
        ],
        { stdio: 'ignore' }
      );
    } catch (error) {
      fs.writeFileSync(target, buffer);
    } finally {
      fs.rmSync(raw, { force: true });
    }
    return local;
  } catch (error) {
    console.warn(`تعذّر تنزيل صورة ${src}: ${error.message}`);
    return src;
  }
};

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(path.join(contentDir, 'patterns-dev'), { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const pages = fs
  .readFileSync(path.join(sourceDir, 'pages.txt'), 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

const chapters = [];
let images = 0;

for (const page of pages) {
  const [group, slug = 'index'] = page.split('/');
  const response = await get(`${origin}/${page}`);
  const html = await response.text();
  fs.writeFileSync(path.join(sourceDir, `${group}--${slug}.html`), html);

  const start = html.indexOf('<article');
  const end = html.indexOf('</article>');
  if (start < 0 || end < 0) {
    throw new Error(`لم يُعثر على محتوى المقال في ${page}`);
  }
  const openTagEnd = html.indexOf('>', start);
  let article = html.slice(openTagEnd + 1, end);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim() || slug;

  article = article.replace(/<(style|script)[\s\S]*?<\/\1>/g, '');
  article = article.replace(/<header[\s\S]*?<\/header>/, '');

  const imageMeta = [];
  article = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src || /pages\/(about|home)\//.test(src) || /team member/i.test(alt)) {
      return '';
    }
    imageMeta.push({ src, alt, local: src });
    return ` IMAGE${imageMeta.length - 1}END `;
  });

  for (const [index, image] of imageMeta.entries()) {
    if (!image.src.startsWith('/')) continue;
    const name = `${group}-${slug}-${index}-${path
      .basename(image.src)
      .replace(/[^.\w]/g, '_')
      .replace(/\.\w+$/, '')}`;
    imageMeta[index].local = await saveImage(image.src, name);
    images += 1;
  }

  const markdown = convert(article, imageMeta);
  const sourceFile = path.join(sourceDir, 'markdown', `${group}--${slug}.md`);
  fs.mkdirSync(path.dirname(sourceFile), { recursive: true });
  fs.writeFileSync(
    sourceFile,
    `---\ntitle: ${title}\nlang: en\nsource: https://www.patterns.dev/${page}/\n---\n\n${markdown}\n`
  );

  const file = path.join(contentDir, 'patterns-dev', `${group}--${slug}.md`);
  const existing = fs.existsSync(file)
    ? fs.readFileSync(file, 'utf8')
    : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: ${title}\nlang: en\nsource: https://www.patterns.dev/${page}/\n---\n\n${markdown}\n`
    );
  }

  if (slug === 'index') {
    chapters.push({
      key: group,
      title: groups[group],
      titleAr: groups[group],
      sections: [],
    });
  }
  const chapter = chapters.find((item) => item.key === group);
  chapter.sections.push({
    slug: slug === 'index' ? 'index' : slug,
    title,
    order: chapter.sections.length,
  });
  console.log(`${page} → ${markdown.length} chars`);
}

const ordered = ['vanilla', 'react', 'vue']
  .map((group) => chapters.find((item) => item.key === group))
  .filter(Boolean);

fs.writeFileSync(
  path.join(contentDir, 'patterns-dev-structure.json'),
  JSON.stringify({ chapters: ordered }, null, 2)
);
console.log(
  `done: ${ordered.length} chapters, ${ordered.reduce(
    (sum, chapter) => sum + chapter.sections.length,
    0
  )} pages, ${images} images`
);
