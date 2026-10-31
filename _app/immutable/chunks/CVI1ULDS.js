const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="cicd-pipeline-exercise",p="التمرين 7: خط أنابيب CI/CD",l=[{depth:2,id:"ما-الذي-تفعله",text:"ما الذي تفعله"},{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"التهيئة",text:"التهيئة"},{depth:2,id:"إنشاء-سير-العمل-الأساسي",text:"إنشاء سير العمل الأساسي"},{depth:3,id:"ما-تفعله-كل-خطوة",text:"ما تفعله كل خطوة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إضافة-فحوص-جودة-مدعومة-بـ-turborepo",text:"إضافة فحوص جودة مدعومة بـ Turborepo"},{depth:2,id:"تهيئة-التخزين-المؤقت-البعيد",text:"تهيئة التخزين المؤقت البعيد"},{depth:2,id:"إضافة-استراتيجية-المصفوفة-للاختبار-المتوازي",text:"إضافة استراتيجية المصفوفة للاختبار المتوازي"},{depth:2,id:"إضافة-ميزانيات-أداء-lighthouse-ci",text:"إضافة ميزانيات أداء Lighthouse CI"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقّق"},{depth:2,id:"مراجعة-سير-العمل-الكامل",text:"مراجعة سير العمل الكامل"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقّق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],e=`<h2 id="ما-الذي-تفعله">ما الذي تفعله</h2>
<p>لديك مستودع أحادي عامل مع فحص الأنواع والفحص الساكن والاختبارات وتنسيق البناء عبر Turborepo. لكن لا شيء من ذلك يعمل تلقائيًا عند دفع الشيفرة. ستقوم ببناء سير عمل GitHub Actions يشغّل بوابة الجودة الكاملة عند كل دفع وطلب سحب، ويستخدم Turborepo للتخزين المؤقت، ويضيف ميزانيات أداء Lighthouse CI لالتقاط التراجعات قبل شحنها.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>خط أنابيب CI هو حيث تصبح قرارات المعمار قابلة للفرض. فقواعد الحدود التي هيّأتها في التمرين 6 لا تهمّ إلا إذا عملت عند كل طلب سحب. وبناءات TypeScript التزايدية من التمرين 5 لا توفّر الوقت إلا إذا خزّن CI ملفات <code>.tsbuildinfo</code> في ذاكرة مؤقتة. والتخزين المؤقت في Turborepo من التمرين 4 لا يُثمر إلا إذا شارك CI ذاكرة مؤقتة بعيدة عبر التشغيلات. بدون CI، معمارك مجرد اقتراح. ومعه، يصبح بوابة.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>Node.js 20+</li>
<li>pnpm 9+</li>
</ul>
<h2 id="التهيئة">التهيئة</h2>
<p>ينبغي أن تكون مكملًا من حيث انتهى التمرين 7 (حوكمة نظام التصميم). وإن احتجت إلى اللحاق:</p>
<pre><code class="language-bash">git checkout 07-cicd-start
pnpm install
</code></pre>
<p>افتح <code>.github/workflows/ci.yml</code> — فهو يحتوي على عنصر نائب فيه تهيئة المشغّلات وتعليق TODO.</p>
<h2 id="إنشاء-سير-العمل-الأساسي">إنشاء سير العمل الأساسي</h2>
<p>ابنِ ملف سير العمل من الصفر. افتح <code>.github/workflows/ci.yml</code> وأضف الأساس:</p>
<p><em>.github/workflows/ci.yml</em></p>
<pre><code class="language-yaml"><span class="hljs-attr">name:</span> <span class="hljs-string">CI</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">build:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">fetch-depth:</span> <span class="hljs-number">2</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">pnpm/action-setup@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">version:</span> <span class="hljs-number">9</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-number">20</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;pnpm&#x27;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span> <span class="hljs-string">--frozen-lockfile</span>
</code></pre>
<p><em>ملاحظة:</em> أقل عمق استنساخ لاكتشاف التغييرات في Turborepo دون تنزيل السجل الكامل.</p>
<p><em>ملاحظة:</em> يخزّن ~/.pnpm-store مؤقتًا عبر التشغيلات فلا تُنزَّل سوى الحزم الجديدة.</p>
<p><em>ملاحظة:</em> يُفشل البناء إذا كان ملف القفل قديمًا، ما يمنع انحراف الاعتمادات.</p>
<blockquote>
<p><strong>ملفات القفل (lockfiles)</strong></p>
<p>عندما تشغّل <code>pnpm install</code> يحلّ pnpm نطاقات الإصدارات (مثل <code>^18.2.0</code>) إلى إصدارات محددة (مثل <code>18.2.0</code>) وينزّلها ويسجّل الإصدار الدقيق وتجزئة السلامة ومسار الحلّ في <code>pnpm-lock.yaml</code>. وتقرأ عمليات التثبيت اللاحقة ملف القفل وتتخطّى الحلّ كليًا، فتُثبِّت الإصدارات نفسها بالضبط في كل مرة. ويذهب علم <code>--frozen-lockfile</code> أبعد: فهو يرفض التثبيت إذا لم يطابق ملف القفل ملف <code>package.json</code>، أي أن أحدهم أضاف أو غيّر اعتمادًا دون تشغيل <code>pnpm install</code> محليًا وإيداع النتيجة. وهذا مهم في CI لأنه بدون ملف قفل، سيحلّ <code>pnpm install</code> نطاقات الإصدارات مقابل السجلّ وقت التثبيت — وقد يُنتج إصدار تصحيحي جديد نُشر بين اختبارك المحلي وتشغيل CI إصدارات اعتماد مختلفة، فيقع الإخفاق الكلاسيكي «يعمل على جهازي».</p>
</blockquote>
<h3 id="ما-تفعله-كل-خطوة">ما تفعله كل خطوة</h3>
<ul>
<li><strong><code>actions/checkout@v4</code></strong>: يستنسخ المستودع. ويجلب <code>fetch-depth: 2</code> الإيداع الحالي وأصله، وهذا كافٍ لاكتشاف تغييرات Turborepo دون تنزيل كامل سجل git.</li>
<li><strong><code>pnpm/action-setup@v4</code></strong>: يثبّت pnpm عالميًا على المشغّل. ويطابق <code>version: 9</code> الإصدار المستخدم في التطوير.</li>
<li><strong><code>actions/setup-node@v4</code></strong>: يثبّت Node.js ويخزّن مخزن pnpm مؤقتًا. ويخبر خيار <code>cache: &quot;pnpm&quot;</code> الإجراء بأن يخزّن <code>~/.pnpm-store</code> بين التشغيلات، فلا تنزّل عمليات التثبيت اللاحقة سوى الحزم الجديدة أو المتغيّرة.</li>
<li><strong><code>pnpm install --frozen-lockfile</code></strong>: يثبّت الاعتمادات من ملف القفل كما هي محددة بالضبط. ويُفشل علم <code>--frozen-lockfile</code> البناء إذا كان ملف القفل قديمًا — فيلتقط حالات أضاف فيها أحدهم اعتمادًا لكنه نسي إيداع ملف القفل المحدَّث.</li>
</ul>
<blockquote>
<p><strong>لماذا <code>fetch-depth: 2</code></strong></p>
<p>ينزّل <code>fetch-depth: 0</code> سجل git بالكامل، وهذا بطيء في المستودعات الكبيرة. وينزّل <code>fetch-depth: 1</code> (الافتراضي) الإيداع الحالي فقط دون أصل، ما يمنع اكتشاف التغييرات القائم على git من العمل. أما <code>fetch-depth: 2</code> فهو الموضع الأمثل — فإيداع أصل واحد يكفي ليحدّد Turborepo ما تغيّر بين هذا الدفع والحالة السابقة.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>لديك سير عمل يثبّت الاعتمادات. وهو لا يشغّل أي فحوص بعد، لكن الأساس صحيح.</p>
<h2 id="إضافة-فحوص-جودة-مدعومة-بـ-turborepo">إضافة فحوص جودة مدعومة بـ Turborepo</h2>
<p>أضف خطوات فحص الأنواع والفحص الساكن والاختبار والبناء إلى مهمة <code>build</code> في <code>.github/workflows/ci.yml</code>. وكل خطوة تفوّض الأمر إلى Turborepo فتستفيد من التخزين المؤقت والتنفيذ المدرك للاعتمادات:</p>
<p><em>.github/workflows/ci.yml</em></p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Typecheck</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">typecheck</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Lint</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">lint</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Test</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">test</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Build</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">build</span>
</code></pre>
<p>تعمل هذه بالتتابع في مهمة <code>build</code>. وتستخدم كل خطوة ذاكرة Turborepo المؤقتة المحلية، فإذا كان فحص الأنواع قد بنى <code>@pulse/shared</code> بالفعل، كانت ذاكرة خطوة الفحص الساكن لتلك الحزمة دافئة.</p>
<blockquote>
<p><strong>لماذا تعمل هذه الخطوات بالتتابع</strong></p>
<p>تعمل كل خطوة داخل المهمة على المشغّل نفسه، متشاركةً نظام الملفات. ويتولّى Turborepo التوازي <em>داخل</em> كل خطوة — فـ <code>turbo typecheck</code> يفحص أنواع كل الحزم المستقلة على التوازي. وجعل الأوامر الأربعة متتابعة يعني أن فشل الفحص الساكن يوقف خط الأنابيب قبل إهدار الوقت على بناء كامل. ولو أردت توازيًا حقيقيًا، لوضعت كل خطوة في مهمة منفصلة — لكنها حينئذ لن تتشارك ذاكرة Turborepo المحلية المؤقتة.</p>
</blockquote>
<h2 id="تهيئة-التخزين-المؤقت-البعيد">تهيئة التخزين المؤقت البعيد</h2>
<p>تعيش ذاكرة Turborepo المحلية المؤقتة على نظام ملفات المشغّل وتُهمَل عند إيقافه. أما التخزين المؤقت البعيد فيخزّن مخرجات البناء في ذاكرة مشتركة تبقى عبر تشغيلات CI.</p>
<p>أضف متغيّرات بيئة للتخزين المؤقت البعيد. وحدّث مهمة <code>build</code> في <code>.github/workflows/ci.yml</code>:</p>
<p><em>.github/workflows/ci.yml</em></p>
<pre><code class="language-yaml"><span class="hljs-attr">build:</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">env:</span>
    <span class="hljs-attr">TURBO_TOKEN:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.TURBO_TOKEN</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">TURBO_TEAM:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">vars.TURBO_TEAM</span> <span class="hljs-string">}}</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-comment"># ... existing steps</span>
