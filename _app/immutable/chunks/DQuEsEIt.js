const s="db-design",a="chapter-2",e="Fundamental Concepts",n="index",l="المفاهيم الأساسية",t=[{depth:2,id:"ما-هي-قاعدة-البيانات-database",text:"ما هي قاعدة البيانات (database)؟"},{depth:2,id:"خصائص-قاعدة-البيانات",text:"خصائص قاعدة البيانات"},{depth:2,id:"نظام-إدارة-قواعد-البيانات-dbms",text:"نظام إدارة قواعد البيانات (DBMS)"},{depth:2,id:"نسب-العمل",text:"نسب العمل"}],p=`<p>النص الرئيسي</p>
<pre><code class="language-sql">Key Terms

data elements: facts that represent <span class="hljs-type">real</span><span class="hljs-operator">-</span>world information

database: a shared collection <span class="hljs-keyword">of</span> related data used <span class="hljs-keyword">to</span> support the activities <span class="hljs-keyword">of</span> a particular organization

database management <span class="hljs-keyword">system</span> (DBMS):  a collection <span class="hljs-keyword">of</span> programs that enables users <span class="hljs-keyword">to</span> <span class="hljs-keyword">create</span> <span class="hljs-keyword">and</span> maintain databases <span class="hljs-keyword">and</span> control <span class="hljs-keyword">all</span> access <span class="hljs-keyword">to</span> them

<span class="hljs-keyword">table</span>: a combination <span class="hljs-keyword">of</span> fields
</code></pre>
<h2 id="ما-هي-قاعدة-البيانات-database">ما هي قاعدة البيانات (database)؟</h2>
<pre><code class="language-sql">Exercises

What <span class="hljs-keyword">is</span> a database management <span class="hljs-keyword">system</span> (DBMS)?
What <span class="hljs-keyword">are</span> the properties <span class="hljs-keyword">of</span> a DBMS?
Provide three examples <span class="hljs-keyword">of</span> a <span class="hljs-type">real</span><span class="hljs-operator">-</span>world database (e.g., the library <span class="hljs-keyword">contains</span> a database <span class="hljs-keyword">of</span> books).
</code></pre>
<p>قاعدة البيانات (database) هي مجموعة مشتركة من البيانات (data) المترابطة تُستخدم لدعم أنشطة مؤسسة بعينها. ويمكن النظر إلى قاعدة البيانات بوصفها مستودعًا للبيانات يُعرَّف مرة واحدة ثم يصل إليه مستخدمون مختلفون، كما هو مبيّن في الشكل 2.1.</p>
<p><img src="/images/db-design/chapter-2-0-RDBMS_300x2091.webp" alt="مخطط يوضّح استخدام نظام إدارة قواعد البيانات العلائقية في المؤسسات"></p>
<h2 id="خصائص-قاعدة-البيانات">خصائص قاعدة البيانات</h2>
<p>للقاعدة البيانات الخصائص التالية:</p>
<ul>
<li>إنها تمثيل لجانب ما من العالم الحقيقي، أو لمجموعة من عناصر البيانات (الحقائق) التي تمثّل معلومات عن العالم الحقيقي.</li>
<li>قاعدة البيانات منطقية ومتماسكة ومتسقة داخليًا.</li>
<li>تُصمَّم قاعدة البيانات وتُبنى وتُملأ بالبيانات لغرض محدد.</li>
<li>يُخزَّن كل عنصر بيانات في حقل (field).</li>
<li>يتكوّن الجدول (table) من مجموعة من الحقول. فعلى سبيل المثال، يحتوي كل حقل في جدول الموظفين على بيانات عن موظف بعينه.</li>
</ul>
<p>يمكن أن تحتوي قاعدة البيانات على جداول كثيرة. فعلى سبيل المثال، قد يحتوي نظام العضويات على جدول للعناوين وجدول للأعضاء الأفراد، كما هو مبيّن في الشكل 2.2. وأعضاء Science World هم الأفراد والبيوت الجماعية والشركات والمؤسسات التي تتوفر لها عضوية سارية في Science World. ويمكن شراء العضوية لمدة سنة أو سنتين، ثم تجديدها لمدة سنة أو سنتين أخرى.</p>
<p><img src="/images/db-design/chapter-2-1-MemFormAug2014.webp" alt="لقطة لنموذج عضوية إلكترونية، وتحته جدول بأسماء وباركودات"></p>
<p>في الشكل 2.2، جددت ميني ماوس عضوية العائلة مع Science World. ويعيش جميع من يحملون رقم العضوية 100755 في 8932 Rodent Lane. أما الأعضاء الأفراد فهم: Mickey Mouse، وMinnie Mouse، وMighty Mouse، وDoor Mouse، وTom Mouse، وKing Rat، وMan Mouse، وMoose Mouse.</p>
<h2 id="نظام-إدارة-قواعد-البيانات-dbms">نظام إدارة قواعد البيانات (DBMS)</h2>
<p>نظام إدارة قواعد البيانات (DBMS) هو مجموعة من البرامج تتيح للمستخدمين إنشاء قواعد البيانات وصيانتها والتحكم في جميع أشكال الوصول إليها. والهدف الأساسي لـ DBMS هو توفير بيئة مريحة وفعّالة في الوقت نفسه للمستخدمين لاسترجاع المعلومات وتخزينها.</p>
<p>مع نهج قاعدة البيانات، يمكننا أن نستخدم النظام المصرفي التقليدي المبيّن في الشكل 2.3. وفي هذا المثال المصرفي، تستخدم إدارة الموارد البشرية وإدارة الحسابات وإدارة القروض نظام إدارة قواعد البيانات (DBMS) للوصول إلى قاعدة بيانات الشركة المشتركة.</p>
<p><img src="/images/db-design/chapter-2-2-Banking_Systems_RDBMS_300x1951.webp" alt="ثلاثة مخططات: مستخدمون في فرع، ونظام مركزي، وموظف فرع يتصل بالمركز"></p>
<p>عناصر البيانات (data elements): حقائق تمثّل معلومات عن العالم الحقيقي</p>
<p>قاعدة البيانات (database): مجموعة مشتركة من البيانات المترابطة تُستخدم لدعم أنشطة مؤسسة بعينها</p>
<p>نظام إدارة قواعد البيانات (database management system, DBMS): مجموعة من البرامج تتيح للمستخدمين إنشاء قواعد البيانات وصيانتها والتحكم في جميع أشكال الوصول إليها</p>
<p>الجدول (table): مجموعة من الحقول</p>
<ul>
<li>ما هو نظام إدارة قواعد البيانات (DBMS)؟</li>
<li>ما هي خصائص نظام إدارة قواعد البيانات (DBMS)؟</li>
<li>قدّم ثلاثة أمثلة على قاعدة بيانات من العالم الحقيقي (مثل: تحتوي المكتبة على قاعدة بيانات من الكتب).</li>
</ul>
<h2 id="نسب-العمل">نسب العمل</h2>
<p>هذا الفصل من كتاب Database Design (بما في ذلك الصور، ما لم يُنص على خلاف ذلك) هو نسخة مشتقة من <a href="http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1">Database System Concepts</a> من تأليف Nguyen Kim Anh، بترخيص <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution License 3.0 license</a></p>
<p>كُتبت المواد التالية من إعداد Nelson Eng:</p>
<ul>
<li>المثال الوارد ضمن خصائص قاعدة البيانات</li>
<li>المصطلحات الأساسية</li>
</ul>
<p>كُتبت المواد التالية من إعداد Adrienne Watt:</p>
<ul>
<li>تمارين</li>
</ul>
`,o={book:s,chapter:a,chapterTitle:e,slug:n,title:l,headings:t,html:p};export{s as book,a as chapter,e as chapterTitle,o as default,t as headings,p as html,n as slug,l as title};
