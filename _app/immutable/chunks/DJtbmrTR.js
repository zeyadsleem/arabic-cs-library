const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-dashboard",t="بناء لوحة معلومات",p=[{depth:2,id:"فهم-مناطق-قوالب-الشبكة",text:"فهم مناطق قوالب الشبكة"},{depth:2,id:"التحويل-إلى-أدوات-tailwind",text:"التحويل إلى أدوات Tailwind"},{depth:2,id:"إضافة-الاستجابة-عبر-استعلامات-الحاوية",text:"إضافة الاستجابة عبر استعلامات الحاوية"},{depth:2,id:"فهم-الميزة-الدلالية",text:"فهم الميزة الدلالية"},{depth:2,id:"إضافة-مناطق-المحتوى-الديناميكي",text:"إضافة مناطق المحتوى الديناميكي"},{depth:2,id:"لماذا-هذا-النهج-ثوري",text:"لماذا هذا النهج ثوريّ"},{depth:2,id:"التطبيقات-في-العالم-الحقيقي",text:"التطبيقات في العالم الحقيقي"},{depth:2,id:"التحديات",text:"التحديات"}],c=`<p>لنبدأ ببنية HTML الأساسية الخاصة بلوحة تحليلات بسيطة.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/9e6301a79256ecbddf274bd3c977a5d19a40d794ac5b08b03158c14b1d42d965.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-bold&quot;</span>&gt;</span>Analytics Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 flex gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white px-2 py-1 text-sm&quot;</span>&gt;</span>Welcome back, Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-600 px-3 py-1 text-sm text-white&quot;</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded bg-white px-3 py-2 text-blue-600&quot;</span>&gt;</span>Overview<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded bg-white px-3 py-2 text-blue-600&quot;</span>&gt;</span>Analytics<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded bg-white px-3 py-2 text-blue-600&quot;</span>&gt;</span>Reports<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded bg-white px-3 py-2 text-blue-600&quot;</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-yellow-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 font-semibold&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>1,234 Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>$45,678 Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-3&quot;</span>&gt;</span>12.5% Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-purple-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 font-semibold&quot;</span>&gt;</span>Quick Stats<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-2 text-sm&quot;</span>&gt;</span>Sessions: 8,432<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-2 text-sm&quot;</span>&gt;</span>Bounce Rate: 24%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-white p-2 text-sm&quot;</span>&gt;</span>Avg. Duration: 3:42<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لدينا لوحة معلومات فيها ترويسة وتنقّل جانبي ومحتوى رئيسي ولوحة إحصاءات، لكنها جميعًا مكدّسة رأسيًا. لنحوّلها إلى تخطيط متطوّر باستخدام مناطق قوالب الشبكة (Grid Template Areas) في CSS — وهو نهج أكثر دلالية من التموضع التقليدي بأعمدة الشبكة وصفوفها.</p>
<h2 id="فهم-مناطق-قوالب-الشبكة">فهم مناطق قوالب الشبكة</h2>
<p>بخلاف التموضع الرقمي للشبكة الذي استخدمناه في دروس سابقة مثل <a href="https://stevekinney.com/courses/tailwind/building-an-invoice-table">جدول الفاتورة</a>، تتيح لنا مناطق قوالب الشبكة تعريف مناطق مسمّاة في تخطيطنا. فكّر في الأمر كأنك ترسم خريطة بصرية لتخطيطك بأسماء ذات معنى بدل الأرقام.</p>
<p>لنضع الهيكل الأساسي لشبكتنا مع مناطق مسمّاة:</p>
<p><em>فهم مناطق قوالب الشبكة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/a94b99dbc1b9c3c7b46a29daf2d1f46d17c02eeeeb8aa02f0e72f1de0829cd7c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-screen grid-cols-[250px_1fr_200px] grid-rows-[auto_1fr] gap-4 p-4&quot;</span>
  <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;grid-template-areas: &#x27;header header header&#x27; &#x27;sidebar main stats&#x27;&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;grid-area: header&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>Analytics Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>Welcome back, Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white&quot;</span>&gt;</span>
          Settings
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;grid-area: sidebar&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700&quot;</span>
        &gt;</span>Overview&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50&quot;</span>
        &gt;</span>Analytics&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50&quot;</span>
        &gt;</span>Reports&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50&quot;</span>
        &gt;</span>Settings&lt;/a
      &gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-sm&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;grid-area: main&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 text-xl font-semibold text-slate-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;grid-area: stats&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Quick Stats<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Sessions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>8,432<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Bounce Rate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>24%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Avg. Duration<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>3:42<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إعداد مناطق قوالب الشبكة:</p>
