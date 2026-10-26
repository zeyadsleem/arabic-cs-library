const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-modules-declarations",p="الوحدات وملفات التعريف في React",t=[{depth:2,id:"استيراد-الأصول-في-react",text:"استيراد الأصول في React"},{depth:3,id:"وحدات-css",text:"وحدات CSS"},{depth:3,id:"ملفات-svg-بوصفها-مكونات-react",text:"ملفات SVG بوصفها مكوّنات React"},{depth:3,id:"استيراد-الصور",text:"استيراد الصور"},{depth:2,id:"العمل-مع-المكتبات-غير-المزودة-بأنواع",text:"العمل مع المكتبات غير المزوّدة بأنواع"},{depth:3,id:"حل-سريع-تعريف-أساسي",text:"حل سريع: تعريف أساسي"},{depth:3,id:"الأفضل-أنواع-مفصلة",text:"الأفضل: أنواع مفصّلة"},{depth:2,id:"الكائنات-العامة-في-تطبيقات-react",text:"الكائنات العامة في تطبيقات React"},{depth:2,id:"تعريفات-أنواع-مكونات-react",text:"تعريفات أنواع مكوّنات React"},{depth:2,id:"توسيع-الأنواع-المدمجة-في-react",text:"توسيع الأنواع المدمجة في React"},{depth:3,id:"خصائص-css-المخصصة",text:"خصائص CSS المخصّصة"},{depth:3,id:"سمات-html-المخصصة",text:"سمات HTML المخصّصة"},{depth:2,id:"متغيرات-البيئة-والثوابت-وقت-البناء",text:"متغيرات البيئة والثوابت وقت البناء"},{depth:3,id:"تطبيق-create-react-app-أو-processenv-القياسي",text:"تطبيق Create React App أو Process.env القياسي"},{depth:3,id:"متغيرات-البيئة-في-vite",text:"متغيرات البيئة في Vite"},{depth:2,id:"كتابة-أنواع-لمكتبات-react-الشائعة-التي-تفتقر-إلى-الأنواع",text:"كتابة أنواع لمكتبات React الشائعة التي تفتقر إلى الأنواع"},{depth:3,id:"محرر-markdown-لـ-react",text:"محرّر Markdown لـ React"},{depth:3,id:"مكتبة-الرسوم-البيانية",text:"مكتبة الرسوم البيانية"},{depth:3,id:"مكتبة-التحقق-من-النماذج",text:"مكتبة التحقق من النماذج"},{depth:2,id:"نشر-مكتبات-مكونات-react-مع-الأنواع",text:"نشر مكتبات مكوّنات React مع الأنواع"},{depth:2,id:"استخدام-حزم-types-في-مشاريع-react",text:"استخدام حزم @types في مشاريع React"},{depth:3,id:"عندما-تتعارض-حزم-types",text:"عندما تتعارض حزم @types"},{depth:2,id:"أنماط-متقدمة-لكتابة-الأنواع-في-مكتبات-react",text:"أنماط متقدمة لكتابة الأنواع في مكتبات React"},{depth:3,id:"أنواع-المكونات-متعددة-الأشكال",text:"أنواع المكوّنات متعددة الأشكال"},{depth:3,id:"مكتبات-render-prop",text:"مكتبات Render Prop"},{depth:2,id:"الاستيراد-الديناميكي-وتقسيم-الشيفرة-في-react",text:"الاستيراد الديناميكي وتقسيم الشيفرة في React"},{depth:3,id:"reactlazy-مع-typescript",text:"React.lazy مع TypeScript"},{depth:3,id:"استيراد-المكونات-ديناميكيا",text:"استيراد المكوّنات ديناميكيًا"},{depth:2,id:"أنواع-خاصة-بكل-منصة-الويب-مقابل-react-native",text:"أنواع خاصة بكل منصة (الويب مقابل React Native)"},{depth:2,id:"اختبار-تعريفات-أنواع-المكونات",text:"اختبار تعريفات أنواع المكوّنات"},{depth:2,id:"أفضل-الممارسات-في-تعريفات-أنواع-react",text:"أفضل الممارسات في تعريفات أنواع React"},{depth:3,id:"نظم-ملفات-الأنواع-لديك",text:"نظّم ملفات الأنواع لديك"},{depth:3,id:"استخدم-الاستيرادات-الخاصة-بالأنواع-فقط-للحصول-على-أداء-أفضل",text:"استخدم الاستيرادات الخاصة بالأنواع فقط للحصول على أداء أفضل"},{depth:3,id:"هيئ-أسماء-مسارات-مستعارة-لاستيرادات-نظيفة",text:"هيّئ أسماء مسارات مستعارة لاستيرادات نظيفة"},{depth:3,id:"اكتب-أنواع-react-context-على-النحو-الصحيح",text:"اكتب أنواع React Context على النحو الصحيح"},{depth:3,id:"اربط-إصدارات-أنواعك-بإصدارات-مكوناتك",text:"اربط إصدارات أنواعك بإصدارات مكوّناتك"},{depth:2,id:"مشكلات-typescript-الشائعة-في-react-وحلولها",text:"مشكلات TypeScript الشائعة في React وحلولها"},{depth:3,id:"خطأ-cannot-find-module-مع-ملفات-css-والصور",text:"خطأ «Cannot find module» مع ملفات CSS والصور"},{depth:3,id:"تعارضات-أنواع-react-18",text:"تعارضات أنواع React 18"},{depth:3,id:"أخطاء-نوع-عنصر-jsx",text:"أخطاء نوع عنصر JSX"},{depth:3,id:"مشكلات-استنتاج-أنواع-الخصائص",text:"مشكلات استنتاج أنواع الخصائص"},{depth:2,id:"أمثلة-واقعية-على-ملفات-تعريف-react",text:"أمثلة واقعية على ملفات تعريف React"},{depth:3,id:"كتابة-أنواع-لمكون-headless-ui",text:"كتابة أنواع لمكوّن Headless UI"},{depth:3,id:"كتابة-أنواع-لتكامل-مكتبة-النماذج",text:"كتابة أنواع لتكامل مكتبة النماذج"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>كل مشروع React يصطدم في النهاية بخطأ «Cannot find module». قد تكون المشكلة تلك المكتبة من نوع CSS-in-JS التي تفتقر إلى الأنواع، أو استيراد صورة لا يفهمه TypeScript، أو مكوّن JavaScript قديم تحاول دمجه. إن ملفات التعريف هي منفذك للخروج من هذا المأزق: فهي تخبر TypeScript بشيفرة لا يستطيع استنتاجها بنفسه.</p>
<p>في تطوير React، ستصادف ملفات التعريف عندما:</p>
<ul>
<li>تستورد وحدات CSS أو الصور أو ملفات SVG بوصفها مكوّنات</li>
<li>تستخدم مكتبات JavaScript لا تأتي مرفقة بتعريفات TypeScript</li>
<li>توسّع الكائنات العامة لأغراض التحليلات أو أعلام الميزات</li>
<li>تضيف خصائص مخصّصة إلى الأنواع المدمجة في React</li>
<li>تنشئ متغيرات بيئة آمنة من حيث الأنواع</li>
</ul>
<p>لنتعرّف على كيفية التعامل مع هذه السيناريوهات بثقة.</p>
<h2 id="استيراد-الأصول-في-react">استيراد الأصول في React</h2>
<p>أكثر ملفات التعريف التي ستكتبها في React شيوعًا هي الخاصة بالأصول. لا يعرف TypeScript ما الذي ينبغي فعله عند <code>import logo from './logo.svg'</code>، وعليك أن تخبره.</p>
<h3 id="وحدات-css">وحدات CSS</h3>
<p>عند استخدام وحدات CSS لتحقيق تنسيق محصور النطاق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/css-modules.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.scss&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}

