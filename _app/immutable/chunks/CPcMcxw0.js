const s="kinney",a="react-performance",n="أداء React",p="swc-speedy-web-compiler",t="مُجمِّع الويب السريع (SWC) لتطبيقات React",l=[{depth:2,id:"ما-هو-swc-أصلا",text:"ما هو SWC أصلًا؟"},{depth:2,id:"إعداد-swc-مع-react",text:"إعداد SWC مع React"},{depth:3,id:"تثبيت-swc",text:"تثبيت SWC"},{depth:3,id:"إعداد-swc-الأساسي",text:"إعداد SWC الأساسي"},{depth:3,id:"التكامل-مع-webpack",text:"التكامل مع Webpack"},{depth:2,id:"إعداد-swc-الخاص-بـ-react",text:"إعداد SWC الخاص بـ React"},{depth:3,id:"خيارات-تحويل-jsx",text:"خيارات تحويل JSX"},{depth:3,id:"إعدادات-خاصة-بكل-بيئة",text:"إعدادات خاصة بكل بيئة"},{depth:2,id:"swc-مقابل-babel-مقارنة-الأداء",text:"SWC مقابل Babel: مقارنة الأداء"},{depth:2,id:"ميزات-swc-المتقدمة-لـ-react",text:"ميزات SWC المتقدمة لـ React"},{depth:3,id:"تحويلات-استيراد-مخصصة",text:"تحويلات استيراد مخصصة"},{depth:3,id:"توليد-خرائط-المصدر",text:"توليد خرائط المصدر"},{depth:3,id:"التصغير-باستخدام-swc",text:"التصغير باستخدام SWC"},{depth:2,id:"أمثلة-تكامل-واقعية",text:"أمثلة تكامل واقعية"},{depth:3,id:"nextjs-مع-swc",text:"Next.js مع SWC"},{depth:3,id:"vite-مع-swc",text:"Vite مع SWC"},{depth:3,id:"إعداد-webpack-swc-مخصص",text:"إعداد Webpack + SWC مخصص"},{depth:2,id:"المزالق-والمقايضات-الشائعة",text:"المزالق والمقايضات الشائعة"},{depth:3,id:"فحص-أنواع-typescript",text:"فحص أنواع TypeScript"},{depth:3,id:"منظومة-الإضافات",text:"منظومة الإضافات"},{depth:3,id:"تحليل-الحزم",text:"تحليل الحزم"},{depth:3,id:"استخدام-الذاكرة",text:"استخدام الذاكرة"},{depth:2,id:"استراتيجية-الانتقال",text:"استراتيجية الانتقال"},{depth:3,id:"الانتقال-التدريجي-من-babel",text:"الانتقال التدريجي من Babel"},{depth:3,id:"اختبار-انتقالك",text:"اختبار انتقالك"},{depth:2,id:"متى-لا-تستخدم-swc",text:"متى لا تستخدم SWC"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],c=`<p>إن كانت أوقات بناء React لديك تبدو عالقة في الدبس، فقد حان الوقت للتعرف على SWC — مُجمِّع JavaScript المدفوع بـ Rust الذي يجعل Babel يبدو كأنه يعمل على حبة بطاطس. يحوّل SWC (Speedy Web Compiler) شيفرة JavaScript لديك ويحزمها بسرعة تصل إلى 20 ضعفًا مقارنة بالأدوات التقليدية، دون التضحية بالتحويلات التي يحتاجها تطبيق React الحديث. وسواء كنت تصارع بطء بدء خادم التطوير أو عمليات بناء الإنتاج التي تستغرق وقتًا طويلًا، يستطيع SWC إعادتك إلى إصدار الميزات بدلًا من الانتظار.</p>
<h2 id="ما-هو-swc-أصلا">ما هو SWC أصلًا؟</h2>
<p>SWC مُجمِّع JavaScript/TypeScript من الجيل التالي مكتوب بـ Rust. اعتبره الشقيق الأصغر المليء بالكافيين لـ Babel — فهو يقوم بالتحويلات نفسها (JSX ← JavaScript، وES6+ الحديثة ← شيفرة متوافقة مع المتصفح، وTypeScript ← JavaScript) لكن بميزة السرعة الآتية من تنفيذه بلغة برمجة أنظمة.</p>
<p>وعلى خلاف Babel، المكتوب بـ JavaScript والذي يعالج شيفرتك بأسلوب أحادي الخيط، يستفيد SWC من خصائص أداء Rust ويستطيع استخدام نوى معالجة متعددة. والنتيجة؟ تجميع ليس أسرع فحسب، بل أسرع جذريًا — غالبًا تحسينات سرعة بمقدار 10-20 ضعفًا لقواعد شيفرة كبيرة.</p>
<p>يبرع SWC في:</p>
<ol>
<li><strong>تحويل JSX</strong>: تحويل صياغة JSX في React إلى استدعاءات دوال JavaScript عادية</li>
<li><strong>تجميع TypeScript</strong>: إزالة الأنواع وترجمة TS إلى JS دون عبء <code>tsc</code></li>
<li><strong>JavaScript الحديثة</strong>: تحويل ميزات ES6+ لتوافق المتصفحات الأقدم</li>
<li><strong>التصغير</strong>: ضغط شيفرة يضاهي Terser أو يتفوق عليه في السرعة وحجم المخرجات</li>
<li><strong>خرائط المصدر</strong>: توليد سريع ودقيق لخرائط المصدر من أجل التنقيح</li>
</ol>
<h2 id="إعداد-swc-مع-react">إعداد SWC مع React</h2>
<p>لنبدأ بالسيناريو الأكثر شيوعًا: دمج SWC في مشروع React قائم. إن كنت تستخدم أداة مثل Vite، فربما تستخدم SWC بالفعل تحت الغطاء دون أن تدري (فـ Vite يستخدم SWC لتجميع الاعتماديات مسبقًا). لكن لنرَ كيف نضبطه صراحةً.</p>
<h3 id="تثبيت-swc">تثبيت SWC</h3>
<p>أولًا، لنثبّت حزم SWC اللازمة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Core SWC packages</span>
npm install -D @swc/core @swc/cli

<span class="hljs-comment"># If you&#x27;re using webpack</span>
npm install -D swc-loader

<span class="hljs-comment"># If you&#x27;re using TypeScript</span>
npm install -D @swc/plugin-transform-imports
</code></pre>
<h3 id="إعداد-swc-الأساسي">إعداد SWC الأساسي</h3>
<p>يستخدم SWC ملف إعداد <code>.swcrc</code> (شبيه بـ <code>.babelrc</code> في Babel). إليك إعدادًا أساسيًا لمشروع React بـ TypeScript:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;syntax&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;typescript&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;tsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;decorators&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dynamicImport&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;automatic&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;development&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;refresh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;loose&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;externalHelpers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;keepClassNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;preserveAllComments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strictMode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lazy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;minify&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لنفكّك الأجزاء الرئيسية:</p>
<ul>
<li><code>jsc.parser.syntax</code>: يخبر SWC أننا نعالج ملفات TypeScript</li>
<li><code>jsc.parser.tsx</code>: يفعّل تحليل JSX</li>
<li><code>jsc.transform.react.runtime</code>: يستخدم تحويل JSX التلقائي في React 17+</li>
<li><code>jsc.transform.react.refresh</code>: يفعّل التحديث السريع في React أثناء التطوير</li>
<li><code>jsc.target</code>: إصدار JavaScript الذي نجمّع إليه</li>
</ul>
<h3 id="التكامل-مع-webpack">التكامل مع Webpack</h3>
<p>إن كنت تستخدم webpack (شائع في مشاريع Create React App بعد إخراج الإعدادات أو في الإعدادات المخصصة)، فيمكنك استبدال <code>babel-loader</code> بـ <code>swc-loader</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(js|jsx|ts|tsx)$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: {
          <span class="hljs-comment">// Replace babel-loader with swc-loader</span>
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;swc-loader&#x27;</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-comment">// SWC options here, or use .swcrc</span>
            <span class="hljs-attr">jsc</span>: {
              <span class="hljs-attr">parser</span>: {
                <span class="hljs-attr">syntax</span>: <span class="hljs-string">&#x27;typescript&#x27;</span>,
                <span class="hljs-attr">tsx</span>: <span class="hljs-literal">true</span>,
              },
              <span class="hljs-attr">transform</span>: {
                <span class="hljs-attr">react</span>: {
                  <span class="hljs-attr">runtime</span>: <span class="hljs-string">&#x27;automatic&#x27;</span>,
                },
              },
              <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;es2022&#x27;</span>,
            },
            <span class="hljs-attr">module</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;es6&#x27;</span>,
            },
          },
        },
      },
    ],
  },
};
</code></pre>
<h2 id="إعداد-swc-الخاص-بـ-react">إعداد SWC الخاص بـ React</h2>
<h3 id="خيارات-تحويل-jsx">خيارات تحويل JSX</h3>
<p>يمنحك SWC تحكمًا دقيقًا في تحويل JSX. إليك الخيارات الرئيسية لـ React:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;automatic&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;importSource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@emotion/react&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;pragma&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React.createElement&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;pragmaFrag&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React.Fragment&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;throwIfNamespace&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;development&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;useBuiltins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;refresh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>شرح الإعدادات الرئيسية:</strong></p>
<ul>
<li><code>runtime: &quot;automatic&quot;</code>: يستخدم تحويل JSX الجديد في React 17+ (لا حاجة لاستيراد React)</li>
<li><code>runtime: &quot;classic&quot;</code>: يستخدم التحويل القديم (يتطلب استيراد React)</li>
<li><code>importSource</code>: مصدر pragma JSX مخصص (مفيد لمكتبات مثل Emotion)</li>
<li><code>development</code>: يفعّل تحسينات وقت التطوير وتنقيحًا أفضل</li>
<li><code>refresh</code>: يفعّل التحديث السريع في React لاستبدال الوحدات الساخن</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم إعدادات مختلفة للتطوير والإنتاج بإنشاء ملفات إعداد منفصلة والتبديل بينها حسب <code>NODE_ENV</code>.</p>
</blockquote>
<h3 id="إعدادات-خاصة-بكل-بيئة">إعدادات خاصة بكل بيئة</h3>
<p>يمكنك إنشاء إعدادات SWC منفصلة لبيئات مختلفة:</p>
<pre><code class="language-json"><span class="hljs-comment">// .swcrc.development</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;automatic&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;development&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;refresh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2022&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;inline&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// .swcrc.production</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;automatic&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;development&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;refresh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es2015&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;minify&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم بدّل بينها في سكربتات البناء لديك:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SWCRC=.swcrc.development webpack serve&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SWCRC=.swcrc.production webpack build&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="swc-مقابل-babel-مقارنة-الأداء">SWC مقابل Babel: مقارنة الأداء</h2>
<p>لنلقِ نظرة على بعض الأرقام الواقعية™. في مشروع React متوسط الحجم بـ TypeScript (نحو 500 مكوّن، ونحو 50 ألف سطر شيفرة)، إليك ما قد تتوقعه:</p>
<table>
<thead>
<tr>
<th>المهمة</th>
<th>Babel</th>
<th>SWC</th>
<th>تحسين السرعة</th>
</tr>
</thead>
<tbody>
<tr>
<td>التجميع الأولي</td>
<td>45s</td>
<td>3.2s</td>
<td>أسرع بنحو 14 ضعفًا</td>
</tr>
<tr>
<td>إعادة التحميل الساخن (ملف واحد)</td>
<td>800ms</td>
<td>45ms</td>
<td>أسرع بنحو 18 ضعفًا</td>
</tr>
<tr>
<td>بناء الإنتاج</td>
<td>2m 15s</td>
<td>8.5s</td>
<td>أسرع بنحو 16 ضعفًا</td>
</tr>
<tr>
<td>فحص أنواع TypeScript*</td>
<td>لا ينطبق</td>
<td>12s</td>
<td>لا ينطبق</td>
</tr>
</tbody>
</table>
<p>*يستطيع SWC إزالة أنواع TypeScript لكنه لا يفحص الأنواع. ستظل بحاجة إلى <code>tsc --noEmit</code> لذلك.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>ستختلف النتائج لديك حسب حجم المشروع وتعقيده والعتاد. تميل المشاريع الأكبر إلى تحسينات أكثر جذرية.</p>
</blockquote>
<h2 id="ميزات-swc-المتقدمة-لـ-react">ميزات SWC المتقدمة لـ React</h2>
<h3 id="تحويلات-استيراد-مخصصة">تحويلات استيراد مخصصة</h3>
<p>من الميزات القاتلة قدرة SWC على تحويل الاستيرادات، على غرار <code>babel-plugin-import</code>. هذا مفيد خاصةً لهزّ الأشجار (tree-shaking) لمكتبات واجهة كبيرة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;experimental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;plugins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">[</span>
          <span class="hljs-string">&quot;@swc/plugin-transform-imports&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;lodash&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lodash/{{member}}&quot;</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;preventFullImport&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
            <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;@mui/material&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;transform&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@mui/material/{{member}}&quot;</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;preventFullImport&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يحوّل هذا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This imports the entire library</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span>, <span class="hljs-title class_">TextField</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@mui/material&#x27;</span>;

<span class="hljs-comment">// ✅ SWC transforms it to this</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Button</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@mui/material/Button&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">TextField</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@mui/material/TextField&#x27;</span>;
</code></pre>
<h3 id="توليد-خرائط-المصدر">توليد خرائط المصدر</h3>
<p>يولّد SWC خرائط مصدر سريعة ودقيقة معًا. للتطوير، قد ترغب في خرائط مصدر مضمّنة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;inline&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;inlineSourcesContent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أما للإنتاج، فخرائط المصدر الخارجية أفضل عادةً:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;sourceMaps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sourceFileName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sourceRoot&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/src&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="التصغير-باستخدام-swc">التصغير باستخدام SWC</h3>
<p>يتضمن SWC مُصغّرًا مدمجًا أسرع من Terser وينتج مخرجات مضغوطة بالمثل:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;minify&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;minify&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;compress&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;unused&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dead_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;drop_console&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;drop_debugger&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;pure_funcs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;console.log&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;console.info&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;mangle&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;keepClassName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;keepFnName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;keepPrivateProps&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;reserved&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="أمثلة-تكامل-واقعية">أمثلة تكامل واقعية</h2>
<h3 id="nextjs-مع-swc">Next.js مع SWC</h3>
<p>يستخدم Next.js 12+ SWC افتراضيًا، لكن يمكنك تخصيصه:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// next.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">experimental</span>: {
    <span class="hljs-attr">swcMinify</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Use SWC for minification</span>
  },
  <span class="hljs-attr">swcMinify</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">compiler</span>: {
    <span class="hljs-comment">// React strict mode</span>
    <span class="hljs-attr">reactStrictMode</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-comment">// Remove console.log in production</span>
    <span class="hljs-attr">removeConsole</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span>,

    <span class="hljs-comment">// Custom JSX import source</span>
    <span class="hljs-attr">emotion</span>: {
      <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoLabel</span>: <span class="hljs-string">&#x27;dev-only&#x27;</span>,
      <span class="hljs-attr">labelFormat</span>: <span class="hljs-string">&#x27;[local]&#x27;</span>,
      <span class="hljs-attr">cssPropOptimization</span>: <span class="hljs-literal">true</span>,
    },
  },
};
</code></pre>
<h3 id="vite-مع-swc">Vite مع SWC</h3>
<p>يستطيع Vite استخدام SWC بدلًا من esbuild للتحويلات:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vite.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react-swc&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],
  <span class="hljs-attr">esbuild</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// Disable esbuild to use SWC</span>
});
</code></pre>
<h3 id="إعداد-webpack-swc-مخصص">إعداد Webpack + SWC مخصص</h3>
<p>لإعداد webpack من الصفر محسّن لـ React:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;path&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = <span class="hljs-function">(<span class="hljs-params">env, argv</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> isProduction = argv.<span class="hljs-property">mode</span> === <span class="hljs-string">&#x27;production&#x27;</span>;

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;./src/index.tsx&#x27;</span>,
    <span class="hljs-attr">output</span>: {
      <span class="hljs-attr">path</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;dist&#x27;</span>),
      <span class="hljs-attr">filename</span>: isProduction ? <span class="hljs-string">&#x27;[name].[contenthash].js&#x27;</span> : <span class="hljs-string">&#x27;[name].js&#x27;</span>,
    },
    <span class="hljs-attr">module</span>: {
      <span class="hljs-attr">rules</span>: [
        {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(ts|tsx|js|jsx)$/</span>,
          <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
          <span class="hljs-attr">use</span>: {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;swc-loader&#x27;</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">jsc</span>: {
                <span class="hljs-attr">parser</span>: {
                  <span class="hljs-attr">syntax</span>: <span class="hljs-string">&#x27;typescript&#x27;</span>,
                  <span class="hljs-attr">tsx</span>: <span class="hljs-literal">true</span>,
                },
                <span class="hljs-attr">transform</span>: {
                  <span class="hljs-attr">react</span>: {
                    <span class="hljs-attr">runtime</span>: <span class="hljs-string">&#x27;automatic&#x27;</span>,
                    <span class="hljs-attr">development</span>: !isProduction,
                    <span class="hljs-attr">refresh</span>: !isProduction,
                  },
                },
                <span class="hljs-attr">target</span>: isProduction ? <span class="hljs-string">&#x27;es2015&#x27;</span> : <span class="hljs-string">&#x27;es2022&#x27;</span>,
              },
              <span class="hljs-attr">module</span>: {
                <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;es6&#x27;</span>,
              },
              <span class="hljs-attr">minify</span>: isProduction,
              <span class="hljs-attr">sourceMaps</span>: <span class="hljs-literal">true</span>,
            },
          },
        },
      ],
    },
    <span class="hljs-attr">resolve</span>: {
      <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&#x27;.ts&#x27;</span>, <span class="hljs-string">&#x27;.tsx&#x27;</span>, <span class="hljs-string">&#x27;.js&#x27;</span>, <span class="hljs-string">&#x27;.jsx&#x27;</span>],
    },
  };
};
</code></pre>
<h2 id="المزالق-والمقايضات-الشائعة">المزالق والمقايضات الشائعة</h2>
<h3 id="فحص-أنواع-typescript">فحص أنواع TypeScript</h3>
<p>SWC سريع للغاية في إزالة أنواع TypeScript، لكنه لا يفحصها فعليًا. ستحتاج إلى تشغيل <code>tsc --noEmit</code> منفصلًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run type-check &amp;&amp; swc src -d dist&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تتخطَّ فحص الأنواع كليًا — فأخطاء وقت التشغيل الناتجة عن مشكلات الأنواع أصعب بكثير في التنقيح من أخطاء وقت التجميع.</p>
</blockquote>
<h3 id="منظومة-الإضافات">منظومة الإضافات</h3>
<p>لدى Babel منظومة إضافات ضخمة لا يضاهيها SWC بالكامل بعد. قد لا تكون لبعض التحويلات المحددة التي تعتمد عليها مكافئات في SWC. ومع ذلك، فإن التحويلات الأساسية (JSX وTypeScript وES6+) متينة.</p>
<h3 id="تحليل-الحزم">تحليل الحزم</h3>
<p>تعمل أدوات مثل <code>webpack-bundle-analyzer</code> بشكل رائع مع شيفرة مجمّعة بـ SWC، لكن تأكد من تفعيل خرائط المصدر لتحليل دقيق:</p>
<pre><code class="language-bash">npm install -D webpack-bundle-analyzer
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;webpack-bundle-analyzer&#x27;</span>).<span class="hljs-property">BundleAnalyzerPlugin</span>;

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span>({
      <span class="hljs-attr">analyzerMode</span>: <span class="hljs-string">&#x27;static&#x27;</span>,
      <span class="hljs-attr">openAnalyzer</span>: <span class="hljs-literal">false</span>,
    }),
  ],
};
</code></pre>
<h3 id="استخدام-الذاكرة">استخدام الذاكرة</h3>
<p>يستخدم SWC ذاكرة أقل من Babel عمومًا، لكن المشاريع الكبيرة جدًا قد تصل إلى حدود الذاكرة. يمكنك ضبط عدد العمّال:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;jsc&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;experimental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;cacheRoot&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.swc&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="استراتيجية-الانتقال">استراتيجية الانتقال</h2>
<h3 id="الانتقال-التدريجي-من-babel">الانتقال التدريجي من Babel</h3>
<p>لا يلزمك تبديل كل شيء دفعة واحدة. إليك مقاربة عملية:</p>
<ol>
<li><strong>ابدأ ببنيات التطوير</strong>: استخدم SWC لتسريع بدء خادم التطوير</li>
<li><strong>اختبر بدقّة</strong>: تأكد من عمل تطبيقك بالطريقة نفسها مع SWC</li>
<li><strong>بدّل بنيات الإنتاج</strong>: عندما تثق، استخدم SWC للإنتاج</li>
<li><strong>راقب أحجام الحزم</strong>: تحقق من أن التصغير ينتج نتائج مماثلة</li>
</ol>
<h3 id="اختبار-انتقالك">اختبار انتقالك</h3>
<p>أنشئ اختبارًا بسيطًا للتحقق من عمل إعداد SWC لديك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// test-swc.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">count</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TestComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">Props</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ name, count = <span class="hljs-number">0</span> }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello {name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">TestComponent</span>;
</code></pre>
<p>جمّعه باستخدام SWC:</p>
<pre><code class="language-bash">npx swc test-swc.ts -o test-swc.js
</code></pre>
<p>يجب أن تكون المخرجات JavaScript نظيفة ومحوّلة على نحو سليم.</p>
<h2 id="متى-لا-تستخدم-swc">متى لا تستخدم SWC</h2>
<p>رغم أن SWC ممتاز لمعظم مشاريع React، ثمة سيناريوهات قد يكون فيها البقاء على Babel منطقيًا:</p>
<ul>
<li><strong>اعتماديات إضافات كثيفة</strong>: إن كان بناؤك يعتمد على إضافات Babel محددة لا مكافئات لها في SWC</li>
<li><strong>ميزات JavaScript تجريبية</strong>: يدعم Babel أحيانًا مقترحات متقدمة قبل SWC</li>
<li><strong>قيود مشاريع قديمة</strong>: إن كنت في إعداد monorepo معقد يتطلب تغيير أداة البناء تنسيقًا واسعًا</li>
</ul>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:l,html:c};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,c as html,p as slug,t as title};
