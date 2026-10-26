const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="api-and-ui-hybrid-tests",e="اختبارات API والواجهة المدمجة",l=[{depth:2,id:"الاختبار-الذي-يفعل-أكثر-من-اللازم",text:"الاختبار الذي يفعل أكثر من اللازم"},{depth:2,id:"النسخة-المدمجة",text:"النسخة المدمجة"},{depth:2,id:"متى-تستخدم-api-ومتى-تستخدم-الواجهة",text:"متى تستخدم API ومتى تستخدم الواجهة"},{depth:2,id:"مثال-أعقد-هيئ-السيناريو-وأكد-النتيجة",text:"مثال أعقد: هيّئ السيناريو، وأكّد النتيجة"},{depth:2,id:"استخدام-request-كاختبار-دخان-لـ-api-نفسه",text:"استخدام request كاختبار دخان لـ API نفسه"},{depth:2,id:"كوكيز-المتصفح-يمكن-أن-تسري-عبر-عميل-api-أيضا",text:"كوكيز المتصفح يمكن أن تسري عبر عميل API أيضًا"},{depth:2,id:"المأزق-المخططات-المنزاحة",text:"المأزق: المخطّطات المنزاحة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>هذا نمط لم أكن أعرفه في أول سنتين من استخدامي Playwright، وما زلت منزعجًا منه قليلًا.</p>
<p>تحصل اختبارات Playwright على <a href="https://playwright.dev/docs/api-testing"><code>request</code> fixture</a> إلى جانب <code>page</code>. وهو عميل HTTP كامل، له عنوان القاعدة وسياق المصادقة نفسيهما اللذين للمتصفح، ويمكنك استخدامه لتهيئة الحالة أو التأكيد عليها حين كان ذلك يتطلّب خلاف ذلك النقر عبر ست صفحات من الواجهة. والتوليفة — التهيئة عبر API، والفعل والتأكيد عبر الواجهة — هي ما أسمّيه اختبارًا مدمجًا، وهي الافتراضي الصحيح لـ80% من اختبارات الطرف إلى الطرف متى رأيتها.</p>
<p>ولننظر في السبب.</p>
<h2 id="الاختبار-الذي-يفعل-أكثر-من-اللازم">الاختبار الذي يفعل أكثر من اللازم</h2>
<p>كثيرًا ما يبدأ اختبار طرف إلى طرف كلاسيكي لـ«يستطيع المستخدم رؤية إحصاءات رفّه» على هذا النحو:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;shelf stats show total books read&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// Add five books through the UI</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> title <span class="hljs-keyword">of</span> [<span class="hljs-string">&#x27;A&#x27;</span>, <span class="hljs-string">&#x27;B&#x27;</span>, <span class="hljs-string">&#x27;C&#x27;</span>, <span class="hljs-string">&#x27;D&#x27;</span>, <span class="hljs-string">&#x27;E&#x27;</span>]) {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/search?q=&#x27;</span> + title);
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Add to shelf&#x27;</span> }).<span class="hljs-title function_">click</span>();
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Mark as read&#x27;</span> }).<span class="hljs-title function_">click</span>();
  }

  <span class="hljs-comment">// Now check the stats page</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/stats&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Books read: 5&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>هذا الاختبار عن صفحة الإحصاءات، لكن معظمه تهيئة للكتب. فكل تكرار في الحلقة رحلة ذهاب وعودة كاملة في المتصفح. والاختبار بطيء، وهو يغطّي سلوكًا مُختبَرًا بالفعل في اختبارات <em>أخرى</em> (إضافة الكتب، والوسم كمنتهٍ)، وإن تغيّر أي من تلك الواجهة انكسر هذا الاختبار لأسباب لا علاقة لها بالإحصاءات.</p>
<p>هذا نمط مضاد شائع: اختبار الطرف إلى الطرف الذي يصبح، على غير قصد، اختبار تكامل لكل ميزة يمسّها أثناء التهيئة.</p>
<h2 id="النسخة-المدمجة">النسخة المدمجة</h2>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;shelf stats show total books read&#x27;</span>, <span class="hljs-title function_">async</span> ({ page, request }) =&gt; {
  <span class="hljs-comment">// Seed five finished books via the API</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> openLibraryId <span class="hljs-keyword">of</span> [<span class="hljs-string">&#x27;OL1&#x27;</span>, <span class="hljs-string">&#x27;OL2&#x27;</span>, <span class="hljs-string">&#x27;OL3&#x27;</span>, <span class="hljs-string">&#x27;OL4&#x27;</span>, <span class="hljs-string">&#x27;OL5&#x27;</span>]) {
    <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>, {
      <span class="hljs-attr">data</span>: { openLibraryId, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;finished&#x27;</span> },
    });
  }

  <span class="hljs-comment">// Now check the stats page</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/stats&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Books read: 5&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>التهيئة هنا استدعاءات API. أما التأكيد فما زال متصفحًا حقيقيًا يتنقّل في صفحة حقيقية. والاختبار الآن أسرع بثلاث مرات، وأنصف طولًا، و— وهذا الأهم — لا يختبر <em>إلا</em> صفحة الإحصاءات. فإن انكسرت واجهة «إضافة كتاب»، بقي هذا الاختبار ناجحًا، لأن هذا الاختبار ليس عن إضافة الكتب. والاختبار الخاص بإضافة الكتب هو الذي ينكسر، كما ينبغي.</p>
