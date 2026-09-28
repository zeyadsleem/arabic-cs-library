---
title: "Buffer Manager"
lang: en
---

# 8.1. Overview

This section introduces key concepts necessary to understand the descriptions in the subsequent sections.

Section Contents

- 8.1.1. Buffer Manager Structure
- 8.1.2. Buffer Tag
- 8.1.3. How a Backend Process Reads Pages
- 8.1.4. Page Replacement Algorithm
- 8.1.5. Flushing Dirty Pages

## 8.1.1. Buffer Manager Structure

The PostgreSQL buffer manager comprises a buffer table, buffer descriptors, and a buffer pool. The next section describes these components.

The **buffer pool** layer stores data file pages, such as tables and indexes, as well as freespace maps and visibility maps.

The buffer pool is an array where each slot stores one page of a data file. The indices of the buffer pool array are referred to as **buffer_id**s.

Sections 8.2 and 8.3 describe the details of the buffer manager internals. Sections 8.2 and 8.3 describe the details of the buffer manager internals.

## 8.1.2. Buffer Tag

In PostgreSQL, each page of all data files can be assigned a unique tag, i.e., a **buffer tag**. When the buffer manager receives a request, PostgreSQL uses the buffer_tag of the desired page.

```
typedef struct buftag
{
	Oid			spcOid;			/* tablespace oid */
	Oid			dbOid;			/* database oid */
	RelFileNumber relNumber;	/* relation file number */
	ForkNumber	forkNum;		/* fork number */
	BlockNumber blockNum;		/* blknum relative to begin of reln */
} BufferTag;
```

The buffer_tag consists of five values:

- **specOid:** The OID of the tablespace to which the relation belongs.
- **dbOid:** The OID of the database to which the relation belongs.
- **relNumber:** The number of the relation file that contains the target page.
- **blockNum:** The block number of the target page in the relation.
- **forkNum:** The fork number of the relation to which the page belongs. The fork numbers for tables, free space maps, and visibility maps are defined as 0, 1, and 2, respectively.

For example, the buffer_tag ‘{16821, 16384, 37721, 0, 7}’ identifies the seventh block of the table whose OID is 37721 and fork number is 0. This table is located in the database with OID 16384 under the tablespace with OID 16821.

Similarly, the buffer_tag ‘{16821, 16384, 37721, 1, 3}’ identifies the third block of the free space map whose OID is 37721 and fork number is 1.

## 8.1.3. How a Backend Process Reads Pages

This subsection describes how a backend process reads a page from the buffer manager (Figure 8.2).

![](/images/postgres-internals/pgsql08-fig-8-02.webp)

#### Figure 8.2. How a backend reads a page from the buffer manager.

- (1) When reading a table or index page, a backend process sends a request including the page’s buffer_tag to the buffer manager.
- (2) The buffer manager returns the buffer_id of the slot that stores the requested page. If the requested page is not in the buffer pool, the buffer manager loads the page from persistent storage into a buffer pool slot and then returns the buffer_id.
- (3) The backend process accesses the slot of the buffer_id to read the desired page.

When a backend process modifies a page in the buffer pool (e.g., by inserting tuples), the modified page is referred to as a **dirty page** because it has not yet been flushed to storage.

Section 8.4 describes buffer manager operations in more detail.

## 8.1.4. Page Replacement Algorithm

When all buffer pool slots are occupied and the requested page is not stored, the buffer manager must select a page in the buffer pool to be replaced. In computer science, these selection algorithms are called *page replacement algorithms*, and the selected page is referred to as a **victim page**.

Research on page replacement algorithms has been ongoing since the advent of computer science. Many algorithms have been proposed; PostgreSQL has used the **clock sweep** algorithm since version 8.1. Clock sweep is simpler and more efficient than the LRU algorithm used in previous versions.

Section 8.4.4 describes the details of clock sweep.

### 8.1.4.1. Historical Information

PostgreSQL relied on a simple LRU algorithm until version 7.4.

