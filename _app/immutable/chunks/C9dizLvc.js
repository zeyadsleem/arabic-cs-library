const s="mooc",n="part-9",a="الجزء 9: المزيد عن الكائنات",l="3-encapsulation",e="التغليف",p=[{depth:2,id:"التغليف",text:"التغليف"},{depth:2,id:"ملاحظة-قصيرة-حول-الخصائص-الخاصة-وpython-والبرمجة-الكائنية",text:"ملاحظة قصيرة حول الخصائص الخاصة وPython والبرمجة الكائنية"},{depth:2,id:"الدوال-القارئة-والكاتبة-getters-and-setters",text:"الدوال القارئة والكاتبة (getters and setters)"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما يعنيه التغليف</li>
<li>ستتمكن من إنشاء خصائص خاصة</li>
<li>ستعرف كيفية إنشاء دوال قارئة وكاتبة لخصائصك</li>
</ul>
</blockquote>
<p>في البرمجة الكائنية يشير مصطلح <em>العميل (client)</em> إلى برنامج يستخدم صنفًا أو نماذج من صنف. ويقدّم الصنف للعميل <em>خدمات</em> يمكن للعميل من خلالها الوصول إلى الكائنات المُنشأة بناءً على الصنف. والأهداف هنا هي أن</p>
<ol>
<li>
<p>يكون استخدام الصنف و/أو الكائنات بأبسط صورة ممكنة من وجهة نظر العميل</p>
</li>
<li>
<p>تُصان <em>سلامة</em> أي كائن في جميع الأوقات</p>
</li>
</ol>
<p>تعني سلامة الكائن أن <em>حالة</em> الكائن تبقى مقبولة دائمًا. وفي الممارسة العملية يعني ذلك أن قيم خصائص الكائن تكون مقبولة دائمًا. فمثلًا، لا ينبغي أن يملك كائن يمثّل تاريخًا قيمة 13 للشهر أبدًا، ولا ينبغي أن يملك كائن يمثّل طالبًا رقمًا سالبًا كقيمة للنقاط الدراسية المكتسبة، وما شابه ذلك.</p>
<p>لننظر إلى صنف يسمى Student:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, student_number: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.student_number = student_number
        <span class="hljs-variable language_">self</span>.study_credits = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_credits</span>(<span class="hljs-params">self, study_credits</span>):
        <span class="hljs-keyword">if</span> study_credits &gt; <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.study_credits += study_credits
</code></pre>
<p>يقدّم الكائن <code>Student</code> لعملائه التابع <code>add_credits</code>، الذي يسمح للعميل بإضافة عدد محدّد من النقاط إلى مجموع نقاط الطالب. ويتأكّد التابع من أن القيمة الممرورة كوساط أكبر من صفر. وتضيف الشيفرة التالية نقاطًا دراسية في ثلاث مناسبات:</p>
<pre><code class="language-python">sally = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>, <span class="hljs-string">&quot;12345&quot;</span>)
sally.add_credits(<span class="hljs-number">5</span>)
sally.add_credits(<span class="hljs-number">5</span>)
sally.add_credits(<span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Study credits:&quot;</span>, sally.study_credits)
</code></pre>
<pre><code>Study credits: 20
</code></pre>
<p>رغم وجود تعريف التابع، لا يزال من الممكن الوصول إلى الخاصية <code>study_credits</code> مباشرة. وقد يؤدي ذلك إلى حالة خاطئة تُفقد فيها سلامة الكائن:</p>
<pre><code class="language-python">sally = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>, <span class="hljs-string">&quot;12345&quot;</span>)
sally.study_credits = -<span class="hljs-number">100</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Study credits:&quot;</span>, sally.study_credits)
</code></pre>
<pre><code>Study credits: -100
</code></pre>
<h2 id="التغليف">التغليف <span class="content-anchor" id="encapsulation"></span></h2>
<p>من السمات الشائعة في لغات البرمجة الكائنية أن الأصناف تستطيع عادةً إخفاء خصائصها عن أي عملاء محتملين. وتُسمّى الخصائص المخفية عادةً <em>خاصة</em>. وفي Python تُحقق هذه الخصوصية بإضافة شرطتين سفليتين <code>__</code> إلى بداية اسم الخاصية:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CreditCard</span>:
    <span class="hljs-comment"># the attribute number is private, while the attribute name is accessible</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, number: <span class="hljs-built_in">str</span>, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.__number = number
        <span class="hljs-variable language_">self</span>.name = name
