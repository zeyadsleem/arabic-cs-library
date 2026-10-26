const s="kinney",a="react-typescript",n="React مع TypeScript",p="monorepos-and-shared-ui-types",l="المستودعات الموحّدة وأنواع واجهة المستخدم المشتركة",t=[{depth:2,id:"لماذا-المستودعات-الموحدة-للمكتبات-المشتركة",text:"لماذا المستودعات الموحّدة للمكتبات المشتركة؟"},{depth:2,id:"تهيئة-بنية-المستودع-الموحد",text:"تهيئة بنية المستودع الموحّد"},{depth:2,id:"إنشاء-حزمة-الأنواع-المشتركة",text:"إنشاء حزمة الأنواع المشتركة"},{depth:2,id:"بناء-حزمة-واجهة-المستخدم-المشتركة",text:"بناء حزمة واجهة المستخدم المشتركة"},{depth:2,id:"تهيئة-مراجع-مشاريع-typescript",text:"تهيئة مراجع مشاريع TypeScript"},{depth:2,id:"إنشاء-تطبيق-مستهلك",text:"إنشاء تطبيق مستهلك"},{depth:2,id:"تهيئة-البناء-وسير-العمل",text:"تهيئة البناء وسير العمل"},{depth:2,id:"أنماط-متقدمة-وأفضل-الممارسات",text:"أنماط متقدمة وأفضل الممارسات"},{depth:3,id:"التصديرات-البرميلية-barrel-exports-لاستيراد-نظيف",text:"التصديرات البرميلية (barrel exports) لاستيراد نظيف"},{depth:3,id:"تهيئة-بناء-مشتركة",text:"تهيئة بناء مشتركة"},{depth:3,id:"التحقق-النوعي-عند-وقت-التشغيل",text:"التحقق النوعي عند وقت التشغيل"},{depth:2,id:"الأخطاء-الشائعة-وحلولها",text:"الأخطاء الشائعة وحلولها"},{depth:3,id:"الاعتمادات-الدائرية",text:"الاعتمادات الدائرية"},{depth:3,id:"مشكلات-ترتيب-البناء",text:"مشكلات ترتيب البناء"},{depth:3,id:"استيراد-التطوير-مقابل-الإنتاج",text:"استيراد التطوير مقابل الإنتاج"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],c=`<p>لا بأس في بناء التطبيقات بمعزل عن بعضها حتى تحتاج إلى مشاركة المكوّنات والمساعدات أو الأنواع بين مشروعاتٍ عدّة. حينها تنتبه أنك كنت تنسخ عنصر الزرّ نفسه وتكرّر واجهات TypeScript وكأنك في عام 2015 (كلنا مررنا بشأنه). وهنا تأتي المستودعات الموحّدة (monorepos) — مستودع واحد يحتوي حزمًا عدّة يستطيع بعضها الاستيراد من بعض مع الإبقاء على أمان الأنواع وسير عمل تطويرٍ سليمين.</p>
<p>يحل المستودع الموحّد مشكلة «مكتبة المكوّنات المشتركة» حلًّا أنيقًا. فبدلًا من نشر حزمة داخلية إلى npm أو مصارعة وحدات Git الفرعية (Git submodules)، تُبقي كل شيء في موضع واحد مع أدوات مناسبة تُعين في بناء كل حزمة على حدة واختبارها ونشرها استقلالًا. سنبني اليوم مستودعًا موحّدًا بـ TypeScript فيه مكتبة واجهة مستخدم مشتركة تقدّم للتطبيقات المستهلكة مكوّنات React وتعريفات أنواع معًا.</p>
<h2 id="لماذا-المستودعات-الموحدة-للمكتبات-المشتركة">لماذا المستودعات الموحّدة للمكتبات المشتركة؟</h2>
<p>قبل أن نتعمّق، لنغطِّ بسرعة السبب الذي يجعل المستودعات الموحّدة مناسبة لمكتبات واجهة المستخدم المشتركة:</p>
<ul>
<li><strong>مصدر واحد للحق:</strong> جميع مكوّناتك وأنواعها في موضع واحد</li>
<li><strong>تغييرات ذرّية:</strong> حدّث المكتبة والمستهلك في الإيداع نفسه</li>
<li><strong>إدارة اعتمادات ميسَّرة:</strong> لا سؤال بعدُ «أيّ إصدار من مكوّن الزرّ نستخدم؟»</li>
<li><strong>تجربة مطوّر أفضل:</strong> فالانتقال إلى التعريفات يعمل عبر الحزم</li>
<li><strong>أدوات متّسقة:</strong> شارك تهيئات ESLint وسكربتات البناء وإعداد الاختبار</li>
</ul>
<p>والمفاضلة؟ حجم مستودع أكبر، وتنسيق بناء أكثر تعقيدًا بقليل — لكن الأدوات الحديثة تجعل هذه الهموم نظرية في الغالب لمعظم الفرق.</p>
<h2 id="تهيئة-بنية-المستودع-الموحد">تهيئة بنية المستودع الموحّد</h2>
<p>سنستخدم <a href="https://pnpm.io/workspaces">pnpm workspaces</a> لأنها تتعامل مع ربط الحزم بأناقة ولها دعم ممتاز لـ TypeScript. ستبدو بنيتنا كما يأتي:</p>
<pre><code>my-monorepo/
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   └── web-app/      # Consumer application
├── package.json      # Root workspace config
├── pnpm-workspace.yaml
└── tsconfig.json     # Root TypeScript config
</code></pre>
<p>ابدأ بإنشاء الملف <code>package.json</code> الجذري:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-monorepo&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;private&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pnpm --parallel --recursive run dev&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pnpm --recursive run build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pnpm --recursive run type-check&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@types/react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^5.0.0&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ تهيئة مساحات العمل في <code>pnpm-workspace.yaml</code>:</p>
<pre><code class="language-yaml"><span class="hljs-attr">packages:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;packages/*&#x27;</span>
</code></pre>
<h2 id="إنشاء-حزمة-الأنواع-المشتركة">إنشاء حزمة الأنواع المشتركة</h2>
<p>لنبدأ بحزمة الأنواع لأن مكوّنات واجهة المستخدم ستعتمد عليها. هكذا تبقى تعريفات الأنواع لدينا مصدرًا واحدًا موثوقًا للحق.</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p packages/types/src
<span class="hljs-built_in">cd</span> packages/types
</code></pre>
<p>أنشئ <code>packages/types/package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@my-org/types&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;default&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --watch&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تُخبر صيغة <code>workspace:*</code> أداة pnpm أن تستخدم إصدار TypeScript من مساحة العمل الجذرية فتضمن الاتساق.</p>
</blockquote>
<p>أنشئ <code>packages/types/tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;composite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>عَلَم <code>composite: true</code> جوهري — فهو يفعّل مراجع المشاريع (project references) في TypeScript، بحيث تتمكن الحزم الأخرى من بناء تدريجي ودعم سليم من بيئة التطوير التكاملية.</p>
<p>الآن أنشئ بعض الأنواع المشتركة في <code>packages/types/src/index.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Common UI prop types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-comment">// Theme-related types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ThemeVariant</span> = <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Size</span> = <span class="hljs-string">&#x27;sm&#x27;</span> | <span class="hljs-string">&#x27;md&#x27;</span> | <span class="hljs-string">&#x27;lg&#x27;</span>;

<span class="hljs-comment">// Component-specific types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">variant</span>?: <span class="hljs-title class_">ThemeVariant</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-title class_">Size</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Data types that might be shared across apps</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatarUrl</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">message</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Utility types for forms</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">FormField</span>&lt;T&gt; = {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">FormState</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">FormField</span>&lt;T[K]&gt;;
};
</code></pre>
<p>تغطي هذه الأنواع أنماط واجهة المستخدم الشائعة التي ستريد مشاركتها: خصائص المكوّنات، وأنظمة السمات (themes)، ونماذج البيانات، وأدوات النماذج (forms).</p>
<h2 id="بناء-حزمة-واجهة-المستخدم-المشتركة">بناء حزمة واجهة المستخدم المشتركة</h2>
<p>الآن الجزء الممتع: بناء مكوّنات React قابلة لإعادة الاستخدام. أنشئ بنية حزمة واجهة المستخدم:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p packages/ui/src/components
<span class="hljs-built_in">cd</span> packages/ui
</code></pre>
<p>أنشئ <code>packages/ui/package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@my-org/ui&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;default&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./styles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/styles.css&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc &amp;&amp; rollup -c&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --watch&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;peerDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&gt;=18.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&gt;=18.0.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@my-org/types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;clsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^2.0.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@types/react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rollup&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@rollup/plugin-typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^11.0.0&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ <code>packages/ui/tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;composite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../types&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تخبر مصفوفة <code>references</code> TypeScript بأن هذه الحزمة تعتمد على حزمة الأنواع، فتُفعّل البناء التدريجي والتحقق النوعي السليم عبر الحزم.</p>
<p>أنشئ مكوّن Button في <code>packages/ui/src/components/Button.tsx</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> clsx <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;clsx&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ButtonProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/types&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{
  children,
  className,
  variant = <span class="hljs-string">&#x27;primary&#x27;</span>,
  size = <span class="hljs-string">&#x27;md&#x27;</span>,
  disabled = <span class="hljs-literal">false</span>,
  loading = <span class="hljs-literal">false</span>,
  onClick,
  ...rest
}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> baseClasses = [
    <span class="hljs-string">&#x27;inline-flex&#x27;</span>,
    <span class="hljs-string">&#x27;items-center&#x27;</span>,
    <span class="hljs-string">&#x27;justify-center&#x27;</span>,
    <span class="hljs-string">&#x27;rounded-md&#x27;</span>,
    <span class="hljs-string">&#x27;font-medium&#x27;</span>,
    <span class="hljs-string">&#x27;transition-colors&#x27;</span>,
    <span class="hljs-string">&#x27;focus:outline-none&#x27;</span>,
    <span class="hljs-string">&#x27;focus:ring-2&#x27;</span>,
    <span class="hljs-string">&#x27;focus:ring-offset-2&#x27;</span>,
  ];

  <span class="hljs-keyword">const</span> variantClasses = {
    <span class="hljs-attr">primary</span>: [
      <span class="hljs-string">&#x27;bg-blue-600&#x27;</span>,
      <span class="hljs-string">&#x27;text-white&#x27;</span>,
      <span class="hljs-string">&#x27;hover:bg-blue-700&#x27;</span>,
      <span class="hljs-string">&#x27;focus:ring-blue-500&#x27;</span>,
      <span class="hljs-string">&#x27;disabled:bg-blue-300&#x27;</span>,
    ],
    <span class="hljs-attr">secondary</span>: [
      <span class="hljs-string">&#x27;bg-gray-200&#x27;</span>,
      <span class="hljs-string">&#x27;text-gray-900&#x27;</span>,
      <span class="hljs-string">&#x27;hover:bg-gray-300&#x27;</span>,
      <span class="hljs-string">&#x27;focus:ring-gray-500&#x27;</span>,
      <span class="hljs-string">&#x27;disabled:bg-gray-100&#x27;</span>,
    ],
    <span class="hljs-attr">danger</span>: [
      <span class="hljs-string">&#x27;bg-red-600&#x27;</span>,
      <span class="hljs-string">&#x27;text-white&#x27;</span>,
      <span class="hljs-string">&#x27;hover:bg-red-700&#x27;</span>,
      <span class="hljs-string">&#x27;focus:ring-red-500&#x27;</span>,
      <span class="hljs-string">&#x27;disabled:bg-red-300&#x27;</span>,
    ],
    <span class="hljs-attr">success</span>: [
      <span class="hljs-string">&#x27;bg-green-600&#x27;</span>,
      <span class="hljs-string">&#x27;text-white&#x27;</span>,
      <span class="hljs-string">&#x27;hover:bg-green-700&#x27;</span>,
      <span class="hljs-string">&#x27;focus:ring-green-500&#x27;</span>,
      <span class="hljs-string">&#x27;disabled:bg-green-300&#x27;</span>,
    ],
  };

  <span class="hljs-keyword">const</span> sizeClasses = {
    <span class="hljs-attr">sm</span>: [<span class="hljs-string">&#x27;text-sm&#x27;</span>, <span class="hljs-string">&#x27;px-3&#x27;</span>, <span class="hljs-string">&#x27;py-1.5&#x27;</span>],
    <span class="hljs-attr">md</span>: [<span class="hljs-string">&#x27;text-sm&#x27;</span>, <span class="hljs-string">&#x27;px-4&#x27;</span>, <span class="hljs-string">&#x27;py-2&#x27;</span>],
    <span class="hljs-attr">lg</span>: [<span class="hljs-string">&#x27;text-base&#x27;</span>, <span class="hljs-string">&#x27;px-6&#x27;</span>, <span class="hljs-string">&#x27;py-3&#x27;</span>],
  };

  <span class="hljs-keyword">const</span> classes = <span class="hljs-title function_">clsx</span>(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      <span class="hljs-string">&#x27;opacity-50 cursor-not-allowed&#x27;</span>: disabled || loading,
      <span class="hljs-string">&#x27;cursor-wait&#x27;</span>: loading,
    },
    className,
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classes}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled</span> || <span class="hljs-attr">loading</span>} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span> {<span class="hljs-attr">...rest</span>}&gt;</span>
      {loading &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mr-2 -ml-1 h-4 w-4 animate-spin&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">circle</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;opacity-25&quot;</span>
            <span class="hljs-attr">cx</span>=<span class="hljs-string">&quot;12&quot;</span>
            <span class="hljs-attr">cy</span>=<span class="hljs-string">&quot;12&quot;</span>
            <span class="hljs-attr">r</span>=<span class="hljs-string">&quot;10&quot;</span>
            <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
            <span class="hljs-attr">strokeWidth</span>=<span class="hljs-string">&quot;4&quot;</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;opacity-75&quot;</span>
            <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;currentColor&quot;</span>
            <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z&quot;</span>
          /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
      )}
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Button</span>;
</code></pre>
<p>أنشئ مكوّن Modal في <code>packages/ui/src/components/Modal.tsx</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> clsx <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;clsx&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ModalProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/types&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Modal</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ModalProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ isOpen, onClose, title, children, className }</span>) =&gt;</span> {
  <span class="hljs-comment">// Handle ESC key press</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleEsc</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">KeyboardEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Escape&#x27;</span>) {
        <span class="hljs-title function_">onClose</span>();
      }
    };

    <span class="hljs-keyword">if</span> (isOpen) {
      <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleEsc);
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">style</span>.<span class="hljs-property">overflow</span> = <span class="hljs-string">&#x27;hidden&#x27;</span>;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;keydown&#x27;</span>, handleEsc);
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">style</span>.<span class="hljs-property">overflow</span> = <span class="hljs-string">&#x27;auto&#x27;</span>;
    };
  }, [isOpen, onClose]);

  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fixed inset-0 z-50 overflow-y-auto&quot;</span>&gt;</span>
      {/* Backdrop */}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-opacity-50 fixed inset-0 bg-black transition-opacity&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span> /&gt;</span>

      {/* Modal */}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex min-h-full items-center justify-center p-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{clsx(</span>&#x27;<span class="hljs-attr">relative</span> <span class="hljs-attr">w-full</span> <span class="hljs-attr">max-w-md</span> <span class="hljs-attr">rounded-lg</span> <span class="hljs-attr">bg-white</span> <span class="hljs-attr">shadow-xl</span>&#x27;, <span class="hljs-attr">className</span>)}&gt;</span>
          {/* Header */}
          {title &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;border-b border-gray-200 px-6 py-4&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-lg font-semibold text-gray-900&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;absolute top-4 right-4 text-gray-400 hover:text-gray-600&quot;</span>
              &gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;sr-only&quot;</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;h-6 w-6&quot;</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;none&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">&quot;currentColor&quot;</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">path</span>
                    <span class="hljs-attr">strokeLinecap</span>=<span class="hljs-string">&quot;round&quot;</span>
                    <span class="hljs-attr">strokeLinejoin</span>=<span class="hljs-string">&quot;round&quot;</span>
                    <span class="hljs-attr">strokeWidth</span>=<span class="hljs-string">{2}</span>
                    <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M6 18L18 6M6 6l12 12&quot;</span>
                  /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          )}

          {/* Content */}
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;px-6 py-4&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Modal</span>;
</code></pre>
<p>أنشئ ملف التصدير الرئيسي <code>packages/ui/src/index.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Export all components</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./components/Button&#x27;</span>;
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Modal</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./components/Modal&#x27;</span>;

<span class="hljs-comment">// Re-export types for convenience</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ButtonProps</span>, <span class="hljs-title class_">ModalProps</span>, <span class="hljs-title class_">ThemeVariant</span>, <span class="hljs-title class_">Size</span>, <span class="hljs-title class_">BaseProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/types&#x27;</span>;
</code></pre>
<h2 id="تهيئة-مراجع-مشاريع-typescript">تهيئة مراجع مشاريع TypeScript</h2>
<p>يجري السحر في ملف <code>tsconfig.json</code> الجذري. هذا الملف ينسّق البناء عبر كل الحزم:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dom&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dom.iterable&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;es6&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowSyntheticDefaultImports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;esnext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isolatedModules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;@my-org/ui&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;./packages/ui/src&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@my-org/types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;./packages/types/src&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/types&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/ui&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/web-app&quot;</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يتيح إسناد <code>paths</code> لـ TypeScript أن يحل الاستيرادات من الحزم أثناء التطوير، فيما تُفعّل <code>references</code> التصريف التدريجي عبر الحزم.</p>
<h2 id="إنشاء-تطبيق-مستهلك">إنشاء تطبيق مستهلك</h2>
<p>لننشئ الآن تطبيقًا يستخدم مكتبة واجهة المستخدم المشتركة عندنا. أنشئ <code>packages/web-app</code>:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p packages/web-app/src
<span class="hljs-built_in">cd</span> packages/web-app
</code></pre>
<p>أنشئ <code>packages/web-app/package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;web-app&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;private&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc &amp;&amp; vite build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@my-org/ui&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@my-org/types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@types/react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@vitejs/plugin-react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.0.0&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ <code>packages/web-app/tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../types&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../ui&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ تطبيقًا بسيطًا في <code>packages/web-app/src/App.tsx</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span>, <span class="hljs-title class_">Modal</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/ui&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">User</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/types&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">App</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [isModalOpen, setIsModalOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> = {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
    <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-comment">// Simulate API call</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">2000</span>));
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">setIsModalOpen</span>(<span class="hljs-literal">true</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex min-h-screen items-center justify-center bg-gray-100&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg bg-white p-8 shadow-md&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 text-2xl font-bold&quot;</span>&gt;</span>Monorepo Demo<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4&quot;</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;space-x-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">{loading}</span>&gt;</span>
            {loading ? &#x27;Loading...&#x27; : &#x27;Open Modal&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;secondary&quot;</span>&gt;</span>Secondary Action<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>

          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;danger&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;sm&quot;</span>&gt;</span>
            Delete
          <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isModalOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)} title=&quot;User Profile&quot;&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;space-y-2&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Name:<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> {user.name}
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Email:<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> {user.email}
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Joined:<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> {user.createdAt.toLocaleDateString()}
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">App</span>;
</code></pre>
<h2 id="تهيئة-البناء-وسير-العمل">تهيئة البناء وسير العمل</h2>
<p>أنشئ سكربت بناء لحزمة واجهة المستخدم بواسطة Rollup. أضف <code>packages/ui/rollup.config.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> typescript <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rollup/plugin-typescript&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">input</span>: <span class="hljs-string">&#x27;src/index.ts&#x27;</span>,
  <span class="hljs-attr">output</span>: [
    {
      <span class="hljs-attr">file</span>: <span class="hljs-string">&#x27;dist/index.js&#x27;</span>,
      <span class="hljs-attr">format</span>: <span class="hljs-string">&#x27;esm&#x27;</span>,
      <span class="hljs-attr">sourcemap</span>: <span class="hljs-literal">true</span>,
    },
  ],
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">typescript</span>({
      <span class="hljs-attr">tsconfig</span>: <span class="hljs-string">&#x27;./tsconfig.json&#x27;</span>,
      <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
    }),
  ],
  <span class="hljs-attr">external</span>: [<span class="hljs-string">&#x27;react&#x27;</span>, <span class="hljs-string">&#x27;react-dom&#x27;</span>, <span class="hljs-string">&#x27;clsx&#x27;</span>, <span class="hljs-string">&#x27;@my-org/types&#x27;</span>],
};
</code></pre>
<p>الآن نستطيع بناء كل شيء من الجذر:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Install all dependencies</span>
pnpm install

<span class="hljs-comment"># Build all packages</span>
pnpm build

<span class="hljs-comment"># Run type checking across all packages</span>
pnpm type-check

<span class="hljs-comment"># Start development servers</span>
pnpm dev
</code></pre>
<h2 id="أنماط-متقدمة-وأفضل-الممارسات">أنماط متقدمة وأفضل الممارسات</h2>
<h3 id="التصديرات-البرميلية-barrel-exports-لاستيراد-نظيف">التصديرات البرميلية (barrel exports) لاستيراد نظيف</h3>
<p>بدلًا من الاستيراد من مسارات معمّقة، أنشئ تصديرات برميلية في حزمة واجهة المستخدم عندك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// packages/ui/src/components/index.ts</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Button&#x27;</span>;
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Modal</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Modal&#x27;</span>;

<span class="hljs-comment">// packages/ui/src/hooks/index.ts</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> useLocalStorage } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./useLocalStorage&#x27;</span>;

<span class="hljs-comment">// packages/ui/src/index.ts</span>
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./components&#x27;</span>;
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./hooks&#x27;</span>;
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@my-org/types&#x27;</span>;
</code></pre>
<h3 id="تهيئة-بناء-مشتركة">تهيئة بناء مشتركة</h3>
<p>أنشئ تهيئة TypeScript مشتركة للإعدادات العامة:</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.base.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dom&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dom.iterable&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;es6&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowSyntheticDefaultImports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isolatedModules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم قم بتوسيعه في كل حزمة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;../../tsconfig.base.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// package-specific overrides</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="التحقق-النوعي-عند-وقت-التشغيل">التحقق النوعي عند وقت التشغيل</h3>
<p>أما الأنواع المشتركة التي تعبر حدود API فأضف إلى جانب أنواع TypeScript عندك مخططات Zod:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// packages/types/src/user.ts</span>
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">avatarUrl</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">createdAt</span>: z.<span class="hljs-title function_">date</span>(),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserSchema</span>&gt;;

<span class="hljs-comment">// Export both type and runtime validator</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> parseUser = (<span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-function"><span class="hljs-params">User</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">parse</span>(data);
};
</code></pre>
<p>بهذا تربح أنواعًا عند وقت التصريف وتحقّقًا عند وقت التشغيل من التعريف نفسه.</p>
<h2 id="الأخطاء-الشائعة-وحلولها">الأخطاء الشائعة وحلولها</h2>
<h3 id="الاعتمادات-الدائرية">الاعتمادات الدائرية</h3>
<p>انتبه للاستيرادات الدائرية بين الحزم. إن احتاجت حزمة أنواعك أنواعًا خاصة بواجهة المستخدم، فأنشئ حزمة <code>ui-types</code> منفصلة أو انقل الأنواع المشتركة إلى موضع أعم.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Avoid this pattern</span>
<span class="hljs-comment">// packages/types depends on packages/ui</span>
<span class="hljs-comment">// packages/ui depends on packages/types</span>

<span class="hljs-comment">// ✅ Better approach</span>
<span class="hljs-comment">// packages/ui-types (specific to UI components)</span>
<span class="hljs-comment">// packages/api-types (shared between frontend/backend)</span>
<span class="hljs-comment">// packages/ui depends on ui-types and api-types</span>
</code></pre>
<h3 id="مشكلات-ترتيب-البناء">مشكلات ترتيب البناء</h3>
<p>استخدم مراجع مشاريع TypeScript على الصحيح حتى تُبنى الحزم بترتيب صحيح:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Build everything with proper dependencies</span>
npx tsc --build

<span class="hljs-comment"># Or use pnpm&#x27;s built-in ordering</span>
pnpm --recursive run build
</code></pre>
<h3 id="استيراد-التطوير-مقابل-الإنتاج">استيراد التطوير مقابل الإنتاج</h3>
<p>أثناء التطوير تريد أن تُفسَّر الاستيرادات إلى ملفات المصدر. وفي الإنتاج تريد أن تُفسَّر إلى ملفات <code>.d.ts</code> المُبنَأة. فتهيئة <code>paths</code> في ملف <code>tsconfig.json</code> الجذري تعتني بالتطوير، بينما يعتني حقل <code>types</code> في <code>package.json</code> بأعمال البناء الإنتاجية.</p>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>أنت الآن تملك مستودعًا موحّدًا عاملًا بالكامل فيه مكوّنات وأنواع واجهة المستخدم المشتركة. هذه بعض التحسينات الجديرة بالنظر:</p>
<ul>
<li><strong>Storybook:</strong> أضف توثيقًا واختبارًا للمكوّنات</li>
<li><strong>الاختبار:</strong> هيّئ Jest بحل وحدات سليم للاختبارات عبر الحزم</li>
<li><strong>الفحص:</strong> شارك تهيئات ESLint عبر الحزم</li>
<li><strong>النشر:</strong> استخدم Changesets لإدارة الإصدارات ونشر الحزم كلًّا على حدة</li>
<li><strong>التكامل والنشر المستمر (CI/CD):</strong> هيّئ ذاكرة تخزينٍ مؤقتة للبناء لا تعيد بناء إلا الحزم المتغيرة</li>
</ul>
<p>تندرج هذه الأنماط جيدًا سواء بُني نظام تصاميم لمؤسسة واحدة أم تُدار عشرات الحزم المرتبطة بعضها بعضًا. والمفتاح هو المحافظة على حدود واضحة بين الحزم مع الاستفادة من مراجع مشاريع TypeScript في إبقاء كل شيء آمن الأنواع وقابلًا للبناء.</p>
<p>تذكر: المستودعات الموحّدة تخص التنظيم وسير العمل لا المعمارية. أبقِ مكوّناتك مركّزة، وأنواعك محددة، وعملية بنائك متوقعة. وستتكفل الأدوات بالبقية.</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,o as default,t as headings,c as html,p as slug,l as title};
