const s="mooc",n="part-11",a="الجزء 11: ميزات متقدمة",p="1-list-comprehensions",l="إدراكات القوائم",e=[{depth:2,id:"إدراكات-القوائم",text:"إدراكات القوائم"},{depth:2,id:"تصفية-العناصر",text:"تصفية العناصر"},{depth:2,id:"التنفيذ-البديل-بإدراكات-القوائم",text:"التنفيذ البديل بإدراكات القوائم"},{depth:2,id:"lotterynumbers-المطابقة",text:"LotteryNumbers المطابقة"},{depth:2,id:"lotterynumbers-المطابقة-في-مكانها",text:"LotteryNumbers المطابقة في مكانها"}],r=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف ما هي إدراكات القوائم (list comprehensions)</li>
<li>ستكون قادرًا على استخدام إدراكات القوائم لإنشاء قوائم جديدة</li>
</ul>
</blockquote>
<p>من المواضع التي تبلغ فيها البرمجة ذروة قوّتها معالجةُ متتاليات العناصر والأحداث؛ فالحواسيب بارعة في تكرار الأشياء. وقد مرّت علينا في الأجزاء السابقة من هذه المادة أمثلة على التكرار عبر السلاسل النصية والقوائم والقواميس بطرق متنوّعة.</p>
<p>لنفترض أن لدينا قائمة من الأعداد الصحيحة، وأننا نحتاج القائمة نفسها من العناصر بصيغة السلاسل النصية. وقد تبدو الطريقة التقليدية لإنجاز المهمة هكذا:</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>]

strings = []
<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
    strings.append(<span class="hljs-built_in">str</span>(number))
</code></pre>
<h2 id="إدراكات-القوائم">إدراكات القوائم</h2>
<p>هناك أيضًا طريقة أكثر &quot;باثونية&quot; لتوليد القوائم من قوائم موجودة، وهي ما يُسمّى <em>إدراكات القوائم</em> (list comprehensions).</p>
<p>وتقوم الفكرة على أن نجمع في سطر واحد وصفَ ما ينبغي فعله بكل عنصر في القائمة، وإسنادَ النتيجة إلى قائمة جديدة.</p>
<p>في المثال أعلاه كانت العملية المُجراة على كل عنصر في القائمة بسيطة جدًّا: فقد حُوِّل كل عدد صحيح إلى سلسلة نصية. لنرَ كيف يبدو هذا عند تنفيذه بإدراك قوائم:</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>]
strings = [<span class="hljs-built_in">str</span>(number) <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers]
</code></pre>
<p>يحتوي السطر الثاني أعلاه على كثير من العناصر نفسها التي في الطريقة التكرارية التقليدية، لكن بناء الجملة مختلف. وإحدى طرق تعميم عبارة إدراك القوائم هي</p>
<p><code>[&lt;expression&gt; for &lt;item&gt; in &lt;series&gt;]</code></p>
<p>تُشير الأقواس المربّعة حول عبارة إدراك القوائم إلى Python بأنّ النتيجة ينبغي أن تكون قائمة جديدة. فيُعالَج كل عنصر من عناصر القائمة الأصلية واحدًا واحدًا، وتُخزَّن النتيجة في القائمة الجديدة، تمامًا كما في الطريقة التكرارية أعلاه. ونتيجةً لذلك نحصل على قائمة جديدة بعددٍ من العناصر يعادل تمامًا عدد عناصر القائمة الأصلية، وقد عُولجت جميع العناصر على النحو نفسه.</p>
<p>(ملاحظة: الأصول الأصلية لصور هذا الجزء مفقودة مؤقتًا، ولهذا توجد بعض المفردات الفنلندية في الرسوم التوضيحية في هذا الجزء. ونعمل على إصلاح ذلك.)</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_1_2.png" alt="11_1_2.png"></p>
<p>يمكن لإدراكات القوائم أن تتعامل مع عمليات أعقد كثيرًا أيضًا. فيمكننا إجراء حسابات، مثل ضرب العناصر الأصلية في عشرة:</p>
<pre><code class="language-python">numbers = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>,<span class="hljs-number">10</span>))
<span class="hljs-built_in">print</span>(numbers)

