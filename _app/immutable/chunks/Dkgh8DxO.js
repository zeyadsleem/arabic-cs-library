const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",p="add-cross-browser-coverage-solution",t="الحل",l=[{depth:2,id:"ما-يجب-إضافته",text:"ما يجب إضافته"},{depth:3,id:"تعريفات-المشاريع-في-playwrightconfigts",text:"تعريفات المشاريع في playwright.config.ts"},{depth:3,id:"مجموعة-الدخان-الفرعية",text:"مجموعة الدخان الفرعية"},{depth:3,id:"سكربتات-packagejson",text:"سكربتات package.json"},{depth:3,id:"توصيل-سير-العمل-الليلي",text:"توصيل سير العمل الليلي"},{depth:2,id:"ما-ما-زلت-بحاجة-إلى-تشغيله",text:"ما ما زلت بحاجة إلى تشغيله"},{depth:2,id:"المحلي-مقابل-المستضاف",text:"المحلي مقابل المستضاف"},{depth:2,id:"أنماط-تستحق-الاحتفاظ-بها",text:"أنماط تستحق الاحتفاظ بها"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>الهدف هنا ليس «شغّل كل شيء في كل مكان». الهدف هو «شغّل الاختبارات الصحيحة على المتصفحات الصحيحة دون أن تجعل الحلقة الافتراضية بائسة». بادئة Shelf الحالية صغيرة بما يكفي ليبقى هذا بسيطًا إن أبقيت الفصل صادقًا.</p>
<h2 id="ما-يجب-إضافته">ما يجب إضافته</h2>
<h3 id="تعريفات-المشاريع-في-playwrightconfigts">تعريفات المشاريع في <code>playwright.config.ts</code></h3>
<p>الشكل الأدنى المستهدف ثلاثة مشاريع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig, devices } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests&#x27;</span>,
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>] },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;firefox-smoke&#x27;</span>,
      <span class="hljs-attr">grep</span>: <span class="hljs-regexp">/@cross-browser/</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Firefox&#x27;</span>] },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;webkit-smoke&#x27;</span>,
      <span class="hljs-attr">grep</span>: <span class="hljs-regexp">/@cross-browser/</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Safari&#x27;</span>] },
    },
  ],
});
</code></pre>
<p>Chromium هو المشغّل اليومي الافتراضي. Firefox وWebKit مشروعا دخان اختياريان يشغّلان فقط الاختبارات الموسومة <code>@cross-browser</code>.</p>
<p><code>grep</code> على مستوى المشروع هو الحيلة كلها. إنه يُبقي المتصفحات البديلة صادقة دون تحويل كل تشغيل اختبار محلي إلى حدث ثلاثي المتصفحات. إن أضفت لاحقًا مشاريع <code>setup</code> أو <code>authenticated</code> من مختبرات المصادقة، فأبقِها في حلقة Chromium ما لم يكن لديك سبب محدد لتوسيعها.</p>
<h3 id="مجموعة-الدخان-الفرعية">مجموعة الدخان الفرعية</h3>
<p>وسّم المجموعة الصغيرة من الاختبارات التي تستحق تغطية عبر المتصفحات. ملف البادئة <code>tests/smoke.spec.ts</code> هو الهدف الأول البديهي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;home page renders&#x27;</span>, { <span class="hljs-attr">tag</span>: <span class="hljs-string">&#x27;@cross-browser&#x27;</span> }, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;login page renders&#x27;</span>, { <span class="hljs-attr">tag</span>: <span class="hljs-string">&#x27;@cross-browser&#x27;</span> }, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/login&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>أبقِ هذه المجموعة صغيرة. المجموعة الفرعية للدخان مفترض أن تثبت أن التطبيق يعمل أساسًا في المتصفحات البديلة، لا أن تعيد تشغيل المجموعة كلها لأن أحدهم أصبح طموحًا يوم جمعة.</p>
<h3 id="سكربتات-packagejson">سكربتات <code>package.json</code></h3>
<p>الفصل في السكربتات يهم بقدر الفصل في المشاريع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --project=chromium&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test:cross-browser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يبقى <code>npm run test</code> سريعًا ومملًا. و<code>npm run test:cross-browser</code> هو الحلقة الأوسع المتعمدة. لا تدمجهما في أمر واحد إن كنت لا تستمتع بالانتظار لـ Firefox وWebKit في كل مرة تغيّر فيها نص زر.</p>
<p>قبل أن تستطيع تشغيل الحلقة الأوسع محليًا، ثبّت المتصفحات الإضافية:</p>
<pre><code class="language-bash">npx playwright install --with-deps firefox webkit
</code></pre>
<p>تثبيت Playwright الافتراضي هو Chromium. ولهذا تظهر خطوة تثبيت المتصفحات في CI أيضًا. ما يعمل على حاسوبك لأنك شغّلته مرة قبل ستة أشهر لا يساعد منفّذًا جديدًا.</p>
<h3 id="توصيل-سير-العمل-الليلي">توصيل سير العمل الليلي</h3>
<p>بمجرد وجود الأمر ونزول مختبر سير العمل الليلي، تصبح مهمة الليل صغيرة. إليك الشكل الذي تستهدفه:</p>
<pre><code class="language-yaml"><span class="hljs-attr">cross-browser-smoke:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">Cross-browser</span> <span class="hljs-string">smoke</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">browsers</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">playwright</span> <span class="hljs-string">install</span> <span class="hljs-string">--with-deps</span> <span class="hljs-string">firefox</span> <span class="hljs-string">webkit</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Create</span> <span class="hljs-string">.env</span> <span class="hljs-string">for</span> <span class="hljs-string">preview</span> <span class="hljs-string">server</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        cat &gt; .env &lt;&lt;&#x27;EOF&#x27;
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
</span>    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">cross-browser</span> <span class="hljs-string">smoke</span> <span class="hljs-string">tests</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">test:cross-browser</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">Playwright</span> <span class="hljs-string">report</span>
      <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
      <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v7</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">cross-browser-smoke-report</span>
        <span class="hljs-attr">path:</span> <span class="hljs-string">playwright-report/</span>
        <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
