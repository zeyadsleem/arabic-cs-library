/** Stage Steve Kinney's written course material from stevekinney.com/courses.
 *
 * Every course page is a static SvelteKit document whose body lives in a single
 * `article.prose` element, so the page can be stashed as markdown without a
 * browser. The manifest is rebuilt with `--discover`; a plain run only reads it,
 * which keeps re-imports cheap and idempotent.
 *
 * Nothing here translates: the files land in `content-src/kinney` with `lang: en`
 * and `scripts/build-kinney.mjs` produces the Arabic pages later.
 */
import dns from 'node:dns';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { fetchImage, imageType, writeWebp } from './lib/image-assets.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://stevekinney.com';
const sourceDir = path.join(root, 'content-src', 'kinney');
const imagesDir = path.join(root, 'static', 'images', 'kinney');
const imagePrefix = '/images/kinney';
const manifestPath = path.join(sourceDir, 'manifest.json');
const imageCatalogPath = path.join(sourceDir, 'images.json');
const structurePath = path.join(root, 'content', 'kinney-structure.json');
const libraryPath = path.join(root, 'content', 'library.json');
const discover = process.argv.includes('--discover');

/** Course titles in Arabic. Only the course names are translated here — the
 * lesson bodies stay English until a translator works through them.
 */
