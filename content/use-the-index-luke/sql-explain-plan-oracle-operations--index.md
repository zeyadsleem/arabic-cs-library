---
title: "العمليات"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/oracle/operations
---

موردي الشخصي المفضل لعمليات خطة التنفيذ هو [قائمة Julian Dyke](http://www.juliandyke.com/Optimisation/Operations/Operations.php) — غير أنها من وجهة نظر مختلفة.

## الوصول إلى الفهرس والجدول

INDEX UNIQUE SCANتنفّذ `INDEX UNIQUE SCAN` اجتياز شجرة B فحسب. وتستخدم قاعدة البيانات هذه العملية إذا ضمن قيد فريد أن معايير البحث لن تطابق أكثر من مدخل واحد. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

INDEX RANGE SCAN

تنفّذ `INDEX RANGE SCAN` اجتياز شجرة B *و* تتبع سلسلة العقد الورقية للعثور على جميع المدخلات المطابقة. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

وما يسمى مُسندات ترشيح الفهرس كثيراً ما يسبّب مشكلات أداء لعملية `INDEX RANGE SCAN`. ويشرح [القسم التالي](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index) كيفية تحديدها.

INDEX FULL SCAN

تقرأ الفهرس بأكمله — جميع الصفوف — بترتيب الفهرس. وتبعاً لإحصاءات نظام متنوعة، قد تنفّذ قاعدة البيانات هذه العملية إذا احتاجت جميع الصفوف بترتيب الفهرس — مثلاً بسبب جملة `order by` مقابلة. وقد يستخدم المُحسِّن بدلاً من ذلك `INDEX FAST FULL SCAN` وينفّذ عملية فرز إضافية. انظر [الفصل 6، «*الترتيب والتجميع*»](/book/use-the-index-luke/sql-sorting-grouping/index).

INDEX FAST FULL SCAN

تقرأ الفهرس بأكمله — جميع الصفوف — كما هو مخزّن على القرص. وتُنفَّذ هذه العملية عادةً بدلاً من المسح الكامل للجدول إذا كانت جميع الأعمدة المطلوبة متاحة في الفهرس. وعلى غرار `TABLE ACCESS FULL`، تستفيد `INDEX FAST FULL SCAN` من عمليات القراءة متعددة الكتل. انظر [الفصل 5، «*تجميع البيانات: القوة الثانية للفهرسة*»](/book/use-the-index-luke/sql-clustering/index).

TABLE ACCESS BY INDEX ROWID

تسترجع صفاً من الجدول باستخدام `ROWID` المسترجع من بحث الفهرس السابق. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

TABLE ACCESS FULL

وتُعرف أيضاً بالمسح الكامل للجدول. تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. ومع أن عمليات القراءة متعددة الكتل تحسّن سرعة المسح الكامل تحسناً كبيراً، فهو لا يزال من أغلى العمليات. فإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن يفحص المسح الكامل جميع صفوف الجدول، لذا قد يستهلك أيضاً قدراً كبيراً من وقت المعالج. انظر أيضاً [«*المسح الكامل للجدول*»](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-ora-op&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## عمليات الربط

تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».

NESTED LOOPS JOINتربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. انظر أيضاً [«*الحلقات المتداخلة*»](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index).

HASH JOIN

يحمّل الربط بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة، ثم يُفحص مقابل كل صف من الطرف الآخر للربط. انظر أيضاً [«*الربط بالتجزئة*»](/book/use-the-index-luke/sql-join-hash-join-partial-objects/index).

MERGE JOIN

يجمع ربط الدمج قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً [«*دمج الترتيب*»](/book/use-the-index-luke/sql-join-sort-merge-join/index).

## الترتيب والتجميع

SORT ORDER BYترتّب النتيجة وفق جملة `order by`. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً [«*فهرسة Order By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index).

SORT ORDER BY STOPKEY

ترتّب مجموعة فرعية من النتيجة وفق جملة `order by`. وتُستخدم لاستعلامات Top-N إذا لم يكن التنفيذ المتدفق ممكناً. انظر أيضاً [«*الاستعلام عن صفوف Top-N*»](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).

SORT GROUP BY

ترتّب مجموعة النتائج على أعمدة `group by` وتجمّع النتيجة المرتَّبة في خطوة ثانية. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد مجموعة النتائج الوسيطة (غير متدفقة). انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

SORT GROUP BY NOSORT

تجمّع مجموعة مرتَّبة مسبقاً وفق جملة `group by`. ولا تخزّن هذه العملية النتيجة الوسيطة مؤقتاً؛ بل تُنفَّذ على نحو متدفق. انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

HASH GROUP BY

تجمّع النتيجة باستخدام جدول تجزئة. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد مجموعة النتائج الوسيطة (غير متدفقة). والخرج غير مرتَّب بأي طريقة ذات معنى. انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

## استعلامات Top-N

تتوقف كفاءة استعلامات Top-N على نمط تنفيذ العمليات الأساسية. وهي غير فعّالة أبداً عند إيقاف عمليات غير متدفقة مثل `SORT ORDER BY`.

COUNT STOPKEYتوقف العمليات الأساسية عند جلب عدد الصفوف المطلوب. انظر أيضاً [*الاستعلام عن صفوف Top-N*](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).

WINDOW NOSORT STOPKEY

تستخدم دالة نافذة (جملة `over`) لإيقاف التنفيذ عند جلب عدد الصفوف المطلوب. انظر أيضاً [«*استخدام دوال النوافذ لترقيم فعّال*»](/book/use-the-index-luke/sql-partial-results-window-functions/index).