<p>يُصادِق <code>request</code> fixture تلقائيًا بحالة التخزين التي يستخدمها مشروع الاختبار، فلا تحتاج إلى إرفاق كوكيز أو رموز. وهذا هو مغزى الـ fixture كلّه مقابل استخدام <code>fetch</code> الخام.</p>
<p>وهو يرث أيضًا تهيئة Playwright التي كتبتها بالفعل. وتشير <a href="https://playwright.dev/docs/api-testing">وثائق اختبار API</a> إلى أن <code>request</code> fixture المدمج يحترم أشياء مثل <code>baseURL</code> والترويسات الإضافية من التهيئة. فإذا كان مشروع اختبارك يعرف أين يعيش التطبيق وأي حالة مصادقة يحملها، فعميل API يعرف ذلك أيضًا. ولا تُعِد بناء تلك التهيئة بيدك إلا إذا كنت تنشئ فاعلًا ثانيًا عن قصد.</p>
<p>في Shelf، تصل النسخة الملموسة من هذا النمط في مسار مختبر تقييم الكتاب. فتضيف <code>tests/authentication.setup.ts</code>، وتبني دالة الزرع الحتمية في <code>tests/helpers/seed.ts</code>، ثم تنشئ <code>tests/rate-book.spec.ts</code> تحت المشروع الموثّق بالمصادقة. ومغزى المختبر المرافق هو نفسه الذي يقرّره هذا الدرس: انتظر إشارة الشبكة الحقيقية بـ <code>page.waitForResponse</code>، لا مهلة تأمل أن تكون طويلة بما يكفي.</p>
<h2 id="متى-تستخدم-api-ومتى-تستخدم-الواجهة">متى تستخدم API ومتى تستخدم الواجهة</h2>
<p>الدليل الاستدلالي الذي أستخدمه:</p>
<ul>
<li><strong>التهيئة</strong>: API. فأنت تبني سيناريو، والمتصفح هنا مبالغة.</li>
<li><strong>الفعل موضوع الاختبار</strong>: الواجهة. فأنت تختبر حرفيًا أن الزر يعمل.</li>
<li><strong>التفكيك</strong>: API أو لا شيء (اعتمد على الزرع/العزل من الدرس السابق).</li>
<li><strong>التحقّق من الأثر الجانبي</strong>: أيّهما. فإن احتجت أن تعرف أن قاعدة البيانات سجّلت كتابة فعلًا، فطلب GET عبر API أرخص وأدقّ من الانتقال إلى صفحة وقراءة نص. وإن احتجت أن تعرف أن مستخدمًا حقيقيًا سيرى التغيير، فالواجهة.</li>
</ul>
<p>الفخّ هو أن تمتدّ يدك إلى الواجهة حين تكفي API. ونادرًا ما رأيت الخطأ المعاكس — فالوكلاء يمتدّون إلى الواجهة افتراضيًا لأن هكذا «تبدو» اختبارات Playwright في الأمثلة. وملف تعليماتك عليه أن يخبرهم صراحةً أن هناك خيارًا آخر.</p>
<p>وثمة طريقة جيدة أخرى للتفكير في الانقسام:</p>
<ul>
<li><strong>شروط API المسبقة</strong> تخلق العالم الذي يحتاجه الاختبار</li>
<li><strong>أفعال الواجهة</strong> تُمارس السلوك الذي يملكه المستخدم</li>
<li><strong>شروط API اللاحقة</strong> تتحقّق من الأثر الجانبي إن كان ذلك أرخص أو أدقّ من قراءة صفحة أخرى</li>
</ul>
<p>هذا النمط يمنحك تهيئة سريعة، وسلوكًا حقيقيًا، وفحصًا مزدوجًا رخيصًا للحفظ الدائم، دون أن تحوّل كل اختبار إلى تمثيل صامت في المتصفح.</p>
<h2 id="مثال-أعقد-هيئ-السيناريو-وأكد-النتيجة">مثال أعقد: هيّئ السيناريو، وأكّد النتيجة</h2>
<p>في Shelf ميزة أن إنهاء كتاب يحدّث عدّاد «قيد القراءة حاليًا» في صفحة الرفّ. ولنختبر ذلك.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;finishing a book updates the currently-reading counter&#x27;</span>, <span class="hljs-title function_">async</span> ({ page, request }) =&gt; {
  <span class="hljs-comment">// Set up: alice has two books currently reading</span>
  <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>, {
    <span class="hljs-attr">data</span>: { <span class="hljs-attr">openLibraryId</span>: <span class="hljs-string">&#x27;OL1&#x27;</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;reading&#x27;</span> },
  });
  <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>, {
    <span class="hljs-attr">data</span>: { <span class="hljs-attr">openLibraryId</span>: <span class="hljs-string">&#x27;OL2&#x27;</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;reading&#x27;</span> },
  });

  <span class="hljs-comment">// Check the counter</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Currently reading: 2&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

  <span class="hljs-comment">// Finish one via the UI—this is the actual action under test</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> page
    .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> })
    .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Mark as read&#x27;</span> })
    .<span class="hljs-title function_">click</span>();

  <span class="hljs-comment">// Counter should decrement</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Currently reading: 1&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>الشكل هو: تهيئة عبر API، وفعل عبر الواجهة، وتأكيد عبر الواجهة. التهيئة رخيصة وحتمية. والفعل هو ما يهمّنا فعلًا. والتأكيد هو ما سيراه المستخدم. ولا شيء يضيع هباءً.</p>