numbers_multiplied = [number * <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers]
<span class="hljs-built_in">print</span>(numbers_multiplied)
</code></pre>
<pre><code>[1, 2, 3, 4, 5, 6, 7, 8, 9]
[10, 20, 30, 40, 50, 60, 70, 80, 90]
</code></pre>
<p>بل إنّ التعبير داخل عبارة إدراك القوائم يمكن أن يكون أي تعبير في Python. بل يمكنك حتى نداء دوال عرّفتها بنفسك:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for integers above zero &quot;&quot;&quot;</span>
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> n &gt;= <span class="hljs-number">2</span>:
        k *= n
        n -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> k

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>]
    factorials = [factorial(number) <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers]
    <span class="hljs-built_in">print</span>(factorials)
</code></pre>
<pre><code>[120, 2, 24, 6, 1]
</code></pre>
<p>وباستخدام حلقة <code>for</code> المألوفة أكثر يمكن التعبير عن العملية نفسها هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for integers above zero &quot;&quot;&quot;</span>
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> n &gt;= <span class="hljs-number">2</span>:
        k *= n
        n -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> k

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>]
    factorials = []
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        factorials.append(factorial(number))
    <span class="hljs-built_in">print</span>(factorials)
</code></pre>
<p>تتيح لنا إدراكات القوائم التعبير عن الوظيفة نفسها بإيجاز أكبر، ودون أن نفقد عادةً أيًّا من سهولة القراءة.</p>
<p>ويمكننا كذلك إرجاع عبارة إدراك قوائم من دالة مباشرة. فلو احتجنا دالةً لإنتاج المضاريب (factorials) لقوائم من الأعداد، لأمكننا تحقيق ذلك بإيجاز شديد:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorials</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-keyword">return</span> [factorial(number) <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>square_roots(numbers: list)</code> تأخذ قائمة من الأعداد الصحيحة وسيطًا لها. وينبغي أن تُعيد الدالة قائمة جديدة تحتوي على الجذور التربيعية للأعداد الصحيحة الأصلية.</p>
</blockquote>
<p>تحتوي وحدة <a href="https://docs.python.org/3/library/math.html">math</a> من المكتبة القياسية في Python على دالة مناسبة لحساب الجذر التربيعي.</p>
<p>ينبغي أن تستخدم الدالة إدراك قوائم. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">lines = square_roots([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>])
<span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> lines:
    <span class="hljs-built_in">print</span>(line)
</code></pre>
<pre><code>1.0
1.4142135623730951
1.7320508075688772
2.0
</code></pre>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>rows_of_stars(numbers: list)</code> تأخذ قائمة من الأعداد الصحيحة وسيطًا لها. وينبغي أن تُعيد الدالة قائمة جديدة تحتوي على صفوف من النجوم. وينبغي أن يوافق طول كل صف العدد الصحيح الواقع في الفهرس نفسه في القائمة الأصلية. وينبغي أن تستخدم الدالة إدراك قوائم لتحقيق ذلك.</p>
</blockquote>
<p>الحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">rows = rows_of_stars([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>])
<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
    <span class="hljs-built_in">print</span>(row)

<span class="hljs-built_in">print</span>()

rows = rows_of_stars([<span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>])
<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
    <span class="hljs-built_in">print</span>(row)
</code></pre>
<pre><code>*
**
***
****

