const s="mooc",n="part-10",a="الجزء 10: تراكيب الأصناف",e="3-oo-programming-techniques",l="تقنيات البرمجة الكائنية",p=[{depth:2,id:"تحميل-المشغلات",text:"تحميل المشغّلات"},{depth:2,id:"مشغلات-أخرى",text:"مشغّلات أخرى"},{depth:2,id:"التمثيل-النصي-للكائن",text:"التمثيل النصي للكائن"},{depth:2,id:"إصلاح-التمثيل-النصي",text:"إصلاح التمثيل النصي"},{depth:2,id:"مبالغ-متساوية",text:"مبالغ متساوية"},{depth:2,id:"مشغلات-المقارنة-الأخرى",text:"مشغّلات المقارنة الأخرى"},{depth:2,id:"الجمع-والطرح",text:"الجمع والطرح"},{depth:2,id:"يجب-ألا-تكون-القيمة-متاحة-للوصول-المباشر",text:"يجب ألّا تكون القيمة متاحة للوصول المباشر"},{depth:2,id:"المقارنات",text:"المقارنات"},{depth:2,id:"الزيادة",text:"الزيادة"},{depth:2,id:"الفرق",text:"الفرق"},{depth:2,id:"المكررات",text:"المُكرِّرات"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون على دراية ببعض الاستخدامات المختلفة لاسم المتغيّر <code>self</code></li>
<li>ستعرف كيف تُحمَّل المشغّلات (operators) في أصنافك الخاصة</li>
<li>ستكون قادرًا على إنشاء صنف قابل للتكرار (iterable)</li>
</ul>
</blockquote>
<p>يمكن أن يحتوي صنف على تابع يُرجع كائنًا من الصنف نفسه. فمثلًا، لدينا أدناه الصنف <code>Product</code>، الذي يُرجع تابعه <code>product_on_sale</code> كائن Product جديدًا يحمل الاسم نفسه كالأصل لكن بسعر أقل بنسبة 25٪:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, price: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-variable language_">self</span>.__price = price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.__name}</span> (price <span class="hljs-subst">{self.__price}</span>)&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">product_on_sale</span>(<span class="hljs-params">self</span>):
        on_sale = Product(<span class="hljs-variable language_">self</span>.__name, <span class="hljs-variable language_">self</span>.__price * <span class="hljs-number">0.75</span>)
        <span class="hljs-keyword">return</span> on_sale
</code></pre>
<pre><code class="language-python">apple1 = Product(<span class="hljs-string">&quot;Apple&quot;</span>, <span class="hljs-number">2.99</span>)
apple2 = apple1.product_on_sale()
<span class="hljs-built_in">print</span>(apple1)
<span class="hljs-built_in">print</span>(apple2)
</code></pre>
<pre><code>Apple (price 2.99)
Apple (price 2.2425)
</code></pre>
<p>لنراجع غرض المتغيّر <code>self</code>: فداخل تعريف الصنف يشير إلى الكائن نفسه. وهو يُستخدم عادةً للإشارة إلى مواصفات الكائن الذاتية، أي خصائصه (attributes) وتابعاته. ويمكن استخدام المتغيّر للإشارة إلى الكائن بأكمله أيضًا، مثلًا إذا كان لا بد من إرجاع الكائن نفسه إلى شيفرة العميل. وفي المثال أدناه أضفنا التابع <code>cheaper</code> إلى تعريف الصنف. وهو يأخذ منتجًا آخر وسيطًا ويرجع الأرخص من المنتجين اثنين:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, price: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-variable language_">self</span>.__price = price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.__name}</span> (price <span class="hljs-subst">{self.__price}</span>)&quot;</span>

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">price</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">cheaper</span>(<span class="hljs-params">self, Product</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.__price &lt; Product.price:
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> Product
</code></pre>
<pre><code class="language-python">apple = Product(<span class="hljs-string">&quot;Apple&quot;</span>, <span class="hljs-number">2.99</span>)
orange = Product(<span class="hljs-string">&quot;Orange&quot;</span>, <span class="hljs-number">3.95</span>)
banana = Product(<span class="hljs-string">&quot;Banana&quot;</span>, <span class="hljs-number">5.25</span>)

<span class="hljs-built_in">print</span>(orange.cheaper(apple))
<span class="hljs-built_in">print</span>(orange.cheaper(banana))
</code></pre>
<pre><code>Apple (2.99)
Orange (3.95)
</code></pre>
<p>ومع أن هذا يعمل كما ينبغي، إلا أنه حالة متخصصة جدًّا من مقارنة كائنين. لكن سيكون من الأفضل لو استطعنا استخدام مشغّلات المقارنة في Python مباشرة على كائنات <code>Product</code> هذه.</p>
<h2 id="تحميل-المشغلات">تحميل المشغّلات</h2>
<p>تحتوي Python على بعض التوابع المدمجة المُسمّاة تسمية خاصة للتعامل مع مشغّلات الحساب والمقارنة القياسية. وتُسمى هذه التقنية <em>تحميل المشغّلات</em> (<em>operator overloading</em>). فإذا أردت أن تتمكن من استخدام مشغّل معيّن على نسخ من أصناف عرّفتها بنفسك، فيمكنك كتابة تابع خاص يُرجع النتيجة الصحيحة للمشغّل. وقد استخدمنا هذه التقنية سابقًا مع التابع <code>__str__</code>: تعرف Python أن تبحث عن تابع بهذا الاسم عندما يُطلب تمثيل الكائن سلسلة نصية.</p>
<p>لنبدأ بالمشغّل <code>&gt;</code> الذي يخبرنا هل هو أكبر من الثاني. فتعريف الصنف <code>Product</code> أدناه يحتوي على التابع <code>__gt__</code>، وهو اختصار لعبارة <em>g</em>reater <em>t</em>han (أكبر من). ويجب أن يُرجع هذا التابع المُسمّى تسمية خاصة النتيجة الصحيحة للمقارنة. وبالأخص، يجب أن يُرجع <code>True</code> إذا كان، وفقط إذا كان، الكائن الحالي أكبر من الكائن المُمرَّر وسيطًا له. ويمكن للمبرمج أن يحدّد المعايير المستخدمة في ذلك. وبالكائن <em>الحالي</em> نعني الكائن الذي يُستدعى عليه التابع بأسلوب النقطة <code>.</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, price: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-variable language_">self</span>.__price = price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.__name}</span> (price <span class="hljs-subst">{self.__price}</span>)&quot;</span>

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">price</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__gt__</span>(<span class="hljs-params">self, another_product</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.price &gt; another_product.price
</code></pre>
<p>في التنفيذ أعلاه، يُرجع التابع <code>__gt__</code> القيمة <code>True</code> إذا كان سعر المنتج الحالي أكبر من سعر المنتج المُمرَّر وسيطًا له. وإلا يُرجع التابع <code>False</code>.</p>
<p>وأصبح مشغّل المقارنة <code>&gt;</code> متاحًا للاستخدام مع كائنات من نوع Product:</p>
<pre><code class="language-python">orange = Product(<span class="hljs-string">&quot;Orange&quot;</span>, <span class="hljs-number">2.90</span>)
apple = Product(<span class="hljs-string">&quot;Apple&quot;</span>, <span class="hljs-number">3.95</span>)

<span class="hljs-keyword">if</span> orange &gt; apple:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Orange is greater&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Apple is greater&quot;</span>)
</code></pre>
<pre><code>Apple is greater
</code></pre>
<p>وكما ورد أعلاه، يبقى تحديد المعايير التي يُقرر بها أيّهما أكبر وأيّهما أصغر من مسؤولية المبرمج. فمثلًا، يمكننا أن نقرر ألا يستند الترتيب إلى السعر، بل إلى ترتيب الأحرف الأبجدي للاسم. وهذا يعني أن <code>orange</code> ستكون الآن «أكبر من» <code>apple</code>، إذ تأتي <code>orange</code> متأخرة في الترتيب الأبجدي.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, price: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-variable language_">self</span>.__price = price

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.__name}</span> (price <span class="hljs-subst">{self.__price}</span>)&quot;</span>

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">price</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__price

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__name

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__gt__</span>(<span class="hljs-params">self, another_product</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.name &gt; another_product.name
</code></pre>
<pre><code class="language-python">Orange = Product(<span class="hljs-string">&quot;Orange&quot;</span>, <span class="hljs-number">4.90</span>)
Apple = Product(<span class="hljs-string">&quot;Apple&quot;</span>, <span class="hljs-number">3.95</span>)

<span class="hljs-keyword">if</span> Orange &gt; Apple:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Orange is greater&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Apple is greater&quot;</span>)
</code></pre>
<pre><code>Orange is greater
</code></pre>
<h2 id="مشغلات-أخرى">مشغّلات أخرى</h2>
<p>فيما يلي جدول يضمّ مشغّلات المقارنة القياسية، إلى جانب التوابع التي ينبغي تنفيذها إذا أردنا أن نجعلها متاحة للاستخدام على كائناتنا:</p>
<table>
<thead>
<tr>
<th style="text-align:center">المشغّل</th>
<th style="text-align:center">المعنى التقليدي</th>
<th style="text-align:center">اسم التابع</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>&lt;</code></td>
<td style="text-align:center">أصغر من</td>
<td style="text-align:center"><code>__lt__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&gt;</code></td>
<td style="text-align:center">أكبر من</td>
<td style="text-align:center"><code>__gt__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>==</code></td>
<td style="text-align:center">يساوي</td>
<td style="text-align:center"><code>__eq__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>!=</code></td>
<td style="text-align:center">لا يساوي</td>
<td style="text-align:center"><code>__ne__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&lt;=</code></td>
<td style="text-align:center">أصغر من أو يساوي</td>
<td style="text-align:center"><code>__le__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&gt;=</code></td>
<td style="text-align:center">أكبر من أو يساوي</td>
<td style="text-align:center"><code>__ge__(self, another)</code></td>
</tr>
</tbody>
</table>
<p>كما يمكنك تنفيذ بعض المشغّلات الأخرى، بما في ذلك مشغّلات الحساب التالية:</p>
<table>
<thead>
<tr>
<th style="text-align:center">المشغّل</th>
<th style="text-align:center">المعنى التقليدي</th>
<th style="text-align:center">اسم التابع</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>+</code></td>
<td style="text-align:center">الجمع</td>
<td style="text-align:center"><code>__add__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>-</code></td>
<td style="text-align:center">الطرح</td>
<td style="text-align:center"><code>__sub__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>*</code></td>
<td style="text-align:center">الضرب</td>
<td style="text-align:center"><code>__mul__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/</code></td>
<td style="text-align:center">القسمة (بناتج عشري)</td>
<td style="text-align:center"><code>__truediv__(self, another)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>//</code></td>
<td style="text-align:center">القسمة (بناتج صحيح)</td>
<td style="text-align:center"><code>__floordiv__(self, another)</code></td>
</tr>
</tbody>
</table>
<p>تجد مشغّلات وأسماء توابع أخرى بسهولة على الإنترنت. وتذكّر أيضًا أمر <code>dir</code> لسرد التوابع المتاحة للاستخدام على كائن معيّن.</p>
<p>نادرًا جدًّا ما يكون من الضروري تنفيذ جميع مشغّلات الحساب والمقارنة في أصنافك الخاصة. فمثلًا، القسمة عملية لا تكاد تكون ذات معنى خارج الكائنات العددية. فما النتيجة لو قسّمنا كائن Student على ثلاثة، أو على كائن Student آخر؟ ومع ذلك، فإن بعض هذه المشغّلات يكون مفيدًا جدًّا أيضًا مع أصنافك الخاصة. ويعتمد اختيار التوابع المراد تنفيذها على ما يتراءى منطقيًّا مع معرفة خصائص كائناتك.</p>
<p>لننظر إلى صنف يمثّل ملاحظة واحدة. فإذا نفّذنا التابع <code>__add__</code> داخل تعريف صنفنا، أصبح مشغّل الجمع <code>+</code> متاحًا على كائنات Note لدينا:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Note</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, entry_date: datetime, entry: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.entry_date = entry_date
        <span class="hljs-variable language_">self</span>.entry = entry

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.entry_date}</span>: <span class="hljs-subst">{self.entry}</span>&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__add__</span>(<span class="hljs-params">self, another</span>):
        <span class="hljs-comment"># The date of the new note is the current time</span>
        new_note = Note(datetime.now(), <span class="hljs-string">&quot;&quot;</span>)
        new_note.entry = <span class="hljs-variable language_">self</span>.entry + <span class="hljs-string">&quot; and &quot;</span> + another.entry
        <span class="hljs-keyword">return</span> new_note
