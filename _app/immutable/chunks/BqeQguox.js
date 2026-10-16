const s="mooc",n="part-8",a="الجزء 8: الكائنات والصنوف",t="1-objects-and-methods",o="الكائنات والتابعات",p=[{depth:2,id:"الكائنات-والتابعات",text:"الكائنات والتابعات"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما هو الكائن في البرمجة</li>
<li>ستفهم المقصود باستقلالية الكائنات المنفردة</li>
<li>ستكون قادرًا على إنشاء الكائنات والوصول إليها</li>
</ul>
</blockquote>
<p>هذا هو الجزء الأول من دورة البرمجة المتقدمة. وقد صُمِّم هذا المحتوى لاستخدامه مع محرّر Visual Studio Code، تمامًا كما كان الحال مع دورة مقدمة إلى البرمجة السابقة. إن لم تستخدم Visual Studio Code من قبل، فستجد تعليمات التثبيت <a href="https://www.mooc.fi/en/installation/vscode">هنا</a>، ومقدمة عن بيئة البرمجة من الدورة السابقة <a href="/arabic-cs-library/book/mooc/part-4/1-vscode">هنا</a>.</p>
<p>في دورة مقدمة إلى البرمجة لاحظنا أنه من الفائدة كثيرًا تجميع البيانات المترابطة معًا في برامجنا. فمثلًا، إذا كنا نحاول تخزين معلومات عن كتاب، فقد يكون من المناسب استخدام صف (tuple) أو قاموس (dictionary) لتنظيم البيانات في هيكل بيانات واحد.</p>
<p>قد يبدو الحل على النحو التالي عند استخدام صف:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;In Search of Lost Typing&quot;</span>
author = <span class="hljs-string">&quot;Marcel Pythons&quot;</span>
year = <span class="hljs-number">1992</span>

<span class="hljs-comment"># Combine these in a tuple</span>
book = (name, author, year)

<span class="hljs-comment"># Print the name of the book</span>
<span class="hljs-built_in">print</span>(book[<span class="hljs-number">0</span>])
</code></pre>
<p>في حالة كهذه، تتمثل ميزة استخدام القاموس في إمكانية استخدام السلاسل النصية بدلًا من الفهارس بوصفها مفاتيح. أي أنه يمكننا إعطاء أسماء وصفية للعناصر المخزّنة في هيكل البيانات:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;In Search of Lost Typing&quot;</span>
author = <span class="hljs-string">&quot;Marcel Pythons&quot;</span>
year = <span class="hljs-number">1992</span>

<span class="hljs-comment"># Combine these in a dictionary</span>
book = {<span class="hljs-string">&quot;name&quot;</span>: name, <span class="hljs-string">&quot;author&quot;</span>: author, <span class="hljs-string">&quot;year&quot;</span>: year}

<span class="hljs-comment"># Print the name of the book</span>
<span class="hljs-built_in">print</span>(book[<span class="hljs-string">&quot;name&quot;</span>])
</code></pre>
<p>في الحالتين نُنشئ كائنًا (object) جديدًا. وفي البرمجة للمصطلح معنى محدَّد: كيان مستقل متكامل، يحوي في هذه الحالة بعض مقاطع البيانات المترابطة بعضها ببعض. والاستقلالية تعني أن أي تغييرات تُجرى في كائن واحد لن تؤثر في الكائنات الأخرى.</p>
<p>ولو أنشأنا تمثيلين لهيكل مطابق لكتابين، باستخدام قواميس لها مفاتيح متطابقة، لما كان لأي تغييرات تُجرى في أحدهما أي تأثير على الآخر:</p>
<pre><code class="language-python">book1 = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;The Old Man and the Pythons&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Ernest Pythons&quot;</span>, <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1952</span>}
book2 = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Seven Pythons&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Aleksis Python&quot;</span>, <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1894</span>}

<span class="hljs-built_in">print</span>(book1[<span class="hljs-string">&quot;name&quot;</span>])
<span class="hljs-built_in">print</span>(book2[<span class="hljs-string">&quot;name&quot;</span>])

book1[<span class="hljs-string">&quot;name&quot;</span>] = <span class="hljs-string">&quot;A Farewell to ARM Processors&quot;</span>

