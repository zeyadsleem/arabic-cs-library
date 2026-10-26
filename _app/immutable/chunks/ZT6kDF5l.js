const e="kinney",s="enterprise-ui",n="واجهات المؤسسات",t="module-federation",a="اتحاد الوحدات (Module Federation)",o=[{depth:2,id:"متى-يكون-الأداة-المناسبة",text:"متى يكون الأداة المناسبة"},{depth:2,id:"النموذج-الذهني-الجوهري",text:"النموذج الذهني الجوهري"},{depth:2,id:"المنظومة-وقصة-الإصدارات",text:"المنظومة وقصة الإصدارات"},{depth:2,id:"سطح-التهيئة-الضروري",text:"سطح التهيئة الضروري"},{depth:2,id:"كيف-يعمل-التحميل-فعليا",text:"كيف يعمل التحميل فعليًا"},{depth:2,id:"وضع-إضافة-البناء-مقابل-وضع-وقت-التشغيل-المحض",text:"وضع إضافة البناء مقابل وضع وقت التشغيل المحض"},{depth:2,id:"الاعتمادات-المشتركة-كما-ينبغي-فهمها",text:"الاعتمادات المشتركة كما ينبغي فهمها"},{depth:3,id:"من-يقرر-الإصدار-المعتمد",text:"من يقرّر الإصدار المعتمد"},{depth:2,id:"نطاقات-المشاركة-والمجموعات-المتعددة",text:"نطاقات المشاركة والمجموعات المتعددة"},{depth:2,id:"استراتيجية-المشاركة-وسلوك-الإقلاع",text:"استراتيجية المشاركة وسلوك الإقلاع"},{depth:2,id:"الوحدات-البعيدة-المعتمدة-على-الوعود-والتسجيل-الديناميكي",text:"الوحدات البعيدة المعتمدة على الوعود والتسجيل الديناميكي"},{depth:2,id:"البيانات-مقابل-remoteentryjs",text:"البيانات مقابل remoteEntry.js"},{depth:2,id:"تلميحات-الأنواع-ودعم-typescript",text:"تلميحات الأنواع ودعم TypeScript"},{depth:2,id:"إضافات-وقت-التشغيل-وخطافاتها",text:"إضافات وقت التشغيل وخطافاتها"},{depth:2,id:"حل-المسار-العام-وعناوين-الموارد",text:"حلّ المسار العام وعناوين الموارد"},{depth:2,id:"الواقع-مع-التصيير-من-الخادم-وnode-وأطر-العمل",text:"الواقع مع التصيير من الخادم وNode وأطر العمل"},{depth:2,id:"عزل-الأنماط-وcss",text:"عزل الأنماط وCSS"},{depth:2,id:"التوجيه-وملكية-العنوان",text:"التوجيه وملكية العنوان"},{depth:2,id:"انحراف-الإصدارات-وتوقيت-النشر",text:"انحراف الإصدارات وتوقيت النشر"},{depth:2,id:"عزل-الأعطال",text:"عزل الأعطال"},{depth:2,id:"التنقيح-والرصد",text:"التنقيح والرصد"},{depth:2,id:"ضبط-الأداء",text:"ضبط الأداء"},{depth:2,id:"أكثر-الحالات-الحدية-شيوعا",text:"أكثر الحالات الحدّية شيوعًا"},{depth:2,id:"أفضل-الممارسات-التي-تصمد-فعلا",text:"أفضل الممارسات التي تصمد فعلًا"},{depth:2,id:"أقصر-ملخص-صادق",text:"أقصر ملخص صادق"}],c=`<p>اتحاد الوحدات (Module Federation) نموذج لمشاركة الشيفرة وقت التشغيل في تطبيقات JavaScript. و<a href="https://webpack.js.org/concepts/module-federation/">مفهوم webpack</a> الأصلي بسيط لكنه قوي: ينبغي أن تُشكّل عمليات بناء منفصلة عدة تطبيقًا واحدًا، حيث يستطيع كل بناء أن يعمل كحاوية، ويكشف وحدات، ويستهلك وحدات من حاويات أخرى وقت التشغيل. أما <code>ModuleFederationPlugin</code> العالي المستوى فهو الغلاف المُيسِّر فوق <code>ContainerPlugin</code> و<code>ContainerReferencePlugin</code> الأدنى مستوى في webpack.</p>
<p>والكلمة المهمة هنا هي «وقت التشغيل». فالوحدة البعيدة ليست جزءًا من البناء الحالي، بل تُحمَّل لا تزامنيًا من حاوية أخرى، ثم تُقيَّم تزامنيًا متى صار مصنعها متاحًا. وهذا يعني أن اتحاد الوحدات ليس مجرد حيلة تغليف، بل نظام تركيب وقت تشغيل يصادف أن المُجمِّعات تقوده. كما توضح أهداف مفهوم webpack أنه مقصود ليكون مستقلًا عن البيئة وقابلًا للاستخدام في الويب وNode.js، لا في الواجهات المصغّرة داخل المتصفح فقط.</p>
<h2 id="متى-يكون-الأداة-المناسبة">متى يكون الأداة المناسبة</h2>
<p>يكون اتحاد الوحدات خيارًا مناسبًا عندما تريد أن تتصرّف شرائح تُنشر باستقلال كتطبيق واحد. ومن حالات الاستخدام الرسمية في webpack: عمليات بناء منفصلة لكل صفحة في تطبيق أحادي الصفحة (SPA)، ومكتبة مكوّنات مشتركة تُكشف كحاوية، واختبارات A/B ديناميكية تستطيع تقديم نسخة مختلفة من وحدة مشتركة وقت التشغيل. وتشدّد الوثائق أيضًا على أن هذا يُسمّى غالبًا الواجهات المصغّرة، لكنه ليس مقصورًا عليها.</p>
<p>وهو الأداة الصحيحة أيضًا عندما تحتاج إلى لامركزية دون التخلي عن التركيب. فإن كان فريق يملك مسارًا أو ميزة نطاق أو مكتبة مكوّنات ويريد نشرها باستقلال، فبوسع الاتحاد أن يجعل ذلك ممكنًا. أما إن كنت تريد فقط شيفرة قابلة لإعادة الاستخدام بوتيرة إصدار متطابقة وبلا تحويل غير مباشر وقت التشغيل، فالحزمة العادية أبسط عادةً. فالبشر يعشقون إضافة نظام موزّع لأن المستودع الأحادي بدا سلميًا أكثر من اللازم.</p>
<h2 id="النموذج-الذهني-الجوهري">النموذج الذهني الجوهري</h2>
<p>خمسة مفاهيم تهمّ أكثر من غيرها.</p>
<p><strong>المُنتِج (producer)</strong> (ويُسمّى غالبًا الوحدة البعيدة) يكشف الوحدات. و<strong>المستهلك (consumer)</strong> (ويُسمّى غالبًا المضيف) يحمّل تلك الوحدات المكشوفة. و<strong>الحاوي (container)</strong> واجهة وقت التشغيل التي تلفّ عملية بناء. أما <strong>الاعتمادات المشتركة</strong> فتعيش في <strong>نطاقات المشاركة (share scopes)</strong>، وهي مجموعات مُسمّاة تُستخدم لقواعد إعادة الاستخدام والتجاوز. وواجهة الحاوي نفسها ضئيلة: <code>init</code> لربط نطاقات المشاركة، و<code>get</code> لاسترجاع مصنع وحدة مكشوفة.</p>
<p>و<strong>الوحدة المحلية</strong> مقابل <strong>الوحدة البعيدة</strong> هو الحدّ الذي ينبغي أن تُبقيه في ذهنك. فالوحدات المحلية تُصرَّف ضمن البناء الحالي. أما الوحدات البعيدة فتُكتشَف وتُحمَّل لاحقًا. والتحميل لا تزامني، ويقع عادةً خلف حدود حزم على نمط <code>import()</code>، ولهذا يبدو الاتحاد طبيعيًا مع التحميل المتأخر وتقسيم المسارات. ويلاحظ webpack صراحةً أيضًا أن الحاويات قابلة للتداخل، بل إن الاعتمادات الدائرية بين الحاويات ممكنة. وكونك <em>تستطيع</em> فعل ذلك لا يعني أن نفسك المستقبلية سترسل إليك الزهور.</p>
<p>وإليك اختصارًا مفيدًا:</p>
<pre><code>host app
  ├─ local modules
  ├─ shared dependencies
  └─ remote containers
       ├─ exposed module A
       └─ exposed module B
</code></pre>
<p>وهذا النموذج الذهني يكفي للاستدلال على معظم الأنظمة الحقيقية: من يملك الوحدة البعيدة، وما يُكشف، وما يُشارَك، وما يجب أن يكون أحادي النسخة، ومتى يحدث التحميل.</p>
<h2 id="المنظومة-وقصة-الإصدارات">المنظومة وقصة الإصدارات</h2>
<p>هناك ثلاث طبقات فعلًا ينبغي التمييز بينها. أولًا، يملك webpack 5 الإضافة الأصلية المدمجة <code>webpack.container.ModuleFederationPlugin</code>. وثانيًا، يوفّر <a href="https://rspack.dev/guide/features/module-federation">Rspack</a> دعمًا مدمجًا لاتحاد الوحدات الإصدار 1.5، بما في ذلك إضافات وقت التشغيل. وثالثًا، يضيف اتحاد الوحدات 2.0 ميزات مثل تلميحات أنواع TypeScript الديناميكية، وتكامل Chrome DevTools، وإضافات وقت التشغيل، والتحميل المسبق، وتقليم الشيفرة غير المستخدمة للاعتمادات المشتركة، والمزيد—عادةً عبر إضافات <code>@module-federation/enhanced</code>. وتوصي وثائق Rspack نفسها بالإصدار 1.5 أو 2.0، وتقول إن وضع التوافق مع الإصدار 1.0 لم يعد يُعمل عليه.</p>
<p>وبحسب الوثائق الرسمية الحالية، تمتد <a href="https://module-federation.io/blog/v2-stable-version">منظومة الإصدار 2.0</a> عبر كبرى أدوات التجميع والبيئات، ومنها webpack وRspack وRollup وRolldown وRsbuild وVite وMetro وModern.js وNext.js وRspress وRslib وStorybook وReact وVue وReact Native. وعمليًا، ليست جودة الدعم متطابقة في كل مكان، فاقرأ وثائق الإضافة الخاصة بمكدّسك التقني بالضبط بدل أن تفترض أن كل شارة تعني «النضج ذاته».</p>
<p>أما في webpack وRspack، فالمسار الرسمي لاتحاد الوحدات 2.0 هو <a href="https://module-federation.io/guide/build-plugins/plugins-webpack">الإضافة المحسّنة</a>. وتصف وثائق إضافة webpack إعادة التحميل الساخن للوحدات البعيدة المستهلكة، وتنزيل نوع الوحدة البعيدة، والدعم القياسي للمشاركة والوحدات البعيدة والكشف. وتعرض وثائق Rspack النموذج العام نفسه، وتبقى طبقة الاتحاد المدمجة في Rspack خيارًا من الدرجة الأولى إن لم تكن بحاجة إلى إضافات الإصدار 2.0.</p>
<p>ويوجد <a href="https://module-federation.io/guide/build-plugins/plugins-vite">دعم لـVite</a>، لكن وثائق الإضافة الرسمية لا تزال تقول إن الخيار <code>dev</code> غير مدعوم، مع إدراج التحديثات الساخنة للوحدات البعيدة وتصيير Nuxt من الخادم على خريطة الطريق. أما دعم Next.js فهو <a href="https://module-federation.io/guide/framework/nextjs">مُعلَّم صراحةً بأنه في طريق الإهمال</a>، ولا يدعم سوى موجّه الصفحات (Pages Router)، وتنبّه الوثائق إلى أن «موجّه التطبيق (App Router) غير مدعوم». ويُعدّ <a href="https://module-federation.io/guide/framework/modernjs">Modern.js</a> أقوى مسار رسمي مدمج مع إطار عمل في الوقت الحالي، وهو يتضمن دعم التصيير من الخادم.</p>
<h2 id="سطح-التهيئة-الضروري">سطح التهيئة الضروري</h2>
<p>على الأقل، تهيّئ <code>name</code> و<code>remotes</code> و<code>exposes</code> و<code>shared</code>. وفي <a href="https://module-federation.io/configure/name">وثائق التهيئة</a> الخاصة بالإصدار 2.0، يُعدّ <code>name</code> مطلوبًا ويجب أن يكون فريدًا لأنه يُستخدم لاسترجاع بيانات وقت التشغيل ومراجع تخزين الحزم العامة. ويتحكم <code>filename</code> في اسم مدخل الوحدة البعيدة المُولَّد، وقيمته الافتراضية <code>remoteEntry.js</code>.</p>
<p>ويخصّ <a href="https://module-federation.io/configure/exposes"><code>exposes</code></a> جهة المُنتِج. فضبطه يعني «هذا البناء ينشر وحدات». وتقول الوثائق إن الوحدات المكشوفة تُقسَّم إلى حزمة خاصة بها، وإن الحزم غير المتزامنة تُستخرج وفق قواعد تقسيم الحزم. وتتبع مفاتيح الكشف دلالات على نمط نقطة دخول الحزمة، والوثائق صريحة في أن <code>.</code> تعني التصدير الافتراضي، أما <code>&quot;./&quot;</code> وحده فغير مدعوم.</p>
<p>ويخصّ <a href="https://module-federation.io/configure/remotes"><code>remotes</code></a> جهة المستهلك. فالاسم المستعار الذي تهيّئه هو الاسم الذي يستورد منه تطبيقك، وليس بالضرورة أن يساوي <code>name</code> لدى المُنتِج. وصيغة سلسلة الوحدة البعيدة هي <code>producerName@entryUrl</code>، حيث يمكن أن يكون المدخل إما <code>remoteEntry.js</code> أو <code>mf-manifest.json</code>. وإن استخدمت <code>mf-manifest.json</code>، تقول الوثائق إنك تكسب تلميحات أنواع الوحدات الديناميكية، والتحميل المسبق للموارد، ودعم Chrome DevTool.</p>
<p>وإليك تهيئة مختصرة لوحدة بعيدة ومضيف:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// remote: module-federation.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;catalog&#x27;</span>,
  <span class="hljs-attr">filename</span>: <span class="hljs-string">&#x27;remoteEntry.js&#x27;</span>,
  <span class="hljs-attr">exposes</span>: {
    <span class="hljs-string">&#x27;./ProductCard&#x27;</span>: <span class="hljs-string">&#x27;./src/ProductCard.jsx&#x27;</span>,
    <span class="hljs-string">&#x27;./pricing&#x27;</span>: <span class="hljs-string">&#x27;./src/pricing.js&#x27;</span>,
  },
  <span class="hljs-attr">shared</span>: {
    <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> },
    <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> },
  },
};

<span class="hljs-comment">// host: module-federation.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shell&#x27;</span>,
  <span class="hljs-attr">remotes</span>: {
    <span class="hljs-attr">store</span>: <span class="hljs-string">&#x27;catalog@http://localhost:3001/remoteEntry.js&#x27;</span>,
  },
  <span class="hljs-attr">shared</span>: {
    <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> },
    <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span> },
  },
};
</code></pre>
<p>وهذا يتبع الفصل الرسمي بين المُنتِج والمستهلك: فالوحدة البعيدة تكشف وحدات، والمضيف يشير إلى الوحدة البعيدة عبر اسم مستعار، والاعتمادات المشتركة تُعلَن في الموضعين. ويكون مسار الاستيراد على جهة المضيف شيئًا مثل <code>store/ProductCard</code>، لأن الاسم المستعار هو ما يستخدمه المستهلك.</p>
<h2 id="كيف-يعمل-التحميل-فعليا">كيف يعمل التحميل فعليًا</h2>
<p>على مستوى webpack الخام، بروتوكول تحميل الوحدة البعيدة مباشر. فيُهيّئ المضيف أولًا نطاق المشاركة عبر <code>__webpack_init_sharing__(&quot;default&quot;)</code>. ثم يحصل على الحاوي وينادي <code>container.init(__webpack_share_scopes__.default)</code>. وأخيرًا ينادي <code>container.get(&quot;./module&quot;)</code> وينفّذ المصنع المُعاد. تلك هي المصافحة الحقيقية وقت التشغيل المتخفية تحت صيغة الإضافة الأنيقة.</p>
<p>عمليًا، تخفي إضافة البناء معظم ذلك. لكن النموذج المنخفض المستوى يهم لأنه يفسّر عدة حالات حدّية: لماذا التحميل غير متزامن، ولماذا يحدث حلّ الاعتمادات المشتركة قبل استخدام مصنع الوحدة، ولماذا يمكن ربط الوحدات البعيدة ديناميكيًا، ولماذا لا تحتاج الوحدات البعيدة المعتمدة على الوعود إلا إلى حلّ كائن يطبّق الواجهة نفسها <code>get</code>/<code>init</code>.</p>
<p>والتدفق منخفض المستوى:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">__webpack_init_sharing__</span>(<span class="hljs-string">&#x27;default&#x27;</span>);
<span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">window</span>.<span class="hljs-property">catalog</span>;
<span class="hljs-keyword">await</span> container.<span class="hljs-title function_">init</span>(__webpack_share_scopes__.<span class="hljs-property">default</span>);
<span class="hljs-keyword">const</span> factory = <span class="hljs-keyword">await</span> container.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;./ProductCard&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductCardModule</span> = <span class="hljs-title function_">factory</span>();
</code></pre>
<p>ولهذا يبدو اتحاد الوحدات سحريًا حتى تتذكر أنه «مجرد» سجلّ وقت تشغيل مضافًا إليه خطوة تفاوض على نطاق المشاركة. سجلّ بالغ الإسهاب، بطبيعة الحال، لأن الأشياء البسيطة ستُغضب المنظومة.</p>
<h2 id="وضع-إضافة-البناء-مقابل-وضع-وقت-التشغيل-المحض">وضع إضافة البناء مقابل وضع وقت التشغيل المحض</h2>
<table>
<thead>
<tr>
<th>الجانب</th>
<th>وضع إضافة البناء</th>
<th>وضع وقت التشغيل المحض</th>
</tr>
</thead>
<tbody>
<tr>
<td>التسجيل</td>
<td>مُعلَن في تهيئة المُجمِّع</td>
<td><code>createInstance()</code> + <code>registerRemotes()</code></td>
</tr>
<tr>
<td>صيغة الاستيراد</td>
<td><code>import()</code> / <code>React.lazy</code> العادية</td>
<td><code>loadRemote()</code> من واجهة وقت التشغيل</td>
</tr>
<tr>
<td>تلميحات الأنواع</td>
<td>نعم (عبر <code>dts</code>)</td>
<td>يدوي (<code>consumeTypes.remoteTypeUrls</code>)</td>
</tr>
<tr>
<td>التعامل مع الاعتمادات المشتركة</td>
<td>تلقائي ثنائي الاتجاه</td>
<td>يدوي عبر <code>registerShared()</code></td>
</tr>
<tr>
<td>الإضافة الديناميكية للوحدات البعيدة</td>
<td>محدودة</td>
<td>كاملة (<code>registerRemotes</code>)</td>
</tr>
<tr>
<td>الأنسب لـ</td>
<td>الإعدادات القياسية بوحدات بعيدة معروفة</td>
<td>التسجيل الديناميكي، وتعدد النسخ، وNode.js</td>
</tr>
</tbody>
</table>
<p>تقول <a href="https://module-federation.io/guide/runtime/">وثائق وقت التشغيل الرسمية</a> إن هناك طريقتين لتسجيل الوحدات وتحميلها: إعلانها في إضافة البناء، أو تسجيلها وتحميلها مباشرةً عبر واجهة وقت التشغيل. ويمكن مزج الوضعين. والفرق الكبير أن وضع إضافة البناء يدعم التحميل المباشر على نمط <code>import</code> وتلميحات أنواع الوحدات البعيدة، بينما يدعم وضع وقت التشغيل المحض التسجيل الديناميكي ويعمل بلا إضافة بناء—لكنك تحمّل عبر <code>loadRemote()</code> بدل صيغة الاستيراد العادية.</p>
<p>وإن استخدمت إضافة البناء، تُنشأ نسخة اتحاد وحدات تلقائيًا وتُخزَّن في الذاكرة. ولهذا يمكن استيراد <code>loadRemote()</code> مباشرةً من <code>@module-federation/enhanced/runtime</code> وهو يعرف مع ذلك نسخة التطبيق التي ينتمي إليها. أما إن لم تستخدم إضافة البناء، فعليك أن تنادي <code>createInstance()</code> بنفسك. وتُبرز <a href="https://module-federation.io/guide/runtime/runtime-api">الوثائق تحديدًا</a> استخدام وقت التشغيل المحض، ونسخ اتحاد الوحدات المنفصلة المتعددة، والتقسيم المخصص كأسباب لإنشاء نسختك الخاصة.</p>
<p>وهذا إعداد نموذجي لوقت التشغيل المحض:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createInstance } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/enhanced/runtime&#x27;</span>;

<span class="hljs-keyword">const</span> mf = <span class="hljs-title function_">createInstance</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shell&#x27;</span>,
  <span class="hljs-attr">remotes</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;catalog&#x27;</span>,
      <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;http://localhost:3001/mf-manifest.json&#x27;</span>,
    },
  ],
});

<span class="hljs-keyword">const</span> mod = <span class="hljs-keyword">await</span> mf.<span class="hljs-title function_">loadRemote</span>(<span class="hljs-string">&#x27;catalog/ProductCard&#x27;</span>);
</code></pre>
<p>وهذا النمط رسمي، وليس حيلة من المجتمع. فـ<a href="https://module-federation.io/blog/node">دليل Node.js</a> يقول إن الاتحاد بوقت التشغيل المحض يعمل في Node أيضًا، بما في ذلك الوحدات البعيدة القائمة على HTTP، ولهذا صار الاتحاد قابلًا للتطبيق في سيناريوهات التصيير من الخادم وواجهات الواجهة الخلفية وطبقة الخدمات، لا في المتصفحات فقط.</p>
<p>وتكشف واجهة وقت التشغيل أيضًا <code>registerRemotes</code>، و<code>registerShared</code>، و<code>registerPlugins</code>، و<code>getInstance</code>، و<code>loadShare</code>، و<code>preloadRemote</code>. والوثائق تصف <code>registerRemotes(..., { force: true })</code> صراحةً بأنها محفوفة بالمخاطر لأنها تستبدل الوحدات المسجَّلة والمحمَّلة وتحذف ذاكرتها المؤقتة إن كانت محمَّلة بالفعل. وهذا مفيد للنسخ التجريبية أو تبديل البيئات، لكنه من نوع الأدوات الجبارة التي تقطع الأصابع إن تعاملت معها بتراخٍ.</p>
<h2 id="الاعتمادات-المشتركة-كما-ينبغي-فهمها">الاعتمادات المشتركة كما ينبغي فهمها <span class="content-anchor" id="shared-dependencies-properly-understood"></span></h2>
<p>الوحدات المشتركة هي الجزء الذي يخشاه الناس لسبب وجيه. يعرّفها webpack بأنها وحدات قابلة للتجاوز في الوقت نفسه الذي تُقدَّم فيه كتجاوزات لحاويات متداخلة. وفي النموذج الافتراضي، لا تُقدَّم طلبات الوحدات في <code>shared</code> إلا عند استخدامها، وستطابق الطلبات المكافئة في بنائك، بل يمكنها تقديم واستهلاك نسخ متعددة عند وجود <code>node_modules</code> متداخلة. وهذه النقطة الأخيرة مهمة: فالمشاركة ليست أحادية النسخة تلقائيًا إلا إن جعلتها كذلك.</p>
<p>وفي <a href="https://module-federation.io/configure/shared">وثائق تهيئة الإصدار 2.0</a>، تشمل الخيارات المشتركة الشائعة <code>singleton</code> و<code>requiredVersion</code> و<code>eager</code> و<code>shareScope</code> و<code>import</code> و<code>allowNodeModulesSuffixMatch</code> وإعدادات تقليم الشيفرة غير المستخدمة. ونطاق المشاركة الافتراضي هو <code>&quot;default&quot;</code>. وتُؤخذ <code>requiredVersion</code> افتراضيًا من إصدار الاعتماد لدى التطبيق الحالي. أما <code>import: false</code> فتعني أن الاعتماد المشترك لن يُحزَّم في ذلك البناء إطلاقًا، فعلى بيئة الاستهلاك أن توفّره.</p>
<p>وفي حالة React وReact DOM، تُعدّ <code>singleton: true</code> الخطوة القياسية. وتوضح <a href="https://webpack.js.org/plugins/module-federation-plugin/">وثائق الإضافة</a> في webpack السبب صراحةً: فالمكتبات ذات الحالة الداخلية العامة، مثل React وReact DOM، ينبغي ألا يكون لها سوى نسخة واحدة نشطة في الوقت نفسه. وتقول الوثائق نفسها أيضًا إنه إن وُجدت إصدارات متعددة في نطاق المشاركة، فسيُستخدم أعلى إصدار دلالي.</p>
<p>وإليك كتلة مشاركة معقولة لـReact:</p>
<pre><code class="language-javascript"><span class="hljs-attr">shared</span>: {
  <span class="hljs-attr">react</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">requiredVersion</span>: deps.<span class="hljs-property">react</span>,
  },
  <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;react-dom&#x27;</span>],
  },
}
</code></pre>
<p>وهذا النمط موثّق مباشرةً في أمثلة إضافة webpack، وما زال النموذج الذهني الافتراضي للاتحاد القائم على React.</p>
<p>و<code>eager</code> هي الرافعة الكبيرة الأخرى. والتحذير واحد في وثائق webpack والإصدار 2.0 على السواء: فالمشاركة المتلهّفة (eager) تسحب الاعتماد المشترك إلى المدخل أو الحزمة الأولية بدل تحميله لا تزامنيًا، ما قد يضخّم حجم مدخلك ويُجبر على تنزيل تلك الوحدات مقدمًا. فلا تستخدمها إلا عندما تريد الإتاحة التزامنية عن قصد، وعادةً عند نقطة دخول قشرة واحدة، لا لأن رسالة الخطأ أزعجتك.</p>
<p>وإن كنت في عالم pnpm أو الروابط الرمزية أو المحمّلات المخصصة، فإن <code>allowNodeModulesSuffixMatch</code> تهم. تقول الوثائق الرسمية إنها تطابق الوحدات المشتركة عبر مقطع المسار المحلول بعد <code>node_modules/</code>، وهو ما يساعد عندما يحلّ المضيف والوحدة البعيدة الحزمة نفسها عبر مسارات مطلقة مختلفة لكنك ما زلت تريد معاملتها كالوحدة المشتركة نفسها. من تلك الخيارات الصغيرة التي توفّر وقتًا سخيفًا.</p>
<p>وتوثّق إضافة webpack الأصلية أيضًا تلميحات متقدمة لا تكون دائمًا بارزة في صفحات تهيئة الإضافة المحسّنة: <code>packageName</code> و<code>shareKey</code> و<code>strictVersion</code> و<code>version</code> الصريحة. وتعني <code>strictVersion: true</code> أن إصدارات المشاركة غير الصالحة ترمي خطأً للأحادية النسخة أو للوحدات بلا بديل احتياطي؛ وإلا فيمكن استخدام بديل احتياطي. وتتيح لك <code>shareKey</code> النشر تحت مفتاح طلب واحد والاستيراد تحت آخر. وتفيد <code>packageName</code> عندما يتعذّر استنتاج الإصدار المطلوب تلقائيًا من الطلب.</p>
<p>وثمة قاعدة دقيقة من صفحة مفاهيم webpack تستحق التذكر: طلبات المشاركة المنتهية بشرطة مائلة، مثل <code>&quot;react/&quot;</code>، تطابق كل طلبات الوحدات بذلك البادئة. وهكذا تشارك عن قصد الاستيرادات الفرعية بدل جذر الحزمة فحسب.</p>
<h3 id="من-يقرر-الإصدار-المعتمد">من يقرّر الإصدار المعتمد</h3>
<p>تشرح الآلية السابقة <em>كيف</em> يعمل اختيار الإصدار، لكن السؤال الأكثر تشويقًا هو <em>من يقرّر</em>. عمليًا، تكون <code>package.json</code> في قشرة المضيف هي مصدر الحقيقة عادةً. فالمضيف يهيّئ نطاق المشاركة أولًا، وإصدار React لدى المضيف هو الذي يملأ نطاق المشاركة <code>&quot;default&quot;</code> قبل أن يكون لأي وحدة بعيدة رأي. والوحدات البعيدة التي تعلن <code>singleton: true</code> و<code>requiredVersion</code> متوافقة ستعيد استخدام ما وفّره المضيف أيًا كان. وهذا ليس عقدًا رسميًا، بل مجرد نتيجة لترتيب التهيئة.</p>
<p>وأما ما يحدث عندما تثبّت وحدة بعيدة إصدارًا رئيسيًا مختلفًا، فهناك تصير الأمور غير مريحة. فإن وفّر المضيف React 18 وتوقّعت وحدة بعيدة React 17، فعلى وقت التشغيل أن يقرّر. وبلا <code>strictVersion</code>، يستخدم أعلى تطابق دلالي، ما يعني أن الوحدة البعيدة ستحصل على React 18 شاءت أم أبت. وإن كانت واجهة React 18 قد تغيّرت بطرق تعتمد عليها الوحدة البعيدة، فستنكسر الأخيرة بصمت وقت التشغيل. أما مع <code>strictVersion: true</code>، فالعدم التوافق يرمي خطأً، وهو على الأقل صادق بشأن المشكلة حتى إن لم يصلحها.</p>
<p>النمط العملي الذي تلتقي عليه معظم الفرق هو هذا: ثبّت الاعتمادات المشتركة على النطاق الرئيسي نفسه في كل الوحدات البعيدة، واستخدم <code>requiredVersion</code> للتعبير عن ذلك النطاق، واترك <code>singleton: true</code> تتولى إزالة التكرار. وتعامل مع رفع الإصدار الرئيسي لاعتماد مشترك كتغيير منسّق في النظام الاتحادي كله، لا كشيء تفعله فرقة واحدة في ظهيرة خميس. وتفرض بعض الفرق ذلك عبر فحوص CI تقارن <code>requiredVersion</code> المعلنة في كل وحدة بعيدة بالإصدار المثبَّت لدى المضيف. أما غيرها فلديه قناة Slack يقول فيها أحدهم «سنرفع React في السبرنت القادم» فيومئ الجميع. فحص CI أفضل، لكن الأمرين يحدثان.</p>
<h2 id="نطاقات-المشاركة-والمجموعات-المتعددة">نطاقات المشاركة والمجموعات المتعددة</h2>
<p><strong>نطاق المشاركة (share scope)</strong> ليس إلا مجموعة مُسمّاة من الاعتمادات المشتركة. والافتراضي هو <code>&quot;default&quot;</code>، لكن <a href="https://module-federation.io/configure/sharescope">وثائق الإصدار 2.0</a> تدعم نطاقات مشاركة متعددة كي تعزل مجالات إعادة الاستخدام. ويعلن المُنتِج النطاقات التي يهيّئها عبر <code>shareScope</code>، ويختار كل اعتماد مشترك نطاقًا عبر <code>shared[*].shareScope</code>، ويستطيع المستهلك مواءمة وحدات بعيدة محددة مع نطاق أو أكثر عبر <code>remotes[remote].shareScope</code>.</p>
<p>هذا يعني أنك تستطيع إبقاء React في المجموعة الافتراضية مع عزل شيء مثل نظام تصميم داخلي أو وقت تشغيل خاص في نطاق منفصل. وهذا مفيد عندما ينبغي لتطبيقين أن يعيدا استخدام بعض الأشياء على المستوى العام دون أن يوحّدا كل شيء عن غير قصد. وليس هذا عزلًا سحريًا، بل تجميع صريح للاعتمادات، وهو فكرة أصح بصراحة من معظم شعارات معمارية الواجهات الأمامية.</p>
<h2 id="استراتيجية-المشاركة-وسلوك-الإقلاع">استراتيجية المشاركة وسلوك الإقلاع</h2>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>متى تُحمَّل الوحدات البعيدة</th>
<th>اختيار الإصدار</th>
<th>سلوك الوحدة البعيدة غير المتصلة</th>
<th>الأنسب لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>version-first</code></td>
<td>تُحمَّل كلها أثناء الإقلاع</td>
<td>يُختار أعلى إصدار دلالي متوافق</td>
<td>قد يتعلّق الإقلاع أو يفشل</td>
<td>تنسيق صارم للإصدارات</td>
</tr>
<tr>
<td><code>loaded-first</code></td>
<td>تُحمَّل عند أول طلب وحدة</td>
<td>تعيد استخدام الاعتمادات المحمَّلة سابقًا</td>
<td>لا يفشل إلا إن طلبت الوحدة البعيدة الميتة</td>
<td>المرونة والتدرّج اللطيف في التدهور</td>
</tr>
</tbody>
</table>
<p>ويقدّم الإصدار 2.0 <a href="https://module-federation.io/configure/sharestrategy"><code>shareStrategy</code></a> بوضعين رسميين: <code>'version-first'</code> و<code>'loaded-first'</code>. والافتراضي هو <code>'version-first'</code>، الذي يحمّل كل الوحدات البعيدة أثناء التهيئة كي تُسجَّل الاعتمادات المشتركة وتُختار أعلى الإصدارات المتوافقة. أما <code>'loaded-first'</code> فيؤجّل تحميل الوحدات البعيدة حتى تُطلب وحدة فعلًا، ويعطي الأولوية لإعادة استخدام الاعتمادات المشتركة المحمَّلة سابقًا.</p>
<p>والمقايضة تشغيلية لا نظرية. فالوثائق واضحة في أن <code>'version-first'</code>، إن كانت وحدة بعيدة غير متصلة أثناء الإقلاع، تُشغّل <code>errorLoadRemote</code> مع <code>lifecycle: 'beforeLoadShare'</code>، وإن لم توفّر بديلًا احتياطيًا فقد يتعلّق التطبيق أو يفشل أثناء التهيئة. أما مع <code>'loaded-first'</code>، فلا تكسر الوحدات البعيدة غير المتصلة الإقلاع إلا إن طلبتها فعلًا. لذا، إن لم تكن شبكة وحداتك البعيدة موثوقة تمامًا، فـ<code>'loaded-first'</code> هي الافتراضي الأكثر صمودًا عادةً.</p>
<p>وإن احتجت فعلًا دلالات الأولوية للإصدار، فاقرنها بمنطق بديل احتياطي حقيقي عبر إضافات وقت التشغيل. فوثائق خطافات وقت التشغيل تدعم صراحةً أن يعيد <code>errorLoadRemote</code> سلوكًا بديلًا مخصصًا، وتُبرز وثائق استراتيجية المشاركة تحديدًا آليات إعادة المحاولة والبدائل الاحتياطية وحدود الأخطاء كتدابير للإنتاج.</p>
<h2 id="الوحدات-البعيدة-المعتمدة-على-الوعود-والتسجيل-الديناميكي">الوحدات البعيدة المعتمدة على الوعود والتسجيل الديناميكي</h2>
<p>تدعم وثائق webpack الرسمية <strong>الوحدات البعيدة الديناميكية المعتمدة على الوعود</strong>. فبدل سلسلة URL ثابتة في <code>remotes</code>، تستطيع تقديم وعد يُحلّ وقت التشغيل إلى كائن يطبّق <code>get</code> و<code>init</code>. وتعرض الوثائق استخدام معامل استعلام لاختيار <code>remoteEntry.js</code> مُصدَّر بإصدار، وحقن السكربت، ثم حلّ وكيل حول <code>window.app1</code>.</p>
<p>وهذا هو الحل المتعارف عليه لتوجيه المستأجرين، وأعلام الميزات، وتبديل البيئات، أو تثبيت الإصدارات وقت التشغيل. وهو أيضًا الجسر المفاهيمي إلى واجهات التسجيل وقت التشغيل في الإصدار 2.0 مثل <code>registerRemotes</code>، التي تتيح لك إضافة الوحدات البعيدة أو تجاوزها بعد الإقلاع. بل تستخدم الوثائق تجاوز الوحدة البعيدة كمثال، وتحذّر من أن <code>force: true</code> ينبغي استخدامها بحذر لأنها تستبدل الوحدات المحمَّلة وتمسح الذاكرات المؤقتة.</p>
<h2 id="البيانات-مقابل-remoteentryjs">البيانات مقابل <code>remoteEntry.js</code></h2>
<table>
<thead>
<tr>
<th>الجانب</th>
<th><code>remoteEntry.js</code></th>
<th><code>mf-manifest.json</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>الصيغة</td>
<td>JavaScript قابل للتنفيذ</td>
<td>JSON تصريحي</td>
</tr>
<tr>
<td>تلميحات الأنواع الديناميكية</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>التحميل المسبق للموارد</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>دعم Chrome DevTools</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>نضج المنظومة</td>
<td>كلاسيكي (عصر webpack 5)</td>
<td>الإصدار 2.0 وما بعده</td>
</tr>
<tr>
<td>استخدمه عندما</td>
<td>إعدادات بسيطة لا تحتاج إضافات</td>
<td>تريد الأنواع والتحميل المسبق وأدوات التطوير</td>
</tr>
</tbody>
</table>
<p>يدور اتحاد webpack الكلاسيكي حول <code>remoteEntry.js</code>. ويضيف الإصدار 2.0 <a href="https://module-federation.io/configure/manifest"><code>mf-manifest.json</code></a>، الذي تصفه الوثائق بأنه بيان موجّه لوقت التشغيل يمكن للمستهلكين استخدامه، وتقول <a href="https://module-federation.io/configure/remotes">وثائق الوحدات البعيدة</a> إن الوحدات البعيدة القائمة على البيان تفتح تلميحات الأنواع الديناميكية، والتحميل المسبق للموارد، وميزات Chrome DevTools. وإن كنت تريد سلسلة الأدوات الحديثة حول الاتحاد، فالوحدات البعيدة القائمة على البيان هي الخيار الأقدر.</p>
<p>وتدعم تهيئة البيان <code>fileName</code> و<code>filePath</code> و<code>disableAssetsAnalyze</code>. واسم الملف الافتراضي هو <code>mf-manifest.json</code>، وإن خصّصته، يحصل ملف الإحصاءات المرافق على اللاحقة <code>-stats</code> تلقائيًا. وهذا يهم عندما توحّد مخرجات النشر أو تبني أدوات حول البيان.</p>
<h2 id="تلميحات-الأنواع-ودعم-typescript">تلميحات الأنواع ودعم TypeScript</h2>
<p>قصة الأنواع في الإصدار 2.0 من أكبر تحسينات جودة الحياة. فخيار <a href="https://module-federation.io/configure/dts"><code>dts</code></a> قيمته الافتراضية <code>true</code>. وتقول الوثائق الرسمية إن المُنتِج سيولّد ملفًا مضغوطًا <code>@mf-types.zip</code> أثناء البناء، وسينزّل المستهلك أنواع الوحدة البعيدة ويستخرجها تلقائيًا إلى <code>@mf-types</code>. وهذه تجربة أجمل بكثير من التعريفات المحيطة المكتوبة يدويًا والدعاء.</p>
<p>وإن كنت تستخدم التحميل بوقت التشغيل المحض أو تستضيف الأنواع على عناوين غير قياسية، تتيح لك <a href="https://module-federation.io/configure/dts"><code>consumeTypes.remoteTypeUrls</code></a> تقديم تلك العناوين صراحةً. وتُبرز الوثائق سيناريوهات وقت التشغيل المحض كحالة استخدام محددة لهذا.</p>
<p>وإن فشل توليد الأنواع، فالنصيحة <a href="https://module-federation.io/guide/basic/type-prompt">الرسمية لاستكشاف الأخطاء وإصلاحها</a> هي البدء بـ<code>FEDERATION_DEBUG=true</code> وتمكين <code>dts.displayErrorInTerminal</code>، ثم فحص الطرفية وملف <code>.mf/typesGenerate.log</code>. من تلك الشذرات الصغيرة في الوثائق التي لا تقدّرها إلا بعد أن تقضي ساعة تتظاهر بأن TypeScript هو الغامض.</p>
<h2 id="إضافات-وقت-التشغيل-وخطافاتها">إضافات وقت التشغيل وخطافاتها</h2>
<p>من السمات المميزة للإصدار 2.0 نظام إضافات وقت التشغيل. وتقبل <a href="https://module-federation.io/configure/runtimeplugins">تهيئة <code>runtimePlugins</code></a> مسارات أو أزواجًا <code>[path, options]</code>، وتقول الوثائق إن تلك الإضافات تُحقن تلقائيًا وتُستخدم أثناء عملية البناء. وهذه هي نقطة التوسيع الرسمية لتغيير كيفية حلّ الوحدات البعيدة وجلبها وتحميلها وكيفية اختيار المشاركات.</p>
<p>أكثر <a href="https://module-federation.io/guide/runtime/runtime-hooks.html">الخطافات</a> فائدة هي <code>beforeRequest</code> و<code>afterResolve</code> لتعديل حلّ الوحدة البعيدة، و<code>errorLoadRemote</code> للبدائل الاحتياطية، و<code>resolveShare</code> لاختيار تطبيق مشترك يدويًا، و<code>createScript</code> لتخصيص طريقة إدراج سكربتات الوحدة البعيدة، و<code>fetch</code> للتحكم في طلبات البيان، و<code>loadEntry</code> لأنواع الوحدات البعيدة المخصصة كليًا أو نماذج التفويض. وتضم الوثائق أمثلة على بيانات الاعتماد في جلب البيانات، وخصائص السكربت المخصصة مثل <code>crossorigin=&quot;anonymous&quot;</code>، ووحدات JSON البعيدة، ووحدات التفويض.</p>
<p>وإليك إضافة وقت تشغيل تمثيلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">FederationRuntimePlugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@module-federation/enhanced/runtime&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> (<span class="hljs-params"></span>): <span class="hljs-title class_">FederationRuntimePlugin</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;with-credentials&#x27;</span>,
    <span class="hljs-title function_">fetch</span>(<span class="hljs-params">manifestUrl, requestInit</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetch</span>(manifestUrl, {
        ...requestInit,
        <span class="hljs-attr">credentials</span>: <span class="hljs-string">&#x27;include&#x27;</span>,
      });
    },
    <span class="hljs-title function_">createScript</span>(<span class="hljs-params">{ url }</span>) {
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">src</span> = url;
      script.<span class="hljs-property">crossOrigin</span> = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
      <span class="hljs-keyword">return</span> script;
    },
  };
}
</code></pre>
<p>وهذا هو الموضع الصحيح للسياسات الشاملة: المصادقة، وإعادة المحاولات، وحلّ المستأجرين، والرصد، والبدائل الاحتياطية عند انقطاع الاتصال، وغرائب CDN—بدل تلطيخ ذلك المنطق على كل مستهلك.</p>
<h2 id="حل-المسار-العام-وعناوين-الموارد">حلّ المسار العام وعناوين الموارد</h2>
<p>عناوين الموارد من نقاط ألم الاتحاد الكلاسيكية، خصوصًا خلف الوكلاء العكسيين أو المسارات الفرعية. وتصف وثائق webpack الرسمية حلّين وقت التشغيل. أحدهما كشف تابع من الوحدة البعيدة كي يضبط المضيف <code>__webpack_public_path__</code> قبل إقلاع بقية الوحدة البعيدة. والآخر استنتاج المسار العام من <code>document.currentScript.src</code>.</p>
<p>ويضيف الإصدار 2.0 أيضًا <a href="https://module-federation.io/configure/getpublicpath"><code>getPublicPath</code></a>. وتقول وثائق التهيئة إنه يجب أن يكون دالة تُقدَّم كسلسلة، وتُنفَّذ بـ<code>new Function</code> للحصول على بادئة المسار العام. وإن استخدمت إضافة webpack وأردت سلوك مسار عام ديناميكي هناك، تقول الوثائق صراحةً إن تضبط <code>__webpack_public_path__ = window.cdn_prefix</code> داخل جسم تلك الدالة. ولأن هذه شيفرة تُنفَّذ حرفيًا، فتعامل معها كتهيئة موثوقة فقط، لا كمكان تضع فيه عبثًا يتحكم به المستخدم.</p>
<h2 id="الواقع-مع-التصيير-من-الخادم-وnode-وأطر-العمل">الواقع مع التصيير من الخادم وNode وأطر العمل</h2>
<p>على مستوى المفهوم، تقول وثائق الاتحاد في webpack إن النموذج مستقل عن البيئة وقابل للاستخدام في الويب وNode.js. وعمليًا، يعتمد دعم التصيير من الخادم على طبقة أدواتك. ويقول <a href="https://module-federation.io/blog/node">دليل Node.js</a> الرسمي إن اتحاد الوحدات يعمل في Node مباشرةً، ويستطيع تحميل عمليات بناء CommonJS محلية أو وحدات بعيدة عبر HTTP من خلال واجهة وقت التشغيل.</p>
<p>و<a href="https://module-federation.io/guide/framework/modernjs">Modern.js</a> هو حاليًا أكمل مسار رسمي للتصيير من الخادم. وتقول وثائقه إن الإضافة تدعم التصيير من الخادم، وتلاحظ تحديدًا أنه لأسباب أداء لا يدعم تكامل Modern.js مع التصيير من الخادم سوى التصيير المتدفّق من الخادم. كما يُبرز منشور الإصدار المستقر 2.0 التصيير من الخادم كمجال قدرات رئيسي.</p>
<p>أما <a href="https://module-federation.io/guide/framework/nextjs">Next.js</a> فهو القصة المُحذِّرة. فتقول الوثائق الرسمية إن دعم إضافة Next.js آيل إلى الانتهاء، وإنها تدعم Next 12 إلى 15، والتصيير من الخادم، وموجّه الصفحات، وتُنبّه بشكل منفصل إلى أن موجّه التطبيق غير مدعوم. وتقول ملاحظات الاستخدام أيضًا إنك بحاجة إلى webpack محلي عبر <code>NEXT_PRIVATE_LOCAL_WEBPACK=true</code>، وتوصي بـ<code>React.lazy</code> بدل <code>next/dynamic</code> للمكوّنات الاتحادية لتجنّب أخطاء الترطيب (hydration).</p>
<p>و<a href="https://module-federation.io/guide/build-plugins/plugins-vite">Vite</a> قابل للاستخدام، لكن اقرأ الشروط الدقيقة. فوثائق إضافة Vite الرسمية تقول إن كل الخيارات مدعومة إلا <code>dev</code>، وتُدرج التحديثات الساخنة للوحدات البعيدة وتصيير Nuxt من الخادم على خريطة الطريق. وهذا ليس مانعًا قاطعًا، بل يعني فقط ألا تفترض التعادل مع webpack وRspack في كل مكان.</p>
<h2 id="عزل-الأنماط-وcss">عزل الأنماط وCSS</h2>
<p>وثائق <a href="https://module-federation.io/guide/basic/css-isolate">عزل الأنماط</a> الرسمية صريحة: لا يتولى اتحاد الوحدات عزل CSS مباشرةً، وهي تشرح السبب. فالاعتمادات المشتركة قد تفلت من الصناديق الرملية، وقد يصير العزل معتمدًا على ترتيب التحميل، ولمعالجة CSS للعزل وقت التشغيل حالات حدّية كثيرة. وتُبرز الوثائق مشكلات توافق Shadow DOM، ومشكلات جمع CSS ومسحه العسيرة التشخيص، والتأثير غير القابل للتحكم عندما تتغير الصناديق الرملية لدى المستهلك.</p>
<p>وتتمثل <a href="https://module-federation.io/guide/basic/css-isolate">المقاربات الموصى بها</a> في حلّ CSS لدى المُنتِج، لا في الاتحاد نفسه: استخدم CSS Modules، أو البادئات أو BEM، أو CSS-in-JS، أو إصدارات موحّدة لمكتبة المكوّنات، أو صدّر مكوّنات Shadow DOM مباشرةً عندما تكون تلك المقايضة مقبولة.</p>
<p>والخلاصة العملية بسيطة: لا تتوقع أن ينقذك الاتحاد من CSS العام. أبقِ حدود الأنماط داخل الوحدة البعيدة، وإلا انتهيت إلى تشخيص ترتيب التحميل في الثانية صباحًا كأحزن ساحر مسرح في العالم.</p>
<h2 id="التوجيه-وملكية-العنوان">التوجيه وملكية العنوان</h2>
<p>لا رأي لاتحاد الوحدات في التوجيه، ما يعني أن عليك أن يكون لك رأي. والجواب الافتراضي—وهو الصحيح عادةً—أن قشرة المضيف تملك الموجّه وشريط العنوان. فالمضيف يعرّف المسارات العليا، وكل مسار يثبّت الوحدة البعيدة المناسبة كمكوّن. وتُصيَّر الوحدة البعيدة داخل تخطيط المضيف، لا في تبويب متصفح خاص بها.</p>
<p>وإليك نمطًا نموذجيًا: فلدى المضيف مسارات لـ<code>/</code> و<code>/analytics</code> و<code>/catalog</code> و<code>/settings</code>. ومسار <code>/analytics</code> يحمّل وحدة التحليلات البعيدة تحميلًا متأخرًا، ومسار <code>/catalog</code> يحمّل وحدة الكتالوج البعيدة تحميلًا متأخرًا، وهكذا. وكل وحدة بعيدة تُلفّ بـ<code>React.lazy</code> و<code>&lt;Suspense&gt;</code>، فيتحكم موجّه المضيف في متى تُثبَّت الوحدة البعيدة وما يراه المستخدم أثناء تحميلها.</p>
<pre><code class="language-jsx"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Analytics</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;analytics/Dashboard&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Catalog</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;catalog/ProductList&#x27;</span>));

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Routes</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Home</span> /&gt;</span>} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
        <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/analytics/*&quot;</span>
        <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>
          &lt;<span class="hljs-attr">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">Analytics</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        }
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
        <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/catalog/*&quot;</span>
        <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>
          &lt;<span class="hljs-attr">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">Catalog</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        }
      /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">Routes</span>&gt;</span></span>
  );
}
</code></pre>
<p>وحرف البدل <code>/*</code> في تلك المسارات مهم. فهو يخبر موجّه المضيف أن يطابق أي مسار فرعي تحت <code>/analytics/</code> ويمرّره. وهذا يمنح الوحدة البعيدة مجالًا لشاشات فرعية داخلية—<code>/analytics/metrics</code>، و<code>/analytics/funnels</code>، أيًا كان—دون أن يحتاج المضيف إلى معرفتها. وتستطيع الوحدة البعيدة استخدام <code>&lt;Routes&gt;</code> المتداخلة الخاصة بها لتلك الشاشات الفرعية، لكنها لا تملك <code>&lt;BrowserRouter&gt;</code> الخاصة بها. فهي تقرأ العنوان وتصيّر وفقًا له، لكن موجّه المضيف هو من يدير مكدّس السجل.</p>
<p>والتنقل بين الوحدات البعيدة يستخدم موجّه المضيف فحسب. فعندما تريد وحدة التحليلات البعيدة أن تربط إلى صفحة كتالوج، تستخدم <code>&lt;Link to=&quot;/catalog/123&quot;&gt;</code> أو <code>navigate(&quot;/catalog/123&quot;)</code>—بالطريقة نفسها التي يتنقل بها أي مكوّن داخل المضيف. فيتولى موجّه المضيف الانتقال، ويفكّ تثبيت وحدة التحليلات البعيدة، ويثبّت وحدة الكتالوج البعيدة. بلا إعادة تحميل كاملة للصفحة، لأن قشرة المضيف لا تُفكّ أبدًا.</p>
<p>ويعمل زرا الرجوع والتقدم في المتصفح طبيعيًا للسبب نفسه. فموجّه المضيف يدير <code>window.history</code>، والوحدات البعيدة مجرد مكوّنات تُثبَّت وتُفكّ مع تغيّر العنوان. ويعمل الربط العميق أيضًا ما دام موجّه المضيف يعرف أي بادئات مسارات تقابل أي وحدات بعيدة: فإن حفظ المستخدم <code>/analytics/funnels</code> في المفضلة وعاد لاحقًا، يطابق موجّه المضيف <code>/analytics/*</code>، ويحمّل وحدة التحليلات البعيدة، ويصيّر التوجيه الداخلي في الوحدة البعيدة شاشة المسارات التحويلية (funnels).</p>
<p>والطريقة الوحيدة لكسر كل هذا أن تنشئ وحدة بعيدة <code>&lt;BrowserRouter&gt;</code> الخاصة بها. فموجّهان يتصارعان على <code>window.history</code> ينتجان بالضبط نوع فساد الحالة الذي يجعل الناس يندمون على قراراتهم المعمارية. وإن احتاجت وحدة بعيدة توجيهًا فرعيًا، فاستخدم <code>&lt;Routes&gt;</code> أو <code>useRoutes</code> من دون لفهما في <code>&lt;BrowserRouter&gt;</code> منفصل. ينبغي للوحدة البعيدة أن تقرأ العنوان، لا أن تملكه.</p>
<h2 id="انحراف-الإصدارات-وتوقيت-النشر">انحراف الإصدارات وتوقيت النشر</h2>
<p>لتفاوض الاعتمادات المشتركة آلية وقت تشغيل: مطابقة الإصدارات الدلالية، وحلّ الأحادية النسخة، و<code>strictVersion</code>. أما واجهات الوحدات المكشوفة فليس لها <em>شيء</em> من ذلك. فالوحدة المكشوفة مجرد تصدير JavaScript. لا فحص عقد وقت تشغيل، ولا تفاوض إصدارات، ولا مصافحة توافق. ومهما نشرته الوحدة البعيدة أحدثًا هو ما يحصل عليه المضيف عندما ينادي <code>container.get(&quot;./ProductCard&quot;)</code>.</p>
<p>وهذا يجعل انحراف الإصدارات بين وحدات بعيدة تُنشر باستقلال مشكلة تشغيلية هادئة بدل خطأ وقت تشغيل صاخب. وإليك السيناريو الذي يحدث فعلًا: يوم الثلاثاء، تنشر فرقة الكتالوج وحدة بعيدة تكشف <code>&lt;ProductCard&gt;</code> وتتوقع <code>{ title, price }</code> كخصائص. ويوم الخميس، تتفق الفرقة على إضافة خاصية <code>currency</code> مطلوبة. ويوم الجمعة، ينشر المضيف مع <code>&lt;ProductCard title=&quot;Widget&quot; price={9.99} currency=&quot;USD&quot; /&gt;</code>. لكن وحدة الكتالوج البعيدة لم تُعَد نشرها بعد. فالنسخة العاملة في الإنتاج ما زالت تتوقع <code>{ title, price }</code> وتتجاهل <code>currency</code> كليًا—أو الأسوأ، تُنشر الوحدة البعيدة الجديدة أولًا و<em>المضيف</em> لا يمرّر <code>currency</code> بعد، فيُصيَّر المكوّن بـ<code>undefined</code> حيث ينبغي أن يكون رمز العملة.</p>
<p>ولن يخبرك وقت التشغيل أن هذا حدث. فالوحدة تُحمَّل بنجاح. والمكوّن يُصيَّر. والخاصية الناقصة أو الزائدة <code>undefined</code> بصمت. ولا نظير لـ<code>strictVersion</code> في واجهات الوحدات المكشوفة. وإن كنت محظوظًا، فسيبدو الشكل خطأً. وإن كنت سيئ الحظ، فسيبدو <em>شبه</em> صحيح.</p>
<p>والجواب العملي أن تتعامل مع الوحدات المكشوفة كواجهات برمجية عامة. أبقِ التغييرات متوافقة مع الوراء: أضف خصائص اختيارية بقيم افتراضية بدل إضافة خصائص مطلوبة، ولا تُعِد تسمية خصائص يعتمد عليها المستهلكون ولا تحذفها. وتفيد ميزة <code>dts</code> في الإصدار 2.0 هنا: فإن نزّل المضيف أنواع TypeScript للوحدة البعيدة أثناء البناء، حصل المضيف على خطأ وقت البناء عندما يتغير العقد. وهذا أقرب شيء إلى فحص توافق وقت التصريف عبر حدود الاتحاد.</p>
<p>وعندما يكون تغيير كاسر لا مفر منه، نسّق ترتيب النشر. حدّث المُنتِج أولًا بنسخة متوافقة مع الوراء تدعم الواجهة القديمة والجديدة معًا. ثم انشر المستهلكين. ثم انشر المُنتِج مرة أخرى لإزالة طبقة التوافق مع الوراء. وهو نمط «التوسيع، ثم الترحيل، ثم التقليص» نفسه الذي تستخدمه في أي ترحيل واجهة برمجية، مطبَّقًا هنا على خصائص المكوّنات بدل نقاط النهاية عبر HTTP.</p>
<p>والشبكة التنظيمية الواقية هي اختبارات العقود: اختبارات آلية تتحقق من قدرة المضيف على تصيير الوحدات المكشوفة في الوحدة البعيدة بالخصائص التي يمرّرها فعلًا. وهذه تعمل في CI مقابل الأنواع المنشورة للوحدة البعيدة أو نسخة مبنية محليًا، وتفشل قبل النشر إن انكسر العقد. والفرق التي تتخطى هذه الخطوة تعرف بأمر انحراف الإصدارات من المستخدمين، وهو أغلى بيئة اختبار متاحة.</p>
<h2 id="عزل-الأعطال">عزل الأعطال</h2>
<p>إن كانت وحدة بعيدة مُدرجة في تهيئة <code>remotes</code> الساكنة وكانت تلك الوحدة غير قابلة للوصول، فالسلوك الافتراضي كارثي: يفشل جلب البيان في وقت تشغيل الاتحاد أثناء مرحلة تفاوض نطاق المشاركة، وينتشر الخطأ صعودًا عبر <code>import(&quot;./bootstrap&quot;)</code> غير المتزامن، ويفشل تطبيق المضيف كله في التثبيت. فيرى المستخدم صفحة بيضاء فارغة. لا مكوّن احتياطي، ولا رسالة خطأ—لا شيء.</p>
<p>والسبب في أن هذا أسوأ مما تتوقع أن العطل يحدث <em>قبل تثبيت React</em>. فحدود أخطاء React تلتقط الأخطاء أثناء التصيير، أما مرحلة التفاوض في الاتحاد فتعمل قبل أن يُنادى <code>createRoot</code> أصلًا. فحدّ الأخطاء موجود في شيفرتك المصدرية، لكنه لم يُنشأ قط في DOM. ولا تستطيع التقاط أخطاء في شجرة مكوّنات غير موجودة بعد.</p>
<p>وهناك ثلاثة أنماط تنجح فعلًا. أولًا، التقط فشل الإقلاع نفسه: لفّ <code>import(&quot;./bootstrap&quot;)</code> في <code>.catch()</code> داخل <code>index.tsx</code> وصيّر بديلًا احتياطيًا بـDOM خام. هذا قبيح (تلاعب خام بـDOM في تطبيق React)، لكنه الشيء الوحيد القادر على العمل في تلك النقطة من دورة الحياة. وثانيًا، اجعل الوحدات البعيدة اختيارية على مستوى الاستيراد: لفّ استيرادات <code>React.lazy</code> بـ<code>.catch()</code> كي تعيد وحدة بعيدة ميتة مكوّنًا احتياطيًا بدل الانهيار. وثالثًا، وهو الأنظف، استخدم التسجيل الديناميكي للوحدات البعيدة عبر واجهة وقت التشغيل كي لا تكون الوحدة البعيدة في التهيئة الساكنة أبدًا ولا يستطيع عطلها إسقاط مرحلة التفاوض.</p>
<p>وتستعرض <a href="https://stevekinney.com/courses/enterprise-ui/error-boundaries-and-federation">محاضرة حدود الأخطاء</a> كل نمط من هذه بتفصيل، بما في ذلك الخط الزمني الدقيق للعطل من تحميل السكربت إلى الصفحة البيضاء، وشيفرة عاملة لكل استراتيجية استعادة.</p>
<p>والخلاصة المعمارية بسيطة: افترض أن الوحدات البعيدة <em>ستفشل</em>. صمّم قشرة المضيف بحيث تكلّف وحدة بعيدة ميتة لوحة فارغة واحدة، لا تطبيقًا ميتًا. والفرق بين معمارية اتحادية جيدة وأخرى سيئة ليس عادةً في كيف تعمل حين يكون كل شيء قائمًا، بل في ما يحدث عندما يسقط جزء واحد ويجب على بقية النظام أن يقرّر هل يهمّه الأمر.</p>
<h2 id="التنقيح-والرصد">التنقيح والرصد</h2>
<p>يأتي الإصدار 2.0 بقصة تنقيح جيدة على نحو مفاجئ. فـ<a href="https://module-federation.io/guide/debug/chrome-devtool">إضافة Chrome DevTools</a> تستطيع تمرير الوحدات البعيدة المتصلة إلى نظيراتها المحلية، وفحص معلومات الوحدات، وعرض مخططات الاعتمادات، وتحليل إعادة استخدام الاعتمادات المشتركة، بما في ذلك سلوك الأحادية النسخة والإصدار الصارم. وتذكر الوثائق أن قدرات العرض والتمرير تتطلب <code>mf-manifest.json</code>.</p>
<p>وثمة أيضًا <a href="https://module-federation.io/guide/debug/variables">كائن <code>__FEDERATION__</code> العام</a> يُحقَن بعد التهيئة. وتقول الوثائق إنه يحتوي كل معلومات اتحاد الوحدات للتطبيق الحالي، بما في ذلك <code>moduleInfo</code> المعالَج، وتوصي باستخدام لوحة Chrome DevTools لفحصه. ويتيح لك <code>__FEDERATION__.__INSTANCES__</code> فحص نسخ وقت التشغيل المُنشأة.</p>
<p>وإن كنت تنقّح مشكلات الأنواع، فابدأ بـ<code>FEDERATION_DEBUG=true</code>. وإن كنت تنقّح الحلّ وقت التشغيل أو سلوك المشاركة، فاستخدم لوحة DevTools والمتغيرات العامة قبل أن تبدأ بإعادة كتابة التهيئة من الذاكرة. فالذاكرة ليست مصدر حقيقة، بل المكان الذي تختمر فيه الافتراضات الخاطئة.</p>
<h2 id="ضبط-الأداء">ضبط الأداء</h2>
<p>الرافعة الأولى ليست غريبة: تجنّب مشاركة أو اتحاد كل شيء. فالاعتمادات المشتركة وُجدت لتقليل التنزيلات المكررة وتمكين إعادة الاستخدام، لكن وثائق webpack و<a href="https://module-federation.io/configure/shared">الإصدار 2.0</a> على السواء تحذّر من أن المشاركة المتلهّفة تزيد حجم الحزمة الأولية وتفرض تنزيل الوحدات الموفَّرة والاحتياطية مقدمًا. فأبقِ الوحدات البعيدة وحدود المشاركة ذات معنى بدل تفتيتها.</p>
<p>والرافعة الثانية هي التحميل المسبق. وتضم <a href="https://module-federation.io/guide/runtime/runtime-api">واجهة وقت التشغيل</a> <code>preloadRemote</code>، التي تقول الوثائق إنها تستطيع بدء تحميل موارد الوحدة البعيدة أبكر لتجنّب طلبات الشلال. كما تتيح الوحدات البعيدة القائمة على البيان ميزات التحميل المسبق، ويضيف الإصدار 2.0 واجهتي <code>prefetch</code> و<code>cache</code> للجلب المسبق المتماثل للبيانات والتخزين المؤقت. وتحذّر وثائق الجلب المسبق أيضًا من أن الجلب المسبق قد ينتج بيانات قديمة إن عدّل المستخدمون حالة الخادم بعد تخزين نتيجة الجلب المسبق.</p>
<p>والرافعة الثالثة هي تقليم الاعتمادات المشتركة غير المستخدمة في الإصدار 2.0. ويقول <a href="https://module-federation.io/blog/v2-stable-version.html">منشور الإصدار المستقر الرسمي</a> إن الاعتمادات المشتركة تدعم الآن تقليم الشيفرة غير المستخدمة، بوضعي <code>runtime-infer</code> و<code>server-calc</code>. ويعمل <code>runtime-infer</code> مباشرةً، ويستطيع العودة إلى الاعتماد الكامل إن كانت النسخة المقلَّمة غير كافية. أما <code>server-calc</code> فموجّه إلى الأنظمة الأكبر حيث يستطيع خادم أو CI حساب نتيجة تقليم مثلى على المستوى العام.</p>
<p>وإن استخدمت <code>server-calc</code>، تعيد خدمة النشر بناء الاعتمادات المشتركة في مرور ثانٍ، ولا تُحمَّل تهيئة بناء مشروعك الأصلية في ذلك المرور. ولهذا توجد <a href="https://module-federation.io/configure/treeshakingsharedplugins"><code>treeShakingSharedPlugins</code></a>—لتمكينك من جلب إضافات البناء المطلوبة، مثل <code>externals</code> المخصصة، إلى إعادة بناء التقليم المشتركة. ويتحكم الخيار المرتبط <code>injectTreeShakingUsedExports</code> في ما إذا كانت الصادرات المستخدمة فعلًا تُحقَن في وقت تشغيل المُجمِّع، وتوصي الوثائق بضبطه على <code>false</code> مع <code>server-calc</code>.</p>
<p>والرافعة الرابعة هي <a href="https://module-federation.io/configure/experiments">كتلة <code>experiments</code></a>. فـ<code>asyncStartup</code> تُغني عن حيلة <code>import('./bootstrap')</code> الكلاسيكية وتجعل نقاط الدخول غير متزامنة تلقائيًا، وهو ما يساعد أيضًا في تجنّب أخطاء الاستهلاك المتلهّف. وتستطيع <code>externalRuntime</code> و<code>provideExternalRuntime</code> تقليص حجم مدخل الوحدة البعيدة تقليصًا هائلًا بجعل أعلى مستهلك يوفّر وقت التشغيل. وتقلّص <code>disableSnapshot</code> حجم وقت التشغيل أكثر، لكن الوثائق تحذّر من أنها تعطّل بروتوكول mf-manifest، ومزامنة TypeScript، وإعادة التحميل الساخن (HMR) للوحدات الاتحادية.</p>
<h2 id="أكثر-الحالات-الحدية-شيوعا">أكثر الحالات الحدّية شيوعًا</h2>
<p>الخطأ الكلاسيكي في webpack هو <code>Uncaught Error: Shared module is not available for eager consumption</code>. والإصلاح الرسمي إما جعل الاعتماد متلهّفًا—بحذر، وفي القشرة فقط عادةً—أو الأفضل، إدخال حدّ غير متزامن كي تحدث التهيئة لا تزامنيًا. وتُقعّد تجربة <code>asyncStartup</code> في الإصدار 2.0 ذلك المسار الثاني.</p>
<p>وإن رأيت <code>Module &quot;./Button&quot; does not exist in container</code>، فوثائق webpack تشير إلى صيغة مفتاح الكشف. فمفتاح الكشف يحتاج البادئة <code>./</code>، لذا <code>Button</code> خطأ و<code>./Button</code> صحيح.</p>
<p>وإن رأيت <code>fn is not a function</code>، تقول صفحة استكشاف الأخطاء في webpack إنك على الأرجح تفتقد حاوي الوحدة البعيدة. وإن كانت الوحدة البعيدة الهدف محمَّلة وبقي الخطأ، تقول الوثائق إن عليك التأكد من وجود ملف حاوي الوحدة البعيدة لدى حاوي المضيف أيضًا.</p>
<p>وإن تصادمت وحدات بعيدة متعددة، يوصي webpack بضبط <code>output.uniqueName</code> في عمليات بناء الوحدات البعيدة. كما يخبرك دليل الاتحاد في Rspack صراحةً بضبط <code>uniqueName</code> كي تعمل إعادة التحميل الساخن. من تلك التفاصيل الصغيرة في التهيئة التي تمنع تصادمات وقت التشغيل الغريبة قبل حدوثها.</p>
<p>وإن استخدمت <code>'version-first'</code> وخرجت وحدة بعيدة عن الاتصال، فسيظهر فشل الإقلاع عادةً عبر <code>errorLoadRemote</code> مع <code>lifecycle: 'beforeLoadShare'</code>. وتوصي الوثائق تحديدًا إما بالتحول إلى <code>'loaded-first'</code> للصمود، أو بتطبيق سلوك صريح للبديل الاحتياطي وإعادة المحاولة.</p>
<h2 id="أفضل-الممارسات-التي-تصمد-فعلا">أفضل الممارسات التي تصمد فعلًا</h2>
<p>اتحد شرائح رأسية خشنة الحبيبات أولًا: المسارات، أو ميزات النطاق، أو أسطح المكوّنات المستقرة. فحالات الاستخدام في webpack نفسها تشدّد على عمليات بناء منفصلة لكل صفحة ومكتبات مكوّنات كاملة كحاويات، لا كل ذرّة صغيرة. وإن اتحدت ويدجات ورقية صغيرة بلا حدّ ملكية حقيقي، فلن تكسب غالبًا سوى كلفة إضافية في الشبكة والتنسيق.</p>
<p>شارك React وReact DOM كأحاديين النسخة إلا إن كان لديك سبب غير معتاد جدًا لعدم ذلك. ولا تستخدم نطاقات مشاركة مخصصة إلا عندما تحتاج فعلًا مجموعات معزولة، مثل إبقاء نظام تصميم منفصلًا عن مجموعة React الافتراضية. فأبقِ <code>eager</code> نادرة، وأبقِ <code>import: false</code> مقصودة، وفعّل <code>allowNodeModulesSuffixMatch</code> مبكرًا في بيئات pnpm أو كثيفة الروابط الرمزية.</p>
<p>فضّل الوحدات البعيدة القائمة على البيان إن أردت تجربة المطوّر الأفضل: فالأنواع والتحميل المسبق وأدوات التطوير والتمرير كلها تعتمد على <code>mf-manifest.json</code>. واستخدم <code>remoteEntry.js</code> عندما تحتاج المدخل الكلاسيكي ولا تهمّك تلك الإضافات. وهذا ليس أيديولوجيا، بل هو فقط ما عليه تقسيم الميزات الرسمي حاليًا.</p>
<p>اختر <code>loaded-first</code> إلا إن كان تنسيق الإصدارات الصارم أهم من صمود الإقلاع. وضع مصادقة الوحدات البعيدة، وبيانات الاعتماد، وغرائب CDN، وسلوك البدائل الاحتياطية عند انقطاع الاتصال في إضافات وقت التشغيل بدل شيفرة تطبيق مرتجلة. واستخدم واجهة وقت التشغيل عندما تحتاج التسجيل الديناميكي أو التركيب بوقت التشغيل المحض. واستخدم إضافة البناء عندما تريد صيغة الاستيراد، والسلوك المشترك ثنائي الاتجاه، وتلميحات الأنواع.</p>
<p>كن صريحًا بلا مجاملة بشأن دعم أطر العمل. فـModern.js هو أقوى مسار رسمي للتصيير من الخادم. وموجّه الصفحات في Next.js يعمل الآن، لكن الإضافة الرسمية في طريق الإهمال، وموجّه التطبيق غير مدعوم. وVite يعمل، لكن الوثائق ما زالت تُدرج فجوات. ويبقى Rspack وwebpack الموطن الأكمل للنموذج.</p>
<h2 id="أقصر-ملخص-صادق">أقصر ملخص صادق</h2>
<p>اتحاد الوحدات بروتوكول حاويات وقت تشغيل مضافًا إليه تفاوض على الاعتمادات المشتركة. وعلى مستوى webpack، هو <code>get</code>/<code>init</code> ونطاقات المشاركة. وعلى مستوى المعمار، هو طريقة لتمكين تطبيقات مبنية ومنشورة باستقلال من التصرف كنظام واحد. والأجزاء الصعبة ليست «كيف أكشف مكوّنًا». الأجزاء الصعبة هي سياسة الإصدارات، وصمود الإقلاع، وحدود CSS، وحلّ المسار العام، وتقرير ما يستحق فعلًا أن يكون اتحاديًا من الأساس.</p>
<p>والأدوات الآن أفضل بكثير مما كانت قبل بضع سنوات، وهذا حسن الحظ، لأن الناس ما زالوا مصممين على بناء واجهات أمامية موزّعة سواء وافقت الفيزياء أم لم توافق.</p>
`,d={book:e,chapter:s,chapterTitle:n,slug:t,title:a,headings:o,html:c};export{e as book,s as chapter,n as chapterTitle,d as default,o as headings,c as html,t as slug,a as title};