</code></pre>
<p>الخاصية الخاصة غير مرئية مباشرة للعميل. ومحاولة الإشارة إليها تُسبّب خطأ. في المثال أعلاه يمكن الوصول إلى الخاصية <code>name</code> وتعديلها بسهولة:</p>
<pre><code class="language-python">card = CreditCard(<span class="hljs-string">&quot;123456&quot;</span>,<span class="hljs-string">&quot;Randy Riches&quot;</span>)
<span class="hljs-built_in">print</span>(card.name)
card.name = <span class="hljs-string">&quot;Charlie Churchmouse&quot;</span>
<span class="hljs-built_in">print</span>(card.name)
</code></pre>
<pre><code>Randy Riches
Charlie Churchmouse
</code></pre>
<p>لكن محاولة طباعة رقم البطاقة تُسبّب خطأ:</p>
<pre><code class="language-python">card = CreditCard(<span class="hljs-string">&quot;123456&quot;</span>,<span class="hljs-string">&quot;Randy Riches&quot;</span>)
<span class="hljs-built_in">print</span>(card.__number)
</code></pre>
<pre><code>AttributeError: 'CreditCard' object has no attribute '__number'
</code></pre>
<p>يُسمّى إخفاء الخصائص عن العملاء <em>التغليف</em>. وكما يوحي الاسم، فإن الخاصية تُوضع «داخل كبسولة». ثم يُقدَّم للعميل واجهة مناسبة للوصول إلى البيانات المخزّنة في الكائن ومعالجتها.</p>
<p>لنضف خاصية مُغلَّفة أخرى: الرصيد على بطاقة الاعتماد. وفي المرة هذه سنضيف أيضًا توابع مرئية علنًا تسمح للعميل بالوصول إلى الرصيد وتعديله:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CreditCard</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, number: <span class="hljs-built_in">str</span>, name: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__number = number
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.__balance = balance

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit_money</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">if</span> amount &gt; <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__balance += amount

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">withdraw_money</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">if</span> amount &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> amount &lt;= <span class="hljs-variable language_">self</span>.__balance:
            <span class="hljs-variable language_">self</span>.__balance -= amount

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_balance</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__balance
</code></pre>
<pre><code class="language-python">card = CreditCard(<span class="hljs-string">&quot;123456&quot;</span>, <span class="hljs-string">&quot;Randy Riches&quot;</span>, <span class="hljs-number">5000</span>)
<span class="hljs-built_in">print</span>(card.retrieve_balance())
card.deposit_money(<span class="hljs-number">100</span>)
<span class="hljs-built_in">print</span>(card.retrieve_balance())
card.withdraw_money(<span class="hljs-number">500</span>)
<span class="hljs-built_in">print</span>(card.retrieve_balance())
<span class="hljs-comment"># The following will not work because the balance is not sufficient</span>
card.withdraw_money(<span class="hljs-number">10000</span>)
<span class="hljs-built_in">print</span>(card.retrieve_balance())
</code></pre>
<pre><code>5000
5100
4600
4600
</code></pre>
<p>لا يمكن تعديل الرصيد مباشرة لأن الخاصية خاصة، لكننا أضفنا التابعين <code>deposit_money</code> و<code>withdraw_money</code> لتغيير القيمة. ويعيد التابع <code>retrieve_balance</code> القيمة المخزّنة في الرصيد. ويتضمن التابعان بعض الفحوصات الأولية للحفاظ على سلامة الكائن: فمثلًا، لا يمكن سحب أكثر من الرصيد المتوفّر في البطاقة.</p>
<blockquote>
<p><strong>تمرين برمجي: السيارة</strong></p>
<p>يُرجى تنفيذ صنف يسمى <code>Car</code> يحتوي على متغيّرين <em>مُغلَّفيْن</em> خاصين: كمية البنزين في الخزان (من 0 إلى 60 لترًا) وقراءة العدّاد (بالكيلومتر). تستهلك السيارة لترًا واحدًا من البنزين لكل كيلومتر.</p>
</blockquote>
<p>يجب أن يحتوي الصنف أيضًا على التابعين التاليين:</p>
<ul>
<li><code>fill_up()</code> الذي يملأ الخزان</li>
<li><code>drive(km:int)</code> الذي يقود السيارة للمسافة المحدَّدة، أو لمدّة ما يسمح به البنزين في الخزان</li>
<li><code>__str__</code> الذي يُرجع تمثيلًا نصيًا للسيارة وفق الأمثلة أدناه</li>
</ul>
<p>مثال على كيفية استخدام الصنف:</p>
<pre><code class="language-python">car = Car()
<span class="hljs-built_in">print</span>(car)
car.fill_up()
<span class="hljs-built_in">print</span>(car)
car.drive(<span class="hljs-number">20</span>)
<span class="hljs-built_in">print</span>(car)
car.drive(<span class="hljs-number">50</span>)
<span class="hljs-built_in">print</span>(car)
car.drive(<span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(car)
car.fill_up()
car.fill_up()
<span class="hljs-built_in">print</span>(car)
</code></pre>
<pre><code>Car: odometer reading 0 km, petrol remaining 0 litres
Car: odometer reading 0 km, petrol remaining 60 litres
Car: odometer reading 20 km, petrol remaining 40 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 60 litres
</code></pre>
<p><strong>ملاحظة:</strong> يُطلب منك تغليف كمية البنزين المتبقية وقراءة العدّاد. ينبغي ألّا يكون من الممكن الوصول إليهما مباشرة من خارج توابع الصنف نفسه.</p>
<h2 id="ملاحظة-قصيرة-حول-الخصائص-الخاصة-وpython-والبرمجة-الكائنية">ملاحظة قصيرة حول الخصائص الخاصة وPython والبرمجة الكائنية</h2>
<p>توجد طرق لتجاوز رمز الشرطتين السفليتين <code>__</code> المستعمل لإخفاء الخصائص، قد تصادفها إذا بحثت عن موارد عبر الإنترنت. ولا توجد أي خاصية في Python حقيقية الخصوصية، وهذا مقصود من جانب مُنشئي Python. ومن ناحية أخرى، يُتوقّع من المبرمج المتمكّن عمومًا احترام إرشادات الرؤية المحدَّدة في الأصناف، ويتطلب تجاوزها جهدًا خاصًا. وفي لغات برمجة كائنية أخرى مثل Java، غالبًا ما تكون المتغيّرات الخاصة مخفية حقًا، ومن الأفضل أن تعتبر متغيّرات Python الخاصة كذلك.</p>
<h2 id="الدوال-القارئة-والكاتبة-getters-and-setters">الدوال القارئة والكاتبة (getters and setters) <span class="content-anchor" id="getters-and-setters"></span></h2>
<p>في البرمجة الكائنية، تُسمّى التوابع المخصّصة للوصول إلى الخصائص وتعديلها عادةً <em>دوال قارئة</em> (getters) و_دوال كاتبة_ (setters). لا يستخدم جميع مبرمجي Python مصطلحي &quot;قارئ&quot; و&quot;كاتب&quot;، لكن مفهوم <em>الخصائص (properties)</em> المبيَّن أدناه مشابه جدًا، ولهذا سنستخدم هنا مصطلحات البرمجة الكائنية المقبولة عمومًا.</p>
<p>إذًا، أنشأنا أعلاه بعض التوابع العامة للوصول إلى الخصائص الخاصة، لكن هناك طريقة أكثر مباشرة و&quot;بايثونية&quot; للوصول إلى الخصائص. لننظر إلى صنف بسيط يسمى <code>Wallet</code> بخاصية خاصة واحدة هي <code>money</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Wallet</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.__money = <span class="hljs-number">0</span>
</code></pre>
<p>يمكننا إضافة تابع قارئ وتابع كاتب للوصول إلى الخاصية الخاصة باستخدام المُزيّن <code>@property</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Wallet</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.__money = <span class="hljs-number">0</span>

    <span class="hljs-comment"># A getter method</span>
<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">money</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__money

    <span class="hljs-comment"># A setter method</span>
<span class="hljs-meta">    @money.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">money</span>(<span class="hljs-params">self, money</span>):
        <span class="hljs-keyword">if</span> money &gt;= <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__money = money
</code></pre>
<p>أولًا، نعرّف تابعًا قارئًا يُرجع كمية المال الموجودة في المحفظة حاليًا. ثم نعرّف تابعًا كاتبًا يضبط قيمة جديدة للخاصية money مع التأكد من أن القيمة الجديدة ليست سالبة.</p>
<p>يمكن استخدام التابعين الجديدين هكذا:</p>
<pre><code class="language-python">wallet = Wallet()
<span class="hljs-built_in">print</span>(wallet.money)

wallet.money = <span class="hljs-number">50</span>
<span class="hljs-built_in">print</span>(wallet.money)

wallet.money = -<span class="hljs-number">30</span>
<span class="hljs-built_in">print</span>(wallet.money)
</code></pre>
<pre><code>0
50
50
</code></pre>
<p>من وجهة نظر العميل، لا يختلف استخدام هذين التابعين الجديدَين عن الوصول المباشر إلى خاصية. الأقواس غير ضرورية؛ بل من المقبول تمامًا كتابة <code>wallet.money = 50</code>، وكأننا نُسند قيمة إلى متغيّر ببساطة. والغرض فعلًا كان إخفاء (أي تغليف) التنفيذ الداخلي للخاصية مع تقديم طريقة سهلة للوصول إلى البيانات المخزّنة في الكائن وتعديلها.</p>
<p>في المثال السابق مشكلة صغيرة: لا يُبلَّغ العميل بفشل ضبط قيمة سالبة للخاصية money. وحين تكون القيمة المُقدَّمة خاطئة بوضوح، فمن الجيد عادةً رفع استثناء (raise) وإبلاغ العميل بذلك. وفي هذه الحالة، ينبغي على الأرجح أن يكون الاستثناء من النوع <code>ValueError</code> للإشارة إلى أن القيمة المُقدَّمة غير مقبولة.</p>
<p>إليك نسخة محسّنة من الصنف، مع بعض الشيفرة لاختبارها:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Wallet</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.__money = <span class="hljs-number">0</span>

    <span class="hljs-comment"># A getter method</span>
<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">money</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__money

    <span class="hljs-comment"># A setter method</span>
<span class="hljs-meta">    @money.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">money</span>(<span class="hljs-params">self, money</span>):
        <span class="hljs-keyword">if</span> money &gt;= <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__money = money
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The amount must not be below zero&quot;</span>)
</code></pre>
<pre><code class="language-python">wallet.money = -<span class="hljs-number">30</span>
<span class="hljs-built_in">print</span>(wallet.money)
</code></pre>
<pre><code>ValueError: The amount must not be below zero
</code></pre>
<p><strong>ملاحظة:</strong> يجب أن يُعرَض التابع القارئ، أي المُزيّن <code>@property</code>، قبل التابع الكاتب، وإلا حدث خطأ عند تنفيذ الصنف. وذلك لأن المُزيّن <code>@property</code> يعرّف اسم &quot;الخاصية&quot; المقدَّمة للعميل. أما التابع الكاتب المُضاف بـ<code>.setter</code> فيضيف إليه وظيفة جديدة ببساطة.</p>
<blockquote>
<p><strong>تمرين برمجي: التسجيل</strong></p>
<p>يُرجى إنشاء صنف يسمى <code>Recording</code> يمثّل تسجيلًا واحدًا. يجب أن يحتوي الصنف على متغيّر خاص واحد: <code>__length</code> من النوع عدد صحيح.</p>
</blockquote>
<p>يُرجى تنفيذ ما يلي:</p>
<ul>
<li>مُنشئ يأخذ الطول كوساط</li>
<li>تابع قارئ <code>length</code> يُرجع طول التسجيل</li>
<li>تابع كاتب يضبط طول التسجيل</li>
</ul>
<p>ينبغي أن يكون من الممكن استخدام الصنف كما يلي:</p>
<pre><code class="language-python">the_wall = Recording(<span class="hljs-number">43</span>)
<span class="hljs-built_in">print</span>(the_wall.length)
the_wall.length = <span class="hljs-number">44</span>
<span class="hljs-built_in">print</span>(the_wall.length)
</code></pre>
<pre><code>43
44
</code></pre>
<p>إذا كانت قيمة الوسيط في المُنشئ أو التابع الكاتب أقل من صفر، فهذا ينبغي أن يرفع استثناء <code>ValueError</code>.</p>
<p>إذا كنت بحاجة إلى تذكير برفع الاستثناءات، يُرجى الاطلاع على <a href="/arabic-cs-library/book/mooc/part-6/3-errors#raising-exceptions">الجزء 6</a> من مادة الدورة.</p>
<p>في المثال التالي صنف بخاصيتين خاصتين، مع دوال قارئة وكاتبة لكل منهما. يُرجى تجربة البرنامج بقيم مختلفة تُمرَّر كوسائط:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Player</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, player_number: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-variable language_">self</span>.__player_number = player_number

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__name

