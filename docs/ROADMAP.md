# خطة التنفيذ الكاملة — المكتبة العربية لعلوم الحاسوب

هذا المستند هو خطة العمل الكاملة: ترتيب التعلّم، وحالة كل مصدر بعد التحقق من
الترخيص، وخطوات الاستيراد والترجمة، وبوابات الجودة، وطابور التنفيذ. كل رقم فيه
مصدره.

## 0. الحالة الحالية (آخر تحديث)

حالة `content/library.json` بعد التحقق الفعلي من المستودع: **56 كتاباً** —
**49 في حالة `translated`** و**7 في حالة `planned`**، ولا توجد حالة ثالثة.

| التصنيف | العدد | التفاصيل |
| --- | --- | --- |
| كتب بصفحات محلية داخل المكتبة | 43 | 2211 قسماً في `src/lib/generated/sections/` (منها 864 صفحة Kinney يبنيها `scripts/build-kinney.mjs`) |
| كتب مستضافة خارجياً عبر `siteUrl` | 7 | `gobyexample-ar` · `learn-go-with-tests-ar` · `go101-ar` · `eloquent-javascript-ar` · `fullstack-open-ar` · `webdev-learn-ar` · `mooc` — ترجمتها كاملة لكنها تُقدَّم من مواقع خارجية، فلا صفحات محلية لها |
| في طابور الترجمة | 7 | القسم 8 أدناه |

`go-tour` ليست مستثنية: 103 صفحاتها العربية تُبنى من `src/lib/tour/translations/*.json`
عبر `scripts/build-go-tour.mjs` ثم تُحقن في البيان عبر تخصيص في `build-content.mjs` —
خط إنتاج مختلف عن خط `content/<book>/`، لكنه يمر بالفحص نفسه.

بوابات الجودة المُنفَّذة فعلياً وكلّها تمر حالياً:

| البوابة | النتيجة |
| --- | --- |
| `pnpm audit:content` | 2211 قسماً في 43 كتاباً — 0 صورة ناقصة، 0 صيغة خاطئة، 0 نص معلّم |
| `pnpm test:content` | يفشل في دورتي TanStack (32 تحقّقاً) — عمل سابق ناقص خارج نطاق Kinney؛ 77/109 تمر |
| `pnpm test:import` | 9/9 |
| `pnpm check:links` | 0 رابط غير محلَّل من 936,298 مرجعاً داخلياً على 2273 صفحة |
| `node scripts/build-content.mjs` | يخرج 0 فقط إذا كانت **كل** صفحة لكل كتاب مصنَّف `translated` بالفعل عربية |
| `node scripts/check-mooc.mjs` | بوابة صفحة-صفحة لترجمة MOOC (القفل 1 أدناه) |
| `node scripts/check-kinney.mjs` | 864 صفحة: 864 pass، 0 pending، 0 invalid (القفل 2 أدناه) |

ملاحظتان حول النزاهة بعد هذه الجولة:

1. أُغلقت ثغرة «السقوط الصامت» في `build-content.mjs`: كان يطبع
   `not translated yet` ثم ينشر الصفحة رغم ذلك، وقد أتت بالضبط على MOOC. الآن
   تُجمَّع الصفحات غير العربية في قائمة واحدة ويُخرج الكود 1.
2. صُحِّح تصنيفان كانا كاذبين: `mathematics-for-cs` كانت مُصنَّفة `translated`
   مع 22 صفحة كلها إنجليزية، وأُعيدت إلى `planned` مع ملاحظة صريحة. أما
   `go-tour` فكانت مُصنَّفة `planned` عن طريق خطأ وأُعيدت إلى `translated`
   بعد التحقق أن 103 صفحاتها العربية موجودة فعلاً في البيان.

## 1. القاعدة الحاكمة: الترخيص قبل الترجمة

الترجمة العربية **عمل مشتق**، و`CC BY-NC-ND` forbids derivatives، فبعض الكتب
لا يمكن ترجمتها مهما كانت مفتوحة القراءة. لذلك كل مصدر في
`content/library.json` مصنّف إلى:

