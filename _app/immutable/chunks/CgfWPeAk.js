const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="testing-strategies-exercise",e="التمرين 8: استراتيجيات الاختبار",p=[{depth:2,id:"ما-الذي-تفعله",text:"ما الذي تفعله"},{depth:2,id:"لماذا-يهم",text:"لماذا يهمّ"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"افهم-بنية-الاختبار",text:"افهم بنية الاختبار"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"اكتب-اختبارات-التنقل-عبر-المسارات",text:"اكتب اختبارات التنقل عبر المسارات"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقّق"},{depth:2,id:"اكتب-اختبارات-مع-التحقق-من-بيانات-msw",text:"اكتب اختبارات مع التحقق من بيانات MSW"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقّق"},{depth:2,id:"سجل-ملفات-har-وأعد-تشغيلها",text:"سجّل ملفات HAR وأعد تشغيلها"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقّق"},{depth:2,id:"اختبار-العقود",text:"اختبار العقود"},{depth:3,id:"نقطة-تحقق-4",text:"نقطة تحقّق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],l=`<h2 id="ما-الذي-تفعله">ما الذي تفعله</h2>
<p>تحتاج إلى اختبارات من الطرف إلى الطرف تمرّن التطبيق المُركَّب كما يعيشه المستخدم — التنقل بين المسارات، ورؤية البيانات تُحمَّل، والتفاعل مع واجهة المستخدم. وأنت ستكتب اختبارات E2E بـPlaywright للتنقل عبر المسارات، وتحاكي استجابات الواجهة البرمجية بـMSW، وتسجّل ملفات HAR لبدائل إعادة تشغيل حتمية، وتناقش أين يسدّ اختبار العقود الثغرات التي تتركها هذه الاختبارات.</p>
<h2 id="لماذا-يهم">لماذا يهمّ</h2>
<p>في معمارية المستودع الأحادي، تتحقق اختبارات الوحدة من أن المكوّنات الفردية تعمل بمعزل، لكنها تفوّت مفاصل التكامل: هل يُحمَّل المسار كسولًا بشكل صحيح؟ هل تُصيّر لوحة التحليلات بيانات حقيقية من الواجهة البرمجية؟ هل تنجو حالة التنقل عبر انتقالات الصفحات؟ تلتقط اختبارات E2E هذه الأعطال على مستوى التكامل. وتمنحك محاكاة MSW تحكمًا في استجابات الواجهة البرمجية دون خادم خلفي حقيقي. ويمنحك تسجيل HAR لقطات حتمية لتفاعلات واجهة برمجية حقيقية. ومعًا، تتيح لك هذه التقنيات اختبار التطبيق المُركَّب بثقة.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>Node.js 20+</li>
<li>pnpm 9+</li>
</ul>
<h2 id="الإعداد">الإعداد</h2>
<p>ينبغي أن تكون مكملًا من حيث انتهى التمرين 8 (خط أنابيب CI/CD). وإن احتجت إلى اللحاق بالركب:</p>
<pre><code class="language-bash">git checkout 08-testing-start
pnpm install
</code></pre>
<p>تحقّق من تثبيت Playwright:</p>
<pre><code class="language-bash">npx playwright install chromium
</code></pre>
<p>افتح <code>tests/e2e/cross-remote.spec.ts</code> — فهو يحتوي بدائل TODO.</p>
<h2 id="افهم-بنية-الاختبار">افهم بنية الاختبار</h2>
<p>قبل كتابة الاختبارات، انظر كيف تُهيّأ بيئة الاختبار.</p>
<p>افتح <code>tests/e2e/playwright.config.ts</code>:</p>
<p><em>tests/e2e/playwright.config.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;.&#x27;</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">30000</span>,
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://localhost:5173&#x27;</span>,
  },
  <span class="hljs-attr">webServer</span>: {
    <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;pnpm --filter @pulse/dashboard dev&#x27;</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://localhost:5173&#x27;</span>,
    <span class="hljs-attr">reuseExistingServer</span>: !process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
  },
});
</code></pre>
<p><em>ملاحظة:</em> يعيد استخدام خادم تطوير قائم محليًا، لكنه يبدأ خادمًا جديدًا دائمًا في CI.</p>
<blockquote>
<p><strong>تهيئة <code>webServer</code></strong></p>
<p>يستطيع Playwright تشغيل خادم تطويرك تلقائيًا قبل تشغيل الاختبارات وإيقافه بعدها. ويشغّل <code>command</code> خادم تطوير لوحة المعلومات، و<code>url</code> هو فحص الصحة — يستطلع Playwright هذا العنوان حتى يستجيب قبل تشغيل أي اختبار. ويعني <code>reuseExistingServer: !process.env.CI</code> أنه في التطوير المحلي، إن كان خادم التطوير يعمل لديك سابقًا، سيستخدمه Playwright بدل بدء خادم جديد. أما في CI فيبدأ خادمًا جديدًا دائمًا.</p>
</blockquote>
<blockquote>
<p><strong>Mock Service Worker</strong></p>
<p>يعترض MSW طلبات الشبكة على مستوى Service Worker، لا بتعديل <code>fetch</code> أو <code>XMLHttpRequest</code> يدويًا. فيسجّل MSW عامل خدمة في المتصفح (أو يستخدم مكتبة اعتراض طلبات في Node.js) يقف بين شيفرة تطبيقك والشبكة. وعندما ينادي مكوّنك <code>fetch(&quot;/api/analytics/summary&quot;)</code>، يعترض عامل الخدمة الطلب قبل أن يغادر المتصفح أصلًا، وتعيد معالجات MSW استجابة مُحاكاة كأن خادمًا حقيقيًا قد استجاب. ولأن الاعتراض يحدث على مستوى الشبكة، فشيفرة تطبيقك لا تدرك إطلاقًا أن الاستجابة مُحاكاة — فنداء <code>fetch</code>، وحلّ الوعد، وتحليل الاستجابة، كلها تتصرف تمامًا كطلب شبكة حقيقي. وهذه ميزة جوهرية على محاكاة <code>fetch</code> مباشرةً: فأنت تختبر مسار شيفرة الشبكة الفعلي الذي يستخدمه تطبيقك في الإنتاج، بما في ذلك ترويسات الطلب، ورموز حالة الاستجابة، ومعالجة الأخطاء، دون تشغيل خادم خلفي حقيقي.</p>
</blockquote>
<p>ويوضّح المخطط التالي كيف يعترض MSW طلبات الشبكة على مستوى Service Worker — فتُلتقط نداءات <code>fetch</code> في تطبيقك قبل وصولها إلى الشبكة، وتُعاد استجابات مُحاكاة كأن خادمًا حقيقيًا قد استجاب.</p>
<pre><code>sequenceDiagram
    participant Component as React Component
    participant Fetch as fetch()
    participant SW as MSW Service Worker
    participant Handler as MSW Handler
    participant Network as Network

    Component-&gt;&gt;Fetch: fetch(&quot;/api/analytics/summary&quot;)
    Fetch-&gt;&gt;SW: Request intercepted
    SW-&gt;&gt;Handler: Match against handlers
    Handler--&gt;&gt;SW: Mock response (200ms delay)
    SW--&gt;&gt;Fetch: Response object
    Fetch--&gt;&gt;Component: JSON data
    Note over Network: Request never reaches the network
</code></pre>
<p>ثم افتح <code>mocks/src/handlers.ts</code> — تعمل معالجات MSW هذه أثناء التطوير وتكون سلوك الواجهة البرمجية الأساسي أثناء الاختبارات. وتعيد المعالجات بيانات حتمية بتأخيرات ثابتة.</p>
<p>ثم افتح <code>tests/e2e/cross-remote.spec.ts</code> — ملف البدائل الذي ستكتب فيه الاختبارات:</p>
<p><em>tests/e2e/cross-remote.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Add cross-route navigation tests</span>
<span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Add error handling tests</span>
<span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> Add loading state tests</span>
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>Playwright مثبَّت ومهيّأ. ويبدأ خادم التطوير تلقائيًا عند تشغيلك الاختبارات. وتوفّر معالجات MSW استجابات واجهة برمجية حتمية.</p>
<h2 id="اكتب-اختبارات-التنقل-عبر-المسارات">اكتب اختبارات التنقل عبر المسارات</h2>
<p>استبدل البديل في <code>tests/e2e/cross-remote.spec.ts</code> باختبارات حقيقية:</p>
<p><em>tests/e2e/cross-remote.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Cross-route navigation&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;navigates from analytics to users and back&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-comment">// Start at the analytics page</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Wait for the stats bar to render (fastest API response at 200ms)</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Navigate to users</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Users&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Wait for the user list to render (use Alan Turing to avoid matching the</span>
    <span class="hljs-comment">// auth bar&#x27;s &quot;Viewing as: Grace Hopper&quot; which causes a strict mode violation)</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Alan Turing&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Navigate back to analytics</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Analytics&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Verify analytics data is still present</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;users page shows user data with roles&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Navigate to users</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Users&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Wait for user list to load</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Alan Turing&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Verify user data is visible in the table (email is unique to the users page)</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;grace@pulse.dev&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Verify we can navigate back</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Analytics&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;settings page loads with organization data&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/settings&#x27;</span>);

    <span class="hljs-comment">// Wait for settings data to load</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Pulse Inc.&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;pro&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  });
});
</code></pre>
<p><em>ملاحظة:</em> يتحقق من أن البيانات تنجو من رحلة تنقل كاملة ذهابًا وإيابًا بين المسارات.</p>
<p>شغّل الاختبارات:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> tests/e2e/cross-remote.spec.ts --config tests/e2e/playwright.config.ts
</code></pre>
<blockquote>
<p><strong>لماذا نختبر التنقل، لا تصيير المكوّنات</strong></p>
<p>تتحقق اختبارات الوحدة بـVitest وTesting Library من أن المكوّنات الفردية تُصيّر بشكل صحيح بخصائص محددة. أما اختبارات E2E فتتحقق من <em>التكامل</em> — أن الموجّه يحمّل المسار الكسول الصحيح، وأن MSW يعترض نداء الواجهة البرمجية، وأن المكوّن يجلب البيانات ويعرضها بشكل صحيح، وأن التنقل بعيدًا وعودة لا يكسر الحالة. فهذه هي المفاصل بين الحزم، وهي بالضبط المفاصل التي تنكسر في مستودع أحادي عندما يغيّر أحدهم نوعًا مشتركًا أو يعيد هيكلة الواجهة البرمجية العامة لحزمة.</p>
</blockquote>
<h3 id="نقطة-تحقق-1">نقطة تحقّق</h3>
<p>تنجح ثلاثة اختبارات E2E على الأقل. وهي تغطّي التنقل بين التحليلات والمستخدمين والإعدادات، وتتحقق من تحميل البيانات بشكل صحيح عبر انتقالات المسارات.</p>
<p><img src="/arabic-cs-library/images/kinney/69c930130eec1050.webp" alt="نتائج اختبارات Playwright تعرض اختبارات ناجحة"></p>
<h2 id="اكتب-اختبارات-مع-التحقق-من-بيانات-msw">اكتب اختبارات مع التحقق من بيانات MSW</h2>
<p>تستخدم لوحة المعلومات <code>setupWorker</code> من MSW، الذي يسجّل عامل خدمة في المتصفح. وموارد Suspense من التمرين 2 تُطلق نداءات الجلب وقت استيراد الوحدة — قبل أن يستطيع <code>page.route()</code> في Playwright اعتراضها. وهذا يعني أن تجاوزات الواجهة البرمجية لكل اختبار عبر <code>page.route()</code> لن تعمل مع تحميل البيانات الأولي. وبدلًا من ذلك، اكتب اختبارات تتحقق من أن بيانات MSW المُحاكاة تُصيّر بشكل صحيح، وأن الميزات التفاعلية تعمل.</p>
<blockquote>
<p><strong>لماذا لا يعمل <code>page.route()</code> هنا</strong></p>
<p>تنشئ نداءات <code>createSuspenseResource</code> في <code>stats-bar.tsx</code> و<code>chart.tsx</code> و<code>big-table.tsx</code> وعود جلبها في نطاق الوحدة — فبمجرد استيراد الوحدة، يُطلق الجلب. ويعترض عامل الخدمة في MSW هذه الجلب قبل وصولها إلى طبقة الشبكة. وبحلول الوقت الذي تستطيع فيه إعداد تجاوزات <code>page.route()</code>، تكون البيانات قد جُلبت وخُزّنت مؤقتًا. وهذه مقايضة موارد Suspense على مستوى الوحدة: إنها سريعة (بلا شلال طلبات) لكنها ليست قابلة للمحاكاة بسهولة لكل اختبار. أما إعادة تشغيل HAR (الخطوة 4) فتعمل لأن <code>routeFromHAR</code> يُعدّ قبل التنقل.</p>
</blockquote>
<p>أنشئ ملف اختبار جديدًا <code>tests/e2e/analytics.spec.ts</code>:</p>
<p><em>tests/e2e/analytics.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Analytics with mocked API&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders analytics data from MSW handlers&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Verify the MSW mock data renders</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;3,291&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;$284,100&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;3.2%&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;chart time range toggles work&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Wait for chart to load</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;img&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Analytics activity chart&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Click 7d toggle</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;7d&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Chart should still be visible after toggle</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;img&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Analytics activity chart&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
  });
});
</code></pre>
<p><em>ملاحظة:</em> يعترض MSW هذه الجلب على مستوى Service Worker، فيعيد بيانات حتمية.</p>
<p>شغّل الاختبارات الجديدة:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> tests/e2e/analytics.spec.ts --config tests/e2e/playwright.config.ts
</code></pre>
<h3 id="نقطة-تحقق-2">نقطة تحقّق</h3>
<p>تنجح اختبارات التحليلات. وهي تتحقق من أن بيانات MSW المُحاكاة تُصيّر بشكل صحيح، وأن عناصر التحكم التفاعلية في المخطط تعمل.</p>
<h2 id="سجل-ملفات-har-وأعد-تشغيلها">سجّل ملفات HAR وأعد تشغيلها</h2>
<p>تلتقط ملفات HAR (أرشيف HTTP) تفاعلات شبكة حقيقية بصيغة JSON. ويستطيع Playwright تسجيلها أثناء تشغيل الاختبار وإعادة تشغيلها لاحقًا لنتائج حتمية.</p>
<blockquote>
<p><strong>HAR (أرشيف HTTP)</strong></p>
<p>يلتقط ملف HAR كل تفصيل في دورة طلب-استجابة شبكية: عنوان الطلب، والتابع (method)، والترويسات، والجسم؛ ورمز حالة الاستجابة، وترويساتها، وجسمها؛ ومعلومات التوقيت بما فيها بحث DNS، والاتصال، ومصافحة TLS، وزمن أول بايت. وقد صُمّمت الصيغة أصلًا لأدوات مطوّري المتصفح (فيمكنك تصدير ملفات HAR من تبويب الشبكة في Chrome DevTools) وتدعمها فعليًا كل أداة تنقيح HTTP. ويقرأ تابع <code>routeFromHAR</code> في Playwright هذه الملفات ويعيد تشغيل الاستجابات المسجّلة عند اكتشاف طلبات مطابقة، ما يجعل اختباراتك مستقلة تمامًا عن أي خادم يعمل. والميزة الجوهرية على المحاكاة المكتوبة يدويًا هي الأمانة: فيلتقط ملف HAR شكل الاستجابة الدقيق، وترويساتها، ورموز حالتها، كما أنتجها خادم حقيقي، فأنت تختبر ببيانات واقعية دون صيانة تعريفات محاكاة يدويًا.</p>
</blockquote>
<p>ابدأ بتسجيل ملف HAR. أضف اختبار تسجيل إلى <code>tests/e2e/analytics.spec.ts</code>:</p>
<p><em>tests/e2e/analytics.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;record HAR fixture&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// Start recording all API calls</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/analytics-summary.har&#x27;</span>, {
    <span class="hljs-attr">update</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/api/analytics/**&#x27;</span>,
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

  <span class="hljs-comment">// Wait for all analytics data to load</span>
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

  <span class="hljs-comment">// Close the page to flush the HAR file</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">close</span>();
});
</code></pre>
<p><em>ملاحظة:</em> ضبط update على true يسجّل استجابات حيّة في ملف HAR.</p>
<p>شغّل هذا الاختبار لإنشاء ملف HAR:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> tests/e2e/analytics.spec.ts -g <span class="hljs-string">&quot;record HAR&quot;</span> --config tests/e2e/playwright.config.ts
</code></pre>
<p>تحقّق من إنشاء الملف:</p>
<pre><code class="language-bash"><span class="hljs-built_in">ls</span> tests/fixtures/analytics-summary.har
</code></pre>
<p>يحتوي ملف HAR على دورة الطلب والاستجابة كاملة لكل نداء واجهة برمجية طابق نمط العنوان. افتحه — إنه JSON فيه ترويسات الطلب، وترويسات الاستجابة، وجسم الاستجابة، ومعلومات التوقيت.</p>
<p>والآن أضف إلى <code>tests/e2e/analytics.spec.ts</code> اختبارًا يعيد تشغيل HAR بدل ضرب الواجهة البرمجية الحيّة:</p>
<p><em>tests/e2e/analytics.spec.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders analytics from HAR fixture&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// Replay recorded responses instead of hitting the live API</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">routeFromHAR</span>(<span class="hljs-string">&#x27;tests/fixtures/analytics-summary.har&#x27;</span>, {
    <span class="hljs-attr">update</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;**/api/analytics/**&#x27;</span>,
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

  <span class="hljs-comment">// These values come from the recorded HAR, not the live MSW handlers</span>
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Total Users&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;12,847&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p><em>ملاحظة:</em> ضبط update على false يعيد تشغيل الاستجابات المسجّلة لنتائج حتمية.</p>
<p>وأخيرًا، احذف اختبار التسجيل من <code>tests/e2e/analytics.spec.ts</code> (أو تخطّه) — فلن تحتاجه إلا عند إعادة توليد البدائل:</p>
<p><em>tests/e2e/analytics.spec.ts</em></p>
<pre><code class="language-typescript">test.<span class="hljs-title function_">skip</span>(<span class="hljs-string">&#x27;record HAR fixture&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// ...</span>
});
</code></pre>
<blockquote>
<p><strong>إعادة تشغيل HAR مقابل المحاكاة بـ<code>page.route()</code></strong></p>
<p>إعادة تشغيل HAR مفيدة عندما تريد التقاط الشكل الدقيق لاستجابات واجهة برمجية حقيقية — بما فيها الترويسات، ورموز الحالة، وتوقيت الاستجابة — دون بناء بيانات محاكاة يدويًا. وهي قيّمة خصوصًا للواجهات المعقّدة بأجسام استجابات متداخلة بعمق. والعيب أن ملفات HAR تتقادم عندما تتغيّر الواجهة البرمجية. أما المحاكاة بـ<code>page.route()</code> فهي أفضل عندما تحتاج تحكمًا دقيقًا في سيناريوهات محددة (حالات الأخطاء، والحالات الحدّية، وبيانات مخصّصة). استخدم HAR لاختبارات «المسار الذهبي» و<code>page.route()</code> لاختبارات الحالات الحدّية.</p>
</blockquote>
<h3 id="نقطة-تحقق-3">نقطة تحقّق</h3>
<p>يوجد ملف HAR في <code>tests/fixtures/</code>. ويعيد اختبار تشغيل HAR لنتائج حتمية دون ضرب معالجات MSW الحيّة. وينجح الاختبار بالتأكيدات نفسها.</p>
<h2 id="اختبار-العقود">اختبار العقود</h2>
<p>شغّل كل الاختبارات مرة أخرى:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> --config tests/e2e/playwright.config.ts
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات. لكن تأمّل هذا السيناريو: يغيّر فريق الخادم استجابة <code>/api/analytics/summary</code> من <code>{ totalUsers: number }</code> إلى <code>{ total_users: number }</code>. وما زالت ملفات HAR لديك بالصيغة القديمة. وما زالت محاكاة <code>page.route()</code> لديك تعيد الصيغة القديمة. وما زالت معالجات MSW لديك تعيد الصيغة القديمة. وكل اختبار ينجح. وينكسر تطبيق الإنتاج.</p>
<blockquote>
<p><strong>الثغرة التي يسدّها اختبار العقود</strong></p>
<p>تتحقق اختبارات E2E بواجهات برمجية مُحاكاة من أن واجهتك الأمامية تُصيّر بشكل صحيح بمعطى شكل استجابة محدد. لكنها لا تتحقق من أن الواجهة البرمجية تعيد ذلك الشكل فعلًا. وتسدّ أدوات اختبار العقود مثل Pact هذه الثغرة: فتعلن الواجهة الأمامية «أتوقع أن يعيد <code>GET /api/analytics/summary</code> القيمة <code>{ totalUsers: number }</code>» ويتحقق الخادم من أنه يحقق ذلك العقد. وعندما يغيّر الخادم <code>totalUsers</code> إلى <code>total_users</code>، يفشل اختبار العقد على جانب الخادم — قبل شحن التغيير. وهذا يلتقط انحراف الواجهة البرمجية دون أن يتطلب من الأمام والخلف النشر والاختبار معًا.</p>
</blockquote>
<p>هذه نقطة نقاش، لا تمرين عملي. فكّر أين سيعمل اختبار العقود في خط أنابيب CI لديك، وما الذي سيلتقطه وتفوّته اختباراتك الحالية.</p>
<h3 id="نقطة-تحقق-4">نقطة تحقّق</h3>
<p>تنجح كل اختبارات Playwright. وتستطيع أن تبيّن هرم الاختبارات في مستودع أحادي: اختبارات الوحدة (Vitest) لمنطق المكوّنات، واختبارات E2E (Playwright) لسلوك التكامل، واختبارات العقود (Pact) لتوافق الواجهة البرمجية.</p>
<p><img src="/arabic-cs-library/images/kinney/8eb6a24cdf17e4e4.webp" alt="تقرير HTML من Playwright مع ملخّص الاختبارات"></p>
<h2 id="الحل">الحل</h2>
<p>إن احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة في فرع <code>09-migration-start</code>:</p>
<pre><code class="language-bash">git checkout 09-migration-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>اختبار الانحدار البصري:</strong> أضف <code>expect(page).toHaveScreenshot()</code> لالتقاط لقطة شاشة للوحة التحليلات ومقارنتها بخط أساس. شغّل الاختبار مرتين — فالتشغيلة الثانية تقارن بالأولى. وغيّر صنف CSS وراقب فشل الاختبار.</li>
<li><strong>اختبار إمكانية الوصول:</strong> ثبّت <code>@axe-core/playwright</code> وأضف تدقيق إمكانية وصول إلى اختبارك. وتأكّد من أن لوحة التحليلات بلا مخالفات حرجة لإمكانية الوصول.</li>
<li><strong>تنفيذ الاختبارات بالتوازي:</strong> هيّئ Playwright لتشغيل الاختبارات بـ<code>workers: 4</code> وتحقّق من أنها ما زالت تنجح. وافحص مشكلات الحالة المشتركة — فالاختبارات التي تنجح بمعزل عن غيرها وتفشل عند تشغيلها بالتوازي تكون عادةً تقرأ حالة مشتركة أو تكتبها.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>لديك الآن مستودع أحادي مختَبر ومفحوص بـlint ومفحوص الأنواع ومفروض في CI. لكن ماذا يحدث عندما يحتاج تطبيق قديم إلى التعايش مع معماريتك الحديثة؟ في التمرين التالي، ستُعدّ نمط الشجرة الخانقة للترحيل التدريجي — بتوجيه بعض المسارات إلى التطبيق القديم وأخرى إلى التطبيق الحديث — وستكتب codemods بـjscodeshift لأتمتة إعادات كتابة الاستيرادات المضجرة.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,t as slug,e as title};
