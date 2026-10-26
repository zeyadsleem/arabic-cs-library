const s="kinney",a="tailwind",n="Tailwind CSS",l="flexbox-order-manipulation",t="التلاعب بالترتيب",p=[{depth:2,id:"أدوات-الترتيب-الأساسية",text:"أدوات الترتيب الأساسية"},{depth:3,id:"الترتيب-الصريح",text:"الترتيب الصريح"},{depth:3,id:"الترتيب-السالب",text:"الترتيب السالب"},{depth:3,id:"قيم-ترتيب-خاصة",text:"قيم ترتيب خاصة"},{depth:2,id:"قيم-ترتيب-مخصصة",text:"قيم ترتيب مخصّصة"},{depth:2,id:"التلاعب-بالترتيب-المتجاوب",text:"التلاعب بالترتيب المتجاوب"}],e=`<p>التحكّم في الترتيب البصري للعناصر داخل حاويات Flexbox أو Grid أمر شائع. تتيح خاصية <code>order</code> في CSS تعديل ذلك دون تغيير بنية HTML. ويوفّر Tailwind CSS أدوات للتعامل مع هذه الخاصية مباشرةً في ترميزك (Markup).</p>
<h2 id="أدوات-الترتيب-الأساسية">أدوات الترتيب الأساسية</h2>
<p>يوفّر Tailwind أدوات مقابلة لخاصية <code>order</code> في CSS، تتيح لك تعريف سياق تكديس العناصر في حاويات Flex أو Grid. يمكنك ضبط ترتيب عنصر صراحةً أو استخدام قيم خاصة مثل <code>first</code> أو <code>last</code> أو <code>none</code>.</p>
<h3 id="الترتيب-الصريح">الترتيب الصريح</h3>
<p>خصّص قيم ترتيب عددية عبر <code>order-&lt;number&gt;</code> (مثل <code>order-1</code> و<code>order-3</code>). تضبط هذه خاصية <code>order</code> في CSS على الرقم المحدد، فتُعرض العناصر بتسلسل مختلف عن ترتيب HTML.
CSS: <code>order: &lt;number&gt;;</code></p>
<p><em>الترتيب الصريح — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/925c6e235dd77ba6142aa20de5c36afb5b0a6db63144a5c2319b73ffac262289.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-3 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (order-3)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (order-1)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-2 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (order-2)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="الترتيب-السالب">الترتيب السالب</h3>
<p>استخدم قيم ترتيب سالبة عبر بادئة الصنف بشرطة (مثل <code>-order-&lt;number&gt;</code>).
CSS: <code>order: calc(&lt;number&gt; * -1);</code></p>
<p><em>الترتيب السالب — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/59d6c90c7c1edfe6298ca4d9bbc4d821310338722da175f3c3debe027172c6fa.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-w-[100px] rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (default)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;-order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (-order-1)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-w-[100px] rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (default)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="قيم-ترتيب-خاصة">قيم ترتيب خاصة</h3>
<h4>العرض في الأول أو الأخير</h4>
<ul>
<li><code>order-first</code>: تُعرض العناصر في البداية.
CSS: <code>order: calc(-infinity);</code></li>
<li><code>order-last</code>: تُعرض العناصر في النهاية.
CSS: <code>order: calc(infinity);</code></li>
</ul>
<p><em>العرض في الأول أو الأخير — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/5f2b6604122924159d4bd384f8ab40ee12852b5b761b87211c8a475f57bd18cc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-last min-w-[100px] rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>
    Item 1 (order-last)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-w-[100px] rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (default)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-first min-w-[100px] rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>
    Item 3 (order-first)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>إعادة ضبط الترتيب</h4>
<ul>
<li><code>order-none</code>: تعيد ضبط <code>order</code> إلى قيمتها الافتراضية (<code>0</code>). وتُرتَّب العناصر بحسب موضعها في الشيفرة المصدرية نسبةً إلى بقيّة العناصر ذات <code>order: 0</code> أو أكبر.
CSS: <code>order: 0;</code></li>
</ul>
<p><em>إعادة ضبط الترتيب — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/36901ffa1a9a974a8c9774b6c3a8344140a8048e342b3550523f99aebf138018.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-2 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (order-2)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-none min-w-[100px] rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>
    Item 2 (order-none)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-1 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (order-1)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="قيم-ترتيب-مخصصة">قيم ترتيب مخصّصة</h2>
<p>إذا لم تكفِ الأدوات المُعرَّفة مسبقًا، استخدم القيم التعسّفية مع <code>order-[&lt;value&gt;]</code> لضبط <code>order</code> على أي قيمة CSS صالحة.</p>
<p>وبدلًا من ذلك، أشِر إلى متغيّر CSS عبر <code>order-(&lt;custom-property&gt;)</code> لقيم ترتيب ديناميكية أو مُدارة خارجيًا.</p>
<p><em>قيم ترتيب مخصّصة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/d38bd6cc3c5d28aaeccf1fa822975270656645d0561b6466bfb28ec5ad7b8e77.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-[5] min-w-[100px] rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>
    Item 1 (order-[5])
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-[10] min-w-[100px] rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>
    Item 2 (order-[10])
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-[2] min-w-[100px] rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>
    Item 3 (order-[2])
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="التلاعب-بالترتيب-المتجاوب">التلاعب بالترتيب المتجاوب</h2>
<p>كما معظم أدوات Tailwind، يمكن تطبيق أدوات <code>order</code> بشكل مشروط عند نقاط التوقّف (مثل <code>sm:order-1</code> و<code>md:order-last</code>). ويغيّر هذا ترتيب العناصر بشكل متجاوب. وتُطبَّق الأدوات غير المسبوقة بالبادئة على جميع أحجام الشاشات، بينما تُطبَّق الأدوات المسبوقة بالبادئة عند نقطة التوقّف المحدَّدة وما فوقها.</p>
<p><em>التلاعب بالترتيب المتجاوب — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/bf69627e56b4b0839d31024be269c504e2ebf558a867fb66d8ffff7d75d34016.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col gap-4 rounded-lg bg-gray-100 p-6 md:flex-row&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-3 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white md:order-1&quot;</span>&gt;</span>
    Item 1 (mobile: 3rd, desktop: 1st)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white md:order-2&quot;</span>&gt;</span>
    Item 2 (mobile: 1st, desktop: 2nd)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;order-2 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white md:order-3&quot;</span>&gt;</span>
    Item 3 (mobile: 2nd, desktop: 3rd)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
`,d={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,d as default,p as headings,e as html,l as slug,t as title};
