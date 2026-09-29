---
title: "الملحق: اشتقاق صيغ حساب التباين"
lang: ar
source: https://www.interdb.jp/pg/pgsqlappendix/index.html
---

# A.1. اشتقاق صيغ حساب التباين

## A.1.1. اشتقاق طريقة يونغز وكرامر

طريقة يونغز وكرامر (Youngs and Cramer method) تحسينٌ لطريقة [وِلفورد المتّصلة](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford%27s_online_algorithm). ولِفهم اشتقاق (derivation) طريقة يونغز وكرامر، نتفحّص طريقة وِلفورد (Welford method) أولًا.

#### طريقة وِلفورد:

تُعرَّف طريقة وِلفورد (Welford’s method) لحساب التباين (variance) بعلاقة الاستدعاء الذاتي (recurrence relation) التالية:

$$ V_{n} = V_{n-1} + \frac{n-1}{n} (x_{n} - A_{n-1})^{2} $$

ويكون اشتقاق هذه العلاقة كما يلي:

$$ \begin{align*} V_{n} &= \sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n-1} (x_{i} - A_{n})^{2} + (x_{n} - A_{n})^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - \frac{1}{n}((n-1)A_{n-1} + x_{n}) \right)^{2} + \left( (x_{n} - \frac{1}{n}((n-1)A_{n-1} + x_{n}) \right)^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - A_{n-1}) - \frac{1}{n}(x_{n} - A_{n-1}) \right)^{2} + \left( \frac{1}{n} (nx_{n} - (n-1)A_{n-1} - x_{n} ) \right)^{2} \\ &= \sum_{i=1}^{n-1} \left( (x_{i} - A_{n-1})^{2} - \frac{2(x_{n} - A_{n-1})}{n}(x_{i} - A_{n-1}) + \frac{1}{n^{2}}(x_{n} - A_{n-1})^{2} \right) + \left( \frac{(n - 1) x_{n} - (n-1) A_{n-1}}{n} \right)^{2} \\ &= \sum_{i=1}^{n-1} (x_{i} - A_{n-1})^{2} - \frac{2(x_{n} - A_{n-1})}{n} \sum_{i=1}^{n-1}(x_{i} - A_{n-1}) + \frac{1}{n^{2}} \sum_{i=1}^{n-1} (x_{n} - A_{n-1})^{2} + \left( \frac{(n - 1) (x_{n} - A_{n-1})}{n} \right)^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} \left( \sum_{i=1}^{n-1} x_{i} - (n-1)A_{n-1} \right) + \frac{1}{n^{2}} (n-1) \cdot (x_{n} - A_{n-1})^{2} + \left( \frac{n-1}{n} \right)^{2} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} (S_{n-1} - S_{n-1}) + \left( \frac{n-1}{n^{2}} + \left( \frac{n-1}{n}\right)^{2} \right) (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} - \frac{2(x_{n} - A_{n-1})}{n} \cdot 0 + \frac{(n-1) + (n-1)^{2}}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} + \frac{(n-1)(1 + (n-1))}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &= V_{n-1} + \frac{n-1}{n} (x_{n} - A_{n-1})^{2} \end{align*} $$

#### طريقة يونغز وكرامر:

تُعدّل طريقة يونغز وكرامر طريقة وِلفورد باستبدال المتوسط (mean) $A_{n-1}$ بالمجموع $S_{n-1}$ لتحسين كفاءة الحساب والاستقرار العددي.

وتُشتق علاقة الاستدعاء الذاتي كما يلي:

$$ \begin{align*} V_{n} &= V_{n-1} + \frac{n-1}{n} \left( x_{n} - \frac{S_{n-1}}{n-1} \right)^{2} = V_{n-1} + \frac{n-1}{n} \left( \frac{(n-1)x_{n} - S_{n-1}}{n-1} \right)^{2} \\ &= V_{n-1} + \frac{1}{n(n-1)} ((n-1)x_{n} - S_{n-1})^{2} = V_{n-1} + \frac{1}{n(n-1)} (nx_{n} - x_{n} - (S_{n}- x_{n} ))^{2} \\ &= V_{n-1} + \frac{1}{n(n-1)} (nx_{n} - S_{n})^{2} \end{align*} $$

