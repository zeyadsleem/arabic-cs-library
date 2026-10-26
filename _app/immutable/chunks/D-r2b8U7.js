const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="deterministic-state-and-test-isolation",t="الحالة الحتمية وعزل الاختبارات",l=[{depth:2,id:"نمط-الفشل",text:"نمط الفشل"},{depth:2,id:"القاعدتان",text:"القاعدتان"},{depth:2,id:"القاعدة-الأولى-زرع-البيانات",text:"القاعدة الأولى: زرع البيانات"},{depth:2,id:"القاعدة-الثانية-فقاعات-العزل",text:"القاعدة الثانية: فقاعات العزل"},{depth:2,id:"ما-يفعله-shelf-اليوم-ولماذا",text:"ما يفعله Shelf اليوم، ولماذا"},{depth:2,id:"fixtures-الاختبار-للإعداد-المشترك",text:"Fixtures الاختبار للإعداد المشترك"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>تعاملنا مع الأشياء خارج تطبيقك — واجهة Open Library API — بتسجيل HAR وإعادة تشغيله. الآن نحتاج إلى التعامل مع الأشياء <em>داخل</em> تطبيقك: قاعدة البيانات، والجلسة، وأي شيء ذي حالة يكتب فيه اختبار وقد يقرأ منه اختبار آخر.</p>
<p>هذا هو الدرس الذي تصبح فيه اختبارات Playwright قابلة للتنبؤ. وهو أيضًا الدرس الذي تتخطاه معظم المشاريع — وهو سبب كون معظم حزم Playwright جدارًا من تعليقات <code>.only</code> و<code>.skip</code> مع شخص واحد في الفريق يعرف كيف يفتح الحزمة من جديد.</p>
<h2 id="نمط-الفشل">نمط الفشل</h2>
<pre><code>✓ test 1: add book passes
✓ test 2: rate book passes
✗ test 3: view shelf fails—expected 3 books, got 7
</code></pre>
<p>يفشل الاختبار 3 لأن الاختبارين 1 و2 تركا بيانات خلفهما. أو لأن الاختبار 2 من تشغيل CI <em>الليلة الماضية</em> ترك بيانات خلفه. أو لأن المطوّر شغّل الاختبار محليًا أمس ولم ينظّف. أو لأن الاختبارات تعمل بالتوازي واثنان منها يكتبان في رفّ المستخدم نفسه في الوقت نفسه، متسابقين إلى نتيجة غير حتمية.</p>
<p>كل واحد من هذه هو «الحزمة غير معزولة». ذلك هو الداء. وكل ما سنفعله الآن هو العلاج.</p>
<h2 id="القاعدتان">القاعدتان</h2>
<p>القاعدة الأولى: <strong>كل اختبار يبدأ في حالة معروفة.</strong> لا حالة مجهولة، ولا «أيًا كان ما كان هناك في المرة الماضية»، ولا «الحالة التي صادف أن تركها الاختبار السابق». نقطة بداية محدّدة ومسمّاة. ينبغي أن يستطيع الوكيل قراءة الاختبار ومعرفة البيانات الموجودة بالضبط عند بدايته.</p>
<p>القاعدة الثانية: <strong>كل اختبار ينظّف بعد نفسه، أو يعمل في فقاعة تُهدَم.</strong> أميل قليلًا إلى نهج الفقاعة لأن «ينظّف بعد نفسه» سهل النسيان وصعب التحقق.</p>
<p>لننظر إلى الاثنتين.</p>
<h2 id="القاعدة-الأولى-زرع-البيانات">القاعدة الأولى: زرع البيانات</h2>
<p>يستخدم Shelf قاعدة SQLite عبر <a href="https://orm.drizzle.team/">Drizzle</a>. لاختبارات الطرف إلى الطرف، نريد طريقة لإعادة ضبط قاعدة البيانات إلى حالة معروفة قبل كل اختبار (أو كل ملف اختبار). النسخة الساذجة هي «نثر استدعاءات <code>db.delete(...)</code> في ملفات الاختبار». هذا ينجح لنهار واحد ويتحول إلى فوضى صيانة فورًا.</p>
<p>المشروع الأولي الحالي يتوقف عمدًا قبل طبقة واحدة من شحن مساعد الزرع الفعلي. بدلًا من ذلك يمنحك لبنين:</p>
<ul>
<li>أدوات مساعدة صغيرة على الخادم مثل <code>createUser</code> و<code>createBook</code> و<code>createShelfEntry</code> في <code>src/lib/server/</code></li>
<li>fixtures بصيغة JSON في <code>tests/data/*.json</code></li>
</ul>
<p>ثم يطلب منك مختبر الزرع الحتمي كتابة <code>tests/helpers/seed.ts</code> فوق تلك القطع. الفائدة تربوية: ينبغي أن يركّز الطلاب على Playwright والحالة الحتمية، لا أن يمضوا الدرس كله في هندسة عكسية لاستدعاءات إدراج Drizzle الخام.</p>
<p>لأدوات المشروع الأولي توقيعات مبسّطة تبدو تقريبًا هكذا (الصادرات الحقيقية دوال سهمية وتأخذ حقولًا أكثر، مثل <code>isAdmin</code> للمستخدمين و<code>featuredPosition</code> للكتب):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// src/lib/server/users.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createUser</span>(<span class="hljs-params">{ email, password, name }: <span class="hljs-title class_">CreateUserInput</span></span>) {
  <span class="hljs-comment">// hashes the password and inserts the row</span>
}

<span class="hljs-comment">// src/lib/server/books.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createBook</span>(<span class="hljs-params">{ openLibraryId, title, author, description }: <span class="hljs-title class_">CreateBookInput</span></span>) {
  <span class="hljs-comment">// inserts the row and returns it</span>
}

<span class="hljs-comment">// src/lib/server/shelf-entries.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createShelfEntry</span>(<span class="hljs-params">{ userId, bookId, status, rating }: <span class="hljs-title class_">CreateShelfEntryInput</span></span>) {
  <span class="hljs-comment">// inserts the row and returns it</span>
}
</code></pre>
<p>وبيانات الزرع تعيش في JSON صريح:</p>
<pre><code class="language-json"><span class="hljs-comment">// tests/data/users.json</span>
<span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;alice@example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;password&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ShelfStarter123!&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Alice Reader&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isAdmin&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>المساعد الذي يبنيه الطلاب في المختبر يقرأ ملفات JSON تلك، ويستدعي أدوات الخادم، ويصدّر الدالتين التي تعتمد عليهما بقية الحزمة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/helpers/seed.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">seedFreshDatabase</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// reset users, books, and shelf entries from tests/data/*.json</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">resetShelfContent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// preserve users, reset books + shelf entries from tests/data/*.json</span>
}
</code></pre>
<p>ثم في اختبار:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { resetShelfContent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./helpers/seed&#x27;</span>;

test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;alice can add Piranesi to her shelf&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search?q=piranesi&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Add to shelf&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Added to your shelf&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>كل اختبار يبدأ بـ alice، وثلاثة كتب، ومدخلَي رفّ (Station Eleven وPiranesi). هذا هو العقد. وإذا احتاج اختبار بيانات مختلفة، فهو يزرع بيانات مختلفة <em>صراحةً</em>، لا بأمل أن بعض الاختبارات السابقة تركتها هناك.</p>
<p>المهم هنا أن الزرع <em>سريع</em> على SQLite. يمكنك تحمّل إعادة الزرع قبل كل اختبار. أما إذا كنت على Postgres واستغرق إعادة الزرع ثانيتين، فقد تعيد الزرع لكل ملف بدلًا من كل اختبار، أو تستخدم المعاملات (المزيد عن ذلك بعد قليل).</p>
<h2 id="القاعدة-الثانية-فقاعات-العزل">القاعدة الثانية: فقاعات العزل</h2>
<p>الزرع ينقلك إلى حالة <em>بداية</em> معروفة. والعزل ينقلك إلى <em>عملية</em> معروفة — اختباران يعملان بالتوازي لا يرى أحدهما كتابات الآخر، نقطة.</p>
<p>هناك ثلاث استراتيجيات شائعة. اختر واحدة بناءً على قاعدة بياناتك.</p>
<p><strong>معاملات لكل اختبار.</strong> لفّ كل اختبار في معاملة، وارجع عنها في النهاية. هذا أسرع خيار ولا يحتاج أي كود تنظيف، لأن شيئًا لم يُثبَّت قط. المأخذ: لا ينجح إلا إذا أعاد كود تطبيقك استخدام اتصال قاعدة البيانات نفسه الذي يفتحه الاختبار. غالبًا ما يكسر تجميع الاتصالات على مستوى Node هذا، وعليك الحذر مع معالجات الطلبات على مستوى الإطار. يدعم <a href="https://orm.drizzle.team/">Drizzle</a> هذا عبر <code>database.transaction</code>، لكن وصله بمعالجات طلبات SvelteKit يتطلب سباكة أكثر من درس كامل. يستحق المعرفة؛ لكنه ليس توصيتي الافتراضية.</p>
<p><strong>قواعد بيانات لكل عامل.</strong> <a href="https://playwright.dev/docs/test-parallel">يشغّل Playwright عدة عمال عندما يعمل بالتوازي.</a> يحصل كل عامل على ملف SQLite خاص به، ومخطّط خاص به، وزرع خاص به. تتشارك الاختبارات داخل العامل قاعدة البيانات نفسها لكنها تعمل دائمًا تسلسليًا، فلا يمكنها التسابق. هذا هو المكان الذي أريد أن تنتهي إليه مشاريع SQLite في نهاية المطاف. نسخة Shelf مستقبلية قد تبدو تقريبًا هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// playwright.config.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">fullyParallel</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">workers</span>: <span class="hljs-number">4</span>,
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://localhost:5173&#x27;</span>,
  },
});

<span class="hljs-comment">// What the db helper would look like (Shelf today keys off databaseUrl,</span>
<span class="hljs-comment">// not TEST_WORKER_INDEX — this is aspirational):</span>
<span class="hljs-keyword">const</span> workerDatabasePath = <span class="hljs-string">\`./test-database-<span class="hljs-subst">\${process.env.TEST_WORKER_INDEX ?? <span class="hljs-number">0</span>}</span>.sqlite\`</span>;
</code></pre>
<p>كل عامل يوجّه التطبيق إلى ملف SQLite مختلف. وعندما يشغّل Playwright خادم التطوير (أو تشغّله أنت بنفسك بمتغيّر البيئة الصحيح)، يقرأ فهرس العامل ويستخدم قاعدة البيانات المطابقة.</p>
<p><strong>نطاقات لكل اختبار.</strong> إذا كانت البيانات ذات نطاق طبيعي (مستخدم، أو مؤسسة، أو مستأجر)، فاجعل كل اختبار ينشئ نطاقه الخاص. Alice-1 للاختبار 1، وAlice-2 للاختبار 2. ثم تقرأ الاختبارات وتكتب داخل نطاقها ولا تتصادم أبدًا. هذا أثقل تكليف من الثلاثة لكنه أيضًا الأكثر مناعة، وينتقل إلى أي قاعدة بيانات بما فيها Postgres الشبيهة بالإنتاج.</p>
<h2 id="ما-يفعله-shelf-اليوم-ولماذا">ما يفعله Shelf اليوم، ولماذا</h2>
<p>لا يثبّت <code>playwright.config.ts</code> في Shelf قيمة <code>workers: 1</code>، وهذا هو الشكل الابتدائي الصحيح. الحزمة المشحونة صغيرة عمدًا: مواصفة دخان عامة واحدة، وأشجار مختبرات متجاهلة افتراضيًا، ولا مصفوفة مصادقة بعد. في ذلك العالم، أنظف تهيئة هي التهيئة الصادقة.</p>
<p>ما يتغيّر بمجرد أن تبني المختبرات اللاحقة هو مقدار الحالة المشتركة القابلة للتغيير. في اللحظة التي تضيف فيها مواصفات مصادقة تتحدث كلها إلى ملف SQLite نفسه، يتوقف عدد العمال عن كونه نظريًا. وإذا كشف رفع عدد العمال عن أعطال، فليس Playwright هو الوقح. إنها الحزمة تقول لك أخيرًا إن قصة عزل قاعدة البيانات ناقصة.</p>
<p>الإصلاح المغري هو <code>workers: 1</code>. تستخدمه أحيانًا مؤقتًا أثناء فتح طريق إعادة هيكلة. لا بأس. لكن ما يجب ألا تفعله هو أن تظن أن هذه الجبيرة المؤقتة هي التصميم النهائي. العامل الواحد يخفي التسريبات؛ ولا يزيلها.</p>
<p>الخطوة الدائمة التالية لمشروع SQLite مثل Shelf هي نمط قاعدة البيانات لكل عامل أعلاه. يحصل كل عامل على ملفه الخاص، ويقرأ الخادم <code>TEST_WORKER_INDEX</code>، ويوجّه مساعد الزرع إلى الملف نفسه الذي يستخدمه التطبيق. حينها يمكنك رفع عدد العمال مجددًا دون معاملة التوازي كخطأ.</p>
<h2 id="fixtures-الاختبار-للإعداد-المشترك">Fixtures الاختبار للإعداد المشترك</h2>
<p><a href="https://playwright.dev/docs/test-fixtures">‏<code>test.extend</code> في Playwright</a> هو الطريقة النظيفة لربط بيانات الزرع بالاختبارات عندما تجد نفسك تكرّر كتلة <code>beforeEach</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> base, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> { resetShelfContent, <span class="hljs-keyword">type</span> <span class="hljs-title class_">SeedResult</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./helpers/seed&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Fixtures</span> = {
  <span class="hljs-attr">seeded</span>: <span class="hljs-title class_">SeedResult</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-property">extend</span>&lt;<span class="hljs-title class_">Fixtures</span>&gt;({
  <span class="hljs-attr">seeded</span>: <span class="hljs-title function_">async</span> ({}, use) =&gt; {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(result);
    <span class="hljs-comment">// no cleanup—reseeding handles it on the next test</span>
  },
});

<span class="hljs-keyword">export</span> { expect };
</code></pre>
<p>وفي اختبار:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./fixtures&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;reader can rate Station Eleven&#x27;</span>, <span class="hljs-title function_">async</span> ({ page, seeded }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-comment">// \`seeded.reader\` is available if the test needs the user id or email</span>
  <span class="hljs-comment">// ...</span>
});
</code></pre>
<p>يعمل الـ fixture تلقائيًا عندما يستورد أي اختبار هذا <code>test</code>. لا مزيد من قوالب <code>beforeEach</code> المتناثرة في الملفات. ولأن منطق الزرع مركزي، فتحيث بيانات الأساس تغيير في ملف واحد.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Database state in end-to-end tests</span>

<span class="hljs-bullet">-</span> Every test runs against a freshly seeded database. The seed lives in
  <span class="hljs-code">\`tests/helpers/seed.ts\`</span>.
<span class="hljs-bullet">-</span> Tests must not depend on data left by previous tests. If a test
  needs specific data, add it to the seed or insert it explicitly at the
  top of the test.
<span class="hljs-bullet">-</span> Individual specs call <span class="hljs-code">\`resetShelfContent\`</span>, which does <span class="hljs-emphasis">_not_</span> reset user
  accounts. Only the authentication setup project uses <span class="hljs-code">\`seedFreshDatabase\`</span>,
  because deleting users invalidates the stored browser session.
<span class="hljs-bullet">-</span> The Shelf starter does not pin <span class="hljs-code">\`workers\`</span> because the shipped suite is
  intentionally tiny. Once authenticated specs start sharing one SQLite
  file, treat worker-count failures as isolation bugs to fix, not as a
  reason to hard-code <span class="hljs-code">\`workers: 1\`</span> forever.
</code></pre>
<p>القاعدة الأخيرة مهمة. سيعطّل الوكلاء التوازي بسرور لجعل اختبار فاشل ينجح. ينجح الأمر، ويصبح أخضر، وهو أيضًا انحدار صامت في سرعة الحزمة وضمانات العزل. لا تدعهم يفعلون ذلك.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>ثابتان يجعلان حزمة Playwright جديرة بالثقة: كل اختبار يبدأ في حالة معروفة، ولا يمكن لاختبارين أن يرى أحدهما حالة الآخر. تحصل على الأول من مساعد زرع تستطيع كل مواصفة استدعاؤه مباشرة. وتحصل على الثاني باختيار استراتيجية تدعمها قاعدة بياناتك — ملفات لكل عامل، أو معاملات، أو نطاقات — وبمعاملة التوازي المتقلّب كتسريب يجب إصلاحه، لا كمقبض يُخفَّض.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation">تسجيل HARs لعزل الشبكة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests">اختبارات هجينة بين API والواجهة</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,e as slug,t as title};
