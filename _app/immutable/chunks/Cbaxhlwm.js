const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-statistics-card",t="بناء بطاقة إحصاءات",p=[{depth:2,id:"إضافة-سياق-استعلام-الحاوية",text:"إضافة سياق استعلام الحاوية"},{depth:2,id:"إنشاء-سلوك-استجابة-قائم-على-الحاوية",text:"إنشاء سلوك استجابة قائم على الحاوية"},{depth:2,id:"لماذا-تهم-استعلامات-الحاويات",text:"لماذا تهم استعلامات الحاويات"},{depth:2,id:"التحديات",text:"التحديات"}],c=`<p>لنبدأ ببنية HTML الأساسية لمجموعة من بطاقات الإحصاءات.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/7c6aefe67c3b63d60e4b3b0e222fd91c4a6e799c87bcdb8fb80c91c8e5dd4e4d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Growth Rate<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لدينا ثلاث بطاقات إحصاءات داخل حاوية، لكنها مكدّسة رأسيًا وبلا أي تنسيق. لنحوّلها إلى شبكة ذكية تتكيّف بحسب المساحة المتاحة في الحاوية الأم — لا بحسب حجم إطار العرض.</p>
<h2 id="إضافة-سياق-استعلام-الحاوية">إضافة سياق استعلام الحاوية</h2>
<p>أولًا، لنثبّت حاويتنا بوصفها «سياق احتواء»، ونضيف تنسيقًا أساسيًا للبطاقة مستخدمين أنماطًا من <a href="https://stevekinney.com/courses/tailwind/building-a-card">درس البطاقة</a>.</p>
<p><em>إضافة سياق استعلام الحاوية — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/d0c5df5a9b19ba600edbbfcd8bbeffa4553d97d42c7b2939bc027b89d22f0af0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Growth Rate<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الإضافات الأساسية:</p>
<ul>
<li><code>@container</code>: يثبّت هذا العنصر بوصفه سياق استعلام حاوية — فيمكن لعناصره الآن أن تستجيب لحجم هذه الحاوية، لا لإطار العرض</li>
<li><code>grid gap-4</code>: ينشئ تخطيط CSS Grid مع فواصل قدرها 16px بين العناصر</li>
<li>تنسيق البطاقة بـ<code>rounded-lg bg-white p-6 shadow-md</code> لمظهر احترافي</li>
<li>تسلسل هرمي في الطباعة بتسميات صغيرة وقيم كبيرة</li>
</ul>
<p>هذا مختلف جوهريًا عن التصميم المستجيب باستعلامات الوسائط — فستتكيّف هذه البطاقات بحسب عرض العنصر الأم، لا بحسب عرض نافذة المتصفح.</p>
<h2 id="إنشاء-سلوك-استجابة-قائم-على-الحاوية">إنشاء سلوك استجابة قائم على الحاوية</h2>
<p>الآن لنضف السحر: جعل الشبكة مستجيبة لحجم الحاوية باستخدام أدوات استعلام الحاوية.</p>
<p><em>إنشاء سلوك استجابة قائم على الحاوية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/b0976661a376ccb86f0442855691729d17f016cf92b16ecee8d4a946b52f192d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-600&quot;</span>&gt;</span>Growth Rate<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>السلوك المستجيب لاستعلام الحاوية:</p>
<ul>
<li><code>@sm:grid-cols-2</code>: عندما يبلغ عرض الحاوية 384px على الأقل، اعرض عمودين</li>
<li><code>@lg:grid-cols-3</code>: عندما يبلغ عرض الحاوية 512px على الأقل، اعرض ثلاثة أعمدة</li>
<li>الافتراضي (بلا بادئة): عمود واحد عندما تكون الحاوية ضيّقة</li>
</ul>
<p>تشير البادئة <code>@</code> إلى أن هذه استعلامات حاويات لا استعلامات وسائط. وتستجيب البطاقات لحجم العنصر الأب المباشر، ما يجعلها مثالية للتعديلية في الأشرطة الجانبية أو لوحات المعلومات أو أي تخطيط مقيَّد.</p>
<h2 id="لماذا-تهم-استعلامات-الحاويات">لماذا تهم استعلامات الحاويات</h2>
<p>يستخدم التصميم المستجيب التقليدي استعلامات وسائط تستجيب لحجم إطار العرض. لكن ماذا لو أردت وضع شبكة الإحصاءات هذه في شريط جانبي ضيّق؟ كانت استعلامات الوسائط ستعرض تخطيط سطح المكتب حتى مع ضيق الحاوية.</p>
<p>تحل استعلامات الحاويات ذلك بجعل المكوّنات <strong>قابلة لإعادة الاستخدام فعلًا</strong>. فمكوّن شبكة الإحصاءات نفسه سي:</p>
<ul>
<li>يعرض عمودًا واحدًا في شريط جانبي ضيّق (حتى على سطح المكتب)</li>
<li>يعرض عمودين أو ثلاثة في منطقة المحتوى الرئيسية</li>
<li>يتكيّف تلقائيًا مع أي حجم لحاوية أم</li>
</ul>
<p>هذا هو مستقبل تصميم المكوّنات المستجيب — مكوّنات تتكيّف مع سياقها، لا مع حجم الشاشة وحده.</p>
<h2 id="التحديات">التحديات</h2>
<p>جرّب بناء هذه الصيغ:</p>
<ol>
<li><strong>إحصاءات محسّنة</strong>: أضف مؤشرات اتجاه (أيقونات ↗️) لا تظهر إلا في التخطيطات متعددة الأعمدة باستخدام <code>@sm:block hidden</code></li>
<li><strong>حاوية متداخلة</strong>: ضع شبكة الإحصاءات هذه داخل حاوية بطاقة وراقب كيف تتكيّف بحسب عرض البطاقة لا بعرض الصفحة</li>
</ol>
`,h={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,h as default,p as headings,c as html,l as slug,t as title};
