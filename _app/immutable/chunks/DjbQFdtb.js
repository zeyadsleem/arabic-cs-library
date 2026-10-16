const s="mooc",n="part-11",a="الجزء 11: ميزات متقدمة",e="2-more-comprehensions",l="المزيد من الإدراكات",p=[{depth:2,id:"الأصناف-الخاصة-والإدراكات",text:"الأصناف الخاصة والإدراكات"},{depth:2,id:"الإدراكات-والقواميس",text:"الإدراكات والقواميس"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام الإدراكات مع السلاسل النصية</li>
<li>ستعرف كيف تستخدم الإدراكات مع أصنافك الخاصة</li>
<li>ستكون قادرًا على إنشاء إدراكات القواميس</li>
</ul>
</blockquote>
<p>القوائم هي على الأرجح الهدف الأكثر شيوعًا للإدراكات، لكن الإدراكات تعمل مع أي متتالية من العناصر، بما في ذلك السلاسل النصية. وكما في أمثلة القوائم في القسم السابق، إذا أُجري إدراك قوائم على سلسلة نصية، انتُزعت العناصر (أي المحارف) من السلسلة النصية واحدًا واحدًا، وعُولجت وفقًا للتعبير المعطى، وخُزّنت في قائمة.</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Peter Python&quot;</span>

uppercased = [character.upper() <span class="hljs-keyword">for</span> character <span class="hljs-keyword">in</span> name]
<span class="hljs-built_in">print</span>(uppercased)
</code></pre>
<pre><code>['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']
</code></pre>
<p>والنتيجة قائمة فعلًا، على ما تقتضيه صيغة الأقواس المربّعة حول عبارة الإدراك. ولو أردنا سلسلة نصية بدلًا من ذلك، لأمكننا استخدام تابع السلسلة النصية <code>join</code> لتحويل القائمة إلى سلسلة نصية. وتذكّر أن التابع يُنادى على السلسلة النصية التي نريد استخدامها &quot;غراءً&quot; بين المحارف. لنلقِ نظرة على بعض الأمثلة:</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Peter&quot;</span>
char_list = <span class="hljs-built_in">list</span>(name)
<span class="hljs-built_in">print</span>(char_list)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;&quot;</span>.join(char_list))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; &quot;</span>.join(char_list))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;,&quot;</span>.join(char_list))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; and &quot;</span>.join(char_list))
</code></pre>
<pre><code>['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r
</code></pre>
<p>إن إدراكات القوائم والتابع <code>join</code> يسهّلان إنشاء سلاسل نصية جديدة استنادًا إلى سلاسل نصية أخرى. فيمكننا مثلًا إنشاء سلسلة نصية لا تحتوي إلا على حروف العلة من سلسلة نصية أخرى:</p>
<pre><code class="language-python">test_string = <span class="hljs-string">&quot;Hello there, this is a test!&quot;</span>

vowels = [character <span class="hljs-keyword">for</span> character <span class="hljs-keyword">in</span> test_string <span class="hljs-keyword">if</span> character <span class="hljs-keyword">in</span> <span class="hljs-string">&quot;aeiou&quot;</span>]
new_string = <span class="hljs-string">&quot;&quot;</span>.join(vowels)

<span class="hljs-built_in">print</span>(new_string)
</code></pre>
<pre><code>eoeeiiae
</code></pre>
<p>في المثال أعلاه جاء إدراك القوائم والتابع <code>join</code> في سطرين منفصلين، لكن كان يمكن دمجهما في تعبير واحد:</p>
<pre><code class="language-python">test_string = <span class="hljs-string">&quot;Hello there, this is a test!&quot;</span>

vowel_string = <span class="hljs-string">&quot;&quot;</span>.join([character <span class="hljs-keyword">for</span> character <span class="hljs-keyword">in</span> test_string <span class="hljs-keyword">if</span> character <span class="hljs-keyword">in</span> <span class="hljs-string">&quot;aeiou&quot;</span>])

<span class="hljs-built_in">print</span>(vowel_string)
</code></pre>
<p>كثير من مبرمجي Python ممن يفضّلون هذه الأسطر الأحادية، فمن الجدير جدًّا بوقتك أن تتعلّم قراءتها. بل يمكننا حتى أن نضيف التابع <code>split</code> إلى الخليط، بحيث نستطيع معالجة جمل كاملة بكفاءة بعبارة واحدة. في المثال أدناه يُحذف المحرف الأول من كل كلمة في جملة:</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;Sheila keeps on selling seashells on the seashore&quot;</span>

sentence_no_initials = <span class="hljs-string">&quot; &quot;</span>.join([word[<span class="hljs-number">1</span>:] <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> sentence.split()])
<span class="hljs-built_in">print</span>(sentence_no_initials)
</code></pre>
<pre><code>heila eeps n elling eashells n he eashore
</code></pre>
<p>لنمضِ في هذا خطوة خطوة:</p>
<ul>
<li>يستخرج التعبير <code>word[1:]</code> سلسلة نصية فرعية بدءًا من المحرف الثاني (عند الفهرس 1) فصاعدًا</li>
<li>يقسّم التعبير <code>sentence.split()</code> الجملة إلى مقاطع عند المحرف المعطى. وفي هذه الحالة لا يُمنح التابع أي وسيط، فتُقسَّم الجملة عند محارف المسافة افتراضيًا</li>
<li>يدمج التعبير <code>&quot; &quot;.join()</code> عناصر القائمة في سلسلة نصية جديدة مستخدمًا محرف مسافة بين العناصر</li>
</ul>
<p>وقد تبدو الطريقة التكرارية التقليدية أكثر هكذا</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;Sheila keeps on selling seashells on the seashore&quot;</span>

word_list = []
words = sentence.split()
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> words:
    word_no_initials = word[<span class="hljs-number">1</span>:]
    word_list.append(word_no_initials)

sentence_no_initials = <span class="hljs-string">&quot; &quot;</span>.join(word_list)

<span class="hljs-built_in">print</span>(sentence_no_initials)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: تصفية المحظور</strong></p>
<p>يُرجى كتابة دالة اسمها <code>filter_forbidden(string: str, forbidden: str)</code> تأخذ سلسلتين نصيتين وسيطين لها. وينبغي أن تُعيد الدالة نسخة جديدة من السلسلة النصية الأولى، لا تحتوي على أي محرف من السلسلة النصية الثانية.</p>
</blockquote>
<p>ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة ثلاثة أسطر من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>يُرجى إلقاء نظرة على المثال أدناه.</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;Once! upon, a time: there was a python!??!?!&quot;</span>
filtered = filter_forbidden(sentence, <span class="hljs-string">&quot;!?:,.&quot;</span>)
<span class="hljs-built_in">print</span>(filtered)
</code></pre>
<pre><code>Once upon a time there was a python
</code></pre>
<h2 id="الأصناف-الخاصة-والإدراكات">الأصناف الخاصة والإدراكات</h2>
<p>يمكن أن تكون الإدراكات أداة مفيدة لمعالجة أمثلة أصنافك الخاصة أو صياغتها، كما سنرى في الأمثلة التالية.</p>
<p>أولًا، لنلقِ نظرة على الصنف <code>Country</code>، وهو نموذج بسيط لبلد واحد، بخصائص للاسم وعدد السكان. وفي الدالة الرئيسة أدناه ننشئ أولًا بعض كائنات Country، ثم نستخدم إدراك قوائم لاختيار البلدان التي يزيد عدد سكانها على خمسة ملايين فقط.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Country</span>:
    <span class="hljs-string">&quot;&quot;&quot; This class models a single country with population &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, population: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.population = population

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    finland = Country(<span class="hljs-string">&quot;Finland&quot;</span>, <span class="hljs-number">6000000</span>)
    malta = Country(<span class="hljs-string">&quot;Malta&quot;</span>, <span class="hljs-number">500000</span>)
    sweden = Country(<span class="hljs-string">&quot;Sweden&quot;</span>, <span class="hljs-number">10000000</span>)
    iceland = Country(<span class="hljs-string">&quot;Iceland&quot;</span>, <span class="hljs-number">350000</span>)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name <span class="hljs-keyword">for</span> country <span class="hljs-keyword">in</span> countries <span class="hljs-keyword">if</span> country.population &gt; <span class="hljs-number">5000000</span>]
    <span class="hljs-keyword">for</span> country <span class="hljs-keyword">in</span> bigger_countries:
        <span class="hljs-built_in">print</span>(country)

