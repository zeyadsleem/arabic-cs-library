const s="kinney",n="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="wire-visual-regression-into-the-dev-loop-solution",a="الحل",p=[{depth:2,id:"الملفات-التي-تضيفها-في-هذا-التمرين",text:"الملفات التي تضيفها في هذا التمرين"},{depth:3,id:"testsvisualspects",text:"tests/visual.spec.ts"},{depth:3,id:"testsvisual-authenticatedspects",text:"tests/visual-authenticated.spec.ts"},{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"توليد-خطوط-الأساس-وإيداعها",text:"توليد خطوط الأساس وإيداعها"},{depth:2,id:"الجزء-الثاني-اكسر-شيئا-وراقبه-ينطلق",text:"الجزء الثاني: اكسر شيئًا وراقبه ينطلق"},{depth:3,id:"عرض-الفرق-على-الوكيل",text:"عرض الفرق على الوكيل"},{depth:3,id:"إغلاق-الحلقة",text:"إغلاق الحلقة"},{depth:2,id:"ما-الذي-يجعل-هذا-ينجح",text:"ما الذي يجعل هذا ينجح"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>ملفّا مواصفة، وأربعة أسطر إعداد، وملف PNG مُودَع. هذا هو إعداد الانحدار البصري بأكمله. والجزء الصعب ليس الشيفرة — بل فهم لماذا يوجد كل جزء، وما يحدث حين تتخطّاه.</p>
<h2 id="الملفات-التي-تضيفها-في-هذا-التمرين">الملفات التي تضيفها في هذا التمرين</h2>
<h3 id="testsvisualspects"><code>tests/visual.spec.ts</code></h3>
<p>يغطّي هذا الملف الصفحات العامة التي لا تحتاج إلى مصادقة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;design system matches the starter visual baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/design-system&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> })).<span class="hljs-title function_">toBeVisible</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;design-system.png&#x27;</span>, { <span class="hljs-attr">fullPage</span>: <span class="hljs-literal">true</span> });
});
</code></pre>
<p>ثلاثة أسطر من العمل الحقيقي. انتقل، وانتظر حتى تجهز الصفحة، والتقط لقطة الشاشة. ولنتحدّث عن كل واحد منها.</p>
<p>يستهدف <code>page.goto('/design-system')</code> معرض المكوّنات المنسّق. وهذه أفضل صفحة في التطبيق للانحدار البصري لأنها تختبر كل مكوّن في تخطيط مضبوط. فلقطة واحدة تلتقط أنماط الأزرار، وتخطيطات البطاقات، والطباعة، ورموز الألوان — كل ما يهم بصريًا.</p>
<p>و<code>await expect(page.getByRole('heading', { level: 1 })).toBeVisible()</code> هي بوابة الاستقرار. فأنت تحتاج إلى <em>شيء</em> في الصفحة يكون مؤكّد الظهور قبل أن تلتقط لقطة الشاشة. وبدون ذلك، تلتقط أحيانًا صفحة فارغة في منتصف التصيير. والعنوان ينفع لأن من أوائل العناصر التي تُرسم، وإن لم يكن العنوان موجودًا فالصفحة لم تُحمَّل.</p>
<p>و<code>toHaveScreenshot('design-system.png', { fullPage: true })</code> تفعل شيئين. في أول تشغيل تُنشئ ملف PNG لخط الأساس. وفي كل تشغيل لاحق تقارن الصفحة الحالية بذلك الأساس بكسلًا بكسلًا (ضمن التجاوز المسموح المُعدّ). و<code>fullPage: true</code> تلتقط الصفحة القابلة للتمرير بأكملها، لا منفذ العرض فقط.</p>
<p>اسم الملف الصريح (<code>'design-system.png'</code>) مقصود. فبدونه يولّد Playwright اسمًا تلقائيًا من عنوان الاختبار، وهذا يعمل لكنه ينتج أسماء مثل <code>design-system-matches-the-starter-visual-baseline-1-chromium-darwin.png</code>. والاسم الصريح أسهل في العثور عليه داخل مجلد اللقطات، وأسهل في التفكير فيه عند قراءة الفروق.</p>
<h3 id="testsvisual-authenticatedspects"><code>tests/visual-authenticated.spec.ts</code></h3>
<p>يغطّي هذا الملف الصفحات التي تحتاج إلى مستخدم مسجّل الدخول وإلى بيانات مبذورة (seeded).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
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
<p>ثمّة اختلافان عن النسخة العامة. الأول: <code>resetShelfContent</code> في <code>beforeEach</code>. فالانحدار البصري بلا بيانات حتمية كابوس — كل تشغيل ينتج رفًّا مختلفًا، ما يعني أن كل تشغيل ينتج لقطة مختلفة، ما يعني أن كل تشغيل يفشل. والبذر يضمن وجود Station Eleven دائمًا، وفي الموضع نفسه دائمًا، وبلا تقييم دائمًا.</p>
<p>والثاني: التحقّق الإضافي <code>toBeVisible</code> على مقالة Station Eleven. فالعنوان يخبرك أن الصفحة حُمّلت، أما المقالة فتخبرك أن <em>البيانات</em> حُمّلت. وإن اكتفيت بانتظار العنوان، تلتقط أحيانًا الصفحة في حالة رُسم فيها العنوان لكن بطاقات الكتب لم تُصيَّر بعد. وهذا ينتج نتيجة إيجابية كاذبة في أول تشغيل، وسلبية كاذبة في كل تشغيل لاحق. انتظر البيانات.</p>
<h2 id="الإعداد">الإعداد</h2>
<p>أربعة أسطر في <code>playwright.config.ts</code> تحت <code>expect.toHaveScreenshot</code>:</p>
<pre><code class="language-typescript"><span class="hljs-attr">expect</span>: {
  <span class="hljs-attr">toHaveScreenshot</span>: {
    <span class="hljs-attr">animations</span>: <span class="hljs-string">&#x27;disabled&#x27;</span>,
    <span class="hljs-attr">caret</span>: <span class="hljs-string">&#x27;hide&#x27;</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-string">&#x27;css&#x27;</span>,
    <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
  },
},
</code></pre>
<p>كل سطر منها يحلّ سيناريو معيّنًا من النتائج الإيجابية الكاذبة.</p>
<p><strong><code>animations: 'disabled'</code></strong> يجمّد كل حركات CSS وانتقالاتها قبل أخذ اللقطة. وبدونه، قد ينتج مُحمِّل دوّار أو انتقال تلاشٍ إطارات مختلفة في تشغيلات مختلفة. فاللقطة تلتقط <em>الحالة النهائية</em>، لا إطارًا عشوائيًا في منتصف الحركة.</p>
<p><strong><code>caret: 'hide'</code></strong> يُخفي مؤشّر النص الوامض. فإن كان أي حقل إدخال في الصفحة يحمل التركيز، أنتج وميض المؤشّر فرقًا بمقدار بكسل واحد في تشغيل من كل اثنين. وإخفاؤه يزيل ذلك الضجيج تمامًا.</p>
<p><strong><code>scale: 'css'</code></strong> يُطبّع اللقطة على بكسلات CSS بدل بكسلات الجهاز. وبدونه، تنتج شاشة Retina صورة بدقة 2x بينما ينتج CI (الذي يعمل عادةً بلا واجهة على جهاز غير Retina) صورة بدقة 1x، وحينها لن تتطابق خطوط الأساس. أما <code>scale: 'css'</code> فيضمن أن ينتج البيئتان الدقة نفسها.</p>
<p><strong><code>maxDiffPixelRatio: 0.01</code></strong> يسمح باختلاف 1% من البكسلات كحد أقصى قبل أن يفشل الاختبار. وهذا هو مقبض التجاوز المسموح. والتجاوز الصفري يبدو صارمًا، لكنه عمليًا يفشل بسبب فروق تمويه الحدود دون البكسل بين إصدارات أنظمة التشغيل. و1% يمتصّ ذلك الضجيج مع استمراره في التقاط أي تغيّر بصري حقيقي. فإن وجدته مرتخيًا جدًا (يفوّت تغيّرات حقيقية) أو مشدودًا جدًا (يتذبذب بسبب تصيير الخطوط)، فعدّله — لكن 0.01 نقطة بداية متينة.</p>
<h2 id="توليد-خطوط-الأساس-وإيداعها">توليد خطوط الأساس وإيداعها</h2>
<p>أول تشغيل يُنشئ ملفات PNG لخطوط الأساس:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span> -- --update-snapshots
</code></pre>
<p>ينتج هذا مجلدات لقطات بجوار كل ملف مواصفة:</p>
<ul>
<li><code>tests/visual.spec.ts-snapshots/design-system.png</code></li>
<li><code>tests/visual-authenticated.spec.ts-snapshots/shelf-page.png</code></li>
</ul>
<p>نعم، تُودِع ملفات PNG هذه في git. هذا هو الاتفاق. فهي صغيرة (عادةً 50-200KB لكل لقطة صفحة كاملة)، وتحتاج إلى التحكّم في إصداراتها كي تعمل المقارنة على كل جهاز وفي CI.</p>
<p>تأكّد من أن <code>.gitignore</code> لا يستثنيها. فبعض قوالب <code>.gitignore</code> تتضمّن <code>*.png</code> أو <code>**/*.png</code> — وإن فعل قالبك ذلك، فأضف استثناءً لمجلدات اللقطات:</p>
<pre><code># .gitignore
!tests/*-snapshots/*.png
</code></pre>
<p>بعد إيداع خطوط الأساس، شغّل المجموعة على نظافة:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ثم شغّلها خمس مرات للتحقّق من الاستقرار:</p>
<pre><code class="language-bash"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> {1..5}; <span class="hljs-keyword">do</span> npm run <span class="hljs-built_in">test</span> || <span class="hljs-built_in">break</span>; <span class="hljs-keyword">done</span>
</code></pre>
<p>إن فشل أي تكرار، فلديك نتيجة إيجابية كاذبة. والمشتبه بهم المعتادون: حركة لم تجمّدها، أو طابع زمني أو تاريخ نسبي في الصفحة («قبل ساعتين» يتغيّر في كل تشغيل)، أو صورة رمزية عشوائية. أصلح المصدر (عطّل الحركة، أو حاكِ التاريخ، أو ابذر الصورة الرمزية) بدلًا من إرخاء التجاوز المسموح.</p>
<h2 id="الجزء-الثاني-اكسر-شيئا-وراقبه-ينطلق">الجزء الثاني: اكسر شيئًا وراقبه ينطلق</h2>
<p>يطلب التمرين تغيير حشوة الزر في <code>src/lib/components/button.svelte</code>:</p>
<pre><code class="language-svelte">&lt;!-- before --&gt;
'inline-flex items-center justify-center rounded-(--radius-control) px-4 py-2 text-sm font-semibold ...',
&lt;!-- after --&gt;
'inline-flex items-center justify-center rounded-(--radius-control) px-6 py-3 text-sm font-semibold ...',
</code></pre>
<p>شغّل مواصفات الانحدار البصري:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span> -- --grep visual
</code></pre>
<p>ينبغي أن يفشل الاختباران. فصفحة نظام التصميم فيها أزرار، وصفحة الرف فيها أزرار. والأزرار الأكبر تعني لقطات مختلفة.</p>
<p>افتح تقرير HTML:</p>
<pre><code class="language-bash">npx playwright show-report playwright-report/html
</code></pre>
<p>اعثر على الاختبار الفاشل وانظر إلى العرض ثلاثي الألواح. يُظهر التقرير:</p>
<ul>
<li><strong>المتوقّع (Expected)</strong>: خط الأساس المُودَع بأحجام الأزرار الأصلية.</li>
<li><strong>الفعلي (Actual)</strong>: الصفحة الحالية بالأزرار الأعرض.</li>
<li><strong>الفرق (Diff)</strong>: تراكب وردي/أحمر يُبرز كل بكسل تغيّر.</li>
</ul>
<p>ينبغي أن يُظهر الفرق بوضوح أن الأزرار صارت أكبر. وفي صفحة الرف، قد تدفع الأزرار الأكبر محتوى البطاقات أيضًا، فتتسلسل التغيّرات البصرية إلى ما هو أبعد من الأزرار نفسها. وهذا جيد — فهو بالضبط نوع الأثر المتسلسل الذي يبقى غير مرئي في اختبار وحدة ويكون واضحًا في لقطة الشاشة.</p>
<h3 id="عرض-الفرق-على-الوكيل">عرض الفرق على الوكيل</h3>
<p>انسخ مسار صورة الفرق من التقرير وألصقه في محادثة Claude Code:</p>
<blockquote>
<p>«فشل اختبار الانحدار البصري. هذا هو الفرق. ما الذي تغيّر، وهل التغيّر مقصود؟»</p>
</blockquote>
<p>استجابة الوكيل الجيدة تحدّد التغيّر المحدّد (زادت حشوة الزر)، وتصف الأثر البصري (الأزرار أعرض وأطول، وبعض التخطيط انزاح)، وتسأل إن كان ذلك مقصودًا. ولا ينبغي أن يخمّن إن كان التغيّر علّة — فالقرار قرارك. بل ينبغي أن يُظهر المعلومات التي تحتاجها لاتخاذ ذلك القرار.</p>
<h3 id="إغلاق-الحلقة">إغلاق الحلقة</h3>
<p>أمامك خياران:</p>
<p><strong>تراجع عن التغيّر.</strong> ألغِ تعديل الحشوة، وشغّل الاختبارات مرة أخرى. ستنجح، وتبقى خطوط الأساس هي ملفات PNG الأصلية المُودَعة. وهذا هو مسار «لا، لم يكن ذلك مقصودًا».</p>
<p><strong>حدّث خطوط الأساس.</strong> إن كانت الأزرار الأعرض هي التصميم الجديد، فشغّل <code>npm run test -- --update-snapshots</code> لإعادة توليد ملفات PNG. وأودِع خطوط الأساس الجديدة في إيداع منفصل برسالة مثل <code>update visual baselines for wider button padding</code>. وهذا هو مسار «نعم، كان ذلك مقصودًا».</p>
<p>وفي الحالتين، ينبغي أن يُظهر سجل git لديك التجربة كإيداعات منفصلة. وينبغي أن يكون التسلسل مقروءًا: «هنا تغيّرت الحشوة، وهنا التقطها الاختبار، وهنا قرّرنا ما نفعله بشأنها».</p>
<h2 id="ما-الذي-يجعل-هذا-ينجح">ما الذي يجعل هذا ينجح</h2>
<p>بوابة الانحدار البصري قيّمة تحديدًا لأنها غبيّة. فهي لا تفهم الأزرار ولا الحشوة ولا التخطيط، بل تقارن البكسلات. وهذا يعني أنها تلتقط أشياء لا يلتقطها أي قدر من اختبار الوحدات أو اختبار التكامل: تعارض في أولوية CSS يحوّل كل أزرارك إلى الأزرق، أو تغيّر في وزن الخط يجعل نص المتن عصيّ القراءة، أو تصادم في z-index يُخفي نافذة التقييم خلف الترويسة.</p>
<p>الثمن هو النتائج الإيجابية الكاذبة الناتجة عن عدم الحتمية. وأسطر الإعداد الأربعة وانضباط البذر موجودة لدفع ذلك الثمن إلى الصفر. فإن كان معدّل نتائجك الإيجابية الكاذبة صفرًا، صارت البوابة البصرية مجانية — تعمل في الخلفية، ولا تزعجك حين لا يتغيّر شيء، وتلتقط كل شيء حين يتغيّر.</p>
<p>اختبار لقطة الشاشة الفاشل هو افتتاحية محادثة. وصورة الفرق هي الرسالة. وبمجرد أن يستطيع وكيلك قراءة الفرق، تُغلق الحلقة نفسها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-visual-regression-into-the-dev-loop">تمرين: وصل الانحدار البصري بحلقة التطوير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop">الانحدار البصري كحلقة تغذية راجعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/runtime-probes-in-the-development-loop">مسابر وقت التشغيل في حلقة التطوير</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:p,html:l};export{s as book,n as chapter,e as chapterTitle,c as default,p as headings,l as html,t as slug,a as title};
