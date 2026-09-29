---
title: "Sort Merge"
lang: en
---

The sort-merge join combines two sorted lists like a zipper. Both sides of the join must be sorted by the join predicates.

A sort-merge join needs the same indexes as the [hash join](/sql/join/hash-join-partial-objects), that is an index for the independent conditions to read all candidate records in one shot. Indexing the join predicates is useless. Everything is just like a hash join so far. Nevertheless there is one aspect that is unique to the sort-merge join: absolute symmetry. The join order does not make any difference—not even for performance. This property is very useful for outer joins. For other algorithms the direction of the outer joins (left or right) implies the join order—but not for the sort-merge join. The sort-merge join can even do a left and right outer join at the same time—a so-called full outer join, like shown in the following animation.

Figure 4.1 Sort-Merge Join Executing a FULL OUTER JOIN ![](/images/use-the-index-luke/sql-join-sort-merge-join-0-sort-merge.2hg7gOBL.webp)

Although the sort-merge join performs very well once the inputs are sorted, it is hardly used because sorting both sides is very expensive. The hash join, on the other hand, needs to preprocess only one side.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-sort-merge&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The strength of the sort-merge join emerges if the inputs are already sorted. This is possible by exploiting the index order to avoid the sort operations entirely. [Chapter 6, “*Sorting and Grouping*”](/sql/sorting-grouping), explains this concept in detail. The hash join algorithm is superior in many cases nevertheless.

#### Factbox

- Sort-merge joins do not need indexes on the join predicates.
- MySQL does not support sort-merge joins at all.