</code></pre>
<pre><code>Finland
Sweden
</code></pre>
<p>في إدراك القوائم أعلاه اخترنا خاصية الاسم فقط من كائنات Country، فكانت محتويات القائمة قابلة للطباعة مباشرة. وكان يمكننا أيضًا إنشاء قائمة جديدة بالبلدان نفسها والوصول إلى خاصية الاسم في حلقة <code>for</code>. وقد يكون هذا مفيدًا لو استُخدمت القائمة نفسها من البلدان لاحقًا في البرنامج أيضًا، أو لو احتجنا خاصية عدد السكان في حلقة <code>for</code> كذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    finland = Country(<span class="hljs-string">&quot;Finland&quot;</span>, <span class="hljs-number">6000000</span>)
    malta = Country(<span class="hljs-string">&quot;Malta&quot;</span>, <span class="hljs-number">500000</span>)
    sweden = Country(<span class="hljs-string">&quot;Sweden&quot;</span>, <span class="hljs-number">10000000</span>)
    iceland = Country(<span class="hljs-string">&quot;Iceland&quot;</span>, <span class="hljs-number">350000</span>)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country <span class="hljs-keyword">for</span> country <span class="hljs-keyword">in</span> countries <span class="hljs-keyword">if</span> country.population &gt; <span class="hljs-number">5000000</span>]
    <span class="hljs-keyword">for</span> country <span class="hljs-keyword">in</span> bigger_countries:
        <span class="hljs-built_in">print</span>(country.name, country.population)
