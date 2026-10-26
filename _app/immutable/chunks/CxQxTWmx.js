const s="kinney",a="tailwind",n="Tailwind CSS",l="has-utility",t="أدوات has-*",p=[{depth:2,id:"استجابة-الحاوية-الأساسية",text:"استجابة الحاوية الأساسية"},{depth:2,id:"حاويات-التحقق-من-النماذج",text:"حاويات التحقق من النماذج"},{depth:2,id:"أنماط-اختيار-البطاقات",text:"أنماط اختيار البطاقات"},{depth:2,id:"المحددات-المركبة-والاستهداف",text:"المحدّدات المركّبة والاستهداف"},{depth:2,id:"كشف-حالة-التنقل",text:"كشف حالة التنقل"},{depth:2,id:"اختيار-صفوف-جدول-البيانات",text:"اختيار صفوف جدول البيانات"},{depth:2,id:"لوحة-الإجراءات-المجمعة",text:"لوحة الإجراءات المجمّعة"},{depth:2,id:"لماذا-هذا-أمر-مهم-حقا",text:"لماذا هذا أمر مهم حقًا™"},{depth:3,id:"المزايا-الرئيسية",text:"المزايا الرئيسية"},{depth:3,id:"تحديات",text:"تحديات"},{depth:2,id:"أمثلة",text:"أمثلة"},{depth:3,id:"حسب-المحتوى",text:"حسب المحتوى"},{depth:2,id:"أنماط-شائعة",text:"أنماط شائعة"},{depth:2,id:"فروق-أساسية",text:"فروق أساسية"}],c=`<p>تستند أدوات <code>has-*</code> في Tailwind CSS إلى الفئة الزائفة <code>:has()</code> في CSS، وتتيح للعناصر الأب أن تنسّق نفسها بناءً على حالة أبنائها. فكّر فيها كأنها تقول: «إن كانت هذه الحاوية تحتوي على عنصر تابع يطابق الشرط <code>$condition</code>، فنسّق الحاوية هكذا.»</p>
<p>لنبدأ ببنية HTML الأساسية لدينا لاستكشاف هذه الأدوات القوية.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/b8e495266f6b29bafcc52e060b2d8d73f87ae96050d1a714b52d46fac5bff74f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;terms-0&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;terms-0&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إنه مربع اختيار وتسمية أساسيان، لكن بأدوات <code>has-*</code> يمكننا جعل الحاوية كلها تستجيب بذكاء لحالة مربع الاختيار.</p>
<h2 id="استجابة-الحاوية-الأساسية">استجابة الحاوية الأساسية</h2>
<p>أولًا، لنجعل الحاوية تستجيب لحالة مربع الاختيار التابع لها.</p>
<p><em>استجابة الحاوية الأساسية — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/995ebf5dc4a52ae6f81834d001afc8a9b88488313c587d7e275830eec5af1d90.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-3 rounded-lg border p-4 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;terms-1&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;terms-1&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-900&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنفيذ <code>has-*</code> الأساسي:</p>
<ul>
<li><code>has-[input:checked]:border-green-500</code>: عندما تحتوي الحاوية على حقل إدخال محدَّد، يصبح الحد أخضر</li>
<li><code>has-[input:checked]:bg-green-50</code>: عندما تحتوي الحاوية على حقل إدخال محدَّد، تصبح الخلفية خضراء فاتحة</li>
<li>تستجيب الحاوية كلها تلقائيًا لحالة مربع الاختيار.</li>
</ul>
<p>هذا مختلف جوهريًا عن أدوات <code>peer-*</code> — فبدلًا من أن يؤثر الأشقاء في بعضهم، يستجيب الآباء للأبناء.</p>
<h2 id="حاويات-التحقق-من-النماذج">حاويات التحقق من النماذج</h2>
<p><em>حاويات التحقق من النماذج — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/139e27eb57f558a2d13c894608b86ad5234450e8a11535ebb280bf6456fdec87.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border p-4 transition-colors has-[input:invalid]:border-red-500 has-[input:invalid]:bg-red-50 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
      <span class="hljs-attr">required</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 invalid:border-red-600 focus:border-blue-500 focus:outline-none&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border p-4 has-[input:focus]:border-blue-500 has-[input:focus]:bg-blue-50&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Password<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;password&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ميزات التحقق من النماذج:</p>
<ul>
<li><code>has-[input:valid]:border-green-500</code>: تتحول الحاوية إلى الأخضر عندما يكون الإدخال صحيحًا</li>
<li><code>has-[input:invalid]:border-red-500</code>: تتحول الحاوية إلى الأحمر عندما يكون الإدخال غير صحيح</li>
<li><code>has-[input:focus]:border-blue-500</code>: تبرز الحاوية عندما يكون الإدخال في حالة تركيز</li>
<li><code>transition-colors</code>: انتقالات حالة سلسة.</li>
</ul>
<p>توفّر حاوية حقل النموذج كلها تغذية بصرية، لا حقل الإدخال وحده.</p>
<h2 id="أنماط-اختيار-البطاقات">أنماط اختيار البطاقات</h2>
<p>لنبنِ بطاقات تفاعلية تستجيب لعناصر تحكم النماذج المتداخلة، وهي مثالية لجداول الأسعار أو اختيار الخيارات.</p>
<p><em>أنماط اختيار البطاقات — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/f6243b761e14d1371f444e0e3eecbaae9ed7536f24416e59ebcb760d74fd7331.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 md:grid-cols-3&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;plan&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;basic&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 h-4 w-4&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;basic&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold&quot;</span>&gt;</span>Basic Plan<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-600&quot;</span>&gt;</span>For individuals<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 text-xl font-bold&quot;</span>&gt;</span>$9/month<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;plan&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;pro&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 h-4 w-4&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;pro&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold&quot;</span>&gt;</span>Pro Plan<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-600&quot;</span>&gt;</span>For teams<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 text-xl font-bold&quot;</span>&gt;</span>$29/month<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;plan&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;enterprise&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-3 h-4 w-4&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;enterprise&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold&quot;</span>&gt;</span>Enterprise<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-600&quot;</span>&gt;</span>For organizations<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 text-xl font-bold&quot;</span>&gt;</span>$99/month<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق اختيار البطاقات:</p>
<ul>
<li><code>has-[input:checked]:border-blue-500</code>: البطاقة المختارة تحصل على حد أزرق</li>
<li><code>has-[input:checked]:bg-blue-50</code>: البطاقة المختارة تحصل على خلفية فاتحة</li>
<li><code>has-[input:checked]:shadow-md</code>: البطاقة المختارة تحصل على ظل مرتفع</li>
</ul>
<p>مثالية لجداول الأسعار أو مقارنات الميزات أو أي واجهة اختيار متعددة الخيارات.</p>
<h2 id="المحددات-المركبة-والاستهداف">المحدّدات المركّبة والاستهداف</h2>
<p>تدعم أدوات <code>has-*</code> محدّدات CSS المركّبة لعلاقات أب-ابن متطورة.</p>
<p><em>المحدّدات المركّبة والاستهداف — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/9b0ab93f1909621abbdb15aa02dbe68e7b2f40eb66f6f69bf257b244f6fcd23f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Multiple checkbox detection --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border p-4 has-[input:checked]:bg-slate-50&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold has-[input:checked]:text-green-700&quot;</span>&gt;</span>Project Settings<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Enable notifications<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>Auto-save drafts<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Element-specific targeting --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border p-4 has-[select:focus]:border-pink-500 has-[textarea:focus]:border-green-500&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none&quot;</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">disabled</span>&gt;</span>Choose department<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Engineering<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Design<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>Product<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-green-500 focus:outline-none&quot;</span>
        <span class="hljs-attr">rows</span>=<span class="hljs-string">&quot;2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Attribute-based targeting --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border p-4 has-[input[type=&#x27;file&#x27;]]:border-dashed&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full text-sm&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>أمثلة على المحدّدات المركّبة:</p>
<ul>
<li><code>has-[input:checked]:bg-slate-50</code>: يستجيب لأي حقل إدخال محدَّد من العناصر التابعة</li>
<li><code>has-[select:focus]:border-blue-500</code>: ألوان مختلفة لأنواع عناصر مختلفة</li>
<li><code>has-[input[type='file']]:border-dashed</code>: يستهدف أنواع إدخال محددة باستخدام الخصائص</li>
</ul>
<p>يوضّح هذا كيف يمكنك إنشاء حاويات واعية بالسياق تستجيب لعناصر تابعة مختلفة بشكل مختلف.</p>
<h2 id="كشف-حالة-التنقل">كشف حالة التنقل</h2>
<p>تتفوّق أدوات <code>has-*</code> في إنشاء أنظمة تنقل ذكية تستجيب لتفاعل المستخدم.</p>
<p><em>كشف حالة التنقل — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/2712304a0554562bcf7ade2b5ad0f4456cf655cd750c67d9ae5ab30320c84cfd.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-white shadow-sm&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Dropdown state detection --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;has-[details[open]]:bg-pink-400&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer px-4 py-3 text-sm font-medium&quot;</span>&gt;</span>More Options<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t px-4 py-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block py-1 text-sm text-slate-700&quot;</span>&gt;</span>Help<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block py-1 text-sm text-slate-700&quot;</span>&gt;</span>Support<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Search focus detection --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t p-4 has-[input:focus]:bg-blue-50&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;search&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search…&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-full rounded border-2 border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none&quot;</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
</code></pre>
<p>تحسينات التنقل:</p>
<ul>
<li><code>has-[a.active]:bg-blue-50</code>: يبرز التنقل عندما يحتوي على رابط نشط</li>
<li><code>has-[details[open]]:bg-slate-50</code>: تتغير حاوية القائمة المنسدلة عند فتحها</li>
<li><code>has-[input:focus]:bg-blue-50</code>: تبرز منطقة البحث عندما يكون الإدخال في حالة تركيز</li>
</ul>
<p>ينشئ هذا تنقلًا تستجيب فيه الأقسام كلها لحالات تفاعل المستخدم.</p>
<h2 id="اختيار-صفوف-جدول-البيانات">اختيار صفوف جدول البيانات</h2>
<p>مثالي لواجهات الإدارة حيث تحتاج الصفوف كلها إلى الاستجابة لحالات الاختيار.</p>
<p><em>اختيار صفوف جدول البيانات — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/642c0a548e887c72f42e2dbe0a36ea24cf05abba02bd0cd241580ca38ee3273c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overflow-hidden rounded-lg border bg-white&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;divide-y&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4 px-4 py-3 transition-colors has-[input:checked]:border-l-4 has-[input:checked]:border-l-blue-500 has-[input:checked]:bg-blue-50&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>Sarah Chen<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-500&quot;</span>&gt;</span>sarah@example.com<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800&quot;</span>
        &gt;</span>Active&lt;/span
      &gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-4 px-4 py-3 transition-colors has-[input:checked]:border-l-4 has-[input:checked]:border-l-blue-500 has-[input:checked]:bg-blue-50&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex-1&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>Mike Rodriguez<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-500&quot;</span>&gt;</span>mike@example.com<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800&quot;</span>
        &gt;</span>Pending&lt;/span
      &gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ميزات صفوف الجدول:</p>
<ul>
<li><code>has-[input:checked]:bg-blue-50</code>: الصفوف المختارة تحصل على إبراز.</li>
<li><code>has-[input:checked]:border-l-4</code>: الصفوف المختارة تحصل على حد أيسر بارز.</li>
<li><code>transition-colors</code>: انتقالات حالة سلسة.</li>
</ul>
<p>ينشئ هذا واجهات اختيار بديهية توفّر فيها الصفوف كلها تغذية بصرية.</p>
<h2 id="لوحة-الإجراءات-المجمعة">لوحة الإجراءات المجمّعة</h2>
<p>أنشئ لوحات إجراءات تظهر عند اختيار العناصر.</p>
<p><em>لوحة الإجراءات المجمّعة — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/03f8af7e410729b4227d90f7ebc906eb8709a3f5001288c2f4d7249158c77651.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Product grid --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid gap-4 md:grid-cols-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 h-4 w-4&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>Wireless Headphones<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>$199<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 h-4 w-4&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>Smart Watch<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>$299<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 h-4 w-4&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>Laptop Stand<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>$79<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- Bulk actions (appears when any item selected) --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hidden rounded bg-slate-50 p-4 has-[input:checked]:block&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm font-medium&quot;</span>&gt;</span>Items selected<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex gap-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border px-3 py-1 text-sm hover:bg-white&quot;</span>&gt;</span>Compare<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-600 px-3 py-1 text-sm text-white&quot;</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ميزات الإجراءات المجمّعة:</p>
<ul>
<li><code>has-[input:checked]:block hidden</code>: تظهر اللوحة عندما يُحدَّد أي مربع اختيار</li>
<li>تعمل عبر عدة عناصر تابعة تلقائيًا</li>
<li>مثالية لواجهات التجارة الإلكترونية والإدارة</li>
</ul>
<h2 id="لماذا-هذا-أمر-مهم-حقا">لماذا هذا أمر مهم حقًا™</h2>
<p>تمثّل أدوات <code>has-*</code> تحولًا جوهريًا في قدرات CSS:</p>
<ul>
<li><strong>قبل <code>:has()</code></strong>: كانت علاقات الحالة بين الأب والابن تتطلب معالجة أحداث JavaScript وإدارة الأصناف يدويًا.</li>
<li><strong>مع <code>has-*</code></strong>: تعمل الأنماط التفاعلية المتطورة بـ CSS خالص.</li>
</ul>
<h3 id="المزايا-الرئيسية">المزايا الرئيسية</h3>
<ul>
<li><strong>الأداء</strong>: لا حاجة إلى عبء JavaScript</li>
<li><strong>إمكانية الوصول</strong>: تعمل بسلاسة مع عناصر تحكم النماذج الأصلية</li>
<li><strong>قابلية الصيانة</strong>: علاقات الحالة معبَّر عنها مباشرة في الترميز</li>
<li><strong>التحسين التدريجي</strong>: تعمل حتى إن فشل تحميل CSS</li>
</ul>
<p><strong>دعم المتصفحات</strong>: مدعومة في جميع المتصفحات الحديثة (Chrome 105+، Firefox 121+، Safari 15.4+).</p>
<h3 id="تحديات">تحديات</h3>
<p>جرّب بناء هذه الاختلافات:</p>
<ol>
<li><strong>نموذج متعدد الخطوات</strong>: أنشئ نموذجًا من 3 خطوات تستجيب فيه حاوية كل خط لاكتمال الإدخال باستخدام شروط <code>has-[input:valid]</code></li>
<li><strong>مقاييس لوحة المعلومات</strong>: ابنِ بطاقات مقاييس يمكن اختيارها للمقارنة، مع لوحة مقارنة تظهر عند اختيار عدة بطاقات</li>
</ol>
<p>تفتح أدوات <code>has-*</code> إمكانات جديدة قوية لإنشاء واجهات ذكية متجاوبة مع الحفاظ على HTML الدلالي والأداء الممتاز.</p>
<h2 id="أمثلة">أمثلة</h2>
<h3 id="حسب-المحتوى">حسب المحتوى</h3>
<p><em>حسب المحتوى — المثال 9 — <a href="https://stevekinney.com/generated/playgrounds/3d14dd57bce115859ae084370b72d5e03cec944faef1150447525523c3eb1643.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;gap-4 rounded-lg border bg-white p-4 has-[img]:flex&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-64 w-64 rounded object-cover&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    Meow ipsum dolor sit amet, consectetur adipiscing kitty, sed do eiusmod tempor purr purr ut
    labore et dolore magna whiskers. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo tuna treats.
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre>
<h2 id="أنماط-شائعة">أنماط شائعة</h2>
<p><strong>مؤشرات التحقق من النماذج:</strong></p>
<p><em>أنماط شائعة — المثال 10 — <a href="https://stevekinney.com/generated/playgrounds/23398c4aa0bd9b44a67022836d335f61d7c011a9a94a8a729608aa219b3767e4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mb-2 block text-sm font-medium has-[:invalid]:text-red-500&quot;</span>&gt;</span>
  Email
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your email address&quot;</span>
    <span class="hljs-attr">required</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;w-full rounded border-2 border-slate-300 bg-white px-3 py-2 invalid:border-red-500 focus:border-blue-500 focus:outline-none&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
</code></pre>
<h2 id="فروق-أساسية">فروق أساسية</h2>
<ul>
<li><strong><code>has-*</code></strong> - ينسّق العنصر الذي يحتوي على الهدف</li>
<li><strong><code>group-has-*</code></strong> - ينسّق العنصر التابع عندما يحتوي السلف على الهدف</li>
<li><strong><code>peer-has-*</code></strong> - ينسّق الشقيق عندما يحتوي الشقيق السابق على الهدف</li>
</ul>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
