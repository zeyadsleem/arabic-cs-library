const s="kinney",a="tailwind",n="Tailwind CSS",t="focus-states",l="حالات التركيز",e=[{depth:2,id:"focus-يظهر-دائما",text:"focus: يظهر دائمًا"},{depth:2,id:"focus-visible-كشف-ذكي",text:"focus-visible: كشف ذكي"},{depth:2,id:"focus-within-تنسيق-العنصر-الأب",text:"focus-within: تنسيق العنصر الأب"},{depth:2,id:"دعم-المتصفحات",text:"دعم المتصفحات"},{depth:2,id:"مرجع-سريع",text:"مرجع سريع"}],p=`<h2 id="focus-يظهر-دائما"><code>focus</code>: يظهر دائمًا</h2>
<p>يُفعَّل <code>focus:</code> عند أي حدث تركيز (الفأرة، لوحة المفاتيح، برمجيًا).</p>
<p><em>focus: يظهر دائمًا — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/10f6729c08a6dcb5eb7a5946b73f8b3df00e2c6a0a59cdef7dba908aa3c4ce80.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none&quot;</span>&gt;</span>
  Click or tab
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>استخدم التركيز <strong>دائمًا</strong> لعناصر تحكم النماذج حيث يحتاج المستخدمون إلى تغذية واضحة بغض النظر عن طريقة الإدخال.</p>
<p><em>focus: يظهر دائمًا — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/992d927ca393c6a59fb75b7aca3504408e0f6b13f1471c34ded2ce9693b20de0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-300 focus:outline-pink-400&quot;</span> /&gt;</span>
</code></pre>
<p>لروابط التخطي أو التنقل الرئيسي أو العناصر الحرجة لإمكانية الوصول. ينبغي أن تكون هذه العناصر واضحة فورًا عند التركيز، بغض النظر عن كيفية تحقيقه.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#main-content&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;outline-offset-4 focus:outline-2 focus:outline-blue-500&quot;</span>&gt;</span>
  Skip to main content
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre>
<p>تريده أيضًا عندما تحاول إظهار حالة خطأ.</p>
<p><em>focus: يظهر دائمًا — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/bbe3237381722093ea7b2f4965a2884843bbabf44c20662e800189288fb4508c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;focus:-outline-2 block rounded-md border-2 border-slate-300 bg-white px-3 py-1.5 placeholder:text-slate-400 valid:outline-green-500 invalid:outline-red-500&quot;</span>
  <span class="hljs-attr">required</span>
/&gt;</span>
</code></pre>
<h2 id="focus-visible-كشف-ذكي"><code>focus-visible</code>: كشف ذكي</h2>
<p>يُظهر التركيز فقط عند الحاجة (التنقل بلوحة المفاتيح، لا نقرات الفأرة).</p>
<p><em>focus-visible: كشف ذكي — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/a175b9f7bdfe40f1a1c7172b8f49bb74e4e59072014973ba267eca945e8bd1be.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-200 px-3 py-2 hover:bg-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:bg-blue-400&quot;</span>
&gt;</span>
  Smart Focus
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>تحدّد استدلالات المتصفح متى يُظهر التركيز — عادةً لمستخدمي لوحة المفاتيح فقط.</p>
<h2 id="focus-within-تنسيق-العنصر-الأب"><code>focus-within</code>: تنسيق العنصر الأب</h2>
<p>ينسّق العنصر الأب عندما يكون لأي عنصر تابع تركيز.</p>
<p><em>focus-within: تنسيق العنصر الأب — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/259b5bc78d350837318cf10940a41d8e0e0b70419f695b630e812310f79ff29e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 border-2 border-gray-300 p-4 focus-within:border-blue-500 focus-within:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;password&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تبرز الحاوية عندما يكون أي من الحقلين في حالة تركيز.</p>
<h2 id="دعم-المتصفحات">دعم المتصفحات</h2>
<p>يتمتع <code>focus-visible</code> بدعم جيد في المتصفحات الحديثة. للبدائل الاحتياطية:</p>
<p><em>دعم المتصفحات — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/b14e9b0490e3fcf75c954d58933a1e4e1d32a613aafa9b350f76c58691ea4e83.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;focus:ring-2 focus-visible:ring-2&quot;</span>&gt;</span>Fallback support<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h2 id="مرجع-سريع">مرجع سريع</h2>
<ul>
<li><strong><code>focus:</code></strong> - يظهر دائمًا (الفأرة ولوحة المفاتيح)</li>
<li><strong><code>focus-visible:</code></strong> - كشف ذكي (لوحة المفاتيح فقط)</li>
<li><strong><code>focus-within:</code></strong> - تنسيق العنصر الأب عند تركيز العناصر التابعة</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
