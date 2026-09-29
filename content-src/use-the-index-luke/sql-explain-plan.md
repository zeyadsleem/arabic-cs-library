---
title: "Execution Plans"
lang: en
---

Before the database can execute an SQL statement, the optimizer has to create an execution plan for it. The database then executes this plan in a step-by-step manner. In this respect, the optimizer is very similar to a compiler because it translates the source code (SQL statement) into an executable program (execution plan).

The execution plan is the first place to look when searching for the cause of slow statements. The following sections explain how to retrieve and read an execution plan to optimize performance in various databases.

## Contents

1. *[Db2 (LUW)](/sql/explain-plan/db2)* : *[Getting](/sql/explain-plan/db2/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/db2/operations)* • *[Access vs. filter predicates](/sql/explain-plan/db2/filter-predicates)*
2. *[MySQL](/sql/explain-plan/mysql)* : *[Getting](/sql/explain-plan/mysql/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/mysql/operations)* • *[Access vs. filter predicates](/sql/explain-plan/mysql/access-filter-predicates)*
3. *[Oracle](/sql/explain-plan/oracle)* : *[Getting](/sql/explain-plan/oracle/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/oracle/operations)* • *[Access vs. filter predicates](/sql/explain-plan/oracle/filter-predicates)*
4. *[PostgreSQL](/sql/explain-plan/postgresql)* : *[Getting](/sql/explain-plan/postgresql/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/postgresql/operations)* • *[Access vs. filter predicates](/sql/explain-plan/postgresql/filter-predicates)*
5. *[SQL Server](/sql/explain-plan/sql-server)* : *[Getting](/sql/explain-plan/sql-server/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/sql-server/operations)* • *[Access vs. filter predicates](/sql/explain-plan/sql-server/filter-predicates)*
6. *[SQLite](/sql/explain-plan/sqlite)* : *[Getting](/sql/explain-plan/sqlite/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/sqlite/operations)*
7. *[Gupta SQLBase](/sql/explain-plan/sqlbase)* : *[Getting](/sql/explain-plan/sqlbase/getting-an-execution-plan)* • *[Operations](/sql/explain-plan/sqlbase/operations)*
