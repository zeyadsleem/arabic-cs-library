const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",a="github-actions",e="GitHub Actions: أتمتة المستودعات وخطوط CI/CD",o=[{depth:2,id:"النموذج-الذهني",text:"النموذج الذهني"},{depth:2,id:"تشريح-سير-العمل",text:"تشريح سير العمل"},{depth:2,id:"المحفزات-ودلالات-الأحداث",text:"المُحفّزات ودلالات الأحداث"},{depth:2,id:"المهام-والخطوات-وتدفق-البيانات",text:"المهام والخطوات وتدفّق البيانات"},{depth:2,id:"السياقات-والتعبيرات-والمتغيرات",text:"السياقات والتعبيرات والمتغيّرات"},{depth:2,id:"المشغلات",text:"المشغّلات"},{depth:2,id:"المهام-في-الحاويات-وحاويات-الخدمة",text:"المهام في الحاويات وحاويات الخدمة"},{depth:2,id:"إعادة-استخدام-المنطق",text:"إعادة استخدام المنطق"},{depth:2,id:"الذاكرات-المؤقتة-والمخرجات-والملخصات",text:"الذاكرات المؤقتة والمخرجات والملخصات"},{depth:2,id:"المصفوفات-والتوازي-والتحكم-في-التزامن",text:"المصفوفات والتوازي والتحكم في التزامن"},{depth:2,id:"عمليات-النشر-والبيئات",text:"عمليات النشر والبيئات"},{depth:2,id:"الأمان",text:"الأمان"},{depth:2,id:"حدود-تهم-عمليا",text:"حدود تهمّ عمليًا"},{depth:2,id:"أنماط-عملية-تصمد",text:"أنماط عملية تصمد"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"النموذج-الذهني",text:"النموذج الذهني"},{depth:3,id:"دلالات-المحفزات",text:"دلالات المُحفّزات"},{depth:3,id:"آليات-إعادة-الاستخدام",text:"آليات إعادة الاستخدام"},{depth:3,id:"أساسيات-الأمان",text:"أساسيات الأمان"}],c=`<p>GitHub Actions هو نظام الأتمتة المدمج في GitHub للتكامل المستمر (CI)، والتسليم المستمر (CD)، وخطوط الإصدار، وتدبير شؤون المستودع، وسير عمل الأمان، وبقية الأعمال الشاقّة التي يظل البشر يحاولون إنجازها يدويًا. و<a href="https://docs.github.com/actions/using-workflows/about-workflows">سير العمل</a> ملف YAML مخزّن في <code>.github/workflows</code>، ويعمل عند حدوث حدث مطابق في المستودع، أو وفق جدول زمني، أو حين يطلقه أحدهم يدويًا. ويمكن أن يكون للمستودع سير عمل كثيرة، كل منها موجّه إلى مهمة مختلفة.</p>
<p>والجزء الذي يربك الناس أن GitHub Actions ليس شيئًا واحدًا. فهو محرّك سير عمل، ومنصّة تنفيذ، وصيغة تغليف لإجراءات قابلة لإعادة الاستخدام، وأسطول مشغّلات، وسطح أمني، ونظام سياسات. ويبدو كـ«بعض YAML وسطرَي <code>uses:</code>» حتى تصير لديك تفرّعات، وعمليات نشر، ومشغّلات مستضافة ذاتيًا، وبيانات اعتماد سحابية، وصحّة ذاكرة مؤقتة، وزميل يرى في <code>pull_request_target</code> طريقة ممتعة للتعرّف على الاستجابة للحوادث.</p>
<h2 id="النموذج-الذهني">النموذج الذهني</h2>
<p>و<a href="https://docs.github.com/articles/getting-started-with-github-actions">النموذج الأساسي</a> مباشر. <strong>سير العمل</strong> يحتوي <strong>مهمة</strong> واحدة أو أكثر. وتعمل <strong>المهام</strong> على <strong>مشغّلات</strong>، وكل مهمة تحتوي <strong>خطوات</strong>. والخطوة إما أمر صدفة بـ<code>run:</code> وإما إجراء يُستدعى بـ<code>uses:</code>. ويمكن أن تعمل المهام على التوازي أو تُفرض في تسلسل بـ<code>needs</code>. وتعمل كل مهمة على آلة مشغّل خاصة بها أو في سياق حاوية خاص بها، ولهذا يكون تمرير الحالة بين المهام صريحًا لا سحريًا.</p>
<p>و<a href="https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/using-pre-written-building-blocks-in-your-workflow">الإجراء</a> لبنة بناء قابلة لإعادة الاستخدام. ويمكنك استخدام إجراءات من المستودع نفسه، أو من مستودعات عامة، أو من صور Docker Hub. ويدعم GitHub أيضًا كتابة إجراءاتك الخاصة بلغة JavaScript أو Docker أو الإجراءات المركّبة، ويوصف كل منها بملف بيانات وصفية <code>action.yml</code> أو <code>action.yaml</code>. والإجراءات المركّبة تجمع خطوات؛ وسير العمل القابل لإعادة الاستخدام يجمع مهام كاملة وبنية سير العمل. وهاتان فكرتان متقاربتان، لكنهما ليستا الشيء نفسه، إذ يبدو أن تجريدًا واحدًا قابلًا لإعادة الاستخدام كان سيكون أكثر رحمة بالبشر.</p>
<h2 id="تشريح-سير-العمل">تشريح سير العمل</h2>
<p>في المستوى الأعلى، المفاتيح التي ستعنيك أكثر هي <code>name</code> و<code>run-name</code> و<code>on</code> و<code>permissions</code> و<code>env</code> و<code>defaults</code> و<code>concurrency</code> و<code>jobs</code>. ويُعرّف <a href="https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions">مرجع صيغة سير العمل</a> أيضًا ميزات على مستوى المهمة مثل <code>if</code> و<code>strategy</code> و<code>container</code> و<code>services</code> و<code>outputs</code> و<code>uses</code> و<code>with</code> و<code>secrets</code>، وهي حيث يجري معظم العمل الحقيقي.</p>
<p>وهذا سير عمل أساسي جيد:</p>
<pre><code class="language-yaml"><span class="hljs-attr">name:</span> <span class="hljs-string">CI</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]
    <span class="hljs-attr">paths:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;src/**&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;package.json&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;package-lock.json&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;.github/workflows/ci.yml&#x27;</span>
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]
  <span class="hljs-attr">workflow_dispatch:</span>

<span class="hljs-attr">permissions:</span>
  <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>

<span class="hljs-attr">concurrency:</span>
  <span class="hljs-attr">group:</span> <span class="hljs-string">ci-\${{</span> <span class="hljs-string">github.ref</span> <span class="hljs-string">}}</span>
  <span class="hljs-attr">cancel-in-progress:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">env:</span>
  <span class="hljs-attr">NODE_ENV:</span> <span class="hljs-string">test</span>

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">test:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">strategy:</span>
      <span class="hljs-attr">fail-fast:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">matrix:</span>
        <span class="hljs-attr">node:</span> [<span class="hljs-number">20</span>, <span class="hljs-number">22</span>]

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v5</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">matrix.node</span> <span class="hljs-string">}}</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/cache@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">~/.npm</span>
          <span class="hljs-attr">key:</span> <span class="hljs-string">npm-\${{</span> <span class="hljs-string">runner.os</span> <span class="hljs-string">}}-\${{</span> <span class="hljs-string">matrix.node</span> <span class="hljs-string">}}-\${{</span> <span class="hljs-string">hashFiles(&#x27;**/package-lock.json&#x27;)</span> <span class="hljs-string">}}</span>
          <span class="hljs-attr">restore-keys:</span> <span class="hljs-string">|
            npm-\${{ runner.os }}-\${{ matrix.node }}-
            npm-\${{ runner.os }}-
