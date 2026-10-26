const s="tanstack-router",a="router",t="دورة TanStack Router الكاملة",n="code-based-router",e="الموجّه المبني على الكود (Code Based Router)",o=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"المسار-الجذر-نقطة-البداية",text:"المسار الجذر: نقطة البداية"},{depth:3,id:"المسارات-الأبناء-من-هو-أبو-المسار-وأين-عنوانه",text:"المسارات الأبناء: من هو أبو المسار، وأين عنوانه؟"},{depth:3,id:"تركيب-الشجرة",text:"تركيب الشجرة"},{depth:3,id:"إنشاء-الموجه-وعرضه",text:"إنشاء الموجّه وعرضه"},{depth:3,id:"لماذا-لا-تظهر-صفحة-البداية-دور-outlet",text:"لماذا لا تظهر صفحة البداية؟ دور Outlet"},{depth:3,id:"أدوات-المطور-كشف-شجرة-المسارات",text:"أدوات المطوّر: كشف شجرة المسارات"},{depth:3,id:"لماذا-لا-يكون-هذا-الأسلوب-المفضل",text:"لماذا لا يكون هذا الأسلوب المفضّل؟"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>كل تطبيق يستعمل TanStack Router يحتاج أوّلًا إلى <strong>شجرة مسارات</strong>: عقدةُ جذر، وأبناءُ لها، وأبناءُ للأبناء. وفي هذا الدرس نبني هذه الشجرة بأيدينا داخل الشيفرة: نُنشئ المسارَ الجذر، ثم مسارين أبناء له، أحدهما لصفحة البداية والآخر لصفحة <code>About</code>، ثم نركّب الشجرة ونسلّمها إلى الموجّه الذي يعرضها في التطبيق.</p>
<p>فهمُ هذا الأسلوب مهمّ لسببين. أوّلًا، به تعرف ما الذي تولّده المكتبةُ تلقائيًا في الأسلوب المبني على الملفات، فتقرأ الشجرةَ المولَّدة في الدرس التالي وأنت تفهم كلَّ جزء فيها. وثانيًا، الدرسُ يكشف أخطاءً شائعةً في بناء الموجّه يدويًا: أن تعرّف المسارات وتنسى تركيبَ الشجرة، أو أن تنسى <code>&lt;Outlet /&gt;</code> فلا يظهر محتوى الصفحة أصلًا. وهذه الأخطاءُ تظهر هنا في الصفحة أمام عينيك، لا في سجلّ الأخطاء.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="المسار-الجذر-نقطة-البداية">المسار الجذر: نقطة البداية</h3>
<p>المسارُ الجذر في TanStack Router لا يُعرَّف في ملف، بل يُنشأ باستدعاء <code>createRootRoute</code>. وهو مسارٌ بلا عنوان في الرابط، ودائمُ المطابقة، أي أنّه يبقى معروضًا مهما كانت الصفحة التي تتصفّحها. ولأنّه أبوُ كلّ المسارات الأخرى، فإنّ المكوّن الذي نمرّره إليه يُعرض فوق كل صفحة في التطبيق.</p>
<p>والمكوّنُ الذي نمرّره إلى <code>createRootRoute</code> مجرّد دالة تُرجع JSX، وليس لازمًا أن يكون في الملف نفسه: يكفي أن نعرّفه في ملفٍ مستقلّ ونستورده هنا. وهذا هو أوّلُ جزءٍ من <code>src/main.tsx</code> في هذا الدرس:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">StrictMode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> { createRoot } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom/client&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./index.css&quot;</span>;
<span class="hljs-keyword">import</span> {
  createRootRoute,
  createRoute,
  createRouter,
  <span class="hljs-title class_">Outlet</span>,
  <span class="hljs-title class_">RouterProvider</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TanStackRouterDevtools</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router-devtools&quot;</span>;
</code></pre>
<p>ثمّ يُعرَّف المسارُ الجذر ومكوّنه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> rootRoute = <span class="hljs-title function_">createRootRoute</span>({
  <span class="hljs-attr">component</span>: <span class="hljs-function">() =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-green-500 p-2&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>Root Route<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TanStackRouterDevtools</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;top-right&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  ),
});
</code></pre>
<p>وفيه ثلاثُ نقاط: <code>createRootRoute</code> هي ما ينشئ المسارَ الجذر، و<code>component</code> هو المكوّنُ الذي يُعرض دائمًا تحت أيّ صفحة، و<code>&lt;Outlet /&gt;</code> هو مكانُ ظهور المسار الابن، وسنشرح في قسمٍ لاحق لماذا لا يظهر محتوى الصفحة قبل إضافته.</p>
<h3 id="المسارات-الأبناء-من-هو-أبو-المسار-وأين-عنوانه">المسارات الأبناء: من هو أبو المسار، وأين عنوانه؟</h3>
<p>لإنشاء المسارات أبناء نستخدم <code>createRoute</code>، وهي الدالةُ التي نمرّر إليها الخياراتُ التي تصف المسار: من هو أبوه، وما عنوانه في الرابط، وأيّ مكوّن يُعرض عند زيارته.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> indexRoute = <span class="hljs-title function_">createRoute</span>({
  <span class="hljs-attr">getParentRoute</span>: <span class="hljs-function">() =&gt;</span> rootRoute,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/&quot;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-keyword">function</span> <span class="hljs-title function_">Index</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-violet-500&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
});
</code></pre>
<p>ويُنشأ المسارُ الثاني بالشكل نفسه تقريبًا، مع اختلاف العنوان والمكوّن:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> aboutRoute = <span class="hljs-title function_">createRoute</span>({
  <span class="hljs-attr">getParentRoute</span>: <span class="hljs-function">() =&gt;</span> rootRoute,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&quot;/about&quot;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-keyword">function</span> <span class="hljs-title function_">Index</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-pink-600&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-bold&quot;</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
});
</code></pre>
<p>وهنا ثلاثُ نقاطٍ تستحقّ الانتباه:</p>
<ol>
<li><strong><code>getParentRoute</code></strong> دالةٌ تُرجع المسارَ الأب، أي <code>rootRoute</code> هنا. ولازم في كلّ مسارٍ من مساراتنا، لأنّها هي التي تتيح للمكتبة أن تعرف موقعَ المسار في الشجرة، وبذلك نحصل على أمانِ الأنواع الذي سنراه لاحقًا.</li>
<li><strong><code>path</code></strong> هو العنوانُ الذي يطابقه المسارُ في الرابط؛ فالشرطةُ المائلة وحدها لصفحة البداية، و<code>/about</code> للصفحة الثانية.</li>
<li><strong><code>component</code></strong> هو ما يُعرض عند زيارة المسار. ولنا أن نضعه في ملفٍ منفصل ونستورده، لكنّ المؤلّفَ كتبه داخل الملف نفسه لتبسيط المثال.</li>
</ol>
<h3 id="تركيب-الشجرة">تركيب الشجرة</h3>
<p>تعريفُ المسارات بأبنائها لا يكفي، فنحتاج كذلك إلى تركيب الشجرة نفسها. ونفعل ذلك بأن نأخذ المسارَ الجذر ونضيف إليه أبناءه:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> routeTree = rootRoute.<span class="hljs-title function_">addChildren</span>([indexRoute, aboutRoute]);
</code></pre>
<p>لاحظ أنّنا نكرّر هنا ما سبق أن ذكرناه في <code>getParentRoute</code>: مع أنّ كلَّ مسارٍ يذكر أبوه، تبقى إضافةُ الأبناء إلى الأب ضروريةً لبناء الشجرة. وهذه الشجرةُ يمكن أن تكبر: فإضافةُ أبناء إلى <code>aboutRoute</code> أيضًا ممكنة، ثم أبناءَ إليهم، وهكذا يتكوّن تطبيقٌ متشعّب.</p>
<h3 id="إنشاء-الموجه-وعرضه">إنشاء الموجّه وعرضه</h3>
<p>بعد أن اكتملت الشجرة، نُنشئ الموجّهَ نفسه ونمرّر له الشجرة في خيار <code>routeTree</code>، ثم نعرضه مكان التطبيق:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> router = <span class="hljs-title function_">createRouter</span>({ routeTree });

<span class="hljs-title function_">createRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;root&quot;</span>)!).<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StrictMode</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">RouterProvider</span> <span class="hljs-attr">router</span>=<span class="hljs-string">{router}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">StrictMode</span>&gt;</span></span>
);
</code></pre>
<p>الترتيبُ هنا مهمّ: أوّلًا الشجرة، ثم الموجّه، ثم العرض. أمّا <code>createRoot</code> فيأخذ العنصرَ الذي يحمل المعرّف <code>root</code> من <code>index.html</code>، وهو العنصرُ الذي كان يستضيف التطبيقَ الافتراضي قبل هذا الدرس، ثم نمرّر إليه <code>RouterProvider</code> الذي يتولّى عرضَ الموجّه مكانه.</p>
<h3 id="لماذا-لا-تظهر-صفحة-البداية-دور-outlet">لماذا لا تظهر صفحة البداية؟ دور Outlet</h3>
<p>أوّلُ تشغيلٍ يعرض لك المسارَ الجذر فقط: يظهر الشريطُ الأخضر وعنوانُه، ولا تظهر صفحةُ البداية. والسببُ أنّ المسارَ الجذر يعرض أبناءه، فإذا لم يطلب منهم ذلك فلن تظهر.</p>
<p>والمكانُ الذي يوضع فيه <code>&lt;Outlet /&gt;</code> داخل المكوّن الجذر هو:</p>
<pre><code class="language-tsx">    &lt;div className=<span class="hljs-string">&quot;bg-green-500 p-2&quot;</span>&gt;
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-2xl font-bold&quot;</span>&gt;</span>Root Route<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TanStackRouterDevtools</span> <span class="hljs-attr">position</span>=<span class="hljs-string">&quot;top-right&quot;</span> /&gt;</span></span>
    &lt;/div&gt;
