const s="kinney",a="tailwind",n="Tailwind CSS",l="theme-customization",p="تخصيص السمة (Theme)",c=[{depth:2,id:"فهم-متغيرات-السمة",text:"فهم متغيّرات السمة"},{depth:3,id:"التوجيه-theme",text:"التوجيه @theme"},{depth:3,id:"لماذا-theme-بدلا-من-root",text:"لماذا @theme بدلًا من :root؟"},{depth:2,id:"فضاءات-أسماء-متغيرات-السمة",text:"فضاءات أسماء متغيّرات السمة"},{depth:3,id:"الفضاءات-الأساسية",text:"الفضاءات الأساسية"},{depth:2,id:"بناء-نظام-تصميم-كامل",text:"بناء نظام تصميم كامل"},{depth:3,id:"الخطوة-1-عرف-الأساس",text:"الخطوة 1: عرّف الأساس"},{depth:3,id:"الخطوة-2-ابن-المكونات-الأساسية",text:"الخطوة 2: ابنِ المكوّنات الأساسية"},{depth:3,id:"الخطوة-3-تعامل-مع-الوضع-الداكن",text:"الخطوة 3: تعامل مع الوضع الداكن"},{depth:2,id:"تقنيات-السمة-المتقدمة",text:"تقنيات السمة المتقدّمة"},{depth:3,id:"الإشارة-إلى-متغيرات-أخرى",text:"الإشارة إلى متغيّرات أخرى"},{depth:3,id:"سمات-خاصة-بالمكونات",text:"سمات خاصّة بالمكوّنات"},{depth:3,id:"بناء-مكونات-معقدة",text:"بناء مكوّنات معقّدة"},{depth:2,id:"استخدام-متغيرات-السمة-في-css-المخصص",text:"استخدام متغيّرات السمة في CSS المخصّص"},{depth:2,id:"مشاركة-السمات-بين-المشاريع",text:"مشاركة السمات بين المشاريع"},{depth:3,id:"إنشاء-حزمة-سمة-مشتركة",text:"إنشاء حزمة سمة مشتركة"},{depth:3,id:"استخدام-السمات-المشتركة",text:"استخدام السمات المشتركة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"تحسين-متغيرات-السمة",text:"تحسين متغيّرات السمة"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],t=`<p>بخلاف الإصدارات السابقة التي كانت تعتمد على ملفات إعداد JavaScript، يستخدم Tailwind 4 متغيّرات سمة أصلية في CSS تقدّم أداءً أفضل، ومشاركة أسهل بين المشاريع، وسير عمل أكثر حدسية.</p>
<h2 id="فهم-متغيرات-السمة">فهم متغيّرات السمة</h2>
<p>متغيّرات السمة في Tailwind 4 هي متغيّرات CSS خاصّة تُعرَّف باستخدام التوجيه <code>@theme</code>. وهي ليست متغيّرات CSS عادية فحسب—بل تطلب من Tailwind توليد أصناف مساعِدة مقابلة، فتُصبح أساس نظام التصميم لديك.</p>
<h3 id="التوجيه-theme">التوجيه <code>@theme</code></h3>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-brand-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.7</span> <span class="hljs-number">0.15</span> <span class="hljs-number">200</span>);
  <span class="hljs-attr">--font-heading</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, sans-serif;
  <span class="hljs-attr">--spacing-gutter</span>: <span class="hljs-number">2rem</span>;
}
</code></pre>
<p>وحين تُعرّف هذه المتغيّرات، يقوم Tailwind تلقائيًا بـ:</p>
<ul>
<li>إنشاء أصناف مساعِدة مثل <code>bg-brand-500</code> و<code>text-brand-500</code> و<code>font-heading</code> إلخ.</li>
<li>توليد متغيّرات CSS عادية يمكنك استخدامها في CSS المخصّص</li>
<li>الحفاظ على أولوية التحديد (specificity) والوراثة على نحو صحيح</li>
</ul>
<h3 id="لماذا-theme-بدلا-من-root">لماذا <code>@theme</code> بدلًا من <code>:root</code>؟</h3>
<p>قد تتساءل لماذا يستخدم Tailwind توجيهًا خاصًّا هو <code>@theme</code> بدلًا من متغيّرات CSS العادية. والفروق الجوهرية هي:</p>
<ul>
<li><strong>توليد الأصناف المساعِدة</strong>: متغيّرات السمة تُنشئ أصنافًا مساعِدة تلقائيًا</li>
<li><strong>المعالجة وقت البناء</strong>: يمكن لـTailwind أن يحسّن متغيّرات السمة ويتحقّق منها أثناء التصريف</li>
<li><strong>القصد الصريح</strong>: يوضّح استخدام <code>@theme</code> أي المتغيّرات جزء من نظام التصميم لديك</li>
<li><strong>التحقّق</strong>: يمكن لـTailwind أن يفرض ألّا تُعرَّف متغيّرات السمة إلّا في المستوى الأعلى</li>
</ul>
<h2 id="فضاءات-أسماء-متغيرات-السمة">فضاءات أسماء متغيّرات السمة</h2>
<p>ينظّم Tailwind متغيّرات السمة في فضاءات أسماء، يتحكّم كل فضاء منها في جانب مختلف من جوانب نظام التصميم لديك. وفهم هذه الفضاءات هو أمر بالغ الأهمية لبناء نظام تصميم متّسق.</p>
<h3 id="الفضاءات-الأساسية">الفضاءات الأساسية</h3>
<p>لنتصفّح الفضاءات الرئيسية ونبنِ نظام تصميم مخصّصًا خطوة بخطوة:</p>
<h4>الألوان (<code>--color-*</code>)</h4>
<p>الألوان هي أساس معظم أنظمة التصميم. وإليك كيفية بناء لوحة ألوان شاملة:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Brand colors */</span>
  <span class="hljs-attr">--color-primary-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.95</span> <span class="hljs-number">0.02</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-primary-100</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.9</span> <span class="hljs-number">0.04</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-primary-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.6</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-primary-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.2</span> <span class="hljs-number">0.08</span> <span class="hljs-number">240</span>);

  <span class="hljs-comment">/* Semantic colors */</span>
  <span class="hljs-attr">--color-success</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.7</span> <span class="hljs-number">0.15</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-warning</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.8</span> <span class="hljs-number">0.12</span> <span class="hljs-number">85</span>);
  <span class="hljs-attr">--color-danger</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.6</span> <span class="hljs-number">0.2</span> <span class="hljs-number">25</span>);

  <span class="hljs-comment">/* Neutral scale */</span>
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.98</span> <span class="hljs-number">0.002</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.94</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-subtle</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.88</span> <span class="hljs-number">0.012</span> <span class="hljs-number">240</span>);
}
</code></pre>
<p>ينشئ هذا أصنافًا مثل:</p>
<ul>
<li><code>bg-primary-500</code>، <code>text-primary-500</code>، <code>border-primary-500</code></li>
<li><code>bg-success</code>، <code>text-success</code>، <code>border-success</code></li>
<li><code>bg-surface</code>، <code>text-surface</code>، <code>border-surface</code></li>
</ul>
<h4>التنضيب (Typography) (<code>--font-*</code>، <code>--text-*</code>، <code>--font-weight-*</code>)</h4>
<p>تتطلّب أنظمة التنضيب تنسيقًا بين عائلات الخطوط وأحجامها وأوزانها:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Font families */</span>
  <span class="hljs-attr">--font-sans</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, ui-sans-serif, system-ui, sans-serif;
  <span class="hljs-attr">--font-serif</span>: <span class="hljs-string">&#x27;Playfair Display&#x27;</span>, ui-serif, Georgia, serif;
  <span class="hljs-attr">--font-mono</span>: <span class="hljs-string">&#x27;JetBrains Mono&#x27;</span>, ui-monospace, monospace;

  <span class="hljs-comment">/* Type scale */</span>
  <span class="hljs-attr">--text-xs</span>: <span class="hljs-number">0.75rem</span>;
  <span class="hljs-attr">--text-xs--line-height</span>: <span class="hljs-number">1.2</span>;
  <span class="hljs-attr">--text-sm</span>: <span class="hljs-number">0.875rem</span>;
  <span class="hljs-attr">--text-sm--line-height</span>: <span class="hljs-number">1.4</span>;
  <span class="hljs-attr">--text-base</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attr">--text-base--line-height</span>: <span class="hljs-number">1.5</span>;
  <span class="hljs-attr">--text-lg</span>: <span class="hljs-number">1.125rem</span>;
  <span class="hljs-attr">--text-lg--line-height</span>: <span class="hljs-number">1.6</span>;
  <span class="hljs-attr">--text-xl</span>: <span class="hljs-number">1.25rem</span>;
  <span class="hljs-attr">--text-xl--line-height</span>: <span class="hljs-number">1.6</span>;

  <span class="hljs-comment">/* Font weights */</span>
  <span class="hljs-attr">--font-weight-light</span>: <span class="hljs-number">300</span>;
  <span class="hljs-attr">--font-weight-normal</span>: <span class="hljs-number">400</span>;
  <span class="hljs-attr">--font-weight-medium</span>: <span class="hljs-number">500</span>;
  <span class="hljs-attr">--font-weight-semibold</span>: <span class="hljs-number">600</span>;
  <span class="hljs-attr">--font-weight-bold</span>: <span class="hljs-number">700</span>;
}
</code></pre>
<h4>المسافات (Spacing) (<code>--spacing-*</code>)</h4>
<p>المسافات المتّسقة أمر بالغ الأهمية للتسلسل البصري:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Base spacing unit */</span>
  <span class="hljs-attr">--spacing</span>: <span class="hljs-number">0.25rem</span>; <span class="hljs-comment">/* 4px */</span>

  <span class="hljs-comment">/* Custom spacing values */</span>
  <span class="hljs-attr">--spacing-gutter</span>: <span class="hljs-number">1.5rem</span>; <span class="hljs-comment">/* 24px */</span>
  <span class="hljs-attr">--spacing-section</span>: <span class="hljs-number">4rem</span>; <span class="hljs-comment">/* 64px */</span>
  <span class="hljs-attr">--spacing-page</span>: <span class="hljs-number">6rem</span>; <span class="hljs-comment">/* 96px */</span>
}
</code></pre>
<p>متغيّر <code>--spacing</code> خاص—فهو يُستخدم كوحدة أساسية لمقياس المسافات الافتراضي (1 = 4px، 2 = 8px، إلخ).</p>
<h2 id="بناء-نظام-تصميم-كامل">بناء نظام تصميم كامل</h2>
<p>لنبنِ نظام تصميم شاملًا لتطبيق SaaS، خطوة بخطوة:</p>
<h3 id="الخطوة-1-عرف-الأساس">الخطوة 1: عرّف الأساس</h3>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* === COLORS === */</span>
  <span class="hljs-comment">/* Primary brand colors */</span>
  <span class="hljs-attr">--color-blue-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.97</span> <span class="hljs-number">0.01</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-100</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.94</span> <span class="hljs-number">0.03</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-200</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.88</span> <span class="hljs-number">0.06</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-300</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.82</span> <span class="hljs-number">0.09</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-400</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.74</span> <span class="hljs-number">0.12</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-600</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.55</span> <span class="hljs-number">0.18</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-700</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.45</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-800</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.35</span> <span class="hljs-number">0.12</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-number">0.09</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-blue-950</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.15</span> <span class="hljs-number">0.06</span> <span class="hljs-number">240</span>);

  <span class="hljs-comment">/* Semantic colors */</span>
  <span class="hljs-attr">--color-success-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.02</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-success-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-success-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-number">0.08</span> <span class="hljs-number">142</span>);

  <span class="hljs-attr">--color-warning-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.02</span> <span class="hljs-number">85</span>);
  <span class="hljs-attr">--color-warning-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.75</span> <span class="hljs-number">0.12</span> <span class="hljs-number">85</span>);
  <span class="hljs-attr">--color-warning-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.35</span> <span class="hljs-number">0.08</span> <span class="hljs-number">85</span>);

  <span class="hljs-attr">--color-danger-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.02</span> <span class="hljs-number">25</span>);
  <span class="hljs-attr">--color-danger-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.6</span> <span class="hljs-number">0.2</span> <span class="hljs-number">25</span>);
  <span class="hljs-attr">--color-danger-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.3</span> <span class="hljs-number">0.12</span> <span class="hljs-number">25</span>);

  <span class="hljs-comment">/* === TYPOGRAPHY === */</span>
  <span class="hljs-attr">--font-sans</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, ui-sans-serif, system-ui, sans-serif;
  <span class="hljs-attr">--font-mono</span>: <span class="hljs-string">&#x27;JetBrains Mono&#x27;</span>, ui-monospace, monospace;

  <span class="hljs-comment">/* Refined type scale */</span>
  <span class="hljs-attr">--text-2xs</span>: <span class="hljs-number">0.6875rem</span>; <span class="hljs-comment">/* 11px */</span>
  <span class="hljs-attr">--text-2xs--line-height</span>: <span class="hljs-number">1.2</span>;
  <span class="hljs-attr">--text-xs</span>: <span class="hljs-number">0.75rem</span>; <span class="hljs-comment">/* 12px */</span>
  <span class="hljs-attr">--text-xs--line-height</span>: <span class="hljs-number">1.3</span>;
  <span class="hljs-attr">--text-sm</span>: <span class="hljs-number">0.875rem</span>; <span class="hljs-comment">/* 14px */</span>
  <span class="hljs-attr">--text-sm--line-height</span>: <span class="hljs-number">1.4</span>;
  <span class="hljs-attr">--text-base</span>: <span class="hljs-number">1rem</span>; <span class="hljs-comment">/* 16px */</span>
  <span class="hljs-attr">--text-base--line-height</span>: <span class="hljs-number">1.5</span>;
  <span class="hljs-attr">--text-lg</span>: <span class="hljs-number">1.125rem</span>; <span class="hljs-comment">/* 18px */</span>
  <span class="hljs-attr">--text-lg--line-height</span>: <span class="hljs-number">1.6</span>;
  <span class="hljs-attr">--text-xl</span>: <span class="hljs-number">1.25rem</span>; <span class="hljs-comment">/* 20px */</span>
  <span class="hljs-attr">--text-xl--line-height</span>: <span class="hljs-number">1.6</span>;

  <span class="hljs-comment">/* === SPACING === */</span>
  <span class="hljs-attr">--spacing</span>: <span class="hljs-number">0.25rem</span>; <span class="hljs-comment">/* 4px base unit */</span>

  <span class="hljs-comment">/* Semantic spacing */</span>
  <span class="hljs-attr">--spacing-section</span>: <span class="hljs-number">5rem</span>; <span class="hljs-comment">/* 80px */</span>
  <span class="hljs-attr">--spacing-container</span>: <span class="hljs-number">1.5rem</span>; <span class="hljs-comment">/* 24px */</span>

  <span class="hljs-comment">/* === LAYOUT === */</span>
  <span class="hljs-attr">--container-sm</span>: <span class="hljs-number">40rem</span>; <span class="hljs-comment">/* 640px */</span>
  <span class="hljs-attr">--container-md</span>: <span class="hljs-number">48rem</span>; <span class="hljs-comment">/* 768px */</span>
  <span class="hljs-attr">--container-lg</span>: <span class="hljs-number">64rem</span>; <span class="hljs-comment">/* 1024px */</span>
  <span class="hljs-attr">--container-xl</span>: <span class="hljs-number">80rem</span>; <span class="hljs-comment">/* 1280px */</span>

  <span class="hljs-comment">/* === EFFECTS === */</span>
  <span class="hljs-attr">--radius-sm</span>: <span class="hljs-number">0.375rem</span>; <span class="hljs-comment">/* 6px */</span>
  <span class="hljs-attr">--radius-md</span>: <span class="hljs-number">0.5rem</span>; <span class="hljs-comment">/* 8px */</span>
  <span class="hljs-attr">--radius-lg</span>: <span class="hljs-number">0.75rem</span>; <span class="hljs-comment">/* 12px */</span>

  <span class="hljs-attr">--shadow-card</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>), <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> -<span class="hljs-number">1px</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>);
  <span class="hljs-attr">--shadow-dialog</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">25px</span> -<span class="hljs-number">5px</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>), <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">10px</span> -<span class="hljs-number">6px</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>);
}
</code></pre>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-brand-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-success-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.02</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-success-200</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.88</span> <span class="hljs-number">0.06</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-success-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-success-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-number">0.08</span> <span class="hljs-number">142</span>);
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.99</span> <span class="hljs-number">0.002</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-surface-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.15</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.45</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.88</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.92</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--shadow-card</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>), <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> -<span class="hljs-number">1px</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>);
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.08</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-surface-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.12</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.94</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.7</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.22</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.16</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
}
</code></pre>
<h3 id="الخطوة-2-ابن-المكونات-الأساسية">الخطوة 2: ابنِ المكوّنات الأساسية</h3>
<p>الآن لنبنِ المكوّنات باستخدام نظام التصميم لدينا:</p>
<p><em>الخطوة 2: ابنِ المكوّنات الأساسية — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/ea200cc4e9c144557021d94f7c5599ff9f6739791e28bb28c7a3669f41e61d22.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Button Component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shadow-card rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg&quot;</span>
&gt;</span>
  Primary Button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Card Component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shadow-card space-y-4 rounded-lg border border-blue-100 bg-white p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-blue-900&quot;</span>&gt;</span>Card Title<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-base text-blue-700&quot;</span>&gt;</span>Card content goes here with proper spacing and typography.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Alert Component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-success-50 border-success-200 text-success-900 rounded-md border px-4 py-3&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium&quot;</span>&gt;</span>Success! Your changes have been saved.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="الخطوة-3-تعامل-مع-الوضع-الداكن">الخطوة 3: تعامل مع الوضع الداكن</h3>
