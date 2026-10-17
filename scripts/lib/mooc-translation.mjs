/** Shared rules for the MOOC Arabic page translations.
 *
 * A translation is one markdown file per page in `content-src/mooc-translations/`,
 * named `<chapter>--<slug>.md` after its staged English source, for example
 * `part-4--2-more-functions.md`. Each file carries the Arabic page title in its
 * frontmatter and the full Arabic body below it.
 *
 * The rules themselves live in `translation-rules.mjs`, shared with the other
 * imported books; this module re-exports them so the builders, the checker and
 * any other importer keep one import path.
 */
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

/** Course structure with the Arabic part titles published in the reader. */
export const MOOC_CHAPTERS = [
  { key: 'part-1', title: 'Part 1: Getting Started', titleAr: 'الجزء 1: البدء' },
  { key: 'part-2', title: 'Part 2: Conditional Statements', titleAr: 'الجزء 2: الجمل الشرطية' },
  { key: 'part-3', title: 'Part 3: Loops', titleAr: 'الجزء 3: الحلقات' },
  { key: 'part-4', title: 'Part 4: Functions and Lists', titleAr: 'الجزء 4: الدوال والقوائم' },
  { key: 'part-5', title: 'Part 5: Data Structures', titleAr: 'الجزء 5: هياكل البيانات' },
  { key: 'part-6', title: 'Part 6: Files and Errors', titleAr: 'الجزء 6: الملفات والأخطاء' },
  { key: 'part-7', title: 'Part 7: Modules', titleAr: 'الجزء 7: الوحدات' },
  { key: 'part-8', title: 'Part 8: Objects and Classes', titleAr: 'الجزء 8: الكائنات والصنوف' },
  { key: 'part-9', title: 'Part 9: More Objects', titleAr: 'الجزء 9: المزيد عن الكائنات' },
  { key: 'part-10', title: 'Part 10: Class Hierarchies', titleAr: 'الجزء 10: تراكيب الأصناف' },
  { key: 'part-11', title: 'Part 11: Advanced Features', titleAr: 'الجزء 11: ميزات متقدمة' },
  { key: 'part-12', title: 'Part 12: Functional Programming', titleAr: 'الجزء 12: البرمجة الدالية' },
  { key: 'part-13', title: 'Part 13: Games with Pygame', titleAr: 'الجزء 13: الألعاب مع Pygame' },
  { key: 'part-14', title: 'Part 14: Game Project', titleAr: 'الجزء 14: مشروع اللعبة' },
  { key: 'auxiliary', title: 'Auxiliary Pages', titleAr: 'صفحات مساعدة' },
];

/** Translations directory holding one markdown file per page. */
export const translationsDirectory = (root) => `${root}/content-src/mooc-translations`;
