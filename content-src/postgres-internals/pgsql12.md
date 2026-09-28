---
title: "Logical Replication"
lang: en
---

# 12.1. Overview and Key Concepts

#### Beta Version: Work in progress.

This section introduces key concepts necessary to understand the subsequent sections.

Section Contents

- 12.1.1. Related Processes
- 12.1.2. Outline of Logical Replication
- 12.1.3. Replica Identity
- 12.1.4. Replication Origin
- 12.1.5. Replication Slot
- 12.1.6. Conflicts

## 12.1.1. Related Processes

In logical replication, four types of processes work cooperatively:

- A **walsender** on the publisher sends WAL data to the subscriber and performs various coordination tasks.
- A **logical replication launcher** on the subscriber launches apply workers.
- An **apply worker** on the subscriber connects to the publisher’s walsender, receives logical change streams, parses messages, and updates target tables.
- A **table sync worker** on the subscriber performs initial data synchronization for a specific table. It catches up to the main replication stream before handing over updates to the apply worker. Refer to Section 12.2.2 for details.

## 12.1.2. Outline of Logical Replication

PostgreSQL’s logical replication is **row-based**. It captures changes to individual rows and streams them in a decoded format. Because logical messages contain the **already-evaluated results** of operations, logical replication avoids inconsistencies caused by non-deterministic functions like random() or now().

The following example compares logical replication with streaming replication, as illustrated in Figure 12.2.

![](/images/postgres-internals/pgsql12-fig-12-02.webp)

#### Figure 12.2. Conceptual comparison of data sending: Streaming vs. Logical Replication.

Consider a scenario where two concurrent transactions (txid=99 and 100) execute SQL statements affecting *tbl_a* and *tbl_b*.

In **streaming replication**, the publisher writes WAL data ($w_{1}$ to $w_{5}$) to the WAL file sequentially as each SQL statement executes. The walsender reads these records and sends them immediately to the standby’s walreceiver, regardless of the transaction’s commit status. The walreceiver writes the received data into its own WAL file in the exact order received, maintaining a physical mirror of the primary server.

In contrast, **logical replication** processes data based on transaction boundaries and publication scopes. While the walsender reads WAL data as it is generated, it does not send the data immediately. Instead, it accumulates changes in a memory area called the **ReorderBuffer**, where changes are reassembled per transaction.

The ReorderBuffer within the walsender involves three main processes:

- **Filtering:** The walsender filters decoded changes based on the publication scope. Even after txid=100 commits, the walsender only prepares changes related to subscribed tables for sending. For instance, if the subscriber only tracks *tbl_a*, the walsender discards change $c_{3}$ (decoded from $w_{3}$ for *tbl_b*). Refer to Section 12.4.1 for details.
- **Decoding & Buffering:** As the walsender reads the WAL, it decodes each record $w_{n}$ into a logical change $c_{n}$ and stores it in the ReorderBuffer. Refer to Section 12.4.3 for details.
- **Sending:** Upon encountering the commit record $w_{5}$ for txid=100, the walsender gathers the relevant buffered changes ($c_{1}$ and $c_{4}$) and sends them to the subscriber as a series of messages, finalized by the commit message $c_{5}$. Changes from uncommitted transactions, such as $c_{2}$ from txid=99, remain buffered and are not sent yet. Refer to Section 12.6 for details.

The structure of the ReorderBuffer is described in Section 12.3.

PostgreSQL provides the **pgoutput** plugin by default for standard logical replication, though the output process is extensible via plugins. Refer to Section 12.5 for details.

The subscriber’s apply worker achieves replication by reconstructing and executing transactions based on the received messages. Further details are in Section 12.7.

### 12.1.2.1. Asynchronous vs. Synchronous

PostgreSQL supports both **asynchronous** and **synchronous** modes for logical replication. Asynchronous is the default. See Figure 12.3.

![](/images/postgres-internals/pgsql12-fig-12-03.webp)

#### Figure 12.3. Comparison of transaction flow in asynchronous and synchronous logical replication modes.

In **asynchronous mode**, a COMMIT statement on the publisher completes immediately after the local WAL is flushed, without waiting for a subscriber response.

In **synchronous mode** (specifically when synchronous_commit is set to ‘remote_apply’), the publisher’s commit process waits until it receives an acknowledgment (ACK) from the subscriber. As illustrated in Figure 12.3, the apply worker sends this ACK only after it finishes applying the changes to the subscriber’s database.

The additional time required for a synchronous commit to finalize, compared to asynchronous mode, is the **End-to-End Latency**.

Transactions involving large volumes of changes require more time for decoding, transmission, and application. Consequently:

- In **asynchronous mode**, larger transaction volumes increase replication lag, extending the window of data inconsistency.
- In **synchronous mode**, larger volumes increase commit latency on the publisher, as the backend process must wait for the entire replication pipeline to finalize.

### 12.1.2.2. Management and Optimization of Large Transactions

This section examines the behavior of “Large Transactions” &mdash; those with significant change volumes &mdash; and the evolution of optimization techniques.

#### [1] Standard Transaction Processing (streaming = off)

When change volume exceeds the ReorderBuffer capacity (defined by [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM)), the walsender persists data to **spill files** on disk. This is illustrated in Figure 12.4 [1].

![](/images/postgres-internals/pgsql12-fig-12-04.webp)

#### Figure 12.4: Behavior of large transactions when streaming is disabled.

The processing flow is:

- (1) INSERT operations execute on tbl_a, and decoded changes accumulate in the ReorderBuffer.
- (2) Upon exceeding the memory limit, the ReorderBuffer scans currently held records.
- (3) The walsender generates **spill files** and moves memory-overflow data to disk to free buffer space.
- (4) The transaction **COMMITS** on the publisher.
- (5) After detecting the commit, the walsender sends the aggregated changes (from spill files and memory) to the subscriber.
- (6) The apply worker applies the received messages sequentially.

Mechanics regarding spill files are in Section 12.4.4.

Under this configuration, the walsender sends changes for only one transaction at a time per connection. Consequently, the subscriber serializes the application of changes, which often results in significant replication lag (Figure 12.4 [2]).

#### [2] In-Progress Streaming of Large Transactions (Version 14 and Later)

Version 14 (2021) introduced the pre-emptive sending of change data before a transaction commits. This mitigates transfer overhead and reduces replication lag. This is illustrated in Figure 12.5 [1].

![](/images/postgres-internals/pgsql12-fig-12-05.webp)

#### Figure 12.5: Mechanism of in-progress streaming for large transactions.

The operational flow is:

- (1) INSERT operations execute, and data accumulates in the ReorderBuffer.
- (2) Upon exceeding the memory threshold (defined by [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM)), the walsender **initiates sending immediately**, without waiting for the commit.
- (3) The apply worker buffers incoming data in memory using a `StringInfoData` structure named *original_msg*.
- (4) If the subscriber-side memory limit is reached, the worker persists data to **Temp files**.
- (5) The transaction **COMMITS** on the publisher.
- (6) The apply worker retrieves the data from Temp files (or memory) and applies the changes.

Unlike the walsender which manages changes within a structured ReorderBuffer, the apply worker buffers incoming changes as a raw binary stream within a generic StringInfoData structure (original_msg).

Enable streaming by specifying “streaming = on” in the [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) command. The apply worker’s message buffer capacity is also governed by logical_decoding_work_mem. Temp file management details are in Section 12.7.2.1.

This method eliminates the transfer latency that typically occurs after a commit. Even with concurrent large transactions, pre-emptive transfer ensures the application process begins promptly after the commit (Figure 12.5 [2]).

#### [3] Parallel Application of Streamed Changes (Version 16 and Later)

Version 16 introduced the capability to **parallelize the application process during streaming** before the transaction commit. This overlaps both data transfer and application. This is illustrated in Figure 12.6 [1].

![](/images/postgres-internals/pgsql12-fig-12-06.webp)

#### Figure 12.6: Mechanism and efficiency of parallel apply workers during streaming.

The flow for parallel streaming is:

- (1) INSERT operations lead to data accumulation in the ReorderBuffer.
- (2) Upon exceeding the memory threshold, the walsender begins sending change data.
- (3) The **leader apply worker** receives the stream and dispatches data to a **parallel apply worker**.
- (4) The parallel apply worker **immediately begins applying changes** to target tables.
- (5) The **COMMIT** executes on the publisher.
- (6) The leader apply worker receives the commit message and sends it to the parallel apply worker.
- (7) The parallel apply worker completes the local transaction and finalizes the application.

Enable parallel application by specifying *streaming* = *‘parallel’* in the [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html).

This architecture allows nearly total overlap between publisher processing and subscriber application. This drastically reduces replication lag during large updates (Figure 12.6 [2]).

However, parallel execution is not guaranteed in every scenario. If active workers reach the [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION) limit, the subscriber reverts to serial application upon commit &ndash; matching the behavior of “streaming = on”. Further constraints are discussed in Section 12.7.3.

## 12.1.3. Replica Identity

PostgreSQL logical replication is row-based and operates on logical data rows rather than physical storage layouts (such as blocks or offsets). Consequently, when the subscriber executes UPDATE or DELETE operations, the system requires a “search key” to identify exactly which row to modify. This configuration is known as the **Replica Identity**.

If a proper Replica Identity is not defined, the subscriber cannot uniquely identify target rows. This leads to replication errors or unintended data modifications. To prevent such issues, the publisher rejects UPDATE or DELETE attempts on a table lacking a Replica Identity by returning an error:

```
testdb=# UPDATE tbl SET data = 'updated_value' WHERE id = 1;
ERROR:  cannot update table &#34;tbl&#34; because it does not have a replica identity and publishes updates
HINT:  To enable updating the table, set REPLICA IDENTITY using ALTER TABLE.
```

### 12.1.3.1. Types of Replica Identity

PostgreSQL provides four Replica Identity modes, which are configurable on a per-table basis:

| Mode | Description | Usage and Characteristics |
| --- | --- | --- |
| **DEFAULT** | Uses the **Primary Key** columns as the identifier. | This mode is applied automatically when a Primary Key is defined. |
| **USING INDEX** | Uses a specific **unique, non-null index** as the identifier. | This is useful for tables without a Primary Key where a specific unique index serves as the key. |
| **FULL** | Records the **old values of all columns** in the row. | This is required for tables with no unique constraints. This mode increases message size; see Section 12.4.3 for details. |
| **NOTHING** | Records no identity information. | This is the default for tables without a PK. INSERT operations proceed, but UPDATE and DELETE cannot be replicated. |

### 12.1.3.2. Configuration and Verification

