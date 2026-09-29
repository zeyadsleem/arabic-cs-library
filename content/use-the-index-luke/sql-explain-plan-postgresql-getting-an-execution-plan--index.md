---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/postgresql/getting-an-execution-plan
---

تُسترجَع خطة تنفيذ PostgreSQL بوضع أمر `explain` قبل عبارة SQL. غير أن هناك قيداً مهماً واحداً: عبارات SQL التي تستخدم [وسائط ربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index) (مثل `$1` و`$2` وما إلى ذلك) لا يمكن شرحها بهذه الطريقة — بل يجب تحضيرها أولاً:

```
PREPARE stmt(int) AS SELECT $1
```

لاحظ أن PostgreSQL يستخدم «`$n`» لوسائط الربط. وقد تخفي طبقة تجريد قاعدة البيانات لديك ذلك فتستطيع استخدام علامات الاستفهام كما يعرّفها معيار SQL.

ويمكن شرح تنفيذ العبارة المحضَّرة:

```
EXPLAIN EXECUTE stmt(1)
```

منذ PostgreSQL 9.2، تأجّل إنشاء خطة التنفيذ إلى وقت التنفيذ، فيأخذ القيم الفعلية لوسائط الربط في الحسبان. وللحصول على خطة تنفيذ لا تراعي القيم الفعلية لوسائط الربط، أدخل PostgreSQL 16 [خيار `generic_plan` في `explain`](https://www.postgresql.org/docs/current/sql-explain.html#id-1.9.3.148.8).

#### ملاحظة

يمكن شرح العبارات بلا وسائط ربط مباشرةً:

```
EXPLAIN SELECT 1
```

وفي هذه الحالة كان المُحسِّن يراعي دائماً القيم الفعلية أثناء تخطيط الاستعلام.

وخرج خطة الشرح كما يلي:

```
                QUERY PLAN                
------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=0)
```

ويحمل الخرج معلومات مشابهة لخطط تنفيذ Oracle المعروضة في الكتاب: اسم العملية («Result»)، والتكلفة المتصلة، وتقدير عدد الصفوف، وعرض الصف المتوقع.

لاحظ أن PostgreSQL يعرض قيمتَي تكلفة: الأولى تكلفة بدء التشغيل، والثانية التكلفة الكلية للتنفيذ إذا استُرجعت جميع الصفوف. أما خطة تنفيذ قاعدة بيانات Oracle فتعرض القيمة الثانية فقط.

ولأمر `explain` في PostgreSQL خيارات كثيرة، وأنفعها `analyze` و`buffers` و`settings`.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-pg-get&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

وتفعيل خيار `analyze` يعني أن خطة التنفيذ لا تُنشأ فحسب بل تُنفَّذ أيضاً. ويستلزم ذلك حدوث الآثار الجانبية لتشغيل العبارة المشروحة، مثل حذف الصفوف عند شرح عبارة `delete`. ويمكنك إحاطة `explain` بمعاملة والتراجع عنها بعد ذلك إن لم ترد أن تبقى تلك الآثار الجانبية.

#### تحذير

ينفّذ `explain analyze` العبارة المشروحة، حتى إذا كانت عبارة `insert` أو `update` أو `delete`.

ويتيح تشغيل العبارة جمع معايير زمن التشغيل مثل الزمن والعدد الفعلي للصفوف التي تنتجها كل عملية. ويحصي الخيار `buffers` أيضاً عدد كتل قاعدة البيانات التي يُوصَل إليها.

وأخيراً، يعرض الخيار `settings` الإعدادات المختلفة عن قيمها الافتراضية.

```
BEGIN
```

```
EXPLAIN (ANALYZE, BUFFERS, SETTINGS)
EXECUTE stmt(1)
```

```
                   QUERY PLAN
--------------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=4)
         (actual time=0.001..0.002 rows=1 loops=1)
 Settings: random_page_cost = '1.1'
 Planning Time: 0.032 ms
 Execution Time: 0.078 ms
```

```
ROLLBACK
```

لاحظ أن الخطة نُسِّقت لتلائم الصفحة على نحو أفضل. ويعرض PostgreSQL القيم «الفعلية» على السطر نفسه الذي تظهر فيه القيم المقدَّرة.

وعدد الصفوف هو القيمة الوحيدة المعروضة في الجزأين — في الأرقام المقدَّرة والفعلية — ما يتيح لك العثور سريعاً على تقديرات العددية الخاطئة.

وأخيراً وليس آخراً، يجب إغلاق العبارات المحضَّرة مرة أخرى:

```
DEALLOCATE stmt
```

#### نصيحة

[وسائط الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index)

[تجنّب المنطق الذكي لجمل `WHERE` الشرطية](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index)

مقال «[التخطيط لإعادة الاستخدام](https://use-the-index-luke.com/blog/2011-07-16/planning-for-reuse)»
