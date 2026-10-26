const s="kinney",a="tailwind",n="Tailwind CSS",t="building-a-card-list",l="بناء قائمة بطاقات",p=[{depth:2,id:"إضافة-بنية-البطاقة-وتنسيقها",text:"إضافة بنية البطاقة وتنسيقها"},{depth:2,id:"لماذا-لن-تنجح-space-y-هنا",text:"لماذا لن تنجح Space-Y هنا"},{depth:2,id:"تقديم-محدد-not-first",text:"تقديم محدِّد not-first"},{depth:2,id:"تعزيز-التسلسل-البصري",text:"تعزيز التسلسل البصري"},{depth:2,id:"إضافة-دعم-الوضع-الداكن",text:"إضافة دعم الوضع الداكن"},{depth:2,id:"لماذا-not-first-أساسي",text:"لماذا not-first أساسي"},{depth:2,id:"تحديات",text:"تحديات"}],e=`<p>لنبدأ ببنية HTML الأساسية لقائمة بسيطة من بطاقات الإشعارات.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/b1dcdfbd70432aab1331ff996ee71109ed0549d94a45249fa9f0879dc8415039.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hey! Are we still on for lunch tomorrow?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Team standup meeting starts in 15 minutes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Your password will expire in 3 days. Update it now to avoid interruption.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لدينا ثلاث بطاقات إشعارات مكدّسة رأسيًا، لكنها بلا أي تنسيق وتتداخل معًا. لنحوّلها إلى قائمة مصقولة يكون فيها كل عنصر منفصلًا بصريًا عن غيره — باستثناء العنصر الأول.</p>
<h2 id="إضافة-بنية-البطاقة-وتنسيقها">إضافة بنية البطاقة وتنسيقها</h2>
<p>أولًا، لنطبّق تنسيق بطاقة احترافيًا باستخدام الأنماط من <a href="https://stevekinney.com/courses/tailwind/building-a-card">درس البطاقة</a> لإرساء أساس سليم.</p>
<p><em>إضافة بنية البطاقة وتنسيقها — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/16d6bad07f8cd2cb100f02f363dc0ae1e8cd4919a4cf892732ba5799fab11f0b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-md rounded-lg bg-white shadow-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Hey! Are we still on for lunch tomorrow?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Team standup meeting starts in 15 minutes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>
      Your password will expire in 3 days. Update it now to avoid interruption.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الحاوية والبطاقة:</p>
<ul>
<li><code>max-w-md mx-auto</code>: يقصر العرض على 448px ويوسّط الحاوية</li>
<li><code>bg-white rounded-lg shadow-sm</code>: خلفية بيضاء مع زوايا ناعمة وظل خفيف</li>
<li><code>p-4</code>: حشوة 16px في كل بطاقة لتباعد مريح</li>
<li>تدرّج طباعي باستخدام <code>font-semibold</code> و<code>text-sm</code> و<code>text-xs</code> لبنية معلومات واضحة</li>
<li><code>text-slate-600</code> و<code>text-slate-400</code>: ألوان هادئة للمحتوى الثانوي</li>
</ul>
<p>الآن تبدو البطاقات احترافية، لكنها ما زالت تتداخل معًا — لا يوجد فصل بصري بين الإشعارات الفردية.</p>
<h2 id="لماذا-لن-تنجح-space-y-هنا">لماذا لن تنجح Space-Y هنا</h2>
<p>قد تفكّر في استخدام <code>space-y-4</code> لإضافة تباعد بين البطاقات، وسينجح ذلك مع البطاقات المنفصلة. لكن ماذا لو أردنا أن تبدو البطاقات متصلة كقائمة متماسكة مع بقائها متمايزة بصريًا؟ هنا تتألق فواصل الحدود.</p>
<p>لنجرّب إضافة حدود إلى كل بطاقة ونرَ المشكلة:</p>
<p><em>لماذا لن تنجح Space-Y هنا — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/89948dafa7a597f580491d6b341793b631d017b7a43cb48065329ddaa7d7e13e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-md rounded-lg bg-white shadow-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t border-slate-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Hey! Are we still on for lunch tomorrow?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t border-slate-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Team standup meeting starts in 15 minutes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-t border-slate-200 p-4&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>
      Your password will expire in 3 days. Update it now to avoid interruption.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ثمة مشكلة: البطاقة الأولى لها حد أعلى الحاوية، ما يخلق فراغًا بصريًا غير مستحسن بين زاوية الحاوية المستديرة والمحتوى. نريد الحدود فواصل بين العناصر، لا حدًا يحيط بالحاوية كلها.</p>
<h2 id="تقديم-محدد-not-first">تقديم محدِّد not-first</h2>
<p>هذا بالضبط ما تحلّه أدوات <code>not-first:*</code> في Tailwind. لنزل الحد العلوي غير المرغوب من العنصر الأول فقط.</p>
<p><em>تقديم محدِّد not-first — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/8d637d728fdc9d04119ebe8f5c1d2b620912d8d76a90d8ebb9b993fbc4ce7f21.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-md rounded-lg bg-white shadow-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 not-first:border-t not-first:border-slate-200&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Hey! Are we still on for lunch tomorrow?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 not-first:border-t not-first:border-slate-200&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Team standup meeting starts in 15 minutes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 not-first:border-t not-first:border-slate-200&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>
      Your password will expire in 3 days. Update it now to avoid interruption.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>سحر <code>not-first:*</code>:</p>
<ul>
<li><code>not-first:border-t</code>: يضيف حدًا علويًا لكل عنصر ليس أول ابن</li>
<li><code>not-first:border-slate-200</code>: لون حد رمادي فاتح لفصل خفيف</li>
</ul>
<p>ممتاز! الآن لدينا فواصل نظيفة بين العناصر دون حد غير مستحسن فوق العنصر الأول. وهذا يكافئ محدِّد CSS <code>:not(:first-child)</code> لكنه أوضح وأسهل صيانة بكثير.</p>
<h2 id="تعزيز-التسلسل-البصري">تعزيز التسلسل البصري</h2>
<p>لنضف بعض الصقل لتبدو القائمة أكثر تفاعلًا وتنظيمًا.</p>
<p><em>تعزيز التسلسل البصري — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/020fc55eac8f0324005e4f496faca72a67809df6cfc07fb11638ebdff3ae8744.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-sm&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Hey! Are we still on for lunch tomorrow?<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>Team standup meeting starts in 15 minutes<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900&quot;</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600&quot;</span>&gt;</span>
      Your password will expire in 3 days. Update it now to avoid interruption.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400&quot;</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات التفاعل:</p>
<ul>
<li><code>overflow-hidden</code> على الحاوية: يضمن ألا تمتد خلفيات التمرير خارج الزوايا المستديرة</li>
<li><code>hover:bg-slate-50</code>: تغيّر خلفية خفيف يشير إلى أن العناصر تفاعلية</li>
<li><code>transition-colors</code>: يحرّك تغيّر لون الخلفية بسلاسة لإحساس مصقول</li>
</ul>
<p>الآن يبدو كل عنصر قابلًا للنقر ومتجاوبًا مع الحفاظ على فصل بصري واضح.</p>
<h2 id="إضافة-دعم-الوضع-الداكن">إضافة دعم الوضع الداكن</h2>
<p>لنضف صيغ الوضع الداكن لتعمل قائمتنا في أي سمة.</p>
<p><em>إضافة دعم الوضع الداكن — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/c626461f5e6bc1763cb3268d4ea010f9effa279d497895c8db38b65af346b477.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-sm dark:bg-slate-800&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900 dark:text-slate-100&quot;</span>&gt;</span>New message from Sarah<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600 dark:text-slate-300&quot;</span>&gt;</span>
      Hey! Are we still on for lunch tomorrow?
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400 dark:text-slate-400&quot;</span>&gt;</span>2 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900 dark:text-slate-100&quot;</span>&gt;</span>Calendar reminder<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600 dark:text-slate-300&quot;</span>&gt;</span>
      Team standup meeting starts in 15 minutes
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400 dark:text-slate-400&quot;</span>&gt;</span>12 minutes ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-semibold text-slate-900 dark:text-slate-100&quot;</span>&gt;</span>System update<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-1 text-sm text-slate-600 dark:text-slate-300&quot;</span>&gt;</span>
      Your password will expire in 3 days. Update it now to avoid interruption.
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2 block text-xs text-slate-400 dark:text-slate-400&quot;</span>&gt;</span>1 hour ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الوضع الداكن:</p>
<ul>
<li><code>dark:bg-slate-800</code>: خلفية داكنة للحاوية</li>
<li><code>not-first:dark:border-slate-700</code>: لون حد أفتح للخلفيات الداكنة</li>
<li><code>dark:text-slate-100</code> و<code>dark:text-slate-300</code>: تباين نص مناسب للسمات الداكنة</li>
<li><code>dark:hover:bg-slate-700</code>: حالة تمرير داكنة تبدو طبيعية</li>
</ul>
<p>لاحظ كيف يمكننا دمج المعدِّلات: <code>not-first:dark:border-slate-700</code> يعني «طبّق لون الحد الداكن على العناصر التي ليست أول أبناء في الوضع الداكن».</p>
<h2 id="لماذا-not-first-أساسي">لماذا not-first أساسي</h2>
<p>يحل محدِّد <code>not-first:*</code> نمط تصميم شائعًا لا تستطيع <code>space-y</code> أو <code>gap</code> معالجته:</p>
<p><strong>استخدم <code>space-y</code> عندما</strong>: تريد تباعدًا فعليًا بين عناصر منفصلة (بطاقات تطفو منفصلة)</p>
<p><strong>استخدم <code>not-first:border</code> عندما</strong>: تريد عناصر متصلة بفواصل بصرية (عناصر قائمة، عناصر قوائم، صفوف جداول)</p>
<p>يظهر هذا النمط في كل مكان في الواجهات الحديثة:</p>
<ul>
<li>عناصر قائمة التنقل بخطوط فاصلة</li>
<li>عناصر القوائم في الأشرطة الجانبية</li>
<li>صفوف الجداول بفواصل حدود</li>
<li>سلاسل التعليقات بخطوط فاصلة</li>
<li>مجموعات الإعدادات بفواصل أقسام</li>
</ul>
<p>الفكرة الأساسية أن العنصر الأول في القائمة يجب ألا يكون فوقه «فاصل» أبدًا لأنه لا يوجد شيء يفصله عنه.</p>
<h2 id="تحديات">تحديات</h2>
<p>جرّب بناء هذه التنويعات:</p>
<ol>
<li><strong>مؤشرات الحالة</strong>: أضف نقاطًا ملوّنة قبل عنوان كل إشعار تدل على الأولوية (أحمر، أصفر، أخضر) باستخدام <code>not-first:*</code> لضمان محاذاة متسقة</li>
<li><strong>عناصر قابلة للتوسّع</strong>: ادمجها مع الأنماط من <a href="https://stevekinney.com/courses/tailwind/building-details-disclosure">درس كشف التفاصيل</a> لجعل كل إشعار قابلًا للتوسّع بتفاصيل إضافية</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
