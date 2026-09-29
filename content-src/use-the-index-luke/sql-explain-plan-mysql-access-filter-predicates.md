---
title: "Distinguishing Access and Filter-Predicates"
lang: en
---

The MySQL database uses three different ways to evaluate `where` clauses (predicates):

Access predicate (“key_len”, “ref” columns)

The access predicates express the start and stop conditions of the [leaf node traversal](/sql/anatomy/the-leaf-nodes).

Index filter predicate (“Using index condition”, since MySQL 5.6)

Index filter predicates are applied during the leaf node traversal only. They do not contribute to the start and stop conditions and do not narrow the scanned range.

Table level filter predicate (“Using where” in the “Extra” column)

Predicates on columns which are not part of the index are evaluated on the table level. For that to happen, the database must load the row from the table first.

MySQL execution plans do not show which predicate types are used for each condition—they just list the predicate types in use.

In the following example, the entire `where` clause is used as access predicate:

```sql
CREATE TABLE demo (
   id1 NUMERIC
 , id2 NUMERIC
 , id3 NUMERIC
 , val NUMERIC)
```

```sql
INSERT INTO demo VALUES (1,1,1,1)
```

```sql
INSERT INTO demo VALUES (2,2,2,2)
```

```sql
CREATE INDEX demo_idx
          ON demo
             (id1, id2, id3)
```

```
EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id2=1
```

```javascript
+------+----------+---------+-------------+------+-------+
| type | key      | key_len | ref         | rows | Extra |
+------+----------+---------+-------------+------+-------+
| ref  | demo_idx | 12      | const,const |    1 |       |
+------+----------+---------+-------------+------+-------+
```

There is no “Using where” or “Using index condition” shown in the “Extra” column. The index is, however, used (`type=ref, key=demo_idx`) so you can assume that the entire `where` clause qualifies as access predicate.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-my-filter&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Please also note that the `ref` column indicates that two columns are used from the index (both are query constants in this example). Another way to confirm which part of the index is used is the `key_len` value: It shows that the query uses the first 12 bytes of the index definition. To map this to column names, you “just” need to know how much storage space each column needs (see “[Data Type Storage Requirements](https://dev.mysql.com/doc/refman/8.0/en/storage-requirements.html)” in the MySQL documentation). In absence of a `NOT NULL` constraint, MySQL needs an extra byte for each column. After all, each `NUMERIC` column needs 6 bytes in the example. Therefore, the key length of 12 confirms that the first two index columns are used as access predicates.

When filtering with the `ID3` column (instead of the `ID2)` MySQL 5.6 and later use an index filter predicate (“Using index condition”):

```
EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id3=1
```

```javascript
+------+----------+---------+-------+------+-----------------------+
| type | key      | key_len | ref   | rows | Extra                 |
+------+----------+---------+-------+------+-----------------------+
| ref  | demo_idx | 6       | const |    1 | Using index condition |
+------+----------+---------+-------+------+-----------------------+
```

In this case, the `ken_len=6` and only one `const` in the `ref` column means only one index column is used as access predicate.

Previous versions of MySQL used a table level filter predicate for this query—identified by “Using where” in the “Extra” column:

```javascript
+------+----------+---------+-------+------+-------------+
| type | key      | key_len | ref   | rows | Extra       |
+------+----------+---------+-------+------+-------------+
| ref  | demo_idx | 6       | const |    1 | Using where |
+------+----------+---------+-------+------+-------------+
```

#### Tip

- The section [“*Greater, Less and `BETWEEN`*”](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates) explains the difference between access and index filter predicates by example.
- [Chapter 3, “*Performance and Scalability*”](/sql/testing-scalability), demonstrates the performance difference access and index filter predicates make.
