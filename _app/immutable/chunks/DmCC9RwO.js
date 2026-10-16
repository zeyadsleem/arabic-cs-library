const s="mooc",a="part-10",n="الجزء 10: تراكيب الأصناف",l="1-class-hierarchies",e="تراكيب الأصناف",p=[{depth:2,id:"صنوف-خاصة-لأغراض-خاصة",text:"صنوف خاصة لأغراض خاصة"},{depth:2,id:"الوراثة",text:"الوراثة"},{depth:2,id:"الوراثة-ونطاق-الخصائص",text:"الوراثة ونطاق الخصائص"},{depth:2,id:"المربع",text:"المربّع"},{depth:2,id:"الكلمة-الأطول-تفوز",text:"الكلمة الأطول تفوز"},{depth:2,id:"الأكثر-حروفا-متحركة-يفوز",text:"الأكثر حروفًا متحرّكة يفوز"},{depth:2,id:"الحجر-والورقة-والمقص",text:"الحجر والورقة والمقص"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما تعنيه الوراثة (inheritance) في سياق البرمجة</li>
<li>ستكون قادرًا على كتابة أصناف ترث أصنافًا أخرى</li>
<li>ستعرف كيف تؤثر الوراثة في خصائص الأصناف</li>
</ul>
</blockquote>
<h2 id="صنوف-خاصة-لأغراض-خاصة">صنوف خاصة لأغراض خاصة</h2>
<p>قد تصادف أحيانًا موقفًا تكون فيه قد عرّفت صنفًا بالفعل، ثم تدرك أنك تحتاج إلى خصائص معيّنة في بعض نسخ من ذلك الصنف لا في جميعها. وفي أحيانٍ أخرى تدرك أنك عرّفت صنفين متشابهين جدًّا يفترقان بفروق طفيفة فحسب. نحن بصفتنا مبرمجين نسعى دائمًا إلى أقل قدر ممكن من التكرار، مع الحفاظ على الوضوح والقابلية للقراءة. فكيف يمكننا إيواء تنفيذات مختلفة لأشياء تتشابه في جوهرها؟</p>
<p>لننظر إلى تعريفَي صنف: <code>Student</code> و<code>Teacher</code>. وقد تُركت توابع الجلب والوضع (getter and setter) جانبًا حاليًا لإبقاء المثال قصيرًا.</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, <span class="hljs-built_in">id</span>: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">id</span> = <span class="hljs-built_in">id</span>
        <span class="hljs-variable language_">self</span>.email = email
        <span class="hljs-variable language_">self</span>.credits = credits

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Teacher</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span>, room: <span class="hljs-built_in">str</span>, teaching_years: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.email = email
        <span class="hljs-variable language_">self</span>.room = room
        <span class="hljs-variable language_">self</span>.teaching_years = teaching_years

</code></pre>
<p>حتى في مثال مُبسَّط كالمثال أعلاه، يكون لدينا بالفعل تكرار لا بأس به: يحتوي كلٌّ من الصنفين على الخاصيتين <code>name</code> و<code>email</code>. ولو كانت تعريفة الخاصيتين واحدة لكان تابع واحد كافيًا لتعديلهما.</p>
<p>فمثلًا، تخيّل أن عنوان بريد المدرسة قد تغيّر. فسيتعيّن تحديث جميع العناوين. و_يمكننا_ كتابة نسختين منفصلتين من الدالة نفسها في الجوهر:</p>
<pre><code class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">update_email</span>(<span class="hljs-params">o: Student</span>):
    o.email = o.email.replace(<span class="hljs-string">&quot;.com&quot;</span>, <span class="hljs-string">&quot;.edu&quot;</span>)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">update_email2</span>(<span class="hljs-params">o: Teacher</span>):
    o.email = o.email.replace(<span class="hljs-string">&quot;.com&quot;</span>, <span class="hljs-string">&quot;.edu&quot;</span>)

</code></pre>
<p>إن كتابة الشيء نفسه عمليًا مرتين تكرار غير ضروري، ناهيك عن أنه يضاعف احتمالات حدوث الأخطاء. ولو استطعنا استخدام تابع واحد للتعامل مع نسخ من كلي الصنفين لكان ذلك تحسينًا جوهريًّا.</p>
<p>يملك الصنفان أيضًا خصائص لا تتماثل مع غيرهما. ومجرد دمج <em>كل</em> الخصائص في صنف واحد يعني أن <em>كل</em> نسخة من الصنف ستحمل بعدها خصائص غير ضرورية، تختلف باختلاف النسخ. وهذا لا يبدو وضعًا مثاليًا أيضًا.</p>
<h2 id="الوراثة">الوراثة</h2>
<p>تتسم عبّارات البرمجة الكائنية عادةً بتقنية تُسمى <em>الوراثة</em> (inheritance). ويمكن لصنف أن <em>يرث</em> خصائص صنف آخر. وإلى جانب هذه الخصائص الموروثة يستطيع الصنف أن يحتوي أيضًا على خصائص خاصة به وحده.</p>
<p>وبناءً على ما سبق، سيكون منطقيًّا أن يملك صنفا <code>Teacher</code> و<code>Student</code> صنفًا أساسيًا مشتركًا هو <code>Person</code>:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span></span>):
       <span class="hljs-variable language_">self</span>.name = name
       <span class="hljs-variable language_">self</span>.email = email

</code></pre>
<p>يحتوي الصنف الجديد على تلك الخصائص التي يشترك فيها الصنفان الآخران. والآن يستطيع <code>Student</code> و<code>Teacher</code> أن <em>يرثا</em> هذه الخصائص ويضيفا إلى جانبهما خصائصهما الخاصة.</p>
<p>تقتصر صياغة الوراثة على إضافة اسم الصنف الأساسي بين قوسين في سطر الترويسة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span></span>):
       <span class="hljs-variable language_">self</span>.name = name
       <span class="hljs-variable language_">self</span>.email = email

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">update_email_domain</span>(<span class="hljs-params">self, new_domain: <span class="hljs-built_in">str</span></span>):
       old_domain = <span class="hljs-variable language_">self</span>.email.split(<span class="hljs-string">&quot;@&quot;</span>)[<span class="hljs-number">1</span>]
       <span class="hljs-variable language_">self</span>.email = <span class="hljs-variable language_">self</span>.email.replace(old_domain, new_domain)


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>(<span class="hljs-title class_ inherited__">Person</span>):

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, <span class="hljs-built_in">id</span>: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">str</span></span>):
       <span class="hljs-variable language_">self</span>.name = name
       <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">id</span> = <span class="hljs-built_in">id</span>
       <span class="hljs-variable language_">self</span>.email = email
       <span class="hljs-variable language_">self</span>.credits = credits


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Teacher</span>(<span class="hljs-title class_ inherited__">Person</span>):

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span>, room: <span class="hljs-built_in">str</span>, teaching_years: <span class="hljs-built_in">int</span></span>):
       <span class="hljs-variable language_">self</span>.name = name
       <span class="hljs-variable language_">self</span>.email = email
       <span class="hljs-variable language_">self</span>.room = room
       <span class="hljs-variable language_">self</span>.teaching_years = teaching_years

