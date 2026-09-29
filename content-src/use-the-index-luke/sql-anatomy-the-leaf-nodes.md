---
title: "The Index Leaf Nodes"
lang: en
---

The primary purpose of an index is to provide an ordered representation of the indexed data. It is, however, not possible to store the data sequentially because an `insert` statement would need to move the following entries to make room for the new one. Moving large amounts of data is very time-consuming so the `insert` statement would be very slow. The solution to the problem is to establish a logical order that is independent of physical order in memory.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-leaf-nodes&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The logical order is established via a doubly linked list. Every node has links to two neighboring entries, very much like a chain. New nodes are inserted between two existing nodes by updating their links to refer to the new node. The physical location of the new node doesn’t matter because the doubly linked list maintains the logical order.

The data structure is called a* doubly linked list* because each node refers to the preceding and the following node. It enables the database to read the index forwards or backwards as needed. It is thus possible to insert new entries without moving large amounts of data—it just needs to change some pointers.

Doubly linked lists are also used for collections (containers) in many programming languages.

| Programming Language | Name |
| --- | --- |
| Java | [java.util.LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html) |
| .NET Framework | [System.Collections.Generic.LinkedList](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1?view=net-7.0) |
| C++ | [std::list](https://cplusplus.com/reference/list/list/) |

Databases use doubly linked lists to connect the so-called index *leaf nodes*. Each leaf node is stored in a *database block* or *page*; that is, the database’s smallest storage unit. All index blocks are of the same size—typically a few kilobytes. The database uses the space in each block to the extent possible and stores as many index entries as possible in each block. That means that the index order is maintained on two different levels: the index entries within each leaf node, and the leaf nodes among each other using a doubly linked list.

## Figure 1.1 Index Leaf Nodes and Corresponding Table Data

[Figure 1.1](#fig-LeafNodes) illustrates the index leaf nodes and their connection to the table data. Each index entry consists of the indexed columns (the key, column 2) and refers to the corresponding table row (via `ROWID` or `RID`). Unlike the index, the table data is stored in a heap structure and is not sorted at all. There is neither a relationship between the rows stored in the same table block nor is there any connection between the blocks.
