const s="pgexercises",n="recursive",e="Recursive Queries",a="index",r="الاستعلامات التعاودية",t=[{depth:2,id:"1-إيجاد-سلسلة-التوصيات-الصاعدة-للعضو-ذي-المعرف-27",text:"1. إيجاد سلسلة التوصيات الصاعدة للعضو ذي المعرّف 27"},{depth:2,id:"2-إيجاد-سلسلة-التوصيات-النازلة-للعضو-ذي-المعرف-1",text:"2. إيجاد سلسلة التوصيات النازلة للعضو ذي المعرّف 1"},{depth:2,id:"3-إنتاج-تعبير-cte-يمكنه-إرجاع-سلسلة-التوصيات-الصاعدة-لأي-عضو",text:"3. إنتاج تعبير CTE يمكنه إرجاع سلسلة التوصيات الصاعدة لأي عضو"}],d=`<p>تتيح لنا التعبيرات الجدولية الشائعة (Common Table Expressions، أو CTEs) أن ننشئ فعليًا جداول مؤقتة خاصة بنا طوال مدة الاستعلام (query) — وهي إلى حد كبير وسيلة للراحة تساعدنا على كتابة SQL أوضح قراءةً. لكن باستخدام المعدّل <a href="http://www.postgresql.org/docs/current/static/queries-with.html">WITH RECURSIVE</a> يصبح في إمكاننا إنشاء استعلامات تعاودية (recursive queries). وهذا مفيد جدًا للعمل مع البيانات ذات البنية الشجرية والبيانات الرسومية (graph) — تخيّل، على سبيل المثال، استرجاع كل علاقات عقدة في رسم بياني حتى عمق معيّن.</p>
<p>تعرض لك هذه الفئة بعض الاستعلامات التعاودية الأساسية الممكنة باستخدام مجموعة بياناتنا.</p>
<h2 id="1-إيجاد-سلسلة-التوصيات-الصاعدة-للعضو-ذي-المعرف-27">1. إيجاد سلسلة التوصيات الصاعدة للعضو ذي المعرّف 27</h2>
<p><strong>السؤال</strong></p>
<p>أوجد سلسلة التوصيات الصاعدة للعضو ذي المعرّف 27: أي العضو الذي أوصى به، ثم العضو الذي أوصى بذلك العضو، وهكذا. أرجع معرّف العضو والاسم الأول والاسم العائلي. ورتّب تنازليًا بحسب معرّف العضو.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>recommender</th>
<th>firstname</th>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>20</td>
<td>Matthew</td>
<td>Genting</td>
</tr>
<tr>
<td>5</td>
<td>Gerald</td>
<td>Butters</td>
</tr>
<tr>
<td>1</td>
<td>Darren</td>
<td>Smith</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> <span class="hljs-keyword">recursive</span> recommenders(recommender) <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> recommendedby <span class="hljs-keyword">from</span> cd.members <span class="hljs-keyword">where</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">27</span>
	<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
	<span class="hljs-keyword">select</span> mems.recommendedby
		<span class="hljs-keyword">from</span> recommenders recs
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
			<span class="hljs-keyword">on</span> mems.memid <span class="hljs-operator">=</span> recs.recommender
)
<span class="hljs-keyword">select</span> recs.recommender, mems.firstname, mems.surname
	<span class="hljs-keyword">from</span> recommenders recs
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
		<span class="hljs-keyword">on</span> recs.recommender <span class="hljs-operator">=</span> mems.memid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> memid <span class="hljs-keyword">desc</span>
</code></pre>
<p>تمثّل WITH RECURSIVE وظيفة مفيدة بشكل مذهل ولا يعرفها كثير من المطوّرين. فهي تتيح لك تنفيذ استعلامات على تسلسلات هرمية من البيانات، وهو أمر يصعب جدًا بوسائل أخرى في SQL. وغالبًا ما تدفع هذه الحالات المطوّرين إلى اللجوء إلى رحلات ذهاب وإياب متعددة إلى نظام قاعدة البيانات.</p>
<p>لقد رأيت WITH من قبل. فالتعبيرات الجدولية الشائعة (CTEs) التي يعرّفها WITH تمنحك القدرة على إنتاج عروض مضمّنة على بياناتك. وهذا في العادة مجرد تسهيل نحوي، لكن المعدّل RECURSIVE يضيف القدرة على الربط مقابل نتائج أُنتجت بالفعل لإنتاج المزيد. ويتخذ WITH التعاودي الصورة الأساسية التالية:</p>
<pre><code>WITH RECURSIVE NAME(columns) as (
	&lt;initial statement&gt;
	UNION ALL 
	&lt;recursive statement&gt;
)
</code></pre>
<p>يملأ البيان الأولي البيانات الأولية، ثم يُشغَّل البيان التعاودي مرارًا لإنتاج المزيد. ويستطيع كل خطوة من خطوات التعاود الوصول إلى تعبير CTE، لكنه لا يرى داخله إلا البيانات التي أنتجتها التكرارية السابقة. ويتكرر ذلك حتى لا تُنتج أي تكرارية بيانات إضافية. وقد يبدو أبسط مثال على WITH تعاودي على شيء مثل هذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> <span class="hljs-keyword">recursive</span> increment(num) <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> <span class="hljs-number">1</span>
	<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
	<span class="hljs-keyword">select</span> increment.num <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">from</span> increment <span class="hljs-keyword">where</span> increment.num <span class="hljs-operator">&lt;</span> <span class="hljs-number">5</span>
)
<span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> increment;
</code></pre>
<p>يُنتج البيان الأولي '1'. وترى التكرارية الأولى للبيان التعاودي هذا محتوىً لـ increment، فتُنتج '2'. وترى التكرارية التالية محتوى increment على أنه '2'، وهكذا. وينتهي التنفيذ عندما لا يُنتج البيان التعاودي أي بيانات إضافية.</p>
<p>وبعد الانتهاء من الأساسيات، يسهّل إلى حد كبير شرح إجابتنا هنا. فيأتي البيان الأولي بمعرّف الشخص الذي أوصى بالعضو الذي يهمنا. ويأخذ البيان التعاودي نتائج البيان الأولي، ويجد معرّف الشخص الذي أوصى به. ثم تُمرَّر هذه القيمة إلى التكرارية التالية، وهكذا.</p>
<p>وبعد أن أنشأنا تعبير CTE المسمى recommenders، كل ما على بيان SELECT الرئيسي فعله هو جلب معرّفات الأعضاء من recommenders، وربطها بجدول members لمعرفة أسمائهم.</p>
<p><strong>تلميح:</strong> اقرأ عن WITH RECURSIVE.</p>
<h2 id="2-إيجاد-سلسلة-التوصيات-النازلة-للعضو-ذي-المعرف-1">2. إيجاد سلسلة التوصيات النازلة للعضو ذي المعرّف 1</h2>
<p><strong>السؤال</strong></p>
<p>أوجد سلسلة التوصيات النازلة للعضو ذي المعرّف 1: أي الأعضاء الذين أوصى بهم، ثم الأعضاء الذين أوصى بهم هؤلاء، وهكذا. أرجع معرّف العضو واسمه، ورتّب تصاعديًا بحسب معرّف العضو.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>memid</th>
<th>firstname</th>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td>Janice</td>
<td>Joplette</td>
</tr>
<tr>
<td>5</td>
<td>Gerald</td>
<td>Butters</td>
</tr>
<tr>
<td>7</td>
<td>Nancy</td>
<td>Dare</td>
</tr>
<tr>
<td>10</td>
<td>Charles</td>
<td>Owen</td>
</tr>
<tr>
<td>11</td>
<td>David</td>
<td>Jones</td>
</tr>
<tr>
<td>14</td>
<td>Jack</td>
<td>Smith</td>
</tr>
<tr>
<td>20</td>
<td>Matthew</td>
<td>Genting</td>
</tr>
<tr>
<td>21</td>
<td>Anna</td>
<td>Mackenzie</td>
</tr>
<tr>
<td>26</td>
<td>Douglas</td>
<td>Jones</td>
</tr>
<tr>
<td>27</td>
<td>Henrietta</td>
<td>Rumney</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> <span class="hljs-keyword">recursive</span> recommendeds(memid) <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> memid <span class="hljs-keyword">from</span> cd.members <span class="hljs-keyword">where</span> recommendedby <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
	<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
	<span class="hljs-keyword">select</span> mems.memid
		<span class="hljs-keyword">from</span> recommendeds recs
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
			<span class="hljs-keyword">on</span> mems.recommendedby <span class="hljs-operator">=</span> recs.memid
)
<span class="hljs-keyword">select</span> recs.memid, mems.firstname, mems.surname
	<span class="hljs-keyword">from</span> recommendeds recs
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
		<span class="hljs-keyword">on</span> recs.memid <span class="hljs-operator">=</span> mems.memid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> memid
</code></pre>
<p>هذا تنويع طفيف جدًا على السؤال السابق. والفرق الجوهري أننا نتجه الآن في الاتجاه المعاكس. ومن النقاط المثيرة للانتباه أن هذا التعبير CTE، بخلاف المثال السابق، ينتج صفوفًا متعددة في كل تكرارية، بحكم أننا ننزل في شجرة التوصيات (باتباع كل الفروع) بدلًا من الصعود فيها.</p>
<p><strong>تلميح:</strong> اقرأ عن WITH RECURSIVE.</p>
<h2 id="3-إنتاج-تعبير-cte-يمكنه-إرجاع-سلسلة-التوصيات-الصاعدة-لأي-عضو">3. إنتاج تعبير CTE يمكنه إرجاع سلسلة التوصيات الصاعدة لأي عضو</h2>
<p><strong>السؤال</strong></p>
<p>أنتج تعبير CTE يمكنه إرجاع سلسلة التوصيات الصاعدة لأي عضو. وينبغي أن تستطيع تنفيذ select recommender from recommenders where member=x. وأثبت ذلك بجلب السلسلتين للعضوين 12 و22. وينبغي أن يحتوي جدول النتائج على member وrecommender، مرتّبين تصاعديًا بحسب member وتنازليًا بحسب recommender.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>member</th>
<th>recommender</th>
<th>firstname</th>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>12</td>
<td>9</td>
<td>Ponder</td>
<td>Stibbons</td>
</tr>
<tr>
<td>12</td>
<td>6</td>
<td>Burton</td>
<td>Tracy</td>
</tr>
<tr>
<td>22</td>
<td>16</td>
<td>Timothy</td>
<td>Baker</td>
</tr>
<tr>
<td>22</td>
<td>13</td>
<td>Jemima</td>
<td>Farrell</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> <span class="hljs-keyword">recursive</span> recommenders(recommender, <span class="hljs-keyword">member</span>) <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> recommendedby, memid
		<span class="hljs-keyword">from</span> cd.members
	<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
	<span class="hljs-keyword">select</span> mems.recommendedby, recs.member
		<span class="hljs-keyword">from</span> recommenders recs
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
			<span class="hljs-keyword">on</span> mems.memid <span class="hljs-operator">=</span> recs.recommender
)
<span class="hljs-keyword">select</span> recs.member <span class="hljs-keyword">member</span>, recs.recommender, mems.firstname, mems.surname
	<span class="hljs-keyword">from</span> recommenders recs
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems		
		<span class="hljs-keyword">on</span> recs.recommender <span class="hljs-operator">=</span> mems.memid
	<span class="hljs-keyword">where</span> recs.member <span class="hljs-operator">=</span> <span class="hljs-number">22</span> <span class="hljs-keyword">or</span> recs.member <span class="hljs-operator">=</span> <span class="hljs-number">12</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> recs.member <span class="hljs-keyword">asc</span>, recs.recommender <span class="hljs-keyword">desc</span>
</code></pre>
<p>يتطلب هذا السؤال منا إنتاج تعبير CTE يمكنه حساب سلسلة التوصيات الصاعدة لأي مستخدم. ومعظم تعقيد الوصول إلى الجواب يكمن في إدراك أننا نحتاج الآن إلى أن ينتج تعبيرنا CTE عمودين: عمودًا يحتوي العضو الذي نسأل عنه، وآخر يحتوي الأعضاء في شجرة توصياته. وما نفعله في جوهره إنتاج جدول يبسّط التسلسل الهرمي للتوصيات ويسطّحه.</p>
<p>ولأننا نريد إنتاج السلسلة لكل مستخدم، يحتاج بياننا الأولي إلى اختيار بيانات كل مستخدم: معرّفه ومن أوصى به. وبعد ذلك، نريد تمرير حقل member عبر كل تكرارية دون تغييره، مع جلب المُوصي التالي. ويمكنك أن ترى أن الجزء التعاودي من بياننا لم يتغير فعليًا، إلا بتمرير حقل 'member'.</p>
<p><strong>تلميح:</strong> ينبغي أن يُعيد بيانك الأولي كل حقول recommendedby وmemid في جدول members.</p>
`,p={book:s,chapter:n,chapterTitle:e,slug:a,title:r,headings:t,html:d};export{s as book,n as chapter,e as chapterTitle,p as default,t as headings,d as html,a as slug,r as title};