<p>وسّع سمتك لدعم الوضع الداكن بأناقة:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Light mode colors (default) */</span>
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.99</span> <span class="hljs-number">0.002</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-surface-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.96</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.15</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.45</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);

  <span class="hljs-comment">/* Border colors */</span>
  <span class="hljs-attr">--color-border</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.88</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.92</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
}

<span class="hljs-comment">/* Dark mode overrides */</span>
<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.08</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-surface-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.12</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.94</span> <span class="hljs-number">0.004</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.7</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);

  <span class="hljs-attr">--color-border</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.22</span> <span class="hljs-number">0.008</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-border-muted</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.16</span> <span class="hljs-number">0.006</span> <span class="hljs-number">240</span>);
}
</code></pre>
<p>والآن يمكنك استخدام هذه الألوان الدلالية التي تتكيّف تلقائيًا:</p>
<p><em>الخطوة 3: تعامل مع الوضع الداكن — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/35e6351f181e719231025f2f391524479931706c74f6c7d895ecb280d0fe4fe5.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface border-border text-text border&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text font-semibold&quot;</span>&gt;</span>Adaptive Component<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted&quot;</span>&gt;</span>This content adapts to light and dark themes automatically.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="تقنيات-السمة-المتقدمة">تقنيات السمة المتقدّمة</h2>
<h3 id="الإشارة-إلى-متغيرات-أخرى">الإشارة إلى متغيّرات أخرى</h3>
<p>عند إنشاء قيم مشتقّة، استخدم <code>@theme inline</code> للإشارة إلى متغيّرات السمة الأخرى:</p>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--brand-hue</span>: <span class="hljs-number">240</span>;
  <span class="hljs-attr">--brand-saturation</span>: <span class="hljs-number">0.15</span>;
}

