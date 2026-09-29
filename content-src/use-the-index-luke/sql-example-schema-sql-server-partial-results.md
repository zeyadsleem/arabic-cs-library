---
title: "SQL Server Scripts for “Partial Results”"
lang: en
---

This section contains the `create` and `insert` statements to run the examples from [Chapter 7*Partial Results*](/sql/partial-results) in an SQL Server database.

## Querying Top-N Rows

The test approach for the scalability of Top-N queries is the same as used in the “[Testing and Scalability](/sql/example-schema/sql-server/performance-testing-scalability)” chapter.

```sql
CREATE FUNCTION [dbo].test_top_n_scalability (@n int)
   RETURNS @table TABLE
( section  NUMERIC NOT NULL PRIMARY KEY,
  duration NUMERIC NOT NULL,
  rows     NUMERIC NOT NULL)
AS BEGIN
   DECLARE @strt DATETIME2
   DECLARE @iter INT
   DECLARE @xsec INT
   DECLARE @xcnt INT
   DECLARE @xrnd INT

   SET @iter = 0
   WHILE (@iter < @n) BEGIN
      SET @xsec = 0
      WHILE (@xsec < 300) BEGIN
         SET @strt = SYSDATETIME()

         SELECT @xcnt = COUNT(*)
           FROM (SELECT TOP 100 *
                   FROM scale_data
                  WHERE section=@xsec
                  ORDER BY id2) tlb; 

         IF @iter = 0 BEGIN
           INSERT INTO @table
           VALUES ( @xsec
                  , datediff(microsecond, @strt, SYSDATETIME())
                  , @xcnt);
         END; ELSE BEGIN
           UPDATE @table
              SET duration = duration 
                  + datediff(microsecond, @strt, SYSDATETIME())
                , rows = rows + @xcnt
            WHERE section = @xsec
         END;
         SET @xsec = @xsec + 1
      END;
      SET @iter = @iter + 1
   END;

   RETURN;
END;

GO
```

First, using a pipelined Top-N with an index covering the `order by` clause:

```sql
CREATE INDEX scale_fast ON scale_data(section, id2, id1);
GO

SELECT * FROM [dbo].[test_top_n_scalability] (10);
GO
```

Then, using an index for the `where` clause only. However, SQL Server refuses to use the index unless it includes the ID2 column. So, it is not exactly the same test case as for the other databases, but it still shows the scalability.

```sql
DROP INDEX scale_fast ON scale_data;
GO

CREATE INDEX scale_slow ON scale_data(section, id1, id2);
GO

SELECT * FROM [dbo].[test_top_n_scalability] (10);
GO
```

## Paging Through Results

```sql
CREATE FUNCTION [dbo].test_topn_scalability (@n int)
   RETURNS @table TABLE
( section NUMERIC NOT NULL,
  mode    NUMERIC NOT NULL,
  page    NUMERIC NOT NULL,
  seconds NUMERIC NOT NULL)
AS BEGIN
  DECLARE @strt DATETIME2
  DECLARE @iter INT
  DECLARE @xmde INT
  DECLARE @page INT
  DECLARE @xsec INT
  DECLARE @c1 INT, @c2 INT;
  DECLARE @cont TABLE (
    section int NOT NULL,
    c1      int NOT NULL, 
    c2      int NOT NULL
  );

  SET @iter = 0
  WHILE (@iter < @n) BEGIN
    SET @xmde = 0
    WHILE (@xmde <= 1) BEGIN
      SET @page = 0
      WHILE (@page <= 100) BEGIN
        SET @xsec = 5
        WHILE (@xsec < 300) BEGIN
          SET @strt = SYSDATETIME()

          IF @xmde = 0 OR @page = 0 BEGIN
            DECLARE sql CURSOR FAST_FORWARD FOR
             SELECT id2, id1
               FROM (SELECT id2, id1
                          , ROW_NUMBER() OVER (ORDER BY id2, id1) rn
                       FROM scale_data
                      WHERE section = @xsec
                    ) result
              WHERE rn >  100 * (@page  )
                AND rn <= 100 * (@page+1);
         
          END; ELSE BEGIN
            SELECT @c2 = c2, @c1 = c1 FROM @cont WHERE section = @xsec;
            DECLARE sql CURSOR FAST_FORWARD FOR
             SELECT TOP 100 id2, id1
               FROM scale_data
              WHERE section = @xsec
                AND id2 >= @c2
                AND ( 
                       (id2 = @c2 AND id1 > @c1)
                    OR 
                       (id2 > @c2)
                    )
              ORDER BY id2, id1
          END;

          OPEN sql; FETCH NEXT FROM sql INTO @c2, @c1;
          WHILE @@FETCH_STATUS = 0 BEGIN
            FETCH NEXT FROM sql INTO @c2, @c1;
          END
          CLOSE sql; DEALLOCATE sql;

          INSERT INTO @table
          VALUES ( @xsec
                 , @xmde
                 , @page
                 , datediff(microsecond, @strt, SYSDATETIME())
                 );
          UPDATE @cont set c1 = @c1, c2 = @c2
           WHERE section = @xsec;
          IF @@ROWCOUNT = 0
           INSERT INTO @cont VALUES(@xsec, @c1, @c2);
          SET @xsec = @xsec + 1
        END;
        SET @page = @page + 1
      END;
      SET @xmde = @xmde + 1
    END;
    SET @iter = @iter + 1
  END;

  RETURN;
END;
GO

SELECT section, mode, page, sum(seconds)
  FROM [dbo].[test_topn_scalability] (10)
 WHERE section=10
 GROUP BY section, mode, page
 ORDER BY section, mode, page;
GO
```

## Window-Functions

SQL Server 2008R2 utilizes the index to implement a pipelined Top-N query when using the window-Function `ROW_NUMBER`:

```sql
SELECT *
  FROM ( SELECT sales.*
              , ROW_NUMBER() OVER (ORDER BY sale_date DESC
                                          , sale_id   DESC) rn
           FROM sales
       ) tmp
 WHERE rn between 11 and 20
 ORDER BY sale_date DESC, sale_id DESC
```

```
|-Sort(ORDER BY:([sale_date] DESC, [sale_id] DESC))
  |-Filter(WHERE:([Expr1004]>=(11) AND [Expr1004]<=(20)))
    |-Top(TOP EXPRESSION:(20))
      |-Sequence Project(DEFINE:([Expr1004]=row_number))
        |-Segment
          |-Nested Loops(Inner Join, WITH ORDERED PREFETCH)
            |-Index Scan([sales].[sl_dtid], ORDERED BACKWARD)
            |-RID Lookup([sales],
               SEEK:([Bmk1000]=[Bmk1000])
               LOOKUP ORDERED FORWARD)
```

SQL Server reads the index backwards, so that it doesn’t need an sort operation for the window function. The Top-Step aborts the operations below it, as soon as 20 rows arrived. The last two steps, shown first in the execution plan, filter the leading 10 rows off and sorts the remaining result. This sort operation will just sort ten rows, so it is not going to be a performance problem.
