---
title: "التمييز بين مُسندات الوصول والترشيح"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/sql-server/filter-predicates
---

تستخدم قاعدة بيانات SQL Server ثلاث طرق مختلفة لتطبيق جمل `where` (المُسندات):

مُسند وصول («Seek Predicates»)

تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ[اجتياز العقد الورقية](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index).

مُسند ترشيح الفهرس («Predicates» أو «where» لعمليات الفهرس)

تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.

مُسند ترشيح على مستوى الجدول («where» لعمليات الجدول)

تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من جدول الكومة أولاً.

ويشرح القسم التالي كيفية تحديد مُسندات الترشيح في [خطط تنفيذ SQL Server](/book/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan/index). وهو مبني على العينة المستخدمة في [بيان أثر مُسندات ترشيح الفهرس](/book/use-the-index-luke/sql-testing-scalability-data-volume/index) في [الفصل 3](/book/use-the-index-luke/sql-testing-scalability/index). ويحتوي الملحق على [السكربتات الكاملة](/book/use-the-index-luke/sql-example-schema-sql-server-performance-testing-scalability/index) لملء الجدول.

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
)
```

```sql
CREATE INDEX scale_slow ON scale_data(section, id1, id2)
```

وتختار العبارة العينية حسب `SECTION` و`ID2`:

```sql
SELECT count(*)
  FROM scale_data
 WHERE section = @sec
   AND id2 = @id2
```

## في خطط التنفيذ الرسومية

تخفي خطة التنفيذ الرسومية معلومات المُسندات في تلميح لا يظهر إلا عند تمرير المؤشر فوق عملية `Index Seek`. مرّر المؤشر فوق رمز `Index Seek` لترى معلومات المُسندات — فعلاً، على هذه الصفحة.

![](https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates-0-mssql_ssms_filter.ZrTov2hZ.webp)

وتقابل *Seek Predicates* في SQL Server مُسندات الوصول في Oracle — فهي تضيّق اجتياز العقد الورقية. أما مُسندات الترشيح فتُوسم ببساطة *Predicates* في خطة التنفيذ الرسومية في SQL Server.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-mssql-filter&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## في خطط التنفيذ الجدولية

تحتوي خطط التنفيذ الجدولية على معلومات المُسندات في العمود نفسه الذي تظهر فيه العمليات؛ ولذلك يسهل جداً نسخ جميع المعلومات ذات الصلة ولصقها دفعة واحدة.

```
DECLARE @sec numeric
```

```
DECLARE @id2 numeric
```

```
SET STATISTICS PROFILE ON
```

```sql
SELECT count(*)
  FROM scale_data
 WHERE section = @sec
   AND id2 = @id2
```

```
SET STATISTICS PROFILE OFF
```

وتُعرض خطة التنفيذ كمجموعة نتائج ثانية في لوحة النتائج. وفيما يلي عمود `StmtText` — مع بعض إعادة التنسيق لقراءة أفضل:

```
|--Compute Scalar(DEFINE:([Expr1004]=CONVERT_IMPLICIT(...))
     |--Stream Aggregate(DEFINE:([Expr1008]=Count(*)))
          |--Index Seek(OBJECT:([scale_data].[scale_slow]),
             SEEK: ([scale_data].[section]=[@sec])
                    ORDERED FORWARD
             WHERE:([scale_data].[id2]=[@id2]))
```

تُدخل وسمة `SEEK` مُسندات الوصول، وتشير وسمة `WHERE` إلى مُسندات الترشيح.

#### نصيحة

- يشرح قسم [«*أكبر من، وأصغر من، و`BETWEEN`*»](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index) الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.
- ويبيّن [الفصل 3، «*الأداء وقابلية التوسع*»](/book/use-the-index-luke/sql-testing-scalability/index) فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.
