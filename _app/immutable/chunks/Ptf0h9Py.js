const s="kinney",e="enterprise-ui",a="واجهات المؤسسات",n="rsbuild-configuration",t="إعداد Rsbuild",l=[{depth:2,id:"الصورة-الكاملة",text:"الصورة الكاملة"},{depth:2,id:"defineconfig",text:"defineConfig"},{depth:2,id:"serverport",text:"server.port"},{depth:2,id:"مصفوفة-plugins",text:"مصفوفة plugins"},{depth:2,id:"pluginreact",text:"pluginReact"},{depth:2,id:"pluginmodulefederation",text:"pluginModuleFederation"},{depth:3,id:"name",text:"name"},{depth:3,id:"remotes",text:"remotes"},{depth:3,id:"exposes",text:"exposes"},{depth:3,id:"dts",text:"dts"},{depth:3,id:"shared",text:"shared"},{depth:2,id:"htmltemplate",text:"html.template"},{depth:2,id:"ما-ليس-في-الإعداد",text:"ما ليس في الإعداد"},{depth:2,id:"توسيع-الإعداد",text:"توسيع الإعداد"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"rsbuild-لأجل-اتحاد-الوحدات",text:"Rsbuild لأجل اتحاد الوحدات"}],p=`<p>أرسى محاضرة <a href="https://stevekinney.com/courses/enterprise-ui/rspack-webpack-and-vite">Rspack وwebpack وVite</a> أن Rsbuild هو أداة البناء الأعلى مستوى التي تجلس فوق Rspack — مقارنةً بـVite في سهولة الاستخدام، لكنها تعتمد نموذج «المجمّع أولًا» في التطوير والإنتاج معًا. وتستعرض هذه المحاضرة ملفات <code>rsbuild.config.ts</code> الفعلية المستخدمة في <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">تمرين التركيب وقت التشغيل</a>، وتشرح ما يفعله كل جزء من الإعداد، ولماذا هو موجود، وما يحدث عند تغييره.</p>
<p>إذا سبق أن أعددت webpack، فسيبدو Rsbuild مألوفًا لكن أقل إسهابًا بملاحظة واضحة. وإذا سبق أن أعددت Vite، فسيبدو مألوفًا لكن بنموذج إضافات مختلف في الأساس. وفي كلتا الحالتين، سطح الإعداد صغير بما يكفي ليستقر في رأسك، وهذا هو الهدف كله من استخدام أداة أعلى مستوى بدل Rspack الخام.</p>
<h2 id="الصورة-الكاملة">الصورة الكاملة</h2>
<p>هذا هو ملف <code>rsbuild.config.ts</code> الكامل لتطبيق المضيف من التمرين. ويشير كل قسم أدناه إلى هذا الملف.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/core&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginReact } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginModuleFederation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/rsbuild-plugin&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">server</span>: { <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span> },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">pluginReact</span>(),
    <span class="hljs-title function_">pluginModuleFederation</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;host&#x27;</span>,
      <span class="hljs-attr">remotes</span>: {
        <span class="hljs-attr">remoteAnalytics</span>: <span class="hljs-string">&#x27;remoteAnalytics@http://localhost:3001/mf-manifest.json&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-attr">nanostores</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
      },
    }),
  ],
  <span class="hljs-attr">html</span>: { <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;./src/index.html&#x27;</span> },
});
</code></pre>
<p>وهذا ملف الريموت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/core&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginReact } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginModuleFederation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/rsbuild-plugin&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">server</span>: { <span class="hljs-attr">port</span>: <span class="hljs-number">3001</span> },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">pluginReact</span>(),
    <span class="hljs-title function_">pluginModuleFederation</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteAnalytics&#x27;</span>,
      <span class="hljs-attr">dts</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">exposes</span>: {
        <span class="hljs-string">&#x27;./analytics-dashboard&#x27;</span>: <span class="hljs-string">&#x27;./src/analytics-dashboard&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-attr">nanostores</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
        <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
      },
    }),
  ],
  <span class="hljs-attr">html</span>: { <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;./src/index.html&#x27;</span> },
});
</code></pre>
<p>الملفان قصيران. وهذا مقصود — فالإعدادات الافتراضية في Rsbuild تتولى معظم إعداد البناء، وما يتبقى هو ما يخصّ تطبيقك فعلًا.</p>
<h2 id="defineconfig"><code>defineConfig</code></h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/core&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-comment">// ...</span>
});
</code></pre>
<p><code>defineConfig</code> دالة هوية. فهي لا تفعل شيئًا وقت التشغيل — بل توجد فقط لكي يقدّم TypeScript ومحررك الإكمال التلقائي وفحص الأنواع على كائن الإعداد. ويمكنك تصدير كائن عادي وسيعمل الأمر نفسه تمامًا، لكنك ستفقد تلميحات الأنواع، وهي مهمة عندما تحاول تذكّر ما إذا كان الخيار <code>server.port</code> أم <code>devServer.port</code>.</p>
<p>يبحث Rsbuild عن <a href="https://rsbuild.rs/guide/configuration/rsbuild">ملفات الإعداد</a> بترتيب محدد: <code>rsbuild.config.mjs</code>، ثم <code>.ts</code>، ثم <code>.js</code>، ثم <code>.cjs</code> و<code>.mts</code> و<code>.cts</code>. واستخدام <code>.ts</code> هو الخيار المعياري لمشاريع TypeScript، وهو ما يستخدمه التمرين.</p>
<p>ويقبل <code>defineConfig</code> أيضًا دالة بدل كائن. وتتلقى الدالة <code>env</code> (<code>'development'</code> أو <code>'production'</code>) و<code>command</code> (<code>'dev'</code> أو <code>'build'</code> أو <code>'preview'</code>)، ما يتيح لك إرجاع إعداد مختلف بحسب سياق البناء.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>(<span class="hljs-function">(<span class="hljs-params">{ env, command }</span>) =&gt;</span> ({
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">port</span>: command === <span class="hljs-string">&#x27;dev&#x27;</span> ? <span class="hljs-number">3000</span> : <span class="hljs-number">8080</span>,
  },
}));
</code></pre>
<p>لا يحتاج التمرين إلى ذلك — فالإعدادان ساكنان — لكن من المفيد معرفة أن هذا المخرج الطارئ موجود عندما تحتاج سلوكًا خاصًا ببيئة معينة.</p>
<h2 id="serverport"><code>server.port</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">server</span>: { <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span> },
</code></pre>
<p>هذا يضبط المنفذ لخادم التطوير في Rsbuild. والقيمة الافتراضية <code>3000</code>، لذا إعداد المضيف زائد تقنيًا هنا، لكن التصريح به عادة جيدة عندما تشغّل خوادم تطوير متعددة في الوقت نفسه. ويضبط الريموت <code>port: 3001</code> لتفادي التعارض.</p>
<p>إذا كان المنفذ مشغولًا بالفعل، ينتقل Rsbuild بصمت إلى المنفذ المتاح التالي إلا إذا ضبطت <a href="https://rsbuild.rs/config/server/strict-port"><code>server.strictPort</code></a> على <code>true</code>، وهو ما يُطلق خطأً بدل ذلك. وفي تهيئة اتحاد، تكون تغييرات المنافذ الصامتة خطيرة — فإعداد <code>remotes</code> في المضيف يثبّت <code>localhost:3001</code> فيه، لذا إذا بدأ الريموت بهدوء على <code>3002</code>، جلب المضيف ملف تعريف غير موجود وفشلت مصافحة الاتحاد. وستكون المنافذ الصريحة مع <code>strictPort: true</code> الخيار الأكثر حصانة.</p>
<p>ويدعم كتلة <code>server</code> أيضًا <code>host</code> (أي واجهة يُربط بها)، و<code>open</code> (فتح عنوان URL في المتصفح تلقائيًا عند البدء)، وخيارات أخرى تتوقعها من خادم تطوير. ولا يستخدم التمرين إلا <code>port</code>.</p>
<h2 id="مصفوفة-plugins">مصفوفة <code>plugins</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">plugins</span>: [
  <span class="hljs-title function_">pluginReact</span>(),
  <span class="hljs-title function_">pluginModuleFederation</span>({ <span class="hljs-comment">/* ... */</span> }),
],
</code></pre>
<p>نظام <a href="https://rsbuild.rs/config/plugins">الإضافات</a> في Rsbuild هو نموذج التوسعة الأساسي فيه. وتعمل الإضافات بترتيب التصريح عنها، وتعمل إضافات Rsbuild المدمجة دائمًا قبل إضافات المستخدم. وتقبل المصفوفة كائنات <code>RsbuildPlugin</code>، وقيمًا زائفة (تُتجاهل بصمت)، ووعودًا، ومصفوفات متداخلة.</p>
<p>وهذه المعالجة للقيم الزائفة مفيدة للإضافات الشرطية:</p>
<pre><code class="language-typescript"><span class="hljs-attr">plugins</span>: [
  <span class="hljs-title function_">pluginReact</span>(),
  process.<span class="hljs-property">env</span>.<span class="hljs-property">ANALYZE</span> &amp;&amp; <span class="hljs-title function_">pluginBundleAnalyzer</span>(),
],
</code></pre>
<p>هناك تمييز يستحق الاستيعاب: مصفوفة <code>plugins</code> مخصّصة لإضافات <em>Rsbuild</em>. وإذا احتجت إلى استخدام إضافة Rspack أو webpack خام، فمكانها <code>tools.rspack.plugins</code> بدل ذلك. ونموذجا الإضافات ليسا قابلين للتبادل — فإضافات Rsbuild تتعشّق في دورة حياة Rsbuild، بينما تتعشّق إضافات Rspack في المجمّع الأساسي. ولا يستخدم التمرين إلا إضافات Rsbuild.</p>
<h2 id="pluginreact"><code>pluginReact</code></h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { pluginReact } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/plugin-react&#x27;</span>;
</code></pre>
<p><a href="https://rsbuild.rs/plugins/list/plugin-react"><code>pluginReact</code></a> يتولى شؤون البناء الخاصة بـReact التي كانت ستتطلب إعدادًا يدويًا لـRspack: تصريف JSX عبر SWC، وReact Fast Refresh لأجل HMR في التطوير، وتقسيم الشفرة تلقائيًا لحزم React وأدوات التوجيه. وهو مكافئ Rsbuild لـ<code>@vitejs/plugin-react</code> في عالم Vite.</p>
<p>ويستدعي التمرين <code>pluginReact()</code> بلا معاملات، وهو ما يمنحك الإعدادات الافتراضية:</p>
<ul>
<li><strong><code>runtime: 'automatic'</code></strong>: يستخدم تحويل JSX التلقائي في React 17+، فلا تحتاج إلى <code>import React from 'react'</code> في أعلى كل ملف.</li>
<li><strong><code>fastRefresh: true</code></strong>: يفعّل React Fast Refresh في التطوير — فتُحفظ حالة المكوّن عبر التعديلات بدل إعادة تحميل الصفحة كاملة.</li>
<li><strong><code>splitChunks: true</code></strong>: يقسّم حزم React وأدوات التوجيه تلقائيًا إلى أجزاء منفصلة لأجل تخزين مؤقت أفضل.</li>
</ul>
<p>إذا كنت تستخدم مكتبة CSS-in-JS مثل Emotion توفّر وقت تشغيل JSX خاصًا بها، فستمرّر <code>swcReactOptions: { importSource: '@emotion/react' }</code>. وإذا احتجت إلى React Profiler في بناءات الإنتاج، فـ<code>enableProfiler: true</code> يفعّله. لكن لتطبيق React معياري مع اتحاد الوحدات، فإن الإعدادات الافتراضية هي الجواب الصحيح.</p>
<h2 id="pluginmodulefederation"><code>pluginModuleFederation</code></h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { pluginModuleFederation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/rsbuild-plugin&#x27;</span>;
</code></pre>
<p>هذه إضافة Module Federation 2.0 لـRsbuild. وهي حزمة منفصلة عن Rsbuild نفسه، يصونها فريق <a href="https://module-federation.io/guide/build-plugins/plugins-rsbuild">Module Federation</a>. وتغطي <a href="https://stevekinney.com/courses/enterprise-ui/module-federation">محاضرة اتحاد الوحدات</a> نموذج الاتحاد بعمق — أما هذا القسم فيركّز تحديدًا على سطح الإعداد كما يظهر في التمرين.</p>
<blockquote>
<p><strong>الإصدار 1.5 في مقابل الإصدار 2.0</strong></p>
<p>لدى Rsbuild أيضًا مسار مدمج لـModule Federation v1.5 عبر مفتاح الإعداد <code>moduleFederation.options</code>، ولا يتطلب حزمة إضافية. ويستخدم التمرين إضافة v2.0 لأنها توفّر قدرات إضافية — تكامل مع Chrome DevTools، وتلميحات أنواع TypeScript ديناميكية، وإضافات وقت تشغيل، وتحميلًا قائمًا على ملف التعريف. وإذا لم تحتج إلى هذه الإضافات، فالمسار المدمج v1.5 يعمل جيدًا بشكل إعداد مختلف قليلًا.</p>
</blockquote>
<h3 id="name"><code>name</code></h3>
<pre><code class="language-typescript"><span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;host&#x27;</span>,
</code></pre>
<p>اسم الحاوية. وهو مطلوب ويجب أن يكون فريدًا بين كل المشاركين في الاتحاد. وتقول <a href="https://module-federation.io/configure/name">توثيقات MF 2.0</a> إن الاسم يُستخدم لاسترجاع البيانات وقت التشغيل ولمراجع تخزين الأجزاء العام — لذا إذا تشاركت حاويتان اسمًا واحدًا، تصطدمتا بطرق تنتج أخطاء مربكة جدًا.</p>
<p>يستخدم المضيف <code>'host'</code> ويستخدم الريموت <code>'remoteAnalytics'</code>. والأسماء سلاسل نصية لا رموز، وتعيش في فضاء أسماء عام مسطّح. وفي نظام فيه ريموتات كثيرة، تصبح اصطلاحية التسمية مهمة — واسم الفريق أو النطاق أو نطاق الحزمة كلها تصلح كبادئات.</p>
<h3 id="remotes"><code>remotes</code></h3>
<pre><code class="language-typescript"><span class="hljs-attr">remotes</span>: {
  <span class="hljs-attr">remoteAnalytics</span>:
    <span class="hljs-string">&#x27;remoteAnalytics@http://localhost:3001/mf-manifest.json&#x27;</span>,
},
</code></pre>
<p>هذا إعداد على جانب المستهلك. والمفتاح (<code>remoteAnalytics</code>) هو الاسم المستعار الذي تستورد منه شفرة تطبيقك — <code>import('remoteAnalytics/analytics-dashboard')</code> في مصدر المضيف. والقيمة سلسلة نصية بصيغة <code>containerName@entryUrl</code>.</p>
<p>يمكن أن يشير عنوان URL للمدخل إلى ملف <code>remoteEntry.js</code> أو ملف <code>mf-manifest.json</code>. ويستخدم التمرين ملف التعريف لأنه يفتح ميزات MF 2.0: تلميحات الأنواع الديناميكية، والتحميل المسبق للموارد، ودعم Chrome DevTools. وتشرح <a href="https://module-federation.io/configure/remotes">توثيقات إعداد remotes</a> المقايضات بين الصيغتين.</p>
<p>لا يلزم أن يطابق الاسم المستعار <code>name</code> الخاص بالريموت. فيمكنك كتابة <code>remotes: { analytics: 'remoteAnalytics@...' }</code> والاستيراد من <code>analytics/analytics-dashboard</code> بدل ذلك. وعمليًا، إبقاء الاسم المستعار واسم الحاوية متوافقين يقلّل الالتباس، لكن لا يوجد شرط تقني.</p>
<h3 id="exposes"><code>exposes</code></h3>
<pre><code class="language-typescript"><span class="hljs-attr">exposes</span>: {
  <span class="hljs-string">&#x27;./analytics-dashboard&#x27;</span>: <span class="hljs-string">&#x27;./src/analytics-dashboard&#x27;</span>,
},
</code></pre>
<p>هذا إعداد على جانب المنتج. وهو يعلن الوحدات التي يتيحها الريموت للمستهلكين. ولا يمكن استيراد إلا المسارات المذكورة هنا — وكل ما عداها في مصدر الريموت يبقى خاصًا.</p>
<p>ويصبح المفتاح (<code>'./analytics-dashboard'</code>) المسار الفرعي الذي يستخدمه المستهلكون في الاستيراد. وبادئة <code>./</code> مطلوبة — وتُصرّح <a href="https://module-federation.io/configure/exposes">توثيقات exposes</a> بأن الأسماء المجرّدة بلا <code>./</code> غير مدعومة، وأن <code>.</code> وحدها تعني التصدير الافتراضي للحاوية. والقيمة على اليمين هي المسار إلى ملف المصدر الفعلي.</p>
<p>تُقسَّم الوحدات المكشوفة إلى أجزاء خاصة بها أثناء البناء. وهذا تلقائي — فلست بحاجة إلى إعداد تقسيم الأجزاء لها. أما بقية شفرة الريموت غير المكشوفة فتبقى في حزمة الريموت نفسها ولا يمكن للمضيف جلبها أبدًا.</p>
<h3 id="dts"><code>dts</code></h3>
<pre><code class="language-typescript"><span class="hljs-attr">dts</span>: <span class="hljs-literal">false</span>,
</code></pre>
<p>يضبط الريموت <code>dts: false</code> لتعطيل توليد أنواع TypeScript التلقائي. وفي MF 2.0 تكون قيمة <code>dts</code> افتراضيًا <code>true</code>، ما يعني أن المنتج يولّد ملف <code>@mf-types.zip</code> مضغوطًا أثناء البناء، ويُنزّل المستهلكون أنواع الريموت ويستخرجونها تلقائيًا إلى مجلد <code>@mf-types</code>. وهذه تجربة مطوّر جيدة فعلًا — إذ تحصل على الإكمال التلقائي وفحص الأنواع لوحدات الريموت دون صيانة ملفات تعريف محيطة.</p>
<p>ويعطّله التمرين لإبقاء التهيئة بسيطة وتفادي خطوة تنزيل الأنواع أثناء التطوير. وفي نظام إنتاجي، ستريد على الأغلب <code>dts: true</code> (أو على الأقل لا <code>false</code> صراحةً) حتى يحصل المستهلكون على أمان أنواع وقت البناء لواجهات الوحدات المكشوفة.</p>
<h3 id="shared"><code>shared</code></h3>
<pre><code class="language-typescript"><span class="hljs-attr">shared</span>: {
  <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-attr">nanostores</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
},
</code></pre>
<p>الاعتمادات المشتركة هي الجزء الأهم تشغيليًا في إعداد الاتحاد. فهي تتحكم في الحزم التي تُوحَّد وقت التشغيل بدل تجميعها منفصلةً في كل مشارك. ويغطي <a href="https://stevekinney.com/courses/enterprise-ui/module-federation#shared-dependencies-properly-understood">قسم الاعتمادات المشتركة في محاضرة اتحاد الوحدات</a> النموذج كاملًا — وهذا شرح لكيفية عمل الخيارات المحددة في التمرين.</p>
<p>تظهر كتلة <code>shared</code> في إعداد المضيف <em>والريموت</em> معًا. ويجب أن يعلن الجانبان الحزم نفسها بخيارات متوافقة، وإلا فلن تنتج مفاوضات وقت التشغيل النتيجة التي تتوقعها.</p>
<h4><code>singleton</code></h4>
<pre><code class="language-typescript"><span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> },
</code></pre>
<p><strong><code>singleton: true</code></strong> يخبر وقت تشغيل اتحاد الوحدات بأن نسخة واحدة بالضبط من هذه الحزمة ينبغي أن توجد وقت التشغيل، بصرف النظر عن عدد المشاركين الذين يعلنونها. ويختار وقت التشغيل أعلى إصدار semver متوافق من كل المشاركين ويستخدم تلك النسخة الواحدة في كل مكان.</p>
<p>بالنسبة إلى React وReact DOM، فإن singleton غير قابل للتفاوض. فخُطّافات React والسياق والمطابقة (reconciliation) كلها تعتمد على نسخة وحدة واحدة. ووجود نسختين من React في الصفحة نفسها يعني سِجلي خُطّافات منفصلين، ما يعني أن الخُطّافات المُستدعاة في سياق إحدى النسختين لا تراها الأخرى — ورسائل الأخطاء ليست مفيدة.</p>
<p>كما يضع التمرين <code>nanostores</code> و<code>@nanostores/react</code> و<code>@pulse/shared</code> كأفراد مفردة. وذلك لأن <a href="https://stevekinney.com/courses/enterprise-ui/nanostores#nanostores-in-a-federation-context">نمط الحالة عبر الحدود في nanostores</a> بأكمله يعتمد على امتلاك المضيف والريموت مرجعًا إلى <em>الذرّة</em> (atom) نفسها. وإن لم يكن <code>@pulse/shared</code> فردًا مفردًا، فسيُنشئ كل جانب ذرّته الخاصة، وتصبح الكتابات من المضيف غير مرئية للريموت. ويجب أن تكون مكتبة <code>nanostores</code> نفسها فردًا مفردًا أيضًا حتى تُشارَك آلية الاشتراك. والثلاثة تشكّل سلسلة — فإن انقطع أي رابط توقفت الحالة عن التدفق.</p>
<h4><code>eager</code></h4>
<pre><code class="language-typescript"><span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
</code></pre>
<p><strong><code>eager: true</code></strong> يضمّ الاعتماد المشترك مباشرةً إلى مخرَج المشارك بدل تحميله بصورة غير متزامنة في مرحلة مفاوضات الاتحاد.</p>
<p>بلا <code>eager</code>، يتوقع الريموت أن يوفّر المضيف وحدات مشتركة مثل React وقت التشغيل. وهذا يعمل عندما يُحمَّل الريموت داخل المضيف، لكنه يعني أن الريموت لا يستطيع الإقلاع بمفرده — فليس لديه مصدر يجلب منه React. ويضبط التمرين <code>eager: true</code> على كل الاعتمادات المشتركة حتى يعمل المضيف والريموت باستقلال. ولا يزال وقت تشغيل اتحاد الوحدات يوحّد النسخ وقت التشغيل عند وجود الجانبين، فلن ينتهي بك الأمر بنسختين من React في الإنتاج. و<code>eager</code> يضمن فقط أن وضع الاستقلال يعمل.</p>
<p>والمقايضة هي حجم الحزمة. فالمشاركة المتلهفة تسحب الاعتماد إلى الجزء الأولي، ما يضخّم حزمة المدخل. وهذا مقبول لبضع حزم مشتركة. أما مع العشرات، فيبدأ الأمر بالتراكم. و<a href="https://module-federation.io/configure/shared">توثيقات MF 2.0</a> تحذّر من ذلك صراحةً — استخدم <code>eager</code> عندما تريد عمدًا توفرًا متزامنًا، لا كافتراضي لكل شيء.</p>
<h4><code>requiredVersion</code> و<code>strictVersion</code></h4>
<p>لا تظهر هذه في إعداد التمرين المُودَع، لكن التمرين يطلب منك تجربتها:</p>
<pre><code class="language-typescript"><span class="hljs-attr">react</span>: {
  <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
  <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">true</span>,
},
</code></pre>
<p><strong><code>requiredVersion</code></strong> يعلن نطاق semver الذي يحتاجه هذا المشارك. وقيمته الافتراضية الإصدار الموجود في <code>package.json</code> الخاص بالمشارك. ويستخدمه وقت التشغيل أثناء المفاوضات ليقرر ما إذا كان الإصدار المقدَّم مقبولًا.</p>
<p><strong><code>strictVersion: true</code></strong> يحوّل عدم تطابق الإصدار من تحذير إلى خطأ صارم. وبدونه، يستخدم وقت التشغيل أعلى إصدار متاح حتى لو لم يحقق <code>requiredVersion</code> — وقد يحصل الريموت صامتًا على React 19 بينما كان يتوقع React 18. ومع <code>strictVersion</code>، يُطلق عدم التطابق خطأً قبل تصيير أي واجهة، وهذا على الأقل صريح بشأن المشكلة.</p>
<p>ويطلب التمرين منك ضبط <code>requiredVersion: '^19.0.0'</code> مع <code>strictVersion: true</code> في مشروع يستخدم React 18، تحديدًا لترى الخطأ. وهذا نوع الحواجز الذي ستستخدمه في الإنتاج لالتقاط انحراف الإصدارات بين ريموتات منشورة باستقلال.</p>
<h2 id="htmltemplate"><code>html.template</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">html</span>: { <span class="hljs-attr">template</span>: <span class="hljs-string">&#x27;./src/index.html&#x27;</span> },
</code></pre>
<p>هذا يوجّه Rsbuild إلى ملف قالب HTML مخصّص بدل استخدام <a href="https://rsbuild.rs/config/html/template">الافتراضي المدمج</a>. والقالب الافتراضي في Rsbuild ملف HTML صغير فيه نقطة تركيب <code>&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code>. ويستخدم التمرين قالبًا مخصّصًا لأن المضيف والريموت يحتاجان بنيتين مختلفتين لـHTML — فالمضيف لديه هيكل الصفحة الكامل، وللريموت غلاف مستقل أبسط.</p>
<p>والمسار نسبي إلى جذر المشروع (حيث يعيش <code>rsbuild.config.ts</code>). ويمكن أيضًا أن يكون مسارًا مطلقًا، أو دالة تُرجع قوالب مختلفة لكل نقطة دخول في التطبيقات متعددة الصفحات.</p>
<h2 id="ما-ليس-في-الإعداد">ما ليس في الإعداد</h2>
<p>يتولى Rsbuild كثيرًا من الإعداد عبر افتراضيات لا يحتاج التمرين إلى تجاوزها. ومنها بضعة يستحق أن تعرفها:</p>
<ul>
<li><strong><code>output.distPath</code></strong>: مكان مخرجات البناء. والقيمة الافتراضية <code>dist</code>. ويستخدم التمرين الافتراضي.</li>
<li><strong><code>source.entry</code></strong>: نقطة دخول التطبيق. والقيمة الافتراضية <code>src/index.(ts|js|tsx|jsx|mjs|mts)</code>. ويستخدم التمرين <code>src/index.tsx</code>، وهو مطابق للنمط الافتراضي.</li>
<li><strong><code>dev.assetPrefix</code></strong>: عند إعداد اتحاد الوحدات، يضبطه Rsbuild تلقائيًا على <code>true</code> بحيث تكون عناوين URL للموارد مطلقة لا نسبية. وهذا مهم لأن موارد الريموت يجب أن تكون قابلة للجلب من نطاق المضيف، والمسارات النسبية كانت ستُحلّ مقابل الأصل الخطأ.</li>
<li><strong><code>output.uniqueName</code></strong>: يضبطه Rsbuild تلقائيًا على <code>name</code> الخاص بالاتحاد عند إعداد اتحاد الوحدات. وهذا يمنع تصادم تسمية الأجزاء بين المشاركين. وقد كان على مستخدمي webpack ضبطه يدويًا — أما Rsbuild فيتولاه.</li>
<li><strong>تقسيم الأجزاء</strong>: تُعطَّل استراتيجية <code>split-by-experience</code> الافتراضية في Rsbuild تلقائيًا عند تفعيل اتحاد الوحدات، لأن للاتحاد سلوكه الخاص في تقسيم الأجزاء للوحدات المكشوفة والاعتمادات المشتركة.</li>
</ul>
<p>هذه التعديلات التلقائية أحد أسباب استخدام إضافة اتحاد الوحدات في Rsbuild بدل إعداد Rspack الخام. فالإضافة تعرف أي افتراضيات Rsbuild يجب أن تتغير ليعمل الاتحاد، وتغيّرها نيابةً عنك.</p>
<h2 id="توسيع-الإعداد">توسيع الإعداد</h2>
<p>إعدادات التمرين دنيا لأنها تعلّم نموذج الاتحاد، لا مجموعة ميزات Rsbuild كاملة. وفي تهيئة إنتاجية، ستضيف على الأرجح بعضًا مما يلي:</p>
<p><strong>متغيرات البيئة</strong> عبر <code>source.define</code> أو ملفات <code>.env</code>. يدعم Rsbuild ملفات <code>.env</code> و<code>.env.local</code> و<code>.env.development</code> و<code>.env.production</code> جاهزةً، والمتغيرات ذات البادئة <code>PUBLIC_</code> متاحة في شفرة العميل.</p>
<p><strong>إعداد الوسيط (proxy)</strong> عبر <code>server.proxy</code> لطلبات API أثناء التطوير. وهو المفهوم نفسه في <code>server.proxy</code> لدى Vite أو <code>proxy</code> في webpack-dev-server — إذ يمرّر الطلبات المطابقة إلى خادم خلفي فلا تحتاج إلى ترويسات CORS في التطوير.</p>
<p><strong>أسماء مسارات TypeScript المستعارة</strong> عبر <code>source.alias</code>. وإذا كان مشروعك يستخدم <code>paths</code> في <code>tsconfig.json</code>، فستكرّرها هنا حتى يحلّها المجمّع بشكل صحيح.</p>
<p><strong>إعداد CSS</strong> عبر <code>tools.lightningcss</code> أو <code>tools.postcss</code>. ويستخدم Rsbuild معالجة CSS بـLightning CSS افتراضيًا، وهي تحل محل <code>postcss-loader</code> مع <code>autoprefixer</code> في معظم حالات الاستخدام.</p>
<p><strong>ميزانيات الأداء</strong> عبر تلميحات الأداء في Rspack داخل <code>tools.rspack</code>. وتغطي <a href="https://stevekinney.com/courses/enterprise-ui/performance-budgets">محاضرة ميزانيات الأداء</a> ذلك في سياق webpack — ويدعم Rspack الخيارات نفسها <code>performance.hints</code> و<code>maxAssetSize</code> و<code>maxEntrypointSize</code>.</p>
<p>لكن لا شيء من ذلك ضروري لفهم إعداد الاتحاد، وهو مقصد التمرين. ابدأ بأدنى إعداد يعمل، ولا تُضف تعقيدًا إلا عندما يكون لديك سبب.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="rsbuild-لأجل-اتحاد-الوحدات">Rsbuild لأجل اتحاد الوحدات</h3>
<blockquote>
<p>البديل الحديث لـwebpack في التطبيقات الاتحادية.</p>
</blockquote>
<ul>
<li>مبني على <strong>Rspack</strong> (بديل webpack قائم على Rust) — بناءات أسرع بـ5 إلى 10 أضعاف.</li>
<li>إضافة اتحاد وحدات من الدرجة الأولى.</li>
<li>متوافق مع بروتوكول الاتحاد في webpack — ويمكنه التبادل التشغيلي مع مضيفات/ريموتات webpack.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/core&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginReact } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@rsbuild/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> { pluginModuleFederation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/rsbuild-plugin&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">pluginReact</span>(),
    <span class="hljs-title function_">pluginModuleFederation</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;checkout&#x27;</span>,
      <span class="hljs-attr">exposes</span>: { <span class="hljs-string">&#x27;./Cart&#x27;</span>: <span class="hljs-string">&#x27;./src/Cart.tsx&#x27;</span> },
      <span class="hljs-attr">shared</span>: { <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> } },
    }),
  ],
});
</code></pre>
`,c={book:s,chapter:e,chapterTitle:a,slug:n,title:t,headings:l,html:p};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,p as html,n as slug,t as title};
