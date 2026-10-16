const n="mooc",s="part-2",a="الجزء 2: الجمل الشرطية",e="1-programming_terminology",p="مصطلحات البرمجة",t=[{depth:2,id:"الجملة",text:"الجملة"},{depth:2,id:"الكتلة",text:"الكتلة"},{depth:2,id:"التعبير",text:"التعبير"},{depth:2,id:"الدالة",text:"الدالة"},{depth:2,id:"نوع-البيانات",text:"نوع البيانات"},{depth:2,id:"الصياغة",text:"الصياغة"},{depth:2,id:"تنقيح-الأخطاء",text:"تنقيح الأخطاء"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستصبح على معرفة ببعض المصطلحات الجوهرية في البرمجة</li>
<li>ستعرف الفرق بين الجملة والتعبير</li>
<li>ستتمكّن من معرفة نوع بيانات تعبير مُقيَّم</li>
<li>ستتعلّم استخدام أساليب تنقيح الأخطاء للعثور على الأخطاء في شيفرتك</li>
</ul>
</blockquote>
<p>في الجزء الأول من هذه الدورة لم نُولِ المصطلحات اهتمامًا كبيرًا، فلننظر الآن إلى بعض المفاهيم الجوهرية في البرمجة.</p>
<h2 id="الجملة">الجملة</h2>
<p><em>جملة</em> (<em>statement</em>) هي جزء من البرنامج ينفّذ شيئًا ما. وكثيرًا ما تشير — لكن ليس دائمًا — إلى أمر واحد.</p>
<p>على سبيل المثال، <code>print(&quot;Hi!&quot;)</code> جملة تطبع سطرًا من النص. وبالمثل، <code>number = 2</code> جملة تُسند قيمة إلى متغيّر.</p>
<p>قد تكون الجملة أعقد أيضًا. إذ قد تحتوي على جمل أخرى. تمتد الجملة التالية على ثلاثة أسطر:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> name == <span class="hljs-string">&quot;Anna&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)
    number = <span class="hljs-number">2</span>
</code></pre>
<p>في الحالة أعلاه توجد جملتان (جملة طباعة وجملة إسناد) داخل جملة شرطية.</p>
<h2 id="الكتلة">الكتلة</h2>
<p><em>كتلة</em> (<em>block</em>) مجموعة من جمل متتالية تقع على المستوى نفسه في بنية البرنامج. فمثلًا، تحتوي كتلة الجملة الشرطية على الجمل التي تُنفَّذ فقط إذا كان الشرط صحيحًا.</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> age &gt; <span class="hljs-number">17</span>:
    <span class="hljs-comment"># beginning of the conditional block</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You are of age!&quot;</span>)
    age = age + <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You are now one year older...&quot;</span>)
    <span class="hljs-comment"># end of the conditional block</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This here belongs to another block&quot;</span>)
</code></pre>
<p>في Python تُعبَّر الكتل بمسافة بادئة واحدة متساوية لكل شيفرة داخل الكتلة.</p>
<p>ملاحظة: يجب أن تكون الكتلة الرئيسية لبرنامج Python دائمًا في أقصى يسار الملف، دون مسافة بادئة:</p>
<pre><code class="language-python"><span class="hljs-comment"># this program will not work because it is not written at the leftmost egde of the file</span>
  <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;hello world&quot;</span>)
  <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;this program is not very good...&quot;</span>)