****
***
**
*
**********
</code></pre>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يحتوي قالب التمرين على تعريف الصنف <code>ExamResult</code>. ولهذا الصنف الخصائص العامة التالية:</p>
</blockquote>
<ul>
<li>name</li>
<li>grade1</li>
<li>grade2</li>
<li>grade3</li>
</ul>
<p>يُرجى كتابة دالة اسمها <code>best_results(results: list)</code> تأخذ قائمة من كائنات ExamResult وسيطًا لها.</p>
<p>ينبغي أن تُعيد الدالة قائمة جديدة تحتوي على أفضل نتيجة من كل كائن ExamResult فقط. وينبغي أن تستخدم الدالة إدراك قوائم لتحقيق ذلك.</p>
<p>الحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">result1 = ExamResult(<span class="hljs-string">&quot;Peter&quot;</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
result2 = ExamResult(<span class="hljs-string">&quot;Pippa&quot;</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>)
result3 = ExamResult(<span class="hljs-string">&quot;Paul&quot;</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)
results = [result1, result2, result3]
<span class="hljs-built_in">print</span>(best_results(results))
</code></pre>
<pre><code>[5, 4, 3]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>lengths(lists: list)</code> تأخذ قائمة تحتوي على قوائم من الأعداد الصحيحة وسيطًا لها. وينبغي أن تُعيد الدالة قائمة جديدة تحتوي على أطوال القوائم الواقعة داخل القائمة الوسيطة.</p>
</blockquote>
<p>ينبغي أن تستخدم الدالة إدراك قوائم لتحقيق ذلك. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">lists = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>], [<span class="hljs-number">324</span>, -<span class="hljs-number">1</span>, <span class="hljs-number">31</span>, <span class="hljs-number">7</span>],[]]
<span class="hljs-built_in">print</span>(lengths(lists))
</code></pre>
<pre><code>[5, 4, 0]
</code></pre>
<h2 id="تصفية-العناصر">تصفية العناصر</h2>
<p>في الأمثلة أعلاه بقيت جميع قوائمنا بالطول نفسه قبل عملية إدراك القوائم وبعدها. فقد استُخدمت في كل حالة جميع عناصر القائمة الأصلية أساسًا للقائمة الجديدة. لكننا نحتاج أحيانًا إلى <em>بعض</em> العناصر الأصلية فقط. فكيف يمكن تحقيق ذلك؟</p>
<p>تتيح عبارة إدراك القوائم أيضًا وجود شرط، بحيث نستطيع فحص العناصر مقابل الشرط واختيار ما يطابقه منها فقط. وبناء الجملة العام كما يلي:</p>
<p><code>[&lt;expression&gt; for &lt;item&gt; in &lt;series&gt; if &lt;Boolean expression&gt;]</code></p>
<p>والعبارة أعلاه مطابقة في ما عدا ذلك للصيغة العامة التي قدّمناها في بداية هذا القسم، لكن يوجد الآن شرط <code>if</code> في النهاية. ولا تُستخدم أساسًا للقائمة الجديدة إلا العناصر التي يكون التعبير المنطقي فيها صحيحًا من القائمة الأصلية.</p>
<p>في المثال أدناه نختار جميع العناصر الزوجية من القائمة الأصلية أساسًا للقائمة الجديدة. وفي الواقع لا تُعالَج هذه العناصر بأي طريقة أخرى؛ بل تُسنَد إلى القائمة الجديدة كما هي:</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">3</span>]

even_items = [item <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> numbers <span class="hljs-keyword">if</span> item % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>]
<span class="hljs-built_in">print</span>(even_items)
</code></pre>
<pre><code>[2, 4, 6, 4, 10, 12]
</code></pre>
<p>التعبير في عبارة إدراك القوائم أعلاه ليس إلا <code>item</code> بسيطًا، وهو ما يعني أنه لا تُجرى أي عمليات على عناصر القائمة. ويمكن أن يكون التعبير أي تعبير في Python، تمامًا كما في الأمثلة السابقة. فمثلًا، تأخذ عبارة إدراك القوائم التالية جميع العناصر الزوجية في قائمة، وتضرب كلًّا منها في عشرة، وتخزّن النتيجة في قائمة جديدة:</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">3</span>]

even_items = [item * <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> numbers <span class="hljs-keyword">if</span> item % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>]
<span class="hljs-built_in">print</span>(even_items)
</code></pre>
<pre><code>[20, 40, 60, 40, 100, 120]
</code></pre>
<p>وكلّما صادفت إدراكات قوائم أعقد وأعقد، فقد تجد من المفيد أن تحاول قراءة الشرط أولًا. فالعناصر لا تُعالَج في نهاية المطاف إلا إذا اجتازت الفحص، فمن المنطقي كثيرًا أن تعرف أولًا أيّ العناصر يجتاز مرحلة التصفية. وأحيانًا لا يكون التعبير في عبارة إدراك القوائم ممكنًا أصلًا لجميع عناصر القائمة الأصلية.</p>
<p>فمثلًا، عملية المضروب معرّفة للأعداد الصحيحة غير السالبة فقط. وإذا لم نكن متأكدين من أن القائمة لا تحتوي إلا على قيم تساوي صفرًا أو أكبر، وجب تصفية المحتويات قبل تمريرها إلى دالة المضروب التي أنشأناها سابقًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for integers above zero &quot;&quot;&quot;</span>
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> n &gt;= <span class="hljs-number">2</span>:
        k *= n
        n -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> k

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [-<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, -<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, -<span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>]
    factorials = [factorial(number) <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers <span class="hljs-keyword">if</span> number &gt;= <span class="hljs-number">0</span>]
    <span class="hljs-built_in">print</span>(factorials)
