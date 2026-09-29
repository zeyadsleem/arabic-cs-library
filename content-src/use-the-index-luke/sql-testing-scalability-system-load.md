---
title: "Performance Impacts of System Load"
lang: en
---

Consideration as to how to define a multi column index often stops as soon as the index is used for the query being tuned. However, the optimizer is not using an index because it is the “right” one for the query, rather because it is more efficient than a full table scan. That does not mean it is the optimal index for the query.

[The previous example](/sql/testing-scalability/data-volume) has shown the difficulties in recognizing incorrect column order in an execution plan. Very often the predicate information is well hidden so you have to search for it specifically to verify optimal index usage.

SQL Server Management Studio, for example, only shows the predicate information as a tool tip when moving the mouse cursor over the index operation (“hover”)—also on this web page. The following execution plan uses the `SCALE_SLOW` index; it thus shows the condition on `ID2` as filter predicate (just “Predicate”, without Seek).

![](/images/use-the-index-luke/sql-testing-scalability-system-load-0-mssql_ssms_filter.ZrTov2hZ.webp)

Obtaining the predicate information from a [MySQL](/sql/explain-plan/mysql/access-filter-predicates) or [PostgreSQL](/sql/explain-plan/postgresql/filter-predicates) execution plan is even more awkward. [Appendix A](/sql/explain-plan) has the details.

No matter how insignificant the predicate information appears in the execution plan, it has a great impact on performance—especially when the system grows. Remember that it is not only the data volume that grows but also the access rate. This is yet another parameter of the scalability function.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-scale-load&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

[Figure 3.4](#fig-scale-load) plots the response time as a function of the access rate—the data volume remains unchanged. It is showing the execution time of the same query as before and always uses the section with the greatest data volume. That means the last point from [Figure 3.2](/sql/testing-scalability/data-volume#fig-scale-data) corresponds with the first point in this chart.

Figure 3.4 Scalability by System Load

The dashed line plots the response time when using the `SCALE_SLOW` index. It grows by up to 32 seconds if there are 25 queries running at the same time. In comparison to the response time without background load—as it might be the case in your development environment—it takes 30 times as long. Even if you have a full copy of the production database in your development environment, the background load can still cause a query to run much slower in production.

The solid line shows the response time using the `SCALE_FAST` index—it does not have any filter predicates. The response time stays well below two seconds even if there are 25 queries running concurrently.

#### Note

*Careful* execution plan inspection yields more confidence than *superficial* benchmarks.

A full stress test is still worthwhile—but the costs are high.

Suspicious response times are often taken lightly during development. This is largely because we expect the “more powerful production hardware” to deliver better performance. More often than not it is the other way around because the production infrastructure is more complex and accumulates latencies that do not occur in the development environment. Even when testing on a production equivalent infrastructure, the background load can still cause different response times. In the next section we will see that it is in general not reasonable to expect faster responses from “bigger hardware”.

#### Links

- Article “[Latency: Security vs. Performance](https://blog.fatalmind.com/2009/12/22/latency-security-vs-performance/)” about latencies in complex infrastructures.
- Article: “[We are experiencing too much load. Let’s add a new server](https://jamesgolick.com/2010/10/27/we-are-experiencing-too-much-load-lets-add-a-new-server..html)” by Jams Golick.