</code></pre>
<p>في المثال التالي لدينا صنف اسمه <code>RunningEvent</code>، وهو نموذج لسباق جري واحد، بخصائص لطول السباق واسمه. وسنستخدم إدراكات القوائم لإنشاء كائنات <code>RunningEvent</code> استنادًا إلى قائمة بأطوال السباقات.</p>
<p>وللمعامل <code>name</code> قيمة افتراضية في باني الصنف <code>RunningEvent</code>، ولهذا لا نحتاج إلى تمرير الاسم وسيطًا.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RunningEvent</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class models a foot race event of a length of n metres  &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, length: <span class="hljs-built_in">int</span>, name: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;no name&quot;</span></span>):
        <span class="hljs-variable language_">self</span>.length = length
        <span class="hljs-variable language_">self</span>.name = name

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.length}</span> m. (<span class="hljs-subst">{self.name}</span>)&quot;</span>

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    lengths = [<span class="hljs-number">100</span>, <span class="hljs-number">200</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">3000</span>, <span class="hljs-number">42195</span>]
    events = [RunningEvent(length) <span class="hljs-keyword">for</span> length <span class="hljs-keyword">in</span> lengths]

    <span class="hljs-comment"># Print out all events</span>
    <span class="hljs-built_in">print</span>(events)

    <span class="hljs-comment"># Pick one from the list and give it a name</span>
    marathon = events[-<span class="hljs-number">1</span>] <span class="hljs-comment"># the last item in the list</span>
    marathon.name = <span class="hljs-string">&quot;Marathon&quot;</span>

    <span class="hljs-comment"># Print out everything again, including the new name</span>
    <span class="hljs-built_in">print</span>(events)
</code></pre>
<pre><code>[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (no name)]
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (Marathon)]
</code></pre>
<p>والآن لنكتشف ما الذي يجعل متتالية من العناصر &quot;قابلة للإدراك&quot;. لقد تعلّمنا في الجزء السابق كيف نجعل أصنافنا الخاصة قابلة للتكرار. وهذه الميزة نفسها بالضبط هي التي تتيح أيضًا إدراكات القوائم. فإن كان صنفك الخاص قابلًا للتكرار، أمكن استخدامه أساسًا لعبارة إدراك قوائم. وتعريفات الأصناف التالية منسوخة مباشرةً من <a href="/arabic-cs-library/book/mooc/part-10/3-oo-programming-techniques#iterators">الجزء 10</a>:</p>
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

