const s="database-foundations",a="sql-select",n="بَند SELECT بالتفصيل",e="index",p="جملة SELECT بالتفصيل",l=[{depth:2,id:"طلب-شيء-ما",text:"طلب شيء ما"},{depth:2,id:"تحديد-الأعمدة",text:"تحديد الأعمدة"},{depth:2,id:"اسم-مستعار-لاسم-عمود",text:"اسم مستعار لاسم عمود"},{depth:2,id:"إنشاء-أعمدة-جديدة",text:"إنشاء أعمدة جديدة"},{depth:3,id:"نص-أو-عدد-ثابت",text:"نص أو عدد ثابت"},{depth:3,id:"الحساب",text:"الحساب"},{depth:3,id:"دمج-السلاسل",text:"دمج السلاسل"},{depth:3,id:"دوال-السلاسل",text:"دوال السلاسل"},{depth:3,id:"case",text:"CASE"},{depth:2,id:"distinct",text:"DISTINCT"},{depth:2,id:"العمل-بالتواريخ",text:"العمل بالتواريخ"},{depth:3,id:"استخراج-من",text:"استخراج … من"},{depth:3,id:"الحساب-بالتواريخ",text:"الحساب بالتواريخ"},{depth:2,id:"تغيير-نوع-البيانات",text:"تغيير نوع البيانات"},{depth:3,id:"cast-as",text:"CAST … AS"},{depth:3,id:"tochar",text:"TO_CHAR"}],o=`<blockquote>
<p>من أسهل الطرق للفت الانتباه أو للتوظيف كمطور مبتدئ في صناعة التقنية توثيق كل ما تتعلمه. ابنِ مشاريع رائعة، لكن لا تنسَ توثيق رحلتك في الطريق. —Olawale Daniel</p>
</blockquote>
<p>هذا الفصل والفصول الأربعة التالية موضوع واحد كبير في الواقع. ننظر في مكوّنات الاستعلام المختلفة بمزيد من التفصيل. وقد قدّم فصلا SQL الأولان بالفعل <code>SELECT</code> و<code>FROM</code> و<code>WHERE</code> و<code>GROUP BY</code> و<code>HAVING</code> و<code>ORDER BY</code>. وحان الآن وقت التعمق قليلًا في هذه الجمل.</p>
<p>في هذا الفصل، سننظر في بعض ميزات <code>SELECT</code>. وكمثال، سنستخدم نسخة موسّعة من جدول &quot;course&quot; المستخدم في <a href="/arabic-cs-library/book/database-foundations/sql-intro/index">فصل SQL التمهيدي</a>. <em>هذا نص عملي. القراءة جيدة، والفعل أجود. جرّب الأشياء وأنجز التمارين.</em></p>
<p>في هذا الفصل نستخدم مخططًا بسيطًا بجدول واحد فقط. ويقابل هذا المخطط النموذج المفاهيمي (conceptual model) التالي:</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-select-0-opo_conceptueel.webp" alt=""></p>
<p>ولنوع الكيان &quot;Course&quot; ثماني خواص. والخاصية &quot;Code&quot; هي الخاصية المفتاحية.</p>
<p>يمكنك إيجاد جدول &quot;course&quot; في المخطط &quot;ucllcatalogue&quot; في قاعدة البيانات &quot;df&quot;. ولإعداد هذا الجدول لك، اتخذنا الخطوات التالية (وسنعود إليها لاحقًا). وهذه الخطوات للتوضيح فقط. ولا يمكنك تنفيذها بنفسك لأنك لا تملك صلاحيات الكتابة في قاعدة البيانات &quot;df&quot;.</p>
<p>أفتح أداة استعلامات في قاعدة البيانات &quot;df&quot; وأنفّذ هذه الشيفرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> SCHEMA ucllcatalogue;
</code></pre>
<p>وينبغي أن يتمكن جميع الزملاء والطلاب من الوصول إلى هذا المخطط:</p>
<pre><code>GRANT USAGE on schema ucllcatalogue to student;
GRANT USAGE on schema ucllcatalogue to lector;
</code></pre>
<p>وبعد ذلك، أنشئ جدول &quot;course&quot;:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> ucllcatalogue.course (
  code <span class="hljs-type">char</span>(<span class="hljs-number">6</span>) <span class="hljs-keyword">NOT NULL</span> ,
  credits <span class="hljs-type">smallint</span> <span class="hljs-keyword">NOT NULL</span> ,
  name <span class="hljs-type">varchar</span>(<span class="hljs-number">100</span>) <span class="hljs-keyword">NOT NULL</span> ,
  start_date <span class="hljs-type">date</span> <span class="hljs-keyword">NOT NULL</span> ,
  end_date <span class="hljs-type">date</span> ,
  <span class="hljs-keyword">language</span> <span class="hljs-type">char</span>(<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span> ,
  semester <span class="hljs-type">smallint</span> <span class="hljs-keyword">NOT NULL</span> ,
  coordinator <span class="hljs-type">char</span>(<span class="hljs-number">8</span>) <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-keyword">CONSTRAINT</span> pk_course_code <span class="hljs-keyword">PRIMARY KEY</span> ( code )
);
</code></pre>
<p>وينبغي منح الجميع صلاحيات SELECT. ولا ينبغي أن يتمكن الطلاب من تعديل هذا الجدول أو حذف صفوفه أو تحديثها ونحو ذلك. لذا تقتصر الأذونات على SELECT فقط:</p>
<pre><code>grant select on all tables in schema ucllcatalogue to student;
grant select on all tables in schema ucllcatalogue to lector;
</code></pre>
<p>وأخيرًا، أُضيف 21 صفًا عبر استيراد ملف .CSV. وكان يمكن فعل ذلك بـ <code>INSERT INTO</code> أيضًا بالطبع.</p>
<h2 id="طلب-شيء-ما">طلب شيء ما</h2>
<p>بـ <code>SELECT</code> يمكنك طلب شيء من خادم قاعدة بيانات. وقد يكون ذلك حتى حسابًا صغيرًا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-number">3</span><span class="hljs-operator">*</span><span class="hljs-number">4</span>; <span class="hljs-comment">-- gives 12</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">sqrt</span>(<span class="hljs-number">200</span>); <span class="hljs-comment">-- returns the root of 200, i.e., 14,142....</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-literal">TRUE</span> <span class="hljs-keyword">AND</span> <span class="hljs-literal">FALSE</span>; <span class="hljs-comment">-- result is FALSE</span>
</code></pre>
<p>من السخف قليلًا استخدام خادم قاعدة بيانات كآلة حاسبة، لكن يمكن فعل ذلك.</p>
<p>يمكنك استخدام دوال رياضية في SQL (فكّر في دوال آلتك الحاسبة مثل sin وcos...). وفوق مثال واحد: <code>SELECT sqrt(200)</code> يعيد الجذر التربيعي لـ 200. وابحث عن دالة SQL التي تستخدمها لتقريب عدد إلى أعلى. ومن المصادر الجيدة لذلك <a href="https://www.postgresql.org/docs/current/functions-math.html">https://www.postgresql.org/docs/current/functions-math.html</a>.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">ceil</span>(<span class="hljs-number">2.1</span>) <span class="hljs-comment">-- gives: 3</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">ceiling</span>(<span class="hljs-number">2.1</span>) <span class="hljs-comment">-- alternative, does exactly the same thing</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">ceil</span>(<span class="hljs-number">-2.1</span>) <span class="hljs-comment">-- gives: -2 (careful with negative numbers: -2 &gt; -2.1)</span>
</code></pre>
<h2 id="تحديد-الأعمدة">تحديد الأعمدة</h2>
<p>ما يهمنا أكثر هو استخراج المعلومات من البيانات المخزّنة في قاعدة بيانات. وقد فعلنا ذلك بالفعل في الأمثلة التمهيدية، لذا يمكننا الإيجاز هنا.</p>
<p>باستخدام <code>*</code> يمكنك تحديد <em>جميع</em> أعمدة الجدول:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>يبدأ خادم قاعدة البيانات العمل من جملة <code>FROM</code>. ويُحمَّل جدول &quot;course&quot; بأكمله في ذاكرة عمل الخادم. ثم ينظر الخادم في جملة <code>SELECT</code>. وتشير النجمة <code>*</code> إلى أنه ينبغي عرض جميع الأعمدة.</p>
<p>افترض أننا نريد رؤية العمودين الخاصين بالاسم والفصل الدراسي الذي دُرِّس فيه فقط. ويمكن فعل ذلك كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, semester
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h2 id="اسم-مستعار-لاسم-عمود">اسم مستعار لاسم عمود</h2>
<p>أحيانًا تريد <em>ترويسات أخرى</em> لعمود معروض. افترض أننا نشغّل الاستعلام التالي للحصول على ملخص لتاريخ البداية عندما دُرِّس كل مقرر أول مرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, start_date
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>ستكون ترويسة العمود الثاني &quot;start_date&quot;. وربما تفضّل كلمة &quot;start&quot; عنوانًا للعمود؟ ويمكن فعل ذلك بسهولة بالغة بـ<em>اسم مستعار</em>. وتمنحه باستخدام كلمة <code>AS</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, start_date <span class="hljs-keyword">AS</span> <span class="hljs-keyword">start</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>واحترس إذا استخدمت عدة <em>كلمات بينها مسافة</em>. فعندئذ يجب أن تُحيط هذا الاسم المستعار بـ<em>علامات اقتباس مزدوجة</em> هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, start_date <span class="hljs-keyword">AS</span> &quot;start date&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>ومن الأمور المثيرة للاهتمام والمصادر المشكلات في SQL استخدام علامات الاقتباس المفردة والمزدوجة:</p>
<ul>
<li>تُستخدم علامات الاقتباس المفردة ('...') في SQL للسلاسل أو التواريخ.</li>
<li>وتُحجز علامات الاقتباس المزدوجة (&quot;...&quot;) لأسماء (وتُسمّى المعرّفات) الجداول والمخططات والأسماء المستعارة التي تحتوي محارف خاصة (مثل مسافة أو شرطة...). وهناك أدوات (مثل DBSchema، <a href="/arabic-cs-library/book/database-foundations/sql-dbschema/index">انظر لاحقًا</a>) تُحيط في الشيفرة التي تولّدها أسماء الجداول والمخططات دائمًا بعلامات اقتباس مزدوجة.</li>
</ul>
<p>مزيد من المعلومات مثلًا في <a href="https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules">https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules</a></p>
<h2 id="إنشاء-أعمدة-جديدة">إنشاء أعمدة جديدة</h2>
<p>لا يلزمك الاقتصار على الأعمدة الموجودة بالفعل في الجداول عند كتابة الاستعلامات. فمن الممكن تحديد أعمدة جديدة في <code>SELECT</code> غير موجودة في جدول.</p>
<h3 id="نص-أو-عدد-ثابت">نص أو عدد ثابت</h3>
<p>إذا وضعت سلسلة أو عددًا كعمود، فسيتكرر ذلك لكل صف في الناتج.</p>
<p>صِف نتيجة الاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, <span class="hljs-string">&#x27;Applied Computer Science&#x27;</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h4>الحل</h4>
<p>تحصل على نظرة عامة على جميع صفوف الجدول مع رمز المقرر واسمه، وعمود جديد &quot;Applied Computer Science&quot; يتكرر لكل صف.</p>
<p>عدّل الشيفرة من التمرين السابق بحيث تُستخدم كلمة &quot;course&quot; فوق العمود ذي النص المتكرر &quot;Applied Computer Science&quot; كترويسة للعمود. ثم عدّل الاستعلام بحيث تُظهر ترويسة العمود &quot;Course Proximus&quot;.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, <span class="hljs-string">&#x27;Applied Computer Science&#x27;</span> <span class="hljs-keyword">AS</span> course
<span class="hljs-keyword">FROM</span> course
 
<span class="hljs-comment">-- version 2 with spaces in the header</span>
<span class="hljs-keyword">SELECT</span> code, name, <span class="hljs-string">&#x27;Applied Computer Science&#x27;</span> <span class="hljs-keyword">AS</span> &quot;Course Proximus&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h3 id="الحساب">الحساب</h3>
<p>تقابل النقطة الواحدة نحو 25 ساعة عمل، بما في ذلك كل شيء (حضور الصفوف والدراسة وإنجاز الواجبات والاستعداد للامتحانات وأداء الامتحان...). وينشئ الاستعلام التالي عمودًا جديدًا &quot;work hours&quot; بناءً على عمود نقاط الدراسة الحالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits <span class="hljs-operator">*</span> <span class="hljs-number">25</span> <span class="hljs-keyword">AS</span> &quot;work hours&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>احذف <code>AS work hours</code> من الاستعلام أعلاه لترى ما تصبح عليه ترويسة العمود الافتراضية (القبيحة).</p>
<h3 id="دمج-السلاسل">دمج السلاسل</h3>
<p>يمكنك دمج عدة أعمدة في عمود واحد. ومن المفيد لمرشدي الطلاب أن يتبع اسم المقرر دائمًا عدد النقاط بين قوسين، مثل &quot;Database Foundations (6)&quot;.</p>
<p>ويتيح لك محرف الأنبوب المزدوج (<code>||</code>) وضع أعمدة نصية بعضها بجانب بعض. ويمكن تحقيق التركيبة المطلوبة من الاسم والنقاط بالاستعلام التالي. وانتبه إلى الفرق بين علامات الاقتباس المفردة والمزدوجة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; (&#x27;</span> <span class="hljs-operator">||</span> credits <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;)&#x27;</span> <span class="hljs-keyword">AS</span> &quot;Course Name (credits)&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h3 id="دوال-السلاسل">دوال السلاسل</h3>
<p>لنلقِ نظرة سريعة على توثيق PostgreSQL الرائع. فهو شامل جدًا. وفي بعض الأسئلة عن دوال SQL، سيقترح المحاضرون عليك البحث عن الإجابة في التوثيق بنفسك. فـ<a href="https://en.wikipedia.org/wiki/RTFM">اقرأ الدليل الملعون</a> إذن!</p>
<p>أبدأ عادةً من صفحة الفهرس <a href="https://www.postgresql.org/docs/current/bookindex.html">https://www.postgresql.org/docs/current/bookindex.html</a>. وعند حرف S في string أجد عددًا من الإحالات إلى <a href="https://www.postgresql.org/docs/current/functions-string.html">https://www.postgresql.org/docs/current/functions-string.html</a>. تصفّح القائمة الطويلة من الميزات. ونعطي أدناه مثالين على دوال السلاسل.</p>
<h4>التبديل بين الحروف الكبيرة والصغيرة</h4>
<p>تتيح لك الدالتان <code>lower()</code> و<code>upper()</code> التبديل بين الحروف الصغيرة والكبيرة (انظر الصورة أدناه لمعرفة <a href="https://en.wikipedia.org/wiki/Letter_case">أصل</a> هذين التعيينين). وخصوصًا إذا أردنا البحث في الفصل التالي عن سلاسل (في جملة <code>WHERE</code>)، فغالبًا ما يكون الخيار الآمن تحويل كل شيء إلى حروف صغيرة أولًا لأن <em>السلاسل في SQL حساسة لحالة الأحرف</em>. فالسلسلة 'Van Hee' ليست نفسها 'Van hee'.</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-select-1-letterkast.webp" alt=""> صورة: الحروف الأكثر استخدامًا (أي الحروف الصغيرة) في الدرج السفلي، والأقل استخدامًا (الحروف الكبيرة) في الدرج العلوي. ويعرض الاستعلام التالي جميع أسماء المقررات بحروف صغيرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, <span class="hljs-built_in">lower</span>(name)
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h4>السلسلة الفرعية</h4>
<p>عملية أساسية ثانية مع السلاسل هي <em>تحديد جزء من السلسلة</em>. ويمكن فعل ذلك بالدالة <code>substring()</code>. ويعيد الاستعلام التالي الجزء الرقمي فقط من رمز المحاضر (العمود 'coordinator')، أي دون حرف 'u':</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, <span class="hljs-built_in">substring</span>(coordinator <span class="hljs-keyword">from</span> <span class="hljs-number">2</span>) <span class="hljs-comment">-- start at letter 2 to the end</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>ربما لاحظت بالفعل أن جميع رموز المقررات تبدأ بـ 'MBI' (في برنامج BCS على أي حال). وجميع المحاضرين لهم رقم يبدأ بـ 'u'. اكتب استعلامًا يعرض رمز المقرر والمنسّق، لكن دون الحرف (أو الحروف) الأولية التي تتكرر دائمًا. وانتبه إلى ترويسات الأعمدة!</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-select-2-zonderbeginletters.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">substring</span>(code <span class="hljs-keyword">from</span> <span class="hljs-number">4</span>) <span class="hljs-keyword">AS</span> &quot;short code&quot;,
  <span class="hljs-built_in">substring</span>(coordinator <span class="hljs-keyword">from</span> <span class="hljs-number">2</span>) <span class="hljs-keyword">AS</span> &quot;coordinator(shortened)&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h3 id="case">CASE</h3>
<p>افترض: بدلًا من عمود النقاط، نريد فقط عرض عمود يُظهر القيم 'small' (للمقررات ذات 4 نقاط أو أقل)، و'medium' (للمقررات ذات 5 أو 6 نقاط)، و'large' للمقررات ذات أكثر من 6 نقاط. وسيُبنى ذلك العمود على عمود 'credits' وسيُنشأ ببنية <code>CASE</code>.</p>
<p>ونرجع إلى التوثيق. وعبر صفحة الفهرس نجد 'CASE: conditional expressions' في الصفحة <a href="https://www.postgresql.org/docs/current/functions-conditional.html">https://www.postgresql.org/docs/current/functions-conditional.html</a>. وستجد البنية التالية (وأمثلة عليها) هنا:</p>
<pre><code>CASE
  WHEN condition THEN result
  [WHEN ...]
  [ELSE result]
END
</code></pre>
<p>وبتطبيق ذلك على الاستعلام المطلوب، نحصل على الاستعلام الممكن التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> credits <span class="hljs-operator">&lt;=</span> <span class="hljs-number">4</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;small&#x27;</span>
    <span class="hljs-keyword">WHEN</span> credits <span class="hljs-operator">&lt;=</span> <span class="hljs-number">6</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;medium&#x27;</span> <span class="hljs-comment">-- checking &gt; 4 not necessary</span>
    <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;large&#x27;</span>
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> size
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>فأول شرط يتحقق يؤدي إلى إسناد قيمة في العمود. وتُتخطى بقية السطور في <code>CASE</code> حينئذ. ولاحظ أيضًا أننا نستخدم اسمًا مستعارًا (<code>AS</code>) لأنه لولا ذلك لأظهرت ترويسة العمود 'case' فقط.</p>
<p><em>المسافات البيضاء</em> (الإزاحة بعلامات الجدولة أو المسافات) ليست مهمة لخادم قاعدة البيانات، لكنها <em>مهمة للأشخاص الذين عليهم قراءة شيفرتك</em> (مثل المحاضرين الذين يصححون واجباتك).</p>
<p>المقررات التي ليس لها تاريخ انتهاء تُسمّى مقررات 'new' في مقابل المقررات 'old' التي لم تعد تُدرَّس ولها تاريخ انتهاء في جدولنا. اكتب الاستعلام الذي يولّد نتيجة الشكل أدناه. هل نحتاج إلى قول المزيد؟ لاحظ ترويسات الأعمدة...</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-select-3-oudnieuw.webp" alt="عمود جديد يحوي النص old أو new"></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, code,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> end_date <span class="hljs-keyword">is</span> <span class="hljs-keyword">null</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;new&#x27;</span>
    <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;old&#x27;</span>
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> &quot;old or new&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h2 id="distinct">DISTINCT</h2>
<p>اسرد جميع اللغات الممكنة المستخدمة في المقررات. والاستعلام لذلك ليس صعبًا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">language</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>يحتوي الناتج على عدد من الصفوف بعدد صفوف الجدول. وهذا ليس ما نريده فعلًا. ولتجنّب <em>التكرار</em> استخدم <code>DISTINCT</code> بعد كلمة <code>SELECT</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">DISTINCT</span> <span class="hljs-keyword">language</span>
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>تنبيه: يجب أن يكون <em>كامل</em> تركيب جميع الأعمدة التي تأتي بعد كلمة <code>DISTINCT</code> مختلفًا. عدّل الاستعلام إلى:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">DISTINCT</span> <span class="hljs-keyword">language</span>, coordinator
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>نحصل الآن على صفوف أكثر مما قبل، لكن أقل من العدد الكامل للصفوف لأن بعض المنسّقين لهم عدة مقررات باللغة نفسها. فمثلًا، تحقق في الجدول الأصلي من أن المنسّق 'u0012047' يظهر ثلاث مرات باللغة الهولندية. فتركيب اللغة والمنسّق هو نفسه ثلاث مرات. وباستخدام الكلمة المفتاحية <code>DISTINCT</code> سيُعرض هذا الصف مرة واحدة فقط.</p>
<p>أنشئ قائمة بكل محاضر وعدد نقاط كل مقرر لكل مقرر. وأحصِ كم صفًا يوجد فيها. ثم تأكد من عدم وجود مكررات في هذه القائمة، أي إذا كان المحاضر 'u0012047' يدرّس مقررين بـ 6 نقاط، فينبغي أن يظهر هذا الصف في القائمة مرة واحدة فقط.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-comment">-- the list without duplicates (for the full list remove distinct)</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">distinct</span> coordinator, credits
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<h2 id="العمل-بالتواريخ">العمل بالتواريخ</h2>
<p>نوع البيانات <code>date</code> مهم جدًا في قاعدة بيانات. وهناك عشرات الدوال التي يمكنها معالجة تاريخ. وسننظر في بعضها فقط هنا. علاوة على ذلك، لا يوجد نوع بيانات <code>date</code> فقط، بل أيضًا <code>timestamp</code> و<code>time</code> و<code>interval</code> (انظر التوثيق في <a href="https://www.postgresql.org/docs/current/datatype-datetime.html">https://www.postgresql.org/docs/current/datatype-datetime.html</a>).</p>
<p>وفي الوقت الحالي، نقتصر على نوع البيانات <code>date</code>. ويقدّم <a href="https://www.postgresql.org/docs/current/functions-datetime.html">التوثيق</a> نظرة عامة على دوال <code>date/time</code> التي توفّرها PostgreSQL.</p>
<h3 id="استخراج-من">استخراج … من</h3>
<p>يحتوي التاريخ على السنة والشهر واليوم. ويضم الوقت إضافة إلى ذلك الساعات والدقائق والثواني... وبالدالة <a href="https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT"><code>EXTRACT</code></a> يمكنك استخراج جزء من تاريخ (أو وقت). ومثال صغير من قائمة المقررات لتوضيح ذلك:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, <span class="hljs-built_in">EXTRACT</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">FROM</span> start_date) <span class="hljs-keyword">AS</span> &quot;start academic year&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>يعرض هذا الاستعلام قائمة بجميع المقررات مع الرمز والسنة التي دُرِّس فيها المقرر أول مرة. وقائمة الاحتمالات واسعة جدًا: month وweek وday وhour... (انظر <a href="https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT">التوثيق</a>).</p>
<h3 id="الحساب-بالتواريخ">الحساب بالتواريخ</h3>
<p>يمكنك زيادة تاريخ أو إنقاصه بعدد صحيح، وطرح التواريخ بعضها من بعض، ونحو ذلك (<a href="https://www.postgresql.org/docs/current/functions-datetime.html">التوثيق</a>).</p>
<h4>مثال 1: طرح التواريخ بعضها من بعض</h4>
<p>يحسب الاستعلام التالي لكل مقرر عدد الأيام التي سيدوم فيها أو دام. وبالطبع، إذا لم نعرف تاريخ الانتهاء، فلا يمكن حساب النتيجة وتحصل على القيمة <code>NULL</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, end_date <span class="hljs-operator">-</span> start_date <span class="hljs-keyword">AS</span> &quot;number of days&quot;
<span class="hljs-keyword">FROM</span> course;
</code></pre>
<p>ويبدو أن المقرر ذا الرمز 'MBI68A' هو المقرر الأطول مدة: 5477 يومًا.</p>
<h4>مثال 2: الدالتان age() وnow()</h4>
<p>يعرض مثال ثانٍ دالتين: <code>age()</code> و<code>now()</code>. كم عمري اليوم إذا وُلدت في 7 مايو 1967؟</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> age(now(),<span class="hljs-string">&#x27;1967-05-07&#x27;</span>);
<span class="hljs-comment">-- alternative is: SELECT age(CURRENT_DATE, &#x27;1967-05-07&#x27;);</span>
<span class="hljs-comment">-- second alternative: SELECT age(timestamp &#x27;1967-05-07&#x27;);</span>
</code></pre>
<h2 id="تغيير-نوع-البيانات">تغيير نوع البيانات</h2>
<p>من المشكلات الكلاسيكية في لغات البرمجة ذات الأنواع <em>تحويل قيمة إلى نوع بيانات آخر</em>. فأنت تريد جمع عدد صحيح مع عدد عشري، أو تحويل عدد إلى سلسلة... وفي الإنجليزية يُسمّى هذا الإجراء 'to cast'.</p>
<p>كان المثال الأخير في القسم السابق، الذي حُسب فيه العمر، مثالًا على <em>تحويل تلقائي</em>. ووفق التوثيق الذي أشرنا إليه بضع مرات، تعمل الدالة <code>age()</code> في النسخة الأولى من الاستعلام على <code>timestamp</code>ين اثنين. غير أننا كتبنا <code>age(now(),‘1967-05-07’)</code>. فالدالة <code>now()</code> تعيد <code>timestamp</code>، لكن الوسيط الثاني ('1967-05-07') هو <code>date</code> وليس <code>timestamp</code>. غير أن PostgreSQL سيحوّل هذا الـ <code>date</code> بصمت إلى <code>timestamp</code> (باتخاذ منتصف الليل وقتًا).</p>
<h3 id="cast-as">CAST … AS</h3>
<p>لكن كثيرًا ما يتعيّن عليك إجراء التحويل بنفسك. ويمكن فعل ذلك بنوعين من الصيغة: إما بالدالة <code>CAST(... AS ...)</code>، وإما بالتدوين <code>::</code>. ونعطي بعض الأمثلة البسيطة:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- cast a string to an integer</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-string">&#x27;123&#x27;</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">integer</span>);
<span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;123&#x27;</span>::<span class="hljs-type">integer</span>; <span class="hljs-comment">-- different notation, but does the same thing as the CAST</span>

<span class="hljs-comment">-- cast an integer to a numeric</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-number">1234</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">numeric</span>(<span class="hljs-number">8</span>,<span class="hljs-number">3</span>));
<span class="hljs-keyword">SELECT</span> <span class="hljs-number">1234</span>::<span class="hljs-type">numeric</span>(<span class="hljs-number">8</span>,<span class="hljs-number">3</span>); <span class="hljs-comment">-- different notation, but does the same thing</span>

<span class="hljs-comment">-- a number to a string</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-number">1234</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">char</span>(<span class="hljs-number">6</span>)); <span class="hljs-comment">-- generates the string &#x27;1234  &#x27;</span>
</code></pre>
<h3 id="tochar">TO_CHAR</h3>
<p>المثال الأخير أعلاه (عدد إلى سلسلة) غريب بعض الشيء. فعادةً تريد تحويل القيم في عمود إلى سلسلة <em>بصيغة معينة</em>، مثل تاريخ بالتدوين الأوروبي بشرطات مائلة بين اليوم والشهر والسنة. ولهذا توجد الدالة <code>TO_CHAR()</code> (<a href="https://www.postgresql.org/docs/current/functions-formatting.html">التوثيق</a>). وبعض الأمثلة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> TO_CHAR(<span class="hljs-type">date</span> <span class="hljs-string">&#x27;1967-05-07&#x27;</span>, <span class="hljs-string">&#x27;dd/mm/yyyy&#x27;</span>); <span class="hljs-comment">-- results: &#x27;07/05/1967&#x27;</span>
<span class="hljs-keyword">SELECT</span> TO_CHAR(<span class="hljs-type">date</span> <span class="hljs-string">&#x27;1967-05-07&#x27;</span>, <span class="hljs-string">&#x27;day dd month yyyy&#x27;</span>); <span class="hljs-comment">-- results: &#x27;sunday 07 may 1967&#x27;</span>
<span class="hljs-keyword">SELECT</span> TO_CHAR(<span class="hljs-number">148.5</span>, <span class="hljs-string">&#x27;9999.9999&#x27;</span>); <span class="hljs-comment">-- returns the string &#x27; 148.5000&#x27;</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,o as html,e as slug,p as title};
