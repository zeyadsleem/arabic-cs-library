const s="mooc",n="part-8",a="الجزء 8: الكائنات والصنوف",e="4-defining-methods",l="تعريف التوابع",p=[{depth:2,id:"التوابع-في-الأصناف",text:"التوابع في الأصناف"},{depth:2,id:"التغليف",text:"التغليف"},{depth:3,id:"إنقاص-قيمة-العداد",text:"إنقاص قيمة العدّاد"},{depth:3,id:"يجب-ألا-تكون-قيمة-العداد-سالبة",text:"يجب ألّا تكون قيمة العدّاد سالبة"},{depth:3,id:"ضبط-القيمة-على-صفر",text:"ضبط القيمة على صفر"},{depth:3,id:"إعادة-ضبط-العداد",text:"إعادة ضبط العدّاد"},{depth:3,id:"عد-الأعداد",text:"عدّ الأعداد"},{depth:3,id:"المجموع-والمتوسط",text:"المجموع والمتوسط"},{depth:3,id:"مدخل-المستخدم",text:"مُدخَل المستخدم"},{depth:3,id:"مجاميع-متعددة",text:"مجاميع متعدّدة"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تعمل توابع الصنف</li>
<li>ستكون قادرًا على كتابة توابع جديدة في أصنافك الخاصة</li>
<li>ستفهم مفهومي التغليف والعميل في البرمجة كائنية التوجّه</li>
</ul>
</blockquote>
<p>الصنوف التي لا تحتوي إلا على خصائص بيانات لا تختلف كثيرًا عن القواميس. وستجد أدناه طريقتين لتمثيل حساب مصرفي، الأولى بتعريف صنف، ثم باستخدام قاموس.</p>
<pre><code class="language-python"><span class="hljs-comment"># Example 1: bank account with class definition</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, account_number: <span class="hljs-built_in">str</span>, owner: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span>, annual_interest: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.account_number = account_number
        <span class="hljs-variable language_">self</span>.owner = owner
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.annual_interest = annual_interest

peters_account = BankAccount(<span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.015</span>)
</code></pre>
<pre><code class="language-python"><span class="hljs-comment"># Example 2: bank account with dictionary</span>
peters_account = {<span class="hljs-string">&quot;account_number&quot;</span>: <span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;owner&quot;</span>: <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;balance&quot;</span>: <span class="hljs-number">1500.0</span>, <span class="hljs-string">&quot;annual_interest&quot;</span>: <span class="hljs-number">0.015</span>}
</code></pre>
<p>مع القاموس يكون التنفيذ أقصر بكثير وأكثر مباشرة. أما مع الصنف فالبنية أكثر «إحكامًا»، بحيث يمكننا أن نتوقّع أن تكون كل كائنات <code>BankAccount</code> متشابهة في البنية. والصنف يحمل اسمًا أيضًا. فيُشار إلى الصنف <code>BankAccount</code> عند إنشاء حساب مصرفي جديد، ويكون نوع الكائن <code>BankAccount</code> لا <code>dict</code>.</p>
<p>ومن المزايا المهمّة الأخرى للأصناف أنها، إضافة إلى البيانات، يمكن أن تحتوي على وظائف. ومن المبادئ الموجِّهة في البرمجة كائنية التوجّه أن الكائن يُستخدم للوصول إلى كلٍّ من البيانات المرتبطة بالكائن والوظائف اللازمة لمعالجة تلك البيانات.</p>
<h2 id="التوابع-في-الأصناف">التوابع في الأصناف</h2>
<p>التابع هو برنامج فرعي أو دالة مرتبطة بصنف معيّن. وعادةً لا يؤثر التابع إلا في كائن واحد. ويُعرَّف التابع داخل تعريف الصنف، ويمكنه الوصول إلى خصائص بيانات الصنف تمامًا مثل أي متغيّر آخر.</p>
<p>لنواصل مع الصنف <code>BankAccount</code> الذي قدّمناه أعلاه. ولدينا أدناه تابع جديد يضيف الفائدة إلى الحساب:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, account_number: <span class="hljs-built_in">str</span>, owner: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span>, annual_interest: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.account_number = account_number
        <span class="hljs-variable language_">self</span>.owner = owner
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.annual_interest = annual_interest

    <span class="hljs-comment"># This method adds the annual interest to the balance of the account</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_interest</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.balance += <span class="hljs-variable language_">self</span>.balance * <span class="hljs-variable language_">self</span>.annual_interest


peters_account = BankAccount(<span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.015</span>)
peters_account.add_interest()
<span class="hljs-built_in">print</span>(peters_account.balance)
</code></pre>
<pre><code>1522.5
</code></pre>
<p>يضرب التابع <code>add_interest</code> رصيد الحساب في نسبة الفائدة السنوية، ثم يضيف الناتج إلى الرصيد الحالي. ولا يعمل التابع إلا على الكائن الذي استُدعي عليه.</p>
<p>لنرَ كيف يعمل ذلك حين نكون قد أنشأنا عدّة نسخ من الصنف:</p>
<pre><code class="language-python"><span class="hljs-comment"># The class BankAccount is defined in the previous example</span>

peters_account = BankAccount(<span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.015</span>)
paulas_account = BankAccount(<span class="hljs-string">&quot;99999-999&quot;</span>, <span class="hljs-string">&quot;Paula Pythonen&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.05</span>)
pippas_account = BankAccount(<span class="hljs-string">&quot;1111-222&quot;</span>, <span class="hljs-string">&quot;Pippa Programmer&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.001</span>)

<span class="hljs-comment"># Add interest on Peter&#x27;s and Paula&#x27;s accounts, but not on Pippa&#x27;s</span>
peters_account.add_interest()
paulas_account.add_interest()

<span class="hljs-comment"># Print all account balances</span>
<span class="hljs-built_in">print</span>(peters_account.balance)
<span class="hljs-built_in">print</span>(paulas_account.balance)
<span class="hljs-built_in">print</span>(pippas_account.balance)
</code></pre>
<pre><code>1522.5
1575.0
1500.0
</code></pre>
<p>وكما ترى أعلاه، لا تُضاف الفائدة السنوية إلا إلى الحسابات التي استُدعي التابع عليها. ولأن نسب الفائدة السنوية مختلفة في حسابَي Peter وPaula، فإن النتائج تختلف في هذين الحسابين. أما رصيد حساب Pippa فلا يتغيّر، لأن التابع <code>add_interest</code> لم يُستدعَ على الكائن <code>pippas_account</code>.</p>
<h2 id="التغليف">التغليف <span class="content-anchor" id="encapsulation"></span></h2>
<p>في البرمجة كائنية التوجّه تظهر كلمة <em>العميل</em> من حين إلى آخر. ويُقصد بها قسم من الشيفرة ينشئ كائنًا ويستخدم الخدمة التي توفّرها توابعه. وعندما تُستخدم البيانات التي يحتويها كائن عبر التوابع التي يوفّرها فقط، يُضمن <em>التكامل الداخلي</em> للكائن. وعمليًا يعني هذا أن صنف <code>BankAccount</code> مثلًا يوفّر توابع للتعامل مع خاصية <code>balance</code>، فلا يصل العميل إلى الرصيد مباشرةً أبدًا. ويمكن لهذه التوابع حينها أن تتحقّق من أن الرصيد غير مسموح له بأن يهبط تحت الصفر، على سبيل المثال.</p>
<p>ومثال على كيفية عمل ذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, account_number: <span class="hljs-built_in">str</span>, owner: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span>, annual_interest: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.account_number = account_number
        <span class="hljs-variable language_">self</span>.owner = owner
        <span class="hljs-variable language_">self</span>.balance = balance
        <span class="hljs-variable language_">self</span>.annual_interest = annual_interest

    <span class="hljs-comment"># This method adds the annual interest to the balance of the account</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_interest</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.balance += <span class="hljs-variable language_">self</span>.balance * <span class="hljs-variable language_">self</span>.annual_interest

    <span class="hljs-comment"># This method &quot;withdraws&quot; money from the account</span>
    <span class="hljs-comment"># If the withdrawal is successful the method returns True, and False otherwise</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">withdraw</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">if</span> amount &lt;= <span class="hljs-variable language_">self</span>.balance:
            <span class="hljs-variable language_">self</span>.balance -= amount
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

peters_account = BankAccount(<span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.015</span>)

<span class="hljs-keyword">if</span> peters_account.withdraw(<span class="hljs-number">1000</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was successful, the balance is now&quot;</span>, peters_account.balance)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was unsuccessful, the balance is insufficient&quot;</span>)

<span class="hljs-comment"># Yritetään uudestaan</span>
<span class="hljs-keyword">if</span> peters_account.withdraw(<span class="hljs-number">1000</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was successful, the balance is now&quot;</span>, peters_account.balance)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was unsuccessful, the balance is insufficient&quot;</span>)
</code></pre>
<pre><code>The withdrawal was successful, the balance is now 500.0
The withdrawal was unsuccessful, the balance is insufficient
</code></pre>
<p>تُسمّى المحافظة على التكامل الداخلي للكائن وتوفير توابع ملائمة لضمان ذلك <em>التغليف</em>. والفكرة أن أعمال الكائن الداخلية تبقى مخفية عن العميل، لكن الكائن يوفّر توابع يمكن استخدامها للوصول إلى البيانات المخزّنة فيه.</p>
<p>إضافة تابع لا تخفي الخاصية تلقائيًا. فرغم أن تعريف صنف <code>BankAccount</code> يحتوي على التابع <code>withdraw</code> لسحب المال، فإن شيفرة العميل لا تزال قادرة على الوصول إلى خاصية <code>balance</code> وتغييرها مباشرةً:</p>
<pre><code class="language-python">peters_account = BankAccount(<span class="hljs-string">&quot;12345-678&quot;</span>, <span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-number">1500.0</span>, <span class="hljs-number">0.015</span>)

<span class="hljs-comment"># Attempt to withdraw 2000</span>
<span class="hljs-keyword">if</span> peters_account.withdraw(<span class="hljs-number">2000</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was successful, the balance is now&quot;</span>, peters_account.balance)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The withdrawal was unsuccessful, the balance is insufficient&quot;</span>)

    <span class="hljs-comment"># &quot;Force&quot; the withdrawal of 2000</span>
    peters_account.balance -= <span class="hljs-number">2000</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The balance is now:&quot;</span>, peters_account.balance)
