---
title: "Base Backup and Point-In-Time Recovery"
lang: en
---

# 10.1. Base Backup

Before the introduction of the [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html) utility in version 9.1 (2011), online (full) backups relied on the [pg_backup_start](http://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-BACKUP) and [pg_backup_stop](http://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-BACKUP) commands.

While these commands are now less common, they remain essential for understanding PostgreSQL’s backup and **Point-in-Time Recovery (PITR)** mechanisms. The following subsections explore these commands before discussing the operation of pg_basebackup.

Figure 10.1 illustrates the standard procedure for taking a base backup:

- (1) Issue the pg_backup_start command (versions 14 or earlier, pg_start_backup).
- (2) Take a snapshot of the database cluster using a preferred archiving command.
- (3) Issue the pg_backup_stop command (versions 14 or earlier, pg_stop_backup).

![](/images/postgres-internals/pgsql10-fig-10-01.webp)

#### Figure 10.1. Making a base backup.

This procedure requires no table locks, so users continue issuing queries without interruption. This provides a significant advantage over other major open-source RDBMSs.

The pg_basebackup utility internally invokes these commands and inherits their advantages.

** Info

The pg_backup_start and pg_backup_stop commands are defined in [xlogfuncs.c](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/xlogfuncs.c).

** Historical Information

Until version 14, the pg_backup_start command and the pg_backup_stop command were named pg_start_backup and pg_stop_backup, respectively.

Section Contents

- 10.1.1. pg_backup_start
- 10.1.2. pg_backup_stop
- 10.1.3. pg_basebackup

## 10.1.1. pg_backup_start

The pg_backup_start command prepares for a base backup by internally invoking the [do_pg_backup_start()](https://github.com/postgres/postgres/blob/d32d1463995c036853eeb9ec99cc367ffc7794ae/src/backend/access/transam/xlog.c#L8791) function.

As discussed in Section 9.8, recovery starts from a REDO point. Therefore, pg_backup_start performs a checkpoint to explicitly create a REDO point at the start of the backup. Because regular checkpoints may occur multiple times during a backup, the system must save this specific checkpoint location in a file other than pg_control.

Specifically, pg_backup_start performs four operations:

1. Force the database into full-page write mode.
2. Switch to a new WAL segment file (versions 8.4 or later).
3. Execute a checkpoint.
4. Create a **backup_label file** &mdash; This file, located in the top level of the base directory, contains essential information about the backup, including the checkpoint location.

The third and fourth operations represent the core of this command. The first and second operations ensure more reliable database cluster recovery.

### 10.1.1.1. backup_label file

A backup_label file contains the following items (seven items in version 11 or later):

- **CHECKPOINT LOCATION:** The LSN location of the checkpoint record created by this command.
- **START WAL LOCATION:** Used primarily for streaming replication ([Chapter 11](/book/postgres-internals/pgsql11/index)). A standby server reads this value only once at initial startup.
- **BACKUP METHOD:** The method used to create the backup.
- **BACKUP FROM:** Indicates whether the backup came from a primary or standby server.
- **START TIME:** The timestamp when pg_backup_start was executed.
- **LABEL:** The label specified in the pg_backup_start command.
- **START TIMELINE:** The timeline at the start of the backup (introduced in version 11 for sanity checks).

An example of a backup_label file created by pg_basebackup:

```bash
$ cat $PGDATA/backup_label
START WAL LOCATION: 0/1B000028 (file 00000001000000000000001B)
CHECKPOINT LOCATION: 0/1B000060
BACKUP METHOD: streamed
BACKUP FROM: primary
START TIME: 2024-1-1 11:45:19 GMT
LABEL: pg_basebackup base backup
START TIMELINE: 1
```

During recovery, PostgreSQL retrieves the *CHECKPOINT LOCATION* from the backup_label file to read the checkpoint record from the appropriate archive log. It then identifies the REDO point and begins the recovery process.

** Why is it possible to create a base backup using general-purpose archiving tools like cp or scp?

The answer lies in the recovery process. This process restores the database cluster to a consistent state even if the files are physically inconsistent.

Standard tools may copy files at different times, which leads to internal inconsistencies. Despite this, the database cluster can still reach a consistent state by replaying the archived WAL files.

Therefore, file-system-level snapshots or specialized backup tools are not strictly required.

## 10.1.2. pg_backup_stop

The pg_backup_stop command completes the backup by internally invoking the [do_pg_backup_stop()](https://github.com/postgres/postgres/blob/d32d1463995c036853eeb9ec99cc367ffc7794ae/src/backend/access/transam/xlog.c#L9119) function.

It performs five operations:

1. Reset the database to *non-full-page writes* mode if pg_backup_start changed it.
2. Write a WAL record indicating the end of the backup.
3. Switch the WAL segment file.
4. Create a **backup history file** &mdash; This file includes the contents of the backup_label file and the completion timestamp.
5. Delete the backup_label file &mdash; This file is necessary for recovery from the backup, but is no longer needed in the original database cluster after copying.

The backup history file follows this naming pattern:

- **Backup History File Pattern:**: `{WAL_segment}.{offset}.backup` offset: The starting LSN/value of the base backup.

## 10.1.3. pg_basebackup

[pg_basebackup](https://www.postgresql.org/docs/current/app-pgbasebackup.html) is a utility for taking online backups.

Through version 16, it supported full backups of the entire database cluster. Version 17 added incremental backups, which are discussed in Section 10.5.

To perform remote backups, pg_basebackup utilizes the **walsender** process, a component of streaming replication explained in [Chapter 11](/book/postgres-internals/pgsql11/index).

For example, to take a full backup from host 192.168.1.10 to the local directory `/usr/local/pgsql/backup/full`:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 -D /usr/local/pgsql/backup/full -X stream -P -v
```

Figure 10.2 illustrates the pg_basebackup sequence:

![](/images/postgres-internals/pgsql10-fig-10-02.webp)

#### Figure 10.2. The sequence of how the pg_basebackup takes a full backup.

- (1) **Connection request**: pg_basebackup requests a walsender connection from the PostgreSQL server.
- (2) **Create walsender process**: The server creates a walsender process and establishes the connection.
- (3) **Base backup request**: pg_basebackup requests the backup.
- (4) **Execute do_pg_backup_start()**: The walsender process runs this function.
- (5) **Send all files**: The walsender sends all database cluster files, excluding WAL files in pg_wal.
- (6) **Execute do_pg_backup_stop()**: The walsender process runs this function.
- (7) **Send WAL files**: The walsender sends WAL files in pg_wal if the ‘&ndash;wal-method’ option is not ’none’.
- (8) **Send backup_manifest file**: The walsender creates and sends the manifest file.

Step 5 excludes WAL files to ensure the final segments are captured by pg_basebackup.

In step 6, do_pg_backup_stop() switches the current WAL segment, ensuring that all files generated during the backup are flushed to the pg_wal directory.

```bash
$ ls /usr/local/pgsql/backup/full
PG_VERSION        global        pg_ident.conf  pg_serial     pg_tblspc             postgresql.conf
backup_label      log           pg_logical     pg_snapshots  pg_twophase
backup_manifest   pg_commit_ts  pg_multixact   pg_stat       pg_wal
base              pg_dynshmem   pg_notify      pg_stat_tmp   pg_xact
current_logfiles  pg_hba.conf   pg_replslot    pg_subtrans   postgresql.auto.conf
```

** Why does pg_basebackup use walsender?

Walsender handles replication, as explained in [Chapter 11](/book/postgres-internals/pgsql11/index).

While pg_basebackup is not directly replication, **postgres** and **walsender** were the only processes available for external program connections during its development. Consequently, the walsender protocol was extended for pg_basebackup.

### 10.1.3.1. Backup Manifest Files

A backup manifest file is a JSON file containing metadata and verification information.

Table 10.1 shows Key Components.

| Key | Values |
| --- | --- |
| PostgreSQL-Backup-Manifest-Version | Backup manifest version number. |
| Files | List of objects that contains all file’s path, size, checksum, etc. |
| WAL-Ranges | Timeline and the LSN range during the backup procedure: **Start-LSN**: The LSN of the REDO point generated by CHECKPOINT when the do_pg_backup_start() function is invoked. ** End-LSN**: The LSN of the WAL log created by the do_pg_backup_stop() function. |
| Manifest-Checksum | The checksum value of this manifest file. |

Here’s a cited example of a backup manifest file:

```bash
$ cat /usr/local/pgsql/backup/full/backup_manifest
{ &#34;PostgreSQL-Backup-Manifest-Version&#34;: 2,
&#34;System-Identifier&#34;: 7426689740139212305,
&#34;Files&#34;: [
{ &#34;Path&#34;: &#34;backup_label&#34;, &#34;Size&#34;: 225, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;1950abcb&#34; },
{ &#34;Path&#34;: &#34;postgresql.conf&#34;, &#34;Size&#34;: 30771, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:00 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;a9c769e0&#34; },
{ &#34;Path&#34;: &#34;postgresql.auto.conf&#34;, &#34;Size&#34;: 88, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;536f950b&#34; },
{ &#34;Path&#34;: &#34;pg_ident.conf&#34;, &#34;Size&#34;: 2640, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;0ce04d87&#34; },
{ &#34;Path&#34;: &#34;pg_xact/0000&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;4c2ce5fc&#34; },
{ &#34;Path&#34;: &#34;pg_hba.conf&#34;, &#34;Size&#34;: 5711, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;d62da38c&#34; },
{ &#34;Path&#34;: &#34;PG_VERSION&#34;, &#34;Size&#34;: 3, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;64440205&#34; },
{ &#34;Path&#34;: &#34;base/4/113&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;d1bc40bb&#34; },
{ &#34;Path&#34;: &#34;base/4/1417&#34;, &#34;Size&#34;: 0, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;00000000&#34; },
{ &#34;Path&#34;: &#34;base/4/2610_fsm&#34;, &#34;Size&#34;: 24576, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;b9b5f34f&#34; },
{ &#34;Path&#34;: &#34;base/4/3542&#34;, &#34;Size&#34;: 16384, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;e7f849bf&#34; },

... snip ...

{ &#34;Path&#34;: &#34;global/pg_control&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;43872087&#34; }
],
&#34;WAL-Ranges&#34;: [
{ &#34;Timeline&#34;: 1, &#34;Start-LSN&#34;: &#34;0/4000028&#34;, &#34;End-LSN&#34;: &#34;0/4000120&#34; }
],
&#34;Manifest-Checksum&#34;: &#34;4c6d8a85379990904f6986f5bfd98db9f4640cfc96f440f8674abe6251cfffb8&#34;}
```

# 10.2. How Point-in-Time Recovery Works

Figure 10.3 illustrates the basic concept of PITR.

In PITR mode, PostgreSQL replays WAL data from archive logs onto the base backup. This process starts at the REDO point created by pg_backup_start and continues up to a specified recovery point. This point is referred to as the **recovery target**.

![](/images/postgres-internals/pgsql10-fig-10-03.webp)

#### Figure 10.3. Basic concept of PITR.

The PITR process operates as follows:

Suppose a mistake occurs at 12:05 GMT on 1 January 2024. The database cluster should be removed, and a new one restored using a base backup created before that time.

To begin, configure the [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) parameter and set the [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) parameter to the point of the error (12:05 GMT) in the postgresql.conf file (or recovery.conf for version 11 or earlier).

```
# Place archive logs under /mnt/server/archivedir directory.
restore_command = 'cp /mnt/server/archivedir/%f %p'
recovery_target_time = &#34;2024-1-1 12:05 GMT&#34;
```

When PostgreSQL starts up, it enters PITR mode if the database cluster contains a **backup_label** file and a **recovery.signal** file (or recovery.conf in version 11 or earlier).

** recovery.conf / recovery.signal

PostgreSQL 12 (2019) removed the recovery.conf file; all recovery parameters are now written in postgresql.conf.

For detailed information, refer to the [official documentation](https://www.postgresql.org/docs/current/runtime-config-wal.html#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY).

In version 12 and later, restoring a server from a base backup requires an empty file named **recovery.signal** in the database cluster directory.

```bash
$ touch /usr/local/pgsql/data/recovery.signal
```

The Point-in-Time Recovery (PITR) process is almost identical to the normal recovery process described in Section 9.8. There are only two differences:

- **Source of WAL segments/Archive logs:** Normal recovery mode: WAL segments are read from the pg_wal subdirectory (or pg_xlog in version 9.6 or earlier).
- PITR mode: WAL segments are read from the archival directory specified in the [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) parameter.

**Checkpoint location source:**

- Normal recovery mode: The location is read from the pg_control file.
- PITR mode: The location is read from the backup_label file.

The outline of the PITR process is as follows:

1. PostgreSQL reads the ‘CHECKPOINT LOCATION’ from the backup_label file using the internal function read_backup_label() to find the REDO point.
2. PostgreSQL reads parameter values from postgresql.conf (or recovery.conf), such as [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) and [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME).
3. PostgreSQL begins replaying WAL data from the REDO point obtained from the ‘CHECKPOINT LOCATION’. The system reads WAL data from archive logs by executing the [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND). This command copies logs from the archival area to a temporary area. PostgreSQL removes the copied log files after use. In this example, PostgreSQL replays WAL data from the REDO point up to the point immediately before ‘2024-1-1 12:05:00’. If no recovery target is set in postgresql.conf, PostgreSQL replays until the end of the archive logs.
4. When the recovery process completes, a **timeline history file** (e.g., 00000002.history) is created in the pg_wal subdirectory. If the archiving feature is enabled, a copy is also created in the archival directory. Refer to Section 10.3.2 for details.

The records for commit and abort actions contain a timestamp indicating when each action occurred (defined in `xl_xact_commit` and `xl_xact_abort`).

** ** xl_xact_commit

```
/* Version 9.5 or later */
typedef struct xl_xact_commit
{
	TimestampTz xact_time;		/* time of commit */

	/* xl_xact_xinfo follows if XLOG_XACT_HAS_INFO */
	/* xl_xact_dbinfo follows if XINFO_HAS_DBINFO */
	/* xl_xact_subxacts follows if XINFO_HAS_SUBXACT */
	/* xl_xact_relfilelocators follows if XINFO_HAS_RELFILELOCATORS */
	/* xl_xact_stats_items follows if XINFO_HAS_DROPPED_STATS */
	/* xl_xact_invals follows if XINFO_HAS_INVALS */
	/* xl_xact_twophase follows if XINFO_HAS_TWOPHASE */
	/* twophase_gid follows if XINFO_HAS_GID. As a null-terminated string. */
	/* xl_xact_origin follows if XINFO_HAS_ORIGIN, stored unaligned! */
} xl_xact_commit;

/* Version 9.4 or earlier */
typedef struct xl_xact_commit
{
        TimestampTz	xact_time;          /* time of commit */
        uint32          xinfo;              /* info flags */
        int            	nrels;              /* number of RelFileNodes */
        int            	nsubxacts;          /* number of subtransaction XIDs */
        int            	nmsgs;              /* number of shared inval msgs */
        Oid            	dbId;               /* MyDatabaseId */
        Oid            	tsId;               /* MyDatabaseTableSpace */
        /* Array of RelFileNode(s) to drop at commit */
        RelFileNode     xnodes[1];          /* VARIABLE LENGTH ARRAY */
        /* ARRAY OF COMMITTED SUBTRANSACTION XIDs FOLLOWS */
        /* ARRAY OF SHARED INVALIDATION MESSAGES FOLLOWS */
} xl_xact_commit;
```

** ** xl_xact_abort

```
/* Version 9.5 or later */
typedef struct xl_xact_abort
{
	TimestampTz xact_time;		/* time of abort */

	/* xl_xact_xinfo follows if XLOG_XACT_HAS_INFO */
	/* xl_xact_dbinfo follows if XINFO_HAS_DBINFO */
	/* xl_xact_subxacts follows if XINFO_HAS_SUBXACT */
	/* xl_xact_relfilelocators follows if XINFO_HAS_RELFILELOCATORS */
	/* xl_xact_stats_items follows if XINFO_HAS_DROPPED_STATS */
	/* No invalidation messages needed. */
	/* xl_xact_twophase follows if XINFO_HAS_TWOPHASE */
	/* twophase_gid follows if XINFO_HAS_GID. As a null-terminated string. */
	/* xl_xact_origin follows if XINFO_HAS_ORIGIN, stored unaligned! */
} xl_xact_abort;

/* Version 9.4 or earlier */
typedef struct xl_xact_abort
{
        TimestampTz     xact_time;          /* time of abort */
        int            	nrels;              /* number of RelFileNodes */
        int             nsubxacts;          /* number of subtransaction XIDs */
        /* Array of RelFileNode(s) to drop at abort */
        RelFileNode     xnodes[1];          /* VARIABLE LENGTH ARRAY */
        /* ARRAY OF ABORTED SUBTRANSACTION XIDs FOLLOWS */
} xl_xact_abort;
```

Therefore, if a [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) is set, PostgreSQL decides whether to continue recovery whenever it replays a commit or abort record. PostgreSQL compares the target time with the timestamp in the record; if the timestamp exceeds the target time, the PITR process finishes.

** Info

The function read_backup_label() is defined in [xlog.c](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/xlog.c). The structure xl_xact_commit and xl_xact_abort are defined in [xact.h](https://github.com/postgres/postgres/blob/master/src/include/access/xact.h).

# 10.3. timelineId and Timeline History File

PostgreSQL uses a **timeline** to distinguish between the original database cluster and recovered ones. It is a central concept of PITR. This section describes two items associated with the timeline: the timelineId and timeline history files.

Section Contents

- 10.3.1. timelineId
- 10.3.2. Timeline History File

## 10.3.1. timelineId

Each timeline is assigned a **timelineId**, a 4-byte unsigned integer starting at 1.

A unique timelineId belongs to each database cluster. The initdb utility creates the original database cluster with timelineId 1.

Whenever a database cluster recovers, the timelineId increases by 1. For example, in the previous section, the cluster recovered from the original one has timelineId 2.

Figure 10.4 illustrates the PITR process from the viewpoint of the timelineId.

![](/images/postgres-internals/pgsql10-fig-10-04.webp)

#### Figure 10.4. Relation of timelineId between an original and a recovered database clusters.

1. To return to the starting point of recovery, the current database cluster is removed and a base backup made in the past is restored. The red arrow curve in the figure represents this situation.
2. Next, the PostgreSQL server starts and replays WAL data in the archive logs. This process begins from the REDO point created by pg_backup_start and continues until the recovery target by tracing the initial timeline (timelineId 1). The blue arrow line in the figure represents this situation.
3. Then, a new timelineId 2 is assigned to the recovered database cluster, and PostgreSQL runs on the new timeline.

As mentioned in Section 9.2, the first 8 digits of a WAL segment filename equal the timelineId of the database cluster that created the segment. When the timelineId changes, the WAL segment filename also changes.

The recovery process can be described again by focusing on WAL segment files. Suppose a database cluster recovers using two archive logs ‘000000010000000000000009’ and ‘00000001000000000000000A’. The newly recovered database cluster is assigned timelineId 2, and PostgreSQL creates the WAL segment starting from ‘00000002000000000000000A’.

Figure 10.5 shows this situation.

![](/images/postgres-internals/pgsql10-fig-10-05.webp)

#### Figure 10.5. Relation of WAL segment files between an original and a recovered database clusters.

## 10.3.2. Timeline History File

When a PITR process completes, a timeline history file (e.g., ‘00000002.history’) is created in the archive directory and the pg_wal subdirectory (or pg_xlog in versions 9.6 or earlier). This file records which timeline it branched from and when.

The naming rule for this file is shown below:

- **Timeline History File Pattern:** `[TimelineId].history`

The timeline history file contains at least one line, and each line is composed of the following three items:

- **timelineId:** The timelineId of the archive logs used for recovery.
- **LSN:** The LSN location where the timeline switch occurred.
- **reason:** A human-readable explanation of why the timeline changed.

A specific example is shown below:

```bash
$ cat /home/postgres/archivelogs/00000002.history
1	  0/A000198	before 2024-1-1 12:05:00.861324+00
```

The meaning is as follows:

> The database cluster (timelineId 2) is based on the base backup from timelineId 1. It was recovered just before ‘2024-1-1 12:05:00.861324+00’ by replaying archive logs until LSN ‘0/A000198’.

In this way, each timeline history file provides a complete history of an individual recovered database cluster. Moreover, the PITR process itself uses this file. The next section explains the details.

** Info

The timeline history file format changed in version 9.3 (2013).

The formats are shown below:

Later version 9.3:

```
timelineId	LSN	&#34;reason&#34;
```

Until version 9.2:

```
timelineId	WAL_segment	&#34;reason&#34;
```

# 10.4. Point-in-Time Recovery with Timeline History File

The timeline history file is essential for performing second and subsequent Point-in-Time Recovery (PITR) operations. The following example demonstrates its utility during a second recovery attempt.

Consider a scenario where an error occurs at ‘12:15:00’ in a recovered database cluster with timeline ID 2. To recover the database to this point, the postgresql.conf file (or recovery.conf for versions 11 or earlier) should be configured as follows:

```
restore_command = 'cp /mnt/server/archivedir/%f %p'
recovery_target_time = &#34;2024-1-1 12:15:00 GMT&#34;
recovery_target_timeline = 2
```

The [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) parameter specifies the desired recovery time. The [recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE) parameter is set to 2 to recover along that specific timeline.

Restarting the PostgreSQL server enters PITR mode and recovers the database to the target time along timeline ID 2 (see Figure 10.6).

![](/images/postgres-internals/pgsql10-fig-10-06.webp)

#### Figure 10.6. Recover the database at 12:15:00 along the timelineId 2.

During recovery, PostgreSQL performs the following steps:

1. PostgreSQL reads the ‘CHECKPOINT LOCATION’ value from the backup_label file.
2. PostgreSQL reads parameter values from postgresql.conf (or recovery.conf in versions 11 or earlier); in this example, [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND), [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME), and [recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE).
3. PostgreSQL reads the timeline history file “00000002.history” corresponding to the [recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE) value.
4. PostgreSQL replays WAL data using these steps: From the REDO point to LSN ‘0/A000198’ (specified in the 00000002.history file), PostgreSQL reads and replays WAL data from archive logs with timeline ID 1.
5. From the point after LSN ‘0/A000198’ to the point before timestamp ‘2024-1-1 12:15:00’, PostgreSQL reads and replays WAL data from archive logs with timeline ID 2.

When the recovery process completes, the current timeline ID advances to 3. PostgreSQL creates a new timeline history file “00000003.history” in the pg_wal subdirectory (pg_xlog in versions 9.6 or earlier) and the archival directory.

```bash
$ cat /home/postgres/archivelogs/00000003.history
1         0/A000198     before 2024-1-1 12:05:00.861324+00

2         0/B000078     before 2024-1-1 12:15:00.927133+00
```

For multiple PITR operations, the appropriate timeline ID must be explicitly set to ensure the use of the correct timeline history file.

Timeline history files serve not only as logs of the database cluster’s history but also as recovery instructions for the PITR process.

# 10.5. Incremental Backup

Regular backups are essential for normal operation. However, maintaining multiple full backups consumes significant storage space.

To address this issue, PostgreSQL introduced incremental backups in version 17 (2024). An incremental backup saves only the changed portions of the files modified since the preceding backup.

The following subsections describe the overview of incremental backups, the process of creating them with pg_basebackup, and the internal data format.

Section Contents

- 10.5.1. Incremental Backup Overview
- 10.5.2. How to Take Incremental Backups
- 10.5.3. Format of INCREMENTAL File

## 10.5.1. Incremental Backup Overview

### 10.5.1.1. Taking Incremental Backup

Incremental backup relies on a full backup and WAL summary files. These summary files are collected by the WAL summarizer, which is described in Section 9.6.2. This section begins by explaining the initial full backup.

1. **Taking the full backup:** After do_pg_backup_start() is issued, a full backup is taken. This backup contains all relation files. This explanation assumes the REDO point of the full backup is $REDO_{full}$.
2. **Tracking changes:** The WAL Summarizer process tracks changes to all database blocks and writes these modifications to WAL summary files.
3. **Taking the incremental backup:** Assume the REDO point of this incremental backup is $REDO_{inc01}$. Using the summary files generated between $REDO_{full}$ and $REDO_{inc01}$, the incremental backup saves only the changed blocks instead of the entire relation files.

![](/images/postgres-internals/pgsql10-fig-10-07.webp)

#### Figure 10.7. Concept of Taking an Incremental Backup.

Two important points regarding this process:

- Relation and visibility map files are stored as incremental backup files, while **free-space map (FSM) files are always backed up entirely**. This is because FSM forks are not tracked by the WAL Summarizer, as mentioned in Section 9.6.2.
- If a relation is created after the preceding backup, the system backs up the entire relation file.

Incremental backup files follow these naming conventions:

- **Relation:** `INCREMENTAL.{oid}`
- **Visibility Map:** `INCREMENTAL.{oid}_vm`

For instance, the incremental backup file for Table t1 (OID = 16551) is named ‘INCREMENTAL.16551’.

The following example shows the full and incremental backup files for t1:

```bash
$ ls -la -h backup/full/base/16425/ | grep &#34;16551$&#34;
-rw------- 1 postgres postgres 32K Oct 17 11:11 16551
16551
$ ls -la -h backup/inc01/base/16425/ | grep &#34;16551$&#34;
-rw------- 1 postgres postgres 24K Oct 17 11:20 INCREMENTAL.16551
INCREMENTAL.16551
```

### 10.5.1.2. Reconstructing Backup

PostgreSQL provides the [pg_combinebackup](https://www.postgresql.org/docs/current/app-pgcombinebackup.html) utility to reconstruct a base backup from incremental backups.

If a full backup is located at ‘/usr/local/pgsql/backup/full’ and an incremental backup is at ‘/usr/local/pgsql/backup/inc01’, the following command reconstructs the base backup under ‘/usr/local/pgsql/reconstructed’:

```bash
$ pg_combinebackup -d -n -o /usr/local/pgsql/reconstructed  \
>    /usr/local/pgsql/backup/full/  \
>    /usr/local/pgsql/backup/inc01/
```

Figure 10.8 illustrates how pg_combinebackup reconstructs a base backup. Essentially, pg_combinebackup applies the block changes stored in the incremental backup file to the original relation file.

For instance, if Table t1 (OID=16551) exists in the full backup and an incremental backup contains INCREMENTAL.16551’, pg_combinebackup overwrites the changed blocks (e.g., the 0th and 3rd blocks) from the incremental file onto the original ‘16551’ file.

![](/images/postgres-internals/pgsql10-fig-10-08.webp)

#### Figure 10.8. Concept of Reconstructing a Base Backup.

## 10.5.2. How to Take Incremental Backups

To take an incremental backup, use the ‘&ndash;incremental’ option followed by the path to the preceding backup’s manifest file.

For example, to take an incremental backup from host 192.168.1.10 to the local directory ‘/usr/local/pgsql/backup/inc01’ based on the full backup at ‘/usr/local/pgsql/backup/full’, execute the following command:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 \
>   --incremental /usr/local/pgsql/backup/full/backup_manifest \
>   -D /usr/local/pgsql/backup/inc01 -X stream -P -v
```

Figure 10.9 shows the sequence of how the pg_basebackup takes an incremental backup:

![](/images/postgres-internals/pgsql10-fig-10-09.webp)

#### Figure 10.9. The sequence of the pg_basebackup in incremental backup mode.

- (1) Connection request
- (2) Create walsender process
- (3) Send backup manifest file: pg_basebackup sends the backup_manifest of the preceding backup.
- (4) Initialize incremental backup parameters: The walsender process calls FinalizeIncrementalManifest() to retrieve the TimeLine and Start-LSN from the preceding backup’s manifest file.
- (5) Base backup request
- (6) Execute do_pg_backup_start()
- (7) Identify modified blocks: The walsender process calls PrepareForIncrementalbackup() to generate a list of all modified relation blocks. It identifies these changes by analyzing summary files from the Start-LSN (retrieved in step 4) to the latest REDO point (generated in step 6).
- (8) Send INCREMENTAL files: The walsender process sends incremental backup files instead of entire relation and visibility-map files. These files consist of a header block and changed blocks, determined by the list created in step 7.
- (9) Execute do_pg_backup_stop()
- (10) Send WAL files
- (11) Send backup_manifest file

In step 8, the walsender sends the entire relation file if the relation was created after the preceding backup.

To take the next incremental backup, execute the following command with the ‘&ndash;incremental’ option pointing to the previous incremental backup manifest:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 \
>   --incremental /usr/local/pgsql/backup/inc01/backup_manifest \
>   -D /usr/local/pgsql/backup/inc02 -X stream -P -v
```

## 10.5.3. Format of INCREMENTAL File

An INCREMENTAL file typically consists of a header block and modified blocks, each 8 KB in size.

![](/images/postgres-internals/pgsql10-fig-10-10.webp)

#### Figure 10.10. INCREMENTAL file format.

A header block contains four types of information:

- **Magic Number**: The header begins with ‘0xd3ae1f0d’ to identify it as an incremental backup file.
- **num_incremental_block**: The number of modified blocks.
- **truncation_block_length**: This value usually represents the total number of blocks in the table and VM corresponding to this file. Depending on internal processing, it may exceed this value. See the [source code](https://github.com/postgres/postgres/blob/7f3b41ce48a58f090da94dbcc737483c217ce9c3/src/backend/backup/basebackup_incremental.c#L845) for details.
- **List of modified block numbers**: This stores the numbers of the modified blocks. For instance, if the 0th and 3rd blocks are modified, it stores “0” and “3”.

A header block is typically 8 KB, or a multiple of 8 KB. The block is padded with zeros to maintain 8 KB alignment after the list of block numbers. If the list exceeds 8 KB, PostgreSQL adds additional header blocks.

If a table is truncated, dropped, or **unchanged**, its header block becomes a 12-byte block containing three fields: a magic number, a num_incremental_block set to 0, and a truncation_block_length of 1. The INCREMENTAL file itself also becomes a 12-byte file containing only this header.

Figure 10.11 shows four examples of INCREMENTAL files, as explained in Section 9.6.2.2:

![](/images/postgres-internals/pgsql10-fig-10-11.webp)

#### Figure 10.11. Four examples of the INCREMENTAL files
