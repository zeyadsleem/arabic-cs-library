/** Build one authoring brief per TanStack lesson.
 *
 * A brief is the single file an authoring agent reads before it writes a lesson
 * page: the video with its timestamp, the branch that holds the lesson's code,
 * the path of the code bundle, the English transcript to draw the explanation
 * from, the screenshots that were captured for the lesson, and the official
 * documentation links the page has to cite.
 *
 * Usage: `node scripts/build-tanstack-briefs.mjs [--book tanstack-router]`
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { SHOT_SPECS } from './lib/tanstack-shots.mjs';
import { verifiedDocLinks } from './lib/tanstack-docs.mjs';
import { TANSTACK_BOOKS, sourceDirectory, tanstackConfig } from './lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arguments_ = process.argv.slice(2);
const valueOf = (flag) => {
  const index = arguments_.indexOf(flag);
  return index === -1 ? undefined : arguments_[index + 1];
};
const bookFilter = valueOf('--book');

/** The repository each book's lesson branches live in.
 * @param {string} bookId @returns {string}
 */
const repositoryUrl = (bookId) =>
  bookId === 'tanstack-router'
    ? 'https://github.com/alialaa/tanstack-router-course'
    : 'https://github.com/alialaa/tanstack-form-course';

/** The page skeleton every lesson follows.
 * @param {string} key @param {string} bookId @param {string[]} images
 * @returns {string}
 */
const skeleton = (key, bookId, images) => `---
title: "العنوان العربي للدرس"
---

## ماذا سنتعلّم؟

فقرة أو فقرتان: ما الذي يشرحه هذا الدرس، ولماذا يهمّ المطوّر.

## الشرح

### عنوان فرعي

شرح مفصّل بالعربية، مع مقتطفات من شيفرة الدرس:

\`\`\`tsx
// مقتطف حرفي من ملف داخل حزمة الشيفرة
\`\`\`

## النتيجة

![وصف الصورة بالعربية](/images/${bookId}/${key}--example.png)

ما الذي يظهر في الصورة، ولماذا يهمّ.

## جرّب بنفسك

خطوات عملية يستطيع القارئ تنفيذها في مستودع الدرس.

## المراجع

- [فيديو الدرس](https://www.youtube.com/watch?v=VIDEO_ID)
- [شيفرة الدرس على GitHub](https://github.com/alialaa/repository/tree/BRANCH)
- [التوثيق الرسمي](https://tanstack.com/section/latest/docs/framework/react/overview)

---

> هذا الدرس شرح عربي مُعَدّ عن درس علي علاء في دورة «TanStack …»؛ الشيفرة من فرع
> المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.
`;

/**
 * @param {string} bookId @returns {{key: string, title: string, source: string, body: string}[]}
 */
const stagedLessons = (bookId) => {
  const directory = sourceDirectory(root, bookId);
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const parsed = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
      return {
        key: `${parsed.data.chapter}--${parsed.data.slug}`,
        title: String(parsed.data.title ?? ''),
        source: String(parsed.data.source ?? ''),
        body: parsed.content,
      };
    });
};

