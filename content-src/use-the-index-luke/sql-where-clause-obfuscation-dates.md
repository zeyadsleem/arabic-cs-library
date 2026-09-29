---
title: "Date Types"
lang: en
---

Most obfuscations involve `DATE` types. The Oracle database is particularly vulnerable in this respect because it has only one `DATE` type that always includes a time component as well.

It has become common practice to use the `TRUNC` function to remove the time component. In truth, it does not remove the time but instead sets it to midnight because the Oracle database has no pure `DATE` type. To disregard the time component for a search you can use the `TRUNC` function on both sides of the comparison—e.g., to search for yesterday’s sales:

```sql
SELECT ...
  FROM sales
 WHERE TRUNC(sale_date) = TRUNC(sysdate - INTERVAL '1' DAY)
```

It is a perfectly valid and correct statement but it cannot properly make use of an index on `SALE_DATE`. It is as explained in [“*Case-Insensitive Search Using `UPPER` or `LOWER`*”](/sql/where-clause/functions/case-insensitive-search); `TRUNC(sale_date)` is something entirely different from `SALE_DATE`—functions are black boxes to the database.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obfuscated-dates&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

There is a rather simple solution for this problem: a [function-based index](/sql/where-clause/functions).

```sql
CREATE INDEX index_name
          ON sales (TRUNC(sale_date))
```

But then you must always use `TRUNC(sale_date)` in the `where` clause. If you use it inconsistently—sometimes with, sometimes without `TRUNC`—then you need two indexes!

The problem also occurs with databases that have a pure date type if you search for a longer period as shown in the following MySQL query:

```sql
SELECT ...
  FROM sales
 WHERE DATE_FORMAT(sale_date, "%Y-%M")
     = DATE_FORMAT(now()    , "%Y-%M")
```

The query uses a date format that only contains year and month: again, this is an absolutely correct query that has the same problem as before. However the solution from above does not apply to MySQL prior to version 5.7, because MySQL didn’t support function-based indexing before that version.

The alternative is to use an explicit range condition. This is a generic solution that works for all databases:

```sql
SELECT ...
  FROM sales
 WHERE sale_date BETWEEN quarter_begin(?) 
                     AND quarter_end(?)
```

