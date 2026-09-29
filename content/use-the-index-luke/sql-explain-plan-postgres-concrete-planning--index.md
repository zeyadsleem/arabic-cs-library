---
title: "التخطيط الملموس"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/postgres/concrete-planning
---

ليس لـPostgreSQL ذاكرة مؤقتة مشتركة لخطط الاستعلام، لكنه يملك ذاكرة مؤقتة *اختيارية* لخطط الاستعلام الخاصة بالعبارات المحضَّرة. ويعني ذلك أن المطوّر يملك الخيار بين استخدام عبارة محضَّرة مع ذاكرة مؤقتة لخطة الاستعلام أو بدونها. لكن لاحظ أن الذاكرة المؤقتة تُسقط عند إغلاق العبارة المحضَّرة.

تعرض الأمثلة التالية كيفية استخدام هذه الوظيفة في لغات مختلفة.

Cتوفّر واجهة C الأصلية الدالة [`PQexecParams`](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-PQEXECPARAMS)، التي تتيح استخدام وسائط الربط أثناء التحضير (خلافاً لـ`PQprepare`).

Java

يتحكم مشغّل PostgreSQL JDBC في [التحضير من جهة الخادم](https://jdbc.postgresql.org/documentation/server-prepare/) عبر الطريقة غير القياسية `setPrepareThreshold` على [PGStatement](https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/PGStatement.html#setPrepareThreshold%28int%29) و[PGConnection](https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/PGConnection.html#setPrepareThreshold%28int%29).

لاحظ أن الإعداد الافتراضي هو خمسة، ما يعني أن عمليات التنفيذ الأربع الأولى ستستخدم وسائط الربط فعلاً أثناء التحضير، وما بعدها لن يفعل. ويبدأ هذا العدّاد من جديد لكل نسخة `PreparedStatement`.

#### تحذير

هناك أطر كثيرة تستخدم ذاكرة مؤقتة لـ`PreparedStatement` — تُضبط عبر `prepared-statement-cache-size` في إعداد مصدر البيانات. ويعني ذلك أنك قد تصل إلى الحد في أي وقت.

Ruby

تقبل دالة Ruby ‏[PGconn.exec](https://deveiate.org/code/pg/PGconn.html#method-i-exec) وسائط الربط كوسيط اختياري، وتُستخدم القيم أثناء التخطيط إن قُدِّمت. ولدى Jeff Davis [مثال](http://thoughts.davisjeff.com/2011/07/09/building-sql-strings-dynamically-in-2011/).
