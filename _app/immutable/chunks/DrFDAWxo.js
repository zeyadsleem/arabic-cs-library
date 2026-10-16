const n="mooc",s="part-3",e="الجزء 3: الحلقات",a="3-more-loops",p="المزيد عن الحلقات",l=[{depth:2,id:"الأمر-break",text:"الأمر break"},{depth:2,id:"الأمر-continue",text:"الأمر continue"},{depth:2,id:"الحلقات-المتداخلة",text:"الحلقات المتداخلة"},{depth:2,id:"متغيرات-مساعدة-أخرى-مع-الحلقات",text:"متغيّرات مساعدة أخرى مع الحلقات"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستفهم متى يحتاج الأمر <code>break</code> إلى الخروج من الحلقات</li>
<li>ستتمكّن من استخدام الأمر <code>continue</code> للانتقال إلى التكرار التالي</li>
<li>ستفهم كيف تعمل الحلقات المتداخلة</li>
</ul>
</blockquote>
<h2 id="الأمر-break">الأمر break</h2>
<p>لقد صادفتَ الأمر <code>break</code> من قبل. ويمكن استخدامه لإيقاف تنفيذ حلقة فورًا. ومن الأمثلة النموذجية على استخدامه حالة يطلب فيها البرنامج مُدخَلًا من المستخدم ولا ينتهي التنفيذ إلا حين يتلقى مُدخَلًا محدَّدًا.</p>
<p>يمكن بلوغ الوظيفة نفسها دون الأمر <code>break</code>، باستخدام شرط مناسب. فكلا البرنامجين أدناه يطلب من المستخدم كتابة أعداد، ويحسب مجموعها إلى أن يكتب المستخدم العدد -1.</p>
<pre><code class="language-python"><span class="hljs-comment"># 1st version using the break command</span>

<span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to exit: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-built_in">sum</span> += number

<span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;The sum is <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<pre><code class="language-python"><span class="hljs-comment"># 2nd version without the break command</span>

<span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>
number = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> number != -<span class="hljs-number">1</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to exit: &quot;</span>))
    <span class="hljs-keyword">if</span> number != -<span class="hljs-number">1</span>:
        <span class="hljs-built_in">sum</span> += number

<span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;The sum is <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>يطبع كلا البرنامجين الشيء نفسه عند المُدخَلات نفسها، مثلًا:</p>
<pre><code>Please type in a number, -1 to exit: **2**
Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **3**
Please type in a number, -1 to exit: **-1**
The sum is 14
</code></pre>
<p>إذًا، البرنامجان متطابقان عمليًا من حيث الوظيفة. لكن الطريقة الأولى غالبًا أسهل، لأن الشرط <code>number == -1</code> لا يظهر سوى مرة واحدة، ولا يلزم تهيئة المتغيّر <code>number</code> خارج الحلقة.</p>
<p>يمكن أيضًا استخدام الأمر <code>break</code> مع شرط مناسب معًا داخل حلقة <code>while</code>. فمثلًا، تتكرر الحلقة التالية ما دام مجموع الأعداد لا يتجاوز 100، لكنها تتوقف أيضًا إذا كتب المستخدم العدد -1.</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-built_in">sum</span> &lt;= <span class="hljs-number">100</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to exit: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-built_in">sum</span> += number

<span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;The sum is <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>بعض أمثلة تنفيذ البرنامج:</p>
<pre><code>Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **-1**
The sum is 44
</code></pre>
<pre><code>Please type in a number, -1 to exit: **15**
Please type in a number, -1 to exit: **8**
Please type in a number, -1 to exit: **21**
Please type in a number, -1 to exit: **45**
Please type in a number, -1 to exit: **17**
The sum is 106
</code></pre>
<p>في المثال الأول يتوقف تنفيذ الحلقة لأن المستخدم يكتب العدد -1. وفي المثال الثاني يتوقف التنفيذ لأن مجموع الأعداد يتجاوز 100.</p>
<p>وكما هو الحال دائمًا في البرمجة، هناك طرق كثيرة للوصول إلى الوظيفة نفسها. والبرنامج التالي متطابق مع البرنامج السابق من حيث الوظيفة:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to exit: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-built_in">sum</span> += number
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">sum</span> &gt; <span class="hljs-number">100</span>:
        <span class="hljs-keyword">break</span>

