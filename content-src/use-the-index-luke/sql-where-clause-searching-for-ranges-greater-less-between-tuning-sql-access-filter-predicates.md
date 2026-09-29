---
title: "Greater, Less and `BETWEEN`"
lang: en
---

The biggest performance risk of an `INDEX RANGE SCAN` is the [leaf node traversal](/sql/anatomy/the-leaf-nodes). It is therefore the golden rule of indexing to keep the scanned index range as small as possible. You can check that by asking yourself where an index scan starts and where it ends.

The question is easy to answer if the SQL statement mentions the start and stop conditions explicitly:

```sql
SELECT first_name, last_name, date_of_birth
  FROM employees
 WHERE date_of_birth >= TO_DATE(?, 'YYYY-MM-DD')
   AND date_of_birth <= TO_DATE(?, 'YYYY-MM-DD')
```

An index on `DATE_OF_BIRTH` is only scanned in the specified range. The scan starts at the first date and ends at the second. We cannot narrow the scanned index range any further.

The start and stop conditions are less obvious if a second column becomes involved:

```sql
SELECT first_name, last_name, date_of_birth
  FROM employees
 WHERE date_of_birth >= TO_DATE(?, 'YYYY-MM-DD')
   AND date_of_birth <= TO_DATE(?, 'YYYY-MM-DD')
   AND subsidiary_id  = ?
```

Of course an ideal index has to cover both columns, but the question is in which order?

The following figures show the effect of the column order on the scanned index range. For this illustration we search all employees of subsidiary 27 who were born between January 1st and January 9th 1971.

