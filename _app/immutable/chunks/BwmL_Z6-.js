const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",p="turborepo",t="Turborepo: مشغّل المهام المدرك للمخططات والتخزين المؤقت",o=[{depth:2,id:"ما-الغرض-الحقيقي-من-turborepo",text:"ما الغرض الحقيقي من Turborepo"},{depth:2,id:"النموذج-الذهني-الأساسي",text:"النموذج الذهني الأساسي"},{depth:2,id:"إعداد-افتراضي-جيد",text:"إعداد افتراضي جيد"},{depth:2,id:"كيف-يعمل-تنسيق-المهام-فعليا",text:"كيف يعمل تنسيق المهام فعليًا"},{depth:2,id:"التخزين-المؤقت-هو-الميزة-الحقيقية",text:"التخزين المؤقت هو الميزة الحقيقية"},{depth:2,id:"متغيرات-البيئة-هي-حيث-يحيا-صواب-التخزين-المؤقت-أو-يموت",text:"متغيّرات البيئة هي حيث يحيا صواب التخزين المؤقت أو يموت"},{depth:2,id:"الحزم-والاعتمادات-وبنية-المستودع",text:"الحزم والاعتمادات وبنية المستودع"},{depth:2,id:"إعدادات-الحزم",text:"إعدادات الحزم"},{depth:2,id:"تشغيل-عمل-أقل",text:"تشغيل عمل أقل"},{depth:2,id:"التطوير-المحلي-ووضع-المراقبة",text:"التطوير المحلي ووضع المراقبة"},{depth:2,id:"التكامل-المستمر-والتخزين-المؤقت-البعيد-وdocker",text:"التكامل المستمر والتخزين المؤقت البعيد وDocker"},{depth:2,id:"التنقيح-وفهم-المستودع",text:"التنقيح وفهم المستودع"},{depth:2,id:"الحدود-والحكامة",text:"الحدود والحكامة"},{depth:2,id:"مساحات-العمل-أحادية-الحزمة-لا-تزال-صالحة",text:"مساحات العمل أحادية الحزمة لا تزال صالحة"},{depth:2,id:"كيف-تضعف-الفرق-turborepo-عادة",text:"كيف تُضعف الفرق Turborepo عادةً"},{depth:2,id:"متى-يكون-turborepo-هو-الجواب-الصحيح",text:"متى يكون Turborepo هو الجواب الصحيح"}],c=`<p>Turborepo هو نظام البناء من Vercel لقواعد شيفرة JavaScript وTypeScript. صُمم للمستودعات الأحادية، لكن <a href="https://turborepo.dev/docs/getting-started/add-to-existing-repository">الوثائق الرسمية</a> واضحة جدًا في أنه يعمل أيضًا مع مساحات العمل أحادية الحزمة. وثمة تفصيلة تخص الإصدار الحالي يجدر إزاحتها عن الطريق فورًا: إعداد Turborepo الحديث يستخدم <code>tasks</code> في <code>turbo.json</code>. وإن صادفت مقالات أقدم تستخدم <code>pipeline</code> فأنت تقرأ مواد قديمة، بل إن أدوات الترميز الرسمية تتضمن ترحيلًا باسم <code>rename-pipeline</code> للإصدار 2.x. أما الإنترنت، بطبيعة الحال، فيظل مليئًا بالحطام الأثري.</p>
<p>كما أن Turborepo ليس مدير حزم، ولا بديلًا عن مساحات العمل، ولا الجهة التي تحل الاعتمادات. تقول الوثائق الرسمية إنه مبني فوق مساحات عمل مدير الحزم، وتقول صراحةً إن تثبيت الاعتمادات وربطها وحل الوحدات تبقى مهمة مدير الحزم. فـTurborepo يجلس فوق تلك الطبقة ويحسّن تنفيذ المهام وترتيبها والتخزين المؤقت.</p>
<h2 id="ما-الغرض-الحقيقي-من-turborepo">ما الغرض الحقيقي من Turborepo</h2>
<p>أقصر تعريف دقيق: يأخذ Turborepo مخطط الحزم الموجود لديك في مساحة العمل، ويتيح لك تعريف مخطط مهام فوقه، ثم يشغّل تلك المهام بأسرع ما يمكن عبر التوازي والترتيب المدرك للاعتمادات والتخزين المؤقت. و<a href="https://turborepo.dev/repo/docs/core-concepts/package-and-task-graph">تصف الوثائق</a> مخطط الحزم بأنه نابع من علاقات الاعتماد الداخلية في مدير الحزم، ومخطط المهام بأنه الرسم البياني الموجّه غير الحلقي (DAG) الذي تعرّفه في <code>turbo.json</code> عبر <code>dependsOn</code>.</p>
<p>ويهم هذا النموذج الذي يضع مخطط الحزم أولًا لأن Turborepo مدرك لمساحة العمل جوهريًا. فإذا كان <code>apps/web</code> يعتمد على <code>@repo/ui</code>، وكان لكل منهما مهمة <code>build</code>، فإن <code>&quot;dependsOn&quot;: [&quot;^build&quot;]</code> تعني أن بناء حزمة الواجهة يجب أن يكتمل قبل أن يبدأ بناء التطبيق. وتشير الوثائق أيضًا إلى حالة دقيقة تسمى <strong>عقدة العبور (transit node)</strong>: إذا لم تكن لحزمة وسيطة مهمتها الخاصة، فلا يزال بإمكان Turborepo المرور عبرها للوصول إلى الاعتمادات التي تملك مهامًا. ولهذا يبدو أذكى من الأدوات التي «تشغّل كل النصوص في كل المجلدات».</p>
<h2 id="النموذج-الذهني-الأساسي">النموذج الذهني الأساسي</h2>
<p>يبدأ أي Turborepo سليم بتخطيط مساحة عمل عادي. ويعتمد <a href="https://turborepo.dev/docs/guides/workspaces">الإرشاد الرسمي</a> البنية المعتادة <code>apps/*</code> و<code>packages/*</code>، مع <code>package.json</code> جذري وملف قفل و<code>turbo.json</code> جذري. ويمكن إضافة Turborepo تدريجيًا إلى مستودع قائم، وهو يعتمد في مساحات العمل متعددة الحزم على تعريفات مساحة العمل التي يفهمها مدير الحزم لديك مسبقًا.</p>
<p>خط أساس جيد:</p>
<pre><code>repo/
  apps/
    web/
    docs/
  packages/
    ui/
    utils/
    eslint-config/
    typescript-config/
  package.json
  pnpm-workspace.yaml
  turbo.json
</code></pre>
<p>هذا الشكل ليس إلزاميًا، لكنه يطابق الأمثلة الرسمية وينسجم مع الطريقة التي يفكر بها Turborepo في حزم التطبيقات وحزم المكتبات. وتوصي الوثائق أيضًا بأن تكون حزم التطبيقات هي «نهاية» مخطط الحزم، مع حزم المكتبات أو الحزم الداخلية التي تسندها لا العكس.</p>
<h2 id="إعداد-افتراضي-جيد">إعداد افتراضي جيد</h2>
<p>إذا أردت نقطة انطلاق واحدة تصمد أمام الاحتكاك مع الواقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://turborepo.dev/schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;globalDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;.env&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;tsconfig.base.json&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;globalEnv&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;NODE_ENV&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;envMode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;strict&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;^build&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;outputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dist/**&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;.next/**&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;!.next/cache/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;check-types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;^check-types&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;outputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;coverage/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;cache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;persistent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا يعمل لأنه يُنمذج الأمور الثلاثة التي يهمها Turborepo أكثر من غيرها: ترتيب الاعتمادات، والمخرجات القابلة للتخزين المؤقت، وأي المهام عمليات طويلة الأمد غير قابلة للتخزين المؤقت عن قصد. و<a href="https://turborepo.dev/repo/docs/crafting-your-repository/configuring-tasks">توصي الوثائق</a> باستخدام <code>dependsOn</code> للترتيب، و<code>outputs</code> لاستعادة الملفات عند إصابات الذاكرة المؤقتة، و<code>cache: false</code> مع <code>persistent: true</code> لخوادم التطوير وغيرها من المهام التي لا تنتهي.</p>
<h2 id="كيف-يعمل-تنسيق-المهام-فعليا">كيف يعمل تنسيق المهام فعليًا</h2>
<p>كل مفتاح في كائن <code>tasks</code> الجذري هو مهمة يستطيع Turborepo تشغيلها، ويبحث Turborepo عن نصوص برمجية بأسماء مطابقة في ملفات <code>package.json</code> الخاصة بالحزم. لذا فإن <code>turbo run build</code> تعني «اعثر على كل حزمة فيها نص <code>build</code>، ثم شغّلها وفق مخطط المهام». وتلاحظ الوثائق أيضًا أن <code>turbo run</code> لها اسم مستعار هو <code>turbo</code>، لكنها <a href="https://turborepo.dev/repo/docs/reference/configuration">توصي</a> باستخدام الصيغة الصريحة <code>turbo run</code> في CI لتفادي تضارب أسماء الأوامر الفرعية مستقبلًا.</p>
<p>أهم أنماط <code>dependsOn</code> بسيطة. فـ<code>&quot;^build&quot;</code> تعني «شغّل هذه المهمة في حزم الاعتماد أولًا»، و<code>&quot;build&quot;</code> تعني «شغّل مهمة أخرى في الحزمة نفسها أولًا»، و<code>&quot;utils#build&quot;</code> تعني «شغّل مهمة هذه الحزمة تحديدًا أولًا»، ويمكنك أيضًا استهداف مهمة بعينها في الإعداد الجذري مثل <code>&quot;web#lint&quot;</code>. وتقدم الوثائق الأنماط الثلاثة لأنها المفردات الحقيقية لمخطط المهام.</p>
<p>ويوازي Turborepo بين المهام بقوة أيضًا. وتقدم الوثائق ذلك صراحةً كسبب رئيسي لسرعته: فبدلًا من إجبار المستودع على تسلسل واحد عملاق مثل «افحص كل شيء، ثم ابنِ كل شيء، ثم اختبر كل شيء»، يشغّل كل ما يمكن تشغيله بأمان على التوازي ولا يحترم إلا الحواف في مخطط المهام حيث يهم الترتيب فعلًا.</p>
<p>وثمة أيضًا بعض أدوات التحكم المتقدمة في المهام التي تهم كثيرًا في المستودعات الحقيقية. فـ<code>persistent: true</code> يعلّم المهمة بأنها طويلة الأمد، ما يعني أن المهام الأخرى لا تستطيع الاعتماد عليها لأنها لا تنتهي أبدًا. و<code>interactive: true</code> يتيح لها قبول المدخلات من الطرفية. و<code>interruptible: true</code> يسمح لـ<code>turbo watch</code> بإعادة تشغيل مهمة دائمة. و<code>with</code> يتيح لك القول «كلما شغّلت هذه المهمة، شغّل هذه المهام الأخرى إلى جانبها»، وهو مفيد بشكل خاص لخوادم التطوير التي ينبغي أن تبدأ معًا.</p>
<p>إعداد تطوير شائع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;persistent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;cache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;with&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;api#dev&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test:watch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;persistent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;interactive&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;interruptible&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;cache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يتبع هذا الإعداد <a href="https://turborepo.dev/docs/reference/configuration">الإرشاد الرسمي</a> للمهام طويلة الأمد أفضل بكثير من محاولة إجبار <code>dev</code> على التصرف كخطوة بناء عادية قابلة للتخزين المؤقت. فـTurborepo سريع، لكنه يظل يفهم أن عملية خادم لا تنتهي ليست اعتمادًا عاديًا. ضبط مفاجئ من البرمجيات، للمرة الأولى.</p>
<h2 id="التخزين-المؤقت-هو-الميزة-الحقيقية">التخزين المؤقت هو الميزة الحقيقية</h2>
<p>الميزة البارزة ليست «دعم المستودعات الأحادية»، بل التخزين المؤقت. فـ<a href="https://turborepo.dev/repo/docs/crafting-your-repository/caching">وثائق التخزين المؤقت</a> عند Turborepo تصف التخزين المؤقت بأنه استعادة نتائج المهام من بصمة للمدخلات بدلًا من تكرار العمل، وهي صريحة في أن المهام يُفترض أن تكون حتمية. وإذا كانت مهمة ما قادرة على إنتاج مخرجات مختلفة انطلاقًا من مدخلات لا يعلمها Turborepo، فقد يختل صواب التخزين المؤقت. وهذه هي اللعبة كلها: سرعة عندما يكون كل شيء حتميًا، وهراء عندما يكون العمل رخوًا.</p>
<p>يخزّن Turborepo شيئين مؤقتًا: مخرجات الملفات والسجلات. ولا تعود مخرجات الملفات إلا إذا أخبرت Turborepo ما هي عبر مفتاح <code>outputs</code>. وإن حذفت <code>outputs</code> أو تركته فارغًا، لا يخزّن Turborepo أي مخرجات ملفات، بل السجلات فقط. وهذا أحد أكثر أسباب الارتباك شيوعًا: «إصابات ذاكرة مؤقتة لكن مخرجات البناء مفقودة». وتقول الوثائق هذا بوضوح شديد، لأنه يبدو أن كثيرين بحاجة إلى تعلمه بالطريقة الصعبة.</p>
<p>يتحكم مفتاح <code>inputs</code> في أي الملفات تسهم في تجزئة المهمة. افتراضيًا، يستخدم Turborepo كل الملفات في الحزمة المُودَعة في نظام إدارة المصادر، وتُعد ملفات معينة مثل <code>package.json</code> و<code>turbo.json</code> وملف القفل مدخلات دائمًا. وإذا عرّفت <code>inputs</code>، فإنك تخرج من السلوك الافتراضي، بما في ذلك معالجة <code>.gitignore</code>، إلا إذا أعدتها عبر <code>$TURBO_DEFAULT$</code>. وهذا قوي، لكنه أيضًا الطريق الذي تُفرط فيه الفرق في تكييف سلوك التخزين المؤقت عن غير قصد ثم تمضي أسبوعًا تتساءل لماذا لا يُبطل أي تغيير شيئًا.</p>
<p>وغالبًا ما تبدو قاعدة <code>inputs</code> الحذرة هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;check-types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;inputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;$TURBO_DEFAULT$&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;!README.md&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;spell-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;inputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/*.md&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/*.mdx&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا يتبع النمط الرسمي: البدء من سلوك التجزئة الافتراضي وقصّ ما تعرف فقط أنه لا ينبغي أن يؤثر في المخرجات. وتوصي الوثائق صراحةً بـ<code>$TURBO_DEFAULT$</code> لهذا السبب.</p>
<p>تعيش ذاكرة التخزين المؤقت المحلية على نظام الملفات في <code>.turbo/cache</code> افتراضيًا. ويوسّع <a href="https://turborepo.dev/docs/crafting-your-repository/caching">التخزين المؤقت البعيد</a> الفكرة نفسها إلى أجهزة أخرى وCI بحيث لا تحتاج المهمة نفسها إلى إعادة تنفيذ منفصلة لدى كل مطوّر وكل مهمة CI وكل آلة نشر. وتقول الوثائق الرسمية إن Vercel Remote Cache يعمل دون أي إعداد كمزود افتراضي، لكن Turborepo يدعم أيضًا أي مزود ينفذ واجهة Remote Cache API الخاصة به، بل وحتى ذاكرات تخزين مؤقت مستضافة ذاتيًا.</p>
<p>وإذا كانت سلامة المخرجات تهمك، يدعم Turborepo أيضًا <a href="https://turborepo.dev/repo/docs/core-concepts/remote-caching">توقيع مخرجات الذاكرة المؤقتة البعيدة</a> بـHMAC-SHA256. وتمكّن ذلك عبر <code>remoteCache.signature: true</code> وتوفر <code>TURBO_REMOTE_CACHE_SIGNATURE_KEY</code>؛ وتُعامل نتيجة فشل التحقق كإخفاق في الذاكرة المؤقتة. وهو من تلك الميزات التي يتجاهلها الناس حتى اليوم الذي يصبح فيه التحقق من الأصالة مهمًا جدًا لهم فجأة.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;remoteCache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;signature&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وثمة تفصيلة أحدث هي مشاركة ذاكرة التخزين المؤقت بين أشجار عمل Git، وهي موثّقة حاليًا كإصدار أولي (pre-release). فعندما لا يُضبط <code>cacheDir</code> صراحةً، يستطيع Turborepo مشاركة الذاكرة المؤقتة المحلية بين شجرة العمل الرئيسية وأشجار العمل المرتبطة، ما يحسّن إعادة الاستخدام عبر الفروع على الجهاز نفسه. وإذا ضبطت <code>cacheDir</code> صراحةً، تعطَّل هذا السلوك.</p>
<h2 id="متغيرات-البيئة-هي-حيث-يحيا-صواب-التخزين-المؤقت-أو-يموت">متغيّرات البيئة هي حيث يحيا صواب التخزين المؤقت أو يموت</h2>
<p>تأتي <a href="https://turborepo.dev/docs/crafting-your-repository/using-environment-variables">وثائق متغيّرات البيئة</a> عند Turborepo صريحة على نحو غير معتاد لأن هذا هو الموضع الذي يسمّم فيه الناس ذاكراتهم المؤقتة بأكثر الطرق موثوقية. والتقسيم الجوهري هو <code>env</code> و<code>globalEnv</code> للمتغيّرات التي ينبغي أن تؤثر في التجزئة، و<code>passThroughEnv</code> و<code>globalPassThroughEnv</code> للمتغيّرات التي ينبغي أن تكون متاحة وقت التشغيل لكن دون أن تغيّر مفتاح الذاكرة المؤقتة. ويؤثر <code>globalEnv</code> في تجزئات كل المهام، بينما <code>env</code> خاص بالمهمة.</p>
<p>قيمة <code>envMode</code> الافتراضية هي <code>&quot;strict&quot;</code>، ومعناها أن المتغيّرات المسموح بها صراحةً وحدها متاحة لوقت تنفيذ المهام. أما <code>&quot;loose&quot;</code> فتجعل كل شيء متاحًا، وهو أسهل أثناء الترحيل لكنه أخطر بكثير لأنه يسهّل استعادة مخرجات مخزنة أُنتجت في البيئة الخاطئة. وتقول الوثائق صراحةً إن الوضع المرن يرفع احتمال إصابات الذاكرة المؤقتة من بيئة خاطئة، وهي طريقة مباشرة منعشة لقول «لا تكن متساهلًا ما لم تقصد ذلك».</p>
<p><strong>استنتاج الإطار (Framework Inference)</strong> يخفف الألم قليلًا. فيحسب Turborepo تلقائيًا متغيّرات البيئة المسبوقة بأسماء الأطر الشائعة، فلا تحتاج حزمة Next.js إلى أن تدرج <code>NEXT_PUBLIC_*</code> يدويًا. ويمكنك تعطيل استنتاج الإطار عند الحاجة، لكنه مفعّل افتراضيًا.</p>
<p>أما معالجة <code>.env</code>، فتوصي الوثائق بإبقاء ملفات <code>.env</code> داخل الحزم التي تستخدمها لا في جذر المستودع. وهذا يطابق واقع وقت التشغيل أكثر ويقلل تسرب البيئة بين التطبيقات. وتحذّر الوثائق أيضًا من إنشاء متغيّرات البيئة أو تغييرها أثناء تنفيذ المهام، لأن Turborepo يجزّئ حالة البيئة عند بدء المهمة ولا يستطيع احتساب التغييرات التي تحدث بعد ذلك.</p>
<p>وإذا أردت حواجز حماية، فحزمة <a href="https://turborepo.dev/docs/reference/eslint-plugin-turbo"><code>eslint-plugin-turbo</code></a> الرسمية تشير إلى متغيّرات البيئة المستخدمة في الشيفرة المصدرية وغير المحتسبة في <code>turbo.json</code>. ويستحق استخدامه في المستودعات الجدّية لأن متغيّرات البيئة غير المعلنة من أكثر الطرق المملة لجعل نظام سريع خاطئًا بشكل خفي.</p>
<h2 id="الحزم-والاعتمادات-وبنية-المستودع">الحزم والاعتمادات وبنية المستودع</h2>
<p><a href="https://turborepo.dev/docs/crafting-your-repository/managing-dependencies">الإرشاد الرسمي لإدارة الاعتمادات</a> عند Turborepo بسيط وجيد: ثبّت الاعتمادات حيث تُستخدم، وأبقِ اعتمادات قليلة جدًا في جذر المستودع، ودع مدير الحزم يفعل ما يفعله مدير الحزم. وتقول الوثائق تحديدًا إن هذا يحسّن الوضوح، ويتيح لحزم مختلفة تطوير إصدارات اعتمادها باستقلالية عند الحاجة، ويتجنب إخفاقات الذاكرة المؤقتة غير الضرورية الناتجة عن لمس جذر مساحة العمل باستمرار.</p>
<p><strong>الاعتمادات الداخلية</strong> ليست سوى حزم مساحة عمل مثبّتة عبر صيغة مساحة العمل في مدير الحزم، مثل <code>workspace:*</code>. ويبني Turborepo مخطط الحزم تلقائيًا من هذه العلاقات، ولهذا تهم إعلانات الاعتماد الجيدة في <code>package.json</code> إلى هذا الحد. وإذا كذبت في <code>package.json</code>، كذب عليك المخطط بالمقابل.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;web&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;next&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;latest&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@repo/ui&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وتميّز الوثائق أيضًا بين <a href="https://turborepo.dev/docs/core-concepts/package-types">حزم التطبيقات وحزم المكتبات</a>. حزم التطبيقات هي عادة نقاط النشر النهائية لديك، وغالبًا ما تعيش تحت <code>apps/</code>، والأفضل معاملتها كنهاية مخطط الحزم. أما حزم المكتبات فهي حزم داخلية مشتركة تسندها. ويساعد هذا التمييز في إبقاء المخطط اتجاهيًا بدلًا من تحويل مستودعك إلى شبكة اجتماعية من الاعتماد المتبادل.</p>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>الصادرات</th>
<th>خطوة البناء</th>
<th>التخزين المؤقت في Turborepo</th>
<th><code>paths</code> في TypeScript</th>
<th>الأنسب لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td>في الوقت المناسب (JIT)</td>
<td>الشيفرة المصدرية الخام</td>
<td>لا شيء (المُجمِّع المستهلك)</td>
<td>لا بناء ليُخزَّن</td>
<td>غير مدعوم</td>
<td>حزم داخلية بسيطة وتكرار سريع</td>
</tr>
<tr>
<td>مُجمَّعة</td>
<td>المخرجات المبنية</td>
<td><code>tsc</code> أو ما يماثله</td>
<td>نعم</td>
<td>مدعوم</td>
<td>مكتبات مشتركة بواجهات API مستقرة</td>
</tr>
<tr>
<td>قابلة للنشر</td>
<td>مخرجات dist جاهزة لـnpm</td>
<td>بناء كامل + تحزيم</td>
<td>نعم</td>
<td>مدعوم</td>
<td>حزم تُنشر إلى سجل</td>
</tr>
</tbody>
</table>
<p>أما الحزم الداخلية، فتصف الوثائق ثلاث استراتيجيات: <strong>حزم في الوقت المناسب</strong>، و<strong>حزم مُجمَّعة</strong>، و<strong>حزم قابلة للنشر</strong>. و<a href="https://turborepo.dev/repo/docs/core-concepts/internal-packages">حزم JIT</a> تصدّر الشيفرة المصدرية مباشرة وتعتمد على المُجمِّعات المستهلكة في ترجمتها. والحزم المُجمَّعة تبني نفسها بأدوات مثل <code>tsc</code>. والحزم القابلة للنشر تُعدّ للنشر على npm. وتلاحظ الوثائق أن حزم JIT قليلة الإعداد لكن لا يمكن أن تملك خطوة بناء مخزنة في Turborepo، لأنه لا توجد خطوة بناء تُخزَّن. وتحذّر أيضًا من أن حزم JIT لا تستطيع استخدام <code>paths</code> في TypeScript بالطريقة التي يأملها الناس غالبًا.</p>
<p>وبالنسبة إلى المكتبات الداخلية بلغة TypeScript، <a href="https://turborepo.dev/docs/guides/tools/typescript">توصي الوثائق الرسمية</a> باستخدام <code>tsc</code> لترجمة الحزم كلما أمكن بدلًا من التجميع في حزمة واحدة، لأن ذلك يضيف تعقيدًا إضافيًا وقد يصعّب التنقيح في المراحل اللاحقة. وتوصي أيضًا بـ<code>declaration</code> و<code>declarationMap</code> للحزم المُجمَّعة كي يعمل الانتقال إلى التعريف في المحرر عبر حدود الحزم.</p>
<h2 id="إعدادات-الحزم">إعدادات الحزم</h2>
<p>ملف <code>turbo.json</code> جذري واحد يكفي لكثير من المستودعات، لكن ليس كلها. ويدعم Turborepo <a href="https://turborepo.dev/repo/docs/reference/package-configurations">ملفات <code>turbo.json</code> على مستوى الحزمة</a> التي توسّع الإعداد الجذري عبر <code>extends: [&quot;//&quot;]</code>، كما يمكن لإعدادات الحزم أن توسّع حزمًا أخرى لمشاركة إعداد المهام. وهذا مفيد بشكل خاص في المستودعات متعددة الأطر حيث يصبح إعداد <code>outputs</code> عالمي واحد لولا ذلك مكب نفايات من <code>.next/**</code> و<code>.svelte-kit/**</code> وبقايا كل إطار آخر.</p>
<pre><code class="language-json"><span class="hljs-comment">// apps/web/turbo.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;//&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;outputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;.next/**&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;!.next/cache/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;cache&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;persistent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// apps/docs/turbo.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;//&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;web&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;NEXT_PUBLIC_DOCS_URL&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الفارق الدقيق المهم هو أن مدخلات <code>package#task</code> الخاصة بحزمة في الإعداد الجذري تستبدل إعداد المهمة استبدالًا كاملًا، بينما ترث إعدادات الحزم الحقول القياسية ولا تتجاوز إلا ما تحدده. وتميل الوثائق الرسمية بشكل متزايد إلى تقديم إعدادات الحزم كخيار افتراضي أنظف لمعظم السلوك الخاص بحزمة بعينها.</p>
<h2 id="تشغيل-عمل-أقل">تشغيل عمل أقل</h2>
<p>أمر <a href="https://turborepo.dev/repo/docs/reference/run"><code>run</code></a> عند Turborepo هو حيث تسكن سهولة الاستخدام العملية. فـ<code>--filter</code> يدعم أسماء الحزم والمجلدات ونطاقات إيداعات Git، بلغة صغيرة فائقة الصياغة للاعتمادات والتابعين والنفي ونطاقات الإيداعات. و<code>...web</code> تختار التابعين، و<code>web...</code> تختار الاعتمادات، و<code>!</code> تزيل الأهداف، وتستخدم المرشحات المبنية على الإيداعات <code>[]</code>. الأمر غريب بعض الشيء في البداية، ثم يصبح مفيدًا بشكل مزعج إلى الأبد.</p>
<p>و<code>--affected</code> هو نقطة الدخول الأكثر ودًّا للتنفيذ المبني على التغييرات. وتقول الوثائق إنه يكافئ افتراضيًا <code>--filter=...[main...HEAD]</code>، وتحذّر من أنه يتطلب تاريخ Git كافيًا في النسخة المسحوبة. وفي الاستنساخات السطحية في CI، قد يبدو كل شيء متغيرًا ما لم تجلب تاريخًا كافيًا أو تضبط <code>TURBO_SCM_BASE</code> و<code>TURBO_SCM_HEAD</code>.</p>
<p>بعض الأمثلة المفيدة:</p>
<pre><code class="language-bash">turbo run build --filter=web
turbo run <span class="hljs-built_in">test</span> --filter=@repo/*{./packages/*}[HEAD^1]
turbo run lint --affected
turbo run web#lint --only
</code></pre>
<p>كل هذه الأنماط امتدادات مباشرة لنموذج المرشحات الرسمي، وهي حيث يبدأ Turborepo في تغطية تكلفته في المستودعات الكبيرة. فمن الأجمل بكثير أن تقول «شغّل العمل الصحيح» من أن تتظاهر بأن كل مهمة CI تحتاج إلى إعادة فحص الكون بأكمله بحب وعناية.</p>
<p>وإذا أردت تخطي عمل أكثر، فهناك <a href="https://turborepo.dev/repo/docs/crafting-your-repository/constructing-ci"><code>turbo-ignore</code></a> لمرحلة ما قبل التثبيت في CI. وتصفه الوثائق بأنه طريقة لتحديد ما إذا تغيّرت حزمة أو تغيّرت اعتماداتها، بحيث يمكنك تخطي إعداد مكلف مثل تجهيز الحاوية أو تثبيت الاعتمادات عندما لا تكون نتيجة تشغيل Turborepo اللاحق سوى إصابة في الذاكرة المؤقتة على أي حال. وهو تحسين أكثر تقدمًا، لكنه يصبح جاذبًا جدًا بمجرد أن تبدأ فواتير CI في التصاعد المسرحي.</p>
<h2 id="التطوير-المحلي-ووضع-المراقبة">التطوير المحلي ووضع المراقبة</h2>
<p><a href="https://turborepo.dev/repo/docs/reference/watch"><code>turbo watch</code></a> مدرك للاعتمادات ويعيد تشغيل المهام بناءً على تغييرات الشيفرة، متبعًا الترتيب في مخطط مهامك. وهذا يجعله مفيدًا للمهام التي تحتاج إلى إعادات تشغيل مدركة للمخطط لا مجرد مراقبة محلية للملفات. لكن الوثائق تقول أيضًا إن كانت أداتك تفهم تغييرات الاعتمادات بنفسها—مثل خادم تطوير إطار يراقب الحزم الداخلية بشكل صحيح—فما عليك سوى استخدام المراقب الأصلي لتلك الأداة وتعليم المهمة بأنها <code>persistent</code>.</p>
<p>تتصرف المهام الدائمة تصرفًا خاصًا في وضع المراقبة. ولأنها لا تنتهي، لا يمكنها المشاركة كحواف اعتماد عادية. وافتراضيًا تُتجاهل لأغراض إعادة التشغيل، وإن أردت لـ<code>turbo watch</code> إعادة تشغيلها فأنت تحتاج إلى <code>interruptible: true</code>. وتحذّر الوثائق أيضًا من أن كتابات الذاكرة المؤقتة في وضع المراقبة لا تزال تجريبية خلف العلم <code>--experimental-write-cache</code>.</p>
<p>وثمة حالة حدّية خبيثة هنا: إذا كتبت مهمة مراقَبة ملفات مُودَعة في نظام إدارة المصادر، فقد يدخل وضع المراقبة في حلقة لأنه يرى مخرجاته هو نفسه كتغييرات. وتقول الوثائق إن لدى Turborepo بعض الحمايات المبنية على التجزئة، لكنها ليست مضمونة، والإصلاح الموصى به هو عدم إبقاء مخرجات تلك المهام في Git. نصيحة سليمة، سيتجاهلها كثير من المستودعات بطبيعة الحال حتى تبدأ المراوح في الدوران.</p>
<h2 id="التكامل-المستمر-والتخزين-المؤقت-البعيد-وdocker">التكامل المستمر والتخزين المؤقت البعيد وDocker</h2>
<p><a href="https://turborepo.dev/repo/docs/crafting-your-repository/constructing-ci">قصة CI</a> مباشرة. فيُفعَّل التخزين المؤقت البعيد في CI بضبط <code>TURBO_TOKEN</code> و<code>TURBO_TEAM</code>، وبعد ذلك تستطيع آلات CI لديك قراءة الذاكرة المؤقتة المشتركة والكتابة فيها. وتوصي الوثائق بالاعتماد على التخزين المؤقت أولًا، ثم إضافة المرشحات وتحسينات أكثر استهدافًا لاحقًا. وتوصي صراحةً أيضًا باستخدام <code>turbo run</code> في CI وبتثبيت أي تثبيت عالمي لـ<code>turbo</code> على الإصدار الرئيسي نفسه المعلن في مستودعك، خصوصًا في حالات مثل <code>turbo prune</code> حيث قد تعمل قبل تثبيت الاعتمادات.</p>
<p>خدمة Turborepo الخلفية (daemon) تحسين أداء محلي، وهي معطلة في CI بغض النظر عن الإعداد. ومن المفيد معرفة ذلك لأن الناس يحبون مطاردة فروق CI وهمية ليست في الحقيقة إلا «الخدمة الخلفية غير موجودة».</p>
<p>أما Docker، فأمر <a href="https://turborepo.dev/docs/reference/prune"><code>turbo prune</code></a> من أثمن أوامر الأداة. وتقول الوثائق إنه يولّد مستودعًا أحاديًا جزئيًا لحزمة مستهدفة، يشمل الشيفرة الكاملة للحزم الداخلية المطلوبة، وملف قفل مقصوصًا، ونسخة من <code>package.json</code> الجذري. ومع <code>--docker</code> يقسّم المخرجات إلى <code>json/</code> لبيانات الحزم و<code>full/</code> للشيفرة الكاملة، بما يتوافق مع التخزين المؤقت لطبقات Docker بحيث يمكن فصل تثبيت الاعتمادات عن نسخ الشيفرة.</p>
<pre><code class="language-bash">turbo prune web --docker
</code></pre>
<p>هذا التقسيم هو بالضبط ما تريده في بناءات الحاويات: انسخ <code>out/json</code> وثبّت أولًا، ثم انسخ <code>out/full</code> وابنِ. ويستخدم <a href="https://turborepo.dev/repo/docs/handbook/deploying-with-docker">دليل Docker الرسمي</a> هذا لتجنب إبطال طبقات الاعتماد بسبب تغييرات غير ذات صلة في المستودع الأحادي، وهو من الوفورات التي تصبح هائلة بمجرد أن تتوقف عن التظاهر بأن كل خدمة تستحق إعادة تثبيت طازجة مدفوعة بملف القفل في كل بناء.</p>
<p>وثمة فارق دقيق مفيد من الوثائق: <code>turbo prune</code> و<code>pnpm deploy</code> ليسا الشيء نفسه. فـ<code>turbo prune</code> ينتج مستودعًا أحاديًا جزئيًا يحافظ على بنية المستودع للحزمة المستهدفة واعتماداتها الداخلية. أما <code>pnpm deploy</code> فينتج حزمة قابلة للنشر قائمة بذاتها لها <code>node_modules</code> الخاصة بها. استخدم الأمر الذي يطابق الشيء الذي تحاول إصداره فعليًا.</p>
<h2 id="التنقيح-وفهم-المستودع">التنقيح وفهم المستودع</h2>
<p>نمت لدى Turborepo صندوق أدوات محترم لفحص البنية الداخلية. فـ<code>--graph</code> يرسم مخطط المهام لتشغيل ما. و<code>turbo ls</code> يسرد الحزم ويمكن ترشيحه تمامًا كما تفعل مع <code>run</code>. و<code>turbo devtools</code> يوفر تصورًا لمخطط الحزم في المتصفح. ومنذ الإصدار 2.2.0، يعرض <a href="https://turborepo.dev/repo/docs/core-concepts/package-and-task-graph"><code>turbo query</code></a> واجهة GraphQL فوق بيانات المستودع الوصفية بحيث يمكنك طرح أسئلة مثل: ما الحزم المتأثرة؟ وما الحزم التي لديها مهمة معينة؟ وما الحزم التي لها تابعون أكثر من اللازم؟ وهذا أفضل بكثير من استراتيجية التنقيح القديمة: «حدّق في المستودع وانتظر حدوث الوحي».</p>
<p>وهناك أيضًا <a href="https://turborepo.dev/repo/docs/reference/scan"><code>turbo scan</code></a>، وهو في جوهره قائمة تحقق تفاعلية للأداء. وتقول الوثائق إنه يمكن أن يساعد في تفعيل Git FS Monitor وخدمة Turborepo الخلفية والتخزين المؤقت البعيد وفحوص الإصدارات و<a href="https://turborepo.dev/docs/getting-started/editor-integration">تكامل المحرر</a>. إنه ليس سحرًا، لكنه تمرين فحص جيد لمستودع يبدو أبطأ مما ينبغي.</p>
<p>وإذا كانت سهولة استخدام المحرر تهمك، فتوصي الوثائق بإضافة مفتاح <code>$schema</code> إلى <code>turbo.json</code> كي يتمكن المحرر من التحقق من الإعداد وإكماله تلقائيًا. تحسين صغير بعائد جيد بشكل مفاجئ، لأن كتابة إعداد نظام بناء غير صالح يدويًا من أقل هوايات البشرية إنتاجية.</p>
<h2 id="الحدود-والحكامة">الحدود والحكامة</h2>
<p>ولـTurborepo أيضًا <a href="https://turborepo.dev/docs/reference/boundaries">أمر <code>boundaries</code></a> تجريبي. وتقول الوثائق إنه يفحص نوعين من الانتهاكات جاهزين: استيراد ملفات من خارج مجلد الحزمة، واستيراد حزمة غير معلنة في <code>package.json</code>. وفوق ذلك، يمكنك إضافة وسوم للحزم وتحديد قواعد لما يجوز للحزم الموسومة أن تعتمد عليه أو أن يعتمد عليها.</p>
<p>وهذا وثيق الصلة في المستودعات الأحادية لأن الاستيرادات المحلية داخل المستودع تجعل الغش سهلًا جدًا. فالمستودع الأحادي السريع جميل، لكن مستودعًا أحاديًا سريعًا تمد فيه كل حزمة يدها سرًا إلى الملفات الخاصة بكل حزمة أخرى ليس سوى طريق أسرع إلى التآكل البنيوي. الحدود تجريبية، لكن المشكلة التي تعالجها حقيقية تمامًا.</p>
<h2 id="مساحات-العمل-أحادية-الحزمة-لا-تزال-صالحة">مساحات العمل أحادية الحزمة لا تزال صالحة</h2>
<p>Turborepo ليس حكرًا على المستودعات الأحادية. ويقول <a href="https://turborepo.dev/docs/guides/single-package-workspaces">الدليل الرسمي لمساحات العمل أحادية الحزمة</a> إن الميزات المهمة لا تزال تعمل في المستودعات أحادية الحزمة، بما فيها توازي المهام والتخزين المؤقت المحلي أو البعيد. أما الميزات التي لا تعمل فهي غالبًا تلك التي لا معنى لها دون حزم متعددة، مثل معرّفات المهام المحددة النطاق بحزمة.</p>
<p>وهذا يجعل Turborepo مسار تبني تدريجي معقول. وتقول الوثائق إنك تستطيع إضافته إلى مستودع قائم أحادي الحزمة أو متعدد الحزم، وهو في تطبيق أحادي الحزمة لا يزال قادرًا على تنسيق سير عمل محلي معقد، وتوازي الفحوص المستقلة، وتخزين المهام المكلفة مؤقتًا. وهذا مفيد عندما لا يكون المستودع قد أصبح مستودعًا أحاديًا بعد، لكن نصوصه البرمجية باتت تشبه مهرجانًا صغيرًا من التكرار الذي يمكن تجنبه.</p>
<h2 id="كيف-تضعف-الفرق-turborepo-عادة">كيف تُضعف الفرق Turborepo عادةً</h2>
<p><strong>معاملته كمدير حزم.</strong> لكنه ليس كذلك. فمدير الحزم يملك تثبيت الاعتمادات وحلّها، وTurborepo يُبنى فوق ذلك. وعندما تلوم الفرق Turborepo على غرابة في حل مساحة العمل، فإنها غالبًا تصوّب سهامها إلى الطبقة الخطأ.</p>
<p><strong><code>outputs</code> سيئ.</strong> إذا لم تستعد إصابات الذاكرة المؤقتة الملفات التي يحتاجها بناؤك، فالسبب المعتاد أن <code>outputs</code> ناقص أو مفقود. وتشير الوثائق إلى ذلك مرارًا لأنه أكثر تقرير شيوعًا عن «التخزين المؤقت معطوب» يكون في الحقيقة «الإعداد ناقص».</p>
<p><strong>نظافة سيئة لمتغيّرات البيئة.</strong> الوضع الصارم هو الافتراضي لسبب وجيه. وإذا استخدمت الوضع المرن بلا مبالاة، أو نسيت احتساب متغيّرات البيئة المؤثرة في البناء في <code>env</code> أو <code>globalEnv</code>، أصبحت إصابات الذاكرة المؤقتة من البيئة الخاطئة أسهل بكثير. والوثائق صريحة على نحو خاص في هذا الشأن في دليل البيئة.</p>
<p><strong>تثبيت الكثير في الجذر.</strong> تقول الوثائق إن كثرة تغييرات الاعتمادات في الجذر تسبب إخفاقات غير ضرورية في الذاكرة المؤقتة وتطمس الملكية. فأبقِ اعتمادات الجذر لأدوات إدارة المستودع، وثبّت اعتمادات التطبيقات أو المكتبات حيث تُستخدم.</p>
<p><strong>الخلط بين حزم JIT والغداء المجاني.</strong> حزم JIT الداخلية جميلة عندما تستطيع المُجمِّعات الحديثة استهلاكها، لكن الوثائق واضحة في أنها لا تملك خطوة بناء مخزنة في Turborepo، وتأتي بقيود مثل عدم وجود <code>paths</code> في TypeScript داخل الحزمة نفسها. إنها مقايضة، لا شيفرة غش.</p>
<h2 id="متى-يكون-turborepo-هو-الجواب-الصحيح">متى يكون Turborepo هو الجواب الصحيح</h2>
<p>يكون Turborepo مناسبًا جدًا عندما تكون لديك بالفعل مساحة عمل بلغة JS أو TS وتكون مشكلتك هي تنسيق المهام أو تكلفة CI أو العمل المكرر أو سهولة الاستخدام للمطورين على مستوى المستودع. وهو جيد بشكل خاص عندما تريد تبنيًا تدريجيًا، لأن الوثائق الرسمية تدعم إضافته إلى مستودعات قائمة أحادية أو متعددة الحزم بدلًا من فرض طقس ترحيل عملاق.</p>
<p>أفضل طريقة للتفكير فيه ليست أنه «إطار للمستودعات الأحادية»، بل «مشغّل مهام مدرك للذاكرة المؤقتة والمخططات لمساحات عمل JS/TS». وما إن تلتزم بهذا النموذج حتى يصبح الباقي أسهل بكثير: دع مدير الحزم يدير الحزم، ودع Turborepo يدير العمل، وكن صريحًا بلا رحمة بشأن المخرجات والمدخلات ومتغيّرات البيئة. من هنا تأتي السرعة، ومن هنا أيضًا تفشّل الفرق في إيذاء نفسها بأكثر الطرق موثوقية.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:o,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,o as headings,c as html,p as slug,t as title};
