const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",p="build-time-microfrontends",t="الواجهات الأمامية الدقيقة وقت البناء",o=[{depth:2,id:"أين-يكون-منطقيا",text:"أين يكون منطقيًا"},{depth:2,id:"الأنماط-الرئيسية",text:"الأنماط الرئيسية"},{depth:2,id:"حد-الحزمة-هو-العقد",text:"حدّ الحزمة هو العقد"},{depth:2,id:"استراتيجية-الاعتماد",text:"استراتيجية الاعتماد"},{depth:2,id:"نظام-البناء-وtypescript",text:"نظام البناء وTypeScript"},{depth:2,id:"إدارة-الإصدار",text:"إدارة الإصدار"},{depth:2,id:"الاختبار-والتكامل",text:"الاختبار والتكامل"},{depth:2,id:"متى-تبدأ-الواجهات-الأمامية-الدقيقة-وقت-البناء-في-الانهيار",text:"متى تبدأ الواجهات الأمامية الدقيقة وقت البناء في الانهيار"},{depth:2,id:"وقت-البناء-مقابل-وقت-التنفيذ",text:"وقت البناء مقابل وقت التنفيذ"},{depth:2,id:"التوصية",text:"التوصية"}],c=`<p>الواجهات الأمامية الدقيقة وقت البناء هي النسخة القائمة على الحزم من الواجهات الأمامية الدقيقة. فبدلًا من تحميل شرائح منشورة باستقلالية وقت التنفيذ، تنشر كل شريحة أو تربطها كحزمة وتدع القشرة (shell) تستوردها كاعتمادات عادية أثناء بناء التطبيق. وتصف <a href="https://martinfowler.com/articles/micro-frontends.html">مقالة Martin Fowler عن الواجهات الأمامية الدقيقة</a> هذا النمط تحديدًا: تُنشر كل واجهة أمامية دقيقة كحزمة، ويضمّها التطبيق الحاوي كاعتمادات مكتبات. ويشير أيضًا فورًا إلى المقايضة الجوهرية—فأنت تحصل على حزمة JavaScript واحدة قابلة للنشر وتستطيع إزالة تكرار الاعتمادات الشائعة، لكن أي تغيير في شريحة واحدة يعني إعادة تصريف التطبيق بأكمله وإصداره.</p>
<p>ولهذا تكون الواجهات الأمامية الدقيقة وقت البناء عادةً أقرب إلى كتلة واحدة معيارية ذات حدود حزم مما هي إلى نظام واجهات أمامية دقيقة مُركَّب بالكامل وقت التنفيذ. ويصف <a href="https://webpack.js.org/concepts/">Webpack</a> مهمته بأنها بناء مخطط اعتماد ثابت وتحويل ذلك المخطط إلى حزمة أو أكثر، بينما تصف npm وpnpm مساحات العمل كمشروع واحد أعلى مستوى يدير حزمًا محلية متعددة. وبمجرد أن تستورد قشرتك كل شريحة ويُخرج مُجمِّعك تطبيقًا واحدًا، يصبح وقت التنفيذ تطبيقًا واحدًا في الأساس، حتى لو كانت شجرة المصدر مقطّعة إلى حزم كثيرة.</p>
<p>إذا كان ما تحتاجه فعلًا هو قابلية النشر المستقلة لكل شريحة، فهذه هي الأداة الخطأ. فـ<a href="https://single-spa.js.org/docs/recommended-setup/">الإعداد الموصى به من single-spa</a> يشدّد على أن كل تطبيق يمكن تطويره ونشره باستقلالية، وتصف وثائق Module Federation في webpack الاستهلاك وقت التنفيذ للوحدات من عمليات بناء منفصلة. لكن التكامل وقت البناء لا يمنحك تلك الخصيصة، بل يمنحك فصلًا على مستوى الحزم وتركيبًا وقت البناء بدلًا من ذلك.</p>
<h2 id="أين-يكون-منطقيا">أين يكون منطقيًا</h2>
<p>تكون الواجهات الأمامية الدقيقة وقت البناء منطقية عندما تكون المشكلة الحقيقية هي ملكية الشيفرة وحدود الحزم وقابلية الصيانة على مقياس الفرق—لا الاستقلالية وقت التنفيذ. وهي مناسبة عندما تريد لفرق منفصلة أن تمتلك شرائح رأسية من منتج، لكنك ما زلت راضيًا بإصدار مخرَج واحد، ومخرَج SSR/SSG واحد، وإصدار واحد، وبيئة تشغيل متصفح واحدة. وتقول إرشادات Fowler إن الفرق ينبغي أن تُنظَّم حول شرائح أعمال رأسية، غالبًا صفحات كاملة، لا حول طبقات تقنية مثل التنسيق أو التحقق. ويوصي <a href="https://single-spa.js.org/">single-spa</a> بالمثل بتقسيم التطبيقات على أساس المسارات بدلًا من التجزئة بحجم المكوّن.</p>
<p>تلك النقطة الأخيرة أهم مما يعترف به الناس. فإذا كانت «واجهاتك الأمامية الدقيقة» مجرد <code>@org/button</code> و<code>@org/forms</code> و<code>@org/date-utils</code>، فليست لديك واجهات أمامية دقيقة، بل لديك مكتبات، وهذا لا بأس به، لكن لا نضع شاربًا مزيفًا على إدارة الحزم ونسمّيه استراتيجية. ويُميّز <a href="https://single-spa.js.org/">single-spa</a> صراحةً بين التطبيقات القائمة على المسارات ووحدات الأدوات، ويعامل أشياء مثل مكتبة المكوّنات والمصادقة المشتركة ومعالجة الأخطاء الشاملة كوحدات أدوات، لا كشرائح المنتج الأساسية.</p>
<p>تبدو التهيئة الصحية وقت البناء عادةً كقشرة واحدة مضافًا إليها مجموعة صغيرة من حزم النطاق أو المسارات، وإلى جانبها بضع حزم أدوات مشتركة فعلًا.</p>
<pre><code>repo/
  apps/
    shell/
  packages/
    browse-restaurants/
    order-food/
    user-profile/
    design-system/
    auth/
    api-client/