## A.1.2. اشتقاق صيغ التباين أحادي المرور / المتوازي

في معالجة الاستعلامات المتوازية (parallel query processing)، عند حساب التباين، تجمع عملية القائد (leader process) النتائج الجزئية التي حسبتها عمليات العمال (worker processes) لتوليد النتيجة النهائية.

ويمكن التعبير عن تباين مجموعة البيانات كاملة، $V_{n}$، بدلالة $V_{n_{1}}$ و$V_{n_{2}}$ و$S_{n_{1}}$ و$S_{n_{2}}$ كما يلي:

$$ V_{n} = V_{n_{1}} + V_{n_{2}} + \frac{n_{1} n_{2}}{n_{1} + n_{2}} \left( \frac{S_{n_{1}}}{n_{1}} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} $$

حيث:

- مجموعة البيانات (dataset): $\lbrace x_{i} | 1 \leq i \leq n = n_{1} + n_{2} \rbrace$
- المتوسط الإجمالي: $A_{n} = \sum_{i=1}^{n_{1}+n_{2}} x_{i}$
- مجموع الجزء الأول من مجموعة البيانات: $S_{n_{1}} = \sum_{i=1}^{n_{1}} x_{i}$
- تباين الجزء الأول: $V_{n_{1}} = \sum_{i=1}^{n_{1}} (x_{i} - \frac{S_{n_{1}}}{n_{1}})^{2}$
- مجموع الجزء الثاني من مجموعة البيانات: $S_{n_{2}} = \sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i}$
- تباين الجزء الثاني: $V_{n_{2}} = \sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - \frac{S_{n_{2}}}{n_{2}})^{2}$

#### البرهان:

