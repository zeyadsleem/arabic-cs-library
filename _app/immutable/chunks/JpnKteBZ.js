const s="mooc",n="part-8",a="الجزء 8: الكائنات والصنوف",e="2-classes-and-objects",p="الأصناف والكائنات",t=[{depth:2,id:"الصنف-مخطط-للكائن",text:"الصنف مخطط للكائن"},{depth:2,id:"دوال-تعمل-مع-الكائنات",text:"دوال تعمل مع الكائنات"},{depth:2,id:"التابعات-مقابل-المتغيرات",text:"التابعات مقابل المتغيّرات"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما هو الصنف</li>
<li>ستفهم الصلة بين الصنف والكائن</li>
<li>ستعرف المقصود بالبرمجة الكائنية</li>
</ul>
</blockquote>
<p>في القسم السابق تعاملنا مع القوائم والصفوف والقواميس والسلاسل النصية. وكلها حالات خاصة إلى حد ما في برمجة Python. فبنية Python النحوية تتضمّن طريقة فريدة معرَّفة مسبقًا للإعلان عن كائن ينتمي إلى كل من هذه الأنواع:</p>
<pre><code class="language-python"><span class="hljs-comment"># Lists are declared with square brackets</span>
my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]

<span class="hljs-comment"># Strings are declared with quotation marks</span>
my_string = <span class="hljs-string">&quot;Hi there!&quot;</span>

<span class="hljs-comment"># Dictionaries are declared with curly brackets</span>
my_dict = {<span class="hljs-string">&quot;one&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;two:&quot;</span>: <span class="hljs-number">2</span>}

<span class="hljs-comment"># Tuples are declared with parentheses</span>
my_tuple = (<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)
</code></pre>
<p>وعند الإعلان عن نوع آخر من الكائنات، نحتاج إلى استدعاء دالة تهيئة خاصة تُسمّى <em>الباني</em> (constructor). ولننظر إلى التعامل مع الكسور من خلال الصنف <code>Fraction</code>.</p>
<pre><code class="language-python"><span class="hljs-comment"># we are using the class Fraction from the module fractions</span>
<span class="hljs-keyword">from</span> fractions <span class="hljs-keyword">import</span> Fraction

<span class="hljs-comment"># create some new fractions</span>
half = Fraction(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)

third = Fraction(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)

another = Fraction(<span class="hljs-number">3</span>,<span class="hljs-number">11</span>)

<span class="hljs-comment"># print these out</span>
<span class="hljs-built_in">print</span>(half)
<span class="hljs-built_in">print</span>(third)
<span class="hljs-built_in">print</span>(another)

<span class="hljs-comment"># Fractions can be added together, for example</span>
<span class="hljs-built_in">print</span>(half + third)
</code></pre>
<pre><code>1/2
1/3
3/11
5/6
</code></pre>
<p>كما ترى أعلاه، تبدو استدعاءات تابع الباني مختلفة قليلًا عن استدعاءات التابعات العادية التي صادفناها من قبل. فأولًا، هي غير مرتبطة بأي كائن بصيغة النقطة (إذ إن استدعاء الباني ضروري لإنشاء كائن أصلًا). كما أن اسم تابع الباني يبدأ بحرف كبير: <code>half = Fraction(1,2)</code>. ولننظر عن قرب إلى كيفية بناء الكائنات بأن نألف مفهوم <em>الصنف</em>.</p>
<h2 id="الصنف-مخطط-للكائن">الصنف مخطط للكائن</h2>
<p>لقد استخدمنا مصطلح <em>الصنف</em> في هذه المادة مرات عديدة. فمثلًا، في المثال أعلاه استوردنا الصنف <code>Fraction</code> من الوحدة <code>fractions</code>. وقد أُنشئت كائنات كسور جديدة باستدعاء تابع <em>الباني</em> للصنف <code>Fraction</code>.</p>
<p>ويحوي تعريف الصنف بنية أي كائن يمثّله ووظائفه. ولهذا تُوصف الأصناف أحيانًا بأنها مخططات للكائنات. إذًا، يخبرك تعريف الصنف بنوع البيانات التي يحويها الكائن، ويعرّف أيضًا التابعات التي يمكن استخدامها على الكائن. وتشير <em>البرمجة الكائنية</em> إلى نمط برمجي ترتبط فيه وظائف البرنامج باستخدام الأصناف والكائنات المنشأة بناءً عليها.</p>
<p>ويمكن استخدام تعريف صنف واحد لإنشاء عدة كائنات. وكما ذُكر سابقًا، فالكائنات مستقلة. والتغييرات التي تُجرى في كائن واحد لا تؤثر عمومًا في الكائنات الأخرى التي تمثّل الصنف نفسه. ولكل كائن مجموعته الفريدة من الخصائص البيانية. وقد يكون من المفيد أن تتأمّل هذا التبسيط للعلاقة بين الصنف والكائن:</p>
<ul>
<li>يحدّد الصنف المتغيّرات</li>
<li>عند إنشاء الكائن، تُسنَد قيم إلى تلك المتغيّرات</li>
</ul>
<p>إذًا، يمكننا استخدام كائن من نوع <code>Fraction</code> للوصول إلى بسط عدد كسري ومقامه:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> fractions <span class="hljs-keyword">import</span> Fraction

number = Fraction(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>)

<span class="hljs-comment"># Print the numerator</span>
<span class="hljs-built_in">print</span>(number.numerator)

<span class="hljs-comment"># ...and the denominator</span>
<span class="hljs-built_in">print</span>(number.denominator)
</code></pre>
<pre><code>2
5
</code></pre>
<p>ويحوي تعريف الصنف <code>Fraction</code> إعلانات للمتغيّرين <code>numerator</code> و<code>denominator</code>. ولكل كائن منشأ بناءً على هذا الصنف قيمه الخاصة المسنَدة إلى هذين المتغيّرين.</p>
<p>وبالمثل، يحوي كل كائن منشأ بناءً على الصنف <code>date</code> قيمه الفريدة الخاصة بالسنة والشهر واليوم من التاريخ:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> date

xmas_eve = date(<span class="hljs-number">2020</span>, <span class="hljs-number">12</span>, <span class="hljs-number">24</span>)
midsummer = date(<span class="hljs-number">2020</span>, <span class="hljs-number">6</span>, <span class="hljs-number">20</span>)

<span class="hljs-comment"># print only the month attribute of both objects</span>
<span class="hljs-built_in">print</span>(xmas_eve.month)
<span class="hljs-built_in">print</span>(midsummer.month)
</code></pre>
<pre><code>12
6
</code></pre>
<p>ويحوي تعريف الصنف <code>date</code> إعلانات المتغيّرات <code>year</code> و<code>month</code> و<code>day</code>. وعند إنشاء كائن <code>date</code> جديد بناءً على هذا الصنف، تُسنَد قيم إلى هذه المتغيّرات. ولكل كائن قيمه الفريدة المسنَدة إلى هذه المتغيّرات.</p>
<h2 id="دوال-تعمل-مع-الكائنات">دوال تعمل مع الكائنات</h2>
<p>ينبغي أن يكون تمرير كائن كوسيط إلى دالة مألوفًا لديك الآن، فقد فعلنا ذلك مرات عديدة في هذه الدورة حتى الآن. ولننظر إلى المثال التالي. لدينا هنا دالة تتحقق مما إذا كان كائن <code>date</code> الممرَّر كوسيط يوافق يوم عطلة الأسبوع:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_it_weekend</span>(<span class="hljs-params">my_date: date</span>):
    weekday = my_date.isoweekday()
    <span class="hljs-keyword">return</span> weekday == <span class="hljs-number">6</span> <span class="hljs-keyword">or</span> weekday == <span class="hljs-number">7</span>
</code></pre>
<p>وتستخدم هذه الدالة التابع <a href="https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday">isoweekday</a>، المعرَّف في تعريف الصنف <code>date</code>، وتُعيد قيمة عددية صحيحة، بحيث إذا كان التاريخ المُعطى يوم اثنين أرجعت 1، وإذا كان يوم ثلاثاء أرجعت 2، وهكذا.</p>
<p>ويمكنك استخدام الدالة أعلاه هكذا:</p>
<pre><code class="language-python">xmas_eve = date(<span class="hljs-number">2020</span>, <span class="hljs-number">12</span>, <span class="hljs-number">24</span>)
midsummer = date(<span class="hljs-number">2020</span>, <span class="hljs-number">6</span>, <span class="hljs-number">20</span>)

<span class="hljs-built_in">print</span>(is_it_weekend(xmas_eve))
<span class="hljs-built_in">print</span>(is_it_weekend(midsummer))
</code></pre>
<pre><code>False
True
</code></pre>
<h2 id="التابعات-مقابل-المتغيرات">التابعات مقابل المتغيّرات</h2>
<p>عند التعامل مع كائن من نوع <code>date</code> قد تلاحظ فرقًا بسيطًا بين طريقة الوصول إلى المتغيّرات الموجودة في الكائن، وطريقة استخدام التابعات المرتبطة به:</p>
<pre><code class="language-python">my_date = date(<span class="hljs-number">2020</span>, <span class="hljs-number">12</span>, <span class="hljs-number">24</span>)

<span class="hljs-comment"># calling a method</span>
weekday = my_date.isoweekday()

<span class="hljs-comment"># accessing a variable</span>
my_month = my_date.month

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The day of the week:&quot;</span>, weekday)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The month:&quot;</span>, my_month)
</code></pre>
<pre><code>The day of the week: 4
The month: 12
</code></pre>
<p>ويتوفّر يوم الأسبوع الذي يوافق التاريخ عبر <em>التابع</em> <code>isoweekday</code>:</p>
<pre><code class="language-python">weekday = my_date.isoweekday()
</code></pre>
<p>وهذا استدعاء تابع، لذا توجد أقواس بعد اسم التابع. وترك الأقواس لا يسبّب خطأً، لكن النتائج تكون غريبة:</p>
<pre><code class="language-python">weekday =  my_date.isoweekday
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The day of the week:&quot;</span>, weekday)
</code></pre>
<pre><code>The day of the week: &lt;built-in method isoweekday of datetime.date object at 0x10ed66450&gt;
</code></pre>
<p>أما شهر كائن <code>date</code> فهو متغيّر، لذا يمكن الوصول إلى القيمة المرتبطة به بـ_مرجع_.</p>
<pre><code class="language-python">my_month = my_date.month
</code></pre>
<p>لاحظ أنه <em>لا توجد أقواس</em> هنا. وإضافة الأقواس <em>ستسبّب</em> خطأً:</p>
<pre><code class="language-python">my_month = my_date.month()
</code></pre>
<pre><code>Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;
TypeError: 'int' object is not callable
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: قائمة السنوات</strong></p>
<p>يُرجى كتابة دالة اسمها <code>list_years(dates: list)</code> تأخذ قائمة من الكائنات من نوع <code>date</code> كوسيط لها. وينبغي للدالة أن تُرجع قائمة جديدة تحوي <em>السنوات الموجودة في القائمة الأصلية بترتيب زمني</em>، من الأقدم إلى الأحدث.</p>
</blockquote>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">date1 = date(<span class="hljs-number">2019</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
date2 = date(<span class="hljs-number">2006</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>)
date3 = date(<span class="hljs-number">1993</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>)

