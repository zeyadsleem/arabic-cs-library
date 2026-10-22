/** Shared rules for the TanStack Arabic lessons.
 *
 * Two video courses are staged here, each as one book:
 *   tanstack-router  (chapter key "router", 34 lessons, video 8_sGz4DHwIA)
 *   tanstack-form     (chapter key "form",  21 lessons, video H2T21r5wu3g)
 *
 * A lesson is one markdown file per page in `content-src/<book>-translations/`,
 * named `<chapter>--<slug>.md` after its staged English transcript. The page is
 * an authored Arabic explanation of the lesson, not a transcript translation:
 * it teaches with code quoted from the lesson's own branch and with screenshots
 * captured from that branch.
 *
 * `lesson-code.json` (written by `scripts/import-tanstack-code.mjs`) carries the
 * resolved branch, the branch it was built on, and every file at that branch,
 * so a lesson's code blocks can be checked verbatim against real code.
 */
import fs from 'node:fs';
import {
  ARABIC_LETTER,
  arabicLetterRatio,
  codeFences,
  linkTargets,
  longestLatinRun,
  readTranslation,
  stagedPages,
  untranslatedLines,
  unrenderedTags,
  withoutDestinations,
} from './translation-rules.mjs';

export {
  ARABIC_LETTER,
  ARABIC_RATIO_MINIMUM,
  LATIN_RUN_MAXIMUM,
  arabicLetterRatio,
  codeFences,
  linkTargets,
  longestLatinRun,
  readTranslation,
  stagedPages,
  unrenderedTags,
  untranslatedLines,
  validatePageTranslation,
  withoutCodeFences,
  withoutDestinations,
} from './translation-rules.mjs';

const CONFIGS = {
  'tanstack-router': {
    id: 'tanstack-router',
    chapter: 'router',
    videoId: '8_sGz4DHwIA',
    docsSection: 'router',
    source: (root) => `${root}/content-src/tanstack-router`,
    translations: (root) => `${root}/content-src/tanstack-router-translations`,
  },
  'tanstack-form': {
    id: 'tanstack-form',
    chapter: 'form',
    videoId: 'H2T21r5wu3g',
    docsSection: 'form',
    source: (root) => `${root}/content-src/tanstack-form`,
    translations: (root) => `${root}/content-src/tanstack-form-translations`,
  },
};

export const TANSTACK_BOOKS = Object.keys(CONFIGS);

export const tanstackConfig = (bookId) => CONFIGS[bookId];

export const sourceDirectory = (root, bookId) => CONFIGS[bookId].source(root);

export const translationsDirectory = (root, bookId) => CONFIGS[bookId].translations(root);

/** Every TANSTACK book key allowed on the command line; "" ⇒ all. */
export const selectedBooks = (argv) => {
  const index = argv.indexOf('--book');
  if (index !== -1 && argv[index + 1]) {
    const id = argv[index + 1];
    if (!CONFIGS[id]) {
      console.error(`unknown book: ${id} (use one of ${TANSTACK_BOOKS.join(', ')})`);
      process.exit(1);
    }
    return [id];
  }
  return [...TANSTACK_BOOKS];
};

export const tanstackPages = (root, bookId) => stagedPages(sourceDirectory(root, bookId));

/** Lesson bundles from `lesson-code.json`, keyed by page key. */
export const lessonBundles = (root, bookId) => {
  const file = `${sourceDirectory(root, bookId)}/lesson-code.json`;
  if (!fs.existsSync(file)) return new Map();
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return new Map(data.lessons.map((lesson) => [lesson.key, lesson]));
};

/** Trailing whitespace and CRLF are invisible in a fence, so compare without them. */
const normalize = (text) =>
  text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n');

/** Every file body of the lesson branch as one searchable corpus. */
export const lessonCodeCorpus = (lesson) => {
  const parts = [];
  for (const file of lesson?.files ?? []) if (typeof file.content === 'string') parts.push(normalize(file.content));
  for (const file of lesson?.changed ?? []) if (typeof file.content === 'string') parts.push(normalize(file.content));
  return parts.join('\n');
};

/** Languages a lesson code block may use. */
export const LESSON_CODE_LANGUAGES = new Set(['tsx', 'ts', 'js', 'jsx', 'json', 'css', 'html', 'bash', 'text']);

/** One `##`-level heading whose text contains this is the references section. */
export const REFERENCES_HEADING = 'المراجع';

/** Latin words an Arabic lesson may keep in prose: product and library names.
 *
 * Every other Latin word in an Arabic sentence is drift — a half-translated
 * phrase that the Arabic-ratio and Latin-run rules cannot see, because a single
 * English word inside an Arabic sentence barely moves either number.
 */
