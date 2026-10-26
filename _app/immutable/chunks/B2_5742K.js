const s="kinney",a="tailwind",n="Tailwind CSS",l="flexbox-initial-size",t="الحجم الأولي",p=[{depth:2,id:"القيم-الشائعة",text:"القيم الشائعة"},{depth:2,id:"مقياس-التباعد",text:"مقياس التباعد"},{depth:2,id:"اختصار-flex",text:"اختصار flex"},{depth:2,id:"أنماط-شائعة",text:"أنماط شائعة"}],e=`<p>اضبط الحجم الأولي لعناصر flex قبل نموها أو انكماشها باستخدام أدوات <code>basis-*</code>.</p>
<h2 id="القيم-الشائعة">القيم الشائعة</h2>
<ul>
<li><code>basis-auto</code> - الحجم بناءً على المحتوى</li>
<li><code>basis-0</code> - البدء من عرض صفر</li>
<li><code>basis-full</code> - 100% من الحاوية</li>
<li><code>basis-1/2</code> - 50% من الحاوية</li>
<li><code>basis-1/3</code> - 33.333% من الحاوية</li>
<li><code>basis-2/3</code> - 66.667% من الحاوية</li>
<li><code>basis-1/4</code> - 25% من الحاوية</li>
<li><code>basis-3/4</code> - 75% من الحاوية</li>
</ul>
<h2 id="مقياس-التباعد">مقياس التباعد</h2>
<p>استخدم قيمًا رقمية من مقياس التباعد:</p>
<ul>
<li><code>basis-4</code> - 1rem</li>
<li><code>basis-8</code> - 2rem</li>
<li><code>basis-16</code> - 4rem</li>
<li><code>basis-32</code> - 8rem</li>
<li><code>basis-64</code> - 16rem</li>
</ul>
<h2 id="اختصار-flex">اختصار flex</h2>
<p>ادمج grow وshrink وbasis مع أدوات flex:</p>
<ul>
<li><code>flex-1</code> - <code>flex: 1 1 0%</code> (ينمو وينكمش من 0)</li>
<li><code>flex-auto</code> - <code>flex: 1 1 auto</code> (ينمو وينكمش من حجم المحتوى)</li>
<li><code>flex-initial</code> - <code>flex: 0 1 auto</code> (انكماش فقط)</li>
<li><code>flex-none</code> - <code>flex: 0 0 auto</code> (حجم ثابت)</li>
</ul>
<h2 id="أنماط-شائعة">أنماط شائعة</h2>
<p><em>أنماط شائعة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/85a4f7a8e89ee6cd9da297b8fbf6123f413ef4f3cd44b68b798a98da623db032.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Three equal columns --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1 basis-0 rounded bg-blue-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1 basis-0 rounded bg-green-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1 basis-0 rounded bg-purple-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Sidebar with flexible content --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;basis-64 rounded bg-gray-700 p-4 text-white&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-bold&quot;</span>&gt;</span>Fixed sidebar<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Width: 16rem (256px)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1 rounded bg-white p-4 shadow&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-bold&quot;</span>&gt;</span>Flexible content<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>This area expands to fill remaining space<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Responsive columns --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-wrap gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;basis-full rounded bg-orange-500 p-4 text-white md:basis-1/2 lg:basis-1/3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-bold&quot;</span>&gt;</span>Responsive Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Full width on mobile, half on tablet, third on desktop<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;basis-full rounded bg-pink-500 p-4 text-white md:basis-1/2 lg:basis-1/3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-bold&quot;</span>&gt;</span>Responsive Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Full width on mobile, half on tablet, third on desktop<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;basis-full rounded bg-indigo-500 p-4 text-white md:basis-1/2 lg:basis-1/3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-bold&quot;</span>&gt;</span>Responsive Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Full width on mobile, half on tablet, third on desktop<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
