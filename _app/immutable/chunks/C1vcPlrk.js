const s="postgres-internals",a="pgsql05",n="التحكّم بالتزامن",t="index",e="التحكّم بالتزامن",p=[{depth:2,id:"531-الإدراج",text:"5.3.1. الإدراج"},{depth:2,id:"532-الحذف",text:"5.3.2. الحذف"},{depth:2,id:"533-التحديث",text:"5.3.3. التحديث"},{depth:2,id:"534-خريطة-المساحة-الحرة",text:"5.3.4. خريطة المساحة الحرة"},{depth:2,id:"541-حالة-المعاملة",text:"5.4.1. حالة المعاملة"},{depth:2,id:"542-كيف-يعمل-سجل-الالتزام",text:"5.4.2. كيف يعمل سجل الالتزام"},{depth:2,id:"543-صيانة-سجل-الالتزام",text:"5.4.3. صيانة سجل الالتزام"},{depth:2,id:"561-حالة-txmin-هي-aborted",text:"5.6.1. حالة t_xmin هي ABORTED"},{depth:2,id:"562-حالة-txmin-هي-inprogress",text:"5.6.2. حالة t_xmin هي IN_PROGRESS"},{depth:2,id:"563-حالة-txmin-هي-committed",text:"5.6.3. حالة t_xmin هي COMMITTED"},{depth:2,id:"571-فحص-الظهور",text:"5.7.1. فحص الظهور"},{depth:2,id:"572-بتات-التلميح-hint-bits",text:"5.7.2. بتّات التلميح (Hint Bits)"},{depth:2,id:"573-القراءات-الشبحية-في-مستوى-repeatable-read-في-postgresql",text:"5.7.3. القراءات الشبحية في مستوى REPEATABLE READ في PostgreSQL"},{depth:2,id:"581-سلوك-أوامر-update-المتزامنة",text:"5.8.1. سلوك أوامر UPDATE المتزامنة"},{depth:2,id:"582-أمثلة",text:"5.8.2. أمثلة"},{depth:3,id:"5821-المثال-1",text:"5.8.2.1. المثال 1"},{depth:3,id:"5822-المثال-2",text:"5.8.2.2. المثال 2"},{depth:3,id:"5823-المثال-3",text:"5.8.2.3. المثال 3"},{depth:2,id:"591-الاستراتيجية-الأساسية-لتنفيذ-ssi",text:"5.9.1. الاستراتيجية الأساسية لتنفيذ SSI"},{depth:2,id:"592-تنفيذ-ssi-في-postgresql",text:"5.9.2. تنفيذ SSI في PostgreSQL"},{depth:3,id:"5921-أقفال-siread",text:"5.9.2.1. أقفال SIREAD"},{depth:3,id:"5922-تعارضات-rw",text:"5.9.2.2. تعارضات rw"},{depth:3,id:"5923-كشف-التعارضات-وأول-مودع-يفوز",text:"5.9.2.3. كشف التعارضات وأول مُودِع يفوز"},{depth:2,id:"593-كيف-يعمل-ssi",text:"5.9.3. كيف يعمل SSI"},{depth:3,id:"5931-سيناريوهات-أخرى",text:"5.9.3.1. سيناريوهات أخرى"},{depth:2,id:"594-شذوذات-التسلسل-الإيجابية-الكاذبة",text:"5.9.4. شذوذات التسلسل الإيجابية الكاذبة"},{depth:3,id:"5941-السيناريو-الإيجابي-الكاذب-1",text:"5.9.4.1. السيناريو الإيجابي الكاذب 1."},{depth:3,id:"5942-السيناريو-الإيجابي-الكاذب-2",text:"5.9.4.2. السيناريو الإيجابي الكاذب 2."},{depth:2,id:"5101-مشكلة-التفاف-المعاملة",text:"5.10.1. مشكلة التفاف المعاملة"},{depth:2,id:"5102-عملية-التجميد",text:"5.10.2. عملية التجميد"}],l=`<h1>5.1 معرّف المعاملة (Transaction ID)</h1>
<p>في بداية كل معاملة (transaction)، يمنح مدير المعاملات معرّفاً فريداً يُعرف بمعرّف المعاملة (transaction ID، ويُختصر <strong>txid</strong>). ومعرّف المعاملة في PostgreSQL عدد صحيح غير سالب بعرض 32 بت، ما يمنحه نطاقاً أقصى يقارب 4.2 مليار (ألف مليون) قيمة.</p>
<p>تُعيد الدالة المدمجة <a href="https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-TXID-SNAPSHOT">txid_current()</a> معرّف المعاملة الحالي:</p>
<pre><code>testdb=# BEGIN;
BEGIN
testdb=# SELECT txid_current();
 txid_current
--------------
          100
(1 row)
</code></pre>
<p>يحجز PostgreSQL ثلاثة معرّفات معاملات خاصة:</p>
<ul>
<li><strong>0:</strong> يمثّل معرّف معاملة غير صالح (Invalid).</li>
<li><strong>1:</strong> يمثّل معرّف معاملة الإقلاع (Bootstrap)، ويُستخدم فقط أثناء تهيئة عنقود قواعد البيانات.</li>
<li><strong>2:</strong> يمثّل معرّف المعاملة المجمَّد (Frozen)، كما هو موضّح في القسم 5.10.2.</li>
</ul>
<p>يمكن مقارنة معرّفات المعاملات. فمن منظور المعرّف 100، تُعدّ المعرّفات الأكبر من 100 «في المستقبل» و<strong>غير مرئية</strong>. أما المعرّفات الأقل من 100 فتُعدّ «في الماضي» و<strong>مرئية</strong> (الشكل 5.1 أ)).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-01.webp" alt=""></p>
<h4>الشكل 5.1. معرّفات المعاملات في PostgreSQL.</h4>
<p>لأن فضاء معرّفات المعاملات البالغ 32 بت غير كافٍ في الأنظمة العملية، يتعامل معه PostgreSQL كدائرة. فبالنسبة إلى أي معرّف معاملة محدّد، تكون المعرّفات السابقة البالغة 2.1 مليار «في الماضي»، بينما تكون المعرّفات اللاحقة البالغة 2.1 مليار «في المستقبل» (الشكل 5.1 ب)).</p>
<p>تُوصَف <strong>مشكلة التفاف معرّف المعاملة (txid wraparound)</strong> وحلولها في القسم 5.10.1.</p>
<p>** معلومات</p>
<p>لا يمنح الأمر BEGIN معرّف معاملة.</p>
<p>في PostgreSQL، لا يمنح مدير المعاملات معرّف معاملة إلا عند تنفيذ أول أمر بعد BEGIN.</p>
<pre><code>testdb=# BEGIN;                    -- TXID is not assigned yet.
BEGIN
testdb=# SELECT txid_current();    -- TXUD is just assigned.
 txid_current
--------------
          100
(1 row)
</code></pre>
<h1>5.2 بنية الصف (Tuple Structure)</h1>
<p>تُصنَّف صفوف الكومة (heap tuples) في صفحات الجداول إلى نوعين: صفوف البيانات القياسية وصفوف TOAST. يصف هذا القسم بنية صفوف البيانات القياسية.</p>
<p>يتكوّن صف الكومة (tuple) من ثلاثة أجزاء: بنية <code>HeapTupleHeaderData</code> المعرّفة في <a href="https://github.com/postgres/postgres/blob/ee943004466418595363d567f18c053bae407792/src/include/access/htup_details.h">htup_details.h</a>، وخريطة بتّات للقيم الفارغة (NULL bitmap)، وبيانات المستخدم (الشكل 5.2).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-02.webp" alt=""></p>
<h4>الشكل 5.2. بنية الصف.</h4>
<p>فيما يلي بنية <code>HeapTupleHeaderData</code> والبنى المرتبطة بها:</p>
<pre><code>typedef struct HeapTupleFields
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
</code></pre>
<p>رغم أن بنية HeapTupleHeaderData تضمّ عدة حقول، فإن الحقول الأربعة التالية أساسية لفهم التحكّم بالتزامن (concurrency control):</p>
<ul>
<li><strong>t_xmin:</strong> يخزّن معرّف المعاملة التي أدرجت الصف.</li>
<li><strong>t_xmax:</strong> يخزّن معرّف المعاملة التي حذفت الصف أو حدّثته. وإذا لم يكن الصف محذوفاً أو محدَّثاً، فتُضبط t_xmax على 0 (غير صالح).</li>
<li><strong>t_cid:</strong> يخزّن معرّف الأمر (cid)، وهو عدد أوامر SQL المنفَّذة قبل الأمر الحالي ضمن المعاملة نفسها، بدءاً من 0. على سبيل المثال، في كتلة معاملة تضمّ ثلاثة أوامر INSERT: ‘BEGIN;INSERT;INSERT;INSERT;COMMIT’، يكون t_cid للصف الذي أدرجه الأمر الأول 0، وللثاني 1، وللثالث 2.</li>
<li><strong>t_ctid:</strong> يخزّن معرّف الصف (tid)، الذي يشير إما إلى الصف نفسه وإما إلى نسخة أحدث منه. وكما هو موضّح في القسم 1.3، يحدّد tid الموضع الفيزيائي للصف داخل الجدول. وعند تحديث صف، يُحدَّث t_ctid الخاص به ليشير إلى النسخة الجديدة من الصف؛ وإلا فإنه يشير إلى الصف نفسه.</li>
</ul>
<h1>5.3. إدراج الصفوف وحذفها وتحديثها</h1>
<p>يصف هذا القسم عمليات إدراج الصفوف وحذفها وتحديثها. كما يقدّم لمحة موجزة عن خريطة المساحة الحرة (Free Space Map, FSM)، التي تُستخدم أثناء عمليات الإدراج والتحديث.</p>
<p>للتركيز على التفاصيل المتعلقة بالصف، تُحذف ترويسات الصفحات ومؤشرات الأسطر من الأوصاف التالية. ويوضّح الشكل 5.3 التمثيل الأساسي للصفوف المستخدم في هذا القسم.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-03.webp" alt=""></p>
<h4>الشكل 5.3. تمثيل الصفوف.</h4>
<p>محتويات القسم</p>
<ul>
<li>5.3.1. الإدراج</li>
<li>5.3.2. الحذف</li>
<li>5.3.3. التحديث</li>
<li>5.3.4. خريطة المساحة الحرة</li>
</ul>
<h2 id="531-الإدراج">5.3.1. الإدراج</h2>
<p>في عملية الإدراج، يُوضع صف جديد مباشرةً في إحدى صفحات الجدول الهدف (الشكل 5.4).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-04.webp" alt=""></p>
<h4>الشكل 5.4. إدراج صف.</h4>
<p>لنفترض أن معاملة بمعرّف 99 تُدرج صفاً. عندئذٍ تُضبط حقول الترويسة للصف المُدرج كما يلي:</p>
<ul>
<li><strong>Tuple_1:</strong> <strong>t_xmin:</strong> يُضبط على 99 (معرّف المعاملة المُدرِجة).</li>
<li><strong>t_xmax:</strong> يُضبط على 0 (غير صالح)، لأن الصف لم يُحذف ولم يُحدَّث.</li>
<li><strong>t_cid:</strong> يُضبط على 0، ما يدل على أن هذا أول أمر تنفّذه المعاملة 99.</li>
<li><strong>t_ctid:</strong> يُضبط على (0, 1). وهو يشير إلى الصف نفسه لأنه أحدث نسخة.</li>
</ul>
<p>** pageinspect</p>
<p>إن امتداد <a href="https://www.postgresql.org/docs/current/pageinspect.html">pageinspect</a> وحدة مساهمة تعرض محتويات صفحات قاعدة البيانات.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> EXTENSION pageinspect;
<span class="hljs-keyword">CREATE</span> EXTENSION
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> tbl (data text);
<span class="hljs-keyword">CREATE TABLE</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> tbl <span class="hljs-keyword">VALUES</span>(<span class="hljs-string">&#x27;A&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">SELECT</span> lp <span class="hljs-keyword">as</span> tuple, t_xmin, t_xmax, t_field3 <span class="hljs-keyword">as</span> t_cid, t_ctid
                <span class="hljs-keyword">FROM</span> heap_page_items(get_raw_page(<span class="hljs-string">&#x27;tbl&#x27;</span>, <span class="hljs-number">0</span>));
 tuple <span class="hljs-operator">|</span> t_xmin <span class="hljs-operator">|</span> t_xmax <span class="hljs-operator">|</span> t_cid <span class="hljs-operator">|</span> t_ctid
<span class="hljs-comment">-------+--------+--------+-------+--------</span>
     <span class="hljs-number">1</span> <span class="hljs-operator">|</span>     <span class="hljs-number">99</span> <span class="hljs-operator">|</span>      <span class="hljs-number">0</span> <span class="hljs-operator">|</span>     <span class="hljs-number">0</span> <span class="hljs-operator">|</span> (<span class="hljs-number">0</span>,<span class="hljs-number">1</span>)
(<span class="hljs-number">1</span> <span class="hljs-type">row</span>)
</code></pre>
<h2 id="532-الحذف">5.3.2. الحذف</h2>
<p>في عملية الحذف، يُحذف الصف الهدف منطقياً. ويُسجَّل معرّف المعاملة التي تنفّذ أمر DELETE في الحقل t_xmax الخاص بالصف (الشكل 5.5).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-05.webp" alt=""></p>
<h4>الشكل 5.5. حذف صف.</h4>
<p>لنفترض أن المعاملة 201 تحذف Tuple_1. عندئذٍ تُحدَّث حقول الترويسة كما يلي:</p>
<ul>
<li><strong>Tuple_1:</strong> <strong>t_xmax:</strong> يُضبط على 201.</li>
</ul>
<p>بمجرد أن تُودِع المعاملة 201، يصبح Tuple_1 غير ضروري. وفي PostgreSQL، تُسمّى الصفوف غير الضرورية هذه <strong>صفوفاً ميتة (dead tuples)</strong>.</p>
<p>تُزال الصفوف الميتة في النهاية عبر <strong>عملية التفريغ (VACUUM)</strong>، وهي مفصّلة في <a href="/arabic-cs-library/book/postgres-internals/pgsql06/index">الفصل 6</a>.</p>
<h2 id="533-التحديث">5.3.3. التحديث</h2>
<p>في عملية التحديث، يحذف PostgreSQL النسخة الموجودة منطقياً ويُدرج نسخة جديدة (الشكل 5.6).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-06.webp" alt=""></p>
<h4>الشكل 5.6. تحديث الصف مرتين.</h4>
<p>لنفترض أن صفاً أدرجته أصلاً المعاملة 99 يُحدَّث مرتين بواسطة المعاملة 100.</p>
<p>يحذف أمر UPDATE الأول Tuple_1 منطقياً بضبط t_xmax على 100، ثم يُدرج Tuple_2. بالإضافة إلى ذلك، يُحدَّث t_ctid الخاص بـ Tuple_1 ليشير إلى Tuple_2.</p>
<ul>
<li><strong>Tuple_1:</strong> <strong>t_xmax:</strong> يُضبط على 100.</li>
<li><strong>t_ctid:</strong> يُحدَّث من (0, 1) إلى (0, 2).</li>
</ul>
<p><strong>Tuple_2:</strong></p>
<ul>
<li><strong>t_xmin:</strong> يُضبط على 100.</li>
<li><strong>t_xmax:</strong> يُضبط على 0.</li>
<li><strong>t_cid:</strong> يُضبط على 0.</li>
<li><strong>t_ctid:</strong> يُضبط على (0, 2).</li>
</ul>
<p>يتبع أمر UPDATE الثاني المنطق نفسه: يُحذف Tuple_2 منطقياً، ويُدرَج Tuple_3.</p>
<ul>
<li><strong>Tuple_2:</strong> <strong>t_xmax:</strong> يُضبط على 100.</li>
<li><strong>t_ctid:</strong> يُحدَّث من (0, 2) إلى (0, 3).</li>
</ul>
<p><strong>Tuple_3:</strong></p>
<ul>
<li><strong>t_xmin:</strong> يُضبط على 100.</li>
<li><strong>t_xmax:</strong> يُضبط على 0.</li>
<li><strong>t_cid:</strong> يُضبط على 1.</li>
<li><strong>t_ctid:</strong> يُضبط على (0, 3).</li>
</ul>
<p>إذا أودعت المعاملة 100، يصبح Tuple_1 وTuple_2 صفين ميتين. وإذا تراجعت المعاملة 100، يصبح Tuple_2 وTuple_3 صفين ميتين.</p>
<h2 id="534-خريطة-المساحة-الحرة">5.3.4. خريطة المساحة الحرة</h2>
<p>يستخدم PostgreSQL <strong>خريطة المساحة الحرة (Free Space Map, FSM)</strong> لاختيار صفحة ذات سعة كافية عند إدراج صف كومة أو صف فهرس.</p>
<p>وكما هو موضّح في القسم 1.2.3، لكل جدول وفهرس خريطة FSM مرتبطة به. وتتتبّع كل خريطة FSM المساحة الحرة المتاحة في كل صفحة من الملف المقابل لها.</p>
<p>تُخزَّن ملفات FSM بلاحقة “.fsm” وتُحمَّل إلى الذاكرة المشتركة حسب الحاجة.</p>
<p>** pg_freespacemap</p>
<p>يعرض الامتداد <a href="https://www.postgresql.org/docs/current/static/pgfreespacemap.html">pg_freespacemap</a> المساحة الحرة المتاحة لجدول أو فهرس محدّد.</p>
<p>يُظهر الاستعلام التالي نسبة المساحة الحرة لكل صفحة في جدول.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> EXTENSION pg_freespacemap;
<span class="hljs-keyword">CREATE</span> EXTENSION

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>, round(<span class="hljs-number">100</span> <span class="hljs-operator">*</span> avail<span class="hljs-operator">/</span><span class="hljs-number">8192</span> ,<span class="hljs-number">2</span>) <span class="hljs-keyword">as</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;freespace ratio<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;
                <span class="hljs-keyword">FROM</span> pg_freespace(<span class="hljs-string">&#x27;accounts&#x27;</span>);
 blkno <span class="hljs-operator">|</span> avail <span class="hljs-operator">|</span> freespace ratio
<span class="hljs-comment">-------+-------+-----------------</span>
     <span class="hljs-number">0</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7904</span> <span class="hljs-operator">|</span>           <span class="hljs-number">96.00</span>
     <span class="hljs-number">1</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7520</span> <span class="hljs-operator">|</span>           <span class="hljs-number">91.00</span>
     <span class="hljs-number">2</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7136</span> <span class="hljs-operator">|</span>           <span class="hljs-number">87.00</span>
     <span class="hljs-number">3</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7136</span> <span class="hljs-operator">|</span>           <span class="hljs-number">87.00</span>
     <span class="hljs-number">4</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7136</span> <span class="hljs-operator">|</span>           <span class="hljs-number">87.00</span>
     <span class="hljs-number">5</span> <span class="hljs-operator">|</span>  <span class="hljs-number">7136</span> <span class="hljs-operator">|</span>           <span class="hljs-number">87.00</span>
....
</code></pre>
<h1>5.4. سجل الالتزام (clog)</h1>
<p>يحتفظ PostgreSQL بحالات المعاملات في <strong>سجل الالتزام (Commit Log)</strong>، الذي يُشار إليه عادةً بـ<strong>clog</strong>. ويُخصَّص سجل الالتزام داخل الذاكرة المشتركة ويُستخدم طوال معالجة المعاملات كلها.</p>
<p>يصف هذا القسم حالات المعاملة، وطريقة عمل سجل الالتزام، وصيانته.</p>
<p>محتويات القسم</p>
<ul>
<li>5.4.1. حالة المعاملة</li>
<li>5.4.2. كيف يعمل سجل الالتزام</li>
<li>5.4.3. صيانة سجل الالتزام</li>
</ul>
<h2 id="541-حالة-المعاملة">5.4.1. حالة المعاملة</h2>
<p>يعرّف PostgreSQL أربع حالات للمعاملة: IN_PROGRESS وCOMMITTED وABORTED وSUB_COMMITTED.</p>
<p>الحالات الثلاث الأولى بديهية. فمثلاً، ما دامت المعاملة نشطة، تكون حالتها IN_PROGRESS.</p>
<p>الحالة SUB_COMMITTED مخصّصة للمعاملات الفرعية؛ وتُحذف تفاصيلها من هذا التوثيق.</p>
<h2 id="542-كيف-يعمل-سجل-الالتزام">5.4.2. كيف يعمل سجل الالتزام</h2>
<p>يتكوّن سجل الالتزام من صفحة واحدة أو أكثر بحجم 8 كيلوبايت في الذاكرة المشتركة. وهو يشكّل منطقياً مصفوفةً تتوافق فهارسها مع معرّفات المعاملات (txids). ويخزّن كل عنصر في المصفوفة حالة معرّف المعاملة المقابل. ويوضّح الشكل 5.7 بنية سجل الالتزام وطريقة عمله.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-07.webp" alt=""></p>
<h4>الشكل 5.7. كيف يعمل سجل الالتزام.</h4>
<ul>
<li><strong>T1:</strong> تُودِع المعاملة 200؛ فتتغيّر حالتها من IN_PROGRESS إلى COMMITTED.</li>
<li><strong>T2:</strong> تتراجع المعاملة 201؛ فتتغيّر حالتها من IN_PROGRESS إلى ABORTED.</li>
</ul>
<p>مع تقدّم معرّف المعاملة الحالي، يُضيف PostgreSQL صفحة جديدة متى امتلأت الصفحة الحالية.</p>
<p>لتنفيذ التحكّم بالتزامن، تسترجع دوال داخلية حالة المعاملة من سجل الالتزام. ثم تُعيد هذه الدوال حالة المعاملة المطلوبة. (راجع «بتّات التلميح (Hint Bits)» في القسم 5.7.1.1 لمزيد من التفاصيل.)</p>
<h2 id="543-صيانة-سجل-الالتزام">5.4.3. صيانة سجل الالتزام</h2>
<p>يكتب PostgreSQL بيانات سجل الالتزام إلى ملفات في الدليل الفرعي pg_xact<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> عند الإيقاف أو كلما عملت عملية نقطة تحقق (checkpoint). وتُسمّى هذه الملفات تسمية تسلسلية، مثل ‘0000’ و‘0001’.</p>
<p>الحد الأقصى لحجم كل ملف 256 كيلوبايت. فمثلاً، إذا شغل سجل الالتزام ثماني صفحات (بإجمالي 64 كيلوبايت)، تُكتب البيانات كلها في الملف 0000. وإذا شغل 37 صفحة (بإجمالي 296 كيلوبايت)، تُوزَّع البيانات بين الملفين 0000 (256 كيلوبايت) و0001 (40 كيلوبايت).</p>
<p>أثناء بدء التشغيل، يحمّل PostgreSQL البيانات من ملفات pg_xact لتهيئة سجل الالتزام في الذاكرة المشتركة.</p>
<p>يزداد الحجم الإجمالي لسجل الالتزام باستمرار مع إضافة صفحات جديدة. غير أن البيانات القديمة تصبح في النهاية غير ضرورية. وتزيل عملية التفريغ (VACUUM)، الموضّحة في <a href="/arabic-cs-library/book/postgres-internals/pgsql06/index">الفصل 6</a>، صفحات وملفات سجل الالتزام القديمة بانتظام. وتُقدَّم تفاصيل إزالة بيانات سجل الالتزام في القسم 6.4.</p>
<h1>5.5. لقطة المعاملة (Transaction Snapshot)</h1>
<p><strong>لقطة المعاملة (transaction snapshot)</strong> مجموعة بيانات تخزّن معلومات عن نشاط جميع المعاملات عند لحظة زمنية محدّدة، وذلك بالنسبة إلى معاملة فردية. وفي هذا السياق، تكون المعاملة <strong>نشطة</strong> إذا كانت قيد التنفيذ أو لم تبدأ بعد.</p>
<p>يعرّف PostgreSQL التمثيل النصي الداخلي للقطة المعاملة بالصيغة <code>xmin:xmax:xip_list</code>. فمثلاً، في تمثيل مبسّط مثل ‘100:100:’، يدل ذلك على أن معرّفات المعاملات الأقل من 100 ليست نشطة، بينما المعرّفات المساوية لـ100 أو الأكبر منها نشطة.</p>
<p>تُستخدم صيغة التمثيل هذه في الأوصاف التالية. (لمزيد من التفاصيل حول الصيغة، راجع ** أدناه.)</p>
<p>** الدالة المدمجة pg_current_snapshot وصيغة تمثيلها النصي</p>
<p>تُعيد الدالة <a href="https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-PG-SNAPSHOT">pg_current_snapshot</a> لقطةً للمعاملة الحالية.</p>
<pre><code>testdb=# SELECT pg_current_snapshot();
 pg_current_snapshot
---------------------
 100:104:100,102
(1 row)
</code></pre>
<p>يتبع التمثيل النصي للقطة الصيغة <code>xmin:xmax:xip_list</code>. ويُعرَّف كل مكوّن كما يلي:</p>
<ul>
<li><strong>xmin:</strong> أقدم معرّف معاملة ما زال نشطاً. فكل المعاملات الأسبق منه إما مودَعة ومرئية وإما متراجعة وميتة.</li>
<li><strong>xmax:</strong> أول معرّف معاملة لم يُسنَد بعد. فكل المعرّفات المساوية لهذه القيمة أو الأكبر منها لم تكن قد بدأت عند لحظة اللقطة، ولذلك فهي غير مرئية.</li>
<li><strong>xip_list:</strong> قائمة بمعرّفات المعاملات النشطة عند لحظة اللقطة. وتضمّ هذه القائمة المعرّفات النشطة الواقعة بين xmin وxmax فقط.</li>
</ul>
<p>فمثلاً، في اللقطة ‘100:104:100,102’، يكون xmin هو 100، وxmax هو 104، وتضمّ xip_list القيمتين 100 و102.</p>
<p>يوضّح الشكل 5.8 مثالين محدّدين لتمثيل اللقطات.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-08.webp" alt=""></p>
<h4>الشكل 5.8. أمثلة على تمثيل لقطة المعاملة.</h4>
<ul>
<li><strong>المثال 1:</strong> ‘100:100:’ كما هو موضّح في الشكل 5.8(أ)، تدل هذه اللقطة على ما يلي: معرّفات المعاملات الأقل من 100 <strong>ليست</strong> نشطة (xmin = 100).</li>
<li>معرّفات المعاملات المساوية لـ100 أو الأكبر منها <strong>نشطة</strong> (xmax = 100).</li>
</ul>
<p><strong>المثال 2:</strong> ‘100:104:100,102’ كما هو موضّح في الشكل 5.8(ب)، تدل هذه اللقطة على ما يلي:</p>
<ul>
<li>معرّفات المعاملات الأقل من 100 <strong>ليست</strong> نشطة.</li>
<li>معرّفات المعاملات المساوية لـ104 أو الأكبر منها <strong>نشطة</strong>.</li>
<li>المعرّفان 100 و102 <strong>نشطان</strong> لأنهما يظهران في xip_list.</li>
<li>المعرّفان 101 و103 <strong>ليسا</strong> نشطين.</li>
</ul>
<p>يوفّر مدير المعاملات هذه اللقطات. ففي مستوى العزل (isolation level) READ COMMITTED (القراءة المُودَعة)، تحصل المعاملة على لقطة جديدة كلما نُفّذ أمر SQL. وفي المقابل، في مستويي REPEATABLE READ (القراءة القابلة للتكرار) أو SERIALIZABLE (القابل للتسلسل)، لا تحصل المعاملة على لقطة إلا عند تنفيذ أول أمر SQL. وهذه اللقطات ضرورية لفحص ظهور الصفوف (visibility)، وهو موضّح في القسم 5.7.</p>
<p>عند إجراء فحص الظهور، يجب التعامل مع المعاملات الموصوفة بأنها <strong>نشطة</strong> في اللقطة على أنها <strong>قيد التنفيذ</strong>، حتى لو كانت قد أُودِعت أو تراجعت بعد ذلك. وتُنشئ هذه القاعدة الفرق السلوكي الجوهري بين READ COMMITTED وREPEATABLE READ (أو SERIALIZABLE).</p>
<p>يوضّح السيناريو التالي، الممثَّل في الشكل 5.9، التفاعل بين مدير المعاملات والمعاملات الفردية.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-09.webp" alt=""></p>
<h4>الشكل 5.9. مدير المعاملات والمعاملات.</h4>
<p>يحتفظ مدير المعاملات بمعلومات عن جميع المعاملات الجارية حالياً. في هذا السيناريو، تبدأ ثلاث معاملات بالتتابع: تستخدم Transaction_A وTransaction_B مستوى READ COMMITTED، بينما تستخدم Transaction_C مستوى REPEATABLE READ.</p>
<ul>
<li><strong>T1:</strong> تبدأ Transaction_A وتنفّذ أول أمر SELECT لها. في هذه اللحظة، يمنح مدير المعاملات المعرّف 200 ويُعيد اللقطة ‘200:200:’.</li>
<li><strong>T2:</strong> تبدأ Transaction_B وتنفّذ أول أمر SELECT لها. يمنح مدير المعاملات المعرّف 201 ويُعيد اللقطة ‘200:200:’ لأن Transaction_A (المعرّف 200) ما زالت قيد التنفيذ. وبالتالي، تكون Transaction_A غير مرئية لـTransaction_B.</li>
<li><strong>T3:</strong> تبدأ Transaction_C وتنفّذ أول أمر SELECT لها. يمنح مدير المعاملات المعرّف 202 ويُعيد اللقطة ‘200:200:’. وتكون كلٌّ من Transaction_A وTransaction_B غير مرئية لـTransaction_C.</li>
<li><strong>T4:</strong> تُودِع Transaction_A. فيزيل مدير المعاملات معلومات هذه المعاملة.</li>
<li><strong>T5:</strong> تنفّذ Transaction_B وTransaction_C أوامر SELECT لاحقة: تحصل Transaction_B على لقطة جديدة لأنها تعمل بمستوى READ COMMITTED. فتتلقى اللقطة ‘201:201:’ لأن Transaction_A أصبحت مودَعة الآن. وبذلك تصبح Transaction_A مرئية لـTransaction_B.</li>
<li>وفي المقابل، لا تطلب Transaction_C لقطة جديدة. بل تواصل استخدام اللقطة الأولية (‘200:200:’) كما يقتضي مستوى REPEATABLE READ. لذلك تظل Transaction_A غير مرئية لـTransaction_C.</li>
</ul>
<h1>5.6. قواعد فحص الظهور</h1>
<p>تحدّد قواعد فحص الظهور ما إذا كان الصف مرئياً أم غير مرئي. وتستخدم هذه القواعد الحقلين t_xmin وt_xmax للصف، وسجل الالتزام، ولقطة المعاملة.</p>
<p>نظراً لتعقيد مجموعة القواعد الكاملة، يعرض هذا التوثيق القواعد الدنيا اللازمة للأقسام اللاحقة فقط. وتُغفل الأوصاف التالية منطق المعاملات الفرعية ولا تأخذ في الحسبان الصفوف المُحدَّثة أكثر من مرتين ضمن معاملة واحدة (أي يُتجاهل t_ctid).</p>
<p>تُصنَّف القواعد العشر المختارة في الحالات الثلاث التالية بناءً على حالة t_xmin.</p>
<p>محتويات القسم</p>
<ul>
<li>5.6.1. حالة t_xmin هي ABORTED</li>
<li>5.6.2. حالة t_xmin هي IN_PROGRESS</li>
<li>5.6.3. حالة t_xmin هي COMMITTED</li>
</ul>
<h2 id="561-حالة-txmin-هي-aborted">5.6.1. حالة t_xmin هي ABORTED</h2>
<p>الصف الذي تكون فيه حالة t_xmin هي ABORTED يكون دائماً <em>غير مرئي</em> (القاعدة 1) لأن المعاملة التي أدرجته فشلت.</p>
<pre><code>/* t_xmin status == ABORTED */
Rule 1:	  IF t_xmin status is 'ABORTED' THEN
                 RETURN 'Invisible'
          END IF
</code></pre>
<ul>
<li><strong>القاعدة 1:</strong> إذا كان Status(t_xmin) = ABORTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<h2 id="562-حالة-txmin-هي-inprogress">5.6.2. حالة t_xmin هي IN_PROGRESS</h2>
<p>الصف الذي تكون فيه حالة t_xmin هي IN_PROGRESS يكون عموماً <em>غير مرئي</em> (القاعدتان 3 و4)، باستثناء واحد يتعلق بالمعاملة المُدرِجة (القاعدة 2).</p>
<pre><code> /* t_xmin status == IN_PROGRESS */
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
</code></pre>
<p>إذا أدرجت معاملة أخرى الصف وكانت حالة t_xmin الخاصة به IN_PROGRESS، يكون الصف <em>غير مرئي</em> (القاعدة 4). وبعبارة أخرى، تكون التغييرات غير المودَعة من معاملة ما <em>غير مرئية</em> للمعاملات الأخرى.</p>
<p>ويحدث الاستثناء عندما تكون المعاملة الحالية هي التي أدرجت الصف وتكون t_xmax هي INVALID. في هذه الحالة، يكون الصف <em>مرئياً</em> للمعاملة الحالية (القاعدة 2) لأنه أُدرج بواسطة المعاملة الحالية نفسها.</p>
<p>ومع ذلك، حتى إذا كانت t_xmin تساوي معرّف المعاملة الحالية (أي أن المعاملة الحالية أدرجت الصف) وكانت t_xmax <strong>ليست</strong> INVALID، فإن الصف <em>غير مرئي</em> لأن المعاملة الحالية حدّثته أو حذفته بالفعل (القاعدة 3).</p>
<ul>
<li><strong>القاعدة 2:</strong> إذا كان Status(t_xmin) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmin = current_txid <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax = INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li><strong>القاعدة 3:</strong> إذا كان Status(t_xmin) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmin = current_txid <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
<li><strong>القاعدة 4:</strong> إذا كان Status(t_xmin) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmin <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> current_txid <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<h2 id="563-حالة-txmin-هي-committed">5.6.3. حالة t_xmin هي COMMITTED</h2>
<p>الصف الذي تكون فيه حالة t_xmin هي COMMITTED يكون <em>مرئياً</em> (القواعد 6 و8 و9)، مع ثلاثة استثناءات.</p>
<pre><code> /* t_xmin status == COMMITTED */
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
</code></pre>
<p>القاعدة 6 واضحة مباشرة لأن t_xmax إما INVALID وإما ABORTED. وفيما يلي وصف الاستثناءات الثلاثة إلى جانب القاعدتين 8 و9.</p>
<p>يحدث الاستثناء الأول عندما تكون t_xmin نشطة في لقطة المعاملة المُحصَّلة (القاعدة 5). وفي هذه الحالة يكون الصف <em>غير مرئي</em> لأن t_xmin تُعامَل على أنها قيد التنفيذ.</p>
<p>ويحدث الاستثناء الثاني عندما تساوي t_xmax معرّف المعاملة الحالية (القاعدة 7). في هذه الحالة، وعلى غرار القاعدة 3، يكون الصف <em>غير مرئي</em> لأن المعاملة الحالية حذفته أو حدّثته.</p>
<p>وفي المقابل، إذا كانت حالة t_xmax هي IN_PROGRESS ولم تكن t_xmax هي معرّف المعاملة الحالية (القاعدة 8)، يكون الصف <em>مرئياً</em>. وذلك لأن المعاملة الحاذفة ما زالت قيد التنفيذ ولم تُودِع بعد.</p>
<p>ويحدث الاستثناء الثالث عندما تكون حالة t_xmax هي COMMITTED ولا تكون t_xmax <strong>نشطة</strong> في لقطة المعاملة المُحصَّلة (القاعدة 10). وفي هذه الحالة يكون الصف <em>غير مرئي</em> لأن معاملة أخرى أودعت حذفه أو تحديثه.</p>
<p>وفي المقابل، إذا كانت حالة t_xmax هي COMMITTED لكن t_xmax نشطة في اللقطة المُحصَّلة (القاعدة 9)، يكون الصف <em>مرئياً</em>. وذلك لأن المعاملة الحاذفة تُعامَل على أنها قيد التنفيذ.</p>
<ul>
<li><strong>القاعدة 5:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmin) = active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
<li><strong>القاعدة 6:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> ((t_xmax = INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∨</mo></mrow><annotation encoding="application/x-tex">\\vee</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∨</span></span></span></span> Status(t_xmax) = ABORTED)) <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li><strong>القاعدة 7:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax = current_txid <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
<li><strong>القاعدة 8:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> current_txid <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li><strong>القاعدة 9:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmax) = active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li><strong>القاعدة 10:</strong> إذا كان Status(t_xmin) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmax) <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<p>وخلاصة القول، يكون الصف ذو t_xmin بحالة COMMITTED <em>مرئياً</em> عموماً. غير أنه يكون <em>غير مرئي</em> فقط إذا كانت المعاملة المُدرِجة ما زالت قيد التنفيذ (القاعدة 5)، أو إذا كان الصف قد حُذف أو حُدِّث منطقياً (القاعدتان 7 و10).</p>
<h1>5.7. فحص الظهور</h1>
<p>يصف هذا القسم عملية فحص الظهور في PostgreSQL. وتختار هذه العملية صفوف الكومة ذات الإصدارات المناسبة لمعاملة معيّنة. كما يشرح هذا القسم كيف يمنع PostgreSQL الشذوذات المعرّفة في معيار ANSI SQL-92: القراءات القذرة (Dirty Reads)، والقراءات غير القابلة للتكرار (Non-Repeatable Reads)، والقراءات الشبحية (Phantom Reads).</p>
<p>محتويات القسم</p>
<ul>
<li>5.7.1. فحص الظهور</li>
<li>5.7.2. بتّات التلميح</li>
<li>5.7.3. القراءات الشبحية في مستوى REPEATABLE READ في PostgreSQL</li>
</ul>
<h2 id="571-فحص-الظهور">5.7.1. فحص الظهور</h2>
<p>يوضّح الشكل 5.10 سيناريو لفحص الظهور.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-10.webp" alt=""></p>
<h4>الشكل 5.10. سيناريو لوصف فحص الظهور.</h4>
<p>في السيناريو الموضّح في الشكل 5.10، تُنفَّذ أوامر SQL بالتسلسل التالي:</p>
<ul>
<li><strong>T1:</strong> بدء المعاملة (المعرّف 200)</li>
<li><strong>T2:</strong> بدء المعاملة (المعرّف 201)</li>
<li><strong>T3:</strong> تنفيذ أوامر SELECT للمعرّفين 200 و201</li>
<li><strong>T4:</strong> تنفيذ أمر UPDATE للمعرّف 200</li>
<li><strong>T5:</strong> تنفيذ أوامر SELECT للمعرّفين 200 و201</li>
<li><strong>T6:</strong> إيداع المعاملة 200</li>
<li><strong>T7:</strong> تنفيذ أمر SELECT للمعرّف 201</li>
</ul>
<p>لتبسيط الوصف، يفترض هذا السيناريو معاملتين فقط: المعرّفان 200 و201. ومستوى العزل للمعرّف 200 هو READ COMMITTED. ومستوى العزل للمعرّف 201 إما READ COMMITTED وإما REPEATABLE READ.</p>
<p>فيما يلي وصف لكيفية إجراء أوامر SELECT فحص الظهور لكل صف.</p>
<p><strong>أوامر SELECT في T3:</strong></p>
<p>عند T3، لا يوجد في الجدول ’tbl’ سوى Tuple_1. وهو <em>مرئي</em> وفق <strong>القاعدة 6</strong>. لذلك تُعيد أوامر SELECT في المعاملتين معاً القيمة ‘Jekyll’.</p>
<ul>
<li>Rule6(Tuple_1) <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> Status(t_xmin:199) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax = INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
</ul>
<pre><code>testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
</code></pre>
<pre><code>testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
</code></pre>
<p><strong>أوامر SELECT في T5:</strong></p>
<p>أولاً، لننظر في أمر SELECT الذي تنفّذه المعاملة 200. يكون Tuple_1 <em>غير مرئي</em> وفق <strong>القاعدة 7</strong>، ويكون Tuple_2 <em>مرئياً</em> وفق <strong>القاعدة 2</strong>. وبالتالي يُعيد أمر SELECT هذا القيمة ‘Hyde’.</p>
<ul>
<li>Rule7(Tuple_1): Status(t_xmin:199) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax:200) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax:200 = current_txid:200 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
<li>Rule2(Tuple_2): Status(t_xmin:200) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmin:200 = current_txid:200 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax = INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
</ul>
<pre><code>testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
</code></pre>
<p>وفي المقابل، في أمر SELECT الذي تنفّذه المعاملة 201، يكون Tuple_1 <em>مرئياً</em> وفق <strong>القاعدة 8</strong>، ويكون Tuple_2 <em>غير مرئي</em> وفق <strong>القاعدة 4</strong>. لذلك يُعيد أمر SELECT هذا القيمة ‘Jekyll’.</p>
<ul>
<li>Rule8(Tuple_1): Status(t_xmin:199) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax:200) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax:200 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> current_txid:201 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li>Rule4(Tuple_2): Status(t_xmin:200) = IN_PROGRESS <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmin:200 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> current_txid:201 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<pre><code>testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
</code></pre>
<p>** قراءة قذرة</p>
<p><strong>القراءة القذرة (Dirty Read)</strong> (أو <strong>تعارض الكتابة-القراءة (wr-conflict)</strong>) هي ظهور التحديثات غير المودَعة لمعاملات أخرى. ولا تحدث مثل هذه القراءات عند أي مستوى عزل في PostgreSQL.</p>
<p><strong>أمر SELECT في T7:</strong></p>
<p>فيما يلي وصف سلوك أوامر SELECT عند T7 لكلا مستويي العزل.</p>
<p>عندما تستخدم المعاملة 201 مستوى READ COMMITTED، تكون لقطة المعاملة ‘201:201:’. وفي هذه الحالة تُعامَل المعاملة 200 على أنها COMMITTED. لذلك يكون Tuple_1 <em>غير مرئي</em> وفق <strong>القاعدة 10</strong>، ويكون Tuple_2 <em>مرئياً</em> وفق <strong>القاعدة 6</strong>. ويُعيد أمر SELECT القيمة ‘Hyde’.</p>
<ul>
<li>Rule10(Tuple_1): Status(t_xmin:199) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax:200) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmax:200) <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo mathvariant="normal">≠</mo></mrow><annotation encoding="application/x-tex">\\ne</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel"><span class="mrel"><span class="mord katex-vbox"><span class="katex-thinbox"><span class="rlap"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="katex-inner"><span class="mord"><span class="mrel"></span></span></span><span class="katex-fix"></span></span></span></span></span><span class="mspace nobreak"></span><span class="mrel">=</span></span></span></span></span> active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
<li>Rule6(Tuple_2): Status(t_xmin:200) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> t_xmax = INVALID <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
</ul>
<pre><code>testdb=# -- txid 201 (READ COMMITTED)
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
</code></pre>
<p>لاحظ أن نتائج أوامر SELECT تختلف تبعاً لما إذا كانت المعاملة 200 قد أُودِعت أم لا. وتُعرف هذه الظاهرة بـ<strong>القراءة غير القابلة للتكرار (Non-Repeatable Read)</strong>.</p>
<p>وفي المقابل، عندما تستخدم المعاملة 201 مستوى REPEATABLE READ، تكون لقطة المعاملة ‘200:200:’. وبالتالي تُعامَل المعاملة 200 على أنها IN_PROGRESS. لذلك يكون Tuple_1 <em>مرئياً</em> وفق <strong>القاعدة 9</strong>، ويكون Tuple_2 <em>غير مرئي</em> وفق <strong>القاعدة 5</strong>. ويُعيد أمر SELECT القيمة ‘Jekyll’.</p>
<p>لا تحدث القراءات غير القابلة للتكرار في مستويي العزل REPEATABLE READ (أو SERIALIZABLE).</p>
<ul>
<li>Rule9(Tuple_1): Status(t_xmin:199) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Status(t_xmax:200) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmax:200) = active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> مرئي</li>
<li>Rule5(Tuple_2): Status(t_xmin:200) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmin:200) = active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<pre><code>testdb=# -- txid 201 (REPEATABLE READ)
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
</code></pre>
<h2 id="572-بتات-التلميح-hint-bits">5.7.2. بتّات التلميح (Hint Bits)</h2>
<p>يوفّر PostgreSQL ثلاث دوال داخلية للحصول على حالة المعاملة: TransactionIdIsInProgress() وTransactionIdDidCommit() وTransactionIdDidAbort(). وتستخدم هذه الدوال ذاكرات تخزين مؤقت (caches) لتقليل الوصول المتكرّر إلى سجل الالتزام. غير أن تنفيذها عند فحص كل صف سيُنشئ اختناقات.</p>
<p>ولمعالجة هذه المشكلة، يستخدم PostgreSQL بتّات التلميح (hint bits)، المعرّفة كما يلي:</p>
<pre><code>#define HEAP_XMIN_COMMITTED       0x0100   /* t_xmin committed */
#define HEAP_XMIN_INVALID         0x0200   /* t_xmin invalid/aborted */
#define HEAP_XMAX_COMMITTED       0x0400   /* t_xmax committed */
#define HEAP_XMAX_INVALID         0x0800   /* t_xmax invalid/aborted */
</code></pre>
<p>يضبط PostgreSQL بتّات التلميح في t_infomask الخاص بالصف أثناء عمليات القراءة أو الكتابة متى أمكن ذلك.</p>
<p>فمثلاً، إذا فحص PostgreSQL حالة t_xmin ووجدها COMMITTED، فإنه يضبط بتّة التلميح HEAP_XMIN_COMMITTED في t_infomask الخاص بذلك الصف.</p>
<p>وبمجرد ضبط بتّات التلميح، لا يعود PostgreSQL بحاجة إلى استدعاء TransactionIdDidCommit() أو TransactionIdDidAbort(). وتتيح هذه الآلية للنظام فحص حالتي t_xmin وt_xmax لكل صف بكفاءة.</p>
<h2 id="573-القراءات-الشبحية-في-مستوى-repeatable-read-في-postgresql">5.7.3. القراءات الشبحية في مستوى REPEATABLE READ في PostgreSQL</h2>
<p>يعرّف معيار ANSI SQL-92 مستوى REPEATABLE READ بأنه مستوى عزل يسمح بالقراءات الشبحية (Phantom Reads). غير أن تطبيق PostgreSQL يمنعها. ومن حيث المبدأ، لا يسمح عزل اللقطة (Snapshot Isolation, SI) بالقراءات الشبحية.</p>
<p>لنفترض أن معاملتين، Tx_A وTx_B، تعملان بالتزامن. مستوى العزل لديهما هو READ COMMITTED وREPEATABLE READ، ومعرّفا المعاملة هما 100 و101 على الترتيب. أولاً، تُدرج Tx_A صفاً وتُودِع. ويكون t_xmin للصف المُدرج هو 100.</p>
<p>بعد ذلك، تنفّذ Tx_B أمر SELECT. ويكون الصف الذي أدرجته Tx_A <em>غير مرئي</em> وفق <strong>القاعدة 5</strong>. لذلك لا تحدث قراءات شبحية.</p>
<ul>
<li>Rule5(الصف الجديد): Status(t_xmin:100) = COMMITTED <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>∧</mo></mrow><annotation encoding="application/x-tex">\\wedge</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5556em;"></span><span class="mord">∧</span></span></span></span> Snapshot(t_xmin:100) = active <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>⇒</mo></mrow><annotation encoding="application/x-tex">\\Rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">⇒</span></span></span></span> غير مرئي</li>
</ul>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-comment">-- Tx_A: txid 100</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">-</span>#  ISOLATION LEVEL READ COMMITTED;
<span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">SELECT</span> txid_current();
 txid_current
<span class="hljs-comment">--------------</span>
          <span class="hljs-number">100</span>
(<span class="hljs-number">1</span> <span class="hljs-type">row</span>)

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> tbl(id, data)
                <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">1</span>,<span class="hljs-string">&#x27;phantom&#x27;</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">1</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">COMMIT</span>;
<span class="hljs-keyword">COMMIT</span>
</code></pre>
<pre><code>testdb=# -- Tx_B: txid 101
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
</code></pre>
<h1>5.8. منع التحديثات المفقودة</h1>
<p><strong>التحديث المفقود (Lost Update)</strong>، المعروف أيضاً بـ<strong>تعارض الكتابة-الكتابة (ww-conflict)</strong>، شذوذ يحدث عندما تحدّث معاملات متزامنة الصفوف نفسها. ويجب على PostgreSQL منع هذا الشذوذ في مستويي REPEATABLE READ وSERIALIZABLE. (لاحظ أن مستوى READ COMMITTED لا يحتاج إلى منع التحديثات المفقودة.) ويصف هذا القسم كيف يمنع PostgreSQL التحديثات المفقودة، ويقدّم أمثلة على ذلك.</p>
<p>محتويات القسم</p>
<ul>
<li>5.8.1. سلوك أوامر UPDATE المتزامنة</li>
<li>5.8.2. أمثلة</li>
</ul>
<h2 id="581-سلوك-أوامر-update-المتزامنة">5.8.1. سلوك أوامر UPDATE المتزامنة</h2>
<p>عند تنفيذ أمر UPDATE، تُستدعى الدالة ExecUpdate داخلياً. وفيما يلي شبه الكود (pseudocode) الخاص بـ ExecUpdate:</p>
<h4>شبه الكود: ExecUpdate</h4>
<pre><code>(1)   FOR each row that will be updated by this UPDATE command
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
</code></pre>
<p>** شبه الكود: ExecUpdate (1) احصل على كل صف سيُحدَّث بهذا الأمر UPDATE. (2) كرّر العملية التالية حتى يُحدَّث الصف الهدف (أو تتراجع هذه المعاملة). (3) إذا كان الصف الهدف قيد التحديث، فانتقل إلى الخطوة (4)؛ وإلا فانتقل إلى الخطوة (8). (4) انتظر انتهاء المعاملة التي حدّثت الصف الهدف، لأن PostgreSQL يستخدم مخطط أول مُحدِّث يفوز (first-updater-win) في SI. (5) إذا كانت حالة المعاملة التي حدّثت الصف الهدف هي COMMITTED وكان مستوى عزل هذه المعاملة هو REPEATABLE READ (أو SERIALIZABLE)، فانتقل إلى الخطوة (6)؛ وإلا فانتقل إلى الخطوة (7). (6) أجهِض هذه المعاملة لمنع التحديثات المفقودة. (7) انتقل إلى الخطوة (2) وحاول تحديث الصف الهدف في الجولة التالية. (8) إذا حدّثت معاملة متزامنة أخرى الصف الهدف، فانتقل إلى الخطوة (9)؛ وإلا فانتقل إلى الخطوة (12). (9) إذا كان مستوى عزل هذه المعاملة هو READ COMMITTED، فانتقل إلى الخطوة (10)؛ وإلا فانتقل إلى الخطوة (11). (10) حدِّث الصف الهدف، وانتقل إلى الخطوة (1). (11) أجهِض هذه المعاملة لمنع التحديثات المفقودة. (12) حدِّث الصف الهدف، وانتقل إلى الخطوة (1)، لأن الصف الهدف لم يُعدَّل بعد أو حُدِّث بواسطة معاملة منتهية (أي لا يوجد تعارض كتابة-كتابة). وتستخدم الدالة حلقة while لتحديث كل صف. وينقسم داخل الحلقة إلى ثلاث كتل بناءً على الشروط الموضّحة في الشكل 5.11.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-11.webp" alt=""></p>
<h4>الشكل 5.11. الكتل الداخلية الثلاث في ExecUpdate.</h4>
<ul>
<li>[1] الصف الهدف قيد التحديث (الشكل 5.11[1]): تعني عبارة «قيد التحديث» أن معاملة متزامنة أخرى تحدّث الصف. وفي هذه الحالة، تنتظر المعاملة الحالية انتهاء المعاملة الأخرى لأن عزل اللقطة في PostgreSQL يستخدم مخطط <strong>أول مُحدِّث يفوز (first-updater-win)</strong>. فمثلاً، إذا استهدفت المعاملتان المتزامنتان Tx_A وTx_B الصف نفسه، تنتظر Tx_B انتهاء Tx_A إذا كانت الأخيرة قد حدّثته بالفعل وما زالت قيد التنفيذ. وبعد أن تُودِع Tx_A، تمضي Tx_B قدماً. وتحدّث Tx_B الصف إذا كان مستوى عزلها READ COMMITTED؛ وإلا (REPEATABLE READ أو SERIALIZABLE) فإنها تجهض فوراً لمنع التحديثات المفقودة.</li>
<li>[2] حُدِّث الصف الهدف بواسطة معاملة متزامنة (الشكل 5.11[2]): تحاول المعاملة الحالية تحديث الصف الهدف؛ غير أن معاملة متزامنة أخرى حدّثته وأودعته بالفعل. وفي هذه الحالة، إذا كان مستوى عزل المعاملة الحالية READ COMMITTED، فإنها تحدّث الصف الهدف؛ وإلا فإن المعاملة الحالية تجهض فوراً لمنع التحديثات المفقودة.</li>
<li>[3] لا يوجد تعارض (الشكل 5.11[3]): عندما لا يوجد تعارض، يمكن للمعاملة الحالية تحديث الصف الهدف.</li>
</ul>
<h2 id="582-أمثلة">5.8.2. أمثلة</h2>
<p>تُعرض فيما يلي ثلاثة أمثلة. يوضّح المثالان الأول والثاني السلوك عندما يكون الصف الهدف قيد التحديث. ويوضّح المثال الثالث السلوك بعد تحديث الصف الهدف.</p>
<h3 id="5821-المثال-1">5.8.2.1. المثال 1</h3>
<p>تحدّث المعاملتان Tx_A وTx_B الصف نفسه في الجدول نفسه. وكلتاهما تستخدم مستوى العزل READ COMMITTED.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-comment">-- Tx_A</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">-</span>#    ISOLATION LEVEL READ COMMITTED;
<span class="hljs-keyword">START</span> TRANSACTION

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">UPDATE</span> tbl <span class="hljs-keyword">SET</span> name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Hyde&#x27;</span>;
<span class="hljs-keyword">UPDATE</span> <span class="hljs-number">1</span>

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">COMMIT</span>;
<span class="hljs-keyword">COMMIT</span>
</code></pre>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span>#
testdb<span class="hljs-operator">=</span># <span class="hljs-comment">-- Tx_B</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">-</span>#    ISOLATION LEVEL READ COMMITTED;
<span class="hljs-keyword">START</span> TRANSACTION

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">UPDATE</span> tbl <span class="hljs-keyword">SET</span> name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Utterson&#x27;</span>;

(this transaction <span class="hljs-keyword">is</span> being blocked)

<span class="hljs-keyword">UPDATE</span> <span class="hljs-number">1</span>
</code></pre>
<p>تعمل Tx_B كما يلي:</p>
<ol>
<li>تنتظر Tx_B انتهاء Tx_A بعد تنفيذ أمر UPDATE، لأن Tx_A تحدّث الصف الهدف حالياً (الخطوة (4) من ExecUpdate).</li>
<li>تحاول Tx_B تحديث الصف الهدف بعد أن تُودِع Tx_A (الخطوة (7) من ExecUpdate).</li>
<li>تحدّث Tx_B الصف الهدف مرة أخرى خلال الجولة الثانية من ExecUpdate (الخطوات (2) و(8) و(9) و(10) من ExecUpdate).</li>
</ol>
<h3 id="5822-المثال-2">5.8.2.2. المثال 2</h3>
<p>تحدّث Tx_A وTx_B الصف نفسه. وتستخدم Tx_A المستوى READ COMMITTED، وتستخدم Tx_B المستوى REPEATABLE READ.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-comment">-- Tx_A</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">-</span>#    ISOLATION LEVEL READ COMMITTED;
<span class="hljs-keyword">START</span> TRANSACTION

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">UPDATE</span> tbl <span class="hljs-keyword">SET</span> name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Hyde&#x27;</span>;
<span class="hljs-keyword">UPDATE</span> <span class="hljs-number">1</span>

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">COMMIT</span>;
<span class="hljs-keyword">COMMIT</span>
</code></pre>
<pre><code>testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Utterson';

(this transaction is being blocked)

ERROR:couldn't serialize access due to concurrent update
</code></pre>
<p>تتصرّف Tx_B كما يلي:</p>
<ol>
<li>تنتظر Tx_B انتهاء Tx_A بعد تنفيذ أمر UPDATE (الخطوة (4) من ExecUpdate).</li>
<li>تجهض Tx_B لحلّ التعارض بعد أن تُودِع Tx_A. ويحدث ذلك لأن الصف الهدف حُدِّث ولأن Tx_B تستخدم مستوى العزل REPEATABLE READ (الخطوتان (5) و(6) من ExecUpdate).</li>
</ol>
<h3 id="5823-المثال-3">5.8.2.3. المثال 3</h3>
<p>تحاول Tx_B (بمستوى REPEATABLE READ) تحديث صف هدف سبق أن حدّثته Tx_A المودَعة. وتجهض Tx_B في هذه الحالة (الخطوات (2) و(8) و(9) و(11) من ExecUpdate).</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-comment">-- Tx_A</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">START</span> TRANSACTION
testdb<span class="hljs-operator">-</span>#    ISOLATION LEVEL READ COMMITTED;
<span class="hljs-keyword">START</span> TRANSACTION

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">UPDATE</span> tbl <span class="hljs-keyword">SET</span> name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Hyde&#x27;</span>;
<span class="hljs-keyword">UPDATE</span> <span class="hljs-number">1</span>

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">COMMIT</span>;
<span class="hljs-keyword">COMMIT</span>
</code></pre>
<pre><code>testdb=#
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
</code></pre>
<h1>5.9. عزل اللقطة القابل للتسلسل (Serializable Snapshot Isolation)</h1>
<p>يتضمّن PostgreSQL <strong>عزل اللقطة القابل للتسلسل (Serializable Snapshot Isolation, SSI)</strong> منذ الإصدار 9.1 (عام 2011) لتحقيق مستوى عزل SERIALIZABLE حقيقي.</p>
<p>ولأن شرح SSI معقّد، يقدّم هذا القسم مخططاً عاماً فقط. ولمزيد من التفاصيل، راجع الورقة الأصلية: «<a href="https://arxiv.org/abs/1208.4179">Serializable Snapshot Isolation in PostgreSQL</a>».</p>
<p>في ما يلي، تُستخدم عدة مصطلحات تقنية دون تعريف. يُرجى الرجوع إلى المراجع الخاصة بهذه المصطلحات:</p>
<ul>
<li>رسم الأسبقية (precedence graph) (يُعرف أيضاً بالرسم البياني للتبعية ورسم التسلسل)</li>
<li>شذوذات التسلسل (serialization anomalies) (مثل انحراف الكتابة (Write-Skew))</li>
</ul>
<p>** مراجع</p>
<ol>
<li>Abraham Silberschatz, Henry F. Korth, and S. Sudarshan, “<a href="https://www.amazon.com/dp/0073523321">Database System Concepts</a>”, McGraw-Hill Education, ISBN-13: 978-0073523323</li>
<li>Thomas M. Connolly, and Carolyn E. Begg, “<a href="https://www.amazon.com/dp/0321523067">Database Systems</a>”, Pearson, ISBN-13: 978-0321523068</li>
</ol>
<p>محتويات القسم</p>
<ul>
<li>5.9.1. الاستراتيجية الأساسية لتنفيذ SSI</li>
<li>5.9.2. تنفيذ SSI في PostgreSQL</li>
<li>5.9.3. كيف يعمل SSI</li>
<li>5.9.4. شذوذات التسلسل الإيجابية الكاذبة</li>
</ul>
<h2 id="591-الاستراتيجية-الأساسية-لتنفيذ-ssi">5.9.1. الاستراتيجية الأساسية لتنفيذ SSI</h2>
<p>يحدث شذوذ التسلسل إذا وُجدت حلقة في الرسم البياني للأسبقية. ويوضّح أبسط الشذوذات، وهو انحراف الكتابة (write-skew)، ذلك.</p>
<p>يوضّح الشكل 5.12(1) جدولاً زمنياً. هنا، تقرأ Transaction_A الصف Tuple_B وتقرأ Transaction_B الصف Tuple_A. ثم تكتب Transaction_A الصف Tuple_A وتكتب Transaction_B الصف Tuple_B. في هذه الحالة يوجد تعارضا قراءة-كتابة (rw-conflicts). وتشكّل هذه التعارضات حلقة في الرسم البياني للأسبقية لهذا الجدول الزمني، كما هو موضّح في الشكل 5.12(2). وبذلك يحتوي هذا الجدول الزمني على شذوذ تسلسل هو انحراف الكتابة (Write-Skew).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-12.webp" alt=""></p>
<h4>الشكل 5.12. الجدول الزمني لانحراف الكتابة ورسمه البياني للأسبقية.</h4>
<p>من الناحية المفاهيمية، توجد ثلاثة أنواع من التعارضات: تعارضات الكتابة-القراءة (wr-conflicts) (القراءات القذرة)، وتعارضات الكتابة-الكتابة (ww-conflicts) (التحديثات المفقودة)، وتعارضات القراءة-الكتابة (rw-conflicts). غير أن PostgreSQL يتجاهل تعارضات wr وww لأنه يمنعها كما هو موضّح في الأقسام السابقة. لذلك لا يأخذ تنفيذ SSI في PostgreSQL في الحسبان سوى تعارضات rw.</p>
<p>يعتمد PostgreSQL الاستراتيجية التالية لتنفيذ SSI:</p>
<ol>
<li>تسجيل جميع الكائنات (الصفوف والصفحات والعلاقات) التي تصل إليها المعاملات على هيئة أقفال SIREAD.</li>
<li>كشف تعارضات rw باستخدام أقفال SIREAD كلما كُتب صف كومة أو صف فهرس.</li>
<li>إجهاض المعاملة إذا اكتُشف شذوذ تسلسل عند فحص تعارضات rw المكتشفة.</li>
</ol>
<h2 id="592-تنفيذ-ssi-في-postgresql">5.9.2. تنفيذ SSI في PostgreSQL</h2>
<p>لتحقيق الاستراتيجية الموضّحة أعلاه، ينفّذ PostgreSQL دوال وبنى بيانات متنوعة. ويركّز هذا القسم على بنيتي بيانات رئيسيتين لوصف آلية SSI: <strong>أقفال SIREAD</strong> و<strong>تعارضات rw</strong>. وتُخزَّن هاتان البنيتان في الذاكرة المشتركة.</p>
<p>** ملاحظة</p>
<p>للتبسيط، يُغفل هذا التوثيق بعض بنى البيانات المهمة، مثل SERIALIZABLEXACT. وبناءً على ذلك، فإن شروح الدوال — وتحديداً CheckForSerializableConflictOut() وCheckForSerializableConflictIn() وPreCommit_CheckForSerializationFailure() — مبسّطة إلى حد كبير هي الأخرى.</p>
<p>فمثلاً، يبيّن هذا القسم الدوال التي تكتشف التعارضات لكنه لا يشرح تفاصيل الكشف. راجع الشيفرة المصدرية للحصول على معلومات مفصّلة: <a href="https://github.com/postgres/postgres/blob/master/src/backend/storage/lmgr/predicate.c">src/backend/storage/lmgr/predicate.c</a>.</p>
<h3 id="5921-أقفال-siread">5.9.2.1. أقفال SIREAD</h3>
<p>قفل SIREAD، ويُسمى داخلياً قفل محمول (predicate lock)، زوج يتكوّن من كائن ومعرّفات معاملات (افتراضية). ويخزّن معلومات عن المعاملات التي وصلت إلى الكائنات.</p>
<p>لاحظ أن هذا الوصف يُغفل معرّفات المعاملات الافتراضية. ويُستخدم مصطلح txid بدلاً من معرّف المعاملة الافتراضي لتبسيط الشرح التالي.</p>
<p>تُنشئ الدالة CheckForSerializableConflictOut() أقفال SIREAD كلما نُفّذ أمر DML في النمط SERIALIZABLE. فمثلاً، إذا قرأ المعرّف 100 الصف Tuple_1 في جدول، يُنشأ قفل SIREAD بالشكل {Tuple_1, {100}}. وإذا قرأ المعرّف 101 الصف Tuple_1 أيضاً، يُحدَّث قفل SIREAD إلى {Tuple_1, {100, 101}}.</p>
<p>يُنشأ قفل SIREAD أيضاً عند قراءة صفحة فهرس. ويحدث ذلك أثناء <a href="https://www.postgresql.org/docs/current/static/indexes-index-only-scans.html">المسح الفهرس فقط (Index-Only Scans)</a> (الموضّح في القسم 7.2)، حيث يُقرأ الفهرس دون الوصول إلى صفحة الجدول.</p>
<h4>مستويات الأقفال وتجميعها:</h4>
<p>لأقفال SIREAD ثلاثة مستويات: <strong>الصف</strong> و<strong>الصفحة</strong> و<strong>العلاقة</strong>.</p>
<p>يجمع PostgreSQL أقفال SIREAD لتقليل المساحة في الذاكرة. فإذا أُنشئت أقفال SIREAD لجميع الصفوف داخل صفحة واحدة، دُمجت في قفل SIREAD واحد على مستوى الصفحة، وحُرّرت الأقفال الفردية على مستوى الصف (راجع الشكل 5.13). وينطبق المنطق نفسه عندما تُقرأ جميع صفحات علاقة ما.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-13.webp" alt="Transaction Tx reads tuple_1 and tuple_2 in Page_1, creating two tuple-level SIREAD locks. When Tx subsequently reads tuple_3, completing the scan of Page_1, PostgreSQL replaces the individual tuple-level locks with a single page-level SIREAD lock."></p>
<h4>الشكل 5.13. مثال على تجميع أقفال SIREAD.</h4>
<p>تقرأ المعاملة Tx الصفين tuple_1 وtuple_2 في Page_1، فيُنشأ قفلان من أقفال SIREAD على مستوى الصف. وعندما تقرأ Tx بعد ذلك الصف tuple_3، مكملةً مسح Page_1، يستبدل PostgreSQL الأقفال الفردية على مستوى الصف بقفل SIREAD واحد على مستوى الصفحة.</p>
<p>عند استخدام مسح تسلسلي (sequential scan)، يُنشئ PostgreSQL قفل SIREAD على مستوى العلاقة منذ البداية، بصرف النظر عن الفهارس أو شروط WHERE. وفي بعض الحالات، قد يتسبّب هذا التنفيذ في كشف إيجابي كاذب لشذوذات التسلسل. وتُقدَّم التفاصيل في القسم 5.9.4.</p>
<h3 id="5922-تعارضات-rw">5.9.2.2. تعارضات rw</h3>
<p>تعارض rw ثلاثية تتكوّن من قفل SIREAD ومعرّفي معاملتين: إحداهما تقرأ والأخرى تكتب الكائن المرتبط بقفل SIREAD.</p>
<p>تُستدعى الدالة CheckForSerializableConflictIn() كلما نُفّذ أمر INSERT أو UPDATE أو DELETE في النمط SERIALIZABLE. وتنشئ هذه الدالة تعارضات rw عندما تكتشف تعارضاً بفحص أقفال SIREAD الموجودة.</p>
<p>فمثلاً، يقرأ المعرّف 100 الصف Tuple_1، ثم يحدّث المعرّف 101 الصف Tuple_1. في هذه الحالة، تكتشف CheckForSerializableConflictIn()، التي يستدعيها أمر UPDATE في المعرّف 101، تعارض rw على Tuple_1 بين المعرّفين 100 و101. فتنشئ تعارض rw بالشكل {r=100, w=101, {Tuple_1}}.</p>
<h3 id="5923-كشف-التعارضات-وأول-مودع-يفوز">5.9.2.3. كشف التعارضات وأول مُودِع يفوز</h3>
<p>تفحص كلٌّ من الدالتين CheckForSerializableConflictOut() وCheckForSerializableConflictIn()، وكذلك الدالة PreCommit_CheckForSerializationFailure() التي تُستدعى عند تنفيذ أمر COMMIT في النمط SERIALIZABLE، شذوذات التسلسل باستخدام تعارضات rw المُنشأة. وإذا اكتشفت شذوذات، فلا تُودِع سوى المعاملة الأولى التي أودعت، وتُجهَض المعاملات الأخرى وفق مخطط <strong>أول مُودِع يفوز (first-committer-win)</strong>.</p>
<h2 id="593-كيف-يعمل-ssi">5.9.3. كيف يعمل SSI</h2>
<p>يصف هذا القسم كيف يحلّ SSI شذوذات انحراف الكتابة باستخدام الجدول البسيط tbl الموضّح فيما يلي:</p>
<pre><code>testdb=# CREATE TABLE tbl (id INT primary key, flag bool DEFAULT false);
testdb=# INSERT INTO tbl (id) SELECT generate_series(1,2000);
testdb=# ANALYZE tbl;
</code></pre>
<p>تنفّذ المعاملتان Tx_A وTx_B الأوامر الموضّحة في الشكل 5.14.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-14.webp" alt=""></p>
<h4>الشكل 5.14. سيناريو انحراف الكتابة.</h4>
<p>افترض أن جميع الأوامر تستخدم مسحاً فهارسياً (index scan). وعند تنفيذها، تقرأ هذه الأوامر كلاً من صفوف الكومة وصفحات الفهرس. وتضمّ كل صفحة فهرس صف الفهرس الذي يشير إلى صف الكومة المقابل (الشكل 5.15).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-15.webp" alt=""></p>
<h4>الشكل 5.15. العلاقة بين الفهرس والجدول في السيناريو الموضّح في الشكل 5.14.</h4>
<ul>
<li><strong>T1:</strong> تنفّذ Tx_A أمر SELECT. ويقرأ هذا الأمر صف كومة (Tuple_2000) وصفحة واحدة من المفتاح الأساسي (Pkey_2).</li>
<li><strong>T2:</strong> تنفّذ Tx_B أمر SELECT. ويقرأ هذا الأمر صف كومة (Tuple_1) وصفحة واحدة من المفتاح الأساسي (Pkey_1).</li>
<li><strong>T3:</strong> تنفّذ Tx_A أمر UPDATE لتحديث Tuple_1.</li>
<li><strong>T4:</strong> تنفّذ Tx_B أمر UPDATE لتحديث Tuple_2000.</li>
<li><strong>T5:</strong> تُودِع Tx_A.</li>
<li><strong>T6:</strong> تحاول Tx_B الإيداع؛ غير أنها تجهض بسبب شذوذ انحراف الكتابة.</li>
</ul>
<p>يوضّح الشكل 5.16 كيف يكتشف PostgreSQL شذوذ انحراف الكتابة ويحلّه في هذا السيناريو.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-16.webp" alt=""></p>
<h4>الشكل 5.16. أقفال SIREAD وتعارضات rw، والجدول الزمني للسيناريو الموضّح في الشكل 5.14.</h4>
<ul>
<li><strong>T1:</strong> أثناء تنفيذ أمر SELECT الخاص بـ Tx_A، تُنشئ CheckForSerializableConflictOut() أقفال SIREAD. في هذا السيناريو، تُنشئ الدالة قفلَي SIREAD، هما L1 وL2، مرتبطين بـ Pkey_2 وTuple_2000 على الترتيب.</li>
<li><strong>T2:</strong> أثناء تنفيذ أمر SELECT الخاص بـ Tx_B، تُنشئ CheckForSerializableConflictOut() قفلَي SIREAD، هما L3 وL4، مرتبطين بـ Pkey_1 وTuple_1 على الترتيب.</li>
<li><strong>T3:</strong> عندما تنفّذ Tx_A أمر UPDATE الخاص بها، يستدعي النظام كلاً من CheckForSerializableConflictOut() وCheckForSerializableConflictIn() قبل ExecUpdate وبعده. في هذا السيناريو، لا تفعل CheckForSerializableConflictOut() شيئاً. وتنشئ CheckForSerializableConflictIn() تعارض rw، هو C1، يشمل كلاً من Pkey_1 وTuple_1 بين Tx_B وTx_A. ويحدث ذلك لأن كلاً من Pkey_1 وTuple_1 قرأتهما Tx_B ثم كتبتهما Tx_A لاحقاً.</li>
<li><strong>T4:</strong> عندما تنفّذ Tx_B أمر UPDATE الخاص بها، تُنشئ CheckForSerializableConflictIn() تعارض rw، هو C2، يشمل كلاً من Pkey_2 وTuple_2000 بين Tx_A وTx_B. في هذا السيناريو، يشكّل C1 وC2 حلقة في الرسم البياني للأسبقية، ما يضع Tx_A وTx_B في حالة غير قابلة للتسلسل. غير أنه لأن أيّاً من المعاملتين لم تُودِع بعد، فإن CheckForSerializableConflictIn() لا تجهض Tx_B. ويحدث هذا السلوك لأن تنفيذ SSI في PostgreSQL يقوم على مخطط <strong>أول مُودِع يفوز</strong>.</li>
<li><strong>T5:</strong> عندما تحاول Tx_A الإيداع، تُستدعى PreCommit_CheckForSerializationFailure(). وتكتشف هذه الدالة شذوذات التسلسل وتنفّذ عملية إيداع إن أمكن. في هذا السيناريو، تُودِع Tx_A لأن Tx_B ما زالت قيد التنفيذ.</li>
<li><strong>T6:</strong> عندما تحاول Tx_B الإيداع، تكتشف PreCommit_CheckForSerializationFailure() شذوذ تسلسل. ولأن Tx_A أودعت بالفعل، تجهض Tx_B.</li>
</ul>
<h3 id="5931-سيناريوهات-أخرى">5.9.3.1. سيناريوهات أخرى</h3>
<p>إذا نفّذت Tx_B أمر UPDATE بعد أن أودعت Tx_A (بعد <strong>T5</strong>)، تجهض Tx_B فوراً. ويحدث ذلك لأن CheckForSerializableConflictIn()، التي يستدعيها أمر UPDATE الخاص بـ Tx_B، تكتشف شذوذ تسلسل (الشكل 5.17(1)).</p>
<p>وإذا نفّذت Tx_B أمر SELECT بدلاً من COMMIT عند <strong>T6</strong>، تجهض Tx_B فوراً. ويحدث ذلك لأن CheckForSerializableConflictOut()، التي يستدعيها أمر SELECT الخاص بـ Tx_B، تكتشف شذوذ تسلسل (الشكل 5.17(2)).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-17.webp" alt=""></p>
<h4>الشكل 5.17. سيناريوهات أخرى لانحراف الكتابة.</h4>
<p>** معلومات</p>
<p>يفصّل <a href="https://wiki.postgresql.org/wiki/SSI">هذا الدليل (Wiki)</a> عدة شذوذات أكثر تعقيداً.</p>
<h2 id="594-شذوذات-التسلسل-الإيجابية-الكاذبة">5.9.4. شذوذات التسلسل الإيجابية الكاذبة</h2>
<p>في النمط SERIALIZABLE، يضمن PostgreSQL دائماً وبالكامل قابلية تسلسل المعاملات المتزامنة لأن شذوذات التسلسل السلبية الكاذبة لا تحدث أبداً.</p>
<p>غير أن PostgreSQL قد يكتشف شذوذات إيجابية كاذبة في بعض الظروف. وينبغي للمستخدمين أخذ هذا السلوك في الحسبان عند استخدام النمط SERIALIZABLE.</p>
<p>فيما يلي وصف للحالات التي يكتشف فيها PostgreSQL شذوذات إيجابية كاذبة.</p>
<h3 id="5941-السيناريو-الإيجابي-الكاذب-1">5.9.4.1. السيناريو الإيجابي الكاذب 1.</h3>
<p>يوضّح الشكل 5.18 سيناريو يحدث فيه شذوذ تسلسل إيجابي كاذب.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-18.webp" alt=""></p>
<h4>الشكل 5.18. سيناريو يحدث فيه شذوذ تسلسل إيجابي كاذب.</h4>
<p>كما ذُكر في شرح أقفال SIREAD، يُنشئ PostgreSQL قفل SIREAD على مستوى العلاقة عند استخدام مسح تسلسلي.</p>
<p>يوضّح الشكل 5.19(1) أقفال SIREAD وتعارضات rw أثناء مسح تسلسلي.</p>
<p>في هذه الحالة، يرتبط تعارضا rw، وهما C1 وC2، بقفل SIREAD على مستوى العلاقة الخاص بالجدول ’tbl’. وتُنشئ هذه التعارضات حلقة في الرسم البياني للأسبقية.</p>
<p>وبالتالي يكتشف PostgreSQL شذوذ انحراف كتابة إيجابي كاذب ويجهض إما Tx_A وإما Tx_B رغم عدم وجود تعارض فعلي.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-19.webp" alt=""></p>
<h4>الشكل 5.19. شذوذ إيجابي كاذب (1) - استخدام مسح تسلسلي.</h4>
<h3 id="5942-السيناريو-الإيجابي-الكاذب-2">5.9.4.2. السيناريو الإيجابي الكاذب 2.</h3>
<p>يكتشف PostgreSQL أيضاً شذوذاً إيجابياً كاذباً أثناء مسح فهرس إذا حصلت المعاملتان Tx_A وTx_B معاً على قفل SIREAD نفسه الخاص بصفحة الفهرس. ويوضّح الشكل 5.20 هذه الحالة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-20.webp" alt=""></p>
<h4>الشكل 5.20. شذوذ إيجابي كاذب (2) - مسح فهرس يستخدم صفحة الفهرس نفسها.</h4>
<p>افترض أن صفحة الفهرس Pkey_1 تضمّ عنصري فهرس: أحدهما يشير إلى Tuple_1 والآخر يشير إلى Tuple_2.</p>
<p>عندما تنفّذ Tx_A وTx_B أمرَي SELECT وUPDATE الخاصين بكل منهما، تقرأ المعاملتان معاً Pkey_1 وتكتبانه.</p>
<p>في هذه الحالة، يُنشئ تعارضا rw، وهما C1 وC2، وكلاهما مرتبط بـ Pkey_1، حلقة في الرسم البياني للأسبقية. وبذلك يكتشف PostgreSQL شذوذ انحراف كتابة إيجابي كاذب.</p>
<p>(إذا حصلت Tx_A وTx_B على قفلي SIREAD لصفحتي فهرس مختلفتين، فلا يُكتشف أي إيجابي كاذب ويمكن للمعملتين معاً أن تُودِعا.)</p>
<h1>5.10. عمليات الصيانة المطلوبة</h1>
<p>تتطلّب آلية التحكّم بالتزامن في PostgreSQL عمليات الصيانة التالية:</p>
<ol>
<li>إزالة الصفوف الميتة وصفوف الفهرس التي تشير إلى الصفوف الميتة المقابلة.</li>
<li>إزالة الأجزاء غير الضرورية من سجل الالتزام.</li>
<li>تجميد (freeze) معرّفات المعاملات القديمة.</li>
<li>تحديث FSM وVM والإحصاءات.</li>
</ol>
<p>شرح القسم 5.3.2 والقسم 5.4.3 الحاجة إلى العمليتين الأولى والثانية. وتعالج العملية الثالثة مشكلة التفاف معرّف المعاملة، التي يصفها القسم الفرعي التالي.</p>
<p>في PostgreSQL، تتولّى عملية VACUUM هذه المهام. ويصف <a href="/arabic-cs-library/book/postgres-internals/pgsql06/index">الفصل 6</a> أمر VACUUM بالتفصيل.</p>
<p>محتويات القسم</p>
<ul>
<li>5.10.1 مشكلة التفاف المعاملة</li>
<li>5.10.2 عملية التجميد</li>
</ul>
<h2 id="5101-مشكلة-التفاف-المعاملة">5.10.1. مشكلة التفاف المعاملة</h2>
<p>لنفترض أن معاملة بمعرّف 100 تُدرج Tuple_1؛ وبالتالي يكون t_xmin الخاص بـ Tuple_1 هو 100.</p>
<p>يعمل الخادم مدة طويلة جداً دون أي تعديلات على Tuple_1. وعندما يبلغ معرّف المعاملة الحالي 2.1 مليار + 100، يُنفَّذ أمر SELECT. في هذه اللحظة، يكون Tuple_1 <em>مرئياً</em> لأن المعرّف 100 يُعدّ في الماضي.</p>
<p>وإذا نُفّذ أمر SELECT نفسه عندما يبلغ معرّف المعاملة الحالي 2.1 مليار + 101، يصبح Tuple_1 <em>غير مرئي</em>. ويحدث ذلك لأن المعرّف 100 يُعدّ الآن في المستقبل بالنسبة إلى معرّف المعاملة الحالي (الشكل 5.21).</p>
<p>وهذه هي <strong>مشكلة التفاف المعاملة (transaction wraparound problem)</strong> في PostgreSQL.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-21.webp" alt=""></p>
<h4>الشكل 5.21. مشكلة الالتفاف.</h4>
<h2 id="5102-عملية-التجميد">5.10.2. عملية التجميد</h2>
<p>لحلّ هذه المشكلة، يستخدم PostgreSQL مفهوماً يُسمى <em>معرّف المعاملة المجمَّد</em> وينفّذ عملية تُسمى <strong>FREEZE</strong>.</p>
<p>يعرّف PostgreSQL معرّف المعاملة المجمَّد بأنه معرّف معاملة خاص محجوز (القيمة 2). وهذا المعرّف أقدم دائماً من جميع معرّفات المعاملات الأخرى؛ لذلك يكون معرّف المعاملة المجمَّد دائماً غير نشط و<em>مرئياً</em> لجميع المعاملات.</p>
<p>تستدعي عملية التفريغ عملية التجميد. وتمسح عملية التجميد ملفات الجداول وتُعيد كتابة t_xmin للصفوف إلى معرّف المعاملة المجمَّد (2) إذا كانت قيمة t_xmin أقدم من معرّف المعاملة الحالي ناقص <a href="https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE">vacuum_freeze_min_age</a> (القيمة الافتراضية 50 مليوناً). ويقدّم <a href="/arabic-cs-library/book/postgres-internals/pgsql06/index">الفصل 6</a> مزيداً من التفاصيل.</p>
<p>فمثلاً، في الشكل 5.22 أ)، يكون معرّف المعاملة الحالي 50,002,500 عندما يستدعي الأمر VACUUM عملية التجميد. في هذه الحالة، تُعيد العملية كتابة t_xmin لكل من Tuple_1 وTuple_2 إلى 2.</p>
<p>في الإصدار 9.4 (2014) وما بعده، يضبط PostgreSQL بتّة XMIN_FROZEN في الحقل t_infomask الخاص بالصف بدلاً من إعادة كتابة قيمة t_xmin (الشكل 5.22 ب).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql05-fig-5-22.webp" alt=""></p>
<h4>الشكل 5.22. عملية التجميد.</h4>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>ملاحظة: كان “pg_xact” يُسمّى “pg_clog” في الإصدار 9.6 وما قبله. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:p,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,l as html,t as slug,e as title};
