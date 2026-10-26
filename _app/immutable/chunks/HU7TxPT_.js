const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-blog-layout",t="بناء تخطيط مدوّنة",p=[{depth:2,id:"فهم-المناطق-الدلالية-في-الشبكة",text:"فهم المناطق الدلالية في الشبكة"},{depth:2,id:"لماذا-تتفوق-المناطق-المسماة-على-مد-الأعمدة",text:"لماذا تتفوق المناطق المسمّاة على مدّ الأعمدة"},{depth:2,id:"إضافة-تنسيق-وطباعة-احترافية",text:"إضافة تنسيق وطباعة احترافية"},{depth:2,id:"تحسينات-إضافية-على-التخطيط-المستجيب-للحاوية",text:"تحسينات إضافية على التخطيط المستجيب للحاوية"},{depth:2,id:"فهم-الفرق-بين-الحاوية-واستعلامات-الوسائط",text:"فهم الفرق بين الحاوية واستعلامات الوسائط"},{depth:2,id:"التحديات",text:"التحديات"}],e=`<p>لنبدأ ببنية HTML الأساسية الخاصة بتخطيط مقال مدوّنة بسيط.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/29168963c3ff12c38a8729b349b5ca06e2f15b441f7c11a696b43a8fa143870a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-sm rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-bold&quot;</span>&gt;</span>The Future of Web Development<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 text-sm&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mr-2 rounded bg-white px-2 py-1&quot;</span>&gt;</span>Published on March 15, 2025<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white px-2 py-1&quot;</span>&gt;</span>By Sarah Chen<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-semibold&quot;</span>&gt;</span>Table of Contents<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-1&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#intro&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-blue-600 hover:underline&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#trends&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-blue-600 hover:underline&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#future&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-blue-600 hover:underline&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-yellow-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;intro&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-semibold&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-white p-3&quot;</span>&gt;</span>
        Web development continues to evolve at breakneck speed. From the early days of static HTML
        to today&#x27;s dynamic, interactive experiences, we&#x27;ve come a long way.
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;trends&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-semibold&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-white p-3&quot;</span>&gt;</span>
        Modern web development embraces component-based architectures, improved developer
        experience, and performance optimization as core principles.
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;future&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 font-semibold&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>
        The future promises even more exciting developments in areas like serverless computing, edge
        computing, and AI-powered development tools.
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لدينا مقال مدوّنة فيه ترويسة وتنقّل جانبي ومحتوى رئيسي، لكنها جميعًا مكدّسة رأسيًا. لنحوّلها إلى تخطيط احترافي من عمودين باستخدام القوة الدلالية لمناطق قوالب الشبكة في CSS.</p>
<h2 id="فهم-المناطق-الدلالية-في-الشبكة">فهم المناطق الدلالية في الشبكة</h2>
<p>انطلاقًا من التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-dashboard">درس لوحة المعلومات</a>، لنستخدم مناطق شبكة مسمّاة بدل التموضع الرقمي. وهذا ينشئ تخطيطات أكثر قابلية للصيانة والقراءة، حيث يصف CSS حرفيًا البنية البصرية.</p>
<p><em>فهم المناطق الدلالية في الشبكة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/3d0778b3b7f44cb689cb4c8e11fb3964223e0730de4b6b6bb94405b64ac56052.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-sm rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-6 [grid-template-areas:&#x27;header&#x27;&#x27;sidebar&#x27;&#x27;main&#x27;] @lg:grid-cols-[200px_1fr] @lg:[grid-template-areas:&#x27;header_header&#x27;&#x27;sidebar_main&#x27;]&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4 [grid-area:header]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>The Future of Web Development<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 flex gap-4 text-sm text-slate-600&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white px-2 py-1&quot;</span>&gt;</span>Published on March 15, 2025<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white px-2 py-1&quot;</span>&gt;</span>By Sarah Chen<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4 [grid-area:sidebar]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-slate-50 p-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Table of Contents<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#intro&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-blue-600 hover:text-blue-800&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#trends&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-blue-600 hover:text-blue-800&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#future&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-blue-600 hover:text-blue-800&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-yellow-200 p-4 [grid-area:main]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;prose prose-slate&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;intro&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today&#x27;s dynamic, interactive experiences, we&#x27;ve come a long way.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;trends&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;future&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إعداد مناطق قوالب الشبكة:</p>
<ul>
<li><code>@container</code>: ينشئ سياق استعلام حاوية ليتكيّف التخطيط مع حجم حاويته لا مع إطار العرض</li>
<li><code>[grid-template-areas:'header''sidebar''main']</code>: عمود واحد يبدأ بالجوال أولًا مع أسماء مناطق دلالية</li>
<li><code>@lg:[grid-template-areas:'header_header''sidebar_main']</code>: تخطيط من عمودين تمتدّ فيه الترويسة على العمودين</li>
<li><code>@lg:grid-cols-[200px_1fr]</code>: شريط جانبي ثابت بعرض 200px ومنطقة محتوى رئيسي مرنة</li>
<li><code>[grid-area:header]</code>: يُسند كل عنصر إلى منطقته المسمّاة</li>
</ul>
<p>الجمال يكمن في سلسلة مناطق القوالب — فهي خريطة بصرية حرفيّة لتخطيطك!</p>
<h2 id="لماذا-تتفوق-المناطق-المسماة-على-مد-الأعمدة">لماذا تتفوق المناطق المسمّاة على مدّ الأعمدة</h2>
<p>لنقارن النهج الدلالي الذي نستخدمه بالتموضع التقليدي للأعمدة، لنفهم لماذا تتفوّق المناطق المسمّاة.</p>
<p><strong>النهج الرقمي التقليدي:</strong></p>
<pre><code class="language-css"><span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">3</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.sidebar</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
}
<span class="hljs-selector-class">.main</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
}
</code></pre>
<p><strong>نهجنا الدلالي:</strong></p>
<pre><code class="language-css"><span class="hljs-attribute">grid-template-areas</span>:
  <span class="hljs-string">&#x27;header header&#x27;</span>
  <span class="hljs-string">&#x27;sidebar main&#x27;</span>;