const ALLOWED_LATIN = new Set([
  'tanstack', 'router', 'form', 'query', 'table', 'react', 'vue', 'angular', 'svelte',
  'typescript', 'javascript', 'jsx', 'tsx', 'json', 'html', 'css', 'svg', 'url', 'urls',
  'api', 'apis', 'http', 'https', 'cli', 'ide', 'ui', 'ux', 'hoc', 'npm', 'npx', 'yarn',
  'pnpm', 'node', 'vite', 'next', 'remix', 'zod', 'shadcn', 'radix', 'tailwind', 'postcss',
  'github', 'gitlab', 'git', 'vscode', 'devtools', 'devtool', 'websocket', 'async', 'await',
  'promise', 'promises', 'fetch', 'state', 'props', 'context', 'loader', 'loaders', 'link',
  'outlet', 'error', 'errors', 'params', 'param', 'schema', 'schemas', 'validation', 'cache',
  'caching', 'preload', 'preloading', 'component', 'components', 'hook', 'hooks', 'store',
  'mutation', 'mutations', 'subscription', 'suspense', 'lazy', 'bundle', 'bundler', 'esm',
  'cdn', 'pwa', 'seo', 'ssr', 'csr', 'hydration', 'middleware', 'server', 'client', 'browser',
  'test', 'tests', 'testing', 'debug', 'debugging', 'mock', 'fixture', 'fixtures', 'git',
  'console', 'terminal', 'editor', 'plugin', 'plugins', 'config', 'configs', 'setup',
  'install', 'build', 'dev', 'start', 'startup', 'ship', 'code', 'codes', 'coding',
  'refactor', 'refactoring', 'feature', 'features', 'option', 'options', 'default', 'defaults',
  'value', 'values', 'type', 'types', 'generic', 'generics', 'interface', 'interfaces',
  'object', 'objects', 'array', 'arrays', 'string', 'strings', 'number', 'numbers', 'boolean',
  'map', 'maps', 'filter', 'filters', 'reduce', 'sort', 'splice', 'slice', 'match', 'matches',
  'route', 'routes', 'routing', 'navigate', 'navigation', 'redirect', 'search', 'query',
  'layout', 'layouts', 'nested', 'nesting', 'flat', 'dynamic', 'static', 'protected',
  'auth', 'authenticate', 'authentication', 'authorization', 'login', 'logout', 'user',
  'users', 'password', 'email', 'firstname', 'lastname', 'street', 'skills', 'level',
  'form', 'forms', 'field', 'fields', 'submit', 'submitted', 'reset', 'dirty', 'touched',
  'pristine', 'valid', 'invalid', 'validators', 'subscribe', 'listener', 'listeners',
  'refine', 'superrefine', 'zodschema', 'devtool', 'plugin', 'viteplugin', 'reactquery',
  'tanstackform', 'tanstackrouter', 'tanstackquery', 'tanstacktable', 'dev', 'etc',
  // Labels and domain words the two course applications display or discuss.
  'general', 'payment', 'profile', 'home', 'about', 'save', 'submit', 'loading', 'error',
  'name', 'first', 'last', 'street', 'confirm', 'skill', 'beginner', 'intermediate', 'expert',
  'terms', 'accept', 'add', 'remove', 'email', 'age', 'city', 'country', 'zip', 'hello',
  'world', 'file', 'path', 'report', 'products', 'product', 'posts', 'post', 'comments',
  'comment', 'random', 'word', 'settings', 'archive', 'locale', 'year', 'month', 'day',
  'fileid', 'splat', 'layout', 'root', 'index', 'pathless', 'flat', 'dynamic', 'option',
  'exact', 'active', 'link', 'outlet', 'credentials', 'username', 'tokens', 'token',
  'blog', 'posts', 'pagination', 'page', 'size', 'sort', 'price', 'title', 'color', 'sale',
  'hats', 'shirts', 'books', 'en', 'es', 'fr', 'zh', 'serendipity', 'ephemere',
]);

