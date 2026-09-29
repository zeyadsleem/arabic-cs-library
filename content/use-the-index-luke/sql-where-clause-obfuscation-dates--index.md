---
title: "أنواع التاريخ"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/obfuscation/dates
---

تتعلق معظم حالات التشويش (obfuscation) بأنواع `DATE`. وقاعدة بيانات Oracle معرّضة لذلك بوجه خاص لأن لديها نوع `DATE` واحداً فقط يتضمن دائماً مكوّن وقت أيضاً.

وقد صار من الممارسات الشائعة استخدام الدالة `TRUNC` لإزالة مكوّن الوقت. وفي الحقيقة لا يزيل هذا مكوّن الوقت بل يضبطه على منتصف الليل، لأن قاعدة بيانات Oracle ليس لديها نوع `DATE` خالص. ولتجاهل مكوّن الوقت في بحث ما، يمكنك استخدام الدالة `TRUNC` على طرفَي المقارنة — مثلاً للبحث عن مبيعات الأمس:

```sql
SELECT ...
  FROM sales
 WHERE TRUNC(sale_date) = TRUNC(sysdate - INTERVAL '1' DAY)
```

إنها عبارة سليمة وصحيحة تماماً، لكنها لا تستطيع استخدام فهرس على `SALE_DATE` استخداماً سليماً. والأمر كما شُرح في [«*البحث غير الحسّاس لحالة الأحرف باستخدام `UPPER` أو `LOWER`*»](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index)؛ فـ`TRUNC(sale_date)` شيء مختلف تماماً عن `SALE_DATE` — فالدوال بالنسبة إلى قاعدة البيانات صناديق سوداء.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obfuscated-dates&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

وهناك حل بسيط إلى حد ما لهذه المشكلة: [فهرس قائم على الدوال](/book/use-the-index-luke/sql-where-clause-functions/index).

```sql
CREATE INDEX index_name
          ON sales (TRUNC(sale_date))
```

لكن يجب عليك حينها استخدام `TRUNC(sale_date)` دائماً في جملة `where`. وإذا استخدمته على نحو غير متسق — تارةً مع `TRUNC` وتارةً بدونه — فستحتاج إلى فهرسين!

وتحدث المشكلة أيضاً مع قواعد البيانات التي لديها نوع تاريخ خالص إذا بحثت عن فترة أطول كما في استعلام MySQL التالي:

```sql
SELECT ...
  FROM sales
 WHERE DATE_FORMAT(sale_date, "%Y-%M")
     = DATE_FORMAT(now()    , "%Y-%M")
```

يستخدم الاستعلام صيغة تاريخ تحتوي السنة والشهر فقط؛ ومرة أخرى، هذا استعلام صحيح تماماً لكنه يعاني المشكلة نفسها السابقة. غير أن الحل أعلاه لا ينطبق على MySQL قبل الإصدار 5.7، لأن MySQL لم تكن تدعم الفهرسة القائمة على الدوال قبل ذلك.

والبديل هو استخدام شرط نطاق صريح. وهذا حل عام يعمل مع جميع قواعد البيانات:

```sql
SELECT ...
  FROM sales
 WHERE sale_date BETWEEN quarter_begin(?) 
                     AND quarter_end(?)
```