<span class="hljs-built_in">print</span>(book1[<span class="hljs-string">&quot;name&quot;</span>])
<span class="hljs-built_in">print</span>(book2[<span class="hljs-string">&quot;name&quot;</span>])
</code></pre>
<pre><code>The Old Man and the Pythons
Seven Pythons
A Farewell to ARM Processors
Seven Pythons
</code></pre>
<p><img src="/arabic-cs-library/images/mooc/part-8/8_1_1.png" alt="8_1_1.png"></p>
<blockquote>
<p><strong>كائنات Python</strong></p>
<p>قد تتذكّر من دورة مقدمة إلى البرمجة أن أي قيمة في Python تُعالَج داخليًّا بوصفها كائنًا. وهذا يعني أن القيمة المخزّنة في متغيّر هي <em>مرجع إلى كائن</em>. والبيانات بحد ذاتها مخزّنة داخل الكائن في ذاكرة الحاسوب. فإذا أسندت قيمة إلى متغيّر جديد بالأمر <code>a = 3</code>، فالقيمة المخزّنة في المتغيّر ليست 3، بل هي <em>مرجع إلى كائن يحوي القيمة 3</em>.</p>
<p>تضمّن معظم لغات البرمجة الأخرى (على الأقل تلك التي تدعم البرمجة الكائنية) بعض <em>أنواع البيانات الأولية</em> المعرَّفة خصيصًا. وتشمل هذه عادةً على الأقل الأعداد الصحيحة والأعداد العشرية وقيم الصدق المنطقية. وتُعالَج الأنواع الأولية معالجة مباشرة، أي أنها تُخزَّن مباشرة في المتغيّرات لا كمراجع. ولا تملك Python مثل هذه الأنواع الأولية، لكن التعامل مع أنواع البيانات الأساسية في Python مشابه عمليًّا جدًّا لذلك. وكائنات هذه الأنواع الأساسية (مثل الأعداد والقيم المنطقية والسلاسل النصية) <em>غير قابلة للتغيير</em> (immutable)، أي أنه لا يمكن تغييرها في الذاكرة. وإذا كان لا بدّ من تغيير القيمة المخزّنة في متغيّر من نوع بيانات أساسي، فُستبدل القيمة كلها بمرجع جديد، بينما يبقى الكائن نفسه سليمًا في الذاكرة.</p>
</blockquote>
<h2 id="الكائنات-والتابعات">الكائنات والتابعات</h2>
<p>البيانات المخزّنة في كائن يمكن الوصول إليها عبر <em>التابعات</em> (methods). والتابع دالة تعمل على الكائن المحدَّد الذي ارتبطت به. وميّز التابعات عن الدوال الأخرى هو طريقة استدعائها: تكتب أولًا اسم الكائن المستهدف، يتبعه نقطة، ثم اسم التابع، مع الوسائط إن وُجدت. فمثلًا، يُرجع التابع <code>values</code> كل القيم المخزّنة في كائن من نوع القاموس، أو <code>dict</code>:</p>
<pre><code class="language-python"><span class="hljs-comment"># this creates an object of type dictionary with the name book</span>
book = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;The Old Man and the Pythons&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Ernest Pythons&quot;</span>, <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1952</span>}

<span class="hljs-comment"># Print out all the values</span>
<span class="hljs-comment"># The method call values() is written after the name of the variable</span>
<span class="hljs-comment"># Remember the dot notation!</span>
<span class="hljs-keyword">for</span> value <span class="hljs-keyword">in</span> book.values():
    <span class="hljs-built_in">print</span>(value)
</code></pre>
<pre><code>The Old Man and the Pythons
Ernest Pythons
1952
</code></pre>
<p>وبالمثل، تستهدف تابعات السلسلة النصية كائن السلسلة النصية التي تُستدعى عليها. ومن أمثلة تابعات السلسلة النصية <code>count</code> و<code>find</code>:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Imaginary Irene&quot;</span>

<span class="hljs-comment"># Print out the number of times the letter I is found</span>
<span class="hljs-built_in">print</span>(name.count(<span class="hljs-string">&quot;I&quot;</span>))

<span class="hljs-comment"># The number of letters I found in another string</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Irreverent Irises in Islington&quot;</span>.count(<span class="hljs-string">&quot;I&quot;</span>))

<span class="hljs-comment"># The index of the substring Irene</span>
<span class="hljs-built_in">print</span>(name.find(<span class="hljs-string">&quot;Irene&quot;</span>))