<span class="hljs-comment">// Now in your component:</span>
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Button.module.css&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.primary}</span>&gt;</span>
      {/* TypeScript knows styles.primary is a string */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>نصيحة من الواقع العملي</strong>: بعض الأدوات مثل <code>typed-css-modules</code> تستطيع توليد أنواع محدّدة لوحدات CSS لديك، فتمنحك إكمالًا تلقائيًا لأسماء الأصناف الفعلية.</p>
<h3 id="ملفات-svg-بوصفها-مكونات-react">ملفات SVG بوصفها مكوّنات React</h3>
<p>كثير من تطبيقات React تستورد ملفات SVG كمكوّنات لتحكم أفضل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/assets.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">SVG</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt;&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-variable constant_">SVG</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg?react&#x27;</span> {  <span class="hljs-comment">// Vite&#x27;s syntax</span>
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">SVG</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt;&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-variable constant_">SVG</span>;
}

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Logo</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.svg&#x27;</span>;
<span class="hljs-comment">// or with Vite:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Logo</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.svg?react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Header</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Logo</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{40}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{40}</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">&quot;currentColor&quot;</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="استيراد-الصور">استيراد الصور</h3>
<p>لتحقيق تحميل محسّن للصور:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/images.d.ts</span>
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

<span class="hljs-comment">// For Next.js static imports:</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">StaticImageData</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/image&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-title class_">StaticImageData</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}
</code></pre>
<h2 id="العمل-مع-المكتبات-غير-المزودة-بأنواع">العمل مع المكتبات غير المزوّدة بأنواع</h2>
<p>ليست كل مكتبة تأتي مع تعريفات TypeScript. وإليك كيفية التعامل معها:</p>
<h3 id="حل-سريع-تعريف-أساسي">حل سريع: تعريف أساسي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/untyped-libs.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;old-carousel-library&#x27;</span> {
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Carousel</span> {
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">element</span>: <span class="hljs-title class_">HTMLElement</span>, <span class="hljs-attr">options</span>?: <span class="hljs-built_in">any</span></span>);
    <span class="hljs-title function_">next</span>(): <span class="hljs-built_in">void</span>;
    <span class="hljs-title function_">prev</span>(): <span class="hljs-built_in">void</span>;
    <span class="hljs-title function_">goTo</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span>;
    <span class="hljs-title function_">destroy</span>(): <span class="hljs-built_in">void</span>;
  }
}

<span class="hljs-comment">// Now you can use it:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Carousel</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;old-carousel-library&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ImageGallery</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> ref = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (ref.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">const</span> carousel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Carousel</span>(ref.<span class="hljs-property">current</span>, {
        <span class="hljs-attr">autoplay</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">5000</span>
      });
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> carousel.<span class="hljs-title function_">destroy</span>();
    }
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="الأفضل-أنواع-مفصلة">الأفضل: أنواع مفصّلة</h3>
<p>بالنسبة إلى المكتبات التي تستخدمها بكثافة، استثمر في أنواع أفضل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/analytics-lib.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;analytics-lib&#x27;</span> {
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnalyticsOptions</span> {
    <span class="hljs-attr">debug</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">endpoint</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">bufferSize</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">flushInterval</span>?: <span class="hljs-built_in">number</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">EventProperties</span> {
    [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">timestamp</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">userId</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">sessionId</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">PageViewProperties</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">EventProperties</span> {
    <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">referrer</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">path</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Analytics</span> {
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">apiKey</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_">AnalyticsOptions</span></span>);

    <span class="hljs-title function_">track</span>(<span class="hljs-attr">eventName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">properties</span>?: <span class="hljs-title class_">EventProperties</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
    <span class="hljs-title function_">page</span>(<span class="hljs-attr">properties</span>?: <span class="hljs-title class_">PageViewProperties</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
    <span class="hljs-title function_">identify</span>(<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">traits</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
    <span class="hljs-title function_">reset</span>(): <span class="hljs-built_in">void</span>;
  }

  <span class="hljs-keyword">const</span> <span class="hljs-attr">analytics</span>: <span class="hljs-title class_">Analytics</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> analytics;
}
</code></pre>
<h2 id="الكائنات-العامة-في-تطبيقات-react">الكائنات العامة في تطبيقات React</h2>
<p>تحتاج كثير من تطبيقات React إلى توسيع كائن window العام من أجل التحليلات أو أعلام الميزات أو نصوص الطرف الثالث:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/global.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">global</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Window</span> {
    <span class="hljs-comment">// Google Analytics</span>
    <span class="hljs-attr">gtag</span>?: <span class="hljs-function">(<span class="hljs-params">
      <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;config&#x27;</span> | <span class="hljs-string">&#x27;event&#x27;</span>,
      <span class="hljs-attr">targetId</span>: <span class="hljs-built_in">string</span>,
      <span class="hljs-attr">config</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;
    </span>) =&gt;</span> <span class="hljs-built_in">void</span>;

    <span class="hljs-comment">// Feature flags</span>
    <span class="hljs-attr">__FEATURES__</span>?: {
      <span class="hljs-attr">darkMode</span>: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">betaFeatures</span>: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">analyticsEnabled</span>: <span class="hljs-built_in">boolean</span>;
    };

    <span class="hljs-comment">// Stripe</span>
    <span class="hljs-title class_">Stripe</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">publicKey</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-attr">redirectToCheckout</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">options</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">error</span>?: <span class="hljs-built_in">any</span> }&gt;;
    };

    <span class="hljs-comment">// Dev tools</span>
    <span class="hljs-attr">__REDUX_DEVTOOLS_EXTENSION__</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">any</span>;
  }
}

