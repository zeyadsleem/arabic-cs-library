const s="tanstack-router",a="router",n="دورة TanStack Router الكاملة",t="index",p="مقدمة",c=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"موجه-لا-إطار-عمل",text:"موجّهٌ لا إطارُ عمل"},{depth:2,id:"الأمان-النوعي-ماذا-يعني-آمن-الأنواع-بالكامل",text:"الأمانُ النوعي: ماذا يعني «آمنُ الأنواع بالكامل»؟"},{depth:2,id:"الميزات-التي-سنعود-إليها-في-الدروس-التالية",text:"الميزاتُ التي سنعود إليها في الدروس التالية"},{depth:2,id:"الشيفرة-التي-سنبني-عليها",text:"الشيفرةُ التي سنبني عليها"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في أول درس من الدورة نستعرض <code>TanStack Router</code> قبل أن نكتب فيه سطرًا واحدًا: ما هو، وما الذي يجعله مختلفًا عن بقية موجّهات <code>React</code>، وما الميزات التي ستراها واحدًا واحدًا في الدروس التالية. تتّضح في هذا الدرس القاعدة التي بُنيت عليها المكتبة: <strong>كل ما يتعلّق بالتنقّل مكتوبٌ بأنواع صارمة</strong>، فيتحقّق المحرّر من صحّة روابطك ومعاملاتك قبل أن يعمل التطبيق، لا بعد أن يخطئ المستخدم.</p>
<p>الدرس خريطةُ طريق أكثر منه تطبيقًا: نمرّ على الميزات الكبرى — التخطيطات المتداخلة، والتوجيه المبني على الملفات، وتحميل البيانات بالتوازي، والجلب المسبق، والذاكرة المؤقتة — ونترك كل تفصيلٍ منها لدرسٍ مستقل. وفي نهايته ننتقل إلى العمل مباشرةً: إنشاء مشروع جديد وتثبيت الموجّه داخله.</p>
<h2 id="موجه-لا-إطار-عمل">موجّهٌ لا إطارُ عمل</h2>
<p><code>TanStack Router</code> ليس إطار عمل متكامل بمعنى <code>Next.js</code>، بل هو طبقةُ تنقّل تجلس داخل تطبيقك أنت. بنيةُ المشروع وأدواتُ البناء والخادم ملكك أنت، والمكتبة تتكفّل بشجرة المسارات والتنقّل بينها.</p>
<p>وهذا الفرق ليس ترفًا: لو كانت المكتبة إطارًا كاملًا لما استطعتَ نقل مساراتك إلى مشروع قائم دون إعادة كتابةٍ من الصفر. ولهذا صُمّمت لتكون قابلةً للترقية إلى إطار عمل كامل، وهي فعليًا ما يشغّل إطارَ العمل <code>TanStack Start</code> الذي كان في مرحلة تجريبية (بيتا) وقت تصوير الدورة. ومَن أراد تعلّم <code>TanStack Start</code> لاحقًا سيحتاج أوّلًا إلى إتقان موجّه <code>TanStack Router</code>.</p>
<p>ويشير الدرس أيضًا إلى جدولِ مقارنة بين أشهر موجّهات <code>React</code> — <code>TanStack Router</code> و<code>React Router</code> وموجّه <code>Next.js</code> — قد يساعدك على اختيار الموجّه المناسب لمشروعٍ جديد.</p>
<h2 id="الأمان-النوعي-ماذا-يعني-آمن-الأنواع-بالكامل">الأمانُ النوعي: ماذا يعني «آمنُ الأنواع بالكامل»؟</h2>
<p>الوعدُ الأساسيّ في المكتبة أنّ كل عملية تنقّل — من رابطٍ في الصفحة إلى استدعاءٍ برمجيّ للموجّه — يمرّ على فحصِ <code>TypeScript</code>. فلا يكفي أن يعرف المحرّر اسمَ المسار؛ عليه أن يعرف عنوانه الكامل، ونوع معاملاته، وشكلَ ما يعود من التحقّق.</p>
<p>وأنواعُ المسارات لا تُكتب يدويًّا؛ «دعم <code>TypeScript</code> المُستنتَج» يعني أنّ الأنواع تُشتقّ من شجرة المسارات المولَّدة تلقائيًّا، فتبقى الروابطُ والتطبيقُ متوافقَين لأنّ مصدرَهما واحد. (توضيح من عندي: هذه الآلية تظهر بوضوح في درس التوجيه المبني على الملفات، وهو من الدروس التالية.)</p>
<p>ويمتدّ الأمر إلى معاملات البحث (search params): يمكن جعلها آمنةِ الأنواع، والتحقّق من قيمها قبل أن تصل إلى الصفحة، وتعديلها بسهولة.</p>
<h2 id="الميزات-التي-سنعود-إليها-في-الدروس-التالية">الميزاتُ التي سنعود إليها في الدروس التالية</h2>
<ul>
<li><strong>التخطيطات المتداخلة ومجموعاتُ التخطيط</strong> — تخطيطاتٌ تشارك تبويباتٍ أو أشرطةً بين صفحاتٍ مختلفة.</li>
<li><strong>التوجيه المبني على الملفات</strong> — شجرةُ مساراتٍ تُولَّد من مجلّد <code>routes</code>، مع ملفّ <code>routeTree.gen.ts</code> مولَّدٍ تلقائيًّا.</li>
<li><strong>تحميلُ البيانات بالتوازي والجلبُ المسبق</strong> — طلبُ بياناتِ صفحةٍ واحدةٍ معًا بدل واحدةٍ تلو الأخرى.</li>
<li><strong>الذاكرةُ المؤقتة المدمجة</strong> — تخزينُ نتائج التحقّق وإعادةُ استخدامها.</li>
<li><strong>التكامل مع <code>TanStack Query</code></strong> — طبقةُ بياناتٍ فوق طبقة التنقّل.</li>
<li><strong>السياق (context)</strong> — حالةٌ مشتركةٌ بين عدّة مسارات، تُستعمل مثلًا في المصادقة (authentication) لحماية مساراتٍ معيّنة.</li>
<li><strong>دوالُ المُحمِّل (loader) وبثُّ البيانات</strong> — تحميلُ بياناتِ المسار ضمن مساره لا خارجه.</li>
</ul>
<h2 id="الشيفرة-التي-سنبني-عليها">الشيفرةُ التي سنبني عليها</h2>
<p>الفرع <code>main</code> — وهو الفرع الذي تنطلق منه الدورة — يحتوي هيكل مشروع <code>Vite</code> و<code>React</code> مع <code>TypeScript</code>، مضافًا إليه موجّهُ <code>TanStack Router</code> وأدواتُه. هذه بعض أجزائه.</p>
<p>في ملفّ الاعتماديات تظهر ثلاثُ حزمٍ لا بدّ منها: <code>@tanstack/react-router</code> وهي المكتبة نفسها، و<code>@tanstack/react-router-devtools</code> وهي أدوات المطوّر، و<code>@tanstack/router-plugin</code> وهي إضافةُ البناء المولِّدة لشجرة المسارات. لاحظ أن الأخيرة تقع في اعتماديات التطوير، فهي لا تُشحن مع التطبيق:</p>
<pre><code class="language-json">  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@tailwindcss/vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.12&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-router&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.28&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/react-router-devtools&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.28&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tailwindcss&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^4.1.12&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@eslint/js&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^9.33.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@tanstack/router-plugin&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.131.28&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.10&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@types/react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^19.1.7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@vitejs/plugin-react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^5.0.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eslint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^9.33.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eslint-plugin-react-hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^5.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eslint-plugin-react-refresh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^0.4.20&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;globals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^16.3.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;~5.8.3&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;typescript-eslint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^8.39.1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;vite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^7.1.2&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وتسجيلُ الإضافة يتمّ في ملفّ إعدادات البناء، داخل مصفوفة <code>plugins</code>. الإضافةُ تسبق إضافةَ <code>React</code> في الترتيب، ومعاملُ <code>target</code> فيها يحدّد إطارَ العمل المستهدَف:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;vite&quot;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@vitejs/plugin-react&quot;</span>;
<span class="hljs-keyword">import</span> tailwindcss <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tailwindcss/vite&quot;</span>;
<span class="hljs-keyword">import</span> { tanstackRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/router-plugin/vite&quot;</span>;

<span class="hljs-comment">// https://vite.dev/config/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">tanstackRouter</span>({
      <span class="hljs-attr">target</span>: <span class="hljs-string">&quot;react&quot;</span>,
    }),
    <span class="hljs-title function_">react</span>(),
    <span class="hljs-title function_">tailwindcss</span>(),
  ],
});
</code></pre>
<p>أمّا نقطةُ الدخول فهي كما هي في أيّ مشروع <code>Vite</code>: تُستورد الأنماطُ من <code>index.css</code>، ويُركَّب <code>&lt;App /&gt;</code> داخل <code>StrictMode</code>. وهي الموضع الذي سيُركَّب فيه الموجّه في الدروس القادمة، فكل ما نحتاجه الآن هو أن نعرف أين نقطةُ الانطلاق:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">StrictMode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>
<span class="hljs-keyword">import</span> { createRoot } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom/client&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;./index.css&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./App.tsx&#x27;</span>

