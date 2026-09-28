---
title: "Foreign Data Wrapper"
lang: en
---

# 4.1. Overview

To utilize the FDW feature, the appropriate extension must be installed, and setup commands such as [CREATE FOREIGN TABLE](https://www.postgresql.org/docs/current/static/sql-createforeigntable.html), [CREATE SERVER](https://www.postgresql.org/docs/current/static/sql-createserver.html) and [CREATE USER MAPPING](https://www.postgresql.org/docs/current/static/sql-createusermapping.html). (For details, refer to the [official documentation](https://www.postgresql.org/docs/current/static/postgres-fdw.html).)

Once the configuration is complete, the functions defined in the extension are invoked during query processing to access the foreign tables.

Figure 4.2 briefly describes the FDW execution process in PostgreSQL.

![](/images/postgres-internals/pgsql04-fig-4-02.webp)

#### Figure 4.2. How FDWs perform.

- (1) **Analysis:** The analyzer/analyser creates a query tree from the input SQL.
- (2) **Connection:** The planner (or executor) establishes a connection to the remote server.
- (3) **Cost Estimation:** If the [use_remote_estimate](https://www.postgresql.org/docs/current/static/postgres-fdw.html#id-1.11.7.43.10.4) option is ‘on’ (the default is ‘off’), the planner executes EXPLAIN commands on the remote server to estimate the cost of each plan path.
- (4) **Deparsing:** The planner generates a plain text SQL statement from the plan tree; this process is internally referred to as **deparsing**.
- (5) **Execution:** The executor sends the plain text SQL statement to the remote server and receives the results.

The executor then processes the received data as necessary. For instance, if a multi-table query is executed, the executor performs join processing between the received remote data and other local or foreign tables.

The details of these processes are described in the following sections.

Section Contents

- 4.1.1. Creation of a Query Tree
- 4.1.2. Establishing a Connection to the Remote Server
- 4.1.3. Cost Estimation via Remote EXPLAIN (Optional)
- 4.1.4. Deparesing
- 4.1.5. Execution and Result Retrieval

## 4.1.1. Creation of a Query Tree

The analyzer creates the query tree of the input SQL by utilizing the definitions of the foreign tables. These definitions are stored in the [pg_catalog.pg_class](https://www.postgresql.org/docs/current/static/catalog-pg-class.html) and [pg_catalog.pg_foreign_table](https://www.postgresql.org/docs/current/static/catalog-pg-foreign-table.html) catalogs, which are populated via the [CREATE FOREIGN TABLE](https://www.postgresql.org/docs/current/static/sql-createforeigntable.html) or [IMPORT FOREIGN SCHEMA](https://www.postgresql.org/docs/current/static/sql-importforeignschema.html) commands.

## 4.1.2. Establishing a Connection to the Remote Server

To establish a connection, the planner (or executor) utilizes a library specific to the remote database type. For instance, postgres_fdw uses the [libpq](https://www.postgresql.org/docs/current/static/libpq.html) library to connect to remote PostgreSQL servers. Similarly, the [mysql_fdw](https://github.com/EnterpriseDB/mysql_fdw) extension utilizes the libmysqlclient library to connect to MySQL servers.

The connection parameters &mdash; including the username, server IP address, and port number &mdash; are stored in the [pg_catalog.pg_user_mapping](https://www.postgresql.org/docs/current/static/catalog-pg-user-mapping.html) and [pg_catalog.pg_foreign_server](https://www.postgresql.org/docs/current/static/catalog-pg-foreign-server.html) catalogs. These parameters are defined using the [CREATE USER MAPPING](https://www.postgresql.org/docs/current/static/sql-createusermapping.html) and [CREATE SERVER](https://www.postgresql.org/docs/current/static/sql-createserver.html) commands.

## 4.1.3. Cost Estimation via Remote EXPLAIN (Optional)

PostgreSQL’s FDW feature supports obtaining statistics from foreign tables to improve the creation of a query plan. Several FDW extensions, such as postgres_fdw, mysql_fdw, tds_fdw, and jdbc2_fdw, utilize these statistics.

If the ‘use_remote_estimate’ option is set to ‘on’ via the [ALTER SERVER](https://www.postgresql.org/docs/current/static/sql-alterserver.html) command, the planner requests plan costs from the remote server by executing the EXPLAIN command. Otherwise, the planner relies on default embedded constant values for cost estimation.

```
localdb=# ALTER SERVER remote_server_name OPTIONS (use_remote_estimate 'on');
```

While several extensions attempt to use remote EXPLAIN values, postgres_fdw is uniquely capable of accurately reflecting these results because the PostgreSQL EXPLAIN command provides both start-up and total costs.

In contrast, the EXPLAIN output from other DBMS types often lacks sufficient detail for PostgreSQL’s planning requirements. For example, MySQL’s EXPLAIN command primarily returns the estimated number of rows, whereas the PostgreSQL planner requires the more comprehensive cost information described in [Chapter 3](/book/postgres-internals/pgsql03/index).

## 4.1.4. Deparesing

During the creation of the plan tree, the planner creates a plain text SQL statement from the scan paths associated with the foreign tables.

For example, Figure 4.3 illustrates the plan tree for the following SELECT statement:

```
localdb=# SELECT * FROM tbl_a AS a WHERE a.id < 10;
```

As shown in Figure 4.3, the ForeignScan node &mdash; which is linked to the plan tree of the PlannedStmt &mdash; stores a plain text SELECT statement.

In this process, postgres_fdw reconstructs the SQL text from the query tree created during parsing and analysis. This reconstruction process is referred to as **deparsing** in PostgreSQL.

![](/images/postgres-internals/pgsql04-fig-4-03.webp)

#### Figure 4.3. Example of the plan tree that scans a foreign table.

Similarly, mysql_fdw creates a SELECT statement compatible with MySQL from the query tree. When using [redis_fdw](https://github.com/pg-redis-fdw/redis_fdw) or [rw_redis_fdw](https://github.com/nahanni/rw_redis_fdw), the process creates a Redis [SELECT command](https://redis.io/commands/select) command.

## 4.1.5. Execution and Result Retrieval

After the deparsing process, the executor sends the deparsed SQL statements to the remote server and receives the results.

The method for transmitting SQL statements depends on the implementation of the specific FDW extension. For example, mysql_fdw transmits SQL statements without initiating a formal transaction. The typical sequence for executing a SELECT query in mysql_fdw is illustrated in Figure 4.4.

![](/images/postgres-internals/pgsql04-fig-4-04.webp)

#### Figure 4.4. Typical sequence of SQL statements to execute a SELECT query in mysql_fdw.

- (5-1) **Configuration:** Sets the SQL_MODE to ‘ANSI_QUOTES’.
- (5-2) **Transmission:** Sends the SELECT statement to the remote server.
- (5-3) **Retrieval and Conversion:** Receives the results from the remote server. At this stage, mysql_fdw converts the data into a format readable by PostgreSQL.

All FDW extensions must implement a conversion feature to ensure the remote data is compatible with the PostgreSQL executor.

** ** Actual log of the remote server

```
mysql> SELECT command_type,argument FROM mysql.general_log;
+--------------+-----------------------------------------------------------------------+
| command_type | argument                                                              |
+--------------+-----------------------------------------------------------------------+
... snip ...

| Query        | SET sql_mode='ANSI_QUOTES'                                            |
| Prepare      | SELECT `id`, `data` FROM `localdb`.`tbl_a` WHERE ((`id` < 10))        |
| Close stmt   |                                                                       |
+--------------+-----------------------------------------------------------------------+
```

In contrast, the communication sequence in postgres_fdw is more complex, as it involves transaction management and cursors. The typical sequence for a SELECT query in postgres_fdw is shown in Figure 4.5.

![](/images/postgres-internals/pgsql04-fig-4-05.webp)

#### Figure 4.5. Typical sequence of SQL statements to execute a SELECT query in postgres_fdw.

- (5-1) **Transaction Start:** Initiates a remote transaction. The default remote isolation level is REPEATABLE READ. However, if the local transaction isolation level is set to SERIALIZABLE, the remote transaction is also set to SERIALIZABLE.
- (5-2)-(5-4) **Cursor Declaration:** Declares a cursor for the SQL statement. Remote queries are generally executed via cursors to manage data flow efficiently.
- (5-5) **Fetching:** Executes FETCH commands to retrieve the results. By default, 100 rows are retrieved per FETCH command.
- (5-6) **Retrieval:** Receives the data from the remote server.
- (5-7) **Cursor Closure:** Closes the cursor after all required rows are retrieved.
- (5-8) **Commitment:** Commits the remote transaction.

** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR SELECT id, data FROM public.tbl_a WHERE ((id < 10))
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR SELECT id, data FROM public.tbl_a WHERE ((id < 10))
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR SELECT id, data FROM public.tbl_a WHERE ((id < 10))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

** The default remote transaction isolation level.

The [official documentation](https://www.postgresql.org/docs/current/postgres-fdw.html#POSTGRES-FDW-TRANSACTION-MANAGEMENT) explains why REPEATABLE READ is the default remote transaction isolation level.

# 4.2. How the Postgres_fdw Extension Performs

The postgres_fdw extension is a specialized module officially maintained by the PostgreSQL Global Development Group. Its source code is integrated directly into the PostgreSQL source code tree.

postgres_fdw is subject to continuous improvement. Table 4.1 summarizes the release notes related to postgres_fdw from the official documentation.

| Version | Release Year | Description |
| --- | --- | --- |
| 9.6 | 2016 | Consider performing sorts on the remote server. Consider performing joins on the remote server. When feasible, perform UPDATE or DELETE entirely on the remote server. Allow the fetch size to be set as a server or table option. |
| 10 | 2017 | Push aggregate functions to the remote server, when possible. |
| 11 | 2018 | Allow to push down aggregates to foreign tables that are partitions. Allow to push UPDATEs and DELETEs using joins to foreign servers. |
| 12 | 2019 | Allow ORDER BY sorts and LIMIT clauses to be pushed in more cases. |
| 14 | 2021 |  |
| 15 | 2022 |  |
| 16 | 2023 |  |
| 17 | 2024 |  |

While the previous section detailed how postgres_fdw processes single-table queries, the following subsections describe the processing of multi-table queries, sort operations, and aggregate functions.

Although this section focuses primarily on SELECT statements, postgres_fdw also supports other DML operations, including INSERT, UPDATE, and DELETE.

#### Note: PostgreSQL’s FDW does not detect deadlock

The postgres_fdw extension and the underlying FDW framework do not support for distributed lock management and distributed deadlock detection. Consequently, cross-server deadlocks can occur.

For instance, consider a scenario where Client A updates a local table tbl_local followed by a foreign table tbl_remote, while Client B updates tbl_remote followed by tbl_local in the opposite order.

Although these two transactions enter a state of mutual deadlock, PostgreSQL is unable to detect the dependency across the remote boundary. As a result, both transactions remain stalled indefinitely and cannot be committed.

```sql
localdb=# -- Client A
localdb=# BEGIN;
BEGIN
localdb=# UPDATE tbl_local SET data = 0 WHERE id = 1;
UPDATE 1
localdb=# UPDATE tbl_remote SET data = 0 WHERE id = 1;
UPDATE 1
```

```sql
localdb=# -- Client B
localdb=# BEGIN;
BEGIN
localdb=# UPDATE tbl_remote SET data = 0 WHERE id = 1;
UPDATE 1
localdb=# UPDATE tbl_local SET data = 0 WHERE id = 1;
UPDATE 1
```

Section Contents

- 4.2.1. Multi-Table Query
- 4.2.2. Sort Operations
- 4.2.3. Aggregate Functions

## 4.2.1. Multi-Table Query

To execute a multi-table query, postgres_fdw typically fetches each foreign table using a single-table SELECT statement and then performs the join on the local server.

In version 9.5 and earlier, postgres_fdw fetches foreign tables individually even if they are stored on the same remote server. The join operation is always created and executed locally.

In version 9.6 and later, postgres_fdw has been improved to support remote join operations. When the foreign tables reside on the same remote server and the [use_remote_estimate](https://www.postgresql.org/docs/current/static/postgres-fdw.html) option is enabled, the planner can create a join path to be executed directly on the remote server.

The execution details are described below.

### 4.2.1.1. Versions 9.5 or earlier

The following describes how PostgreSQL processes a query that joins two foreign tables, ’tbl_a’ and ’tbl_b'.

```
localdb=# SELECT * FROM tbl_a AS a, tbl_b AS b WHERE a.id = b.id AND a.id < 200;
```

The result of the EXPLAIN command for this query is shown below:

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
```

```
localdb=# EXPLAIN SELECT * FROM tbl_a AS a, tbl_b AS b WHERE a.id = b.id AND a.id < 200;
                                  QUERY PLAN
------------------------------------------------------------------------------
 Merge Join  (cost=532.31..700.34 rows=10918 width=16)
   Merge Cond: (a.id = b.id)
   ->  Sort  (cost=200.59..202.72 rows=853 width=8)
         Sort Key: a.id
         ->  Foreign Scan on tbl_a a  (cost=100.00..159.06 rows=853 width=8)
   ->  Sort  (cost=331.72..338.12 rows=2560 width=8)
         Sort Key: b.id
         ->  Foreign Scan on tbl_b b  (cost=100.00..186.80 rows=2560 width=8)
(8 rows)
```

The output indicates that the executor selects a merge join, which is processed through the following steps:

- **Line 8:** The executor fetches rows from table tbl_a using a foreign scan.
- **Line 6:** The executor sorts the fetched rows of tbl_a on the local server.
- **Line 11:** The executor fetches rows from table tbl_b using a foreign scan.
- **Line 9:** The executor sorts the fetched rows of tbl_b on the local server.
- **Line 4:** The executor carries out a merge join operation on the local server.

The sequence of row retrieval is described below (refer to Figure 4.6):

![](/images/postgres-internals/pgsql04-fig-4-06.webp)

#### Figure 4.6. Sequence of SQL statements to execute the Multi-Table Query in versions 9.5 or earlier.

(5-1) **Transaction Start:** Initiates a remote transaction.

(5-2) **Cursor Declaration (c1):** Declares cursor c1 with the following SELECT statement:

```sql
SELECT id, data FROM public.tbl_a WHERE (id < 200)
```

(5-3) **Fetching (c1):** Executes FETCH commands to retrieve the results of cursor c1.

(5-4) **Cursor Declaration (c2):** Declares cursor c2 with the following SELECT statement:

```sql
SELECT id, data FROM public.tbl_b
```

The following examines the declaration of cursor c2. Although the original query filter is tbl_a.id = tbl_b.id AND tbl_a.id < 200, which logically implies a tbl_b.id < 200 constraint, postgres_fdw in these versions cannot perform this inference. Consequently, the executor executes the statement without a WHERE clause and must retrieve all rows from the foreign table tbl_b. This behavior is inefficient because unnecessary data is transmitted from the remote server over the network.

(5-5) **Fetching (c2):** Executes FETCH commands to retrieve the results of cursor c2.

(5-6) **Cursor Closure (c1):** Closes cursor c1.

(5-7) **Cursor Closure (c2):** Closes cursor c2.

(5-8) **Commitment:** Commits the remote transaction.

After the rows are received, the executor sorts the data from both tbl_a and tbl_b and then completes the merge join operation using the sorted results.

** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: FETCH 100 FROM c1
LOG:  parse <unnamed>: DECLARE c2 CURSOR FOR
      SELECT id, data FROM public.tbl_b
LOG:  bind <unnamed>: DECLARE c2 CURSOR FOR
      SELECT id, data FROM public.tbl_b
LOG:  execute <unnamed>: DECLARE c2 CURSOR FOR
      SELECT id, data FROM public.tbl_b
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2

... snip

LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: FETCH 100 FROM c2
LOG:  statement: CLOSE c2
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

### 4.2.1.2. Versions 9.6 or later

If the use_remote_estimate option is set to ‘on’ (the default is ‘off’), postgres_fdw sends multiple EXPLAIN commands to obtain cost estimates for all plan paths related to the foreign tables.

To achieve this, postgres_fdw issues EXPLAIN commands for each single-table query as well as for SELECT statements that represent potential remote join operations.

In this example, the following seven EXPLAIN commands are sent to the remote server. The planner then utilizes these results to select the cheapest plan.

```
(1) EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((id < 200))
(2) EXPLAIN SELECT id, data FROM public.tbl_b
(3) EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
(4) EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((((SELECT null::integer)::integer) = id)) AND ((id < 200))
(5) EXPLAIN SELECT id, data FROM public.tbl_b ORDER BY id ASC NULLS LAST
(6) EXPLAIN SELECT id, data FROM public.tbl_b WHERE ((((SELECT null::integer)::integer) = id))
(7) EXPLAIN SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2 ON (((r1.id = r2.id)) AND ((r1.id < 200))))
```

Local EXPLAIN output shows the plan selected by the planner.

```
localdb=# EXPLAIN SELECT * FROM tbl_a AS a, tbl_b AS b WHERE a.id = b.id AND a.id < 200;
                        QUERY PLAN
-----------------------------------------------------------
 Foreign Scan  (cost=134.35..244.45 rows=80 width=16)
   Relations: (public.tbl_a a) INNER JOIN (public.tbl_b b)
(2 rows)
```

The output confirms that the planner selects an inner join to be processed on the remote server, which significantly improves efficiency by reducing data transfer.

The sequence of operations performed by postgres_fdw is described below (refer to Figure 4.7):

![](/images/postgres-internals/pgsql04-fig-4-07.webp)

#### Figure 4.7. Sequence of SQL statements to execute the remote-join operation in versions 9.6 or later.

- (3-1) **Transaction Start:** Initiates a remote transaction.
- (3-2) **Cost Estimation:** Executes the EXPLAIN commands to estimate the cost of each potential plan path.

In this specific case, seven EXPLAIN commands are executed. The planner then identifies the SELECT query with the lowest cost based on the returned values.

(5-1) **Cursor Declaration (c1):** Declares cursor c1 using the following remote-join statement:

```sql
SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2
  ON (((r1.id = r2.id)) AND ((r1.id < 200))))
```

(5-2) **Result Retrieval:** Receives the joined results from the remote server. (5-3) **Cursor Closure (c1):** Closes cursor c1. (5-4) **Commitment:** Commits the remote transaction. ** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_b
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_a WHERE ((((SELECT null::integer)::integer) = id)) AND ((id < 200))
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_b ORDER BY id ASC NULLS LAST
LOG:  statement: EXPLAIN SELECT id, data FROM public.tbl_b WHERE ((((SELECT null::integer)::integer) = id))
LOG:  statement: EXPLAIN SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2 ON (((r1.id = r2.id)) AND ((r1.id < 200))))
LOG:  parse: DECLARE c1 CURSOR FOR
	   SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2 ON (((r1.id = r2.id)) AND ((r1.id < 200))))
LOG:  bind: DECLARE c1 CURSOR FOR
	   SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2 ON (((r1.id = r2.id)) AND ((r1.id < 200))))
LOG:  execute: DECLARE c1 CURSOR FOR
	   SELECT r1.id, r1.data, r2.id, r2.data FROM (public.tbl_a r1 INNER JOIN public.tbl_b r2 ON (((r1.id = r2.id)) AND ((r1.id < 200))))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

It should be noted that if the use_remote_estimate option remains ‘off’, a remote-join query is rarely selected. This is because, without remote feedback, the planner estimates the cost of remote joins using a very large embedded constant value, making local joins appear more favorable by comparison.

## 4.2.2. Sort Operations

### 4.2.2.1. Versions 9.5 or earlier

In these versions, sort operations &mdash; such as those triggered by an ORDER BY clause &mdash; are processed exclusively on the local server. Consequently, the local server must retrieve all target rows from the remote server before the sort operation can begin.

The following EXPLAIN output illustrates how a simple query with an ORDER BY clause is processed:

```
1
2
3
4
5
6
7
```

```
localdb=# EXPLAIN SELECT * FROM tbl_a AS a WHERE a.id < 200 ORDER BY a.id;
                              QUERY PLAN
-----------------------------------------------------------------------
 Sort  (cost=200.59..202.72 rows=853 width=8)
   Sort Key: id
   ->  Foreign Scan on tbl_a a  (cost=100.00..159.06 rows=853 width=8)
(3 rows)
```

**Line 6:** The executor sends the following query to the remote server and retrieves the results:

```sql
SELECT id, data FROM public.tbl_a WHERE ((id < 200))
```

**Line 4:** The executor performs the sort operation on the retrieved rows of tbl_a locally. ** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR
      SELECT id, data FROM public.tbl_a WHERE ((id < 200))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

### 4.2.2.2. Versions 9.6 or later

Starting with version 9.6, postgres_fdw can execute SELECT statements with an ORDER BY clause directly on the remote server when possible.

```
1
2
3
4
5
```

```
localdb=# EXPLAIN SELECT * FROM tbl_a AS a WHERE a.id < 200 ORDER BY a.id;
                           QUERY PLAN
-----------------------------------------------------------------
 Foreign Scan on tbl_a a  (cost=100.00..167.46 rows=853 width=8)
(1 row)
```

**Line 4:** The executor sends a query containing an ORDER BY clause to the remote server. The retrieved results are already sorted, eliminating the need for local sorting:

```sql
SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
```

** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT id, data FROM public.tbl_a WHERE ((id < 200)) ORDER BY id ASC NULLS LAST
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

This improvement reduces the computational workload on the local server and can significantly decrease overall execution time.

## 4.2.3. Aggregate Functions

### 4.2.3.1. Versions 9.6 or earlier

Similar to the sort operations described in the previous subsection, aggregate functions such as AVG() and COUNT() are processed **on the local server**. The process consists of the following steps:

```
1
2
3
4
5
6
```

```
localdb=# EXPLAIN SELECT AVG(data) FROM tbl_a AS a WHERE a.id < 200;
                              QUERY PLAN
-----------------------------------------------------------------------
 Aggregate  (cost=168.50..168.51 rows=1 width=4)
   ->  Foreign Scan on tbl_a a  (cost=100.00..166.06 rows=975 width=4)
(2 rows)
```

**Line 5:** The executor retrieves all target rows from the remote server by sending the following query:

```sql
SELECT id, data FROM public.tbl_a WHERE ((id < 200))
```

**Line 4:** The executor calculates the average of the retrieved rows on the local server. ** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR
      SELECT data FROM public.tbl_a WHERE ((id < 200))
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR
      SELECT data FROM public.tbl_a WHERE ((id < 200))
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR
      SELECT data FROM public.tbl_a WHERE ((id < 200))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

This approach is inefficient when dealing with large datasets, as transmitting a high volume of rows consumes significant network bandwidth and increases execution time.

### 4.2.3.2. Versions 10 or later

Starting with version 10, postgres_fdw can execute SELECT statements containing aggregate functions directly **on the remote server** when possible.

```
1
2
3
4
5
6
```

```
localdb=# EXPLAIN SELECT AVG(data) FROM tbl_a AS a WHERE a.id < 200;
                     QUERY PLAN
-----------------------------------------------------
 Foreign Scan  (cost=102.44..149.03 rows=1 width=32)
   Relations: Aggregate on (public.tbl_a a)
(2 rows)
```

**Line 4:** The executor sends a query containing the AVG() function to the remote server and retrieves only the final result.

```sql
SELECT avg(data) FROM public.tbl_a WHERE ((id < 200))
```

** ** Actual log of the remote server

```
LOG:  statement: START TRANSACTION ISOLATION LEVEL REPEATABLE READ
LOG:  parse <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT avg(data) FROM public.tbl_a WHERE ((id < 200))
LOG:  bind <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT avg(data) FROM public.tbl_a WHERE ((id < 200))
LOG:  execute <unnamed>: DECLARE c1 CURSOR FOR
	   SELECT avg(data) FROM public.tbl_a WHERE ((id < 200))
LOG:  statement: FETCH 100 FROM c1
LOG:  statement: CLOSE c1
LOG:  statement: COMMIT TRANSACTION
```

This process is significantly more efficient because the remote server performs the calculation and transmits only a single row as the result, minimizing network traffic.

** Push-Down

**Push-down** is the process of delegating tasks, such as aggregation or sorting, to the remote server.
