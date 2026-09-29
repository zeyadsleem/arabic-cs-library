---
title: "SQL Server Scripts for “Insert, Delete and Update”"
lang: en
---

This section contains the `create` and `insert` statements to run the examples from [Chapter 8*Modifying Data*](/sql/dml) in an SQL Server database. There is only one query that reports all figures for the `insert`, `delete` and `update` sections.

```sql
WITH generate_series_1k(n) AS (
   SELECT 0
    UNION ALL
   SELECT n + 1
     FROM generate_series_1k
    WHERE N + 1 < 10000
), generate_series(n, n1, n2) AS (
   SELECT gs2.n * 1000 + gs1.n, gs1.n, gs2.n
     FROM generate_series_1k gs1, 
          generate_series_1k gs2
    WHERE gs1.n < 1000
)
SELECT n id1
     , CAST(CEILING(ABS(CAST(NEWID() AS BINARY(6)) % 900000))
       + 100000 AS numeric) id2
     , CAST(CEILING(ABS(CAST(NEWID() AS BINARY(6)) % 900000))
       + 100000 AS numeric) id3
     , CAST(CEILING(ABS(CAST(NEWID() AS BINARY(6)) % 900000))
       + 100000 AS numeric) id4
     , CAST(CEILING(ABS(CAST(NEWID() AS BINARY(6)) % 900000))
       + 100000 AS numeric) id5
  INTO scale_write_0
  FROM generate_series
OPTION(MAXRECURSION 32767);
GO

SELECT *
  INTO scale_write_1
  FROM scale_write_0;
GO

SELECT *
  INTO scale_write_2
  FROM scale_write_0;
GO

SELECT *
  INTO scale_write_3
  FROM scale_write_0;
GO

SELECT *
  INTO scale_write_4
  FROM scale_write_0;
GO

SELECT *
  INTO scale_write_5
  FROM scale_write_0;
GO

CREATE INDEX scale_write_1_1 on scale_write_1(id1);
GO

CREATE INDEX scale_write_2_1 on scale_write_2(id1);
GO
CREATE INDEX scale_write_2_2 on scale_write_2(id2, id1);
GO

CREATE INDEX scale_write_3_1 on scale_write_3(id1);
GO
CREATE INDEX scale_write_3_2 on scale_write_3(id2, id1);
GO
CREATE INDEX scale_write_3_3 on scale_write_3(id3, id2, id1);
GO

CREATE INDEX scale_write_4_1 on scale_write_4(id1);
GO
CREATE INDEX scale_write_4_2 on scale_write_4(id2, id1);
GO
CREATE INDEX scale_write_4_3 on scale_write_4(id3, id2, id1);
GO
CREATE INDEX scale_write_4_4 on scale_write_4(id4, id3, id2
                                             ,id1);
GO

CREATE INDEX scale_write_5_1 on scale_write_5(id1);
GO
CREATE INDEX scale_write_5_2 on scale_write_5(id2, id1);
GO
CREATE INDEX scale_write_5_3 on scale_write_5(id3, id2, id1);
GO
CREATE INDEX scale_write_5_4 on scale_write_5(id4, id3, id2
                                             ,id1);
GO
CREATE INDEX scale_write_5_5 on scale_write_5(id5, id4, id3
                                             ,id2, id1);
GO
```