<span class="hljs-keyword">export</span> {}; <span class="hljs-comment">// Make this a module</span>

<span class="hljs-comment">// Usage in your React app:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PaymentButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePayment</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">Stripe</span>) {
      <span class="hljs-keyword">const</span> stripe = <span class="hljs-variable language_">window</span>.<span class="hljs-title class_">Stripe</span>(<span class="hljs-string">&#x27;pk_test_...&#x27;</span>);
      <span class="hljs-keyword">await</span> stripe.<span class="hljs-title function_">redirectToCheckout</span>({ <span class="hljs-attr">sessionId</span>: <span class="hljs-string">&#x27;...&#x27;</span> });
    }
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handlePayment}</span>&gt;</span>Pay Now<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تعريفات-أنواع-مكونات-react">تعريفات أنواع مكوّنات React</h2>
<p>عند إنشاء ملفات تعريف لمكوّنات React، وهو أمر شائع عند تغليف مكوّنات JavaScript، تحتاج إلى التعامل مع أنماط مختلفة من المكوّنات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/ui-library.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;@company/ui-library&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span>, <span class="hljs-title class_">ReactNode</span>, <span class="hljs-title class_">MouseEvent</span>, <span class="hljs-title class_">ForwardRefExoticComponent</span>, <span class="hljs-title class_">RefAttributes</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-comment">// Basic component</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
    <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
    <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
    <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
    <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">fullWidth</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">onClick</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-string">&#x27;data-testid&#x27;</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt;;

  <span class="hljs-comment">// ForwardRef component for DOM access</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> {
    <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">helperText</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">onChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Input</span>: <span class="hljs-title class_">ForwardRefExoticComponent</span>&lt;
    <span class="hljs-title class_">InputProps</span> &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;
  &gt;;

  <span class="hljs-comment">// Component with static properties</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
    <span class="hljs-attr">open</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Modal</span>: <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-title class_">ModalProps</span>&gt; &amp; {
    <span class="hljs-title class_">Header</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span> }&gt;;
    <span class="hljs-title class_">Body</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span> }&gt;;
    <span class="hljs-title class_">Footer</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span> }&gt;;
  };

  <span class="hljs-comment">// Hook exports</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useToast</span>(<span class="hljs-params"></span>): {
    <span class="hljs-attr">show</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>?: { duration?: <span class="hljs-built_in">number</span>; <span class="hljs-keyword">type</span>?: <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> }</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">hide</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  };
}