| الحالة | المعنى | المظهر في الموقع |
| --- | --- | --- |
| `translated` | متاح بالعربية داخل المكتبة | شارة «مترجم» + زر قراءة |
| `planned` | الترخيص يسمح بالترجمة وقيد التنفيذ | شارة «قيد الإعداد» |
| `reference` | متاح للقراءة فقط (ND أو بلا ترخيص) | شارة «مرجع» + رابط المصدر |
| `blocked` | ND أو كتاب ناقص | شارة «غير قابل للترجمة» + بديل |

## 2. خارطة التعلّم (13 مرحلة)

| # | المرحلة | المصادر بالترتيب | المتطلب السابق |
| --- | --- | --- | --- |
| ① | التأسيس | SICP (✅) · Hello Algo (✅) | — |
| ② | أدوات المبرمج | Missing Semester (✅ 13 محاضرة) | — |
| ③ | الرياضيات | Discrete Math (Levin) (✅) · MCS · IntroTCS (✅) | — |
| ④ | بنى البيانات | Open Data Structures (✅) | — |
| ⑤ | الأنظمة | xv6 (✅) · OSTEP (مرجع) · Nand2Tetris I (✅) · Nand2Tetris II (✅) · Dive into Systems (✅) | — |
| ⑥ | مسار Go | Go by Example (✅) · Learn Go with Tests (✅) · Go 101 (✅) | — |
| ⑦ | JavaScript | Eloquent JavaScript (✅) | — |
| ⑧ | تطوير الويب | Full Stack open (✅) · Patterns.dev (✅) · AHA Stack (✅) · Frontend Architecture (✅) · TanStack Router (✅) · TanStack Form (✅) · معمل التعلّم — web.dev (✅) | Eloquent JS |
| ⑨ | الشبكات | Computer Networks (بانتظار موافقة المؤلفين) | Nand2Tetris I |
| ⑩ | قواعد البيانات | DB Design (✅) · DB Performance at Scale · Database Foundations (✅) · PostgreSQL Internals (✅) · Use The Index (✅) | — |
| ⑪ | اللغات | Learn Programming with OCaml · OCaml Manual (مرجع) · CS3110 (✅) · Crafting Interpreters (✅) | — |
| ⑫ | معمارية البرمجيات | 500 Lines (✅) · AOSA (✅) · Game Programming Patterns (✅) | — |
| ⑬ | الأمن | Crypto 101 (✅) · Open Workbook of Cryptology · Network Security (✅) · Cryptopals (✅) | — |

## 3. مص_matrix التحقق (ملخّص ما تم التحقق منه فعلياً)

