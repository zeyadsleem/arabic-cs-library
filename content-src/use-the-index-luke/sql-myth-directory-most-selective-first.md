---
title: "Most Selective First"
lang: en
---

Every time a compound index is created, the order of the columns must be chosen wisely. [*Concatenated Indexes*](/sql/where-clause/the-equals-operator/concatenated-keys) is devoted to this question.

However, there is the myth that you should always put the most selective column to the first position; that is just wrong.

#### Important

The most important consideration when defining a concatenated index is how to choose the column order so it can be used as often as possible.

After that, there are even reasons to put the least selective column first. The Oracle database can, for example, use an `INDEX SKIP SCAN` in that case. But that’s an advanced feature. The most important factor...uhm, did I say that before?

The true essence of the myth is related to indexing independent range conditions—that is the only case where the selectivity should influence the index design (see [*Index Merge: Combining Multiple Indexes*](/sql/where-clause/searching-for-ranges/index-merge-performance)).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=myth-most-selective-first&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The myth is extraordinarily persistent in the SQL Server environment and appears even in the official documentation. The reason is that SQL Server keeps a histogram for the first index column only. But that means that the recommendation should read like “uneven distributed columns first” because histograms are not very useful for evenly distributed columns anyway.

I’m not the first to fight this myth. Here are some more references that disproof the myth:

Don’t automatically put the most selective term first in a concatenated index.

— Guy Harrison in “[Oracle Performance Survival Guide](http://guyharrison.squarespace.com/blog/2009/10/5/oracle-performance-survival-guide-available-as-pdf.html)”

> One of the often-quoted fairy-tales about indexes was the directive to “put the most selective column first”. It was never a sensible rule of thumb (except, possibly, prior to version 6.0).— Jonathan Lewis in “[Oracle Scratchpad](https://jonathanlewis.wordpress.com/2007/02/14/conditional-sql-2/)”

It’s useless to have the most selective column of the index on the left if very few queries filter on it. Queries that don’t filter on it, but do filter on the other columns of the index will have to scan, and scans are expensive.

— Gail Shaw in ”[SQL (Server) in the Wild](https://www.sqlinthewild.co.za/index.php/2009/01/19/index-columns-selectivity-and-equality-predicates/)”
