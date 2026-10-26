const s="kinney",a="tailwind",n="Tailwind CSS",e="before-and-after-pseudo-selectors",t="المحدِّدات الزائفة before وafter",l=[{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:3,id:"محتوى-فارغ-تلقائي",text:"محتوى فارغ تلقائي"},{depth:2,id:"ضبط-المحتوى",text:"ضبط المحتوى"},{depth:3,id:"محتوى-نصي",text:"محتوى نصي"},{depth:3,id:"المسافات",text:"المسافات"},{depth:3,id:"شرطة-سفلية-حرفية",text:"شرطة سفلية حرفية"},{depth:3,id:"قيم-الخصائص",text:"قيم الخصائص"},{depth:3,id:"متغيرات-css",text:"متغيّرات CSS"},{depth:2,id:"متى-تستخدم-العناصر-الزائفة",text:"متى تستخدم العناصر الزائفة"},{depth:2,id:"قابلية-التركيب",text:"قابلية التركيب"}],p=`<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<p>أضف البادئة <code>before:</code> أو <code>after:</code> إلى أي أداة لتنسيق العناصر الزائفة:</p>
<p><em>الاستخدام الأساسي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/d88733856070747c8ac6f8d7eaae139fd313ef75207a99a5670949e00087de2c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:block before:h-px before:bg-gray-300 before:content-[&#x27;&#x27;]&quot;</span>&gt;</span>Decorated text<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="محتوى-فارغ-تلقائي">محتوى فارغ تلقائي</h3>
<p>يضيف Tailwind <code>content: ''</code> افتراضيًا عند استخدام هذه الصيغ.</p>
<h2 id="ضبط-المحتوى">ضبط المحتوى</h2>
<h3 id="محتوى-نصي">محتوى نصي</h3>
<p><em>محتوى نصي — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/40cdfd9e281afc7e6825f83edb3ba4ab1545c8d4d7bdf5073fcc83d35dc0277b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:mr-2 before:content-[&#x27;→&#x27;]&quot;</span>&gt;</span>Next<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;after:text-red-500 after:content-[&#x27;*&#x27;]&quot;</span>&gt;</span>Required<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre>
<h3 id="المسافات">المسافات</h3>
<p>استخدم الشرطات السفلية (تُحوَّل إلى مسافات):</p>
<p><em>المسافات — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/b0f36e83b4651d1d7336d7bdb9c7dfcce448eb41c078075094da9ab6b5c17976.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:content-[&#x27;Hello_world&#x27;]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="شرطة-سفلية-حرفية">شرطة سفلية حرفية</h3>
<p>هرّبها بشرطة مائلة عكسية:</p>
<p><em>شرطة سفلية حرفية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/ba1292ab4f720952473b021f1258a290595baeada8beb14689457325498213e8.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:content-[&#x27;snake\\_case&#x27;]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="قيم-الخصائص">قيم الخصائص</h3>
<p><em>قيم الخصائص — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/91ea86dded975987c1c3c4cf9ac7bb35405e64ebb908a7170d7f09cfc9d64907.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-label</span>=<span class="hljs-string">&quot;Status&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:content-[attr(data-label)]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="متغيرات-css">متغيّرات CSS</h3>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--label</span>: <span class="hljs-string">&#x27;Status&#x27;</span>;
}
</code></pre>
<p><em>متغيّرات CSS — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/2942481221914fbfcf5c237c08673f4b24c884740158050add17eb41ee0261ff.html">افتح المثال</a><a href="#playground-css-label">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:content-[var(--label)]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="متى-تستخدم-العناصر-الزائفة">متى تستخدم العناصر الزائفة</h2>
<p><strong>فضّل العناصر الحقيقية</strong> في معظم الحالات:</p>
<p><em>متى تستخدم العناصر الزائفة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/df0110a8a60b9f12f66a05b7392f80c7f6fcd9ce052ca22c988491bf4cbfca76.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Better --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inline-block h-px w-full bg-gray-300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Only when semantic markup matters --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:block before:h-px before:bg-gray-300 before:content-[&#x27;&#x27;]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>استخدم العناصر الزائفة عندما:</p>
<ul>
<li>لا ينبغي أن يكون المحتوى قابلًا للتحديد</li>
<li>يكون المحتوى زخرفيًا بحتًا</li>
<li>تحتاج إلى تجنّب التأثير في تدفق المستند</li>
</ul>
<h2 id="قابلية-التركيب">قابلية التركيب</h2>
<p>كدّسها مع صيغ أخرى:</p>
<p><em>قابلية التركيب — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/daf338bf755de10e80240e11538b14e5a6f5fda38356041389b52e49d4645352.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;before:opacity-0 before:content-[&#x27;→&#x27;] hover:before:opacity-100&quot;</span>&gt;</span>Hover me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,p as html,e as slug,t as title};