</code></pre>
<h2 id="التعبير">التعبير</h2>
<p><em>تعبير</em> (<em>expression</em>) هو جزء من الشيفرة ينتج عنُه نوع بيانات معيَّن. فعند تنفيذ البرنامج يُقيَّم التعبير بحيث تصبح له قيمة يمكن استخدامها بعد ذلك في البرنامج.</p>
<p>إليك بعض أمثلة التعبيرات:</p>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>القيمة</th>
<th>النوع</th>
<th>نوع بيانات Python</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>2 + 4 + 3</code></td>
<td><code>9</code></td>
<td>عدد صحيح</td>
<td><code>int</code></td>
</tr>
<tr>
<td><code>&quot;abc&quot; + &quot;de&quot;</code></td>
<td><code>&quot;abcde&quot;</code></td>
<td>سلسلة نصية</td>
<td><code>str</code></td>
</tr>
<tr>
<td><code>11 / 2</code></td>
<td><code>5.5</code></td>
<td>عدد عشري</td>
<td><code>float</code></td>
</tr>
<tr>
<td><code>2 * 5 &gt; 9</code></td>
<td><code>True</code></td>
<td>قيمة منطقية</td>
<td><code>bool</code></td>
</tr>
</tbody>
</table>
<p>ولأن جميع التعبيرات لها نوع، يمكن إسنادها إلى متغيّرات:</p>
<pre><code class="language-python"><span class="hljs-comment"># the variable x is assigned the value of the expression 1 + 2</span>
x = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>
</code></pre>
<p>ويمكن تجميع التعبيرات البسيطة معًا لتشكيل تعبيرات أعقد، مثلًا باستخدام عمليات حسابية:</p>
<pre><code class="language-python"><span class="hljs-comment"># the variable y is assigned the value of the expression &#x27;3 times x plus x squared&#x27;</span>
y = <span class="hljs-number">3</span> * x + x**<span class="hljs-number">2</span>
</code></pre>
<h2 id="الدالة">الدالة</h2>
<p><em>دالة</em> (<em>function</em>) تنفّذ وظيفة ما. ويمكن للدوال أيضًا أن تأخذ واحدًا أو أكثر من <em>الوسائط</em> (<em>arguments</em>)، وهي بيانات يمكن تغذية الدالة بها ومعالجتها. وأحيانًا تُسمّى الوسائط أيضًا <em>معاملات</em> (<em>parameters</em>). وهناك تمييز تقني بين الوسيط والمعامل، لكن الكلمتين تُستخدمان غالبًا بالتبادل. ويكفي الآن أن تتذكّر أن المصطلحين يشيران إلى فكرة البيانات المُمرَّرة إلى الدالة.</p>
<p>وتُنفَّذ الدالة عندما <em>تُستدعى</em>، أي عندما تُذكر الدالة (ووسائطها إن وُجدت) في الشيفرة. تستدعي الجملة التالية الدالة <code>print</code> بالوسيط <code>&quot;this is an argument&quot;</code>:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;this is an argument&quot;</span>)
</code></pre>
<p>ودالة أخرى استخدمتها كثيرًا من قبل هي الدالة <code>input</code>، وهي تطلب مُدخَلًا من المستخدم. والوسيط لهذه الدالة هو الرسالة التي تُعرض على المستخدم:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your name: &quot;</span>)
</code></pre>
<p>وفي هذه الحالة تُعيد الدالة أيضًا <em>قيمة</em>. فبعد تنفيذ الدالة يُستبدل قسم الشيفرة الذي استُدعيت فيه بالقيمة التي تعيدها؛ فهو تعبير آخر أصبح الآن مُقيَّمًا. وتُعيد الدالة <code>input</code> قيمة سلسلة نصية تحتوي على كل ما كتبه المستخدم عند المُطالبة. وغالبًا ما تُخزَّن القيمة التي تعيدها الدالة في متغيّر ليُستخدم لاحقًا في البرنامج.</p>
<h2 id="نوع-البيانات">نوع البيانات</h2>
<p><em>نوع البيانات</em> (data type) يشير إلى خصائص أي قيمة موجودة في البرنامج. في الشيفرة التالية يكون نوع بيانات المتغيّر <code>name</code> هو سلسلة نصية أي <code>str</code>، ونوع بيانات المتغيّر <code>result</code> هو عدد صحيح أي <code>int</code>:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Anna&quot;</span>
result = <span class="hljs-number">100</span>
</code></pre>
<p>يمكنك استخدام الدالة <code>type</code> لمعرفة نوع بيانات أي تعبير. وإليك مثالًا على استخدامها:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-built_in">type</span>(<span class="hljs-string">&quot;Anna&quot;</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">type</span>(<span class="hljs-number">100</span>))
</code></pre>
<pre><code>&lt;class 'str'&gt;
&lt;class 'int'&gt;
</code></pre>
<h2 id="الصياغة">الصياغة</h2>
<p>تمامًا كما في اللغات الطبيعية، تحدّد <em>الصياغة</em> (<em>syntax</em>) لغة البرمجة كيف ينبغي أن تُكتب شيفرة البرنامج. ولكل لغة برمجة صياغتها الخاصة.</p>
<p>وتحدّد صياغة Python، ضمن أمور أخرى، أن السطر الأول لجملة <code>if</code> ينبغي أن ينتهي بحرف النقطتين، وأن كتلة الجملة ينبغي أن تكون بمسافة بادئة:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> name == <span class="hljs-string">&quot;Anna&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)
</code></pre>
<p>وإذا لم تُتبَع القواعد النحوية للغة البرمجة، فسيحدث خطأ:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> name == <span class="hljs-string">&quot;Anna&quot;</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)
</code></pre>
<pre><code>File &quot;test.py&quot;, line 1
    if name == &quot;Anna&quot;
                    ^
