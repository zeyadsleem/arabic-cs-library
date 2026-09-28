---
title: "Concurrency Control"
lang: en
---

# 5.1 Transaction ID

At the start of every transaction, the transaction manager assigns a unique identifier known as a transaction ID (**txid**). PostgreSQL’s txid is a 32-bit unsigned integer, providing a maximum range of approximately 4.2 billion (thousand millions) values.

The built-in [txid_current()](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-TXID-SNAPSHOT) function returns the current txid:

```
testdb=# BEGIN;
BEGIN
testdb=# SELECT txid_current();
 txid_current
--------------
          100
(1 row)
```

PostgreSQL reserves three special txids:

- **0:** Represents an Invalid txid.
- **1:** Represents the Bootstrap txid, used only during database cluster initialization.
- **2:** Represents the Frozen txid, as described in Section 5.10.2.

Txids are comparable. From the perspective of txid 100, IDs greater than 100 are considered “in the future” and are **invisible**. IDs less than 100 are considered “in the past” and are **visible** (Figure 5.1 a)).

![](/images/postgres-internals/pgsql05-fig-5-01.webp)

#### Figure 5.1. Transaction ids in PostgreSQL.

Because the 32-bit txid space is insufficient in practical systems, PostgreSQL treats it as a circle. For any specific txid, the previous 2.1 billion IDs are “in the past”, while the subsequent 2.1 billion IDs are “in the future” (Figure 5.1 b)).

The **txid wraparound problem** and its solutions are described in Section 5.10.1.

** Info

The BEGIN command does not assign a txid.

In PostgreSQL, the transaction manager assigns a txid only when the first command after BEGIN is executed.

```
testdb=# BEGIN;                    -- TXID is not assigned yet.
BEGIN
testdb=# SELECT txid_current();    -- TXUD is just assigned.
 txid_current
--------------
          100
(1 row)
```

# 5.2 Tuple Structure

Heap tuples in table pages are categorized into two types: standard data tuples and TOAST tuples. This section describes the structure of standard data tuples.

