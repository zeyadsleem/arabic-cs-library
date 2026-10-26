const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",l="post-merge-and-post-deploy-validation",t="التحقّق بعد الدمج وبعد النشر",p=[{depth:2,id:"شكل-الحلقة",text:"شكل الحلقة"},{depth:2,id:"ما-يثبته-التحقق-بعد-النشر-فعلا",text:"ما يثبته التحقّق بعد النشر فعلًا"},{depth:3,id:"كيف-تبدو-مواصفة-التدقيق-فعلا",text:"كيف تبدو مواصفة التدقيق فعلًا"},{depth:3,id:"سير-عمل-النشر-الذي-يشغل-تدقيق-ما-بعد-النشر",text:"سير عمل النشر الذي يشغّل تدقيق ما بعد النشر"},{depth:2,id:"أهداف-المعاينة-تحتسب",text:"أهداف المعاينة تُحتسب"},{depth:2,id:"نافذة-السلامة-بعد-اختبار-التدقيق",text:"نافذة السلامة بعد اختبار التدقيق"},{depth:2,id:"قواعد-التراجع-ينبغي-أن-تكتب-قبل-أن-تحتاجها",text:"قواعد التراجع ينبغي أن تُكتب قبل أن تحتاجها"},{depth:2,id:"ما-يحتاجه-الوكيل-هنا",text:"ما يحتاجه الوكيل هنا"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"كيف-تعرف-أن-الحلقة-حقيقية",text:"كيف تعرف أن الحلقة حقيقية"},{depth:2,id:"الشيء-الواحد-الذي-يجب-تذكره",text:"الشيء الواحد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>أن يخضرّ CI شعور رائع. وهو أيضًا ليس الشيء نفسه الذي «النشر سليم».</p>
<p>لقد أطلقت ما يكفي من طلبات السحب «الخضراء تمامًا» التي انكسرت مع ذلك في البيئة الحقيقية حتى أتوقّف عن التظاهر بغير ذلك. متغيّرات بيئة خاطئة. عنوان إعادة توجيه خاطئ. نطاق ملف تعريف ارتباط خاطئ. مهمة خلفية لم تُقلع. شبكة CDN قدّمت بيان الأصول القديم. ترحيل قاعدة البيانات نجح ومع ذلك انفجر المسار عند أول حركة مرور حقيقية. لا تحتاج إلا إلى بضعة أمثلة من هذه قبل أن يتوقّف «نجح CI» عن أن يبدو خطاب نصر.</p>
<p>إذن، هذا الدرس عن الحلقة <em>بعد</em> بوابة الدمج.</p>
<blockquote>
<p><strong>متطلّب سابق</strong></p>
<p>يفترض هذا الدرس أنك وصلت بالفعل <a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI كحلقة الملاذ الأخير</a>. فـ CI هو آخر بوابة قبل الدمج، والتحقّق بعد النشر هو أول بوابة بعد الدمج.</p>
</blockquote>
<h2 id="شكل-الحلقة">شكل الحلقة</h2>
<p>إن كنت تستخدم <a href="https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments">بيئات GitHub Actions</a> أو نظام نشر مكافئًا، فتتبع الحلقة هذا الشكل:</p>
<pre><code>graph LR
  Merge[&quot;Merge to main&quot;] --&gt; Deploy[&quot;Deploy to preview or production&quot;]
  Deploy --&gt; Smoke[&quot;Run post-deploy smoke check&quot;]
  Smoke --&gt;|Pass| Monitor[&quot;Watch health window&quot;]
  Smoke --&gt;|Fail| Rollback[&quot;Rollback or stop the rollout&quot;]
  Monitor --&gt;|Healthy| Done[&quot;Done&quot;]
  Monitor --&gt;|Errors spike| Rollback
