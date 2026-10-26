const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="add-post-deploy-smoke-checks-to-shelf-solution",t="الحل",p=[{depth:2,id:"ما-يجب-إضافته",text:"ما يجب إضافته"},{depth:3,id:"testssmokepost-deployspects",text:"tests/smoke/post-deploy.spec.ts"},{depth:3,id:"playwrightsmokeconfigts",text:"playwright.smoke.config.ts"},{depth:3,id:"docspost-deploy-playbookmd",text:"docs/post-deploy-playbook.md"},{depth:3,id:"سكربت-packagejson",text:"سكربت package.json"},{depth:2,id:"ما-ما-زلت-بحاجة-إلى-تشغيله",text:"ما ما زلت بحاجة إلى تشغيله"},{depth:2,id:"ما-شحن-مقابل-الفجوة",text:"ما شُحن مقابل الفجوة"},{depth:2,id:"أنماط-تستحق-الاحتفاظ-بها",text:"أنماط تستحق الاحتفاظ بها"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>اختبار الدخان هو أصغر اختبار في المستودع. وهذا هو المقصود. كل شيء آخر في المجموعة يثبت أن التطبيق <em>يعمل</em>. هذا الاختبار يثبت أن التطبيق <em>شُحن</em>. بادئة Shelf لا تتضمنه، لذا فالحل هو الشيفرة التي تضيفها أثناء المختبر.</p>
<h2 id="ما-يجب-إضافته">ما يجب إضافته</h2>
<p>ثلاثة ملفات تحلّ في Shelf. لنستعرض كلًا منها.</p>
<h3 id="testssmokepost-deployspects"><code>tests/smoke/post-deploy.spec.ts</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">const</span> smokeBaseUrl = process.<span class="hljs-property">env</span>.<span class="hljs-property">SMOKE_BASE_URL</span> ?? <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>;

test.<span class="hljs-title function_">use</span>({ <span class="hljs-attr">baseURL</span>: smokeBaseUrl });

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;home page renders and exposes sign in&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;banner&#x27;</span>).<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;link&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Sign in&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>تحقّقان. هذا هو الاختبار كله. العنوان يثبت أن الصفحة صُيّرت. ورابط تسجيل الدخول يثبت أن التخطيط غير المصادَق حُمّل — وهذا يعني أن الخادم بدأ، وأن المسار تطابق، وأن القالب تُرجم. إن انكسر أي من هذه الثلاثة أثناء النشر، فهذا الاختبار يلتقطه.</p>
<p>رجوع <code>SMOKE_BASE_URL</code> إلى <code>127.0.0.1:4173</code> يعني أنك تستطيع تشغيله محليًا مقابل <code>npm run preview</code> دون ضبط أي شيء. في سير عمل النشر، يحقن سير العمل الرابط الحقيقي.</p>
<h3 id="playwrightsmokeconfigts"><code>playwright.smoke.config.ts</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig, devices } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">testDir</span>: <span class="hljs-string">&#x27;tests/smoke&#x27;</span>,
  <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/post-deploy\\.spec\\.ts/</span>,
  <span class="hljs-attr">fullyParallel</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">workers</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">reporter</span>: [[<span class="hljs-string">&#x27;html&#x27;</span>, { <span class="hljs-attr">open</span>: <span class="hljs-string">&#x27;never&#x27;</span>, <span class="hljs-attr">outputFolder</span>: <span class="hljs-string">&#x27;playwright-report/smoke-html&#x27;</span> }], [<span class="hljs-string">&#x27;list&#x27;</span>]],
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">baseURL</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">SMOKE_BASE_URL</span> ?? <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
    <span class="hljs-attr">trace</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
    <span class="hljs-attr">screenshot</span>: <span class="hljs-string">&#x27;only-on-failure&#x27;</span>,
  },
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: { ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>] },
    },
  ],
});
</code></pre>
<p>هذا إعداد <em>مخصّص</em>، منفصل عن <code>playwright.config.ts</code> الرئيسي. وهذا مهم. الإعداد الرئيسي يشغّل خادم ويب عبر <code>npm run build &amp;&amp; npm run preview</code>. إعداد الدخان لا يحتوي على كتلة <code>webServer</code> إطلاقًا — إنه يتوقع أن يكون الهدف قيد التشغيل بالفعل، لأن الهدف في سير العمل الحقيقي هو رابط منشور لم يبدأه Playwright.</p>
<p>تسجيل الأثر عند الفشل ولقطة الشاشة عند الفشل هما مسار الأدلة. إن احمرّ اختبار الدخان بعد نشر، يخبرك تقرير Playwright بالضبط كيف بدت الصفحة عند فشلها. لا تخمين، ولا «هل يمكنك إعادة إنتاجه محليًا؟»</p>
<h3 id="docspost-deploy-playbookmd"><code>docs/post-deploy-playbook.md</code></h3>
<p>يغطي دليل التشغيل خمسة أمور:</p>
<ul>
<li><strong>رابط الهدف:</strong> <code>SMOKE_BASE_URL</code> من البيئة، والافتراضي هو المعاينة المحلية.</li>
<li><strong>أمر مسمّى:</strong> <code>npm run test:smoke</code>، الذي يشغّل <code>playwright test --config=playwright.smoke.config.ts</code>.</li>
<li><strong>ما يثبته الاختبار:</strong> الصفحة تُحمّل، والعنوان مرئي، ورابط تسجيل الدخول موجود. هذا هو سلك التعطيل. أما التغطية الأعمق فهي مهمة مجموعة الاختبارات من طرف إلى طرف.</li>
<li><strong>إخفاقات توقف الشحن:</strong> فشل اختبار الدخان، أو إعادة <code>/login</code> رمز 5xx، أو ظهور استثناءات غير ملتقطة في سجلات وقت التشغيل، أو تجاوز معدل الأخطاء بعد النشر خط الأساس قبل النشر لأكثر من خمس دقائق.</li>
<li><strong>من يقوم بالتراجع:</strong> في الورشة، ادفع إيداع تراجع إلى <code>main</code>. في نشر حقيقي، استبدل هذا بأمر CLI المحدد أو سير العمل الذي يتراجع.</li>
</ul>
<p>يوثّق الدليل أيضًا نافذة صحة مدتها خمس دقائق بعد كل نشر، ويشير صراحة إلى الفجوة المستضافة — ليس لدى Shelf هدف نشر حقيقي بعد، فيقول الدليل ذلك بدلًا من التظاهر.</p>
<h3 id="سكربت-packagejson">سكربت <code>package.json</code></h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;test:smoke&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --config=playwright.smoke.config.ts&quot;</span>
</code></pre>
<p>سطر واحد. يستخدم الإعداد المخصّص. لا <code>webServer</code>، ولا خطوة بناء. سير العمل (أو أنت، محليًا) مسؤول عن التأكد من أن شيئًا يعمل على رابط الهدف أولًا.</p>
<h2 id="ما-ما-زلت-بحاجة-إلى-تشغيله">ما ما زلت بحاجة إلى تشغيله</h2>
<p>محليًا، حلقة إثبات الحياة بسيطة: تأكد من أن خادم معاينة يعمل بالفعل على <code>http://127.0.0.1:4173</code>، ثم شغّل <code>npm run test:smoke</code>. ينبغي أن ينجح الاختبار. إن لم ينجح، فتحقق من أن خادم المعاينة يمكن الوصول إليه فعلًا وأن الصفحة الرئيسية تصيّر <code>&lt;h1&gt;</code> ورابط «تسجيل الدخول» (Sign in) داخل لافتة الصفحة (معلم الرأس).</p>
<pre><code class="language-bash">SMOKE_BASE_URL=http://127.0.0.1:4173 npm run <span class="hljs-built_in">test</span>:smoke
</code></pre>
<p>لفحص الفشل المتعمد، غيّر التحقّق مؤقتًا ليبحث عن عنوان غير موجود:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;This heading does not exist&#x27;</span> })).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>شغّل اختبار الدخان مرة أخرى. تأكد من أنه يفشل، وينتج لقطة شاشة وأثرًا في <code>playwright-report/smoke-html/</code>، ويمنحك أدلة كافية لتقول «النشر معطوب» بثقة. ثم تراجع.</p>
<h2 id="ما-شحن-مقابل-الفجوة">ما شُحن مقابل الفجوة</h2>
<p><strong>محليًا:</strong> كل شيء يعمل من طرف إلى طرف. يعمل اختبار الدخان مقابل <code>npm run preview</code>، والدليل يوثّق مسار التراجع، والأمر المسمّى موجود. يمكنك إثبات الحلقة كاملة الآن.</p>
<p><strong>مستضافًا:</strong> يحتاج سير عمل النشر (<code>.github/workflows/deploy.yml</code>) إلى هدف نشر حقيقي. بلا هدف، تصبح مهمة <code>deploy</code> في سير العمل عنصرًا نائبًا، ولا يجد عندها <code>smoke</code> رابطًا يطرقه. يشير الدليل إلى هذا صراحة في قسم «الفجوة المستضافة». عندما يصل هدف مستضاف، تُوصِّل <code>SMOKE_BASE_URL</code> في سير العمل كمخرج لمهمة النشر وتحذف قسم الفجوة من الدليل. حتى ذلك الحين، نسخة المعاينة المحلية صادقة بشأن ما تثبته.</p>
<h2 id="أنماط-تستحق-الاحتفاظ-بها">أنماط تستحق الاحتفاظ بها</h2>
<ul>
<li><strong>اختبارات الدخان أسلاك تعطيل، لا مجموعات انحدار.</strong> التحقّقان ليسا كسلًا — بل انضباط. يجيب اختبار الدخان عن سؤال واحد: «هل كسر النشر أبسط شيء؟» إن احتجت تغطية أكثر، فمجموعة الاختبارات الكاملة من طرف إلى طرف هي لهذا الغرض.</li>
<li><strong>الإعداد المخصّص يُبقي اختبار الدخان مستقلًا.</strong> لا <code>webServer</code> يعني لا اقترانًا عرضيًا بخطوة البناء. لا يهم اختبار الدخان <em>كيف</em> وصل الهدف — بل أنه يعمل.</li>
<li><strong>الدليل يجعل قرار إيقاف الشحن صريحًا.</strong> عندما يفشل اختبار الدخان في الثانية صباحًا، يقول الدليل للوكيل (أو للإنسان) بالضبط ما يجب فعله. «تراجع» إجابة أفضل من «حقّق».</li>
<li><strong>وثّق الفجوة بدلًا من إخفائها.</strong> كتابة «ليس لدينا هدف مستضاف بعد» في الدليل أنفع من التظاهر بأن المعاينة المحلية نشر حقيقي. التوثيق الصادق شرط مسبق للأتمتة الصادقة.</li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-post-deploy-smoke-checks-to-shelf">مختبر: إضافة فحوصات دخان بعد النشر إلى Shelf</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation">التحقّق بعد الدمج وبعد النشر</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