<span class="hljs-comment"># Let&#x27;s test our classes</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
   saul = Student(<span class="hljs-string">&quot;Saul Student&quot;</span>, <span class="hljs-string">&quot;1234&quot;</span>, <span class="hljs-string">&quot;saul@example.com&quot;</span>, <span class="hljs-number">0</span>)
   saul.update_email_domain(<span class="hljs-string">&quot;example.edu&quot;</span>)
   <span class="hljs-built_in">print</span>(saul.email)

   tara = Teacher(<span class="hljs-string">&quot;Tara Teacher&quot;</span>, <span class="hljs-string">&quot;tara@example.fi&quot;</span>, <span class="hljs-string">&quot;A123&quot;</span>, <span class="hljs-number">2</span>)
   tara.update_email_domain(<span class="hljs-string">&quot;example.ex&quot;</span>)
   <span class="hljs-built_in">print</span>(tara.email)

</code></pre>
<p>يرث كلٌّ من <code>Student</code> و<code>Teacher</code> الصنف <code>Person</code>، فكلاهما يملك الخصائص المعرّفة في الصنف <code>Person</code>، بما في ذلك التابع <code>update_email_domain</code>. ويعمل التابع نفسه مع نسخ من كلي الصنفين المشتقَّين.</p>
<p>لننظر إلى مثال آخر. لدينا رفّ كتب <code>Bookshelf</code> يرث الصنف <code>BookContainer</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Book</span>:
   <span class="hljs-string">&quot;&quot;&quot; This class models a simple book &quot;&quot;&quot;</span>
   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, author: <span class="hljs-built_in">str</span></span>):
       <span class="hljs-variable language_">self</span>.name = name
       <span class="hljs-variable language_">self</span>.author = author


