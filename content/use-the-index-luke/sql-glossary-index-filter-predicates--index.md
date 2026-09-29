---
title: "مُسندات ترشيح الفهرس"
lang: ar
source: https://use-the-index-luke.com/sql/glossary/index-filter-predicates
---

هناك طريقتان مختلفتان تستخدم بهما قواعد البيانات الفهارس لتطبيق جمل `where` (المُسندات):

- كـ*مُسندات وصول (access predicates)*: تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ[اجتياز العقد الورقية](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index).
- كـ*مُسندات ترشيح (filter predicates)*: تُطبَّق مُسندات الترشيح أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.

#### مهم

مُسندات الوصول والترشيح سمات لعمليات خطة الشرح — لا سمات للفهرس.

ويعني ذلك أن جمل `where` مختلفة يمكن أن تستخدم مُسندات وصول وترشيح مختلفة على الفهرس نفسه.

#### روابط

- [مُسندات الوصول والترشيح في الفهرس مشروحة بمثال](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index)
- [بيان أثر مُسندات ترشيح الفهرس العَرَضية](/book/use-the-index-luke/sql-testing-scalability-data-volume/index)
- [لماذا لا تُعدّ عمليات بحث `LIKE` في أي موضع مُسندات وصول](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index)
- [مُسندات ترشيح الفهرس المستخدمة عمداً](/book/use-the-index-luke/sql-clustering-index-filter-predicates/index)
- كيف تكتشف مُسندات ترشيح الفهرس في خطط التنفيذ لدى [Oracle](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index) و[PostgreSQL](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index) و[SQL Server](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index).