</code></pre>
<p><em>ملاحظة:</em> تُمكّن متغيّرات البيئة هذه التخزين المؤقت البعيد في Turborepo عبر تشغيلات CI.</p>
<blockquote>
<p><strong>إعداد التخزين المؤقت البعيد</strong></p>
<p>في مشروع حقيقي، ستنشئ حساب Vercel (مزوّد ذاكرة Turborepo المؤقتة البعيدة الافتراضي)، وتربط مستودعك بـ <code>npx turbo login</code> و<code>npx turbo link</code>، وتضيف <code>TURBO_TOKEN</code> الناتج كسرّ مستودع في GitHub. و<code>TURBO_TEAM</code> هو مُعرّف فريقك في Vercel. وعندما يعمل Turborepo في CI وقد ضُبطت متغيّرات البيئة هذه، يرفع مخرجات البناء إلى الذاكرة المؤقتة البعيدة بعد كل مهمة وينزّلها في التشغيلات اللاحقة. وتشترك تشغيلتا CI تبنيان الحزمة نفسها بالمدخلات نفسها في المخرَج المخزَّن — حتى إن عملتا على جهازين مختلفين.</p>
</blockquote>
<p>التغيّر في السلوك جوهري. فبدون التخزين المؤقت البعيد، يعيد أول تشغيل CI بعد كل دفع بناء كل شيء. ومع التخزين المؤقت البعيد، يرفع تشغيل CI الذي يبني <code>@pulse/shared</code> المخرَج. ثم ينزّل تشغيل CI التالي (على طلب سحب مختلف لم يغيّر <code>@pulse/shared</code>) المخرَج المخزَّن بدلًا من إعادة بنائه. وفي مستودع أحادي كبير، قد يقلّص هذا زمن CI بنسبة 50-80%.</p>
<blockquote>
<p><strong>لست بحاجة إلى Vercel للتخزين المؤقت البعيد</strong></p>
<p>يدعم Turborepo خلفيات ذاكرة مؤقتة بعيدة مخصّصة. فتستطيع استضافتها بنفسك باستخدام <code>turborepo-remote-cache</code> (خادم Node مفتوح المصدر مدعوم بـ S3 أو GCS أو تخزين محلي) أو استخدام مزوّدين آخرين. والبروتوكول موثّق. وفي هذه الورشة، يهمّ المفهوم أكثر من المزوّد المحدد.</p>
</blockquote>
<h2 id="إضافة-استراتيجية-المصفوفة-للاختبار-المتوازي">إضافة استراتيجية المصفوفة للاختبار المتوازي</h2>
<p>عندما تنمو مجموعات الاختبارات، يصبح تشغيلها بالتتابع عنق زجاجة. أضف مهمة ثانية إلى <code>.github/workflows/ci.yml</code>—استراتيجية مصفوفة تشغّل اختبارات كل حزمة في مهمة متوازية خاصة بها:</p>
<p><em>.github/workflows/ci.yml</em></p>
<pre><code class="language-yaml"><span class="hljs-attr">test:</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">strategy:</span>
    <span class="hljs-attr">matrix:</span>
      <span class="hljs-attr">package:</span> [<span class="hljs-string">analytics</span>, <span class="hljs-string">users</span>, <span class="hljs-string">ui</span>, <span class="hljs-string">shared</span>]
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">fetch-depth:</span> <span class="hljs-number">2</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">pnpm/action-setup@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">version:</span> <span class="hljs-number">9</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-number">20</span>
        <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;pnpm&#x27;</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span> <span class="hljs-string">--frozen-lockfile</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Test</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.package</span> <span class="hljs-string">}}</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">test</span> <span class="hljs-string">--filter=@pulse/\${{</span> <span class="hljs-string">matrix.package</span> <span class="hljs-string">}}</span>
