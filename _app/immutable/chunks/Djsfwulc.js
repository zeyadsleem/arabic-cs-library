const s="hello-algo",n="chapter_sorting",t="الترتيب",a="quick_sort",l="الترتيب السريع",p=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"},{depth:2,id:"لماذا-يعد-الترتيب-السريع-سريعا",text:"لماذا يُعدّ الترتيب السريع سريعاً"},{depth:2,id:"تحسين-المحور",text:"تحسين المحور"},{depth:2,id:"تحسين-عمق-التعاود",text:"تحسين عمق التعاود"}],o=`<p><u>الترتيب السريع</u> (quick sort) خوارزمية ترتيب فعّالة واسعة الانتشار تقوم على استراتيجية التقسيم والتغلب.</p>
<p>العملية الجوهرية في الترتيب السريع هي «التقسيم بالمحمّي» (sentinel partitioning)، وهدفها اختيار عنصر «محوراً»، ونقل جميع العناصر الأصغر من المحور إلى يساره، وجميع العناصر الأكبر منه إلى يمينه. ويوضح الشكل أدناه هذه العملية تحديداً.</p>
<ol>
<li>اختر العنصر الواقع في أقصى اليسار محوراً، ونهيّئ مؤشرين <code>i</code> و<code>j</code> عند طرفي المصفوفة.</li>
<li>ادخل في حلقة. في كل جولة، استخدم <code>i</code> (<code>j</code>) لإيجاد أول عنصر أكبر (أصغر) من المحور، ثم بدّل العنصرين.</li>
<li>كرّر الخطوة <code>2.</code> حتى يلتقي <code>i</code> و<code>j</code>، ثم بدّل المحور إلى الموضع الحدّي بين المصفوفتين الفرعيتين.</li>
</ol>
<p>بعد التقسيم بالمحمّي، تُقسَّم المصفوفة الأصلية إلى ثلاثة أجزاء: المصفوفة الفرعية اليسرى، والمحور، والمصفوفة الفرعية اليمنى، بحيث «أي عنصر في المصفوفة الفرعية اليسرى $\\leq$ المحور $\\leq$ أي عنصر في المصفوفة الفرعية اليمنى». لذلك لا يلزمنا تالياً سوى ترتيب المصفوفتين الفرعيتين.</p>
<div class="note">
<p class="note__title">استراتيجية التقسيم والتغلب في الترتيب السريع</p>
<p>جوهر التقسيم بالمحمّي هو تبسيط مسألة ترتيب مصفوفة أطول إلى مسألتَي ترتيب مصفوفتين أقصر.</p>
</div>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* التقسيم بالمحمّي */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(q *quickSort)</span></span> partition(nums []<span class="hljs-type">int</span>, left, right <span class="hljs-type">int</span>) <span class="hljs-type">int</span> {
	<span class="hljs-comment">// استخدم nums[left] محوراً</span>
	i, j := left, right
	<span class="hljs-keyword">for</span> i &lt; j {
		<span class="hljs-keyword">for</span> i &lt; j &amp;&amp; nums[j] &gt;= nums[left] {
			j-- <span class="hljs-comment">// ابحث من اليمين إلى اليسار عن أول عنصر أصغر من المحور</span>
		}
		<span class="hljs-keyword">for</span> i &lt; j &amp;&amp; nums[i] &lt;= nums[left] {
			i++ <span class="hljs-comment">// ابحث من اليسار إلى اليمين عن أول عنصر أكبر من المحور</span>
		}
		<span class="hljs-comment">// بدّل العنصرين</span>
		nums[i], nums[j] = nums[j], nums[i]
	}
	<span class="hljs-comment">// بدّل المحور إلى الحد الفاصل بين المصفوفتين الفرعيتين</span>
	nums[i], nums[left] = nums[left], nums[i]
	<span class="hljs-keyword">return</span> i <span class="hljs-comment">// أعد فهرس المحور</span>
}
</code></pre>
</div>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>يوضح الشكل أدناه السير الكامل للترتيب السريع.</p>
<ol>
<li>أولاً، نفّذ «تقسيمًا بالمحمّي» واحداً على المصفوفة الأصلية للحصول على المصفوفتين الفرعيتين اليسرى واليمنى غير المرتبتين.</li>
<li>ثم نفّذ «التقسيم بالمحمّي» تعاودياً على المصفوفة الفرعية اليسرى والمصفوفة الفرعية اليمنى على التوالي.</li>
<li>واصل التعاود حتى يصبح طول المصفوفة الفرعية 1، وعندها يكتمل ترتيب المصفوفة بأكملها.</li>
</ol>
<p><img src="/images/hello-algo/chapter_sorting--quick_sort_overview.png" alt="سير الترتيب السريع"></p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الترتيب السريع */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(q *quickSort)</span></span> quickSort(nums []<span class="hljs-type">int</span>, left, right <span class="hljs-type">int</span>) {
	<span class="hljs-comment">// أوقف التعاود عندما يصبح طول المصفوفة الفرعية 1</span>
	<span class="hljs-keyword">if</span> left &gt;= right {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// التقسيم بالمحمّي</span>
	pivot := q.partition(nums, left, right)
	<span class="hljs-comment">// عالج المصفوفتين الفرعيتين اليسرى واليمنى تعاودياً</span>
	q.quickSort(nums, left, pivot<span class="hljs-number">-1</span>)
	q.quickSort(nums, pivot+<span class="hljs-number">1</span>, right)
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>تعقيد زمني $O(n \\log n)$؛ ترتيب غير تكيّفي</strong>: في المتوسط، ينتج التقسيم بالمحمّي $\\log n$ مستوى تعاودياً، ويكون العدد الإجمالي لتكرارات الحلقة في كل مستوى $n$، لذا يكون التعقيد الزمني الكلي $O(n \\log n)$. وفي أسوأ حالة، يقسّم كل جولة من التقسيم بالمحمّي مصفوفة طولها $n$ إلى مصفوفتين فرعيتين طولاهما $0$ و$n - 1$. ويبلغ عمق التعاود حينئذٍ $n$، مع $n$ تكرار حلقة في كل مستوى، فيكون التعقيد الزمني الكلي $O(n^2)$.</li>
<li><strong>تعقيد مكاني $O(n)$؛ ترتيب في المكان</strong>: في حالة كون مصفوفة الإدخال معكوسة تماماً، يبلغ أسوأ عمق تعاود $n$، مستخدماً مساحة إطار مكدس $O(n)$. وتُجرى عملية الترتيب على المصفوفة الأصلية دون الاستعانة بمصفوفة إضافية.</li>
<li><strong>ترتيب غير مستقر</strong>: في الخطوة الأخيرة من التقسيم بالمحمّي، قد يُبدَّل المحور إلى يمين عنصر مساوٍ له.</li>
</ul>
<h2 id="لماذا-يعد-الترتيب-السريع-سريعا">لماذا يُعدّ الترتيب السريع سريعاً</h2>
<p>كما يوحي اسمه، للترتيب السريع ميزة كفاءة واضحة. وعلى الرغم من أن تعقيده الزمني المتوسط مماثل لتعقيد «ترتيب الدمج» و«ترتيب الكومة»، فإن الترتيب السريع أسرع عادةً في الممارسة العملية للأسباب التالية.</p>
<ul>
<li><strong>أسوأ حالة غير مرجّحة الحدوث</strong>: على الرغم من أن التعقيد الزمني للترتيب السريع في أسوأ حالة هو $O(n^2)$ وأن أداءه أقل قابلية للتنبؤ من أداء ترتيب الدمج، فإن الترتيب السريع يعمل في زمن $O(n \\log n)$ في الغالبية العظمى من الحالات.</li>
<li><strong>كفاءة عالية في ذاكرة التخزين المؤقت</strong>: أثناء التقسيم بالمحمّي، يستطيع النظام تحميل المصفوفة الفرعية بأكملها في ذاكرة التخزين المؤقت، فيكون الوصول إلى العناصر فعّالاً نسبياً. في المقابل، تتطلب خوارزميات مثل «ترتيب الكومة» وصولاً غير متجاور إلى العناصر، فلا تنال هذه الميزة.</li>
<li><strong>عوامل ثابتة صغيرة</strong>: من بين الخوارزميات الثلاث أعلاه، يُجري الترتيب السريع أقل عدد إجمالي من المقارنات والإسنادات والتبديلات. وهذا مشابه لسبب كون «ترتيب الإدراج» أسرع من «ترتيب الفقاعات».</li>
</ul>
<h2 id="تحسين-المحور">تحسين المحور</h2>
<p><strong>قد ينخفض زمن الترتيب السريع في بعض المدخلات</strong>. تأمّل مثالاً متطرفاً تكون فيه مصفوفة الإدخال مرتبة تنازلياً بالكامل. ولأننا نختار العنصر الواقع في أقصى اليسار محوراً، فبمجرد اكتمال التقسيم بالمحمّي يُبدَّل المحور إلى أقصى يمين المصفوفة، فتبقى مصفوفة فرعية يسرى طولها $n - 1$ ومصفوفة فرعية يمنى طولها $0$. وإذا استمر ذلك تعاودياً، ينتج عن كل جولة من التقسيم بالمحمّي مصفوفة فرعية واحدة طولها $0$، فتنهار استراتيجية التقسيم والتغلب، وينحدر الترتيب السريع إلى ما يقارب «ترتيب الفقاعات».</p>
<p>لتقليل احتمال حدوث ذلك، <strong>يمكننا تحسين استراتيجية اختيار المحور المستخدمة في التقسيم بالمحمّي</strong>. فمثلاً يمكننا اختيار محور عشوائياً. غير أنه إذا حالفنا سوء الحظ واخترنا محاور سيئة مراراً، فقد يظل الأداء غير مُرضٍ.</p>
<p>تجدر الإشارة إلى أن لغات البرمجة تولّد عادةً «أعداداً شبه عشوائية». وإذا أنشأنا حالة اختبار محددة تستهدف متتالية شبه عشوائية، فقد يظل الترتيب السريع يعاني أداءً متدهوراً.</p>
<p>ولمزيد من التحسين، يمكننا اختيار ثلاثة عناصر مرشحة من المصفوفة، وهي عادةً العنصران الأول والأخير والعنصر الأوسط، <strong>واستخدام الوسيط بين العناصر الثلاثة محوراً</strong>. وهذا يزيد كثيراً احتمال أن يكون المحور «لا صغيراً جداً ولا كبيراً جداً». ويمكننا أيضاً اختيار عناصر مرشحة أكثر لتحسين متانة الخوارزمية أكثر. وبهذه الطريقة ينخفض احتمال تدهور التعقيد الزمني إلى $O(n^2)$ انخفاضاً كبيراً.</p>
<p>وتكون شيفرة المثال كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* التقسيم بالمحمّي */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(q *quickSort)</span></span> partition(nums []<span class="hljs-type">int</span>, left, right <span class="hljs-type">int</span>) <span class="hljs-type">int</span> {
	<span class="hljs-comment">// استخدم nums[left] محوراً</span>
	i, j := left, right
	<span class="hljs-keyword">for</span> i &lt; j {
		<span class="hljs-keyword">for</span> i &lt; j &amp;&amp; nums[j] &gt;= nums[left] {
			j-- <span class="hljs-comment">// ابحث من اليمين إلى اليسار عن أول عنصر أصغر من المحور</span>
		}
		<span class="hljs-keyword">for</span> i &lt; j &amp;&amp; nums[i] &lt;= nums[left] {
			i++ <span class="hljs-comment">// ابحث من اليسار إلى اليمين عن أول عنصر أكبر من المحور</span>
		}
		<span class="hljs-comment">// بدّل العنصرين</span>
		nums[i], nums[j] = nums[j], nums[i]
	}
	<span class="hljs-comment">// بدّل المحور إلى الحد الفاصل بين المصفوفتين الفرعيتين</span>
	nums[i], nums[left] = nums[left], nums[i]
	<span class="hljs-keyword">return</span> i <span class="hljs-comment">// أعد فهرس المحور</span>
}
</code></pre>
</div>
<h2 id="تحسين-عمق-التعاود">تحسين عمق التعاود</h2>
<p><strong>قد يستهلك الترتيب السريع أيضاً مساحة أكبر في بعض المدخلات</strong>. تأمّل مصفوفة إدخال مرتبة بالكامل. وليكن طول المصفوفة الفرعية الحالية في التعاود $m$. ينتج عن كل جولة من التقسيم بالمحمّي مصفوفة فرعية يسرى طولها $0$ ومصفوفة فرعية يمنى طولها $m - 1$، مما يعني أن كل استدعاء تعاودي يقلّص حجم المسألة بمقدار عنصر واحد فقط. وبذلك يمكن أن تبلغ شجرة التعاود ارتفاعاً قدره $n - 1$، مستهلكة مساحة إطار مكدس $O(n)$.</p>
<p>لمنع تراكم إطارات المكدس، يمكننا مقارنة طولي المصفوفتين الفرعيتين بعد كل جولة من التقسيم بالمحمّي، <strong>والتعاود على المصفوفة الأقصر فقط</strong>. ولأن طول المصفوفة الفرعية الأقصر لا يتجاوز $n / 2$، يضمن هذا الأسلوب ألا يتجاوز عمق التعاود $\\log n$، مما يقلل التعقيد المكاني في أسوأ حالة إلى $O(\\log n)$. وتظهر الشيفرة أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الترتيب السريع */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(q *quickSort)</span></span> quickSort(nums []<span class="hljs-type">int</span>, left, right <span class="hljs-type">int</span>) {
	<span class="hljs-comment">// أوقف التعاود عندما يصبح طول المصفوفة الفرعية 1</span>
	<span class="hljs-keyword">if</span> left &gt;= right {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// التقسيم بالمحمّي</span>
	pivot := q.partition(nums, left, right)
	<span class="hljs-comment">// عالج المصفوفتين الفرعيتين اليسرى واليمنى تعاودياً</span>
	q.quickSort(nums, left, pivot<span class="hljs-number">-1</span>)
	q.quickSort(nums, pivot+<span class="hljs-number">1</span>, right)
}
</code></pre>
</div>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:p,html:o};export{s as book,n as chapter,t as chapterTitle,c as default,p as headings,o as html,a as slug,l as title};