The [ALTER TABLE &hellip; REPLICA IDENTITY](https://www.postgresql.org/docs/current/sql-altertable.html#SQL-ALTERTABLE-REPLICA-IDENTITY) command configures the Replica Identity. When a Primary Key is created, the system automatically sets the mode to **DEFAULT**.

**Example: Specifying a unique index**

```
testdb=# CREATE TABLE tbl_ri (id int NOT NULL, name text, data int NOT NULL);
testdb=# CREATE UNIQUE INDEX tbl_ri_idx ON tbl_ri (id, data);
testdb=# ALTER TABLE tbl_ri REPLICA IDENTITY USING INDEX tbl_ri_idx;
```

**Example: Configuration to FULL**

```
testdb=# CREATE TABLE tbl_ri_full (id int, name text, data int);
testdb=# ALTER TABLE tbl_ri_full REPLICA IDENTITY FULL;
```

Each table’s Replica Identity configuration is stored in the **relreplident** column of the **pg_class** system catalog. The following SQL query verifies this configuration:

```
testdb=# -- Values: 'd' (default), 'n' (nothing), 'f' (full), 'i' (index)
testdb=# SELECT relname, relreplident FROM pg_class WHERE relname = 'tbl_ri';
 relname | relreplident
---------+--------------
 tbl_ri  | i
(1 row)

testdb=# SELECT relname, relreplident FROM pg_class WHERE relname = 'tbl_ri_full';
   relname   | relreplident
-------------+--------------
 tbl_ri_full | f
(1 row)
```

** Info

While *pg_class.relreplident* indicates the type of Replica Identity, it does not store the specific index OID. Instead, when “REPLICA IDENTITY USING INDEX” is configured, the designated index is recorded in the **pg_index** system catalog. Specifically, the **indisreplident** column (a boolean type) is set to *true* for the chosen index.

The following SQL query identifies which specific index serves as the Replica Identity for a given table:

```
testdb=# SELECT rel.relname AS table_name, idx_rel.relname AS index_name
	 FROM pg_class rel
	 JOIN pg_index idx ON rel.oid = idx.indrelid
	 JOIN pg_class idx_rel
	 ON idx.indexrelid = idx_rel.oid
	 WHERE rel.relname = 'tbl_ri' AND idx.indisreplident = true;
 table_name | index_name
------------+------------
 tbl_ri     | tbl_ri_idx
(1 row)
```

## 12.1.4. Replication Origin

**Replication Origin** identifies the source of a data change. It serves two primary purposes:

1. **Tracking Replication Progress (Recovery Control)**: When applying data from an external node, the subscriber records the publisher’s COMMIT LSN (Log Sequence Number) within its own WAL. By maintaining this mapping, the system ensures logical replication accurately resumes from the correct point after an interruption.
2. **Prevention of Infinite Replication Loops (Circular Replication)**: In bidirectional replication, a change sent from Node A to Node B might inadvertently be sent back to Node A. By “stamping” each change with an origin, the system distinguishes local changes from replicated changes, preventing redundant re-transmissions.

While Replication Origin is deeply integrated into the logical replication framework, its most fundamental element is the **origin_id**. This local identifier allows a subscriber to internally distinguish between different publishers (origins).

The mechanisms for tracking progress are embedded within the architecture and detailed in Section 12.8. This section focuses on loop prevention, a feature introduced in version 16.

** Origin IDs: Local Identifiers, Not Global Keys

It is essential to recognize that an origin_id is not a cluster-wide or globally unique identifier. Instead, a subscriber assigns this value internally to distinguish among the multiple publishers it connects to.

Consequently, the specific numeric value of an origin_id carries no significance to other nodes in the replication topology. This value serves only as a simple binary distinction: whether it is zero or non-zero.

- An **origin_id of 0** signifies changes from transactions originally executed on that node.
- An **origin_id of 1 or greater** signifies the node was replaying changes received from an upstream source.

### 12.1.4.1. Preventing Infinite Replication Loops via Replication Origin

PostgreSQL logical replication allows subscriber-side tables to remain writable. Leveraging this allows two nodes to function simultaneously as both publishers and subscribers, achieving **active-active replication** (multi-primary configuration), as shown in Figure 12.7 [1].

![](/images/postgres-internals/pgsql12-fig-12-07.webp)

#### Figure 12.7. Active-Active replication and the infinite replication loop.

Prior to version 16, logical replication unconditionally forwarded all decoded changes. In a bidirectional configuration, a change originating on Node 1 propagated to Node 2; Node 2 then treated this as a “new local change” and sent it back to Node 1. This unstoppable chain is an **infinite replication loop** (or **circular replication**).

Version 16 addressed this issue with the following mechanism. Although the architecture is versatile, the current implementation follows these behaviors:

- **origin = ‘any’ (Default)**: The walsender sends changes regardless of whether the WAL was generated locally or by applying messages from a publisher.
- **origin = ’none’**: The walsender excludes WAL records generated by applying messages from an external node.

The “origin” setting is a configuration option in the [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) command.

#### Internal Mechanism and Filtering Sequence

The subscriber and publisher coordinate to identify and filter origins:

1. **Origin Stamping**: When the subscriber’s apply worker commits a transaction, it attaches an *origin_id* to the COMMIT (or ABORT) WAL record[1](#fn:1). Current implementations assign a non-zero integer to changes from external nodes.
2. **Evaluation by walsender**: While decoding a transaction in the ReorderBuffer, the publisher’s walsender examines the origin information within the COMMIT WAL record.
3. **Execution of Filtering**: If origin = “none” is configured and an origin_id is present, the walsender skips the transmission of that entire transaction and discards the data.

Figure 12.8 illustrates this behavior using a cascaded setup (Node 1 $\rightarrow$ Node 2 $\rightarrow$ Node 3).

![](/images/postgres-internals/pgsql12-fig-12-08.webp)

#### Figure 12.8. Data propagation behavior based on the origin setting.

**[1] Case: origin = ‘any’ (Propagation across all nodes)**

- **Node 1**: Executes an INSERT. Since no origin exists in the COMMIT, the walsender sends the data to Node 2.
- **Node 2**: The apply worker applies the data and records “origin_id = 1”. Because origin = “any”, the walsender sends this stamped data to Node 3.
- **Node 3**: The apply worker receives data from Node 2. Despite the origin_id, the worker applies the change because `origin = “any”.

**[2] Case: origin = ’none’ (Termination at the intermediate node)**

- **Node 1**: Executes an INSERT. The data is sent to Node 2 as no origin is present.
- **Node 2**: The apply worker applies the change and records “origin_id = 1”. When the walsender identifies the origin_id via the ReorderBuffer, it skips sending the message to Node 3.
- **Node 3**: No data is received because the walsender on Node 2 filters out the transaction.

Configuring origin = “none” in the subscription settings on all participating nodes prevents infinite replication loops, which enables active-active topologies.

## 12.1.5. Replication Slot

Logical replication slots include five additional attributes compared to physical streaming replication. The following three are essential for the discussions in later sections:

- **plugin**: The name of the output plugin used for logical decoding (e.g., pgoutput).
- **database**: The name of the database to which the replication slot is attached. While physical replication slots are instance-wide, logical replication slots are scoped strictly to a single database.
- **confirmed_flush_lsn**: The Log Sequence Number (LSN) up to which the subscriber’s apply worker has confirmed data receipt. The publisher no longer retains committed transactions prior to this LSN, making them eligible for removal. See Section 12.8 for details.

Note that although logical slots also include attributes such as *catalog_xmin* and *two_phase*, this documentation omits their descriptions. Refer to the [official documentation](https://www.postgresql.org/docs/current/view-pg-replication-slots.html) for details.

## 12.1.6. Conflicts

Logical replication does not replicate DDL operations and is not affected by VACUUM processes on the publisher, unlike physical streaming replication. Consequently, the conflict types associated with streaming replication do not occur.

However, conflicts arise primarily due to concurrent data modifications at the application level on the subscriber. For example, if a row is deleted directly on the subscriber and the publisher subsequently attempts to update that same row, an **“update_missing”** conflict occurs.

A comprehensive list of conflicts detected by PostgreSQL is available in the official documentation: [Logical Replication: Conflicts](https://www.postgresql.org/docs/current/logical-replication-conflicts.html).

1. In the COMMIT (or ABORT) WAL record, the origin_id is included in the header, while the “origin_commit_lsn” and “origin_commit_timestamp” are added to the extended section.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 12.2. Starting Logical Replication

#### Beta Version: Work in progress.

Before setting up logical replication, the following conditions are assumed:

- The Publisher has the tables that will be replicated to the Subscriber.
- The Subscriber has already created tables with the same structure as those on the Publisher, but without any data.

This section uses the following tables:

```sql
CREATE TABLE tbl_1 (id int PRIMARY KEY, name text, data int);
CREATE TABLE tbl_2 (id int NOT NULL UNIQUE, name text, data int);
CREATE INDEX tbl_2_idx on tbl_2 (id, name);
CREATE TABLE tbl_3 (id int, name text, data int);
ALTER TABLE tbl_3 REPLICA IDENTITY FULL;
```

To set up logical replication, two commands are issued:

- [CREATE PUBLICATION](https://www.postgresql.org/docs/current/sql-createpublication.html) on the Publisher.
- [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) on the Subscriber.

Section Contents

- 12.2.1. Creating Publication
- 12.2.2. Creating Subscription

## 12.2.1. Creating Publication

The [CREATE PUBLICATION](https://www.postgresql.org/docs/current/sql-createpublication.html) command creates the publication data in the following system catalogs and updates [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html) if necessary:

- [pg_publication](https://www.postgresql.org/docs/current/catalog-pg-publication.html)
- [pg_publication_rel](https://www.postgresql.org/docs/current/catalog-pg-publication-rel.html)
- [pg_publication_namespace](https://www.postgresql.org/docs/current/catalog-pg-publication-namespace.html)

```sql
testdb=# -- Publisher
testdb=# CREATE PUBLICATION mypub FOR TABLE tbl_1, tbl_2, tbl_3;
CREATE PUBLICATION
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_publication;
-[ RECORD 1 ]+------
oid          | 16460
pubname      | mypub
pubowner     | 10
puballtables | f
pubinsert    | t
pubupdate    | t
pubdelete    | t
pubtruncate  | t
pubviaroot   | f
pubgencols   | n

testdb=# \x
Expanded display is off.
testdb=# SELECT * FROM pg_publication_rel;
  oid  | prpubid | prrelid | prqual | prattrs
-------+---------+---------+--------+---------
 16461 |   16460 |   16438 |        |
 16462 |   16460 |   16446 |        |
 16463 |   16460 |   16455 |        |
(3 rows)
```

The system view [pg_publication_tables](https://www.postgresql.org/docs/current/view-pg-publication-tables.html) shows the mapping between publications and the tables they belong to.

```
testdb=# -- Publisher
testdb=# SELECT * FROM pg_publication_tables;
 pubname | schemaname | tablename |    attnames    | rowfilter
---------+------------+-----------+----------------+-----------
 mypub   | public     | tbl_1     | {id,name,data} |
 mypub   | public     | tbl_2     | {id,name,data} |
 mypub   | public     | tbl_3     | {id,name,data} |
(3 rows)
```

## 12.2.2. Creating Subscription

The [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) command on the Subscriber creates a subscription.

```
testdb=# -- subscriber
testdb=# CREATE SUBSCRIPTION mysub
            CONNECTION 'host=192.168.3.10 port=5432 dbname=testdb'
            PUBLICATION mypub
            WITH (enabled = true, binary = false);
```

This process consists of three phases (see Figure 12.9):

- **Phase 1:** Create the subscription and (by default) request a replication slot on the Publisher.
- **Phase 2:** Connect an apply worker to a walsender on the Publisher.
- **Phase 3:** Synchronize the tables with those on the Publisher.

![](/images/postgres-internals/pgsql12-fig-12-09.webp)

#### Figure 12.9. Logical Replication Initializing Sequence.

The following subsections explore these phases.

### 12.2.2.1. Phase 1

This phase involves two primary tasks:

- Creating the subscription data in the system catalogs [pg_subscription](https://www.postgresql.org/docs/current/catalog-pg-subscription.html) and [pg_subscription_rel](https://www.postgresql.org/docs/current/catalog-pg-subscription-rel.html).
- (By default) requesting a replication slot on the publisher to manage logical replication.

To perform these tasks, the subscriber executes the following sequence:

- (1) The postgres process issuing ‘CREATE SUBSCRIPTION’ establishes a connection with a walsender.
- (2) The postgres process interacts with the walsender to: Check the existence of the specified publication.
- Retrieve target table schemas and OIDs to ensure structural compatibility.
- (By default) request a replication slot. If the command specifies an existing slot, the process omits this request.

(3) The postgres process inserts the subscription data into ‘pg_subscription’ and ‘pg_subscription_rel’. (4) The Publisher terminates the walsender process.

```
testdb=# -- Subscriber
testdb=# SELECT * FROM pg_subscription;
-[ RECORD 1 ]-------+---------------------------------------
oid                 | 16436
subdbid             | 16388
subskiplsn          | 0/0
subname             | mysub
subowner            | 10
subenabled          | t
subbinary           | f
substream           | p
subtwophasestate    | d
subdisableonerr     | f
subpasswordrequired | t
subrunasowner       | f
subfailover         | f
subconninfo         | host=192.168.3.10 port=5432 dbname=testdb
subslotname         | mysub
subsynccommit       | off
subpublications     | {mypub}
suborigin           | any

testdb=# \x
Expanded display is off.
testdb=# SELECT s.srsubid, s.srrelid, c.relname, s.srsublsn
testdb-#       FROM pg_subscription_rel AS s, pg_class AS c WHERE c.oid = s.srrelid;
 srsubid | srrelid | relname | srsublsn
---------+---------+---------+-----------
   16436 |   16414 | tbl_1   | 0/1BF35E0
   16436 |   16422 | tbl_2   | 0/1BF35E0
   16436 |   16431 | tbl_3   | 0/1BF5320
(3 rows)
```

The replication slot on the publisher is created as follows:

```
testdb=# -- Publisher
testdb=# SELECT * FROM pg_replication_slots;
-[ RECORD 1 ]-------+----------
slot_name           | mysub
plugin              | pgoutput
slot_type           | logical
datoid              | 16384
database            | testdb
temporary           | f
active              | t
active_pid          | 2051
xmin                |
catalog_xmin        | 823
restart_lsn         | 0/1BF5320
confirmed_flush_lsn | 0/1BF5358
wal_status          | reserved
safe_wal_size       |
two_phase           | f
two_phase_at        |
inactive_since      |
conflicting         | f
invalidation_reason |
failover            | f
synced              | f
```

### 12.2.2.2. Phase 2

This phase initiates the background processes required for logical replication.

- (5) The Logical Replication Launcher starts an apply worker.
- (6) The apply worker connects to a walsender on the publisher and initializes its replication origin (creating an entry in [pg_replication_origin](https://www.postgresql.org/docs/current/catalog-pg-replication-origin.html) if it does not exist).

These two processes &mdash; the walsender on the publisher and the apply worker on the subscriber &mdash; continue running to stream and apply changes.

### 12.2.2.3. Phase 3

This phase synchronizes the tables with the corresponding tables on the publisher.

To perform this task, the Logical Replication Launcher starts apply workers to retrieve the rows of the target tables.

The launcher starts as many workers as possible to maximize efficiency. The workers used for synchronization are called **table sync workers**.

- (7) The Launcher starts the table sync workers.
- (8) The table sync workers connect to walsenders.
- (9) The walsenders send table data to the table sync workers, which then insert the data into the target tables.
- (10) After synchronization, the table sync workers and walsenders terminate.

Walsenders and table sync workers use the `COPY ... TO STDOUT` and `COPY ... FROM STDIN` protocols to stream and insert table data efficiently. Refer to [tablesync.c](https://github.com/postgres/postgres/blob/master/src/backend/replication/logical/tablesync.c) for more details.

** pg_createsubscriber

Version 17 supports the [pg_createsubscriber](https://www.postgresql.org/docs/current/app-pgcreatesubscriber.html) utility.

# 12.3. ReorderBuffer Structure

#### Beta Version: Work in progress.

Each walsender process allocates a **ReorderBuffer** area. The [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM) configuration parameter limits the size of this area (the default is 64MB).

The ReorderBuffer consists of the following three components (see Figure 12.11):

- [ReorderBuffer](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L574)
- [ReorderBufferTXN](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L293)
- [ReorderBufferChange](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L76)

![](/images/postgres-internals/pgsql12-fig-12-11.webp)

#### Figure 12.11. ReorderBuffer Structure.

The central element of the `ReorderBuffer` structure is the *by_txn* hash table, which uses the transaction ID (txid) as its key. Each entry in this hash table is a `ReorderBufferTXN` structure. This structure stores metadata and the actual WAL data associated with each transaction.

Individual data modifications (such as INSERT, UPDATE, and DELETE) are represented by `ReorderBufferChange` structures. The system appends these in **LSN order** to the **changes** doubly linked list within the corresponding ReorderBufferTXN.

## 12.3.1. ReorderBuffer

This structure maintains the primary context for logical decoding.

| Item | Type | Description |
| --- | --- | --- |
| **by_txn** | HTAB_* | A hash table mapping txids to ReorderBufferTXN entries. It functions as an index for rapidly retrieving active transactions. |

## 12.3.2. ReorderBufferTXN

This structure manages the state of an individual transaction and its associated changes.

| Item | Type | Description |
| --- | --- | --- |
| **first_lsn** | XLogRecPtr | The LSN of the first change record belonging to this transaction. It is used to identify the starting point of the transaction. |
| **final_lsn** | XLogRecPtr | The LSN of the commit (or abort) record for this transaction. |
| **origin_id** | RepOriginId | The ID of the replication origin where this transaction was initially created. |
| **origin_lsn** | XLogRecPtr | The LSN of the commit record on the publisher where this transaction originated. |
| **base_snapshot** | Snapshot | The historic snapshot used for decoding the transaction. It ensures correct visibility during catalog scans by identifying which data was visible at the start of the transaction. |
| **changes** | dlist_head | A doubly linked list of ReorderBufferChange structures, storing individual data change records in LSN order. See the following subsection. |

**Note:** While *base_snapshot* is essential for determining visibility immediately after slot creation or during catalog changes, subsequent discussions omit it to focus on the steady-state data flow.

## 12.3.3. ReorderBufferChange

This structure represents an individual data modification. This list includes only the main items.

| Item | Type | Description |
| --- | --- | --- |
| **lsn** | XLogRecPtr | The LSN of the WAL record that generated this specific change. |
| **action** | ReorderBufferChangeType | The type of change operation (e.g., INSERT, UPDATE, DELETE, or TRUNCATE). |
| **data** | union | A union containing action-specific data, such as the tp (tuple) or truncate structures. |
| **data.tp.rlocator** | RelFileLocator | Identifies the physical relation (table) affected by the change. This is a triplet consisting of spcOid (Tablespace), dbOid (Database), and relNumber (RelFilenode number). |
| **data.tp.oldtuple** | HeapTuple | The “before” version of the tuple. This is populated for UPDATE or DELETE operations if required by the **Replica Identity** configuration (see Section 12.4.3). |
| **data.tp.newtuple** | HeapTuple | The “after” version of the tuple, containing the new data for INSERT or UPDATE operations. |

** ** ReorderBufferChange

```
/*
 * Types of the change passed to a 'change' callback.
 *
 * For efficiency and simplicity reasons we want to keep Snapshots, CommandIds
 * and ComboCids in the same list with the user visible INSERT/UPDATE/DELETE
 * changes. Users of the decoding facilities will never see changes with
 * *_INTERNAL_* actions.
 *
 * The INTERNAL_SPEC_INSERT and INTERNAL_SPEC_CONFIRM, and INTERNAL_SPEC_ABORT
 * changes concern &#34;speculative insertions&#34;, their confirmation, and abort
 * respectively.  They're used by INSERT .. ON CONFLICT .. UPDATE.  Users of
 * logical decoding don't have to care about these.
 */
typedef enum ReorderBufferChangeType
{
	REORDER_BUFFER_CHANGE_INSERT,
	REORDER_BUFFER_CHANGE_UPDATE,
	REORDER_BUFFER_CHANGE_DELETE,
	REORDER_BUFFER_CHANGE_MESSAGE,
	REORDER_BUFFER_CHANGE_INVALIDATION,
	REORDER_BUFFER_CHANGE_INTERNAL_SNAPSHOT,
	REORDER_BUFFER_CHANGE_INTERNAL_COMMAND_ID,
	REORDER_BUFFER_CHANGE_INTERNAL_TUPLECID,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_INSERT,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_CONFIRM,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_ABORT,
	REORDER_BUFFER_CHANGE_TRUNCATE,
} ReorderBufferChangeType;

/* forward declaration */
struct ReorderBufferTXN;

/*
 * a single 'change', can be an insert (with one tuple), an update (old, new),
 * or a delete (old).
 *
 * The same struct is also used internally for other purposes but that should
 * never be visible outside reorderbuffer.c.
 */
typedef struct ReorderBufferChange
{
	XLogRecPtr	lsn;

	/* The type of change. */
	ReorderBufferChangeType action;

	/* Transaction this change belongs to. */
	struct ReorderBufferTXN *txn;

	RepOriginId origin_id;

	/*
	 * Context data for the change. Which part of the union is valid depends
	 * on action.
	 */
	union
	{
		/* Old, new tuples when action == *_INSERT|UPDATE|DELETE */
		struct
		{
			/* relation that has been changed */
			RelFileLocator rlocator;

			/* no previously reassembled toast chunks are necessary anymore */
			bool		clear_toast_afterwards;

			/* valid for DELETE || UPDATE */
			HeapTuple	oldtuple;
			/* valid for INSERT || UPDATE */
			HeapTuple	newtuple;
		}			tp;

		/*
		 * Truncate data for REORDER_BUFFER_CHANGE_TRUNCATE representing one
		 * set of relations to be truncated.
		 */
		struct
		{
			Size		nrelids;
			bool		cascade;
			bool		restart_seqs;
			Oid		   *relids;
		}			truncate;

		/* Message with arbitrary data. */
		struct
		{
			char	   *prefix;
			Size		message_size;
			char	   *message;
		}			msg;

		/* New snapshot, set when action == *_INTERNAL_SNAPSHOT */
		Snapshot	snapshot;

		/*
		 * New command id for existing snapshot in a catalog changing tx. Set
		 * when action == *_INTERNAL_COMMAND_ID.
		 */
		CommandId	command_id;

		/*
		 * New cid mapping for catalog changing transaction, set when action
		 * == *_INTERNAL_TUPLECID.
		 */
		struct
		{
			RelFileLocator locator;
			ItemPointerData tid;
			CommandId	cmin;
			CommandId	cmax;
			CommandId	combocid;
		}			tuplecid;

		/* Invalidation. */
		struct
		{
			uint32		ninvalidations; /* Number of messages */
			SharedInvalidationMessage *invalidations;	/* invalidation message */
		}			inval;
	}			data;

	/*
	 * While in use this is how a change is linked into a transactions,
	 * otherwise it's the preallocated list.
	 */
	dlist_node	node;
} ReorderBufferChange;
```

# 12.4. WAL Data Filtering and Buffering

#### Beta Version: Work in progress.

This section describes the data filtering and buffering mechanism within the ReorderBuffer.

The discussion begins with the multi-stage filtering process executed by the walsender, which determines which records are eligible for decoding. This is followed by a demonstration of how the ReorderBuffer accumulates these changes through a concrete transaction scenario.

Furthermore, this section explains the differences in WAL data storage for UPDATE and DELETE statements based on the **Replica Identity**.

Finally, the section provides an overview of the “Spill to Disk” mechanism, which is triggered when the `ReorderBuffer` exceeds its memory limit.

Section Contents

- 12.4.1. Filtering
- 12.4.2. WAL Data Buffering
- 12.4.3. Relation between Replica Identity and Decoded Tuples
- 12.4.4. ReorderBuffer Memory Management and Transaction Serialization (Spill-to-Disk)

## 12.4.1. Filtering

The walsender decides whether to decode a WAL record and register it in the ReorderBuffer’s **changes** list through a multi-stage filtering gate.

- **1st Gate (Database OID):** The walsender immediately discards WAL records belonging to databases other than the target database.
- **2nd Gate (Origin ID / Callback):** Since version 16, the walsender checks the origin before data enters the ReorderBuffer. If origin = “none” is configured, the walsender discards any change originating from another node (origin_id > 0) at this stage. This prevents infinite replication loops. Refer to Section 12.1.4.1 for details.
- **3rd Gate (Publication Cache):** Since version 15, the walsender performs table-level filtering before buffering. It skips changes to tables not included in a publication and rows excluded by row filters without accumulating them in the buffer.
- **4th Gate (Relation Type / Physical Structure):** The walsender also filters out WAL records related to index updates. Logical replication focuses on row-level data changes; once the apply worker updates a tuple on the subscriber, the subscriber’s own indexing mechanism automatically handles the associated index updates.

Only changes that successfully pass through all these gates are stored in the ReorderBuffer.

** Filtering in Version 14 or Earlier

Prior to version 15, the process operated as follows:

1. Check the database OID of the WAL record (version 10 or later).
2. Decode the WAL record and accumulate all resulting changes in the ReorderBuffer.
3. Filter changes against the publication definitions only at the time of **COMMIT**.

In these versions, the walsender evaluated table-level filtering lazily. Consequently, the ReorderBuffer consumed memory unnecessarily by accumulating changes that were eventually discarded at commit time.

## 12.4.2. WAL Data Buffering

To understand how the walsender reconstructs logical changes from raw WAL data, this section examines the buffering process through a practical transaction interleaving scenario.

### 12.4.1.1. Setup: Target Relations

The scenario utilizes two tables, *tbl_a* and *tbl_b*. Both use a Primary Key as the default **REPLICA IDENTITY**.

```sql
CREATE TABLE tbl_a (id int PRIMARY KEY, name text, data int);
CREATE TABLE tbl_b (id int PRIMARY KEY, name text, data int);

INSERT INTO tbl_a VALUES (1, 'Alice', 100);
INSERT INTO tbl_b VALUES (10, 'Ken', 100);
```

### 12.4.1.2. Scenario: Interleaved Transaction Processing

The timeline below illustrates WAL record generation by two concurrent transactions (txid 840 and txid 841) and the process by which the ReorderBuffer captures these changes.

```
T0: BEGIN; -- txid 840
T1: INSERT INTO tbl_a VALUES(2,'Bob',200);
T2:
T3: INSERT INTO tbl_b VALUES(11,'Luke',110);
T4:
T5:
T6: DELETE FROM tbl_b WHERE id=10;
T7: COMMIT;
T8:
```

```
T0: BEGIN; -- txid 841
T1:
T2: INSERT INTO tbl_a VALUES(3,'Candy',3);
T3:
T4: UPDATE tbl_a SET data=data+1 WHERE id=1;
T5: UPDATE tbl_a SET data=data+1 WHERE id=1;
T6:
T7:
T8: COMMIT;
```

**Sequence of Operations:**

- **T0:** Both txid 840 and txid 841 start.
- **T1:** txid 840 inserts a row into *tbl_a*.
- **T2:** txid 841 inserts a row into *tbl_a*.
- **T3:** txid 840 inserts a row into *tbl_b*.
- **T4:** txid 841 updates *tbl_a*.
- **T5:** txid 841 updates *tbl_a* again.
- **T6:** txid 840 deletes a row from *tbl_b*.
- **T7:** txid 840 commits. This triggers the ReorderBuffer to finalize and process the accumulated changes for this transaction.
- **T8:** txid 841 commits, and its changes are subsequently processed.

** Why Isolation Levels Do Not Affect Logical Decoding

To understand why transaction isolation levels do not affect logical decoding, it is essential to consider when and how these mechanisms operate.

Logical decoding reconstructs committed change logs (WAL) that have already been finalized and applied to tuples. By the time these changes reach the WAL, they have already cleared all visibility checks mandated by their respective isolation levels during execution. Concurrency control governs tuple visibility while a transaction is running; in contrast, the decoding process focuses solely on reassembling the historical results of completed transactions.

Consequently, the original isolation level of a transaction has no bearing on the decoding logic itself.

The following explains how the ReorderBuffer captures WAL data at each step.

### 12.4.1.3. Detailed State Changes

#### **T1:** INSERT on tbl_a by txid 840

txid 840 creates a new ReorderBufferTXN struct. Its first_lsn field is set to the LSN of the WAL data written by this INSERT, and the change record is added to the changes list (see Figure 12.12).

![](/images/postgres-internals/pgsql12-fig-12-12.webp)

#### Figure 12.12. State of the ReorderBuffer after T1.

The ReorderBufferChange structure represents individual changes. It encapsulates essential metadata, including the LSN, the action type (e.g., INSERT), and the target relation OIDs (tablespace, database, and relation). The structure also stores the actual tuple data.

** Logical Level Full Page Writes (FPW)

As mentioned in Section 9.4.3.1, when [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) is set to **logical**, the main data portion of a Full Page Write (FPW) includes the actual modified tuple data.

This allows the walsender to bypass the page block during WAL retrieval. The walsender reads the tuple data directly from the main data section, reducing extraction overhead and optimizing decoding efficiency.

#### **T2:** INSERT on tbl_a by txid 841

txid 841 initializes a new ReorderBufferTXN structure (see Figure 12.13).

![](/images/postgres-internals/pgsql12-fig-12-13.webp)

#### Figure 12.13. State of the ReorderBuffer after T2.

The ReorderBuffer accumulates changes for txid 840 and txid 841 in independent sub-lists to ensure transactional isolation within the buffer.

#### **T3:** INSERT on tbl_b by txid 840

The ReorderBuffer appends the WAL data from the INSERT operation of txid 840 to its specific `changes` list (see Figure 12.14).

![](/images/postgres-internals/pgsql12-fig-12-14.webp)

#### Figure 12.14. State of the ReorderBuffer after T3.

#### **T4-T5:** UPDATE on tbl_a by txid 841

txid 841 executes two sequential UPDATE statements on *tbl_a*.

The ReorderBuffer appends the WAL data for the first UPDATE to the changes list of txid 841 (see Figure 12.15).

![](/images/postgres-internals/pgsql12-fig-12-15.webp)

#### Figure 12.15. State of the ReorderBuffer after T4.

Under the REPLICA IDENTITY DEFAULT configuration, the WAL record includes the *oldtuple* only if the Primary Key columns are modified.

In this scenario, since the Primary Key (id) remains unchanged, the subscriber can uniquely identify the target tuple using the *id = 1* provided in the *newtuple*. Consequently, the *oldtuple* is omitted because it is unnecessary for tuple identification.

Refer to Section 12.4.3 for more details.

Figure 12.16 illustrates the state after the second UPDATE statement updates the same tuple again.

![](/images/postgres-internals/pgsql12-fig-12-16.webp)

#### Figure 12.16. State of the ReorderBuffer after T5.

#### **T6:** DELETE on tbl_b by txid 840

When txid 840 deletes a row from *tbl_b*, the ReorderBuffer appends the change record to the changes list (see Figure 12.17).

![](/images/postgres-internals/pgsql12-fig-12-17.webp)

#### Figure 12.17. State of the ReorderBuffer after T6.

This record stores only the Primary Key data, which serves as the Replica Identity (see Figure 12.18).

![](/images/postgres-internals/pgsql12-fig-12-18.webp)

#### Figure 12.18. Details of the DELETE change record containing only Primary Key data.

A subscriber only requires Key information to identify and delete the target tuple. By omitting non-key columns (such as ’name’ and ‘data’), PostgreSQL minimizes memory consumption in the ReorderBuffer and reduces network bandwidth.

#### **T7:** COMMIT by txid 840

When txid 840 commits, the ReorderBuffer iterates through the changes list of the corresponding ReorderBufferTXN from the head. The Output Plugin receives each change, formats it into a replication message, and transmits it to the subscriber.

Section 12.6 describes change reordering and message transmission. After the data is sent, the ReorderBuffer removes the ReorderBufferTXN entry (see Figure 12.19).

![](/images/postgres-internals/pgsql12-fig-12-19.webp)

#### Figure 12.19. State of the ReorderBuffer after T7.

#### **T8:** COMMIT by txid 841

Similarly, when txid 841 commits, its accumulated changes are reconstructed and sent to the subscriber in the same manner.

## 12.4.3. Relation between Replica Identity and Decoded Tuples

The data recorded in the WAL for UPDATE and DELETE operations depends on the **Replica Identity** configured for the target table.

### 12.4.3.1. UPDATE Operations

The behavior of UPDATE operations differs depending on whether the Replica Identity is set to a specific key (Primary Key or Index) or to FULL.

First, consider the case where the Replica Identity is **DEFAULT (PK)** or **USING INDEX**:

The contents of *oldtuple* and *newtuple* vary based on which columns are modified:

| Replica Identity | Update Type | oldtuple | newtuple |
| --- | --- | --- | --- |
| **PK / Index** | Non-key columns | <none> | Full New Tuple |
| **PK / Index** | **Key columns** | **Key Columns** | Full New Tuple |

Whether PostgreSQL records an *oldtuple* depends on whether the updated columns are part of the Replica Identity. See Figure 12.20.

![](/images/postgres-internals/pgsql12-fig-12-20.webp)

#### Figure 12.20. Payload structure for UPDATE operations under standard REPLICA IDENTITY.

When updating columns that constitute the Replica Identity, the *oldtuple* contains the previous key values. This allows the subscriber to **identify** the existing target tuple using these original values. The following pseudo-SQL illustrates this logic:

```sql
-- Pseudo-SQL: Identifying the tuple via the old key
UPDATE tbl_a SET id = id + 100 WHERE id = 1;
```

Conversely, if only non-identity columns are updated, the *oldtuple* remains empty (none). In this scenario, the subscriber identifies the target tuple using the key values already present in the *newtuple*.

```sql
-- Pseudo-SQL: Identifying the tuple via the current key
UPDATE tbl_a SET data = data + 100 WHERE id = 1;
```

** Note

The Apply Worker does **not** assemble or execute text-based SQL queries. While it leverages the executor infrastructure, it bypasses the parsing and planning phases.

Instead, it performs direct tuple lookups &mdash; using index or sequential scans via functions such as [RelationFindReplTupleByIndex](https://github.com/postgres/postgres/blob/3b28dad70e2fa57a973697d51242c284d475c7df/src/backend/executor/execReplication.c#L182) &mdash; to identify and modify the target data.

When the Replica Identity is **FULL**, the *oldtuple* stores the entire tuple as it existed before the update, and the *newtuple* stores the entire updated tuple. See Figure 12.21.

| Replica Identity | Update Type | oldtuple | newtuple |
| --- | --- | --- | --- |
| **FULL** | Any columns | Full Old Tuple | Full New Tuple |

![](/images/postgres-internals/pgsql12-fig-12-21.webp)

#### Figure 12.21. Payload structure for UPDATE operations under REPLICA IDENTITY FULL.

To uniquely identify the target tuple in a table without a formal key, the subscriber must match the values of all columns in its WHERE clause.

```sql
-- Pseudo-SQL: Full column matching required for identification
UPDATE tbl_a SET data = data + 100 WHERE id = 1 AND name = 'Alice' AND data = 100;
```

### 12.4.3.2. DELETE Operations

For DELETE operations, PostgreSQL records only the *oldtuple*, as no subsequent state exists:

| Replica Identity | oldtuple | newtuple |
| --- | --- | --- |
| **PK / Index** | **Key Columns** | <none> |
| **FULL** | Full Old Tuple | <none> |

When using a **PK** or **Index** identity, the *oldtuple* preserves only the key, as this information is sufficient for the subscriber to locate and remove the target tuple.

In contrast, the **FULL** configuration requires the entire *oldtuple* to ensure the subscriber can accurately identify the specific tuple to be deleted. See Figure 12.22.

![](/images/postgres-internals/pgsql12-fig-12-22.webp)

#### Figure 12.22. Identification of tuples for DELETE operations via oldtuple data.

## 12.4.4. ReorderBuffer Memory Management and Transaction Serialization (Spill-to-Disk)

To prevent memory exhaustion when processing large transactions, the ReorderBuffer implements a **spill-to-disk** mechanism. This process is triggered whenever the cumulative memory consumption of all buffered transactions exceeds the threshold defined by the [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM) parameter.

### 12.4.4.1. The Spillover Algorithm

The following steps outline how the ReorderBuffer manages its memory footprint:

1. **Monitor Memory Usage**: For every new WAL record appended to the ReorderBuffer, the total tracked memory size increases by the size of the newly added ReorderBufferChange record.
2. **Evaluate Threshold**: The current memory size is compared against the *logical_decoding_work_mem* limit.
3. **Trigger Eviction (if threshold exceeded)**:
4. **Identify the Target**: The system identifies the “heaviest” transaction &mdash; the one currently **accumulating** the largest number of buffered changes.
5. **Serialize Data**: All buffered changes for that specific transaction are written into a `.spill` file within the `$PGDATA/pg_replslot/` directory.
6. **Memory Reclamation**: The memory allocated for the serialized changes is **released**, though the transaction’s metadata (the ReorderBufferTXN structure) remains in the buffer.
7. **Update Transaction State**: The transaction’s status is updated to *serialized = true*. This flag indicates that the data must be read back from disk during the final decoding phase (e.g., at commit time).

Figure 12.23 illustrates a scenario where a transaction is spilled to disk to accommodate incoming data:

![](/images/postgres-internals/pgsql12-fig-12-23.webp)

#### Figure 12.23. Memory management in the ReorderBuffer and spilling to disk.

1. A new WAL record from $\text{txid}_{2}$ is being appended, but the ReorderBuffer has already reached its capacity.
2. The system identifies $\text{txid}_{3}$ as the transaction with the most accumulated changes. Its changes are serialized to a spill file, and the associated memory is released.
3. The changes for $\text{txid}_{2}$ are successfully added to the ReorderBuffer using the newly available space.

PostgreSQL prioritizes spilling the “heaviest” transaction rather than flushing all transactions simultaneously. This approach minimizes disk I/O while effectively keeping memory usage within the allowed limits.

### 12.4.4.2. Spill File Structure and Naming Conventions

Spill files are stored within the replication slot directory:

```
$PGDATA/pg_replslot/<slot_name>/
    \-+-- xid-856-lsn-0-6000000.spill
      |-- xid-856-lsn-0-7000000.spill
      +-- xid-856-lsn-0-8000000.spill
```

The naming convention for these files allows unique identification by transaction ID and LSN range:

**Format:** `xid-[XID]-lsn-[LSN_HIGH]-[LSN_LOW].spill`

- **XID**: The transaction ID (represented in decimal).
- **LSN_HIGH**: The upper 32 bits of the LSN (represented in hexadecimal).
- **LSN_LOW**: The lower 32 bits of the LSN (represented in hexadecimal).

**Practical Example:**

```bash
$ ls -l -h $PGDATA/pg_replslot/myslot/
total 68M
-rw------- 1 postgres postgres  200 Mar 24 08:12 state
-rw------- 1 postgres postgres  30M Mar 24 08:12 xid-856-lsn-0-6000000.spill
-rw------- 1 postgres postgres  34M Mar 24 08:12 xid-856-lsn-0-7000000.spill
-rw------- 1 postgres postgres 4.5M Mar 24 08:12 xid-856-lsn-0-8000000.spill
```

# 12.5. Logical Decoding Output Plugins: pgoutput

#### Beta Version: Work in progress.

An output plugin primarily serializes change data &mdash; organized and reordered by the **ReorderBuffer** &mdash; into a format compatible with a subscriber.

The plugin performs the following specific tasks:

- **Data Transformation and Filtering:** The plugin performs a final validation of the binary data within the ReorderBuffer against the publication’s configuration. It determines whether the target table or specific actions (e.g., INSERT, TRUNCATE) are included in the subscription and evaluates row filters or column lists. After excluding irrelevant data, the plugin formats the remaining payload into the appropriate data types (e.g., text or binary) dictated by the replication protocol.
- **Message Generation:** The plugin constructs a logical sequence of messages, such as BEGIN, INSERT/UPDATE/DELETE/TRUNCATE, and COMMIT. These messages are passed to the walsender process, which manages network transmission.

As the name implies, this mechanism is **pluggable**. Custom plugins can support unique output formats or specialized internal processing logic. In standard PostgreSQL logical replication, the officially supported **pgoutput** serves as the default plugin.

The pgoutput message format consists of a series of tagged data packets. The following sections describe the structure of these messages.

** Info

While PostgreSQL supports multiple protocol versions (versions 1 through 4), this section primarily focuses on core structures. For a comprehensive reference, consult the official documentation: [Logical Replication Message Formats](https://www.postgresql.org/docs/current/protocol-logicalrep-message-formats.html).

Section Contents

- 12.5.1. TupleData (shared sub-message)
- 12.5.2. Transaction Control
- 12.5.3. DML
- 12.5.4. Stream Control

## 12.5.1. TupleData (shared sub-message)

The TupleData structure is a common sub-message used within DML operations to represent tuple contents.

```json
[num_cols: Int16]
  For each column:
    [kind: Byte1('n'|'u'|'t'|'b')]
    if kind = 't' or 'b':
      [length: Int32] [value: Byte*n*]
```

| Item | Type | Description |
| --- | --- | --- |
| **num_cols** | Int16 | Number of columns in the tuple. |
| *For each column:* |  |  |
| **kind** | Byte1 | ’n’ = NULL; ‘u’ = unchanged TOASTed value; ’t’ = text formatted; ‘b’ = binary formatted. |
| **length** | Int32 | Length of the column value in bytes. Present only when kind is ’t’ or ‘b’. |
| **value** | Byte*n* | The actual column value. *n* matches the preceding length. Present only when kind is ’t’ or ‘b’. |

## 12.5.2. Transaction Control

### 12.5.2.1. Begin (‘B’)

Identifies the start of a transaction. It provides the transaction’s LSN and commit timestamp, allowing the subscriber to maintain chronological order.

```json
[Byte1('B')] [final_lsn: Int64] [commit_timestamp: Int64] [txid: Int32]
```

| Item | Type | Description |
| --- | --- | --- |
| **‘B’** | Byte1 | Identifies the message as a BEGIN message. |
| **final_lsn** | Int64 (XLogRecPtr) | The final LSN of the transaction. Generally corresponds to the *commit_lsn*, but for two-phase commits, it reflects the *prepare_lsn*. |
| **commit_timestamp** | Int64 (TimestampTz) | The commit timestamp in microseconds since the PostgreSQL epoch (2000-01-01). |
| **txid** | Int32 (TransactionId) | The XID (Transaction ID) of the transaction. |

### 12.5.2.2. Commit (‘C’)

Identifies the end of a transaction. Upon receiving this, the subscriber applies the accumulated changes locally as a single atomic unit.

```json
[Byte1('C')] [flags: Int8] [commit_lsn: Int64] [end_lsn: Int64] [commit_timestamp: Int64]
```

| Item | Type | Description |
| --- | --- | --- |
| **‘C’** | Byte1 | Identifies the message as a COMMIT message. |
| **flags** | Int8(0) | Reserved flags; currently unused. |
| **commit_lsn** | Int64 (XLogRecPtr) | The LSN of the commit. |
| **end_lsn** | Int64 (XLogRecPtr) | The end LSN of the transaction. |
| **commit_timestamp** | Int64 (TimestampTz) | The commit timestamp. |

## 12.5.3. DML

### 12.5.3.1. Origin (‘O’)

Used in setups involving multi-node replication. It informs the subscriber where the transaction originally occurred to prevent replication loops.

```json
[Byte1('O')] [origin_lsn: Int64] [origin_name: String]
```

| item | type | description |
| --- | --- | --- |
| ‘O’ | Byte1 | Identifies the message as an origin message. |
| origin_lsn | Int64 (XLogRecPtr) | The LSN of the commit on the origin server. |
| origin_name | String | Name of the origin. Note that there can be multiple Origin messages inside a single transaction. |

### 12.5.3.2. Relation (‘R’)

Provides metadata for a specific table. This message is typically sent before the first DML message for a table in a session, mapping a unique ID to the table’s schema and columns.

```json
[Byte1('R')] [rel_id: Int32] [namespace: String] [relname: String]
             [replica_identity: Int8] [num_columns: Int16]
  For each column:
    [flags: Int8] [name: String] [type_oid: Int32] [atttypmod: Int32]
```

| item | type | description |
| --- | --- | --- |
| ‘R’ | Byte1 | Identifies the message as a relation message. |
| rel_id | Int32 (Oid) | OID of the relation. |
| namespace | String | Namespace (empty string for pg_catalog). |
| relname | String | Relation name. |
| replica_identity | Int8 | Replica identity configuration for the relation (same as relreplident in pg_class). ’d’=default, ’n’=nothing, ‘f’=full, ‘i’=index. |
| num_columns | Int16 | Number of columns. |
| *For each column:* |  |  |
| flags | Int8 | Flags for the column. 0 = no flags; 1 = column is part of the replica identity key. |
| name | String | Name of the column. |
| type_oid | Int32 (Oid) | OID of the column’s data type. |
| atttypmod | Int32 | Type modifier of the column (atttypmod). |

### 12.5.3.3. Insert (‘I’)

Represents the insertion of a new tuple. It includes the target relation ID and the TupleData of the new tuple.

```json
[Byte1('I')] [rel_id: Int32] [Byte1('N')] [new_tuple: TupleData]
```

| item | type | description |
| --- | --- | --- |
| ‘I’ | Byte1 | Identifies the message as an insert message. |
| rel_id | Int32 (Oid) | OID of the relation corresponding to the ID in the relation message. |
| ‘N’ | Byte1 | Identifies the following TupleData as a new tuple. |
| new_tuple | TupleData | TupleData representing the contents of the new tuple. |

### 12.5.3.4. Update (‘U’)

Represents an update to an existing tuple. Depending on the REPLICA IDENTITY configuration and whether key columns changed, it may include old tuple values to help the subscriber identify the correct record to modify.

```
-- REPLICA IDENTITY DEFAULT or INDEX (key columns changed):
[Byte1('U')] [rel_id: Int32] [Byte1('K')] [old_tuple: TupleData] [Byte1('N')] [new_tuple: TupleData]

-- REPLICA IDENTITY FULL:
[Byte1('U')] [rel_id: Int32] [Byte1('O')] [old_tuple: TupleData] [Byte1('N')] [new_tuple: TupleData]

-- REPLICA IDENTITY DEFAULT or INDEX (key columns NOT changed):
[Byte1('U')] [rel_id: Int32] [Byte1('N')] [new_tuple: TupleData]
```

| item | type | description |
| --- | --- | --- |
| ‘U’ | Byte1 | Identifies the message as an update message. |
| rel_id | Int32 (Oid) | OID of the relation corresponding to the ID in the relation message. |
| ‘K’ | Byte1 | *(Optional)* Identifies the following TupleData as a key. Present only if the update changed data in any column that is part of the REPLICA IDENTITY index. Mutually exclusive with ‘O’. |
| ‘O’ | Byte1 | *(Optional)* Identifies the following TupleData as an old tuple. Present only if the table has REPLICA IDENTITY set to FULL. Mutually exclusive with ‘K’. |
| old_tuple | TupleData | *(Optional)* TupleData for the old tuple or primary key. Present only if the preceding ‘K’ or ‘O’ marker is present. |
| ‘N’ | Byte1 | Identifies the following TupleData as a new tuple. |
| new_tuple | TupleData | TupleData representing the contents of the new tuple. |

### 12.5.3.5. Delete (‘D’)

Represents the deletion of a tuple. The subscriber uses the provided key or old tuple data to locate and remove the record.

```
-- REPLICA IDENTITY DEFAULT or INDEX:
[Byte1('D')] [rel_id: Int32] [Byte1('K')] [old_key_tuple: TupleData]

-- REPLICA IDENTITY FULL:
[Byte1('D')] [rel_id: Int32] [Byte1('O')] [old_tuple: TupleData]
```

| item | type | description |
| --- | --- | --- |
| ‘D’ | Byte1 | Identifies the message as a delete message. |
| rel_id | Int32 (Oid) | OID of the relation corresponding to the ID in the relation message. |
| ‘K’ | Byte1 | *(Either ‘K’ or ‘O’, never both)* Identifies the following TupleData as a key. Present if the table uses an index as REPLICA IDENTITY. |
| ‘O’ | Byte1 | *(Either ‘K’ or ‘O’, never both)* Identifies the following TupleData as an old tuple. Present if the table has REPLICA IDENTITY set to FULL. |
| old_key_tuple | TupleData | TupleData representing the contents of the old tuple or primary key, depending on the preceding marker. |

### 12.5.3.6. Truncate (‘T’)

Represents a bulk removal of all tuples in one or more tables.

```json
[Byte1('T')] [num_relations: Int32] [options: Int8]
             [rel_id: Int32] ...   -- repeated num_relations times
```

| item | type | description |
| --- | --- | --- |
| ‘T’ | Byte1 | Identifies the message as a truncate message. |
| num_relations | Int32 | Number of relations to be truncated. |
| options | Int8 | Option bits for TRUNCATE: bit 0 (1) = CASCADE; bit 1 (2) = RESTART IDENTITY. |
| rel_id | Int32 (Oid) | OID of the relation corresponding to the ID in the relation message. This field is repeated num_relations times. |

## 12.5.4. Stream Control

The following messages are utilized when the publisher sends data in segments to support the **Streaming of Large Transactions**.

For details, refer to Section 12.6.3.

### 12.5.4.1. Stream Start (‘S’)

Identifies the beginning of a **stream segment**. This is used when a large, ongoing transaction is split into multiple segments.

```json
[Byte1('S')] [txid: Int32] [first_segment: Int8]
```

| Item | Type | Description |
| --- | --- | --- |
| **‘S’** | Byte1 | Identifies the message as a Stream Start message. |
| **txid** | Int32 (TransactionId) | The XID of the transaction. |
| **first_segment** | Int8 | Set to 1 if this is the first segment for this XID; otherwise 0. |

### 12.5.4.2. Stream Stop (‘E’)

Identifies the end of a stream segment.

```json
[Byte1('E')]
```

| Item | Type | Description |
| --- | --- | --- |
| **‘E’** | Byte1 | Identifies the message as a Stream Stop message. |

### 12.5.4.3. Stream Commit (‘c’)

Identifies the commit of a streamed transaction. It contains information similar to a standard Commit (‘C’) but operates within the streaming context.

```json
[Byte1('c')] [txid: Int32] [flags: Int8] [commit_lsn: Int64] [end_lsn: Int64] [commit_timestamp: Int64]
```

| Item | Type | Description |
| --- | --- | --- |
| **‘c’** | Byte1 | Identifies the message as a Stream Commit message. |
| **txid** | Int32 (TransactionId) | The XID of the transaction. |
| **flags** | Int8(0) | Reserved flags; currently unused. |
| **commit_lsn** | Int64 (XLogRecPtr) | The LSN of the commit. |
| **end_lsn** | Int64 (XLogRecPtr) | The end LSN of the transaction. |
| **commit_timestamp** | Int64 (TimestampTz) | The commit timestamp. |

### 12.5.4.4. Stream Abort (‘A’)

Identifies the abort (rollback) of a streamed transaction. This is also used for the abort of subtransactions.

```json
[Byte1('A')] [txid: Int32] [subxid: Int32] [abort_lsn: Int64]? [abort_timestamp: Int64]?
```

| Item | Type | Description |
| --- | --- | --- |
| **‘A’** | Byte1 | Identifies the message as a Stream Abort message. |
| **txid** | Int32 (TransactionId) | The XID of the transaction. |
| **subxid** | Int32 (TransactionId) | The XID of the subtransaction (same as txid for top-level transactions). |
| **abort_lsn** | Int64 (XLogRecPtr) | The LSN of the abort operation. Present only if parallel streaming is enabled (Protocol v4+). |
| **abort_timestamp** | Int64 (TimestampTz) | The abort timestamp. Present only if parallel streaming is enabled (Protocol v4+). |

# 12.6. Transaction Reassembly and Sending Message

#### Beta Version: Work in progress.

This section describes how the ReorderBuffer reassembles accumulated changes and sends them to the subscriber’s apply worker via an output plugin.

Section Contents

- 12.6.1. Outline of Transaction Reassembly
- 12.6.2. Sending Messages
- 12.6.3. Streaming of Large Transactions

## 12.6.1. Outline of Transaction Reassembly

When the walsender detects a **COMMIT** record in the WAL, the ReorderBuffer initiates the reassembly process. It organizes captured changes in LSN order and passes them to the output plugin. After the plugin processes the transaction, the `ReorderBuffer` releases memory by deleting the change records and the `ReorderBufferTXN` entry.

The standard processing flow is as follows:

1. **Retrieve Transaction Data**: The ReorderBufferTXN for the committed transaction is retrieved.
2. **Merge Subtransactions**: If subtransactions exist, their change lists merge into the top-level transaction and are ordered by LSN.
3. **Ensure Consistency**: The final list of change records is sorted by LSN to ensure chronological consistency.
4. **Origin Check**: As detailed in Section 12.1.4, origin information resides within COMMIT or ABORT records. If present, the ReorderBuffer includes this information in the replication message; otherwise, it is omitted.
5. **Pass to Plugin**: Changes are iterated and passed sequentially to the output plugin (e.g., **pgoutput**).
6. **Cleanup**: The ReorderBufferTXN and all internal ReorderBufferChange objects are released to free memory.

While subtransactions must be merged in practice, this section assumes transactions without subtransactions for simplicity. In such cases, `ReorderBufferChange` records are naturally ordered within their list, allowing the plugin to process them by simply traversing the list in ascending order.

If a transaction is **ABORTED**, the ReorderBuffer immediately discards the corresponding ReorderBufferTXN and all associated changes without passing them to the plugin.

### 12.6.1.1. Examples

Figures 12.24 and 12.25, along with the following byte sequences, represent messages generated by pgoutput during typical transactions involving multiple tables and actions.

![](/images/postgres-internals/pgsql12-fig-12-24.webp)

#### Figure 12.24. Structure of ReorderBufferTXN and changes for txid 840.

**Generated Message Sequence for txid 840:**

```json
[B] lsn=0/1CAA128  ts=2026-03-28T16:55:00  txid=840
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;2&#34;][t&#34;Bob&#34;][t&#34;2&#34;]
[R] oid=16464  &#34;public&#34;.&#34;tbl_b&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16464  N      [t&#34;11&#34;][t&#34;Luke&#34;][t&#34;110&#34;]
[D] oid=16464  K      [t&#34;10&#34;][u][u]
[C] flags=0  commit=0/1CAA128  end=0/1CAA200  ts=2026-03-28T16:55:10
```

![](/images/postgres-internals/pgsql12-fig-12-25.webp)

#### Figure 12.25. Structure of ReorderBufferTXN and changes for txid 841.

**Generated Message Sequence for txid 841:**

```json
[B] lsn=0/1CA9E00  ts=2026-03-28T16:55:05  txid=841
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;3&#34;][t&#34;Candy&#34;][t&#34;3&#34;]
[U] oid=16456  N      [t&#34;1&#34;][t&#34;Alice&#34;][t&#34;2&#34;]
[U] oid=16456  N      [t&#34;1&#34;][t&#34;Alice&#34;][t&#34;3&#34;]
[C] flags=0  commit=0/1CA9E00  end=0/1CA9F00  ts=2026-03-28T16:55:15
```

**Note on Relation (‘R’) Messages:** The Relation message is sent only if the specific table’s metadata has not been sent during the current walsender session, or if the table definition has changed. This minimizes redundant metadata transfer.

## 12.6.2. Sending Messages

Once serialized by the output plugin, these messages are encapsulated into the logical replication protocol and sent over the network. See Figure 12.26.

![](/images/postgres-internals/pgsql12-fig-12-26.webp)

#### Figure 12.26. Message sequence for standard (non-streamed) transactions.

In a standard (non-streamed) transaction, the subscriber’s apply worker receives the entire sequence, from `Begin` to `Commit`, as a single continuous stream only after the publisher commits the transaction.

** Viewing Raw Replication Messages

Logical replication messages use a binary format and cannot be displayed directly as plain text. However, the raw binary stream can be inspected by piping the output of the [pg_recvlogical](https://www.postgresql.org/docs/current/app-pgrecvlogical.html) utility into the `od` (octal dump) command.

```bash
$ # Create a slot using the pgoutput plugin
$ pg_recvlogical -d testdb --slot myslot --create-slot  -P pgoutput

$ # Start the slot and pipe the binary stream to od for inspection
$ pg_recvlogical -d testdb --slot=myslot --start -f -  -o proto_version=1  -o publication_names='my_publication' |  od -c  -A n
   B  \0  \0  \0  \0 001 276 203 270  \0 002 364 005 301   < 232
 350  \0  \0 003  \b  \n   R  \0  \0   @ 033   p   u   b   l   i
   c  \0   t   b   l   _   1  \0   d  \0 003 001   i   d  \0  \0
  \0  \0 027 377 377 377 377  \0   n   a   m   e  \0  \0  \0  \0
 031 377 377 377 377  \0   d   a   t   a  \0  \0  \0  \0 027 377
 377 377 377  \n   I  \0  \0   @ 033   N  \0 003   t  \0  \0  \0
 001   1   t  \0  \0  \0 005   A   l   i   c   e   t  \0  \0  \0
 001   1  \n   I  \0  \0   @ 033   N  \0 003   t  \0  \0  \0 001
   2   t  \0  \0  \0 003   B   o   b   t  \0  \0  \0 001   2  \n
   U  \0  \0   @ 033   N  \0 003   t  \0  \0  \0 001   1   t  \0
  \0  \0 005   A   l   i   c   e   t  \0  \0  \0 002   1   0  \n
   C  \0  \0  \0  \0  \0 001 276 203 270  \0  \0  \0  \0 001 276
... snip ...
```

For debugging or research, the [test_decoding](https://www.postgresql.org/docs/current/test-decoding.html) plugin is a suitable alternative, as it decodes the WAL into a human-readable format.

```bash
$ # Create a slot using the test_decoding plugin
$ pg_recvlogical -d testdb --slot myslot --create-slot  -P test_decoding

$ # View the decoded output
$ pg_recvlogical -d testdb --slot=myslot --start -f -

BEGIN 840
table public.tbl_a: INSERT: id[integer]:2 name[text]:'Bob' data[integer]:2
table public.tbl_b: INSERT: id[integer]:11 name[text]:'Luke' data[integer]:110
table public.tbl_b: DELETE: id[integer]:10
COMMIT 840
BEGIN 841
table public.tbl_a: INSERT: id[integer]:3 name[text]:'Candy' data[integer]:3
table public.tbl_a: UPDATE: id[integer]:1 name[text]:'Alice' data[integer]:2
table public.tbl_a: UPDATE: id[integer]:1 name[text]:'Alice' data[integer]:3
COMMIT 841
```

## 12.6.3. Streaming of Large Transactions

When *streaming* is set to *‘on’* or *‘parallel’* and the ReorderBuffer reaches its memory limit, PostgreSQL does not write changes to local spill files. Instead, the publisher sends these changes immediately to the subscriber &mdash; specifically to the apply worker or leader apply worker.

The following example illustrates how a large transaction is segmented. See Figure 12.27.

![](/images/postgres-internals/pgsql12-fig-12-27.webp)

#### Figure 12.27. Message sequence for streamed transactions.

If txid 842 consumes the most memory when the buffer overflows, the publisher reorders its changes and wraps them between **Stream Start (‘S’)** and **Stream Stop (‘E’)** markers to form a segment.

Notably, the **Stream Start** message replaces the **Begin (‘B’)** message for the initial segment of a streamed transaction.

### 12.6.3.1. First Segment (txid=842)

```json
[S] txid=842  first_segment=1
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols  [id:int4(key)][name:text][data:int4]
[I] txid=842  oid=16456  N  [t&#34;1&#34;][t&#34;Data1&#34;][t&#34;100&#34;]
[I] txid=842  oid=16456  N  [t&#34;2&#34;][t&#34;Data2&#34;][t&#34;200&#34;]
... (thousands of INSERTs) ...
[I] txid=842  oid=16456  N  [t&#34;50000&#34;][t&#34;Data50000&#34;][t&#34;5000000&#34;]
[E]
```

Subsequent overflows trigger additional segments. Since these are not the initial transmission for this transaction, the *first_segment* flag in the **Stream Start** command is set to 0.

### 12.6.3.2. Second Segment (txid=842)

```json
[S] txid=842  first_segment=0
[I] txid=842  oid=16456  N  [t&#34;50001&#34;][t&#34;Data50001&#34;][t&#34;5000100&#34;]
... (further INSERTs) ...
[I] txid=842  oid=16456  N  [t&#34;100000&#34;][t&#34;Data100000&#34;][t&#34;10000000&#34;]
[E]
```

When txid 842 eventually commits on the publisher, the publisher sends a **Stream Commit (‘c’)** message.

### 12.6.3.3. Stream Commit

```json
[c] txid=842  flags=0  commit=0/1CB0000  end=0/1CB0100  ts=2026-03-28T17:10:00
```

If the transaction aborts instead, the publisher sends a **Stream Abort (‘A’)** message to inform the subscriber to discard the previously received segments.

# 12.7. Apply Worker and Transaction Replay

#### Beta Version: Work in progress.

The apply worker is the core component responsible for replaying logical changes received from the publisher onto the subscriber’s local tables.

This section first reviews the fundamental operation of the apply worker, followed by an analysis of advanced modes involving the incremental processing of large transactions and the coordinated use of parallel apply workers.

Section Contents

- 12.7.1. Process Overview (streaming = off)
- 12.7.2. Streaming Mode (streaming = on)
- 12.7.3. Parallel Apply Worker Mode (streaming = parallel)

## 12.7.1. Process Overview (streaming = off)

The apply worker on the subscriber node performs the following primary tasks:

- **Origin Filtering**: Inspects the origin metadata of the incoming message to determine whether the transaction should be replayed or skipped to prevent loops.
- **LSN Skip Check (Idempotency)**: Compares the incoming transaction’s LSN with the *remote_lsn* persisted in the [pg_replication_origin_status](https://www.postgresql.org/docs/current/view-pg-replication-origin-status.html) view. If the transaction has already been applied, the worker skips it to ensure data consistency.
- **Dispatch**: Routes messages to their respective handlers based on the message type, such as INSERT, UPDATE, or DELETE.
- **Conflict Detection**: Identifies operational conflicts, such as attempting to update a missing tuple. By default, the worker reports these conflicts and halts replication to prevent divergence.

### 12.7.1.1. Origin Filtering and LSN Tracking

As discussed in Section 12.1.4, the decision to apply a transaction depends on the *origin* parameter and the presence of an *origin_id*.

In current implementations, if *origin* = *’none’* is configured and the *origin_id* is greater than zero, the apply worker aborts the replay; otherwise, the worker proceeds.

### 12.7.1.2. Message Dispatching and Replay Flow

Upon receiving a stream of logical decoding messages, the apply worker processes them sequentially based on their type. Consider a scenario where a single tuple is inserted into tbl_a on the publisher:

**Message Stream Sample:**

```json
[B] lsn=0/1CA96C0  ts=2026-03-29T16:55:05  txid=845
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;3&#34;][t&#34;Candy&#34;][t&#34;3&#34;]
[C] flags=0  commit=0/1CA9E00  end=0/1CA9F00  ts=2026-03-29T16:55:15
```

The processing flow for this INSERT transaction is as follows:

1. **[B] Begin Message**: The apply worker initiates a local transaction and captures the publisher’s commit LSN and timestamp. The worker sets the [session_replication_role](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-SESSION-REPLICATION-ROLE) to *replica*, ensuring that local triggers and constraints follow their defined replication roles.
2. **[R] Relation Message**: The apply worker receives the table definition. The worker updates the RelationSyncCache, mapping the publisher-side OID (e.g., 16456) to the local table’s OID based on the schema and table name.
3. **[I] Insert Message**: The worker converts the binary tuple data into the local table format. The apply worker executes an internal insert (via [ExecSimpleRelationInsert](https://github.com/postgres/postgres/blob/6ca631b9901264b97c5b165e66edd3a85847ee0b/src/backend/executor/execReplication.c#L810)), which also updates any associated indexes. This operation generates its own WAL records on the subscriber.
4. **[C] Commit Message**: The local transaction commits. The apply worker appends the *origin_id* corresponding to the publisher to the commit WAL record. The worker then updates [pg_replication_origin](https://www.postgresql.org/docs/current/catalog-pg-replication-origin.html) to store the latest applied LSN and sends an acknowledgment (ACK) to the walsender, confirming that the data has flushed to disk.

While INSERT is the primary example here, other DML operations such as UPDATE and DELETE follow a similar dispatch logic.

The commit WAL record contains appended metadata from the source publisher: specifically, the *origin_id*, the *final_lsn* as the *origin_lsn*, and the *commit_timestamp* as the *origin_timestamp*.

As mentioned in Section 12.4.3, UPDATE and DELETE operations involve an additional step: the apply worker must execute direct tuple lookups &mdash; utilizing index or sequential scans via functions such as [RelationFindReplTupleByIndex](https://github.com/postgres/postgres/blob/3b28dad70e2fa57a973697d51242c284d475c7df/src/backend/executor/execReplication.c%23L182) &mdash; to uniquely identify and modify the target data before applying the change.

### 12.7.1.3. Optimization for REPLICA IDENTITY FULL

In version 15 or earlier, tables configured with *REPLICA IDENTITY FULL* necessitated a sequential scan to identify the target tuple for UPDATE or DELETE operations, leading to significant performance overhead on large tables.

From version 16 onwards, the apply worker can leverage existing indexes to locate tuples even under *REPLICA IDENTITY FULL*. The function [FindLogicalRepLocalIndex()](https://github.com/postgres/postgres/blob/32770ea03247bc42b38ccc53b84711e0c13d1498/src/backend/replication/logical/relation.c#L868) identifies suitable non-partial B-tree indexes that can uniquely identify the row, substantially reducing the reliance on costly sequential scans.

## 12.7.2. Streaming Mode (streaming = on)

When the *streaming* parameter is set to *on*, the apply worker receives in-progress transactions from the publisher in multiple segments before the final commit.

Consider a scenario involving two concurrent transactions: txid 842, a large transaction sent across two streamed segments, and txid 843, a smaller transaction sent as a standard block-based message. See Figure 12.28.

![](/images/postgres-internals/pgsql12-fig-12-28.webp)

#### Figure 12.28. Replay process of logical changes when streaming is 'on'.

The processing sequence illustrated in Figure 12.28 is as follows:

- (1) **First Segment of txid 842**: The apply worker receives the initial stream segment and accumulates the changes in memory using a `StringInfoData` structure (internally, the *original_msg* buffer).
- (2) **Message for txid 843**: A standard non-streamed block for txid 843 arrives. The apply worker immediately decodes and applies these changes to the local table.
- (3) **Second Segment of txid 842**: The subsequent stream segment for txid 842 arrives and is appended to the existing buffer in memory.
- (4) **Commit of txid 842**: Upon receiving the **Stream Commit** message, the apply worker decodes all accumulated changes for txid 842 and replays them sequentially.

In summary, the apply worker processes standard messages immediately while storing streamed segments in a buffer until the commit message triggers the replay of the entire transaction.

### 12.7.2.1. Memory Pressure and Spilling to Disk

The [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM) parameter governs the memory allocated for buffering streamed changes. If the volume of accumulated changes exceeds this limit, the apply worker spills the data to temporary files.

These temporary files are located in the `$PGDATA/base/pgsql_tmp/` directory. The naming conventions are structured as follows:

- **Directory Format**: `$PGDATA/base/pgsql_tmp/pgsql_tmp[PID].[FilesetSerial].fileset/`

- **File Format**: `[SubID]-[txid].changes`

If a subscription with OID *16403* processes a streamed transaction with txid 767 using an apply worker with PID *2212*, the file path is as follows:

```
base/pgsql_tmp/pgsql_tmp2212.0.fileset/16403-767.changes
```

Once the transaction commits or aborts, PostgreSQL automatically removes these temporary files.

## 12.7.3. Parallel Apply Worker Mode (streaming = parallel)

Introduced in version 16, **parallel apply** enhances logical replication performance by allowing multiple transactions to be replayed concurrently on the subscriber. Unlike the standard `streaming = 'on'` mode, which buffers streamed changes until a commit arrives, parallel apply enables assigned workers to begin replaying changes immediately as they are received.

** Note

Parallel apply only applies to *streamed* transactions &mdash; those sent as a sequence of segments rather than as a single message. Therefore, non-streamed transactions are still received and applied directly by the leader apply worker itself, exactly as in `streaming = 'off'` mode; no parallel apply worker is involved in that case.

The architecture and constraints of this mode are summarized below:

- **Leader Apply Worker**: Maintains the connection with the walsender and dispatches parallel apply workers for incoming changes.
- **Parallel Apply Workers**: Launched by the leader apply worker to apply changes concurrently.
- **Worker Limit**: The number of concurrent parallel apply workers is governed by the [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION) parameter.
- **Fallback Mechanism**: If the number of active streamed transactions exceeds the configured limit, the leader apply worker handles additional large transactions by falling back to the *streaming = ‘on’* behavior (buffering to memory or disk).

The following sections illustrate the processing overview of parallel apply workers using several scenarios.

### 12.7.3.1. Replay Sequence in Parallel Mode

Consider the simplest scenario: two transactions, txid 845 and txid 846, are both large transactions that insert many rows into tables tbl_a and tbl_b, respectively. See Figure 12.29.

![](/images/postgres-internals/pgsql12-fig-12-29.webp)

#### Figure 12.29. Transaction replay sequence in parallel apply mode.

As illustrated in Figure 12.29, the processing flow occurs as follows:

- (1) **Arrival Segment of txid 845**: The leader apply worker identifies this as a streamed transaction and launches (or assigns) a parallel apply worker.
- (2) **Immediate Replay**: The leader apply worker dispatches the segment to the parallel apply worker, which immediately starts replaying the changes to the local table.
- (3) **Arrival Segment of txid 846**: The leader apply worker launches (or assigns) a parallel apply worker.
- (4) **Immediate Replay**: The leader apply worker dispatches the segment to another parallel apply worker, which immediately replays the changes to the local table.
- (5) **Arrival Stream Commit of txid 845**: The leader apply worker receives the Stream Commit message for txid 845 and forwards it to the assigned parallel apply worker.
- (6) **Finalization of txid 845**: The parallel apply worker commits the local transaction and returns to a ready state.
- (7) **Leader Waits**: While txid 845’s commit is being finalized, the leader apply worker pauses and does not read further changes &mdash; including txid 846’s Stream Commit message &mdash; from the publisher. Only after txid 845’s commit completes does the leader apply worker resume reading, receive txid 846’s Stream Commit message, and forward it to the parallel apply worker handling txid 846. The reason for this wait is explained in [Section 12.7.3.2](#12-7-3-2) (see also [pa_wait_for_xact_finish()](https://github.com/postgres/postgres/blob/master/src/backend/replication/logical/applyparallelworker.c)).
- (8) **Finalization of txid 846**: The parallel apply worker commits the local transaction and returns to a ready state.

The leader apply worker dynamically manages task distribution based on available system resources:

- If a parallel apply worker is already assigned to the transaction, the leader apply worker forwards the segment to that worker for immediate replay.
- If no worker is assigned and the number of active parallel apply workers is below the [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION) threshold, the leader apply worker launches a new worker and delegates the transaction.
- **Fallback Mechanism**: If the parallel apply worker limit is reached, the leader apply worker reverts to the *streaming = ‘on’* behavior, accumulating incoming segments in memory or on disk until the commit message arrives.

### 12.7.3.2. Avoiding Failures Due to Transaction Dependencies

This subsection explains why the leader apply worker pauses reading and applying further changes while an in-progress transaction’s commit is being finalized.

In non-parallel mode, changes from multiple transactions are serialized on the publisher by MVCC, and the subscriber’s apply worker replays them in that exact order, preventing correctness issues.

In parallel mode, however, separate parallel apply workers apply changes concurrently. Consequently, the transaction order serialized on the publisher is no longer automatically preserved on the subscriber.

To resolve this, the leader apply worker pauses reading new changes while finalizing a commit. The following example illustrates this behavior.

Consider table tbl_a, which is initially empty. Two transactions, txid 851 and txid 852, perform an INSERT and an UPDATE on tbl_a, respectively. See Figure 12.30.

![](/images/postgres-internals/pgsql12-fig-12-30.webp)

#### Figure 12.30. Leader apply worker pausing to preserve transaction order.

On the publisher, txid 851 inserts rows and commits; only then does txid 852 update those rows in tbl_a.

- (1) **Arrival Segment of txid 851**: The leader apply worker receives the segment for txid 851 and forwards it to parallel apply worker 1.
- (2) **Immediate Replay**: Parallel apply worker 1 immediately begins replaying the INSERT changes to the local table.
- (3) **Arrival Commit of txid 851, Leader Pauses**: The leader apply worker receives the Stream Commit message for txid 851, forwards it to parallel apply worker 1, and pauses reading further messages from the publisher until this commit completes.
- (4) **Segment of txid 852 Arrives, But Is Not Read**: While the leader apply worker is paused, the publisher sends the segment for txid 852. The leader apply worker does not retrieve this message yet. As Figure 12.30 illustrates, if the leader apply worker forwarded it immediately and parallel apply worker 2 applied it, the UPDATE would find no matching rows on the subscriber because txid 851’s INSERT is not yet committed and visible.
- (5) **Commit of txid 852 Also Arrives, Still Unread**: The Stream Commit message for txid 852 likewise reaches the subscriber, but remains unread for the same reason.
- (6) **Leader Resumes and Forwards txid 852**: Once parallel apply worker 1 finishes committing txid 851 locally, the leader apply worker resumes reading. It retrieves both the segment and the Stream Commit message for txid 852, forwarding them to parallel apply worker 2.
- (7) **Immediate Replay and Finalization**: Parallel apply worker 2 replays the UPDATE changes and commits, during which the leader apply worker pauses again as in step (3).

By pausing message reception from the moment a commit message is received until local commit finalization, the leader apply worker prevents out-of-order execution and preserves the transaction sequence established on the publisher.

# 12.8. Internal Mechanism of Restart and Crash Recovery

#### Beta Version: Work in progress.

This section provides an overview of Write-Ahead Log (WAL) data management in logical replication. Based on these fundamentals, it then details the sequences for subscriber restarts and crash recovery.

Section Contents

- 12.8.1. WAL Data Management
- 12.8.2. Restart Sequence
- 12.8.3. Recovery Sequence

## 12.8.1. WAL Data Management

Replication progress is managed based on the Log Sequence Number (LSN) of WAL data.

Unlike streaming replication, where the primary and standby share the exact same WAL space, logical replication requires a **mapping** between the publisher’s and subscriber’s WAL spaces. This is because each node utilizes its own independent LSN.

In the PostgreSQL implementation, the subscriber is responsible for this mapping. While the publisher consistently uses its own LSNs, the subscriber maintains a record of the correspondence between its local LSNs and the remote LSNs received from the publisher.

### 12.8.1.1. LSN Management Mechanisms for Publisher and Subscriber

#### Publisher

The publisher manages the *confirmed_flush_lsn* within its replication slot:

- **confirmed_flush_lsn**: This is the LSN up to which the logical slot’s consumer has confirmed data reception. Transactions committed prior to this LSN are no longer available for replication.
- **Storage**: Replication slot information is held in memory and typically persisted to storage during each checkpoint.

#### Subscriber

As mentioned in Section 12.7.1.2, WAL records generated by COMMIT (and ABORT) statements on the subscriber include metadata from the publisher: the *origin_id*, the publisher’s commit LSN (*final_lsn*), and the *commit_timestamp*.

Furthermore, the subscriber maintains the most recent commit LSN mapping in memory:

- **local_lsn**: The LSN of the subscriber’s own commit.
- **remote_lsn**: The publisher’s *final_lsn* corresponding to that commit.
- **Visibility**: These values are visible via the [pg_replication_origin_status](https://www.postgresql.org/docs/current/view-pg-replication-origin-status.html) system view.

Because pg_replication_origin_status is a system view, its state is stored in the `$PGDATA/pg_logical/replorigin_checkpoint` file at every checkpoint.

**Note on Crash Safety**: If the subscriber crashes unexpectedly, the most recent mapping in the `replorigin_checkpoint` file may be lost. However, during the subsequent recovery process, the system automatically reconstructs the latest mapping. The details are described in Section 12.8.3.

### 12.8.1.2. LSN Data Flow in a Normal Sequence

The following example illustrates how LSNs are managed when a publisher executes an INSERT command (see Figure 12.31).

![While this figure illustrates the origin_id and origin_lsn within the COMMIT WAL record written by the subscriber, the precise structure is as follows: In the COMMIT (or ABORT) WAL record, the origin_id is included in the header portion, whereas the origin_commit_lsn (or origin_abort_lsn) and origin_commit_timestamp (or origin_abort_timestamp) are appended to the extended section.](/images/postgres-internals/pgsql12-fig-12-31.webp)

#### Figure 12.31. LSN Mapping Flow during a Normal Transaction.

While this figure illustrates the origin_id and origin_lsn within the COMMIT WAL record written by the subscriber, the precise structure is as follows: In the COMMIT (or ABORT) WAL record, the origin_id is included in the header portion, whereas the origin_commit_lsn (or origin_abort_lsn) and origin_commit_timestamp (or origin_abort_timestamp) are appended to the extended section.

#### Figure 12.31 [1]

The *confirmed_flush_lsn* of the replication slot reflects $\text{LSN}^{P}\_{0}$, confirming that the subscriber has successfully applied and flushed changes from the previous transaction.

The publisher then executes an INSERT (txid=100), where the commit WAL record starts at $\text{LSN}^{P}\_{1}$ and ends at $\text{LSN}^{P}_{2}$.

The pgoutput plugin generates messages containing these LSNs:

- **B (Begin)**: *final_lsn* = $\text{LSN}^{P}\_{1}$
- **C (Commit)**: *commit_lsn* = $\text{LSN}^{P}\_{1}$, *end_lsn* = $\text{LSN}^{P}\_{2}$

#### Figure 12.31 [2]

The subscriber’s memory initially holds *local_lsn* = $\text{LSN}^{S}\_{0}$ and *remote_lsn* = $\text{LSN}^{P}\_{0}$, consistent with the “replorigin_checkpoint” file.

Once the apply worker applies the changes, it writes a commit record to the subscriber’s WAL at $\text{LSN}^{S}\_{1}$. This record includes the *origin_id* and the publisher’s *final_lsn* ($\text{LSN}^{P}\_{1}$). The memory state then updates to *local_lsn* = $\text{LSN}^{S}\_{1}$ and *remote_lsn* = $\text{LSN}^{P}\_{1}$.

Note that the *replorigin_checkpoint* file remains unchanged until the next checkpoint.

#### Figure 12.31 [3]

Upon transaction completion, the subscriber sends an ACK containing *write_lsn*, *flush_lsn*, and *apply_lsn*.

In this scenario, all values are set to $\text{LSN}^{P}\_{1}$. Note that the subscriber returns LSNs relative to the **publisher’s** WAL space.

The publisher then updates its replication slot’s *confirmed_flush_lsn* to $\text{LSN}^{P}\_{1}$ based on this ACK.

## 12.8.2. Restart Sequence

Once logical replication is configured, the publisher and subscriber begin the replication process. If replication stops &mdash; for example, due to a restart of either party &mdash; it resumes automatically. See Figure 12.32.

![](/images/postgres-internals/pgsql12-fig-12-32.webp)

#### Figure 12.32. Logical Replication Restart Sequence.

- (1) **Read Checkpoint**: The subscriber reads the “replorigin_checkpoint” file to initialize *local_lsn* and *remote_lsn*.
- (2) **Launch Worker**: The logical replication launcher starts an apply worker.
- (3) **Connection Request**: The apply worker requests a connection from the publisher.
- (4) **Spawn Walsender**: The publisher’s postmaster spawns a walsender process.
- (5) **Establish Connection**: The apply worker connects to the walsender.
- (6) **Negotiate LSN**: The apply worker and walsender negotiate the starting point using the *remote_lsn*. The subscriber sends the *remote_lsn*, and the walsender begins decoding WAL from that publisher-side position.
- (7) **Resume Replication**: The process resumes from the specified LSN.

## 12.8.3. Recovery Sequence

The recovery sequence describes the process following a subscriber crash.

Unlike a standard restart, the *local_lsn* and *remote_lsn* stored in the “replorigin_checkpoint” file may be obsolete, as they only reflect the state of the last checkpoint. Therefore, the subscriber must scan its WAL data to reconstruct the latest mapping before connecting to the publisher. See Figure 12.33.

![](/images/postgres-internals/pgsql12-fig-12-33.webp)

#### Figure 12.33. Logical Replication Recovery Sequence.

#### [1] Scanning WAL Segments

During standard crash recovery (refer to Section 9.8), the system scans the WAL segments and extracts the *origin_id* and *origin_lsn* from the publisher-originated commit records.

#### [2] Restoring origin status

After recovery is complete, the system restores the most recent *origin_lsn* (the publisher’s commit point) and its corresponding subscriber commit LSN to memory as the new *remote_lsn* and *local_lsn*, respectively. The “replorigin_checkpoint” file is also recovered.

From this point, the system proceeds with the standard restart sequence to reconnect with the publisher.
