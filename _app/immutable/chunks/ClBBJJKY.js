const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="performance-budgets",p="موازنات الأداء",e=[{depth:2,id:"ما-الذي-ينبغي-أن-تغطيه-الموازنة",text:"ما الذي ينبغي أن تغطيه الموازنة"},{depth:2,id:"كيف-تضع-أرقاما-معقولة",text:"كيف تضع أرقامًا معقولة"},{depth:2,id:"كيف-تفرض-الموازنات",text:"كيف تفرض الموازنات"},{depth:2,id:"تطبيقات-الصفحة-الواحدة-وانتقالات-المسارات",text:"تطبيقات الصفحة الواحدة وانتقالات المسارات"},{depth:2,id:"ما-لا-ينبغي-فعله",text:"ما لا ينبغي فعله"},{depth:2,id:"سياسة-بداية-معقولة",text:"سياسة بداية معقولة"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"طبقات-الموازنة-الثلاث",text:"طبقات الموازنة الثلاث"},{depth:3,id:"عتبات-core-web-vitals",text:"عتبات Core Web Vitals"},{depth:3,id:"نقاط-الفرض",text:"نقاط الفرض"}],o=`<p>موازنات الأداء هي النقطة التي تتوقف فيها «نحن نهتم بالسرعة» عن كونها سمة شخصية وتصير قيدًا هندسيًا. وبأوضح العبارات، <strong>موازنة الأداء</strong> مجموعة حدود على مقاييس تؤثر في الأداء كما يدركه المستخدم، مثل وزن الصفحة، وعدد الطلبات، وزمن التحميل، أو مقاييس محددة تتمحور حول المستخدم. و<a href="https://web.dev/articles/performance-budgets-101">web.dev</a> تؤطّر الموازنات كنقطة مرجعية لقرارات التصميم والتقنية والميزات الجديدة، بينما تؤطّرها <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Performance_budgets">MDN</a> كحدود يراد بها منع التراجعات.</p>
<p>وهذا الجزء الثاني يهمّ أكثر مما يعترف الناس. فموازنة الأداء ليست في المقام الأول تقنية تحسين، بل سياسة إصدار. ومهمتها منع المنتج من أن يصير أبطأ بهدوء بينما الجميع مشغول بشحن «سكربت واحد إضافي فقط» أو «صورة رئيسية واحدة إضافية فقط». وتوصي <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Performance_budgets">MDN</a> أيضًا بالتفكير على مستويين، عتبة تحذير وعتبة خطأ، كي ترى المتاعب مبكرًا دون تحويل كل تراجع صغير إلى نشر محجوب.</p>
<h2 id="ما-الذي-ينبغي-أن-تغطيه-الموازنة">ما الذي ينبغي أن تغطيه الموازنة</h2>
<table>
<thead>
<tr>
<th>طبقة الموازنة</th>
<th>ما تقيسه</th>
<th>متى تعمل</th>
<th>المقاييس الرئيسية</th>
<th>أدوات الفرض</th>
</tr>
</thead>
<tbody>
<tr>
<td>موازنات الميدان</td>
<td>تجربة المستخدم الحقيقي</td>
<td>الإنتاج (RUM)</td>
<td>LCP وINP وCLS وTTFB (p75)</td>
<td><code>web-vitals</code> وCrUX ومنصة RUM</td>
</tr>
<tr>
<td>موازنات المختبر</td>
<td>بيئة اختبار مضبوطة</td>
<td>CI / ما قبل الإنتاج</td>
<td>FCP وLCP وTBT وعدد الطلبات</td>
<td>Lighthouse CI و<code>budget.json</code></td>
</tr>
<tr>
<td>موازنات الأصول</td>
<td>أحجام الملفات وعدد الطلبات</td>
<td>وقت البناء</td>
<td>بايتات JS، وبايتات CSS، وبايتات الصور، وعدد أطراف ثالثة</td>
<td><code>performance</code> في webpack، وإضافات المُجمِّعات</td>
</tr>
</tbody>
</table>
<p>الموازنة الجدّية فيها عادةً ثلاث طبقات. أولًا، تحتاج موازنات ميدان للتجربة التي يعيشها المستخدمون فعلًا. وثانيًا، تحتاج موازنات مختبر لاختبار ما قبل الإنتاج وCI. وثالثًا، تحتاج موازنات أصول وطلبات كي تُلتقط التراجعات أقرب إلى الشيفرة التي تسببت بها. وتوصي <a href="https://web.dev/articles/performance-budgets-101">web.dev</a> صراحةً بدمج المقاييس القائمة على الكمية مع المقاييس المتمحورة حول المستخدم بدل الاعتماد على فئة إشارة واحدة.</p>
<p>ولموازنات الميدان، يقع مركز الثقل الحديث في Core Web Vitals: LCP للتحميل، وINP للاستجابة، وCLS للاستقرار البصري. و<a href="https://web.dev/articles/vitals">توجيه Web Vitals</a> الحالي من Google هو اعتبار الصفحة «جيدة» فقط عندما تبلغ المئين 75 من زيارات الصفحة كل العتبات الثلاث، مقسّمة بين الأجهزة الجوالة وسطح المكتب: LCP عند 2.5 ثانية أو أقل، وINP عند 200 مللي ثانية أو أقل، وCLS عند 0.1 أو أقل. وقاعدة المئين 75 مهمة لأن المتوسطات تخفي الألم، ولا يطمئن مستخدميك خبر أن التجربة الوسيطة كانت جميلة بينما الطرف البطيء كان مشتعلًا.</p>
<p>وسأضيف عادةً TTFB كموازنة ميدان مساندة رغم أنه ليس من Core Web Vitals. فـ<a href="https://web.dev/articles/optimize-ttfb">web.dev</a> تصف 0.8 ثانية أو أقل كدليل جيد تقريبي لـTTFB، وتلاحظ أن بطء TTFB يجعل بلوغ عتبات جيدة لمقاييس مثل LCP وFCP أصعب بكثير. بعبارة أخرى، إن تأخّر الخادم في البداية، فبقية موازنتك يُسطى عليها بالفعل في موقف السيارات.</p>
<p>ولموازنات المختبر، استخدم مقاييس موثوقة في البيئات المضبوطة ومفيدة في CI. والفارق الدقيق أن المختبر والميدان غير قابلين للتبادل. فـ<a href="https://web.dev/articles/vitals-measurement-getting-started">web.dev</a> تقول صراحةً إن بيانات المختبر أساسية لسير عمل المطوّرين وCI، لكنها تحذّر أيضًا من أنها قد تختلف عن بيانات الميدان لأسباب ملموسة: فـLCP في المختبر قد يتباعد بسبب TTFB وإعادة التوجيه وزمن الاستجابة والتخصيص وفروق التخزين المؤقت؛ وقد يبدو CLS منخفضًا اصطناعيًا لأن كثيرًا من تشغيلات المختبر لا تتفاعل مع الصفحة؛ ولا يمكن قياس INP في بيئات المختبر لأنه يتطلب تفاعلات مستخدم حقيقية. ولذلك توصي web.dev بزمن الحجب الكلي (TBT) كبديل مختبري عن INP.</p>
<p>وهذا يعني أن موازنة مختبرية حديثة ينبغي أن تشدّد على FCP وLCP وTBT وعدد الطلبات وأحجام النقل، لا على أساطير حقبة Lighthouse القديمة. و<a href="https://web.dev/articles/fcp">توثيق FCP عند web.dev</a> يضع التوجيه الحالي عند 1.8 ثانية أو أقل، ولـTBT دون 200 مللي ثانية على أجهزة جوالة متوسطة. وTBT ليس من Core Web Vitals، لكن web.dev تسمّيه صراحةً قيّمًا لتشخيص مشكلات التفاعل والتقاطها لأنها قد تؤثر في INP.</p>
<p>ولموازنات الأصول والطلبات، الفئات المفيدة أشياء مثل إجمالي البايتات المنقولة، وبايتات السكربتات، وبايتات الصور، وبايتات أوراق الأنماط، وعدد الطلبات، وعدد أطراف ثالثة. و<a href="https://web.dev/articles/performance-budgets-101">دليل موازنات الأداء عند web.dev</a> يذكر بالضبط هذه الأنواع من المقاييس القائمة على الكمية، بما فيها حجم الصور، وحجم السكربتات، وعدد الخطوط، وإجمالي الموارد الخارجية مثل سكربتات الطرف الثالث. كما تدعم صيغة <code>budget.json</code> في Lighthouse موازنات موارد لـ<code>document</code> و<code>font</code> و<code>image</code> و<code>media</code> و<code>other</code> و<code>script</code> و<code>stylesheet</code> و<code>third-party</code> و<code>total</code>.</p>
<h2 id="كيف-تضع-أرقاما-معقولة">كيف تضع أرقامًا معقولة</h2>
<p>الخطأ الأول هو اختيار عتبات من الهواء لأنها تبدو مثيرة في شرائح العرض. و<a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Performance_budgets">إرشاد MDN</a> أفضل: ابدأ من الأجهزة وسرعات الاتصال التي يملكها مستخدموك فعلًا، وعرّف الموازنات كأهداف قابلة للبلوغ مرتبطة بتجربة المستخدم وبأهداف تجارية أو منتجية. بل يقترح التفكير من حيث أجهزة Android المنخفضة الفئة على اتصالات أبطأ، لأن هنا تتوقف الموازنات عن كونها للزينة.</p>
<p>والخطأ الثاني هو استخدام موازنة عامة واحدة للموقع كامل. فذلك خشن أكثر من اللازم لمعظم المنتجات. فالصفحة الرئيسية، وصفحة المقال، ولوحة المعلومات، والدفع، وهيكل التطبيق الموثَّق كثيرًا ما تكون لها موازنات مختلفة بدرجة ذات معنى. وتدعم <a href="https://github.com/GoogleChrome/budget.json"><code>budget.json</code></a> في Lighthouse المطابقة القائمة على المسار بصيغة شبيهة بـrobots.txt، وتفوز آخر قاعدة مطابقة، وهكذا تستطيع وضع افتراضي عريض ثم تجاوزه لأقسام محددة. كما تدعم Lighthouse CI الأمر <code>assertMatrix</code> الذي يتيح تطبيق تأكيدات مختلفة على أنماط عناوين مختلفة.</p>
<p>والخطأ الثالث هو تخصيص موازنة لدرجة Lighthouse وحدها. فللمقاييس القائمة على القواعد مكانها، لكن <a href="https://web.dev/articles/performance-budgets-101">web.dev</a> توصي صراحةً بدمج المقاييس القائمة على الكمية والمقاييس المتمحورة حول المستخدم، لا الاعتماد على مؤشر مركّب واحد. و<a href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring">توثيق تسجيل Lighthouse</a> يقول إن درجة الأداء متوسط مرجَّح لدرجات المقاييس الأساسية، وإن الأوزان تغيّرت عبر الزمن. وهذا يجعل الدرجة مفيدة كإشارة ثانوية وموازنة وحيدة رهيبة. فدرجة مركّبة جيدة للوحة تنفيذية، وضعيفة كبوابة إصدار.</p>
<p>ولذلك نموذج الموازنة الجيد طَبَقي وغير متماثل. ضع بوابات إصدار صلبة على عدد قليل من المقاييس المهمة فعلًا. وضع تحذيرات أطرى على مؤشرات قائدة غالبًا ما تنبئ بالتراجعات. فمثلًا، قد تفشل موازنة إنتاج فشلًا صلبًا عندما يتجاوز p75 لـLCP 2.5 ثانية أو يتجاوز p75 لـINP 200 مللي ثانية، بينما قد تحذّر موازنة CI عندما يزحف عدد طلبات الطرف الثالث صعودًا أو تنمو حزمة مسار بنسبة 10%. وهذا التقسيم «تحذير مقابل خطأ» هو بالضبط النمط الذي <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Performance_budgets">توصي به MDN</a>.</p>
<h2 id="كيف-تفرض-الموازنات">كيف تفرض الموازنات</h2>
<p>هناك ثلاث نقاط فرض تهمّ فعلًا: أثناء الحزم، وفي CI، وفي قياس الإنتاج.</p>
<p>في وقت البناء، تستطيع المُجمِّعات فرض موازنات بسيطة لحجم الملفات. ولwebpack <a href="https://webpack.js.org/configuration/performance/">تلميحات أداء</a> مدمجة لهذا. فتهيئة <code>performance</code> فيه تستطيع التحذير أو الإفشال عندما يتجاوز أصل مُصدَّر <code>maxAssetSize</code> أو يتجاوز نقطة دخول <code>maxEntrypointSize</code>، ويتيح لك <code>assetFilter</code> تقرير أي الملفات تُحتسب. ويوصي webpack صراحةً بـ<code>hints: &quot;error&quot;</code> في بناءات الإنتاج للمساعدة في منع شحن حزم مفرطة الحجم. وذلك خط دفاع أول مفيد، لا استراتيجية أداء كاملة. فهو يلتقط تضخم الحزمة مبكرًا، وهو أكثر مما تدبّره معظم الفرق.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">hints</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
    <span class="hljs-attr">maxAssetSize</span>: <span class="hljs-number">120000</span>,
    <span class="hljs-attr">maxEntrypointSize</span>: <span class="hljs-number">220000</span>,
    <span class="hljs-title function_">assetFilter</span>(<span class="hljs-params">assetFilename</span>) {
      <span class="hljs-keyword">return</span> assetFilename.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.js&#x27;</span>) || assetFilename.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.css&#x27;</span>);
    },
  },
};
</code></pre>
<p>وفي CI، Lighthouse وLighthouse CI هما الأداة البديهية. و<a href="https://developer.chrome.com/docs/lighthouse/overview">توثيق Lighthouse</a> من Chrome يصف Lighthouse كأداة تدقيق مؤتمتة يمكن تشغيلها في DevTools، أو من سطر الأوامر، أو كوحدة Node، ويذكر صراحةً Lighthouse CI كطريقة منع التراجعات باستمرار. وتدعم Lighthouse CI كلا التأكيدات العامة وموازنات بنمط <code>budget.json</code>. وإن استخدمت <code>budgetsFile</code>، فلا يمكن دمج وضع التأكيد ذلك مع خيارات تأكيد أخرى، لكن يمكنك أيضًا التعبير عن موازنات الموارد بصيغة التأكيد الخاصة بـLighthouse CI مثل <code>resource-summary:third-party:count</code> ودمجها مع تأكيدات المقاييس وتوقيتات المستخدم.</p>
<p>وهناك تفصيلان مهمان بشكل مزعج هنا. أولًا، إن أردت ظهور قسم الموازنات في تقرير Lighthouse نفسه، فتضبط <a href="https://googlechrome.github.io/lighthouse-ci/docs/configuration.html"><code>collect.settings.budgetPath</code></a>، ثم تستطيع تأكيد <code>&quot;performance-budget&quot;: &quot;error&quot;</code> في LHCI. وثانيًا، تستخدم <code>budget.json</code> الكيلوبايت لموازنات حجم الموارد، بينما يستخدم <code>maxNumericValue</code> في LHCI لتأكيدات <code>resource-summary:*:size</code> البايتات. وعدم تطابق الوحدات ذلك هو بالضبط نوع التفاهات الصغيرة التي تلتهم بعد ظهر كامل إن فوّتها.</p>
<p>وهذا ملف موازنات يضع حدودًا مختلفة للافتراضي في الموقع وللدفع:</p>
<pre><code class="language-json"><span class="hljs-comment">// budgets.json</span>
<span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/*&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resourceSizes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;script&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">170</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;total&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">500</span> <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resourceCounts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;third-party&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">8</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/checkout&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resourceSizes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;script&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">220</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;total&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">650</span> <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resourceCounts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resourceType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;third-party&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>ثم تشير تهيئة Lighthouse CI إلى ملف الموازنات ذلك وتضيف فوقه تأكيدات المقاييس وتوقيتات المستخدم.</p>
<pre><code class="language-json"><span class="hljs-comment">// lighthouserc.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ci&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;collect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;numberOfRuns&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;budgetPath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./budgets.json&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;assert&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;assertions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;performance-budget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;error&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;first-contentful-paint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-string">&quot;warn&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;maxNumericValue&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1800</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;aggregationMethod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;median&quot;</span> <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;resource-summary:third-party:count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;error&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;maxNumericValue&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">8</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;user-timings:route-ready&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;error&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;maxNumericValue&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1500</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>كما يمنحك <a href="https://googlechrome.github.io/lighthouse-ci/docs/configuration.html">Lighthouse CI</a> تحكمًا مفيدًا في التباين. فوثائقه تصف عدة طرق تجميع لتشغيلات متعددة: <code>median</code> و<code>optimistic</code> و<code>pessimistic</code> و<code>median-run</code>، ومثاله «التجربة الكاملة» يستخدم <code>numberOfRuns: 5</code>. وإن كانت موازناتك حساسة أكثر من اللازم لضجيج التشغيلات، فالمشكلة غالبًا ليست الموازنة نفسها بل طريقة تجميعك لتشغيلات المختبر.</p>
<p>وفي الإنتاج، تحتاج بيانات الميدان. و<a href="https://web.dev/articles/vitals-measurement-getting-started">web.dev</a> توصي صراحةً بتكميل أدوات CrUX بنظام RUM خاص بك لأنه أكثر تفصيلًا وأسرع، بينما مصادر CrUX تجمّع على نوافذ أطول مثل 28 يومًا في PSI وSearch Console أو شرائح شهر تقويمي في مجموعات بيانات CrUX ولوحاتها. وأسهل طريقة لجمع بيانات ميدانك الخاصة هي مكتبة <a href="https://github.com/GoogleChrome/web-vitals"><code>web-vitals</code></a>، التي تصفها وثائقها كمكتبة صغيرة معيارية لقياس Web Vitals على مستخدمين حقيقيين، وتوصي بها web.dev مباشرةً للفرق التي تبني RUM خاصًا بها.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { onCLS, onINP, onLCP } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;web-vitals&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">sendToRum</span>(<span class="hljs-params">metric</span>) {
  navigator.<span class="hljs-title function_">sendBeacon</span>(<span class="hljs-string">&#x27;/rum&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(metric));
}

<span class="hljs-title function_">onCLS</span>(sendToRum);
<span class="hljs-title function_">onINP</span>(sendToRum);
<span class="hljs-title function_">onLCP</span>(sendToRum);
</code></pre>
<p>وتلك المكتبة تستخدم أيضًا مراقبات مخزّنة مؤقتًا، لذا تلاحظ <a href="https://github.com/GoogleChrome/web-vitals">الوثائق</a> أنك لا تحتاج إلى تحميلها مبكرًا جدًا للحصول على قياسات دقيقة. وعمليًا، هذا يجعل قياس الميدان أسهل في الإضافة مما تتوقع الفرق، وهو أمر مذعج لأنه يزيل عذرًا آخر.</p>
<p>وللمراقبة والتحقيق، المكدّس المبدئي واضح تمامًا. فـ<a href="https://web.dev/articles/vitals-measurement-getting-started">دليل القياس</a> في web.dev يوصي بعرض المقاييس الحيّة في Chrome DevTools طريقة سهلة لمقارنة السلوك المحلي ببيانات CrUX، وPSI لبيانات 28 يومًا على مستوى الصفحة والأصل مع اقتراحات، وSearch Console لتقارير أداء خاصة بالصفحة مع سجل تاريخي. وهذه الأدوات رائعة للرؤية، لكن الفرض الفعلي ينبغي أن يبقى من CI وRUM الخاص بك، لأن هنا تصير الموازنات فورية بما يكفي لتشكيل سلوك الهندسة اليومي.</p>
<h2 id="تطبيقات-الصفحة-الواحدة-وانتقالات-المسارات">تطبيقات الصفحة الواحدة وانتقالات المسارات</h2>
<p>هنا يضيع الناس ويخترعون لوحات سيئة. فـ<a href="https://web.dev/articles/vitals-spa-faq">الأسئلة الشائعة عن SPA في web.dev</a> صريحة في أن Core Web Vitals لا تُعاد ضبطها حاليًا عند تغيير مسار في SPA لأن تلك المقاييس تُقاس نسبةً إلى التنقل الحالي في المستوى الأعلى. وإن كان تطبيقك يبدّل المحتوى ويحدّث العنوان دون تنقل متصفح حقيقي، فلا تعامل واجهات CWV ذلك كتحميل صفحة جديد. وهذا يعني أن CrUX والتقارير القياسية عن CWV لن تمنحك موازنة أنيقة لكل انتقال مسار في تطبيق صفحة واحدة.</p>
<p>لذا، بالنسبة إلى تطبيقات الصفحة الواحدة، خصّص موازنة لانتقالات المسارات منفصلة بـRUM مخصّص وتوقيتات على مستوى المسار من عندك. وتدعم Lighthouse CI تأكيدات على توقيتات مستخدم مخصّصة تُنشأ بـ<code>performance.mark()</code> و<code>performance.measure()</code>، بصيغة التأكيد <a href="https://googlechrome.github.io/lighthouse-ci/docs/configuration.html"><code>user-timings:&lt;kebab-cased-name&gt;</code></a>. وهذه هي الطريقة النظيفة لوضع موازنات لأشياء مثل «route-ready» أو«above-the-fold-ready» أو«search-results-rendered» في CI وقياس الميدان معًا، بدل التظاهر بأن CrUX سيفعل شيئًا لا يفعله حاليًا.</p>
<h2 id="ما-لا-ينبغي-فعله">ما لا ينبغي فعله</h2>
<p>لا تُقم برنامج موازنات جديد حول مقاييس Lighthouse المتقادمة. فبعض المقالات والأمثلة الأقدم ما زالت تتحدث عن First Meaningful Paint وTime to Interactive كأننا في 2019 والجميع ما زال يستمع إلى بودكاست الإنتاجية عن <code>bundlephobia</code>. لكن <a href="https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint">وثائق Lighthouse الحالية</a> تقول إن FMP أُزيل في Lighthouse 13 وينبغي استبداله بـLCP، وإن TTI أُزيل من Lighthouse 10 لأنه كان شديد الحساسية ومتغيّرًا. وللموازنات الحديثة، استخدم Core Web Vitals في الميدان واستخدم TBT كبديل مختبري عن أداء التفاعل.</p>
<p>لا تثق ببيانات المختبر وحدها. فـ<a href="https://web.dev/articles/use-lighthouse-for-performance-budgets">web.dev</a> صريحة جدًا في أن بيانات المختبر مفيدة وضرورية، لكنها تقول أيضًا إن عليك مقارنتها ببيانات الميدان لأن الاثنين يتباعدان لأسباب حقيقية، منها إعادات التوجيه، وزمن استجابة الخادم، والتخزين المؤقت، والتخصيص، والتفاعلات غير المتعلقة بالتحميل، وآثار العمر الافتراضي لمقاييس مثل CLS. فموازنة مختبرية وحدها أفضل من لا شيء، لكنها لا تكفي لتخبرك بما عاشه مستخدموك فعلًا.</p>
<p>لا تستخدم رقمًا واحدًا على مستوى الموقع لكل مسار. فبنية المسارات في <a href="https://github.com/GoogleChrome/budget.json"><code>budget.json</code></a> و<code>assertMatrix</code> القائم على العناوين في Lighthouse CI موجودان لأن صفحات ورحلات مختلفة تستحق موازنات مختلفة. فصفحة تسجيل الدخول، وصفحة مقال، ولوحة معلومات، ودفع، ليست الشيء نفسه، والتظاهر بأنها كذلك لا يجعل موازناتك إلا أكثر ضجيجًا وأقل احترامًا.</p>
<p>لا تستخدم درجة أداء Lighthouse كبوابة وحيدة. فـ<a href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring">توثيق تسجيل Lighthouse</a> يقول إن الدرجة متوسط مرجَّح لدرجات المقاييس الأساسية وإن تلك الأوزان تغيّرت عبر الزمن. استخدم الدرجة كملخّص، لا كعقدك الوحيد. وضع موازنات للمقاييس التي تمثّل فعلًا التجربة التي تهمّك.</p>
<h2 id="سياسة-بداية-معقولة">سياسة بداية معقولة</h2>
<p>لو كنت أُعدّ هذا من الصفر اليوم، لاستخدمت هذا الشكل. في الإنتاج، سأضع موازنة صلبة لـp75 LCP عند 2.5 ثانية، وp75 INP عند 200 مللي ثانية، وp75 CLS عند 0.1، وp75 TTFB عند 0.8 ثانية تقريبًا، كلٌّ منها منفصل للجوال وسطح المكتب. وفي CI، سأضع موازنة لـFCP عند 1.8 ثانية أو أقل، وTBT دون 200 مللي ثانية، ثم أضيف حدودًا خاصة بكل مسار لبايتات JS وإجمالي البايتات وعدد أطراف ثالثة مستنبطة من أسرع نسخة مقبولة حاليًا لكل قالب صفحة. وسأضع التحذيرات عند نحو 85% إلى 90% من الحد الصلب والأخطاء عند الحد نفسه، لأن الفرق تحتاج إنذارات دخان مبكرة بقدر ما تحتاج توقفات صلبة. والعتبات مأخوذة من <a href="https://web.dev/articles/vitals">Web Vitals</a> الحالية والتوجيه المساند؛ أما موازنات البايتات الدقيقة فينبغي أن تأتي من مساراتك أنت، وأجهزتك أنت، وحدود تحمّل منتجك أنت.</p>
<p>وهذه هي الحيلة كلها. ضع موازنة لتجربة المستخدم في الميدان، وموازنات للبدائل والموارد في CI، وموازنات للبايتات في وقت البناء. ثم اجعل الموازنات جزءًا من سياسة الإصدار بدل أن تكون ورق حائط في لوحة معلومات. هنا تتوقف موازنات الأداء عن كونها فكرة لطيفة وتبدأ في أداء مهمتها الفعلية.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="طبقات-الموازنة-الثلاث">طبقات الموازنة الثلاث</h3>
<blockquote>
<p>ضع موازنة لتجربة المستخدم في الميدان، وللبدائل في CI، وللبايتات في وقت البناء.</p>
</blockquote>
<table>
<thead>
<tr>
<th>الطبقة</th>
<th>ما تقيسه</th>
<th>أين تعمل</th>
<th>الأدوات</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الميدان</strong></td>
<td>مقاييس المستخدم الحقيقي (RUM)</td>
<td>الإنتاج</td>
<td>web-vitals وDatadog وSentry</td>
</tr>
<tr>
<td><strong>المختبر</strong></td>
<td>تدقيقات اصطناعية</td>
<td>CI</td>
<td>Lighthouse CI وWebPageTest</td>
</tr>
<tr>
<td><strong>الأصول</strong></td>
<td>حجم الحزمة وعدد الطلبات</td>
<td>وقت البناء</td>
<td><code>performance</code> في webpack، وbundlesize</td>
</tr>
</tbody>
</table>
<ul>
<li>تلتقط موازنات الميدان ما يعيشه المستخدمون فعلًا.</li>
<li>تلتقط موازنات المختبر التراجعات قبل النشر.</li>
<li>تلتقط موازنات الأصول المشكلات قبل شحن البناء.</li>
</ul>
<hr>
<h3 id="عتبات-core-web-vitals">عتبات Core Web Vitals</h3>
<blockquote>
<p>هذه هي الأرقام التي تهمّ عند p75.</p>
</blockquote>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>جيد</th>
<th>يحتاج تحسينًا</th>
<th>سيّئ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>LCP</strong></td>
<td>≤ 2.5 ث</td>
<td>≤ 4.0 ث</td>
<td>&gt; 4.0 ث</td>
</tr>
<tr>
<td><strong>INP</strong></td>
<td>≤ 200 مللي ث</td>
<td>≤ 500 مللي ث</td>
<td>&gt; 500 مللي ث</td>
</tr>
<tr>
<td><strong>CLS</strong></td>
<td>≤ 0.1</td>
<td>≤ 0.25</td>
<td>&gt; 0.25</td>
</tr>
</tbody>
</table>
<ul>
<li>ضع موازنة منفصلة للجوال وسطح المكتب—فهما جماعتان مختلفتان.</li>
<li>لا يمكن قياس INP في المختبر. استخدم TBT كبديل في CI.</li>
<li>قد يختلف LCP المختبري عن LCP الميداني بضعفين أو أكثر بسبب تباين TTFB.</li>
</ul>
<hr>
<h3 id="نقاط-الفرض">نقاط الفرض</h3>
<blockquote>
<p>موازنة لا يفرضها أحد هي ورق حائط في لوحة معلومات.</p>
</blockquote>
<ul>
<li><strong>وقت البناء:</strong> يُفشل <code>performance.maxAssetSize</code> و<code>maxEntrypointSize</code> في webpack البناء عندما تتجاوز الحزم الحدود.</li>
<li><strong>CI:</strong> تؤكد Lighthouse CI على عتبات المقاييس لكل مسار. استخدم تجميع <code>median</code> وتجاوزات قائمة على المسار.</li>
<li><strong>الإنتاج:</strong> اجمع بيانات الميدان بـ<code>web-vitals</code>، وأرسلها إلى خط تحليلاتك، ونبّه عند تراجع p75.</li>
<li>ضع التحذيرات عند 85–90% من الحد الصلب. فالفرق تحتاج إنذارات دخان مبكرة، لا توقفات صلبة فقط.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,o as html,t as slug,p as title};