</code></pre>
<p><em>ملاحظة:</em> تُنشئ استراتيجية المصفوفة أربع مهام متوازية، واحدة لكل حزمة.</p>
<p>يُنشئ هذا أربع مهام متوازية — واحدة لكل حزمة في المصفوفة. وتثبّت كل مهمة الاعتمادات وتشغّل الاختبارات لحزمتها المخصَّصة فقط.</p>
<blockquote>
<p><strong>التوازي مقابل مشاركة الذاكرة المؤقتة</strong></p>
<p>تعمل مهام المصفوفة على مشغّلات منفصلة، فلا تتشارك ذاكرة Turborepo المحلية المؤقتة. وتثبّت كل مهمة الاعتمادات باستقلالية. وبالنسبة إلى أربع حزم صغيرة، قد تفوق كلفة أربع عمليات <code>pnpm install</code> منفصلة فائدة التوازي. وتصبح استراتيجيات المصفوفة مجدية عندما تستغرق مجموعات الاختبار الفردية دقائق لا ثوانٍ. وفي هذه الورشة، نضمّنها لعرض النمط — وفي الإنتاج، قِس قبل الالتزام بها.</p>
</blockquote>
<blockquote>
<p><strong>Lighthouse</strong></p>
<p>يحمّل صفحتك في بيئة Chromium مضبوطة، ويقيس مقاييس أداء حقيقية (مثل Largest Contentful Paint وCumulative Layout Shift)، ويقيّم توافق إمكانية الوصول وفق إرشادات WCAG، ويفحص أفضل ممارسات SEO، ويقدّم تقريرًا عن قدرات تطبيقات الويب التقدمية. وتحصل كل فئة على درجة من 0 إلى 100. ويلفّ Lighthouse CI (<code>@lhci/cli</code>) أداة Lighthouse لاستخدامها في خطوط التكامل المستمر: فيستطيع تشغيل خادم تطبيقك، وإجراء دورات تدقيق متعددة لتقليل التباين، والتحقق من أن الدرجات تبلغ حدودًا محددة، ورفع النتائج للتتبع التاريخي. وتشغيل Lighthouse في CI بدلًا من يدويًا يعني فحص كل طلب سحب تلقائيًا مقابل ميزانيات أدائك — فأي تراجع يضيف 500KB من JavaScript أو يسبب انزياحًا في التخطيط سيُفشل خط الأنابيب قبل وصوله إلى الإنتاج.</p>
</blockquote>
<h2 id="إضافة-ميزانيات-أداء-lighthouse-ci">إضافة ميزانيات أداء Lighthouse CI</h2>
<p>تلتقط ميزانيات الأداء التراجعات قبل شحنها. أضف مهمة ثالثة إلى <code>.github/workflows/ci.yml</code>—خطوة Lighthouse CI تبني لوحة المعلومات وتتحقق من مقاييس الأداء:</p>
<p><em>.github/workflows/ci.yml</em></p>
<pre><code class="language-yaml"><span class="hljs-attr">lighthouse:</span>
  <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
  <span class="hljs-attr">needs:</span> <span class="hljs-string">build</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">fetch-depth:</span> <span class="hljs-number">2</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">pnpm/action-setup@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">version:</span> <span class="hljs-number">9</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
      <span class="hljs-attr">with:</span>
        <span class="hljs-attr">node-version:</span> <span class="hljs-number">20</span>
        <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;pnpm&#x27;</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span> <span class="hljs-string">--frozen-lockfile</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Build</span> <span class="hljs-string">Dashboard</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">turbo</span> <span class="hljs-string">build</span> <span class="hljs-string">--filter=@pulse/dashboard</span>

    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Lighthouse</span> <span class="hljs-string">CI</span>
      <span class="hljs-attr">run:</span> <span class="hljs-string">|
        npm install -g @lhci/cli
        lhci autorun
