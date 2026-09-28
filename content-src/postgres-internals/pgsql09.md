---
title: "Write Ahead Logging"
lang: en
---

# 9.1. Overview

This section provides an overview of the Write-Ahead Logging (WAL) mechanism.

The first subsection illustrates the risks of system crashes in a database without WAL. The second subsection introduces key concepts, such as WAL data writing and the recovery process. The final subsection describes **full-page writes**, a critical concept for data integrity.

In this section, the examples use a table named `TABLE_A`, which contains a single page.

Section Contents

- 9.1.1. Insertion Operations without WAL
- 9.1.2. Insertion Operations and Database Recovery
- 9.1.3. Full-Page Writes

## 9.1.1. Insertion Operations without WAL

Every DBMS implements a shared buffer pool to provide efficient access to relation pages.

Figure 9.1 illustrates a scenario where data tuples are inserted into TABLE_A on a PostgreSQL server that does **not** implement WAL.

![](/images/postgres-internals/pgsql09-fig-9-01.webp)

#### Figure 9.1. Insertion operations without WAL.

- (1) When the first INSERT statement is issued, PostgreSQL loads the TABLE_A page from the database cluster into the shared buffer pool and inserts a tuple. This modified page is called a **dirty page**. The page is not written to storage immediately.
- (2) When the second INSERT statement is issued, PostgreSQL inserts a new tuple into the page in the buffer pool. The page still remains only in memory.
- (3) If the operating system or PostgreSQL server fails (e.g., due to a power failure), all inserted data in the memory is lost.

A database without WAL is therefore vulnerable to system failures.

** Historical Information

Before version 7.1, PostgreSQL performed synchronous disk writes by issuing a sync system call whenever a page changed in memory.

While this ensured durability, it resulted in poor performance for modification commands like INSERT, UPDATE and DELETE.

## 9.1.2. Insertion Operations and Database Recovery

PostgreSQL supports WAL to prevent data loss without compromising performance. This subsection describes key concepts, WAL data writing, and database recovery.

PostgreSQL records all modifications as history data in persistent storage. This history data is known as **XLOG records** or **WAL data**.

Change operations, such as insertion, deletion, or commit actions, write XLOG records into the in-memory **WAL buffer**. These records are flushed to a **WAL segment file** on storage when a transaction commits or aborts. (Other triggers for writing XLOG records are described in Section 9.5.) The **LSN (Log Sequence Number)** represents the unique ID and the specific location of an XLOG record within the transaction log.

When considering database recovery, an immediate question comes to mind: where exactly does PostgreSQL start recovering from? The answer is the **REDO point**. The REDO point is the location of the XLOG record written at the moment the latest **checkpoint** started. (Checkpoints are described in Section 9.7.) The recovery process and the checkpoint process are inseparable.

** Info

The WAL and checkpoint process were implemented at the same time in version 7.1.

Figure 9.2 and the following steps describe tuple insertion with WAL.

![](/images/postgres-internals/pgsql09-fig-9-02.webp)

#### Figure 9.2. Insertion operations with WAL.

** Notation

“TABLE_A’s LSN” shows the value of ‘pd_lsn’ within the page-header of TABLE_A. “Page’s LSN” is the same manner.

- (1) The **checkpointer** (a background process) periodically performs checkpointing. At the start of a checkpoint, it writes a **checkpoint record** containing the latest REDO point to the WAL segment.
- (2) When the first INSERT statement is issued, PostgreSQL loads the TABLE_A page into the shared buffer pool and inserts a tuple. It then writes an XLOG record of this statement into the WAL buffer at LSN_1 and updates the page header (pd_lsn) of TABLE_A from LSN_0 to to LSN_1.
- (3) When the transaction commits, PostgreSQL writes a commit XLOG record to the WAL buffer and flushes all records from LSN_1 to the WAL segment file.
- (4) When the second INSERT statement is issued, PostgreSQL inserts a new tuple, writes an XLOG record at LSN_2, and updates the TABLE_A’s LSN to LSN_2.
- (5) When this transaction commits, PostgreSQL flushes the XLOG records as in step (3).
- (6) If a system failure occurs, the data in the shared buffer pool is lost. However, all modifications have been persisted in the WAL segment files.

Upon restarting, PostgreSQL automatically enters recovery mode. It reads and replays XLOG records sequentially from the REDO point (Figure 9.3).

![](/images/postgres-internals/pgsql09-fig-9-03.webp)

#### Figure 9.3. Database recovery using WAL.

- (1) PostgreSQL reads the first INSERT XLOG record and loads the TABLE_A page from storage into the shared buffer pool.
- (2) Before replaying, PostgreSQL compares the LSN of the XLOG record with the LSN of the page. Replay rules are as follows: If the XLOG record’s LSN is newer (larger) than the page’s LSN, the data portion of the record is inserted into the page, and the page’s LSN is updated.
- If the XLOG record’s LSN is older (smaller), the record is skipped.

(3) PostgreSQL replays all remaining records in chronological order.

Although writing XLOG records certainly carries a minor cost, it pales in comparison to the overhead of writing entire modified pages. There is no doubt that the gained system failure tolerance is well worth the investment.

## 9.1.3. Full-Page Writes

If the operating system fails while a dirty page is being written, the page data on storage may become corrupted. XLOG records cannot be replayed on a corrupted page.

To handle this, PostgreSQL uses **full-page writes**. When enabled, PostgreSQL writes the entire page as an XLOG record during the first modification of that page after a checkpoint. This record is called a **backup block** (or **full-page image**).

Figure 9.4 illustrates insertion with full-page writes enabled.

![](/images/postgres-internals/pgsql09-fig-9-04.webp)

#### Figure 9.4. Full page writes.

- (1) The checkpointer starts a checkpoint.
- (2) The first INSERT statement triggers the creation of a **backup block** because it is the first modification of the page since the checkpoint.
- (3) The transaction commits and flushes the buffer as usual.
- (4) The second INSERT statement creates a standard XLOG record (not a backup block) because the page was already modified once since the checkpoint.
- (5) The transaction commits.
- (6) An operating system failure occurs while the checkpointer is writing the modified TABLE_A page to storage, resulting in a corrupted page on the storage disk.

Figure 9.5 illustrates the recovery process.

![](/images/postgres-internals/pgsql09-fig-9-05.webp)

#### Figure 9.5. Database recovery with backup block.

- (1) PostgreSQL reads the first XLOG record and loads the corrupted page into the buffer pool.
- (2) Since the record is a backup block, the entire page content is overwritten onto the corrupted page regardless of the LSN values. The page LSN is updated to LSN_1. This restores the corrupted page.
- (3) Subsequent non-backup blocks are replayed using the standard LSN comparison rule.

This mechanism ensures database recovery even if data write errors occur due to a crash.

** WAL, Backup, and Replication

As mentioned above, WAL prevents data loss due to process or operating system crashes. However, data is lost if a file system or media failure occurs. To address such failures, PostgreSQL provides [online backup](/book/postgres-internals/pgsql10/index) and [replication](/book/postgres-internals/pgsql11/index) features.

- Regular online backups allow the database to be restored from the most recent backup even after a media failure. However, changes made after the last backup cannot be restored using only that backup. For instance, even with a daily backup taken at 0:00, if a file system failure occurs at 8:00, all changes from 0:00 to the point of failure are lost.
- The synchronous replication feature stores all changes to another storage or host in real time. If a media failure occurs on the primary server, the data can be restored from the secondary server.

For more information, see Chapters [10](/book/postgres-internals/pgsql10/index), [11](/book/postgres-internals/pgsql11/index) and [12](/book/postgres-internals/pgsql12/index), respectively.

** Can Synchronous Replication Eliminate the Need for Backups?

No. Synchronous replication does not eliminate the need for backups.

DBMS operation requires addressing not only hardware or software failures but also data loss caused by human error or software bugs.

