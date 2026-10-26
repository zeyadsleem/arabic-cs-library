const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="configuring-playwright",p="تهيئة Playwright",t=[{depth:2,id:"testdir-وtestignore",text:"testDir وtestIgnore"},{depth:2,id:"webserver",text:"webServer"},{depth:2,id:"كتلة-use",text:"كتلة use"},{depth:2,id:"خيارات-المشغل-التي-قد-تضيفها-لاحقا",text:"خيارات المشغّل التي قد تضيفها لاحقًا"},{depth:2,id:"مبلغات-اختيارية",text:"مُبلِّغات اختيارية"},{depth:2,id:"إعدادات-لقطات-الشاشة-الافتراضية-الاختيارية",text:"إعدادات لقطات الشاشة الافتراضية الاختيارية"},{depth:2,id:"المشروعات",text:"المشروعات"},{depth:3,id:"المثال-1-تهيئة-المصادقة-مع-مجموعة-التطبيق-الحقيقية",text:"المثال 1: تهيئة المصادقة مع مجموعة التطبيق الحقيقية"},{depth:3,id:"المثال-2-مواصفات-عامة-مقابل-مواصفات-موثقة",text:"المثال 2: مواصفات عامة مقابل مواصفات موثّقة"},{depth:3,id:"المثال-3-تدقيق-عبر-المتصفحات-فقط",text:"المثال 3: تدقيق عبر المتصفحات فقط"},{depth:3,id:"المثال-4-مشروع-مخصص-للانحدار-البصري",text:"المثال 4: مشروع مخصّص للانحدار البصري"},{depth:2,id:"النمط-المضاد-خيارات-المشغل-داخل-use",text:"النمط المضاد: خيارات المشغّل داخل use"},{depth:2,id:"الشيء-الواحد-الذي-يجب-تذكره",text:"الشيء الواحد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>كل مجموعة اختبارات Playwright تبدأ بملف إعداد، ومعظمها مخطئ بالطرق الثلاث نفسها: خادم التطوير يعمل بدلًا من المعاينة، أو خيارات المشغّل مدفونة داخل <code>use</code> حيث يتجاهلها Playwright بصمت، أو أن الإعداد يحاول تعليم كل الحيل المتقدّمة من البداية. أما مشروع Shelf الابتدائي الحالي فيفعل العكس عن قصد: يُبقي الإعداد ضئيلًا.</p>
<p>وهذا جيد. ينبغي أن يستطيع الطلاب النظر إلى <code>playwright.config.ts</code> وفهمه من مرور واحد.</p>
<p>سنمرّ أولًا على ما يوفّره المشروع الابتدائي فعلًا، ثم ننظر في بضعة طرق واقعية قد توسّع بها الإعداد عندما تكبر المجموعة.</p>
<h2 id="testdir-وtestignore"><code>testDir</code> و<code>testIgnore</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests&#x27;</span>,
<span class="hljs-attr">testIgnore</span>: [<span class="hljs-string">&#x27;**/labs/fixtures/**&#x27;</span>, <span class="hljs-string">&#x27;**/labs/broken-traces/**&#x27;</span>],
</code></pre>
<p><code>testDir</code> هو المكان الذي يبحث فيه Playwright عن المواصفات. وفي مشروع Shelf الابتدائي هو <code>tests</code> فقط.</p>
<p>أما <code>testIgnore</code> فيفعل شيئًا أكثر تشويقًا قليلًا: يُبقي تمارين المختبر المكسورة عن قصد خارج التشغيل الأخضر الافتراضي. فتلك الملفات تبقى في المستودع، لكنها لا تُفسد تجربة المشروع الابتدائي قبل أن تعلّم الدرس المتعلّق بها.</p>
<p>هذا استخدام جيد لـ <code>testIgnore</code>: استثناء عناصر تعليمية معروفة أو ملفات مولّدة. واستخدامه السيئ أن تُخفي به اختبارات حقيقية متذبذبة. فإن كانت مواصفة عادية غير مستقرة، فأصلح المواصفة.</p>
<h2 id="webserver"><code>webServer</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">webServer</span>: {
  <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run build &amp;&amp; npm run preview -- --host 127.0.0.1 --port 4173&#x27;</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
},
</code></pre>
<p>هكذا يبدأ Playwright تطبيقك قبل تشغيل أي اختبار.</p>
<p>يبني Shelf ويعاين بدلًا من تشغيل خادم التطوير. ولماذا: لأن وضع المعاينة أقرب إلى الإنتاج. فلا HMR، ولا تحويلات Vite وقت التشغيل، ولا وسيط خاص بالتطوير يغيّر السلوك بطرق لا يفعلها الإنتاج أبدًا. وإن نجح اختبار على المعاينة، فمن المرجّح جدًا أن ينجح في CI والإنتاج.</p>
<p>ومن الإضافات الشائعة عندما تبدأ الحلقة المحلية بالتباطؤ <code>reuseExistingServer: true</code>. فإن كان التطبيق يعمل لديك بالفعل على المنفذ <code>4173</code>، يعيد Playwright استخدامه بدلًا من محاولة إقلاع نسخة ثانية.</p>
<p>ولاحقًا، ثمّة صيغة شائعة ملائمة لـ CI:</p>
<pre><code class="language-typescript"><span class="hljs-attr">reuseExistingServer</span>: !process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
</code></pre>
<p>وهذا التفريق مفيد بمجرد أن تهتم بحتمية CI. محليًا، أعد استخدام الخادم العامل. وفي CI، اقلع خادمًا جديدًا دائمًا.</p>
<p>وإن احتجت يومًا تجاوزات لمتغيّرات البيئة في الاختبارات، فـ <code>webServer</code> هو المكان الصحيح لها أيضًا:</p>
<pre><code class="language-typescript"><span class="hljs-attr">webServer</span>: {
  <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run build &amp;&amp; npm run preview -- --host 127.0.0.1 --port 4173&#x27;</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
  <span class="hljs-attr">env</span>: {
    <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">&#x27;test&#x27;</span>,
    <span class="hljs-attr">ANALYTICS_DISABLED</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
  },
},
</code></pre>
<h2 id="كتلة-use">كتلة <code>use</code></h2>
<pre><code class="language-typescript"><span class="hljs-attr">use</span>: {
  <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
},
</code></pre>
<p>كل ما في <code>use</code> ينطبق على سياق المتصفح في كل اختبار.</p>
<p><code>baseURL</code> هو الشيء الوحيد الذي يريده المشروع الابتدائي قطعًا. فهو يعني أنك تكتب <code>page.goto('/playground')</code> بدلًا من <code>page.goto('http://127.0.0.1:4173/playground')</code>. أمر صغير، لكنه يُبقي الاختبارات قابلة للنقل ويمنع تسرّب أسماء المضيفين في أرجاء المجموعة.</p>
<p>وما <strong>لا</strong> يوفّره المشروع الابتدائي بعد هو التتبّعات ولقطات الشاشة والفيديو. وهي مفيدة، لكنها ليست مفاهيم تحتاجها فورًا. وحين تصبح جاهزًا لها، يبدو الإعداد هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-attr">use</span>: {
  <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
  <span class="hljs-attr">trace</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
  <span class="hljs-attr">screenshot</span>: <span class="hljs-string">&#x27;only-on-failure&#x27;</span>,
  <span class="hljs-attr">video</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
},
</code></pre>
<p>هذه التركيبة تتبع الفلسفة الصحيحة: احتفظ بأدلّة الفشل، واطرح ضجيج النجاح.</p>
<h2 id="خيارات-المشغل-التي-قد-تضيفها-لاحقا">خيارات المشغّل التي قد تضيفها لاحقًا</h2>
<p>يترك مشروع Shelf الابتدائي الكثير من خيارات المشغّل في المستوى الأعلى دون مساس عن قصد. وهذا يُبقي الإعداد الافتراضي صغيرًا ويدع إعدادات Playwright الافتراضية تؤدّي عملها.</p>
<p>وبمجرد أن تكبر مجموعتك، تكون أول خيارات المشغّل التي تضيفها معظم الفرق:</p>
<pre><code class="language-typescript"><span class="hljs-attr">fullyParallel</span>: <span class="hljs-literal">true</span>,
<span class="hljs-attr">workers</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span> ? <span class="hljs-number">1</span> : <span class="hljs-literal">undefined</span>,
<span class="hljs-attr">forbidOnly</span>: !!process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
<span class="hljs-attr">retries</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>,
</code></pre>
<p>وهذا ما يفعله كل منها:</p>
<ul>
<li><code>fullyParallel</code> يسمح بتشغيل الاختبارات في الملف نفسه على التوازي.</li>
<li><code>workers</code> يتحكّم في عدد عمليات العمال التي يستطيع Playwright استخدامها. وتثبيت <code>workers: 1</code> في CI مناسب لبعض الإعدادات فقط (موارد خارجية مشتركة، بنية تحتية متذبذبة)، وسيُبطل <code>fullyParallel</code> عند ضبط الاثنين. فإن كان لديك <code>fullyParallel: true</code> وأردت التوازي، فاترك <code>workers</code> غير معرّف في CI كي يتوسّع Playwright حسب الأنوية المتاحة.</li>
<li><code>forbidOnly</code> يُفشل CI إن أودع أحدهم <code>test.only</code> بالخطأ.</li>
<li><code>retries</code> يمنح CI قدرًا من المرونة أمام التذبذبات العارضة.</li>
</ul>
<p>لاحظ أن هذه <strong>خيارات مشغّل</strong>، لا خيارات سياق متصفح. فهي تنتمي إلى المستوى الأعلى من <code>defineConfig</code>، لا إلى داخل <code>use</code>.</p>
<h2 id="مبلغات-اختيارية">مُبلِّغات اختيارية</h2>
<p>يعتمد المشروع الابتدائي على مُبلِّغ Playwright الافتراضي للطرفية. وهذا يكفي لمجموعة صغيرة.</p>
<p>وحين تريد مخرجات أغنى، فالخطوة التالية الشائعة هي:</p>
<pre><code class="language-typescript"><span class="hljs-attr">reporter</span>: [
  [<span class="hljs-string">&#x27;html&#x27;</span>, { <span class="hljs-attr">open</span>: <span class="hljs-string">&#x27;never&#x27;</span>, <span class="hljs-attr">outputFolder</span>: <span class="hljs-string">&#x27;playwright-report/html&#x27;</span> }],
  [<span class="hljs-string">&#x27;json&#x27;</span>, { <span class="hljs-attr">outputFile</span>: <span class="hljs-string">&#x27;playwright-report/report.json&#x27;</span> }],
  [<span class="hljs-string">&#x27;list&#x27;</span>],
],
</code></pre>
<ul>
<li><code>list</code> يمنحك مخرجات الطرفية التي تتوقعها.</li>
<li><code>html</code> يمنحك تقريرًا قابلًا للتصفّح فيه الإخفاقات ولقطات الشاشة والتتبّعات والخطوات.</li>
<li><code>json</code> يمنح CI والأتمتة شيئًا قابلًا للقراءة آليًا لتحليله.</li>
</ul>
<p>هذا مفيد لاحقًا في الدورة. ولا حاجة لأن يكون جزءًا من التطبيق الابتدائي.</p>
<h2 id="إعدادات-لقطات-الشاشة-الافتراضية-الاختيارية">إعدادات لقطات الشاشة الافتراضية الاختيارية</h2>
<p>إن أضفت اختبارات انحدار بصري، فمن المجدي ضبط إعدادات لقطات الشاشة افتراضيًا على المستوى العام:</p>
<pre><code class="language-typescript"><span class="hljs-attr">expect</span>: {
  <span class="hljs-attr">toHaveScreenshot</span>: {
    <span class="hljs-attr">animations</span>: <span class="hljs-string">&#x27;disabled&#x27;</span>,
    <span class="hljs-attr">caret</span>: <span class="hljs-string">&#x27;hide&#x27;</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-string">&#x27;css&#x27;</span>,
    <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
  },
},
</code></pre>
<ul>
<li><code>animations: 'disabled'</code> يجمّد الحركة للحصول على لقطات حتمية.</li>
<li><code>caret: 'hide'</code> يزيل ضجيج المؤشّر الوامض.</li>
<li><code>scale: 'css'</code> يساعد على تطبيع اللقطات عبر كثافات عرض مختلفة.</li>
<li><code>maxDiffPixelRatio: 0.01</code> يمنحك قدرًا صغيرًا من التجاوز لفروق التصيير الدقيقة.</li>
</ul>
<p>ومرة أخرى: مفيد لاحقًا، وليس ضروريًا في إعداد ابتدائي.</p>
<h2 id="المشروعات">المشروعات</h2>
<p>المشروع الابتدائي الحالي لـ Shelf <strong>لا</strong> يعرّف مشروعات Playwright مخصّصة. وذلك مقصود.</p>
<p>فمشروع افتراضي واحد يُبقي حلقة المبتدئ واضحة:</p>
<ul>
<li>ملف إعداد واحد</li>
<li>تشغيل افتراضي واحد</li>
<li>مكان واحد تنظر فيه عندما ينكسر شيء</li>
</ul>
<p>والمشروعات أداة رائعة مع ذلك. لكنها شيء تضيفه عندما يكون لديك سبب ملموس، لا لأن ملف الإعداد يبدو أكثر إبهارًا مع مصفوفة <code>projects</code> ضخمة.</p>
<h3 id="المثال-1-تهيئة-المصادقة-مع-مجموعة-التطبيق-الحقيقية">المثال 1: تهيئة المصادقة مع مجموعة التطبيق الحقيقية</h3>
<p>هذا هو النمط الكلاسيكي عندما تريد مواصفة تهيئة تسجّل الدخول مرة واحدة وتحفظ حالة التخزين للاختبارات الأخرى.</p>
<pre><code class="language-typescript"><span class="hljs-attr">projects</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;app&#x27;</span>,
    <span class="hljs-attr">testIgnore</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
    <span class="hljs-attr">use</span>: {
      <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/reader.json&#x27;</span>,
    },
    <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
  },
],
</code></pre>
<p>الفكرة المهمة هي <code>dependencies</code>: يشغّل Playwright مشروع <code>setup</code> أولًا، ثم يستطيع المشروع المعتمد إعادة استخدام الجلسة المحفوظة.</p>
<h3 id="المثال-2-مواصفات-عامة-مقابل-مواصفات-موثقة">المثال 2: مواصفات عامة مقابل مواصفات موثّقة</h3>
<p>هذا مفيد عندما ينبغي أن يبقى جزء من مجموعتك مجهولًا وأن يفترض جزء آخر مستخدمًا مسجّل الدخول.</p>
<pre><code class="language-typescript"><span class="hljs-attr">projects</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;public&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(smoke|playground)\\.spec\\.ts/</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(search|rate-book|goals)\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: {
      <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/reader.json&#x27;</span>,
    },
    <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
  },
],
</code></pre>
<p>يُبقي هذا الاختبارات العامة بسيطة بينما يسمح للاختبارات الموثّقة بمشاركة تهيئة تسجيل الدخول.</p>
<h3 id="المثال-3-تدقيق-عبر-المتصفحات-فقط">المثال 3: تدقيق عبر المتصفحات فقط</h3>
<p>التغطية الكاملة عبر المتصفحات مكلفة. والتغطية عبر المتصفحات بالتدقيق فقط غالبًا هي المقايضة الأفضل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig, devices } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests&#x27;</span>,
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: {
        ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>],
      },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;firefox-smoke&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/smoke\\.spec\\.ts/</span>,
      <span class="hljs-attr">use</span>: {
        ...devices[<span class="hljs-string">&#x27;Desktop Firefox&#x27;</span>],
      },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;webkit-smoke&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/smoke\\.spec\\.ts/</span>,
      <span class="hljs-attr">use</span>: {
        ...devices[<span class="hljs-string">&#x27;Desktop Safari&#x27;</span>],
      },
    },
  ],
});
</code></pre>
<p>يمنحك هذا النمط ثقة سريعة في مسار المستخدم الجوهري دون مضاعفة زمن تشغيل المجموعة بأكملها ثلاث مرات.</p>
<h3 id="المثال-4-مشروع-مخصص-للانحدار-البصري">المثال 4: مشروع مخصّص للانحدار البصري</h3>
<p>إن قرّرت إضافة اختبارات لقطات الشاشة، فعزلها في مشروع خاص بها يمكن أن يُبقي التوقّعات والمخرجات مرتّبة.</p>
<pre><code class="language-typescript"><span class="hljs-attr">projects</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;functional&#x27;</span>,
    <span class="hljs-attr">testIgnore</span>: <span class="hljs-regexp">/visual\\.spec\\.ts/</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;visual&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/visual\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: {
      <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">width</span>: <span class="hljs-number">1440</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">900</span> },
      <span class="hljs-attr">colorScheme</span>: <span class="hljs-string">&#x27;light&#x27;</span>,
    },
  },
],
</code></pre>
<p>يتيح لك ذلك إبقاء الافتراضات البصرية منفصلة عن الافتراضات الوظيفية.</p>
<p>والقاعدة الأساسية: أضف المشروعات عندما تقلّل الالتباس، لا عندما تخلقه.</p>
<h2 id="النمط-المضاد-خيارات-المشغل-داخل-use">النمط المضاد: خيارات المشغّل داخل <code>use</code></h2>
<p>هذا ما يزال أشهر خطأ في إعداد Playwright، ولن ينقذك Playwright منه.</p>
<p><code>testDir</code> و<code>timeout</code> و<code>retries</code> و<code>workers</code> و<code>projects</code> هي <strong>خيارات مشغّل</strong>. وتوضع في المستوى الأعلى من <code>defineConfig</code>.</p>
<p>و<code>baseURL</code> و<code>trace</code> و<code>screenshot</code> و<code>storageState</code> و<code>viewport</code> هي <strong>خيارات سياق</strong>. وتوضع داخل <code>use</code>.</p>
<p>فإن وضعت <code>timeout</code> داخل <code>use</code>، فلن يُخطئ Playwright. ولن ينبّهك. بل سيتجاهله فقط.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Wrong — silently ignored:</span>
<span class="hljs-attr">use</span>: {
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">60_000</span>,
},

