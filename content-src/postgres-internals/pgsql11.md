---
title: "Streaming Replication"
lang: en
---

# 11.1. Starting the Streaming Replication

In streaming replication, three types of processes work cooperatively:

- A **walsender** process on the primary server sends WAL data to the standby server.
- A **walreceiver** process on the standby server receives and replays the WAL data.
- A **startup** process on the standby server starts the walreceiver process.

The walsender and walreceiver communicate using a single TCP connection.

The startup sequence of streaming replication is shown in Figure 11.1:

![](/images/postgres-internals/pgsql11-fig-11-01.webp)

#### Figure 11.1. SR startup sequence.

- (1) Start the primary and standby servers.
- (2) The standby server starts the startup process.
- (3) The standby server starts a walreceiver process.
- (4) The walreceiver sends a connection request to the primary server. If the primary server is not running, the walreceiver sends these requests periodically.
- (5) When the primary server receives a connection request, it starts a walsender process. A TCP connection is then established between the walsender and walreceiver.
- (6) The walreceiver sends the latest LSN (Log Sequence Number) of the standby’s database cluster. This exchange is known as **handshaking**.
- (7) If the standby’s latest LSN is less than the primary’s latest LSN (Standby’s LSN < Primary’s LSN), the walsender sends WAL data from the former LSN to the latter LSN. Primary’s pg_wal subdirectory (or pg_xlog in versions 9.6 or earlier) provides these WAL segments. The standby server then replays the received WAL data. In this phase, the standby catches up with the primary, which is called **catch-up**.
- (8) Streaming Replication begins to work.

Each walsender process maintains a state corresponding to the working phase of the connected walreceiver or application. The possible states of a walsender process are:

- **start-up** - From the start of the walsender to the end of handshaking. See Figures 11.1(5)-(6).
- **catch-up** - During the catch-up phase. See Figure 11.1(7).
- **streaming** - While Streaming Replication is working. See Figure 11.1(8).
- **backup** - While sending the files of the whole database cluster for backup tools such as the [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html) utility.

The [pg_stat_replication](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-REPLICATION-VIEW) view shows the state of all running walsenders. An example is shown below:

```
testdb=# SELECT application_name,state FROM pg_stat_replication;
 application_name |   state
------------------+-----------
 standby1         | streaming
 standby2         | streaming
 pg_basebackup    | backup
(3 rows)
```

As shown above, two walsenders are running to send WAL data for the connected standby servers, and another one is running to send all files of the database cluster for the [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html) utility.

## 11.1.1. What Happens When a Standby Server Restarts After a Long Downtime?

In versions 9.3 or earlier, the standby cannot catch up with the primary server if the required WAL segments have already been recycled on the primary.

No reliable solution exists for this problem other than setting a large value for the configuration parameter [wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-KEEP-SIZE) (or wal_keep_segments in versions 12 or earlier). This parameter reduces the possibility of occurrence but remains a stopgap solution.

In versions 9.4 or later, **replication slots** can prevent this problem. A replication slot is a feature that expands the flexibility of WAL data sending. Refer to Section 11.4 for details.

# 11.2. How to Conduct Streaming Replication

Streaming replication comprises two primary aspects: log shipping and database synchronization.

- **Log shipping:** This is the core mechanism in which the primary server continuously transmits WAL data to connected standby servers as it is written.
- **Database synchronization:** This is specific to synchronous replication, where the primary server coordinates with each standby server to ensure their database clusters remain synchronized.

Accurately understanding streaming replication requires knowing how one primary server manages multiple standby servers. This section starts with a simple case (a single-primary single-standby system) before discussing the general case (single-primary multi-standby system) in the next section.

Section Contents

- 11.2.1. Communication Between a Primary and a Synchronous Standby
- 11.2.2. Detecting Failures of Standby Servers
- 11.2.3. Handling Failures in Synchronous Replication
- 11.2.4. Conflicts

## 11.2.1. Communication Between a Primary and a Synchronous Standby

Assume the standby server is in synchronous replication mode, the [hot_standby](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY) parameter is disabled, and [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) is set to ‘*replica*’. The primary server configuration is as follows:

