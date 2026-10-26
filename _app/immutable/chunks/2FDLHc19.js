const e="kinney",s="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="playwright-web-server-without-surprises",a="تهيئة خادم الويب",p=[{depth:2,id:"ما-الذي-يفعله-webserver-فعليا",text:"ما الذي يفعله webServer فعليًا"},{depth:2,id:"الأشكال-الثلاثة-الشائعة",text:"الأشكال الثلاثة الشائعة"},{depth:3,id:"تطبيق-واحد-وعملية-واحدة",text:"تطبيق واحد وعملية واحدة"},{depth:3,id:"الواجهة-الأمامية-مع-الخلفية",text:"الواجهة الأمامية مع الخلفية"},{depth:3,id:"هدف-مستضاف",text:"هدف مستضاف"},{depth:2,id:"port-مقابل-url",text:"port مقابل url"},{depth:2,id:"الخيارات-التي-تهم-فعليا",text:"الخيارات التي تهمّ فعليًا"},{depth:3,id:"cwd",text:"cwd"},{depth:3,id:"env",text:"env"},{depth:3,id:"reuseexistingserver",text:"reuseExistingServer"},{depth:3,id:"stdout-وstderr-وwait",text:"stdout وstderr وwait"},{depth:3,id:"timeout",text:"timeout"},{depth:3,id:"gracefulshutdown",text:"gracefulShutdown"},{depth:2,id:"المزالق-التي-تهم-في-الممارسة",text:"المزالق التي تهمّ في الممارسة"},{depth:3,id:"قد-يكون-عنوان-url-السليم-عنوانا-خاطئا",text:"قد يكون عنوان URL السليم عنوانًا خاطئًا"},{depth:3,id:"يمكن-لـ-reuseexistingserver-أن-يخفي-الانحراف",text:"يمكن لـ reuseExistingServer أن يخفي الانحراف"},{depth:3,id:"webserver-ليس-خطاف-تهيئة-بيانات",text:"webServer ليس خطّاف تهيئة بيانات"},{depth:3,id:"لا-تحتاج-ci-إلى-خطوة-تشغيل-يدوية-ثانية",text:"لا تحتاج CI إلى خطوة تشغيل يدوية ثانية"},{depth:3,id:"استخدم-تشغيل-المعاينة-أو-ما-يشبه-الإنتاج-عندما-يهمك-الواقع",text:"استخدم تشغيل المعاينة أو ما يشبه الإنتاج عندما يهمّك الواقع"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الذي-يجب-تذكره",text:"الشيء الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],r=`<p>معظم مشكلات <code>webServer</code> لا تبدو في ظاهرها مشكلات <code>webServer</code>. تبدو كأنها «الاختبار متقلّب»، أو «التطبيق يعمل محليًا لكنه لا يعمل في CI»، أو المفضّلة عندي شخصيًا: «يقول Playwright إن الخادم جاهز، لكن الصفحة ليست جاهزة بأي حال». لقد أهدرت من الوقت على هذا المفتاح ما يجعلني أتعامل معه اليوم كبنية تحتية، لا كوسيلة راحة.</p>
<p><a href="https://playwright.dev/docs/test-webserver"><code>webServer</code></a> هو جواب Playwright عن سؤال محدّد جدًا: <em>أي عملية ينبغي أن تكون عاملة قبل أن تبدأ حزمة الاختبارات، وكيف نعرف أنها جاهزة؟</em> عندما تصوغ المسألة بهذه الطريقة، يصبح التفكير في هذا الخيار أسهل بكثير.</p>
<h2 id="ما-الذي-يفعله-webserver-فعليا">ما الذي يفعله <code>webServer</code> فعليًا</h2>
<p>عند بدء الاختبارات، سيقوم Playwright بما يلي:</p>
<ol>
<li>تشغيل الأمر الذي هيّأته.</li>
<li>الانتظار حتى يصبح منفذ أو عنوان URL متاحًا.</li>
<li>تشغيل الاختبارات.</li>
<li>إيقاف العملية عند انتهاء التشغيل.</li>
</ol>
<p>هذا هو العقد كله. <code>webServer</code> ليس نظام النشر لديك، ولا نظام تهيئة البيانات الأولية، ولا بديلًا عن فحوص صحة التطبيق. إنه مشغّل عمليات مع فحص جاهزية.</p>
<p>الشكل المملّ يبدو هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">webServer</span>: {
    <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run preview -- --host 127.0.0.1 --port 4173&#x27;</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
    <span class="hljs-attr">reuseExistingServer</span>: !process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
  },
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
  },
});
</code></pre>
<p>هذه التهيئة تجيب عن السؤالين المهمّين:</p>
<ul>
<li>ما الذي ينبغي أن يبدأ؟ <code>npm run preview ...</code></li>
<li>كيف نعرف أنه جاهز؟ فحص HTTP ناجح على <code>http://127.0.0.1:4173</code></li>
</ul>
<p>كل ما عدا ذلك ضبطٌ وتنغيم.</p>
<h2 id="الأشكال-الثلاثة-الشائعة">الأشكال الثلاثة الشائعة</h2>
<p>معظم الإعدادات الحقيقية تقع في واحد من ثلاثة أوانٍ.</p>
<h3 id="تطبيق-واحد-وعملية-واحدة">تطبيق واحد وعملية واحدة</h3>
<p>هذا هو التدفق المعتاد «الواجهة الأمامية تشغّل التطبيق، وPlaywright يطرق التطبيق». <a href="https://github.com/stevekinney/shelf-life">Shelf</a> يعيش هنا. وكذلك معظم تطبيقات <a href="https://kit.svelte.dev/">SvelteKit</a> و<a href="https://nextjs.org/">Next.js</a> و<a href="https://remix.run/">Remix</a> و<a href="https://vite.dev/">Vite</a>.</p>
<p>استخدم <code>webServer</code> عندما يكون التطبيق مدار الاختبار محليًا وتكون الحزمة هي المسؤولة عن دورة حياته.</p>
<h3 id="الواجهة-الأمامية-مع-الخلفية">الواجهة الأمامية مع الخلفية</h3>
<p>أحيانًا يحتاج المتصفح إلى عمليتين: واجهة أمامية مع خادم API، أو تطبيق مع مستقبِل webhook، أو موقع توثيق مع مزوّد هوية وهمي. يقبل <code>webServer</code> مصفوفة لهذا السبب تحديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">webServer</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;app&#x27;</span>,
      <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run preview -- --port 4173&#x27;</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
      <span class="hljs-attr">reuseExistingServer</span>: !process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;api&#x27;</span>,
      <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run api:test&#x27;</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:8787/health&#x27;</span>,
      <span class="hljs-attr">reuseExistingServer</span>: !process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span>,
    },
  ],
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
  },
});
</code></pre>
<p>استخدم <code>name</code>. عندما يتشابك سجلّا تشغيل، تكون البادئات المسمّاة الفرق بين «واضح» و«تخمين».</p>
<h3 id="هدف-مستضاف">هدف مستضاف</h3>
<p>إذا كان الشيء مدار الاختبار منشورًا بالفعل — عنوان معاينة، أو بيئة staging، أو مكدّس حاويات محلي أشعله شخص آخر — فلا تضف <code>webServer</code> محليًا مزيفًا فقط لجعل التهيئة متماثلة. وجّه <code>baseURL</code> إلى الهدف المستضاف واترك <code>webServer</code> خارج المعادلة كليًا.</p>
<p>هذا هو الخطأ الشائع في حزم الدخان: يرث الناس تهيئة الاختبار الشامل فيُشغّل اختبار الدخان تطبيقًا محليًا مع أن الهدف الحقيقي عنوان منشور. لم يعد هذا اختبار دخان. صار حزمة انحدار محلية ترتدي شارة اختبار دخان.</p>
<h2 id="port-مقابل-url"><code>port</code> مقابل <code>url</code></h2>
<p>هذا أول مَزلق يستحق الحفظ.</p>
<ul>
<li>ينتظر <code>port</code> حتى يقبل شيءٌ اتصالات TCP على ذلك المنفذ. لاحظ أن <code>port</code> مصنّف <strong>مهجورًا</strong> في وثائق Playwright الحالية، التي توجّه التهيئات الجديدة إلى استخدام <code>url</code> بدلًا منه.</li>
<li>ينتظر <code>url</code> حتى يعيد العنوان رمز حالة مسموحًا.</li>
</ul>
<p>رموز الحالة المسموحة لجاهزية <code>url</code> أوسع مما يتوقع الناس: <code>2xx</code> و<code>3xx</code> و<code>400</code> و<code>401</code> و<code>402</code> و<code>403</code> كلها تُحتسب «الخادم جاهز». وهذا مقصود. السؤال هو «هل الخادم يستمع ويستجيب؟» لا «هل رسم التطبيق الصفحة التي أردتها بالضبط؟»</p>
<p>استخدم <code>port</code> عندما:</p>
<ul>
<li>يهمّك فقط أن العملية تستمع</li>
<li>لا يملك التطبيق نقطة فحص صحة مفيدة</li>
<li>تريد أبسط فحص محلي ممكن</li>
</ul>
<p>استخدم <code>url</code> عندما:</p>
<ul>
<li>تريد سبر نقطة صحة محدّدة مثل <code>/health</code></li>
<li>يحتاج التطبيق إلى عمل تسخين قبل أن تصبح الصفحات الحقيقية مفيدة</li>
<li>تحتاج <code>ignoreHTTPSErrors</code></li>
<li>تكون تحويلات المصادقة أو جاهزية بغير 200 جزءًا من شكل الإقلاع الطبيعي</li>
</ul>
<p>هناك ثنية أخرى: وفقًا <a href="https://playwright.dev/docs/api/class-testconfig#test-config-web-server">لوثائق <code>TestConfig</code> في Playwright</a>، يمكن لـ <code>port</code> أن يضبط <code>baseURL</code> ضمنًا، أما <code>url</code> فلا يفعل ذلك. وإذا كان <code>webServer</code> مصفوفة، فيجب عليك ضبط <code>baseURL</code> صراحةً على أي حال. نصيحتي بسيطة: اضبط <code>use.baseURL</code> بنفسك دائمًا. ستنسى هذه التفصيلة مرة واحدة بالضبط، وستكون في يوم لا تملك فيه صبرًا إضافيًا.</p>
<h2 id="الخيارات-التي-تهم-فعليا">الخيارات التي تهمّ فعليًا</h2>
<p>قائمة الخيارات الكاملة أطول من حاجة الفريق المتوسط. هذه هي التي أعود إليها دائمًا.</p>
<h3 id="cwd"><code>cwd</code></h3>
<p>يتحكم <code>cwd</code> في مكان بدء العملية. وهو يعود افتراضيًا إلى دليل ملف تهيئة Playwright. في مستودع أحادي كبير (monorepo)، يكون هذا الافتراضي خاطئًا في الغالب لواحد من خوادمك على الأقل.</p>
<p>إذا كان أمر التشغيل يعتمد على ملفات محلية، فاضبط <code>cwd</code> عن قصد.</p>
<h3 id="env"><code>env</code></h3>
<p>ترث العملية المشغّلة <code>process.env</code>، ويضيف Playwright <code>PLAYWRIGHT_TEST=1</code>. هذا الافتراضي مفيد. فهو يمنح تطبيقك إشارة مستقرة «أنا أعمل تحت Playwright» دون اختراع متغيّر بيئة آخر.</p>
<p>هذا مكان جيد لأعلام خاصة بالاختبار مثل:</p>
<ul>
<li>توجيه التطبيق إلى قاعدة بيانات اختبار قابلة للتخلص منها</li>
<li>التبديل إلى قاعدة بيانات مؤقتة</li>
<li>تعطيل التحليلات</li>
<li>توجيه التطبيق إلى خدمة طرف ثالث وهمية</li>
</ul>
<p>ما <em>ليس</em> مكانًا جيدًا له هو كتلة ضخمة من تهيئة الإنتاج منسوخة من منصة النشر لديك. أبقِ بيئة الاختبار صغيرة وصريحة.</p>
<h3 id="reuseexistingserver"><code>reuseExistingServer</code></h3>
<p>ينبغي أن تكون هذه القيمة <code>!process.env.CI</code> في العادة.</p>
<p>محليًا، إعادة استخدام خادم يعمل بالفعل تجعل الحلقة أسرع. في CI، الأمر عكس ما تريد تمامًا. ينبغي أن تبدأ CI من جديد حتى لا تستطيع عملية عالقة أن تجعل الحزمة تنجح للسبب الخاطئ.</p>
<p>المَزلق: إذا كنت تبني قبل المعاينة، فقد يكون الخادم المحلي المُعاد استخدامه <em>بناءً قديمًا</em>. هذا هو نمط الفشل نفسه الذي ينبّه إليه Shelf في مكان آخر من الدورة. عندما لا يطابق سلوك التطبيق الكود الذي غيّرته للتو، اقتل الخادم المُعاد استخدامه أولًا. افعل ذلك قبل أن تبدأ تنقيح الاختبار.</p>
<h3 id="stdout-وstderr-وwait"><code>stdout</code> و<code>stderr</code> و<code>wait</code></h3>
<p>معالجة المخرجات من المواضع التي يفترض فيها الناس أن الافتراضيات ستنقذهم. أحيانًا تنقذهم فعلًا. وأحيانًا تُطبع رسالة الجاهزية المفيدة الوحيدة في مكان لا تنظر إليه.</p>
<p>إذا كان خادمك يختار منفذه ديناميكيًا أو لا يطبع «جاهز» إلا إلى stdout، فبدّل <code>stdout</code> إلى <code>'pipe'</code> واستخدم <code>wait.stdout</code> مع تعبير نمطي:</p>
<pre><code class="language-typescript"><span class="hljs-attr">webServer</span>: {
  <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run app:test&#x27;</span>,
  <span class="hljs-attr">stdout</span>: <span class="hljs-string">&#x27;pipe&#x27;</span>,
  <span class="hljs-attr">wait</span>: {
    <span class="hljs-attr">stdout</span>: <span class="hljs-regexp">/Listening on port (?&lt;app_port&gt;\\d+)/</span>,
  },
}
</code></pre>
<p>هذا منفذ نجاة متقدّم، لا المسار الافتراضي. إذا استخدمت مجموعات التقاط، فأبقِ الأسماء متمايزة بين الخوادم المتعددة وتأكد أن لديك سببًا ملموسًا يتجاوز «بدا هذا أنيقًا».</p>
<p>تلك المجموعات المسمّاة تصبح متغيّرات بيئة لتشغيل الاختبار. يحوّل Playwright الاسم إلى أحرف كبيرة، فيُعرَض <code>app_port</code> باسم <code>process.env.APP_PORT</code>. هذا قوي وهو طريقة رائعة لصنع سباكة خفية غريبة إذا استخدمته على نحو عابر. تعامله كبنية تحتية، لا كحيلة regex لطيفة.</p>
<h3 id="timeout"><code>timeout</code></h3>
<p>مهلة البدء الافتراضية 60 ثانية. ارفعها عندما يحتاج التطبيق وقتًا أطول <em>بصدق</em>. لا ترفعها لأن فحص الجاهزية الخاطئ يسبر الشيء الخاطئ.</p>
<p>إذا كان تطبيقك جاهزًا في 12 ثانية وما زال <code>webServer</code> ينتهي وقته عند 60، فالسبب لا يكون أبدًا تقريبًا «التطبيق بطيء جدًا». السبب عادةً:</p>
<ul>
<li>فشل الأمر وأخفيت stdout</li>
<li>العملية تستمع على منفذ مختلف</li>
<li>عنوان الجاهزية خاطئ</li>
<li>التطبيق يحوّل إلى مكان غير متوقع</li>
</ul>
<h3 id="gracefulshutdown"><code>gracefulShutdown</code></h3>
<p>إذا لم تهيّئ الإيقاف، فسيقتل Playwright مجموعة العمليات قسرًا. هذا مقبول لخوادم تطوير بسيطة. وهو ليس مقبولًا دائمًا مع حاويات <a href="https://www.docker.com/">Docker</a> أو المراقبات أو الخوادم التي تحتاج مسار <code>SIGTERM</code> نظيفًا.</p>
<p>تذكر الوثائق صراحةً أن إيقاف Docker يتطلب <code>SIGTERM</code>، وتلاحظ أيضًا أن Windows يتجاهل <code>SIGTERM</code> و<code>SIGINT</code> هنا. هذا يستحق المعرفة قبل أن تبدأ بالتساؤل عن سبب اختلاف سلوك الإنهاء بين أجهزتك المحلية وCI.</p>
<h2 id="المزالق-التي-تهم-في-الممارسة">المزالق التي تهمّ في الممارسة</h2>
<h3 id="قد-يكون-عنوان-url-السليم-عنوانا-خاطئا">قد يكون عنوان URL السليم عنوانًا خاطئًا</h3>
<p>إذا كان عنوان الجاهزية سطحيًا جدًا — مثلًا، يعيد <code>/health</code> الرمز 200 بينما التطبيق الحقيقي ما زال يجمّع الأصول — فستبدأ الاختبارات على نظام نصف جاهز. أدّى <code>webServer</code> مهمته. أما فحص الصحة لديك فقد كذب.</p>
<p>اختر إشارة جاهزية تختبر الشيء الذي يحتاجه المتصفح فعلًا.</p>
<h3 id="يمكن-لـ-reuseexistingserver-أن-يخفي-الانحراف">يمكن لـ <code>reuseExistingServer</code> أن يخفي الانحراف</h3>
<p>هذه ضريبة المطوّر المحلي. إعادة استخدام الخادم سريعة، إلى أن تصبح العملية المُعاد استخدامها غير مطابقة لكودك أو بيئتك الحالية. عندما يصبح الفشل بلا معنى، أوقف إعادة الاستخدام مؤقتًا أو اقتل الخادم وأعد التشغيل. لقد وفّرت بهذه الحركة الفجّة وقتًا أكثر مما وفّرته أي حيلة تنقيح ذكية.</p>
<h3 id="webserver-ليس-خطاف-تهيئة-بيانات"><code>webServer</code> ليس خطّاف تهيئة بيانات</h3>
<p>تشغيل الخادم وتغذية التطبيق بالبيانات مسؤوليتان مختلفتان. إذا كانت الحزمة تحتاج قاعدة بيانات مغذّاة، فافعل ذلك في <a href="https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped">الـ fixtures</a> أو <a href="https://playwright.dev/docs/test-global-setup-teardown">الإعداد العام</a> أو مساعدات اختبار صريحة. لا تحشر منطق التغذية في أمر التشغيل وتدّعي أن هذا أنظف.</p>
<h3 id="لا-تحتاج-ci-إلى-خطوة-تشغيل-يدوية-ثانية">لا تحتاج CI إلى خطوة تشغيل يدوية ثانية</h3>
<p>إذا كان <code>playwright.config.ts</code> يحتوي بالفعل على <code>webServer</code> صحيح، فسير عمل <a href="https://github.com/features/actions">GitHub Actions</a> لديك <em>لا</em> يحتاج عادةً إلى خطوة إضافية «شغّل الخادم في الخلفية». تكرار دورة الحياة في CI هو طريقك إلى تعارض المنافذ وحالات التسابق ومصدرين للحقيقة.</p>
<h3 id="استخدم-تشغيل-المعاينة-أو-ما-يشبه-الإنتاج-عندما-يهمك-الواقع">استخدم تشغيل المعاينة أو ما يشبه الإنتاج عندما يهمّك الواقع</h3>
<p>بالنسبة لاختبارات الطرف إلى الطرف، أريد عادةً مسار الخادم القريب من الإنتاج، لا خادم التطوير. تضيف خوادم التطوير إعادة التحميل السريع وتحويلات إضافية وطبقات تصحيح وبرمجيات وسيطة لا وجود لها في الإنتاج. هذا أحيانًا هو بالضبط ما تريده أثناء التنقيح. لكنه ليس عادةً ما تريده كعقد افتراضي للحزمة.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Playwright webServer</span>

