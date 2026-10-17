/** Shared rules for the Kinney Arabic page translations.
 *
 * A translation is one markdown file per page in `content-src/kinney-translations/`,
 * named `<chapter>--<slug>.md` after its staged English source, for example
 * `react-typescript--component-props-complete-guide.md`. Each file carries the
 * Arabic page title in its frontmatter and the full Arabic body below it.
 *
 * The rules themselves live in `translation-rules.mjs`, shared with the other
 * imported books; this module re-exports them and names the book's own source and
 * translations directories so the builder and `scripts/check-kinney.mjs` keep one
 * import path.
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
  readTranslation,
  stagedPages,
  validatePageTranslation,
} from './translation-rules.mjs';

/** Staged English source directory. */
export const sourceDirectory = (root) => `${root}/content-src/kinney`;

/** Translations directory holding one markdown file per page. */
export const translationsDirectory = (root) => `${root}/content-src/kinney-translations`;

/** Every staged English page, in source order.
 * @param {string} root @returns {ReturnType<typeof stagedPages>}
 */
export const kinneyPages = (root) => stagedPages(sourceDirectory(root));