<span class="hljs-keyword">class</span> <span class="hljs-title class_">BookContainer</span>:
   <span class="hljs-string">&quot;&quot;&quot; This class models a container for books &quot;&quot;&quot;</span>

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
       <span class="hljs-variable language_">self</span>.books = []

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_book</span>(<span class="hljs-params">self, book: Book</span>):
       <span class="hljs-variable language_">self</span>.books.append(book)

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">list_books</span>(<span class="hljs-params">self</span>):
       <span class="hljs-keyword">for</span> book <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.books:
           <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{book.name}</span> (<span class="hljs-subst">{book.author}</span>)&quot;</span>)


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Bookshelf</span>(<span class="hljs-title class_ inherited__">BookContainer</span>):
   <span class="hljs-string">&quot;&quot;&quot; This class models a shelf for books &quot;&quot;&quot;</span>

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
       <span class="hljs-built_in">super</span>().__init__()

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_book</span>(<span class="hljs-params">self, book: Book, location: <span class="hljs-built_in">int</span></span>):
       <span class="hljs-variable language_">self</span>.books.insert(location, book)

</code></pre>
<p>يحتوي الصنف <code>Bookshelf</code> على التابع <code>add_book</code>. وهو تعريف لتابع بنفس الاسم في الصنف الأساسي <code>BookContainer</code>. ويُسمى هذا <em>إعادة التعريف</em> (overriding): إذا كان لصنف مشتق تابع بنفس الاسم الموجود في الصنف الأساسي، فإن التابع المشتق يُعيد تعريف التابع الأصلي في نسخ الصنف المشتق.</p>
<p>الفكرة في المثال أعلاه أن الكتاب المضاف إلى BookContainer يذهب دائمًا إلى الأعلى، لكن مع Bookshelf يمكنك تحديد الموقع بنفسك. ويعمل التابع <code>list_books</code> بالطريقة نفسها مع كلي الصنفين، إذ لا يوجد تابع مُعاد تعريفه في الصنف المشتق.</p>
<p>لنجرّب هذه الأصناف:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
   <span class="hljs-comment"># Create some books for testing</span>
   b1 = Book(<span class="hljs-string">&quot;Old Man and the Sea&quot;</span>, <span class="hljs-string">&quot;Ernest Hemingway&quot;</span>)
   b2 = Book(<span class="hljs-string">&quot;Silent Spring&quot;</span>, <span class="hljs-string">&quot;Rachel Carson&quot;</span>)
   b3 = Book(<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>)

   <span class="hljs-comment"># Create a BookContainer and add the books</span>
   container = BookContainer()
   container.add_book(b1)
   container.add_book(b2)
   container.add_book(b3)

   <span class="hljs-comment"># Create a Bookshelf and add the books (always to the beginning)</span>
   shelf = Bookshelf()
   shelf.add_book(b1, <span class="hljs-number">0</span>)
   shelf.add_book(b2, <span class="hljs-number">0</span>)
   shelf.add_book(b3, <span class="hljs-number">0</span>)


   <span class="hljs-comment"># Tulostetaan</span>
   <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Container:&quot;</span>)
   container.list_books()

   <span class="hljs-built_in">print</span>()

   <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Shelf:&quot;</span>)
   shelf.list_books()