<span class="hljs-meta">    @name.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-keyword">if</span> name != <span class="hljs-string">&quot;&quot;</span>:
            <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The name may not be an empty string&quot;</span>)

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">player_number</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__player_number

<span class="hljs-meta">    @player_number.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">player_number</span>(<span class="hljs-params">self, player_number: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-keyword">if</span> player_number &gt; <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__player_number = player_number
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The player number must be a positive integer&quot;</span>)
</code></pre>
<pre><code class="language-python">player = Player(<span class="hljs-string">&quot;Betty Ballmer&quot;</span>, <span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(player.name)
<span class="hljs-built_in">print</span>(player.player_number)

player.name = <span class="hljs-string">&quot;Buster Ballmer&quot;</span>
player.player_number = <span class="hljs-number">11</span>
<span class="hljs-built_in">print</span>(player.name)
<span class="hljs-built_in">print</span>(player.player_number)
</code></pre>
<pre><code>Betty Ballmer
10
Buster Ballmer
11
</code></pre>
<p>ولإنهاء هذا القسم، لننظر إلى صنف يمثّل دفتر ملاحظات بسيطًا. جميع الخصائص خاصة، لكنها تُدار عبر واجهات مختلفة: لمُالك الدفتر دوال قارئة وكاتبة، أما مُدخَلات الدفتر فتُعالَج بتوابع &quot;تقليدية&quot;. وفي هذه الحالة، من المعقول منع العميل من كل وصول إلى بنية البيانات الداخلية للدفتر. فالتوابع العامة وحدها مرئية مباشرة للعميل.</p>
<p>يضمن التغليف أيضًا أن التنفيذ الداخلي للصنف يمكن تغييره بحرية، شريطة أن تبقى الواجهة العامة سليمة. ولا يجب على العميل أن يعرف أو يهتم بما إذا كانت بنية البيانات الداخلية تستند إلى قوائم أو قواميس أو شيء مختلف تمامًا.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Diary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, owner: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.__owner = owner
        <span class="hljs-variable language_">self</span>.__entries = []

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">owner</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__owner

<span class="hljs-meta">    @owner.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">owner</span>(<span class="hljs-params">self, owner</span>):
        <span class="hljs-keyword">if</span> owner != <span class="hljs-string">&quot;&quot;</span>:
            <span class="hljs-variable language_">self</span>.__owner = owner
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The owner may not be an empty string&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_entry</span>(<span class="hljs-params">self, entry: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.__entries.append(entry)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print_entries</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;A total of&quot;</span>, <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.__entries), <span class="hljs-string">&quot;entries&quot;</span>)
        <span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.__entries:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;- &quot;</span> + entry)
