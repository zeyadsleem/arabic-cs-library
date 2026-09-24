const n="hello-algo",s="chapter_divide_and_conquer",a="التقسيم والتغلب",l="binary_search_recur",p="استراتيجية البحث بالتقسيم والتغلب",t=[{depth:3,id:"تنفيذ-البحث-الثنائي-استنادا-إلى-التقسيم-والتغلب",text:"تنفيذ البحث الثنائي استناداً إلى التقسيم والتغلب"}],e=`<p>لقد تعلّمنا بالفعل أن خوارزميات البحث تنقسم إلى فئتين رئيسيتين.</p>
<ul>
<li><strong>البحث بالقوة الغاشمة</strong>: يُنفَّذ باجتياز بنية البيانات، وتعقيده الزمني $O(n)$.</li>
<li><strong>البحث التكيّفي</strong>: يستفيد من تنظيم معيّن للبيانات أو من معلومات مسبقة، ويصل تعقيده الزمني إلى $O(\\log n)$ أو حتى $O(1)$.</li>
</ul>
<p>في الواقع، <strong>خوارزميات البحث ذات التعقيد الزمني $O(\\log n)$ تُنفَّذ عادةً استناداً إلى استراتيجية التقسيم والتغلب</strong>، مثل البحث الثنائي والأشجار.</p>
<ul>
<li>كل خطوة من خطوات البحث الثنائي تقسّم المسألة (البحث عن عنصر هدف في مصفوفة) إلى مسألة أصغر (البحث عن العنصر الهدف في نصف المصفوفة)، وتستمر حتى تصبح المصفوفة فارغة أو يُعثر على العنصر الهدف.</li>
<li>الأشجار نموذج يمثّل فكرة التقسيم والتغلب. ففي بنى البيانات مثل أشجار البحث الثنائية وأشجار AVL والأكوام، يكون التعقيد الزمني لمختلف العمليات $O(\\log n)$.</li>
</ul>
<p>استراتيجية التقسيم والتغلب في البحث الثنائي كما يلي.</p>
<ul>
<li><strong>المسألة قابلة للتفكيك</strong>: يفكّك البحث الثنائي تعاودياً المسألة الأصلية (البحث في مصفوفة) إلى مسائل فرعية (البحث في نصف المصفوفة)، ويتحقق ذلك بمقارنة العنصر الأوسط بالعنصر الهدف.</li>
<li><strong>المسائل الفرعية مستقلة</strong>: في البحث الثنائي، لا تعالج كل جولة إلا مسألة فرعية واحدة، لا تتأثر بالمسائل الفرعية الأخرى.</li>
<li><strong>لا حاجة إلى دمج حلول المسائل الفرعية</strong>: يهدف البحث الثنائي إلى إيجاد عنصر محدد، لذا لا حاجة إلى دمج حلول المسائل الفرعية. وعندما تُحلّ مسألة فرعية، تكون المسألة الأصلية قد حُلّت أيضاً.</li>
</ul>
<p>يمكن للتقسيم والتغلب أن يحسّن كفاءة البحث، لأن البحث بالقوة الغاشمة لا يستطيع استبعاد إلا خيار واحد في كل جولة، <strong>بينما يستطيع البحث بالتقسيم والتغلب استبعاد نصف الخيارات في كل جولة</strong>.</p>
<h3 id="تنفيذ-البحث-الثنائي-استنادا-إلى-التقسيم-والتغلب">تنفيذ البحث الثنائي استناداً إلى التقسيم والتغلب</h3>
<p>نُفِّذ البحث الثنائي في الأقسام السابقة استناداً إلى التكرار. والآن ننفّذه استناداً إلى التقسيم والتغلب (التعاود).</p>
<div class="note">
<p>بمعطى مصفوفة مرتبة <code>nums</code> طولها $n$، وجميع عناصرها فريدة، ابحث عن <code>target</code>.</p>
</div>
<p>من منظور التقسيم والتغلب، نرمز للمسألة الفرعية المقابلة لمجال البحث $[i, j]$ بالرمز $f(i, j)$.</p>
<p>انطلاقاً من المسألة الأصلية $f(0, n-1)$، نفّذ البحث الثنائي عبر الخطوات التالية.</p>
<ol>
<li>احسب نقطة المنتصف $m$ لمجال البحث $[i, j]$، واستخدمها لاستبعاد نصف مجال البحث.</li>
<li>حلّ تعاودياً المسألة الفرعية المنخفضة إلى النصف، والتي قد تكون $f(i, m-1)$ أو $f(m+1, j)$.</li>
<li>كرر الخطوتين <code>1.</code> و<code>2.</code> حتى يُعثر على <code>target</code>، أو عُد عندما يصبح المجال فارغاً.</li>
</ol>
<p>يوضح الشكل أدناه عملية التقسيم والتغلب في البحث الثنائي عن العنصر $6$ في مصفوفة.</p>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--binary_search_recur.png" alt="عملية التقسيم والتغلب في البحث الثنائي"></p>
<p>في شيفرة التنفيذ، نعرّف دالة تعاودية <code>dfs()</code> لحل المسألة $f(i, j)$:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearch</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	n := <span class="hljs-built_in">len</span>(nums)
	<span class="hljs-keyword">return</span> dfs(nums, target, <span class="hljs-number">0</span>, n<span class="hljs-number">-1</span>)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearch</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> n = nums.<span class="hljs-property">length</span>;
    <span class="hljs-comment">// حل المسألة f(0, n-1)</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">dfs</span>(nums, target, <span class="hljs-number">0</span>, n - <span class="hljs-number">1</span>);
}
</code></pre>
</div>
`,c={book:n,chapter:s,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{n as book,s as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
