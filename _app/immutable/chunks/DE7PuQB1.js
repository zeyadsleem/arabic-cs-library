const s="kinney",a="react-performance",n="أداء React",l="react-19-compiler-guide",p="مصرّف React 19 (React Compiler)",t=[{depth:2,id:"كيف-يعمل-مصرف-react-فعليا",text:"كيف يعمل مصرّف React فعليًا"},{depth:3,id:"شجرة-قرارات-المصرف",text:"شجرة قرارات المصرّف"},{depth:2,id:"التحضير-قبل-الترحيل",text:"التحضير قبل الترحيل"},{depth:3,id:"الخطوة-1-فعل-الوضع-الصارم-في-كل-مكان",text:"الخطوة 1: فعّل الوضع الصارم في كل مكان"},{depth:3,id:"الخطوة-2-دقق-في-تحسيناتك-الحالية",text:"الخطوة 2: دقّق في تحسيناتك الحالية"},{depth:3,id:"الخطوة-3-أصلح-انتهاكات-قواعد-react",text:"الخطوة 3: أصلح انتهاكات قواعد React"},{depth:2,id:"تفعيل-مصرف-react",text:"تفعيل مصرّف React"},{depth:3,id:"التثبيت-والإعداد",text:"التثبيت والإعداد"},{depth:3,id:"استراتيجية-الترحيل-التدريجي",text:"استراتيجية الترحيل التدريجي"},{depth:2,id:"قياس-أثر-المصرف",text:"قياس أثر المصرّف"},{depth:3,id:"المقاييس-قبل-التفعيل-وبعده",text:"المقاييس قبل التفعيل وبعده"},{depth:3,id:"مقارنة-مقاييس-المستخدمين-الحقيقيين",text:"مقارنة مقاييس المستخدمين الحقيقيين"},{depth:2,id:"متى-لا-يستطيع-المصرف-المساعدة",text:"متى لا يستطيع المصرّف المساعدة"},{depth:3,id:"أنماط-الشيفرة-الديناميكية",text:"أنماط الشيفرة الديناميكية"},{depth:3,id:"الاعتمادات-الخارجية",text:"الاعتمادات الخارجية"},{depth:3,id:"منطق-الحالة-المعقد",text:"منطق الحالة المعقّد"},{depth:2,id:"أنماط-الترحيل-وأفضل-الممارسات",text:"أنماط الترحيل وأفضل الممارسات"},{depth:3,id:"النمط-1-إزالة-حفظ-النتائج-الزائد",text:"النمط 1: إزالة حفظ النتائج الزائد"},{depth:3,id:"النمط-2-الإبقاء-على-التحسينات-اليدوية-الاستراتيجية",text:"النمط 2: الإبقاء على التحسينات اليدوية الاستراتيجية"},{depth:3,id:"النمط-3-تصميم-مكونات-صديقة-للمصرف",text:"النمط 3: تصميم مكوّنات صديقة للمصرّف"},{depth:2,id:"تصحيح-مشكلات-المصرف",text:"تصحيح مشكلات المصرّف"},{depth:2,id:"لوحة-مقارنة-الأداء",text:"لوحة مقارنة الأداء"},{depth:2,id:"قائمة-تدقيق-الترحيل",text:"قائمة تدقيق الترحيل"},{depth:2,id:"إرشادات-تبني-لن-تلدغك",text:"إرشادات تبنّي لن تلدغك"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>يمثّل مصرّف React (React Compiler) أكبر تحوّل في تحسين أداء React منذ الخُطّافات. فبدلًا من رشّ <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> في أنحاء مستودعك كأنها غبار الأداء السحري، يحلّل المصرّف شيفرتك وقت البناء ويطبّق التحسينات تلقائيًا في المواضع التي تهمّ فعلًا. فالأمر ليس جعل React أسرع — بل جعل تحسين React تلقائيًا.</p>
<p>لكن إليك الحقيقة: المصرّف ليس سحرًا. إنه أداة تحليل ساكن متطوّرة تفهم قواعد React وأنماطها. لا يستطيع تحسين شيفرة تنتهك تلك القواعد، ولن ينقذك من مشكلات معمارية جوهرية. يعرض عليك هذا الدليل بالتفصيل كيفية عمل المصرّف، وكيف تهيّئ مستودعك له، وما يستطيع فعله وما لا يستطيع، وكيف تقيس ما إذا كان يساعد تطبيقك تحديدًا فعلًا.</p>
<blockquote>
<p><strong>لا يزال مصرّف React في مرحلة ما قبل الإصدار.</strong></p>
<p>وقت كتابة هذه السطور — 1 أكتوبر 2025 — انتقل مصرّف React من «بيتا» إلى إصدار مرشّح (RC) في أبريل 2025. ويقول <a href="https://react.dev/blog/2025/04/21/react-compiler-rc">فريق React إن الإصدار المرشّح «مستقر وقريب من النهائي» وآمن للتجربة في الإنتاج</a>، وإن لم يكن وسم «المستقر» النهائي بعد.</p>
<p>لذا سنتحدّث عنه، مع التحفّظ بأن الأمور <em>قد</em> تتغيّر قليلًا.</p>
</blockquote>
<p><strong>ملاحظة جديرة بالانتباه</strong>: مصرّف React رائع، لكنه ليس سحرًا. يستحق التفعيل لدى معظم الفرق التي تكتب React على النمط الاصطلاحي — تعامل معه فقط كسياج حماية لحفظ النتائج، لا كحلّ شامل.</p>
<p>يُؤتمت المصرّف الأجزاء المملّة من حفظ النتائج — تثبيت القيم والدوال حتى تتخطّى المكوّنات العمل غير الضروري — فيقلّل الحاجة إلى <code>useMemo</code> و<code>useCallback</code> وكثير من أسوار <code>React.memo</code>. وهذا يخفض مباشرةً إعادات التصيير الناتجة عن تقلّب الخصائص دون أن ترشّ شيفرة تخزين يدوية في كل مكان.</p>
<p><strong>إليك الأمر</strong>: ما زال عليك كتابة React «صحيحة». (آسف على ذلك.)</p>
<ul>
<li>يفترض المصرّف الالتزام <a href="https://react.dev/reference/rules">بقواعد React (the Rules of React)</a>. فيجب أن تكون المكوّنات نقية وعديمة الأثر التكراري، وأن تُعامَل الخصائص والحالة كغير قابلة للتغيير، وأن تُبقى التأثيرات الجانبية خارج التصيير. وإن انتهكت شيفرتك هذه القواعد، فإما أن يتخطّى المصرّف التحسين، وإما أن ترى <em>غرابة</em> وقت التشغيل.</li>
<li>حفظ النتائج من أجل صحّة السلوك سلاح قابل للانطلاق في القدم. إن كان تطبيقك يعتمد على تساوي المراجع (referential equality) — مثل تأثيرات لا تعمل إلا لأن هوية كائن ما تبقى مستقرة — فقد <a href="https://react.dev/learn/react-compiler/debugging">يحفظ المصرّف النتائج بطريقة مختلفة</a> فيكشف تلك الأخطاء: تخيّل تأثيرات تُطلَق أكثر من اللازم أو حلقات لا تنتهي. والإصلاح هو إزالة الاعتماد، لا مصارعة المصرّف.</li>
<li><a href="https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library">توافق المكتبات متفاوت</a>. تشير قواعد الفحص (lints) الرسمية إلى بعض الأنماط بأنها «غير متوافقة»، وسيتخطّى المصرّف تلك المناطق بأمان؛ وأنماط المراقب (observer) على طريقة MobX مزلق معروف قد تحتاج إلى الاستثناء منه.</li>
<li>قد تصبح عمليات البناء أبطأ قليلًا. يدمج <a href="https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler">Next.js</a> إضافة Babel مع تحسين SWC لإبقاء الأثر صغيرًا، لكنك قد تلاحظ مع ذلك كلفة إضافية مقارنةً بخطوط أنابيب SWC وحدها.</li>
<li>النطاق مهم. يركّز المصرّف على حفظ النتائج. وهو <em>لن</em> يغني عن معمارية الحالة الصحيحة، أو المحاكاة الافتراضية (virtualization)، أو Suspense والبثّ، أو إصلاح شلالات الشبكة — فما زلت بحاجة إلى تلك الأنماط.</li>
</ul>
<blockquote>
<p><strong>باختصار</strong></p>
<p>يُؤتمت حفظ النتائج — وهذا ممتاز لتقلّب الخصائص وهوية دوال الاستدعاء — لكنه لا يغني عن معمارية حالة جيدة، ولا عن المحاكاة الافتراضية للقوائم الضخمة، ولا عن حلّ شلالات الشبكة واستراتيجية SSR. ما زلت تصمّم من أجل ذلك؛ فالمصرّف يزيل فقط صنفًا كبيرًا من إعادات التصيير حتى تبرز بقية أعمالك.</p>
<ul>
<li><strong>متى يكون مكسبًا واضحًا</strong> أنت تلتزم أصلًا بقواعد React وتتجنّب التأثيرات الجانبية أثناء التصيير. ومعظم «مشكلات الأداء» تأتي من تقلّب هوية الخصائص ودوال الاستدعاء غير المستقرة وإعادة حساب البيانات المشتقّة — والمصرّف يحيّد كثيرًا من ذلك تلقائيًا.
<ul>
<li>أنت تلتزم أصلًا بقواعد React وتتجنّب التأثيرات الجانبية أثناء التصيير.</li>
<li>ومعظم «مشكلات الأداء» تأتي من تقلّب هوية الخصائص ودوال الاستدعاء غير المستقرة وإعادة حساب البيانات المشتقّة — والمصرّف يحيّد كثيرًا من ذلك تلقائيًا.</li>
</ul>
</li>
<li><strong>متى تتراجع أو تقيّده</strong> أنت تعتمد على حفظ النتائج لضمان صحّة السلوك (اعتمادات تأثيرات يجب أن تبقى مستقرة مرجعيًا، ومنطق شرطي مبني على فحوص المراجع). نظّف ذلك أولًا أو استثنِ الملفات المشكلة. أنت تستخدم مكتبات أو أنماطًا تصفها قواعد الفحص بأنها غير متوافقة. أبقِ تلك المسارات بلا تصريف.
<ul>
<li>أنت تعتمد على حفظ النتائج لضمان صحّة السلوك (اعتمادات تأثيرات يجب أن تبقى مستقرة مرجعيًا، ومنطق شرطي مبني على فحوص المراجع). نظّف ذلك أولًا أو استثنِ الملفات المشكلة.</li>
<li>أنت تستخدم مكتبات أو أنماطًا تصفها قواعد الفحص بأنها غير متوافقة. أبقِ تلك المسارات بلا تصريف.</li>
</ul>
</li>
</ul>
</blockquote>
<h2 id="كيف-يعمل-مصرف-react-فعليا">كيف يعمل مصرّف React فعليًا</h2>
<p>يعمل المصرّف وقت البناء، فيحوّل شيفرة React لديك قبل أن تصل إلى المتصفح أصلًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// What you write (clean, simple React)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product, onAddToCart }: <span class="hljs-title class_">ProductCardProps</span></span>) {
  <span class="hljs-keyword">const</span> discount = product.<span class="hljs-property">price</span> * product.<span class="hljs-property">discountRate</span>;
  <span class="hljs-keyword">const</span> finalPrice = product.<span class="hljs-property">price</span> - discount;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAdd</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">trackEvent</span>(<span class="hljs-string">&#x27;add_to_cart&#x27;</span>, { <span class="hljs-attr">productId</span>: product.<span class="hljs-property">id</span> });
    <span class="hljs-title function_">onAddToCart</span>(product.<span class="hljs-property">id</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.image}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;price&quot;</span>&gt;</span>\${finalPrice.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      {discount &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;discount&quot;</span>&gt;</span>Save \${discount.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleAdd}</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// What the compiler generates (optimized but equivalent)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product, onAddToCart }: <span class="hljs-title class_">ProductCardProps</span></span>) {
  <span class="hljs-comment">// Compiler adds memoization for expensive computations</span>
  <span class="hljs-keyword">const</span> discount = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> product.<span class="hljs-property">price</span> * product.<span class="hljs-property">discountRate</span>,
    [product.<span class="hljs-property">price</span>, product.<span class="hljs-property">discountRate</span>],
  );

  <span class="hljs-keyword">const</span> finalPrice = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> product.<span class="hljs-property">price</span> - discount, [product.<span class="hljs-property">price</span>, discount]);

  <span class="hljs-comment">// Compiler stabilizes callback identity</span>
  <span class="hljs-keyword">const</span> handleAdd = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">trackEvent</span>(<span class="hljs-string">&#x27;add_to_cart&#x27;</span>, { <span class="hljs-attr">productId</span>: product.<span class="hljs-property">id</span> });
    <span class="hljs-title function_">onAddToCart</span>(product.<span class="hljs-property">id</span>);
  }, [product.<span class="hljs-property">id</span>, onAddToCart]);

  <span class="hljs-comment">// Compiler can even optimize JSX creation</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.image}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;price&quot;</span>&gt;</span>\${finalPrice.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        {discount &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;discount&quot;</span>&gt;</span>Save \${discount.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleAdd}</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    ),
    [product.<span class="hljs-property">image</span>, product.<span class="hljs-property">name</span>, finalPrice, discount, handleAdd],
  );
}
</code></pre>
<h3 id="شجرة-قرارات-المصرف">شجرة قرارات المصرّف</h3>
<p>يستخدم المصرّف استدلالات متطوّرة لتحديد ما ينبغي تحسينه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Compiler optimization decision flowchart</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CompilerDecisionCriteria</span> {
  <span class="hljs-comment">// Will optimize</span>
  <span class="hljs-attr">willOptimize</span>: {
    <span class="hljs-attr">expensiveComputations</span>: <span class="hljs-string">&#x27;Operations with high computational cost&#x27;</span>;
    <span class="hljs-attr">stableReferences</span>: <span class="hljs-string">&#x27;Functions and objects passed as props&#x27;</span>;
    <span class="hljs-attr">pureComponents</span>: <span class="hljs-string">&#x27;Components without side effects&#x27;</span>;
    <span class="hljs-attr">staticElements</span>: <span class="hljs-string">&#x27;JSX that rarely changes&#x27;</span>;
  };

  <span class="hljs-comment">// Won&#x27;t optimize</span>
  <span class="hljs-attr">wontOptimize</span>: {
    <span class="hljs-attr">trivialOperations</span>: <span class="hljs-string">&#x27;Simple property access or arithmetic&#x27;</span>;
    <span class="hljs-attr">alwaysChanging</span>: <span class="hljs-string">&#x27;Values that change on every render&#x27;</span>;
    <span class="hljs-attr">sideEffects</span>: <span class="hljs-string">&#x27;Operations with external dependencies&#x27;</span>;
    <span class="hljs-attr">dynamicCode</span>: <span class="hljs-string">&#x27;Code patterns it cannot analyze statically&#x27;</span>;
  };

  <span class="hljs-comment">// Context-dependent</span>
  <span class="hljs-attr">contextual</span>: {
    <span class="hljs-attr">listItems</span>: <span class="hljs-string">&#x27;Optimizes based on list size and complexity&#x27;</span>;
    <span class="hljs-attr">conditionals</span>: <span class="hljs-string">&#x27;Analyzes branch likelihood&#x27;</span>;
    <span class="hljs-attr">hooks</span>: <span class="hljs-string">&#x27;Considers hook dependencies and frequency&#x27;</span>;
  };
}
</code></pre>
<h2 id="التحضير-قبل-الترحيل">التحضير قبل الترحيل</h2>
<p>قبل تفعيل المصرّف، يحتاج مستودعك إلى الالتزام الصارم بقواعد React:</p>
<h3 id="الخطوة-1-فعل-الوضع-الصارم-في-كل-مكان">الخطوة 1: فعّل الوضع الصارم في كل مكان</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// The compiler requires Strict Mode for safety checks</span>
<span class="hljs-comment">// In your app root:</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StrictMode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StrictMode</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">YourAppContent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">StrictMode</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Strict Mode catches:</span>
<span class="hljs-comment">// - Components with side effects during render</span>
<span class="hljs-comment">// - Deprecated lifecycle methods</span>
<span class="hljs-comment">// - Unsafe practices the compiler can&#x27;t optimize</span>
</code></pre>
<h3 id="الخطوة-2-دقق-في-تحسيناتك-الحالية">الخطوة 2: دقّق في تحسيناتك الحالية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Script to analyze existing manual optimizations</span>
<span class="hljs-keyword">import</span> { parse } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/parser&#x27;</span>;
<span class="hljs-keyword">import</span> traverse <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/traverse&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">OptimizationAuditor</span> {
  <span class="hljs-keyword">private</span> stats = {
    <span class="hljs-attr">useMemo</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">useCallback</span>: <span class="hljs-number">0</span>,
    <span class="hljs-title class_">ReactMemo</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">totalComponents</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">suspiciousPatterns</span>: [] <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>[],
  };

  <span class="hljs-title function_">analyzeFile</span>(<span class="hljs-params"><span class="hljs-attr">filePath</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> code = fs.<span class="hljs-title function_">readFileSync</span>(filePath, <span class="hljs-string">&#x27;utf-8&#x27;</span>);
    <span class="hljs-keyword">const</span> ast = <span class="hljs-title function_">parse</span>(code, {
      <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
      <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&#x27;jsx&#x27;</span>, <span class="hljs-string">&#x27;typescript&#x27;</span>],
    });

    <span class="hljs-title function_">traverse</span>(ast, {
      <span class="hljs-title class_">CallExpression</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> node = path.<span class="hljs-property">node</span>;
        <span class="hljs-keyword">if</span> (node.<span class="hljs-property">callee</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;Identifier&#x27;</span>) {
          <span class="hljs-keyword">switch</span> (node.<span class="hljs-property">callee</span>.<span class="hljs-property">name</span>) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;useMemo&#x27;</span>:
              <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useMemo</span>++;
              <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkMemoUsage</span>(path, filePath);
              <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;useCallback&#x27;</span>:
              <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useCallback</span>++;
              <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkCallbackUsage</span>(path, filePath);
              <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;memo&#x27;</span>:
              <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">ReactMemo</span>++;
              <span class="hljs-keyword">break</span>;
          }
        }
      },
      <span class="hljs-title class_">FunctionDeclaration</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isReactComponent</span>(path.<span class="hljs-property">node</span>.<span class="hljs-property">id</span>?.<span class="hljs-property">name</span>)) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">totalComponents</span>++;
        }
      },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkMemoUsage</span>(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">filePath</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-comment">// Check for common anti-patterns</span>
    <span class="hljs-keyword">const</span> deps = path.<span class="hljs-property">node</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">if</span> (!deps) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">suspiciousPatterns</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`Missing dependencies in useMemo at <span class="hljs-subst">\${filePath}</span>\`</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkCallbackUsage</span>(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">filePath</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-comment">// Check for unnecessary callbacks</span>
    <span class="hljs-keyword">const</span> func = path.<span class="hljs-property">node</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">if</span> (func?.<span class="hljs-property">body</span>?.<span class="hljs-property">body</span>?.<span class="hljs-property">length</span> === <span class="hljs-number">1</span>) {
      <span class="hljs-comment">// Single statement callbacks might not need memoization</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">suspiciousPatterns</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`Possibly unnecessary useCallback at <span class="hljs-subst">\${filePath}</span>\`</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">isReactComponent</span>(<span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> !!name &amp;&amp; <span class="hljs-regexp">/^[A-Z]/</span>.<span class="hljs-title function_">test</span>(name);
  }

  <span class="hljs-title function_">generateReport</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;=== Optimization Audit Report ===&#x27;</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>({
      <span class="hljs-string">&#x27;Total Components&#x27;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">totalComponents</span>,
      <span class="hljs-string">&#x27;useMemo Calls&#x27;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useMemo</span>,
      <span class="hljs-string">&#x27;useCallback Calls&#x27;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useCallback</span>,
      <span class="hljs-string">&#x27;React.memo Wraps&#x27;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">ReactMemo</span>,
      <span class="hljs-string">&#x27;Suspicious Patterns&#x27;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">suspiciousPatterns</span>.<span class="hljs-property">length</span>,
    });

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">suspiciousPatterns</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n⚠️ Suspicious Patterns Found:&#x27;</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">suspiciousPatterns</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">pattern</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`  - <span class="hljs-subst">\${pattern}</span>\`</span>);
      });
    }

    <span class="hljs-comment">// Calculate optimization density</span>
    <span class="hljs-keyword">const</span> optimizationDensity =
      (<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useMemo</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">useCallback</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">ReactMemo</span>) /
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">totalComponents</span>;

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`\\nOptimization Density: <span class="hljs-subst">\${optimizationDensity.toFixed(<span class="hljs-number">2</span>)}</span> per component\`</span>);

    <span class="hljs-keyword">if</span> (optimizationDensity &gt; <span class="hljs-number">3</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
        <span class="hljs-string">&#x27;⚠️ High optimization density detected. The compiler will likely help significantly.&#x27;</span>,
      );
    }
  }
}

<span class="hljs-comment">// Run the audit</span>
<span class="hljs-keyword">const</span> auditor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">OptimizationAuditor</span>();
<span class="hljs-keyword">const</span> srcDir = <span class="hljs-string">&#x27;./src&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">walkDir</span>(<span class="hljs-params"><span class="hljs-attr">dir</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> files = fs.<span class="hljs-title function_">readdirSync</span>(dir);
  files.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">join</span>(dir, file);
    <span class="hljs-keyword">const</span> stat = fs.<span class="hljs-title function_">statSync</span>(filePath);

    <span class="hljs-keyword">if</span> (stat.<span class="hljs-title function_">isDirectory</span>()) {
      <span class="hljs-title function_">walkDir</span>(filePath);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (filePath.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.tsx&#x27;</span>) || filePath.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.jsx&#x27;</span>)) {
      auditor.<span class="hljs-title function_">analyzeFile</span>(filePath);
    }
  });
}

<span class="hljs-title function_">walkDir</span>(srcDir);
auditor.<span class="hljs-title function_">generateReport</span>();
</code></pre>
<h3 id="الخطوة-3-أصلح-انتهاكات-قواعد-react">الخطوة 3: أصلح انتهاكات قواعد React</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Common violations that break compiler optimization</span>

<span class="hljs-comment">// ❌ Bad: Side effects during render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BrokenComponent</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// This breaks compiler assumptions</span>
  <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;lastUserId&#x27;</span>, userId);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User: {userId}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Side effects in useEffect</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FixedComponent</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;lastUserId&#x27;</span>, userId);
  }, [userId]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User: {userId}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Bad: Mutating props or state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MutatingComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-comment">// Compiler can&#x27;t track mutations</span>
  items.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{items}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Create new arrays/objects</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ImmutableComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-comment">// Compiler can optimize immutable operations</span>
  <span class="hljs-keyword">const</span> sortedItems = [...items].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{sortedItems}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Bad: Conditional hooks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalHooks</span>(<span class="hljs-params">{ isSpecial }: { isSpecial: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">if</span> (isSpecial) {
    <span class="hljs-comment">// Breaks React&#x27;s rules and compiler optimization</span>
    <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Hooks at top level</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProperHooks</span>(<span class="hljs-params">{ isSpecial }: { isSpecial: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> [state] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-comment">// Use the state conditionally, not the hook</span>
  <span class="hljs-keyword">const</span> value = isSpecial ? state : <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تفعيل-مصرف-react">تفعيل مصرّف React</h2>
<p>ملاحظة: يركّز هذا الدليل على إعداد Vite. أما Webpack وغيره من المُجمِّعات فخارج النطاق حاليًا.</p>
<h3 id="التثبيت-والإعداد">التثبيت والإعداد</h3>
<pre><code class="language-bash"><span class="hljs-comment"># Install the compiler</span>
npm install --save-dev @react/compiler
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">react</span>({
      <span class="hljs-attr">babel</span>: {
        <span class="hljs-attr">plugins</span>: [
          [
            <span class="hljs-string">&#x27;babel-plugin-react-compiler&#x27;</span>,
            {
              <span class="hljs-attr">compilationMode</span>: <span class="hljs-string">&#x27;opt-in&#x27;</span>,
              <span class="hljs-attr">enableDebugInfo</span>: <span class="hljs-literal">true</span>,
            },
          ],
        ],
      },
    }),
  ],
});
</code></pre>
<h3 id="استراتيجية-الترحيل-التدريجي">استراتيجية الترحيل التدريجي</h3>
<p>ابدأ بالوضع الاختياري (opt-in) ثم توسّع تدريجيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Use directives to control compilation per file</span>

<span class="hljs-comment">// Option 1: Opt-in specific components</span>
<span class="hljs-string">&#x27;use compiler&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// This component will be compiled</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Optimized by compiler<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Option 2: Opt-out specific components</span>
(<span class="hljs-string">&#x27;use no-compiler&#x27;</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LegacyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// This component won&#x27;t be compiled</span>
  <span class="hljs-comment">// Useful for components with complex patterns</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Manual optimizations preserved<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Option 3: File-level configuration</span>
<span class="hljs-comment">// At the top of the file</span>
(<span class="hljs-string">&#x27;use compiler&#x27;</span>);

<span class="hljs-comment">// All components in this file will be compiled</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Component1</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">/* ... */</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Component2</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">/* ... */</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Component3</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">/* ... */</span>
}
</code></pre>
<h2 id="قياس-أثر-المصرف">قياس أثر المصرّف</h2>
<h3 id="المقاييس-قبل-التفعيل-وبعده">المقاييس قبل التفعيل وبعده</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Create a performance baseline before enabling compiler</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceBaseline</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">recordMetric</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(name, []);
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-title function_">push</span>(value);
  }

  <span class="hljs-title function_">getBaseline</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> values = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name) || [];
    <span class="hljs-keyword">if</span> (values.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">mean</span>: values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / values.<span class="hljs-property">length</span>,
      <span class="hljs-attr">median</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">median</span>(values),
      <span class="hljs-attr">p95</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(values, <span class="hljs-number">95</span>),
      <span class="hljs-attr">min</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(...values),
      <span class="hljs-attr">max</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...values),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">median</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[]): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = [...values].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> mid = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>);
    <span class="hljs-keyword">return</span> sorted.<span class="hljs-property">length</span> % <span class="hljs-number">2</span> === <span class="hljs-number">0</span> ? (sorted[mid - <span class="hljs-number">1</span>] + sorted[mid]) / <span class="hljs-number">2</span> : sorted[mid];
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">percentile</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">p</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = [...values].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>((p / <span class="hljs-number">100</span>) * sorted.<span class="hljs-property">length</span>) - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> sorted[index];
  }

  <span class="hljs-title function_">compareWithBaseline</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">newValue</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> baseline = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getBaseline</span>(name);
    <span class="hljs-keyword">if</span> (!baseline) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> improvement = ((baseline.<span class="hljs-property">mean</span> - newValue) / baseline.<span class="hljs-property">mean</span>) * <span class="hljs-number">100</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">baseline</span>: baseline.<span class="hljs-property">mean</span>,
      <span class="hljs-attr">current</span>: newValue,
      <span class="hljs-attr">improvement</span>: improvement.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>) + <span class="hljs-string">&#x27;%&#x27;</span>,
      <span class="hljs-attr">significant</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">abs</span>(improvement) &gt; <span class="hljs-number">10</span>,
    };
  }
}

<span class="hljs-comment">// Use in your app</span>
<span class="hljs-keyword">const</span> baseline = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceBaseline</span>();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MeasuredComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-comment">// Component work...</span>

    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - start;
    baseline.<span class="hljs-title function_">recordMetric</span>(<span class="hljs-string">&#x27;ComponentRender&#x27;</span>, duration);

    <span class="hljs-comment">// After enabling compiler, compare</span>
    <span class="hljs-keyword">const</span> comparison = baseline.<span class="hljs-title function_">compareWithBaseline</span>(<span class="hljs-string">&#x27;ComponentRender&#x27;</span>, duration);
    <span class="hljs-keyword">if</span> (comparison?.<span class="hljs-property">significant</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Compiler impact: <span class="hljs-subst">\${comparison.improvement}</span>\`</span>);
    }
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Measured Component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="مقارنة-مقاييس-المستخدمين-الحقيقيين">مقارنة مقاييس المستخدمين الحقيقيين</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Track real user metrics before and after compiler</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">RealUserMetrics</span> {
  <span class="hljs-keyword">private</span> enabled = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> sessionId = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateSessionId</span>();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">compilerEnabled</span>: <span class="hljs-built_in">boolean</span></span>) {}

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateSessionId</span>(): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>-<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substr(<span class="hljs-number">2</span>, <span class="hljs-number">9</span>)}</span>\`</span>;
  }

  <span class="hljs-title function_">trackCoreWebVitals</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Using web-vitals library</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;web-vitals&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{ getCLS, getFID, getLCP, getFCP, getTTFB }</span>) =&gt;</span> {
      <span class="hljs-title function_">getCLS</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;CLS&#x27;</span>, metric.<span class="hljs-property">value</span>));
      <span class="hljs-title function_">getFID</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;FID&#x27;</span>, metric.<span class="hljs-property">value</span>));
      <span class="hljs-title function_">getLCP</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;LCP&#x27;</span>, metric.<span class="hljs-property">value</span>));
      <span class="hljs-title function_">getFCP</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;FCP&#x27;</span>, metric.<span class="hljs-property">value</span>));
      <span class="hljs-title function_">getTTFB</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;TTFB&#x27;</span>, metric.<span class="hljs-property">value</span>));
    });
  }

  <span class="hljs-title function_">trackInteraction</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;interaction&#x27;</span>, duration, { name });
  }

  <span class="hljs-title function_">trackRenderTime</span>(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendMetric</span>(<span class="hljs-string">&#x27;render&#x27;</span>, duration, {
      <span class="hljs-attr">component</span>: componentName,
      <span class="hljs-attr">compilerEnabled</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">compilerEnabled</span>,
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendMetric</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">metadata</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;</span>) {
    <span class="hljs-comment">// Send to your analytics service</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span> &amp;&amp; <span class="hljs-string">&#x27;sendBeacon&#x27;</span> <span class="hljs-keyword">in</span> navigator) {
      <span class="hljs-keyword">const</span> data = {
        <span class="hljs-attr">metric</span>: name,
        value,
        <span class="hljs-attr">sessionId</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">sessionId</span>,
        <span class="hljs-attr">compilerEnabled</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">compilerEnabled</span>,
        <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
        ...metadata,
      };

      navigator.<span class="hljs-title function_">sendBeacon</span>(<span class="hljs-string">&#x27;/api/metrics&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data));
    }
  }
}

<span class="hljs-comment">// Initialize metrics tracking</span>
<span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RealUserMetrics</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">REACT_APP_COMPILER_ENABLED</span> === <span class="hljs-string">&#x27;true&#x27;</span>);

metrics.<span class="hljs-title function_">trackCoreWebVitals</span>();
</code></pre>
<h2 id="متى-لا-يستطيع-المصرف-المساعدة">متى لا يستطيع المصرّف المساعدة</h2>
<p>فهم حدود المصرّف أمر بالغ الأهمية:</p>
<h3 id="أنماط-الشيفرة-الديناميكية">أنماط الشيفرة الديناميكية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Compiler can&#x27;t optimize dynamic property access</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DynamicComponent</span>(<span class="hljs-params">{ data, fields }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> values = fields.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">field</span>) =&gt;</span> {
    <span class="hljs-comment">// Dynamic property access prevents optimization</span>
    <span class="hljs-keyword">return</span> data[field];
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{values.join(&#x27;, &#x27;)}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better: Explicit property access when possible</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExplicitComponent</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Compiler can track these dependencies</span>
  <span class="hljs-keyword">const</span> { name, email, phone } = data;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {name}, {email}, {phone}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الاعتمادات-الخارجية">الاعتمادات الخارجية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Compiler can&#x27;t optimize external library calls</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExternalLibComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Lodash operations aren&#x27;t optimized by React compiler</span>
  <span class="hljs-keyword">const</span> result = _.<span class="hljs-title function_">debounce</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Debounced&#x27;</span>);
  }, <span class="hljs-number">300</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{result}</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better: Use React patterns the compiler understands</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizableComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [debouncedValue, setDebouncedValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDebouncedValue</span>(value);
    }, <span class="hljs-number">300</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
  }, [value]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setValue(e.target.value)} /&gt;</span>;
}
</code></pre>
<h3 id="منطق-الحالة-المعقد">منطق الحالة المعقّد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Compiler struggles with complex reducer logic</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ComplexReducerComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(complexReducer, initialState);

  <span class="hljs-comment">// Complex reducer with many cases</span>
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">complexReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">State</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">Action</span></span>) {
    <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;COMPLEX_MUTATION&#x27;</span>:
        <span class="hljs-comment">// Nested object updates</span>
        <span class="hljs-keyword">return</span> {
          ...state,
          <span class="hljs-attr">nested</span>: {
            ...state.<span class="hljs-property">nested</span>,
            <span class="hljs-attr">deep</span>: {
              ...state.<span class="hljs-property">nested</span>.<span class="hljs-property">deep</span>,
              <span class="hljs-attr">value</span>: action.<span class="hljs-property">payload</span>,
            },
          },
        };
      <span class="hljs-comment">// Many more cases...</span>
    }
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Component JSX */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better: Simpler state patterns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SimplerStateComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Break down complex state into smaller pieces</span>
  <span class="hljs-keyword">const</span> [basicState, setBasicState] = <span class="hljs-title function_">useState</span>(initialBasic);
  <span class="hljs-keyword">const</span> [nestedState, setNestedState] = <span class="hljs-title function_">useState</span>(initialNested);

  <span class="hljs-comment">// Compiler can optimize these simpler patterns</span>
  <span class="hljs-keyword">const</span> updateNested = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setNestedState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, value }));
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Component JSX */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-الترحيل-وأفضل-الممارسات">أنماط الترحيل وأفضل الممارسات</h2>
<h3 id="النمط-1-إزالة-حفظ-النتائج-الزائد">النمط 1: إزالة حفظ النتائج الزائد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Before compiler: Manually optimized</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BeforeCompiler</span>(<span class="hljs-params">{ items, filter }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Manual memoization everywhere</span>
  <span class="hljs-keyword">const</span> filteredItems = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">category</span> === filter),
    [items, filter],
  );

  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked:&#x27;</span>, id);
  }, []);

  <span class="hljs-keyword">const</span> totals = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> filteredItems.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);
  }, [filteredItems]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span>
      ))}
      <span class="hljs-tag">&lt;<span class="hljs-name">Total</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{totals}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// After compiler: Clean code, same performance</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AfterCompiler</span>(<span class="hljs-params">{ items, filter }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Compiler handles optimization</span>
  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">category</span> === filter);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked:&#x27;</span>, id);
  };

  <span class="hljs-keyword">const</span> totals = filteredItems.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span>
      ))}
      <span class="hljs-tag">&lt;<span class="hljs-name">Total</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{totals}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="النمط-2-الإبقاء-على-التحسينات-اليدوية-الاستراتيجية">النمط 2: الإبقاء على التحسينات اليدوية الاستراتيجية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Some optimizations should stay even with the compiler</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">StrategicOptimization</span>(<span class="hljs-params">{ data }: { data: LargeDataset }</span>) {
  <span class="hljs-comment">// Keep: Expensive initialization</span>
  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Explicitly expensive operation</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">time</span>(<span class="hljs-string">&#x27;ProcessingData&#x27;</span>);
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">performExpensiveProcessing</span>(data);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">timeEnd</span>(<span class="hljs-string">&#x27;ProcessingData&#x27;</span>);
    <span class="hljs-keyword">return</span> result;
  }, [data]);

  <span class="hljs-comment">// Remove: Trivial memoization</span>
  <span class="hljs-comment">// const simpleCalc = useMemo(() =&gt; x + y, [x, y]);</span>
  <span class="hljs-comment">// Becomes:</span>
  <span class="hljs-keyword">const</span> simpleCalc = x + y; <span class="hljs-comment">// Compiler handles this</span>

  <span class="hljs-comment">// Keep: Ref callbacks for DOM measurements</span>
  <span class="hljs-keyword">const</span> measureRef = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">node</span>: <span class="hljs-title class_">HTMLDivElement</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (node) {
      <span class="hljs-comment">// DOM measurements need manual optimization</span>
      <span class="hljs-keyword">const</span> rect = node.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-title function_">reportMeasurement</span>(rect);
    }
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{measureRef}</span>&gt;</span>{/* Content */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-3-تصميم-مكونات-صديقة-للمصرف">النمط 3: تصميم مكوّنات صديقة للمصرّف</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Design components to maximize compiler optimization</span>

<span class="hljs-comment">// ✅ Compiler-friendly: Pure, predictable</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CompilerFriendly</span>(<span class="hljs-params">{ user, posts }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Simple, direct data access</span>
  <span class="hljs-keyword">const</span> userPosts = posts.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">authorId</span> === user.<span class="hljs-property">id</span>);
  <span class="hljs-keyword">const</span> postCount = userPosts.<span class="hljs-property">length</span>;

  <span class="hljs-comment">// Clear component boundaries</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserHeader</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">postCount</span>=<span class="hljs-string">{postCount}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostList</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{userPosts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ❌ Compiler-hostile: Too much indirection</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CompilerHostile</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Complex property chains</span>
  <span class="hljs-keyword">const</span> value = data?.<span class="hljs-property">nested</span>?.<span class="hljs-property">deep</span>?.<span class="hljs-property">maybe</span>?.<span class="hljs-property">exists</span> || fallback;

  <span class="hljs-comment">// Dynamic method calls</span>
  <span class="hljs-keyword">const</span> processor = processors[data.<span class="hljs-property">type</span>];
  <span class="hljs-keyword">const</span> result = processor?.(data);

  <span class="hljs-comment">// Unclear dependencies</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تصحيح-مشكلات-المصرف">تصحيح مشكلات المصرّف</h2>
<p>عندما لا تسير الأمور كما هو متوقّع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Enable compiler debug mode</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">CompilerDebugger</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
      <span class="hljs-comment">// @ts-ignore</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">__REACT_COMPILER_DEBUG__</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Compiler Debug Info:&#x27;</span>, <span class="hljs-variable language_">window</span>.<span class="hljs-property">__REACT_COMPILER_DEBUG__</span>);
      }
    }
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
};

<span class="hljs-comment">// Add compiler hints for edge cases</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">HintedComponent</span>(<span class="hljs-params">{ complexProp }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Compiler hint: This is expensive</span>
  <span class="hljs-comment">/* @compiler-expensive */</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">veryExpensiveOperation</span>(complexProp);

  <span class="hljs-comment">// Compiler hint: Don&#x27;t optimize this</span>
  <span class="hljs-comment">/* @compiler-skip */</span>
  <span class="hljs-keyword">const</span> dynamic = <span class="hljs-title function_">dynamicOperation</span>();

  <span class="hljs-comment">// Compiler hint: These are stable</span>
  <span class="hljs-comment">/* @compiler-stable */</span>
  <span class="hljs-keyword">const</span> config = { ...defaultConfig, ...userConfig };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Component content */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="لوحة-مقارنة-الأداء">لوحة مقارنة الأداء</h2>
<p>ابنِ لوحة معلومات لتتبّع فعالية المصرّف:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CompilerDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = useState&lt;<span class="hljs-title class_">MetricData</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [compilerEnabled] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> process.<span class="hljs-property">env</span>.<span class="hljs-property">REACT_APP_COMPILER</span> === <span class="hljs-string">&#x27;true&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Collect metrics</span>
    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
      <span class="hljs-keyword">const</span> newMetrics = entries.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> ({
        <span class="hljs-attr">name</span>: entry.<span class="hljs-property">name</span>,
        <span class="hljs-attr">duration</span>: entry.<span class="hljs-property">duration</span>,
        <span class="hljs-attr">timestamp</span>: entry.<span class="hljs-property">startTime</span>,
        compilerEnabled,
      }));

      <span class="hljs-title function_">setMetrics</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...newMetrics]);
    });

    observer.<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;measure&#x27;</span>] });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
  }, [compilerEnabled]);

  <span class="hljs-keyword">const</span> analysis = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> grouped = metrics.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">acc, metric</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> key = <span class="hljs-string">\`<span class="hljs-subst">\${metric.name}</span>-<span class="hljs-subst">\${metric.compilerEnabled}</span>\`</span>;
        <span class="hljs-keyword">if</span> (!acc[key]) acc[key] = [];
        acc[key].<span class="hljs-title function_">push</span>(metric.<span class="hljs-property">duration</span>);
        <span class="hljs-keyword">return</span> acc;
      },
      {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>[]&gt;,
    );

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(grouped).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[key, durations]</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> [name, enabled] = key.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;-&#x27;</span>);
      <span class="hljs-keyword">return</span> {
        name,
        <span class="hljs-attr">compilerEnabled</span>: enabled === <span class="hljs-string">&#x27;true&#x27;</span>,
        <span class="hljs-attr">avg</span>: durations.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / durations.<span class="hljs-property">length</span>,
        <span class="hljs-attr">min</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(...durations),
        <span class="hljs-attr">max</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...durations),
        <span class="hljs-attr">count</span>: durations.<span class="hljs-property">length</span>,
      };
    });
  }, [metrics]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;compiler-dashboard&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Compiler Performance Impact<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Metric<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Without Compiler<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>With Compiler<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Improvement<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
          {analysis.map((metric) =&gt; {
            const withoutCompiler = analysis.find(
              (m) =&gt; m.name === metric.name &amp;&amp; !m.compilerEnabled,
            );
            const withCompiler = analysis.find((m) =&gt; m.name === metric.name &amp;&amp; m.compilerEnabled);

            if (!withoutCompiler || !withCompiler) return null;

            const improvement =
              ((withoutCompiler.avg - withCompiler.avg) / withoutCompiler.avg) * 100;

            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{metric.name}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{metric.name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{withoutCompiler.avg.toFixed(2)}ms<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{withCompiler.avg.toFixed(2)}ms<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{improvement</span> &gt;</span> 0 ? &#x27;positive&#x27; : &#x27;negative&#x27;}&gt;
                  {improvement.toFixed(1)}%
                <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            );
          })}
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="قائمة-تدقيق-الترحيل">قائمة تدقيق الترحيل</h2>
<p>قبل إعلان اكتمال ترحيلك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MigrationChecklist</span> {
  <span class="hljs-attr">preparation</span>: {
    <span class="hljs-attr">strictMode</span>: <span class="hljs-string">&#x27;Enable React.StrictMode everywhere&#x27;</span>;
    <span class="hljs-attr">rulesOfReact</span>: <span class="hljs-string">&#x27;Fix all Rules of React violations&#x27;</span>;
    <span class="hljs-attr">baseline</span>: <span class="hljs-string">&#x27;Measure performance baseline metrics&#x27;</span>;
    <span class="hljs-attr">tests</span>: <span class="hljs-string">&#x27;Ensure all tests pass before starting&#x27;</span>;
  };

  <span class="hljs-attr">implementation</span>: {
    <span class="hljs-attr">gradual</span>: <span class="hljs-string">&#x27;Start with opt-in mode&#x27;</span>;
    <span class="hljs-attr">measure</span>: <span class="hljs-string">&#x27;Compare metrics after each phase&#x27;</span>;
    <span class="hljs-attr">debug</span>: <span class="hljs-string">&#x27;Enable debug mode in development&#x27;</span>;
    <span class="hljs-attr">monitor</span>: <span class="hljs-string">&#x27;Watch for runtime errors or warnings&#x27;</span>;
  };

  <span class="hljs-attr">validation</span>: {
    <span class="hljs-attr">performance</span>: <span class="hljs-string">&#x27;Verify performance improvements&#x27;</span>;
    <span class="hljs-attr">functionality</span>: <span class="hljs-string">&#x27;Test all features still work&#x27;</span>;
    <span class="hljs-attr">bundle</span>: <span class="hljs-string">&#x27;Check bundle size impact&#x27;</span>;
    <span class="hljs-attr">memory</span>: <span class="hljs-string">&#x27;Monitor memory usage changes&#x27;</span>;
  };

  <span class="hljs-attr">cleanup</span>: {
    <span class="hljs-attr">memoization</span>: <span class="hljs-string">&#x27;Remove unnecessary manual optimizations&#x27;</span>;
    <span class="hljs-attr">comments</span>: <span class="hljs-string">&#x27;Update code comments about optimization&#x27;</span>;
    <span class="hljs-attr">documentation</span>: <span class="hljs-string">&#x27;Document compiler configuration&#x27;</span>;
    <span class="hljs-attr">monitoring</span>: <span class="hljs-string">&#x27;Set up ongoing performance tracking&#x27;</span>;
  };
}
</code></pre>
<h2 id="إرشادات-تبني-لن-تلدغك">إرشادات تبنّي لن تلدغك</h2>
<p>ابدأ بدليل «التبنّي التدريجي» الرسمي: فعّل إضافة Babel، وقيّد التصريف بمجلد أو راية ميزة (feature flag)، واتّكئ على التوجيهات. فضّل وضع الاستنتاج الافتراضي؛ واستثنِ المواضع الساخنة صراحةً بتوجيه بينما تصلح روائح الشيفرة. (<a href="https://react.dev/learn/react-compiler/installation">React</a>)</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">HotPathPanel</span>(<span class="hljs-params"></span>) {
  <span class="hljs-string">&#x27;use no memo&#x27;</span>; <span class="hljs-comment">// temporary escape hatch while refactoring</span>
  <span class="hljs-comment">// …</span>
}
</code></pre>
<p>ويوصي التوثيق بهذا كسياج مؤقّت؛ وهناك أيضًا <a href="https://react.dev/reference/react-compiler/directives/use-no-memo">توجيه <code>'use memo'</code></a>، لكنك نادرًا ما تحتاجه خارج وضع التعليقات التوضيحية.</p>
<p>فعّله — عن قصد. سيمحو المصرّف كثيرًا من الشيفرة النموذجية الحشوية الخاصة بالحفظ، ويمنع أصنافًا كاملة من إعادات التصيير العارضة، لكنه لن يطمس مشكلات معمارية أو سوء استخدام للتأثيرات. تبنَّه تدريجيًا، وقِس، واحتفظ بمخرج طوارئ سهل في المواضع القليلة التي يتعارض فيها مع أنماطك الحالية. ثم دعه يفعل ما يفعل.</p>
<p>يمكنني توليد قائمة تدقيق قصيرة «فعّل ← قيّد ← قِس ← وسّع» مفصّلة على مقوّماتك التقنية (Next + Vite + Tailwind + TS) متى شئت.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>مصرّف React أداة قوية يمكنها تبسيط مستودعك تبسيطًا جذريًا مع الحفاظ على الأداء أو تحسينه. ومفتاح التبنّي الناجح هو فهم ما يستطيع فعله وما لا يستطيع، وتهيئة مستودعك تهيئة صحيحة، وقياس الأثر الفعلي في تطبيقك تحديدًا.</p>
<p>ابدأ بترحيل تدريجي، وقِس كل شيء، ولا تخشَ الإبقاء على بعض التحسينات اليدوية حيث تكون منطقية. فالمصرّف لا يهدف إلى استبدال كل التحسين اليدوي — بل إلى أتمتة التحسينات الروتينية لتتفرّغ للقرارات المعمارية التي تهمّ حقًّا.</p>
<p>تذكّر: أفضل تحسين للأداء هو الذي لا تحتاج إلى التفكير فيه. ويقرّبنا مصرّف React من تلك الغاية، إذ يتيح لنا كتابة شيفرة React نظيفة وبسيطة مع الحصول على أداء محسّن تلقائيًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