</code></pre>
<p>يتوافق ذلك الشكل مع التقسيم الصفحي عند Fowler ومع الفصل الشائع «تطبيقات + وحدات أدوات» الموصوف في إرشادات <a href="https://single-spa.js.org/">single-spa</a>.</p>
<h2 id="الأنماط-الرئيسية">الأنماط الرئيسية</h2>
<p>نمط المستودع الأحادي هو الأبسط والبداية الأفضل عادةً. فـ<a href="https://docs.npmjs.com/cli/v9/using-npm/workspaces/">مساحات عمل npm</a> تنشئ تلقائيًا روابط رمزية للحزم المحلية داخل <code>node_modules</code>، ويسمح حلّ الوحدات العادي في Node للقشرة باستهلاك مساحات العمل هذه باسم الحزمة. كما أن pnpm فيه دعم مدمج لمساحات العمل. وعمليًا، يعني ذلك أن قشرتك تستطيع استيراد <code>@acme/order-food</code> تمامًا كما لو كانت اعتمادًا منشورًا، بينما يظل التطوير المحلي يستخدم ربط مساحة العمل.</p>
<p>تهيئة مستودع أحادي بسيطة:</p>
<pre><code class="language-json"><span class="hljs-comment">// package.json at repo root</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;private&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;workspaces&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;apps/*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;packages/*&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// apps/shell/package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/shell&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@acme/browse-restaurants&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/order-food&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/user-profile&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا مجرد تكامل الحزم وقت البناء عند Fowler مطبَّقًا داخل مستودع مدرك لمساحات العمل. فتتولّى npm الربط، ويستطيع pnpm جعل قصد الحزمة المحلية أكثر صرامة، ويرى المُجمِّع مخطط استيراد عاديًا.</p>
<p>أما نمط الحزمة المنشورة فهو نسخة الفكرة نفسها في مستودعات متعددة أو سجلّ خاص. فتُنَسَّق كل شريحة وتُنشر، وتعتمد القشرة على نطاقات semver. وعند تلك النقطة يتوقف <a href="https://semver.org/">SemVer</a> عن كونه مراسم اختيارية ويصبح جزءًا من المعمار، لأن حدّ الحزمة المنشورة هو الآن عقد منتجك.</p>
<p>النمط الهجين شائع في المؤسسات الأكبر: طوّر الشرائح في مستودع أحادي، لكن انشر حزمًا مختارة إلى سجلّ داخلي لاستخدامها من مستودعات أو منتجات أخرى. وتقول <a href="https://pnpm.io/workspaces">وثائق pnpm</a> إن إدارة إصدارات مساحة العمل معقدة بما يكفي لتوجّه الناس إلى أدوات مخصّصة مثل Changesets أو Rush، وقد صُمّم Changesets صراحةً للتنقيح المتعدد الحزم الملائم للمستودعات الأحادية مع تحديث تلقائي للاعتمادات بين الحزم.</p>
<h2 id="حد-الحزمة-هو-العقد">حدّ الحزمة هو العقد</h2>
<p>في الواجهات الأمامية الدقيقة وقت البناء، يهمّ حدّ الحزمة أكثر من حدّ وقت التنفيذ، لأن حدّ الحزمة هو الحدّ الحقيقي الوحيد المتبقي. ويقول SemVer إن الواجهة البرمجية العامة يجب أن تكون معلَنة وواضحة. وتوصي <a href="https://nodejs.org/api/packages.html">وثائق حزم Node</a> بحقل <code>exports</code> للحزم الجديدة، وهي صريحة في أن المسارات الفرعية غير المعلَنة تصبح مُغلَّفة وغير متاحة للمستوردين بمجرد تعريف <code>exports</code>. ويضيف دليل النشر في Node الحدّ الحاد: قد تكون إضافة <code>exports</code> تغييرًا كاسرًا لأنه يحجب الاستيرادات العميقة التي قد يكون المستهلكون يستخدمونها بالفعل.</p>
<p>لذا القاعدة بسيطة: لا تدع القشرة أو الشرائح الشقيقة تستورد ملفات خاصة. لا <code>@acme/order-food/src/internal/useSomething</code>. ولا <code>../../packages/foo/lib/private</code>. صدّر نقاط الدخول التي تدعمها ولا شيء غيرها.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/order-food&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;module&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./routes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/routes.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.d.ts&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذه هي النسخة الناضجة من حدود الحزم. فـ <code>exports</code> يمنحك مساحة سطح مدروسة، وتتيح لك نقاط دخول المسارات الفرعية كشف وحدات مدعومة متعددة، ويتوقف الاستيراد العميق عن كونه عقدًا عرَضيًا.</p>
<p>صيغة الوحدة موضع آخر يتراخى فيه الفرق ثم يكتشفون لاحقًا أن التغليف كان، للأسف، جزءًا من النظام طوال الوقت. يستخدم Node حقل <code>type</code> لتحديد كيف تُفسَّر ملفات <code>.js</code>، ويقول دليل النشر فيه إن الأفضل عمومًا نشر صيغة واحدة—إما CommonJS أو ESM، لا كلتيهما. ويحذّر الدليل نفسه من <strong>خطر الحزمة المزدوجة</strong>: إذا حُمِّلت نسختا CJS وESM معًا، فقد ينتهي بك الأمر إلى نسختين مما ظننته حزمة واحدة، بحالة منفصلة وسلوك مفاجئ. وهذه حالة حدّية حقيقية للحزم المشتركة ذات الحالة في تهيئات الواجهات الأمامية الدقيقة وقت البناء.</p>
<h2 id="استراتيجية-الاعتماد">استراتيجية الاعتماد</h2>
<p>إذا صُرِّفت الشرائح في تطبيق واحد، فإن الاعتمادات المشتركة ما زالت تحتاج إلى انضباط. ففي مساحة العمل، تنشئ npm روابط رمزية للحزم تلقائيًا ويربط pnpm حزم مساحة العمل مباشرةً، لكن pnpm يشير أيضًا إلى غموض مهم مع نطاقات semver العادية: فبدون بروتوكول <code>workspace:</code>، قد يُحلّ الاعتماد من مساحة العمل أو من السجلّ حسب المتاح. ويُزيل <code>workspace:</code> ذلك الغموض ويرفض الحلّ إلى أي شيء غير حزمة مساحة عمل محلية. وعند النشر، يعيد pnpm كتابة نطاقات <code>workspace:</code> تلك إلى نطاقات semver عادية، ما يجعل الحزمة الناتجة قابلة للاستهلاك خارج مساحة العمل.</p>
<p>بالنسبة إلى الأطر التي يوفّرها المضيف مثل React، عامل العلاقة كعقد إضافة/مضيف. وتوصي <a href="https://docs.npmjs.com/cli/v9/configuring-npm/package-json/">وثائق حزم npm</a> بإبقاء متطلبات اعتماد النظراء (peer dependencies) واسعة قدر ما تسمح به التوافقية فعلًا، ولدى pnpm إعدادات مساحة عمل مخصّصة لحلّ النظراء. وفي مستودع pnpm أحادي، يستطيع <code>resolvePeersFromWorkspaceRoot</code> أن يجعل كل مشروع يحلّ النظراء من جذر مساحة العمل فيستخدمون جميعًا الإصدار نفسه، ويستطيع <code>strictPeerDependencies</code> تحويل أشجار النظراء السيئة إلى فشل في التثبيت بدلًا من تحذيرات مُتهاون بها. وهذا بالضبط ما تريده عندما يُفترض أن تتشارك عدة شرائح بيئة تشغيل إطار واحدة.</p>
<p>إن كنت تستخدم pnpm، فإن <a href="https://pnpm.io/catalogs">الكتالوجات (catalogs)</a> طبقة إضافية لطيفة من الاتساق. فهي تتيح لك تعريف نطاقات إصدارات مشتركة مثل <code>react</code> و<code>react-dom</code> مرة واحدة في <code>pnpm-workspace.yaml</code>، والإشارة إليها بـ <code>catalog:</code> في بيانات الحزم، وتغييرها في مكان واحد لاحقًا. والفوائد واضحة: صيانة الإصدارات الفريدة أسهل، وتصبح الترقيات تعديلات من سطر واحد، وينخفض تكرار إصدارات الاعتماد.</p>
<p>غالبًا ما تبدو بيانات حزمة معقولة لشريحة مقترنة بالمضيف هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/order-food&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;peerDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^18.2.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@acme/design-system&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/api-client&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:*&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الهدف هو إبقاء الإطار مشتركًا فعلًا، بينما تظل الحزم الداخلية العادية اعتمادات عادية. وإن طمست ذلك الخط، صارت بيئات التشغيل المكرّرة وعدم تطابق النظراء هوايتك الجديدة.</p>
<p>قاعدة صارمة واحدة: أبقِ مخطط الحزم بلا دورات (acyclic). فـ pnpm يحذّر من الاعتمادات الدورية في مساحة العمل ويمكن تهيئته ليفشل التثبيت عند وجود دورات. والدورات ليست قبيحة فحسب، بل هي عادةً دليل على أن الشرائح لم تعد شرائح فعلًا، بل صارت كتلًا متلاصقة.</p>
<h2 id="نظام-البناء-وtypescript">نظام البناء وTypeScript</h2>
<p>بمجرد أن تقسّم واجهة أمامية إلى حزم، يحتاج المستودع إلى مخطط بناء حقيقي—لا إعداد واحد عملاق من نوع «لنأمل أن يكتشف TypeScript الأمر». فقد صُمّمت <a href="https://www.typescriptlang.org/docs/handbook/project-references.html">مراجع مشروع TypeScript</a> خصيصًا لتقسيم البرامج إلى أجزاء أصغر، وتحسين أزمنة البناء، وفرض الفصل المنطقي، والعمل مع <code>tsc --build</code>. وبالنسبة إلى الواجهات الأمامية الدقيقة وقت البناء في TypeScript، فهذه عادةً أنظف طريقة لإبقاء حدود الحزم صادقة دون تحويل أداء المحرّر إلى سماد.</p>
<p>غالبًا ما يبدو إعداد جذر صغير هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;references&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/browse-restaurants&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/order-food&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./packages/user-profile&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./apps/shell&quot;</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا لا يحوّل الواجهة الأمامية إلى نظام موزّع، بل يجعل البناء يفهم مخطط الحزم نفسه الذي يحاول مستودعك التعبير عنه بالفعل.</p>
<h2 id="إدارة-الإصدار">إدارة الإصدار</h2>
<p>عادةً ما يكون للواجهات الأمامية الدقيقة وقت البناء قصتان للإصدار، ويُحرَق الفرق عندما يتظاهرون بأن هناك قصة واحدة. القصة الأولى هي قصة إصدار الحزم: أي شريحة تغيّرت، وأي رفع semver تحتاج، وهل تحتاج إصدارات الحزم النهائية إلى تحديث. والقصة الأخرى هي قصة إصدار المنتج: متى يُبنى تطبيق القشرة النهائي ويُشحن. ويقول pnpm صراحةً إن تنقيح مساحة العمل معقّد ويوجّه الناس إلى أدوات خارجية، بينما صُمّم Changesets حول تنقيح منسّق في مستودعات متعددة الحزم وتحديثات تلقائية للاعتمادات بين الحزم.</p>
<p>هنا غالبًا ما تكشف الواجهات الأمامية الدقيقة وقت البناء عن حقيقتها. فإذا كان كل تغيير ذي معنى ما زال ينتظر قطار إصدار تطبيق القشرة، فلديك معيارية الحزم لا الاستقلالية وقت التنفيذ. وهذا ليس سيئًا، بل مختلف فقط. وتحذير Fowler من الإصدار المتزامن (lockstep) هو السطر الذي لا يجب نسيانه.</p>
<h2 id="الاختبار-والتكامل">الاختبار والتكامل</h2>
<p>لأن التركيب يحدث وقت البناء، فالإخفاقات القبيحة عادةً إخفاقات عقد الحزمة، لا إخفاقات مُحمِّل بعيد أو بيان CDN. والاختبارات الأعلى قيمة هي اختبارات على مستوى الحزمة داخل كل شريحة، واختبارات تكامل القشرة التي تستورد نقاط الدخول المُصدَّرة الحقيقية، واختبارات العقد حول أي واجهات مسار أو وحدة تعتمد عليها شرائح متعددة. ويصوغ Fowler نسخة عقد المسار من هذه النقطة صراحةً: عندما تصبح المسارات هي العقد بين الواجهات الأمامية الدقيقة، ينبغي حمايتها باختبارات آلية.</p>
<p>من المفيد أيضًا تشغيل حزمة الشريحة في نوع من المعاينة المستقلة أو مضيف مثال، لكن دون الثقة بتلك المعاينة ثقة كاملة. فـ Fowler يحذّر من أن التطوير المستقل المبسّط قد ينحرف عن الحاوي الحقيقي، خاصةً حول الأنماط المشتركة/الشاملة والفروق البيئية الأخرى، لذا ما زلت تحتاج إلى تكامل منتظم في بيئات شبيهة بالإنتاج. استبدل «الحاوي» بـ «تطبيق القشرة» ويبقى الدرس نفسه تمامًا.</p>
<h2 id="متى-تبدأ-الواجهات-الأمامية-الدقيقة-وقت-البناء-في-الانهيار">متى تبدأ الواجهات الأمامية الدقيقة وقت البناء في الانهيار</h2>
<p>تبدأ في الانهيار عندما تتوقّع المؤسسة نشرًا مستقلًا من نموذج لا يوفّره جوهريًا. ويقول Fowler إن النهج القائم على الحزم وقت البناء يفرض إعادة تصريف كل شريحة وإصدارها لأي تغيير، وينصح بشدة ضدّه لهذا السبب. وإذا أراد العمل إيقاع إصدار لكل شريحة، أو إصدارات كناري، أو تراجعات فورية، أو تركيبًا وقت التنفيذ مؤجَّل الربط، فتكامل الحزم لا يكفي.</p>
<p>تبدأ أيضًا في الانهيار عندما تكون حدود الشرائح دقيقة أكثر من اللازم أو ثرثارة أكثر من اللازم. فإرشاد single-spa هو تفضيل التطبيقات القائمة على المسارات على التجزئة بمستوى المكوّن، ويقول بصراحة إنه إذا كانت الواجهات الأمامية الدقيقة تتشارك حالة الواجهة بشكل متكرر فينبغي أن تفكر في دمجها. والحالة المشتركة الدائمة هي عادةً المعمار يخبرك بأنه أراد حدًّا أكبر طوال الوقت.</p>
<p>وتنكسر عندما تكون نظافة الحزم ضعيفة. فالاستيرادات العميقة تنشئ واجهات برمجية عرَضية. وإعداد <code>type</code> / <code>exports</code> الغامض ينشئ أخطاء في صيغة الوحدات. والنشر المزدوج CJS/ESM قد يحمّل نسختين من الحزمة ذات الحالة نفسها. والنظراء غير الصالحون يتركون الشرائح تنحرف بصمت. ودورات مساحة العمل تُشابك الملكية. لا شيء من هذه مشكلات برّاقة، لكنها التي تؤذي فعلًا المعمارات القائمة على الحزم في قواعد الشيفرة الحقيقية.</p>
<h2 id="وقت-البناء-مقابل-وقت-التنفيذ">وقت البناء مقابل وقت التنفيذ</h2>
<table>
<thead>
<tr>
<th>البعد</th>
<th>وقت البناء</th>
<th>وقت التنفيذ</th>
</tr>
</thead>
<tbody>
<tr>
<td>توقيت التركيب</td>
<td>أثناء بناء التطبيق</td>
<td>في المتصفح أو وقت تنفيذ الخادم</td>
</tr>
<tr>
<td>عدد عمليات البناء</td>
<td>مخرَج نهائي واحد</td>
<td>عمليات بناء مستقلة متعددة</td>
</tr>
<tr>
<td>النشر المستقل</td>
<td>لا (إصدار متزامن)</td>
<td>نعم</td>
</tr>
<tr>
<td>الاعتمادات المشتركة</td>
<td>مُزال تكرارها بواسطة المُجمِّع</td>
<td>يُتفاوض عليها وقت التنفيذ (نطاقات المشاركة)</td>
</tr>
<tr>
<td>سلوك الحزمة</td>
<td>مخرَج مُجمِّع قياسي</td>
<td>تحميل بعيد غير متزامن</td>
</tr>
<tr>
<td>التعقيد التشغيلي</td>
<td>أقل (خط نشر واحد)</td>
<td>أعلى (خطوط لكل طرف بعيد)</td>
</tr>
<tr>
<td>الأنسب لـ</td>
<td>حدود الحزم، معيارية الفريق</td>
<td>الاستقلالية، إيقاع الإصدار المستقل</td>
</tr>
</tbody>
</table>
<p>التمييز الواضح هو هذا. تمنحك الواجهات الأمامية الدقيقة وقت البناء حدود حزم، واستيرادات ثابتة، وبناء تطبيق واحد، ومخرَج إصدار واحد، وسلوك مُجمِّع عادي. أما الواجهات الأمامية الدقيقة وقت التنفيذ فتُبقي عمليات بناء متعددة حيّة بعد التصريف وتركّبها في المتصفح أو وقت التنفيذ. ويعتمد الإعداد الموصى به من single-spa على وحدات ES داخل المتصفح وخرائط الاستيراد (import maps)، حيث يمكن تطوير كل تطبيق ونشره باستقلالية. ويصف Webpack Module Federation بأنها توفير الوحدات واستهلاكها من عمليات بناء منفصلة وقت التنفيذ.</p>
<p>تُحسّن الواجهات الأمامية الدقيقة وقت البناء من أجل عمليات أبسط وتكامل أقوى وقت التصريف. وتُحسّن الواجهات الأمامية الدقيقة وقت التنفيذ من أجل الاستقلالية والربط المتأخر. ويُبرز <a href="https://single-spa.js.org/">single-spa</a> أيضًا مزايا وقت التنفيذ مباشرةً: فيمكن تنزيل المكتبات الشائعة مرة واحدة، والتحميل الكسول للتطبيقات مباشر، وتستطيع الفرق النشر وفق جداولها الخاصة. وإن كانت هذه هي الفوائد التي تحتاجها، فحزم وقت البناء هي الجواب الخطأ. وإن لم تكن هذه عنق الزجاجة لديك، فقد يكون التركيب وقت التنفيذ مجرد آليات إضافية بميزانية تسويق بطولية.</p>
<h2 id="التوصية">التوصية</h2>
<p>استخدم الواجهات الأمامية الدقيقة وقت البناء عندما تريد حزم شرائح رأسية، وحدود واجهات برمجية قوية، وربما فرقًا متعددة، وقاعدة شيفرة أنظف—لكنك ما زلت راضيًا بمخرَج واحد مشحون. ضعها في مساحات عمل، واجعل صادرات الحزم صريحة، واستخدم اعتمادات النظراء للأطر التي يوفّرها المضيف، وأبقِ المخطط بلا دورات، وأضف مراجع مشروع TypeScript، ونَسِّق الحزم كمنتجات حقيقية.</p>
<p>لا تستخدم الواجهات الأمامية الدقيقة وقت البناء عندما يكون الهدف الحقيقي النشر المستقل. فقد أصدر Fowler الحكم في ذلك بالفعل: التكامل القائم على الحزم وقت البناء يعيد الإصدار المتزامن. وعند تلك النقطة، توقف عن مجاملة مخطط الحزم وانتقل إلى التركيب وقت التنفيذ. وإلا فلم تبنِ واجهات أمامية قابلة للنشر باستقلالية، بل بنيت كتلة واحدة معيارية بأخلاق أفضل.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:o,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,o as headings,c as html,p as slug,t as title};