<span class="hljs-title function_">createRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>)!).<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StrictMode</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">StrictMode</span>&gt;</span></span>,
)
</code></pre>
<p>وأمّا إعداداتُ <code>TypeScript</code> فهي صارمة: الوضعُ <code>strict</code> مفعّل، والمتغيّراتُ غير المستعملة خطأٌ لا تحذير، والأوامرُ المتشعّبة تكسر البناء. وليست هذه تفاصيلً تجميلية: الأمانُ النوعي الذي تعد به المكتبة لن يكون له أثرٌ حقيقيٌّ إن كان المشروعُ نفسه متساهلاً في فحص الأنواع.</p>
<pre><code class="language-json">    <span class="hljs-comment">/* Linting */</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;erasableSyntaxOnly&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUncheckedSideEffectImports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<h2 id="النتيجة">النتيجة</h2>
<p>بعد هذا الدرس صارت الإجابةُ عن سؤال «ما الذي سأستخدمه؟» واضحة: <code>TanStack Router</code> موجّهٌ آمنُ الأنواع بالكامل، يجمع التخطيطات المتداخلة والتوجيه المبني على الملفات والتحميلَ بالتوازي والجلبَ المسبق والذاكرةَ المؤقتة والتكاملَ مع <code>TanStack Query</code> ومعاملاتَ بحثٍ آمنةِ الأنواع وسياقًا مشتركًا ودوالَ مُحمِّل، وهو موجّهٌ لا إطارُ عمل، وقابلٌ للترقية إلى <code>TanStack Start</code>.</p>
<p>والمشروعُ الذي سنعمل عليه صار مهيّأً: إضافةُ <code>Vite</code> مسجّلةٌ في الترتيب الصحيح، وإعداداتُ <code>TypeScript</code> صارمة، ونقطةُ الدخول جاهزةٌ لاستقبال الموجّه. أمّا الخطوةُ التالية — كما في الدرس التالي — فهي إنشاءُ مشروعٍ جديد وتثبيتُ الموجّه فيه من الصفر.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>افتح فرع <code>main</code> من مستودع الدورة وتصفّح <code>vite.config.ts</code>: حدّد إضافةَ الموجّه وموضعَها في ترتيب <code>plugins</code>.</li>
<li>في <code>package.json</code> فرّق بين الحزمِ التي تُشحن مع التطبيق وتلك التي لا تُشحن إلا وقت البناء، وبيّن لماذا يُعدّ <code>@tanstack/router-plugin</code> من الثانية.</li>
<li>في <code>tsconfig.app.json</code> ابحث عن <code>&quot;strict&quot;: true</code> وقارن أثرَه بما كنتَ تكتتبه في مشاريعك السابقة.</li>
<li>اكتب قائمةً قصيرة بالميزات التي يحتاجها مشروعك القادم من الميزات المذكورة أعلاه، فستجد في الدروس التالية أين يجد كلٌّ منها مكانَه.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=0s">فيديو الدرس: مقدمة</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/main">شيفرة الدرس: فرع <code>main</code></a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «مقدمة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:c,html:l};export{s as book,a as chapter,n as chapterTitle,o as default,c as headings,l as html,t as slug,p as title};
