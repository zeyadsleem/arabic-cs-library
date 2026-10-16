const s="mooc",n="part-12",a="الجزء 12: البرمجة الدالية",p="1-functions-as-arguments",l="الدوال كوسائط",e=[{depth:2,id:"الدوال-كوسائط",text:"الدوال كوسائط"},{depth:2,id:"تعريف-دالة-داخل-تعريف-دالة",text:"تعريف دالة داخل تعريف دالة"},{depth:2,id:"ترتيب-مجموعات-كائناتك-الخاصة",text:"ترتيب مجموعات كائناتك الخاصة"},{depth:2,id:"الترتيب-حسب-الطول",text:"الترتيب حسب الطول"},{depth:2,id:"الترتيب-حسب-الصعوبة",text:"الترتيب حسب الصعوبة"},{depth:2,id:"الترتيب-حسب-عدد-المسارات",text:"الترتيب حسب عدد المسارات"},{depth:2,id:"الترتيب-حسب-أصعب-مسار",text:"الترتيب حسب أصعب مسار"},{depth:2,id:"تعبيرات-lambda",text:"تعبيرات lambda"},{depth:2,id:"الأكثر-أهدافا",text:"الأكثر أهدافًا"},{depth:2,id:"الأكثر-نقاطا",text:"الأكثر نقاطًا"},{depth:2,id:"الأقل-دقائق",text:"الأقل دقائق"},{depth:2,id:"الدوال-كوسائط-داخل-دوالك-الخاصة",text:"الدوال كوسائط داخل دوالك الخاصة"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على ترتيب القوائم وفق معايير مختلفة</li>
<li>ستعرف ما هو تعبير lambda</li>
<li>ستكون قادرًا على استخدام تعبير lambda مع دوال Python الأخرى</li>
<li>ستعرف كيف تُمرَّر دالة كوسيط إلى دالة أخرى</li>
</ul>
</blockquote>
<p>نحن نعرف بالفعل التابع <code>sort</code> والدالة <code>sorted</code>، اللذين يُستخدمان لترتيب القوائم وفق ترتيبها الطبيعي. وبالنسبة إلى الأعداد والسلاسل النصية يعمل هذا على ما يرام عادةً. أما فيما هو أعقد من ذلك، فالترتيب الذي تعتبره Python الترتيب الطبيعي للعناصر ليس دائمًا هو ما نقصده نحن كمبرمجين.</p>
<p>مثلًا، تُرتَّب قائمة الصفوف افتراضيًا بناءً على العنصر الأول في كل صف:</p>
<pre><code class="language-python">products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>)]

products.sort()

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> products:
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>('apple', 3.95)
('banana', 5.95)
('orange', 4.5)
('watermelon', 4.95)
</code></pre>
<p>لكن ماذا لو أردنا ترتيب القائمة بناءً على السعر؟</p>
<h2 id="الدوال-كوسائط">الدوال كوسائط</h2>
<p>يقبل تابع الترتيب أو دالته عادةً وسيطًا ثانيًا اختياريًا يتيح لك تجاوز معايير الترتيب الافتراضية. وهذا الوسيط الثاني دالة تحدّد كيف تُحسب قيمة كل عنصر في القائمة. وأثناء ترتيب القائمة تستدعي Python هذه الدالة عندما تقارن العناصر بعضها ببعض.</p>
<p>لننظر إلى مثال:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">order_by_price</span>(<span class="hljs-params">item: <span class="hljs-built_in">tuple</span></span>):
    <span class="hljs-comment"># Return the price, which is the second item within the tuple</span>
    <span class="hljs-keyword">return</span> item[<span class="hljs-number">1</span>]

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>)]

    <span class="hljs-comment"># Use the function order_by_price for sorting</span>
    products.sort(key=order_by_price)

    <span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> products:
        <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
</code></pre>
<p>الآن أُرتّبت القائمة بناءً على أسعار العناصر، لكن ما الذي يحدث فعليًا في البرنامج؟</p>
<p>الدالة <code>order_by_price</code> بسيطة في الواقع. فهي تأخذ عنصرًا واحدًا كوسيط لها وتعيد قيمة لذلك العنصر. وبشكل أكثر تحديدًا، تعيد العنصر الثاني في الصف، وهو الذي يمثّل السعر. لكن بعد ذلك لدينا سطر الشيفرة هذا، حيث يُستدعى التابع <code>sort</code>:</p>
<p><code>products.sort(key=order_by_price)</code></p>
<p>هنا يُستدعى التابع <code>sort</code> بدالة كوسيط له. وليس هذا إشارة إلى القيمة التي تعيدها الدالة، بل إشارة إلى <em>الدالة نفسها</em>. ويستدعي التابع <code>sort</code> هذه الدالة مرات عديدة، مستخدمًا كل عنصر في القائمة كوسيط له بالتناوب.</p>
<p>إذا أضفنا أمر <code>print</code> إضافيًا إلى تعريف الدالة <code>order_by_price</code>، فيمكننا التحقق من أن الدالة تُستدعى فعلًا مرة واحدة مقابل كل عنصر في القائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">order_by_price</span>(<span class="hljs-params">item: <span class="hljs-built_in">tuple</span></span>):
    <span class="hljs-comment"># Print the item</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Function call: order_by_price(<span class="hljs-subst">{item}</span>)&quot;</span>)

    <span class="hljs-comment"># Return the price, which is the second item within the tuple</span>
    <span class="hljs-keyword">return</span> item[<span class="hljs-number">1</span>]


