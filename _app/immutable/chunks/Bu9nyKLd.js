const n="postgres-internals",_="pgsqlappendix",e="الملحق: اشتقاق صيغ حساب التباين",t="index",i="الملحق: اشتقاق صيغ حساب التباين",s=[{depth:2,id:"a11-اشتقاق-طريقة-يونغز-وكرامر",text:"A.1.1. اشتقاق طريقة يونغز وكرامر"},{depth:2,id:"a12-اشتقاق-صيغ-التباين-أحادي-المرور-المتوازي",text:"A.1.2. اشتقاق صيغ التباين أحادي المرور / المتوازي"},{depth:2,id:"a21-أسلوب-القراءة-المتعددة",text:"A.2.1. أسلوب القراءة المتعددة"},{depth:2,id:"a22-أسلوب-القراءة-المتجهة",text:"A.2.2. أسلوب القراءة المتجهة"}],a=`<h1>A.1. اشتقاق صيغ حساب التباين</h1>
<h2 id="a11-اشتقاق-طريقة-يونغز-وكرامر">A.1.1. اشتقاق طريقة يونغز وكرامر</h2>
<p>طريقة يونغز وكرامر (Youngs and Cramer method) تحسينٌ لطريقة <a href="https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford%27s_online_algorithm">وِلفورد المتّصلة</a>. ولِفهم اشتقاق (derivation) طريقة يونغز وكرامر، نتفحّص طريقة وِلفورد (Welford method) أولًا.</p>
<h4>طريقة وِلفورد:</h4>
<p>تُعرَّف طريقة وِلفورد (Welford’s method) لحساب التباين (variance) بعلاقة الاستدعاء الذاتي (recurrence relation) التالية:</p>
<p>$$ V_{n} = V_{n-1} + \\frac{n-1}{n} (x_{n} - A_{n-1})^{2} $$</p>
<p>ويكون اشتقاق هذه العلاقة كما يلي:</p>
<p>$$ \\begin{align*} V_{n} &amp;= \\sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \\sum_{i=1}^{n-1} (x_{i} - A_{n})^{2} + (x_{n} - A_{n})^{2} \\ &amp;= \\sum_{i=1}^{n-1} \\left( (x_{i} - \\frac{1}{n}((n-1)A_{n-1} + x_{n}) \\right)^{2} + \\left( (x_{n} - \\frac{1}{n}((n-1)A_{n-1} + x_{n}) \\right)^{2} \\ &amp;= \\sum_{i=1}^{n-1} \\left( (x_{i} - A_{n-1}) - \\frac{1}{n}(x_{n} - A_{n-1}) \\right)^{2} + \\left( \\frac{1}{n} (nx_{n} - (n-1)A_{n-1} - x_{n} ) \\right)^{2} \\ &amp;= \\sum_{i=1}^{n-1} \\left( (x_{i} - A_{n-1})^{2} - \\frac{2(x_{n} - A_{n-1})}{n}(x_{i} - A_{n-1}) + \\frac{1}{n^{2}}(x_{n} - A_{n-1})^{2} \\right) + \\left( \\frac{(n - 1) x_{n} - (n-1) A_{n-1}}{n} \\right)^{2} \\ &amp;= \\sum_{i=1}^{n-1} (x_{i} - A_{n-1})^{2} - \\frac{2(x_{n} - A_{n-1})}{n} \\sum_{i=1}^{n-1}(x_{i} - A_{n-1}) + \\frac{1}{n^{2}} \\sum_{i=1}^{n-1} (x_{n} - A_{n-1})^{2} + \\left( \\frac{(n - 1) (x_{n} - A_{n-1})}{n} \\right)^{2} \\ &amp;= V_{n-1} - \\frac{2(x_{n} - A_{n-1})}{n} \\left( \\sum_{i=1}^{n-1} x_{i} - (n-1)A_{n-1} \\right) + \\frac{1}{n^{2}} (n-1) \\cdot (x_{n} - A_{n-1})^{2} + \\left( \\frac{n-1}{n} \\right)^{2} (x_{n} - A_{n-1})^{2} \\ &amp;= V_{n-1} - \\frac{2(x_{n} - A_{n-1})}{n} (S_{n-1} - S_{n-1}) + \\left( \\frac{n-1}{n^{2}} + \\left( \\frac{n-1}{n}\\right)^{2} \\right) (x_{n} - A_{n-1})^{2} \\ &amp;= V_{n-1} - \\frac{2(x_{n} - A_{n-1})}{n} \\cdot 0 + \\frac{(n-1) + (n-1)^{2}}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &amp;= V_{n-1} + \\frac{(n-1)(1 + (n-1))}{n^{2}} (x_{n} - A_{n-1})^{2} \\ &amp;= V_{n-1} + \\frac{n-1}{n} (x_{n} - A_{n-1})^{2} \\end{align*} $$</p>
<h4>طريقة يونغز وكرامر:</h4>
<p>تُعدّل طريقة يونغز وكرامر طريقة وِلفورد باستبدال المتوسط (mean) $A_{n-1}$ بالمجموع $S_{n-1}$ لتحسين كفاءة الحساب والاستقرار العددي.</p>
<p>وتُشتق علاقة الاستدعاء الذاتي كما يلي:</p>
<p>$$ \\begin{align*} V_{n} &amp;= V_{n-1} + \\frac{n-1}{n} \\left( x_{n} - \\frac{S_{n-1}}{n-1} \\right)^{2} = V_{n-1} + \\frac{n-1}{n} \\left( \\frac{(n-1)x_{n} - S_{n-1}}{n-1} \\right)^{2} \\ &amp;= V_{n-1} + \\frac{1}{n(n-1)} ((n-1)x_{n} - S_{n-1})^{2} = V_{n-1} + \\frac{1}{n(n-1)} (nx_{n} - x_{n} - (S_{n}- x_{n} ))^{2} \\ &amp;= V_{n-1} + \\frac{1}{n(n-1)} (nx_{n} - S_{n})^{2} \\end{align*} $$</p>
<h2 id="a12-اشتقاق-صيغ-التباين-أحادي-المرور-المتوازي">A.1.2. اشتقاق صيغ التباين أحادي المرور / المتوازي</h2>
<p>في معالجة الاستعلامات المتوازية (parallel query processing)، عند حساب التباين، تجمع عملية القائد (leader process) النتائج الجزئية التي حسبتها عمليات العمال (worker processes) لتوليد النتيجة النهائية.</p>
<p>ويمكن التعبير عن تباين مجموعة البيانات كاملة، $V_{n}$، بدلالة $V_{n_{1}}$ و$V_{n_{2}}$ و$S_{n_{1}}$ و$S_{n_{2}}$ كما يلي:</p>
<p>$$ V_{n} = V_{n_{1}} + V_{n_{2}} + \\frac{n_{1} n_{2}}{n_{1} + n_{2}} \\left( \\frac{S_{n_{1}}}{n_{1}} - \\frac{S_{n_{2}}}{n_{2}} \\right)^{2} $$</p>
<p>حيث:</p>
<ul>
<li>مجموعة البيانات (dataset): $\\lbrace x_{i} | 1 \\leq i \\leq n = n_{1} + n_{2} \\rbrace$</li>
<li>المتوسط الإجمالي: $A_{n} = \\sum_{i=1}^{n_{1}+n_{2}} x_{i}$</li>
<li>مجموع الجزء الأول من مجموعة البيانات: $S_{n_{1}} = \\sum_{i=1}^{n_{1}} x_{i}$</li>
<li>تباين الجزء الأول: $V_{n_{1}} = \\sum_{i=1}^{n_{1}} (x_{i} - \\frac{S_{n_{1}}}{n_{1}})^{2}$</li>
<li>مجموع الجزء الثاني من مجموعة البيانات: $S_{n_{2}} = \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i}$</li>
<li>تباين الجزء الثاني: $V_{n_{2}} = \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - \\frac{S_{n_{2}}}{n_{2}})^{2}$</li>
</ul>
<h4>البرهان:</h4>
<p>$$ \\begin{align*} V_{n} &amp;= \\sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \\sum_{i=1}^{n_{1}} (x_{i} - A_{n})^{2} + \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} (x_{i} - A_{n})^{2} = \\sum_{i=1}^{n_{1}} \\left( x_{i} - (\\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \\right)^{2} + \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} \\left( x_{i} - (\\frac{S_{n_{1}} + S_{n_{2}}}{n_{1} + n_{2}}) \\right)^{2} \\ &amp;= \\sum_{i=1}^{n_{1}} \\left( (x_{i} - \\frac{S_{n_{1}}}{n_{1}}) + \\frac{S_{n_{1}} n_{2} - S_{n_{2}}n_{1}}{(n_{1} + n_{2}) n_{1}} \\right)^{2} + \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} \\left( (x_{i} - \\frac{S_{n_{2}}}{n_{2}}) + \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1} + n_{2}) n_{2}} \\right)^{2} \\ &amp;= \\sum_{i=1}^{n_{1}} \\left( x_{i} - \\frac{S_{n_{1}}}{n_{1}} \\right)^{2} + 2 \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1} }{(n_{1} + n_{2}) n_{1}} \\right) \\sum_{i=1}^{n_{1}} \\left( x_{i} - \\frac{S_{n_{1}}}{n_{1}} \\right) + \\sum_{i=1}^{n_{1}} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \\right)^{2} \\ &amp; \\quad + \\sum_{i=1+n_{1}}^{n_{1} + n_{2}} \\left( x_{i} - \\frac{S_{n_{2}}}{n_{2}} \\right)^{2} + 2 \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right) \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} \\left( x_{i} - \\frac{S_{n_{2}}}{n_{2}} \\right) + \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right)^{2} \\ &amp;= V_{n_{1}} + 2 \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \\right) \\left( \\sum_{i=1}^{n_{1}} x_{i} - n_{1} \\frac{S_{n_{1}}}{n_{1}} \\right) + n_{1} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \\right)^{2} \\ &amp; \\quad + V_{n_{2}} + 2 \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right) \\left( \\sum_{i=1+n_{1}}^{n_{1}+n_{2}} x_{i} - n_{2} \\frac{S_{n_{2}}}{n_{2}} \\right) + n_{2} \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right)^{2} \\ &amp;= V_{n_{1}} + 2 \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \\right) ( S_{n_{1}} - S_{n_{1}} ) + n_{1} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \\right)^{2} \\ &amp; \\quad + V_{n_{2}} + 2 \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right) ( S_{n_{2}} - S_{n_{2}} ) + n_{2} \\left( \\frac{ (-1) (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})}{(n_{1}+n_{2}) n_{2}} \\right)^{2} \\ &amp;= V_{n_{1}} + 2 \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1} + n_{2}) n_{1}} \\right) \\cdot 0 + n_{1} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{1}} \\right)^{2} + V_{n_{2}} + 2 \\left( \\frac{S_{n_{2}} n_{1} - S_{n_{1}} n_{2}}{(n_{1}+n_{2}) n_{2}} \\right) \\cdot 0 + n_{2} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{(n_{1}+n_{2}) n_{2}} \\right)^{2} \\ &amp;= V_{n_{1}} + V_{n_{2}} + \\frac{1}{n_{1}} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \\right)^{2} + \\frac{1}{n_{2}} \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \\right)^{2} = V_{n_{1}} + V_{n_{2}} + \\left( \\frac{1}{n_{1}} + \\frac{1}{n_{2}} \\right) \\left( \\frac{S_{n_{1}} n_{2} - S_{n_{2}} n_{1}}{n_{1}+n_{2}} \\right)^{2} \\ &amp;= V_{n_{1}} + V_{n_{2}} + \\left( \\frac{1}{n_{1}} + \\frac{1}{n_{2}} \\right) \\left( \\frac{1}{n_{1}+n_{2}} \\right)^{2} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1})^{2} \\ &amp;= V_{n_{1}} + V_{n_{2}} + \\left( \\frac{n_{1} + n_{2}}{n_{1} n_{2}} \\right) \\left( \\frac{1}{n_{1}+n_{2}} \\right)^{2} \\left( \\frac{n_{1} n_{2}}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \\right)^{2} \\ &amp;= V_{n_{1}} + V_{n_{2}} + \\left( \\frac{n_{1} + n_{2}}{n_{1} n_{2}} \\right) \\left( \\frac{n_{1} n_{2}}{n_{1}+n_{2}} \\right)^{2} \\left( \\frac{1}{n_{1} n_{2}} (S_{n_{1}} n_{2} - S_{n_{2}} n_{1}) \\right)^{2} \\ &amp;= V_{n_{1}} + V_{n_{2}} + \\frac{n_{1} n_{2}}{n_{1} + n_{2}} \\left( \\frac{S_{n_{1}}}{n_{1}} - \\frac{S_{n_{2}}}{n_{2}} \\right)^{2} \\end{align*} $$</p>
<h1>A.2. أمثلة على io_uring</h1>
<p>إلمام بأمثلة تنفيذ io_uring يوضّح الإدخال/الإخراج غير المتزامن (Asynchronous I/O أو AIO) في PostgreSQL. وفيما يلي مثالان بسيطان.</p>
<p>وهما يقدّمان نموذجًا مبسّطًا (toy model) لمدير مخزن مؤقت (buffer manager)، إذ يقرآن البيانات من ملف بشكل غير متزامن إلى فتحات في الذاكرة (الشكل A2.1).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsqlappendix-fig-a-2-01.webp" alt=""></p>
<h4>الشكل A2.1. نموذج مبسّط لمدير المخزن المؤقت.</h4>
<p>تقرأ البرامج ملفًا بحجم 32 بايت (rel.data) بشكل غير متزامن إلى مصفوفة <em>BufferPool</em> مستخدمةً أربعة طلبات قراءة بحجم 8 بايت لكل منها.</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cat</span> rel.data
A0000000B0000001C0000010D0000011
</code></pre>
<pre><code>#define BUFFER_SIZE 8
#define PAGE_SIZE 8

char BufferPool[BUFFER_SIZE][PAGE_SIZE + 1];
</code></pre>
<p>في هذين المثالين، توضع الكتل المنطقية الأربع من rel.data في فتحات BufferPool أرقام 3 و7 و1 و0.</p>
<pre><code>/*
 * Mapping Table: Logical Block -&gt; Physical Buffer Slot
 * Defines the destination slot in BufferPool for each sequential file block.
 * - Block 0 (Bytes 0-7)   -&gt; BufferPool[3]
 * - Block 1 (Bytes 8-15)  -&gt; BufferPool[7]
 * - Block 2 (Bytes 16-23) -&gt; BufferPool[1]
 * - Block 3 (Bytes 24-31) -&gt; BufferPool[0]
 */
#define QUEUE_SIZE 4

int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };
</code></pre>
<h2 id="a21-أسلوب-القراءة-المتعددة">A.2.1. أسلوب القراءة المتعددة</h2>
<p>يوضّح المثال التالي برنامج io_uring بسيطًا.</p>
<p>الشيفرة المصدرية الكاملة معروضة فيما يلي: ** ** aio_read.c</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cat</span> rel.data
A0000000B0000001C0000010D0000011

$ <span class="hljs-built_in">cat</span> aio_read.c
<span class="hljs-comment">#include &lt;liburing.h&gt;</span>
<span class="hljs-comment">#include &lt;stdio.h&gt;</span>
<span class="hljs-comment">#include &lt;string.h&gt;</span>
<span class="hljs-comment">#include &lt;unistd.h&gt;</span>

<span class="hljs-comment">#define BUFFER_SIZE 8</span>
<span class="hljs-comment">#define PAGE_SIZE 8</span>
<span class="hljs-comment">#define QUEUE_SIZE 4</span>
<span class="hljs-comment">#define REL_FILE &amp;#34;rel.data&amp;#34;</span>

int
<span class="hljs-function"><span class="hljs-title">main</span></span>()
{
    int fd;
    struct io_uring ring;
    char BufferPool[BUFFER_SIZE][PAGE_SIZE+1];

    /*
     * Mapping Table: Logical Block -&gt; Physical Buffer Slot
     * Defines the destination slot <span class="hljs-keyword">in</span> BufferPool <span class="hljs-keyword">for</span> each sequential file block.
     * - Block 0 (Bytes 0-7)   -&gt; BufferPool[3]
     * - Block 1 (Bytes 8-15)  -&gt; BufferPool[7]
     * - Block 2 (Bytes 16-23) -&gt; BufferPool[1]
     * - Block 3 (Bytes 24-31) -&gt; BufferPool[0]
     */
    int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };

    /* Initialize io_uring environment and open target relation file */
    io_uring_queue_init(QUEUE_SIZE, &amp;ring, 0);
    <span class="hljs-keyword">if</span> ((fd = open(REL_FILE, O_RDONLY)) &lt; 0)
        <span class="hljs-built_in">return</span> 1;

    memset(BufferPool, 0, sizeof(BufferPool));

    /*
     * Prepare and submit <span class="hljs-built_in">read</span> requests
     */
    <span class="hljs-keyword">for</span> (int i = 0; i &lt; QUEUE_SIZE; i++) {
        struct io_uring_sqe* sqe = io_uring_get_sqe(&amp;ring);
        int buff_id = dest[i];
        io_uring_prep_read(sqe, fd, BufferPool[buff_id], PAGE_SIZE, i * PAGE_SIZE);
        sqe-&gt;user_data = i;
    }
    io_uring_submit(&amp;ring);

    /*
     * Wait <span class="hljs-keyword">for</span> completion events
     */
    <span class="hljs-keyword">for</span> (int i = 0; i &lt; QUEUE_SIZE; i++) {
        int blockNum;
        int buff_id;
        struct io_uring_cqe* cqe;

        /* Wait <span class="hljs-keyword">for</span> one io_uring completion event */
        io_uring_wait_cqe(&amp;ring, &amp;cqe);

        /* Mark io_uring completion event as consumed */
        io_uring_cqe_seen(&amp;ring, cqe);

        /* Output the results */
        blockNum = (int)cqe-&gt;user_data;
        buff_id = dest[blockNum];
        <span class="hljs-built_in">printf</span>(&amp;#34;CQ[%d]: BlockNum_%d -&gt; BufferPool[%d] offset=%3d bytes=%2d: [%s]\\n&amp;#34;,
              i+1, blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
    }

    close(fd);
    io_uring_queue_exit(&amp;ring);
    <span class="hljs-built_in">return</span> 0;
}

$ gcc -o aio_read aio_read.c -luring

$ ./aio_read
CQ[1]: BlockNum_0 -&gt; BufferPool[3] offset=  0 bytes= 8: [A0000000]
CQ[2]: BlockNum_1 -&gt; BufferPool[7] offset=  8 bytes= 8: [B0000001]
CQ[3]: BlockNum_2 -&gt; BufferPool[1] offset= 16 bytes= 8: [C0000010]
CQ[4]: BlockNum_3 -&gt; BufferPool[0] offset= 24 bytes= 8: [D0000011]
</code></pre>
<p>أولًا، يفتح البرنامج الملف ويهيّئ نسخة io_uring.</p>
<pre><code>#define REL_FILE &amp;#34;rel.data&amp;#34;

int fd;
struct io_uring ring;

if ((fd = open(REL_FILE, O_RDONLY)) &lt; 0)
    return 1;

io_uring_queue_init(QUEUE_SIZE, &amp;ring, 0);
</code></pre>
<p>يوضّح الشكل A2.2 التدفق اللاحق لمعالجة طلبات قراءة متعددة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsqlappendix-fig-a-2-02.webp" alt=""></p>
<h4>الشكل A2.2. تدفق معالجة طلبات قراءة متعددة.</h4>
<p>(1) <strong>تحضير طلبات القراءة:</strong> يوفّر io_uring_get_sqe() مدخلًا واحدًا في طابور الإرسال (Submission Queue Entry أو SQE) لكل طلب قراءة. ثم يملأ io_uring_prep_read() كل مدخل SQE بطلب قراءة، محددًا المخزن الهدف وحجم القراءة وإزاحة الملف. ويخزّن الحقل <em>user_data</em> رقم الكتلة لربط كل حدث إتمام بالطلب المقابل له لاحقًا.</p>
<pre><code>for (int i = 0; i &lt; QUEUE_SIZE; i++) {
    struct io_uring_sqe* sqe = io_uring_get_sqe(&amp;ring);
    int buff_id = dest[i];
    io_uring_prep_read(sqe, fd, BufferPool[buff_id], PAGE_SIZE, i * PAGE_SIZE);
    sqe-&gt;user_data = i;
}
</code></pre>
<p>(2) <strong>إرسال طلبات القراءة:</strong> بعد جهوزية طلبات القراءة الأربعة كلها، يرسلها io_uring_submit() معًا.</p>
<pre><code>io_uring_submit(&amp;ring);
</code></pre>
<p>(3) <strong>قراءة الكتل وإدراج أحداث الإتمام:</strong> تقرأ النواة الكتل المطلوبة من جهاز التخزين. وبمجرد اكتمال كل قراءة، تدرج النواة حدث إتمام في طابور الإتمام (Completion Queue أو CQ).</p>
<p>(4) <strong>انتظار أحداث الإتمام:</strong> ينتظر البرنامج أحداث الإتمام باستدعاء io_uring_wait_cqe() مرارًا وتكرارًا. ويصبح المخزن المؤقت المقابل آمنًا للوصول كلما وصل حدث إتمام. وأخيرًا، يضع io_uring_cqe_seen() علامة على مدخل طابور الإتمام باعتباره مستهلَكًا.</p>
<pre><code>for (int i = 0; i &lt; QUEUE_SIZE; i++) {
    int blockNum;
    int buff_id;
    struct io_uring_cqe* cqe;

    /* Wait for one io_uring completion event */
    io_uring_wait_cqe(&amp;ring, &amp;cqe);

    /* Mark io_uring completion event as consumed */
    io_uring_cqe_seen(&amp;ring, cqe);

    /* Output the results */
    blockNum = (int)cqe-&gt;user_data;
    buff_id = dest[blockNum];
    printf(&amp;#34;CQ[%d]: BlockNum_%d -&gt; BufferPool[%d] offset=%3d bytes=%2d: [%s]\\n&amp;#34;,
           i+1, blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
}
</code></pre>
<p>أنتجت إحدى عمليات تنفيذ البرنامج الخرج التالي.</p>
<pre><code class="language-bash">$ ./aio_read
CQ[1]: BlockNum_0 -&gt; BufferPool[3] offset=  0 bytes= 8: [A0000000]
CQ[2]: BlockNum_1 -&gt; BufferPool[7] offset=  8 bytes= 8: [B0000001]
CQ[3]: BlockNum_2 -&gt; BufferPool[1] offset= 16 bytes= 8: [C0000010]
CQ[4]: BlockNum_3 -&gt; BufferPool[0] offset= 24 bytes= 8: [D0000011]
</code></pre>
<h2 id="a22-أسلوب-القراءة-المتجهة">A.2.2. أسلوب القراءة المتجهة</h2>
<p>يدعم io_uring الإدخال/الإخراج المتجهي (Vector I/O) أو الإدخال/الإخراج بالتجميع-التفريق (Scatter-Gather I/O)، ما يتيح قراءة صفحات متتالية متعددة بكفاءة عبر طلب قراءة واحد.</p>
<p>يوضّح المثال التالي كيفية عمل io_uring على صفحات متتالية متعددة.</p>
<p>الشيفرة المصدرية الكاملة معروضة فيما يلي: ** ** aio_readv.c</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cat</span> rel.data
A0000000B0000001C0000010D0000011

$ <span class="hljs-built_in">cat</span> aio_readv.c
<span class="hljs-comment">#include &lt;fcntl.h&gt;</span>
<span class="hljs-comment">#include &lt;liburing.h&gt;</span>
<span class="hljs-comment">#include &lt;stdio.h&gt;</span>
<span class="hljs-comment">#include &lt;string.h&gt;</span>
<span class="hljs-comment">#include &lt;unistd.h&gt;</span>

<span class="hljs-comment">#define BUFFER_SIZE 8</span>
<span class="hljs-comment">#define PAGE_SIZE 8</span>
<span class="hljs-comment">#define QUEUE_SIZE 4</span>
<span class="hljs-comment">#define REL_FILE &amp;#34;rel.data&amp;#34;</span>

int
<span class="hljs-function"><span class="hljs-title">main</span></span>()
{
    int fd;
    struct io_uring ring;
    char BufferPool[BUFFER_SIZE][PAGE_SIZE + 1];
    struct iovec iov[QUEUE_SIZE];

    /*
     * Mapping Table: Logical Block -&gt; Physical Buffer Slot
     * Defines the destination slot <span class="hljs-keyword">in</span> BufferPool <span class="hljs-keyword">for</span> each sequential file block.
     * - Block 0 (Bytes 0-7)   -&gt; BufferPool[3]
     * - Block 1 (Bytes 8-15)  -&gt; BufferPool[7]
     * - Block 2 (Bytes 16-23) -&gt; BufferPool[1]
     * - Block 3 (Bytes 24-31) -&gt; BufferPool[0]
     */
    int dest[QUEUE_SIZE] = { 3, 7, 1, 0 };

    /* Initialize io_uring environment and open target relation file */
    io_uring_queue_init(QUEUE_SIZE, &amp;ring, 0);
    <span class="hljs-keyword">if</span> ((fd = open(REL_FILE, O_RDONLY)) &lt; 0)
        <span class="hljs-built_in">return</span> 1;

    memset(BufferPool, 0, sizeof(BufferPool));

    /* Set up iovec array to <span class="hljs-built_in">bind</span> scattered buffer pool addresses to the <span class="hljs-built_in">read</span> stream */
    <span class="hljs-keyword">for</span> (int blockNum = 0; blockNum &lt; QUEUE_SIZE; blockNum++) {
        int buff_id = dest[blockNum];
        iov[blockNum].iov_base = BufferPool[buff_id];
        iov[blockNum].iov_len = PAGE_SIZE;
    }

    /*
     * Prepare and submit a single scatter-read request (readv)
     */
    struct io_uring_sqe* sqe = io_uring_get_sqe(&amp;ring);
    io_uring_prep_readv(sqe, fd, iov, QUEUE_SIZE, 0 /* file offset */);
    io_uring_submit(&amp;ring);

    /*
     * Wait <span class="hljs-keyword">until</span> the single CQE (representing the entire readv completion) returns
     */
    struct io_uring_cqe* cqe;
    io_uring_wait_cqe(&amp;ring, &amp;cqe);

    /* Mark the completion event as consumed */
    io_uring_cqe_seen(&amp;ring, cqe);

    /* Output the results scattered into the buffer pool */
    <span class="hljs-built_in">printf</span>(&amp;#34;CQ: readv completed: %d bytes <span class="hljs-built_in">read</span>\\n&amp;#34;, cqe-&gt;res);
    <span class="hljs-keyword">for</span> (int blockNum = 0; blockNum &lt; QUEUE_SIZE; blockNum++) {
        int buff_id = dest[blockNum];
        <span class="hljs-built_in">printf</span>(&amp;#34;\\tBlockNum_%d -&gt; BufferPool[%d] offset=%3d bytes=%2d: [%s]\\n&amp;#34;,
               blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
    }

    close(fd);
    io_uring_queue_exit(&amp;ring);
    <span class="hljs-built_in">return</span> 0;
}

$ gcc -o aio_readv aio_readv.c -luring

$ ./aio_readv
CQ: readv completed: 32 bytes <span class="hljs-built_in">read</span>
	BlockNum_0 -&gt; BufferPool[3] offset=  0 bytes= 8: [A0000000]
	BlockNum_1 -&gt; BufferPool[7] offset=  8 bytes= 8: [B0000001]
	BlockNum_2 -&gt; BufferPool[1] offset= 16 bytes= 8: [C0000010]
	BlockNum_3 -&gt; BufferPool[0] offset= 24 bytes= 8: [D0000011]
</code></pre>
<p>لاستخدام ميزة الإدخال/الإخراج المتجهي، ينشئ البرنامج مصفوفة <code>iov</code> ويضبط عناوين فتحات BufferPool.</p>
<pre><code>struct iovec iov[QUEUE_SIZE];

/* Set up iovec array to bind scattered buffer pool addresses to the read stream */
for (int blockNum = 0; blockNum &lt; QUEUE_SIZE; blockNum++) {
    int buff_id = dest[blockNum];
    iov[blockNum].iov_base = BufferPool[buff_id];
    iov[blockNum].iov_len = PAGE_SIZE;
}
</code></pre>
<p>يوضّح الشكل A2.3 التدفق اللاحق لمعالجة طلب قراءة متجهة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsqlappendix-fig-a-2-03.webp" alt=""></p>
<h4>الشكل A2.3. تدفق معالجة طلب قراءة متجهة.</h4>
<p>(1) <strong>تحضير طلب القراءة:</strong> يجهّز البرنامج طلب قراءة واحدًا. وخلافًا للمثال السابق، يقرأ هذا الطلب الواحد أربع كتل متتالية إلى فتحات BufferPool المتفّرقة المحددة في مصفوفة <code>iov</code>.</p>
<pre><code>struct io_uring_sqe* sqe = io_uring_get_sqe(&amp;ring);
io_uring_prep_readv(sqe, fd, iov, QUEUE_SIZE, 0 /* file offset */);
</code></pre>
<p>(2) <strong>إرسال طلب القراءة:</strong> يرسل io_uring_submit() طلب القراءة.</p>
<pre><code>io_uring_submit(&amp;ring);
</code></pre>
<p>(3) <strong>قراءة الكتل وإدراج حدث الإتمام:</strong> تقرأ النواة الكتل المتتالية الأربع كلها من الملف. وعند اكتمال عملية القراءة المتجهة بأكملها، تدرج النواة حدث إتمام واحدًا في طابور الإتمام CQ.</p>
<p>(4) <strong>انتظار حدث الإتمام:</strong> ينتظر البرنامج حدث إتمام طلب القراءة. وخلافًا للمثال السابق، ومع أن البرنامج طلب أربع كتل، تدرج النواة حدثًا واحدًا فقط في طابور الإتمام CQ لأنه لا يوجد سوى طلب قراءة واحد.</p>
<pre><code>struct io_uring_cqe* cqe;

/* Wait for a completion event */
io_uring_wait_cqe(&amp;ring, &amp;cqe);

/* Mark the completion event as consumed */
io_uring_cqe_seen(&amp;ring, cqe);

/* Output the results scattered into the buffer pool */
printf(&amp;#34;CQ: readv completed: %d bytes read\\n&amp;#34;, cqe-&gt;res);
for (int blockNum = 0; blockNum &lt; QUEUE_SIZE; blockNum++) {
    int buff_id = dest[blockNum];
    printf(&amp;#34;\\tBlockNum_%d -&gt; BufferPool[%d] offset=%3d bytes=%2d: [%s]\\n&amp;#34;,
           blockNum, buff_id, blockNum * PAGE_SIZE, PAGE_SIZE, BufferPool[buff_id]);
}
</code></pre>
<p>أنتجت إحدى عمليات تنفيذ البرنامج الخرج التالي.</p>
<pre><code class="language-bash">$ ./aio_readv
CQ: readv completed: 32 bytes <span class="hljs-built_in">read</span>
	BlockNum_0 -&gt; BufferPool[3] offset=  0 bytes= 8: [A0000000]
	BlockNum_1 -&gt; BufferPool[7] offset=  8 bytes= 8: [B0000001]
	BlockNum_2 -&gt; BufferPool[1] offset= 16 bytes= 8: [C0000010]
	BlockNum_3 -&gt; BufferPool[0] offset= 24 bytes= 8: [D0000011]
</code></pre>
<p>يؤدي استخدام ميزة الإدخال/الإخراج المتجهي إلى تجميع قراءة الكتل المتتالية في طلب قراءة واحد.</p>
`,r={book:n,chapter:_,chapterTitle:e,slug:t,title:i,headings:s,html:a};export{n as book,_ as chapter,e as chapterTitle,r as default,s as headings,a as html,t as slug,i as title};