<span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;The sum is <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<h2 id="الأمر-continue">الأمر continue</h2>
<p>هناك طريقة أخرى لتغيير كيفية تنفيذ حلقة وهي الأمر <code>continue</code>. فهو يجعل تنفيذ الحلقة يقفز مباشرة إلى بدايتها، حيث يقع شرط الحلقة. ثم يتابع التنفيذ بشكل طبيعي مع فحص الشرط:</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_3_1.png" alt="3_3_1.png"></p>
<p>فمثلًا، يجمع البرنامج التالي الأعداد المُدخَلة، لكنه يضمّ سوى الأعداد الأصغر من 10. فإذا كان العدد 10 أو أكبر، يقفز التنفيذ إلى بداية الحلقة ولا يُضاف العدد إلى المجموع.</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to exit: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">if</span> number &gt;= <span class="hljs-number">10</span>:
        <span class="hljs-keyword">continue</span>
    <span class="hljs-built_in">sum</span> += number

<span class="hljs-built_in">print</span> (<span class="hljs-string">f&quot;The sum is <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<pre><code>Please type in a number, -1 to exit: **4**
Please type in a number, -1 to exit: **7**
Please type in a number, -1 to exit: **99**
Please type in a number, -1 to exit: **5**
Please type in a number, -1 to exit: **-1**
The sum is 16
</code></pre>
<h2 id="الحلقات-المتداخلة">الحلقات المتداخلة</h2>
<p>كما تمامًا مع جمل <code>if</code>، يمكن أيضًا وضع الحلقات داخل حلقات أخرى. فمثلًا، يستخدم البرنامج التالي حلقة لطلب الأعداد من المستخدم. ثم يستخدم حلقة أخرى داخل الأولى لطباعة عدّ تنازلي بدءًا من العدد المُعطى وصولًا إلى 1:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">while</span> number &gt; <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(number)
        number -= <span class="hljs-number">1</span>
</code></pre>
<pre><code>Please type in a number: **4**
4
3
2
1
Please type in a number: **3**
3
2
1
Please type in a number: **6**
6
5
4
3
2
1
Please type in a number: **-1**
</code></pre>
<p>عندما تكون هناك حلقات متداخلة، لا يؤثر الأمران <code>break</code> و<code>continue</code> إلا على الحلقة الداخلية الأكثر عمقًا التي ينتميان إليها. ويمكن كتابة المثال السابق أيضًا هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        <span class="hljs-keyword">if</span> number &lt;= <span class="hljs-number">0</span>:
            <span class="hljs-keyword">break</span>
        <span class="hljs-built_in">print</span>(number)
        number -= <span class="hljs-number">1</span>
</code></pre>
<p>وهنا لا يوقف الأمر <code>break</code> الأخير سوى الحلقة الداخلية، وهي الحلقة المستخدَمة لطباعة الأعداد.</p>
<h2 id="متغيرات-مساعدة-أخرى-مع-الحلقات">متغيّرات مساعدة أخرى مع الحلقات</h2>
<p>لقد استخدمنا متغيّرات مساعدة، التي تزيد أو تنقص مع كل تكرار للحلقة، مرات عديدة من قبل، لذا ينبغي أن يبدو البرنامج التالي مألوفًا إلى حدٍّ كبير من حيث البنية. وهو يطبع جميع الأعداد الزوجية الأكبر من الصفر حتى يبلغ حدًّا يحدده المستخدم:</p>
<pre><code class="language-python">limit = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))
i = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> i &lt; limit:
    <span class="hljs-built_in">print</span>(i)
    i += <span class="hljs-number">2</span>
</code></pre>
<pre><code>Please type in a number: **8**
0
2
4
6
</code></pre>
<p>يُضبط المتغيّر المساعد <code>i</code> على 0 قبل الحلقة، ويزداد بمقدار اثنين مع كل تكرار.</p>
<p>يتطلب استخدام الحلقات المتداخلة أحيانًا متغيّرًا مساعدًا منفصلًا للحلقة الداخلية. ويطبع البرنامج أدناه «هرمًا من الأعداد» بناءً على عدد يحدّه المستخدم:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))
<span class="hljs-keyword">while</span> number &gt; <span class="hljs-number">0</span>:
    i = <span class="hljs-number">0</span>
    <span class="hljs-keyword">while</span> i &lt; number:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i}</span> &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
        i += <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>()
    number -= <span class="hljs-number">1</span>
