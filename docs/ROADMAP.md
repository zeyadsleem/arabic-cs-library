# خطة التنفيذ الكاملة — المكتبة العربية لعلوم الحاسوب

هذا المستند هو خطة العمل الكاملة: ترتيب التعلّم، وحالة كل مصدر بعد التحقق من
الترخيص، وخطوات الاستيراد والترجمة، وبوابات الجودة، وطابور التنفيذ. كل رقم فيه
مصدره.

## 0. الحالة الحالية (آخر تحديث)

مترجم بالكامل داخل المكتبة: **8 كتب / 268 صفحة**
`Hello Algo` (117) · `patterns.dev` (53) · `500 Lines` (23) · `Database Design` (19) · `Missing Semester` (13) ·
`Eloquent JavaScript` (22) · `Full Stack open` (68) · `Go by Example` (84 مثالاً) ·
`Learn Go with Tests` · `Go 101` (136 مقالاً).

في طابور الترجمة: **28 مصدراً** بالترتيب المذكور في القسم 7. المصادر التي يمنع
ترخيصها إعادة الترجمة (ND أو بلا ترخيص) أُدرجت في الطابور بمبادرة المستخدم مع
إبقاء اسمها وحالتها ورابط مصدرها الأصلي في صفحتها.

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
| ① | التأسيس | SICP · Hello Algo (✅) | — |
| ② | أدوات المبرمج | Missing Semester (✅ 13 محاضرة) | — |
| ③ | الرياضيات | Discrete Math (Levin) · MCS · ~~IntroTCS~~ محجوب | — |
| ④ | بنى البيانات | Open Data Structures | — |
| ⑤ | الأنظمة | Nand2Tetris I · Nand2Tetris II · xv6 · OSTEP (مرجع) · ~~Dive into Systems~~ محجوب | — |
| ⑥ | مسار Go | Go by Example (✅) · Learn Go with Tests (✅) · Go 101 (✅) | — |
| ⑦ | JavaScript | Eloquent JavaScript (✅) | — |
| ⑧ | تطوير الويب | Full Stack open (✅) | Eloquent JS |
| ⑨ | الشبكات | Computer Networks (بانتظار موافقة المؤلفين) | Nand2Tetris I |
| ⑩ | قواعد البيانات | DB Design · DB Performance at Scale · ~~Database Foundations~~ مرجع · ~~PostgreSQL Internals~~ مرجع · ~~Use The Index~~ مرجع | — |
| ⑪ | اللغات | Learn Programming with OCaml · OCaml Manual · ~~CS3110~~ مرجع · ~~Crafting Interpreters~~ محجوب | — |
| ⑫ | معمارية البرمجيات | 500 Lines · AOSA · ~~Game Programming Patterns~~ محجوب | — |
| ⑬ | الأمن | Crypto 101 · Open Workbook of Cryptology · ~~Network Security~~ مرجع · ~~Cryptopals~~ مرجع | — |

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
| 1 | AHA Stack (ahastack.dev) | كشط HTML | 25 صفحة | في الطابور |
| 2 | 500 Lines or Less | Markdown على GitHub | 22 فصلاً | ✅ مترجم (23 فصلاً) |
| 3 | Database Design 2e | Pressbooks (عبر archive.org) | 16 فصلاً + 3 ملاحق | ✅ مترجم |
| 4 | Discrete Math (Levin) | PreTeXt + 306 SVG | 7 فصول | في الطابور |
| 5 | SICP | HTML (38 صفحة) | 5 فصول | في الطابور |
| 6 | Nand2Tetris I + II | صفحات المشاريع + PDF | 12 مشروعاً | في الطابور |
| 7 | xv6 | HTML + شيفرة C | 9 فصول | في الطابور |
| 8 | Learn Programming with OCaml | PDF/EPUB | 13 فصلاً | في الطابور |
| 9 | Crypto 101 | Markdown | ~250 صفحة | في الطابور |
| 10 | OSTEP | PDF لكل فصل | 45 فصلاً | في الطابور |
| 11 | Crafting Interpreters | HTML/Markdown | 30 فصلاً | في الطابور |
| 12 | CS3110 (OCaml) | HTML | 10 فصول | في الطابور |
| 13 | Game Programming Patterns | Markdown | 21 فصلاً | في الطابور |
| 14 | Dive into Systems | HTML | ~20 قسماً | في الطابور |
| 15 | IntroTCS | Markdown | 24 فصلاً | في الطابور |
| 16 | MCS | PDF | 22 فصلاً | في الطابور |
| 17 | AOSA v1 + v2 | LaTeX | 49 فصلاً | في الطابور |
| 18 | Computer Networks (Sys. Approach) | RST | 9 فصول | ينتظر موافقة المؤلفين |
| 19 | Network Security | RST | 9 فصول | في الطابور |
| 20 | PostgreSQL Internals | HTML | 12 فصلاً | في الطابور |
| 21 | Use The Index, Luke! | HTML | 54 صفحة | في الطابور |
| 22 | Database Foundations (UCLL) | HTML | 24 وحدة | في الطابور |
| 23 | Cryptopals | HTML | 66 تحدياً | في الطابور |
| 24 | OCaml Manual 5.5 | HTML | 37 فصلاً | مرجع/اختياري |
| 25 | Open Data Structures | LaTeX | 14 فصلاً | في الطابور |
| 26 | Open Workbook of Cryptology | LaTeX | 92 صفحة | في الطابور |
| 27 | DB Performance at Scale | PDF | 11 فصلاً | في الطابور |

### نمط التنفيذ لكل مصدر
1. `scripts/import-<book>.mjs` ← تنزيل المصدر الرسمي (مع إعادة محاولة وتفضيل IPv4).
2. تحويل HTML إلى Markdown (مع فصل كتل الشيفرة واحترام الأسطر) + تنزيل الصور محلياً
   وضغطها WebP بحد أقصى 1300px.
3. إعادة كتابة الروابط الداخلية لتطابق مسارات المكتبة .
4. `content/<book>-structure.json` + صفحات عربية `content/<book>/<chapter>--<slug>.md`.
5. ترجمة على دفعات متوازية (4-6 وكلاء لكل دفعة) مع قواعد موحّدة.
6. فحص آلي: `lang: ar`، توازن الأسوار، تطابق عدد كتل الشيفرة، الصور محلية، صفر 404.
7. `pnpm deploy` ثم تحقق من الروابط الحيّة.
