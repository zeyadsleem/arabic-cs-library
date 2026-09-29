---
title: "Getting an Execution Plan"
lang: en
---

SQLite offers two different levels of execution plans: (1) the machine code for the virtual machine; (2) the high level query plan.

This tutorial shows the second variant only.

## EXPLAIN QUERY PLAN

You can prefix any arbitrary SQL command by `explain query plan` to retrieve the query plan (instead of running the query).

```sql
EXPLAIN QUERY PLAN
SELECT RANDOM()
```

This minimalistic example returns the following execution plan:

```
QUERY PLAN
`--SCAN CONSTANT ROW
```
