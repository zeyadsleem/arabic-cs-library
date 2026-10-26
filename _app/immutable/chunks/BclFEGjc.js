const s="kinney",a="tailwind",n="Tailwind CSS",l="has-solutions",t="حلول تحديات أدوات has-*",p=[{depth:2,id:"التحدي-1-حاوية-مربع-الاختيار",text:"التحدي 1: حاوية مربع الاختيار"},{depth:2,id:"التحدي-2-تغذية-راجعة-للتحقق-من-النماذج",text:"التحدي 2: تغذية راجعة للتحقق من النماذج"},{depth:2,id:"التحدي-3-محتوى-شرطي",text:"التحدي 3: محتوى شرطي"},{depth:2,id:"التحدي-4-استجابة-متعددة-العناصر",text:"التحدي 4: استجابة متعدّدة العناصر"},{depth:2,id:"التحدي-5-استهداف-الخصائص-المعقدة",text:"التحدي 5: استهداف الخصائص المعقّدة"}],c=`<h2 id="التحدي-1-حاوية-مربع-الاختيار">التحدي 1: حاوية مربع الاختيار</h2>
<p>لنبدأ بشيء كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;agree&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;agree&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 1</strong>: أضف أصناف التخطيط الأساسية إلى الحاوية</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-3 rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;agree&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;agree&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 2</strong>: أضف أداة <code>has-*</code> لتغيير الخلفية عندما يكون مربع الاختيار محدَّدًا</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-3 rounded-lg border border-slate-200 p-4 has-[input:checked]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;agree&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;agree&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 3</strong>: أضف تغيير لون الحد للحصول على تغذية راجعة كاملة</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-3 rounded-lg border border-slate-200 p-4 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;agree&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;agree&quot;</span>&gt;</span>I agree to the terms<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تستهدف البادئة <code>has-[input:checked]:</code> الحالة التي تكون فيها الحاوية تحتوي على عنصر إدخال محدَّد. يمكنك تطبيق أدوات <code>has-*</code> متعددة لتغييرات بصرية مختلفة.</p>
<h2 id="التحدي-2-تغذية-راجعة-للتحقق-من-النماذج">التحدي 2: تغذية راجعة للتحقق من النماذج</h2>
<p><strong>الهدف</strong>: إنشاء حاوية حقل نموذج تعرض اللون الأخضر للإدخال الصحيح والأحمر للإدخال غير الصحيح.</p>
<p>لنبدأ بشيء كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;email&quot;</span>&gt;</span>Email Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 1</strong>: أضف تنسيق الحاوية وتخطيطها</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium text-slate-900&quot;</span>&gt;</span>Email Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">required</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block w-full rounded border-slate-300 px-3 py-2&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 2</strong>: أضف تنسيق الحالة الصحيحة باستخدام <code>has-[input:valid]</code></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium text-slate-900&quot;</span>&gt;</span>Email Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">required</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block w-full rounded border-slate-300 px-3 py-2&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 3</strong>: أضف تنسيق الحالة غير الصحيحة وانتقالات سلسة</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4 transition-colors has-[input:invalid]:border-red-500 has-[input:invalid]:bg-red-50 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium text-slate-900&quot;</span>&gt;</span>Email Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;email&quot;</span>
    <span class="hljs-attr">required</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block w-full rounded border-slate-300 px-3 py-2&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تعمل حالات التحقق في HTML5 (<code>:valid</code> و<code>:invalid</code>) تلقائيًا مع <code>required</code> و<code>type=&quot;email&quot;</code>. تستجيب الحاوية لحالة التحقق في الإدخال دون أي JavaScript.</p>
<h2 id="التحدي-3-محتوى-شرطي">التحدي 3: محتوى شرطي</h2>
<p><strong>الهدف</strong>: بناء سؤال في استبيان يكشف حقل نص عندما يُختار خيار «سيّئ».</p>
<p>لنبدأ بشيء كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>How was your experience?<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;good&quot;</span> /&gt;</span> Good<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;poor&quot;</span> /&gt;</span> Poor<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Please tell us what went wrong:<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 1</strong>: أضف البنية وأخفِ السؤال المتابع افتراضيًا</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>How was your experience?<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;good&quot;</span> /&gt;</span> Good&lt;/label
    &gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;poor&quot;</span> /&gt;</span> Poor&lt;/label
    &gt;
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 hidden&quot;</span>&gt;</span>Please tell us what went wrong:<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 2</strong>: استهدف قيمة زر الاختيار المحدّد لإظهار المحتوى</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>How was your experience?<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;good&quot;</span> /&gt;</span> Good&lt;/label
    &gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;poor&quot;</span> /&gt;</span> Poor&lt;/label
    &gt;
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 hidden has-[input[value=&#x27;poor&#x27;]:checked]:block&quot;</span>&gt;</span>
    Please tell us what went wrong:
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 3</strong>: أكمل قسم السؤال المتابع بتنسيق صحيح</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>How was your experience?<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-3 space-y-2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;good&quot;</span> /&gt;</span> Good&lt;/label
    &gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex items-center gap-2&quot;</span>
      &gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;rating&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;poor&quot;</span> /&gt;</span> Poor&lt;/label
    &gt;
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-4 hidden rounded bg-yellow-50 p-3 has-[input[value=&#x27;poor&#x27;]:checked]:block&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Please tell us what went wrong:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-yellow-300 text-sm&quot;</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يمكنك استهداف قيم نماذج معيّنة باستخدام محدّدات الخصائص مثل <code>input[value='poor']</code>. يصنع الصنف <code>hidden</code> المقترن مع <code>has-*:block</code> سلوك إظهار وإخفاء دون أي JavaScript.</p>
<h2 id="التحدي-4-استجابة-متعددة-العناصر">التحدي 4: استجابة متعدّدة العناصر</h2>
<p><strong>الهدف</strong>: تصميم حاوية لنموذج اتصال تستجيب باللون الأزرق عند تركيز حقل النص، وباللون الأخضر عند تركيز حقل النص متعدّد الأسطر.</p>
<p>لنبدأ بشيء كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Subject<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Message<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 1</strong>: أضف بنية النموذج الأساسية وتنسيقه</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Subject<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-slate-300 px-3 py-2&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Message<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-slate-300 px-3 py-2&quot;</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">&quot;3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 2</strong>: أضف استجابات مختلفة لتركيز الإدخال مقابل تركيز حقل النص متعدّد الأسطر</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border border-slate-200 p-4 transition-colors has-[input:focus]:border-blue-500 has-[input:focus]:bg-blue-50 has-[textarea:focus]:border-green-500 has-[textarea:focus]:bg-green-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Subject<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-slate-300 px-3 py-2&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium&quot;</span>&gt;</span>Message<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 block w-full rounded border-slate-300 px-3 py-2&quot;</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">&quot;3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يمكنك استهداف أنواع عناصر مختلفة (<code>input</code> مقابل <code>textarea</code>) بأدوات <code>has-*</code> مختلفة. ستستجيب الحاوية بصورة تختلف حسب العنصر التابع الذي يحمل التركيز.</p>
<h2 id="التحدي-5-استهداف-الخصائص-المعقدة">التحدي 5: استهداف الخصائص المعقّدة</h2>
<p><strong>الهدف</strong>: إنشاء منطقة رفع ملفات تستجيب لحالات التركيز <em>و</em> تُظهر حدًا متقطّعًا حقول الملفات.</p>
<p>لنبدأ بشيء كهذا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter URL&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>or<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 1</strong>: أنشئ بنية منطقة الرفع</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 border-slate-300 p-6 text-center&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter URL&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded border-slate-300 px-3 py-2 text-sm&quot;</span>
    /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-500&quot;</span>&gt;</span>or<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full text-sm&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 2</strong>: أضف كشف حقل الملف مع حد متقطّع</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 border-slate-300 p-6 text-center has-[input[type=&#x27;file&#x27;]]:border-dashed&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter URL&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded border-slate-300 px-3 py-2 text-sm&quot;</span>
    /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-500&quot;</span>&gt;</span>or<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full text-sm&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الخطوة 3</strong>: أضف حالات تركيز مختلفة لأنواع الحقول المختلفة</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg border-2 border-slate-300 p-6 text-center transition-all has-[input[type=&#x27;file&#x27;]]:border-dashed has-[input[type=&#x27;file&#x27;]:focus]:border-green-500 has-[input[type=&#x27;file&#x27;]:focus]:bg-green-50 has-[input[type=&#x27;text&#x27;]:focus]:border-blue-500 has-[input[type=&#x27;text&#x27;]:focus]:bg-blue-50&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-3&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter URL&quot;</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded border-slate-300 px-3 py-2 text-sm&quot;</span>
    /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-sm text-slate-500&quot;</span>&gt;</span>or<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full text-sm&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يمكنك الجمع بين محدّدات معقّدة متعددة مثل <code>input[type='file']:focus</code> لاستهداف أنواع عناصر محدّدة في حالات محدّدة. ينتج عن الصنف <code>transition-all</code> تحريك سلس بين جميع تركيبات الحالات المختلفة.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
