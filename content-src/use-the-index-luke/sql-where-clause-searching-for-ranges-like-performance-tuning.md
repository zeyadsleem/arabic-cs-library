---
title: "Indexing `LIKE` Filters"
lang: en
---

The SQL `LIKE` operator very often causes unexpected performance behavior because some search terms prevent efficient index usage. That means that there are search terms that can be indexed very well, but others can not. It is the position of the wild card characters that makes all the difference.

The following example uses the `%` wild card in the middle of the search term:

```sql
SELECT first_name, last_name, date_of_birth
  FROM employees
 WHERE UPPER(last_name) LIKE 'WIN%D'
```

Db2 (LUW)

```
Explain Plan
----------------------------------------------------
ID | Operation         |                 Rows | Cost
 1 | RETURN            |                      |   13
 2 |  FETCH EMPLOYEES  |     1 of 1 (100.00%) |   13
 3 |   IXSCAN EMP_NAME | 1 of 10000 (   .01%) |    6

Predicate Information
 3 - START ('WIN....................................
      STOP (Q1.LAST_NAME <= 'WIN....................
      SARG (Q1.LAST_NAME LIKE 'WIN%D')
```

For this example, the query was changed to read `WHERE last_name LIKE 'WIN%D'` (no `UPPER`). It seems like Db2 (LUW) 10.5 cannot use an access predicates from `LIKE` on a function-based index (does a full index scan at best).

Otherwise, Db2 shines here: it clearly shows the `START` and `STOP` conditions, which consist of the part before the first wild card, but also shows that the full pattern is applied as filter predicate.

MySQL

```
+----+-----------+-------+----------+---------+------+-------------+
| id | table     | type  | key      | key_len | rows | Extra       |
+----+-----------+-------+----------+---------+------+-------------+
|  1 | employees | range | emp_name | 767     |    2 | Using where |
+----+-----------+-------+----------+---------+------+-------------+
```

Oracle

```
---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |    1 |    4 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    4 |
|*2 |   INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(UPPER("LAST_NAME") LIKE 'WIN%D')
       filter(UPPER("LAST_NAME") LIKE 'WIN%D')
```

PostgreSQL

```
                       QUERY PLAN
----------------------------------------------------------
Index Scan using emp_up_name on employees
   (cost=0.01..8.29 rows=1 width=17)
   Index Cond: (upper((last_name)::text) ~>=~ 'WIN'::text)
           AND (upper((last_name)::text) ~<~  'WIO'::text)
       Filter: (upper((last_name)::text) ~~ 'WIN%D'::text)
```

`LIKE` filters can only use the characters *before the first wild card* during tree traversal. The remaining characters are just filter predicates that do not narrow the scanned index range. A single `LIKE` expression can therefore contain two predicate types: (1) the part before the first wild card as an access predicate; (2) the other characters as a filter predicate.

#### Caution

The `LIKE` operator works on a character-by-character basis while collations can treat multiple characters as a single sorting item. Thus some collations prevent using indexes for `LIKE`. Read [Indexing “LIKE” in PostgreSQL and Oracle](https://www.cybertec-postgresql.com/en/indexing-like-postgresql-oracle/) by Laurenz Albe for further details.

The more selective the prefix before the first wild card is, the smaller the scanned index range becomes. That, in turn, makes the index lookup faster. [Figure 2.4](#fig-like) illustrates this relationship using three different `LIKE` expressions. All three select the same row, but the scanned index range—and thus the performance—is very different.

Figure 2.4 Various `LIKE` Searches

The first expression has two characters before the wild card. They limit the scanned index range to 18 rows. Only one of them matches the entire `LIKE` expression—the other 17 are fetched but discarded. The second expression has a longer prefix that narrows the scanned index range down to two rows. With this expression, the database just reads one extra row that is not relevant for the result. The last expression does not have a filter predicate at all: the database just reads the entry that matches the entire `LIKE` expression.

#### Important

Only the part before the first wild card serves as an access predicate.

The remaining characters do not narrow the scanned index range—non-matching entries are just left out of the result.

The opposite case is also possible: a `LIKE` expression that starts with a wild card. Such a `LIKE` expression cannot serve as an access predicate. The database has to scan the entire table if there are no other conditions that provide access predicates.

#### Tip

Avoid `LIKE` expressions with leading wildcards (e.g., `'%TERM'`).

The position of the wild card characters affects index usage—at least in theory. In reality the optimizer creates a generic execution plan when the search term is supplied via [bind parameters](/sql/where-clause/bind-parameters). In that case, the optimizer has to guess whether or not the majority of executions will have a leading wild card.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-like&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Most databases just assume that there is no leading wild card when optimizing a `LIKE` condition with bind parameter, but this assumption is wrong if the `LIKE` expression is used for a full-text search. There is, unfortunately, no direct way to tag a `LIKE` condition as full-text search. The box [“*Labeling Full-Text `LIKE` Expressions*”](#sb-static-like-prefix) shows an attempt that does not work. Specifying the search term without bind parameter is the most obvious solution, but that increases the optimization overhead and opens an SQL injection vulnerability. An effective but still secure and portable solution is to intentionally obfuscate the `LIKE` condition. [“*Combining Columns*”](/sql/where-clause/obfuscation/concatenation) explains this in detail.

## Labeling Full-Text `LIKE` Expressions

When using the `LIKE` operator for a full-text search, we could separate the wildcards from the search term:

```
WHERE text_column LIKE '%' || ? || '%'
```

For the PostgreSQL database, the problem is different because PostgreSQL assumes there *is* a leading wild card when using bind parameters for a `LIKE` expression. PostgreSQL just does not use an index in that case. The only way to get an index access for a `LIKE` expression is to make the actual search term visible to the optimizer. If you do not use a bind parameter but put the search term directly into the SQL statement, you must take other precautions against SQL injection attacks!

Even if the database optimizes the execution plan for a leading wild card, it can still deliver insufficient performance. You can use another part of the `where` clause to access the data efficiently in that case—see also [“*Index Filter Predicates Used Intentionally*”](/sql/clustering/index-filter-predicates). If there is no other access path, you might use one of the following proprietary full-text index solutions.

Db2 (LUW)

Db2 supports the `contains` keyword. See “[Search functions for Db2 Text Search](https://www.ibm.com/docs/en/db2/11.5.x?topic=indexes-search-functions)“.

MySQL

MySQL offers the `match` and `against` keywords for full-text searching. Starting with MySQL 5.6, you can create full-text indexes for InnoDB tables as well—previously, this was only possible with MyISAM tables. See “[Full-Text Search Functions](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)” in the MySQL documentation.

Oracle

The Oracle database offers the `contains` keyword. See the “[Oracle Text Application Developer’s Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/ccapp/#Oracle%C2%AE-Text).”

PostgreSQL

PostgreSQL offers the `@@` operator to implement full-text searches. See “[Full Text Search](https://www.postgresql.org/docs/current/textsearch.html)” in the PostgreSQL documentation.

Another option is to use the [WildSpeed](http://www.sai.msu.su/~megera/wiki/wildspeed) extension to optimize `LIKE` expressions directly. The extension stores the text in all possible rotations so that each character is at the beginning once. That means that the indexed text is not only stored once but instead as many times as there are characters in the string—thus it needs a lot of space.

SQL Server

SQL Server offers the `contains` keyword. See “[Full-Text Search](https://learn.microsoft.com/en-us/sql/relational-databases/search/full-text-search?view=sql-server-ver16)” in the SQL Server documentation.

#### Think About It

How can you index a `LIKE` search that has only one wild card at the beginning of the search term (`'%TERM'`)?
