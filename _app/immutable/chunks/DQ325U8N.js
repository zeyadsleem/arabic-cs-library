const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="wire-the-static-layer-into-shelf-solution",t="الحل",p=[{depth:2,id:"ما-يجب-إضافته",text:"ما يجب إضافته"},{depth:3,id:"الجزء-1-قواعد-eslint-المخصصة",text:"الجزء 1: قواعد ESLint المخصصة"},{depth:3,id:"الجزء-2-الوضع-الصارم-في-typescript",text:"الجزء 2: الوضع الصارم في TypeScript"},{depth:3,id:"الجزء-3-كشف-الشيفرة-الميتة-باستخدام-knip",text:"الجزء 3: كشف الشيفرة الميتة باستخدام knip"},{depth:3,id:"الجزء-4-lefthook",text:"الجزء 4: Lefthook"},{depth:3,id:"الجزء-5-فحص-الأسرار-باستخدام-gitleaks",text:"الجزء 5: فحص الأسرار باستخدام gitleaks"},{depth:3,id:"الجزء-6-تحديث-claudemd",text:"الجزء 6: تحديث CLAUDE.md"},{depth:2,id:"ما-لا-يزال-عليك-تشغيله",text:"ما لا يزال عليك تشغيله"},{depth:2,id:"أنماط-تستحق-الاحتفاظ-بها",text:"أنماط تستحق الاحتفاظ بها"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>هذا أطول مختبر وأطول حل. مشروع Shelf الأولي الحالي أصغر عمدًا، لذا هذا الحل هو النسخة القابلة للنسخ من الطبقة الساكنة التي تضيفها أثناء المختبر. سأستعرض كل جزء بالترتيب، وأعرض الملف الذي يجب إنشاؤه أو توسيعه، وأشرح السبب، وأعطيك الأوامر التي تثبت أنه يعمل.</p>
<h2 id="ما-يجب-إضافته">ما يجب إضافته</h2>
<h3 id="الجزء-1-قواعد-eslint-المخصصة">الجزء 1: قواعد ESLint المخصصة</h3>
<p>افتح <code>eslint.config.js</code>. بعد كتل إعداد Svelte/TypeScript/Prettier القياسية، توجد كتلتان من <code>no-restricted-syntax</code>.</p>
<p>الكتلة الأولى تُطبَّق عالميًا — على كل ملف في المشروع:</p>
<pre><code class="language-javascript">{
  <span class="hljs-attr">rules</span>: {
    <span class="hljs-string">&#x27;no-restricted-syntax&#x27;</span>: [
      <span class="hljs-string">&#x27;error&#x27;</span>,
      {
        <span class="hljs-attr">selector</span>:
          <span class="hljs-string">&quot;CallExpression[callee.property.name=&#x27;waitForLoadState&#x27;] &gt; Literal[value=&#x27;networkidle&#x27;]&quot;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;networkidle is unreliable. Wait on a real signal.&#x27;</span>
      },
      {
        <span class="hljs-attr">selector</span>:
          <span class="hljs-string">&quot;MemberExpression[object.type=&#x27;MemberExpression&#x27;][object.property.name=&#x27;body&#x27;][property.name=&#x27;userId&#x27;]&quot;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Read userId from the session, not the request body. See CLAUDE.md → Auth.&#x27;</span>
      }
    ]
  }
}
</code></pre>
<p>تستخدم قاعدة <code>networkidle</code> المُركِّب الابني (<code>&gt;</code>) لمطابقة عقدة <code>Literal</code> قيمتها <code>'networkidle'</code> وتكون وسيطًا مباشرًا لـ <code>waitForLoadState</code>. أما قاعدة <code>userId</code> فتستخدم مطابقة <code>MemberExpression</code> متداخلة — <code>body.userId</code> — لأن فحص اسم خاصية بسيط على <code>userId</code> سيُفعَّل مع كل كائن يصادف أن لديه حقل <code>userId</code>. التداخل يقول «تحديدًا <code>something.body.userId</code>»، وهذا هو شكل القراءة من جسم طلب مُحلَّل.</p>
<p>الكتلة الثانية محصورة في <code>tests/end-to-end/**/*.ts</code> فقط:</p>
<pre><code class="language-javascript">{
  <span class="hljs-attr">files</span>: [<span class="hljs-string">&#x27;tests/end-to-end/**/*.ts&#x27;</span>],
  <span class="hljs-attr">rules</span>: {
    <span class="hljs-string">&#x27;no-restricted-syntax&#x27;</span>: [
      <span class="hljs-string">&#x27;error&#x27;</span>,
      {
        <span class="hljs-attr">selector</span>: <span class="hljs-string">&quot;CallExpression[callee.property.name=&#x27;waitForTimeout&#x27;]&quot;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;page.waitForTimeout is banned. See CLAUDE.md → Playwright → Waiting.&#x27;</span>
      },
      {
        <span class="hljs-attr">selector</span>: <span class="hljs-string">&quot;CallExpression[callee.property.name=&#x27;locator&#x27;][arguments.0.type=&#x27;Literal&#x27;]&quot;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Use a getByRole/getByLabel locator. See CLAUDE.md → Playwright → Locators.&#x27;</span>
      },
      {
        <span class="hljs-attr">selector</span>:
          <span class="hljs-string">&quot;CallExpression[callee.property.name=&#x27;waitForLoadState&#x27;] &gt; Literal[value=&#x27;networkidle&#x27;]&quot;</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;networkidle is unreliable. Wait on a real signal.&#x27;</span>
      }
    ]
  }
}
</code></pre>
<p>إن حظر <code>waitForTimeout</code> واستدعاء <code>locator()</code> الخام لا ينطبق إلا على ملفات اختبارات من طرف إلى طرف. فحظر <code>waitForTimeout</code> في شيفرة التطبيق سيكون مبالغة — فهناك استخدامات مشروعة لـ <code>setTimeout</code> في منطق التطبيق. لكن في ملفات الاختبار، كل <code>waitForTimeout</code> هو تقلّب ينتظر أن يحدث، وكل <code>page.locator('.some-class')</code> خام هو محدِّد هشّ ينبغي أن يكون <code>getByRole</code> أو <code>getByLabel</code>.</p>
<p>تظهر قاعدة <code>networkidle</code> في <em>كلتا</em> الكتلتين. وهذا متعمد: فالكتلة العالمية تلتقط معالجات المسارات أو شيفرة الأدوات المساعدة التي قد تستدعي <code>waitForLoadState</code>، والكتلة المحصورة تضمن ألا تحجب كتلة القواعد الخاصة بالاختبارات الكتلة العالمية عن غير قصد. فقاعدة <code>no-restricted-syntax</code> في ESLint تستبدل القاعدة بأكملها عندما يعيد إعداد محصور تعريفها، لذا يجب أن تعيد كتلة الاختبار تضمين الأنماط التي تريد الاحتفاظ بها.</p>
<p><strong>التحقق:</strong></p>
<pre><code class="language-bash"><span class="hljs-comment"># Clean baseline</span>
npm run lint

<span class="hljs-comment"># Prove waitForTimeout fires</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;page.waitForTimeout(1000);&quot;</span> &gt;&gt; tests/smoke.spec.ts
npm run lint 2&gt;&amp;1 | grep <span class="hljs-string">&quot;waitForTimeout is banned&quot;</span>
git checkout tests/smoke.spec.ts
</code></pre>
<h3 id="الجزء-2-الوضع-الصارم-في-typescript">الجزء 2: الوضع الصارم في TypeScript</h3>
<p>افتح <code>tsconfig.json</code>. كتلة <code>compilerOptions</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;noUncheckedIndexedAccess&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exactOptionalPropertyTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;noImplicitReturns&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><code>strict: true</code> هو المظلة — فهو يفعّل <code>strictNullChecks</code> و<code>strictFunctionTypes</code> و<code>strictBindCallApply</code> و<code>strictPropertyInitialization</code> و<code>noImplicitAny</code> و<code>noImplicitThis</code> و<code>alwaysStrict</code> و<code>strictBuiltinIteratorReturn</code> و<code>useUnknownInCatchVariables</code>. أما الأعلام الستة المذكورة بعده فليست <em>مشمولة</em> في <code>strict</code> ويجب تفعيلها فرادى.</p>
<p><code>noUncheckedIndexedAccess</code> هو العلم الذي يغيّر حياتك اليومية أكثر من غيره. فبتفعيله، يصبح نوع <code>items[0]</code> هو <code>T | undefined</code> بدلًا من <code>T</code>. وكل وصول إلى فهرس مصفوفة أو قوس كائن يجبرك على التعامل مع الحالة المفقودة. إنه مزعج في الساعة الأولى ثم يلتقط خطأً حقيقيًا، ولن تعطّله بعدها أبدًا.</p>
<p><code>exactOptionalPropertyTypes</code> أكثر صرامة مما تكلف به معظم المشاريع. فهو يعني أن <code>{ x?: string }</code> يسمح بـ <code>undefined</code> <em>فقط</em> عندما يكون المفتاح غائبًا — فلا يمكنك تعيين <code>x: undefined</code> صراحةً. إن كانت الشيفرة القائمة تُصرَّف بنظافة مع هذا العلم، فأبقه مفعّلًا. وإن لم يكن مشروعك كذلك، فهو العلم الوحيد في هذه القائمة الذي يستحق التأجيل.</p>
<p><strong>التحقق:</strong></p>
<pre><code class="language-bash">npm run typecheck
</code></pre>
<h3 id="الجزء-3-كشف-الشيفرة-الميتة-باستخدام-knip">الجزء 3: كشف الشيفرة الميتة باستخدام knip</h3>
<p>افتح <code>knip.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://unpkg.com/knip@6/schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;entry&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;src/app.html&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;src/routes/**/+*.{ts,svelte}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;tests/**/*.{test,spec}.ts&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;tests/helpers/*.ts&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;scripts/*.{ts,mjs}&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;project&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*.{ts,svelte,svelte.ts}&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tests/**/*.ts&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;scripts/**/*.{ts,mjs}&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ignoreDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;@tailwindcss/forms&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;@tailwindcss/typography&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tailwindcss&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>مصفوفة <code>entry</code> تخبر knip من أين يبدأ التنفيذ — ملفات مسارات SvelteKit (<code>+page.ts</code> و<code>+server.ts</code> و<code>+layout.ts</code>)، وملفات الاختبار، والملفات المساعدة، والسكربتات. وكل ما يمكن الوصول إليه من نقاط الدخول هذه يُعدّ «مستخدمًا». وكل ما هو في أنماط <code>project</code> و<em>لا</em> يمكن الوصول إليه هو شيفرة ميتة. إن أضفت مختبرات لاحقة مثل التهيئة الموثّقة أو خادم MCP مخصص، فوسّع هذه الأنماط حينها بدلًا من شحنها في المشروع الأولي.</p>
<p>تتعامل مصفوفة <code>ignoreDependencies</code> مع Tailwind. فـ Tailwind v4 يستخدم توجيهات <code>@import</code> في CSS لجلب إضافاته، لا استيرادات JavaScript، لذا لا يستطيع knip تتبّع سلسلة الاعتماديات. وبدون قائمة التجاهل، يبلّغ knip عن <code>tailwindcss</code> و<code>@tailwindcss/forms</code> و<code>@tailwindcss/typography</code> كاعتماديات غير مستخدمة في كل تشغيل.</p>
<p><strong>التحقق:</strong></p>
<pre><code class="language-bash">npm run knip
</code></pre>
<h3 id="الجزء-4-lefthook">الجزء 4: Lefthook</h3>
<p>ملف واحد. افتح <code>lefthook.yml</code> في جذر المستودع:</p>
<pre><code class="language-yaml"><span class="hljs-attr">pre-commit:</span>
  <span class="hljs-attr">parallel:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">commands:</span>
    <span class="hljs-attr">lint:</span>
      <span class="hljs-attr">glob:</span> <span class="hljs-string">&#x27;*.{ts,svelte,js,mjs,cjs}&#x27;</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">eslint</span> <span class="hljs-string">--fix</span> <span class="hljs-string">--max-warnings=0</span> {<span class="hljs-string">staged_files</span>}
      <span class="hljs-attr">stage_fixed:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">format:</span>
      <span class="hljs-attr">glob:</span> <span class="hljs-string">&#x27;*.{ts,svelte,js,mjs,cjs,json,md,yml,yaml,css}&#x27;</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">prettier</span> <span class="hljs-string">--write</span> {<span class="hljs-string">staged_files</span>}
      <span class="hljs-attr">stage_fixed:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">secrets:</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">tsx</span> <span class="hljs-string">scripts/run-gitleaks-staged.ts</span>

<span class="hljs-attr">pre-push:</span>
  <span class="hljs-attr">commands:</span>
    <span class="hljs-attr">checks:</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">pre-push</span>
</code></pre>
<p>تشغّل كتلة <code>pre-commit</code> ثلاثة أوامر على التوازي. فأمر <code>lint</code> يوسّع <code>{staged_files}</code> إلى الملفات المرحّلة المطابقة لـ <code>glob</code> ويسلّمها إلى ESLint مع <code>--fix --max-warnings=0</code> — فتُصحَّح المشكلات القابلة للإصلاح التلقائي، ويتحول أي تحذير متبقٍّ إلى خطأ. وأمر <code>format</code> يفعل الشيء نفسه مع Prettier، عبر نمط أوسع يغطي أيضًا JSON وMarkdown وYAML وCSS. ويستخدم الأمران <code>stage_fixed: true</code>، الذي يعيد ترحيل كل ما غيّرته أدوات الإصلاح التلقائي. وأمر <code>secrets</code> يشغّل غلاف gitleaks الذي نتناوله في الجزء 5 — وهو غير محصور بـ <code>glob</code> عمدًا لأن الغلاف يعيد سرد الفهرس المرحّل بنفسه وسيُربك بقائمة وسائط مُصفّاة مسبقًا.</p>
<p>كتلة <code>pre-push</code> تستدعي <code>npm run pre-push</code>، الذي يضيفه هذا المختبر للتحقق المحلي: <code>npm run typecheck &amp;&amp; npm run knip &amp;&amp; npm run test:unit</code>. والترتيب مهم — فحص الأنواع هو الأرخص، ثم knip، ثم اختبارات الوحدة أخيرًا. فإن فشل فحص الأنواع، فلن يعمل knip ولا الاختبارات أبدًا.</p>
<p>المشروع الأولي الأدنى لا يوصّل <code>lefthook install</code> بـ <code>prepare</code>. بعد إضافة <code>lefthook.yml</code>، شغّل <code>npx lefthook install</code> مرة واحدة محليًا، ثم قرّر إن كنت تريد طيّ خطوة التثبيت تلك في <code>prepare</code> لمشروعك.</p>
<p><strong>التحقق:</strong></p>
<pre><code class="language-bash"><span class="hljs-comment"># Prove pre-commit fires (from repo root, against whatever you have staged)</span>
npx lefthook run pre-commit

<span class="hljs-comment"># Prove pre-push fires</span>
npx lefthook run pre-push
</code></pre>
<h3 id="الجزء-5-فحص-الأسرار-باستخدام-gitleaks">الجزء 5: فحص الأسرار باستخدام gitleaks</h3>
<p>افتح <code>scripts/run-gitleaks-staged.ts</code>. بحسب إصدار gitleaks المثبّت لديك، قد يفوت <code>gitleaks git --staged</code> الملفات المضافة حديثًا؛ وهذا السكربت الغلافي يزيل ذلك الغموض. فهو يُجسّد فهرس git المرحّل في دليل مؤقت، ويشغّل <code>gitleaks dir</code> عليه، ثم ينظّف.</p>
<p>يفعل السكربت أربعة أشياء:</p>
<p>يسرد الملفات المرحّلة باستخدام <code>git diff --cached --name-only --diff-filter=ACM -z</code>. ويستخدم علم <code>-z</code> بايتات فارغة كفواصل حتى لا تُفسد أسماء الملفات التي تحتوي مسافات التحليل. ويحدّ <code>--diff-filter=ACM</code> على الملفات المضافة والمنسوخة والمعدّلة — فالملفات المحذوفة لا تهمّ في فحص الأسرار.</p>
<p>ولكل ملف مرحّل، يستخرج المحتوى المرحّل بالضبط بـ <code>git show :&lt;path&gt;</code> ويكتبه في الدليل المؤقت. هذه هي النسخة المرحّلة، لا نسخة شجرة العمل — فإن كنت قد رحّلت ملفًا نظيفًا ثم لوّثته في محررك، فإن الفحص يرى النسخة النظيفة. وهذا هو السلوك الصحيح لخطاف ما قبل الإيداع.</p>
<p>ويحلّ مسار برنامج <code>gitleaks</code> بـ <code>which</code>. فإن لم يكن gitleaks مثبّتًا، طبع تحذيرًا وخرج بالرمز صفر. وهذا خيار متعمد: فالأداة المفقودة لا ينبغي أن تعيق التطوير، لكن ينبغي أن تكون صاخبة بشأن الفجوة. وفي CI، يُثبَّت gitleaks صراحةً، لذا لا يُفعَّل مسار التحذير إلا على أجهزة المطورين التي لم تشغّل <code>brew install gitleaks</code>.</p>
<p>ويشغّل <code>gitleaks dir &lt;temp-dir&gt; --redact</code> مع إعداد <code>.gitleaks.toml</code> إن وُجد. ويضمن علم <code>--redact</code> أنه إن عُثر على سرّ، فإن مخرجات الخطأ لا تردّد السرّ نفسه في الطرفية.</p>
<p>أمر <code>secrets</code> في <code>lefthook.yml</code> يستدعي هذا السكربت كبوابة ما قبل الإيداع الأخيرة:</p>
<pre><code class="language-yaml"><span class="hljs-attr">secrets:</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">tsx</span> <span class="hljs-string">scripts/run-gitleaks-staged.ts</span>
</code></pre>
<p>لاحظ الغياب المتعمد لحقل <code>glob</code>. فالسكربت الغلافي يعيد تعداد الفهرس المرحّل بنفسه، لذا فإن تسليمه قائمة <code>{staged_files}</code> مُصفّاة مسبقًا سيضاعف التصفية. دع السكربت يقوم بسرده الخاص.</p>
<p><strong>التحقق:</strong></p>
<pre><code class="language-bash"><span class="hljs-comment"># Gitleaks is installed</span>
gitleaks version

<span class="hljs-comment"># Clean staged state passes</span>
npx tsx scripts/run-gitleaks-staged.ts

<span class="hljs-comment"># A real secret is caught (stage a file with a secret-shaped string, run the script, unstage)</span>
</code></pre>
<h3 id="الجزء-6-تحديث-claudemd">الجزء 6: تحديث CLAUDE.md</h3>
<p>ملف <code>CLAUDE.md</code> الأولي في Shelf يسرد فقط حلقة المشروع الأولي الأصغر: <code>npm run typecheck</code> و<code>npm run lint</code> و<code>npm run test</code>. وهذا المختبر هو حيث توسّعه. أضف أقسام الطبقة الساكنة الآن: سمِّ <code>knip.json</code> و<code>lefthook.yml</code> و<code>.gitleaks.toml</code> و<code>scripts/run-gitleaks-staged.ts</code> صراحةً، وأضف <code>npm run knip</code> / <code>npm run pre-push</code> إلى قصة «تم»، وأبقِ قسم «لا تفعل» يحظر <code>@ts-expect-error</code> و<code>eslint-disable</code> و<code>--no-verify</code>.</p>
<h2 id="ما-لا-يزال-عليك-تشغيله">ما لا يزال عليك تشغيله</h2>
<p>كل أمر تحقق، جزءًا بجزء:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Part 1: ESLint</span>
npm run lint

<span class="hljs-comment"># Part 2: TypeScript</span>
npm run typecheck

<span class="hljs-comment"># Part 3: Knip</span>
npm run knip

<span class="hljs-comment"># Part 4: Lefthook</span>
npx lefthook run pre-commit
npx lefthook run pre-push

<span class="hljs-comment"># Part 5: Gitleaks</span>
gitleaks version
npx tsx scripts/run-gitleaks-staged.ts

<span class="hljs-comment"># Part 6: CLAUDE.md</span>
<span class="hljs-built_in">wc</span> -l CLAUDE.md
grep -c <span class="hljs-string">&#x27;typecheck\\|lint\\|knip&#x27;</span> CLAUDE.md
grep -c <span class="hljs-string">&#x27;@ts-expect-error\\|eslint-disable\\|no-verify&#x27;</span> CLAUDE.md
</code></pre>
<p>والفحص الكامل للمنظومة الذي تتطلبه معايير القبول النهائية للمختبر:</p>
<pre><code class="language-bash">npm run typecheck &amp;&amp; npm run lint &amp;&amp; npm run knip &amp;&amp; npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>يجب أن تخرج الأربعة جميعًا بالرمز صفر بمجرد أن تنتهي من مرور الطبقة الساكنة.</p>
<h2 id="أنماط-تستحق-الاحتفاظ-بها">أنماط تستحق الاحتفاظ بها</h2>
<ul>
<li><strong>رمّز القرارات كقواعد، لا كتعليقات.</strong> محدِّد ESLint الذي يحظر <code>waitForTimeout</code> يُفعَّل عند كل حفظ. أما تعليق في <code>CLAUDE.md</code> يقول «لا تستخدم <code>waitForTimeout</code>» فيُفعَّل عندما يصادف أن يقرأه الوكيل. كلاهما مفيد. لكن قاعدة التحقق النصي <em>موثوقة</em>.</li>
<li><strong>حدّد نطاق الحظر.</strong> قاعدة <code>waitForTimeout</code> تنطبق على ملفات الاختبار فقط. وقاعدة <code>networkidle</code> تنطبق عالميًا. وقاعدة <code>userId</code> تنطبق عالميًا. فكل حظر محصور حيث يكون النمط خطيرًا فعلًا، لا حيث يكون ممكنًا نظريًا.</li>
<li><strong>الوضع الصارم سقّاطة تمنع التراجع.</strong> بمجرد تفعيل <code>noUncheckedIndexedAccess</code> وتصريف قاعدة الشيفرة بنظافة، يرث كل مساهم مستقبلي ذلك القيد دون أن يعرف أنه كان خيارًا متعمدًا. العلم <em>هو</em> التوثيق.</li>
<li><strong>كشف الشيفرة الميتة يلتقط ما يتركه الوكيل خلفه.</strong> يكتب الوكلاء شيفرة، ثم يدركون أنهم يحتاجون إلى نهج مختلف، فيتركون المحاولة الأولى في مكانها. knip يجدها. وبدون knip، تتراكم الأدوات المهجورة حتى يلاحظ أحدهم أن رسم الاستيرادات فوضوي.</li>
<li><strong>الخطافات تأمين رخيص.</strong> كتلة ما قبل الإيداع في Lefthook تعمل في أقل من ثانيتين في إيداع نموذجي — ESLint وPrettier وفحص الأسرار كلها تعمل على التوازي على الملفات المرحّلة. ويضيف خطاف ما قبل الدفع نحو خمس عشرة ثانية لفحص الأنواع وknip واختبارات الوحدة. والتكلفة ضئيلة. أما البديل — اكتشاف خطأ التحقق النصي في CI بعد عشر دقائق — فليس كذلك.</li>
<li><strong>سكربت gitleaks حل وسط عملي.</strong> تجسيد الفهرس المرحّل في دليل مؤقت أكثر موثوقية من أي من أعلام الملفات المرحّلة التي قدّمها gitleaks عبر الإصدارات. وعندما يستقر سلوك المنبع، يمكنك التبسيط. وحتى ذلك الحين، السكربت يعمل.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-the-static-layer-into-shelf">مختبر: توصيل الطبقة الساكنة بـ Shelf</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-static-layer-as-underlayment">الطبقة الساكنة كطبقة أساس</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails">التحقق النصي والأنواع كحواجز</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection">كشف الشيفرة الميتة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خطافات Git باستخدام Lefthook</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks">فحص الأسرار باستخدام Gitleaks</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,c as html,e as slug,t as title};
