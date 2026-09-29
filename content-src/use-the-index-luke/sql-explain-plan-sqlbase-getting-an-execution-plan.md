---
title: "Getting an Execution Plan"
lang: en
---

There are two ways to obtain an execution plan:

## SET PLANONLY ON

You can put the current database session into plan-only mode by issuing this command:

```
SET PLANONLY ON
```

Every sub sequentially executed command will just return it’s execution plan rather than being executed. This is the better approach to obtain an execution plan because the output is more verbose.

Of course, you can disable plan-only mode again by setting it to `OFF`.

The execution plan shown by plan-only is also stored in `SYSADM.PLAN_TABLE`. Note that you need to disable plan-only before selecting from `PLAN_TABLE`—otherwise you just plan the query on `PLAN_TABLE`.

## Session → Execution Plan / Tree-Button

After actually running a query you can obtain it’s execution plan via the menu `Session` → `Execution Plan` or by pushing the “Tree-Icon” in the toolbar. This opens a new window showing the execution plan. Note that the output format is different from the output provided by the plan-only approach.
