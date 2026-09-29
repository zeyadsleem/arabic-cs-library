---
title: "The Search Tree (B-Tree) Makes the Index Fast"
lang: en
---

The index leaf nodes are stored in an arbitrary order—the position on the disk does not correspond to the logical position according to the index order. It is like a telephone directory with shuffled pages. If you search for “Smith” but first open the directory at “Robinson”, it is by no means granted that Smith follows Robinson. A database needs a second structure to find the entry among the shuffled pages quickly: a *balanced search tree*—in short: the B-tree.

## Figure 1.2 B-tree Structure

[Figure 1.2](#TreeNodes) shows an example index with 30 entries. The doubly linked list establishes the logical order between the leaf nodes. The root and branch nodes support quick searching among the leaf nodes.

The figure highlights a branch node and the leaf nodes it refers to. Each branch node entry corresponds to the biggest value in the respective leaf node. Take the first leaf node as an example: the biggest value in this node is 46, which is thus stored in the corresponding branch node entry. The same is true for the other leaf nodes so that in the end the branch node has the values 46, 53, 57 and 83. According to this scheme, a branch layer is built up until all the leaf nodes are covered by a branch node.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-tree&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The next layer is built similarly, but on top of the first branch node level. The procedure repeats until all keys fit into a single node, the *root node*. The structure is a *balanced search tree* because the tree depth is equal at every position; the distance between root node and leaf nodes is the same everywhere.

#### Note

A B-tree is a balanced tree—not a binary tree.

Once created, the database maintains the index automatically. It applies every `insert`, `delete` and `update` to the index and keeps the tree in balance, thus causing maintenance overhead for write operations. [Chapter 8, “*Modifying Data*”](/sql/dml), explains this in more detail.

## Figure 1.3 B-Tree Traversal

[Figure 1.3](#TreeTraversal) shows an index fragment to illustrate a search for the key “57”. The tree traversal starts at the root node on the left-hand side. Each entry is processed in ascending order until a value is greater than or equal to (>=) the search term (57). In the figure it is the entry 83. The database follows the reference to the corresponding branch node and repeats the procedure until the tree traversal reaches a leaf node.

#### Important

The B-tree enables the database to find a leaf node quickly.

The tree traversal is a very efficient operation—so efficient that I refer to it as the *first power of indexing*. It works almost instantly—even on a huge data set. That is primarily because of the tree balance, which allows accessing all elements with the same number of steps, and secondly because of the logarithmic growth of the tree depth. That means that the tree depth grows very slowly compared to the number of leaf nodes. Real world indexes with millions of records have a tree depth of four or five. A tree depth of six is hardly ever seen. The box [“*Logarithmic Scalability*”](#sb-log) describes this in more detail.

## Logarithmic Scalability

In mathematics, the logarithm of a number to a given base is the power or exponent to which the base must be raised in order to produce the number [[Wikipedia](https://en.wikipedia.org/wiki/Logarithm)].

In a search tree the base corresponds to the number of entries per branch node and the exponent to the tree depth. The example index in [Figure 1.2](#TreeNodes) holds up to four entries per node and has a tree depth of three. That means that the index can hold up to 64 (43) entries. If it grows by one level, it can already hold 256 entries (44). Each time a level is *added*, the maximum number of index entries *quadruples*. The logarithm reverses this function. The tree depth is therefore log4(number-of-index-entries).

Tree DepthIndex Entries364425651,02464,096716,384865,5369262,144101,048,576

The logarithmic growth enables the example index to search a million records with ten tree levels, but a real world index is even more efficient. The main factor that affects the tree depth, and therefore the lookup perfor­mance, is the number of entries in each tree node. This number corresponds to—mathematically speaking—the basis of the loga­rithm. The higher the basis, the shallower the tree, the faster the traversal.

Databases exploit this concept to a maximum extent and put as many entries as possible into each node—often hundreds. That means that every new index level supports a hundred times more entries.

#### Links

[B+tree simulator](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)