</code></pre>
<p>يقدّم نهج المناطق المسمّاة عدّة مزايا:</p>
<ul>
<li><strong>وضوح بصري</strong>: يمكنك أن ترى بنية التخطيط حرفيًا في CSS</li>
<li><strong>توثيق ذاتي</strong>: أسماء المناطق مثل «header» و«sidebar» مفهومة فورًا</li>
<li><strong>صيانة أسهل</strong>: تغيير التخطيطات يعني تحديث سلسلة بصرية واحدة لا إحداثيات رقمية متعدّدة</li>
<li><strong>تصميم مستجيب أفضل</strong>: التخطيطات المختلفة عند نقاط التوقف المختلفة واضحة تمامًا</li>
</ul>
<p>هذا يجعل التخطيطات المعقّدة أكثر قابلية للصيانة بكثير، ولا سيما عند العمل ضمن فريق.</p>
<h2 id="إضافة-تنسيق-وطباعة-احترافية">إضافة تنسيق وطباعة احترافية</h2>
<p>لنُحسّن تخطيطنا بتنسيق مناسب، انطلاقًا من الأنماط التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-card">درس البطاقة</a> و<a href="https://stevekinney.com/courses/tailwind/building-a-form-input">دروس النماذج</a>.</p>
<p><em>إضافة تنسيق وطباعة احترافية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/c08d5844cd45dac2c2cf8f961f7046dd6be3b97f85c251521fc4befbcd347463.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-6 [grid-template-areas:&#x27;header&#x27;&#x27;sidebar&#x27;&#x27;main&#x27;] @lg:grid-cols-[200px_1fr] @lg:[grid-template-areas:&#x27;header_header&#x27;&#x27;sidebar_main&#x27;]&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-b border-slate-200 pb-6 [grid-area:header]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl leading-tight font-bold text-slate-900 @lg:text-3xl&quot;</span>&gt;</span>
          The Future of Web Development
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 flex flex-wrap gap-4 text-sm text-slate-600&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-1&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
                <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span>
                <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z&quot;</span>
              /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
            March 15, 2025
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-1&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
                <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span>
                <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z&quot;</span>
              /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
            Sarah Chen
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;[grid-area:sidebar]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sticky top-4 rounded-lg bg-slate-50 p-4 shadow-sm&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Table of Contents<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#intro&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Introduction&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#trends&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Current Trends&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#future&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Looking Ahead&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;[grid-area:main]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;prose prose-slate max-w-none&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;intro&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today&#x27;s dynamic, interactive experiences, we&#x27;ve come a long way.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;trends&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;future&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>التحسينات الاحترافية:</p>
<ul>
<li><code>border-b border-slate-200 pb-6</code>: فاصل خفيف أسفل الترويسة لخلق تسلسل هرمي بصري</li>
<li><code>@lg:text-3xl</code>: طباعة مستجيبة تتكبّر مع حجم الحاوية</li>
<li>أيقونات SVG بحجم <code>h-4 w-4</code>: أيقونة تقويم وأيقونة مستخدم بحجم 16px لإضافة لمسة بصرية</li>
<li><code>sticky top-4</code>: يبقى التنقّل الجانبي ظاهرًا أثناء التمرير</li>
<li><code>shadow-sm</code>: عمق خفيف للوحة التنقّل</li>
<li><code>transition-colors hover:bg-blue-50</code>: حالات تحويم ناعمة لروابط التنقّل</li>
<li><code>prose prose-slate max-w-none</code>: أدوات طباعة لقراءة مقال مريح</li>
</ul>
<p>يضمن التموضع <code>sticky</code> بقاء جدول المحتويات في متناول المستخدمين أثناء تمرّهم في المقالات الطويلة.</p>
<h2 id="تحسينات-إضافية-على-التخطيط-المستجيب-للحاوية">تحسينات إضافية على التخطيط المستجيب للحاوية</h2>
<p>لنضف سلوكًا استجابيًا أكثر تطوّرًا باستخدام استعلامات الحاوية، انطلاقًا من التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-statistics-card">درس بطاقة الإحصاءات</a>.</p>
<p><em>تحسينات إضافية على التخطيط المستجيب للحاوية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/10b264281115f7ac53239e439fd74c70570827716f01393d6daa0e864282dc96.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 [grid-template-areas:&#x27;header&#x27;&#x27;sidebar&#x27;&#x27;main&#x27;] @md:gap-6 @lg:grid-cols-[220px_1fr] @lg:[grid-template-areas:&#x27;header_header&#x27;&#x27;sidebar_main&#x27;] @xl:grid-cols-[250px_1fr]&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-b border-slate-200 pb-4 [grid-area:header] @md:pb-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl leading-tight font-bold text-slate-900 @md:text-2xl @lg:text-3xl&quot;</span>&gt;</span>
          The Future of Web Development
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 flex flex-wrap gap-3 text-sm text-slate-600 @md:mt-3 @md:gap-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-1&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
                <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span>
                <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z&quot;</span>
              /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
            March 15, 2025
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-1&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
                <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span>
                <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span>
                <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z&quot;</span>
              /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
            Sarah Chen
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;[grid-area:sidebar] @lg:order-first&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-slate-50 p-3 shadow-sm @md:p-4 @lg:sticky @lg:top-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-base font-semibold text-slate-900 @md:text-lg&quot;</span>&gt;</span>Table of Contents<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 space-y-1 @md:mt-3 @md:space-y-2&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#intro&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Introduction&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#trends&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Current Trends&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
                <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#future&quot;</span>
                <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800&quot;</span>
                &gt;</span>Looking Ahead&lt;/a
              &gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;[grid-area:main]&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;prose prose-slate prose-headings:scroll-mt-4 max-w-none&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;intro&quot;</span>&gt;</span>Introduction<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today&#x27;s dynamic, interactive experiences, we&#x27;ve come a long way. The tools,
            frameworks, and methodologies we use today would seem like magic to developers from just
            a decade ago.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;trends&quot;</span>&gt;</span>Current Trends<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles. We&#x27;re seeing the rise of
            meta-frameworks, edge computing, and AI-assisted development tools that are reshaping
            how we build for the web.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;future&quot;</span>&gt;</span>Looking Ahead<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools. As the web platform continues to
            evolve, developers will have access to increasingly powerful APIs and capabilities that
            bring native-like experiences to the browser.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الاستجابة للحاوية:</p>
<ul>
<li><code>@md:gap-6</code>: تباعد تصاعدي يكبر مع حجم الحاوية</li>
<li><code>@lg:grid-cols-[220px_1fr] @xl:grid-cols-[250px_1fr]</code>: يتكيّف عرض الشريط الجانبي مع المساحة المتاحة</li>
<li><code>@lg:sticky @lg:top-4</code>: لا يُفعَّل التموضع اللاصق إلا في الحاويات الأكبر</li>
<li><code>@md:text-2xl @lg:text-3xl</code>: تتكبّر الطباعة عبر نقاط توقف الحاوية</li>
<li><code>prose-headings:scroll-mt-4</code>: يراعي التنقّل اللاصق عند التمرير إلى المراسي</li>
</ul>
<p>الفكرة المحورية هي أن استعلامات الحاوية تجعل التخطيط معياريًا حقًا — فهو يتكيّف مع حجم حاويته أينما وُضع في تطبيقك.</p>
<h2 id="فهم-الفرق-بين-الحاوية-واستعلامات-الوسائط">فهم الفرق بين الحاوية واستعلامات الوسائط</h2>
<p>يبيّن هذا التخطيط الفرق الجوهري بين استعلامات الحاوية (<code>@md:</code> و<code>@lg:</code>) واستعلامات الوسائط (<code>md:</code> و<code>lg:</code>):</p>
<p><strong>استعلامات الوسائط</strong> تستجيب لحجم إطار العرض:</p>
<ul>
<li>«عندما يبلغ عرض نافذة المتصفح 768px، افعل هذا»</li>
<li>نقاط توقف عامة تؤثر في الصفحة كلها</li>
</ul>
<p><strong>استعلامات الحاوية</strong> تستجيب لحجم الحاوية:</p>
<ul>
<li>«عندما يبلغ عرض حاوية هذا المكوّن 512px، افعل هذا»</li>
<li>نقاط توقف محلية تجعل المكوّنات معيارية حقًا</li>
</ul>
<p>سيعمل تخطيط المدوّنة هذا بشكل مثالي سواء كان:</p>
<ul>
<li>بعرض كامل في صفحة على سطح المكتب</li>
<li>داخل أداة في شريط جانبي ضيّق</li>
<li>جزءًا من لوحة معلومات</li>
<li>مضمّنًا في معاينة مقال</li>
</ul>
<p>ذكاء التخطيط محصور داخل المكوّن نفسه، ما يجعله قابلًا لإعادة الاستخدام بلا حدود.</p>
<h2 id="التحديات">التحديات</h2>
<p>جرّب بناء هذه الصيغ:</p>
<ol>
<li><strong>تخطيط من ثلاثة أعمدة</strong>: وسّعه ليضمّ منطقة «aside» للمقالات ذات الصلة باستخدام مناطق قوالب مثل <code>&quot;header header header&quot; &quot;sidebar main aside&quot;</code> مع انهيار مستجيب</li>
<li><strong>جدول محتويات ديناميكي</strong>: استخدم التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-details-disclosure">درس التفاصيل القابلة للطي</a> تجعل جدول المحتويات قابلًا للطي على الجوال مع بقائه ظاهرًا دائمًا في الحاويات الأكبر</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
