const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="playwright-projects",t="مشاريع Playwright",l=[{depth:2,id:"الاعتماديات-وترتيب-التنفيذ",text:"الاعتماديات وترتيب التنفيذ"},{depth:2,id:"لماذا-يهم-هذا-أكثر-مما-يبدو",text:"لماذا يهمّ هذا أكثر ممّا يبدو"},{depth:2,id:"حالات-الاستخدام-الجيدة-لمشاريع-التهيئة",text:"حالات الاستخدام الجيدة لمشاريع التهيئة"},{depth:2,id:"إعدادا-testmatch-وtestdir",text:"إعدادا testMatch وtestDir"},{depth:2,id:"مشاريع-التفكيك",text:"مشاريع التفكيك"},{depth:2,id:"حالات-الاستخدام-الجيدة-لمشاريع-التفكيك",text:"حالات الاستخدام الجيدة لمشاريع التفكيك"},{depth:2,id:"تجاوزات-مستوى-المشروع",text:"تجاوزات مستوى المشروع"},{depth:2,id:"تشغيل-مشروع-واحد",text:"تشغيل مشروع واحد"},{depth:2,id:"مختبر-مصغر-زرع-بيانات-shelf-الأولية-عبر-مشروع-تهيئة",text:"مختبر مصغّر: زرع بيانات Shelf الأولية عبر مشروع تهيئة"},{depth:3,id:"الهدف",text:"الهدف"},{depth:3,id:"ما-الذي-تشغله",text:"ما الذي تشغّله"},{depth:3,id:"ما-الذي-ينبغي-أن-يعلمك-إياه-هذا",text:"ما الذي ينبغي أن يعلّمك إياه هذا"},{depth:3,id:"معايير-القبول",text:"معايير القبول"},{depth:3,id:"تمرين-إضافي",text:"تمرين إضافي"},{depth:2,id:"ما-الذي-يجب-ألا-تفعله",text:"ما الذي يجب ألّا تفعله"},{depth:2,id:"النموذج-الذهني",text:"النموذج الذهني"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>تبدأ معظم تهيئات Playwright بالطريقة نفسها: إعداد واحد، ومتصفّح واحد، وتشغيل كل شيء. ويظلّ ذلك مجديًا إلى أن تحتاج إلى شيء يحدث <em>قبل</em> تشغيل اختباراتك — تهيئة قاعدة بيانات ببيانات أولية، أو تسجيل الدخول، أو توليد تجهيزات اختبار. عند تلك النقطة تجد نفسك تحشو منطق التهيئة داخل خطّافات <code>beforeAll</code> وتأمل أن يخرج ترتيب التنفيذ سليمًا. وهو يخرج سليمًا عادةً. إلى أن لا يخرج.</p>
<p><a href="https://playwright.dev/docs/test-projects">مشاريع Playwright</a> هي الآلية التي تعالج هذا. المشروع كتلة تهيئة مسمّاة داخل <code>playwright.config.ts</code>. ولكلّ منها إعداداته الخاصة — أي متصفّح يُستخدم، وأي ملفات اختبار تُطابَق، وأي <code>storageState</code> يُحمَّل — والأهم من ذلك: أي <em>مشاريع أخرى</em> يعتمد عليها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig, devices } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>] },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;firefox&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Firefox&#x27;</span>] },
    },
  ],
});
</code></pre>
<p>حين تشغّل <code>npx playwright test</code>، يشغّل Playwright كل مشروع في الإعداد. وفي هذه الحالة تُشغَّل المجموعة الكاملة مرّتين — مرّة في Chromium ومرّة في Firefox. وكل مشروع معزول: له سياق المتصفّح الخاص به، وإعداداته الخاصة، ونتائجه الخاصة في التقرير.</p>
<p>هذا وحده مفيد، لكن القوة الحقيقية تظهر حين تضيف <code>dependencies</code>.</p>
<h2 id="الاعتماديات-وترتيب-التنفيذ">الاعتماديات وترتيب التنفيذ</h2>
<p>يمكن للمشاريع أن تعلن اعتمادها على مشاريع أخرى. فيبني Playwright رسمًا بيانيًا للاعتماديات ويضمن الترتيب. فإذا كان المشروع B يعتمد على المشروع A، انتهى A قبل أن يبدأ B. وإذا كان B وC يعتمدان معًا على A لكن لا يعتمد أحدهما على الآخر، فإنهما يعملان بالتوازي بعد انتهاء A.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/global\\.setup\\.ts/</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>] },
      <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;firefox&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Firefox&#x27;</span>] },
      <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
    },
  ],
});
</code></pre>
<pre><code>flowchart TD
  A[&quot;setup&quot;] --&gt; B[&quot;chromium&quot;]
  A --&gt; C[&quot;firefox&quot;]

  style A fill:#e1f5ff
  style B fill:#c8e6c9
  style C fill:#c8e6c9
