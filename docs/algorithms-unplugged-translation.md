# ترجمة «الخوارزميات بدون حاسوب» (Algorithms Unplugged)

هذا الملف هو المرجع الملزِم لعمل ترجمة كتاب *Algorithms Unplugged* الصادر عن Springer، وهو يُستخدم أيضًا سجلًّا للتقدّم عبر الجلسات.

## حالة الترخيص والإذن

- الكتاب أصلي محفوظ الحقوق: © Springer-Verlag Berlin Heidelberg 2011. جميع الحقوق محفوظة، ومنها حقوق الترجمة، ولا ينشره الناشر بترخيص مفتوح.
- الترجمة العربية هنا غير رسمية وغير تجارية، وتجري **بإذن صريح من الناشر (إذن مؤكَّد من المستخدم)**. لا يجوز تعديل هذا الوصف ولا إضافة أي ترخيص مفتوح.
- حقوق جميع الأشكال والصور من الكتاب الأصلي محفوظة للناشر، وتُعاد هنا كما هي مع تعليقات عربية.

## مواقع الملفات

- الملف الأصلي: `content-src/algorithms-unplugged/Algorithms Unplugged.pdf` (يُترك دون تتبّع git مثل بقية ملفات PDF في المستودع).
- نصوص المصدر المقطّعة (إنجليزية): `content-src/algorithms-unplugged/src/<key>.en.txt` — تُولَّد بـ `python3 content-src/algorithms-unplugged/slice.py` من `full.txt` (مستخرج بـ `pdftotext -layout`). ولأن `/tmp` يُمحى عند إعادة تشغيل الخادم، تعيش الأدوات الدائمة كلها في هذا المسار: `check-chapter.mjs` للفحص الآلي للفصول، و`TRANSLATOR-CONTRACT.md` عقد المترجمين الفرعيين، و`figs/<key>/` مساحات عمل استخراج الأشكال.
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
| breadth-first search | البحث بالعرض أولًا |
| queue | الطابور |
| stack | المكدس |
| junction | مفترق |
| dead end | نهاية مسدودة |
| maze | متاهة |
| bipartite | ثنائي الأجزاء |
| coloring | التلوين |
| connected component | مكوّن متصل |
| strongly connected component | مكوّن متصل بقوة |
| deadlock | حالة الجمود |
| pillar | عمود |
| obstacle | عائق |
| wall | جدار |
| crossing | تقاطع |
| clockwise | اتجاه عقارب الساعة |
| closed room | غرفة مغلقة |
| right angle | زاوية قائمة |
| one-way street | طريق باتجاه واحد |
| applet | تطبيق Java |
| angle counter | عداد الزوايا |
| string matching | مطابقة النصوص |
| string matching problem | مسألة مطابقة النصوص |
| symbol | الرمز |
| substring | النصّ الفرعي |
| shift | إزاحة |
| key | مفتاح |
| table/array D | الجدول/المصفوفة D |
| cryptography | التشفير |
| decryption | فك التشفير |
| symmetric | متماثل |
| asymmetric | غير متماثل |
| coding | الترميز |
| network coding | ترميز الشبكات |
| grade-school method | طريقة المدرسة الابتدائية |
| multidigit numbers | أعداد متعددة الخانات |
| multiplicand | المضروب |
| multiplier | المضروب فيه |
| greatest common divisor | القاسم المشترك الأكبر |
| prime numbers | الأعداد الأولية |
| Euclidean Algorithm | الخوارزمية الإقليدية |
| Sieve of Eratosthenes | غربال إراتوستينس |
| number theory | نظرية الأعداد |
| factorize | التحليل إلى عوامل |
| computational power | القوة الحاسوبية |
| short multiplication | الضرب القصير |
| long multiplication | الضرب الطويل |
| basic operation | عملية أساسية |
| carry digit | رقم الحمل |
| intermediate result / intermediate sum | نتيجة وسيطة / مجموع وسيط |
| auxiliary product | ناتج مساعد |
| padding (with zeros) | الحشو (بالأصفار) |
| power of two | قوة للعدد 2 |
| asymptotically | من حيث السلوك المقارب |
| computer algebra | الجبر الحاسوبي |
| polynomial | كثيرة الحدود |
| fingerprint | بصمة |
| modular arithmetic | الحساب المعياري |
| ASCII code | شيفرة ASCII |
| byte | بايت |
| data compression | ضغط البيانات |
| rational polynomial | كثيرة حدود نسبية |
| root (of a polynomial) | جذر |
| substitution | إبدال |
| coefficient | معامل |
| protocol | بروتوكول |
| probability | احتمال |
| random number generator | مولّد الأعداد العشوائية |
| encyclopedia | موسوعة |
| Fast Fourier Transformation | تحويل فورييه السريع |
| search engine | محرك البحث |
| query | استعلام |
| hits | نتائج |
| hyperlink | رابط فائق |
| World-Wide Web | الشبكة العنكبوتية العالمية |
| random walk | تجوال عشوائي |
| random surfer | المتصفّح العشوائي |
| uniform at random |باحتمال منتظم |
| visiting numbers | أعداد الزيارات |
| relevance | الصلة |
| relevance score | درجة الصلة |
| network analysis | تحليل الشبكات |
| heuristic | قاعدة استكشافية |
| referral network | شبكة الإحالات |
| link traversal | اتباع الروابط |
| strategic thinking | التفكير الاستراتيجي |
| planning | التخطيط |
| deterministic (strategy) | حتمي |
| probabilistic algorithm | خوارزمية احتمالية |
| rock–paper–scissors | مقص وورقة وحجرة |
| Nim (game) | النيم |
| simulation | المحاكاة |
| constraint | قيد |
| mutation | طفرة |
| genetic information | المعلومات الوراثية |
| common ancestor | سلف مشترك |
| computer graphics | الرسوميات الحاسوبية |
| pixel | بكسل |
| game schedule | جدول المباريات |
| Bundesliga | الدوري الألماني |
| natural speech | النطق الطبيعي للكلام |
| optimization problem | مسألة تحسين |
| shortest path | أقصر مسار |
| network flow problem | مسألة تدفّق الشبكة |
| approximation algorithm | خوارزمية تقريب |
| online problem | مسألة فورية |
| simulated annealing | التلدين المحاكى |
| dating service | خدمة التعارف |
| fire brigade | فرقة الإطفاء |
| traffic jam | اختناق مروري |
| bridge | جسر |
| island | جزيرة |
| round trip | جولة دائرية |
| lane | مسار طريق |
| smallest enclosing circle | أصغر دائرة محيطة |
| enclosing ball | كرة محيطة |
| sortition (lottery) | قرعة |
| urn | إناء القرعة |
| radius | نصف قطر |
| plane | مستوٍ |
| distance | مسافة |
| point set | مجموعة نقاط |
| subset | مجموعة جزئية |
| expected number of rounds | العدد المتوقَّع للجولات |
| logarithmic | لوغاريتمي |
| dimension | بُعد |
| fire service | خدمة الإطفاء |
| fire station | محطة إطفاء |
| hash function | دالة التجزئة |
| hash value | قيمة التجزئة |
| message digest | بصمة الرسالة |
| collision | تصادم |
| bit | بت |
| bit sequence | متتالية بتات |
| linear probing | الاستطلاع الخطي |
| perfect hash function | دالة التجزئة التامة |
| quadratic probing | الاستطلاع التربيعي |
| double hashing | التجزئة المزدوجة |
| modulo-m function | دالة الباقي عند القسمة على m |
| data item | عنصر بيانات |
| storage | مخزن |
| dictionary | قاموس (جدول مفاتيح) |
| remainder | الباقي |
| division with remainder | القسمة ذات الباقي |
| terminate | يتوقف |
| coprime | متعامدان |
| Fibonacci sequence | متتالية فيبوناتشي |
| digit | خانة |
| googol | غوغول |
| matchstick | عود ثقاب |
| matchstick game | لعبة أعواد الثقاب |
| winning strategy | استراتيجية فوز |
| binary representation | التمثيل الثنائي |
| pseudo-polynomial time | زمن شبه كثير الحدود |
| geometric series | متتالية هندسية |
| majority element | العنصر الأكثري |
| absolute majority | الأغلبية المطلقة |
| tally mark | علامة عدّ |
| ballot paper | ورقة التصويت |
| class rep | ممثل الصف |
| comparison | مقارنة |
| frequent element | العنصر المتكرّر |
| data protection | حماية البيانات |
| data packet | حزمة بيانات |
| processor | معالج |
| DNA sequence | متتالية DNA |
| base (nucleotide) | قاعدة |
| amino acid | حمض أميني |
| deletion | حذف |
| substitution | استبدال |
| cost | تكلفة |
| evolutionary distance | المسافة التطورية |
| prefix | بادئة |
| genotype | النمط الجيني |
| dynamic programming | البرمجة الديناميكية |
| subsolution | حلّ جزئي |
| spellchecking | التدقيق الإملائي |
| minimum cost | أقل تكلفة |
| prime number table | جدول الأعداد الأولية |
| step function | دالة درجات |
| proposition | مبرهنة |
| sieve | غربال |
| proper multiple | مضاعف فعلي |
| non-prime | عدد غير أولي |
| prime divisor | قاسم أولي |
| floor rounding | التقريب إلى أسفل |
| bit array | مصفوفة بتات |
| linked list | قائمة مترابطة |
| twin prime | العدد الأولي التوأم |
| factorization problem | مسألة التحليل إلى عوامل |
| i-loop / k-loop | حلقة i وحلقة k |