```
synchronous_standby_names = 'standby1'
hot_standby = off
wal_level = replica
```

Among the three triggers to write WAL data mentioned in Section 9.5, this section focuses on transaction commits.

Suppose one backend process on the primary server issues a simple INSERT statement in autocommit mode. The backend starts a transaction, issues the statement, and commits immediately. Figure 11.2 shows the sequence of this commit action:

![](/images/postgres-internals/pgsql11-fig-11-02.webp)

#### Figure 11.2. Streaming Replication's communication sequence diagram.

- (1) The backend process writes and flushes WAL data to a WAL segment file by executing XLogInsert() and XLogFlush().
- (2) The walsender process sends the WAL data from the WAL segment to the walreceiver process.
- (3) After sending the data, the backend process waits for an ACK response from the standby server. Specifically, the backend process obtains a latch via the internal function SyncRepWaitForLSN() and waits for its release.
- (4) The walreceiver on the standby server writes the received WAL data into the standby’s WAL segment using the write() system call and returns an ACK response to the walsender.
- (5) The walreceiver flushes the WAL data to the WAL segment using fsync(), returns another ACK response to the walsender, and informs the startup process that the WAL data has been updated.
- (6) The startup process replays the WAL data written to the WAL segment.
- (7) The walsender releases the backend process latch upon receiving the ACK response from the walreceiver. The backend process then completes the commit or abort action. The timing for this release depends on the [synchronous_commit](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT) parameter: If set to ‘on’ (default), the latch is released when the ACK from step (5) is received.
- If set to ‘remote_write’, the latch is released when the ACK from step (4) is received.

Each ACK response informs the primary server of the standby’s internal status. It contains four items:

- The LSN location where the latest WAL data has been written.
- The LSN location where the latest WAL data has been flushed.
- The LSN location where the latest WAL data has been replayed by the startup process.
- The timestamp when the response was sent.

** ** XLogWalRcvSendReply

```
XLogWalRcvSendReply(void)@src/backend/replication/walreceiver.c
	/* Construct a new message */
	writePtr = LogstreamResult.Write;
	flushPtr = LogstreamResult.Flush;
	applyPtr = GetXLogReplayRecPtr(NULL);

	resetStringInfo(&reply_message);
	pq_sendbyte(&reply_message, 'r');
	pq_sendint64(&reply_message, writePtr);
	pq_sendint64(&reply_message, flushPtr);
	pq_sendint64(&reply_message, applyPtr);
	pq_sendint64(&reply_message, GetCurrentTimestamp());
	pq_sendbyte(&reply_message, requestReply ? 1 : 0);
```

The walreceiver returns ACK responses when WAL data is written or flushed, and periodically as a heartbeat. Consequently, the primary server always maintains an accurate status for all connected standby servers.

The following query displays the LSN-related information of connected standby servers:

```
testdb=# SELECT application_name AS host,
        write_location AS write_LSN, flush_location AS flush_LSN,
        replay_location AS replay_LSN FROM pg_stat_replication;

   host   | write_lsn | flush_lsn | replay_lsn
----------+-----------+-----------+------------
 standby1 | 0/5000280 | 0/5000280 | 0/5000280
 standby2 | 0/5000280 | 0/5000280 | 0/5000280
(2 rows)
```

** Info

The heartbeat interval is set by the [wal_receiver_status_interval](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-RECEIVER-STATUS-INTERVAL) parameter (default: 10 seconds).

## 11.2.2. Detecting Failures of Standby Servers

Streaming replication uses two common failure detection procedures:

1. **Failure detection of standby server process**: The primary server *immediately* determines a failure if it detects a connection drop between the walsender and walreceiver.
2. The primary server also *immediately* determines a failure if a low-level network function returns an error while accessing the walreceiver socket.
3. **Failure detection of hardware and networks**: The primary server determines a failure if a walreceiver does not respond within the [wal_sender_timeout](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-SENDER-TIMEOUT) period (default: 60 seconds).
4. Confirming a standby’s failure can take up to *wal_sender_timeout* seconds if the standby cannot send responses due to hardware or network failures.