</code></pre>
<p>يعمل مشروع <code>setup</code> أولًا — دائمًا. ثم يعمل <code>chromium</code> و<code>firefox</code> بالتوازي. وإذا فشل <code>setup</code>، لم يبدأ أي من مشروعي المتصفّح. هذا رسم بياني موجّه غير دوري، لا سلسلة خطّافات. أنت تعلن ما يعتمد على ما، ويستنتج Playwright الباقي.</p>
<h2 id="لماذا-يهم-هذا-أكثر-مما-يبدو">لماذا يهمّ هذا أكثر ممّا يبدو</h2>
<p>النمط الذي ستراه بعد قليل في <a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a> يعتمد على هذا اعتمادًا كاملًا. الفكرة هي: مشروع واحد يسجّل الدخول ويحفظ جلسة المتصفّح في ملف، وكل مشروع آخر يحمّل ذلك الملف فتبدأ اختباراته وقد سُجّل الدخول إليها مسبقًا. بدون اعتماديات المشاريع، لا ضمان أن يعمل تسجيل الدخول أولًا. ومعها، يصبح الأمر بنيويًا — لا حالة تسابق تنتظر أن تقع.</p>
<p>لكن المصادقة ليست إلا حالة الاستخدام الأكثر شيوعًا. المشاريع أيضًا هي طريقتك إلى:</p>
<ul>
<li><strong>تشغيل مجموعات اختبار مختلفة بإعدادات مختلفة.</strong> مشروع <code>smoke</code> يشغّل مجموعة فرعية سريعة عند كل دفع، ومشروع <code>full</code> يشغّل كل شيء ليلًا.</li>
<li><strong>حصر الاختبارات في أدوار المستخدمين.</strong> مشروع للمستخدمين العاديين وآخر للمشرفين، كلٌّ منهما يحمّل ملف <code>storageState</code> مختلفًا.</li>
<li><strong>الترشيح عبر <code>testMatch</code>.</strong> يمكن للمشروع أن يطابق فقط الملفات في مجلد محدّد، أو فقط الملفات المطابقة لتعبير نمطي. وهكذا تمنع ملفات التهيئة من العمل كاختبارات عادية.</li>
</ul>
<h2 id="حالات-الاستخدام-الجيدة-لمشاريع-التهيئة">حالات الاستخدام الجيدة لمشاريع التهيئة</h2>
<p>إذا تركنا تهيئة قاعدة البيانات جانبًا للحظة، فإن مشاريع التهيئة مناسبة كلّما احتاج جزء من المجموعة إلى شرط مسبق قابل للتكرار يجب أن يحدث داخل مشغّل Playwright بدلًا من سكربت shell ارتجالي أو <code>beforeAll</code>.</p>
<ul>
<li><strong>توليد حالة متصفّح مصادَقة.</strong> سجّل الدخول مرّة واحدة، واحفظ <code>storageState</code>، ودع المشاريع المعتمدة تعيد استخدامه.</li>
<li><strong>إنشاء جلسات لأدوار مستخدمين مختلفة.</strong> ابنِ جلسات مخزّنة منفصلة للقارئ، والمشرف، والمشرف العام، والدعم، أو أي مجموعات أخرى قائمة على الأدوار.</li>
<li><strong>التحقّق من تدفّق شرط مسبق قبل أن تبدأ بقية المجموعة.</strong> إن كان تسجيل الدخول أو التهيئة الأولى أو التنقّل الأولي معطوبًا، فافشل سريعًا وتخطَّ الاختبارات المعتمدة.</li>
<li><strong>التقاط آثار متصفّح قابلة لإعادة الاستخدام.</strong> ولّد ملف HAR، أو احفظ تنزيل ملف، أو أنشئ خط أساس للتتبّع، أو سجّل أي أثر آخر ينتجه المتصفّح وتستهلكه اختبارات لاحقة.</li>
<li><strong>تجهيز ملفات أو مجلدات مؤقتة تعتمد عليها المجموعة.</strong> أنشئ تجهيزات الرفع، أو مساحات عمل مؤقتة، أو تصديرات مسوّدة، أو ملفات تهيئة وقت التشغيل التي تتوقّع الاختبارات وجودها.</li>
<li><strong>تشغيل خدمة محلية مساندة أو التحقّق منها.</strong> أطلق خادمًا وهميًا خفيفًا، أو مستقبِل webhook، أو مصرف SMTP مزيفًا، أو مستمع استدعاءات راجعة، وتأكّد من سلامته قبل أن تعمل المشاريع المعتمدة.</li>
<li><strong>تثبيت حالة تطبيق غير متعلّقة بقاعدة البيانات تعيش خارج سياق المتصفّح.</strong> أنشئ ملفات رايات الميزات، أو مهّد طبقة تخزين مؤقت، أو سخّن فهرس بحث، أو اكتب ملفات إعداد تحتاجها بيئة الاختبار.</li>
<li><strong>إنشاء موارد اختبار خارجية ينبغي مشاركتها بين مواصفات كثيرة.</strong> ارفع تجهيزًا إلى تخزين الكائنات، أو سجّل مستأجرًا وهميًا، أو أصدر بيانات اعتماد مؤقتة لواجهة برمجة، أو أنشئ مساحة عمل معزولة مرّة واحدة لمشروع كامل.</li>
<li><strong>إعداد توقّعات خاصة ببيئة معيّنة.</strong> ابنِ حزمة أصول للجوال فقط، أو مجموعة لقطات خاصة بلغة معيّنة، أو أي أثر آخر يعتمد عليه أحد تنويعات المشروع.</li>
<li><strong>تضمين تهيئة مكلفة تُنفَّذ مرّة واحدة وكان تكرارها في كل ملف هدرًا.</strong> فإن كان العمل بطيئًا لكنه حتمي، يبقيه مشروع التهيئة ظاهرًا وقابلًا للتقرير دون تكراره في كل مواصفة.</li>
</ul>
<p>الخيط المشترك: مشروع التهيئة مخصّص للشروط المسبقة الحقيقية والمشتركة والتي تستحق أن تُنمذَج صراحةً كعقدة في الرسم البياني.</p>
<h2 id="إعدادا-testmatch-وtestdir">إعدادا <code>testMatch</code> و<code>testDir</code></h2>
<p>إعدادان يتحكّمان في الاختبارات التي يشغّلها المشروع.</p>
<p><code>testMatch</code> تعبير نمطي أو نمط glob يرشّح ملفات الاختبار. فإن أردت أن يشغّل المشروع سكربت التهيئة فقط، فوجّهه إلى ذلك الملف تحديدًا:</p>
<pre><code class="language-typescript">{
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
  <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
}
</code></pre>
<p><code>testDir</code> يحصر المشروع في مجلد. فإن كانت اختباراتك المصادَقة تعيش تحت <code>tests/authenticated/</code>، فيمكنك توجيه المشروع إلى ذلك المجلد والاستغناء عن التعبير النمطي:</p>
<pre><code class="language-typescript">{
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>,
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests/authenticated&#x27;</span>,
  <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
}
</code></pre>
<p>كلاهما اختياري. وإن لم تضبط أيًّا منهما، شغّل المشروع كل ما يعثر عليه <code>testDir</code> و<code>testMatch</code> في المستوى الأعلى من إعداد Playwright. عمليًا، تستخدم مشاريع التهيئة دائمًا تقريبًا <code>testMatch</code> لعزل ملف التهيئة، بينما تستخدم مشاريع المتصفّحات الإعدادات الافتراضية أو تحصر النطاق بالمجلد.</p>
<h2 id="مشاريع-التفكيك">مشاريع التفكيك</h2>
<p>للاعتماديات نظير: <code>teardown</code>. فإن كان مشروع التهيئة ينشئ شيئًا يحتاج إلى تنظيف — قاعدة بيانات مؤقتة، أو مستخدم اختبار، أو خدمة قيد التشغيل — فيمكنك توجيهه إلى مشروع تفكيك يعمل <em>بعد</em> انتهاء كل المشاريع المعتمدة.</p>
<p>التفصيل المهم الذي تتجاوزه الوثائق عادةً هو أن منطق التفكيك يعيش في ملف اختبار Playwright عادي. إنه ليس استدعاءً راجعًا خاصًا مخبَّأً في مكان آخر من الإعداد. فـ<code>testMatch: /global\\.teardown\\.ts/</code> تعني «شغّل الملف الذي يطابق اسمه هذا النمط كمشروع تفكيك».</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/global\\.setup\\.ts/</span>,
      <span class="hljs-attr">teardown</span>: <span class="hljs-string">&#x27;cleanup&#x27;</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;cleanup&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/global\\.teardown\\.ts/</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>] },
      <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
    },
  ],
});
</code></pre>
<p>في مستودع حقيقي، يبدو ذلك عادةً هكذا:</p>
<pre><code>tests/
  global.setup.ts
  global.teardown.ts
  smoke.spec.ts
  authenticated.spec.ts
