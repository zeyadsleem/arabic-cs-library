const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="cross-browser-validation-without-burning-the-dev-loop",t="التحقّق عبر المتصفّحات دون إحراق حلقة التطوير",p=[{depth:2,id:"لماذا-تظل-المتصفحات-الأخرى-مهمة",text:"لماذا تظلّ المتصفّحات الأخرى مهمة"},{depth:2,id:"لماذا-لا-أريد-المصفوفة-الكاملة-عند-كل-تعديل",text:"لماذا لا أريد المصفوفة الكاملة عند كل تعديل"},{depth:2,id:"مشاريع-playwright-التي-تقسم-العمل",text:"مشاريع Playwright التي تقسّم العمل"},{depth:2,id:"وسم-الاختبارات-الصحيحة-لا-كل-الاختبارات",text:"وسم الاختبارات الصحيحة، لا كل الاختبارات"},{depth:2,id:"webkit-إشارة-قوية-لا-ضمانة-قانونية",text:"WebKit إشارة قوية، لا ضمانة قانونية"},{depth:2,id:"أبق-مخرجات-الفشل-مقروءة",text:"أبقِ مخرجات الفشل مقروءة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"كيف-تعرف-أن-التقسيم-صحي",text:"كيف تعرف أن التقسيم صحّي"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>الاختبار عبر المتصفّحات من تلك الأفكار التي يوافق عليها الجميع من حيث المبدأ ويتجنّبها الجميع بهدوء في الممارسة، لأنها تهدّد بتحويل كل طلب سحب إلى حالة رهينة.</p>
<p>وهذا لا يحدث إلا إذا استخدمت النطاق الخاطئ.</p>
<p>والعلاج ليس «تجاهل المتصفّحات الأخرى». العلاج هو «أن تقرّر أي الفحوص تنتمي إلى Chromium، وأيّها ينتمي إلى مجموعة دخان صغيرة متعدّدة المتصفّحات، وأيّها ينتمي إلى تغطية ليلية». و<a href="https://playwright.dev/docs/test-projects">مشاريع Playwright</a> تجعل هذا التقسيم عمليًا.</p>
<blockquote>
<p><strong>المتطلّبات المسبقة</strong></p>
<p>يفترض هذا الملحق أن حلقة CI الأساسية قائمة بالفعل. ويبقى Chromium المتصفّح الافتراضي السريع في المسار الرئيسي للورشة. والمتصفّحات الإضافية تنتمي إلى هنا لأنها قيّمة وأغلى كلفةً.</p>
</blockquote>
<h2 id="لماذا-تظل-المتصفحات-الأخرى-مهمة">لماذا تظلّ المتصفّحات الأخرى مهمة</h2>
<p>بعض الأخطاء خاصّة بمتصفّح بعينه على نحو رائع:</p>
<ul>
<li>اختلاف في معالجة التركيز</li>
<li>حقول التاريخ وعناصر التحكّم في النماذج تُصيَّر بشكل مختلف</li>
<li>تخطيط CSS أو التجاوز (overflow) يتصرّف بشكل مختلف قليلًا</li>
<li>ميزة تعمل في Chromium وتصير غريبة في Firefox</li>
<li>تشغيل WebKit يكشف المشكلة التي كان مستخدمك على Mac يشتكي منها طوال الوقت</li>
</ul>
<p>وإن كان جوابك على كل ذلك هو «حسنًا، اختبار Chromium نجح»، فجوابك ليس نافعًا كثيرًا.</p>
<h2 id="لماذا-لا-أريد-المصفوفة-الكاملة-عند-كل-تعديل">لماذا لا أريد المصفوفة الكاملة عند كل تعديل</h2>
<p>لأن معظم التعديلات لا تستحقّها.</p>
<p>فإن كان الوكيل يغيّر إصلاحًا لنصّ واجهة أو إعادة هيكلة صغيرة في الخادم، فانتظار Chromium وFirefox وWebKit معًا وقت مهدور. وينبغي أن تبقى حلقة التطوير رخيصة افتراضيًا.</p>
<p>وتقسيمي الافتراضي:</p>
<ul>
<li><strong>حلقة محلية سريعة لطلبات السحب</strong>: Chromium</li>
<li><strong>حلقة دخان صغيرة متعدّدة المتصفّحات</strong>: Firefox وWebKit على مجموعة ضيّقة من المسارات</li>
<li><strong>حلقة ليلية أوسع</strong>: المصفوفة الأكمل، أو على الأقل أكثر المسارات عرضة للفشل</li>
</ul>
<p>هذا هو التوازن الذي رأيت فرقًا تحافظ عليه فعلًا.</p>
<h2 id="مشاريع-playwright-التي-تقسم-العمل">مشاريع Playwright التي تقسّم العمل</h2>
<p>مشاريع Playwright هي الآلية التي تجعل «Chromium عند كل تعديل، وFirefox وWebKit على مجموعة دخان فرعية» تعمل فعلًا. فكل مشروع كتلة تهيئة مسمّاة داخل <code>playwright.config.ts</code>، ويمكنها أن تشير إلى متصفّح مختلف، و<code>testMatch</code> مختلف، ومجموعة خيارات مختلفة. والشكل النهائي — لا ما يُشحن في النسخة الابتدائية اليوم، بل ما سيبدو عليه Shelf بعد أن تكون مختبرات المصادقة والتصوّر البصري والأداء والمتصفّحات قد استقرّت كلها — يبدو تقريبًا هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-attr">projects</span>: [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;public&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(smoke|visual|playground)\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: {
      ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>],
    },
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(rate-book|accessibility|visual-authenticated|performance)\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: {
      ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>],
      <span class="hljs-attr">storageState</span>: storageStatePath,
    },
    <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
  },
  <span class="hljs-comment">// Cross-browser smoke projects. They run only the \`smoke.spec.ts\` file</span>
  <span class="hljs-comment">// against Firefox and WebKit. Skip them by default — invoke via</span>
  <span class="hljs-comment">// \`npm run test:cross-browser\` when you specifically want the</span>
  <span class="hljs-comment">// expanded matrix.</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;firefox-smoke&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/smoke\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Firefox&#x27;</span>] },
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;webkit-smoke&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/smoke\\.spec\\.ts/</span>,
    <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Safari&#x27;</span>] },
  },
];
</code></pre>
<p>مرة أخرى: هذا هو المقصد النهائي، لا ملف Shelf الحالي. فالنسخة الابتدائية تشحن <code>playwright.config.ts</code> أصغر بكثير، وأنت تبني نحو هذا في منتصف الدورة. والتقسيم المهم في هذا الدرس أبسط: أبقِ Chromium الحلقة السريعة الافتراضية، واجعل Firefox وWebKit مشروعي دخان اختياريين. وحينها يستطيع سكربت <code>npm run test</code> الافتراضي أن يثبّت المشروع السريع كي لا يتسرّب Firefox وWebKit إلى الحلقة اليومية:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --project=chromium&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test:cross-browser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>ثبّت المتصفّحات الإضافية أولًا</strong></p>
<p>لا يثبّت Playwright إلا Chromium حين تُهيّئ الحلقة السريعة. وقبل تشغيل <code>npm run test:cross-browser</code> للمرة الأولى — محليًا أو في مشغّل CI جديد — ثبّت ثنائيات المتصفّحات المتعدّدة صريحًا:</p>
<pre><code class="language-bash">npx playwright install --with-deps firefox webkit
</code></pre>
<p>تخطَّ هذا وستفشل مشاريع المتصفّحات البديلة بخطأ «browser not installed» لا علاقة له بشيفرة اختبارك. وسير العمل الليلي الذي تبنيه في المختبر التالي ينبغي أن يشغّل سطر التثبيت نفسه في مهمّته <code>cross-browser-smoke</code> للسبب نفسه.</p>
</blockquote>
<h2 id="وسم-الاختبارات-الصحيحة-لا-كل-الاختبارات">وسم الاختبارات الصحيحة، لا كل الاختبارات</h2>
<p>الخطأ الذي يقع فيه الناس هو محاولة تشغيل المجموعة كلها في كل مكان.</p>
<p>لا تفعل.</p>
<p>وسم الاختبارات التي تستحقّ تغطية متعدّدة المتصفّحات:</p>
<ul>
<li>تسجيل الدخول</li>
<li>التنقّل</li>
<li>الحوارات والقوائم</li>
<li>نموذجان أو ثلاثة عالية القيمة</li>
<li>المسارات التي تؤذي فيها أخطاء التخطيط أكثر من غيرها</li>
</ul>
<p>هذا يمنحك مجموعة صغيرة مستقرة تجيب عن «هل يعمل المنتج أساسًا في هذه المحرّكات؟». أما البقية فتبقى Chromium أولًا إلى أن يخبرك التاريخ بغير ذلك.</p>
<p>المشاريع طريقة واحدة للتصفية. وأوسمة الاختبار المدمجة في Playwright هي الأخرى، والاثنتان متكاملتان. وسِم اختبارًا بـ<code>@cross-browser</code> لتعلّمه جزءًا من مجموعة الدخان متعدّدة المتصفّحات، ثم شغّله صريحًا بـ<code>--grep</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/rate-book.spec.ts</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;user can rate Station Eleven&#x27;</span>, { <span class="hljs-attr">tag</span>: <span class="hljs-string">&#x27;@cross-browser&#x27;</span> }, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// ...</span>
});
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># Run every @cross-browser-tagged test in both alternate engines:</span>
npx playwright <span class="hljs-built_in">test</span> --project=firefox-smoke --project=webkit-smoke --grep @cross-browser
</code></pre>
<p>المشاريع تقول «أي متصفّح + أي نمط مطابقة ملفات». والأوسمة تقول «أي اختبارات بعينها داخل ذلك النمط». استخدم المشاريع حين يكون التقسيم بحسب <em>الملف</em> (كل اختبارات الدخان تذهب إلى Firefox، ولا واحدة من اختبارات تقييم الكتب تفعل)، والأوسمة حين يكون التقسيم بحسب <em>اختبار داخل ملف</em> (فملف تقييم الكتب فيه عشرة اختبارات، لكن اثنين فقط يستحقّان تغطية متعدّدة المتصفّحات).</p>
<p>وإن كنت تدمج تقارير من مهمّات متصفّحات متعدّدة لاحقًا، فأرفق <code>metadata</code> لكل مشروع — مثل <code>metadata: { lane: 'firefox-smoke' }</code> على مشروع Firefox — كي يستطيع التقرير المدمج أن يخبرك «هذا جاء من مهمّة دخان Firefox» بدلًا من تسطيح كل شيء في كتلة أدلّة واحدة بلا وسم.</p>
<p>وإن كبرت مجموعة الدخان بما يكفي لتحتاج تقسيمًا (sharding)، فـ<code>fullyParallel: true</code> هو الإعداد الذي يُبقي الأجزاء متوازنة على مستوى الاختبار لا على مستوى الملف. وإن كان تقرير HTML المدمج يخدم المرفقات من دلو خارجي بدلًا من مجلد المخرجات المستخرج، فـ<a href="https://playwright.dev/docs/test-reporters"><code>attachmentsBaseURL</code></a> هو ما يمنع روابط الآثار ولقطات الشاشة تلك من أن تصير صمتًا ميتًا.</p>
<h2 id="webkit-إشارة-قوية-لا-ضمانة-قانونية">WebKit إشارة قوية، لا ضمانة قانونية</h2>
<p>يمنحك Playwright Chromium وFirefox وWebKit. وهذا بالضبط ما تريده لتغطية الأتمتة. ويجدر أيضًا أن نكون صادقين في الفرق الدقيق: WebKit أفضل إشارة آلية لديك عن سلوك عائلة Safari، لا ضمانة سحرية عن كل خصوصية Safari على جهاز حقيقي في العالم.</p>
<p>وهذا مع ذلك قيّم للغاية. فقط لا تُبالغ في بيعه.</p>
<h2 id="أبق-مخرجات-الفشل-مقروءة">أبقِ مخرجات الفشل مقروءة</h2>
<p>تصير إخفاقات المتصفّحات المتعدّدة صاخبة سريعًا إن لم تفصلها بنظافة.</p>
<p>أنا أريد:</p>
<ul>
<li>اسم المتصفّح في اسم المهمّة أو الأثر</li>
<li>آثارًا ولقطات شاشة محفوظة لكل متصفّح</li>
<li>تقارير blob لكل متصفّح حين يكون التشغيل مقسّمًا أو موزّعًا على مهمّات</li>
<li>مجموعة اختبارات صغيرة بما يكفي ليكون المتصفّح الفاشل واضحًا</li>
</ul>
<p>فحين يفشل Firefox وينجح Chromium، لا ينبغي للوكيل أن يحتاج رواية بوليسية. ينبغي أن يحصل على أثر نظيف وأمر إعادة إنتاج نظيف.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Cross-browser checks</span>

