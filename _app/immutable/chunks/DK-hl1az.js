const n="mit-6100l",s="lecture-21",t="المحاضرة 21: قياس زمن البرامج وعدّ العمليات",a="notes",e="شرائح المحاضرة 21: توقيت البرامج وعدّ العمليات",d=[{depth:2,id:"الشريحة-1-توقيت-البرامج-وعد-العمليات",text:"الشريحة 1: توقيت البرامج وعدّ العمليات"},{depth:2,id:"الشريحة-2-كتابة-برامج-كفؤة",text:"الشريحة 2: كتابة برامج كفؤة"},{depth:2,id:"الشريحة-3-الكفاءة-مهمة",text:"الشريحة 3: الكفاءة مهمة"},{depth:2,id:"الشريحة-4-تقييم-البرامج",text:"الشريحة 4: تقييم البرامج"},{depth:2,id:"الشريحة-5-استطراد-بشأن-الوحدات",text:"الشريحة 5: استطراد بشأن الوحدات"},{depth:2,id:"الشريحة-6-التوقيت",text:"الشريحة 6: التوقيت"},{depth:2,id:"الشريحة-7-توقيت-برنامج",text:"الشريحة 7: توقيت برنامج"},{depth:2,id:"الشريحة-8-توقيت-ctof",text:"الشريحة 8: توقيت c_to_f"},{depth:2,id:"الشريحة-9-توقيت-mysum",text:"الشريحة 9: توقيت mysum"},{depth:2,id:"الشريحة-10-توقيت-square",text:"الشريحة 10: توقيت square"},{depth:2,id:"الشريحة-11-توقيت-البرامج-غير-متسق",text:"الشريحة 11: توقيت البرامج غير متسق"},{depth:2,id:"الشريحة-12-العد",text:"الشريحة 12: العدّ"},{depth:2,id:"الشريحة-13-عد-العمليات",text:"الشريحة 13: عدّ العمليات"},{depth:3,id:"ctof-ثلاث-عمليات",text:"c_to_f: ثلاث عمليات"},{depth:3,id:"mysum-1x112-3x4-عملية",text:"mysum: ‏1+(x+1)*(1+2) = 3x+4 عملية"},{depth:3,id:"square-الصيغة-المنشورة-1n1n12-3n²-1-عملية",text:"square: الصيغة المنشورة 1+n*(1)*n*(1+2) = 3n² + 1 عملية"},{depth:2,id:"الشريحة-14-عد-عمليات-ctof",text:"الشريحة 14: عدّ عمليات c_to_f"},{depth:2,id:"الشريحة-15-عد-عمليات-mysum",text:"الشريحة 15: عدّ عمليات mysum"},{depth:2,id:"الشريحة-16-عد-عمليات-square",text:"الشريحة 16: عدّ عمليات square"},{depth:2,id:"الشريحة-17-عد-العمليات-مستقل-عن-اختلافات-الحواسيب-لكن",text:"الشريحة 17: عدّ العمليات مستقل عن اختلافات الحواسيب، لكن…"},{depth:2,id:"الشريحة-18-ما-زلنا-بحاجة-إلى-طريقة-أفضل",text:"الشريحة 18: …ما زلنا بحاجة إلى طريقة أفضل"},{depth:2,id:"الشريحة-19-النسبة-وشروط-الاستخدام",text:"الشريحة 19: النسبة وشروط الاستخدام"},{depth:2,id:"ملحق-ملف-كود-المحاضرة-الرسمي-كاملا-دون-تغيير",text:"ملحق: ملف كود المحاضرة الرسمي كاملًا دون تغيير"}],c=`<h1>شرائح المحاضرة 21: توقيت البرامج وعدّ العمليات</h1>
<p><strong>المصادر الأصلية:</strong> <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec21.pdf">الشرائح الرسمية</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec21_code.py">ملف الكود الرسمي</a>.</p>
<p><strong>النسبة والترخيص:</strong> آنا بيل (Ana Bell)، مقرر 6.100L، خريف 2022، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare. هذه ترجمة وتكييف عربي غير رسمي للاستخدام غير التجاري، وليست معتمدة من MIT؛ تخضع المواد الأصلية المشمولة والترجمة لرخصة <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>. لا تشمل الرخصة الافتراضية مواد الأطراف الثالثة المستثناة.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الأرقام التالية هي أرقام صفحات الشرائح الأصلية، بما فيها صفحة النسبة. نُقلت مخرجات لقطات الشاشة إلى جداول بعد قراءة الأصل، ولم يُعتمد على استخراج النص وحده. بقي كود Python دون تغيير. توجد في الأصل فروق بين صيغة عدّ عمليات <code>square</code> في الشريحة 13 وبين العدّ الفعلي في الكود والجداول؛ حُفظت الصيغة المنشورة ووُضع توضيح مستقل عندها.</p>
</blockquote>
<h2 id="الشريحة-1-توقيت-البرامج-وعد-العمليات">الشريحة 1: توقيت البرامج وعدّ العمليات</h2>
<p>نزّل الشرائح وملفات <code>.py</code> للمتابعة.</p>
<p>6.100L، المحاضرة 21 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-كتابة-برامج-كفؤة">الشريحة 2: كتابة برامج كفؤة</h2>
<ul>
<li>ركّزنا حتى الآن على صحة النتائج (Correctness). إنها أول ما ينبغي الاهتمام به! لكن هذا لا يكفي أحيانًا.</li>
<li>قد تكون المسائل شديدة التعقيد.</li>
<li>وقد تكون مجموعات البيانات ضخمة جدًّا: في عام 2014، كانت Google تخدم <code>30,000,000,000,000</code> صفحة تغطي <code>100,000,000 GB</code> من البيانات.</li>
</ul>
<h2 id="الشريحة-3-الكفاءة-مهمة">الشريحة 3: الكفاءة مهمة</h2>
<ul>
<li>نفصل بين الكفاءة الزمنية (Time Efficiency) والكفاءة المكانية (Space Efficiency) للبرنامج.</li>
<li>توجد مفاضلة (Tradeoff) بينهما: يمكن استخدام قدر إضافي من الذاكرة لتخزين قيم والبحث عنها بسرعة أكبر لاحقًا.
<ul>
<li>فكّر في فيبوناتشي العودية (Recursive Fibonacci) مقابل فيبوناتشي مع حفظ النتائج (Memoization).</li>
</ul>
</li>
<li>صعوبات فهم الكفاءة:
<ul>
<li>يمكن تنفيذ البرنامج بطرق مختلفة كثيرة.</li>
<li>يمكنك حل مسألة باستخدام عدد قليل فقط من الخوارزميات المختلفة.</li>
</ul>
</li>
<li>نريد فصل اختيار التنفيذ (Implementation) عن اختيار الخوارزمية (Algorithm) الأكثر تجريدًا.</li>
</ul>
<h2 id="الشريحة-4-تقييم-البرامج">الشريحة 4: تقييم البرامج</h2>
<ul>
<li>القياس بمؤقّت (Timer).</li>
<li>عدّ العمليات (Counting Operations).</li>
<li>المفهوم المجرد لرتبة النمو (Order of Growth).</li>
</ul>
<blockquote>
<p><strong>وصف المترجم للتأكيد البصري:</strong> يحيط إطار أحمر بالطريقتين الأوليين؛ فهما موضوع هذه المحاضرة، بينما يأتي مفهوم رتبة النمو لاحقًا.</p>
</blockquote>
<h2 id="الشريحة-5-استطراد-بشأن-الوحدات">الشريحة 5: استطراد بشأن الوحدات</h2>
<ul>
<li>الوحدة (Module) مجموعة من تعريفات Python في ملف.
<ul>
<li>توفر Python وحدات مفيدة كثيرة: للرياضيات، والرسم البياني، وأخذ العينات العشوائية في الاحتمالات، وأدوات الإحصاء، وغيرها.</li>
</ul>
</li>
<li>عليك أولًا استيراد (Import) الوحدة إلى بيئتك:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> dateutil
<span class="hljs-keyword">import</span> math
</code></pre>
<ul>
<li>استدعِ الدوال داخل الوحدة باستخدام اسم الوحدة وصيغة النقطة (Dot Notation):</li>
</ul>
<pre><code class="language-python">math.sin(math.pi/<span class="hljs-number">2</span>)
</code></pre>
<h2 id="الشريحة-6-التوقيت">الشريحة 6: التوقيت</h2>
<p>التوقيت (Timing).</p>
<h2 id="الشريحة-7-توقيت-برنامج">الشريحة 7: توقيت برنامج</h2>
<ul>
<li>استخدم وحدة <code>time</code>.</li>
<li>تذكّر أن الاستيراد يعني إحضار ذلك الصنف إلى ملفك.</li>
<li>ابدأ الساعة.</li>
<li>استدعِ الدالة.</li>
<li>أوقف الساعة.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">def</span> <span class="hljs-title function_">c_to_f</span>(<span class="hljs-params">c</span>):
    <span class="hljs-keyword">return</span> c*<span class="hljs-number">9.0</span>/<span class="hljs-number">5</span> + <span class="hljs-number">32</span>

tstart = time.time()
c_to_f(<span class="hljs-number">37</span>)
dt = time.time() - tstart
<span class="hljs-built_in">print</span>(dt, <span class="hljs-string">&quot;s,&quot;</span>)
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> تقول الشريحة «الصنف» (Class) عند شرح الاستيراد؛ المستورَد في هذا المثال هو وحدة <code>time</code>. بقي معنى العبارة الأصلية أعلاه ولم يُعدّل الكود.</p>
</blockquote>
<h2 id="الشريحة-8-توقيت-ctof">الشريحة 8: توقيت <code>c_to_f</code></h2>
<ul>
<li>الدالة سريعة جدًّا، إلى حد أننا لا نستطيع حتى توقيتها بدقة.</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>الزمن المعروض بالثواني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c_to_f(1)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(10)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(100)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(1000)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(10000)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(100000)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(1000000)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>c_to_f(10000000)</code></td>
<td><code>0.0</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-9-توقيت-mysum">الشريحة 9: توقيت <code>mysum</code></h2>
<ul>
<li>كلما زاد المدخل (Input)، زاد الزمن المستغرَق أيضًا.</li>
<li>هل يوجد نمط؟
<ul>
<li>من <code>0.009</code> إلى <code>0.05</code> إلى <code>0.5</code> إلى <code>5</code> إلى ماذا؟</li>
</ul>
</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>الزمن المعروض بالثواني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mysum(1)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>mysum(10)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>mysum(100)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>mysum(1000)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>mysum(10000)</code></td>
<td><code>0.0019927024841308594</code></td>
</tr>
<tr>
<td><code>mysum(100000)</code></td>
<td><code>0.009970903396606445</code></td>
</tr>
<tr>
<td><code>mysum(1000000)</code></td>
<td><code>0.05089521408081055</code></td>
</tr>
<tr>
<td><code>mysum(10000000)</code></td>
<td><code>0.4966745376586914</code></td>
</tr>
<tr>
<td><code>mysum(100000000)</code></td>
<td><code>5.688449382781982</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>وصف المترجم للتأكيد البصري:</strong> تؤطر الشريحة القيم الزمنية الخمس غير الصفرية بالأحمر لإبراز نمو الزمن مع المدخل.</p>
</blockquote>
<h2 id="الشريحة-10-توقيت-square">الشريحة 10: توقيت <code>square</code></h2>
<ul>
<li>كلما زاد المدخل، زاد الزمن المستغرَق أيضًا.</li>
<li>لم ينتهِ استدعاء <code>square</code> بالمدخل <code>100000</code> خلال زمن معقول.</li>
<li>ربما يمكننا تخمين نمط إذا صبرنا لجولة إضافية؟</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>الزمن المعروض بالثواني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>square(1)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>square(10)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>square(100)</code></td>
<td><code>0.0</code></td>
</tr>
<tr>
<td><code>square(1000)</code></td>
<td><code>0.06244492530822754</code></td>
</tr>
<tr>
<td><code>square(10000)</code></td>
<td><code>5.55335428237915</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-11-توقيت-البرامج-غير-متسق">الشريحة 11: توقيت البرامج غير متسق</h2>
<ul>
<li>
<p><strong>الهدف:</strong> تقييم خوارزميات مختلفة.</p>
</li>
<li>
<p>ينبغي أن يختلف زمن التشغيل (Running Time) بين الخوارزميات.</p>
</li>
<li>
<p>ينبغي ألّا يختلف زمن التشغيل بين التنفيذات.</p>
</li>
<li>
<p>ينبغي ألّا يختلف زمن التشغيل بين الحواسيب.</p>
</li>
<li>
<p>ينبغي ألّا يختلف زمن التشغيل بين اللغات.</p>
</li>
<li>
<p>ينبغي أن يكون زمن التشغيل قابلًا للتنبؤ للمدخلات الصغيرة.</p>
</li>
<li>
<p>يختلف الزمن باختلاف المدخلات، لكننا لا نستطيع حقًّا التعبير عن علاقة بين المدخلات والزمن المطلوب.</p>
</li>
<li>
<p>لا يمكن قياسه إلا بعد التنفيذ (A Posteriori).</p>
</li>
</ul>
<h2 id="الشريحة-12-العد">الشريحة 12: العدّ</h2>
<p>العدّ (Counting).</p>
<h2 id="الشريحة-13-عد-العمليات">الشريحة 13: عدّ العمليات</h2>
<ul>
<li>نفترض أن هذه الخطوات تستغرق زمنًا ثابتًا (Constant Time):
<ul>
<li>العمليات الرياضية.</li>
<li>المقارنات (Comparisons).</li>
<li>الإسنادات (Assignments).</li>
<li>الوصول إلى الكائنات في الذاكرة.</li>
</ul>
</li>
<li>نعدّ العمليات المنفَّذة بوصفها دالة في حجم المدخل (Input Size).</li>
</ul>
<h3 id="ctof-ثلاث-عمليات"><code>c_to_f</code>: ثلاث عمليات</h3>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">c_to_f</span>(<span class="hljs-params">c</span>):
    <span class="hljs-keyword">return</span> c*<span class="hljs-number">9.0</span>/<span class="hljs-number">5</span> + <span class="hljs-number">32</span>
</code></pre>
<blockquote>
<p><strong>وصف المترجم لعلامات العدّ:</strong> يؤطر الأصل التعبير <code>c*9.0/5 + 32</code> ويضع عليه «3 عمليات»: ضرب، وقسمة، وجمع.</p>
</blockquote>
<h3 id="mysum-1x112-3x4-عملية"><code>mysum</code>: ‏<code>1+(x+1)*(1+2) = 3x+4</code> عملية</h3>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mysum</span>(<span class="hljs-params">x</span>):
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(x+<span class="hljs-number">1</span>):
        total += i
    <span class="hljs-keyword">return</span> total
</code></pre>
<blockquote>
<p><strong>وصف المترجم لعلامات العدّ:</strong> <code>total = 0</code> عملية واحدة. تعيين قيمة <code>i</code> في كل مرور عملية واحدة، و<code>total += i</code> عمليتان. تتكرر الحلقة <code>x+1</code> مرة.</p>
</blockquote>
<h3 id="square-الصيغة-المنشورة-1n1n12-3n²-1-عملية"><code>square</code>: الصيغة المنشورة <code>1+n*(1)*n*(1+2) = 3n² + 1</code> عملية</h3>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">square</span>(<span class="hljs-params">n</span>):
    sqsum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
            sqsum += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> sqsum
</code></pre>
<blockquote>
<p><strong>وصف المترجم لعلامات العدّ:</strong> التهيئة عملية واحدة؛ تعيين <code>i</code> عملية واحدة، وتعيين <code>j</code> عملية واحدة، و<code>sqsum += 1</code> عمليتان. تتكرر كل حلقة <code>n</code> مرة.</p>
</blockquote>
<blockquote>
<p><strong>ملاحظة المترجم بشأن فرق في الأصل:</strong> الصيغة المكتوبة في الشريحة هي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn><msup><mi>n</mi><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">3n^2+1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">3</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>؛ لكن احتساب تعيين <code>i</code> مرة لكل دورة خارجية، كما تفعل نسخة الكود الرسمية، يعطي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn><msup><mi>n</mi><mn>2</mn></msup><mo>+</mo><mi>n</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">3n^2+n+1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">3</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>. القيم في الشريحة 16 توافق الصيغة الثانية. كلاهما ذو رتبة نمو تربيعية، ولم تُستبدل صيغة الأصل بصمت.</p>
</blockquote>
<h2 id="الشريحة-14-عد-عمليات-ctof">الشريحة 14: عدّ عمليات <code>c_to_f</code></h2>
<ul>
<li>مهما يكن المدخل، يبقى عدد العمليات نفسه.</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>عدد العمليات</th>
<th>معامل العدد مقارنة بالسطر السابق</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c_to_f(100)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>c_to_f(1000)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>c_to_f(10000)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>c_to_f(100000)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>c_to_f(1000000)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>c_to_f(10000000)</code></td>
<td><code>3</code></td>
<td><code>1.0</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-15-عد-عمليات-mysum">الشريحة 15: عدّ عمليات <code>mysum</code></h2>
<ul>
<li>عندما يصبح المدخل عشرة أضعاف، يصبح عدد العمليات المنفَّذة نحو عشرة أضعاف.</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>عدد العمليات</th>
<th>معامل العدد مقارنة بالسطر السابق</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mysum(100)</code></td>
<td><code>304</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>mysum(1000)</code></td>
<td><code>3004</code></td>
<td><code>9.88158</code></td>
</tr>
<tr>
<td><code>mysum(10000)</code></td>
<td><code>30004</code></td>
<td><code>9.98802</code></td>
</tr>
<tr>
<td><code>mysum(100000)</code></td>
<td><code>300004</code></td>
<td><code>9.9988</code></td>
</tr>
<tr>
<td><code>mysum(1000000)</code></td>
<td><code>3000004</code></td>
<td><code>9.99988</code></td>
</tr>
<tr>
<td><code>mysum(10000000)</code></td>
<td><code>30000004</code></td>
<td><code>9.99999</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>وصف المترجم للتأكيد البصري:</strong> تؤطر الشريحة المعامل الأخير <code>9.99999</code> بالأحمر.</p>
</blockquote>
<h2 id="الشريحة-16-عد-عمليات-square">الشريحة 16: عدّ عمليات <code>square</code></h2>
<ul>
<li>عندما يصبح المدخل عشرة أضعاف، يصبح عدد العمليات نحو مئة ضعف.</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>عدد العمليات</th>
<th>معامل العدد مقارنة بالسطر السابق</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>square(1)</code></td>
<td><code>5</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>square(10)</code></td>
<td><code>311</code></td>
<td><code>62.2</code></td>
</tr>
<tr>
<td><code>square(100)</code></td>
<td><code>30101</code></td>
<td><code>96.78778</code></td>
</tr>
<tr>
<td><code>square(1000)</code></td>
<td><code>3001001</code></td>
<td><code>99.69772</code></td>
</tr>
<tr>
<td><code>square(10000)</code></td>
<td><code>300010001</code></td>
<td><code>99.96998</code></td>
</tr>
</tbody>
</table>
<ul>
<li>عندما يتضاعف المدخل، يصبح عدد العمليات نحو أربعة أضعاف.</li>
</ul>
<table>
<thead>
<tr>
<th>الاستدعاء</th>
<th>عدد العمليات</th>
<th>معامل العدد مقارنة بالسطر السابق</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>square(128)</code></td>
<td><code>49281</code></td>
<td><code>1.0</code></td>
</tr>
<tr>
<td><code>square(256)</code></td>
<td><code>196865</code></td>
<td><code>3.99474</code></td>
</tr>
<tr>
<td><code>square(512)</code></td>
<td><code>786945</code></td>
<td><code>3.99738</code></td>
</tr>
<tr>
<td><code>square(1024)</code></td>
<td><code>3146753</code></td>
<td><code>3.99869</code></td>
</tr>
<tr>
<td><code>square(2048)</code></td>
<td><code>12584961</code></td>
<td><code>3.99935</code></td>
</tr>
<tr>
<td><code>square(4096)</code></td>
<td><code>50335745</code></td>
<td><code>3.99967</code></td>
</tr>
<tr>
<td><code>square(8192)</code></td>
<td><code>201334785</code></td>
<td><code>3.99984</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>وصف المترجم للتأكيد البصري:</strong> يؤطر الأصل المعاملين الأخيرين <code>99.96998</code> و<code>3.99984</code> بالأحمر، لإظهار اقترابهما من <code>100</code> و<code>4</code>.</p>
</blockquote>
<h2 id="الشريحة-17-عد-العمليات-مستقل-عن-اختلافات-الحواسيب-لكن">الشريحة 17: عدّ العمليات مستقل عن اختلافات الحواسيب، لكن…</h2>
<ul>
<li>
<p><strong>الهدف:</strong> تقييم خوارزميات مختلفة.</p>
</li>
<li>
<p>ينبغي أن يختلف «زمن» التشغيل بين الخوارزميات.</p>
</li>
<li>
<p>ينبغي ألّا يختلف «زمن» التشغيل بين التنفيذات.</p>
</li>
<li>
<p>ينبغي ألّا يختلف «زمن» التشغيل بين الحواسيب.</p>
</li>
<li>
<p>ينبغي ألّا يختلف «زمن» التشغيل بين اللغات.</p>
</li>
<li>
<p>ينبغي أن يكون «زمن» التشغيل قابلًا للتنبؤ للمدخلات الصغيرة.</p>
</li>
<li>
<p>لا يوجد تعريف فعلي للعمليات التي يجب عدّها.</p>
</li>
<li>
<p>يختلف العدّ باختلاف المدخلات، ويمكن اشتقاق علاقة بين المدخلات والعدّ.</p>
</li>
</ul>
<h2 id="الشريحة-18-ما-زلنا-بحاجة-إلى-طريقة-أفضل">الشريحة 18: …ما زلنا بحاجة إلى طريقة أفضل</h2>
<ul>
<li>
<p>التوقيت والعدّ يقيّمان التنفيذات.</p>
</li>
<li>
<p>التوقيت والعدّ يقيّمان الآلات.</p>
</li>
<li>
<p>نريد تقييم الخوارزمية.</p>
</li>
<li>
<p>نريد تقييم قابلية التوسع (Scalability).</p>
</li>
<li>
<p>نريد التقييم بدلالة حجم المدخل.</p>
</li>
</ul>
<h2 id="الشريحة-19-النسبة-وشروط-الاستخدام">الشريحة 19: النسبة وشروط الاستخدام</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>.</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
<h2 id="ملحق-ملف-كود-المحاضرة-الرسمي-كاملا-دون-تغيير">ملحق: ملف كود المحاضرة الرسمي كاملًا دون تغيير</h2>
<blockquote>
<p><strong>توضيح المترجم للتعليقات:</strong> يعرض الجزء الأول توقيت ثلاث دوال: ثابتة، وخطية لجمع <code>0+1+…+x</code>، وتربيعية تحسب <code>n*n</code> بطريقة غير كفؤة. تعرض <code>time_wrapper</code> التوقيت لأحجام مدخلات مختلفة. يحذّر التعليق من تشغيل <code>square</code> على المدخلات الكبيرة. يعيد الجزء الثاني تعريف الدوال لإرجاع العدّ والنتيجة معًا، ثم تعرض <code>count_wrapper</code> عدد العمليات ونسبته إلى العدّ السابق. بقيت جميع التعليقات الأصلية داخل الكود كما هي.</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">import</span> time

<span class="hljs-comment">## -------------------------------------------------- ##</span>
<span class="hljs-comment">## EXAMPLE: timing a program</span>
<span class="hljs-comment">## -------------------------------------------------- ##</span>

<span class="hljs-comment"># constant fcn</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">c_to_f</span>(<span class="hljs-params">c</span>):
    <span class="hljs-keyword">return</span> c*<span class="hljs-number">9.0</span>/<span class="hljs-number">5</span> + <span class="hljs-number">32</span>

<span class="hljs-comment"># linear fcn -- finds 0+1+2+...+x</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">mysum</span>(<span class="hljs-params">x</span>):
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(x+<span class="hljs-number">1</span>):
        total += i
    <span class="hljs-keyword">return</span> total

<span class="hljs-comment"># quadratic fcn -- finds n*n inefficiently</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">square</span>(<span class="hljs-params">n</span>):
    sqsum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
            sqsum += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> sqsum

<span class="hljs-comment"># helper function to show timing</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">time_wrapper</span>(<span class="hljs-params">f, L</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Timing&#x27;</span>, f.__name__)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        t = time.time()
        f(i)
        dt = time.time()-t
        <span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;<span class="hljs-subst">{f.__name__}</span>(<span class="hljs-subst">{i}</span>) took <span class="hljs-subst">{dt}</span> sec&quot;</span>)

<span class="hljs-comment">##creates a list [1, 10, 100, ...] to test different input sizes</span>
L_N = [<span class="hljs-number">1</span>]
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>):
    L_N.append(L_N[-<span class="hljs-number">1</span>]*<span class="hljs-number">10</span>)

<span class="hljs-comment">## time each function</span>
<span class="hljs-comment"># time_wrapper(c_to_f,  L_N)</span>
<span class="hljs-comment"># time_wrapper(mysum, L_N)</span>
<span class="hljs-comment"># time_wrapper(square, L_N)  # caution this will take 500 sec, then 50000 sec</span>


<span class="hljs-comment">## -------------------------------------------------- ##</span>
<span class="hljs-comment">## EXAMPLE: counting the number of operations</span>
<span class="hljs-comment">## -------------------------------------------------- ##</span>

<span class="hljs-comment">## constant fcn with counting the number of ops</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">c_to_f</span>(<span class="hljs-params">c</span>):
    counter = <span class="hljs-number">3</span>
    <span class="hljs-keyword">return</span> (counter, c*<span class="hljs-number">9.0</span>/<span class="hljs-number">5</span> + <span class="hljs-number">32</span>)

<span class="hljs-comment"># linear fcn  with counting the number of ops</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">mysum</span>(<span class="hljs-params">x</span>):
    counter = <span class="hljs-number">1</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(x+<span class="hljs-number">1</span>):
        counter += <span class="hljs-number">3</span>
        total += i
    <span class="hljs-keyword">return</span> (counter, total)

<span class="hljs-comment"># quadratic fcn  with counting the number of ops</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">square</span>(<span class="hljs-params">n</span>):
    counter = <span class="hljs-number">1</span>
    mysum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        counter += <span class="hljs-number">1</span>
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
            counter += <span class="hljs-number">3</span>
            mysum += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> (counter, mysum)

<span class="hljs-comment"># helper function to show number of operations</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">count_wrapper</span>(<span class="hljs-params">f, L</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Counting&#x27;</span>, f.__name__)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        counter = f(i)[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> i == <span class="hljs-built_in">min</span>(L):
            multiplier = <span class="hljs-number">1.0</span>
        <span class="hljs-keyword">else</span>:
            multiplier = counter/<span class="hljs-built_in">float</span>(prev)
        prev = counter
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{f.__name__}</span>(<span class="hljs-subst">{i}</span>): <span class="hljs-subst">{counter}</span> ops, <span class="hljs-subst">{<span class="hljs-built_in">round</span>(multiplier,<span class="hljs-number">5</span>)}</span> x more&quot;</span>)


L1 = [<span class="hljs-number">100</span>]
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    L1.append(L1[-<span class="hljs-number">1</span>]*<span class="hljs-number">10</span>)

L2_a = [<span class="hljs-number">128</span>, <span class="hljs-number">256</span>, <span class="hljs-number">512</span>, <span class="hljs-number">1024</span>, <span class="hljs-number">2048</span>, <span class="hljs-number">4096</span>, <span class="hljs-number">8192</span>]
L2_b = [<span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">1000</span>, <span class="hljs-number">10000</span>]
<span class="hljs-comment"># count_wrapper(c_to_f, L1)</span>
<span class="hljs-comment"># count_wrapper(mysum, L1)</span>
<span class="hljs-comment"># count_wrapper(square, L2_a)</span>
<span class="hljs-comment"># count_wrapper(square, L2_b)</span>
</code></pre>
`,l={book:n,chapter:s,chapterTitle:t,slug:a,title:e,headings:d,html:c};export{n as book,s as chapter,t as chapterTitle,l as default,d as headings,c as html,a as slug,e as title};
