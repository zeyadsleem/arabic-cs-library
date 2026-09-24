const n="hello-algo",o="chapter_divide_and_conquer",e="التقسيم والتغلب",s="hanota_problem",c="مسألة أبراج هانوي",d=[{depth:3,id:"التفكير-في-الحالات-الأساسية",text:"التفكير في الحالات الأساسية"},{depth:3,id:"تفكيك-المسائل-الفرعية",text:"تفكيك المسائل الفرعية"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"}],a=`<p>في الترتيب بالدمج وبناء الأشجار الثنائية، فكّكنا المسألة الأصلية إلى مسألتين فرعيتين، حجم كل منهما نصف حجم المسألة الأصلية. أما في مسألة أبراج هانوي، فنتبنّى استراتيجية تفكيك مختلفة.</p>
<div class="note">
<p>بمعطى ثلاثة أعمدة يُرمز إليها بـ <code>A</code> و<code>B</code> و<code>C</code>. في البداية، يوجد على العمود <code>A</code> عدد $n$ من الأقراص مرصوفة من الأعلى إلى الأسفل بترتيب تصاعدي حسب الحجم. ومهمتنا نقل هذه الأقراص $n$ إلى العمود <code>C</code> مع الحفاظ على ترتيبها الأصلي (كما يوضح الشكل أدناه). ويجب مراعاة القواعد التالية عند نقل الأقراص.</p>
<ol>
<li>لا يمكن أخذ قرص إلا من قمة أحد الأعمدة ووضعه فوق عمود آخر.</li>
<li>لا يمكن نقل سوى قرص واحد في كل مرة.</li>
<li>يجب أن يكون القرص الأصغر دائماً فوق القرص الأكبر.</li>
</ol>
</div>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--hanota_example.png" alt="مثال على مسألة أبراج هانوي"></p>
<p><strong>نرمز إلى مسألة أبراج هانوي ذات الحجم $i$ بالرمز $f(i)$</strong>. فمثلاً، تمثّل $f(3)$ نقل $3$ أقراص من <code>A</code> إلى <code>C</code>.</p>
<h3 id="التفكير-في-الحالات-الأساسية">التفكير في الحالات الأساسية</h3>
<p>كما يوضح الشكل أدناه، في المسألة $f(1)$، عندما يكون هناك قرص واحد فقط، يمكننا نقله مباشرةً من <code>A</code> إلى <code>C</code>.</p>
<p>وكما يوضح الشكل أدناه، في المسألة $f(2)$، عندما يكون هناك قرصان، <strong>وبما أنه يجب علينا دائماً إبقاء القرص الأصغر فوق القرص الأكبر، نحتاج إلى استخدام <code>B</code> للمساعدة في النقل</strong>.</p>
<ol>
<li>أولاً، انقل القرص الأصغر من <code>A</code> إلى <code>B</code>.</li>
<li>ثم انقل القرص الأكبر من <code>A</code> إلى <code>C</code>.</li>
<li>وأخيراً، انقل القرص الأصغر من <code>B</code> إلى <code>C</code>.</li>
</ol>
<p>ويمكن تلخيص عملية حل المسألة $f(2)$ بأنها: <strong>نقل قرصين من <code>A</code> إلى <code>C</code> بمساعدة <code>B</code></strong>. ويُسمى <code>C</code> هنا العمود الهدف، ويُسمى <code>B</code> العمود المؤقت.</p>
<h3 id="تفكيك-المسائل-الفرعية">تفكيك المسائل الفرعية</h3>
<p>في المسألة $f(3)$، عندما يكون هناك ثلاثة أقراص، يصبح الوضع أكثر تعقيداً بعض الشيء.</p>
<p>وبما أننا نعرف بالفعل حلّي $f(1)$ و$f(2)$، يمكننا التفكير من منظور التقسيم والتغلب، <strong>بمعالجة القرصين العلويين على <code>A</code> وحدةً واحدة</strong>، وتنفيذ الخطوات الموضحة في الشكل أدناه. وبذلك ننجح في نقل الأقراص الثلاثة من <code>A</code> إلى <code>C</code>.</p>
<ol>
<li>اجعل <code>B</code> هو العمود الهدف و<code>C</code> هو العمود المؤقت، وانقل قرصين من <code>A</code> إلى <code>B</code>.</li>
<li>انقل القرص المتبقي من <code>A</code> مباشرةً إلى <code>C</code>.</li>
<li>اجعل <code>C</code> هو العمود الهدف و<code>A</code> هو العمود المؤقت، وانقل قرصين من <code>B</code> إلى <code>C</code>.</li>
</ol>
<p>وفي جوهر الأمر، <strong>نفكّك المسألة $f(3)$ إلى مسألتين فرعيتين $f(2)$ ومسألة فرعية واحدة $f(1)$</strong>. ويمثّل حل هذه المسائل الفرعية الثلاث بالترتيب حلاً للمسألة الأصلية. وهذا يدل على أن المسائل الفرعية مستقلة ويمكن دمج حلولها.</p>
<p>ومن ذلك يمكننا تلخيص استراتيجية التقسيم والتغلب لحل مسألة أبراج هانوي، كما يوضح الشكل أدناه: فكّك المسألة الأصلية $f(n)$ إلى مسألتين فرعيتين $f(n-1)$ ومسألة فرعية واحدة $f(1)$، وحلّ هذه المسائل الفرعية الثلاث بالترتيب التالي.</p>
<ol>
<li>انقل $n-1$ قرصاً من <code>A</code> إلى <code>B</code> بمساعدة <code>C</code>.</li>
<li>انقل القرص المتبقي $1$ مباشرةً من <code>A</code> إلى <code>C</code>.</li>
<li>انقل $n-1$ قرصاً من <code>B</code> إلى <code>C</code> بمساعدة <code>A</code>.</li>
</ol>
<p>وبالنسبة إلى هاتين المسألتين الفرعيتين $f(n-1)$، <strong>يمكننا تفكيكهما تعاودياً بالطريقة نفسها</strong> حتى الوصول إلى أصغر مسألة فرعية $f(1)$. وحل $f(1)$ معروف ولا يتطلب سوى عملية نقل واحدة.</p>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--hanota_divide_and_conquer.png" alt="استراتيجية التقسيم والتغلب لحل مسألة أبراج هانوي"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>في الشيفرة، نعرّف دالة تعاودية <code>dfs(i, src, buf, tar)</code>، غرضها نقل الأقراص $i$ العلوية من العمود <code>src</code> إلى العمود الهدف <code>tar</code> بمساعدة العمود المؤقت <code>buf</code>:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حل مسألة أبراج هانوي */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">solveHanota</span><span class="hljs-params">(A, B, C *list.List)</span></span> {
	n := A.Len()
	<span class="hljs-comment">// انقل الأقراص n العلوية من A إلى C بمساعدة B</span>
	dfsHanota(n, A, B, C)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حل مسألة أبراج هانوي */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">solveHanota</span>(<span class="hljs-params"><span class="hljs-attr">A</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">B</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">C</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> n = A.<span class="hljs-property">length</span>;
    <span class="hljs-comment">// انقل الأقراص n العلوية من A إلى C بمساعدة B</span>
    <span class="hljs-title function_">dfs</span>(n, A, B, C);
}
</code></pre>
</div>
<p>وكما يوضح الشكل أدناه، تشكّل مسألة أبراج هانوي شجرة تعاود بارتفاع $n$، حيث تمثّل كل عقدة مسألة فرعية تقابل استدعاءً للدالة <code>dfs()</code>، <strong>لذا يكون التعقيد الزمني $O(2^n)$ والتعقيد المكاني $O(n)$</strong>.</p>
<p><img src="/images/hello-algo/chapter_divide_and_conquer--hanota_recursive_tree.png" alt="شجرة التعاود لمسألة أبراج هانوي"></p>
<div class="note">
<p>تستمد مسألة أبراج هانوي أصلها من أسطورة قديمة. ففي معبد بالهند القديمة، كان لدى الرهبان ثلاثة أعمدة ماسية شاهقة و$64$ قرصاً ذهبياً مختلف الأحجام. وكان الرهبان ينقلون هذه الأقراص باستمرار، معتقدين أنه عندما يوضع القرص الأخير في مكانه الصحيح، ينتهي العالم.</p>
<p>ومع ذلك، حتى لو نقل الرهبان قرصاً واحداً كل ثانية، لاستغرق الأمر نحو $2^{64} \\approx 1.84×10^{19}$ ثانية، أي ما يقرب من $585$ مليار سنة، وهو ما يتجاوز كثيراً التقديرات الحالية لعمر الكون. لذلك، إذا كانت هذه الأسطورة صحيحة، فلا داعي للقلق من نهاية العالم.</p>
</div>
`,l={book:n,chapter:o,chapterTitle:e,slug:s,title:c,headings:d,html:a};export{n as book,o as chapter,e as chapterTitle,l as default,d as headings,a as html,s as slug,c as title};
