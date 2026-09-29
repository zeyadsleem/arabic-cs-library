---
title: "خطط التنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan
---

قبل أن تستطيع قاعدة البيانات تنفيذ عبارة SQL، يجب على المُحسِّن إنشاء خطة تنفيذ لها. ثم تنفّذ قاعدة البيانات هذه الخطة خطوة بخطوة. ومن هذه الناحية، يشبه المُحسِّن المترجمَ كثيراً لأنه يترجم الشيفرة المصدرية (عبارة SQL) إلى برنامج قابل للتنفيذ (خطة التنفيذ).

وخطة التنفيذ هي أول ما تبحث فيه عند البحث عن سبب بطء العبارات. وتشرح الأقسام التالية كيفية استرجاع خطة تنفيذ وقراءتها لتحسين الأداء في قواعد بيانات مختلفة.

## المحتويات

1. *[Db2 (LUW)](/book/use-the-index-luke/sql-explain-plan-db2/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-db2-operations/index)* • *[مُسندات الوصول مقابل الترشيح](/book/use-the-index-luke/sql-explain-plan-db2-filter-predicates/index)*
2. *[MySQL](/book/use-the-index-luke/sql-explain-plan-mysql/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-mysql-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-mysql-operations/index)* • *[مُسندات الوصول مقابل الترشيح](/book/use-the-index-luke/sql-explain-plan-mysql-access-filter-predicates/index)*
3. *[Oracle](/book/use-the-index-luke/sql-explain-plan-oracle/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-oracle-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-oracle-operations/index)* • *[مُسندات الوصول مقابل الترشيح](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index)*
4. *[PostgreSQL](/book/use-the-index-luke/sql-explain-plan-postgresql/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-postgresql-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-postgresql-operations/index)* • *[مُسندات الوصول مقابل الترشيح](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index)*
5. *[SQL Server](/book/use-the-index-luke/sql-explain-plan-sql-server/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-sql-server-operations/index)* • *[مُسندات الوصول مقابل الترشيح](/book/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates/index)*
6. *[SQLite](/book/use-the-index-luke/sql-explain-plan-sqlite/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-sqlite-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-sqlite-operations/index)*
7. *[Gupta SQLBase](/book/use-the-index-luke/sql-explain-plan-sqlbase/index)* : *[الاسترجاع](/book/use-the-index-luke/sql-explain-plan-sqlbase-getting-an-execution-plan/index)* • *[العمليات](/book/use-the-index-luke/sql-explain-plan-sqlbase-operations/index)*