</code></pre>
<p><code>&lt;Outlet /&gt;</code> هو المكوّنُ المخصّص في TanStack Router لعرض المسارِ الابن في موضعه. وبمجرد إضافته إلى المكوّن الجذر، تظهر صفحةُ البداية، ويصبح الانتقالُ إلى <code>/about</code> ممكنًا.</p>
<h3 id="أدوات-المطور-كشف-شجرة-المسارات">أدوات المطوّر: كشف شجرة المسارات</h3>
<p>أدواتُ المطوّر ثُبِّتت مع المكتبة في الحزمة <code>@tanstack/react-router-devtools</code>، ونستوردها هكذا:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">TanStackRouterDevtools</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router-devtools&quot;</span>;
</code></pre>
<p>ونعرضها في أعلى يمين الشاشة من داخل المكوّن الجذر:</p>
<pre><code class="language-tsx">      &lt;<span class="hljs-title class_">TanStackRouterDevtools</span> position=<span class="hljs-string">&quot;top-right&quot;</span> /&gt;
</code></pre>
<p>داخل الأداة تُعرض المسارات، والمعلَّمةُ باللون الأخضر هي المساراتُ المطابَق حاليًا، أي المكوّناتُ المعروضة في هذه اللحظة. وأنت في صفحة البداية، فالأخضرُ هو المسارُ الجذر وصفحةُ البداية معًا. وبالنقر على السهم بجوار أيّ مسار تنتقل إلى <code>/about</code>، فيتحوّل الأخضرُ إلى المسار الجذر وصفحة <code>About</code>. وكلّما تعمّقت الشجرةُ بمداخلَ متداخلة، ازدادت الأداةُ نفعًا في تتبّع ما يجري داخل الموجّه.</p>
<h3 id="لماذا-لا-يكون-هذا-الأسلوب-المفضل">لماذا لا يكون هذا الأسلوب المفضّل؟</h3>
<p>الأسلوبُ المبني على الكود يعني أنّك تعرّف كلَّ مسارٍ بيدك: تذكر أبوه، وعنوانه، ومكوّنه، ثم تركّب الشجرةَ يدويًا. ومع تزايد عدد المسارات وعمق التداخل، تصير هذه الأعمالُ اليدوية مصدرًا للأخطاء، ويصبح الموجّهُ أكثر عرضةً للخلل.</p>
<p>أمّا الأسلوبُ المبني على الملفات فيولّد لك ذلك كلَّه: تنشئ مجلّداتٍ وأشجارًا من الملفات، فتولّد المكتبةُ إعدادَ المسارات والشجرةَ تلقائيًا. فلا تحتاج إلى ذكر المسار الأب ولا العنوان ولا إلى تركيب الشجرة بنفسك. ويذكر التوثيقُ أنّ هذا هو الأسلوبُ المفضّل، وأنّ معظمَ أمثلته مكتوبةٌ به.</p>
<blockquote>
<p><strong>توضيح من عندي:</strong> ما يمكن إنجازه بالأسلوب المبني على الملفات يمكن إنجازه بالأسلوب المبني على الكود أيضًا إن أردت، فالأمران متاحان في المكتبة معًا. والدرسُ التالي يحوّل تطبيقَ هذا الدرس إلى الأسلوب المبني على الملفات، ثم نكمل بقيةَ الدورة عليه.</p>
</blockquote>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--code-based-router--home.png" alt="الشريطُ الأخضر للمسار الجذر وعنوانُه، وتحته كتلةٌ بنفسجية تحمل كلمة Home"></p>
<p>في الصورة صفحةُ البداية <code>/</code>: الشريطُ الأخضر في الأعلى هو المسارُ الجذر، وهو معروضٌ دائمًا وفيه عنوانُه «Root Route»، وتحته الكتلةُ البنفسجية هي صفحةُ <code>Home</code> التي يعرضها <code>&lt;Outlet /&gt;</code> في موضع المسار الابن. وفي الزاوية العليا اليمنى تظهر أداةُ المطوّر.</p>
<p><img src="/arabic-cs-library/images/tanstack-router/router--code-based-router--about.png" alt="الشريطُ الأخضر للمسار الجذر، وتحته كتلةٌ وردية تحمل كلمة About"></p>
<p>وفي الصورة صفحةُ <code>/about</code>: الشريطُ الجذري نفسه في موضعه لأنّه أبٌ لكل المسارات، وتحتُه الكتلةُ الوردية التي تعرض صفحةَ <code>About</code>. ولاحظ أنّ ما تغيّر بين الصورتين هو محتوى <code>&lt;Outlet /&gt;</code> فقط، أمّا إطارُ المسار الجذر فبقي كما هو.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>استنسخ مستودعَ الدورة وانتقل إلى فرع <code>code-based-init</code>، ثم افتح <code>src/main.tsx</code>.</li>
<li>احذف استيراد مكوّن التطبيق الافتراضي وتصييره، وأنشئ بدلًا منهما <code>rootRoute</code> بـ <code>createRootRoute</code> ومكوّنًا فيه عنوانُ Root Route.</li>
<li>أنشئ <code>indexRoute</code> و<code>aboutRoute</code> بـ <code>createRoute</code>، مع <code>getParentRoute</code> و<code>path</code> و<code>component</code> لكلٍّ منهما.</li>
<li>ركّب الشجرةَ بـ <code>rootRoute.addChildren([indexRoute, aboutRoute])</code>، ثم أنشئ الموجّهَ بـ <code>createRouter({ routeTree })</code> واعرضه بـ <code>RouterProvider</code> داخل <code>StrictMode</code>.</li>
<li>احذف <code>&lt;Outlet /&gt;</code> من المكوّن الجذر مؤقتًا، ثم شغّل <code>npm run dev</code> وشاهد كيف يختفي محتوىُ الصفحة، ثم أعِده ليعود.</li>
<li>أضِف <code>&lt;TanStackRouterDevtools position=&quot;top-right&quot; /&gt;</code>، ثم تنقّل بين الصفحتين من داخل الأداة ولاحظ تغيّرَ المسارات المعلَّمة بالأخضر.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=434s">فيديو الدرس: Code Based Router</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/code-based-init">شيفرة الدرس: فرع code-based-init</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Code Based Router» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:t,slug:n,title:e,headings:o,html:l};export{s as book,a as chapter,t as chapterTitle,c as default,o as headings,l as html,n as slug,e as title};
