const s="pgexercises",n="date",t="Working with Timestamps",a="index",p="التعامل مع الطوابع الزمنية",r=[{depth:2,id:"1-إنتاج-طابع-زمني-timestamp-للساعة-1-صباحا-في-31-أغسطس-2012",text:"1. إنتاج طابع زمني (timestamp) للساعة 1 صباحًا في 31 أغسطس 2012"},{depth:2,id:"2-طرح-الطوابع-الزمنية-من-بعضها",text:"2. طرح الطوابع الزمنية من بعضها"},{depth:2,id:"3-توليد-قائمة-بكل-التواريخ-في-أكتوبر-2012",text:"3. توليد قائمة بكل التواريخ في أكتوبر 2012"},{depth:2,id:"4-الحصول-على-يوم-الشهر-من-طابع-زمني",text:"4. الحصول على يوم الشهر من طابع زمني"},{depth:2,id:"5-حساب-عدد-الثواني-بين-طابعين-زمنيين",text:"5. حساب عدد الثواني بين طابعين زمنيين"},{depth:2,id:"6-حساب-عدد-الأيام-في-كل-شهر-من-أشهر-2012",text:"6. حساب عدد الأيام في كل شهر من أشهر 2012"},{depth:2,id:"7-حساب-عدد-الأيام-المتبقية-في-الشهر",text:"7. حساب عدد الأيام المتبقية في الشهر"},{depth:2,id:"8-حساب-وقت-انتهاء-الحجوزات",text:"8. حساب وقت انتهاء الحجوزات"},{depth:2,id:"9-إرجاع-عدد-الحجوزات-لكل-شهر",text:"9. إرجاع عدد الحجوزات لكل شهر"},{depth:2,id:"10-حساب-نسبة-الاستغلال-لكل-مرفق-بحسب-الشهر",text:"10. حساب نسبة الاستغلال لكل مرفق بحسب الشهر"}],d=`<p>تُعد التواريخ والأوقات في SQL موضوعًا معقدًا يستحق فئة خاصة به. وهي أيضًا قوية بشكل مذهل، وتجعل التعامل مع مفاهيم متغيرة الطول مثل &quot;الأشهر&quot; أسهل من كثير من لغات البرمجة.</p>
<p>وقبل البدء في هذه الفئة، يجدر على الأرجح إلقاء نظرة على <a href="http://www.postgresql.org/docs/current/static/functions-datetime.html">صفحة الوثائق</a> الخاصة بـ PostgreSQL عن دوال التاريخ والوقت. وقد تريد أيضًا إكمال فئة الدوال التجميعية (aggregate functions)، لأننا سنستخدم بعض تلك الإمكانات في هذا القسم.</p>
<h2 id="1-إنتاج-طابع-زمني-timestamp-للساعة-1-صباحا-في-31-أغسطس-2012">1. إنتاج طابع زمني (timestamp) للساعة 1 صباحًا في 31 أغسطس 2012</h2>
<p><strong>السؤال</strong></p>
<p>أنتج طابعًا زمنيًا للساعة 1 صباحًا في 31 أغسطس 2012.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>timestamp</th>
</tr>
</thead>
<tbody>
<tr>
<td>2012-08-31 01:00:00</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span>;
</code></pre>
<p>هذا سؤال سهل إلى حد كبير لنبدأ به! فلـ SQL مجموعة من أنواع التاريخ والوقت المختلفة، يمكنك تصفّحها على راحتك في <a href="http://www.postgresql.org/docs/current/static/datatype-datetime.html">وثائق Postgres</a> الممتازة. وتتيح لك هذه الأنواع ببساطة تخزين تواريخ أو أوقات أو طوابع زمنية (تاريخ + وقت).</p>
<p>الإجابة المعتمدة هي أفضل طريقة لإنشاء طابع زمني في الظروف العادية. ويمكنك أيضًا استخدام التحويلات (casts) لتغيير نص منسّق بشكل صحيح إلى طابع زمني، على سبيل المثال:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span>::<span class="hljs-type">timestamp</span>;
<span class="hljs-keyword">select</span> <span class="hljs-built_in">cast</span>(<span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-type">timestamp</span>);
</code></pre>
<p>المقاربة الأولى امتداد خاص بـ Postgres، أما الثانية فهي معيار SQL. وستلاحظ أننا استخدمنا في كثير من أسئلتنا السابقة نصوصًا مجرّدة دون تحديد نوع بيانات. وهذا يعمل لأن Postgres، حين يتعامل مع قيمة صادرة من عمود طابع زمني في جدول (مثلًا)، يعرف أنه يجب تحويل نصوصنا إلى طوابع زمنية.</p>
<p>يمكن تخزين الطوابع الزمنية مع معلومات المنطقة الزمنية أو دونها. وقد اخترنا عدم ذلك هنا، لكن إن أردت يمكنك تنسيق الطابع الزمني مثل &quot;2012-08-31 01:00:00 +00:00&quot;، بافتراض التوقيت العالمي المنسّق (UTC). ولاحظ أن الطابع الزمني مع المنطقة الزمنية نوع مختلف عن الطابع الزمني — فعند التصريح عنه، ينبغي استخدام TIMESTAMP WITH TIME ZONE 2012-08-31 01:00:00 +00:00.</p>
<p>وأخيرًا، جرّب قليلًا بعض الصيغ المختلفة لتسلسل التاريخ والوقت الواردة في وثائق Postgres. وستجد أن Postgres مرن للغاية في الصيغ التي يقبلها، وإن كانت وصيتي لك استخدام التسلسل المعياري الذي استخدمناه هنا — ستجده واضحًا لا لبس فيه وسهل النقل إلى قواعد بيانات أخرى.</p>
<p><strong>تلميح:</strong> هناك طرق كثيرة لفعل ذلك، لكن الأسهل على الأرجح هو النظر إلى الكلمة المفتاحية TIMESTAMP.</p>
<h2 id="2-طرح-الطوابع-الزمنية-من-بعضها">2. طرح الطوابع الزمنية من بعضها</h2>
<p><strong>السؤال</strong></p>
<p>أوجد نتيجة طرح الطابع الزمني '2012-07-30 01:00:00' من الطابع الزمني '2012-08-31 01:00:00'</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>interval</th>
</tr>
</thead>
<tbody>
<tr>
<td>32 days</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span> <span class="hljs-operator">-</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-07-30 01:00:00&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-type">interval</span>;
</code></pre>
<p>ينتج عن طرح الطوابع الزمنية نوع بيانات INTERVAL. والفترات (INTERVALs) نوع بيانات خاص لتمثيل الفرق بين نوعَي TIMESTAMP. وعند طرح الطوابع الزمنية، يعطي Postgres عادةً فترة بالأيام والساعات والدقائق والثواني، دون الخوض في الأشهر. وهذا يسهّل الحياة عمومًا، لأن الأشهر متغيرة الأطوال.</p>
<p>ومن الأمور المفيدة في الفترات أنها <em>تستطيع</em> ترميز الأشهر. ولنتخيل أنني أريد جدولة شيء ليحدث بعد شهر واحد بالضبط، أيًا كان طول الشهر. لفعل ذلك، يمكنني استخدام [timestamp] + interval '1 month'.</p>
<p>وتقف الفترات على النقيض من معالجة SQL لأنواع DATE. فالتواريخ لا تستخدم الفترات — بل يُعيد طرح تاريخين عددًا صحيحًا يمثّل عدد الأيام بين التاريخين. ويمكنك أيضًا إضافة قيم صحيحة إلى التواريخ. وهذا أكثر ملاءمة أحيانًا، بحسب قدر الذكاء الذي تحتاجه في التعامل مع تواريخك!</p>
<p><strong>تلميح:</strong> يمكنك استخدام الرمز '-' على الطوابع الزمنية</p>
<h2 id="3-توليد-قائمة-بكل-التواريخ-في-أكتوبر-2012">3. توليد قائمة بكل التواريخ في أكتوبر 2012</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بكل التواريخ في أكتوبر 2012. ويمكن إخراجها كطابع زمني (بوقت منتصف الليل) أو كتاريخ.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>ts</th>
</tr>
</thead>
<tbody>
<tr>
<td>2012-10-01 00:00:00</td>
</tr>
<tr>
<td>2012-10-02 00:00:00</td>
</tr>
<tr>
<td>2012-10-03 00:00:00</td>
</tr>
<tr>
<td>2012-10-04 00:00:00</td>
</tr>
<tr>
<td>2012-10-05 00:00:00</td>
</tr>
<tr>
<td>2012-10-06 00:00:00</td>
</tr>
<tr>
<td>2012-10-07 00:00:00</td>
</tr>
<tr>
<td>2012-10-08 00:00:00</td>
</tr>
<tr>
<td>2012-10-09 00:00:00</td>
</tr>
<tr>
<td>2012-10-10 00:00:00</td>
</tr>
<tr>
<td>2012-10-11 00:00:00</td>
</tr>
<tr>
<td>2012-10-12 00:00:00</td>
</tr>
<tr>
<td>2012-10-13 00:00:00</td>
</tr>
<tr>
<td>2012-10-14 00:00:00</td>
</tr>
<tr>
<td>2012-10-15 00:00:00</td>
</tr>
<tr>
<td>2012-10-16 00:00:00</td>
</tr>
<tr>
<td>2012-10-17 00:00:00</td>
</tr>
<tr>
<td>2012-10-18 00:00:00</td>
</tr>
<tr>
<td>2012-10-19 00:00:00</td>
</tr>
<tr>
<td>2012-10-20 00:00:00</td>
</tr>
<tr>
<td>2012-10-21 00:00:00</td>
</tr>
<tr>
<td>2012-10-22 00:00:00</td>
</tr>
<tr>
<td>2012-10-23 00:00:00</td>
</tr>
<tr>
<td>2012-10-24 00:00:00</td>
</tr>
<tr>
<td>2012-10-25 00:00:00</td>
</tr>
<tr>
<td>2012-10-26 00:00:00</td>
</tr>
<tr>
<td>2012-10-27 00:00:00</td>
</tr>
<tr>
<td>2012-10-28 00:00:00</td>
</tr>
<tr>
<td>2012-10-29 00:00:00</td>
</tr>
<tr>
<td>2012-10-30 00:00:00</td>
</tr>
<tr>
<td>2012-10-31 00:00:00</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> generate_series(<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-10-01&#x27;</span>, <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-10-31&#x27;</span>, <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 day&#x27;</span>) <span class="hljs-keyword">as</span> ts;
</code></pre>
<p>من أفضل ميزات Postgres على قواعد البيانات الأخرى دالة بسيطة تُسمى GENERATE_SERIES. وتتيح لك هذه الدالة توليد قائمة تواريخ أو أرقام، مع تحديد بداية ونهاية وقيمة زيادة. وهي مفيدة للغاية في الحالات التي تريد فيها إخراج، مثلًا، المبيعات اليومية على مدار شهر. والطريقة المعتادة لفعل ذلك على جدول يحتوي قائمة مبيعات قد تكون استخدام تجميع SUM، مع التجميع بحسب التاريخ ونوع المنتج. ولسوء الحظ، في هذه المقاربة خلل: إذا لم تكن هناك مبيعات في يوم معيّن، فلن يظهر! ولجعلها تعمل على نحو صحيح، تحتاج إلى ربط خارجي من قائمة متسلسلة من الطوابع الزمنية إلى البيانات المجمّعة لملء الفراغات.</p>
<p>وفي أنظمة قواعد بيانات أخرى، ليس غريبًا الاحتفاظ بـ&quot;جدول تقويم&quot; مليء بالتواريخ تنفّذ عليه عمليات الربط هذه. أو يمكنك في بعض الأنظمة كتابة نظير لـ generate_series باستخدام تعبيرات CTE التعاودية. ولحسن حظنا، يسهّل Postgres حياتنا كثيرًا!</p>
<p><strong>تلميح:</strong> ألقِ نظرة على دالة GENERATE_SERIES في Postgres</p>
<h2 id="4-الحصول-على-يوم-الشهر-من-طابع-زمني">4. الحصول على يوم الشهر من طابع زمني</h2>
<p><strong>السؤال</strong></p>
<p>الحصول على يوم الشهر من الطابع الزمني '2012-08-31' كعدد صحيح.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>date_part</th>
</tr>
</thead>
<tbody>
<tr>
<td>31</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">day</span> <span class="hljs-keyword">from</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-08-31&#x27;</span>);
</code></pre>
<p>تُستخدم دالة EXTRACT للحصول على أجزاء من طابع زمني أو فترة. ويمكنك الحصول على قيمة أي حقل في الطابع الزمني كعدد صحيح.</p>
<p><strong>تلميح:</strong> أسهل طريقة لفعل ذلك هي دالة EXTRACT.</p>
<h2 id="5-حساب-عدد-الثواني-بين-طابعين-زمنيين">5. حساب عدد الثواني بين طابعين زمنيين</h2>
<p><strong>السؤال</strong></p>
<p>احسب عدد الثواني بين الطابعين الزمنيين '2012-08-31 01:00:00' و'2012-09-02 00:00:00'</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>date_part</th>
</tr>
</thead>
<tbody>
<tr>
<td>169200</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">extract</span>(epoch <span class="hljs-keyword">from</span> (<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-09-02 00:00:00&#x27;</span> <span class="hljs-operator">-</span> <span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span>));
</code></pre>
<p>الإجابة أعلاه خدعة خاصة بـ Postgres. فاستخراج الـ epoch يحوّل فترة أو طابعًا زمنيًا إلى عدد من الثواني، أو إلى عدد الثواني منذ الـ epoch (1 يناير 1970) على التوالي. وإن أردت عدد الدقائق أو الساعات أو نحو ذلك، يمكنك ببساطة قسمة عدد الثواني على نحو مناسب.</p>
<p>وإن أردت كتابة شيفرة أكثر قابلية للنقل، فستجد للأسف أنك لا تستطيع استخدام extract epoch. وستحتاج بدلًا من ذلك إلى استخدام شيء مثل:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> 	<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">day</span> <span class="hljs-keyword">from</span> ts.int)<span class="hljs-operator">*</span><span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">24</span> <span class="hljs-operator">+</span>
	<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">hour</span> <span class="hljs-keyword">from</span> ts.int)<span class="hljs-operator">*</span><span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">60</span> <span class="hljs-operator">+</span> 
	<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">minute</span> <span class="hljs-keyword">from</span> ts.int)<span class="hljs-operator">*</span><span class="hljs-number">60</span> <span class="hljs-operator">+</span>
	<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">second</span> <span class="hljs-keyword">from</span> ts.int)
	<span class="hljs-keyword">from</span>
		(<span class="hljs-keyword">select</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-09-02 00:00:00&#x27;</span> <span class="hljs-operator">-</span> <span class="hljs-string">&#x27;2012-08-31 01:00:00&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-type">int</span>) ts
</code></pre>
<p>وهذا، كما ترى، بشع إلى حد كبير. وإن كنت تخطط لكتابة SQL تعمل على منصات متعددة، فسأفكر في امتلاك مكتبة من الدوال المعرّفة من المستخدم الشائعة لكل نظام إدارة قواعد بيانات، تتيح لك توحيد أي متطلبات شائعة كهذه. فهذا يُبقي شيفرتك الأساسية أنظف بكثير.</p>
<p><strong>تلميح:</strong> يمكنك فعل ذلك باستخراج الـ epoch من الفترة بين طابعين زمنيين.</p>
<h2 id="6-حساب-عدد-الأيام-في-كل-شهر-من-أشهر-2012">6. حساب عدد الأيام في كل شهر من أشهر 2012</h2>
<p><strong>السؤال</strong></p>
<p>لكل شهر من أشهر السنة في 2012، أخرج عدد الأيام في ذلك الشهر. ونظّم الإخراج في عمود من الأعداد الصحيحة يحتوي رقم الشهر في السنة، وعمود ثانٍ يحتوي نوع بيانات فترة (interval).</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>month</th>
<th>length</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>31 days</td>
</tr>
<tr>
<td>2</td>
<td>29 days</td>
</tr>
<tr>
<td>3</td>
<td>31 days</td>
</tr>
<tr>
<td>4</td>
<td>30 days</td>
</tr>
<tr>
<td>5</td>
<td>31 days</td>
</tr>
<tr>
<td>6</td>
<td>30 days</td>
</tr>
<tr>
<td>7</td>
<td>31 days</td>
</tr>
<tr>
<td>8</td>
<td>31 days</td>
</tr>
<tr>
<td>9</td>
<td>30 days</td>
</tr>
<tr>
<td>10</td>
<td>31 days</td>
</tr>
<tr>
<td>11</td>
<td>30 days</td>
</tr>
<tr>
<td>12</td>
<td>31 days</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> 	<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> cal.month) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>,
	(cal.month <span class="hljs-operator">+</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 month&#x27;</span>) <span class="hljs-operator">-</span> cal.month <span class="hljs-keyword">as</span> length
	<span class="hljs-keyword">from</span>
	(
		<span class="hljs-keyword">select</span> generate_series(<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>, <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-12-01&#x27;</span>, <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 month&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>
	) cal
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">month</span>;
</code></pre>
<p>تعرض هذه الإجابة عدة مفاهيم تعلمناها. فنستخدم دالة GENERATE_SERIES لإنتاج طوابع زمنية تغطي سنة كاملة، بزيادة شهر واحد في كل مرة. ثم نستخدم دالة EXTRACT للحصول على رقم الشهر. وأخيرًا، نطرح كل طابع زمني + شهر واحد منه.</p>
<p>ومن الجدير بالملاحظة أن طرح طابعين زمنيين سينتج دائمًا فترة بالأيام (أو أجزاء من يوم). ولن تحصل على إجابة بالأشهر أو السنوات فقط، لأن طول هاتين الفترتين متغير.</p>
<p><strong>تلميح:</strong> طرح طابعين زمنيين سيعطيك الفترة التي تبحث عنها. ويمكنك استخدام دالة EXTRACT للحصول على الشهر من طابع زمني.</p>
<h2 id="7-حساب-عدد-الأيام-المتبقية-في-الشهر">7. حساب عدد الأيام المتبقية في الشهر</h2>
<p><strong>السؤال</strong></p>
<p>لأي طابع زمني معطى، احسب عدد الأيام المتبقية في الشهر. ويجب أن يُحسب اليوم الحالي يومًا كاملًا، أيًا كان الوقت. واستخدم '2012-02-11 01:00:00' طابعًا زمنيًا للمثال بغرض بناء الإجابة. ونظّم الإخراج كقيمة فترة واحدة.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>remaining</th>
</tr>
</thead>
<tbody>
<tr>
<td>19 days</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> (date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>,ts.testts) <span class="hljs-operator">+</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 month&#x27;</span>) 
		<span class="hljs-operator">-</span> date_trunc(<span class="hljs-string">&#x27;day&#x27;</span>, ts.testts) <span class="hljs-keyword">as</span> remaining
	<span class="hljs-keyword">from</span> (<span class="hljs-keyword">select</span> <span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-02-11 01:00:00&#x27;</span> <span class="hljs-keyword">as</span> testts) ts
</code></pre>
<p>نجم هذه الفقرة هو دالة DATE_TRUNC. وهي تفعل إلى حد كبير ما تتوقعه — فهي تقتطع تاريخًا عند دقيقة أو ساعة أو يوم أو شهر معيّن، وهكذا. وطريقة حلّنا هذه المسألة هي اقتطاع طابعنا الزمني لمعرفة الشهر الذي نحن فيه، وإضافة شهر إلى ذلك، ثم طرح طابعنا الزمني. ولضمان معاملة الأيام الجزئية كأيام كاملة، يُقتطع الطابع الزمني الذي نطرحه عند أقرب يوم.</p>
<p>ولاحظ طريقتنا في وضع الطابع الزمني داخل استعلام فرعي. وهذا ليس مطلوبًا، لكنه يعني أنك تستطيع إعطاء الطابع الزمني اسمًا، بدلًا من تكرار القيمة الحرفية مرارًا.</p>
<p><strong>تلميح:</strong> ألقِ نظرة على دالة DATE_TRUNC</p>
<h2 id="8-حساب-وقت-انتهاء-الحجوزات">8. حساب وقت انتهاء الحجوزات</h2>
<p><strong>السؤال</strong></p>
<p>أرجع قائمة بأوقات البدء والانتهاء لآخر 10 حجوزات (مرتّبة بحسب وقت انتهائها، ثم بحسب وقت بدئها) في النظام.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>starttime</th>
<th>endtime</th>
</tr>
</thead>
<tbody>
<tr>
<td>2013-01-01 15:30:00</td>
<td>2013-01-01 16:00:00</td>
</tr>
<tr>
<td>2012-09-30 19:30:00</td>
<td>2012-09-30 20:30:00</td>
</tr>
<tr>
<td>2012-09-30 19:00:00</td>
<td>2012-09-30 20:30:00</td>
</tr>
<tr>
<td>2012-09-30 19:30:00</td>
<td>2012-09-30 20:00:00</td>
</tr>
<tr>
<td>2012-09-30 19:00:00</td>
<td>2012-09-30 20:00:00</td>
</tr>
<tr>
<td>2012-09-30 19:00:00</td>
<td>2012-09-30 20:00:00</td>
</tr>
<tr>
<td>2012-09-30 18:30:00</td>
<td>2012-09-30 20:00:00</td>
</tr>
<tr>
<td>2012-09-30 18:30:00</td>
<td>2012-09-30 20:00:00</td>
</tr>
<tr>
<td>2012-09-30 19:00:00</td>
<td>2012-09-30 19:30:00</td>
</tr>
<tr>
<td>2012-09-30 18:30:00</td>
<td>2012-09-30 19:30:00</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> starttime, starttime <span class="hljs-operator">+</span> slots<span class="hljs-operator">*</span>(<span class="hljs-type">interval</span> <span class="hljs-string">&#x27;30 minutes&#x27;</span>) endtime
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> endtime <span class="hljs-keyword">desc</span>, starttime <span class="hljs-keyword">desc</span>
	limit <span class="hljs-number">10</span>
</code></pre>
<p>يعيد هذا السؤال ببساطة وقت بدء الحجز، ووقت انتهاء محسوبًا يساوي وقت البدء + (30 دقيقة * slots). ولاحظ أنه لا بأس إطلاقًا في ضرب الفترات.</p>
<p>والأمر الآخر الذي ستلاحظه هو استخدام order by وlimit للحصول على آخر عشرة حجوزات. وكل ما يفعله ذلك هو ترتيب الحجوزات بحسب وقت انتهائها (تنازليًا)، وانتقاء أول عشرة.</p>
<p><strong>تلميح:</strong> يمكنك ضرب فترة بعدد الشرائح في الحجز.</p>
<h2 id="9-إرجاع-عدد-الحجوزات-لكل-شهر">9. إرجاع عدد الحجوزات لكل شهر</h2>
<p><strong>السؤال</strong></p>
<p>أرجع عدد الحجوزات لكل شهر، مرتّبة بحسب الشهر</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>month</th>
<th>count</th>
</tr>
</thead>
<tbody>
<tr>
<td>2012-07-01 00:00:00</td>
<td>658</td>
</tr>
<tr>
<td>2012-08-01 00:00:00</td>
<td>1472</td>
</tr>
<tr>
<td>2012-09-01 00:00:00</td>
<td>1913</td>
</tr>
<tr>
<td>2013-01-01 00:00:00</td>
<td>1</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>, starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>)
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">month</span>
	<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">month</span>
</code></pre>
<p>هذا السؤال إعادة استخدام بسيطة إلى حد كبير لمفاهيم رأيناها من قبل. فنحن ببساطة نعُدّ عدد الحجوزات، ونجمّع بحسب وقت بدء الحجز، مقتطعًا عند الشهر.</p>
<p><strong>تلميح:</strong> ستحتاج على الأرجح إلى دالة date_trunc مرة أخرى.</p>
<h2 id="10-حساب-نسبة-الاستغلال-لكل-مرفق-بحسب-الشهر">10. حساب نسبة الاستغلال لكل مرفق بحسب الشهر</h2>
<p><strong>السؤال</strong></p>
<p>احسب نسبة الاستغلال لكل مرفق بحسب الشهر، مرتّبة بحسب الاسم والشهر، ومقرّبة إلى منزلة عشرية واحدة. وقت الافتتاح 8 صباحًا، ووقت الإغلاق 8:30 مساءً. ويمكنك معاملة كل شهر كشهر كامل، بغض النظر عن وجود تواريخ كان النادي فيها مغلقًا.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>month</th>
<th>utilisation</th>
</tr>
</thead>
<tbody>
<tr>
<td>Badminton Court</td>
<td>2012-07-01 00:00:00</td>
<td>23.2</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>2012-08-01 00:00:00</td>
<td>59.2</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>2012-09-01 00:00:00</td>
<td>76.0</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>2012-07-01 00:00:00</td>
<td>34.1</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>2012-08-01 00:00:00</td>
<td>63.5</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>2012-09-01 00:00:00</td>
<td>86.4</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>2012-07-01 00:00:00</td>
<td>3.1</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>2012-08-01 00:00:00</td>
<td>10.6</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>2012-09-01 00:00:00</td>
<td>16.3</td>
</tr>
<tr>
<td>Pool Table</td>
<td>2012-07-01 00:00:00</td>
<td>15.1</td>
</tr>
<tr>
<td>Pool Table</td>
<td>2012-08-01 00:00:00</td>
<td>41.5</td>
</tr>
<tr>
<td>Pool Table</td>
<td>2012-09-01 00:00:00</td>
<td>62.8</td>
</tr>
<tr>
<td>Pool Table</td>
<td>2013-01-01 00:00:00</td>
<td>0.1</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>2012-07-01 00:00:00</td>
<td>20.1</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>2012-08-01 00:00:00</td>
<td>42.1</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>2012-09-01 00:00:00</td>
<td>56.8</td>
</tr>
<tr>
<td>Squash Court</td>
<td>2012-07-01 00:00:00</td>
<td>21.2</td>
</tr>
<tr>
<td>Squash Court</td>
<td>2012-08-01 00:00:00</td>
<td>51.6</td>
</tr>
<tr>
<td>Squash Court</td>
<td>2012-09-01 00:00:00</td>
<td>72.0</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>2012-07-01 00:00:00</td>
<td>13.4</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>2012-08-01 00:00:00</td>
<td>39.2</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>2012-09-01 00:00:00</td>
<td>56.3</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>2012-07-01 00:00:00</td>
<td>34.8</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>2012-08-01 00:00:00</td>
<td>59.2</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>2012-09-01 00:00:00</td>
<td>78.8</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>2012-07-01 00:00:00</td>
<td>26.7</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>2012-08-01 00:00:00</td>
<td>62.3</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>2012-09-01 00:00:00</td>
<td>78.4</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, <span class="hljs-keyword">month</span>, 
	round((<span class="hljs-number">100</span><span class="hljs-operator">*</span>slots)<span class="hljs-operator">/</span>
		<span class="hljs-built_in">cast</span>(
			<span class="hljs-number">25</span><span class="hljs-operator">*</span>(<span class="hljs-built_in">cast</span>((<span class="hljs-keyword">month</span> <span class="hljs-operator">+</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 month&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>)
			<span class="hljs-operator">-</span> <span class="hljs-built_in">cast</span> (<span class="hljs-keyword">month</span> <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>)) <span class="hljs-keyword">as</span> <span class="hljs-type">numeric</span>),<span class="hljs-number">1</span>) <span class="hljs-keyword">as</span> utilisation
	<span class="hljs-keyword">from</span>  (
		<span class="hljs-keyword">select</span> facs.name <span class="hljs-keyword">as</span> name, date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>, starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> slots
			<span class="hljs-keyword">from</span> cd.bookings bks
			<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
				<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
			<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.facid, <span class="hljs-keyword">month</span>
	) <span class="hljs-keyword">as</span> inn
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> name, <span class="hljs-keyword">month</span>
</code></pre>
<p>جوهر هذا الاستعلام (الاستعلام الفرعي الداخلي) بسيط جدًا حقًا: تجميع لحساب العدد الإجمالي للشرائح المستخدمة لكل مرفق في الشهر. وإن كنت قد غطّيت بقية هذا القسم وفئة التجميعات، فالأرجح أنك لم تجد هذا الجزء صعبًا كثيرًا.</p>
<p>لكن هذا الاستعلام، للأسف، فيه تعقيد آخر: حساب عدد الأيام في كل شهر. ويمكننا حساب عدد الأيام بين شهرين بطرح طابعين زمنيين بينهما شهر. وهذا يعطينا للأسف نوع بيانات فترة، لا يمكننا استخدامه في العمليات الحسابية. وفي هذه الحالة تجاوزنا هذا القيد بتحويل طوابعنا الزمنية إلى <em>تواريخ</em> قبل الطرح. فطرح نوعَي date يعطينا عددًا صحيحًا من الأيام.</p>
<p>وبديل هذا التحايل تحويل الفترة إلى قيمة <em>epoch</em>: أي عدد من الثواني. وللقيام بذلك استخدم EXTRACT(EPOCH FROM month)/(24<em>60</em>60). وهذا على الأرجح أسلوب أجمل بكثير، لكنه أقل قابلية للنقل إلى أنظمة قواعد بيانات أخرى.</p>
<p><strong>تلميح:</strong> تذكّر أن الأشهر متفاوتة الأطوال — ستحتاج إلى حساب عدد الشرائح المتاحة في كل شهر. وتحتاج إلى إيجاد طريقة لاسترجاع عدد الأيام في الشهر كعدد صحيح (لا كفترة).</p>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:p,headings:r,html:d};export{s as book,n as chapter,t as chapterTitle,l as default,r as headings,d as html,a as slug,p as title};