SyntaxError: invalid syntax
</code></pre>
<h2 id="تنقيح-الأخطاء">تنقيح الأخطاء <span class="content-anchor" id="debugging"></span></h2>
<p>إذا كانت صياغة البرنامج صحيحة لكن البرنامج لا يعمل كما هو مقصود، فهناك <em>خلل</em> (bug) في البرنامج.</p>
<p>تظهر الأخطاء بطرق مختلفة. فبعض الأخطاء يسبب خطأ أثناء التنفيذ. فمثلًا، البرنامج التالي</p>
<pre><code class="language-python">x = <span class="hljs-number">10</span>
y = <span class="hljs-number">0</span>
result = x / y

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{x}</span> divided by <span class="hljs-subst">{y}</span> is <span class="hljs-subst">{result}</span>&quot;</span>)
</code></pre>
<p>يسبب هذا الخطأ:</p>
<pre><code>ZeroDivisionError: integer division or modulo by zero on line 3
</code></pre>
<p>المشكلة هنا رياضية بطبعها: القسمة على صفر غير مسموح بها، وهذا يوقف تنفيذ البرنامج.</p>
<p>عادةً ما تكون الأخطاء أثناء التنفيذ سهلة الإصلاح إلى حدٍّ كبير، لأن رسالة الخطأ تذكر سطر الشيفرة الذي سبّب الخطأ. وبالطبع قد يكون السبب الحقيقي للخلل في مكان مختلف تمامًا عن سطر الشيفرة الذي سبّب الخطأ.</p>
<p>أحيانًا يكشف خللٌ في البرنامج أن النتيجة التي تنتجها الشيفرة خاطئة. وقد يكون اكتشاف هذا النوع من الأخطاء وتحديد موضعه تحديًا. وفي تمارين البرمجة في هذه الدورة يكون الغرض من الاختبارات غالبًا هو كشف أخطاء من هذا النوع. وقبل إصلاح أي خلل يجب أولًا تحديد سببه.</p>
<p>تسمّي مصطلحات البرمجة عملية اكتشاف أسباب الأخطاء <em>تنقيح الأخطاء</em> (debugging). وهي مهارة بالغة الأهمية في صندوق أدوات أي مبرمج. وغالبًا ما يقضي المبرمجون المحترفون وقتًا أطول في تنقيح الأخطاء مما يقضونه في كتابة شيفرة جديدة.</p>
<p>إحدى الطرق البسيطة والفعّالة لتنقيح البرنامج هي إضافة جمل طباعة للتشخيص إلى شيفرتك. فتحقّق من نتائج شيفرتك بأوامر <code>print</code> يوفّر تأكيدًا سريعًا بأن الشيفرة تفعل ما تريده فعلًا.</p>
<p>إليك محاولة لحل أحد تمارين <a href="/arabic-cs-library/book/mooc/part-1/5-conditional-statements">القسم السابق</a>:</p>
<pre><code class="language-python">hourly_wage = <span class="hljs-built_in">float</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Hourly wage: &quot;</span>))
hours = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Hours worked: &quot;</span>))
day = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Day of the week: &quot;</span>)

