/**
 * Stage the Hono documentation for translation.
 *
 * Reads content-src/hono/hono.json (the frozen page manifest) and, for every
 * page, fetches the English Markdown body from the honojs/website GitHub repo
 * (docs/<route>.md). The first H1 (page title) is stripped and preserved as the
 * frontmatter `title`; the remaining body is written verbatim to
 * content-src/hono/<chapter>--<slug>.md.
 *
 * All pages are fetched (or read, in --local mode) BEFORE the staged directory
 * is rewritten, so a network failure never leaves a half-staged tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const local = process.argv.includes('--local');
const sourceDir = path.join(root, 'content-src', 'hono');

/** chapter key -> docs/<folder> route segment in the honojs/website repo */
const ROUTES = {
  'getting-started': 'getting-started',
  concepts: 'concepts',
  'middleware-builtin': 'middleware/builtin',
  'middleware-third-party': 'middleware/third-party',
  helpers: 'helpers',
  guides: 'guides',
  api: 'api',
  agents: 'agents',
};

/** @param {string} route @param {string} markdown */
const stripTitle = (route, markdown) => {
  const docsPath = route === 'getting-started/index' ? 'index.md' : `${route}.md`;
  const title = markdown.match(/^# (.+?)\s*(?:\n|$)/)?.[1]?.trim();
  const body = markdown.replace(/^# .+?\n(?:\n)?/, '').trimEnd();
  return { title: title ?? path.basename(docsPath, '.md').replace(/-/g, ' '), body };
};

/** @param {string} route */
const fetchRaw = async (route) => {
  const url = `https://raw.githubusercontent.com/honojs/website/main/docs/${route}.md`;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      return await response.text();
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error(`unreachable: ${url}`);
};

/** @param {string} text @returns {[{title: string}, string]} */
function splitFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return [{ title: '' }, text];
  const data = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  }
  return [data, match[2]];
}

const pages = JSON.parse(fs.readFileSync(path.join(sourceDir, 'hono.json'), 'utf8'));

// Buffer every page's raw material first — nothing is written until all succeed.
const staged = [];
for (const page of pages) {
  const route =
    page.slug === 'index' && page.key === 'getting-started'
      ? 'getting-started/index'
      : `${ROUTES[page.key] ?? page.key}/${page.slug}`;
  if (local) {
    const [data, content] = splitFrontmatter(
      fs.readFileSync(path.join(sourceDir, `${page.key}--${page.slug}.md`), 'utf8'),
    );
    staged.push({ page, route, title: data.title, body: content.trimEnd() });
  } else {
    const { title, body } = stripTitle(route, await fetchRaw(route));
    staged.push({ page, route, title, body });
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

fs.rmSync(sourceDir, { recursive: true, force: true });
fs.mkdirSync(sourceDir, { recursive: true });

const manifest = [];
for (const { page, title, body } of staged) {
  fs.writeFileSync(
    path.join(sourceDir, `${page.key}--${page.slug}.md`),
    `---\ntitle: ${JSON.stringify(title)}\nbook: hono\nchapter: ${page.key}\nslug: ${page.slug}\norder: ${page.order}\nsource: ${page.url}\nlang: en\n---\n\n${body}\n`,
  );
  manifest.push({ ...page, title });
}
fs.writeFileSync(path.join(sourceDir, 'hono.json'), JSON.stringify(manifest, null, 2));

console.log(`import-hono: ${local ? 'local round-trip' : 'fetched'} ${pages.length} pages`);