<p>قارن هذا بالنسخة القائمة على الواجهة بالكامل، حيث إضافة كتابين عبر صفحة البحث، والنقر على «ابدأ القراءة» في كل منهما، والعودة إلى الصفحة الرئيسية، كانت ستستغرق ثانيتين إضافيتين من الزمن الحقيقي وعشرات الأسطر الإضافية من الشيفرة. وفي اختبار ليس عن البحث ولا عن بدء القراءة، لا شيء من تلك التهيئة يستحقّ كلفته.</p>
<h2 id="استخدام-request-كاختبار-دخان-لـ-api-نفسه">استخدام <code>request</code> كاختبار دخان لـ API نفسه</h2>
<p>ثمة أثر جانبي لطيف: يمكنك استخدام <code>request</code> fixture لكتابة اختبارات API سريعة لنقاط النهاية التي ليس لها اختبار وحدة مخصّص. وهذا ليس نمطًا مدمجًا بالمعنى الدقيق — إنه API خالص — لكنه يعيش في الملف نفسه ويستخدم سياق المصادقة نفسه:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /api/shelf creates an entry&#x27;</span>, <span class="hljs-title function_">async</span> ({ request }) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>, {
    <span class="hljs-attr">data</span>: { <span class="hljs-attr">openLibraryId</span>: <span class="hljs-string">&#x27;OL1&#x27;</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;reading&#x27;</span> },
  });
  <span class="hljs-title function_">expect</span>(response.<span class="hljs-title function_">status</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>);

  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-title function_">expect</span>(body.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;reading&#x27;</span>);
});
</code></pre>
<p>بلا متصفح، وبلا واجهة، مجرّد تأكيد HTTP. وهذه تعمل في حدود عشرات الميلي ثانية وتملأ فجوة التغطية بين اختبارات الوحدة واختبارات الطرف إلى الطرف الكاملة. وهي أيضًا اختبارات دخان ممتازة في أعلى ملف الاختبار — فإن كان عقد API مكسورًا، أفشِل سريعًا قبل أن تحاول بقية الاختبارات تهيئة الحالة عبره.</p>
<h2 id="كوكيز-المتصفح-يمكن-أن-تسري-عبر-عميل-api-أيضا">كوكيز المتصفح يمكن أن تسري عبر عميل API أيضًا</h2>
<p>عندما تنشئ سياقات بيدك، ثمة نمط آخر يجدر معرفته من الوثائق: <a href="https://playwright.dev/docs/api-testing"><code>browserContext.request</code></a> يشارك الكوكيز مع سياق المتصفح. فسجّل الدخول عبر الصفحة، واستدعِ API عبر <code>browserContext.request</code>، فتسري الجلسة في الاتجاهين.</p>
<p>وهذا أنظف من نسخ ترويسات الكوكيز يدويًا، وأصدق من التظاهر بأن المتصفح وعميل API فاعلان غير مرتبطين وهما في الحقيقة المستخدم نفسه.</p>
<h2 id="المأزق-المخططات-المنزاحة">المأزق: المخطّطات المنزاحة</h2>
<p>من مخاطر التهيئة عبر API أن الاختبار يتجاوز أي تحقّق تجريه الواجهة. فإن كان للنموذج الحقيقي فحص من نوع «لا يمكنك إضافة كتاب إلا إذا كنت مسجّل الدخول ولم تتجاوز حدّ 500 كتاب»، فقد يتجاوز استدعاء API فحص الـ500 كتاب ويضع اختبارك في حالة مستحيلة. وهذا عادةً ميزة — فهو يتيح لك تهيئة حالات حدّية لا تستطيع الواجهة الوصول إليها — لكنه يخفي أحيانًا خطأً حقيقيًا.</p>
<p>والضمانة أن يكون في API التحقّق نفسه الذي في النموذج. وهذا تصميم خادم جيد على أي حال. فإن كان API يتيح للاختبار فعل أشياء لا تفعلها الواجهة، فلديك مشكلة أكبر من مجموعة اختباراتك.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Hybrid API+UI tests</span>

