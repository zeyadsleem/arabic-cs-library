---
title: "Vacuum Processing"
lang: en
---

# 6.1. Outline of VACUUM Processing

Vacuum processing performs the following tasks for specified tables or all tables in the database:

1. Removing dead tuples Remove dead tuples and defragment live tuples for each page.
2. Remove index tuples that point to dead tuples.
3. Freezing old txids Freeze old txids of tuples if necessary.
4. Update frozen txid related system catalogs (pg_database and pg_class).
5. Remove unnecessary parts of the clog if possible.
6. Others Update the FSM and VM of processed tables.
7. Update several statistics (pg_stat_all_tables, etc.).

This documentation assumes familiarity with the following terms: dead tuples, freezing txid, FSM, and the clog.

Refer to [Chapter 5](/book/postgres-internals/pgsql05/index) for details on these concepts. VM is introduced in Section 6.2.

The following pseudocode describes vacuum processing.

#### Pseudocode: VACUUM

```
       // Phase 1: initializing

(1)    FOR each table
(2)      Acquire a ShareUpdateExclusiveLock lock for the target table

         /* The first block */

         // Phase 2: Scan Heap
(3)      Scan all pages to get all dead tuples, and freeze old tuples if necessary
         // Phase 3: Vacuuming Indexes
(4)      Remove the index tuples that point to the respective dead tuples if exists

         /* The second block */

         // Phase 4: Vacuuming Heap
(5)      FOR each page of the table
(6)         Remove the dead tuples, and Reallocate the live tuples in the page
(7)         Update FSM and VM
         END FOR

         /* The third block */

         // Phase 5: Cleaning up indexes
(8)      Clean up indexes
         // Phase 6: Truncating heap
(9)      Truncate the last page if possible
(10)     Update both the statistics and system catalogs of the target table

         Release the ShareUpdateExclusiveLock lock
      END FOR

      /* Post-processing */

      // Phase 7: Final Cleaning
(11)  Update statistics and system catalogs
(12)  Remove both unnecessary files and pages of the clog if possible
```

