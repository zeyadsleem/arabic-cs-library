---
title: "Partial Results"
lang: en
---

Sometimes you do not need the full result of an SQL query but only the first few rows—e.g., to show only the ten most recent messages. In this case, it is also common to allow users to browse through older messages—either using traditional paging navigation or the more modern “infinite scrolling” variant. The related SQL queries used for this function can, however, cause serious performance problems if *all* messages must be sorted in order to find the most recent ones. A [pipelined `order by`](/sql/sorting-grouping/indexed-order-by) is therefore a very powerful means of optimization for such queries.

Using a pipelined `order by` is not only about saving the effort to sort the result, it is more about delivering the first results without reading and sorting all rows. That means the pipelined `order by` has very low startup costs. It is therefore possible to abort the execution after fetching a few rows without discarding the efforts to prepare the final result.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-partial&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

This chapter demonstrates how to use a pipelined `order by` to efficiently retrieve partial results. Although the syntax of these queries varies from database to database, they still execute the queries in a very similar way. Once again, this illustrates that they all put their pants on one leg at a time.

## Contents

1. *[Selecting Top-N Rows](/sql/partial-results/top-n-queries)* — if you need the first few rows only
2. *[Fetching The Next Page](/sql/partial-results/fetch-next-page)* — The offset and seek methods compared
3. *[Window-Functions](/sql/partial-results/window-functions)* — Pagination using analytic queries
