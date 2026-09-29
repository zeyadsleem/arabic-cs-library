---
title: "العمليات"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/postgresql/operations
---

## الوصول إلى الفهرس والجدول

Seq Scan

تمسح عملية `Seq Scan` العلاقة (الجدول) بأكملها كما هي مخزّنة على القرص (مثل `TABLE ACCESS FULL`).

Index Scan

تنفّذ `Index Scan` اجتياز شجرة B، وتمشي عبر العقد الورقية للعثور على جميع المدخلات المطابقة، وتجلب بيانات الجدول المقابلة. وهي مثل `INDEX RANGE SCAN` تتبعها عملية `TABLE ACCESS BY INDEX ROWID`. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

وما يسمى مُسندات ترشيح الفهرس كثيراً ما يسبّب مشكلات أداء لعملية `Index Scan`. ويشرح [القسم التالي](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index) كيفية تحديدها.

Index Only Scan

تنفّذ `Index Only Scan` اجتياز شجرة B وتمشي عبر العقد الورقية للعثور على جميع المدخلات المطابقة، دون حاجة إلى الوصول إلى الجدول لأن الفهرس يملك جميع الأعمدة اللازمة لتلبية الاستعلام (استثناء: معلومات ظهور MVCC). انظر أيضاً [«*مسح الفهرس فقط: تجنّب الوصول إلى الجدول*»](/book/use-the-index-luke/sql-clustering-index-only-scan-covering-index/index).

Bitmap Index Scan / Bitmap Heap Scan / Recheck Cond

رسالة Tom Lane على [قائمة بريد أداء PostgreSQL](https://www.postgresql.org/message-id/12553.1135634231@sss.pgh.pa.us) واضحة وموجزة جداً.

> يجلب `Index Scan` العادي مؤشر صف واحداً في المرة من الفهرس، ويزور ذلك الصف في الجدول فوراً. أما مسح البتات (bitmap scan) فيجلب جميع مؤشرات الصفوف من الفهرس دفعة واحدة، ويرتّبها باستخدام بنية بيانات «بتات» في الذاكرة، ثم يزور صفوف الجدول بترتيب مواقعها الفيزيائية.— [Tom Lane](https://www.postgresql.org/message-id/12553.1135634231@sss.pgh.pa.us)

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-pg-op&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## عمليات الربط

تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».

Nested Loopsتربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. انظر أيضاً [«*الحلقات المتداخلة*»](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index).

Hash Join / Hash

يحمّل الربط بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة (موسوم بـ`Hash` في الخطة)، ثم يُفحص مقابل كل سجل من الطرف الآخر للربط. انظر أيضاً [«*الربط بالتجزئة*»](/book/use-the-index-luke/sql-join-hash-join-partial-objects/index).

Merge Join

يجمع ربط الدمج (بالترتيب) قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً [«*دمج الترتيب*»](/book/use-the-index-luke/sql-join-sort-merge-join/index).

## الترتيب والتجميع

Sort / Sort Keyترتّب المجموعة على الأعمدة المذكورة في `Sort Key`. وتحتاج عملية `Sort` إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً [«*فهرسة Order By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index).

GroupAggregate

تجمّع مجموعة مرتَّبة مسبقاً وفق جملة `group by`. ولا تخزّن هذه العملية كميات كبيرة من البيانات مؤقتاً (متدفقة). انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

HashAggregate

تستخدم جدول تجزئة مؤقتاً لتجميع السجلات. ولا تتطلب عملية `HashAggregate` مجموعة بيانات مرتَّبة مسبقاً، بل تستخدم كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). والخرج غير مرتَّب بأي طريقة ذات معنى. انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

## استعلامات Top-N

Limitتوقف العمليات الأساسية عند جلب عدد الصفوف المطلوب. انظر أيضاً [«*الاستعلام عن صفوف Top-N*»](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).

وتتوقف كفاءة استعلام Top-N على نمط تنفيذ العمليات الأساسية؛ وهو غير فعّال أبداً عند إيقاف عمليات غير متدفقة مثل `Sort`.

WindowAgg

تشير إلى استخدام دوال النوافذ. وبدءاً من PostgreSQL 15، تشير «Run Condition» إلى إيقاف Top-N محتمل. انظر أيضاً [«*استخدام دوال النوافذ لترقيم فعّال*»](/book/use-the-index-luke/sql-partial-results-window-functions/index).