## سجل التقدّم

| المقطع | الحالة |
| --- | --- |
| frontmatter | ✅ مترجم |
| preface | ✅ مترجم |
| part1 + ch01 + ch02 | ✅ مترجم (مع استخراج أشكال الفصلين 1–2) |
| ch03 | ✅ مترجم (مع استخراج 4 أشكال) |
| ch04 | ✅ مترجم (مع استخراج 10 أشكال + تصحيح مطبوعين واضحين) |
| ch05 | ✅ مترجم |
| ch06 | ✅ مترجم (مع استخراج 7 أشكال بلا أرقام + إصلاحات ≠/{) |
| ch07 | ✅ مترجم (مع استخراج 6 أشكال؛ والأشكال 7.2/7.3/7.7 مقاطع شيفرة أُدرجت كتلًا نصية بوسم الشكل) |
| ch08 | ✅ مترجم (مع استخراج 9 أشكال + تصحيح أوسمة z′) |
| ch09 | ✅ مترجم (مع استخراج 9 أشكال: الشكل 9.1 و8 بلا أرقام) |
| ch10 | ✅ مترجم (مع استخراج 4 أشكال بلا أرقام؛ الإجابة في الأصل مطبوعة بالمقلوب) |
| part2 (نظرة الجزء الثاني) | ✅ مترجم |
| ch11 | ✅ مترجم (لا أشكال؛ تصحيحات مطبوعة: حمل u، «ضرب طويل» موضع «قسمة طويلة»، 3⁹=19,683) |
| ch12 | ✅ مترجم (4 أشكال مرقّمة: 12.1–12.4) |
| ch13 | ✅ مترجم (12 شكلًا: الشكل 13.1 و11 بلا أرقام) |
| ch14–ch18 | ✅ مترجم (ch17 وch18 أُضيفا) |
| ch19 | ✅ مترجم (شكلان بلا أرقام: صينية البصمة وعجلة الحظ) |
| ch20 | ✅ مترجم (9 أشكال بلا أرقام؛ تصحيح مطبوع SHA 284→384) |
| ch21 | ✅ مترجم |
| part3 (نظرة الجزء الثالث) | ✅ مترجم |
| ch22، ch25، ch27–ch30 | ✅ مترجم |
| ch24 | ✅ مترجم (شكل واحد بلا أرقام: ورقة علامات العدّ) |
| ch23 | ✅ مترجم (لا أشكال) |
| ch26 | ✅ مترجم (شكل واحد بلا أرقام: جدول جولة اللعب) |
| ch31 | ✅ مترجم (شكل واحد مرقّم: الشكل 31.1) |
| part4 (نظرة الجزء الرابع) | ✅ مترجم |
| ch32–ch35، ch37–ch41 | ✅ مترجم |
| ch36 | ✅ مترجم (لا أشكال؛ 2^(k/3) ≈ 1.26^k) |
| backmatter | ✅ مترجم (66 مؤلفًا) |
