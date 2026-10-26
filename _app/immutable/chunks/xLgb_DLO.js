const s="kinney",a="tailwind",n="Tailwind CSS",l="color-mix",t="دالة color-mix()",e=[{depth:2,id:"كيف-تعمل",text:"كيف تعمل"},{depth:2,id:"معدلات-الشفافية-في-tailwind",text:"مُعدِّلات الشفافية في Tailwind"},{depth:2,id:"جميع-خصائص-الألوان-تدعمها",text:"جميع خصائص الألوان تدعمها"},{depth:2,id:"الاستخدام-المباشر-في-css-المخصص",text:"الاستخدام المباشر في CSS المخصّص"},{depth:2,id:"في-القيم-العشوائية",text:"في القيم العشوائية"},{depth:2,id:"فضاءات-الألوان",text:"فضاءات الألوان"},{depth:2,id:"أمثلة-عملية",text:"أمثلة عملية"},{depth:3,id:"خلفيات-ملونة",text:"خلفيات مُلوَّنة"},{depth:3,id:"حالات-التمرير",text:"حالات التمرير"},{depth:3,id:"تأثيرات-متدرجة-الطبقات",text:"تأثيرات متدرّجة الطبقات"},{depth:2,id:"دعم-المتصفحات",text:"دعم المتصفحات"}],p=`<p><code>color-mix()</code> هي دالة CSS لخلط الألوان. يستخدم Tailwind 4 داخليًا لكل مُعدِّلات الشفافية.</p>
<h2 id="كيف-تعمل">كيف تعمل</h2>
<p>الصيغة الأساسية:</p>
<pre><code class="language-css"><span class="hljs-attribute">color</span>-mix(in srgb, red <span class="hljs-number">50%</span>, blue <span class="hljs-number">50%</span>)
<span class="hljs-comment">/* Results in purple */</span>
</code></pre>
<h2 id="معدلات-الشفافية-في-tailwind">مُعدِّلات الشفافية في Tailwind</h2>
<p>عندما تستخدم صيغة شفافية مثل <code>/50</code>:</p>
<p><em>مُعدِّلات الشفافية في Tailwind — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/0c8f3eec48365071115d74618d544fa77f81ecc6280e8deaa72d9473dfd82112.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500/50&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يولّد Tailwind:</p>
<pre><code class="language-css"><span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, <span class="hljs-built_in">var</span>(--color-blue-<span class="hljs-number">500</span>) <span class="hljs-number">50%</span>, transparent);
</code></pre>
<ul>
<li>تعمل مع أي قيمة لون</li>
<li>تدعم متغيّرات CSS</li>
<li>تتعامل مع <code>currentColor</code></li>
<li>أداء أفضل</li>
</ul>
<h2 id="جميع-خصائص-الألوان-تدعمها">جميع خصائص الألوان تدعمها</h2>
<p><em>جميع خصائص الألوان تدعمها — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/5ea2ab76cdf1d9dd86a80b3144d5981a76b85f6975d836d80f928e9dfcd87ba1.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Text with opacity --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-red-600/75&quot;</span>&gt;</span>75% opacity text<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Border with opacity --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-green-500/30&quot;</span>&gt;</span>30% opacity border<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Shadow with opacity --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shadow-lg shadow-purple-500/40&quot;</span>&gt;</span>40% opacity shadow<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- CurrentColor with opacity --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border border-current/50 text-blue-600&quot;</span>&gt;</span>50% current color<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="الاستخدام-المباشر-في-css-المخصص">الاستخدام المباشر في CSS المخصّص</h2>
<p>استخدم <code>color-mix()</code> في أنماطك الخاصة:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.custom-bg</span> {
  <span class="hljs-comment">/* Mix brand colors */</span>
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">color-mix</span>(in oklch, <span class="hljs-built_in">var</span>(--color-primary) <span class="hljs-number">70%</span>, <span class="hljs-built_in">var</span>(--color-secondary) <span class="hljs-number">30%</span>);
}

<span class="hljs-selector-class">.hover-state</span> {
  <span class="hljs-comment">/* Lighten on hover */</span>
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">color-mix</span>(in srgb, <span class="hljs-built_in">var</span>(--color-brand) <span class="hljs-number">80%</span>, white <span class="hljs-number">20%</span>);
}
</code></pre>
<h2 id="في-القيم-العشوائية">في القيم العشوائية</h2>
<p><em>في القيم العشوائية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/8bb5ddd20f219abb76fcede0796c73e635e975bc564828f4134e750134b96aa1.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Custom color mixing --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-[color-mix(in_srgb,theme(colors.blue.500)_60%,white)]&quot;</span>&gt;</span>Custom mixed background<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="فضاءات-الألوان">فضاءات الألوان</h2>
<p>تدعم <code>color-mix()</code> فضاءات ألوان مختلفة:</p>
<pre><code class="language-css"><span class="hljs-comment">/* sRGB - Standard */</span>
<span class="hljs-attribute">color</span>-mix(in srgb, red, blue)

<span class="hljs-comment">/* OKLCH - Perceptually uniform */</span>
<span class="hljs-attribute">color</span>-mix(in oklch, red, blue)

<span class="hljs-comment">/* HSL - Hue based */</span>
<span class="hljs-attribute">color</span>-mix(in hsl, red, blue)
</code></pre>
<p>يستخدم Tailwind <code>srgb</code> افتراضيًا من أجل التوافق.</p>
<h2 id="أمثلة-عملية">أمثلة عملية</h2>
<h3 id="خلفيات-ملونة">خلفيات مُلوَّنة</h3>
<p><em>خلفيات مُلوَّنة — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/2a3f2eb98ffe44a5f4e536b246ab9026742ba3dbe2e1b27167c820ac9f24c881.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500/10&quot;</span>&gt;</span>Very light blue tint<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="حالات-التمرير">حالات التمرير</h3>
<p><em>حالات التمرير — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/bf300387c3a3ecb2684b58a2b9c746c98294e64da342aa2d69b6a38fd76a593a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-purple-600 hover:bg-purple-600/80&quot;</span>&gt;</span>Hover for transparency<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h3 id="تأثيرات-متدرجة-الطبقات">تأثيرات متدرّجة الطبقات</h3>
<p><em>تأثيرات متدرّجة الطبقات — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/2f0528a3106675f30d4099e670a024097047ee43c27016c6008c2a280a72685f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-gradient-to-r from-red-500/50 to-blue-500/50&quot;</span>&gt;</span>Semi-transparent gradient<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="دعم-المتصفحات">دعم المتصفحات</h2>
<ul>
<li>Chrome 111+</li>
<li>Safari 16.4+</li>
<li>Firefox 113+</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
