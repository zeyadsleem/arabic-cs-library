/** Stage the Better Auth documentation (better-auth.com/docs) as an English source
 * tree ready for translation. Every page is fetched in the publisher's own clean
 * Markdown form (`<page>.md`) — the feed the site publishes for language models —
 * so the import has no HTML chrome to strip and no layout to guess.
 */
import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { outsideCode } from './lib/content-markup.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'better-auth';
const origin = 'https://better-auth.com';
const docsRoot = `${origin}/docs`;
const indexUrl = `${docsRoot}/llms.txt`;
const sitemapUrl = `${origin}/sitemap.xml`;
const sourceDir = path.join(root, 'content-src', id);
const libraryPath = path.join(root, 'content', 'library.json');
const structurePath = path.join(root, 'content', `${id}-structure.json`);

const attempts = 3; // one try plus two retries
const delayMs = 50;
const backoffMs = 250;

/** @param {number} ms @returns {void} */
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/** @param {string} url @returns {string} */
const fetchText = (url) => {
  let failure = new Error(`untried ${url}`);
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const result = execFileSync(
        'curl',
        ['-sS', '--compressed', '-m', '120', '-w', '\n%{http_code}', url],
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
      );
      const split = result.lastIndexOf('\n');
      const status = Number(result.slice(split + 1).trim());
      if (status !== 200) throw new Error(`HTTP ${status}`);
      return result.slice(0, split);
    } catch (error) {
      failure = error;
      if (attempt < attempts) sleep(backoffMs * attempt);
    }
  }
  throw new Error(`${url}: ${failure.message}`);
};

/** The docs sections, ordered the way the Better Auth sidebar lists them. */
const sections = [
  ['Documentation', 'getting-started', 'البدء'],
  ['Concepts', 'concepts', 'المفاهيم الأساسية'],
  ['Authentication', 'authentication', 'المصادقة'],
  ['Databases', 'databases', 'قواعد البيانات'],
  ['Adapters', 'adapters', 'محوّلات قواعد البيانات'],
  ['Integrations', 'integrations', 'التكامل مع الأطر والمنصّات'],
  ['Infrastructure', 'infrastructure', 'البنية التحتية المُدارة'],
  ['Plugins', 'plugins', 'الإضافات'],
  ['Guides', 'guides', 'أدلة عملية'],
  ['AI Resources', 'ai-resources', 'موارد الذكاء الاصطناعي'],
  ['Reference', 'reference', 'المرجع'],
  ['Examples', 'examples', 'أمثلة تطبيقية'],
];
const sectionByKey = new Map(sections.map(([, key, titleAr]) => [key, { key, titleAr }]));
const sectionNameByKey = new Map(sections.map(([name, key]) => [key, name]));
/** A docs path belongs to the section its first segment names. */
const sectionKeyOf = (url) => {
  const first = url.replace(`${docsRoot}/`, '').split('/')[0];
  for (const [name, key] of sections) {
    if (first === key) return key;
    if (name.toLowerCase().replace(/\s+/g, '-') === first) return key;
  }
  return 'getting-started';
};

/** @param {string} text @returns {string[]} */
const parseIndexPages = (text) =>
  [...text.matchAll(/\[[^\]]*\]\((https:\/\/better-auth\.com\/docs\/[^)]+)\)/g)]
    .map((match) => match[1])
    .filter((url) => !/\.\w+$/.test(new URL(url).pathname)) // llms.txt is an index, not a page
    .filter((url, index, all) => all.indexOf(url) === index);

/** @param {string} text @returns {string[]} */
const parseSitemapPages = (text) =>
  [...text.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].replace(/\/$/, ''))
    .filter((url) => url.startsWith(`${docsRoot}/`));

/** @param {string} url @param {string} chapter @returns {string} */
const slugOf = (url, chapter) => {
  const rest = url.replace(`${docsRoot}/`, '');
  const prefix = chapter === 'getting-started' ? '' : `${chapter}/`;
  const local = prefix && rest.startsWith(prefix) ? rest.slice(prefix.length) : rest;
  return local.replace(/\/$/, '').replaceAll('/', '-');
};

const calloutKinds = {
  warn: 'warning', warning: 'warning', error: 'warning', danger: 'warning',
  info: 'note', note: 'note', tip: 'tip', important: 'important',
};

/** A whole-line MDX component tag: the only component shape the docs feed indents. */
const blockTag = /^(\s*)<(\/?)([A-Z][\w-]*)((?:\s[^>]*?)?)(\/?)>\s*$/;
/** An attribute of a self-closing component that carries its content inline. */
const attributeOf = (attributes, name) =>
  attributes.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]?.trim() ?? '';

/** Rewrite the publisher's MDX-flavoured Markdown as the library's plain Markdown:
 * component tags become callouts or plain text, and every line a wrapper indented
 * loses that indentation. Code fences are copied verbatim.
 * @param {string} raw @returns {string}
 */
