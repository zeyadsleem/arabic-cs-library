---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/oracle/getting-an-execution-plan
---

يتضمن عرض خطة تنفيذ، مع القياسات الفعلية، في قاعدة بيانات Oracle ثلاث خطوات:

1. تفعيل القياسات (اختياري)
2. تنفيذ عبارة SQL
3. جلب خطة التنفيذ

## تفعيل القياسات

للحصول على جميع إحصاءات زمن التشغيل، مثل زمن كل عملية، يجب تفعيل جمع هذه القيم أولاً. ويمكن فعل ذلك في العبارة المعنية بإضافة التلميح `/*+ GATHER_PLAN_STATISTICS */`، أو مرة واحدة في الجلسة بحيث يشمل جميع عمليات التنفيذ التالية.

```sql
alter session set statistics_level = 'ALL'
```

## تنفيذ عبارة SQL

يؤدي تشغيل العبارة إلى تخزين خطة التنفيذ مؤقتاً (منطقة SQL). وإذا كنت قد فعّلت جمع إحصاءات زمن التشغيل، فستُضاف هناك أيضاً.

```sql
select * from dual
```

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-ora-get&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## جلب خطة التنفيذ

تستطيع الحزمة `DBMS_XPLAN` عرض خطط التنفيذ من منطقة SQL. ويوضح المثال التالي كيفية عرض آخر خطة تنفيذ نُفِّذت في جلسة قاعدة البيانات الحالية:

```sql
select * from table(dbms_xplan.display_cursor(null, null,
                                  'LAST ALLSTATS +COST'))
```

سيعرض الاستعلام خطة التنفيذ كما هي معروضة في الكتاب:

```
---------------------------------------------------------------
| Operation         | Name | E-Rows | Cost | A-Rows | A-Time |.
---------------------------------------------------------------
| SELECT STATEMENT  |      |        |    2 |      1 |  00.01 |.
|  TABLE ACCESS FULL| DUAL |      1 |    2 |      1 |  00.01 |.
---------------------------------------------------------------
```

خطط التنفيذ المعروضة هنا حُرِّرت للإيجاز.