<span class="hljs-bullet">-</span> Chromium is the default fast browser for local iteration.
<span class="hljs-bullet">-</span> Cross-browser coverage runs on a tagged smoke subset, not the entire
  suite by default.
<span class="hljs-bullet">-</span> If a bug is reported as browser-specific, reproduce it in the relevant
  browser project before proposing a fix.
<span class="hljs-bullet">-</span> Treat browser-specific failures as real failures, not as flaky noise,
  unless you can point to a known infrastructure issue.
</code></pre>
<h2 id="كيف-تعرف-أن-التقسيم-صحي">كيف تعرف أن التقسيم صحّي</h2>
<p>تكون لديك حلقة متعدّدة المتصفّحات نافعة حين:</p>
<ul>
<li>يبقى Chromium الافتراضي السريع</li>
<li>يعمل Firefox وWebKit على مجموعة دخان صغيرة عن قصد</li>
<li>تجعل الآثار واضحًا أي متصفّح فشل ولماذا</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>لا يتعلّق التحقّق عبر المتصفّحات بتشغيل كل شيء في كل مكان. بل بتشغيل المجموعة الصغيرة <em>الصحيحة</em> في المتصفّحات الأرجح أن تختلف، دون إبطاء كل تعديل حتى يصير مأساة صغيرة.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI بوصفه حلقة الملاذ الأخير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage">مختبر: أضف تغطية عبر المتصفّحات</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