years = list_years([date1, date2, date3])
<span class="hljs-built_in">print</span>(years)
</code></pre>
<pre><code>[1993, 2006, 2019]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: قائمة التسوق</strong> <span class="content-anchor" id="programming-exercise-shopping-list"></span></p>
<p>يحوي قالب التمرين صنفًا معرَّفًا مسبقًا هو <code>ShoppingList</code>، ويمكن استخدامه لنمذجة قائمة تسوّق. ومهمتك أن تضيف تابعًا إلى تعريف الصنف. ولا حاجة إلى تغيير أي تابعات معرَّفة أصلًا.</p>
</blockquote>
<p>بافتراض أن لدينا كائن <code>ShoppingList</code> مشارًا إليه في متغيّر اسمه <code>shopping_list</code>، فيمكن التعامل مع الكائن بالتابعات التالية:</p>
<pre><code class="language-python">
<span class="hljs-built_in">print</span>(shopping_list.number_of_items())
<span class="hljs-built_in">print</span>(shopping_list.item(<span class="hljs-number">1</span>))
<span class="hljs-built_in">print</span>(shopping_list.amount(<span class="hljs-number">1</span>))
<span class="hljs-built_in">print</span>(shopping_list.item(<span class="hljs-number">2</span>))
<span class="hljs-built_in">print</span>(shopping_list.amount(<span class="hljs-number">2</span>))

