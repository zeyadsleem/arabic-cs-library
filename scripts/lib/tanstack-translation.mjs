/** Shared rules for the TanStack Arabic page translations.
 *
 * Two video courses are staged here, each as one book:
 *   tanstack-router  (chapter key "router", 34 lessons, video 8_sGz4DHwIA)
 *   tanstack-form     (chapter key "form",  21 lessons, video H2T21r5wu3g)
 *
 * A translation is one markdown file per page in `content-src/<book>-translations/`,
 * named `<chapter>--<slug>.md` after its staged English source. Rules come from
 * `translation-rules.mjs`; this module re-exports them and names the per-book
 * source and translations directories, like `lib/kinney-translation.mjs`.
 */
import { stagedPages } from './translation-rules.mjs';

export {
  codeFences,
  linkTargets,
  withoutCodeFences,
  withoutDestinations,
  arabicLetterRatio,
  untranslatedLines,
  longestLatinRun,
  unrenderedTags,
  ARABIC_RATIO_MINIMUM,
  LATIN_RUN_MAXIMUM,
  ARABIC_LETTER,
  readTranslation,
  stagedPages,
  validatePageTranslation,
} from './translation-rules.mjs';

const CONFIGS = {
  'tanstack-router': {
    id: 'tanstack-router',
    chapter: 'router',
    videoId: '8_sGz4DHwIA',
    source: (root) => `${root}/content-src/tanstack-router`,
    translations: (root) => `${root}/content-src/tanstack-router-translations`,
  },
  'tanstack-form': {
    id: 'tanstack-form',
    chapter: 'form',
    videoId: 'H2T21r5wu3g',
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
