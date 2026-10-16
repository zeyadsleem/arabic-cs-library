const s="mooc",n="part-7",a="الجزء 7: الوحدات",p="6-more-features",e="المزيد من ميزات Python",o=[{depth:2,id:"الجمل-الشرطية-ذات-السطر-الواحد",text:"الجمل الشرطية ذات السطر الواحد"},{depth:2,id:"كتلة-فارغة",text:"كتلة «فارغة»"},{depth:2,id:"الحلقات-مع-كتل-else",text:"الحلقات مع كتل else"},{depth:2,id:"القيمة-الافتراضية-للمعامل",text:"القيمة الافتراضية للمعامل"},{depth:2,id:"عدد-متغير-من-المعاملات",text:"عدد متغيّر من المعاملات"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون ملمًّا ببعض ميزات Python الإضافية</li>
</ul>
</blockquote>
<p>وختامًا لهذه الدورة، ستجد هنا ميزات مختلفة مفيدة في Python.</p>
<h2 id="الجمل-الشرطية-ذات-السطر-الواحد">الجمل الشرطية ذات السطر الواحد</h2>
<p>تُنتج العبارتان التاليتان النتيجتين نفسهما تمامًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;even&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;odd&quot;</span>)
</code></pre>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;even&quot;</span> <span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;odd&quot;</span>)
</code></pre>
<p>في المثال الأخير لدينا تعبير شرطي في سطر واحد: <code>a if [condition] else b</code>. وتُقدَّر قيمة هذا التعبير بـ<code>a</code> إذا كان الشرط صحيحًا، وبـ<code>b</code> إذا كان خاطئًا. ويُشار إلى هذه البنية أحيانًا بـ_المعامل الثلاثي_ (ternary operator).</p>
<p>يمكن أن تكون التعبيرات الشرطية مفيدة جدًا حين تحتاج إلى إسناد شيء ما <em>بشكل شرطي</em>. فمثلًا، لو كانت لديك المتغيّرات <code>x</code> و<code>y</code>، وأردت إما زيادة قيمة <code>y</code> وإما تعيينها بناءً على زوجية <code>x</code>، فيمكنك كتابة ذلك في جملة <code>if else</code> عادية هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
    y += <span class="hljs-number">1</span>
<span class="hljs-keyword">else</span>:
    y = <span class="hljs-number">0</span>
</code></pre>
<p>ويمكن تحقيق الأمر نفسه بسطر واحد أنيق:</p>
<pre><code class="language-python">y = y + <span class="hljs-number">1</span> <span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-number">0</span>
</code></pre>
<h2 id="كتلة-فارغة">كتلة «فارغة»</h2>
<p>قد تذكر من الجزء السابق أنه لا يُسمح بوجود كتلة فارغة في برنامج Python. وإذا احتجت إلى كتلة شيفرة لا تفعل شيئًا، مثلًا عند اختبار وظيفة أخرى، فإن الأمر <code>pass</code> يتيح لك ذلك. فيمكنك مثلًا كتابة دالة لا تفعل شيئًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    <span class="hljs-keyword">pass</span>
</code></pre>
<p>سترجع هذه الدالة ببساطة على الفور. وترك الأمر <code>pass</code> خارجًا، أي وجود كتلة فارغة تمامًا، سيُنتج خطأً.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():  <span class="hljs-comment"># this causes an error!</span>
</code></pre>
<h2 id="الحلقات-مع-كتل-else">الحلقات مع كتل else</h2>
<p>في Python يمكن أن تحتوي الحلقات على كتل <code>else</code> أيضًا. ويُنفَّذ هذا القسم من الشيفرة إذا انتهت الحلقة انتهاءً طبيعيًا.</p>
<p>فمثلًا، في المثال التالي نتصفّح قائمة أعداد. فإذا وُجد عدد زوجي في القائمة، يطبع البرنامج رسالة وتُقطع الحلقة. وإذا لم توجد أعداد زوجية، تنتهي الحلقة انتهاءً طبيعيًا، لكن تُطبع عندئذٍ رسالة مختلفة.</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>]
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;found an even number&quot;</span>, x)
        <span class="hljs-keyword">break</span>
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;there were no even numbers&quot;</span>)
</code></pre>
<p>الطريقة الأكثر تقليدية لتحقيق ذلك هي استخدام متغيّر مساعد لتذكّر ما إذا كان العنصر المطلوب قد وُجد:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>]
found = <span class="hljs-literal">False</span>
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-keyword">if</span> x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;found an even number&quot;</span>, x)
        found = <span class="hljs-literal">True</span>
        <span class="hljs-keyword">break</span>
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> found:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;there were no even numbers&quot;</span>)
</code></pre>
<p>واستخدام جملة <code>for else</code> يوفّر علينا عناء كتابة متغيّر منفصل.</p>
<h2 id="القيمة-الافتراضية-للمعامل">القيمة الافتراضية للمعامل</h2>
<p>يمكن أن يكون لدالة Python قيمة افتراضية للمعامل. وتُستخدم كلما لم يُمرَّر أي وسيط إلى الدالة. انظر المثال التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">say_hello</span>(<span class="hljs-params">name=<span class="hljs-string">&quot;Emily&quot;</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi there,&quot;</span>, name)

