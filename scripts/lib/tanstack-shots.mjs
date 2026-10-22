/** Screenshots captured from each lesson's own branch of the course repository.
 *
 * Every visual lesson gets one or more PNG files under
 * `static/images/<book>/<lesson>--<shot>.png`. The capture runner
 * (`scripts/capture-tanstack.mjs`) checks out the lesson's branch, starts the Vite
 * dev server, follows the actions below, and saves the viewport (or the full page
 * for the long forms).
 *
 * Actions are a small, explicit vocabulary so the specs stay readable:
 * `fill`, `click`, `hover`, `check`, `blur`, `select`, `press`, `wait`, `waitFor`.
 * Selectors prefer placeholders and visible text over DOM structure: the plain
 * lesson branches and the shadcn branches then share the same spec.
 *
 * @typedef {{fill: string, value: string} | {click: string} | {hover: string} |
 *   {check: string} | {blur: string} | {select: string, value: string} |
 *   {press: string, key: string} | {wait: number} | {waitFor: string}} ShotAction
 * @typedef {{name: string, path: string, fullPage?: boolean, settle?: number,
 *   delay?: number, actions?: ShotAction[]}} Shot
 * @typedef {{port: number, colorScheme?: 'light' | 'dark', lessons: Array<{key: string, shots: Shot[]}>}} BookSpec
 */

