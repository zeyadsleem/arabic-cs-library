---
title: "Getting an Execution Plan"
lang: en
---

Put `explain` in front of an SQL statement to retrieve the execution plan.

```
EXPLAIN SELECT 1
```

The plan is shown in tabular form (some less important columns removed):

```
~+-------+------+---------------+------+~+------+------------~
~| table | type | possible_keys | key  |~| rows | Extra
~+-------+------+---------------+------+~+------+------------~
~| NULL  | NULL | NULL          | NULL |~| NULL | No tables...
~+-------+------+---------------+------+~+------+------------~
```

The most important information is in the `TYPE` column. Although the MySQL documentation refers to it as “join type”, I prefer to describe it as “access type” because it actually specifies how the data is accessed. The meaning of the type value is described in the next section.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mysql-get&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).