daily_wages = hourly_wage * hours
<span class="hljs-keyword">if</span> day == <span class="hljs-string">&quot;sunday&quot;</span>:
    daily_wages * <span class="hljs-number">2</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Daily wages: <span class="hljs-subst">{daily_wages}</span> euros&quot;</span>)
</code></pre>
<p>البرنامج لا يعمل تمامًا كما ينبغي. يؤدي تشغيل الاختبارات إلى طباعة ما يلي:</p>
<pre><code>FAIL: PythonEditorTest: test_sunday_1

With input 20.0,6,Sunday correct wage 240.0 is not found in output Daily wages: 120.0 euros
</code></pre>
<p>وعند تنقيح تمارين هذه الدورة، تكون الخطوة الأولى غالبًا هي التحقق من كيفية سلوك البرنامج مع المُدخَل المحدَّد في الاختبار الذي فشل. وبالفعل فإن النتيجة ليست كما كان متوقَّعًا:</p>
<pre><code>Daily wages: 120.0 euros
</code></pre>
<p>يشير تنقيح الأخطاء عادةً إلى تشغيل البرنامج عدة مرات. فقد يكون من المفيد تثبيت المُدخَل المُعطِّل مؤقتًا، أي تثبيته بشكل صريح (hard-code)، بدلًا من طلب مُدخَل من المستخدم في كل مرة. في هذه الحالة قد يبدو التثبيت الصريح على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-comment"># hourly_wage = float(input(&quot;Hourly wage: &quot;))</span>
<span class="hljs-comment"># hours = int(input(&quot;Hours worked: &quot;))</span>
<span class="hljs-comment"># day = input(&quot;Day of the week: &quot;)</span>
hourly_wage = <span class="hljs-number">20.0</span>
hours = <span class="hljs-number">6</span>
day = <span class="hljs-string">&quot;Sunday&quot;</span>

daily_wages = hourly_wage * hours
<span class="hljs-keyword">if</span> day == <span class="hljs-string">&quot;sunday&quot;</span>:
    daily_wages * <span class="hljs-number">2</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Daily wages: <span class="hljs-subst">{daily_wages}</span> euros&quot;</span>)
</code></pre>
<p>ويمكن أن تكون الخطوة التالية إضافة <em>جمل طباعة للتشخيص</em>. فالجزء المُعطِّل من الشيفرة موجود في القسم المتعلق بأيام الأحد، فلنضف أوامر <code>print</code> قبل السطر الذي ينبغي أن يضاعف الأجر اليومي في أيام الأحد وبعده:</p>
<pre><code class="language-python"><span class="hljs-comment"># ...</span>

daily_wages = hourly_wage * hours
<span class="hljs-keyword">if</span> day == <span class="hljs-string">&quot;sunday&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages before:&quot;</span>, daily_wages)
    daily_wages * <span class="hljs-number">2</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages after doubling:&quot;</span>, daily_wages)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Daily wages: <span class="hljs-subst">{daily_wages}</span> euros&quot;</span>)
</code></pre>
<p>وتشغيل الشيفرة الآن لا يكشف شيئًا — جمل طباعة التشخيص لا تُطبع إطلاقًا. يبدو أن محتويات كتلة <code>if</code> لا تُنفَّذ أبدًا، لذا لا بد أن هناك مشكلة في الجملة الشرطية. لنجرّب طباعة قيمة التعبير المنطقي:</p>
<pre><code class="language-python"><span class="hljs-comment"># ...</span>

daily_wages = hourly_wage * hours
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;condition:&quot;</span>, day == <span class="hljs-string">&quot;sunday&quot;</span>)
<span class="hljs-keyword">if</span> day == <span class="hljs-string">&quot;sunday&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages before:&quot;</span>, daily_wages)
    daily_wages * <span class="hljs-number">2</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages after doubling:&quot;</span>, daily_wages)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Daily wages: <span class="hljs-subst">{daily_wages}</span> euros&quot;</span>)
