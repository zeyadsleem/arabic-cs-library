const s="hello-algo",n="chapter_tree",a="الأشجار",l="array_representation_of_tree",p="التمثيل المصفوفي للأشجار الثنائية",e=[{depth:2,id:"تمثيل-الأشجار-الثنائية-التامة",text:"تمثيل الأشجار الثنائية التامة"},{depth:2,id:"تمثيل-أي-شجرة-ثنائية",text:"تمثيل أي شجرة ثنائية"},{depth:2,id:"المزايا-والقيود",text:"المزايا والقيود"}],t=`<p>في تمثيل القوائم المترابطة، وحدة تخزين الشجرة الثنائية هي عقدة <code>TreeNode</code>، وتُربَط العقد بمؤشرات. وقد قدّم القسم السابق العمليات الأساسية للأشجار الثنائية في هذا التمثيل.</p>
<p>فهل يمكننا استخدام مصفوفة لتمثيل شجرة ثنائية؟ الجواب نعم.</p>
<h2 id="تمثيل-الأشجار-الثنائية-التامة">تمثيل الأشجار الثنائية التامة</h2>
<p>لنحلّل أولاً حالة بسيطة. بمعطى شجرة ثنائية تامة (perfect binary tree)، نخزّن جميع العقد في مصفوفة وفق ترتيب الاجتياز بالمستويات، حيث يقابل كل عقدة فهرس فريد في المصفوفة.</p>
<p>واستناداً إلى خصائص الاجتياز بالمستويات، يمكننا استنتاج &quot;صيغة تعيين&quot; بين فهرس العقدة الأب وفهرسي العقدتين الابنتين: <strong>إذا كان فهرس عقدة ما $i$، فإن فهرس ابنها الأيسر هو $2i + 1$ وفهرس ابنها الأيمن هو $2i + 2$</strong>. ويوضح الشكل أدناه علاقات التعيين بين فهارس العقد المختلفة.</p>
<p><img src="/images/hello-algo/chapter_tree--array_representation_binary_tree.png" alt="التمثيل المصفوفي لشجرة ثنائية تامة"></p>
<p><strong>تؤدي صيغة التعيين دوراً مشابهاً لدور مراجع العقد (المؤشرات) في القوائم المترابطة</strong>. فبمعطى أي عقدة في المصفوفة، يمكننا الوصول إلى عقدة ابنها الأيسر (الأيمن) باستخدام صيغة التعيين.</p>
<h2 id="تمثيل-أي-شجرة-ثنائية">تمثيل أي شجرة ثنائية</h2>
<p>الأشجار الثنائية التامة حالة خاصة؛ إذ توجد عادةً في المستويات الوسطى من الشجرة الثنائية قيم <code>None</code> كثيرة. ولأن تسلسل الاجتياز بالمستويات لا يتضمن قيم <code>None</code> هذه، لا يمكننا استنتاج عدد قيم <code>None</code> وتوزيعها اعتماداً على هذا التسلسل وحده. <strong>وهذا يعني أن بنى أشجار ثنائية متعددة يمكن أن تقابل تسلسل الاجتياز بالمستويات نفسه</strong>.</p>
<p>وكما يوضح الشكل أدناه، بمعطى شجرة ثنائية غير تامة، تفشل طريقة التمثيل المصفوفي أعلاه.</p>
<p><img src="/images/hello-algo/chapter_tree--array_representation_without_empty.png" alt="تسلسل الاجتياز بالمستويات يقابل احتمالات متعددة للشجرة الثنائية"></p>
<p>لحل هذه المشكلة، <strong>يمكننا كتابة جميع قيم <code>None</code> صراحةً في تسلسل الاجتياز بالمستويات</strong>. وكما يوضح الشكل أدناه، بمجرد فعل ذلك، يستطيع تسلسل الاجتياز بالمستويات تمثيل شجرة ثنائية تمثيلاً فريداً. والشيفرة المثالية كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* التمثيل المصفوفي لشجرة ثنائية */</span>
<span class="hljs-comment">// استخدام شريحة من النوع any، بما يسمح باستخدام nil لتعليم المواضع الفارغة</span>
tree := []any{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-literal">nil</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-literal">nil</span>, <span class="hljs-literal">nil</span>, <span class="hljs-number">12</span>, <span class="hljs-literal">nil</span>, <span class="hljs-literal">nil</span>, <span class="hljs-number">15</span>}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* التمثيل المصفوفي لشجرة ثنائية */</span>
<span class="hljs-comment">// استخدام null لتمثيل المواضع الفارغة</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">tree</span>: (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">12</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">15</span>];
</code></pre>
</div>
<p><img src="/images/hello-algo/chapter_tree--array_representation_with_empty.png" alt="التمثيل المصفوفي لشجرة ثنائية عشوائية"></p>
<p>جدير بالذكر أن <strong>الأشجار الثنائية الكاملة ملائمة جداً للتمثيل المصفوفي</strong>. وباستذكار تعريف الشجرة الثنائية الكاملة، لا تظهر <code>None</code> إلا في المستوى السفلي وفي الجهة اليمنى، <strong>ما يعني أن جميع قيم <code>None</code> يجب أن تظهر في نهاية تسلسل الاجتياز بالمستويات</strong>.</p>
<p>وهذا يعني أنه عند استخدام مصفوفة لتمثيل شجرة ثنائية كاملة، يمكن إغفال تخزين جميع قيم <code>None</code>، وهو أمر مريح للغاية. ويقدّم الشكل أدناه مثالاً على ذلك.</p>
<p><img src="/images/hello-algo/chapter_tree--array_representation_complete_binary_tree.png" alt="التمثيل المصفوفي لشجرة ثنائية كاملة"></p>
<p>تُنفِّذ الشيفرة التالية شجرة ثنائية باستخدام التمثيل المصفوفي، وتشمل العمليات التالية:</p>
<ul>
<li>بمعطى عقدة، الحصول على قيمتها، وعلى عقدة ابنها الأيسر (الأيمن)، وعلى العقدة الأب.</li>
<li>الحصول على تسلسلات الاجتياز المسبق والوسطي واللاحق وبالمستويات.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* صنف الشجرة الثنائية الممثلة بالمصفوفة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayBinaryTree</span> {
    #<span class="hljs-attr">tree</span>: (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[];

    <span class="hljs-comment">/* الباني */</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">arr</span>: (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[]</span>) {
        <span class="hljs-variable language_">this</span>.#tree = arr;
    }

    <span class="hljs-comment">/* سعة القائمة */</span>
    <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#tree.<span class="hljs-property">length</span>;
    }

    <span class="hljs-comment">/* احصل على قيمة العقدة عند الفهرس i */</span>
    <span class="hljs-title function_">val</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> {
        <span class="hljs-comment">// إذا خرج الفهرس عن الحدود، أعد null لتمثيل موضع فارغ</span>
        <span class="hljs-keyword">if</span> (i &lt; <span class="hljs-number">0</span> || i &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">size</span>()) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#tree[i];
    }

    <span class="hljs-comment">/* احصل على فهرس عقدة الابن الأيسر للعقدة عند الفهرس i */</span>
    <span class="hljs-title function_">left</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>;
    }

    <span class="hljs-comment">/* احصل على فهرس عقدة الابن الأيمن للعقدة عند الفهرس i */</span>
    <span class="hljs-title function_">right</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * i + <span class="hljs-number">2</span>;
    }

    <span class="hljs-comment">/* احصل على فهرس العقدة الأب للعقدة عند الفهرس i */</span>
    <span class="hljs-title function_">parent</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((i - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>); <span class="hljs-comment">// قسمة بتقريب للأسفل</span>
    }

    <span class="hljs-comment">/* الاجتياز بالمستويات */</span>
    <span class="hljs-title function_">levelOrder</span>(): <span class="hljs-built_in">number</span>[] {
        <span class="hljs-keyword">let</span> res = [];
        <span class="hljs-comment">// اجتَز المصفوفة مباشرة</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">size</span>(); i++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i) !== <span class="hljs-literal">null</span>) res.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i));
        }
        <span class="hljs-keyword">return</span> res;
    }

    <span class="hljs-comment">/* الاجتياز بالعمق أولاً */</span>
    #<span class="hljs-title function_">dfs</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">order</span>: <span class="hljs-title class_">Order</span>, <span class="hljs-attr">res</span>: (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[]): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// إذا كان الموضع فارغاً، عُد</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i) === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>;
        <span class="hljs-comment">// الاجتياز المسبق</span>
        <span class="hljs-keyword">if</span> (order === <span class="hljs-string">&#x27;pre&#x27;</span>) res.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i));
        <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">dfs</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">left</span>(i), order, res);
        <span class="hljs-comment">// الاجتياز الوسطي</span>
        <span class="hljs-keyword">if</span> (order === <span class="hljs-string">&#x27;in&#x27;</span>) res.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i));
        <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">dfs</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">right</span>(i), order, res);
        <span class="hljs-comment">// الاجتياز اللاحق</span>
        <span class="hljs-keyword">if</span> (order === <span class="hljs-string">&#x27;post&#x27;</span>) res.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">val</span>(i));
    }

    <span class="hljs-comment">/* الاجتياز المسبق */</span>
    <span class="hljs-title function_">preOrder</span>(): (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[] {
        <span class="hljs-keyword">const</span> res = [];
        <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">dfs</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;pre&#x27;</span>, res);
        <span class="hljs-keyword">return</span> res;
    }

    <span class="hljs-comment">/* الاجتياز الوسطي */</span>
    <span class="hljs-title function_">inOrder</span>(): (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[] {
        <span class="hljs-keyword">const</span> res = [];
        <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">dfs</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;in&#x27;</span>, res);
        <span class="hljs-keyword">return</span> res;
    }

    <span class="hljs-comment">/* الاجتياز اللاحق */</span>
    <span class="hljs-title function_">postOrder</span>(): (<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[] {
        <span class="hljs-keyword">const</span> res = [];
        <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">dfs</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;post&#x27;</span>, res);
        <span class="hljs-keyword">return</span> res;
    }
}
</code></pre>
</div>
<h2 id="المزايا-والقيود">المزايا والقيود</h2>
<p>يتمتع التمثيل المصفوفي للأشجار الثنائية بالمزايا التالية:</p>
<ul>
<li>تُخزَّن المصفوفات في مساحة ذاكرة متجاورة، وهو ما يلائم ذاكرة التخزين المؤقت (cache) ويتيح وصولاً واجتيازاً أسرع.</li>
<li>لا يتطلب تخزين مؤشرات، وهو ما يوفّر المساحة.</li>
<li>يتيح الوصول العشوائي إلى العقد.</li>
</ul>
<p>ومع ذلك، فإن التمثيل المصفوفي له أيضاً بعض القيود:</p>
<ul>
<li>يتطلب التخزين المصفوفي مساحة ذاكرة متجاورة، لذا فهو غير مناسب لتخزين أشجار ذات كمية كبيرة من البيانات.</li>
<li>تتطلب إضافة العقد أو إزالتها عمليات إدراج وحذف في المصفوفة، وهي عمليات أقل كفاءة.</li>
<li>عندما تكثر قيم <code>None</code> في الشجرة الثنائية، تنخفض نسبة بيانات العقد التي تحتويها المصفوفة، مما يؤدي إلى انخفاض استخدام المساحة.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