</code></pre>
<pre><code>Container:
Old Man and the Sea (Ernest Hemingway)
Silent Spring (Rachel Carson)
Pride and Prejudice (Jane Austen)

Shelf:
Pride and Prejudice (Jane Austen)
Silent Spring (Rachel Carson)
Old Man and the Sea (Ernest Hemingway)
</code></pre>
<p>وبذلك يمتلك الصنف Bookshelf أيضًا وصولًا إلى التابع <code>list_books</code>. ومن خلال الوراثة يصبح التابع عضوًا في كل الأصناف المشتقّة من الصنف <code>BookContainer</code>.</p>
<h2 id="الوراثة-ونطاق-الخصائص">الوراثة ونطاق الخصائص</h2>
<p>يرث الصنف المشتق كل خصائص صنفه الأساسي. وتكون هذه الخصائص متاحة مباشرة في الصنف المشتق، ما لم تُعرَّف كخاصية خاصة في الصنف الأساسي (بوضع شرطتين سفليتين قبل اسم الخاصية).</p>
<p>وبما أن خصائص Bookshelf مطابقة لخصائص BookContainer، لم يكن هناك حاجة لإعادة كتابة باني (constructor) Bookshelf. فقد استدعينا باني الصنف الأساسي ببساطة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Bookshelf</span>(<span class="hljs-title class_ inherited__">BookContainer</span>):

   <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
       <span class="hljs-built_in">super</span>().__init__()

</code></pre>
<p>ويمكن الوصول إلى أي خاصية في الصنف الأساسي من الصنف المشتق عبر الدالة <code>super()</code>. ويُترك الوسيط <code>self</code> خارج استدعاء التابع، إذ تضيفه Python تلقائيًّا.</p>
<p>لكن ماذا لو كانت الخصائص غير متطابقة؛ هل يمكننا مع ذلك استخدام باني الصنف الأساسي بطريقة ما؟ لننظر إلى صنف اسمه <code>Thesis</code> يرث الصنف <code>Book</code>. فالصنف المشتق <em>يستطيع</em> هو أيضًا استدعاء الباني من الصنف الأساسي:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Book</span>:
    <span class="hljs-string">&quot;&quot;&quot; This class models a simple book &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, author: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.author = author


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Thesis</span>(<span class="hljs-title class_ inherited__">Book</span>):
    <span class="hljs-string">&quot;&quot;&quot; This class models a graduate thesis &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, author: <span class="hljs-built_in">str</span>, grade: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-built_in">super</span>().__init__(name, author)
        <span class="hljs-variable language_">self</span>.grade = grade

</code></pre>
<p>يستدعي الباني في الصنف <code>Thesis</code> باني الصنف الأساسي <code>Book</code> بالوساطين <code>name</code> و<code>author</code>. وإلى جانب ذلك، يضبط باني الصنف المشتق قيمة الخاصية <code>grade</code>. ولا يمكن أن يكون هذا جزءًا من باني الصنف الأساسي بطبيعة الحال، إذ لا يملك الصنف الأساسي مثل هذه الخاصية.</p>
<p>يمكن استخدام الصنف أعلاه هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    thesis = Thesis(<span class="hljs-string">&quot;Python and the Universe&quot;</span>, <span class="hljs-string">&quot;Peter Pythons&quot;</span>, <span class="hljs-number">3</span>)

    <span class="hljs-comment"># Print out the values of the attributes</span>
    <span class="hljs-built_in">print</span>(thesis.name)
    <span class="hljs-built_in">print</span>(thesis.author)
    <span class="hljs-built_in">print</span>(thesis.grade)

</code></pre>
<pre><code>Python and the Universe
Peter Pythons
3
</code></pre>
<p>حتى إذا <em>عاد تعريف</em> صنف مشتق لتابع في صنفه الأساسي، فإنه <em>يستطيع</em> هو أيضًا استدعاء التابع المُعاد تعريفه في الصنف الأساسي. في المثال التالي لدينا بطاقة مكافآت أساسية <code>BonusCard</code> وبطاقة خاصة <code>PlatinumCard</code> للعملاء الأكثر إخلاصًا. فالتابع <code>calculate_bonus</code> مُعاد تعريفه في الصنف المشتق، لكن التابع المُعاد تعريفه يستدعي التابع الأساسي:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, price: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.price = price

