const s="kinney",n="tailwind",e="Tailwind CSS",a="building-a-button",l="بناء زر",t=[{depth:2,id:"إضافة-استدارة-الحدود",text:"إضافة استدارة الحدود"},{depth:2,id:"ضبط-الخطوط",text:"ضبط الخطوط"},{depth:2,id:"إضافة-عمق-خفيف-بظل",text:"إضافة عمق خفيف بظل"},{depth:2,id:"إضافة-أنماط-لحالات-التفاعل",text:"إضافة أنماط لحالات التفاعل"},{depth:3,id:"إضافة-أنماط-التركيز",text:"إضافة أنماط التركيز"},{depth:2,id:"تحديات",text:"تحديات"}],p=`<p>عندما تحدثنا آخر مرة، كان لدينا زر يعمل هكذا.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/139d3f7fc703e82e2ee00fc9e0c3b1a24a244d69a6ad4a11ce391c12105c9df5.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>يبدو الآن كزر بلا شك، لكني أظن أننا نستطيع أن نفعل ما هو أفضل قليلًا.</p>
<h2 id="إضافة-استدارة-الحدود">إضافة استدارة الحدود</h2>
<p><em>إضافة استدارة الحدود — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/b70aae25fcf75c505d2e97af93c79773f38893ee641fcdae5fbd1815c9ba259a.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-white&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>أضفنا هنا الصنف <code>rounded-md</code>. هذا يعادل عمليًا إضافة CSS التالي إلى العنصر.</p>
<pre><code class="language-css"><span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--radius-md); <span class="hljs-comment">/* 0.375rem (6px) */</span>
</code></pre>
<p>يمكنك رؤية جميع الخيارات المختلفة <a href="https://tailwindcss.com/docs/border-radius">هنا</a>. يمنح <code>rounded-md</code> الزرَ زوايا ناعمة مستديرة. هذا ينشئ مظهرًا أكثر حداثة وودًّا مقارنة بالحواف المستطيلة الحادة. إلا إذا كنت تحب ذلك.</p>
<p>بعض الخيارات الأخرى لتجربتها:</p>
<ul>
<li><code>rounded-sm</code> (2px) لاستدارة خفيفة</li>
<li><code>rounded-lg</code> (8px) لمنحنيات أوضح</li>
<li><code>rounded-full</code> لأزرار على شكل كبسولة</li>
</ul>
<h2 id="ضبط-الخطوط">ضبط الخطوط</h2>
<p><em>ضبط الخطوط — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/15c176b380a2d1e140c5b3f15cc624177296099b27796550c5fe44e1e45ae351.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<ul>
<li><code>text-sm</code>: يضبط حجم الخط على 14px مع ارتفاع السطر المناسب. تستخدم الأزرار عادة نصًا أصغر قليلًا من نص المتن لتحسين التناسب.</li>
<li><code>font-semibold</code>: يضيف وزن خط 600، ما يجعل النص أبرز وأسهل قراءة على الخلفية الملوّنة.</li>
</ul>
<h2 id="إضافة-عمق-خفيف-بظل">إضافة عمق خفيف بظل</h2>
<p>يمكننا أيضًا إضافة ظل خفيف إلى الزر بسهولة باستخدام <code>shadow-xs</code>. هذا الصنف المساعد يعادل فعليًا إضافة CSS التالي.</p>
<pre><code class="language-css"><span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgb</span>(<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">0.05</span>);
</code></pre>
<p>ربما أنت شخص أفضل مني، لكني لا أستطيع أبدًا تذكّر صيغة ظلال الصندوق دون أن أبحث عنها. لكني <em>أستطيع</em> تذكّر <code>shadow-xs</code>.</p>
<ul>
<li><code>shadow-xs</code>: الأخف، مثالي للأزرار</li>
<li><code>shadow-sm</code>: أوضح قليلًا</li>
<li><code>shadow-md</code> و<code>shadow-lg</code>: للبطاقات والنوافذ المنبثقة</li>
</ul>
<h2 id="إضافة-أنماط-لحالات-التفاعل">إضافة أنماط لحالات التفاعل</h2>
<p>يبدأ السحر <em>حقًا</em> عندما ترى كم يسهل تنسيق الفئات الزائفة باستخدام <strong>المتغيّرات</strong>. لنفترض أننا أردنا إضافة نمط عندما يحوّم المستخدم فوق الزر — أمر معقول تمامًا، أليس كذلك؟</p>
<p><em>إضافة أنماط لحالات التفاعل — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/ad26d3639666ce93933379f2130b82e9c352c3234895f265f993a6f06f21f602.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500&quot;</span>
&gt;</span>
  Button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>بادئة المتغيّر <code>hover:</code> تعني أن هذا النمط يُطبَّق فقط عندما يحوّم المستخدم فوق الزر. نستخدم <code>blue-500</code> (أفتح من <code>blue-600</code> الافتراضي لدينا) لإنشاء تأثير إشراق.</p>
<p>تحت الغطاء، يولّد فعليًا صنف CSS التالي:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.hover</span>\\:bg-blue-<span class="hljs-number">500</span>:hover {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">var</span>(--color-blue-<span class="hljs-number">500</span>);
}
</code></pre>
<h3 id="إضافة-أنماط-التركيز">إضافة أنماط التركيز</h3>
<p>يمكننا أيضًا إضافة أنماط لحالات <a href="https://stevekinney.com/courses/tailwind/focus-states">التركيز</a> المختلفة. أنماط التركيز هذه حاسمة من أجل:</p>
<ul>
<li>مستخدمي التنقل بلوحة المفاتيح</li>
<li>مستخدمي قارئات الشاشة</li>
<li>المستخدمين ذوي الإعاقات الحركية الذين يعتمدون على التنقل بلوحة المفاتيح</li>
<li>تحقيق إرشادات إمكانية الوصول WCAG</li>
</ul>
<p><em>إضافة أنماط التركيز — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/7fd9427dc1f63a2cade5af3b5d4a3ef342e74777fdc1a91a01debab5000e4fea.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600&quot;</span>
&gt;</span>
  Button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<ul>
<li><code>focus-visible:outline-2</code>: ينشئ محيطًا بسماكة 2px عند التركيز بلوحة المفاتيح</li>
<li><code>focus-visible:outline-offset-2</code>: يضيف مسافة 2px بين الزر والمحيط</li>
<li><code>focus-visible:outline-blue-600</code>: يجعل المحيط يطابق لون الزر الأزرق</li>
</ul>
<p>سنتحدث أكثر عن هذا لاحقًا، لكن هذه هي النسخة السريعة للفرق بين <code>focus:</code> و<code>focus-visible:</code>:</p>
<ul>
<li><code>focus</code>: يُطبَّق على نقرات الفأرة والتنقل بلوحة المفاتيح معًا</li>
<li><code>focus-visible</code>: يُطبَّق فقط على التنقل بلوحة المفاتيح، ما يوفّر تجربة مستخدم أفضل</li>
</ul>
<h2 id="تحديات">تحديات</h2>
<p>جرّب أن تنشئ أحد الزرين التاليين أو كليهما:</p>
<ul>
<li>زر ثانوي.</li>
<li>زر للإجراءات المدمّرة.</li>
</ul>
<p>يمكنك أن تجد بعض الحلول الممكنة <a href="https://stevekinney.com/courses/tailwind/button-solutions">هنا</a>.</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:a,title:l,headings:t,html:p};export{s as book,n as chapter,e as chapterTitle,c as default,t as headings,p as html,a as slug,l as title};
