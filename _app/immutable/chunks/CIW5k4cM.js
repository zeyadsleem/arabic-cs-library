const s="kinney",a="tailwind",n="Tailwind CSS",l="colors-and-css-variables",t="تكامل متغيّرات CSS",p=[{depth:2,id:"تعريف-ألوان-مخصصة",text:"تعريف ألوان مخصصة"},{depth:2,id:"تجاوز-الألوان-الافتراضية",text:"تجاوز الألوان الافتراضية"},{depth:2,id:"استخدام-الألوان-كمتغيرات-css",text:"استخدام الألوان كمتغيّرات CSS"},{depth:3,id:"في-css-المخصص",text:"في CSS المخصص"},{depth:3,id:"في-القيم-العشوائية",text:"في القيم العشوائية"},{depth:2,id:"معدلات-العتامة",text:"معدِّلات العتامة"},{depth:2,id:"تغييرات-مهمة-في-tailwind-4",text:"تغييرات مهمة في Tailwind 4"},{depth:3,id:"افتراضي-لون-الحد",text:"افتراضي لون الحد"},{depth:3,id:"افتراضي-لون-الحلقة",text:"افتراضي لون الحلقة"},{depth:2,id:"السمات-الديناميكية",text:"السمات الديناميكية"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],e=`<p>ينقل Tailwind الإعداد من JavaScript إلى CSS باستخدام توجيه <code>@theme</code> ومتغيّرات CSS.</p>
<h2 id="تعريف-ألوان-مخصصة">تعريف ألوان مخصصة</h2>
<p>أضف ألوانًا في ملف CSS باستخدام <code>@theme</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-brand</span>: <span class="hljs-number">#5b21b6</span>;
  <span class="hljs-attr">--color-neon-pink</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">71.7%</span> <span class="hljs-number">0.25</span> <span class="hljs-number">360</span>);
  <span class="hljs-attr">--color-neon-lime</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">91.5%</span> <span class="hljs-number">0.258</span> <span class="hljs-number">129</span>);
}
</code></pre>
<p>يولّد هذا أدوات مثل <code>bg-brand</code> و<code>text-neon-pink</code> وما شابه.</p>
<h2 id="تجاوز-الألوان-الافتراضية">تجاوز الألوان الافتراضية</h2>
<p>استبدل ألوانًا محددة:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-blue-500</span>: <span class="hljs-number">#1e40af</span>; <span class="hljs-comment">/* Override default blue-500 */</span>
}
</code></pre>
<p>امسح مجموعات ألوان كاملة:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-gray-</span>*: initial; <span class="hljs-comment">/* Remove all default grays */</span>
  <span class="hljs-attr">--color-gray-50</span>: <span class="hljs-number">#f8fafc</span>;
  <span class="hljs-attr">--color-gray-100</span>: <span class="hljs-number">#f1f5f9</span>;
  <span class="hljs-comment">/* Define your custom grays */</span>
}
</code></pre>
<p>ابدأ من الصفر:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss/preflight&#x27;</span>;
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss/utilities&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-</span>*: initial; <span class="hljs-comment">/* Remove ALL defaults */</span>
  <span class="hljs-comment">/* Define your entire palette */</span>
}
</code></pre>
<h2 id="استخدام-الألوان-كمتغيرات-css">استخدام الألوان كمتغيّرات CSS</h2>
<p>تُعرَّض ألوان السمة كمتغيّرات CSS:</p>
<h3 id="في-css-المخصص">في CSS المخصص</h3>
<pre><code class="language-css"><span class="hljs-selector-class">.custom-element</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--color-brand);
  <span class="hljs-attribute">border-color</span>: <span class="hljs-built_in">var</span>(--color-neon-pink);
}
</code></pre>
<h3 id="في-القيم-العشوائية">في القيم العشوائية</h3>
<p><em>في القيم العشوائية — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/d5c13ff05aa9a0a53809fa2fd70f3d8548a7e37e8a84cff1345d2d296c587de9.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Long form --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-[var(--color-neon-pink)]&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Shorthand (v4) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-(--color-brand)&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="معدلات-العتامة">معدِّلات العتامة</h2>
<p>تعمل مع كل تعريفات الألوان:</p>
<p><em>معدِّلات العتامة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/68bb03605d4c610f22189796c340538dbfd9cbe782c4ec90b0918c4a75ad39c7.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-brand/50&quot;</span>&gt;</span>50% opacity<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-neon-pink/75&quot;</span>&gt;</span>75% opacity<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-[var(--color-custom)]/20&quot;</span>&gt;</span>20% opacity<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="تغييرات-مهمة-في-tailwind-4">تغييرات مهمة في Tailwind 4</h2>
<h3 id="افتراضي-لون-الحد">افتراضي لون الحد</h3>
<p><em>افتراضي لون الحد — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/490c65ef2eef35486a26c95676aef108baa6213f3cde7b19cf99e61108c459d7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- v3: defaulted to gray-200 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--Tailwind 4: defaults to currentColor --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border border-gray-200&quot;</span>&gt;</span>Explicit color needed<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="افتراضي-لون-الحلقة">افتراضي لون الحلقة</h3>
<p><em>افتراضي لون الحلقة — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/26d74d233c1e5ef322cdc70c1bdb5a19b2d56a2afae372964d6f4064c1f06a04.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- v3: 3px blue ring --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ring&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--Tailwind 4: 1px currentColor --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ring-3 ring-blue-500&quot;</span>&gt;</span>Explicit width and color<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="السمات-الديناميكية">السمات الديناميكية</h2>
<p>تتيح متغيّرات CSS تبديل السمة وقت التشغيل:</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-surface</span>: white;
  <span class="hljs-attr">--color-text</span>: black;
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-text</span>: white;
}
</code></pre>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-brand</span>: <span class="hljs-number">#5b21b6</span>;
  <span class="hljs-attr">--color-neon-pink</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">71.7%</span> <span class="hljs-number">0.25</span> <span class="hljs-number">360</span>);
  <span class="hljs-attr">--color-custom</span>: <span class="hljs-number">#7c3aed</span>;
  <span class="hljs-attr">--color-surface</span>: white;
  <span class="hljs-attr">--color-text</span>: black;
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-number">#1a1a1a</span>;
  <span class="hljs-attr">--color-text</span>: white;
}
</code></pre>
<p><em>السمات الديناميكية — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/6e0c04076282d461c8b93f19216dacf1d924b00bba8f656686e4a89524cbb60e.html">افتح المثال</a><a href="#playground-css-brand">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">data-theme</span>=<span class="hljs-string">&quot;dark&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-surface text-text&quot;</span>&gt;</span>Automatically themed<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>استخدم أسماء دلالية</strong> لألوان العلامة: <code>--color-primary</code> و<code>--color-accent</code></li>
<li><strong>جمّع الألوان المترابطة</strong>: <code>--color-gray-*</code> و<code>--color-brand-*</code></li>
<li><strong>استفد من OKLCH</strong> للحصول على لوحات متسقة</li>
<li><strong>وثّق ألوانك</strong> بتعليقات في <code>@theme</code></li>
<li><strong>اختبر معدِّلات العتامة</strong> مع ألوانك المخصصة</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