<span class="hljs-keyword">class</span> <span class="hljs-title class_">BonusCard</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.products_bought = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_product</span>(<span class="hljs-params">self, product: Product</span>):
        <span class="hljs-variable language_">self</span>.products_bought.append(product)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_bonus</span>(<span class="hljs-params">self</span>):
        bonus = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> product <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.products_bought:
            bonus += product.price * <span class="hljs-number">0.05</span>

        <span class="hljs-keyword">return</span> bonus

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PlatinumCard</span>(<span class="hljs-title class_ inherited__">BonusCard</span>):

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>().__init__()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">calculate_bonus</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Call the method in the base class</span>
        bonus = <span class="hljs-built_in">super</span>().calculate_bonus()

        <span class="hljs-comment"># ...and add five percent to the total</span>
        bonus = bonus * <span class="hljs-number">1.05</span>
        <span class="hljs-keyword">return</span> bonus
</code></pre>
<p>هكذا يُحسب المكافأة لبطاقة PlatinumCard باستدعاء التابع المُعاد تعريفه في الصنف الأساسي، ثم إضافة 5 بالمئة إضافية إلى النتيجة الأساسية. وهذا مثال على كيفية استخدام هذين الصنفين:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    card = BonusCard()
    card.add_product(Product(<span class="hljs-string">&quot;Bananas&quot;</span>, <span class="hljs-number">6.50</span>))
    card.add_product(Product(<span class="hljs-string">&quot;Satsumas&quot;</span>, <span class="hljs-number">7.95</span>))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product(<span class="hljs-string">&quot;Bananas&quot;</span>, <span class="hljs-number">6.50</span>))
    card2.add_product(Product(<span class="hljs-string">&quot;Satsumas&quot;</span>, <span class="hljs-number">7.95</span>))
    bonus2 = card2.calculate_bonus()

    <span class="hljs-built_in">print</span>(bonus)
    <span class="hljs-built_in">print</span>(bonus2)