/** @type {Record<string, BookSpec>} */
export const SHOT_SPECS = {
  'tanstack-router': {
    port: 5199,
    colorScheme: 'dark',
    lessons: [
      { key: 'router--index', shots: [] },
      { key: 'router--installation', shots: [{ name: 'home', path: '/' }] },
      {
        key: 'router--code-based-router',
        shots: [
          { name: 'home', path: '/' },
          { name: 'about', path: '/about' },
        ],
      },
      { key: 'router--navigation-links', shots: [{ name: 'about', path: '/about' }] },
      { key: 'router--file-based-router', shots: [{ name: 'home', path: '/' }] },
      {
        key: 'router--nesting-routes',
        shots: [{ name: 'settings-profile', path: '/settings/profile' }],
      },
      { key: 'router--pathless-layouts', shots: [{ name: 'settings', path: '/settings' }] },
      {
        key: 'router--ignored-folders',
        shots: [{ name: 'settings-password', path: '/settings/password' }],
      },
      { key: 'router--flat-routes', shots: [{ name: 'settings-payment', path: '/settings/payment' }] },
      {
        key: 'router--dynamic-path-segments',
        shots: [
          { name: 'posts', path: '/posts' },
          { name: 'post', path: '/posts/1' },
        ],
      },
      {
        key: 'router--catch-all-routes',
        shots: [{ name: 'file-route', path: '/file/file-123/report.txt' }],
      },
      { key: 'router--optional-parameters', shots: [{ name: 'archive', path: '/archive/2024/05' }] },
      {
        key: 'router--search-parameters',
        shots: [{ name: 'products', path: '/products?sort_by=price' }],
      },
      {
        key: 'router--validating-search-params-with-zod',
        shots: [
          {
            name: 'products-validated',
            path: '/products?sort_by=price&pagination[page]=2&pagination[pageSize]=5',
          },
        ],
      },
      {
        key: 'router--handling-search-params-errors',
        shots: [{ name: 'products-error', path: '/products?product_type=hats' }],
      },
      { key: 'router--more-on-the-link-component', shots: [{ name: 'post', path: '/posts/1' }] },
      {
        key: 'router--other-ways-to-navigate-programmatically',
        shots: [{ name: 'posts', path: '/posts' }],
      },
      { key: 'router--context', shots: [{ name: 'posts', path: '/posts' }] },
      { key: 'router--passing-state-in-context', shots: [{ name: 'posts', path: '/posts' }] },
      { key: 'router--loader-functions-posts-page', shots: [{ name: 'posts', path: '/posts' }] },
      { key: 'router--adding-pagination', shots: [{ name: 'posts-page-2', path: '/posts?page=2' }] },
      {
        key: 'router--loading-data-in-parallel-single-blog-post-page',
        shots: [{ name: 'post', path: '/posts/1' }],
      },
      {
        key: 'router--pending-state-component',
        shots: [
          {
            name: 'pending',
            path: '/posts',
            settle: 120,
            delay: 1200,
            actions: [
              { click: 'a[href^="/posts/"]' },
              { wait: 250 },
            ],
          },
        ],
      },
      {
        key: 'router--loading-data-in-the-background',
        shots: [{ name: 'post', path: '/posts/1' }],
      },
      { key: 'router--error-handling', shots: [{ name: 'posts-error', path: '/posts' }] },
      {
        key: 'router--not-found-errors',
        shots: [{ name: 'post-not-found', path: '/posts/999999' }],
      },
      { key: 'router--catchboundary', shots: [{ name: 'post-error', path: '/posts/1' }] },
      { key: 'router--code-splitting', shots: [{ name: 'about', path: '/about' }] },
      {
        key: 'router--preloading',
        shots: [
          {
            name: 'posts',
            path: '/posts',
            actions: [
              { hover: 'a[href^="/posts/"]' },
              { wait: 700 },
            ],
          },
        ],
      },
      {
        key: 'router--caching',
        shots: [{ name: 'random-word', path: '/random-word', settle: 1400 }],
      },
      {
        key: 'router--caching-options',
        shots: [{ name: 'random-word', path: '/random-word', settle: 1400 }],
      },
      { key: 'router--protecting-routes', shots: [{ name: 'login', path: '/login' }] },
      {
        key: 'router--protecting-multiple-routes-with-layouts',
        shots: [{ name: 'login', path: '/login' }],
      },
      { key: 'router--more-topics-and-outro', shots: [] },
    ],
  },

  'tanstack-form': {
    port: 5198,
    colorScheme: 'light',
    lessons: [
      { key: 'form--index', shots: [] },
      { key: 'form--installation', shots: [] },
      { key: 'form--first-form', shots: [{ name: 'form', path: '/', fullPage: true }] },
      {
        key: 'form--fields-meta-data',
        shots: [
          {
            name: 'meta',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'A' },
              { blur: 'input[placeholder="First Name"]' },
              { wait: 200 },
            ],
          },
        ],
      },
      {
        key: 'form--reactivity-and-listeners',
        shots: [
          {
            name: 'listeners',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'Zayd' },
              { fill: 'input[placeholder="Last Name"]', value: 'Ali' },
              { fill: 'input[placeholder="First Name"]', value: 'Zayd A.' },
              { wait: 200 },
            ],
          },
        ],
      },
      {
        key: 'form--objects-and-arrays',
        shots: [
          {
            name: 'skills',
            path: '/',
            fullPage: true,
            actions: [
              { click: 'button:has-text("Add Skill")' },
              { click: 'button:has-text("Add Skill")' },
              { check: 'input[type="checkbox"]' },
              { wait: 200 },
            ],
          },
        ],
      },
      {
        key: 'form--field-level-validations',
        shots: [
          {
            name: 'field-error',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'A' },
              { blur: 'input[placeholder="First Name"]' },
              { wait: 200 },
            ],
          },
        ],
      },
      {
        key: 'form--form-level-validations',
        shots: [
          {
            name: 'form-errors',
            path: '/',
            fullPage: true,
            actions: [
              // The submit button is disabled while the form-level rules fail, so
              // the shot shows the errors the onChange form validator produces.
              { fill: 'input[placeholder="First Name"]', value: 'Zayd' },
              { wait: 400 },
            ],
          },
        ],
      },
      {
        key: 'form--async-validations',
        shots: [
          {
            name: 'async-error',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'Ali' },
              { blur: 'input[placeholder="First Name"]' },
              { wait: 900 },
            ],
          },
        ],
      },
      {
        key: 'form--dynamic-validations',
        shots: [
          {
            name: 'submitted',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'Zayd' },
              { fill: 'input[placeholder="Last Name"]', value: 'Ali' },
              { fill: 'input[placeholder="Street"]', value: 'Main Street' },
              { click: 'button:has-text("Submit")' },
              { wait: 400 },
            ],
          },
        ],
      },
      {
        key: 'form--linked-fields',
        shots: [
          {
            name: 'mismatch',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="Password"]', value: '1234567' },
              { fill: 'input[placeholder="Confirm Password"]', value: '7654321' },
              { blur: 'input[placeholder="Confirm Password"]' },
              { wait: 300 },
            ],
          },
        ],
      },
      {
        key: 'form--validating-with-zod',
        shots: [
          {
            name: 'zod-errors',
            path: '/',
            fullPage: true,
            actions: [
              // The Zod schema runs on change, so the field error shows without
              // pressing the (disabled) submit button.
              { fill: 'input[placeholder="First Name"]', value: 'A' },
              { blur: 'input[placeholder="First Name"]' },
              { wait: 400 },
            ],
          },
        ],
      },
      {
        key: 'form--validating-with-zod-refine-and-async',
        shots: [
          {
            name: 'refine-error',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="Password"]', value: '1234567' },
              { fill: 'input[placeholder="Confirm Password"]', value: '7654321' },
              { blur: 'input[placeholder="Confirm Password"]' },
              { wait: 500 },
            ],
          },
        ],
      },
      {
        key: 'form--notes-on-form-submission',
        shots: [
          {
            name: 'submit-errors',
            path: '/',
            fullPage: true,
            actions: [
              // This branch submits with the "Save" button, not "Submit".
              { click: 'button:has-text("Save")' },
              { wait: 400 },
            ],
          },
        ],
      },
      {
        key: 'form--using-shadcn-components',
        shots: [{ name: 'form', path: '/', fullPage: true }],
      },
      {
        key: 'form--refactoring-our-form-and-using-useappform',
        shots: [{ name: 'form', path: '/', fullPage: true }],
      },
      {
        key: 'form--creating-reusable-field-components',
        shots: [
          {
            name: 'form',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="First Name"]', value: 'Zayd' },
              { click: 'button:has-text("Add Skill")' },
              { wait: 300 },
            ],
          },
        ],
      },
      {
        key: 'form--creating-reusable-form-components',
        shots: [{ name: 'form', path: '/', fullPage: true }],
      },
      {
        key: 'form--lazy-loading-form-components',
        shots: [{ name: 'form', path: '/', fullPage: true, settle: 1300 }],
      },
      {
        key: 'form--breaking-forms-into-smaller-pieces-with-withform-hoc',
        shots: [
          {
            name: 'skills',
            path: '/',
            fullPage: true,
            actions: [
              { click: 'button:has-text("Add Skill")' },
              { wait: 300 },
            ],
          },
        ],
      },
      {
        key: 'form--creating-reusable-group-of-fields-with-withfieldgroup-hoc',
        shots: [
          {
            name: 'password-mismatch',
            path: '/',
            fullPage: true,
            actions: [
              { fill: 'input[placeholder="Password"]', value: '1234567' },
              { fill: 'input[placeholder="Confirm Password"]', value: '7654321' },
              { blur: 'input[placeholder="Confirm Password"]' },
              { wait: 400 },
            ],
          },
        ],
      },
    ],
  },
};

/** Where one book's screenshots are written.
 * @param {string} root @param {string} bookId @returns {string}
 */
export const screenshotDirectory = (root, bookId) => `${root}/static/images/${bookId}`;
