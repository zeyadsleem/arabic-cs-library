const n="hello-algo",s="chapter_divide_and_conquer",e="التقسيم والتغلب",a="build_binary_tree_problem",r="مسألة بناء شجرة ثنائية",l=[{depth:3,id:"تحديد-ما-إذا-كانت-المسألة-من-مسائل-التقسيم-والتغلب",text:"تحديد ما إذا كانت المسألة من مسائل التقسيم والتغلب"},{depth:3,id:"كيفية-تقسيم-الأشجار-الفرعية",text:"كيفية تقسيم الأشجار الفرعية"},{depth:3,id:"تمثيل-مجالات-الأشجار-الفرعية-بالمتغيرات",text:"تمثيل مجالات الأشجار الفرعية بالمتغيرات"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"}],o=`<div class="note">
<p>بمعطى الاجتياز المسبق <code>preorder</code> والاجتياز الوسطي <code>inorder</code> لشجرة ثنائية، ابنِ الشجرة الثنائية وأعد عقدة جذرها. افترض أنه لا توجد قيم عقد مكررة في الشجرة الثنائية (كما في الشكل أدناه).</p>
</div>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--build_tree_example.png" alt="بيانات مثال لبناء شجرة ثنائية"></p>
<h3 id="تحديد-ما-إذا-كانت-المسألة-من-مسائل-التقسيم-والتغلب">تحديد ما إذا كانت المسألة من مسائل التقسيم والتغلب</h3>
<p>تُعرَّف المسألة الأصلية بأنها بناء شجرة ثنائية من <code>preorder</code> و<code>inorder</code>، وهي مسألة نموذجية من مسائل التقسيم والتغلب.</p>
<ul>
<li><strong>المسألة قابلة للتفكيك</strong>: من منظور التقسيم والتغلب، يمكننا تقسيم المسألة الأصلية إلى مسألتين فرعيتين: بناء الشجرة الفرعية اليسرى وبناء الشجرة الفرعية اليمنى، إضافةً إلى عملية واحدة: تهيئة عقدة الجذر. ولكل شجرة فرعية (مسألة فرعية)، يمكننا إعادة استخدام طريقة التقسيم السابقة، وتقسيمها إلى أشجار فرعية (مسائل فرعية) أصغر حتى الوصول إلى أصغر مسألة فرعية (شجرة فرعية فارغة).</li>
<li><strong>المسائل الفرعية مستقلة</strong>: الشجرتان الفرعيتان اليسرى واليمنى مستقلتان إحداهما عن الأخرى، ولا تداخل بينهما. فعند بناء الشجرة الفرعية اليسرى، لا نحتاج إلا إلى التركيز على الأجزاء المقابلة للشجرة الفرعية اليسرى في الاجتيازين الوسطي والمسبق. وينطبق الشيء نفسه على الشجرة الفرعية اليمنى.</li>
<li><strong>حلول المسائل الفرعية قابلة للدمج</strong>: بمجرد أن نحصل على الشجرتين الفرعيتين اليسرى واليمنى (حلّي المسألتين الفرعيتين)، يمكننا ربطهما بعقدة الجذر للحصول على حل المسألة الأصلية.</li>
</ul>
<h3 id="كيفية-تقسيم-الأشجار-الفرعية">كيفية تقسيم الأشجار الفرعية</h3>
<p>استناداً إلى التحليل السابق، يمكن حل هذه المسألة باستخدام التقسيم والتغلب، <strong>لكن كيف نقسّم الشجرتين الفرعيتين اليسرى واليمنى عبر الاجتياز المسبق <code>preorder</code> والاجتياز الوسطي <code>inorder</code></strong>؟</p>
<p>وفقاً للتعريف، يمكن تقسيم كل من <code>preorder</code> و<code>inorder</code> إلى ثلاثة أجزاء.</p>
<ul>
<li>الاجتياز المسبق: <code>[ عقدة الجذر | الشجرة الفرعية اليسرى | الشجرة الفرعية اليمنى ]</code>، فمثلاً تقابل الشجرة في الشكل أعلاه <code>[ 3 | 9 | 2 1 7 ]</code>.</li>
<li>الاجتياز الوسطي: <code>[ الشجرة الفرعية اليسرى | عقدة الجذر | الشجرة الفرعية اليمنى ]</code>، فمثلاً تقابل الشجرة في الشكل أعلاه <code>[ 9 | 3 | 1 2 7 ]</code>.</li>
</ul>
<p>وباستخدام بيانات الشكل أعلاه كمثال، يمكننا الحصول على نتائج التقسيم عبر الخطوات الموضحة في الشكل أدناه.</p>
<ol>
<li>العنصر الأول 3 في الاجتياز المسبق هو قيمة عقدة الجذر.</li>
<li>ابحث عن فهرس عقدة الجذر 3 في <code>inorder</code>، واستخدم هذا الفهرس لتقسيم <code>inorder</code> إلى <code>[ 9 | 3 | 1 2 7 ]</code>.</li>
<li>استناداً إلى نتيجة تقسيم <code>inorder</code>، يسهل تحديد أن الشجرتين الفرعيتين اليسرى واليمنى تحتويان على 1 و3 عقد على التوالي، مما يتيح لنا تقسيم <code>preorder</code> إلى <code>[ 3 | 9 | 2 1 7 ]</code>.</li>
</ol>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--build_tree_preorder_inorder_division.png" alt="تقسيم الأشجار الفرعية في الاجتيازين المسبق والوسطي"></p>
<h3 id="تمثيل-مجالات-الأشجار-الفرعية-بالمتغيرات">تمثيل مجالات الأشجار الفرعية بالمتغيرات</h3>
<p>استناداً إلى طريقة التقسيم السابقة، <strong>حصلنا على مجالات فهارس عقدة الجذر والشجرة الفرعية اليسرى والشجرة الفرعية اليمنى في <code>preorder</code> و<code>inorder</code></strong>. ولتمثيل مجالات الفهارس هذه، نحتاج إلى استخدام عدة متغيرات فهرس.</p>
<ul>
<li>نرمز لفهرس عقدة جذر الشجرة الحالية في <code>preorder</code> بـ$i$.</li>
<li>نرمز لفهرس عقدة جذر الشجرة الحالية في <code>inorder</code> بـ$m$.</li>
<li>نرمز لمجال فهارس الشجرة الحالية في <code>inorder</code> بـ$[l, r]$.</li>
</ul>
<p>وكما يوضح الجدول أدناه، يمكننا عبر هذه المتغيرات تمثيل فهرس عقدة الجذر في <code>preorder</code> ومجالات فهارس الأشجار الفرعية في <code>inorder</code>.</p>
<p align="center"> الجدول <id> &nbsp; فهارس عقدة الجذر والأشجار الفرعية في الاجتيازين المسبق والوسطي </p>
<table>
<thead>
<tr>
<th></th>
<th>فهرس عقدة الجذر في <code>preorder</code></th>
<th>مجال فهارس الشجرة الفرعية في <code>inorder</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>الشجرة الحالية</td>
<td>$i$</td>
<td>$[l, r]$</td>
</tr>
<tr>
<td>الشجرة الفرعية اليسرى</td>
<td>$i + 1$</td>
<td>$[l, m-1]$</td>
</tr>
<tr>
<td>الشجرة الفرعية اليمنى</td>
<td>$i + 1 + (m - l)$</td>
<td>$[m+1, r]$</td>
</tr>
</tbody>
</table>
<p>لاحظ أن $(m-l)$ في فهرس عقدة جذر الشجرة الفرعية اليمنى يعني &quot;عدد العقد في الشجرة الفرعية اليسرى&quot;. ويُستحسن فهم ذلك بالاقتران مع الشكل أدناه.</p>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--build_tree_division_pointers.png" alt="تمثيل مجال الفهارس لعقدة الجذر والشجرتين الفرعيتين اليسرى واليمنى"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>لتحسين كفاءة الاستعلام عن $m$، نستخدم جدول تجزئة <code>hmap</code> لتخزين التعيين من عناصر مصفوفة <code>inorder</code> إلى فهارسها:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* بناء شجرة ثنائية */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">buildTree</span><span class="hljs-params">(preorder, inorder []<span class="hljs-type">int</span>)</span></span> *TreeNode {
	<span class="hljs-comment">// هيّئ جدول التجزئة، وخزّن التعيين من عناصر inorder إلى الفهارس</span>
	inorderMap := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">map</span>[<span class="hljs-type">int</span>]<span class="hljs-type">int</span>, <span class="hljs-built_in">len</span>(inorder))
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(inorder); i++ {
		inorderMap[inorder[i]] = i
	}

	root := dfsBuildTree(preorder, inorderMap, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(inorder)<span class="hljs-number">-1</span>)
	<span class="hljs-keyword">return</span> root
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* بناء شجرة ثنائية */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">buildTree</span>(<span class="hljs-params"><span class="hljs-attr">preorder</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">inorder</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span> {
    <span class="hljs-comment">// هيّئ جدول التجزئة، وخزّن التعيين من عناصر inorder إلى الفهارس</span>
    <span class="hljs-keyword">let</span> inorderMap = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; inorder.<span class="hljs-property">length</span>; i++) {
        inorderMap.<span class="hljs-title function_">set</span>(inorder[i], i);
    }
    <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">dfs</span>(preorder, inorderMap, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, inorder.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> root;
}
</code></pre>
</div>
<p>يوضح الشكل أدناه العملية التعاودية لبناء الشجرة الثنائية. فكل عقدة تُنشأ أثناء عملية &quot;التعاود&quot; النازلة، بينما يُنشأ كل ضلع (مرجع) أثناء عملية &quot;العودة&quot; الصاعدة.</p>
<p>وتظهر نتائج تقسيم الاجتياز المسبق <code>preorder</code> والاجتياز الوسطي <code>inorder</code> داخل كل دالة تعاودية في الشكل أدناه.</p>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--built_tree_overall.png" alt="نتائج التقسيم في كل دالة تعاودية"></p>
<p>لنفترض أن عدد العقد في الشجرة $n$. تستغرق تهيئة كل عقدة (تنفيذ دالة تعاودية <code>dfs()</code> واحدة) زمن $O(1)$. <strong>لذا فإن التعقيد الزمني الإجمالي هو $O(n)$</strong>.</p>
<p>ويخزّن جدول التجزئة التعيين من عناصر <code>inorder</code> إلى فهارسها، بتعقيد مكاني $O(n)$. وفي أسوأ الحالات، عندما تتدهور الشجرة الثنائية إلى قائمة مترابطة، يبلغ عمق التعاود $n$، مستهلكاً مساحة إطارات المكدس $O(n)$. <strong>لذا فإن التعقيد المكاني الإجمالي هو $O(n)$</strong>.</p>
`,d={book:n,chapter:s,chapterTitle:e,slug:a,title:r,headings:l,html:o};export{n as book,s as chapter,e as chapterTitle,d as default,l as headings,o as html,a as slug,r as title};
