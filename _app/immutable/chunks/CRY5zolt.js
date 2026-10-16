const s="mooc",n="part-11",a="الجزء 11: ميزات متقدمة",e="3-recursion",l="التعاود",p=[{depth:2,id:"ماذا-يعني-التعاود",text:"ماذا يعني التعاود؟"},{depth:2,id:"التعاود-وقيم-الإرجاع",text:"التعاود وقيم الإرجاع"},{depth:2,id:"البحث-الثنائي",text:"البحث الثنائي"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما معنى التعاود</li>
<li>ستكون قادرًا على كتابة دالة تعاودية بسيطة</li>
</ul>
</blockquote>
<p>كما رأينا مرات عديدة من قبل، يمكن للدوال أن تستدعي دوالّ أخرى. فمثلًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">name : <span class="hljs-built_in">str</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, name)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">hello_many_times</span>(<span class="hljs-params">name : <span class="hljs-built_in">str</span>, times : <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(times):
        hello(name)
</code></pre>
<p>يمكن للدالة أيضًا أن تستدعي نفسها، لكن علينا نحن المبرمجين أن نكون حذرين حين نفعل ذلك. فمن السهل أن نقع في حلقة لا نهائية من استدعاءات الدوال، تمامًا كما وقعنا في حلقة تكرار لا نهائية مع حلقات <code>while</code> إذا أهملنا شروط التوقف المناسبة. فمحاولة استدعاء دالة <code>hello</code> بالتعريف التالي</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">name : <span class="hljs-built_in">str</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, name)
    hello(name) <span class="hljs-comment"># function calls itself</span>
</code></pre>
<p>ستُسبّب نوعًا جديدًا من الأخطاء:</p>
<pre><code>RecursionError: maximum recursion depth exceeded
</code></pre>
<h2 id="ماذا-يعني-التعاود">ماذا يعني التعاود؟</h2>
<p>يشير <em>التعاود</em> المذكور في الخطأ أعلاه إلى <em>تعريف شيء ما بدلالة نفسه</em>. وفي سياق البرمجة يشير عادةً إلى دالة تستدعي نفسها. ولكي يعمل ذلك دون إحداث أي حلقات لا نهائية، يجب أن تتغيّر الوسائط الممرّرة إلى الدالة في كل مرة، بحيث تتوقف استدعاءات الدوال المتداخلة في نقطة ما. والمبدأ الأساسي هنا هو نفسه في حلقات <code>while</code>: يجب أن يوجد دائمًا شرط توقف من نوع ما، وأن يُستوفى هذا الشرط في نقطة ما أثناء التنفيذ.</p>
<p>لننظر إلى دالة بسيطة تضيف أصفارًا إلى قائمة ما دام عدد العناصر فيها أقل من 10. لكننا هذه المرة لا نستخدم حلقة. فإذا لم يتحقق الشرط بعد، تستدعي الدالة نفسها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fill_list</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; If the length of the list is less than 10, add items to the list &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(numbers) &lt; <span class="hljs-number">10</span>:
        numbers.append(<span class="hljs-number">0</span>)
        <span class="hljs-comment"># call the function again</span>
        fill_list(numbers)


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    test_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
    fill_list(test_list)
    <span class="hljs-built_in">print</span>(test_list)
</code></pre>
<pre><code>[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]
</code></pre>
<p>ويمكن تحقيق الوظيفة نفسها تمامًا بحلقة <code>while</code> عادية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fill_list</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; If the length of the list is less than 10, add items to the list &quot;&quot;&quot;</span>
    <span class="hljs-keyword">while</span> <span class="hljs-built_in">len</span>(numbers) &lt; <span class="hljs-number">10</span>:
        numbers.append(<span class="hljs-number">0</span>)

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    test_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
    fill_list(test_list)
    <span class="hljs-built_in">print</span>(test_list)
</code></pre>
<p>ينتج الأسلوب التكراري الأكثر تقليدية برنامجًا أقصر، ويمكن القول إنه أسهل في الفهم أيضًا. أما مع النسخة التعاودية فليس من الواضح بالقدر نفسه أننا نعمل على القائمة ذاتها طوال العملية. لكن هذا هو الحال فعلًا، ولهذا تعمل الدالة التعاودية بالقدر نفسه من الجودة.</p>
<blockquote>
<p><strong>تكراري أم تعاودي؟</strong></p>
<p>كثيرًا ما تفرّق نظرية علوم الحاسوب بين الخوارزميات <em>التكرارية</em> و_التعاودية_، لذا من الأفضل أن تألف هذين المصطلحين منذ البداية. الحلول التكرارية هي تلك المبنية على معالجة العناصر معالجة متسلسلة، غالبًا باستخدام حلقات. وقد تعاملنا حتى الآن مع الأساليب التكرارية على سبيل الحصر تقريبًا. أما التعاودي فيشير إلى أسلوب تستدعي فيه الدالة نفسها بقيم معاملات متغيّرة.</p>
<p>من حيث المبدأ ينبغي أن يكون ممكنًا حل أي مشكلة بالأسلوبين التكراري أو التعاودي. لكن عمليًا غالبًا ما يكون أحد الأسلوبين أنسب بوضوح لكل مشكلة. والقدرة على تحديد الأفضل تأتي في معظمها بالممارسة.</p>
</blockquote>
<blockquote>
<p><strong>تمرين برمجي: إضافة أعداد إلى قائمة</strong></p>
<p>يُرجى كتابة <em>دالة تعاودية</em> باسم <code>add_numbers_to_list(numbers: list)</code>. تأخذ الدالة قائمة أعداد بوصفها وسيطًا لها، وتضيف أعدادًا جديدة إلى القائمة حتى يصبح طول القائمة قابلًا للقسمة على خمسة. وينبغي أن يكون كل عدد يُضاف إلى القائمة أكبر بواحد من العدد الأخير في القائمة.</p>
</blockquote>
<p>يجب أن تستدعي الدالة نفسها استدعاءً تعاوديًا. يُرجى الاطلاع على المثال أدناه.</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>]
add_numbers_to_list(numbers)
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>[1, 3, 4, 5, 10, 11, 12, 13, 14, 15]
</code></pre>
<h2 id="التعاود-وقيم-الإرجاع">التعاود وقيم الإرجاع</h2>
<p>يمكن أن يكون للدوال التعاودية قيم إرجاع أيضًا. وقد تعاملنا في الأقسام القليلة الماضية مع المضروب (factorial)، فلنكتب دالة تعاودية لحساب المضروب:</p>
<pre><code class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for n &gt;= 0 &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span>:
        <span class="hljs-comment"># The factorial for 0 and 1 is 1</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>

    <span class="hljs-comment"># Call the function again with an argument that is one smaller</span>
    <span class="hljs-keyword">return</span> n * factorial(n - <span class="hljs-number">1</span>)

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># Tesing our function</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">7</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The factorial of <span class="hljs-subst">{i}</span> is <span class="hljs-subst">{factorial(i)}</span>&quot;</span>)

</code></pre>
<pre><code>The factorial of 1 is 1
The factorial of 2 is 2
The factorial of 3 is 6
The factorial of 4 is 24
The factorial of 5 is 120
The factorial of 6 is 720
</code></pre>
<p>إذا كان معامل الدالة التعاودية للمضروب يساوي 0 أو 1، فتُرجع الدالة 1، لأن هذه هي طريقة تعريف عملية المضروب. وفي أي حالة أخرى تُرجع الدالة القيمة <code>n * factorial(n - 1)</code>، وهي قيمة معاملها <code>n</code> مضروبة في قيمة الإرجاع للاستدعاء <code>factorial(n - 1)</code>.</p>
<p>والجزء الحاسم هنا أن تعريف الدالة يتضمّن شرط توقف. فإذا تحقق هذا الشرط انتهى التعاود. وهذا الشرط في هذه الحالة هو <code>n &lt; 2</code>. ونحن نعلم أنه سيُستوفى في النهاية، لأن القيمة الممرّرة وسيطًا إلى الدالة تنقص بمقدار واحد في كل مستوى من مستويات التعاود.</p>
<p>ويمكن أن تكون <a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التصوير</a> عونًا كبيرًا في فهم البرامج التعاودية.</p>
<p>وقد يصبح المثال أعلاه أوضح قليلًا لو استخدمنا متغيّرات مساعدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>

    factorial_one_level_down = factorial(n - <span class="hljs-number">1</span>)
    factorial_now = n * factorial_one_level_down
    <span class="hljs-keyword">return</span> factorial_now
    
factorial(<span class="hljs-number">5</span>)
</code></pre>
<p>ألقِ نظرة على كيف توضّح <a href="http://www.pythontutor.com/visualize.html#code=def%20factorial%28n%3A%20int%29%3A%0A%20%20%20%20if%20n%20%3C%202%3A%0A%20%20%20%20%20%20%20%20return%201%0A%0A%20%20%20%20factorial_one_level_down%20%3D%20factorial%28n%20-%201%29%0A%20%20%20%20factorial_now%20%3D%20n%20*%20factorial_one_level_down%0A%20%20%20%20return%20factorial_now%0A%20%20%20%20%0Afactorial%285%29&amp;cumulative=false&amp;curInstr=5&amp;heapPrimitives=nevernest&amp;mode=display&amp;origin=opt-frontend.js&amp;py=3&amp;rawInputLstJSON=%5B%5D&amp;textReferences=false">أداة التصوير</a> تقدّم التعاود.</p>
<p>لأداة التصوير خصوصية صغيرة في طريقة تعاملها مع مكدّس الاستدعاءات، إذ يبدو أنها &quot;تنمو&quot; نحو الأسفل. وعادةً ما تُصوَّر مكدّسات الاستدعاءات على أنها كذلك بالفعل: مكدّسات توضع فيها الاستدعاءات الجديدة في الأعلى. أما في أداة التصوير فإن استدعاء الدالة النشط حاليًا هو الكتلة المظللة في الأسفل، ولها نسخها الخاصة من المتغيّرات الظاهرة.</p>
<p>عند استدعاء الدالة التعاودية للمضروب يُبنى مكدّس الاستدعاءات حتى الوصول إلى الحد الذي يفرضه <code>n &lt; 2</code>. عندئذٍ يعود آخر استدعاء للدالة في المكدّس بقيمة، وهي <code>1</code>، لأن <code>n</code> أصبح الآن أقل من 2. وتُمرَّر قيمة الإرجاع هذه إلى الاستدعاء السابق في المكدّس، حيث تُستخدم لحساب قيمة الإرجاع لذلك الاستدعاء، وهكذا دواليك في الخروج من المكدّس.</p>
<p>وتُخزَّن قيمة الإرجاع لكل استدعاء للدالة في المتغيّر المساعد <code>factorial_now</code>. يُرجى مراجعة التصوير بعناية حتى تفهم ما يحدث في كل خطوة، وأولِ عناية خاصة للقيمة المُرجعة في كل خطوة.</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_1_1.png" alt="11_1_1.png"></p>
<p>لننظر إلى مثال تعاودي شائع آخر: عدد فيبوناتشي (Fibonacci). في متتالية فيبوناتشي يكون كل عدد مجموع العددين السابقين له. وقد عُرِّف العددان الأولان هنا بأنهما 1 و1، فتبدأ المتتالية هكذا: 1، 1، 2، 3، 5، 8، 13، 21، 34.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fibonacci</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function returns the nth number in the Fibonacci sequence (1, 1, 2, 3, 5, 8 etc.); n &gt; 0&quot;&quot;&quot;</span>

    <span class="hljs-keyword">if</span> n &lt;= <span class="hljs-number">2</span>:
        <span class="hljs-comment"># the first two are ones</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>

    <span class="hljs-comment"># All other numbers equal the sum of the two preceding numbers in the sequence</span>
    <span class="hljs-keyword">return</span> fibonacci(n - <span class="hljs-number">1</span>) + fibonacci(n - <span class="hljs-number">2</span>)

<span class="hljs-comment"># Test that everything works</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">11</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The <span class="hljs-subst">{i}</span>. number in the Fibonacci sequence is <span class="hljs-subst">{fibonacci(i)}</span>&quot;</span>)
</code></pre>
<pre><code>The 1. number in the Fibonacci sequence is 1
The 2. number in the Fibonacci sequence is 1
The 3. number in the Fibonacci sequence is 2
The 4. number in the Fibonacci sequence is 3
The 5. number in the Fibonacci sequence is 5
The 6. number in the Fibonacci sequence is 8
The 7. number in the Fibonacci sequence is 13
The 8. number in the Fibonacci sequence is 21
The 9. number in the Fibonacci sequence is 34
The 10. number in the Fibonacci sequence is 55
</code></pre>
<p>هذه المرة شرط التوقف هو أن يكون المعامل أقل من أو يساوي 2، لأن المتتالية كلها معرّفة انطلاقًا من العددين الأولين، وقد عرّفنا العددين الأولين بأنهما يساويان 1.</p>
<p>إذًا، كيف تعمل هذه الدالة عمليًا؟</p>
<p>إذا استُدعيت الدالة بالوسيط 1 أو 2، فإنها تُرجع 1، وفقًا لما يقتضيه الشرط <code>n &lt;= 2</code>.</p>
<p>أما إذا كان الوسيط 3 أو أكبر، فتُرجع الدالة قيمة <code>fibonacci(n - 1) + fibonacci(n - 2)</code>. وإذا كان الوسيط 3 بالضبط، فإن هذه القيمة تساوي <code>fibonacci(2) + fibonacci(1)</code>، ونحن نعرف بالفعل نتيجة كلٍّ منهما من الخطوة السابقة. و<code>1 + 1</code> يساوي 2، وهو فعلًا العدد الثالث في متتالية فيبوناتشي.</p>
<p>وإذا كان الوسيط 4، فقيمة الإرجاع هي <code>fibonacci(3) + fibonacci(2)</code>، التي نعرف الآن أنها <code>2 + 1</code>، أي ما يساوي 3.</p>
<p>وإذا كان الوسيط 5، فقيمة الإرجاع هي <code>fibonacci(4) + fibonacci(3)</code>، التي نعرف الآن أنها <code>3 + 2</code>، أي ما يساوي 5.</p>
<p>وهكذا دواليك، وهكذا دواليك.</p>
<p>ويمكننا التحقق في كل خطوة من أن الدالة تُنتج النتائج الصحيحة، وهذا يكفي غالبًا في مهام البرمجة الأساسية. أما قابلية الخوارزميات للتحقق الصوري فهي موضوع لدورات أكثر تقدمًا، مثل <a href="https://studies.helsinki.fi/courses/cur/hy-opt-cur-2122-808d3413-3db0-4ab9-89d9-e816e94bf51d">هياكل البيانات والخوارزميات</a>.</p>
<blockquote>
<p><strong>تمرين برمجي: مجموع تعاودي</strong></p>
<p>يُرجى كتابة دالة تعاودية باسم <code>recursive_sum(number: int)</code> تحسب المجموع <code>1 + 2 + ... + number</code>. ويحتوي قالب التمرين على الهيكل التالي:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">recursive_sum</span>(<span class="hljs-params">number: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># if the number is 1, there is nothing else to add</span>
    <span class="hljs-keyword">if</span> number &lt;= <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> number

    <span class="hljs-comment"># fill in the rest of the function</span>
</code></pre>
<p>بعض الأمثلة:</p>
<pre><code class="language-python">result = recursive_sum(<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(result)

<span class="hljs-built_in">print</span>(recursive_sum(<span class="hljs-number">5</span>))
<span class="hljs-built_in">print</span>(recursive_sum(<span class="hljs-number">10</span>))
</code></pre>
<pre><code>6
15
55
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: موازنة جميع الأقواس</strong></p>
<p>يحتوي قالب التمرين على الدالة <code>balanced_brackets</code> التي تأخذ سلسلة نصية بوصفها وسيطًا لها. وهي تتحقق مما إذا كانت الأقواس <em>الدائرية</em>، أي الأقواس الهلالية، داخل السلسلة النصية متوازنة. أي أنه مقابل كل قوس فتح <code>(</code> ينبغي أن يكون هناك قوس إغلاق <code>)</code>، وأن تُطابَق كل أزواج الأقواس بالترتيب، بمعنى أنه لا يجوز تقاطع أزواج الأقواس.</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">balanced_brackets</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(my_string) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> (my_string[<span class="hljs-number">0</span>] == <span class="hljs-string">&#x27;(&#x27;</span> <span class="hljs-keyword">and</span> my_string[-<span class="hljs-number">1</span>] == <span class="hljs-string">&#x27;)&#x27;</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

    <span class="hljs-comment"># remove first and last character</span>
    <span class="hljs-keyword">return</span> balanced_brackets(my_string[<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>])

ok = balanced_brackets(<span class="hljs-string">&quot;(((())))&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

<span class="hljs-comment"># there is one closing bracket too many, so this produces False</span>
ok = balanced_brackets(<span class="hljs-string">&quot;()())&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

<span class="hljs-comment"># this one starts with a closing bracket, False again</span>
ok = balanced_brackets(<span class="hljs-string">&quot;)()&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

<span class="hljs-comment"># this produces False because the function only handles entirely nested brackets</span>
ok = balanced_brackets(<span class="hljs-string">&quot;()(())&quot;</span>)
<span class="hljs-built_in">print</span>(ok)
</code></pre>
<pre><code>True
False
False
False
</code></pre>
<p>يُرجى توسيع الدالة بحيث تعمل أيضًا مع الأقواس المعقوفة <code>[]</code>. وينبغي أن تتجاهل الدالة كذلك كل المحارف التي ليست أقواسًا <code>()</code> أو <code>[]</code>. ويجب أن تُطابَق الأنواع المختلفة من الأقواس بشكل صحيح بالترتيب.</p>
<p>يُرجى الاطلاع على الأمثلة أدناه::</p>
<pre><code class="language-python">ok = balanced_brackets(<span class="hljs-string">&quot;([([])])&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

ok = balanced_brackets(<span class="hljs-string">&quot;(python version [3.7]) please use this one!&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

<span class="hljs-comment"># this is no good, the closing bracket doesn&#x27;t match</span>
ok = balanced_brackets(<span class="hljs-string">&quot;(()]&quot;</span>)
<span class="hljs-built_in">print</span>(ok)

<span class="hljs-comment"># different types of brackets are mismatched</span>
ok = balanced_brackets(<span class="hljs-string">&quot;([bad egg)]&quot;</span>)
<span class="hljs-built_in">print</span>(ok)
</code></pre>
<p>ملاحظة: تحتاج الدالة فقط إلى معالجة الأقواس المتداخلة كليًا. وينبغي أن تُنتج السلسلة النصية <code>(x + 1)(y + 1)</code> القيمة <code>False</code> لأن الأقواس غير متداخلة إحداها داخل الأخرى.</p>
<pre><code>True
True
False
False
</code></pre>
<h2 id="البحث-الثنائي">البحث الثنائي</h2>
<p>في البحث الثنائي تكون لدينا قائمة مرتّبة من العناصر ونحاول العثور على عنصر معيّن داخلها. ويمكن أن يكون ترتيب العناصر، على سبيل المثال، أعدادًا من الأصغر إلى الأكبر، أو سلاسل نصية من الأول أبجديًا إلى الأخير. ولا تهمّ طريقة الترتيب، ما دامت معروفة وذات صلة بالعنصر الذي نحاول العثور عليه.</p>
<p>تقوم فكرة البحث الثنائي على النظر دائمًا إلى العنصر الواقع في منتصف القائمة تمامًا. وعندها تكون لدينا ثلاث حالات محتملة. فإذا كان العنصر الواقع في المنتصف</p>
<ul>
<li>هو العنصر الذي نبحث عنه: يمكننا إرجاع إشارة إلى أننا وجدنا العنصر</li>
<li>أصغر من العنصر الذي نبحث عنه: يمكننا إعادة البحث في النصف الأكبر من القائمة</li>
<li>أكبر من العنصر الذي نبحث عنه: يمكننا إعادة البحث في النصف الأصغر من القائمة.</li>
</ul>
<p>وإذا كانت القائمة فارغة، يمكننا أن نستنتج أن العنصر لم يُوجد، وأن نُرجع إشارة إلى ذلك.</p>
<p>في الصورة التالية يمكننا أن نرى كيف يتقدّم البحث الثنائي وهو يبحث عن العدد 24:</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_3_1.png" alt="11_3_1.png"></p>
<p>وهذه خوارزمية تعاودية للبحث الثنائي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">binary_search</span>(<span class="hljs-params">target: <span class="hljs-built_in">list</span>, item: <span class="hljs-built_in">int</span>, left : <span class="hljs-built_in">int</span>, right : <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function returns True if the item is contained in the target list, False otherwise &quot;&quot;&quot;</span>
    <span class="hljs-comment"># If the search area is empty, item was not found</span>
    <span class="hljs-keyword">if</span> left &gt; right:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

    <span class="hljs-comment"># Calculate the centre of the search area, integer result</span>
    centre = (left+right)//<span class="hljs-number">2</span>

    <span class="hljs-comment"># If the item is found at the centre, return</span>
    <span class="hljs-keyword">if</span> target[centre] == item:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

    <span class="hljs-comment"># If the item is greater, search the greater half</span>
    <span class="hljs-keyword">if</span> target[centre] &lt; item:
        <span class="hljs-keyword">return</span> binary_search(target, item, centre+<span class="hljs-number">1</span>, right)
    <span class="hljs-comment"># Else the item is smaller, search the smaller half</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> binary_search(target, item, left, centre-<span class="hljs-number">1</span>)


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># Test your function</span>
    target = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">18</span>]
    <span class="hljs-built_in">print</span>(binary_search(target, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(target)-<span class="hljs-number">1</span>))
    <span class="hljs-built_in">print</span>(binary_search(target, <span class="hljs-number">13</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(target)-<span class="hljs-number">1</span>))
    <span class="hljs-built_in">print</span>(binary_search(target, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(target)-<span class="hljs-number">1</span>))
    <span class="hljs-built_in">print</span>(binary_search(target, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(target)-<span class="hljs-number">1</span>))
</code></pre>
<pre><code>True
True
False
False
</code></pre>
<p>تأخذ الدالة <code>binary_search</code> أربعة وسائط: القائمة الهدف، والعنصر المبحوث عنه، والحدّين الأيسر والأيمن لمنطقة البحث. وعند استدعاء الدالة أول مرة تغطي منطقة البحث القائمة الهدف بأكملها. ويقع الحدّ الأيسر عند الفهرس <code>0</code> والحدّ الأيمن عند الفهرس <code>len(target)-1</code>. وتحسب الدالة الفهرس المركزي وتفحص ذلك الموضع في القائمة. فإما أن يكون العنصر قد وُجد، وإما أن يستمر البحث في النصف الأصغر أو الأكبر من القائمة الهدف.</p>
<p>لنقارن هذا ببحث خطّي بسيط. في البحث الخطّي تُجتاز منطقة البحث من البداية فصاعدًا، حتى إما العثور على العنصر، وإما نفاد منطقة البحث. وينمو عدد الخطوات اللازمة لتغطية منطقة البحث بأكملها <em>خطيًا</em> بالوتيرة نفسها التي ينمو بها حجم منطقة البحث. وتغطي كل خطوة بحث مرشّحًا واحدًا فقط من بداية منطقة البحث. ولنفترض أن العنصر المبحوث عنه <em>لم</em> يُوجد. فإذا كانت منطقة البحث بطول مليون عنصر، فسيتعيّن علينا اتخاذ مليون خطوة بحث للتأكد من أن العنصر ليس في منطقة البحث.</p>
<p>أما في البحث الثنائي، في المقابل، فينمو عدد الخطوات اللازمة <em>لوغاريتميًا</em>. ولنفترض مرة أخرى أن العنصر المبحوث عنه <em>لم</em> يُوجد. فتُقسَّم منطقة البحث إلى نصفين مع كل خطوة، لأننا نعلم أن العنصر إما أصغر وإما أكبر من مرشّح البحث الحالي في المنتصف. و2 مرفوعًا إلى القوة 20 (2^20) يتجاوز المليون بكثير، لذا سيلزم على الأكثر 20 خطوة لتغطية منطقة البحث بأكملها بالبحث الثنائي. ومن ثم، حين نتعامل مع مناطق بحث مرتّبة، كما نفعل كثيرًا عند التعامل مع الحواسيب والمواد المعدّة للمعالجة الآلية، يكون البحث الثنائي أكفأ بكثير من البحث الخطّي.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,e as slug,l as title};