### قابلة للترجمة (الترخيص يسمح + المحتوى كامل)
| الكتاب | الترخيص | مصدر الاستيراد | حجم | ملاحظات |
| --- | --- | --- | --- | --- |
| SICP | CC BY-SA 4.0 | `mitp-content-server.../book-Z-H-{1..38}.html` | 883 صفحة، 5 فصول، 93 شكلاً، 356 تمريناً | رابط mitpressmhajs يرجع 403؛ استخدم content server |
| Discrete Math 4e | CC BY-NC-SA 4.0 | PreTeXt في `oscarlevin/discrete-book` | 549 صفحة، 306 SVG | PDF وLaTeX أدقّ من HTML |
| MCS | CC BY-SA 3.0 | `courses.csail.mit.edu/6.042/spring18/mcs.pdf` | 1048 صفحة، 22 فصلاً | PDF فقط ⇒ استخراج صفحات + قدرات |
| Open Data Structures | CC BY 2.5 CA | LaTeX في `patmorin/ods` | 334 صفحة، 14 فصلاً | HTML المولّد يسقط الأشكال |
| Nand2Tetris I+II | CC BY-NC-SA 3.0 | صفحات `/project01..12` + PDF | 12 مشروعاً | الفيديوهات على Coursera (غير قابلة للترجمة) |
| xv6 | MIT (دليل + شيفرة) | `mit-pdos.github.io/xv6-riscv-book/*.html` | 9 فصول، 74 قسماً | ملاحظات المحاضرات بلا ترخيص مستقل |
| Database Design 2e | CC BY 4.0 | Pressbooks `open/download?type=xhtml` | 16 فصلاً، 153 صفحة | أسهل استيراد (XHTML نظيف) |
| DB Performance at Scale | CC BY 4.0 | Springer OA PDF | 11 فصلاً، 270 صفحة | PDF فقط |
| Learn Programming with OCaml | CC BY-SA 4.0 | PDF/EPUB من `usr.lmf.cnrs.fr/lpo/` | 13 فصلاً، 431 صفحة | الطبعة الإنجليزية (مترجمة عن الفرنسية) |
| OCaml Manual 5.5 | CC BY-SA 4.0 | `ocaml.org/manual/5.5/` | 37 فصلاً، 1158 صفحة | مرجع لا كتاب تدرّج |
| 500 Lines or Less | CC BY 3.0 | `raw.githubusercontent.com/aosabook/500lines/master/{ch}/{ch}.markdown` | 22 فصلاً، 470 صفحة | Markdown نظيف ⇒ أسرع استيراد |
| AOSA v1+v2 | CC BY 3.0 | LaTeX في `aosabook/aosabook` | 49 فصلاً، ~800 صفحة | دراسات حالة طويلة |
| Crypto 101 | CC BY-NC 4.0 | `github.com/crypto101/book` | 254 صفحة | الترخيص يدعو للترجمات |
| Open Workbook of Cryptology | CC BY-SA 4.0 | `poritz.net/.../owoc.tex` | 92 صفحة | مسودة أولى |
| Computer Networks (Sys. Approach) | CC BY 4.0 | `SystemsApproach/book` (RST) | 9 فصول، 920 صفحة | **المؤلفون يطلبون مناقشة الترجمات** |

### غير قابلة للترجمة + البديل
| الكتاب | سبب الحظر | البديل في المكتبة |
| --- | --- | --- |
| CS3110 (OCaml) | CC BY-NC-ND 4.0 | Learn Programming with OCaml |
| IntroTCS | CC BY-NC-ND + كتاب ناقص | Discrete Math + MCS |
| Dive into Systems | CC BY-NC-ND 4.0 | Missing Semester + Nand2Tetris + xv6 |
| Crafting Interpreters | نص CC BY-NC-ND (الشيفرة MIT) | Nand2Tetris II + 500 Lines |
| Game Programming Patterns | نص CC BY-NC-ND (الشيفرة MIT) | 500 Lines |
| OSTEP | «مجاني» بلا ترخيص، والمؤلفان يطلبان التواصل قبل أي إعادة استخدام | xv6 + Nand2Tetris II |
| Use The Index / PostgreSQL Internals / Database Foundations / Cryptopals | كل الحقوق محفوظة أو بلا ترخيص | DB Performance at Scale / Crypto 101 |
| Network Security | CC BY-NC-ND + «نرحب بمناقشة الترجمات» | Crypto 101 + Networks |

## 4. خط الاستيراد (لكل كتاب)

1. `scripts/import-<book>.mjs` يجلب النص الأصلي من مصدره الرسمي (commit مثبّت
   عند الإمكان) ويحفظه في `content-src/<book>/`.
2. سكربت الاستيراد ينشئ `content/<book>/<chapter>--<slug>.md` بـfront matter
   (`title`, `lang: en`) و`content/<book>-structure.json`.
3. `scripts/build-content.mjs` يولّد لكل كتاب: صفحات JSON، فهرس البحث، والتسلسل
   (السابق/التالي)، ويرفض البناء إذا كان أي قسم مفقوداً أو مرجع خاطئ.
