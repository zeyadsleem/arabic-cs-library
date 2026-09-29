---
title: "عمليات خطة التنفيذ في Db2 (LUW)"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/db2/operations
---

مرجع قصير لأكثر عمليات خطة التنفيذ شيوعاً في Db2 (LUW). تجد القائمة الكاملة في [وثائق IBM](https://www.ibm.com/docs/en/db2/11.5.x?topic=tool-operators).

## الوصول إلى الفهرس والجدول

[IXSCAN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021330.htm)

تنفّذ `IXSCAN` اجتياز شجرة B *و* تتبع سلسلة العقد الورقية للعثور على جميع المدخلات المطابقة. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index).

وما يسمى مُسندات ترشيح الفهرس (مُسندات «`SARG`») كثيراً ما يسبّب مشكلات أداء لعملية `IXSCAN`. ويشرح [القسم التالي](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index) كيفية تحديدها. وهي شبيهة بعائلة عمليات `INDEX ... SCAN` في Oracle.

ويشير غياب مُسندَي `START` و`STOP` إلى مسح فهرس كامل.

ويشير [عرض `last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained) إلى المسح المعاكس بين قوسين (مثل `IXSCAN (REVERSE)`).

[FETCH](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021323.htm)

تسترجع صفاً من الجدول باستخدام `RID` المسترجع من بحث الفهرس السابق. انظر أيضاً [الفصل 1، «*تشريح فهرس SQL*»](/book/use-the-index-luke/sql-anatomy/index). وهي شبيهة بـ`TABLE ACCESS BY INDEX ROWID` في Oracle.

[TBSCAN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021339.htm)

وتُعرف أيضاً بالمسح الكامل للجدول. تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. ومع أن عمليات القراءة متعددة الكتل تحسّن سرعة المسح الكامل تحسناً كبيراً، فهو لا يزال من أغلى العمليات. فإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن يفحص المسح الكامل جميع صفوف الجدول، لذا قد يستهلك أيضاً قدراً كبيراً من وقت المعالج. انظر أيضاً [«*المسح الكامل للجدول*»](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan).

[RIDSCN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021335.htm)

تُستخدم هذه العملية في [دمج الفهارس](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index)، وربما أكثر من ذلك في الجلب المسبق لصفحات البيانات بعد فرزها.

## عمليات الربط

تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».

[NLJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021332.htm)

تربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. انظر أيضاً [«*الحلقات المتداخلة*»](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index).

[HSJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021327.htm)

يحمّل الربط بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة، ثم يُفحص مقابل كل صف من الطرف الآخر للربط. انظر أيضاً [«*الربط بالتجزئة*»](/book/use-the-index-luke/sql-join-hash-join-partial-objects/index).

[MSJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021331.htm)

يجمع ربط الدمج قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً [«*دمج الترتيب*»](/book/use-the-index-luke/sql-join-sort-merge-join/index).

[ZZJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0058568.htm)

ربط متعدد الجداول (أكثر من جدولين) مخصص لمستودعات البيانات التي تستخدم مخطط النجمة.

## الترتيب والتجميع

[SORT](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021338.htm)

ترتّب النتيجة وفق جملة `order by`. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). وتُستخدم أيضاً لإنشاء الترتيب المطلوب لعمليات [`MSJOIN`](#apa-db2-ops-msjoin) أو [`GRPBY`](#apa-db2-ops-grpby). إضافةً إلى ذلك، قد تحذف `SORT` الصفوف المكرّرة لعملية `distinct`. انظر أيضاً [«*فهرسة Order By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index).

ويشير [عرض `last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained) إلى ما إذا كان هناك إزالة للتكرار بين قوسين (مثل `SORT (UNIQUE)`). وتُوسم عمليات فرز Top-N بـ`TOP-N` (مثلاً بسبب `fetch first ... rows only`).

[UNIQUE](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021338.htm)

تزيل تكرار الصفوف في مجموعة مرتَّبة مسبقاً. وتُستخدم من أجل `distinct` عندما يمكن إنشاء الترتيب المطلوب دون عملية `SORT` (مثلاً لأن `IXSCAN` يعيدها بالترتيب المطلوب). وعند لزوم عملية `SORT`، تتولى عملية `SORT` نفسها إزالة التكرار.

[GRPBY](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021326.htm)

تجمّع مجموعة وفق جملة `group by`. وقد تُنفَّذ هذه العملية بخوارزمية فرز/تجميع أو بنهج قائم على التجزئة (منذ الإصدار 10.1). انظر أيضاً [«*فهرسة Group By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index).

ويشير [عرض `last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained) إلى نمط التجميع بين قوسين (مثل `GRPBY (HASH COMPLETE)`).

## استعلامات Top-N

ليس في Db2 (LUW) عمليات خطة تنفيذ تتصل مباشرةً بجمل Top-N مثل `fetch first ... rows only`. غير أنه إذا نُفِّذت عملية `SORT`، يشير [عرض `last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained) إلى تحسين Top-N بين قوسين (مثل `SORT (TOP-N)`).

وإذا لم تكن هناك حاجة إلى عملية `SORT`، فلا توجد علامة ظاهرة لسلوك Top-N في خطة التنفيذ. لكن الانخفاض المفاجئ في قيمة التكلفة أو في تقديرات عدد الصفوف مع غياب المُسندات قد يلمّح إلى وجود جملة Top-N عاملة.
