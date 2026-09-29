---
title: "سكربتات أمثلة Oracle لـ«الترتيب والتجميع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/sorting-grouping
---

يحتوي هذا القسم على شيفرة `create` و`insert` وPL/SQL لتشغيل أمثلة [الفصل 6*الترتيب والتجميع*](/book/use-the-index-luke/sql-sorting-grouping/index) في قاعدة بيانات Oracle 11gR2.

## `order by` المفهرس

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 ORDER BY product_id
```

وجمع إحصاءات جديدة ممارسة جيدة بعد تغيير الفهارس:

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SALES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```

## `group by` المفهرس

توجد مشكلة خاصة في قاعدة بيانات Oracle (من 11g إلى 19c على الأقل) تظهر عند ترتيب النتيجة المجمَّعة بترتيب الفهرس المعاكس:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
 ORDER BY product_id DESC;
```

مع أنها تستطيع استخدام الفهرس عند الترتيب بترتيب الفهرس:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
 ORDER BY product_id ASC;
```

ولا يوجد حل معروف لهذه المشكلة.