const main = () => {
  for (const bookId of TANSTACK_BOOKS) {
    if (bookFilter && bookFilter !== bookId) continue;
    const config = tanstackConfig(bookId);
    const bundle = JSON.parse(
      fs.readFileSync(path.join(root, 'content-src', bookId, 'lesson-code.json'), 'utf8')
    );
    const structure = JSON.parse(
      fs.readFileSync(path.join(root, 'content', `${bookId}-structure.json`), 'utf8')
    );
    const specs = SHOT_SPECS[bookId];
    const staged = stagedLessons(bookId);
    const directory = path.join(root, 'content-src', bookId, 'briefs');
    fs.mkdirSync(directory, { recursive: true });

    for (const lesson of bundle.lessons) {
      const page = staged.find((item) => item.key === lesson.key);
      const slug = lesson.key.slice(`${config.chapter}--`.length);
      const chapter = structure.chapters.find((item) => item.key === config.chapter);
      const section = chapter?.sections.find((item) => item.slug === slug);
      const spec = specs.lessons.find((item) => item.key === lesson.key);
      const images = (spec?.shots ?? []).map(
        (shot) => `- \`/images/${bookId}/${lesson.key}--${shot.name}.png\` (المسار: \`${shot.path}\`)`
      );
      const docs = verifiedDocLinks(config.docsSection);

      const body = `# brief — ${lesson.key}

> هذا الملف متطلبات الدرس. اقرأه كاملًا قبل الكتابة، ولا تكتب خارج ما فيه.

## بيانات الدرس

| البند | القيمة |
| --- | --- |
| مفتاح الدرس | \`${lesson.key}\` |
| العنوان الإنجليزي | ${page?.title ?? ''} |
| العنوان العربي المقترح | ${section?.title ?? ''} |
| رقم الدرس | ${lesson.order + 1} من ${bundle.lessons.length} |
| فيديو الدرس | ${page?.source ?? ''} |
| فرع الشيفرة | ${lesson.branch ? `\`${lesson.branch}\`` : 'لا يوجد (درس تمهيدي)'} |
| رابط الشيفرة | ${
        lesson.branch
          ? `https://github.com/alialaa/${config.chapter === 'router' ? 'tanstack-router-course' : 'tanstack-form-course'}/tree/${lesson.branch}`
          : '—'
      } |
| حزمة شيفرة الدرس | \`content-src/${bookId}/code/${lesson.key}.md\` |
| التفريغ الإنجليزي (مادة الشرح) | \`content-src/${bookId}/${lesson.key}.md\` |
| مستودع الدورة | ${repositoryUrl(bookId)} |

## الصور المتاحة لهذا الدرس

${images.length ? images.join('\n') : 'لا توجد صورة لهذا الدرس (لا تضف صورة من درس آخر).'}

## روابط التوثيق الرسمي (مطلوبة في «المراجع»)

${docs.map((link) => `- ${link.title}: ${link.url}`).join('\n')}

## شكل الصفحة المطلوبة

${skeleton(lesson.key, bookId, images)}

## قواعد إلزامية (الفاحص هو الحَكَم)

0. **اقرأ النموذج أولًا**: \`content-src/tanstack-router-translations/router--pathless-layouts.md\`
   صفحة شرح مكتملة اجتازت الفاحص؛ اقرأها قبل الكتابة imitates أسلوبها وبنيتها.
1. **الشيفرة حرفيًا**: كل كتلة \`\`\`\` تُنسخ بايتًا ببايت من ملف داخل حزمة الشيفرة
   (\`content-src/${bookId}/code/${lesson.key}.md\`)، وتكون مقتطفًا متصلًا من ملف واحد.
   لا تُعدّل المسافات ولا تختصر الكود ولا تخترع أسطرًا. لغة الكتلة مثل \`tsx\` أو
   \`ts\` أو \`json\` أو \`css\` أو \`bash\` أو \`html\` كما في الملف الأصلي.
2. **الصور**: إن وُجدت صور لهذا الدرس، ضع الصورة (أو أكثر) في قسم «النتيجة»،
   بالمسار النسبي المطلق \`/images/${bookId}/…\`، ونص بديل عربي وصفي.
3. **المراجع**: يجب أن يحتوي قسم \`## المراجع\` على: رابط فيديو الدرس (بما فيه
   الطابع الزمني)، ورابط فرع الشيفرة، ورابط واحد على الأقل من
   \`https://tanstack.com/${config.docsSection}/\`.
4. **بلا طوابع زمنية**: لا \`[MM:SS]\` ولا \`<iframe>\` ولا عبارة «التفريغ النصي».
   الشرح يشرح الدرس، ولا ينسخ كلام المحاضر سطرًا سطرًا.
5. **عناوين**: عنوان عربي في \`title\`، وعناوين \`##\` و\`###\` تشرح المسار.
6. **أضف شرحك ولا تخترع حقائق**: ما لم يرد في الدرس أو في شيفرته أو في التوثيق
   الرسمي، لا تضفْه. أي توضيح من عندك، اذكره صراحةً بأنه توضيح.
7. **الطول**: صفحة شرح كاملة، لا سطران ولا كتاب. الفقرات بين ٢ و٤ جمل.
8. **لا تترجم نصف جملة**: كل جملة عربية تُكتب عربيةً كاملة. أيّ كلمة لاتينية داخل
   جملة عربية تُعدّ ترجمة ناقصة، إلا إن كانت اسم منتج (TanStack، React، Zod…) أو
   تسمية واجهة معروضة في التطبيق (General، Submit…) — وحينها ضعها بين علامتَي
   \`…\` (backtick) داخل النص العربي. الفاحص يرصد الكلمات اللاتينية المتبقّية في
   الجمل العربية ويقبلها إن كانت ضمن قائمته المسموح بها.
9. **لا تنسخ التفريغ حرفيًا**: التفريغ الإنجليزي مادةٌ للشرح، لا نصٌّ تُترجمه كلمةً
   كلمة. أعد صياغة المعنى بالعربية، ونظّمه في فقراتٍ وعناوين.

## التحقق

\`\`\`bash
node scripts/check-tanstack.mjs ${lesson.key}
\`\`\`

يجب أن يطبع \`PASS\` للدرس (لا \`FAIL\` ولا \`PENDING\`).
`;

      fs.writeFileSync(path.join(directory, `${lesson.key}.md`), body);
    }
    console.log(`${bookId}: ${bundle.lessons.length} brief(s) in content-src/${bookId}/briefs/`);
  }
};

main();
