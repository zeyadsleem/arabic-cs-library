const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="nightly-verification-loops",l="حلقات التحقق الليلية",e=[{depth:2,id:"ما-الذي-ينتمي-إلى-الليل",text:"ما الذي ينتمي إلى الليل"},{depth:2,id:"اجعل-الجدولة-تعمل-لصالحك-لا-ضدك",text:"اجعل الجدولة تعمل لصالحك، لا ضدك"},{depth:2,id:"أقل-سير-عمل-ليلي",text:"أقل سير عمل ليلي"},{depth:2,id:"ينبغي-أن-تهبط-إخفاقات-الليل-كأي-إخفاق-آخر",text:"ينبغي أن تهبط إخفاقات الليل كأي إخفاق آخر"},{depth:2,id:"لا-تحدث-الأسس-البصرية-تلقائيا-وفق-جدولة",text:"لا تحدّث الأسس البصرية تلقائيًا وفق جدولة"},{depth:2,id:"التسليم-عائدا-إلى-الحلقة-اليومية",text:"التسليم عائدًا إلى الحلقة اليومية"},{depth:2,id:"كيف-تعرف-أن-الليل-يؤدي-وزنه",text:"كيف تعرف أن الليل يؤدي وزنه"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],p=`<p>بعض الفحوص قيّمة بما يكفي لتبقى، ومزعجة بما يكفي بحيث لا تريدها على كل طلب سحب. ذلك هو سبب وجود سير العمل الليلي كله.</p>
<p>الحيلة أن تستخدمها للمهام الصحيحة. إن رميت كل ما كنت كسولًا عن تنظيمه في مهمة cron وسمّيته «ليليًا»، فلم تبنِ حلقة. بنيت درجًا للخردة بطابع زمني.</p>
<p>النسخة الجيدة تستخدم التشغيلات المجدولة لفحوص تكون:</p>
<ul>
<li>واسعة</li>
<li>بطيئة</li>
<li>حساسة للانحراف</li>
<li>ما زالت تستحق المعرفة قبل المستخدمين</li>
</ul>
<p>و<a href="https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule">حدث <code>schedule</code> في GitHub Actions</a> يكفي لتشغيل تلك الحلقة جيدًا.</p>
<blockquote>
<p><strong>المتطلبات المسبقة</strong></p>
<p>يفترض هذا الملحق أن سير عمل CI الأساسي موجود، وأن المجموعة الفرعية للاختبارات السريعة عبر المتصفحات محدّدة بالفعل. العمل الليلي هو حيث تعيش الفحوص الأبطأ والأوسع بعد أن تكون الحلقة السريعة سليمة.</p>
</blockquote>
<h2 id="ما-الذي-ينتمي-إلى-الليل">ما الذي ينتمي إلى الليل</h2>
<p>هذه مرشّحات ليلية ممتازة:</p>
<ul>
<li>الاختبارات السريعة عبر المتصفحات أو تغطية أوسع لعدة متصفحات</li>
<li>تدقيق الاعتماديات أو فحوص الحزم القديمة</li>
<li>تحديث ملفات HAR أو فحوص انحراف العقود مع المصادر الأعلى</li>
<li>فحوص الأداء الأطول تشغيلًا</li>
<li>مهام سلامة البيانات أو المحتوى المكلفة أكثر من أن تُشغَّل مع كل دفعة</li>
</ul>
<p>وهذه مرشّحات ليلية سيئة:</p>
<ul>
<li>التنسيق</li>
<li>الفحص (lint)</li>
<li>مجموعة اختبارات الوحدة الافتراضية</li>
<li>أي شيء تحتاجه فعلًا قبل الدمج</li>
</ul>
<p>الليل ليس بديلًا عن الحلقة الرئيسية. إنه حيث تضع القضبان المكلفة التي ما زالت تشتري لك إشارة.</p>
<h2 id="اجعل-الجدولة-تعمل-لصالحك-لا-ضدك">اجعل الجدولة تعمل لصالحك، لا ضدك</h2>
<p>بضعة قواعد جدولة أهم مما يظن الناس:</p>
<ul>
<li>جدولة cron في GitHub Actions تستخدم UTC</li>
<li>يمكن أن يتأخر سير العمل المجدول، خصوصًا في بداية الساعة</li>
<li>يجب أن يعيش تعريف سير العمل على الفرع الافتراضي</li>
</ul>
<p>هذا يعني أن «شغّله عند الدقيقة 00 من الساعة» أسوأ افتراضي كسول. اختر دقيقة غير مستديرة مثل <code>17</code> أو <code>43</code> حتى لا يتنافس سير عملك مع كل مستودع آخر على وجه الأرض على الفتحة نفسها.</p>
<h2 id="أقل-سير-عمل-ليلي">أقل سير عمل ليلي</h2>
<p>هذا أصغر سير عمل ليلي ما زال يعلّم الشكل. مهمتان: واحدة حقيقية (<code>dependency-audit</code>، لأن <code>npm audit</code> متاح دائمًا) وواحدة بديلة صريحة (<code>har-refresh</code>) تُعيد صدى الخطوة التالية المقصودة حتى توجد المهمة في واجهة GitHub قبل أن تصل الأتمتة.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/nightly.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Nightly</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">schedule:</span>
    <span class="hljs-comment"># Off the top of the hour to avoid the GitHub Actions stampede.</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">cron:</span> <span class="hljs-string">&#x27;17 4 * * *&#x27;</span>
  <span class="hljs-attr">workflow_dispatch:</span>

<span class="hljs-attr">permissions:</span>
  <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">dependency-audit:</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">Dependency</span> <span class="hljs-string">audit</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v6</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;24&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">npm</span> <span class="hljs-string">audit</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">audit</span> <span class="hljs-string">--audit-level=high</span>

  <span class="hljs-attr">har-refresh:</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">Refresh</span> <span class="hljs-string">HAR</span> <span class="hljs-string">fixtures</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v6</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Placeholder</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">|
          echo &quot;Placeholder: re-record the HAR fixtures the network-isolation lab will add (e.g. tests/fixtures/*.har) against the real Open Library API&quot;
          echo &quot;  and open a pull request with the diff so a human can review upstream drift.&quot;
</span></code></pre>
<p>بضعة أمور تستحق الملاحظة:</p>
<ul>
<li><strong><code>workflow_dispatch</code></strong> موضوع بجانب <code>schedule</code> عن قصد. يمنحك زر «Run workflow» في واجهة GitHub Actions حتى تستطيع إطلاق تشغيل ليلي عند الطلب دون تحرير cron.</li>
<li><strong>المهام البديلة أفضل من المهام المفقودة.</strong> خطوة <code>echo</code> تصف الخطوة التالية المقصودة تُبقي اسم المهمة ظاهرًا في الواجهة، وتجعل النية قابلة للاكتشاف في <code>git log</code>، وتفشل بصوت عالٍ إن حذف أحدهم ملف YAML المحيط بها بالخطأ. أما مفتاح <code>jobs:</code> الفارغ فلا يعطيك شيئًا تلاحظه.</li>
<li><strong>أبقِ كل مهمة على أمر واحد مسمّى.</strong> حتى حين يكون ذلك الأمر مجرّد <code>echo</code>، يطابق الشكل ما ستبدو عليه المهام الحقيقية. وحين تصل أتمتة <code>har-refresh</code>، تستبدل خطوة <code>echo</code> بـ <code>npm run har:refresh</code> أو ما يعادله دون إعادة هيكلة سير العمل.</li>
</ul>
<p>وسّع هذه الهيكلة حين تدخل المهام الحقيقية: مهمة <code>cross-browser-smoke</code> تشغّل المجموعة الفرعية للاختبارات السريعة عبر المتصفحات من الملحق السابق، ومهمة <code>performance-audit</code> تشغّل فحص Lighthouse أو الحزمة الأوسع، ومهمة <code>data-integrity</code> إن كان لديك محتوى مبذور يمكن أن ينحرف.</p>
<p>حين تضيف مهمة <code>cross-browser-smoke</code> في <code>nightly.yml</code>، يمكنك تنفيذ الفصل باستخدام <strong>الترشيح القائم على المشاريع</strong> بدلًا من نمط الوسم <code>@cross-browser</code> المعروض سابقًا — مثلًا مشروعا Playwright باسم <code>firefox-smoke</code> و<code>webkit-smoke</code> مع <code>testMatch: /smoke\\.spec\\.ts/</code>. الترشيح القائم على المشاريع والقائم على الوسوم متكافئان في هذه الحالة: اختر المشاريع حين يكون الفصل بحسب الملف، واختر الوسوم حين يكون الفصل بحسب اختبار فردي داخل ملف مختلط في الأصل. ودرس التحقق عبر المتصفحات يمشي في النمطين.</p>
<h2 id="ينبغي-أن-تهبط-إخفاقات-الليل-كأي-إخفاق-آخر">ينبغي أن تهبط إخفاقات الليل كأي إخفاق آخر</h2>
<p>معالجة الإخفاق ينبغي أن تبدو مألوفة الآن:</p>
<ul>
<li>ارفع المخرجات</li>
<li>اكتب ملخصًا قصيرًا لسير العمل</li>
<li>أعطِ الوكيل أو الإنسان مسار إعادة إنتاج نظيفًا</li>
</ul>
<p>إن تفرّع التشغيل الليلي على مهام متصفحات أو تقسيمات متعددة، فاستخدم تقارير blob كمخرج وسيط وادمجها قبل نشر تقرير HTML النهائي. ذلك أنظف طريق للإبقاء على تقرير واحد مقروء بدلًا من تناثر أنصاف تقارير لا يفتحها أحد.</p>
<p>إن كان التشغيل واسعًا فعلًا، فشغّل <code>fullyParallel: true</code> حتى تقسّم Playwright على مستوى الاختبار بدلًا من مستوى الملف. وأرفق <code>metadata</code> لكل مشروع — مثلًا <code>metadata: { lane: 'nightly-firefox' }</code> على مشروع Firefox — إن كنت تحتاج إلى أن يحفظ التقرير المدموج تمييز «nightly-firefox» عن «nightly-webkit» كتيّارات أدلة منفصلة، ووصّل <a href="https://playwright.dev/docs/test-reporters"><code>attachmentsBaseURL</code></a> حين تعيش المرفقات خارج مجلد التقرير.</p>
<p>إن فشلت مهمة ليلية ولم تحصل إلا على شارة حمراء، فالحلقة ناقصة. المقصد كله اكتشاف الانحراف بينما ما زال هناك وقت لفعل شيء ذكي بشأنه. وللمهام الليلية التي تنتج مخرجات كثيفة النص، يمكن لـ<a href="https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue">مخرجات سطر الأوامر المهيكلة</a> أن تحوّل النتائج إلى تقارير حالة قابلة للقراءة آليًا تتفرّع عنها السكربتات التالية — بفتح مسائل، أو تنبيه Slack، أو التوجيه إلى الوكيل — دون محلّل مخصص لكل مهمة.</p>
<h2 id="لا-تحدث-الأسس-البصرية-تلقائيا-وفق-جدولة">لا تحدّث الأسس البصرية تلقائيًا وفق جدولة</h2>
<p>أكرّر هذا لأن الناس يستمرون في فعله.</p>
<p><strong>لا</strong> تشغّل <code>--update-snapshots</code> عبر cron. تلك ليست حلقة تحقق. ذلك روبوت صغير مهذّب يمرّ كل ليلة ليمحو الأدلة.</p>
<p>إن غيّرت مهمة مجدولة شيئًا يحتاج البشر إلى مراجعته، فافتح طلب سحب أو على الأقل اترك مخرج فرق. لا تُعد كتابة الأساس بصمت وتسمّه سليمًا.</p>
<h2 id="التسليم-عائدا-إلى-الحلقة-اليومية">التسليم عائدًا إلى الحلقة اليومية</h2>
<p>الفحوص الليلية مفيدة فقط إن تحوّلت إخفاقاتها إلى عمل يومي.</p>
<p>وذلك قد يعني:</p>
<ul>
<li>طلب سحب بملف HAR المحدّث</li>
<li>مسألة لاعتمادية أو مشكلة انحراف</li>
<li>مخرج فاشل يستطيع الوكيل قراءته والإصلاح مقابله</li>
</ul>
<p>الحلقة الليلية تجد الانحراف. والحلقة اليومية تصلحه. إن لم تكن الحلقتان موصولتين، فالتشغيل الليلي يصبح خلفية حائط.</p>
<h2 id="كيف-تعرف-أن-الليل-يؤدي-وزنه">كيف تعرف أن الليل يؤدي وزنه</h2>
<p>لديك حلقة ليلية مفيدة حين:</p>
<ul>
<li>تكون المهام المجدولة واسعة أو بطيئة فعلًا بما لا يناسب كل طلب سحب</li>
<li>تنتج الإخفاقات مخرجات ومسار إعادة إنتاج</li>
<li>تتدفق المخرجات عائدة إلى عمل المستودع العادي بدلًا من أن تختفي في البريد</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>سير العمل الليلي هو حيث تضع الفحوص المكلفة والمهمة مع ذلك بعد أن تكون الحلقة السريعة سليمة. وإن لم يعد إخفاق ليلي كعمل قابل للتنفيذ، فليس حلقة بعد.</p>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقق عبر المتصفحات دون إحراق حلقة التطوير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-add-a-nightly-verification-workflow">مخبر: أضف سير عمل تحقق ليليًا</a></li>
</ul>
`,i={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,i as default,e as headings,p as html,t as slug,l as title};
