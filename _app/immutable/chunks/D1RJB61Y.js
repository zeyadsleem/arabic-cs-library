const s="kinney",a="enterprise-ui",n="واجهات المؤسسات",p="design-system-governance-exercise",t="التمرين السابع: حوكمة نظام التصميم",l=[{depth:2,id:"ما-الذي-ستفعله",text:"ما الذي ستفعله"},{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"افحص-نظام-الـ-tokens-المنفصل",text:"افحص نظام الـ tokens المنفصل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"أنشئ-خصائص-css-مخصصة",text:"أنشئ خصائص CSS مخصّصة"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقق"},{depth:2,id:"اربط-المكونات-بالـ-tokens",text:"اربط المكوّنات بالـ tokens"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقق"},{depth:2,id:"أضف-اختبارات-الانحدار-البصري",text:"أضف اختبارات الانحدار البصري"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],e=`<h2 id="ما-الذي-ستفعله">ما الذي ستفعله</h2>
<p>تحتوي حزمة <code>@pulse/ui</code> على ملف <code>tokens.ts</code> يصدّر ثوابت الألوان والتباعد وأنصاف الأقطار — لكن لا يستخدمها أي مكوّن فعليًا. فمكوّن <code>Button</code> يثبّت أصناف Tailwind مباشرةً مثل <code>bg-gray-900</code>. ومكوّن <code>StatCard</code> يثبّت ألوان حدوده ونصه بنفسه. ملف الـ tokens موجود، لكنه زينة لا أكثر. ستربط نظام الـ tokens بالمكوّنات عبر خصائص CSS المخصّصة، ثم تضيف اختبارات انحدار بصري تلتقط التغييرات غير المقصودة عند تعديل الـ tokens.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>نظام التصميم الذي لا تُفرَض قواعده ليس سوى ملف PDF لدليل أنماط لا يقرأه أحد. إن الـ tokens الموجودة في ملف دون أن تشير إليها المكوّنات تزرع ثقة زائفة: يعتقد الفريق أن لديه مصدرًا واحدًا للحقيقة، بينما يتخذ كل مكوّن في الواقع قراراته اللونية الخاصة. وتحل خصائص CSS المخصّصة هذه المشكلة بإنشاء صلة وقت التشغيل بين تعريفات الـ tokens وعرض المكوّنات. فعندما تغيّر <code>--color-primary</code>، يتحدّث تلقائيًا كل مكوّن يشير إليه. وتُغلق اختبارات الانحدار البصري الحلقة: فهي تُثبّت كيف <em>ينبغي</em> أن تبدو الواجهة، بحيث يظهر أي تغيير في الـ tokens يؤثر على التخطيط أو اللون بشكل غير متوقع كفروق في لقطة شاشة قبل أن يصل إلى الإنتاج.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>Node.js 20 أو أحدث</li>
<li>pnpm 9 أو أحدث</li>
</ul>
<h2 id="الإعداد">الإعداد</h2>
<p>يفترض أنك تتابع من حيث توقّف التمرين السادس. وإذا احتجت إلى اللحاق بالركب:</p>
<pre><code class="language-bash">git checkout 06-design-system-start
pnpm install
</code></pre>
<h2 id="افحص-نظام-الـ-tokens-المنفصل">افحص نظام الـ tokens المنفصل</h2>
<p>قبل أن تغيّر أي شيء، افهم الفجوة بين تعريفات الـ tokens والمكوّنات التي ينبغي أن تستخدمها.</p>
<p>افتح <code>packages/ui/src/tokens.ts</code>:</p>
<p><em>packages/ui/src/tokens.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> colors = {
  <span class="hljs-attr">primary</span>: <span class="hljs-string">&#x27;#2563eb&#x27;</span>,
  <span class="hljs-attr">primaryHover</span>: <span class="hljs-string">&#x27;#1d4ed8&#x27;</span>,
  <span class="hljs-attr">secondary</span>: <span class="hljs-string">&#x27;#64748b&#x27;</span>,
  <span class="hljs-attr">success</span>: <span class="hljs-string">&#x27;#22c55e&#x27;</span>,
  <span class="hljs-attr">danger</span>: <span class="hljs-string">&#x27;#ef4444&#x27;</span>,
  <span class="hljs-attr">warning</span>: <span class="hljs-string">&#x27;#f59e0b&#x27;</span>,
  <span class="hljs-attr">background</span>: <span class="hljs-string">&#x27;#ffffff&#x27;</span>,
  <span class="hljs-attr">surface</span>: <span class="hljs-string">&#x27;#f8fafc&#x27;</span>,
  <span class="hljs-attr">border</span>: <span class="hljs-string">&#x27;#e2e8f0&#x27;</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;#0f172a&#x27;</span>,
  <span class="hljs-attr">textMuted</span>: <span class="hljs-string">&#x27;#64748b&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> spacing = {
  <span class="hljs-attr">xs</span>: <span class="hljs-string">&#x27;0.25rem&#x27;</span>,
  <span class="hljs-attr">sm</span>: <span class="hljs-string">&#x27;0.5rem&#x27;</span>,
  <span class="hljs-attr">md</span>: <span class="hljs-string">&#x27;1rem&#x27;</span>,
  <span class="hljs-attr">lg</span>: <span class="hljs-string">&#x27;1.5rem&#x27;</span>,
  <span class="hljs-attr">xl</span>: <span class="hljs-string">&#x27;2rem&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> radii = {
  <span class="hljs-attr">sm</span>: <span class="hljs-string">&#x27;0.25rem&#x27;</span>,
  <span class="hljs-attr">md</span>: <span class="hljs-string">&#x27;0.5rem&#x27;</span>,
  <span class="hljs-attr">lg</span>: <span class="hljs-string">&#x27;0.75rem&#x27;</span>,
  <span class="hljs-attr">full</span>: <span class="hljs-string">&#x27;9999px&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
</code></pre>
<p>الآن افتح <code>packages/ui/src/button.tsx</code>. تستخدم أنماط المتغيّرات قيمًا مثبّتة — مثل <code>bg-gray-900</code> و<code>text-white</code> وما شابهها من أصناف Tailwind المساعدة — بدلًا من الإشارة إلى أي شيء من <code>tokens.ts</code>.</p>
<p>افتح <code>packages/ui/src/stat-card.tsx</code>. النمط نفسه: ألوان حدود وألوان نص مثبّتة دون أي صلة بملف الـ tokens.</p>
<p>ابحث في قاعدة الشيفرة عن أي استيراد لـ <code>tokens.ts</code>:</p>
<pre><code class="language-bash">grep -r <span class="hljs-string">&quot;from.*tokens&quot;</span> packages/ui/src/
</code></pre>
<p>لا يستورد أي مكوّن ملف الـ tokens. فالـ tokens يتيمة.</p>
<blockquote>
<p><strong>النمط المضاد: tokens منفصلة</strong></p>
<p>هذا أسوأ من ألّا تكون لديك tokens على الإطلاق. فحين لا يوجد ملف tokens، يعرف الفريق أنه لا يوجد مصدر واحد للحقيقة ويتخذ قراراته على هذا الأساس. أما حين يوجد ملف tokens لا يشير إليه شيء، فإن الفريق <em>يعتقد</em> أن لديه مصدرًا واحدًا للحقيقة. فيغيّر أحدهم <code>colors.primary</code> في <code>tokens.ts</code>، ويفترض أن الواجهة تحدّثت، ثم يُطلق الإصدار. لكن شيئًا لم يتغيّر. فملف الـ tokens يصنع ثقة زائفة.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>لقد تأكدت من الفجوة: يعرّف <code>tokens.ts</code> لغة التصميم، لكن <code>button.tsx</code> و<code>stat-card.tsx</code> يتجاهلانه تمامًا. وتغيير قيمة في <code>tokens.ts</code> لن يكون له أي أثر على الواجهة المعروضة.</p>
<h2 id="أنشئ-خصائص-css-مخصصة">أنشئ خصائص CSS مخصّصة</h2>
<p>لا تستطيع ثوابت JavaScript أن تتوارث عبر DOM، ولا أن تُتجاوَز لكل مكوّن على حدة، ولا أن تُستبدل وقت التشغيل لأجل السمات. أما خصائص CSS المخصّصة فتستطيع ذلك. أنشئ ملف CSS يربط قيم الـ tokens بمحرّك العرض في المتصفح.</p>
<p>أنشئ <code>packages/ui/src/tokens.css</code>:</p>
<p><em>packages/ui/src/tokens.css</em></p>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-comment">/* Colors */</span>
  <span class="hljs-attr">--color-primary</span>: <span class="hljs-number">#2563eb</span>;
  <span class="hljs-attr">--color-primary-hover</span>: <span class="hljs-number">#1d4ed8</span>;
  <span class="hljs-attr">--color-secondary</span>: <span class="hljs-number">#64748b</span>;
  <span class="hljs-attr">--color-success</span>: <span class="hljs-number">#22c55e</span>;
  <span class="hljs-attr">--color-danger</span>: <span class="hljs-number">#ef4444</span>;
  <span class="hljs-attr">--color-warning</span>: <span class="hljs-number">#f59e0b</span>;
  <span class="hljs-attr">--color-background</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attr">--color-surface</span>: <span class="hljs-number">#f8fafc</span>;
  <span class="hljs-attr">--color-border</span>: <span class="hljs-number">#e2e8f0</span>;
  <span class="hljs-attr">--color-text</span>: <span class="hljs-number">#0f172a</span>;
  <span class="hljs-attr">--color-text-muted</span>: <span class="hljs-number">#64748b</span>;

  <span class="hljs-comment">/* Spacing */</span>
  <span class="hljs-attr">--space-xs</span>: <span class="hljs-number">0.25rem</span>;
  <span class="hljs-attr">--space-sm</span>: <span class="hljs-number">0.5rem</span>;
  <span class="hljs-attr">--space-md</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attr">--space-lg</span>: <span class="hljs-number">1.5rem</span>;
  <span class="hljs-attr">--space-xl</span>: <span class="hljs-number">2rem</span>;

  <span class="hljs-comment">/* Radii */</span>
  <span class="hljs-attr">--radius-sm</span>: <span class="hljs-number">0.25rem</span>;
  <span class="hljs-attr">--radius-md</span>: <span class="hljs-number">0.5rem</span>;
  <span class="hljs-attr">--radius-lg</span>: <span class="hljs-number">0.75rem</span>;
  <span class="hljs-attr">--radius-full</span>: <span class="hljs-number">9999px</span>;
}
</code></pre>
<p>استورد ملف CSS الخاص بالـ tokens في ورقة الأنماط العامة للتطبيق. افتح <code>apps/dashboard/src/global.css</code> وأضف الاستيراد:</p>
<p><em>apps/dashboard/src/global.css</em></p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;@pulse/ui/src/tokens.css&#x27;</span>;
<span class="hljs-keyword">@source</span> <span class="hljs-string">&#x27;../../../packages&#x27;</span>;
</code></pre>
<blockquote>
<p><strong>لماذا خصائص CSS المخصّصة بدلًا من ثوابت JavaScript</strong></p>
<p>ثلاثة أسباب. أولًا، تتوارث خصائص CSS المخصّصة عبر DOM: يمكن للعنصر الأب أن يتجاوز <code>--color-primary</code>، فيلتقط كل مكوّن فرعي يشير إليه القيمة الجديدة دون أي تمرير props أو مزوّدات سياق. ثانيًا، تتيح السمات عبر خصائص <code>data-theme</code>: يمكنك تعريف <code>[data-theme=&quot;dark&quot;] { --color-background: #0f172a; }</code> وتبديل السمات بتغيير خاصية واحدة على العنصر الجذري. ثالثًا، تعمل مع أي أسلوب تنسيق — أصناف Tailwind المساعدة، أو الأنماط المضمّنة، أو وحدات CSS، أو CSS العادي — لأنها تعيش في محرّك أنماط المتصفح لا في JavaScript.</p>
</blockquote>
<h3 id="نقطة-تحقق-1">نقطة تحقق</h3>
<p>افتح أدوات المطوّر في المتصفح على التطبيق العامل (<code>pnpm dev</code> من جذر مساحة العمل) وافحص العنصر <code>:root</code>. ينبغي أن ترى كل الخصائص المخصّصة <code>--color-*</code> و<code>--space-*</code> و<code>--radius-*</code> مدرجة ضمن الأنماط المحسوبة للعنصر.</p>
<h2 id="اربط-المكونات-بالـ-tokens">اربط المكوّنات بالـ tokens</h2>
<p>حدّث الآن المكوّنات لتشير إلى خصائص CSS المخصّصة بدلًا من القيم المثبّتة.</p>
<p>افتح <code>packages/ui/src/button.tsx</code> واستبدله بما يلي:</p>
<p><em>packages/ui/src/button.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonVariant</span> = <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;ghost&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ButtonHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-title class_">ButtonVariant</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">variantStyles</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">ButtonVariant</span>, <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>&gt; = {
  <span class="hljs-attr">primary</span>: {
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;var(--color-primary)&#x27;</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;var(--color-background)&#x27;</span>,
  },
  <span class="hljs-attr">secondary</span>: {
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;var(--color-background)&#x27;</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;var(--color-text)&#x27;</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">&#x27;1px solid var(--color-border)&#x27;</span>,
  },
  <span class="hljs-attr">ghost</span>: {
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;transparent&#x27;</span>,
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;var(--color-text-muted)&#x27;</span>,
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{
  variant = <span class="hljs-string">&#x27;primary&#x27;</span>,
  className = <span class="hljs-string">&#x27;&#x27;</span>,
  children,
  style,
  ...props
}: <span class="hljs-title class_">ButtonProps</span></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">rounded-md</span> <span class="hljs-attr">px-4</span> <span class="hljs-attr">py-2</span> <span class="hljs-attr">text-sm</span> <span class="hljs-attr">font-medium</span> <span class="hljs-attr">transition-colors</span> \${<span class="hljs-attr">className</span>}\`}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">...variantStyles</span>[<span class="hljs-attr">variant</span>], <span class="hljs-attr">...style</span> }}
      {<span class="hljs-attr">...props</span>}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>تشير أنماط المتغيّرات الآن إلى خصائص CSS المخصّصة عبر <code>var()</code>. يستخدم المتغيّر <code>primary</code> الخاصية <code>--color-primary</code> لخلفيته والخاصية <code>--color-background</code> للون نصه. ويستخدم المتغيّر <code>secondary</code> الخاصية <code>--color-border</code> لحدوده. ولم تبقَ أي قيم سداسية عشرية مثبّتة في تعريفات المتغيّرات.</p>
<p>افتح <code>packages/ui/src/stat-card.tsx</code> واستبدله بما يلي:</p>
<p><em>packages/ui/src/stat-card.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">StatCardProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">StatCard</span>(<span class="hljs-params">{ label, value }: <span class="hljs-title class_">StatCardProps</span></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg border p-5&quot;</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">borderColor:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--color-border</span>)&#x27;,
        <span class="hljs-attr">backgroundColor:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--color-background</span>)&#x27;,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-sm&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--color-text-muted</span>)&#x27; }}&gt;</span>
        {label}
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-1 text-2xl font-semibold&quot;</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--color-text</span>)&#x27; }}
      &gt;</span>
        {value}
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>تحقّق من أن الصلة تعمل. افتح <code>packages/ui/src/tokens.css</code> وغيّر <code>--color-primary</code> مؤقتًا إلى قيمة واضحة:</p>
<pre><code class="language-css"><span class="hljs-attr">--color-primary</span>: <span class="hljs-number">#ff0000</span>;
</code></pre>
<p>أعد تحميل لوحة المعلومات. ينبغي أن يصبح كل زر رئيسي أحمر الآن. ثم أعد القيمة إلى <code>#2563eb</code>.</p>
<blockquote>
<p><strong>هذه هي آلية الحوكمة</strong></p>
<p>قبل هذه الخطوة، كان تغيير اللون الرئيسي يتطلّب العثور على كل مكوّن يثبّته وتحديث كل واحد منها على حدة. أما الآن، فتغيير <code>--color-primary</code> في ملف واحد يتوارث عبر كل مكوّن يشير إليه. ولم يعد ملف الـ tokens زينة — بل صار المصدر الوحيد للحقيقة في قيم الألوان، تفرضه آلية CSS في المتصفح.</p>
</blockquote>
<h3 id="نقطة-تحقق-2">نقطة تحقق</h3>
<p>تُعرض لوحة المعلومات كما كانت تمامًا — الألوان نفسها والتخطيط نفسه. الفرق بنيوي: فالألوان تتدفّق الآن من <code>tokens.css</code> عبر خصائص CSS المخصّصة إلى أنماط المكوّنات. وتغيير قيمة token واحدة في <code>tokens.css</code> يؤثر تأثيرًا مرئيًا في كل مكوّن يستخدمها.</p>
<h2 id="أضف-اختبارات-الانحدار-البصري">أضف اختبارات الانحدار البصري</h2>
<p>يحل ربط الـ tokens بالمكوّنات مشكلة الاتساق، لكنه يُدخل خطرًا جديدًا: تغيير token واحدة صار يؤثر في الواجهة كلها. تحتاج إلى وسيلة تتحقّق من أن تغييرات الـ tokens تُنتج النتيجة البصرية <em>المقصودة</em> ولا شيء غيرها. وتفعل مقارنة لقطات الشاشة في Playwright ذلك تلقائيًا.</p>
<p>أنشئ <code>tests/e2e/visual.spec.ts</code>:</p>
<p><em>tests/e2e/visual.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Visual regression&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;analytics dashboard matches baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Wait for all data to load</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;img&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Analytics activity chart&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Recent Activity&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;analytics-dashboard.png&#x27;</span>, {
      <span class="hljs-attr">fullPage</span>: <span class="hljs-literal">true</span>,
    });
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;settings page matches baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/settings&#x27;</span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Pulse Inc.&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;settings-page.png&#x27;</span>, {
      <span class="hljs-attr">fullPage</span>: <span class="hljs-literal">true</span>,
    });
  });
});
</code></pre>
<blockquote>
<p><strong>كيف تعمل <code>toHaveScreenshot()</code></strong></p>
<p>في أول مرة تشغّل فيها هذا الاختبار، يلتقط Playwright لقطة شاشة مرجعية ويحفظها في دليل <code>visual.spec.ts-snapshots</code>. وفي التشغيلات اللاحقة، يلتقط لقطة جديدة ويقارنها بالمرجع بكسلًا بكسلًا. وإذا اختلفت الصور بما يتجاوز حدًا قابلًا للضبط، يفشل الاختبار ويُنتج صورة فروق تُبرز بالضبط البكسلات التي تغيّرت. وهذا حتمي لأن MSW يوفّر بيانات API ثابتة — فالطلبات نفسها تعيد الأرقام نفسها في كل مرة.</p>
</blockquote>
<p>شغّل الاختبارات لتوليد لقطات الشاشة الأساسية:</p>
<pre><code class="language-bash">pnpm <span class="hljs-built_in">exec</span> playwright <span class="hljs-built_in">test</span> tests/e2e/visual.spec.ts --update-snapshots
</code></pre>
<p>يُنشئ هذا لقطات شاشة مرجعية في دليل اللقطات. وهذه هي الصور «المتوقّعة» التي ستقارن بها تشغيلات الاختبار المستقبلية.</p>
<p>شغّل الاختبارات مرة أخرى دون <code>--update-snapshots</code>:</p>
<pre><code class="language-bash">pnpm <span class="hljs-built_in">exec</span> playwright <span class="hljs-built_in">test</span> tests/e2e/visual.spec.ts
</code></pre>
<p>ينبغي أن تنجح الاختبارات لأن العرض الحالي يطابق اللقطات الأساسية التي التقطتها للتوّ.</p>
<p>اختبر الآن شبكة الأمان. افتح <code>packages/ui/src/tokens.css</code> وغيّر لون الحدود:</p>
<pre><code class="language-css"><span class="hljs-attr">--color-border</span>: <span class="hljs-number">#ff0000</span>;
</code></pre>
<p>شغّل الاختبارات البصرية مرة أخرى:</p>
<pre><code class="language-bash">pnpm <span class="hljs-built_in">exec</span> playwright <span class="hljs-built_in">test</span> tests/e2e/visual.spec.ts
</code></pre>
<p>ينبغي أن تفشل الاختبارات بفروق في لقطة الشاشة تُظهر حدودًا حمراء حيث كانت تُتوقّع حدود رمادية. هذه هي طبقة الحوكمة: فالاختبارات البصرية تُثبّت كيف ينبغي أن تبدو الواجهة، وأي تغيير في الـ tokens يخرج عن الأساس يُنتج فروقًا مرئية قابلة للمراجعة.</p>
<p>أعِد لون الحدود إلى <code>#e2e8f0</code>.</p>
<blockquote>
<p><strong>الانحدار البصري كحوكمة</strong></p>
<p>يفرض التدقيق المعماري (التمرين السادس) حدود الحزم — من يحق له استيراد ماذا. وتفرض design tokens الاتساق البصري — أي الألوان والتباعد مسموح. وتُغلق اختبارات الانحدار البصري حلقة التغذية الراجعة بتثبيت <em>النتيجة المعروضة</em> لتلك القرارات. فالمطوّر الذي يغيّر <code>--color-border</code> يرى بالضبط أي الصفحات تأثّرت في فروق لقطة الشاشة. ويستطيع المراجع على طلب السحب أن يوافق على التغيير البصري أو يرفضه صراحةً، بدلًا من اكتشافه في الإنتاج.</p>
</blockquote>
<blockquote>
<p><strong>علم <code>--update-snapshots</code> يدوي عن قصد</strong></p>
<p>يتطلّب تحديث اللقطات الأساسية قرارًا متعمّدًا: «نعم، هكذا ينبغي أن تبدو الواجهة الآن». وهذا يمنع الانحراف العرَضي للأساس. وفي CI، تُشغَّل الاختبارات <em>دون</em> <code>--update-snapshots</code>، لذا يفشل البناء عند أي تغيير بصري حتى يحدّث أحدهم الأساس صراحةً ويُودع لقطات الشاشة المرجعية الجديدة.</p>
</blockquote>
<h3 id="نقطة-تحقق-3">نقطة تحقق</h3>
<p>اختبارات الانحدار البصري أصبحت جاهزة. تغيير قيمة token في <code>tokens.css</code> يُسبّب فشل اختبار مع فروق لقطة شاشة. وتحديث اللقطات الأساسية يتطلّب علم <code>--update-snapshots</code> صريحًا. ونظام التصميم الآن محوكَم على ثلاثة مستويات: الـ tokens تعرّف القيم، والمكوّنات تشير إليها، واختبارات لقطات الشاشة تتحقّق من الناتج المعروض.</p>
<h2 id="الحل">الحل</h2>
<p>إذا احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة على الفرع <code>07-cicd-start</code>:</p>
<pre><code class="language-bash">git checkout 07-cicd-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>سمة داكنة عبر <code>data-theme</code>:</strong> أضف كتلة <code>[data-theme=&quot;dark&quot;]</code> إلى <code>tokens.css</code> تتجاوز متغيّرات الألوان بقيم داكنة. وأضف زر تبديل للسمة في لوحة المعلومات يضبط <code>document.documentElement.dataset.theme = &quot;dark&quot;</code>. ولا حاجة إلى أي تغييرات في المكوّنات — فخصائص CSS المخصّصة تتوارث تلقائيًا.</li>
<li><strong>تدقيق الـ tokens باستخدام stylelint:</strong> اكتب قاعدة stylelint (أو استخدم <code>stylelint-declaration-strict-value</code>) للإبلاغ عن الألوان السداسية العشرية المثبّتة في ملفات المكوّنات. فإذا استخدم مكوّن ما <code>#2563eb</code> مباشرةً بدلًا من <code>var(--color-primary)</code>، ينبغي أن ينبّه المدقّق. وهذا يمنع العودة إلى القيم المثبّتة بعد الترحيل.</li>
<li><strong>توثيق الـ tokens:</strong> ولّد صفحة مرجعية بصرية للـ tokens تعرض كل قيمة لون وتباعد ونصف قطر من <code>tokens.css</code> في شبكة. وهذا يمنح المصمّمين والمطوّرين مرجعًا مشتركًا يبقى متزامنًا مع الشيفرة.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>أصبح لديك نظام تصميم مترابط مع اختبارات انحدار بصري تلتقط التغييرات غير المقصودة. لكن لا شيء من هذا يعمل تلقائيًا على طلبات السحب. في التمرين التالي، ستبني خط CI على GitHub Actions يستخدم Turborepo للتخزين المؤقت ويشغّل فحص الأنواع والتدقيق والاختبار والبناء عند كل دفعة — محوّلًا هذه الفحوص المحلية إلى بوابة جودة آلية.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:l,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
