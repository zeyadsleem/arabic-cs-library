const s="mooc",n="part-8",a="الجزء 8: الكائنات والصنوف",e="3-defining-classes",l="تعريف الأصناف",o=[{depth:2,id:"إضافة-باني",text:"إضافة باني"},{depth:2,id:"استخدام-كائنات-مكونة-من-أصنافك-الخاصة",text:"استخدام كائنات مكوَّنة من أصنافك الخاصة"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تعرّف أصنافك الخاصة</li>
<li>ستكون قادرًا على إنشاء كائنات بناءً على أصناف عرّفتها بنفسك</li>
<li>ستعرف كيف تكتب بانيًا</li>
<li>ستألف اسم المعامل <code>self</code></li>
<li>ستعرف ما هي الخصائص وكيف تُستخدم</li>
</ul>
</blockquote>
<p>يُعرَّف الصنف بالكلمة المفتاحية <code>class</code>. والبنية النحوية كما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">NameOfClass</span>:
    <span class="hljs-comment"># class defition goes here</span>
</code></pre>
<p>وتُسمّى الأصناف عادةً بصيغة <em>PascalCase</em>، المعروفة أيضًا بـ_UpperCamelCase_. وهذا يعني أن كل الكلمات في اسم الصنف تُكتب متصلة، بلا مسافات، ويبدأ كل منها بحرف كبير. وأسماء الأصناف التالية تتبع هذا العرف:</p>
<ul>
<li><code>Weekday</code></li>
<li><code>BankAccount</code></li>
<li><code>LibraryDatabase</code></li>
<li><code>PythonCourseGrades</code></li>
</ul>
<p>وينبغي أن يمثّل تعريف الصنف الواحد كيانًا واحدًا متكاملًا، ينبغي أن ترتبط محتوياته بعضها ببعض ارتباطًا ذرّيًّا. وفي البرامج الأكثر تعقيدًا يمكن أن تحوي الأصناف أعضاء من أصناف أخرى. فمثلًا، يمكن أن يحوي الصنف <code>Course</code> كائنات من الصنفين <code>Lecture</code> و<code>ExerciseSession</code> وهكذا.</p>
<p>ولننظر إلى هيكل تعريف صنف. الوظائف لا تزال مفقودة في هذه المرحلة.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:
    <span class="hljs-keyword">pass</span>
</code></pre>
<p>تخبر قطعة الشيفرة أعلاه Python بأننا نعرّف هنا صنفًا اسمه <code>BankAccount</code>. ولا يحوي الصنف أي وظائف بعد، لكن يمكننا مع ذلك إنشاء كائن بناءً عليه.</p>
<p>ولننظر إلى برنامج يُضاف فيه متغيّران إلى كائن <code>BankAccount</code>: وهما <code>balance</code> و<code>owner</code>. ويُسمّى أي متغيّر مرتبط بكائن <em>خاصية</em> من خصائصه، أو على وجه التحديد <em>خاصية بيانية</em>، أو أحيانًا <em>متغيّر نسخة</em>.</p>
<p>ويمكن الوصول إلى الخصائص المرتبطة بكائن من خلال الكائن:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:
    <span class="hljs-keyword">pass</span>

peters_account = BankAccount()
peters_account.owner = <span class="hljs-string">&quot;Peter Python&quot;</span>
peters_account.balance = <span class="hljs-number">5.0</span>

<span class="hljs-built_in">print</span>(peters_account.owner)
<span class="hljs-built_in">print</span>(peters_account.balance)
</code></pre>
<pre><code>Peter Python
5.0
</code></pre>
<p>والخصائص البيانية متاحة فقط من خلال الكائن المرتبطة به. ولكل كائن <code>BankAccount</code> منشأ بناءً على الصنف <code>BankAccount</code> قيمه الخاصة المسنَدة إلى الخصائص البيانية. ويمكن الوصول إلى تلك القيم بالإشارة إلى الكائن المعني:</p>
<pre><code class="language-python">account = BankAccount()
account.balance = <span class="hljs-number">155.50</span>

<span class="hljs-built_in">print</span>(account.balance) <span class="hljs-comment"># This refers to the data attribute balance attached to the account</span>
<span class="hljs-built_in">print</span>(balance) <span class="hljs-comment"># THIS CAUSES AN ERROR, as there is no such independent variable available, and the object reference is missing</span>
</code></pre>
<h2 id="إضافة-باني">إضافة باني</h2>
<p>رأينا في المثال أعلاه أنه يمكن إنشاء نسخة جديدة من صنف باستدعاء تابع باني الصنف هكذا: <code>NameOfClass()</code>. ثم أضفنا في ما سبق خصائص بيانية إلى الكائن منفصلًا، لكن من المريح أكثر غالبًا تمرير هذه القيم الأولية للخصائص مباشرة عند إنشاء الكائن. ففي المثال أعلاه كان لدينا أولًا كائن <code>BankAccount</code> بلا هذه الخصائص، ولم توجد الخصائص إلا بعد الإعلان عنها صريحًا.</p>
<p>ويؤدي الإعلان عن الخصائص خارج الباني إلى وضع يمكن أن تكون فيه للنسخ المختلفة من الصنف نفسه خصائص مختلفة. وتُنتج الشيفرة التالية خطأً لأن لدينا الآن كائن <code>BankAccount</code> آخر، هو <code>paulas_account</code>، ولا يحوي الخصائص نفسها:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:
    <span class="hljs-keyword">pass</span>

peters_account = BankAccount()
peters_account.owner = <span class="hljs-string">&quot;Peter&quot;</span>
peters_account.balance = <span class="hljs-number">1400</span>

paulas_account = BankAccount()
paulas_account.owner = <span class="hljs-string">&quot;Paula&quot;</span>

<span class="hljs-built_in">print</span>(peters_account.balance)
<span class="hljs-built_in">print</span>(paulas_account.balance) <span class="hljs-comment"># THIS CAUSES AN ERROR</span>
</code></pre>
<p>إذًا، بدلًا من الإعلان عن الخصائص بعد إنشاء كل نسخة من الصنف، تكون الفكرة الأفضل عادةً تهيئة قيم الخصائص عند استدعاء باني الصنف. ولأن تعريف الصنف <code>BankAccount</code> ليس حاليًّا سوى هيكل، فإن مفسّر Python يفترض تابع الباني ضمنيًّا، لكن من الممكن تعريف تابعات باني خاصة بك، وهذا بالضبط ما سنفعله الآن.</p>
<p>تابع الباني هو إعلان تابع باسم خاص هو <code>__init__</code>، ويُضمَّن عادةً في بداية تعريف الصنف تمامًا.</p>
<p>ولننظر إلى صنف <code>BankAccount</code> مضافًا إليه تابع باني:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-comment"># The constructor</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, balance: <span class="hljs-built_in">float</span>, owner: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.owner = owner
</code></pre>
<p>اسم تابع الباني دائمًا <code>__init__</code>. لاحظ <em>الشرطتين السفليتين على الجانبين</em> من كلمة <code>init</code>.</p>
<p>وأول معامل في تعريف الباني اسمه دائمًا <code>self</code>. ويشير هذا إلى الكائن نفسه، وهو ضروري للإعلان عن أي خصائص مرتبطة بالكائن. والإسناد</p>
<p><code>self.balance = balance</code></p>
<p>يسند الرصيد المستلم كوسيط إلى خاصية الرصيد في الكائن. ومن الأعراف الشائعة استخدام أسماء المتغيّرات نفسها للمعاملات والخصائص البيانية المعرَّفة في الباني، لكن اسمَي المتغيّرين <code>self.balance</code> و<code>balance</code> أعلاه يشيران إلى <em>متغيّرين مختلفين</em>:</p>
<ul>
<li>
<p>المتغيّر <code>self.balance</code> خاصية من خصائص الكائن. ولكل كائن <code>BankAccount</code> رصيده الخاص.</p>
</li>
<li>
<p>المتغيّر <code>balance</code> معامل في تابع الباني <code>__init__</code>. وتُضبط قيمته على القيمة الممرَّرة كوسيط إلى التابع عند استدعاء الباني (أي عند إنشاء نسخة جديدة من الصنف).</p>
</li>
</ul>
<p>والآن وقد عرّفنا معاملات تابع الباني، يمكننا تمرير القيم الأولية المرغوبة للخصائص البيانية كوسائط عند إنشاء كائن جديد:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-comment"># The constructor</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, balance: <span class="hljs-built_in">float</span>, owner: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.owner = owner

<span class="hljs-comment"># As the method is called, no argument should be given for the self parameter</span>
<span class="hljs-comment"># Python assigns the value for self automatically</span>
peters_account = BankAccount(<span class="hljs-number">100</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>)
paulas_account = BankAccount(<span class="hljs-number">20000</span>, <span class="hljs-string">&quot;Paula Pythons&quot;</span>)

<span class="hljs-built_in">print</span>(peters_account.balance)
<span class="hljs-built_in">print</span>(paulas_account.balance)
</code></pre>
<pre><code>100
20000
</code></pre>
<p>أصبح التعامل مع كائنات <code>BankAccount</code> الآن أسهل بكثير، إذ يمكن تمرير القيم عند إنشاء الكائن، ويمكن التعامل مع النسختين المستقلتين الناتجتين على نحو أكثر قابلية للتوقّع واتساقًا. كما يضمن الإعلان عن الخصائص البيانية في الباني أن الخصائص مُعلَنة فعلًا، وأن القيم الأولية المرغوبة يعطيها دائمًا المبرمج الذي يستخدم الصنف.</p>
<p>ولا يزال ممكنًا تغيير القيم الأولية للخصائص البيانية لاحقًا في البرنامج:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-comment"># The constructor</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, balance: <span class="hljs-built_in">float</span>, owner: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.owner = owner

peters_account = BankAccount(<span class="hljs-number">100</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>)
<span class="hljs-built_in">print</span>(peters_account.balance)

<span class="hljs-comment"># Change the balance to 1500</span>
peters_account.balance = <span class="hljs-number">1500</span>
<span class="hljs-built_in">print</span>(peters_account.balance)

<span class="hljs-comment"># Add 2000 to the balance</span>
peters_account.balance += <span class="hljs-number">2000</span>
<span class="hljs-built_in">print</span>(peters_account.balance)
</code></pre>
<pre><code>100
1500
3500
</code></pre>
<p>ولننظر إلى مثال آخر على الأصناف والكائنات. سنكتب صنفًا ينمذج سحبًا واحدًا لأرقام اليانصيب:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> date

<span class="hljs-keyword">class</span> <span class="hljs-title class_">LotteryDraw</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, round_week: <span class="hljs-built_in">int</span>, round_date: date, numbers: <span class="hljs-built_in">list</span></span>):
        <span class="hljs-variable language_">self</span>.round_week = round_week
        <span class="hljs-variable language_">self</span>.round_date = round_date
        <span class="hljs-variable language_">self</span>.numbers = numbers


<span class="hljs-comment"># Create a new LotteryDraw object</span>
round1 = LotteryDraw(<span class="hljs-number">1</span>, date(<span class="hljs-number">2021</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>), [<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">33</span>])

<span class="hljs-comment"># Tulostetaan tiedot</span>
<span class="hljs-built_in">print</span>(round1.round_week)
<span class="hljs-built_in">print</span>(round1.round_date)

<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> round1.numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>1
2021-01-02
1
4
8
12
13
14
33
</code></pre>
<p>وكما ترى أعلاه، يمكن أن تكون الخصائص من أي نوع. وهنا، لكل كائن LotteryDraw خصائص من النوع <code>list</code> والنوع <code>date</code>.</p>
<blockquote>
<p><strong>تمرين برمجي: الكتاب</strong></p>
<p>يُرجى كتابة صنف اسمه <code>Book</code> بالخصائص <code>name</code> و<code>author</code> و<code>genre</code> و<code>year</code>، مع باني يسند قيمًا أولية إلى هذه الخصائص.</p>
</blockquote>
<p>وينبغي أن يعمل صنفك هكذا:</p>
<pre><code class="language-python">python = Book(<span class="hljs-string">&quot;Fluent Python&quot;</span>, <span class="hljs-string">&quot;Luciano Ramalho&quot;</span>, <span class="hljs-string">&quot;programming&quot;</span>, <span class="hljs-number">2015</span>)
everest = Book(<span class="hljs-string">&quot;High Adventure&quot;</span>, <span class="hljs-string">&quot;Edmund Hillary&quot;</span>, <span class="hljs-string">&quot;autobiography&quot;</span>, <span class="hljs-number">1956</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{python.author}</span>: <span class="hljs-subst">{python.name}</span> (<span class="hljs-subst">{python.year}</span>)&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The genre of the book <span class="hljs-subst">{everest.name}</span> is <span class="hljs-subst">{everest.genre}</span>&quot;</span>)
</code></pre>
<pre><code>Luciano Ramalho: Fluent Python (2015)
The genre of the book High Adventure is autobiography
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: ثلاثة أصناف</strong></p>
<p>يُرجى كتابة الأصناف الثلاثة المحدَّدة أدناه. وينبغي أن يكون لكل صنف الأسماء والأنواع ذاتها بالضبط للخصائص المدرجة.</p>
</blockquote>
<p>ويُرجى أيضًا تضمين باني في كل صنف. وينبغي أن يأخذ الباني القيم الأولية للخصائص كوسيطات له، بالترتيب المدرج أدناه.</p>
<ol>
<li>الصنف Checklist</li>
</ol>
<ul>
<li>خاصية header (سلسلة نصية)</li>
<li>خاصية entries (قائمة)</li>
</ul>
<ol start="2">
<li>الصنف Customer</li>
</ol>
<ul>
<li>خاصية id (سلسلة نصية)</li>
<li>خاصية balance (عدد عشري)</li>
<li>خاصية discount (عدد صحيح)</li>
</ul>
<ol start="3">
<li>الصنف Cable</li>
</ol>
<ul>
<li>خاصية model (سلسلة نصية)</li>
<li>خاصية length (عدد عشري)</li>
<li>خاصية max_speed (عدد صحيح)</li>
<li>خاصية bidirectional (قيمة منطقية)</li>
</ul>
<h2 id="استخدام-كائنات-مكونة-من-أصنافك-الخاصة">استخدام كائنات مكوَّنة من أصنافك الخاصة</h2>
<p>لا تختلف الكائنات المكوَّنة من تعريفات أصنافك الخاصة عن أي كائنات Python أخرى. فيمكن تمريرها كوسائط وقيم مُعادة مثل أي كائن آخر. ويمكننا، مثلًا، كتابة بعض الدوال المساعدة للتعامل مع الحسابات المصرفية:</p>
<pre><code class="language-python"><span class="hljs-comment"># this function creates a new bank account object and returns it</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">open_account</span>(<span class="hljs-params">name: <span class="hljs-built_in">str</span></span>):
    new_account =  BankAccount(<span class="hljs-number">0</span>, name)
    <span class="hljs-keyword">return</span> new_account

<span class="hljs-comment"># this function adds the amount passed as an argument to the balance of the bank account also passed as an argument</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit_money_on_account</span>(<span class="hljs-params">account: BankAccount, amount: <span class="hljs-built_in">int</span></span>):
    account.balance += amount

peters_account = open_account(<span class="hljs-string">&quot;Peter Python&quot;</span>)
<span class="hljs-built_in">print</span>(peters_account.balance)

deposit_money_on_account(peters_account, <span class="hljs-number">500</span>)

<span class="hljs-built_in">print</span>(peters_account.balance)
</code></pre>
<pre><code>0
500
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: تعريف صنف: Pet</strong></p>
<p>يُرجى تعريف الصنف <code>Pet</code>. وينبغي أن يضمّ الصنف بانيًا يأخذ القيم الأولية للخصائص <code>name</code> و<code>species</code> و<code>year_of_birth</code> كوسيطات له، بهذا الترتيب تحديدًا.</p>
</blockquote>
<p>ويُرجى أيضًا كتابة دالة اسمها <code>new_pet(name: str, species: str, year_of_birth: int)</code> <em>خارج تعريف الصنف</em>. وينبغي للدالة أن تنشئ وتُرجع كائنًا جديدًا من نوع <code>Pet</code>، كما هو معرَّف في الصنف <code>Pet</code>.</p>
<p>ومثال على كيفية استخدام الدالة:</p>
<pre><code class="language-python">fluffy = new_pet(<span class="hljs-string">&quot;Fluffy&quot;</span>, <span class="hljs-string">&quot;dog&quot;</span>, <span class="hljs-number">2017</span>)
<span class="hljs-built_in">print</span>(fluffy.name)
<span class="hljs-built_in">print</span>(fluffy.species)
<span class="hljs-built_in">print</span>(fluffy.year_of_birth)
</code></pre>
<pre><code>Fluffy
dog
2017
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الكتاب الأقدم</strong></p>
<p>يُرجى كتابة دالة اسمها <code>older_book(book1: Book, book2: Book)</code> تأخذ كائنين من نوع <code>Book</code> كوسيطين لها. وينبغي للدالة أن تطبع رسالة بتفاصيل الكتاب الأقدم منهما. وينبغي أن تطبع رسالة مختلفة إذا كُتب الكتابان في السنة نفسها. يُرجى الاطلاع على الأمثلة أدناه.</p>
</blockquote>
<pre><code class="language-python">python = Book(<span class="hljs-string">&quot;Fluent Python&quot;</span>, <span class="hljs-string">&quot;Luciano Ramalho&quot;</span>, <span class="hljs-string">&quot;programming&quot;</span>, <span class="hljs-number">2015</span>)
everest = Book(<span class="hljs-string">&quot;High Adventure&quot;</span>, <span class="hljs-string">&quot;Edmund Hillary&quot;</span>, <span class="hljs-string">&quot;autobiography&quot;</span>, <span class="hljs-number">1956</span>)
norma = Book(<span class="hljs-string">&quot;Norma&quot;</span>, <span class="hljs-string">&quot;Sofi Oksanen&quot;</span>, <span class="hljs-string">&quot;crime&quot;</span>, <span class="hljs-number">2015</span>)

older_book(python, everest)
older_book(python, norma)
</code></pre>
<pre><code>High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: كتب من نوع أدبي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>books_of_genre(books: list, genre: str)</code> تأخذ قائمة من الكائنات من نوع <code>Book</code> وسلسلة نصية تمثّل نوعًا أدبيًّا كوسيطين لها.</p>
</blockquote>
<p>وينبغي للدالة أن تُرجع قائمة <em>جديدة</em> تحوي الكتب ذات النوع الأدبي المطلوب من القائمة الأصلية. يُرجى الاطلاع على الأمثلة أدناه.</p>
<pre><code class="language-python">python = Book(<span class="hljs-string">&quot;Fluent Python&quot;</span>, <span class="hljs-string">&quot;Luciano Ramalho&quot;</span>, <span class="hljs-string">&quot;programming&quot;</span>, <span class="hljs-number">2015</span>)
everest = Book(<span class="hljs-string">&quot;High Adventure&quot;</span>, <span class="hljs-string">&quot;Edmund Hillary&quot;</span>, <span class="hljs-string">&quot;autobiography&quot;</span>, <span class="hljs-number">1956</span>)
norma = Book(<span class="hljs-string">&quot;Norma&quot;</span>, <span class="hljs-string">&quot;Sofi Oksanen&quot;</span>, <span class="hljs-string">&quot;crime&quot;</span>, <span class="hljs-number">2015</span>)

books = [python, everest, norma, Book(<span class="hljs-string">&quot;The Snowman&quot;</span>, <span class="hljs-string">&quot;Jo Nesbø&quot;</span>, <span class="hljs-string">&quot;crime&quot;</span>, <span class="hljs-number">2007</span>)]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Books in the crime genre:&quot;</span>)
<span class="hljs-keyword">for</span> book <span class="hljs-keyword">in</span> books_of_genre(books, <span class="hljs-string">&quot;crime&quot;</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{book.author}</span>: <span class="hljs-subst">{book.name}</span>&quot;</span>)
</code></pre>
<pre><code>Books in the crime genre:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman
</code></pre>
`,p={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:o,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,o as headings,c as html,e as slug,l as title};
