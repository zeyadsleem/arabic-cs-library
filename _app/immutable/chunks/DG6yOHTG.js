const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="versioning-and-release-management",p="إدارة الإصدارات والنشر",c=[{depth:2,id:"ابدأ-بالعقد",text:"ابدأ بالعقد"},{depth:2,id:"رموز-التصميم-بوصفها-العقد-الجذري",text:"رموز التصميم بوصفها العقد الجذري"},{depth:2,id:"ابن-رسما-بيانيا-طبقيا-للحزم",text:"ابنِ رسمًا بيانيًا طَبَقيًا للحزم"},{depth:2,id:"ميكانيكا-مساحة-العمل",text:"ميكانيكا مساحة العمل"},{depth:2,id:"الإصدار-باستخدام-changesets",text:"الإصدار باستخدام Changesets"},{depth:2,id:"تقادم-ينجح-فعلا",text:"تقادم ينجح فعلًا"},{depth:2,id:"خارج-المستودع-الأحادي",text:"خارج المستودع الأحادي"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"changesets",text:"Changesets"}],o=`<p>قبل أن نتحدّث عن أرقام الإصدارات، علينا أن نتحدّث عمّا نُصدر له نسخًا. فنظام التصميم ليس حزمة واحدة، بل رسم بياني من الحزم—الرموز، والسمات، والأسس، والعناصر الأولية، والمكوّنات الخاصة بكل إطار—تنمو بسرعات مختلفة. وإن حاولت إصدارها كلها بالتناسق ذاته، انتهيت إلى قفزات كبرى في حزمة الأيقونات لأن أحدهم أعاد تسمية خاصية في زر. وإن أصدَرتها باستقلالية بلا تنسيق، انتهيت إلى مستهلكين مثبَّتين على ست نسخ غير متوافقة من أشياء يُفترض أنها تعمل معًا.</p>
<p>والجواب يقع في مكان ما بين الاثنين، ويبدأ بامتلاك عقد واضح.</p>
<h2 id="ابدأ-بالعقد">ابدأ بالعقد</h2>
<p>عامل نظام التصميم كمنتَج له واجهة برمجية عامة، لأن أرقام الإصدارات بلا واجهة برمجية عامة ليست إلا أرقامًا للزينة. فـ<a href="https://semver.org/">الإصدار الدلالي (Semantic Versioning)</a> يشترط صراحةً واجهة برمجية عامة معلنة، ويربط الإصدارات الثانوية بالإضافةات وإعلانات التقادم المتوافقة مع ما قبلها، ويحفظ الإصدارات الرئيسية للتغييرات الكاسرة.</p>
<p>وبالنسبة إلى نظام تصميم، لا تقتصر تلك الواجهة البرمجية على خصائص المكوّنات، بل تشمل:</p>
<ul>
<li>أسماء الرموز (tokens) ومعانيها الدلالية.</li>
<li>خصائص CSS المخصّصة المولَّدة.</li>
<li>سياقات السمات المدعومة.</li>
<li>سلوك إمكانية الوصول.</li>
<li>أي خطّافات DOM أو تنسيق موثّقة يُقال للفرق المستهلكة إنها تستطيع الاعتماد عليها.</li>
</ul>
<p>فإن أعدت تسمية رمز، فذلك تغيير كاسر. وإن غيّرت نمط التفاعل بلوحة المفاتيح في مكوّن، فذلك تغيير كاسر. وإن أضفت رمز لون جديدًا، فذلك إصدار ثانوي. وقواعد الإصدار ليست مختلفة عن أي مكتبة أخرى—لكنها تنطبق على سطح أوسع مما يفكّر فيه معظم الناس.</p>
<h2 id="رموز-التصميم-بوصفها-العقد-الجذري">رموز التصميم بوصفها العقد الجذري</h2>
<p>ينبغي أن تكون الرموز أساس العقد. فقد أصدرت <a href="https://www.w3.org/community/design-tokens/">مجموعة مجتمع رموز التصميم (Design Tokens Community Group)</a> صيغة DTCG 2025.10 المستقرة، وهي تصف الرموز طريقة محايدة تجاه المنصات للتعبير عن قرارات التصميم، وتدفّق البيانات بين الأدوات، والحفاظ على مصدر حقيقة واحد عبر التصميم والتطوير.</p>
<p>وهذا هو النموذج الذهني الصحيح لنظام تصميم عابر للتطبيقات—لا «كومة SCSS بآراء»، وهو ما تنحدر إليه هذه الأمور عادةً.</p>
<p>وهذا مصدر رموز أدنى بصيغة DTCG:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://www.designtokens.org/schemas/2025.10/format.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;primary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;$type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;color&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;$value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;#2563eb&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;primary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;$type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;color&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;$value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{color.brand.primary}&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;button&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;background&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;$type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;color&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;$value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{color.brand.primary}&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;legacyBackground&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;$type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;color&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;$value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{button.background}&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;$deprecated&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use {button.background} instead.&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وتمنحك الصيغة أسماء بديلة (فيُحلّ <code>color.text.primary</code> عبر <code>color.brand.primary</code>)، وقيمًا مُنوّعة، وبيانات وصفية صريحة للتقادم مع شرح اختياري—في ملف الرموز نفسه، بدل إخفاء الترحيلات في تنقيب محادثات Slack.</p>
<p>استخدم مصدر رموز واحدًا مرجعيًا وولّد منه مخرجات المنصات. وقد صُمّم <a href="https://styledictionary.com/">Style Dictionary</a> لهذا بالضبط: تصدير الرموز إلى منصات متعددة (CSS وJS وiOS وAndroid) مع تحويلات لكل منصة، فيُنتج المصدر نفسه كل المخرجات دون تفرّع التعريفات الأساسية.</p>
<h2 id="ابن-رسما-بيانيا-طبقيا-للحزم">ابنِ رسمًا بيانيًا طَبَقيًا للحزم</h2>
<p>يحتاج نظام التصميم الذي عليه أن يصمد أمام تطبيقات مستهلكة متعددة إلى رسم بياني للحزم باعتمادات أحادية الاتجاه. وأبسط تقسيم مَعْمور:</p>
<pre><code>tokens → themes → foundations → framework adapters → composed components → app patterns
</code></pre>
<p>أبقِ الرسم البياني بلا حلقات. فـ<a href="https://pnpm.io/workspaces">pnpm يحذّر صراحةً</a> من الاعتمادات الدائرية في مساحة العمل، و<a href="https://www.typescriptlang.org/docs/handbook/project-references.html">مراجع مشاريع TypeScript</a> موجودة لتقسيم البرامج الكبيرة إلى قطع أصغر بفصل أوضح وبناء أسرع.</p>
<p>وهذا تخطيط صحي لمستودع أحادي:</p>
<pre><code>repo/
  apps/
    shell/
    admin/
    storefront/
  packages/
    design-tokens/
    theme-default/
    theme-brand-b/
    foundations-css/
    icons/
    react-primitives/
    react-components/
    vue-components/
    storybook-host/
    eslint-config/
    tsconfig/
</code></pre>
<p>والجزء المهم ليس أسماء المجلدات الدقيقة، بل اتجاه الاعتماد. فيمكن لـ<code>react-components</code> أن تعتمد على <code>react-primitives</code> و<code>foundations-css</code> والرموز. أما <code>design-tokens</code> فيجب ألا تعتمد على أي شيء في أعلى التدفّق. وينبغي أن تستهلك حزم التطبيقات الحزم العامة، لا أن تمتد إلى الدواخل الخاصة لأن أحدهم نفد صبره وكان لديه صلاحية كتابة في المستودع. فهكذا تتحوّل «البنية التحتية المشتركة» إلى «ضرر مشترك».</p>
<h2 id="ميكانيكا-مساحة-العمل">ميكانيكا مساحة العمل</h2>
<p>ينبغي أن تكون كل طبقة في نظام التصميم حزمة حقيقية. فـ<a href="https://docs.npmjs.com/cli/v7/using-npm/workspaces/">مساحات عمل npm</a> تدير حزمًا متعددة تحت جذر واحد وتربطها تلقائيًا بروابط رمزية في <code>node_modules</code>. وتضيف <a href="https://pnpm.io/workspaces">مساحات عمل pnpm</a> بروتوكول <code>workspace:</code> أكثر صرامة يرفض الحل من السجل عندما تعني «حزمة محلية فقط»، ويعيد كتابة اعتمادات <code>workspace:</code> إلى نطاقات semver عادية عند النشر. وهذا يجعل التطوير المحلي سريعًا دون إفساد المستهلكين المنشورين.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/react-components&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.8.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@acme/design-tokens&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/foundations-css&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/react-primitives&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>طابِق حدود الحزم مع مراجع مشاريع TypeScript كي لا يُجبر تغيير رمزٍ كل تطبيق غير ذي صلة على إعادة البناء بلا داعٍ:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/design-tokens&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/react-primitives&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/react-components&quot;</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وإن كنت تستخدم Nx، فـ<a href="https://nx.dev/docs/features/enforce-module-boundaries">قواعد حدود الوحدات</a> مع الوسوم تُبقي الرسم البياني صادقًا. وهذا أرخص بكثير من اكتشاف بعد ستة أشهر أن حزمة الرموز تستورد خُطّاف React لأن فريقًا كان «يتحرّك بسرعة».</p>
<h2 id="الإصدار-باستخدام-changesets">الإصدار باستخدام Changesets</h2>
<p>لا تبتكر طقسك الخاص في الإصدار. فـ<a href="https://pnpm.io/workspaces">وثائق pnpm نفسها</a> تقول إن إصدار مساحات العمل معقّد وغير مدمج، وتوجّه الناس إلى <a href="https://changesets-docs.vercel.app/">Changesets</a>. وهي مبنية لغرض المستودعات الأحادية تحديدًا: فكل تغيير يسجّل نيّة الإصدار، وتنسّق الأداة قفزات الإصدار عبر الحزم المعتمدة.</p>
<p>وسير العمل:</p>
<ol>
<li>يُجري مطوّر تغييرًا ويشغّل <code>npx changeset</code> لوصفه—تصحيحي أو ثانوي أو رئيسي، مع ملخّص يقرأه الإنسان.</li>
<li>ويُودَع ملف التغيير (changeset) في طلب السحب إلى جانب تغيير الشيفرة.</li>
<li>وعند وقت الإصدار، يستهلك <code>npx changeset version</code> كل التغييرات المعلّقة، ويرفع الإصدارات، ويحدّث الاعتمادات بين الحزم، ويكتب سجلات التغييرات.</li>
<li>ويدفع <code>npx changeset publish</code> إلى السجل.</li>
</ol>
<p>وهذا ينجح جيدًا لأن الرموز والأيقونات والأسس ومهايئات الأطر نادرًا ما تتغيّر بتناسق تام. فالإصدار المستقل مع رفع اعتمادات منسّق هو النقطة المثلى.</p>
<h2 id="تقادم-ينجح-فعلا">تقادم ينجح فعلًا</h2>
<p>اجعل التقادم مرئيًا <em>قبل</em> الإزالة. <a href="https://semver.org/">يقول SemVer</a> إن إعلانات التقادم ينبغي أن تُشحن في إصدار ثانوي، وإن الإزالات الكاسرة تتطلب إصدارًا رئيسيًا. وهذا يعني أن إعادة تسمية الرموز، وإزالة الخصائص، وإزالة متغيرات CSS، وتغييرات سلوك إمكانية الوصول كلها تحتاج إلى إصدار مدروس—لا دمج مفاجئ في يوم جمعة.</p>
<p>وبالنسبة إلى الرموز، استخدم البيانات الوصفية <code>$deprecated</code> في <a href="https://www.designtokens.org/TR/2025.10/format/">صيغة DTCG</a> نفسها:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;button&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;legacyBackground&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;$type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;color&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;$value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{button.background}&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;$deprecated&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use button.background instead. Will be removed in 3.0.&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ومع التوثيق المولَّد، لا ترى الفرق المستهلكة <em>أن</em> شيئًا ما تقادم فحسب، بل أيضًا ما ينبغي استخدامه بدلًا منه. واشحن codemods للترحيلات الميكانيكية وقواعد lint التي ترصد الرموز المتقادمة في CI. فالأتمتة تتغلّب على مستندات السياسات في كل مرة.</p>
<h2 id="خارج-المستودع-الأحادي">خارج المستودع الأحادي</h2>
<p>إن كانت تطبيقاتك المستهلكة تعيش في مستودعات منفصلة، فأبقِ سياسة توافق بسيطة: ادعم الإصدار الرئيسي الحالي لنظام التصميم ورئيسيًا سابقًا واحدًا خلال نوافذ الطرح. وانشر أدلة الترحيل و codemods لكل إصدار رئيسي. وتتبّع مقاييس التبنّي—أي التطبيقات على أي إصدار—لتعرف متى يكون إسقاط الرئيسي القديم آمنًا.</p>
<p>فنافذة التوافق هي الفرق بين «أعلنّا تقادم هذا» و«أعلنّا تقادم هذا ثم ساعدناك على الانتقال». واحدة منهما تنال التبنّي، والأخرى تُتجاهل.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="changesets">Changesets</h3>
<blockquote>
<p>إدارة إصدارات يقرأها الإنسان للمستودعات الأحادية.</p>
</blockquote>
<pre><code>Developer workflow:
1. Make changes
2. Run \`npx changeset\` → writes a markdown file describing the change
3. Commit the changeset file with the PR
4. On merge, CI collects changesets → bumps versions → publishes → writes CHANGELOG
</code></pre>
<ul>
<li>تعلن كل تغييرة: أي الحزم تغيّرت، ونوع قفزة semver، والوصف.</li>
<li>تدعم الإصدار المستقل (لكل حزمة إصدارها) أو الثابت (تشترك كل الحزم في إصدار واحد).</li>
<li>تُؤتمت سؤال «ما الذي تغيّر في هذا الإصدار؟».</li>
</ul>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:c,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,c as headings,o as html,t as slug,p as title};
