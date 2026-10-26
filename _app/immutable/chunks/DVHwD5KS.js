const s="kinney",a="tailwind",n="Tailwind CSS",l="grid-dynamic-columns",c="الأعمدة الديناميكية",d=[{depth:2,id:"تطبيق-الشبكات-الفرعية-للأعمدة",text:"تطبيق الشبكات الفرعية للأعمدة"},{depth:3,id:"كيف-يعمل-grid-cols-subgrid",text:"كيف يعمل grid-cols-subgrid"},{depth:3,id:"الشبكات-الفرعية-والمحتوى-الديناميكي",text:"الشبكات الفرعية والمحتوى الديناميكي"}],e=`<p>يبسّط Tailwind CSS العمل مع الأعمدة الديناميكية، وخاصة مع الشبكات الفرعية، باستخدام أدواته الخاصة بـ grid.</p>
<p>تتيح ميزات CSS الحديثة مثل <code>subgrid</code> تصميمات متجاوبة ومعقّدة داخل HTML. ويجعل نهج Tailwind القائم على «الأدوات أولًا» مفاهيم CSS Grid المعقّدة سهلة الاستخدام.</p>
<h2 id="تطبيق-الشبكات-الفرعية-للأعمدة">تطبيق الشبكات الفرعية للأعمدة</h2>
<p>تُعدّ قيمة <code>subgrid</code> الخاصة بـ <code>grid-template-columns</code> مفتاحًا للتخطيطات المتداخلة المحاذاة. ويوفّر Tailwind هذه القيمة عبر <code>grid-cols-subgrid</code>.</p>
<p>تطبيق <code>grid-cols-subgrid</code> على عنصر grid (وهو أيضًا حاوية grid) تخبر الشبكة الابنة أن تتبنّى مسارات أعمدة أبيها بدلًا من تعريف مساراتها الخاصة. وهذا جوهري للحفاظ على المحاذاة عبر العناصر المتداخلة.</p>
<h3 id="كيف-يعمل-grid-cols-subgrid">كيف يعمل <code>grid-cols-subgrid</code></h3>
<p>تخيّل تخطيطًا رئيسيًا بشبكة أعمدة محدّدة. فالعنصر الموجود داخل خلية من هذه الشبكة الرئيسية يحتاج إلى أعمدة خاصة به محاذاة تمامًا لأعمدة الأب. وبدون <code>subgrid</code>، فإن مطابقة أعمدة الشبكة الابنة مع الأب يدويًا عرضة للخطأ، خاصةً في التصاميم المتجاوبة.</p>
<p>تجعل <code>grid-cols-subgrid</code> حاوية الشبكة الابنة ترث بنية أعمدة أبيها. بعدها يمكن لأبناء حاوية الشبكة الفرعية هذه استخدام سطور أعمدة الشبكة الأم في الوضع والتمدّد.</p>
<p>مثال:</p>
<p><em>كيف يعمل grid-cols-subgrid — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/cb638477b94ae3320960712716e476b2f345cd6ad99789d8e1d6c711cfd9b6e7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-12 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Parent container: 12-column grid --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-full grid grid-cols-subgrid gap-4&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Child item: spans all parent columns, becomes a subgrid --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4&quot;</span>&gt;</span>
      Item 1 (spans parent cols 1-4)
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4&quot;</span>&gt;</span>
      Item 2 (spans parent cols 5-8)
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4&quot;</span>&gt;</span>
      Item 3 (spans parent cols 9-12)
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-4 flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4&quot;</span>&gt;</span>
    Another parent grid item (spans cols 1-4)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col-span-8 flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4&quot;</span>&gt;</span>
    Another parent grid item (spans cols 5-12)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الـ <code>div</code> الحامل لـ <code>col-span-full grid grid-cols-subgrid gap-4</code> هو ابن لـ <code>grid grid-cols-12</code> الرئيسية. وهو يمتدّ عبر أعمدة الأب الاثني عشر جميعًا. وبفضل <code>grid grid-cols-subgrid</code>، يستخدم تخطيطه الداخلي مسارات الأعمدة الاثني عشر والفجوة نفسها التي لدى الأب. وتستخدم عناصره (<code>Item 1</code> و<code>Item 2</code> و<code>Item 3</code>) قيمة <code>col-span-4</code> نسبةً إلى البنية الموروثة ذات الأعمدة الاثني عشر، مما يضمن محاذاة مثالية مع شبكة الأب. وهذا مفيد للمكوّنات المتداخلة التي تحتاج إلى محاذاة بصرية مع شبكة الصفحة ككل.</p>
<h3 id="الشبكات-الفرعية-والمحتوى-الديناميكي">الشبكات الفرعية والمحتوى الديناميكي</h3>
<p>يشير جانب «الديناميكي» غالبًا إلى محتوى الشبكة الفرعية لا إلى تعريفها. فإذا كانت العناصر داخل الشبكة الفرعية ديناميكية (مثلًا قادمة من API أو معروضة بشكل شرطي)، فإن <code>grid-cols-subgrid</code> تضمن محاذاتها مع مسارات أعمدة الأب. وتبقى بنية التخطيط (سطور الأعمدة) ثابتة وموروثة، ما يُبسّط إدارة الواجهات الديناميكية.</p>
<p>وبينما ترث <code>grid-cols-subgrid</code> مسارات الأب، يتيح Tailwind أيضًا تعريف مسارات أعمدة ديناميكية على حاوية grid باستخدام القيم التعسّفية: <code>grid-cols-[&lt;value&gt;]</code> أو <code>grid-cols-(&lt;custom-property&gt;)</code>. فمثلًا <code>grid-cols-[200px_1fr_200px]</code> أو <code>grid-cols-(--my-layout-cols)</code>. ويمنح هذا مرونة في تعريفات grid الديناميكية حين لا تكون <code>subgrid</code> مطلوبة (أي حين لا نحتاج إلى الوراثة بل إلى مقاسات مسارات غير قياسية أو ديناميكية). ومع ذلك، للمحاذاة المتداخلة الصارمة، تظل <code>grid-cols-subgrid</code> هي الخيار.</p>
<p>وباختصار، <code>grid-cols-subgrid</code> هي أداة Tailwind لخاصية CSS <code>subgrid</code> على <code>grid-template-columns</code>، وتتيح للشبكات المتداخلة وراثة مسارات أعمدة الأب وتحقيق محاذاة دقيقة. وهذا حاسم في التخطيطات المعقّدة ذات المحتوى الديناميكي مع الحفاظ على بنية grid متّسقة.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:c,headings:d,html:e};export{s as book,a as chapter,n as chapterTitle,t as default,d as headings,e as html,l as slug,c as title};