</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">test</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Save</span> <span class="hljs-string">coverage</span>
        <span class="hljs-attr">if:</span> <span class="hljs-string">always()</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">coverage-node-\${{</span> <span class="hljs-string">matrix.node</span> <span class="hljs-string">}}</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">coverage/</span>
          <span class="hljs-attr">retention-days:</span> <span class="hljs-number">7</span>
</code></pre>
<p>يستخدم هذا المثال الميزات التي تهمّ في المستودعات الحقيقية—مرشّحات الأحداث، وصلاحيات الرمز بأقل امتياز، والتحكم في التزامن، ومصفوفة، وتخزين الاعتمادات مؤقتًا، ومخرجات. ولا شيء من ذلك غريب. إنها الفرق بين سير عمل لعبة وآخر لا يهدر المال ولا ينصب فخاخًا أمنية لنسختك المستقبلية.</p>
<h2 id="المحفزات-ودلالات-الأحداث">المُحفّزات ودلالات الأحداث</h2>
<p>كتلة <code>on:</code> هي التي تحدّد متى يبدأ سير العمل. ويستطيع GitHub Actions أن يُحفَّز بـ<a href="https://docs.github.com/actions/using-workflows/events-that-trigger-workflows">نشاط المستودع، أو الجداول الزمنية، أو الإطلاق اليدوي، أو استدعاءات سير العمل، أو اكتمالات سير العمل، أو الأحداث الخارجية</a>. والحالات الشائعة هي <code>push</code> و<code>pull_request</code> و<code>workflow_dispatch</code> و<code>schedule</code> و<code>workflow_call</code> و<code>workflow_run</code>. ولأحداث المستودع، يمكنك تضييق التنفيذ بأنواع النشاط <code>types</code>، ومرشّحات الفروع، ومرشّحات الوسوم، ومرشّحات المسارات. ويمكن بدء سير العمل اليدوي المُحفَّز بـ<code>workflow_dispatch</code> من تبويب Actions، أو من GitHub CLI، أو من واجهة REST.</p>
<p>ومرشّحات المسارات جديرة بالاستخدام بقوة، خصوصًا في المستودعات الأحادية. فإذا طابق مسار متغيّر واحد على الأقل قاعدة <code>paths</code>، عمل سير العمل. وهذه أرخص طريقة لمنع تعديل في التوثيق من إعادة بناء كامل حزمة تطبيقاتك، وهو نوع الاستعراض غير الضروري الذي تسمّيه الفرق «CI القياسي».</p>
<p>وفي عائلة <code>pull_request</code> مزالق يتعلّمها الناس متأخرين. فسير عمل <code>pull_request</code> <a href="https://docs.github.com/actions/using-workflows/events-that-trigger-workflows">لن يعمل</a> إذا كان في طلب السحب تعارضات دمج، بينما يعمل <code>pull_request_target</code>. وفي <code>pull_request</code>، يكون <code>GITHUB_SHA</code> آخر إيداع دمج في فرع دمج طلب السحب، وليس بالضرورة أحدث إيداع في فرع رأس المساهم. وإن احتجت بصمة الرأس الفعلية للمساهم، فاستخدم <code>github.event.pull_request.head.sha</code>.</p>
<p>و<code>pull_request_target</code> و<code>workflow_run</code> مُحفّزان ذوا امتيازات ويحتاجان حذرًا حقيقيًا. وتحذّر <a href="https://docs.github.com/en/enterprise-cloud@latest/actions/reference/security/secure-use">توثيقات الأمان</a> في GitHub من أن استخدامهما مع سحب شيفرة غير موثوقة قد يؤدي إلى تسميم الذاكرة المؤقتة ووصول غير مقصود إلى امتيازات الكتابة أو الأسرار. والافتراضي الآمن بسيط—لا تسحب شيفرة طلبات سحب غير موثوقة تحت مُحفّز ذي امتيازات إلا إذا كنت متأكدًا تمامًا أنك تعرف ما تفعل، وأكثر الناس لا يعرفون.</p>
<h2 id="المهام-والخطوات-وتدفق-البيانات">المهام والخطوات وتدفّق البيانات</h2>
<p>المهام هي حيث تحدث التنسيقية. وافتراضيًا، يمكن للمهام المستقلة أن تعمل على التوازي. أضف <code>needs</code> لفرض التسلسل، واستخدم <code>if:</code> لبوابة التنفيذ، واستخدم مخرجات المهام حين يجب أن تعبر البيانات حدود المهام. وداخل المهمة، تُنفَّذ الخطوات بالترتيب، ويمكن أن تكون كل خطوة أمرًا أو إجراءً.</p>
<p>وتمرير البيانات داخل المهمة وبين المهام يستخدم أدوات مختلفة. فداخل المهمة، اكتب متغيّرات البيئة في <code>GITHUB_ENV</code> لتقرأها الخطوات اللاحقة. ولإظهار مخرَج خطوة، اكتب في <code>GITHUB_OUTPUT</code>، ثم اربط مخرجات الخطوات بمخرجات المهمة عبر <code>jobs.&lt;job_id&gt;.outputs</code>، وأخيرًا استهلك تلك القيم في المهام اللاحقة عبر <a href="https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/passing-information-between-jobs">سياق <code>needs</code></a>.</p>
<pre><code class="language-yaml"><span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">build:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">outputs:</span>
      <span class="hljs-attr">image_tag:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">steps.meta.outputs.tag</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">id:</span> <span class="hljs-string">meta</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">echo</span> <span class="hljs-string">&quot;tag=sha-\${GITHUB_SHA::7}&quot;</span> <span class="hljs-string">&gt;&gt;</span> <span class="hljs-string">&quot;$GITHUB_OUTPUT&quot;</span>

  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">needs:</span> <span class="hljs-string">build</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">echo</span> <span class="hljs-string">&quot;Deploying $<span class="hljs-template-variable">{{ needs.build.outputs.image_tag }}</span>&quot;</span>
