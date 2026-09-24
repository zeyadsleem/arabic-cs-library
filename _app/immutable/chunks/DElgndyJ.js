const s="hello-algo",n="chapter_backtracking",a="التتبّع الرجعي",l="n_queens_problem",p="مسألة الملكات n",c=[{depth:3,id:"استراتيجية-الوضع-صفا-بصف",text:"استراتيجية الوضع صفاً بصف"},{depth:3,id:"تشذيب-الأعمدة-والأقطار",text:"تشذيب الأعمدة والأقطار"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"}],t=`<div class="note">
<p>وفق قواعد الشطرنج، تستطيع الملكة مهاجمة أي قطعة في الصف نفسه أو العمود نفسه أو القطر نفسه. وبمعطى $n$ ملكة ورقعة شطرنج بحجم $n \\times n$، ابحث عن ترتيب لا تستطيع فيه أي ملكتين مهاجمة إحداهما الأخرى.</p>
</div>
<p>كما يوضح الشكل أدناه، عندما $n = 4$، يوجد حلان يمكن إيجادهما. ومن منظور خوارزمية التتبّع الرجعي، تحتوي رقعة الشطرنج $n \\times n$ على $n^2$ مربعاً، وهذه المربعات توفر جميع الخيارات <code>choices</code>. وخلال عملية وضع الملكات واحدة تلو الأخرى، تتغير حالة رقعة الشطرنج باستمرار، وتمثل رقعة الشطرنج في كل لحظة الحالة <code>state</code>.</p>
<p><img src="/images/hello-algo/chapter_backtracking--solution_4_queens.png" alt="حل مسألة 4 ملكات"></p>
<p>ويوضح الشكل أدناه القيود الثلاثة لهذه المسألة: <strong>لا يمكن لعدة ملكات أن تكون في الصف نفسه أو العمود نفسه أو على القطر نفسه</strong>. ومن الجدير بالذكر أن الأقطار تنقسم إلى نوعين: القطر الرئيسي <code>\\</code> والقطر المضاد <code>/</code>.</p>
<p><img src="/images/hello-algo/chapter_backtracking--n_queens_constraints.png" alt="قيود مسألة الملكات n"></p>
<h3 id="استراتيجية-الوضع-صفا-بصف">استراتيجية الوضع صفاً بصف</h3>
<p>بما أن عدد الملكات وعدد صفوف رقعة الشطرنج كلاهما $n$، يمكننا استنتاج نتيجة بسهولة: <strong>يسمح كل صف في رقعة الشطرنج بوضع ملكة واحدة فقط لا غير</strong>.</p>
<p>وهذا يعني أنه يمكننا اعتماد استراتيجية الوضع صفاً بصف: بدءاً من الصف الأول، نضع ملكة واحدة في كل صف حتى يكتمل الصف الأخير.</p>
<p>ويوضح الشكل أدناه عملية الوضع صفاً بصف لمسألة 4 ملكات. ونظراً لضيق المساحة، لا يوسّع الشكل إلا فرع بحث واحد من الصف الأول، وتُشذَّب جميع المخططات التي تخالف قيد العمود أو القطر.</p>
<p><img src="/images/hello-algo/chapter_backtracking--n_queens_placing.png" alt="استراتيجية الوضع صفاً بصف"></p>
<p>في جوهر الأمر، <strong>تؤدي استراتيجية الوضع صفاً بصف وظيفة التشذيب</strong>، إذ تتجنب جميع فروع البحث التي تظهر فيها عدة ملكات في الصف نفسه.</p>
<h3 id="تشذيب-الأعمدة-والأقطار">تشذيب الأعمدة والأقطار</h3>
<p>لتحقيق قيد العمود، يمكننا استخدام مصفوفة منطقية <code>cols</code> بطول $n$ لتسجيل ما إذا كان في كل عمود ملكة. وقبل كل قرار وضع، نستخدم <code>cols</code> لتشذيب الأعمدة التي تحتوي بالفعل على ملكات، ونحدّث حالة <code>cols</code> ديناميكياً أثناء التتبّع الرجعي.</p>
<div class="note">
<p>يرجى ملاحظة أن أصل المصفوفة يقع في الزاوية العلوية اليسرى، حيث يزداد فهرس الصف من الأعلى إلى الأسفل، ويزداد فهرس العمود من اليسار إلى اليمين.</p>
</div>
<p>فكيف نتعامل مع قيد القطر؟ لنأخذ مربعاً في رقعة الشطرنج بفهرسي صف وعمود $(row, col)$. إذا اخترنا قطراً رئيسياً محدداً في المصفوفة، نجد أن جميع المربعات على ذلك القطر لها الفرق نفسه بين فهرسي الصف والعمود، <strong>أي أن $row - col$ قيمة ثابتة لجميع المربعات على القطر الرئيسي</strong>.</p>
<p>وبعبارة أخرى، إذا حقق مربعان $row_1 - col_1 = row_2 - col_2$، فلا بد أنهما على القطر الرئيسي نفسه. وباستخدام هذا النمط، يمكننا استخدام المصفوفة <code>diags1</code> الموضحة في الشكل أدناه لتسجيل ما إذا كانت هناك ملكة على كل قطر رئيسي.</p>
<p>وبالمثل، <strong>بالنسبة إلى جميع المربعات على قطر مضاد، يكون المجموع $row + col$ قيمة ثابتة</strong>. ويمكننا بالمثل استخدام المصفوفة <code>diags2</code> للتعامل مع قيود الأقطار المضادة.</p>
<p><img src="/images/hello-algo/chapter_backtracking--n_queens_cols_diagonals.png" alt="التعامل مع قيود الأعمدة والأقطار"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>يرجى ملاحظة أنه في مصفوفة مربعة $n \\times n$، يكون نطاق $row - col$ هو $[-n + 1, n - 1]$، ونطاق $row + col$ هو $[0, 2n - 2]$. لذلك يكون عدد الأقطار الرئيسية والأقطار المضادة $2n - 1$، أي أن طول المصفوفتين <code>diags1</code> و<code>diags2</code> هو $2n - 1$.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حل مسألة الملكات n */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">nQueens</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> [][][]<span class="hljs-type">string</span> {
	<span class="hljs-comment">// هيّئ رقعة شطرنج بحجم n*n، حيث تمثّل &#x27;Q&#x27; ملكة و&#x27;#&#x27; خلية فارغة</span>
	state := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">string</span>, n)
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; n; i++ {
		row := <span class="hljs-built_in">make</span>([]<span class="hljs-type">string</span>, n)
		<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; n; i++ {
			row[i] = <span class="hljs-string">&quot;#&quot;</span>
		}
		state[i] = row
	}
	<span class="hljs-comment">// سجّل ما إذا كانت هناك ملكة في العمود</span>
	cols := <span class="hljs-built_in">make</span>([]<span class="hljs-type">bool</span>, n)
	diags1 := <span class="hljs-built_in">make</span>([]<span class="hljs-type">bool</span>, <span class="hljs-number">2</span>*n<span class="hljs-number">-1</span>)
	diags2 := <span class="hljs-built_in">make</span>([]<span class="hljs-type">bool</span>, <span class="hljs-number">2</span>*n<span class="hljs-number">-1</span>)
	res := <span class="hljs-built_in">make</span>([][][]<span class="hljs-type">string</span>, <span class="hljs-number">0</span>)
	backtrack(<span class="hljs-number">0</span>, n, &amp;state, &amp;res, &amp;cols, &amp;diags1, &amp;diags2)
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حل مسألة الملكات n */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">nQueens</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span>[][][] {
    <span class="hljs-comment">// هيّئ رقعة شطرنج بحجم n*n، حيث تمثّل &#x27;Q&#x27; ملكة و&#x27;#&#x27; خلية فارغة</span>
    <span class="hljs-keyword">const</span> state = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: n }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Array</span>(n).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;#&#x27;</span>));
    <span class="hljs-keyword">const</span> cols = <span class="hljs-title class_">Array</span>(n).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// سجّل ما إذا كانت هناك ملكة في العمود</span>
    <span class="hljs-keyword">const</span> diags1 = <span class="hljs-title class_">Array</span>(<span class="hljs-number">2</span> * n - <span class="hljs-number">1</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// سجّل ما إذا كانت هناك ملكة على القطر الرئيسي</span>
    <span class="hljs-keyword">const</span> diags2 = <span class="hljs-title class_">Array</span>(<span class="hljs-number">2</span> * n - <span class="hljs-number">1</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// سجّل ما إذا كانت هناك ملكة على القطر المضاد</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">res</span>: <span class="hljs-built_in">string</span>[][][] = [];

    <span class="hljs-title function_">backtrack</span>(<span class="hljs-number">0</span>, n, state, res, cols, diags1, diags2);
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<p>بوضع $n$ ملكة صفاً بصف، ومع مراعاة قيد العمود، يكون لدينا من الصف الأول إلى الصف الأخير $n$ و$n-1$ و$\\dots$ و$2$ و$1$ خياراً، مستخدمين زمن $O(n!)$. وعند تسجيل حل، من الضروري نسخ المصفوفة <code>state</code> وإضافتها إلى <code>res</code>، وتستخدم عملية النسخ زمن $O(n^2)$. لذلك <strong>يكون التعقيد الزمني الكلي $O(n! \\cdot n^2)$</strong>. وعملياً، يمكن للتشذيب استناداً إلى قيود الأقطار أيضاً أن يقلّص فضاء البحث تقليصاً كبيراً، لذا تكون كفاءة البحث غالباً أفضل من التعقيد الزمني المذكور أعلاه.</p>
<p>تستخدم المصفوفة <code>state</code> مساحة $O(n^2)$، وتستخدم المصفوفات <code>cols</code> و<code>diags1</code> و<code>diags2</code> مساحة $O(n)$ لكل منها. ويبلغ أقصى عمق للتعاود $n$، مستخدماً مساحة إطار مكدس $O(n)$. لذلك <strong>يكون التعقيد المكاني $O(n^2)$</strong>.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:c,html:t};export{s as book,n as chapter,a as chapterTitle,e as default,c as headings,t as html,l as slug,p as title};
