const n="mit-6100l",t="lecture-09",e="المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)",d="notes",s="المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-دوال-lambda-والصفوف-والقوائم-lambda-functions-tuples-and-lists",text:"الشريحة 1: دوال Lambda والصفوف والقوائم (Lambda Functions, Tuples and Lists)"},{depth:2,id:"الشريحة-2-من-المحاضرة-السابقة-from-last-time",text:"الشريحة 2: من المحاضرة السابقة (From last time)"},{depth:2,id:"الشريحة-3-الدوال-المجهولة-anonymous-functions",text:"الشريحة 3: الدوال المجهولة (Anonymous Functions)"},{depth:2,id:"الشريحة-4-الدوال-المجهولة-الاستدعاء",text:"الشريحة 4: الدوال المجهولة — الاستدعاء"},{depth:2,id:"الشريحة-5-جرب-بنفسك-you-try-it",text:"الشريحة 5: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-6-جرب-بنفسك-البيئة-العامة-global-environment",text:"الشريحة 6: جرّب بنفسك! — البيئة العامة (Global environment)"},{depth:2,id:"الشريحة-7-جرب-بنفسك-بيئة-dotwice",text:"الشريحة 7: جرّب بنفسك! — بيئة do_twice"},{depth:2,id:"الشريحة-8-جرب-بنفسك-تنفيذ-الاستدعاء-الداخلي-الأول",text:"الشريحة 8: جرّب بنفسك! — تنفيذ الاستدعاء الداخلي الأول"},{depth:2,id:"الشريحة-9-جرب-بنفسك-تغير-قيمة-x",text:"الشريحة 9: جرّب بنفسك! — تغيّر قيمة x"},{depth:2,id:"الشريحة-10-جرب-بنفسك-عودة-النتيجة-الأولى",text:"الشريحة 10: جرّب بنفسك! — عودة النتيجة الأولى"},{depth:2,id:"الشريحة-11-جرب-بنفسك-النتيجة-النهائية",text:"الشريحة 11: جرّب بنفسك! — النتيجة النهائية"},{depth:2,id:"الشريحة-12-جرب-بنفسك-ما-الذي-يطبع",text:"الشريحة 12: جرّب بنفسك! — ما الذي يُطبع؟"},{depth:2,id:"الشريحة-13-الصفوف-tuples",text:"الشريحة 13: الصفوف (Tuples)"},{depth:2,id:"الشريحة-14-نوع-بيانات-جديد-a-new-data-type",text:"الشريحة 14: نوع بيانات جديد (A New Data Type)"},{depth:2,id:"الشريحة-15-الصفوف-tuples",text:"الشريحة 15: الصفوف (Tuples)"},{depth:2,id:"الشريحة-16-الفهرسة-والتقطيع-indices-and-slicing",text:"الشريحة 16: الفهرسة والتقطيع (Indices and Slicing)"},{depth:2,id:"الشريحة-17-الصفوف-تبديل-قيم-متغيرين",text:"الشريحة 17: الصفوف — تبديل قيم متغيّرين"},{depth:2,id:"الشريحة-18-الصفوف-إرجاع-أكثر-من-قيمة",text:"الشريحة 18: الصفوف — إرجاع أكثر من قيمة"},{depth:2,id:"الشريحة-19-الفكرة-الكبرى-big-idea",text:"الشريحة 19: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-20-جرب-بنفسك-you-try-it",text:"الشريحة 20: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-21-عدد-متغير-من-الوسائط-variable-number-of-arguments",text:"الشريحة 21: عدد متغيّر من الوسائط (Variable Number of Arguments)"},{depth:2,id:"الشريحة-22-القوائم-lists",text:"الشريحة 22: القوائم (Lists)"},{depth:2,id:"الشريحة-23-القوائم-lists",text:"الشريحة 23: القوائم (Lists)"},{depth:2,id:"الشريحة-24-الفهرسة-والترتيب-indices-and-ordering",text:"الشريحة 24: الفهرسة والترتيب (Indices and Ordering)"},{depth:2,id:"الشريحة-25-المرور-على-عناصر-القائمة-iterating-over-a-list",text:"الشريحة 25: المرور على عناصر القائمة (Iterating Over a List)"},{depth:2,id:"الشريحة-26-المرور-على-عناصر-القائمة-داخل-دالة",text:"الشريحة 26: المرور على عناصر القائمة — داخل دالة"},{depth:2,id:"الشريحة-27-القوائم-تدعم-التكرار-lists-support-iteration",text:"الشريحة 27: القوائم تدعم التكرار (Lists Support Iteration)"},{depth:2,id:"الشريحة-28-جرب-بنفسك-you-try-it",text:"الشريحة 28: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-29-الخلاصة-summary",text:"الشريحة 29: الخلاصة (SUMMARY)"},{depth:2,id:"الشريحة-30-mitopencourseware",text:"الشريحة 30: MITOpenCourseWare"}],a=`<h1>المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec09_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec09.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec09_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec09/">تفريغ المحاضرة على OCW</a> (النسخة الإنجليزية الرسمية).</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. شرائح تتبّع البيئة (Environment) تتكرّر فيها الشيفرة نفسها مع جداول جديدة؛ نُقلت كل شريحة على حدة مع جدولها. الشرائح التي تبني الشيفرة تدريجيًّا نُقلت إلى جداول تحافظ على تسلسلها. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات.</p>
<h2 id="الشريحة-1-دوال-lambda-والصفوف-والقوائم-lambda-functions-tuples-and-lists">الشريحة 1: دوال Lambda والصفوف والقوائم (Lambda Functions, Tuples and Lists)</h2>
<p>نزّل الشرائح وملفات <code>.py</code> لمتابعة الشرح.</p>
<p>6.100L، المحاضرة 9 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-من-المحاضرة-السابقة-from-last-time">الشريحة 2: من المحاضرة السابقة (From last time)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">apply</span>(<span class="hljs-params">criteria,n</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    * criteria: function that takes in a number and returns a bool
    * n: an int
    Returns how many ints from 0 to n (inclusive) match the
    criteria (i.e. return True when run with criteria) &quot;&quot;&quot;</span>
    count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n+<span class="hljs-number">1</span>):
        <span class="hljs-keyword">if</span> criteria(i):
            count += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> count

<span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params">x</span>):
    <span class="hljs-keyword">return</span> x%<span class="hljs-number">2</span>==<span class="hljs-number">0</span>

<span class="hljs-built_in">print</span>(apply(is_even,<span class="hljs-number">10</span>))
</code></pre>
<h2 id="الشريحة-3-الدوال-المجهولة-anonymous-functions">الشريحة 3: الدوال المجهولة (Anonymous Functions)</h2>
<ul>
<li>أحيانًا لا نريد تسمية الدوال، خصوصًا البسيطة منها. هذه الدالة مثال جيد:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params">x</span>):
    <span class="hljs-keyword">return</span> x%<span class="hljs-number">2</span>==<span class="hljs-number">0</span>
</code></pre>
<ul>
<li>يمكن استعمال إجراء مجهول (Anonymous Procedure) باستخدام <code>lambda</code>:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">lambda</span> x: x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
</code></pre>
<table>
<thead>
<tr>
<th>الجزء</th>
<th>المقابل في صيغة <code>def</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>x</code></td>
<td>المعامل (Parameter)</td>
</tr>
<tr>
<td><code>x%2 == 0</code></td>
<td>جسم دالة <code>lambda</code> (Body of Lambda)</td>
</tr>
<tr>
<td>—</td>
<td>لا توجد الكلمة المفتاحية <code>return</code> (Note no <code>return</code> keyword)</td>
</tr>
</tbody>
</table>
<ul>
<li>تنشئ <code>lambda</code> كائن إجراء أو دالة، لكنها ببساطة <strong>لا تربط به اسمًا</strong>.</li>
</ul>
<h2 id="الشريحة-4-الدوال-المجهولة-الاستدعاء">الشريحة 4: الدوال المجهولة — الاستدعاء</h2>
<ul>
<li>استدعاء دالة باسمها:</li>
</ul>
<pre><code class="language-python">apply( is_even , <span class="hljs-number">10</span> )
</code></pre>
<ul>
<li>استدعاء دالة بدالة مجهولة كوسيط:</li>
</ul>
<pre><code class="language-python">apply( <span class="hljs-keyword">lambda</span> x: x%<span class="hljs-number">2</span> == <span class="hljs-number">0</span> , <span class="hljs-number">10</span> )
</code></pre>
<ul>
<li>دالة <code>lambda</code> للاستعمال مرة واحدة (One-Time Use). لا يمكن إعادة استعمالها لأنها بلا اسم!</li>
</ul>
<h2 id="الشريحة-5-جرب-بنفسك-you-try-it">الشريحة 5: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>ماذا يطبع هذا؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">do_twice</span>(<span class="hljs-params">n, fn</span>):
    <span class="hljs-keyword">return</span> fn(fn(n))

<span class="hljs-built_in">print</span>(do_twice(<span class="hljs-number">3</span>, <span class="hljs-keyword">lambda</span> x: x**<span class="hljs-number">2</span>))
</code></pre>
<h2 id="الشريحة-6-جرب-بنفسك-البيئة-العامة-global-environment">الشريحة 6: جرّب بنفسك! — البيئة العامة (Global environment)</h2>
<p>الشيفرة نفسها، وجدول البيئة العامة:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>do_twice</code></td>
<td>function object</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-7-جرب-بنفسك-بيئة-dotwice">الشريحة 7: جرّب بنفسك! — بيئة <code>do_twice</code></h2>
<p>الشيفرة نفسها، وأُنشئت بيئة جديدة اسمها <code>do_twice environment</code> وطابِقت المعاملات الصورية:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global environment</td>
<td><code>do_twice</code></td>
<td>function object</td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>n</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>fn</code></td>
<td><code>lambda x: x**2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-8-جرب-بنفسك-تنفيذ-الاستدعاء-الداخلي-الأول">الشريحة 8: جرّب بنفسك! — تنفيذ الاستدعاء الداخلي الأول</h2>
<p>الشيفرة نفسها، وجداول الشريحة 7، وقد ظهر اسم جديد:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>do_twice environment</td>
<td>—</td>
<td><code>lambda x: x**2</code> environment — بيئتان جديدتان متطابقتان</td>
</tr>
<tr>
<td>do_twice environment</td>
<td>—</td>
<td><code>x</code> في كلٍّ منهما قيمته <code>???</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-9-جرب-بنفسك-تغير-قيمة-x">الشريحة 9: جرّب بنفسك! — تغيّر قيمة <code>x</code></h2>
<p>الشيفرة نفسها. صار في كل من بيئتَي <code>lambda x: x**2</code> اسم <code>x</code>، وأحدهما صار <code>9</code> والآخر ما زال <code>???</code>:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global environment</td>
<td><code>do_twice</code></td>
<td>function object</td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>n</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>fn</code></td>
<td><code>lambda x: x**2</code></td>
</tr>
<tr>
<td>lambda x: x**2 environment</td>
<td><code>x</code></td>
<td><code>9</code></td>
</tr>
<tr>
<td>lambda x: x**2 environment</td>
<td><code>x</code></td>
<td><code>???</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-10-جرب-بنفسك-عودة-النتيجة-الأولى">الشريحة 10: جرّب بنفسك! — عودة النتيجة الأولى</h2>
<p>الشريحة نفسها. أُرجِع <code>9</code> من البيئة الأولى، وصار في البيئة الثانية <code>x = 10</code>:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global environment</td>
<td><code>do_twice</code></td>
<td>function object</td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>n</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>do_twice environment</td>
<td><code>fn</code></td>
<td><code>lambda x: x**2</code></td>
</tr>
<tr>
<td>lambda x: x**2 environment</td>
<td><code>x</code></td>
<td><code>10</code></td>
</tr>
</tbody>
</table>
<p>مع عبارة <code>Returns 9</code> بجوار البيئة التي أعادت <code>9</code>.</p>
<h2 id="الشريحة-11-جرب-بنفسك-النتيجة-النهائية">الشريحة 11: جرّب بنفسك! — النتيجة النهائية</h2>
<p>الشيفرة نفسها. صارت القيمة في بيئتَي <code>lambda</code> هي <code>81</code> و<code>99</code> على التوالي:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>lambda x: x**2 environment</td>
<td><code>x</code></td>
<td><code>99</code></td>
</tr>
</tbody>
</table>
<p>مع عبارة <code>Returns 81</code> بجوار البيئة التي أعادت <code>81</code>.</p>
<h2 id="الشريحة-12-جرب-بنفسك-ما-الذي-يطبع">الشريحة 12: جرّب بنفسك! — ما الذي يُطبع؟</h2>
<p>الشيفرة نفسها. النطاق العام فيه عبارة <code>PRINTS 81</code> بجوار <code>do_twice</code>:</p>
<table>
<thead>
<tr>
<th>البيئة</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global environment</td>
<td><code>do_twice</code></td>
<td>function object — بجواره <code>PRINTS 81</code></td>
</tr>
</tbody>
</table>
<p>مع عبارة <code>Returns 81</code> بجوار بيئة <code>do_twice</code>.</p>
<p><strong>ملاحظة المترجم:</strong> الشرائح 5 إلى 12 تخطّط لتسلسل البيئة كاملًا. الجداول أعلاه تحفظ التسلسل: <code>n = 3</code>، ثم <code>fn = lambda x: x**2</code>، ثم الاستدعاء الداخلي ينتج <code>9</code>، ثم <code>81</code>، ثم <code>99</code>، ثم الدالة تُرجِع <code>81</code>، ثم <code>print</code> يطبع <code>81</code>.</p>
<h2 id="الشريحة-13-الصفوف-tuples">الشريحة 13: الصفوف (Tuples)</h2>
<p>شريحة فاصلة تعلن موضوعًا جديدًا.</p>
<h2 id="الشريحة-14-نوع-بيانات-جديد-a-new-data-type">الشريحة 14: نوع بيانات جديد (A New Data Type)</h2>
<ul>
<li>رأينا الأنواع العددية (Scalar Types): <code>int</code> و<code>float</code> و<code>bool</code>.</li>
<li>رأينا نوعًا مركّبًا واحدًا: النص (String).</li>
<li>نريد تقديم أنواع بيانات مركّبة أكثر عمومية:
<ul>
<li>تسلسلات مفهرسة (Indexed Sequences) من عناصر، وقد تكون هذه العناصر بدورها بنى مركّبة.</li>
<li>الصفوف (Tuples) — غير قابلة للتغيير (Immutable).</li>
<li>القوائم (Lists) — قابلة للتغيير (Mutable).</li>
</ul>
</li>
<li>في المحاضرة القادمة سنستكشف أفكار:
<ul>
<li>قابلية التغيير (Mutability).</li>
<li>الأسماء المستعارة (Aliasing).</li>
<li>الاستنساخ (Cloning).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-15-الصفوف-tuples">الشريحة 15: الصفوف (Tuples)</h2>
<ul>
<li>تسلسل مرتَّب (Ordered) من الكائنات، قابل للفهرسة (Indexable).</li>
<li>الكائنات يمكن أن تكون من أي نوع: <code>int</code> أو نص أو صف أو صف من صفوف أو ما شابه.</li>
<li>لا يمكن تغيير قيم العناصر، فهي غير قابلة للتغيير (Immutable).</li>
</ul>
<pre><code class="language-python">te = ()
ts = (<span class="hljs-number">2</span>,)

t = (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;mit&quot;</span>, <span class="hljs-number">3</span>)
</code></pre>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>t[0]</code></td>
<td>يُقيَّم إلى <code>2</code></td>
</tr>
<tr>
<td><code>(2,&quot;mit&quot;,3) + (5,6)</code></td>
<td>يُقيَّم إلى صف جديد <code>(2,&quot;mit&quot;,3,5,6)</code></td>
</tr>
<tr>
<td><code>t[1:2]</code></td>
<td>صف مُقطَّع (Slice Tuple)، يُقيَّم إلى <code>(&quot;mit&quot;,)</code></td>
</tr>
<tr>
<td><code>t[1:3]</code></td>
<td>صف مُقطَّع، يُقيَّم إلى <code>(&quot;mit&quot;,3)</code></td>
</tr>
<tr>
<td><code>len(t)</code></td>
<td>يُقيَّم إلى <code>3</code></td>
</tr>
<tr>
<td><code>max((3,5,0))</code></td>
<td>يُقيَّم إلى <code>5</code></td>
</tr>
<tr>
<td><code>t[1] = 4</code></td>
<td>يعطي خطأ: لا يمكن تعديل الكائن</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-16-الفهرسة-والتقطيع-indices-and-slicing">الشريحة 16: الفهرسة والتقطيع (Indices and Slicing)</h2>
<pre><code class="language-python">seq = (<span class="hljs-number">2</span>,<span class="hljs-string">&#x27;a&#x27;</span>,<span class="hljs-number">4</span>,(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>))
</code></pre>
<table>
<thead>
<tr>
<th>الفهرس</th>
<th>0</th>
<th>1</th>
<th>2</th>
<th>3</th>
</tr>
</thead>
<tbody>
<tr>
<td>العنصر</td>
<td><code>2</code></td>
<td><code>'a'</code></td>
<td><code>4</code></td>
<td><code>(1,2)</code></td>
</tr>
</tbody>
</table>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(seq))
<span class="hljs-built_in">print</span>(seq[<span class="hljs-number">3</span>])
<span class="hljs-built_in">print</span>(seq[-<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(seq[<span class="hljs-number">3</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(seq[<span class="hljs-number">4</span>])
</code></pre>
<p>المُخرَج بالترتيب: <code>4</code> ثم <code>(1,2)</code> ثم <code>(1,2)</code> ثم <code>1</code> ثم خطأ (Error).</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(seq[<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(seq[-<span class="hljs-number">2</span>:])
<span class="hljs-built_in">print</span>(seq[<span class="hljs-number">1</span>:<span class="hljs-number">4</span>:<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(seq[:-<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(seq[<span class="hljs-number">1</span>:<span class="hljs-number">3</span>])
</code></pre>
<p>المُخرَج بالترتيب:</p>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>seq[1]</code></td>
<td><code>'a'</code></td>
</tr>
<tr>
<td><code>seq[-2:]</code></td>
<td><code>(4,(1,2))</code></td>
</tr>
<tr>
<td><code>seq[1:4:2]</code></td>
<td><code>('a',(1,2))</code></td>
</tr>
<tr>
<td><code>seq[:-1]</code></td>
<td><code>(2,'a',4)</code></td>
</tr>
<tr>
<td><code>seq[1:3]</code></td>
<td><code>('a',4)</code></td>
</tr>
</tbody>
</table>
<pre><code class="language-python"><span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> seq:
    <span class="hljs-built_in">print</span>(e)
</code></pre>
<p>المُخرَج بالترتيب: <code>2</code> ثم <code>a</code> ثم <code>4</code> ثم <code>(1,2)</code>.</p>
<h2 id="الشريحة-17-الصفوف-تبديل-قيم-متغيرين">الشريحة 17: الصفوف — تبديل قيم متغيّرين</h2>
<ul>
<li>تُستخدم الصفوف بسهولة لتبديل قيم المتغيّرات (Swap Variable Values).</li>
</ul>
<p>الشرائح تبني هذه الحالة خطوة بخطوة:</p>
<table>
<thead>
<tr>
<th>الخطوة</th>
<th>السطر</th>
<th>الحالة بعد التنفيذ</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td><code>x = 1</code></td>
<td><code>x = 1</code></td>
</tr>
<tr>
<td>2</td>
<td><code>y = 2</code></td>
<td><code>x = 1</code> و<code>y = 2</code></td>
</tr>
<tr>
<td>3</td>
<td><code>temp = x</code></td>
<td><code>x = 1</code> و<code>y = 2</code> و<code>temp = 1</code></td>
</tr>
<tr>
<td>4</td>
<td><code>x = y</code></td>
<td><code>x = 2</code> و<code>y = 2</code> و<code>temp = 1</code></td>
</tr>
<tr>
<td>5</td>
<td><code>y = temp</code></td>
<td><code>x = 2</code> و<code>y = 1</code> و<code>temp = 1</code></td>
</tr>
</tbody>
</table>
<p>وبدلًا من ذلك يمكن كتابة سطر واحد:</p>
<pre><code class="language-python">x = <span class="hljs-number">1</span>
y = <span class="hljs-number">2</span>
(x, y) = (y, x)
</code></pre>
<h2 id="الشريحة-18-الصفوف-إرجاع-أكثر-من-قيمة">الشريحة 18: الصفوف — إرجاع أكثر من قيمة</h2>
<ul>
<li>تُستخدم لإرجاع أكثر من قيمة من دالة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">quotient_and_remainder</span>(<span class="hljs-params">x, y</span>):
    q = x // y
    r = x % y
    <span class="hljs-keyword">return</span> (q, r)

both = quotient_and_remainder(<span class="hljs-number">10</span>,<span class="hljs-number">3</span>)
(quot, rem) = quotient_and_remainder(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>)
</code></pre>
<h2 id="الشريحة-19-الفكرة-الكبرى-big-idea">الشريحة 19: الفكرة الكبرى (BIG IDEA)</h2>
<blockquote>
<p>إرجاع كائن واحد (صف) يتيح لك إرجاع قيم متعددة (عناصر الصف).</p>
</blockquote>
<h2 id="الشريحة-20-جرب-بنفسك-you-try-it">الشريحة 20: جرّب بنفسك! (YOU TRY IT!)</h2>
<ul>
<li>اكتب دالة تحقّق هذه المواصفات.</li>
<li>تلميح: تذكّر كيف تتحقّق من وجود محرف داخل نص؟</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">char_counts</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a string of lowercase chars
    Return a tuple where the first element is the
    number of vowels in s and the second element
    is the number of consonants in s &quot;&quot;&quot;</span>
</code></pre>
<h2 id="الشريحة-21-عدد-متغير-من-الوسائط-variable-number-of-arguments">الشريحة 21: عدد متغيّر من الوسائط (Variable Number of Arguments)</h2>
<ul>
<li>في بايثون بعض الدوال المدمجة تأخذ عددًا متغيّرًا من الوسائط، مثل <code>min</code>.</li>
<li>تتيح بايثون للمبرمج الإمكان نفسه باستخدام رمز النجمة <code>*</code>:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mean</span>(<span class="hljs-params">*args</span>):
    tot = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> a <span class="hljs-keyword">in</span> args:
        tot += a
    <span class="hljs-keyword">return</span> tot/<span class="hljs-built_in">len</span>(args)
</code></pre>
<ul>
<li><code>numbers</code> (باسم المتغيّر الموضَّح في الشريحة) مربوطة بصف من القيم المُعطاة.</li>
<li>مثال: <code>mean(1,2,3,4,5,6)</code>.</li>
</ul>
<h2 id="الشريحة-22-القوائم-lists">الشريحة 22: القوائم (Lists)</h2>
<p>شريحة فاصلة تعلن موضوعًا جديدًا.</p>
<h2 id="الشريحة-23-القوائم-lists">الشريحة 23: القوائم (Lists)</h2>
<ul>
<li>تسلسل مرتَّب (Ordered) من الكائنات، قابل للفهرسة (Indexable).
<ul>
<li>عادةً متجانس (Homogeneous)، أي كل الأعداد الصحيحة أو كل النصوص أو كل القوائم.</li>
<li>لكنه قد يحتوي أنواعًا مختلطة (Mixed Types)، وإن كان ذلك غير شائع.</li>
</ul>
</li>
<li>يُكتب بين أقواس مربّعة <code>[</code> <code>]</code>.</li>
<li>قابل للتغيير (Mutable)، أي يمكنك تغيير قيم عناصر محدّدة من القائمة.</li>
</ul>
<h2 id="الشريحة-24-الفهرسة-والترتيب-indices-and-ordering">الشريحة 24: الفهرسة والترتيب (Indices and Ordering)</h2>
<pre><code class="language-python">a_list = []
L = [<span class="hljs-number">2</span>, <span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-number">4</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]]
</code></pre>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>[1,2]+[3,4]</code></td>
<td>يُقيَّم إلى <code>[1,2,3,4]</code></td>
</tr>
<tr>
<td><code>len(L)</code></td>
<td>يُقيَّم إلى <code>4</code></td>
</tr>
<tr>
<td><code>L[0]</code></td>
<td>يُقيَّم إلى <code>2</code></td>
</tr>
<tr>
<td><code>L[2]+1</code></td>
<td>يُقيَّم إلى <code>5</code></td>
</tr>
<tr>
<td><code>L[3]</code></td>
<td>يُقيَّم إلى <code>[1,2]</code> — أي قائمة أخرى!</td>
</tr>
<tr>
<td><code>L[4]</code></td>
<td>يعطي خطأ (Error)</td>
</tr>
<tr>
<td><code>i = 2</code> ثم <code>L[i-1]</code></td>
<td>يُقيَّم إلى <code>'a'</code> لأن <code>L[1]='a'</code></td>
</tr>
<tr>
<td><code>max([3,5,0])</code></td>
<td>يُقيَّم إلى <code>5</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-25-المرور-على-عناصر-القائمة-iterating-over-a-list">الشريحة 25: المرور على عناصر القائمة (Iterating Over a List)</h2>
<ul>
<li>احسب مجموع عناصر قائمة (List). هذا نمط شائع (Common Pattern).</li>
</ul>
<p>الشرائح تعرض طريقتين متكافئتين:</p>
<table>
<thead>
<tr>
<th>طريقة <code>for i in range(len(L))</code></th>
<th>طريقة <code>for i in L</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>total = 0</code></td>
<td><code>total = 0</code></td>
</tr>
<tr>
<td><code>for i in range(len(L)):</code></td>
<td><code>for i in L:</code></td>
</tr>
<tr>
<td><code>total += L[i]</code></td>
<td><code>total += i</code></td>
</tr>
<tr>
<td><code>print(total)</code></td>
<td><code>print(total)</code></td>
</tr>
</tbody>
</table>
<ul>
<li>لاحظ:
<ul>
<li>عناصر القائمة مفهرسة من <code>0</code> إلى <code>len(L)-1</code>، و<code>range(n)</code> يمضي من <code>0</code> إلى <code>n-1</code>.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-26-المرور-على-عناصر-القائمة-داخل-دالة">الشريحة 26: المرور على عناصر القائمة — داخل دالة</h2>
<ul>
<li>من الطبيعي (Natural) أن نلتقط التكرار على قائمة داخل دالة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">list_sum</span>(<span class="hljs-params">L</span>):
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        <span class="hljs-comment"># i is 8 then 3 then 5</span>
        total += i
    <span class="hljs-keyword">return</span> total
</code></pre>
<ul>
<li>استدعاء الدالة: <code>list_sum([8,3,5])</code>.</li>
<li>متغيّر الحلقة <code>i</code> يأخذ قيم القائمة بالترتيب: <code>8</code> ثم <code>3</code> ثم <code>5</code>.</li>
<li>لمساعدتك على كتابة الشيفرة وتصحيحها، علّق على قيم متغيّر الحلقة حتى لا تلتبس!</li>
</ul>
<h2 id="الشريحة-27-القوائم-تدعم-التكرار-lists-support-iteration">الشريحة 27: القوائم تدعم التكرار (Lists Support Iteration)</h2>
<ul>
<li>لأن القوائم تسلسلات مرتّبة من العناصر، فهي تتفاعل طبيعيًّا مع الدوال التكرارية (Iterative Functions).</li>
</ul>
<table>
<thead>
<tr>
<th>جمع عناصر قائمة</th>
<th>جمع أطوال عناصر قائمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def list_sum(L):</code></td>
<td><code>def len_sum(L):</code></td>
</tr>
<tr>
<td><code>total = 0</code></td>
<td><code>total = 0</code></td>
</tr>
<tr>
<td><code>for e in L:</code></td>
<td><code>for s in L:</code></td>
</tr>
<tr>
<td><code>total += e</code></td>
<td><code>total += len(s)</code></td>
</tr>
<tr>
<td><code>return(total)</code></td>
<td><code>return(total)</code></td>
</tr>
<tr>
<td><code>list_sum([1,3,5])</code> ⟵ <code>9</code></td>
<td><code>len_sum(['ab', 'def', 'g'])</code> ⟵ <code>6</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-28-جرب-بنفسك-you-try-it">الشريحة 28: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_and_prod</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot; L is a list of numbers
    Return a tuple where the first value is the
    sum of all elements in L and the second value
    is the product of all elements in L &quot;&quot;&quot;</span>
</code></pre>
<h2 id="الشريحة-29-الخلاصة-summary">الشريحة 29: الخلاصة (SUMMARY)</h2>
<ul>
<li>دوال <code>Lambda</code> مفيدة حين تحتاج دالة بسيطة مرة واحدة، ويمكن كتابة جسمها في سطر واحد.</li>
<li>الصفوف (Tuples) تسلسلات قابلة للفهرسة من الكائنات:
<ul>
<li>لا يمكنك تغيير عناصرها، مثلًا لا يمكنك إضافة كائنات أخرى إلى صف.</li>
<li>صياغتها باستخدام <code>()</code>.</li>
</ul>
</li>
<li>القوائم (Lists) تسلسلات قابلة للفهرسة من الكائنات:
<ul>
<li>يمكنك تغيير عناصرها. سنرى هذا في المحاضرة القادمة!</li>
<li>صياغتها باستخدام <code>[]</code>.</li>
</ul>
</li>
<li>القوائم والصفوف متشابهتان جدًا مع النصوص من حيث:
<ul>
<li>الفهرسة (Indexing).</li>
<li>التقطيع (Slicing).</li>
<li>المرور على العناصر (Looping Over Elements).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-30-mitopencourseware">الشريحة 30: MITOpenCourseWare</h2>
<p>https://ocw.mit.edu</p>
<p>مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.</p>
`,l={book:n,chapter:t,chapterTitle:e,slug:d,title:s,headings:o,html:a};export{n as book,t as chapter,e as chapterTitle,l as default,o as headings,a as html,d as slug,s as title};