const cleanPage = (raw) => {
  const out = [];
  const stack = [];
  let fence = null;
  let seenBody = false;

  const discarded = () => stack.some((frame) => frame.discard);
  const shift = (line) => {
    const amount = stack.length ? stack[stack.length - 1].column + 2 : 0;
    if (!amount) return line;
    const indent = line.length - line.trimStart().length;
    return line.slice(Math.min(amount, indent));
  };
  const push = (line) => {
    if (!seenBody && !line.trim()) return;
    if (line === '' && out[out.length - 1] === '') return;
    out.push(line);
    seenBody = true;
  };

  for (const line of raw.split('\n')) {
    if (discarded()) continue;
    const opener = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      push(shift(line));
      if (opener && opener[1][0] === fence[0] && opener[1].length >= fence.length) fence = null;
      continue;
    }
    if (opener) {
      fence = opener[1];
      push(shift(line));
      continue;
    }

    const tag = line.match(blockTag);
    if (tag) {
      const [, , closing, name, attributes, selfClosing] = tag;
      if (closing) {
        for (let index = stack.length - 1; index >= 0; index -= 1) {
          if (stack[index].name !== name) continue;
          if (stack[index].callout) push(':::');
          stack.length = index;
          break;
        }
        continue;
      }
      if (selfClosing) {
        const label = attributeOf(attributes, 'name') || attributeOf(attributes, 'title');
        const description = attributeOf(attributes, 'description');
        if (name === 'File' && label) push(`\`${label}\``);
        else if (name === 'Folder' && label) push(`**${label.replace(/\/$/, '')}/**`);
        else if (name === 'Card' && label) push(`- **${label}**${description ? ` — ${description}` : ''}`);
        continue;
      }
      if (name === 'Callout') {
        push(`::: {${calloutKinds[attributeOf(attributes, 'type')] ?? 'note'}}`);
        stack.push({ name, column: tag[1].length, callout: true });
        continue;
      }
      const title = attributeOf(attributes, 'title');
      if (title) push(`**${title}**`);
      // A tab switch repeats one block per package manager: only its trigger
      // labels go, the tab bodies themselves stay.
      stack.push({ name, column: tag[1].length, discard: name === 'CodeBlockTabsTrigger' });
      continue;
    }

    push(
      shift(
        line
          .replace(/^(\s*#{1,6}\s+.*?)\s+\[#[^\]\s]+\]\s*$/, '$1')
          .replace(
            /<Link\s+href="([^"]+)"\s*>([\s\S]*?)<\/Link>/g,
            (_, href, text) => `[${text.trim()}](${href})`
          )
      )
    );
  }

  return out.join('\n').trim();
};

/** Docs links keep working inside the library; anything else keeps its absolute URL.
 * @param {string} markdown @param {Map<string, {chapter: string, slug: string}>} pages
 * @returns {string}
 */
const repointLinks = (markdown, pages) =>
  outsideCode(markdown, (text) =>
    text.replace(/\]\(([^)\s]+)\)/g, (match, href) => {
      if (/^(https?:|mailto:|#)/.test(href)) return match;
      if (href === docsRoot || href.startsWith(`${docsRoot}/`)) {
        const [pathname, hash = ''] = href.split('#');
        const page = pages.get(pathname);
        if (page) return `](/book/${id}/${page.chapter}/${page.slug}${hash ? `#${hash}` : ''})`;
      }
      return `](${new URL(href, `${docsRoot}/`).href})`;
    })
  );

const failures = [];

const indexPages = parseIndexPages(fetchText(indexUrl));
const sitemapPages = parseSitemapPages(fetchText(sitemapUrl));

const found = new Map();
for (const url of indexPages) found.set(url, 'llms.txt');
for (const url of sitemapPages) if (!found.has(url)) found.set(url, 'sitemap');

const chapters = new Map();
for (const [url, via] of found) {
  const key = sectionKeyOf(url);
  if (!chapters.has(key)) chapters.set(key, []);
  chapters.get(key).push({ url, via, chapter: key, slug: slugOf(url, key) });
}

// The reader opens a chapter at its first page, so that page is always `index`.
const steps = [];
for (const [, key] of sections) {
  const list = chapters.get(key);
  if (!list) continue;
  list.forEach((page, position) => steps.push({ ...page, chapter: key, slug: position === 0 ? 'index' : page.slug, order: steps.length }));
}
const pages = new Map(steps.map((step) => [step.url, step]));

fs.rmSync(sourceDir, { recursive: true, force: true });
fs.mkdirSync(sourceDir, { recursive: true });

