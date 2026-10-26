const s="kinney",a="tailwind",n="Tailwind CSS",l="flexbox-aligning-individual-items",e="محاذاة العناصر المفردة",t=[{depth:2,id:"التحكم-في-محاذاة-عنصر-مفرد-عبر-align-self",text:"التحكّم في محاذاة عنصر مفرد عبر align-self"},{depth:3,id:"أمثلة",text:"أمثلة"},{depth:3,id:"القيم-التعسفية-والخصائص-المخصصة",text:"القيم التعسّفية والخصائص المخصّصة"},{depth:2,id:"المحاذاة-المتجاوبة",text:"المحاذاة المتجاوبة"},{depth:3,id:"نقاط-توقف-نافذة-العرض",text:"نقاط توقّف نافذة العرض"},{depth:3,id:"استعلامات-الحاوية",text:"استعلامات الحاوية"}],p=`<p>بينما تتحكّم <code>align-items</code> في محاذاة جميع العناصر الفرعية المباشرة في حاوية flex، تتيح <code>align-self</code> ضبطًا دقيقًا لمحاذاة عنصر مفرد. يوفّر Tailwind أدوات <code>self-*</code> لهذا الغرض.</p>
<p>تتجاوز خاصية <code>align-self</code> قيمة <code>align-items</code> في الحاوية بالنسبة إلى عنصر flex محدّد. فمثلًا، إذا كانت الحاوية تستخدم <code>align-items: center</code>، فإن <code>align-self: flex-start</code> على عنصر فرعي يحاذيه إلى بداية المحور العرضي، بينما تبقى بقية العناصر موسّطة.</p>
<p>تدير أدوات <code>self-*</code> في Tailwind خاصية <code>align-self</code>.</p>
<h2 id="التحكم-في-محاذاة-عنصر-مفرد-عبر-align-self">التحكّم في محاذاة عنصر مفرد عبر <code>align-self</code></h2>
<p>تضبط خاصية <code>align-self</code> محاذاة عنصر flex أو grid داخل سطر flex أو منطقة grid الخاصة به، متجاوزةً <code>align-items</code> في الحاوية.</p>
<p>يوفّر Tailwind أدوات <code>align-self</code> التالية:</p>
<ul>
<li><code>self-auto</code>: تعيد الضبط إلى قيمة <code>align-items</code> في الحاوية، أو تعتمد <code>stretch</code> الافتراضية إذا كانت <code>align-items: normal</code>.</li>
<li><code>self-start</code>: تحاذي العنصر إلى بداية المحور العرضي للحاوية.</li>
<li><code>self-end</code>: تحاذي العنصر إلى نهاية المحور العرضي للحاوية.</li>
<li><code>self-center</code>: تحاذي العنصر على طول مركز المحور العرضي للحاوية.</li>
<li><code>self-stretch</code>: تمدّ العنصر ليملأ المحور العرضي للحاوية، متجاهلةً أبعاده ما لم تكن مقيّدة.</li>
<li><code>self-baseline</code>: تحاذي خط أساس العنصر مع بقية العناصر في سطر flex أو صف grid نفسه.</li>
<li><code>self-baseline-last</code>: تحاذي خط أساس العنصر مع خط الأساس الأخير في الحاوية.</li>
<li><code>self-end-safe</code>: تحاذي العنصر إلى النهاية، وإلى البداية إذا جرى تجاوز الحد.</li>
<li><code>self-center-safe</code>: تحاذي العنصر إلى الوسط، وإلى البداية إذا جرى تجاوز الحد.</li>
</ul>
<h3 id="أمثلة">أمثلة</h3>
<p>افترض أن الحاوية تملك <code>display: flex</code> أو <code>display: inline-flex</code>.</p>
<h4>إعادة الضبط إلى محاذاة الحاوية</h4>
<p>افتراضيًا تكون <code>align-self</code> مساوية لـ <code>auto</code>، فتورث <code>align-items</code> من الحاوية. وتجعل <code>self-auto</code> هذا السلوك صريحًا.</p>
<p><em>إعادة الضبط إلى محاذاة الحاوية — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/b45674f244ae48e63aeddbee44f073bb0895056b7f8a7f5688e5b1cd1dcaf998.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-auto rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (inherits center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (inherits center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (inherits center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>المحاذاة إلى البداية</h4>
<p>محاذي <code>self-start</code> يحاذي العنصر إلى بداية المحور العرضي، بغضّ النظر عن <code>align-items</code>.</p>
<p><em>المحاذاة إلى البداية — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/abebf41349c9ecf0b326f4c81e1ca25832ef9f91a2ddd9f8d9f8bf006cce764b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-start rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (aligns to start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (aligns to center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (aligns to center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>المحاذاة إلى النهاية</h4>
<p>محاذي <code>self-end</code> يحاذي العنصر إلى نهاية المحور العرضي.</p>
<p><em>المحاذاة إلى النهاية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/ead473ac4ed2df6f12fbfb2cbd21e6bd0e30787de63a3ec9ea4587c41d432a57.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (aligns to center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (aligns to center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-end rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (aligns to end)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>توسيط عنصر واحد</h4>
<p>يوسّط <code>self-center</code> عنصرًا محدّدًا عندما يكون لبقية العناصر محاذاة مختلفة.</p>
<p><em>توسيط عنصر واحد — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/36a95356ba16d53a53ac4a59048da96707c3f44cd65bfc7c24f21854a917100e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (aligns to start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-center rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (aligns to center)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (aligns to start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يُعدّ <code>self-center-safe</code> بديلًا أكثر أمانًا لأنه يتجنّب تجاوز الحد.</p>
<h4>تمديد عنصر واحد</h4>
<p>يملأ <code>self-stretch</code> العنصر المحور العرضي، متجاوزًا حجمه أو <code>align-items</code>.</p>
<p><em>تمديد عنصر واحد — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/134b447397330b136062c69df905f8f6947f9c2623b0adadd06eecc2b67a82b4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (aligns to start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-stretch rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2 (stretches)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (aligns to start)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h4>محاذاة خطوط الأساس</h4>
<p>يحاذي <code>self-baseline</code> خطوط أساس النصوص للعناصر، حتى مع اختلاف ارتفاعات المحتوى. ويحاذي <code>self-baseline-last</code> إلى خط الأساس الأخير.</p>
<p><em>محاذاة خطوط الأساس — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/9a8090763c84578e8d8b4504623da354ebf199fa1383d2c13063275e81245769.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-stretch gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 1 (stretches)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-baseline rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>
    Item 2 (aligns to baseline)
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3 (stretches)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="القيم-التعسفية-والخصائص-المخصصة">القيم التعسّفية والخصائص المخصّصة</h3>
<p>للقيم التي لا تغطيها الأدوات المُعرَّفة مسبقًا، أو لاستخدام متغيّرات CSS، يدعم Tailwind صيغة <code>self-[]</code> (القيم التعسّفية) وصيغة <code>self-()</code> (الخصائص المخصّصة).</p>
<p>على سبيل المثال، <code>self-[flex-start]</code> مثل <code>self-start</code>. و<code>self-(--my-custom-alignment)</code> تضبط <code>align-self</code> على قيمة <code>--my-custom-alignment</code>.</p>
<h2 id="المحاذاة-المتجاوبة">المحاذاة المتجاوبة</h2>
<p>يمكن أن تتغيّر محاذاة العنصر المفرد بحسب حجم نافذة العرض أو الحاوية. تدعم أدوات <code>self-*</code> في Tailwind التصميم المتجاوب عبر البادئات.</p>
<h3 id="نقاط-توقف-نافذة-العرض">نقاط توقّف نافذة العرض</h3>
<p>طبّق أدوات <code>self-*</code> بشكل مشروط مع بادئات نقاط التوقّف (مثل <code>sm:</code> و<code>md:</code> و<code>lg:</code>).</p>
<p><em>نقاط توقّف نافذة العرض — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/fc9a009ddd6cd20459382d022dfd7f0fd0b4cd4c9f6584616926d51f21abddee.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6 md:items-center&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-end rounded-lg bg-blue-500 p-4 text-white md:self-auto&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يُحاذى العنصر 1 إلى <code>end</code> افتراضيًا. وفي الشاشات المتوسطة (<code>md</code>) فما فوق، توسّط الحاوية العناصر (<code>md:items-center</code>)، فيرث العنصر 1 ذلك (<code>md:self-auto</code>) ويُوسَّط أيضًا.</p>
<h3 id="استعلامات-الحاوية">استعلامات الحاوية</h3>
<p>اضبط محاذاة العنصر بحسب حجم الحاوية الأب باستخدام <code>@container</code> ومتغيّرات مثل <code>@sm:</code> و<code>@md:</code>.</p>
<p><em>استعلامات الحاوية — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/964f1f3cea954c43b6f3234f91c9ac9127f06b227283cef63a5cabb628b995ea.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;@container flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-start rounded-lg bg-blue-500 p-4 text-white @md:self-end&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يُحاذى العنصر 1 إلى <code>start</code> افتراضيًا. وعندما تبلغ الحاوية الأم <code>@container</code> نقطة توقّف <code>@md</code>، يُحاذى العنصر 1 إلى <code>end</code> (<code>@md:self-end</code>).</p>
<p>يتيح دمج أدوات <code>align-self</code> مع المزايا المتجاوبة والقيم التعسّفية إنشاء تخطيطات متجاوبة دقيقة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,p as html,l as slug,e as title};