</code></pre>
<pre><code>2
Bananas
4
Milk
1
</code></pre>
<p>ويمكننا أيضًا فعل هذا:</p>
<pre><code class="language-python"><span class="hljs-comment"># the items on the shopping list are indexed from 1</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, shopping_list.number_of_items()+<span class="hljs-number">1</span>):
    item = shopping_list.item(i)
    amount = shopping_list.amount(i)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{item}</span>: <span class="hljs-subst">{amount}</span> units&quot;</span>)
</code></pre>
<pre><code>Bananas 4 units
Milk 1 units
</code></pre>
<p>وكما ترى، يعمل <code>ShoppingList</code> قليلًا مثل قائمة عادية، لكن يُوصَل إليه عبر التابعات التي يوفّرها الصنف ShoppingList. وخلافًا لقوائم Python العادية، تبدأ الفهرسة من 1 لا من 0.</p>
<p>يُرجى كتابة دالة اسمها <code>total_units(my_list: ShoppingList)</code>، تأخذ كائنًا من نوع <code>ShoppingList</code> كوسيط لها. وينبغي للدالة أن تحسب مجموع الوحدات المدرجة، وتُرجع القيمة.</p>
<p>ويمكنك استخدام الشيفرة التالية لاختبار دالتك:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    my_list = ShoppingList()
    my_list.add(<span class="hljs-string">&quot;bananas&quot;</span>, <span class="hljs-number">10</span>)
    my_list.add(<span class="hljs-string">&quot;apples&quot;</span>, <span class="hljs-number">5</span>)
    my_list.add(<span class="hljs-string">&quot;pineapple&quot;</span>, <span class="hljs-number">1</span>)

    <span class="hljs-built_in">print</span>(total_units(my_list))
</code></pre>
<pre><code>16
</code></pre>
<p><strong>ملاحظة:</strong> تعريف الصنف <code>ShoppingList</code> مُضمَّن أصلًا في قالب التمرين. ولا حاجة إلى استخدام أمر <code>import</code> لاستيراده، خلافًا لما في الأمثلة أعلاه مع صنفَي المكتبة القياسية في Python وهما <code>Fraction</code> و<code>date</code>.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
