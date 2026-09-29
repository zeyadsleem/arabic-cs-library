---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/mysql/getting-an-execution-plan
---

ضع `explain` قبل عبارة SQL لاسترجاع خطة التنفيذ.

```
EXPLAIN SELECT 1
```

وتُعرض الخطة في صورة جدولية (مع حذف بعض الأعمدة الأقل أهمية):

```
~+-------+------+---------------+------+~+------+------------~
~| table | type | possible_keys | key  |~| rows | Extra
~+-------+------+---------------+------+~+------+------------~
~| NULL  | NULL | NULL          | NULL |~| NULL | No tables...
~+-------+------+---------------+------+~+------+------------~
```

وأهم المعلومات في عمود `TYPE`. ومع أن وثائق MySQL تسميه «نوع الربط»، أفضّل وصفه بأنه «نوع الوصول» لأنه يحدد فعلاً كيفية الوصول إلى البيانات. ويُشرح معنى قيمة النوع في القسم التالي.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mysql-get&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).