</code></pre>
<pre><code class="language-python">diary = Diary(<span class="hljs-string">&quot;Peter&quot;</span>)
diary.add_entry(<span class="hljs-string">&quot;Today I ate porridge&quot;</span>)
diary.add_entry(<span class="hljs-string">&quot;Today I learned object oriented programming&quot;</span>)
diary.add_entry(<span class="hljs-string">&quot;Today I went to bed early&quot;</span>)
diary.print_entries()
</code></pre>
<pre><code>A total of 3 entries
- Today I ate porridge
- Today I learned object oriented programming
- Today I went to bed early
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: محطة الطقس</strong></p>
<p>يُرجى إنشاء صنف يسمى <code>WeatherStation</code> يُستخدم لتخزين ملاحظات عن الطقس. يجب أن يحتوي الصنف على الخصائص العامة التالية:</p>
</blockquote>
<ul>
<li>مُنشئ يأخذ اسم المحطة كوساط</li>
<li>تابع يسمى <code>add_observation(observation: str)</code> يضيف ملاحظة كآخر مُدخَل في قائمة</li>
<li>تابع يسمى <code>latest_observation()</code> يُرجع آخر ملاحظة أُضيفت إلى القائمة. وإذا لم تكن هناك ملاحظات بعد، يجب أن يُرجع <em>سلسلة نصية فارغة</em>.</li>
<li>تابع يسمى <code>number_of_observations()</code> يُرجع العدد الإجمالي للملاحظات المُضافة</li>
<li>تابع <code>__str__</code> يُرجع اسم المحطة والعدد الإجمالي للملاحظات المُضافة وفق المثال أدناه.</li>
</ul>
<p>يجب أن تكون جميع الخصائص مُغلَّفة بحيث لا يمكن الوصول إليها مباشرة. وطريقة تنفيذ الصنف راجعة إليك، ما دامت الواجهة العامة مطابقة تمامًا للموصوف أعلاه.</p>
<p>مثال على كيفية استخدام الصنف:</p>
<pre><code class="language-python">station = WeatherStation(<span class="hljs-string">&quot;Houston&quot;</span>)
station.add_observation(<span class="hljs-string">&quot;Rain 10mm&quot;</span>)
station.add_observation(<span class="hljs-string">&quot;Sunny&quot;</span>)
<span class="hljs-built_in">print</span>(station.latest_observation())

station.add_observation(<span class="hljs-string">&quot;Thunderstorm&quot;</span>)
<span class="hljs-built_in">print</span>(station.latest_observation())

<span class="hljs-built_in">print</span>(station.number_of_observations())
<span class="hljs-built_in">print</span>(station)
</code></pre>
<pre><code>Sunny
Thunderstorm
3
Houston, 3 observations
</code></pre>
`,r={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,r as default,p as headings,t as html,l as slug,e as title};