</code></pre>
<pre><code class="language-python">entry1 = Note(datetime(<span class="hljs-number">2016</span>, <span class="hljs-number">12</span>, <span class="hljs-number">17</span>), <span class="hljs-string">&quot;Remember to buy presents&quot;</span>)
entry2 = Note(datetime(<span class="hljs-number">2016</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>), <span class="hljs-string">&quot;Remember to get a tree&quot;</span>)

<span class="hljs-comment"># These notes can be added together with the + operator</span>
<span class="hljs-comment"># This calls the  __add__ method in the Note class</span>
both = entry1 + entry2
<span class="hljs-built_in">print</span>(both)
</code></pre>
<pre><code>2020-09-09 14:13:02.163170: Remember to buy presents and Remember to get a tree
</code></pre>
<h2 id="التمثيل-النصي-للكائن">التمثيل النصي للكائن</h2>
<p>نفّذتَ بالفعل عددًا لا بأس به من التوابع <code>__str__</code> في أصنافك. وكما تعلم، يُرجع التابع التمثيل النصي للكائن. وتابع آخر شبه مماثل هو <code>__repr__</code> الذي يُرجع تمثيلًا <em>تقنيًّا</em> للكائن. وغالبًا ما يُنفَّذ التابع <code>__repr__</code> بحيث يُرجع شيفرة البرنامج التي يمكن تنفيذها لإرجاع كائن ذي <em>محتوى مطابق</em> للكائن الحالي.</p>
<p>تدوال <code>repr</code> التمثيل النصي التقني للكائن. كما يُستخدم التمثيل التقني أيضًا في كل مرة لا يكون فيها التابع <code>__str__</code> مُعرَّفًا للكائن. وسيوضّح المثال أدناه ذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, age: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.age = age
        
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;Person(<span class="hljs-subst">{<span class="hljs-built_in">repr</span>(self.name)}</span>, <span class="hljs-subst">{self.age}</span>)&quot;</span>
</code></pre>
<pre><code class="language-python3">person1 = Person(&quot;Anna&quot;, 25)
person2 = Person(&quot;Peter&quot;, 99)
print(person1)
print(person2)
</code></pre>
<pre><code>Person('Anna', 25)
Person('Peter', 99)
</code></pre>
<p>لاحظ كيف يستخدم التابع <code>__repr__</code> نفسه دالة <code>repr</code> لاسترجاع التمثيل التقني للسلسلة النصية. وهذا ضروري لإدراج محارف <code>'</code> في النتيجة.</p>
<p>يحتوي الصنف التالي على تعريف لكل من <code>__repr__</code> و<code>__str__</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, age: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.age = age
        
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;Person(<span class="hljs-subst">{<span class="hljs-built_in">repr</span>(self.name)}</span>, <span class="hljs-subst">{self.age}</span>)&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.age}</span> years)&quot;</span>
</code></pre>
<pre><code class="language-python3">Person = Person(&quot;Anna&quot;, 25)
print(Person)
print(repr(Person))
</code></pre>
<pre><code>Anna (25 years)
Person('Anna', 25)
</code></pre>
<p>يُذكر أن Python تستخدم دائمًا، مع هياكل البيانات مثل القوائم، التابع <code>__repr__</code> للتمثيل النصي للمحتوى. وقد يبدو هذا مربكًا بعض الشيء أحيانًا:</p>
<pre><code class="language-python3">persons = []
persons.append(Person(&quot;Anna&quot;, 25))
persons.append(Person(&quot;Peter&quot;, 99))
persons.append(Person(&quot;Mary&quot;, 55))
print(persons)
</code></pre>
<pre><code>[Person('Anna', 25), Person('Peter', 99), Person('Mary', 55)]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المال</strong></p>
<p>يحتوي قالب التمرين على مخطط لصنف اسمه <code>Money</code>. ويطلب منك هذا التمرين تنفيذ بعض التوابع الإضافية وإصلاح بعض المشكلات الصغيرة في القالب.</p>
</blockquote>
<h2 id="إصلاح-التمثيل-النصي">إصلاح التمثيل النصي</h2>
<p>التابع <code>__str__</code> في تعريف الصنف لا يعمل على نحو صحيح تمامًا. فبالنسبة إلى الكائنين التاليين من نوع Money، يُطبع الثاني بشكل خاطئ:</p>
<pre><code class="language-python">e1 = Money(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>)
e2 = Money(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># two euros and five cents</span>

<span class="hljs-built_in">print</span>(e1)
<span class="hljs-built_in">print</span>(e2)
</code></pre>
<pre><code>4.10
2.5
</code></pre>
<p>يرجى إصلاح التابع بحيث يطبع ما يلي:</p>
<pre><code>4.10 eur
2.05 eur
</code></pre>
<h2 id="مبالغ-متساوية">مبالغ متساوية</h2>
<p>يرجى تعريف تابع جديد اسمه <code>__eq__(self, another)</code> يتيح لك استخدام مشغّل المقارنة <code>==</code> على كائنات Money. ويمكنك اختبار تنفيذك بالشيفرة التالية:</p>
<pre><code class="language-python">e1 = Money(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>)
e2 = Money(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>)
e3 = Money(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>)

<span class="hljs-built_in">print</span>(e1)
<span class="hljs-built_in">print</span>(e2)
<span class="hljs-built_in">print</span>(e3)
<span class="hljs-built_in">print</span>(e1 == e2)
<span class="hljs-built_in">print</span>(e1 == e3)
</code></pre>
<pre><code>4.10 eur
2.05 eur
4.10 eur
False
True
</code></pre>
<h2 id="مشغلات-المقارنة-الأخرى">مشغّلات المقارنة الأخرى</h2>
<p>يرجى تنفيذ التوابع المناسبة لمشغّلات المقارنة <code>&lt;</code> و<code>&gt;</code> و<code>!=</code>.</p>
<pre><code class="language-python">e1 = Money(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>)
e2 = Money(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>)

<span class="hljs-built_in">print</span>(e1 != e2)
<span class="hljs-built_in">print</span>(e1 &lt; e2)
<span class="hljs-built_in">print</span>(e1 &gt; e2)
</code></pre>
<pre><code>True
False
True
</code></pre>
<h2 id="الجمع-والطرح">الجمع والطرح</h2>
<p>يرجى تنفيذ مشغّلي الجمع والطرح <code>+</code> و<code>-</code> لكائنات Money. وينبغي أن يُرجع كلاهما كائنًا جديدًا من نوع Money. ولا ينبغي أن يتغيّر في النتيجة الكائن نفسه ولا الكائن المُمرَّر وسيطًا له.</p>
<p>ملاحظة: لا يمكن أن تكون قيمة كائن Money سالبة. وإذا أدى محاولة الطرح إلى نتيجة سالبة، فيجب أن يرفع التابع استثناء <code>ValueError</code>.</p>
<pre><code class="language-python">e1 = Money(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>)
e2 = Money(<span class="hljs-number">2</span>, <span class="hljs-number">95</span>)

e3 = e1 + e2
e4 = e1 - e2

<span class="hljs-built_in">print</span>(e3)
<span class="hljs-built_in">print</span>(e4)

e5 = e2-e1
</code></pre>
<pre><code>7.00 eur
1.10 eur
Traceback (most recent call last):
  File &quot;money.py&quot;, line 416, in &lt;module&gt;
    e5 = e2-e1
  File &quot;money.py&quot;, line 404, in __sub__
    raise ValueError(f&quot;a negative result is not allowed&quot;)
ValueError: a negative result is not allowed
</code></pre>
<h2 id="يجب-ألا-تكون-القيمة-متاحة-للوصول-المباشر">يجب ألّا تكون القيمة متاحة للوصول المباشر</h2>
<p>لا يزال الصنف يعاني من مشكلة تكامل صغيرة. فبإمكان المستخدم «الغش» بالوصول إلى الخصائص مباشرة وتغيير القيمة المخزّنة في كائن Money:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(e1)
e1.euros = <span class="hljs-number">1000</span>
<span class="hljs-built_in">print</span>(e1)
</code></pre>
<pre><code>4.05 eur
1000.05 eur
</code></pre>
<p>يرجى <a href="/arabic-cs-library/book/mooc/part-9/3-encapsulation#encapsulation">تغليف</a> تنفيذ الخصائص المُعرَّفة في الصنف بحيث يتعذّر الغش المستخدم أعلاه. فلا ينبغي أن يملك الصنف أي خاصية عامة، ولا توابع جلب (getter) أو وضع (setter) لليورو أو للسنت.</p>
<blockquote>
<p><strong>تمرين برمجي: تاريخ بسيط</strong></p>
<p>في هذا التمرين يُطلب منك تنفيذ الصنف <code>SimpleDate</code> الذي يتيح لك التعامل مع التواريخ. ولامتياز البساطة نفترض هنا أن <em>كل شهر يحتوي على 30 يومًا</em>.</p>
</blockquote>
<p>وبسبب هذا التبسيط ينبغي ألّا تستخدم وحدة <code>datetime</code> من مكتبة Python القياسية، بل ستنفّذ وظائف مشابهة بنفسك.</p>
<h2 id="المقارنات">المقارنات</h2>
<p>يرجى تنفيذ مخطط الصنف، إلى جانب توابع تتيح المقارنة بالمشغّلات <code>&lt;</code> و<code>&gt;</code> و<code>==</code> و<code>!=</code>. ويمكنك استخدام الشيفرة التالية لاختبار تنفيذك:</p>
<pre><code class="language-python">d1 = SimpleDate(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2020</span>)
d2 = SimpleDate(<span class="hljs-number">28</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1985</span>)
d3 = SimpleDate(<span class="hljs-number">28</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1985</span>)

<span class="hljs-built_in">print</span>(d1)
<span class="hljs-built_in">print</span>(d2)
<span class="hljs-built_in">print</span>(d1 == d2)
<span class="hljs-built_in">print</span>(d1 != d2)
<span class="hljs-built_in">print</span>(d1 == d3)
<span class="hljs-built_in">print</span>(d1 &lt; d2)
<span class="hljs-built_in">print</span>(d1 &gt; d2)
</code></pre>
<pre><code>4.10.2020
28.12.1985
False
True
False
False
True
</code></pre>
<h2 id="الزيادة">الزيادة</h2>
<p>يرجى تنفيذ مشغّل الجمع <code>+</code> الذي يتيح إضافة عدد محدّد من الأيام إلى كائن SimpleDate. وينبغي أن يُرجع المشغّل كائن SimpleDate جديدًا. ولا ينبغي أن يتغيّر الكائن الأصلي.</p>
<pre><code class="language-python">d1 = SimpleDate(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2020</span>)
d2 = SimpleDate(<span class="hljs-number">28</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1985</span>)

d3 = d1 + <span class="hljs-number">3</span>
d4 = d2 + <span class="hljs-number">400</span>

<span class="hljs-built_in">print</span>(d1)
<span class="hljs-built_in">print</span>(d2)
<span class="hljs-built_in">print</span>(d3)
<span class="hljs-built_in">print</span>(d4)
</code></pre>
<pre><code>4.10.2020
28.12.1985
7.10.2020
8.2.1987
</code></pre>
<h2 id="الفرق">الفرق</h2>
<p>يرجى تنفيذ مشغّل الطرح <code>-</code> الذي يتيح معرفة الفرق بالأيام بين كائنين من نوع SimpleDate. وبما أننا افترضنا أن كل شهر يحتوي على 30 يومًا، فإن السنة في إطار هذا التمرين تساوي 12*30 = 360 يومًا.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار برنامجك:</p>
<pre><code class="language-python">d1 = SimpleDate(<span class="hljs-number">4</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2020</span>)
d2 = SimpleDate(<span class="hljs-number">2</span>, <span class="hljs-number">11</span>, <span class="hljs-number">2020</span>)
d3 = SimpleDate(<span class="hljs-number">28</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1985</span>)

<span class="hljs-built_in">print</span>(d2-d1)
<span class="hljs-built_in">print</span>(d1-d2)
<span class="hljs-built_in">print</span>(d1-d3)
</code></pre>
<pre><code>28
28
12516
</code></pre>
<h2 id="المكررات">المُكرِّرات <span class="content-anchor" id="iterators"></span></h2>
<p>نعلم أن جملة <code>for</code> يمكن استخدامها <em>لتكرار</em> (iteration) العديد من هياكل البيانات المختلفة والملفات ومجموعات العناصر. وحالة استخدام نموذجية هي الدالة التالية:</p>
<pre><code class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">count_positives</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    n = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
        <span class="hljs-keyword">if</span> item &gt; <span class="hljs-number">0</span>:
            n += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> n

</code></pre>
<p>تمرّ الدالة على عناصر القائمة واحدًا واحدًا، وتحتفظ بعدد العناصر التي كانت موجبة.</p>
<p>من الممكن أيضًا جعل أصنافك الخاصة قابلة للتكرار. وهذا مفيد حين يتضمّن الغرض الأساسي من الصنف تخزين مجموعة من العناصر. فصنف Bookshelf في المثال السابق مرشّح جيّد، إذ من المعقول استخدام حلقة <code>for</code> للمرور على الكتب الموضوعة في الرف. ويُقال الشيء نفسه عن سجلّ الطلاب مثلًا. وقد تكون القدرة على التكرار عبر مجموعة الطلاب مفيدة.</p>
<p>لجعل صنف قابلًا للتكرار يجب عليك تنفيذ تابعي المُكرِّر <code>__iter__</code> و<code>__next__</code>. وسنعود إلى تفاصيل هذين التابعين بعد المثال التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Book</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, author: <span class="hljs-built_in">str</span>, page_count: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.author = author
        <span class="hljs-variable language_">self</span>.page_count = page_count

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Bookshelf</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>._books = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_book</span>(<span class="hljs-params">self, book: Book</span>):
        <span class="hljs-variable language_">self</span>._books.append(book)

    <span class="hljs-comment"># This is the iterator initialization method</span>
    <span class="hljs-comment"># The iteration variable(s) should be initialized here</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__iter__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.n = <span class="hljs-number">0</span>
        <span class="hljs-comment"># the method returns a reference to the object itself as </span>
        <span class="hljs-comment"># the iterator is implemented within the same class definition</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>

    <span class="hljs-comment"># This method returns the next item within the object</span>
    <span class="hljs-comment"># If all items have been traversed, the StopIteration event is raised</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__next__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.n &lt; <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._books):
            <span class="hljs-comment"># Select the current item from the list within the object</span>
            book = <span class="hljs-variable language_">self</span>._books[<span class="hljs-variable language_">self</span>.n]
            <span class="hljs-comment"># increase the counter (i.e. iteration variable) by one</span>
            <span class="hljs-variable language_">self</span>.n += <span class="hljs-number">1</span>
            <span class="hljs-comment"># return the current item</span>
            <span class="hljs-keyword">return</span> book
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># All books have been traversed</span>
            <span class="hljs-keyword">raise</span> StopIteration
</code></pre>
<p>يُهيّئ التابع <code>__iter__</code> متغيّر التكرار أو متغيّرات التكرار. وفي هذه الحالة يكفي وجود عدّاد بسيط يحمل فهرس العنصر الحالي في القائمة. ونحتاج أيضًا إلى التابع <code>__next__</code> الذي يُرجع العنصر التالي في المُكرِّر. وفي المثال أعلاه يُرجع التابع العنصر ذا الفهرس <code>n</code> من القائمة داخل كائن Bookshelf، ويُزاد كذلك متغيّر التكرار.</p>
<p>وعند اكتمال المرور على جميع الكائنات، يرفع التابع <code>__next__</code> استثناء <code>StopIteration</code>. ولا يختلف هذا الإجراء عن رفع أي استثناء آخر، لكن Python تتعامل مع هذا الاستثناء تلقائيًّا، وغرضه أن يُبلّغ الشيفرة المستدِعي للمُكرِّر (مثل حلقة <code>for</code>) بأن التكرار قد انتهى.</p>
<p>أصبح رفّ الكتب Bookshelf لدينا جاهزًا للتكرار، مثلًا باستخدام حلقة <code>for</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    b1 = Book(<span class="hljs-string">&quot;The Life of Python&quot;</span>, <span class="hljs-string">&quot;Montague Python&quot;</span>, <span class="hljs-number">123</span>)
    b2 = Book(<span class="hljs-string">&quot;The Old Man and the C&quot;</span>, <span class="hljs-string">&quot;Ernest Hemingjavay&quot;</span>, <span class="hljs-number">204</span>)
    b3 = Book(<span class="hljs-string">&quot;A Good Cup of Java&quot;</span>, <span class="hljs-string">&quot;Caffee Coder&quot;</span>, <span class="hljs-number">997</span>)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    <span class="hljs-comment"># Print the names of all the books</span>
    <span class="hljs-keyword">for</span> book <span class="hljs-keyword">in</span> shelf:
        <span class="hljs-built_in">print</span>(book.name)
</code></pre>
<pre><code>The Life of Python
The Old Man and the C
A Good Cup of Java
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: قائمة تسوق قابلة للتكرار</strong></p>
<p>يحتوي قالب التمرين على الصنف <code>ShoppingList</code> من <a href="/arabic-cs-library/book/mooc/part-8/2-classes-and-objects#programming-exercise-shopping-list">التمرين في الجزء 8</a>. يُرجى تعديل الصنف بحيث يصبح قابلًا للتكرار ويمكن استخدامه هكذا:</p>
</blockquote>
<pre><code class="language-python">shopping_list = ShoppingList()
shopping_list.add(<span class="hljs-string">&quot;bananas&quot;</span>, <span class="hljs-number">10</span>)
shopping_list.add(<span class="hljs-string">&quot;apples&quot;</span>, <span class="hljs-number">5</span>)
shopping_list.add(<span class="hljs-string">&quot;pineapple&quot;</span>, <span class="hljs-number">1</span>)

<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> shopping_list:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{product[<span class="hljs-number">0</span>]}</span>: <span class="hljs-subst">{product[<span class="hljs-number">1</span>]}</span> units&quot;</span>)
</code></pre>
<pre><code>bananas: 10 units
apples: 5 units
pineapple: 1 units
</code></pre>
<p>ينبغي أن يُرجع التابع <code>__next__</code> في مُكرِّرك صفوفًا (tuples)، يكون فيها العنصر الأول اسم المنتج والعنصر الثاني الكمية.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,e as slug,l as title};
