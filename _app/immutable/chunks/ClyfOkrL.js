const s="kinney",a="react-typescript",n="React مع TypeScript",l="vite-react-typescript-optimization",p="تحسين Vite مع React وTypeScript",t=[{depth:2,id:"فهم-بنية-vite",text:"فهم بنية Vite"},{depth:3,id:"مقاربة-vite-ذات-المرحلتين",text:"مقاربة Vite ذات المرحلتين"},{depth:2,id:"تحسين-تجربة-التطوير",text:"تحسين تجربة التطوير"},{depth:3,id:"فحص-الأنواع-على-التوازي",text:"فحص الأنواع على التوازي"},{depth:3,id:"ملف-tsconfig-محسن-لـ-vite",text:"ملف TSConfig محسّن لـ Vite"},{depth:3,id:"إعداد-fast-refresh",text:"إعداد Fast Refresh"},{depth:2,id:"تكامل-متقدم-مع-typescript",text:"تكامل متقدم مع TypeScript"},{depth:3,id:"متغيرات-بيئة-آمنة-من-حيث-الأنواع",text:"متغيرات بيئة آمنة من حيث الأنواع"},{depth:3,id:"أنواع-الاستيراد-الديناميكي",text:"أنواع الاستيراد الديناميكي"},{depth:2,id:"تحسين-بناء-الإنتاج",text:"تحسين بناء الإنتاج"},{depth:3,id:"إعداد-بناء-متقدم",text:"إعداد بناء متقدم"},{depth:3,id:"تقسيم-ذكي-للشيفرة",text:"تقسيم ذكي للشيفرة"},{depth:2,id:"تحسين-css-والأصول",text:"تحسين CSS والأصول"},{depth:3,id:"وحدات-css-مع-typescript",text:"وحدات CSS مع TypeScript"},{depth:3,id:"تحسين-الصور",text:"تحسين الصور"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:3,id:"تحليل-زمن-البناء",text:"تحليل زمن البناء"},{depth:3,id:"مراقبة-أداء-وقت-التشغيل",text:"مراقبة أداء وقت التشغيل"},{depth:2,id:"إضافات-vite-المتقدمة",text:"إضافات Vite المتقدمة"},{depth:3,id:"إضافة-الاستيراد-التلقائي",text:"إضافة الاستيراد التلقائي"},{depth:3,id:"تحسين-مكتبة-المكونات",text:"تحسين مكتبة المكوّنات"},{depth:2,id:"تحسين-سير-عمل-التطوير",text:"تحسين سير عمل التطوير"},{depth:3,id:"إعداد-تطبيق-متعدد-الصفحات",text:"إعداد تطبيق متعدد الصفحات"},{depth:3,id:"أنواع-الاستبدال-الساخن-للوحدات",text:"أنواع الاستبدال الساخن للوحدات"},{depth:2,id:"النشر-إلى-الإنتاج",text:"النشر إلى الإنتاج"},{depth:3,id:"إعداد-docker",text:"إعداد Docker"},{depth:3,id:"تحسين-التكامل-والنشر-المستمر",text:"تحسين التكامل والنشر المستمر"},{depth:2,id:"المراقبة-والتحليلات",text:"المراقبة والتحليلات"},{depth:2,id:"خلاصة",text:"خلاصة"}],c=`<p>أحدثت Vite ثورة في تطوير React بفضل الاستبدال الساخن السريع كالبرق والبناءات المحسّنة. لكنك حين تجمع Vite مع TypeScript وReact، تنفتح أمامك دنيا كاملة من فرص التحسين التي تجعل تجربة تطويرك أفضل وأحزم إنتاجك أصغر. من فحص الأنواع على التوازي إلى استراتيجيات تقسيم الشيفرة المثلى، دعنا نستكشف كيف تعصر كل ذرة أداء من إعداد Vite وReact وTypeScript لديك.</p>
<p>فكّر في Vite كفريق صيانة في سباقات الفورمولا 1 لتطبيق React الخاص بك. إنه سريع بالفعل، لكن مع الضبط الصحيح وإعدادات TypeScript المناسبة، يمكنك جعله يطير حقًا.</p>
<h2 id="فهم-بنية-vite">فهم بنية Vite</h2>
<p>قبل أن نحسّن، دعنا نفهم كيف تتعامل Vite مع TypeScript وReact بشكل مختلف عن أدوات التجميع التقليدية.</p>
<h3 id="مقاربة-vite-ذات-المرحلتين">مقاربة Vite ذات المرحلتين</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - Understanding the architecture</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],

  <span class="hljs-comment">// Development: Native ESM, no bundling</span>
  <span class="hljs-attr">server</span>: {
    <span class="hljs-comment">// Vite serves TypeScript files directly to the browser</span>
    <span class="hljs-comment">// Browser requests .tsx files, Vite transpiles on-demand</span>
  },

  <span class="hljs-comment">// Production: Rollup-based bundling</span>
  <span class="hljs-attr">build</span>: {
    <span class="hljs-comment">// TypeScript is stripped, code is bundled and optimized</span>
  },
});
</code></pre>
<p>الرؤية الجوهرية: لا تفحص Vite الأنواع أثناء التطوير افتراضيًا. إنها تحوّل TypeScript بإزالة الأنواع، ولهذا هي بهذه السرعة.</p>
<h2 id="تحسين-تجربة-التطوير">تحسين تجربة التطوير</h2>
<p>لنبدأ بجعل التطوير فائق السرعة مع الحفاظ على سلامة الأنواع.</p>
<h3 id="فحص-الأنواع-على-التوازي">فحص الأنواع على التوازي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> checker <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-plugin-checker&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">react</span>({
      <span class="hljs-comment">// Use SWC for faster transpilation</span>
      <span class="hljs-attr">jsxImportSource</span>: <span class="hljs-string">&#x27;@emotion/react&#x27;</span>,
      <span class="hljs-attr">babel</span>: {
        <span class="hljs-attr">plugins</span>: [
          <span class="hljs-comment">// Only include essential babel plugins</span>
        ],
      },
    }),

    <span class="hljs-comment">// Run TypeScript checking in a separate process</span>
    <span class="hljs-title function_">checker</span>({
      <span class="hljs-attr">typescript</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">overlay</span>: {
        <span class="hljs-attr">initialIsOpen</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">position</span>: <span class="hljs-string">&#x27;br&#x27;</span>,
      },
      <span class="hljs-attr">terminal</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">enableBuild</span>: <span class="hljs-literal">true</span>,
    }),
  ],

  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">warmup</span>: {
      <span class="hljs-comment">// Pre-transform frequently used files</span>
      <span class="hljs-attr">clientFiles</span>: [<span class="hljs-string">&#x27;./src/main.tsx&#x27;</span>, <span class="hljs-string">&#x27;./src/App.tsx&#x27;</span>, <span class="hljs-string">&#x27;./src/components/**/*.tsx&#x27;</span>],
    },
  },
});
</code></pre>
<h3 id="ملف-tsconfig-محسن-لـ-vite">ملف TSConfig محسّن لـ Vite</h3>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// Performance optimizations</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bundler&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM.Iterable&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// React configuration</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsxImportSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Type checking options</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Speed optimizations</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;incremental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tsBuildInfoFile&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.tsbuildinfo&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Path mapping for cleaner imports</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@hooks/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/hooks/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@utils/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/utils/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@types/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/types/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Vite specific</span>
    <span class="hljs-attr">&quot;allowImportingTsExtensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isolatedModules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;vite.config.ts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.node.json&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إعداد-fast-refresh">إعداد Fast Refresh</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - Optimized Fast Refresh</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">react</span>({
      <span class="hljs-attr">fastRefresh</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// Exclude files from Fast Refresh</span>
      <span class="hljs-attr">exclude</span>: [<span class="hljs-regexp">/\\.stories\\.(t|j)sx?$/</span>, <span class="hljs-regexp">/\\.test\\.(t|j)sx?$/</span>],
      <span class="hljs-comment">// Include files for Fast Refresh</span>
      <span class="hljs-attr">include</span>: <span class="hljs-string">&#x27;**/*.{jsx,tsx}&#x27;</span>,
    }),
  ],

  <span class="hljs-comment">// Optimize dependency pre-bundling</span>
  <span class="hljs-attr">optimizeDeps</span>: {
    <span class="hljs-comment">// Force include dependencies that Vite might miss</span>
    <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;react&#x27;</span>, <span class="hljs-string">&#x27;react-dom&#x27;</span>, <span class="hljs-string">&#x27;react-router-dom&#x27;</span>, <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>],
    <span class="hljs-comment">// Exclude large dependencies from pre-bundling</span>
    <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;@faker-js/faker&#x27;</span>],
    <span class="hljs-comment">// Use esbuild for faster pre-bundling</span>
    <span class="hljs-attr">esbuildOptions</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;esnext&#x27;</span>,
    },
  },
});
</code></pre>
<h2 id="تكامل-متقدم-مع-typescript">تكامل متقدم مع TypeScript</h2>
<p>لنستفد من TypeScript لتحسينات أفضل في Vite.</p>
<h3 id="متغيرات-بيئة-آمنة-من-حيث-الأنواع">متغيرات بيئة آمنة من حيث الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// src/vite-env.d.ts</span>
<span class="hljs-comment">/// &lt;reference types=&quot;vite/client&quot; /&gt;</span>

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImportMetaEnv</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_API_URL</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_APP_TITLE</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_ENABLE_ANALYTICS</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_PUBLIC_KEY</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-comment">// Add more env variables as needed</span>
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImportMeta</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">env</span>: <span class="hljs-title class_">ImportMetaEnv</span>;
}

<span class="hljs-comment">// Type-safe env helper</span>
<span class="hljs-comment">// src/utils/env.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> env = {
  <span class="hljs-attr">apiUrl</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_API_URL</span>,
  <span class="hljs-attr">appTitle</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_APP_TITLE</span>,
  <span class="hljs-attr">enableAnalytics</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_ENABLE_ANALYTICS</span> === <span class="hljs-string">&#x27;true&#x27;</span>,
  <span class="hljs-attr">publicKey</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_PUBLIC_KEY</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// Validate env at startup</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">validateEnv</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">const</span> required = [<span class="hljs-string">&#x27;VITE_API_URL&#x27;</span>, <span class="hljs-string">&#x27;VITE_PUBLIC_KEY&#x27;</span>];

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> required) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>[key]) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Missing required environment variable: <span class="hljs-subst">\${key}</span>\`</span>);
    }
  }
}
</code></pre>
<h3 id="أنواع-الاستيراد-الديناميكي">أنواع الاستيراد الديناميكي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// src/utils/dynamic-imports.ts</span>
<span class="hljs-comment">// Type-safe dynamic imports with Vite</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ModuleLoader</span>&lt;T&gt; = <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">default</span>: T }&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteModule</span> {
  <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>;
  <span class="hljs-attr">loader</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">unknown</span>&gt;;
  <span class="hljs-title class_">ErrorBoundary</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>;
}

<span class="hljs-comment">// Vite-specific glob imports with TypeScript</span>
<span class="hljs-keyword">const</span> routeModules = <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">glob</span>&lt;<span class="hljs-title class_">RouteModule</span>&gt;(
  <span class="hljs-string">&#x27;/src/routes/**/*.tsx&#x27;</span>,
  { <span class="hljs-attr">eager</span>: <span class="hljs-literal">false</span> }
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">loadRoute</span>(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">RouteModule</span>&gt; {
  <span class="hljs-keyword">const</span> loader = routeModules[<span class="hljs-string">\`/src/routes<span class="hljs-subst">\${path}</span>.tsx\`</span>];

  <span class="hljs-keyword">if</span> (!loader) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Route not found: <span class="hljs-subst">\${path}</span>\`</span>);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">loader</span>();
}

<span class="hljs-comment">// Type-safe lazy loading with error boundaries</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> lazyWithErrorBoundary&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;(
  <span class="hljs-attr">loader</span>: <span class="hljs-title class_">ModuleLoader</span>&lt;T&gt;,
  <span class="hljs-title class_">ErrorFallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;{ <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> }&gt;
): <span class="hljs-title class_">React</span>.<span class="hljs-property">LazyExoticComponent</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">lazy</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">loader</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to load module:&#x27;</span>, error);

      <span class="hljs-keyword">if</span> (<span class="hljs-title class_">ErrorFallback</span>) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">default</span>: (<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorFallback</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error</span> <span class="hljs-attr">as</span> <span class="hljs-attr">Error</span>} /&gt;</span></span>
          )) <span class="hljs-keyword">as</span> T,
        };
      }

      <span class="hljs-keyword">throw</span> error;
    }
  });
}
</code></pre>
<h2 id="تحسين-بناء-الإنتاج">تحسين بناء الإنتاج</h2>
<p>حسّن بناءات الإنتاج لديك لأقصى أداء.</p>
<h3 id="إعداد-بناء-متقدم">إعداد بناء متقدم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - Production optimizations</span>
<span class="hljs-keyword">import</span> { defineConfig, splitVendorChunkPlugin } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> { visualizer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;rollup-plugin-visualizer&#x27;</span>;
<span class="hljs-keyword">import</span> compression <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-plugin-compression&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>(<span class="hljs-function">(<span class="hljs-params">{ mode }</span>) =&gt;</span> ({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">react</span>(),
    <span class="hljs-title function_">splitVendorChunkPlugin</span>(),

    <span class="hljs-comment">// Compress assets</span>
    <span class="hljs-title function_">compression</span>({
      <span class="hljs-attr">algorithm</span>: <span class="hljs-string">&#x27;brotliCompress&#x27;</span>,
      <span class="hljs-attr">ext</span>: <span class="hljs-string">&#x27;.br&#x27;</span>,
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,
    }),

    <span class="hljs-comment">// Bundle analyzer</span>
    mode === <span class="hljs-string">&#x27;analyze&#x27;</span> &amp;&amp;
      <span class="hljs-title function_">visualizer</span>({
        <span class="hljs-attr">open</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">gzipSize</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">brotliSize</span>: <span class="hljs-literal">true</span>,
      }),
  ].<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>),

  <span class="hljs-attr">build</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;es2015&#x27;</span>,
    <span class="hljs-attr">minify</span>: <span class="hljs-string">&#x27;esbuild&#x27;</span>,
    <span class="hljs-attr">sourcemap</span>: mode === <span class="hljs-string">&#x27;development&#x27;</span>,

    <span class="hljs-comment">// Rollup options</span>
    <span class="hljs-attr">rollupOptions</span>: {
      <span class="hljs-attr">output</span>: {
        <span class="hljs-comment">// Manual chunking strategy</span>
        <span class="hljs-attr">manualChunks</span>: <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> {
          <span class="hljs-comment">// React ecosystem</span>
          <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;react&#x27;</span>) || id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;react-dom&#x27;</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;react&#x27;</span>;
          }

          <span class="hljs-comment">// UI libraries</span>
          <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@mui&#x27;</span>) || id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@emotion&#x27;</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;ui&#x27;</span>;
          }

          <span class="hljs-comment">// Utilities</span>
          <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;lodash&#x27;</span>) || id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;date-fns&#x27;</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;utils&#x27;</span>;
          }

          <span class="hljs-comment">// Large dependencies</span>
          <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;monaco-editor&#x27;</span>) || id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;codemirror&#x27;</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;editor&#x27;</span>;
          }

          <span class="hljs-comment">// Default vendor chunk</span>
          <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;node_modules&#x27;</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;vendor&#x27;</span>;
          }
        },

        <span class="hljs-comment">// Asset naming</span>
        <span class="hljs-attr">chunkFileNames</span>: <span class="hljs-function">(<span class="hljs-params">chunkInfo</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> facadeModuleId = chunkInfo.<span class="hljs-property">facadeModuleId</span>
            ? chunkInfo.<span class="hljs-property">facadeModuleId</span>.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;/&#x27;</span>).<span class="hljs-title function_">pop</span>()
            : <span class="hljs-string">&#x27;chunk&#x27;</span>;
          <span class="hljs-keyword">return</span> <span class="hljs-string">\`js/<span class="hljs-subst">\${facadeModuleId}</span>-[hash].js\`</span>;
        },

        <span class="hljs-attr">assetFileNames</span>: <span class="hljs-function">(<span class="hljs-params">assetInfo</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> extType = assetInfo.<span class="hljs-property">name</span>?.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;.&#x27;</span>).<span class="hljs-title function_">pop</span>() || <span class="hljs-string">&#x27;asset&#x27;</span>;
          <span class="hljs-keyword">const</span> folder = <span class="hljs-regexp">/\\.(png|jpe?g|gif|svg|webp|ico)$/</span>.<span class="hljs-title function_">test</span>(assetInfo.<span class="hljs-property">name</span> || <span class="hljs-string">&#x27;&#x27;</span>)
            ? <span class="hljs-string">&#x27;images&#x27;</span>
            : <span class="hljs-regexp">/\\.(woff2?|eot|ttf|otf)$/</span>.<span class="hljs-title function_">test</span>(assetInfo.<span class="hljs-property">name</span> || <span class="hljs-string">&#x27;&#x27;</span>)
              ? <span class="hljs-string">&#x27;fonts&#x27;</span>
              : <span class="hljs-string">&#x27;assets&#x27;</span>;
          <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${folder}</span>/[name]-[hash][extname]\`</span>;
        },
      },

      <span class="hljs-comment">// Tree shaking</span>
      <span class="hljs-attr">treeshake</span>: {
        <span class="hljs-attr">preset</span>: <span class="hljs-string">&#x27;recommended&#x27;</span>,
        <span class="hljs-attr">moduleSideEffects</span>: <span class="hljs-literal">false</span>,
      },
    },

    <span class="hljs-comment">// Chunk size warnings</span>
    <span class="hljs-attr">chunkSizeWarningLimit</span>: <span class="hljs-number">500</span>,

    <span class="hljs-comment">// CSS code splitting</span>
    <span class="hljs-attr">cssCodeSplit</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-comment">// Preload strategy</span>
    <span class="hljs-attr">modulePreload</span>: {
      <span class="hljs-attr">polyfill</span>: <span class="hljs-literal">true</span>,
    },
  },
}));
</code></pre>
<h3 id="تقسيم-ذكي-للشيفرة">تقسيم ذكي للشيفرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// src/utils/code-splitting.ts</span>
<span class="hljs-keyword">import</span> { lazy, <span class="hljs-title class_">ComponentType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SplitConfig</span> {
  <span class="hljs-attr">prefetch</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">preload</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">chunkName</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Webpack magic comments for Vite</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> splitComponent&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;(
  <span class="hljs-attr">loader</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">default</span>: T }&gt;,
  <span class="hljs-attr">config</span>: <span class="hljs-title class_">SplitConfig</span> = {},
): <span class="hljs-title class_">React</span>.<span class="hljs-property">LazyExoticComponent</span>&lt;T&gt; {
  <span class="hljs-comment">// Add magic comments for bundler hints</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">enhancedLoader</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (config.<span class="hljs-property">prefetch</span>) {
      <span class="hljs-comment">// Prefetch the chunk</span>
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;prefetch&#x27;</span>;
      link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;script&#x27;</span>;
      <span class="hljs-comment">// This would need actual chunk URL</span>
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">loader</span>();
  };

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">lazy</span>(enhancedLoader);
}

<span class="hljs-comment">// Route-based code splitting with TypeScript</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteConfig</span> {
  <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">ComponentType</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">RouteConfig</span>[];
  <span class="hljs-attr">preload</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: <span class="hljs-title class_">RouteConfig</span>[] = [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-title function_">splitComponent</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Home&#x27;</span>), { <span class="hljs-attr">prefetch</span>: <span class="hljs-literal">true</span> }),
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/dashboard&#x27;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-title function_">splitComponent</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Dashboard&#x27;</span>), { <span class="hljs-attr">preload</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;analytics&#x27;</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-title function_">splitComponent</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Dashboard/Analytics&#x27;</span>)),
      },
    ],
  },
];
</code></pre>
<h2 id="تحسين-css-والأصول">تحسين CSS والأصول</h2>
<p>حسّن CSS والأصول بدعم من TypeScript.</p>
<h3 id="وحدات-css-مع-typescript">وحدات CSS مع TypeScript</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - CSS Modules configuration</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">css</span>: {
    <span class="hljs-attr">modules</span>: {
      <span class="hljs-attr">localsConvention</span>: <span class="hljs-string">&#x27;camelCase&#x27;</span>,
      <span class="hljs-attr">generateScopedName</span>: <span class="hljs-string">&#x27;[name]__[local]___[hash:base64:5]&#x27;</span>,
    },
    <span class="hljs-attr">preprocessorOptions</span>: {
      <span class="hljs-attr">scss</span>: {
        <span class="hljs-attr">additionalData</span>: <span class="hljs-string">\`@import &quot;@/styles/variables.scss&quot;;\`</span>,
      },
    },
  },
});

<span class="hljs-comment">// Generate TypeScript definitions for CSS Modules</span>
<span class="hljs-comment">// typed-css-modules.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Plugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> { writeFileSync, existsSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">cssModulesTypescript</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Plugin</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;css-modules-typescript&#x27;</span>,
    <span class="hljs-keyword">async</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params">code, id</span>) {
      <span class="hljs-keyword">if</span> (!id.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.module.css&#x27;</span>) &amp;&amp; !id.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.module.scss&#x27;</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }

      <span class="hljs-comment">// Parse CSS and generate types</span>
      <span class="hljs-keyword">const</span> classNames = <span class="hljs-title function_">extractClassNames</span>(code);
      <span class="hljs-keyword">const</span> dts = <span class="hljs-title function_">generateTypeDefinitions</span>(classNames);

      <span class="hljs-keyword">const</span> dtsPath = id.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\\.(css|scss)$/</span>, <span class="hljs-string">&#x27;.d.ts&#x27;</span>);
      <span class="hljs-title function_">writeFileSync</span>(dtsPath, dts);

      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    },
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">extractClassNames</span>(<span class="hljs-params"><span class="hljs-attr">css</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>[] {
  <span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/\\.([a-zA-Z][a-zA-Z0-9-_]*)/g</span>;
  <span class="hljs-keyword">const</span> matches = css.<span class="hljs-title function_">matchAll</span>(regex);
  <span class="hljs-keyword">return</span> [...<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>([...matches].<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m[<span class="hljs-number">1</span>]))];
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">generateTypeDefinitions</span>(<span class="hljs-params"><span class="hljs-attr">classNames</span>: <span class="hljs-built_in">string</span>[]</span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">exports</span> = classNames.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> <span class="hljs-string">\`  readonly <span class="hljs-subst">\${name}</span>: string;\`</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-string">\`declare const styles: {
<span class="hljs-subst">\${<span class="hljs-built_in">exports</span>}</span>
};
export default styles;
\`</span>;
}
</code></pre>
<h3 id="تحسين-الصور">تحسين الصور</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - Image optimization</span>
<span class="hljs-keyword">import</span> imagemin <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-plugin-imagemin&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">imagemin</span>({
      <span class="hljs-attr">gifsicle</span>: { <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-number">7</span> },
      <span class="hljs-attr">optipng</span>: { <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-number">7</span> },
      <span class="hljs-attr">mozjpeg</span>: { <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span> },
      <span class="hljs-attr">svgo</span>: {
        <span class="hljs-attr">plugins</span>: [
          { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;removeViewBox&#x27;</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span> },
          { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;removeEmptyAttrs&#x27;</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span> },
        ],
      },
      <span class="hljs-attr">webp</span>: { <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span> },
    }),
  ],
});

<span class="hljs-comment">// Type-safe image imports</span>
<span class="hljs-comment">// src/types/images.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">ReactComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FunctionComponent</span>&lt;
    <span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt; &amp; { <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span> }
  &gt;;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.jpg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.webp&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-comment">// Responsive image component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ResponsiveImageProps</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sizes</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">loading</span>?: <span class="hljs-string">&#x27;lazy&#x27;</span> | <span class="hljs-string">&#x27;eager&#x27;</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ResponsiveImage</span>(<span class="hljs-params">{
  src,
  alt,
  sizes = <span class="hljs-string">&#x27;100vw&#x27;</span>,
  loading = <span class="hljs-string">&#x27;lazy&#x27;</span>,
}: <span class="hljs-title class_">ResponsiveImageProps</span></span>) {
  <span class="hljs-comment">// Generate srcset with Vite&#x27;s image transformation</span>
  <span class="hljs-keyword">const</span> srcset = <span class="hljs-string">\`
    <span class="hljs-subst">\${src}</span>?w=640 640w,
    <span class="hljs-subst">\${src}</span>?w=768 768w,
    <span class="hljs-subst">\${src}</span>?w=1024 1024w,
    <span class="hljs-subst">\${src}</span>?w=1280 1280w
  \`</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{src}</span>
      <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{srcset}</span>
      <span class="hljs-attr">sizes</span>=<span class="hljs-string">{sizes}</span>
      <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span>
      <span class="hljs-attr">loading</span>=<span class="hljs-string">{loading}</span>
    /&gt;</span></span>
  );
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>تتبّع أداء تطبيق Vite الخاص بك وحسّنه.</p>
<h3 id="تحليل-زمن-البناء">تحليل زمن البناء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite-plugin-build-time.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Plugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BuildMetrics</span> {
  <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">endTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">chunks</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">modules</span>: <span class="hljs-built_in">number</span>;
  }&gt;;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">buildTimeAnalysis</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Plugin</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">BuildMetrics</span> = {
    <span class="hljs-attr">startTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">endTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">duration</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">chunks</span>: [],
  };

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;build-time-analysis&#x27;</span>,

    <span class="hljs-title function_">buildStart</span>(<span class="hljs-params"></span>) {
      startTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
      metrics.<span class="hljs-property">startTime</span> = startTime;
    },

    <span class="hljs-title function_">generateBundle</span>(<span class="hljs-params">options, bundle</span>) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [fileName, chunk] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(bundle)) {
        <span class="hljs-keyword">if</span> (chunk.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;chunk&#x27;</span>) {
          metrics.<span class="hljs-property">chunks</span>.<span class="hljs-title function_">push</span>({
            <span class="hljs-attr">name</span>: fileName,
            <span class="hljs-attr">size</span>: chunk.<span class="hljs-property">code</span>.<span class="hljs-property">length</span>,
            <span class="hljs-attr">modules</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(chunk.<span class="hljs-property">modules</span>).<span class="hljs-property">length</span>,
          });
        }
      }
    },

    <span class="hljs-title function_">closeBundle</span>(<span class="hljs-params"></span>) {
      metrics.<span class="hljs-property">endTime</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
      metrics.<span class="hljs-property">duration</span> = metrics.<span class="hljs-property">endTime</span> - metrics.<span class="hljs-property">startTime</span>;

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n📊 Build Metrics:&#x27;</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Total time: <span class="hljs-subst">\${metrics.duration}</span>ms\`</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\nChunks:&#x27;</span>);
      metrics.<span class="hljs-property">chunks</span>
        .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">size</span> - a.<span class="hljs-property">size</span>)
        .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
            <span class="hljs-string">\`  <span class="hljs-subst">\${chunk.name}</span>: <span class="hljs-subst">\${(chunk.size / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>KB (<span class="hljs-subst">\${chunk.modules}</span> modules)\`</span>,
          );
        });
    },
  };
}
</code></pre>
<h3 id="مراقبة-أداء-وقت-التشغيل">مراقبة أداء وقت التشغيل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// src/utils/performance-monitor.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-attr">fcp</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// First Contentful Paint</span>
  <span class="hljs-attr">lcp</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Largest Contentful Paint</span>
  <span class="hljs-attr">fid</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// First Input Delay</span>
  <span class="hljs-attr">cls</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Cumulative Layout Shift</span>
  <span class="hljs-attr">ttfb</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time to First Byte</span>
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">VitePerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt; = {};

  <span class="hljs-title function_">init</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> === <span class="hljs-string">&#x27;undefined&#x27;</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Web Vitals</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">observeWebVitals</span>();

    <span class="hljs-comment">// Custom metrics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureBundleLoadTime</span>();

    <span class="hljs-comment">// Send metrics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">PROD</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportMetrics</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">observeWebVitals</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// First Contentful Paint</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">fcp</span> = entry.<span class="hljs-property">startTime</span>;
        }
      }
    }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;paint&#x27;</span>] });

    <span class="hljs-comment">// Largest Contentful Paint</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
      <span class="hljs-keyword">const</span> lastEntry = entries[entries.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">lcp</span> = lastEntry.<span class="hljs-property">startTime</span>;
    }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>] });

    <span class="hljs-comment">// First Input Delay</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> firstInput = list.<span class="hljs-title function_">getEntries</span>()[<span class="hljs-number">0</span>];
      <span class="hljs-keyword">if</span> (firstInput) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">fid</span> = firstInput.<span class="hljs-property">processingStart</span> - firstInput.<span class="hljs-property">startTime</span>;
      }
    }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;first-input&#x27;</span>] });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">measureBundleLoadTime</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> scripts = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;script[src]&#x27;</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-attr">loadTimes</span>: <span class="hljs-built_in">number</span>[] = [];

    scripts.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">script</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> entry = performance.<span class="hljs-title function_">getEntriesByName</span>(
        (script <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLScriptElement</span>).<span class="hljs-property">src</span>,
      )[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceResourceTiming</span>;

      <span class="hljs-keyword">if</span> (entry) {
        loadTimes.<span class="hljs-title function_">push</span>(entry.<span class="hljs-property">duration</span>);
      }
    });

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Bundle load times:&#x27;</span>, loadTimes);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportMetrics</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gtag</span>) {
      <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[metric, value]</span>) =&gt;</span> {
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;performance&#x27;</span>, {
          <span class="hljs-attr">metric_name</span>: metric,
          <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(value),
        });
      });
    }
  }

  <span class="hljs-title function_">getMetrics</span>(): <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt; {
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> };
  }
}

<span class="hljs-comment">// React hook for performance monitoring</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">usePerformanceMonitor</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> monitor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">VitePerformanceMonitor</span>();
    monitor.<span class="hljs-title function_">init</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Cleanup if needed</span>
    };
  }, []);
}
</code></pre>
<h2 id="إضافات-vite-المتقدمة">إضافات Vite المتقدمة</h2>
<p>أنشئ إضافات Vite خاصة بك بـ TypeScript من أجل تحسينات محددة.</p>
<h3 id="إضافة-الاستيراد-التلقائي">إضافة الاستيراد التلقائي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite-plugin-auto-import.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Plugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> { parse } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/parser&#x27;</span>;
<span class="hljs-keyword">import</span> traverse <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/traverse&#x27;</span>;
<span class="hljs-keyword">import</span> generate <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/generator&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AutoImportConfig</span> {
  <span class="hljs-attr">imports</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">dts</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">autoImport</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">AutoImportConfig</span></span>): <span class="hljs-title class_">Plugin</span> {
  <span class="hljs-keyword">const</span> imports = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;();

  <span class="hljs-comment">// Collect all imports</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [<span class="hljs-variable language_">module</span>, names] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(config.<span class="hljs-property">imports</span>)) {
    names.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!imports.<span class="hljs-title function_">has</span>(name)) {
        imports.<span class="hljs-title function_">set</span>(name, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
      }
      imports.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">module</span>);
    });
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;auto-import&#x27;</span>,

    <span class="hljs-title function_">transform</span>(<span class="hljs-params">code, id</span>) {
      <span class="hljs-keyword">if</span> (!id.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.tsx&#x27;</span>) &amp;&amp; !id.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.ts&#x27;</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }

      <span class="hljs-keyword">const</span> ast = <span class="hljs-title function_">parse</span>(code, {
        <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
        <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&#x27;typescript&#x27;</span>, <span class="hljs-string">&#x27;jsx&#x27;</span>],
      });

      <span class="hljs-keyword">const</span> usedImports = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;();
      <span class="hljs-keyword">let</span> hasChanges = <span class="hljs-literal">false</span>;

      <span class="hljs-comment">// Find used identifiers</span>
      <span class="hljs-title function_">traverse</span>(ast, {
        <span class="hljs-title class_">Identifier</span>(path) {
          <span class="hljs-keyword">const</span> name = path.<span class="hljs-property">node</span>.<span class="hljs-property">name</span>;
          <span class="hljs-keyword">if</span> (imports.<span class="hljs-title function_">has</span>(name) &amp;&amp; !path.<span class="hljs-property">scope</span>.<span class="hljs-title function_">hasBinding</span>(name)) {
            <span class="hljs-keyword">const</span> modules = imports.<span class="hljs-title function_">get</span>(name)!;
            <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = modules.<span class="hljs-title function_">values</span>().<span class="hljs-title function_">next</span>().<span class="hljs-property">value</span>;
            usedImports.<span class="hljs-title function_">set</span>(name, <span class="hljs-variable language_">module</span>);
            hasChanges = <span class="hljs-literal">true</span>;
          }
        },
      });

      <span class="hljs-keyword">if</span> (!hasChanges) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }

      <span class="hljs-comment">// Add import statements</span>
      <span class="hljs-keyword">const</span> importStatements = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(usedImports.<span class="hljs-title function_">entries</span>())
        .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[name, <span class="hljs-variable language_">module</span>]</span>) =&gt;</span> <span class="hljs-string">\`import { <span class="hljs-subst">\${name}</span> } from &#x27;<span class="hljs-subst">\${<span class="hljs-variable language_">module</span>}</span>&#x27;;\`</span>)
        .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>);

      <span class="hljs-keyword">const</span> { <span class="hljs-attr">code</span>: transformedCode } = <span class="hljs-title function_">generate</span>(ast);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">code</span>: <span class="hljs-string">\`<span class="hljs-subst">\${importStatements}</span>\\n<span class="hljs-subst">\${transformedCode}</span>\`</span>,
        <span class="hljs-attr">map</span>: <span class="hljs-literal">null</span>,
      };
    },
  };
}

<span class="hljs-comment">// Usage in vite.config.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">autoImport</span>({
      <span class="hljs-attr">imports</span>: {
        <span class="hljs-attr">react</span>: [<span class="hljs-string">&#x27;useState&#x27;</span>, <span class="hljs-string">&#x27;useEffect&#x27;</span>, <span class="hljs-string">&#x27;useMemo&#x27;</span>, <span class="hljs-string">&#x27;useCallback&#x27;</span>],
        <span class="hljs-string">&#x27;react-router-dom&#x27;</span>: [<span class="hljs-string">&#x27;useNavigate&#x27;</span>, <span class="hljs-string">&#x27;useParams&#x27;</span>, <span class="hljs-string">&#x27;Link&#x27;</span>],
        <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>: [<span class="hljs-string">&#x27;useQuery&#x27;</span>, <span class="hljs-string">&#x27;useMutation&#x27;</span>],
      },
      <span class="hljs-attr">dts</span>: <span class="hljs-string">&#x27;src/auto-imports.d.ts&#x27;</span>,
    }),
  ],
});
</code></pre>
<h3 id="تحسين-مكتبة-المكونات">تحسين مكتبة المكوّنات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite-plugin-component-lib.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Plugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentLibConfig</span> {
  <span class="hljs-attr">components</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">transform</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">componentLibrary</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">ComponentLibConfig</span></span>): <span class="hljs-title class_">Plugin</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;component-library&#x27;</span>,

    <span class="hljs-title function_">resolveId</span>(<span class="hljs-params">id</span>) {
      <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;@components/&#x27;</span>)) {
        <span class="hljs-keyword">const</span> componentName = id.<span class="hljs-title function_">slice</span>(<span class="hljs-string">&#x27;@components/&#x27;</span>.<span class="hljs-property">length</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-string">\`virtual:component:<span class="hljs-subst">\${componentName}</span>\`</span>;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    },

    <span class="hljs-title function_">load</span>(<span class="hljs-params">id</span>) {
      <span class="hljs-keyword">if</span> (id.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;virtual:component:&#x27;</span>)) {
        <span class="hljs-keyword">const</span> componentName = id.<span class="hljs-title function_">slice</span>(<span class="hljs-string">&#x27;virtual:component:&#x27;</span>.<span class="hljs-property">length</span>);
        <span class="hljs-keyword">const</span> path = config.<span class="hljs-property">transform</span> ? config.<span class="hljs-title function_">transform</span>(componentName) : componentName;

        <span class="hljs-keyword">return</span> <span class="hljs-string">\`
          export { default } from &#x27;<span class="hljs-subst">\${config.components}</span>/<span class="hljs-subst">\${path}</span>&#x27;;
          export * from &#x27;<span class="hljs-subst">\${config.components}</span>/<span class="hljs-subst">\${path}</span>&#x27;;
        \`</span>;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    },
  };
}
</code></pre>
<h2 id="تحسين-سير-عمل-التطوير">تحسين سير عمل التطوير</h2>
<p>حسّن سير عمل تطويرك مع Vite وTypeScript.</p>
<h3 id="إعداد-تطبيق-متعدد-الصفحات">إعداد تطبيق متعدد الصفحات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts - Multi-page app</span>
<span class="hljs-keyword">import</span> { resolve } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">build</span>: {
    <span class="hljs-attr">rollupOptions</span>: {
      <span class="hljs-attr">input</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;index.html&#x27;</span>),
        <span class="hljs-attr">admin</span>: <span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;admin/index.html&#x27;</span>),
        <span class="hljs-attr">blog</span>: <span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;blog/index.html&#x27;</span>),
      },
    },
  },
});

<span class="hljs-comment">// Type-safe page configuration</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PageConfig</span> {
  <span class="hljs-attr">entry</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">chunks</span>?: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">pages</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">PageConfig</span>&gt; = {
  <span class="hljs-attr">main</span>: {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;src/main.tsx&#x27;</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;index.html&#x27;</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;My App&#x27;</span>,
  },
  <span class="hljs-attr">admin</span>: {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;src/admin/main.tsx&#x27;</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;admin/index.html&#x27;</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Admin Dashboard&#x27;</span>,
    <span class="hljs-attr">chunks</span>: [<span class="hljs-string">&#x27;react&#x27;</span>, <span class="hljs-string">&#x27;ui&#x27;</span>],
  },
};
</code></pre>
<h3 id="أنواع-الاستبدال-الساخن-للوحدات">أنواع الاستبدال الساخن للوحدات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// src/types/hmr.d.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImportMeta</span> {
  <span class="hljs-attr">hot</span>?: {
    <span class="hljs-attr">accept</span>: <span class="hljs-function">(<span class="hljs-params">
      <span class="hljs-attr">deps</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[] | (() =&gt; <span class="hljs-built_in">void</span>),
      <span class="hljs-attr">callback</span>?: (modules: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">void</span>
    </span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">dispose</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">callback</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">decline</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">invalidate</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">on</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">callback</span>: (...args: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>;
  };
}

<span class="hljs-comment">// HMR-aware component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">HMRComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">hot</span>) {
    <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">hot</span>.<span class="hljs-title function_">accept</span>(<span class="hljs-function">(<span class="hljs-params">newModule</span>) =&gt;</span> {
      <span class="hljs-comment">// Handle HMR update</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Component updated:&#x27;</span>, newModule);
    });

    <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">hot</span>.<span class="hljs-title function_">dispose</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Cleanup before HMR update</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Cleaning up...&#x27;</span>);
    });
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>HMR-enabled component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="النشر-إلى-الإنتاج">النشر إلى الإنتاج</h2>
<p>انشر تطبيق Vite المحسّن لديك بثقة.</p>
<h3 id="إعداد-docker">إعداد Docker</h3>
<pre><code class="language-dockerfile"><span class="hljs-comment"># Dockerfile - Multi-stage build for Vite app</span>
<span class="hljs-keyword">FROM</span> node:<span class="hljs-number">18</span>-alpine AS builder

<span class="hljs-keyword">WORKDIR</span><span class="language-bash"> /app</span>

<span class="hljs-comment"># Copy package files</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> package*.json ./</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> tsconfig*.json ./</span>

<span class="hljs-comment"># Install dependencies</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> npm ci</span>

<span class="hljs-comment"># Copy source code</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> . .</span>

<span class="hljs-comment"># Type check</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> npm run type-check</span>

<span class="hljs-comment"># Build app</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> npm run build</span>

<span class="hljs-comment"># Production stage</span>
<span class="hljs-keyword">FROM</span> nginx:alpine

<span class="hljs-comment"># Copy built app</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> --from=builder /app/dist /usr/share/nginx/html</span>

<span class="hljs-comment"># Copy nginx config</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> nginx.conf /etc/nginx/nginx.conf</span>

<span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">80</span>

<span class="hljs-keyword">CMD</span><span class="language-bash"> [<span class="hljs-string">&quot;nginx&quot;</span>, <span class="hljs-string">&quot;-g&quot;</span>, <span class="hljs-string">&quot;daemon off;&quot;</span>]</span>
</code></pre>
<h3 id="تحسين-التكامل-والنشر-المستمر">تحسين التكامل والنشر المستمر</h3>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/deploy.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span> <span class="hljs-string">Vite</span> <span class="hljs-string">App</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">build:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v3</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Setup</span> <span class="hljs-string">Node.js</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;18&#x27;</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;npm&#x27;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Type</span> <span class="hljs-string">check</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">type-check</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Build</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Analyze</span> <span class="hljs-string">bundle</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build:analyze</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">artifacts</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">dist</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">dist/</span>
</code></pre>
<h2 id="المراقبة-والتحليلات">المراقبة والتحليلات</h2>
<p>تتبّع أداء تطبيق Vite الخاص بك في الإنتاج.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// src/utils/analytics.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ViteAnalytics</span> {
  <span class="hljs-title function_">trackBuildInfo</span>(): <span class="hljs-built_in">void</span>;
  <span class="hljs-title function_">trackPerformance</span>(): <span class="hljs-built_in">void</span>;
  <span class="hljs-title function_">trackErrors</span>(): <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ProductionAnalytics</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">ViteAnalytics</span> {
  <span class="hljs-title function_">trackBuildInfo</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// Track build metadata</span>
    <span class="hljs-keyword">const</span> buildInfo = {
      <span class="hljs-attr">version</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_APP_VERSION</span>,
      <span class="hljs-attr">buildTime</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_BUILD_TIME</span>,
      <span class="hljs-attr">mode</span>: <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">MODE</span>,
    };

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Build info:&#x27;</span>, buildInfo);
  }

  <span class="hljs-title function_">trackPerformance</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// Track performance metrics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;measureUserAgentSpecificMemory&#x27;</span> <span class="hljs-keyword">in</span> performance) {
      (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-title function_">measureUserAgentSpecificMemory</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Memory usage:&#x27;</span>, result);
      });
    }
  }

  <span class="hljs-title function_">trackErrors</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Runtime error:&#x27;</span>, {
        <span class="hljs-attr">message</span>: event.<span class="hljs-property">message</span>,
        <span class="hljs-attr">source</span>: event.<span class="hljs-property">filename</span>,
        <span class="hljs-attr">line</span>: event.<span class="hljs-property">lineno</span>,
        <span class="hljs-attr">column</span>: event.<span class="hljs-property">colno</span>,
      });
    });
  }
}

<span class="hljs-comment">// Initialize analytics</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">PROD</span>) {
  <span class="hljs-keyword">const</span> analytics = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ProductionAnalytics</span>();
  analytics.<span class="hljs-title function_">trackBuildInfo</span>();
  analytics.<span class="hljs-title function_">trackPerformance</span>();
  analytics.<span class="hljs-title function_">trackErrors</span>();
}
</code></pre>
<h2 id="خلاصة">خلاصة</h2>
<p>تحسين Vite مع React وTypeScript ليس مجرد جعل البناءات أسرع — إنه خلق تجربة تطوير سلسة إلى حد تنسى فيه أنك تستخدم أداة بناء أصلًا. من فحص الأنواع على التوازي إلى تقسيم الشيفرة الذكي، كل تحسين يتراكم مع غيره ليصنع تجربة تطوير وإنتاج فائقة السرعة.</p>
<p>تذكّر: ابدأ بالأساسيات (ملف tsconfig سليم، واستراتيجية تقسيم جيدة للحزم)، ثم أضف التحسينات المتقدمة حسب الحاجة. Vite سريعة أصلًا وجاهزة للعمل، لكن مع هذه التحسينات المدعومة بـ TypeScript يمكنك جعلها تطير حقًا. ستشكرك سرعة تطويرك، وسيحب مستخدموك أزمنة التحميل السريعة كالبرق.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
