const s="mooc",n="part-6",a="الجزء 6: الملفات والأخطاء",e="4-scope-of-variables",l="المتغيّرات المحلية والعالمية",p=[{depth:2,id:"المتغيرات-المحلية",text:"المتغيّرات المحلية"},{depth:2,id:"المتغيرات-العالمية",text:"المتغيّرات العالمية"},{depth:2,id:"متى-ينبغي-أن-تستخدم-المتغيرات-العالمية",text:"متى ينبغي أن تستخدم المتغيّرات العالمية؟"},{depth:2,id:"تمرير-البيانات-من-دالة-إلى-أخرى-مرة-أخرى",text:"تمرير البيانات من دالة إلى أخرى، مرة أخرى"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما المقصود بالمتغيّر المحلي</li>
<li>ستعرف كيف يؤثّر نطاق المتغيّر في طريقة استخدامه</li>
<li>ستعرف ما تعنيه الكلمة المفتاحية <code>global</code> في Python</li>
<li>ستكون قادرًا على استخدام المتغيّرات المحلية والعالمية في السياقات الصحيحة</li>
</ul>
</blockquote>
<p>يُشير <em>نطاق</em> (scope) المتغيّر إلى أجزاء البرنامج التي يكون فيها المتغيّر متاحًا. فالمتغيّر <em>المحلي</em> (local) لا يكون متاحًا إلا في جزء محدّد من البرنامج، أما المتغيّر <em>العالمي</em> (global) فيتاح استخدامه في أي جزء من البرنامج.</p>
<h2 id="المتغيرات-المحلية">المتغيّرات المحلية</h2>
<p>المتغيّرات المعرّفة داخل دالة في Python هي متغيّرات محلية، لا تتاح إلا داخل الدالة. وينطبق ذلك على معاملات الدالة وعلى سائر المتغيّرات المعرّفة داخل تعريف الدالة. والمتغيّر المحلي في دالة <em>لا وجود له خارج الدالة</em>.</p>
<p>في المثال التالي نحاول الوصول إلى المتغيّر <code>x</code> في الدالة الرئيسة، لكن ذلك يتسبّب في خطأ:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    x = <span class="hljs-number">5</span>
    <span class="hljs-built_in">print</span>(x)

testing()
<span class="hljs-built_in">print</span>(x)
</code></pre>
<pre><code>5
NameError: name 'x' is not defined
</code></pre>
<p>المتغيّر <code>x</code> لا وجود له إلا أثناء تنفيذ الدالة <code>testing</code>. ولا تستطيع الدوال الأخرى ولا الدالة الرئيسة الوصول إلى المتغيّر.</p>
<h2 id="المتغيرات-العالمية">المتغيّرات العالمية</h2>
<p>المتغيّرات المعرّفة داخل الدالة الرئيسة هي متغيّرات عالمية. وقد عرّفنا الدالة الرئيسة سابقًا بأنها أجزاء الشيفرة في برنامج Python التي لا تقع داخل أي دالة أخرى. ويمكن الوصول إلى القيمة المخزّنة في متغيّر عالمي من أي دالة أخرى في البرنامج، لذا لا يتسبّب ما يلي في أي أخطاء:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    <span class="hljs-built_in">print</span>(x)

x = <span class="hljs-number">3</span>
testing()
</code></pre>
<pre><code>3
</code></pre>
<p>لا يمكن تغيير متغيّر عالمي مباشرةً من داخل دالة أخرى. والدالة التالية <em>لا تأثير لها</em> على القيمة المخزّنة في المتغيّر العالمي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    x = <span class="hljs-number">5</span>
    <span class="hljs-built_in">print</span>(x)

x = <span class="hljs-number">3</span>
testing()
<span class="hljs-built_in">print</span>(x)
</code></pre>
<pre><code>5
3
</code></pre>
<p>هنا تُنشئ الدالة <code>testing</code> متغيّرًا <em>جديدًا محليًّا</em> <code>x</code>، «يحجب» المتغيّر العالمي أثناء تنفيذ الدالة. وقيمة هذا المتغيّر 5، لكنه متغيّر مختلف عن المتغيّر العالمي <code>x</code> المعرّف في الدالة الرئيسة.</p>
<p>لكن ماذا ستفعل الشيفرة التالية؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    <span class="hljs-built_in">print</span>(x)
    x = <span class="hljs-number">5</span>

x = <span class="hljs-number">3</span>
testing()
<span class="hljs-built_in">print</span>(x)
</code></pre>
<pre><code>UnboundLocalError: local variable 'x' referenced before assignment
</code></pre>
<p>تُسند الدالة <code>testing</code> قيمةً إلى المتغيّر <code>x</code>، لذا تفسّر Python أن <code>x</code> متغيّر محلي بدلًا من المتغيّر العالمي الذي يحمل الاسم نفسه. وتحاول الدالة الوصول إلى المتغيّر قبل تعريفه، فيحدث خطأ.</p>
<p>وإذا أردنا أن نحدّد أننا نعني تغيير المتغيّر العالمي داخل دالة، فسنحتاج إلى الكلمة المفتاحية <code>global</code> في Python:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>():
    <span class="hljs-keyword">global</span> x
    x = <span class="hljs-number">3</span>
    <span class="hljs-built_in">print</span>(x)

x = <span class="hljs-number">5</span>
testing()
<span class="hljs-built_in">print</span>(x)
</code></pre>
<pre><code>3
3
</code></pre>
<p>الآن صار الإسناد <code>x = 3</code> داخل الدالة يؤثّر أيضًا في الدالة الرئيسة. فكل أجزاء البرنامج تستخدم المتغيّر العالمي نفسه <code>x</code>.</p>
<h2 id="متى-ينبغي-أن-تستخدم-المتغيرات-العالمية">متى ينبغي أن تستخدم المتغيّرات العالمية؟</h2>
<p>ليست المتغيّرات العالمية وسيلة لتجاوز معاملات الدالة أو قيم الإرجاع، ولا ينبغي استخدامها على هذا النحو. أي أنه <em>من الممكن</em> كتابة دالة تخزّن نتائجها مباشرةً في متغيّر عالمي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">global</span> result
    result = a + b

calculate_sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<p>والأفضل كتابة دالة لها قيمة إرجاع، كما اعتدنا أن نفعل حتى الآن:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a + b

result = calculate_sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<p>وميزة النهج الأخير أن الدالة كلّ <em>مستقل</em>. فلها معاملات محدّدة ومعروفة، وهي تُعيد نتيجة. وليس لها آثار جانبية، لذا يمكن اختبارها وتغييرها باستقلال عن سائر أجزاء البرنامج.</p>
<p>تكون المتغيّرات العالمية مفيدة في الحالات التي نحتاج فيها إلى معلومات مشتركة «على مستوى أعلى» تتاح لكل الدوال في البرنامج. وفيما يلي مثال على حالة من هذا القبيل تمامًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">global</span> count
    count += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> a + b

<span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_difference</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">global</span> count
    count += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> a - b


count = <span class="hljs-number">0</span>
<span class="hljs-built_in">print</span>(calculate_sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>))
<span class="hljs-built_in">print</span>(calculate_sum(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>))
<span class="hljs-built_in">print</span>(calculate_difference(<span class="hljs-number">5</span>, <span class="hljs-number">2</span>))
<span class="hljs-built_in">print</span>(calculate_sum(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;There were&quot;</span>, count, <span class="hljs-string">&quot;function calls&quot;</span>)
</code></pre>
<pre><code>5
10
3
1
There were 4 function calls
</code></pre>
<p>في هذه الحالة نريد تتبّع عدد مرات استدعاء أي من الدالتين أثناء تنفيذ البرنامج. والمتغيّر العالمي <code>count</code> مفيد هنا، لأننا نستطيع زيادته من الدالتين نفسيهما أثناء تنفيذهما، مع الوصول إلى القيمة النهائية في الدالة الرئيسة.</p>
<h2 id="تمرير-البيانات-من-دالة-إلى-أخرى-مرة-أخرى">تمرير البيانات من دالة إلى أخرى، مرة أخرى</h2>
<!--- انظر أيضًا القسم 4-6، فهناك تداخل كبير-->
<p>إذا كان البرنامج يتكوّن من عدة دوال، فكثيرًا ما يطرح السؤال عن تمرير البيانات من دالة إلى أخرى.</p>
<p>حين تعرّضنا لهذا الموضوع <a href="/arabic-cs-library/book/mooc/part-4/6-strings-and-lists#passing-data-from-one-function-to-another">سابقًا</a>، كان لدينا برنامج يطلب من المستخدم بعض القيم الصحيحة، ويطبعها، ويُجري بعض التحليل الإحصائي على الأعداد. وقد قُسّم البرنامج إلى ثلاث دوال منفصلة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">input_from_user</span>(<span class="hljs-params">how_many: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Please type in <span class="hljs-subst">{how_many}</span> numbers:&quot;</span>)
    numbers = []

    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(how_many):
        number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">f&quot;Number <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: &quot;</span>))
        numbers.append(number)

    <span class="hljs-keyword">return</span> numbers

<span class="hljs-keyword">def</span> <span class="hljs-title function_">print_result</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The numbers are: &quot;</span>)
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-built_in">print</span>(number)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">analyze</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    mean = <span class="hljs-built_in">sum</span>(numbers) / <span class="hljs-built_in">len</span>(numbers)
    <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;There are altogether <span class="hljs-subst">{<span class="hljs-built_in">len</span>(numbers)}</span> numbers, the mean is <span class="hljs-subst">{mean}</span>, the smallest is <span class="hljs-subst">{<span class="hljs-built_in">min</span>(numbers)}</span> and the greatest is <span class="hljs-subst">{<span class="hljs-built_in">max</span>(numbers)}</span>&quot;</span>

<span class="hljs-comment"># the main function using these functions</span>
inputs = input_from_user(<span class="hljs-number">5</span>)
print_result(inputs)
analysis_result = analyze(inputs)
<span class="hljs-built_in">print</span>(analysis_result)
</code></pre>
<p>مثال على تنفيذ البرنامج:</p>
<pre><code>Please type in 5 numbers:
Number 1: 10
Number 2: 34
Number 3: -32
Number 4: 99
Number 5: -53
The numbers are:
10
34
-32
99
-53
There are altogether 5 numbers, the mean is 11.6, the smallest is -53 and the greatest is 99
</code></pre>
<p>المبدأ الأساسي هنا أن الدالة الرئيسة «تخزّن» البيانات التي يعالجها البرنامج. ويعني ذلك هنا الأعداد التي يكتبها المستخدم، والمخزّنة في المتغيّر <code>inputs</code>.</p>
<p>وإذا احتجنا إلى الأعداد في دالة ما، يُمرَّر المتغيّر وسيطًا، كما رأينا أعلاه عند استدعاء الدالتين <code>print_result</code> و<code>analyze</code>. وإذا أنتجت الدالة نتيجة ذات صلة في موضع آخر من البرنامج، فتُعيدها الدالة بجملة <code>return</code>، كما رأينا مع الدالتين <code>input_from_user</code> و<code>analyse</code> أعلاه.</p>
<p>وكما هو الحال دائمًا في البرمجة، هناك طرق كثيرة للوصول إلى الوظيفة نفسها. فمن الممكن استخدام الكلمة المفتاحية <code>global</code> وجعل الدوال تصل مباشرةً إلى المتغيّر <code>inputs</code> المعرّف في الدالة الرئيسة. لكن هناك أسبابًا وجيهة تجعل <a href="https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil">هذا ليس خطوة حكيمة</a>. فحين تستطيع دوال كثيرة مختلفة الوصول إلى متغيّر ما وتغييره مباشرةً، يصبح تتبّع حالة البرنامج تتبّعًا موثوقًا أمرًا صعبًا، ما قد يجعل البرنامج غير متوقّع. ويصدق ذلك خصوصًا مع تزايد عدد الدوال المعنية، وهو أمر شائع في مشاريع البرمجيات الكبيرة.</p>
<p>وفي الختام، أفضل طريقة للتعامل مع تمرير البيانات إلى الدوال ومنها هي الوسائط وقيم الإرجاع.</p>
<p>ويمكنك أيضًا فصل الدالة الرئيسة الضمنية في المثال أعلاه إلى دالة <code>main</code> صريحة خاصة بها. وحينئذٍ لن يكون المتغيّر <code>inputs</code> متغيّرًا عالميًا بعد الآن، بل متغيّرًا محليًّا داخل الدالة <code>main</code>:</p>
<pre><code class="language-python"><span class="hljs-comment"># your main function goes here</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    inputs = input_from_user(<span class="hljs-number">5</span>)
    print_result(inputs)
    analysis_result = analyze(inputs)

    <span class="hljs-built_in">print</span>(analysis_result)

<span class="hljs-comment"># run the main function</span>
main()
</code></pre>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->
<p>يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 413a67e5-2eb9-5652-9ab0-58dfc4ebb021)</p>
</blockquote>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,p as headings,c as html,e as slug,l as title};