```sql
CREATE PROCEDURE 
run_insert(@idxes INT, @q INT, @n INT, @mode VARCHAR(64) OUT)
AS BEGIN
DECLARE @r2  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r3  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r4  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r5  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @d1  INT;
  WHILE (@n > 0) BEGIN
  SET @d1 = CEILING(rand() * @q);
  IF @idxes = 0 
         INSERT INTO scale_write_0 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  ELSE IF @idxes = 1
         INSERT INTO scale_write_1 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  ELSE IF @idxes = 2 
         INSERT INTO scale_write_2 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  ELSE IF @idxes = 3
         INSERT INTO scale_write_3 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  ELSE IF @idxes = 4
         INSERT INTO scale_write_4 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  ELSE IF @idxes = 5 
         INSERT INTO scale_write_5 (id1, id2, id3, id4, id5)
                            VALUES (@d1, @r2, @r3, @r4, @r5);
  SET @n = @n - 1;
  END;
  SET @mode = 'insert';
END;
go

CREATE PROCEDURE
run_delete(@idxes INT, @q INT, @n INT, @mode VARCHAR(64) OUT)
AS BEGIN
DECLARE @cnt INT = @n;
DECLARE @aff INT = 0;
DECLARE @d1  INT;
  WHILE (@cnt >0) BEGIN
  SET @d1 = CEILING(rand() * @q) + @q;
  IF @idxes = 1  
         DELETE FROM scale_write_1 WHERE id1 = @d1;
  ELSE IF @idxes = 2 
         DELETE FROM scale_write_2 WHERE id1 = @d1;
  ELSE IF @idxes = 3 
         DELETE FROM scale_write_3 WHERE id1 = @d1;
  ELSE IF @idxes = 4 
         DELETE FROM scale_write_4 WHERE id1 = @d1;
  ELSE IF @idxes = 5 
         DELETE FROM scale_write_5 WHERE id1 = @d1;
  SET @aff = @aff + @@ROWCOUNT;
  SET @cnt = @cnt - 1;
  END;  
  SET @mode = CASE WHEN @aff = @n THEN 'delete' ELSE NULL END;
END;

go

CREATE PROCEDURE
run_update_all(@idxes INT, @q INT, @n INT, @mode VARCHAR(64) OUT)
AS BEGIN
DECLARE @r2  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r3  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r4  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @r5  INT = CEILING(rand() * 9000000)+1000000;
DECLARE @cnt INT = @n;
DECLARE @aff INT = 0;
DECLARE @d1  INT;
  WHILE (@cnt >0) BEGIN
    SET @d1 = CEILING(rand() * @q) + 2 * @q;
    IF @idxes = 1 
       UPDATE scale_write_1
          SET id2=@r2, id3=@r3, id4=@r4, id5=@r5 WHERE id1=@d1;
    ELSE IF @idxes = 2 
       UPDATE scale_write_2
          SET id2=@r2, id3=@r3, id4=@r4, id5=@r5 WHERE id1=@d1;
    ELSE IF @idxes = 3 
       UPDATE scale_write_3
          SET id2=@r2, id3=@r3, id4=@r4, id5=@r5 WHERE id1=@d1;
    ELSE IF @idxes = 4 
       UPDATE scale_write_4
          SET id2=@r2, id3=@r3, id4=@r4, id5=@r5 WHERE id1=@d1;
    ELSE IF @idxes = 5 
       UPDATE scale_write_5
          SET id2=@r2, id3=@r3, id4=@r4, id5=@r5 WHERE id1=@d1;

    SET @aff = @aff + @@ROWCOUNT;
    SET @cnt = @cnt - 1;
  END;  
  SET @mode = CASE WHEN @aff = @n THEN 'update all'
                   ELSE NULL END;
END;
go

CREATE PROCEDURE
run_update_one(@idxes INT, @q INT, @n INT, @mode VARCHAR(64) OUT)
AS BEGIN
DECLARE @r2 INT = CEILING(rand() * 9000000)+1000000;
DECLARE @cnt INT = @n;
DECLARE @aff INT = 0;
DECLARE @d1  INT;
  WHILE (@cnt >0) BEGIN
    SET @d1 = CEILING(rand() * @q) + 3 * @q;
    IF @idxes = 1 -- no index updated
           UPDATE scale_write_1 SET id2 = @r2 WHERE id1=@d1;
    ELSE IF @idxes = 2 -- one index updated
           UPDATE scale_write_2 SET id2 = @r2 WHERE id1=@d1;  
    ELSE IF @idxes = 3 -- one index updated
           UPDATE scale_write_3 SET id3 = @r2 WHERE id1=@d1;
    ELSE IF @idxes = 4 -- one index updated
         UPDATE scale_write_4 SET id4 = @r2 WHERE id1=@d1; 
    ELSE IF @idxes = 5 -- one index updated
         UPDATE scale_write_5 SET id5 = @r2 WHERE id1=@d1;
    ELSE SET @aff = 0;
    SET @mode = CASE WHEN @@ROWCOUNT = 1 THEN 'update one'
                     ELSE NULL END;
    SET @aff = @aff + @@ROWCOUNT;
    SET @cnt = @cnt - 1;
  END;  
  SET @mode = CASE WHEN @aff = @n THEN 'update one'
                   ELSE NULL END;
END;
go

CREATE PROCEDURE
test_write_scalability (@n int, @inner int)
AS BEGIN
DECLARE @iter INT;
DECLARE @indxs  INT;
DECLARE @strt DATETIME2;
DECLARE @dur  NUMERIC;
DECLARE @cmnd INT;
DECLARE @q    INT;
DECLARE @c1   VARCHAR(64);
DECLARE @table TABLE
( indxes  NUMERIC NOT NULL,
  mode    VARCHAR(64) NOT NULL,
  seconds NUMERIC NOT NULL,
  cnt     NUMERIC NOT NULL);

  SELECT @q = (max(id1) - min(id1))/4 FROM scale_write_1;
  SET @iter = 0;
  WHILE (@iter < @n) BEGIN
    SET @cmnd = 0;
    WHILE (@cmnd <= 3) BEGIN
      SET @indxs = 0;
      WHILE (@indxs <= 5) BEGIN
        SET @strt = SYSDATETIME();
        IF (@cmnd = 0)
           exec [dbo].run_insert     @indxs, @q, @inner
                                   , @mode=@c1 OUTPUT;
        ELSE IF (@cmnd = 1) 
           exec [dbo].run_update_all @indxs, @q, @inner
                                   , @mode=@c1 OUTPUT;
        ELSE IF (@cmnd = 2) 
           exec [dbo].run_update_one @indxs, @q, @inner
                                   , @mode=@c1 OUTPUT;
        ELSE IF (@cmnd = 3) BEGIN
           exec [dbo].run_delete     @indxs, @q, @inner
                                   , @mode=@c1 OUTPUT;
        END;

        SET @dur = datediff(microsecond, @strt, SYSDATETIME());
        IF @c1 IS NOT NULL
        BEGIN
          INSERT INTO @table
          VALUES (@indxs, @c1, @dur, 1);
        END;
        SET @indxs = @indxs +1;
      END;
      SET @cmnd = @cmnd +1;
    END;
    SET @iter = @iter + 1;
  END;
  SELECT indxes, mode, seconds, cnt from @table;
END;
```

```sql
SET NOCOUNT ON;

CREATE TABLE #res (
  indxes  NUMERIC NOT NULL,
  mode    VARCHAR(64) NOT NULL,
  seconds NUMERIC NOT NULL,
  cnt     NUMERIC NOT NULL); 
GO

INSERT INTO #res
EXEC test_write_scalability 1000;
go

SELECT indxes, [insert], [delete], [update all], [update one]
  FROM (SELECT indxes, mode, seconds/1000000 seconds
          FROM #res
       ) x
         PIVOT (AVG(seconds)
           FOR mode
            IN ([insert],[delete],[update all],[update one]))
            AS AvgExecTime
 ORDER BY indxes;
```
