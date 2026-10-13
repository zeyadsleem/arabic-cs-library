/** Chapter metadata for the Hono documentation, shared by the importer and the
 * translation build. The hono.dev sidebar groups the pages; the chapter order
 * below is the order the book is read in.
 */
export const HONO_CHAPTERS = [
  { key: 'getting-started', title: 'Getting Started', titleAr: 'مقدمات' },
  { key: 'concepts', title: 'Concepts', titleAr: 'المفاهيم' },
  { key: 'middleware-builtin', title: 'Built-in Middleware', titleAr: 'الوسائط المدمجة' },
  { key: 'middleware-third-party', title: 'Third-party Middleware', titleAr: 'الوسائط الخارجية' },
  { key: 'helpers', title: 'Helpers', titleAr: 'المساعدات' },
  { key: 'guides', title: 'Guides', titleAr: 'الأدلة' },
  { key: 'api', title: 'API', titleAr: 'مرجع الواجهة' },
  { key: 'agents', title: 'Coding Agents', titleAr: 'الوكلاء' },
];

/** Docs sidebar group title → chapter key. */
export const HONO_SIDEBAR_CHAPTERS = {
  'Getting Started': 'getting-started',
  Concepts: 'concepts',
  Middleware: 'middleware-builtin',
  Helpers: 'helpers',
  Guides: 'guides',
  API: 'api',
  'Coding Agents': 'agents',
};

/** Pages llms.txt lists that the docs sidebar does not render.
 * `after` is the docs route a page belongs behind; `null` puts it first in its
 * chapter, where it becomes that chapter's index page.
 */
export const HONO_PLACEMENT = {
  index: { chapter: 'getting-started', after: null },
  'api/index': { chapter: 'api', after: null },
  'getting-started/cloudflare-pages': { chapter: 'getting-started', after: 'getting-started/cloudflare-workers-vite' },
  'guides/examples': { chapter: 'guides', after: 'guides/create-hono' },
};

/** Every chapter opens with an index page, which is the file the reader loads. */
export const HONO_INDEX_SLUG = 'index';
