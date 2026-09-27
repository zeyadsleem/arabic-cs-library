import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceRoot = path.join(root, 'content-src');
const imageRoot = path.join(root, 'static', 'images');

const books = {
  ahastack: {
    title: 'مجموعة AHA: Astro وhtmx وAlpine',
    sourceUrl: 'https://ahastack.dev/',
    origin: 'https://ahastack.dev',
    contentSelector: 'main',
    pages: [
      ['overview', '/aha/1-stack-overview/', 'نظرة عامة على الحزمة'],
      ['astro', '/aha/2-astro/', 'Astro'],
      ['htmx', '/aha/3-htmx/', 'htmx'],
      ['alpine', '/aha/4-alpine/', 'Alpine.js'],
      ['conclusion', '/aha/5-conclusion/', 'الخلاصة'],
      ['whats-changed', '/aha/6-whats-changed/', 'ما تغيّر منذ 2024'],
      ['ai-agents', '/aha/7-ai-agents/', 'حزمة AHA للوكلاء الذكيين'],
      ['how-we-got-here', '/concepts/how-we-got-here/', 'كيف وصلنا إلى هنا'],
      ['html-first', '/concepts/html-first/', 'HTML أولاً'],
      ['simplicity', '/concepts/simplicity/', 'البساطة'],
      ['example-first', '/examples/1-first/', 'مثال أوّل'],
      ['example-alpine', '/examples/alpine/', 'إضافة Alpine'],
      ['example-contacts', '/examples/2-contacts/', 'مثال من كتاب Hypermedia Systems'],
      ['other-resources', '/examples/3-other-resources/', 'مصادر أخرى'],
      ['faq-why', '/faq/0/', 'لماذا؟'],
      ['faq-real-world', '/faq/1/', 'هل يعمل في العالم الحقيقي؟'],
      ['faq-scale', '/faq/2/', 'هل يتوسّع؟'],
      ['faq-too-simple', '/faq/3/', 'أليس هذا بسيطاً أكثر من اللازم؟'],
      ['faq-why-astro', '/faq/4/', 'لماذا Astro؟'],
      ['faq-mobile', '/faq/5/', 'وماذا عن تطبيقات الجوال؟'],
      ['faq-ajax', '/faq/6/', 'أليس هذا مجرد AJAX؟'],
      ['compare-spa', '/comparisons/compare-spa/', 'مقارنة مع تطبيق SPA'],
      ['compare-web-1', '/comparisons/compare-web-1/', 'مقارنة مع تطبيق Web 1.0'],
      ['similar-things', '/comparisons/similar-things/', 'هل هو مثل Hotwire أو Livewire؟'],
    ],
  },
  'network-security': {
    title: 'أمن الشبكات: مقاربة الأنظمة',
    sourceUrl: 'https://security.systemsapproach.org/',
    origin: 'https://security.systemsapproach.org',
    contentSelector: 'main',
    pages: [
      ['foreword', '/foreword.html', 'الكلمة الافتتاحية'],
      ['preface', '/preface.html', 'المقدمة'],
      ['principles', '/principles.html', 'مبادئ تصميم الشبكات'],
      ['systems', '/systems.html', 'أمن الشبكات من منظور الأنظمة'],
      ['infra', '/infra.html', 'أمن البنية التحتية'],
      ['crypto', '/crypto.html', 'التشفير في الشبكات'],
      ['key-distro', '/key-distro.html', 'توزيع المفاتيح'],
      ['firewall', '/firewall.html', 'جدران الحماية'],
      ['authentication', '/authentication.html', 'المصادقة والتفويض'],
      ['tls', '/tls.html', 'أمن طبقة النقل (TLS)'],
    ],
  },
};

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const downloadBinary = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      ['convert', raw, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const decode = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#215;/g, '×')
    .replace(/&#8230;/g, '…')
    .replace(/&copy;/g, '©')
    .replace(/&nbsp?;/g, ' ');

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
  out = out.replace(/<[^>]+>/g, '');
  return decode(out).replace(/\s+/g, ' ').trim();
};

const listItems = (html, ordered = false) => {
  const items = [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let match;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    index += 1;
    const marker = ordered ? `${index}.` : '-';
    items.push(`${marker} ${inline(match[1])}`);
  }
  return items.join('\n');
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

const detectLanguage = (code) => {
  const value = code.trim();
  if (!value) return '';
  if (/^<(\?xml|!DOCTYPE|html|svg)/i.test(value)) return 'html';
  if (/^(\$\s|#!|\s*sudo |\s*npm |\s*curl |\s*git |\s*cd |\s*echo |\s*npx )/m.test(value))
    return 'bash';
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/im.test(value)) return 'sql';
  if (/\b(import |from |def |print\()/.test(value)) return 'python';
  if (/\b(function |const |let |var |=>|console\.)/.test(value)) return 'javascript';
  if (/\b(fail|require|def |val |match )/.test(value) && /=>/.test(value)) return 'ocaml';
  if (/^\s*[{[]/.test(value) && /[}\]]/.test(value)) return 'json';
  return '';
};

const convert = (html, images) => {
  const codeBlocks = [];
  let rest = html.replace(
    /<pre([^>]*)>([\s\S]*?)<\/pre>/g,
    (_, attrs, inner) => {
      const language =
        attrs.match(/data-language="([^"]+)"/)?.[1] ||
        attrs.match(/language-([\w-]+)/)?.[1] ||
        '';
      const text = decode(
        inner
          .replace(/<\/span>\s*(?=<span class="line"|<!--|\n)/g, '')
          .replace(/<div class="ec-line"[^>]*>/g, '\n')
          .replace(/<span class="line"[^>]*>/g, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/^\n+/, '')
          .replace(/\s+$/, '')
          .replace(/\n{3,}/g, '\n\n')
      );
      codeBlocks.push({ language, text });
      return ` CODE${codeBlocks.length - 1}END `;
    }
  );

  rest = rest.replace(/ IMAGE(\d+)END /g, (match, index) => {
    const image = images[Number(index)];
    return image ? ` ![${image.alt || ''}](${image.local}) ` : '';
  });

  // unwrap container elements so their text is not dropped
  const flat = rest
    .replace(/<(\/?)(div|section|main|article|span|figure|figcaption|details|summary|label|button|form|input|svg|path)([^>]*)>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<button[\s\S]*?<\/button>/g, '');

  const chunks = [];
  const segments = flat.split(/( CODE\d+END )/);
  const pattern =
    /<(h[1-6]|p|ul|ol|blockquote|table|pre)[^>]*>([\s\S]*?)<\/\1>|<hr\s*\/?>/g;

  for (const [index, segment] of segments.entries()) {
    if (index % 2 === 1) {
      const block = codeBlocks[Number(segment.match(/CODE(\d+)END/)[1])];
      if (block) {
        chunks.push(
          '```' + (block.language || detectLanguage(block.text)) + '\n' + block.text + '\n```'
        );
      }
      continue;
    }

    let cursor = 0;
    let match;
    const local = new RegExp(pattern.source, 'g');
    while ((match = local.exec(segment)) !== null) {
      const text = inline(segment.slice(cursor, match.index));
      if (text) chunks.push(text);
      cursor = match.index + match[0].length;
      const tag = match[1];
      const inner = match[2] || '';
      if (tag === 'hr') chunks.push('---');
      else if (tag === 'pre') {
        const value = decode(inner.replace(/<[^>]+>/g, '').trim());
        if (value) chunks.push('```\n' + value + '\n```');
      } else if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        const id = inner.match(/id="([^"]+)"/)?.[1];
        chunks.push(
          `${'#'.repeat(Math.min(level, 4))} ${inline(inner)}${id ? ` {#${id}}` : ''}`
        );
      } else if (tag === 'p') {
        const value = inline(inner);
        if (value) chunks.push(value);
      } else if (tag === 'ul' || tag === 'ol') {
        const value = listItems(inner, tag === 'ol');
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
      }
    }
    const tail = inline(segment.slice(cursor));
    if (tail) chunks.push(tail);
  }

  return chunks.join('\n\n');
};

const extractMain = (html, selector) => {
  const patterns = selector
    ? [
        new RegExp(`<div[^>]*role="${selector}"[^>]*>`, 'i'),
        new RegExp(`<${selector}[^>]*>`, 'i'),
      ]
    : [];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return html.slice(html.indexOf(match[0]) + match[0].length);
    }
  }
  return html;
};