</code></pre>
<p>وبالفعل، القيمة هي <code>False</code>، لذا لا تُنفَّذ محتويات كتلة <code>if</code> أبدًا:</p>
<pre><code>condition:  False
Daily wages: 120.0 euros
</code></pre>
<p>وإذن فلا بد أن المشكلة تكمن في شرط جملة <code>if</code>. فكما في حالات كثيرة في البرمجة، يهمّ حالة الأحرف في المقارنات أيضًا. لاحظ كيف أن كلمة &quot;sunday&quot; في التعبير المنطقي لم تُكتب بحرف كبير، بينما كانت في المُدخَل كذلك. فلنُصلح ذلك (في أمر <code>print</code> وفي جملة <code>if</code> معًا):</p>
<pre><code class="language-python"><span class="hljs-comment"># ...</span>

daily_wages = hourly_wage * hours
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;condition:&quot;</span>, day == <span class="hljs-string">&quot;Sunday&quot;</span>)
<span class="hljs-keyword">if</span> day == <span class="hljs-string">&quot;Sunday&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages before:&quot;</span>, daily_wages)
    daily_wages * <span class="hljs-number">2</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;wages after doubling:&quot;</span>, daily_wages)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Daily wages: <span class="hljs-subst">{daily_wages}</span> euros&quot;</span>)
</code></pre>
<p>وتشغيل هذا يطبع ما يلي:</p>
<pre><code>condition: True
wages before: 120
wages after doubling: 120
Daily wages: 120.0 euros
</code></pre>
<p>يبدو أن القيمة المخزّنة في <code>daily_wages</code> صحيحة في البداية: <code>hourly_wage = 20.0</code> و<code>hours = 6</code>، و20.0 * 6 = 120.0. غير أن الأمر المفترض أن يضاعف الرقم لا يفعل ذلك، لذا لا بد أن هناك مشكلة في الأمر. وبالفعل فإن الأمر</p>
<pre><code class="language-python">daily_wages * <span class="hljs-number">2</span>
</code></pre>
<p>يقوم بمضاعفة القيمة، لكنه لا يخزّن القيمة الجديدة في أي مكان. لنغيّره بحيث يخزّن القيمة الجديدة أيضًا:</p>
<pre><code class="language-python">daily_wages *= <span class="hljs-number">2</span>
</code></pre>
<p>وتشغيل البرنامج من جديد يكشف أن المطبوع في النهاية صار صحيحًا أيضًا:</p>
<pre><code>condition: True
wages before: 120
wages after doubling: 240
Daily wages: 240.0 euros
</code></pre>
<p>وحين يُصلَح البرنامج، تذكّر أن تُزيل جميع جمل طباعة التشخيص والشيفرة الأخرى التي أُضيفت لأغراض التنقيح.</p>
<p>كان هذا المثال بسيطًا إلى حدٍّ كبير، وفي برنامج قصير كهذا يمكن ربما استنتاج الأخطاء بقراءة الشيفرة قراءة متأنّية فحسب. لكن استخدام جمل طباعة التشخيص غالبًا ما يكون طريقة سريعة للاستئناس بمكان المشكلة المحتمل. ويمكن استخدام جمل الطباعة لتحديد أجزاء البرنامج التي تبدو عاملة على نحو صحيح، وبذلك وبذلك تتركّز جهود تتبّع الأخطاء على أقسام الشيفرة الأرجح أنها المسبِّبة للخلل.</p>
<p>جمل طباعة التشخيص ليست سوى أداة واحدة من أدوات تنقيح البرامج. وسنعود إلى هذا الموضوع لاحقًا في هذه الدورة. وينبغي أن تعتاد الآن على استخدام جمل طباعة التشخيص للبحث عن الأخطاء في شيفرتك. فالمتخصصون في البرمجة لا يستطيعون الاستغناء عنها، لذا فهي أداة مفيدة جدًا للمبتدئين أيضًا.</p>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الصياغة</strong></p>
<p>يحتوي البرنامج التالي على عدة <em>أخطاء صياغية</em>. يُرجى إصلاح البرنامج بحيث تصير الصياغة سليمة ويعمل البرنامج وفق ما تحدّده الأمثلة التالية.</p>
</blockquote>
<pre><code class="language-python">  number = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>)
  <span class="hljs-keyword">if</span> number&gt;<span class="hljs-number">100</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number was greater than one hundred&quot;</span>)
    number - <span class="hljs-number">100</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Now its value has decreased by one hundred)
     print(&quot;</span>Its value <span class="hljs-keyword">is</span> now<span class="hljs-string">&quot;+ number)
 print(number + &quot;</span> must be my lucky number!<span class="hljs-string">&quot;)
 print(&quot;</span>Have a nice day!)
