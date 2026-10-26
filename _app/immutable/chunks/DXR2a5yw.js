const s="kinney",e="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="lab-wire-visual-regression-into-the-dev-loop",t="مختبر",l=[{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"الجزء-الأول-ربط-بوابة-اللقطات",text:"الجزء الأول: ربط بوابة اللقطات"},{depth:2,id:"معايير-قبول-الجزء-الأول",text:"معايير قبول الجزء الأول"},{depth:2,id:"هدف-اللقطة-في-shelf",text:"هدف اللقطة في Shelf"},{depth:2,id:"الجزء-الثاني-اكسر-شيئا-وراقبها-تنطلق",text:"الجزء الثاني: اكسر شيئًا، وراقبها تنطلق"},{depth:2,id:"معايير-قبول-الجزء-الثاني",text:"معايير قبول الجزء الثاني"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>مختبر قصير. شطران. يربط الشطر الأول بوابة لقطات الشاشة بـ Shelf. ويكسر الشطر الثاني مكوّنًا عمدًا ويراقب الحلقة تنطلق.</p>
<blockquote>
<p><strong>المتطلّبات المسبقة</strong></p>
<p>أكمل <a href="https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop">الانحدار البصري كحلقة تغذية راجعة</a> أولًا. يفترض هذا المختبر إرشادات الحجب والحالة الثابتة وإعداد اللقطات من ذلك الدرس.</p>
</blockquote>
<h2 id="الإعداد">الإعداد</h2>
<p>تأكّد أنك على نسخة Shelf المحصّنة من <a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test">مختبر: تحصين اختبار Rate-Book المتقلّب</a>. ستحتاج إلى مصادقة حالة التخزين والزرع مهيّأين في مكانهما. والانحدار البصري بلا هذين كابوس.</p>
<p>لا تشحن نسخة Shelf الأولية مواصفات انحدار بصري ولا ربط المشاريع. هذا المختبر هو حيث تضيفها. إن كان مستودعك ما يزال يحمل إعداد الدخان العام الأدنى فقط، فابدأ باللقطة العامة أولًا، ثم وجّه اللقطة الموثّقة عبر مشروع <code>authenticated</code> الذي بنيته في مختبر Rate-Book.</p>
<h2 id="الجزء-الأول-ربط-بوابة-اللقطات">الجزء الأول: ربط بوابة اللقطات</h2>
<p>وزّع الفحوص البصرية على ملفين كي يعمل كل منها في مشروع Playwright الذي تتطابق مصادقته وزرعه مع الصفحة تحت الاختبار:</p>
<ul>
<li><code>tests/visual.spec.ts</code> — عام، بلا حالة تخزين، ويلتقط <code>/design-system</code> (معرض المكوّنات المنسّق).</li>
<li><code>tests/visual-authenticated.spec.ts</code> — يعمل تحت مشروع <code>authenticated</code>، ويعيد زرع محتوى الرفّ قبل كل اختبار، ويلتقط <code>/shelf</code>.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/visual.spec.ts</span>
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;design system matches the starter visual baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/design-system&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;design-system.png&#x27;</span>, {
    <span class="hljs-attr">fullPage</span>: <span class="hljs-literal">true</span>,
  });
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/visual-authenticated.spec.ts</span>
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> { resetShelfContent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./helpers/seed&#x27;</span>;

test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">resetShelfContent</span>();
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;shelf page matches the seeded visual baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> })).<span class="hljs-title function_">toBeVisible</span>();

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;shelf-page.png&#x27;</span>, { <span class="hljs-attr">fullPage</span>: <span class="hljs-literal">true</span> });
});
</code></pre>
<p>وجّه الملف الجديد عبر مشروع <code>authenticated</code> في <code>playwright.config.ts</code>:</p>
<pre><code class="language-typescript">{
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>,
  <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/(rate-book|accessibility|visual-authenticated|performance)\\.spec\\.ts/</span>,
  <span class="hljs-attr">use</span>: {
    ...devices[<span class="hljs-string">&#x27;Desktop Chrome&#x27;</span>],
    <span class="hljs-attr">storageState</span>: storageStatePath,
  },
  <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
},
</code></pre>
<p>وتأكّد أن <code>expect.toHaveScreenshot</code> مهيّأ عالميًا:</p>
<pre><code class="language-typescript"><span class="hljs-attr">expect</span>: {
  <span class="hljs-attr">toHaveScreenshot</span>: {
    <span class="hljs-attr">animations</span>: <span class="hljs-string">&#x27;disabled&#x27;</span>,
    <span class="hljs-attr">caret</span>: <span class="hljs-string">&#x27;hide&#x27;</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-string">&#x27;css&#x27;</span>,
    <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
  },
},
</code></pre>
<p>ولّد الأساسات:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span> -- --update-snapshots
</code></pre>
<p>أودِع ملفات PNG للأساسات في <code>tests/visual.spec.ts-snapshots/</code> و<code>tests/visual-authenticated.spec.ts-snapshots/</code>. نعم، تودع ملفات PNG في git. هذا هو الاتفاق.</p>
<h2 id="معايير-قبول-الجزء-الأول">معايير قبول الجزء الأول</h2>
<ul>
<li>أن يوجد كل من <code>visual.spec.ts</code> (العام) و<code>visual-authenticated.spec.ts</code> (الموثّق)، ويحتوي كل منهما على تأكيد <code>toHaveScreenshot</code> واحد على الأقل.</li>
<li>أن يضبط <code>playwright.config.ts</code> القيم <code>animations: 'disabled'</code> و<code>caret: 'hide'</code> و<code>scale: 'css'</code> و<code>maxDiffPixelRatio: 0.01</code> تحت <code>expect.toHaveScreenshot</code>.</li>
<li>أن ينجح <code>npm run test</code> في تشغيل نظيف (بلا فروق) — بما في ذلك كلا الاختبارين البصريين.</li>
<li>أن ينتج تشغيل المجموعة خمس مرات متتالية صفر إيجابيات كاذبة في أي من اختبارَي اللقطات: <code>for i in {1..5}; do npm run test || break; done</code> يخرج بصفر في كل تكرار.</li>
<li>أن يوجد كلا ملفَي اللقطات الأساسية (<code>ls tests/visual.spec.ts-snapshots/ tests/visual-authenticated.spec.ts-snapshots/</code> يطبع ملفات PNG المودعة).</li>
<li>أن لا يتجاهل <code>.gitignore</code> ملفات PNG للقطات.</li>
</ul>
<h2 id="هدف-اللقطة-في-shelf">هدف اللقطة في Shelf</h2>
<p>بمجرد أن تُربط المجموعة بشكل صحيح، ينبغي أن يبدو أساس صفحة Shelf شيئًا كهذا:</p>
<p><img src="/arabic-cs-library/images/kinney/5931137c35aa95e1.webp" alt="الأساس البصري لـ Shelf مرسومًا من لقطة Playwright المودعة"></p>
<h2 id="الجزء-الثاني-اكسر-شيئا-وراقبها-تنطلق">الجزء الثاني: اكسر شيئًا، وراقبها تنطلق</h2>
<p>الآن سنحاكي الحلقة. افتح <code>src/lib/components/button.svelte</code>. اعثر على التعبير المشتق <code>classes</code> وغيّر الحشوة الأساسية:</p>
<pre><code class="language-svelte">&lt;!-- before --&gt;
'inline-flex items-center justify-center rounded-(--radius-control) px-4 py-2 text-sm font-semibold ...',
&lt;!-- after --&gt;
'inline-flex items-center justify-center rounded-(--radius-control) px-6 py-3 text-sm font-semibold ...',
</code></pre>
<p>أعِد تشغيل المواصفات البصرية:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span> -- --grep visual
</code></pre>
<p>سيفشل. افتح تقرير HTML:</p>
<pre><code class="language-bash">npx playwright show-report playwright-report/html
</code></pre>
<p>اعثر على الاختبار الفاشل، وانظر إلى العرض ثلاثي الألواح (الأساس، والفعلي، والفرق). ينبغي أن تُظهر صورة الفرق بوضوح أن حجم الأزرار في اللقطتين قد تغيّر.</p>
<p>الآن حاكِ حلقة الوكيل. أمامك خياران بحسب إعدادك:</p>
<p><strong>الخيار أ—يدوي.</strong> انسخ مسار صورة الفرق إلى محادثة Claude Code واسأل: <em>«فشل اختبار الانحدار البصري. هذا هو الفرق. ما الذي تغيّر، وهل التغيير مقصود؟»</em> ودع الوكيل ينظر إلى الصورة ويصف ما يراه.</p>
<p><strong>الخيار ب—بخطّاف.</strong> إن كنت تستخدم Claude Code مع خطّاف يرفق إخفاقات الاختبارات تلقائيًا، فشغّل الاختبار فقط ودع الخطّاف ينطلق. (سنربط هذا النوع من الخطّافات بشكل صحيح في <a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خطّافات Git مع Lefthook</a>. أما اليوم، فاليدوي كافٍ.)</p>
<p>في الحالتين، لاحظ ما يقوله الوكيل. ينبغي أن يحدّد أن الأزرار كبرت، ويخمّن بشكل صحيح إن كان التغيير قد تسلسل إلى تخطيط آخر (على Shelf، على الأرجح وسّع بعض البطاقات)، ويقترح إمّا التراجع عن التغيير أو تحديث الأساس.</p>
<p>عندما تنجح تجربة الحشوة على النحو الصحيح، ينبغي أن يبدو فرق صفحة Shelf كتغيير من نوع «كل شيء صار أفسح»:</p>
<p><img src="/arabic-cs-library/images/kinney/02499d1258b63ca0.webp" alt="الفرق البصري لصفحة Shelf بعد توسيع حشوة الزر"></p>
<h2 id="معايير-قبول-الجزء-الثاني">معايير قبول الجزء الثاني</h2>
<ul>
<li>أن ينتج تغيير حشوة الزر تأكيد <code>toHaveScreenshot</code> فاشلًا.</li>
<li>أن يحتوي <code>playwright-report/</code> صورة فرق للاختبار الفاشل.</li>
<li>أن تكون قد عرضت الفرق على وكيلك وحصلت على رد يحدّد بدقة ما تغيّر بصريًا.</li>
<li>أن تكون إمّا (أ) تراجعت عن تغيير الزر وأعدت التشغيل حتى الأخضر، أو (ب) شغّلت <code>--update-snapshots</code> كتحديث أساس مقصود وأودعت الأساسات الجديدة في التزام منفصل.</li>
<li>أن يُظهر سجل git لديك التجربة كالتزامات منفصلة كي يبقى التسلسل مقروءًا لاحقًا.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>أضف مسار <code>design-system</code> يمرّن كل مكوّن في كل حالة، إن لم يكن لدى Shelf واحد بالفعل. وأضف اختبار لقطة واحدًا للمسار كله. اعتبر هذا <a href="https://www.chromatic.com/">Chromatic</a> نسخة الفقراء.</li>
<li>أعدّ مشروع Playwright ثانيًا لحجم عرض مختلف (مثلًا <code>iPhone 13</code> من إعدادات أجهزة Playwright) وأعد توليد الأساسات له. الآن يغطّي انحدارك البصري الهاتف المحمول أيضًا.</li>
<li>جرّب التدفّق نفسه مع <a href="https://www.chromatic.com/">Chromatic</a> بدلًا من اللقطات المدمجة، فقط لترى الفرق في تجربة المراجعة. لا تودع إعداد Chromatic بشكل دائم ما لم يكن الفريق كله موافقًا—فالمدمج هو النمط طويل الأمد لهذه الورشة.</li>
<li>أدخل تغييرًا دقيقًا عمدًا (مثلًا تغيير وزن خط من 500 إلى 600) وانظر إن كان هامش التفاوت <code>maxDiffPixelRatio: 0.01</code> يلتقطه. اضبط التفاوت إن لزم.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>اختبار اللقطة الفاشل بادرة حوار. وصورة الفرق هي الرسالة. وبمجرد أن يستطيع الوكيل قراءة الفرق، تُغلق الحلقة نفسها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/wire-visual-regression-into-the-dev-loop-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop">الانحدار البصري كحلقة تغذية راجعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/runtime-probes-in-the-development-loop">مسابر وقت التشغيل في حلقة التطوير</a></li>
</ul>
`,c={book:s,chapter:e,chapterTitle:n,slug:a,title:t,headings:l,html:p};export{s as book,e as chapter,n as chapterTitle,c as default,l as headings,p as html,a as slug,t as title};
