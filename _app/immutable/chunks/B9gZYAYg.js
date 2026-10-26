const s="kinney",n="react-typescript",a="React مع TypeScript",p="setting-up-react-and-typescript",t="تهيئة React و TypeScript",l=[{depth:2,id:"تهيئة-بيئة-التطوير",text:"تهيئة بيئة التطوير"},{depth:2,id:"ضبط-typescript-لـ-react",text:"ضبط TypeScript لـ React"},{depth:2,id:"eslint-طبقة-إضافية-من-الحماية",text:"ESLint: طبقة إضافية من الحماية"},{depth:3,id:"eslint-plugin-react",text:"eslint-plugin-react"},{depth:3,id:"eslint-plugin-react-hooks",text:"eslint-plugin-react-hooks"},{depth:3,id:"eslint-plugin-react-refresh",text:"eslint-plugin-react-refresh"},{depth:2,id:"prettier-تنسيق-الشيفرة-المتسق",text:"Prettier: تنسيق الشيفرة المتسق"},{depth:3,id:"التثبيت",text:"التثبيت"},{depth:3,id:"ضبط-prettier",text:"ضبط Prettier"},{depth:3,id:"التكامل-مع-eslint",text:"التكامل مع ESLint"},{depth:2,id:"سكربتات-الحزمة",text:"سكربتات الحزمة"},{depth:3,id:"سير-عمل-التطوير",text:"سير عمل التطوير"},{depth:2,id:"أمثلة-إعدادات-من-العالم-الحقيقي",text:"أمثلة إعدادات من العالم الحقيقي"},{depth:3,id:"الإعداد-الصارم-المؤسسات-والفرق-الكبيرة",text:"الإعداد الصارم (المؤسسات والفرق الكبيرة)"},{depth:3,id:"الإعداد-المتوازن-أغلب-المشاريع",text:"الإعداد المتوازن (أغلب المشاريع)"},{depth:3,id:"الإعداد-الأدنى-النماذج-الأولية-والمشاريع-الصغيرة",text:"الإعداد الأدنى (النماذج الأولية والمشاريع الصغيرة)"},{depth:2,id:"الأخطاء-الشائعة",text:"الأخطاء الشائعة"},{depth:2,id:"سكربتات-packagejson",text:"سكربتات package,json"},{depth:2,id:"بعض-أفضل-الممارسات-الأخرى",text:"بعض أفضل الممارسات الأخرى"},{depth:2,id:"اختياري-تهيئة-visual-studio-code-وأو-cursor",text:"اختياري: تهيئة Visual Studio Code و/أو Cursor"},{depth:2,id:"اختياري-تهيئة-خطافات-ما-قبل-الإيداع",text:"اختياري: تهيئة خطّافات ما قبل الإيداع"}],e=`<p>بناء تطبيقات React الحديثة مع TypeScript لا يقتصر على إضافة بعض تعليقات الأنواع والأمل أن ينجح الأمر. إنه عن تهيئة أساس يساعدك على التقاط الأخطاء قبل أن تصل إلى الإنتاج، ويوفّر تجربة تطوير ممتازة، ويتوسّع بسلاسة مع نمو فريقك ومستودعك الشيفري. يجلب React 19 بعض التحسينات المثيرة في طريقة كتابة المكوّنات، وعند اقترانه بآخر ميزات TypeScript تحصل على تجربة تطوير قوية وممتعة في آن واحد.</p>
<p>في هذا الدليل، سنبني مشروع React 19 + TypeScript من الصفر، مغطّين كل شيء من ضبط <code>tsconfig.json</code> إلى أنماط المكوّنات التي ستجعلك تشكر نفسك لاحقًا.</p>
<h2 id="تهيئة-بيئة-التطوير">تهيئة بيئة التطوير</h2>
<p>قبل أن نغوص في الأمور الممتعة، لنتأكّد من أن الأدوات الصحيحة مثبّتة. ستحتاج إلى Node.js 18 أو أحدث — هذا ما يتطلبه React 19 — وإلى مدير الحزم المفضّل لديك. سأستخدم <code>npm</code> في الأمثلة، لكنك حرّ أن تستبدل به <code>yarn</code> أو <code>pnpm</code> أو <code>bun</code>.</p>
<blockquote>
<p><strong>يمكنك استخدام قالب Vite لتُسهّل الأمر على نفسك.</strong></p>
<p>جرّب <code>npm create vite@latest</code> واتّبع التعليمات إن أردت أن تُسهّل الأمر على نفسك.</p>
</blockquote>
<p>لكن لنفترض أننا أردنا أن نفعل ذلك يدويًا.</p>
<pre><code class="language-bash"><span class="hljs-comment"># Create a new project directory</span>
<span class="hljs-built_in">mkdir</span> your-project-here
<span class="hljs-built_in">cd</span> your-project-here

<span class="hljs-comment"># Initialize package.json</span>
npm init -y
</code></pre>
<p>الآن لنثبّت React 19 و TypeScript. لاحظ أن React 19 لا يزال في نسخة تجريبية (beta)، لذا سنحتاج إلى تثبيت النسخ التجريبية:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Install React</span>
npm install react react-dom

<span class="hljs-comment"># Install TypeScript and related dev dependencies</span>
npm install -D typescript @types/react @types/react-dom @types/node

<span class="hljs-comment"># Install build tools (we&#x27;ll use Vite for this example)</span>
npm install -D vite @vitejs/plugin-react
</code></pre>
<h2 id="ضبط-typescript-لـ-react">ضبط TypeScript لـ React</h2>
<p>ملف <code>tsconfig.json</code> هو موضع السحر. يُدخل React 19 بعض التغييرات التي تؤثر في كيفية ضبط TypeScript، ولا سيما حول بيئة تشغيل JSX الجديدة وفحص الأنواع المحسّن.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM.Iterable&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
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
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">// React 19 specific improvements</span>
    <span class="hljs-attr">&quot;exactOptionalPropertyTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUncheckedIndexedAccess&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>اسمح لي أن أُفصّل الأجزاء الخاصة بـ React 19:</p>
<ul>
<li><strong><code>jsx: &quot;react-jsx&quot;</code></strong>: يستخدم تحويل JSX الجديد — لا حاجة إلى <code>import React from 'react'</code> في كل ملف!</li>
<li><strong><code>exactOptionalPropertyTypes: true</code></strong>: يمنع تمرير <code>undefined</code> عن طريق الخطأ إلى الخصائص الاختيارية.</li>
<li><strong><code>noUncheckedIndexedAccess: true</code></strong>: يفرض عليك التعامل مع قيم <code>undefined</code> المحتملة عند الوصول إلى المصفوفات أو الكائنات بمفاتيح ديناميكية.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إعداد <code>exactOptionalPropertyTypes</code> مفيد خصوصًا مع خصائص React. فهو يضمن أن إن كانت الخاصية اختيارية، لا يمكنك تمرير <code>undefined</code> إليها عن طريق الخطأ — عليك إمّا تمرير قيمة حقيقية أو حذفها تمامًا.</p>
</blockquote>
<h2 id="eslint-طبقة-إضافية-من-الحماية">ESLint: طبقة إضافية من الحماية</h2>
<p>يمكننا أيضًا ضبط <a href="https://eslint.org/">ESLint</a> ليضيف فحوصًا إضافية على شيفرتنا. استخدام ESLint مع TypeScript يتطلب بعض التعديلات الإضافية التي يُحتمل أن تستحق الحديث عنها. لكن أولًا — لنثبّت بعض الاعتماديات.</p>
<pre><code class="language-bash">npm install -D eslint @eslint/js @types/eslint__js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
</code></pre>
<p>حسنًا، إليك قالبًا معقولًا يمكنك نسخه ولصقه.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> js <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@eslint/js&#x27;</span>; <span class="hljs-comment">// ESLint&#x27;s core recommended JavaScript rules</span>
<span class="hljs-keyword">import</span> globals <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;globals&#x27;</span>; <span class="hljs-comment">// Provides global variable definitions for different environments</span>
<span class="hljs-keyword">import</span> typescript <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;typescript-eslint&#x27;</span>; <span class="hljs-comment">// TypeScript ESLint parser and rules</span>
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;eslint-plugin-react&#x27;</span>; <span class="hljs-comment">// React-specific linting rules</span>
<span class="hljs-keyword">import</span> reactHooks <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;eslint-plugin-react-hooks&#x27;</span>; <span class="hljs-comment">// Rules for React Hooks usage</span>
<span class="hljs-keyword">import</span> reactRefresh <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;eslint-plugin-react-refresh&#x27;</span>; <span class="hljs-comment">// React Fast Refresh validation</span>

<span class="hljs-comment">/** <span class="hljs-doctag">@type</span> {<span class="hljs-type">import(&#x27;eslint&#x27;).Linter.Config[]</span>} */</span> <span class="hljs-comment">// TypeScript type annotation for config array</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
  js.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>, <span class="hljs-comment">// Enable ESLint&#x27;s recommended JavaScript rules</span>
  ...typescript.<span class="hljs-property">configs</span>.<span class="hljs-property">strict</span>, <span class="hljs-comment">// Apply TypeScript&#x27;s strict ruleset (includes recommended + type-checked rules)</span>
  {
    <span class="hljs-attr">files</span>: [<span class="hljs-string">&#x27;**/*.{ts,tsx}&#x27;</span>], <span class="hljs-comment">// Apply this config to TypeScript and TSX files only</span>
    <span class="hljs-attr">languageOptions</span>: {
      <span class="hljs-attr">globals</span>: {
        ...globals.<span class="hljs-property">browser</span>, <span class="hljs-comment">// Include browser global variables (window, document, etc.)</span>
        ...globals.<span class="hljs-property">es2020</span>, <span class="hljs-comment">// Include ES2020 global features (Promise, BigInt, etc.)</span>
      },
      <span class="hljs-attr">parserOptions</span>: {
        <span class="hljs-attr">project</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable TypeScript project for type-aware linting</span>
        <span class="hljs-attr">ecmaVersion</span>: <span class="hljs-string">&#x27;latest&#x27;</span>, <span class="hljs-comment">// Use the latest ECMAScript version</span>
        <span class="hljs-attr">ecmaFeatures</span>: { <span class="hljs-attr">jsx</span>: <span class="hljs-literal">true</span> }, <span class="hljs-comment">// Enable JSX parsing</span>
        <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&#x27;module&#x27;</span>, <span class="hljs-comment">// Treat files as ES modules</span>
      },
    },
    <span class="hljs-attr">settings</span>: {
      <span class="hljs-attr">react</span>: { <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;detect&#x27;</span> }, <span class="hljs-comment">// Auto-detect React version for appropriate rules</span>
    },
    <span class="hljs-attr">plugins</span>: {
      react, <span class="hljs-comment">// Register React plugin</span>
      <span class="hljs-string">&#x27;react-hooks&#x27;</span>: reactHooks, <span class="hljs-comment">// Register React Hooks plugin</span>
      <span class="hljs-string">&#x27;react-refresh&#x27;</span>: reactRefresh, <span class="hljs-comment">// Register React Refresh plugin</span>
    },
    <span class="hljs-attr">rules</span>: {
      ...react.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>, <span class="hljs-comment">// Apply React&#x27;s recommended rules</span>
      ...react.<span class="hljs-property">configs</span>[<span class="hljs-string">&#x27;jsx-runtime&#x27;</span>].<span class="hljs-property">rules</span>, <span class="hljs-comment">// Rules for new JSX transform (no React import needed)</span>
      ...reactHooks.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>, <span class="hljs-comment">// Apply React Hooks rules (deps, exhaustive-deps)</span>

      <span class="hljs-comment">// React Refresh</span>
      <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: [
        <span class="hljs-comment">// Warn when files export non-components (breaks Fast Refresh)</span>
        <span class="hljs-string">&#x27;warn&#x27;</span>,
        {
          <span class="hljs-attr">allowConstantExport</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Allow exporting constants alongside components</span>
        },
      ],

      <span class="hljs-comment">// TypeScript</span>
      <span class="hljs-string">&#x27;@typescript-eslint/no-unused-vars&#x27;</span>: [
        <span class="hljs-comment">// Error on unused variables</span>
        <span class="hljs-string">&#x27;error&#x27;</span>,
        {
          <span class="hljs-attr">argsIgnorePattern</span>: <span class="hljs-string">&#x27;^_&#x27;</span>, <span class="hljs-comment">// Ignore unused args starting with underscore</span>
          <span class="hljs-attr">varsIgnorePattern</span>: <span class="hljs-string">&#x27;^_&#x27;</span>, <span class="hljs-comment">// Ignore unused vars starting with underscore</span>
        },
      ],
      <span class="hljs-string">&#x27;@typescript-eslint/explicit-function-return-type&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Don&#x27;t require return types on functions</span>
      <span class="hljs-string">&#x27;@typescript-eslint/explicit-module-boundary-types&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Don&#x27;t require types on module boundaries</span>
      <span class="hljs-string">&#x27;@typescript-eslint/no-explicit-any&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Disallow &#x27;any&#x27; type usage</span>

      <span class="hljs-string">&#x27;react/prop-types&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// TypeScript handles this</span>
    },
  },
  {
    <span class="hljs-attr">files</span>: [<span class="hljs-string">&#x27;**/*.js&#x27;</span>], <span class="hljs-comment">// Apply to plain JavaScript files</span>
    ...typescript.<span class="hljs-property">configs</span>.<span class="hljs-property">disableTypeChecked</span>, <span class="hljs-comment">// Disable TS rules for JS files</span>
  },
  {
    <span class="hljs-attr">ignores</span>: [<span class="hljs-string">&#x27;dist&#x27;</span>, <span class="hljs-string">&#x27;build&#x27;</span>, <span class="hljs-string">&#x27;node_modules&#x27;</span>, <span class="hljs-string">&#x27;coverage&#x27;</span>, <span class="hljs-string">&#x27;*.min.js&#x27;</span>], <span class="hljs-comment">// Skip linting these paths/patterns</span>
  },
];
</code></pre>
<p>لنشرح كلًا من هذه.</p>
<h3 id="eslint-plugin-react"><code>eslint-plugin-react</code></h3>
<p><strong>الغرض:</strong> قواعد React الأساسية للفحص الخاص بـ JSX والأنماط الخاصة بـ React.</p>
<p><strong>ما الذي يلتقطه:</strong></p>
<ul>
<li>خصائص <code>key</code> المفقودة في القوائم</li>
<li>أنواع خصائص غير صحيحة</li>
<li>حالة وخصائص غير مستخدمة</li>
<li>تعديلات مباشرة على الحالة</li>
<li>مشكلات إمكانية الوصول في JSX</li>
<li>مخالفات لأفضل ممارسات React</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-comment">// Basic setup</span>
<span class="hljs-attr">rules</span>: {
  ...react.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>,
  ...react.<span class="hljs-property">configs</span>[<span class="hljs-string">&#x27;jsx-runtime&#x27;</span>].<span class="hljs-property">rules</span>, <span class="hljs-comment">// For React 17+ JSX transform</span>
}

<span class="hljs-comment">// Popular custom rules</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-comment">// Component and prop naming</span>
  <span class="hljs-string">&#x27;react/jsx-pascal-case&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">allowAllCaps</span>: <span class="hljs-literal">true</span> }],
  <span class="hljs-string">&#x27;react/jsx-curly-brace-presence&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">props</span>: <span class="hljs-string">&#x27;never&#x27;</span>, <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;never&#x27;</span> }],

  <span class="hljs-comment">// Props and state</span>
  <span class="hljs-string">&#x27;react/prop-types&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Turn off if using TypeScript</span>
  <span class="hljs-string">&#x27;react/require-default-props&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Often disabled with TypeScript</span>
  <span class="hljs-string">&#x27;react/destructuring-assignment&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-string">&#x27;always&#x27;</span>],
  <span class="hljs-string">&#x27;react/no-unused-prop-types&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
  <span class="hljs-string">&#x27;react/no-unused-state&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,

  <span class="hljs-comment">// JSX formatting</span>
  <span class="hljs-string">&#x27;react/jsx-indent&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-number">2</span>],
  <span class="hljs-string">&#x27;react/jsx-indent-props&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-number">2</span>],
  <span class="hljs-string">&#x27;react/jsx-max-props-per-line&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maximum</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">when</span>: <span class="hljs-string">&#x27;multiline&#x27;</span> }],
  <span class="hljs-string">&#x27;react/jsx-first-prop-new-line&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-string">&#x27;multiline&#x27;</span>],
  <span class="hljs-string">&#x27;react/jsx-closing-bracket-location&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-string">&#x27;line-aligned&#x27;</span>],

  <span class="hljs-comment">// Security and performance</span>
  <span class="hljs-string">&#x27;react/no-danger&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,
  <span class="hljs-string">&#x27;react/no-array-index-key&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,
  <span class="hljs-string">&#x27;react/jsx-no-target-blank&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">enforceSynamicLinks</span>: <span class="hljs-string">&#x27;always&#x27;</span> }],
}
</code></pre>
<h3 id="eslint-plugin-react-hooks"><code>eslint-plugin-react-hooks</code></h3>
<p><strong>الغرض:</strong> يفرض قواعد الخُطّافات (Rules of Hooks) — قواعد React الحرجة لاستخدام الخُطّافات بشكل صحيح.</p>
<p><strong>ما الذي يلتقطه:</strong></p>
<ul>
<li>خُطّافات تُستدعى بشكل شرطي (يخالف قواعد الخُطّافات)</li>
<li>اعتماديات مفقودة في <code>useEffect</code> و<code>useMemo</code> و<code>useCallback</code></li>
<li>خُطّافات تُستدعى خارج المكوّنات أو الخُطّافات المخصّصة</li>
<li>خُطّافات مخصّصة لا تبدأ بـ «use»</li>
</ul>
<p><strong>الإعدادات الشائعة:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Standard (recommended for most projects)</span>
<span class="hljs-attr">rules</span>: {
  ...reactHooks.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>,
  <span class="hljs-comment">// This expands to:</span>
  <span class="hljs-string">&#x27;react-hooks/rules-of-hooks&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Checks rules of hooks</span>
  <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>, <span class="hljs-comment">// Checks effect dependencies</span>
}

<span class="hljs-comment">// Stricter configuration</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react-hooks/rules-of-hooks&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
  <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Error instead of warning</span>
}

<span class="hljs-comment">// More lenient (not recommended)</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react-hooks/rules-of-hooks&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Never disable this!</span>
  <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, {
    <span class="hljs-attr">additionalHooks</span>: <span class="hljs-string">&#x27;(useMyCustomEffect|useAsync)&#x27;</span>, <span class="hljs-comment">// Check custom hooks</span>
    <span class="hljs-attr">enableDangerousAutofixThisMayCauseInfiniteLoops</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// Disable autofix</span>
  }],
}
</code></pre>
<p><strong>أنماط شائعة يستخدمها الناس:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Some teams disable exhaustive-deps for specific cases</span>
<span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, {
  <span class="hljs-attr">additionalHooks</span>: <span class="hljs-string">&#x27;useUpdateEffect|useIsomorphicLayoutEffect&#x27;</span>,
}]

<span class="hljs-comment">// NEVER do this (but some people unfortunately do):</span>
<span class="hljs-comment">// &#x27;react-hooks/exhaustive-deps&#x27;: &#x27;off&#x27; // ❌ Bad idea!</span>
</code></pre>
<h3 id="eslint-plugin-react-refresh"><code>eslint-plugin-react-refresh</code></h3>
<p><strong>الغرض:</strong> يضمن توافق المكوّنات مع React Fast Refresh (إعادة التحميل الساخن في Vite).</p>
<p><strong>ما الذي يلتقطه:</strong></p>
<ul>
<li>مكوّنات مصدَّرة إلى جانب تصديرات ليست مكوّنات</li>
<li>تصديرات افتراضية مجهولة الاسم تكسر Fast Refresh</li>
<li>مكوّنات صنفية (لا تعمل جيدًا مع Fast Refresh)</li>
</ul>
<p><strong>الإعدادات الشائعة:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Basic setup (most common)</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, {
    <span class="hljs-attr">allowConstantExport</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// Allow const exports alongside components</span>
  }],
}

<span class="hljs-comment">// Stricter version</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, {
    <span class="hljs-attr">allowConstantExport</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// Only allow component exports</span>
  }],
}

<span class="hljs-comment">// More permissive</span>
<span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, {
    <span class="hljs-attr">allowConstantExport</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">allowExportNames</span>: [<span class="hljs-string">&#x27;meta&#x27;</span>, <span class="hljs-string">&#x27;links&#x27;</span>, <span class="hljs-string">&#x27;handle&#x27;</span>, <span class="hljs-string">&#x27;loader&#x27;</span>], <span class="hljs-comment">// For frameworks like Remix</span>
  }],
}
</code></pre>
<h2 id="prettier-تنسيق-الشيفرة-المتسق">Prettier: تنسيق الشيفرة المتسق</h2>
<p>بينما يتولّى ESLint جودة الشيفرة، يتولّى Prettier التنسيق. يعملان معًا بشكل ممتاز عند ضبطهما بشكل صحيح.</p>
<h3 id="التثبيت">التثبيت</h3>
<pre><code class="language-bash">npm install -D prettier eslint-config-prettier
</code></pre>
<h3 id="ضبط-prettier">ضبط Prettier</h3>
<p>أنشئ ملف <code>.prettierrc.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;semi&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;trailingComma&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es5&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;singleQuote&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;printWidth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">80</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tabWidth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;useTabs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;bracketSpacing&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;arrowParens&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;avoid&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;endOfLine&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lf&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وملف <code>.prettierignore</code>:</p>
<pre><code>node_modules
dist
build
coverage
*.min.js
</code></pre>
<h3 id="التكامل-مع-eslint">التكامل مع ESLint</h3>
<p>لتجنّب التعارضات بين ESLint و Prettier، أضف <code>eslint-config-prettier</code> إلى ضبط ESLint الخاص بك. هذا يعطّل قواعد ESLint التي تتعارض مع تنسيق Prettier.</p>
<h2 id="سكربتات-الحزمة">سكربتات الحزمة</h2>
<p>أضف هذه السكربتات إلى ملف <code>package.json</code> الخاص بك لتحصل على سير عمل تطوير سلس:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// Development</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit &amp;&amp; vite build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;preview&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite preview&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Type checking</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check:watch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit --watch&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Linting and formatting</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint . --ext .ts,.tsx,.js,.jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint:fix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint . --ext .ts,.tsx,.js,.jsx --fix&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;prettier --write \\&quot;src/**/*.{ts,tsx,js,jsx,json,css,md}\\&quot;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;format:check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;prettier --check \\&quot;src/**/*.{ts,tsx,js,jsx,json,css,md}\\&quot;&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Combined checks (useful for CI/pre-commit)</span>
    <span class="hljs-attr">&quot;check-all&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run type-check &amp;&amp; npm run lint &amp;&amp; npm run format:check&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;fix-all&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run lint:fix &amp;&amp; npm run format&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="سير-عمل-التطوير">سير عمل التطوير</h3>
<p>أثناء التطوير، شغّل هذه في طرفيات منفصلة للحصول على أفضل تجربة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Terminal 1: Dev server with hot reload</span>
npm run dev

<span class="hljs-comment"># Terminal 2: Type checking in watch mode</span>
npm run type-check:watch
</code></pre>
<p>قبل الإيداع:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Check everything</span>
npm run check-all

<span class="hljs-comment"># Or auto-fix what&#x27;s possible</span>
npm run fix-all
</code></pre>
<h2 id="أمثلة-إعدادات-من-العالم-الحقيقي">أمثلة إعدادات من العالم الحقيقي</h2>
<h3 id="الإعداد-الصارم-المؤسسات-والفرق-الكبيرة">الإعداد الصارم (المؤسسات والفرق الكبيرة)</h3>
<pre><code class="language-javascript"><span class="hljs-attr">rules</span>: {
  <span class="hljs-comment">// React</span>
  ...react.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>,
  <span class="hljs-string">&#x27;react/jsx-no-leaked-render&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">validStrategies</span>: [<span class="hljs-string">&#x27;coerce&#x27;</span>] }],
  <span class="hljs-string">&#x27;react/jsx-handler-names&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, {
    <span class="hljs-attr">eventHandlerPrefix</span>: <span class="hljs-string">&#x27;handle&#x27;</span>,
    <span class="hljs-attr">eventHandlerPropPrefix</span>: <span class="hljs-string">&#x27;on&#x27;</span>,
  }],
  <span class="hljs-string">&#x27;react/hook-use-state&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
  <span class="hljs-string">&#x27;react/no-unstable-nested-components&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,

  <span class="hljs-comment">// Hooks</span>
  <span class="hljs-string">&#x27;react-hooks/rules-of-hooks&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
  <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,

  <span class="hljs-comment">// Fast Refresh</span>
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
}
</code></pre>
<h3 id="الإعداد-المتوازن-أغلب-المشاريع">الإعداد المتوازن (أغلب المشاريع)</h3>
<pre><code class="language-javascript"><span class="hljs-attr">rules</span>: {
  ...react.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>,
  ...react.<span class="hljs-property">configs</span>[<span class="hljs-string">&#x27;jsx-runtime&#x27;</span>].<span class="hljs-property">rules</span>,
  ...reactHooks.<span class="hljs-property">configs</span>.<span class="hljs-property">recommended</span>.<span class="hljs-property">rules</span>,
  <span class="hljs-string">&#x27;react/prop-types&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Using TypeScript</span>
  <span class="hljs-string">&#x27;react/display-name&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Often too noisy</span>
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, {
    <span class="hljs-attr">allowConstantExport</span>: <span class="hljs-literal">true</span>
  }],
}
</code></pre>
<h3 id="الإعداد-الأدنى-النماذج-الأولية-والمشاريع-الصغيرة">الإعداد الأدنى (النماذج الأولية والمشاريع الصغيرة)</h3>
<pre><code class="language-javascript"><span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react/jsx-key&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Critical for React</span>
  <span class="hljs-string">&#x27;react-hooks/rules-of-hooks&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-comment">// Critical for hooks</span>
  <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>, <span class="hljs-comment">// Helpful but not blocking</span>
  <span class="hljs-string">&#x27;react-refresh/only-export-components&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>, <span class="hljs-comment">// Nice for DX</span>
}
</code></pre>
<h2 id="الأخطاء-الشائعة">الأخطاء الشائعة</h2>
<ol>
<li><strong>لا تعطّل <code>rules-of-hooks</code></strong>: قد يسبّب هذا سلوكًا غير متوقّع لـ React.</li>
<li><strong>كن حذرًا مع <code>exhaustive-deps</code></strong>: إنه مزعج لكنه <em>عادةً</em> صحيح.</li>
<li><strong><code>react-refresh</code> خاص بـ Vite</strong>: لست بحاجة إليه مع Create React App أو Next.js</li>
<li><strong>يجعل TypeScript كثيرًا من قواعد React زائدة عن الحاجة</strong>: يمكنك تعطيل القواعد المرتبطة بـ <code>prop-types</code></li>
<li><strong>بعض القواعد تتعارض مع Prettier</strong> - عطّل قواعد التنسيق إن كنت تستخدم Prettier.</li>
</ol>
<blockquote>
<p><strong>أعددت قائمة بكل القواعد «الموصى بها» وما الذي تفعله.</strong></p>
<p>يمكنك الاطّلاع على تلك القائمة <a href="https://stevekinney.com/courses/react-typescript/typescript-react-eslint-rules">هنا</a>.</p>
</blockquote>
<h2 id="سكربتات-packagejson">سكربتات <code>package,json</code></h2>
<p>أضف هذه السكربتات إلى ملف <code>package.json</code> الخاص بك:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint .&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint:fix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint . --fix&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="بعض-أفضل-الممارسات-الأخرى">بعض أفضل الممارسات الأخرى</h2>
<p>لفحص أنواع أكثر صرامة، فعّل القواعد المدركة للأنواع بإضافة ضبط المشروع:</p>
<p>إن كنت تستخدم Bun أو Deno، يمكنك استخدام <code>import.meta.env</code>. لكن إن كنت تستخدم Node، فستحتاج إلى إنشاء بديلك (polyfill) الخاص.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> __filename = <span class="hljs-title function_">fileURLToPath</span>(<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>);
<span class="hljs-keyword">const</span> __dirname = <span class="hljs-title function_">dirname</span>(__filename);
</code></pre>
<pre><code class="language-javascript"><span class="hljs-attr">parserOptions</span>: {
  <span class="hljs-attr">project</span>: <span class="hljs-string">&#x27;./tsconfig.json&#x27;</span>,
  <span class="hljs-attr">tsconfigRootDir</span>: __dirname,
}
</code></pre>
<p>ومرة أخرى، في Deno أو Bun يمكنك فعل ما يلي بدلًا من ذلك:</p>
<pre><code class="language-javascript"><span class="hljs-attr">parserOptions</span>: {
  <span class="hljs-attr">project</span>: <span class="hljs-string">&#x27;./tsconfig.json&#x27;</span>,
  <span class="hljs-attr">tsconfigRootDir</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">dirname</span>,
}
</code></pre>
<p>ثم استخدم <code>typescript.configs.recommendedTypeChecked</code> بدلًا من <code>recommended</code> فقط.</p>
<p><strong>2. قواعد مخصّصة لفريقك</strong> أضف قواعد خاصة بالمشروع بناءً على أعراف فريقك:</p>
<pre><code class="language-javascript"><span class="hljs-attr">rules</span>: {
  <span class="hljs-string">&#x27;react/prop-types&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// TypeScript handles this</span>
  <span class="hljs-string">&#x27;react/react-in-jsx-scope&#x27;</span>: <span class="hljs-string">&#x27;off&#x27;</span>, <span class="hljs-comment">// Not needed with React 17+</span>
  <span class="hljs-string">&#x27;no-console&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, { <span class="hljs-attr">allow</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, <span class="hljs-string">&#x27;error&#x27;</span>] }],
  <span class="hljs-string">&#x27;prefer-const&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
}
</code></pre>
<h2 id="اختياري-تهيئة-visual-studio-code-وأو-cursor">اختياري: تهيئة Visual Studio Code و/أو Cursor</h2>
<p>إن كنت تستخدم Visual Studio Code أو Cursor، فقد ترغب في تثبيت <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">امتداد ESLint</a>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;editor.codeActionsOnSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;source.fixAll.eslint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;eslint.validate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;javascript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;typescript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;javascriptreact&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;typescriptreact&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="اختياري-تهيئة-خطافات-ما-قبل-الإيداع">اختياري: تهيئة خطّافات ما قبل الإيداع</h2>
<p>استخدم Husky و lint-staged لفرض الفحص قبل الإيداعات:</p>
<pre><code class="language-bash">npm install -D husky lint-staged
npx husky init
</code></pre>
<p>أضف إلى <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;lint-staged&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;*.{ts,tsx}&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;eslint --fix&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;git add&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