$$ \begin{align*} V_{n} &= \sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n_{1}} (x_{i} - A_{n})^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n_{1}} \left( x_{i} - (\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \right)^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( x_{i} - (\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \right)^{2} \\ &= \sum_{i=1}^{n_{1}} \left( (x_{i} - \frac{S_{n_{1}}}{n_{1}}) + \frac{S_{n_{1}} n_{2} - S_{n_{2}}n_{1}}{(n_{1} + n_{2}) n_{1}} \right)^{2} + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( (x_{i} - \frac{S_{n_{2}}}{n_{2}}) + \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1} + n_{2}) n_{2}} \right)^{2} \\ &= \sum_{i=1}^{n_{1}} \left( x_{i} - \frac{S_{n_{1}}}{n_{1}} \right)^{2} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1} }{(n_{1} + n_{2}) n_{1}} \right) \sum_{i=1}^{n_{1}} \left( x_{i} - \frac{S_{n_{1}}}{n_{1}} \right) + \sum_{i=1}^{n_{1}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right)^{2} \\ & \quad + \sum_{i=1+n_{1}}^{n_{1} + n_{2}} \left( x_{i} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( x_{i} - \frac{S_{n_{2}}}{n_{2}} \right) + \sum_{i=1+n_{1}}^{n_{1}+n_{2}} \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) \left( \sum_{i=1}^{n_{1}} x_{i} - n_{1} \frac{S_{n_{1}}}{n_{1}} \right) + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} \\ & \quad + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \left( \sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i} - n_{2} \frac{S_{n_{2}}}{n_{2}} \right) + n_{2} \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) ( S_{n_{1}} - S_{n_{1}} ) + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} \\ & \quad + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) ( S_{n_{2}} - S_{n_{2}} ) + n_{2} \left( \frac{ (-1) (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + 2 \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \right) \cdot 0 + n_{1} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \right)^{2} + V_{n_{2}} + 2 \left( \frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \right) \cdot 0 + n_{2} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{2}} \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \frac{1}{n_{1}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} + \frac{1}{n_{2}} \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} = V_{n_{1}} + V_{n_{2}} + \left( \frac{1}{n_{1}} + \frac{1}{n_{2}} \right) \left( \frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{1}{n_{1}} + \frac{1}{n_{2}} \right) \left( \frac{1}{n_{1}+n_{2}} \right)^{2} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{n_{1} + n_{2}}{n_{1} n_{2}} \right) \left( \frac{1}{n_{1}+n_{2}} \right)^{2} \left( \frac{n_{1} n_{2}}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \left( \frac{n_{1} + n_{2}}{n_{1} n_{2}} \right) \left( \frac{n_{1} n_{2}}{n_{1}+n_{2}} \right)^{2} \left( \frac{1}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \right)^{2} \\ &= V_{n_{1}} + V_{n_{2}} + \frac{n_{1} n_{2}}{n_{1} + n_{2}} \left( \frac{S_{n_{1}}}{n_{1}} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} \end{align*} $$

# A.2. أمثلة على io_uring

إلمام بأمثلة تنفيذ io_uring يوضّح الإدخال/الإخراج غير المتزامن (Asynchronous I/O أو AIO) في PostgreSQL. وفيما يلي مثالان بسيطان.

وهما يقدّمان نموذجًا مبسّطًا (toy model) لمدير مخزن مؤقت (buffer manager)، إذ يقرآن البيانات من ملف بشكل غير متزامن إلى فتحات في الذاكرة (الشكل A2.1).

![](/images/postgres-internals/pgsqlappendix-fig-a-2-01.webp)

#### الشكل A2.1. نموذج مبسّط لمدير المخزن المؤقت.

تقرأ البرامج ملفًا بحجم 32 بايت (rel.data) بشكل غير متزامن إلى مصفوفة *BufferPool* مستخدمةً أربعة طلبات قراءة بحجم 8 بايت لكل منها.

```bash
$ cat rel.data
A0000000B0000001C0000010D0000011
```

```
#define BUFFER_SIZE 8
#define PAGE_SIZE 8

char BufferPool[BUFFER_SIZE][PAGE_SIZE + 1];
```

في هذين المثالين، توضع الكتل المنطقية الأربع من rel.data في فتحات BufferPool أرقام 3 و7 و1 و0.

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

## A.2.1. أسلوب القراءة المتعددة

يوضّح المثال التالي برنامج io_uring بسيطًا.

الشيفرة المصدرية الكاملة معروضة فيما يلي: ** ** aio_read.c

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

أولًا، يفتح البرنامج الملف ويهيّئ نسخة io_uring.

```
#define REL_FILE &#34;rel.data&#34;

int fd;
struct io_uring ring;

if ((fd = open(REL_FILE, O_RDONLY)) < 0)
    return 1;

io_uring_queue_init(QUEUE_SIZE, &ring, 0);
```

يوضّح الشكل A2.2 التدفق اللاحق لمعالجة طلبات قراءة متعددة.

![](/images/postgres-internals/pgsqlappendix-fig-a-2-02.webp)

#### الشكل A2.2. تدفق معالجة طلبات قراءة متعددة.

(1) **تحضير طلبات القراءة:** يوفّر io_uring_get_sqe() مدخلًا واحدًا في طابور الإرسال (Submission Queue Entry أو SQE) لكل طلب قراءة. ثم يملأ io_uring_prep_read() كل مدخل SQE بطلب قراءة، محددًا المخزن الهدف وحجم القراءة وإزاحة الملف. ويخزّن الحقل *user_data* رقم الكتلة لربط كل حدث إتمام بالطلب المقابل له لاحقًا.

```
for (int i = 0; i < QUEUE_SIZE; i++) {
    struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
    int buff_id = dest[i];
    io_uring_prep_read(sqe, fd, BufferPool[buff_id], PAGE_SIZE, i * PAGE_SIZE);
    sqe->user_data = i;
}
```

(2) **إرسال طلبات القراءة:** بعد جهوزية طلبات القراءة الأربعة كلها، يرسلها io_uring_submit() معًا.

```
io_uring_submit(&ring);
```

(3) **قراءة الكتل وإدراج أحداث الإتمام:** تقرأ النواة الكتل المطلوبة من جهاز التخزين. وبمجرد اكتمال كل قراءة، تدرج النواة حدث إتمام في طابور الإتمام (Completion Queue أو CQ).

(4) **انتظار أحداث الإتمام:** ينتظر البرنامج أحداث الإتمام باستدعاء io_uring_wait_cqe() مرارًا وتكرارًا. ويصبح المخزن المؤقت المقابل آمنًا للوصول كلما وصل حدث إتمام. وأخيرًا، يضع io_uring_cqe_seen() علامة على مدخل طابور الإتمام باعتباره مستهلَكًا.

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

أنتجت إحدى عمليات تنفيذ البرنامج الخرج التالي.

```bash
$ ./aio_read
CQ[1]: BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
CQ[2]: BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
CQ[3]: BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
CQ[4]: BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

## A.2.2. أسلوب القراءة المتجهة

يدعم io_uring الإدخال/الإخراج المتجهي (Vector I/O) أو الإدخال/الإخراج بالتجميع-التفريق (Scatter-Gather I/O)، ما يتيح قراءة صفحات متتالية متعددة بكفاءة عبر طلب قراءة واحد.

يوضّح المثال التالي كيفية عمل io_uring على صفحات متتالية متعددة.

الشيفرة المصدرية الكاملة معروضة فيما يلي: ** ** aio_readv.c

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

لاستخدام ميزة الإدخال/الإخراج المتجهي، ينشئ البرنامج مصفوفة `iov` ويضبط عناوين فتحات BufferPool.

```
struct iovec iov[QUEUE_SIZE];

/* Set up iovec array to bind scattered buffer pool addresses to the read stream */
for (int blockNum = 0; blockNum < QUEUE_SIZE; blockNum++) {
    int buff_id = dest[blockNum];
    iov[blockNum].iov_base = BufferPool[buff_id];
    iov[blockNum].iov_len = PAGE_SIZE;
}
```

يوضّح الشكل A2.3 التدفق اللاحق لمعالجة طلب قراءة متجهة.

![](/images/postgres-internals/pgsqlappendix-fig-a-2-03.webp)

#### الشكل A2.3. تدفق معالجة طلب قراءة متجهة.

(1) **تحضير طلب القراءة:** يجهّز البرنامج طلب قراءة واحدًا. وخلافًا للمثال السابق، يقرأ هذا الطلب الواحد أربع كتل متتالية إلى فتحات BufferPool المتفّرقة المحددة في مصفوفة `iov`.

```
struct io_uring_sqe* sqe = io_uring_get_sqe(&ring);
io_uring_prep_readv(sqe, fd, iov, QUEUE_SIZE, 0 /* file offset */);
```

(2) **إرسال طلب القراءة:** يرسل io_uring_submit() طلب القراءة.

```
io_uring_submit(&ring);
```

(3) **قراءة الكتل وإدراج حدث الإتمام:** تقرأ النواة الكتل المتتالية الأربع كلها من الملف. وعند اكتمال عملية القراءة المتجهة بأكملها، تدرج النواة حدث إتمام واحدًا في طابور الإتمام CQ.

(4) **انتظار حدث الإتمام:** ينتظر البرنامج حدث إتمام طلب القراءة. وخلافًا للمثال السابق، ومع أن البرنامج طلب أربع كتل، تدرج النواة حدثًا واحدًا فقط في طابور الإتمام CQ لأنه لا يوجد سوى طلب قراءة واحد.

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

أنتجت إحدى عمليات تنفيذ البرنامج الخرج التالي.

```bash
$ ./aio_readv
CQ: readv completed: 32 bytes read
	BlockNum_0 -> BufferPool[3] offset=  0 bytes= 8: [A0000000]
	BlockNum_1 -> BufferPool[7] offset=  8 bytes= 8: [B0000001]
	BlockNum_2 -> BufferPool[1] offset= 16 bytes= 8: [C0000010]
	BlockNum_3 -> BufferPool[0] offset= 24 bytes= 8: [D0000011]
```

يؤدي استخدام ميزة الإدخال/الإخراج المتجهي إلى تجميع قراءة الكتل المتتالية في طلب قراءة واحد.
