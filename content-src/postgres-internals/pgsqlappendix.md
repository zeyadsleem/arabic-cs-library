---
title: "Appendix: Derivation of Variance Calculation Formulas"
lang: en
---

# A.1. Derivation of Variance Calculation Formulas

## A.1.1. Derivation of the Youngs and Cramer Method

The Youngs and Cramer method is an enhancement of the [Welfold’s online](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford%27s_online_algorithm) method. To understand the derivation of the Youngs and Cramer method, the Welford method is examined first.

#### Welfold method:

Welford’s method for calculating variance is defined by the following recurrence relation:

$$ V_{n} = V_{n-1} + \frac{n-1}{n} (x_{n} - A_{n-1})^{2} $$

The derivation of this relation is as follows:

$$ \begin{align*} V_{n} &= \sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n-1} (x_{i} - A_{n})^{2} + (x_{n} - A_{n})^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - \frac{1}{n}((n-1)A_{n-1} + x_{n}) \right)^{2} + \left( (x_{n} - \frac{1}{n}((n-1)A_{n-1} + x_{n}) \right)^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - A_{n-1}) - \frac{1}{n}(x_{n} - A_{n-1}) \right)^{2} + \left( \frac{1}{n} (nx_{n} - (n-1)A_{n-1} - x_{n} ) \right)^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - A_{n-1})^{2} - \frac{2(x_{n} - A_{n-1})}{n}(x_{i} - A_{n-1}) + \frac{1}{n^{2}}(x_{n} - A_{n-1})^{2} \right) + \left( \frac{(n - 1) x_{n} - (n-1) A_{n-1}}{n} \right)^{2} \\ &= \sum_{i=1}^{n-1} (x_{i} - A_{n-1})^{2} - \frac{2(x_{n} - A_{n-1})}{n} \sum_{i=1}^{n-1}(x_{i} - A_{n-1}) + \frac{1}{n^{2}} \sum_{i=1}^{n-1} (x_{n} - A_{n-1})^{2} + \left( \frac{(n - 1) (x_{n} - A_{n-1})}{n} \right)^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} \left( \sum_{i=1}^{n-1} x_{i} - (n-1)A_{n-1} \right) + \frac{1}{n^{2}} (n-1) \cdot (x_{n} - A_{n-1})^{2} + \left( \frac{n-1}{n} \right)^{2} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} (S_{n-1} - S_{n-1}) + \left( \frac{n-1}{n^{2}} + \left( \frac{n-1}{n}\right)^{2} \right) (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} \cdot 0 + \frac{(n-1) + (n-1)^{2}}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} + \frac{(n-1)(1 + (n-1))}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} + \frac{n-1}{n} (x_{n} - A_{n-1})^{2} \end{align*} $$

#### Youngs and Cramer method:

The Youngs and Cramer method modifies Welford’s method by replacing the average $A_{n-1}$ with the sum $S_{n-1}$ to improve computational efficiency and numerical stability.

The recurrence relation is derived as follows:

$$ \begin{align*} V_{n} &= V_{n-1} + \frac{n-1}{n} \left( x_{n} - \frac{S_{n-1}}{n-1} \right)^{2} = V_{n-1} + \frac{n-1}{n} \left( \frac{(n-1)x_{n} - S_{n-1}}{n-1} \right)^{2} \\ &= V_{n-1} + \frac{1}{n(n-1)} ((n-1)x_{n} - S_{n-1})^{2} = V_{n-1} + \frac{1}{n(n-1)} (nx_{n} - x_{n} - (S_{n}- x_{n} ))^{2} \\ &= V_{n-1} + \frac{1}{n(n-1)} (nx_{n} - S_{n})^{2} \end{align*} $$

## A.1.2. Derivation of One-Pass / Parallel Variance Formulas

In parallel query processing, when calculating variance, a leader process gathers partial results computed by worker processes to generate the final result.