products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>)]

<span class="hljs-comment"># Use the function order_by_price for sorting</span>
products.sort(key=order_by_price)

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> products:
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
</code></pre>
<p>ويمكن <em>عكس</em> الترتيب بوسيط مسمّى آخر؛ وهو <code>reverse</code>، المتاح مع كلٍّ من التابع <code>sort</code> والدالة <code>sorted</code>:</p>
<pre><code class="language-python">products.sort(key=order_by_price, reverse=<span class="hljs-literal">True</span>)

t2 = <span class="hljs-built_in">sorted</span>(products, key=order_by_price, reverse=<span class="hljs-literal">True</span>)
</code></pre>
<h2 id="تعريف-دالة-داخل-تعريف-دالة">تعريف دالة داخل تعريف دالة</h2>
<p>يمكننا أيضًا أن نضيف دالة مسمّاة لوظيفة الترتيب الجديدة القائمة على السعر التي أنشأناها. لنضف دالة اسمها <code>sort_by_price</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">order_by_price</span>(<span class="hljs-params">item: <span class="hljs-built_in">tuple</span></span>):
    <span class="hljs-keyword">return</span> item[<span class="hljs-number">1</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">sort_by_price</span>(<span class="hljs-params">items: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># use the order_by_price function here</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sorted</span>(items, key=order_by_price)

products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>)]

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> sort_by_price(products):
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<p>إذا علمنا أن الدالة المساعدة <code>order_by_price</code> لا تُستخدم في أي مكان خارج الدالة <code>sort_by_price</code>، فيمكننا وضع تعريف الدالة الأولى داخل تعريف الدالة الثانية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sort_by_price</span>(<span class="hljs-params">items: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># helper function defined within the function</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">order_by_price</span>(<span class="hljs-params">item: <span class="hljs-built_in">tuple</span></span>):
        <span class="hljs-keyword">return</span> item[<span class="hljs-number">1</span>]

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sorted</span>(items, key=order_by_price)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الترتيب حسب المخزون المتبقي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>sort_by_remaining_stock(items: list)</code>. تأخذ الدالة قائمة صفوف كوسيط لها. وتتكوّن الصفوف من اسم المنتج وسعره ومخزونه المتبقي. وينبغي أن تعيد الدالة قائمة جديدة تُرتَّب فيها العناصر وفق المخزون المتبقي، بدءًا من القيمة الأصغر. ولا ينبغي تغيير القائمة الأصلية.</p>
</blockquote>
<p>ينبغي أن تعمل الدالة هكذا:</p>
<pre><code class="language-python">products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>, <span class="hljs-number">12</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>, <span class="hljs-number">3</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>, <span class="hljs-number">2</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>, <span class="hljs-number">22</span>)]

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> sort_by_remaining_stock(products):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{product[<span class="hljs-number">0</span>]}</span> <span class="hljs-subst">{product[<span class="hljs-number">2</span>]}</span> pcs&quot;</span>)
</code></pre>
<pre><code>orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الترتيب حسب عدد المواسم</strong></p>
<p>يُرجى كتابة دالة اسمها <code>sort_by_seasons(items: list)</code> تأخذ قائمة قواميس كوسيط لها. ويحتوي كل قاموس على معلومات برنامج تلفزيوني واحد. وينبغي أن ترتّب الدالة هذه القائمة وفق عدد المواسم التي يضمّها كل برنامج، ترتيبًا تصاعديًا. ولا ينبغي أن تغيّر الدالة القائمة الأصلية، بل أن تعيد قائمة جديدة بدلًا منها.</p>
</blockquote>
<p>ينبغي أن تعمل الدالة هكذا:</p>
<pre><code class="language-python">shows = [{ <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Dexter&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.6</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">9</span> }, { <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Friends&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.9</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">10</span> },  { <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Simpsons&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.7</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">32</span> }  ]

<span class="hljs-keyword">for</span> show <span class="hljs-keyword">in</span> sort_by_seasons(shows):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{show[<span class="hljs-string">&#x27;name&#x27;</span>]}</span> <span class="hljs-subst">{show[<span class="hljs-string">&#x27;seasons&#x27;</span>]}</span> seasons&quot;</span>)
</code></pre>
<pre><code>Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الترتيب حسب التقييمات</strong></p>
<p>يُرجى كتابة دالة اسمها <code>sort_by_ratings(items: list)</code> تأخذ قائمة قواميس كوسيط لها. وبنية القواميس مطابقة للتمرين السابق. وينبغي أن ترتّب هذه الدالة القواميس <em>ترتيبًا تنازليًا بناءً على تقييمات البرامج</em>. ولا ينبغي أن تغيّر الدالة القائمة الأصلية، بل أن تعيد قائمة جديدة بدلًا منها.</p>
</blockquote>
<pre><code class="language-python">shows = [{ <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Dexter&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.6</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">9</span> }, { <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Friends&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.9</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">10</span> },  { <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Simpsons&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> : <span class="hljs-number">8.7</span>, <span class="hljs-string">&quot;seasons&quot;</span>:<span class="hljs-number">32</span> }  ]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Rating according to IMDB&quot;</span>)
<span class="hljs-keyword">for</span> show <span class="hljs-keyword">in</span> sort_by_ratings(shows):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{show[<span class="hljs-string">&#x27;name&#x27;</span>]}</span>  <span class="hljs-subst">{show[<span class="hljs-string">&#x27;rating&#x27;</span>]}</span>&quot;</span>)
</code></pre>
<pre><code>Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6
</code></pre>
<h2 id="ترتيب-مجموعات-كائناتك-الخاصة">ترتيب مجموعات كائناتك الخاصة</h2>
<p>وباستخدام المبدأ نفسه، لنكتب برنامجًا يرتّب قائمة كائنات من صنف <code>Student</code> الخاص بنا بطريقتين مختلفتين:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class models a single student &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, <span class="hljs-built_in">id</span>: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">id</span> = <span class="hljs-built_in">id</span>
        <span class="hljs-variable language_">self</span>.credits = credits

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.<span class="hljs-built_in">id</span>}</span>), <span class="hljs-subst">{self.credits}</span> cr.&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">by_id</span>(<span class="hljs-params">item: Student</span>):
    <span class="hljs-keyword">return</span> item.<span class="hljs-built_in">id</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">by_credits</span>(<span class="hljs-params">item: Student</span>):
    <span class="hljs-keyword">return</span> item.credits


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    o1 = Student(<span class="hljs-string">&quot;Archie&quot;</span>, <span class="hljs-string">&quot;a123&quot;</span>, <span class="hljs-number">220</span>)
    o2 = Student(<span class="hljs-string">&quot;Marvin&quot;</span>, <span class="hljs-string">&quot;m321&quot;</span>, <span class="hljs-number">210</span>)
    o3 = Student(<span class="hljs-string">&quot;Anna&quot;</span>, <span class="hljs-string">&quot;a999&quot;</span>, <span class="hljs-number">131</span>)

    students = [o1, o2, o3]

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sort by id:&quot;</span>)
    <span class="hljs-keyword">for</span> student <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(students, key=by_id):
        <span class="hljs-built_in">print</span>(student)

    <span class="hljs-built_in">print</span>()

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sort by credits:&quot;</span>)
    <span class="hljs-keyword">for</span> student <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(students, key=by_credits):
        <span class="hljs-built_in">print</span>(student)
</code></pre>
<pre><code>Sort by id:
Archie (a123), 220 cr.
Anna (a999), 131 cr.
Marvin (m321), 210 cr.

Sort by credits:
Anna (a999), 131 cr.
Marvin (m321), 210 cr.
Archie (a123), 220 cr.
</code></pre>
<p>كما ترى أعلاه، يعمل الترتيب وفق معايير مختلفة تمامًا كما هو مقصود. وإذا لم تكن الدالتان <code>by_id</code> و<code>by_credits</code> مطلوبتين في مكان آخر، فهناك طرق لجعل التنفيذ أبسط. وسنعود إلى هذا الموضوع بعد هذه التمارين.</p>
<blockquote>
<p><strong>تمرين برمجي: ClimbingRoute</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>ClimbingRoute</code>. وهو يعمل هكذا:</p>
</blockquote>
<pre><code class="language-python">route1 = ClimbingRoute(<span class="hljs-string">&quot;Edge&quot;</span>, <span class="hljs-number">38</span>, <span class="hljs-string">&quot;6A+&quot;</span>)
route2 = ClimbingRoute(<span class="hljs-string">&quot;Smooth operator&quot;</span>, <span class="hljs-number">11</span>, <span class="hljs-string">&quot;7A&quot;</span>)
route3 = ClimbingRoute(<span class="hljs-string">&quot;Synchro&quot;</span>, <span class="hljs-number">14</span>, <span class="hljs-string">&quot;8C+&quot;</span>)


<span class="hljs-built_in">print</span>(route1)
<span class="hljs-built_in">print</span>(route2)
<span class="hljs-built_in">print</span>(route3.name, route3.length, route3.grade)
</code></pre>
<pre><code>Edge, length 38 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
Synchro 14 8C+
</code></pre>
<h2 id="الترتيب-حسب-الطول">الترتيب حسب الطول</h2>
<p>يُرجى كتابة دالة اسمها <code>sort_by_length(routes: list)</code> تعيد قائمة جديدة من المسارات، مرتّبة حسب الطول من الأطول إلى الأقصر.</p>
<p>ينبغي أن تعمل الدالة هكذا:</p>
<pre><code class="language-python">r1 = ClimbingRoute(<span class="hljs-string">&quot;Edge&quot;</span>, <span class="hljs-number">38</span>, <span class="hljs-string">&quot;6A+&quot;</span>)
r2 = ClimbingRoute(<span class="hljs-string">&quot;Smooth operator&quot;</span>, <span class="hljs-number">11</span>, <span class="hljs-string">&quot;7A&quot;</span>)
r3 = ClimbingRoute(<span class="hljs-string">&quot;Synchro&quot;</span>, <span class="hljs-number">14</span>, <span class="hljs-string">&quot;8C+&quot;</span>)
r4 = ClimbingRoute(<span class="hljs-string">&quot;Small steps&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-string">&quot;6A+&quot;</span>)

routes = [r1, r2, r3, r4]

<span class="hljs-keyword">for</span> route <span class="hljs-keyword">in</span> sort_by_length(routes):
    <span class="hljs-built_in">print</span>(route)
</code></pre>
<pre><code>Edge, length 38 metres, grade 6A+
Synchro, length 14 metres, grade 8C+
Small steps, length 12 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
</code></pre>
<h2 id="الترتيب-حسب-الصعوبة">الترتيب حسب الصعوبة</h2>
<p>يُرجى كتابة دالة اسمها <code>sort_by_difficulty(routes: list)</code> تعيد قائمة جديدة من المسارات، مرتّبة حسب الصعوبة، أي حسب الدرجة، من الأصعب إلى الأسهل. وبالنسبة إلى المسارات ذات الدرجة نفسها، يكون الأطول أصعب. وتدرّج درجات مسارات التسلّق هو <em>4, 4+, 5, 5+, 6A, 6A+, ...</em>، وهو ما يعادل عمليًا الترتيب الأبجدي للسلاسل النصية.</p>
<p>ينبغي أن تعمل الدالة هكذا:</p>
<pre><code class="language-python">r1 = ClimbingRoute(<span class="hljs-string">&quot;Edge&quot;</span>, <span class="hljs-number">38</span>, <span class="hljs-string">&quot;6A+&quot;</span>)
r2 = ClimbingRoute(<span class="hljs-string">&quot;Smooth operator&quot;</span>, <span class="hljs-number">11</span>, <span class="hljs-string">&quot;7A&quot;</span>)
r3 = ClimbingRoute(<span class="hljs-string">&quot;Synchro&quot;</span>, <span class="hljs-number">14</span>, <span class="hljs-string">&quot;8C+&quot;</span>)
r4 = ClimbingRoute(<span class="hljs-string">&quot;Small steps&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-string">&quot;6A+&quot;</span>)

routes = [r1, r2, r3, r4]
<span class="hljs-keyword">for</span> route <span class="hljs-keyword">in</span> sort_by_difficulty(routes):
    <span class="hljs-built_in">print</span>(route)
</code></pre>
<pre><code>Synchro, length 14 metres, grade 8C+
Smooth operator, length 11 metres, grade 7A
Edge, length 38 metres, grade 6A+
Small steps, length 12 metres, grade 6A+
</code></pre>
<p><strong>تلميح:</strong> إذا كان الترتيب مبنيًا على قائمة أو صف، فإن Python ترتّب العناصر افتراضيًا أولًا بناءً على العنصر الأول، ثم بناءً على العنصر الثاني، وهكذا:</p>
<pre><code class="language-python">my_list = [(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-number">4</span>),(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-number">2</span>),(<span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-number">30</span>), (<span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-number">0</span>) ]
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">sorted</span>(my_list))
</code></pre>
<pre><code>[('a', 2), ('a', 4), ('b', 0), ('b', 30)]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مناطق التسلّق</strong></p>
<p>بالإضافة إلى الصنف <code>ClimbingRoute</code> من التمرين السابق، يحتوي قالب التمرين على تعريف صنف <code>ClimbingArea</code>.</p>
</blockquote>
<pre><code class="language-python">ca1 = ClimbingArea(<span class="hljs-string">&quot;Olhava&quot;</span>)
ca1.add_route(ClimbingRoute(<span class="hljs-string">&quot;Edge&quot;</span>, <span class="hljs-number">38</span>, <span class="hljs-string">&quot;6A+&quot;</span>))
ca1.add_route(ClimbingRoute(<span class="hljs-string">&quot;Great cut&quot;</span>, <span class="hljs-number">36</span>, <span class="hljs-string">&quot;6B&quot;</span>))
ca1.add_route(ClimbingRoute(<span class="hljs-string">&quot;Swedish route&quot;</span>, <span class="hljs-number">42</span>, <span class="hljs-string">&quot;5+&quot;</span>))

ca2 = ClimbingArea(<span class="hljs-string">&quot;Nummi&quot;</span>)
ca2.add_route(ClimbingRoute(<span class="hljs-string">&quot;Synchro&quot;</span>, <span class="hljs-number">14</span>, <span class="hljs-string">&quot;8C+&quot;</span>))

ca3 = ClimbingArea(<span class="hljs-string">&quot;Nalkkila slab&quot;</span>)
ca3.add_route(ClimbingRoute(<span class="hljs-string">&quot;Small steps&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-string">&quot;6A+&quot;</span>))
ca3.add_route(ClimbingRoute(<span class="hljs-string">&quot;Smooth operator&quot;</span>, <span class="hljs-number">11</span>, <span class="hljs-string">&quot;7A&quot;</span>))
ca3.add_route(ClimbingRoute(<span class="hljs-string">&quot;Piggy not likey&quot;</span>, <span class="hljs-number">12</span> , <span class="hljs-string">&quot;6B+&quot;</span>))
ca3.add_route(ClimbingRoute(<span class="hljs-string">&quot;Orchard&quot;</span>, <span class="hljs-number">8</span>, <span class="hljs-string">&quot;6A&quot;</span>))

<span class="hljs-built_in">print</span>(ca1)
<span class="hljs-built_in">print</span>(ca3.name, ca3.routes())
<span class="hljs-built_in">print</span>(ca3.hardest_route())
</code></pre>
<pre><code>Olhava, 3 routes, hardest 6B
Nalkkila slab 4
Smooth operator, length 9 metres, grade 7A
</code></pre>
<h2 id="الترتيب-حسب-عدد-المسارات">الترتيب حسب عدد المسارات</h2>
<p>يُرجى كتابة دالة اسمها <code>sort_by_number_of_routes</code> ترتّب مناطق التسلّق ترتيبًا تصاعديًا بناءً على عدد المسارات في كل منها.</p>
<pre><code class="language-python"><span class="hljs-comment"># ca1, ca2 and ca3 declared as above</span>
areas = [ca1, ca2, ca3]
<span class="hljs-keyword">for</span> area <span class="hljs-keyword">in</span> sort_by_number_of_routes(areas):
    <span class="hljs-built_in">print</span>(area)

</code></pre>
<pre><code>Nummi, 1 routes, hardest 8C+
Olhava, 3 routes, hardest 6B
Nalkkila slab, 4 routes, hardest 7A
</code></pre>
<h2 id="الترتيب-حسب-أصعب-مسار">الترتيب حسب أصعب مسار</h2>
<p>يُرجى كتابة دالة اسمها <code>sort_by_most_difficult</code> ترتّب مناطق التسلّق ترتيبًا <em>تنازليًا</em> بناءً على أصعب مسار في كل منطقة.</p>
<pre><code class="language-python"><span class="hljs-comment"># ca1, ca2 and ca3 declared as above</span>
areas = [ca1, ca2, ca3]
<span class="hljs-keyword">for</span> area <span class="hljs-keyword">in</span> sort_by_most_difficult(areas):
    <span class="hljs-built_in">print</span>(area)
</code></pre>
<pre><code>Nummi, 1 routes, hardest 8C+
Nalkkila slab, 4 routes, hardest 7A
Olhava, 3 routes, hardest 6B
</code></pre>
<h2 id="تعبيرات-lambda">تعبيرات lambda</h2>
<p>لقد تعاملنا مع الدوال في معظم الأحيان من منظور التقسيم إلى وحدات. وصحيح أن للدوال دورًا مهمًا في إدارة تعقيد برامجك وتجنّب تكرار الشيفرة. وتُكتب الدوال عادةً بحيث يمكن استخدامها مرات عديدة.</p>
<p>لكنك تحتاج أحيانًا إلى شيء يشبه الدالة تستخدمه مرة واحدة فقط. وتتيح لك تعبيرات lambda إنشاء دوال صغيرة مجهولة تُنشأ (وتُهمَل) عند الحاجة إليها في الشيفرة. والصيغة العامة هي كما يلي:</p>
<p><code>lambda &lt;parameters&gt; : &lt;expression&gt;</code></p>
<p>ترتيب قائمة صفوف حسب العنصر الثاني في كل صف سيبدو هكذا عند تنفيذه بتعبير lambda:</p>
<pre><code class="language-python">products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>)]

<span class="hljs-comment"># Function is created &quot;on the fly&quot; with a lambda expression:</span>
products.sort(key=<span class="hljs-keyword">lambda</span> item: item[<span class="hljs-number">1</span>])

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> products:
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
</code></pre>
<p>التعبير</p>
<p><code>lambda item: item[1]</code></p>
<p>مكافئ لتعريف الدالة</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">price</span>(<span class="hljs-params">item</span>):
    <span class="hljs-keyword">return</span> item[<span class="hljs-number">1</span>]
</code></pre>
<p>إلا أن دالة lambda لا تملك اسمًا. ولهذا تُسمّى دوال lambda الدوال المجهولة.</p>
<p>ومن كل ناحية أخرى لا تختلف دالة lambda عن أي دالة أخرى، ويمكن استخدامها في السياقات جميعها التي تُستخدم فيها أي دالة مسمّاة مكافئة. فمثلًا، يرتّب البرنامج التالي قائمة سلاسل نصية أبجديًا حسب المحرف <em>الأخير</em> في كل سلسلة نصية:</p>
<pre><code class="language-python">strings = [<span class="hljs-string">&quot;Mickey&quot;</span>, <span class="hljs-string">&quot;Mack&quot;</span>, <span class="hljs-string">&quot;Marvin&quot;</span>, <span class="hljs-string">&quot;Minnie&quot;</span>, <span class="hljs-string">&quot;Merl&quot;</span>]

<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(strings, key=<span class="hljs-keyword">lambda</span> word: word[-<span class="hljs-number">1</span>]):
    <span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>Minnie
Mack
Merl
Marvin
Mickey
</code></pre>
<p>يمكننا أيضًا الجمع بين إدراكات القوائم والتابع <code>join</code> وتعبيرات lambda. فمثلًا، يمكننا ترتيب السلاسل النصية بناءً على حروف العلة فيها فقط، مع تجاهل كل المحارف الأخرى:</p>
<pre><code class="language-python">strings = [<span class="hljs-string">&quot;Mickey&quot;</span>, <span class="hljs-string">&quot;Mack&quot;</span>, <span class="hljs-string">&quot;Marvin&quot;</span>, <span class="hljs-string">&quot;Minnie&quot;</span>, <span class="hljs-string">&quot;Merl&quot;</span>]

<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(strings, key=<span class="hljs-keyword">lambda</span> word: <span class="hljs-string">&quot;&quot;</span>.join([c <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> word <span class="hljs-keyword">if</span> c <span class="hljs-keyword">in</span> <span class="hljs-string">&quot;aeiou&quot;</span>])):
    <span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>Mack
Marvin
Merl
Mickey
Minnie
</code></pre>
<p>يمكن أيضًا استخدام الدوال المجهولة مع دوال Python المدمجة الأخرى، وليس فقط مع الدوال المستخدمة في الترتيب. فمثلًا، تأخذ الدالتان <code>min</code> و<code>max</code> أيضًا وسيطًا مسمّى اسمه <code>key</code>. ويُستخدم كمعيار لمقارنة العناصر عند اختيار القيمة الصغرى أو العظمى.</p>
<p>في المثال التالي نتعامل مع تسجيلات صوتية. أولًا نختار أقدم تسجيل، ثم الأطول:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Recording</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class models a single audio recording &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, performer: <span class="hljs-built_in">str</span>, year: <span class="hljs-built_in">int</span>, runtime: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.performer = performer
        <span class="hljs-variable language_">self</span>.year = year
        <span class="hljs-variable language_">self</span>.runtime = runtime


    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.performer}</span>), <span class="hljs-subst">{self.year}</span>. <span class="hljs-subst">{self.runtime}</span> min.&quot;</span>

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    r1 = Recording(<span class="hljs-string">&quot;Nevermind&quot;</span>, <span class="hljs-string">&quot;Nirvana&quot;</span>, <span class="hljs-number">1991</span>, <span class="hljs-number">43</span>)
    r2 = Recording(<span class="hljs-string">&quot;Let It Be&quot;</span>, <span class="hljs-string">&quot;Beatles&quot;</span>, <span class="hljs-number">1969</span>, <span class="hljs-number">35</span>)
    r3 = Recording(<span class="hljs-string">&quot;Joshua Tree&quot;</span>, <span class="hljs-string">&quot;U2&quot;</span>, <span class="hljs-number">1986</span>, <span class="hljs-number">50</span>)

    recordings = [r1, r2, r3]


    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The oldest recording:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">min</span>(recordings, key=<span class="hljs-keyword">lambda</span> rec: rec.year))

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The longest recording:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">max</span>(recordings, key=<span class="hljs-keyword">lambda</span> rec: rec.runtime))
</code></pre>
<pre><code>The oldest recording:
Let It Be (Beatles), 1969. 35 min.
The longest recording:
U2 (Joshua Tree), 1986. 50 min.
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: BallPlayers</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف اسمه <code>BallPlayer</code>. وله الخواص العامة التالية:</p>
</blockquote>
<ul>
<li>الاسم</li>
<li>رقم القميص <code>number</code></li>
<li>الأهداف المسجّلة <code>goals</code></li>
<li>التمريرات الحاسمة المكتملة <code>assists</code></li>
<li>الدقائق الملعوبة <code>minutes</code></li>
</ul>
<p>يُرجى تنفيذ الدوال التالية. ملاحظة: لكل دالة نوع مختلف من القيم المُعادة.</p>
<h2 id="الأكثر-أهدافا">الأكثر أهدافًا</h2>
<p>يُرجى كتابة دالة اسمها <code>most_goals</code> تأخذ قائمة لاعبي كرة كوسيط لها.</p>
<p>ينبغي أن تعيد الدالة اسم اللاعب الذي سجّل أكثر عدد من الأهداف، بصيغة سلسلة نصية.</p>
<h2 id="الأكثر-نقاطا">الأكثر نقاطًا</h2>
<p>يُرجى كتابة دالة اسمها <code>most_points</code> تأخذ قائمة لاعبي كرة كوسيط لها.</p>
<p>ينبغي أن تعيد الدالة صفًا يحتوي على اسم اللاعب ورقم قميصه الذي سجّل أكثر عدد من النقاط. والعدد الإجمالي للنقاط هو مجموع عدد الأهداف وعدد التمريرات الحاسمة.</p>
<h2 id="الأقل-دقائق">الأقل دقائق</h2>
<p>يُرجى كتابة دالة اسمها <code>least_minutes</code> تأخذ قائمة لاعبي كرة كوسيط لها.</p>
<p>ينبغي أن تعيد الدالة كائن <code>BallPlayer</code> الذي له أصغر قيمة من الدقائق الملعوبة.</p>
<p>يمكنك اختبار دوالك بالبرنامج التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    player1 = BallPlayer(<span class="hljs-string">&quot;Archie Bonkers&quot;</span>, <span class="hljs-number">13</span>, <span class="hljs-number">5</span>, <span class="hljs-number">12</span>, <span class="hljs-number">46</span>)
    player2 = BallPlayer(<span class="hljs-string">&quot;Speedy Tickets&quot;</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">26</span>, <span class="hljs-number">55</span>)
    player3 = BallPlayer(<span class="hljs-string">&quot;Cruella De Hill&quot;</span>, <span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">32</span>, <span class="hljs-number">26</span>)
    player4 = BallPlayer(<span class="hljs-string">&quot;Devilled Tasmanian&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1</span>, <span class="hljs-number">11</span>, <span class="hljs-number">41</span>)
    player5 = BallPlayer(<span class="hljs-string">&quot;Donald Quack&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">12</span>)
    
    team = [player1, player2, player3, player4, player5]
    <span class="hljs-built_in">print</span>(most_goals(team))
    <span class="hljs-built_in">print</span>(most_points(team))
    <span class="hljs-built_in">print</span>(least_minutes(team))
</code></pre>
<p>سيطبع هذا ما يلي:</p>
<pre><code>Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, passes=9, minutes=12)
</code></pre>
<h2 id="الدوال-كوسائط-داخل-دوالك-الخاصة">الدوال كوسائط داخل دوالك الخاصة</h2>
<p>أثبتنا أعلاه أنه يمكن تمرير إشارة إلى دالة كوسيط إلى دالة أخرى. ولنختم هذا القسم بكتابة دالتنا الخاصة التي تأخذ دالة كوسيط لها.</p>
<pre><code class="language-python"><span class="hljs-comment"># the type hint &quot;callable&quot; refers to a function</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_operation</span>(<span class="hljs-params">operation: <span class="hljs-built_in">callable</span></span>):
    <span class="hljs-comment"># Call the function which was passed as an argument</span>
    <span class="hljs-keyword">return</span> operation(<span class="hljs-number">10</span>, <span class="hljs-number">5</span>)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">my_sum</span>(<span class="hljs-params">a: <span class="hljs-built_in">int</span>, b: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">return</span> a + b

<span class="hljs-keyword">def</span> <span class="hljs-title function_">my_product</span>(<span class="hljs-params">a: <span class="hljs-built_in">int</span>, b: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">return</span> a * b


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-built_in">print</span>(perform_operation(my_sum))
    <span class="hljs-built_in">print</span>(perform_operation(my_product))
    <span class="hljs-built_in">print</span>(perform_operation(<span class="hljs-keyword">lambda</span> x,y: x - y))

</code></pre>
<pre><code>15
50
5
</code></pre>
<p>تعتمد القيمة التي تعيدها الدالة <code>perform_operation</code> على الدالة التي مُرّرت كوسيط. وأي دالة تقبل وسيطين ستفي بالغرض، سواء كانت مجهولة أو مسمّاة.</p>
<p>قد لا يكون تمرير إشارات إلى دوال كوسائط إلى دوال أخرى شيئًا ستفعله يوميًا في مسيرتك البرمجية، لكنه قد يكون تقنية مفيدة. ويختار البرنامج التالي بعض الأسطر من ملف ويكتبها في ملف آخر. وتُحدَّد طريقة اختيار الأسطر بدالة تعيد <code>True</code> فقط إذا كان ينبغي نسخ الأسطر:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">copy_lines</span>(<span class="hljs-params">source_file: <span class="hljs-built_in">str</span>, target_file: <span class="hljs-built_in">str</span>, criterion= <span class="hljs-keyword">lambda</span> x: <span class="hljs-literal">True</span></span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(source_file) <span class="hljs-keyword">as</span> source, <span class="hljs-built_in">open</span>(target_file, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> target:
        <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> source:
            <span class="hljs-comment"># Remove any whitespace from beginning and end of line</span>
            line = line.strip()

            <span class="hljs-keyword">if</span> criterion(line):
                target.write(line + <span class="hljs-string">&quot;\\n&quot;</span>)

<span class="hljs-comment"># Some examples</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># If the third parameter is not given, copy all lines</span>
    copy_lines(<span class="hljs-string">&quot;first.txt&quot;</span>, <span class="hljs-string">&quot;second.txt&quot;</span>)

    <span class="hljs-comment"># Copy all non-empty lines</span>
    copy_lines(<span class="hljs-string">&quot;first.txt&quot;</span>, <span class="hljs-string">&quot;second.txt&quot;</span>, <span class="hljs-keyword">lambda</span> line: <span class="hljs-built_in">len</span>(line) &gt; <span class="hljs-number">0</span>)

    <span class="hljs-comment"># Copy all lines which contain the word &quot;Python&quot;</span>
    copy_lines(<span class="hljs-string">&quot;first.txt&quot;</span>, <span class="hljs-string">&quot;second.txt&quot;</span>, <span class="hljs-keyword">lambda</span> line: <span class="hljs-string">&quot;Python&quot;</span> <span class="hljs-keyword">in</span> line)

    <span class="hljs-comment"># Copy all lines which do not end in a full stop</span>
    copy_lines(<span class="hljs-string">&quot;first.txt&quot;</span>, <span class="hljs-string">&quot;second.txt&quot;</span>, <span class="hljs-keyword">lambda</span> line: line[-<span class="hljs-number">1</span>] != <span class="hljs-string">&quot;.&quot;</span>)
</code></pre>
<p>يحتوي تعريف الدالة على قيمة افتراضية للمعامل المسمّى <code>criterion</code>، وهي <code>lambda x: True</code>. وتعيد هذه الدالة المجهولة دائمًا <code>True</code> بصرف النظر عن المُدخَل. لذا فالسلوك الافتراضي هو نسخ كل الأسطر. وكالمعتاد، إذا مُنحت قيمة لمعامل له قيمة افتراضية، فإن القيمة الجديدة تحلّ محلّ القيمة الافتراضية.</p>
<blockquote>
<p><strong>تمرين برمجي: البحث عن منتج</strong></p>
<p>يتعامل هذا التمرين مع منتجات مخزّنة في صفوف. وتفترض الأمثلة كلها متغيّرًا اسمه <code>products</code>، مُسنَدًا إليه القيمة التالية:</p>
</blockquote>
<pre><code class="language-python">products = [(<span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-number">5.95</span>, <span class="hljs-number">12</span>), (<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-number">3.95</span>, <span class="hljs-number">3</span>), (<span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-number">4.50</span>, <span class="hljs-number">2</span>), (<span class="hljs-string">&quot;watermelon&quot;</span>, <span class="hljs-number">4.95</span>, <span class="hljs-number">22</span>), (<span class="hljs-string">&quot;kale&quot;</span>, <span class="hljs-number">0.99</span>, <span class="hljs-number">1</span>)]
</code></pre>
<p>يحتوي كل صف على ثلاثة عناصر: الاسم والسعر والكمية.</p>
<p>يُرجى كتابة دالة اسمها <code>search(products: list, criterion: callable)</code>. والوسيط الثاني للدالة هو دالة بنفسها، وينبغي أن تكون قادرة على معالجة صف كما هو معرّف أعلاه، وأن تعيد قيمة منطقية. وينبغي أن تعيد دالة البحث قائمة جديدة تحتوي على تلك الصفوف من القائمة الأصلية التي تستوفي المعيار.</p>
<p>إذا أردنا تضمين المنتجات التي كان سعرها أقل من 4 يورو فقط، فيمكننا استخدام دالة المعيار التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">price_under_4_euros</span>(<span class="hljs-params">product</span>):
    <span class="hljs-keyword">return</span> product[<span class="hljs-number">1</span>] &lt; <span class="hljs-number">4</span>
</code></pre>
<p>تعيد الدالة <code>True</code> إذا كانت قيمة العنصر الثاني في الصف أقل من أربعة.</p>
<p>مثال على استخدام دالة <code>search</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> search(products, price_under_4_euros):
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>('apple', 3.95, 3)
('kale', 0.99, 1)
</code></pre>
<p>يمكن أن تكون دالة المعيار أيضًا دالة lambda. وإذا أردنا البحث عن المنتجات التي كانت كميتها 11 على الأقل فقط، فيمكننا كتابة ما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> search(products, <span class="hljs-keyword">lambda</span> t: t[<span class="hljs-number">2</span>]&gt;<span class="hljs-number">10</span>):
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>('banana', 5.95, 12)
('watermelon', 4.95, 22)
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,o as default,e as headings,t as html,p as slug,l as title};