for (const [id, book] of Object.entries(books)) {
  const sourceDir = path.join(sourceRoot, id);
  const targetDir = path.join(contentDir, id);
  const imageDir = path.join(imageRoot, id);
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(imageDir, { recursive: true });

  const structure = { chapters: [] };
  const imageMap = {};
  let count = 0;

  for (const [slug, urlPath, title] of book.pages) {
    const url = `${book.origin}${urlPath}`;
    let html;
    try {
      html = fetchText(url);
    } catch (error) {
      console.warn(`تخطّي ${id}/${slug}: ${error.message}`);
      continue;
    }
    fs.writeFileSync(path.join(sourceDir, `${slug}.html`), html);

    let article = extractMain(html, book.contentSelector);
    const nav = article.indexOf('<nav');
    if (nav > 0) article = article.slice(0, nav);
    article = article
      .replace(/<(script|style|form|aside|footer|header|nav)[\s\S]*?<\/\1>/g, '')
      .replace(/<div class="[^"]*sidebar[^"]*"[\s\S]*?<\/div>/g, '');

    const images = [];
    article = article.replace(/<img[^>]*>/g, (tag) => {
      const src =
        tag.match(/data-lazy-src="([^"]+)"/)?.[1] ??
        tag.match(/src="([^"]+)"/)?.[1];
      const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
      if (!src || src.startsWith('data:')) return '';
      const resolved = new URL(src, book.origin);
      const name = `${slug}-${images.length}-${path
        .basename(resolved.pathname)
        .replace(/[^.\w-]/g, '_')}`;
      const target = path.join(imageDir, name);
      const webp = target.replace(/\.\w+$/, '.webp');
      if (!fs.existsSync(webp)) {
        try {
          const raw = path.join(imageDir, `${name}.raw`);
          fs.writeFileSync(raw, downloadBinary(resolved.href));
          optimize(raw, webp);
        } catch (error) {
          console.warn(`تعذّر تنزيل ${resolved.href}`);
        }
      }
      const local = fs.existsSync(webp)
        ? `/images/${id}/${path.basename(webp)}`
        : src;
      imageMap[src] = local;
      images.push({ src, alt, local });
      return ` IMAGE${images.length - 1}END `;
    });

    const markdown = convert(article, images);
    const body = markdown
      .replace(/^#\s+.*\n/, '')
      .replace(/^#\s+.*\n/, '')
      .trim();

    fs.writeFileSync(
      path.join(sourceDir, `${slug}.md`),
      `---\ntitle: "${title}"\nlang: en\n---\n\n${body}\n`
    );

    const file = path.join(targetDir, `${slug}--index.md`);
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    if (!/lang: ar/.test(existing)) {
      fs.writeFileSync(
        file,
        `---\ntitle: "${title}"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
      );
    }

    structure.chapters.push({
      key: slug,
      title,
      titleAr: title,
      sections: [{ slug: 'index', title, order: count }],
    });
    count += 1;
    console.log(`${id}/${slug}: ${body.length} chars`);
  }

  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify(structure, null, 2)
  );
  fs.writeFileSync(
    path.join(sourceDir, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );
  console.log(`${id}: ${structure.chapters.length} chapters`);
}