<span class="hljs-comment">// Usage in your app:</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span>, <span class="hljs-title class_">Modal</span>, useToast } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@company/ui-library&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> toast = <span class="hljs-title function_">useToast</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">open</span>=<span class="hljs-string">{true}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> {}}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal.Header</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">Modal.Header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal.Body</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">Modal.Body</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal.Footer</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> toast.show(&#x27;Saved!&#x27;, { type: &#x27;success&#x27; })}&gt;
          Save
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Modal.Footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="توسيع-الأنواع-المدمجة-في-react">توسيع الأنواع المدمجة في React</h2>
<p>تحتاج أحيانًا إلى توسيع أنواع React نفسها لدعم خصائص CSS المخصّصة، أو سمات HTML الإضافية، أو الخصائص الخاصة بمكتبة معيّنة:</p>
<h3 id="خصائص-css-المخصصة">خصائص CSS المخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/css-properties.d.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">CSSProperties</span> {
    <span class="hljs-comment">// CSS Custom Properties (CSS Variables)</span>
    <span class="hljs-string">&#x27;--primary-color&#x27;</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-string">&#x27;--spacing&#x27;</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;
    <span class="hljs-string">&#x27;--animation-duration&#x27;</span>?: <span class="hljs-built_in">string</span>;

    <span class="hljs-comment">// CSS-in-JS libraries often use these</span>
    [<span class="hljs-attr">key</span>: <span class="hljs-string">\`--<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>]: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>;
  }
}

<span class="hljs-comment">// Now you can use CSS variables in style prop:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemedButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        &#x27;<span class="hljs-attr">--primary-color</span>&#x27;<span class="hljs-attr">:</span> &#x27;#<span class="hljs-attr">007bff</span>&#x27;,
        &#x27;<span class="hljs-attr">--spacing</span>&#x27;<span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">1rem</span>&#x27;,
        <span class="hljs-attr">backgroundColor:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--primary-color</span>)&#x27;,
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">var</span>(<span class="hljs-attr">--spacing</span>)&#x27;
      }}
    &gt;</span>
      Click me
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="سمات-html-المخصصة">سمات HTML المخصّصة</h3>
<p>من أجل سمات البيانات أو امتدادات ARIA أو تكاملات الطرف الثالث:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/html-attributes.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">HTMLAttributes</span>&lt;T&gt; {
    <span class="hljs-comment">// Intersection Observer attributes</span>
    <span class="hljs-string">&#x27;data-lazy-src&#x27;</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-string">&#x27;data-lazy-load&#x27;</span>?: <span class="hljs-built_in">boolean</span>;

    <span class="hljs-comment">// Analytics attributes</span>
    <span class="hljs-string">&#x27;data-track-event&#x27;</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-string">&#x27;data-track-category&#x27;</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-string">&#x27;data-track-label&#x27;</span>?: <span class="hljs-built_in">string</span>;

    <span class="hljs-comment">// Testing attributes</span>
    <span class="hljs-string">&#x27;data-cy&#x27;</span>?: <span class="hljs-built_in">string</span>;  <span class="hljs-comment">// Cypress</span>
    <span class="hljs-string">&#x27;data-test&#x27;</span>?: <span class="hljs-built_in">string</span>;  <span class="hljs-comment">// Generic testing</span>
  }
}

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TrackedButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">data-track-event</span>=<span class="hljs-string">&quot;click&quot;</span>
      <span class="hljs-attr">data-track-category</span>=<span class="hljs-string">&quot;engagement&quot;</span>
      <span class="hljs-attr">data-cy</span>=<span class="hljs-string">&quot;submit-button&quot;</span>
    &gt;</span>
      Submit
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متغيرات-البيئة-والثوابت-وقت-البناء">متغيرات البيئة والثوابت وقت البناء</h2>
<p>كثيرًا ما تستخدم تطبيقات React متغيرات البيئة لأغراض التهيئة. وإليك كيفية كتابة أنواعها:</p>
<h3 id="تطبيق-create-react-app-أو-processenv-القياسي">تطبيق Create React App أو <code>Process.env</code> القياسي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/env.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">namespace</span> <span class="hljs-title class_">NodeJS</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProcessEnv</span> {
    <span class="hljs-comment">// Required variables</span>
    <span class="hljs-keyword">readonly</span> <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">&#x27;development&#x27;</span> | <span class="hljs-string">&#x27;production&#x27;</span> | <span class="hljs-string">&#x27;test&#x27;</span>;
    <span class="hljs-keyword">readonly</span> <span class="hljs-attr">REACT_APP_API_URL</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">readonly</span> <span class="hljs-attr">REACT_APP_AUTH_DOMAIN</span>: <span class="hljs-built_in">string</span>;

    <span class="hljs-comment">// Optional variables</span>
    <span class="hljs-keyword">readonly</span> <span class="hljs-variable constant_">REACT_APP_SENTRY_DSN</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">readonly</span> <span class="hljs-variable constant_">REACT_APP_GA_TRACKING_ID</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">readonly</span> <span class="hljs-variable constant_">REACT_APP_FEATURE_FLAGS</span>?: <span class="hljs-built_in">string</span>;
  }
}

<span class="hljs-comment">// Usage with type safety:</span>
<span class="hljs-keyword">const</span> apiUrl = process.<span class="hljs-property">env</span>.<span class="hljs-property">REACT_APP_API_URL</span>; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">const</span> isDev = process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>; <span class="hljs-comment">// boolean</span>

<span class="hljs-comment">// TypeScript will error if you typo:</span>
<span class="hljs-comment">// process.env.REACT_APP_API_ULR // Error: Property doesn&#x27;t exist</span>
</code></pre>
<h3 id="متغيرات-البيئة-في-vite">متغيرات البيئة في Vite</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/vite-env.d.ts</span>
<span class="hljs-comment">/// &lt;reference types=&quot;vite/client&quot; /&gt;</span>

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImportMetaEnv</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_API_URL</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_APP_TITLE</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">VITE_AUTH_DOMAIN</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-variable constant_">VITE_ENABLE_ANALYTICS</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">MODE</span>: <span class="hljs-string">&#x27;development&#x27;</span> | <span class="hljs-string">&#x27;production&#x27;</span> | <span class="hljs-string">&#x27;staging&#x27;</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImportMeta</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">env</span>: <span class="hljs-title class_">ImportMetaEnv</span>;
}

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">const</span> apiUrl = <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">VITE_API_URL</span>;
<span class="hljs-keyword">const</span> isProduction = <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>.<span class="hljs-property">MODE</span> === <span class="hljs-string">&#x27;production&#x27;</span>;
</code></pre>
<p><strong>نصيحة من الواقع العملي</strong>: استخدم مكتبة تحقق مثل Zod للتحقق من متغيرات البيئة أثناء التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> envSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">VITE_API_URL</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>(),
  <span class="hljs-attr">VITE_AUTH_DOMAIN</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">VITE_ENABLE_ANALYTICS</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;true&#x27;</span>, <span class="hljs-string">&#x27;false&#x27;</span>]).<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> env = envSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>);
</code></pre>
<h2 id="كتابة-أنواع-لمكتبات-react-الشائعة-التي-تفتقر-إلى-الأنواع">كتابة أنواع لمكتبات React الشائعة التي تفتقر إلى الأنواع</h2>
<p>إليك أمثلة واقعية على كتابة الأنواع لمكتبات شائعة الاستخدام في مشاريع React:</p>
<h3 id="محرر-markdown-لـ-react">محرّر Markdown لـ React</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/markdown-editor.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-markdown-editor-lite&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">EditorProps</span> {
    <span class="hljs-attr">value</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">defaultValue</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">onChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: { text: <span class="hljs-built_in">string</span>; html: <span class="hljs-built_in">string</span> }</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">onImageUpload</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">File</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;;
    <span class="hljs-attr">style</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>;
    <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">view</span>?: {
      <span class="hljs-attr">menu</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">md</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">html</span>?: <span class="hljs-built_in">boolean</span>;
    };
    <span class="hljs-attr">canView</span>?: {
      <span class="hljs-attr">menu</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">md</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">html</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">fullScreen</span>?: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">hideMenu</span>?: <span class="hljs-built_in">boolean</span>;
    };
    <span class="hljs-attr">plugins</span>?: <span class="hljs-built_in">string</span>[];
    <span class="hljs-attr">renderHTML</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">readOnly</span>?: <span class="hljs-built_in">boolean</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">EditorProps</span>&gt; {
    <span class="hljs-title function_">getMdValue</span>(): <span class="hljs-built_in">string</span>;
    <span class="hljs-title function_">getHtmlValue</span>(): <span class="hljs-built_in">string</span>;
    <span class="hljs-title function_">clear</span>(): <span class="hljs-built_in">void</span>;
  }
}

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-markdown-editor-lite&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;react-markdown-editor-lite/lib/index.css&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BlogEditor</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [content, setContent] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MdEditor</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{content}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">height:</span> &#x27;<span class="hljs-attr">500px</span>&#x27; }}
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{({</span> <span class="hljs-attr">text</span> }) =&gt;</span> setContent(text)}
      onImageUpload={async (file) =&gt; {
        const url = await uploadImage(file);
        return url;
      }}
    /&gt;</span>
  );
}
</code></pre>
<h3 id="مكتبة-الرسوم-البيانية">مكتبة الرسوم البيانية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/charts.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-simple-charts&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartProps</span> {
    <span class="hljs-attr">data</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> }&gt;;
    <span class="hljs-attr">width</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">margin</span>?: { <span class="hljs-attr">top</span>?: <span class="hljs-built_in">number</span>; <span class="hljs-attr">right</span>?: <span class="hljs-built_in">number</span>; <span class="hljs-attr">bottom</span>?: <span class="hljs-built_in">number</span>; <span class="hljs-attr">left</span>?: <span class="hljs-built_in">number</span> };
    <span class="hljs-attr">color</span>?: <span class="hljs-built_in">string</span> | (<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">d</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>);
  }

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">TooltipProps</span> {
    <span class="hljs-attr">active</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">payload</span>?: <span class="hljs-built_in">any</span>[];
    <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">formatter</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LineChart</span>: <span class="hljs-title class_">ComponentType</span>&lt;
    <span class="hljs-title class_">ChartProps</span> &amp; {
      <span class="hljs-attr">curve</span>?: <span class="hljs-string">&#x27;linear&#x27;</span> | <span class="hljs-string">&#x27;monotone&#x27;</span> | <span class="hljs-string">&#x27;step&#x27;</span>;
      <span class="hljs-attr">strokeWidth</span>?: <span class="hljs-built_in">number</span>;
    }
  &gt;;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">BarChart</span>: <span class="hljs-title class_">ComponentType</span>&lt;
    <span class="hljs-title class_">ChartProps</span> &amp; {
      <span class="hljs-attr">barGap</span>?: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">barCategoryGap</span>?: <span class="hljs-built_in">number</span>;
    }
  &gt;;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tooltip</span>: <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-title class_">TooltipProps</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Legend</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">align</span>?: <span class="hljs-string">&#x27;left&#x27;</span> | <span class="hljs-string">&#x27;center&#x27;</span> | <span class="hljs-string">&#x27;right&#x27;</span> }&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">XAxis</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">dataKey</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span> }&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">YAxis</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-attr">domain</span>?: [<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>] }&gt;;
}
</code></pre>
<h3 id="مكتبة-التحقق-من-النماذج">مكتبة التحقق من النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/form-validator.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-form-validator&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span>, <span class="hljs-title class_">ReactElement</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ValidationRule</span> {
    <span class="hljs-attr">rule</span>: <span class="hljs-title class_">RegExp</span> | (<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>);
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormProps</span> {
    <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">values</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
    <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactElement</span> | <span class="hljs-title class_">ReactElement</span>[];
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">FieldProps</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">rules</span>?: <span class="hljs-title class_">ValidationRule</span>[];
    <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: {
      value: <span class="hljs-built_in">any</span>;
      error?: <span class="hljs-built_in">string</span>;
      onChange: (value: <span class="hljs-built_in">any</span>) =&gt; <span class="hljs-built_in">void</span>;
      onBlur: () =&gt; <span class="hljs-built_in">void</span>;
    }</span>) =&gt;</span> <span class="hljs-title class_">ReactElement</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Form</span>: <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-title class_">FormProps</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Field</span>: <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-title class_">FieldProps</span>&gt;;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useFormState</span>(<span class="hljs-params"></span>): {
    <span class="hljs-attr">values</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
    <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
    <span class="hljs-attr">isValid</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">isDirty</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">reset</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  };
}
</code></pre>
<h2 id="نشر-مكتبات-مكونات-react-مع-الأنواع">نشر مكتبات مكوّنات React مع الأنواع</h2>
<p>إذا كنت تبني مكتبة مكوّنات React، فإليك كيفية تهيئة الأنواع على النحو الصحيح:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@company/react-ui&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.esm.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;import&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.esm.js&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;require&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./styles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/styles.css&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;peerDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&gt;=16.8.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&gt;=16.8.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@types/react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^5.0.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;README.md&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>نصيحة احترافية</strong>: استخدم <code>peerDependencies</code> من أجل React لتجنّب تعارض الإصدارات. أدرج الأنواع في <code>devDependencies</code> وليس في الاعتماديات العادية.</p>
<h2 id="استخدام-حزم-types-في-مشاريع-react">استخدام حزم @types في مشاريع React</h2>
<p>معظم مكتبات React الشائعة لديها أنواع يحافظ عليها المجتمع:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Essential types for React projects</span>
npm install --save-dev \\
  @types/react \\
  @types/react-dom \\
  @types/node

<span class="hljs-comment"># Common library types</span>
npm install --save-dev \\
  @types/react-router-dom \\
  @types/styled-components \\
  @types/jest \\
  @types/testing-library__react
</code></pre>
<p><strong>العثور على أنواع لمكتبة</strong>:</p>
<ol>
<li>جرّب تثبيت <code>@types/package-name</code></li>
<li>تحقّق مما إذا كانت الحزمة تتضمن أنواعها الخاصة (ابحث عن «types» في package.json)</li>
<li>ابحث في <a href="https://www.typescriptlang.org/dt/search">TypeSearch</a></li>
<li>أنشئ ملف تعريف خاصًا بك إذا لزم الأمر</li>
</ol>
<h3 id="عندما-تتعارض-حزم-types">عندما تتعارض حزم @types</h3>
<p>تحدث أحيانًا اختلافات في الإصدارات بين حزم @types:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/overrides.d.ts</span>
<span class="hljs-comment">// Override conflicting types</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span> {
  <span class="hljs-comment">// Fix for @types/react-router-dom not matching your version</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useParams&lt;T = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;(): T;
}
</code></pre>
<h2 id="أنماط-متقدمة-لكتابة-الأنواع-في-مكتبات-react">أنماط متقدمة لكتابة الأنواع في مكتبات React</h2>
<h3 id="أنواع-المكونات-متعددة-الأشكال">أنواع المكوّنات متعددة الأشكال</h3>
<p>بالنسبة إلى مكتبات المكوّنات التي تدعم خاصية <code>as</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/polymorphic-lib.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;polymorphic-ui&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentPropsWithRef</span>, <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">ReactElement</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">type</span> <span class="hljs-title class_">PolymorphicProps</span>&lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">Props</span> = {}&gt; = <span class="hljs-title class_">Props</span> &amp;
    <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ComponentPropsWithRef</span>&lt;C&gt;, keyof <span class="hljs-title class_">Props</span> | <span class="hljs-string">&#x27;as&#x27;</span>&gt; &amp; {
      <span class="hljs-attr">as</span>?: C;
    };

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">Box</span>&lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span> = <span class="hljs-string">&#x27;div&#x27;</span>&gt;(
    <span class="hljs-attr">props</span>: <span class="hljs-title class_">PolymorphicProps</span>&lt;C, { <span class="hljs-attr">padding</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-attr">margin</span>?: <span class="hljs-built_in">string</span> }&gt;
  ): <span class="hljs-title class_">ReactElement</span> | <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">Text</span>&lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ElementType</span> = <span class="hljs-string">&#x27;span&#x27;</span>&gt;(
    <span class="hljs-attr">props</span>: <span class="hljs-title class_">PolymorphicProps</span>&lt;C, { <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span> }&gt;
  ): <span class="hljs-title class_">ReactElement</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Box</span>, <span class="hljs-title class_">Text</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;polymorphic-ui&#x27;</span>;

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Box</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;section&quot;</span> <span class="hljs-attr">padding</span>=<span class="hljs-string">&quot;2rem&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {}}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;h1&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;large&quot;</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Box</span>&gt;</span></span>
</code></pre>
<h3 id="مكتبات-render-prop">مكتبات Render Prop</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/render-prop-lib.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-intersection-observer&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IntersectionOptions</span> {
    <span class="hljs-attr">root</span>?: <span class="hljs-title class_">Element</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">rootMargin</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">threshold</span>?: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">number</span>[];
    <span class="hljs-attr">triggerOnce</span>?: <span class="hljs-built_in">boolean</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IntersectionObserverProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">IntersectionOptions</span> {
    <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: {
      inView: <span class="hljs-built_in">boolean</span>;
      ref: (node?: Element | <span class="hljs-literal">null</span>) =&gt; <span class="hljs-built_in">void</span>;
      entry?: IntersectionObserverEntry;
    }</span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span>;
    <span class="hljs-attr">onChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">inView</span>: <span class="hljs-built_in">boolean</span>, <span class="hljs-attr">entry</span>: <span class="hljs-title class_">IntersectionObserverEntry</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">InView</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">IntersectionObserverProps</span></span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useInView</span>(<span class="hljs-params"><span class="hljs-attr">options</span>?: <span class="hljs-title class_">IntersectionOptions</span></span>): {
    <span class="hljs-attr">ref</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">node</span>?: <span class="hljs-title class_">Element</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">inView</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">entry</span>?: <span class="hljs-title class_">IntersectionObserverEntry</span>;
  };
}
</code></pre>
<h2 id="الاستيراد-الديناميكي-وتقسيم-الشيفرة-في-react">الاستيراد الديناميكي وتقسيم الشيفرة في React</h2>
<p>يحتاج TypeScript إلى فهم مكوّناتك المحمّلة عند الطلب:</p>
<h3 id="reactlazy-مع-typescript">React.lazy مع TypeScript</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/routes.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;@/routes&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span>, <span class="hljs-title class_">LazyExoticComponent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">RouteConfig</span> {
    <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">exact</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">component</span>: <span class="hljs-title class_">LazyExoticComponent</span>&lt;<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;;
    <span class="hljs-attr">preload</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: <span class="hljs-title class_">RouteConfig</span>[];
}

<span class="hljs-comment">// routes/index.ts</span>
<span class="hljs-keyword">import</span> { lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">RouteConfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/routes&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">HomePage</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./HomePage&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfilePage</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./ProfilePage&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SettingsPage</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./SettingsPage&#x27;</span>));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">routes</span>: <span class="hljs-title class_">RouteConfig</span>[] = [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
    <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-title class_">HomePage</span>,
    <span class="hljs-attr">preload</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./HomePage&#x27;</span>)
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/profile&#x27;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-title class_">ProfilePage</span>,
    <span class="hljs-attr">preload</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./ProfilePage&#x27;</span>)
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/settings&#x27;</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-title class_">SettingsPage</span>,
    <span class="hljs-attr">preload</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./SettingsPage&#x27;</span>)
  }
];

<span class="hljs-comment">// Usage in App:</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { routes } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/routes&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;
      {routes.map(({ path, component: Component }) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{path}</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{path}</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Component</span> /&gt;</span>} /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="استيراد-المكونات-ديناميكيا">استيراد المكوّنات ديناميكيًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// For dynamically importing components based on strings</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;@/components/icons/*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-variable constant_">FC</span>, <span class="hljs-title class_">SVGProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Icon</span>: <span class="hljs-variable constant_">FC</span>&lt;<span class="hljs-title class_">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt;&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Icon</span>;
}

<span class="hljs-comment">// Helper for dynamic imports</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">loadIcon</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">\`@/components/icons/<span class="hljs-subst">\${name}</span>.svg\`</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">default</span>;
}

<span class="hljs-comment">// With type safety:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IconName</span> = <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;settings&#x27;</span> | <span class="hljs-string">&#x27;logout&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">iconLoaders</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">IconName</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = {
  <span class="hljs-attr">user</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@/components/icons/user.svg&#x27;</span>),
  <span class="hljs-attr">settings</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@/components/icons/settings.svg&#x27;</span>),
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@/components/icons/logout.svg&#x27;</span>),
};
</code></pre>
<h2 id="أنواع-خاصة-بكل-منصة-الويب-مقابل-react-native">أنواع خاصة بكل منصة (الويب مقابل React Native)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// index.d.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onPress</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// index.native.d.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ViewStyle</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-native&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onPress</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">ViewStyle</span>; <span class="hljs-comment">// React Native specific</span>
}

<span class="hljs-comment">// index.web.d.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CSSProperties</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>; <span class="hljs-comment">// Web uses onClick</span>
  <span class="hljs-attr">style</span>?: <span class="hljs-title class_">CSSProperties</span>; <span class="hljs-comment">// Web CSS</span>
}
</code></pre>
<h2 id="اختبار-تعريفات-أنواع-المكونات">اختبار تعريفات أنواع المكوّنات</h2>
<p>عند إنشاء تعريفات أنواع لمكوّنات React، اختبرها للتأكد من أنها تعمل على النحو الصحيح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/__tests__/component-types.test.tsx</span>
<span class="hljs-keyword">import</span> { expectType, expectError } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tsd&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span>, <span class="hljs-title class_">Input</span>, <span class="hljs-title class_">Modal</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@company/ui-library&#x27;</span>;

<span class="hljs-comment">// Test basic props</span>
expectType&lt;<span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>&gt;(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {}}&gt;Click<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
);

<span class="hljs-comment">// Test that invalid props error</span>
<span class="hljs-title function_">expectError</span>(
  <span class="hljs-comment">// @ts-expect-error: invalid variant</span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;invalid&quot;</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
);

<span class="hljs-comment">// Test ref forwarding</span>
<span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);
expectType&lt;<span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>&gt;(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Name&quot;</span> /&gt;</span></span>
);

<span class="hljs-comment">// Test compound components</span>
expectType&lt;<span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>&gt;(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">open</span>=<span class="hljs-string">{true}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> {}}&gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">Modal.Header</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">Modal.Header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Modal.Body</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">Modal.Body</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>
);

<span class="hljs-comment">// Runtime type checking in tests</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Button renders with correct props&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { getByRole } = <span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;test-button&quot;</span>&gt;</span>
      Click me
    <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
  );

  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<h2 id="أفضل-الممارسات-في-تعريفات-أنواع-react">أفضل الممارسات في تعريفات أنواع React</h2>
<h3 id="نظم-ملفات-الأنواع-لديك">نظّم ملفات الأنواع لديك</h3>
<pre><code>src/
  types/
    assets.d.ts      // SVG, images, CSS modules
    env.d.ts          // Environment variables
    global.d.ts       // Window object, global functions
    modules.d.ts      // Third-party libraries without types
    augmentations.d.ts // Extensions to existing types
</code></pre>
<h3 id="استخدم-الاستيرادات-الخاصة-بالأنواع-فقط-للحصول-على-أداء-أفضل">استخدم الاستيرادات الخاصة بالأنواع فقط للحصول على أداء أفضل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Type-only imports are removed in production</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">User</span>, <span class="hljs-title class_">Post</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./types&#x27;</span>;
<span class="hljs-keyword">import</span> { getUser, getPost } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api&#x27;</span>;

<span class="hljs-comment">// ❌ Bad: Imports the entire module even if only using types</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">User</span>, getUser } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api&#x27;</span>;
</code></pre>
<h3 id="هيئ-أسماء-مسارات-مستعارة-لاستيرادات-نظيفة">هيّئ أسماء مسارات مستعارة لاستيرادات نظيفة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// tsconfig.json</span>
{
  <span class="hljs-string">&quot;compilerOptions&quot;</span>: {
    <span class="hljs-string">&quot;baseUrl&quot;</span>: <span class="hljs-string">&quot;./src&quot;</span>,
    <span class="hljs-string">&quot;paths&quot;</span>: {
      <span class="hljs-string">&quot;@/components/*&quot;</span>: [<span class="hljs-string">&quot;components/*&quot;</span>],
      <span class="hljs-string">&quot;@/hooks/*&quot;</span>: [<span class="hljs-string">&quot;hooks/*&quot;</span>],
      <span class="hljs-string">&quot;@/utils/*&quot;</span>: [<span class="hljs-string">&quot;utils/*&quot;</span>],
      <span class="hljs-string">&quot;@/types/*&quot;</span>: [<span class="hljs-string">&quot;types/*&quot;</span>],
      <span class="hljs-string">&quot;@/assets/*&quot;</span>: [<span class="hljs-string">&quot;assets/*&quot;</span>]
    }
  }
}

<span class="hljs-comment">// vite.config.ts (if using Vite)</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">&#x27;@&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src&#x27;</span>)
    }
  }
});
</code></pre>
<h3 id="اكتب-أنواع-react-context-على-النحو-الصحيح">اكتب أنواع React Context على النحو الصحيح</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/auth-context.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;@/contexts/auth&#x27;</span> {
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthContextValue</span> {
    <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
    <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthContext</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">Context</span>&lt;<span class="hljs-title class_">AuthContextValue</span> | <span class="hljs-literal">undefined</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">useAuth</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">AuthContextValue</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthProvider</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span> }&gt;;
}
</code></pre>
<h3 id="اربط-إصدارات-أنواعك-بإصدارات-مكوناتك">اربط إصدارات أنواعك بإصدارات مكوّناتك</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// When breaking changes occur, export versioned types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonPropsV1</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-comment">// Breaking change from v1</span>
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
}

<span class="hljs-comment">// For migration period</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonPropsCompat</span> = <span class="hljs-title class_">ButtonPropsV1</span> | <span class="hljs-title class_">ButtonProps</span>;
</code></pre>
<h2 id="مشكلات-typescript-الشائعة-في-react-وحلولها">مشكلات TypeScript الشائعة في React وحلولها</h2>
<h3 id="خطأ-cannot-find-module-مع-ملفات-css-والصور">خطأ «Cannot find module» مع ملفات CSS والصور</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Quick fix: Create declarations</span>
<span class="hljs-comment">// types/assets.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.css&#x27;</span>;
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span>;
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span>;

<span class="hljs-comment">// Better: Add specific types</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}
</code></pre>
<h3 id="تعارضات-أنواع-react-18">تعارضات أنواع React 18</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// If you see errors with React 18 types:</span>
<span class="hljs-comment">// 1. Update all @types packages together</span>
npm update <span class="hljs-meta">@types</span>/react <span class="hljs-meta">@types</span>/react-dom

<span class="hljs-comment">// 2. Ensure consistent versions in package.json</span>
<span class="hljs-string">&quot;devDependencies&quot;</span>: {
  <span class="hljs-string">&quot;@types/react&quot;</span>: <span class="hljs-string">&quot;^18.0.0&quot;</span>,
  <span class="hljs-string">&quot;@types/react-dom&quot;</span>: <span class="hljs-string">&quot;^18.0.0&quot;</span>
}

<span class="hljs-comment">// 3. Clear node_modules and reinstall</span>
rm -rf node_modules package-lock.<span class="hljs-property">json</span>
npm install
</code></pre>
<h3 id="أخطاء-نوع-عنصر-jsx">أخطاء نوع عنصر JSX</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Error: JSX element type &#x27;Component&#x27; does not have any construct or call signatures</span>

<span class="hljs-comment">// Fix: Ensure proper export/import</span>
<span class="hljs-comment">// ❌ Wrong</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;my-lib&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span>: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// Too vague</span>
}

<span class="hljs-comment">// ✅ Correct</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;my-lib&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">ComponentType</span>&lt;{ <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }&gt;;
}
</code></pre>
<h3 id="مشكلات-استنتاج-أنواع-الخصائص">مشكلات استنتاج أنواع الخصائص</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// When TypeScript can&#x27;t infer prop types:</span>

<span class="hljs-comment">// ❌ Problem: Generic component loses type</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = &lt;T,&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: T</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span></span>;

<span class="hljs-comment">// ✅ Solution: Add extends constraint</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt;<span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">props</span>: T
</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span></span>;

<span class="hljs-comment">// Or use function declaration</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">MyComponent</span>&lt;T&gt;(<span class="hljs-attr">props</span>: T) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="أمثلة-واقعية-على-ملفات-تعريف-react">أمثلة واقعية على ملفات تعريف React</h2>
<h3 id="كتابة-أنواع-لمكون-headless-ui">كتابة أنواع لمكوّن Headless UI</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/headless-ui.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;@company/headless-ui&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span>, <span class="hljs-title class_">Dispatch</span>, <span class="hljs-title class_">SetStateAction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseDisclosureReturn</span> {
    <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">open</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">close</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">toggle</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">setIsOpen</span>: <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">SetStateAction</span>&lt;<span class="hljs-built_in">boolean</span>&gt;&gt;;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useDisclosure</span>(<span class="hljs-params"><span class="hljs-attr">defaultOpen</span>?: <span class="hljs-built_in">boolean</span></span>): <span class="hljs-title class_">UseDisclosureReturn</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseClickOutsideOptions</span> {
    <span class="hljs-attr">enabled</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span> | <span class="hljs-title class_">TouchEvent</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useClickOutside&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(
    <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">RefObject</span>&lt;T&gt;,
    <span class="hljs-attr">options</span>: <span class="hljs-title class_">UseClickOutsideOptions</span>,
  ): <span class="hljs-built_in">void</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseFocusTrapOptions</span> {
    <span class="hljs-attr">enabled</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">initialFocus</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">RefObject</span>&lt;<span class="hljs-title class_">HTMLElement</span>&gt;;
    <span class="hljs-attr">finalFocus</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">RefObject</span>&lt;<span class="hljs-title class_">HTMLElement</span>&gt;;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useFocusTrap&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(
    <span class="hljs-attr">ref</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">RefObject</span>&lt;T&gt;,
    <span class="hljs-attr">options</span>?: <span class="hljs-title class_">UseFocusTrapOptions</span>,
  ): <span class="hljs-built_in">void</span>;
}
</code></pre>
<h3 id="كتابة-أنواع-لتكامل-مكتبة-النماذج">كتابة أنواع لتكامل مكتبة النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// types/form-library.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;react-hook-form-helpers&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">UseFormReturn</span>, <span class="hljs-title class_">FieldValues</span>, <span class="hljs-title class_">Path</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-hook-form&#x27;</span>;
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactElement</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span>&lt;<span class="hljs-title class_">TFieldValues</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FieldValues</span>&gt; {
    <span class="hljs-attr">name</span>: <span class="hljs-title class_">Path</span>&lt;<span class="hljs-title class_">TFieldValues</span>&gt;;
    <span class="hljs-attr">label</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">FormField</span>&lt;<span class="hljs-title class_">TFieldValues</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FieldValues</span>&gt;(
    <span class="hljs-attr">props</span>: <span class="hljs-title class_">FormFieldProps</span>&lt;<span class="hljs-title class_">TFieldValues</span>&gt; &amp; {
      <span class="hljs-attr">form</span>: <span class="hljs-title class_">UseFormReturn</span>&lt;<span class="hljs-title class_">TFieldValues</span>&gt;;
    },
  ): <span class="hljs-title class_">ReactElement</span>;

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">FormProvider</span>&lt;<span class="hljs-title class_">TFieldValues</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FieldValues</span>&gt;(<span class="hljs-attr">props</span>: {
    <span class="hljs-attr">form</span>: <span class="hljs-title class_">UseFormReturn</span>&lt;<span class="hljs-title class_">TFieldValues</span>&gt;;
    <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  }): <span class="hljs-title class_">ReactElement</span>;
}
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>إن ملفات التعريف هي جسرك بين عالم TypeScript والنظام البيئي الواسع من مكتبات JavaScript والأصول والكائنات العامة في تطبيقات React. ستستخدمها من أجل:</p>
<ol>
<li><strong>استيراد أصول غير JavaScript</strong> - وحدات CSS والصور وملفات SVG بوصفها مكوّنات React</li>
<li><strong>كتابة أنواع مكتبات JavaScript</strong> - إنشاء أنواع للمكتبات التي لا تأتي مرفقة بتعريفات TypeScript</li>
<li><strong>توسيع أنواع React</strong> - إضافة خصائص CSS المخصّصة وسمات البيانات والامتدادات الخاصة بالمكتبات</li>
<li><strong>التعامل مع متغيرات البيئة</strong> - إنشاء وصول آمن من حيث الأنواع إلى تهيئة وقت البناء</li>
<li><strong>دعم الاستيراد الديناميكي</strong> - كتابة أنواع المكوّنات المحمّلة عند الطلب والوحدات المقسمة حسب الشيفرة</li>
</ol>
<p>تحتاج معظم مشاريع React إلى عدد قليل فقط من ملفات التعريف في مجلد <code>types/</code>. ابدأ ببساطة بالتعريفات الأساسية عندما تصطدم بأخطاء «Cannot find module»، ثم حسّنها تدريجيًا كلما تعرّفت أكثر على المكتبات التي تستخدمها. وتذكّر: إن ملفات التعريف تتعلق بتجربة المطوّر، فالأنواع الجيدة تجعل محرّر الشيفرة عونًا لك بدلًا من أن يكون خصمًا.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
