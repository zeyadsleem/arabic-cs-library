const s="kinney",a="tailwind",n="Tailwind CSS",l="container-queries",t="استعلامات الحاويات",p=[{depth:2,id:"استعلامات-الحاوية-مقابل-استعلامات-إطار-العرض",text:"استعلامات الحاوية مقابل استعلامات إطار العرض"},{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:2,id:"نقاط-توقف-الحاويات",text:"نقاط توقف الحاويات"},{depth:2,id:"أنماط-شائعة",text:"أنماط شائعة"},{depth:3,id:"مكون-البطاقة",text:"مكوّن البطاقة"},{depth:3,id:"تخطيط-الشريط-الجانبي",text:"تخطيط الشريط الجانبي"},{depth:2,id:"الحاويات-المسماة",text:"الحاويات المسمّاة"},{depth:2,id:"نطاقات-استعلامات-الحاوية",text:"نطاقات استعلامات الحاوية"},{depth:3,id:"الحد-الأقصى-للعرض",text:"الحد الأقصى للعرض"},{depth:3,id:"نطاقات-محددة",text:"نطاقات محدّدة"},{depth:2,id:"أحجام-حاويات-عشوائية",text:"أحجام حاويات عشوائية"},{depth:2,id:"أنواع-الحاويات",text:"أنواع الحاويات"},{depth:2,id:"وحدات-الحاوية",text:"وحدات الحاوية"},{depth:2,id:"تخصيص-أحجام-الحاويات",text:"تخصيص أحجام الحاويات"},{depth:2,id:"مثال-من-العالم-الحقيقي",text:"مثال من العالم الحقيقي"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],c=`<p>تتيح لك استعلامات الحاويات تنسيق العناصر بحسب حجم العنصر الأم لا بحسب إطار العرض. وهي مثالية للمكوّنات القابلة لإعادة الاستخدام.</p>
<h2 id="استعلامات-الحاوية-مقابل-استعلامات-إطار-العرض">استعلامات الحاوية مقابل استعلامات إطار العرض</h2>
<table>
<thead>
<tr>
<th>النوع</th>
<th>معيار القياس</th>
<th>حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td>إطار العرض (<code>md:</code>)</td>
<td>نافذة المتصفح</td>
<td>تخطيطات الصفحات</td>
</tr>
<tr>
<td>الحاوية (<code>@md:</code>)</td>
<td>العنصر الأم</td>
<td>المكوّنات</td>
</tr>
</tbody>
</table>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<p>ضع علامة على العنصر الأم كحاوية، ونسّق أبناءه بحسب حجمها:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col @sm:flex-row @lg:grid @lg:grid-cols-3&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Adapts to container width --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="نقاط-توقف-الحاويات">نقاط توقف الحاويات</h2>
<p>الأحجام الافتراضية تطابق نقاط توقف إطار العرض:</p>
<ul>
<li><code>@sm</code>: حاوية بعرض 640px</li>
<li><code>@md</code>: حاوية بعرض 768px</li>
<li><code>@lg</code>: حاوية بعرض 1024px</li>
<li><code>@xl</code>: حاوية بعرض 1280px</li>
<li><code>@2xl</code>: حاوية بعرض 1536px</li>
</ul>
<h2 id="أنماط-شائعة">أنماط شائعة</h2>
<h3 id="مكون-البطاقة">مكوّن البطاقة</h3>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 @sm:p-6 @md:p-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg @sm:text-xl @lg:text-2xl&quot;</span>&gt;</span>Responsive heading<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 grid gap-4 @sm:mt-4 @md:grid-cols-2&quot;</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- Content --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="تخطيط-الشريط-الجانبي">تخطيط الشريط الجانبي</h3>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-wrap gap-2 @sm:flex-col @sm:gap-1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:py-2&quot;</span>&gt;</span>Link<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
</code></pre>
<h2 id="الحاويات-المسماة">الحاويات المسمّاة</h2>
<p>استهدف حاويات محدّدة في التخطيطات المتداخلة:</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Main content area --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container/main&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Sidebar --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container/sidebar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm/sidebar:block&quot;</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- Responds to sidebar width --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Article --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@lg/main:prose-lg&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Responds to main width --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
</code></pre>
<h2 id="نطاقات-استعلامات-الحاوية">نطاقات استعلامات الحاوية</h2>
<h3 id="الحد-الأقصى-للعرض">الحد الأقصى للعرض</h3>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@max-md:hidden&quot;</span>&gt;</span>Hidden in small containers<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="نطاقات-محددة">نطاقات محدّدة</h3>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:@max-lg:bg-blue-100&quot;</span>&gt;</span>Blue only in medium containers<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أحجام-حاويات-عشوائية">أحجام حاويات عشوائية</h2>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Custom breakpoint --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@min-[400px]:flex&quot;</span>&gt;</span>Flex at 400px container width<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Custom range --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@min-[300px]:@max-[500px]:bg-gray-100&quot;</span>&gt;</span>Gray between 300-500px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أنواع-الحاويات">أنواع الحاويات</h2>
<p>تحكّم في البُعد الذي يُستعلم عنه:</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Default: inline-size (width) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Query height --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container/size&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="وحدات-الحاوية">وحدات الحاوية</h2>
<p>اضبط أحجام العناصر نسبةً إلى الحاوية:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 50% of container width --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-[50cqw]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Font size based on container --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-[5cqw]&quot;</span>&gt;</span>Scales with container<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الوحدات المتاحة:</p>
<ul>
<li><code>cqw</code> — 1% من عرض الحاوية</li>
<li><code>cqh</code> — 1% من ارتفاع الحاوية</li>
<li><code>cqi</code> — 1% من حجم الحاوية الأفقي</li>
<li><code>cqb</code> — 1% من حجم الحاوية العمودي</li>
<li><code>cqmin</code> — 1% من أصغر بُعد في الحاوية</li>
<li><code>cqmax</code> — 1% من أكبر بُعد في الحاوية</li>
</ul>
<h2 id="تخصيص-أحجام-الحاويات">تخصيص أحجام الحاويات</h2>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Add custom sizes */</span>
  <span class="hljs-attr">--container-xs</span>: <span class="hljs-number">320px</span>;
  <span class="hljs-attr">--container-3xl</span>: <span class="hljs-number">1600px</span>;

  <span class="hljs-comment">/* Override defaults */</span>
  <span class="hljs-attr">--container-sm</span>: <span class="hljs-number">600px</span>;
}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي">مثال من العالم الحقيقي</h2>
<p>بطاقة منتج تعمل في كل مكان:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col gap-4 p-4 @sm:flex-row&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Image --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;...&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-full rounded @sm:w-32 @md:w-48&quot;</span> /&gt;</span>

    <span class="hljs-comment">&lt;!-- Content --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold @md:text-xl&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-gray-600 @lg:text-base&quot;</span>&gt;</span>
        Description that adjusts to available space
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 flex flex-wrap gap-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-3 py-1 @sm:px-4 @sm:py-2&quot;</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>استخدمها للمكوّنات</strong> — لا لتخطيطات الصفحات</li>
<li><strong>سمِّ الحاويات المتداخلة</strong> — تجنّب الالتباس</li>
<li><strong>اختبر عند مقاسات مختلفة</strong> — تظهر المكوّنات في سياقات كثيرة</li>
<li><strong>فكّر في الأداء</strong> — كل حاوية تضيف عبئًا</li>
<li><strong>ضع بديلًا للمتصفحات القديمة</strong> — استعلامات الحاويات تحتاج متصفحات حديثة</li>
</ol>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
