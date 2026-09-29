---
title: "الدوال"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/functions
---

حسّن الفهرس على `LAST_NAME` الأداء تحسناً كبيراً، لكنه يلزمك بالبحث بحالة الأحرف نفسها (كبيرة/صغيرة) المخزنة في قاعدة البيانات. ويشرح هذا القسم كيف ترفع هذا القيد دون انخفاض في الأداء.

Db2 (LUW)

تدعم Db2 الفهارس القائمة على الدوال على [zOS](https://www.ibm.com/docs/en/db2-for-zos/13.0.0?topic=statements-create-index) منذ مدة، لكنها لا تدعمها [على LUW إلا منذ الإصدار 10.5](https://www.ibm.com/docs/en/db2/11.5.x?topic=statements-create-index#sdx-synid_key-expression). ولا يُسمح باستخدام الدوال المعرّفة من المستخدم في الفهارس.

والحل الاحتياطي هو إنشاء عمود حقيقي في الجدول يحمل نتيجة الدالة أو التعبير. ويجب صيانة هذا العمود بواسطة مُشغِّل (trigger) أو طبقة التطبيق — أيهما أنسب. ويمكن فهرسة العمود الجديد، ويجب أن تستخدم جملة `where` العمود الجديد (دون التعبير).

MySQL

MySQL غير حسّاس لحالة الأحرف افتراضياً، لكن ذلك [يمكن التحكم به على مستوى العمود](https://dev.mysql.com/doc/refman/8.0/en/case-sensitivity.html). وبدءاً من الإصدار 5.7، تستطيع MySQL إنشاء فهارس على [الأعمدة المولّدة](https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html).

والحل الاحتياطي للإصدارات الأقدم هو إنشاء عمود حقيقي في الجدول يحمل نتيجة الدالة أو التعبير. ويجب صيانة هذا العمود بواسطة مُشغِّل أو طبقة التطبيق — أيهما أنسب. ويمكن فهرسة العمود الجديد، ويجب أن تستخدم جملة `where` العمود الجديد (دون التعبير).

Oracle

تدعم قاعدة بيانات Oracle الفهارس القائمة على الدوال منذ الإصدار 8*i*، وأُضيفت الأعمدة الافتراضية مع الإصدار 11*g*.

PostgreSQL

يدعم PostgreSQL دعماً كاملاً لـ[الفهارس على التعبيرات](https://www.postgresql.org/docs/current/indexes-expressional.html) منذ الإصدار 7.4 (ودعماً جزئياً منذ 7.2).

SQL Server

تدعم SQL Server [الأعمدة المحسوبة](https://learn.microsoft.com/en-us/sql/relational-databases/tables/specify-computed-columns-in-a-table?view=sql-server-ver16) التي يمكن فهرستها منذ الإصدار 2000.

## المحتويات

1. *[البحث غير الحسّاس لحالة الأحرف](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index)* — `UPPER` و`LOWER`
2. *[الدوال المعرّفة من المستخدم](/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index)* — قيود الفهارس القائمة على الدوال
3. *[الإفراط في الفهرسة](/book/use-the-index-luke/sql-where-clause-functions-over-indexing/index)* — تجنّب التكرار