</code></pre>
<p>ونمط تمرير مخرجات الخطوة إلى مخرجات المهمة هو الطريقة المعتادة لنقل بيانات منظّمة عبر سير العمل. وهو أنظف بكثير من كتابة ملفات مؤقتة في كل مكان والأمل أن تراها المهمة التالية، وهو ما لن يحدث لأن المهام معزولة.</p>
<h2 id="السياقات-والتعبيرات-والمتغيرات">السياقات والتعبيرات والمتغيّرات</h2>
<p><a href="https://docs.github.com/en/actions/reference/workflows-and-actions/contexts">السياقات</a> هي كائنات وقت التشغيل في GitHub Actions. وأهمها <code>github</code> و<code>env</code> و<code>vars</code> و<code>job</code> و<code>steps</code> و<code>runner</code> و<code>matrix</code> و<code>needs</code> و<code>inputs</code> و<code>secrets</code>. ويحتوي سياق <code>github</code> على بيانات وصفية لتشغيل سير العمل، بينما يعرض <code>vars</code> متغيّرات التهيئة المعرّفة على مستوى المؤسسة أو المستودع أو البيئة.</p>
<p>كما يضبط GitHub مجموعة كبيرة من <a href="https://docs.github.com/en/actions/reference/workflows-and-actions/variables">متغيّرات البيئة الافتراضية</a> في كل تشغيل. وهذه المتغيّرات متاحة للخطوات، لكنها غير معرّفة عبر خريطة <code>env</code> في سير العمل، ولهذا تصل عمومًا إلى قيمها وقت سير العمل عبر سياقات مثل <code>\${{ github.ref }}</code> لا عبر <code>\${{ env.GITHUB_REF }}</code>. وتشير توثيقات GitHub أيضًا إلى أنك لا تستطيع الكتابة فوق المتغيّرات الافتراضية <code>GITHUB_*</code> أو <code>RUNNER_*</code>.</p>
<p>ومن السهل الخطأ في أسبقية المتغيّرات. ففي <code>env</code> العادي، يفوز النطاق الأكثر تحديدًا—فالخطوة تتجاوز المهمة، والمهمة تتجاوز سير العمل. وفي متغيّرات التهيئة ضمن <code>vars</code>، يفوز المستوى الأدنى—فالبيئة تتجاوز المستودع، والمستودع يتجاوز المؤسسة. وثمة فارق خبيث واحد: لا تصبح متغيّرات التهيئة على مستوى البيئة متاحة إلا بعد أن تبدأ المهمة التنفيذ، فلا تكتب فوق قيم حُسمت بالفعل في سياقَي <code>env</code> و<code>vars</code> أثناء معالجة سير العمل.</p>
<p>أما <a href="https://docs.github.com/en/enterprise-cloud@latest/actions/reference/workflows-and-actions/expressions">التعبيرات</a> فهي النصف الآخر من النموذج. و<code>fromJSON()</code> مفيد لتحويل السلاسل النصية إلى قيم منطقية أو أعداد صحيحة أو مصفوفات أو كائنات مصفوفة كاملة. و<code>toJSON()</code> جيد لتنقيح السياقات. و<code>hashFiles()</code> هو ما تستخدمه لمفاتيح ذاكرة مؤقتة مستقرة مبنية على ملفات القفل أو بيانات الاعتماد الوصفية.</p>
<pre><code class="language-yaml"><span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">define-matrix:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">outputs:</span>
      <span class="hljs-attr">matrix:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">steps.set.outputs.matrix</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">id:</span> <span class="hljs-string">set</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">echo</span> <span class="hljs-string">&#x27;matrix={&quot;include&quot;:[{&quot;node&quot;:20},{&quot;node&quot;:22}]}&#x27;</span> <span class="hljs-string">&gt;&gt;</span> <span class="hljs-string">&quot;$GITHUB_OUTPUT&quot;</span>

  <span class="hljs-attr">test:</span>
    <span class="hljs-attr">needs:</span> <span class="hljs-string">define-matrix</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">strategy:</span>
      <span class="hljs-attr">matrix:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">fromJSON(needs.define-matrix.outputs.matrix)</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">echo</span> <span class="hljs-string">&quot;Node version is $<span class="hljs-template-variable">{{ matrix.node }}</span>&quot;</span>
</code></pre>
<p>وحيلة المصفوفة الديناميكية تلك من الأنماط المتقدّمة القليلة التي تستحقّ المعرفة فعلًا. فهي تتيح لمهمة أن تكتشف العمل ولأخرى أن تتفرّع عليه، وهو مفيد في المستودعات الأحادية، وقوائم الأهداف المولَّدة، وخطوط النشر متعددة البيئات.</p>
<h2 id="المشغلات">المشغّلات</h2>
<p><a href="https://docs.github.com/actions/using-github-hosted-runners/about-github-hosted-runners">المشغّل</a> هو الآلة التي تنفّذ مهمة. والمشغّلات المستضافة من GitHub هي الآلات الافتراضية المُدارة. والمشغّلات الأكبر مشغّلات مستضافة من GitHub بمعالج وذاكرة وقرص أكبر. والمشغّلات المستضافة ذاتيًا هي آلاتك أنت. وActions Runner Controller، أو ARC، هو مشغّل Kubernetes لتنسيق المشغّلات المستضافة ذاتيًا وتوسيعها تلقائيًا كمجموعات مشغّلات.</p>
<p>واستهداف المشغّلات يجري عبر <a href="https://docs.github.com/actions/using-jobs/choosing-the-runner-for-a-job"><code>runs-on</code></a>. وللبنية التحتية المستضافة ذاتيًا، توصي GitHub باستخدام مصفوفة من الوسوم تبدأ بـ<code>self-hosted</code>، ثم وسوم أكثر تحديدًا مثل <code>linux</code> أو <code>ARM64</code>. ولن تعمل المهمة إلا على مشغّل يطابق كل الوسوم المحدّدة. ويمكنك أيضًا استهداف مجموعات مشغّلات. ومن العقبات التي تذكرها التوثيقات صراحةً أن Actions Runner Controller لا يدعم وسومًا متعددة ولا يدعم وسم <code>self-hosted</code> بالطريقة نفسها التي تدعمه بها المشغّلات المستضافة ذاتيًا على مستوى المستودع أو المؤسسة.</p>
<p>تشتري المشغّلات المستضافة ذاتيًا التحكّم، لكنها تشتري المخاطرة أيضًا. فلـ<a href="https://docs.github.com/actions/sharing-automations/creating-actions/creating-a-docker-container-action">إجراءات حاويات Docker</a> أو حاويات الخدمة على المشغّلات المستضافة ذاتيًا، تحتاج إلى Linux وDocker مثبّتين. وتحذّر توثيقات سياسات المؤسسات في GitHub أيضًا من أن المشغّلات المستضافة ذاتيًا ليست مضمونة كآلات نظيفة قصيرة العمر، وأن طلبات السحب غير الموثوقة قد تخترقها إن عرضتها للإصابة بإهمال. ولهذا فالنمط العاقل هو مشغّلات قصيرة العمر للأحمال الحساسة أو نصف غير الموثوقة، لا آلة واحدة خالدة يتقاسم الكتابة عليها كل فرع في الشركة.</p>
<h2 id="المهام-في-الحاويات-وحاويات-الخدمة">المهام في الحاويات وحاويات الخدمة</h2>
<p>يمكن أن تعمل المهمة مباشرةً على مضيف المشغّل، أو يمكنك تغليفها في <a href="https://docs.github.com/actions/using-jobs/running-jobs-in-a-container">حاوية مهمة</a> بـ<code>jobs.&lt;job_id&gt;.container</code>. وحين تفعل ذلك، تُنفَّذ خطوات <code>run:</code> العادية داخل تلك الحاوية، بينما تعمل إجراءات الحاويات كحاويات شقيقة على الشبكة نفسها بتركيبات الوسائط نفسها. ومن الحالات الطرفية التي يفوّتها كثيرون أن الصدفة الافتراضية داخل حاوية المهمة هي <code>sh</code> لا <code>bash</code>، إلا إن تجاوزتها.</p>
<p>و<a href="https://docs.github.com/actions/tutorials/communicating-with-docker-service-containers">حاويات الخدمة</a> هي الحل المدمج للاعتمادات مثل PostgreSQL أو Redis أثناء الاختبارات. وحين تعمل المهمة نفسها في حاوية، يضع GitHub حاوية المهمة وحاويات الخدمة على شبكة جسر يعرّفها المستخدم، ويمكنك الوصول إلى خدمة بالوسم الذي أعطيته لها، فيصبح اسم مضيفها. أما حين تعمل المهمة مباشرةً على مضيف المشغّل، فتحتاج عمومًا إلى نشر منافذ من حاوية الخدمة إلى المضيف.</p>
<pre><code class="language-yaml"><span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">integration:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">container:</span>
      <span class="hljs-attr">image:</span> <span class="hljs-string">node:20-bookworm</span>

    <span class="hljs-attr">services:</span>
      <span class="hljs-attr">postgres:</span>
        <span class="hljs-attr">image:</span> <span class="hljs-string">postgres:16</span>
        <span class="hljs-attr">env:</span>
          <span class="hljs-attr">POSTGRES_PASSWORD:</span> <span class="hljs-string">postgres</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v5</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">test</span>
        <span class="hljs-attr">env:</span>
          <span class="hljs-attr">DATABASE_URL:</span> <span class="hljs-string">postgres://postgres:postgres@postgres:5432/postgres</span>