Failure detection is not always immediate and may involve a time lag depending on the cause of the failure.

## 11.2.3. Handling Failures in Synchronous Replication

The behavior of the primary server is critical when a synchronous standby server fails.

If the standby fails and stops returning ACK responses, the primary server waits for those responses indefinitely. Because streaming replication lacks a mechanism to automatically revert to asynchronous mode after a timeout, all primary server operations &mdash; including transaction commits and subsequent query processing &mdash; stop until the failure is detected and resolved.

To avoid a complete halt of primary operations, consider the following strategies:

**Increase availability:** Use multiple standby servers so the primary can continue operating if one fails. **Manual failover to asynchronous mode:** If a permanent failure is detected, the mode can be switched from synchronous to asynchronous by performing the following steps: Set the parameter [synchronous_standby_names](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-SYNCHRONOUS-STANDBY-NAMES) to an empty string.

```
synchronous_standby_names = ''
```

Execute the pg_ctl command with the *reload* option.

```bash
$ pg_ctl -D $PGDATA reload
```

This procedure does not affect connected clients. The primary server continues to process transactions, and all sessions between clients and their backend processes are maintained.

## 11.2.4. Conflicts

In streaming replication, standbys can execute SELECT commands independently of the primary server. However, conflicts can arise between the standby and the primary server under certain conditions, potentially leading to errors.

Figure 11.3 shows a typical example: the primary server drops a table that the standby server is selecting.

![](/images/postgres-internals/pgsql11-fig-11-03.webp)

#### Figure 11.3. Conflict caused by DROP TABLE.

- (1) The standby server selects a table.
- (2) The primary server drops the table that the standby server is currently selecting.
- (3) The primary server sends XLOG records related to the DROP TABLE command.
- (4) The standby server suspends replaying the WAL data for the DROP TABLE command for 30 seconds by default (configurable with [max_standby_archive_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-ARCHIVE-DELAY) or [max_standby_streaming_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-STREAMING-DELAY)).
- (5) If the conflict is not resolved within the specified time (i.e., the SELECT command does not complete), the SELECT command returns an error and terminates.

- Primary

```
testdb=# -- Primary

testdb=# DROP TABLE tbl;
DROP TABLE

testdb=#
```

- Standby

```
testdb=# -- Standby
testdb=# SELECT count(*) FROM tbl;

ERROR:  canceling statement due to conflict with recovery
DETAIL:  User was holding a relation lock for too long.
```