</code></pre>
<pre><code>[6, 24, 120, 1]
</code></pre>
<p>وكما رأينا في مثالنا الأول على إدراك القوائم، حيث حُوِّلت الأعداد الصحيحة إلى سلاسل نصية، لا يلزم أن تكون عناصر القائمة الجديدة من النوع نفسه الذي لعناصر القائمة الأصلية. ومواصلين من مثال المضروب أعلاه، يمكننا إنشاء صفٍّ (tuple) من كل عنصر أصلي ونظيره المعالَج، وتخزين هذه الصفوف في قائمة، جامعةً بذلك كل ما تعلّمناه حتى الآن في عبارة إدراك قوائم واحدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for integers above zero &quot;&quot;&quot;</span>
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> n &gt;= <span class="hljs-number">2</span>:
        k *= n
        n -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> k

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [-<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, -<span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>]
    <span class="hljs-comment"># the variable name abbreviated here so that this would be easier to read</span>
    factorials = [(n, factorial(n)) <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> numbers <span class="hljs-keyword">if</span> n &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> n % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>]
    <span class="hljs-built_in">print</span>(factorials)
</code></pre>
<pre><code>[(2, 2), (4, 24), (6, 720)]
</code></pre>
<p>وإذا فكّكنا المثال أعلاه، فلدينا التعبير المنطقي <code>n &gt; 0 and n % 2 == 0</code>. وهذا يعني أن العناصر التي تُقبل للمعالجة الإضافية من القائمة الأصلية هي فقط الموجبة والقابلة للقسمة على اثنين معًا.</p>
<p>ثم يُعالَج كل من هذه الأعداد الموجبة الزوجية بدوره إلى الصيغة <code>(n, factorial(n))</code>. وهذا صفٌّ، عنصره الأول هو العدد نفسه، وعنصره الثاني هو النتيجة التي تُعيدها دالة المضروب.</p>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>remove_smaller_than(numbers: list, limit: int)</code> تأخذ قائمة من الأعداد الصحيحة وقيمة حدّ (بصيغة عدد صحيح أيضًا) وسيطين لها.</p>
</blockquote>
<p>ينبغي أن تستخدم الدالة إدراك قوائم لإنتاج قائمة جديدة دون القيم التي تقلّ عن قيمة الحدّ.</p>
<p>الحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>مثال على استخدام الدالة:</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">65</span>, <span class="hljs-number">32</span>, -<span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">11</span>]
<span class="hljs-built_in">print</span>(remove_smaller_than(numbers, <span class="hljs-number">10</span>))

<span class="hljs-built_in">print</span>(remove_smaller_than([-<span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, -<span class="hljs-number">100</span>], <span class="hljs-number">0</span>))
</code></pre>
<pre><code>[65, 32, 11]
[7, 8]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>begin_with_vowel(words: list)</code> تأخذ قائمة من السلاسل النصية وسيطًا لها.</p>
</blockquote>
<p>ينبغي أن تستخدم الدالة تقنية إدراك القوائم لإنشاء قائمة جديدة وإرجاعها، تحتوي على الكلمات التي تبدأ بحرف علة (a, e, i, o, u) فقط من القائمة الأصلية. وينبغي قبول الأحرف الصغيرة والكبيرة معًا.</p>
<p>الحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>مثال على استخدام الدالة:</p>
<pre><code class="language-python">word_list = [<span class="hljs-string">&quot;automobile&quot;</span>,<span class="hljs-string">&quot;motorbike&quot;</span>,<span class="hljs-string">&quot;Animal&quot;</span>,<span class="hljs-string">&quot;cat&quot;</span>,<span class="hljs-string">&quot;Dog&quot;</span>,<span class="hljs-string">&quot;APPLE&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>]
<span class="hljs-keyword">for</span> vowelled <span class="hljs-keyword">in</span> begin_with_vowel(word_list):
    <span class="hljs-built_in">print</span>(vowelled)
