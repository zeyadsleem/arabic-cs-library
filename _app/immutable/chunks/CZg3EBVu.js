const s="kinney",a="tailwind",n="Tailwind CSS",l="breakpoint-utilities",t="أدوات نقاط التوقف",p=[{depth:2,id:"نقاط-التوقف-الافتراضية",text:"نقاط التوقف الافتراضية"},{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:2,id:"استهداف-النطاقات",text:"استهداف النطاقات"},{depth:3,id:"صيغ-الحد-الأقصى-للعرض",text:"صيغ الحد الأقصى للعرض"},{depth:3,id:"التكديس-للنطاقات",text:"التكديس للنطاقات"},{depth:2,id:"نقاط-توقف-عشوائية",text:"نقاط توقف عشوائية"},{depth:2,id:"تخصيص-نقاط-التوقف",text:"تخصيص نقاط التوقف"},{depth:2,id:"استعلامات-الحاويات",text:"استعلامات الحاويات"},{depth:3,id:"استعلامات-الحاويات-الأساسية",text:"استعلامات الحاويات الأساسية"},{depth:3,id:"الحاويات-المسماة",text:"الحاويات المسمّاة"},{depth:3,id:"أحجام-الحاويات",text:"أحجام الحاويات"},{depth:3,id:"استعلامات-حاويات-عشوائية",text:"استعلامات حاويات عشوائية"},{depth:2,id:"أنماط-استجابة-معقدة",text:"أنماط استجابة معقّدة"},{depth:3,id:"الدمج-مع-صيغ-أخرى",text:"الدمج مع صيغ أخرى"},{depth:3,id:"الطباعة-المستجيبة",text:"الطباعة المستجيبة"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],e=`<p>تستخدم Tailwind نهج «الجوال أولًا»: الأدوات بلا بادئة تنطبق على كل المقاسات، والأدوات ذات البادئة تنطبق من نقطة التوقف تلك فصاعدًا.</p>
<h2 id="نقاط-التوقف-الافتراضية">نقاط التوقف الافتراضية</h2>
<ul>
<li><code>sm</code>: من 640px وما فوق</li>
<li><code>md</code>: من 768px وما فوق</li>
<li><code>lg</code>: من 1024px وما فوق</li>
<li><code>xl</code>: من 1280px وما فوق</li>
<li><code>2xl</code>: من 1536px وما فوق</li>
</ul>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<p><em>الاستخدام الأساسي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/a6c7ba15ac0f1fb23100cf9b826687f4d73c8c64a73c68430d69ac460e6b6e92.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Mobile-first design --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 1 column on mobile, 2 on medium, 3 on large --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Show/hide at breakpoints --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden lg:block&quot;</span>&gt;</span>Only visible on large screens<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block lg:hidden&quot;</span>&gt;</span>Hidden on large screens<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="استهداف-النطاقات">استهداف النطاقات</h2>
<h3 id="صيغ-الحد-الأقصى-للعرض">صيغ الحد الأقصى للعرض</h3>
<p>استخدم <code>max-*</code> لتطبيق الأنماط دون نقطة توقف:</p>
<p><em>صيغ الحد الأقصى للعرض — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/7c688b6a5bfcad03184b34e10cc0e9c6d5431765f56cf9926afe17f2441647e4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Only on mobile --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block max-sm:hidden&quot;</span>&gt;</span>Hidden on mobile only<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Medium screens only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden max-lg:hidden md:block&quot;</span>&gt;</span>Visible between 768px-1024px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="التكديس-للنطاقات">التكديس للنطاقات</h3>
<p><em>التكديس للنطاقات — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/a71b4079ae617b7def170a51956da3a391c2b2538b6959259b811c1f917469ad.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Apply only between md and lg --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;md:max-lg:bg-blue-500&quot;</span>&gt;</span>Blue background on medium screens only<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="نقاط-توقف-عشوائية">نقاط توقف عشوائية</h2>
<p>نقاط توقف مخصّصة تُستخدم مرة واحدة:</p>
<p><em>نقاط توقف عشوائية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/cc56ebb0bce5b4f74c352a2aa0d7286606b37dec342d9c645859df6f4f86f8a1.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Min width --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-[850px]:flex&quot;</span>&gt;</span>Flex at 850px+<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Max width --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;max-[1200px]:hidden&quot;</span>&gt;</span>Hidden below 1200px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Range --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;min-[600px]:max-[900px]:bg-gray-100&quot;</span>&gt;</span>Gray between 600-900px<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="تخصيص-نقاط-التوقف">تخصيص نقاط التوقف</h2>
<p>عرّف نقاط توقف مخصّصة داخل <code>@theme</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Add new breakpoints */</span>
  <span class="hljs-attr">--breakpoint-xs</span>: <span class="hljs-number">475px</span>;
  <span class="hljs-attr">--breakpoint-3xl</span>: <span class="hljs-number">1920px</span>;

  <span class="hljs-comment">/* Override defaults */</span>
  <span class="hljs-attr">--breakpoint-md</span>: <span class="hljs-number">850px</span>;

  <span class="hljs-comment">/* Remove a default */</span>
  <span class="hljs-attr">--breakpoint-2xl</span>: initial;
}
</code></pre>
<h2 id="استعلامات-الحاويات">استعلامات الحاويات</h2>
<p>نسّق بحسب حجم الحاوية الأم لا بحسب إطار العرض:</p>
<h3 id="استعلامات-الحاويات-الأساسية">استعلامات الحاويات الأساسية</h3>
<p><em>استعلامات الحاويات الأساسية — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/0764db1c435470de16ea36bce5c4a4cbeefcffc1ad213cf9d332d462ab4ea66f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Mark parent as container --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Style children based on container size --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid @md:grid-cols-2 @lg:grid-cols-3&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Responsive to container, not viewport --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="الحاويات-المسماة">الحاويات المسمّاة</h3>
<p><em>الحاويات المسمّاة — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/77a4fc681bf6d3b786b9366f569db29c848cb325c365acddca7f879f1e8468dd.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Named container --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container/sidebar&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@sm/sidebar:flex&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Another named container --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container/main&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@lg/main:prose-lg&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="أحجام-الحاويات">أحجام الحاويات</h3>
<p>نقاط توقف الحاويات الافتراضية تطابق نقاط توقف إطار العرض:</p>
<ul>
<li><code>@sm</code>: حاوية بعرض 640px</li>
<li><code>@md</code>: حاوية بعرض 768px</li>
<li>وغيرها.</li>
</ul>
<p>خصّصها في <code>@theme</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--container-xs</span>: <span class="hljs-number">320px</span>;
  <span class="hljs-attr">--container-3xl</span>: <span class="hljs-number">1600px</span>;
}
</code></pre>
<h3 id="استعلامات-حاويات-عشوائية">استعلامات حاويات عشوائية</h3>
<p><em>استعلامات حاويات عشوائية — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/7b2008710754ff6269158c4af09ac0c6680ee80343055acbb6a1f25e4f518efb.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@max-[600px]:block @min-[400px]:flex&quot;</span>&gt;</span>Custom container breakpoints<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أنماط-استجابة-معقدة">أنماط استجابة معقّدة</h2>
<h3 id="الدمج-مع-صيغ-أخرى">الدمج مع صيغ أخرى</h3>
<p><em>الدمج مع صيغ أخرى — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/7a2b468ecff5d64542dc0d8d1e130934f22c329515c01ea17a92fdc6834d2504.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Dark mode + responsive + hover --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-gray-100 hover:bg-gray-200 md:bg-white md:hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:md:bg-gray-950 dark:md:hover:bg-gray-900&quot;</span>
&gt;</span>
  Complex responsive button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h3 id="الطباعة-المستجيبة">الطباعة المستجيبة</h3>
<p><em>الطباعة المستجيبة — المثال 9 — <a href="https://stevekinney.com/generated/playgrounds/0dd673cd2806f56d6da2f3a3a019524643de28fe03a4d84dbdafdea6f2db1a30.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-2xl sm:text-3xl md:text-4xl lg:text-5xl&quot;</span>&gt;</span>Scales with viewport<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl @sm:text-2xl @md:text-3xl&quot;</span>&gt;</span>Scales with container<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>ابدأ بالجوال أولًا</strong> — ابنِ للشاشات الصغيرة وطوّر للأكبر</li>
<li><strong>استخدم نقاط توقف دلالية</strong> — طابق نقاط الانكسار الطبيعية في تصميمك</li>
<li><strong>استخدم استعلامات الحاويات للمكوّنات</strong> — أكثر قابلية للنقل من استعلامات إطار العرض</li>
<li><strong>اختبر عند كل المقاسات</strong> — لا تختبر عند نقاط التوقف الدقيقة فقط</li>
<li><strong>تجنّب كثرة نقاط التوقف</strong> — ثلاث أو أربع نقاط تكفي عادةً</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