[Figure 2.2](#fig-range-bad) visualizes a detail of the index on `DATE_OF_BIRTH` and `SUBSIDIARY_ID`—in that order. Where will the database start to follow the leaf node chain, or to put it another way: where will the [tree traversal](/sql/anatomy/the-tree) end?

Figure 2.2 Range Scan in `DATE_OF_BIRTH`, `SUBSIDIARY_ID` Index

The index is ordered by birth dates first. Only if two employees were born on the same day is the `SUBSIDIARY_ID` used to sort these records. The query, however, covers a date *range*. The ordering of `SUBSIDIARY_ID` is therefore useless during tree traversal. That becomes obvious if you realize that there is no entry for subsidiary 27 in the branch nodes—although there is one in the leaf nodes. The filter on `DATE_OF_BIRTH` is therefore the only condition that limits the scanned index range. It starts at the first entry matching the date range and ends at the last one—all five leaf nodes shown in [Figure 2.2](#fig-range-bad).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-greater-less-between&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The picture looks entirely different when reversing the column order. [Figure 2.3](#fig-range-good) illustrates the scan if the index starts with the `SUBSIDIARY_ID` column.

Figure 2.3 Range Scan in `SUBSIDIARY_ID`, `DATE_OF_BIRTH` Index

The difference is that the equals operator limits the first index column to a single value. Within the range for this value (`SUBSIDIARY_ID` 27) the index is sorted according to the second column—the date of birth—so there is no need to visit the first leaf node because the branch node already indicates that there is no employee for subsidiary 27 born after June 25th 1969 in the first leaf node.

The tree traversal directly leads to the second leaf node. In this case, all `where` clause conditions limit the scanned index range so that the scan terminates at the very same leaf node.

#### Tip

Rule of thumb: index for equality first—then for ranges.

The actual performance difference depends on the data and search criteria. The difference can be negligible if the filter on `DATE_OF_BIRTH` is very selective on its own. The bigger the date range becomes, the bigger the performance difference will be.

With this example, we can also falsify the myth that the most selective column should be at the leftmost index position. If we look at the figures and consider the selectivity of the first column only, we see that both conditions match 13 records. This is the case regardless whether we filter by `DATE_OF_BIRTH` only or by `SUBSIDIARY_ID` only. The selectivity is of no use here, but one column order is still better than the other.

To optimize performance, it is very important to know the scanned index range. With most databases you can even see this in the execution plan—you just have to know what to look for. The following execution plan from the Oracle database unambiguously indicates that the `EMP_TEST` index starts with the `DATE_OF_BIRTH` column.

Db2 (LUW)

```
Explain Plan
----------------------------------------------------
ID | Operation         |                 Rows | Cost
 1 | RETURN            |                      |   26
 2 |  FETCH EMPLOYEES  |     3 of 3 (100.00%) |   26
 3 |   IXSCAN EMP_TEST | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START ( TO_DATE(?, 'YYYY-MM-DD') <= Q1.DATE_OF_BIRTH)
     START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH <= TO_DATE(?, 'YYYY-MM-DD'))
      STOP (Q1.SUBSIDIARY_ID = ?)
      SARG (Q1.SUBSIDIARY_ID = ?)
```

In Db2 access predicates are labeled `START` and/or `STOP` while filter predicates are marked shown as `SARG`.

Oracle

```
--------------------------------------------------------------
|Id | Operation                    | Name      | Rows | Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT             |           |    1 |    4 |
|*1 |  FILTER                      |           |      |      |
| 2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    4 |
|*3 |    INDEX RANGE SCAN          | EMP_TEST  |    2 |    2 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT >= :START_DT)
3 - access(DATE_OF_BIRTH >= :START_DT 
       AND DATE_OF_BIRTH <= :END_DT)
    filter(SUBSIDIARY_ID  = :SUBS_ID)
```

PostgreSQL

```
                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
  (cost=0.01..8.59 rows=1 width=16)
  Index Cond: (date_of_birth >= to_date('1971-01-01','YYYY-MM-DD'))
          AND (date_of_birth <= to_date('1971-01-10','YYYY-MM-DD'))
          AND (subsidiary_id = 27::numeric)
```

The PostgreSQL database does not indicate index access and filter predicates in the execution plan. However, the `Index Cond` section lists the columns in order of the index definition. In that case, we see the two `DATE_OF_BIRTH` predicates first, than the `SUBSIDIARY_ID`. Knowing that any predicates following a range condition cannot be an access predicate the `SUBSIDIARY_ID` must be a filter predicate. See [*Distinguishing Access and Filter-Predicates*](/sql/explain-plan/postgresql/filter-predicates) for more details.

SQL Server

```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK:       (date_of_birth, subsidiary_id)
   |                        >= ('1971-01-01', 27)
   |                    AND    (date_of_birth, subsidiary_id)
   |                        <= ('1971-01-10', 27),
   |              WHERE:subsidiary_id=27
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```

SQL Server 2012 shows the seek predicates (=access predicates) using the [row-value syntax](/sql/partial-results/fetch-next-page#sb-row-values).

The *predicate information* for the `INDEX RANGE SCAN` gives the crucial hint. It identifies the conditions of the `where` clause either as *access* or as *filter* predicates. This is how the database tells us how it uses each condition.

#### Note

The execution plan was simplified for clarity. [The appendix](/sql/explain-plan/oracle/filter-predicates) explains the details of the “Predicate Information” section in an Oracle execution plan.

The conditions on the `DATE_OF_BIRTH` column are the only ones listed as access predicates; they limit the scanned index range. The `DATE_OF_BIRTH` is therefore the first column in the `EMP_TEST` index. The `SUBSIDIARY_ID` column is used only as a filter.

#### Important

The *access predicates* are the start and stop conditions for an index lookup. They define the scanned index range.

*Index filter predicates* are applied during the [leaf node traversal](/sql/anatomy/the-leaf-nodes) only. They do not narrow the scanned index range.

The appendix explains how to recognize access predicates in [MySQL](/sql/explain-plan/mysql/access-filter-predicates), [SQL Server](/sql/explain-plan/sql-server/filter-predicates) and [PostgreSQL](/sql/explain-plan/postgresql/filter-predicates).

The database can use all conditions as access predicates if we turn the index definition around:

Db2 (LUW)

```
-----------------------------------------------------
ID | Operation          |                 Rows | Cost
 1 | RETURN             |                      |   13
 2 |  FETCH EMPLOYEES   |     3 of 3 (100.00%) |   13
 3 |   IXSCAN EMP_TEST2 | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
     START ( TO_DATE(?, 'YYYY-MM-DD') <= Q1.DATE_OF_BIRTH)
      STOP (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH <= TO_DATE(?, 'YYYY-MM-DD'))
```

Oracle

```
---------------------------------------------------------------
| Id | Operation                    | Name      | Rows | Cost |
---------------------------------------------------------------
|  0 | SELECT STATEMENT             |           |    1 |    3 |
|* 1 |  FILTER                      |           |      |      |
|  2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    3 |
|* 3 |    INDEX RANGE SCAN          | EMP_TEST2 |    1 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT >= :START_DT)
3 - access(SUBSIDIARY_ID  = :SUBS_ID
       AND DATE_OF_BIRTH >= :START_DT
       AND DATE_OF_BIRTH <= :END_T)
```

PostgreSQL

```
                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
   (cost=0.01..8.29 rows=1 width=17)
   Index Cond: (subsidiary_id = 27::numeric)
           AND (date_of_birth >= to_date('1971-01-01', 'YYYY-MM-DD'))
           AND (date_of_birth <= to_date('1971-01-10', 'YYYY-MM-DD'))
```

The PostgreSQL database does not indicate index access and filter predicates in the execution plan. However, the `Index Cond` section lists the columns in order of the index definition. In that case, we see the `SUBSIDIARY_ID` predicate first, than the two on `DATE_OF_BIRTH`. As there is no further column filtered after the range condition on `DATE_OF_BIRTH` we know that all predicates can be used as access predicate. See [*Distinguishing Access and Filter-Predicates*](/sql/explain-plan/postgresql/filter-predicates) for more details.

SQL Server

```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK: subsidiary_id=27
   |                 AND date_of_birth >= '1971-01-01'
   |                 AND date_of_birth <= '1971-01-10'
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees),
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```

Finally, there is the `between` operator. It allows you to specify the upper and lower bounds in a single condition:

```
DATE_OF_BIRTH BETWEEN '01-JAN-71'
                  AND '10-JAN-71'
```

Note that `between` always includes the specified values, just like using the less than or equal to (`=`) operators:

```
    DATE_OF_BIRTH >= '01-JAN-71' 
AND DATE_OF_BIRTH <= '10-JAN-71'
```