const courseTitlesAr = {
  openclaw: 'OpenClaw: مساعدك الذكي الشخصي',
  'ai-development-setup': 'تهيئة بيئة التطوير بالذكاء الاصطناعي',
  'self-testing-ai-agents': 'وكلاء ذكاء اصطناعي يختبرون أنفسهم',
  aws: 'نشر تطبيقات الويب على AWS',
  'enterprise-ui': 'واجهات المؤسسات',
  'react-performance': 'أداء React',
  'react-typescript': 'React مع TypeScript',
  'python-ai': 'أساسيات الذكاء الاصطناعي بلغة Python',
  'ai-development': 'التطوير بأدوات الذكاء الاصطناعي',
  tailwind: 'Tailwind CSS',
  'full-stack-typescript': 'TypeScript للويب الكامل',
  'visual-studio-code': 'Visual Studio Code',
  testing: 'مدخل إلى الاختبارات',
  'web-security': 'أمن الويب',
  figma: 'Figma للمطوّرين',
  storybook: 'بناء أنظمة التصميم في Storybook',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const decode = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#0*8217;|&rsquo;/g, '’')
    .replace(/&#0*8216;|&lsquo;/g, '‘')
    .replace(/&#0*8220;|&ldquo;/g, '“')
    .replace(/&#0*8221;|&rdquo;/g, '”')
    .replace(/&#0*8211;|&ndash;/g, '–')
    .replace(/&#0*8212;|&mdash;/g, '—')
    .replace(/&#0*8230;|&hellip;/g, '…')
    .replace(/&#0*215;|&times;/g, '×')
    .replace(/&#0*169;|&copy;/g, '©');

/** Markdown reads a literal `<` as the start of an HTML tag, so prose that
 * really means `Partial<T>` renders as `Partial` and loses `<T>`. The brackets
 * are escaped after decoding; code spans take their text from the DOM instead,
 * so they are never escaped.
 * @param {string} value @returns {string} */
const escapeAngles = (value) => value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The site's screenshots live on a public blob store under an opaque name.
 * Files are kept locally under the hash of their URL, so a re-import reuses the
 * bytes it already has instead of appending duplicates. SVG and GIF keep their
 * format; every other raster is encoded to WebP like the rest of the library.
 * @param {string} src @param {string} base @param {Record<string, {local: string}>} catalog
 * @returns {Promise<string|null>}
 */
const cacheImage = async (src, base, catalog) => {
  if (!src || /^data:/.test(src)) return null;
  let url;
  try {
    url = new URL(src, base).href;
  } catch {
    return null;
  }
  if (!/^https?:/.test(url)) return null;
  const known = catalog[url];
  if (known && fs.existsSync(path.join(root, 'static', known.local))) return known.local;
  try {
    const bytes = await fetchImage(url);
    const kind = imageType(bytes);
    const extension = ['svg', 'gif'].includes(kind) ? kind : 'webp';
    const local = `${imagePrefix}/${createHash('sha256').update(url).digest('hex').slice(0, 16)}.${extension}`;
    const file = path.join(root, 'static', local);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (extension === 'webp') writeWebp(bytes, file);
    else fs.writeFileSync(file, bytes);
    catalog[url] = { local };
    return local;
  } catch (error) {
    console.warn(`  image skipped: ${url} — ${error.message}`);
    return null;
  }
};

/** An `<img>` becomes a markdown image when its bytes were cached; otherwise it
 * degrades to its alt text rather than linking to a third-party host.
 * @param {object} node @param {{images?: Map<string, string>}} context
 * @returns {string}
 */
const imageMarkdown = (node, context) => {
  const alt = decode(node.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().replace(/([[\]])/g, '\\$1');
  const local = context.images?.get((node.getAttribute('src') || '').trim());
  return local ? `![${alt}](${local})` : alt;
};

/** Fetch a page once, retrying a single time before giving up.
 * @param {string} url
 * @returns {Promise<string>}
 */
const fetchPage = async (url) => {
  let lastError = new Error(`تعذّر تحميل ${url}`);
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { accept: 'text/html' } });
      if (response.status === 404) throw new Error('HTTP 404');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt === 2) break;
      await sleep(500);
    }
  }
  throw lastError;
};

const skippedTags = new Set(['script', 'style', 'svg', 'source', 'iframe', 'noscript', 'template']);

/** Shiki wraps every line in a span, so the code is recovered by dropping tags
 * from the raw markup of the `<pre>` rather than by walking a parsed tree. The
 * fragment is parsed separately because `pre` is a block text element, and the
 * parsed tree lets inline annotations be lifted out instead of leaking into the
 * code.
 * @param {string} raw @param {{base: string}} context @returns {{code: string, notes: Array<{label: string, text: string}>}}
 */
const readCodeBlock = (raw, context) => {
  const fragment = parse(raw);
  const code = fragment.querySelector('code') || fragment;
  const notes = code.querySelectorAll('.code-annotation').map((note) => {
    const indicator = note.querySelector('.code-annotation-indicator');
    const label = indicator?.textContent?.trim() || 'Note';
    return { label, text: text(note, context).slice(label.length).trim() };
  });
  for (const note of code.querySelectorAll('.code-annotation')) note.remove();
  return {
    code: decode(code.textContent || '').replace(/^\n+/, '').replace(/\s+$/, '').replace(/\n{3,}/g, '\n\n'),
    notes,
  };
};

const languages = {
  sh: 'bash', zsh: 'bash', shell: 'bash', ts: 'typescript', tsx: 'typescript',
  js: 'javascript', mjs: 'javascript', cjs: 'javascript', md: 'markdown',
  yml: 'yaml', tf: 'terraform', hcl: 'terraform', jsonc: 'json',
  plaintext: '', txt: '', text: '', raw: '',
};

const languageFor = (value) => {
  const name = (value || '').trim().toLowerCase();
  if (!name) return '';
  return Object.hasOwn(languages, name) ? languages[name] : name;
};

const fenced = (language, code) => {
  const longest = (code.match(/`{3,}/g) || []).reduce((max, run) => Math.max(max, run.length), 2);
  const fence = '`'.repeat(longest + 1);
  return `${fence}${language}\n${code}\n${fence}`;
};

/** Inline markdown for a node's children. `skip` holds nodes whose inline text
 * must be ignored — used to separate a list item from its nested lists.
 *
 * Prose is decoded here and has its angle brackets escaped, so `text` must not
 * decode again. A code span reads `textContent` (and a code block reads its
 * `pre`), which sidesteps both the escaping and `node-html-parser` treating a
 * `pre` as raw text.
 * @param {Array<object>} nodes
 * @param {{base: string, skip: Set<object>}} context
 * @returns {string}
 */
const inlineText = (nodes, context) => {
  let out = '';
  for (const node of nodes) {
    if (context.skip.has(node)) continue;
    if (node.nodeType === 3) {
      out += escapeAngles(decode(node.rawText ?? node.text ?? ''));
      continue;
    }
    if (node.nodeType !== 1) continue;
    const tag = node.tagName?.toLowerCase();
    if (!tag || skippedTags.has(tag)) continue;
    if (tag === 'br') { out += '\n'; continue; }
    if (tag === 'img') { const image = imageMarkdown(node, context); if (image) out += ` ${image} `; continue; }
    if (tag === 'iframe') { out += ` ${decode(node.getAttribute('title') || '')} `; continue; }
    if (tag === 'code') {
      const value = decode(node.textContent || '').replace(/\s+/g, ' ').trim();
      if (value) out += `\`${value}\``;
      continue;
    }
    if (tag === 'pre' || node.getAttribute?.('data-language')) {
      const value = readCodeBlock(node.innerHTML || '', context).code.replace(/\s+/g, ' ').trim();
      if (value) out += `\`${value}\``;
      continue;
    }
    const inner = inlineText(node.childNodes, context);
    if (!inner) continue;
    if (tag === 'strong' || tag === 'b') out += `**${inner.trim()}**`;
    else if (tag === 'em' || tag === 'i') out += `*${inner.trim()}*`;
    else if (tag === 'a') {
      const href = (node.getAttribute('href') || '').trim();
      const label = inner.replace(/\s+/g, ' ').trim();
      const target = href && !/^(#|mailto:|tel:|data:)/.test(href) ? new URL(href, context.base).href : href;
      out += target ? `[${label}](${target})` : label;
    } else out += inner;
  }
  return out;
};

/** @param {object} node @param {{base: string}} context @returns {string} */
const text = (node, context) => {
  const value = inlineText(node.childNodes, { ...context, skip: new Set() });
  return value.replace(/[ \t]*\n[ \t]*/g, '\n').replace(/[ \t]+/g, ' ').trim();
};

/** A list item's own text covers only its inline run. Block children such as a
 * code block or a nested list are rendered on their own indented lines, so they
 * keep their shape instead of collapsing into the sentence.
 * @param {object} node @returns {boolean} */
const isBlockChild = (node) => {
  if (node.nodeType !== 1) return false;
  const tag = node.tagName?.toLowerCase();
  if (!tag || skippedTags.has(tag)) return false;
  // A bare Shiki `pre` is skipped by `renderBlocks`; keeping it in the inline
  // run lets it fall back to an inline code span instead of vanishing.
  if (tag === 'pre' && node.classList?.contains('shiki')) return false;
  if (/^h[1-6]$/.test(tag)) return true;
  if (['p', 'pre', 'ul', 'ol', 'table', 'blockquote', 'hr', 'figcaption'].includes(tag)) return true;
  if (node.getAttribute?.('data-language')) return true;
  if (['div', 'section', 'figure', 'details', 'article', 'main'].includes(tag)) {
    return Boolean(node.querySelector?.('p, pre, ul, ol, table, blockquote, [data-language]'));
  }
  return false;
};

/** @param {object} list @param {boolean} ordered @param {number} depth @param {{base: string}} context @returns {string[]} */
const listItems = (list, ordered, depth, context) => {
  const lines = [];
  const pad = '  '.repeat(depth);
  let index = 0;
  for (const item of list.querySelectorAll(':scope > li')) {
    index += 1;
    const prefix = `${pad}${ordered ? `${index}.` : '-'} `;
    const indent = ' '.repeat(prefix.length);
    const chunks = [];
    let inline = [];
    const flush = () => {
      if (!inline.length) return;
      const value = text({ childNodes: inline }, context);
      inline = [];
      if (value) chunks.push(value);
    };
    for (const child of item.childNodes) {
      if (!isBlockChild(child)) { inline.push(child); continue; }
      flush();
      // `renderBlocks` reads block-level children, so each block child goes in
      // as a one-child wrapper — passing a `p` straight in would hand its inline
      // children to the text fallback and drop the emphasis markers.
      chunks.push(...renderBlocks({ childNodes: [child] }, context));
    }
    flush();
    if (!chunks.length) continue;
    const [head, ...rest] = `${chunks[0]}`.split('\n');
    lines.push(`${prefix}${head}`.trimEnd());
    for (const line of rest) lines.push(line ? `${indent}${line}` : '');
    for (const chunk of chunks.slice(1)) {
      lines.push('');
      for (const line of chunk.split('\n')) lines.push(line ? `${indent}${line}` : '');
    }
  }
  return lines;
};

/** @param {object} table @param {{base: string}} context @returns {string} */
const tableMarkdown = (table, context) => {
  const rows = [...table.querySelectorAll('tr')].map((row) => [...row.querySelectorAll('th,td')].map((cell) => text(cell, context)));
  if (!rows.length) return '';
  const width = Math.max(...rows.map((cells) => cells.length), 1);
  const pad = (cells) => [...cells, ...Array.from({ length: width - cells.length }, () => '')];
  return [
    `| ${pad(rows[0]).join(' | ')} |`,
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...rows.slice(1).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ].join('\n');
};

const quote = (markdown) => markdown.split('\n').map((line) => (line.trim() ? `> ${line}` : '>')).join('\n');

/** Render a block-level element to markdown chunks.
 * @param {object} node @param {{base: string}} context @returns {string[]}
 */
const renderBlocks = (node, context) => {
  const chunks = [];
  for (const child of node.childNodes || []) {
    if (child.nodeType !== 1) continue;
    const tag = child.tagName?.toLowerCase();
    if (!tag || skippedTags.has(tag)) continue;
    if (tag === 'pre' && child.classList?.contains('shiki')) continue;
    if (child.getAttribute?.('data-language')) {
      const header = child.querySelector('.code-block-header');
      const label = header ? text(header, context) : '';
      const { code, notes } = readCodeBlock(child.querySelector('pre')?.innerHTML || '', context);
      if (label) chunks.push(`*${label}*`);
      if (code) chunks.push(fenced(languageFor(child.getAttribute('data-language')), code));
      for (const note of notes) chunks.push(`*${note.label}:* ${note.text}`);
      continue;
    }
    if (tag === 'pre') {
      const code = readCodeBlock(child.innerHTML, context).code;
      if (code) chunks.push(fenced('', code));
      continue;
    }
    if (tag === 'img') {
      const image = imageMarkdown(child, context);
      if (image) chunks.push(image);
      continue;
    }
    if (tag === 'p') { const value = text(child, context); if (value) chunks.push(value); continue; }
    if (/^h[1-6]$/.test(tag)) {
      const value = text(child, context);
      if (value) chunks.push(`${'#'.repeat(Number(tag[1]))} ${value}`);
      continue;
    }
    if (tag === 'ul' || tag === 'ol') {
      const lines = listItems(child, tag === 'ol', 0, context);
      if (lines.length) chunks.push(lines.join('\n'));
      continue;
    }
    if (tag === 'table') {
      const value = tableMarkdown(child, context);
      if (value) chunks.push(value);
      continue;
    }
    if (tag === 'blockquote') {
      const inner = renderBlocks(child, context).join('\n\n');
      if (inner) chunks.push(quote(inner));
      continue;
    }
    if (tag === 'hr') { chunks.push('---'); continue; }
    if (tag === 'figcaption') {
      const value =
        [...child.childNodes].filter((node) => node.nodeType === 1).map((node) => text(node, context)).filter(Boolean).join(' — ') ||
        text(child, context);
      if (value) chunks.push(`*${value}*`);
      continue;
    }
    if (child.classList?.contains('callout')) {
      const title = child.querySelector('.callout-title-text');
      const body = child.querySelector('.callout-content') || child;
      const label = title ? `**${text(title, context)}**` : '';
      const inner = renderBlocks(body, context).join('\n\n');
      const combined = [label, inner].filter(Boolean).join('\n\n');
      if (combined) chunks.push(quote(combined));
      continue;
    }
    if (['div', 'section', 'span', 'figure', 'details', 'summary', 'article', 'main', 'header', 'footer', 'hgroup', 'aside', 'dl', 'dt', 'dd'].includes(tag)) {
      chunks.push(...renderBlocks(child, context));
      continue;
    }
    const value = text(child, context);
    if (value) chunks.push(value);
  }
  return chunks;
};

/** Rebuild the manifest from the sitemap plus the per-course table of contents.
 * @returns {Promise<{generatedAt: string, origin: string, courses: Array<object>}>}
 */
const buildManifest = async () => {
  const sitemap = await fetchPage(`${origin}/sitemap.xml`);
  const urls = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))]
    .filter((url) => url.startsWith(`${origin}/courses/`))
    .sort();

  const byCourse = new Map();
  for (const url of urls) {
    const rest = url.slice(`${origin}/courses/`.length).replace(/\/$/, '');
    const slash = rest.indexOf('/');
    const course = slash === -1 ? rest : rest.slice(0, slash);
    const lesson = slash === -1 ? '' : rest.slice(slash + 1);
    if (!byCourse.has(course)) byCourse.set(course, []);
    if (lesson) byCourse.get(course).push(lesson);
  }

  const listing = parse(await fetchPage(`${origin}/courses`));
  const titles = new Map();
  for (const link of listing.querySelectorAll('aside ul li a[href^="/courses/"]')) {
    titles.set(link.getAttribute('href').replace(/^\//, '').replace(/\/$/, ''), link.textContent.trim());
  }

  const courses = [];
  for (const slug of [...byCourse.keys()].sort()) {
    const url = `${origin}/courses/${slug}`;
    const lessons = [];
    const onSite = byCourse.get(slug);
    try {
      const document = parse(await fetchPage(url));
      let category = '';
      const aside = document.querySelector('aside[data-markdown-contents]');
      for (const node of aside?.childNodes || []) {
        if (node.nodeType !== 1) continue;
        const tag = node.tagName?.toLowerCase();
        if (tag === 'h2') category = node.textContent.trim();
        else if (tag === 'ul') {
          for (const link of node.querySelectorAll('a[href^="/courses/"]')) {
            lessons.push({
              slug: link.getAttribute('href').split('/').filter(Boolean).pop(),
              title: link.textContent.trim(),
              url: new URL(link.getAttribute('href'), origin).href,
              category,
            });
          }
        }
      }
      const heading = document.querySelector('main h1');
      if (!titles.has(slug) && heading) titles.set(slug, heading.textContent.trim());
    } catch (error) {
      console.warn(`تعرّف على كورس ${slug} فشل: ${error.message}`);
    }
    // The table of contents groups some lessons under more than one category, so
    // the first mention wins and the slug stays unique for the file name.
    const known = new Set(lessons.map((lesson) => lesson.slug));
    const extra = [];
    // A sitemap can outlive a renamed page; keep those slugs so the import
    // reports them instead of silently dropping the lesson.
    for (const slugOnSite of onSite) {
      if (!known.has(slugOnSite)) extra.push({ slug: slugOnSite, title: '', url: `${origin}/courses/${slug}/${slugOnSite}`, category: '' });
    }
    courses.push({
      slug,
      title: titles.get(slug) || slug,
      url,
      lessons: [
        { slug: 'index', title: titles.get(slug) || slug, url, order: 0, category: 'Overview' },
        ...[...lessons, ...extra].map((lesson, order) => ({ ...lesson, order: order + 1 })),
      ],
    });
  }
  return { generatedAt: new Date().toISOString(), origin, courses };
};

const frontmatter = (fields) =>
  `---\n${Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n`;

const bodyOf = (document) => {
  const article = document.querySelector('article.prose');
  if (article) return article;
  const section = document.querySelector('main div.prose section');
  if (section) return section;
  return document.querySelector('main');
};

const pageTitle = (document) => {
  const body = bodyOf(document);
  const authored = body?.getAttribute('data-title');
  if (authored) return authored;
  const heading = document.querySelector('main h1');
  return heading?.textContent?.trim() || '';
};

const main = async () => {
  fs.mkdirSync(sourceDir, { recursive: true });

  const fresh = discover || !fs.existsSync(manifestPath);
  const manifest = fresh ? await buildManifest() : JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (fresh) fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const expected = manifest.courses.reduce((sum, course) => sum + course.lessons.length, 0);
  console.log(`kinney: ${manifest.courses.length} courses, ${expected} pages to stage`);

  const structure = { chapters: [] };
  const failures = [];
  const kept = new Set();
  const titles = new Map();
  const imageCatalog = fs.existsSync(imageCatalogPath)
    ? JSON.parse(fs.readFileSync(imageCatalogPath, 'utf8'))
    : {};
  let written = 0;

  for (const course of manifest.courses) {
    const sections = [];
    const seenSlugs = new Set();
    let duplicates = 0;
    for (const lesson of course.lessons) {
      // The react-typescript manifest lists four lessons twice (they appear in a
      // bonus section as well as the main list). Both copies share one slug and
      // therefore one staged file, so a second section would be a phantom page.
      if (seenSlugs.has(lesson.slug)) {
        duplicates += 1;
        continue;
      }
      seenSlugs.add(lesson.slug);
      const file = `${course.slug}--${lesson.slug}.md`;
      kept.add(file);
      let markdown;
      let title = lesson.title;
      try {
        const document = parse(await fetchPage(lesson.url));
        const body = bodyOf(document);
        if (!body) throw new Error('no article body found');
        const images = new Map();
        for (const image of body.querySelectorAll('img')) {
          const src = (image.getAttribute('src') || '').trim();
          if (!src || images.has(src)) continue;
          const local = await cacheImage(src, lesson.url, imageCatalog);
          if (local) images.set(src, local);
        }
        const context = { base: lesson.url, images };
        title = lesson.title || pageTitle(document) || course.title;
        markdown = renderBlocks(body, context).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
        if (!markdown) throw new Error('empty body');
      } catch (error) {
        failures.push(`${lesson.url} — ${error.message}`);
        continue;
      }
      titles.set(`${course.slug}--${lesson.slug}`, title);
      fs.writeFileSync(
        path.join(sourceDir, file),
        frontmatter({
          title,
          lang: 'en',
          chapter: course.slug,
          slug: lesson.slug,
          order: lesson.order,
          source: lesson.url,
        }) + `${markdown}\n`
      );
      sections.push({ slug: lesson.slug, title, order: lesson.order });
      written += 1;
      await sleep(50);
    }
    structure.chapters.push({
      key: course.slug,
      title: course.title,
      titleAr: courseTitlesAr[course.slug] || course.title,
      sections,
    });
    console.log(
      `${course.slug}: ${sections.length}/${course.lessons.length} pages${duplicates ? ` (${duplicates} duplicate lesson(s) skipped)` : ''}`
    );
  }

  // A page title authored on the site beats the short table-of-contents label,
  // so folding it back keeps a later run from having to fetch it again.
  if (titles.size) {
    for (const course of manifest.courses) {
      for (const lesson of course.lessons) {
        const resolved = titles.get(`${course.slug}--${lesson.slug}`);
        if (resolved) lesson.title = resolved;
      }
    }
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  for (const file of fs.readdirSync(sourceDir)) {
    if (file.endsWith('.md') && !kept.has(file)) fs.rmSync(path.join(sourceDir, file));
  }

  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);
  fs.writeFileSync(imageCatalogPath, `${JSON.stringify(imageCatalog, null, 2)}\n`);

  const totalPages = structure.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
  const entry = {
    id: 'kinney',
    title: 'دورات ستيف كيني التطبيقية',
    titleEn: "Steve Kinney's Courses",
    author: 'Steve Kinney',
    description:
      'ست عشرة دورة تطبيقية مكتوبة في تطوير الويب الحديث: React وTypeScript وأدائهما، وTailwind CSS، وأنظمة التصميم في Storybook، وFigma للمطوّرين، والاختبارات، وأمن الويب، وVisual Studio Code، وTypeScript للويب الكامل، ونشر التطبيقات على AWS، وواجهات المؤسسات، وأساسيات الذكاء الاصطناعي بلغة Python، وأدوات التطوير بالذكاء الاصطناعي، ووكلاء ذكاء اصطناعي يختبرون أنفسهم. كل صفحة تحفظ أمثلة الشيفرة والصور ووصفها كما هي بانتظار الترجمة.',
    sourceUrl: `${origin}/courses`,
    license: 'UNVERIFIED — all rights reserved until checked',
    status: 'planned',
    stage: 'web',
    order: 6,
    format: 'web',
    pages: totalPages,
    completeCourse: false,
    note: 'المحتوى منسوخ من موقع ستيف كيني كما هو باللغة الإنجليزية، بانتظار التحقّق من الترخيص والترجمة. لا يوجد ملف ترخيص في مستودع الموقع (stevekinney/stevekinney.net) ولا ذكر لأي رخصة في صفحات الكورس نفسها، لذا يُعتبر المحتوى محفوظ الحقوق حتى يُتحقّق منه. دورة أمن الويب صفحة تعريفية فقط تربط بمستودع خارجي.',
  };

  const library = JSON.parse(fs.readFileSync(libraryPath, 'utf8'));
  const existing = library.books.findIndex((book) => book.id === 'kinney');
  if (existing === -1) {
    library.books.push(entry);
  } else {
    // The importer owns the page inventory, not the licence or publication
    // record: `license`, `licenseUrl`, `note`, `description`, `status` and
    // `completeCourse` are written by hand once the translation lands, so a
    // re-import must never downgrade them.
    const recorded = library.books[existing];
    const merged = { ...recorded };
    for (const [key, value] of Object.entries(entry)) {
      if (['license', 'licenseUrl', 'note', 'description', 'status', 'completeCourse'].includes(key)) continue;
      merged[key] = value;
    }
    library.books[existing] = merged;
  }
  fs.writeFileSync(libraryPath, `${JSON.stringify(library, null, 2)}\n`);

  if (failures.length) {
    console.warn(`\nفشل ${failures.length} صفحة:`);
    for (const failure of failures) console.warn(`  ${failure}`);
  }
  console.log(`kinney: ${written} files in content-src/kinney, ${totalPages} sections, ${structure.chapters.length} chapters`);
  console.log(`kinney: library.json updated (${library.books.length} books)`);
};

await main();
