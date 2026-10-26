const s="kinney",a="tailwind",n="Tailwind CSS",l="building-an-image-card-hover-overlay",t="بناء بطاقة صورة مع طبقة تغطية",p=[{depth:2,id:"تقديم-نظام-group",text:"تقديم نظام group"},{depth:2,id:"وضع-محتوى-الطبقة",text:"وضع محتوى الطبقة"},{depth:2,id:"إضافة-الخلفية-وظهور-التمرير",text:"إضافة الخلفية وظهور التمرير"},{depth:2,id:"إضافة-موضع-المحتوى-والحركة",text:"إضافة موضع المحتوى والحركة"},{depth:2,id:"إضافة-انتقالات-سلسة",text:"إضافة انتقالات سلسة"},{depth:2,id:"لماذا-ينجح-نظام-group",text:"لماذا ينجح نظام group"},{depth:2,id:"أنماط-group-الشائعة",text:"أنماط group الشائعة"},{depth:2,id:"تحديات",text:"تحديات"}],c=`<p>لنبدأ ببنية HTML الأساسية لبطاقة صورة بمحتوى طبقة تغطية.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/04bd2fe17ddfe307e9b89e1c58da0a6455853f79ff18a4f4f7ab0247e227407b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لدينا بطاقة منتج مصقولة بتنسيق احترافي وتأثيرات تمرير خفيفة، مبنية على أنماط من <a href="https://stevekinney.com/courses/tailwind/building-a-card">درس البطاقة</a>. لكن ماذا لو أردنا أن تظهر معلومات المنتج كطبقة تغطية على الصورة بدلًا من ذلك؟ لنحوّلها إلى تأثير طبقة تغطية جذاب عند التمرير.</p>
<h2 id="تقديم-نظام-group">تقديم نظام group</h2>
<p>أولًا، لنقدّم أداة <code>group</code> في Tailwind، التي تتيح لنا تنسيق تأثيرات التمرير عبر عدة عناصر ابنة.</p>
<p><em>تقديم نظام group — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/a5961ba194a61c309dcc4d8a3e22ac2e5121a9ece3c77b96cab8fe4ec94602e9.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-slate-900&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-slate-600&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-slate-900&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يعلّم صنف <code>group</code> هذه الحاوية كـ«أب مجموعة». الآن يستطيع أي عنصر ابن استخدام أدوات <code>group-hover:*</code> لتنسيق نفسه بناءً على تمرير المؤشر على الأب. وهذا مثالي لتأثير طبقة التغطية حيث تحتاج عدة عناصر إلى الاستجابة لتمرير المؤشر على البطاقة كلها.</p>
<h2 id="وضع-محتوى-الطبقة">وضع محتوى الطبقة</h2>
<p>لننقل الآن محتوانا ليستقر كطبقة تغطية فوق الصورة. سنحتاج إلى إضافة تحديد موضع <code>relative</code> إلى الحاوية وتحديد موضع <code>absolute</code> إلى المحتوى.</p>
<p><em>وضع محتوى الطبقة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/ec70a2347ddf22433ad89acaca888c3fce094d01f12a42702e05914631ffdfa3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;absolute inset-0 space-y-4 p-6&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-white&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-white&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-white&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تغييرات موضع الطبقة:</p>
<ul>
<li><code>relative</code>: أُضيف إلى الحاوية لإرساء سياق تحديد الموضع للطبقة</li>
<li><code>absolute inset-0</code>: يضع المحتوى ليغطي منطقة الصورة كلها (0px من كل الحواف)</li>
<li><code>text-white</code>: غيّر كل النص إلى الأبيض للتباين مع خلفية الصورة</li>
</ul>
<p>الآن يستقر نصنا مباشرة فوق الصورة، لكنه ظاهر دائمًا ويصعب قراءته على ألوان الصورة المتفاوتة.</p>
<h2 id="إضافة-الخلفية-وظهور-التمرير">إضافة الخلفية وظهور التمرير</h2>
<p>لنضف خلفية شبه شفافة ونجعل الطبقة تظهر فقط عند تمرير المؤشر على البطاقة.</p>
<p><em>إضافة الخلفية وظهور التمرير — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/77aa7e30cd27905b1761a6a5c101026eb169ed77342cda3c561327e8dfdd2ffd.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;absolute inset-0 bg-black/60 p-6 opacity-0 group-hover:opacity-100&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-white&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-white&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-white&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق تأثير التمرير:</p>
<ul>
<li><code>bg-black/60</code>: خلفية سوداء شبه شفافة (عتامة 60%) تنشئ تباينًا مقروءًا</li>
<li><code>opacity-0</code>: يخفي الطبقة افتراضيًا (شفافة تمامًا)</li>
<li><code>group-hover:opacity-100</code>: يُظهر الطبقة عند تمرير المؤشر على مجموعة الأب</li>
<li>أُزيل <code>space-y-4</code> لأننا سنضع المحتوى يدويًا</li>
</ul>
<p>هذا أول استخدام لنا لـ<code>group-hover:</code> — تظهر الطبقة تلقائيًا عند تمرير المؤشر في أي مكان على البطاقة! صيغة <code>/60</code> هي معدِّل العتامة في Tailwind، ويكافئ <code>rgba(0, 0, 0, 0.6)</code>.</p>
<h2 id="إضافة-موضع-المحتوى-والحركة">إضافة موضع المحتوى والحركة</h2>
<p>لنحسّن تخطيط الطبقة بوضع المحتوى في الأسفل وإضافة حركة دخول سلسة.</p>
<p><em>إضافة موضع المحتوى والحركة — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/edbb4a2eeb1792b3dfc67734d6da1206dca3825ff61586e6214140b5033a133e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 group-hover:opacity-100&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;translate-y-4 space-y-2 group-hover:translate-y-0&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-white&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-white&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-white&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات التخطيط والحركة:</p>
<ul>
<li><code>flex flex-col justify-end</code>: يحاذي المحتوى إلى أسفل الطبقة باستخدام Flexbox</li>
<li><code>space-y-2</code>: يعيد التباعد الرأسي بين عناصر المحتوى</li>
<li><code>translate-y-4</code>: ينقل المحتوى 16px للأسفل افتراضيًا (حالة الإخفاء)</li>
<li><code>group-hover:translate-y-0</code>: يُزلق المحتوى إلى موضعه الطبيعي عند التمرير</li>
</ul>
<p>ينشئ هذا حركة انزلاق لأعلى خفيفة يبدأ فيها المحتوى أسفل موضعه النهائي قليلًا ثم ينزلق لأعلى عند ظهور الطبقة.</p>
<h2 id="إضافة-انتقالات-سلسة">إضافة انتقالات سلسة</h2>
<p>أخيرًا، لنضف انتقالات سلسة لتجعل تأثيرات التمرير تبدو مصقولة واحترافية.</p>
<p><em>إضافة انتقالات سلسة — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/d47c338841657780f15e80e76bd2e2e8dcc95b902e2dc1fc637a94c8d90dd9b3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://picsum.photos/seed/picsum/600/400&quot;</span>
    <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Product&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-48 w-full object-cover&quot;</span>
  /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;translate-y-4 space-y-2 transition-transform duration-300 group-hover:translate-y-0&quot;</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-lg font-semibold text-white&quot;</span>&gt;</span>Product Name<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-white&quot;</span>&gt;</span>Product description goes here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-xl font-bold text-white&quot;</span>&gt;</span>$29.99<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الانتقال:</p>
<ul>
<li><code>transition-opacity duration-300</code> على الطبقة: يُتلاشى الخلفية دخولًا وخروجًا بسلاسة خلال 300ms</li>
<li><code>transition-transform duration-300</code> على المحتوى: يحرّك حركة الانزلاق لأعلى بسلاسة</li>
<li>يستخدم الانتقالان المدة نفسها لتوقيت متماسك</li>
</ul>
<p>تنشئ مدة 300ms إحساسًا سلسًا واحترافيًا — سريعة بما يكفي لتبدو متجاوبة، وبطيئة بما يكفي لتكون ملحوظة وأنيقة.</p>
<h2 id="لماذا-ينجح-نظام-group">لماذا ينجح نظام group</h2>
<p>نظام <code>group</code> مثالي لتأثيرات التمرير المعقدة لأنه ينسّق استجابة عدة عناصر لتفاعل واحد. وخلافًا لنظام <code>peer</code> الذي يتعامل مع علاقات الأشقاء، يدير <code>group</code> علاقات الأب والابن حيث يؤثر تمرير المؤشر على الأب في عدة أبناء.</p>
<p>توفّر هذه المقاربة:</p>
<ul>
<li><strong>حركات منسّقة</strong>: يمكن لعدة عناصر الاستجابة إلى حدث التمرير نفسه بتأثيرات مختلفة</li>
<li><strong>استهداف مرن</strong>: يمكن لأي عنصر سليل استخدام أدوات <code>group-hover:*</code> بصرف النظر عن عمق التعشيش</li>
<li><strong>الأداء</strong>: تأثيرات تمرير بـCSS وحدها دون عبء JavaScript</li>
<li><strong>سلوك بديهي</strong>: البطاقة كلها هدف التمرير، ما يسهّل على المستخدمين تفعيله</li>
</ul>
<h2 id="أنماط-group-الشائعة">أنماط group الشائعة</h2>
<p>يعمل نظام group بامتياز مع:</p>
<ul>
<li>طبقات تغطية الصور (كما هو موضّح)</li>
<li>قوائم تنقل منسدلة حيث يكشف تمرير المؤشر على الأب قوائم الأبناء</li>
<li>تأثيرات تمرير البطاقات بعناصر متحركة متعددة</li>
<li>مجموعات أزرار حيث يؤثر التمرير في الأيقونات والنص والخلفيات بشكل مختلف</li>
<li>بطاقات منتجات بلوحات معلومات متوسّعة</li>
</ul>
<h2 id="تحديات">تحديات</h2>
<p>جرّب بناء هذه التنويعات:</p>
<ol>
<li><strong>طبقة تغطية محاذاة للأسفل</strong>: ضع محتوى الطبقة في الأسفل بتلاشٍ متدرّج من الشفاف إلى الأسود باستخدام <code>bg-gradient-to-t from-black/80 to-transparent</code></li>
<li><strong>طبقة أيقونة</strong>: أنشئ أيقونة زر تشغيل تظهر في وسط الصورة عند التمرير، باستخدام <code>group-hover:</code> مع تأثيرات القياس والعتامة</li>
</ol>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
