const t="postgres-internals",n="pgsql02",s="معمارية العمليات والذاكرة",r="index",e="معمارية العمليات والذاكرة",o=[{depth:2,id:"211-عملية-خادم-postgres",text:"2.1.1. عملية خادم Postgres"},{depth:2,id:"212-العمليات-الخلفية",text:"2.1.2. العمليات الخلفية"},{depth:2,id:"213-العمليات-في-الخلفية",text:"2.1.3. العمليات في الخلفية"},{depth:2,id:"221-منطقة-الذاكرة-المحلية",text:"2.2.1. منطقة الذاكرة المحلية"},{depth:2,id:"222-منطقة-الذاكرة-المشتركة",text:"2.2.2. منطقة الذاكرة المشتركة"}],p=`<h1>2.1. معمارية العمليات (Process Architecture)</h1>
<p>PostgreSQL هو نظام إدارة قواعد بيانات علائقية بنموذج عميل/خادم (client/server) يتميّز بمعمارية متعددة العمليات تعمل على مضيف واحد.</p>
<p>تُعرف مجموعة العمليات المتعددة التي تدير عنقود قواعد البيانات تعاونيًا باسم «خادم PostgreSQL»، وهي تشمل الأنواع التالية من العمليات:</p>
<ul>
<li><strong>عملية خادم Postgres (Postgres server process):</strong> الأصل لجميع العمليات المتعلقة بإدارة عنقود قواعد البيانات.</li>
<li><strong>العمليات الخلفية (Backend processes):</strong> تتولى كل عملية خلفية معالجة جميع الاستعلامات والعبارات التي يصدرها عميل متصل.</li>
<li><strong>العمليات في الخلفية (Background processes):</strong> عمليات متنوعة تنفّذ مهام إدارة قاعدة البيانات، مثل عمليات VACUUM وCHECKPOINT.</li>
<li><strong>عمليات النسخ المتماثل (Replication-associated processes):</strong> عمليات تنفّذ النسخ المتماثل المتدفق (streaming replication). وتُقدَّم تفاصيل إضافية في <a href="/arabic-cs-library/book/postgres-internals/pgsql11/index">الفصل 11</a> و<a href="/arabic-cs-library/book/postgres-internals/pgsql12/index">الفصل 12</a>.</li>
<li><strong>عمليات العمال في الخلفية (Background worker processes):</strong> مدعومة منذ الإصدار 9.3، ويمكن لهذه العمليات تنفيذ أي منطق يُنفّذه المستخدم. لمزيد من المعلومات، راجع <a href="http://www.postgresql.org/docs/current/static/bgworker.html">التوثيق الرسمي</a>.</li>
</ul>
<p>وتصف الأقسام الفرعية التالية تفاصيل الأنواع الثلاثة الأولى من العمليات.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql02-fig-2-01.webp" alt="This figure illustrates the process architecture of a PostgreSQL server, including a postgres server process, two backend processes, seven background processes, and two client processes. The database cluster and shared memory are also shown."></p>
<h4>الشكل 2.1. مثال على معمارية العمليات في PostgreSQL.</h4>
<p>يوضّح هذا الشكل معمارية العمليات في خادم PostgreSQL، بما في ذلك عملية خادم postgres، وعمليتا خلفية (backend)، وسبع عمليات في الخلفية (background)، وعمليتا عميل. ويظهر أيضًا عنقود قواعد البيانات والذاكرة المشتركة.</p>
<p>** لماذا يستخدم PostgreSQL نموذج العمليات.</p>
<p>في أوائل التسعينيات من القرن العشرين، عندما بدأ تطوير PostgreSQL، كان استخدام نموذج قائم على العمليات هو الخيار العملي الوحيد. في ذلك الوقت، لم تكن خيوط POSIX (POSIX Threads) قد وُحِّدت بعد، وكانت تطبيقات الخيوط غير مستقرة للغاية. وبالحفاظ على هذه المعمارية حتى اليوم، يواصل PostgreSQL جني الفوائد التالية:</p>
<ul>
<li><strong>عزل متين (Robust Isolation):</strong> بما أن كل عملية خلفية تعمل باستقلالية، فإن انهيار جلسة معينة يُمنع من الانتقال إلى بقية النظام.</li>
<li><strong>إدارة الذاكرة على مستوى نظام التشغيل (OS-Level Memory Management):</strong> تُقسَّم مساحات الذاكرة تقسيمًا صارمًا بين العمليات، ما يضمن سلامة البيانات. علاوة على ذلك، يتولى نظام التشغيل بشكل موثوق تحرير الموارد عند إنهاء العملية.</li>
</ul>
<p>وفي السنوات الأخيرة، تكرّرت النقاشات حول الانتقال إلى الخيوط (threads) لإزالة الكلفة الناتجة عن إنشاء العمليات. غير أن كلفة إعادة هيكلة قاعدة شيفرة ضخمة وموروثة لتكون آمنة تجاه الخيوط ومخاطرها هائلة. وإضافة إلى ذلك، قلّلت التطورات في أنظمة التشغيل الحديثة هذه الكلفة تقليلًا كبيرًا. ونتيجة لذلك، يستمر PostgreSQL في اعتماد نموذج عملياته عالي الموثوقية.</p>
<p>محتويات القسم</p>
<ul>
<li>2.1.1. عملية خادم Postgres</li>
<li>2.1.2. العمليات الخلفية</li>
<li>2.1.3. العمليات في الخلفية</li>
</ul>
<h2 id="211-عملية-خادم-postgres">2.1.1. عملية خادم Postgres</h2>
<p>عملية خادم Postgres هي الأصل لجميع العمليات داخل خادم PostgreSQL. وفي الإصدارات الأقدم، كانت هذه العملية تُسمى <em>postmaster</em>.</p>
<p>تبدأ عملية خادم Postgres عند تنفيذ أداة <a href="http://www.postgresql.org/docs/current/static/app-pg-ctl.html">pg_ctl</a> مع الخيار «start».</p>
<p>وعند بدئها، تخصّص منطقة ذاكرة مشتركة، وتُطلق عمليات في الخلفية متنوعة، وتبدأ عمليات النسخ المتماثل أو عمليات العمال في الخلفية حسب الحاجة. ثم تنتظر طلبات الاتصال من العملاء. وعند استقبال أي طلب اتصال، تُنشئ عملية خادم Postgres عملية خلفية مخصصة للتعامل مع جلسة العميل.</p>
<p>تستمع عملية خادم Postgres إلى منفذ شبكة محدد، والمنفذ الافتراضي هو <strong>5432</strong>. وبينما يمكن تشغيل عدة خوادم PostgreSQL على المضيف نفسه، يجب ضبط كل نسخة للاستماع إلى رقم منفذ فريد (مثل 5432 و5433 وغيرها).</p>
<h2 id="212-العمليات-الخلفية">2.1.2. العمليات الخلفية</h2>
<p>العملية الخلفية (backend process)، وتُسمى أيضًا عملية postgres، تُنشئها عملية خادم Postgres وتتولى معالجة جميع الاستعلامات التي يصدرها عميل واحد متصل. وتتواصل مع العميل عبر اتصال TCP واحد، وتنتهي عند فصل العميل.</p>
<p>ولا يمكن لكل عملية خلفية أن تعمل إلا على قاعدة بيانات واحدة في كل مرة؛ لذلك يجب اختيار قاعدة بيانات محددة أثناء عملية الاتصال.</p>
<p>يدعم PostgreSQL الاتصالات المتزامنة من عدة عملاء، ويحكم الحد الأقصى لعددها معامل التهيئة <a href="http://www.postgresql.org/docs/current/static/runtime-config-connection.html#GUC-MAX-CONNECTIONS">max_connections</a> (القيمة الافتراضية: 100).</p>
<p>ولأن PostgreSQL لا يمتلك ميزة تجميع الاتصالات الأصلية، فإن دورات الاتصال والانقطاع المتكررة — الشائعة في تطبيقات مثل خدمات الويب — قد تزيد كلفة إنشاء الاتصالات وإنشاء العمليات الخلفية.</p>
<p>وقد تؤثر هذه الكلفة سلبًا على الأداء العام لخادم قاعدة البيانات. وللتخفيف من ذلك، يُستخدم عادةً برمجيات وسيطة لتجميع الاتصالات مثل <a href="https://pgbouncer.github.io/">pgbouncer</a> أو <a href="http://www.pgpool.net/mediawiki/index.php/Main_Page">pgpool-II</a>.</p>
<h2 id="213-العمليات-في-الخلفية">2.1.3. العمليات في الخلفية</h2>
<p>يسرد الجدول 2.1 العمليات الأساسية في الخلفية.</p>
<p>وعلى عكس عملية خادم Postgres والعمليات الخلفية، لا يمكن تلخيص وظائف العمليات في الخلفية بسهولة لأنها تعتمد على ميزات محددة وتفاصيل داخلية عميقة في PostgreSQL.</p>
<p>لذلك، يقدّم هذا القسم تعريفًا موجزًا فقط بكل عملية. وتُقدَّم شروح مفصلة في الفصول اللاحقة.</p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>الوصف</th>
<th>المرجع</th>
</tr>
</thead>
<tbody>
<tr>
<td>background writer</td>
<td>يكتب <strong>الصفحات المتسخة</strong> (dirty pages) دوريًا وتدريجيًا من مجمع المخازن المؤقتة المشتركة (shared buffer pool) إلى التخزين الدائم (مثل HDD وSSD). (في الإصدارات 9.1 والأقدم، كان مسؤولًا أيضًا عن تنفيذ نقاط التفتيش.)</td>
<td>القسم 8.6</td>
</tr>
<tr>
<td>checkpointer</td>
<td>ينفّذ عمليات نقطة التفتيش في الإصدارات 9.2 أو أحدث.</td>
<td>القسم 8.6، القسم 9.7</td>
</tr>
<tr>
<td>autovacuum launcher</td>
<td>يستدعي دوريًا عمليات عمال التفريغ التلقائي لتنفيذ عمليات VACUUM وANALYZE. (تقنيًا، يطلب من عملية خادم Postgres إنشاء عمال التفريغ التلقائي.)</td>
<td>القسم 6.5</td>
</tr>
<tr>
<td>WAL writer</td>
<td>يكتب ويدفّق دوريًا بيانات WAL من مخزن WAL المؤقت إلى التخزين الدائم.</td>
<td>القسم 9.6.1</td>
</tr>
<tr>
<td>WAL Summarizer</td>
<td>يتتبّع التغييرات على جميع كتل قاعدة البيانات ويكتب هذه التعديلات في ملفات ملخص WAL. وأُدخلت هذه العملية في الإصدار 17 (عام 2024).</td>
<td>القسم 9.6.2</td>
</tr>
<tr>
<td>statistics collector</td>
<td>يجمع الإحصاءات لعروض النظام مثل <em>pg_stat_activity</em> و<em>pg_stat_database</em>.</td>
<td></td>
</tr>
<tr>
<td>logging collector (logger)</td>
<td>يلتقط رسائل الأخطاء ويكتبها في ملفات السجل.</td>
<td></td>
</tr>
<tr>
<td>io worker</td>
<td>يتعامل مع عمليات القراءة بشكل غير متزامن لتخفيف مهام الإدخال/الإخراج عن العمليات الخلفية. (أُدخل الإدخال/الإخراج غير المتزامن في الإصدار 18 (عام 2025) لتحسين أداء الإدخال/الإخراج.)</td>
<td>القسم 8.5.2.2</td>
</tr>
<tr>
<td>archiver</td>
<td>ينفّذ عملية أرشفة السجل.</td>
<td>القسم 9.10</td>
</tr>
</tbody>
</table>
<p>** معلومة</p>
<p>تظهر العمليات الفعلية لخادم PostgreSQL أدناه.</p>
<p>في هذا المثال، توجد عملية خادم postgres واحدة (PID 6541)، وعمليتان خلفيتان (PID 8412 و8482)، وعدة عمليات في الخلفية كما هو مسرود في الجدول 2.1. انظر أيضًا الشكل 2.1.</p>
<pre><code class="language-bash">$ pstree -p 6541
-+= 00001 root /sbin/launchd
 \\-+= 06541 postgres /usr/local/pgsql/bin/postgres -D data
   |--= 06542 postgres postgres: io worker 0
   |--= 06543 postgres postgres: io worker 1
   |--= 06544 postgres postgres: io worker 2
   |--= 06545 postgres postgres: checkpointer
   |--= 06546 postgres postgres: background writer
   |--= 06548 postgres postgres: walwriter
   |--= 06549 postgres postgres: autovacuum launcher
   |--= 06550 postgres postgres: walsummarizer
   |--= 06551 postgres postgres: logical replication launcher
   |--= 08412 postgres postgres: postgres testdb [<span class="hljs-built_in">local</span>] idle
   \\--= 08482 postgres postgres: postgres testdb [<span class="hljs-built_in">local</span>] idle <span class="hljs-keyword">in</span> transaction
</code></pre>
<h1>2.2. معمارية الذاكرة (Memory Architecture)</h1>
<p>يمكن تصنيف معمارية الذاكرة في PostgreSQL إلى فئتين عريضتين:</p>
<ul>
<li><strong>منطقة الذاكرة المحلية (Local memory area):</strong> تخصّصها كل عملية خلفية لاستخدامها الخاص.</li>
<li><strong>منطقة الذاكرة المشتركة (Shared memory area):</strong> تستخدمها جميع عمليات خادم PostgreSQL.</li>
</ul>
<p>وتقدّم الأقسام الفرعية التالية وصفًا موجزًا لكل فئة.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql02-fig-2-02.webp" alt=""></p>
<h4>الشكل 2.2. معمارية الذاكرة في PostgreSQL.</h4>
<p>محتويات القسم</p>
<ul>
<li>2.2.1. منطقة الذاكرة المحلية</li>
<li>2.2.2. منطقة الذاكرة المشتركة</li>
</ul>
<h2 id="221-منطقة-الذاكرة-المحلية">2.2.1. منطقة الذاكرة المحلية</h2>
<p>تخصّص كل عملية خلفية منطقة ذاكرة محلية لمعالجة الاستعلامات. وتُقسَّم هذه المنطقة إلى عدة مناطق فرعية تكون أحجامها ثابتة أو متغيّرة.</p>
<p>ويسرد الجدول 2.2 المناطق الفرعية الأساسية. وتُقدَّم تفاصيل إضافية بشأن هذه المناطق في الفصول اللاحقة.</p>
<table>
<thead>
<tr>
<th>المنطقة الفرعية</th>
<th>الوصف</th>
<th>المرجع</th>
</tr>
</thead>
<tbody>
<tr>
<td>work_mem</td>
<td>يستخدمه المنفِّذ لفرز الصفوف (tuples) في عمليات ORDER BY وDISTINCT، ولربط الجداول عبر عمليات الربط بالدمج والربط بالتجزئة (merge-join وhash-join).</td>
<td><a href="/arabic-cs-library/book/postgres-internals/pgsql03/index">الفصل 3</a></td>
</tr>
<tr>
<td>maintenance_work_mem</td>
<td>يُستخدم في عمليات الصيانة المتنوعة، مثل VACUUM وREINDEX وإنشاء الفهارس.</td>
<td>القسم 6.1</td>
</tr>
<tr>
<td>temp_buffers</td>
<td>يستخدمه المنفِّذ لتخزين الجداول المؤقتة طوال مدة الجلسة.</td>
<td></td>
</tr>
</tbody>
</table>
<p>بالإضافة إلى ذلك، أُدخلت <a href="https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-MIN-DYNAMIC-SHARED-MEMORY">الذاكرة المشتركة الديناميكية (DSM)</a> في الإصدار 9.4 لدعم <a href="https://www.postgresql.org/docs/current/parallel-query.html">الاستعلام المتوازي</a>.</p>
<p>والذاكرة المشتركة الديناميكية هي مساحة ذاكرة عند الطلب (تُخصَّص حسب الحاجة وتُحرَّر عند عدم الحاجة إليها) تُستخدم للتواصل بين عمليات PostgreSQL.</p>
<h2 id="222-منطقة-الذاكرة-المشتركة">2.2.2. منطقة الذاكرة المشتركة</h2>
<p>تُخصَّص منطقة الذاكرة المشتركة بواسطة خادم PostgreSQL أثناء بدء التشغيل. وتُقسَّم هذه المنطقة إلى عدة مناطق فرعية ثابتة الحجم. ويسرد الجدول 2.3 المناطق الفرعية الأساسية، مع تقديم تفاصيل إضافية في الفصول اللاحقة.</p>
<table>
<thead>
<tr>
<th>المنطقة الفرعية</th>
<th>الوصف</th>
<th>المرجع</th>
</tr>
</thead>
<tbody>
<tr>
<td>shared buffer pool</td>
<td>يحمّل PostgreSQL الصفحات من الجداول والفهارس من التخزين الدائم إلى هذه المنطقة ليعمل عليها مباشرة.</td>
<td><a href="/arabic-cs-library/book/postgres-internals/pgsql08/index">الفصل 8</a></td>
</tr>
<tr>
<td>WAL buffer</td>
<td>لضمان سلامة البيانات في مواجهة أعطال الخادم، يستخدم PostgreSQL آلية سجل ما قبل الكتابة (WAL). وتشكّل بيانات WAL (وتُسمى أيضًا سجلات XLOG) سجل المعاملات. ويعمل المخزن المؤقت لـ WAL كمنطقة تخزين مؤقت لبيانات WAL قبل دفقها إلى التخزين الدائم.</td>
<td><a href="/arabic-cs-library/book/postgres-internals/pgsql09/index">الفصل 9</a></td>
</tr>
<tr>
<td>commit log</td>
<td>يحتفظ سجل الالتزام (CLOG) بحالة جميع المعاملات (مثل قيد التنفيذ، وملتزمة، ومُجهضة) لآلية التحكّم بالتزامن (CC).</td>
<td>القسم 5.4</td>
</tr>
</tbody>
</table>
<p>وبالإضافة إلى هذه المناطق الأساسية، يخصّص PostgreSQL عدة مناطق فرعية أخرى لأغراض محددة:</p>
<ul>
<li><strong>آليات التحكّم في الوصول (Access control mechanisms):</strong> لإدارة الإشارات (semaphores) والأقفال المتنوعة (مثل الأقفال الخفيفة والأقفال المشتركة والأقفال الحصرية).</li>
<li><strong>العمليات في الخلفية (Background processes):</strong> لتنسيق المهام التي تنفّذها عمليات مثل مسؤول نقاط التفتيش (checkpointer) والتفريغ التلقائي (autovacuum).</li>
<li><strong>معالجة المعاملات (Transaction processing):</strong> لإدارة الحالات الداخلية مثل نقاط الحفظ (savepoints) والالتزام على مرحلتين (two-phase commits).</li>
</ul>
`,a={book:t,chapter:n,chapterTitle:s,slug:r,title:e,headings:o,html:p};export{t as book,n as chapter,s as chapterTitle,a as default,o as headings,p as html,r as slug,e as title};
