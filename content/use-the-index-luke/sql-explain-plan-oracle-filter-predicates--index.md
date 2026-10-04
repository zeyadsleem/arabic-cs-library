---
title: "التمييز بين مُسندات الوصول والترشيح"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/oracle/filter-predicates
---

تستخدم قاعدة بيانات Oracle ثلاث طرق مختلفة لتطبيق جمل `where` (المُسندات):

مُسند وصول («access»)

تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ[اجتياز العقد الورقية](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index).

مُسند ترشيح الفهرس («filter» لعمليات الفهرس)

تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.

مُسند ترشيح على مستوى الجدول («filter» لعمليات الجدول)

تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من الجدول أولاً.

#### ملاحظة

تعطي مُسندات ترشيح الفهرس إحساساً زائفاً بالأمان؛ فرغم استخدام الفهرس، يتدهور الأداء سريعاً مع نمو حجم البيانات أو حِمل النظام.

تُظهر خطط التنفيذ التي أُنشئت بأداة `DBMS_XPLAN` (انظر [«*الحصول على خطة تنفيذ*»](/book/use-the-index-luke/sql-explain-plan-oracle-getting-an-execution-plan/index)) استخدام الفهرس في قسم «Predicate Information» أسفل خطة التنفيذ الجدولية:

```
------------------------------------------------------
| Id | Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 | 1445 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_SLOW |  4485 | 1445 |
------------------------------------------------------

Predicate Information (identified by operation id):
   2 - access("SECTION"=:A AND "ID2"=:B)
       filter("ID2"=:B)
```

وتشير ترقيمات معلومات المُسندات إلى عمود «Id» في خطة التنفيذ. وهناك تُظهر قاعدة البيانات أيضاً نجمة لوسم العمليات التي لها معلومات مُسندات.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-oracle-filter&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

يعرض هذا المثال، المأخوذ من فصل «[الأداء وقابلية التوسع](/book/use-the-index-luke/sql-testing-scalability-data-volume/index)»، عملية `INDEX RANGE SCAN` لها مُسندات وصول وترشيح. ولقاعدة بيانات Oracle خصوصية أنها تُظهر بعض مُسندات الترشيح كمُسندات وصول أيضاً — مثل `ID2=:B` في خطة التنفيذ أعلاه.

#### مهم

إذا ظهر شرط كمُسند ترشيح، فهو مُسند ترشيح — ولا يهم إن ظهر أيضاً كمُسند وصول.

ويعني ذلك أن `INDEX RANGE SCAN` يمسح النطاق بأكمله من أجل الشرط `"SECTION"=:A` ويطبّق المرشّح `"ID2"=:B` على كل صف.

وتُعرض مُسندات الترشيح على مستوى الجدول للوصول المقابل إلى الجدول مثل `TABLE ACCESS BY INDEX ROWID` أو `TABLE ACCESS FULL`.

يرجى ملاحظة أن الأدوات المختلفة تعرض معلومات المُسندات بطرق مختلفة؛ فمثلاً يعرض Oracle SQL Developer معلومات المُسندات أسفل العملية المعنية.

الشكل A.1 مُسندات الوصول والترشيح في Oracle SQL Developer ![](https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-oracle-filter-predicates-0-sqldeveloper_access_filter_predicates.6GQmGBUE.webp){#scn-sqldeveloper-access-filter}

وبعض الأدوات لا تعرض معلومات المُسندات إطلاقاً. تذكّر أنك تستطيع دائماً العودة إلى `DBMS_XPLAN` كما شُرح في «[الحصول على خطة تنفيذ](/book/use-the-index-luke/sql-explain-plan-oracle-getting-an-execution-plan/index)».

#### نصيحة

- يشرح قسم [«*أكبر من، وأصغر من، و`BETWEEN`*»](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index) الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.
- ويبيّن [الفصل 3، «*الأداء وقابلية التوسع*»](/book/use-the-index-luke/sql-testing-scalability/index) فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.
