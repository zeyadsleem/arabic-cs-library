---
title: "Functions"
lang: en
---

The index on `LAST_NAME` has improved the performance considerably, but it requires you to search using the same case (upper/lower) as is stored in the database. This section explains how to lift this restriction without a decrease in performance.

Db2 (LUW)

Db2 supports function based indexes on [zOS](https://www.ibm.com/docs/en/db2-for-zos/13.0.0?topic=statements-create-index) for a while, but only [since version 10.5 on LUW](https://www.ibm.com/docs/en/db2/11.5.x?topic=statements-create-index#sdx-synid_key-expression). The use of user-defined functions in indexes is not allowed.

The backup solution is to create a real column in the table that holds the result of the function or expression. The column must be maintained by a trigger or by the application layer—whatever is more appropriate. The new column can be indexed. The `where` clause must use the new column (without the expression).

MySQL

MySQL is case-insensitive by default, but that can be [controlled on column level](https://dev.mysql.com/doc/refman/8.0/en/case-sensitivity.html). Starting with version 5.7 MySQL can create indexes on [generated columns](https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html).

The backup solution for older versions is to create a real column in the table that holds the result of the function or expression. The column must be maintained by a trigger or by the application layer—whatever is more appropriate. The new column can be indexed. The `where` clause must use the new column (without the expression).

Oracle

The Oracle database supports function-based indexes since release 8*i*. Virtual columns were additionally added with 11*g*.

PostgreSQL

PostgreSQL fully supports [Indexes on Expressions](https://www.postgresql.org/docs/current/indexes-expressional.html) since release 7.4 (partially supported since 7.2)

SQL Server

SQL Server supports [Computed Columns](https://learn.microsoft.com/en-us/sql/relational-databases/tables/specify-computed-columns-in-a-table?view=sql-server-ver16) that can be indexed since release 2000.

## Contents

1. *[Case-Insensitive Search](/sql/where-clause/functions/case-insensitive-search)* — `UPPER` and `LOWER`
2. *[User-Defined Functions](/sql/where-clause/functions/user-defined-functions)* — Limitations of function-based indexes
3. *[Over-Indexing](/sql/where-clause/functions/over-indexing)* — Avoid redundancy
