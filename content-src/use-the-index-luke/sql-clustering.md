---
title: "Clustering Data"
lang: en
---

The term *cluster* is used in various fields. A [star cluster](https://en.wikipedia.org/wiki/Star_cluster), for example, is a group of stars. A [computer cluster](https://en.wikipedia.org/wiki/Computer_cluster), on the other hand, is a group of computers that work closely together—either to solve a complex problem (high-performance computing cluster) or to increase availability (failover cluster). Generally speaking, clusters are related things that appear together.

In the field of computing there is one more type of cluster—one that is often misunderstood: the data cluster. Clustering data means to store consecutively accessed data closely together so that accessing it requires fewer IO operations. Data clusters are very important in terms of database tuning. Computer clusters, on the other hand, are also very common in a database context—thus making the term *cluster* very ambiguous. The sentence “Let’s use a cluster to improve database performance” is just one example; it might refer to a computer cluster but could also mean a data cluster. In this chapter, cluster generally refers to *data clusters*.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-clustering&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The simplest data cluster in an SQL database is the row. Databases store all columns of a row in the same database block if possible. Exceptions apply if a row doesn’t fit into a single block—e.g., when LOB types are involved.

## Column Stores

[Column oriented databases](https://en.wikipedia.org/wiki/Column-oriented_DBMS), or column-stores, organize tables in a columned way. This model is beneficial when accessing many rows but only a few columns—a pattern that is very common in data warehouses (OLAP).

Indexes allow one to cluster data. The basis for this was already explained in [Chapter 1, “*Anatomy of an SQL Index*”](/sql/anatomy): the index leaf nodes store the indexed columns in an ordered fashion so that similar values are stored next to each other. That means that indexes build clusters of rows with similar values. This capability to cluster data is so important that I refer to it as the *second power of indexing*.

#### Note

The [B-tree traversal](/sql/anatomy/the-tree) is the first power of indexing.

Clustering is the second power of indexing.

The following sections explain how to use indexes to cluster data and improve query performance.

## Contents

1. *[Index Filter Predicates Intentionally Used](/sql/clustering/index-filter-predicates)* — to tune `LIKE`
2. *[Index-Only Scan](/sql/clustering/index-only-scan-covering-index)* — Avoiding table access
3. *[Index-Organized Table](/sql/clustering/index-organized-clustered-index)* — Clustered indexes without tables
