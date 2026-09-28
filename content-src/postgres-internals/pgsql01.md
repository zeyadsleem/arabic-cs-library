---
title: "Database Cluster, Databases, and Tables"
lang: en
---

# 1.1. Logical Structure of Database Cluster

A **database cluster** is a collection of *databases* managed by a PostgreSQL server. If you are hearing this definition for the first time, you might be wondering what it means. The term “database cluster” in PostgreSQL does **not** mean “a group of database servers”. A PostgreSQL server runs on a single host and manages a single database cluster.

Figure 1.1 shows the logical structure of a database cluster. A *database* is a collection of *database objects*. In relational database theory, a database object is a data structure used to store or reference data. A (heap) *table* is a typical example; others include indexes, sequences, views, and functions. In PostgreSQL, databases themselves are also considered database objects and are logically isolated from one another. All other database objects (e.g., tables and indexes) belong to their respective databases.

![](/images/postgres-internals/pgsql01-fig-1-01.webp)

#### Figure 1.1. Logical structure of a database cluster.

All the database objects in PostgreSQL are internally managed by respective **object identifiers (OIDs)**, which are unsigned 4-byte integers. The relations between database objects and their respective OIDs are stored in appropriate [system catalogs](http://www.postgresql.org/docs/current/static/catalogs.html), depending on the type of objects. For example, OIDs of databases and heap tables are stored in [pg_database](https://www.postgresql.org/docs/current/catalog-pg-database.html) and [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html), respectively.

To find the desired OIDs, execute the following queries:

```
sampledb=# SELECT datname, oid FROM pg_database WHERE datname = 'sampledb';
 datname  |  oid
----------+-------
 sampledb | 16384
(1 row)

sampledb=# SELECT relname, oid FROM pg_class WHERE relname = 'sampletbl';
  relname  |  oid
-----------+-------
 sampletbl | 18740
(1 row)
```

** Historical Information

Until PostgreSQL 11 (2018), the database could automatically assign a unique OID (Object Identifier) to every row in user tables, just as it does for tables and indexes.

This feature originated from PostgreSQL’s predecessor, POSTGRES, which was designed as an “Object-Relational Database.” Influenced by the cutting-edge object-oriented concepts of the time, the underlying philosophy was to treat everything &mdash; not just tables, but also the stored data (tuples) themselves &mdash; as “objects” with their own identities.

Below is an example of implicit OID assignment in Version 8.0:

```
testdb=# SELECT version();
                                     version
--------------------------------------------------------------------
 PostgreSQL 8.0.26 on arm-apple-darwin24.5.0, compiled by
                  GCC Apple clang version 17.0.0 (clang-1700.0.13.5)
(1 row)

testdb=# \d tbl
      Table &#34;public.tbl&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | text    |

testdb=# SELECT * FROM tbl;
 id | data
----+------
  1 | a
  2 | b
  3 | c
(3 rows)

testdb=# SELECT oid, * FROM tbl;
  oid  | id | data
-------+----+------
 17236 |  1 | a
 17237 |  2 | b
 17238 |  3 | c
(3 rows)
```

As shown here, an OID was automatically assigned to every row.

However, accessing data using internal OIDs conflicted with the core principles of Relational Databases (RDB), which focus on manipulating data based on its actual values. Combined with the physical limitations of the 32-bit OID format, this feature became impractical for most use cases relatively early on.

For a long time, it was maintained only for backward compatibility. After a lengthy transition period, row-level OIDs were disabled by default in version 8.1 (2005) and finally removed in version 12 (2019).

# 1.2. Physical Structure of Database Cluster

A database cluster is basically a single directory, referred to as **base directory**. It contains some subdirectories and many files. When you execute the [initdb](http://www.postgresql.org/docs/current/static/app-initdb.html) utility to initialize a new database cluster, a base directory will be created under the specified directory. The path of the base directory is usually set to the environment variable *PGDATA*.

Figure 1.2 shows an example of a database cluster in PostgreSQL. A database is a subdirectory under the *base* directory, and each table or index is (at least) one file stored under the subdirectory of its respective database. Several other subdirectories contain specific data and configuration files.

While PostgreSQL supports *tablespaces*, the meaning of the term is different from other RDBMSs. A tablespace in PostgreSQL is a single directory that contains some data outside of the base directory.

![](/images/postgres-internals/pgsql01-fig-1-02.webp)

#### Figure 1.2. An example of database cluster.

In the following subsections, the layout of a database cluster, databases, files associated with tables and indexes, and tablespaces in PostgreSQL are described.

Section Contents

- 1.2.1. The logical structure of a database cluster
- 1.2.2. Layout of Databases
- 1.2.3. Layout of Files Associated with Tables and Indexes
- 1.2.4. Tablespaces

## 1.2.1. Layout of a Database Cluster

The layout of the database cluster is described in the [official documentation](http://www.postgresql.org/docs/current/static/storage-file-layout.html). Table 1.1 lists the main files and subdirectories discussed in that section:

| files | description |
| --- | --- |
| PG_VERSION | A file containing the major version number of PostgreSQL. |
| current_logfiles | A file recording the log file(s) currently written to by the logging collector. |
| pg_hba.conf | A file to control PostgreSQL's client authentication. |
| pg_ident.conf | A file to control PostgreSQL's user name mapping. |
| postgresql.conf | A file to set configuration parameters. |
| postgresql.auto.conf | A file used for storing configuration parameters that are set in ALTER SYSTEM. (versions 9.4 or later) |
| postmaster.opts | A file recording the command line options the server was last started with. |
| subdirectories | description |
| base/ | Subdirectory containing per-database subdirectories. |
| global/ | Subdirectory containing cluster-wide tables, such as pg_database and pg_control. |
| pg_commit_ts/ | Subdirectory containing transaction commit timestamp data. (versions 9.5 or later) |
| pg_clog/ (versions 9.6 or earlier) | Subdirectory containing transaction commit state data. It is renamed to *pg_xact* in version 10. |
| pg_dynshmem/ | Subdirectory containing files used by the dynamic shared memory subsystem. (versions 9.4 or later) |
| pg_logical/ | Subdirectory containing status data for logical decoding. (versions 9.4 or later) |
| pg_multixact/ | Subdirectory containing multitransaction status data. (used for shared row locks) |
| pg_notify/ | Subdirectory containing LISTEN/NOTIFY status data. |
| pg_repslot/ | Subdirectory containing [replication slot](http://www.postgresql.org/docs/current/static/warm-standby.html#STREAMING-REPLICATION-SLOTS) data. Replication Slots will be described in Section 11.4. (versions 9.4 or later) |
| pg_serial/ | Subdirectory containing information about committed serializable transactions. (versions 9.1 or later) |
| pg_snapshots/ | Subdirectory containing exported snapshots. The PostgreSQL's function pg_export_snapshot creates a snapshot information file in this subdirectory. (versions 9.2 or later) |
| pg_stat/ | Subdirectory containing permanent files for the statistics subsystem. |
| pg_stat_tmp/ | Subdirectory containing temporary files for the statistics subsystem. |
| pg_subtrans/ | Subdirectory containing subtransaction status data. |
| pg_tblspc/ | Subdirectory containing symbolic links to tablespaces. |
| pg_twophase/ | Subdirectory containing state files for prepared transactions. |
| pg_wal/ (versions 10 or later) | Subdirectory containing WAL (Write Ahead Logging) segment files. It is renamed from *pg_xlog* in Version 10. WAL will be described in [Chapter 9](/book/postgres-internals/pgsql09/index). |
| pg_xact/ (versions 10 or later) | Subdirectory containing transaction commit state data. It is renamed from *pg_clog* in Version 10. CLOG will be described in Section 5.4. |
| pg_xlog/ (versions 9.6 or earlier) | Subdirectory containing WAL (Write Ahead Logging) segment files. It is renamed to *pg_wal* in Version 10. |

** Historical information

In version 10 (2017), the subdirectories *pg_xlog* and *pg_clog* were renamed to *pg_wal* and *pg_xact*, respectively.

This change was made because users unfamiliar with PostgreSQL occasionally deleted these directories, mistaking them for regular log storage folders.

## 1.2.2. Layout of Databases

Each database is a subdirectory located under the base directory. The names of these subdirectories are identical to their respective OIDs. For example, if the database “sampledb” has an OID of 16384, its subdirectory name is also 16384.

```bash
$ cd $PGDATA
$ ls -ld base/16384
drwx------  213 postgres postgres  7242  8 26 16:33 16384
```

## 1.2.3. Layout of Files Associated with Tables and Indexes

Each table and index is stored in a single file under its database directory if its size is under 1 GB. Tables and indexes are managed internally by their OIDs, while their physical data files are managed by an identifier called **relfilenode**. Although a relfilenode usually matches its corresponding OID, this is **not** always the case; the details are described below.

The following example shows the OID and relfilenode of the table “sampletbl”:

```
sampledb=# SELECT relname, oid, relfilenode FROM pg_class WHERE relname = 'sampletbl';
  relname  |  oid  | relfilenode
-----------+-------+-------------
 sampletbl | 18740 |       18740
(1 row)
```

In this case, the OID and relfilenode values are identical. The physical data file path for “sampletbl” is `$PGDATA/base/16384/18740`.

```bash
$ cd $PGDATA
$ ls -la base/16384/18740
-rw------- 1 postgres postgres 8192 Apr 21 10:21 base/16384/18740
```

The relfilenode values of tables and indexes change when certain commands are issued, such as TRUNCATE, REINDEX, or CLUSTER. For example, if we truncate the table “sampletbl”, PostgreSQL assigns a new relfilenode (18812) to the table, removes the old data file (18740), and creates a new one (18812).

```
sampledb=# TRUNCATE sampletbl;
TRUNCATE TABLE

sampledb=# SELECT relname, oid, relfilenode FROM pg_class WHERE relname = 'sampletbl';
  relname  |  oid  | relfilenode
-----------+-------+-------------
 sampletbl | 18740 |       18812
(1 row)
```

** Info

In versions 9.0 or later, the built-in function [pg_relation_filepath()](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-DBLOCATION) is particularly useful. It returns the relative file path of the relation associated with a specified OID or name.

```
sampledb=# SELECT pg_relation_filepath('sampletbl');
 pg_relation_filepath
----------------------
 base/16384/18812
(1 row)
```

When the file size of a table or index exceeds 1 GB, PostgreSQL creates a new segment file named *relfilenode.1*. If that file is also filled, PostgreSQL creates *relfilenode.2*, and so on.

```bash
$ cd $PGDATA
$ ls -la -h base/16384/19427*
-rw------- 1 postgres postgres 1.0G  Apr  21 11:16 data/base/16384/19427
-rw------- 1 postgres postgres  45M  Apr  21 11:20 data/base/16384/19427.1
```

** Info

The maximum file size for tables and indexes can be changed using the “&ndash;with-segsize” configuration option when building PostgreSQL from source.

Examination of the database subdirectories reveals that each table typically has two associated auxiliary files, suffixed with “_fsm” and “_vm”. These are the **free space map** and the **visibility map**, respectively.

The free space map (FSM) stores information regarding the available capacity of each page within the table file. The visibility map (VM) tracks the visibility status of each page. (Further details are available in Sections 5.3.4 and 6.2.)

Indexes only have individual free space maps but do not have visibility map.

A specific example of these foles is shown below:

```bash
$ cd $PGDATA
$ ls -la base/16384/18751*
-rw------- 1 postgres postgres  8192 Apr 21 10:21 base/16384/18751
-rw------- 1 postgres postgres 24576 Apr 21 10:18 base/16384/18751_fsm
-rw------- 1 postgres postgres  8192 Apr 21 10:18 base/16384/18751_vm
```

The free space map and visibility map are internally referred to as **forks** of the relation. The main data file is designated as fork number 0. The free space map is the first fork (fork number 1), and the visibility map is the second fork (fork number 2) of the table’s data file.

## 1.2.4. Tablespaces

A tablespace in PostgreSQL is an additional data area outside the base directory. This functionality was implemented in version 8.0 (2005).

Figure 1.3 shows the internal layout of a tablespace and its relationship with the main data area.

![](/images/postgres-internals/pgsql01-fig-1-03.webp)

#### Figure 1.3. A Tablespace in the Database Cluster.

A tablespace is initialized within the directory specified during the execution of the [CREATE TABLESPACE](http://www.postgresql.org/docs/current/static/sql-createtablespace.html) command.

Within that specified directory, a version-specific subdirectory is automatically created. The naming convention for this subdirectory is as follows:

- **Tablespace Directory Naming Convention**: `PG_[Major version]_[Catalogue version number]`

For instance, if a tablespace named “new_tblspc” is created at `/home/postgres/tblspc` with an OID of 16386, a subdirectory such as *“PG_14_202011044”* is generated under that path.

```bash
$ ls -l /home/postgres/tblspc/
total 4
drwx------ 2 postgres postgres 4096 Apr 21 10:08 PG_14_202011044
```

The tablespace directory is linked to the database cluster via a symbolic link located in the *pg_tblspc* subdirectory. The name of this link corresponds to the OID of the tablespace.

```bash
$ ls -l $PGDATA/pg_tblspc/
total 0
lrwxrwxrwx 1 postgres postgres 21 Apr 21 10:08 16386 -> /home/postgres/tblspc
```

When a new database (OID 16387) is created within the tablespace, its corresponding directory is placed under the version-specific subdirectory:

```bash
$ ls -l /home/postgres/tblspc/PG_14_202011044/
total 4
drwx------ 2 postgres postgres 4096 Apr 21 10:10 16387
```

If a new table is created within a tablespace for a database that otherwise resides in the base directory, a directory named after the database’s OID is first created under the version-specific subdirectory of that tablespace. The new table file is then placed within this newly created directory.

```
sampledb=# CREATE TABLE newtbl (.....) TABLESPACE new_tblspc;

sampledb=# SELECT pg_relation_filepath('newtbl');
             pg_relation_filepath
---------------------------------------------
 pg_tblspc/16386/PG_14_202011044/16384/18894
```

# 1.3. Heap Table Structure

This section explains the internal layout of a heap table and the mechanism of TOAST (The Oversized-Attribute Storage Technique).

Section Contents

- 1.3.1. Internal Page Layout
- 1.3.2. TOAST (The Oversized-Attribute Storage Technique)

## 1.3.1. Internal Page Layout

Data files &mdash; including heap tables, indexes, free space maps, and visibility maps &mdash; are divided into **pages** (or **blocks**) of a fixed length, which defaults to 8192 bytes (8 KB). The pages within each file are numbered sequentially starting from 0; these identifiers are referred to as **block numbers**. When a file reaches its capacity, PostgreSQL appends a new, empty page to the end of the file to increase its size.

The internal layout of a page depends on the specific type of data file. This section focuses on the layout of heap tables, as this information is essential for understanding the concepts discussed in subsequent chapters.

![](/images/postgres-internals/pgsql01-fig-1-04.webp)

#### Figure 1.4. Page layout of a heap table file.

A page within a table contains three kinds of data:

1. **heap tuple(s):** A heap tuple represents the record data itself. Tuples are stacked sequentially from the bottom of the page. The internal structure of tuple is described in Section 5.2 and [Chapter 9](/book/postgres-internals/pgsql09/index), as understanding it requires prerequisite knowledge of both Concurrency Control (CC) and Write-Ahead Logging (WAL).
2. **line pointer(s):** Each line pointer is 4 bytes long and holds a pointer to a specific heap tuple. It is also referred to as an **item pointer**. Line pointers form a simple array that serves as an index to the tuples. Each element in the array is numbered sequentially starting from 1, referred to as the **offset number**. When a new tuple is added to the page, a corresponding line pointer is appended to the array to point to the new tuple.
3. **header data:** Defined by the `PageHeaderData` structure in [bufpage.h](https://github.com/postgres/postgres/blob/master/src/include/storage/bufpage.h), header data is allocated at the beginning of the page. It is 24 bytes long and contains general information about the page. The major variables of the structure include: **pd_lsn:** This variable stores the Log Sequence Number (LSN) of XLOG record associated with the most recent change to this page. It is an 8-byte unsigned integer related to the WAL (Write-Ahead Logging) mechanism. Further details are available in Section 9.1.2.
4. **pd_checksum:** This variable stores the checksum value of the page. (Note: This variable is supported in versions 9.3 or later; in earlier versions, this field had stored *pd_tli*, which is the timelineId of the page.)
5. **pd_lower, pd_upper:** pd_lower points to the end of the line pointers, while pd_upper points to the beginning of the most recent heap tuple.
6. **pd_special:** This variable is utilized for indexes. In table pages, it points to the end of the page. (In index pages, it points to the beginning of the special space, a data area specific to index types such as B-tree, GiST, GIN, etc.)

The `PageHeaderData` structure is shown below:

```
typedef struct PageHeaderData
{
	/* XXX LSN is member of *any* block, not only page-organized ones */
	PageXLogRecPtr pd_lsn;		/* LSN: next byte after last byte of xlog
								 * record for last change to this page */
	uint16		pd_checksum;	/* checksum */
	uint16		pd_flags;		/* flag bits, see below */
	LocationIndex pd_lower;		/* offset to start of free space */
	LocationIndex pd_upper;		/* offset to end of free space */
	LocationIndex pd_special;	/* offset to start of special space */
	uint16		pd_pagesize_version;
	TransactionId pd_prune_xid; /* oldest prunable XID, or zero if none */
	ItemIdData	pd_linp[FLEXIBLE_ARRAY_MEMBER]; /* line pointer array */
} PageHeaderData;

typedef PageHeaderData *PageHeader;

typedef uint64 XLogRecPtr;
```

The empty space between the end of the line pointers and the beginning of the most recent tuple is referred to as **free space** or **the hole**.

To identify a specific tuple within a table, a **tuple identifier (TID)** is used internally. A TID comprises a pair of values: the **block number** of the page containing the tuple and the **offset number** of the line pointer pointing to that tuple. TIDs are commonly used in indexes; see Section 1.4.2 for further details.

## 1.3.2. TOAST (The Oversized-Attribute Storage Technique)

Heap tuples that exceed approximately **2 KB** &mdash; specifically, the default `TOAST_TUPLE_THRESHOLD` of 2,032 bytes &mdash; are managed using a mechanism called [TOAST](http://www.postgresql.org/docs/current/static/storage-toast.html).

If a data item still exceeds this 2 KB threshold even after compression, PostgreSQL creates a dedicated **TOAST table** and a corresponding **TOAST index** for that specific table. The actual data is stored within the TOAST table, while the parent table stores only a pointer referencing the TOAST entry.

### 1.3.2.1. Practical Example

To demonstrate this mechanism, a table named *tbl_toast* is created.

```
testdb=# CREATE TABLE tbl_toast (id SERIAL PRIMARY KEY, data text);
testdb=# ALTER TABLE tbl_toast ALTER COLUMN data SET STORAGE EXTERNAL;
```

A small string (‘abc’) is inserted into the first row, fitting within a standard page. For the second and third rows, approximately 10 KB of data is inserted into each.

```
testdb=# INSERT INTO tbl_toast (data) VALUES ('abc');
testdb=# INSERT INTO tbl_toast (data) SELECT repeat('abcdefghij', 1000) FROM generate_series(1, 2);
```

In this case, the OID of *tbl_toast* is **16406**.

```
testdb=# SELECT relname, oid, relfilenode FROM pg_class WHERE relname = 'tbl_toast';
  relname  |  oid  | relfilenode
-----------+-------+-------------
 tbl_toast | 16406 |       16406
(1 row)
```

Consequently, the corresponding TOAST table and its index are named *pg_toast_16406* and *pg_toast_16406_index*, respectively.

```
testdb=# SELECT relname, relpages FROM pg_class
    WHERE relname LIKE '%toast%16406%'
    	  AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'pg_toast');
       relname        | relpages
----------------------+----------
 pg_toast_16406       |        0
 pg_toast_16406_index |        1
(2 rows)
```

The OIDs and physical file paths of these relations can be retrieved using the following query. In this example, the paths are `base/16384/16411` and `base/16384/16412`.

```
testdb=# \x
Expanded display is on.
testdb=# SELECT c.relname AS main_table, t.relname AS toast_table, t.oid AS toast_table_oid,
	 	pg_relation_filepath(t.oid) AS physical_path,
                i.relname AS toast_index, i.oid AS toast_index_oid,
		pg_relation_filepath(i.oid) AS index_path
         FROM pg_class c JOIN pg_class t ON c.reltoastrelid = t.oid
             JOIN pg_index idx ON idx.indrelid = t.oid
             JOIN pg_class i ON i.oid = idx.indexrelid WHERE c.relname = 'tbl_toast';
-[ RECORD 1 ]---+---------------------
main_table      | tbl_toast
toast_table     | pg_toast_16406
toast_table_oid | 16411
physical_path   | base/16384/16411
toast_index     | pg_toast_16406_index
toast_index_oid | 16412
index_path      | base/16384/16412
```

** Tuple Compression

To demonstrate the TOAST mechanism, this example prevents data compression by adjusting storage parameters with the ALTER TABLE command.

PostgreSQL typically compresses data if its size exceeds 2 KB. The default compression method is **pglz** (PostgreSQL Lempel-Ziv).

### 1.3.2.2. Structural Analysis

Figure 1.5 illustrates the relationship between the main table *tbl_toast* and the TOAST table *pg_toast_16406*.

![A single TOAST pointer logically references multiple chunk rows (chunk_seq 0 to 5) as a unified ‘data’ item.](/images/postgres-internals/pgsql01-fig-1-05.webp)

#### Figure 1.5: Structural mapping between the Main Table and its associated TOAST Table.

A single TOAST pointer logically references multiple chunk rows (chunk_seq 0 to 5) as a unified ‘data’ item.

Since the ‘data’ items in the second and third rows of *tbl_toast* are 10 KB, they are stored as TOAST pointers using the `varatt_external` structure instead of raw data.

The definition of the *varatt_external* structure is as follows:

```
typedef struct varatt_external
{
    int32   va_rawsize;     /* Original data size (includes header) */
    uint32  va_extinfo;     /* External saved size (without header) and compression method */
    Oid     va_valueid;     /* Unique ID of value within TOAST table */
    Oid     va_toastrelid;  /* RelID of TOAST table containing it */
}   varatt_external;
```

These four fields are described below:

- **va_rawsize**: The original data size, including the header.
- **va_extinfo**: The actual size stored externally (excluding the header) and the compression method used.
- **va_valueid**: A unique identifier for the value within the TOAST table, internally referred to as the **chunk_id**.
- **va_toastrelid**: The OID of the TOAST table containing the data.

The combination of **va_valueid** (chunk_id) and **va_toastrelid** functions as the actual pointer to the external data. In this example, the `va_valueid` values for the second and third tuples are **16415** and **16416**, respectively, while the `va_toastrelid` is **16411** (the OID of the TOAST table).

### 1.3.2.3. TOAST Table Content

A TOAST table consists of three columns: `chunk_id`, `chunk_seq`, and `chunk_data`.

- **chunk_id**: The identifier for the TOASTed data item from the original table.
- **chunk_seq**: A sequential number assigned when the TOASTed ‘data’ item is divided into multiple segments.
- **chunk_data**: The actual binary data segment.

The contents of *pg_toast_16406* are displayed below:

```
testdb=# SELECT chunk_id, chunk_seq, chunk_data FROM pg_toast.pg_toast_16406;
 chunk_id | chunk_seq |        chunk_data
----------+-----------+-------------------------
    16415 |         0 | \x616263646566.....6566
    16415 |         1 | \x6768696a6162.....6162
    16415 |         2 | \x636465666768.....6768
    16415 |         3 | \x696a61626364.....6364
    16415 |         4 | \x65666768696a.....696a
    16415 |         5 | \x6162...696a
    16416 |         0 | \x616263646566.....6566
    16416 |         1 | \x6768696a6162.....6162
    16416 |         2 | \x636465666768.....6768
    16416 |         3 | \x696a61626364.....6364
    16416 |         4 | \x65666768696a.....696a
    16416 |         5 | \x6162...696a
(12 rows)
```

The TOAST index utilizes *chunk_id* and *chunk_seq* as composite keys. When retrieving TOASTed data, the system performs an **index scan** on the TOAST index to fetch the corresponding *chunk_data* segments in the correct order.

# 1.4. The Methods of Writing and Reading Tuples

The final section of this chapter describes the methods for writing and reading heap tuples.

Section Contents

- 1.4.1. Writing Heap Tuples
- 1.4.2. Reading Heap Tuples

## 1.4.1. Writing Heap Tuples

Consider a table consisting of a single page that contains one heap tuple. In this state, the *pd_lower* of the page points to the first line pointer, while both the line pointer and *pd_upper* point to the first heap tuple, as illustrated in Figure 1.6(a).

When a second tuple is inserted, it is placed preceding the first one (stacked from the bottom). A second line pointer is appended to the first, pointing to this new tuple. Consequently, *pd_lower* is updated to point to the end of the second line pointer, and *pd_upper* is updated to the beginning of the second heap tuple. See Figure 1.6(b). Other header data within this page (e.g., pd_lsn, pd_checksum, pd_flags) are also updated to appropriate values; further details are provided in Section 5.3 and Section 9.4.

![](/images/postgres-internals/pgsql01-fig-1-06.webp)

#### Figure 1.6. Writing a heap tuple.

## 1.4.2. Reading Heap Tuples

Two typical access methods, sequential scan and B-tree index scan, are outlined below:

- **Sequential scan:** This method reads all tuples in all pages sequentially by scanning every line pointer in each page. See Figure 1.7(a).
- **B-tree index scan:** This method reads an index file containing index tuples. Each index tuple consists of an index key and a TID pointing to the *target heap tuple*. When an index tuple matching the search key is identified[1](#fn:1), PostgreSQL retrieves the corresponding heap tuple using the obtained TID. For example, in Figure 1.7(b), the TID of the retrieved index tuple is ‘(block = 7, offset = 2)’. This indicates the target heap tuple is the 2nd tuple in the 7th page of the table, allowing PostgreSQL to access the data directly without scanning unnecessary pages.

![](/images/postgres-internals/pgsql01-fig-1-07.webp)

#### Figure 1.7. Sequential scan and index scan.

The specific mechanism used by the executor to access tables is described in Section 3.4.1.

** Info

PostgreSQL also supports TID-Scan, [Bitmap-Scan](https://wiki.postgresql.org/wiki/Bitmap_Indexes), and Index-Only-Scan.

TID-Scan is a method that accesses a tuple directly using its TID. For example, to retrieve the 1st tuple in the 0-th page of a table, the following query can be executed:

```
sampledb=# SELECT ctid, data FROM sampletbl WHERE ctid = '(0,1)';
 ctid  |   data
-------+-----------
 (0,1) | AAAAAAAAA
(1 row)
```

Index-Only-Scan will be described in details in Section 7.2.

1. The procedure for finding index tuples within a B-tree index is omitted here, as it is a widely documented concept and space is limited. Please refer to relevant technical documentation for details.&#160;[&#x21a9;&#xfe0e;](#fnref:1)
