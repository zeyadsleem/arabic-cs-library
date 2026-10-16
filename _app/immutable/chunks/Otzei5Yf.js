const s="mooc",n="part-11",a="الجزء 11: ميزات متقدمة",r="4-more-recursion-examples",e="المزيد من أمثلة التعاود",o=[{depth:2,id:"خوارزميات-تعاودية-للأشجار-الثنائية",text:"خوارزميات تعاودية للأشجار الثنائية"},{depth:2,id:"شجرة-ثنائية-مرتبة",text:"شجرة ثنائية مرتّبة"},{depth:2,id:"عودة-إلى-ما-قبل-التعاود",text:"عودة إلى ما قبل التعاود"},{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"orderbook",text:"OrderBook"},{depth:2,id:"المزيد-من-الميزات-لـ-orderbook",text:"المزيد من الميزات لـ OrderBook"},{depth:2,id:"اللمسات-الأخيرة-على-orderbook",text:"اللمسات الأخيرة على OrderBook"},{depth:2,id:"دون-معالجة-الأخطاء",text:"دون معالجة الأخطاء"},{depth:2,id:"معالجة-الأخطاء-في-مدخلات-المستخدم",text:"معالجة الأخطاء في مدخلات المستخدم"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستألف الأشجار الثنائية وبعض الخوارزميات التعاودية المستخدمة في معالجتها</li>
</ul>
</blockquote>
<p>تتّضح المزايا الحقيقية للتعاود حين نصادف مسائل يصعب فيها كتابة حلول تكرارية. فلننظر إلى <em>الأشجار الثنائية</em> (binary trees) على سبيل المثال. فالشجرة الثنائية بنية متفرّعة تكون فيها عقد، وعند كل عقدة تتفرّع البنية إلى فرعين ابنين على الأكثر لهما عقد خاصة بهما. ويمكن أن تبدو الشجرة الثنائية هكذا (غالبًا ما يُعدّ علم الحاسوب فرعًا من العلوم الطبيعية، لكن فهمنا للأشجار مقلوب قليلًا، كما ستلاحظ):</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_4_1_2.png" alt="11_4_1_2.png"></p>
<p>ينبغي أن تكون معالجة الأشجار الثنائية سهلة تعاوديًا نظريًا على الأقل: فإذا أردنا تنفيذ عملية ما على كل عقدة في الشجرة، فكل ما تحتاج إليه خوارزميتنا هو أن</p>
<ol>
<li>تعالج العقدة الحالية</li>
<li>تستدعي نفسها على العقدة الابنة على اليسار</li>
<li>تستدعي نفسها على العقدة الابنة على اليمين</li>
</ol>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_4_2_2e.png" alt="11_4_2_2e.png"></p>
<p>وكما ترى من الصورة أعلاه، فإن «الشجرتين الفرعيتين» اليسرى واليمنى هما بنفسهما شجرتان ثنائيتان كاملتان، والعقدة الوحيدة الباقية خارج الاستدعاءات التعاودية هي العقدة الأب، التي تُعالَج في الخطوة 1، قبل استدعاء الدالة استدعاءً تعاوديًا. لذا يمكننا أن نطمئن إلى أنه عند انتهاء تنفيذ الدالة تكون كل عقدة قد زُيرت مرة واحدة بالضبط.</p>
<p>وستكون النسخة التكرارية لاجتياز شجرة ثنائية أعقد بكثير، إذ سيتعيّن علينا أن نتتبّع بطريقة ما كل العقد التي زرناها من قبل. وتنطبق المبادئ نفسها على كل بنى الأشجار الحسابية، لا على الثنائية وحدها.</p>
<p>ويمكن تمثيل الشجرة الثنائية بسهولة في شيفرة Python أيضًا. فكل ما نحتاج إليه هو كتابة تعريف صنف لعقدة واحدة. ولهذه العقدة خاصية قيمة، وخاصيتان للعقدتين الابنتين اليسرى واليمنى:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Node</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class represents a single node in a binary tree &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, value, left_child:<span class="hljs-string">&#x27;Node&#x27;</span> = <span class="hljs-literal">None</span>, right_child:<span class="hljs-string">&#x27;Node&#x27;</span> = <span class="hljs-literal">None</span></span>):
        <span class="hljs-variable language_">self</span>.value = value
        <span class="hljs-variable language_">self</span>.left_child = left_child
        <span class="hljs-variable language_">self</span>.right_child = right_child
</code></pre>
<p>والآن لنفترض أننا نريد تمثيل الشجرة التالية:</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_4_3.png" alt="11_4_3.png"></p>
<p>ويمكننا تحقيق ذلك بالشيفرة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    tree = Node(<span class="hljs-number">2</span>)

    tree.left_child = Node(<span class="hljs-number">3</span>)
    tree.left_child.left_child = Node(<span class="hljs-number">5</span>)
    tree.left_child.right_child = Node(<span class="hljs-number">8</span>)

    tree.right_child = Node(<span class="hljs-number">4</span>)
    tree.right_child.right_child = Node(<span class="hljs-number">11</span>)
</code></pre>
<h2 id="خوارزميات-تعاودية-للأشجار-الثنائية">خوارزميات تعاودية للأشجار الثنائية</h2>
<p>أولًا، لننظر إلى خوارزمية تطبع كل العقد في شجرة ثنائية واحدة تلو الأخرى. وسنعمل في الأمثلة التالية على الشجرة الثنائية المعرّفة أعلاه.</p>
<p>الوسيط الممرَّر إلى دالة الطباعة هو العقدة الجذر للشجرة الثنائية. وهذه هي العقدة في القمة تمامًا في الشكل التوضيحي أعلاه. وكل العقد الأخرى <em>أبناء</em> لهذه العقدة:</p>
<pre><code class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">print_nodes</span>(<span class="hljs-params">root: Node</span>):
    <span class="hljs-built_in">print</span>(root.value)

    <span class="hljs-keyword">if</span> root.left_child <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
        print_nodes(root.left_child)

    <span class="hljs-keyword">if</span> root.right_child <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
        print_nodes(root.right_child)

</code></pre>
<p>تطبع الدالة قيمة العقدة الممرَّرة وسيطًا، ثم تستدعي نفسها على العقدتين الابنتين اليسرى واليمنى، بشرط أن تكون العقدتان معرّفتين. وهذه خوارزمية بسيطة جدًا، لكنها تجتاز كل عقد الشجرة بكفاءة وموثوقية، أيًا كان حجم الشجرة. والأهم أنها لا تزور أي عقدة مرتين. فكل قيمة تُطبع مرة واحدة فقط.</p>
<p>وإذا مرّرنا العقدة الجذر <code>tree</code> للشجرة الثنائية الموضّحة أعلاه وسيطًا إلى الدالة، فإنها تطبع</p>
<pre><code>2
3
5
8
4
11
</code></pre>
<p>وكما ترى من ترتيب العقد في المخرجات، تنزل الخوارزمية أولًا عبر «الساق اليسرى» للشجرة حتى القاع تمامًا، ثم تجتاز العقد الأخرى بالترتيب من هناك.</p>
<p>وبالمثل، يمكننا كتابة خوارزمية لحساب مجموع كل القيم المخزّنة في عقد الشجرة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_of_nodes</span>(<span class="hljs-params">root: Node</span>):
    node_sum = root.value

    <span class="hljs-keyword">if</span> root.left_child <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
        node_sum += sum_of_nodes(root.left_child)

    <span class="hljs-keyword">if</span> root.right_child <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
        node_sum += sum_of_nodes(root.right_child)

    <span class="hljs-keyword">return</span> node_sum
</code></pre>
<p>يُهيّأ المتغيّر <code>node_sum</code> ليكون مساويًا لقيمة العقدة الحالية. ثم تُزاد القيمة في المتغيّر عبر استدعاءات تعاودية لمجاميع عقد الشجرتين الابنتين اليسرى واليمنى (مع التأكد أولًا من وجودهما بالطبع). ثم تُرجع هذه النتيجة</p>
<blockquote>
<p><strong>تمرين برمجي: أكبر عقدة</strong></p>
<p>يُرجى كتابة دالة باسم <code>greatest_node(root: Node)</code> تأخذ العقدة الجذر لشجرة ثنائية بوصفها وسيطًا لها.</p>
</blockquote>
<p>ينبغي أن تُرجع الدالة قيمة العقدة ذات القيمة الأكبر داخل الشجرة. وينبغي أن تُجتاز الشجرة تعاوديًا.</p>
<p>تلميح: قد تفيدك الدالة <code>sum_of_nodes</code> في المثال أعلاه.</p>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    tree = Node(<span class="hljs-number">2</span>)

    tree.left_child = Node(<span class="hljs-number">3</span>)
    tree.left_child.left_child = Node(<span class="hljs-number">5</span>)
    tree.left_child.right_child = Node(<span class="hljs-number">8</span>)

    tree.right_child = Node(<span class="hljs-number">4</span>)
    tree.right_child.right_child = Node(<span class="hljs-number">11</span>)

    <span class="hljs-built_in">print</span>(greatest_node(tree))
</code></pre>
<pre><code>11
</code></pre>
<h2 id="شجرة-ثنائية-مرتبة">شجرة ثنائية مرتّبة</h2>
<p>تكون الشجرة الثنائية مفيدة بوجه خاص حين تُرتَّب العقد بطريقة معيّنة. فذلك يجعل العثور على العقد في الشجرة سريعًا وفعّالًا.</p>
<p>لننظر إلى شجرة مرتّبة على النحو التالي: العقدة الابنة اليسرى لكل عقدة أصغر من العقدة نفسها، والعقدة الابنة اليمنى أكبر منها على النحو المقابل.</p>
<p><img src="/arabic-cs-library/images/mooc/part-11/11_4_1_2.png" alt="11_4_1_2.png"></p>
<p>والآن يمكننا كتابة خوارزمية تعاودية للبحث عن العقد. والفكرة شبيهة جدًا بالبحث الثنائي من القسم السابق: فإذا كانت العقدة الحالية هي العقدة التي نبحث عنها، نُرجع <code>True</code>. وإلا نواصل تعاوديًا مع الشجرة الابنة اليسرى أو اليمنى. وإذا لم تكن العقدة معرّفة، نُرجع <code>False</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">find_node</span>(<span class="hljs-params">root: Node, value</span>):
    <span class="hljs-keyword">if</span> root <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

    <span class="hljs-keyword">if</span> value == root.value:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

    <span class="hljs-keyword">if</span> value &gt; root.value:
        <span class="hljs-keyword">return</span> find_node(root.right_child, value)

    <span class="hljs-keyword">return</span> find_node(root.left_child, value)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الرؤساء والمرؤوسون</strong></p>
<p>يمثّل الصنف <code>Employee</code> موظفًا في شركة:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Employee</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.subordinates = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_subordinate</span>(<span class="hljs-params">self, employee: <span class="hljs-string">&#x27;Employee&#x27;</span></span>):
        <span class="hljs-variable language_">self</span>.subordinates.append(employee)
</code></pre>
<p>يُرجى كتابة دالة باسم <code>count_subordinates(employee: Employee)</code> تحصي تعاوديًا عدد المرؤوسين لكل موظف.</p>
<p>مثال على الدالة أثناء العمل:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    t1 = Employee(<span class="hljs-string">&quot;Sally&quot;</span>)
    t2 = Employee(<span class="hljs-string">&quot;Eric&quot;</span>)
    t3 = Employee(<span class="hljs-string">&quot;Matthew&quot;</span>)
    t4 = Employee(<span class="hljs-string">&quot;Emily&quot;</span>)
    t5 = Employee(<span class="hljs-string">&quot;Adele&quot;</span>)
    t6 = Employee(<span class="hljs-string">&quot;Claire&quot;</span>)
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    <span class="hljs-built_in">print</span>(count_subordinates(t1))
    <span class="hljs-built_in">print</span>(count_subordinates(t4))
    <span class="hljs-built_in">print</span>(count_subordinates(t5))
</code></pre>
<pre><code>5
3
0
</code></pre>
<h2 id="عودة-إلى-ما-قبل-التعاود">عودة إلى ما قبل التعاود</h2>
<p>لنُنهِ هذا الجزء من المادة بتمرين أكبر قليلًا يركّز على مبادئ البرمجة كائنية التوجّه. ولا ننصح باستخدام التعاود في هذه السلسلة من المهام، لكن تقنيات إدراك القوائم (list comprehension) ستكون مفيدة.</p>
<blockquote>
<p><strong>تمرين برمجي: OrderBook</strong></p>
<p>ستكتب في هذا التمرين صنفين مختلفين، سيشكّلان بدورهما العمود الفقري للتمرين البرمجي الذي يلي هذا التمرين، حيث ستكتب تطبيقًا تفاعليًا.</p>
</blockquote>
<h2 id="المهمة">المهمة</h2>
<p>يُرجى كتابة صنف باسم <code>Task</code> يمثّل مهمة واحدة في قائمة مهام شركة برمجيات. وللمهام</p>
<ul>
<li>وصف</li>
<li>تقدير لعدد الساعات اللازمة لإنجاز المهمة</li>
<li>اسم المبرمج المُسنَد إليه المهمة</li>
<li>حقل لتتبّع ما إذا كانت المهمة منتهية</li>
<li>معرّف فريد</li>
</ul>
<p>ويُستخدم الصنف على النحو التالي:</p>
<pre><code class="language-python">t1 = Task(<span class="hljs-string">&quot;program hello world&quot;</span>, <span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(t1.<span class="hljs-built_in">id</span>, t1.description, t1.programmer, t1.workload)
<span class="hljs-built_in">print</span>(t1)
<span class="hljs-built_in">print</span>(t1.is_finished())
t1.mark_finished()
<span class="hljs-built_in">print</span>(t1)
<span class="hljs-built_in">print</span>(t1.is_finished())
t2 = Task(<span class="hljs-string">&quot;program webstore&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">10</span>)
t3 = Task(<span class="hljs-string">&quot;program mobile app for workload accounting&quot;</span>, <span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">25</span>)
<span class="hljs-built_in">print</span>(t2)
<span class="hljs-built_in">print</span>(t3)
</code></pre>
<pre><code>1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Adele NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
</code></pre>
<p>بعض التوضيحات:</p>
<ul>
<li>يمكن التحقق من حالة المهمة (منتهية أو غير منتهية بعد) بالدالة <code>is_finished(self)</code> التي تُرجع قيمة منطقية</li>
<li>لا تكون المهمة منتهية عند إنشائها</li>
<li>تُعلَّم المهمة بأنها منتهية باستدعاء التابع <code>mark_finished(self)</code></li>
<li>معرّف المهمة عدد متسلسل يبدأ من 1. فمعرّف المهمة الأولى 1، ومعرّف الثانية 2، وهكذا دواليك.</li>
</ul>
<p><strong>تلميح</strong>: يمكن تنفيذ <code>id</code> بوصفه <a href="/arabic-cs-library/book/mooc/part-9/5-class-attributes#class-variables">متغيّر صنف</a>.</p>
<h2 id="orderbook">OrderBook</h2>
<p>يُرجى كتابة صنف باسم <code>OrderBook</code> يجمع كل المهام المطلوبة من شركة البرمجيات. وينبغي تمثيل المهام بالصنف <code>Task</code> الذي كتبته للتو.</p>
<p>تُستخدم النسخة الأساسية من OrderBook على النحو التالي:</p>
<pre><code class="language-python">orders = OrderBook()
orders.add_order(<span class="hljs-string">&quot;program webstore&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">10</span>)
orders.add_order(<span class="hljs-string">&quot;program mobile app for workload accounting&quot;</span>, <span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">25</span>)
orders.add_order(<span class="hljs-string">&quot;program app for practising mathematics&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">100</span>)

<span class="hljs-keyword">for</span> order <span class="hljs-keyword">in</span> orders.all_orders():
    <span class="hljs-built_in">print</span>(order)

<span class="hljs-built_in">print</span>()

<span class="hljs-keyword">for</span> programmer <span class="hljs-keyword">in</span> orders.programmers():
    <span class="hljs-built_in">print</span>(programmer)
</code></pre>
<pre><code>1: program webstore (10 hours), programmer Adele NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

Adele
Eric
</code></pre>
<p>في هذه المرحلة ينبغي أن يوفّر صنفك <code>OrderBook</code> ثلاثة توابع:</p>
<ul>
<li><code>add_order(self, description, programmer, workload)</code> الذي يضيف طلبًا جديدًا إلى OrderBook. ويخزّن OrderBook الطلبات داخليًا في صورة كائنات <code>Task</code>. ملاحظة: ينبغي أن يأخذ التابع الوسائط المذكورة بالضبط، وإلا فلن تعمل الاختبارات الآلية بشكل صحيح.</li>
<li><code>all_orders(self)</code> يُرجع قائمة بكل المهام المخزّنة في OrderBook</li>
<li><code>programmers(self)</code> يُرجع قائمة بأسماء كل المبرمجين الذين لهم مهام مخزّنة في OrderBook. وينبغي أن تحتوي القائمة على كل مبرمج مرة واحدة فقط</li>
</ul>
<p><strong>تلميح:</strong> طريقة سهلة لإزالة التكرارات هي التعامل مع القائمة ابتداءً بوصفها <a href="https://docs.python.org/3.8/library/stdtypes.html#set">مجموعة</a>. والمجموعة تجميعة من العناصر يظهر فيها كل عنصر فريد مرة واحدة فقط. ويمكن بعد ذلك تحويل <code>set</code> مرة أخرى إلى قائمة، وحينها يمكننا أن نطمئن إلى أن كل عنصر صار فريدًا:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
my_list2 = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">set</span>(my_list))
<span class="hljs-built_in">print</span>(my_list)
<span class="hljs-built_in">print</span>(my_list2)
</code></pre>
<pre><code>[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]
</code></pre>
<h2 id="المزيد-من-الميزات-لـ-orderbook">المزيد من الميزات لـ OrderBook</h2>
<p>يُرجى كتابة ثلاثة توابع إضافية في صنفك <code>OrderBook</code>.</p>
<p>يأخذ التابع <code>mark_finished(self, id: int)</code> معرّف المهمة بوصفه وسيطًا له ويعلّم المهمة المعنية بأنها منتهية:</p>
<pre><code class="language-python">orders = OrderBook()
orders.add_order(<span class="hljs-string">&quot;program webstore&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">10</span>)
orders.add_order(<span class="hljs-string">&quot;program mobile app for workload accounting&quot;</span>, <span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">25</span>)
orders.add_order(<span class="hljs-string">&quot;program app for practising mathematics&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">100</span>)

orders.mark_finished(<span class="hljs-number">1</span>)
orders.mark_finished(<span class="hljs-number">2</span>)

<span class="hljs-keyword">for</span> order <span class="hljs-keyword">in</span> orders.all_orders():
    <span class="hljs-built_in">print</span>(order)
</code></pre>
<pre><code>1: program webstore (10 hours), programmer Adele FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED
</code></pre>
<p>وإذا لم توجد مهمة بالمعرّف المحدّد، ينبغي أن يرفع التابع استثناء <code>ValueError</code>. وإذا كنت بحاجة إلى مراجعة رفع الاستثناءات، فيُرجى الاطلاع على <a href="/arabic-cs-library/book/mooc/part-6/3-errors#raising-exceptions">الجزء 6</a>.</p>
<p>ويعمل التابعان <code>finished_orders(self)</code> و<code>unfinished_orders(self)</code> كما هو متوقّع: فكلاهما يُرجع قائمة تحتوي على المهام المعنية من OrderBook.</p>
<h2 id="اللمسات-الأخيرة-على-orderbook">اللمسات الأخيرة على OrderBook</h2>
<p>يُرجى كتابة تابع أخير في صنفك <code>OrderBook</code>: وهو <code>status_of_programmer(self, programmer: str)</code> الذي يُرجع <em>صفًا</em> (tuple). وينبغي أن يحتوي الصف على عدد المهام المنتهية وغير المنتهية المُسنَدة إلى المبرمج، إلى جانب الساعات المقدّرة في الفئتين معًا.</p>
<pre><code class="language-python">orders = OrderBook()
orders.add_order(<span class="hljs-string">&quot;program webstore&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">10</span>)
orders.add_order(<span class="hljs-string">&quot;program mobile app for workload accounting&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">25</span>)
orders.add_order(<span class="hljs-string">&quot;program app for practising mathematics&quot;</span>, <span class="hljs-string">&quot;Adele&quot;</span>, <span class="hljs-number">100</span>)
orders.add_order(<span class="hljs-string">&quot;program the next facebook&quot;</span>, <span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">1000</span>)

orders.mark_finished(<span class="hljs-number">1</span>)
orders.mark_finished(<span class="hljs-number">2</span>)

status = orders.status_of_programmer(<span class="hljs-string">&quot;Adele&quot;</span>)
<span class="hljs-built_in">print</span>(status)
</code></pre>
<pre><code>(2, 1, 35, 100)
</code></pre>
<p>العنصر الأول في الصف هو عدد المهام <em>المنتهية</em>، أما العنصر الثاني فهو عدد المهام <em>غير المنتهية</em>. والعنصران الثالث والرابع هما مجموعا تقديرات عبء العمل للمهام المنتهية وغير المنتهية على الترتيب.</p>
<p>وإذا لم يوجد مبرمج بالاسم المحدّد، ينبغي أن يرفع التابع استثناء <code>ValueError</code>.</p>
<blockquote>
<p><strong>تمرين برمجي: تطبيق دفتر الطلبات</strong></p>
<p>ستنشئ في هذا التمرين تطبيقًا تفاعليًا لإدارة المهام المطلوبة من شركة برمجيات. والتنفيذ متروك لك بالكامل، لكن يمكنك استخدام اللبنات الأساسية من التمرين السابق في تطبيقك. وقد تفيدك أيضًا الأمثلة في <a href="/arabic-cs-library/book/mooc/part-10/4-application-development">القسم الأخير من الجزء 10</a>.</p>
</blockquote>
<h2 id="دون-معالجة-الأخطاء">دون معالجة الأخطاء</h2>
<p>ينبغي أن يعمل التطبيق <em>تمامًا</em> على النحو التالي:</p>
<pre><code>commands:
0 exit
1 add order
2 list finished tasks
3 list unfinished tasks
4 mark task as finished
5 programmers
6 status of programmer

command: **1**
description: **program the next facebook**
programmer and workload estimate: **jonah 1000**
added!

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric 25**
added!

command: **1**
description: **program an app for music theory revision**
programmer and workload estimate: **nina 12**
added!

command: **1**
description: **program the next twitter**
programmer and workload estimate: **jonah 55**
added!

command: **2**
no finished tasks

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

command: **4**
id: **2**
marked as finished

command: **4**
id: **4**
marked as finished

command: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

command: **5**
jonah
eric
nina

command: **6**
programmer: **jonah**
tasks: finished 1 not finished 1, hours: done 55 scheduled 1000
</code></pre>
<p>تُمنح نقطة التمرين الأولى عن تطبيق يعمل عندما تكون كل مدخلات المستخدم سليمة تمامًا.</p>
<h2 id="معالجة-الأخطاء-في-مدخلات-المستخدم">معالجة الأخطاء في مدخلات المستخدم</h2>
<p>وللحصول على نقطة التمرين الثانية في هذا التمرين، يُتوقّع أن يتعافى تطبيقك من مدخلات المستخدم الخاطئة. وأي مدخل لا يتبع التنسيق المحدّد ينبغي أن يُنتج رسالة خطأ هي <em>erroneous input</em>، وأن يؤدي إلى تكرار آخر للحلقة التي تطلب أمرًا جديدًا:</p>
<pre><code>command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric xxx**
erroneous input

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric**
erroneous input

command: **4**
id: **1000000**
erroneous input

command: **4**
id: **XXXX**
erroneous input

command: **6**
programmer: **unknownprogrammer**
erroneous input
</code></pre>
<p>يُرجى الإجابة على استبيان سريع حول هذا الجزء من الدورة.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6f999303-e9b3-5aa1-b91f-72283853834b)</p>
</blockquote>
`,l={book:s,chapter:n,chapterTitle:a,slug:r,title:e,headings:o,html:p};export{s as book,n as chapter,a as chapterTitle,l as default,o as headings,p as html,r as slug,e as title};
