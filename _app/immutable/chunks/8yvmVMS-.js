const s="pgexercises",n="aggregates",t="Aggregation",a="index",d="التجميع",p=[{depth:2,id:"1-عد-عدد-المرافق",text:"1. عدّ عدد المرافق"},{depth:2,id:"2-عد-عدد-المرافق-المكلفة",text:"2. عدّ عدد المرافق المكلفة"},{depth:2,id:"3-عد-عدد-التوصيات-التي-يقدمها-كل-عضو",text:"3. عدّ عدد التوصيات التي يقدّمها كل عضو"},{depth:2,id:"4-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق",text:"4. عرض إجمالي الشرائح المحجوزة لكل مرفق"},{depth:2,id:"5-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-شهر-معين",text:"5. عرض إجمالي الشرائح المحجوزة لكل مرفق في شهر معيّن"},{depth:2,id:"6-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-كل-شهر",text:"6. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر"},{depth:2,id:"7-إيجاد-عدد-الأعضاء-الذين-أجروا-حجزا-واحدا-على-الأقل",text:"7. إيجاد عدد الأعضاء الذين أجروا حجزًا واحدًا على الأقل"},{depth:2,id:"8-عرض-المرافق-التي-حجز-فيها-أكثر-من-1000-شريحة",text:"8. عرض المرافق التي حُجز فيها أكثر من 1000 شريحة"},{depth:2,id:"9-إيجاد-الإيراد-الإجمالي-لكل-مرفق",text:"9. إيجاد الإيراد الإجمالي لكل مرفق"},{depth:2,id:"10-إيجاد-المرافق-التي-يقل-إيرادها-الإجمالي-عن-1000",text:"10. إيجاد المرافق التي يقل إيرادها الإجمالي عن 1000"},{depth:2,id:"11-إخراج-معرف-المرفق-الذي-حجز-فيه-أكبر-عدد-من-الشرائح",text:"11. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح"},{depth:2,id:"12-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-كل-شهر-الجزء-2",text:"12. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر — الجزء 2"},{depth:2,id:"13-عرض-إجمالي-الساعات-المحجوزة-لكل-مرفق-مسمى",text:"13. عرض إجمالي الساعات المحجوزة لكل مرفق مسمّى"},{depth:2,id:"14-عرض-أول-حجز-لكل-عضو-بعد-1-سبتمبر-2012",text:"14. عرض أول حجز لكل عضو بعد 1 سبتمبر 2012"},{depth:2,id:"15-إنتاج-قائمة-بأسماء-الأعضاء-بحيث-يحتوي-كل-صف-على-العدد-الإجمالي-للأعضاء",text:"15. إنتاج قائمة بأسماء الأعضاء، بحيث يحتوي كل صف على العدد الإجمالي للأعضاء"},{depth:2,id:"16-إنتاج-قائمة-مرقمة-بالأعضاء",text:"16. إنتاج قائمة مرقّمة بالأعضاء"},{depth:2,id:"17-إخراج-معرف-المرفق-الذي-حجز-فيه-أكبر-عدد-من-الشرائح-مرة-أخرى",text:"17. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح، مرة أخرى"},{depth:2,id:"18-ترتيب-الأعضاء-بحسب-الساعات-المقربة-المستخدمة",text:"18. ترتيب الأعضاء بحسب الساعات (المقرّبة) المستخدمة"},{depth:2,id:"19-إيجاد-أفضل-ثلاثة-مرافق-من-حيث-توليد-الإيراد",text:"19. إيجاد أفضل ثلاثة مرافق من حيث توليد الإيراد"},{depth:2,id:"20-تصنيف-المرافق-بحسب-القيمة",text:"20. تصنيف المرافق بحسب القيمة"},{depth:2,id:"21-حساب-زمن-استرداد-التكلفة-لكل-مرفق",text:"21. حساب زمن استرداد التكلفة لكل مرفق"},{depth:2,id:"22-حساب-متوسط-متحرك-للإيراد-الإجمالي",text:"22. حساب متوسط متحرك للإيراد الإجمالي"}],l=`<p>يُعد التجميع (aggregation) من القدرات التي تجعلك تقدّر حقًا قوة نظم قواعد البيانات العلائقية. فهو يتيح لك أن تتجاوز مجرد حفظ بياناتك إلى عالم طرح أسئلة مثيرة للاهتمام فعلًا يمكن استخدامها في اتخاذ القرارات. ويتناول هذا القسم التجميع بإسهاب، مستخدمًا التجميع المعياري (grouping) وكذلك دوال النافذة (window functions) الأحدث.</p>
<p>إن واجهت صعوبة في هذه الأسئلة، فأنصح بشدة بكتاب <a href="http://shop.oreilly.com/product/9780596007270.do">Learning SQL</a> لـ Alan Beaulieu و<a href="http://shop.oreilly.com/product/9780596009762.do">SQL Cookbook</a> لـ Anthony Molinaro. بل احصل على الأخير على أي حال — فسيأخذك إلى ما هو أبعد من أي شيء تجده في هذا الموقع، وعلى أنظمة قواعد بيانات مختلفة متعددة أيضًا.</p>
<h2 id="1-عد-عدد-المرافق">1. عدّ عدد المرافق</h2>
<p><strong>السؤال</strong></p>
<p>في أول جولة لنا في التجميعات، سنكتفي بشيء بسيط. نريد معرفة عدد المرافق الموجودة — أنتج ببساطة عددًا إجماليًا.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>count</th>
</tr>
</thead>
<tbody>
<tr>
<td>9</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> cd.facilities;
</code></pre>
<p>يبدأ التجميع ببساطة إلى حد كبير! فـ SQL أعلاه يختار كل شيء من جدول facilities، ثم يعُدّ عدد الصفوف في مجموعة النتائج. ولدالة count استخدامات متنوعة: COUNT(*) تُعيد ببساطة عدد الصفوف، وCOUNT(address) تعُدّ عدد العناوين غير الفارغة (non-null) في مجموعة النتائج. وأخيرًا، COUNT(DISTINCT address) تعُدّ عدد العناوين <em>المختلفة</em> في جدول facilities.</p>
<p>الفكرة الأساسية للدالة التجميعية (aggregate function) أنها تأخذ عمودًا من البيانات، وتجري عليه عملية ما، وتُخرج قيمة <em>قياسية</em> (واحدة). وهناك مجموعة أخرى كثيرة من دوال التجميع، منها MAX وMIN وSUM وAVG. وكلها تفعل إلى حد كبير ما تتوقعه من أسمائها :-).</p>
<p>ومن جوانب الدوال التجميعية التي يجدها الناس غالبًا مربكةً الاستعلامات مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> cd.facilities
</code></pre>
<p>جرّبه، وستجد أنه لا يعمل. والسبب أن count(*) تريد طيّ جدول facilities في قيمة واحدة — لكنها للأسف لا تستطيع ذلك، لأن في cd.facilities كثيرًا من قيم facid المختلفة — ولا يعرف Postgres أي facid ينبغي أن يقترن به العدد.</p>
<p>وبدلًا من ذلك، إن أردت استعلامًا يُعيد كل قيم facid مع عدد في كل صف، يمكنك إخراج التجميع إلى استعلام فرعي كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, 
	(<span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> cd.facilities)
	<span class="hljs-keyword">from</span> cd.facilities
</code></pre>
<p>وعندما يكون لدينا استعلام فرعي يُعيد قيمة قياسية كهذه، يعرف Postgres أن يكرّر القيمة ببساطة لكل صف في cd.facilities.</p>
<p><strong>تلميح:</strong> جرّب البحث في دالة COUNT في SQL</p>
<h2 id="2-عد-عدد-المرافق-المكلفة">2. عدّ عدد المرافق المكلفة</h2>
<p><strong>السؤال</strong></p>
<p>أنتج عدد المرافق التي تكون تكلفتها للضيوف 10 أو أكثر.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>count</th>
</tr>
</thead>
<tbody>
<tr>
<td>6</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> cd.facilities <span class="hljs-keyword">where</span> guestcost <span class="hljs-operator">&gt;=</span> <span class="hljs-number">10</span>;
</code></pre>
<p>هذا السؤال مجرد تعديل بسيط على السؤال السابق: نحتاج إلى استبعاد المرافق غير المكلفة. ويسهل فعل ذلك بعبارة WHERE. فلم يبقَ تجميعنا يرى سوى المرافق المكلفة.</p>
<p><strong>تلميح:</strong> ستحتاج إلى إضافة عبارة WHERE إلى إجابة السؤال السابق.</p>
<h2 id="3-عد-عدد-التوصيات-التي-يقدمها-كل-عضو">3. عدّ عدد التوصيات التي يقدّمها كل عضو</h2>
<p><strong>السؤال</strong></p>
<p>أنتج عدد التوصيات التي قدّمها كل عضو. ورتّب بحسب معرّف العضو.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>recommendedby</th>
<th>count</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>5</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>5</td>
<td>1</td>
</tr>
<tr>
<td>6</td>
<td>1</td>
</tr>
<tr>
<td>9</td>
<td>2</td>
</tr>
<tr>
<td>11</td>
<td>1</td>
</tr>
<tr>
<td>13</td>
<td>2</td>
</tr>
<tr>
<td>15</td>
<td>1</td>
</tr>
<tr>
<td>16</td>
<td>1</td>
</tr>
<tr>
<td>20</td>
<td>1</td>
</tr>
<tr>
<td>30</td>
<td>1</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> recommendedby, <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) 
	<span class="hljs-keyword">from</span> cd.members
	<span class="hljs-keyword">where</span> recommendedby <span class="hljs-keyword">is</span> <span class="hljs-keyword">not null</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> recommendedby
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> recommendedby;
</code></pre>
<p>رأينا سابقًا أن دوال التجميع تُطبَّق على عمود من القيم، وتحوّله إلى قيمة قياسية مجمّعة. وهذا مفيد، لكننا كثيرًا ما نجد أننا لا نريد نتيجة مجمّعة واحدة فقط: فمثلًا، بدلًا من معرفة إجمالي المال الذي جناه النادي هذا الشهر، قد أريد معرفة مقدار المال الذي جناه كل مرفق، أو أي أوقات اليوم كانت الأكثر ربحًا.</p>
<p>لدعم هذا النوع من السلوك، توفّر SQL تركيبة GROUP BY. وهي تجمع البيانات في مجموعات، وتشغّل دالة التجميع بصورة منفصلة لكل مجموعة. وعندما تحدد GROUP BY، تنتج قاعدة البيانات قيمة مجمّعة لكل قيمة مميزة في الأعمدة المقدّمة. وفي هذه الحالة، نقول: 'لكل قيمة مميزة من recommendedby، أعطني عدد مرات ظهور تلك القيمة'.</p>
<p><strong>تلميح:</strong> جرّب هذه المرة البحث في GROUP BY مع count. ولا تنسَ تصفية الموصين الفارغين!</p>
<h2 id="4-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق">4. عرض إجمالي الشرائح المحجوزة لكل مرفق</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق. ويكفي في الوقت الحالي إنتاج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب معرّف المرفق.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>Total Slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>1320</td>
</tr>
<tr>
<td>1</td>
<td>1278</td>
</tr>
<tr>
<td>2</td>
<td>1209</td>
</tr>
<tr>
<td>3</td>
<td>830</td>
</tr>
<tr>
<td>4</td>
<td>1404</td>
</tr>
<tr>
<td>5</td>
<td>228</td>
</tr>
<tr>
<td>6</td>
<td>1104</td>
</tr>
<tr>
<td>7</td>
<td>908</td>
</tr>
<tr>
<td>8</td>
<td>911</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid;
</code></pre>
<p>إلى جانب تقديمنا الدالة التجميعية SUM، لا يوجد الكثير مما يُقال عن هذا التمرين. فلكل معرّف مرفق مميز، تجمع دالة SUM كل القيم في عمود slots.</p>
<p><strong>تلميح:</strong> في هذا السؤال ستحتاج إلى الاطلاع على الدالة التجميعية SUM.</p>
<h2 id="5-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-شهر-معين">5. عرض إجمالي الشرائح المحجوزة لكل مرفق في شهر معيّن</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في شهر سبتمبر 2012. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب عدد الشرائح.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>Total Slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>5</td>
<td>122</td>
</tr>
<tr>
<td>3</td>
<td>422</td>
</tr>
<tr>
<td>7</td>
<td>426</td>
</tr>
<tr>
<td>8</td>
<td>471</td>
</tr>
<tr>
<td>6</td>
<td>540</td>
</tr>
<tr>
<td>2</td>
<td>570</td>
</tr>
<tr>
<td>1</td>
<td>588</td>
</tr>
<tr>
<td>0</td>
<td>591</td>
</tr>
<tr>
<td>4</td>
<td>648</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">where</span>
		starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-09-01&#x27;</span>
		<span class="hljs-keyword">and</span> starttime <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2012-10-01&#x27;</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">sum</span>(slots);
</code></pre>
<p>هذا تعديل طفيف على مثالنا السابق. وتذكّر أن التجميع يحدث بعد تقييم عبارة WHERE: لذا نستخدم WHERE لتقييد البيانات التي نجمّعها، فلا يرى تجميعنا إلا بيانات شهر واحد.</p>
<p><strong>تلميح:</strong> يمكنك تقييد البيانات التي تدخل في دوالك التجميعية باستخدام عبارة WHERE.</p>
<h2 id="6-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-كل-شهر">6. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في كل شهر من سنة 2012. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب المعرّف والشهر.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>month</th>
<th>Total Slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>7</td>
<td>270</td>
</tr>
<tr>
<td>0</td>
<td>8</td>
<td>459</td>
</tr>
<tr>
<td>0</td>
<td>9</td>
<td>591</td>
</tr>
<tr>
<td>1</td>
<td>7</td>
<td>207</td>
</tr>
<tr>
<td>1</td>
<td>8</td>
<td>483</td>
</tr>
<tr>
<td>1</td>
<td>9</td>
<td>588</td>
</tr>
<tr>
<td>2</td>
<td>7</td>
<td>180</td>
</tr>
<tr>
<td>2</td>
<td>8</td>
<td>459</td>
</tr>
<tr>
<td>2</td>
<td>9</td>
<td>570</td>
</tr>
<tr>
<td>3</td>
<td>7</td>
<td>104</td>
</tr>
<tr>
<td>3</td>
<td>8</td>
<td>304</td>
</tr>
<tr>
<td>3</td>
<td>9</td>
<td>422</td>
</tr>
<tr>
<td>4</td>
<td>7</td>
<td>264</td>
</tr>
<tr>
<td>4</td>
<td>8</td>
<td>492</td>
</tr>
<tr>
<td>4</td>
<td>9</td>
<td>648</td>
</tr>
<tr>
<td>5</td>
<td>7</td>
<td>24</td>
</tr>
<tr>
<td>5</td>
<td>8</td>
<td>82</td>
</tr>
<tr>
<td>5</td>
<td>9</td>
<td>122</td>
</tr>
<tr>
<td>6</td>
<td>7</td>
<td>164</td>
</tr>
<tr>
<td>6</td>
<td>8</td>
<td>400</td>
</tr>
<tr>
<td>6</td>
<td>9</td>
<td>540</td>
</tr>
<tr>
<td>7</td>
<td>7</td>
<td>156</td>
</tr>
<tr>
<td>7</td>
<td>8</td>
<td>326</td>
</tr>
<tr>
<td>7</td>
<td>9</td>
<td>426</td>
</tr>
<tr>
<td>8</td>
<td>7</td>
<td>117</td>
</tr>
<tr>
<td>8</td>
<td>8</td>
<td>322</td>
</tr>
<tr>
<td>8</td>
<td>9</td>
<td>471</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">where</span> <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-operator">=</span> <span class="hljs-number">2012</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>;
</code></pre>
<p>الجزء الأساسي الجديد في هذا السؤال هو دالة EXTRACT. فهي تتيح لك الحصول على مكونات فردية من طابع زمني، مثل اليوم والشهر والسنة، إلخ. ونجمّع بحسب ناتج هذه الدالة لتوفير قيم لكل شهر. وبديل ذلك، إن احتجنا إلى التمييز بين الشهر نفسه في سنوات مختلفة، استخدام دالة DATE_TRUNC التي تقتطع تاريخًا عند درجة تفصيل معيّنة. ومن الجدير بالذكر أيضًا أن هذه أول مرة نستخدم فيها حقًا القدرة على التجميع بحسب أكثر من عمود واحد.</p>
<p>ومن الأمور التي يجدر مراعاتها في هذه الإجابة أن استخدام دالة EXTRACT في عبارة WHERE قد يسبب مشكلات أداء حادة في الجداول الكبيرة. فإذا كان على عمود الطابع الزمني فهرس عادي، فلن يفهم Postgres أنه يستطيع استخدام الفهرس لتسريع الاستعلام، وسيضطر بدلًا من ذلك إلى مسح الجدول كله. ولديك خياران هنا:</p>
<p>فكّر في إنشاء <a href="https://www.postgresql.org/docs/current/indexes-expressional.html">فهرس قائم على تعبير</a> على عمود الطابع الزمني. فمع فهارس محددة على نحو مناسب، يستطيع Postgres استخدام الفهارس لتسريع عبارات WHERE التي تحتوي نداءات دوال. أو عدّل الاستعلام ليكون أكثر إسهابًا قليلًا، لكن باستخدام مقارنات أكثر معيارية، على سبيل المثال:</p>
<pre><code class="language-sql"> <span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">where</span>
		starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
		<span class="hljs-keyword">and</span> starttime <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2013-01-01&#x27;</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>;
</code></pre>
<p>يستطيع Postgres استخدام فهرس مع هذه المقارنات المعيارية دون أي مساعدة إضافية.</p>
<p><strong>تلميح:</strong> ألقِ نظرة على دالة EXTRACT.</p>
<h2 id="7-إيجاد-عدد-الأعضاء-الذين-أجروا-حجزا-واحدا-على-الأقل">7. إيجاد عدد الأعضاء الذين أجروا حجزًا واحدًا على الأقل</h2>
<p><strong>السؤال</strong></p>
<p>أوجد العدد الإجمالي للأعضاء (بمن فيهم الضيوف) الذين أجروا حجزًا واحدًا على الأقل.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>count</th>
</tr>
</thead>
<tbody>
<tr>
<td>30</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-keyword">distinct</span> memid) <span class="hljs-keyword">from</span> cd.bookings
</code></pre>
<p>قد يكون حدسك الأول استخدام استعلام فرعي هنا. على شيء مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> 
	(<span class="hljs-keyword">select</span> <span class="hljs-keyword">distinct</span> memid <span class="hljs-keyword">from</span> cd.bookings) <span class="hljs-keyword">as</span> mems
</code></pre>
<p>وهذا يعمل على أحسن وجه، لكن يمكننا تبسيطه قليلًا بمساعدة معرفة إضافية صغيرة في صورة COUNT DISTINCT. وهي تفعل ما قد تتوقعه، إذ تعُدّ القيم المميزة في العمود الممرَّر.</p>
<p><strong>تلميح:</strong> ألقِ نظرة على COUNT DISTINCT</p>
<h2 id="8-عرض-المرافق-التي-حجز-فيها-أكثر-من-1000-شريحة">8. عرض المرافق التي حُجز فيها أكثر من 1000 شريحة</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالمرافق التي حُجز فيها أكثر من 1000 شريحة. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب معرّف المرفق.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>Total Slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>1320</td>
</tr>
<tr>
<td>1</td>
<td>1278</td>
</tr>
<tr>
<td>2</td>
<td>1209</td>
</tr>
<tr>
<td>4</td>
<td>1404</td>
</tr>
<tr>
<td>6</td>
<td>1104</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
        <span class="hljs-keyword">from</span> cd.bookings
        <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
        <span class="hljs-keyword">having</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-operator">&gt;</span> <span class="hljs-number">1000</span>
        <span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid
</code></pre>
<p>يتبيّن أن هناك في الواقع كلمة مفتاحية في SQL مصمّمة للمساعدة في تصفية ناتج دوال التجميع. وهذه الكلمة هي HAVING.</p>
<p>يسهل الخلط بين سلوك HAVING وسلوك WHERE. وأفضل طريقة للتفكير في الأمر أنه في سياق استعلام فيه دالة تجميعية، تُستخدم WHERE لتصفية البيانات التي تدخل إلى الدالة التجميعية، بينما تُستخدم HAVING لتصفية البيانات بعد خروجها من الدالة. جرّب أن تجرّب لتستكشف هذا الفرق!</p>
<p><strong>تلميح:</strong> جرّب البحث في عبارة HAVING.</p>
<h2 id="9-إيجاد-الإيراد-الإجمالي-لكل-مرفق">9. إيجاد الإيراد الإجمالي لكل مرفق</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالمرافق مع إيرادها الإجمالي. وينبغي أن يتكوّن جدول الإخراج من اسم المرفق والإيراد، مرتّبًا بحسب الإيراد. وتذكّر أن التكلفة مختلفة للضيوف والأعضاء!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>revenue</th>
</tr>
</thead>
<tbody>
<tr>
<td>Table Tennis</td>
<td>180</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>240</td>
</tr>
<tr>
<td>Pool Table</td>
<td>270</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>1906.5</td>
</tr>
<tr>
<td>Squash Court</td>
<td>13468.0</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>13860</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>14310</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>15810</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>72540</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facs.name, <span class="hljs-built_in">sum</span>(slots <span class="hljs-operator">*</span> <span class="hljs-keyword">case</span>
			<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> facs.guestcost
			<span class="hljs-keyword">else</span> facs.membercost
		<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> revenue
	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
		<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> revenue;
</code></pre>
<p>التعقيد الحقيقي الوحيد في هذا الاستعلام أن الضيوف (معرّف العضو 0) لهم تكلفة مختلفة عن الجميع. فنستخدم عبارة case لإنتاج تكلفة كل جلسة، ثم نجمع تلك الجلسات، مجمّعة بحسب المرفق.</p>
<p><strong>تلميح:</strong> تذكّر عبارة CASE!</p>
<h2 id="10-إيجاد-المرافق-التي-يقل-إيرادها-الإجمالي-عن-1000">10. إيجاد المرافق التي يقل إيرادها الإجمالي عن 1000</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالمرافق التي يقل إيرادها الإجمالي عن 1000. وأنتج جدول إخراج يتكوّن من اسم المرفق والإيراد، مرتّبًا بحسب الإيراد. وتذكّر أن التكلفة مختلفة للضيوف والأعضاء!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>revenue</th>
</tr>
</thead>
<tbody>
<tr>
<td>Table Tennis</td>
<td>180</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>240</td>
</tr>
<tr>
<td>Pool Table</td>
<td>270</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, revenue <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span> facs.name, <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span> 
				<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
				<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
			<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> revenue
		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
	) <span class="hljs-keyword">as</span> agg <span class="hljs-keyword">where</span> revenue <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> revenue;
</code></pre>
<p>ربما حاولت استخدام الكلمة المفتاحية HAVING التي قدّمناها في تمرين سابق، فأنتجت شيئًا مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facs.name, <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span> 
		<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
		<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
	<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> revenue
	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
		<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
	<span class="hljs-keyword">having</span> revenue <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> revenue;
</code></pre>
<p>للأسف، هذا لا يعمل! وستحصل على خطأ من قبيل ERROR: column &quot;revenue&quot; does not exist. فـ Postgres، بخلاف بعض نظم إدارة قواعد البيانات العلائقية الأخرى مثل SQL Server وMySQL، لا يدعم وضع أسماء الأعمدة في عبارة HAVING. وهذا يعني أنه لكي يعمل هذا الاستعلام، سيتعيّن عليك إنتاج شيء مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facs.name, <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span> 
		<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
		<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
	<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> revenue
	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
		<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
	<span class="hljs-keyword">having</span> <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span> 
		<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
		<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
	<span class="hljs-keyword">end</span>) <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> revenue;
</code></pre>
<p>تكرار شيفرة حسابية كبيرة كهذه أمر غير مرتب، لذا يكتفي حلّنا المعتمد بلفّ جسم الاستعلام الرئيسي كاستعلام فرعي، والاختيار منه بعبارة WHERE. وبوجه عام، أنصح باستخدام HAVING في الاستعلامات البسيطة، لأنه يزيد الوضوح. وإلا فإن مقاربة الاستعلام الفرعي هذه غالبًا أسهل استخدامًا.</p>
<p><strong>تلميح:</strong> قد تجد HAVING صعبة الاستخدام هنا. جرّب استعلامًا فرعيًا بدلًا منها. وستحتاج على الأرجح إلى عبارة CASE أيضًا.</p>
<h2 id="11-إخراج-معرف-المرفق-الذي-حجز-فيه-أكبر-عدد-من-الشرائح">11. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح</h2>
<p><strong>السؤال</strong></p>
<p>أخرج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح. ولنقاط إضافية، جرّب نسخة دون عبارة LIMIT. وستبدو هذه النسخة غير مرتبة على الأرجح!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>Total Slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td>1404</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> &quot;Total Slots&quot;
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">desc</span>
LIMIT <span class="hljs-number">1</span>;
</code></pre>
<p>لنبدأ بما يمكن اعتباره أبسط طريقة لفعل ذلك: أنتج قائمة بمعرّفات المرافق وإجمالي عدد الشرائح المستخدمة، ورتّبها بحسب إجمالي عدد الشرائح المستخدمة، واختر النتيجة الأولى فقط.</p>
<p>لكن يجدر إدراك أن لهذه الطريقة ضعفًا كبيرًا. ففي حال التعادل، سنحصل مع ذلك على نتيجة واحدة فقط! وللحصول على كل النتائج ذات الصلة، قد نجرّب استخدام الدالة التجميعية MAX، على شيء مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">max</span>(totalslots) <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots    
		<span class="hljs-keyword">from</span> cd.bookings    
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
	) <span class="hljs-keyword">as</span> sub <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
</code></pre>
<p>المقصود من هذا الاستعلام الحصول على أكبر قيمة totalslots ومعرّف المرفق (أو المعرّفات) المرتبط بها. لكن هذا للأسف لن يعمل! ففي حال وجود عدة قيم facid لها عدد الشرائح المحجوزة نفسه، سيصبح من الملتبس أي facid ينبغي إقرانه بالقيمة الواحدة (أو <em>القياسية</em>) الخارجة من دالة MAX. وهذا يعني أن Postgres سيخبرك بأن facid ينبغي أن يكون في قسم GROUP BY، وهو ما لن ينتج النتائج التي نبحث عنها.</p>
<p>ولنحاول محاولة أولى في استعلام يعمل:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
	<span class="hljs-keyword">having</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-operator">=</span> (<span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(sum2.totalslots) <span class="hljs-keyword">from</span>
		(<span class="hljs-keyword">select</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots
		<span class="hljs-keyword">from</span> cd.bookings
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
		) <span class="hljs-keyword">as</span> sum2);
</code></pre>
<p>ينتج الاستعلام قائمة بمعرّفات المرافق وعدد الشرائح المستخدمة، ثم يستخدم عبارة HAVING تحسب أكبر قيمة totalslots. ونحن نقول في جوهر الأمر: 'أنتج قائمة بقيم facid وعدد الشرائح المحجوزة لكل منها، واستبعد كل ما ليس عدد شرائحه المحجوزة مساويًا للأقصى.'</p>
<p>لكن رغم فائدة HAVING، فإن استعلامنا قبيح إلى حد كبير. ولتحسينه، لنُقدّم مفهومًا جديدًا آخر: <a href="http://www.postgresql.org/docs/current/static/queries-with.html">التعبيرات الجدولية الشائعة</a> (Common Table Expressions، أو CTEs). ويمكن اعتبار تعبيرات CTE تتيح لك تعريف عرض لقاعدة البيانات ضمن استعلامك. وهي مفيدة حقًا في حالات كهذه، حيث تضطر إلى تكرار نفسك كثيرًا.</p>
<p>وتُعرّف تعبيرات CTE بالصورة WITH CTEName as (SQL-Expression). ويمكنك أن ترى استعلامنا معادًا تعريفه باستخدام تعبير CTE أدناه:</p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> sum <span class="hljs-keyword">as</span> (<span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
)
<span class="hljs-keyword">select</span> facid, totalslots 
	<span class="hljs-keyword">from</span> sum
	<span class="hljs-keyword">where</span> totalslots <span class="hljs-operator">=</span> (<span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(totalslots) <span class="hljs-keyword">from</span> sum);
</code></pre>
<p>ويمكنك أن ترى أننا أخرجنا اختياراتنا المتكررة من cd.bookings إلى تعبير CTE واحد، وجعلنا الاستعلام أسهل قراءةً كثيرًا في أثناء ذلك!</p>
<p>لكن انتظر. هناك المزيد. فمن الممكن أيضًا حلّ هذه المسألة باستخدام دوال النافذة. وسنؤجلها إلى وقت لاحق، لكن هناك حلول أفضل لمسائل كهذه.</p>
<p>هذه معلومات كثيرة لتمرين واحد. فلا تقلق كثيرًا إن لم تفهمها كلها الآن — سنعيد استخدام هذه المفاهيم في تمارين لاحقة.</p>
<p><strong>تلميح:</strong> ضع في اعتبارك استخدام الكلمة المفتاحية LIMIT مع ORDER BY. وفي النسخة الخالية من LIMIT، ستحتاج على الأرجح إلى البحث في الكلمة المفتاحية HAVING. واعلم أن النسخة الأخيرة صعبة!</p>
<h2 id="12-عرض-إجمالي-الشرائح-المحجوزة-لكل-مرفق-في-كل-شهر-الجزء-2">12. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر — الجزء 2</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في كل شهر من سنة 2012. وفي هذه النسخة، أدرج صفوف إخراج تحتوي إجماليات لكل الأشهر لكل مرفق، وإجماليًا لكل الأشهر لكل المرافق. وينبغي أن يتكوّن جدول الإخراج من معرّف المرفق والشهر والشرائح، مرتّبًا بحسب المعرّف والشهر. وعند حساب القيم المجمّعة لكل الأشهر وكل قيم facid، أرجع قيم null في عمودَي month وfacid.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>month</th>
<th>slots</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>7</td>
<td>270</td>
</tr>
<tr>
<td>0</td>
<td>8</td>
<td>459</td>
</tr>
<tr>
<td>0</td>
<td>9</td>
<td>591</td>
</tr>
<tr>
<td>0</td>
<td></td>
<td>1320</td>
</tr>
<tr>
<td>1</td>
<td>7</td>
<td>207</td>
</tr>
<tr>
<td>1</td>
<td>8</td>
<td>483</td>
</tr>
<tr>
<td>1</td>
<td>9</td>
<td>588</td>
</tr>
<tr>
<td>1</td>
<td></td>
<td>1278</td>
</tr>
<tr>
<td>2</td>
<td>7</td>
<td>180</td>
</tr>
<tr>
<td>2</td>
<td>8</td>
<td>459</td>
</tr>
<tr>
<td>2</td>
<td>9</td>
<td>570</td>
</tr>
<tr>
<td>2</td>
<td></td>
<td>1209</td>
</tr>
<tr>
<td>3</td>
<td>7</td>
<td>104</td>
</tr>
<tr>
<td>3</td>
<td>8</td>
<td>304</td>
</tr>
<tr>
<td>3</td>
<td>9</td>
<td>422</td>
</tr>
<tr>
<td>3</td>
<td></td>
<td>830</td>
</tr>
<tr>
<td>4</td>
<td>7</td>
<td>264</td>
</tr>
<tr>
<td>4</td>
<td>8</td>
<td>492</td>
</tr>
<tr>
<td>4</td>
<td>9</td>
<td>648</td>
</tr>
<tr>
<td>4</td>
<td></td>
<td>1404</td>
</tr>
<tr>
<td>5</td>
<td>7</td>
<td>24</td>
</tr>
<tr>
<td>5</td>
<td>8</td>
<td>82</td>
</tr>
<tr>
<td>5</td>
<td>9</td>
<td>122</td>
</tr>
<tr>
<td>5</td>
<td></td>
<td>228</td>
</tr>
<tr>
<td>6</td>
<td>7</td>
<td>164</td>
</tr>
<tr>
<td>6</td>
<td>8</td>
<td>400</td>
</tr>
<tr>
<td>6</td>
<td>9</td>
<td>540</td>
</tr>
<tr>
<td>6</td>
<td></td>
<td>1104</td>
</tr>
<tr>
<td>7</td>
<td>7</td>
<td>156</td>
</tr>
<tr>
<td>7</td>
<td>8</td>
<td>326</td>
</tr>
<tr>
<td>7</td>
<td>9</td>
<td>426</td>
</tr>
<tr>
<td>7</td>
<td></td>
<td>908</td>
</tr>
<tr>
<td>8</td>
<td>7</td>
<td>117</td>
</tr>
<tr>
<td>8</td>
<td>8</td>
<td>322</td>
</tr>
<tr>
<td>8</td>
<td>9</td>
<td>471</td>
</tr>
<tr>
<td>8</td>
<td></td>
<td>910</td>
</tr>
<tr>
<td></td>
<td></td>
<td>9191</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> slots
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">where</span>
		starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
		<span class="hljs-keyword">and</span> starttime <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2013-01-01&#x27;</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">rollup</span>(facid, <span class="hljs-keyword">month</span>)
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>;
</code></pre>
<p>عندما نجري تحليل بيانات، نريد أحيانًا تنفيذ مستويات متعددة من التجميع لنتمكن من 'التقريب والتبعيد' إلى أعماق مختلفة. وفي هذه الحالة، قد ننظر إلى الاستخدام الإجمالي لكل مرفق، ثم نريد الغوص لرؤية أدائه على أساس شهري. وباستخدام SQL التي نعرفها حتى الآن، يصبح إنتاج استعلام واحد يفعل ما نريد مرهقًا إلى حد كبير — إذ نضطر فعليًا إلى دمج عدة استعلامات باستخدام UNION ALL:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> slots
    <span class="hljs-keyword">from</span> cd.bookings
    <span class="hljs-keyword">where</span>
        starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
        <span class="hljs-keyword">and</span> starttime <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
        <span class="hljs-keyword">and</span> starttime <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
        <span class="hljs-keyword">and</span> starttime <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2013-01-01&#x27;</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>;
</code></pre>
<p>وكما ترى، ينفّذ كل استعلام فرعي مستوى مختلفًا من التجميع، ونحن نجمع النتائج فقط. ويمكننا تنظيف ذلك كثيرًا بإخراج القواسم المشتركة إلى تعبير CTE:</p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> bookings <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> starttime) <span class="hljs-keyword">as</span> <span class="hljs-keyword">month</span>, slots
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">where</span>
		starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-01-01&#x27;</span>
		<span class="hljs-keyword">and</span> starttime <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2013-01-01&#x27;</span>
)
<span class="hljs-keyword">select</span> facid, <span class="hljs-keyword">month</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">from</span> bookings <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>
<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
<span class="hljs-keyword">select</span> facid, <span class="hljs-keyword">null</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">from</span> bookings <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
<span class="hljs-keyword">select</span> <span class="hljs-keyword">null</span>, <span class="hljs-keyword">null</span>, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">from</span> bookings
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facid, <span class="hljs-keyword">month</span>;
</code></pre>
<p>هذه النسخة ليست مؤذية للنظر أكثر من اللازم، لكنها تصبح مرهقة مع تزايد عدد أعمدة التجميع. ولحسن الحظ، أدخل PostgreSQL 9.5 دعمًا لمُعامل ROLLUP، وقد استخدمناه لتبسيط إجابتنا المعتمدة.</p>
<p>ينتج ROLLUP تسلسلًا هرميًا من التجميعات بالترتيب الممرَّر إليه: فمثلًا، يُخرج ROLLUP(facid, month) تجميعات على (facid, month) و(facid) و(). ولو أردنا تجميعًا لكل المرافق لشهر معيّن (بدلًا من كل الأشهر لمرفق معيّن)، لوجب علينا عكس الترتيب باستخدام ROLLUP(month, facid). وبديلًا، إن أردنا كل التبديلات الممكنة للأعمدة التي نمرّرها، يمكننا استخدام CUBE بدلًا من ROLLUP. وسينتج ذلك (facid, month) و(month) و(facid) و().</p>
<p>وROLLUP وCUBE حالتان خاصتان من GROUPING SETS. وتتيح لك GROUPING SETS تحديد تبديلات التجميع التي تريدها بالضبط: فيمكنك، مثلًا، طلب (facid, month) و(facid) فقط، مع تخطّي التجميع في المستوى الأعلى.</p>
<p><strong>تلميح:</strong> ابحث عن مُعامل ROLLUP في Postgres.</p>
<h2 id="13-عرض-إجمالي-الساعات-المحجوزة-لكل-مرفق-مسمى">13. عرض إجمالي الساعات المحجوزة لكل مرفق مسمّى</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالعدد الإجمالي للساعات المحجوزة لكل مرفق، مع تذكّر أن الشريحة الواحدة مدتها نصف ساعة. وينبغي أن يتكوّن جدول الإخراج من معرّف المرفق واسمه والساعات المحجوزة، مرتّبًا بحسب معرّف المرفق. وحاول تنسيق الساعات إلى منزلتين عشريتين.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>name</th>
<th>Total Hours</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Tennis Court 1</td>
<td>660.00</td>
</tr>
<tr>
<td>1</td>
<td>Tennis Court 2</td>
<td>639.00</td>
</tr>
<tr>
<td>2</td>
<td>Badminton Court</td>
<td>604.50</td>
</tr>
<tr>
<td>3</td>
<td>Table Tennis</td>
<td>415.00</td>
</tr>
<tr>
<td>4</td>
<td>Massage Room 1</td>
<td>702.00</td>
</tr>
<tr>
<td>5</td>
<td>Massage Room 2</td>
<td>114.00</td>
</tr>
<tr>
<td>6</td>
<td>Squash Court</td>
<td>552.00</td>
</tr>
<tr>
<td>7</td>
<td>Snooker Table</td>
<td>454.00</td>
</tr>
<tr>
<td>8</td>
<td>Pool Table</td>
<td>455.50</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facs.facid, facs.name,
	<span class="hljs-built_in">trim</span>(to_char(<span class="hljs-built_in">sum</span>(bks.slots)<span class="hljs-operator">/</span><span class="hljs-number">2.0</span>, <span class="hljs-string">&#x27;9999999999999999D99&#x27;</span>)) <span class="hljs-keyword">as</span> &quot;Total Hours&quot;

	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
		<span class="hljs-keyword">on</span> facs.facid <span class="hljs-operator">=</span> bks.facid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.facid, facs.name
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> facs.facid;
</code></pre>
<p>هناك بضعة أمور صغيرة مثيرة للاهتمام في هذا السؤال. أولًا، ترى أن تجميعنا يعمل على أحسن وجه حين نربط جدولًا آخر بعلاقة 1:1. ولاحظ أيضًا أننا نجمّع بحسب facs.facid وfacs.name معًا. وقد يبدو هذا غريبًا: فبعد كل شيء، بما أن facid هو المفتاح الأساسي لجدول facilities، فلكل facid اسم واحد بالضبط، والتجميع بحسب الحقلين كليهما مماثل للتجميع بحسب facid وحده. بل إنك ستجد أن الاستعلام يعمل على أحسن وجه إن أزلت facs.name من عبارة GROUP BY: إذ يستنتج Postgres وجود هذه العلاقة 1:1، ولا يصرّ على أن نجمّع بحسب العمودين كليهما.</p>
<p>لكن للأسف، بحسب نظام قواعد البيانات الذي نستخدمه، قد لا يكون التحقق بهذا الذكاء، وقد لا يدرك أن العلاقة 1:1 قطعًا. وفي هذه الحالة، لو كانت هناك أسماء متعددة لكل facid ولم نكن جمّعنا بحسب الاسم، لاضطر نظام إدارة قواعد البيانات إلى الاختيار بين عدة خيارات (متساوية الصحة) للاسم. ولأن هذا غير صالح، سيصرّ نظام قاعدة البيانات على أن نجمّع بحسب الحقلين كليهما. وبوجه عام، أنصح بالتجميع بحسب كل الأعمدة التي ليست داخل دالة تجميعية: فهذا يضمن توافقية أفضل بين المنصات.</p>
<p>ثم تأتي القسمة. وقد يعرف من بينكم من هم على دراية بـ MySQL أن القسمات الصحيحة تُحوَّل تلقائيًا إلى أعداد عشرية. أما Postgres فأكثر تقليدية قليلًا في هذا الشأن، ويتوقع منك أن تخبره إن أردت قسمة عشرية. ويمكنك فعل ذلك بسهولة هنا بالقسمة على 2.0 بدلًا من 2.</p>
<p>وأخيرًا، لننظر إلى التنسيق. تحوّل دالة TO_CHAR القيم إلى سلاسل محارف. وهي تأخذ نص تنسيق نحدده كـ(عدد كبير من الأرقام) قبل العلامة العشرية، فالعلامة العشرية، فرقمين بعدها. وقد يُضاف فراغ في مقدمة ناتج هذه الدالة، ولهذا نضمّ دالة TRIM الخارجية.</p>
<p><strong>تلميح:</strong> تذكّر أنه في Postgres تؤدي قسمة عددين صحيحين إلى قسمة صحيحة. وأنت تريد هنا قسمة عشرية. ولتنسيق الساعات، ألقِ نظرة على دالة to_char، مع تذكّر إزالة أي مسافات بيضاء متبقية</p>
<h2 id="14-عرض-أول-حجز-لكل-عضو-بعد-1-سبتمبر-2012">14. عرض أول حجز لكل عضو بعد 1 سبتمبر 2012</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة باسم كل عضو ومعرّفه وأول حجز له بعد 1 سبتمبر 2012. ورتّب بحسب معرّف العضو.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>surname</th>
<th>firstname</th>
<th>memid</th>
<th>starttime</th>
</tr>
</thead>
<tbody>
<tr>
<td>GUEST</td>
<td>GUEST</td>
<td>0</td>
<td>2012-09-01 08:00:00</td>
</tr>
<tr>
<td>Smith</td>
<td>Darren</td>
<td>1</td>
<td>2012-09-01 09:00:00</td>
</tr>
<tr>
<td>Smith</td>
<td>Tracy</td>
<td>2</td>
<td>2012-09-01 11:30:00</td>
</tr>
<tr>
<td>Rownam</td>
<td>Tim</td>
<td>3</td>
<td>2012-09-01 16:00:00</td>
</tr>
<tr>
<td>Joplette</td>
<td>Janice</td>
<td>4</td>
<td>2012-09-01 15:00:00</td>
</tr>
<tr>
<td>Butters</td>
<td>Gerald</td>
<td>5</td>
<td>2012-09-02 12:30:00</td>
</tr>
<tr>
<td>Tracy</td>
<td>Burton</td>
<td>6</td>
<td>2012-09-01 15:00:00</td>
</tr>
<tr>
<td>Dare</td>
<td>Nancy</td>
<td>7</td>
<td>2012-09-01 12:30:00</td>
</tr>
<tr>
<td>Boothe</td>
<td>Tim</td>
<td>8</td>
<td>2012-09-01 08:30:00</td>
</tr>
<tr>
<td>Stibbons</td>
<td>Ponder</td>
<td>9</td>
<td>2012-09-01 11:00:00</td>
</tr>
<tr>
<td>Owen</td>
<td>Charles</td>
<td>10</td>
<td>2012-09-01 11:00:00</td>
</tr>
<tr>
<td>Jones</td>
<td>David</td>
<td>11</td>
<td>2012-09-01 09:30:00</td>
</tr>
<tr>
<td>Baker</td>
<td>Anne</td>
<td>12</td>
<td>2012-09-01 14:30:00</td>
</tr>
<tr>
<td>Farrell</td>
<td>Jemima</td>
<td>13</td>
<td>2012-09-01 09:30:00</td>
</tr>
<tr>
<td>Smith</td>
<td>Jack</td>
<td>14</td>
<td>2012-09-01 11:00:00</td>
</tr>
<tr>
<td>Bader</td>
<td>Florence</td>
<td>15</td>
<td>2012-09-01 10:30:00</td>
</tr>
<tr>
<td>Baker</td>
<td>Timothy</td>
<td>16</td>
<td>2012-09-01 15:00:00</td>
</tr>
<tr>
<td>Pinker</td>
<td>David</td>
<td>17</td>
<td>2012-09-01 08:30:00</td>
</tr>
<tr>
<td>Genting</td>
<td>Matthew</td>
<td>20</td>
<td>2012-09-01 18:00:00</td>
</tr>
<tr>
<td>Mackenzie</td>
<td>Anna</td>
<td>21</td>
<td>2012-09-01 08:30:00</td>
</tr>
<tr>
<td>Coplin</td>
<td>Joan</td>
<td>22</td>
<td>2012-09-02 11:30:00</td>
</tr>
<tr>
<td>Sarwin</td>
<td>Ramnaresh</td>
<td>24</td>
<td>2012-09-04 11:00:00</td>
</tr>
<tr>
<td>Jones</td>
<td>Douglas</td>
<td>26</td>
<td>2012-09-08 13:00:00</td>
</tr>
<tr>
<td>Rumney</td>
<td>Henrietta</td>
<td>27</td>
<td>2012-09-16 13:30:00</td>
</tr>
<tr>
<td>Farrell</td>
<td>David</td>
<td>28</td>
<td>2012-09-18 09:00:00</td>
</tr>
<tr>
<td>Worthington-Smyth</td>
<td>Henry</td>
<td>29</td>
<td>2012-09-19 09:30:00</td>
</tr>
<tr>
<td>Purview</td>
<td>Millicent</td>
<td>30</td>
<td>2012-09-19 11:30:00</td>
</tr>
<tr>
<td>Tupperware</td>
<td>Hyacinth</td>
<td>33</td>
<td>2012-09-20 08:00:00</td>
</tr>
<tr>
<td>Hunt</td>
<td>John</td>
<td>35</td>
<td>2012-09-23 14:00:00</td>
</tr>
<tr>
<td>Crumpet</td>
<td>Erica</td>
<td>36</td>
<td>2012-09-27 11:30:00</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> mems.surname, mems.firstname, mems.memid, <span class="hljs-built_in">min</span>(bks.starttime) <span class="hljs-keyword">as</span> starttime
	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems <span class="hljs-keyword">on</span>
		mems.memid <span class="hljs-operator">=</span> bks.memid
	<span class="hljs-keyword">where</span> starttime <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-09-01&#x27;</span>
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> mems.surname, mems.firstname, mems.memid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> mems.memid;
</code></pre>
<p>توضح هذه الإجابة استخدام دوال التجميع على التواريخ. وتعمل MIN تمامًا كما تتوقع، إذ تستخرج أقل تاريخ ممكن في مجموعة النتائج. ولكي يعمل ذلك، نحتاج إلى ضمان ألا تحتوي مجموعة النتائج إلا تواريخ من سبتمبر فصاعدًا. ونفعل ذلك بعبارة WHERE.</p>
<p>وقد تستخدم استعلامًا كهذا عادةً لإيجاد الحجز التالي لأحد العملاء. ويمكنك استخدامه باستبدال التاريخ '2012-09-01' بالدالة now()</p>
<p><strong>تلميح:</strong> ألقِ نظرة على الدالة التجميعية MIN</p>
<h2 id="15-إنتاج-قائمة-بأسماء-الأعضاء-بحيث-يحتوي-كل-صف-على-العدد-الإجمالي-للأعضاء">15. إنتاج قائمة بأسماء الأعضاء، بحيث يحتوي كل صف على العدد الإجمالي للأعضاء</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بأسماء الأعضاء، بحيث يحتوي كل صف على العدد الإجمالي للأعضاء. ورتّب بحسب تاريخ الانضمام، وأدرج الأعضاء الضيوف.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>count</th>
<th>firstname</th>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>31</td>
<td>GUEST</td>
<td>GUEST</td>
</tr>
<tr>
<td>31</td>
<td>Darren</td>
<td>Smith</td>
</tr>
<tr>
<td>31</td>
<td>Tracy</td>
<td>Smith</td>
</tr>
<tr>
<td>31</td>
<td>Tim</td>
<td>Rownam</td>
</tr>
<tr>
<td>31</td>
<td>Janice</td>
<td>Joplette</td>
</tr>
<tr>
<td>31</td>
<td>Gerald</td>
<td>Butters</td>
</tr>
<tr>
<td>31</td>
<td>Burton</td>
<td>Tracy</td>
</tr>
<tr>
<td>31</td>
<td>Nancy</td>
<td>Dare</td>
</tr>
<tr>
<td>31</td>
<td>Tim</td>
<td>Boothe</td>
</tr>
<tr>
<td>31</td>
<td>Ponder</td>
<td>Stibbons</td>
</tr>
<tr>
<td>31</td>
<td>Charles</td>
<td>Owen</td>
</tr>
<tr>
<td>31</td>
<td>David</td>
<td>Jones</td>
</tr>
<tr>
<td>31</td>
<td>Anne</td>
<td>Baker</td>
</tr>
<tr>
<td>31</td>
<td>Jemima</td>
<td>Farrell</td>
</tr>
<tr>
<td>31</td>
<td>Jack</td>
<td>Smith</td>
</tr>
<tr>
<td>31</td>
<td>Florence</td>
<td>Bader</td>
</tr>
<tr>
<td>31</td>
<td>Timothy</td>
<td>Baker</td>
</tr>
<tr>
<td>31</td>
<td>David</td>
<td>Pinker</td>
</tr>
<tr>
<td>31</td>
<td>Matthew</td>
<td>Genting</td>
</tr>
<tr>
<td>31</td>
<td>Anna</td>
<td>Mackenzie</td>
</tr>
<tr>
<td>31</td>
<td>Joan</td>
<td>Coplin</td>
</tr>
<tr>
<td>31</td>
<td>Ramnaresh</td>
<td>Sarwin</td>
</tr>
<tr>
<td>31</td>
<td>Douglas</td>
<td>Jones</td>
</tr>
<tr>
<td>31</td>
<td>Henrietta</td>
<td>Rumney</td>
</tr>
<tr>
<td>31</td>
<td>David</td>
<td>Farrell</td>
</tr>
<tr>
<td>31</td>
<td>Henry</td>
<td>Worthington-Smyth</td>
</tr>
<tr>
<td>31</td>
<td>Millicent</td>
<td>Purview</td>
</tr>
<tr>
<td>31</td>
<td>Hyacinth</td>
<td>Tupperware</td>
</tr>
<tr>
<td>31</td>
<td>John</td>
<td>Hunt</td>
</tr>
<tr>
<td>31</td>
<td>Erica</td>
<td>Crumpet</td>
</tr>
<tr>
<td>31</td>
<td>Darren</td>
<td>Smith</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">over</span>(), firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>باستخدام المعرفة التي بنيناها حتى الآن، تكون الإجابة الأكثر بداهة كما يلي. ونستخدم استعلامًا فرعيًا لأن SQL ستطلب منا خلاف ذلك التجميع بحسب firstname وsurname، ما ينتج نتيجة مختلفة عمّا نبحث عنه.</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> (<span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> cd.members) <span class="hljs-keyword">as</span> count, firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>لا شيء على الإطلاق خطأ في هذه الإجابة، لكننا اخترنا مقاربة مختلفة لتقديم مفهوم جديد يُسمى دوال النافذة. وتوفّر دوال النافذة قدرات هائلة القوة، بصورة غالبًا ما تكون أكثر ملاءمة من دوال التجميع المعيارية. ورغم أن هذا التمرين مجرد تمرين بسيط، فسنعمل على أمثلة أكثر تعقيدًا في المستقبل القريب.</p>
<p>تعمل دوال النافذة على مجموعة نتائج استعلامك (أو استعلامك الفرعي)، بعد عبارة WHERE وكل التجميع المعياري. وهي تعمل على <em>نافذة</em> من البيانات. وهذه النافذة افتراضيًا غير مقيّدة: أي مجموعة النتائج كلها، لكن يمكن تقييدها لتقديم نتائج أكثر فائدة. فمثلًا، لنفترض أننا نريد، بدلًا من عدد كل الأعضاء، عدد كل الأعضاء الذين انضموا في الشهر نفسه الذي انضم فيه ذلك العضو:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">partition</span> <span class="hljs-keyword">by</span> date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>,joindate)),
	firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>في هذا المثال، نقسّم البيانات بحسب الشهر. ولكل صف تعمل عليه دالة النافذة، تكون النافذة كل الصفوف التي لها joindate في الشهر نفسه. وهكذا تنتج دالة النافذة عدد الأعضاء الذين انضموا في ذلك الشهر.</p>
<p>ويمكنك أن تذهب أبعد من ذلك. تخيّل أنك تريد، بدلًا من العدد الإجمالي للأعضاء الذين انضموا ذلك الشهر، معرفة ترتيب العضو بين المنضمين في ذلك الشهر. ويمكنك فعل ذلك بإضافة ORDER BY إلى دالة النافذة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">partition</span> <span class="hljs-keyword">by</span> date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>,joindate) <span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate),
	firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>وتغيّر ORDER BY النافذة مرة أخرى. فبدلًا من أن تكون نافذة كل صف هي القسم كله، تمتد النافذة من بداية القسم إلى الصف الحالي، دون تجاوزه. وهكذا، بالنسبة لأول عضو ينضم في شهر معيّن، يكون العدد 1. وللثاني يكون 2، وهكذا.</p>
<p>وأمر أخير يجدر ذكره عن دوال النافذة: يمكن أن يكون لديك عدة دوال نافذة غير مترابطة في الاستعلام نفسه. وجرّب الاستعلام أدناه كمثال — سترى الأرقام الخاصة بالأعضاء تسير في اتجاهين متعاكسين! وهذه المرونة قد تؤدي إلى استعلامات أكثر إيجازًا ووضوحًا وسهولة في الصيانة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">partition</span> <span class="hljs-keyword">by</span> date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>,joindate) <span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate <span class="hljs-keyword">asc</span>), 
	<span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">partition</span> <span class="hljs-keyword">by</span> date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>,joindate) <span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate <span class="hljs-keyword">desc</span>), 
	firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>دوال النافذة قوية بشكل استثنائي، وستغيّر طريقة كتابتك لـ SQL وتفكيرك فيها. أحسن استخدامها!</p>
<p><strong>تلميح:</strong> اقرأ عن دالة النافذة COUNT.</p>
<h2 id="16-إنتاج-قائمة-مرقمة-بالأعضاء">16. إنتاج قائمة مرقّمة بالأعضاء</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة مرقّمة متزايدة باطراد بالأعضاء (بمن فيهم الضيوف)، مرتّبة بحسب تاريخ انضمامهم. وتذكّر أن معرّفات الأعضاء لا يُضمن تسلسلها.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>row_number</th>
<th>firstname</th>
<th>surname</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>GUEST</td>
<td>GUEST</td>
</tr>
<tr>
<td>2</td>
<td>Darren</td>
<td>Smith</td>
</tr>
<tr>
<td>3</td>
<td>Tracy</td>
<td>Smith</td>
</tr>
<tr>
<td>4</td>
<td>Tim</td>
<td>Rownam</td>
</tr>
<tr>
<td>5</td>
<td>Janice</td>
<td>Joplette</td>
</tr>
<tr>
<td>6</td>
<td>Gerald</td>
<td>Butters</td>
</tr>
<tr>
<td>7</td>
<td>Burton</td>
<td>Tracy</td>
</tr>
<tr>
<td>8</td>
<td>Nancy</td>
<td>Dare</td>
</tr>
<tr>
<td>9</td>
<td>Tim</td>
<td>Boothe</td>
</tr>
<tr>
<td>10</td>
<td>Ponder</td>
<td>Stibbons</td>
</tr>
<tr>
<td>11</td>
<td>Charles</td>
<td>Owen</td>
</tr>
<tr>
<td>12</td>
<td>David</td>
<td>Jones</td>
</tr>
<tr>
<td>13</td>
<td>Anne</td>
<td>Baker</td>
</tr>
<tr>
<td>14</td>
<td>Jemima</td>
<td>Farrell</td>
</tr>
<tr>
<td>15</td>
<td>Jack</td>
<td>Smith</td>
</tr>
<tr>
<td>16</td>
<td>Florence</td>
<td>Bader</td>
</tr>
<tr>
<td>17</td>
<td>Timothy</td>
<td>Baker</td>
</tr>
<tr>
<td>18</td>
<td>David</td>
<td>Pinker</td>
</tr>
<tr>
<td>19</td>
<td>Matthew</td>
<td>Genting</td>
</tr>
<tr>
<td>20</td>
<td>Anna</td>
<td>Mackenzie</td>
</tr>
<tr>
<td>21</td>
<td>Joan</td>
<td>Coplin</td>
</tr>
<tr>
<td>22</td>
<td>Ramnaresh</td>
<td>Sarwin</td>
</tr>
<tr>
<td>23</td>
<td>Douglas</td>
<td>Jones</td>
</tr>
<tr>
<td>24</td>
<td>Henrietta</td>
<td>Rumney</td>
</tr>
<tr>
<td>25</td>
<td>David</td>
<td>Farrell</td>
</tr>
<tr>
<td>26</td>
<td>Henry</td>
<td>Worthington-Smyth</td>
</tr>
<tr>
<td>27</td>
<td>Millicent</td>
<td>Purview</td>
</tr>
<tr>
<td>28</td>
<td>Hyacinth</td>
<td>Tupperware</td>
</tr>
<tr>
<td>29</td>
<td>John</td>
<td>Hunt</td>
</tr>
<tr>
<td>30</td>
<td>Erica</td>
<td>Crumpet</td>
</tr>
<tr>
<td>31</td>
<td>Darren</td>
<td>Smith</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">row_number</span>() <span class="hljs-keyword">over</span>(<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate), firstname, surname
	<span class="hljs-keyword">from</span> cd.members
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> joindate
</code></pre>
<p>هذا التمرين تدريب بسيط على دوال النافذة! ويمكنك بسهولة مماثلة استخدام count(*) over(order by joindate) هنا، فلا تقلق إن استخدمت ذلك بدلًا منه.</p>
<p>في هذا الاستعلام لا نعرّف قسمًا، ما يعني أن القسم هو مجموعة البيانات كلها. ولأننا نعرّف ترتيبًا لدالة النافذة، فإن النافذة لأي صف معطى هي: من بداية مجموعة البيانات -&gt; الصف الحالي.</p>
<p><strong>تلميح:</strong> اقرأ عن دالة النافذة ROW_NUMBER.</p>
<h2 id="17-إخراج-معرف-المرفق-الذي-حجز-فيه-أكبر-عدد-من-الشرائح-مرة-أخرى">17. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح، مرة أخرى</h2>
<p><strong>السؤال</strong></p>
<p>أخرج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح. وتأكد في حال التعادل من إخراج كل النتائج المتعادلة.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>facid</th>
<th>total</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td>1404</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, total <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) total, <span class="hljs-built_in">rank</span>() <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">desc</span>) rank
        	<span class="hljs-keyword">from</span> cd.bookings
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
	) <span class="hljs-keyword">as</span> ranked
	<span class="hljs-keyword">where</span> rank <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
</code></pre>
<p>قد تتذكر أن هذه مسألة حللناها بالفعل في تمرين سابق. وقد توصّلنا إلى إجابة مثل ما يلي، ثم اختصرناها باستخدام تعبيرات CTE:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots
	<span class="hljs-keyword">from</span> cd.bookings
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
	<span class="hljs-keyword">having</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-operator">=</span> (<span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(sum2.totalslots) <span class="hljs-keyword">from</span>
		(<span class="hljs-keyword">select</span> <span class="hljs-built_in">sum</span>(slots) <span class="hljs-keyword">as</span> totalslots
		<span class="hljs-keyword">from</span> cd.bookings
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
		) <span class="hljs-keyword">as</span> sum2);
</code></pre>
<p>وبعد أن نظّفناها، يصبح هذا الحل ملائمًا تمامًا. لكن شرح كيفية عمل الاستعلام يجعله يبدو غريبًا قليلًا — 'أوجد عدد الشرائح التي حجزها أفضل مرفق. احسب إجمالي الشرائح المحجوزة لكل مرفق، وأعد فقط الصفوف التي يساوي فيها عدد الشرائح المحجوزة عددها لدى الأفضل'. ألن يكون أجمل لو أمكن القول 'احسب عدد الشرائح المحجوزة لكل مرفق، ورتّبها، واختر أي مرفق في المرتبة 1'؟</p>
<p>ولحسن الحظ، تتيح لنا دوال النافذة فعل ذلك — وإن كان من الإنصاف القول إن ذلك ليس بديهيًا للعين غير المدرّبة. وأول معلومة أساسية هي وجود دالة RANK. فهي ترتّب القيم بناءً على ORDER BY الممرَّرة إليها. وإن كان هناك تعادل على (مثلًا) المركز الثاني، فسيأخذ التالي المرتبة 4. إذن، ما نحتاج إلى فعله هو الحصول على عدد الشرائح لكل مرفق، وترتيبها، وانتقاء تلك في المرتبة الأولى. وقد تبدو المحاولة الأولى لذلك على شيء مثل ما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> facid, total <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span> facid, total, <span class="hljs-built_in">rank</span>() <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> total <span class="hljs-keyword">desc</span>) rank <span class="hljs-keyword">from</span> (
		<span class="hljs-keyword">select</span> facid, <span class="hljs-built_in">sum</span>(slots) total
			<span class="hljs-keyword">from</span> cd.bookings
			<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facid
		) <span class="hljs-keyword">as</span> sumslots
	) <span class="hljs-keyword">as</span> ranked
<span class="hljs-keyword">where</span> rank <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
</code></pre>
<p>يحسب الاستعلام الداخلي إجمالي الشرائح المحجوزة، ويرتّبها الأوسط، وينتقي الخارجي الأعلى مرتبة. ويمكننا في الحقيقة ترتيب ذلك قليلًا: تذكّر أن دوال النافذة تُطبَّق متأخرة إلى حد كبير في دالة select، أي بعد التجميع. وهذا يعني أنه يمكننا نقل التجميع إلى جزء ORDER BY من الدالة، كما هو معروض في الإجابة المعتمدة.</p>
<p>ورغم أن مقاربة دالة النافذة ليست أبسط كثيرًا من حيث عدد أسطر الشيفرة، فهي على الأرجح أكثر منطقية دلاليًا.</p>
<p><strong>تلميح:</strong> هذا التمرين صعب قليلًا. ستحتاج إلى دالة النافذة RANK، ومن الجدير بالذكر أنه يمكن استخدام دالة تجميعية داخل عبارة ORDER BY في دالة نافذة.</p>
<h2 id="18-ترتيب-الأعضاء-بحسب-الساعات-المقربة-المستخدمة">18. ترتيب الأعضاء بحسب الساعات (المقرّبة) المستخدمة</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بالأعضاء (بمن فيهم الضيوف)، مع عدد الساعات التي حجزوها في المرافق، مقرّبة إلى أقرب عشر ساعات. ورتّبهم بحسب هذا الرقم المقرّب، مع إخراج الاسم الأول والاسم العائلي والساعات المقرّبة والمرتبة. ورتّب النتائج بحسب المرتبة ثم الاسم العائلي ثم الاسم الأول.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>firstname</th>
<th>surname</th>
<th>hours</th>
<th>rank</th>
</tr>
</thead>
<tbody>
<tr>
<td>GUEST</td>
<td>GUEST</td>
<td>1200</td>
<td>1</td>
</tr>
<tr>
<td>Darren</td>
<td>Smith</td>
<td>340</td>
<td>2</td>
</tr>
<tr>
<td>Tim</td>
<td>Rownam</td>
<td>330</td>
<td>3</td>
</tr>
<tr>
<td>Tim</td>
<td>Boothe</td>
<td>220</td>
<td>4</td>
</tr>
<tr>
<td>Tracy</td>
<td>Smith</td>
<td>220</td>
<td>4</td>
</tr>
<tr>
<td>Gerald</td>
<td>Butters</td>
<td>210</td>
<td>6</td>
</tr>
<tr>
<td>Burton</td>
<td>Tracy</td>
<td>180</td>
<td>7</td>
</tr>
<tr>
<td>Charles</td>
<td>Owen</td>
<td>170</td>
<td>8</td>
</tr>
<tr>
<td>Janice</td>
<td>Joplette</td>
<td>160</td>
<td>9</td>
</tr>
<tr>
<td>Anne</td>
<td>Baker</td>
<td>150</td>
<td>10</td>
</tr>
<tr>
<td>Timothy</td>
<td>Baker</td>
<td>150</td>
<td>10</td>
</tr>
<tr>
<td>David</td>
<td>Jones</td>
<td>150</td>
<td>10</td>
</tr>
<tr>
<td>Nancy</td>
<td>Dare</td>
<td>130</td>
<td>13</td>
</tr>
<tr>
<td>Florence</td>
<td>Bader</td>
<td>120</td>
<td>14</td>
</tr>
<tr>
<td>Anna</td>
<td>Mackenzie</td>
<td>120</td>
<td>14</td>
</tr>
<tr>
<td>Ponder</td>
<td>Stibbons</td>
<td>120</td>
<td>14</td>
</tr>
<tr>
<td>Jack</td>
<td>Smith</td>
<td>110</td>
<td>17</td>
</tr>
<tr>
<td>Jemima</td>
<td>Farrell</td>
<td>90</td>
<td>18</td>
</tr>
<tr>
<td>David</td>
<td>Pinker</td>
<td>80</td>
<td>19</td>
</tr>
<tr>
<td>Ramnaresh</td>
<td>Sarwin</td>
<td>80</td>
<td>19</td>
</tr>
<tr>
<td>Matthew</td>
<td>Genting</td>
<td>70</td>
<td>21</td>
</tr>
<tr>
<td>Joan</td>
<td>Coplin</td>
<td>50</td>
<td>22</td>
</tr>
<tr>
<td>David</td>
<td>Farrell</td>
<td>30</td>
<td>23</td>
</tr>
<tr>
<td>Henry</td>
<td>Worthington-Smyth</td>
<td>30</td>
<td>23</td>
</tr>
<tr>
<td>John</td>
<td>Hunt</td>
<td>20</td>
<td>25</td>
</tr>
<tr>
<td>Douglas</td>
<td>Jones</td>
<td>20</td>
<td>25</td>
</tr>
<tr>
<td>Millicent</td>
<td>Purview</td>
<td>20</td>
<td>25</td>
</tr>
<tr>
<td>Henrietta</td>
<td>Rumney</td>
<td>20</td>
<td>25</td>
</tr>
<tr>
<td>Erica</td>
<td>Crumpet</td>
<td>10</td>
<td>29</td>
</tr>
<tr>
<td>Hyacinth</td>
<td>Tupperware</td>
<td>10</td>
<td>29</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> firstname, surname,
	((<span class="hljs-built_in">sum</span>(bks.slots)<span class="hljs-operator">+</span><span class="hljs-number">10</span>)<span class="hljs-operator">/</span><span class="hljs-number">20</span>)<span class="hljs-operator">*</span><span class="hljs-number">10</span> <span class="hljs-keyword">as</span> hours,
	<span class="hljs-built_in">rank</span>() <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> ((<span class="hljs-built_in">sum</span>(bks.slots)<span class="hljs-operator">+</span><span class="hljs-number">10</span>)<span class="hljs-operator">/</span><span class="hljs-number">20</span>)<span class="hljs-operator">*</span><span class="hljs-number">10</span> <span class="hljs-keyword">desc</span>) <span class="hljs-keyword">as</span> rank

	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
		<span class="hljs-keyword">on</span> bks.memid <span class="hljs-operator">=</span> mems.memid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> mems.memid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> rank, surname, firstname;
</code></pre>
<p>لا تشكّل هذه الإجابة زيادة كبيرة على تمريننا السابق، وإن كانت توضح وظيفة RANK على نحو أفضل. ويمكنك أن ترى أن بعض مرتادي النادي لهم عدد مقرّب متساوٍ من الساعات المحجوزة، ومرتبتهم هي نفسها. وإذا تقاسم عضوان المركز الثاني، فالذي يليهما يأخذ المركز 4. وهناك دالة أخرى، هي DENSE_RANK، كانت ستعطي ذلك العضو المركز 3 بدلًا من ذلك.</p>
<p>ومن الجدير بالذكر التقنية التي نستخدمها للتقريب هنا. فإضافة 5 ثم القسمة على 10 ثم الضرب في 10 لها أثر (بفضل قطع الحساب الصحيح للكسور) تقريب الرقم إلى أقرب 10. وفي حالتنا، لأن الشرائح مدتها نصف ساعة، نحتاج إلى إضافة 10 ثم القسمة على 20 ثم الضرب في 10. ويمكن للمرء بالتأكيد أن يحتج بأن علينا إجراء التحويل من الشرائح إلى الساعات بصورة مستقلة عن التقريب، وهو ما يزيد الوضوح.</p>
<p>وبحديثنا عن الوضوح، بدأ هذا التقريب يُدخل قدرًا ملحوظًا من تكرار الشيفرة. والأمر عند هذه النقطة موكول إلى التقدير، لكن قد ترغب في إخراجه إلى استعلام فرعي كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> firstname, surname, hours, <span class="hljs-built_in">rank</span>() <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> hours <span class="hljs-keyword">desc</span>) <span class="hljs-keyword">from</span>
	(<span class="hljs-keyword">select</span> firstname, surname,
		((<span class="hljs-built_in">sum</span>(bks.slots)<span class="hljs-operator">+</span><span class="hljs-number">10</span>)<span class="hljs-operator">/</span><span class="hljs-number">20</span>)<span class="hljs-operator">*</span><span class="hljs-number">10</span> <span class="hljs-keyword">as</span> hours

		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.members mems
			<span class="hljs-keyword">on</span> bks.memid <span class="hljs-operator">=</span> mems.memid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> mems.memid
	) <span class="hljs-keyword">as</span> subq
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> rank, surname, firstname;
</code></pre>
<p><strong>تلميح:</strong> ستحتاج إلى دالة النافذة RANK مرة أخرى. ويمكنك استخدام الحساب الصحيح لإنجاز التقريب.</p>
<h2 id="19-إيجاد-أفضل-ثلاثة-مرافق-من-حيث-توليد-الإيراد">19. إيجاد أفضل ثلاثة مرافق من حيث توليد الإيراد</h2>
<p><strong>السؤال</strong></p>
<p>أنتج قائمة بأفضل ثلاثة مرافق من حيث توليد الإيراد (مع التعادلات). وأخرج اسم المرفق والمرتبة، مرتّبين بحسب المرتبة ثم اسم المرفق.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>rank</th>
</tr>
</thead>
<tbody>
<tr>
<td>Massage Room 1</td>
<td>1</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>2</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>3</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, rank <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span> facs.name <span class="hljs-keyword">as</span> name, <span class="hljs-built_in">rank</span>() <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
				<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
				<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
			<span class="hljs-keyword">end</span>) <span class="hljs-keyword">desc</span>) <span class="hljs-keyword">as</span> rank
		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
	) <span class="hljs-keyword">as</span> subq
	<span class="hljs-keyword">where</span> rank <span class="hljs-operator">&lt;=</span> <span class="hljs-number">3</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> rank;
</code></pre>
<p>لا يقدّم هذا السؤال أي مفاهيم جديدة، وهو مقصود فقط لمنحك فرصة التدرب على ما تعرفه بالفعل. فنستخدم عبارة CASE لحساب إيراد كل شريحة، ونجمّع ذلك لكل مرفق باستخدام SUM. ثم نستخدم دالة النافذة RANK لإنتاج ترتيب، ونلفّ الأمر كله في استعلام فرعي، ونستخرج كل ما مرتبته أقل من أو تساوي 3.</p>
<p><strong>تلميح:</strong> سؤال آخر قائم على دالة النافذة RANK! تذكّر التعقيد النسبي في حساب إيراد مرفق، إذ يلزمك مراعاة التكاليف المختلفة لمستخدم الضيوف..</p>
<h2 id="20-تصنيف-المرافق-بحسب-القيمة">20. تصنيف المرافق بحسب القيمة</h2>
<p><strong>السؤال</strong></p>
<p>صنّف المرافق إلى مجموعات متساوية الحجم: مرتفعة ومتوسطة ومنخفضة، بناءً على إيرادها. ورتّب بحسب التصنيف ثم اسم المرفق.</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>revenue</th>
</tr>
</thead>
<tbody>
<tr>
<td>Massage Room 1</td>
<td>high</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>high</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>high</td>
</tr>
<tr>
<td>Badminton Court</td>
<td>average</td>
</tr>
<tr>
<td>Squash Court</td>
<td>average</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>average</td>
</tr>
<tr>
<td>Pool Table</td>
<td>low</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>low</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>low</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> name, <span class="hljs-keyword">case</span> <span class="hljs-keyword">when</span> class<span class="hljs-operator">=</span><span class="hljs-number">1</span> <span class="hljs-keyword">then</span> <span class="hljs-string">&#x27;high&#x27;</span>
		<span class="hljs-keyword">when</span> class<span class="hljs-operator">=</span><span class="hljs-number">2</span> <span class="hljs-keyword">then</span> <span class="hljs-string">&#x27;average&#x27;</span>
		<span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;low&#x27;</span>
		<span class="hljs-keyword">end</span> revenue
	<span class="hljs-keyword">from</span> (
		<span class="hljs-keyword">select</span> facs.name <span class="hljs-keyword">as</span> name, <span class="hljs-built_in">ntile</span>(<span class="hljs-number">3</span>) <span class="hljs-keyword">over</span> (<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
				<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
				<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
			<span class="hljs-keyword">end</span>) <span class="hljs-keyword">desc</span>) <span class="hljs-keyword">as</span> class
		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.name
	) <span class="hljs-keyword">as</span> subq
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> class, name;
</code></pre>
<p>ينبغي أن يستخدم هذا التمرين في معظمه مفاهيم مألوفة، وإن كنا نقدّم دالة النافذة NTILE. تجمع NTILE القيم في عدد من المجموعات ممرَّر إليها، بأكبر تساوٍ ممكن. وتُخرج رقمًا من 1 إلى عدد المجموعات. ثم نستخدم عبارة CASE لتحويل ذلك الرقم إلى تصنيف!</p>
<p><strong>تلميح:</strong> ابحث في دالة النافذة NTILE.</p>
<h2 id="21-حساب-زمن-استرداد-التكلفة-لكل-مرفق">21. حساب زمن استرداد التكلفة لكل مرفق</h2>
<p><strong>السؤال</strong></p>
<p>بناءً على الأشهر الثلاثة الكاملة من البيانات حتى الآن، احسب مقدار الوقت الذي سيستغرقه كل مرفق لاسترداد تكلفة تملكه. وتذكّر أن تراعي الصيانة الشهرية المستمرة. وأخرج اسم المرفق وزمن الاسترداد بالأشهر، مرتّبًا بحسب اسم المرفق. ولا تقلق من اختلاف أطوال الأشهر، فنحن نبحث هنا عن قيمة تقريبية فقط!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>name</th>
<th>months</th>
</tr>
</thead>
<tbody>
<tr>
<td>Badminton Court</td>
<td>6.8317677198975235</td>
</tr>
<tr>
<td>Massage Room 1</td>
<td>0.18885741265344664778</td>
</tr>
<tr>
<td>Massage Room 2</td>
<td>1.7621145374449339</td>
</tr>
<tr>
<td>Pool Table</td>
<td>5.3333333333333333</td>
</tr>
<tr>
<td>Snooker Table</td>
<td>6.9230769230769231</td>
</tr>
<tr>
<td>Squash Court</td>
<td>1.1339582703356516</td>
</tr>
<tr>
<td>Table Tennis</td>
<td>6.4000000000000000</td>
</tr>
<tr>
<td>Tennis Court 1</td>
<td>2.2624434389140271</td>
</tr>
<tr>
<td>Tennis Court 2</td>
<td>1.7505470459518600</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> 	facs.name <span class="hljs-keyword">as</span> name,
	facs.initialoutlay<span class="hljs-operator">/</span>((<span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
			<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
			<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
		<span class="hljs-keyword">end</span>)<span class="hljs-operator">/</span><span class="hljs-number">3</span>) <span class="hljs-operator">-</span> facs.monthlymaintenance) <span class="hljs-keyword">as</span> months
	<span class="hljs-keyword">from</span> cd.bookings bks
	<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
		<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
	<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.facid
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> name;
</code></pre>
<p>على النقيض من كل تماريننا الأخيرة، لا حاجة هنا إلى استخدام دوال النافذة لحلّ هذه المسألة: فالأمر مجرد قليل من الحساب يشمل الإيراد الشهري والنفقة الأولية والصيانة الشهرية. ومرة أخرى، في شيفرة الإنتاج قد تريد توضيح ما يجري هنا قليلًا باستخدام استعلام فرعي (وإن كان إدخال ذلك في الإنتاج غير مرجّح، لأننا ثبّتنا عدد الأشهر في الشيفرة!). وقد تبدو نسخة منظّفة كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> 	name, 
	initialoutlay <span class="hljs-operator">/</span> (monthlyrevenue <span class="hljs-operator">-</span> monthlymaintenance) <span class="hljs-keyword">as</span> repaytime 
	<span class="hljs-keyword">from</span> 
		(<span class="hljs-keyword">select</span> facs.name <span class="hljs-keyword">as</span> name, 
			facs.initialoutlay <span class="hljs-keyword">as</span> initialoutlay,
			facs.monthlymaintenance <span class="hljs-keyword">as</span> monthlymaintenance,
			<span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
				<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
				<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
			<span class="hljs-keyword">end</span>)<span class="hljs-operator">/</span><span class="hljs-number">3</span> <span class="hljs-keyword">as</span> monthlyrevenue
		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.facid
	) <span class="hljs-keyword">as</span> subq
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> name;
</code></pre>
<p>لكن، أسمعك تسأل: كيف ستبدو نسخة تلقائية من هذا؟ نسخة لا تحتاج إلى عدد أشهر مثبّت في الشيفرة؟ هذا أكثر تعقيدًا قليلًا، ويتضمن بعض الحساب على التواريخ. وقد أخرجته إلى تعبير CTE ليكون أوضح قليلًا.</p>
<pre><code class="language-sql"><span class="hljs-keyword">with</span> monthdata <span class="hljs-keyword">as</span> (
	<span class="hljs-keyword">select</span> 	mincompletemonth,
		maxcompletemonth,
		(<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">from</span> maxcompletemonth)<span class="hljs-operator">*</span><span class="hljs-number">12</span>) <span class="hljs-operator">+</span>
			<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> maxcompletemonth) <span class="hljs-operator">-</span>
			(<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">from</span> mincompletemonth)<span class="hljs-operator">*</span><span class="hljs-number">12</span>) <span class="hljs-operator">-</span>
			<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">month</span> <span class="hljs-keyword">from</span> mincompletemonth) <span class="hljs-keyword">as</span> nummonths 
	<span class="hljs-keyword">from</span> (
		<span class="hljs-keyword">select</span> 	date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>, 
				(<span class="hljs-keyword">select</span> <span class="hljs-built_in">max</span>(starttime) <span class="hljs-keyword">from</span> cd.bookings)) <span class="hljs-keyword">as</span> maxcompletemonth,
			date_trunc(<span class="hljs-string">&#x27;month&#x27;</span>, 
				(<span class="hljs-keyword">select</span> <span class="hljs-built_in">min</span>(starttime) <span class="hljs-keyword">from</span> cd.bookings)) <span class="hljs-keyword">as</span> mincompletemonth
	) <span class="hljs-keyword">as</span> subq
)
<span class="hljs-keyword">select</span> 	name, 
	initialoutlay <span class="hljs-operator">/</span> (monthlyrevenue <span class="hljs-operator">-</span> monthlymaintenance) <span class="hljs-keyword">as</span> repaytime 
	
	<span class="hljs-keyword">from</span>
		(<span class="hljs-keyword">select</span> facs.name <span class="hljs-keyword">as</span> name,
			facs.initialoutlay <span class="hljs-keyword">as</span> initialoutlay,
			facs.monthlymaintenance <span class="hljs-keyword">as</span> monthlymaintenance,
			<span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
				<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
				<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
			<span class="hljs-keyword">end</span>)<span class="hljs-operator">/</span>(<span class="hljs-keyword">select</span> nummonths <span class="hljs-keyword">from</span> monthdata) <span class="hljs-keyword">as</span> monthlyrevenue
			
			<span class="hljs-keyword">from</span> cd.bookings bks
			<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
				<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
			<span class="hljs-keyword">where</span> bks.starttime <span class="hljs-operator">&lt;</span> (<span class="hljs-keyword">select</span> maxcompletemonth <span class="hljs-keyword">from</span> monthdata)
			<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> facs.facid
		) <span class="hljs-keyword">as</span> subq
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> name;
</code></pre>
<p>تقيّد هذه الشيفرة البيانات الداخلة بالأشهر الكاملة. وتفعل ذلك باختيار أكبر تاريخ، وتقريبه نزولًا إلى الشهر، وإزالة كل التواريخ الأكبر من ذلك. وحتى هذه الشيفرة ليست كاملة تمامًا. فهي لا تتعامل مع حالة تكبّد مرفق خسارة. وإصلاح ذلك ليس صعبًا كثيرًا، وقد تُرك (كتمرين آخر) للقارئ!</p>
<p><strong>تلميح:</strong> لا حاجة إلى استخدام دوال النافذة لحلّ هذه المسألة. ثبّت عدد الأشهر في الشيفرة ليسهل الأمر، أو احسبه لتصعبه.</p>
<h2 id="22-حساب-متوسط-متحرك-للإيراد-الإجمالي">22. حساب متوسط متحرك للإيراد الإجمالي</h2>
<p><strong>السؤال</strong></p>
<p>لكل يوم في أغسطس 2012، احسب متوسطًا متحركًا للإيراد الإجمالي على مدى الأيام الخمسة عشر السابقة. وينبغي أن يحتوي الإخراج على عمودَي date وrevenue، مرتّبين بحسب التاريخ. وتذكّر أن تراعي احتمال أن يكون إيراد يوم ما صفرًا. هذا التمرين صعب قليلًا، فلا تخف من الاطلاع على التلميح!</p>
<p><strong>النتائج المتوقعة</strong></p>
<table>
<thead>
<tr>
<th>date</th>
<th>revenue</th>
</tr>
</thead>
<tbody>
<tr>
<td>2012-08-01</td>
<td>1126.8333333333333333</td>
</tr>
<tr>
<td>2012-08-02</td>
<td>1153.0000000000000000</td>
</tr>
<tr>
<td>2012-08-03</td>
<td>1162.9000000000000000</td>
</tr>
<tr>
<td>2012-08-04</td>
<td>1177.3666666666666667</td>
</tr>
<tr>
<td>2012-08-05</td>
<td>1160.9333333333333333</td>
</tr>
<tr>
<td>2012-08-06</td>
<td>1185.4000000000000000</td>
</tr>
<tr>
<td>2012-08-07</td>
<td>1182.8666666666666667</td>
</tr>
<tr>
<td>2012-08-08</td>
<td>1172.6000000000000000</td>
</tr>
<tr>
<td>2012-08-09</td>
<td>1152.4666666666666667</td>
</tr>
<tr>
<td>2012-08-10</td>
<td>1175.0333333333333333</td>
</tr>
<tr>
<td>2012-08-11</td>
<td>1176.6333333333333333</td>
</tr>
<tr>
<td>2012-08-12</td>
<td>1195.6666666666666667</td>
</tr>
<tr>
<td>2012-08-13</td>
<td>1218.0000000000000000</td>
</tr>
<tr>
<td>2012-08-14</td>
<td>1247.4666666666666667</td>
</tr>
<tr>
<td>2012-08-15</td>
<td>1274.1000000000000000</td>
</tr>
<tr>
<td>2012-08-16</td>
<td>1281.2333333333333333</td>
</tr>
<tr>
<td>2012-08-17</td>
<td>1324.4666666666666667</td>
</tr>
<tr>
<td>2012-08-18</td>
<td>1373.7333333333333333</td>
</tr>
<tr>
<td>2012-08-19</td>
<td>1406.0666666666666667</td>
</tr>
<tr>
<td>2012-08-20</td>
<td>1427.0666666666666667</td>
</tr>
<tr>
<td>2012-08-21</td>
<td>1450.3333333333333333</td>
</tr>
<tr>
<td>2012-08-22</td>
<td>1539.7000000000000000</td>
</tr>
<tr>
<td>2012-08-23</td>
<td>1567.3000000000000000</td>
</tr>
<tr>
<td>2012-08-24</td>
<td>1592.3333333333333333</td>
</tr>
<tr>
<td>2012-08-25</td>
<td>1615.0333333333333333</td>
</tr>
<tr>
<td>2012-08-26</td>
<td>1631.2000000000000000</td>
</tr>
<tr>
<td>2012-08-27</td>
<td>1659.4333333333333333</td>
</tr>
<tr>
<td>2012-08-28</td>
<td>1687.0000000000000000</td>
</tr>
<tr>
<td>2012-08-29</td>
<td>1684.6333333333333333</td>
</tr>
<tr>
<td>2012-08-30</td>
<td>1657.9333333333333333</td>
</tr>
<tr>
<td>2012-08-31</td>
<td>1703.4000000000000000</td>
</tr>
</tbody>
</table>
<p><strong>الإجابة</strong></p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> 	dategen.date,
	(
		<span class="hljs-comment">-- correlated subquery that, for each day fed into it,</span>
		<span class="hljs-comment">-- finds the average revenue for the last 15 days</span>
		<span class="hljs-keyword">select</span> <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
			<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
			<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
		<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> rev

		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">where</span> bks.starttime <span class="hljs-operator">&gt;</span> dategen.date <span class="hljs-operator">-</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;14 days&#x27;</span>
			<span class="hljs-keyword">and</span> bks.starttime <span class="hljs-operator">&lt;</span> dategen.date <span class="hljs-operator">+</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 day&#x27;</span>
	)<span class="hljs-operator">/</span><span class="hljs-number">15</span> <span class="hljs-keyword">as</span> revenue
	<span class="hljs-keyword">from</span>
	(
		<span class="hljs-comment">-- generates a list of days in august</span>
		<span class="hljs-keyword">select</span> 	<span class="hljs-built_in">cast</span>(generate_series(<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-08-01&#x27;</span>,
			<span class="hljs-string">&#x27;2012-08-31&#x27;</span>,<span class="hljs-string">&#x27;1 day&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>
	)  <span class="hljs-keyword">as</span> dategen
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> dategen.date;
</code></pre>
<p>هناك على الأقل حلّان جيدان بالقدر نفسه لهذا السؤال. وقد وضعت أبسطهما كتابةً كإجابة، لكن هناك أيضًا حلًا أكثر مرونة يستخدم دوال النافذة.</p>
<p>لننظر إلى الإجابة المختارة أولًا. حين أقرأ استعلامات SQL، أميل إلى قراءة جزء SELECT أخيرًا — فجزآ FROM وWHERE يميلان إلى مزيد من الإثارة. فما لدينا في FROM؟ نداء لدالة GENERATE_SERIES. وهي تفعل إلى حد كبير ما تقوله حرفيًا — تولّد سلسلة قيم. ويمكنك تحديد قيمة بداية وقيمة توقف وقيمة زيادة. وهي تعمل مع الأنواع الصحيحة والتواريخ — وإن كنا، كما ترى، نحتاج إلى أن نكون صريحين بشأن الأنواع الداخلة إلى الدالة والخارجة منها. حاول إزالة التحويلات وترى النتيجة!</p>
<p>إذن، ولّدنا طابعًا زمنيًا لكل يوم في أغسطس. والآن، نحتاج لكل يوم إلى توليد متوسطنا. ويمكننا فعل ذلك باستخدام <em>استعلام فرعي مترابط</em>. فإن كنت تتذكر، الاستعلام الفرعي المترابط استعلام فرعي يستخدم قيمًا من الاستعلام الخارجي. وهذا يعني أنه يُنفَّذ مرة واحدة لكل صف نتيجة في الاستعلام الخارجي. ويقابله الاستعلام الفرعي غير المترابط، الذي لا يلزم تنفيذه إلا مرة واحدة.</p>
<p>وإذا نظرنا إلى استعلامنا الفرعي المترابط، نرى أنه مترابط على حقل dategen.date. فهو ينتج مجموع الإيراد لهذا اليوم والأيام الأربعة عشر السابقة له، ثم يقسم ذلك المجموع على 15. وهذا ينتج الإخراج الذي نبحث عنه!</p>
<p>ذكرت أن هناك حلًا قائمًا على دوال النافذة لهذه المسألة أيضًا — وتراه أدناه. والمقاربة التي نستخدمها لذلك توليد قائمة بالإيراد لكل يوم، ثم استخدام تجميع دوال النافذة على تلك القائمة. والجميل في هذه الطريقة أنه متى كانت لديك الإيرادات اليومية، أمكنك إنتاج مجموعة واسعة من النتائج بسهولة تامة — فقد تريد، مثلًا، متوسطات متحركة للشهر السابق و15 يومًا و5 أيام. ويسهل فعل ذلك بهذه الطريقة، ويصعب نسبيًا بالتجميع التقليدي.</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-type">date</span>, avgrev <span class="hljs-keyword">from</span> (
	<span class="hljs-comment">-- AVG over this row and the 14 rows before it.</span>
	<span class="hljs-keyword">select</span> 	dategen.date <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>,
		<span class="hljs-built_in">avg</span>(revdata.rev) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> dategen.date <span class="hljs-keyword">rows</span> <span class="hljs-number">14</span> preceding) <span class="hljs-keyword">as</span> avgrev
	<span class="hljs-keyword">from</span>
		<span class="hljs-comment">-- generate a list of days.  This ensures that a row gets generated</span>
		<span class="hljs-comment">-- even if the day has 0 revenue.  Note that we generate days before</span>
		<span class="hljs-comment">-- the start of october - this is because our window function needs</span>
		<span class="hljs-comment">-- to know the revenue for those days for its calculations.</span>
		(<span class="hljs-keyword">select</span>
			<span class="hljs-built_in">cast</span>(generate_series(<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-07-10&#x27;</span>, <span class="hljs-string">&#x27;2012-08-31&#x27;</span>,<span class="hljs-string">&#x27;1 day&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>
		)  <span class="hljs-keyword">as</span> dategen
		<span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>
			<span class="hljs-comment">-- left join to a table of per-day revenue</span>
			(<span class="hljs-keyword">select</span> <span class="hljs-built_in">cast</span>(bks.starttime <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>,
				<span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
					<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
					<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
				<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> rev

				<span class="hljs-keyword">from</span> cd.bookings bks
				<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
					<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
				<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">cast</span>(bks.starttime <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>)
			) <span class="hljs-keyword">as</span> revdata
			<span class="hljs-keyword">on</span> dategen.date <span class="hljs-operator">=</span> revdata.date
	) <span class="hljs-keyword">as</span> subq
	<span class="hljs-keyword">where</span> <span class="hljs-type">date</span> <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-08-01&#x27;</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-type">date</span>;
</code></pre>
<p>ستلاحظ أننا كنا نريد حساب الإيراد اليومي كثيرًا. وبدلًا من إدراج ذلك الحساب في كل استعلاماتنا، وهو أمر غير مرتب إلى حد كبير (وسيسبب لنا صداعًا كبيرًا إن غيّرنا مخططنا يومًا)، نريد على الأرجح تخزين تلك المعلومة في مكان ما. وقد تكون فكرتك الأولى حساب المعلومة وتخزينها في مكان ما للاستخدام لاحقًا. وهذا تكتيك شائع لمستودعات البيانات الكبيرة، لكنه قد يسبب لنا بعض المشكلات — فإذا عدنا يومًا وحرّرنا بياناتنا، فعلينا أن نتذكر إعادة الحساب. وبالنسبة لبيانات ليست هائلة الحجم كالتي ننظر فيها هنا، يمكننا ببساطة إنشاء عرض (view) بدلًا من ذلك. والعرض في جوهره استعلام مخزّن يشبه جدولًا تمامًا. وفي الخفاء، يستبدل نظام إدارة قواعد البيانات الجزء ذا الصلة من تعريف العرض عند اختيارك بيانات منه. وإنشاء العروض سهل جدًا، كما ترى أدناه:</p>
<pre><code class="language-sql"><span class="hljs-keyword">create</span> <span class="hljs-keyword">or</span> replace <span class="hljs-keyword">view</span> cd.dailyrevenue <span class="hljs-keyword">as</span>
	<span class="hljs-keyword">select</span> 	<span class="hljs-built_in">cast</span>(bks.starttime <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>,
		<span class="hljs-built_in">sum</span>(<span class="hljs-keyword">case</span>
			<span class="hljs-keyword">when</span> memid <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> slots <span class="hljs-operator">*</span> facs.guestcost
			<span class="hljs-keyword">else</span> slots <span class="hljs-operator">*</span> membercost
		<span class="hljs-keyword">end</span>) <span class="hljs-keyword">as</span> rev

		<span class="hljs-keyword">from</span> cd.bookings bks
		<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> cd.facilities facs
			<span class="hljs-keyword">on</span> bks.facid <span class="hljs-operator">=</span> facs.facid
		<span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> <span class="hljs-built_in">cast</span>(bks.starttime <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>);
</code></pre>
<p>ويمكنك أن ترى أن هذا يجعل استعلامنا أبسط كثيرًا!</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-type">date</span>, avgrev <span class="hljs-keyword">from</span> (
	<span class="hljs-keyword">select</span>  dategen.date <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>,
		<span class="hljs-built_in">avg</span>(revdata.rev) <span class="hljs-keyword">over</span>(<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> dategen.date <span class="hljs-keyword">rows</span> <span class="hljs-number">14</span> preceding) <span class="hljs-keyword">as</span> avgrev
	<span class="hljs-keyword">from</span>		
		(<span class="hljs-keyword">select</span>
			<span class="hljs-built_in">cast</span>(generate_series(<span class="hljs-type">timestamp</span> <span class="hljs-string">&#x27;2012-07-10&#x27;</span>, <span class="hljs-string">&#x27;2012-08-31&#x27;</span>,<span class="hljs-string">&#x27;1 day&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">date</span>
		)  <span class="hljs-keyword">as</span> dategen
		<span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>
			cd.dailyrevenue <span class="hljs-keyword">as</span> revdata <span class="hljs-keyword">on</span> dategen.date <span class="hljs-operator">=</span> revdata.date
		) <span class="hljs-keyword">as</span> subq
	<span class="hljs-keyword">where</span> <span class="hljs-type">date</span> <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;2012-08-01&#x27;</span>
<span class="hljs-keyword">order</span> <span class="hljs-keyword">by</span> <span class="hljs-type">date</span>;
</code></pre>
<p>وإلى جانب تخزين أجزاء الاستعلامات كثيرة الاستخدام، يمكن استخدام العروض لأغراض متنوعة، منها تقييد الوصول إلى أعمدة معيّنة من جدول.</p>
<p><strong>تلميح:</strong> ستحتاج إلى توليد قائمة أيام: راجع GENERATE_SERIES لذلك. وبعدها يمكنك حلّ هذه المسألة باستخدام دوال التجميع أو دوال النافذة.</p>
`,r={book:s,chapter:n,chapterTitle:t,slug:a,title:d,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,r as default,p as headings,l as html,a as slug,d as title};