const titles = new Map();
let fetched = 0;
for (const step of steps) {
  const file = path.join(sourceDir, `${step.chapter}--${step.slug}.md`);
  try {
    const raw = fetchText(`${step.url}.md`);
    sleep(delayMs);
    const body = repointLinks(cleanPage(raw), pages);
    if (!body) throw new Error('empty page body');
    const title = (raw.match(/^#\s+(.*?)\s*\(\/docs\/[^)]*\)\s*$/m)?.[1] ?? step.slug).trim();
    titles.set(step.url, title);
    fs.writeFileSync(
      file,
      `---\ntitle: ${JSON.stringify(title)}\nlang: en\nchapter: ${step.chapter}\nslug: ${step.slug}\norder: ${step.order}\nsource: ${step.url}\n---\n\n${body}\n`
    );
    fetched += 1;
  } catch (error) {
    failures.push(`${step.url}: ${error.message}`);
  }
}

const structure = { chapters: [] };
for (const step of steps) {
  let chapter = structure.chapters.find((item) => item.key === step.chapter);
  if (!chapter) {
    chapter = {
      key: step.chapter,
      title: sectionNameByKey.get(step.chapter),
      titleAr: sectionByKey.get(step.chapter).titleAr,
      sections: [],
    };
    structure.chapters.push(chapter);
  }
  chapter.sections.push({ slug: step.slug, title: titles.get(step.url) ?? step.slug, order: step.order });
}
fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);

fs.writeFileSync(
  path.join(sourceDir, 'manifest.json'),
  `${JSON.stringify(
    {
      source: indexUrl,
      sitemap: sitemapUrl,
      release: '1.7.x',
      pages: steps.map((step) => ({
        section: sectionNameByKey.get(step.chapter),
        chapter: step.chapter,
        slug: step.slug,
        order: step.order,
        title: titles.get(step.url) ?? step.slug,
        url: step.url,
        markdownUrl: `${step.url}.md`,
        listedIn: step.via,
      })),
    },
    null,
    2
  )}\n`
);

const library = JSON.parse(fs.readFileSync(libraryPath, 'utf8'));
const book = {
  id,
  title: 'Better Auth — التوثيق الكامل',
  titleEn: 'Better Auth Documentation',
  author: 'Better Auth contributors',
  description:
    'التوثيق الكامل لإطار Better Auth للمصادقة والتخويل بلغة TypeScript: التثبيت والاستخدام الأساسي، والمفاهيم الأساسية من الجلسات والكوكيز وOAuth والخطافات والإضافات، ومصادقة البريد وكلمة المرور وأكثر من ثلاثين مزوداً اجتماعياً، ومحوّلات قواعد البيانات، والتكامل مع أطر الواجهات والخواديم، ونحو خمسين إضافة (المصادقة الثنائية، ومفاتيح API، والمؤسسات، والدخول الموحّد، والمدفوعات)، وأدلة الترقية والترحيل، والمرجع الكامل للخيارات والأخطاء.',
  sourceUrl: docsRoot,
  repoUrl: 'https://github.com/better-auth/better-auth',
  license: 'MIT',
  licenseUrl: 'https://github.com/better-auth/better-auth/blob/main/LICENSE.md',
  languages: ['TypeScript'],
  status: 'planned',
  stage: 'web',
  order: 6,
  format: 'web',
  pages: structure.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0),
  completeCourse: false,
  note: 'النصوص الإنجليزية مُ stageّدة في content-src/better-auth من خلاصة Markdown التي ينشرها الموقع نفسه، مع تحويل وسوم MDX إلى تنسيق المكتبة وإعادة توجيه روابط التوثيق الداخلية إلى صفحات الكتاب. الترجمة العربية تُبنى بـ scripts/build-better-auth.mjs.',
};
const position = library.books.findIndex((item) => item.id === id);
if (position >= 0) library.books[position] = { ...library.books[position], ...book };
else library.books.push(book);
fs.writeFileSync(libraryPath, `${JSON.stringify(library, null, 2)}\n`);

const prose = (text) => text.replace(/```[\s\S]*?```/g, '');
for (const step of steps) {
  const file = path.join(sourceDir, `${step.chapter}--${step.slug}.md`);
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const fences = (text.match(/^```/gm) || []).length;
  if (fences % 2 !== 0) failures.push(`${step.url}: unbalanced code fences (${fences})`);
  if (/<\/?[A-Z][\w-]*[^>]*>/.test(prose(text))) failures.push(`${step.url}: component tag left in the body`);
  if (/\[#[^\]]+\]/.test(prose(text))) failures.push(`${step.url}: heading anchor left in the body`);
  if (/\]\(\/docs\//.test(text)) failures.push(`${step.url}: docs link left in the body`);
}

const manifest = JSON.parse(fs.readFileSync(path.join(sourceDir, 'manifest.json'), 'utf8'));
console.log(`better-auth: ${fetched} of ${steps.length} pages fetched, ${failures.length} failures`);
console.log(`listed by: llms.txt ${manifest.pages.filter((page) => page.listedIn === 'llms.txt').length}, sitemap only ${manifest.pages.filter((page) => page.listedIn === 'sitemap').length}`);
console.log(`chapters: ${structure.chapters.length} — ${structure.chapters.map((chapter) => `${chapter.key} ${chapter.sections.length}`).join(', ')}`);
console.log(`source: content-src/${id} (${manifest.pages.length} pages in manifest.json)`);
for (const failure of failures) console.log(`- ${failure}`);
if (failures.length) process.exitCode = 1;