The variance of the entire dataset, $V_{n}$, can be expressed in terms of $V_{n_{1}}$, $V_{n_{2}}$, $S_{n_{1}}$, and $S_{n_{2}}$ as follows:

$$ V_{n} = V_{n_{1}} + V_{n_{2}} + \frac{n_{1} n_{2}}{n_{1} + n_{2}} \left( \frac{S_{n_{1}}}{n_{1}} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} $$

where:

- Dataset: $\lbrace x_{i} | 1 \leq i \leq n = n_{1} + n_{2} \rbrace$
- Overall average: $A_{n} = \sum_{i=1}^{n_{1}+n_{2}} x_{i}$
- Sum of the first part of the dataset: $S_{n_{1}} = \sum_{i=1}^{n_{1}} x_{i}$
- Variance of the first part: $V_{n_{1}} = \sum_{i=1}^{n_{1}} (x_{i} - \frac{S_{n_{1}}}{n_{1}})^{2}$
- Sum of the second part of the dataset: $S_{n_{2}} = \sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i}$
- Variance of the second part: $V_{n_{2}} = \sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - \frac{S_{n_{2}}}{n_{2}})^{2}$

#### Proof:

$$ \begin{align*} V_{n} &= \sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n_{1}} (x_{i} - A_{n})^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n_{1}} \left( x_{i} - (\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \right)^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( x_{i} - (\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \right)^{2} \\ &= \sum_{i=1}^{n_{1}} \left( (x_{i} - \frac{S_{n_{1}}}{n_{1}}) + \frac{S_{n_{1}} n_{2} - S_{n_{2}}n_{1}}{(n_{1} + n_{2}) n_{1}} \right)^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( (x_{i} - \frac{S_{n_{2}}}{n_{2}}) + \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1} + n_{2}) n_{2}} \right)^{2} \\ &= \sum_{i=1}^{n_{1}} \left( x_{i} - \frac{S_{n_{1}}}{n_{1}} \right)^{2} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1} }{(n_{1} + n_{2}) n_{1}} \right) \sum_{i=1}^{n_{1}} \left( x_{i} - \frac{S_{n_{1}}}{n_{1}} \right) + \sum_{i=1}^{n_{1}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right)^{2} \\ & \quad + \sum_{i=1+n_{1}}^{n_{1} + n_{2}} \left( x_{i} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( x_{i} - \frac{S_{n_{2}}}{n_{2}} \right) + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) \left( \sum_{i=1}^{n_{1}} x_{i} - n_{1} \frac{S_{n_{1}}}{n_{1}} \right) + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} \\ & \quad + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \left( \sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i} - n_{2} \frac{S_{n_{2}}}{n_{2}} \right) + n_{2} \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) ( S_{n_{1}} - S_{n_{1}} ) + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} \\ & \quad + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) ( S_{n_{2}} - S_{n_{2}} ) + n_{2} \left( \frac{ (-1) (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) \cdot 0 + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \cdot 0 + n_{2} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \frac{1}{n_{1}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} + \frac{1}{n_{2}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} = V_{n_{1}} + V_{n_{2}} + \left( \frac{1}{n_{1}} + \frac{1}{n_{2}} \right) \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{1}{n_{1}} + \frac{1}{n_{2}} \right) \left( \frac{1}{n_{1}+n_{2}} \right)^{2} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{n_{1} + n_{2}}{n_{1} n_{2}} \right) \left( \frac{1}{n_{1}+n_{2}} \right)^{2} \left( \frac{n_{1} n_{2}}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{n_{1} + n_{2}}{n_{1} n_{2}} \right) \left( \frac{n_{1} n_{2}}{n_{1}+n_{2}} \right)^{2} \left( \frac{1}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \frac{n_{1} n_{2}}{n_{1} + n_{2}} \left( \frac{S_{n_{1}}}{n_{1}} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} \end{align*} $$

# A.2. io_uring Examples

Knowledge of io_uring implementation examples clarifies Asynchronous I/O (AIO) in PostgreSQL. Below are two simple examples.

These serve as a toy model of a buffer manager, asynchronously reading data from a file into slots in memory (Figure A2.1).

![](/images/postgres-internals/pgsqlappendix-fig-a-2-01.webp)

#### Figure A2.1. Toy Buffer Manager Model.

The programs asynchronously read a 32-byte file (rel.data) into the *BufferPool* array using four 8-byte read requests.

```bash
$ cat rel.data
A0000000B0000001C0000010D0000011
```

```
#define BUFFER_SIZE 8
#define PAGE_SIZE 8

char BufferPool[BUFFER_SIZE][PAGE_SIZE + 1];
```

In these examples, the four logical blocks of rel.data are placed into BufferPool slots 3, 7, 1, and 0.

```
/*
 * Mapping Table: Logical Block -> Physical Buffer Slot
 * Defines the destination slot in BufferPool for each sequential file block.
 * - Block 0 (Bytes 0-7)   -> BufferPool[3]
 * - Block 1 (Bytes 8-15)  -> BufferPool[7]
 * - Block 2 (Bytes 16-23) -> BufferPool[1]
 * - Block 3 (Bytes 24-31) -> BufferPool[0]
 */
#define QUEUE_SIZE 4

int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };
```

## A.2.1. The Multiple-Read Approach

The following example demonstrates a simple io_uring program.

The complete source code is shown below: ** ** aio_read.c

```bash
$ cat rel.data
A0000000B0000001C0000010D0000011

$ cat aio_read.c
#include <liburing.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

#define BUFFER_SIZE 8
#define PAGE_SIZE 8
#define QUEUE_SIZE 4
#define REL_FILE &#34;rel.data&#34;

int
main()
{
    int fd;
    struct io_uring ring;
    char BufferPool[BUFFER_SIZE][PAGE_SIZE+1];

    /*
     * Mapping Table: Logical Block -> Physical Buffer Slot
     * Defines the destination slot in BufferPool for each sequential file block.
     * - Block 0 (Bytes 0-7)   -> BufferPool[3]
     * - Block 1 (Bytes 8-15)  -> BufferPool[7]
     * - Block 2 (Bytes 16-23) -> BufferPool[1]
     * - Block 3 (Bytes 24-31) -> BufferPool[0]
     */
    int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };

    /* Initialize io_uring environment and open target relation file */
    io_uring_queue_init(QUEUE_SIZE, &ring, 0);
    if ((fd = open(REL_FILE, O_RDONLY)) < 0)
        return 1;

    memset(BufferPool, 0, sizeof(BufferPool));

    /*
     * Prepare and submit read requests
     */
    for (int i = 0; i < QUEUE_SIZE; i++) {
        struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
        int buff_id = dest[i];
        io_uring_prep_read(sqe, fd, BufferPool[buff_id], PAGE_SIZE, i * PAGE_SIZE);
        sqe->user_data = i;
    }
    io_uring_submit(&ring);

    /*
     * Wait for completion events
     */
    for (int i = 0; i < QUEUE_SIZE; i++) {
        int blockNum;
        int buff_id;
        struct io_uring_cqe* cqe;

        /* Wait for one io_uring completion event */
        io_uring_wait_cqe(&ring, &cqe);

        /* Mark io_uring completion event as consumed */
        io_uring_cqe_seen(&ring, cqe);

        /* Output the results */
        blockNum = (int)cqe->user_data;
        buff_id = dest[blockNum];
        printf(&#34;CQ[%d]: BlockNum_%d -> BufferPool[%d] offset=%3d bytes=%2d: [%s]\n&#34;,
              i+1, blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
    }

    close(fd);
    io_uring_queue_exit(&ring);
    return 0;
}

$ gcc -o aio_read aio_read.c -luring

$ ./aio_read
CQ[1]: BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
CQ[2]: BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
CQ[3]: BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
CQ[4]: BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

First, the program opens the file and initializes an io_uring instance.

```
#define REL_FILE &#34;rel.data&#34;

int fd;
struct io_uring ring;

if ((fd = open(REL_FILE, O_RDONLY)) < 0)
    return 1;

io_uring_queue_init(QUEUE_SIZE, &ring, 0);
```

Figure A2.2 illustrates the subsequent flow to process multiple read requests.

![](/images/postgres-internals/pgsqlappendix-fig-a-2-02.webp)

#### Figure A2.2. Flow of Processing Multiple Read Requests.

(1) **Prepare Read Requests:** io_uring_get_sqe() provides one Submission Queue Entry (SQE) for each read request. io_uring_prep_read() then populates each SQE with a read request, specifying the destination buffer, read size, and file offset. The *user_data* field stores the block number to associate each completion event with its corresponding request later.

```
for (int i = 0; i < QUEUE_SIZE; i++) {
    struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
    int buff_id = dest[i];
    io_uring_prep_read(sqe, fd, BufferPool[buff_id], PAGE_SIZE, i * PAGE_SIZE);
    sqe->user_data = i;
}
```

(2) **Submit Read Requests:** After all four read requests are ready, io_uring_submit() submits them together.

```
io_uring_submit(&ring);
```

(3) **Read Blocks and Queue Completion Events:** The kernel reads the requested blocks from the storage device. Once each read completes, the kernel enqueues a completion event into the Completion Queue (CQ).

(4) **Wait for Completion Events:** The program waits for completion events by repeatedly calling io_uring_wait_cqe(). The corresponding buffer becomes safe to access whenever a completion event arrives. Finally, io_uring_cqe_seen() marks the completion queue entry as consumed.

```
for (int i = 0; i < QUEUE_SIZE; i++) {
    int blockNum;
    int buff_id;
    struct io_uring_cqe* cqe;

    /* Wait for one io_uring completion event */
    io_uring_wait_cqe(&ring, &cqe);

    /* Mark io_uring completion event as consumed */
    io_uring_cqe_seen(&ring, cqe);

    /* Output the results */
    blockNum = (int)cqe->user_data;
    buff_id = dest[blockNum];
    printf(&#34;CQ[%d]: BlockNum_%d -> BufferPool[%d] offset=%3d bytes=%2d: [%s]\n&#34;,
           i+1, blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
}
```

The following output was produced by one execution of the program.

```bash
$ ./aio_read
CQ[1]: BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
CQ[2]: BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
CQ[3]: BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
CQ[4]: BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

## A.2.2. The Vector-Read Approach

io_uring supports Vector I/O (Scatter-Gather I/O), leading to the effective reading of multiple continuous pages with one read request.

The following example demonstrates how io_uring operates on multiple continuous pages.

The complete source code is shown below: ** ** aio_readv.c

```bash
$ cat rel.data
A0000000B0000001C0000010D0000011

$ cat aio_readv.c
#include <fcntl.h>
#include <liburing.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

#define BUFFER_SIZE 8
#define PAGE_SIZE 8
#define QUEUE_SIZE 4
#define REL_FILE &#34;rel.data&#34;

int
main()
{
    int fd;
    struct io_uring ring;
    char BufferPool[BUFFER_SIZE][PAGE_SIZE + 1];
    struct iovec iov[QUEUE_SIZE];

    /*
     * Mapping Table: Logical Block -> Physical Buffer Slot
     * Defines the destination slot in BufferPool for each sequential file block.
     * - Block 0 (Bytes 0-7)   -> BufferPool[3]
     * - Block 1 (Bytes 8-15)  -> BufferPool[7]
     * - Block 2 (Bytes 16-23) -> BufferPool[1]
     * - Block 3 (Bytes 24-31) -> BufferPool[0]
     */
    int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };

    /* Initialize io_uring environment and open target relation file */
    io_uring_queue_init(QUEUE_SIZE, &ring, 0);
    if ((fd = open(REL_FILE, O_RDONLY)) < 0)
        return 1;

    memset(BufferPool, 0, sizeof(BufferPool));

    /* Set up iovec array to bind scattered buffer pool addresses to the read stream */
    for (int blockNum = 0; blockNum < QUEUE_SIZE; blockNum++) {
        int buff_id = dest[blockNum];
        iov[blockNum].iov_base = BufferPool[buff_id];
        iov[blockNum].iov_len = PAGE_SIZE;
    }

    /*
     * Prepare and submit a single scatter-read request (readv)
     */
    struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
    io_uring_prep_readv(sqe, fd, iov, QUEUE_SIZE, 0 /* file offset */);
    io_uring_submit(&ring);

    /*
     * Wait until the single CQE (representing the entire readv completion) returns
     */
    struct io_uring_cqe* cqe;
    io_uring_wait_cqe(&ring, &cqe);

    /* Mark the completion event as consumed */
    io_uring_cqe_seen(&ring, cqe);

    /* Output the results scattered into the buffer pool */
    printf(&#34;CQ: readv completed: %d bytes read\n&#34;, cqe->res);
    for (int blockNum = 0; blockNum < QUEUE_SIZE; blockNum++) {
        int buff_id = dest[blockNum];
        printf(&#34;\tBlockNum_%d -> BufferPool[%d] offset=%3d bytes=%2d: [%s]\n&#34;,
               blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
    }

    close(fd);
    io_uring_queue_exit(&ring);
    return 0;
}

$ gcc -o aio_readv aio_readv.c -luring

$ ./aio_readv
CQ: readv completed: 32 bytes read
	BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
	BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
	BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
	BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

To use the Vector I/O feature, the program creates an array `iov` and sets the addresses of the BufferPool slots.

```
struct iovec iov[QUEUE_SIZE];

/* Set up iovec array to bind scattered buffer pool addresses to the read stream */
for (int blockNum = 0; blockNum < QUEUE_SIZE; blockNum++) {
    int buff_id = dest[blockNum];
    iov[blockNum].iov_base = BufferPool[buff_id];
    iov[blockNum].iov_len = PAGE_SIZE;
}
```

Figure A2.3 illustrates the subsequent flow to process a vector read request.

![](/images/postgres-internals/pgsqlappendix-fig-a-2-03.webp)

#### Figure A2.3. Flow of Processing a Vector Read Request.

(1) **Prepare Read Request:** The program prepares a single read request. Unlike the previous example, this single request reads four continuous blocks into the scattered BufferPool slots specified by the `iov` array.

```
struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
io_uring_prep_readv(sqe, fd, iov, QUEUE_SIZE, 0 /* file offset */);
```

(2) **Submit Read Request:** io_uring_submit() submits the read request.

```
io_uring_submit(&ring);
```

(3) **Read Blocks and Queue Completion Event:** The kernel reads all four continuous blocks from the file. When the entire vector read operation completes, the kernel enqueues a single completion event into the CQ.

(4) **Wait for Completion Event:** The program waits for the completion event of the read request. Unlike the previous example, although the program requested four blocks, the kernel enqueues only one event in the CQ because there is only one read request.

```
struct io_uring_cqe* cqe;

/* Wait for a completion event */
io_uring_wait_cqe(&ring, &cqe);

/* Mark the completion event as consumed */
io_uring_cqe_seen(&ring, cqe);

/* Output the results scattered into the buffer pool */
printf(&#34;CQ: readv completed: %d bytes read\n&#34;, cqe->res);
for (int blockNum = 0; blockNum < QUEUE_SIZE; blockNum++) {
    int buff_id = dest[blockNum];
    printf(&#34;\tBlockNum_%d -> BufferPool[%d] offset=%3d bytes=%2d: [%s]\n&#34;,
           blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
}
```

The following output was produced by one execution of the program.

```bash
$ ./aio_readv
CQ: readv completed: 32 bytes read
	BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
	BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
	BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
	BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

Using the Vector I/O feature aggregates the reading of continuous blocks into a single read request.