</code></pre>
<pre><code>automobile
Animal
APPLE
orange
</code></pre>
<h2 id="التنفيذ-البديل-بإدراكات-القوائم">التنفيذ البديل بإدراكات القوائم</h2>
<p>كثيرًا ما نُدرج، عند وجود جملة شرطية، فرع <code>else</code> أيضًا. ولأننا نستطيع استخدام الشروط في إدراكات القوائم، فإن فرع <code>else</code> متاح أيضًا في إدراكات القوائم. وبناء الجملة العام للشرط المستخدَم مع إدراكات القوائم كما يلي:</p>
<p><code>&lt;expression 1&gt; if &lt;condition&gt; else &lt;expression 2&gt;</code></p>
<p>لقد صادفنا هذه الشروط أحادية السطر، أو المعاملات الثلاثية، من قبل في <a href="/arabic-cs-library/book/mooc/part-7/6-more-features">الجزء 7</a>. ويُقدَّر التعبير أعلاه بـ<code>expression 1</code> أو بـ<code>expression 2</code>، تبعًا لكون الشرط صحيحًا أو خاطئًا.</p>
<p>وتذكيرًا بالموضوع، لو احتجنا إلى طباعة الأكبر من عددين، وأردنا استخدام أمر <code>print</code> واحد فقط، لأمكننا وضع ذلك كله في سطر واحد:</p>
<pre><code class="language-python">number1 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Type in number 1:&quot;</span>))
number2 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Type in number 2:&quot;</span>))
<span class="hljs-built_in">print</span> (number1 <span class="hljs-keyword">if</span> number1 &gt; number2 <span class="hljs-keyword">else</span> number2)
</code></pre>
<p>وبدمج بناء جملة المعامل الثلاثي مع عبارة إدراك القوائم نحصل على البنية العامة التالية:</p>
<p><code>[&lt;expression 1&gt; if &lt;condition&gt; else &lt;expression 2&gt; for &lt;item&gt; in &lt;series&gt;]</code></p>
<p>قد يبدو هذا مربكًا بعض الشيء، لأن البنية الشرطية تأتي الآن قبل جزء إدراك القوائم الفعلي. وهذه هي الطريقة التي عُرِّف بها بناء الجملة، في الوقت الحالي على الأقل. وإذا كان هناك فرع <code>else</code> أيضًا، جاء الشرط أولًا. وإذا كان هناك <code>if</code> فقط، ذهب إلى النهاية. ويمكنك أن تجرّب تبديلهما لترى ما يحدث.</p>
<p>وإدراج معامل <code>else</code> يعني أننا سنعالج مرة أخرى كل عنصر من القائمة الأصلية. وتبعًا لكون الشرط صحيحًا أو خاطئًا، تُجرى على كل عنصر في القائمة إما <code>expression 1</code> وإما <code>expression 2</code>.</p>
<p>يتحقّق المثال التالي مما إذا كانت عناصر القائمة تساوي صفرًا أو أكبر. فيُقبل أي عنصر كذلك كما هو، أما جميع العناصر السالبة فتُنفى، بحيث تنقلب الإشارة من سالبة إلى موجبة. والنتيجة قائمة تحتوي على القيم المطلقة لعناصر القائمة الأصلية.</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, -<span class="hljs-number">3</span>, <span class="hljs-number">45</span>, -<span class="hljs-number">110</span>, <span class="hljs-number">2</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">11</span>]
abs_vals = [number <span class="hljs-keyword">if</span> number &gt;= <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> -number <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers]
<span class="hljs-built_in">print</span>(abs_vals)
</code></pre>
<pre><code>[1, 3, 45, 110, 2, 9, 11]
</code></pre>
<p>ولنُعِد ذكر ما يحدث أعلاه: إذا كان الشرط <code>number &gt;= 0</code> صحيحًا، خضع العنصر للتعبير <code>number</code>، فكانت النتيجة العنصر نفسه. وإذا كان الشرط خاطئًا، خضع العنصر للتعبير <code>-number</code>، فصار موجب القيمة.</p>
<p>في المثال التالي لدينا الدالة <code>string_lengths</code> التي تأخذ قائمة وسيطًا لها، وتُعيد قائمة أخرى بأطوال ما وُجد في القائمة الأصلية من سلاسل نصية. غير أنّ هذه الدالة تقبل عناصر القائمة من أي نوع. فإذا كان العنصر سلسلة نصية، حسبت طوله. وإذا كان العنصر شيئًا آخر، أدرجت القيمة -1 في القائمة التي تُعيدها.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">string_lengths</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function returns the lengths of strings in a new list &quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">len</span>(item) <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(item) == <span class="hljs-built_in">str</span> <span class="hljs-keyword">else</span> -<span class="hljs-number">1</span> <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list]

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    test_list = [<span class="hljs-string">&quot;hi&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-literal">True</span>, <span class="hljs-string">&quot;there&quot;</span>, -<span class="hljs-number">123.344</span>, <span class="hljs-string">&quot;toodlepip&quot;</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">False</span>]
    lengths = string_lengths(test_list)
    <span class="hljs-built_in">print</span>(lengths)
