---
title: "Distinguishing Access and Filter-Predicates"
lang: en
---

No other database provides better information about the predicate evaluation mode than Db2 because it just says in the execution plan whether a predicate is used as the start and/or stop condition for an [IXSCAN](/sql/explain-plan/db2/operations#apa-db2-ops-ixscan) or as mere filter predicate. Yet it is confusing because it uses an old definition of the term “*sarg*”.

> In the early days, IBM researchers named these kinds of search conditions “sargable predicates” because SARG is a contraction for Search ARGument. In later days, Microsoft and Sybase redefined “sargable” to mean “can be looked up via the index.”— [SQL Performance Tuning](https://web.archive.org/web/20241210124531/https://www.informit.com/articles/article.aspx?p=30247)

I find both definitions pretty useless and avoid the term in my books and articles entirely. However, in Db2 execution plans filter predicates are labeled `SARG`—thus we have to make it explicit that IBM Db2 uses the “original” definition as mentioned above. That is, of course, backed by the documentation:

*Index sargable* predicates are not used to bracket a search, but are evaluated from the index if one is chosen, because the columns involved in the predicate are part of the index key. […]

*Data sargable* predicates […] require the access of individual rows from a base table. If necessary, DMS will retrieve the columns needed to evaluate the predicate, as well as any others to satisfy the columns in the SELECT list that could not be obtained from the index.

— [Predicate processing for queries, Db2 LUW 11.1 documentation](https://www.ibm.com/docs/en/db2/11.5.x?topic=optimization-predicate-processing-queries)

That means, in Db2 predicates labeled `SARG` are generally just filter predicates—either on index level or on table level.

The very nice part about the predicate information shown in Db2 execution plans is that they don’t just label access predicates, but explicitly say which predicates are used as `START` and/or `STOP` conditions.

The following example shows all types of predicates as shown by the [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained):

```
Explain Plan
--------------------------------------------------------------
ID | Operation           |                        Rows |  Cost
 1 | RETURN              |                             | 23550
 2 |  GRPBY (COMPLETE)   |        1 of 96480 (   .00%) | 23550
 3 |   IXSCAN SCALE_SLOW | 96480 of 60299800 (   .16%) | 23544

Predicate Information
 3 - START (Q1.SECTION = ?)
      STOP (Q1.SECTION = ?)
      SARG (Q1.ID2 = ?)

Explain plan by Markus Winand - NO WARRANTY
http://use-the-index-luke.com/s/last_explained
```

The scanned index range can be determined quite easily from this output—it’s only determined by the `START` and `STOP` predicates (which happen to be the same in this case). The third predicate on the `ID2` column is labeled `SARG` and thus just a filter predicate.

While `SARG` predicates may appear on other operations too (e.g. `TBSCAN`), `START` and `STOP` are exclusive to `IXSCAN`. The absence of either `START` or `STOP` indicates an search with only upper or lower bound (e.g. `WHERE x > ?`). If neither `START` nor `STOP` appears for an `IXSCAN`, it means that the full index is read.