- (1) Get each table from the specified tables.
- (2) Acquire a ShareUpdateExclusiveLock for the table. This lock allows concurrent reads from other transactions.
- (3) Scan all pages to collect all dead tuples and freeze old tuples if necessary.
- (4) Remove the index tuples that point to the respective dead tuples if they exist.
- (5) Perform tasks (6) and (7) for each page of the table.
- (6) Remove the dead tuples and reallocate the live tuples in the page.
- (7) Update both the respective FSM and VM of the target table.
- (8) Clean up the indexes using the [index_vacuum_cleanup()](https://github.com/postgres/postgres/blob/306dd6e727bf7a4e76f02cb31c2e22ac3b0deca3/src/backend/access/index/indexam.c#L816) function.
- (9) Truncate the last page if it contains no tuples.
- (10) Update the statistics and system catalogs related to vacuum processing for the target table.
- (11) Update the overall statistics and system catalogs related to vacuum processing.
- (12) Remove unnecessary files and pages of the clog if possible.

PostgreSQL divides the vacuum process into seven distinct phases. For clarity, this documentation explains the process using 3+1 simplified blocks.

The pseudocode illustrates how these seven phases correspond to the 3+1 blocks.

These blocks are outlined below.

** PARALLEL option

The [VACUUM command](https://www.postgresql.org/docs/current/sql-vacuum.html) has supported the PARALLEL option since version 13. If this option is set and multiple indexes exist, the index vacuuming and index cleanup phases are processed in parallel.

This feature applies only to the VACUUM command and is not supported by autovacuum.

** Phases of Vacuum Processing

The phase column in the [pg_stat_progress_vacuum](https://www.postgresql.org/docs/current/progress-reporting.html#VACUUM-PROGRESS-REPORTING) view identifies the current phase of an active vacuum process.

```
testdb=# SELECT datname, relid, phase FROM pg_stat_progress_vacuum;
 datname | relid |     phase
---------+-------+---------------
 testdb  | 16415 | scanning heap
(1 row)
```

## 6.1.1. First Block

This block performs freeze processing and removes index tuples that point to dead tuples.

PostgreSQL first scans the target table to build a list of dead tuples and freeze old tuples. The list is stored in local memory called [maintenance_work_mem](https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-MAINTENANCE-WORK-MEM). Section 6.3 describes freeze processing.

After scanning, PostgreSQL removes index tuples by referring to the dead tuple list. Figure 6.1 shows an example of removing an index tuple that points to a dead tuple.

![](/images/postgres-internals/pgsql06-fig-6-01.webp)

#### Figure 6.1. Vacuuming Indexes.

If maintenance_work_mem becomes full before scanning is complete, PostgreSQL proceeds to the next tasks (steps 4 to 7). It then returns to step (3) to continue the remainder of the scan.

## 6.1.2. Second Block

This block removes dead tuples and updates both the FSM and VM on a page-by-page basis. Figure 6.2 shows an example:

![](/images/postgres-internals/pgsql06-fig-6-02.webp)

#### Figure 6.2. Vacuuming Heap.

Assume the table contains three pages. Focusing on the 0th page, there are three tuples, where Tuple_2 is dead (Figure 6.2(1)). PostgreSQL removes Tuple_2 and reorders the remaining tuples to repair fragmentation. It then updates both the FSM and VM for this page (Figure 6.2(2)). PostgreSQL continues this process until the last page.

Note that unnecessary line pointers are not removed; they are reused in the future. This is because if line pointers are removed, all index tuples of the associated indexes must be updated.

## 6.1.3. Third Block

The third block performs cleanup after index deletion and updates the statistics and system catalogs for each target table.

If the last pages contain no tuples, PostgreSQL truncates them from the table file. Figure 6.3 shows a slightly exaggerated example where the 1st, 3rd, and 4th pages contain no tuples after vacuuming the heap.

![](/images/postgres-internals/pgsql06-fig-6-03.webp)

#### Figure 6.3. Truncating Pages.

During heap truncation, the 4th and 3rd pages are removed from the table file, reducing its size by 16 KB (8 KB $\times$ 2 pages).

Although the 1st page also contains no tuples, it is not removed[1](#fn:1).

## 6.1.4. Post-processing

When vacuum processing is complete, PostgreSQL updates all statistics and system catalogs. It also removes unnecessary parts of the clog if possible (Section 6.4).

** Ring Buffer

Vacuum processing uses a **ring buffer**, described in Section 8.4.3. Therefore, processed pages are not cached in the shared buffers.

1. To remove such internal pages, use REPACK (VACUUM FULL) command as explained in Section 6.6.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 6.2. Visibility Map

Vacuum processing is costly. Therefore, PostgreSQL introduced the Visibility Map (VM) in version 8.4 to reduce this cost.

The basic concept of the VM is simple:

- Each table has an individual visibility map that stores the visibility of each page.
- This visibility determines whether a page contains dead tuples.
- Vacuum processing skips pages without dead tuples by referring to the VM.

Figure 6.4 shows how the VM is used.

![](/images/postgres-internals/pgsql06-fig-6-04.webp)

#### Figure 6.4. How the VM is used.

Suppose a table consists of three pages. If the 0th and 2nd pages contain dead tuples but the 1st page does not, the VM records this status. Vacuum processing then skips the 1st page by referring to the VM.

Each VM consists of one or more 8 KB pages, and the file is stored with the ‘vm’ suffix. For example, a table file with relfilenode 18751 is shown below alongside its FSM (18751_fsm) and VM (18751_vm) files.

```bash
$ cd $PGDATA
$ ls -la base/16384/18751*
-rw------- 1 postgres postgres  8192 Apr 21 10:21 base/16384/18751
-rw------- 1 postgres postgres 24576 Apr 21 10:18 base/16384/18751_fsm
-rw------- 1 postgres postgres  8192 Apr 21 10:18 base/16384/18751_vm
```

## 6.2.1. Enhancement of VM

PostgreSQL enhanced the VM in version 9.6 to improve freeze processing efficiency. The enhanced VM tracks both page visibility and whether all tuples in a page are frozen (refer to Section 6.3.3 for details).

# 6.3. Freeze Processing

Freeze processing, described in Section 5.10.2, has two modes. For convenience, these modes are referred to as **lazy mode** and **eager mode**. PostgreSQL performs the process in either mode depending on certain conditions.

** Note

VACUUM is often called “Lazy VACUUM” internally. However, the lazy mode defined in this documentation is a mode of freeze processing.

Freeze processing typically runs in lazy mode, but eager mode runs when specific conditions are satisfied.

In lazy mode, freeze processing scans only pages that contain dead tuples by using the Visibility Map (VM) of the target table.

In contrast, eager mode scans all pages regardless of whether they contain dead tuples. This mode also updates system catalogs related to freeze processing and removes unnecessary parts of the clog if possible.

Sections 6.3.1 and 6.3.2 describe these modes, respectively. Section 6.3.3 describes improvements to the freeze process in eager mode.

Section Contents

- 6.3.1. Lazy Mode
- 6.3.2. Eager Mode
- 6.3.3. Improving Freeze Processing in Eager Mode

## 6.3.1. Lazy Mode

PostgreSQL calculates the **freezeLimit_txid** at the start of freeze processing and freezes tuples whose t_xmin is less than this value.

The freezeLimit_txid is defined as follows:

$$ \begin{align*} \text{freezeLimit_txid} = (\text{OldestXmin} - \text{vacuum_freeze_min_age}) \end{align*} $$

Where: OldestXmin is the oldest txid among currently running transactions.

For example, if three transactions (txids 100, 101, and 102) are running when the VACUUM command is executed, OldestXmin is 100. If no other transactions exist, OldestXmin is the txid of the transaction executing the VACUUM command. The [vacuum_freeze_min_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE) is a configuration parameter (the default is 50,000,000).

Figure 6.5 shows a specific example. Table_1 consists of three pages, each containing three tuples. When the VACUUM command is executed, the current txid is 50,002,500 and no other transactions exist. In this case, OldestXmin is 50,002,500; thus, the freezeLimit_txid is 2,500. Freeze processing proceeds as follows:

![](/images/postgres-internals/pgsql06-fig-6-05.webp)

#### Figure 6.5. Freezing tuples in lazy mode.

- **0th page:** PostgreSQL freezes all three tuples because their t_xmin values are less than the freezeLimit_txid. In addition, this vacuum process removes Tuple_1 because it is a dead tuple.
- **1st page:** The vacuum process skips this page by referring to the Visibility Map (VM).
- **2nd page:** PostgreSQL freezes Tuple_7 and Tuple_8, and removes Tuple_7.

Before the vacuum process completes, PostgreSQL updates the statistics related to vacuuming, such as n_live_tup, n_dead_tup, last_vacuum, and vacuum_count in [pg_stat_all_tables](https://www.postgresql.org/docs/current/static/monitoring-stats.html#PG-STAT-ALL-TABLES-VIEW%22).

As shown in the above example, lazy mode might not freeze all eligible tuples because it can skip pages.

## 6.3.2. Eager Mode

Eager mode compensates for the limitations of lazy mode. It scans all pages to inspect every tuple in a table, updates the relevant system catalogs, and removes unnecessary files and pages from the clog where possible.

Eager mode is performed when the following condition is satisfied:

$$ \begin{align*} \text{pg_database.datfrozenxid} < (\text{OldestXmin} - \text{vacuum_freeze_table_age}) \end{align*} $$

Where:

- **pg_database.datfrozenxid** represents a column in the [pg_database](https://www.postgresql.org/docs/current/static/catalog-pg-database.html) system catalog and holds the oldest frozen txid for each database.
- [vacuum_freeze_table_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-TABLE-AGE) is a configuration parameter with a default of 150,000,000.

Figure 6.6 shows a specific example:

![](/images/postgres-internals/pgsql06-fig-6-06.webp)

#### Figure 6.6. Freezing old tuples in eager mode. (versions 9.5 or earlier)

Assume that the value of pg_database.datfrozenxid is 1821.

In Table_1, both Tuple_1 and Tuple_7 have been removed, while Tuple_10 and Tuple_11 have been inserted into the second page. When the VACUUM command is executed, the current txid is 150,002,000, and no other concurrent transactions exist. Consequently, OldestXmin is set to 150,002,000, and the freezeLimit_txid becomes 100,002,000.

In this case, the condition is satisfied because:

$$ \begin{align*} 1821 < (150002000 - 150000000) \end{align*} $$

Therefore, the freeze processing performs in eager mode as follows.

- **0th page:** PostgreSQL checks Tuple_2 and Tuple_3 even though all tuples are already frozen.
- **1st page:** PostgreSQL freezes the three tuples in this page because all t_xmin values are less than the freezeLimit_txid. Lazy mode would skips this page.
- **2nd page:** PostgreSQL freezes Tuple_10, but not Tuple_11.

After freezing each table, PostgreSQL updates the **pg_class.relfrozenxid** of the target table. [pg_class](https://www.postgresql.org/docs/current/static/catalog-pg-class.html) is a system catalog, and each pg_class.relfrozenxid column holds the latest frozen txid of the corresponding table.

In this example, Table_1’s pg_class.relfrozenxid is updated to the current freezeLimit_txid (100,002,000). This indicates that all tuples with a t_xmin less than 100,002,000 in Table_1 are frozen.

### 6.3.2.1. Updating pg_database.datfrozenxid

Before the vacuum process completes, PostgreSQL updates **pg_database.datfrozenxid** if necessary, which holds the minimum pg_class.relfrozenxid in the corresponding database.

For example, if only Table_1 is frozen in eager mode, the pg_database.datfrozenxid of the database remains unchanged. This is because the pg_class.relfrozenxid of other relations (other tables and system catalogs visible from the current database) have not changed (Figure 6.7(1)).

If all relations in the current database are frozen in eager mode, pg_database.datfrozenxid is updated because the pg_class.relfrozenxid of all relations in the database are updated to the current freezeLimit_txid (Figure 6.7(2)).

![](/images/postgres-internals/pgsql06-fig-6-07.webp)

#### Figure 6.7. Relationship between pg_database.datfrozenxid and pg_class.relfrozenxid(s).

** How to show pg_class.relfrozenxid and pg_database.datfrozenxid.

The first query below shows the relfrozenxids of all visible relations in the ’testdb’ database.

The second query shows the pg_database.datfrozenxid of the ’testdb’ database.

```
testdb=# VACUUM table_1;
VACUUM
testdb=# SELECT n.nspname as &#34;Schema&#34;, c.relname as &#34;Name&#34;, c.relfrozenxid
             FROM pg_catalog.pg_class c
             LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
             WHERE c.relkind IN ('r','')
                   AND n.nspname <> 'information_schema' AND n.nspname !~ '^pg_toast'
                   AND pg_catalog.pg_table_is_visible(c.oid)
                   ORDER BY c.relfrozenxid::text::bigint DESC;
   Schema   |            Name         | relfrozenxid
------------+-------------------------+--------------
 public     | table_1                 |    100002000
 public     | table_2                 |         1846
 pg_catalog | pg_database             |         1827
 pg_catalog | pg_user_mapping         |         1821
 pg_catalog | pg_largeobject          |         1821

...

 pg_catalog | pg_transform            |         1821
(57 rows)

testdb=# SELECT datname, datfrozenxid FROM pg_database WHERE datname = 'testdb';
 datname | datfrozenxid
---------+--------------
 testdb  |         1821
(1 row)
```

** FREEZE option

The VACUUM command with the FREEZE option forces PostgreSQL to freeze all txids in the specified tables. This occurs in eager mode, but the freezeLimit is set to OldestXmin (not ‘OldestXmin - vacuum_freeze_min_age’).

For example, if txid 5000 executes the VACUUM FULL command and no other transactions are running, OldestXmin is set to 5000, and txids less than 5000 are frozen.

## 6.3.3. Improving Freeze Processing in Eager Mode

Eager mode in versions 9.5 and earlier is inefficient because it always scans all pages. For instance, in the example in Section 6.3.2, the process scans the 0th page even if all tuples in that page are already frozen.

To address this issue, version 9.6 (2016) improved both the VM and the freeze process. As mentioned in Section 6.2.1, the new VM records whether all tuples in each page are frozen. When freeze processing runs in eager mode, the process skips pages that contain only frozen tuples.

Figure 6.8 shows an example. During the freezing of this table, the process skips the 0th page by referring to the VM. After the 1st page is frozen, the associated VM information is updated because all tuples on that page are now frozen.

![](/images/postgres-internals/pgsql06-fig-6-08.webp)

#### Figure 6.8. Freezing old tuples in eager mode (versions 9.6 or later).

# 6.4. Removing Unnecessary Clog Files

The clog, described in Section 5.4, stores transaction statuses. PostgreSQL attempts to remove unnecessary clog files whenever it updates pg_database.datfrozenxid. Note that this process also removes the corresponding clog pages.

Figure 6.9 shows an example of this process. If the minimum pg_database.datfrozenxid exists in the clog file ‘0002’, the system can remove the older files (‘0000’ and ‘0001’). This is possible because all transactions in those files are treated as frozen txids across the entire database cluster.

![](/images/postgres-internals/pgsql06-fig-6-09.webp)

#### Figure 6.9. Removing unnecessary clog files and pages.

** pg_database.datfrozenxid and the clog file

The following shows the actual output of pg_database.datfrozenxid and the clog files:

```bash
$ psql testdb -c &#34;SELECT datname, datfrozenxid FROM pg_database&#34;
  datname  | datfrozenxid
-----------+--------------
 template1 |      7308883
 template0 |      7556347
 postgres  |      7339732
 testdb    |      7506298
(4 rows)
```

```bash
$ ls -la -h data/pg_xact/	# In versions 9.6 or earlier, &#34;ls -la -h data/pg_clog/&#34;
total 316K
drwx------  2 postgres postgres   28 Dec 29 17:15 .
drwx------ 20 postgres postgres 4.0K Dec 29 17:13 ..
-rw-------  1 postgres postgres 256K Dec 29 17:15 0006
-rw-------  1 postgres postgres  56K Dec 29 17:15 0007
```

# 6.5. Autovacuum Daemon

PostgreSQL automates vacuum processing using the autovacuum daemon. This automation greatly simplifies database maintenance.

The autovacuum daemon periodically invokes several autovacuum_worker processes. By default, the daemon wakes every 1 minute (defined by [autovacuum_naptime](https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-NAPTIME)) and starts three workers (defined by [autovacuum_max_works](https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-MAX-WORKERS)).

These workers perform vacuum processing concurrently for their respective tables. This activity occurs gradually to ensure minimal impact on database performance.

Section Contents

- 6.5.1. Conditions for autovacuum to run
- 6.5.2. Maintenance tips

## 6.5.1. Conditions for autovacuum to run

Autovacuum runs for a target table if any of the following conditions are satisfied:

### 6.5.1.1. Condition 1

The current txid exceeds the following threshold:

$$ \begin{align*} \text{relfrozenxid} + \text{autovacuum_freeze_max_age} \end{align*} $$

Where:

- **relfrozenxid** is the value defined for the target table in [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html).
- [autovacuum_freeze_max_age](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-FREEZE-MAX-AGE) is a configuration parameter (default: 200,000,000).

When this condition is met, autovacuum performs freeze processing for the target table.

### 6.5.1.2. Condition 2

The number of dead tuples exceeds the following threshold:

$$ \begin{align*} \text{autovacuum_vacuum_threshold} + \text{autovacuum_vacuum_scale_factor} \times \text{reltuples} \end{align*} $$

Where:

- [autovacuum_vacuum_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-THRESHOLD) (default: 50) and [autovacuum_vacuum_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR) (default: 0.2) are configuration parameters.
- **reltuples** is the total number of tuples in the target table.

For example, if a table has 10,000 tuples and 2,100 dead tuples, autovacuum runs because:

$$ \begin{align*} 2100 > 50 + 0.2 \times 10000. \end{align*} $$

### 6.5.1.3. Condition 3 (version 13 or later)

The number of inserted tuples in the target table exceeds the following threshold:

$$ \text{autovacuum_vacuum_insert_threshold} + \text{autovacuum_vacuum_insert_scale_factor} \times \text{reltuples} $$

Where:

- [autovacuum_vacuum_insert_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD) (default: 1000) and [autovacuum_vacuum_insert_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD) (default: 0.2) are configuration parameters.
- **reltuples** is the number of tuples in the target table.

For example, if a table has 10,000 tuples and 3,010 inserted tuples, autovacuum runs because:

$$ \begin{align*} 3010 > 1000 + 0.2 \times 10000. \end{align*} $$

This condition was added in version 13.

### 6.5.1.4. Condition 4

Autovacuum also performs analyze processing if the following condition is satisfied:

$$ \begin{align*} \text{mod_since_analyze} > \text{autovacuum_analyze_threshold} + \text{autovacuum_analyze_scale_factor} \times \text{reltuples} \end{align*} $$

Where:

- **mod_since_analyze** is the number of modified tuples (via INSERT, DELETE, or UPDATE) since the previous analyze operation.
- [autovacuum_analyze_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-THRESHOLD) (default: 50) and [autovacuum_analyze_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-SCALE-FACTOR) (default: 0.1) are configuration parameters.
- **reltuples** is the number of tuples in the target table.

For example, if a table has 10,000 tuples and 1,100 modified tuples since the last analyze, autovacuum runs because:

$$ \begin{align*} 1100 > 50 + 0.1 \times 10000. \end{align*} $$ ** Info

The [relation_needs_vacanalyze()](https://github.com/postgres/postgres/blob/master/src/backend/postmaster/autovacuum.c) function determines whether target tables require vacuum or analyze operations.

## 6.5.2. Maintenance tips

As frequently mentioned, table bloat is a significant challenge in managing PostgreSQL. Several factors cause this problem, and Autovacuum is one of them.

Autovacuum runs when the number of dead tuples exceeds specific thresholds: 250 for a table with 1,000 rows, 20,050 for 100,000 rows, and 20,000,050 for 100,000,000 rows. These examples show that Autovacuum runs less frequently as the number of tuples in a table increases.

A common tip is to reduce the [autovacuum_vacuum_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR) value. The default value (0.2) is often too large for large tables.

PostgreSQL can set an appropriate *autovacuum_vacuum_scale_factor* for each table using the [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html). The following example sets the new value for the pgbench_accounts table:

```sql
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_scale_factor = 0.05);
ALTER TABLE
```

Specific settings can ensure that Autovacuum runs independently of the total number of tuples.

For instance, if vacuuming is required whenever dead tuples reach 50,000, the following storage parameters can be configured. With these settings, Autovacuum triggers vacuuming each time the 10,000 dead tuple threshold is reached:

```sql
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_threshold = 50000);
ALTER TABLE
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_scale_factor = 0.0);
ALTER TABLE
```

# 6.6. Reclaiming Bloated Space

The VACUUM command removes dead tuples and prevents transaction ID wraparound. However, it cannot reclaim disk space caused by **table bloat**.

Table bloat is a condition in which the physical size of a table does not decrease even after dead tuples are removed. Figure 6.10 shows an extreme example.

![](/images/postgres-internals/pgsql06-fig-6-10.webp)

#### Figure 6.10. Table bloat remains after VACUUM.

Suppose a table consists of three pages, and each page contains six tuples. The following commands delete most tuples and then remove the resulting dead tuples:

```
testdb=# DELETE FROM tbl WHERE id % 6 != 0;
testdb=# VACUUM tbl;
```

The VACUUM command removes the dead tuples, but the table size remains unchanged. As a result, the relation file still occupies three pages, even though only three live tuples remain.

In general, this issue occurs when a large volume of dead tuples is generated.

Until version 18, the only built-in solution was to rebuild the relation files and indexes using either CLUSTER or VACUUM FULL. Both commands acquire ACCESS EXCLUSIVE locks on the entire table during execution, blocking all operations while rebuilding. This disrupts operations if the reconstruction takes a long time.

PostgreSQL 19 (2026) introduced the REPACK command (not the pg_repack extension). Both VACUUM FULL and CLUSTER now use the same underlying implementation. Furthermore, a CONCURRENTLY mode was added to acquire the ACCESS EXCLUSIVE lock only during file switching, enabling table reconstruction with higher online availability than before.

| PostgreSQL Version | ACCESS EXCLUSIVE Lock | Mostly Online |
| --- | --- | --- |
| 18 or earlier | VACUUM FULL CLUSTER | N/A |
| 19 or later | REPACK REPACK USING INDEX (CLUSTER equivalent) | REPACK CONCURRENTLY REPACK CONCURRENTLY USING INDEX |

The following sections describe REPACK (the replacement for VACUUM FULL) and REPACK CONCURRENTLY.

Section Contents

- 6.6.1. REPACK (VACUUM FULL)
- 6.6.2. REPACK CONCURRENTLY

** Note

REPACK CONCURRENTLY utilizes the **WAL decoding** mechanism used in logical replication.

Therefore, readers who are not familiar with **WAL** or **logical replication** are advised to read [Chapter 9](/book/postgres-internals/pgsql09/index) and [Chapter 12](/book/postgres-internals/pgsql12/index) before returning to this section.

## 6.6.1. REPACK (VACUUM FULL)

The REPACK (VACUUM FULL) command uses a simple strategy that recreates a new physical table file under an exclusive lock. Figure 6.11 outlines this command.

![To simplify, index files are omitted.](/images/postgres-internals/pgsql06-fig-6-11.webp)

#### Figure 6.11. Outline of REPACK (VACUUM FULL) processing.

To simplify, index files are omitted.

- (1) **Create a new table file:** When the REPACK command is executed, PostgreSQL creates a new 8 KB table file and acquires AccessExclusiveLock on both the new and old tables. The locks prevent other operations from accessing the tables.
- (2) **Copy live tuples to the new table:** PostgreSQL copies only live tuples from the old table file to the new table.
- (3) **Remove the old file and rebuild associated structures:** After copying all live tuples, PostgreSQL removes the old file. It then rebuilds all associated indexes and updates the FSM, VM, statistics, and system catalogs.

The pseudocode for REPACK (VACUUM FULL) is shown below:

#### Pseudocode: REPACK (VACUUM FULL)

```
(1)  FOR each table
(2)     Acquire AccessExclusiveLock lock for the (old) table
(3)     Create a new table file with AccessExclusiveLock
(4)     FOR each live tuple in the old table
(5)        Copy the live tuple to the new table file
(6)        Freeze the tuple IF necessary
        END FOR
(7)     Remove the old table file (after releasing the exclusive lock)
(8)     Rebuild all indexes
(9)     Update FSM and VM
(10)    Update statistics
        Release AccessExclusiveLock lock for the new table
     END FOR
(11) Remove unnecessary clog files and pages if possible
```

Consider two points when using the REPACK (VACUUM FULL) command:

1. No operations can access (read or write) the table during the process.
2. The process temporarily uses up to twice the disk space of the table. Therefore, check the remaining disk capacity before processing a large table.

## 6.6.2. REPACK CONCURRENTLY

The **CONCURRENTLY** option, introduced in version 19, allows concurrent searches and updates on the target table during space reclamation, except for a brief AccessExclusiveLock during the final phase.

The basic implementation strategy matches the standard REPACK by creating a new table and copying live tuples from the old table. However, the CONCURRENTLY option introduces the following internal processes:

- At the start of the REPACK process, an MVCC snapshot is taken.
- The backend copies only the live tuples visible to this snapshot to the new table.
- Changes that occur during the copying process are subsequently applied to the new table.

To capture changes during copying, the REPACK command utilizes the WAL decoding mechanism used in logical replication. It performs as follows:

- The backend executing REPACK starts a background worker called repack_decoding_worker. The worker decodes WAL records generated by concurrent transactions, extracts the changes made to the target table, and writes them to a temporary **BufFile** (implemented in [buffile.c](https://github.com/postgres/postgres/blob/master/src/backend/storage/file/buffile.c)).

The REPACK backend reads the change elements from the BufFile and applies them to the new table.

This mechanism works as long as the configuration parameter *wal_level* is set to “replica” or higher. The target table must have a *REPLICA IDENTITY* (“DEFAULT” or “USING INDEX”) configured.

Note that the CONCURRENTLY option cannot be used for the following tables:

- Partitioned tables
- UNLOGGED tables
- TOAST tables
- Tables without a REPLICA IDENTITY (“DEFAULT” or “USING INDEX”)
- System catalogs

### 6.6.2.1. Capturing and Applying Concurrent Changes

The repack_decoding_worker starts every time the REPACK CONCURRENTLY command is executed and terminates once the process finishes.

This worker decodes WAL records starting from the LSN when the snapshot was taken. It extracts only the changes made to the target table and passes them to the REPACK backend via a BufFile.

To simplify the explanation, locking operations are omitted here, focusing instead on the flow of WAL decoding and applying changes.

Assume that the target table *tbl* is defined as follows:

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

In this example, the REPLICA IDENTITY is the primary key: “tbl_pkey”.

Figure 6.12 illustrates a conceptual two-phase REPACK CONCURRENTLY process (the actual implementation consists of three phases, as explained in the next section).

![To simplify, the old index file is omitted.](/images/postgres-internals/pgsql06-fig-6-12.webp)

#### Figure 6.12. Overview of REPACK CONCURRENTLY.

To simplify, the old index file is omitted.

**Phase 1: Copy Tuples**

- (1) backend_1 (which executes the REPACK command) creates a repack_decoding_worker process.
- (2) The repack_decoding_worker initiates a transaction and shares its precise snapshot with backend_1 to ensure consistency.
- (3) backend_1 creates a new table file.
- (4) backend_2 inserts Tuple_B into the old table. This operation adds Tuple_B to the old table and generates a corresponding WAL record.
- (5) backend_1 copies live tuples (such as Tuple_A) from the old table to the new table using the acquired snapshot. At this point, Tuple_B is invisible to the snapshot, so it is not copied.

**Phase 2: Apply Changes**

- (6) After completing the copy, backend_1 builds all associated indexes for the new table. In this example, only Tuple_A is initially reflected in the new index.
- (7) backend_1 executes XLogFlush() to ensure that the WAL generated in Phase 1 is persisted.
- (8) The repack_decoding_worker decodes the WAL records generated during Phase 1 and outputs the changes (in this example, “INSERT Tuple_B”) to the BufFile.
- (9) backend_1 reads the BufFile and applies the changes to the new table. Here, Tuple_B is inserted into the new table using the normal INSERT path. As a result, all indexes on the new table are updated automatically by PostgreSQL’s regular index maintenance mechanism.

By applying changes afterwards, the table can be rebuilt while still allowing concurrent user searches and updates.

### 6.6.2.2. Three Phases of REPACK CONCURRENTLY

This subsection describes the process according to the actual implementation.

To focus on the types of locks held during each phase, internal backend interactions and the repack_decoding_worker details are omitted here.

As shown in Figure 6.13, the implementation applies changes twice to minimize the operational blockages caused by the AccessExclusiveLock.

![To simplify, the old index file is omitted.](/images/postgres-internals/pgsql06-fig-6-13.webp)

#### Figure 6.13. Three phases of REPACK CONCURRENTLY.

To simplify, the old index file is omitted.

This approach rests on the assumption that the volume of concurrent changes generated during Phase 2 will be relatively small. This allows Phase 3 &mdash; which applies the remaining changes and performs the final switchover under the strict lock &mdash; to complete quickly.

When the REPACK command runs with the CONCURRENTLY option, the repack_decoding_worker starts, and the following processing takes place:

- **Phase 1: Copy Tuples** Live tuples are copied in the same manner as described in the previous section. During this phase, the REPACK backend holds a ShareUpdateExclusiveLock on the old table and an AccessExclusiveLock on the new table.
- **Phase 2: Apply Changes for Phase 1** Changes that occurred during Phase 1 are applied to the new table. The locks held are identical to those in Phase 1. During this phase, updates and inserts by other backends may still occur. In this example, Tuple_X is updated to Tuple_Z.
- **Phase 3: Apply Changes for Phase 2** An AccessExclusiveLock is acquired on the old table to prevent further updates to it. With no additional changes occurring, the changes accumulated during Phase 2 are applied to the new table.

After this, the repack_decoding_worker terminates. Similar to the standard REPACK (VACUUM FULL), the old and new tables/indexes are swapped, the old table/index files are removed, and the FSM, VM, and statistics are updated.

As shown in this example, applying concurrent changes during Phases 2 and 3 may generate new dead tuples in the new table file. Therefore, unlike the non-concurrent implementation, REPACK CONCURRENTLY cannot guarantee a completely dead-tuple-free table.
