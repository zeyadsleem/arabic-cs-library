---
title: "Optimizer - Query Optimizer - Query Planner"
lang: en
---

The *Optimizer* (Oracle), *Query Optimizer* (SQL Server, MySQL) or *Query Planner* (PostgreSQL) translates the SQL statement to an executable program, in form of an [execution plan](/sql/glossary/execution-plan-explain-plan), very much like a compiler translates source code into an executable.

There are generally two kinds of Optimizers:

Rule Based Optimizer (RBO)

Rule Based Optimizers follow a strict set of rules to create an execution plan — e.g., always use an index if possible.

Cost Based Optimizer (CBO)

Cost Based Optimizers generate many different execution plans, apply a cost model to all of them and select the one with the best cost value for execution.

Cost Based Optimizers will, for example, compare the estimated cost for a query using an index to the cost reading the entire table. The optimizer may select the full table access if it the cost values suggest that the full table access is more efficient than the index lookup.

Cost Based Optimizers are the predominant implementation.

The major decisions done by Optimizers are:

- Join Algorithm and Join Order selection
- Index usage

Optimizers do not:

- Optimize Tables or Indexes
- Optimize obfuscated SQL
- Defragment data

#### Links

- [Using Bind-Variables to reduce Optimizer overhead](/sql/where-clause/bind-parameters)
- Article: “[Planning for Re-Use](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)” about execution plan caching
- Glossary: [Execution Plan](/sql/glossary/execution-plan-explain-plan)
