const s="kinney",a="tailwind",n="Tailwind CSS",e="grid-arbitrary-column-counts",t="أعداد الأعمدة التعسّفية",l=[{depth:2,id:"تعريف-أعمدة-grid",text:"تعريف أعمدة Grid"},{depth:3,id:"تطبيق-شبكة-فرعية-للأعمدة",text:"تطبيق شبكة فرعية للأعمدة"},{depth:3,id:"استخدام-تعريفات-أعمدة-تعسفية",text:"استخدام تعريفات أعمدة تعسّفية"}],c=`<p>يتيح CSS Grid في Tailwind CSS بناء تخطيطات متجاوبة ومعقّدة داخل HTML. ويترجم Tailwind ميزات CSS الأصلية مثل <code>grid-template-columns</code> إلى أصناف موجزة.</p>
<h2 id="تعريف-أعمدة-grid">تعريف أعمدة Grid</h2>
<p>يوفّر Tailwind أدوات لبنية أعمدة grid. والأصناف مثل <code>grid-cols-1</code> إلى <code>grid-cols-12</code> (وما فوقها عبر الإعداد) تنشئ شبكات بعدد ثابت من الأعمدة المتساوية. و<code>grid-cols-none</code> تحدّد عدم وجود أعمدة grid.</p>
<p>وتُنتج أدوات مثل <code>grid-cols-4</code> CSS من الشكل <code>grid-template-columns: repeat(4, minmax(0, 1fr));</code>، فتُنشئ أعمدة مرنة متساوية العرض.</p>
<h3 id="تطبيق-شبكة-فرعية-للأعمدة">تطبيق شبكة فرعية للأعمدة</h3>
<p>للعناصر grid المتداخلة التي تحتاج إلى محاذاة مع مسارات أعمدة الأب، يدعم Tailwind خاصية CSS <code>subgrid</code>. وتجعل أداة <code>grid-cols-subgrid</code> عنصر grid يتبنّى مسارات أعمدة أبيه، مما يضمن المحاذاة عبر مستويات التداخل.</p>
<h3 id="استخدام-تعريفات-أعمدة-تعسفية">استخدام تعريفات أعمدة تعسّفية</h3>
<p>لتعريفات أعمدة مخصّصة لا تغطيها الأنماط القياسية، يكون دعم Tailwind للقيم التعسّفية مفيدًا. استخدم <code>grid-cols-[&lt;value&gt;]</code> لضبط <code>grid-template-columns</code> على أي قيمة CSS صالحة.</p>
<p>وتتيح هذه الصيغة <code>[]</code> مقاسات مسارات مخصّصة أو دوال تكرار أو متغيّرات CSS، فتخرج عن قيود السمة المُعرَّفة مسبقًا.</p>
<h4>تعريف قوائم مسارات مخصّصة</h4>
<p>قدّم نص قائمة المسارات المخصّصة بين أقواس مربّعة.</p>
<p><em>تعريف قوائم المسارات المخصّصة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/eefc83480c16ddbf176d940c7dd559e79257ec1b6caba4a663d9c460c88e5210.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[200px_1fr_1fr] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    Fixed 200px
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>
    Flexible 1fr
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>
    Flexible 1fr
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذا يمنحك تحكّمًا دقيقًا، فيسمح بمقاسات مسارات تجمع بين الثابت والمرن والقائم على المحتوى (<code>min-content</code> و<code>max-content</code> و<code>auto</code>).</p>
<h4>استخدام <code>repeat()</code> مع القيم التعسّفية</h4>
<p>استخدم دالة CSS <code>repeat()</code> داخل القيم التعسّفية لأنماط مثل عدد ديناميكي من الأعمدة أو أعمدة متكرّرة غير متساوية العرض.</p>
<p>مثال: عدد متغيّر من الأعمدة متساوية العرض.</p>
<p><em>استخدام repeat() مع القيم التعسّفية — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/e1bec70fd6ac6d616655a54a3fde490802b7fa4b15c00f7a878402ec3d067daa.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[repeat(var(--col-count),_1fr)] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
  <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;--col-count: 4;&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يمكن التحكّم في <code>--col-count</code> عبر متغيّرات CSS (وقد تُضبط بواسطة JavaScript أو CSS أخرى). وبالنسبة إلى متغيّرات CSS كقيم تعسّفية، يدعم Tailwind أيضًا <code>grid-cols-(--col-definition)</code>.</p>
<h4>أعداد أعمدة ديناميكية عبر القيم التعسّفية</h4>
<p>يتيح دمج القيم التعسّفية مع متغيّرات CSS أعداد أعمدة ديناميكية. عرّف متغيّر CSS (مثلًا عبر <code>@theme</code> أو CSS قياسية) يحمل قيمة <code>grid-template-columns</code>، ثم أشِر إليه بـ <code>grid-cols-(&lt;custom-property&gt;)</code>.</p>
<p>فإذا كانت <code>--dynamic-cols: repeat(3, auto) 1fr;</code> استخدم <code>class=&quot;grid grid-cols-(--dynamic-cols)&quot;</code>. وهذا يسمح بتعريفات grid مرنة تستجيب لتغيّرات متغيّرات CSS.</p>
<p>وتوفّر <code>grid-cols-[&lt;value&gt;]</code> و<code>grid-cols-(&lt;custom-property&gt;)</code> وسيلتين لتعريف أي بنية أعمدة grid بصيغة CSS قياسية، فتتيح تخطيطات grid مخصّصة أو ديناميكية في Tailwind. ويختلف ذلك عن <code>grid-cols-subgrid</code> التي ترث مسارات الأب.</p>
`,p={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:l,html:c};export{s as book,a as chapter,n as chapterTitle,p as default,l as headings,c as html,e as slug,t as title};
