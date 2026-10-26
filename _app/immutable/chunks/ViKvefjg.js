const s="kinney",a="tailwind",n="Tailwind CSS",t="data-attribute-variants",l="صيغ خصائص البيانات",p=[{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:3,id:"فحص-الوجود-مبسط-في-v4",text:"فحص الوجود (مبسّط في v4)"},{depth:3,id:"فحص-القيمة",text:"فحص القيمة"},{depth:2,id:"مع-group-وpeer",text:"مع Group وPeer"},{depth:2,id:"اختصارات-مخصصة",text:"اختصارات مخصصة"},{depth:2,id:"أنماط-شائعة",text:"أنماط شائعة"},{depth:3,id:"واجهات-التبويبات",text:"واجهات التبويبات"},{depth:3,id:"عناصر-الأكورديون",text:"عناصر الأكورديون"},{depth:3,id:"التحقق-من-النماذج",text:"التحقق من النماذج"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],e=`<p>نسّق العناصر بناءً على خصائص بياناتها — مثالي للحالة التي تديرها أطر JavaScript.</p>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<h3 id="فحص-الوجود-مبسط-في-v4">فحص الوجود (مبسّط في v4)</h3>
<p><em>فحص الوجود (مبسّط في v4) — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/f0d1f5e83346cd30a29c2fe02dc5a5bef61a5431b906f6fe6940eb4932564769.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Styles apply when data-active exists --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-active</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;opacity-50 data-active:opacity-100&quot;</span>&gt;</span>Active content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Common boolean attributes --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-current</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-current:font-bold&quot;</span>&gt;</span>Current item<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-loading</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-loading:animate-pulse&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h3 id="فحص-القيمة">فحص القيمة</h3>
<p><em>فحص القيمة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/80f892658d07ce659bb4989f33f1975c88304f48831d190196991bbd16e4cb3a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Styles apply when attribute has specific value --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-theme</span>=<span class="hljs-string">&quot;dark&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-white data-[theme=dark]:bg-gray-900&quot;</span>&gt;</span>Theme-aware container<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-state</span>=<span class="hljs-string">&quot;expanded&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-12 data-[state=expanded]:h-auto&quot;</span>&gt;</span>Expandable content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="مع-group-وpeer">مع Group وPeer</h2>
<p><em>مع Group وPeer — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/8bc6bcda79272a0b9d855bbed5555b28f96be7a491280e31fc81f70956ac0391.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Style based on parent&#x27;s data attribute --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group&quot;</span> <span class="hljs-attr">data-status</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group-data-[status=error]:border-red-500&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden group-data-[status=error]:block&quot;</span>&gt;</span>Error!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Style based on sibling&#x27;s data attribute --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-visible</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;peer&quot;</span>&gt;</span>Toggle<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden peer-data-visible:block&quot;</span>&gt;</span>Shown when sibling has data-visible<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="اختصارات-مخصصة">اختصارات مخصصة</h2>
<p>عرّف صيغ خصائص بيانات قابلة لإعادة الاستخدام في CSS:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--data-state-active</span>: [data-state= <span class="hljs-string">&#x27;active&#x27;</span>];
  <span class="hljs-attr">--data-state-loading</span>: [data-state= <span class="hljs-string">&#x27;loading&#x27;</span>];
  <span class="hljs-attr">--data-orientation-vertical</span>: [data-orientation= <span class="hljs-string">&#x27;vertical&#x27;</span>];
}
</code></pre>
<p>ثم استخدمها:</p>
<p><em>اختصارات مخصصة — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/b62f519d10cd02d8e9eb57a11e0e6629465a05de6e5441faa6d972c3624242fc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-state</span>=<span class="hljs-string">&quot;loading&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-state-loading:opacity-50&quot;</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h2 id="أنماط-شائعة">أنماط شائعة</h2>
<h3 id="واجهات-التبويبات">واجهات التبويبات</h3>
<p><em>واجهات التبويبات — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/f9beb25beff28a28ba9808b5a079d447699d3eb96e66f7646fd2c8f6851bac6b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-selected</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-selected:border-b-2&quot;</span>&gt;</span>Tab 1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h3 id="عناصر-الأكورديون">عناصر الأكورديون</h3>
<p><em>عناصر الأكورديون — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/616bba8200728c767651487f6d4ed971fe6a242fcf07377c2e610f4b8dfecbc0.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-expanded</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-expanded:pb-4&quot;</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="التحقق-من-النماذج">التحقق من النماذج</h3>
<p><em>التحقق من النماذج — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/68f3eecffa8e1ecdcb42b7ab7d4fa7d03cc53603e5a9e18ce6bc82585212549f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">data-invalid</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;data-invalid:ring-red-500&quot;</span> /&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ul>
<li>استخدم خصائص البيانات للحالة التي يديرها JavaScript</li>
<li>أبقِ أسماء الخصائص دلالية ومتسقة</li>
<li>عرّف صيغًا مخصصة للأنماط كثيرة الاستخدام</li>
<li>تذكّر: يحتاج Tailwind إلى أسماء أصناف كاملة في ملفات المصدر</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
