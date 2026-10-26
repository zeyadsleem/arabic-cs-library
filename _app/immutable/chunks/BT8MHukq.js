const e="kinney",t="self-testing-ai-agents",s="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="lab-harden-the-flaky-rate-book-test",n="مختبر: تحصين اختبار تقييم الكتاب المتذبذب",o=[{depth:2,id:"نقطة-البداية",text:"نقطة البداية"},{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"الترتيب-المقترح-للهجوم",text:"الترتيب المقترح للهجوم"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"حالة-نهاية-ناجحة",text:"حالة نهاية ناجحة"},{depth:2,id:"كيف-يبدو-هذا-أمام-وكيل-حقيقي",text:"كيف يبدو هذا أمام وكيل حقيقي"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],i=`<p>حان وقت صرف الشيكات من الدروس القليلة الماضية. فنسخة Shelf الانطلاقية لا تشحن <code>tests/rate-book.spec.ts</code>. ومهمتك في هذا المختبر أن <em>تبني</em> ذلك الملف بيدك من النسخة الخشنة عمدًا أدناه، وتربط فيه المصادقة وبيانات الزرع والمحددات وأنماط الانتظار أثناء تقدّمك، كي يستقرّ كل نمط من أنماط درع Playwright في أصابعك لا في عينيك فقط.</p>
<p>النسخة الخشنة تعمل. نوعًا ما. إنها تنجح إلى أن تصبح الآلة أبطأ، أو تنزاح المحددات، أو تتوقف حالة قاعدة البيانات عن مطابقة افتراضاتك. وهي تجمع كل نمط مضاد في Playwright في ملف قصير واحد، ما يجعلها مكانًا رائعًا لتحصين الحلقة كلها.</p>
<blockquote>
<p><strong>ما تمنحك إياه النسخة الانطلاقية الدنيا وما لا تمنحك إياه</strong></p>
<p>تمنحك النسخة الانطلاقية الحالية ملف <code>playwright.config.ts</code> صغيرًا واحدًا، وحلقة الدخان العامة في <code>tests/smoke.spec.ts</code>، وملفات بيانات الزرع تحت <code>tests/data/</code>، والدوال المساعدة المنخفضة المستوى للإنشاء والحذف تحت <code>src/lib/server/</code>. وهي <strong>لا</strong> تشحن مصادقة حالة التخزين، ولا مشروع Playwright مُوثَّقًا، ولا ملف <code>tests/helpers/seed.ts</code> مكتملًا. هذا المختبر هو حيث تصبح تلك القطع حقيقية.</p>
</blockquote>
<p>مهمتك إصلاحه. وكل نمط تعلّمناه في دروس Playwright ينطبق هنا.</p>
<h2 id="نقطة-البداية">نقطة البداية</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;user can rate a book&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/login&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=email]&#x27;</span>, <span class="hljs-string">&#x27;alice@example.com&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=password]&#x27;</span>, <span class="hljs-string">&#x27;password123&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">click</span>(<span class="hljs-string">&#x27;button[type=submit]&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">1000</span>);

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">2000</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.book-card button.rate&#x27;</span>).<span class="hljs-title function_">first</span>().<span class="hljs-title function_">click</span>();

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.rating-modal .star[data-value=&quot;4&quot;]&#x27;</span>).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.rating-modal button.submit&#x27;</span>).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">1500</span>);

  <span class="hljs-keyword">const</span> toast = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.toast&#x27;</span>).<span class="hljs-title function_">textContent</span>();
  <span class="hljs-title function_">expect</span>(toast).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;Thanks&#x27;</span>);
});
</code></pre>
<p>عُدّ المشكلات. أنا أعدّ ثمانيًا. انظر إن كان بوسعك إيجاد المزيد.</p>
<ul>
<li>تسجيل دخول عبر الواجهة في أعلى كل اختبار.</li>
<li>ثلاثة نداءات <code>waitForTimeout</code> بثلاثة أرقام سحرية مختلفة.</li>
<li>محددات CSS في كل مكان.</li>
<li><code>.locator(...)</code> متسلسلة بمحددات مركّبة ستنكسر حين يمسّ أي أحد أسماء الفئات.</li>
<li><code>.first()</code> للتعامل مع وجود أكثر من <code>.book-card</code>، بدلًا من تحديد نطاق كتاب معين.</li>
<li><code>textContent()</code> تُقرأ في متغيّر وتُؤكَّد بـ<code>.toContain</code>، متجاوزة إعادة المحاولة التلقائية في Playwright.</li>
<li>لا زرع، فيعتمد الاختبار على ما تصادف أن تحتويه قاعدة البيانات.</li>
<li>لا محاكاة شبكة، فيصيب طلب POST للتقييم نقطة نهاية API حقيقية وتكون الاستجابة بطيئة أحيانًا.</li>
</ul>
<h2 id="المهمة">المهمة</h2>
<p>أعد كتابة الاختبار بحيث ينجح في كل تشغيل على حاسوب محمول سريع وآلة CI بطيئة معًا. وينبغي أن تنتهي بتطبيق ما يلي كحدّ أدنى:</p>
<ol>
<li>المصادقة بحالة التخزين (بلا تسجيل دخول عبر الواجهة).</li>
<li>الزرع (الكتاب موجود في قاعدة البيانات قبل تشغيل الاختبار).</li>
<li>محددات <code>getByRole</code> مع تسلسل محدّد النطاق.</li>
<li>تأكيدات <code>expect</code> بإعادة محاولة تلقائية بدلًا من <code>textContent</code> + <code>toContain</code>.</li>
<li><code>page.waitForResponse</code> لطلب POST الخاص بالتقييم، لا مهلة.</li>
<li>صفر نداءات <code>waitForTimeout</code> في أي مكان في الملف.</li>
</ol>
<p>قد تريد أيضًا استخدام تجهيزة <code>request</code> للتحقّق من أن التقييم وصل فعلًا إلى قاعدة البيانات، كتأكيد ثانٍ فوق فحص الواجهة.</p>
<h2 id="الترتيب-المقترح-للهجوم">الترتيب المقترح للهجوم</h2>
<p>اعمل من الأعلى إلى الأسفل. أصلح نمطًا واحدًا، شغّل الاختبار، ثم امضِ.</p>
<p>ابدأ بإنشاء <code>tests/authentication.setup.ts</code> وربط <code>playwright.config.ts</code> ليستخدمه عبر مشروع <code>setup</code> زائد مشروع <code>authenticated</code>. واحذف كتلة تسجيل الدخول من الاختبار. في نسخة Shelf الانطلاقية الحالية، الإعداد المستقر تسجيل دخول يقوده المتصفح في مشروع setup: انتقل إلى <code>/login</code>، واملأ النموذج عبر الصفحة، واحفظ الحالة بـ<code>page.context().storageState(...)</code>. شغّل الإعداد مرة واحدة لتتأكد من أن المصادقة تعمل. ثم التزم. (راجع درس المصادقة بحالة التخزين للنمط الكامل.)</p>
<p>بعد ذلك، نفّذ <code>tests/helpers/seed.ts</code> كي يكون الكتاب الذي ستقيّمه في قاعدة البيانات قبل تشغيل الاختبار. ابنِه من <code>tests/data/*.json</code> زائد دوال الإنشاء والحذف الصغيرة في <code>src/lib/server</code> التي تشحنها النسخة الانطلاقية. واحذف أي اعتماد على «ما هو موجود على الرف أصلًا». ثم التزم.</p>
<p>ثم أنشئ <code>tests/rate-book.spec.ts</code> من النسخة الخشنة أدناه، لكن شغّله تحت مشروع <code>authenticated</code> الجديد بدلًا من تسجيل الدخول داخل الاختبار. وحين يوجد الملف، استبدل محددات CSS بسلاسل <code>getByRole</code>. حدّد النطاق بعنوان الكتاب، ثم باسم الزر داخل الكتاب. شغّل الاختبار محليًا بضع مرات. ثم التزم.</p>
<p>بعد ذلك، استبدل كل <code>waitForTimeout</code> إما بتأكيد <code>expect(locator).toBeVisible()</code> أو بـ<code>page.waitForResponse</code> على طلب POST للتقييم. احذف نمط <code>textContent</code> + <code>toContain</code> واستخدم <code>expect(toast).toHaveText(/Thanks/)</code> بدلًا منه. ثم التزم.</p>
<p>أخيرًا، أضف تأكيدًا ثانيًا باستخدام <code>request.get('/api/shelf/...')</code> للتحقّق من أن التقييم محفوظ فعلًا. هذا ليس مطلوبًا بصرامة، لكنه نوع الفحص الهجين الذي يلتقط أخطاء «الواجهة تقول نجاح لكن قاعدة البيانات تعترض». ثم التزم.</p>
<h2 id="معايير-القبول">معايير القبول</h2>
<ul>
<li><code>rg &quot;waitForTimeout&quot; tests/rate-book.spec.ts</code> لا يعيد شيئًا.</li>
<li><code>rg &quot;page.locator\\(&quot; tests/rate-book.spec.ts</code> لا يعيد شيئًا.</li>
<li><code>rg &quot;page.goto\\('/login'\\)&quot; tests/rate-book.spec.ts</code> لا يعيد شيئًا.</li>
<li><code>rg &quot;page.fill\\(\\[name=&quot; tests/rate-book.spec.ts</code> لا يعيد شيئًا.</li>
<li>ينجح الاختبار عشر مرات متتالية: <code>for i in {1..10}; do npx playwright test tests/rate-book.spec.ts --project=authenticated || break; done</code> ولا تخرج أي تكرار بقيمة غير صفرية.</li>
<li>ينجح الاختبار مع رسم مشاريع Playwright الذي بنيته في هذا المختبر: setup ينشئ حالة التخزين، ومواصفات authenticated تعيد استخدامها، ولم يعد الاختبار يعتمد على تسجيل دخول عبر الواجهة.</li>
<li>انخفض الزمن الجداري للمجموعة لـ<code>rate-book.spec.ts</code> مقارنة بالأساس. قِس بـ<code>time npx playwright test tests/rate-book.spec.ts --project=authenticated</code> قبل وبعد. وسجّل الرقمين في رسالة الالتزام.</li>
<li><code>npx playwright test tests/rate-book.spec.ts --project=authenticated --grep=&quot;can rate&quot;</code> يكتمل في أقل من 5 ثوانٍ على آلتك حين تعيد Playwright استخدام خادم محلي قيد التشغيل أصلًا.</li>
<li>يُظهر سجل الالتزامات تقسيم العمل إلى أربعة التزامات على الأقل، يعالج كل واحد منها نمطًا واحدًا (المصادقة، الزرع، المحددات، الانتظارات).</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<p>إن انتهيت مبكرًا، اختر واحدًا أو أكثر:</p>
<ul>
<li>أضف اختبارًا ثانيًا في الملف نفسه يتحقّق من أن المستخدم <em>لا يستطيع</em> تقييم كتاب لم يضفه إلى رفه بعد. استخدم تجهيزة <code>request</code> أو دوالك المساعدة على الخادم لإعداد السيناريو (الكتاب موجود، والمستخدم لم يضفه) وأكّد أن زر التقييم معطّل.</li>
<li>استبدل فحص الحفظ الأخير بـ<code>expect.poll()</code> كي يُقرأ الاختبار كـ«انتظر حتى توافق الواجهة الخلفية»، لا «أطلق طلبًا واحدًا وارجُ أن الكتابة وصلت أصلًا». ثم أعد كتابة الفحص نفسه مرة بـ<code>expect(async () =&gt; { ... }).toPass({ timeout: ... })</code> كي تشعر بالفرق بين إعادة محاولة قيمة واحدة وإعادة محاولة كتلة تأكيد كاملة.</li>
<li>كتجربة قصيرة، جرّب استبدال تسجيل الدخول الذي يقوده المتصفح في <code>authentication.setup.ts</code> باختصار مباشر من جانب الخادم إن كانت كومة المصادقة لديك تكشف واحدًا. تأكّد من أن الاختبارات ما زالت تنجح. ثم فكّر في المقايضة: الاختصار أسرع، لكنك تخسر اختبار الدخان الضمني على نموذج تسجيل الدخول.</li>
<li>شغّل الاختبار بـ<code>--repeat-each=50</code> وانظر إن كان شيء يتذبذب تحت الحمل.</li>
<li>أطفئ <code>fullyParallel</code> وانظر إن كان الاختبار ما زال ينجح. (ينبغي أن ينجح. وإن لم يفعل، فلديك تسرّب زرع — أصلحه.)</li>
<li>أضف تجربة برمجية وسيطة للمسارات قبل النقر على التقييم: مسار عريض واحد ينادي <code>route.fallback()</code> لكل شيء عدا طلبات <code>POST</code> ويختم تلك بترويسة <code>x-test-mode: 1</code>، ثم مسار أضيق <code>**/api/**</code> يستخدم <code>route.fetch({ maxRetries: 2 })</code> ويستوفي استجابة JSON مرقّعة. تأكّد من أن ترتيب السلسلة يفعل ما تظنه.</li>
<li>أضف مواصفة أخرى تمارس سير بحث مدعومًا بـOpen Library، ثم سجّل لها HAR باستخدام نمط متغيّر البيئة <code>UPDATE_HARS</code> من درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording">مقاربات تسجيل HAR</a>. التزم بـHAR وتحقّق من أن الاختبار ينجح في وضع الإعادة على واي فاي الطائرة — أو على الأقل مع فصل كبل الشبكة.</li>
</ul>
<h2 id="حالة-نهاية-ناجحة">حالة نهاية ناجحة</h2>
<p>تنتهي نسخة Shelf الانطلاقية المحصّنة بإشعار toast صريح وتقييم محفوظ بعد أن ينقر الاختبار عبر النافذة المنبثقة. قد يختلف تنسيقك الدقيق، لكن حالة النجاح ينبغي أن تبدو هكذا:</p>
<p><img src="/arabic-cs-library/images/kinney/1c9239e1fa5fda41.webp" alt="تدفّق تقييم الكتاب المحصّن يعرض إشعار النجاح المحفوظ وملخّص الرف المحدّث"></p>
<h2 id="كيف-يبدو-هذا-أمام-وكيل-حقيقي">كيف يبدو هذا أمام وكيل حقيقي</h2>
<p>السؤال المثير ليس إن كنت تستطيع تحصين هذا الاختبار — فقد فعلته للتو. السؤال المثير هو إن كان وكيل يستطيع فعل ذلك مع السياق الصحيح. وإليك كيف يبدو ذلك مع <code>CLAUDE.md</code> المحمّل بالقواعد من <a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-rewrite-the-bad-claude-md">مختبر: أعد كتابة CLAUDE.md السيئ</a> في مكانه.</p>
<p>أعِد النسخة المكسورة من <code>tests/rate-book.spec.ts</code> — تلك التي فيها تسجيل دخول عبر الواجهة و<code>waitForTimeout</code> ومحددات CSS. وأعطِ Claude Code هذه المطالبة:</p>
<blockquote>
<p><code>tests/rate-book.spec.ts</code> متذبذب. حصّنه باتباع القواعد في CLAUDE.md.</p>
</blockquote>
<p>جلسة نموذجية:</p>
<pre><code>Reading CLAUDE.md...

The Playwright locator rules and waiting rules are both explicit:
- getByRole first, data-testid only as a last resort
- no waitForTimeout, no waitForLoadState('networkidle')
- login runs in authentication.setup.ts, specs inherit storage state
- specs reset with resetShelfContent, not by hitting /login

Reading the current rate-book.spec.ts... counting violations:
  1. page.goto('/login') + page.fill('[name=email]') — forbidden per
     the auth rule, should use the setup/authenticated project flow
  2. page.waitForTimeout(1000) × 3 — forbidden per the waiting rule
  3. page.locator('.book-card button.rate') — raw CSS, forbidden per
     the locator rule
  4. page.locator('.rating-modal .star[data-value=&quot;4&quot;]') — same
  5. textContent().toContain() — bypasses auto-retry; should be
     expect(toast).toHaveText(...)
  6. No seed call, so the test depends on whatever the database has

Fix 1: delete the login block. The authenticated project already
inherits storage state from authentication.setup.ts.

Fix 2: call resetShelfContent at the top of the test so Station Eleven
is guaranteed to be on the shelf.

Fix 3: replace the click chain with scoped role locators:
  const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
  await stationEleven.getByRole('button', { name: /Rate this book/ }).click();

Fix 4: replace the star click with getByLabel:
  await page.getByLabel('4 stars').check();
  await page.getByRole('button', { name: 'Save rating' }).click();

Fix 5: replace the toast check with auto-retry:
  await expect(page.getByRole('status')).toHaveText(/Thanks/);

Fix 6: every waitForTimeout is now unnecessary because the assertions
above auto-retry. Delete all three.

Running npm run test --grep &quot;rate a book&quot;...
  → 1 passed (412ms). That's the whole suite.

Hardened. Every acceptance criterion from the lab hits zero.
</code></pre>
<p>قارن هذا بما يفعله <em>الوكيل نفسه</em> بـ<code>CLAUDE.md</code> فارغ: ما زال يصلح التذبذب، لكنه يصلح الأعراض واحدًا واحدًا — يلفّ <code>waitForTimeout</code> في إعادة محاولة، ويضيف <code>.first()</code> لفضّ التباس المحددات — دون أن يراجع أي مجموعة قواعد قط. والنتيجة اختبار ينجح معظم الوقت ويتذبذب أحيانًا، وهذا أسوأ بصرامة من النسخة التي بدأت بها لأن التذبذب صار مخفيًا.</p>
<p>الفرق بين الجلستين هو الفرق بين «اتبع دليل لعب» و«ارتجل من رسائل الخطأ». ودليل اللعب هو <code>CLAUDE.md</code>. إن استطعت قراءة النص أعلاه والتعرّف على كل قرار اتخذه الوكيل، فقد انتهيت — القواعد صارت في أصابعك.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>كل نمط مضاد في ملف البداية قابل للإصلاح منفردًا في أقل من خمس دقائق بالنمط الصحيح. وما جعل الاختبار الأصلي سيئًا لم يكن خطأ واحدًا — بل غياب إطار للتفكير في الاختبارات. وكانت دروس Playwright ذلك الإطار. وهذا المختبر هو حيث يصبح ذاكرة عضلية.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/harden-the-flaky-rate-book-test-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests">اختبارات API وUI الهجينة</a></li>
</ul>
`,l={book:e,chapter:t,chapterTitle:s,slug:a,title:n,headings:o,html:i};export{e as book,t as chapter,s as chapterTitle,l as default,o as headings,i as html,a as slug,n as title};