<span class="hljs-comment"># Test your classes</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    b1 = Book(<span class="hljs-string">&quot;The Life of Python&quot;</span>, <span class="hljs-string">&quot;Montague Python&quot;</span>, <span class="hljs-number">123</span>)
    b2 = Book(<span class="hljs-string">&quot;The Old Man and the C&quot;</span>, <span class="hljs-string">&quot;Ernest Hemingjavay&quot;</span>, <span class="hljs-number">204</span>)
    b3 = Book(<span class="hljs-string">&quot;A Good Cup of Java&quot;</span>, <span class="hljs-string">&quot;Caffee Coder&quot;</span>, <span class="hljs-number">997</span>)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    <span class="hljs-comment"># Create a list containing the names of all books</span>
    book_names = [book.name <span class="hljs-keyword">for</span> book <span class="hljs-keyword">in</span> shelf]
    <span class="hljs-built_in">print</span>(book_names)

</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المنتجات في قائمة التسوق</strong></p>
<p>لقد أنشأت في الجزء 10 <a href="/arabic-cs-library/book/mooc/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list">قائمة تسوّق قابلة للتكرار</a>، وقد تعلّمنا للتو أنّ الكائن المنشأ من صنف قابل للتكرار يمكن استخدامه مع إدراكات القوائم. ويحتوي قالب التمرين على نسخة مختصرة من الصنف <code>ShoppingList</code> بوظائف تكفي بالكاد لتلبية متطلبات هذا التمرين.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>products_in_shopping_list(shopping_list, amount: int)</code> تأخذ كائن ShoppingList وقيمة عدد صحيح وسيطين لها. وتُعيد الدالة قائمة بأسماء المنتجات. وينبغي أن تتضمّن القائمة المنتجات التي لها عدد من العناصر لا يقلّ عن العدد المحدّد في المعامل <code>amount</code> فقط.</p>
<p>ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>. وينبغي <em>ألا</em> يُعدَّل تعريف الصنف <code>ShoppingList</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">my_list = ShoppingList()
my_list.add(<span class="hljs-string">&quot;bananas&quot;</span>, <span class="hljs-number">10</span>)
my_list.add(<span class="hljs-string">&quot;apples&quot;</span>, <span class="hljs-number">5</span>)
my_list.add(<span class="hljs-string">&quot;alcohol free beer&quot;</span>, <span class="hljs-number">24</span>)
my_list.add(<span class="hljs-string">&quot;pineapple&quot;</span>, <span class="hljs-number">1</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;the shopping list contains at least 8 of the following items:&quot;</span>)
<span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> products_in_shopping_list(my_list, <span class="hljs-number">8</span>):
    <span class="hljs-built_in">print</span>(product)