<span class="hljs-keyword">@theme</span> inline {
  <span class="hljs-attr">--color-primary-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.97</span> <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--brand-saturation) * <span class="hljs-number">0.2</span>) <span class="hljs-built_in">var</span>(--brand-hue));
  <span class="hljs-attr">--color-primary-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-built_in">var</span>(--brand-saturation) <span class="hljs-built_in">var</span>(--brand-hue));
  <span class="hljs-attr">--color-primary-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--brand-saturation) * <span class="hljs-number">0.6</span>) <span class="hljs-built_in">var</span>(--brand-hue));
}
</code></pre>
<p>يتيح لك هذا الأسلوب إنشاء أنظمة ألوان ديناميكية يمكن ضبطها بمتغيّرات أساسية قليلة فحسب.</p>
<h3 id="سمات-خاصة-بالمكونات">سمات خاصّة بالمكوّنات</h3>
<p>أنشئ سمات متخصّصة لمكوّنات بعينها:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Button system */</span>
  <span class="hljs-attr">--button-padding-sm</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">2</span>) <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">3</span>);
  <span class="hljs-attr">--button-padding-md</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">2.5</span>) <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">4</span>);
  <span class="hljs-attr">--button-padding-lg</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">3</span>) <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">6</span>);

  <span class="hljs-comment">/* Form system */</span>
  <span class="hljs-attr">--form-field-height-sm</span>: <span class="hljs-number">2rem</span>;
  <span class="hljs-attr">--form-field-height-md</span>: <span class="hljs-number">2.5rem</span>;
  <span class="hljs-attr">--form-field-height-lg</span>: <span class="hljs-number">3rem</span>;

  <span class="hljs-comment">/* Animation system */</span>
  <span class="hljs-attr">--ease-smooth</span>: <span class="hljs-built_in">cubic-bezier</span>(<span class="hljs-number">0.4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">1</span>);
  <span class="hljs-attr">--ease-bounce</span>: <span class="hljs-built_in">cubic-bezier</span>(<span class="hljs-number">0.68</span>, -<span class="hljs-number">0.55</span>, <span class="hljs-number">0.265</span>, <span class="hljs-number">1.55</span>);
  <span class="hljs-attr">--duration-fast</span>: <span class="hljs-number">150ms</span>;
  <span class="hljs-attr">--duration-normal</span>: <span class="hljs-number">300ms</span>;
}
</code></pre>
<h3 id="بناء-مكونات-معقدة">بناء مكوّنات معقّدة</h3>
<p>لنبنِ بطاقة لوحة تحكّم شاملة باستخدام نظام التصميم لدينا:</p>
<p><em>بناء مكوّنات معقّدة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/dffbec5e8d57d180e01784ceedde6ea387ad5137c6efd493b938c497bdeabeb8.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface border-border shadow-card overflow-hidden rounded-lg border&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Header --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface-muted border-border border-b px-6 py-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text text-lg font-semibold&quot;</span>&gt;</span>Revenue Overview<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted hover:text-text hover:bg-surface -m-2 rounded-md p-2 transition-colors duration-200&quot;</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;currentColor&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 20 20&quot;</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- Icon content --&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Content --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-6 p-6&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Metrics --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-center&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text text-2xl font-bold&quot;</span>&gt;</span>$24,500<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted text-sm&quot;</span>&gt;</span>This month<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-center&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-success-500 text-2xl font-bold&quot;</span>&gt;</span>+12.5%<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted text-sm&quot;</span>&gt;</span>Growth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-center&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text text-2xl font-bold&quot;</span>&gt;</span>1,245<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted text-sm&quot;</span>&gt;</span>Transactions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Chart placeholder --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface-muted border-border-muted flex h-32 items-center justify-center rounded-md border&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted text-sm&quot;</span>&gt;</span>Chart would go here<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Footer --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface-muted border-border border-t px-6 py-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-text-muted text-xs&quot;</span>&gt;</span> Updated 2 hours ago <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xs font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700&quot;</span>
      &gt;</span>
        View details
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre>
<h2 id="استخدام-متغيرات-السمة-في-css-المخصص">استخدام متغيّرات السمة في CSS المخصّص</h2>
<p>متغيّرات سمتك متاحة كمتغيّرات CSS عادية، فيصبح إنشاء أنماط مخصّصة متّسقة مع نظام التصميم سهلًا:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@layer</span> components {
  <span class="hljs-selector-class">.gradient-card</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(<span class="hljs-number">135deg</span>, <span class="hljs-built_in">var</span>(--color-blue-<span class="hljs-number">500</span>), <span class="hljs-built_in">var</span>(--color-blue-<span class="hljs-number">600</span>));
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--radius-lg);
    <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">var</span>(--spacing-<span class="hljs-number">6</span>);
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-built_in">var</span>(--shadow-card);
  }

  <span class="hljs-selector-class">.custom-button</span> {
    <span class="hljs-comment">/* Use theme variables for consistency */</span>
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--color-primary-<span class="hljs-number">500</span>);
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color-white);
    <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--font-sans);
    <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">var</span>(--text-sm);
    <span class="hljs-attribute">font-weight</span>: <span class="hljs-built_in">var</span>(--font-weight-medium);
    <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">2</span>) <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--spacing) * <span class="hljs-number">4</span>);
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--radius-md);

    <span class="hljs-comment">/* Use the --alpha() function for opacity */</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">--alpha</span>(<span class="hljs-built_in">var</span>(--color-primary-<span class="hljs-number">500</span>) / <span class="hljs-number">20%</span>);

    &amp;<span class="hljs-selector-pseudo">:hover</span> {
      <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--color-primary-<span class="hljs-number">600</span>);
    }
  }
}
</code></pre>
<h2 id="مشاركة-السمات-بين-المشاريع">مشاركة السمات بين المشاريع</h2>
<p>من أكبر مزايا السمات المعتمدة على CSS هو سهولة مشاركتها بين المشاريع:</p>
<h3 id="إنشاء-حزمة-سمة-مشتركة">إنشاء حزمة سمة مشتركة</h3>
<pre><code class="language-css"><span class="hljs-comment">/* themes/brand.css */</span>
<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Brand foundation */</span>
  <span class="hljs-attr">--color-brand-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.97</span> <span class="hljs-number">0.01</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-brand-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
  <span class="hljs-attr">--color-brand-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-number">0.09</span> <span class="hljs-number">240</span>);

  <span class="hljs-comment">/* Typography */</span>
  <span class="hljs-attr">--font-sans</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, ui-sans-serif, system-ui, sans-serif;
  <span class="hljs-attr">--font-mono</span>: <span class="hljs-string">&#x27;JetBrains Mono&#x27;</span>, ui-monospace, monospace;

  <span class="hljs-comment">/* Spacing scale */</span>
  <span class="hljs-attr">--spacing</span>: <span class="hljs-number">0.25rem</span>;
  <span class="hljs-attr">--spacing-section</span>: <span class="hljs-number">4rem</span>;

  <span class="hljs-comment">/* Component tokens */</span>
  <span class="hljs-attr">--radius-button</span>: <span class="hljs-number">0.5rem</span>;
  <span class="hljs-attr">--shadow-card</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.1</span>);
}
</code></pre>
<h3 id="استخدام-السمات-المشتركة">استخدام السمات المشتركة</h3>
<pre><code class="language-css"><span class="hljs-comment">/* In any project */</span>
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;./themes/brand.css&#x27;</span>;