If you have done your homework, you probably recognize the pattern from the [exercise about all employees who are 42 years old](/sql/where-clause/functions/user-defined-functions#think-age-index).

A straight index on `SALE_DATE` is enough to optimize this query. The functions `QUARTER_BEGIN` and `QUARTER_END` compute the boundary dates. The calculation can become a little complex because the [`between` operator always includes the boundary values](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates#para-between). The `QUARTER_END` function must therefore return a time stamp just before the first day of the next quarter if the `SALE_DATE` has a time component. This logic can be hidden in the function.

The following examples show implementations of the functions `QUARTER_BEGIN` and `QUARTER_END` for various databases.

Db2 (LUW)

```sql
CREATE FUNCTION quarter_begin(dt TIMESTAMP)
RETURNS TIMESTAMP
RETURN TRUNC(dt, 'Q')
```

```sql
CREATE FUNCTION quarter_end(dt TIMESTAMP)
RETURNS TIMESTAMP
RETURN TRUNC(dt, 'Q') + 3 MONTHS - 1 SECOND
```

MySQL

```sql
CREATE FUNCTION quarter_begin(dt DATETIME)
RETURNS DATETIME DETERMINISTIC
RETURN CONVERT
       (
         CONCAT
         ( CONVERT(YEAR(dt),CHAR(4))
         , '-'
         , CONVERT(QUARTER(dt)*3-2,CHAR(2))
         , '-01'
         )
       , datetime
       )
```

```sql
CREATE FUNCTION quarter_end(dt DATETIME)
RETURNS DATETIME DETERMINISTIC
RETURN DATE_ADD
       ( DATE_ADD ( quarter_begin(dt), INTERVAL 3 MONTH )
       , INTERVAL -1 MICROSECOND)
```

Oracle

```sql
CREATE FUNCTION quarter_begin(dt IN DATE) 
RETURN DATE
AS
BEGIN
   RETURN TRUNC(dt, 'Q');
END
```

```sql
CREATE FUNCTION quarter_end(dt IN DATE) 
RETURN DATE
AS
BEGIN
   -- the Oracle DATE type has seconds resolution
   -- subtract one second from the first 
   -- day of the following quarter
   RETURN TRUNC(ADD_MONTHS(dt, +3), 'Q') 
        - (1/(24*60*60));
END
```

PostgreSQL

```sql
CREATE FUNCTION quarter_begin(dt timestamp with time zone)
RETURNS timestamp with time zone AS $$
BEGIN
    RETURN date_trunc('quarter', dt);
END;
$$ LANGUAGE plpgsql
```

```sql
CREATE FUNCTION quarter_end(dt timestamp with time zone)
RETURNS timestamp with time zone AS $$
BEGIN
   RETURN   date_trunc('quarter', dt) 
          + interval '3 month'
          - interval '1 microsecond';
END;
$$ LANGUAGE plpgsql
```

SQL Server

```sql
CREATE FUNCTION quarter_begin (@dt DATETIME )
RETURNS DATETIME
BEGIN
  RETURN DATEADD (qq, DATEDIFF (qq, 0, @dt), 0)  
END
```

```sql
CREATE FUNCTION quarter_end (@dt DATETIME )
RETURNS DATETIME
BEGIN
  RETURN DATEADD
         ( ms
         , -3 
         , DATEADD(mm, 3, dbo.quarter_begin(@dt))
         );
END
```

You can use similar auxiliary functions for other periods—most of them will be less complex than the examples above, especially when using greater than or equal to (`>=`) and less than (`<`) conditions instead of the `between` operator. Of course you could calculate the boundary dates in your application if you wish.

#### Tip

Write queries for continuous periods as explicit range condition. Do this even for a single day—e.g., for the Oracle database:

```
    sale_date >= TRUNC(sysdate)
AND sale_date <  TRUNC(sysdate + INTERVAL '1' DAY)
```

Another common obfuscation is to compare dates as strings as shown in the following PostgreSQL example:

```sql
SELECT ...
  FROM sales
 WHERE TO_CHAR(sale_date, 'YYYY-MM-DD') = '1970-01-01'
```

The problem is, again, converting `SALE_DATE`. Such conditions are often created in the belief that you cannot pass different types than numbers and strings to the database. [Bind parameters](/sql/where-clause/bind-parameters), however, support all data types. That means you can for example use a `java.util.Date` object as bind parameter. This is yet another benefit of bind parameters.

If you cannot do that, you just have to convert the search term instead of the table column:

```sql
SELECT ...
  FROM sales
 WHERE sale_date = TO_DATE('1970-01-01', 'YYYY-MM-DD')
```

This query can use a straight index on `SALE_DATE`. Moreover it converts the input string only once. The previous statement must convert all dates stored in the table before it can compare them against the search term.

Whatever change you make—using a bind parameter or converting the other side of the comparison—you can easily introduce a bug if `SALE_DATE` has a time component. You must use an explicit range condition in that case:

```sql
SELECT ...
  FROM sales
 WHERE sale_date >= TO_DATE('1970-01-01', 'YYYY-MM-DD') 
   AND sale_date <  TO_DATE('1970-01-01', 'YYYY-MM-DD') 
                  + INTERVAL '1' DAY
```

Always consider using an explicit range condition when comparing dates.

## `LIKE` on Date Types

The following obfuscation is particularly tricky:

```
sale_date LIKE SYSDATE
```

It does not look like an obfuscation at first glance because it does not use any functions.

The `LIKE` operator, however, enforces a string comparison. Depending on the database, that might yield an error or cause an implicit type conversion on both sides. The “Predicate Information” section of the execution plan shows what the Oracle database does:

```
filter( INTERNAL_FUNCTION(SALE_DATE)
   LIKE TO_CHAR(SYSDATE@!))
```

The function [`INTERNAL_FUNCTION`](https://tanelpoder.com/2013/01/16/what-the-heck-is-the-internal_function-in-execution-plan-predicate-section/) converts the type of the `SALE_DATE` column. As a side effect it also prevents using a straight index on `DATE_COLUMN` *just as any other function would*.
