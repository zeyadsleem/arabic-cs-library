const s="mooc",n="part-4",a="الجزء 4: الدوال والقوائم",e="5-print-statement-formatting",p="تنسيق أمر الطباعة",t=[{depth:2,id:"السلاسل-النصية-ذات-البادئة-f",text:"السلاسل النصية ذات البادئة f"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف كيف تستخدم الوسائط لتنسيق نتيجة الأمر <code>print</code></li>
<li>ستكون قادرًا على استخدام السلاسل النصية ذات البادئة f لتنسيق المخرجات</li>
</ul>
</blockquote>
<p>حتى الآن تعلّمنا ثلاث طرق لصياغة الوسيط المُعطى إلى الأمر <code>print</code>.</p>
<p>الطريقة الأولى هي المشغّل <code>+</code> المخصّص للسلاسل النصية. وهو يتيح الدمج البسيط لأجزاء السلسلة النصية:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Mark&quot;</span>
age = <span class="hljs-number">37</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span> + name + <span class="hljs-string">&quot; your age is &quot;</span> + <span class="hljs-built_in">str</span>(age) + <span class="hljs-string">&quot; years&quot;</span> )
</code></pre>
<p>لن تعمل هذه الطريقة إذا لم يكن أيّ من الأجزاء سلسلة نصية. وفي المثال أعلاه، حُوِّل المتغيّر <code>age</code> إلى سلسلة نصية بواسطة الدالة <code>str</code>، لأنه عدد صحيح ولا يمكن دمجه كما هو.</p>
<p>والطريقة الثانية هي اعتبار كل جزء من الوسيط وسيطًا منفصلًا، وفصلها بفواصل:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, name, <span class="hljs-string">&quot;your age is&quot;</span>, age, <span class="hljs-string">&quot;years&quot;</span> )
</code></pre>
<p>تُنتج هذه الشيفرة النتيجة نفسها تمامًا التي تنتجها النسخة السابقة. فالأمر <code>print</code> يضيف عادةً محرف مسافة بين كل وسيطين. أما الميزة هنا فهي أن الأجزاء يمكن أن تكون من أنواع مختلفة، فلا حاجة إلى تحويل أي شيء إلى سلسلة نصية.</p>
<p>وإذا أردت إزالة المسافات المضافة تلقائيًا، فيمكنك إضافة وسيط مسمّى خاص هو <code>sep</code>:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, name, <span class="hljs-string">&quot;your age is&quot;</span>, age, <span class="hljs-string">&quot;years&quot;</span>, sep=<span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<p>فيطبع هذا</p>
<pre><code>HiMarkyour age is37years
</code></pre>
<p>الوسيط <code>sep=&quot;&quot;</code> هو <em>وسيط مسمّى</em> (keyword argument)، واختصار اسمه من <em>الفاصل</em> (separator). وهو يحدّد أن فصل الوسائط الأخرى ينبغي أن يتم الآن بسلسلة نصية فارغة. ويمكنك جعل الفاصل أي سلسلة نصية ترضاها. فمثلًا، إذا أردت أن يكون كل وسيط في سطر منفصل، فيمكنك جعل الفاصل هو <code>&quot;\\n&quot;</code>، وهو محرف السطر الجديد:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, name, <span class="hljs-string">&quot;your age is&quot;</span>, age, <span class="hljs-string">&quot;years&quot;</span>, sep=<span class="hljs-string">&quot;\\n&quot;</span>)
</code></pre>
<pre><code>Hi
Mark
your age is
37
years
</code></pre>
<p>افتراضيًا، ينتهي أمر الطباعة دائمًا بمحرف سطر جديد، لكن يمكنك تغيير ذلك أيضًا. فالوسيط المسمّى <code>end</code> يحدّد ما يُوضع في نهاية السطر. وضبط <code>end</code> على سلسلة نصية فارغة يعني أنه لا يوجد محرف سطر جديد في نهاية المخرجات:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;there!&quot;</span>)
</code></pre>
<pre><code>Hi there!
</code></pre>
<h2 id="السلاسل-النصية-ذات-البادئة-f">السلاسل النصية ذات البادئة f</h2>
<p>الطريقة الثالثة لتجهيز السلاسل النصية هي السلاسل النصية ذات البادئة f. وسيبدو المثال السابق الذي يستخدم الاسم والعمر على النحو التالي عند صياغته بهذه الطريقة:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Erkki&quot;</span>
age = <span class="hljs-number">39</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Hi <span class="hljs-subst">{name}</span> your age is <span class="hljs-subst">{age}</span> years&quot;</span>)
</code></pre>
<p>حتى الآن استخدمنا سلاسل نصية ذات بادئة f بسيطة جدًا، لكنها متعددة الاستخدامات إلى حد كبير في تنسيق محتوى السلاسل النصية. ومن أبرز استخدامهاات تحديد عدد الخانات العشرية التي تُطبع مع عدد عشري. وافتراضيًا يكون هذا العدد كبيرًا إلى حد ما:</p>
<pre><code class="language-python">number = <span class="hljs-number">1</span>/<span class="hljs-number">3</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The number is <span class="hljs-subst">{number}</span>&quot;</span>)
</code></pre>
<pre><code>The number is 0.333333333333333
</code></pre>
<p>يمكن تحديد الصيغة التي نريد أن يُعرض بها العدد داخل الأقواس المعقوفة لتعبير المتغيّر. فلنضف محرف النقطتين و_مُحدِّد تنسيق_ (format specifier) بعد اسم المتغيّر:</p>
<pre><code class="language-python">number = <span class="hljs-number">1</span>/<span class="hljs-number">3</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The number is <span class="hljs-subst">{number:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
</code></pre>
<pre><code class="language-python">The number <span class="hljs-keyword">is</span> <span class="hljs-number">0.33</span>
</code></pre>
<p>يوضّح مُحدِّد التنسيق <code>.2f</code> أننا نريد عرض خانتين عشريتين. أما الحرف <em>f</em> في النهاية فيعني أننا نريد عرض المتغيّر في هيئة <code>float</code>، أي عدد عشري.</p>
<p>وهنا مثال آخر، نحدّد فيه مقدار المساحة المخصّصة للمتغيّر في المخرجات. في كلتا الحالتين تُدرَج قيمة المتغيّر <code>name</code> في السلسلة النصية الناتجة، مع تخصيص مساحة من 15 محرفًا لها. أولًا تُحاذى الأسماء إلى اليسار، ثم تُحاذى إلى اليمين:</p>
<pre><code class="language-python">names =  [ <span class="hljs-string">&quot;Steve&quot;</span>, <span class="hljs-string">&quot;Jean&quot;</span>, <span class="hljs-string">&quot;Katherine&quot;</span>, <span class="hljs-string">&quot;Paul&quot;</span> ]
<span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> names:
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{name:<span class="hljs-number">15</span>}</span> centre <span class="hljs-subst">{name:&gt;<span class="hljs-number">15</span>}</span>&quot;</span>)
</code></pre>
<pre><code class="language-python">Steve           centre           Steve
Jean            centre            Jean
Katherine       centre       Katherine
Paul            centre            Paul
</code></pre>
<p>لا تقتصر استخدامات السلاسل النصية ذات البادئة f على أوامر <code>print</code>. ويمكن إسنادها إلى متغيّرات ودمجها مع سلاسل نصية أخرى:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Larry&quot;</span>
age = <span class="hljs-number">48</span>
city = <span class="hljs-string">&quot;Palo Alto&quot;</span>
greeting = <span class="hljs-string">f&quot;Hi <span class="hljs-subst">{name}</span>, you are <span class="hljs-subst">{age}</span> years of age&quot;</span>
<span class="hljs-built_in">print</span>(greeting + <span class="hljs-string">f&quot;, and you live in <span class="hljs-subst">{city}</span>&quot;</span>)
</code></pre>
<pre><code>Hi Larry, you are 48 years of age, and you live in Palo Alto
</code></pre>
<p>يمكنك التفكير في السلسلة النصية ذات البادئة f على أنها نوع من الدوال، تُنشئ سلسلة نصية عادية بناءً على «الوسائط» الموجودة داخل الأقواس المعقوفة.</p>
<blockquote>
<p><strong>تمرين برمجي: الأعداد الصحيحة إلى سلاسل نصية</strong></p>
<p>اكتب دالة اسمها <code>formatted</code>، تأخذ قائمة من الأعداد العشرية كوسيط لها. وتُرجع الدالة قائمة جديدة تحتوي على كل عنصر من عناصر القائمة الأصلية في صيغة سلسلة نصية، مقرَّبًا إلى خانتين عشريتين. وينبغي أن يبقى ترتيب العناصر في القائمة دون تغيير.</p>
</blockquote>
<p><em>تلميح: استخدم السلاسل النصية ذات البادئة f لتنسيق الأعداد العشرية إلى سلاسل نصية مناسبة.</em></p>
<p>مثال على السلوك المتوقع:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1.234</span>, <span class="hljs-number">0.3333</span>, <span class="hljs-number">0.11111</span>, <span class="hljs-number">3.446</span>]
new_list = formatted(my_list)
<span class="hljs-built_in">print</span>(new_list)
</code></pre>
<pre><code>['1.23', '0.33', '0.11', '3.45']
</code></pre>
<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 90d650f3-fde1-5132-ade9-73f3b4bf6189)

-->
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