<ul>
<li><code>grid-template-areas: 'header header header' 'sidebar main stats'</code>: يعرّف خريطة بصرية تمتدّ فيها الترويسة عبر الصف العلوي، بثلاثة أعمدة في الصف السفلي</li>
<li><code>grid-area: header</code>: يضع كل مكوّن في منطقته المسمّاة</li>
<li><code>grid-cols-[250px_1fr_200px]</code>: يضبط أحجام أعمدة محدّدة (شريط جانبي ثابت، محتوى رئيسي مرن، إحصاءات ثابتة)</li>
<li><code>grid-rows-[auto_1fr]</code>: يجعل حجم الترويسة محسوبًا من المحتوى، ويأخذ الصف الرئيسي المساحة المتبقّية</li>
</ul>
<p>السحر يكمن في سلسلة <code>grid-template-areas</code> — فهي تمثيل بصري حرفي لتخطيطك! فكل كلمة تمثّل منطقة مسمّاة، والكلمات المتطابقة تنشئ مناطق ممتدّة.</p>
<h2 id="التحويل-إلى-أدوات-tailwind">التحويل إلى أدوات Tailwind</h2>
<p>الآن لنستبدل الأنماط المضمّنة بأدوات قوالب الشبكة في Tailwind، انطلاقًا من الأنماط التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-statistics-card">درس بطاقة الإحصاءات</a>:</p>
<p><em>التحويل إلى أدوات Tailwind — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/295f4acd04f31aae25bbb813ca78d37a500bce4fc6f83a2bfc72df4a74d39074.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-screen grid-cols-[250px_1fr_200px] grid-rows-[auto_1fr] gap-4 p-4 [grid-template-areas:&#x27;header_header_header&#x27;&#x27;sidebar_main_stats&#x27;]&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:header]&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>Analytics Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>Welcome back, Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500&quot;</span>
        &gt;</span>
          Settings
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:sidebar]&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700&quot;</span>
        &gt;</span>Overview&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
        &gt;</span>Analytics&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
        &gt;</span>Reports&lt;/a
      &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
        <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
        &gt;</span>Settings&lt;/a
      &gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-sm [grid-area:main]&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 text-xl font-semibold text-slate-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:stats]&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Quick Stats<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Sessions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>8,432<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Bounce Rate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>24%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Avg. Duration<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>3:42<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>صيغة القيم العشوائية في Tailwind:</p>
