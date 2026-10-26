const s="kinney",a="tailwind",n="Tailwind CSS",l="grid-auto-placement-and-implicit-tracks",t="الوضع التلقائي والمسارات الضمنية",p=[{depth:2,id:"اتجاه-الوضع-التلقائي",text:"اتجاه الوضع التلقائي"},{depth:2,id:"تحديد-مقاس-الصفوف-الضمنية",text:"تحديد مقاس الصفوف الضمنية"},{depth:2,id:"تحديد-مقاس-الأعمدة-الضمنية",text:"تحديد مقاس الأعمدة الضمنية"},{depth:2,id:"مثال-الحشد-الكثيف",text:"مثال الحشد الكثيف"},{depth:2,id:"شبكة-بطاقات-متجاوبة",text:"شبكة بطاقات متجاوبة"}],e=`<p>يوفّر Tailwind CSS أدوات للتحكّم في كيفية وضع عناصر grid تلقائيًا وفي تحديد مقاسات المسارات الضمنية عندما تحتاج الشبكة إلى إنشاء صفوف أو أعمدة جديدة.</p>
<h2 id="اتجاه-الوضع-التلقائي">اتجاه الوضع التلقائي</h2>
<p>استخدم أدوات <code>grid-flow-*</code> للتحكّم في كيفية وضع العناصر:</p>
<p><em>اتجاه الوضع التلقائي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/7670fecd565408d849f7c935b0e6e7621f0dbb9ad8794d985fe4e831c42ad255.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Default: fill rows first --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-flow-row grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Creates new row --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Fill columns first --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 grid grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-indigo-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Creates new column --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الأدوات المتاحة:</p>
<ul>
<li><code>grid-flow-row</code> - ملء الصفوف أولًا (افتراضي)</li>
<li><code>grid-flow-col</code> - ملء الأعمدة أولًا</li>
<li><code>grid-flow-dense</code> - ملء الفجوات بالعناصر الأصغر</li>
<li><code>grid-flow-row-dense</code> - تدفّق بالصفوف مع حشد كثيف</li>
<li><code>grid-flow-col-dense</code> - تدفّق بالأعمدة مع حشد كثيف</li>
</ul>
<h2 id="تحديد-مقاس-الصفوف-الضمنية">تحديد مقاس الصفوف الضمنية</h2>
<p>تحكّم في مقاس الصفوف المنشأة تلقائيًا عبر <code>auto-rows-*</code>:</p>
<p><em>تحديد مقاس الصفوف الضمنية — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/aaeb274785ae4979e0d008039941fe0550484a0b30322bc0081d7c4bb59c5e10.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- New rows are 100px tall --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid auto-rows-[100px] grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- In a 100px tall row --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Responsive row sizing --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 grid auto-rows-min grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4 lg:auto-rows-max&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-purple-200 p-4&quot;</span>&gt;</span>Content adapts to row sizing<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-pink-200 p-4&quot;</span>&gt;</span>More content here<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الخيارات:</p>
<ul>
<li><code>auto-rows-auto</code> - مقاس بحسب المحتوى</li>
<li><code>auto-rows-min</code> - أصغر مقاس للمحتوى</li>
<li><code>auto-rows-max</code> - أكبر مقاس للمحتوى</li>
<li><code>auto-rows-fr</code> - نسبة متساوية من المساحة</li>
<li><code>auto-rows-[200px]</code> - مقاس مخصّص</li>
</ul>
<h2 id="تحديد-مقاس-الأعمدة-الضمنية">تحديد مقاس الأعمدة الضمنية</h2>
<p>تحكّم في مقاس الأعمدة المنشأة تلقائيًا عبر <code>auto-cols-*</code>:</p>
<p><em>تحديد مقاس الأعمدة الضمنية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/4855ec3595226ab06349664773adc6a405fc04a7ce99f61a7449cd1aec3c197a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- New columns are 200px wide --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid auto-cols-[200px] grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- In a 200px wide column --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الخيارات:</p>
<ul>
<li><code>auto-cols-auto</code> - مقاس بحسب المحتوى</li>
<li><code>auto-cols-min</code> - أصغر مقاس للمحتوى</li>
<li><code>auto-cols-max</code> - أكبر مقاس للمحتوى</li>
<li><code>auto-cols-fr</code> - نسبة متساوية من المساحة</li>
<li><code>auto-cols-[minmax(200px,1fr)]</code> - مقاس مخصّص</li>
</ul>
<h2 id="مثال-الحشد-الكثيف">مثال الحشد الكثيف</h2>
<p><em>مثال الحشد الكثيف — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/442a4a84aa9ab6435fa2faa1297b1ebfee79e3877788e5cede6b8effad18cb6a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-flow-row-dense grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    Large item
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Small 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Small 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    Large item
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Small 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Dense packing fills gaps automatically --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="شبكة-بطاقات-متجاوبة">شبكة بطاقات متجاوبة</h2>
<p><em>شبكة بطاقات متجاوبة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/c1d09ad1ab0eb6437825792e64e413a53251aee75dcbd8480ea05e953270804f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid auto-rows-[minmax(200px,auto)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-blue-200 p-4 lg:col-span-2&quot;</span>&gt;</span>
    Featured card
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Regular card<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Regular card<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Regular card<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ينشئ هذا تخطيطًا متجاوبًا يكون فيه:</p>
<ul>
<li>الأعمدة تتكيّف تلقائيًا مع حجم الشاشة</li>
<li>الصفوف الجديدة بارتفاع 200px على الأقل</li>
<li>البطاقات المميّزة تمتدّ عبر عمودين على الشاشات الكبيرة</li>
<li>جميع العناصر توضع تلقائيًا بكفاءة</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
