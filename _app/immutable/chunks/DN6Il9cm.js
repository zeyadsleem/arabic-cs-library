const t="pgexercises",n="basic",s="Simple SQL Queries",d="index",e="استعلامات SQL بسيطة",r=[{depth:2,id:"1-استرجاع-كل-شيء-من-جدول",text:"1. استرجاع كل شيء من جدول"},{depth:2,id:"2-استرجاع-أعمدة-محددة-من-جدول",text:"2. استرجاع أعمدة محددة من جدول"},{depth:2,id:"3-التحكم-في-الصفوف-المسترجعة",text:"3. التحكم في الصفوف المسترجعة"},{depth:2,id:"4-التحكم-في-الصفوف-المسترجعة-الجزء-2",text:"4. التحكم في الصفوف المسترجعة — الجزء 2"},{depth:2,id:"5-عمليات-بحث-نصية-أساسية",text:"5. عمليات بحث نصية أساسية"},{depth:2,id:"6-المطابقة-مع-قيم-محتملة-متعددة",text:"6. المطابقة مع قيم محتملة متعددة"},{depth:2,id:"7-تصنيف-النتائج-في-فئات",text:"7. تصنيف النتائج في فئات"},{depth:2,id:"8-التعامل-مع-التواريخ",text:"8. التعامل مع التواريخ"},{depth:2,id:"9-إزالة-التكرار-وترتيب-النتائج",text:"9. إزالة التكرار وترتيب النتائج"},{depth:2,id:"10-دمج-نتائج-استعلامات-متعددة",text:"10. دمج نتائج استعلامات متعددة"},{depth:2,id:"11-تجميع-بسيط",text:"11. تجميع بسيط"},{depth:2,id:"12-مزيد-من-التجميع",text:"12. مزيد من التجميع"}],a=`<p>تتناول هذه الفئة أساسيات SQL. وتغطي عبارتي select وwhere، وتعبيرات case، وعمليات union، وبعض الأمور الأخرى المتنوعة. وإن كنت قد تعلمت SQL من قبل، فستجد هذه التمارين سهلة على الأرجح. وإن لم تكن قد تعلمتها، فستجد فيها نقطة انطلاق جيدة نحو الفئات الأكثر صعوبة المقبلة!</p>
<p>إن واجهت صعوبة في هذه الأسئلة، فأنصح بشدة بكتاب <a href="http://shop.oreilly.com/product/9780596007270.do">Learning SQL</a> لـ Alan Beaulieu، فهو كتاب موجز وجيد الكتابة في الموضوع. وإن كنت مهتمًا بأساسيات نظم قواعد البيانات (لا بمجرد كيفية استخدامها)، فابحث أيضًا في كتاب An Introduction to Database Systems لـ C.J. Date.</p>
<h2 id="1-استرجاع-كل-شيء-من-جدول">1. استرجاع كل شيء من جدول</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك استرجاع كل المعلومات من جدول cd.facilities؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>membercost</th>
<th>guestcost</th>
<th>initialoutlay</th>
<th>monthlymaintenance</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Tennis Court 1</td>
<td>5</td>
<td>25</td>
<td>10000</td>
<td>200</td>
</tr>
<tr>
<td>1</td>
<td>Tennis Court 2</td>
<td>5</td>
<td>25</td>
<td>8000</td>
<td>200</td>
</tr>
<tr>
<td>2</td>
<td>Badminton Court</td>
<td>0</td>
<td>15.5</td>
<td>4000</td>
<td>50</td>
</tr>
<tr>
<td>3</td>
<td>Table Tennis</td>
<td>0</td>
<td>5</td>
<td>320</td>
<td>10</td>
</tr>
<tr>
<td>4</td>
<td>Massage Room 1</td>
<td>35</td>
<td>80</td>
<td>4000</td>
<td>3000</td>
</tr>
<tr>
<td>5</td>
<td>Massage Room 2</td>
<td>35</td>
<td>80</td>
<td>4000</td>
<td>3000</td>
</tr>
<tr>
<td>6</td>
<td>Squash Court</td>
<td>3.5</td>
<td>17.5</td>
<td>5000</td>
<td>80</td>
</tr>
<tr>
<td>7</td>
<td>Snooker Table</td>
<td>0</td>
<td>5</td>
<td>450</td>
<td>15</td>
</tr>
<tr>
<td>8</td>
<td>Pool Table</td>
<td>0</td>
<td>5</td>
<td>400</td>
<td>15</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> cd.facilities;
</code></pre>
<p>عبارة SELECT هي الكتلة الأساسية التي تبدأ بها الاستعلامات (queries) التي تقرأ المعلومات من قاعدة البيانات. وتتكوّن عبارة select البسيطة عمومًا من select [مجموعة من الأعمدة (columns)] from [جدول (table) أو مجموعة جداول]. وفي هذه الحالة، نريد كل المعلومات من جدول facilities. قسم from سهل — كل ما نحتاج إليه هو تحديد جدول cd.facilities. و'cd' هو مخطط (schema) الجدول — وهو مصطلح يُستخدم لتجميع منطقي لمعلومات مترابطة في قاعدة البيانات. بعد ذلك، نحتاج إلى تحديد أننا نريد كل الأعمدة. ومن الملائم أن هناك اختصارًا يعني &quot;كل الأعمدة&quot; هو *. ويمكننا استخدامه بدلًا من تعداد كل أسماء الأعمدة بمشقة.</p>
<p><strong>تلميح:</strong> يمكن استخدام select * لاسترجاع كل الأعمدة من جدول.</p>
<h2 id="2-استرجاع-أعمدة-محددة-من-جدول">2. استرجاع أعمدة محددة من جدول</h2>
<p><strong>السؤال</strong></p>
<p>تريد طباعة قائمة بكل المرافق وتكلفتها للأعضاء. فكيف تسترجع قائمة تضم أسماء المرافق والتكاليف فقط؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>membercost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Tennis Court 1</td>
<td>5</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>5</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>0</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>0</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>35</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>35</td>
</tr>
<tr>
<td>Squash Court</td>
<td>3.5</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>0</td>
</tr>
<tr>
<td>Pool Table</td>
<td>0</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, membercost <span class="hljs-keyword">from</span> cd.facilities;
</code></pre>
<p>في هذا السؤال، نحتاج إلى تحديد الأعمدة التي نريدها. ويمكننا فعل ذلك بقائمة بسيطة من أسماء الأعمدة مفصولة بفواصل نحددها لعبارة select. وكل ما تفعله قاعدة البيانات هو النظر في الأعمدة المتاحة في عبارة FROM، وإعادة الأعمدة التي طلبناها، كما هو موضح أدناه</p>
<p><img src="/arabic-cs-library/images/pgexercises/basic-selectspecific-0-select.webp" alt="تحديد أسماء الأعمدة في عبارة SELECT"></p>
<p>وبوجه عام، يُستحسن في الاستعلامات غير العابرة أن تحدد أسماء الأعمدة التي تريدها في استعلاماتك بدلًا من استخدام *. لأن تطبيقك قد لا يستطيع التعامل مع الوضع إذا أُضيفت أعمدة أخرى إلى الجدول.</p>
<p><strong>تلميح:</strong> تتيح لك عبارة select تحديد أسماء الأعمدة التي تريد استرجاعها.</p>
<h2 id="3-التحكم-في-الصفوف-المسترجعة">3. التحكم في الصفوف المسترجعة</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة بالمرافق التي تتقاضى رسمًا من الأعضاء؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>membercost</th>
<th>guestcost</th>
<th>initialoutlay</th>
<th>monthlymaintenance</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Tennis Court 1</td>
<td>5</td>
<td>25</td>
<td>10000</td>
<td>200</td>
</tr>
<tr>
<td>1</td>
<td>Tennis Court 2</td>
<td>5</td>
<td>25</td>
<td>8000</td>
<td>200</td>
</tr>
<tr>
<td>4</td>
<td>Massage Room 1</td>
<td>35</td>
<td>80</td>
<td>4000</td>
<td>3000</td>
</tr>
<tr>
<td>5</td>
<td>Massage Room 2</td>
<td>35</td>
<td>80</td>
<td>4000</td>
<td>3000</td>
</tr>
<tr>
<td>6</td>
<td>Squash Court</td>
<td>3.5</td>
<td>17.5</td>
<td>5000</td>
<td>80</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> cd.facilities <span class="hljs-keyword">where</span> membercost <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>;
</code></pre>
<p>تُستخدم عبارة FROM لبناء مجموعة من الصفوف (rows) المرشّحة التي نقرأ منها النتائج. وفي أمثلتنا حتى الآن، كانت هذه المجموعة من الصفوف مجرد محتوى جدول. وسنستكشف لاحقًا الربط، الذي يتيح لنا إنشاء مرشّحين أكثر إثارة للاهتمام. وبعد أن نبني مجموعة الصفوف المرشّحة، تتيح لنا عبارة WHERE تصفية الصفوف التي تهمنا — في هذه الحالة، الصفوف التي تكون فيها قيمة membercost أكبر من صفر. وكما سترى في تمارين لاحقة، يمكن أن تحتوي عبارات WHERE على مكونات متعددة تُدمج بالمنطق البولياني (boolean) — فيمكن، مثلًا، البحث عن المرافق التي تكون تكلفتها أكبر من 0 وأصغر من 10. ويوضح ما يلي فعل التصفية الذي تجريه عبارة WHERE على جدول facilities: <img src="/arabic-cs-library/images/pgexercises/basic-where-0-whereclause.webp" alt="أثر عبارة WHERE على مجموعة الصفوف المرشّحة"></p>
<p><strong>تلميح:</strong> تتيح لك عبارة WHERE تصفية الصفوف التي تريد استرجاعها.</p>
<h2 id="4-التحكم-في-الصفوف-المسترجعة-الجزء-2">4. التحكم في الصفوف المسترجعة — الجزء 2</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة بالمرافق التي تتقاضى رسمًا من الأعضاء، ويكون هذا الرسم أقل من 1/50 من تكلفة الصيانة الشهرية؟ أرجع facid واسم المرفق وتكلفة الأعضاء والصيانة الشهرية للمرافق المعنية.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>membercost</th>
<th>monthlymaintenance</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td>Massage Room 1</td>
<td>35</td>
<td>3000</td>
</tr>
<tr>
<td>5</td>
<td>Massage Room 2</td>
<td>35</td>
<td>3000</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, name, membercost, monthlymaintenance 
	<span class="hljs-keyword">from</span> cd.facilities 
	<span class="hljs-keyword">where</span> 
		membercost <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> 
		(membercost <span class="hljs-operator">&lt;</span> monthlymaintenance<span class="hljs-operator">/</span><span class="hljs-number">50.0</span>);
</code></pre>
<p>تتيح لنا عبارة WHERE تصفية الصفوف التي تهمنا — في هذه الحالة، الصفوف التي تكون فيها قيمة membercost أكبر من صفر وأقل من 1/50 من تكلفة الصيانة الشهرية. وكما ترى، فإن تشغيل غرف التدليك مكلف جدًا بسبب تكاليف الموظفين!</p>
<p>وعندما نريد اختبار شرطين أو أكثر، نستخدم AND لدمجها. ويمكننا، كما قد تتوقع، استخدام OR لاختبار ما إذا كان أحد الشرطين صحيحًا. وقد لاحظت أن هذا أول استعلام لدينا يجمع بين عبارة WHERE واختيار أعمدة محددة. ويمكنك أن ترى في الصورة أدناه أثر ذلك: تقاطع الأعمدة المحددة والصفوف المحددة يعطينا البيانات التي سنعيدها. وقد لا يبدو هذا مثيرًا للاهتمام الآن، لكنك سترى أناقته البسيطة حين نضيف عمليات أكثر تعقيدًا مثل الربط لاحقًا.</p>
<p><img src="/arabic-cs-library/images/pgexercises/basic-where2-0-whereandselect.webp" alt="تحديد أسماء الأعمدة في عبارة SELECT"></p>
<p><strong>تلميح:</strong> تتيح لك عبارة WHERE تصفية الصفوف التي تريد استرجاعها.</p>
<h2 id="5-عمليات-بحث-نصية-أساسية">5. عمليات بحث نصية أساسية</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة بكل المرافق التي تحتوي أسماؤها على كلمة 'Tennis'؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>membercost</th>
<th>guestcost</th>
<th>initialoutlay</th>
<th>monthlymaintenance</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Tennis Court 1</td>
<td>5</td>
<td>25</td>
<td>10000</td>
<td>200</td>
</tr>
<tr>
<td>1</td>
<td>Tennis Court 2</td>
<td>5</td>
<td>25</td>
<td>8000</td>
<td>200</td>
</tr>
<tr>
<td>3</td>
<td>Table Tennis</td>
<td>0</td>
<td>5</td>
<td>320</td>
<td>10</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span>
	<span class="hljs-keyword">from</span> cd.facilities 
	<span class="hljs-keyword">where</span> 
		name <span class="hljs-keyword">like</span> <span class="hljs-string">&#x27;%Tennis%&#x27;</span>;
</code></pre>
<p>توفّر عبارة LIKE في SQL مطابقة أنماط (pattern matching) بسيطة على النصوص. وهي مُنفَّذة على نحو شبه شامل، وهي بسيطة وجميلة الاستخدام — فهي تأخذ نصًا يكون فيه المحرف % مطابقًا لأي نص، و_ مطابقًا لأي محرف واحد. وفي هذه الحالة، نبحث عن أسماء تحتوي كلمة 'Tennis'، لذا فإن وضع % على الجانبين يفي بالغرض.</p>
<p>وهناك طرق أخرى لإنجاز هذه المهمة: فيدعم Postgres التعبيرات النمطية (regular expressions) بالمُعامل ~، على سبيل المثال. استخدم ما يريحك، لكن اعلم أن مُعامل LIKE أكثر قابلية للنقل بين الأنظمة بكثير.</p>
<p><strong>تلميح:</strong> جرّب البحث عن مُعامل LIKE في SQL.</p>
<h2 id="6-المطابقة-مع-قيم-محتملة-متعددة">6. المطابقة مع قيم محتملة متعددة</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك استرجاع تفاصيل المرفقين ذوي المعرّفين 1 و5؟ حاول فعل ذلك دون استخدام المُعامل OR.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>membercost</th>
<th>guestcost</th>
<th>initialoutlay</th>
<th>monthlymaintenance</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Tennis Court 2</td>
<td>5</td>
<td>25</td>
<td>8000</td>
<td>200</td>
</tr>
<tr>
<td>5</td>
<td>Massage Room 2</td>
<td>35</td>
<td>80</td>
<td>4000</td>
<td>3000</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span>
	<span class="hljs-keyword">from</span> cd.facilities 
	<span class="hljs-keyword">where</span> 
		facid <span class="hljs-keyword">in</span> (<span class="hljs-number">1</span>,<span class="hljs-number">5</span>);
</code></pre>
<p>الجواب البديهي لهذا السؤال هو استخدام عبارة WHERE على صورة where facid = 1 or facid = 5. والبديل الأسهل عند وجود أعداد كبيرة من المطابقات المحتملة هو مُعامل IN. يأخذ مُعامل IN قائمة بالقيم المحتملة، ويطابقها مع (في هذه الحالة) facid. وإن تطابقت إحدى القيم، كانت عبارة where صحيحة لذلك الصف، وأُعيد الصف. ومُعامل IN برهان مبكّر جيد على أناقة النموذج العلائقي. فالمعامل الذي يأخذه ليس مجرد قائمة قيم — بل هو في الحقيقة جدول بعمود واحد. ولأن الاستعلامات تُعيد جداول أيضًا، فإنك إن أنشأت استعلامًا يُعيد عمودًا واحدًا، أمكنك تمرير نتائجه إلى مُعامل IN. ولإعطاء مثال مبسّط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> 
	<span class="hljs-keyword">from</span> cd.facilities
	<span class="hljs-keyword">where</span>
		facid <span class="hljs-keyword">in</span> (
			<span class="hljs-keyword">select</span> facid <span class="hljs-keyword">from</span> cd.facilities
			);
</code></pre>
<p>هذا المثال مكافئ وظيفيًا لاختيار كل المرافق فقط، لكنه يوضح لك كيفية تمرير نتائج استعلام إلى آخر. ويسمى الاستعلام الداخلي <em>استعلامًا فرعيًا</em> (subquery).</p>
<p><strong>تلميح:</strong> جرّب البحث عن مُعامل IN في SQL.</p>
<h2 id="7-تصنيف-النتائج-في-فئات">7. تصنيف النتائج في فئات</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة بالمرافق، بحيث يُوصَف كل مرفق بأنه 'cheap' أو 'expensive' بحسب ما إذا كانت تكلفة صيانته الشهرية تزيد على 100 دولار؟ أرجع اسم المرفق وصيانته الشهرية للمرافق المعنية.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>Tennis Court 1</td>
<td>expensive</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>expensive</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>cheap</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>cheap</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>expensive</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>expensive</td>
</tr>
<tr>
<td>Squash Court</td>
<td>cheap</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>cheap</td>
</tr>
<tr>
<td>Pool Table</td>
<td>cheap</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, 
	<span class="hljs-keyword">case</span> <span class="hljs-keyword">when</span> (monthlymaintenance <span class="hljs-operator">&gt;</span> <span class="hljs-number">100</span>) <span class="hljs-keyword">then</span>
		<span class="hljs-string">&#x27;expensive&#x27;</span>
	<span class="hljs-keyword">else</span>
		<span class="hljs-string">&#x27;cheap&#x27;</span>
	<span class="hljs-keyword">end</span> <span class="hljs-keyword">as</span> cost
	<span class="hljs-keyword">from</span> cd.facilities;
</code></pre>
<p>يحتوي هذا التمرين على بضعة مفاهيم جديدة. الأول هو أننا نجري حسابًا في المنطقة الواقعة بين SELECT وFROM في الاستعلام. وقد استخدمناها سابقًا فقط لاختيار الأعمدة التي نريد إعادتها، لكن يمكنك وضع أي شيء فيها ينتج نتيجة واحدة لكل صف مُعاد — بما في ذلك الاستعلامات الفرعية. والمفهوم الجديد الثاني هو عبارة CASE نفسها. وCASE تشبه فعليًا عبارات if/switch في لغات أخرى، بصورة كما هي مبينة في الاستعلام. ولإضافة خيار &quot;متوسط&quot;، نُدخل ببساطة قسم when...then آخر. وأخيرًا، هناك مُعامل AS. وهو يُستخدم ببساطة لوسم الأعمدة أو التعبيرات باسم مستعار (alias)، لجعل عرضها أجمل أو لتسهيل الإشارة إليها عند استخدامها كجزء من استعلام فرعي.</p>
<p><strong>تلميح:</strong> جرّب البحث عن عبارة CASE في SQL.</p>
<h2 id="8-التعامل-مع-التواريخ">8. التعامل مع التواريخ</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة بالأعضاء الذين انضموا بعد بداية سبتمبر 2012؟ أرجع memid وsurname وfirstname وjoindate للأعضاء المعنيين.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>memid</th>
<th>surname</th>
<th>firstname</th>
<th>joindate</th>
</tr>
</thead>
<tbody>
<tr>
<td>24</td>
<td>Sarwin</td>
<td>Ramnaresh</td>
<td>2012-09-01 08:44:42</td>
</tr>
<tr>
<td>26</td>
<td>Jones</td>
<td>Douglas</td>
<td>2012-09-02 18:43:05</td>
</tr>
<tr>
<td>27</td>
<td>Rumney</td>
<td>Henrietta</td>
<td>2012-09-05 08:42:35</td>
</tr>
<tr>
<td>28</td>
<td>Farrell</td>
<td>David</td>
<td>2012-09-15 08:22:05</td>
</tr>
<tr>
<td>29</td>
<td>Worthington-Smyth</td>
<td>Henry</td>
<td>2012-09-17 12:27:15</td>
</tr>
<tr>
<td>30</td>
<td>Purview</td>
<td>Millicent</td>
<td>2012-09-18 19:04:01</td>
</tr>
<tr>
<td>33</td>
<td>Tupperware</td>
<td>Hyacinth</td>
<td>2012-09-18 19:32:05</td>
</tr>
<tr>
<td>35</td>
<td>Hunt</td>
<td>John</td>
<td>2012-09-19 11:32:45</td>
</tr>
<tr>
<td>36</td>
<td>Crumpet</td>
<td>Erica</td>
<td>2012-09-22 08:36:38</td>
</tr>
<tr>
<td>37</td>
<td>Smith</td>
<td>Darren</td>
<td>2012-09-26 18:08:45</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> memid, surname, firstname, joindate 
	<span class="hljs-keyword">from</span> cd.members
	<span class="hljs-keyword">where</span> joindate <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-09-01&#x27;</span>;
</code></pre>
<p>هذه أول إطلالة لنا على الطوابع الزمنية (timestamps) في SQL. وهي منسّقة بترتيب تنازلي للمقدار: YYYY-MM-DD HH:MM:SS.nnnnnn. ويمكننا مقارنتها كما نقارن طابعًا زمنيًا يونيكسيًا، وإن كان الحصول على الفروق بين التواريخ أكثر تعقيدًا قليلًا (وأقوى!). وفي هذه الحالة، حدّدنا جزء التاريخ من الطابع الزمني فقط. فيحوّله postgres تلقائيًا إلى الطابع الزمني الكامل 2012-09-01 00:00:00.</p>
<p><strong>تلميح:</strong> ابحث عن صيغة الطابع الزمني (timestamp) في SQL، وتذكّر أنك تستطيع مقارنة التواريخ كثيرًا كما تقارن قيمًا صحيحة.</p>
<h2 id="9-إزالة-التكرار-وترتيب-النتائج">9. إزالة التكرار وترتيب النتائج</h2>
<p><strong>السؤال</strong></p>
<p>كيف يمكنك إنتاج قائمة مرتّبة بأول 10 أسماء عائلية في جدول members؟ ويجب ألا تحتوي القائمة على تكرارات.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bader</td>
</tr>
<tr>
<td>Baker</td>
</tr>
<tr>
<td>Boothe</td>
</tr>
<tr>
<td>Butters</td>
</tr>
<tr>
<td>Coplin</td>
</tr>
<tr>
<td>Crumpet</td>
</tr>
<tr>
<td>Dare</td>
</tr>
<tr>
<td>Farrell</td>
</tr>
<tr>
<td>GUEST</td>
</tr>
<tr>
<td>Genting</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-keyword">distinct</span> surname 
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> surname
limit <span class="hljs-number">10</span>;
</code></pre>
<p>هناك ثلاثة مفاهيم جديدة هنا، لكنها كلها بسيطة إلى حد كبير.</p>
<p><strong>تلميح:</strong> ابحث عن كلمات SQL المفتاحية DISTINCT وORDER BY وLIMIT.</p>
<h2 id="10-دمج-نتائج-استعلامات-متعددة">10. دمج نتائج استعلامات متعددة</h2>
<p><strong>السؤال</strong></p>
<p>تريد، لسبب ما، قائمة مدموجة تضم كل الأسماء العائلية وكل أسماء المرافق. نعم، هذا مثال متكلّف :-). أنتج تلك القائمة!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>Tennis Court 2</td>
</tr>
<tr>
<td>Worthington-Smyth</td>
</tr>
<tr>
<td>Badminton Court</td>
</tr>
<tr>
<td>Pinker</td>
</tr>
<tr>
<td>Dare</td>
</tr>
<tr>
<td>Bader</td>
</tr>
<tr>
<td>Mackenzie</td>
</tr>
<tr>
<td>Crumpet</td>
</tr>
<tr>
<td>Massage Room 1</td>
</tr>
<tr>
<td>Squash Court</td>
</tr>
<tr>
<td>Tracy</td>
</tr>
<tr>
<td>Hunt</td>
</tr>
<tr>
<td>Tupperware</td>
</tr>
<tr>
<td>Smith</td>
</tr>
<tr>
<td>Butters</td>
</tr>
<tr>
<td>Rownam</td>
</tr>
<tr>
<td>Baker</td>
</tr>
<tr>
<td>Genting</td>
</tr>
<tr>
<td>Purview</td>
</tr>
<tr>
<td>Coplin</td>
</tr>
<tr>
<td>Massage Room 2</td>
</tr>
<tr>
<td>Joplette</td>
</tr>
<tr>
<td>Stibbons</td>
</tr>
<tr>
<td>Rumney</td>
</tr>
<tr>
<td>Pool Table</td>
</tr>
<tr>
<td>Sarwin</td>
</tr>
<tr>
<td>Boothe</td>
</tr>
<tr>
<td>Farrell</td>
</tr>
<tr>
<td>Tennis Court 1</td>
</tr>
<tr>
<td>Snooker Table</td>
</tr>
<tr>
<td>Owen</td>
</tr>
<tr>
<td>Table Tennis</td>
</tr>
<tr>
<td>GUEST</td>
</tr>
<tr>
<td>Jones</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> surname 
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">union</span>
<span class="hljs-keyword">select</span> name
	<span class="hljs-keyword">from</span> cd.facilities;
</code></pre>
<p>يفعل مُعامل UNION ما قد تتوقعه: فهو يدمج نتائج استعلامَي SQL في جدول واحد. والتحفظ هو أنه يجب أن يكون لنتيجتي الاستعلامين العدد نفسه من الأعمدة وأنواع بيانات متوافقة. ويزيل UNION الصفوف المكررة، بخلاف UNION ALL. استخدم UNION ALL افتراضيًا، إلا إذا كانت النتائج المكررة تهمك.</p>
<p><strong>تلميح:</strong> ابحث عن كلمة SQL المفتاحية UNION</p>
<h2 id="11-تجميع-بسيط">11. تجميع بسيط</h2>
<p><strong>السؤال</strong></p>
<p>تريد الحصول على تاريخ تسجيل آخر عضو لديك. فكيف تسترجع هذه المعلومة؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>latest</th>
</tr>
</thead>
<tbody>
<tr>
<td>2012-09-26 18:08:45</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(joindate) <span class="hljs-keyword">as</span> latest
	<span class="hljs-keyword">from</span> cd.members;
</code></pre>
<p>هذه أول جولة لنا في الدوال التجميعية (aggregate functions) في SQL. وهي تُستخدم لاستخراج معلومات عن مجموعات كاملة من الصفوف، وتتيح لنا طرح أسئلة مثل:</p>
<p>الدالة التجميعية MAX هنا بسيطة جدًا: فهي تستقبل كل القيم الممكنة لـ joindate، وتُخرج أكبرها. وهناك قدر أكبر بكثير من قوة الدوال التجميعية، وستصادفه في تمارين لاحقة.</p>
<p><strong>تلميح:</strong> ابحث عن الدالة التجميعية MAX في SQL</p>
<h2 id="12-مزيد-من-التجميع">12. مزيد من التجميع</h2>
<p><strong>السؤال</strong></p>
<p>تريد الحصول على الاسم الأول والاسم العائلي لآخر عضو (أو أعضاء) سجّلوا — لا على التاريخ فقط. فكيف تفعل ذلك؟</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>firstname</th>
<th>surname</th>
<th>joindate</th>
</tr>
</thead>
<tbody>
<tr>
<td>Darren</td>
<td>Smith</td>
<td>2012-09-26 18:08:45</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> firstname, surname, joindate
	<span class="hljs-keyword">from</span> cd.members
	<span class="hljs-keyword">where</span> joindate <span class="hljs-operator">=</span> 
		(<span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(joindate) 
			<span class="hljs-keyword">from</span> cd.members);
</code></pre>
<p>في المقاربة المقترحة أعلاه، تستخدم <em>استعلامًا فرعيًا</em> لمعرفة أحدث joindate. وهذا الاستعلام الفرعي يُعيد جدولًا <em>قياسيًا</em> (scalar) — أي جدول بعمود واحد وصف واحد. ولأن لدينا قيمة واحدة فقط، يمكننا استبدال الاستعلام الفرعي في أي موضع نضع فيه قيمة ثابتة واحدة. وفي هذه الحالة، نستخدمه لإكمال عبارة WHERE في استعلام للعثور على عضو معيّن. وقد تأمل أن تتمكن من فعل شيء مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> firstname, surname, <span class="hljs-built_in">max</span>(joindate)
        <span class="hljs-keyword">from</span> cd.members
</code></pre>
<p>للأسف، هذا لا يعمل. فدالة MAX لا تقيّد الصفوف كما تفعل عبارة WHERE — إنها ببساطة تستقبل مجموعة من القيم وتُعيد أكبرها. فتبقى قاعدة البيانات حائرة في كيفية إقران قائمة طويلة من الأسماء بتاريخ الانضمام الواحد الذي خرج من دالة max، وتفشل. وبدلًا من ذلك، يبقى عليك القول 'أرني الصف أو الصفوف التي يكون تاريخ انضمامها مماثلًا لتاريخ الانضمام الأقصى'.</p>
<p>وكما ذُكر في التلميح، هناك طرق أخرى لإنجاز هذه المهمة — ومنها المثال التالي. في هذه المقاربة، بدلًا من إيجاد تاريخ آخر انضمام صراحةً، نرتّب جدول members تنازليًا بحسب تاريخ الانضمام، ونلتقط الأول. ولاحظ أن هذه المقاربة لا تغطي الاحتمال النادر جدًا بأن ينضم شخصان في الوقت نفسه بالضبط :-).</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> firstname, surname, joindate
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate <span class="hljs-keyword">desc</span>
limit <span class="hljs-number">1</span>;
</code></pre>
<p><strong>تلميح:</strong> قد تجد أنك تحتاج إلى استعلام فرعي لإنجاز ذلك — وإن كانت هناك طرق أخرى!</p>
`,p={book:t,chapter:n,chapterTitle:s,slug:d,title:e,headings:r,html:a};export{t as book,n as chapter,s as chapterTitle,p as default,r as headings,a as html,d as slug,e as title};