وإذا كنت قد أدّيت واجباتك، فستتعرف على النمط من [تمرين جميع الموظفين الذين أعمارهم 42 سنة](/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index#think-age-index).

ويكفي فهرس مباشر على `SALE_DATE` لتحسين هذا الاستعلام؛ إذ تحسب الدالتان `QUARTER_BEGIN` و`QUARTER_END` تاريخَي الحدّين. وقد يصبح الحساب معقداً بعض الشيء لأن [المعامل `between` يتضمن دائماً قيمتَي الحدّين](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index#para-between). ولذلك يجب أن تعيد الدالة `QUARTER_END` طابعاً زمنياً قبل اليوم الأول من الربع التالي مباشرةً إذا كان `SALE_DATE` يحتوي مكوّن وقت. ويمكن إخفاء هذا المنطق داخل الدالة.

وتعرض الأمثلة التالية تطبيقات الدالتين `QUARTER_BEGIN` و`QUARTER_END` في قواعد بيانات مختلفة.

Db2 (LUW)

```sql
CREATE FUNCTION quarter_begin(dt TIMESTAMP)
RETURNS TIMESTAMP
RETURN TRUNC(dt, 'Q')
```

```sql
CREATE FUNCTION quarter_end(dt TIMESTAMP)
RETURNS TIMESTAMP
RETURN TRUNC(dt, 'Q') + 3 MONTHS - 1 SECOND
```

MySQL

```sql
CREATE FUNCTION quarter_begin(dt DATETIME)
RETURNS DATETIME DETERMINISTIC
RETURN CONVERT
       (
         CONCAT
         ( CONVERT(YEAR(dt),CHAR(4))
         , '-'
         , CONVERT(QUARTER(dt)*3-2,CHAR(2))
         , '-01'
         )
       , datetime
       )
```

```sql
CREATE FUNCTION quarter_end(dt DATETIME)
RETURNS DATETIME DETERMINISTIC
RETURN DATE_ADD
       ( DATE_ADD ( quarter_begin(dt), INTERVAL 3 MONTH )
       , INTERVAL -1 MICROSECOND)
```

Oracle

```sql
CREATE FUNCTION quarter_begin(dt IN DATE) 
RETURN DATE
AS
BEGIN
   RETURN TRUNC(dt, 'Q');
END
```

```sql
CREATE FUNCTION quarter_end(dt IN DATE) 
RETURN DATE
AS
BEGIN
   -- the Oracle DATE type has seconds resolution
   -- subtract one second from the first 
   -- day of the following quarter
   RETURN TRUNC(ADD_MONTHS(dt, +3), 'Q') 
        - (1/(24*60*60));
END
```

PostgreSQL

```sql
CREATE FUNCTION quarter_begin(dt timestamp with time zone)
RETURNS timestamp with time zone AS $$
BEGIN
    RETURN date_trunc('quarter', dt);
END;
$$ LANGUAGE plpgsql
```

```sql
CREATE FUNCTION quarter_end(dt timestamp with time zone)
RETURNS timestamp with time zone AS $$
BEGIN
   RETURN   date_trunc('quarter', dt) 
          + interval '3 month'
          - interval '1 microsecond';
END;
$$ LANGUAGE plpgsql
```

SQL Server

```sql
CREATE FUNCTION quarter_begin (@dt DATETIME )
RETURNS DATETIME
BEGIN
  RETURN DATEADD (qq, DATEDIFF (qq, 0, @dt), 0)  
END
```

```sql
CREATE FUNCTION quarter_end (@dt DATETIME )
RETURNS DATETIME
BEGIN
  RETURN DATEADD
         ( ms
         , -3 
         , DATEADD(mm, 3, dbo.quarter_begin(@dt))
         );
END
```

ويمكنك استخدام دوال مساعدة مماثلة لفترات أخرى — وسيكون معظمها أقل تعقيداً من الأمثلة أعلاه، خصوصاً عند استخدام شرطَي أكبر من أو يساوي (`>=`) وأصغر من (`<`) بدلاً من المعامل `between`. ويمكنك طبعاً حساب تاريخَي الحدّين في تطبيقك إن شئت.

#### نصيحة

اكتب استعلامات الفترات المتصلة كشرط نطاق صريح. وافعل ذلك حتى ليوم واحد — مثلاً في قاعدة بيانات Oracle:

```
    sale_date >= TRUNC(sysdate)
AND sale_date <  TRUNC(sysdate + INTERVAL '1' DAY)
```

ومن حالات التشويش الشائعة الأخرى مقارنة التواريخ كسلاسل نصية كما في مثال PostgreSQL التالي:

```sql
SELECT ...
  FROM sales
 WHERE TO_CHAR(sale_date, 'YYYY-MM-DD') = '1970-01-01'
```

والمشكلة، مرة أخرى، تحويل `SALE_DATE`. وغالباً ما تُنشأ مثل هذه الشروط اعتقاداً بأنك لا تستطيع تمرير أنواع مختلفة عن الأعداد والسلاسل النصية إلى قاعدة البيانات. غير أن [وسائط الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index) تدعم جميع أنواع البيانات؛ أي يمكنك مثلاً استخدام كائن `java.util.Date` كوسيط ربط. وهذه فائدة أخرى من فوائد وسائط الربط.

وإذا لم تستطع فعل ذلك، فعليك فقط تحويل قيمة البحث بدلاً من عمود الجدول:

```sql
SELECT ...
  FROM sales
 WHERE sale_date = TO_DATE('1970-01-01', 'YYYY-MM-DD')
```

يستطيع هذا الاستعلام استخدام فهرس مباشر على `SALE_DATE`، علاوة على أنه يحوّل السلسلة المدخلة مرة واحدة فقط، بينما يجب على العبارة السابقة تحويل جميع التواريخ المخزنة في الجدول قبل مقارنتها بقيمة البحث.

وأياً كان التغيير الذي تُجريه — استخدام وسيط ربط أو تحويل الطرف الآخر من المقارنة — فقد تُدخل خطأً بسهولة إذا كان `SALE_DATE` يحتوي مكوّن وقت. ويجب عليك في تلك الحالة استخدام شرط نطاق صريح:

```sql
SELECT ...
  FROM sales
 WHERE sale_date >= TO_DATE('1970-01-01', 'YYYY-MM-DD') 
   AND sale_date <  TO_DATE('1970-01-01', 'YYYY-MM-DD') 
                  + INTERVAL '1' DAY
```

فكّر دائماً في استخدام شرط نطاق صريح عند مقارنة التواريخ.

## `LIKE` على أنواع التاريخ

حالة التشويش التالية خادعة بوجه خاص:

```
sale_date LIKE SYSDATE
```

لا تبدو تشويشاً للوهلة الأولى لأنها لا تستخدم أي دوال.

غير أن المعامل `LIKE` يفرض مقارنة نصية. وتبعاً لقاعدة البيانات، قد يؤدي ذلك إلى خطأ أو إلى تحويل نوع ضمني على الطرفين. ويعرض قسم «Predicate Information» في خطة التنفيذ ما تفعله قاعدة بيانات Oracle:

```
filter( INTERNAL_FUNCTION(SALE_DATE)
   LIKE TO_CHAR(SYSDATE@!))
```

تحوّل الدالة [`INTERNAL_FUNCTION`](https://tanelpoder.com/2013/01/16/what-the-heck-is-the-internal_function-in-execution-plan-predicate-section/) نوع العمود `SALE_DATE`. وكأثر جانبي، تمنع أيضاً استخدام فهرس مباشر على `DATE_COLUMN` *تماماً كما تفعل أي دالة أخرى*.
