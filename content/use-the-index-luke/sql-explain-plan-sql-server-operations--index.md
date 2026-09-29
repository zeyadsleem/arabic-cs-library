---
title: "العمليات"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/sql-server/operations
---

يشرح هذا القسم أشهر عمليات خطة التنفيذ في قاعدة بيانات SQL Server من Microsoft. ويمكنك أيضاً الاطلاع على [وثائق Microsoft](https://learn.microsoft.com/en-us/sql/relational-databases/showplan-logical-and-physical-operators-reference).

## الوصول إلى الفهرس والجدول

لمصطلحات SQL Server بساطة: عمليات «Scan» تقرأ الفهرس أو الجدول بأكمله، بينما تستخدم عمليات «Seek» شجرة B أو عنواناً فيزيائياً (`RID`، مثل `ROWID` في Oracle) للوصول إلى جزء محدد من الفهرس أو الجدول.

Index Seek, Clustered Index Seek

تنفّذ `Index Seek` اجتياز شجرة B *و* تمشي عبر العقد الورقية للعثور على جميع المدخلات المطابقة. انظر أيضاً [«*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

Index Scan, Clustered Index Scan

تقرأ الفهرس بأكمله — جميع الصفوف — بترتيب الفهرس. وتبعاً لإحصاءات نظام متنوعة، قد تنفّذ قاعدة البيانات هذه العملية إذا احتاجت جميع الصفوف بترتيب الفهرس — مثلاً بسبب جملة `order by` مقابلة.

Key Lookup (Clustered)

تسترجع صفاً واحداً من فهرس عنقودي. وهي شبيهة بـ`INDEX UNIQUE SCAN` في Oracle بالنسبة لجدول منظَّم بالفهرس (IOT). انظر أيضاً [«*تجميع البيانات: القوة الثانية للفهرسة*»](/book/use-the-index-luke/sql-clustering/index).

RID Lookup (Heap)

تسترجع صفاً واحداً من جدول — مثل `TABLE ACCESS BY INDEX ROWID` في Oracle. انظر أيضاً [«*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

Table Scan

وتُعرف أيضاً بالمسح الكامل للجدول. تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. ومع أن عمليات القراءة متعددة الكتل قد تحسّن سرعة `Table Scan` تحسناً كبيراً، فهي لا تزال من أغلى العمليات. فإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن تفحص `Table Scan` جميع صفوف الجدول، لذا قد تستهلك أيضاً قدراً كبيراً من وقت المعالج. انظر أيضاً [«*المسح الكامل للجدول*»](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mssql-ops&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## عمليات الربط

تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».

Nested Loopsتربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. ويستخدم SQL Server عملية الحلقات المتداخلة أيضاً لاسترجاع بيانات الجدول بعد الوصول إلى الفهرس. انظر أيضاً [«*الحلقات المتداخلة*»](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index).

Hash Match

يحمّل ربط المطابقة بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة، ثم يُفحص مقابل كل صف من الطرف الآخر للربط. انظر أيضاً [«*الربط بالتجزئة*»](/book/use-the-index-luke/sql-join-hash-join-partial-objects/index).

Merge Join

يجمع ربط الدمج قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً [«*دمج الترتيب*»](/book/use-the-index-luke/sql-join-sort-merge-join/index).

## الترتيب والتجميع

Sortترتّب النتيجة وفق جملة `order by`. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً [«*فهرسة Order By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index).

Sort (Top N Sort)

ترتّب مجموعة فرعية من النتيجة وفق جملة `order by`. وتُستخدم لاستعلامات Top-N إذا لم يكن التنفيذ المتدفق ممكناً. انظر أيضاً [«*الاستعلام عن صفوف Top-N*»](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).

Stream Aggregate

تجمّع مجموعة مرتَّبة مسبقاً وفق جملة `group by`. ولا تخزّن هذه العملية النتيجة الوسيطة مؤقتاً — بل تُنفَّذ على نحو متدفق. انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

Hash Match (Aggregate)

تجمّع النتيجة باستخدام جدول تجزئة. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). والخرج غير مرتَّب بأي طريقة ذات معنى. انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

## استعلامات Top-N

Topتوقف العمليات الأساسية عند جلب عدد الصفوف المطلوب. انظر أيضاً [«*الاستعلام عن صفوف Top-N*»](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).

وتتوقف كفاءة استعلام Top-N على نمط تنفيذ العمليات الأساسية؛ وهو غير فعّال أبداً عند إيقاف عمليات غير متدفقة مثل `Sort`.
