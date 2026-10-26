const s="kinney",a="tailwind",n="Tailwind CSS",l="grid-subgrids",t="الشبكات الفرعية",p=[{depth:2,id:"العمل-مع-تخطيطات-grid",text:"العمل مع تخطيطات Grid"},{depth:3,id:"أعمدة-grid",text:"أعمدة Grid"},{depth:3,id:"صفوف-grid",text:"صفوف Grid"}],e=`<p>يستخدم Tailwind CSS أصناف الأدوات لبناء واجهات مستخدم معقّدة ومتجاوبة داخل HTML. والإصدار 4.0 يحسّن الأداء ويتبنّى CSS الحديث.</p>
<h2 id="العمل-مع-تخطيطات-grid">العمل مع تخطيطات Grid</h2>
<p>يوفّر Tailwind CSS أدوات لـ CSS Grid لإنشاء تخطيطات معقّدة. عرّف أعمدة grid وصفوفه، وتحكّم في الوضع التلقائي، وضع عناصر grid.</p>
<h3 id="أعمدة-grid">أعمدة Grid</h3>
<p>حدّد عدد أعمدة grid عبر أدوات مثل <code>grid-cols-&lt;number&gt;</code> (مثل <code>grid-cols-2</code> و<code>grid-cols-4</code>) لأعمدة متساوية الحجم. واستخدم <code>grid-cols-none</code> لعدم وجود أعمدة grid.</p>
<h4>تطبيق شبكة فرعية للأعمدة</h4>
<p>يدعم Tailwind CSS الشبكات الفرعية للأعمدة. استخدم <code>grid-cols-subgrid</code> لتبنّي مسارات الأعمدة من العنصر الأب. وهذا يحاذي عناصر grid المتداخلة مع حاوية grid الأم.</p>
<p><em>تطبيق شبكة فرعية للأعمدة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/13a3be93dac65bec93914d21286727e06612778555ec19aa0011d423102ba9cb.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-12 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Parent container: 12-column grid --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-full grid grid-cols-subgrid gap-4&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Child item: spans all parent columns, becomes a subgrid --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
      Item 1
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>
      Item 2
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>
      Item 3
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>العنصر الابن الحامل لـ <code>grid-cols-subgrid</code> يرث بنية أعمدة أبيه.</p>
<h3 id="صفوف-grid">صفوف Grid</h3>
<p>حدّد صفوف grid عبر أدوات مثل <code>grid-rows-&lt;number&gt;</code> (مثل <code>grid-rows-2</code> و<code>grid-rows-4</code>) لصفوف متساوية الحجم. واستخدم <code>grid-rows-none</code> لإزالة صفوف grid.</p>
<h4>تطبيق شبكة فرعية للصفوف</h4>
<p>استخدم <code>grid-rows-subgrid</code> لعنصر grid ليبتني مسارات الصفوف من أبيه. وهذا يحافظ على المحاذاة الرأسية في بنى grid المتداخلة.</p>
<p><em>تطبيق شبكة فرعية للصفوف — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/469f9b742a367d36e3f54610ce0518cf19a96a22ec266decc5b481869df69c82.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-64 grid-rows-6 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Parent container: 6-row grid, fixed height --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row-span-full grid grid-rows-subgrid gap-4&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Child item: spans all parent rows, becomes a subgrid --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row-span-2 flex items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
      Row Item 1
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row-span-2 flex items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Row Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row-span-2 flex items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>
      Row Item 3
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>العنصر الابن الحامل لـ <code>grid-rows-subgrid</code> يحاذي صفوفه مع مسارات صفوف شبكة grid الأم.</p>
<p>تعكس أدوات الشبكة الفرعية قدرات CSS Grid الأصلية، وتقدّم منهجًا قائمًا على الأدوات لميزة التخطيط هذه في Tailwind.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