</code></pre>
<p>وهذا الإعداد مرتّب لأن الشبكة أبسط حين تعيش المهمة والخدمات كلها في حاويات. كما يميل إلى أن يكون أكثر قابلية للتكرار من التظاهر بأن الحالة المحيطة بمضيف المشغّل جزء من عقد الاختبار.</p>
<h2 id="إعادة-استخدام-المنطق">إعادة استخدام المنطق</h2>
<table>
<thead>
<tr>
<th>آلية إعادة الاستخدام</th>
<th>النطاق</th>
<th>تُستدعى بـ</th>
<th>سياق المشغّل</th>
<th>الوصول إلى الأسرار</th>
<th>الأفضل لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td>إجراء (JS/Docker)</td>
<td>خطوة واحدة</td>
<td><code>uses:</code> في <code>steps</code></td>
<td>مشغّل المستدعي</td>
<td>عبر مدخلات <code>with:</code></td>
<td>عمليات قابلة لإعادة الاستخدام بخطوة واحدة</td>
</tr>
<tr>
<td>إجراء مركّب</td>
<td>حزمة خطوات</td>
<td><code>uses:</code> في <code>steps</code></td>
<td>مشغّل المستدعي</td>
<td>عبر مدخلات <code>with:</code></td>
<td>وصفات متعددة الخطوات كخطوة واحدة</td>
</tr>
<tr>
<td>سير عمل قابل لإعادة الاستخدام</td>
<td>مهام كاملة</td>
<td><code>uses:</code> على مستوى المهمة</td>
<td>مشغّل خاص بكل مهمة</td>
<td><code>secrets:</code> أو <code>secrets: inherit</code></td>
<td>أنماط مهام كاملة (بناء + نشر)</td>
</tr>
</tbody>
</table>
<p>يمكنك إعادة استخدام المنطق على ثلاثة مستويات. استخدم إجراءً حين تريد خطوة قابلة لإعادة الاستخدام. واستخدم <a href="https://docs.github.com/actions/creating-actions/creating-a-composite-action">إجراءً مركّبًا</a> حين تريد حزمة خطوات تظل تتصرف كخطوة واحدة. واستخدم سير عمل قابلًا لإعادة الاستخدام حين تريد إعادة استخدام مهام كاملة أو صلاحيات أو بيئات أو مصفوفات أو بنية نشر. ولهذا السبب بالتحديد تضع توثيقات GitHub نفسها الإجراءات المركّبة وسير العمل القابل لإعادة الاستخدام جنبًا إلى جنب.</p>
<p>ويمكن أن تعيش الإجراءات نفسها في المستودع ذاته، أو في مستودع عام، أو في صورة Docker Hub. ولا يدعم GitHub إعادة التوجيه للإجراءات أو سير العمل القابل لإعادة الاستخدام، فإن أُعيدت تسمية إجراء أو سير عمل أو نُقل، فشلت المراجع القديمة. وتستخدم الإجراءات المحلية مسارًا نسبيًا من <code>github.workspace</code>، ولهذا تحتاج دائمًا تقريبًا إلى <code>actions/checkout</code> أولًا قبل استدعاء إجراء محلي.</p>
<p>وتأتي <a href="https://docs.github.com/actions/creating-actions/about-custom-actions">الإجراءات المخصصة</a> بثلاثة أنواع. فإجراءات JavaScript هي عادةً الأسرع والأبسط للمنطق العادي. وإجراءات Docker تحزم بيئتها الخاصة وتفيد حين تحتاج أدوات محدّدة جدًا، لكن GitHub تلاحظ أنها أبطأ لأن الحاوية يجب أن تُبنى أو تُجلب. والإجراءات المركّبة مثالية حين لا تريد فعلًا سوى «هذه الخطوات الخمس معًا، في كل مرة».</p>
<p>و<a href="https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows">سير العمل القابل لإعادة الاستخدام</a> يُستدعى على مستوى المهمة بـ<code>uses:</code>—لا داخل <code>steps</code>. وتُمرَّر المدخلات بـ<code>with</code>، والأسرار بـ<code>secrets</code>، ويجب أن يعلن سير العمل المستدعى <code>on: workflow_call</code>. ويُوصَل إلى المدخلات في سير العمل المستدعى عبر سياق <code>inputs</code>، ولا تُحقن تلقائيًا كمتغيّرات بيئة. ويمكنك تمرير كل الأسرار المتاحة بـ<code>secrets: inherit</code> حين يكون المستدعي والمستدعى في المؤسسة أو المنشأة نفسها.</p>
<p>ولسير العمل القابل لإعادة الاستخدام أيضًا حوافّ حادة. فأنت تستطيع تداخل عشرة مستويات من سير العمل على الأكثر. ولا يمكن إلا الحفاظ على الصلاحيات أو تقليلها عبر السلسلة—لا رفعها أبدًا. ولا تنتقل الأسرار إلا خطوة واحدة في كل مرة، فإن استدعى A سير العمل B واستدعى B سير العمل C، فلا يحصل C على سرّ من A إلا إذا مرّره A إلى B ومرّره B بدوره إلى C. ويجب ربط مخرجات سير العمل من مخرجات الخطوات إلى مخرجات المهام ثم من مخرجات المهام إلى مخرجات سير العمل.</p>
<p>و<a href="https://docs.github.com/actions/sharing-automations/creating-workflow-templates-for-your-organization">قوالب سير العمل</a> على مستوى المؤسسة ميزة منفصلة. فإن وضعت القوالب في مستودع <code>.github</code> تملكه المؤسسة تحت <code>workflow-templates/</code>، استطاع GitHub عرضها حين ينشئ الناس سير عمل جديدة. وتعيش البيانات الوصفية للقالب في ملف مطابق <code>.properties.json</code>. وهي مفيدة لتوحيد سير عمل التمهيد عبر مستودعات كثيرة دون إجبار كل شيء على المرور عبر ملف سير عمل واحد عِملاق قابل لإعادة الاستخدام.</p>
<h2 id="الذاكرات-المؤقتة-والمخرجات-والملخصات">الذاكرات المؤقتة والمخرجات والملخصات</h2>
<table>
<thead>
<tr>
<th>الجانب</th>
<th>الذاكرة المؤقتة</th>
<th>المخرَج</th>
</tr>
</thead>
<tbody>
<tr>
<td>الغرض</td>
<td>إعادة استخدام الاعتمادات عبر التشغيلات</td>
<td>حفظ مخرجات البناء أو نقلها</td>
</tr>
<tr>
<td>المفتاح</td>
<td>مفتاح حتمي (مثل بصمة ملف القفل)</td>
<td>الاسم + معرّف التشغيل</td>
</tr>
<tr>
<td>العمر</td>
<td>يُطرد عند مطابقة مفتاح أو بعد 7 أيام افتراضيًا</td>
<td><code>retention-days</code> قابل للتهيئة</td>
</tr>
<tr>
<td>الاستخدام بين المهام</td>
<td>يُستعاد بالمفتاح في أي مهمة</td>
<td>يُنزَّل بالاسم في المهام اللاحقة</td>
</tr>
<tr>
<td>المحتوى المعتاد</td>
<td><code>node_modules</code> و<code>.cache</code> واعتمادات البناء</td>
<td>التغطية، والملفات الثنائية، ولقطات الشاشة، والسجلات</td>
</tr>
</tbody>
</table>
<p>تحلّ <a href="https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching">الذاكرات المؤقتة والمخرجات</a> مشكلتين مختلفتين. فالذاكرة المؤقتة لإعادة استخدام الاعتمادات أو الملفات الوسيطة عبر تشغيلات سير العمل، بمفتاح حتمي. و<a href="https://docs.github.com/en/actions/tutorials/store-and-share-data">المخرَج</a> حزمة ملفات مُسمّاة ينتجها تشغيل سير عمل—أشياء مثل تقارير التغطية، ونتائج الاختبارات، والملفات الثنائية، ولقطات الشاشة، أو مخرجات البناء التي تريد حفظها أو فحصها أو تسليمها إلى مهمة لاحقة. والخلط بين الاثنين من أخطاء GitHub Actions الكلاسيكية.</p>
<p>وفي التخزين المؤقت، الآلية المهمة هي ترتيب البحث. فيبحث <code>actions/cache</code> عن <code>key</code> مطابق تمامًا أولًا، ثم يجرّب <code>restore-keys</code> من الأكثر تحديدًا إلى الأقل، وعند المطابقات الجزئية يستخدم أحدث ذاكرة مؤقتة أُنشئت. وهذا يجعل بصمات ملفات القفل الأساس المعتاد لمفاتيح الذاكرة المؤقتة، مع بادئات أوسع كبدائل.</p>
<p>وتُرفع المخرجات بـ<code>actions/upload-artifact</code> وتُنزَّل بـ<code>actions/download-artifact</code>. ويمكنك تسميتها، وضبط <code>retention-days</code>، وتنزيل كل المخرجات من تشغيل أو مخرَج مُسمّى واحد فقط، واستخدام المخرجات لنقل الملفات بين المهام. وإن أردت تنزيل مخرجات من تشغيل آخر أو سير عمل آخر، فتحتاج رمز وصول ومعرّف تشغيل.</p>
<p>ويدعم GitHub Actions أيضًا <a href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands">ملخصات المهام</a> عبر <code>GITHUB_STEP_SUMMARY</code>. وعند انتهاء المهمة، يجمع GitHub ملخصات الخطوات في ملخص مهمة واحد في صفحة تشغيل سير العمل. وهذا رائع للتقارير المقروءة بشريًا—إجماليات الاختبارات، ونسب التغطية، والروابط، وملاحظات النشر—كي لا يضطر الناس إلى التجوّل في السجلات كأنهم سكّان أنفاق.</p>
<h2 id="المصفوفات-والتوازي-والتحكم-في-التزامن">المصفوفات والتوازي والتحكم في التزامن</h2>
<p><a href="https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow">المصفوفات</a> هي كيفية توزيع مهمة منطقية واحدة على توليفات كثيرة من المتغيّرات مثل نظام التشغيل، أو إصدار وقت التشغيل، أو المنطقة، أو البيئة الهدف. ويمكنك تنقيحها بـ<code>include</code> و<code>exclude</code>، ويُعالَج <code>include</code> بعد <code>exclude</code>، ما يعني أنك تستطيع إعادة إضافة حالات خاصة عن قصد. ويمكنك أيضًا التحكم في السلوك بـ<code>fail-fast</code> و<code>continue-on-error</code>. وقيمة <code>fail-fast</code> الافتراضية <code>true</code>، فقد يلغي إخفاق صلب واحد مهام المصفوفة الشقيقة المنتظرة أو الجارية.</p>
<p>ويمكنك أيضًا تقييد المصفوفة بـ<code>max-parallel</code>، وهو مفيد حين تكون مشغّلاتك شحيحة أو تصطدم المهمة بحدّ معدّل خارجي. وتوثّق GitHub أيضًا حدًّا صلبًا للمصفوفة عند 256 مهمة لكل تشغيل سير عمل، فالإجابة عن «هل أستطيع توليد مصفوفة بـ900 مسار لأنها تبدو أنيقة» هي، والحمد لله، لا.</p>
<p>و<a href="https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs"><code>concurrency</code></a> هو سطح التحكم الكبير الآخر. وتضمن مجموعة التزامن ألا يعمل في وقت واحد إلا سير عمل أو مهمة واحد في تلك المجموعة، ويمكن لتشغيل جديد بالمفتاح نفسه أن يلغي القديم. وهذا مفيد خصوصًا لعمليات النشر، أو CI القائم على الفروع، أو سير عمل طويلة الأمد لا يهمّ فيها إلا أحدث تشغيل.</p>
<h2 id="عمليات-النشر-والبيئات">عمليات النشر والبيئات</h2>
<p><a href="https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments">البيئات</a> هي حواجز النشر في GitHub Actions. فيمكنك ربط مهمة ببيئة، وتخزين أسرار ومتغيّرات خاصة بالبيئة، وفرض قواعد حماية النشر مثل الموافقات اليدوية، ومؤقّتات الانتظار، وقيود الفروع، وحتى قواعد حماية مخصصة عبر تطبيقات GitHub. وعلى المهمة التي تشير إلى بيئة أن تستوفي تلك القواعد قبل أن تعمل أو تصل إلى أسرار البيئة.</p>
<p>هنا يصبح GitHub Actions منصّة نشر فعلية بدل «CI بوصول إلى الصدفة». فيمكنك فصل <code>staging</code> عن <code>production</code>، وطلب مراجعين للإنتاج، وتسلسل استخدام البيئة بـ<code>concurrency</code>. وتلاحظ <a href="https://docs.github.com/en/actions/reference/limits">توثيقات الحدود</a> في GitHub أيضًا أن تشغيلات سير العمل قد تنتظر حتى 30 يومًا على موافقات البيئة، وهو إما ميزة مؤسسية مفيدة وإما نصب تذكاري لتردّد تنظيمي، حسب مكتبك.</p>
<p>وهذه مهمة نشر نموذجية:</p>
<pre><code class="language-yaml"><span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">needs:</span> <span class="hljs-string">test</span>
    <span class="hljs-attr">environment:</span> <span class="hljs-string">production</span>
    <span class="hljs-attr">concurrency:</span>
      <span class="hljs-attr">group:</span> <span class="hljs-string">deploy-production</span>
      <span class="hljs-attr">cancel-in-progress:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">permissions:</span>
      <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>
      <span class="hljs-attr">id-token:</span> <span class="hljs-string">write</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v5</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Authenticate</span> <span class="hljs-string">to</span> <span class="hljs-string">cloud</span> <span class="hljs-string">with</span> <span class="hljs-string">OIDC</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">aws-actions/configure-aws-credentials@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">role-to-assume:</span> <span class="hljs-string">arn:aws:iam::123456789012:role/gha-prod</span>
          <span class="hljs-attr">aws-region:</span> <span class="hljs-string">us-east-1</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">./deploy.sh</span>
