---
title: "Heap Only Tuple (HOT)"
lang: en
---

# 7.1. Heap Only Tuple (HOT)

PostgreSQL 8.3 (2008) implemented HOT to effectively use both index and table pages when an updated row is stored in the same page as the old row. HOT also reduces the need for VACUUM processing.

Since the [README.HOT](https://github.com/postgres/postgres/blob/master/src/backend/access/heap/README.HOT) file in the source code directory describes HOT in detail, this chapter only provides a brief introduction.

Section 7.1.1 describes how PostgreSQL updates a row without HOT to clarify the issues that HOT resolves. Section 7.1.2 then describes how HOT works.

## 7.1.1. Update a Row Without HOT

Assume the table ’tbl’ has two columns: ‘id’ (primary key) and ‘data’.

```
testdb=# \d tbl
                Table &#34;public.tbl&#34;
 Column |  Type   | Collation | Nullable | Default
--------+---------+-----------+----------+---------
 id     | integer |           | not null |
 data   | text    |           |          |
Indexes:
    &#34;tbl_pkey&#34; PRIMARY KEY, btree (id)
```

Table ’tbl’ contains 1,000 tuples. The last tuple (id = 1000) is stored in the 5th page of the table. The corresponding index tuple (key = 1000) points to this tuple with TID ‘(5, 1)’. See Figure 7.1(a).

![](/images/postgres-internals/pgsql07-fig-7-01.webp)

#### Figure 7.1. Update a row without HOT

Consider how the last tuple is updated without HOT.

```
testdb=# UPDATE tbl SET data = 'B' WHERE id = 1000;
```

In this case, PostgreSQL inserts both the new table tuple and a new index tuple. See Figure 7.1(b).

The insertion of index tuples consumes index page space. Furthermore, both the insertion and vacuuming costs of index tuples are high. HOT reduces the impact of these issues.

## 7.1.2. How HOT Performs

When a row is updated with HOT, PostgreSQL does not insert a new index tuple if the updated row is stored in the same table page as the old row. Instead, it sets the HEAP_HOT_UPDATED bit in the t_informask2 field of the old tuple and the HEAP_ONLY_TUPLE bit in the new tuple. See Figures 7.2 and 7.3.

![](/images/postgres-internals/pgsql07-fig-7-02.webp)

#### Figure 7.2. Update a row with HOT

For example, in this case, Tuple_1 is marked with HEAP_HOT_UPDATED, and Tuple_2 is marked with HEAP_ONLY_TUPLE.

In addition, PostgreSQL uses these bits regardless of whether the **pruning** and **defragmentation** processes (described below) are executed.

![](/images/postgres-internals/pgsql07-fig-7-03.webp)

#### Figure 7.3. HEAP_HOT_UPDATED and HEAP_ONLY_TUPLE bits

The following describes how PostgreSQL accesses updated tuples via an index scan immediately after a HOT update. See Figure 7.4(a).

![](/images/postgres-internals/pgsql07-fig-7-04.webp)

#### Figure 7.4. Pruning of the line pointers

- (1) Find the index tuple that points to the target tuple.
- (2) Access line pointer [1] pointed to by the index tuple.
- (3) Read Tuple_1.
- (4) Read Tuple_2 via the t_ctid of Tuple_1.

PostgreSQL reads both tuples and decides which is visible using the concurrency control mechanism described in [Chapter 5](/book/postgres-internals/pgsql05/index).

However, a problem arises if dead tuples are removed from table pages. In Figure 7.4(a), if Tuple_1 is removed as a dead tuple, the index cannot access Tuple_2.

To resolve this, PostgreSQL redirects the line pointer of the old tuple to the line pointer of the new tuple at an appropriate time. This process is called **pruning**. Figure 7.4(b) depicts how PostgreSQL accesses tuples after pruning.

- (1) Find the index tuple.
- (2) Access line pointer [1] pointed to by the index tuple.
- (3) Access line pointer [2] via the redirected line pointer.
- (4) Read Tuple_2 pointed to by line pointer [2].

Pruning is executed, if possible, during SQL commands such as SELECT, UPDATE, INSERT, and DELETE. This documantation does not describe the exact execution timing because it is complicated; details are in the [README.HOT](https://github.com/postgres/postgres/blob/master/src/backend/access/heap/README.HOT) file.

PostgreSQL also removes dead tuples at an appropriate time, similar to the pruning process. This process is called **defragmentation**. Figure 7.5 depicts defragmentation by HOT.

![](/images/postgres-internals/pgsql07-fig-7-05.webp)

#### Figure 7.5. Defragmentation of the dead tuples

The cost of defragmentation is lower than normal VACUUM processing because it does not involve removing index tuples.

Thus, HOT reduces the page consumption of both indexes and tables. It also reduces the number of tuples that VACUUM must process. Consequently, HOT improves performance by reducing index tuple insertions and the necessity of VACUUM processing.

## 7.1.3. The Cases in which HOT is not available

To understand HOT clearly, two cases in which HOT cannot be used are shown below:

- (a) When the updated tuple is stored in a different page from the old tuple, PostgreSQL must insert a new index tuple. See Figure 7.6(a).
- (b) When the key value of the index tuple is updated, PostgreSQL must insert a new index tuple. See Figure 7.6(b).

![](/images/postgres-internals/pgsql07-fig-7-06.webp)

#### Fig. 7.6. The Cases in which HOT is not available.

# 7.2. Index-Only Scans

Index-only scans (often called index-only access) reduce I/O cost by directly using the index key without accessing table pages. This occurs when the index key includes all target entries of a SELECT statement. Almost all commercial RDBMS, such as DB2 and Oracle, provide this technique. PostgreSQL introduced this option in version 9.2 (2012).

The following example describes how index-only scans perform in PostgreSQL.

The example uses the following assumptions:

**Table definition:** The table ’tbl’ is defined as follows:

```
testdb=# \d tbl
      Table &#34;public.tbl&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 name   | text    |
 data   | text    |
Indexes:
    &#34;tbl_idx&#34; btree (id, name)
```

**Index:** The index ’tbl_idx’ consists of two columns: ‘id’ and ’name’.

**Tuples:** The table ’tbl’ contains the following tuples:

- Tuple_18: id is 18, name is ‘Queen’; stored in page 0.
- Tuple_19: id is 19, name is ‘BOSTON’; stored in page 1.

**Visibility:** All tuples in page 0 are visible; the tuples in page 1 are not. The visibility of each page is recorded in the corresponding Visibility Map (VM). (See Section 6.2 for VM details.)

The following SELECT command demonstrates how PostgreSQL reads these tuples:

```
testdb=# SELECT id, name FROM tbl WHERE id BETWEEN 18 and 19;
 id |  name
----+--------
 18 | Queen
 19 | Boston
(2 rows)
```

This query retrieves data from the ‘id’ and ’name’ columns. Since ’tbl_idx’ contains both columns, accessing table pages initially seems unnecessary.

In principle, however, PostgreSQL must check tuple visibility. Index tuples do not contain transaction information, such as the t_xmin and t_xmax fields found in heap tuples (described in Section 5.2). Consequently, PostgreSQL must normally access table data to verify the visibility of the index tuples.

To resolve this dilemma, PostgreSQL utilizes the Visibility Map. If all tuples in a page are visible, PostgreSQL uses the index tuple key and skips the table page access. Otherwise, PostgreSQL reads the table tuple to check visibility, which is the standard process.

In this example, PostgreSQL does not access Tuple_18 because page 0 is marked as visible in the VM. In contrast, PostgreSQL must access Tuple_19 to handle concurrency control because page 1 is not marked as fully visible. See Figure 7.7.

![](/images/postgres-internals/pgsql07-fig-7-07.webp)

#### Figure 7.7. How Index-Only Scans performs
