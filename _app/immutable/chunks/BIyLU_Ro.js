const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="continuous-integration",l="إعداد التكامل المستمر (Setting Up Continuous Integration)",p=[{depth:2,id:"لماذا-نؤتمت-الاختبارات-باستخدام-github-actions",text:"لماذا نؤتمت الاختبارات باستخدام GitHub Actions؟"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"دليل-خطوة-بخطوة",text:"دليل خطوة بخطوة"},{depth:3,id:"أنشئ-ملف-سير-عمل-github-actions",text:"أنشئ ملف سير عمل GitHub Actions"},{depth:3,id:"عرف-تهيئة-سير-العمل",text:"عرّف تهيئة سير العمل"},{depth:3,id:"تفصيل-خطوات-سير-العمل",text:"تفصيل خطوات سير العمل"},{depth:3,id:"استخدام-pnpm-أو-yarn-أو-bun-بدلا-من-npm",text:"استخدام pnpm أو yarn أو bun بدلًا من npm"},{depth:3,id:"أودع-ملف-سير-العمل-وادفعه",text:"أودع ملف سير العمل وادفعه"},{depth:3,id:"تحقق-من-تنفيذ-سير-العمل",text:"تحقق من تنفيذ سير العمل"},{depth:3,id:"اختبر-سير-العمل-بطلب-سحب",text:"اختبر سير العمل بطلب سحب"},{depth:3,id:"التعامل-مع-إخفاقات-الاختبارات",text:"التعامل مع إخفاقات الاختبارات"},{depth:3,id:"إضافة-تقارير-التغطية-اختياري",text:"إضافة تقارير التغطية (اختياري)"},{depth:3,id:"اختياري-فرض-فحوص-الحالة-المطلوبة",text:"اختياري: فرض فحوص الحالة المطلوبة"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:2,id:"نصائح-استكشاف-الأخطاء-وإصلاحها",text:"نصائح استكشاف الأخطاء وإصلاحها"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"موارد-إضافية",text:"موارد إضافية"}],c=`<p>التكامل المستمر (CI) ممارسة حاسمة في تطوير البرمجيات الحديث، تتيح للفرق اكتشاف المشكلات مبكرًا بتشغيل الاختبارات تلقائيًا على تغييرات الشيفرة. يوفر <strong>GitHub Actions</strong> منصة قوية لأتمتة سير العمل مباشرة داخل مستودع GitHub لديك. سيرشدك هذا الدليل خلال إعداد GitHub Actions لتشغيل اختبارات وحدات <strong>Vitest</strong> في كل طلب سحب (PR)، بما يضمن ألا يُدمج إلا الكود الناجح.</p>
<h2 id="لماذا-نؤتمت-الاختبارات-باستخدام-github-actions">لماذا نؤتمت الاختبارات باستخدام GitHub Actions؟</h2>
<ul>
<li><strong>الكشف المبكر</strong>: اكتشف الأخطاء والمشكلات فور دفع الشيفرة.</li>
<li><strong>الاتساق</strong>: تأكد من أن كل تغييرات الشيفرة تلبي معايير الاختبار في المشروع.</li>
<li><strong>الكفاءة</strong>: أتمت عملية الاختبار لتوفير الوقت وتقليل الجهد اليدوي.</li>
<li><strong>التعاون</strong>: وفر تغذية راجعة فورية للمساهمين عبر فحوص طلبات السحب.</li>
</ul>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>مستودع GitHub يحتوي مشروعك.</li>
<li>Vitest مثبّت ومهيأ في مشروعك.</li>
<li>اختبارات وحدات موجودة مكتوبة بـ Vitest.</li>
<li>Node.js ومدير حزم مهيأ في مشروعك (npm أو pnpm أو yarn أو bun).</li>
</ul>
<h2 id="دليل-خطوة-بخطوة">دليل خطوة بخطوة</h2>
<h3 id="أنشئ-ملف-سير-عمل-github-actions">أنشئ ملف سير عمل GitHub Actions</h3>
<p>في مستودعك، أنشئ دليلًا اسمه <code>.github/workflows</code> إن لم يكن موجودًا. داخل هذا الدليل، أنشئ ملف YAML جديدًا لسير عملك، مثل <code>ci.yml</code>.</p>
<pre><code class="language-typescript">your-repo/
├── .<span class="hljs-property">github</span>/
│   └── workflows/
│       └── ci.<span class="hljs-property">yml</span>
</code></pre>
<h3 id="عرف-تهيئة-سير-العمل">عرّف تهيئة سير العمل</h3>
<p>افتح <code>ci.yml</code> وعرّف سير العمل:</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/ci.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">CI</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">build:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>

    <span class="hljs-attr">strategy:</span>
      <span class="hljs-attr">matrix:</span>
        <span class="hljs-attr">node-version:</span> [<span class="hljs-number">20.</span><span class="hljs-string">x</span>]

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Checkout</span> <span class="hljs-string">code</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Use</span> <span class="hljs-string">Node.js</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node-version</span> <span class="hljs-string">}}</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node-version</span> <span class="hljs-string">}}</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;npm&#x27;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">install</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">tests</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">test</span>
</code></pre>
<ul>
<li><strong><code>name: CI</code></strong>: يسمي سير العمل «CI» (التكامل المستمر).</li>
<li><strong><code>on: pull_request</code></strong>: يشغّل سير العمل عند طلبات السحب الموجّهة إلى فرع <code>main</code>.</li>
<li><strong><code>jobs</code></strong>: يحدد المهام التي ستُشغَّل؛ في هذه الحالة، مهمة واحدة اسمها <code>build</code>.</li>
<li><strong><code>runs-on</code></strong>: يحدد بيئة نظام التشغيل (<code>ubuntu-latest</code>).</li>
<li><strong><code>strategy.matrix.node-version</code></strong>: يتيح الاختبار على إصدارات Node.js مختلفة (عدّل حسب الحاجة).</li>
<li><strong><code>steps</code></strong>: يسرد الخطوات التي ستُنفَّذ في المهمة.</li>
</ul>
<blockquote>
<p><strong>ملاحظة</strong>: Node.js 16 مهجور ولم يعد مدعومًا من GitHub Actions. استخدم إصدارات LTS النشطة (مثل 18.x/20.x/22.x).</p>
</blockquote>
<h3 id="تفصيل-خطوات-سير-العمل">تفصيل خطوات سير العمل</h3>
<h4>سحب المستودع</h4>
<p>أولًا وقبل كل شيء: لنخبر الإجراء بسحب مستودعك.</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Checkout</span> <span class="hljs-string">code</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v3</span>
</code></pre>
<p>يستخدم هذا إجراء <code>actions/checkout</code> لاستنساخ مستودعك.</p>
<h4>إعداد بيئة Node</h4>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Use</span> <span class="hljs-string">Node.js</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node-version</span> <span class="hljs-string">}}</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v3</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">node-version:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node-version</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;npm&#x27;</span>
</code></pre>
<p>هذه الخطوة:</p>
<ul>
<li>تهيّئ إصدار Node المحدد، و</li>
<li>تخزّن اعتماديات <code>npm</code> مؤقتًا لتسريع سير العمل.</li>
</ul>
<h4>ثبّت اعتمادياتك</h4>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">install</span>
</code></pre>
<p>لا شيء مميز بشكل خاص هنا. يثبّت هذا اعتماديات المشروع المعرّفة في <code>package.json</code>.</p>
<h4>شغّل الاختبارات</h4>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">tests</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">test</span>
</code></pre>
<p>ينفّذ هذا سكربت الاختبار المعرّف في <code>package.json</code>.</p>
<h3 id="استخدام-pnpm-أو-yarn-أو-bun-بدلا-من-npm">استخدام pnpm أو yarn أو bun بدلًا من npm</h3>
<p>إذا كنت تستخدم مدير حزم مختلفًا، فأضف خطوة إعداده واستبدل أوامر التثبيت/الاختبار. على سبيل المثال، مع <strong>pnpm</strong>:</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Set</span> <span class="hljs-string">up</span> <span class="hljs-string">pnpm</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">pnpm/action-setup@v4</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">version:</span> <span class="hljs-number">9</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">tests</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">test</span>
</code></pre>
<p>أما <strong>yarn</strong>، ففعّل Corepack واستخدم <code>yarn install</code>/<code>yarn test</code>. وأما <strong>bun</strong>، فاستخدم <code>oven-sh/setup-bun@v2</code> وشغّل <code>bun install</code>/<code>bun test</code>. عدّل قيمة <code>cache</code> في <code>actions/setup-node</code> لتطابق مدير حزمك (<code>pnpm</code>/<code>yarn</code>).</p>
<h3 id="أودع-ملف-سير-العمل-وادفعه">أودع ملف سير العمل وادفعه</h3>
<p>أضف ملف سير العمل إلى مستودعك وادفعه إلى GitHub:</p>
<pre><code class="language-bash">git add .github/workflows/ci.yml
git commit -m <span class="hljs-string">&quot;Add CI workflow for running Vitest tests&quot;</span>
git push origin main
</code></pre>
<h3 id="تحقق-من-تنفيذ-سير-العمل">تحقق من تنفيذ سير العمل</h3>
<p>بعد دفع ملف سير العمل:</p>
<ul>
<li>افتح مستودعك على GitHub.</li>
<li>انتقل إلى تبويب <strong>Actions</strong>.</li>
<li>ينبغي أن ترى سير عمل <strong>CI</strong> مدرجًا.</li>
<li>انقر عليه لرؤية تفاصيل تشغيلات سير العمل.</li>
</ul>
<h3 id="اختبر-سير-العمل-بطلب-سحب">اختبر سير العمل بطلب سحب</h3>
<p>أنشئ فرعًا جديدًا.</p>
<pre><code class="language-bash">git checkout -b test-ci
</code></pre>
<p>أجرِ تغييرًا صغيرًا أو أضف إيداعًا وهميًا.</p>
<pre><code class="language-bash"><span class="hljs-built_in">touch</span> dummy.txt
git add dummy.txt
git commit -m <span class="hljs-string">&quot;Test CI workflow&quot;</span>
git push origin test-ci
</code></pre>
<ul>
<li>أنشئ طلب سحب موجّهًا إلى فرع <code>main</code>.</li>
<li>ينبغي أن يُشغَّل سير عمل CI تلقائيًا.</li>
<li>افحص صفحة طلب السحب لرؤية حالة الفحوص.</li>
</ul>
<h3 id="التعامل-مع-إخفاقات-الاختبارات">التعامل مع إخفاقات الاختبارات</h3>
<p>إذا فشلت اختباراتك:</p>
<ul>
<li>سيميّز سير العمل البناء كمُخفِق.</li>
<li>سيعرض طلب السحب أن الفحوص فشلت.</li>
<li>انقر رابط <strong>التفاصيل</strong> لعرض السجلات وتحديد المشكلات.</li>
<li>أصلح الاختبارات أو الشيفرة المسببة للفشل.</li>
<li>ادفع التغييرات؛ سيعيد سير العمل التشغيل.</li>
</ul>
<h3 id="إضافة-تقارير-التغطية-اختياري">إضافة تقارير التغطية (اختياري)</h3>
<p>إذا أردت تضمين تقارير التغطية:</p>
<p>عدّل سكربت الاختبار في <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest --coverage&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حدّث سير العمل لرفع عناصر التغطية الأثرية:</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">tests</span> <span class="hljs-string">with</span> <span class="hljs-string">coverage</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">test</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">coverage</span> <span class="hljs-string">report</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v3</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">coverage-report</span>
    <span class="hljs-attr">path:</span> <span class="hljs-string">coverage</span>
</code></pre>
<p>سيكون تقرير التغطية متاحًا في عناصر سير العمل الأثرية.</p>
<h3 id="اختياري-فرض-فحوص-الحالة-المطلوبة">اختياري: فرض فحوص الحالة المطلوبة</h3>
<p>لمنع دمج شيفرة باختبارات فاشلة:</p>
<ul>
<li>اذهب إلى <strong>Settings</strong> &gt; <strong>Branches</strong> في مستودعك.</li>
<li>تحت <strong>Branch protection rules</strong>، انقر <strong>Add rule</strong>.</li>
<li>حدد نمط اسم الفرع (مثل <code>main</code>).</li>
<li>فعّل <strong>Require status checks to pass before merging</strong>.</li>
<li>اختر سير عمل <strong>CI</strong> كفحص مطلوب.</li>
<li>احفظ التغييرات.</li>
</ul>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<p><strong>استخدم التخزين المؤقت</strong>: خزّن الاعتماديات مؤقتًا لتسريع تشغيلات سير العمل.</p>
<pre><code class="language-yaml"><span class="hljs-attr">with:</span>
  <span class="hljs-attr">node-version:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node-version</span> <span class="hljs-string">}}</span>
  <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;npm&#x27;</span>
</code></pre>
<p><strong>اختبر إصدارات Node متعددة</strong>: تأكد من التوافق عبر بيئات مختلفة. هذا على الأرجح مهم فقط إذا كنت تختبر شيفرة من جهة الخادم.</p>
<pre><code class="language-yaml"><span class="hljs-attr">strategy:</span>
  <span class="hljs-attr">matrix:</span>
    <span class="hljs-attr">node-version:</span> [<span class="hljs-number">18.</span><span class="hljs-string">x</span>, <span class="hljs-number">20.</span><span class="hljs-string">x</span>, <span class="hljs-number">22.</span><span class="hljs-string">x</span>]
</code></pre>
<p><strong>الفشل السريع</strong>: استخدم خيار <code>fail-fast</code> لإيقاف تشغيل المهام عند أول فشل.</p>
<pre><code class="language-yaml"><span class="hljs-attr">strategy:</span>
  <span class="hljs-attr">fail-fast:</span> <span class="hljs-literal">true</span>
</code></pre>
<p><strong>وازِ بين المهام</strong>: إذا كانت لديك مجموعات اختبارات متعددة، فشغّلها على التوازي لتقليل إجمالي زمن البناء.</p>
<p><strong>أمّن أسرارك</strong>: تجنب تضمين المعلومات الحساسة في سير العمل. استخدم أسرار GitHub المشفّرة.</p>
<p><strong>أبقِ سير العمل محدّثًا</strong>: حدّث إصدارات الإجراءات بانتظام للاستفادة من التحسينات وتصحيحات الأمان.</p>
<h2 id="نصائح-استكشاف-الأخطاء-وإصلاحها">نصائح استكشاف الأخطاء وإصلاحها</h2>
<p>إذا ساءت الأمور، فإليك بعض الأسباب الشائعة المحتملة.</p>
<ul>
<li><strong>مشكلات الأذونات</strong>: تأكد من وجود ملف سير العمل في الفرع الافتراضي (مثل <code>main</code>) ليعمل عند طلبات السحب.</li>
<li><strong>أخطاء الصياغة</strong>: YAML ليس شيفرة. إنه لغة ترميز أخرى (YAML). استخدم مدقق YAML أو محرر سير العمل في GitHub للتحقق من ملفات YAML.</li>
<li><strong>التخزين المؤقت لا يعمل</strong>: تحقق من تعيين مفتاح التخزين المؤقت بشكل صحيح ومن عدم تغيّر اعتماديات التخزين المؤقت.</li>
<li><strong>اختلافات البيئة</strong>: إذا نجحت الاختبارات محليًا وفشلت في CI، فتأكد من اتساق متغيرات البيئة والتهيئات.</li>
</ul>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>إعداد GitHub Actions لتشغيل اختبارات وحدات Vitest في كل طلب سحب يحسّن سير عمل التطوير لديك بأتمتة عملية الاختبار. يساعد في الحفاظ على جودة الشيفرة، ويمنع وصول الأخطاء إلى الإنتاج، ويعزز ثقافة التكامل المستمر. باتباع هذا الدليل، لديك الآن خط أنابيب CI يشغّل اختباراتك تلقائيًا، ويوفر تغذية راجعة فورية للمساهمين، ويحافظ على سلامة قاعدة شيفرتك.</p>
<h2 id="موارد-إضافية">موارد إضافية</h2>
<ul>
<li><strong>توثيق Vitest</strong>: <a href="https://vitest.dev/">https://vitest.dev/</a></li>
<li><strong>توثيق GitHub Actions</strong>: <a href="https://docs.github.com/en/actions">https://docs.github.com/en/actions</a></li>
<li><strong>تخزين الاعتماديات مؤقتًا</strong>: <a href="https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows">تخزين الاعتماديات مؤقتًا لتسريع سير العمل</a></li>
<li><strong>GitHub Actions لـ JavaScript وNode.js</strong>: <a href="https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs">الدليل الرسمي من GitHub</a></li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