For instance, if critical data is accidentally deleted, the deletion is reflected immediately on the standby server. Similarly, if erroneous data is written due to a mistake, the error propagates instantly across all replication servers.

In such cases, replication cannot restore the lost or corrupted data. The only way to recover from these failures is by using backup data (+ archive logs).

# 9.2. Transaction Log and WAL Segment Files

Logically, PostgreSQL writes XLOG records into a virtual file with an 8-byte address space (16 Exabytes).

The transaction log capacity is effectively unlimited. While 8 bytes of address space is vast, managing a single file of this size is impossible. Therefore, PostgreSQL divides the transaction log into smaller files, typically 16 megabytes each. Each file is known as a **WAL segment**. See Figure 9.6.

** WAL segment file size

In versions 11 or later, the size of a WAL segment file is configurable via the [&ndash;wal-segsize](https://www.postgresql.org/docs/current/static/app-initdb.html) option when the PostgreSQL cluster is created using the `initdb` command.

![](/images/postgres-internals/pgsql09-fig-9-06.webp)

#### Figure 9.6. Transaction log and WAL segment files

The WAL segment filename is a 24-digit hexadecimal number. The naming rule is as follows:

$$ \text{WAL segment file name} = \text{timelineId} + (\text{uint32}) \frac{\text{LSN}-1}{16\text{M}*256} + ( \text{uint32})\left(\frac{\text{LSN}-1}{16\text{M}}\right) \% 256 $$ ** timelineId

PostgreSQL’s WAL utilizes the concept of a **timelineId** (a 4-byte unsigned integer) for Point-in-Time Recovery (PITR), which is described in [Chapter 10](/book/postgres-internals/pgsql10/index).

However, the timelineId remains fixed at 0x00000001 in this chapter to simplify the following descriptions.

The first WAL segment file is 000000010000000000000001. When XLOG records fill the first file, PostgreSQL provides the second file: 000000010000000000000002. Files are used in ascending order. After 0000000100000000000000FF is full, the file provided is 000000010000000100000000. In this way, the middle 8-digit number increases by one whenever the last 2 digits carry over.

Similarly, after 0000000100000001000000FF is full, PostgreSQL provides 000000010000000200000000, and so on.

** pg_xlogfile_name / pg_walfile_name

The built-in function pg_xlogfile_name (versions 9.6 or earlier) or pg_walfile_name (versions 10 or later) identifies the WAL segment file name containing a specified LSN.

An example is shown below:

```
testdb=# SELECT pg_xlogfile_name('1/00002D3E');  # In versions 10 or later, &#34;SELECT pg_walfile_name('1/00002D3E');&#34;
     pg_xlogfile_name
--------------------------
 000000010000000100000000
(1 row)
```

# 9.3. Internal Layout of WAL Segment

A WAL segment is a 16 MB file by default. It is internally divided into pages of 8192 bytes (8 KB). The first page contains a header defined by the `XLogLongPageHeaderData` structure.

In contrast, all subsequent pages contain page information defined by the `XLogPageHeaderData` structure. Following the page header, XLOG records are written into each page sequentially from the beginning. See Figure 9.7.

** ** XLogLongPageHeaderData

```python
typedef XLogPageHeaderData *XLogPageHeader;

/*
 * When the XLP_LONG_HEADER flag is set, we store additional fields in the
 * page header.  (This is ordinarily done just in the first page of an
 * XLOG file.)	The additional fields serve to identify the file accurately.
 */
typedef struct XLogLongPageHeaderData
{
	XLogPageHeaderData std;		/* standard header fields */
	uint64		xlp_sysid;		/* system identifier from pg_control */
	uint32		xlp_seg_size;	/* just as a cross-check */
	uint32		xlp_xlog_blcksz;	/* just as a cross-check */
} XLogLongPageHeaderData;
```

** ** XLogPageHeaderData

```python
/*
 * Each page of XLOG file has a header like this:
 */
#define XLOG_PAGE_MAGIC 0xD113	/* can be used as WAL version indicator */

typedef struct XLogPageHeaderData
{
	uint16		xlp_magic;		/* magic value for correctness checks */
	uint16		xlp_info;		/* flag bits, see below */
	TimeLineID	xlp_tli;		/* TimeLineID of first record on page */
	XLogRecPtr	xlp_pageaddr;	/* XLOG address of this page */

	/*
	 * When there is not enough space on current page for whole record, we
	 * continue on the next page.  xlp_rem_len is the number of bytes
	 * remaining from a previous page; it tracks xl_tot_len in the initial
	 * header.  Note that the continuation data isn't necessarily aligned.
	 */
	uint32		xlp_rem_len;	/* total len of remaining data for record */
} XLogPageHeaderData;
```

![](/images/postgres-internals/pgsql09-fig-9-07.webp)

#### Figure 9.7. Internal layout of a WAL segment file.

The XLogLongPageHeaderData structure and the XLogPageHeaderData structure are defined in [xlog_internal.h](https://github.com/postgres/postgres/blob/master/src/include/access/xlog_internal.h). The description of these structures is omitted here as they are not required for the following sections.

# 9.4. Internal Layout of XLOG Record

An XLOG record comprises a general header portion and associated data portions.

The first subsection describes the header structure. The remaining two subsections explain the data portion structures for versions 9.4 and earlier, and version 9.5 and later, respectively. (The data format changed in version 9.5 (2016).)

Section Contents

- 9.4.1. Header Portion of XLOG Record
- 9.4.2. Data Portion of XLOG Record (versions 9.4 or earlier)
- 9.4.3. Data Portion of XLOG Record (versions 9.5 or later)

## 9.4.1. Header Portion of XLOG Record

All XLOG records have a general header portion defined by the XLogRecord structure. The structure for version 9.4 and earlier is shown below:

```
typedef struct XLogRecord
{
   uint32          xl_tot_len;   /* total len of entire record */
   TransactionId   xl_xid;       /* xact id */
   uint32          xl_len;       /* total len of rmgr data. This variable was removed in ver.9.5. */
   uint8           xl_info;      /* flag bits, see below */
   RmgrId          xl_rmid;      /* resource manager for this record */
   /* 2 bytes of padding here, initialize to zero */
   XLogRecPtr      xl_prev;      /* ptr to previous record in log */
   pg_crc32        xl_crc;       /* CRC for this record */
} XLogRecord;
```

** The Header Portion of XLOG Record in versions 9.5 or later.

In versions 9.5 or later, the xl_len variable was removed from the XLogRecord structure to refine the format and reduce the size by a few bytes.

** ** XLogRecord

```
typedef struct XLogRecord
{
        uint32          xl_tot_len;             /* total len of entire record */
        TransactionId 	xl_xid;           	/* xact id */
        XLogRecPtr      xl_prev;                /* ptr to previous record in log */
        uint8           xl_info;                /* flag bits, see below */
        RmgrId          xl_rmid;                /* resource manager for this record */
        /* 2 bytes of padding here, initialize to zero */
        pg_crc32c       xl_crc;                 /* CRC for this record */
        /* XLogRecordBlockHeaders and XLogRecordDataHeader follow, no padding */
} XLogRecord;
```

Most variables are self-explanatory.

Both **xl_rmid** and **xl_info** relate to **resource managers**, which are collections of operations for the WAL feature, such as writing and replaying XLOG records. The number of resource managers tends to increase with each PostgreSQL version.

Table 9.1 lists the resource managers:

| Operation | Resource Manager |
| --- | --- |
| Heap Tuple Operations | RM_HEAP, RM_HEAP2 |
| Index Operations | RM_BTREE, RM_HASH, RM_GIN, RM_GIST, RM_SPGIST, RM_BRIN |
| Sequence Operations | RM_SEQ |
| Transaction Operations | RM_XACT, RM_MULTIXACT, RM_CLOG, RM_XLOG, RM_COMMIT_TS |
| Tablespace Operations | RM_SMGR, RM_DBASE, RM_TBLSPC, RM_RELMAP |
| Replication Operations | RM_STANDBY, RM_REPLORIGIN, RM_GENERIC_ID, RM_LOGICALMSG_ID |

Here are representative examples of how resource managers work:

- When an INSERT statement is executed, the header variables xl_rmid and xl_info are set to RM_HEAP and XLOG_HEAP_INSERT, respectively. During database recovery, PostgreSQL selects the heap_xlog_insert() function from RM_HEAP based on xl_info to replay the record.
- For an UPDATE statement, xl_info is set to XLOG_HEAP_UPDATE. The heap_xlog_update() function replays the record during recovery.
- When a transaction commits, xl_rmid and xl_info are set to RM_XACT and XLOG_XACT_COMMIT, respectively. The xact_redo_commit() function replays this record during recovery.

** Info

The XLogRecord structure in versions 9.4 or earlier is defined in [xlog.h](https://github.com/postgres/postgres/blob/REL9_4_STABLE/src/include/access/xlog.h), and in versions 9.5 or later, it is in [xlogrecord.h](https://github.com/postgres/postgres/blob/master/src/include/access/xlogrecord.h).

The heap_xlog_insert and heap_xlog_update functions are defined in [heapam.c](https://github.com/postgres/postgres/blob/master/src/backend/access/heap/heapam.c); xact_redo_commit is defined in [xact.c](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/xact.c).

## 9.4.2. Data Portion of XLOG Record (versions 9.4 or earlier)

The data portion of an XLOG record is classified as either a backup block (containing an entire page) or a non-backup block (containing data that varies by operation).

![](/images/postgres-internals/pgsql09-fig-9-08.webp)

#### Figure 9.8. Examples of XLOG records (versions 9.4 or earlier).

The internal layouts of XLOG records are described below using specific examples.

### 9.4.2.1. Backup Block

A backup block is shown in Figure 9.8(a). It consists of two data structures and one data object:

1. The XLogRecord structure (header portion).
2. The `BkpBlock` structure.
3. The entire page, excluding its free space.

The `BkpBlock` structure contains variables that identify the page in the database cluster (the relfilenode, the fork number of the relation, and the block number). It also stores the starting position and length of the page’s free space.

** ** BkpBlock

```
typedef struct BkpBlock @ include/access/xlog_internal.h
{
  RelFileNode node;        /* relation containing block */
  ForkNumber  fork;        /* fork within the relation */
  BlockNumber block;       /* block number */
  uint16      hole_offset; /* number of bytes before &#34;hole&#34; */
  uint16      hole_length; /* number of bytes in &#34;hole&#34; */

  /* ACTUAL BLOCK DATA FOLLOWS AT END OF STRUCT */
} BkpBlock;
```

### 9.4.2.2. Non-Backup Block

In non-backup blocks, the layout of the data portion differs depending on the operation. The XLOG record for an INSERT statement is explained here as a representative example. See Figure 9.8(b). In this case, the XLOG record consists of two data structures and one data object:

1. The XLogRecord (header portion) structure.
2. The `xl_heap_insert` structure.
3. The inserted tuple, with a few bytes removed.

The `xl_heap_insert` structure contains variables that identify the inserted tuple in the database cluster (the relfilenode of the table and the tuple’s TID) and a visibility flag for the tuple.

** ** xl_heap_insert

```
typedef struct BlockIdData
{
   uint16          bi_hi;
   uint16          bi_lo;
} BlockIdData;

typedef uint16 OffsetNumber;

typedef struct ItemPointerData
{
   BlockIdData     ip_blkid;
   OffsetNumber    ip_posid;
}

typedef struct RelFileNode
{
   Oid             spcNode;             /* tablespace */
   Oid             dbNode;              /* database */
   Oid             relNode;             /* relation */
} RelFileNode;

typedef struct xl_heaptid
{
   RelFileNode     node;
   ItemPointerData tid;                 /* changed tuple id */
} xl_heaptid;

typedef struct xl_heap_insert
{
   xl_heaptid      target;              /* inserted tuple id */
   bool            all_visible_cleared; /* PD_ALL_VISIBLE was cleared */
} xl_heap_insert;
```

** Info

The reason for removing a few bytes from the inserted tuple is described in the source code comment of the xl_heap_header structure:

> We don’t store the whole fixed part (HeapTupleHeaderData) of an inserted or updated tuple in WAL; we can save a few bytes by reconstructing the fields that are available elsewhere in the WAL record, or perhaps just plain needn’t be reconstructed.

One more example is shown here. See Figure 9.8(c).

The XLOG record for a checkpoint is simple and consists of two data structures:

1. The XLogRecord structure (header portion).
2. The CheckPoint structure, which contains checkpoint information (see Section 9.7 for details).

** Info

The xl_heap_header structure (versions 9.4 or earlier) is defined in [heapam_xlog.h](https://github.com/postgres/postgres/blob/REL9_4_STABLE/src/include/access/heapam_xlog.h), while the CheckPoint structure is defined in [pg_control.h](https://github.com/postgres/postgres/blob/REL9_4_STABLE/src/include/catalog/pg_control.h).

## 9.4.3. Data Portion of XLOG Record (versions 9.5 or later)

In versions 9.4 or earlier, XLOG records had no common format, so each resource manager defined its own. This made it increasingly difficult to maintain the source code and implement new WAL features.

To address this issue, version 9.5 introduced a common structured format independent of resource managers.

The data portion of an XLOG record consists of two parts: header and data. See Figure 9.9.

![](/images/postgres-internals/pgsql09-fig-9-09.webp)

#### Figure 9.9. Common XLOG record format.

The header part contains zero or more `XLogRecordBlockHeaders` and zero or one `XLogRecordDataHeaderShort` (or `XLogRecordDataHeaderLong`). It must contain at least one of these.

When a record stores a full-page image (FPI), the XLogRecordBlockHeader includes the `XLogRecordBlockImageHeader`. It also includes the `XLogRecordBlockCompressHeader` if the block is compressed.

** ** XLogRecordBlockHeader

```
/*
 * Header info for block data appended to an XLOG record.
 *
 * 'data_length' is the length of the rmgr-specific payload data associated
 * with this block. It does not include the possible full page image, nor
 * XLogRecordBlockHeader struct itself.
 *
 * Note that we don't attempt to align the XLogRecordBlockHeader struct!
 * So, the struct must be copied to aligned local storage before use.
 */
typedef struct XLogRecordBlockHeader
{
	uint8		id;				/* block reference ID */
	uint8		fork_flags;		/* fork within the relation, and flags */
	uint16		data_length;	/* number of payload bytes (not including page
								 * image) */

	/* If BKPBLOCK_HAS_IMAGE, an XLogRecordBlockImageHeader struct follows */
	/* If BKPBLOCK_SAME_REL is not set, a RelFileLocator follows */
	/* BlockNumber follows */
} XLogRecordBlockHeader;

/*
 * The fork number fits in the lower 4 bits in the fork_flags field. The upper
 * bits are used for flags.
 */
#define BKPBLOCK_FORK_MASK	0x0F
#define BKPBLOCK_FLAG_MASK	0xF0
#define BKPBLOCK_HAS_IMAGE	0x10	/* block data is an XLogRecordBlockImage */
#define BKPBLOCK_HAS_DATA	0x20
#define BKPBLOCK_WILL_INIT	0x40	/* redo will re-init the page */
#define BKPBLOCK_SAME_REL	0x80	/* RelFileLocator omitted, same as
									 * previous */
```

** ** XLogRecordBlockImageHeader

```python
/*
 * Additional header information when a full-page image is included
 * (i.e. when BKPBLOCK_HAS_IMAGE is set).
 *
 * The XLOG code is aware that PG data pages usually contain an unused &#34;hole&#34;
 * in the middle, which contains only zero bytes.  Since we know that the
 * &#34;hole&#34; is all zeros, we remove it from the stored data (and it's not counted
 * in the XLOG record's CRC, either).  Hence, the amount of block data actually
 * present is (BLCKSZ - <length of &#34;hole&#34; bytes>).
 *
 * Additionally, when wal_compression is enabled, we will try to compress full
 * page images using one of the supported algorithms, after removing the
 * &#34;hole&#34;. This can reduce the WAL volume, but at some extra cost of CPU spent
 * on the compression during WAL logging. In this case, since the &#34;hole&#34;
 * length cannot be calculated by subtracting the number of page image bytes
 * from BLCKSZ, basically it needs to be stored as an extra information.
 * But when no &#34;hole&#34; exists, we can assume that the &#34;hole&#34; length is zero
 * and no such an extra information needs to be stored. Note that
 * the original version of page image is stored in WAL instead of the
 * compressed one if the number of bytes saved by compression is less than
 * the length of extra information. Hence, when a page image is successfully
 * compressed, the amount of block data actually present is less than
 * BLCKSZ - the length of &#34;hole&#34; bytes - the length of extra information.
 */
typedef struct XLogRecordBlockImageHeader
{
	uint16		length;			/* number of page image bytes */
	uint16		hole_offset;	/* number of bytes before &#34;hole&#34; */
	uint8		bimg_info;		/* flag bits, see below */

	/*
	 * If BKPIMAGE_HAS_HOLE and BKPIMAGE_COMPRESSED(), an
	 * XLogRecordBlockCompressHeader struct follows.
	 */
} XLogRecordBlockImageHeader;

/* Information stored in bimg_info */
#define BKPIMAGE_HAS_HOLE		0x01	/* page image has &#34;hole&#34; */
#define BKPIMAGE_APPLY			0x02	/* page image should be restored
										 * during replay */
/* compression methods supported */
#define BKPIMAGE_COMPRESS_PGLZ	0x04
#define BKPIMAGE_COMPRESS_LZ4	0x08
#define BKPIMAGE_COMPRESS_ZSTD	0x10

#define	BKPIMAGE_COMPRESSED(info) \
	((info & (BKPIMAGE_COMPRESS_PGLZ | BKPIMAGE_COMPRESS_LZ4 | \
			  BKPIMAGE_COMPRESS_ZSTD)) != 0)
```

** ** XLogRecordBlockCompressHeader

```
/*
 * Extra header information used when page image has &#34;hole&#34; and
 * is compressed.
 */
typedef struct XLogRecordBlockCompressHeader
{
	uint16		hole_length;	/* number of bytes in &#34;hole&#34; */
} XLogRecordBlockCompressHeader;
```

** ** XLogRecordDataHeader

```
/*
 * XLogRecordDataHeaderShort/Long are used for the &#34;main data&#34; portion of
 * the record. If the length of the data is less than 256 bytes, the short
 * form is used, with a single byte to hold the length. Otherwise the long
 * form is used.
 *
 * (These structs are currently not used in the code, they are here just for
 * documentation purposes).
 */
typedef struct XLogRecordDataHeaderShort
{
	uint8		id;				/* XLR_BLOCK_ID_DATA_SHORT */
	uint8		data_length;	/* number of payload bytes */
}			XLogRecordDataHeaderShort;

#define SizeOfXLogRecordDataHeaderShort (sizeof(uint8) * 2)

typedef struct XLogRecordDataHeaderLong
{
	uint8		id;				/* XLR_BLOCK_ID_DATA_LONG */
	/* followed by uint32 data_length, unaligned */
}			XLogRecordDataHeaderLong;

#define SizeOfXLogRecordDataHeaderLong (sizeof(uint8) + sizeof(uint32))
```

The data part consists of zero or more block data and zero or one main data, which correspond to the XLogRecordBlockHeader(s) and the XLogRecordDataHeader, respectively.

** WAL compression

In versions 9.5 or later, full-page images within XLOG records can be compressed using the LZ method by setting “wal_compression = enable”. In that case, the XLogRecordBlockCompressHeader structure is added.

This feature provides two advantages: it reduces the I/O cost for writing records and suppresses the consumption of WAL segment files.

The disadvantage is the increased CPU resource consumption required for compression.

![](/images/postgres-internals/pgsql09-fig-9-10.webp)

#### Figure 9.10. Examples of XLOG records (versions 9.5 or later).

Some specific examples are shown below.

### 9.4.3.1. Backup Block

The backup block created by an INSERT statement is shown in Figure 9.10(a). It consists of four data structures and one data object:

1. The XLogRecord structure (header-portion).
2. The XLogRecordBlockHeader structure, including one XLogRecordBlockImageHeader structure.
3. The XLogRecordDataHeaderShort structure.
4. A backup block (block data).
5. The xl_heap_insert structure (main data).

The XLogRecordBlockHeader structure contains variables to identify the block in the database cluster (the relfilenode, the fork number, and the block number). The XLogRecordBlockImageHeader structure contains the length and offset number of this block.

These two header structures together store the same data as the BkBlock structure used until version 9.4.

#### Main Data Section

The XLogRecordDataHeaderShort structure stores the length of the xl_heap_insert structure, which serves as the main data of the record.

The content of the Main Data section in a WAL record containing an FPI varies depending on the operation. For example, an UPDATE statement adds structures such as xl_heap_lock or xl_heap_update.

In the context of WAL-based physical recovery, the data in the Main Data section of a backup block is redundant and remains unused, as the FPI itself provides the complete state of the page.

** Logical Replication

When *wal_level* is set to **logical**, the behavior changes: the actual tuple data is explicitly appended to the Main Data section, even if an FPI is present. See Figure 9.11.

![](/images/postgres-internals/pgsql09-fig-9-11.webp)

#### Figure 9.11. XLOG record with a Backup Block (wal_level = logical).

This design is crucial for **logical replication**. It allows the walsender to skip the physical FPI and directly decode the tuple information stored in the Main Data. Consequently, PostgreSQL achieves an efficient decoding process independent of the physical page layout.

This ensures high performance and consistent throughput even during “checkpoint spikes” when FPI generation is frequent.

### 9.4.3.2. Non-Backup Block

The non-backup block record created by an INSERT statement is shown in Figure 9.10(b). It consists of four data structures and one data object:

1. The XLogRecord structure (header-portion).
2. The XLogRecordBlockHeader structure.
3. The XLogRecordDataHeaderShort structure.
4. An inserted tuple (specifically, an xl_heap_header structure and the entire inserted data).
5. The `xl_heap_insert` structure (main data).

The XLogRecordBlockHeader structure contains three values (the relfilenode, the fork number, and the block number) to specify the target block, and the length of the inserted tuple’s data portion.

The XLogRecordDataHeaderShort structure contains the length of the xl_heap_insert structure.

The xl_heap_insert structure contains only two values: the offset number of the tuple within the block and a visibility flag. This structure is simplified because the XLogRecordBlockHeader now stores most of the data previously contained in xl_heap_insert.

** ** xl_heap_insert

```
typedef struct xl_heap_insert
{
        OffsetNumber	offnum;            /* inserted tuple's offset */
        uint8           flags;

        /* xl_heap_header & TUPLE DATA in backup block 0 */
} xl_heap_insert;
```

A checkpoint record is shown in Figure 9.10(c). It consists of three data structures:

1. The XLogRecord structure (header-portion).
2. The XLogRecordDataHeaderShort structure, which contains the main data length.
3. The CheckPoint structure (main data).

** Info

The xl_heap_header structure is defined in [htup.h](https://github.com/postgres/postgres/blob/master/src/include/access/htup.h) and the CheckPoint structure is defined in [pg_control.h](https://github.com/postgres/postgres/blob/master/src/include/catalog/pg_control.h).

The new XLOG format is optimized for parser efficiency, although it is more complex for human interpretation. Additionally, many XLOG record types are now smaller.

Figures 9.8 and 9.10 show the sizes of the main structures, allowing for the calculation and comparison of record sizes[1](#fn:1).

1. While the new checkpoint record is larger than the previous one, it includes more variables.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 9.5. Writing of XLOG Records

This section provides a comprehensive overview of the process for writing XLOG records.

First, consider the following statement to explore PostgreSQL internals:

```
testdb=# INSERT INTO tbl VALUES ('A');
```

Executing this statement invokes the internal function exec_simple_query().

The pseudocode of exec_simple_query() is shown below:

```python
exec_simple_query() @postgres.c

(1) ExtendCLOG() @clog.c                  /* Write the state of this transaction
                                           * &#34;IN_PROGRESS&#34; to the CLOG.
                                           */
(2) heap_insert()@heapam.c                /* Insert a tuple, creates a XLOG record,
                                           * and invoke the function XLogInsert.
                                           */
(3)   XLogInsert() @xloginsert.c (9.4 or earlier, xlog.c)
                                          /* Write the XLOG record of the inserted tuple
                                           *  to the WAL buffer, and update page's pd_lsn.
                                           */
(4) finish_xact_command() @postgres.c     /* Invoke commit action.*/
      XLogInsert() @xloginsert.c (9.4 or earlier, xlog.c)
                                          /* Write a XLOG record of this commit action
                                           * to the WAL buffer.
                                           */
(5)   XLogWrite() @xloginsert.c (9.4 or earlier, xlog.c)
                                          /* Write and flush all XLOG records on
                                           * the WAL buffer to WAL segment.
                                           */
(6) TransactionIdCommitTree() @transam.c  /* Change the state of this transaction
                                           * from &#34;IN_PROGRESS&#34; to &#34;COMMITTED&#34;
                                           * on the CLOG.
                                           */
```

The following descriptions explain each line of the pseudocode to illustrate XLOG record writing. Figures 9.12 and 9.13 provide visual representations of this process.

- (1) The function ExtendCLOG() writes the transaction state ‘IN_PROGRESS’ in the (in-memory) CLOG.
- (2) The function heap_insert() inserts a heap tuple into the target page in the shared buffer pool, creates the XLOG record for that page, and invokes XLogInsert().
- (3) The function XLogInsert() writes the XLOG record, created by heap_insert(), to the WAL buffer at LSN_1. It then updates the modified page’s pd_lsn from LSN_0 to LSN_1.
- (4) The function finish_xact_command() executes to commit this transaction. It creates the XLOG record for the commit action, and then XLogInsert() writes this record to the WAL buffer at LSN_2.

![](/images/postgres-internals/pgsql09-fig-9-12.webp)

#### Figure 9.12. Write-sequence of XLOG records.

- (5) The function XLogWrite() writes and flushes all XLOG records from the WAL buffer to the WAL segment file. If the [wal_sync_method](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-SYNC-METHOD) parameter is set to ‘open_sync’ or ‘open_datasync’, the records are written synchronously. In this case, the function writes all records using the open() system call with the ‘O_SYNC’ or ‘O_DSYNC’ flag. If the parameter is set to ‘fsync’, ‘fsync_writethrough’, or ‘fdatasync’, the system executes the respective system call: fsync(), fcntl() with the F_FULLFSYNC option, or fdatasync(). These calls ensure all XLOG records are written into storage.
- (6) The function TransactionIdCommitTree() changes the transaction state from ‘IN_PROGRESS’ to ‘COMMITTED’ on the CLOG.

![](/images/postgres-internals/pgsql09-fig-9-13.webp)

#### Figure 9.13. Write-sequence of XLOG records. (continued from Figure 9.12)

In the above example, the commit action triggered the writing of XLOG records to the WAL segment. However, such writing occurs in any of the following cases:

1. A running transaction commits or aborts.
2. The WAL buffer becomes full. (The WAL buffer size depends on the [wal_buffers](https://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-WAL-BUFFERS) parameter.)
3. A WAL writer process writes periodically. (See Section 9.6.1.)

If any of these occur, all WAL records in the WAL buffer are written into a WAL segment file regardless of the commit status of their transactions.

## 9.5.1. Remark on Writing XLOG records

DML (Data Manipulation Language) operations typically generate XLOG records, but non-DML operations can also create them.

For instance:

- A commit action writes an XLOG record containing the ID of the committed transaction.
- A checkpoint action writes an XLOG record containing general information about the checkpoint.

In special cases, even SELECT statements generate XLOG records:

- A SELECT FOR UPDATE statement generates XLOG records for all target tuple locks (**ROW SHARE LOCK**) [1](#fn:1).
- During Heap-Only Tuple (HOT) operations, the system writes XLOG records of tuple deletion and page defragmentation to the WAL buffer.

Additionally, if the [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) parameter is set to ‘replica’ or higher, PostgreSQL also records **ACCESS EXCLUSIVE LOCKS** as XLOG records. This occurs when an ACCESS EXCLUSIVE LOCK is explicitly acquired using the LOCK command, or when commands like DROP TABLE and TRUNCATE execute. Refer to Section 11.2.4 for details.

1. Users occasionally report unexpected increases in WAL segment consumption despite executing only SELECT commands. In such cases, check whether SELECT FOR UPDATE commands are running.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 9.6. WAL related processes

## 9.6.1. WAL Writer Process

The WAL writer is a background process that periodically checks the WAL buffer and writes all unwritten XLOG records to the WAL segments. This process helps avoid bursts of XLOG writing. If the WAL writer is not enabled, XLOG writing could become a bottleneck when a large amount of data is committed at once.

The WAL writer is enabled by default and cannot be disabled. The configuration parameter [wal_writer_delay](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-WRITER-DELAY) sets the check interval, which defaults to 200 milliseconds.

## 9.6.2. WAL Summarizer Process

Introduced in version 17 (2024) to support incremental backups (described in Section 10.5), the WAL summarizer process tracks changes to all database blocks, including relations and visibility maps.

It writes these modifications to WAL summary files in the `$PGDATA/pg_wal/summaries/` directory.

The [summarize_wal](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SUMMARIZE-WAL) configuration parameter enables this process; it is disabled by default.

Note that the WAL summarizer does **not track the free-space map fork** because it is not properly WAL-logged.

### 9.6.2.1. Outline of how WAL Summarizer process works

The WAL summarizer process operates as follows:

1. During each checkpoint, the process reads WAL segment files from the previous REDO point to the current REDO point.
2. The process tracks changes to all blocks of all relations (including visibility maps) using the WAL segment files.
3. The process writes the results to WAL summary files in the “pg_wal/summaries/” directory.

In this context, the “previous REDO point” and “current REDO point” are referred to as *start_lsn* and *end_lsn*, respectively.

The summary file name pattern is as follows:

- **Summary File Pattern**: `{Timeline}{start_lsn}{end_lsn}.summary`

The following is an example of summary files:

```bash
$ ls -1 $PGDATA/pg_wal/summaries/
00000001000000000100002800000000010B1D30.summary
0000000100000000010B1D300000000001473DE0.summary
000000010000000001473DE00000000001473EE0.summary
000000010000000001473EE0000000000147A8A8.summary
00000001000000000147A8A8000000000147A9A8.summary

... snip ...
```

The [pg_available_wal_summaries()](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-INFO-WAL-SUMMARY) function displays the WAL summaries:

```
testdb=# SELECT tli, start_lsn, end_lsn FROM pg_available_wal_summaries() ORDER BY start_lsn;
 tli | start_lsn  |  end_lsn
-----+------------+------------
   1 | 0/1000028  | 0/10B1D30
   1 | 0/10B1D30  | 0/1473DE0
   1 | 0/1473DE0  | 0/1473EE0
   1 | 0/1473EE0  | 0/147A8A8
   1 | 0/147A8A8  | 0/147A9A8

... snip ...
```

PostgreSQL removes summary files automatically after the period set by [wal_summary_keep_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-SUMMARY-KEEP-TIME) (default 10 days) has passed since their creation.

### 9.6.2.2. Contents of a Summary File

To illustrate the contents of a summary file, the following example creates four tables (t1, t2, t3, and t4), each consisting of four blocks.

```sql
testdb=# CREATE TABLE t1 (id int);
CREATE TABLE
testdb=# INSERT INTO t1 SELECT  GENERATE_SERIES(1, 800);
INSERT 0 800
testdb=# SELECT * FROM pg_freespace('t1');
 blkno | avail
-------+-------
     0 |     0
     1 |     0
     2 |     0
     3 |     0
(4 rows)

testdb=# CREATE TABLE t2 (id int);
CREATE TABLE
testdb=# INSERT INTO t2 SELECT  GENERATE_SERIES(1, 800);
INSERT 0 800
testdb=# CREATE TABLE t3 (id int);
CREATE TABLE
testdb=# INSERT INTO t3 SELECT  GENERATE_SERIES(1, 800);
INSERT 0 800
testdb=# CREATE TABLE t4 (id int);
CREATE TABLE
testdb=# INSERT INTO t4 SELECT  GENERATE_SERIES(1, 800);
INSERT 0 800
testdb=# CHECKPOINT;
CHECKPOINT
```

After a CHECKPOINT, the following operations are performed:

- [1] Update two rows in t1.
- [2] Insert 150 rows into t2.
- [3] Delete 300 rows from t3.
- [4] Truncate all rows from t4.
- [5] Create a new table t5 and insert 800 rows into it.

```sql
testdb=# -- [1] Update two rows to modify the blocks of t1
testdb=# UPDATE t1 SET id = id + 1000 WHERE id = 1 OR id = 200;
UPDATE 2
testdb=# -- [2] Insert 150 rows to modify the last block and add a new block
testdb=# INSERT INTO t2 SELECT GENERATE_SERIES(1, 150);
INSERT 0 150
testdb=# -- [3] Delete 500 rows to remove blocks
testdb=# DELETE FROM t3 WHERE id > 300;
DELETE 500
testdb=# -- [4] Truncate all blocks
testdb=# TRUNCATE t4;
TRUNCATE TABLE
testdb=# -- [5] Create new table
testdb=# CREATE TABLE t5 (id int);
CREATE TABLE
testdb=# INSERT INTO t5 SELECT  GENERATE_SERIES(1, 800);
INSERT 0 800
testdb=# CHECKPOINT;
CHECKPOINT
```

The [pg_wal_summary_contents(timeline, start_lsn, end_lsn)](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-INFO-WAL-SUMMARY) function shows all changed blocks between ‘start_lsn’ and ’end_lsn’. The output includes the filenode (OID), block number, fork number, and the ‘is_limit_block’ flag.

#### [1] Modified blocks

Two rows in table t1 are updated.

```sql
testdb=# UPDATE t1 SET id = id + 1000 WHERE id = 1 OR id = 200;
UPDATE 2
```

The pg_wal_summary_contents() function retrieves the summary data:

```
testdb=# SELECT p.relname, s.relforknumber, s.relblocknumber, s.is_limit_block
testdb-# 	FROM pg_wal_summary_contents(1, '0/1F4225F8', '0/1F476450') AS s, pg_class AS p
testdb-#  	WHERE s.relfilenode = p.oid AND p.relname = 't1';
 relname | relforknumber | relblocknumber | is_limit_block
---------+---------------+----------------+----------------
 t1      |             0 |              0 | f
 t1      |             0 |              3 | f
(2 rows)
```

The output indicates that the 0th and 3rd blocks of table t1 were modified.

Figure 9.14 illustrates these changes based on the summary data.

![](/images/postgres-internals/pgsql09-fig-9-14.webp)

#### Figure 9.14. The modification of table t1.

#### [2] Added blocks

Table t2 has 150 new rows added.

The 3rd block was modified, and a new 4th block was added.

```python
testdb=# SELECT p.relname, s.relforknumber, s.relblocknumber, s.is_limit_block
testdb-# 	FROM pg_wal_summary_contents(1, '0/1F4225F8', '0/1F476450') AS s, pg_class AS p
testdb-#  	WHERE s.relfilenode = p.oid AND p.relname = 't2';
 relname | relforknumber | relblocknumber | is_limit_block
---------+---------------+----------------+----------------
 t2      |             0 |              3 | f
 t2      |             0 |              4 | f
(2 rows)

testdb=# select * from pg_freespace('t2');
 blkno | avail
-------+-------
     0 |     0
     1 |     0
     2 |     0
     3 |     0
     4 |     0
(5 rows)
```

Figure 9.15 illustrates these additions.

![](/images/postgres-internals/pgsql09-fig-9-15.webp)

#### Figure 9.15. The modification of table t2.

#### [3] Removed blocks

When blocks are deleted after a certain block number, the process records the boundary block and sets **is_limit_block** to **true**. This limit block acts as a virtual termination block.

In table t3, 500 rows are deleted.

```python
testdb=# SELECT p.relname, s.relforknumber, s.relblocknumber, s.is_limit_block
testdb-# 	FROM pg_wal_summary_contents(1, '0/1F4225F8', '0/1F476450') AS s, pg_class AS p
testdb-#  	WHERE s.relfilenode = p.oid AND p.relname = 't3';
 relname | relforknumber | relblocknumber | is_limit_block
---------+---------------+----------------+----------------
 t3      |             0 |              2 | t
 t3      |             0 |              1 | f
 t3      |             0 |              0 | f
 t3      |             2 |              2 | t
 t3      |             2 |              0 | f
(5 rows)

testdb=# select * from pg_freespace('t3');
 blkno | avail
-------+-------
     0 |     0
     1 |  5472
(2 rows)
```

In this case, the 2nd block of table t3 is marked as the limit block by setting its is_limit_block to true; the corresponding visibility map (fork 2) is updated in the same manner.

Consequently, the output shows that the 2nd and 3rd blocks were removed, the 2nd block of t3’s visibility map was removed, and the remaining 0th and 1st blocks were modified.

Figure 9.16 illustrates these modifications.

![](/images/postgres-internals/pgsql09-fig-9-16.webp)

#### Figure 9.16. The modification of table t3.

#### [4] Truncated all blocks

When table t4 is truncated, the block number for all related blocks is set to 0, and **is_limit_block** is set to **true**.

```python
testdb=# SELECT p.relname, s.relforknumber, s.relblocknumber, s.is_limit_block
testdb-# 	FROM pg_wal_summary_contents(1, '0/1F4225F8', '0/1F476450') AS s, pg_class AS p
testdb-#  	WHERE s.relfilenode = p.oid AND p.relname = 't4';
 relname | relforknumber | relblocknumber | is_limit_block
---------+---------------+----------------+----------------
 t4      |             0 |              0 | t
 t4      |             2 |              0 | t
 t4      |             3 |              0 | t  <= fork_num 3 is a special number,
                                                  so the explanation is omitted here.
(3 rows)

testdb=# select * from pg_freespace('t4');
 blkno | avail
-------+-------
(0 rows)
```

Figure 9.17 illustrates the truncation.

![](/images/postgres-internals/pgsql09-fig-9-17.webp)

#### Figure 9.17. The modification of table t4.

The same result occurs when a DROP TABLE command is executed.

#### [5] Created new table

When a new table is created, the block number is set to 0, and **is_limit_block** is set to **true**.

For table t5, the summary initially contains the 0th block with is_limit_block set to true. Subsequent insertions then create blocks 0 through 3, with is_limit_block set to false.

```
testdb=# SELECT p.relname, s.relforknumber, s.relblocknumber, s.is_limit_block
testdb-# 	FROM pg_wal_summary_contents(1, '0/1F4225F8', '0/1F476450') AS s, pg_class AS p
testdb-#  	WHERE s.relfilenode = p.oid AND p.relname = 't5';
 relname | relforknumber | relblocknumber | is_limit_block
---------+---------------+----------------+----------------
 t5      |             0 |              0 | t
 t5      |             0 |              0 | f
 t5      |             0 |              1 | f
 t5      |             0 |              2 | f
 t5      |             0 |              3 | f
 t5      |             2 |              0 | f
(6 rows)
```

Figure 9.18 illustrates the creation and population of table t5.

![](/images/postgres-internals/pgsql09-fig-9-18.webp)

#### Figure 9.18. The modification of table t5.

# 9.7. Checkpoint Processing in PostgreSQL

In PostgreSQL, the checkpointer (background) process performs checkpoints. This process starts when one of the following events occurs:

1. The interval set in [checkpoint_timeout](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-CHECKPOINT-TIMEOUT) elapses since the previous checkpoint (the default is 300 seconds).
2. In versions 9.4 or earlier, the number of WAL segment files set in [checkpoint_segments](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-CHECKPOINT-SEGMENTS) is consumed since the previous checkpoint (the default is 3).
3. In versions 9.5 or later, the total size of WAL segment files in the `pg_wal` directory (or `pg_xlog` in versions 9.6 or earlier) exceeds the [max_wal_size](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-MAX-WAL-SIZE) value (the default is 1GB or 64 files).
4. The PostgreSQL server stops in *smart* or *fast* mode.
5. A superuser issues the [CHECKPOINT](https://www.postgresql.org/docs/current/sql-checkpoint.html) command manually.

** Info

In versions 9.1 or earlier, as mentioned in Section 8.6, the background writer process performed both checkpointing and dirty-page writing.

The following subsections describe the outline of checkpointing and the **pg_control** file, which holds metadata for the current checkpoint.

Section Contents

- 9.7.1. Outline of the Checkpoint Processing
- 9.7.2. pg_control File

## 9.7.1. Outline of the Checkpoint Processing

Checkpoint processing has two aspects: preparing for database recovery and cleaning dirty pages in the shared buffer pool.

Figure 9.19 shows an overview of the internal processing.

![](/images/postgres-internals/pgsql09-fig-9-19.webp)

#### Figure 9.19. Internal processing of PostgreSQL Checkpoint.

- (1) **Store the REDO point**: When a checkpoint starts, the checkpointer stores the REDO point in memory. The REDO point is the LSN of the XLOG record written at the moment the checkpoint began. Database recovery starts from this point.
- (2) **Flush shared memory**: The checkpointer flushes all data in shared memory (e.g., clog contents) to storage.
- (3) **Flush dirty pages**: The checkpointer gradually writes and flushes all dirty pages in the shared buffer pool to storage.
- (4) **Write the checkpoint record**: The checkpointer writes a XLOG record for this checkpoint to the WAL buffer. The `CheckPoint` structure defines the data portion of this record and contains variables such as the REDO point. The write location of the checkpoint record is called the *checkpoint*.
- (5) **Update pg_control**: The checkpointer updates the **pg_control file**. This file contains fundamental information, such as the checkpoint location.

** ** struct CheckPoint

```python
typedef struct CheckPoint
{
  XLogRecPtr      redo;           /* next RecPtr available when we began to
                                   * create CheckPoint (i.e. REDO start point) */
  TimeLineID      ThisTimeLineID; /* current TLI */
  TimeLineID      PrevTimeLineID; /* previous TLI, if this record begins a new
                                   * timeline (equals ThisTimeLineID otherwise) */
  bool            fullPageWrites; /* current full_page_writes */
  uint32          nextXidEpoch;   /* higher-order bits of nextXid */
  TransactionId   nextXid;        /* next free XID */
  Oid             nextOid;        /* next free OID */
  MultiXactId     nextMulti;      /* next free MultiXactId */
  MultiXactOffset nextMultiOffset;/* next free MultiXact offset */
  TransactionId   oldestXid;      /* cluster-wide minimum datfrozenxid */
  Oid             oldestXidDB;    /* database with minimum datfrozenxid */
  MultiXactId     oldestMulti;    /* cluster-wide minimum datminmxid */
  Oid             oldestMultiDB;  /* database with minimum datminmxid */
  pg_time_t       time;           /* time stamp of checkpoint */

 /*
  * Oldest XID still running. This is only needed to initialize hot standby
  * mode from an online checkpoint, so we only bother calculating this for
  * online checkpoints and only when wal_level is hot_standby. Otherwise
  * it's set to InvalidTransactionId.
  */
  TransactionId oldestActiveXid;
} CheckPoint;
```

## 9.7.2. pg_control File

The pg_control file is essential for database recovery because it contains fundamental checkpoint information. If this file is corrupted or unreadable, the recovery process cannot start because the starting point is missing.

While pg_control stores over 40 items, three items relevant to the next section are shown below:

- **State**: The state of the database server when the latest checkpoint started. Total seven states exist, including: **start up:** The system is starting up.
- **shut down:** The system is shutting down normally.
- **in production:** The system is running.

**Latest checkpoint location**: The LSN of the latest checkpoint record.

The pg_control file is stored in the `$PGDATA/global` subdirectory of the base directory. The [pg_controldata](https://www.postgresql.org/docs/current/app-pgcontroldata.html) utility displays its contents.

```bash
$ pg_controldata  $PGDATA
pg_control version number:            1300
Catalog version number:               202306141
Database system identifier:           7250496631638317596
Database cluster state:               in production
pg_control last modified:             Mon Jan 1 15:16:38 2024
Latest checkpoint location:           0/16AF0090
Latest checkpoint's REDO location:    0/16AF0090
Latest checkpoint's REDO WAL file:    000000010000000000000016

... snip ...
```

** Removal of Prior Checkpoint in PostgreSQL 11

Up until version 10, PostgreSQL maintained WAL segments containing the last two REDO points &mdash; “Latest Checkpoint’s REDO point” and “Prior Checkpoint’s REDO point”. This served as a precaution if the Latest REDO point became unreadable.

However, version 11 (2018) and later store only the Latest REDO point to conserve storage space. This change reflects improved storage reliability.

See [this thread](https://www.postgresql.org/message-id/E1eC87v-0008E6-Ih%40gemulon.postgresql.org) for more details.

# 9.8. Database Recovery in PostgreSQL

PostgreSQL implements redo log-based recovery. If the database server crashes, PostgreSQL restores the database cluster by sequentially replaying the XLOG records in the WAL segment files from the REDO point.

Database recovery has been discussed several times in previous sections. This section covers two additional aspects of recovery.

Section Contents

- 9.8.1. Recovery Processing
- 9.8.2. LSN Comparison and Idempotency

## 9.8.1. Recovery Processing

The first aspect is the start of the recovery process. When PostgreSQL starts up, it reads the pg_control file. The following details describe the recovery process from that point.

See Figure 9.20 and the following description.

![](/images/postgres-internals/pgsql09-fig-9-20.webp)

#### Figure 9.20. Details of the recovery process.

- (1) PostgreSQL reads all items in the pg_control file at startup. If the *state* item is ‘in production’, PostgreSQL enters recovery mode because the database was not shut down normally.
- If the state is ‘shut down’, PostgreSQL enters normal startup mode.

(2) PostgreSQL reads the latest checkpoint record from the appropriate WAL segment file using the location recorded in the pg_control file. It then retrieves the REDO point from that record.

(3) Resource managers read and replay XLOG records in sequence from the REDO point to the end of the latest WAL segment.

- If a replayed XLOG record is a backup block, the manager overwrites the corresponding table page regardless of its LSN.
- Otherwise, the manager replays a non-backup block XLOG record only if the record’s LSN is greater than the pd_lsn of the corresponding page.

## 9.8.2. LSN Comparison and Idempotency

The second point concerns LSN comparison: why the LSN of a non-backup block and the pd_lsn of the corresponding page must be compared.

This is explained using a specific example that emphasizes the need for this comparison. See Figures 9.21 and 9.22. (Note that the WAL buffer is omitted to simplify the description.)

![](/images/postgres-internals/pgsql09-fig-9-21.webp)

#### Figure 9.21. Insertion operations during the background writer working.

- (1) PostgreSQL inserts a tuple into TABLE_A and writes an XLOG record at LSN_1.
- (2) The checkpointer process writes the TABLE_A page to storage. At this point, the page’s pd_lsn is LSN_1.
- (3) PostgreSQL inserts a new tuple into TABLE_A and writes an XLOG record at LSN_2. The modified page is not yet written to storage.

In this scenario, unlike previous overview examples, the TABLE_A page has been written to storage once.

If the database is shut down in immediate mode and then started, the following recovery occurs:

![](/images/postgres-internals/pgsql09-fig-9-22.webp)

#### Figure 9.22. Database recovery.

- (1) PostgreSQL loads the first XLOG record and the TABLE_A page. It does not replay the record because the record’s LSN (LSN_1) is not greater than the page’s LSN (also LSN_1). There is no need to replay it.
- (2) Next, PostgreSQL replays the second XLOG record because the record’s LSN (LSN_2) is greater than the current pd_lsn of the TABLE_A page (LSN_1).

If the replay order of non-backup blocks is incorrect or if they are replayed more than once, the database cluster becomes inconsistent. This shows that the redo operation for non-backup blocks is **not idempotent**. To ensure the correct replay order, non-backup block records should only be replayed when their LSN is greater than the pd_lsn of the corresponding page.

In contrast, the redo operation for backup blocks is **idempotent**, meaning these blocks can be replayed multiple times regardless of their LSN.

# 9.9. WAL Segment Files Management

PostgreSQL writes XLOG records to WAL segment files stored in the pg_wal subdirectory (named pg_xlog in versions 9.6 or earlier). A new WAL segment file is switched in whenever the current file is filled. The number of WAL files varies based on configuration parameters and server activity.

Starting with version 9.4, Replication Slots can also control the number of WAL files based on replication status. Furthermore, version 9.5 introduced improvements to the management policy for WAL segment files.

The following subsections describe WAL segment file switching and basic management methods.

Section Contents

- 9.9.1. WAL Segment Switches
- 9.9.2. WAL Segment Management

## 9.9.1. WAL Segment Switches

WAL segment switches occur when any of the following events happen:

1. A WAL segment is filled.
2. The function [pg_switch_wal()](http://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-BACKUP) (or pg_switch_xlog() in older versions) is called.
3. The [archive_mode](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-ARCHIVE-MODE) parameter is enabled and the [archive_timeout](http://www.postgresql.org/docs/current/static/runtime-config-wal.html#GUC-ARCHIVE-TIMEOUT) interval has expired.

When a WAL segment file is switched, PostgreSQL usually recycles it (renames and reuses it) for future use. However, the file may be removed later if it is no longer needed.

## 9.9.2. WAL Segment Management

Whenever a checkpoint starts, PostgreSQL estimates and prepares the number of WAL segment files needed for the next checkpoint cycle. This estimate is based on the WAL consumption in previous checkpoint cycles.

The count of WAL segment files starts from the segment containing the REDO point. This value must be between [min_wal_size](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-MIN-WAL-SIZE) (defaulting to 80 MB, or 5 files) and [max_wal_size](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-MAX-WAL-SIZE) (defaulting to 1 GB, or 64 files).

When a checkpoint starts, PostgreSQL keeps or recycles the necessary WAL segment files and removes any unnecessary ones.

Figure 9.23 shows a specific example.

Assume six WAL segment files exist before a checkpoint starts, and WAL_3 contains the REDO point. If PostgreSQL estimates that five files are needed, WAL_1 is renamed to WAL_7 for recycling, and WAL_2 is removed.

** Info

Files older than the one containing the REDO point can be removed because the recovery mechanism described in Section 9.8 never requires them.

![](/images/postgres-internals/pgsql09-fig-9-23.webp)

#### Figure 9.23. Recycling and removing WAL segment files at a checkpoint.

If a spike in WAL activity requires more segments, PostgreSQL creates new WAL segment files as long as the total size remains below max_wal_size.

For example, in Figure 9.24, if WAL_7 is filled, WAL_8 is newly created.

![](/images/postgres-internals/pgsql09-fig-9-24.webp)

#### Figure 9.24. Creating WAL segment file.

The number of WAL segment files adapts to server activity. If the WAL write rate increases constantly, the estimated number of files and the total size gradually increase. Conversely, if the write rate decreases, these values decrease.

If the total size of the WAL segment files exceeds max_wal_size, a checkpoint starts. Figure 9.25 illustrates this situation. During the checkpoint, a new REDO point is created and the old REDO point is discarded; then, unnecessary old WAL segment files are recycled. In this way, PostgreSQL maintains only the WAL segment files required for database recovery.

![](/images/postgres-internals/pgsql09-fig-9-25.webp)

#### Figure 9.25. Checkpointing and recycling WAL segment files.

### 9.9.2.1. Other Factors

The [wal_keep_size](http://www.postgresql.org/docs/current/static/runtime-config-replication.html#GUC-WAL-KEEP-SIZE) parameter (or wal_keep_segments in versions 12 or earlier) and the [replication slot](http://www.postgresql.org/docs/current/static/warm-standby.html#STREAMING-REPLICATION-SLOTS) feature also affect the number of WAL segment files.

# 9.10. Continuous Archiving and Archive Logs

**Continuous archiving** is a feature that copies WAL segment files to an archival area whenever a WAL segment switch occurs. The *archiver (background)* process performs this task. The copied file is known as an **archive log**. This feature is typically utilized for hot physical backup and PITR (Point-in-Time Recovery), which are described in [Chapter 10](/book/postgres-internals/pgsql10/index).

The [archive_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-ARCHIVE-COMMAND) configuration parameter defines the path to the archival area. For example, the following setting copies WAL segment files to the directory `/home/postgres/archives/` at each segment switch:

```
archive_command = 'cp %p /home/postgres/archives/%f'
```

In this command, the `%p` placeholder represents the source WAL segment path, and the `%f` placeholder represents the archive log filename.

![When the WAL segment file WAL_7 is switched, the file is copied to the archival area as Archive log 7.](/images/postgres-internals/pgsql09-fig-9-26.webp)

#### Figure 9.26. Continuous archiving.

When the WAL segment file WAL_7 is switched, the file is copied to the archival area as Archive log 7.

The archive_command parameter accepts any Unix command or tool. This allows the use of *scp* or other backup tools to transfer archive logs to remote hosts, rather than relying on simple copy commands.

** archive_library

PostgreSQL versions 14 and earlier relied on shell commands for continuous archiving. However, version 15 introduced a loadable library feature to enable continuous archiving through library-based mechanisms.

For further details, consult the documentation on [archive_library](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-ARCHIVE-LIBRARY) and [basic_archive](https://www.postgresql.org/docs/current/basic-archive.html).

** Note

PostgreSQL does not automatically clean up archive logs, so administrators must manage these files. Without intervention, the number of archive logs grows continuously.

The [pg_archivecleanup](http://www.postgresql.org/docs/current/static/pgarchivecleanup.html) utility is a useful tool for managing archive log files.

Additionally, the *find* command can remove old archive logs. For instance, the following command deletes logs older than three days:

```bash
$ find /home/postgres/archives -mtime +3d -exec rm  -f {} \;
```