</code></pre>
<p>هذا هو الدرس كله في رسم بياني.</p>
<p>والفكرة الأساسية: <strong>النشر ليس نهاية الأتمتة. النشر بداية الحلقة التالية.</strong></p>
<h2 id="ما-يثبته-التحقق-بعد-النشر-فعلا">ما يثبته التحقّق بعد النشر فعلًا</h2>
<p>هذه الطبقة لا تعيد تشغيل مجموعة اختباراتك بأكملها من باب التشويق. إنها تثبت شيئًا أصغر وأحدّ:</p>
<ul>
<li>أن عنوان URL المنشور قابل للوصول</li>
<li>أن المسار الجوهري يُصيَّر</li>
<li>أن المصادقة ما تزال تعمل إن كان المسار يعتمد عليها</li>
<li>أن مسار القراءة الأساسي ومسار كتابة أساسي واحد ما يزالان يعملان</li>
<li>أن الوصلات الخاصة بالبيئة صحيحة</li>
</ul>
<p>هذا تدقيق سريع، لا خط أنابيب CI ثانٍ.</p>
<p>وبالنسبة لـ Shelf، يمكن أن يبقى تدقيق ما بعد النشر ضئيلًا:</p>
<ul>
<li>حمّل الصفحة الرئيسية أو صفحة الرف</li>
<li>تأكّد من تصيير العنوان الحرج</li>
<li>تأكّد من ظهور البيانات المبذورة أو حالة فارغة معروفة</li>
<li>إن كانت المصادقة مطلوبة، فأثبت أن حالة التخزين أو تهيئة تسجيل الدخول ما تزال تعمل مقابل عنوان URL المنشور</li>
</ul>
<p>والصِغر ميزة هنا. فإن استغرق التحقّق بعد النشر عشر دقائق، فلن يثق به أحد كإشارة لإيقاف الإطلاق.</p>
<h3 id="كيف-تبدو-مواصفة-التدقيق-فعلا">كيف تبدو مواصفة التدقيق فعلًا</h3>
<p>اختبار التدقيق بعد النشر هو مواصفة Playwright عادية في مجلد مخصّص كي لا يعمل كجزء من مجموعة الاختبارات الشاملة العادية. والشيء الوحيد الذي يجعله «بعد النشر» هو أنه يقرأ عنوان URL الهدف من متغيّر بيئة يحقنه سير عمل النشر، بحيث يمكن للملف نفسه أن يعمل مقابل معاينة أو بيئة اختبار تمهيدي أو الإنتاج دون أي تغييرات في الشيفرة.</p>
<p>وفي تمرين ما بعد النشر، يعيش الأمر المسمّى الذي يشغّل هذا المسار في <code>package.json</code> باسم <code>npm run test:smoke</code>، وتعيش المواصفة في <code>tests/smoke/post-deploy.spec.ts</code>، ويمكنك إضافة <code>playwright.smoke.config.ts</code> مخصّص إن أردت عزل تشغيل التدقيق عن الإعداد الرئيسي. وتلك الملفات هي السطح الملموس للحلقة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/smoke/post-deploy.spec.ts</span>
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">const</span> smokeBaseUrl = process.<span class="hljs-property">env</span>.<span class="hljs-property">SMOKE_BASE_URL</span> ?? <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>;

test.<span class="hljs-title function_">use</span>({ <span class="hljs-attr">baseURL</span>: smokeBaseUrl });

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;home page renders and exposes sign in&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;banner&#x27;</span>).<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Sign in&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>تحقّقان. هذا كل شيء. والنسخة المكتملة في Shelf تعيش في <code>tests/smoke/post-deploy.spec.ts</code> وتُستدعى غالبًا عبر <code>playwright.smoke.config.ts</code> مخصّص كي لا تلتقطها حلقة Playwright الافتراضية بالخطأ.</p>
<h3 id="سير-عمل-النشر-الذي-يشغل-تدقيق-ما-بعد-النشر">سير عمل النشر الذي يشغّل تدقيق ما بعد النشر</h3>
<p>سير عمل النشر هو حيث يستمدّ التدقيق أسنانه. وهذا شكل أدنى لـ GitHub Actions:</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/deploy.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]
  <span class="hljs-attr">workflow_dispatch:</span>

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span>
        <span class="hljs-attr">id:</span> <span class="hljs-string">deploy</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">|
          # Replace with your real deploy command. The important part
          # is that this step prints the deployed URL so the smoke job
          # can read it from the job output.
          echo &quot;url=https://shelf-preview.example.com&quot; &gt;&gt; &quot;$GITHUB_OUTPUT&quot;
