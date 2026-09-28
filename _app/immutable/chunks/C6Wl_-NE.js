const e="postgres-internals",n="pgsql06",t="معالجة التفريغ (Vacuum)",a="index",s="معالجة التفريغ (Vacuum)",p=[{depth:2,id:"611-الكتلة-الأولى",text:"6.1.1. الكتلة الأولى"},{depth:2,id:"612-الكتلة-الثانية",text:"6.1.2. الكتلة الثانية"},{depth:2,id:"613-الكتلة-الثالثة",text:"6.1.3. الكتلة الثالثة"},{depth:2,id:"614-المعالجة-اللاحقة",text:"6.1.4. المعالجة اللاحقة"},{depth:2,id:"621-تحسين-خريطة-vm",text:"6.2.1. تحسين خريطة VM"},{depth:2,id:"631-النمط-الكسول",text:"6.3.1. النمط الكسول"},{depth:2,id:"632-النمط-المتلهف",text:"6.3.2. النمط المتلهّف"},{depth:3,id:"6321-تحديث-pgdatabasedatfrozenxid",text:"6.3.2.1. تحديث pg_database.datfrozenxid"},{depth:2,id:"633-تحسين-عملية-التجميد-في-النمط-المتلهف",text:"6.3.3. تحسين عملية التجميد في النمط المتلهّف"},{depth:2,id:"651-شروط-تشغيل-التفريغ-التلقائي",text:"6.5.1. شروط تشغيل التفريغ التلقائي"},{depth:3,id:"6511-الشرط-1",text:"6.5.1.1. الشرط 1"},{depth:3,id:"6512-الشرط-2",text:"6.5.1.2. الشرط 2"},{depth:3,id:"6513-الشرط-3-الإصدار-13-وما-بعده",text:"6.5.1.3. الشرط 3 (الإصدار 13 وما بعده)"},{depth:3,id:"6514-الشرط-4",text:"6.5.1.4. الشرط 4"},{depth:2,id:"652-نصائح-للصيانة",text:"6.5.2. نصائح للصيانة"},{depth:2,id:"661-repack-vacuum-full",text:"6.6.1. REPACK (VACUUM FULL)"},{depth:2,id:"662-repack-concurrently",text:"6.6.2. REPACK CONCURRENTLY"},{depth:3,id:"6621-التقاط-التغييرات-المتزامنة-وتطبيقها",text:"6.6.2.1. التقاط التغييرات المتزامنة وتطبيقها"},{depth:3,id:"6622-المراحل-الثلاث-لـ-repack-concurrently",text:"6.6.2.2. المراحل الثلاث لـ REPACK CONCURRENTLY"}],l=`<h1>6.1. نظرة عامة على معالجة VACUUM</h1>
<p>تنفّذ معالجة التفريغ (vacuum) المهام التالية للجداول المحدّدة أو لجميع جداول قاعدة البيانات:</p>
<ol>
<li>إزالة الصفوف الميتة: إزالة الصفوف الميتة وتقليل تشظّي الصفوف الحية في كل صفحة.</li>
<li>إزالة صفوف الفهرس التي تشير إلى الصفوف الميتة.</li>
<li>تجميد معرّفات المعاملات القديمة: تجميد معرّفات المعاملات القديمة للصفوف عند الحاجة.</li>
<li>تحديث كتالوجات النظام المتعلقة بمعرّف المعاملة المجمَّد (pg_database وpg_class).</li>
<li>إزالة الأجزاء غير الضرورية من سجل الالتزام إن أمكن.</li>
<li>أعمال أخرى: تحديث FSM وVM للجداول المعالَجة.</li>
<li>تحديث عدة إحصاءات (pg_stat_all_tables، وغيرها).</li>
</ol>
<p>يفترض هذا التوثيق الإلمام بالمصطلحات التالية: الصفوف الميتة، وتجميد معرّف المعاملة، وFSM، وسجل الالتزام.</p>
<p>راجع <a href="/arabic-cs-library/book/postgres-internals/pgsql05/index">الفصل 5</a> للتفاصيل حول هذه المفاهيم. ويُقدَّم VM في القسم 6.2.</p>
<p>يصف شبه الكود (pseudocode) التالي معالجة التفريغ.</p>
<h4>شبه الكود: VACUUM</h4>
<pre><code>       // Phase 1: initializing

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
</code></pre>
<ul>
<li>(1) الحصول على كل جدول من الجداول المحدّدة.</li>
<li>(2) الحصول على قفل ShareUpdateExclusiveLock للجدول. ويتيح هذا القفل قراءات متزامنة من معاملات أخرى.</li>
<li>(3) مسح جميع الصفحات لجمع كل الصفوف الميتة وتجميد الصفوف القديمة عند الحاجة.</li>
<li>(4) إزالة صفوف الفهرس التي تشير إلى الصفوف الميتة المقابلة إن وُجدت.</li>
<li>(5) تنفيذ المهمتين (6) و(7) لكل صفحة في الجدول.</li>
<li>(6) إزالة الصفوف الميتة وإعادة توزيع الصفوف الحية في الصفحة.</li>
<li>(7) تحديث كلٍّ من FSM وVM للجدول الهدف.</li>
<li>(8) تنظيف الفهارس باستخدام الدالة <a href="https://github.com/postgres/postgres/blob/306dd6e727bf7a4e76f02cb31c2e22ac3b0deca3/src/backend/access/index/indexam.c#L816">index_vacuum_cleanup()</a>.</li>
<li>(9) بتر الصفحة الأخيرة إذا لم تكن تحتوي على صفوف.</li>
<li>(10) تحديث الإحصاءات وكتالوجات النظام المتعلقة بمعالجة التفريغ للجدول الهدف.</li>
<li>(11) تحديث الإحصاءات العامة وكتالوجات النظام المتعلقة بمعالجة التفريغ.</li>
<li>(12) إزالة الملفات والصفحات غير الضرورية من سجل الالتزام إن أمكن.</li>
</ul>
<p>يقسّم PostgreSQL عملية التفريغ إلى سبع مراحل متمايزة. وللتوضيح، يشرح هذا التوثيق العملية باستخدام 3+1 كتل مبسّطة.</p>
<p>يوضّح شبه الكود كيف تتوافق هذه المراحل السبع مع الكتل 3+1.</p>
<p>وتُوجز هذه الكتل فيما يلي.</p>
<p>** خيار PARALLEL</p>
<p>يدعم <a href="https://www.postgresql.org/docs/current/sql-vacuum.html">أمر VACUUM</a> خيار PARALLEL منذ الإصدار 13. وإذا حُدِّد هذا الخيار ووُجدت فهارس متعددة، تُعالَج مرحلتا تفريغ الفهارس وتنظيف الفهارس على التوازي.</p>
<p>تسري هذه الميزة على أمر VACUUM فقط ولا يدعمها التفريغ التلقائي (autovacuum).</p>
<p>** مراحل معالجة التفريغ</p>
<p>يحدّد عمود phase في عرض <a href="https://www.postgresql.org/docs/current/progress-reporting.html#VACUUM-PROGRESS-REPORTING">pg_stat_progress_vacuum</a> المرحلة الحالية لعملية تفريغ نشطة.</p>
<pre><code>testdb=# SELECT datname, relid, phase FROM pg_stat_progress_vacuum;
 datname | relid |     phase
---------+-------+---------------
 testdb  | 16415 | scanning heap
(1 row)
</code></pre>
<h2 id="611-الكتلة-الأولى">6.1.1. الكتلة الأولى</h2>
<p>تنفّذ هذه الكتلة عملية التجميد وتزيل صفوف الفهرس التي تشير إلى الصفوف الميتة.</p>
<p>يمسح PostgreSQL أولاً الجدول الهدف لبناء قائمة بالصفوف الميتة وتجميد الصفوف القديمة. وتُخزَّن القائمة في ذاكرة محلية تُسمى <a href="https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-MAINTENANCE-WORK-MEM">maintenance_work_mem</a>. ويصف القسم 6.3 عملية التجميد.</p>
<p>وبعد المسح، يزيل PostgreSQL صفوف الفهرس بالرجوع إلى قائمة الصفوف الميتة. ويوضّح الشكل 6.1 مثالاً على إزالة صف فهرس يشير إلى صف ميت.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-01.webp" alt=""></p>
<h4>الشكل 6.1. تفريغ الفهارس.</h4>
<p>إذا امتلأت maintenance_work_mem قبل اكتمال المسح، ينتقل PostgreSQL إلى المهام التالية (الخطوات 4 إلى 7). ثم يعود إلى الخطوة (3) لمواصلة ما تبقّى من المسح.</p>
<h2 id="612-الكتلة-الثانية">6.1.2. الكتلة الثانية</h2>
<p>تزيل هذه الكتلة الصفوف الميتة وتحدّث كلاً من FSM وVM صفحةً بصفحة. ويوضّح الشكل 6.2 مثالاً:</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-02.webp" alt=""></p>
<h4>الشكل 6.2. تفريغ الكومة.</h4>
<p>افترض أن الجدول يحتوي على ثلاث صفحات. وبالتركيز على الصفحة رقم 0، توجد ثلاثة صفوف، والصف Tuple_2 ميت (الشكل 6.2(1)). ويزيل PostgreSQL الصف Tuple_2 ويعيد ترتيب الصفوف المتبقية لمعالجة التشظّي. ثم يحدّث كلاً من FSM وVM لهذه الصفحة (الشكل 6.2(2)). ويواصل PostgreSQL هذه العملية حتى الصفحة الأخيرة.</p>
<p>لاحظ أن مؤشرات الأسطر غير الضرورية لا تُزال؛ بل يُعاد استخدامها مستقبلاً. وذلك لأنه إذا أُزيلت مؤشرات الأسطر، وجب تحديث جميع صفوف الفهرس في الفهارس المرتبطة.</p>
<h2 id="613-الكتلة-الثالثة">6.1.3. الكتلة الثالثة</h2>
<p>تنفّذ الكتلة الثالثة التنظيف بعد حذف الفهرس وتحدّث الإحصاءات وكتالوجات النظام لكل جدول هدف.</p>
<p>وإذا لم تحتوِ الصفحات الأخيرة على صفوف، يبترها PostgreSQL من ملف الجدول. ويوضّح الشكل 6.3 مثالاً مبالغاً فيه قليلاً حيث لا تحتوي الصفحات 1 و3 و4 على صفوف بعد تفريغ الكومة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-03.webp" alt=""></p>
<h4>الشكل 6.3. بتر الصفحات.</h4>
<p>أثناء بتر الكومة، تُزال الصفحتان 4 و3 من ملف الجدول، ما يقلّل حجمه بمقدار 16 كيلوبايت (8 كيلوبايت $\\times$ صفحتان).</p>
<p>ومع أن الصفحة 1 لا تحتوي هي الأخرى على صفوف، فإنها لا تُزال<a href="#fn:1">1</a>.</p>
<h2 id="614-المعالجة-اللاحقة">6.1.4. المعالجة اللاحقة</h2>
<p>عند اكتمال معالجة التفريغ، يحدّث PostgreSQL جميع الإحصاءات وكتالوجات النظام. كما يزيل الأجزاء غير الضرورية من سجل الالتزام إن أمكن (القسم 6.4).</p>
<p>** المخزن المؤقت الحلقي</p>
<p>تستخدم معالجة التفريغ <strong>مخزناً مؤقتاً حلقياً (ring buffer)</strong>، موضّحاً في القسم 8.4.3. لذلك لا تُخزَّن الصفحات المعالَجة في المخازن المؤقتة المشتركة.</p>
<ol>
<li>لإزالة مثل هذه الصفحات الداخلية، استخدم الأمر REPACK (VACUUM FULL) كما هو موضّح في القسم 6.6. <a href="#fnref:1">↩︎</a></li>
</ol>
<h1>6.2. خريطة الظهور (Visibility Map)</h1>
<p>معالجة التفريغ مكلفة. لذلك قدّم PostgreSQL خريطة الظهور (Visibility Map, VM) في الإصدار 8.4 لتقليل هذه الكلفة.</p>
<p>المفهوم الأساسي لخريطة VM بسيط:</p>
<ul>
<li>لكل جدول خريطة ظهور خاصة تخزّن ظهور كل صفحة.</li>
<li>يحدّد هذا الظهور ما إذا كانت الصفحة تحتوي على صفوف ميتة.</li>
<li>تتخطّى معالجة التفريغ الصفحات الخالية من الصفوف الميتة بالرجوع إلى VM.</li>
</ul>
<p>يوضّح الشكل 6.4 كيفية استخدام VM.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-04.webp" alt=""></p>
<h4>الشكل 6.4. كيفية استخدام VM.</h4>
<p>افترض أن جدولاً يتكوّن من ثلاث صفحات. فإذا كانت الصفحتان 0 و2 تحتويان على صفوف ميتة بينما لا تحتوي الصفحة 1 عليها، تسجّل VM هذه الحالة. ثم تتخطّى معالجة التفريغ الصفحة 1 بالرجوع إلى VM.</p>
<p>تتكوّن كل خريطة VM من صفحة واحدة أو أكثر بحجم 8 كيلوبايت، ويُخزَّن الملف بلاحقة ‘vm’. فمثلاً، يُعرض فيما يلي ملف جدول برقم relfilenode هو 18751 إلى جانب ملفي FSM (18751_fsm) وVM (18751_vm) الخاصين به.</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cd</span> <span class="hljs-variable">$PGDATA</span>
$ <span class="hljs-built_in">ls</span> -la base/16384/18751*
-rw------- 1 postgres postgres  8192 Apr 21 10:21 base/16384/18751
-rw------- 1 postgres postgres 24576 Apr 21 10:18 base/16384/18751_fsm
-rw------- 1 postgres postgres  8192 Apr 21 10:18 base/16384/18751_vm
</code></pre>
<h2 id="621-تحسين-خريطة-vm">6.2.1. تحسين خريطة VM</h2>
<p>حسّن PostgreSQL خريطة VM في الإصدار 9.6 لتحسين كفاءة عملية التجميد. وتتتبّع خريطة VM المحسّنة كلاً من ظهور الصفحة وما إذا كانت جميع الصفوف في الصفحة مجمَّدة (راجع القسم 6.3.3 للتفاصيل).</p>
<h1>6.3. عملية التجميد</h1>
<p>لعملية التجميد، الموضّحة في القسم 5.10.2، نمطان. وللتبسيط، يُشار إلى هذين النمطين بـ<strong>النمط الكسول (lazy mode)</strong> و<strong>النمط المتلهّف (eager mode)</strong>. وينفّذ PostgreSQL العملية بأحد النمطين حسب شروط معيّنة.</p>
<p>** ملاحظة</p>
<p>يُسمى VACUUM غالباً داخلياً «Lazy VACUUM». غير أن النمط الكسول المعرّف في هذا التوثيق هو نمط من أنماط عملية التجميد.</p>
<p>تعمل عملية التجميد عادةً بالنمط الكسول، أما النمط المتلهّف فيعمل عند تحقّق شروط محدّدة.</p>
<p>في النمط الكسول، تمسح عملية التجميد الصفحات التي تحتوي على صفوف ميتة فقط باستخدام خريطة الظهور (VM) للجدول الهدف.</p>
<p>وفي المقابل، يمسح النمط المتلهّف جميع الصفحات بصرف النظر عن احتوائها على صفوف ميتة. ويحدّث هذا النمط أيضاً كتالوجات النظام المتعلقة بعملية التجميد ويزيل الأجزاء غير الضرورية من سجل الالتزام إن أمكن.</p>
<p>يصف القسمان 6.3.1 و6.3.2 هذين النمطين على الترتيب. ويصف القسم 6.3.3 التحسينات التي أُدخلت على عملية التجميد في النمط المتلهّف.</p>
<p>محتويات القسم</p>
<ul>
<li>6.3.1. النمط الكسول</li>
<li>6.3.2. النمط المتلهّف</li>
<li>6.3.3. تحسين عملية التجميد في النمط المتلهّف</li>
</ul>
<h2 id="631-النمط-الكسول">6.3.1. النمط الكسول</h2>
<p>يحسب PostgreSQL قيمة <strong>freezeLimit_txid</strong> في بداية عملية التجميد ويجمّد الصفوف التي تكون قيمة t_xmin فيها أقل من هذه القيمة.</p>
<p>وتُعرَّف freezeLimit_txid كما يلي:</p>
<p>$$ \\begin{align*} \\text{freezeLimit_txid} = (\\text{OldestXmin} - \\text{vacuum_freeze_min_age}) \\end{align*} $$</p>
<p>حيث OldestXmin هو أقدم معرّف معاملة بين المعاملات الجارية حالياً.</p>
<p>فمثلاً، إذا كانت ثلاث معاملات (بالمعرّفات 100 و101 و102) تعمل عند تنفيذ أمر VACUUM، يكون OldestXmin هو 100. وإذا لم توجد معاملات أخرى، يكون OldestXmin هو معرّف المعاملة التي تنفّذ أمر VACUUM. و<a href="https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE">vacuum_freeze_min_age</a> معامل تهيئة (القيمة الافتراضية 50,000,000).</p>
<p>يوضّح الشكل 6.5 مثالاً محدّداً. يتكوّن Table_1 من ثلاث صفحات، تضمّ كل منها ثلاثة صفوف. وعند تنفيذ أمر VACUUM، يكون معرّف المعاملة الحالي 50,002,500 ولا توجد معاملات أخرى. في هذه الحالة، يكون OldestXmin هو 50,002,500؛ وبالتالي تكون freezeLimit_txid هي 2,500. وتسير عملية التجميد كما يلي:</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-05.webp" alt=""></p>
<h4>الشكل 6.5. تجميد الصفوف في النمط الكسول.</h4>
<ul>
<li><strong>الصفحة 0:</strong> يجمّد PostgreSQL الصفوف الثلاثة كلها لأن قيم t_xmin فيها أقل من freezeLimit_txid. بالإضافة إلى ذلك، تزيل عملية التفريغ هذه الصف Tuple_1 لأنه صف ميت.</li>
<li><strong>الصفحة 1:</strong> تتخطّى عملية التفريغ هذه الصفحة بالرجوع إلى خريطة الظهور (VM).</li>
<li><strong>الصفحة 2:</strong> يجمّد PostgreSQL الصفين Tuple_7 وTuple_8، ويزيل Tuple_7.</li>
</ul>
<p>وقبل اكتمال عملية التفريغ، يحدّث PostgreSQL الإحصاءات المتعلقة بالتفريغ، مثل n_live_tup وn_dead_tup وlast_vacuum وvacuum_count في <a href="https://www.postgresql.org/docs/current/static/monitoring-stats.html#PG-STAT-ALL-TABLES-VIEW%22">pg_stat_all_tables</a>.</p>
<p>وكما هو موضّح في المثال أعلاه، قد لا يجمّد النمط الكسول جميع الصفوف المؤهّلة لأنه قد يتخطّى صفحات.</p>
<h2 id="632-النمط-المتلهف">6.3.2. النمط المتلهّف</h2>
<p>يعوّض النمط المتلهّف قيود النمط الكسول. فهو يمسح جميع الصفحات لفحص كل صف في الجدول، ويحدّث كتالوجات النظام المعنية، ويزيل الملفات والصفحات غير الضرورية من سجل الالتزام حيثما أمكن.</p>
<p>يُنفَّذ النمط المتلهّف عند تحقّق الشرط التالي:</p>
<p>$$ \\begin{align*} \\text{pg_database.datfrozenxid} &lt; (\\text{OldestXmin} - \\text{vacuum_freeze_table_age}) \\end{align*} $$</p>
<p>حيث:</p>
<ul>
<li><strong>pg_database.datfrozenxid</strong> عمود في كتالوج النظام <a href="https://www.postgresql.org/docs/current/static/catalog-pg-database.html">pg_database</a> يحمل أقدم معرّف معاملة مجمَّد لكل قاعدة بيانات.</li>
<li><a href="https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-TABLE-AGE">vacuum_freeze_table_age</a> معامل تهيئة قيمته الافتراضية 150,000,000.</li>
</ul>
<p>يوضّح الشكل 6.6 مثالاً محدّداً:</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-06.webp" alt=""></p>
<h4>الشكل 6.6. تجميد الصفوف القديمة في النمط المتلهّف. (الإصدار 9.5 وما قبله)</h4>
<p>افترض أن قيمة pg_database.datfrozenxid هي 1821.</p>
<p>في Table_1، أُزيل كلٌّ من Tuple_1 وTuple_7، بينما أُدرج Tuple_10 وTuple_11 في الصفحة الثانية. وعند تنفيذ أمر VACUUM، يكون معرّف المعاملة الحالي 150,002,000 ولا توجد معاملات متزامنة أخرى. وبالتالي تُضبط OldestXmin على 150,002,000 وتصبح freezeLimit_txid هي 100,002,000.</p>
<p>في هذه الحالة يتحقّق الشرط لأن:</p>
<p>$$ \\begin{align*} 1821 &lt; (150002000 - 150000000) \\end{align*} $$</p>
<p>لذلك تُنفَّذ عملية التجميد بالنمط المتلهّف كما يلي.</p>
<ul>
<li><strong>الصفحة 0:</strong> يفحص PostgreSQL الصفين Tuple_2 وTuple_3 رغم أن جميع الصفوف مجمَّدة بالفعل.</li>
<li><strong>الصفحة 1:</strong> يجمّد PostgreSQL الصفوف الثلاثة في هذه الصفحة لأن جميع قيم t_xmin أقل من freezeLimit_txid. وكان النمط الكسول سيتخطّى هذه الصفحة.</li>
<li><strong>الصفحة 2:</strong> يجمّد PostgreSQL الصف Tuple_10، ولكن ليس Tuple_11.</li>
</ul>
<p>وبعد تجميد كل جدول، يحدّث PostgreSQL العمود <strong>pg_class.relfrozenxid</strong> في الجدول الهدف. و<a href="https://www.postgresql.org/docs/current/static/catalog-pg-class.html">pg_class</a> كتالوج نظام، ويحمل كل عمود pg_class.relfrozenxid أحدث معرّف معاملة مجمَّد للجدول المقابل.</p>
<p>في هذا المثال، يُحدَّث pg_class.relfrozenxid الخاص بـ Table_1 إلى قيمة freezeLimit_txid الحالية (100,002,000). ويدل ذلك على أن جميع الصفوف ذات t_xmin الأقل من 100,002,000 في Table_1 مجمَّدة.</p>
<h3 id="6321-تحديث-pgdatabasedatfrozenxid">6.3.2.1. تحديث pg_database.datfrozenxid</h3>
<p>قبل اكتمال عملية التفريغ، يحدّث PostgreSQL <strong>pg_database.datfrozenxid</strong> عند الحاجة، وهو يحمل أدنى قيمة pg_class.relfrozenxid في قاعدة البيانات المقابلة.</p>
<p>فمثلاً، إذا جُمِّد Table_1 فقط في النمط المتلهّف، فإن pg_database.datfrozenxid لقاعدة البيانات يبقى دون تغيير. وذلك لأن pg_class.relfrozenxid للعلاقات الأخرى (الجداول الأخرى وكتالوجات النظام المرئية من قاعدة البيانات الحالية) لم يتغيّر (الشكل 6.7(1)).</p>
<p>وإذا جُمِّدت جميع العلاقات في قاعدة البيانات الحالية في النمط المتلهّف، يُحدَّث pg_database.datfrozenxid لأن pg_class.relfrozenxid لجميع العلاقات في قاعدة البيانات تُحدَّث إلى قيمة freezeLimit_txid الحالية (الشكل 6.7(2)).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-07.webp" alt=""></p>
<h4>الشكل 6.7. العلاقة بين pg_database.datfrozenxid وقيم pg_class.relfrozenxid.</h4>
<p>** كيفية عرض pg_class.relfrozenxid وpg_database.datfrozenxid.</p>
<p>يعرض الاستعلام الأول أدناه قيم relfrozenxid لجميع العلاقات المرئية في قاعدة البيانات ’testdb’.</p>
<p>ويعرض الاستعلام الثاني قيمة pg_database.datfrozenxid لقاعدة البيانات ’testdb’.</p>
<pre><code>testdb=# VACUUM table_1;
VACUUM
testdb=# SELECT n.nspname as &amp;#34;Schema&amp;#34;, c.relname as &amp;#34;Name&amp;#34;, c.relfrozenxid
             FROM pg_catalog.pg_class c
             LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
             WHERE c.relkind IN ('r','')
                   AND n.nspname &lt;&gt; 'information_schema' AND n.nspname !~ '^pg_toast'
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
</code></pre>
<p>** خيار FREEZE</p>
<p>يجبر أمر VACUUM المزوَّد بخيار FREEZE PostgreSQL على تجميد جميع معرّفات المعاملات في الجداول المحدّدة. ويحدث ذلك في النمط المتلهّف، لكن تُضبط قيمة freezeLimit على OldestXmin (وليس ‘OldestXmin - vacuum_freeze_min_age’).</p>
<p>فمثلاً، إذا نفّذ المعرّف 5000 الأمر VACUUM FULL ولم تكن هناك معاملات أخرى تعمل، تُضبط OldestXmin على 5000 وتُجمَّد معرّفات المعاملات الأقل من 5000.</p>
<h2 id="633-تحسين-عملية-التجميد-في-النمط-المتلهف">6.3.3. تحسين عملية التجميد في النمط المتلهّف</h2>
<p>النمط المتلهّف في الإصدار 9.5 وما قبله غير كفء لأنه يمسح جميع الصفحات دائماً. فمثلاً، في المثال الوارد في القسم 6.3.2، تمسح العملية الصفحة 0 حتى لو كانت جميع الصفوف فيها مجمَّدة بالفعل.</p>
<p>لمعالجة هذه المشكلة، حسّن الإصدار 9.6 (عام 2016) كلاً من VM وعملية التجميد. وكما ذُكر في القسم 6.2.1، تسجّل خريطة VM الجديدة ما إذا كانت جميع الصفوف في كل صفحة مجمَّدة. وعندما تعمل عملية التجميد بالنمط المتلهّف، تتخطّى العملية الصفحات التي لا تحتوي إلا على صفوف مجمَّدة.</p>
<p>يوضّح الشكل 6.8 مثالاً. أثناء تجميد هذا الجدول، تتخطّى العملية الصفحة 0 بالرجوع إلى VM. وبعد تجميد الصفحة 1، تُحدَّث معلومات VM المرتبطة بها لأن جميع الصفوف في تلك الصفحة أصبحت مجمَّدة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-08.webp" alt=""></p>
<h4>الشكل 6.8. تجميد الصفوف القديمة في النمط المتلهّف (الإصدار 9.6 وما بعده).</h4>
<h1>6.4. إزالة ملفات سجل الالتزام غير الضرورية</h1>
<p>يخزّن سجل الالتزام، الموضّح في القسم 5.4، حالات المعاملات. ويحاول PostgreSQL إزالة ملفات سجل الالتزام غير الضرورية كلما حدّث pg_database.datfrozenxid. لاحظ أن هذه العملية تزيل أيضاً صفحات سجل الالتزام المقابلة.</p>
<p>يوضّح الشكل 6.9 مثالاً على هذه العملية. فإذا وُجد أدنى pg_database.datfrozenxid في ملف سجل الالتزام ‘0002’، يمكن للنظام إزالة الملفين الأقدم (‘0000’ و‘0001’). وهذا ممكن لأن جميع المعاملات في هذين الملفين تُعامَل كمعرّفات معاملات مجمَّدة في عنقود قواعد البيانات بأكمله.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-09.webp" alt=""></p>
<h4>الشكل 6.9. إزالة ملفات وصفحات سجل الالتزام غير الضرورية.</h4>
<p>** pg_database.datfrozenxid وملف سجل الالتزام</p>
<p>فيما يلي المخرجات الفعلية لقيمة pg_database.datfrozenxid وملفات سجل الالتزام:</p>
<pre><code class="language-bash">$ psql testdb -c &amp;#34;SELECT datname, datfrozenxid FROM pg_database&amp;#34;
  datname  | datfrozenxid
-----------+--------------
 template1 |      7308883
 template0 |      7556347
 postgres  |      7339732
 testdb    |      7506298
(4 rows)
</code></pre>
<pre><code class="language-bash">$ <span class="hljs-built_in">ls</span> -la -h data/pg_xact/	<span class="hljs-comment"># In versions 9.6 or earlier, &amp;#34;ls -la -h data/pg_clog/&amp;#34;</span>
total 316K
drwx------  2 postgres postgres   28 Dec 29 17:15 .
drwx------ 20 postgres postgres 4.0K Dec 29 17:13 ..
-rw-------  1 postgres postgres 256K Dec 29 17:15 0006
-rw-------  1 postgres postgres  56K Dec 29 17:15 0007
</code></pre>
<h1>6.5. خفير التفريغ التلقائي (Autovacuum Daemon)</h1>
<p>يؤتمت PostgreSQL معالجة التفريغ باستخدام خفير التفريغ التلقائي (autovacuum daemon). وتُبسّط هذه الأتمتة صيانة قاعدة البيانات إلى حد كبير.</p>
<p>يستدعي خفير التفريغ التلقائي دورياً عدة عمليات autovacuum_worker. وبشكل افتراضي، يستيقظ الخفير كل دقيقة واحدة (وفق <a href="https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-NAPTIME">autovacuum_naptime</a>) ويشغّل ثلاثة عمال (وفق <a href="https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-MAX-WORKERS">autovacuum_max_works</a>).</p>
<p>تنفّذ هذه العمال معالجة التفريغ بالتزامن لجداولها المعنية. ويحدث هذا النشاط تدريجياً لضمان أقل تأثير ممكن على أداء قاعدة البيانات.</p>
<p>محتويات القسم</p>
<ul>
<li>6.5.1. شروط تشغيل التفريغ التلقائي</li>
<li>6.5.2. نصائح للصيانة</li>
</ul>
<h2 id="651-شروط-تشغيل-التفريغ-التلقائي">6.5.1. شروط تشغيل التفريغ التلقائي</h2>
<p>يعمل التفريغ التلقائي على جدول هدف إذا تحقّق أيٌّ من الشروط التالية:</p>
<h3 id="6511-الشرط-1">6.5.1.1. الشرط 1</h3>
<p>يتجاوز معرّف المعاملة الحالي الحدّ التالي:</p>
<p>$$ \\begin{align*} \\text{relfrozenxid} + \\text{autovacuum_freeze_max_age} \\end{align*} $$</p>
<p>حيث:</p>
<ul>
<li><strong>relfrozenxid</strong> القيمة المعرّفة للجدول الهدف في <a href="https://www.postgresql.org/docs/current/catalog-pg-class.html">pg_class</a>.</li>
<li><a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-FREEZE-MAX-AGE">autovacuum_freeze_max_age</a> معامل تهيئة (القيمة الافتراضية: 200,000,000).</li>
</ul>
<p>وعند تحقّق هذا الشرط، ينفّذ التفريغ التلقائي عملية التجميد للجدول الهدف.</p>
<h3 id="6512-الشرط-2">6.5.1.2. الشرط 2</h3>
<p>يتجاوز عدد الصفوف الميتة الحدّ التالي:</p>
<p>$$ \\begin{align*} \\text{autovacuum_vacuum_threshold} + \\text{autovacuum_vacuum_scale_factor} \\times \\text{reltuples} \\end{align*} $$</p>
<p>حيث:</p>
<ul>
<li><a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-THRESHOLD">autovacuum_vacuum_threshold</a> (القيمة الافتراضية: 50) و<a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR">autovacuum_vacuum_scale_factor</a> (القيمة الافتراضية: 0.2) معاملا تهيئة.</li>
<li><strong>reltuples</strong> العدد الإجمالي للصفوف في الجدول الهدف.</li>
</ul>
<p>فمثلاً، إذا كان في جدول 10,000 صف و2,100 صف ميت، يعمل التفريغ التلقائي لأن:</p>
<p>$$ \\begin{align*} 2100 &gt; 50 + 0.2 \\times 10000. \\end{align*} $$</p>
<h3 id="6513-الشرط-3-الإصدار-13-وما-بعده">6.5.1.3. الشرط 3 (الإصدار 13 وما بعده)</h3>
<p>يتجاوز عدد الصفوف المُدرجة في الجدول الهدف الحدّ التالي:</p>
<p>$$ \\text{autovacuum_vacuum_insert_threshold} + \\text{autovacuum_vacuum_insert_scale_factor} \\times \\text{reltuples} $$</p>
<p>حيث:</p>
<ul>
<li><a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD">autovacuum_vacuum_insert_threshold</a> (القيمة الافتراضية: 1000) و<a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD">autovacuum_vacuum_insert_threshold</a> (القيمة الافتراضية: 0.2) معاملا تهيئة.</li>
<li><strong>reltuples</strong> عدد الصفوف في الجدول الهدف.</li>
</ul>
<p>فمثلاً، إذا كان في جدول 10,000 صف و3,010 صفوف مُدرجة، يعمل التفريغ التلقائي لأن:</p>
<p>$$ \\begin{align*} 3010 &gt; 1000 + 0.2 \\times 10000. \\end{align*} $$</p>
<p>أُضيف هذا الشرط في الإصدار 13.</p>
<h3 id="6514-الشرط-4">6.5.1.4. الشرط 4</h3>
<p>ينفّذ التفريغ التلقائي أيضاً عملية التحليل (analyze) إذا تحقّق الشرط التالي:</p>
<p>$$ \\begin{align*} \\text{mod_since_analyze} &gt; \\text{autovacuum_analyze_threshold} + \\text{autovacuum_analyze_scale_factor} \\times \\text{reltuples} \\end{align*} $$</p>
<p>حيث:</p>
<ul>
<li><strong>mod_since_analyze</strong> عدد الصفوف المعدَّلة (عبر INSERT أو DELETE أو UPDATE) منذ عملية التحليل السابقة.</li>
<li><a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-THRESHOLD">autovacuum_analyze_threshold</a> (القيمة الافتراضية: 50) و<a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-SCALE-FACTOR">autovacuum_analyze_scale_factor</a> (القيمة الافتراضية: 0.1) معاملا تهيئة.</li>
<li><strong>reltuples</strong> عدد الصفوف في الجدول الهدف.</li>
</ul>
<p>فمثلاً، إذا كان في جدول 10,000 صف و1,100 صف معدَّل منذ آخر تحليل، يعمل التفريغ التلقائي لأن:</p>
<p>$$ \\begin{align*} 1100 &gt; 50 + 0.1 \\times 10000. \\end{align*} $$ ** معلومات</p>
<p>تحدّد الدالة <a href="https://github.com/postgres/postgres/blob/master/src/backend/postmaster/autovacuum.c">relation_needs_vacanalyze()</a> ما إذا كانت الجداول الهدف تحتاج إلى عمليات تفريغ أو تحليل.</p>
<h2 id="652-نصائح-للصيانة">6.5.2. نصائح للصيانة</h2>
<p>كما ذُكر مراراً، يُعدّ انتفاخ الجداول (table bloat) تحدياً كبيراً في إدارة PostgreSQL. وتسبّب هذه المشكلة عدة عوامل، والتفريغ التلقائي أحدها.</p>
<p>يعمل التفريغ التلقائي عندما يتجاوز عدد الصفوف الميتة حدوداً محدّدة: 250 لجدول من 1,000 سطر، و20,050 لـ100,000 سطر، و20,000,050 لـ100,000,000 سطر. وتُظهر هذه الأمثلة أن التفريغ التلقائي يعمل بوتيرة أقل مع ازدياد عدد الصفوف في الجدول.</p>
<p>من النصائح الشائعة تقليل قيمة <a href="https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR">autovacuum_vacuum_scale_factor</a>. فالقيمة الافتراضية (0.2) كبيرة غالباً للجداول الضخمة.</p>
<p>يمكن لـPostgreSQL ضبط قيمة <em>autovacuum_vacuum_scale_factor</em> المناسبة لكل جدول باستخدام <a href="https://www.postgresql.org/docs/current/sql-altertable.html">ALTER TABLE</a>. ويضبط المثال التالي القيمة الجديدة لجدول pgbench_accounts:</p>
<pre><code class="language-sql">postgres<span class="hljs-operator">=</span># <span class="hljs-keyword">ALTER TABLE</span> pgbench_accounts <span class="hljs-keyword">SET</span> (autovacuum_vacuum_scale_factor <span class="hljs-operator">=</span> <span class="hljs-number">0.05</span>);
<span class="hljs-keyword">ALTER TABLE</span>
</code></pre>
<p>يمكن لإعدادات محدّدة أن تضمن عمل التفريغ التلقائي بصرف النظر عن العدد الإجمالي للصفوف.</p>
<p>فمثلاً، إذا لزم التفريغ كلما بلغت الصفوف الميتة 50,000، يمكن ضبط معاملات التخزين التالية. وبهذه الإعدادات، يُشغّل التفريغ التلقائي التفريغ في كل مرة يُبلَغ فيها حدّ 10,000 صف ميت:</p>
<pre><code class="language-sql">postgres<span class="hljs-operator">=</span># <span class="hljs-keyword">ALTER TABLE</span> pgbench_accounts <span class="hljs-keyword">SET</span> (autovacuum_vacuum_threshold <span class="hljs-operator">=</span> <span class="hljs-number">50000</span>);
<span class="hljs-keyword">ALTER TABLE</span>
postgres<span class="hljs-operator">=</span># <span class="hljs-keyword">ALTER TABLE</span> pgbench_accounts <span class="hljs-keyword">SET</span> (autovacuum_vacuum_scale_factor <span class="hljs-operator">=</span> <span class="hljs-number">0.0</span>);
<span class="hljs-keyword">ALTER TABLE</span>
</code></pre>
<h1>6.6. استعادة المساحة المنتفخة</h1>
<p>يزيل أمر VACUUM الصفوف الميتة ويمنع التفاف معرّف المعاملة. غير أنه لا يستطيع استعادة مساحة القرص الناتجة عن <strong>انتفاخ الجدول (table bloat)</strong>.</p>
<p>انتفاخ الجدول حالة لا يقلّ فيها الحجم الفيزيائي للجدول حتى بعد إزالة الصفوف الميتة. ويوضّح الشكل 6.10 مثالاً متطرفاً.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-10.webp" alt=""></p>
<h4>الشكل 6.10. يبقى انتفاخ الجدول بعد VACUUM.</h4>
<p>افترض أن جدولاً يتكوّن من ثلاث صفحات، وتضمّ كل صفحة ستة صفوف. وتحذف الأوامر التالية معظم الصفوف ثم تزيل الصفوف الميتة الناتجة:</p>
<pre><code>testdb=# DELETE FROM tbl WHERE id % 6 != 0;
testdb=# VACUUM tbl;
</code></pre>
<p>يزيل أمر VACUUM الصفوف الميتة، لكن حجم الجدول يبقى دون تغيير. ونتيجة لذلك، يظل ملف العلاقة شاغلاً ثلاث صفحات، رغم أنه لم يتبقَّ سوى ثلاثة صفوف حية.</p>
<p>وبشكل عام، تحدث هذه المشكلة عند توليد كمية كبيرة من الصفوف الميتة.</p>
<p>حتى الإصدار 18، كان الحل المدمج الوحيد هو إعادة بناء ملفات العلاقات والفهارس باستخدام CLUSTER أو VACUUM FULL. ويحصل كلا الأمرين على أقفال ACCESS EXCLUSIVE على الجدول بأكمله أثناء التنفيذ، ما يحجب جميع العمليات طوال إعادة البناء. ويُعطّل ذلك العمليات إذا استغرقت إعادة البناء وقتاً طويلاً.</p>
<p>قدّم PostgreSQL 19 (عام 2026) الأمر REPACK (وليس امتداد pg_repack). ويستخدم كلٌّ من VACUUM FULL وCLUSTER الآن التنفيذ الأساسي نفسه. علاوةً على ذلك، أُضيف نمط CONCURRENTLY للحصول على قفل ACCESS EXCLUSIVE أثناء تبديل الملفات فقط، ما يتيح إعادة بناء الجدول بتوافر أعلى أثناء العمل من ذي قبل.</p>
<table>
<thead>
<tr>
<th>إصدار PostgreSQL</th>
<th>قفل ACCESS EXCLUSIVE</th>
<th>متاح أثناء العمل غالباً</th>
</tr>
</thead>
<tbody>
<tr>
<td>18 أو أقدم</td>
<td>VACUUM FULL CLUSTER</td>
<td>لا ينطبق</td>
</tr>
<tr>
<td>19 أو أحدث</td>
<td>REPACK REPACK USING INDEX (مكافئ CLUSTER)</td>
<td>REPACK CONCURRENTLY REPACK CONCURRENTLY USING INDEX</td>
</tr>
</tbody>
</table>
<p>تصف الأقسام التالية الأمر REPACK (بديل VACUUM FULL) والأمر REPACK CONCURRENTLY.</p>
<p>محتويات القسم</p>
<ul>
<li>6.6.1. REPACK (VACUUM FULL)</li>
<li>6.6.2. REPACK CONCURRENTLY</li>
</ul>
<p>** ملاحظة</p>
<p>يستخدم REPACK CONCURRENTLY آلية <strong>فك ترميز WAL (WAL decoding)</strong> المستخدمة في النسخ المنطقي (logical replication).</p>
<p>لذلك يُنصح القرّاء غير الملمّين بـ<strong>WAL</strong> أو <strong>النسخ المنطقي</strong> بقراءة <a href="/arabic-cs-library/book/postgres-internals/pgsql09/index">الفصل 9</a> و<a href="/arabic-cs-library/book/postgres-internals/pgsql12/index">الفصل 12</a> قبل العودة إلى هذا القسم.</p>
<h2 id="661-repack-vacuum-full">6.6.1. REPACK (VACUUM FULL)</h2>
<p>يستخدم الأمر REPACK (VACUUM FULL) استراتيجية بسيطة تُعيد إنشاء ملف جدول فيزيائي جديد تحت قفل حصري. ويوضّح الشكل 6.11 مخطط هذا الأمر.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-11.webp" alt="To simplify, index files are omitted."></p>
<h4>الشكل 6.11. مخطط معالجة REPACK (VACUUM FULL).</h4>
<p>للتبسيط، تُحذف ملفات الفهرس.</p>
<ul>
<li>(1) <strong>إنشاء ملف جدول جديد:</strong> عند تنفيذ أمر REPACK، يُنشئ PostgreSQL ملف جدول جديداً بحجم 8 كيلوبايت ويحصل على قفل AccessExclusiveLock على الجدولين الجديد والقديم معاً. وتمنع الأقفال العمليات الأخرى من الوصول إلى الجدولين.</li>
<li>(2) <strong>نسخ الصفوف الحية إلى الجدول الجديد:</strong> ينسخ PostgreSQL الصفوف الحية فقط من ملف الجدول القديم إلى الجدول الجديد.</li>
<li>(3) <strong>إزالة الملف القديم وإعادة بناء البنى المرتبطة:</strong> بعد نسخ جميع الصفوف الحية، يزيل PostgreSQL الملف القديم. ثم يعيد بناء جميع الفهارس المرتبطة ويحدّث FSM وVM والإحصاءات وكتالوجات النظام.</li>
</ul>
<p>فيما يلي شبه الكود الخاص بـ REPACK (VACUUM FULL):</p>
<h4>شبه الكود: REPACK (VACUUM FULL)</h4>
<pre><code>(1)  FOR each table
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
</code></pre>
<p>يجب مراعاة نقطتين عند استخدام الأمر REPACK (VACUUM FULL):</p>
<ol>
<li>لا يمكن لأي عملية الوصول (قراءة أو كتابة) إلى الجدول أثناء العملية.</li>
<li>تستهلك العملية مؤقتاً ما يصل إلى ضعف مساحة القرص التي يشغلها الجدول. لذلك تحقّق من سعة القرص المتبقية قبل معالجة جدول كبير.</li>
</ol>
<h2 id="662-repack-concurrently">6.6.2. REPACK CONCURRENTLY</h2>
<p>يتيح خيار <strong>CONCURRENTLY</strong>، الذي أُدخل في الإصدار 19، إجراء عمليات بحث وتحديث متزامنة على الجدول الهدف أثناء استعادة المساحة، باستثناء قفل AccessExclusiveLock قصير أثناء المرحلة النهائية.</p>
<p>تطابق استراتيجية التنفيذ الأساسية الأمر REPACK العادي بإنشاء جدول جديد ونسخ الصفوف الحية من الجدول القديم. غير أن خيار CONCURRENTLY يُدخل العمليات الداخلية التالية:</p>
<ul>
<li>في بداية عملية REPACK، تُلتقط لقطة MVCC.</li>
<li>تنسخ العملية الخلفية الصفوف الحية المرئية لهذه اللقطة فقط إلى الجدول الجديد.</li>
<li>تُطبَّق التغييرات التي تحدث أثناء عملية النسخ لاحقاً على الجدول الجديد.</li>
</ul>
<p>لالتقاط التغييرات أثناء النسخ، يستخدم أمر REPACK آلية فك ترميز WAL المستخدمة في النسخ المنطقي. وهو يعمل كما يلي:</p>
<ul>
<li>تبدأ العملية الخلفية التي تنفّذ REPACK عاملاً خلفياً (background worker) يُسمى repack_decoding_worker. ويفكّ العامل ترميز سجلات WAL التي تولّدها المعاملات المتزامنة، ويستخرج التغييرات التي أُجريت على الجدول الهدف، ويكتبها في <strong>BufFile</strong> مؤقت (منفَّذ في <a href="https://github.com/postgres/postgres/blob/master/src/backend/storage/file/buffile.c">buffile.c</a>).</li>
</ul>
<p>وتقرأ العملية الخلفية الخاصة بـ REPACK عناصر التغيير من ملف BufFile وتطبّقها على الجدول الجديد.</p>
<p>تعمل هذه الآلية ما دام معامل التهيئة <em>wal_level</em> مضبوطاً على “replica” أو أعلى. ويجب أن يكون لجدول الهدف <em>REPLICA IDENTITY</em> مهيّأة (“DEFAULT” أو “USING INDEX”).</p>
<p>لاحظ أن خيار CONCURRENTLY لا يمكن استخدامه للجداول التالية:</p>
<ul>
<li>الجداول المُقسَّمة</li>
<li>الجداول UNLOGGED</li>
<li>جداول TOAST</li>
<li>الجداول التي لا تحتوي على REPLICA IDENTITY (“DEFAULT” أو “USING INDEX”)</li>
<li>كتالوجات النظام</li>
</ul>
<h3 id="6621-التقاط-التغييرات-المتزامنة-وتطبيقها">6.6.2.1. التقاط التغييرات المتزامنة وتطبيقها</h3>
<p>يبدأ repack_decoding_worker في كل مرة يُنفَّذ فيها الأمر REPACK CONCURRENTLY وينتهي بمجرد انتهاء العملية.</p>
<p>يفكّ هذا العامل ترميز سجلات WAL بدءاً من قيمة LSN عند التقاط اللقطة. ويستخرج التغييرات التي أُجريت على الجدول الهدف فقط ويمرّرها إلى العملية الخلفية الخاصة بـ REPACK عبر ملف BufFile.</p>
<p>لتبسيط الشرح، تُحذف هنا عمليات القفل، مع التركيز بدلاً من ذلك على مسار فك ترميز WAL وتطبيق التغييرات.</p>
<p>افترض أن الجدول الهدف <em>tbl</em> معرّف كما يلي:</p>
<pre><code>testdb=# \\d tbl
                 Table &amp;#34;public.tbl&amp;#34;
 Column |  Type   | Collation | Nullable | Default
--------+---------+-----------+----------+---------
 id     | integer |           | not null |
 data   | text    |           |          |
Indexes:
    &amp;#34;tbl_pkey&amp;#34; PRIMARY KEY, btree (id)
</code></pre>
<p>في هذا المثال، تكون REPLICA IDENTITY هي المفتاح الأساسي: “tbl_pkey”.</p>
<p>يوضّح الشكل 6.12 عملية REPACK CONCURRENTLY تصورية من مرحلتين (أما التنفيذ الفعلي فيتكوّن من ثلاث مراحل، كما هو موضّح في القسم التالي).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-12.webp" alt="To simplify, the old index file is omitted."></p>
<h4>الشكل 6.12. نظرة عامة على REPACK CONCURRENTLY.</h4>
<p>للتبسيط، يُحذف ملف الفهرس القديم.</p>
<p><strong>المرحلة 1: نسخ الصفوف</strong></p>
<ul>
<li>(1) تُنشئ العملية backend_1 (التي تنفّذ أمر REPACK) عملية repack_decoding_worker.</li>
<li>(2) يبدأ repack_decoding_worker معاملةً ويشارك لقطته الدقيقة مع backend_1 لضمان الاتساق.</li>
<li>(3) تُنشئ backend_1 ملف جدول جديداً.</li>
<li>(4) تُدرج backend_2 الصف Tuple_B في الجدول القديم. وتضيف هذه العملية الصف Tuple_B إلى الجدول القديم وتولّد سجل WAL المقابل.</li>
<li>(5) تنسخ backend_1 الصفوف الحية (مثل Tuple_A) من الجدول القديم إلى الجدول الجديد باستخدام اللقطة المُحصَّلة. وفي هذه اللحظة، يكون Tuple_B غير مرئي للقطة، لذلك لا يُنسخ.</li>
</ul>
<p><strong>المرحلة 2: تطبيق التغييرات</strong></p>
<ul>
<li>(6) بعد إكمال النسخ، تبني backend_1 جميع الفهارس المرتبطة بالجدول الجديد. في هذا المثال، لا ينعكس في الفهرس الجديد في البداية سوى Tuple_A.</li>
<li>(7) تنفّذ backend_1 الدالة XLogFlush() لضمان حفظ WAL المولَّد في المرحلة 1 بشكل دائم.</li>
<li>(8) يفكّ repack_decoding_worker ترميز سجلات WAL المولَّدة أثناء المرحلة 1 ويُخرج التغييرات (في هذا المثال “INSERT Tuple_B”) إلى ملف BufFile.</li>
<li>(9) تقرأ backend_1 ملف BufFile وتطبّق التغييرات على الجدول الجديد. هنا، يُدرَج Tuple_B في الجدول الجديد عبر مسار INSERT العادي. ونتيجة لذلك، تُحدَّث جميع الفهارس على الجدول الجديد تلقائياً بواسطة آلية صيانة الفهارس المعتادة في PostgreSQL.</li>
</ul>
<p>وبتطبيق التغييرات لاحقاً، يمكن إعادة بناء الجدول مع السماح للمستخدمين بإجراء عمليات بحث وتحديث متزامنة.</p>
<h3 id="6622-المراحل-الثلاث-لـ-repack-concurrently">6.6.2.2. المراحل الثلاث لـ REPACK CONCURRENTLY</h3>
<p>يصف هذا القسم الفرعي العملية وفق التنفيذ الفعلي.</p>
<p>للتركيز على أنواع الأقفال المحتجزة أثناء كل مرحلة، تُحذف هنا تفاعلات العمليات الخلفية الداخلية وتفاصيل repack_decoding_worker.</p>
<p>وكما هو موضّح في الشكل 6.13، يطبّق التنفيذ التغييرات مرتين لتقليل حالات التعطّل التشغيلي الناتجة عن قفل AccessExclusiveLock.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql06-fig-6-13.webp" alt="To simplify, the old index file is omitted."></p>
<h4>الشكل 6.13. المراحل الثلاث لـ REPACK CONCURRENTLY.</h4>
<p>للتبسيط، يُحذف ملف الفهرس القديم.</p>
<p>يقوم هذا النهج على افتراض أن حجم التغييرات المتزامنة المولَّدة أثناء المرحلة 2 سيكون صغيراً نسبياً. وهذا ما يتيح إكمال المرحلة 3 — التي تطبّق التغييرات المتبقية وتنفّذ التبديل النهائي تحت القفل الصارم — بسرعة.</p>
<p>عند تشغيل أمر REPACK بخيار CONCURRENTLY، يبدأ repack_decoding_worker، وتحدث المعالجة التالية:</p>
<ul>
<li><strong>المرحلة 1: نسخ الصفوف</strong> تُنسخ الصفوف الحية بالطريقة نفسها الموضّحة في القسم السابق. وأثناء هذه المرحلة، تحتفظ العملية الخلفية الخاصة بـ REPACK بقفل ShareUpdateExclusiveLock على الجدول القديم وقفل AccessExclusiveLock على الجدول الجديد.</li>
<li><strong>المرحلة 2: تطبيق تغييرات المرحلة 1</strong> تُطبَّق التغييرات التي حدثت أثناء المرحلة 1 على الجدول الجديد. والأقفال المحتجزة مماثلة لتلك الموجودة في المرحلة 1. وأثناء هذه المرحلة، قد تحدث عمليات تحديث وإدراج من عمليات خلفية أخرى. في هذا المثال، يُحدَّث Tuple_X ليصبح Tuple_Z.</li>
<li><strong>المرحلة 3: تطبيق تغييرات المرحلة 2</strong> يُحصَّل قفل AccessExclusiveLock على الجدول القديم لمنع إجراء مزيد من التحديثات عليه. وبعدم حدوث تغييرات إضافية، تُطبَّق التغييرات المتراكمة أثناء المرحلة 2 على الجدول الجديد.</li>
</ul>
<p>وبعد ذلك، ينتهي repack_decoding_worker. وعلى غرار REPACK (VACUUM FULL) العادي، يُتبادَل الجدولان/الفهرسان القديم والجديد، وتُزال ملفات الجدول/الفهرس القديمة، وتُحدَّث FSM وVM والإحصاءات.</p>
<p>وكما هو موضّح في هذا المثال، قد يؤدي تطبيق التغييرات المتزامنة أثناء المرحلتين 2 و3 إلى توليد صفوف ميتة جديدة في ملف الجدول الجديد. لذلك، وعلى خلاف التنفيذ غير المتزامن، لا يمكن لـ REPACK CONCURRENTLY ضمان جدول خالٍ تماماً من الصفوف الميتة.</p>
`,r={book:e,chapter:n,chapterTitle:t,slug:a,title:s,headings:p,html:l};export{e as book,n as chapter,t as chapterTitle,r as default,p as headings,l as html,a as slug,s as title};