<span class="hljs-comment"># This string has no such substring</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;A completely different string&quot;</span>.find(<span class="hljs-string">&quot;Irene&quot;</span>))
</code></pre>
<pre><code>2
3
10
-1
</code></pre>
<p>تعيد تابعات السلسلة النصية قيمًا، لكنها لن تغيّر محتويات السلسلة النصية. وكما ورد أعلاه، فالسلاسل النصية في Python غير قابلة للتغيير. لكن هذا لا ينطبق على كل التابعات. فالقوائم في Python قابلة للتغيير، لذا قد تغيّر تابعات القائمة في Python محتويات القائمة التي تُستدعى عليها:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]

<span class="hljs-comment"># Add a couple of items</span>
my_list.append(<span class="hljs-number">5</span>)
my_list.append(<span class="hljs-number">1</span>)

<span class="hljs-built_in">print</span>(my_list)

<span class="hljs-comment"># Remove the first item</span>
my_list.pop(<span class="hljs-number">0</span>)

<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[1, 2, 3, 5, 1]
[2, 3, 5, 1]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أصغر متوسط نتيجة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>smallest_average(person1: dict, person2: dict, person3: dict)</code>، تأخذ ثلاثة كائنات قاموس كوسيطات لها.</p>
</blockquote>
<p>تحتوي كل كائن قاموس على قيم مسنودة إلى المفاتيح التالية:</p>
<ul>
<li><code>&quot;name&quot;</code>: اسم المتسابق</li>
<li><code>&quot;result1&quot;</code>: النتيجة الأولى للمتسابق (عدد صحيح بين 1 و10)</li>
<li><code>&quot;result2&quot;</code>: النتيجة الثانية للمتسابق (كما سبق)</li>
<li><code>&quot;result3&quot;</code>: النتيجة الثالثة للمتسابق (كما سبق)</li>
</ul>
<p>ينبغي للدالة أن تحسب متوسط النتائج الثلاث لكل متسابق، ثم تُرجع المتسابق الذي كانت نتيجته المتوسطة الأصغر. ويجب أن تكون القيمة المُعادة هي كائن القاموس كاملًا الذي يحوي معلومات المتسابق.</p>
<p>ويمكنك أن تفترض ألّا توجد تعادلات، أي أن متسابقًا واحدًا فقط سيملك متوسط النتيجة الأصغر.</p>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">person1 = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Mary&quot;</span>, <span class="hljs-string">&quot;result1&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;result2&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;result3&quot;</span>: <span class="hljs-number">3</span>}
person2 = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Gary&quot;</span>, <span class="hljs-string">&quot;result1&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;result2&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;result3&quot;</span>: <span class="hljs-number">8</span>}
person3 = {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Larry&quot;</span>, <span class="hljs-string">&quot;result1&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;result2&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;result3&quot;</span>: <span class="hljs-number">1</span>}

<span class="hljs-built_in">print</span>(smallest_average(person1, person2, person3))
</code></pre>
<pre><code>{'name': 'Larry', 'result1': 3, 'result2': 1, 'result3': 1}
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مجاميع الصفوف</strong></p>
<p>في Python، كل قيمة مخزّنة في متغيّر هي مرجع إلى كائن، لذا فإن أي قيمة مخزّنة في قائمة هي أيضًا مرجع إلى كائن. وينطبق هذا أيضًا عند نمذجة هيكل بيانات المصفوفة: فكل قيمة في القائمة العليا مرجع إلى قائمة أخرى، التي بدورها تحتوي مراجع إلى الكائنات التي تمثّل عناصر المصفوفة.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>row_sums(my_matrix: list)</code>، تأخذ مصفوفة من الأعداد الصحيحة كوسيط لها.</p>
<p>ينبغي للدالة أن تُضيف عنصرًا جديدًا إلى كل صف في المصفوفة. ويحوي هذا العنصر مجموع العناصر الأخرى في ذلك الصف. وليس للدالة قيمة مُعادة، وإنما ينبغي لها أن تُعدّل المصفوفة المُعطاة كوسيط في مكانها.</p>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">my_matrix = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]
row_sums(my_matrix)
<span class="hljs-built_in">print</span>(my_matrix)
</code></pre>
<pre><code>[[1, 2, 3], [3, 4, 7]]
</code></pre>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,l as html,t as slug,o as title};
