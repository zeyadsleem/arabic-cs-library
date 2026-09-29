---
title: "Index Clustering Factor"
lang: en
---

The clustering factor is a benchmark that expresses the correlation between the index row order and the table row order.

For example, an `ORDERS` table, that grows every day, might have an index on the order date and another one on the customer id. Because orders don’t get deleted there are no holes in the table so that each new order is added to the end. The table grows chronologically. An index on the order date has a very low clustering factor because the index order is essentially the same as the table order. The index on customer id has a higher clustering factor because the index order is different from the table order; the table row will be inserted at the end of the table, the corresponding index entry somewhere in the middle of the index—according to the customer id.