</code></pre>
<pre><code>the shopping list contains at least 8 of the following items:
bananas
alcohol free beer
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: فرق السعر للعقارات الأرخص</strong></p>
<p>هذا التمرين نسخة معدّلة قليلًا من تمرين <a href="/arabic-cs-library/book/mooc/part-9/1-objects-and-references#programming-exercise-comparing-properties">مقارنة الخصائص</a> من الجزء 9.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>cheaper_properties(properties: list, reference: RealProperty)</code> تأخذ قائمة من العقارات وكائن RealProperty واحدًا وسيطين لها. وينبغي أن تُعيد الدالة قائمة تحتوي على العقارات الأرخص من العقار المرجعي فقط من القائمة الأصلية، مع فرق السعر. وينبغي أن تكون عناصر القائمة المُعادة صفوفًا، عنصرها الأول هو العقار نفسه وعنصرها الثاني هو فرق السعر.</p>
<p>ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>وشيفرة الصنف <code>RealProperty</code> موجودة في قالب التمرين ولا ينبغي تغييرها.</p>
<p>مثال على الدالة أثناء العمل:</p>
<pre><code class="language-python">a1 = RealProperty(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>, <span class="hljs-number">5500</span>, <span class="hljs-string">&quot;Central studio&quot;</span>)
a2 = RealProperty(<span class="hljs-number">2</span>, <span class="hljs-number">38</span>, <span class="hljs-number">4200</span>, <span class="hljs-string">&quot;Two bedrooms downtown&quot;</span>)
a3 = RealProperty(<span class="hljs-number">3</span>, <span class="hljs-number">78</span>, <span class="hljs-number">2500</span>, <span class="hljs-string">&quot;Three bedrooms in the suburbs&quot;</span>)
a4 = RealProperty(<span class="hljs-number">6</span>, <span class="hljs-number">215</span>, <span class="hljs-number">500</span>, <span class="hljs-string">&quot;Farm in the middle of nowhere&quot;</span>)
a5 = RealProperty(<span class="hljs-number">4</span>, <span class="hljs-number">105</span>, <span class="hljs-number">1700</span>, <span class="hljs-string">&quot;Loft in a small town&quot;</span>)
a6 = RealProperty(<span class="hljs-number">25</span>, <span class="hljs-number">1200</span>, <span class="hljs-number">2500</span>, <span class="hljs-string">&quot;Countryside mansion&quot;</span>)

properties = [a1, a2, a3, a4, a5, a6]

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;cheaper options when compared to <span class="hljs-subst">{a3.description}</span>:&quot;</span>)
<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> cheaper_properties(properties, a3):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{item[<span class="hljs-number">0</span>].description:<span class="hljs-number">35</span>}</span> price difference <span class="hljs-subst">{item[<span class="hljs-number">1</span>]}</span> euros&quot;</span>)
</code></pre>
<pre><code>cheaper options when compared to Three bedrooms in the suburbs:
Central studio                                    price difference 107000 euros
Two bedrooms downtown               price difference 35400 euros
Farm in the middle of nowhere       price difference 87500 euros
Loft in a small town                           price difference 16500 euros
</code></pre>
<h2 id="الإدراكات-والقواميس">الإدراكات والقواميس</h2>
<p>لا يوجد في الإدراكات ما يجعلها &quot;قوائمية&quot; بطبيعتها. فالنتيجة قائمة لأن عبارة الإدراك محاطة بأقواس مربّعة، وهي التي تدلّ على قائمة في Python. وتعمل الإدراكات بالقدر نفسه من الكفاءة مع قواميس Python إذا استخدمت أقواسًا معقوفة بدلًا منها. لكن تذكّر أن القواميس تتطلّب أزواجًا من المفتاح والقيمة. ويجب تحديد كليهما عند إنشاء قاموس، وكذلك مع الإدراكات.</p>
<p>ويمكن أن يكون أساس الإدراك أي متتالية قابلة للتكرار، سواء كانت قائمة أو سلسلة نصية أو صفًّا أو قاموسًا أو أيًّا من أصنافك القابلة للتكرار، وما إلى ذلك.</p>
<p>في المثال التالي نستخدم سلسلة نصية أساسًا لقاموس. ويحتوي القاموس على جميع المحارف الفريدة في السلسلة النصية، مع عدد مرات ظهورها:</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;hello there&quot;</span>