<ul>
<li><code>[grid-template-areas:'header_header_header''sidebar_main_stats']</code>: يستخدم ترميز الأقواس المربّعة لخصائص CSS المخصّصة</li>
<li><code>[grid-area:header]</code>: يُسند كل عنصر إلى منطقته في الشبكة</li>
<li>أُضيف <code>hover:bg-blue-500</code> و<code>transition-colors</code> لتوفير تغذية راجعة تفاعلية</li>
</ul>
<p>صيغة الأقواس <code>[property:value]</code> تتيح لنا استخدام أي خاصية CSS مع Tailwind، وهي مثالية للميزات الأحدث مثل مناطق قوالب الشبكة.</p>
<h2 id="إضافة-الاستجابة-عبر-استعلامات-الحاوية">إضافة الاستجابة عبر استعلامات الحاوية</h2>
<p>الآن لنجعل لوحتنا مستجيبة بحق باستخدام استعلامات الحاوية، انطلاقًا من التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-statistics-card">درس بطاقة الإحصاءات</a>:</p>
<p><em>إضافة الاستجابة عبر استعلامات الحاوية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/d85de9e612583502b627aa9f9c92a6866d262dcaf7c5565008193aff775bc3c0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-screen gap-4 p-4 @sm:grid-cols-1 @sm:grid-rows-[auto_auto_1fr_auto] @sm:[grid-template-areas:&#x27;header&#x27;&#x27;sidebar&#x27;&#x27;main&#x27;&#x27;stats&#x27;] @xl:grid-cols-[250px_1fr_200px] @xl:grid-rows-[auto_1fr] @xl:[grid-template-areas:&#x27;header_header_header&#x27;&#x27;sidebar_main_stats&#x27;]&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:header]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>Analytics Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden text-slate-600 @md:block&quot;</span>&gt;</span>Welcome back, Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500&quot;</span>
          &gt;</span>
            Settings
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:sidebar]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:flex @sm:gap-2 @xl:block @xl:space-y-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700&quot;</span>
          &gt;</span>Overview&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
          &gt;</span>Analytics&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
          &gt;</span>Reports&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50&quot;</span>
          &gt;</span>Settings&lt;/a
        &gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-6 shadow-sm [grid-area:main]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 text-xl font-semibold text-slate-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 @sm:grid-cols-1 @lg:grid-cols-3&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:stats]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Quick Stats<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:flex @sm:gap-4 @xl:block @xl:space-y-3&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Sessions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>8,432<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Bounce Rate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>24%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Avg. Duration<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>3:42<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>سحر التخطيط المستجيب:</p>