The cause of this conflict is the WAL data generated by the **Access Exclusive Lock** acquired internally by the DROP TABLE command on the primary[1](#fn:1). This WAL data conflicts with the standby’s SELECT command. (As described in Section 9.5.1, WAL data includes not only changes to data but also lock information.)

According to the [official documentation](https://www.postgresql.org/docs/current/hot-standby.html#HOT-STANDBY-CONFLICT), the causes of conflicts fall into three types:

1. **Access Exclusive Locks on the primary server**: These conflict with any lock on the standby. Refer to the [official documentation](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-TABLES) for commands that acquire these locks, such as LOCK IN ACCESS EXCLUSIVE MODE, DROP TABLE, TRUNCATE, REINDEX, and VACUUM FULL.
2. **Dropping databases or tablespaces**.
3. **Applying a vacuum cleanup record from WAL**: This occurs if standby transactions can still see rows being removed or if queries are accessing the affected page.

Here is another example: the primary server deletes rows and performs the VACUUM command on a table being selected by the standby.

- Primary

```sql
testdb=# -- Primary

testdb=# DELETE FROM FROM tbl
testdb-#      WHERE data > 100000;
DELETE 1050

testdb=# VACUUM tbl;
VACUUM

testdb=#
```

- Standby

```
testdb=# -- Standby
testdb=# SELECT count(*) FROM tbl;

ERROR:  canceling statement due to conflict with recovery
DETAIL:  User query might have needed to see row versions that must be removed.
```

Conflicts caused by VACUUM processing are particularly troublesome because they occur during both explicit VACUUM commands and autovacuum operations (described in Section 6.5).

### 11.2.4.1. Mitigating Conflicts Caused by Locking

On standby servers, increasing the values of [max_standby_archive_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-ARCHIVE-DELAY) and [max_standby_streaming_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-STREAMING-DELAY) (default: 30 seconds) mitigates conflicts. These settings allow the standby to delay replaying WAL data, reducing the likelihood of errors.

However, these parameters cannot always eliminate conflicts.

Additionally, they affect other backends on the standby by preventing them from accessing the latest data during the delay. Consequently, the standby server is not fully synchronous during such conflicts.

Administrators must configure these parameters while carefully considering these operational trade-offs.

### 11.2.4.2. Avoiding Conflicts Caused by Vacuum Processing

On the primary server, setting the [hot_standby_feedback](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY-FEEDBACK) parameter (default: off) to “on” avoids vacuum-induced conflicts. Based on the standby’s state, the primary delays deleting data that the standby still needs.

The standby sends its state to the primary at intervals defined by [wal_receiver_status_interval](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-RECEIVER-STATUS-INTERVAL) (default: 10 seconds).

While *hot_standby_feedback* resolves vacuum conflicts, it has drawbacks for the primary server:

- **Table and Index Bloat**: Retaining old tuples visible to the standby prevents vacuuming, which increases table and index bloat on the primary.
- **WAL Accumulation Issues:** Accumulating additional data for standby consistency can increase WAL usage.

** pg_stat_database_conflicts

Querying the [pg_stat_database_conflicts](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-DATABASE-CONFLICTS-VIEW) view on a standby server displays the causes and number of conflicts:

```
testdb=# -- Standby
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_stat_database_conflicts WHERE datname = 'testdb';
-[ RECORD 1 ]------------+-------
datid                    | 16384
datname                  | testdb
confl_tablespace         | 0
confl_lock               | 1
confl_snapshot           | 1
confl_bufferpin          | 0
confl_deadlock           | 0
confl_active_logicalslot | 0
```

** Historical Information

Until version 15, the [vacuum_defer_cleanup_age](https://www.postgresql.org/docs/14/runtime-config-replication.html#GUC-VACUUM-DEFER-CLEANUP-AGE) parameter supported deferring the deletion of dead tuples. If set to a positive number, vacuum operations deferred deleting dead tuples for the specified number of transactions.

This parameter was removed in version 16 because it could not always eliminate conflicts.

Using [hot_standby_feedback](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY-FEEDBACK) and Replication Slots (described in Section 11.4) manages conflicts more effectively.

1. This conflict state is an intentional design feature provided to grant a grace period that prevents immediate query errors on the standby. When the primary drops objects currently accessed by the standby, streaming replication enters this conflict state. To notify standbys of this state, PostgreSQL records the acquisition of Access Exclusive Locks in XLOG. Note that these records are created specifically for replication rather than standard recovery. Consequently, PostgreSQL does not create them if wal_level is set to minimal.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 11.3. Managing Multiple-Standby Servers

This section describes how streaming replication works with multiple standby servers.

Section Contents

- 11.3.1. Replication Priority and Synchronous States
- 11.3.2. How the Primary Manages Multiple-standbys
- 11.3.3. Behavior When a Failure Occurs

## 11.3.1. Replication Priority and Synchronous States

The primary server classifies each standby server based on its role and reliability to manage multiple standbys efficiently in a synchronous replication environment. This classification depends on two internal attributes: **sync_priority** and **sync_state**.

The primary server assigns these attributes to all managed standby servers and treats each server according to these values. The primary performs this assignment even if it manages only one standby server.

### 11.3.1.1. sync_priority

The sync_priority attribute indicates the priority of a standby server in synchronous mode.

A lower value represents a higher priority. The special value 0 means the standby server is in asynchronous mode.

The primary server assigns priorities based on the order listed in the [synchronous_standby_names](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-SYNCHRONOUS-STANDBY-NAMES) parameter.

For example, in the following configuration, the priorities of standby1 and standby2 are 1 and 2, respectively.

```
synchronous_standby_names = 'standby1, standby2'
```

Standby servers not listed in this parameter operate in asynchronous mode with a priority of 0.

### 11.3.1.2. sync_state

The *sync_state* attribute indicates the current state of the standby server. It can be one of the following:

- **sync:** The standby server is in synchronous mode and is the highest-priority standby server currently working.
- **potential:** The standby server is in synchronous mode and is a lower-priority standby server. If the current *sync* standby fails, this server is promoted to the *sync* state.
- **async:** The standby server is in asynchronous mode. It never enters *sync* or *potential* states.
- **quorum:** The standby servers operate in quorum mode. See Section 11.3.2.1 for details.

Issuing the following query displays the priority and state of the standby servers:

```
testdb=# SELECT application_name AS host,
         sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby1 |             1 | sync
 standby2 |             2 | potential
(2 rows)
```

## 11.3.2. How the Primary Manages Multiple-standbys

The primary server waits for ACK responses from the synchronous standby server alone. It confirms only the synchronous standby’s writing and flushing of WAL data. Streaming replication, therefore, ensures that only the synchronous standby remains in a consistent and synchronous state with the primary.

Figure 11.4 shows a case where the ACK response from the potential standby arrives earlier than that from the primary (sync) standby.

![](/images/postgres-internals/pgsql11-fig-11-04.webp)

#### Figure 11.4. Managing multiple standby servers.

- (1) The primary’s backend process continues to wait for an ACK response from the synchronous standby server, even after receiving an ACK from the potential standby.
- (2) After receiving the ACK from the synchronous standby, the backend process releases the latch and completes the transaction.

In the opposite case (the sync standby’s ACK returns before the potential’s), the primary server immediately completes the commit without verifying if the potential standby has written or flushed WAL data.

### 11.3.2.1. Quorum-Based Synchronous Replication

PostgreSQL 9.6 (2016) introduced quorum-based synchronous replication. This feature allows transactions to be considered committed once a subset (a quorum) of synchronous standby servers acknowledges them.

Quorum-based synchronous replication has two modes: ANY and FIRST.

#### ANY Mode

The format of synchronous_standby_names for ANY mode is:

```
ANY num_sync ( standby_name [, ...] )
```

In ANY mode, the primary server completes the commit of the current transaction once any ’num_sync’ standby servers in the list return ACK responses.

For example, the following setting allows the commit as soon as any two standby servers return responses:

```
synchronous_standby_names = 'ANY 2 (standby1, standby2, standby3)'
```

Figure 11.5 illustrates the behavior of the ANY Mode setting:

![](/images/postgres-internals/pgsql11-fig-11-05.webp)

#### Figure 11.5. Behavior of the ANY Mode Setting.

The state of *sync_priority* and *sync_state* for this setting is:

```
testdb=# SELECT application_name AS host,
        sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby1 |             1 | quorum
 standby2 |             1 | quorum
 standby3 |             1 | quorum
(3 rows)
```

#### FIRST Mode

The format of synchronous_standby_names for FIRST mode is:

```json
[FIRST] num_sync ( standby_name [, ...] )
```

In FIRST mode, the primary server completes the commit after the first ’num_sync’ standby servers in the list return ACK responses.

For example, the following setting causes the primary to wait until standby1 and standby2 return ACKs, even if standby3 responds earlier:

```
synchronous_standby_names = 'FIRST 2 (standby1, standby2, standby3)'
```

Figure 11.6 illustrates the behavior of the FIRST Mode setting:

![](/images/postgres-internals/pgsql11-fig-11-06.webp)

#### Figure 11.6. Behavior of the FIRST Mode Setting.

The following is the state of sync_priority and sync_state for the above setting:

```sql
SELECT application_name AS host,
        sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby3 |             3 | potential
 standby2 |             2 | sync
 standby1 |             1 | sync
(3 rows)
```

## 11.3.3. Behavior When a Failure Occurs

When either a potential or an asynchronous standby server fails, the primary server terminates the walsender process connected to the failed standby and continues all processing. In other words, a failure of either standby type does not affect transaction processing on the primary server.

When a synchronous standby server fails, the primary server terminates the walsender process connected to the failed standby and replaces the synchronous standby with the highest-priority potential standby. See Figure 11.7.

![](/images/postgres-internals/pgsql11-fig-11-07.webp)

#### Figure 11.7. Replacing of synchronous standby server.

Unlike a failure of a potential or asynchronous standby, a failure of a synchronous standby causes query processing on the primary server to pause until the replacement process is complete. (Therefore, failure detection is a critical function for increasing the availability of the replication system. Failure detection is described in the next section.)

In any case, if one or more standby servers run in synchronous mode, the primary server maintains exactly one synchronous standby server at all times. This synchronous standby server remains in a consistent and synchronous state with the primary.

# 11.4. Replication Slots

As discussed in Section 11.1.1, replication slots (introduced in version 9.4) ensure that WAL segments and old tuple versions are retained until replication completes.

This section explores the mechanism of replication slots.

Note that although replication slots are fundamental to logical replication, this section does not cover them in that context.

Section Contents

- 11.4.1. Advantages of Replication Slots in Streaming Replication
- 11.4.2. Replication Slots and Related Processes and Files
- 11.4.3. Data Structure
- 11.4.4. Starting Replication Slot
- 11.4.5. Managing Replication Slots

## 11.4.1. Advantages of Replication Slots in Streaming Replication

In streaming replication, although replication slots are not mandatory, they offer the following advantages compared to [wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-KEEP-SIZE):

1. Ensuring Streaming Replication Works Without Losing Required WAL Segments: Replication slots track required WAL segments and prevent their removal. In contrast, when using only wal_keep_size, PostgreSQL may remove necessary segments if standbys do not read them for an extended period.
2. Maintaining Only the Minimum Necessary WAL Segments: With replication slots, the pg_wal directory retains only the required WAL segments and removes unnecessary ones. Conversely, wal_keep_size retains a fixed amount of WAL segments regardless of actual requirement.

** max_slot_wal_keep_size

Since replication slots can retain WAL segments indefinitely, the storage area might fill up in the worst-case scenario, potentially leading to an operating system panic.

To address this issue, version 13 introduced the configuration parameter [max_slot_wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-SLOT-WAL-KEEP-SIZE). This parameter limits the maximum size of WAL segments in the pg_wal directory at checkpoint time.

The key difference between using max_slot_wal_keep_size with replication slots and using wal_keep_size lies in how they manage WAL segments:

- max_slot_wal_keep_size sets a maximum size limit while allowing replication slots to retain only the minimum required amount.
- wal_keep_size specifies a fixed amount of WAL segments to be retained, regardless of whether they are needed or not.

## 11.4.2. Replication Slots and Related Processes and Files

Replication slots are stored in the memory area allocated within shared memory.

Figure 11.8 illustrates replication slots and the related processes and files:

![](/images/postgres-internals/pgsql11-fig-11-08.webp)

#### Figure 11.8. Replication Slots and Related Processes and Files.

### 11.4.2.1. Related Processes

The processes related to replication slots are as follows:

- **Walsender**: This process continuously updates the corresponding replication slot to reflect the current state of the standby server’s WAL data.
- **Checkpointer background worker**: This process reads the replication slots to determine whether WAL segments can be removed during checkpointing.
- **Postgres backend**: This process displays slot information via the [pg_replication_slots](https://www.postgresql.org/docs/current/view-pg-replication-slots.html) system view.

### 11.4.2.2. Related Files

The files related to replication slots are as follows:

- **State files** under the *pg_replslot* directory: Walsenders regularly save detailed information about their replication slots to state files in this directory. During server restarts, PostgreSQL loads this information back into memory to restore the status of the replication slots.
- **WAL segment files** under the *pg_wal* directory.

## 11.4.3. Data Structure

Replication Slots are defined by the `ReplicationSlot` structure in [slot.h](https://github.com/postgres/postgres/blob/master/src/include/replication/slot.h).

** ** ReplicationSlot

```python
/*
 * Shared memory state of a single replication slot.
 *
 * The in-memory data of replication slots follows a locking model based
 * on two linked concepts:
 * - A replication slot's in_use flag is switched when added or discarded using
 * the LWLock ReplicationSlotControlLock, which needs to be hold in exclusive
 * mode when updating the flag by the backend owning the slot and doing the
 * operation, while readers (concurrent backends not owning the slot) need
 * to hold it in shared mode when looking at replication slot data.
 * - Individual fields are protected by mutex where only the backend owning
 * the slot is authorized to update the fields from its own slot.  The
 * backend owning the slot does not need to take this lock when reading its
 * own fields, while concurrent backends not owning this slot should take the
 * lock when reading this slot's data.
 */
typedef struct ReplicationSlot
{
	/* lock, on same cacheline as effective_xmin */
	slock_t		mutex;

	/* is this slot defined */
	bool		in_use;

	/* Who is streaming out changes for this slot? 0 in unused slots. */
	pid_t		active_pid;

	/* any outstanding modifications? */
	bool		just_dirtied;
	bool		dirty;

	/*
	 * For logical decoding, it's extremely important that we never remove any
	 * data that's still needed for decoding purposes, even after a crash;
	 * otherwise, decoding will produce wrong answers.  Ordinary streaming
	 * replication also needs to prevent old row versions from being removed
	 * too soon, but the worst consequence we might encounter there is
	 * unwanted query cancellations on the standby.  Thus, for logical
	 * decoding, this value represents the latest xmin that has actually been
	 * written to disk, whereas for streaming replication, it's just the same
	 * as the persistent value (data.xmin).
	 */
	TransactionId effective_xmin;
	TransactionId effective_catalog_xmin;

	/* data surviving shutdowns and crashes */
	ReplicationSlotPersistentData data;

	/* is somebody performing io on this slot? */
	LWLock		io_in_progress_lock;

	/* Condition variable signaled when active_pid changes */
	ConditionVariable active_cv;

	/* all the remaining data is only used for logical slots */

	/*
	 * When the client has confirmed flushes >= candidate_xmin_lsn we can
	 * advance the catalog xmin.  When restart_valid has been passed,
	 * restart_lsn can be increased.
	 */
	TransactionId candidate_catalog_xmin;
	XLogRecPtr	candidate_xmin_lsn;
	XLogRecPtr	candidate_restart_valid;
	XLogRecPtr	candidate_restart_lsn;

	/*
	 * This value tracks the last confirmed_flush LSN flushed which is used
	 * during a shutdown checkpoint to decide if logical's slot data should be
	 * forcibly flushed or not.
	 */
	XLogRecPtr	last_saved_confirmed_flush;

	/* The time since the slot has become inactive */
	TimestampTz inactive_since;
} ReplicationSlot;

#define SlotIsPhysical(slot) ((slot)->data.database == InvalidOid)
#define SlotIsLogical(slot) ((slot)->data.database != InvalidOid)

/*
 * Shared memory control area for all of replication slots.
 */
typedef struct ReplicationSlotCtlData
{
	/*
	 * This array should be declared [FLEXIBLE_ARRAY_MEMBER], but for some
	 * reason you can't do that in an otherwise-empty struct.
	 */
	ReplicationSlot replication_slots[1];
} ReplicationSlotCtlData;
```

Although the structure contains many items, as it is shared between both streaming and logical replication, the main items relevant to streaming replication are as follows:

- **active_pid**: The PID of the walsender process that manages this slot.
- **ReplicationSlotPersistentData data**: Items defined by `ReplicationSlotPersistentData` structure. The main items include: **name**: The name of the slot.
- **restart_lsn**: The oldest LSN that might be required by this replication slot. The checkpointer reads the minimum restart_lsn value across all slots to determine whether WAL segments can be removed.

The ReplicationSlotPersistentData data is regularly saved in the pg_replslot directory.

** ** ReplicationSlotPersistentData

```python
/*
 * On-Disk data of a replication slot, preserved across restarts.
 */
typedef struct ReplicationSlotPersistentData
{

	NameData	name;

	/* database the slot is active on */
	Oid			database;

	/*
	 * The slot's behaviour when being dropped (or restored after a crash).
	 */
	ReplicationSlotPersistency persistency;

	/*
         * xmin horizon for data
         *
         * NB: This may represent a value that hasn't been written to disk yet;
         * see notes for effective_xmin, below.
         */
	 TransactionId xmin;

	/*
	 * xmin horizon for catalog tuples
	 *
	 * NB: This may represent a value that hasn't been written to disk yet;
	 * see notes for effective_xmin, below.
	 */
	TransactionId catalog_xmin;

	/* oldest LSN that might be required by this replication slot */
	XLogRecPtr	restart_lsn;

	/* RS_INVAL_NONE if valid, or the reason for having been invalidated */
	ReplicationSlotInvalidationCause invalidated;

	/*
	 * Oldest LSN that the client has acked receipt for.  This is used as the
	 * start_lsn point in case the client doesn't specify one, and also as a
	 * safety measure to jump forwards in case the client specifies a
	 * start_lsn that's further in the past than this value.
	 */
	XLogRecPtr	confirmed_flush;

	/*
	 * LSN at which we enabled two_phase commit for this slot or LSN at which
	 * we found a consistent point at the time of slot creation.
	 */
	XLogRecPtr	two_phase_at;

	/*
	 * Allow decoding of prepared transactions?
	 */
	bool		two_phase;

	/* plugin name */
	NameData	plugin;

	/*
	 * Was this slot synchronized from the primary server?
	 */
	char		synced;

	/*
	 * Is this a failover slot (sync candidate for standbys)? Only relevant
	 * for logical slots on the primary server.
	 */
	bool		failover;
} ReplicationSlotPersistentData;
```

## 11.4.4. Starting Replication Slot

Figure 11.9 illustrates the starting sequence of a replication slot:

![](/images/postgres-internals/pgsql11-fig-11-09.webp)

#### Figure 11.9. Starting Sequence of a Replication Slot.

(1) Create a (physical) replication slot using the [pg_create_physical_replication_slot()](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-REPLICATION) function. Except for the slot name, PostgreSQL sets the data in the replication slot to its default values.

```
testdb=# SELECT * FROM pg_create_physical_replication_slot('standby_slot');
slot_name   | lsn
---------------+-----
standby_slot  |
(1 row)
```

(2) Write a portion of the slot data in the pg_replslot directory. The ReplicationSlotPersistentData structure defines this data. PostgreSQL creates a file named ‘state’ under the subdirectory corresponding to the slot name, as shown below:

```bash
$ ls -1 pg_replslot/
standby_slot
$ find pg_replslot/
pg_replslot/
pg_replslot/standby_slot
pg_replslot/standby_slot/state
```

(3) (Re)Connect the standby server to the primary server. To (re)connect the standby server, set the [primary_slot_name](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-PRIMARY-SLOT-NAME) configuration parameter to the name of the replication slot.

```
# standby's postgresql.conf

primary_slot_name = 'standby_slot'
```

Then, issue the pg_ctl command with the “reload” option:

```bash
$ pg_ctl -D $PGDATA_STANDBY reload
```

(4) Update the replication slot, including fields such as active_pid and restart_lsn. (5) Write a portion of the updated slot data in the pg_replslot directory.

## 11.4.5. Managing Replication Slots

After replication slots are set in shared memory, walsender processes continuously update the slots to reflect the current states of the corresponding standby servers.

Below is an example of the states of the replication slots:

```
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_replication_slots;
-[ RECORD 1 ]-------+--------------
slot_name           | standby_slot
plugin              |
slot_type           | physical
datoid              |
database            |
temporary           | f
active              | t
active_pid          | 236772
xmin                | 754
catalog_xmin        |
restart_lsn         | 0/303B968
confirmed_flush_lsn |
wal_status          | reserved
safe_wal_size       |
two_phase           | f
inactive_since      |
conflicting         |
invalidation_reason |
failover            | f
synced              | f
```

The primary PostgreSQL server regularly saves detailed information about its replication slots to ‘state’ files in the pg_replslot directory.

When the primary server restarts, it loads this saved information back into memory to restore the status of its replication slots.