</code></pre>
<pre><code>[2, -1, -1, 5, -1, 9, -1, -1]
</code></pre>
<h2 id="lotterynumbers-المطابقة">LotteryNumbers المطابقة</h2>
<p>يُرجى كتابة صنف اسمه <code>LotteryNumbers</code> يأخذ رقم الأسبوع (قيمة عدد صحيح) وقائمة من سبعة أعداد صحيحة وسيطين لبانيه. وينبغي أن تحتوي القائمة على أرقام اليانصيب الصحيحة للأسبوع المعطى.</p>
<p>يُرجى أيضًا كتابة تابع اسمه <code>number_of_hits(numbers: list)</code> يأخذ قائمة من الأعداد الصحيحة وسيطًا له. ويُعيد التابع عدد الإدخالات الصحيحة في قائمة المعامل.</p>
<p>ينبغي أن يستخدم التابع إدراك قوائم لتحقيق ذلك. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>مثال على كيفية استخدام الصنف والدالة:</p>
<pre><code class="language-python">week5 = LotteryNumbers(<span class="hljs-number">5</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>])
my_numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">7</span>,<span class="hljs-number">11</span>,<span class="hljs-number">13</span>,<span class="hljs-number">19</span>,<span class="hljs-number">24</span>]

<span class="hljs-built_in">print</span>(week5.number_of_hits(my_numbers))
</code></pre>
<pre><code>3
</code></pre>
<h2 id="lotterynumbers-المطابقة-في-مكانها">LotteryNumbers المطابقة في مكانها</h2>
<p>يُرجى كتابة تابع اسمه <code>hits_in_place(numbers)</code> يأخذ قائمة من سبعة أعداد صحيحة وسيطًا له، ويُعيد قائمة جديدة من سبعة أعداد صحيحة. وتحتوي القائمة الجديدة على العناصر التي تطابق أرقام الأسبوع الصحيحة فقط من القائمة الأصلية. وينبغي أن تبقى هذه في الفهارس نفسها التي كانت فيها في القائمة الأصلية. أما بقية الفهارس فينبغي أن تُملأ بالقيم <code>-1</code>.</p>
<p>ينبغي أن يستخدم التابع إدراك قوائم لتحقيق ذلك. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>يُرجى إلقاء نظرة على المثال أدناه:</p>
<pre><code class="language-python">week8 = LotteryNumbers(<span class="hljs-number">8</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">10</span>,<span class="hljs-number">20</span>,<span class="hljs-number">30</span>,<span class="hljs-number">33</span>])
my_numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">7</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">20</span>,<span class="hljs-number">30</span>]

<span class="hljs-built_in">print</span>(week8.hits_in_place(my_numbers))
</code></pre>
<pre><code>[1, -1, -1, 10, -1, 20, 30]
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:r};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
