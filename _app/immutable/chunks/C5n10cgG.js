const s="db-design",a="chapter-14",e="Database Users",n="index",p="مستخدمو قاعدة البيانات",t=[{depth:2,id:"المستخدمون-النهائيون",text:"المستخدمون النهائيون"},{depth:3,id:"مستخدم-التطبيق",text:"مستخدم التطبيق"},{depth:3,id:"المستخدم-المتقدم",text:"المستخدم المتقدّم"},{depth:3,id:"مبرمجو-التطبيقات",text:"مبرمجو التطبيقات"},{depth:3,id:"مسؤولو-قواعد-البيانات-dba",text:"مسؤولو قواعد البيانات (DBA)"}],o=`<p>المتن الرئيسي</p>
<h2 id="المستخدمون-النهائيون">المستخدمون النهائيون</h2>
<p>المستخدمون النهائيون (end users) هم الأشخاص الذين تتطلب وظائفهم الوصول إلى قاعدة البيانات للاستعلام عنها وتحديثها وإنتاج التقارير.</p>
<h3 id="مستخدم-التطبيق">مستخدم التطبيق</h3>
<p>مستخدم التطبيق (application user) هو شخص يستخدم برنامج تطبيقيًا موجودًا لإنجاز المهام اليومية.</p>
<h3 id="المستخدم-المتقدم">المستخدم المتقدّم</h3>
<p>المستخدمون المتقدّمون (sophisticated users) هم من لديه طريقة خاصة به للوصول إلى قاعدة البيانات. وهذا يعني أنه لا يستخدم البرنامج التطبيقي المتوفر في النظام. بل قد يعرّف تطبيقه الخاص أو يصف احتياجه مباشرة باستخدام لغات الاستعلام. ويصون هؤلاء المستخدمون المتخصصون قواعد بياناتهم الشخصية باستخدام حزم برامج جاهزة توفّر أوامر سهلة الاستخدام تعتمد على القوائم المنسدلة، مثل MS Access.</p>
<h3 id="مبرمجو-التطبيقات">مبرمجو التطبيقات</h3>
<p>ينفّذ هؤلاء المستخدمون برامج تطبيقية بعينها للوصول إلى البيانات المخزَّنة. ويجب أن يكونوا على اطلاع بنظم إدارة قواعد البيانات (DBMS) لإنجاز مهمتهم.</p>
<h3 id="مسؤولو-قواعد-البيانات-dba">مسؤولو قواعد البيانات (DBA)</h3>
<p>قد يكون هذا شخصًا واحدًا أو مجموعة أشخاص في المؤسسة مسؤولين عن منح صلاحية الوصول إلى قاعدة البيانات ومراقبة استخدامها وإدارة جميع الموارد التي تدعم استخدام نظام قاعدة البيانات بالكامل.</p>
<p>مبرمج التطبيقات (application programmer): مستخدم ينفّذ برامج تطبيقية بعينها للوصول إلى البيانات المخزَّنة</p>
<p>مستخدم التطبيق (application user): يستخدم برنامج تطبيقيًا موجودًا لإنجاز المهام اليومية</p>
<p>مسؤول قاعدة البيانات (database administrator, DBA): مسؤول عن منح صلاحية الوصول إلى قاعدة البيانات ومراقبتها وإدارة جميع الموارد التي تدعم استخدام نظام قاعدة البيانات بالكامل</p>
<p>المستخدم النهائي (end user): أشخاص تتطلب وظائفهم الوصول إلى قاعدة البيانات للاستعلام عنها وتحديثها وإنتاج التقارير</p>
<p>المستخدم المتقدّم (sophisticated user): من يستخدم طرقًا أخرى، بخلاف البرنامج التطبيقي، للوصول إلى قاعدة البيانات</p>
<p>لا توجد تمارين مقدَّمة لهذا الفصل.</p>
<pre><code class="language-sql">Key Terms

application programmer: <span class="hljs-keyword">user</span> who implements <span class="hljs-keyword">specific</span> application programs <span class="hljs-keyword">to</span> access the stored data

application <span class="hljs-keyword">user</span>: accesses an existing application program <span class="hljs-keyword">to</span> perform daily tasks.

database administrator (DBA): responsible <span class="hljs-keyword">for</span> authorizing access <span class="hljs-keyword">to</span> the database, monitoring its use <span class="hljs-keyword">and</span> managing <span class="hljs-keyword">all</span> the resources <span class="hljs-keyword">to</span> support the use <span class="hljs-keyword">of</span> the entire database <span class="hljs-keyword">system</span>

<span class="hljs-keyword">end</span> <span class="hljs-keyword">user</span>: people whose jobs require access <span class="hljs-keyword">to</span> a database <span class="hljs-keyword">for</span> querying, updating <span class="hljs-keyword">and</span> generating reports

sophisticated <span class="hljs-keyword">user</span>: those who use other methods, other than the application program, <span class="hljs-keyword">to</span> access the database
</code></pre>
`,r={book:s,chapter:a,chapterTitle:e,slug:n,title:p,headings:t,html:o};export{s as book,a as chapter,e as chapterTitle,r as default,t as headings,o as html,n as slug,p as title};
