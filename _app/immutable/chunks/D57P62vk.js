const s="db-design",e="chapter-6",a="Classification of Database Systems",t="index",n="تصنيف أنظمة قواعد البيانات",d=[{depth:2,id:"التصنيف-classification-بحسب-نموذج-البيانات",text:"التصنيف (classification) بحسب نموذج البيانات"},{depth:2,id:"التصنيف-بحسب-عدد-المستخدمين",text:"التصنيف بحسب عدد المستخدمين"},{depth:2,id:"التصنيف-بحسب-توزع-قاعدة-البيانات",text:"التصنيف بحسب توزّع قاعدة البيانات"},{depth:3,id:"الأنظمة-المركزية-centralized-systems",text:"الأنظمة المركزية (Centralized systems)"},{depth:3,id:"نظام-قواعد-البيانات-الموزع-distributed-database-system",text:"نظام قواعد البيانات الموزّع (Distributed database system)"},{depth:3,id:"أنظمة-قواعد-البيانات-الموزعة-المتجانسة-homogeneous-distributed-database-systems",text:"أنظمة قواعد البيانات الموزّعة المتجانسة (Homogeneous distributed database systems)"},{depth:3,id:"أنظمة-قواعد-البيانات-الموزعة-غير-المتجانسة-heterogeneous-distributed-database-systems",text:"أنظمة قواعد البيانات الموزّعة غير المتجانسة (Heterogeneous distributed database systems)"},{depth:2,id:"الإسناد-attribution",text:"الإسناد (Attribution)"}],o=`<p>المتن الرئيسي</p>
<pre><code class="language-sql">Key Terms

centralized database <span class="hljs-keyword">system</span>: the DBMS <span class="hljs-keyword">and</span> database <span class="hljs-keyword">are</span> stored <span class="hljs-keyword">at</span> a single site that <span class="hljs-keyword">is</span> used <span class="hljs-keyword">by</span> several other systems too

distributed database <span class="hljs-keyword">system</span>: the actual database <span class="hljs-keyword">and</span> the DBMS software <span class="hljs-keyword">are</span> distributed <span class="hljs-keyword">from</span> various sites that <span class="hljs-keyword">are</span> connected <span class="hljs-keyword">by</span> a computer network

heterogeneous distributed database <span class="hljs-keyword">system</span>: different sites might use different DBMS software, but there <span class="hljs-keyword">is</span> additional common software <span class="hljs-keyword">to</span> support data exchange <span class="hljs-keyword">between</span> these sites

homogeneous distributed database systems: use the same DBMS software <span class="hljs-keyword">at</span> multiple sites

multiuser database <span class="hljs-keyword">system</span>: a database management <span class="hljs-keyword">system</span> which supports multiple users concurrently

object<span class="hljs-operator">-</span>oriented data model: a database management <span class="hljs-keyword">system</span> <span class="hljs-keyword">in</span> which information <span class="hljs-keyword">is</span> represented <span class="hljs-keyword">in</span> the form <span class="hljs-keyword">of</span> objects <span class="hljs-keyword">as</span> used <span class="hljs-keyword">in</span> object<span class="hljs-operator">-</span>oriented programming

single<span class="hljs-operator">-</span><span class="hljs-keyword">user</span> database <span class="hljs-keyword">system</span>: a database management <span class="hljs-keyword">system</span> which supports <span class="hljs-keyword">one</span> <span class="hljs-keyword">user</span> <span class="hljs-keyword">at</span> a <span class="hljs-type">time</span>

traditional models: data models that preceded the relational model
</code></pre>
<p>يمكن تصنيف أنظمة إدارة قواعد البيانات (DBMS) وفق عدة معايير، مثل نموذج البيانات (data model) وعدد المستخدمين وتوزّع قاعدة البيانات، وكلها موصوفة أدناه.</p>
<pre><code class="language-sql">Exercises

Provide three examples <span class="hljs-keyword">of</span> the most popular relational databases used.
What <span class="hljs-keyword">is</span> the difference <span class="hljs-keyword">between</span> centralized <span class="hljs-keyword">and</span> distributed database systems?
What <span class="hljs-keyword">is</span> the difference <span class="hljs-keyword">between</span> homogenous distributed database systems <span class="hljs-keyword">and</span> heterogeneous distributed database systems?
</code></pre>
<h2 id="التصنيف-classification-بحسب-نموذج-البيانات">التصنيف (classification) بحسب نموذج البيانات</h2>
<p>أكثر نماذج البيانات (data models) شيوعًا في الاستخدام اليوم هو نموذج البيانات العلائقي (relational data model). تدعم أنظمة إدارة قواعد البيانات (DBMS) المعروفة مثل Oracle وMS SQL Server وDB2 وMySQL هذا النموذج. ولا تزال النماذج التقليدية الأخرى، مثل نماذج البيانات الهرمية (hierarchical data models) ونماذج البيانات الشبكية (network data models)، مستخدمة في الصناعة خصوصًا على منصات الحاسوب المركزي (mainframe platforms). غير أنها لا تُستخدم على نطاق واسع بسبب تعقيدها. ويشار إلى جميع هذه النماذج بالنماذج التقليدية (traditional models) لأنها سبقت النموذج العلائقي.</p>
<p>في السنوات الأخيرة، طُرِّقت نماذج البيانات الأحدث الموجّهة للكائنات (object-oriented data models). وهذا النموذج هو نظام إدارة قواعد بيانات تُمثَّل فيه المعلومات على هيئة كائنات (objects) كما هي مستخدمة في البرمجة الموجّهة للكائنات. وتختلف قواعد البيانات الموجّهة للكائنات عن قواعد البيانات العلائقية المعتمدة على الجداول. وتجمع أنظمة إدارة قواعد البيانات الموجّهة للكائنات (OODBMS) بين قدرات قواعد البيانات وقدرات لغة البرمجة الموجّهة للكائنات.</p>
<p>لم تنل نماذج البيانات الموجّهة للكائنات القبول المتوقع، لذا فهي ليست مستخدمة على نطاق واسع. ومن أمثلة أنظمة إدارة قواعد البيانات الموجّهة للكائنات: O2 وObjectStore وJasmine.</p>
<h2 id="التصنيف-بحسب-عدد-المستخدمين">التصنيف بحسب عدد المستخدمين</h2>
<p>يمكن تصنيف نظام إدارة قواعد البيانات (DBMS) بحسب عدد المستخدمين الذين يدعمهم. فقد يكون نظام قواعد بيانات لمستخدم واحد (single-user database system) يدعم مستخدمًا واحدًا في كل مرة، أو نظام قواعد بيانات متعدد المستخدمين (multiuser database system) يدعم عدة مستخدمين في الوقت نفسه.</p>
<h2 id="التصنيف-بحسب-توزع-قاعدة-البيانات">التصنيف بحسب توزّع قاعدة البيانات</h2>
<p>توجد أربعة أنظمة توزيع رئيسية لأنظمة قواعد البيانات، وهذه بدورها يمكن أن تُستخدم في تصنيف أنظمة إدارة قواعد البيانات.</p>
<h3 id="الأنظمة-المركزية-centralized-systems">الأنظمة المركزية (Centralized systems)</h3>
<p>في نظام قواعد البيانات المركزي (centralized database system)، يُخزَّن نظام إدارة قواعد البيانات وقاعدة البيانات في موقع واحد تستخدمه عدة أنظمة أخرى أيضًا. ويوضح ذلك في الشكل 6.1.</p>
<p><img src="/images/db-design/chapter-6-0-Centralized_Systems_300x174.webp" alt="مخطط أنظمة مركزية: حاسوب مركزي كبير وأربعة محطات عمل"></p>
<p>في مطلع الثمانينيات من القرن الماضي، استخدمت كثير من المكتبات الكندية جهاز GEAC 8000 لتحويل فهارس البطاقات الورقية الخاصة بها إلى أنظمة فهرسة مركزية قابلة للقراءة الآلية. وكان لكل فهرس كتب حقل باركود مشابه لتلك الموجودة في منتجات محطات التسوق.</p>
<h3 id="نظام-قواعد-البيانات-الموزع-distributed-database-system">نظام قواعد البيانات الموزّع (Distributed database system)</h3>
<p>في نظام قواعد البيانات الموزّع (distributed database system)، تُوزَّع قاعدة البيانات الفعلية وبرمجيات نظام إدارة قواعد البيانات من مواقع مختلفة ترتبط بشبكة حاسوبية، كما هو موضح في الشكل 6.2.</p>
<p><img src="/images/db-design/chapter-6-1-Distributed_Systems_300x217.webp" alt="صورة توضيحية من الكتاب: Diagram showing three circles, separately labelled Site 1-3, and each containing several computer monitors and a computer tower. A line connects each of these to a central oval marked Computer Network."></p>
<h3 id="أنظمة-قواعد-البيانات-الموزعة-المتجانسة-homogeneous-distributed-database-systems">أنظمة قواعد البيانات الموزّعة المتجانسة (Homogeneous distributed database systems)</h3>
<p>تستخدم أنظمة قواعد البيانات الموزّعة المتجانسة (homogeneous distributed database systems) البرمجية نفسها لإدارة قواعد البيانات من مواقع متعددة. ويمكن التعامل مع تبادل البيانات بين هذه المواقع المختلفة بسهولة. فمثلًا، تستخدم أنظمة معلومات المكتبات الصادرة عن المورّد نفسه، مثل Geac Computer Corporation، البرمجية نفسها لإدارة قواعد البيانات، ما يسمح بتبادل البيانات بسهولة بين مواقع مكتبات Geac المختلفة.</p>
<h3 id="أنظمة-قواعد-البيانات-الموزعة-غير-المتجانسة-heterogeneous-distributed-database-systems">أنظمة قواعد البيانات الموزّعة غير المتجانسة (Heterogeneous distributed database systems)</h3>
<p>في نظام قواعد البيانات الموزّع غير المتجانس (heterogeneous distributed database system)، قد تستخدم المواقع المختلفة برمجيات مختلفة لإدارة قواعد البيانات، غير أنه توجد برمجيات مشتركة إضافية تدعم تبادل البيانات بين هذه المواقع. فمثلًا، تستخدم أنظمة قواعد بيانات المكتبات المختلفة صيغة الفهرسة المقروءة آليًا (MARC) نفسها لدعم تبادل بيانات سجلات المكتبات.</p>
<p>نظام قواعد البيانات المركزي (centralized database system): نظام إدارة قواعد البيانات وقاعدة البيانات مخزَّنان في موقع واحد تستخدمه عدة أنظمة أخرى أيضًا</p>
<p>نظام قواعد البيانات الموزّع (distributed database system): قاعدة البيانات الفعلية وبرمجيات نظام إدارة قواعد البيانات موزَّعة من مواقع مختلفة ترتبط بشبكة حاسوبية</p>
<p>نظام قواعد البيانات الموزّع غير المتجانس (heterogeneous distributed database system): قد تستخدم المواقع المختلفة برمجيات مختلفة لإدارة قواعد البيانات، غير أنه توجد برمجيات مشتركة إضافية تدعم تبادل البيانات بين هذه المواقع</p>
<p>أنظمة قواعد البيانات الموزّعة المتجانسة (homogeneous distributed database systems): تستخدم البرمجية نفسها لإدارة قواعد البيانات في مواقع متعددة</p>
<p>نظام قواعد البيانات متعدد المستخدمين (multiuser database system): نظام إدارة قواعد بيانات يدعم عدة مستخدمين في الوقت نفسه</p>
<p>نموذج البيانات الموجّه للكائنات (object-oriented data model): نظام إدارة قواعد بيانات تُمثَّل فيه المعلومات على هيئة كائنات كما هي مستخدمة في البرمجة الموجّهة للكائنات</p>
<p>نظام قواعد البيانات لمستخدم واحد (single-user database system): نظام إدارة قواعد بيانات يدعم مستخدمًا واحدًا في كل مرة</p>
<p>النماذج التقليدية (traditional models): نماذج بيانات سبقت النموذج العلائقي</p>
<ul>
<li>اذكر ثلاثة أمثلة لأشهر قواعد البيانات العلائقية المستخدمة.</li>
<li>ما الفرق بين أنظمة قواعد البيانات المركزية وأنظمة قواعد البيانات الموزّعة؟</li>
<li>ما الفرق بين أنظمة قواعد البيانات الموزّعة المتجانسة وأنظمة قواعد البيانات الموزّعة غير المتجانسة؟</li>
</ul>
<h2 id="الإسناد-attribution">الإسناد (Attribution)</h2>
<p>هذا الفصل من كتاب تصميم قواعد البيانات (Database Design)، بما في ذلك الصور باستثناء ما أُشير إليه خلاف ذلك، هو نسخة مشتقة من <a href="http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1">Database System Concepts</a> بقلم Nguyen Kim Anh، وهو مرخَّص بموجب <a href="http://creativecommons.org/licenses/by/3.0/">رخصة المشاع الإبداعي: نسب العمل 3.0</a></p>
<p>كتبت المادة التالية Adrienne Watt:</p>
<ul>
<li>المصطلحات المفتاحية</li>
<li>التمارين</li>
</ul>
`,i={book:s,chapter:e,chapterTitle:a,slug:t,title:n,headings:d,html:o};export{s as book,e as chapter,a as chapterTitle,i as default,d as headings,o as html,t as slug,n as title};
