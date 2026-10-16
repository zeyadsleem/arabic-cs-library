const n="mooc",s="part-12",a="الجزء 12: البرمجة الدالية",e="2-generators",p="المولّدات",l=[{depth:2,id:"الكلمة-المفتاحية-yield",text:"الكلمة المفتاحية yield"},{depth:2,id:"إدراكات-المولد",text:"إدراكات المولّد"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف ما هو مولّد بايثون (generator)</li>
<li>ستكون على دراية بالكلمة المفتاحية <code>yield</code></li>
<li>ستكون قادرًا على كتابة دوال المولّد الخاصة بك</li>
</ul>
</blockquote>
<p>لقد صادفنا بالفعل حالات نتعامل فيها مع سلسلة من العناصر، ونحتاج فيها إلى العنصر التالي أو العناصر التالية من السلسلة، لكننا لا نريد بالضرورة أن نبني السلسلة كاملة حتى تلك النقطة في كل مرة يُطلب فيها عنصر جديد. وبعض المتتاليات التعاودية، مثل متتالية فيبوناتشي، مثال جيد على هذه الحالة. فإذا كان كل نداء دالة يولّد السلسلة كاملة تعاوديًا حتى النقطة المطلوبة، فإننا ننتهي إلى توليد بداية السلسلة مرات عديدة.</p>
<p>إن <em>المولّدات</em> في بايثون طريقة لإنتاج العنصر التالي فقط من السلسلة عند الحاجة إليه، فهي تشغّل عملية توليد السلسلة مرة واحدة فقط (بالنسبة لتنفيذ معيّن للبرنامج). وهي تعمل في معظم الأحيان مثل الدوال العادية، إذ يمكن نداؤها وستعيد قيمًا، لكن القيمة التي تعيدها دالة المولّد تختلف عن الدالة العادية. ينبغي للدالة العادية أن تعيد القيمة نفسها في كل مرة إذا أُعطيت الوسائط نفسها. أما دالة المولّد فينبغي لها أن تتذكّر حالتها الحالية وأن تعيد العنصر التالي من السلسلة، والذي قد يختلف عن العنصر السابق.</p>
<p>وكما توجد طرق عديدة لحل أي مسألة برمجية تقريبًا، توجد طرق عديدة لتحقيق وظيفة مشابهة للمولّدات، لكن المولّدات يمكن أن تساعد في جعل البرنامج أسهل فهمًا، وأن توفّر في حالات معيّنة الذاكرة أو موارد حوسبية أخرى.</p>
<h2 id="الكلمة-المفتاحية-yield">الكلمة المفتاحية yield</h2>
<p>ينبغي أن تحتوي دالة المولّد على الكلمة المفتاحية <code>yield</code>، وهي التي تحدّد القيمة التي تعيدها الدالة. لنلقِ نظرة على دالة تولّد أعدادًا صحيحة، بدءًا من الصفر وانتهاءً بقيمة قصوى محدّدة سلفًا:</p>
<pre><code class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">counter</span>(<span class="hljs-params">max_value: <span class="hljs-built_in">int</span></span>):
    number = <span class="hljs-number">0</span>
    <span class="hljs-keyword">while</span> number &lt;= max_value:
        <span class="hljs-keyword">yield</span> number
        number += <span class="hljs-number">1</span>

</code></pre>
<p>يمكن الآن تمرير الدالة <code>counter</code> وسيطًا إلى الدالة <code>next()</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = counter(<span class="hljs-number">10</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;First value:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Second value:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
</code></pre>
<pre><code>First value:
0
Second value:
1
</code></pre>
<p>كما ترى من المثال أعلاه، تشبه الكلمة المفتاحية <code>yield</code> الكلمة المفتاحية <code>return</code>: فكلتاهما تُستخدم لتحديد قيمة الإرجاع. والفرق أن <code>yield</code> لا «تُغلق» الدالة بالمعنى نفسه الذي يفعله <code>return</code>. فدالة المولّد التي تحتوي على الكلمة المفتاحية <code>yield</code> تتابع حالتها، وفي المرة التالية التي تُنادى فيها ستواصل من الحالة نفسها.</p>
<p>يحتاج هذا المولّد أيضًا إلى قيمة قصوى، وقد كانت <code>10</code> في المثال أعلاه. وعندما تنفد القيم في المولّد، فإنه يرفع استثناء <code>StopIteration</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># creates a generator with maximum value 1</span>
    numbers = counter(<span class="hljs-number">1</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
</code></pre>
<pre><code>0
1
Traceback (most recent call last):
  File &quot;generator_example.py&quot;, line 11, in &lt;module&gt;
    print(next(numbers))
StopIteration
</code></pre>
<p>يمكن التقاط الاستثناء باستخدام كتلة <code>try</code> - <code>except</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = counter(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">try</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
        <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
        <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
    <span class="hljs-keyword">except</span> StopIteration:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ran out of numbers&quot;</span>)
</code></pre>
<pre><code>0
1
ran out of numbers
</code></pre>
<p>يمكن المرور على جميع العناصر في مولّد بسهولة باستخدام حلقة <code>for</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = counter(<span class="hljs-number">5</span>)
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>0
1
2
3
4
5
</code></pre>
<p>لا يلزم أن يكون للمولّدات قيمة قصوى محدّدة أو نقطة انتهاء. فيمكنها توليد القيم بلا نهاية (ضمن القيود الحوسبية والفيزيائية الأخرى، بطبيعة الحال).</p>
<p>لكن انتبه: لا ينجح المرور على مولّد بحلقة <code>for</code> إلا إذا انتهى المولّد في مرحلة ما. فإذا بُني المولّد على حلقة لا نهائية، فإن محاولة المرور عليه بحلقة <code>for</code> بسيطة ستؤدي إلى تنفيذ لا نهائي، تمامًا كما تفعل حلقة <code>while</code> بلا شرط انتهاء أو توقف.</p>
<blockquote>
<p><strong>تمرين برمجي: الأعداد الزوجية</strong></p>
<p>اكتب دالة مولّد باسم <code>even_numbers(beginning: int, maximum: int)</code> تأخذ عددين صحيحين وسيطين لها. وينبغي أن تنتج الدالة الأعداد الزوجية بدءًا من <code>beginning</code> وانتهاءً بـ <code>maximum</code> على الأكثر.</p>
</blockquote>
<p>مثالان على كيفية عمل الدالة:</p>
<pre><code class="language-python">numbers = even_numbers(<span class="hljs-number">2</span>, <span class="hljs-number">10</span>)
<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>2
4
6
8
10
</code></pre>
<pre><code class="language-python">numbers = even_numbers(<span class="hljs-number">11</span>, <span class="hljs-number">21</span>)
<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>12
14
16
18
20
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الأعداد الأولية</strong></p>
<p>العدد الأولي هو عدد لا يقبل القسمة إلا على نفسه وعلى العدد 1. ووفقًا للاصطلاح تُعرَّف الأعداد الأولية بأنها الأعداد الصحيحة الموجبة بدءًا من العدد 2. والأعداد الأولية الستة الأولى هي 2 و3 و5 و7 و11 و13.</p>
</blockquote>
<p>اكتب دالة مولّد <code>prime_numbers()</code> تُنشئ مولّدًا جديدًا. وينبغي أن يعيد المولّد أعدادًا أولية جديدة، واحدًا تلو الآخر بالتتابع، بدءًا من 2. ملاحظة: هذا المولّد لا ينتهي أبدًا. وسيولّد الأعداد ما دام هناك حاجة إليها.</p>
<p>على سبيل المثال:</p>
<pre><code class="language-python">numbers = prime_numbers()
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(numbers))
</code></pre>
<pre><code>2
3
5
7
11
13
17
19
</code></pre>
<p><strong>تلميح:</strong> يمكنك استخدام حلقة للتحقق مما إذا كان العدد أوليًا. فإذا كنا نتحقق من العدد <code>x</code>، فستمر الحلقة على الأعداد من <code>2</code> إلى <code>x-1</code>. وإذا كان <code>x</code> يقبل القسمة على أيٍّ منها، فهو ليس عددًا أوليًا.</p>
<h2 id="إدراكات-المولد">إدراكات المولّد</h2>
<p>لا تحتاج بالضرورة إلى تعريف دالة لإنشاء مولّد. فيمكننا بدلًا من ذلك استخدام بنية مشابهة لإدراك القائمة. وهذه المرة نستخدم الأقواس <em>الدائرية</em> للدلالة على مولّد بدلًا من قائمة أو قاموس:</p>
<pre><code class="language-python"><span class="hljs-comment"># This generator returns squares of integers</span>
squares = (x ** <span class="hljs-number">2</span> <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">64</span>))

<span class="hljs-built_in">print</span>(squares) <span class="hljs-comment"># the printout of a generator object isn&#x27;t too informative</span>

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(squares))
</code></pre>
<pre><code>&lt;generator object &amp;lt;genexpr&amp;gt; at 0x000002B4224EBFC0&gt;
1
4
9
16
25
</code></pre>
<p>في المثال التالي نطبع سلاسل فرعية من الأبجدية الإنجليزية، كل منها بطول ثلاثة أحرف. وهذا يطبع أول 10 عناصر في المولّد:</p>
<pre><code class="language-python">substrings = (<span class="hljs-string">&quot;abcdefghijklmnopqrstuvwxyz&quot;</span>[i : i + <span class="hljs-number">3</span>] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">24</span>))

<span class="hljs-comment"># print out first 10 substrings</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">next</span>(substrings))
</code></pre>
<pre><code>abc
bcd
cde
def
efg
fgh
ghi
hij
ijk
jkl
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: كلمات عشوائية</strong></p>
<p>اكتب دالة باسم <code>word_generator(characters: str, length: int, amount: int)</code> تعيد مولّدًا جديدًا لتوليد كلمات عشوائية بناءً على المعاملات المعطاة.</p>
</blockquote>
<p>تُولَّد الكلمة العشوائية باختيار عددٍ من الأحرف من السلسلة النصية المسماة <code>characters</code> بقدر ما يحدّده الوسيط <code>length</code>. ويمكن أن يظهر الحرف نفسه مرات عديدة في الكلمة العشوائية.</p>
<p>ويعيد المولّد عددًا من الكلمات بقدر ما يحدّده الوسيط <code>amount</code> قبل أن ينتهي.</p>
<p>مثال على تشغيل مولّد الكلمات:</p>
<pre><code class="language-python">wordgen = word_generator(<span class="hljs-string">&quot;abcdefg&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>)
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> wordgen:
    <span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>dbf
baf
ead
fga
ccc
</code></pre>
<p>ملاحظة: يعود إليك أمر تحديد كيفية تنفيذ هذه الدالة. فيمكنك استخدام مولّد «تقليدي» أو إدراك مولّد على حدٍّ سواء.</p>
`,c={book:n,chapter:s,chapterTitle:a,slug:e,title:p,headings:l,html:o};export{n as book,s as chapter,a as chapterTitle,c as default,l as headings,o as html,e as slug,p as title};
