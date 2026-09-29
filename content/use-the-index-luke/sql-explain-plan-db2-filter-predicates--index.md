---
title: "التمييز بين مُسندات الوصول والترشيح"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/db2/filter-predicates
---

لا تقدّم أي قاعدة بيانات أخرى معلومات أفضل عن نمط تقييم المُسندات كما تفعل Db2، لأنها تقول ببساطة في خطة التنفيذ ما إذا كان المُسند يُستخدم كشرط بدء و/أو توقف لـ[IXSCAN](/book/use-the-index-luke/sql-explain-plan-db2-operations/index#apa-db2-ops-ixscan) أو كمُسند ترشيح محض. لكن الأمر مربك لأنها تستخدم تعريفاً قديماً لمصطلح «*sarg*».

> في الأيام الأولى، سمّى باحثو IBM هذه الأنواع من شروط البحث «مُسندات قابلة للبحث (sargable predicates)» لأن SARG اختصار لعبارة Search ARGument. وفي أيام لاحقة، أعادت Microsoft وSybase تعريف «sargable» لتعني «يمكن البحث عنه عبر الفهرس».— [SQL Performance Tuning](https://web.archive.org/web/20241210124531/https://www.informit.com/articles/article.aspx?p=30247)

أجد التعريفين عديمي الفائدة إلى حد كبير، وأتجنّب المصطلح كلياً في كتبي ومقالاتي. غير أن مُسندات الترشيح في خطط تنفيذ Db2 تُوسَم بـ`SARG` — لذا يجب أن نوضح أن IBM Db2 تستخدم التعريف «الأصلي» المذكور أعلاه. وهذا مدعوم طبعاً بالوثائق:

*مُسندات الفهرس القابلة للبحث (Index sargable)* لا تُستخدم لحصر نطاق البحث، بل تُقيَّم من الفهرس إذا اختير، لأن الأعمدة المشمولة في المُسند جزء من مفتاح الفهرس. […]

*مُسندات البيانات القابلة للبحث (Data sargable)* […] تتطلب الوصول إلى صفوف فردية من الجدول الأساسي. وعند اللزوم، تسترجع DMS الأعمدة اللازمة لتقييم المُسند، وكذلك أي أعمدة أخرى لتلبية أعمدة قائمة SELECT التي تعذّر الحصول عليها من الفهرس.

— [معالجة المُسندات للاستعلامات، وثائق Db2 LUW 11.1](https://www.ibm.com/docs/en/db2/11.5.x?topic=optimization-predicate-processing-queries)

ويعني ذلك أن المُسندات الموسومة بـ`SARG` في Db2 هي عموماً مُسندات ترشيح محض — إما على مستوى الفهرس وإما على مستوى الجدول.

والجزء الجميل جداً في معلومات المُسندات المعروضة في خطط تنفيذ Db2 أنها لا توسم مُسندات الوصول فحسب، بل تقول صراحةً أي المُسندات تُستخدم كشرطَي `START` و/أو `STOP`.

ويعرض المثال التالي جميع أنواع المُسندات كما يظهرها [عرض `last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained):

```
Explain Plan
--------------------------------------------------------------
ID | Operation           |                        Rows |  Cost
 1 | RETURN              |                             | 23550
 2 |  GRPBY (COMPLETE)   |        1 of 96480 (   .00%) | 23550
 3 |   IXSCAN SCALE_SLOW | 96480 of 60299800 (   .16%) | 23544

Predicate Information
 3 - START (Q1.SECTION = ?)
      STOP (Q1.SECTION = ?)
      SARG (Q1.ID2 = ?)

Explain plan by Markus Winand - NO WARRANTY
http://use-the-index-luke.com/s/last_explained
```

ويمكن تحديد نطاق الفهرس الممسوح بسهولة تامة من هذا الخرج — فهو يتحدد فقط بمُسندَي `START` و`STOP` (وهما المصادف أنهما متماثلان في هذه الحالة). أما المُسند الثالث على العمود `ID2` فموسوم بـ`SARG` فهو مجرد مُسند ترشيح.

ومع أن مُسندات `SARG` قد تظهر في عمليات أخرى أيضاً (مثل `TBSCAN`)، فإن `START` و`STOP` خاصان بـ`IXSCAN` وحدهما. ويشير غياب `START` أو `STOP` إلى بحث بحد أعلى أو أدنى فقط (مثل `WHERE x > ?`). أما إذا لم يظهر أي من `START` و`STOP` لعملية `IXSCAN`، فهذا يعني قراءة الفهرس بأكمله.