</code></pre>
<pre><code>Please type in a number: **13**
13 must be my lucky number!
Have a nice day!
</code></pre>
<pre><code>Please type in a number: **101**
The number was greater than one hundred
Now its value has decreased by one hundred
Its value is now 1
1 must be my lucky number!
Have a nice day!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: عدد المحارف</strong></p>
<p>يمكن استخدام الدالة <code>len</code> لمعرفة طول سلسلة نصية، ضمن أمور أخرى. وتُعيد الدالة عدد المحارف في السلسلة النصية.</p>
</blockquote>
<p>إليك بعض الأمثلة على كيفية عمل ذلك:</p>
<pre><code class="language-python">word = <span class="hljs-string">&quot;abcd&quot;</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(word))

<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(<span class="hljs-string">&quot;hi there&quot;</span>))

word2 = <span class="hljs-string">&quot;howdydoody&quot;</span>
length = <span class="hljs-built_in">len</span>(word2)
<span class="hljs-built_in">print</span>(length)

empty_string = <span class="hljs-string">&quot;&quot;</span>
length = <span class="hljs-built_in">len</span>(empty_string)
<span class="hljs-built_in">print</span>(length)
</code></pre>
<pre><code>4
8
10
0
</code></pre>
<p>يُرجى كتابة برنامج يطلب من المستخدم كلمة ثم يطبع عدد محارفها، إن كان قد أدخل أكثر من محرف واحد.</p>
<p>أمثلة على السلوك المتوقَّع:</p>
<pre><code>Please type in a word: **hey**
There are 3 letters in the word hey
Thank you!
</code></pre>
<pre><code>Please type in a word: **banana**
There are 6 letters in the word banana
Thank you!
</code></pre>
<pre><code>Please type in a word: **b**
Thank you!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: تحويل الأنواع</strong></p>
<p>عند البرمجة في Python، غالبًا ما نحتاج إلى تغيير نوع بيانات قيمة ما. فمثلًا، يمكن تحويل عدد عشري إلى عدد صحيح بالدالة <code>int</code>:</p>
</blockquote>
<pre><code class="language-python">
temperature = <span class="hljs-built_in">float</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a temperature: &quot;</span>))

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The temperature is&quot;</span>, temperature)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;...and rounded down it is&quot;</span>, <span class="hljs-built_in">int</span>(temperature))

</code></pre>
<pre><code>Please type in a temperature: **5.15**
The temperature is 5.15
...and rounded down it is 5
</code></pre>
<p>لاحظ أن الدالة تُقرِّب إلى الأسفل دائمًا، ولا تتبع قواعد التقريب في الرياضيات. وهذه مثال على <em>دالة أرضية</em> (floor function).</p>
<pre><code>Please type in a temperature: **8.99**
The temperature is 8.99
...and rounded down it is 8
</code></pre>
<p>يُرجى كتابة برنامج يطلب من المستخدم عددًا عشريًا ثم يطبع الجزء الصحيح والجزء العشري على حدة. استخدم دالة <code>int</code> في Python.</p>
<p>يمكنك افتراض أن الرقم الذي يعطيه المستخدم يكون دائمًا أكبر من الصفر.</p>
<p>مثال على السلوك المتوقَّع:</p>
<pre><code>Please type in a number: **1.34**
Integer part: 1
Decimal part: 0.34
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: eb4b41d3-b83b-5815-a1d5-ae9b377aa274)



-->
`,o={book:n,chapter:s,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{n as book,s as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
