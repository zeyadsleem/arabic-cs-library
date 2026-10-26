const e="kinney",s="self-testing-ai-agents",t="وكلاء ذكاء اصطناعي يختبرون أنفسهم",o="lab-build-a-failure-dossier-for-shelf",d="مختبر: بناء ملفّ فشل لـShelf",i=[{depth:2,id:"1-التهيئة-playwrightconfigts",text:"1. التهيئة — playwright.config.ts"},{depth:2,id:"2-ممررات-الطرفية-testsfixturests",text:"2. مُمرِّرات الطرفية — tests/fixtures.ts"},{depth:2,id:"3-سكربت-ملف-الفشل-scriptssummarize-failure-dossierts",text:"3. سكربت ملفّ الفشل — scripts/summarize-failure-dossier.ts"},{depth:2,id:"4-الأمر-المسمى-packagejson",text:"4. الأمر المسمّى — package.json"},{depth:2,id:"5-claudemd-تعليمات-إعادة-الإنتاج",text:"5. CLAUDE.md — تعليمات إعادة الإنتاج"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"اختبار-الحلقة-من-طرف-إلى-طرف",text:"اختبار الحلقة من طرف إلى طرف"},{depth:3,id:"معايير-القبول-من-طرف-إلى-طرف",text:"معايير القبول من طرف إلى طرف"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],r=`<p>مختبر قصير. أضف بنية ملفّ الفشل إلى Shelf من جديد، وافهم لماذا كل قطعة موجودة، ثم اكسر اختبارًا وراقب الحلقة تُغلَق.</p>
<p>حين تُوصَّل البنية، يكتب Shelf الآثار تحت <code>playwright-report/test-results/</code>، وتقرير HTML إلى <code>playwright-report/html/</code>، وتقرير JSON إلى <code>playwright-report/report.json</code>، والملخّص بصيغة ماركداون إلى <code>playwright-report/dossier.md</code>. وأبسط طريقة مضبوطة لإجبار فشل على مجموعة الاختبارات الدنيا الحالية هي تغيير تحقّق واحد في <code>tests/smoke.spec.ts</code>، ثم تشغيل <code>npm run test</code>، ومشاهدة مواصفة الدخان تحمرّ، ثم تشغيل <code>npm run dossier</code>، وقراءة الماركداون المولّد، ثم الرجوع وإعادة التشغيل حتى يخضرّ.</p>
<blockquote>
<p><strong>في النسخة الانطلاقية الحالية</strong></p>
<p>لا تتضمّن نسخة Shelf الانطلاقية طبقة ملفّ الفشل. هذا المختبر هو مكان إضافة إعدادات أثر Playwright، وغلاف التجهيزة الذي يمرّر الطرفية، وسكربت ملفّ الفشل، وأمر <code>npm run dossier</code>، وملاحظة <code>CLAUDE.md</code> المطابقة.</p>
</blockquote>
<h2 id="1-التهيئة-playwrightconfigts">1. التهيئة — <code>playwright.config.ts</code></h2>
<p>افتح <code>playwright.config.ts</code>. واعثر على مفاتيح <code>outputDir</code> و<code>use</code> و<code>reporter</code>. تبدو هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-attr">outputDir</span>: <span class="hljs-string">&#x27;playwright-report/test-results&#x27;</span>,
<span class="hljs-attr">use</span>: {
  <span class="hljs-attr">trace</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
  <span class="hljs-attr">screenshot</span>: <span class="hljs-string">&#x27;only-on-failure&#x27;</span>,
  <span class="hljs-attr">video</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
},
<span class="hljs-attr">reporter</span>: [
  [<span class="hljs-string">&#x27;html&#x27;</span>, { <span class="hljs-attr">open</span>: <span class="hljs-string">&#x27;never&#x27;</span>, <span class="hljs-attr">outputFolder</span>: <span class="hljs-string">&#x27;playwright-report/html&#x27;</span> }],
  [<span class="hljs-string">&#x27;json&#x27;</span>, { <span class="hljs-attr">outputFile</span>: <span class="hljs-string">&#x27;playwright-report/report.json&#x27;</span> }],
  [<span class="hljs-string">&#x27;list&#x27;</span>],
],
</code></pre>
<p>مُبلِّغ JSON هو الحامل للثقل — فسكربت ملفّ الفشل يقرأه. ومُبلِّغ HTML هو ما ينظر إليه البشر. ومُبلِّغ list هو ما يتدفّق إلى الطرفية أثناء تشغيل المجموعة.</p>
<p><strong>سؤال:</strong> لماذا <code>retain-on-failure</code> بدلًا من <code>on</code>؟ (الجواب: <code>on</code> يحتفظ بالتتبّعات ولقطات الشاشة والفيديوهات لكل اختبار، ناجحًا كان أو فاشلًا. وعلى مجموعة من 38 اختبارًا، يضيف ذلك مئات الميغابايتات من الآثار لتشغيلات لا تحتاجها. أما <code>retain-on-failure</code> فيُبقي الحلقة رخيصة حين تكون خضراء، وكريمة حين تكون حمراء.)</p>
<h2 id="2-ممررات-الطرفية-testsfixturests">2. مُمرِّرات الطرفية — <code>tests/fixtures.ts</code></h2>
<p>أنشئ <code>tests/fixtures.ts</code>. تجهيزة <code>page</code> الموسّعة تشترك في <code>page.on('console', ...)</code> و<code>page.on('requestfailed', ...)</code>، وتمرّر الأخطاء إلى stderr في عملية Node مع بادئة <code>[browser error]</code> أو <code>[network error]</code>.</p>
<p>لاحظ المرشّح الخاص بـ<code>ERR_ABORTED</code>. فذلك الرمز يُطلق كلما انتقل Playwright بعيدًا عن صفحة في منتصف طلب، وهذا يحدث باستمرار في مجموعة اختبارات. وبدون المرشّح تصبح الطرفية غير مقروءة.</p>
<p><strong>سؤال:</strong> لماذا التمرير إلى stderr بدلًا من التجميع في مصفوفة وتفريغها في النهاية؟ (الجواب: التدفّق إلى stderr يعني أن الخطأ يستقرّ في تقرير Playwright تحت الاختبار الذي جاء منه، ويلتقطه مُبلِّغ list في الزمن الحقيقي. أما التفريغ في نهاية التشغيل فيُفقد الصلة بين الخطأ والاختبار الذي سبّبه.)</p>
<h2 id="3-سكربت-ملف-الفشل-scriptssummarize-failure-dossierts">3. سكربت ملفّ الفشل — <code>scripts/summarize-failure-dossier.ts</code></h2>
<p>أنشئ <code>scripts/summarize-failure-dossier.ts</code>. نحو 200 سطر في النسخة المكتملة. امشِ على الأقسام الستة:</p>
<ul>
<li><strong>الأسطر 16–64: تصريحات الأنواع.</strong> <code>PlaywrightReport → PlaywrightSuite → PlaywrightSpec → PlaywrightTest → PlaywrightResult → PlaywrightAttachment</code>. هذه تحاكي الشكل الذي يصدره مُبلِّغ JSON في Playwright. وهي موجودة كأنواع صريحة بدلًا من <code>any</code> كي يبقى المشي عبر <code>suites → specs → tests → results</code> صادقًا حين تنحرف مخططات التقرير.</li>
<li><strong>الأسطر 66–76: <code>collectSpecs</code> و<code>pickAttachment</code>.</strong> تسطيح عودي لشجرة المجموعات المتداخلة، إضافةً إلى منتقي مرفقات عام. كلاهما مساعدان صغيران يحتاجهما المشي.</li>
<li><strong>الأسطر 78–97: <code>pickFailureScreenshot</code>.</strong> هذا هو الجزء الواعي بالانحدار البصري. فحين يفشل تحقّق <code>toHaveScreenshot</code>، يحتفظ Playwright بثلاث صور: <code>expected</code> (الأساس)، و<code>actual</code> (التصيير الجديد)، و<code>diff</code> (فرق البكسلات). والسكربت المشحون يفضّل <code>diff</code>، ثم <code>actual</code>، ثم أي مرفق صورة. أما رسم الدرس في <a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفات الفشل</a> فيغفل هذا — فالمراجع يريد الفرق دائمًا، لا الأساس، وشحن النسخة الأبسط يقود إلى ملفّ فشل يربط الصورة الخطأ في حالات الفشل البصري.</li>
<li><strong>الأسطر 99–137: <code>buildFailureList</code>.</strong> المشي. كرّر على كل مواصفة، وكل اختبار داخلها، وكل نتيجة داخل ذلك. وتجاوز كل ما ليس <code>failed</code> أو <code>timedOut</code>. ولكل فشل، اسحب رسالة الخطأ بثلاث درجات من الاحتياط (<code>result.error?.message ?? result.errors?.[0]?.message ?? 'Unknown error'</code>)، ومسار لقطة الشاشة، ومسار التتبّع، ومسار الفيديو.</li>
<li><strong>الأسطر 139–178: <code>renderDossier</code>.</strong> تصيير الماركداون. والسطر الحاسم هو <code>reproduceCommand</code>: في مستودع له مشاريع Playwright مسمّاة ينبغي أن يُصيَّر شيء مثل <code>npx playwright test --project=\${failure.projectName} \${failure.file} -g \${JSON.stringify(failure.title)}</code>. وفي النسخة الانطلاقية الدنيا، حيث قد تكون ما زلت تستخدم مشروعًا واحدًا بلا اسم، تبقى القطع المهمة نفسها: الملف مع العنوان المبحوث عنه، وعلم المشروع فقط حين يوجد. وبدون تلك القطع، يعيد أمر «إعادة الإنتاج» تشغيل قدر كبير جدًا من المجموعة.</li>
<li><strong>الأسطر 180–200: <code>main</code>.</strong> اقرأ التقرير، وابنِ القائمة، وتأكّد من وجود مجلد المخرجات، واكتب الماركداون، واطبع ملخّصًا إلى stderr. والملخّص يذهب إلى stderr (لا stdout) كي يستطيع سكربت مستدعٍ توجيه الماركداون إلى مكان ما دون خلط أسطر السجل.</li>
</ul>
<p><strong>سؤال:</strong> لماذا يُبقي <code>buildFailureList</code> القيمة <code>'timedOut'</code> في مجموعة الحالات الفاشلة؟ (الجواب: المهلة فشل، والمهلة تترك خلفها الآثار نفسها التي يتركها الفشل العادي. وإغفالها يعني أن ملفّ الفشل يُسقط المهل بصمت، وهذا أسوأ أنواع الثغرات — «الاختبارات نجحت» بينما هي في الحقيقة علقت.)</p>
<h2 id="4-الأمر-المسمى-packagejson">4. الأمر المسمّى — <code>package.json</code></h2>
<p>افتح <code>package.json</code> وأضف <code>&quot;dossier&quot;: &quot;tsx scripts/summarize-failure-dossier.ts&quot;</code>. لاحظ أنه لا سلسلة <code>&amp;&amp;</code> — فسكربت ملفّ الفشل يعمل عند الطلب، لا بعد كل تشغيل اختبارات. وهذا مقصود: معظم تشغيلات الاختبارات خضراء، وكتابة ملفّ فشل فارغ كل مرة تضيف ضجيجًا بلا إشارة. والوكيل يستدعي <code>npm run dossier</code> فقط حين يحتاج النظر إلى فشل.</p>
<h2 id="5-claudemd-تعليمات-إعادة-الإنتاج">5. CLAUDE.md — تعليمات إعادة الإنتاج</h2>
<p>افتح <code>CLAUDE.md</code>. اعثر على قسم «When a test fails». إنه يسمّي <code>npm run dossier</code> ويشير إلى <code>playwright-report/dossier.md</code>. هذا هو المدخل كله — ثلاثة أسطر من الماركداون، لكنها حاملة للثقل. فبدونها، سينظر الوكيل إلى اختبار فاشل ويمرّر مخرجات الطرفية بدلًا من قراءة الملف المنظّم.</p>
<p><img src="/arabic-cs-library/images/kinney/da9e47276d7154c2.webp" alt="تقرير Playwright بصيغة HTML مستخدمًا كباب أمامي لملفّ الفشل"></p>
<h2 id="معايير-القبول">معايير القبول</h2>
<p>تكون قد انتهيت حين تستطيع الإجابة عن كل من هذه دون أن تنظر:</p>
<ul>
<li>لماذا تستخدم التهيئة <code>retain-on-failure</code> بدلًا من <code>on</code>؟</li>
<li>لماذا يرشّح مُمرِّر الطرفية <code>ERR_ABORTED</code>؟</li>
<li>لماذا يمرّر المُمرِّر إلى stderr بدلًا من التفريغ في النهاية؟</li>
<li>لماذا يفضّل <code>pickFailureScreenshot</code> قيمة <code>diff</code> على <code>actual</code> على أي صورة؟</li>
<li>لماذا يعامل <code>buildFailureList</code> القيمة <code>'timedOut'</code> معاملة <code>'failed'</code>؟</li>
<li>ما القطع الثلاث التي يصلها <code>reproduceCommand</code> في سلسلة، ولماذا الثلاث جميعًا؟</li>
<li>لماذا <code>npm run dossier</code> أمر عند الطلب بدلًا من شيء يُسلسَل بعد <code>npm run test</code>؟</li>
</ul>
<p>وفحص ميكانيكي واحد:</p>
<ul>
<li>كسرت اختبارًا، وشغّلت المجموعة، وشغّلت <code>npm run dossier</code>، وفتحت <code>playwright-report/dossier.md</code> لترى الفشل مدرجًا مع رابط لقطة شاشة وأمر إعادة إنتاج. ثم رجعت وأعدت التشغيل حتى اخضرّ.</li>
</ul>
<h2 id="اختبار-الحلقة-من-طرف-إلى-طرف">اختبار الحلقة من طرف إلى طرف</h2>
<p>الآن الجزء الصعب. تحقّق أن الحلقة تعمل فعلًا بأن تعطي الوكيل اختبارًا فاشلًا ولا شيء غيره.</p>
<ol>
<li>أدخل خللًا خفيًّا في Shelf تلتقطه مواصفة الدخان الحالية. مثال: افتح <code>src/routes/+page.svelte</code> وغيّر حفنة أحرف في عنوان <code>PageHeader</code> (قل من <code>Build a shelf that remembers what you actually read</code> إلى <code>Build a shelf that remembers every book you open</code>) حتى تحمرّ <code>tests/smoke.spec.ts</code> عند تحقّق <code>getByRole('heading', { name: /Build a shelf that remembers what you actually read/i })</code>.</li>
<li>شغّل <code>npx playwright test tests/smoke.spec.ts</code>. ينبغي أن يفشل لأن نص العنوان لم يعد يطابق التعبير النمطي.</li>
<li>شغّل <code>npm run dossier</code>. وافتح <code>playwright-report/dossier.md</code> لتتأكّد من التقاط الفشل.</li>
<li>افتح Claude Code. وقل: <em>«اقرأ <code>playwright-report/dossier.md</code>. شخّص الفشل. اقترح إصلاحًا. طبّقه.»</em></li>
<li>لا تعطِ الوكيل أي سياق آخر. لا تذكر أي سطر عدّلت. دعه يكتشفه من ملفّ الفشل ومن الشيفرة.</li>
</ol>
<h3 id="معايير-القبول-من-طرف-إلى-طرف">معايير القبول من طرف إلى طرف</h3>
<ul>
<li>يقرأ الوكيل ملفّ الفشل دون أن يُطلب منه النظر إلى مكان آخر.</li>
<li>يعيد الوكيل إنتاج الفشل محليًا باستخدام أمر إعادة الإنتاج من ملفّ الفشل.</li>
<li>يحدّد الوكيل العنوان غير المطابق في الصفحة الرئيسية (أو أي مواصفة كسرتها).</li>
<li>يطبّق الوكيل الإصلاح ويعيد تشغيل الاختبار.</li>
<li>ينجح الاختبار.</li>
<li>لم تحتج إلى تقديم سياق إضافي أثناء المحادثة.</li>
</ul>
<p>وإن علق الوكيل، فملفّ الفشل كان ينقصه شيء. اكتشف ما كان ينقصه وأضفه. الثغرات الشائعة: سياق غير كافٍ في رسالة الخطأ، ولقطة شاشة لا تُظهر حالة الواجهة ذات الصلة، وأمر إعادة إنتاج لا يعزل الفشل، وسجلات طرفية غير مضمّنة. كرّر حتى يستطيع الوكيل تصحيح خلل مزروع دون مساعدتك.</p>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>وسّع ملفّ الفشل ليتضمّن أول 20 سطرًا من سجل أفعال التتبّع لكل فشل (يمكن تحليل JSON التتبّع في Playwright لاستخراج ذلك).</li>
<li>أضف قسم «تاريخ git الحديث» إلى ملفّ الفشل — آخر 5 إيداعات وملخّصاتها — كي يكون لدى الوكيل سياق لما تغيّر حديثًا.</li>
<li>اكتب صيغة ملفّ فشل ثانية، <code>dossier.json</code>، كي تستطيع الأدوات استهلاكه برمجيًا.</li>
<li>أضف ملخّص ملفّ الفشل إلى سكربت Playwright كي يعمل دائمًا بعد تشغيل اختبارات فاشل. وفي النسخة الانطلاقية الحالية قد يكون ذلك <code>&quot;test&quot;: &quot;playwright test || (npm run dossier &amp;&amp; exit 1)&quot;</code>.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>في اللحظة التي تستطيع فيها تسليم الوكيل ملفًا واحدًا وقول «شخّص هذا»، تكون قد أتمتت النصف الأول من تصحيح الأخطاء. وكل ما بعد ذلك تكرار، والتكرار هو ما يتفوّق فيه الوكلاء. ملفّ الفشل هو الجسر بين «فشل اختبار» و«يستطيع الوكيل إصلاحه بلا إشراف».</p>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/build-a-failure-dossier-for-shelf-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-second-opinion">الرأي الثاني</a></li>
</ul>
`,n={book:e,chapter:s,chapterTitle:t,slug:o,title:d,headings:i,html:r};export{e as book,s as chapter,t as chapterTitle,n as default,i as headings,r as html,o as slug,d as title};