4. ترجمة كل ملف: عربي كامل مع الحفاظ على الشيفرة والصور والروابط والمصطلحات.
5. `build-content.mjs` يطبع `not translated yet` لأي ملف ما زال `lang: en` ⇒
   مؤشر تقدّم مباشر.
6. بوابة الجودة: بناء نظيف، صفر 404، تطابق أسوار الشيفرة والصور مع الأصل.

## 5. قواعد الترجمة الملزمة

- لا ترجمة لما يلي: الأوامر، الشيفرة، المسارات، الروابط، أسماء الأدوات، مخرجات
  الطرفية. تُغلَّف بـ`backticks` داخل الجمل العربية.
- توحيد المصطلحات عبر كل الملفات، مع ذكر الأصل الإنجليزي عند أول ورود.
- الحفاظ على الشيفرة بايت-ببايت وتوازن أسوار الـcode fences.
- إسناد كامل: اسم المؤلف، العنوان الأصلي، الترخيص، ورابط المصدر في صفحة كل كتاب.
- كل ترجمة تمر على فحص آلي: `lang: ar`، توازن الأسوار، تطابق عدد كتل الشيفرة مع
  الأصل، وروابط داخلية محلّلة ⇒ صفر 404 في البناء.

## 6. إجراءات بشرية لا يمكن للأدوات تنفيذها

1. **مراسلة إدارة SystemsApproach** (`discuss@systemsapproach.org`) للموافقة على
   ترجمة «شبكات الحاسوب» — ترخيصها يسمح، لكن سياستهم طلب المناقشة.
2. **مراجعة بشرية** لكل دفعة ترجمة قبل النشر: عيّنة عشوائية للمصطلحات والروابط والصور.
3. المصادر التي بلا ترخيص أو ND تبقى في الطابور بقرار المستخدم، مع إبقاء إسناد
   المصدر الأصلي وإبراز قيود الترخيص في صفحة كل كتاب.

## 7. طابور التنفيذ (بالترتيب)

| # | المصدر | الطريقة | الحجم | الحالة |
| --- | --- | --- | --- | --- |
| 1 | AHA Stack (ahastack.dev) | كشط HTML | 25 صفحة | ✅ مترجم |
| 2 | 500 Lines or Less | Markdown على GitHub | 22 فصلاً | ✅ مترجم (23 فصلاً) |
| 3 | Database Design 2e | Pressbooks (عبر archive.org) | 16 فصلاً + 3 ملاحق | ✅ مترجم |
| 4 | Discrete Math (Levin) | PreTeXt + 306 SVG | 7 فصول | ✅ مترجم |
| 5 | SICP | HTML (38 صفحة) | 5 فصول | ✅ مترجم |
| 6 | Nand2Tetris I + II | صفحات المشاريع + PDF | 12 مشروعاً | ✅ مترجم (I و II) |
| 7 | xv6 | HTML + شيفرة C | 15 فصلاً | ✅ مترجم |
| 8 | Learn Programming with OCaml | PDF/EPUB | 13 فصلاً | في الطابور |
| 9 | Crypto 101 | Markdown | ~250 صفحة | ✅ مترجم |
| 10 | OSTEP | PDF لكل فصل | 45 فصلاً | في الطابور |
| 11 | Crafting Interpreters | HTML/Markdown | 30 فصلاً | ✅ مترجم |
| 12 | CS3110 (OCaml) | HTML | 10 فصول | ✅ مترجم |
| 13 | Game Programming Patterns | Markdown | 21 فصلاً | ✅ مترجم |
| 14 | Dive into Systems | HTML | ~20 قسماً | ✅ مترجم |
| 15 | IntroTCS | Markdown | 24 فصلاً | ✅ مترجم |
| 16 | MCS | PDF | 22 فصلاً | في الطابور |
| 17 | AOSA v1 + v2 | LaTeX | 49 فصلاً | ✅ مترجم |
| 18 | Computer Networks (Sys. Approach) | RST | 9 فصول | ينتظر موافقة المؤلفين |
| 19 | Network Security | RST | 9 فصول | ✅ مترجم |
| 20 | PostgreSQL Internals | HTML | 12 فصلاً | ✅ مترجم |
| 21 | Use The Index, Luke! | HTML | 54 صفحة | ✅ مترجم |
| 22 | Database Foundations (UCLL) | HTML | 24 وحدة | ✅ مترجم |
| 23 | Cryptopals | HTML | 66 تحدياً | ✅ مترجم |
| 24 | OCaml Manual 5.5 | HTML | 37 فصلاً | مرجع/اختياري |
| 25 | Open Data Structures | LaTeX | 14 فصلاً | ✅ مترجم |
| 26 | Open Workbook of Cryptology | LaTeX | 92 صفحة | في الطابور |
| 27 | DB Performance at Scale | PDF | 11 فصلاً | في الطابور |
| 28 | TanStack Router (دورة Ali Alaa على يوتيوب) | تفريغات التسميات التوضيحية (VTT) | 34 درساً | ✅ مترجم |
| 29 | TanStack Form (دورة Ali Alaa على يوتيوب) | تفريغات التسميات التوضيحية (VTT) | 21 درساً | ✅ مترجم |

