const s="kinney",a="tailwind",n="Tailwind CSS",l="css-grid-the-basics",t="CSS Grid: الأساسيات",p=[{depth:2,id:"تهيئة-حاوية-grid",text:"تهيئة حاوية Grid"},{depth:2,id:"تعريف-مسارات-grid-الصريحة",text:"تعريف مسارات Grid الصريحة"},{depth:3,id:"أعمدة-grid",text:"أعمدة Grid"},{depth:3,id:"صفوف-grid",text:"صفوف Grid"},{depth:3,id:"subgrid",text:"Subgrid"},{depth:2,id:"التحكم-في-الوضع-التلقائي",text:"التحكّم في الوضع التلقائي"},{depth:2,id:"تحديد-مقاسات-المسارات-الضمنية",text:"تحديد مقاسات المسارات الضمنية"},{depth:2,id:"التحكم-في-الفجوات",text:"التحكّم في الفجوات"},{depth:2,id:"وضع-عناصر-grid",text:"وضع عناصر Grid"},{depth:3,id:"تمدد-العناصر-عبر-المسارات",text:"تمدّد العناصر عبر المسارات"},{depth:3,id:"البدء-والانتهاء-عند-خطوط-محددة",text:"البدء والانتهاء عند خطوط محدّدة"},{depth:2,id:"المحاذاة-والتوزيع",text:"المحاذاة والتوزيع"},{depth:3,id:"محاذاة-المحتوى-align-content",text:"محاذاة المحتوى (align-content)"},{depth:3,id:"محاذاة-العناصر-align-items",text:"محاذاة العناصر (align-items)"},{depth:3,id:"محاذاة-العنصر-نفسه-align-self",text:"محاذاة العنصر نفسه (align-self)"},{depth:3,id:"توزيع-المحتوى-justify-content",text:"توزيع المحتوى (justify-content)"},{depth:3,id:"توزيع-العناصر-justify-items",text:"توزيع العناصر (justify-items)"},{depth:3,id:"توزيع-العنصر-نفسه-justify-self",text:"توزيع العنصر نفسه (justify-self)"},{depth:3,id:"وضع-المحتوى-والعناصر-place-content-وplace-items-وplace-self",text:"وضع المحتوى والعناصر (place-content وplace-items وplace-self)"},{depth:2,id:"تخطيطات-grid-المتجاوبة",text:"تخطيطات Grid المتجاوبة"},{depth:2,id:"تخصيص-إعدادات-grid",text:"تخصيص إعدادات Grid"},{depth:2,id:"استخدام-القيم-التعسفية-مع-أدوات-grid",text:"استخدام القيم التعسّفية مع أدوات Grid"}],e=`<p>يوفّر CSS Grid مع Tailwind تحكّمًا دقيقًا في التخطيطات ثنائية الأبعاد. وFlexbox قوي في المحاذاة أحادية البُعد، لكنّ Grid يتفوّق في البُعدين. أما Tailwind 4، بنهج «الأدوات أولًا»، فيجعل بناء تخطيطات Grid المعقّدة بديهيًا وسريعًا. يُركّب التخطيطات مباشرةً في HTML عبر أصناف واضحة ودلالية، فتقلّ الحاجة إلى CSS مخصّص.</p>
<h2 id="تهيئة-حاوية-grid">تهيئة حاوية Grid</h2>
<p>لإنشاء تخطيط grid، عرّف أولًا حاوية grid. وفي CSS القياسية يكون ذلك <code>display: grid;</code>. ويستخدم Tailwind صنف الأداة <code>grid</code>.</p>
<p>تطبيق <code>grid</code> على عنصر يجعله حاوية grid، فينشئ سياق تنسيق grid على مستوى الكتلة لمحتوياته. وتتحكّم هذه الحاوية في كيفية توزيع عناصرها المباشرة (عناصر grid).</p>
<p><em>تهيئة حاوية Grid — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/94dd431e6b34104ec19e113bb405fd419ce2da9b5bf85a1a3aaaff279ab5c402.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Grid items go here --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذا الصنف هو أساس كل قدرات تخطيط grid.</p>
<h2 id="تعريف-مسارات-grid-الصريحة">تعريف مسارات Grid الصريحة</h2>
<p>بعد أن تحصل على حاوية grid، عرّف الشبكة بتحديد الأعمدة والصفوف، وهي ما يُعرف بمسارات grid الصريحة.</p>
<h3 id="أعمدة-grid">أعمدة Grid</h3>
<p>عرّف أعمدة grid صريحة باستخدام أدوات تقابل خاصية <code>grid-template-columns</code> في CSS. والأداة الأساسية في Tailwind هي <code>grid-cols-&lt;number&gt;</code>.</p>
<p>تُنشئ <code>grid-cols-&lt;number&gt;</code> شبكة بعدد محدّد من الأعمدة المتساوية الحجم. فمثلًا، تُنشئ <code>grid-cols-3</code> ثلاثة أعمدة، يأخذ كل منها نسبة متساوية من المساحة المتاحة، باستخدام CSS بصيغة <code>repeat(&lt;number&gt;, minmax(0, 1fr))</code>. وتمثّل وحدة <code>fr</code> نسبة من المساحة المتاحة في حاوية grid.</p>
<p><em>أعمدة Grid — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/8ff16d7507bbdb36dc7042d55cdcd616a4e3dea839fd34c4f6a22f58a1d26fcc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4&quot;</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4&quot;</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذا ينشئ شبكة من ثلاثة أعمدة، عرض كل عمود فيها ثلث عرض الحاوية (ناقص الفجوة).</p>
<p>أزل الأعمدة المعرَّفة صراحةً باستخدام <code>grid-cols-none</code> (<code>grid-template-columns: none;</code>).</p>
<p>ولتعريفات الأعمدة المعقّدة، استخدم القيم التعسّفية مع <code>grid-cols-[&lt;value&gt;]</code>. فهذا يسمح بأي قيمة CSS صالحة لـ <code>grid-template-columns</code>، مثل عروض محدّدة، أو <code>repeat</code> بوحدات مختلفة، أو <code>fit-content</code>.</p>
<p><em>أعمدة Grid — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/2fae09d065c0b1a5fd05639c9b637e9fbe7e05ab98ab3d143d0792493237859e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[200px_1fr_200px] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Fixed 200px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Flexible 1fr<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Fixed 200px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>أشِر إلى متغيّرات CSS لتعريفات الأعمدة عبر <code>grid-cols-(&lt;custom-property&gt;)</code>، مثل <code>grid-cols-(--my-column-layout)</code>.</p>
<h3 id="صفوف-grid">صفوف Grid</h3>
<p>وبالمثل، عرّف صفوف grid صريحة باستخدام أدوات تقابل <code>grid-template-rows</code>. والأداة الأساسية هي <code>grid-rows-&lt;number&gt;</code>.</p>
<p>تُنشئ <code>grid-rows-&lt;number&gt;</code> شبكة بعدد محدّد من الصفوف المتساوية الحجم، باستخدام CSS بصيغة <code>repeat(&lt;number&gt;, minmax(0, 1fr))</code>.</p>
<p><em>صفوف Grid — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/1466756b937632dcad1b7555ba663c20158a522e13aa44dbb80aa34730d1451d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-flow-col grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4&quot;</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4&quot;</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذا ينشئ شبكة من ثلاثة صفوف. وتدفّق العناصر إلى الأعمدة (<code>grid-flow-col</code>) بعد ملء الصفوف. ويأخذ كل صف نسبة متساوية من الارتفاع المتاح.</p>
<p>أزل الصفوف المعرَّفة صراحةً باستخدام <code>grid-rows-none</code>.</p>
<p>ولتعريفات صفوف مخصّصة، تسمح <code>grid-rows-[&lt;value&gt;]</code> بالقيم التعسّفية.</p>
<p><em>صفوف Grid — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/766455f4c457b5c83855968a2b0ec9ef16d8bc5960185c18326f6e7556ab5756.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-rows-[100px_auto_100px] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Header (100px)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Content (auto)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Footer (100px)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ويمكن أيضًا استخدام متغيّرات CSS لتعريفات الصفوف عبر <code>grid-rows-(&lt;custom-property&gt;)</code>.</p>
<h3 id="subgrid">Subgrid</h3>
<p>يدعم Tailwind خاصية <code>subgrid</code> لكل من <code>grid-template-columns</code> و<code>grid-template-rows</code> عبر أدوات <code>grid-cols-subgrid</code> و<code>grid-rows-subgrid</code>.</p>
<p>تتيح الـ subgrid لشبكة متداخلة أن تحاذي مساراتها مع شبكة أبيها، فتورث مقاسات ومواضع أعمدة أبيها أو صفوفه.</p>
<p><em>Subgrid — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/5754075c0d4b71bf733ac5bdf0fdb216dbc2d836824e344c1e3eacfbeb5c8305.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-2 grid grid-cols-subgrid gap-4&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- This item spans parent columns 2 and 3; its children align to columns 2 and 3 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Nested Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Nested Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحافظ هذه الميزة على محاذيات grid المعقّدة عبر العناصر المتداخلة.</p>
<h2 id="التحكم-في-الوضع-التلقائي">التحكّم في الوضع التلقائي</h2>
<p>تُوضَع عناصر grid تلقائيًا في خلايا grid المعرَّفة. وتتحكّم خاصية <code>grid-auto-flow</code> في هذا الوضع التلقائي.</p>
<p>أدوات Tailwind للوضع التلقائي:</p>
<ul>
<li><code>grid-flow-row</code>: تملأ العناصر كل صف، وتضيف صفوفًا جديدة عند الحاجة (افتراضي).</li>
<li><code>grid-flow-col</code>: تملأ العناصر كل عمود، وتضيف أعمدة جديدة عند الحاجة.</li>
<li><code>grid-flow-dense</code>: تستخدم خوارزمية حشد «كثيفة» لملء الفجوات المبكرة في الشبكة، وقد يُعيد ذلك ترتيب العناصر. تُدمج مع <code>row</code> أو <code>col</code>.</li>
<li><code>grid-flow-row-dense</code>: حشد كثيف مع تدفّق العناصر بالصف.</li>
<li><code>grid-flow-col-dense</code>: حشد كثيف مع تدفّق العناصر بالعمود.</li>
</ul>
<p><em>التحكّم في الوضع التلقائي — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/2eb2fa902b2e9501e486a4cc25386ef12893f13b71d97a5e65a036129272f169.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-flow-col grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4&quot;</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4&quot;</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هنا، تجعل <code>grid-flow-col</code> العناصر 1 و2 و3 تملأ صفوف العمود الأول قبل الانتقال إلى الثاني.</p>
<h2 id="تحديد-مقاسات-المسارات-الضمنية">تحديد مقاسات المسارات الضمنية</h2>
<p>إذا كان عدد عناصر grid أكبر من عدد الخلايا الصريحة، فإنّ الشبكة تنشئ مسارات <em>ضمنية</em> (أعمدة أو صفوف). ويُتحكّم في مقاسها عبر <code>grid-auto-columns</code> و<code>grid-auto-rows</code>.</p>
<p>أدوات Tailwind لهاتين الخاصيتين:</p>
<ul>
<li><code>auto-cols-auto</code> و<code>auto-rows-auto</code>: تتكيّف مقاسات المسارات الضمنية تلقائيًا بحسب المحتوى.</li>
<li><code>auto-cols-min</code> و<code>auto-rows-min</code>: تأخذ المسارات الضمنية أصغر مقاس للمحتوى داخلها.</li>
<li><code>auto-cols-max</code> و<code>auto-rows-max</code>: تأخذ المسارات الضمنية أكبر مقاس للمحتوى داخلها.</li>
<li><code>auto-cols-fr</code> و<code>auto-rows-fr</code>: تأخذ المسارات الضمنية مقاسًا كنِسَب من المساحة المتاحة.</li>
</ul>
<p><em>تحديد مقاسات المسارات الضمنية — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/7ea5774ac1391ed3234454347bcd30ee0aec09dcfa853e74bd1c2fd583e6496a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid auto-cols-max grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3 that&#x27;s much wider<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لهذه الشبكة عمودان صريحان. ويوضع العنصران 3 و4 في <em>عمود ضمني</em> ثالث. وتضمن <code>auto-cols-max</code> أن يكون هذا العمود عريضًا بما يكفي لأعرض عنصر (العنصر 3).</p>
<p>وتُدعم القيم التعسّفية لـ <code>auto-cols-[&lt;value&gt;]</code> و<code>auto-rows-[&lt;value&gt;]</code>.</p>
<h2 id="التحكم-في-الفجوات">التحكّم في الفجوات</h2>
<p>تحتاج التخطيطات غالبًا إلى مسافة بين عناصر grid. ويوفّر Grid <code>gap</code> و<code>row-gap</code> و<code>column-gap</code>.</p>
<p>يستخدم Tailwind سلّم المسافات الخاص به والقيم التعسّفية في أدوات الفجوات:</p>
<ul>
<li><code>gap-&lt;number&gt;</code>: يضبط الفجوة للصفوف والأعمدة (مثل <code>gap-4</code> أي 1rem).</li>
<li><code>gap-x-&lt;number&gt;</code>: يضبط الفجوة الأفقية.</li>
<li><code>gap-y-&lt;number&gt;</code>: يضبط الفجوة الرأسية.</li>
</ul>
<p><em>التحكّم في الفجوات — المثال 9 — <a href="https://stevekinney.com/generated/playgrounds/7fec7c5de16fdee6edc85221225ed68480a9039d6a3d4643c847831296316777.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-4 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-purple-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-pink-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-indigo-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-teal-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-orange-200 p-4&quot;</span>&gt;</span>Item 5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-lime-200 p-4&quot;</span>&gt;</span>Item 6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تطبّق هذه الأدوات مسافات متّسقة. ويمكن استخدام القيم التعسّفية مثل <code>gap-[10px]</code> أو <code>gap-x-[5%]</code> أيضًا.</p>
<h2 id="وضع-عناصر-grid">وضع عناصر Grid</h2>
<p>يتيح Grid وضع العناصر بدقّة، متجاوزًا الوضع التلقائي.</p>
<h3 id="تمدد-العناصر-عبر-المسارات">تمدّد العناصر عبر المسارات</h3>
<p>لجعل عنصر يمتدّ عبر عدة أعمدة أو صفوف، استخدم <code>grid-column</code> أو <code>grid-row</code> مع <code>span</code>.</p>
<ul>
<li><code>col-span-&lt;number&gt;</code>: يمتدّ العنصر عبر عدد محدّد من الأعمدة.</li>
<li><code>row-span-&lt;number&gt;</code>: يمتدّ العنصر عبر عدد محدّد من الصفوف.</li>
</ul>
<p><em>تمدّد العناصر عبر المسارات — المثال 10 — <a href="https://stevekinney.com/generated/playgrounds/d3e0318a2fc5354baa19881b796d46886166afa59a9af5464a2e662494b67e24.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-6 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1 spans 4 columns<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-2 min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2 spans 2 columns<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-2 min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3 spans 2 columns<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4 spans 4 columns<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذه الشبكة ذات ستة أعمدة يمتدّ فيها العنصر الأول عبر أربعة أعمدة والعنصر الثاني عبر عمودين في الصف الأول. ويفعل العنصران الثالث والرابع الشيء نفسه في الصف الثاني.</p>
<p><code>col-span-full</code> تجعل العنصر يمتدّ عبر كل الأعمدة (<code>grid-column: 1 / -1;</code>). و<code>row-span-full</code> تفعل الشيء نفسه للصفوف.</p>
<p>وتُدعم القيم التعسّفية لـ <code>col-span-[&lt;value&gt;]</code> و<code>row-span-[&lt;value&gt;]</code>.</p>
<h3 id="البدء-والانتهاء-عند-خطوط-محددة">البدء والانتهاء عند خطوط محدّدة</h3>
<p>ضع العنصر بتحديد سطري البداية والنهاية في grid عبر <code>grid-column-start</code> و<code>grid-column-end</code> و<code>grid-row-start</code> و<code>grid-row-end</code>.</p>
<ul>
<li><code>col-start-&lt;number&gt;</code>: يبدأ العنصر عند خط العمود المحدّد.</li>
<li><code>col-end-&lt;number&gt;</code>: ينتهي العنصر عند خط العمود المحدّد.</li>
<li><code>row-start-&lt;number&gt;</code>: يبدأ العنصر عند خط الصف المحدّد.</li>
<li><code>row-end-&lt;number&gt;</code>: ينتهي العنصر عند خط الصف المحدّد.</li>
</ul>
<p><em>البدء والانتهاء عند خطوط محدّدة — المثال 11 — <a href="https://stevekinney.com/generated/playgrounds/6406e8bbfe7cbd4a9cecd222306291a3525eb902058b4ccdf6e0619d65af2491.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-64 grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-start-2 col-end-3 row-start-1 row-end-3 rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    Item 1 (Col 2, Row 1-2)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-start-1 col-end-2 row-start-2 row-end-4 rounded bg-red-200 p-4&quot;</span>&gt;</span>
    Item 2 (Col 1, Row 2-3)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يبدأ العنصر الأول عند خط العمود 2، وينتهي عند خط العمود 3، ويمتدّ عبر الصفوف من 1 إلى 3. ويوضع العنصر الثاني على نحو مماثل.</p>
<p>وتتوفّر أدوات <code>col-auto</code> و<code>row-auto</code> و<code>col-start-auto</code> و<code>col-end-auto</code> و<code>row-start-auto</code> و<code>row-end-auto</code>.</p>
<p>وتُدعم القيم التعسّفية والأرقام السالبة (مثل <code>col-start-[-1]</code>).</p>
<h2 id="المحاذاة-والتوزيع">المحاذاة والتوزيع</h2>
<p>يوفّر Grid تحكّمًا في محاذاة العناصر داخل مناطق grid وفي تموضع المسارات داخل الحاوية.</p>
<h3 id="محاذاة-المحتوى-align-content">محاذاة المحتوى (<code>align-content</code>)</h3>
<p>تتحكّم <code>align-content</code> في محاذاة <em>مسارات</em> grid على طول <em>المحور العرضي</em> للحاوية (رأسيًا عادةً) عند وجود مساحة فائضة. وتُطبَّق على حاوية grid.</p>
<p>أدوات <code>content-*</code> في Tailwind: <code>content-normal</code> و<code>content-center</code> و<code>content-start</code> و<code>content-end</code> و<code>content-between</code> و<code>content-around</code> و<code>content-evenly</code> و<code>content-baseline</code> و<code>content-stretch</code>.</p>
<p><em>محاذاة المحتوى (align-content) — المثال 12 — <a href="https://stevekinney.com/generated/playgrounds/b7aec59f620dcb6d294bc95c820ec18fdb8adee016855f4252a0f75f8e64cda4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-48 grid-rows-3 content-center gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تُوسَّط الصفوف رأسيًا بفضل <code>content-center</code>.</p>
<h3 id="محاذاة-العناصر-align-items">محاذاة العناصر (<code>align-items</code>)</h3>
<p>تتحكّم <code>align-items</code> في محاذاة عناصر grid <em>المفردة</em> داخل <em>خلاياها</em> على طول <em>المحور العرضي</em> للحاوية. وتُطبَّق على حاوية grid.</p>
<p>أدوات <code>items-*</code> في Tailwind: <code>items-start</code> و<code>items-end</code> و<code>items-center</code> و<code>items-baseline</code> و<code>items-stretch</code> (افتراضي).</p>
<p><em>محاذاة العناصر (align-items) — المثال 13 — <a href="https://stevekinney.com/generated/playgrounds/3b56acf6e8bc61cc7ef27bb6d039491def90cba0d061bf5e3710dca8184edfb0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-32 grid-cols-2 items-center gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>كلا العنصرين موسّط رأسيًا في خلاياهما بفضل <code>items-center</code>.</p>
<p>وتمنع أدوات اللاحقة <code>-safe</code> (مثل <code>items-end-safe</code>) العناصر من الخروج خارج حاويتها.</p>
<h3 id="محاذاة-العنصر-نفسه-align-self">محاذاة العنصر نفسه (<code>align-self</code>)</h3>
<p>تتجاوز <code>align-self</code> قيمة <code>align-items</code> بالنسبة إلى عنصر grid <em>واحد</em>. وتُطبَّق على عنصر grid.</p>
<p>أدوات <code>self-*</code> في Tailwind: <code>self-auto</code> (تستخدم <code>align-items</code>)، و<code>self-start</code>، و<code>self-end</code>، و<code>self-center</code>، و<code>self-stretch</code>، و<code>self-baseline</code>.</p>
<p><em>محاذاة العنصر نفسه (align-self) — المثال 14 — <a href="https://stevekinney.com/generated/playgrounds/36baea3f7048f7736fe607f7b8aea8f6c4cb00b085d26714c931c28aeea82b72.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-32 grid-cols-2 items-start gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2 (centered)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تُحاذي <code>items-start</code> العناصر إلى الأعلى، لكنّ <code>self-center</code> تتجاوز ذلك بالنسبة إلى العنصر 2.</p>
<p>وتتوفّر أدوات اللاحقة <code>-safe</code>.</p>
<h3 id="توزيع-المحتوى-justify-content">توزيع المحتوى (<code>justify-content</code>)</h3>
<p>تتحكّم <code>justify-content</code> في محاذاة <em>مسارات</em> grid على طول <em>المحور الأساسي</em> للحاوية (أفقيًا عادةً) عند وجود مساحة فائضة. وتُطبَّق على حاوية grid.</p>
<p>أدوات <code>justify-*</code> في Tailwind: <code>justify-start</code> و<code>justify-end</code> و<code>justify-center</code> و<code>justify-between</code> و<code>justify-around</code> و<code>justify-evenly</code> و<code>justify-stretch</code> و<code>justify-normal</code>.</p>
<p><em>توزيع المحتوى (justify-content) — المثال 15 — <a href="https://stevekinney.com/generated/playgrounds/98187fc11a9cdeecc6dbdffcc831bb8f13435a7cd897912ea9190a10bc508ee8.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-96 grid-cols-[4rem_4rem_4rem] justify-center gap-4 rounded-lg bg-green-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-12 w-12 items-center justify-center rounded bg-blue-200&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-12 w-12 items-center justify-center rounded bg-red-200&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تُوسَّط الأعمدة الضمنية داخل الحاوية بفضل <code>justify-center</code>.</p>
<h3 id="توزيع-العناصر-justify-items">توزيع العناصر (<code>justify-items</code>)</h3>
<p>تتحكّم <code>justify-items</code> في محاذاة عناصر grid <em>المفردة</em> داخل <em>خلاياها</em> على طول <em>المحور السطري</em> للحاوية (أفقيًا عادةً). وتُطبَّق على حاوية grid.</p>
<p>أدوات <code>justify-items-*</code> في Tailwind: <code>justify-items-start</code> و<code>justify-items-end</code> و<code>justify-items-center</code> و<code>justify-items-stretch</code> (افتراضي)، و<code>justify-items-normal</code>.</p>
<p><em>توزيع العناصر (justify-items) — المثال 16 — <a href="https://stevekinney.com/generated/playgrounds/8de9c4ed54af705b78389549cc35350e4737c7d3beb4e2cb86902c7807f42814.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-96 grid-cols-3 justify-items-center gap-4 rounded-lg bg-green-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-24 w-24 rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-24 w-24 rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تُوسَّط العناصر أفقيًا في خلاياها بفضل <code>justify-items-center</code>.</p>
<p>وتتوفّر أدوات اللاحقة <code>-safe</code>.</p>
<h3 id="توزيع-العنصر-نفسه-justify-self">توزيع العنصر نفسه (<code>justify-self</code>)</h3>
<p>تتجاوز <code>justify-self</code> قيمة <code>justify-items</code> بالنسبة إلى عنصر grid <em>واحد</em>. وتُطبَّق على عنصر grid.</p>
<p>أدوات <code>justify-self-*</code> في Tailwind: <code>justify-self-auto</code> (تستخدم <code>justify-items</code>)، و<code>justify-self-start</code>، و<code>justify-self-end</code>، و<code>justify-self-center</code>، و<code>justify-self-stretch</code>.</p>
<p><em>توزيع العنصر نفسه (justify-self) — المثال 17 — <a href="https://stevekinney.com/generated/playgrounds/7f610afd0a3d42136154dbc764ed5a73996017ffda0558a68b21b1a5b392207a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-2 justify-items-start gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1 (start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] justify-self-center rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2 (centered)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تُحاذي <code>justify-items-start</code> العناصر إلى اليسار، لكنّ <code>self-center</code> تتجاوز ذلك بالنسبة إلى العنصر 2.</p>
<p>وتتوفّر أدوات اللاحقة <code>-safe</code>.</p>
<h3 id="وضع-المحتوى-والعناصر-place-content-وplace-items-وplace-self">وضع المحتوى والعناصر (<code>place-content</code> و<code>place-items</code> و<code>place-self</code>)</h3>
<p>يوفّر Grid اختصارات لضبط المحاذاة والتوزيع معًا.</p>
<ul>
<li><code>place-content-*</code>: تضبط <code>align-content</code> و<code>justify-content</code>. تُطبَّق على الحاوية.</li>
<li><code>place-items-*</code>: تضبط <code>align-items</code> و<code>justify-items</code>. تُطبَّق على الحاوية.</li>
<li><code>place-self-*</code>: تضبط <code>align-self</code> و<code>justify-self</code>. تُطبَّق على العنصر.</li>
</ul>
<p><em>وضع المحتوى والعناصر (place-content وplace-items وplace-self) — المثال 18 — <a href="https://stevekinney.com/generated/playgrounds/5521e2ffc6f903df71c3d7ac624c342f7ac028ffb76bc825ef447c25ab4862f2.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-48 w-48 grid-cols-2 grid-rows-2 place-items-center gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-3&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-3&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-3&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-yellow-200 p-3&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>توسّط <code>place-items-center</code> جميع العناصر أفقيًا ورأسيًا في خلاياها.</p>
<p>وتوسّط <code>place-content-center</code> مسارات grid داخل الحاوية. وتوسّط <code>place-self-center</code> عنصرًا مفردًا في خليته.</p>
<p>وتتوفّر أدوات اللاحقة <code>-safe</code>.</p>
<h2 id="تخطيطات-grid-المتجاوبة">تخطيطات Grid المتجاوبة</h2>
<p>يدعم Tailwind التصميم المتجاوب. ويمكن تطبيق أدوات Grid بشكل مشروط عند نقاط التوقّف (<code>sm:</code> و<code>md:</code> و<code>lg:</code> و<code>xl:</code> و<code>2xl:</code>).</p>
<p><em>تخطيطات Grid المتجاوبة — المثال 19 — <a href="https://stevekinney.com/generated/playgrounds/3c750e723c88076f1176bfdedb1d45824bf514223227feebb086405d4627dc97.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 md:grid-cols-2 lg:grid-cols-3&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-purple-200 p-4&quot;</span>&gt;</span>Item 5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-pink-200 p-4&quot;</span>&gt;</span>Item 6<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذه الشبكة بعمود واحد على الشاشات الصغيرة، وبعمودين على المتوسطة (<code>md</code>)، وبثلاثة أعمدة على الكبيرة (<code>lg</code>).</p>
<p>وTailwind يتبع منهج «الجوال أولًا»: فتُطبَّق الأنماط غير المسبوقة بالبادئة على جميع المقاسات، وتتجاوز الأنماط المسبوقة بالبادئة تلك عند نقطة توقّفها وما فوقها.</p>
<p>يدعم Tailwind أيضًا استعلامات الحاوية. ضع علامة <code>@container</code> على عنصر، ثم استخدم متغيّرات مثل <code>@sm:</code> على أبنائه لتنسيقهم بحسب عرض الحاوية.</p>
<p><em>تخطيطات Grid المتجاوبة — المثال 20 — <a href="https://stevekinney.com/generated/playgrounds/1f3847b11ba384acbfa954fe9d1b6c4d0827387c7b3f275347504229cbb4609c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 @md:grid-cols-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[80px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>شبكة الابن بعمود واحد افتراضيًا، لكنها بعمودين عندما يبلغ عنصر <code>@container</code> المقاس المتوسط.</p>
<h2 id="تخصيص-إعدادات-grid">تخصيص إعدادات Grid</h2>
<p>خصّص أعمدة grid وصفوفه وفجواته باستخدام التوجيه <code>@theme</code> في ملف CSS الرئيسي.</p>
<p>عرّف قوالب grid مخصّصة عبر متغيّرات السمة <code>--grid-template-columns-*</code> و<code>--grid-template-rows-*</code>.</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--grid-template-columns-layout</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">2</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attr">--grid-template-rows-header</span>: auto;
  <span class="hljs-attr">--grid-template-rows-content</span>: <span class="hljs-number">1</span>fr;
  <span class="hljs-attr">--grid-template-rows-footer</span>: auto;
}
</code></pre>
<p>استخدم هذه القيم كأصناف أدوات:</p>
<p><em>تخصيص إعدادات Grid — المثال 21 — <a href="https://stevekinney.com/generated/playgrounds/e5d877da7d925822d525195ee805d45cc19a075b52104edca7514495c2cc755f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid-cols-layout grid-rows-header grid-rows-content grid-rows-footer grid gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Content Area<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يدمج هذا تعاريف grid المعقّدة في نظام التصميم لديك. وخصّص مسافات الفجوات عبر <code>--spacing</code>.</p>
<h2 id="استخدام-القيم-التعسفية-مع-أدوات-grid">استخدام القيم التعسّفية مع أدوات Grid</h2>
<p>تدعم كثير من أدوات grid في Tailwind القيم التعسّفية عبر صيغة <code>[&lt;value&gt;]</code>، ما يسمح بأي قيمة CSS صالحة.</p>
<p><em>استخدام القيم التعسّفية مع أدوات Grid — المثال 22 — <a href="https://stevekinney.com/generated/playgrounds/49b7638cfb15df62580a5065567b9391e463ac5852b22fcfb3b03a26d759505a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[2rem] rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[120px] rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[120px] rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[120px] rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-h-[120px] rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنشئ القيم التعسّفية شبكة متجاوبة بأعمدة تتكيّف تلقائيًا وفجوة مخصّصة. واستخدم متغيّرات CSS داخل القيم التعسّفية، مثل <code>w-[var(--sidebar-width)]</code>.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