</span></code></pre>
<p><em>ملاحظة:</em> تنتظر هذه المهمة نجاح مهمة البناء قبل أن تعمل.</p>
<p>أنشئ ملف <code>lighthouserc.cjs</code> في جذر المستودع:</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>امتداد <code>.cjs</code> مطلوب لأن ملف <code>package.json</code> الجذري يضبط <code>&quot;type&quot;: &quot;module&quot;</code>، ما يعامل ملفات <code>.js</code> كـ ESM. وصيغة <code>module.exports</code> هي CommonJS، ويخبر امتداد <code>.cjs</code> بيئة Node.js باستخدام CommonJS بصرف النظر عن <code>&quot;type&quot;: &quot;module&quot;</code>.</p>
</blockquote>
<p><em>lighthouserc.cjs</em></p>
<pre><code class="language-javascript"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">ci</span>: {
    <span class="hljs-attr">collect</span>: {
      <span class="hljs-attr">startServerCommand</span>: <span class="hljs-string">&#x27;pnpm --filter @pulse/dashboard preview&#x27;</span>,
      <span class="hljs-attr">url</span>: [<span class="hljs-string">&#x27;http://localhost:4173&#x27;</span>],
      <span class="hljs-attr">numberOfRuns</span>: <span class="hljs-number">3</span>,
    },
    <span class="hljs-attr">assert</span>: {
      <span class="hljs-attr">assertions</span>: {
        <span class="hljs-string">&#x27;categories:performance&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],
        <span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2500</span> }],
        <span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">0.1</span> }],
        <span class="hljs-string">&#x27;total-byte-weight&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">200000</span> }],
      },
    },
    <span class="hljs-attr">upload</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;temporary-public-storage&#x27;</span>,
    },
  },
};
</code></pre>
<p><em>ملاحظة:</em> تقلّل ثلاث دورات التباين في قياسات الأداء.</p>
<p><em>ملاحظة:</em> يعرّف كل تحقّق ميزانية أداء تُفشل خط أنابيب CI إذا تجاوزتها.</p>
<blockquote>
<p><strong>ماذا يعني كل تحقّق</strong></p>
<ul>
<li><code>categories:performance &gt;= 0.9</code> — يجب أن تكون درجة أداء Lighthouse الإجمالية 90/100 على الأقل.</li>
<li><code>largest-contentful-paint &lt;= 2500ms</code> — يجب أن يكون المحتوى الرئيسي مرئيًا خلال 2.5 ثانية. وهذا حدّ Google «الجيد» لـ LCP.</li>
<li><code>cumulative-layout-shift &lt;= 0.1</code> — لا ينبغي أن ينزاح التخطيط أكثر من 0.1 وحدة CLS. ويؤثر موضع حدّ Suspense من التمرين 3 في هذا المقياس مباشرةً.</li>
<li><code>total-byte-weight &lt;= 200KB</code> — يجب أن يكون إجمالي JavaScript المشحون أقل من 200KB. وهذا يلتقط تضخّم الاعتمادات العرَضي — مثل استيراد lodash كله بدلًا من دالة واحدة.</li>
</ul>
</blockquote>
<blockquote>
<p><strong>ميزانيات الأداء تجعل قرارات المعمار قابلة للقياس</strong></p>
<p>ترتبط ميزانية CLS ارتباطًا مباشرًا بموضع حدّ Suspense من التمرين 3 — فحدود كثيرة مستقلة تسبب انزياحات في التخطيط. وتلتقط ميزانية الوزن الكلي بالبايت تضخّم الاعتمادات الذي قد يفوت الفحص الساكن المعماري من التمرين 6 (فقد تكون الحزمة اعتمادًا صالحًا لكنها كبيرة أكثر من اللازم). وتُغلق هذه الميزانيات حلقة التغذية الراجعة: فلقرارات المعمار نتائج أداء قابلة للقياس، ويفرض CI الحدود.</p>
</blockquote>
<h3 id="نقطة-تحقق-1">نقطة تحقّق</h3>
<p>تهيئة Lighthouse CI صالحة. وتعرّف التحقّقات ميزانيات أداء ملموسة. وتعتمد مهمة <code>lighthouse</code> على اكتمال مهمة <code>build</code> أولًا (عبر <code>needs: build</code>).</p>
<h2 id="مراجعة-سير-العمل-الكامل">مراجعة سير العمل الكامل</h2>
<p>تشكّل المهام الثلاث مخطط اعتماد. فمهمة <code>build</code> تشغّل بوابة الجودة المتتابعة. ومهمة <code>test</code> تستخدم استراتيجية مصفوفة لتشغيل اختبارات كل حزمة على التوازي. وتعتمد مهمة <code>lighthouse</code> على اكتمال <code>build</code> أولًا.</p>
<pre><code>flowchart TD
    Push[&quot;Push / Pull Request&quot;]

    subgraph Build[&quot;build job&quot;]
        direction TB
        Checkout1[&quot;Checkout + Install&quot;]
        TC[&quot;Typecheck (turbo)&quot;]
        Lint[&quot;Lint (turbo)&quot;]
        Test1[&quot;Test (turbo)&quot;]
        B[&quot;Build (turbo)&quot;]
        Checkout1 --&gt; TC --&gt; Lint --&gt; Test1 --&gt; B
    end

    subgraph TestMatrix[&quot;test job (matrix)&quot;]
        direction TB
        T_Analytics[&quot;Test @pulse/analytics&quot;]
        T_Users[&quot;Test @pulse/users&quot;]
        T_UI[&quot;Test @pulse/ui&quot;]
        T_Shared[&quot;Test @pulse/shared&quot;]
    end

    subgraph LH[&quot;lighthouse job&quot;]
        direction TB
        LH_Build[&quot;Build Dashboard&quot;]
        LH_Run[&quot;Lighthouse CI Assertions&quot;]
        LH_Build --&gt; LH_Run
    end

    Push --&gt; Build
    Push --&gt; TestMatrix
    Build --&gt;|&quot;needs: build&quot;| LH