</code></pre>
<p>وملف التفكيك نفسه ليس إلا اختبار Playwright صغيرًا يزيل ما أنشأته التهيئة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/global.teardown.ts</span>
<span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> teardown } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">teardown</span>(<span class="hljs-string">&#x27;remove temporary database&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Delete the temp database, stop the local server, remove seeded users,</span>
  <span class="hljs-comment">// or whatever your setup project created.</span>
});
</code></pre>
<p>هذا هو النموذج الذهني:</p>
<ul>
<li>يشير <code>setup</code> إلى <code>global.setup.ts</code></li>
<li>يشير <code>cleanup</code> إلى <code>global.teardown.ts</code></li>
<li>يشغّل Playwright كليهما لأنهما ملفا اختبار عاديان محصوران بنطاق المشروع</li>
<li>وصلة <code>teardown: 'cleanup'</code> هي ما يخبر Playwright متى يشغّل ملف التنظيف</li>
</ul>
<pre><code>flowchart LR
  A[&quot;setup&quot;] --&gt; B[&quot;chromium&quot;]
  B --&gt; C[&quot;cleanup&quot;]

  style A fill:#e1f5ff
  style B fill:#c8e6c9
  style C fill:#ffe0b2
</code></pre>
<p>ترتيب التنفيذ: يعمل <code>setup</code> أولًا، ثم <code>chromium</code>، ثم <code>cleanup</code>. وإن لم تكن بحاجة إلى تنظيف — وفي المصادقة لا تحتاجه عادةً، لأن مشروع التهيئة يكتب فوق ملف الحالة في كل تشغيل — فتخطّه. التفكيك موجود للحالات التي تتسرّب فيها حالة متبقية بين التشغيلات.</p>
<h2 id="حالات-الاستخدام-الجيدة-لمشاريع-التفكيك">حالات الاستخدام الجيدة لمشاريع التفكيك</h2>
<p>مرّة أخرى، وباستثناء تنظيف قاعدة البيانات تحديدًا، تكون مشاريع التفكيك منطقية حين ينشئ التهيئة شيئًا خارج فقاعة كل اختبار المعتادة، ويؤدي تركه وراءه إلى تلويث التشغيل التالي أو تسريب كلفة.</p>
<ul>
<li><strong>حذف الملفات أو المجلدات المؤقتة.</strong> أزل تجهيزات الرفع، أو حزم التصدير، أو مساحات العمل المسوّدة، أو ملفات الإعداد المولّدة أثناء التهيئة.</li>
<li><strong>إيقاف الخدمات المحلية المساندة.</strong> أوقف واجهة برمجة وهمية، أو مستمع webhook، أو مصرف SMTP، أو أي عملية مساعدة أخرى بدأت من أجل المجموعة.</li>
<li><strong>إبطال بيانات الاعتماد أو الرموز المؤقتة.</strong> نظّف مفاتيح واجهة البرمجة قصيرة العمر، أو منحات المصادقة، أو الروابط الموقّعة، أو رموز الوصول إلى بيئة الاختبار المعزولة التي أُنشئت للاختبار.</li>
<li><strong>إزالة الموارد الخارجية المنشأة لهذا التشغيل.</strong> احذف عمليات رفع الكائنات، أو قوائم انتظار الرسائل، أو صناديق البريد، أو المستأجرين، أو مساحات عمل الاختبار، أو كائنات السحابة التي لا ينبغي أن تتراكم بين التشغيلات.</li>
<li><strong>التراجع عن تبديلات رايات الميزات أو البيئة.</strong> أعد ضبط الرايات، أو مفاتيح الإيقاف، أو تغييرات الإعداد البعيدة التي قُلبت من أجل مشروع اختبار متخصّص.</li>
<li><strong>مسح ذاكرات التخزين المؤقت أو الآثار المولّدة التي قد تلوّث التشغيل التالي.</strong> أزل الفهارس المسخّنة، أو حزم التجهيزات المترجمة، أو مجلدات تجهيز اللقطات، أو آثار المتصفّح المنزّلة.</li>
<li><strong>تفكيك الأنفاق أو المستمعات أو العمليات الخلفية.</strong> أغلق أنفاق ngrok، أو خوادم الاستدعاء الراجع المحلية، أو طبقات الوسيط، أو العمليات الفرعية طويلة العمر التي بدأت في التهيئة.</li>
<li><strong>استعادة الحالة المشتركة في الأنظمة الخارجية.</strong> أعد بيئة اختبار معزولة لطرف ثالث إلى حالة محايدة إن كان التهيئة قد اضطر إلى إنشاء كائنات دائمة خارج تطبيقك.</li>
<li><strong>جمع التشخيصات النهائية وأرشفتها قبل الخروج.</strong> اززم السجلات، أو ملفات التتبّع، أو مخرجات الخدمة، أو البيانات الوصفية للعمليات المساعدة التي لا توجد إلا بعد انتهاء المشاريع المعتمدة.</li>
<li><strong>فرض التنظيف كجزء من رسم الاعتماديات بدلًا من معرفة متوارثة.</strong> فإن كان التشغيل لا يكون صحيحًا إلا إذا حدث التنظيف، فنمذجه بنيويًا بـ<code>teardown</code> بدلًا من الأمل في أن يعمل سكربت shell لاحقًا.</li>
</ul>
<p>الخيط المشترك: يستحق التفكيك هذه المراسم حين تكون المجموعة قد أنشأت شيئًا دائمًا أو مشتركًا أو مكلفًا بما يكفي ليصبح «اتركه هناك فقط» علةً في نهاية المطاف.</p>
<h2 id="تجاوزات-مستوى-المشروع">تجاوزات مستوى المشروع</h2>
<p>يمكن لكل مشروع أن يتجاوز الإعدادات المعرّفة في <code>defineConfig</code> الأعلى. يفيد ذلك حين تحتاج مجموعات مختلفة إلى درجات تسامح مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">retries</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">30_000</span>,
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;smoke&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/smoke\\/.+\\.spec\\.ts/</span>,
      <span class="hljs-attr">retries</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">10_000</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;full&#x27;</span>,
      <span class="hljs-attr">retries</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">60_000</span>,
    },
  ],
});
</code></pre>
<p>يحصل مشروع <code>smoke</code> على محاولتين إعادتين ومهلة أقصر لأنه يعمل عند كل دفع وتريده سريعًا ومتسامحًا. ويحصل مشروع <code>full</code> على صفر محاولات إعادة ومهلة أطول لأنه يعمل ليلًا وتريد أن تعرف بكل فشل. القيم في المستوى الأعلى افتراضية — تتجاوزها المشاريع، ولا تدمج معها.</p>
<h2 id="تشغيل-مشروع-واحد">تشغيل مشروع واحد</h2>
<p>أثناء التطوير، لا تريد دائمًا تشغيل الرسم البياني كاملًا. ويتيح لك العلم <code>--project</code> استهداف مشروع واحد:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> --project=chromium
</code></pre>
<p>لا يزال Playwright يحترم الاعتماديات — فإن كان <code>chromium</code> يعتمد على <code>setup</code>، عمل الاثنان. لكنه يتخطّى أي مشروع لم تسمّه ولم يكن اعتمادية للمشروع الذي سمّيته.</p>
<p>وإن أردت تخطّي الاعتماديات بالكامل — مثلًا لأن التهيئة عملت سلفًا وملف الحالة ما زال طازجًا — فمرّر <code>--no-deps</code>:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> --project=chromium --no-deps
</code></pre>
<p>الآن يعمل <code>chromium</code> فقط. لا تهيئة، ولا تفكيك، ولا حلّ للاعتماديات. هذا اختصار للتكرار المحلي، لا شيء تستخدمه في التكامل المستمر.</p>
<h2 id="مختبر-مصغر-زرع-بيانات-shelf-الأولية-عبر-مشروع-تهيئة">مختبر مصغّر: زرع بيانات Shelf الأولية عبر مشروع تهيئة</h2>
<p>يصل هذا الدرس أبلغ إذا فعل رسم الاعتماديات شيئًا حقيقيًا. وفي Shelf، أصغر نسخة قابلة للتصديق هي هذه:</p>
<ul>
<li>مشروع <code>setup</code> يزرع قاعدة البيانات من <code>tests/data/*.json</code></li>
<li>مشروع معتمد يفتح صفحة الرفّ العامة لـ<code>alice</code></li>
<li>تثبت الواجهة أن الزرع نجح</li>
</ul>
<p>يمنحك ذلك إحساسًا عمليًا بـ:</p>
<ul>
<li>كيف أن مشروع التهيئة ليس إلا ملف اختبار Playwright عاديًا</li>
<li>كيف تضمن <code>dependencies</code> ترتيب التنفيذ</li>
<li>كيف يمكن لمشروع أن يهيّئ حالة يستهلكها مشروع آخر</li>
</ul>
<p>دون أن يدفعك بعد إلى تدفّق المصادقة الكامل بحالة التخزين.</p>
<h3 id="الهدف">الهدف</h3>
<p>أضف ملف تهيئة صغيرًا في <code>tests/database.setup.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> setup } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> { users, books, shelfEntries } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./data&#x27;</span>;
<span class="hljs-keyword">import</span> { createUser, deleteAllUsers } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/lib/server/users&#x27;</span>;
<span class="hljs-keyword">import</span> { createBook, deleteAllBooks } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/lib/server/books&#x27;</span>;
<span class="hljs-keyword">import</span> { createShelfEntry, deleteAllShelfEntries } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/lib/server/shelf-entries&#x27;</span>;

<span class="hljs-title function_">setup</span>(<span class="hljs-string">&#x27;seed starter data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">deleteAllShelfEntries</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">deleteAllBooks</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">deleteAllUsers</span>();

  <span class="hljs-keyword">const</span> createdUsers = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> record <span class="hljs-keyword">of</span> users) {
    <span class="hljs-keyword">const</span> created = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(record);
    createdUsers.<span class="hljs-title function_">set</span>(record.<span class="hljs-property">email</span>, created);
  }

  <span class="hljs-keyword">const</span> createdBooks = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> record <span class="hljs-keyword">of</span> books) {
    <span class="hljs-keyword">const</span> created = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createBook</span>(record);
    createdBooks.<span class="hljs-title function_">set</span>(record.<span class="hljs-property">openLibraryId</span>, created);
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> record <span class="hljs-keyword">of</span> shelfEntries) {
    <span class="hljs-keyword">const</span> user = createdUsers.<span class="hljs-title function_">get</span>(record.<span class="hljs-property">userEmail</span>);
    <span class="hljs-keyword">const</span> book = createdBooks.<span class="hljs-title function_">get</span>(record.<span class="hljs-property">bookOpenLibraryId</span>);

    <span class="hljs-keyword">if</span> (!user || !book) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Seed fixture references a missing user or book&#x27;</span>);
    }

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">createShelfEntry</span>({
      <span class="hljs-attr">userId</span>: user.<span class="hljs-property">id</span>,
      <span class="hljs-attr">bookId</span>: book.<span class="hljs-property">id</span>,
      <span class="hljs-attr">status</span>: record.<span class="hljs-property">status</span>,
      <span class="hljs-attr">rating</span>: record.<span class="hljs-property">rating</span>,
    });
  }
});
</code></pre>
<p>ثم أضف مواصفة معتمدة صغيرة في <code>tests/public-shelf.spec.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;public shelf shows the seeded reader shelf&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf/alice&#x27;</span>);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Alice Reader&#x27;s shelf/i</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Station Eleven&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Piranesi&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>ثم اربط المشاريع في <code>playwright.config.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests&#x27;</span>,
  <span class="hljs-attr">testIgnore</span>: [<span class="hljs-string">&#x27;**/labs/fixtures/**&#x27;</span>, <span class="hljs-string">&#x27;**/labs/broken-traces/**&#x27;</span>],
  <span class="hljs-attr">webServer</span>: {
    <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run build &amp;&amp; npm run preview -- --host 127.0.0.1 --port 4173&#x27;</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
    <span class="hljs-attr">reuseExistingServer</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
  },
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/database\\.setup\\.ts/</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;public-shelf&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(smoke|public-shelf)\\.spec\\.ts/</span>,
      <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
    },
  ],
});
</code></pre>
<p>هذا أصغر عمدًا من درس الزرع الحتمي الكامل. أنت لا تبني هنا تجريد <code>tests/helpers/seed.ts</code> النهائي. أنت تثبت الرسم البياني فقط:</p>
<ul>
<li>مشروع واحد يهيّئ الحالة</li>
<li>مشروع آخر يعتمد عليه</li>
<li>يقرأ التطبيق تلك الحالة عبر صفحة حقيقية</li>
</ul>
<h3 id="ما-الذي-تشغله">ما الذي تشغّله</h3>
<p>ابدأ بالاستكشاف:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> --list
</code></pre>
<p>ينبغي أن ترى <code>database.setup.ts</code> تحت مشروع <code>setup</code> والمواصفات العادية تحت <code>public-shelf</code>.</p>
<p>ثم شغّل المشروع المعتمد وحده:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span> --project=public-shelf
</code></pre>
<p>ينبغي أن يشغّل Playwright <code>setup</code> أولًا رغم ذلك بسبب حافة الاعتمادية.</p>
<p>ثم شغّل الرسم البياني كاملًا:</p>
<pre><code class="language-bash">npx playwright <span class="hljs-built_in">test</span>
</code></pre>
<h3 id="ما-الذي-ينبغي-أن-يعلمك-إياه-هذا">ما الذي ينبغي أن يعلّمك إياه هذا</h3>
<ul>
<li>مشاريع التهيئة ملفات اختبار عادية، لا استدعاءات راجعة خاصة مخفية.</li>
<li><code>dependencies</code> هي ما يمنحك الترتيب، لا التوقيت المحظوظ.</li>
<li>يصبح الوثوق برسم المشاريع أسهل بكثير حين يكون الأثر ظاهرًا في التطبيق نفسه.</li>
</ul>
<h3 id="معايير-القبول">معايير القبول</h3>
<ul>
<li>يُظهر <code>npx playwright test --list</code> كلا المشروعين <code>setup</code> و<code>public-shelf</code></li>
<li>يطابق <code>setup</code> فقط <code>tests/database.setup.ts</code></li>
<li>يعتمد <code>public-shelf</code> على <code>setup</code></li>
<li>ينجح <code>npx playwright test --project=public-shelf</code></li>
<li>لا تنجح <code>tests/public-shelf.spec.ts</code> إلا لأن رفّ القارئ المزروع موجود</li>
</ul>
<h3 id="تمرين-إضافي">تمرين إضافي</h3>
<p>إن أردت تكرارًا إضافيًا واحدًا:</p>
<ul>
<li>وسّع <code>public-shelf.spec.ts</code> لتؤكّد بطاقات الملخّص (<code>Books on shelf</code>، <code>Currently reading</code>)</li>
<li>أضف تنويعة <code>admin-setup</code> تزرع مستخدمًا مشرفًا، ثم وجّه مشروعًا ثانيًا إلى اختبارات المشرفين وحدها لاحقًا</li>
<li>أعد هيكلة منطق الزرع المضمّن إلى <code>tests/helpers/seed.ts</code> بعد أن تصل إلى درس الحالة الحتمية</li>
</ul>
<p>ذلك التمرين الأخير هو الجسر إلى الطبقة التالية من الدورة: اليوم تلمس الرسم البياني، ولاحقًا تجعل الزرع قابلًا لإعادة الاستخدام.</p>
<h2 id="ما-الذي-يجب-ألا-تفعله">ما الذي يجب ألّا تفعله</h2>
<p>بضعة أنماط تبدو معقولة لكنها تسبّب الألم:</p>
<ul>
<li><strong>لا تستخدم <code>globalSetup</code> للمصادقة.</strong> ما زال Playwright يدعم <code>globalSetup</code>/<code>globalTeardown</code> كخيارات تهيئة في المستوى الأعلى، لكنها تعمل خارج مشغّل الاختبارات. وهذا يعني لا تجهيزات، ولا كائنات <code>page</code> أو <code>request</code>، ولا تكاملًا مع عارض التتبّع، ولا ظهورًا في تقرير HTML. أما <em>مشروع</em> التهيئة فيمنحك كل ذلك. وقد <a href="https://playwright.dev/docs/auth">انتقلت وثائق Playwright بالكامل إلى النمط القائم على المشاريع</a> في المصادقة، وينبغي أن تنتقل أنت أيضًا.</li>
<li><strong>تذكّر ما تخسره مع <code>globalSetup</code>.</strong> لا خطوات اختبار. ولا ملف تتبّع مرتبط بالتهيئة نفسها. ولا رسم بياني للتجهيزات. ولا مدخل تقرير يستطيع إنسان النقر عليه. مشروع التهيئة مملّ على أفضل وجه ممكن لأنه يبقى داخل نموذج المشغّل نفسه الذي تتبعه بقية المجموعة.</li>
<li><strong>لا تنشئ مشروعًا لكل ملف اختبار.</strong> المشاريع مخصّصة <em>لحدود التهيئة</em> — متصفّحات مختلفة، وأدوار مختلفة، وبيئات مختلفة. فإن تقاسم ملفا اختبار المتصفّح نفسه و<code>storageState</code> نفسها، فهما ينتميان إلى المشروع نفسه. ومشروع لكل ملف ليس إلا طريقة معقّدة لإعادة صنع ترشيح <code>testMatch</code>.</li>
<li><strong>لا تنسَ أن الاعتمادية الفاشلة تتخطّى توابعها.</strong> هذه ميزة لا علة — فإن فشل تسجيل الدخول، فلا فائدة من تشغيل الاختبارات المصادَقة. لكنها تعني أيضًا أن مشروع تهيئة متقلّبًا سيتخطّى مجموعتك كلها بصمت. فإن رأيت «لم يُشغَّل أي اختبار» في التكامل المستمر، فافحص مشروع التهيئة أولًا.</li>
</ul>
<h2 id="النموذج-الذهني">النموذج الذهني</h2>
<p>فكّر في المشاريع كرسم بياني مصغّر للبناء. لكل عقدة اسم، ومجموعة مدخلات (أي اختبارات، وأي متصفّح، وأي <code>storageState</code>)، ومجموعة حواف (اعتماديات). يحلّ Playwright الرسم البياني، ويشغّل الجذور أولًا، ويوازي كل ما يمكن موازاته.</p>
<p>إن كنت قد استخدمت مشغّلات مهام بإعلانات اعتماديات — Make وTurborepo وNx — فهذه الفكرة نفسها مطبّقة على تنفيذ الاختبارات. الفرق أن نسخة Playwright صغيرة بما يكفي لتسع في ملف تهيئة واحد، ومركّزة بما يكفي لأن تحتاج نادرًا إلى أكثر من ثلاثة أو أربعة مشاريع.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبارات</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,e as slug,t as title};
