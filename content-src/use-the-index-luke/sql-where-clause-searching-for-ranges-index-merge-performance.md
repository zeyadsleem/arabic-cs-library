---
title: "Index Merge"
lang: en
---

It is one of the most common question about indexing: is it better to create one index for each column or a single index for all columns of a `where` clause? The answer is very simple in most cases: one index with multiple columns is better—that is, a concatenated or compound index. [“*Concatenated Indexes*”](/sql/where-clause/the-equals-operator/concatenated-keys) explains them in detail.

Nevertheless there are queries where a single index cannot do a perfect job, no matter how you define the index; e.g., queries with two or more independent range conditions as in the following example:

```sql
SELECT first_name, last_name, date_of_birth 
  FROM employees
 WHERE UPPER(last_name) < ? 
   AND date_of_birth    < ?
```

It is impossible to define a B-tree index that would support this query without filter predicates. For an explanation, you just need to remember that an [index is a linked list](/sql/anatomy).

If you define the index as `UPPER(LAST_NAME)`, `DATE_OF_BIRTH` (in that order), the list begins with A and ends with Z. The date of birth is considered only when there are two employees with the same name. If you define the index the other way around, it will start with the eldest employees and end with the youngest. In that case, the names only have a minor impact on the sort order.

No matter how you twist and turn the index definition, the entries are always arranged along a chain. At one end, you have the small entries and at the other end the big ones. An index can therefore only support one range condition as an access predicate. Supporting two independent range conditions requires a second axis, for example like a chessboard. The query above would then match all entries from one corner of the chessboard, but an index is not like a chessboard—it is like a chain. There is no corner.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-index-combine&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

You can of course accept the filter predicate and use a multi-column index nevertheless. That is the best solution in many cases anyway. The index definition should then mention the more selective column first so it can be used with an access predicate. That might be the origin of the “[most selective first](/sql/myth-directory/most-selective-first)” myth but this rule only holds true if you cannot avoid a filter predicate.

The other option is to use two separate indexes, one for each column. Then the database must scan both indexes first and then combine the results. The duplicate index lookup alone already involves more effort because the database has to traverse two index trees. Additionally, the database needs a lot of memory and CPU time to combine the intermediate results.

#### Note

One index scan is faster than two.

Databases use two methods to combine indexes. Firstly there is the index join. [Chapter 4*The Join Operation*](/sql/join) explains the related algorithms in detail. The second approach makes use of functionality from the data warehouse world.

The [data warehouse](https://en.wikipedia.org/wiki/Data_warehouse) is the mother of all ad-hoc queries. It just needs a few clicks to combine arbitrary conditions into the query of your choice. It is impossible to predict the column combinations that might appear in the `where` clause and that makes indexing, as explained so far, almost impossible.

Data warehouses use a special purpose index type to solve that problem: the so-called *bitmap index*. The advantage of bitmap indexes is that they can be combined rather easily. That means you get decent performance when indexing each column individually. Conversely if you know the query in advance, so that you can create a tailored multi-column B-tree index, it will still be faster than combining multiple bitmap indexes.

By far the greatest weakness of bitmap indexes is the ridiculous `insert`, `update` and `delete` scalability. Concurrent write operations are virtually impossible. That is no problem in a data warehouse because the load processes are scheduled one after another. In online applications, bitmap indexes are mostly useless.

#### Important

Bitmap indexes are almost unusable for online transaction pro­cessing (OLTP).

Many database products offer a hybrid solution between B-tree and bitmap indexes. In the absence of a better access path, they convert the results of several B-tree scans into in-memory bitmap structures. Those can be combined efficiently. The bitmap structures are not stored persistently but discarded after statement execution, thus bypassing the problem of the poor write scalability. The downside is that it needs a lot of memory and CPU time. This method is, after all, an optimizer’s act of desperation.
