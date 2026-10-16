const s="mooc",a="part-9",n="الجزء 9: المزيد عن الكائنات",l="4-scope-of-methods",e="نطاق التوابع",p=[{depth:2,id:"هل-أحتاج-إلى-تابع-خاص",text:"هل أحتاج إلى تابع خاص؟"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف يمكنك تحديد مدى رؤية تابع في Python</li>
<li>ستكون قادرًا على كتابة التوابع الخاصة</li>
</ul>
</blockquote>
<p>التوابع المُعرَّفة داخل صنف يمكن إخفاؤها بالطريقة نفسها تمامًا التي أُخفيت بها الخصائص في القسم السابق. فإذا بدأ التابع بشَرطتَي سفلية <code>__</code>، فإنه لا يتوافر للعميل (client) مباشرة.</p>
<p>إذًا، فالتقنية واحدة في كلٍّ من التوابع والخصائص، لكن حالات الاستخدام تختلف عادةً قليلًا. فغالبًا ما تأتي الخصائص الخاصة مقترنةً بتوابع القراءة <code>getter</code> والكتابة <code>setter</code> للتحكم في الوصول إليها. أمّا التوابع الخاصة فإنها مخصّصة عادةً للاستخدام الداخلي فقط، بوصفها توابع مساعدة لعمليات لا يحتاج العميل إلى معرفتها.</p>
<p>يمكن استخدام التابع الخاص داخل الصنف تمامًا كما يُستخدم أي تابع آخر، مع تذكّر إضافة بادئة <code>self</code> بالطبع. فيما يلي صنف بسيط يمثّل مستلِم رسائل البريد الإلكتروني. ويتضمّن تابع مساعدًا خاصًا للتحقّق من أن عنوان البريد الإلكتروني في صيغة صالحة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Recipient</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.__check_email(email):
            <span class="hljs-variable language_">self</span>.__email = email
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The email address is not valid&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__check_email</span>(<span class="hljs-params">self, email: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-comment"># A simple check: the address must be over 5 characters long </span>
        <span class="hljs-comment"># and contain a dot and an @ character</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(email) &gt; <span class="hljs-number">5</span> <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;.&quot;</span> <span class="hljs-keyword">in</span> email <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;@&quot;</span> <span class="hljs-keyword">in</span> email
</code></pre>
<p>محاولة استدعاء التابع الخاص مباشرةً تُسبّب خطأ:</p>
<pre><code class="language-python">peter = Recipient(<span class="hljs-string">&quot;Peter Emailer&quot;</span>, <span class="hljs-string">&quot;peter@example.com&quot;</span>)
peter.__check_email(<span class="hljs-string">&quot;someone@example.com&quot;</span>)
</code></pre>
<pre><code>AttributeError: 'Recipient' object has no attribute '__check_email'
</code></pre>
<p>داخل الصنف يمكن الوصول إلى التابع بشكل طبيعي، ومن المعقول استخدامه أيضًا لتعيين قيمة جديدة لعنوان البريد. لنتضمّن توابع القراءة والكتابة لعنوان البريد الإلكتروني:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Recipient</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, email: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.__check_email(email):
            <span class="hljs-variable language_">self</span>.__email = email
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The email address is not valid&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__check_email</span>(<span class="hljs-params">self, email: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-comment"># A simple check: the address must be over 5 characters long </span>
        <span class="hljs-comment"># and contain a dot and an @ character</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(email) &gt; <span class="hljs-number">5</span> <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;.&quot;</span> <span class="hljs-keyword">in</span> email <span class="hljs-keyword">and</span> <span class="hljs-string">&quot;@&quot;</span> <span class="hljs-keyword">in</span> email

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">email</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__email

<span class="hljs-meta">    @email.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">email</span>(<span class="hljs-params">self, email: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.__check_email(email):
            <span class="hljs-variable language_">self</span>.__email = email
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The email address is not valid&quot;</span>)
</code></pre>
<blockquote>
<p><strong>نطاق Python ونطاق الأسماء</strong></p>
<p>لقد واجهنا مصطلح <em>النطاق</em> (scope) سابقًا في <a href="/arabic-cs-library/book/mooc/part-6/4-scope-of-variables">الجزء 6</a> من هذه المادّة، وعرّفناه بأنه أجزاء البرنامج التي يكون فيها اسم (متغيّر) مرئيًا. وينظر إلى المصطلح من زاوية أخرى، فيشير أيضًا إلى ما يمكن رؤيته من نقطة معيّنة في شيفرة البرنامج. ومصطلح آخر مرتبط به هو <em>نطاق الأسماء</em> (namespace)، الذي يشير إلى الأسماء المتاحة تحديدًا داخل وحدة Python مُعرَّفة، مثل تعريف صنف أو تعريف دالة.</p>
<p>النطاق داخل التابع يختلف عن النطاق داخل الصنف، وهذا بدوره يختلف عن النطاق في شيفرة العميل التي تنشئ نسخة من الصنف. فالتابع يصل إلى متغيّراته المحلية، وكذلك إلى الخصائص والتوابع الأخرى في الصنف الذي ينتمي إليه، حتى لو كانت خاصة. والصنف يصل أيضًا إلى هذه الأعضاء التابعة له، لكنه لا يستطيع الوصول مباشرة إلى المتغيّرات المحلية داخل توابعه. أمّا شيفرة العميل فلا تصل إلا إلى التوابع والخصائص العامة المُعرَّفة في الصنف، لكنها بطبيعة الحال تصل أيضًا إلى بعض الأسماء الأخرى في البيئة التي توجد فيها.</p>
<p>قد يبدو غير منطقي ألّا يكون للصنف الوصول إلى كل محتوياته، لكن ذلك ضروري لضمان التماسك. فمثلًا، قد يكون من المعقول استخدام اسم متغيّر محلي واحد في توابع مختلفة داخل الصنف نفسه، إذا كانت تلك التوابع تؤدي وظائف مشابهة بطريقة ما. ولو كان للصنف الوصول المباشر إلى كل المتغيّرات المحلية داخل التوابع، لوجبت تسميتها بأسماء مختلفة، وإلا لما كان من الواضح أي نسخة من المتغيّر يُقصَد في كل موضع. وقد رأينا سابقًا مع الخصائص المُعلَنة بـ<code>self</code> أن متغيّرات المساعدة ينبغي ألّا تُتاح خارج التابع، لذا فإن إضافة تلك المتغيّرات على هيئة خصائص أو متغيّرات عامة لا ينبغي أن تكون خيارًا. لا بدّ من وجود طريقة لإبقاء الأسماء في أجزاء البرنامج المختلفة منفصلة، وهذا ما وُجد من أجله نطاقات الأسماء.</p>
<p>فكرة نطاق الأسماء تساعد على فهم كيف يمكن لنفس الاسم أن يتعايش بسلام في دوال أو أصناف أو وحدات مختلفة في الوقت نفسه. فإذا كان الاسم محدّدًا لنطاق أسماء معيّن، كتعريف تابع مثلًا، فلن يمكن الوصول إليه مباشرةً خارج ذلك النطاق، وبالتالي لا يوجد سبب يمنع نطاق أسماء آخر من استخدام نفس الاسم. وإتقان نطاقات الأسماء والنطاقات شرط أساسي لتصبح مبرمجًا متمكّنًا، وستحصل على تدريب كثير في هذه الدورة.</p>
</blockquote>
<h2 id="هل-أحتاج-إلى-تابع-خاص">هل أحتاج إلى تابع خاص؟</h2>
<p>في المثال التالي يمثّل الصنف <code>DeckOfCards</code> رزمة من 52 ورقة لعب. ويتضمّن تابع المساعدة <code>__reset_deck</code>، الذي ينشئ رزمة أوراق جديدة مخلوطة. ويُستدعى التابع الخاص حاليًّا فقط داخل تابع الباني، لذا يمكن القول إن التنفيذ يمكن وضعه مباشرةً في الباني. غير أن استخدام تابع منفصل يجعل الشيفرة أسهل قراءة، ويتيح أيضًا الوصول إلى هذه الوظيفة لاحقًا في توابع أخرى عند الاقتضاء.</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> shuffle

<span class="hljs-keyword">class</span> <span class="hljs-title class_">DeckOfCards</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.__reset_deck()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__reset_deck</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.__deck = []
        <span class="hljs-comment"># Add all 52 cards to the deck</span>
        suits = [<span class="hljs-string">&quot;spades&quot;</span>, <span class="hljs-string">&quot;hearts&quot;</span>, <span class="hljs-string">&quot;clubs&quot;</span>, <span class="hljs-string">&quot;diamonds&quot;</span>]
        <span class="hljs-keyword">for</span> suit <span class="hljs-keyword">in</span> suits:
            <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">14</span>):
                <span class="hljs-variable language_">self</span>.__deck.append((suit, number))
        <span class="hljs-comment"># Shuffle the deck</span>
        shuffle(<span class="hljs-variable language_">self</span>.__deck)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">deal</span>(<span class="hljs-params">self, number_of_cards: <span class="hljs-built_in">int</span></span>):
        hand = []
        <span class="hljs-comment"># Move the top cards in the deck to the hand</span>
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(number_of_cards):
            hand.append(<span class="hljs-variable language_">self</span>.__deck.pop())
        <span class="hljs-keyword">return</span> hand
</code></pre>
<p>لنختبر الصنف:</p>
<pre><code class="language-python">deck = DeckOfCards()
hand1 = deck.deal(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(hand1)
hand2 = deck.deal(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(hand2)
</code></pre>
<p>وبما أن الأيدي تُولَّد عشوائيًّا، فإن ما يلي مجرد مثال لما يمكن أن يُطبع:</p>
<pre><code>[('spades', 7), ('spades', 11), ('hearts', 7), ('diamonds', 3), ('spades', 4)]
[('clubs', 8), ('spades', 12), ('diamonds', 13), ('clubs', 11), ('spades', 10)]
</code></pre>
<p>التوابع الخاصة أقلّ شيوعًا عمومًا من الخصائص الخاصة. والقاعدة العامة أن يُخفى التابع متى لم تكن لدى العميل حاجة إلى الوصول إليه مباشرة. وخاصّة حين من المحتمل أن يؤثّر العميل سلبًا على تماسك الكائن باستدعاء هذا التابع.</p>
<blockquote>
<p><strong>تمرين برمجي: رسم الخدمة</strong></p>
<p>يُرجى إنشاء صنف اسمه <code>BankAccount</code> يمثّل حسابًا مصرفيًّا. وينبغي أن يحوي الصنف</p>
</blockquote>
<ul>
<li>بانيًا يأخذ اسم المالك (سلسلة نصية)، ورقم الحساب (سلسلة نصية)، والرصيد (عدد عشري) كوسيطات</li>
<li>تابعًا <code>deposit(amount: float)</code> لإيداع المال في الحساب</li>
<li>تابعًا <code>withdraw(amount: float)</code> لسحب المال من الحساب</li>
<li>تابع قراءة اسمه <code>balance</code> يُرجع رصيد الحساب</li>
</ul>
<p>ويُرجى أيضًا تضمين التابع الخاص</p>
<ul>
<li><code>__service_charge()</code>، الذي يقلّل رصيد الحساب بنسبة مئوية واحدة. ومتى استُدعى أيٌّ من تابعَي <code>deposit</code> أو <code>withdraw</code>، ينبغي استدعاء هذا التابع أيضًا. ويُحسب رسم الخدمة ويُطرح فقط بعد اكتمال العملية الفعلية (أي بعد إضافة المبلغ المحدَّد إلى الرصيد أو طرحه منه).</li>
</ul>
<p>وينبغي أن تكون كل الخصائص البيانية داخل تعريف الصنف خاصة.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار صنفك:</p>
<pre><code class="language-python">account = BankAccount(<span class="hljs-string">&quot;Randy Riches&quot;</span>, <span class="hljs-string">&quot;12345-6789&quot;</span>, <span class="hljs-number">1000</span>)
account.withdraw(<span class="hljs-number">100</span>)
<span class="hljs-built_in">print</span>(account.balance)
account.deposit(<span class="hljs-number">100</span>)
<span class="hljs-built_in">print</span>(account.balance)

</code></pre>
<pre><code>891.0
981.09
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,p as headings,c as html,l as slug,e as title};