</code></pre>
<pre><code>The withdrawal was unsuccessful, the balance is insufficient
The balance is now: -500.0
</code></pre>
<p>من الممكن إخفاء خصائص البيانات عن شيفرة العميل، وقد يساعد ذلك في حلّ هذه المشكلة. وسنعود إلى هذا الموضوع في الجزء التالي.</p>
<blockquote>
<p><strong>تمرين برمجي: عدّاد تنازلي</strong></p>
<p>يتضمّن هذا التمرين عدّة أجزاء. ويمكنك تسليم الأجزاء منفصلة. ويستحق كل جزء نقطة تمرين واحدة.</p>
</blockquote>
<p>يحتوي قالب التمرين على صنف مكتمل جزئيًا هو <code>DecreasingCounter</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">DecreasingCounter</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, initial_value: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.value = initial_value

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print_value</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;value:&quot;</span>, <span class="hljs-variable language_">self</span>.value)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">decrease</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">pass</span>

    <span class="hljs-comment"># define the rest of your methods here</span>
</code></pre>
<p>يمكن الآن استخدام الصنف كما هو موضّح أدناه، وينبغي أن ينتج المخرجات التالية بعد إكمال الجزء الأول من التمرين:</p>
<pre><code class="language-python">counter = DecreasingCounter(<span class="hljs-number">10</span>)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
</code></pre>
<pre><code>value: 10
value: 9
value: 8
</code></pre>
<h3 id="إنقاص-قيمة-العداد">إنقاص قيمة العدّاد</h3>
<p>يُرجى إكمال التابع <code>decrease</code> المعرَّف في القالب، بحيث ينقص القيمة المخزّنة في العدّاد بمقدار واحد. وراجع المثال أعلاه لمعرفة السلوك المتوقّع.</p>
<h3 id="يجب-ألا-تكون-قيمة-العداد-سالبة">يجب ألّا تكون قيمة العدّاد سالبة</h3>
<p>يُرجى إضافة وظيفة إلى تابعك <code>decrease</code>، بحيث لا تصل قيمة العدّاد أبدًا إلى قيم سالبة. فإذا كانت قيمة العدّاد 0، فلن تُنقَص أكثر.</p>
<pre><code class="language-python">counter = DecreasingCounter(<span class="hljs-number">2</span>)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
</code></pre>
<pre><code>value: 2
value: 1
value: 0
value: 0
</code></pre>
<h3 id="ضبط-القيمة-على-صفر">ضبط القيمة على صفر</h3>
<p>يُرجى إضافة تابع <code>set_to_zero</code> يضبط قيمة العدّاد على 0:</p>
<pre><code class="language-python">counter = DecreasingCounter(<span class="hljs-number">100</span>)
counter.print_value()
counter.set_to_zero()
counter.print_value()
</code></pre>
<pre><code>value: 100
value: 0
</code></pre>
<h3 id="إعادة-ضبط-العداد">إعادة ضبط العدّاد</h3>
<p>يُرجى إضافة تابع <code>reset_original_value()</code> يعيد العدّاد إلى حالته الابتدائية:</p>
<pre><code class="language-python">counter = DecreasingCounter(<span class="hljs-number">55</span>)
counter.decrease()
counter.decrease()
counter.decrease()
counter.decrease()
counter.print_value()
counter.reset_original_value()
counter.print_value()
</code></pre>
<pre><code>value: 51
value: 55
</code></pre>
<p>وختامًا لهذا القسم، لننظر إلى صنف يمثّل أفضل نتيجة شخصية للاعب. ويحتوي تعريف الصنف على توابع تحقّق منفصلة تتأكّد من صلاحية الوسائط المُمرَّرة. وتُستدعى هذه التوابع بالفعل داخل الباني. ويضمن ذلك أن الكائن المُنشأ سليم داخليًا.</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> date

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PersonalBest</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, player: <span class="hljs-built_in">str</span>, day: <span class="hljs-built_in">int</span>, month: <span class="hljs-built_in">int</span>, year: <span class="hljs-built_in">int</span>, points: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-comment"># Default values</span>
        <span class="hljs-variable language_">self</span>.player = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.date_of_pb = date(<span class="hljs-number">1900</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
        <span class="hljs-variable language_">self</span>.points = <span class="hljs-number">0</span>

        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.name_ok(player):
            <span class="hljs-variable language_">self</span>.player = player

        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.date_ok(day, month, year):
            <span class="hljs-variable language_">self</span>.date_of_pb = date(year, month, day)

        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.points_ok(points):
            <span class="hljs-variable language_">self</span>.points = points

    <span class="hljs-comment"># Helper methods to check the arguments are valid</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name_ok</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(name) &gt;= <span class="hljs-number">2</span> <span class="hljs-comment"># Name should be at least two characters long</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">date_ok</span>(<span class="hljs-params">self, day, month, year</span>):
        <span class="hljs-keyword">try</span>:
            date(year, month, day)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">except</span>:
            <span class="hljs-comment"># an exception is raised if the arguments are not valid</span>
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">points_ok</span>(<span class="hljs-params">self, points</span>):
        <span class="hljs-keyword">return</span> points &gt;= <span class="hljs-number">0</span>

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    result1 = PersonalBest(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">11</span>, <span class="hljs-number">2020</span>, <span class="hljs-number">235</span>)
    <span class="hljs-built_in">print</span>(result1.points)
    <span class="hljs-built_in">print</span>(result1.player)
    <span class="hljs-built_in">print</span>(result1.date_of_pb)

    <span class="hljs-comment"># The date was not valid</span>
    result2 = PersonalBest(<span class="hljs-string">&quot;Paula&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">13</span>, <span class="hljs-number">2019</span>, <span class="hljs-number">4555</span>)
    <span class="hljs-built_in">print</span>(result2.points)
    <span class="hljs-built_in">print</span>(result2.player)
    <span class="hljs-built_in">print</span>(result2.date_of_pb) <span class="hljs-comment"># Tulostaa oletusarvon 1900-01-01</span>
</code></pre>
<pre><code>235
Peter
2020-11-01
4555
Paula
1900-01-01
</code></pre>
<p>وفي المثال أعلاه استُدعيت التوابع المساعدة أيضًا عبر اسم المعامل <code>self</code> حين استُخدمت في الباني. ومن الممكن كذلك تضمين تعريفات توابع <em>ساكنة</em> في تعريفات الأصناف. وهذه توابع يمكن استدعاؤها دون إنشاء نسخة من الصنف على الإطلاق. وسنعود إلى هذا الموضوع في الجزء التالي.</p>
<p>لا يُستخدم اسم المعامل <code>self</code> إلا عند الإشارة إلى ميزات <em>الكائن بوصفه نسخة من الصنف</em>. وتشمل هذه كلًّا من خصائص البيانات والتوابع المرتبطة بالكائن. ولزيادة الالتباس في المصطلحات، يُشار إلى خصائص البيانات والتوابع معًا أحيانًا ببساطة باسم <em>خصائص</em> الكائن، ولهذا حدّدنا في هذه المادة غالبًا <em>خصائص البيانات</em> حين نعني المتغيّرات المعرَّفة داخل الصنف. وهنا تختلف مصطلحات بعض مبرمجي Python قليلًا عن المصطلحات المستخدمة في البرمجة كائنية التوجّه على نطاق أوسع، حيث تشير <em>الخصائص</em> عادةً إلى خصائص بيانات الكائن فقط.</p>
<p>ومن الممكن أيضًا إنشاء متغيّرات محلية داخل تعريفات التوابع دون الإشارة إلى <code>self</code>. وينبغي أن تفعل ذلك إن لم تكن هناك حاجة إلى الوصول إلى المتغيّرات خارج التابع. ولا تحتاج المتغيّرات المحلية داخل التوابع إلى كلمات مفتاحية خاصة؛ فهي تُستخدم تمامًا مثل أي متغيّرات عادية صادفتها حتى الآن.</p>
<p>فهذا مثلًا سيعمل:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BonusCard</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.balance = balance

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_bonus</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># The variable bonus below is a local variable.</span>
        <span class="hljs-comment"># It is not a data attribute of the object.</span>
        <span class="hljs-comment"># It can not be accessed directly through the object.</span>
        bonus = <span class="hljs-variable language_">self</span>.balance * <span class="hljs-number">0.25</span>
        <span class="hljs-variable language_">self</span>.balance += bonus

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_superbonus</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># The superbonus variable is also a local variable.</span>
        <span class="hljs-comment"># Usually helper variables are local variables because</span>
        <span class="hljs-comment"># there is no need to access them from the other</span>
        <span class="hljs-comment"># methods in the class or directly through an object.</span>
        superbonus = <span class="hljs-variable language_">self</span>.balance * <span class="hljs-number">0.5</span>
        <span class="hljs-variable language_">self</span>.balance += superbonus

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;BonusCard(name=<span class="hljs-subst">{self.name}</span>, balance=<span class="hljs-subst">{self.balance}</span>)&quot;</span>
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الاسم الأول واسم العائلة</strong></p>
<p>يُرجى كتابة صنف اسمه <code>Person</code> له <em>خاصية واحدة</em> هي <code>name</code>، وتُضبط بوسيط يُعطى للباني.</p>
</blockquote>
<p>يُرجى أيضًا إضافة تابعين:</p>
<p>ينبغي أن يُعيد التابع <code>return_first_name</code> الاسم الأول للشخص، بينما ينبغي أن يُعيد التابع <code>return_last_name</code> اسم العائلة للشخص.</p>
<p>يمكنك أن تفترض أن الاسم المُمرَّر إلى الباني سيحوي عنصرَي اسم بالضبط يفصلهما محرف مسافة.</p>
<p>ومثال على الاستخدام:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    peter = Person(<span class="hljs-string">&quot;Peter Pythons&quot;</span>)
    <span class="hljs-built_in">print</span>(peter.return_first_name())
    <span class="hljs-built_in">print</span>(peter.return_last_name())

    paula = Person(<span class="hljs-string">&quot;Paula Pythonnen&quot;</span>)
    <span class="hljs-built_in">print</span>(paula.return_first_name())
    <span class="hljs-built_in">print</span>(paula.return_last_name())
</code></pre>
<pre><code>Peter
Pythons
Paula
Pythonnen
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: إحصاءات على الأعداد</strong></p>
<p>يُطلب منك في هذا التمرين إنشاء برنامج للتعامل مع الأعداد، على غرار التمرين الذي أنجزته في <a href="/arabic-cs-library/book/mooc/part-2/4-simple-loops#programming-exercise-working-with-numbers">نهاية الجزء 2</a> في دورة مقدّمة إلى البرمجة. وهذه المرة ستعرّف صنفًا لهذا الغرض.</p>
</blockquote>
<h3 id="عد-الأعداد">عدّ الأعداد</h3>
<p>يُرجى كتابة صنف اسمه <code>NumberStats</code> بالتوابع التالية:</p>
<ul>
<li>يضيف التابع <code>add_number</code> عددًا جديدًا إلى السجل الإحصائي</li>
<li>يُعيد التابع <code>count_numbers</code> عدد الأعداد التي أُضيفت</li>
</ul>
<p>في هذه المرحلة لا حاجة إلى تخزين الأعداد نفسها في أي هيكل بيانات. ويكفي أن تتذكّر ببساطة كم عددًا أُضيف. والتابع <code>add_number</code> يأخذ وسيطًا بالفعل، لكن لا حاجة إلى معالجة القيمة الفعلية بأي شكل بعد.</p>
<p>يحتوي قالب التمرين على الهيكل التالي لتعريف الصنف:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span>  <span class="hljs-title class_">NumberStats</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.numbers = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_number</span>(<span class="hljs-params">self, number:<span class="hljs-built_in">int</span></span>):
        <span class="hljs-keyword">pass</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">count_numbers</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">pass</span>
</code></pre>
<pre><code class="language-python">stats = NumberStats()
stats.add_number(<span class="hljs-number">3</span>)
stats.add_number(<span class="hljs-number">5</span>)
stats.add_number(<span class="hljs-number">1</span>)
stats.add_number(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Numbers added:&quot;</span>, stats.count_numbers())
</code></pre>
<pre><code>Numbers added: 4
</code></pre>
<h3 id="المجموع-والمتوسط">المجموع والمتوسط</h3>
<p>يُرجى إضافة التوابع التالية إلى تعريف صنفك:</p>
<ul>
<li>ينبغي أن يُعيد التابع <code>get_sum</code> مجموع الأعداد المُضافة (وإذا لم تُضف أي أعداد، فينبغي أن يُعيد التابع 0)</li>
<li>ينبغي أن يُعيد التابع <code>average</code> متوسط الأعداد المُضافة (وإذا لم تُضف أي أعداد، فينبغي أن يُعيد التابع 0)</li>
</ul>
<pre><code class="language-python">stats = NumberStats()
stats.add_number(<span class="hljs-number">3</span>)
stats.add_number(<span class="hljs-number">5</span>)
stats.add_number(<span class="hljs-number">1</span>)
stats.add_number(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Numbers added:&quot;</span>, stats.count_numbers())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sum of numbers:&quot;</span>, stats.get_sum())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Mean of numbers:&quot;</span>, stats.average())
</code></pre>
<pre><code>Numbers added: 4
Sum of numbers: 11
Mean of numbers: 2.75
</code></pre>
<h3 id="مدخل-المستخدم">مُدخَل المستخدم</h3>
<p>يُرجى كتابة برنامج رئيسي يظلّ يسأل المستخدم عن أعداد صحيحة حتى يُدخل المستخدم -1. وينبغي للبرنامج حينها أن يطبع مجموع الأعداد المُدخلة ومتوسطها.</p>
<p>ينبغي أن يستخدم برنامجك كائنًا من <code>NumberStats</code> لتسجيل الأعداد المُضافة.</p>
<p>ملاحظة: لا حاجة إلى تغيير صنف <code>NumberStats</code> في هذا الجزء من التمرين، ما دام قد اجتاز اختبارات الجزء السابق من التمرين. واستخدم نسخة من الصنف لإكمال هذا الجزء.</p>
<p>ملاحظة 2: ينبغي ألّا يوضع برنامجك الرئيسي داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>، وإلا فلن تعمل الاختبارات.</p>
<pre><code>Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
</code></pre>
<h3 id="مجاميع-متعددة">مجاميع متعدّدة</h3>
<p>يُرجى الإضافة إلى برنامجك الرئيسي بحيث يحسب أيضًا بشكل منفصل مجموع الأعداد الزوجية والأعداد الفردية المُضافة.</p>
<p>ملاحظة: لا تغيّر تعريف صنف <code>NumberStats</code> في هذا الجزء من التمرين أيضًا. بل عرّف ثلاثة كائنات من <code>NumberStats</code>. ويتتبّع أحدها كل الأعداد، ويتتبّع آخر الأعداد الزوجية، ويتتبّع الثالث الأعداد الفردية المُدخلة.</p>
<p>ملاحظة 2: ينبغي ألّا يوضع برنامجك الرئيسي داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>، وإلا فلن تعمل الاختبارات.</p>
<p>يُرجى الاطلاع على هذا المثال لمعرفة كيف ينبغي أن تعمل دالتك الرئيسية:</p>
<pre><code>Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
Sum of even numbers: 8
Sum of odd numbers: 5
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,e as slug,l as title};
