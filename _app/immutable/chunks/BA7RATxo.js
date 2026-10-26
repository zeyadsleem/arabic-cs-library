const s="kinney",n="tailwind",a="Tailwind CSS",t="building-a-popover",l="بناء نافذة منبثقة (Popover)",p=[{depth:2,id:"تنسيق-زر-التشغيل",text:"تنسيق زر التشغيل"},{depth:2,id:"وضع-النوافذ-المنبثقة-عبر-css-anchor-positioning",text:"وضع النوافذ المنبثقة عبر CSS Anchor Positioning"},{depth:2,id:"إنشاء-حاوية-النافذة-المنبثقة",text:"إنشاء حاوية النافذة المنبثقة"},{depth:2,id:"تنسيق-عناصر-القائمة",text:"تنسيق عناصر القائمة"},{depth:2,id:"إضافة-الحالات-التفاعلية",text:"إضافة الحالات التفاعلية"},{depth:2,id:"إضافة-انتقالات-سلسة",text:"إضافة انتقالات سلسة"},{depth:2,id:"تحسين-العرض-والتنضيب",text:"تحسين العرض والتنضيب"},{depth:2,id:"إضافة-التجميع-البصري-بالفواصل",text:"إضافة التجميع البصري بالفواصل"},{depth:2,id:"خيارات-تموضع-بديلة",text:"خيارات تموضع بديلة"},{depth:2,id:"لماذا-هذا-الأسلوب-رائع",text:"لماذا هذا الأسلوب رائع"},{depth:2,id:"التحديات",text:"التحديات"}],o=`<p>لنبدأ ببنية HTML الأساسية باستخدام Popover API الأصلية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-sky-50&quot;</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span> <span class="hljs-attr">popover</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يستخدم هذا Popover API الأصلية في HTML حيث يربط <code>popovertarget</code> زر التشغيل بعنصر النافذة المنبثقة عبر المعرّف (ID). ويتولّى المتصفّح منطق الإظهار والإخفاء تلقائيًا—نحن نحتاج فقط إلى تنسيقه بجمال مع Tailwind.</p>
<h2 id="تنسيق-زر-التشغيل">تنسيق زر التشغيل</h2>
<p>أولًا، لنطبّق تنسيق أزرار احترافيًا ليجعل زر التشغيل يبدو قابلًا للنقر ومُصقولًا.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span> <span class="hljs-attr">popover</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق زر التشغيل:</p>
<ul>
<li><code>rounded-md</code>: استدارة حدّ قدرها 6px لمظهر حديث</li>
<li><code>bg-slate-600</code>: لون خلفية رمادي احترافي</li>
<li><code>px-3 py-2</code>: حشوة أفقية 12px ورأسيًا 8px لاستهدافات لمس مريحة</li>
<li><code>text-sm font-semibold</code>: نص بوزن شبه عريض بحجم 14px لوضوح القراءة</li>
<li><code>shadow-xs</code>: ظلّ خفيف بسمك 1px يضيف عمقًا</li>
<li><code>hover:bg-slate-500</code>: درجة أفتح عند التحويم لتغذية راجعة تفاعلية</li>
<li><code>focus-visible:outline-*</code>: تنسيق ملائم للتنقّل بلوحة المفاتيح</li>
</ul>
<p>وهذا ينشئ زر تشغيل احترافيًا يوضّح بجلاء أنّه تفاعلي.</p>
<h2 id="وضع-النوافذ-المنبثقة-عبر-css-anchor-positioning">وضع النوافذ المنبثقة عبر CSS Anchor Positioning</h2>
<p><strong>المشكلة</strong>: تنقل سمة <code>popover</code> في HTML العناصر إلى الطبقة العلوية (top layer)، فتكسر تموضع CSS المعتاد (مثل <code>absolute top-full left-0</code>). وتظهر النافذة المنبثقة حيث يقرّر المتصفّح وضعها، لا بالضرورة بالقرب من زرّك.</p>
<p><strong>الحل</strong>: استخدم CSS Anchor Positioning لربط النافذة المنبثقة صراحةً بالزر. أولًا، لنجهّز أصناف Tailwind 4 المخصّصة في CSS:</p>
<pre><code class="language-css"><span class="hljs-keyword">@utility</span> anchor-* {
  <span class="hljs-attribute">anchor-name</span>: --{*};
}

<span class="hljs-keyword">@utility</span> position-anchor-* {
  <span class="hljs-attribute">position-anchor</span>: --{*};
}

<span class="hljs-keyword">@utility</span> top-anchor-* {
  <span class="hljs-attribute">top</span>: <span class="hljs-built_in">anchor</span>({*});
}

<span class="hljs-keyword">@utility</span> left-anchor-* {
  <span class="hljs-attribute">left</span>: <span class="hljs-built_in">anchor</span>({*});
}

<span class="hljs-comment">/* Combined utilities for common patterns */</span>
<span class="hljs-keyword">@utility</span> anchor-below-* {
  <span class="hljs-attribute">position-anchor</span>: --{*};
  <span class="hljs-attribute">top</span>: <span class="hljs-built_in">anchor</span>(bottom);
  <span class="hljs-attribute">left</span>: <span class="hljs-built_in">anchor</span>(left);
}
</code></pre>
<p>والآن لنطبّق التموضع بالمرساة (anchor positioning) على نافذتنا المنبثقة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>إعداد التموضع بالمرساة:</p>
<ul>
<li><code>anchor-menu-button</code> على زر التشغيل: ينشئ مرساة باسم <code>--menu-button</code></li>
<li><code>anchor-below-menu-button</code> على النافذة المنبثقة: يضع النافذة المنبثقة أسفل المرساة ومحاذاةً لحافّتها اليسرى</li>
</ul>
<p>وهذا يضمن ظهور النافذة المنبثقة في المكان الذي تريده بالضبط—مباشرةً أسفل زر التشغيل—بغضّ النظر عن منطق التموضع الافتراضي في المتصفّح.</p>
<h2 id="إنشاء-حاوية-النافذة-المنبثقة">إنشاء حاوية النافذة المنبثقة</h2>
<p>والآن لننسّق النافذة المنبثقة نفسها لتبدو كقائمة منسدلة حديثة بتسلسل بصري صحيح.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق حاوية النافذة المنبثقة:</p>
<ul>
<li><code>m-0</code>: يزيل الهوامش الافتراضية في المتصفّح التي تميل النوافذ المنبثقة إليها</li>
<li><code>rounded-lg</code>: استدارة حدّ قدرها 8px، أكثر وضوحًا بقليل من زر التشغيل</li>
<li><code>border border-slate-200</code>: حدّ رمادي فاتح خفيف يحدّد الحواف</li>
<li><code>bg-white</code>: خلفية بيضاء نظيفة</li>
<li><code>p-1</code>: حشوة قدرها 4px تنشئ حدًّا حول عناصر القائمة</li>
<li><code>shadow-lg</code>: ظلّ أكثر بروزًا من ظلّ الزر، فينشئ تأثير لوحة معلّقة</li>
</ul>
<p>وتساعد استدارة الحدّ الأكبر والظلّ على ترسيخ كون هذه لوحة معلّقة، مميّزةً عن زر التشغيل.</p>
<h2 id="تنسيق-عناصر-القائمة">تنسيق عناصر القائمة</h2>
<p>لنحوّل أزرار القائمة إلى عناصر قائمة حقيقية بمسافات متّسقة وحالات تحويم.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700&quot;</span>&gt;</span>
      Settings
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700&quot;</span>&gt;</span>
      Profile
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700&quot;</span>&gt;</span>
      Logout
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تنسيق عنصر القائمة:</p>
<ul>
<li><code>block w-full</code>: يجعل كل زر يأخذ العرض كاملًا ويرتب رأسيًا</li>
<li><code>rounded-md</code>: استدارة حدّ قدرها 6px تطابق زر التشغيل</li>
<li><code>px-3 py-2</code>: الحشوة نفسها التي في زر التشغيل لاتّساق بصري</li>
<li><code>text-left</code>: يحاذي النص إلى اليسار، وهو المعتاد في عناصر القوائم</li>
<li><code>text-sm</code>: حجم خط 14px لقراءة مريحة</li>
<li><code>text-slate-700</code>: نص رمادي داكن لتباين جيد مع الخلفية البيضاء</li>
</ul>
<p>والآن تبدو عناصر قائمتنا متّسقة ومضبوطة الحجم، لكنها تحتاج إلى تغذية راجعة تفاعلية.</p>
<h2 id="إضافة-الحالات-التفاعلية">إضافة الحالات التفاعلية</h2>
<p>لنضف حالتي التحويم والتركيز لتبدو عناصر القائمة استجابةً ومتاحة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Settings
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Profile
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Logout
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الحالات التفاعلية:</p>
<ul>
<li><code>hover:bg-slate-50</code>: خلفية رمادية فاتحة عند التحويم توفّر تغذية راجعة واضحة</li>
<li><code>focus-visible:bg-slate-50</code>: الخلفية نفسها عند التركيز بلوحة المفاتيح، ما يضمن إمكانية الوصول</li>
<li><code>focus-visible:outline-none</code>: يزيل الحدّ الافتراضي في المتصفّح لأننا نستخدم لون الخلفية لإشارة التركيز</li>
</ul>
<p>وتجعل حالات التحويم الخفيفة واضحًا أي عنصر سيُفعَّل من دون إزعاج.</p>
<h2 id="إضافة-انتقالات-سلسة">إضافة انتقالات سلسة</h2>
<p>لنضف الانتقالات لتبدو تغيّرات الحالة مصقولة واحترافية.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Settings
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Profile
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Logout
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات الحركة:</p>
<ul>
<li><code>transition-colors</code> على زر التشغيل: يُحرّك تغيّر لون الخلفية بسلاسة عند التحويم</li>
<li><code>transition-colors</code> على عناصر القائمة: ينشئ انتقالات سلسة عند التحويم والتركيز</li>
</ul>
<p>ومدة الانتقال الافتراضية البالغة 200ms تبدو استجابةً من دون بطء، فتُنشئ تجربة تفاعل أكثر صقلًا.</p>
<h2 id="تحسين-العرض-والتنضيب">تحسين العرض والتنضيب</h2>
<p>لنُحسّن التنضيب (typography) ونحرص على أن تمتلك النافذة المنبثقة عرضًا أدنى ملائمًا لتحسين القراءة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 min-w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Settings
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Profile
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Logout
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>تحسينات التنضيب والأبعاد:</p>
<ul>
<li><code>min-w-48</code>: يضبط عرضًا أدنى قدره 192px حتى لا تبدو النافذة المنبثقة ضيّقة</li>
<li><code>font-medium</code>: وزن خط متوسط (500) لعناصر القائمة يوفّر تسلسلًا بصريًا أفضل من الوزن العادي</li>
</ul>
<p>ويضمن العرض الأدنى أن تبدو النافذة المنبثقة ذات حضور واضح ويمنح النص مساحة للتنفّس، بينما يجعل وزن الخط من السهل تصفّح عناصر القائمة.</p>
<h2 id="إضافة-التجميع-البصري-بالفواصل">إضافة التجميع البصري بالفواصل</h2>
<p>وأخيرًا، لنضف فاصلًا قبل زر تسجيل الخروج لتجميع الإجراءات المترابطة، ونستخدم اللون للإشارة إلى الإجراءات المدمِّرة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
    <span class="hljs-attr">popovertarget</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600&quot;</span>
  &gt;</span>
    Menu
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;button-menu&quot;</span>
    <span class="hljs-attr">popover</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-below-menu-button m-0 min-w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg&quot;</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Settings
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Profile
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;my-1 border-t border-slate-200&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none&quot;</span>
    &gt;</span>
      Logout
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>التحسينات الأخيرة:</p>
<ul>
<li><code>&lt;div class=&quot;my-1 border-t border-slate-200&quot;&gt;&lt;/div&gt;</code>: ينشئ خط فاصل بهامش رأسي قدره 4px</li>
<li><code>text-red-600</code> على زر تسجيل الخروج: النص الأحمر يشير إلى إجراء مدمِّر</li>
<li><code>hover:bg-red-50 focus-visible:bg-red-50</code>: خلفية حمراء فاتحة عند التحويم/التركيز بدلًا من الرمادية</li>
</ul>
<p>وينشئ الفاصل تجميعًا واضحًا بين إجراءات المستخدم (Settings، Profile) وإجراء تسجيل الخروج، بينما يتبع الترميز اللوني الأحمر أنماط واجهات المستخدم الشائعة في الإجراءات المدمِّرة.</p>
<h2 id="خيارات-تموضع-بديلة">خيارات تموضع بديلة</h2>
<p>يمكنك تخصيص تموضع النافذة المنبثقة باستخدام أصناف مراسي مختلفة. وإليك بعض الأنماط الشائعة:</p>
<p><strong>نافذة منبثقة محاذاة لليمين:</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-dropdown&quot;</span>&gt;</span>Menu<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">popover</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;position-anchor-dropdown top-anchor-bottom left-anchor-right&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Popover content --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>نافذة منبثقة في الوسط:</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-profile&quot;</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">popover</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;position-anchor-profile top-anchor-bottom left-anchor-center&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Popover content --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>فوق الزر:</strong></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;anchor-tooltip&quot;</span>&gt;</span>Help<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">popover</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;position-anchor-tooltip top-anchor-top left-anchor-left&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Popover content --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ونظام التموضع بالمراسي مرن تمامًا—يمكنك إنشاء أي علاقة مكانية بين زر التشغيل والنافذة المنبثقة.</p>
<h2 id="لماذا-هذا-الأسلوب-رائع">لماذا هذا الأسلوب رائع</h2>
<p><strong>أسماء أصناف دلالية</strong>: أصناف مثل <code>anchor-menu-button</code> و<code>anchor-below-menu-button</code> تشرح نفسها وقابلة لإعادة الاستخدام.</p>
<p><strong>أصناف ديناميكية</strong>: تعمل أصناف Tailwind 4 مع أي اسم مرساة—<code>anchor-dropdown</code>، <code>anchor-profile</code>، <code>anchor-tooltip</code>—فتصبح مرنة إلى ما لا نهاية.</p>
<p><strong>مزايا المتصفّح الأصلية</strong>: يعمل مع Popover API الأصلية مع الحفاظ على كل ميزات إمكانية الوصول وتحسينات المتصفّح.</p>
<p><strong>تحكّم دقيق</strong>: بخلاف مكتبات التموضع المكتوبة بـJavaScript، يتولّى محرّك التخطيط في المتصفّح معالجة CSS Anchor Positioning، ما يجعله أكثر أداءً وموثوقية.</p>
<p><strong>جاهز للمستقبل</strong>: كلما اتّسع دعم CSS Anchor Positioning، سيصبح هذا الأسلوب هو الطريقة القياسية لوضع العناصر المعلّقة.</p>
<h2 id="التحديات">التحديات</h2>
<p>جرّب بناء هذه الصيغ:</p>
<ol>
<li><strong>نافذة منبثقة لملف المستخدم</strong>: أنشئ نافذة منبثقة فيها صورة رمزية للمستخدم واسمه وبريده الإلكتروني وأزرار إجراءات، بتخطيط أكثر تعقيدًا مع مسافات وتسلسل تنضيب صحيح</li>
<li><strong>قائمة متعدّدة الأقسام</strong>: وسّع القائمة لتشمل أقسامًا متعدّدة مجمّعة مع فواصل، بتنظيم الإجراءات المترابطة معًا باستخدام نمط الفاصل الذي تعلّمناه</li>
</ol>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:o};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,o as html,t as slug,l as title};
