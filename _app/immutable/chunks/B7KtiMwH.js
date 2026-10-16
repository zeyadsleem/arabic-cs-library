const e="learn-ocaml",n="graphs",s="الرسوم البيانية",a="index",t="الرسوم البيانية",d=[{depth:2,id:"7-الرسوم-البيانية",text:"7. الرسوم البيانية"},{depth:3,id:"71-مصفوفة-التجاور",text:"7.1 مصفوفة التجاور"},{depth:3,id:"72-قوائم-التجاور",text:"7.2 قوائم التجاور"},{depth:3,id:"73-قواميس-التجاور",text:"7.3 قواميس التجاور"},{depth:3,id:"74-مقارنة-الأداء",text:"7.4 مقارنة الأداء"},{depth:3,id:"75-تمارين",text:"7.5 تمارين"}],c=`<h2 id="7-الرسوم-البيانية">7. الرسوم البيانية</h2>
<p>تُعدّ الرسوم البيانية بنية معطيات أساسية في علم الحاسوب. يتكوّن الرسم البياني من مجموعة
من <em>الرؤوس (vertices)</em> تربطها <em>الأضلاع (edges)</em>. وقد اعتدنا على تصوير الرسوم البيانية على النحو
المبيّن في الشكل <a href="#example-of-a-graph">7.1</a>.</p>
<p><img src="/arabic-cs-library/images/learn-ocaml/graphs-0-graph1-mps-.webp" alt="" id="example-of-a-graph"></p>
<p><strong>الشكل 7.1: مثال على رسم بياني.</strong></p>
<p>رسميًّا، الرسم البياني هو مجموعة V من الرؤوس ومجموعة E من الأضلاع، وهي
<em>أزواج غير مرتّبة</em> من الرؤوس. إذا كان {x,y}∈ E، نقول إن الرأسين x و y متجاوران. وبما أن
علاقة التجاور متناظرة، فإننا نتحدث عن <em>رسم بياني غير موجّه</em>.</p>
<p>ويمكننا أيضًا تعريف مفهوم <em>الرسم البياني الموجّه</em> بأخذ E لتكون مجموعة من <em>الأزواج المرتّبة</em>
من الرؤوس بدلًا من الأزواج غير المرتّبة. حينئذٍ نتحدث عن <em>الأقواس (arcs)</em> بدلًا من
الأضلاع. إذا كان (x,y) ∈ E، نقول إن y خَلَفٌ لـ x ونكتب x → y. ويُعطى مثال على
رسم بياني موجّه في الشكل <a href="#example-of-a-directed-graph">7.2</a>.</p>
<p><img src="/arabic-cs-library/images/learn-ocaml/graphs-1-graph1d-mps-.webp" alt="" id="example-of-a-directed-graph"></p>
<p><strong>الشكل 7.2: مثال على رسم بياني موجّه.</strong></p>
<p>يُسمّى القوس الممتد من رأس إلى نفسه، كما في هذا المثال، <em>حلقة (cycle)</em>. أما <em>درجة الدخول (indegree)</em>
(وبالمثل <em>درجة الخروج (outdegree)</em>) لرأس فهي عدد الأقواس المتّجهة نحوه (وبالمثل المتّجهة
بعيدًا عنه). و<em>المسار (path)</em> من رأس u إلى رأس v هو متتالية x0,…,xn من
الرؤوس بحيث x0 = u و xn = v و xi → xi+1 من أجل 0 ≤ i &lt; n. ويكون طول هذا المسار
n؛ فهو يحتوي على n قوسًا.</p>
<p>وقد تحمل الرؤوس، شأنها شأن الأقواس، معلومات. حينئذٍ نتحدث عن <em>رسم بياني موسوم (labeled graph)</em>. ويُعطى
مثال على رسم بياني موجّه وموسوم في الشكل <a href="#example-of-a-directed-labeled-graph">7.3</a>.</p>
<p><img src="/arabic-cs-library/images/learn-ocaml/graphs-2-graph1dl-mps-.webp" alt="" id="example-of-a-directed-labeled-graph"></p>
<p><strong>الشكل 7.3: مثال على رسم بياني موجّه وموسوم.</strong></p>
<p>من المهم ملاحظة أن وسم الرأس ليس هو الرأس نفسه. وعلى وجه الخصوص، قد يحمل رأسان الوسم
ذاته. ولذلك يشتمل الرسم البياني الموسوم، رسميًّا، على دالتين إضافيتين تعطيان على التوالي
وسم رأس في V ووسم قوس في E.</p>
<p>في ما يأتي، سنستخدم مصطلح ضلع لكلٍّ من الرسوم البيانية الموجّهة وغير الموجّهة.</p>
<h4>العمليات الأساسية على الرسوم البيانية</h4>
<p>قبل تعريف بنى المعطيات اللازمة لتمثيل الرسوم البيانية، لا بدّ من النظر في
العمليات التي ينبغي أن توفّرها هذه البنى. ونفعل ذلك بمعزل عن أي تمثيل بعينه، بهدف
بناء خوارزميات عامة. ويمكننا تمييز العمليات الأساسية الآتية:</p>
<ul>
<li>عمليات البناء، مثل إنشاء رسم بياني، أو إضافة رأس أو ضلع أو حذفه؛</li>
<li>عمليات الوصول، مثل اختبار ما إذا كان رأس أو ضلع ينتمي إلى رسم بياني،
أو الوصول إلى درجة رأس، أو وسمه، أو عدد الرؤوس أو الأضلاع؛</li>
<li>عمليات المرور الأساسية، مثل المرور على جميع الرؤوس، أو على جميع
خلفاء رأس معطى، أو على جميع الأضلاع.</li>
</ul>
<p>وكما سنرى بعد قليل، لا توجد بنية وحيدة للرسوم البيانية توفّر كل هذه
العمليات على نحو أمثل. وفي نهاية هذا الفصل، نقارن بين بنى مختلفة
للرسوم البيانية وفقًا لتعقيد العمليات المختلفة المذكورة أعلاه.</p>
<h3 id="71-مصفوفة-التجاور">7.1 مصفوفة التجاور</h3>
<p>ننظر في هذا القسم في الحالة التي تُمثَّل فيها الرؤوس بأعداد صحيحة، وبشكل أدق
بأعداد صحيحة متتالية 0,…,N − 1. بعبارة أخرى، لدينا
V = {0,…,N − 1}.</p>
<p>يعطي البرنامج <a href="#x21-220003r67">67</a> (انظر الصفحة التالية) توقيعًا مصغّرًا لهذه الرسوم البيانية. والنوع
<code>t</code> هو نوع الرسوم البيانية. وقد جُعل مجرّدًا عن قصد لأننا سنقدّم
تنفيذين مختلفين لهذا التوقيع. وتأخذ دالة الإنشاء <code>create</code>
القيمة N وسيطًا، وتعيدها دالة <code>nb_vertex</code>. والأهم هنا أننا
نفترض أن الرسم البياني يحتوي منذ البداية على N من الرؤوس. وبناءً على ذلك، لا
نوفّر عمليات لإضافة الرؤوس أو حذفها أو لاختبار انتمائها إلى
الرسم البياني. أما في حالة الأضلاع، فلدينا بالفعل هذه العمليات، وهي <code>add_edge</code>،
و<code>remove_edge</code>، و<code>mem_edge</code>. ولاحظ أن دالتي إضافة الأضلاع وحذفها
تقابلان بنية أمرية. ولا يوفّر التوقيع سوى دالتي المرور على خلفاء رأس
(<code>iter_succ</code>) وعلى جميع الأضلاع (<code>iter_edge</code>). ويمكن تحقيق المرور على
جميع الرؤوس بسهولة بحلقة <code>for</code> من 0 إلى N − 1. وأخيرًا،
لاحظ أن هذا التوقيع يصلح على حدٍّ سواء للرسوم البيانية الموجّهة وغير الموجّهة.</p>
<p>التوقيع مصغّر عن قصد. وعلى وجه الخصوص، فإن الرسوم البيانية غير موسومة. وتقترح بعض
تمارين هذا القسم امتدادات.</p>
<blockquote></blockquote>
<p>التمثيل المباشر لمثل هذا الرسم البياني هو مصفوفة M بحجم N × N،
حيث يشير كل عنصر Mi,j إلى وجود ضلع بين الرأسين i
و j. وبما أن الرسوم البيانية مفترضة غير موسومة، فيكفي استخدام مصفوفة من
القيم المنطقية:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> vertex = <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">type</span> t = <span class="hljs-built_in">bool</span> <span class="hljs-built_in">array</span> <span class="hljs-built_in">array</span>
</code></pre>
<p>تعريف الدالة التي تنشئ رسمًا بيانيًا خاليًا من الأضلاع واضح: ننشئ
مصفوفة مربّعة مهيّأة بالقيمة <code>false</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> create n = <span class="hljs-type">Array</span>.make_matrix n n <span class="hljs-literal">false</span>
  <span class="hljs-keyword">let</span> nb_vertex = <span class="hljs-type">Array</span>.length
</code></pre>
<blockquote></blockquote>
<p>في ما يأتي، نفترض أن جميع الرسوم البيانية موجّهة. ويشير التمرين <a href="#x21-229004r4">7.4</a> إلى
التعديلات اللازمة للرسوم البيانية غير الموجّهة. ويمكن إجراء إضافة ضلع أو حذفه أو اختبار
وجوده كلها في زمن ثابت:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> mem_edge g v1 v2 = g.(v1).(v2)
  <span class="hljs-keyword">let</span> add_edge g v1 v2 = g.(v1).(v2) &lt;- <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> remove_edge g v1 v2 = g.(v1).(v2) &lt;- <span class="hljs-literal">false</span>
</code></pre>
<p>لتطبيق دالة <code>f:vertex-&gt;unit</code> على جميع خلفاء رأس <code>v</code> في رسم بياني <code>g</code>،
يكفي المرور على الصف <code>g.(v)</code> من المصفوفة، مثلًا باستخدام <code>Array.iteri</code>.
ونختبر وجود الضلع قبل تطبيق الدالة <code>f</code> على الرأس المقابل.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> iter_succ f g v =
    <span class="hljs-type">Array</span>.iteri (<span class="hljs-keyword">fun</span> w b -&gt; <span class="hljs-keyword">if</span> b <span class="hljs-keyword">then</span> f w) g.(v)
</code></pre>
<p>لتطبيق دالة <code>f:vertex-&gt;vertex-&gt;unit</code> على جميع أضلاع رسم بياني <code>g</code>، نبدأ
بالمرور على رؤوس <code>g</code> بحلقة <code>for</code>. ثم نمرّ، لكل رأس <code>v</code>، على أضلاعه
الخارجة باستخدام <code>iter_succ</code>. وتُشتقّ الدالة المُمرَّرة إلى <code>iter_succ</code> بتطبيق
جزئي للدالة <code>f</code> على <code>v</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> iter_edge f g =
    <span class="hljs-keyword">for</span> v = <span class="hljs-number">0</span> <span class="hljs-keyword">to</span> nb_vertex g - <span class="hljs-number">1</span> <span class="hljs-keyword">do</span> iter_succ (f v) g v <span class="hljs-keyword">done</span>
</code></pre>
<p>يُعطى الكود الكامل للرسوم البيانية عبر مصفوفات التجاور في البرنامج <a href="#x21-220024r68">68</a>. ويمكن
تكييف بنية مصفوفة التجاور مع حالة الرسوم البيانية الموسومة (انظر
التمرين <a href="#x21-229003r3">7.3</a>) و/أو الرسوم البيانية غير الموجّهة (انظر التمرين <a href="#x21-229004r4">7.4</a>).</p>
<h4>التعقيد</h4>
<p>يلخّص الجدول في الشكل <a href="#cost-of-operations-on-adjacency-matrices">7.4</a> تعقيد العمليات الرئيسية على
مصفوفات التجاور. وبصفة عامة، يُعبَّر عن التكلفة بدلالة عدد الرؤوس N</p>
<p>وعدد الأضلاع E. أما في الحالة الخاصة لمصفوفات التجاور،
فإن التكلفة تعتمد على N فحسب.</p>
<p><strong>الشكل 7.4: تكلفة العمليات على مصفوفات التجاور.</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mem_edge</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>add_edge</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>iter_succ</code></td>
<td>O(N)</td>
</tr>
<tr>
<td><code>iter_vertex</code></td>
<td>O(N)</td>
</tr>
<tr>
<td><code>iter_edge</code></td>
<td>O(N2)</td>
</tr>
</tbody>
</table>
<p>بطبيعة الحال، نفترض أن الدوال المُمرَّرة كوسائط إلى <code>iter_succ</code>
و<code>iter_vertex</code> و<code>iter_edge</code> ذات تكلفة ثابتة. ومن هذا الجدول نستنتج أن
مصفوفات التجاور ملائمة جيدًا للرسوم البيانية <em>الكثيفة (dense)</em>، أي الرسوم البيانية التي يكون فيها
عدد الأضلاع E من رتبة N2. وفي الواقع، تكون درجة خروج كل رأس
حينئذٍ من رتبة N، بحيث تصبح <code>iter_succ</code> مثالية. وبالمثل، يتعيّن على <code>iter_edge</code>
أن تمرّ على عدد من الأضلاع من رتبة N2، ومن ثمّ فهي أيضًا
مثالية.</p>
<p>أما تكلفة الحيّز (space)، فمن الواضح أن مصفوفة التجاور تشغل حيزًا تربيعيًّا،
أي (N + 1)2 كلمة في حالة مصفوفة منطقية (انظر القسم <a href="https://usr.lmf.cnrs.fr/lpo/mainch3.html#runtime-model"><em>3.2</em></a> <em>نموذج التنفيذ</em>). ويمكننا تقليل هذه التكلفة بمعامل ثابت باستخدام المتجهات
البتية (bit vectors) (انظر
القسم <a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#bit-vectors"><em>4.2</em></a> <em>المتجهات البتية</em>). ويقترح التمرين <a href="#x21-229005r5">7.5</a> مثل هذا التحسين. ومن
المهم ملاحظة أن هذا التحسين ممكن فقط إذا كانت الأضلاع غير
موسومة.</p>
<h3 id="72-قوائم-التجاور">7.2 قوائم التجاور</h3>
<p>في حالة الرسوم البيانية المتخلخلة، يتمثّل بديل مصفوفات التجاور في استخدام
مصفوفة (array) تحتوي على قائمة خلفاء كل رأس. ونحن نتحدث عن <em>قوائم التجاور (adjacency lists)</em>.
ويتبع نوع الرسوم البيانية هذا التعريف مباشرةً.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">type</span> vertex = <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">type</span> t = vertex <span class="hljs-built_in">list</span> <span class="hljs-built_in">array</span>
</code></pre>
<p>يُمثَّل الرسم البياني الفارغ بمصفوفة تحتوي على قوائم فارغة فقط.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> create n = <span class="hljs-type">Array</span>.make n <span class="hljs-literal">[]</span>
  <span class="hljs-keyword">let</span> nb_vertex = <span class="hljs-type">Array</span>.length
</code></pre>
<p>لاختبار وجود ضلع بين الرأسين <code>v1</code> و<code>v2</code> في رسم بياني <code>g</code>، نمرّ على
قائمة التجاور <code>g.(v1)</code> بحثًا عن <code>v2</code>. ونفعل ذلك هنا باستخدام الدالة
<code>List.mem</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> mem_edge g v1 v2 =
    <span class="hljs-type">List</span>.mem v2 g.(v1)
</code></pre>
<p>نضيف ضلعًا بين <code>v1</code> و<code>v2</code> بإضافة <code>v2</code> إلى القائمة <code>g.(v1)</code>. ولا نفعل ذلك إلا
إذا لم يكن الضلع موجودًا من قبل، لتجنّب تكرارات غير ضرورية في قائمة
التجاور.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> add_edge g v1 v2 =
    <span class="hljs-keyword">if</span> not (mem_edge g v1 v2) <span class="hljs-keyword">then</span> g.(v1) &lt;- v2 :: g.(v1)
</code></pre>
<p>نحذف الضلع <code>v1</code> → <code>v2</code> بحذف أي ظهور محتمل لـ <code>v2</code> في القائمة <code>g.(v1)</code>.
ويمكننا فعل ذلك بسهولة باستخدام <code>List.filter</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> remove_edge g v1 v2 =
    g.(v1) &lt;- <span class="hljs-type">List</span>.filter ((&lt;&gt;) v2) g.(v1)
</code></pre>
<p>ومع ذلك، لاحظ أن استخدام <code>List.filter</code> هذا فيه عيبان: فمن جهة،
لا يستفيد من غياب التكرارات في القائمة ليتوقف مبكرًا. ومن
جهة أخرى، يعيد بناء القائمة <code>g.(v1)</code> بأكملها بلا داعٍ في الحالة
التي لا يظهر فيها <code>v2</code>. ويقترح التمرين <a href="#x21-230002r8">7.8</a> علاجًا لهذه المسائل.
وبالمثل، يمكن الاستفادة من كون الرؤوس أعدادًا صحيحة لتحسين
العمليات الثلاث السابقة بالحفاظ على قوائم التجاور مرتّبة (انظر
التمرين <a href="#x21-230003r9">7.9</a>).</p>
<p>المرور على خلفاء رأس <code>v</code> في رسم بياني <code>g</code> أبسط مما هو عليه في حالة
مصفوفات التجاور. ويُنفَّذ على نحو بديهي بتطبيق <code>List.iter</code> على
قائمة التجاور <code>g.(v)</code>.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> iter_succ f g v = <span class="hljs-type">List</span>.iter f g.(v)
</code></pre>
<p>أما كود <code>iter_edge</code>، في المقابل، فهو نفسه المستخدم لمصفوفات التجاور.</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> iter_edge f g =
    <span class="hljs-keyword">for</span> v = <span class="hljs-number">0</span> <span class="hljs-keyword">to</span> nb_vertex g - <span class="hljs-number">1</span> <span class="hljs-keyword">do</span> iter_succ (f v) g v <span class="hljs-keyword">done</span>
</code></pre>
<p>يُعطى الكود الكامل للرسوم البيانية عبر قوائم التجاور في البرنامج <a href="#x21-222023r69">69</a>.</p>
<blockquote></blockquote>
<h4>التعقيد</h4>
<p>يلخّص الجدول في الشكل <a href="#cost-of-operations-on-adjacency-lists">7.5</a> تعقيد العمليات الرئيسية على
قوائم التجاور. وهنا، يرمز δ إلى درجة خروج رأس.</p>
<p><strong>الشكل 7.5: تكلفة العمليات على قوائم التجاور.</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mem_edge</code></td>
<td>O(δ)</td>
</tr>
<tr>
<td><code>add_edge</code></td>
<td>O(δ)</td>
</tr>
<tr>
<td><code>iter_succ</code></td>
<td>O(δ)</td>
</tr>
<tr>
<td><code>iter_vertex</code></td>
<td>O(N)</td>
</tr>
<tr>
<td><code>iter_edge</code></td>
<td>O(E)</td>
</tr>
</tbody>
</table>
<p>لاحظ أن العمليتين <code>mem_edge</code> و<code>add_edge</code> لم تعودا، على خلاف ما هو عليه الحال
في مصفوفات التجاور، من الرتبة O(1) بل من الرتبة O(δ). وفي المقابل، أصبح لكلٍّ من
<code>iter_succ</code> و<code>iter_edge</code> تعقيد أمثل.</p>
<p>أما تكلفة الحيّز، فلقوائم التجاور تعقيد أمثل O(N + E). ولكي
نكون دقيقين، فإن التكلفة هي N + 3E + 1 كلمة (انظر القسم <a href="https://usr.lmf.cnrs.fr/lpo/mainch3.html#runtime-model"><em>3.2</em></a> <em>نموذج التنفيذ</em>).</p>
<h3 id="73-قواميس-التجاور">7.3 قواميس التجاور</h3>
<p>من العيوب الواضحة في بنيتَي المعطيات السابقتين شرط وجوب تمثيل الرؤوس
بأعداد صحيحة، بل بأعداد صحيحة متتالية. وهذا
التمثيل ملائم للرسوم البيانية التي لا تتغيّر فيها مجموعات الرؤوس. أما إذا
أردنا، على العكس، إضافة الرؤوس أو حذفها ديناميكيًّا، فيتعيّن علينا
تعديل البنيتين السابقتين. ويمكننا، على سبيل المثال، استخدام مصفوفات قابلة لتغيير الحجم
للسماح بإضافة الرؤوس. ولحذف الرؤوس، يمكننا أن نتخيّل
وسمها بحيث تُستبعد من الرسم البياني، لكن هذا سيؤثّر
على تعقيد الدوال <code>iter_succ</code> و<code>iter_vertex</code> و
<code>iter_edge</code>.</p>
<p>من الناحية المثالية، نريد بنية رسم بياني لا تكون رؤوسها بالضرورة أعدادًا صحيحة
ويمكن إضافتها أو حذفها ديناميكيًّا. كما تجمع البنية بين
المزايا الخاصة لمصفوفات التجاور وقوائم التجاور في الزمن والحيّز.
وهذه البنية موجودة: يكفي أن نجمع بنية قاموس مع
بنية مجموعة. فالرسم البياني ليس في جوهره سوى قاموس يُقرَن فيه كل رأس
بمجموعة خلفائه. بعبارة أخرى، نحتفظ بفكرة
قوائم التجاور، لكن نستبدل المصفوفة بقاموس، والقوائم
بمجموعات. وسنسمّي هذه البنية <em>قاموس التجاور (adjacency dictionary)</em>. وبهذه الطريقة، لا تقتصر الرؤوس
على الأعداد الصحيحة، ويمكن إضافتها وحذفها بسهولة. أما من حيث
الفعالية، فيكفي استخدام جدول مُجزَّأ (hash table) للقاموس للحصول على تعقيد
أمثل. ويمكننا أيضًا استخدام جدول مُجزَّأ لتمثيل مجموعة خلفاء
رأس.</p>
<p>وبالتالي يمكننا أن نُوسِّط بنية قاموس التجاور لدينا بوحدة <code>H</code> من
الجداول المُجزَّأة (مثل الوحدة المذكورة في القسم <a href="https://usr.lmf.cnrs.fr/lpo/mainch5.html#hash-tables"><em>5.3</em></a> <em>الجداول المُجزَّأة</em> أو الوحدة <code>Hashtbl</code> من
المكتبة القياسية لـ OCaml).</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">module</span> <span class="hljs-type">Graph</span>(<span class="hljs-type">H</span>: <span class="hljs-type">HashTable</span>) = <span class="hljs-keyword">struct</span>
</code></pre>
<p>للتوضيح، نُدخل وحدة <code>V</code> للقاموس، كمرادف للوحدة
<code>H</code>. ويكون نوع الرؤوس حينئذٍ هو نوع مفاتيح الوحدة
<code>V</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">module</span> <span class="hljs-type">V</span> = <span class="hljs-type">H</span>
    <span class="hljs-keyword">type</span> vertex = <span class="hljs-type">V</span>.key
</code></pre>
<p>وبالمثل، نُدخل وحدة <code>E</code> لمجموعات الرؤوس المتجاورة، وهي أيضًا مرادف للوحدة
<code>H</code>. والفكرة هنا هي تمثيل مجموعة من الرؤوس بجدول مُجزَّأ،
وذلك بقرن كل عنصر من عناصر المجموعة بالقيمة <code>()</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">module</span> <span class="hljs-type">E</span> = <span class="hljs-type">H</span>
</code></pre>
<p>وبالتالي يكون نوع الرسوم البيانية كما يأتي:</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">type</span> t = (<span class="hljs-built_in">unit</span> <span class="hljs-type">E</span>.t) <span class="hljs-type">V</span>.t
</code></pre>
<p>لو كانت الأضلاع موسومة، لكفى قرن كل خَلَف w للرأس v بوسم
الضلع v → w بدلًا من القيمة <code>()</code> (انظر التمرين <a href="#x21-231001r10">7.10</a>).</p>
<p>لا يصبح إنشاء رسم بياني سوى مسألة إنشاء قاموس فارغ. ويُحصَل على عدد الرؤوس ببساطة باعتباره عدد مفاتيح
القاموس.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> create <span class="hljs-literal">()</span> = <span class="hljs-type">V</span>.create <span class="hljs-literal">()</span>
    <span class="hljs-keyword">let</span> nb_vertex g = <span class="hljs-type">V</span>.length g
</code></pre>
<p>نتحقق من انتماء رأس <code>v</code> إلى الرسم البياني <code>g</code> باستخدام <code>V.mem</code>، أي باختبار كونه مفتاحًا
في القاموس. ونضيف <code>v</code> بإنشاء ارتباط يقرن <code>v</code> بجدول مُجزَّأ
جديد.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> mem_vertex g v = <span class="hljs-type">V</span>.mem g v
    <span class="hljs-keyword">let</span> add_vertex g v = <span class="hljs-type">V</span>.add g v (<span class="hljs-type">E</span>.create <span class="hljs-literal">()</span>)
</code></pre>
<p>نلاحظ أن الدالة <code>add_vertex</code> تفترض أن <code>v</code> غير موجود بعد في الرسم البياني <code>g</code>.
وإلا لتعيّن علينا أولًا التحقق من وجود <code>v</code> باستخدام <code>mem_vertex</code>. أما
حذف رأس <code>v</code> فأكثر دقة: فلا يقتصر الأمر على وجوب حذف ارتباطه من
القاموس، بل يلزم أيضًا حذف كل ظهور لـ <code>v</code> من مجموعات تجاور
الرؤوس الأخرى (المكتوبة هنا بالرمز <code>s</code>).</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> remove_vertex g v =
      <span class="hljs-type">V</span>.remove g v;
      <span class="hljs-type">V</span>.iter (<span class="hljs-keyword">fun</span> _ s -&gt; <span class="hljs-type">E</span>.remove s v) g
</code></pre>
<p>ولمزيد من الفعالية، ينبغي ألا نصل إلا إلى أسلاف <code>v</code>. ويقترح التمرين <a href="#x21-231006r14">7.14</a>
تحسينًا من هذا القبيل.</p>
<p>لإضافة ضلع بين الرأسين <code>v1</code> و
<code>v2</code> أو حذفه أو اختبار وجوده، نبدأ باسترجاع مجموعة تجاور <code>v1</code> باستخدام <code>V.findgv1</code>. ثم نستخدم
على التوالي الدوال <code>E.replace</code> و<code>E.remove</code> و<code>E.mem</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> mem_edge g v1 v2 = <span class="hljs-type">E</span>.mem (<span class="hljs-type">V</span>.find g v1) v2
    <span class="hljs-keyword">let</span> add_edge g v1 v2 = <span class="hljs-type">E</span>.replace (<span class="hljs-type">V</span>.find g v1) v2 <span class="hljs-literal">()</span>
    <span class="hljs-keyword">let</span> remove_edge g v1 v2 = <span class="hljs-type">E</span>.remove (<span class="hljs-type">V</span>.find g v1) v2
</code></pre>
<p>تفترض هذه الدوال الثلاث أن <code>v1</code> موجود بالفعل في الرسم البياني، أي أن
<code>V.findgv1</code> لا يفشل. أما الدالة <code>add_edge</code>، فنستخدم فيها <code>E.replace</code> بدلًا من
<code>E.add</code>، لتجنّب التكرارات في مجموعة التجاور.</p>
<blockquote></blockquote>
<p>للمرور على مجموعة رؤوس رسم بياني <code>g</code>، يكفي المرور على مجموعة مفاتيح
القاموس باستخدام <code>V.iter</code>. وبالمثل، نمرّ على خلفاء رأس <code>v</code>
بالمرور على مجموعة تجاوره باستخدام <code>E.iter</code>.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> iter_vertex f g = <span class="hljs-type">V</span>.iter (<span class="hljs-keyword">fun</span> v _ -&gt; f v) g
    <span class="hljs-keyword">let</span> iter_succ f g v = <span class="hljs-type">E</span>.iter (<span class="hljs-keyword">fun</span> w _ -&gt; f w) (<span class="hljs-type">V</span>.find g v)
</code></pre>
<p>وهنا أيضًا، نفترض أن <code>iter_succ</code> تُستدعى على رأس موجود <code>v</code>. وللمرور على جميع
الأضلاع، يكفي تركيب <code>iter_vertex</code> و<code>iter_succ</code> كما فعلنا من أجل مصفوفات
التجاور وقوائم التجاور. غير أن الوصول إلى مجموعة تجاور
<code>v</code> باستخدام <code>V.findgv</code> سيكون مكلفًا بلا داعٍ. وبدلًا من ذلك، يكفي تركيب
<code>V.iter</code> و<code>E.iter</code> مباشرةً.</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">let</span> iter_edge f g = <span class="hljs-type">V</span>.iter (<span class="hljs-keyword">fun</span> v s -&gt; <span class="hljs-type">E</span>.iter (f v) s) g
</code></pre>
<p>يُعطى الكود الكامل لبنية الرسم البياني هذه في البرنامج <a href="#x21-224024r70">70</a>.</p>
<p>أما بالنسبة إلى الرسوم البيانية غير الموجّهة والرسوم البيانية الموسومة أو الرسوم البيانية ذات الأضلاع المتعددة بين رأسين،
فيُحال القارئ إلى التمارين <a href="#x21-231001r10">7.10</a>–<a href="#x21-231003r12">7.12</a>.</p>
<h4>التعقيد</h4>
<p>إذا افترضنا أن القواميس والمجموعات منفَّذة بجداول مُجزَّأة، نحصل على
الأداء المعطى في جدول الشكل <a href="#cost-of-operations-on-adjacency-dictionaries">7.6</a>.</p>
<p><strong>الشكل 7.6: تكلفة العمليات على قواميس التجاور.</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mem_vertex</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>add_vertex</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>remove_vertex</code></td>
<td>O(N)</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>mem_edge</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>add_edge</code></td>
<td>O(1)</td>
</tr>
<tr>
<td><code>remove_edge</code></td>
<td>O(1)</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>iter_succ</code></td>
<td>O(δ)</td>
</tr>
<tr>
<td><code>iter_vertex</code></td>
<td>O(N)</td>
</tr>
<tr>
<td><code>iter_edge</code></td>
<td>O(E)</td>
</tr>
</tbody>
</table>
<p>نلاحظ أن التعقيدات أمثل، باستثناء حالة <code>remove_vertex</code>
(انظر التمرين <a href="#x21-231006r14">7.14</a>). أما تكلفة الحيّز، فلا بدّ من وضع افتراض
بشأن أحجام الجداول المُجزَّأة. فإذا افترضنا أن عدد الجرافات (buckets) يساوي على الأقل
ضعف عدد الارتباطات في كل جدول مُجزَّأ، فإن تكلفة الحيّز لجدول
مُجزَّأ يحتوي على K مدخلة هي 6K + 4 كلمة. ومن ثمّ، بالنسبة إلى رسم بياني يحتوي على N رأسًا
وE ضلعًا، تكون التكلفة الإجمالية:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mo stretchy="false">(</mo><mn>6</mn><mi>N</mi><mo>+</mo><mn>4</mn><mo stretchy="false">)</mo><mo>+</mo><mo>∑</mo><mo stretchy="false">(</mo><mn>6</mn><mi>δ</mi><mo>+</mo><mn>4</mn><mo stretchy="false">)</mo><mi>v</mi><mi>v</mi></mrow><annotation encoding="application/x-tex">(6N + 4) + \\sum (6 δ + 4) v v</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">6</span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">4</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.6em;vertical-align:-0.55em;"></span><span class="mop op-symbol large-op" style="position:relative;top:0em;">∑</span><span class="mopen">(</span><span class="mord">6</span><span class="mord mathnormal" style="margin-right:0.0379em;">δ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">4</span><span class="mclose">)</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span></span></span></span></span>
<p>وهذا يساوي 10N + 6E + 4 كلمة في المجموع.</p>
<h4>الرسوم البيانية المستدامة</h4>
<p>الرسوم البيانية المنفَّذة باستخدام قواميس التجاور كما عُرضت أعلاه أمرية
بسبب الطبيعة الأمرية للجداول المُجزَّأة. ونحصل بطبيعة الحال على رسوم بيانية مستدامة
باستبدال الجداول المُجزَّأة ببنية معطيات مستدامة. ويمكننا، على سبيل المثال، استخدام
أي قاموس يمتلك التوقيع <code>Map.S</code> الخاص بـ OCaml (انظر التمرين <a href="#x21-231009r15">7.15</a>)، ولا سيّما
كل تلك التي نوقشت في الفصل <a href="https://usr.lmf.cnrs.fr/lpo/mainch5.html#sets-and-dictionaries">5</a>.</p>
<h3 id="74-مقارنة-الأداء">7.4 مقارنة الأداء</h3>
<p>نستعرض هنا بإيجاز أداء بنى الرسوم البيانية المختلفة. ويُلخَّص التعقيد
الزمني للعمليات الرئيسية في جدول الشكل <a href="#comparison-of-different-graph-data-structures">7.7</a>. وكما
أشرنا سابقًا أعلاه، تقدّم قواميس التجاور أفضل
تعقيد ممكن لكل عملية.</p>
<p><strong>الشكل 7.7: مقارنة بين بنى معطيات مختلفة للرسوم البيانية.</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>تجاور</th>
<th>تجاور</th>
<th>تجاور</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>مصفوفات</td>
<td>قوائم</td>
<td>قواميس</td>
</tr>
<tr>
<td><code>mem_vertex</code></td>
<td>—</td>
<td>—</td>
<td>O(1)</td>
</tr>
<tr>
<td><code>add_vertex</code></td>
<td>—</td>
<td>—</td>
<td>O(1)</td>
</tr>
<tr>
<td><code>remove_vertex</code></td>
<td>—</td>
<td>—</td>
<td>O(N)</td>
</tr>
<tr>
<td><code>mem_edge</code></td>
<td>O(1)</td>
<td>O(δ)</td>
<td>O(1)</td>
</tr>
<tr>
<td><code>add_edge</code></td>
<td>O(1)</td>
<td>O(δ)</td>
<td>O(1)</td>
</tr>
<tr>
<td><code>remove_edge</code></td>
<td>O(1)</td>
<td>O(δ)</td>
<td>O(1)</td>
</tr>
<tr>
<td><code>iter_succ</code></td>
<td>O(N)</td>
<td>O(δ)</td>
<td>O(δ)</td>
</tr>
<tr>
<td><code>iter_vertex</code></td>
<td>O(N)</td>
<td>O(N)</td>
<td>O(N)</td>
</tr>
<tr>
<td><code>iter_edge</code></td>
<td>O(N2)</td>
<td>O(E)</td>
<td>O(E)</td>
</tr>
</tbody>
</table>
<p>أما تكلفة الحيّز، فتذكّر تكلفة كل بنية رسم بياني
بعدد الكلمات:</p>
<ul>
<li>مصفوفة التجاور: 2 كلمة؛</li>
<li>قوائم التجاور: N + 3E + 1 كلمة؛</li>
<li>قاموس التجاور: 10N + 6E + 4 كلمة.</li>
</ul>
<p>من الواضح أن قوائم التجاور أكثر اقتصاديًّا من حيث الذاكرة من قواميس
التجاور. أما المقارنة مع مصفوفات التجاور فأصعب. فالواقع أنها
تعتمد على كثافة الرسم البياني، أي النسبة بين عدد الرؤوس
N وعدد الأضلاع E. فبالنسبة إلى رسم بياني كثيف جدًّا، يكون فيه E قريبًا من N2، تكون
مصفوفة التجاور أكثر اقتصاديًّا. وفي حالة رسم بياني متخلخل، تكون فيه على سبيل المثال
E ∼ N، تكون قوائم التجاور أكثر اقتصاديًّا. وبصفة عامة، تُفضَّل القوائم
على المصفوفات عندما E &lt; N2∕3، وبالمثل تُفضَّل القواميس على
المصفوفات عندما E &lt; N2∕6. والقوائم دائمًا أفضل من القواميس <em>من حيث الحيّز</em>.</p>
<p>بطبيعة الحال، عند اختيار بنية للرسوم البيانية، يجب الموازنة بين تعقيد
العمليات المختلفة في الحيّز وتعقيدها في الزمن.</p>
<div class="exercises"><h3 id="75-تمارين">7.5 تمارين</h3>
<h4>مصفوفات التجاور</h4>
<p><strong>7.1</strong> نقل رسم بياني موجّه G، ورمزه GR، هو الرسم البياني الذي يمتلك
الرؤوس نفسها التي يمتلكها G ويحتوي على ضلع x → y إذا وفقط إذا وُجد
ضلع y → x في G. اكتب دالة <code>reverse:graph-&gt;graph</code> تحسب
نقل رسم بياني معطى.</p>
<p><strong>7.2</strong> أضف عملية <code>nb_edge:t-&gt;int</code> تعطي عدد الأضلاع في زمن ثابت.
تلميح: تتبّع عدد الأضلاع في بنية الرسم البياني
بتحديث قيمته في <code>add_edge</code> و<code>remove_edge</code>.</p>
<p><strong>7.3</strong> عدّل مصفوفات التجاور لتناسب الرسوم البيانية التي تكون أضلاعها موسومة بنوع معطى
<code>label</code>.</p>
<p><strong>7.4</strong> أسهل طريقة لتمثيل الرسوم البيانية غير الموجّهة هي الحفاظ على البنية نفسها
المستخدمة للرسوم البيانية الموجّهة، لكن مع صيانة الثابت القائل إنه لكل ضلع
a → b يوجد أيضًا ضلع b → a. عدّل العمليتين <code>add_edge</code> و<code>remove_edge</code>
في مصفوفات التجاور وقوائم التجاور وفقًا لذلك. وعدّل أيضًا <code>iter_edge</code> بحيث
يمرّ على كل ضلع مرة واحدة فقط.</p>
<p><strong>7.5</strong> عدّل بنية مصفوفة التجاور لتستخدم المتجهات البتية (bit vectors) (انظر القسم
<a href="https://usr.lmf.cnrs.fr/lpo/mainch4.html#bit-vectors"><em>4.2</em></a> <em>المتجهات البتية</em>) بدلًا من المصفوفات المنطقية. فما هو المكسب من حيث
الحيّز؟</p>
<p><strong>7.6</strong> الإغلاق المتعدّي (transitive closure) لرسم بياني G هو رسم بياني T يمتلك الرؤوس نفسها
التي يمتلكها G، وضلع بين i و j عندما يوجد <em>مسار</em> بين i و j في G.
وعندما يُمثَّل الرسم البياني بمصفوفة منطقية، يمكن حساب الإغلاق المتعدّي
في زمن O(N3) باستخدام خوارزمية فلويد-وورسال (Floyd-Warshall). والكود الزائف (pseudo-code) كما
يأتي:</p>
<table>
<thead>
<tr>
<th>T ← G</th>
</tr>
</thead>
<tbody>
<tr>
<td>من أجل k من 0 إلى N − 1</td>
</tr>
<tr>
<td>من أجل i من 0 إلى N − 1</td>
</tr>
<tr>
<td>من أجل j من 0 إلى N − 1</td>
</tr>
<tr>
<td>Ti,j ← Ti,j أو (Ti,k و Tk,j)</td>
</tr>
</tbody>
</table>
<p>تتمثّل الفكرة في تحديد، من أجل قيم متزايدة لـ k، ما إذا كان يوجد مسار بين
i و j لا يستخدم سوى رؤوس وسيطة أصغر من k. وينظر السطر الأخير من
الكود الزائف في الحالتين لمسار بين i و j، إما مارًّا عبر
k أو غير مارٍّ به. اكتب دالة <code>transitive_closure:t-&gt;t</code> تنفّذ
هذه الخوارزمية.</p>
<h4>قوائم التجاور</h4>
<p><strong>7.7</strong> أعد حلّ التمارين من <a href="#x21-229002r2">7.2</a> إلى <a href="#x21-229004r4">7.4</a> بالنسبة إلى قوائم التجاور.</p>
<p><strong>7.8</strong> عدّل الدالة <code>remove_edge</code> على قوائم التجاور بحيث (1) لا
تعدّل قائمة التجاور إذا لم يكن الضلع المراد حذفه موجودًا، و(2) تستفيد
من كون قوائم التجاور لا تحتوي على تكرارات لتتوقف بمجرد العثور على الضلع.</p>
<p><strong>7.9</strong> عدّل العمليات على قوائم التجاور لصيانة الثابت القائل إن
قوائم التجاور مرتّبة. واستفد من هذه الخاصية لتحسين بعض
العمليات.</p>
<h4>قواميس التجاور</h4>
<p><strong>7.10</strong> عدّل كود البرنامج <a href="#x21-224024r70">70</a> ليطابق الرسوم البيانية التي تكون أضلاعها موسومة بقيم من
أي نوع. وبشكل أدق، أعطِ الرسوم البيانية النوع متعدد الأشكال <code>type’at=(’aE.t)V.t</code>،
حيث <code>’a</code> هو نوع الوسوم.</p>
<p><strong>7.11</strong> عدّل بنية قاموس التجاور لتناسب الرسوم البيانية غير الموجّهة استنادًا إلى
التمرين <a href="#x21-229004r4">7.4</a>.</p>
<p><strong>7.12</strong> عدّل بنية قاموس التجاور لتناسب الرسوم البيانية ذات <em>الأضلاع المتعددة (multiple edges)</em>، أي التي قد يرتبط فيها رأسان بأكثر من ضلع واحد. وفي حالة
الأضلاع المتعددة غير الموسومة، يجب أن يقرن القاموس كل رأس بـ
<em>المجموعة المتعددة (multi-set)</em> الخاصة بخلفائه. وفي حالة الأضلاع المتعددة الموسومة، يمكننا تمييز حالتين،
بحسب ما إذا كانت الأضلاع بين v1 و v2 قد تحمل الوسم نفسه أم
لا.</p>
<p><strong>7.13</strong> عدّل الدالّ (functor) في البرنامج <a href="#x21-224024r70">70</a> بحيث يأخذ، بدلًا من أخذ وحدة <code>H</code> من
الجداول المُجزَّأة كوسيط:</p>
<ul>
<li>إما وحدة V تُدخل نوعًا t مزوّدًا بدالتي التجزئة والمقارنة؛</li>
<li>أو وحدتين، M و S، تنفّذان على التوالي القواميس والمجموعات
على النوع نفسه من الرؤوس.</li>
</ul>
<p><strong>7.14</strong> عدّل بنية قاموس التجاور لتتبّع مجموعة
أسلاف رأس على نحو فعّال. بعبارة أخرى، وفّر عملية</p>
<pre><code class="language-ocaml">    <span class="hljs-keyword">val</span> iter_pred: (vertex -&gt; <span class="hljs-built_in">unit</span>) -&gt; t -&gt; vertex -&gt; <span class="hljs-built_in">unit</span>
</code></pre>
<p>تكون تكلفتها متناسبة مع درجة الدخول (indegree). واستخدم هذه الدالة لإعادة تنفيذ
الدالة <code>remove_vertex</code>.</p>
<p><strong>7.15</strong> عدّل الدالّ في البرنامج <a href="#x21-224024r70">70</a> للحصول على رسوم بيانية مستدامة باستبدال
الوسيط <code>H</code> بوحدة <code>M</code> ذات التوقيع <code>Map.S</code>.</p>
</div>`,o={book:e,chapter:n,chapterTitle:s,slug:a,title:t,headings:d,html:c};export{e as book,n as chapter,s as chapterTitle,o as default,d as headings,c as html,a as slug,t as title};