</code></pre>
<pre><code>0.7225
0.7586250000000001
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: حاسوب محمول</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>Computer</code>، له الخاصيتان <code>model</code> و<code>speed</code>.</p>
</blockquote>
<p>يُرجى تعريف صنف اسمه <code>LaptopComputer</code> يَرث الصنف <code>Computer</code>. ينبغي أن يأخذ بانٍ الصنف الجديد وسيطًا ثالثًا: <code>weight</code> من نوع عدد صحيح.</p>
<p>يُرجى إضافة تابع <code>__str__</code> أيضًا إلى تعريف صنفك. راجع المثال أدناه لشكل السلسلة النصية المطبوعة المتوقّع.</p>
<pre><code class="language-python">laptop = LaptopComputer(<span class="hljs-string">&quot;NoteBook Pro15&quot;</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(laptop)
</code></pre>
<pre><code>NoteBook Pro15, 1500 MHz, 2 kg
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: متحف الألعاب</strong></p>
<p>يحتوي قالب التمرين على تعريفَي صنف لـ<code>ComputerGame</code> و<code>GameWarehouse</code>. ويُستخدم كائن GameWarehouse لتخزين كائنات ComputerGame.</p>
</blockquote>
<p>يُرجى التعرّف على هذين الصنفين. ثم عرّف صنفًا جديدًا اسمه <code>GameMuseum</code> يرث الصنف <code>GameWarehouse</code>.</p>
<p>ينبغي أن <em>يعيد تعريف</em> صنف GameMuseum التابع <code>list_games()</code>، بحيث يُرجع قائمة تضمّ فقط الألعاب التي صُنعت قبل سنة 1990.</p>
<p>ينبغي أيضًا أن يمتلك الصنف الجديد بانيًا <em>يستدعي الباني من الصنف الأب <code>GameWarehouse</code></em>. ولا يأخذ الباني أي وسيط.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار تنفيذك:</p>
<pre><code class="language-python">museum = GameMuseum()
museum.add_game(ComputerGame(<span class="hljs-string">&quot;Pacman&quot;</span>, <span class="hljs-string">&quot;Namco&quot;</span>, <span class="hljs-number">1980</span>))
museum.add_game(ComputerGame(<span class="hljs-string">&quot;GTA 2&quot;</span>, <span class="hljs-string">&quot;Rockstar&quot;</span>, <span class="hljs-number">1999</span>))
museum.add_game(ComputerGame(<span class="hljs-string">&quot;Bubble Bobble&quot;</span>, <span class="hljs-string">&quot;Taito&quot;</span>, <span class="hljs-number">1986</span>))
<span class="hljs-keyword">for</span> game <span class="hljs-keyword">in</span> museum.list_games():
    <span class="hljs-built_in">print</span>(game.name)
</code></pre>
<pre><code>Pacman
Bubble Bobble
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المساحات</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>Rectangle</code>. ويمثّل الصنف <a href="https://en.wikipedia.org/wiki/Rectangle">شكل مستطيل</a>. ويعمل Rectangle كالتالي:</p>
</blockquote>
<pre><code class="language-python">rectangle = Rectangle(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(rectangle)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;area:&quot;</span>, rectangle.area())
</code></pre>
<pre><code>rectangle 2x3
area: 6
</code></pre>
<h2 id="المربع">المربّع</h2>
<p>يُرجى تعريف صنف اسمه <code>Square</code> يرث الصنف <code>Rectangle</code>. فأضلاع <a href="https://en.wikipedia.org/wiki/Square">المربّع</a> كلها متساوية الطول، ما يجعل المربّع حالة خاصة من المستطيل. ولا ينبغي أن يحتوي الصنف الجديد على أي خاصية جديدة.</p>
<p>يُستخدم كائن Square كالتالي:</p>
<pre><code class="language-python">square = Square(<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(square)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;area:&quot;</span>, square.area())
</code></pre>
<pre><code>square 4x4
area: 16
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: لعبة الكلمات</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>WordGame</code>. وهو يوفّر بعض الوظائف الأساسية لتشغيل ألعاب قائمة على الكلمات:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">class</span> <span class="hljs-title class_">WordGame</span>():
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rounds: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.wins1 = <span class="hljs-number">0</span>
        <span class="hljs-variable language_">self</span>.wins2 = <span class="hljs-number">0</span>
        <span class="hljs-variable language_">self</span>.rounds = rounds

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">round_winner</span>(<span class="hljs-params">self, player1_word: <span class="hljs-built_in">str</span>, player2_word: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-comment"># determine a random winner</span>
        <span class="hljs-keyword">return</span> random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">play</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Word game:&quot;</span>)
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-variable language_">self</span>.rounds+<span class="hljs-number">1</span>):
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;round <span class="hljs-subst">{i}</span>&quot;</span>)
            answer1 = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;player1: &quot;</span>)
            answer2 = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;player2: &quot;</span>)

            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.round_winner(answer1, answer2) == <span class="hljs-number">1</span>:
                <span class="hljs-variable language_">self</span>.wins1 += <span class="hljs-number">1</span>
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;player 1 won&quot;</span>)
            <span class="hljs-keyword">elif</span> <span class="hljs-variable language_">self</span>.round_winner(answer1, answer2) == <span class="hljs-number">2</span>:
                <span class="hljs-variable language_">self</span>.wins2 += <span class="hljs-number">1</span>
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;player 2 won&quot;</span>)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-keyword">pass</span> <span class="hljs-comment"># it&#x27;s a tie</span>

        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;game over, wins:&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;player 1: <span class="hljs-subst">{self.wins1}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;player 2: <span class="hljs-subst">{self.wins2}</span>&quot;</span>)