</code></pre>
<p>تفصيلان حاملان.</p>
<p>أولًا: <code>DATABASE_URL=file:./ci.db</code> يُبقي تهيئة المعاينة في ملف واحد داخل مجلد العمل — بلا مراسم مجلد إضافي لمجرد تشغيل خادم المعاينة.</p>
<p>ثانيًا: اسم مخرج التقرير محدد. عندما يفشل فحص ليلي، تريد أن يُقرأ الفشل كـ «فشل دخان المتصفحات المتعددة»، لا «هناك مخرج ما في مكان ما، حظًا سعيدًا».</p>
<h2 id="ما-ما-زلت-بحاجة-إلى-تشغيله">ما ما زلت بحاجة إلى تشغيله</h2>
<p>ثبّت المتصفحات الإضافية مرة واحدة:</p>
<pre><code class="language-bash">npx playwright install --with-deps firefox webkit
</code></pre>
<p>شغّل الحلقة السريعة:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>شغّل حلقة الدخان الأوسع:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>:cross-browser
</code></pre>
<p>ثم اكسر شيئًا عمدًا في أحد اختبارات الدخان الموسومة وأعد تشغيل <code>npm run test:cross-browser</code>. ينبغي أن يخبرك المخرج بوضوح أي مشروع فشل: <code>chromium</code> أو <code>firefox-smoke</code> أو <code>webkit-smoke</code>. إن لم يكن الفشل خاصًا بمتصفح في المخرج، فأسماء مشاريعك أو تقاريرك غامضة أكثر من اللازم.</p>
<h2 id="المحلي-مقابل-المستضاف">المحلي مقابل المستضاف</h2>
<p><strong>محليًا:</strong> الإعداد والوسوم والسكربتات كلها قابلة للتحقق بالكامل الآن. يمكنك إثبات أن Chromium يبقى سريعًا وأن أمر الدخان الأوسع يتوزع على ثلاثة مشاريع.</p>
<p><strong>مستضافًا:</strong> التشغيل الليلي المجدول ما زال يحتاج GitHub Actions على مستودع حقيقي. حتى ذلك الحين، <code>workflow_dispatch</code> هو أسهل طريقة لإثبات شكل سير العمل دون انتظار صباح الغد.</p>
<h2 id="أنماط-تستحق-الاحتفاظ-بها">أنماط تستحق الاحتفاظ بها</h2>
<ul>
<li>أسماء المشاريع الصريحة تحمي الحلقة السريعة. <code>chromium</code> للعمل اليومي، و<code>firefox-smoke</code> و<code>webkit-smoke</code> للفحص الأوسع.</li>
<li>الوسوم تتفوق على حيل المسارات هنا. يمكن لمواصفة الدخان نفسها أن تبقى في <code>tests/</code> وتختار التغطية الأوسع بـ <code>@cross-browser</code>.</li>
<li>تثبيت المتصفح خطوة صريحة. عمل Chromium محليًا لا يعني أن Firefox وWebKit موجودان في أي مكان آخر.</li>
<li>أسماء المخرجات والمشاريع جزء من تجربة التنقيح. مهمة ليلية حمراء ينبغي أن تخبرك بالفعل أي متصفح غير راضٍ.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage">مختبر: إضافة تغطية عبر المتصفحات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقّق عبر المتصفحات دون حرق حلقة التطوير</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