<span class="hljs-comment">// Right — actually changes the test timeout:</span>
<span class="hljs-attr">timeout</span>: <span class="hljs-number">60_000</span>,
</code></pre>
<p>والنموذج الذهني بسيط:</p>
<ul>
<li><code>use</code> يضبط سياق المتصفح</li>
<li>وكل ما عداه يضبط المشغّل</li>
</ul>
<h2 id="الشيء-الواحد-الذي-يجب-تذكره">الشيء الواحد الذي يجب تذكّره</h2>
<p>ملف الإعداد هو العقد بين مجموعتك وبيئتك. وينبغي أن يُبقي المشروع الابتدائي ذلك العقد سهل القراءة. وأضف الطبقة التالية من الإعداد عندما تستحقّها:</p>
<ul>
<li>أولًا <code>webServer</code></li>
<li>ثم <code>baseURL</code></li>
<li>ثم ربما التتبّعات ولقطات الشاشة</li>
<li>ثم ربما المشروعات</li>
</ul>
<p>فإن كان ملف إعداد يحاول تعليم تهيئة المصادقة، والتغطية عبر المتصفحات، والانحدار البصري، وإعادات المحاولة في CI، والإبلاغ عن الإخفاقات دفعة واحدة، فهو على الأرجح يفعل أكثر من اللازم لمستودع مبتدئ.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects">مشروعات Playwright</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode">وضع واجهة Playwright</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,l as html,e as slug,p as title};