### نمط التنفيذ لكل مصدر
1. `scripts/import-<book>.mjs` ← تنزيل المصدر الرسمي (مع إعادة محاولة وتفضيل IPv4).
2. تحويل HTML إلى Markdown (مع فصل كتل الشيفرة واحترام الأسطر) + تنزيل الصور محلياً
   وضغطها WebP بحد أقصى 1300px.
3. إعادة كتابة الروابط الداخلية لتطابق مسارات المكتبة .
4. `content/<book>-structure.json` + صفحات عربية `content/<book>/<chapter>--<slug>.md`.
5. ترجمة على دفعات متوازية (4-6 وكلاء لكل دفعة) مع قواعد موحّدة.
6. فحص آلي: `lang: ar`، توازن الأسوار، تطابق عدد كتل الشيفرة، الصور محلية، صفر 404.
7. `pnpm deploy` ثم تحقق من الروابط الحيّة.

## 8. خطة الترجمات المتبقية

المستويات مرتَّبة بالجاهزية: كل مستوى ما لم يكتمل لا يُفتح الذي يليه. الحجم
مقاس بالصفحات الفعلية والبايتات، لا بالتخمين.

### القفل 1 — MOOC (قيد التنفيذ الآن · 89 صفحة · 880KB)

| البند | القيمة |
| --- | --- |
| المصدر | `content-src/mooc/` (89 ملفاً إنجليزياً — المصدر الوحيد؛ النسخة الأصلية حُذفت) |
| العقدة | `docs/mooc-translation.md` |
| الفاحص | `node scripts/check-mooc.mjs` (أو `pnpm check:mooc`) — أسوار الشيفرة، هوية جسم الشيفرة، الروابط، نسبة العربية، أطول تسلسل لاتيني، العناصر غير المُصيَّرة، **والأسطر الإنجليزية الباقية** |
| القفل | `scripts/build-mooc.mjs` يُخرج 1 ويعمل سقوطاً `lang: en` لصفحة ناقصة/صحيحة الصفحة |

الطريقة: دفعات ≤ 40K حرف، ترتيبها حسب الفصل لتوحيد المصطلحات، وبحد أقصى **3 وكلاء
متزامنين** (11 وكلاء دفعةً واحدة ماتوا جميعاً بسبب حد المعدّل وأسقطوا عملهم).
كل وكلاء يعيد قراءة الملف من القرص ويُعيد التحقق بعد الكتابة، لأن كتابة بعضهم
نُفِي دفعةً سابقة دون أن يشعر أحد.

### القفل 2 — Kinney (864 صفحة · 16 دورة) — ✅ مكتمل