Version 8.0 (released on 19 January 2005) implemented [Adaptive Replacement Cache](https://en.wikipedia.org/wiki/Adaptive_replacement_cache) (ARC), but concerns arose over a potential violation of an IBM patent.

As a result, the PostgreSQL community replaced ARC with the [2Q](https://www.vldb.org/conf/1994/P439.PDF) algorithm in version 8.0.2 (7 April 2005), before subsequently adopting the clock sweep algorithm in version 8.1 (8 November 2005).

## 8.1.5. Flushing Dirty Pages

Dirty pages must eventually be flushed to storage. However, the buffer manager requires assistance to perform this task. In PostgreSQL, two background processes, the **checkpointer** and **background writer**, are responsible for this task.

Section 8.6 describes the checkpointer and background writer.

** Direct I/O

PostgreSQL versions 15 and earlier do not support direct I/O. Refer to [this article](http://www.postgresql.org/message-id/529E267F.4050700@agliodbs.com) on the pgsql-ML and [this article](http://lwn.net/Articles/580542/).

In version 16, the [debug_io_direct](https://www.postgresql.org/docs/current/runtime-config-developer.html#GUC-DEBUG-IO-DIRECT) option was added. This option allows developers to improve direct I/O use in PostgreSQL. If development proceeds successfully, PostgreSQL will officially support direct I/O in the near future.

# 8.2. Buffer Manager Structure

The PostgreSQL buffer manager comprises three layers: the buffer table, buffer descriptors, and buffer pool (Figure 8.3).

![](/images/postgres-internals/pgsql08-fig-8-03.webp)

#### Figure 8.3. Buffer manager's three-layer structure.

- **Buffer pool:** An array that stores data file pages. Each slot in the array is identified by a buffer_id.
- **Buffer descriptors:** An array of buffer descriptors. Each descriptor has a one-to-one correspondence to a buffer pool slot and holds the metadata of the page stored in that slot.
- **Buffer table:** A hash table that stores the relationship between the buffer_tags of stored pages and the buffer_ids of the descriptors holding their metadata.

Note: The term “buffer descriptors layer” is adopted for convenience in this documentation.

Section Contents

- 8.2.1. Buffer Table
- 8.2.2. Buffer Descriptor
- 8.2.3. Buffer Descriptors Layer
- 8.2.4. Buffer Pool

## 8.2.1. Buffer Table

A buffer table logically divides into three parts: a hash function, hash bucket slots, and data entries (Figure 8.4).

The built-in hash function maps buffer_tags to hash bucket slots. Even though hash bucket slots outnumber buffer pool slots, collisions may occur. Therefore, the buffer table uses *separate chaining with linked lists* to resolve collisions. When data entries map to the same bucket slot, this method stores them in the same linked list (Figure 8.4).

![](/images/postgres-internals/pgsql08-fig-8-04.webp)

#### Figure 8.4. Buffer table.

A data entry comprises two values: the buffer_tag of a page and the buffer_id of the descriptor holding that page’s metadata. For example, the entry ‘Tag_A, id=1’ indicates that the descriptor with buffer_id ‘1’ stores metadata for the page tagged with Tag_A.

### 8.2.1.1. Hash Function

The hash function is a composite of [calc_bucket()](https://doxygen.postgresql.org/dynahash_8c.html#ae802f2654df749ae0e0aadf4b5c5bcbd) and [hash()](https://doxygen.postgresql.org/rege__dfa_8c.html#a6aa3a27e7a0fc6793f3329670ac3b0cb).

The following is its representation as a pseudo-function:

```
uint32 bucket_slot = calc_bucket(unsigned hash(BufferTag buffer_tag), uint32 bucket_size)
```

## 8.2.2. Buffer Descriptor

A buffer descriptor holds the metadata of the page stored in the corresponding buffer pool slot. The `BufferDesc` structure defines this descriptor (see [buf_internals.h](https://github.com/postgres/postgres/blob/master/src/include/storage/buf_internals.h)).

```python
/*
 * Flags for buffer descriptors
 */
#define BM_LOCKED		(1U << 22)	/* buffer header is locked */
#define BM_DIRTY		(1U << 23)	/* data needs writing */
#define BM_VALID		(1U << 24)	/* data is valid */
#define BM_TAG_VALID		(1U << 25)	/* tag is assigned */
#define BM_IO_IN_PROGRESS	(1U << 26)	/* read or write in progress */
#define BM_IO_ERROR		(1U << 27)	/* previous I/O failed */
#define BM_JUST_DIRTIED		(1U << 28)	/* dirtied since write started */
#define BM_PIN_COUNT_WAITER	(1U << 29)	/* have waiter for sole pin */
#define BM_CHECKPOINT_NEEDED	(1U << 30)	/* must write for checkpoint */
#define BM_PERMANENT		(1U << 31)	/* permanent buffer (not unlogged,
						 * or init fork) */

#define PG_HAVE_ATOMIC_U32_SUPPORT
typedef struct pg_atomic_uint32
{
	volatile uint32 value;
} pg_atomic_uint32;

typedef struct BufferDesc
{
	BufferTag	tag;			/* ID of page contained in buffer */
	int		buf_id;			/* buffer's index number (from 0) */

	/* state of the tag, containing flags, refcount and usagecount */
	pg_atomic_uint32 state;

	int		wait_backend_pgprocno;	/* backend of pin-count waiter */
	int		freeNext;		/* link in freelist chain */
	PgAioWaitRef	io_wref;		/* set iff AIO is in progress */
	LWLock		content_lock;	/* to lock access to buffer contents */
} BufferDesc;
```

The main fields include:

- **tag:** Holds the `buffer_tag` of the stored page.
- **buf_id:** Identifies the descriptor.
- **content_lock:** A light-weight lock for page access. Refer to Section 8.3.2 for details.
- **freeNext:** A pointer for the freelist.
- **state:** A single 32-bit field that holds three variables: *flags*, *usage_count*, and *refcount*.

Figure 8.5 illustrates the components of the state field: flags (10 bits), usage_count (4 bits), and refcount (18 bits).

![](/images/postgres-internals/pgsql08-fig-8-05.webp)

#### Figure 8.5. Structure of the state field in BufferDesc.

### 8.2.2.1. Details of the state field

The variables in the **state** field are as follows:

- **flags:** Stores several states of the page. The primary states are as follows: **dirty bit (BM_DIRTY):** Indicates the page is dirty.
- **valid bit (BM_VALID):** Indicates the page is valid and can be read or written.
- **io_in_progress bit (BM_IO_IN_PROGRESS):** Indicates whether the buffer manager is currently reading or writing the page to storage.

- **usage_count:** Tracks the number of times the page has been accessed since being loaded. The page replacement algorithm, described in Section 8.4.2, uses this value. (This value is capped at $15$ (= $2^{4} - 1$) because the page replacement algorithm functions optimally within this range.)
- **refcount** (also called pin count): Holds the number of PostgreSQL processes currently accessing the page. A process must increment this value (refcount++) when accessing the page and decrement it (refcount--) afterward. The page is **unpinned** if the refcount is zero; otherwise, it is **pinned**.

### 8.2.2.2. Operations on the state field

CPU atomic operations update these variables to ensure efficiency.

** Atomic Operations

An atomic operation executes as a single, indivisible unit without interruption. This ensures consistency when multiple processes access the same value concurrently without explicit locks.

For example, to change the *usage_count*, the system masks the relevant bits and updates the entire 32-bit state at once using an atomic operation. This approach improves performance by avoiding spinlock acquisition for these updates.

Henceforth, this documentation expresses operations on these variables in simplified form. For example, incrementing refcount is expressed as “refcount++”, similar to a regular C variable.

** Historical Information

Until version 9.5, flags, usage_count, and refcount were separate variables. Operations used a spinlock to avoid conflicts with other processes.

For example, each time usage_count was incremented, the system acquired a spinlock as follows:

```
LockBufHdr(bufferdesc); /* Acquire a spinlock */
bufferdesc->usage_count++;
UnlockBufHdr(bufferdesc); /* Release the spinlock */
```

### 8.2.2.3. Descriptor States

For simplicity, this documentation defines three descriptor states:

- **Empty:** The corresponding buffer pool slot does not store a page (refcount and usage_count are 0).
- **Pinned:** The slot stores a page and at least one process is accessing it (refcount $\ge$ 1).
- **Unpinned:** The slot stores a page but no processes are currently accessing it (usage_count $\ge$ 1, but refcount is 0).

The following colored boxes represent these states in subsequent figures:

In the following figures, buffer descriptors’ states are represented by coloured boxes.

- (white): Empty
- (blue): Pinned
- (aqua blue): Unpinned

In addition, a dirty page is denoted as 'X'. For example, an unpinned dirty descriptor is represented by X .

## 8.2.3. Buffer Descriptors Layer

An array of buffer descriptors forms the buffer descriptors layer.

When the PostgreSQL server starts, all buffer descriptors are ’empty’. These descriptors form a linked list called the **freelist** (Figure 8.6).

![](/images/postgres-internals/pgsql08-fig-8-06.webp)

#### Figure 8.6. Buffer manager initial state.

** Note

The **freelist** in PostgreSQL is a different concept from the freelists in Oracle.

The PostgreSQL freelist is simply a linked list of empty buffer descriptors. In PostgreSQL, **freespace maps (FSM)**, described in Section 5.3.4, serve the same purpose as the Oracle freelists.

Figure 8.7 shows how the first page is loaded.

![](/images/postgres-internals/pgsql08-fig-8-07.webp)

#### Figure 8.7. Loading the first page.

- (1) Retrieve an empty descriptor from the top of the freelist and pin it (i.e., increase its refcount and usage_count by 1).
- (2) Insert a new entry into the buffer table to map the tag of the first page to the buffer_id of the retrieved descriptor.
- (3) Load the new page from storage into the corresponding buffer pool slot.
- (4) Save the metadata of the new page to the retrieved descriptor.

The second and subsequent pages are loaded in a similar manner. Section 8.4.1.2 provides additional details.

Descriptors retrieved from the freelist always hold page metadata. These non-empty descriptors do not return to the freelist once used. However, the corresponding descriptors return to the freelist and their state is set to ’empty’ when one of the following occurs:

1. Tables or indexes are dropped.
2. Databases are dropped.
3. Tables or indexes are cleaned up using the VACUUM FULL command.

** Why empty descriptors comprise the freelist?

The freelist allows for the immediate retrieval of the first descriptor. This is a common practice for dynamic memory resource allocation. For more information, refer to [this description](https://en.wikipedia.org/wiki/Free_list).

The buffer descriptors layer contains an unsigned 32-bit integer variable, **nextVictimBuffer**. This variable is used the page replacement algorithm, described in Section 8.4.2.

## 8.2.4. Buffer Pool

The buffer pool is a simple array that stores data file pages, such as tables and indexes. The indices of the buffer pool array are called buffer_ids.

The buffer pool slot size is 8 KB, which is equal to the page size. Therefore, each slot can store an entire page.

# 8.3. Buffer Manager Locks

The buffer manager uses many locks for various purposes. This section describes the locks necessary for the explanations in subsequent sections.

** Note

The locks described in this section are part of a synchronization mechanism for the buffer manager. They do **not** relate to SQL statements or SQL options.

Section Contents

- 8.3.1. Buffer Table Locks
- 8.3.2. content_lock

## 8.3.1. Buffer Table Locks

**BufMappingLock** protects the data integrity of the entire buffer table. It is a light-weight lock usable in both shared and exclusive modes. A backend process holds a shared BufMappingLock when searching an entry in the buffer table. The process holds an exclusive lock when inserting or deleting entries.

The BufMappingLock is split into partitions to reduce contention (the default is 128 partitions). Each BufMappingLock partition guards a portion of the hash bucket slots.

Figure 8.8 shows the effect of splitting BufMappingLock. Two backend processes can simultaneously hold different BufMappingLock partitions in exclusive mode to insert new data entries. If BufMappingLock were a single system-wide lock, one process would have to wait for the other to finish.

![](/images/postgres-internals/pgsql08-fig-8-08.webp)

#### Figure 8.8. Two processes simultaneously acquire the respective partitions of BufMappingLock in exclusive mode to insert new data entries.

** Historical Information

The BufMappingLock was introduced in version 8.1 (2005). Until version 9.4 (2014), the BufMappingLock was split into 16 partitions by default.

Before the introduction of BufMappingLock, PostgreSQL used [BufMgrLock](https://github.com/postgres/postgres/blob/REL8_0_STABLE/src/backend/storage/buffer/buf_init.c). This giant lock mechanism had to be acquired whenever the shared buffer was accessed, which resulted in poor concurrency.

## 8.3.2. content_lock

Each buffer descriptor uses a lightweight lock, **content_lock**, to control access to the page stored in the buffer pool slot.

The content_lock is a typical lock that enforces access restrictions. It can be used in *shared* and *exclusive* modes.

A backend process acquires a shared content_lock of the buffer descriptor when reading a page.

An exclusive content_lock is acquired when performing the following tasks:

- Inserting rows (tuples) into the stored page or changing the t_xmin/t_xmax fields of tuples within the page.
- Physically removing tuples or compacting free space on the stored page.
- Freezing tuples within the stored page.

The official [README](https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README) file provides more details.

# 8.4. Buffer management mechanisms

The buffer manager abstracts the mechanism of reading and writing block data from or to storage, allowing the executor to access data seamlessly.

This section explains the internal mechanism, focusing specifically on how PostgreSQL reads a target page of a relation table.

Section 8.4.1 describes the basic operation of the buffer manager using an example of reading a single page, and Section 8.4.2 explains the page replacement algorithm (clock sweep). Sections 8.4.3 and 8.4.5 provide details on the ring buffer &mdash; used for reading or writing a large table &mdash; and the local buffer.

Because the sequential scan mechanism has changed significantly with the introduction of Asynchronous I/O (AIO), Section 8.5 explains its details.

Section Contents

- 8.4.1. Reading A Single Page
- 8.4.2. Page Replacement Algorithm: Clock Sweep
- 8.4.3. Ring Buffer
- 8.4.4. Temporary Tables and Local Buffer Management

## 8.4.1. Reading A Single Page

This section considers the process of reading a single page.

In this case, when a backend process requires access to a specific page, it calls the ReadBuffer() function.

The behavior of ReadBuffer() depends on three logical cases. The following subsections describe each case.

### 8.4.1.1. Accessing a Page Stored in the Buffer Pool

This subsection describes the simplest case: the desired page is already stored in the buffer pool. In this case, the buffer manager performs the following steps (refer to Figure 8.9):

- (1) Create the buffer_tag of the desired page (e.g., Tag_C) and compute the hash bucket slot.
- (2) Acquire the BufMappingLock partition that covers the hash bucket slot in shared mode. This lock is released in step (5).
- (3) Look up the entry with Tag_C and obtain the buffer_id (e.g., buffer_id 2) from that entry.
- (4) Pin the buffer descriptor for buffer_id 2 by increasing its **refcount** and **usage_count** by 1.
- (5) Release the BufMappingLock.
- (6) Access the buffer pool slot with buffer_id 2.

![](/images/postgres-internals/pgsql08-fig-8-09.webp)

#### Figure 8.9. Accessing a page stored in the buffer pool.

When reading rows from the page, the PostgreSQL process acquires the shared *content_lock* of the corresponding buffer descriptor. This lock allows multiple processes to read the buffer pool slot simultaneously.

When inserting, updating, or deleting rows, a Postgres process acquires the *exclusive content_lock* of the corresponding buffer descriptor. The process must also set the BM_DIRTY bit of the page to 1.

After accessing the page, the PostgreSQL process decreases the **refcount** of the corresponding buffer descriptor by 1.

(Note that the usage_count remains unchanged once it reaches 15, as it is capped by its 4-bit width.)

#### Pseudocode

The following pseudocode illustrates this process:

```
ReadBuffer()
    StartReadBuffer()

        PinBufferForBlock()

            BufferAlloc(blockNum)
                /* (1) */
                buffer_tag = InitBufferTag(specOid, dbOid, relNumber, blockNum, forkNum);
                /* (2) */
                LWLockAcquire(partitionLock, LW_SHARED);
                /* (3) */
                buf_id = BufTableLookup(buffer_tag);
                bufDesc = GetBufferDescriptor(buf_id);
                /* (4) */
                PinBuffer(bufDesc);
                /* (5) */
                LWLockRelease(partitionLock);
                return bufDesc;

            return BufferDescriptorGetBuffer(bufDesc);

    return buf_id;
```

When reading a single page, PostgreSQL invokes the `ReadBuffer()` function, which sequentially calls `StartReadBuffer()`, `PinBufferForBlock()` and `BufferAlloc()`.

The BufferAlloc() function internally executes the operations on the buffer descriptor (steps (1) to (5)).

** Versions 16 or Earlier

Before introducing AIO, the ReadBuffer() function was simpler, as shown below:

```
ReadBuffer()

    BufferAlloc(blockNum)
        /* (1) */
        buffer_tag = InitBufferTag(specOid, dbOid, relNumber, blockNum, forkNum);
        /* (2) */
        LWLockAcquire(partitionLock, LW_SHARED);
        /* (3) */
        buf_id = BufTableLookup(buffer_tag);
        bufDesc = GetBufferDescriptor(buf_id);
        /* (4) */
        PinBuffer(bufDesc);
        /* (5) */
        LWLockRelease(partitionLock);
        return bufDesc;

    return buf_id;
```

The same applies to the pseudocode within this section from here on; that is, ReadBuffer() directly calls BufferAlloc() without going through StartReadBuffer(), or PinBufferForBlock().

### 8.4.1.2. Loading a Page from Storage to Empty Slot

In this second case, assume that the buffer pool does not contain the desired page and the freelist has free elements (empty descriptors).

The buffer manager performs the following steps (refer to Figure 8.10):

- (1) Look up the buffer table (assume the entry is not found). Create the buffer_tag of the desired page (in this example, the buffer_tag is Tag_E) and compute the hash bucket slot.
- Acquire the BufMappingLock partition in shared mode.
- Look up the buffer table. (Not found according to the assumption.)
- Release the BufMappingLock.
- (2) Obtain an empty buffer descriptor from the freelist. In this example, the buffer_id of the obtained descriptor is 4.
- (3) Acquire the BufMappingLock partition in exclusive mode. (This lock is released in step (5).)
- (4) Create a new data entry that comprises the buffer_tag Tag_E and buffer_id 4. Insert the created entry into the buffer table, and pin the buffer descriptor.
- (5) Release the BufMappingLock.
- (6) Load the desired page data from storage to the buffer pool slot with buffer_id 4 as follows: Set the BM_IO_IN_PROGRESS bit of the corresponding descriptor to 1 to prevent access by other processes.
- Load the desired page data from storage to the buffer pool slot.
- Update the state of the corresponding descriptor: set the BM_IO_IN_PROGRESS bit to 0 and the BM_VALID bit to 1.
- (7) Access the buffer pool slot with buffer_id 4.

![](/images/postgres-internals/pgsql08-fig-8-10.webp)

#### Figure 8.10. Loading a page from storage to an empty slot.

When loading a single page from storage, PostgreSQL synchronously reads it regardless of the io_method configuration parameter.

#### Pseudocode

The following pseudocode illustrates this process.

```
ReadBuffer()
    StartReadBuffer()

        PinBufferForBlock()

            BufferAlloc(blockNum)

                /* (1) Lookup but not found */
                buffer_tag = InitBufferTag(specOid, dbOid, relNumber, blockNum, forkNum);
                LWLockAcquire(partitionLock, LW_SHARED);
                BufTableLookup(buffer_tag);
                LWLockRelease(partitionLock);

                /* (2) Get empty buffer */
                buf_id = GetVictimBuffer();
                bufDesc = GetBufferDescriptor(buf_id);

                /* (3) */
                LWLockAcquire(partitionLock, LW_EXCLUSIVE);

                /* (4) */
                BufTableInsert(buffer_tag, bufDesc->buf_id);
                PinBuffer(bufDesc);

                /* (5) */
                LWLockRelease(partitionLock);
                return bufDesc;

        /* (6) load page */
        AsyncReadBuffers()
            StartBufferIO()                 /* BM_IO_IN_PROGRESS = 1 */
	    pgaio_io_perform_synchronously()
                read()
                TerminateBufferIO(bufDesc); /* BM_IO_IN_PROGRESS = 0; BM_VALID = 1 */

    return bufDesc;
```

** Versions 16 or Earlier

```
ReadBuffer()

    BufferAlloc()
        /* (1) Lookup but not found */
        buffer_tag = InitBufferTag(specOid, dbOid, relNumber, blockNum, forkNum);
        LWLockAcquire(partitionLock, LW_SHARED);
        BufTableLookup(buffer_tag);
        LWLockRelease(partitionLock);

        /* (2) Get empty buffer */
        buf_id = GetVictimBuffer();
        bufDesc = GetBufferDescriptor(buf_id);

        /* (3) */
        LWLockAcquire(partitionLock, LW_EXCLUSIVE);

        /* (4) */
        BufTableInsert(buffer_tag, bufDesc->buf_id);
        PinBuffer(bufDesc);

        /* (5) */
        LWLockRelease(partitionLock);

        StartBufferIO(bufDesc);        /*  BM_IO_IN_PROGRESS = 1 */
        return bufDesc;

    /* (6) */
    read();                     /* e.g., preadv() on Linux */
    TerminateBufferIO(bufDesc); /*  BM_IO_IN_PROGRESS = 0; BM_VALID = 1 */

   return bufDesc;
```

### 8.4.1.3. Loading a Page from Storage to a Victim Buffer Pool Slot

Assume that all buffer pool slots are occupied, but the buffer pool does not store the desired page. The buffer manager performs the following steps (refer to Figures 8.11 and 8.12):

- (1) Create the buffer_tag of the desired page and look up the buffer table. In this example, the buffer_tag is Tag_M and is not found in the table.
- (2) Select a victim buffer pool slot using the clock-sweep algorithm. Obtain the old entry, which contains the buffer_id of the victim pool slot, from the buffer table. Pin the victim pool slot in the buffer descriptors layer. In this example, the buffer_id of the victim slot is 5 and the old entry is ‘Tag_F, id=5’.
- (3) Flush (write and fsync) the victim page data if it is dirty; otherwise proceed to step (4). The dirty page must be written to storage before overwriting with new data. Flushing a dirty page is performed by FlushBuffer() function as follows: Acquire the shared content_lock of the descriptor with buffer_id 5 (released in step 6).
- Change the states of the corresponding descriptor; the BM_IO_IN_PROGRESS bit is set to 1 and the BM_JUST_DIRTIED bit is set to 0.
- Invoke the XLogFlush() function to write WAL data on the WAL buffer to the current WAL segment file (details are omitted; WAL and the XLogFlush() function are described in [Chapter 9](/book/postgres-internals/pgsql09/index).
- Flush the victim page data to storage.
- Change the states of the corresponding descriptor; the BM_IO_IN_PROGRESS bit is set to 0 and the BM_VALID bit is set to 1.
- Release the content_lock.
- (4) Acquire the old BufMappingLock partition that covers the slot that contains the old entry, in exclusive mode.
- (5) Acquire the new BufMappingLock partition and insert the new entry to the buffer table: Create the new entry comprised of the new buffer_tag Tag_M and the victim’s buffer_id.
- Acquire the new BufMappingLock partition that covers the slot containing the new entry in exclusive mode.
- Insert the new entry to the buffer table.

![](/images/postgres-internals/pgsql08-fig-8-11.webp)

#### Figure 8.11. Loading a page from storage to a victim buffer pool slot.

- (6) Delete the old entry from the buffer table, and release the old BufMappingLock partition.
- (7) Load the desired page data from the storage to the victim buffer slot. Then, update the flags of the descriptor with buffer_id 5; the BM_DIRTY bit is set to 0 and other bits are initialized.
- (8) Release the new BufMappingLock partition.
- (9) Access the buffer pool slot with buffer_id 5.

![](/images/postgres-internals/pgsql08-fig-8-12.webp)

#### Figure 8.12. Loading a page from storage to a victim buffer pool slot (continued from Figure 8.11).

## 8.4.2. Page Replacement Algorithm: Clock Sweep

This section describes the clock-sweep algorithm. This algorithm is a variant of NFU (Not Frequently Used) with low overhead; it selects less frequently used pages efficiently.

Imagine buffer descriptors form a circular list (Figure 8.13). The nextVictimBuffer, an unsigned 32-bit integer, always points to one of the buffer descriptors and rotates clockwise. The pseudocode and description of the algorithm follow:

#### Pseudocode: clock-sweep

```
    WHILE true
(1)    Obtain the candidate buffer descriptor pointed by the nextVictimBuffer
(2)    IF the candidate descriptor is 'unpinned' THEN
(3)       IF the candidate descriptor's usage_count == 0 THEN
             BREAK WHILE LOOP  /* the corresponding slot of this descriptor */
                               /* is victim slot.                           */
          ELSE
             Decrease the candidate descriptpor's usage_count by 1
          END IF
       END IF
(4)    Advance nextVictimBuffer to the next one
    END WHILE
(5) RETURN buffer_id of the victim
```

- (1) Obtain the candidate buffer descriptor pointed by nextVictimBuffer.
- (2) If the candidate buffer descriptor is *unpinned*, proceed to step (3). Otherwise, proceed to step (4).
- (3) If the usage_count of the candidate descriptor is 0, select the corresponding slot of this descriptor as a victim and proceed to step (5). Otherwise, decrease this descriptor’s usage_count by 1 and proceed to step (4).
- (4) Advance the nextVictimBuffer to the next descriptor (wrap around if at the end) and return to step (1). Repeat until a victim is found.
- (5) Return the buffer_id of the victim.

### 8.4.2.1. Example

Figure 8.13 shows a specific example. The buffer descriptors are blue or cyan boxes, and the numbers in the boxes indicate the usage_count of each descriptor.

![](/images/postgres-internals/pgsql08-fig-8-13.webp)

#### Figure 8.13. Clock Sweep.

- (1) The nextVictimBuffer points to the first descriptor (buffer_id 1). This descriptor is skipped because it is pinned.
- (2) The nextVictimBuffer points to the second descriptor (buffer_id 2). This descriptor is unpinned, but its usage_count is 2. Thus, the usage_count decreases by 1, and the nextVictimBuffer advances to the third candidate.
- (3) The nextVictimBuffer points to the third descriptor (buffer_id 3). This descriptor is unpinned and its usage_count is 0. Thus, this descriptor becomes the victim in this round.

Whenever the nextVictimBuffer sweeps an unpinned descriptor, the usage_count decreases by 1. Therefore, if unpinned descriptors exist in the buffer pool, this algorithm always finds a victim with a usage_count of 0 by rotating the nextVictimBuffer.

## 8.4.3. Ring Buffer

PostgreSQL uses a ring buffer instead of the buffer pool when reading or writing a large table. The ring buffer is a small, temporary buffer area.

It is allocated in shared memory when any of the following conditions is met:

1. **Bulk-reading:** The relation size exceeds one-quarter of the buffer pool size (shared_buffers/4). In this case, the ring buffer size is 256 KB.
2. **Bulk-writing:** The following SQL commands are executed. In these cases, the ring buffer size is 16 MB: [COPY FROM](http://www.postgresql.org/docs/current/static/sql-copy.html) command.
3. [CREATE TABLE AS](http://www.postgresql.org/docs/current/static/sql-createtableas.html) command.
4. [CREATE MATERIALIZED VIEW](http://www.postgresql.org/docs/current/static/sql-creatematerializedview.html) or [REFRESH MATERIALIZED VIEW](http://www.postgresql.org/docs/current/static/sql-refreshmaterializedview.html) command.
5. [ALTER TABLE](http://www.postgresql.org/docs/current/static/sql-altertable.html) command.
6. **Vacuum-processing:** An autovacuum process performs vacuuming. In this case, the ring buffer size is 256 KB.

PostgreSQL releases the ring buffer immediately after use.

The benefit of the ring buffer is clear. If a backend process reads a large table without a ring buffer, the operation may evict all pages in the buffer pool, reducing the cache hit ratio. The ring buffer prevents this by providing a dedicated temporary area for large tables.

** Why the default ring buffer size for bulk-reading and vacuum processing is 256 KB?

The [README](https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README) in the buffer manager’s source directory explains the reason:

> For sequential scans, a 256 KB ring is used. That’s small enough to fit in L2 cache, which makes transferring pages from OS cache to shared buffer cache efficient. Even less would often be enough, but the ring must be big enough to accommodate all pages in the scan that are pinned concurrently. (snip)

When multiple backends access the same relation concurrently, they share the ring buffer.

Figure 8.14 illustrates how two backends access a ring buffer during a sequential scan:

![](/images/postgres-internals/pgsql08-fig-8-14.webp)

#### Figure 8.14. Sharing the Ring Buffer with Two Backends.

1. Backend_1 creates and accesses a ring buffer to read a table.
2. Backend_1 and Backend_2 access the table pages loaded into the shared ring buffer. Backend_2 starts its sequential scan from the middle of the table.
3. After Backend_1 completes its scan, Backend_2 continues scanning the rest of the table, starting from the beginning and proceeding to the middle.

## 8.4.4. Temporary Tables and Local Buffer Management

When a backend creates a temporary table, the buffer manager allocates a private memory area and creates a local buffer.

Shared buffer bucket slots use positive numbers. In contrast, local buffer bucket slots use negative numbers (e.g., -1, -2). This distinction allows the backend to access both regular and temporary tables seamlessly.

Managing local buffers does not require locks because only the owner backend accesses them. Additionally, local buffers do not require WAL logging or checkpointing.

# 8.5. Asynchronous I/O in PostgreSQL

PostgreSQL 18 (2025) introduced the Asynchronous I/O (AIO) feature to improve read performance.

The buffer manager, therefore, has been refactored, especially for cases where the executor performs **sequential scans**, **bitmap heap scans**, or **vacuum processes** that read target pages sequentially. (AIO in PostgreSQL does not support asynchronous writing yet.)

This section explains the basic concept of AIO, describes its implementation, and details its operation, focusing on Sequential Scan.

Additionally, the [Appendix 2](../pgsqlappendix/02.html#a-2) provides sample io_uring programs for readers unfamiliar with the framework.

Section Contents

- 8.5.1. Asynchronous I/O
- 8.5.2. AIO Implementation in PostgreSQL
- 8.5.3. Basic Concept of Asynchronous Sequential Scan
- 8.5.4. Actual Implementation of Asynchronous Sequential Scan

** Evaluating AIO Benchmark Results

Numerous benchmarks and blog posts emphasize the performance improvements of AIO following its introduction in PostgreSQL.

However, PostgreSQL’s AIO implementation primarily optimizes sequential block reads for sequential scans and similar operations; it is not used for index scans. Its benefit is greatest when the buffer pool is cold. As the buffer pool warms up and the cache hit rate increases, the benefit gradually diminishes.

Therefore, benchmark results obtained only under cold-cache conditions may significantly overestimate the real-world impact of AIO.

## 8.5.1. Asynchronous I/O

Figure 8.15 compares the execution flow of conventional synchronous reads and asynchronous reads. (The page cache is omitted to simplify the explanation.)

![](/images/postgres-internals/pgsql08-fig-8-15.webp)

#### Figure 8.15. Synchronous and Asynchronous Reads.

- **Synchronous Read:** Figure 8.15 [1] &mdash; an application issues a read() system call, waits until the operation finishes, and then issues the next request. Consequently, multiple read operations run sequentially.
- **Asynchronous Read:** Figure 8.15 [2] &mdash; an application can submit multiple read requests without waiting for each individual request to complete. The OS processes these requests in the background, and the application later collects the results.

### 8.5.1.1. Benefits of AIO

Asynchronous I/O provides performance benefits for the application and the storage.

- **Application:** Applications can execute other tasks while waiting for read operations to complete.
- **Storage:** The effect is significant for SSDs. SSDs can internally process multiple I/O requests in parallel, achieving high throughput when many read requests are issued simultaneously. This benefit stems from the multiple queues and high queue depths in NVMe SSDs.

Due to these benefits, PostgreSQL can issue many page read requests at once, allowing the OS and modern SSDs to exploit their internal parallelism. As a result, buffer pool loading and large table scans achieve significantly higher throughput.

## 8.5.2. AIO Implementation in PostgreSQL

PostgreSQL provides two implementations of asynchronous I/O: **io_uring** and **io_worker** background workers.

These can be chosen by the [io_method](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-IO-METHOD) configuration parameter. Since io_uring is a Linux-specific feature, other operating systems, such as macOS and BSD, must select io_worker.

### 8.5.2.1. io_uring

[io_uring](https://kernel.dk/io_uring.pdf) is an asynchronous I/O interface introduced in Linux kernel 5.1 (2019).

When using io_uring, PostgreSQL creates a pair of shared ring buffers called the **Submission Queue (SQ)** and **Completion Queue (CQ)**. These queues are shared between user space and the kernel.

The flow of an asynchronous read operation using io_uring is shown below (Figure 8.16 [1]):

![](/images/postgres-internals/pgsql08-fig-8-16.webp)

#### Figure 8.16. Concepts of io_uring and io_worker.

- (1) **Prepare and Submit Requests:** PostgreSQL prepares one or more read requests, as described below, and enqueues them into the SQ. PostgreSQL then submits these requests to the kernel.
- (2) **Execute Request:** The kernel retrieves requests from the SQ and performs the requested reads, utilizing storage-level parallelism. The retrieved data is copied directly into the specified buffer pool slot via DMA (Direct Memory Access). When a read operation completes, the kernel enqueues a completion event (CQE) into the CQ.
- (3) **Wait Completions:** PostgreSQL waits for the CQ to receive completed requests. Once a completion event is found, PostgreSQL can read the page that has been loaded into the target buffer pool slot.

Readers unfamiliar with io_uring programing can refer to the [Appendix](../pgsqlappendix/02.html#a-2) for simple examples.

#### Read Request

From the perspective of PostgreSQL, a read request is a pair consisting of a database-specific page identifier (BufferTag) and a buffer pool slot identifier (buffer_id).

When using io_uring, PostgreSQL translates these identifiers into standard OS parameters: the target file descriptor (fd), the physical byte offset, the read size (8 KB), and the destination memory address (a specific buffer pool slot).

#### Vector I/O (Scatter-Gather I/O)

Linux and Unix support vectored I/O (via readv() and writev()), which allows multiple contiguous blocks to be read from or written to a file using a single system call.

io_uring also supports vectored I/O, allowing PostgreSQL to read multiple contiguous relation blocks with a single read request.

As shown in Figure 8.17, when PostgreSQL reads contiguous blocks, it prepares a single system call (io_uring_prep_readv()) instead of executing a separate system call for each individual block:

![](/images/postgres-internals/pgsql08-fig-8-17.webp)

#### Figure 8.17. io_uring with Vector I/O (Scatter-Gather I/O).

- (1) **Prepare and Submit:** The backend prepares and submits a single vectored read request for relation blocks 0-3, specifying the destination buffer pool slots (buffer_ids 3, 1, 4, and 7).
- (2) **Execute Request:** The kernel reads the requested blocks into the specified buffer pool slots.
- (3) **Wait Completions:** PostgreSQL waits for a single completion event before processing the loaded pages.

During a Sequential Scan, PostgreSQL typically reads contiguous relation blocks. Vectored I/O combines these blocks into a single read request, reducing system call overhead and requiring only a single completion event.

[Appendix 2.2](../pgsqlappendix/02.html#a-2-2) provides a simple io_uring program using Vector I/O.

### 8.5.2.2. io_worker

For operating systems that do not support io_uring (such as macOS, BSD, and Solaris), PostgreSQL provides an alternative implementation called **io_worker** (Figure 8.16 [2]). One or more io_worker background worker processes execute I/O requests.

In io_worker mode, PostgreSQL creates its own SQ and CQ structures in shared memory.

Backend processes prepare read requests into the SQ and submit them for execution. The io_worker background processes retrieve these requests, perform the reads, and enqueue completion events into the CQ.

Compared with io_uring:

- The io_worker background workers execute I/O requests using conventional synchronous read system calls. Although multiple workers may process requests concurrently, the achievable parallelism and scalability are generally lower than with io_uring.
- Request execution requires coordination between backend processes and io_worker processes through shared-memory queues and process wakeups. As a result, additional communication and scheduling overheads are incurred.

** The number of io_workers

In version 18, the number of I/O workers was fixed to the value specified by the [io_workers](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-IO-WORKERS) parameter.

Starting with version 19, the number of I/O workers can be dynamically adjusted via the following parameters: [io_min_workers](https://www.postgresql.org/docs/19/runtime-config-resource.html#GUC-IO-MIN-WORKERS), [io_max_workers](https://www.postgresql.org/docs/19/runtime-config-resource.html#GUC-IO-MAX-WORKERS), [io_worker_idle_timeout](https://www.postgresql.org/docs/19/runtime-config-resource.html#GUC-IO-WORKER-IDLE-TIMEOUT), and [io_worker_launch_interval](https://www.postgresql.org/docs/19/runtime-config-resource.html#GUC-IO-WORKER-LAUNCH-INTERVAL).

## 8.5.3. Basic Concept of Asynchronous Sequential Scan

The following subsections explain Sequential Scan using AIO.

Although this mechanism relies on simple functions, combining multiple components for performance optimization makes it complex. Therefore, this explanation is divided into two stages:

1. This subsection describes the basic behavior of an AIO-based Sequential Scan in a highly simplified setting. To focus on the core mechanism, this model assumes a cold-start scenario where the buffer pool caches no pages and storage contains all data to be read.
2. The next subsection builds upon this foundation by incorporating the omitted features to present the full implementation details.

While the pseudocode in Section 8.4 focused on low-level buffer descriptor processing, the following explanation operates at a higher level of abstraction:

- BufferAlloc() abstracts all buffer descriptor management excluding the physical read operation; lower-level functions are omitted.
- Details such as PIN processing are also omitted.
- do_exec(tuple) abstracts all tuple processing, such as WHERE-clause filter evaluation and incremental computation of aggregation functions.

### 8.5.3.1. ReadStream Mechanism and stream_buffers Abstraction

The basic strategy of an AIO-based Sequential Scan is straightforward:

- Process the pages of the target table sequentially from the beginning. Read-ahead a certain number of blocks asynchronously in advance.

The buffer manager tracks and manages these read-ahead blocks using a dedicated data structure called the `ReadStream` structure.

** ** ReadStream

```
typedef struct InProgressIO
{
    int16       buffer_index;
    ReadBuffersOperation op;
} InProgressIO;

/*
 * State for managing a stream of reads.
 */
struct ReadStream
{
    int16       max_ios;
    int16       io_combine_limit;
    int16       ios_in_progress;
    int16       queue_size;
    int16       max_pinned_buffers;
    int16       forwarded_buffers;
    int16       pinned_buffers;

    /*
     * Limit of how far, in blocks, to look-ahead for IO combining and for
     * read-ahead.
     *
     * The limits for read-ahead and combining are handled separately to allow
     * for IO combining even in cases where the I/O subsystem can keep up at a
     * low read-ahead distance, as doing larger IOs is more efficient.
     *
     * Set to 0 when the end of the stream is reached.
     */
    int16       combine_distance;
    int16       readahead_distance;
    uint16      distance_decay_holdoff;
    int16       initialized_buffers;
    int16       resume_readahead_distance;
    int16       resume_combine_distance;
    int         read_buffers_flags;
    bool        sync_mode;      /* using io_method=sync */
    bool        batch_mode;     /* READ_STREAM_USE_BATCHING */
    bool        advice_enabled;
    bool        temporary;

    /* scan stats counters */
    IOStats    *stats;

    /*
     * One-block buffer to support 'ungetting' a block number, to resolve flow
     * control problems when I/Os are split.
     */
    BlockNumber buffered_blocknum;

    /*
     * The callback that will tell us which block numbers to read, and an
     * opaque pointer that will be pass to it for its own purposes.
     */
    ReadStreamBlockNumberCB callback;
    void       *callback_private_data;

    /* Next expected block, for detecting sequential access. */
    BlockNumber seq_blocknum;
    BlockNumber seq_until_processed;

    /* The read operation we are currently preparing. */
    BlockNumber pending_read_blocknum;
    int16       pending_read_nblocks;

    /* Space for buffers and optional per-buffer private data. */
    size_t      per_buffer_data_size;
    void       *per_buffer_data;

    /* Read operations that have been started but not waited for yet. */
    InProgressIO *ios;
    int16       oldest_io_index;
    int16       next_io_index;

    bool        fast_path;

    /* Circular queue of buffers. */
    int16       oldest_buffer_index;    /* Next pinned buffer to return */
    int16       next_buffer_index;  /* Index of next buffer to pin */
    Buffer      buffers[FLEXIBLE_ARRAY_MEMBER];  /* typedef int Buffer;  */
};
```

ReadStream consists of an array named `buffers[]` and various internal metadata. This array acts as a circular FIFO queue with an active window size defined by *combine_distance*, as illustrated in Figure 8.18 [1]. An array index named *oldest_buffer_index* tracks the head of this queue, which represents the oldest unconsumed buffer.

![](/images/postgres-internals/pgsql08-fig-8-18.webp)

#### Figure 8.18. Actual implementation of ReadStream's buffer array and its simplified stream_buffers representation.

Throughout this document, to abstract away the low-level pointer arithmetic of the ring buffer, this entire FIFO queue mechanism is represented simply as `stream_buffers` (Figure 8.18 [2]).

#### Enqueue Operation

Figure 8.19 illustrates the enqueue operation, comparing its low-level implementation with the high-level stream_buffers representation.

![](/images/postgres-internals/pgsql08-fig-8-19.webp)

#### Figure 8.19. Enqueue operation in the actual implementation and its simplified representation.

Consider loading the 2nd block (0-indexed) of a relation table into the 5th slot of the buffer pool.

In this case, the corresponding buffer descriptor is also allocated in the 5th slot of the buffer descriptor layer. At this moment, the buffer manager stores the integer value $5$ into the buffers[] array at the position currently pointed to by *oldest_buffer_index*.

In the stream_buffers representation, it stores the buffer descriptor itself (indicated by the block number $2$ in Figure 8.19 [2]).

#### Dequeue Operation

Figure 8.20 details the dequeue operation, showing how an element is removed from both the actual ring buffer and the abstract representation.

![](/images/postgres-internals/pgsql08-fig-8-20.webp)

#### Figure 8.20. Dequeue operation in the actual implementation and its simplified representation.

As shown in Figure 8.20 [1], when the head buffer identifier is dequeued, the *oldest_buffer_index* advances one slot to the right. The total number of remaining buffers tracked by *pinned_buffers* decreases accordingly.

In the stream_buffers representation (Figure 8.20 [2]), this dequeue operation is represented by deleting the leftmost element from the list.

** Determination of Queue Size

The [read_stream_begin_impl()](https://github.com/postgres/postgres/blob/cdae794af31b3e9cfc323fc654292d86fa746f77/src/backend/storage/aio/read_stream.c#L759) function calculates the value of queue_size based on configuration parameters such as [effective_io_concurrency](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-EFFECTIVE-IO-CONCURRENCY) and [io_combine_limit](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-IO-COMBINE-LIMIT).

The calculation of queue_size begins with the following maximum value:

$$ \begin{align*} \text{queue_size} = (\text{effective_io_concurrency} + 2) \times \frac{\text{io_combine_limit}}{\text{BLCKSZ}} + 1 \end{align*} $$

where $\text{BLCKSZ}$ is the block size, which defaults to 8 kB.

Depending on the conditions and other parameters, the actual queue_size may decrease.

### 8.5.3.2. Core AIO Operations

This subsection defines functions that encapsulate basic AIO operations.

#### Buffer Allocation and Enqueueing

`read_ahead()` function allocates buffer descriptors for the target relation’s blocks and enqueues them into stream_buffers.

```
stream_buffers   = []
combine_distance = N

/* Simple Version */
read_ahead(stream_buffers, combine_distance, blockNum)
    offset = 0
    while stream_buffers.pinned_buffers < combine_distance
        bufDesc = BufferAlloc(blockNum + offset)
        offset += 1
        bufDesc.state.IO_IN_PROGRESS = 1
        stream_buffers.enqueue(bufDesc)
```

Because this subsection assumes that the backend must read all pages from storage, the logic is simplified:

- Repeat until the number of pinned_buffers reaches combine_distance: Call BufferAlloc() to obtain a pinned buffer descriptor.
- Set the state of the buffer descriptor to IO_IN_PROGRESS and enqueue it into stream_buffers.

#### Preparing and Submitting Asynchronous Read Requests

`prepare_and_submit()` function prepares and submits asynchronous read requests for the buffer descriptors newly enqueued by read_ahead().

Because a Sequential Scan reads contiguous blocks, it utilizes Vector I/O (Scatter-Gather I/O) to combine multiple blocks into a single read request (see [Appendix 2.2](../pgsqlappendix/02.html#a-2-2) for details).

```
/* Simple Version */
prepare_and_submit(stream_buffers)
    /* submits a Vector I/O read for the newly added buffers */
    submit(stream_buffers)
```

#### Waiting for Asynchronous Read Completion

`WaitReadBuffers()` function waits for the completion of a specific I/O operation and marks the corresponding buffers as valid.

```
/* Simple Version */
WaitReadBuffers(stream_buffers)
    wait_cqe(stream_buffers)       /* block until read completes */
    for each bufDesc in stream_buffers
        bufDesc.state.IO_IN_PROGRESS = 0
        bufDesc.state.VALID          = 1
```

### 8.5.3.3. Sequential Scan With AIO

Using the functions defined above, the pseudocode below shows the basic behavior of an AIO-based Sequential Scan.

```python
ExecSeqScan()
    stream_buffers   = []
    combine_distance = 4
    blockNum         = 0
    /* Initialize stream_buffers and submit read request for the first round. */
(1) read_ahead(stream_buffers, combine_distance, blockNum)
    prepare_and_submit(stream_buffers)

(2) while blockNum <= last_block

        /* Dequeue the next buffer descriptor from stream_buffers */
(3)     current_buf = stream_buffers.dequeue()

(4)     if current_buf.state.IO_IN_PROGRESS == 1
            /* The buffer is still being read from storage. */
            WaitReadBuffers(stream_buffers)

        /* Read-ahead blocks and submit the read request if stream_buffers is empty. */
        if stream_buffers.pinned_buffers == 0
(5)         read_ahead(stream_buffers, combine_distance, blockNum)
            prepare_and_submit(stream_buffers)

        /* Process tuples of current_page */
(6)     for each tuple in current_buf
            do_exec(tuple)

        blockNum += 1
```

- (1) For the first round, read-ahead combine_distance (= 4) pages, enqueue them into stream_buffers, and submit an asynchronous read request for those pages.
- (2) Process the pages of the target table sequentially.
- (3) Dequeue the next buffer descriptor from stream_buffers.
- (4) If the current buffer descriptor’s block is still being read from storage, call WaitReadBuffers() and wait until the read completes.
- (5) When stream_buffers becomes empty, read-ahead the next batch of blocks and submit the read request. This timing yields the AIO benefit: the OS performs the next read asynchronously while the backend processes the tuples of the current page.
- (6) Process all tuples contained in current_buf.

Figure 8.21 illustrates this sequence assuming all pages are read from storage.

![](/images/postgres-internals/pgsql08-fig-8-21.webp)

#### Figure 8.21. Simplified Model of Asynchronous Sequential Scan.

- **Previous Round:** At the end of the round, stream_buffers becomes empty. Therefore, read_ahead() enqueues the next four blocks ($n$, $n+1$, $n+2$, $n+3$), and prepare_and_submit() submits the asynchronous read request.
- Immediately after the submission, the backend processes the tuples of the last block of the previous round (blockNum = $n-1$). This tuple processing runs concurrently with the OS read operation for blocks $n$ through $n+3$.

**Current Round:**

1. **Processing blockNum = $n$:** stream_buffers.dequeue() returns the buffer descriptor for block $n$, which is still IO_IN_PROGRESS.
2. WaitReadBuffers() waits until the read completes.
3. Upon completion, WaitReadBuffers() marks all four blocks ($n$, $n+1$, $n+2$, $n+3$) as VALID in one step.
4. The backend then processes the tuples of block $n$.
5. **Processing blockNum = $n+1$, $n+2$, $n+3$:** These buffers are already VALID (marked by the previous WaitReadBuffers() call), so processing continues without additional wait time.
6. **End of round - stream_buffers is empty:** read_ahead() enqueues blocks $n+4$ through $n+7$, and prepare_and_submit() submits the next asynchronous read request.

** Comparison with Synchronous Sequential Scan (Version 16 or Earlier)

Prior to the introduction of AIO, PostgreSQL performed Sequential Scans in a strictly synchronous and serialized manner, as illustrated in Figure 8.22.

![](/images/postgres-internals/pgsql08-fig-8-22.webp)

#### Figure 8.22. Sequence diagram of a traditional synchronous sequential scan.

In this traditional model, the backend process repeats a serialized cycle for each block (referred to here as a *round*):

1. **Buffer Allocation**: The ReadBuffer() function invokes BufferAlloc(), which searches for or creates the corresponding buffer descriptor for the target block ($n, n+1, n+2, \dots$).
2. **Synchronous Storage Read**: The backend invokes a standard synchronous read() system call. At this point, the backend process is completely blocked.
3. **I/O Termination & Tuple Processing**: Once the I/O completes, the backend wakes up, unlocks the buffer via TerminateBufferIO(), and immediately processes the tuples (do_exec()).

## 8.5.4. Actual Implementation of Asynchronous Sequential Scan

While the fundamental pipeline remains as described in the previous simplified model, the buffer manager incorporates several real-world mechanisms to optimize efficiency under active workloads. Specifically, the implementation:

- Handles cache hits during read-ahead.
- Dynamically adjusts the read-ahead window based on real-time execution behavior.
- Bypasses stream overhead via a Fast Path mode when detecting a sequence of consecutive cache hits.

The following subsections detail each of these production mechanisms.

### 8.5.4.1. Cache Hit Processing in Read-Ahead

When read_ahead() encounters a cache hit, it stops scanning further blocks and prepares a read-request using only the contiguous cache-miss blocks accumulated up to that point.

Assume that the (n+2)-th block is already cached in the buffer pool. Figure 8.23 illustrates this behavior.

![](/images/postgres-internals/pgsql08-fig-8-23.webp)

#### Figure 8.23. Read-Ahead Behavior upon a Cache Hit.

- (1) Since stream_buffers is empty, read_ahead() attempts to refill it with subsequent blocks. read_ahead() starts from n-th block and enqueues blocks into stream_buffers.
- When it encounters a cache hit (in this example, (n+2)-th block), it stops the read-ahead process.

(2) prepare_and_submit() prepares and submits a vectored read-request for the two contiguous blocks (n-th and (n+1)-th blocks).

(3) WaitReadBuffers() waits for the completion of the read-request.

(4) The scan processes n-th, (n+1)-th, and (n+2)-th blocks. The first two blocks are obtained from the completed I/O request, while (n+2)-th blockis already available in the buffer pool.

Stopping the read-ahead process at the first cache hit ensures that all blocks accumulated in stream_buffers are physically contiguous in the relation file. Consequently, the buffer manager can submit them as a single Vector I/O request (see [Appendix 2.2](../pgsqlappendix/02.html#a-2-2) for details), maximizing sequential read efficiency.

Figure 8.24 [1] illustrates the behavior when reading subsequent blocks from storage after a cache hit has been processed.

![](/images/postgres-internals/pgsql08-fig-8-24.webp)

#### Figure 8.24. Stream behavior during subsequent read-ahead stages after cache hits.

- (1) After processing the (n+2)-th block, read_ahead() refills stream_buffers up to the *combine_distance* width, starting from the (n+3)-th block.
- (2) prepare_and_submit() prepares a multi-block read-request from stream_buffers and submits it.

Conversely, Figure 8.24 [2] illustrates the behavior when subsequent blocks also result in consecutive cache hits. In this scenario, the cached buffer descriptors are enqueued into stream_buffers one by one, and a single-block round of tuple processing is executed repeatedly.

### 8.5.4.2. Adaptive Read-Ahead Mechanism

The length of combine_distance in stream_buffers changes adaptively.

At the start of a Sequential Scan, combine_distance initializes to 1. The incremental algorithm is as follows:

- **Increment:** The value of combine_distance doubles with each round (e.g., from 1 to 2, 2 to 4, 4 to 8, and so on). The maximum value of combine_distance is the lesser of [io_combine_limit](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-IO-COMBINE-LIMIT)/BLCKSZ and (queue_size - 1), calculated as:

$$ \begin{align*} \min(\text{io_combine_limit}/\text{BLCKSZ}, (\text{queue_size}-1)). \end{align*} $$

Figure 8.25 shows the transition of the `combine_distance` size when io_combine_limit/BLCKSZ is set to 16.

![](/images/postgres-internals/pgsql08-fig-8-25.webp)

#### Figure 8.25. Growth of combine_distance during sequential read ahead.

While combine_distance increases rapidly to reach the specified maximum parallelism limit as quickly as possible, it decays very gradually.

- **Decay:** When cache hits continue for more than (queue_size - 1) blocks, the value of combine_distance decrements by 1. Continued cache hits cause combine_distance to decrement by 1 each time until it reaches 1.
- A cache miss immediately triggers the increment mode.

Figure 8.26 shows the fluctuation of the combine_distance value. This example assumes that the relation file is already cached in the buffer pool starting from the n-th block.

![](/images/postgres-internals/pgsql08-fig-8-26.webp)

#### Figure 8.26. Fluctuation of combine_distance based on cache hits and misses.

- (1) **Initial cache hits:** From the n-th block to the (n + (queue_size -1))-th block, the buffer manager performs the cache-hit processing described in the previous subsection. During this period, the length of combine_distance remains unchanged.
- (2) **Gradual decay:** When cache hits persist beyond the (queue_size - 1) threshold, the value of combine_distance decrements by 1 at each subsequent block.
- (3) **Increment:** When a cache miss occurs and a block must be read from storage, the mechanism immediately switches back to the increment mode. In this example, combine_distance doubles from 2 to 4.

### 8.5.4.3. Fast Path Mode: Bypassing stream_buffers

When combine_distance is 1 and cache hits continue, the buffer manager transitions to Fast Path mode, which reads buffer slots directly without using stream_buffers. This mode aims to accelerate processing by bypassing the entire management process of stream_buffers.

If a cache miss occurs during Fast Path mode, the buffer manager immediately transitions from Fast Path mode back to the normal read-ahead mode.

Figure 8.27 [1] shows an example of entering and leaving Fast Path mode.

![](/images/postgres-internals/pgsql08-fig-8-27.webp)

#### Figure 8.27. Behavior and transitions of Fast Path mode.

When all blocks are already cached in the buffer pool (Figure 8.26 [2]), the buffer manager uses stream_buffers only to process the 0-th block. After that, it processes all subsequent blocks in Fast Path mode.

# 8.6. Dirty Pages Flushing

In addition to replacing victim pages, the checkpointer and background writer processes flush dirty pages to storage.

Both processes share the same function of flushing dirty pages but perform different roles and behaviors.

## 8.6.1. Checkpointer

The checkpointer process writes a checkpoint record to the WAL segment file and flushes dirty pages whenever checkpointing starts.

Section 9.7 describes checkpointing and its triggers.

## 8.6.2. Background Writer

The background writer mitigates the intensive I/O load associated with checkpointing. This process continuously and gradually flushes dirty pages with minimal impact on overall database activity.

By default, the background writer wakes every 200 msec (defined by [bgwriter_delay](http://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-BGWRITER-DELAY)) and flushes a maximum of [bgwriter_lru_maxpages](http://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-BGWRITER-LRU-MAXPAGES) (default is 100 pages).

A key difference from the checkpointer is the selection of target pages. While the checkpointer writes all dirty pages, the background writer primarily targets pages where the usage_count is 0. This strategy minimizes write load by leaving frequently used, or “hot,” pages (those with a high usage_count) in memory, thus reducing the probability of repeated I/O operations.

** Why the checkpointer was separated from the background writer?

In version 9.1 or earlier, the background writer regularly performed checkpoint processing.

In version 9.2 (2012), the checkpointer process was separated from the background writer process. The proposal titled “[Separating bgwriter and checkpointer](https://www.postgresql.org/message-id/CA%2BU5nMLv2ah-HNHaQ%3D2rxhp_hDJ9jcf-LL2kW3sE4msfnUw9gA%40mail.gmail.com)” explains the reasoning. Relevant excerpts follow:

> Currently(in 2011) the bgwriter process performs both background writing, checkpointing and some other duties. This means that we can’t perform the final checkpoint fsync without stopping background writing, so there is a negative performance effect from doing both things in one process. Additionally, our aim in 9.2 is to replace polling loops with latches for power reduction. The complexity of the bgwriter loops is high and it seems unlikely to come up with a clean approach using latches. (snip)