</code></pre>
<p>تُلعب اللعبة كالتالي:</p>
<pre><code class="language-python">p = WordGame(<span class="hljs-number">3</span>)
p.play()
</code></pre>
<pre><code>Word game:
round 1
player1: **longword**
player2: **??**
player 2 won
round 2
player1: **i'm the best**
player2: **wut?**
player 1 won
round 3
player1: **who's gonna win**
player2: **me**
player 1 won
game over, wins:
player 1: 2
player 2: 1
</code></pre>
<p>في هذا الإصدار &quot;الأساسي&quot; من اللعبة يُحدَّد الفائز عشوائيًّا. ولا يتأثر النتيجة بأي شيء يُدخله اللاعبان.</p>
<h2 id="الكلمة-الأطول-تفوز">الكلمة الأطول تفوز</h2>
<p>يُرجى تعريف صنف اسمه <code>LongestWord</code>. وهو إصدار من اللعبة يفوز فيه من يكتب أطول كلمة في كل جولة.</p>
<p>يُنفَّذ الإصدار الجديد من اللعبة عبر <em>وراثة</em> الصنف <code>WordGame</code>. وينبغي أيضًا إعادة تعريف التابع <code>round_winner</code> على نحو مناسب. وهيكل الصنف الجديد كالتالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LongestWord</span>(<span class="hljs-title class_ inherited__">WordGame</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rounds: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-built_in">super</span>().__init__(rounds)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">round_winner</span>(<span class="hljs-params">self, player1_word: <span class="hljs-built_in">str</span>, player2_word: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-comment"># your code for determining the winner goes here</span>
</code></pre>
<p>مثال على كيفية لعب اللعبة الجديدة:</p>
<pre><code class="language-python">p = LongestWord(<span class="hljs-number">3</span>)
p.play()
</code></pre>
<pre><code>Word game:
round 1
player1: **short**
player2: **longword**
player 2 won
round 2
player1: **word**
player2: **wut?**
round 3
player1: **i'm the best**
player2: **no, me**
player 1 won
game over, wins:
player 1: 1
player 2: 1
</code></pre>
<h2 id="الأكثر-حروفا-متحركة-يفوز">الأكثر حروفًا متحرّكة يفوز</h2>
<p>يُرجى تعريف صنف WordGame آخر اسمه <code>MostVowels</code>. في هذا الإصدار من اللعبة يفوز بالجولة من نجح في إدخال عدد أكبر من الحروف المتحركة في كلمته.</p>
<h2 id="الحجر-والورقة-والمقص">الحجر والورقة والمقص</h2>
<p>وأخيرًا، يُرجى تعريف صنف اسمه <code>RockPaperScissors</code> يتيح لك لعب <a href="https://en.wikipedia.org/wiki/Rock_paper_scissors">لعبة الحجر والورقة والمقص</a>.</p>
<p>قواعد اللعبة كالتالي:</p>
<ul>
<li>يهزم الحجر المقصّ (الحجر يستطيع كسر المقص لكن المقص لا يستطيع قطع الحجر)</li>
<li>تهزم الورقة الحجر (الورقة تستطيع تغطية الحجر)</li>
<li>يهزم المقص الورقة (المقص يستطيع قطع الورقة)</li>
</ul>
<p>إذا كان مُدخَل أيّ من اللاعبين غير صالح، فقد خسر الجولة. وإذا كتب اللاعبان شيئًا غير <em>الحجر</em> أو <em>الورقة</em> أو <em>المقص</em>، كانت النتيجة تعادلًا.</p>
<p>مثال على كيفية لعب اللعبة:</p>
<pre><code class="language-python">p = RockPaperScissors(<span class="hljs-number">4</span>)
p.play()
</code></pre>
<pre><code>Word game:
round 1
player1: **rock**
player2: **rock**
round 2
player1: **rock**
player2: **paper**
player 2 won
round 3
player1: **scissors**
player2: **paper**
player 1 won
round 4
player1: **paper**
player2: **dynamite**
player 1 won
game over, wins:
player 1: 2
player 2: 1
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:o};export{s as book,a as chapter,n as chapterTitle,t as default,p as headings,o as html,l as slug,e as title};