</code></pre>
<pre><code>Please type in a number: **5**
0 1 2 3 4
0 1 2 3
0 1 2
0 1
0
</code></pre>
<p>في هذا البرنامج تستخدم الحلقة الخارجية المتغيّر المساعد <code>number</code>، الذي ينقص بمقدار 1 مع كل تكرار حتى يبلغ 0. أمّا المتغيّر المساعد <code>i</code> فيُضبط على 0 قبل الدخول إلى الحلقة الداخلية مباشرة، في كل مرة تتكرر فيها الحلقة الخارجية.</p>
<p>وتستخدم الحلقة الداخلية المتغيّر المساعد <code>i</code>، الذي يزيد بمقدار 1 مع كل تكرار من تكرارات الحلقة الداخلية. وتتكرر الحلقة الداخلية حتى تصير <code>i</code> مساويةً لـ<code>number</code>، وتطبع كل قيمة لـ<code>i</code> على السطر نفسه، مفصولةً بمحرف مسافة. وحين تنتهي الحلقة الداخلية، يبدأ الأمر <code>print</code> في الحلقة الخارجية سطرًا جديدًا.</p>
<p>وتذكّر الآن أن قيمة <code>number</code> تنقص مع كل تكرار من تكرارات الحلقة الخارجية، لذا تنقص أيضًا عدد مرات تكرار الحلقة الداخلية. ومع كل تكرار يصبح سطر الأعداد أقصر، وهكذا نحصل على شكل الهرم.</p>
<p>قد تصبح الحلقات المتداخلة مربكة سريعًا، لكن فهم طريقة عملها ضروري. ومن المرجّح أن تجد <a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التمثيل المرئي</a> في موقع Python Tutor مفيدة في فهم كيفية عمل هذا المثال. انسخ الشيفرة أعلاه إلى نافذة الشيفرة في الأداة، وتابع تشكّل المخرجات وتغيّر قيم المتغيّرات المساعدة مع تقدّم التنفيذ.</p>
<blockquote>
<p><strong>تمرين تفاعلي: الضرب</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم عددًا صحيحًا موجبًا. ثم يطبع البرنامج قائمة بعمليات الضرب حتى يبلغ المعاملان العدد الذي أعطاه المستخدم. راجع الأمثلة أدناه للتفاصيل:</p>
</blockquote>
<pre><code>Please type in a number: 2
1 x 1 = 1
1 x 2 = 2
2 x 1 = 2
2 x 2 = 4
</code></pre>
<pre><code>Please type in a number: 3
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الأحرف الأولى للكلمات</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كتابة جملة. ثم يطبع البرنامج الحرف الأول من كل كلمة في الجملة، كل حرف في سطر منفصل.</p>
</blockquote>
<p>مثال على السلوك المتوقع:</p>
<pre><code>Please type in a sentence: **Humpty Dumpty sat on a wall**
H
D
s
o
a
w
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المضروب</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كتابة عدد صحيح. فإذا كتب المستخدم عددًا يساوي 0 أو أصغر منه، ينتهي التنفيذ. وإلا ف البرنامج يطبع مضروب العدد.</p>
</blockquote>
<p>ينطوي مضروب العدد على ضرب العدد في جميع الأعداد الصحيحة الموجبة الأصغر منه. وبعبارة أخرى، هو حاصل ضرب جميع الأعداد الصحيحة الموجبة التي تقل عن العدد أو تساويه. فمثلًا، مضروب العدد 5 هو 1 * 2 * 3 * 4 * 5 = 120.</p>
<p>بعض أمثلة السلوك المتوقع:</p>
<pre><code>Please type in a number: **3**
The factorial of the number 3 is 6
Please type in a number: **4**
The factorial of the number 4 is 24
Please type in a number: **-1**
Thanks and bye!
</code></pre>
<pre><code>Please type in a number: **1**
The factorial of the number 1 is 1
Please type in a number: **0**
Thanks and bye!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: اقلب الأزواج</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كتابة عدد. ثم يطبع البرنامج جميع القيم الصحيحة الموجبة من 1 حتى العدد. غير أن ترتيب الأعداد يتغيّر بحيث ينقلب كل زوج من الأعداد. أي أن 2 تسبق 1، و4 تسبق 3، وهكذا. راجع الأمثلة أدناه للتفاصيل.</p>
</blockquote>
<pre><code>Please type in a number: **5**
2
1
4
3
5
</code></pre>
<pre><code>Please type in a number: **6**
2
1
4
3
6
5
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: بالتناوب</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كتابة عدد. ثم يطبع البرنامج الأعداد الصحيحة الموجبة بين 1 والعدد نفسه، بالتناوب بين طرفَي النطاق كما في الأمثلة أدناه.</p>
</blockquote>
<pre><code>Please type in a number: **5**
1
5
2
4
3
</code></pre>
<pre><code>Please type in a number: **6**
1
6
2
5
3
4
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: b1118ae8-8dd4-563a-b6a5-0c274136535c)

-->
`,i={book:n,chapter:s,chapterTitle:e,slug:a,title:p,headings:l,html:t};export{n as book,s as chapter,e as chapterTitle,i as default,l as headings,t as html,a as slug,p as title};
