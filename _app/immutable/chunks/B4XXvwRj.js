const s="kinney",a="tailwind",n="Tailwind CSS",l="building-a-form-input",t="بناء حقل نموذج",p=[{depth:2,id:"إضافة-البنية-والتخطيط",text:"إضافة البنية والتخطيط"},{depth:2,id:"إنشاء-فصل-بصري",text:"إنشاء فصل بصري"},{depth:2,id:"تنسيق-حقل-الإدخال",text:"تنسيق حقل الإدخال"},{depth:2,id:"إضافة-الحدود-والمحيطات",text:"إضافة الحدود والمحيطات"},{depth:2,id:"إضافة-حالات-التركيز",text:"إضافة حالات التركيز"},{depth:2,id:"تحسينات-الخطوط",text:"تحسينات الخطوط"}],e=`<p>لنبدأ ببنية HTML الأساسية لدينا.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/ac25455cfbe3bfe687727ae48f19ae9088037eed1da233eefef4f85e3c0b8230.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إنه حقل نموذج أساسي، لكنه يبدو بسيطًا جدًا. لنحوّله إلى شيء يليق بتطبيق ويب حديث.</p>
<h2 id="إضافة-البنية-والتخطيط">إضافة البنية والتخطيط</h2>
<p>أولًا، لنؤسس تسلسلًا بصريًا سليمًا عبر تنسيق التسمية وإضافة بعض التباعد الأساسي.</p>
<p><em>إضافة البنية والتخطيط — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/d0177f83fc99bbf9ac128a1927951591a1a42f2ea483ad4e1a1d692b9f4861b3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<ul>
<li><code>block</code>: يجعل التسمية تشغل العرض الكامل وتجلس فوق الحقل</li>
<li><code>font-medium</code>: يضيف وزن خط متوسطًا (500) لتسلسل هرمي أفضل</li>
<li><code>text-slate-900</code>: لون شبه أسود لقراءة ممتازة</li>
</ul>
<h2 id="إنشاء-فصل-بصري">إنشاء فصل بصري</h2>
<p>الآن لنضف بعض المساحة المتنفسة بين التسمية وحقل الإدخال.</p>
<p><em>إنشاء فصل بصري — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/c06f4f73ffe2a453bbb9c5730a8ad85b7aa1b214cb3823fd404dc15288cdbf97.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يمكنك إضافة هامش إلى أحد العنصرين أو كليهما، لكن يمكنك أيضًا استخدام <a href="https://stevekinney.com/courses/tailwind/spacing-and-dividing-utilities">أدوات التباعد</a>.</p>
<h2 id="تنسيق-حقل-الإدخال">تنسيق حقل الإدخال</h2>
<p>حان وقت جعل حقل الإدخال يبدو احترافيًا بأبعاد وألوان وحدود مناسبة.</p>
<p><em>تنسيق حقل الإدخال — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/6338221d34a938aa47381d4b1741dd0beaf4f249d4b509c7f6b5863822968171.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
    <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-slate-900&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<ul>
<li><code>block</code>: يجعل حقل الإدخال عنصر كتلة لتحكم كامل</li>
<li><code>w-full</code>: يشغل الحقل العرض الكامل لحاويته</li>
<li><code>rounded-md</code>: يضيف استدارة حدود 6px لمظهر حديث وودود</li>
<li><code>bg-white</code>: خلفية بيضاء صريحة (مهمة للاتساق)</li>
<li><code>px-3</code>: حشو أفقي 12px لتباعد نصي مريح</li>
<li><code>py-1.5</code>: حشو رأسي 6px لأهداف لمس مناسبة</li>
<li><code>text-slate-900</code>: لون نص غامق لتباين عالٍ</li>
</ul>
<h2 id="إضافة-الحدود-والمحيطات">إضافة الحدود والمحيطات</h2>
<p>الآن لنضف حدًا مناسبًا وحالات تركيز باستخدام أدوات المحيط في Tailwind.</p>
<p><em>إضافة الحدود والمحيطات — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/18f0c15d6c1405e3ed91db6cbba08671655bf08619f29f8a47de732481f88ded.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
    <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-400&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<ul>
<li><code>outline-1</code>: عرض محيط 1px (أكثر موثوقية من الحدود لحقول النماذج)</li>
<li><code>-outline-offset-1</code>: الإزاحة السالبة تضع المحيط داخل العنصر</li>
<li><code>outline-slate-400</code>: لون فاتح نسبيًا لحد خفيف غير مشتت</li>
</ul>
<p>استخدام <code>outline</code> بدلًا من <code>border</code> يمنع انزياح التخطيط ويوفر اتساقًا أفضل بين المتصفحات.</p>
<h2 id="إضافة-حالات-التركيز">إضافة حالات التركيز</h2>
<p>لنضف حالة تركيز تفاعلية توفّر تغذية بصرية واضحة.</p>
<p><em>إضافة حالات التركيز — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/6981638b50b9113b3df2454a2cf5429000298a4b1a4d99d7294948937c9bdb20.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
    <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<ul>
<li><code>focus:outline-2</code>: محيط أثخن بسماكة 2px عند التركيز</li>
<li><code>focus:-outline-offset-2</code>: الإزاحة السالبة تنشئ تأثير حلقة داخلية</li>
<li><code>focus:outline-indigo-600</code>: لون العلامة (النيلي) لحالة التركيز</li>
</ul>
<p>تستخدم حالة التركيز محيطًا أثخن مع أسلوب الإزاحة السالبة نفسه، ما ينشئ مؤشرًا بصريًا واضحًا دون تغيير أبعاد حقل الإدخال.</p>
<p>سنتحدث أكثر عن <a href="https://stevekinney.com/courses/tailwind/focus-states">حالات التركيز</a> بعد قليل.</p>
<h2 id="تحسينات-الخطوط">تحسينات الخطوط</h2>
<p>لنحسّن الخطوط لكل من التسمية ونص حقل الإدخال، بما يشمل تنسيق النص النائب.</p>
<p><em>تحسينات الخطوط — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/dc7c2981968074add4ce824a79d5cacac6cb68c7ce23002c69ac9185246cb05e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">&quot;username&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block text-sm font-medium text-slate-900&quot;</span>&gt;</span>Username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
    <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;username&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your Name Here&quot;</span>
  /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<ul>
<li><code>text-sm</code> على التسمية: حجم خط 14px، مناسب لتسميات النماذج</li>
<li><code>text-base</code> على الحقل: حجم خط 16px يمنع التكبير التلقائي على الأجهزة المحمولة</li>
<li><code>placeholder:text-slate-400</code>: لون رمادي أفتح للنص النائب، ما ينشئ تسلسلًا هرميًا واضحًا</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
