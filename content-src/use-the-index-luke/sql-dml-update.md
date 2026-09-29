---
title: "Update"
lang: en
---

An `update` statement must relocate the changed index entries to maintain the index order. For that, the database must remove the old entry and add the new one at the new location. The response time is basically the same as for the respective `delete` and `insert` statements together.

The `update` performance, just like `insert` and `delete`, also depends on the number of indexes on the table. The only difference is that `update` statements do not necessarily affect all columns because they often modify only a few selected columns. Consequently, an `update` statement does not necessarily affect all indexes on the table but only those that contain updated columns.

[Figure 8.3](#fig-update) shows the response time for two `update` statements: one that sets all columns and affects all indexes and then a second one that updates a single column so it affects only one index.

Figure 8.3 Update Performance by Indexes and Column Count

The `update` on all columns shows the same pattern we have already observed in the [previous sections](/sql/dml/insert): the response time grows with each additional index. The response time of the `update` statement that affects only one index does not increase so much because it leaves most indexes unchanged.

To optimize `update` performance, you must take care to only update those columns that were changed. This is obvious if you write the `update` statement manually. ORM tools, however, might generate `update` statements that set all columns every time. Hibernate, for example, does this when disabling the [*dynamic-update mode*](https://docs.hibernate.org/orm/6.2/userguide/html_single/#pc-managed-state-dynamic-update). Since version 4.0, this mode is enabled by default.

When using ORM tools, it is a good practice to occasionally enable query logging in a development environment to verify the generated SQL statements. The tip entitled [“*Enabling SQL Logging*”](/sql/join/nested-loops-join-n1-problem#tip-orm-log-sql) has a short overview of how to enable SQL logging in some widely used ORM tools.

#### Think About It

Can you think of a case where `insert` or `delete` statements do not affect all indexes of a table?