<ul>
<li>نقطة توقف <code>@sm:</code> تكدّس كل شيء رأسيًا مع شبكة من عمود واحد وتنقّل أفقي</li>
<li>نقطة توقف <code>@xl:</code> تعود إلى تخطيط الأعمدة الثلاثة مع التنقّل الجانبي</li>
<li>يتكيّف التنقّل من flex أفقي على الجوال إلى block رأسي على سطح المكتب</li>
<li>تتكيّف لوحة الإحصاءات من تخطيط أفقي إلى تخطيط رأسي</li>
<li>تتكيّف بطاقات المحتوى الرئيسي من مكدّسة إلى شبكة من ثلاثة أعمدة</li>
</ul>
<p>يبيّن هذا القوة الحقيقية للمناطق المسمّاة في الشبكة — يمكنك إعادة تشكيل تخطيطك بالكامل بمجرد تغيير سلسلة <code>grid-template-areas</code> وأبعاد الشبكة!</p>
<h2 id="فهم-الميزة-الدلالية">فهم الميزة الدلالية</h2>
<p>وهنا سببُ تقدّم مناطق قوالب الشبكة على التموضع الرقمي التقليدي للشبكة:</p>
<p><strong>النهج التقليدي:</strong></p>
<pre><code class="language-css"><span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span> / <span class="hljs-number">4</span>;
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
<span class="hljs-selector-class">.stats</span> {
  <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">3</span>;
  <span class="hljs-attribute">grid-row</span>: <span class="hljs-number">2</span>;
}
</code></pre>
<p><strong>نهج مناطق القوالب:</strong></p>
<pre><code class="language-css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">grid-template-areas</span>:
    <span class="hljs-string">&#x27;header header header&#x27;</span>
    <span class="hljs-string">&#x27;sidebar main stats&#x27;</span>;
}
<span class="hljs-selector-class">.header</span> {
  <span class="hljs-attribute">grid-area</span>: header;
}
</code></pre>
<p>نهج مناطق القوالب هو:</p>
<ul>
<li><strong>بصري</strong>: يمكنك أن ترى تخطيطك حرفيًا في CSS</li>
<li><strong>دلالي</strong>: المناطق المسمّاة توثّق نفسها بنفسها</li>
<li><strong>قابل للصيانة</strong>: تغيير التخطيطات يتطلب تحديث سلسلة واحدة لا إحداثيات رقمية متعدّدة</li>
<li><strong>مستجيب</strong>: التخطيطات المختلفة عند نقاط التوقف المختلفة واضحة تمامًا</li>
</ul>
<h2 id="إضافة-مناطق-المحتوى-الديناميكي">إضافة مناطق المحتوى الديناميكي</h2>
<p>لنُحسّن لوحتنا لتتعامل مع المحتوى الديناميكي باستخدام التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-card-list">درس قائمة البطاقات</a>:</p>
<p><em>إضافة مناطق المحتوى الديناميكي — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/de3425cd512dca6a5ff9968edbc7e501d52cb7365577f521c7a300157f1bdf3a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid h-screen gap-4 p-4 @sm:grid-cols-1 @sm:grid-rows-[auto_auto_1fr_auto] @sm:[grid-template-areas:&#x27;header&#x27;&#x27;sidebar&#x27;&#x27;main&#x27;&#x27;stats&#x27;] @xl:grid-cols-[250px_1fr_200px] @xl:grid-rows-[auto_1fr] @xl:[grid-template-areas:&#x27;header_header_header&#x27;&#x27;sidebar_main_stats&#x27;]&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:header]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold text-slate-900&quot;</span>&gt;</span>Analytics Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden text-slate-600 @md:block&quot;</span>&gt;</span>Welcome back, Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500&quot;</span>
          &gt;</span>
            Settings
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white shadow-sm [grid-area:sidebar]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:flex @sm:gap-2 @xl:block&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors not-first:border-t not-first:border-slate-200 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0&quot;</span>
          &gt;</span>Overview&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0&quot;</span>
          &gt;</span>Analytics&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0&quot;</span>
          &gt;</span>Reports&lt;/a
        &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
          <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0&quot;</span>
          &gt;</span>Settings&lt;/a
        &gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg bg-white p-6 shadow-sm [grid-area:main]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 text-xl font-semibold text-slate-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-6 grid gap-4 @sm:grid-cols-1 @lg:grid-cols-3&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white shadow-sm&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>1,234<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Total Users<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white shadow-sm&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>$45,678<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Revenue<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white shadow-sm&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm opacity-90&quot;</span>&gt;</span>Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg border border-slate-200&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-b border-slate-200 bg-slate-50 px-4 py-3&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-semibold text-slate-900&quot;</span>&gt;</span>Recent Transactions<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;divide-y divide-slate-200&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-4 py-3 transition-colors hover:bg-slate-50&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-900&quot;</span>&gt;</span>Payment from Acme Corp<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-semibold text-green-600&quot;</span>&gt;</span>+$2,500.00<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-xs text-slate-500&quot;</span>&gt;</span>2 hours ago<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-4 py-3 transition-colors hover:bg-slate-50&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-900&quot;</span>&gt;</span>Subscription renewal<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-semibold text-red-600&quot;</span>&gt;</span>-$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-xs text-slate-500&quot;</span>&gt;</span>1 day ago<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-4 py-3 transition-colors hover:bg-slate-50&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium text-slate-900&quot;</span>&gt;</span>Client payment<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-semibold text-green-600&quot;</span>&gt;</span>+$1,250.00<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-xs text-slate-500&quot;</span>&gt;</span>3 days ago<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-4 shadow-sm [grid-area:stats]&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Quick Stats<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm:flex @sm:gap-4 @xl:block @xl:space-y-3&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Sessions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>8,432<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Bounce Rate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>24%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-slate-900&quot;</span>&gt;</span>Avg. Duration<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>3:42<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الميزات المحسّنة:</p>
<ul>
<li><strong>تنقّل ديناميكي</strong>: يستخدم أدوات <code>not-first:</code> مع تبدّل حدود مستجيب (حدود علوية على سطح المكتب وحدود يسرى على الجوال)</li>
<li><strong>محتوى قابل للتمرير</strong>: أُضيف <code>overflow-hidden</code> ومناطق محتوى مناسبة تتعامل مع البيانات الديناميكية</li>
<li><strong>قائمة معاملات</strong>: محتوى من العالم الحقيقي مع حالات تحويم وتسلسل هرمي في الطباعة</li>
<li><strong>حدود إحصاءات مستجيبة</strong>: حدود شرطية تتكيّف مع التخطيطات الأفقية والرأسية</li>
</ul>
<h2 id="لماذا-هذا-النهج-ثوري">لماذا هذا النهج ثوريّ</h2>
<p>تنشئ مناطق قوالب الشبكة في CSS مع استعلامات الحاوية <strong>تخطيطات دلالية ومتكيّفة حقًا</strong>:</p>
<p><strong>التخطيط كشيفرة</strong>: سلسلة <code>grid-template-areas</code> هي تمثيل بصري حرفي لتخطيطك. ويستطيع المطوّرون الآخرون فهم البنية فورًا.</p>
<p><strong>دلالات استجابة</strong>: بدلًا من تغيير المواضع الرقمية للشبكة، أنت تُعيد تشكيل التخطيط الدلالي نفسه. «الترويسة تمتدّ بكامل العرض» مقابل «الترويسة في الأعمدة 1-3، الصف 1».</p>
<p><strong>تعقيد قابل للصيانة</strong>: تصبح لوحات المعلومات المعقّدة قابلة للإدارة لأن كل منطقة لها اسم ذو معنى وحدود واضحة.</p>
<p><strong>تعدّدية المكوّنات</strong>: يمكن لكل منطقة في الشبكة أن تضمّ أي مكوّن — فالنظام لا يهتم بالتعقيد الداخلي.</p>
<p><strong>التكيّف مع الحاوية</strong>: تعمل لوحة المعلومات بالدرجة نفسها في تطبيق بملء الشاشة أو أداة مضمّنة أو شريط جانبي ضيّق، لأنها تستجيب لحاويتها لا لإطار العرض.</p>
<h2 id="التطبيقات-في-العالم-الحقيقي">التطبيقات في العالم الحقيقي</h2>
<p>يحل هذا النمط تحدّيات التخطيط في:</p>
<ul>
<li><strong>لوحات معلومات الإدارة</strong>: التحليلات، إدارة المستخدمين، أنظمة إدارة المحتوى</li>
<li><strong>مواقع التوثيق</strong>: ترويسة، تنقّل جانبي، محتوى رئيسي، جدول محتويات</li>
<li><strong>التجارة الإلكترونية</strong>: شبكات المنتجات مع المرشّحات، وسلة التسوّق، وتفاصيل المنتج</li>
<li><strong>المواقع الإخبارية</strong>: محتوى المقالات مع مقالات ذات صلة، ومعلومات المؤلف، والإعلانات</li>
<li><strong>تطبيقات SaaS</strong>: لوحات الأدوات، مساحة العمل الرئيسية، فاحصو الخصائص</li>
</ul>
<p>الطبيعة الدلالية تجعل هذه التخطيطات توثّق نفسها وسهلة الصيانة على الفرق.</p>
<h2 id="التحديات">التحديات</h2>
<p>جرّب بناء هذه الصيغ:</p>
<ol>
<li><strong>تخطيط مقال مدوّنة</strong>: أنشئ تخطيطًا من ثلاث مناطق مع ترويسة ومحتوى المقال الرئيسي وشريط جانبي لجدول المحتويات باستخدام مناطق قوالب مثل <code>&quot;header header&quot; &quot;article toc&quot;</code></li>
<li><strong>لوحة معلومات ديناميكية</strong>: وسّع لوحة المعلومات هذه للتعامل مع منطقة «notifications» يمكن تشغيلها وإيقافها بتغيير مناطق قوالب الشبكة بين حالتي <code>&quot;header header header&quot;</code> و<code>&quot;header header notifications&quot;</code></li>
</ol>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
