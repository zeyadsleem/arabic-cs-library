const s="use-the-index-luke",e="sql-partial-results-fetch-next-page",a="Paging Through Results",n="index",o="التنقّل عبر الصفحات في النتائج",p=[{depth:2,id:"الشكل-72-الوصول-باستخدام-طريقة-الإزاحة",text:"الشكل 7.2 الوصول باستخدام طريقة الإزاحة"},{depth:2,id:"قيم-الصف-في-sql",text:"قيم الصف في SQL"},{depth:2,id:"فهرسة-المنطق-المكافئ",text:"فهرسة المنطق المكافئ"},{depth:2,id:"الشكل-73-الوصول-باستخدام-طريقة-البحث-بالمفتاح",text:"الشكل 7.3 الوصول باستخدام طريقة البحث بالمفتاح"},{depth:2,id:"الشكل-75-مصفوفة-قواعد-البياناتالميزات",text:"الشكل 7.5 مصفوفة قواعد البيانات/الميزات"}],l=`<p>بعد تنفيذ <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-top-n-queries/index">استعلام Top-N متدفق</a> لاسترجاع الصفحة الأولى بكفاءة، ستحتاج غالباً إلى استعلام آخر لجلب الصفحات التالية. ويتمثل التحدي الناتج في أنه يجب تخطي صفوف الصفحات السابقة. وهناك طريقتان مختلفتان لمواجهة هذا التحدي: أولاً <em>طريقة الإزاحة (offset method)</em>، التي ترقّم الصفوف من البداية وتستخدم مرشّحاً على رقم الصف هذا لاستبعاد الصفوف السابقة للصفحة المطلوبة. والطريقة الثانية، التي أسميها <em>طريقة البحث بالمفتاح (seek method)</em>، تبحث عن المدخل الأخير من الصفحة السابقة وتجلب الصفوف التالية فقط.</p>
<p>تعرض الأمثلة التالية طريقة الإزاحة الأوسع استخداماً. وميزتها الأساسية أنها سهلة التعامل جداً — وبخاصة مع قواعد البيانات التي تملك كلمة مفتاحية مخصصة لها (<code>offset</code>). بل أُدرجت هذه الكلمة في معيار SQL كجزء من امتداد <code>fetch first</code>.Db2 (LUW)تدعم Db2 الكلمة <code>offset</code> منذ الإصدار 11.1. أما البديل المتوافق مع المعيار باستخدام <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-window-functions/index">دالة النافذة <code>ROW_NUMBER()</code> (انظر القسم التالي)</a> فيعمل في الإصدارات الأقدم. وهناك طريقتان أخريان للحصول على وظيفة الإزاحة، وليس أي منهما مستحسنة: (1) استخدام <code>db2set DB2_COMPATIBILITY_VECTOR=MYS</code> لتمكين <code>limit</code> و<code>offset</code> كما تدعمهما MySQL، غير أن ذلك لا يسمح بدمج <code>fetch first</code> مع <code>offset</code>؛ (2) استخدام <code>db2set DB2_COMPATIBILITY_VECTOR=ORA</code> للحصول على العمود الزائف <code>ROWNUM</code> في Oracle (انظر مثال Oracle).</p>
<p>MySQL</p>
<p>تقدّم MySQL وPostgreSQL جملة <code>offset</code> لاستبعاد العدد المحدد من الصفوف من بداية استعلام Top-N. وتُطبَّق جملة <code>limit</code> بعد ذلك.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 LIMIT <span class="hljs-number">10</span> <span class="hljs-keyword">OFFSET</span> <span class="hljs-number">10</span>
</code></pre>
<p>Oracle</p>
<p>تدعم قاعدة بيانات Oracle الكلمة <code>offset</code> منذ الإصدار 12c. وتوفّر الإصدارات الأقدم العمود الزائف <code>ROWNUM</code> الذي يرقّم صفوف مجموعة النتائج تلقائياً. غير أنه لا يمكن تطبيق مرشّح أكبر من أو يساوي (<code>&gt;=</code>) على هذا العمود الزائف. ولجعل ذلك يعمل، يجب أولاً «تجسيد» أرقام الصفوف بإعادة تسمية العمود باسم مستعار.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> ( <span class="hljs-keyword">SELECT</span> tmp.<span class="hljs-operator">*</span>, rownum rn
           <span class="hljs-keyword">FROM</span> ( <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
                    <span class="hljs-keyword">FROM</span> sales
                   <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
                ) tmp
          <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">20</span>
       )
 <span class="hljs-keyword">WHERE</span> rn <span class="hljs-operator">&gt;</span> <span class="hljs-number">10</span>
</code></pre>
<p>لاحظ استخدام الاسم المستعار <code>RN</code> للحد الأدنى، واستخدام العمود الزائف <code>ROWNUM</code> نفسه للحد الأعلى (شكراً لـ<a href="https://www.reddit.com/r/programming/comments/p7lgl/sql_pagination_in_constant_time_using_the_seek/c3n7s19/">Tom Kyte</a>).</p>
<p>PostgreSQL</p>
<p>يعرّف امتداد <code>fetch first</code> جملة <code>offset ... rows</code> أيضاً. غير أن PostgreSQL لا يقبل سوى <code>offset</code> دون الكلمة <code>rows</code>. ولا تزال صيغة <code>limit/offset</code> المستخدمة سابقاً تعمل كما في مثال MySQL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
<span class="hljs-keyword">OFFSET</span> <span class="hljs-number">10</span>
 <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>SQL Server</p>
<p>ليس في SQL Server امتداد «offset» لجملته المملوكة <code>top</code>، لكنه أدخل امتداد <code>fetch first</code> مع SQL Server 2012. وجملة <code>offset</code> إلزامية رغم أن المعيار يعرّفها كإضافة اختيارية.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
<span class="hljs-keyword">OFFSET</span> <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span>
 <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>وإلى جانب البساطة، من مزايا هذه الطريقة أنك تحتاج فقط إلى إزاحة الصفوف لجلب صفحة اعتباطية. غير أن قاعدة البيانات يجب أن تعُدّ جميع الصفوف من البداية حتى تصل إلى الصفحة المطلوبة. ويُظهر <a href="#fig07_02">الشكل 7.2</a> أن نطاق الفهرس الممسوح يكبر عند جلب صفحات أكثر.</p>
<h2 id="الشكل-72-الوصول-باستخدام-طريقة-الإزاحة">الشكل 7.2 الوصول باستخدام طريقة الإزاحة</h2>
<p>ولهذا عيبان: (1) تنزاح الصفحات عند إدراج مبيعات جديدة لأن الترقيم يجري دائماً من الصفر؛ (2) يزداد زمن الاستجابة عند التصفح إلى الخلف أكثر.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-next-page&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وتتجنّب طريقة البحث بالمفتاح المشكلتين معاً لأنها تستخدم <em>قيم</em> الصفحة السابقة فاصلاً. ويعني ذلك أنها تبحث عن القيم التي يجب أن تأتي <em>بعد</em> المدخل الأخير من الصفحة السابقة. ويمكن التعبير عن ذلك بجملة <code>where</code> بسيطة. وبعبارة معكوسة: طريقة البحث بالمفتاح لا تختار ببساطة القيم المعروضة أصلاً.</p>
<p>يعرض المثال التالي طريقة البحث بالمفتاح. ولأغراض العرض، سنبدأ بافتراض وجود عملية بيع واحدة في اليوم فقط، ما يجعل <code>SALE_DATE</code> مفتاحاً فريداً. ولاختيار المبيعات التي يجب أن تأتي بعد تاريخ معيّن، يجب أن تستخدم شرط أصغر من (\`\`). وتُستخدم جملة <code>fetch first</code> فقط لقصر النتيجة على عشرة صفوف.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&lt;</span> ?
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>فبدلاً من رقم صف، تستخدم القيمة الأخيرة من الصفحة السابقة لتحديد الحد الأدنى. ولهذا فائدة هائلة في الأداء لأن قاعدة البيانات تستطيع استخدام الشرط <code>SALE_DATE &lt; ?</code> للوصول إلى الفهرس؛ أي إن قاعدة البيانات تستطيع تخطي صفوف الصفحات السابقة فعلاً. وفوق ذلك، ستحصل أيضاً على نتائج مستقرة إذا أُدرجت صفوف جديدة.</p>
<p>ومع ذلك، لا تعمل هذه الطريقة إذا كانت هناك أكثر من عملية بيع في اليوم — كما في <a href="#fig07_02">الشكل 7.2</a> — لأن استخدام آخر تاريخ من الصفحة الأولى («الأمس») يتخطى <em>جميع</em> نتائج الأمس، لا تلك المعروضة في الصفحة الأولى فقط. والمشكلة أن جملة <code>order by</code> لا تنشئ تسلسلاً حتمياً للصفوف، مع أنه شرط مسبق لاستخدام شرط نطاق بسيط لفواصل الصفحات.</p>
<p>وبدون جملة <code>order by</code> حتمية، لا تعيد قاعدة البيانات بحكم التعريف تسلسلاً حتمياً للصفوف. والسبب الوحيد الذي يجعلك <em>عادةً</em> تحصل على تسلسل صفوف متسق هو أن قاعدة البيانات <em>عادةً</em> تنفّذ الاستعلام بالطريقة نفسها. غير أن قاعدة البيانات قد تخلط فعلاً الصفوف التي لها <code>SALE_DATE</code> نفسها وتبقى مع ذلك محقّقة لجملة <code>order by</code>. وفي الإصدارات الحديثة قد يحدث حقاً أن تحصل على النتيجة بترتيب مختلف في كل مرة تنفّذ فيها الاستعلام، لا لأن قاعدة البيانات تخلط النتيجة عمداً بل لأنها قد تستخدم تنفيذ الاستعلام على نحو متوازٍ؛ ويعني ذلك أن خطة التنفيذ نفسها قد تعطي تسلسل صفوف مختلفاً لأن خيوط التنفيذ تنتهي بترتيب غير حتمي.</p>
<h4>مهم</h4>
<p>يتطلب ترقيم الصفحات ترتيب فرز حتمياً.</p>
<p>وحتى إذا كانت المواصفات الوظيفية تتطلب فقط الفرز «حسب التاريخ، الأحدث أولاً»، فيجب علينا نحن المطوّرين أن نضمن أن جملة <code>order by</code> تعطي تسلسل صفوف حتمياً. ولهذا الغرض، قد نحتاج إلى توسيع جملة <code>order by</code> بأعمدة اعتباطية فقط لضمان الحصول على تسلسل صفوف حتمي. وإذا كان للفهرس المستخدم في <code>order by</code> المتدفق أعمدة إضافية، فمن الجيد البدء بإضافتها إلى جملة <code>order by</code> حتى نواصل استخدام هذا الفهرس لـ<code>order by</code> المتدفق. وإذا لم يعطِ ذلك بعدُ ترتيب فرز حتمياً، فأضف أي عمود فريد ووسّع الفهرس وفقاً لذلك.</p>
<p>في المثال التالي، نوسّع جملة <code>order by</code> والفهرس بالمفتاح الأساسي <code>SALE_ID</code> للحصول على تسلسل صفوف حتمي. علاوة على ذلك، يجب أن نطبّق منطق «يأتي بعد» على العمودين <em>معاً</em> للحصول على النتيجة المطلوبة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sl_dtid <span class="hljs-keyword">ON</span> sales (sale_date, sale_id)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> (sale_date, sale_id) <span class="hljs-operator">&lt;</span> (?, ?)
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, sale_id <span class="hljs-keyword">DESC</span>
 <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>تستخدم جملة <code>where</code> صيغة «قيم الصف» قليلة الشهرة (انظر المربع المعنون <a href="#sb-row-values">«<em>قيم الصف في SQL</em>»</a>). وهي تدمج قيماً متعددة في وحدة منطقية واحدة قابلة للتطبيق على معاملات المقارنة العادية. وكما في القيم العددية، يقابل شرط أصغر من «يأتي بعد» عند الفرز بترتيب تنازلي. ويعني ذلك أن الاستعلام ينظر فقط في المبيعات التي تأتي بعد زوج <code>SALE_DATE</code> و<code>SALE_ID</code> المعطى.</p>
<h2 id="قيم-الصف-في-sql">قيم الصف في SQL <span class="content-anchor" id="sb-row-values"></span></h2>
<p>إلى جانب القيم العددية العادية، يعرّف معيار SQL أيضاً ما يسمى <em>بواني قيم الصف (row value constructors)</em>. وهي «تحدد مجموعة مرتبة من القيم تُبنى في صف أو صف جزئي» [<a href="https://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt">SQL:92</a>، §7.1: <row value constructor>]. ومن الناحية النحوية، قيم الصف قوائم بين قوسين، وهذه الصيغة أشهر ما تكون في عبارة <code>insert</code>.</p>
<p>غير أن استخدام بواني قيم الصف في جملة <code>where</code> أقل شهرة لكنه سليم تماماً. بل يعرّف معيار SQL جميع معاملات المقارنة لبواني قيم الصف. وتعريف عمليات أصغر من مثلاً كما يلي:<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></p>
<p>X &lt; Y صحيحة إذا وفقط إذا كانت Xi = Yi صحيحة لكل i &lt; n وكانت Xn &lt; Yn لبعض n.</p>
<p>حيث <em>i</em> و<em>n</em> يعكسان فهارس المواضع في القوائم. ويعني ذلك أن قيمة الصف X أصغر من Y إذا كانت أي قيمة Xn أصغر من Yn المقابلة وكانت جميع أزواج القيم السابقة متساوية (<em>Xi = Yi لـi&lt;n</em>).</p>
<p>ويجعل هذا التعريف التعبير X &lt; Y مرادفاً لـ«X يُرتَّب قبل Y»، وهو بالضبط المنطق الذي نحتاجه لطريقة البحث بالمفتاح.</p>
<p>ومع أن صيغة قيم الصف جزء من معيار SQL، فلا تدعمها سوى قواعد بيانات قليلة. ولا تدعم SQL Server 2017 قيم الصف إطلاقاً. وتدعم قاعدة بيانات Oracle قيم الصف من حيث المبدأ، لكنها لا تستطيع تطبيق معاملات النطاق عليها (ORA-01796). وتقيّم MySQL تعبيرات قيم الصف تقييماً صحيحاً لكنها لا تستطيع استخدامها كمُسند وصول أثناء الوصول إلى الفهرس. أما Db2 (في LUW فقط، منذ 10.1) وPostgreSQL (منذ 8.4) فلديهما دعم سليم لمُسندات قيم الصف <em>و</em>يستخدمانها للوصول إلى الفهرس إذا توفر فهرس مناسب.</p>
<p>ومع ذلك يمكن استخدام صيغة تقريبية من طريقة البحث بالمفتاح مع قواعد البيانات التي لا تدعم قيم الصف دعماً سليماً — حتى لو لم يكن التقريب بأناقة وكفاءة قيم الصف في PostgreSQL. ولهذا التقريب، يجب استخدام مقارنات «عادية» للتعبير عن المنطق المطلوب كما في مثال Oracle التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> ( <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
           <span class="hljs-keyword">FROM</span> sales
          <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&lt;=</span> ?
            <span class="hljs-keyword">AND</span> <span class="hljs-keyword">NOT</span> (sale_date <span class="hljs-operator">=</span> ? <span class="hljs-keyword">AND</span> sale_id <span class="hljs-operator">&gt;=</span> ?)
          <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, sale_id <span class="hljs-keyword">DESC</span>
       )
 <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">10</span>
</code></pre>
<p>تتألف جملة <code>where</code> من جزأين. ينظر الجزء الأول في <code>SALE_DATE</code> وحده ويستخدم شرط أصغر من أو يساوي (<code>&lt;=</code>) — فهو يختار صفوفاً أكثر من اللازم. وهذا الجزء من جملة <code>where</code> بسيط بما يكفي لتستخدمه جميع قواعد البيانات للوصول إلى الفهرس. أما الجزء الثاني من جملة <code>where</code> فيزيل الصفوف الزائدة المعروضة أصلاً في الصفحة السابقة. ويشرح المربع المعنون <a href="#sb-equivalent-logic">«<em>فهرسة المنطق المكافئ</em>»</a> سبب صياغة جملة <code>where</code> بهذه الطريقة.</p>
<h2 id="فهرسة-المنطق-المكافئ">فهرسة المنطق المكافئ <span class="content-anchor" id="sb-equivalent-logic"></span></h2>
<p>يمكن التعبير عن شرط منطقي دائماً بطرق مختلفة؛ فيمكنك مثلاً تنفيذ منطق التخطي المعروض أعلاه كما يلي:</p>
<pre><code>WHERE (
         (sale_date &lt; ?)
       OR
         (sale_date = ? AND sale_id &lt; ?)
      )
</code></pre>
<p>لا يستخدم هذا البديل سوى شروط ضمّية، وهو على الأرجح أسهل فهماً — للبشر على الأقل. أما قواعد البيانات فوجهة نظرها مختلفة؛ فهي لا تدرك أن جملة <code>where</code> تختار جميع الصفوف بدءاً من زوج <code>SALE_DATE</code>/<code>SALE_ID</code> المعني — بشرط أن يكون <code>SALE_DATE</code> نفسه في الفرعين. وبدلاً من ذلك تستخدم قاعدة البيانات جملة <code>where</code> بأكملها كمُسند ترشيح. ويمكننا على الأقل توقع أن «يستخرج المُحسِّن الشرط <code>SALE_DATE &lt;= ?</code>» من فرعي أو، لكن أياً من قواعد البيانات لا يقدم هذه الخدمة.</p>
<p>ومع ذلك يمكننا إضافة هذا الشرط المكرّر يدوياً — حتى لو لم يزد مقروئية:</p>
<pre><code>WHERE sale_date &lt;= ?
  AND (
         (sale_date &lt; ?)
       OR
         (sale_date = ? AND sale_id &lt; ?)
      )
</code></pre>
<p>ولحسن الحظ، تستطيع جميع قواعد البيانات استخدام هذا الجزء من جملة <code>where</code> كمُسند وصول. غير أن هذه الجملة أصعب في الاستيعاب من منطق التقريب المعروض أعلاه. علاوة على ذلك، يتجنب المنطق الأصلي خطر إزالة الجزء «غير الضروري» (المكرّر) من جملة <code>where</code> لاحقاً عن غير قصد.</p>
<p>وتُظهر خطة التنفيذ أن قاعدة البيانات تستخدم الجزء الأول من جملة <code>where</code> كمُسند وصول.</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                      | Name    |  Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT               |         |    10 |    4 |
|*1 |  COUNT STOPKEY                 |         |       |      |
| 2 |   VIEW                         |         |    10 |    4 |
| 3 |    TABLE ACCESS BY INDEX ROWID | SALES   | 50218 |    4 |
|*4 |     INDEX RANGE SCAN DESCENDING| SL_DTIT |     2 |    3 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter(ROWNUM&lt;=10)
   4 - access(&quot;SALE_DATE&quot;&lt;=:SALE_DATE)
       filter(&quot;SALE_DATE&quot;&lt;&gt;:SALE_DATE
           OR &quot;SALE_ID&quot;&lt;TO_NUMBER(:SALE_ID))
</code></pre>
<p>وتمكّن مُسندات الوصول على <code>SALE_DATE</code> قاعدة البيانات من تخطي الأيام التي عُرضت بالكامل في الصفحات السابقة. أما الجزء الثاني من جملة <code>where</code> فهو مُسند ترشيح فقط؛ ويعني ذلك أن قاعدة البيانات تفحص بضعة مدخلات من الصفحة السابقة مرة أخرى لكنها تسقطها فوراً. ويعرض <a href="#fig07_03">الشكل 7.3</a> مسار الوصول المعني.</p>
<h2 id="الشكل-73-الوصول-باستخدام-طريقة-البحث-بالمفتاح">الشكل 7.3 الوصول باستخدام طريقة البحث بالمفتاح</h2>
<p>يقارن <a href="#fig07_04">الشكل 7.4</a> خصائص الأداء في طريقتي الإزاحة والبحث بالمفتاح. ودقة القياس غير كافية لرؤية الفرق في الجهة اليسرى من المخطط، لكن الفرق ظاهر بوضوح بدءاً من الصفحة 20 تقريباً.</p>
<p>الشكل 7.4 قابلية التوسع عند جلب الصفحة التاليةولطريقة البحث بالمفتاح عيوب أيضاً، وأهمها صعوبة التعامل معها؛ إذ لا يجب عليك صياغة جملة <code>where</code> بعناية فحسب، بل لا تستطيع أيضاً جلب صفحات اعتباطية. علاوة على ذلك، تحتاج إلى عكس جميع عمليات المقارنة والفرز لتغيير اتجاه التصفح. وهاتان الوظيفتان تحديداً — تخطي الصفحات والتصفح إلى الخلف — غير مطلوبتين عند استخدام آلية التمرير اللانهائي في واجهة المستخدم.</p>
<h2 id="الشكل-75-مصفوفة-قواعد-البياناتالميزات">الشكل 7.5 مصفوفة قواعد البيانات/الميزات</h2>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>ISO/IEC 9075-2:2023 §8.2 GR 1bi2 <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,c={book:s,chapter:e,chapterTitle:a,slug:n,title:o,headings:p,html:l};export{s as book,e as chapter,a as chapterTitle,c as default,p as headings,l as html,n as slug,o as title};