char_counts = {character : sentence.count(character) <span class="hljs-keyword">for</span> character <span class="hljs-keyword">in</span> sentence}
<span class="hljs-built_in">print</span>(char_counts)
</code></pre>
<pre><code>{'h': 2, 'e': 3, 'l': 2, 'o': 1, ' ': 1, 't': 1, 'r': 1}
</code></pre>
<p>ومبدأ عبارة الإدراك هو نفسه تمامًا كما في القوائم، لكن التعبير الآن يتكوّن من مفتاح وقيمة بدلًا من قيمة واحدة. وبناء الجملة العام كما يلي:</p>
<p><code>{&lt;key expression&gt; : &lt;value expression&gt; for &lt;item&gt; in &lt;series&gt;}</code></p>
<p>ولإنهاء هذا القسم، لنلقِ نظرة على المضاريب مرة أخرى. وهذه المرة نخزّن النتائج في قاموس. فالعدد نفسه هو المفتاح، أما القيمة فهي نتيجة المضروب من دالتنا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-string">&quot;&quot;&quot; The function calculates the factorial n! for integers above zero &quot;&quot;&quot;</span>
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> n &gt;= <span class="hljs-number">2</span>:
        k *= n
        n -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> k

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [-<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, -<span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>]
    factorials = {number : factorial(number) <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers <span class="hljs-keyword">if</span> number &gt; <span class="hljs-number">0</span>}
    <span class="hljs-built_in">print</span>(factorials)
</code></pre>
<pre><code>{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أطوال السلاسل النصية</strong></p>
<p>يُرجى كتابة دالة اسمها <code>lengths(strings: list)</code> تأخذ قائمة من السلاسل النصية وسيطًا لها. وينبغي أن تُعيد الدالة <em>قاموسًا</em> تكون فيه السلاسل النصية في القائمة مفاتيح وأطوالها قيمًا.</p>
</blockquote>
<p>ينبغي أن تُنفَّذ الدالة بإدراك قاموس. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية <code>def</code>.</p>
<p>ينبغي أن تعمل الدالة على النحو التالي:</p>
<pre><code class="language-python">word_list = [<span class="hljs-string">&quot;once&quot;</span>, <span class="hljs-string">&quot;upon&quot;</span> , <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;time&quot;</span>, <span class="hljs-string">&quot;in&quot;</span>]

word_lengths = lengths(word_list)
<span class="hljs-built_in">print</span>(word_lengths)
</code></pre>
<pre><code>{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الكلمات الأكثر شيوعًا</strong></p>
<p>يُرجى كتابة دالة اسمها <code>most_common_words(filename: str, lower_limit: int)</code> تأخذ اسم ملف وقيمة عدد صحيح لحدّ أدنى وسيطين لها. وينبغي أن تُعيد الدالة قاموسًا يحتوي على مرات ظهور الكلمات التي تظهر على الأقل بعدد المرات المحدّد في المعامل <code>lower_limit</code>.</p>
</blockquote>
<p>فمثلًا، لنفترض أن الدالة استُخدمت لمعالجة ملف اسمه <em>comprehensions.txt</em> بالمحتويات التالية:</p>
<pre><code class="language-txt">List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
</code></pre>
<p>فعند نداء الدالة بالوسيطين <code>most_common_words(&quot;comprehensions.txt&quot;, 3)</code> ينبغي أن تُعيد</p>
<pre><code>{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}
</code></pre>
<p>ملاحظة: تؤثّر حالة الأحرف في النتائج، وجميع الصيغ المُصرَّفة كلمات فريدة في هذا التمرين. أي إنّ الكلمات <code>List</code> و<code>lists</code> و<code>list</code> كل منها كلمة منفصلة هنا، و<code>list</code> وحدها لها مرات ظهور تكفي لتصل إلى القائمة المُعادة. وينبغي إزالة جميع علامات الترقيم قبل عدّ مرات الظهور.</p>
<p>والقرار في كيفية تنفيذ ذلك متروك لك. وعلى الأرجح ستكون أسهل طريقة هي الاستفادة من إدراكات القوائم والقواميس.</p>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:o};export{s as book,n as chapter,a as chapterTitle,t as default,p as headings,o as html,e as slug,l as title};
