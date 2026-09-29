---
title: "Indexes Can Degenerate"
lang: en
---

The most prominent myth is that an index can become degenerated after a while and must be re-built regularly. First of all, the database keeps the tree balance—*always*. It is not possible that a single fragment of the index grows deeper and deeper until the tree traversal becomes slow. What can happen is that the index become bigger than needed. If there are many `UPDATE` or `DELETE` statements involved space utilization can become suboptimal. However, even if the index is bigger than required, it is very unlikely that the depth of the index grows because of that. As explained in [*The Search Tree (B-Tree) Makes the Index Fast*](/sql/anatomy/the-tree), the number of entries in the index must typically grow by a factor of hundred to increase the index depth by one level.

Rebuilding an index might reduce the number of leaf nodes by about 20% - 30%. The most you can possibly expect from this reduction is 20%-30% for very expensive operations like a `FULL INDEX SCAN`. The typical `INDEX UNIQUE SCAN` gain of an index rebuild is 0%-2% because the depth of the index is not reduced by the rebuild.
