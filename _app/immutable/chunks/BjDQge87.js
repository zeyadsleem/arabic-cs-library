const s="kinney",a="tailwind",n="Tailwind CSS",l="grid-multi-column-layouts-columns-utility",t="التخطيطات متعددة الأعمدة",p=[{depth:2,id:"تعريف-التخطيطات-متعددة-الأعمدة",text:"تعريف التخطيطات متعددة الأعمدة"},{depth:3,id:"ضبط-عدد-الأعمدة",text:"ضبط عدد الأعمدة"},{depth:3,id:"ضبط-عرض-الأعمدة",text:"ضبط عرض الأعمدة"},{depth:3,id:"التحكم-في-الفاصل-بين-الأعمدة",text:"التحكم في الفاصل بين الأعمدة"},{depth:2,id:"المرونة-مع-القيم-العشوائية",text:"المرونة مع القيم العشوائية"},{depth:3,id:"عدد-أعمدة-عشوائي",text:"عدد أعمدة عشوائي"},{depth:3,id:"عرض-عمود-عشوائي",text:"عرض عمود عشوائي"},{depth:3,id:"استخدام-متغيرات-css-مع-القيم-العشوائية",text:"استخدام متغيّرات CSS مع القيم العشوائية"},{depth:2,id:"التخطيطات-متعددة-الأعمدة-المستجيبة",text:"التخطيطات متعددة الأعمدة المستجيبة"},{depth:2,id:"تخصيص-إعدادات-الأعمدة-المتعددة",text:"تخصيص إعدادات الأعمدة المتعددة"},{depth:2,id:"تحسينات-tailwind-4",text:"تحسينات Tailwind 4"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],e=`<p>تُعدّ التخطيطات متعددة الأعمدة في CSS مفيدة للمحتوى الغنيّ بالنص مثل المقالات. وتوزّع خاصية <code>columns</code> في CSS المحتوى على عدد محدّد من الأعمدة أو على أعمدة بعرض أدنى. ويقدّم Tailwind CSS أدوات تُطابِق هذه الخاصية.</p>
<h2 id="تعريف-التخطيطات-متعددة-الأعمدة">تعريف التخطيطات متعددة الأعمدة</h2>
<p>أدوات Tailwind الخاصة بخاصية <code>columns</code> في CSS تنشئ حاويات متعددة الأعمدة. ويمكنك تحديد عدد الأعمدة أو عرض العمود المثالي.</p>
<h3 id="ضبط-عدد-الأعمدة">ضبط عدد الأعمدة</h3>
<p>استخدم أدوات <code>columns-&lt;number&gt;</code> لعدد ثابت من الأعمدة. فمثلًا، يقسم <code>columns-3</code> المحتوى إلى ثلاثة أعمدة. ويحسب المتصفح عرض العمود ليملأ الحاوية.</p>
<p><em>ضبط عدد الأعمدة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/7038114c98a3d142f3c399bdb81e94ecdfd0d5af8942f35d53498b00645e7e28.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-3 gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
    beatae vitae dicta sunt explicabo.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-yellow-200 p-3&quot;</span>&gt;</span>
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>وهذا مفيد لتصميم متّسق عبر أحجام الشاشات.</p>
<h3 id="ضبط-عرض-الأعمدة">ضبط عرض الأعمدة</h3>
<p>على العكس من ذلك، حدّد عرض العمود المثالي، فينشئ المتصفح بقدر ما يتّسع من أعمدة بهذا العرض التقريبي. وتقدّم Tailwind أدوات مثل <code>columns-xs</code> إلى <code>columns-7xl</code> تقابل عروضًا مُعرَّفة مسبقًا (فمثلًا <code>columns-sm</code> هو <code>24rem</code>).</p>
<p><em>ضبط عرض الأعمدة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/1b73d273441fda95204dfc46596b07d03f05d6b74e394b9aa68b779b4d50394f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-sm gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>
    This content flows into columns roughly 24rem wide. The number of columns adjusts based on
    container width.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>
    Wider containers get more columns. Narrower containers may reduce column count to maintain
    minimum width.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>
    Each paragraph represents content that will flow naturally across the available columns,
    creating a balanced layout.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>الأعمدة القائمة على العرض مناسبة للتصاميم المستجيبة التي يحدّد فيها المحتوى عدد الأعمدة.</p>
<h3 id="التحكم-في-الفاصل-بين-الأعمدة">التحكم في الفاصل بين الأعمدة</h3>
<p>تضيف المتصفحات فاصلًا افتراضيًا صغيرًا بين الأعمدة. وتحكّم في ذلك بأدوات <code>gap-*</code> إلى جانب <code>columns-*</code>.</p>
<p><em>التحكم في الفاصل بين الأعمدة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/2577a180fb3061d3df5775cfc199d941880430fc393b13774548f315baeff600.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-2 gap-8 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>Content for the first column with a larger gap.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>Content for the second column.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>
    Additional content that will flow across columns naturally.
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تطبّق أدوات <code>gap-*</code> خاصية <code>column-gap</code>. وفي التخطيطات متعددة الأعمدة، تتحكّم أدوات <code>gap</code> أو <code>gap-x</code> في <code>column-gap</code>.</p>
<h2 id="المرونة-مع-القيم-العشوائية">المرونة مع القيم العشوائية</h2>
<p>تتيح صيغة القيم العشوائية في Tailwind أي قيمة CSS في أصناف الأدوات. وهذا مفيد إذا لم تناسب قيم <code>columns</code> المُعرَّفة مسبقًا، أو مع قيم ديناميكية مثل متغيّرات CSS.</p>
<h3 id="عدد-أعمدة-عشوائي">عدد أعمدة عشوائي</h3>
<p>حدّد عدد أعمدة مخصّصًا عبر <code>columns-[&lt;number&gt;]</code>.</p>
<p><em>عدد أعمدة عشوائي — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/c3bb218fdcffcbecb5c35666913cb50e84a32988c8b0f0dff28b6f027c2d809f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-[5] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>Column content 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>Column content 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>Column content 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-yellow-200 p-3&quot;</span>&gt;</span>Column content 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-purple-200 p-3&quot;</span>&gt;</span>Column content 5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="عرض-عمود-عشوائي">عرض عمود عشوائي</h3>
<p>حدّد عرض عمود مخصّصًا عبر <code>columns-[&lt;value&gt;]</code>، حيث <code>&lt;value&gt;</code> أي طول في CSS.</p>
<p><em>عرض عمود عشوائي — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/45508072518e388dfd318ced9b1b4efa06d484568fd5c83b98e594547a78217d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-[300px] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>Content flows into columns ~300px wide<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>Each column will be approximately 300 pixels wide<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>
    The number of columns adjusts based on container width
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="استخدام-متغيرات-css-مع-القيم-العشوائية">استخدام متغيّرات CSS مع القيم العشوائية</h3>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--article-column-width</span>: <span class="hljs-number">20rem</span>;
  <span class="hljs-attr">--another-width-var</span>: <span class="hljs-number">18rem</span>;
}
</code></pre>
<p>أشِر إلى متغيّرات CSS عبر <code>columns-[var(--my-column-width)]</code> أو عبر الاختصار <code>columns-(&lt;custom-property&gt;)</code>.</p>
<p><em>استخدام متغيّرات CSS مع القيم العشوائية — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/c6fb806f8a87d101a1e34c44939a3c054b05c0112682b204ba77302fd9a0fa69.html">افتح المثال</a><a href="#playground-css-column-vars">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 columns-[var(--article-column-width)] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>Column width controlled by a CSS variable<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>
    Dynamic column sizing based on CSS custom properties
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-(--another-width-var) gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>Another way to use a CSS variable<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-yellow-200 p-3&quot;</span>&gt;</span>Shorthand syntax for custom properties<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يتيح ذلك تحكمًا متقدّمًا، مثل ضبط عروض الأعمدة بناءً على قيم السمة.</p>
<h2 id="التخطيطات-متعددة-الأعمدة-المستجيبة">التخطيطات متعددة الأعمدة المستجيبة</h2>
<p>تعمل قدرات التصميم المستجيب في Tailwind مع أدوات الأعمدة المتعددة عبر الصيغ الخاصة بنقاط التوقف المحدّدة.</p>
<p>طبّق أدوات <code>columns-*</code> مختلفة عند نقاط التوقف المختلفة.</p>
<p><em>التخطيطات متعددة الأعمدة المستجيبة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/21eebe3e49cc7ed1708fefbd8e44fd90b8513a50d042c9610274c53a5bdb5d8e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;columns-1 gap-4 rounded-lg bg-gray-100 p-4 sm:columns-2 md:columns-3 lg:columns-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 1 column on small, 2 on medium, 3 on large, 4 on extra large screens --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-blue-200 p-3&quot;</span>&gt;</span>This article layout adjusts columns by screen size.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-red-200 p-3&quot;</span>&gt;</span>Single column on small mobile devices for readability.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-green-200 p-3&quot;</span>&gt;</span>Transitions to multiple columns as screen widens.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-yellow-200 p-3&quot;</span>&gt;</span>Ensures optimal reading experience across devices.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-4 rounded bg-purple-200 p-3&quot;</span>&gt;</span>Content flows naturally across available columns.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يبيّن هذا المثال عمودًا واحدًا يبدأ بالجوال أولًا، ويُستبدل عند نقاط التوقف <code>sm</code> و<code>md</code> و<code>lg</code>.</p>
<h2 id="تخصيص-إعدادات-الأعمدة-المتعددة">تخصيص إعدادات الأعمدة المتعددة</h2>
<p>تستخدم Tailwind تهيئة قائمة على CSS أولًا عبر التوجيه <code>@theme</code>. خصّص عروض الأعمدة المُعرَّفة مسبقًا (<code>columns-xs</code> إلى <code>columns-7xl</code>) أو أضف عروضًا جديدة بتعريف متغيّرات CSS داخل <code>@theme</code>. وهذه تُطابِق نطاق <code>--container-*</code>.</p>
<pre><code class="language-css"><span class="hljs-comment">/* In your main CSS file */</span>
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-comment">/* Extend default container widths */</span>
  <span class="hljs-attr">--container-8xl</span>: <span class="hljs-number">90rem</span>; <span class="hljs-comment">/* New larger width */</span>

  <span class="hljs-comment">/* Override default container widths */</span>
  <span class="hljs-attr">--container-sm</span>: <span class="hljs-number">20rem</span>; <span class="hljs-comment">/* Make &#x27;sm&#x27; columns narrower */</span>

  <span class="hljs-comment">/* Define a custom column width */</span>
  <span class="hljs-attr">--article-column-width</span>: <span class="hljs-number">350px</span>;
}
</code></pre>
<p>ستصبح أداة <code>columns-8xl</code> الجديدة متاحة، وسيستخدم <code>columns-sm</code> القيمة المحدّثة. واستخدم <code>--article-column-width</code> مع <code>columns-[var(--article-column-width)]</code>.</p>
<p>استبدل القيم الافتراضية أو عطّلها بضبطها على <code>initial</code> داخل <code>@theme</code>.</p>
<h2 id="تحسينات-tailwind-4">تحسينات Tailwind 4</h2>
<p>تستفيد أدوات الأعمدة المتعددة من تحسينات Tailwind 4:</p>
<ul>
<li>
<p>يقدّم محرّك Oxide المبنيّ على Rust عمليات بناء أسرع.</p>
</li>
<li>
<p>يجعل اكتشاف المحتوى بلا إعداد العملية أكثر بساطة.</p>
</li>
<li>
<p>التهيئة القائمة على CSS أولًا عبر <code>@theme</code> أكثر أصالة.</p>
</li>
<li>
<p>القيم العشوائية لمتغيّرات CSS تستخدم أحيانًا صيغة <code>-(...)</code>، مع بقاء <code>[&lt;value&gt;]</code> هي الأساسية.</p>
</li>
</ul>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>يبسّط Tailwind CSS التخطيطات متعددة الأعمدة المستجيبة عبر أدوات <code>columns</code> و<code>gap</code>. وهو يدعم الأعمدة الثابتة أو القائمة على العرض والتعديلات المستجيبة. وتوفّر القيم العشوائية والتهيئة القائمة على CSS أولًا في Tailwind 4 مرونة إضافية.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
