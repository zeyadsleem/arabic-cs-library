---
title: "Parsing - Query Planning - Compiling"
lang: en
---

The terms *Parsing* (Oracle), *Query Planning* (PostgreSQL) and *Compiling* (SQL Server) describe the process to transform a SQL statement into an [execution plan](/sql/glossary/execution-plan-explain-plan).

Databases with a shared execution plan cache have two parsing phases:

Hard ParsingHard parsing is constructing an execution plan based on the SQL statement. That’s a major effort; inspecting all parts of the SQL; considering all indexes; considering all join orders and so on. Hard parsing is very resource intensive.

Soft Parsing

Soft parsing is searching, finding and using a cached execution plan. There are some minor checks done, e.g., access rights, but the execution plan can be re-used as is. That is a rather fast operation.

The key to the cache is basically the literal SQL string—usually a hash of it. If there is no exact match, a hard parse is triggered. That’s why inlined literals—as opposed to bind parameters—trigger a hard parse unless the very same search terms are used again. But even in that case there are good chances that the previous execution plan was already expired from the cache because new ones are coming over and over again.

#### Links

- [Using Bind-Variables to reduce Parsing overhead](/sql/where-clause/bind-parameters)
- [Appendix A: Getting and Reading Execution Plans](/sql/explain-plan)
- Article: “[Planning for Re-Use](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)” about execution plan caching