/** Latin words of a lesson's English title, which the Arabic page may quote. */
const titleWords = (title) =>
  String(title ?? '')
    .split(/[^\p{L}\p{N}'’-]+/u)
    .filter((word) => /^[A-Za-z][A-Za-z'’-]*$/.test(word))
    .map((word) => word.toLowerCase());

/**
 * Latin words left inside Arabic sentences.
 *
 * Inline code, fenced code and link destinations are removed first, so a
 * technical identifier written in backticks never counts. What remains is
 * prose, and prose in an Arabic lesson should be Arabic.
 *
 * @param {string} markdown @param {string[]} extraAllowed words allowed in this page
 * @returns {string[]} one entry per offending line
 */
export const latinDrift = (markdown, extraAllowed = []) => {
  const allowed = new Set([...ALLOWED_LATIN, ...extraAllowed.map((word) => word.toLowerCase())]);
  const found = [];
  for (const line of withoutDestinations(markdown).split('\n')) {
    if (!ARABIC_LETTER.test(line)) continue;
    const words = line
      .split(/[^\p{L}\p{N}'’-]+/u)
      .filter(
        (word) =>
          /^[A-Za-z][A-Za-z'’-]*$/.test(word) &&
          word.length >= 3 &&
          // Hyphenated or numbered tokens are identifiers (`pathless-layouts`,
          // `field-2`), not prose that failed to be translated.
          !/[-_]/.test(word) &&
          !/\d/.test(word)
      );
    const offending = [...new Set(words.filter((word) => !allowed.has(word.toLowerCase())))];
    if (offending.length) found.push(`${offending.join(', ')} — ${line.trim().slice(0, 80)}`);
  }
  return found;
};

/** Markdown image references: alt text and destination. */
const imagesIn = (markdown) => [...markdown.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];

const hasScreenshots = (root, bookId, key) => {
  const directory = `${root}/static/images/${bookId}`;
  if (!fs.existsSync(directory)) return false;
  return fs.readdirSync(directory).some((file) => file.startsWith(`${key}--`));
};

/**
 * Compare one authored Arabic lesson against its requirements.
 * @param {string} key page key, `<chapter>--<slug>`
 * @param {{title: string, body: string}} translation
 * @param {{root: string, bookId: string, lesson?: object}} context
 * @returns {string[]} problems, empty when the page may be published
 */
export const validateLessonPage = (key, translation, { root, bookId, lesson }) => {
  const problems = [];
  const body = translation.body;

  if (!body.trim()) {
    problems.push(`${key}: empty body`);
    return problems;
  }
  if (!ARABIC_LETTER.test(translation.title)) {
    problems.push(`${key}: title is not Arabic (${JSON.stringify(translation.title)})`);
  }

  // The published lesson must explain, not replay the recording.
  if (/\[\d{1,3}:\d{2}\]/.test(body)) problems.push(`${key}: still carries [MM:SS] transcript stamps`);
  if (/<iframe\b/i.test(body)) problems.push(`${key}: embeds an iframe instead of teaching the lesson`);
  if (/(?:التفريغ النصي|transcript)/i.test(body)) problems.push(`${key}: still describes itself as a transcript`);

  const headings = [...body.matchAll(/^#{2,3}[ \t]+\S/gm)];
  if (headings.length < 2) problems.push(`${key}: needs at least two section headings, found ${headings.length}`);

  if (!body.split('\n').some((line) => /^#{2,4}[ \t]+/.test(line) && line.includes(REFERENCES_HEADING))) {
    problems.push(`${key}: missing a "${REFERENCES_HEADING}" section`);
  }

  const links = linkTargets(body);
  if (!links.some((target) => target.includes(tanstackConfig(bookId).videoId))) {
    problems.push(`${key}: references omit the lesson video`);
  }
  if (!links.some((target) => target.startsWith(`https://tanstack.com/${tanstackConfig(bookId).docsSection}/`))) {
    problems.push(`${key}: references omit an official tanstack.com/${tanstackConfig(bookId).docsSection} page`);
  }
  if (lesson?.branch && !links.some((target) => target.includes(`github.com/alialaa/`) && target.includes(`/tree/${lesson.branch}`))) {
    problems.push(`${key}: references omit the lesson branch (${lesson.branch})`);
  }

  const images = imagesIn(body);
  for (const [, alt, destination] of images) {
    if (!alt.trim()) problems.push(`${key}: image ${destination} has no alt text`);
    if (!destination.startsWith(`/images/${bookId}/`)) {
      problems.push(`${key}: image ${destination} is not under /images/${bookId}/`);
    } else if (!fs.existsSync(`${root}/static${destination}`)) {
      problems.push(`${key}: image ${destination} does not exist`);
    }
  }
  if (hasScreenshots(root, bookId, key) && images.length === 0) {
    problems.push(`${key}: screenshots exist for this lesson but the page shows none`);
  }

  const corpus = lessonCodeCorpus(lesson);
  for (const [index, fence] of codeFences(body).entries()) {
    if (!LESSON_CODE_LANGUAGES.has(fence.lang)) {
      problems.push(`${key}: code block ${index + 1} uses unsupported language ${JSON.stringify(fence.lang)}`);
    }
    if (!fence.body.trim()) {
      problems.push(`${key}: code block ${index + 1} is empty`);
    } else if (!corpus.includes(normalize(fence.body))) {
      problems.push(`${key}: code block ${index + 1} is not a verbatim excerpt of the lesson branch`);
    }
  }

  const ratio = arabicLetterRatio(body);
  if (ratio < 0.5) {
    problems.push(`${key}: only ${Math.round(ratio * 100)}% Arabic letters outside code — the text is still English`);
  }
  const latinRun = longestLatinRun(body);
  if (latinRun > 20) problems.push(`${key}: line of ${latinRun} consecutive Latin words outside code`);
  const untranslated = untranslatedLines(body);
  if (untranslated.length) {
    problems.push(
      `${key}: ${untranslated.length} line(s) still in English, first: ${JSON.stringify(untranslated[0].slice(0, 90))}`
    );
  }
  const tags = unrenderedTags(body);
  if (tags.length) {
    const names = [...new Set(tags)].slice(0, 4).join(', ');
    problems.push(`${key}: unrendered component ${names}${tags.length > 4 ? ` (+${tags.length - 4})` : ''}`);
  }

  const drift = latinDrift(body, titleWords(lesson?.title ?? translation.title));
  if (drift.length) {
    problems.push(
      `${key}: ${drift.length} Arabic line(s) keep untranslated Latin words, first: ${JSON.stringify(
        drift[0].slice(0, 90)
      )}`
    );
  }

  return problems;
};