</span>
  <span class="hljs-attr">smoke:</span>
    <span class="hljs-attr">needs:</span> <span class="hljs-string">deploy</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span> <span class="hljs-string">--ignore-scripts</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">playwright</span> <span class="hljs-string">install</span> <span class="hljs-string">--with-deps</span> <span class="hljs-string">chromium</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">post-deploy</span> <span class="hljs-string">smoke</span> <span class="hljs-string">check</span>
        <span class="hljs-attr">env:</span>
          <span class="hljs-attr">SMOKE_BASE_URL:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">needs.deploy.outputs.url</span> <span class="hljs-string">}}</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">test:smoke</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">report</span> <span class="hljs-string">on</span> <span class="hljs-string">failure</span>
        <span class="hljs-attr">if:</span> <span class="hljs-string">failure()</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v7</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">smoke-report</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">playwright-report/</span>
          <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
</code></pre>
<p>مهمتان. المهمة الأولى تفعل ما يحتاجه مضيفك للنشر وتكتب عنوان URL المنشور في <code>$GITHUB_OUTPUT</code> كي تقرأه المهمة التالية. والمهمة الثانية تثبّت Playwright، وتشغّل <code>npm run test:smoke</code> مع <code>SMOKE_BASE_URL</code> مشيرًا إلى ذلك العنوان، وترفع تقرير Playwright إن فشل التحقّق. وإن احمرّت مهمة التدقيق، فإما أن يُلغى النشر تلقائيًا وإما أن ينشر سير العمل إشارة إيقاف الإطلاق.</p>
<blockquote>
<p><strong>لا يوجد هدف نشر بعد؟</strong></p>
<p>إن لم يكن في نسختك من Shelf هدف نشر مستضاف، فيمكنك مع ذلك التدرّب على الحلقة نفسها محليًا: شغّل <code>npm run build &amp;&amp; npm run preview -- --host 127.0.0.1 --port 4173</code> في طرفية، و<code>SMOKE_BASE_URL=http://127.0.0.1:4173 npm run test:smoke</code> في طرفية أخرى. وسجّل هذه الفجوة في دليل التشغيل (runbook) لديك، ووصّل سير عمل النشر الحقيقي عندما يصبح لديك هدف.</p>
</blockquote>
<h2 id="أهداف-المعاينة-تحتسب">أهداف المعاينة تُحتسب</h2>
<p>لا تحتاج إلى إطلاق إنتاجي كامل لتعليم هذه الحلقة جيدًا.</p>
<p>فمعاينة نشر، أو هدف اختبار تمهيدي، أو حتى مهمة بناء ومعاينة تُتيح عنوان URL مستقرًا — كل ذلك يكفي للتدرّب على الشكل:</p>
<ul>
<li>انشر المخرج المرشّح</li>
<li>شغّل تدقيقًا مقابل عنوان URL المنشور</li>
<li>ارفع المخرجات عند الفشل</li>
<li>قرّر ما إذا كنت تمضي قدمًا</li>
</ul>
<p>ولهذا أفضّل تعليم هذا على هدف معاينة أولًا. فالحلقة هي المقصد، والمضيف تفصيل تنفيذي.</p>
<h2 id="نافذة-السلامة-بعد-اختبار-التدقيق">نافذة السلامة بعد اختبار التدقيق</h2>
<p>النجاح في اختبار التدقيق ضروري. وهو ما يزال ليس القصة كاملة.</p>
<p>فعادةً ما تكون هناك نافذة قصيرة بعد النشر تريد فيها إشارة أخرى على الأقل:</p>
<ul>
<li>بقي معدّل الأخطاء ثابتًا</li>
<li>لم تقفز زمن استجابة الطلبات</li>
<li>السجلات لا تمتلئ باستثناءات واضحة</li>
<li>المهام والعمال الخلفيون ما يزالون سليمين</li>
</ul>
<p>أنا لا أطلب منك بناء منظومة مراقبة كاملة في هذه الدورة. لكنني <em>أطلب</em> منك تعريف ما الذي سيؤدي إلى التراجع. فإن لم تعرّف تلك القاعدة مسبقًا، صار كل نشر سيئ جدلًا بدلًا من قرار.</p>
<h2 id="قواعد-التراجع-ينبغي-أن-تكتب-قبل-أن-تحتاجها">قواعد التراجع ينبغي أن تُكتب قبل أن تحتاجها</h2>
<p>هذه واحدة من تلك العادات الهندسية غير البرّاقة على نحو مُبهج التي توفّر قدرًا غير معقول من التوتّر.</p>
<p>اكتب محفّز التراجع:</p>
<ul>
<li>فشل تدقيق ما بعد النشر: تراجع</li>
<li>مسار حرج يعيد 500: تراجع</li>
<li>المصادقة معطّلة: تراجع</li>
<li>قفزة أخطاء فوق الحدّ المتفق عليه في أول N دقيقة: تراجع أو إيقاف مؤقت</li>
</ul>
<p>واجعل القاعدة محدّدة بما يكفي ليتبعها وكيل أو إنسان دون مسرحيات.</p>
<blockquote>
<p><strong>قواعد تراجع غامضة</strong></p>
<p>«إن بدا سيئًا، فربما ينبغي أن نتراجع» ليست سياسة تراجع. تلك مجادلة مستقبلية في سلسلة تعليقات على طلب سحب بينما المستخدمون يشعرون بالمشكلة بالفعل.</p>
</blockquote>
<h2 id="ما-يحتاجه-الوكيل-هنا">ما يحتاجه الوكيل هنا</h2>
<p>يحتاج الوكيل الشيء نفسه بالضبط الذي احتاجه طوال اليوم:</p>
<ul>
<li>أمر مسمّى لتشغيله</li>
<li>عنوان URL هدف</li>
<li>مخرجات عند فشل التحقّق</li>
<li>شرط إيقاف موثّق</li>
</ul>
<p>فإن قال سير عمل النشر «شغّل <code>npm run test:smoke</code> مقابل <code>SMOKE_BASE_URL</code> وارفع تقرير Playwright عند الفشل»، فيمكن للوكيل العمل بذلك. وإن قال سير عمل النشر «انظر إلى النشر يدويًا وقرّر إن كانت الأجواء طيبة»، فمبروك، لقد أعدت بناء نفسك كحلقة وصل.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Post-merge and post-deploy</span>

