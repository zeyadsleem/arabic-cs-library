const s="kinney",e="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="where-fixtures-actually-help",a="أين تساعد التجهيزات فعلًا",l=[{depth:2,id:"السؤال-الذي-ينبغي-أن-تجيب-عنه-التجهيزة",text:"السؤال الذي ينبغي أن تجيب عنه التجهيزة"},{depth:2,id:"تجهيزات-الفاعل",text:"تجهيزات الفاعل"},{depth:2,id:"تجهيزات-الحالة",text:"تجهيزات الحالة"},{depth:2,id:"تجهيزات-القياس",text:"تجهيزات القياس"},{depth:2,id:"تجهيزات-البيئة",text:"تجهيزات البيئة"},{depth:2,id:"تجهيزات-الحدود",text:"تجهيزات الحدود"},{depth:2,id:"أشياء-ينبغي-أن-تبقى-خارج-التجهيزات",text:"أشياء ينبغي أن تبقى خارج التجهيزات"},{depth:2,id:"شجرة-قرار-عملية",text:"شجرة قرار عملية"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الذي-يجب-تذكره",text:"الشيء الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>حين تتعلّم معظم الفرق <a href="https://playwright.dev/docs/test-fixtures"><code>test.extend</code></a>، تكون تعرف <em>كيف</em> تكتب تجهيزة، وما زالت لا تعرف <em>أين</em> تستخدمها. وهكذا ينتهي بك الأمر بملف تجهيزات مليء بأسطر مفردة مُمجَّدة، وحالة غامضة، وثلاث دوال مساعدة مختلفة كلها تنتقل إلى الصفحة نفسها. لقد فعلت هذا. يبدو مرتبًا تمامًا إلى أن تبدأ المجموعة بالكذب عليك.</p>
<p>كان <a href="https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped">درس التجهيزات</a> السابق عن النطاق والتفكيك. هذا الدرس عن الرائحة. تحديدًا: أي أنواع المشكلات تحلّها التجهيزة جيدًا في تطبيق حقيقي، وأي أنواع تحلّها بسوء، وكيف تتعرّف على الفرق قبل أن يتحوّل ملف تجهيزاتك إلى درج خردة.</p>
<h2 id="السؤال-الذي-ينبغي-أن-تجيب-عنه-التجهيزة">السؤال الذي ينبغي أن تجيب عنه التجهيزة</h2>
<p>التجهيزة الجيدة تجيب عن أحد أربعة أسئلة:</p>
<ul>
<li>من يجسّده هذا الاختبار؟</li>
<li>بأي حالة يبدأ التطبيق؟</li>
<li>أي رؤية إضافية يحتاجها الاختبار؟</li>
<li>أي بيئة يحتاج المتصفح أن يصدّقها؟</li>
</ul>
<p>إن لم يجب إعدادك عن أحد تلك الأسئلة، فالأرجح أنه ليس تجهيزة. الأرجح أنه دالة مساعدة، أو طريقة كائن صفحة، أو سكربت زرع، أو مجرد سطر شيفرة ينبغي أن يبقى في الاختبار.</p>
<blockquote>
<p><strong>اختبار رائحة معقول</strong></p>
<p>إن ظل الاسم يظهر في توقيعات الاختبارات عبر ملفات متعددة، فقد يستحق ذلك الاسم أن يصبح تجهيزة. وإن ظهر مرة واحدة فقط، فأبقِه محليًا.</p>
</blockquote>
<h2 id="تجهيزات-الفاعل">تجهيزات الفاعل</h2>
<p>هذه أوضح فئة تجهيزات، وهي أيضًا الأسرع في دفع الإيجار. فكثيرًا ما تحتاج الاختبارات إلى التصرّف كـ<em>نوع</em> محدد من المستخدمين: قارئ مُوثَّق، أو عميل API إداري، أو سياق متصفح مجهول، أو عميل مميز مع أعلام ميزات مفعّلة.</p>
<p>هذه أرض التجهيزات لأن الشيء المشترك ليس «الخطوات» بل <em>الهوية</em>. يفترض هذا المثال أنك اتبعت أصلًا مختبر <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a> ولديك ملف <code>user.json</code> على القرص — ونسخة Shelf الانطلاقية الجديدة لا تشحنه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> base } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReaderFixtures</span> = {
  <span class="hljs-attr">authenticatedReaderPage</span>: <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;@playwright/test&#x27;</span>).<span class="hljs-property">Page</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-property">extend</span>&lt;<span class="hljs-title class_">ReaderFixtures</span>&gt;({
  <span class="hljs-attr">authenticatedReaderPage</span>: <span class="hljs-title function_">async</span> ({ browser }, use) =&gt; {
    <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>({
      <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>,
    });

    <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(page);
    <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">close</span>();
  },
});
</code></pre>
<p>الجزء المهم ليس أن التجهيزة تفتح صفحة. الجزء المهم أن التجهيزة تمنح الاختبار <em>متصفحًا على شكل قارئ</em>. وحين يظهر ذلك المفهوم في خمس أو ست مواصفات، تصبح التجهيزة أرخص من تكرار إعداد السياق في كل مكان.</p>
<p>وهنا أيضًا تتألّق تجهيزات <a href="https://playwright.dev/docs/api/class-apirequestcontext"><code>APIRequestContext</code></a>. فإن كان اختبارك يحتاج فاعلًا إداريًا على الجانب بينما يبقى المتصفح مسجّلًا كقارئ، فالتجهيزة التي تسلّمك عميل API مُوثَّقًا هي أنظف نسخة من النمط. و<a href="https://stevekinney.com/courses/self-testing-ai-agents/api-request-context-beyond-storage-state">درس APIRequestContext</a> هو أساسًا هذه الفكرة ممطوطة إلى سير عمل كامل.</p>
<h2 id="تجهيزات-الحالة">تجهيزات الحالة</h2>
<p>توجد تجهيزة الحالة لتجيب: <em>في أي عالم يبدأ هذا الاختبار؟</em> رف مزروع. سلة فارغة. حساب باشتراك منتهٍ. كتاب مُقيَّم أصلًا. علم ميزة مفعّل أصلًا.</p>
<p>هنا أرى أكبر قلّة استخدام. فالفرق تمدّ يدها إلى التجهيزات حين تريد صفحة مُوثَّقة، لا حين تريد حالة حتمية. وهذا مقلوب. فالمصادقة رفاهية. والحالة الحتمية بقاء.</p>
<p>أبسط نسخة كاملة تبدو هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> base } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StateFixtures</span> = {
  <span class="hljs-attr">seededShelf</span>: <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-property">extend</span>&lt;<span class="hljs-title class_">StateFixtures</span>&gt;({
  <span class="hljs-attr">seededShelf</span>: <span class="hljs-title function_">async</span> ({ request }, use) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  },
});
</code></pre>
<p>الاختبار الذي يستهلكها لا يهمّه <em>كيف</em> زُرع الرف. يهمّه أن يبدأ الرف من مكان معروف، ويترك للاختبار التالي غرفة نظيفة خلفه. وهذا عقد تجهيزة مثالي.</p>
<p>حيث تصبح هذه مفيدة بشكل خاص في تطبيق حقيقي:</p>
<ul>
<li>إعادة ضبط قاعدة البيانات قبل كل اختبار يغيّر حالة التطبيق</li>
<li>زرع حالة أعمال محددة، مثل قارئ كتبه متأخرة أو فريق له فاتورة فاشلة واحدة</li>
<li>تركيب أعلام ميزات أو إسنادات تجارب يقرأها التطبيق عند الإقلاع</li>
<li>تثبيت ساعة أو لغة ثابتة كي تتوقف التواريخ النسبية عن الانزياح بين التشغيلات</li>
<li>التحميل المسبق لبدائل اختبار لجهات خارجية، مثل نقطة نهاية webhook وهمية أو معالج تحليلات جاهز</li>
</ul>
<p>الخطأ الشائع أن تجعل التجهيزة محددة أكثر من اللازم. فـ<code>readerWithTwoUnreadBooksAndOneDraftReview</code> ليس تجريدًا قابلًا لإعادة الاستخدام. أما <code>seededReader</code> و<code>seededShelf</code> فالأرجح أنهما كذلك. ضع تفصيل النطاق في دالة الزرع المساعدة، لا في اسم تجهيزة من سبع كلمات.</p>
<h2 id="تجهيزات-القياس">تجهيزات القياس</h2>
<p>بعض التجهيزات موجودة لأن الاختبار يحتاج <em>رؤية</em> أكثر، لا إعدادًا أكثر. وتجهيزة <code>page</code> المتجاوَزة في <a href="https://github.com/stevekinney/shelf-life">Shelf</a> هي المثال الذي أعود إليه لأنها مملّة بالطريقة الصحيحة تمامًا: فهي تمرّر أخطاء وحدة تحكّم المتصفح وطلبات الشبكة الفاشلة كي يراها المشغّل وتقرير HTML وملف تشخيص الفشل جميعًا.</p>
<p>ذلك النمط يتوسّع أفضل مما يظن الناس.</p>
<p>من تجهيزات القياس المفيدة:</p>
<ul>
<li><code>page</code> مغلّفة تمرّر خرج <code>console.error</code> إلى stderr</li>
<li><code>page</code> أو <code>context</code> مغلّفة تسجّل الطلبات الفاشلة مع الطريقة وURL ونص الخطأ</li>
<li>تجهيزة <code>request</code> تسجّل نداءات API الرئيسية من أجل ملفات تشخيص الفشل</li>
<li>تجهيزة صفحة تركّب مراقبات خاصة بالاختبار لعلامات الأداء أو أخطاء جانب العميل</li>
<li>تجهيزة ترفق عناصر إضافية بـ<code>testInfo</code>، مثل حالة التطبيق المسلسلة عند الفشل</li>
</ul>
<p>هذا من استخداماتي المفضلة للتجهيزات لأنه ينقل التشخيص خارج جسم الاختبار. فتبقى المواصفة تتحدث عن السلوك. وتجعل التجهيزة العناصر أفضل بهدوء.</p>
<p><a href="https://playwright.dev/docs/api/class-testinfo">واجهة TestInfo</a> هي السبب في أن هذه الفئة أقوى من «سجّل أشياء أكثر».</p>
<ul>
<li><code>testInfo.outputPath()</code> يمنحك موقع ملف مؤقت آمنًا لكل اختبار</li>
<li><code>testInfo.snapshotPath()</code> يحلّ المكان الذي ينبغي أن تعيش فيه لقطة</li>
<li><code>testInfo.attach()</code> ينسخ الملفات إلى عنصر مرئي للمبلّغ</li>
<li><code>testInfo.retry</code> يخبرك بأي محاولة أنت الآن</li>
<li><code>testInfo.setTimeout()</code> يتيح للاختبار الجاري شراء وقت إضافي عن قصد</li>
</ul>
<p>هذا بالضبط نوع الأشياء التي تنتمي إلى التجهيزات لا إلى جسم الاختبار. إن أردت التسجيل الإضافي المكلف عند إعادة المحاولة فقط، فـ<code>testInfo.retry</code> هو المفتاح. وإن احتاجت دالة إعداد مساعدة وقتًا أطول لأنها تُقلع خدمة محلية، فـ<code>testInfo.setTimeout()</code> هو المكان الصادق لقول ذلك. وإن أردت ملف JSON لحالة التطبيق مُفرَّغًا عند الفشل، فـ<code>outputPath()</code> مع <code>attach()</code> هو الشكل.</p>
<h2 id="تجهيزات-البيئة">تجهيزات البيئة</h2>
<p>أحيانًا لا يحاول الاختبار تغيير حالة التطبيق على الخادم إطلاقًا. بل يحاول تغيير ما <em>يصدّقه المتصفح</em>. منطقة زمنية مختلفة. أذونات مختلفة. دعم الحافظة. حركة مقلّلة. اتصال مقابل عدم اتصال. واجهات API تجريبية لا يدعمها المتصفح مباشرة.</p>
<p>ذلك الإعداد ينتمي أيضًا إلى التجهيزات حين يكون مشتركًا وقابلًا للتكرار:</p>
<pre><code class="language-typescript"><span class="hljs-attr">mobileReaderContext</span>: <span class="hljs-title function_">async</span> ({ browser }, use) =&gt; {
  <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>({
    <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">width</span>: <span class="hljs-number">390</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">844</span> },
    <span class="hljs-attr">colorScheme</span>: <span class="hljs-string">&#x27;light&#x27;</span>,
    <span class="hljs-attr">timezoneId</span>: <span class="hljs-string">&#x27;America/Denver&#x27;</span>,
  });

  <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">grantPermissions</span>([<span class="hljs-string">&#x27;clipboard-read&#x27;</span>, <span class="hljs-string">&#x27;clipboard-write&#x27;</span>]);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(context);
  <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">close</span>();
},
</code></pre>
<p>النموذج الذهني هنا بسيط: إن كان سياق المتصفح يحتاج إلى تشكيل بطريقة معينة قبل إقلاع التطبيق، فذلك التشكيل مرشح جيد لتجهيزة.</p>
<p>يتعمّق درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/mocking-browser-apis">محاكاة واجهات API في المتصفح</a> الجديد في الواجهات التي لا يصمّمها Playwright مباشرة. والنسخة القصيرة أن التجهيزات بيت جيد لـ<a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script"><code>browserContext.addInitScript()</code></a> وإعداد الأذونات لأن كليهما يحتاج إلى الحدوث <em>قبل</em> الملاحة.</p>
<h2 id="تجهيزات-الحدود">تجهيزات الحدود</h2>
<p>تجلس هذه الفئة تمامًا عند الدرز بين تطبيقك وشيء خارجه: API، أو مزوّد مصادقة، أو عامل خلفي، أو بوابة دفع، أو فهرس بحث. ولا تريد تجهيزة هنا دائمًا. لكن حين يظهر الدرز نفسه في كثير من الاختبارات، تستطيع تجهيزة أن تمنع المجموعة من التمدّد جانبيًا.</p>
<p>أمثلة:</p>
<ul>
<li>عميل API إداري مُوثَّق يزرع الحالة عبر HTTP بدلًا من نقرات الواجهة</li>
<li>تجهيزة محاكاة مسارات تحظر طلبات التحليلات أو الصور لكل اختبار في ملف</li>
<li>تجهيزة توجّه التطبيق إلى خادم بريد وهمي محلي أو مستقبل webhook</li>
<li>تجهيزة تُقلع سياق متصفح بجلسة مصادقة ملتقطة</li>
</ul>
<p>هنا يبدأ التركيب بالشعور بالقوة. تجهيزة تمنحك المتصفح المُوثَّق. وأخرى تمنحك حالة الواجهة الخلفية المزروعة. وثالثة تضيف التشخيص. وجسم الاختبار يطلب فقط العالم الذي يحتاجه ثم يمضي في شأنه.</p>
<h2 id="أشياء-ينبغي-أن-تبقى-خارج-التجهيزات">أشياء ينبغي أن تبقى خارج التجهيزات</h2>
<p>والآن الجزء الممتع: الأشياء التي يظل الناس يحاولون تهريبها إلى <code>fixtures.ts</code>.</p>
<p>لا تصنع تجهيزة من أجل:</p>
<ul>
<li>ملاحة لمرة واحدة مثل <code>page.goto('/settings')</code></li>
<li>تأكيدات مثل «افتح الصفحة وتحقق من ظهور العنوان»</li>
<li>ثوابت صغيرة يستخدمها ملف اختبار واحد</li>
<li>بواني بيانات خالصة لا تحتاج دورة حياة Playwright أو تفكيكًا</li>
<li>دوال منطق أعمال مساعدة تستطيع العمل تمامًا خارج مشغّل الاختبارات</li>
<li>طرق كائنات الصفحة متنكّرة في أزياء بنية تحتية مزيفة</li>
</ul>
<p>إن كانت الشيفرة مجرد خطوات، فأبقِها خطوات. فالتجهيزات ليست «شيفرة مشتركة». التجهيزات شيفرة مشتركة تحتاج رسم التبعيات ودورة حياة التفكيك في Playwright. وهذه مجموعة أصغر بكثير.</p>
<h2 id="شجرة-قرار-عملية">شجرة قرار عملية</h2>
<p>حين أتردّد، هذا هو التسلسل الذي أستخدمه:</p>
<ol>
<li>هل يظهر هذا الإعداد في اختبارات أو ملفات متعددة؟</li>
<li>هل يحتاج إلى العمل قبل أن يبدأ جسم الاختبار؟</li>
<li>هل يحتاج إلى تفكيك بعد انتهاء جسم الاختبار؟</li>
<li>هل ينتج شيئًا سيطلبه الاختبار <em>بالاسم</em>؟</li>
</ol>
<p>إن كان الجواب نعم على طول الطريق، فالأرجح أني أريد تجهيزة.</p>
<p>إن انكسر الجواب عند الخطوة 1، فهي شيفرة مساعدة محلية.</p>
<p>إن انكسر الجواب عند الخطوة 3، فقد تبقى دالة مساعدة أو سكربت زرع بدلًا من تجهيزة.</p>
<p>إن انكسر الجواب عند الخطوة 4، فالأرجح أني أحاول إخفاء سلوك بدلًا من كشف تبعية مفيدة.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Choosing fixtures</span>

