---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/db2/getting-an-execution-plan
---

الحصول على خطة تنفيذ من Db2 (LUW) إجراء من ثلاث خطوات، أولها إعداد يُنفَّذ مرة واحدة.

## إنشاء الجداول المطلوبة (مرة واحدة)

الطريقة الموصى بها لإنشاء جداول الشرح المطلوبة هي استدعاء هذا الإجراء:

```
CALL SYSPROC.SYSINSTALLOBJECTS('EXPLAIN', 'C', 
CAST (NULL AS VARCHAR(128)), CAST (NULL AS VARCHAR(128)))
```

وسيثبّت هذا الجداول المطلوبة في المخطط `SYSTOOLS` (مثل `SYSTOOLS.EXPLAIN_STREAM`).

وتُشرح إجراءات التثبيت البديلة والتخصيصات في [الوثائق](https://www.ibm.com/docs/en/db2/11.5.x?topic=sql-explain-tables).

## شرح العبارة

سبق أي عبارة SQL بـ`explain plan for` لتخزين تفاصيل خطة التنفيذ في جداول الشرح.

ولا تُظهر هذه الخطوة خطة التنفيذ بعد؛ وإنما تخزّنها في قاعدة البيانات فقط.

```
EXPLAIN PLAN FOR SELECT 1 FROM sysibm.sysdummy1
```

## عرض خطة التنفيذ المخزنة

تقدّم IBM بعض [الأدوات لعرض البيانات المخزنة في جداول الشرح](https://www.ibm.com/docs/en/db2/11.5.x?topic=facility-tools-collecting-analyzing-explain-information). غير أن صيغة الخرج ليست بالجدوى الممكنة، لذا أستخدم استعلام SQL خاصاً بي لعرض المعلومات التي تهمني عادةً. ووثائق Db2 توصي بذلك فعلاً.

تجد أدناه تعريف العرض `last_explained` الذي يعيد خطة شرح منسَّقة لآخر عبارة شُرحت للمستخدم الحالي في قاعدة البيانات هذه. يرجى ملاحظة أن نطاقه لا يقتصر على الجلسة الحالية. ويمكن استخدام العرض ببساطة هكذا:

```sql
SELECT * FROM last_explained
```

وقد تبدو النتيجة هكذا. ويحتوي [القسم التالي](/book/use-the-index-luke/sql-explain-plan-db2-operations/index) تفاصيل كيفية تفسيرها.

```
Explain Plan                                                                                        
----------------------------------------------
ID | Operation      |             Rows | Cost                                                       
 1 | RETURN         |                  |    0                                                       
 2 |  TBSCAN GENROW | 1 of 1 (100.00%) |    0                                                       
                                                                                                    
Predicate Information                                                                               
                                                                                                    
Explain plan by Markus Winand - NO WARRANTY                                                         
http://use-the-index-luke.com/s/last_explained
```

#### تحذير

هذا العرض تجريبي للغاية، ويُقدَّم كما هو دون أي ضمان. وقد وسّعته Ember Crooks ليشمل ActualRows إن توفرت. اقرأ [مقالها](https://datageek.blog/2014/11/18/db2-explain-output-similar-to-other-rdbmses/) لتعرف كيفية جمعها.

يفترض العرض أن جداول الشرح في المخطط `SYSTOOLS`. وإذا كنت تستخدم مخططاً مختلفاً، فيجب تعديل العرض أدناه يدوياً.

الحد الأدنى للمتطلبات: Db2 (LUW) 9.7 FixPack 4

#### نصيحة

العرض متاح على [GitHub](https://github.com/fatalmind/DB2-last-explained) ([تنزيل مباشر](https://raw.githubusercontent.com/fatalmind/DB2-last-explained/master/last_explained.sql)).

```sql
-- Copyright (c) 2014-2017, Markus Winand - NO WARRANTY
-- Modifications by Ember Crooks - NO WARRANTY
-- Info & license: http://use-the-index-luke.com/s/last_explained
--
--#SET TERMINATOR ;

CREATE OR REPLACE VIEW last_explained AS
WITH tree(operator_ID, level, path, explain_time, cycle)
AS
(
SELECT 1 operator_id 
     , 0 level
     , CAST('001' AS VARCHAR(1000)) path
     , max(explain_time) explain_time
     , 0
  FROM SYSTOOLS.EXPLAIN_OPERATOR O
 WHERE O.EXPLAIN_REQUESTER = SESSION_USER

UNION ALL

SELECT s.source_id
     , level + 1
     , tree.path || '/' || LPAD(CAST(s.source_id AS VARCHAR(3)), 3, '0')  path
     , tree.explain_time
     , POSITION('/' || LPAD(CAST(s.source_id AS VARCHAR(3)), 3, '0')  || '/' IN path USING OCTETS)
  FROM tree
     , SYSTOOLS.EXPLAIN_STREAM S
 WHERE s.target_id    = tree.operator_id
   AND s.explain_time = tree.explain_time
   AND S.Object_Name IS NULL
   AND S.explain_requester = SESSION_USER
   AND tree.cycle = 0
   AND level < 100
)
SELECT * 
  FROM (
SELECT "Explain Plan"
  FROM (
SELECT CAST(   LPAD(id,        MAX(LENGTH(id))        OVER(), ' ')
            || ' | ' 
            || RPAD(operation, MAX(LENGTH(operation)) OVER(), ' ')
            || ' | ' 
            || LPAD(rows,      MAX(LENGTH(rows))      OVER(), ' ')
            || ' | ' 
            -- Don't show ActualRows columns if there are no actuals available at all 
            || CASE WHEN COUNT(ActualRows) OVER () > 1 -- the heading 'ActualRows' is always present, so "1" means no OTHER values
                    THEN LPAD(ActualRows, MAX(LENGTH(ActualRows)) OVER(), ' ') || ' | ' 
                    ELSE ''
               END
            || LPAD(cost,      MAX(LENGTH(cost))      OVER(), ' ')
         AS VARCHAR(100)) "Explain Plan"
     , path
  FROM (
SELECT 'ID' ID
     , 'Operation' Operation
     , 'Rows' Rows
     , 'ActualRows' ActualRows
     , 'Cost' Cost
     , '0' Path
  FROM SYSIBM.SYSDUMMY1
-- TODO: UNION ALL yields duplicate. where do they come from?
UNION
SELECT CAST(tree.operator_id as VARCHAR(254)) ID
     , CAST(LPAD(' ', tree.level, ' ')
       || CASE WHEN tree.cycle = 1
               THEN '(cycle) '
               ELSE ''
          END     
       || COALESCE (
             TRIM(O.Operator_Type)
          || COALESCE(' (' || argument || ')', '') 
          || ' '
          || COALESCE(S.Object_Name,'')
          , ''
          )
       AS VARCHAR(254)) AS OPERATION
     , COALESCE(CAST(rows AS VARCHAR(254)), '') Rows
     , CAST(ActualRows as VARCHAR(254)) ActualRows -- note: no coalesce
     , COALESCE(CAST(CAST(O.Total_Cost AS BIGINT) AS VARCHAR(254)), '') Cost
     , path
  FROM tree
  LEFT JOIN ( SELECT i.source_id
              , i.target_id
              , CAST(CAST(ROUND(o.stream_count) AS BIGINT) AS VARCHAR(12))
                || ' of '
                || CAST (total_rows AS VARCHAR(12))
                || CASE WHEN total_rows > 0
                         AND ROUND(o.stream_count) <= total_rows THEN
                   ' ('
                   || LPAD(CAST (ROUND(ROUND(o.stream_count)/total_rows*100,2)
                          AS NUMERIC(5,2)), 6, ' ')
                   || '%)'
                   ELSE ''
                   END rows
              , CASE WHEN act.actual_value is not null then
                CAST(CAST(ROUND(act.actual_value) AS BIGINT) AS VARCHAR(12))
                || ' of '
                || CAST (total_rows AS VARCHAR(12))
                || CASE WHEN total_rows > 0 THEN
                   ' ('
                   || LPAD(CAST (ROUND(ROUND(act.actual_value)/total_rows*100,2)
                          AS NUMERIC(5,2)), 6, ' ')
                   || '%)'
                   ELSE NULL
                   END END ActualRows
              , i.object_name
              , i.explain_time
         FROM (SELECT MAX(source_id) source_id
                    , target_id
                    , MIN(CAST(ROUND(stream_count,0) AS BIGINT)) total_rows
                    , CAST(LISTAGG(object_name) AS VARCHAR(50)) object_name
                    , explain_time
                 FROM SYSTOOLS.EXPLAIN_STREAM
                WHERE explain_time = (SELECT MAX(explain_time)
                                        FROM SYSTOOLS.EXPLAIN_OPERATOR
                                       WHERE EXPLAIN_REQUESTER = SESSION_USER
                                     )
                GROUP BY target_id, explain_time
              ) I
         LEFT JOIN SYSTOOLS.EXPLAIN_STREAM O
           ON (    I.target_id=o.source_id
               AND I.explain_time = o.explain_time
               AND O.EXPLAIN_REQUESTER = SESSION_USER
              )
         LEFT JOIN SYSTOOLS.EXPLAIN_ACTUALS act
           ON (    act.operator_id  = i.target_id
               AND act.explain_time = i.explain_time
               AND act.explain_requester = SESSION_USER
               AND act.ACTUAL_TYPE  like 'CARDINALITY%'
              )
       ) s
    ON (    s.target_id    = tree.operator_id
        AND s.explain_time = tree.explain_time
       )
  LEFT JOIN SYSTOOLS.EXPLAIN_OPERATOR O
    ON (    o.operator_id  = tree.operator_id
        AND o.explain_time = tree.explain_time
        AND o.explain_requester = SESSION_USER
       ) 
  LEFT JOIN (SELECT LISTAGG (CASE argument_type
                             WHEN 'UNIQUE' THEN
                                  CASE WHEN argument_value = 'TRUE'
                                       THEN 'UNIQUE'
                                  ELSE NULL
                                  END
                             WHEN 'TRUNCSRT' THEN
                                  CASE WHEN argument_value = 'TRUE'
                                       THEN 'TOP-N'
                                  ELSE NULL
                                  END   
                             WHEN 'SCANDIR' THEN
                                  CASE WHEN argument_value != 'FORWARD'
                                       THEN argument_value
                                  ELSE NULL
                                  END                     
                             ELSE argument_value     
                             END
                           , ' ') argument
                  , operator_id
                  , explain_time
               FROM SYSTOOLS.EXPLAIN_ARGUMENT EA
              WHERE argument_type IN ('AGGMODE'   -- GRPBY
                                     , 'UNIQUE', 'TRUNCSRT' -- SORT
                                     , 'SCANDIR' -- IXSCAN, TBSCAN
                                     , 'OUTERJN' -- JOINs
                                     )
                AND explain_requester = SESSION_USER
              GROUP BY explain_time, operator_id

            ) A
    ON (    a.operator_id  = tree.operator_id
        AND a.explain_time = tree.explain_time
       )
     ) O
UNION ALL
VALUES ('Explain plan (c) 2014-2017 by Markus Winand - NO WARRANTY - V20171102','Z0')
    ,  ('Modifications by Ember Crooks - NO WARRANTY','Z1')
    ,  ('http://use-the-index-luke.com/s/last_explained','Z2')
    ,  ('', 'A')
    ,  ('', 'Y')
    ,  ('Predicate Information', 'AA')
UNION ALL
SELECT CAST (LPAD(CASE WHEN operator_id = LAG  (operator_id)
                                          OVER (PARTITION BY operator_id
                                                    ORDER BY pred_order
                                               )
                       THEN ''
                       ELSE operator_id || ' - '
                  END
                , MAX(LENGTH(operator_id )+4) OVER()
                , ' ')
             || how_applied
             || ' ' 
             || predicate_text
          AS VARCHAR(100)) "Predicate Information"
     , 'P' || LPAD(id_order, 5, '0') || pred_order path
  FROM (SELECT CAST(operator_id AS VARCHAR(254)) operator_id
             , LPAD(trim(how_applied)
                  ,  MAX (LENGTH(TRIM(how_applied)))
                    OVER (PARTITION BY operator_id)
                  , ' '
               ) how_applied
               -- next: capped to length 80 to avoid
               -- SQL0445W  Value "..." has been truncated.  SQLSTATE=01004
               -- error when long literal values may appear (space padded!)
             , CAST(substr(predicate_text, 1, 80) AS VARCHAR(80)) predicate_text
             , CASE how_applied WHEN 'START' THEN '1'
                                WHEN 'STOP'  THEN '2'
                                WHEN 'SARG'  THEN '3'
                                ELSE '9'
               END pred_order
             , operator_id id_order
          FROM systools.explain_predicate p
         WHERE explain_time = (SELECT MAX(explain_time)
                                 FROM systools.explain_operator)
       )
)
ORDER BY path
);
```

مهام يجب إنجازها:

- معرّف المعامل يعطي حالياً معرّف المعامل الفيزيائي كما هو مخزّن في جداول الشرح. وقد يكون الأنسب عرض رقم سطر كما تفعل Oracle DBMS_XPLAN ليكون العثور على معرّف معيّن أسهل.
- الإشارة إلى وجود المُسندات بنجمة بجانب معرّف العملية كما تفعل DBMS_PLAN في Oracle. وقد يكون جيداً أيضاً الإشارة إلى وجود مُسندات ترشيح باستخدام محرف آخر (مثل !). وستكون ميزات أكثر تطوراً ممكنة: *وجود مُسندَي START وSTOP >وجود START دون مُسند STOP <وجود STOP دون مُسند START !وجود مُسند SARG (إضافةً إلى !).
- دالة استدلالية للإشارة إلى جمل Top-N: إذا انخفض عدد الصفوف لعملية TBSCAN أو IXSCAN دون وجود مُسندات، فلا بد أن يكون حد Top-N. وهذا المنطق ناقص بالطبع.
