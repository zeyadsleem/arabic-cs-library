# brief — router--loading-data-in-parallel-single-blog-post-page

> هذا الملف متطلبات الدرس. اقرأه كاملًا قبل الكتابة، ولا تكتب خارج ما فيه.

## بيانات الدرس

| البند | القيمة |
| --- | --- |
| مفتاح الدرس | `router--loading-data-in-parallel-single-blog-post-page` |
| العنوان الإنجليزي | Loading Data in Parallel: Single Blog Post Page |
| العنوان العربي المقترح | تحميل البيانات بالتوازي: صفحة التدوينة المفردة (Loading Data in Parallel: Single Blog Post Page) |
| رقم الدرس | 22 من 34 |
| فيديو الدرس | https://www.youtube.com/watch?v=8_sGz4DHwIA&t=8507s |
| فرع الشيفرة | `loaders-3` |
| رابط الشيفرة | https://github.com/alialaa/tanstack-router-course/tree/loaders-3 |
| حزمة شيفرة الدرس | `content-src/tanstack-router/code/router--loading-data-in-parallel-single-blog-post-page.md` |
| التفريغ الإنجليزي (مادة الشرح) | `content-src/tanstack-router/router--loading-data-in-parallel-single-blog-post-page.md` |
| مستودع الدورة | https://github.com/alialaa/tanstack-router-course |

## الصور المتاحة لهذا الدرس

- `/images/tanstack-router/router--loading-data-in-parallel-single-blog-post-page--post.png` (المسار: `/posts/1`)

## روابط التوثيق الرسمي (مطلوبة في «المراجع»)

- TanStack Router — نظرة عامة (Overview): https://tanstack.com/router/latest/docs/framework/react/overview

## شكل الصفحة المطلوبة

---
title: "العنوان العربي للدرس"
---

## ماذا سنتعلّم؟

فقرة أو فقرتان: ما الذي يشرحه هذا الدرس، ولماذا يهمّ المطوّر.

## الشرح

### عنوان فرعي

شرح مفصّل بالعربية، مع مقتطفات من شيفرة الدرس:

```tsx
// مقتطف حرفي من ملف داخل حزمة الشيفرة
```

## النتيجة

![وصف الصورة بالعربية](/images/tanstack-router/router--loading-data-in-parallel-single-blog-post-page--example.png)

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


## قواعد إلزامية (الفاحص هو الحَكَم)

0. **اقرأ النموذج أولًا**: `content-src/tanstack-router-translations/router--pathless-layouts.md`
   صفحة شرح مكتملة اجتازت الفاحص؛ اقرأها قبل الكتابة imitates أسلوبها وبنيتها.
1. **الشيفرة حرفيًا**: كل كتلة ```` تُنسخ بايتًا ببايت من ملف داخل حزمة الشيفرة
   (`content-src/tanstack-router/code/router--loading-data-in-parallel-single-blog-post-page.md`)، وتكون مقتطفًا متصلًا من ملف واحد.
   لا تُعدّل المسافات ولا تختصر الكود ولا تخترع أسطرًا. لغة الكتلة مثل `tsx` أو
   `ts` أو `json` أو `css` أو `bash` أو `html` كما في الملف الأصلي.
2. **الصور**: إن وُجدت صور لهذا الدرس، ضع الصورة (أو أكثر) في قسم «النتيجة»،
   بالمسار النسبي المطلق `/images/tanstack-router/…`، ونص بديل عربي وصفي.
3. **المراجع**: يجب أن يحتوي قسم `## المراجع` على: رابط فيديو الدرس (بما فيه
   الطابع الزمني)، ورابط فرع الشيفرة، ورابط واحد على الأقل من
   `https://tanstack.com/router/`.
4. **بلا طوابع زمنية**: لا `[MM:SS]` ولا `<iframe>` ولا عبارة «التفريغ النصي».
   الشرح يشرح الدرس، ولا ينسخ كلام المحاضر سطرًا سطرًا.
5. **عناوين**: عنوان عربي في `title`، وعناوين `##` و`###` تشرح المسار.
6. **أضف شرحك ولا تخترع حقائق**: ما لم يرد في الدرس أو في شيفرته أو في التوثيق
   الرسمي، لا تضفْه. أي توضيح من عندك، اذكره صراحةً بأنه توضيح.
7. **الطول**: صفحة شرح كاملة، لا سطران ولا كتاب. الفقرات بين ٢ و٤ جمل.
8. **لا تترجم نصف جملة**: كل جملة عربية تُكتب عربيةً كاملة. أيّ كلمة لاتينية داخل
   جملة عربية تُعدّ ترجمة ناقصة، إلا إن كانت اسم منتج (TanStack، React، Zod…) أو
   تسمية واجهة معروضة في التطبيق (General، Submit…) — وحينها ضعها بين علامتَي
   `…` (backtick) داخل النص العربي. الفاحص يرصد الكلمات اللاتينية المتبقّية في
   الجمل العربية ويقبلها إن كانت ضمن قائمته المسموح بها.
9. **لا تنسخ التفريغ حرفيًا**: التفريغ الإنجليزي مادةٌ للشرح، لا نصٌّ تُترجمه كلمةً
   كلمة. أعد صياغة المعنى بالعربية، ونظّمه في فقراتٍ وعناوين.

## التحقق

```bash
node scripts/check-tanstack.mjs router--loading-data-in-parallel-single-blog-post-page
```

يجب أن يطبع `PASS` للدرس (لا `FAIL` ولا `PENDING`).
