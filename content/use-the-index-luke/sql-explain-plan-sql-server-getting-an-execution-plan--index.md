---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/sql-server/getting-an-execution-plan
---

مع SQL Server، توجد طرق عدة لجلب خطة تنفيذ. وأهم طريقتين هما:

رسومياً

يسهل الوصول إلى التمثيل الرسومي لخطط تنفيذ SQL Server في Management Studio، لكن يصعب مشاركته لأن معلومات المُسندات لا تظهر إلا عند تمرير الفأرة فوق العملية المعنية («hover»).

جدولياً

يصعب قراءة خطة التنفيذ الجدولية لكن يسهل نسخها، لأنها تعرض جميع المعلومات ذات الصلة دفعة واحدة.

## رسومياً

تُنشأ خطة الشرح الرسومية بأحد الزرين المميزين أدناه.

![](https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-0-mssql_ssms_explain_button.vqQzQh6C.webp)

يشرح الزر الأيسر العبارة المميزة مباشرةً، أما الأيمن فيلتقط الخطة في المرة التالية التي تُنفَّذ فيها عبارة SQL.

وفي الحالتين، يظهر التمثيل الرسومي لخطة التنفيذ في تبويب «Execution plan» في لوحة «Results».

![](https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-1-mssql_ssms_explain.p0Ulm-iw.webp)

يسهل قراءة التمثيل الرسومي بقليل من التدريب. ومع ذلك، فهو يعرض المعلومات الأساسية فقط: العمليات والجدول أو الفهرس الذي تعمل عليه.

ويعرض Management Studio معلومات إضافية عند تمرير الفأرة فوق عملية (mouseover/hover). وهذا ما يجعل مشاركة خطة تنفيذ بكل تفاصيلها صعباً.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-mssql&utm_medium=web&utm_content=ap-explain-mssql-gra)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## جدولياً

يُسترجَع التمثيل الجدولي لخطة تنفيذ SQL Server بتنميط تنفيذ عبارة. ويُمكّنه الأمر التالي:

```
SET STATISTICS PROFILE ON
```

وبمجرد تمكينه، تنتج كل عبارة تُنفَّذ مجموعة نتائج إضافية. فعبارات `select` مثلاً تنتج مجموعتَي نتائج — نتيجة العبارة أولاً ثم خطة التنفيذ.

ويكاد التمثيل الجدولي لخطة التنفيذ يكون غير قابل للاستخدام في SQL Server Management Studio لأن `StmtText` أعرض من أن يتسع له أي شاشة.

![](https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-2-mssql_ssms_explain_table.6KapJiT5.webp)

وميزة هذا التمثيل أنه يمكن نسخه دون فقدان أي معلومات ذات صلة. وهذا مفيد جداً إذا أردت نشر خطة تنفيذ SQL Server في منتدى أو منصة مشابهة. وفي هذه الحالة يكفي غالباً نسخ عمود `StmtText` وإعادة تنسيقه قليلاً:

```sql
select COUNT(*) from employees;
  |--Compute Scalar(DEFINE:([Expr1004]=CONVERT_IMPLICIT(...))
       |--Stream Aggregate(DEFINE:([Expr1005]=Count(*)))
            |--Index Scan(OBJECT:([employees].[employees_pk]))
```

وأخيراً، يمكنك تعطيل التنميط مرة أخرى:

```
SET STATISTICS PROFILE OFF
```