| البند | القيمة |
| --- | --- |
| المصدر | `content-src/kinney/` — 864 ملفاً إنجليزياً |
| خط الإنتاج | `scripts/import-kinney.mjs` + `scripts/build-kinney.mjs` |
| نموذج التخزين | **على مستوى الصفحة**: `content-src/kinney-translations/<key>.md` يقابل كل ملف مصدر بالاسم نفسه، والبناء يولّد `lang: ar` فقط عندما تكتمل ترجمة الصفحة |
| العقدة | `docs/kinney-translation.md` |
| الفاحص | `node scripts/check-kinney.mjs` (أو `pnpm check:kinney`) — الأسوار وهويتها، الروابط، نسبة العربية، وأي سطر إنجليزي باقٍ |
| الإذن | إذن كتابي من ستيف كيني (CC BY-NC-SA 4.0) — غير رسمي وغير تجاري |
| الحالة | `translated` — 864 صفحة عربية، 0 معلّقة، 0 فاشلة |

النتيجة النهائية: `node scripts/build-kinney.mjs` يطبع
`kinney: 864 pages (864 Arabic, 0 English)`، و`node scripts/check-kinney.mjs`
يطبع `864 page(s): 864 pass, 0 pending, 0 invalid`.

### القفل 3 — MCS: الرياضيات لعلوم الحاسوب (22 صفحة)

- الاستيراد جاهز: `scripts/import-mcs.mjs` من `content-src/mcs/mcs.pdf`، وقد
  أنتج 22 صفحة في `content/mathematics-for-cs/` كلها `lang: en`.
- الحجم صغير، لذلك يُنفَّذ بعقدة مصغّرة على غرار MOOC ثم ترجمة الدفعة الواحدة.
- الحالة `planned` بصدق الآن. («1048 صفحة» في `library.json` عدّ صفحات الـPDF
  لا وحدات الترجمة؛ الوحدات الفعلية هي 22 ملفاً.)

### القفل 4 — خمسة مصادر بلا خط استيراد بعد

لا تبدأ ترجمتها قبل بناء `scripts/import-<book>.mjs`:

| المصدر | الحجم | المصدر الخام | سلف الحجز قبل الترجمة |
| --- | --- | --- | --- |
| `networks-systems-approach` | 920 | RST في `SystemsApproach/book` | **بشرية**: مراسلة `discuss@systemsapproach.org` — ترخيصها CC BY 4.0 لكن سياسة المؤلفين تطلب مناقشة الترجمة |
| `ocaml-manual` | 1158 | HTML على `ocaml.org/manual/5.5/` | مرجع تدريجي؛ يحتاج قراراً بحجم التغطية قبل البدء |
| `ostep` | 714 | PDF لكل فصل | **قرار ترخيص**: الكتاب «مجاني» بلا ترخيص صريح والمؤلفان يطلبان التواصل قبل أي إعادة استخدام — يلزم تثبيت الحالة في `library.json` (`planned` مقابل `reference`) قبل أي عمل |
| `db-performance-at-scale` | 270 | PDF أولي من Springer | CC BY 4.0 — مسالك الـPDF (استخراج صفحات) كما في MCS |
| `open-workbook-cryptology` | 92 | LaTeX في `poritz.net/.../owoc.tex` | CC BY-SA 4.0، مسودة أولى |

### بوابة القبول المشتركة لكل مستوى

لا يُعلَّن مستوى كـ«مكتمل» قبل مرور كلها:

1. `node scripts/check-<book>.mjs` (أو ما يكافئه) يُخرج 0 دون `PENDING`.
2. `node scripts/build-content.mjs` يُخرج 0 — أي أن كل صفحة كل كتاب مصنَّف
   `translated` هي عربية فعلاً.
3. `pnpm audit:content` · `pnpm test:content` · `pnpm test:import` كلّها تمر.
4. إعادة بناء `build/` ثم `pnpm check:links` = 0 غير محلَّل.
5. استعادة تسجيل الكتاب في `content/library.json` + فهرس صفحاته بعد اكتماله
   (MOOC مُزال مؤقتاً حتى يكتمل، فلا شيء من الإنجليزي يُنشر بين الفينة والأخرى).