<span class="hljs-bullet">-</span> A green pull request is not the end of the loop. After merge or after
  a deploy preview is available, run the post-deploy smoke check against
  the deployed URL.
<span class="hljs-bullet">-</span> Use the named smoke-test command and the deployment URL provided by the
  workflow or environment.
<span class="hljs-bullet">-</span> If the smoke check fails, treat that as a stop-ship signal. Do not
  wave the deploy through in the summary.
<span class="hljs-bullet">-</span> If rollback conditions are met, recommend rollback explicitly instead
  of describing the failure passively.
</code></pre>
<h2 id="كيف-تعرف-أن-الحلقة-حقيقية">كيف تعرف أن الحلقة حقيقية</h2>
<p>تكون لديك هذه الحلقة عندما:</p>
<ul>
<li>هدف نشر أو معاينة يُتيح عنوان URL مستقرًا</li>
<li>اختبار تدقيق مسمّى يعمل على ذلك العنوان تلقائيًا</li>
<li>محفّزات التراجع مكتوبة قبل أن يفشل النشر</li>
</ul>
<h2 id="الشيء-الواحد-الذي-يجب-تذكره">الشيء الواحد الذي يجب تذكّره</h2>
<p>يثبت CI أن التغيير كان قابلًا للدمج. ويثبت التحقّق بعد النشر أن النشر نفسه سليم. وهذان ادّعاءان مختلفان، وإن أتمتت الأول فقط، فالثاني ما يزال مشكلتك.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI كحلقة الملاذ الأخير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-post-deploy-smoke-checks-to-shelf">تمرين: إضافة تدقيقات ما بعد النشر إلى Shelf</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,e as html,l as slug,t as title};
