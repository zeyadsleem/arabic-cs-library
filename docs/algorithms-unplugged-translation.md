# ترجمة «الخوارزميات بدون حاسوب» (Algorithms Unplugged)

هذا الملف هو المرجع الملزِم لعمل ترجمة كتاب *Algorithms Unplugged* الصادر عن Springer، وهو يُستخدم أيضًا سجلًّا للتقدّم عبر الجلسات.

## حالة الترخيص والإذن

- الكتاب أصلي محفوظ الحقوق: © Springer-Verlag Berlin Heidelberg 2011. جميع الحقوق محفوظة، ومنها حقوق الترجمة، ولا ينشره الناشر بترخيص مفتوح.
- الترجمة العربية هنا غير رسمية وغير تجارية، وتجري **بإذن صريح من الناشر (إذن مؤكَّد من المستخدم)**. لا يجوز تعديل هذا الوصف ولا إضافة أي ترخيص مفتوح.
- حقوق جميع الأشكال والصور من الكتاب الأصلي محفوظة للناشر، وتُعاد هنا كما هي مع تعليقات عربية.

## مواقع الملفات

- الملف الأصلي: `content-src/algorithms-unplugged/Algorithms Unplugged.pdf` (يُترك دون تتبّع git مثل بقية ملفات PDF في المستودع).
- نصوص المصدر المقطّعة (إنجليزية): `/tmp/opencode/alunplugged/src/<key>.en.txt` — تُولَّد بـ `python3 /tmp/opencode/alunplugged/slice.py` من `/tmp/opencode/alunplugged/full.txt` (مستخرج بـ `pdftotext -layout`).
- المحتوى العربي: `content/algorithms-unplugged/<key>--index.md` (جميع الفصول أحادية القسم).
- البنية: `content/algorithms-unplugged-structure.json`.
- الصور: `static/images/algorithms-unplugged/` وتُشار إليها بـ `![](/images/algorithms-unplugged/<file>)`.

## قواعد ثابتة (لا تُخترق)

1. لا تُعدَّل ملفات خارج المسارات المذكورة أعلاه، ولا ملفات ذات صلة بمشاريع أخرى غير مكتملة في المستودع.
2. لا تُنشأ أي commits أو عمليات git إلا بطلب صريح من المستخدم.
3. تبقى حالة الكتاب في `content/library.json` قيمتها `planned` حتى تكتمل جميع الفصول الـ 48، ثم تُقلب إلى `translated` مع تحديث `README.md` عندها فقط.
4. الأرقام غربية (1, 2, 3...)، والأسماء والأكواد والعناوين اللاتينية والوحدات تبقى بالإنجليزية.
5. داخل كتل الشيفرة والكود الزائف: يُترجم فقط التعليق (`//`) إلى العربية، وتبقى الكلمات المفتاحية والمعرّفات والأرقام كما هي حرفيًّا.
6. لا صور مُختلقة ولا أرقام أشكال مُختلقة: الأشكال الأصلية فقط، وتعليقاتها تُترجم، والشكل بلا تعليق أصلي يُشار إليه في النص بـ«الشكل أدناه» دون تعليق مُضاف.
7. لا علامات إيموجي، ولا LaTeX؛ الرياضيات بترميز يونيكود للأسس (2ᵏ، log₂) وعند الحاجة `log_b a`.
8. المصطلح الأجنبي يُذكر أول مرة بالصيغة «عربي (English)» ثم يُستعمل العربي وحده.

## مسرد المصطلحات

| English | العربية |
| --- | --- |
| sequential search / linear search | البحث التسلسلي / البحث الخطي |
| binary search | البحث الثنائي |
| bisection | التنصيف |
| array | مصفوفة |
| recursion | التعاود |
| recursion step | خطوة تعاود |
| base case | الحالة القاعدية |
| base 2 logarithm | اللوغاريتم للأساس 2 |
| insertion sort | الترتيب بالإدراج |
| mergesort | الترتيب بالدمج |
| quicksort | الترتيب السريع |
| bubble sort | الترتيب بالفقاعة (خوارزمية الفقاعة) |
| divide-and-conquer | فرق تسد |
| pivot | المحور |
| runtime / runtime analysis | زمن التشغيل / تحليل زمن التشغيل |
| comparison | مقارنة |
| comparator | المقارن |
| circuit | الدائرة |
| network | الشبكة |
| parallel steps | خطوات متوازية |
| bitonic sequence | متتالية بيتونية |
| Bitonic Merger | دامج البيتوني |
| Bitonic Sorter | المرتِّب البيتوني |
| 0-1 principle | مبدأ 0-1 |
| conditional exchange | التبادل الشرطي |
| topological sorting | الترتيب الطوبولوجي |
| depth-first search | البحث بالعمق أولًا |
| graph | رسم بياني |
| vertex | رأس |
| edge | ضلع |
| path | مسار |
| cycle | حلقة / دورة |
| heap | كومة |
| hashing | التجزئة |
| hash table | جدول تجزئة |
| fingerprinting | البصمات |
| one-way function | دالة أحادية الاتجاه |
| one-time pad | لوح المرة الواحدة |
| public key | مفتاح عام |
| private key | مفتاح خاص |
| secret sharing | تشارك الأسرار |
| randomized algorithm | خوارزمية عشوائية |
| shortest paths | أقصر المسارات |
| minimum spanning tree | شجرة الامتداد الدنيا |
| maximum flow | التدفق الأقصى / التدفقات العظمى |
| bin packing | التعبئة في الصناديق |
| knapsack problem | مسألة حقيبة الظهر |
| travelling salesman problem | مسألة البائع المتجول |
| simulated annealing | التلدين المحاكى |
| online algorithms | الخوارزميات الفورية |
| greedy | جشع |

## سجل التقدّم

| المقطع | الحالة |
| --- | --- |
| frontmatter | ✅ مترجم |
| preface | ✅ مترجم |
| part1 + ch01 + ch02 | ✅ مترجم (مع استخراج أشكال الفصلين 1–2) |
| ch03 | ✅ مترجم (مع استخراج 4 أشكال) |
| ch04 | ✅ مترجم (مع استخراج 10 أشكال + تصحيح مطبوعين واضحين) |
| ch05 | ✅ مترجم |
| ch06–ch10 | ⏳ لم يبدأ |
| part2 + ch11–ch21 | ⏳ لم يبدأ |
| part3 + ch22–ch31 | ⏳ لم يبدأ |
| part4 + ch32–ch41 | ⏳ لم يبدأ |
| backmatter | ⏳ لم يبدأ |
