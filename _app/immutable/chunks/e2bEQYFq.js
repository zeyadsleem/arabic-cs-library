const s="kinney",a="tailwind",n="Tailwind CSS",e="caret-and-accent-color",c="لون المؤشّر ولون التمييز",t=[{depth:2,id:"لون-المؤشر",text:"لون المؤشّر"},{depth:3,id:"ضبط-لون-المؤشر-بالأصناف-المساعدة",text:"ضبط لون المؤشّر بالأصناف المساعِدة"},{depth:3,id:"استخدام-القيم-المخصصة",text:"استخدام القيم المخصّصة"},{depth:3,id:"لون-مؤشر-استجابة",text:"لون مؤشّر استجابة"},{depth:3,id:"تخصيص-مقياس-لون-المؤشر",text:"تخصيص مقياس لون المؤشّر"},{depth:2,id:"لون-التمييز",text:"لون التمييز"},{depth:3,id:"ضبط-لون-التمييز-بالأصناف-المساعدة",text:"ضبط لون التمييز بالأصناف المساعِدة"},{depth:3,id:"تغيير-العتامة",text:"تغيير العتامة"},{depth:3,id:"استخدام-القيم-المخصصة",text:"استخدام القيم المخصّصة"},{depth:3,id:"لون-تمييز-استجابة",text:"لون تمييز استجابة"},{depth:3,id:"تخصيص-مقياس-لون-التمييز",text:"تخصيص مقياس لون التمييز"}],p=`<p>يوفّر Tailwind 4.0 أصنافًا مساعِدة للتحكّم في <code>caret-color</code> (مؤشّر الإدخال النصي) و<code>accent-color</code> (عناصر التحكم في النماذج مثل مربّعات الاختيار وأزرار الاختيار) مباشرةً داخل HTML لديك.</p>
<h2 id="لون-المؤشر">لون المؤشّر</h2>
<p>تنسّق <code>caret-color</code> المؤشّر الوامض في حقول الإدخال ومناطق النص. وتقابل أصناف Tailwind هذه الخاصية في CSS، مستخدمةً ألوان سمةتك أو قيمًا مخصّصة.</p>
<h3 id="ضبط-لون-المؤشر-بالأصناف-المساعدة">ضبط لون المؤشّر بالأصناف المساعِدة</h3>
<p>استخدم أصناف <code>caret-*</code> (مثل <code>caret-blue-600</code>، <code>caret-sky-400</code>) لضبط لون المؤشّر.</p>
<p>مثال:</p>
<p><em>ضبط لون المؤشّر بالأصناف المساعِدة — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/ff00a2cc124d342cb26afc3391c6e27d4810a0cccf07baffe9f7e738185be8ac.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border caret-rose-500&quot;</span> /&gt;</span>
</code></pre>
<p>يولّد هذا CSS على نحو <code>caret-color: var(--color-rose-500);</code>. كما أنّ أصنافًا مثل <code>caret-inherit</code> و<code>caret-current</code> و<code>caret-transparent</code> متاحة أيضًا.</p>
<h3 id="استخدام-القيم-المخصصة">استخدام القيم المخصّصة</h3>
<p>للألوان المحدّدة غير الموجودة في سمتك، استخدم صيغة القيمة التعسّفية: <code>caret-[&lt;value&gt;]</code>.</p>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--custom-cursor-color</span>: <span class="hljs-number">#db2777</span>;
  <span class="hljs-attr">--brand-color</span>: <span class="hljs-number">#2563eb</span>;
}
</code></pre>
<p>مثال:</p>
<p><em>استخدام القيم المخصّصة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/2b8a51608e058a33fc019f2c9bcfa7432d9a7462bef80c3f84cc9d164b612194.html">افتح المثال</a><a href="#playground-css-caret-vars">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border caret-[#123456]&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border caret-[var(--custom-cursor-color)]&quot;</span> /&gt;</span>
</code></pre>
<h3 id="لون-مؤشر-استجابة">لون مؤشّر استجابة</h3>
<p>طَبِّق أصناف <code>caret-*</code> بشكل شرطي عند نقاط توقّف مختلفة باستخدام بادئات الاستجابة (مثل <code>md:caret-lime-600</code>).</p>
<p>مثال:</p>
<p><em>لون مؤشّر استجابة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/d6665cfeaf8e0f4bdb3bcc0a702cd56b0fc84a419e2cb5a4324b7e20753693be.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border caret-rose-500 md:caret-lime-600&quot;</span> /&gt;</span>
</code></pre>
<h3 id="تخصيص-مقياس-لون-المؤشر">تخصيص مقياس لون المؤشّر</h3>
<p>وسّع مقياس الألوان الافتراضي أو تجاوزه في ملف CSS الرئيسي باستخدام التوجيه <code>@theme</code> وفضاء الاسم <code>--color-*</code>.</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-midnight</span>: <span class="hljs-number">#1a1a2e</span>;
  <span class="hljs-attr">--color-tahiti</span>: <span class="hljs-number">#3b82f6</span>; <span class="hljs-comment">/* Overrides blue-500 */</span>
}
</code></pre>
<p>يجعل هذا <code>caret-midnight</code> و<code>caret-tahiti</code> متاحين. وهذان يصبحان متغيّرات CSS (مثل <code>--color-midnight: #1a1a2e;</code>).
ولاستبدال المقياس الافتراضي، استخدم <code>--color-*: initial;</code> قبل تعريف القيم المخصّصة.</p>
<h2 id="لون-التمييز">لون التمييز</h2>
<p>يخصّص <code>accent-color</code> لون عناصر التحكم في النماذج التي يولّدها المتصفّح.</p>
<h3 id="ضبط-لون-التمييز-بالأصناف-المساعدة">ضبط لون التمييز بالأصناف المساعِدة</h3>
<p>استخدم أصناف <code>accent-*</code> (مثل <code>accent-indigo-500</code>) المشتقّة من لوحة ألوان سمةتك.</p>
<p>مثال:</p>
<p><em>ضبط لون التمييز بالأصناف المساعِدة — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/0c931f71bfdfc4ba1ae08b7f4f8877f1a9054da952c791e651bbe3bd52f30348.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;accent-rose-500&quot;</span> /&gt;</span>
</code></pre>
<p>يولّد هذا <code>accent-color: var(--color-rose-500);</code>. كما أنّ <code>accent-inherit</code> و<code>accent-current</code> و<code>accent-transparent</code> متاحة أيضًا.</p>
<h3 id="تغيير-العتامة">تغيير العتامة</h3>
<p>اضبط عتامة لون التمييز بـ<code>/&lt;number&gt;</code> (مثل <code>accent-blue-500/50</code>). ودعم المتصفحات لعتامة لون التمييز محدود (في Firefox بشكل أساسي).</p>
<p><em>تغيير العتامة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/2aa6856ca6e056663346258a8d5887b8beccdb9125b9e1eeff0f3cf42b63af8d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;accent-blue-500/50&quot;</span> /&gt;</span>
</code></pre>
<h3 id="استخدام-القيم-المخصصة">استخدام القيم المخصّصة</h3>
<p>استخدم صيغة القيمة التعسّفية <code>accent-[&lt;value&gt;]</code> لألوان تمييز مخصّصة.</p>
<p><em>استخدام القيم المخصّصة — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/a4bc8565d8676d670451894942469eb4e43316835a145efb71abb15d05507d84.html">افتح المثال</a><a href="#playground-css-caret-vars">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;accent-[#abcdef]&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;accent-[var(--brand-color)]&quot;</span> /&gt;</span>
</code></pre>
<h3 id="لون-تمييز-استجابة">لون تمييز استجابة</h3>
<p>طَبِّق أصناف <code>accent-*</code> بشكل شرطي عند نقاط توقّف مختلفة (مثل <code>lg:accent-pink-500</code>).</p>
<p><em>لون تمييز استجابة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/f73f6a474403f6c58cc3c307aab422716ef44c7d4a125c8b712c99896875752c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;accent-blue-500 lg:accent-pink-500&quot;</span> /&gt;</span>
</code></pre>
<h3 id="تخصيص-مقياس-لون-التمييز">تخصيص مقياس لون التمييز</h3>
<p>خصّص مقياس ألوانك لألوان التمييز باستخدام <code>@theme</code> وفضاء الاسم <code>--color-*</code> في CSS لديك.</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-primary-brand</span>: <span class="hljs-built_in">oklch</span>(<span class="hljs-number">70%</span> <span class="hljs-number">0.15</span> <span class="hljs-number">150</span>);
}
</code></pre>
<p>تعريف <code>--color-primary-brand</code> يجعل <code>accent-primary-brand</code> متاحًا. ويُولَّد متغيّر CSS <code>--color-primary-brand: oklch(70% 0.15 150);</code>.
وتجاوز القيم الافتراضية أو امسح فضاء الاسم (<code>--color-*: initial;</code>) حسب الحاجة.</p>
`,l={book:s,chapter:a,chapterTitle:n,slug:e,title:c,headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,l as default,t as headings,p as html,e as slug,c as title};
