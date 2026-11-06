const a="hello-algo",s="chapter_backtracking",n="Backtracking",t="backtracking_algorithm",e="خوارزمية التتبّع الرجعي",p=[{depth:2,id:"المحاولة-والتتبع-الرجعي",text:"المحاولة والتتبّع الرجعي"},{depth:2,id:"التشذيب",text:"التشذيب"},{depth:2,id:"شيفرة-الإطار",text:"شيفرة الإطار"},{depth:2,id:"المصطلحات-الشائعة",text:"المصطلحات الشائعة"},{depth:2,id:"المزايا-والقيود",text:"المزايا والقيود"},{depth:2,id:"أمثلة-نموذجية-على-التتبع-الرجعي",text:"أمثلة نموذجية على التتبّع الرجعي"}],l=`<p><u>خوارزمية التتبّع الرجعي</u> (backtracking algorithm) أسلوب لحل المسائل عبر البحث الشامل. وتتمثل فكرتها الجوهرية في البدء من حالة أولية والبحث الشامل في جميع الحلول الممكنة. وعند العثور على حل صحيح، يُسجَّل. وتستمر هذه العملية حتى العثور على حل أو تجربة جميع الخيارات الممكنة دون العثور على حل.</p>
<p>تستخدم خوارزمية التتبّع الرجعي عادةً «البحث بالعمق أولاً» لاجتياز فضاء الحلول. وقد ذكرنا في فصل «الشجرة الثنائية» أن الاجتيازات المسبق والوسطي واللاحق تنتمي جميعاً إلى البحث بالعمق أولاً. وسنبني بعد ذلك مسألة تتبّع رجعي باستخدام الاجتياز المسبق لنفهم تدريجياً كيفية عمل خوارزمية التتبّع الرجعي.</p>
<div class="note">
<p class="note__title">مثال 1</p>
<p>بمعطى شجرة ثنائية، ابحث وسجّل جميع العقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span>، وأعد قائمة بهذه العقد.</p>
</div>
<p>بالنسبة إلى هذه المسألة، ننفّذ اجتيازاً مسبقاً للشجرة ونتحقق مما إذا كانت قيمة العقدة الحالية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span>. وإذا كانت كذلك، نضيف العقدة إلى قائمة النتائج <code>res</code>. ويظهر التنفيذ ذو الصلة في الشكل والشيفرة التاليين:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pre_order</span>(<span class="hljs-params">root: TreeNode</span>):
    <span class="hljs-string">&quot;&quot;&quot;اجتياز الطلب المسبق: مثال 1&quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> root <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
        <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> root.val == <span class="hljs-number">7</span>:
        <span class="hljs-comment"># سجّل الحل</span>
        res.append(root)
    pre_order(root.left)
    pre_order(root.right)
</code></pre>
</div>
![البحث عن العقد في الاجتياز المسبق](/images/hello-algo/chapter_backtracking--preorder_find_nodes.png)
<h2 id="المحاولة-والتتبع-الرجعي">المحاولة والتتبّع الرجعي</h2>
<p><strong>سُمّيت خوارزمية التتبّع الرجعي بهذا الاسم لأنها تستخدم استراتيجيتَي «المحاولة» و«التتبّع الرجعي» عند البحث في فضاء الحلول</strong>. وعندما تصادف الخوارزمية حالة لا تستطيع فيها المضي قدماً أو لا تجد حلاً يحقق القيود، فإنها تلغي الاختيار السابق، وتعود إلى حالة سابقة، وتجرب خيارات ممكنة أخرى.</p>
<p>في المثال 1، تمثل زيارة كل عقدة «محاولة»، بينما يمثل تجاوز عقدة ورقية أو عبارة <code>return</code> التي تعيد الاجتياز إلى العقدة الأب «تتبّعاً رجعياً».</p>
<p>ومن الجدير بالذكر أن <strong>التتبّع الرجعي لا يقتصر على عودة الدوال وحدها</strong>. ولتوضيح ذلك، لنوسّع المثال 1 قليلاً.</p>
<div class="note">
<p class="note__title">مثال 2</p>
<p>في شجرة ثنائية، ابحث عن جميع العقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span>، <strong>وأعد المسارات من عقدة الجذر إلى هذه العقد</strong>.</p>
</div>
<p>استناداً إلى شيفرة المثال 1، نحتاج إلى استخدام قائمة <code>path</code> لتسجيل مسار العقد المزارة. وعندما نصل إلى عقدة قيمتها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span>، ننسخ <code>path</code> ونضيفها إلى قائمة النتائج <code>res</code>. وبعد اكتمال الاجتياز، تحتوي <code>res</code> على جميع الحلول. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pre_order</span>(<span class="hljs-params">root: TreeNode</span>):
    <span class="hljs-string">&quot;&quot;&quot;اجتياز الطلب المسبق: مثال 2&quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> root <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
        <span class="hljs-keyword">return</span>
    <span class="hljs-comment"># تجربة</span>
    path.append(root)
    <span class="hljs-keyword">if</span> root.val == <span class="hljs-number">7</span>:
        <span class="hljs-comment"># سجّل الحل</span>
        res.append(<span class="hljs-built_in">list</span>(path))
    pre_order(root.left)
    pre_order(root.right)
    <span class="hljs-comment"># تراجع</span>
    path.pop()
</code></pre>
</div>
في كل «محاولة»، نسجّل المسار بإضافة العقدة الحالية إلى \`path\`؛ وقبل «التتبّع الرجعي»، نحتاج إلى إزالة العقدة من \`path\`، **لاستعادة الحالة قبل هذه المحاولة**.
<p>وبمراقبة العملية الموضحة في الشكل التالي، <strong>يمكننا فهم المحاولة والتتبّع الرجعي على أنهما «التقدم» و«الإلغاء»</strong>، وهما عمليتان متعاكستان.</p>
<h2 id="التشذيب">التشذيب</h2>
<p>تحتوي مسائل التتبّع الرجعي المعقدة عادةً على قيد واحد أو أكثر. <strong>ويمكن عادةً استخدام القيود في «التشذيب»</strong>.</p>
<div class="note">
<p class="note__title">مثال 3</p>
<p>في شجرة ثنائية، ابحث عن جميع العقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span> وأعد المسارات من عقدة الجذر إلى هذه العقد، <strong>لكن بشرط ألا تحتوي المسارات على عقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn></mrow><annotation encoding="application/x-tex">3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></strong>.</p>
</div>
<p>لتحقيق القيود أعلاه، <strong>نحتاج إلى إضافة عمليات تشذيب</strong>: أثناء عملية البحث، إذا صادفنا عقدة قيمتها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn></mrow><annotation encoding="application/x-tex">3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span>، نعود مبكراً ولا نواصل البحث. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pre_order</span>(<span class="hljs-params">root: TreeNode</span>):
    <span class="hljs-string">&quot;&quot;&quot;اجتياز الطلب المسبق: مثال 3&quot;&quot;&quot;</span>
    <span class="hljs-comment"># تشذيب</span>
    <span class="hljs-keyword">if</span> root <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span> <span class="hljs-keyword">or</span> root.val == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span>
    <span class="hljs-comment"># تجربة</span>
    path.append(root)
    <span class="hljs-keyword">if</span> root.val == <span class="hljs-number">7</span>:
        <span class="hljs-comment"># سجّل الحل</span>
        res.append(<span class="hljs-built_in">list</span>(path))
    pre_order(root.left)
    pre_order(root.right)
    <span class="hljs-comment"># تراجع</span>
    path.pop()
</code></pre>
</div>
«التشذيب» مصطلح معبّر. وكما يوضح الشكل التالي، أثناء عملية البحث، **نقوم «بتشذيب» فروع البحث التي لا تحقق القيود**، متجنبين بذلك كثيراً من المحاولات بلا معنى، وبالتالي نحسّن كفاءة البحث.
<p><img src="/arabic-cs-library/images/hello-algo/chapter_backtracking--preorder_find_constrained_paths.png" alt="التشذيب وفق القيود"></p>
<h2 id="شيفرة-الإطار">شيفرة الإطار</h2>
<p>بعد ذلك، نحاول استخلاص إطار عام يتمحور حول «المحاولة والتتبّع الرجعي والتشذيب» في التتبّع الرجعي لتحسين عمومية الشيفرة.</p>
<p>في شيفرة الإطار التالية، تمثّل <code>state</code> الحالة الحالية للمسألة، وتمثّل <code>choices</code> الخيارات المتاحة في الحالة الحالية:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">backtrack</span>(<span class="hljs-params">state: State, choices: <span class="hljs-built_in">list</span>[choice], res: <span class="hljs-built_in">list</span>[state]</span>):
    <span class="hljs-string">&quot;&quot;&quot;Backtracking algorithm framework&quot;&quot;&quot;</span>
    <span class="hljs-comment"># Check if it is a solution</span>
    <span class="hljs-keyword">if</span> is_solution(state):
        <span class="hljs-comment"># Record the solution</span>
        record_solution(state, res)
        <span class="hljs-comment"># Stop searching</span>
        <span class="hljs-keyword">return</span>
    <span class="hljs-comment"># Traverse all choices</span>
    <span class="hljs-keyword">for</span> choice <span class="hljs-keyword">in</span> choices:
        <span class="hljs-comment"># Pruning: check if the choice is valid</span>
        <span class="hljs-keyword">if</span> is_valid(state, choice):
            <span class="hljs-comment"># Attempt: make a choice and update the state</span>
            make_choice(state, choice)
            backtrack(state, choices, res)
            <span class="hljs-comment"># Backtrack: undo the choice and restore to the previous state</span>
            undo_choice(state, choice)
</code></pre>
</div>
بعد ذلك، نحل المثال 3 استناداً إلى شيفرة الإطار. فالحالة \`state\` هي مسار اجتياز العقد، والخيارات \`choices\` هي عقدتا الابن اليسرى واليمنى للعقدة الحالية، والنتيجة \`res\` هي قائمة مسارات:
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">backtrack</span>(<span class="hljs-params">
    state: <span class="hljs-built_in">list</span>[TreeNode], choices: <span class="hljs-built_in">list</span>[TreeNode], res: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">list</span>[TreeNode]]
</span></code></pre>
</div>
وفق نص المسألة، ينبغي أن نواصل البحث بعد العثور على عقدة قيمتها $7$. **لذلك نحتاج إلى إزالة عبارة \`return\` بعد تسجيل الحل**. ويقارن الشكل التالي عملية البحث مع وجود عبارة \`return\` وبدونها.
<p><img src="/arabic-cs-library/images/hello-algo/chapter_backtracking--backtrack_remove_return_or_not.png" alt="مقارنة عملية البحث مع عبارة return وبدونها"></p>
<p>وبالمقارنة مع الشيفرة المبنية على الاجتياز المسبق، تبدو الشيفرة المبنية على إطار خوارزمية التتبّع الرجعي أكثر إسهاباً، لكنها أكثر عمومية. وفي الواقع، <strong>يمكن حل كثير من مسائل التتبّع الرجعي داخل هذا الإطار</strong>. ولا نحتاج إلا إلى تعريف <code>state</code> و<code>choices</code> للمسألة المحددة وتنفيذ كل دالة في الإطار.</p>
<h2 id="المصطلحات-الشائعة">المصطلحات الشائعة</h2>
<p>لتحليل المسائل الخوارزمية تحليلاً أوضح، نلخص معاني المصطلحات الشائعة المستخدمة في خوارزميات التتبّع الرجعي ونقدم أمثلة مقابلة من المثال 3، كما في الجدول التالي.</p>
<p align="center"> جدول <id> &nbsp; المصطلحات الشائعة في خوارزمية التتبّع الرجعي </p>
<table>
<thead>
<tr>
<th>المصطلح</th>
<th>التعريف</th>
<th>المثال 3</th>
</tr>
</thead>
<tbody>
<tr>
<td>الحل (solution)</td>
<td>الحل إجابة تحقق الشروط المحددة لمسألة ما؛ وقد يوجد حل واحد أو أكثر</td>
<td>جميع المسارات من الجذر إلى العقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span> التي تحقق القيد</td>
</tr>
<tr>
<td>القيد (constraint)</td>
<td>القيد شرط في المسألة يحدّ من جدوى الحلول، ويُستخدم عادةً للتشذيب</td>
<td>ألا تحتوي المسارات على عقد ذات القيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn></mrow><annotation encoding="application/x-tex">3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></td>
</tr>
<tr>
<td>الحالة (state)</td>
<td>تمثل الحالة وضع المسألة في لحظة معينة، بما في ذلك الخيارات المتخذة بالفعل</td>
<td>مسار العقد المزار حالياً، أي قائمة العقد <code>path</code></td>
</tr>
<tr>
<td>المحاولة (attempt)</td>
<td>المحاولة عملية استكشاف فضاء الحلول وفق الخيارات المتاحة، وتشمل اتخاذ الخيارات وتحديث الحالة والتحقق مما إذا كانت حلاً</td>
<td>زيارة عقدتي الابن اليسرى (اليمنى) تعاودياً، وإضافة العقد إلى <code>path</code>، والتحقق مما إذا كانت قيمة العقدة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>7</mn></mrow><annotation encoding="application/x-tex">7</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">7</span></span></span></span></td>
</tr>
<tr>
<td>التتبّع الرجعي (backtracking)</td>
<td>التتبّع الرجعي إلغاء الخيارات السابقة والعودة إلى حالة سابقة عند مصادفة حالة لا تحقق القيود</td>
<td>التوقف عن البحث عند تجاوز العقد الورقية، أو انتهاء زيارات العقد، أو مصادفة عقد قيمتها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn></mrow><annotation encoding="application/x-tex">3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span>؛ وعودة الدالة</td>
</tr>
<tr>
<td>التشذيب (pruning)</td>
<td>التشذيب أسلوب لتجنب مسارات البحث بلا معنى وفق خصائص المسألة وقيودها، ويمكنه تحسين كفاءة البحث</td>
<td>عند مصادفة عقدة قيمتها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn></mrow><annotation encoding="application/x-tex">3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span>، لا تواصل البحث</td>
</tr>
</tbody>
</table>
<div class="note">
<p>مفاهيم المسألة والحل والحالة وغيرها مفاهيم عامة، وتظهر في التقسيم والتغلب والتتبّع الرجعي والبرمجة الديناميكية والخوارزميات الجشعة وغيرها.</p>
</div>
<h2 id="المزايا-والقيود">المزايا والقيود</h2>
<p>خوارزمية التتبّع الرجعي في جوهرها خوارزمية بحث بالعمق أولاً تجرب جميع الحلول الممكنة حتى تجد حلاً يحقق الشروط. وتتمثل ميزة هذا الأسلوب في أنه يستطيع إيجاد جميع الحلول الممكنة، ومع عمليات تشذيب معقولة يحقق كفاءة عالية.</p>
<p>غير أنه عند التعامل مع مسائل واسعة النطاق أو معقدة، <strong>قد تكون كفاءة تشغيل خوارزمية التتبّع الرجعي غير مقبولة</strong>.</p>
<ul>
<li><strong>الزمن</strong>: تحتاج خوارزمية التتبّع الرجعي عادةً إلى اجتياز جميع الاحتمالات في فضاء الحالات، وقد يبلغ التعقيد الزمني رتبة أسية أو عاملية.</li>
<li><strong>المكان</strong>: أثناء الاستدعاءات التعاودية، يجب حفظ الحالة الحالية (مثل المسارات، والمتغيرات المساعدة المستخدمة في التشذيب، وغيرها)، وعندما يكون العمق كبيراً قد تصبح متطلبات المساحة كبيرة جداً.</li>
</ul>
<p>ومع ذلك، <strong>تبقى خوارزمية التتبّع الرجعي أفضل حل لبعض مسائل البحث ومسائل تحقيق القيود</strong>. فبالنسبة إلى هذه المسائل، وبما أننا لا نستطيع التنبؤ بالخيارات التي ستولّد حلولاً صحيحة، يجب علينا اجتياز جميع الخيارات الممكنة. وفي هذه الحالة، <strong>يكمن المفتاح في كيفية تحسين الكفاءة</strong>. وهناك طريقتان شائعتان لتحسين الكفاءة.</p>
<ul>
<li><strong>التشذيب</strong>: تجنب البحث في المسارات التي لا يُتوقع أن تنتج حلولاً، وبذلك نوفر الزمن والمساحة.</li>
<li><strong>البحث الاستكشافي</strong>: إدخال استراتيجيات معينة أو قيم تقديرية أثناء عملية البحث لإعطاء الأولوية للبحث في المسارات الأكثر احتمالاً لإنتاج حلول صحيحة.</li>
</ul>
<h2 id="أمثلة-نموذجية-على-التتبع-الرجعي">أمثلة نموذجية على التتبّع الرجعي</h2>
<p>يمكن استخدام خوارزمية التتبّع الرجعي لحل كثير من مسائل البحث ومسائل تحقيق القيود ومسائل التحسين التوافقي.</p>
<p><strong>مسائل البحث</strong>: هدف هذه المسائل إيجاد حلول تحقق شروطاً محددة.</p>
<ul>
<li>مسألة التباديل: بمعطى مجموعة، أوجد جميع التباديل والتوافيق الممكنة.</li>
<li>مسألة مجموع المجموعات الجزئية: بمعطى مجموعة ومجموع هدف، أوجد جميع المجموعات الجزئية في المجموعة التي يساوي مجموع عناصرها الهدف.</li>
<li>أبراج هانوي: بمعطى ثلاثة أعمدة وسلسلة من الأقراص مختلفة الأحجام، انقل جميع الأقراص من عمود إلى آخر، بنقل قرص واحد فقط في كل مرة، ودون وضع قرص أكبر على قرص أصغر أبداً.</li>
</ul>
<p><strong>مسائل تحقيق القيود</strong>: هدف هذه المسائل إيجاد حلول تحقق جميع القيود.</p>
<ul>
<li>مسألة الملكات n: ضع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> ملكة على رقعة شطرنج <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>×</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">n \\times n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> بحيث لا تهاجم إحداها الأخرى.</li>
<li>سودوكو: املأ الأعداد من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>9</mn></mrow><annotation encoding="application/x-tex">9</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">9</span></span></span></span> في شبكة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>9</mn><mo>×</mo><mn>9</mn></mrow><annotation encoding="application/x-tex">9 \\times 9</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">9</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">9</span></span></span></span> بحيث لا يحتوي كل صف وكل عمود وكل شبكة فرعية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn><mo>×</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">3 \\times 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">3</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span> على أرقام مكررة.</li>
<li>تلوين الرسوم البيانية: بمعطى رسم بياني غير موجه، لوّن كل رأس بأقل عدد من الألوان بحيث يكون لأي رأسين متجاورين لونان مختلفان.</li>
</ul>
<p><strong>مسائل التحسين التوافقي</strong>: هدف هذه المسائل إيجاد حل أمثل يحقق شروطاً معينة في فضاء توافقي.</p>
<ul>
<li>حقيبة الظهر 0-1: بمعطى مجموعة من العناصر وحقيبة ظهر، لكل عنصر قيمة ووزن. وفي ظل قيد سعة الحقيبة، اختر العناصر لتعظيم القيمة الإجمالية.</li>
<li>مسألة البائع المتجول: بدءاً من نقطة في رسم بياني، زُر جميع النقاط الأخرى مرة واحدة بالضبط ثم عد إلى نقطة البداية، وأوجد أقصر مسار.</li>
<li>الزمرة العظمى: بمعطى رسم بياني غير موجه، أوجد أكبر رسم فرعي كامل، أي رسم فرعي تكون فيه أي رأسين متصلتين بضلع.</li>
</ul>
<p>لاحظ أن التتبّع الرجعي ليس الحل الأمثل لكثير من مسائل التحسين التوافقي.</p>
<ul>
<li>تُحل مسألة حقيبة الظهر 0-1 عادةً باستخدام البرمجة الديناميكية لتحقيق كفاءة زمنية أعلى.</li>
<li>مسألة البائع المتجول مسألة شهيرة من صنف NP-Hard؛ ومن الحلول الشائعة لها الخوارزميات الجينية وخوارزميات مستعمرة النمل.</li>
<li>مسألة الزمرة العظمى مسألة كلاسيكية في نظرية الرسوم البيانية، ويمكن حلها باستخدام خوارزميات استكشافية مثل الخوارزميات الجشعة.</li>
</ul>
`,o={book:a,chapter:s,chapterTitle:n,slug:t,title:e,headings:p,html:l};export{a as book,s as chapter,n as chapterTitle,o as default,p as headings,l as html,t as slug,e as title};