<span class="hljs-comment">/* Project-specific customizations */</span>
<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Override or extend as needed */</span>
  <span class="hljs-attr">--color-accent</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.7</span> <span class="hljs-number">0.15</span> <span class="hljs-number">142</span>);
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="تحسين-متغيرات-السمة">تحسين متغيّرات السمة</h3>
<p>صُمّم نظام السمات في Tailwind 4 من أجل الأداء، لكنّ هناك أفضل الممارسات الواجب اتباعها:</p>
<ol>
<li><strong>استخدم التسمية الدلالية</strong>: بدلًا من <code>--color-blue-500</code>، استخدم <code>--color-primary-500</code> لتسهيل إعادة الهيكلة</li>
<li><strong>قلّل القيم التعسّفية</strong>: اعتمد على متغيّرات سمتك بدلًا من القيم التعسّفية داخل HTML</li>
<li><strong>استخدم خيار <code>static</code> بحذر</strong>: لا تولّد كل متغيّرات CSS إلا عند الضرورة</li>
</ol>
<pre><code class="language-css"><span class="hljs-comment">/* Generate all variables (use sparingly) */</span>
<span class="hljs-keyword">@theme</span> static {
  <span class="hljs-attr">--color-primary-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
}

<span class="hljs-comment">/* Default: only used variables are generated */</span>
<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-primary-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.65</span> <span class="hljs-number">0.15</span> <span class="hljs-number">240</span>);
}
</code></pre>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>يمثّل نظام السمات في Tailwind CSS 4 تحوّلًا جوهريًا نحو أنظمة تصميم أصلية في CSS. وبإتقانك متغيّرات السمة، يمكنك إنشاء أنظمة تصميم أكثر قابلية للصيانة والأداء والمشاركة.</p>
<p>وهذه المبادئ المفتاحية التي ينبغي تذكّرها:</p>
<ol>
<li><strong>ابدأ بالأساسيات</strong>: عرّف ألوانك وتنضيبك ومسافاتك أولًا</li>
<li><strong>استخدم التسمية الدلالية</strong>: أنشئ أسماء متغيّرات ذات معنى تعكس الغرض لا المظهر</li>
<li><strong>ابنِ بمنهجية</strong>: رتّب رموز التصميم (design tokens) من الأساسي إلى الخاصّ بالمكوّنات</li>
<li><strong>استثمر متغيّرات CSS</strong>: استفد من متغيّرات CSS المولَّدة في الأنماط المخصّصة</li>
<li><strong>فكّر كأنظمة</strong>: صمّم سمتك لتتوسّع عبر مشاريع متعدّدة وأعضاء فريق</li>
</ol>
<p>وبهذه التقنيات، ستكون قادرًا على بناء أنظمة تصميم متطوّرة قابلة للصيانة، تنمو مع مشاريعك، وتوفّر أساسًا متينًا لواجهة المستخدم كلّها.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:c,html:t};export{s as book,a as chapter,n as chapterTitle,e as default,c as headings,t as html,l as slug,p as title};
