const s="kinney",n="tailwind",a="Tailwind CSS",l="oklch-colors",p="لوحة ألوان OKLCH",t=[{depth:2,id:"مكونات-oklch",text:"مكوّنات OKLCH"},{depth:2,id:"لماذا-oklch",text:"لماذا OKLCH؟"},{depth:2,id:"استخدام-oklch-في-tailwind",text:"استخدام OKLCH في Tailwind"},{depth:3,id:"اللوحة-الافتراضية",text:"اللوحة الافتراضية"},{depth:3,id:"ألوان-مخصصة",text:"ألوان مخصصة"},{depth:2,id:"oklch-والتدرجات",text:"OKLCH والتدرّجات"},{depth:2,id:"الوضع-الداكن-باستخدام-oklch",text:"الوضع الداكن باستخدام OKLCH"},{depth:2,id:"نصائح-إمكانية-الوصول",text:"نصائح إمكانية الوصول"},{depth:2,id:"دعم-المتصفحات",text:"دعم المتصفحات"},{depth:2,id:"أمثلة-عملية",text:"أمثلة عملية"}],c=`<p>يستخدم Tailwind ألوان OKLCH للوحته الافتراضية — فضاء لوني متسق إدراكيًا يتوافق مع الرؤية البشرية.</p>
<h2 id="مكونات-oklch">مكوّنات OKLCH</h2>
<ul>
<li><strong>L (الإضاءة):</strong> من 0 (أسود) إلى 1 (أبيض) — متسق إدراكيًا</li>
<li><strong>C (التشبّع اللوني):</strong> من 0 (رمادي) فصاعدًا — شدة اللون</li>
<li><strong>H (درجة اللون):</strong> 0-360 درجة — الموضع على عجلة الألوان</li>
<li><strong>A (ألفا):</strong> من 0 إلى 1 أو من 0% إلى 100% — العتامة</li>
</ul>
<p>الصيغة: <code>oklch(L C H)</code> أو <code>oklch(L C H / alpha)</code></p>
<h2 id="لماذا-oklch">لماذا OKLCH؟</h2>
<ol>
<li><strong>الاتساق الإدراكي</strong> - تغيّرات إضاءة يمكن التنبؤ بها</li>
<li><strong>دعم نطاق P3</strong> - ألوان أكثر حيوية على الشاشات الحديثة</li>
<li><strong>إمكانية وصول أفضل</strong> - حسابات تباين موثوقة</li>
<li><strong>تدرّجات أكثر سلاسة</strong> - بلا ألوان وسطية عكرة</li>
</ol>
<h2 id="استخدام-oklch-في-tailwind">استخدام OKLCH في Tailwind</h2>
<h3 id="اللوحة-الافتراضية">اللوحة الافتراضية</h3>
<p>تستخدم كل الألوان الافتراضية (الأحمر والأزرق والرمادي وما شابه) OKLCH داخليًا:</p>
<p><em>اللوحة الافتراضية — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/1f6182d8384ee040ee6e8fd958f2f1248ac28a6fe5fcae24a9f0b769a7dd3e4d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-sky-500 text-neutral-900&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Tailwind handles OKLCH conversion --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="ألوان-مخصصة">ألوان مخصصة</h3>
<p>عرّف ألوان OKLCH في <code>@theme</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Single color */</span>
  <span class="hljs-attr">--color-midnight</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">15%</span> <span class="hljs-number">0.05</span> <span class="hljs-number">270</span>);

  <span class="hljs-comment">/* Full palette */</span>
  <span class="hljs-attr">--color-brand-100</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.99</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>);
  <span class="hljs-attr">--color-brand-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.64</span> <span class="hljs-number">0.18</span> <span class="hljs-number">260</span>);
  <span class="hljs-attr">--color-brand-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.28</span> <span class="hljs-number">0.05</span> <span class="hljs-number">265</span>);
}
</code></pre>
<p>استخدمها مثل أي لون في Tailwind:</p>
<p><em>ألوان مخصصة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/b8509c47b25281abd7e539248110d7f6b963ff321611b5be66013d6a89534a5c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-brand-500 text-midnight&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="oklch-والتدرجات">OKLCH والتدرّجات</h2>
<p>استيفاء أفضل باستخدام OKLCH:</p>
<p><em>OKLCH والتدرّجات — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/b4ed486bd1bfe2499af033c10882ab772da212b16785317e039de93040887482.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Standard gradient --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-linear-to-r from-purple-500 to-pink-500&quot;</span>&gt;</span>Smooth OKLCH interpolation<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Explicit OKLCH interpolation --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-linear-to-r/oklch from-indigo-500 to-teal-400&quot;</span>&gt;</span>Vibrant color transitions<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="الوضع-الداكن-باستخدام-oklch">الوضع الداكن باستخدام OKLCH</h2>
<p>الإضاءة التي يمكن التنبؤ بها تسهّل الوضع الداكن:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.98</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>); <span class="hljs-comment">/* Light mode */</span>
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.15</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>); <span class="hljs-comment">/* Light mode */</span>
}

<span class="hljs-selector-class">.dark</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.12</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>); <span class="hljs-comment">/* Dark mode */</span>
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.95</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>); <span class="hljs-comment">/* Dark mode */</span>
}
</code></pre>
<h2 id="نصائح-إمكانية-الوصول">نصائح إمكانية الوصول</h2>
<ol>
<li><strong>استخدم قيم L للتباين</strong> - فروق L أكبر = تباين أفضل</li>
<li><strong>تحقّق دائمًا بالأدوات</strong> - فرق L وحده لا يكفي</li>
<li><strong>اختبر السمتين</strong> - يحتاج الوضعان الداكن والفاتح إلى فحوص منفصلة</li>
</ol>
<h2 id="دعم-المتصفحات">دعم المتصفحات</h2>
<p>يتطلب OKLCH متصفحات حديثة:</p>
<ul>
<li>Chrome 111+</li>
<li>Safari 15.4+</li>
<li>Firefox 113+</li>
</ul>
<blockquote>
<p><strong>يتضمن Tailwind 4.1+ بدائل احتياطية للمتصفحات الأقدم، لكن توقّع اختلافات.</strong></p>
</blockquote>
<h2 id="أمثلة-عملية">أمثلة عملية</h2>
<p><strong>زر عالي التباين:</strong></p>
<p><em>أمثلة عملية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/baeec31cd36e93bfdbc23ba548c002c2b313c74f5dfc20c4f5b925928b4379fd.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-[oklch(0.2_0.1_250)] text-[oklch(0.95_0_0)]&quot;</span>&gt;</span>
  High Contrast (L: 0.2 vs 0.95)
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p><strong>لون تمييز حيوي:</strong></p>
<p><em>أمثلة عملية — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/ad491bd44845466c559f0f6d829991289c5d7ab9afc133fd780aa9f711225122.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-[oklch(0.7_0.25_160)]&quot;</span>&gt;</span>High chroma for vivid color<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>لوحة ألوان متاحة:</strong></p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Ensure 0.4+ lightness difference */</span>
  <span class="hljs-attr">--color-bg</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.98</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>);
  <span class="hljs-attr">--color-text</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.25</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>);
  <span class="hljs-attr">--color-primary</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.55</span> <span class="hljs-number">0.2</span> <span class="hljs-number">250</span>);
}
</code></pre>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
