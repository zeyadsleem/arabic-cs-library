const s="kinney",a="tailwind",n="Tailwind CSS",l="flexbox-growing-and-shrinking",t="النمو والانكماش",p=[{depth:2,id:"نمو-flex",text:"نمو flex"},{depth:2,id:"انكماش-flex",text:"انكماش flex"},{depth:2,id:"أنماط-شائعة",text:"أنماط شائعة"}],e=`<p>تحكّم في كيفية نمو عناصر flex لملء المساحة المتاحة أو انكماشها عندما تكون المساحة محدودة.</p>
<h2 id="نمو-flex">نمو flex</h2>
<p>استخدم أدوات <code>grow</code> للتحكم في كيفية توسّع العناصر:</p>
<ul>
<li><code>grow-0</code> - لن ينمو العنصر (افتراضي)</li>
<li><code>grow</code> - يمكن للعنصر النمو لملء المساحة (flex-grow: 1)</li>
<li><code>grow-[2]</code> - عامل نمو مخصص</li>
</ul>
<p><em>نمو flex — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/bc718c0fc551fb2fa0c772ce73d83a6fbe19c528a4ef6fb3ba17c0b19e4d5e18.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Middle item takes up remaining space --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-20 rounded bg-blue-500 p-3 text-center text-white&quot;</span>&gt;</span>Fixed<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grow rounded bg-green-500 p-3 text-center text-white&quot;</span>&gt;</span>Flexible<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-20 rounded bg-blue-500 p-3 text-center text-white&quot;</span>&gt;</span>Fixed<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="انكماش-flex">انكماش flex</h2>
<p>استخدم أدوات <code>shrink</code> للتحكم في كيفية تقلّص العناصر:</p>
<ul>
<li><code>shrink-0</code> - لن ينكمش العنصر تحت حجمه الطبيعي</li>
<li><code>shrink</code> - يمكن للعنصر الانكماش عند الحاجة (flex-shrink: 1)</li>
<li><code>shrink-[2]</code> - عامل انكماش مخصص</li>
</ul>
<p><em>انكماش flex — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/b9bfb7c39c5a8d5ac94a3b45a8b7b8b4085d2ceb8f66c349f580f80130fcca72.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Prevent logo from shrinking --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-12 w-24 shrink-0 items-center justify-center rounded bg-indigo-600 font-bold text-white&quot;</span>
  &gt;</span>
    LOGO
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex shrink items-center gap-3 rounded bg-gray-200 p-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أنماط-شائعة">أنماط شائعة</h2>
<p><em>أنماط شائعة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/15ce1dbe609fcb235857b83bd1d2a3baf9d59987ffa585e38cb2402ccbbaf225.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Equal width columns --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grow rounded bg-purple-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grow rounded bg-pink-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grow rounded bg-orange-500 p-4 text-center text-white&quot;</span>&gt;</span>Column 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Sidebar layout --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-64 shrink-0 rounded bg-gray-700 p-4 text-white&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-bold&quot;</span>&gt;</span>Sidebar<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Fixed width sidebar content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grow rounded bg-white p-4 shadow&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-bold&quot;</span>&gt;</span>Main Content<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>This content area grows to fill the remaining space<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ادمجها مع معدِّلات التجاوب: <code>md:grow-0</code> و<code>lg:shrink-0</code> وما شابه.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