<span class="hljs-bullet">-</span> Use a fixture when the shared concern is actor identity, deterministic
  starting state, browser environment, or diagnostics instrumentation.
<span class="hljs-bullet">-</span> Name fixtures after what they provide (<span class="hljs-code">\`seededShelf\`</span>, <span class="hljs-code">\`adminRequest\`</span>,
  <span class="hljs-code">\`authenticatedReaderPage\`</span>), not after the implementation steps.
<span class="hljs-bullet">-</span> If the setup is used once, keep it in the test or move it to a helper.
<span class="hljs-bullet">-</span> If the setup mutates state, the fixture owns teardown after <span class="hljs-code">\`await use(...)\`</span>.
<span class="hljs-bullet">-</span> Prefer composing two small fixtures over building one giant fixture that
  hides half the test&#x27;s world behind a vague name.
<span class="hljs-bullet">-</span> When a fixture exists for diagnostics, use <span class="hljs-code">\`testInfo\`</span> on purpose:
  <span class="hljs-code">\`outputPath\`</span>, <span class="hljs-code">\`snapshotPath\`</span>, <span class="hljs-code">\`attach\`</span>, <span class="hljs-code">\`retry\`</span>, and <span class="hljs-code">\`setTimeout\`</span>
  are the tools, not ad-hoc temp-file math.
</code></pre>
<h2 id="الشيء-الذي-يجب-تذكره">الشيء الذي يجب تذكّره</h2>
<p>التجهيزات ليست المكان الذي تذهب إليه الشيفرة المشتركة. التجهيزات هي المكان الذي تذهب إليه <em>تبعيات الاختبار</em> المشتركة. الفاعل، والحالة، والبيئة، والتشخيص. تلك هي الدلاء الأربع. ابقَ داخلها تجعل التجهيزات المجموعة أصغر وأوضح وأكثر حتمية. وتِه خارجها فتحصل على مقبرة دوال مساعدة بأخطاء تفكيك.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped">التجهيزات: على مستوى العامل، وعلى مستوى الاختبار، والفخّ بينهما</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-request-context-beyond-storage-state">APIRequestContext: ما بعد حالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/mocking-browser-apis">محاكاة واجهات API في المتصفح</a></li>
</ul>
`,i={book:s,chapter:e,chapterTitle:n,slug:t,title:a,headings:l,html:p};export{s as book,e as chapter,n as chapterTitle,i as default,l as headings,p as html,t as slug,a as title};
