const n="kinney",s="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="lab-add-performance-budgets-to-shelf",o="مختبر: إضافة ميزانيات الأداء إلى Shelf",a=[{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"1-بناء-الإحصاءات-viteconfigts",text:"1. بناء الإحصاءات — vite.config.ts"},{depth:2,id:"2-العتبات-performance-budgetsjson",text:"2. العتبات — performance-budgets.json"},{depth:2,id:"3-سكربت-الفحص-scriptscheck-performance-budgetsmjs",text:"3. سكربت الفحص — scripts/check-performance-budgets.mjs"},{depth:2,id:"4-مواصفة-وقت-التشغيل-testsperformancespects",text:"4. مواصفة وقت التشغيل — tests/performance.spec.ts"},{depth:2,id:"5-الأوامر-المسماة-packagejson",text:"5. الأوامر المسمّاة — package.json"},{depth:2,id:"اكسره",text:"اكسره"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"استكشاف-الأخطاء",text:"استكشاف الأخطاء"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>ستضيف إلى Shelf فحصين:</p>
<ul>
<li>فحصًا يقول «حزمة العميل المشحونة لم تصبح أثقل بهدوء»</li>
<li>وفحصًا يقول «هذا المسار أو هذا التفاعل المهم لم يصبح أبطأ بهدوء»</li>
</ul>
<p>هذا يكفي لتحويل الأداء من طموح غامض إلى حلقة تغذية راجعة حقيقية.</p>
<blockquote>
<p><strong>المتطلب السابق</strong></p>
<p>أكمل <a href="https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop">ميزانيات الأداء كحلقة تغذية راجعة</a> أولًا. يفترض هذا المختبر أنك تبني عمدًا النسخة الصغيرة ذات الميزانيتين، لا منصة أداء كاملة.</p>
</blockquote>
<blockquote>
<p><strong>في البادئ الحالي</strong></p>
<p>بادئ Shelf لا يتضمّن حلقة ميزانيات الأداء. هذا المختبر هو حيث تضيف بناء الإحصاءات، وملف الميزانيات، وسكربت الفحص، ومواصفة وقت التشغيل، وأوامر <code>npm run performance:*</code>.</p>
</blockquote>
<p>ثبّت اعتماد بناء الإحصاءات أولًا:</p>
<pre><code class="language-bash">npm install -D rollup-plugin-visualizer
</code></pre>
<h2 id="المهمة">المهمة</h2>
<p>أنشئ القطع الخمس لحلقة ميزانيات الأداء في Shelf بالترتيب. وأجب عن السؤال في قسم كل قطعة قبل أن تنتقل. وحين تنتهي، كذّب عتبة واحدة وشاهد البوابة تنكسر.</p>
<h2 id="1-بناء-الإحصاءات-viteconfigts">1. بناء الإحصاءات — <code>vite.config.ts</code></h2>
<p>افتح <code>vite.config.ts</code> وأضف استيراد <code>rollup-plugin-visualizer</code>. وصله خلف علم بيئة <code>BUNDLE_STATS=1</code> ليبقى البناء العادي سريعًا وليكون بناء الإحصاءات اختياريًا.</p>
<p>وحين يُضبط العلم، يُخرج Vite ملفين:</p>
<ul>
<li><code>build/stats.html</code> — تقرير خريطة شجرية للبشر</li>
<li><code>build/stats.json</code> — قالب <code>raw-data</code>، مُهيَّأ للأتمتة</li>
</ul>
<p><strong>سؤال:</strong> لماذا خلف علم بيئة بدلًا من أن يكون دائم التشغيل؟ (الجواب: توليد الإحصاءات يضيف وقتًا معتبرًا إلى البناء، وأنت تحتاجها فقط حين تكون على وشك تشغيل فحص الميزانيات.)</p>
<h2 id="2-العتبات-performance-budgetsjson">2. العتبات — <code>performance-budgets.json</code></h2>
<p>أنشئ <code>performance-budgets.json</code>. إنه ثمانية أسطر:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;maxTotalGzipKilobytes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">110</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;maxLargestChunkGzipKilobytes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">55</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;shelfRouteDomContentLoadedMilliseconds&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">800</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا كل شيء. رقمان للبناء، ورقم واحد لوقت التشغيل، بلا مخطط، وبلا أدوات. والأرقام هي خط الأساس زائد هامش — فالبناء الحالي نحو 105 kB في المجموع، و110 يمنح هامشًا كافيًا لعمل ميزات صغير دون أن يسمح بانزلاق تراجع بنسبة 20%.</p>
<p><strong>سؤال:</strong> لماذا تكون العتبات في ملف JSON بدلًا من أن تُثبَّت في سكربت الفحص؟ (الجواب: الملف هو العقد. ورفع عتبة إيداع مرئي، ومعنى ذلك أن رفع عتبة محادثة.)</p>
<h2 id="3-سكربت-الفحص-scriptscheck-performance-budgetsmjs">3. سكربت الفحص — <code>scripts/check-performance-budgets.mjs</code></h2>
<p>أنشئ <code>scripts/check-performance-budgets.mjs</code>. إنه نحو 88 سطرًا. تنقّل في الأقسام الأربعة:</p>
<ul>
<li><strong>الأسطر 12–16: الثوابت.</strong> الثابت <code>CLIENT_BUNDLE_PREFIX = '_app/immutable'</code> هو المرشح الخاص بـSvelteKit — وهو ما يجعل الميزانية «حزمة العميل فقط» لا «كل ما يُخرجه Vite».</li>
<li><strong>الأسطر 18–43: <code>computeClientBundleSizes</code>.</strong> هذا هو الدرس كله. تنقّل في <code>nodeMetas → moduleParts → nodeParts</code> لتجمع بايتات gzip لكل ملف ناتج، ثم رشّح إلى قطع العميل، ثم أرجع <code>totalClientGzipBytes</code> و<code>largestClientChunkBytes</code> و<code>clientEntries</code>.</li>
<li><strong>الأسطر 45–83: <code>main</code>.</strong> اقرأ الملفين، واحسب الأحجام، وقارنها بالميزانيات، وادفع نصًا مقروءًا للبشر إلى <code>failures</code> عند كل عتبة متجاوَزة. عند الفشل: اطبع إلى stderr واخرج بالرمز 1. وعند النجاح: اطبع الأرقام الحالية مع ميزانياتها واخرج بالرمز 0.</li>
<li><strong>الأسطر 85–88: معالج الأخطاء في المستوى الأعلى.</strong> يخرج بالرمز 2 عند أي خطأ مُلقى ليستطيع الوكيل التمييز بين «تجاوز الميزانية» و«انكسر السكربت».</li>
</ul>
<p>ويتنقّل الدرس في بنية <code>nodeMetas</code> في قسم <strong>سكربت الفحص</strong> من <a href="https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop">ميزانيات الأداء كحلقة تغذية راجعة</a> إن أردت شرح شكل البيانات قبل أن تفتح السكربت.</p>
<p><strong>سؤال:</strong> لماذا يعيد السكربت <code>clientEntries</code> من <code>computeClientBundleSizes</code> رغم أن <code>main</code> لا يستخدمها؟ (الجواب: قواعد مستقبلية مثل «أي قطعة كبرت أكثر خلال الأسبوع» تستطيع قراءتها دون إعادة التنقل في التقرير. فالدالة مكتوبة للميزة التالية، لا لهذه وحدها.)</p>
<h2 id="4-مواصفة-وقت-التشغيل-testsperformancespects">4. مواصفة وقت التشغيل — <code>tests/performance.spec.ts</code></h2>
<p>أنشئ <code>tests/performance.spec.ts</code>. تنتقل إلى <code>/shelf</code>، وتقرأ <code>performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd</code> داخل سياق المتصفح، وتحمّل العتبة من <code>performance-budgets.json</code>، وتتحقق من أن القيمة المقيسة أقل منها.</p>
<p>وهناك أمران يستحقان الملاحظة:</p>
<ul>
<li>العتبة تُقرأ من القرص، لا تُثبَّت في الشيفرة. وهو العقد نفسه الخاص بميزانية البناء — فرفعها إيداع مرئي.</li>
<li>إن كنت قد أكملت مختبر حالة التخزين بالفعل، فشغّل المواصفة داخل مشروع Playwright الموثَّق ذاك حتى تقيس تدفّق البناء والمعاينة الحقيقي. وإن كانت نسخة Shelf الحالية لديك لا تزال تحمل البادئ العام الأدنى فقط، فأضف المشروع الموثَّق أولًا أو وجّه فحص وقت التشغيل إلى مسار عام إلى أن توجد حلقة المصادقة.</li>
</ul>
<p><strong>سؤال:</strong> لماذا نقيس <code>domContentLoadedEventEnd</code> بدلًا من شيء مثل <code>largestContentfulPaint</code>؟ (الجواب: <code>domContentLoaded</code> أرخص في التثبيت لأنه لا يعتمد على فك ترميز الصور ولا على تحميل الخطوط. فالميزانية تريد رقمًا لا يتحرّك إلا حين تتغيّر <em>شيفرتك</em> أنت، لا حين يتعثّر خط أنابيب الأصول.)</p>
<h2 id="5-الأوامر-المسماة-packagejson">5. الأوامر المسمّاة — <code>package.json</code></h2>
<p>افتح <code>package.json</code> وأضف سكربتات الأداء الأربعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build:stats&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BUNDLE_STATS=1 vite build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build:stats &amp;&amp; node scripts/check-performance-budgets.mjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test tests/performance.spec.ts --project=authenticated&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run performance:build &amp;&amp; npm run performance:runtime&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الأشكال تهمّ: <code>performance:check</code> هو الأمر الوحيد الذي يستدعيه الوكيل للحصول على الجواب الكامل. وكل ما دونه قطعة يستطيع الوكيل إعادة تشغيلها بمعزل حين يكون أحد النصفين هو ما انكسر.</p>
<p><strong>سؤال:</strong> لماذا <em>لا</em> يستدعي <code>performance:runtime</code> الأمر <code>drizzle-kit push --force</code> أولًا؟ (الجواب: في هذه المرحلة يفترض أن يكون المشروع الموثَّق وأدوات الزرع المساعدة مالكةً لإعداد التطبيق بالفعل. فأمر الأداء يجب أن يقيس التطبيق، لا أن يخفي تهيئة البنية التحتية داخل مقدمة سكربت مثقلة بالآثار الجانبية.)</p>
<h2 id="اكسره">اكسره</h2>
<p>الآن وقد قرأت القطع الخمس، أثبت أنك تفهم كيف تتفاعل.</p>
<ol>
<li>افتح <code>performance-budgets.json</code>. اخفض <code>maxTotalGzipKilobytes</code> من <code>110</code> إلى <code>50</code>.</li>
<li>شغّل <code>npm run performance:build</code>.</li>
<li>اقرأ مخرجات الفشل. يجب أن تسمّي الميزانية الفاشلة والحجم المقيس فعلًا.</li>
<li>أعد العتبة. أعد التشغيل. شاهده يعود أخضر.</li>
</ol>
<p>إن لم يبدُ الفشل كما توقّعت، فعُد إلى القسم 3 من <code>scripts/check-performance-budgets.mjs</code> وأعد قراءة <code>main</code> — فسلسلة <code>failures.push(...)</code> هي ما رأيته للتو، كلمة بكلمة.</p>
<h2 id="معايير-القبول">معايير القبول</h2>
<p>تنتهي حين تستطيع الإجابة عن كل سؤال من هذه دون أن تنظر:</p>
<ul>
<li>لماذا بناء الإحصاءات محكوم بعلم <code>BUNDLE_STATS=1</code>؟</li>
<li>لماذا تعيش العتبات في ملف JSON بدلًا من السكربت؟</li>
<li>ما الذي يرشّحه <code>CLIENT_BUNDLE_PREFIX</code>، ولماذا؟</li>
<li>ما الفرق بين الخروج بالرمز 1 والخروج بالرمز 2 في <code>check-performance-budgets.mjs</code>؟</li>
<li>لماذا تعمل مواصفة وقت التشغيل تحت مشروع <code>authenticated</code> تحديدًا؟</li>
<li>لماذا يبقى <code>performance:runtime</code> مركّزًا على تشغيل الاختبار بدلًا من تهريب أوامر إعداد إلى السكربت؟</li>
<li>خفضت <code>maxTotalGzipKilobytes</code> إلى <code>50</code>، وشغّلت <code>npm run performance:build</code>، ورأيته يفشل، ثم أعدت العتبة. (فحص ميكانيكي للقراءة.)</li>
</ul>
<h2 id="استكشاف-الأخطاء">استكشاف الأخطاء</h2>
<ul>
<li>إن كان رقم وقت التشغيل يقفز هنا وهناك بعشوائية، فتوقّف عن القياس على خادم التطوير وانتقل إلى البناء مع المعاينة.</li>
<li>إن كانت إحصاءات البناء عسيرة التحليل، فبسّط شكل التقرير قبل أن تضيف ميزانيات أكثر.</li>
<li>إن فشلت الميزانية بعد إضافة ميزة مشروعة، فافحص الإحصاءات أولًا. أحيانًا يكون الإصلاح واضحًا. وأحيانًا يكون الجواب الصحيح تحديثَ ميزانية متعمَّدًا مع شرح.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>تتبّع تدفّقًا ثانيًا في وقت التشغيل، لكن فقط بعد أن يستقر الأول.</li>
<li>ارفع تقرير إحصاءات البناء وأثر وقت التشغيل كآثار CI حين يفشل الفحص.</li>
<li>أضف ملخّصًا لسير العمل يطبع الأرقام قبل وبعد لمراجعة أسرع.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>لا يصبح الأداء جزءًا من الحلقة إلا حين يوجد رقم يستطيع الوكيل كسره. اختر الرقم، وخزّنه في المستودع، واجعل الأمر رخيصًا بما يكفي ليشغّله الوكيل فعلًا.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/add-performance-budgets-to-shelf-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop">ميزانيات الأداء كحلقة تغذية راجعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/runtime-tools-compared">أدوات وقت التشغيل مقارنةً</a></li>
</ul>
`,p={book:n,chapter:s,chapterTitle:e,slug:t,title:o,headings:a,html:c};export{n as book,s as chapter,e as chapterTitle,p as default,a as headings,c as html,t as slug,o as title};