say_hello()
say_hello(<span class="hljs-string">&quot;Eric&quot;</span>)
say_hello(<span class="hljs-string">&quot;Matthew&quot;</span>)
say_hello(<span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<pre><code>Hi there, Emily
Hi there, Eric
Hi there, Matthew
Hi there,
</code></pre>
<p>ملاحظة: السلسلة النصية الفارغة تبقى سلسلة نصية، لذا لا تُستخدم القيمة الافتراضية للمعامل إذا مُرِّرت سلسلة نصية فارغة إلى الدالة.</p>
<h2 id="عدد-متغير-من-المعاملات">عدد متغيّر من المعاملات</h2>
<p>يمكنك أيضًا تعريف دالة بعدد متغيّر من المعاملات، بإضافة نجمة قبل اسم المعامل. وتُحتوى كل الوسائط المتبقية المُمرَّرة إلى الدالة في صف (tuple)، ويمكن الوصول إليها عبر المعامل المسمّى.</p>
<p>تحسب الدالة التالية عدد وسائطها ومجموعها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>(<span class="hljs-params">*my_args</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You passed&quot;</span>, <span class="hljs-built_in">len</span>(my_args), <span class="hljs-string">&quot;arguments&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The sum of the arguments is&quot;</span>, <span class="hljs-built_in">sum</span>(my_args))

testing(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)
</code></pre>
<pre><code>You passed 5 arguments
The sum of the arguments is 15
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: لغتك البرمجية الخاصة</strong></p>
<p>ستكتب في هذا التمرين منفّذًا للغة برمجة خاصتك. ويمكنك استخدام أي تقنيات ومهارات تعلّمتها في هذه الدورة حتى الآن.</p>
</blockquote>
<p>ستتكوّن البرامج من أسطر، وسيكون كل سطر بأحد الصيغ التالية:</p>
<ul>
<li><code>PRINT [value]</code>: يطبع القيمة</li>
<li><code>MOV [variable] [value]</code>: يُسند القيمة إلى المتغيّر</li>
<li><code>ADD [variable] [value]</code>: يضيف القيمة إلى المتغيّر</li>
<li><code>SUB [variable] [value]</code>: يطرح القيمة من المتغيّر</li>
<li><code>MUL [variable] [value]</code>: يضرب المتغيّر في القيمة</li>
<li><code>[location]:</code>: يسمّي سطر شيفرة، بحيث يمكن القفز إليه من مكان آخر</li>
<li><code>JUMP [location]</code>: يقفز إلى الموقع المحدّد</li>
<li><code>IF [condition] JUMP [location]</code>: إذا كان الشرط صحيحًا، يقفز إلى الموقع المحدّد</li>
<li><code>END</code>: يُنهي التنفيذ</li>
</ul>
<p>الأقواس المربّعة أعلاه ليست إلا علامة للدلالة على المعاملات؛ انظر أدناه أمثلة على الاستخدام.</p>
<p>يُنفَّذ البرنامج سطرًا بسطر ابتداءً من السطر الأول. وينتهي التنفيذ عندما يصادف المنفّذ الأمر <code>END</code>، أو عندما لا يتبقّى أسطر لتنفيذها.</p>
<p>لكل برنامج 26 متغيّرًا معرّفًا مسبقًا، مسمّاة من <code>A</code> إلى <code>Z</code>. ولكل متغيّر القيمة 0 عند بدء البرنامج. وتشير العلامة <code>[variable]</code> إلى أحد هذه المتغيّرات الـ26.</p>
<p>كل القيم التي يعالجها البرنامج أعداد صحيحة. وتشير العلامة <code>[value]</code> إما إلى قيمة مخزّنة في متغيّر، وإما إلى عدد صحيح مكتوب مباشرةً.</p>
<p>تشير العلامة <code>[location]</code> إلى أي اسم لموقع يتكوّن من الأحرف الصغيرة من <code>a</code> إلى <code>z</code> و/أو الأرقام من <code>0</code> إلى <code>9</code>. ولا يجوز أن يكون لموقعين مختلفين الاسم نفسه.</p>
<p>تشير العلامة <code>[condition]</code> إلى أي تعبير بالصيغة <code>[value] [comparison] [value]</code>، حيث <code>[comparison]</code> أحد المشغّلات التالية: <code>==</code> و<code>!=</code> و<code>&lt;</code> و<code>&lt;=</code> و<code>&gt;</code> و<code>&gt;=</code>.</p>
<p>يُرجى كتابة دالة اسمها <code>run(program)</code> تأخذ قائمة تحتوي على أوامر البرنامج كوسيط لها. وكل عنصر في القائمة سطر شيفرة في البرنامج. وينبغي أن تُعيد الدالة قائمة جديدة تحتوي على نتائج أوامر <code>PRINT</code> المنفَّذة خلال تشغيل البرنامج.</p>
<p>ويمكنك أن تفترض أن الدالة لن تُعطى إلا برامج بصيغة صحيحة تمامًا. ولست مضطرًا إلى تنفيذ أي تحقّق من صحة المُدخلات أو معالجة أخطاء.</p>
<p>يستحق هذا التمرين نقطتين. وستحصل على نقطة واحدة إذا عملت الأوامر <code>PRINT</code> و<code>MOV</code> و<code>ADD</code> و<code>SUB</code> و<code>MUL</code> و<code>END</code> بشكل صحيح. وستحصل على نقطة أخرى إذا عملت بقية الأوامر، التي تُستخدم لتنفيذ الحلقات، بشكل صحيح أيضًا.</p>
<p>فيما يلي بعض الأمثلة، ويمكنك استخدامها للاختبار أيضًا. المثال 1:</p>
<pre><code class="language-python">program1 = []
program1.append(<span class="hljs-string">&quot;MOV A 1&quot;</span>)
program1.append(<span class="hljs-string">&quot;MOV B 2&quot;</span>)
program1.append(<span class="hljs-string">&quot;PRINT A&quot;</span>)
program1.append(<span class="hljs-string">&quot;PRINT B&quot;</span>)
program1.append(<span class="hljs-string">&quot;ADD A B&quot;</span>)
program1.append(<span class="hljs-string">&quot;PRINT A&quot;</span>)
program1.append(<span class="hljs-string">&quot;END&quot;</span>)
result = run(program1)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>[1, 2, 3]
</code></pre>
<p>المثال 2:</p>
<pre><code class="language-python">program2 = []
program2.append(<span class="hljs-string">&quot;MOV A 1&quot;</span>)
program2.append(<span class="hljs-string">&quot;MOV B 10&quot;</span>)
program2.append(<span class="hljs-string">&quot;begin:&quot;</span>)
program2.append(<span class="hljs-string">&quot;IF A &gt;= B JUMP quit&quot;</span>)
program2.append(<span class="hljs-string">&quot;PRINT A&quot;</span>)
program2.append(<span class="hljs-string">&quot;PRINT B&quot;</span>)
program2.append(<span class="hljs-string">&quot;ADD A 1&quot;</span>)
program2.append(<span class="hljs-string">&quot;SUB B 1&quot;</span>)
program2.append(<span class="hljs-string">&quot;JUMP begin&quot;</span>)
program2.append(<span class="hljs-string">&quot;quit:&quot;</span>)
program2.append(<span class="hljs-string">&quot;END&quot;</span>)
result = run(program2)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]
</code></pre>
<p>المثال 3 (المضروب):</p>
<pre><code class="language-python">program3 = []
program3.append(<span class="hljs-string">&quot;MOV A 1&quot;</span>)
program3.append(<span class="hljs-string">&quot;MOV B 1&quot;</span>)
program3.append(<span class="hljs-string">&quot;begin:&quot;</span>)
program3.append(<span class="hljs-string">&quot;PRINT A&quot;</span>)
program3.append(<span class="hljs-string">&quot;ADD B 1&quot;</span>)
program3.append(<span class="hljs-string">&quot;MUL A B&quot;</span>)
program3.append(<span class="hljs-string">&quot;IF B &lt;= 10 JUMP begin&quot;</span>)
program3.append(<span class="hljs-string">&quot;END&quot;</span>)
result = run(program3)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
</code></pre>
<p>المثال 4 (الأعداد الأولية):</p>
<pre><code class="language-python">program4 = []
program4.append(<span class="hljs-string">&quot;MOV N 50&quot;</span>)
program4.append(<span class="hljs-string">&quot;PRINT 2&quot;</span>)
program4.append(<span class="hljs-string">&quot;MOV A 3&quot;</span>)
program4.append(<span class="hljs-string">&quot;begin:&quot;</span>)
program4.append(<span class="hljs-string">&quot;MOV B 2&quot;</span>)
program4.append(<span class="hljs-string">&quot;MOV Z 0&quot;</span>)
program4.append(<span class="hljs-string">&quot;test:&quot;</span>)
program4.append(<span class="hljs-string">&quot;MOV C B&quot;</span>)
program4.append(<span class="hljs-string">&quot;new:&quot;</span>)
program4.append(<span class="hljs-string">&quot;IF C == A JUMP error&quot;</span>)
program4.append(<span class="hljs-string">&quot;IF C &gt; A JUMP over&quot;</span>)
program4.append(<span class="hljs-string">&quot;ADD C B&quot;</span>)
program4.append(<span class="hljs-string">&quot;JUMP new&quot;</span>)
program4.append(<span class="hljs-string">&quot;error:&quot;</span>)
program4.append(<span class="hljs-string">&quot;MOV Z 1&quot;</span>)
program4.append(<span class="hljs-string">&quot;JUMP over2&quot;</span>)
program4.append(<span class="hljs-string">&quot;over:&quot;</span>)
program4.append(<span class="hljs-string">&quot;ADD B 1&quot;</span>)
program4.append(<span class="hljs-string">&quot;IF B &lt; A JUMP test&quot;</span>)
program4.append(<span class="hljs-string">&quot;over2:&quot;</span>)
program4.append(<span class="hljs-string">&quot;IF Z == 1 JUMP over3&quot;</span>)
program4.append(<span class="hljs-string">&quot;PRINT A&quot;</span>)
program4.append(<span class="hljs-string">&quot;over3:&quot;</span>)
program4.append(<span class="hljs-string">&quot;ADD A 1&quot;</span>)
program4.append(<span class="hljs-string">&quot;IF A &lt;= N JUMP begin&quot;</span>)
result = run(program4)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
</code></pre>
<p>يُرجى الإجابة عن استبيان تقييم الدورة. وتساعدنا نتائج الاستبيان على تحسين الدورة.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 8675c2f0-2d0d-54b2-9ce2-7ba7692e95f0)</p>
</blockquote>
`,r={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:o,html:l};export{s as book,n as chapter,a as chapterTitle,r as default,o as headings,l as html,p as slug,e as title};
