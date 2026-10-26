const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="harden-the-flaky-rate-book-test-solution",e="الحل",l=[{depth:2,id:"الإصلاح-1-المصادقة-بحالة-التخزين",text:"الإصلاح 1: المصادقة بحالة التخزين"},{depth:2,id:"الإصلاح-2-الزرع-الحتمي",text:"الإصلاح 2: الزرع الحتمي"},{depth:2,id:"الإصلاح-3-المحددات-الدلالية",text:"الإصلاح 3: المحددات الدلالية"},{depth:2,id:"الإصلاح-4-استبدال-الانتظارات-بإشارات-حقيقية",text:"الإصلاح 4: استبدال الانتظارات بإشارات حقيقية"},{depth:2,id:"الملف-النهائي",text:"الملف النهائي"},{depth:2,id:"ما-ما-زلت-بحاجة-إلى-تشغيله",text:"ما ما زلت بحاجة إلى تشغيله"},{depth:2,id:"تسلسل-الإيداعات",text:"تسلسل الإيداعات"},{depth:2,id:"أنماط-تأخذها-معك",text:"أنماط تأخذها معك"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>كان في اختبار البداية ثماني مشكلات وصفر من العادات الجيدة. أما النسخة النهائية ففيها صفر مشكلات—وإن أمعنت النظر—تُقرأ كأنها مواصفة. وإليك كيف ننتقل من الأولى إلى الثانية، نمطًا واحدًا في كل مرة.</p>
<p>إن أردت تجاوز الشرح التفصيلي والاكتفاء برؤية الملف النهائي، فاقفز إلى <a href="#the-final-file">الشيفرة النهائية</a>. لكن الجزء المثير ليس الوجهة—بل تسلسل الإيداعات الذي أوصلنا إليها، لأن كل إيداع يعزل فئة واحدة بالضبط من الإصلاحات.</p>
<h2 id="الإصلاح-1-المصادقة-بحالة-التخزين">الإصلاح 1: المصادقة بحالة التخزين</h2>
<p>يبدأ الاختبار الأصلي بتسجيل دخول كامل عبر الواجهة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/login&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=email]&#x27;</span>, <span class="hljs-string">&#x27;alice@example.com&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=password]&#x27;</span>, <span class="hljs-string">&#x27;password123&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">click</span>(<span class="hljs-string">&#x27;button[type=submit]&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">1000</span>);
</code></pre>
<p>خمسة أسطر، و<code>waitForTimeout</code> واحد، وكل اختبار في المجموعة يدفع ثمن ملء نموذج والانتظار من أجل إعادة توجيه. والأسوأ: إن غيّرت صفحة تسجيل الدخول ترميزها، انكسر كل ملف اختبار يسجّل الدخول بهذه الطريقة.</p>
<p>حالة التخزين تصلح كل هذا. يحدث تسجيل الدخول مرة واحدة في <code>tests/authentication.setup.ts</code>، وتُحفظ ملفات تعريف الارتباط الناتجة على القرص، ثم يعيد كل اختبار لاحق استخدامها. ولا يذكر ملف الاختبار <code>/login</code> إطلاقًا.</p>
<p>بعد هذا الإيداع، يبدأ الاختبار عند <code>page.goto('/shelf')</code>. وقد اختفت أسطر تسجيل الدخول الخمسة. واختفى معها أول <code>waitForTimeout</code>.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تفرض كومة المصادقة في Shelf دلالات على طريقة CSRF، لذا يقود ملف الإعداد نموذج تسجيل الدخول الحقيقي عبر متصفح بدلًا من إرسال POST مباشرة إلى نقطة نهاية تسجيل الدخول. وهذا مقصود—فهو يخدم أيضًا كاختبار دخان ضمني على صفحة تسجيل الدخول.</p>
</blockquote>
<h2 id="الإصلاح-2-الزرع-الحتمي">الإصلاح 2: الزرع الحتمي</h2>
<p>الاختبار الأصلي بلا زرع. إنه يفترض أن «كل ما على الرف» يتضمن كتابًا فيه زر <code>.rate</code>. على قاعدة بيانات جديدة، قد يكون كذلك. وبعد أن يحذف اختبار آخر كتابًا، قد لا يكون. وهذا هو تعريف التذبذب.</p>
<p>الإصلاح هو <code>resetShelfContent</code> داخل <code>beforeEach</code>. وهذه تنادي دالة الزرع المساعدة التي تبنيها في <code>tests/helpers/seed.ts</code>، والتي تعيد الرف إلى حالة معلومة: مجموعة كتب محددة، بلا تقييمات، في كل مرة.</p>
<pre><code class="language-typescript">test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
});
</code></pre>
<p>سطر واحد. الآن يعرف الاختبار بالضبط ما في قاعدة البيانات قبل أن يبدأ. وكان نداءا <code>waitForTimeout</code> الثاني والثالث يعوّضان جزئيًا عن بيانات قديمة أو ناقصة—وحين يصير الزرع حتميًا، يختفي نصف مشكلات التوقيت من تلقاء نفسه.</p>
<p>لاحظ أننا نستخدم <code>resetShelfContent</code> لا <code>seedFreshDatabase</code>. والفرق مهم: <code>resetShelfContent</code> تعيد ضبط الكتب والتقييمات دون المساس بالمستخدمين. ولو محونا المستخدمين، لأبطلنا حالة التخزين التي أعددناها للتو في الإصلاح 1. وهذا نوع التفاعل الذي يحرق ساعة من وقتك إن لم تعرف أن تبحث عنه.</p>
<h2 id="الإصلاح-3-المحددات-الدلالية">الإصلاح 3: المحددات الدلالية</h2>
<p>يستخدم الاختبار الأصلي محددات CSS خامًا في كل مكان:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.book-card button.rate&#x27;</span>).<span class="hljs-title function_">first</span>().<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.rating-modal .star[data-value=&quot;4&quot;]&#x27;</span>).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.rating-modal button.submit&#x27;</span>).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">const</span> toast = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;.toast&#x27;</span>).<span class="hljs-title function_">textContent</span>();
</code></pre>
<p>كل واحد من هذه ينكسر حين تتغير أسماء الفئات. ونداء <code>.first()</code> سيئ على وجه الخصوص—فهو يلتقط أي كتاب تصادف أنه الأول في DOM، ما يعني أن الاختبار لا يتحقق فعلًا من كتاب بعينه.</p>
<p>يستخدم الإصلاح <code>getByRole</code> مع تسلسل محدّد النطاق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> stationEleven = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> });
<span class="hljs-keyword">await</span> stationEleven.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Rate this book&#x27;</span> }).<span class="hljs-title function_">click</span>();
</code></pre>
<p>الآن نستهدف كتابًا بعينه باسمه المتاح للوصول، ثم نحدد النطاق داخل ذلك المقال للعثور على زر التقييم. إن أعاد أحد ترتيب الرف، فسيظل الاختبار يجد Station Eleven. وإن أعاد أحد تسمية فئة CSS من <code>.rate</code> إلى <code>.rating-trigger</code>، فلن يهتم الاختبار.</p>
<p>داخل النافذة، النمط نفسه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> dialog = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;dialog&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Rate Station Eleven/</span> });
<span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;radio&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;4 stars&#x27;</span> }).<span class="hljs-title function_">check</span>();
<span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Save rating&#x27;</span> }).<span class="hljs-title function_">click</span>();
</code></pre>
<p>النافذة محددة النطاق بالدور والاسم. وزر الاختيار يُعثر عليه بتسميته. وزر الإرسال يُعثر عليه بنصه الظاهر. لا CSS. ولا خصائص <code>data-value</code>. ولا محددات مركّبة.</p>
<p>يتغير تأكيد الإشعار أيضًا. كان الأصل يقرأ <code>textContent()</code> في متغيّر ويؤكد بـ<code>.toContain</code>—وهذا يتجاوز إعادة المحاولة التلقائية في Playwright بالكامل. فإن استغرق ظهور الإشعار 200ms، يفشل الاختبار. أما الإصلاح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;status&#x27;</span>)).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-regexp">/Thanks/</span>);
</code></pre>
<p>يعيد <code>toHaveText</code> المحاولة تلقائيًا حتى يطابق نص العنصر أو تنتهي المهلة. ومحدد <code>role=&quot;status&quot;</code> أكثر استقرارًا من <code>.toast</code>، وهو أيضًا فحص وصول—فإن أزال أحد دور ARIA من الإشعار، يفشل هذا الاختبار <em>و</em>يكون الإشعار معطلًا لمستخدمي قارئات الشاشة.</p>
<h2 id="الإصلاح-4-استبدال-الانتظارات-بإشارات-حقيقية">الإصلاح 4: استبدال الانتظارات بإشارات حقيقية</h2>
<p>في الأصل ثلاثة نداءات <code>waitForTimeout</code>: 1000ms بعد تسجيل الدخول، و2000ms بعد الانتقال إلى الرف، و1500ms بعد إرسال التقييم. مجموع ذلك 4.5 ثوانٍ من الزمن الميت—في يوم جيد.</p>
<p>الإصلاح 1 أزال الأول بالفعل. وكان الثاني يعوّض عن تحميل صفحة الرف—لكننا لا نحتاج مهلة لذلك. فتأكيد <code>await expect(stationEleven).toBeVisible()</code> يعيد المحاولة تلقائيًا حتى تظهر بطاقة الكتاب. هذا هو الانتظار. بلا رقم سحري.</p>
<p>والثالث هو الأكثر إثارة. ينتظر الأصل 1500ms بعد النقر على «submit» ويأمل أن التقييم قد حُفظ. أما الإصلاح فيستخدم <code>waitForResponse</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> ratingResponse = page.<span class="hljs-title function_">waitForResponse</span>(
  <span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> <span class="hljs-regexp">/\\/api\\/shelf\\/.+/</span>.<span class="hljs-title function_">test</span>(response.<span class="hljs-title function_">url</span>()) &amp;&amp; response.<span class="hljs-title function_">request</span>().<span class="hljs-title function_">method</span>() === <span class="hljs-string">&#x27;PATCH&#x27;</span>,
);
<span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Save rating&#x27;</span> }).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">const</span> savedResponse = <span class="hljs-keyword">await</span> ratingResponse;
<span class="hljs-title function_">expect</span>(savedResponse.<span class="hljs-title function_">ok</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
</code></pre>
<p>لاحظ الترتيب: تُعدّ مستمع الاستجابة <em>قبل</em> النقر، ثم تنتظره <em>بعده</em>. وإن فعلت العكس، فلديك حالة تسابق—قد تصل الاستجابة قبل أن تبدأ الاستماع. هذا هو النمط. احفظه.</p>
<p>الآن ينتظر الاختبار الإشارة الصحيحة بالضبط: طلب PATCH إلى API الرف عاد بـ200. لا «مرّت 1500ms وأرجو أن الأمور سارت على ما يرام». بل استجابة الشبكة الفعلية.</p>
<h2 id="الملف-النهائي">الملف النهائي <span class="content-anchor" id="the-final-file"></span></h2>
<p>هذا هو الاختبار النهائي بعد الإصلاحات الأربعة كلها. والتعليقات المضمّنة هي شروح تعليمية موضوعة فوق الشكل النهائي في <code>tests/rate-book.spec.ts</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> { resetShelfContent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./helpers/seed&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;rate a book on your shelf&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Fix 2: deterministic seeding — every run starts from the same state</span>
  test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
  });

  <span class="hljs-comment">// Fix 1: no login block — storage state authentication handles it</span>
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;user can rate Station Eleven&#x27;</span>, <span class="hljs-title function_">async</span> ({ page, request }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);

    <span class="hljs-comment">// Fix 3: semantic locator scoped to a specific book</span>
    <span class="hljs-keyword">const</span> stationEleven = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> });
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(stationEleven).<span class="hljs-title function_">toBeVisible</span>(); <span class="hljs-comment">// Fix 4: this IS the wait</span>

    <span class="hljs-comment">// Fix 3: scoped button inside the article</span>
    <span class="hljs-keyword">await</span> stationEleven.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Rate this book&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Fix 3: dialog by role and name</span>
    <span class="hljs-keyword">const</span> dialog = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;dialog&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Rate Station Eleven/</span> });
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(dialog).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Fix 3: radio by label instead of .star[data-value=&quot;4&quot;]</span>
    <span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;radio&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;4 stars&#x27;</span> }).<span class="hljs-title function_">check</span>();

    <span class="hljs-comment">// Fix 4: listen for the response BEFORE clicking</span>
    <span class="hljs-keyword">const</span> ratingResponse = page.<span class="hljs-title function_">waitForResponse</span>(
      <span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span>
        <span class="hljs-regexp">/\\/api\\/shelf\\/.+/</span>.<span class="hljs-title function_">test</span>(response.<span class="hljs-title function_">url</span>()) &amp;&amp; response.<span class="hljs-title function_">request</span>().<span class="hljs-title function_">method</span>() === <span class="hljs-string">&#x27;PATCH&#x27;</span>,
    );

    <span class="hljs-comment">// Fix 3: button by name instead of .submit</span>
    <span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Save rating&#x27;</span> }).<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Fix 4: await the actual network response</span>
    <span class="hljs-keyword">const</span> savedResponse = <span class="hljs-keyword">await</span> ratingResponse;
    <span class="hljs-title function_">expect</span>(savedResponse.<span class="hljs-title function_">ok</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Fix 3 + 4: auto-retrying assertion on a role-based locator</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;status&#x27;</span>)).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-regexp">/Thanks/</span>);

    <span class="hljs-comment">// Fix 3: verify the rating is visible in the UI</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(stationEleven.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Rated: 4/5&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();

    <span class="hljs-comment">// Hybrid API assertion — verify the rating actually persisted in the database</span>
    <span class="hljs-keyword">const</span> shelfResponse = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>);
    <span class="hljs-title function_">expect</span>(shelfResponse.<span class="hljs-title function_">ok</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">const</span> body = (<span class="hljs-keyword">await</span> shelfResponse.<span class="hljs-title function_">json</span>()) <span class="hljs-keyword">as</span> {
      <span class="hljs-attr">entries</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">book</span>: { <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }; <span class="hljs-attr">rating</span>: <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> }&gt;;
    };
    <span class="hljs-keyword">const</span> stationElevenEntry = body.<span class="hljs-property">entries</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> entry.<span class="hljs-property">book</span>.<span class="hljs-property">title</span> === <span class="hljs-string">&#x27;Station Eleven&#x27;</span>);
    <span class="hljs-title function_">expect</span>(stationElevenEntry?.<span class="hljs-property">rating</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">4</span>);
  });
});
</code></pre>
<p>في هذه المرحلة من الدورة، ما زال الاختبار يستورد من <code>@playwright/test</code>. لاحقًا، في مختبر ملفات تعريف الأعطال، تضيف <code>tests/fixtures.ts</code> لتغليف <code>page</code> بتمرير وحدة التحكم والشبكة. وحين يوجد ذلك الملف، يصبح تبديل الاستيراد إلى <code>./fixtures</code> متابعة جيدة. وهو <strong>ليس</strong> شرطًا مسبقًا لهذا المختبر.</p>
<p>صفر <code>waitForTimeout</code>. صفر <code>page.locator()</code>. صفر <code>page.goto('/login')</code>. صفر <code>page.fill('[name=')</code>. كل محدد دلالي. وكل انتظار إشارة حقيقية.</p>
<h2 id="ما-ما-زلت-بحاجة-إلى-تشغيله">ما ما زلت بحاجة إلى تشغيله</h2>
<p>تشترط معايير القبول عشر نجاحات متتالية. وهذه هي الحلقة:</p>
<pre><code class="language-bash"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> {1..10}; <span class="hljs-keyword">do</span> npx playwright <span class="hljs-built_in">test</span> --project=authenticated tests/rate-book.spec.ts || <span class="hljs-built_in">break</span>; <span class="hljs-keyword">done</span>
</code></pre>
<p>إن خرج أي تكرار بقيمة غير صفرية، فالاختبار ما زال متذبذبًا. والسبب الأكثر شيوعًا في هذه المرحلة مشكلة زرع—إما أن <code>resetShelfContent</code> لم تعِد الضبط كاملًا، أو أن عنوان الكتاب لا يطابق التعبير النمطي. افحص دالة الزرع المساعدة أولًا.</p>
<p>ولفحص الزمن الجداري:</p>
<pre><code class="language-bash"><span class="hljs-keyword">time</span> npx playwright <span class="hljs-built_in">test</span> --project=authenticated tests/rate-book.spec.ts
</code></pre>
<p>الاختبار الأصلي، بما فيه من 4.5 ثوانٍ من نداءات <code>waitForTimeout</code>، يسجّل عادة نحو 8-10 ثوانٍ. أما النسخة المحصّنة فتنتهي عادة في أقل من 5 ثوانٍ، وأحيانًا في أقل من 3. وتعتمد الأرقام الدقيقة على آلتك، لكن الفرق ينبغي أن يكون واضحًا.</p>
<h2 id="تسلسل-الإيداعات">تسلسل الإيداعات</h2>
<p>ينبغي أن يُظهر سجل git لديك أربعة إيداعات على الأقل، يعالج كل واحد منها نمطًا واحدًا:</p>
<ol>
<li><strong>مصادقة حالة التخزين</strong> — احذف كتلة تسجيل الدخول، واربط <code>tests/authentication.setup.ts</code>، وتحقّق من أن الاختبار ما زال يصل إلى <code>/shelf</code>.</li>
<li><strong>الزرع الحتمي</strong> — أضف <code>resetShelfContent</code> في <code>beforeEach</code>، وتحقّق من وجود الكتاب قبل التفاعل معه.</li>
<li><strong>المحددات الدلالية</strong> — استبدل كل محدد CSS بـ<code>getByRole</code>/<code>getByLabel</code>/<code>getByText</code>، وحدد النطاق بعنوان الكتاب.</li>
<li><strong>انتظارات حقيقية</strong> — استبدل كل <code>waitForTimeout</code> بـ<code>toBeVisible()</code> أو <code>waitForResponse</code>، وبدّل <code>textContent</code> + <code>toContain</code> بتأكيدات تعيد المحاولة تلقائيًا.</li>
</ol>
<p>ينبغي أن يترك كل إيداع الاختبار ناجحًا. وإن كسر إيداعٌ الاختبار، فقد أخطأت الترتيب—حاولت على الأرجح إزالة <code>waitForTimeout</code> قبل إصلاح المحدد الذي كان يعوّض عنه. اعمل من الأعلى إلى الأسفل.</p>
<h2 id="أنماط-تأخذها-معك">أنماط تأخذها معك</h2>
<ul>
<li><strong>المصادقة بنية تحتية، لا شيفرة اختبار.</strong> حالة التخزين تعمل مرة واحدة، وتستفيد منها المجموعة كلها.</li>
<li><strong>الزرع هو العقد بين اختبارك وقاعدة بياناتك.</strong> إن لم تزرع، فأنت تختبر «أي شيء تصادف وجوده»، وهذا تعبير آخر عن «لا شيء بعينه».</li>
<li><strong>المحددات الدلالية أكثر استقرارًا من محددات CSS <em>وهي</em> تأكيدات وصول مجانًا.</strong> فإن توقف <code>getByRole('button', { name: 'Rate this book' })</code> عن العمل، فإما أن الزر فقد اسمه المتاح للوصول أو أن الاسم المتاح تغيّر. وكلاهما عيب يستحق الالتقاط.</li>
<li><strong>التأكيد هو الانتظار.</strong> لـ<code>toBeVisible()</code> و<code>toHaveText()</code> و<code>waitForResponse</code> منطق إعادة محاولة مدمج. وإضافة <code>waitForTimeout</code> فوقها دفع مرتين مقابل الشيء نفسه—إلا أن نسخة المهلة أبطأ <em>وأقل</em> موثوقية.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test">مختبر: تحصين اختبار تقييم الكتاب المتذبذب</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation">الحالة الحتمية وعزل الاختبار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests">اختبارات API وUI الهجينة</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,p as html,t as slug,e as title};