A heap tuple comprises three parts: the `HeapTupleHeaderData` structure defined in [htup_details.h](https://github.com/postgres/postgres/blob/ee943004466418595363d567f18c053bae407792/src/include/access/htup_details.h), a NULL bitmap, and the user data (Figure 5.2).

![](/images/postgres-internals/pgsql05-fig-5-02.webp)

#### Figure 5.2. Tuple structure.

The `HeapTupleHeaderData` and related structures are shown below:

```
typedef struct HeapTupleFields
{
        TransactionId t_xmin;		   /* inserting xact ID */
        TransactionId t_xmax;              /* deleting or locking xact ID */

        union
        {
                CommandId       t_cid;     /* inserting or deleting command ID, or both */
                TransactionId 	t_xvac;    /* old-style VACUUM FULL xact ID */
        } t_field3;
} HeapTupleFields;

typedef struct DatumTupleFields
{
        int32          datum_len_;          /* varlena header (do not touch directly!) */
        int32          datum_typmod;   	    /* -1, or identifier of a record type */
        Oid            datum_typeid;   	    /* composite type OID, or RECORDOID */

        /*
         * Note: field ordering is chosen with thought that Oid might someday
         * widen to 64 bits.
         */
} DatumTupleFields;

typedef struct HeapTupleHeaderData
{
        union
        {
                HeapTupleFields t_heap;
                DatumTupleFields t_datum;
        } t_choice;

        ItemPointerData t_ctid;         /* current TID of this or newer tuple */

        /* Fields below here must match MinimalTupleData! */
        uint16          t_infomask2;    /* number of attributes + various flags */
        uint16          t_infomask;     /* various flag bits, see below */
        uint8           t_hoff;         /* sizeof header incl. bitmap, padding */
        /* ^ - 23 bytes - ^ */
        bits8           t_bits[1];      /* bitmap of NULLs -- VARIABLE LENGTH */

        /* MORE DATA FOLLOWS AT END OF STRUCT */
} HeapTupleHeaderData;

typedef HeapTupleHeaderData *HeapTupleHeader;
```

While the HeapTupleHeaderData structure contains several fields, the following four are essential for understanding concurrency control:

- **t_xmin:** Stores the txid of the transaction that inserted the tuple.
- **t_xmax:** Stores the txid of the transaction that deleted or updated the tuple. If the tuple has not been deleted or updated, t_xmax is set to 0 (Invalid).
- **t_cid:** Stores the command ID (cid), representing the number of SQL commands executed before the current command within the same transaction, starting from 0. For example, in a transaction block containing three INSERT commands: ‘BEGIN;INSERT;INSERT;INSERT;COMMIT’, the tuple inserted by the first command has a t_cid of 0, the second a t_cid of 1, and the third a t_cid of 2.
- **t_ctid:** Stores the tuple identifier (tid), which points either to the tuple itself or to a newer version. As described in Section 1.3, the tid identifies a tuple’s physical location within a table. When a tuple is updated, its t_ctid is updated to point to the new version of the tuple; otherwise, it points to itself.

# 5.3. Inserting, Deleting and Updating Tuples

This section describes the processes for inserting, deleting, and updating tuples. It also provides a brief overview of the Free Space Map (FSM), which is used during insertion and update operations.

To focus on tuple-level details, page headers and line pointers are omitted from the following descriptions. Figure 5.3 illustrates the basic representation of tuples used in this section.

![](/images/postgres-internals/pgsql05-fig-5-03.webp)

#### Figure 5.3. Representation of tuples.

Section Contents

- 5.3.1. Insertion
- 5.3.2. Deletion
- 5.3.3. Update
- 5.3.4. Free Space Map

## 5.3.1. Insertion

In an insertion operation, a new tuple is placed directly into a page of the target table (Figure 5.4).

![](/images/postgres-internals/pgsql05-fig-5-04.webp)

#### Figure 5.4. Tuple insertion.

Suppose a transaction with txid 99 inserts a tuple. The header fields of the inserted tuple are set as follows:

- **Tuple_1:** **t_xmin:** Set to 99 (the txid of the inserter).
- **t_xmax:** Set to 0 (Invalid), as the tuple has not been deleted or updated.
- **t_cid:** Set to 0, indicating this is the first command executed by txid 99.
- **t_ctid:** Set to (0, 1). It points to itself because it is the latest version.

** pageinspect

The [pageinspect](https://www.postgresql.org/docs/current/pageinspect.html) extension is a contribution module that displays the contents of database pages.

```sql
testdb=# CREATE EXTENSION pageinspect;
CREATE EXTENSION
testdb=# CREATE TABLE tbl (data text);
CREATE TABLE
testdb=# INSERT INTO tbl VALUES('A');
INSERT 0 1
testdb=# SELECT lp as tuple, t_xmin, t_xmax, t_field3 as t_cid, t_ctid
                FROM heap_page_items(get_raw_page('tbl', 0));
 tuple | t_xmin | t_xmax | t_cid | t_ctid
-------+--------+--------+-------+--------
     1 |     99 |      0 |     0 | (0,1)
(1 row)
```

## 5.3.2. Deletion

In a deletion operation, the target tuple is deleted logically. The txid of the transaction executing the DELETE command is recorded in the t_xmax field of the tuple (Figure 5.5).

![](/images/postgres-internals/pgsql05-fig-5-05.webp)

#### Figure 5.5. Tuple deletion.

Suppose txid 201 deletes Tuple_1. The header fields are updated as follows:

- **Tuple_1:** **t_xmax:** Set to 201.

Once txid 201 commits, Tuple_1 becomes unnecessary. In PostgreSQL, such unneeded tuples are called **dead tuples**.

Dead tuples are eventually removed by **VACUUM processing**, which is detailed in [Chapter 6](/book/postgres-internals/pgsql06/index).

## 5.3.3. Update

In an update operation, PostgreSQL logically deletes the existing version and inserts a new one (Figure 5.6).

![](/images/postgres-internals/pgsql05-fig-5-06.webp)

#### Figure 5.6. Update the row twice.

Suppose a row originally inserted by txid 99 is updated twice by txid 100.

The first UPDATE command logically deletes Tuple_1 by setting its t_xmax to 100 and then inserts Tuple_2. Additionally, the t_ctid of Tuple_1 is updated to point to Tuple_2.

- **Tuple_1:** **t_xmax:** Set to 100.
- **t_ctid:** Updated from (0, 1) to (0, 2).

**Tuple_2:**

- **t_xmin:** Set to 100.
- **t_xmax:** Set to 0.
- **t_cid:** Set to 0.
- **t_ctid:** Set to (0, 2).

The second UPDATE command follows the same logic: Tuple_2 is logically deleted, and Tuple_3 is inserted.

- **Tuple_2:** **t_xmax:** Set to 100.
- **t_ctid:** Updated from (0, 2) to (0, 3).

**Tuple_3:**

- **t_xmin:** Set to 100.
- **t_xmax:** Set to 0.
- **t_cid:** Set to 1.
- **t_ctid:** Set to (0, 3).

If txid 100 commits, Tuple_1 and Tuple_2 become dead tuples. If txid 100 aborts, Tuple_2 and Tuple_3 become dead tuples.

## 5.3.4. Free Space Map

PostgreSQL uses the **Free Space Map (FSM)** to select a page with sufficient capacity when inserting a heap or index tuple.

As described in Section 1.2.3, every table and index has an associated FSM. Each FSM tracks the available free space in each page of its corresponding file.

FSM files are stored with the “.fsm” suffix and are loaded into shared memory as needed.

** pg_freespacemap

The extension [pg_freespacemap](https://www.postgresql.org/docs/current/static/pgfreespacemap.html) displays the available free space for a specified table or index.

The following query shows the free space ratio for each page in a table.

```sql
testdb=# CREATE EXTENSION pg_freespacemap;
CREATE EXTENSION

testdb=# SELECT *, round(100 * avail/8192 ,2) as &#34;freespace ratio&#34;
                FROM pg_freespace('accounts');
 blkno | avail | freespace ratio
-------+-------+-----------------
     0 |  7904 |           96.00
     1 |  7520 |           91.00
     2 |  7136 |           87.00
     3 |  7136 |           87.00
     4 |  7136 |           87.00
     5 |  7136 |           87.00
....
```

# 5.4. Commit Log (clog)

PostgreSQL maintains transaction statuses in the **Commit Log**, commonly referred to as the **clog**. The clog is allocated within shared memory and is utilized throughout all transaction processing.

This section describes the transaction states, the operation of the clog, and its maintenance.

Section Contents

- 5.4.1. Transaction Status
- 5.4.2. How Clog Performs
- 5.4.3. Maintenance of the Clog

## 5.4.1. Transaction Status

PostgreSQL defines four transaction states: IN_PROGRESS, COMMITTED, ABORTED, and SUB_COMMITTED.

The first three states are self-explanatory. For instance, while a transaction is active, its status is IN_PROGRESS.

SUB_COMMITTED is reserved for sub-transactions; its details are omitted from this documentation.

## 5.4.2. How Clog Performs

The clog consists of one or more 8 KB pages in shared memory. Logically, it forms an array where the indices correspond to transaction IDs (txids). Each entry in the array stores the status of the corresponding txid. Figure 5.7 illustrates the structure and operation of the clog.

![](/images/postgres-internals/pgsql05-fig-5-07.webp)

#### Figure 5.7. How the clog operates.

- **T1:** txid 200 commits; its status changes from IN_PROGRESS to COMMITTED.
- **T2:** txid 201 aborts; its status changes from IN_PROGRESS to ABORTED.

As the current txid advances, PostgreSQL appends a new page whenever the current page is filled.

To perform concurrency control, internal functions retrieve the transaction status from the clog. These functions then return the state of the requested transaction. (Refer to “Hint Bits” in Section 5.7.1.1 for further details.)

## 5.4.3. Maintenance of the Clog

PostgreSQL writes clog data to files in the pg_xact[1](#fn:1) subdirectory during shutdown or whenever a checkpoint process runs. These files are named sequentially, such as ‘0000’ and ‘0001’.

The maximum size for each file is 256 KB. For example, if the clog occupies eight pages (totaling 64 KB), the data is written entirely into file 0000. If the clog occupies 37 pages (totaling 296 KB), the data is distributed between 0000 (256 KB) and 0001 (40 KB).

During startup, PostgreSQL loads the data from the pg_xact files to initialize the clog in shared memory.

The total size of the clog increases continuously as new pages are appended. However, old data eventually becomes unnecessary. The vacuum process, described in [Chapter 6](/book/postgres-internals/pgsql06/index), regularly removes obsolete clog pages and files. Details regarding the removal of clog data are provided in Section 6.4.

1. Note: “pg_xact” was named “pg_clog” in versions 9.6 and earlier.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 5.5. Transaction Snapshot

A **transaction snapshot** is a dataset that stores information regarding the activity of all transactions at a specific point in time for an individual transaction. In this context, an **active** transaction is either in progress or has not yet started.

PostgreSQL defines the internal textual representation of a transaction snapshot in the format `xmin:xmax:xip_list`. For example, in a simplified representation such as ‘100:100:’, it indicates that txids less than 100 are not active, while txids equal to or greater than 100 are active.

This representation format is used throughout the following descriptions. (For further details on the format, refer to the ** below.)

** The built-in function pg_current_snapshot and its textual representation format

The function [pg_current_snapshot](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-PG-SNAPSHOT) returns a snapshot of the current transaction.

```
testdb=# SELECT pg_current_snapshot();
 pg_current_snapshot
---------------------
 100:104:100,102
(1 row)
```

The textual representation of a snapshot follows the format `xmin:xmax:xip_list`. Each component is defined as follows:

- **xmin:** The earliest txid that is still active. All earlier transactions are either committed and visible, or rolled back and dead.
- **xmax:** The first as-yet-unassigned txid. All txids greater than or equal to this value have not started at the time of the snapshot and are therefore invisible.
- **xip_list:** A list of active txids at the time of the snapshot. This list includes only active txids between xmin and xmax.

For example, in the snapshot ‘100:104:100,102’, xmin is 100, xmax is 104, and the xip_list contains 100 and 102.

Figure 5.8 illustrates two specific examples of snapshot representations.

![](/images/postgres-internals/pgsql05-fig-5-08.webp)

#### Figure 5.8. Examples of transaction snapshot representation.

- **Example 1:** ‘100:100:’ As shown in Figure 5.8(a), this snapshot indicates the following: Txids less than 100 are **not** active (xmin = 100).
- Txids greater than or equal to 100 are **active** (xmax = 100).

**Example 2:** ‘100:104:100,102’ As shown in Figure 5.8(b), this snapshot indicates the following:

- Txids less than 100 are **not** active.
- Txids greater than or equal to 104 are **active**.
- Txids 100 and 102 are **active** because they appear in the xip_list.
- Txids 101 and 103 are **not** active.

The transaction manager provides these snapshots. Under the READ COMMITTED isolation level, a transaction obtains a new snapshot whenever an SQL command is executed. In contrast, under REPEATABLE READ or SERIALIZABLE levels, a transaction obtains a snapshot only when the first SQL command is executed. These snapshots are essential for the visibility check of tuples, which is described in Section 5.7.

When performing a visibility check, transactions identified as **active** in the snapshot must be treated as **in progress**, even if they have since been committed or aborted. This rule creates the fundamental behavioral difference between READ COMMITTED and REPEATABLE READ (or SERIALIZABLE).

The following scenario, illustrated in Figure 5.9, demonstrates the interaction between the transaction manager and individual transactions.

![](/images/postgres-internals/pgsql05-fig-5-09.webp)

#### Figure 5.9. Transaction manager and transactions.

The transaction manager maintains information on all currently running transactions. In this scenario, three transactions start sequentially: Transaction_A and Transaction_B use READ COMMITTED, while Transaction_C uses REPEATABLE READ.

- **T1:** Transaction_A starts and executes its first SELECT command. At this moment, the transaction manager assigns txid 200 and returns the snapshot ‘200:200:’.
- **T2:** Transaction_B starts and executes its first SELECT command. The transaction manager assigns txid 201 and returns the snapshot ‘200:200:’ because Transaction_A (txid 200) is still in progress. Consequently, Transaction_A is invisible to Transaction_B.
- **T3:** Transaction_C starts and executes its first SELECT command. The transaction manager assigns txid 202 and returns the snapshot ‘200:200:’. Both Transaction_A and Transaction_B are invisible to Transaction_C.
- **T4:** Transaction_A commits. The transaction manager removes the information for this transaction.
- **T5:** Transaction_B and Transaction_C execute subsequent SELECT commands: Transaction_B obtains a new snapshot because it operates at the READ COMMITTED level. It receives snapshot ‘201:201:’ because Transaction_A is now committed. Thus, Transaction_A becomes visible to Transaction_B.
- In contrast, Transaction_C does not request a new snapshot. It continues to use the initial snapshot (‘200:200:’) as required by the REPEATABLE READ level. Therefore, Transaction_A remains invisible to Transaction_C.

# 5.6. Visibility Check Rules

Visibility check rules determine whether a tuple is visible or invisible. These rules utilize the tuple’s t_xmin and t_xmax fields, the clog, and the transaction snapshot.

Due to the complexity of the full ruleset, this documentation presents only the minimal rules required for subsequent sections. The following descriptions omit sub-transaction logic and do not consider tuples updated more than twice within a single transaction (i.e., t_ctid is ignored).

The ten selected rules are classified into the following three cases based on the status of t_xmin.

Section Contents

- 5.6.1. Status of t_xmin is ABORTED
- 5.6.2. Status of t_xmin is IN_PROGRESS
- 5.6.3. Status of t_xmin is COMMITTED

## 5.6.1. Status of t_xmin is ABORTED

A tuple whose t_xmin status is ABORTED is always *invisible* (Rule 1) because the transaction that inserted the tuple failed.

```
/* t_xmin status == ABORTED */
Rule 1:	  IF t_xmin status is 'ABORTED' THEN
                 RETURN 'Invisible'
          END IF
```

- **Rule 1:** If Status(t_xmin) = ABORTED $\Rightarrow$ Invisible

## 5.6.2. Status of t_xmin is IN_PROGRESS

A tuple whose t_xmin status is IN_PROGRESS is generally *invisible* (Rules 3 and 4), with one exception for the inserting transaction (Rule 2).

```
 /* t_xmin status == IN_PROGRESS */
       IF t_xmin status is 'IN_PROGRESS' THEN
              IF t_xmin = current_txid THEN
Rule 2:              IF t_xmax = INVALID THEN
                           RETURN 'Visible'
Rule 3:              ELSE  /* this tuple has been deleted or updated  */
                           /* by the current transaction itself.      */
                            RETURN 'Invisible'
                     END IF
Rule 4:       ELSE   /* t_xmin != current_txid */
                     RETURN 'Invisible'
              END IF
       END IF
```

If another transaction inserted the tuple and its t_xmin status is IN_PROGRESS, the tuple is *invisible* (Rule 4). In other words, uncommitted changes from one transaction are *invisible* to other transactions.

The exception occurs when the current transaction inserted the tuple and t_xmax is INVALID. In this case, the tuple is *visible* to the current transaction (Rule 2) because it was inserted by the current transaction itself.

However, even if t_xmin equals the current txid (i.e., the current transaction inserted the tuple) and t_xmax is **not** INVALID, the tuple is *invisible* because the current transaction has already updated or deleted it (Rule 3).

- **Rule 2:** If Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin = current_txid $\wedge$ t_xmax = INVALID $\Rightarrow$ Visible
- **Rule 3:** If Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin = current_txid $\wedge$ t_xmax $\ne$ INVALID $\Rightarrow$ Invisible
- **Rule 4:** If Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin $\ne$ current_txid $\Rightarrow$ Invisible

## 5.6.3. Status of t_xmin is COMMITTED

A tuple whose t_xmin status is COMMITTED is *visible* (Rules 6, 8, and 9), with three exceptions.

```
 /* t_xmin status == COMMITTED */
        IF t_xmin status is 'COMMITTED' THEN
Rule 5:        IF t_xmin is 'active' in the obtained transaction snapshot THEN
                      RETURN 'Invisible'
Rule 6:        ELSE IF t_xmax = INVALID OR status of t_xmax is 'ABORTED' THEN
                      RETURN 'Visible'
               ELSE IF t_xmax status is 'IN_PROGRESS' THEN
Rule 7:               IF t_xmax =  current_txid THEN
                             RETURN 'Invisible'
Rule 8:               ELSE  /* t_xmax != current_txid */
                             RETURN 'Visible'
                      END IF
               ELSE IF t_xmax status is 'COMMITTED' THEN
Rule 9:               IF t_xmax is 'active' in the obtained transaction snapshot THEN
                             RETURN 'Visible'
Rule 10:              ELSE
                             RETURN 'Invisible'
                      END IF
               END IF
        END IF
```

Rule 6 is straightforward because t_xmax is either INVALID or ABORTED. The three exceptions, along with Rules 8 and 9, are described below.

The first exception occurs when t_xmin is active in the obtained transaction snapshot (Rule 5). Under this condition, the tuple is *invisible* because t_xmin is treated as being in progress.

The second exception occurs when t_xmax equals the current txid (Rule 7). In this case, similar to Rule 3, the tuple is *invisible* because the current transaction has deleted or updated it.

In contrast, if the status of t_xmax is IN_PROGRESS and t_xmax is not the current txid (Rule 8), the tuple is *visible*. This is because the deleting transaction is still in progress and has not yet committed.

The third exception occurs when the status of t_xmax is COMMITTED and t_xmax is **not** active in the obtained transaction snapshot (Rule 10). Under this condition, the tuple is *invisible* because another transaction has committed its deletion or update.

In contrast, if the status of t_xmax is COMMITTED but t_xmax is active in the obtained snapshot (Rule 9), the tuple is *visible*. This is because the deleting transaction is treated as being in progress.

- **Rule 5:** If Status(t_xmin) = COMMITTED $\wedge$ Snapshot(t_xmin) = active $\Rightarrow$ Invisible
- **Rule 6:** If Status(t_xmin) = COMMITTED $\wedge$ ((t_xmax = INVALID $\vee$ Status(t_xmax) = ABORTED)) $\Rightarrow$ Visible
- **Rule 7:** If Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = IN_PROGRESS $\wedge$ t_xmax = current_txid $\Rightarrow$ Invisible
- **Rule 8:** If Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = IN_PROGRESS $\wedge$ t_xmax $\ne$ current_txid $\Rightarrow$ Visible
- **Rule 9:** If Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = COMMITTED $\wedge$ Snapshot(t_xmax) = active $\Rightarrow$ Visible
- **Rule 10:** If Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = COMMITTED $\wedge$ Snapshot(t_xmax) $\ne$ active $\Rightarrow$ Invisible

In summary, a tuple with a COMMITTED t_xmin is generally *visible*. However, it is *invisible* only if the inserting transaction is still in progress (Rule 5), or if the tuple has been logically deleted or updated (Rules 7 and 10).

# 5.7. Visibility Check

This section describes the visibility check process in PostgreSQL. This process selects heap tuples of the appropriate versions for a given transaction. This section also explains how PostgreSQL prevents the anomalies defined in the ANSI SQL-92 Standard: Dirty Reads, Non-Repeatable Reads, and Phantom Reads.

Section Contents

- 5.7.1. Visibility Check
- 5.7.2. Hint Bits
- 5.7.3. Phantom Reads in PostgreSQL’s REPEATABLE READ Level

## 5.7.1. Visibility Check

Figure 5.10 illustrates a scenario for the visibility check.

![](/images/postgres-internals/pgsql05-fig-5-10.webp)

#### Figure 5.10. Scenario to describe visibility check.

In the scenario shown in Figure 5.10, SQL commands execute in the following sequence:

- **T1:** Start transaction (txid 200)
- **T2:** Start transaction (txid 201)
- **T3:** Execute SELECT commands for txid 200 and 201
- **T4:** Execute UPDATE command for txid 200
- **T5:** Execute SELECT commands for txid 200 and 201
- **T6:** Commit txid 200
- **T7:** Execute SELECT command for txid 201

To simplify the description, this scenario assumes only two transactions: txid 200 and 201. The isolation level of txid 200 is READ COMMITTED. The isolation level of txid 201 is either READ COMMITTED or REPEATABLE READ.

The following describes how SELECT commands perform a visibility check for each tuple.

**SELECT commands of T3:**

At T3, only Tuple_1 exists in table ’tbl’. It is *visible* by **Rule 6**. Therefore, SELECT commands in both transactions return ‘Jekyll’.

- Rule6(Tuple_1) $\Rightarrow$ Status(t_xmin:199) = COMMITTED $\wedge$ t_xmax = INVALID $\Rightarrow$ Visible

```
testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

```
testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

**SELECT commands of T5:**

First, consider the SELECT command executed by txid 200. Tuple_1 is *invisible* by **Rule 7**, and Tuple_2 is *visible* by **Rule 2**. Consequently, this SELECT command returns ‘Hyde’.

- Rule7(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = IN_PROGRESS $\wedge$ t_xmax:200 = current_txid:200 $\Rightarrow$ Invisible
- Rule2(Tuple_2): Status(t_xmin:200) = IN_PROGRESS $\wedge$ t_xmin:200 = current_txid:200 $\wedge$ t_xmax = INVALID $\Rightarrow$ Visible

```
testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
```

In contrast, in the SELECT command executed by txid 201, Tuple_1 is *visible* by **Rule 8**, and Tuple_2 is *invisible* by **Rule 4**. Therefore, this SELECT command returns ‘Jekyll’.

- Rule8(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = IN_PROGRESS $\wedge$ t_xmax:200 $\ne$ current_txid:201 $\Rightarrow$ Visible
- Rule4(Tuple_2): Status(t_xmin:200) = IN_PROGRESS $\wedge$ t_xmin:200 $\ne$ current_txid:201 $\Rightarrow$ Invisible

```
testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

** Dirty Read

A **Dirty Read** (or **wr-conflict**) is the visibility of uncommitted updates to other transactions. Such reads do not occur at any isolation level in PostgreSQL.

**SELECT command of T7:**

The following describes the behavior of SELECT commands at T7 for both isolation levels.

When txid 201 uses the READ COMMITTED level, the transaction snapshot is ‘201:201:’. In this case, txid 200 is treated as COMMITTED. Therefore, Tuple_1 is *invisible* by **Rule 10**, and Tuple_2 is *visible* by **Rule 6**. The SELECT command returns ‘Hyde’.

- Rule10(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = COMMITTED $\wedge$ Snapshot(t_xmax:200) $\ne$ active $\Rightarrow$ Invisible
- Rule6(Tuple_2): Status(t_xmin:200) = COMMITTED $\wedge$ t_xmax = INVALID $\Rightarrow$ Visible

```
testdb=# -- txid 201 (READ COMMITTED)
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
```

Note that the results of SELECT commands differ depending on whether txid 200 has committed. This phenomenon is known as a **Non-Repeatable Read**.

In contrast, when txid 201 uses the REPEATABLE READ level, the transaction snapshot is ‘200:200:’. Consequently, txid 200 is treated as IN_PROGRESS. Therefore, Tuple_1 is *visible* by **Rule 9**, and Tuple_2 is *invisible* by **Rule 5**. The SELECT command returns ‘Jekyll’.

Non-Repeatable Reads do not occur in REPEATABLE READ (or SERIALIZABLE) isolation levels.

- Rule9(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = COMMITTED $\wedge$ Snapshot(t_xmax:200) = active $\Rightarrow$ Visible
- Rule5(Tuple_2): Status(t_xmin:200) = COMMITTED $\wedge$ Snapshot(t_xmin:200) = active $\Rightarrow$ Invisible

```
testdb=# -- txid 201 (REPEATABLE READ)
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

## 5.7.2. Hint Bits

PostgreSQL provides three internal functions to obtain transaction status: TransactionIdIsInProgress(), TransactionIdDidCommit(), and TransactionIdDidAbort(). These functions use caches to reduce frequent access to the clog. However, executing them for every tuple check would create bottlenecks.

To resolve this issue, PostgreSQL uses hint bits, as defined below:

```
#define HEAP_XMIN_COMMITTED       0x0100   /* t_xmin committed */
#define HEAP_XMIN_INVALID         0x0200   /* t_xmin invalid/aborted */
#define HEAP_XMAX_COMMITTED       0x0400   /* t_xmax committed */
#define HEAP_XMAX_INVALID         0x0800   /* t_xmax invalid/aborted */
```

PostgreSQL sets hint bits in the t_infomask of a tuple during read or write operations whenever possible.

For example, if PostgreSQL checks the status of t_xmin and obtains COMMITTED, it sets the HEAP_XMIN_COMMITTED hint bit in the t_infomask of that tuple.

Once hint bits are set, PostgreSQL no longer needs to call TransactionIdDidCommit() or TransactionIdDidAbort(). This mechanism allows the system to efficiently check the statuses of both t_xmin and t_xmax for each tuple.

## 5.7.3. Phantom Reads in PostgreSQL’s REPEATABLE READ Level

The ANSI SQL-92 standard defines REPEATABLE READ as an isolation level that allows Phantom Reads. However, PostgreSQL’s implementation prevents them. In principle, Snapshot Isolation (SI) does not allow Phantom Reads.

Assume two transactions, Tx_A and Tx_B, run concurrently. Their isolation levels are READ COMMITTED and REPEATABLE READ, and their txids are 100 and 101, respectively. First, Tx_A inserts a tuple and commits. The t_xmin of the inserted tuple is 100.

Next, Tx_B executes a SELECT command. The tuple inserted by Tx_A is *invisible* according to **Rule 5**. Therefore, Phantom Reads do not occur.

- Rule5(new tuple): Status(t_xmin:100) = COMMITTED $\wedge$ Snapshot(t_xmin:100) = active $\Rightarrow$ Invisible

```sql
testdb=# -- Tx_A: txid 100
testdb=# START TRANSACTION
testdb-#  ISOLATION LEVEL READ COMMITTED;
START TRANSACTION
testdb=# SELECT txid_current();
 txid_current
--------------
          100
(1 row)

testdb=# INSERT INTO tbl(id, data)
                VALUES (1,'phantom');
INSERT 1
testdb=# COMMIT;
COMMIT
```

```
testdb=# -- Tx_B: txid 101
testdb=# START TRANSACTION
testdb-#  ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION
testdb=# SELECT txid_current();
 txid_current
--------------
          101
(1 row)

testdb=# SELECT * FROM tbl WHERE id=1;
 id | data
----+------
(0 rows)
```

# 5.8. Preventing Lost Updates

A **Lost Update**, also known as a **ww-conflict**, is an anomaly that occurs when concurrent transactions update the same rows. PostgreSQL must prevent this anomaly in both REPEATABLE READ and SERIALIZABLE levels. (Note that the READ COMMITTED level does not need to prevent Lost Updates.) This section describes how PostgreSQL prevents Lost Updates and provides examples.

Section Contents

- 5.8.1. Behavior of Concurrent UPDATE Commands
- 5.8.2. Examples

## 5.8.1. Behavior of Concurrent UPDATE Commands

When an UPDATE command is executed, the ExecUpdate function is internally invoked. The pseudocode of ExecUpdate is shown below:

#### Pseudocode: ExecUpdate

```
(1)   FOR each row that will be updated by this UPDATE command
(2)        WHILE true

                /*
                 * The First Block
                 */
(3)             IF the target row is 'being updated' THEN
(4)	             WAIT for the termination of the transaction that updated the target row

(5)                  IF (the status of the terminated transaction is COMMITTED)
   	               AND (the isolation level of this transaction is REPEATABLE READ or SERIALIZABLE) THEN
(6)	                  ABORT this transaction  /* First-Updater-Win */
                     ELSE
(7)                       GOTO step (2)
                     END IF

                /*
                 * The Second Block
                 */
(8)             ELSE IF the target row has been updated by another concurrent transaction THEN
(9)                  IF (the isolation level of this transaction is READ COMMITTED THEN
(10)                      UPDATE the target row
                     ELSE
(11)                      ABORT this transaction  /* First-Updater-Win */
                     END IF

                /*
                 * The Third Block
                 */
                ELSE  /* The target row is not yet modified               */
                      /* or has been updated by a terminated transaction. */
(12)                  UPDATE the target row
                END IF
           END WHILE
      END FOR
```

** Pseudocode: ExecUpdate (1) Get each row for update by this UPDATE command. (2) Repeat the following process until the target row is updated (or this transaction is aborted). (3) If the target row is being updated, go to step (4); otherwise, go to step (8). (4) Wait for the termination of the transaction that updated the target row, because PostgreSQL uses the first-updater-win scheme in SI. (5) If the status of the transaction that updated the target row is COMMITTED and the isolation level of this transaction is REPEATABLE READ (or SERIALIZABLE), go to step (6); otherwise, go to step (7). (6) Abort this transaction to prevent Lost Updates. (7) Go to step (2) and attempt to update the target row in the next round. (8) If another concurrent transaction has updated the target row, go to step (9); otherwise, go to step (12). (9) If the isolation level of this transaction is READ COMMITTED, go to step (10); otherwise, go to step (11). (10) UPDATE the target row, and go to step (1). (11) Abort this transaction to prevent Lost Updates. (12) UPDATE the target row, and go to step (1), because the target row is not yet modified or has been updated by a terminated transaction (i.e., there is no ww-conflict). The function utilizes a while loop to update each row. The inside of the loop branches into three blocks based on the conditions shown in Figure 5.11.

![](/images/postgres-internals/pgsql05-fig-5-11.webp)

#### Figure 5.11. Three internal blocks in ExecUpdate.

- [1] The target row is being updated (Figure 5.11[1]): ‘Being updated’ means another concurrent transaction is updating the row. In this case, the current transaction waits for the termination of the other transaction because PostgreSQL’s SI uses the **first-updater-win** scheme. For example, if concurrent transactions Tx_A and Tx_B both target the same row, Tx_B waits for Tx_A to terminate if Tx_A has already updated it and remains in progress. After Tx_A commits, Tx_B proceeds. Tx_B updates the row if it is at the READ COMMITTED level; otherwise (REPEATABLE READ or SERIALIZABLE), it aborts immediately to prevent Lost Updates.
- [2] The target row has been updated by a concurrent transaction (Figure 5.11[2]): The current transaction attempts to update the target row; however, another concurrent transaction has already updated and committed it. In this case, if the current transaction is at the READ COMMITTED level, it updates the target row; otherwise, the current transaction aborts immediately to prevent Lost Updates.
- [3] There is no conflict (Figure 5.11[3]): When no conflict exists, the current transaction can update the target row.

## 5.8.2. Examples

Three examples are presented below. The first and second examples demonstrate behaviors when a target row is being updated. The third example demonstrates the behavior after a target row has been updated.

### 5.8.2.1. Example 1

Transactions Tx_A and Tx_B update the same row in the same table. Both use the READ COMMITTED isolation level.

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```sql
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Utterson';

(this transaction is being blocked)

UPDATE 1
```

Tx_B operates as follows:

1. Tx_B waits for Tx_A to terminate after executing the UPDATE command, because Tx_A is currently updating the target tuple (ExecUpdate Step (4)).
2. Tx_B attempts to update the target row after Tx_A commits (ExecUpdate Step (7)).
3. Tx_B updates the target row again during the second round of ExecUpdate (ExecUpdate Steps (2), (8), (9), and (10)).

### 5.8.2.2. Example 2

Tx_A and Tx_B update the same row. Tx_A uses READ COMMITTED, and Tx_B uses REPEATABLE READ.

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Utterson';

(this transaction is being blocked)

ERROR:couldn't serialize access due to concurrent update
```

Tx_B behaves as follows:

1. Tx_B waits for Tx_A to terminate after executing the UPDATE command (ExecUpdate Step (4)).
2. Tx_B aborts to resolve the conflict after Tx_A commits. This occurs because the target row has been updated and Tx_B uses the REPEATABLE READ isolation level (ExecUpdate Steps (5) and (6)).

### 5.8.2.3. Example 3

Tx_B (REPEATABLE READ) attempts to update a target row already updated by the committed Tx_A. Tx_B aborts in this case (ExecUpdate Steps (2), (8), (9), and (11)).

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```
testdb=#
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
testdb=# UPDATE tbl SET name = 'Utterson';
ERROR:couldn't serialize access due to concurrent update
```

# 5.9. Serializable Snapshot Isolation

PostgreSQL has embedded **Serializable Snapshot Isolation (SSI)** since version 9.1 (2011) to realize a true SERIALIZABLE isolation level.

Since the explanation of SSI is complex, this section provides only an outline. For details, see the original paper: “[Serializable Snapshot Isolation in PostgreSQL](https://arxiv.org/abs/1208.4179)”

In the following, several technical terms are used without definitions. Please refer to the references for these terms:

- precedence graph (also known as dependency graph and serialization graph)
- serialization anomalies (e.g. Write-Skew)

** References

1. Abraham Silberschatz, Henry F. Korth, and S. Sudarshan, “[Database System Concepts](https://www.amazon.com/dp/0073523321)”, McGraw-Hill Education, ISBN-13: 978-0073523323
2. Thomas M. Connolly, and Carolyn E. Begg, “[Database Systems](https://www.amazon.com/dp/0321523067)”, Pearson, ISBN-13: 978-0321523068

Section Contents

- 5.9.1. Basic Strategy for SSI Implementation
- 5.9.2. Implementing SSI in PostgreSQL
- 5.9.3. How SSI Performs
- 5.9.4. False-Positive Serialization Anomalies

## 5.9.1. Basic Strategy for SSI Implementation

A serialization anomaly occurs if a cycle is present in the precedence graph. The simplest anomaly, write-skew, demonstrates this.

Figure 5.12(1) shows a schedule. Here, Transaction_A reads Tuple_B and Transaction_B reads Tuple_A. Then, Transaction_A writes Tuple_A and Transaction_B writes Tuple_B. In this case, two rw-conflicts exist. These conflicts form a cycle in the precedence graph of this schedule, as shown in Figure 5.12(2). Thus, this schedule contains a serialization anomaly, Write-Skew.

![](/images/postgres-internals/pgsql05-fig-5-12.webp)

#### Figure 5.12. Write-Skew schedule and its precedence graph.

Conceptually, three types of conflicts exist: wr-conflicts (Dirty Reads), ww-conflicts (Lost Updates), and rw-conflicts. However, PostgreSQL ignores wr- and ww-conflicts because it prevents them as shown in the previous sections. Therefore, the SSI implementation in PostgreSQL only considers rw-conflicts.

PostgreSQL adopts the following strategy for SSI implementation:

1. Record all objects (tuples, pages, relations) accessed by transactions as SIREAD locks.
2. Detect rw-conflicts using SIREAD locks whenever any heap or index tuple is written.
3. Abort the transaction if a serialization anomaly is detected by checking the detected rw-conflicts.

## 5.9.2. Implementing SSI in PostgreSQL

To realize the strategy described above, PostgreSQL implements various functions and data structures. This section focuses on two primary data structures to describe the SSI mechanism: **SIREAD locks** and **rw-conflicts**. These structures are stored in shared memory.

** Note

For simplicity, this documentation omits some important data structures, such as SERIALIZABLEXACT. Consequently, the explanations of functions &mdash; specifically CheckForSerializableConflictOut(), CheckForSerializableConflictIn(), and PreCommit_CheckForSerializationFailure() &mdash; are also highly simplified.

For example, this section indicates which functions detect conflicts but does not explain the detection details. Refer to the source code for detailed information: [src/backend/storage/lmgr/predicate.c](https://github.com/postgres/postgres/blob/master/src/backend/storage/lmgr/predicate.c).

### 5.9.2.1. SIREAD locks

An SIREAD lock, internally called a predicate lock, is a pair consisting of an object and (virtual) txids. It stores information about which transactions have accessed which objects.

Note that this description omits virtual txids. The term txid is used rather than virtual txid to simplify the following explanation.

The CheckForSerializableConflictOut() function creates SIREAD locks whenever a DML command is executed in SERIALIZABLE mode. For example, if txid 100 reads Tuple_1 of a table, an SIREAD lock {Tuple_1, {100}} is created. If txid 101 also reads Tuple_1, the SIREAD lock is updated to {Tuple_1, {100, 101}}.

An SIREAD lock is also created when an index page is read. This occurs during [Index-Only Scans](https://www.postgresql.org/docs/current/static/indexes-index-only-scans.html) (described in Section 7.2), where the index is read without accessing the table page.

#### Lock Levels and Lock Aggregation:

SIREAD locks have three levels: **tuple**, **page**, and **relation**.

PostgreSQL aggregates SIREAD locks to reduce memory space. If SIREAD locks are created for all tuples within a single page, they are merged into a single page-level SIREAD lock, and the individual tuple-level locks are released (refer to Figure 5.13). The same logic applies when all pages in a relation are read.

![Transaction Tx reads tuple_1 and tuple_2 in Page_1, creating two tuple-level SIREAD locks. When Tx subsequently reads tuple_3, completing the scan of Page_1, PostgreSQL replaces the individual tuple-level locks with a single page-level SIREAD lock.](/images/postgres-internals/pgsql05-fig-5-13.webp)

#### Figure 5.13. Example of SIREAD Lock Aggregation.

Transaction Tx reads tuple_1 and tuple_2 in Page_1, creating two tuple-level SIREAD locks. When Tx subsequently reads tuple_3, completing the scan of Page_1, PostgreSQL replaces the individual tuple-level locks with a single page-level SIREAD lock.

When using a sequential scan, PostgreSQL creates a relation-level SIREAD lock from the beginning, regardless of indexes or WHERE clauses. In certain situations, this implementation can cause false-positive detections of serialization anomalies. Details are provided in Section 5.9.4.

### 5.9.2.2. rw-conflicts

A rw-conflict is a triplet consisting of an SIREAD lock and two txids: one that reads and one that writes the object associated with the SIREAD lock.

The CheckForSerializableConflictIn() function is invoked whenever an INSERT, UPDATE, or DELETE command is executed in SERIALIZABLE mode. This function creates rw-conflicts when it detects a conflict by checking existing SIREAD locks.

For example, txid 100 reads Tuple_1, and then txid 101 updates Tuple_1. In this case, CheckForSerializableConflictIn(), invoked by the UPDATE command in txid 101, detects a rw-conflict on Tuple_1 between txid 100 and 101. It then creates a rw-conflict {r=100, w=101, {Tuple_1}}.

### 5.9.2.3. Conflict Detection and First-Committer-Win

Both the CheckForSerializableConflictOut() and CheckForSerializableConflictIn() functions, as well as the PreCommit_CheckForSerializationFailure() function, which is invoked when the COMMIT command is executed in SERIALIZABLE mode, check serialization anomalies using the created rw-conflicts. If they detect anomalies, only the first-committed transaction is committed and the other transactions are aborted by the **first-committer-win** scheme.

## 5.9.3. How SSI Performs

This section describes how SSI resolves Write-Skew anomalies using the simple table tbl shown below:

```
testdb=# CREATE TABLE tbl (id INT primary key, flag bool DEFAULT false);
testdb=# INSERT INTO tbl (id) SELECT generate_series(1,2000);
testdb=# ANALYZE tbl;
```

Transactions Tx_A and Tx_B execute the commands shown in Figure 5.14.

![](/images/postgres-internals/pgsql05-fig-5-14.webp)

#### Figure 5.14. Write-Skew scenario.

Assume all commands use index scans. When executed, these commands read both heap tuples and index pages. Each index page contains the index tuple that points to the corresponding heap tuple (Figure 5.15).

![](/images/postgres-internals/pgsql05-fig-5-15.webp)

#### Figure 5.15. Relationship between the index and table in the scenario shown in Figure 5.14.

- **T1:** Tx_A executes a SELECT command. This command reads a heap tuple (Tuple_2000) and one page of the primary key (Pkey_2).
- **T2:** Tx_B executes a SELECT command. This command reads a heap tuple (Tuple_1) and one page of the primary key (Pkey_1).
- **T3:** Tx_A executes an UPDATE command to update Tuple_1.
- **T4:** Tx_B executes an UPDATE command to update Tuple_2000.
- **T5:** Tx_A commits.
- **T6:** Tx_B attempts to commit; however, it aborts due to a Write-Skew anomaly.

Figure 5.16 shows how PostgreSQL detects and resolves the Write-Skew anomaly in this scenario.

![](/images/postgres-internals/pgsql05-fig-5-16.webp)

#### Figure 5.16. SIREAD locks and rw-conflicts, and schedule of the scenario shown in Figure 5.14.

- **T1:** During the execution of Tx_A’s SELECT command, CheckForSerializableConflictOut() creates SIREAD locks. In this scenario, the function creates two SIREAD locks, L1 and L2, associated with Pkey_2 and Tuple_2000, respectively.
- **T2:** During the execution of Tx_B’s SELECT command, CheckForSerializableConflictOut() creates two SIREAD locks, L3 and L4, associated with Pkey_1 and Tuple_1, respectively.
- **T3:** When Tx_A executes its UPDATE command, the system invokes both CheckForSerializableConflictOut() and CheckForSerializableConflictIn() before and after ExecUpdate. In this scenario, CheckForSerializableConflictOut() does nothing. CheckForSerializableConflictIn() creates an rw-conflict, C1, which involves both Pkey_1 and Tuple_1 between Tx_B and Tx_A. This occurs because both Pkey_1 and Tuple_1 were read by Tx_B and subsequently written by Tx_A.
- **T4:** When Tx_B executes its UPDATE command, CheckForSerializableConflictIn() creates an rw-conflict, C2, which involves both Pkey_2 and Tuple_2000 between Tx_A and Tx_B. In this scenario, C1 and C2 form a cycle in the precedence graph, placing Tx_A and Tx_B in a non-serializable state. However, because neither transaction has committed yet, CheckForSerializableConflictIn() does not abort Tx_B. This behavior occurs because PostgreSQL’s SSI implementation is based on the **first-committer-win** scheme.
- **T5:** When Tx_A attempts to commit, PreCommit_CheckForSerializationFailure() is invoked. This function detects serialization anomalies and executes a commit action if possible. In this scenario, Tx_A commits because Tx_B is still in progress.
- **T6:** When Tx_B attempts to commit, PreCommit_CheckForSerializationFailure() detects a serialization anomaly. Since Tx_A has already committed, Tx_B aborts.

### 5.9.3.1. Other Scenarios

If Tx_B executes the UPDATE command after Tx_A has committed (after **T5**), Tx_B aborts immediately. This occurs because CheckForSerializableConflictIn(), invoked by Tx_B’s UPDATE command, detects a serialization anomaly (Figure 5.17(1)).

If Tx_B executes a SELECT command instead of COMMIT at **T6**, Tx_B aborts immediately. This occurs because CheckForSerializableConflictOut(), invoked by Tx_B’s SELECT command, detects a serialization anomaly (Figure 5.17(2)).

![](/images/postgres-internals/pgsql05-fig-5-17.webp)

#### Figure 5.17. Other Write-Skew scenarios.

** Info

[This Wiki](https://wiki.postgresql.org/wiki/SSI) details several more complex anomalies.

## 5.9.4. False-Positive Serialization Anomalies

In SERIALIZABLE mode, PostgreSQL always fully guarantees the serializability of concurrent transactions because false-negative serialization anomalies never occur.

However, PostgreSQL may detect false-positive anomalies under some circumstances. Users should consider this behavior when using SERIALIZABLE mode.

The following describes situations where PostgreSQL detects false-positive anomalies.

### 5.9.4.1. False-Positive Scenario 1.

Figure 5.18 shows a scenario where a false-positive serialization anomaly occurs.

![](/images/postgres-internals/pgsql05-fig-5-18.webp)

#### Figure 5.18. Scenario where false-positive serialization anomaly occurs.

As mentioned in the explanation of SIREAD locks, PostgreSQL creates a relation-level SIREAD lock when using a sequential scan.

Figure 5.19(1) shows the SIREAD locks and rw-conflicts during a sequential scan.

In this case, rw-conflicts C1 and C2 are associated with the relation-level SIREAD lock of ’tbl’. These conflicts create a cycle in the precedence graph.

Consequently, PostgreSQL detects a false-positive Write-Skew anomaly and aborts either Tx_A or Tx_B even though no actual conflict exists.

![](/images/postgres-internals/pgsql05-fig-5-19.webp)

#### Figure 5.19. False-positive anomaly (1) - Using sequential scan.

### 5.9.4.2. False-Positive Scenario 2.

PostgreSQL also detects a false-positive anomaly during an index scan if both transactions Tx_A and Tx_B acquire the same index-page SIREAD lock. Figure 5.20 illustrates this situation.

![](/images/postgres-internals/pgsql05-fig-5-20.webp)

#### Figure 5.20. False-positive anomaly (2) - Index scan using the same index page.

Assume that index page Pkey_1 contains two index items: one pointing to Tuple_1 and the other pointing to Tuple_2.

When Tx_A and Tx_B execute their respective SELECT and UPDATE commands, both transactions read and write Pkey_1.

In this case, rw-conflicts C1 and C2, both associated with Pkey_1, create a cycle in the precedence graph. Thus, PostgreSQL detects a false-positive Write-Skew anomaly.

(If Tx_A and Tx_B acquire SIREAD locks for different index pages, no false-positive is detected and both transactions can commit.)

# 5.10. Required Maintenance Processes

PostgreSQL’s concurrency control mechanism requires the following maintenance processes:

1. Remove dead tuples and index tuples that point to corresponding dead tuples.
2. Remove unnecessary parts of the clog.
3. Freeze old txids.
4. Update FSM, VM, and statistics.

Section 5.3.2 and Section 5.4.3 explained the need for the first and second processes. The third process addresses the transaction ID wraparound problem, which the following subsection describes.

In PostgreSQL, the VACUUM process handles these tasks. [Chapter 6](/book/postgres-internals/pgsql06/index) describes VACUUM in detail.

Section Contents

- 5.10.1 Transaction Wraparound Problem
- 5.10.2 Freeze Processing

## 5.10.1. Transaction Wraparound Problem

Assume a transaction with txid 100 inserts Tuple_1; therefore, the t_xmin of Tuple_1 is 100.

The server runs for a very long period without any modifications to Tuple_1. When the current txid reaches 2.1 billion + 100, a SELECT command is executed. At this time, Tuple_1 is *visible* because txid 100 is considered to be in the past.

If the same SELECT command is executed when the current txid reaches 2.1 billion + 101, Tuple_1 becomes *invisible*. This happens because txid 100 is now considered to be in the future relative to the current txid (Figure 5.21).

This is the **transaction wraparound problem** in PostgreSQL.

![](/images/postgres-internals/pgsql05-fig-5-21.webp)

#### Figure 5.21. Wraparound problem.

## 5.10.2. Freeze Processing

To solve this problem, PostgreSQL uses a concept called the *frozen txid* and implements a process called **FREEZE**.

PostgreSQL defines the frozen txid as a special reserved txid (value 2). This ID is always older than all other txids; therefore, the frozen txid is always inactive and *visible* to all transactions.

The vacuum process invokes the freeze process. The freeze process scans table files and rewrites the t_xmin of tuples to the frozen txid (2) if the t_xmin value is older than the current txid minus [vacuum_freeze_min_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE) (default is 50 million). [Chapter 6](/book/postgres-internals/pgsql06/index) provides more details.

For example, in Figure 5.22 a), the current txid is 50,002,500 when the VACUUM command invokes the freeze process. In this case, the process rewrites the t_xmin of both Tuple_1 and Tuple_2 to 2.

In versions 9.4 (2014) or later, PostgreSQL sets the XMIN_FROZEN bit in the t_infomask field of the tuple instead of rewriting the t_xmin value (Figure 5.22 b).

![](/images/postgres-internals/pgsql05-fig-5-22.webp)

#### Figure 5.22. Freeze process.
