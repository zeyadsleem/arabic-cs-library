const s="kinney",a="tailwind",n="Tailwind CSS",l="tailwind-color-schemes",e="أنظمة الألوان",t=[{depth:2,id:"خاصية-color-scheme",text:"خاصية color-scheme"},{depth:3,id:"الأدوات-المتاحة",text:"الأدوات المتاحة"},{depth:2,id:"تعريف-لوحات-الألوان",text:"تعريف لوحات الألوان"},{depth:2,id:"تكامل-الوضع-الداكن",text:"تكامل الوضع الداكن"},{depth:3,id:"تفضيل-النظام-الافتراضي",text:"تفضيل النظام الافتراضي"},{depth:3,id:"التحكم-اليدوي-في-السمة",text:"التحكم اليدوي في السمة"},{depth:2,id:"مثال-نظام-ألوان-كامل",text:"مثال نظام ألوان كامل"},{depth:2,id:"استخدام-ألوان-السمة",text:"استخدام ألوان السمة"},{depth:3,id:"في-الأدوات",text:"في الأدوات"},{depth:3,id:"في-css-المخصص",text:"في CSS المخصص"},{depth:3,id:"في-القيم-العشوائية",text:"في القيم العشوائية"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],c=`<p>يستخدم Tailwind 4 إعدادًا قائمًا على CSS أولًا مع <code>@theme</code> لإدارة الألوان وخاصية <code>color-scheme</code> لسمات المتصفح الأصلية.</p>
<h2 id="خاصية-color-scheme">خاصية <code>color-scheme</code></h2>
<p>تتحكم في كيفية تصيير المتصفحات لعناصر الواجهة الأصلية (عناصر النماذج وأشرطة التمرير وألوان النظام):</p>
<p><em>خاصية color-scheme — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/3986b42760fe983571974aaa675ec496ec15bcfe29b214c3e8ce0b7a85f16566.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Apply to root for whole document --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scheme-dark&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Or specific elements --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scheme-light&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Light themed dropdown<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

</code></pre>
<h3 id="الأدوات-المتاحة">الأدوات المتاحة</h3>
<ul>
<li><code>scheme-normal</code> - افتراضي المتصفح</li>
<li><code>scheme-light</code> - نظام ألوان فاتح</li>
<li><code>scheme-dark</code> - نظام ألوان داكن</li>
<li><code>scheme-light-dark</code> - يدعم كليهما (المتصفح يختار)</li>
<li><code>scheme-only-light</code> - يفرض الفاتح فقط</li>
<li><code>scheme-only-dark</code> - يفرض الداكن فقط</li>
</ul>
<h2 id="تعريف-لوحات-الألوان">تعريف لوحات الألوان</h2>
<p>استخدم <code>@theme</code> لتعريف ألوان تولّد أدوات:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Single colors */</span>
  <span class="hljs-attr">--color-primary</span>: <span class="hljs-number">#007bff</span>;
  <span class="hljs-attr">--color-accent</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">71.7%</span> <span class="hljs-number">0.25</span> <span class="hljs-number">360</span>);

  <span class="hljs-comment">/* Color scales */</span>
  <span class="hljs-attr">--color-brand-50</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.97</span> <span class="hljs-number">0.01</span> <span class="hljs-number">250</span>);
  <span class="hljs-attr">--color-brand-500</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.56</span> <span class="hljs-number">0.18</span> <span class="hljs-number">250</span>);
  <span class="hljs-attr">--color-brand-900</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">0.28</span> <span class="hljs-number">0.09</span> <span class="hljs-number">250</span>);
}
</code></pre>
<h2 id="تكامل-الوضع-الداكن">تكامل الوضع الداكن</h2>
<h3 id="تفضيل-النظام-الافتراضي">تفضيل النظام الافتراضي</h3>
<p><em>تفضيل النظام الافتراضي — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/22c30b0a6f5692e496716ee7f7f72ae3c0e1636b16e466bc4fe41574bba6de5b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Automatic dark mode based on OS --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-white dark:bg-gray-900&quot;</span>&gt;</span>Adapts to system preference<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="التحكم-اليدوي-في-السمة">التحكم اليدوي في السمة</h3>
<pre><code class="language-css"><span class="hljs-comment">/* Override dark variant to use class */</span>
<span class="hljs-keyword">@custom-variant</span> dark (&amp;:where(.dark, .dark *));

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-background</span>: white;
  <span class="hljs-attr">--color-text</span>: black;
}

<span class="hljs-selector-class">.dark</span> {
  <span class="hljs-attr">--color-background</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-text</span>: white;
}
</code></pre>
<h2 id="مثال-نظام-ألوان-كامل">مثال نظام ألوان كامل</h2>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-comment">/* Define color scheme trigger */</span>
<span class="hljs-keyword">@custom-variant</span> dark (&amp;:where([data-theme=<span class="hljs-string">&quot;dark&quot;</span>], [data-theme=<span class="hljs-string">&quot;dark&quot;</span>] *));

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Semantic colors that change with theme */</span>
  <span class="hljs-attr">--color-surface</span>: white;
  <span class="hljs-attr">--color-surface-alt</span>: <span class="hljs-number">#f5f5f5</span>;
  <span class="hljs-attr">--color-text</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-number">#666</span>;

  <span class="hljs-comment">/* Brand colors stay consistent */</span>
  <span class="hljs-attr">--color-brand</span>: <span class="hljs-number">#5b21b6</span>;
  <span class="hljs-attr">--color-success</span>: <span class="hljs-number">#10b981</span>;
  <span class="hljs-attr">--color-danger</span>: <span class="hljs-number">#ef4444</span>;
}

<span class="hljs-comment">/* Dark theme overrides */</span>
<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-surface-alt</span>: <span class="hljs-number">#2a2a2a</span>;
  <span class="hljs-attr">--color-text</span>: <span class="hljs-number">#f5f5f5</span>;
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-number">#999</span>;
}
</code></pre>
<pre><code class="language-css"><span class="hljs-keyword">@custom-variant</span> dark (&amp;:where([data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>], [data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>] *));

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-surface</span>: white;
  <span class="hljs-attr">--color-surface-alt</span>: <span class="hljs-number">#f5f5f5</span>;
  <span class="hljs-attr">--color-text</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-brand</span>: <span class="hljs-number">#5b21b6</span>;
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-surface-alt</span>: <span class="hljs-number">#2a2a2a</span>;
  <span class="hljs-attr">--color-text</span>: <span class="hljs-number">#f5f5f5</span>;
}
</code></pre>
<h2 id="استخدام-ألوان-السمة">استخدام ألوان السمة</h2>
<h3 id="في-الأدوات">في الأدوات</h3>
<p><em>في الأدوات — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/4628227dd3fb8306b7eb72ac11709a834d3e11d1478bdf8ec0577567df85269b.html">افتح المثال</a><a href="#playground-css-semantic-colors">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface text-text border-surface-alt&quot;</span>&gt;</span>Automatically themed content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="في-css-المخصص">في CSS المخصص</h3>
<pre><code class="language-css"><span class="hljs-selector-class">.card</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--color-surface);
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color-text);
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">var</span>(--color-surface-alt);
}
</code></pre>
<h3 id="في-القيم-العشوائية">في القيم العشوائية</h3>
<p><em>في القيم العشوائية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/ebb34efbc0bb013bc0991bc30b67de2b3ee9de0dd7e65b6bb7bd9da7a9eb3351.html">افتح المثال</a><a href="#playground-css-semantic-colors">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Long form --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shadow-[0_2px_8px_var(--color-text)/10]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Shorthand --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-(--color-brand)/20&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>استخدم أسماء ألوان دلالية</strong> تصف الغرض لا المظهر</li>
<li><strong>اضبط <code>color-scheme</code> على الجذر</strong> لواجهة أصلية متسقة</li>
<li><strong>اختبر مع</strong> وضع الألوان المفروضة من أجل إمكانية الوصول</li>
<li><strong>وفّر مبدّل سمة</strong> يحترم تفضيل النظام</li>
<li><strong>استخدم متغيّرات CSS</strong> لتبديل السمة وقت التشغيل</li>
</ol>
`,p={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,p as default,t as headings,c as html,l as slug,e as title};
