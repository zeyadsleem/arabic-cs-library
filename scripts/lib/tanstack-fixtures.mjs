/** Offline fixtures for the third-party APIs the course branches call.
 *
 * The screenshot runner is an authoring tool and must work without the public
 * services: `dummyjson.com` serves the blog posts, comments, and 404s the loader
 * lessons expect, and `random-words-api.kushcreates.com` serves the caching
 * lesson's word. Responses follow the shapes the course code casts them to
 * (`PostsResponse`, `PostCommentsResponse`, `[{ word }]`).
 *
 * @typedef {{id: number, title: string, body: string, userId: number}} Post
 * @typedef {{id: number, body: string, postId: number, userId: number,
 *   user: {id: number, username: string}}} PostComment
 */

/** @type {Post[]} */
const POSTS = [
  { id: 1, userId: 1, title: 'His mother had always taught him', body: 'His mother had always taught him not to overthink things, so he followed her advice and started writing code before breakfast.' },
  { id: 2, userId: 2, title: 'A quiet morning in the city', body: 'The streets were empty and the coffee was warm, which made it the perfect hour to read the router documentation.' },
  { id: 3, userId: 3, title: 'The art of small refactors', body: 'A refactor does not need to be large to be useful; renaming one honest function can make a whole file readable again.' },
  { id: 4, userId: 4, title: 'Why types are a conversation', body: 'Types are not a checklist. They are a conversation between you and the next person who opens the file.' },
  { id: 5, userId: 5, title: 'Notes from a long train ride', body: 'Between two stations he sketched the route tree on the back of a receipt and finally understood nested layouts.' },
  { id: 6, userId: 1, title: 'The cache that would not expire', body: 'Every request returned the same stale answer until someone remembered to invalidate the router cache.' },
  { id: 7, userId: 2, title: 'A short guide to error boundaries', body: 'Errors are part of the interface. A good boundary turns a stack trace into a sentence a reader can act on.' },
  { id: 8, userId: 3, title: 'Letters to a young programmer', body: 'Start with the smallest working page, then add one loader at a time; progress you can see is progress you can keep.' },
  { id: 9, userId: 4, title: 'The search for the right parameter', body: 'Search parameters are the address of a page state, so treat them with the same care as the path itself.' },
  { id: 10, userId: 5, title: 'When the network is slow', body: 'Show the pending state early and the reader will forgive the wait; show nothing and they will invent the worst.' },
  { id: 11, userId: 1, title: 'Pagination without surprises', body: 'Ten posts per page sounds simple until you bookmark page two and open it a week later.' },
  { id: 12, userId: 2, title: 'The loader and the lazy component', body: 'Split the code at the route boundary and the first visit pays only for the page it actually opens.' },
  { id: 13, userId: 3, title: 'Preloading on intent', body: 'Hovering a link is a promise. Preloading keeps that promise before the click even arrives.' },
  { id: 14, userId: 4, title: 'A password is not a personality', body: 'Validation should explain the rule it is enforcing, not just refuse the value without a reason.' },
  { id: 15, userId: 5, title: 'Context is a shared cupboard', body: 'Pass down only what the subtree truly needs; a cupboard full of everything becomes a cupboard you cannot search.' },
  { id: 16, userId: 1, title: 'The flat route experiment', body: 'Filenames describe the tree. Once the tree is flat, the address is written on the door of every room.' },
  { id: 17, userId: 2, title: 'Optional parameters, optional plans', body: 'An archive that works with a year, a month, or nothing at all is a small lesson in designing flexible routes.' },
  { id: 18, userId: 3, title: 'Redirects with good manners', body: 'A redirect should say where it is going and why, then let the reader decide whether to follow.' },
  { id: 19, userId: 4, title: 'The night the routes were protected', body: 'Authentication is not a gate at the front door only; layouts can guard a whole wing of the application.' },
  { id: 20, userId: 5, title: 'A postcard from the random word', body: 'Some lessons begin with a single word fetched from a tiny API and end with a full understanding of caching.' },
];

/** @param {number} postId @returns {PostComment[]} */
const commentsFor = (postId) => [
  {
    id: postId * 10 + 1,
    postId,
    userId: 1,
    body: 'This is exactly the part I kept rereading until it clicked.',
    user: { id: 1, username: 'michael.williams' },
  },
  {
    id: postId * 10 + 2,
    postId,
    userId: 2,
    body: 'The example makes the rule obvious. Thank you for writing it down.',
    user: { id: 2, username: 'emilys' },
  },
  {
    id: postId * 10 + 3,
    postId,
    userId: 3,
    body: 'I tried it in my own project and the pending state finally behaves.',
    user: { id: 3, username: 'oliviawilson' },
  },
];

/** Words returned per language by the caching lesson's fixture. */
const WORDS = { en: 'serendipity', es: 'efímero', fr: 'éphémère', zh: '你好' };

/** JSON response helper. @param {import('@playwright/test').Route} route */
const fulfillJson = (route, status, body) =>
  route.fulfill({
    status,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify(body),
  });

/** A Playwright route handler for dummyjson.com.
 * @param {{delay?: () => number}} [options] @returns {(route: import('@playwright/test').Route) => Promise<void>}
 */
export const createDummyJsonHandler = ({ delay = () => 0 } = {}) => async (route) => {
  const wait = delay();
  if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
  const url = new URL(route.request().url());
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0] !== 'posts') return fulfillJson(route, 404, { message: 'Not Found' });

  if (parts.length === 1) {
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const skip = Number(url.searchParams.get('skip') ?? 0);
    return fulfillJson(route, 200, {
      posts: POSTS.slice(skip, skip + limit),
      total: POSTS.length,
      skip,
      limit,
    });
  }

  const id = Number(parts[1]);
  const post = POSTS.find((item) => item.id === id);
  if (!post) return fulfillJson(route, 404, { message: `Post with id '${parts[1]}' not found` });
  if (parts[2] === 'comments') {
    const comments = commentsFor(post.id);
    return fulfillJson(route, 200, { comments, total: comments.length, skip: 0, limit: comments.length });
  }
  if (parts.length === 2) return fulfillJson(route, 200, post);
  return fulfillJson(route, 404, { message: 'Not Found' });
};

/** A Playwright route handler for the random-words API.
 * @param {{delay?: () => number}} [options] @returns {(route: import('@playwright/test').Route) => Promise<void>}
 */
export const createRandomWordHandler = ({ delay = () => 0 } = {}) => async (route) => {
  const wait = delay();
  if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
  const url = new URL(route.request().url());
  const language = url.searchParams.get('language') ?? 'en';
  await fulfillJson(route, 200, [
    { word: WORDS[language] ?? WORDS.en, definition: 'A word chosen by the fixture.', pronunciation: '' },
  ]);
};
