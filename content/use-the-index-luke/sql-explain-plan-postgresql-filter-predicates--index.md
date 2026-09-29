---
title: "التمييز بين مُسندات الوصول والترشيح"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/postgresql/filter-predicates
---

تستخدم قاعدة بيانات PostgreSQL ثلاث طرق مختلفة لتطبيق جمل `where` (المُسندات):

مُسند وصول («Index Cond»)

تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ[اجتياز العقد الورقية](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index).

مُسند ترشيح الفهرس («Index Cond»)

تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.

مُسند ترشيح على مستوى الجدول («Filter»)

تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من جدول الكومة أولاً.

#### ملاحظة

تعطي مُسندات ترشيح الفهرس إحساساً زائفاً بالأمان؛ فرغم استخدام الفهرس، يتدهور الأداء سريعاً مع نمو حجم البيانات أو حِمل النظام.

لا تعرض خطط تنفيذ PostgreSQL مُسندات وصول الفهرس وترشيحه منفصلةً — بل يظهر كلاهما كـ«Index Cond». ويعني ذلك أنه يجب مقارنة خطة التنفيذ بتعريف الفهرس للتمييز بين مُسندات الوصول ومُسندات ترشيح الفهرس.

#### ملاحظة

لا تقدّم خطة شرح PostgreSQL معلومات كافية للعثور على مُسندات ترشيح الفهرس.

والمُسندات المعروضة كـ«Filter» هي دائماً مُسندات ترشيح على مستوى الجدول — حتى عند عرضها لعملية `Index Scan`.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-pg-filter&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

تأمّل المثال التالي، الذي ظهر أصلاً في فصل «[الأداء وقابلية التوسع](/book/use-the-index-luke/sql-testing-scalability-data-volume/index)» ([سكربت `create` و`insert`](/book/use-the-index-luke/sql-example-schema-postgresql-performance-testing-scalability/index)):

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
)
```

```sql
CREATE INDEX scale_data_key ON scale_data(section, id1)
```

ويفلتر `select` التالي على العمود `ID2` غير المشمول في الفهرس:

```
PREPARE stmt(int) AS SELECT count(*) 
                       FROM scale_data
                      WHERE section = 1
                        AND id2 = $1
```

```
EXPLAIN EXECUTE stmt(1)
```

يظهر مُسند `ID2` كـ«`Filter`» أسفل عملية `Index Scan`. والسبب أن PostgreSQL ينفّذ الوصول إلى الجدول كجزء من عملية `Index Scan`؛ وبعبارة أخرى، عملية `TABLE ACCESS BY INDEX ROWID` في قاعدة بيانات Oracle مخفية داخل عملية `Index Scan` في PostgreSQL. ولذلك من الممكن أن يفلتر `Index Scan` على أعمدة غير مشمولة في الفهرس.

#### مهم

مُسندات `Filter` في PostgreSQL هي مُسندات ترشيح على مستوى الجدول — حتى عند عرضها لعملية `Index Scan`.

وعندما نضيف الفهرس من فصل «[الأداء وقابلية التوسع](/book/use-the-index-luke/sql-testing-scalability-data-volume/index)»، نرى أن جميع الأعمدة تظهر كـ«Index Cond» — بصرف النظر عما إذا كانت مُسندات وصول أو ترشيح.

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2)
```

وخطة التنفيذ بالفهرس الجديد لا تعرض أي شروط ترشيح:

```
                      QUERY PLAN
------------------------------------------------------
Aggregate  (cost=14215.98..14215.99 rows=1 width=0)
  Output: count(*)
  -> Index Scan using scale_slow on scale_data 
     (cost=0.00..14208.51 rows=2989 width=0)
     Index Cond: (section = 1::numeric AND id2 = ($1)::numeric)
```

يرجى ملاحظة أن الشرط على `ID2` لا يستطيع تضييق اجتياز العقد الورقية لأن الفهرس يضع العمود `ID1` قبل `ID2`. ويعني ذلك أن `Index Scan` سيمسح النطاق بأكمله من أجل الشرط `SECTION=1::numeric` ويطبّق المرشّح `ID2=($1)::numeric` على كل صف يحقق الشرط على `SECTION`.

#### نصيحة

- يشرح قسم [«*أكبر من، وأصغر من، و`BETWEEN`*»](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index) الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.
- ويبيّن [الفصل 3، «*الأداء وقابلية التوسع*»](/book/use-the-index-luke/sql-testing-scalability/index) فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.