</code></pre>
<p>ينبغي أن يحتوي ملف <code>.github/workflows/ci.yml</code> النهائي على ثلاث مهام:</p>
<ol>
<li><strong><code>build</code></strong>: يثبّت الاعتمادات، ويشغّل فحص الأنواع والفحص الساكن والاختبار والبناء بـ Turborepo</li>
<li><strong><code>test</code></strong>: استراتيجية مصفوفة تشغّل اختبارات كل حزمة على التوازي</li>
<li><strong><code>lighthouse</code></strong>: يبني لوحة المعلومات ويتحقق من ميزانيات الأداء</li>
</ol>
<p>يمكنك التحقق من صحة صيغة YAML محليًا:</p>
<pre><code class="language-bash">npx yaml-lint .github/workflows/ci.yml
</code></pre>
<p>أو الصقه في محرّر سير العمل في GitHub (تبويب Actions في المستودع) لفحص أخطاء الصيغة.</p>
<h3 id="نقطة-تحقق-2">نقطة تحقّق</h3>
<p>صيغة YAML لسير عمل CI صالحة. وتغطّي فحص الأنواع والفحص الساكن والاختبار والبناء وميزانيات الأداء. ويتولّى Turborepo التخزين المؤقت داخل كل مهمة. والتخزين المؤقت البعيد مهيّأ لمشاركة المخرجات عبر التشغيلات.</p>
<p><img src="/arabic-cs-library/images/kinney/255f86829c46782e.webp" alt="نظرة عامة على سير عمل CI في GitHub Actions"></p>
<p><img src="/arabic-cs-library/images/kinney/6da1d3f7cffb34a1.webp" alt="تهيئة Lighthouse CI وميزانيات الأداء"></p>
<h2 id="الحل">الحل</h2>
<p>إن احتجت إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة على فرع <code>08-testing-start</code>:</p>
<pre><code class="language-bash">git checkout 08-testing-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>تعليق على طلب السحب بدرجات Lighthouse:</strong> أضف خطوة تنشر تقرير Lighthouse كتعليق على طلب السحب باستخدام <code>marocchino/sticky-pull-request-comment@v2</code>. وهذا يمنح المراجعين بيانات الأداء جنبًا إلى جنب مع مراجعة الشيفرة.</li>
<li><strong>الاختبار على المتأثر فقط:</strong> استبدل استراتيجية المصفوفة بـ <code>turbo test --filter=...[HEAD^1]</code> لاختبار الحزم المتأثرة بالدفع الحالي فقط. وهذا هو اكتشاف تغييرات Turborepo — فهو يقارن الإيداع الحالي بأصله ويشغّل المهام فقط للحزم التي تغيّرت ملفاتها.</li>
<li><strong>خطوة النشر:</strong> أضف خطوة نشر شرطية تعمل فقط عند الدفع إلى <code>main</code> (لا طلبات السحب). وانشر لوحة المعلومات المبنية إلى Vercel أو Netlify أو مزوّد استضافة ثابتة.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>لديك خط أنابيب CI يفرض معمارك عند كل دفع. لكن ليست لديك اختبارات بعد. وفي التمرين التالي ستكتب اختبارات Playwright من الطرف إلى الطرف تختبر التطبيق المُركَّب، وواجهات API بديلة مُحاكاة بـ MSW، وتسجّل بيانات HAR الثابتة لإعادة تشغيل الاختبارات بشكل حتمي.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
