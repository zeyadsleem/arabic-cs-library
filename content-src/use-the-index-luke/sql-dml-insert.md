---
title: "Insert"
lang: en
---

The number of indexes on a table is the most dominant factor for `insert` performance. The more indexes a table has, the slower the execution becomes. The `insert` statement is the only operation that cannot directly benefit from indexing because it has no `where` clause.

Adding a new row to a table involves several steps. First, the database must find a place to store the row. For a regular heap table—which has no particular row order—the database can take any table block that has enough free space. This is a very simple and quick process, mostly executed in main memory. All the database has to do afterwards is to add the new entry to the respective data block.

If there are indexes on the table, the database must make sure the new entry is also found via these indexes. For this reason it has to add the new entry to each and every index on that table. The number of indexes is therefore a multiplier for the cost of an `insert` statement.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-insert&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Moreover, adding an entry to an index is much more expensive than inserting one into a heap structure because the database has to keep the index order and tree balance. That means the new entry cannot be written to any block—it belongs to a specific [leaf node](/sql/anatomy/the-leaf-nodes). Although the database uses the [index tree](/sql/anatomy/the-tree) itself to find the correct leaf node, it still has to read a few index blocks for the tree traversal.

Once the correct leaf node has been identified, the database confirms that there is enough free space left in this node. If not, the database splits the leaf node and distributes the entries between the old and a new node. This process also affects the reference in the corresponding branch node as that must be duplicated as well. Needless to say, the branch node can run out of space as well so it might have to be split too. In the worst case, the database has to split all nodes up to the root node. This is the only case in which the tree gains an additional layer and grows in depth.

The index maintenance is, after all, the most expensive part of the `insert` operation. That is also visible in [Figure 8.1*Insert Performance by Number of Indexes*](#fig_insert): the execution time is hardly visible if the table does not have any indexes. Nevertheless, adding a single index is enough to increase the execute time by a factor of a hundred. Each additional index slows the execution down further.

## Figure 8.1 Insert Performance by Number of Indexes

#### Note

The first index makes the greatest difference.

To optimize `insert` performance, it is very important to keep the number of indexes small.

#### Tip

Use indexes deliberately and sparingly, and avoid redundant indexes whenever possible. This is also beneficial for `delete` and `update` statements.

Considering `insert` statements only, it would be best to avoid indexes entirely—this yields by far the best `insert` performance. However tables without indexes are rather unrealistic in real world applications. You usually want to retrieve the stored data again so that you need indexes to improve query speed. Even write-only log tables often have a primary key and a respective index.

Nevertheless, the performance without indexes is so good that it can make sense to temporarily drop all indexes while loading large amounts of data—provided the indexes are not needed by any other SQL statements in the meantime. This can unleash a dramatic speed-up which is visible in the chart and is, in fact, a common practice in data warehouses.

#### Think About It

How would [Figure 8.1](#fig_insert) change when using an [index organized table](/sql/clustering/index-organized-clustered-index) or [clustered index](/sql/clustering/index-organized-clustered-index)?

Is there any indirect way an `insert` statement could possibly benefit from indexing? That is, could an additional index make an `insert` statement faster?
