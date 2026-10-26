const s="kinney",n="react-typescript",a="React مع TypeScript",p="build-pipeline-tsc-swc",t="خط بناء حديث: tsc و SWC",l=[{depth:2,id:"مشهد-البناء-الحديث",text:"مشهد البناء الحديث"},{depth:2,id:"فهم-الأطراف-المشاركة",text:"فهم الأطراف المشاركة"},{depth:3,id:"مصرف-typescript-tsc",text:"مُصرِّف TypeScript (tsc)"},{depth:3,id:"swc-speedy-web-compiler",text:"SWC (Speedy Web Compiler)"},{depth:3,id:"vite",text:"Vite"},{depth:2,id:"إعداد-خط-بناء-هجين",text:"إعداد خط بناء هجين"},{depth:3,id:"بنية-المشروع",text:"بنية المشروع"},{depth:3,id:"ضبط-typescript",text:"ضبط TypeScript"},{depth:3,id:"ضبط-vite",text:"ضبط Vite"},{depth:3,id:"ضبط-swc-اختياري",text:"ضبط SWC (اختياري)"},{depth:3,id:"سكربتات-packagejson",text:"سكربتات package.json"},{depth:2,id:"سير-عمل-التطوير",text:"سير عمل التطوير"},{depth:3,id:"حلقة-تطوير-سريعة",text:"حلقة تطوير سريعة"},{depth:3,id:"فحوص-ما-قبل-الإيداع",text:"فحوص ما قبل الإيداع"},{depth:2,id:"خط-التكامل-المستمر-والنشر-cicd",text:"خط التكامل المستمر والنشر (CI/CD)"},{depth:2,id:"أنماط-من-العالم-الحقيقي",text:"أنماط من العالم الحقيقي"},{depth:3,id:"تطوير-المكتبات",text:"تطوير المكتبات"},{depth:3,id:"إعداد-المستودع-الأحادي-monorepo",text:"إعداد المستودع الأحادي (Monorepo)"},{depth:2,id:"مقارنة-الأداء",text:"مقارنة الأداء"},{depth:2,id:"استكشاف-المشكلات-الشائعة-وإصلاحها",text:"استكشاف المشكلات الشائعة وإصلاحها"},{depth:3,id:"قيود-swc-و-esbuild",text:"قيود SWC و esbuild"},{depth:3,id:"مشكلات-المزخرفات-decorators",text:"مشكلات المزخرفات (Decorators)"},{depth:3,id:"حالات-حدية-في-الاستيراد-والتصدير",text:"حالات حدّية في الاستيراد والتصدير"},{depth:2,id:"اختيار-إعدادك",text:"اختيار إعدادك"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],c=`<p>تطوّرت أدوات البناء الحديثة في TypeScript إلى ما هو أبعد من نهج «استخدم <code>tsc</code> لكل شيء». فأحدث إعدادات التطوير اليوم تفصل بين فحص الأنواع والترجمة (transpilation)، مستخدمةً أدوات متخصّصة لكل مهمة. لنتعرّف على كيفية بناء خط بناء متين باستخدام مُصرِّف TypeScript (<code>tsc</code>)، والمُترجِم فائق السرعة SWC، وخادم التطوير الخاص بـ Vite — ونفهم متى تستخدم كل أداة.</p>
<p>على الأرجح أنت هنا لأن عمليات البناء لديك بطيئة، أو لأن التكامل المستمر (CI) ينتهي بمهلة زمنية، أو لأنك تتساءل لماذا يُصرّ الجميع على الحديث عن SWC و esbuild. والإجابة المختصرة: مُصرِّف TypeScript الرسمي شامل لكنه بطيء، بينما تركّز الأدوات الأحدث على السرعة عبر العمل أقل. والمفتاح هو معرفة كيف تدمجها بفاعلية.</p>
<h2 id="مشهد-البناء-الحديث">مشهد البناء الحديث</h2>
<p>في الأيام الأولى لـ TypeScript، لم يكن أمامك خيار سوى <code>tsc</code> لفحص الأنواع والترجمة معًا. كان يعمل بشكل جيّد للمشاريع الأصغر، لكن مع نمو قواعد الشيفرة أصبحت أزمنة البناء مؤلمة. تحلّ الأدوات الحديثة هذا الأمر بالتخصّص:</p>
<ul>
<li><strong>مدقّقو الأنواع</strong> (مثل <code>tsc</code>) يركّزون على الصحة ويولّدون ملفات <code>.d.ts</code></li>
<li><strong>المترجمون</strong> (مثل SWC و esbuild و Babel) يركّزون على السرعة وإخراج JavaScript</li>
<li><strong>حازم الحزم</strong> (مثل Vite و Webpack) ينسّقون كل شيء ويتولّون خوادم التطوير</li>
</ul>
<p>يتيح لك هذا الفصل ملاحظات سريعة أثناء التطوير مع الحفاظ على أمان الأنواع.</p>
<h2 id="فهم-الأطراف-المشاركة">فهم الأطراف المشاركة</h2>
<h3 id="مصرف-typescript-tsc">مُصرِّف TypeScript (tsc)</h3>
<p>الخيار الأصلي والأكثر شمولًا. حين تُشغّل <code>tsc</code> فإنّه:</p>
<ul>
<li><strong>يفحص أنواع</strong> قاعدة شيفرتك بالكامل</li>
<li><strong>يترجم</strong> TypeScript إلى JavaScript</li>
<li><strong>يولّد</strong> ملفات التصريح (<code>.d.ts</code>)</li>
<li><strong>يتعامل</strong> مع ميزات TypeScript المعقّدة مثل المزخرفات (decorators) ودوالّ الإخراج المساعدة</li>
</ul>
<pre><code class="language-bash"><span class="hljs-comment"># Traditional approach - does everything</span>
tsc --build
</code></pre>
<p><strong>المزايا</strong>: دعم كامل لـ TypeScript، ويولّد ملفات التصريح، ويتعامل مع السيناريوهات المعقّدة. <strong>العيوب</strong>: أبطأ مع القواعد الشيفرة الكبيرة، وفحص الأنواع أحادي الخيط.</p>
<h3 id="swc-speedy-web-compiler">SWC (Speedy Web Compiler)</h3>
<p>مكتوب بلغة Rust، يركّز SWC حصريًا على الترجمة السريعة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Install SWC</span>
pnpm add -D @swc/cli @swc/core
</code></pre>
<p>يحوّل SWC نوع TypeScript إلى JavaScript دون فحص الأنواع — فهو ببساطة يزيل الأنواع ويحوّل الصياغة. وهذا يجعله أسرع بكثير من <code>tsc</code> في الترجمة.</p>
<p><strong>المزايا</strong>: سريع للغاية، ودعمه لـ TypeScript جيّد، ويتعامل مع JSX جيّدًا. <strong>العيوب</strong>: لا يفحص الأنواع، ولا يولّد ملفات التصريح، وأداة أحدث ذات منظومة متطوّرة باستمرار.</p>
<h3 id="vite">Vite</h3>
<p>أداة بناء تستخدم esbuild (فلسفة مشابهة لـ SWC) أثناء التطوير و Rollup لعمليات بناء الإنتاج:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Vite with TypeScript support</span>
pnpm create vite my-app --template react-ts
</code></pre>
<p><strong>المزايا</strong>: خادم تطوير سريع، وتجربة مطوّر ممتازة، ويتعامل مع معظم سيناريوهات TypeScript. <strong>العيوب</strong>: الإعدادات المعقّدة قد تكون محيِّرة، و esbuild له بعض القيود في TypeScript.</p>
<h2 id="إعداد-خط-بناء-هجين">إعداد خط بناء هجين</h2>
<p>تتمثّل الاستراتيجية الفائزة في الجمع بين هذه الأدوات: استخدم المترجمين السريعين لسرعة التطوير، و <code>tsc</code> لفحص الأنواع وتوليد ملفات التصريح. إليك كيفية إعداد ذلك:</p>
<h3 id="بنية-المشروع">بنية المشروع</h3>
<pre><code>my-app/
├── src/
│   ├── components/
│   └── index.ts
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── .swcrc
└── package.json
</code></pre>
<h3 id="ضبط-typescript">ضبط TypeScript</h3>
<p>أولًا، أنشئ ملف <code>tsconfig.json</code> أساسيًا لمحرّر IDE ولفحص الأنواع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM.Iterable&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowSyntheticDefaultImports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bundler&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isolatedModules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// ✅ We&#x27;re not using tsc for transpilation</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أمّا المكتبات التي تحتاج إلى ملفات تصريح، فأنشئ لها <code>tsconfig.build.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// ✅ Generate output</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// ✅ Generate .d.ts files</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist/types&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;emitDeclarationOnly&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span> <span class="hljs-comment">// ✅ Only emit declarations, not JS</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/*.test.*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/*.spec.*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="ضبط-vite">ضبط Vite</h3>
<p>اضبط Vite من أجل تطوير فائق السرعة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react-swc&#x27;</span>; <span class="hljs-comment">// ✅ Uses SWC for even faster builds</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  },
  <span class="hljs-attr">build</span>: {
    <span class="hljs-comment">// For production builds, Vite uses Rollup</span>
    <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;es2020&#x27;</span>,
    <span class="hljs-attr">outDir</span>: <span class="hljs-string">&#x27;dist&#x27;</span>,
    <span class="hljs-attr">rollupOptions</span>: {
      <span class="hljs-attr">external</span>: [<span class="hljs-string">&#x27;react&#x27;</span>, <span class="hljs-string">&#x27;react-dom&#x27;</span>], <span class="hljs-comment">// For library builds</span>
    },
  },
});
</code></pre>
<h3 id="ضبط-swc-اختياري">ضبط SWC (اختياري)</h3>
<p>إن أردت استخدام SWC مباشرةً في البناء، فأنشئ ملف <code>.swcrc</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;syntax&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;typescript&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;tsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;decorators&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;automatic&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;development&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es6&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="سكربتات-packagejson">سكربتات package.json</h3>
<p>هنا تجتمع كل القطع معًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run type-check &amp;&amp; vite build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build:lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run type-check &amp;&amp; swc src -d dist/lib &amp;&amp; tsc -p tsconfig.build.json&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check:watch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit --watch&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint src --ext ts,tsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لنشرح ما يفعله كل سكربت:</p>
<ul>
<li><code>dev</code>: خادم تطوير Vite مع ترجمة SWC (دون فحص الأنواع)</li>
<li><code>build</code>: يفحص الأنواع أولًا، ثم ينفّذ بناء Vite للإنتاج</li>
<li><code>build:lib</code>: للمكتبات — يفحص الأنواع، ثم يترجم بـ SWC، ثم يولّد ملفات التصريح</li>
<li><code>type-check</code>: يشغّل مُصرِّف TypeScript في وضع الفحص فقط</li>
<li><code>type-check:watch</code>: فحص مستمر للأنواع أثناء التطوير</li>
</ul>
<h2 id="سير-عمل-التطوير">سير عمل التطوير</h2>
<h3 id="حلقة-تطوير-سريعة">حلقة تطوير سريعة</h3>
<p>أثناء التطوير النشط، تريد أسرع ملاحظات ممكنة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Terminal 1: Fast dev server (no type checking)</span>
pnpm dev

<span class="hljs-comment"># Terminal 2: Continuous type checking</span>
pnpm type-check:watch
</code></pre>
<p>يمنحك هذا الإعداد:</p>
<ul>
<li><strong>استبدال الوحدات في أقل من ثانية</strong></li>
<li><strong>أخطاء أنواع فورية</strong> في طرفية منفصلة</li>
<li><strong>ملاحظات فورية</strong> على تغييرات الشيفرة</li>
</ul>
<h3 id="فحوص-ما-قبل-الإيداع">فحوص ما قبل الإيداع</h3>
<p>قبل الإيداع، شغّل التحقّق الكامل:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Quick pre-commit script</span>
pnpm type-check &amp;&amp; pnpm lint &amp;&amp; pnpm <span class="hljs-built_in">test</span>
</code></pre>
<p>فكّر في استخدام <a href="https://typicode.github.io/husky/">Husky</a> لأتمتة ذلك.</p>
<h2 id="خط-التكامل-المستمر-والنشر-cicd">خط التكامل المستمر والنشر (CI/CD)</h2>
<p>ينبغي أن يكون التكامل المستمر لديك شاملًا وفعّالًا في الوقت نفسه:</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/ci.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">CI</span>
<span class="hljs-attr">on:</span> [<span class="hljs-string">push</span>, <span class="hljs-string">pull_request</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">test:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;18&#x27;</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;pnpm&#x27;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">type-check</span> <span class="hljs-comment"># Full type checking</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">lint</span> <span class="hljs-comment"># Code quality</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">test</span> <span class="hljs-comment"># Unit tests</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">build</span> <span class="hljs-comment"># Production build test</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>شغّل فحص الأنواع مبكرًا في خط CI — فهو غالبًا يكشف المشكلات أسرع من انتظار بناءٍ كامل.</p>
</blockquote>
<h2 id="أنماط-من-العالم-الحقيقي">أنماط من العالم الحقيقي</h2>
<h3 id="تطوير-المكتبات">تطوير المكتبات</h3>
<p>حين تبني مكتبات، فأنت بحاجة إلى سرعة التطوير وإلى مخرجات سليمة في الوقت نفسه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite build --mode development --watch&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run clean &amp;&amp; npm run type-check &amp;&amp; npm run build:lib &amp;&amp; npm run build:types&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build:lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;swc src -d dist --source-maps&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build:types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc -p tsconfig.build.json&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;clean&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rm -rf dist&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا النمط:</p>
<ol>
<li>يستخدم SWC لإخراج JavaScript سريع</li>
<li>يستخدم <code>tsc</code> فقط لملفات التصريح</li>
<li>يوفّر خرائط المصدر (source maps) لأغراض التصحيح</li>
<li>يفصل المسؤوليات فصلًا نظيفًا</li>
</ol>
<h3 id="إعداد-المستودع-الأحادي-monorepo">إعداد المستودع الأحادي (Monorepo)</h3>
<p>في المستودعات الأحادية، يتألّق النهج الهجين:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;concurrently \\&quot;pnpm:dev:*\\&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev:vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev:types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --build --watch&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pnpm type-check &amp;&amp; pnpm build:all&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build:all&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pnpm --recursive build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --build&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استخدم مراجع مشاريع TypeScript (project references) من أجل فحص أنواع فعّال عبر الحزم:</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json (root)</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/ui&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/utils&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./apps/web&quot;</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="مقارنة-الأداء">مقارنة الأداء</h2>
<p>إليك ما يمكنك توقّعه في تطبيق React متوسّط الحجم (~100 مكوّن):</p>
<table>
<thead>
<tr>
<th>تركيبة الأدوات</th>
<th>خادم التطوير</th>
<th>فحص الأنواع</th>
<th>البناء الكامل</th>
</tr>
</thead>
<tbody>
<tr>
<td>tsc فقط</td>
<td>~8s</td>
<td>~12s</td>
<td>~25s</td>
</tr>
<tr>
<td>Vite + فحص tsc</td>
<td>~1s</td>
<td>~12s</td>
<td>~8s</td>
</tr>
<tr>
<td>SWC + فحص tsc</td>
<td>~0.5s</td>
<td>~12s</td>
<td>~6s</td>
</tr>
</tbody>
</table>
<p>الفكرة الأساسية: فصل المسؤوليات يمنحك أفضل ما في العالمين — تكرار سريع، وفحص شامل.</p>
<h2 id="استكشاف-المشكلات-الشائعة-وإصلاحها">استكشاف المشكلات الشائعة وإصلاحها</h2>
<h3 id="قيود-swc-و-esbuild">قيود SWC و esbuild</h3>
<p>بعض ميزات TypeScript غير مدعومة في المترجمين السريعين:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Not supported by esbuild/SWC</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">Colors</span> {
  <span class="hljs-title class_">Red</span> = <span class="hljs-string">&#x27;red&#x27;</span>,
  <span class="hljs-title class_">Blue</span> = <span class="hljs-string">&#x27;blue&#x27;</span>,
}

<span class="hljs-comment">// ✅ Use regular enums or const assertions instead</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Colors</span> = {
  <span class="hljs-title class_">Red</span>: <span class="hljs-string">&#x27;red&#x27;</span>,
  <span class="hljs-title class_">Blue</span>: <span class="hljs-string">&#x27;blue&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
</code></pre>
<h3 id="مشكلات-المزخرفات-decorators">مشكلات المزخرفات (Decorators)</h3>
<p>إن كنت تستخدم المزخرفات (مثلًا مع مكوّنات React الصنفية أو MobX):</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;experimentalDecorators&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;emitDecoratorMetadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وتأكّد من أن مترجِمك يدعمها:</p>
<pre><code class="language-json"><span class="hljs-comment">// .swcrc</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;decorators&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="حالات-حدية-في-الاستيراد-والتصدير">حالات حدّية في الاستيراد والتصدير</h3>
<p>قد تحتاج بعض أنماط الاستيراد المعقّدة إلى تعديل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Might cause issues with some transpilers</span>
<span class="hljs-keyword">export</span> { <span class="hljs-keyword">default</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Button&#x27;</span>;

<span class="hljs-comment">// ✅ More explicit, always works</span>
<span class="hljs-keyword">export</span> { <span class="hljs-title class_">Button</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">default</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Button&#x27;</span>;
</code></pre>
<h2 id="اختيار-إعدادك">اختيار إعدادك</h2>
<p>إليك مصفوفة قرار للسيناريوهات الشائعة:</p>
<p><strong>المشاريع الصغيرة (أقل من 50 ملفًا)</strong></p>
<ul>
<li>التزم بـ <code>tsc</code> من أجل البساطة</li>
<li>أو استخدم Vite إن أردت خادم تطوير سريعًا</li>
</ul>
<p><strong>المشاريع المتوسطة (50-500 ملفًا)</strong></p>
<ul>
<li>Vite مع <code>tsc --noEmit</code> لفحص الأنواع</li>
<li>فكّر في SWC إن كانت في esbuild الخاص بـ Vite قيود</li>
</ul>
<p><strong>المشاريع الكبيرة (أكثر من 500 ملف)</strong></p>
<ul>
<li>افصل الترجمة عن فحص الأنواع حتمًا</li>
<li>استخدم SWC أو esbuild للترجمة</li>
<li>فكّر في مراجع مشاريع TypeScript</li>
<li>استثمر في تخزين مؤقت (caching) مناسب لخط CI</li>
</ul>
<p><strong>المكتبات</strong></p>
<ul>
<li>استخدم <code>tsc</code> دائمًا لتوليد ملفات التصريح</li>
<li>استخدم المترجمين السريعين لإخراج JavaScript</li>
<li>اختبر مع عدّة إصدارات من TypeScript</li>
</ul>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>حين يتوفّر لديك خط بناء متين:</p>
<ol>
<li><strong>أضف خطّافات ما قبل الإيداع</strong> (pre-commit hooks) باستخدام Husky لتحديد بوابات الجودة</li>
<li><strong>اضبط التخزين المؤقت في CI</strong> لتسريع عمليات البناء</li>
<li><strong>راقب حجم الحزمة</strong> (bundle size) بأدوات مثل <a href="https://bundlemon.dev/">bundlemon</a></li>
<li><strong>فكّر في الفحص المتوازي للأنواع</strong> عبر مراجع مشاريع TypeScript</li>
<li><strong>جرّب أدوات أحدث</strong> مثل Turbopack أو rspack</li>
</ol>
<p>يتطوّر مشهد أدوات البناء بسرعة، لكنّ المبادئ تبقى: افصل المسؤوليات، وحسّن للحالة الشائعة (التطوير)، ولا تُضحّي بالصواب من أجل السرعة في الإنتاج.</p>
<p>ينبغي أن يبدو خط البناء لديك غير مرئي أثناء التطوير، ومنيعًا في الإنتاج. ومع النهج الهجين الذي يستخدم أدوات متخصّصة لمهام متخصّصة، تستطيع تحقيق الأمرين معًا.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,p as slug,t as title};