<span class="hljs-bullet">-</span> <span class="hljs-code">\`webServer\`</span> owns process startup and readiness only. Do not hide seed or
  migration logic inside the startup command.
<span class="hljs-bullet">-</span> Set <span class="hljs-code">\`use.baseURL\`</span> explicitly even when Playwright could infer it.
<span class="hljs-bullet">-</span> Use <span class="hljs-code">\`reuseExistingServer: !process.env.CI\`</span> unless the suite has a specific
  reason not to.
<span class="hljs-bullet">-</span> Prefer a production-ish start command (<span class="hljs-code">\`preview\`</span>, <span class="hljs-code">\`start\`</span>) for end-to-end
  tests and keep dev servers for debugging.
<span class="hljs-bullet">-</span> If startup fails and the reason is unclear, expose stdout and run again
  with <span class="hljs-code">\`DEBUG=pw:webserver\`</span>.
</code></pre>
<h2 id="الشيء-الذي-يجب-تذكره">الشيء الذي يجب تذكّره</h2>
<p><code>webServer</code> عقد: شغّل هذه العملية، وانتظر هذه الإشارة، ثم شغّل الحزمة. في اللحظة التي تتعامل فيها معه كخطّاف إعداد عام الغرض، يصبح غريبًا. أبقِ العقد صغيرًا، واختر إشارة جاهزية صادقة، وستختفي معظم فئة «تقلّب Playwright الغامض».</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/configuring-playwright">تهيئة Playwright</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects">مشاريع Playwright</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI كحلقة الملاذ الأخير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-post-deploy-smoke-checks-to-shelf">مختبر: أضف فحوص دخان بعد النشر إلى Shelf</a></li>
</ul>
`,o={book:e,chapter:s,chapterTitle:n,slug:t,title:a,headings:p,html:r};export{e as book,s as chapter,n as chapterTitle,o as default,p as headings,r as html,t as slug,a as title};