</code></pre>
<p>والجزء المهم ليس إجراء السحابة نفسه. بل الشكل—بيئة صريحة، وتزامن صريح، وصلاحيات رمز صريحة. هذه هي النسخة الناضجة من أتمتة النشر.</p>
<h2 id="الأمان">الأمان</h2>
<p>يبدأ أمان GitHub Actions من <code>GITHUB_TOKEN</code>. وتوصي GitHub بمنحه الحد الأدنى من الصلاحيات المطلوبة، ويقول <a href="https://docs.github.com/en/actions/reference/security/secure-use">مرجع الاستخدام الآمن</a> صراحةً إن الافتراضي الجيد وصول للقراءة فقط إلى محتويات المستودع، ثم رفع الصلاحيات للمهام التي تحتاج أكثر فعلًا فقط. وهناك قاعدة أخرى يسهل تفويتها—إن حدّدت أي صلاحية صراحةً، أصبحت أي صلاحية لم تحدّدها <code>none</code>.</p>
<p>كما يستطيع أي إجراء الوصول إلى <code>GITHUB_TOKEN</code> عبر <code>github.token</code> حتى إن لم تمرّر له <code>secrets.GITHUB_TOKEN</code> صراحةً. ولهذا تكون كتل <code>permissions:</code> على مستوى المهمة بهذه الأهمية. فالرمز موجود سواء تذكّرته أم لا. كما <a href="https://docs.github.com/actions/reference/authentication-in-a-workflow">تخفض</a> GitHub صلاحيات طلبات السحب الواردة من تفرّعات إلى القراءة فقط في الحالة الشائعة، وتعمل سير عمل طلبات السحب التي يُحفّزها Dependabot كما لو جاءت من تفرّع—<code>GITHUB_TOKEN</code> للقراءة فقط، وبلا أسرار.</p>
<p>و<a href="https://docs.github.com/en/actions/concepts/security/secrets">الأسرار</a> تستحق ثقة أقل قليلًا مما يمنحها الناس. فتقول GitHub إن الأسرار متغيّرات مخزّنة على مستوى المؤسسة أو المستودع أو البيئة، ولا تحصل سير عمل على الوصول إليها إلا حين تضمّنها صراحةً. لكن GitHub تحذّر أيضًا من أن الحجب التلقائي غير مضمون في كل التحويلات، وتشير إرشادات الاستخدام الآمن لديهم إلى أن كل من يملك وصول كتابة إلى المستودع يملك وصول قراءة إلى كل أسرار المستودع. وللقيم المولَّدة أو غير السرية التي ما زالت تحتاج إخفاءً، استخدم <code>::add-mask::</code>.</p>
<p>و<a href="https://docs.github.com/en/actions/concepts/security/script-injections">حقن الشيفرة</a> هو الفخ الكبير التالي. فتحذّر توثيقات الأمان في GitHub صراحةً من أن بيانات يتحكم بها المهاجم قد تتدفّق عبر سياقات مثل <code>github.event.issue.title</code> أو <code>github.event.pull_request.body</code>. وإن أدخلت تلك القيم مباشرةً في نص صدفة، قيّمت GitHub التعبير أولًا ثم فسّرت الصدفة النتيجة، وهكذا يحدث حقن الأوامر. والنمط الأكثر أمانًا هو تمرير القيم غير الموثوقة كمدخلات إجراء أو عبر متغيّرات بيئة وتنصيصها بشكل صحيح.</p>
<p>وإجراءات وسير عمل الأطراف الثالثة مخاطرة في سلسلة التوريد. ومرجع الاستخدام الآمن في GitHub صريح—فإجراء طرف ثالث واحد مخترق قد يكشف أسرار المستودع ويسيء استخدام <code>GITHUB_TOKEN</code>. والتخفيف الموصى به هو تثبيت الإجراءات على بصمة إيداع كاملة الطول، وهي ما تسمّيها الشكل الوحيد غير القابل للتغيير لإصدار إجراء. فالوسوم مريحة، لكنها قابلة للتحريك. وتتيح GitHub أيضًا للمؤسسات والمستودعات فرض سياسات تحدّ من الإجراءات وسير العمل القابل لإعادة الاستخدام المسموح بها، بل واشتراط تثبيت البصمات كاملة الطول.</p>
<p>ويستحق <code>CODEOWNERS</code> أن يُستخدم لـ<code>.github/workflows</code>. فـGitHub توصي به صراحةً كطريقة لطلب مراجعة تغييرات سير العمل. وهي من أرخص الطرق لمنع «تعديلات YAML الصغيرة» من تغيير نموذجك الأمني بهدوء.</p>
<p>و<a href="https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect">OIDC</a> هو الافتراضي الصحيح لمصادقة السحابة الآن. فتقول توثيقات GitHub إن سير العمل يمكنه استخدام رموز OIDC بدل أسرار سحابية طويلة العمر، ويتطلب الإعداد تغييرين كبيرين—ضبط مزوّد السحابة ليثق بـGitHub كهوية موحّدة، وتحديث سير العمل لطلب رمز الهوية وتبادله عبر إجراء المزوّد أو منطق مكافئ. وعمليًا يعني ذلك <code>permissions: id-token: write</code> في المهمة التي تحتاج وصولًا إلى السحابة.</p>
<p>ويدعم GitHub أيضًا <a href="https://docs.github.com/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds">إثباتات المخرجات</a> لإثبات منشأ البناء. ولتوليدها في Actions، تتطلب GitHub الصلاحيات الصحيحة، بما فيها <code>id-token: write</code> و<code>contents: read</code> و<code>attestations: write</code>، ثم خطوة تستخدم <code>actions/attest-build-provenance</code>. وهي مفيدة حين تريد إثبات منشأ موقّعًا للملفات الثنائية أو صور الحاويات أو قوائم SBOM لا مجرد انطباعات وملاحظة إصدار.</p>
<h2 id="حدود-تهم-عمليا">حدود تهمّ عمليًا</h2>
<p>لـGitHub Actions <a href="https://docs.github.com/en/actions/reference/limits">حدود منصّة</a> حقيقية، والتظاهر بغير ذلك هو ما ينتهي به الناس إلى اكتشافها في الإنتاج. فقد يستمر تشغيل سير العمل حتى 35 يومًا في المجموع. وقد يمتد انتظار موافقة البيئة حتى 30 يومًا. وقد تعمل مهمة مستضافة من GitHub حتى 6 ساعات، ومهمة مستضافة ذاتيًا حتى 5 أيام. وقد تولّد المصفوفة 256 مهمة على الأكثر. ولعمليات الذاكرة المؤقتة حدود معدّل أيضًا، ولـ<code>GITHUB_TOKEN</code> حدّ معدّل خاص بواجهة برمجة التطبيقات—1,000 طلب في الساعة لكل مستودع، أو 15,000 للموارد التابعة لحساب GitHub Enterprise Cloud.</p>
<p>وينبغي لهذه الحدود أن تشكّل تصميمك. فمصفوفات الاختبار الضخمة جدًا ينبغي تقليمها أو تقطيعها. ومهام النشر ينبغي أن تستخدم مجموعات تزامن. والعمل طويل الأمد لا ينبغي أن يعيش على مشغّلات GitHub المستضافة القياسية إلا إذا اتّسع داخل الصندوق الزمني. وإن كان لديك إجراء أو سكربت ينهال على واجهة GitHub، فحدّ المعدّل ليس هاجسًا نظريًا—إنه علّة جدولة تنتظر الحدوث.</p>
<h2 id="أنماط-عملية-تصمد">أنماط عملية تصمد</h2>
<p>في CI العادي، استخدم سير عمل منفصلة للهموم المنفصلة—واحد لـCI، وواحد للإصدار، وواحد للنشر، وواحد للصيانة المجدولة—بدل ملف واحد عِملاق يفعل كل شيء. فنموذج الأحداث ومرشّحات المسارات وسير العمل القابل لإعادة الاستخدام في GitHub جيدة بما يكفي لأن يكون «سير العمل الواحد الضخم» في العادة مجرد إخفاق في ضبط النفس، لا متطلبًا منصّيًا.</p>
<p>ولمعايير المؤسسة، فضّل سير العمل القابل لإعادة الاستخدام لأنماط المهام الكاملة مثل «البناء والفحص»، أو «النشر إلى بيئة»، أو «نشر حزمة»، واستخدم الإجراءات المركّبة لحزم الخطوات الصغيرة مثل «تهيئة سلسلة الأدوات والمصادقة مع سجل الحزم». وهذا التقسيم يتماشى جيدًا مع الطريقة التي صمّمت بها GitHub هذه الميزات، ويمنع نموذج إعادة الاستخدام لديك من التحوّل إلى منحوتة YAML تجريدية.</p>
<p>وللأمان، ابدأ بصلاحيات <code>GITHUB_TOKEN</code> مقيّدة، وثبّت إجراءات الأطراف الثالثة على بصمات كاملة، وتجنّب المُحفّزات ذات الامتيازات مع سحب شيفرة غير موثوقة، وانقل مصادقة السحابة إلى OIDC، وضع CODEOWNERS على <code>.github/workflows</code>. هذا ليس مبالغة. بل هو الحد الأدنى لئلا تسلّم وصول الكتابة والأسرار لأي إجراء عشوائي من السوق بدا شائعًا في الثانية فجرًا.</p>
<p>وللأداء، استخدم مرشّحات المسارات، والمصفوفات فقط حيث تشتري تغطية حقيقية، وذاكرات مؤقتة بمفاتيح من ملفات القفل، ومجموعات تزامن لسير عمل الفروع والنشر، ومخرجات فقط للأشياء التي تحتاج حفظها فعلًا. فالذاكرات المؤقتة لإعادة الاستخدام عبر التشغيلات. والمخرجات للحفظ والنقل. وخلط هذين النموذجين الذهنيين هو كيف تصبح سير عمل أبطأ وأصعب في الفهم في الوقت نفسه. إنجاز بشري مذهل.</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<p><strong>افتراض أن <code>pull_request</code> يعمل على إيداع رأس المساهم بالضبط.</strong> وهو عادةً لا يفعل—فـ<code>GITHUB_SHA</code> يشير إلى إيداع الدمج في فرع دمج طلب السحب. وإن احتجت بصمة رأس المساهم، فاستخدم <code>github.event.pull_request.head.sha</code>.</p>
<p><strong>افتراض أن كل شيء في سير العمل المستدعى القابل لإعادة الاستخدام يظهر كمتغيّرات بيئة.</strong> وهو لا يظهر. فمدخلات <code>jobs.&lt;job_id&gt;.with</code> التي تُمرَّر إلى سير عمل قابل لإعادة الاستخدام متاحة عبر سياق <code>inputs</code> في سير العمل المستدعى، لا كمتغيّرات بيئة افتراضيًا.</p>
<p><strong>افتراض أن <code>env:</code> يتصرف كلغة برمجة نصية.</strong> وهو لا يتصرف كذلك. ففي صيغة سير العمل، لا يمكن تعريف المتغيّرات في خريطة <code>env</code> نفسها بالاعتماد على بعضها بعضًا، ويستخدم GitHub النطاق الأكثر تحديدًا عند تعارض الأسماء.</p>
<p><strong>نسيان أن الإجراءات المحلية تعيش تحت <code>github.workspace</code>.</strong> فإن أردت <code>uses: ./.github/actions/my-action</code>، فتحتاج المستودع مسحوبًا أولًا، والمسار نسبي إلى مساحة العمل المسحوبة لا إلى ملف سير العمل لديك.</p>
<p><strong>افتراض أن إعادة تسمية الإجراءات غير مؤذية.</strong> فGitHub لا تدعم صراحةً إعادة التوجيه للإجراءات أو سير العمل القابل لإعادة الاستخدام، فإن تغيّر المالك أو الاسم، فشلت مراجع سير العمل القديمة. وسبب إضافي لتثبيت الاعتمادات عن قصد وعدم معاملة مراجع السوق كقوانين طبيعية دائمة.</p>
<p><strong>افتراض أن الأسرار تتدفّق تلقائيًا عبر سلاسل سير العمل القابل لإعادة الاستخدام.</strong> وهي لا تتدفّق. فالأسرار لا تنتقل إلا إلى سير العمل المستدعاة مباشرةً إلا إن مرّرت صراحةً في كل خطوة.</p>
<p><strong>افتراض أن المهام داخل الحاويات تتصرف كخوادم Linux عادية.</strong> ففي مهمة داخل حاوية، الصدفة الافتراضية لـ<code>run:</code> هي <code>sh</code> لا <code>bash</code>، وهذه طريقة فعّالة جدًا لاكتشاف مدى اعتماد سكربتاتك على خصائص Bash أقسمت أنها محمولة.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>GitHub Actions سهل في البداية وجدّي في التشغيل. وهو على نطاق صغير أداة أتمتة لطيفة قائمة على YAML. وعلى نطاق أكبر يصبح تصميم سير عمل، واستراتيجية مشغّلات، وتحديد نطاق الرمز، ونظافة سلسلة التوريد، واتحاد سحابي، وسياسة نشر—كلها متنكّرة في هيئة نظام CI. والفرق التي تنجح فيه ليست التي تكتب أذكى YAML. بل التي تعامل Actions كبنية تحتية إنتاجية، لأنها كذلك.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="النموذج-الذهني">النموذج الذهني</h3>
<blockquote>
<p>سير العمل يحتوي مهام. والمهام تحتوي خطوات. وتعمل المهام بمعزل على مشغّلات منفصلة.</p>
</blockquote>
<ul>
<li><strong>سير العمل:</strong> يُحفّزه حدث. ويعيش في <code>.github/workflows/</code>.</li>
<li><strong>المهمة:</strong> تعمل على مشغّل جديد. وتمرّر الحالة إلى مهام أخرى صراحةً عبر <code>outputs</code> و<code>needs</code>.</li>
<li><strong>الخطوة:</strong> تُنفَّذ تتابعيًا داخل المهمة. وتتشارك نظام الملفات مع بقية الخطوات في المهمة نفسها.</li>
<li>تتدفّق الحالة <em>داخل</em> المهمة عبر <code>GITHUB_ENV</code> و<code>GITHUB_OUTPUT</code>. وتتدفّق <em>بين</em> المهام عبر <code>needs.job_id.outputs</code>.</li>
</ul>
<hr>
<h3 id="دلالات-المحفزات">دلالات المُحفّزات</h3>
<blockquote>
<p>ليست كل المُحفّزات متساوية.</p>
</blockquote>
<table>
<thead>
<tr>
<th>المُحفّز</th>
<th>يعمل على</th>
<th>هل يملك أسرارًا؟</th>
<th>مستوى الخطر</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>push</code></td>
<td>الإيداع المدفوع</td>
<td>نعم</td>
<td>منخفض</td>
</tr>
<tr>
<td><code>pull_request</code></td>
<td>بصمة إيداع الدمج</td>
<td>للقراءة فقط</td>
<td>منخفض</td>
</tr>
<tr>
<td><code>pull_request_target</code></td>
<td>الفرع الأساس</td>
<td>كاملة</td>
<td>مرتفع</td>
</tr>
<tr>
<td><code>workflow_dispatch</code></td>
<td>محفّز يدوي</td>
<td>نعم</td>
<td>منخفض</td>
</tr>
</tbody>
</table>
<ul>
<li>يستخدم <code>pull_request</code> <em>إيداع الدمج</em> لا إيداع الرأس. ولهذا لا تطابق البصمة ما دفعته.</li>
<li>يعمل <code>pull_request_target</code> بأسرار كاملة على الفرع <em>الأساس</em>—لا تسحب شيفرة غير موثوقة هنا أبدًا.</li>
</ul>
<hr>
<h3 id="آليات-إعادة-الاستخدام">آليات إعادة الاستخدام</h3>
<blockquote>
<p>ثلاثة مستويات لإعادة الاستخدام، لكل منها مقايضاته.</p>
</blockquote>
<table>
<thead>
<tr>
<th>الآلية</th>
<th>النطاق</th>
<th>الوصول إلى الأسرار</th>
<th>معرّفة في</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الإجراء</strong></td>
<td>خطوة واحدة</td>
<td>المستدعي</td>
<td><code>action.yml</code></td>
</tr>
<tr>
<td><strong>الإجراء المركّب</strong></td>
<td>متعددة الخطوات</td>
<td>المستدعي</td>
<td><code>action.yml</code></td>
</tr>
<tr>
<td><strong>سير العمل القابل لإعادة الاستخدام</strong></td>
<td>مهام كاملة</td>
<td>المستدعي + الخاصة به</td>
<td><code>.github/workflows/</code></td>
</tr>
</tbody>
</table>
<ul>
<li>الإجراءات أصغر وحدة—خطوة واحدة، وهمّ واحد.</li>
<li>الإجراءات المركّبة تحزم خطوات متعددة لكنها لا تستطيع تعريف مهام أو أسرار.</li>
<li>سير العمل القابل لإعادة الاستخدام يستطيع تعريف مخططات مهام كاملة بكتل <code>permissions</code> الخاصة بها.</li>
</ul>
<hr>
<h3 id="أساسيات-الأمان">أساسيات الأمان</h3>
<blockquote>
<p>الإعدادات الافتراضية متسامحة. شدّدها.</p>
</blockquote>
<ul>
<li>اضبط <code>permissions</code> على <code>read-all</code> أو أضيق على مستوى سير العمل. لا تتّكل على إعدادات المستودع الافتراضية.</li>
<li>ثبّت إجراءات الأطراف الثالثة على بصمات إيداع كاملة لا وسوم. فالوسوم قابلة للتغيير.</li>
<li>لا تشغّل <code>pull_request_target</code> أبدًا و<code>actions/checkout</code> موجّه إلى <code>github.event.pull_request.head.ref</code>.</li>
<li>استخدم OIDC لمصادقة السحابة بدل أسرار اعتماد طويلة العمر.</li>
<li>عامل <code>\${{ github.event.*.title }}</code> والحقول الأخرى التي يتحكم بها المستخدم كنواقل حقن—واستخدم دائمًا متغيّرات بيئة وسيطة.</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:o,html:c};export{s as book,n as chapter,t as chapterTitle,p as default,o as headings,c as html,a as slug,e as title};