<span class="hljs-bullet">-</span> Use the <span class="hljs-code">\`request\`</span> fixture for scenario setup whenever the UI for that
  setup is already tested elsewhere. Don&#x27;t click through &quot;add book&quot; in
  a test whose subject is the stats page.
<span class="hljs-bullet">-</span> Treat API setup as preconditions and API reads as postconditions. Use
  them to make the test smaller, not to dodge the UI you are claiming to test.
<span class="hljs-bullet">-</span> The action under test is always performed through the UI. If the
  test&#x27;s purpose is &quot;clicking X causes Y,&quot; do not short-circuit the
  click with an API call.
<span class="hljs-bullet">-</span> Both <span class="hljs-code">\`page\`</span> and <span class="hljs-code">\`request\`</span> share the same authentication context from
  <span class="hljs-code">\`storageState\`</span>. You do not need to attach tokens manually.
<span class="hljs-bullet">-</span> The built-in <span class="hljs-code">\`request\`</span> fixture already inherits Playwright config such
  as <span class="hljs-code">\`baseURL\`</span> and default headers. Do not reconfigure it by hand unless
  you are intentionally creating a second actor.
<span class="hljs-bullet">-</span> If you need pure API tests for an endpoint, put them in the same test
  file as the UI tests for that endpoint, using the same <span class="hljs-code">\`request\`</span>
  fixture and no <span class="hljs-code">\`page\`</span>.
</code></pre>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>أسرع اختبار هو الذي يتخطّى العمل الذي لا يقيسه. استخدم API للتهيئة، والواجهة للشيء الذي تختبره فعلًا، ولا تخلط بينهما. فمعظم اختبارات الطرف إلى الطرف في معظم قواعد الشيفرة أبطأ وأكثر تذبذبًا مما ينبغي، لأن التهيئة تتنكّر في هيئة موضوع الاختبار.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test">مختبر: حصّن اختبار تقييم الكتاب المتذبذب</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
