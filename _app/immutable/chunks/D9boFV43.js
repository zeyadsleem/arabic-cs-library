const s="kinney",a="tailwind",n="Tailwind CSS",t="building-details-disclosure",l="بناء بطاقة كشف بالعنصر details",p=[{depth:2,id:"إضافة-البنية-والتخطيط",text:"إضافة البنية والتخطيط"},{depth:2,id:"تقديم-الصنف-الزائف-in-open",text:"تقديم الصنف الزائف in-open"},{depth:2,id:"إضافة-مؤشرات-حالة-بصرية",text:"إضافة مؤشرات حالة بصرية"},{depth:2,id:"إضافة-انتقالات-سلسة",text:"إضافة انتقالات سلسة"},{depth:2,id:"إضافة-حالات-التمرير",text:"إضافة حالات التمرير"},{depth:2,id:"حالات-حد-معززة",text:"حالات حد معززة"},{depth:2,id:"لماذا-الصنف-الزائف-in-open-قوي",text:"لماذا الصنف الزائف in-open قوي"},{depth:2,id:"حالات-الاستخدام-الشائعة",text:"حالات الاستخدام الشائعة"},{depth:2,id:"تحديات",text:"تحديات"}],e=`<p>لنبدأ ببنية HTML الأساسية لمكوّن كشف بسيط.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/f5bffbbd5dee55f42bccc5dbc1a596cbbbcc55b3909ec86cdf9f6efdfe330c6c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>What are your shipping options?<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>إنه عنصر <code>&lt;details&gt;</code> دلالي مع <code>&lt;summary&gt;</code> يستطيع المستخدمون النقر عليه لكشف المحتوى. يوفّر المتصفح الوظيفة الأساسية، لكن المظهر بسيط جدًا. لنحوّله إلى مكوّن كشف مصقول يقدّم تغذية بصرية واضحة عند التوسّع.</p>
<h2 id="إضافة-البنية-والتخطيط">إضافة البنية والتخطيط</h2>
<p>أولًا، لنرسِ تباعدًا وتسلسلًا بصريًا سليمين لمكوّن الكشف.</p>
<p><em>إضافة البنية والتخطيط — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/e1815a305b148f0daa13391ed9ba9930368cb250ee5337c8f0fd2af16712343c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer font-medium text-slate-900&quot;</span>&gt;</span>
    What are your shipping options?
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>تحسينات التخطيط:</p>
<ul>
<li><code>rounded-lg border border-slate-200</code>: ينشئ حاوية خفيفة بزوايا ناعمة وحد فاتح</li>
<li><code>p-4</code>: يضيف حشوة 16px حول المكوّن كله لتباعد مريح</li>
<li><code>cursor-pointer</code>: يوضّح أن الملخّص قابل للنقر</li>
<li><code>font-medium text-slate-900</code>: وزن متوسط وتباين عالٍ لنص الملخّص</li>
<li><code>mt-3</code>: يضيف تباعد 12px بين الملخّص والمحتوى عند التوسّع</li>
<li><code>text-slate-600</code>: لون هادئ قليلًا لمحتوى الكشف</li>
</ul>
<p>هذا ينشئ أساسًا نظيفًا بتسلسل بصري سليم بين الملخّص والمحتوى.</p>
<h2 id="تقديم-الصنف-الزائف-in-open">تقديم الصنف الزائف in-open</h2>
<p>الآن تأتي الميزة الأساسية — لنستخدم أدوات <code>in-open:*</code> في Tailwind لتغيير لون الملخّص عندما يكون عنصر details مفتوحًا.</p>
<p><em>تقديم الصنف الزائف in-open — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/68b0394583d23e0344e7a2382f32aabab56d7859c18f29cbda5cdb8ee9443dd5.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer font-medium text-slate-900 in-open:text-blue-600&quot;</span>&gt;</span>
    What are your shipping options?
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>سحر <code>in-open:*</code>:</p>
<ul>
<li><code>in-open:text-blue-600</code>: يغيّر نص الملخّص إلى الأزرق عندما يحمل عنصر <code>&lt;details&gt;</code> خاصية <code>open</code></li>
</ul>
<p>أدوات <code>in-open:*</code> هي طريقة Tailwind لاستهداف الصنف الزائف <code>:open</code> في CSS، الذي يُطبَّق تلقائيًا عند توسّع عنصر <code>&lt;details&gt;</code>. وهذا يعني «طبّق لون نص أزرق على هذا العنصر عندما يكون عنصر details الحاوي له مفتوحًا». دون حاجة إلى JavaScript!</p>
<h2 id="إضافة-مؤشرات-حالة-بصرية">إضافة مؤشرات حالة بصرية</h2>
<p>لنضف مؤشرًا بصريًا يدور عند فتح الكشف، ليجعل تغيّر الحالة أوضح.</p>
<p><em>إضافة مؤشرات حالة بصرية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/496538f0b37335037fb7749c513c2a351612e230501cb2e890384cac1389ecaa.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex cursor-pointer items-center justify-between font-medium text-slate-900 in-open:text-blue-600&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>What are your shipping options?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-5 w-5 text-slate-400 in-open:rotate-180 in-open:text-blue-600&quot;</span>
      <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M19 9l-7 7-7-7&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>تحسينات المؤشر البصري:</p>
<ul>
<li><code>flex items-center justify-between</code>: يوزّع النص والأيقونة على العرض كله</li>
<li>غلاف <code>span</code>: يتيح وضع النص والأيقونة كلًا على حدة</li>
<li>أيقونة SVG سهم للأسفل بمقاس <code>h-5 w-5</code> (20px)</li>
<li><code>in-open:rotate-180</code>: يدير السهم 180 درجة عند الفتح ليشير إلى الأعلى</li>
<li><code>in-open:text-blue-600</code> على الأيقونة: يطابق لون نص الملخّص عند التوسّع</li>
<li><code>text-slate-400</code>: رمادي هادئ للأيقونة في الحالة المغلقة</li>
</ul>
<p>الآن يتغيّر لون النص والأيقونة معًا، وتدور الأيقونة للدلالة على الحالة الموسّعة.</p>
<h2 id="إضافة-انتقالات-سلسة">إضافة انتقالات سلسة</h2>
<p>لنضف انتقالات لتجعل تغيّرات الحالة تبدو مصقولة واحترافية.</p>
<p><em>إضافة انتقالات سلسة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/4a5b3664c91925bccb828923dc43106f902b1abc2dd6c8f12d00b7b3c6a5dc7e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors in-open:text-blue-600&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>What are your shipping options?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-5 w-5 text-slate-400 transition-all in-open:rotate-180 in-open:text-blue-600&quot;</span>
      <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M19 9l-7 7-7-7&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>تحسينات الحركة:</p>
<ul>
<li><code>transition-colors</code> على الملخّص: يحرّك تغيّر لون النص بسلاسة (200ms افتراضيًا)</li>
<li><code>transition-all</code> على الأيقونة: يحرّك الدوران وتغيّر اللون بسلاسة</li>
</ul>
<p>تجعل الانتقالات التوسّع والانطواء يبدوان متجاوبين وممتعين بدلًا من أن يكونا مفاجئين.</p>
<h2 id="إضافة-حالات-التمرير">إضافة حالات التمرير</h2>
<p>لنضف تغذية تمرير خفيفة ليشعر المستخدم بأن المكوّن أكثر تفاعلًا حتى قبل النقر.</p>
<p><em>إضافة حالات التمرير — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/ecd0218739cc1340b0685247cf520c3437dbe3649c7decb0d75fbdbf9898524b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>What are your shipping options?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700&quot;</span>
      <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M19 9l-7 7-7-7&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>تحسينات حالة التمرير:</p>
<ul>
<li><code>hover:text-slate-700</code>: نص أغمق قليلًا عند التمرير وهو مغلق</li>
<li><code>hover:text-slate-500</code>: أيقونة أغمق قليلًا عند التمرير وهو مغلق</li>
<li><code>in-open:hover:text-blue-700</code>: أزرق أغمق عند التمرير في الحالة المفتوحة</li>
<li><code>in-open:hover:text-blue-700</code> على الأيقونة: يطابق لون تمرير النص</li>
</ul>
<p>ينشئ هذا تغذية تفاعل متطورة — ألوان التمرير مرتبطة بسياق كون الكشف مفتوحًا أو مغلقًا.</p>
<h2 id="حالات-حد-معززة">حالات حد معززة</h2>
<p>أخيرًا، لنضف لمسة حد خفيفة تستجيب أيضًا للحالة المفتوحة لتماسك بصري كامل.</p>
<p><em>حالات حد معززة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/c08a51ce86858f669507b494e9d3df8d977597f631efd96be10fb2f7181e91b5.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4 transition-colors open:border-blue-200&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>What are your shipping options?<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700&quot;</span>
      <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span>
      <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">stroke-linecap</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-linejoin</span>=<span class="hljs-string">&quot;round&quot;</span> <span class="hljs-attr">stroke-width</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M19 9l-7 7-7-7&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p>تحسينات حالة الحد:</p>
<ul>
<li><code>transition-colors</code> على details: يحرّك تغيّرات لون الحد بسلاسة</li>
<li><code>open:border-blue-200</code>: حد أزرق فاتح عند التوسّع، ينشئ ارتباطًا بصريًا خفيفًا مع النص والأيقونة الزرقاوين</li>
</ul>
<p>الآن المكوّن كله — النص والأيقونة والحد — يتحوّل إلى عائلة اللون الأزرق المميز عند الفتح، ما ينشئ تجربة متماسكة ومصقولة.</p>
<h2 id="لماذا-الصنف-الزائف-in-open-قوي">لماذا الصنف الزائف in-open قوي</h2>
<p>تستفيد أدوات <code>in-open:*</code> من الصنف الزائف الأصلي <code>:open</code> الذي يطبّقه المتصفح تلقائيًا على عناصر <code>&lt;details&gt;</code> الموسّعة. وهذا ينشئ تنسيقًا متطورًا قائمًا على الحالة دون أي JavaScript:</p>
<p><strong>أساس دلالي</strong>: يوفّر عنصرا <code>&lt;details&gt;</code> و<code>&lt;summary&gt;</code> ميزات إمكانية وصول مدمجة — يعلنها قارئ الشاشة بشكل صحيح، ويعمل التنقل بلوحة المفاتيح تلقائيًا.</p>
<p><strong>صفر JavaScript</strong>: يتولّى المتصفح كل السلوك التفاعلي (التوسّع والانطواء وإدارة الحالة)، ما يجعل المكوّن خفيفًا وموثوقًا.</p>
<p><strong>تحسين تدريجي</strong>: يعمل المكوّن تمامًا دون CSS — يمكن للمستخدمين توسيع المحتوى وطيّه حتى لو تعذّر تحميل الأنماط.</p>
<p><strong>مزامنة الحالة</strong>: يبقى التنسيق البصري متزامنًا تلقائيًا مع حالة العنصر الفعلية لأنه مدفوع بالصنف الزائف الأصلي <code>:open</code> في المتصفح.</p>
<h2 id="حالات-الاستخدام-الشائعة">حالات الاستخدام الشائعة</h2>
<p>يعمل هذا النمط بامتياز مع:</p>
<ul>
<li>أقسام الأسئلة الشائعة بعدة عناصر كشف</li>
<li>لوحات إعدادات بمجموعات خيارات قابلة للتوسّع</li>
<li>توثيق بأمثلة شيفرة قابلة للطي</li>
<li>أوصاف منتجات بمواصفات مفصلة</li>
<li>قوائم تنقل بأقسام فرعية قابلة للتوسّع</li>
</ul>
<h2 id="تحديات">تحديات</h2>
<p>جرّب بناء هذه التنويعات:</p>
<ol>
<li><strong>قائمة أسئلة شائعة</strong>: أنشئ 3-4 عناصر كشف في قائمة راسية، لكل منها سؤال وجواب مختلفان، بتباعد متسق باستخدام <code>space-y-4</code></li>
<li><strong>تنويعات الأيقونة</strong>: استبدل السهم بأيقونة زائد/ناقص تغيّر رمزها (لا دورانها فقط) عند الفتح باستخدام أداتي <code>in-open:hidden</code> و<code>in-open:block</code></li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
