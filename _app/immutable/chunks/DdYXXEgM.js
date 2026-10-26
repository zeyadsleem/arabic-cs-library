const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-modal",t="بناء نافذة منبثقة",p=[{depth:2,id:"تنسيق-زر-التشغيل",text:"تنسيق زر التشغيل"},{depth:2,id:"إنشاء-خلفية-النافذة-المنبثقة",text:"إنشاء خلفية النافذة المنبثقة"},{depth:2,id:"تموضع-النافذة-المنبثقة-وتحجيمها",text:"تموضع النافذة المنبثقة وتحجيمها"},{depth:2,id:"هيكلة-محتوى-النافذة-المنبثقة",text:"هيكلة محتوى النافذة المنبثقة"},{depth:2,id:"تحسين-زر-الإغلاق",text:"تحسين زر الإغلاق"},{depth:2,id:"إضافة-تنويعات-الأزرار-والتخطيط",text:"إضافة تنويعات الأزرار والتخطيط"},{depth:2,id:"إضافة-حركات-دخول-سلسة",text:"إضافة حركات دخول سلسة"},{depth:2,id:"إضافة-السلوك-المتجاوب-والتلميع-النهائي",text:"إضافة السلوك المتجاوب والتلميع النهائي"},{depth:2,id:"لماذا-ينجح-هذا-الأسلوب",text:"لماذا ينجح هذا الأسلوب"},{depth:2,id:"حالات-الاستخدام-الشائعة",text:"حالات الاستخدام الشائعة"}],e=`<p>لنبدأ ببنية HTML الأساسية لدينا لمكوّن نافذة منبثقة (modal dialog).</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Open Modal<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إنه عنصر <code>&lt;dialog&gt;</code> دلالي ببنية محتوى سليمة، لكنه بلا أي تنسيق على الإطلاق، ويختلف مظهر الحوار الأصلي اختلافًا كبيرًا بين المتصفحات. لنحوّله إلى نافذة منبثقة مصقولة تشبه الحديثة والاحترافية.</p>
<h2 id="تنسيق-زر-التشغيل">تنسيق زر التشغيل</h2>
<p>أولًا، لننسّق زر التشغيل لدينا مستخدمين الأنماط التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-button">درس الزر</a>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق الزر:</p>
<ul>
<li><code>bg-blue-600 hover:bg-blue-500</code>: لون أساسي أزرق مع حالة تمرير أفتح</li>
<li><code>px-4 py-2</code>: حشوة أفقية 16px ورأسية 8px توفّر أهداف لمس مريحة</li>
<li><code>text-sm font-semibold</code>: نص بوزن نصف عريض بحجم 14px من أجل الوضوح</li>
<li><code>shadow-sm</code>: عمق خفيف يجعل الزر يبدو قابلًا للنقر</li>
<li><code>focus-visible:outline-*</code>: حلقة تركيز متاحة للتنقل بلوحة المفاتيح</li>
</ul>
<p>هذا يمنحنا زر تشغيل احترافيًا يوضّح بجلاء أنه سيفتح شيئًا مهمًا.</p>
<h2 id="إنشاء-خلفية-النافذة-المنبثقة">إنشاء خلفية النافذة المنبثقة</h2>
<p>الآن لننسّق عنصر الحوار نفسه. يوفّر عنصر <code>&lt;dialog&gt;</code> الأساس الدلالي، لكننا بحاجة إلى تجاوز تنسيقه الافتراضي للحصول على مظهر حديث.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;backdrop:bg-black/50 backdrop:backdrop-blur-sm&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق الخلفية:</p>
<ul>
<li><code>backdrop:bg-black/50</code>: خلفية سوداء شبه شفافة (شفافية 50%) تعتّم المحتوى الموجود خلفها</li>
<li><code>backdrop:backdrop-blur-sm</code>: تأثير تمويه خفيف يخلق عمقًا ويبرز محتوى النافذة المنبثقة</li>
</ul>
<p>تنسّق أدوات العنصر الزائف <code>backdrop:</code> خلفية الحوار الأصلية في المتصفح، فتُنشئ تأثير تراكب احترافيًا دون الحاجة إلى عناصر HTML إضافية.</p>
<h2 id="تموضع-النافذة-المنبثقة-وتحجيمها">تموضع النافذة المنبثقة وتحجيمها</h2>
<p>لنتموضع النافذة المنبثقة بشكل صحيح ونُنشئ بنية الحاوية الرئيسية باستخدام التقنيات التي تعلّمناها في <a href="https://stevekinney.com/courses/tailwind/building-a-card">درس البطاقة</a>.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق حاوية النافذة المنبثقة:</p>
<ul>
<li><code>m-auto</code>: يوسّط النافذة المنبثقة أفقيًا ورأسيًا باستخدام الهوامش التلقائية</li>
<li><code>w-full max-w-md</code>: عرض كامل حتى حد أقصى قدره 448px من أجل قابلية قراءة مثلى</li>
<li><code>h-fit</code>: يتكيّف الارتفاع مع المحتوى بدلًا من ملء إطار العرض</li>
<li><code>rounded-lg bg-white</code>: نصف قطر حد 8px وخلفية بيضاء لمظهر بطاقة حديث</li>
<li><code>shadow-lg</code>: ظل واضح يخلق فصلًا محسوسًا عن الخلفية</li>
<li><code>p-0</code>: إزالة حشوة الحوار الافتراضية حتى نتحكّم في التباعد من الداخل</li>
</ul>
<p>تضمن أداة <code>m-auto</code> توسيطًا متسقًا عبر جميع المتصفحات عبر ضبط <code>margin: auto</code> على جميع الجهات، متجاوزة أي خصوصيات خاصة بموضع الحوار في المتصفح.</p>
<h2 id="هيكلة-محتوى-النافذة-المنبثقة">هيكلة محتوى النافذة المنبثقة</h2>
<p>الآن لنُهيكل منطقة الترويسة والمحتوى الرئيسي والتذييل بشكل صحيح مع تباعد وتسلسل بصري ملائمين.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between border-b border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600&quot;</span>&gt;</span>
          ×
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-700&quot;</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-500&quot;</span>
        &gt;</span>
          Close
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات بنية المحتوى:</p>
<ul>
<li><code>flex flex-col</code>: تخطيط flexbox عمودي لأقسام الترويسة والمحتوى الرئيسي والتذييل</li>
<li><code>border-b border-slate-200</code>: فاصل خافت أسفل الترويسة لتنظيم بصري</li>
<li><code>px-6 py-4</code>: حشوة أفقية 24px ورأسية 16px متسقة عبر الأقسام</li>
<li><code>flex items-center justify-between</code>: يوزّع العنوان وزر الإغلاق على عرض الترويسة</li>
<li><code>text-lg font-semibold</code>: عنوان بارز يؤسّس تسلسل المحتوى</li>
<li><code>text-slate-700</code>: لون نص المتن خافت قليلًا من أجل قراءة مريحة</li>
<li>زر إغلاق مع حالات تمرير لتغذية راجعة تفاعلية واضحة</li>
</ul>
<p>تخلق الحشوة والحدود المتسقة مناطق محتوى واضحة مع الحفاظ على التماسك البصري.</p>
<h2 id="تحسين-زر-الإغلاق">تحسين زر الإغلاق</h2>
<p>لنحسّن زر الإغلاق في الترويسة لنجعله أكثر إتاحة وملاذًا بصريًا، انطلاقًا من فهمنا لحالات التركيز.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between border-b border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Modal Title<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl leading-none&quot;</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-700&quot;</span>&gt;</span>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
        &gt;</span>
          Close
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات زر الإغلاق:</p>
<ul>
<li><code>flex h-8 w-8 items-center justify-center</code>: زر مربع بمقاس 32px ومحتوى موسَّط</li>
<li><code>text-xl leading-none</code>: رمز × أكبر مع ارتفاع سطر ضيق لتوازن بصري أفضل</li>
<li><code>transition-colors</code>: تغيّرات لونية سلسة عند التمرير والتركيز</li>
<li><code>focus-visible:outline-slate-500</code>: حلقة تركيز متاحة تتوافق مع الطابع الخافت للزر</li>
<li>أنماط تمرير وتركيز متسقة مع زر الإغلاق في التذييل</li>
</ul>
<p>الصيغة المربعة مع الحشوة السخية تخلق هدف لمس مريحًا، بينما تحافظ الألوان الخافتة على حضوره دون لفت الانتباه.</p>
<h2 id="إضافة-تنويعات-الأزرار-والتخطيط">إضافة تنويعات الأزرار والتخطيط</h2>
<p>لنُعزِّز التذييل بعدة خيارات للأزرار وتباعد صحيح.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between border-b border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Confirm Action<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl leading-none&quot;</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-700&quot;</span>&gt;</span>
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex justify-end gap-3 border-t border-slate-200 px-6 py-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          Cancel
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600&quot;</span>
        &gt;</span>
          Delete
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات التذييل:</p>
<ul>
<li><code>flex justify-end gap-3</code>: أزرار محاذاة إلى اليمين مع تباعد 12px بينها</li>
<li>زر إلغاء ثانوي بـ <code>border border-slate-300 bg-white</code>: حد خافت وخلفية بيضاء لوزن بصري أقل</li>
<li>زر حذف أساسي بـ <code>bg-red-600</code>: اللون الأحمر يشير إلى إجراء مدمّر</li>
<li>حالات تركيز و<code>transition-colors</code> متسقة عبر جميع العناصر التفاعلية</li>
<li>محتوى أكثر واقعية يوضّح حالة استخدام نافذة التأكيد</li>
</ul>
<p>توضّح تسلسل الأزرار بجلاء الإجراء الأساسي والثانوي مع الحفاظ على الأنماط البصرية المستقرة.</p>
<h2 id="إضافة-حركات-دخول-سلسة">إضافة حركات دخول سلسة</h2>
<p>الآن لنضف حركات متقنة باستخدام متغيّر Tailwind <code>starting:</code> لتحديد حالات البداية الأولية للرسوم المتحركة وخلق تأثيرات دخول سلسة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;animate-in fade-in zoom-in backdrop:animate-in backdrop:fade-in m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-xl duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:duration-300 starting:scale-95 starting:opacity-0 backdrop:starting:opacity-0&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col overflow-hidden&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Confirm Action<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl leading-none&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sr-only&quot;</span>&gt;</span>Close modal<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-4 py-4 sm:px-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;leading-relaxed text-slate-700&quot;</span>&gt;</span>
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6&quot;</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          Cancel
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600&quot;</span>
        &gt;</span>
          Delete
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الحركة:</p>
<ul>
<li><code>starting:opacity-0 starting:scale-95</code>: يحدد الحالة الأولية — غير مرئي وأصغر قليلًا (قياس 95%)</li>
<li><code>animate-in fade-in zoom-in duration-200</code>: يحرّك نحو الشفافية الكاملة والقياس الكامل خلال 200ms</li>
<li><code>backdrop:starting:opacity-0</code>: يضبط الحالة الأولية للخلفية على الشفافية</li>
<li><code>backdrop:animate-in backdrop:fade-in backdrop:duration-300</code>: تلاشي الخلفية خلال 300ms لتأثير حركة متدرّج الطبقات</li>
<li><code>shadow-xl</code>: ظل محسّن لعمق أكثر دراماتيكية</li>
<li><code>overflow-hidden</code>: يضمن احترام المحتوى لزوايا النافذة المنبثقة المستديرة</li>
</ul>
<p>متغيّر <code>starting:</code> جوهري هنا — فهو يضبط الحالة الأولية قبل أن تبدأ الحركة، فتُنشأ تأثيرات دخول سلسة. تبدأ النافذة المنبثقة غير مرئية ومصغّرة قليلًا، ثم تتحرك نحو حالتها النهائية عند الفتح.</p>
<h2 id="إضافة-السلوك-المتجاوب-والتلميع-النهائي">إضافة السلوك المتجاوب والتلميع النهائي</h2>
<p>أخيرًا، لنضف السلوك المتجاوب لمزيد من التلميع حتى تبدو النافذة المنبثقة احترافية على جميع الأجهزة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
  &gt;</span>
    Open Modal
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;animate-in fade-in zoom-in backdrop:animate-in backdrop:fade-in m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-xl duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:duration-300 starting:scale-95 starting:opacity-0 backdrop:starting:opacity-0&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col overflow-hidden&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Confirm Action<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl leading-none&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sr-only&quot;</span>&gt;</span>Close modal<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;px-4 py-4 sm:px-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;leading-relaxed text-slate-700&quot;</span>&gt;</span>
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6&quot;</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500&quot;</span>
        &gt;</span>
          Cancel
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600&quot;</span>
        &gt;</span>
          Delete
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ميزات الاستجابة وإمكانية الوصول:</p>
<ul>
<li><code>px-4 sm:px-6</code>: حشوة متجاوبة أكثر إحكامًا على الجوال (16px) وأوسع على الشاشات الأكبر (24px)</li>
<li><code>flex-col-reverse sm:flex-row sm:justify-end</code>: أزرار مكدّسة على الجوال مع الإجراء الأساسي في الأعلى، وتخطيط أفقي على الشاشات الأكبر</li>
<li><code>sr-only</code>: نص لقارئات الشاشة لأيقونة زر الإغلاق</li>
<li><code>aria-hidden=&quot;true&quot;</code>: يخفي رمز × عن قارئات الشاشة لأننا نقدّم نصًا وصفيًا</li>
<li><code>leading-relaxed</code>: ارتفاع سطر أكثر راحة للنص الوصفي الأطول</li>
</ul>
<p>يضمن تخطيط التذييل المتجاوب أن الإجراء الأساسي (حذف) يبقى متاحًا بسهولة دائمًا — في الأعلى للتفاعل المريح بالإبهام على الجوال، وعلى اليمين لأنماط الفأرة على سطح المكتب.</p>
<h2 id="لماذا-ينجح-هذا-الأسلوب">لماذا ينجح هذا الأسلوب</h2>
<p>يجمع تنفيذ النافذة المنبثقة هذا بين ميزات CSS الحديثة وHTML الدلالي للحصول على أفضل تجربة للمستخدم:</p>
<p><strong>توسيط مثالي</strong>: تضمن أداة <code>m-auto</code> توسيطًا متسقًا عبر جميع المتصفحات، متجاوزة أي خصوصيات خاصة بالمتصفح في الموضع الافتراضي لعنصر <code>&lt;dialog&gt;</code>.</p>
<p><strong>حركات سلسة</strong>: يحدد متغيّر <code>starting:</code> حالات البداية الأولية للحركة بوضوح، فتُنشأ تأثيرات دخول احترافية تبدو مصقولة ومقصودة.</p>
<p><strong>أساس دلالي</strong>: يوفّر عنصر <code>&lt;dialog&gt;</code> معالجة لوحة مفاتيح مدمجة (Escape للإغلاق)، وإدارة للتركيز، ودعمًا لقارئات الشاشة دون أي JavaScript إضافي.</p>
<p><strong>توقيت حركة متدرّج الطبقات</strong>: تتحرك محتويات النافذة المنبثقة أسرع (200ms) من الخلفية (300ms)، فيُخلق تأثير متدرّج الطبقات يبدأ بفتّح الخلفية ثم ظهور المحتوى.</p>
<p><strong>تصميم متجاوب</strong>: تتكيّف النافذة المنبثقة من أزرار مكدّسة تبدأ من الجوال إلى تخطيطات أفقية محسّنة لسطح المكتب من دون أن تفقد سهولة الاستخدام.</p>
<h2 id="حالات-الاستخدام-الشائعة">حالات الاستخدام الشائعة</h2>
<p>يعمل نمط النافذة المنبثقة هذا بشكل ممتاز مع:</p>
<ul>
<li>نوافذ التأكيد للإجراءات المدمّرة</li>
<li>النماذج التي تحتاج إلى تركيز الانتباه (تسجيل الدخول، نماذج الاتصال)</li>
<li>معاينات الصور أو المحتوى</li>
<li>لوحات الإعدادات التي تحتاج إلى عزل عن المحتوى الرئيسي</li>
<li>رسائل التنبيه التي تتطلب تأكيد المستخدم</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
