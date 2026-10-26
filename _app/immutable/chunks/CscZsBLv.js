const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",a="testing-at-scale",e="استراتيجية الاختبار للتطبيقات الكبيرة",p=[{depth:2,id:"اختيار-شكل-الاختبار",text:"اختيار شكل الاختبار"},{depth:3,id:"هرم-الاختبارات",text:"هرم الاختبارات"},{depth:3,id:"كأس-الاختبارات",text:"كأس الاختبارات"},{depth:3,id:"قرص-عسل-الاختبارات",text:"قرص عسل الاختبارات"},{depth:3,id:"أي-شكل-يناسب-حالتك",text:"أي شكل يناسب حالتك؟"},{depth:2,id:"اختبارات-الوحدة-في-واجهات-المؤسسات",text:"اختبارات الوحدة في واجهات المؤسسات"},{depth:3,id:"إدارة-الحالة-بوصفها-الهدف-عالي-القيمة",text:"إدارة الحالة بوصفها الهدف عالي القيمة"},{depth:3,id:"مسألة-المحاكاة",text:"مسألة المحاكاة"},{depth:2,id:"اختبارات-التكامل-كطبقة-الثقة",text:"اختبارات التكامل كطبقة الثقة"},{depth:2,id:"اختبار-الطرف-إلى-الطرف-على-نطاق-واسع",text:"اختبار الطرف إلى الطرف على نطاق واسع"},{depth:3,id:"playwright-مقابل-cypress",text:"Playwright مقابل Cypress"},{depth:3,id:"هيكلة-اختبارات-e2e-لقابلية-الصيانة",text:"هيكلة اختبارات E2E لقابلية الصيانة"},{depth:3,id:"التذبذب-مشكلة-استراتيجية",text:"التذبذب مشكلة استراتيجية"},{depth:2,id:"اختبار-الانحدار-البصري",text:"اختبار الانحدار البصري"},{depth:2,id:"أنماط-اختبار-خاصة-بالمؤسسات",text:"أنماط اختبار خاصة بالمؤسسات"},{depth:3,id:"التحكم-بالوصول-المبني-على-الأدوار-واختبار-الأذونات",text:"التحكم بالوصول المبني على الأدوار واختبار الأذونات"},{depth:3,id:"عزل-المستأجرين-المتعددين",text:"عزل المستأجرين المتعددين"},{depth:3,id:"التدويل",text:"التدويل"},{depth:3,id:"إمكانية-الوصول-كطبقة-اختبار",text:"إمكانية الوصول كطبقة اختبار"},{depth:2,id:"استراتيجيات-الاختبار-في-المستودع-الأحادي",text:"استراتيجيات الاختبار في المستودع الأحادي"},{depth:3,id:"كشف-المتأثر",text:"كشف المتأثر"},{depth:3,id:"بنية-الاختبار-المشتركة",text:"بنية الاختبار المشتركة"},{depth:3,id:"تنظيم-الاختبارات",text:"تنظيم الاختبارات"},{depth:2,id:"فجوة-اختبار-الواجهات-المصغرة",text:"فجوة اختبار الواجهات المصغّرة"},{depth:2,id:"vitest-مقابل-jest",text:"Vitest مقابل Jest"},{depth:2,id:"بيانات-الاختبار-والبيئات",text:"بيانات الاختبار والبيئات"},{depth:3,id:"إدارة-بيانات-الاختبار",text:"إدارة بيانات الاختبار"},{depth:3,id:"البيئات-العابرة",text:"البيئات العابرة"},{depth:2,id:"حوكمة-الاختبار",text:"حوكمة الاختبار"},{depth:2,id:"الخلاصة-السريعة",text:"الخلاصة السريعة"},{depth:3,id:"أشكال-الاختبارات",text:"أشكال الاختبارات"},{depth:3,id:"اختبار-الانحدار-البصري",text:"اختبار الانحدار البصري"}],l=`<p>عندما يكون لديك تطبيق واحد وفريق واحد، فإن استراتيجية الاختبار هي ما يتفق عليه الفريق في اجتماعه اليومي. اختبارات وحدة لمنطق العمل. وبضعة اختبارات تكامل للمسار السعيد. وربما بعض تشغيلات Playwright قبل الإصدار إن تذكّر أحد. هذا ينجح.</p>
<p>لكن بمجرد أن يصبح لديك مستودع أحادي فيه 50 حزمة، وثلاثة فرق تُصدر منتجاتها باستقلال، ورحلة مستخدم تلامس وحدات بعيدة يملكها ثلاثة فرق — يتوقف الاختبار عن كونه مهمة موضعية ويصبح شأنًا معماريًا. والسؤال ليس «هل نكتب اختبارات؟» بل ما <em>نوع</em> الاختبارات، و<em>أين</em> في خط الأنابيب، و<em>من يملك</em> مجموعة الاختبارات عندما تبدأ بالفشل في الثانية صباحًا من يوم ثلاثاء.</p>
<p>تتناول هذه المقالة الطبقة الاستراتيجية. لدينا بالفعل تغطية معمّقة لـ<a href="https://stevekinney.com/courses/enterprise-ui/mock-service-worker">Mock Service Worker</a> لمحاكاة الشبكة و<a href="https://stevekinney.com/courses/enterprise-ui/api-contract-testing">اختبار عقود الواجهات البرمجية (API Contract Testing)</a> لاستقرار الواجهات. وهنا نتحدث عن كيف تندرج هذه الأدوات في معمارية اختبار أوسع — وعن الأنماط الخاصة بالمؤسسات التي لا تظهر في الدروس المبنية حول تطبيقات قوائم المهام.</p>
<h2 id="اختيار-شكل-الاختبار">اختيار شكل الاختبار</h2>
<p>القرار الاستراتيجي الأول هو <em>أين توزّع الجهد</em>. ثلاثة نماذج تهيمن على النقاش، وهي تختلف على الجواب.</p>
<h3 id="هرم-الاختبارات">هرم الاختبارات</h3>
<p><a href="https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid">هرم الاختبارات</a> لمايك كوهن هو أقدم النماذج وأكثرها تدريسًا. قاعدة عريضة من اختبارات الوحدة. ووسط أضيق من اختبارات التكامل. وقمة رفيعة من اختبارات الطرف إلى الطرف. والفلسفة أن الاختبارات منخفضة المستوى سريعة ورخيصة ودقيقة — فينبغي أن يكون لديك منها الكثير. أما الاختبارات عالية المستوى فبطيئة ومكلفة وهشّة — فينبغي أن يكون لديك منها القليل.</p>
<p>في خلفية غنية بالمنطق، أو في تطبيق أحادي بقواعد عمل معقّدة، يظل الهرم خيارًا افتراضيًا معقولًا. فاختبارات الوحدة على الدوال النقية وانتقالات الحالة تمنحك تغذية راجعة سريعة بأقل بنية تحتية.</p>
<h3 id="كأس-الاختبارات">كأس الاختبارات</h3>
<p>لخّص Guillermo Rauch الحجة المضادة في جملة واحدة: «اكتب اختبارات. ليس الكثير منها. ومعظمها تكامل.» وصاغ Kent C. Dodds ذلك في <a href="https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications">كأس الاختبارات</a>، الذي يضيف طبقة تحليل ساكن في القاعدة وينقل مركز الثقل من اختبارات الوحدة إلى اختبارات التكامل.</p>
<p>والرؤية الجوهرية أن الأخطاء المثيرة في الواجهات الحديثة القائمة على المكوّنات لا تقع في دوال معزولة — بل في <em>كيفية تركيب الأشياء</em>. فقد يعمل خُطّاف <code>useAuth</code> بشكل مثالي بمعزل عن غيره، ثم يفشل تمامًا عند تغليفه بسياق موجّه ومزوّد سمات. واختبارات التكامل التي تمرّن المكوّنات كما يخوضها المستخدم هي التي تلتقط أخطاء التركيب هذه. والمبدأ الموجِّه لمكتبة Testing Library — «بقدر ما تشبه اختباراتك طريقة استخدام برنامجك، بقدر ما تمنحك من ثقة» — هو التعبير العملي عن هذه الفلسفة.</p>
<p>ولمعظم تطبيقات الصفحة الواحدة ذات المعماريات المدفوعة بالمكوّنات، يكون الكأس هو الافتراضي الأفضل. فهو يقايض شيئًا من سرعة اختبارات الوحدة بثقة أعلى بدرجة معتبرة في طبقة التكامل.</p>
<h3 id="قرص-عسل-الاختبارات">قرص عسل الاختبارات</h3>
<p>يتخذ <a href="https://engineering.atspotify.com/2018/01/testing-of-microservices/">قرص عسل الاختبارات عند Spotify</a> (ويُسمى أحيانًا ماسة الاختبارات) زاوية مختلفة تمامًا. ففي معمارية الخدمات المصغّرة أو الواجهات المصغّرة، تكون الخدمة الفردية <em>هي</em> الوحدة. والتعقيد المثير ليس داخل أي خدمة واحدة — بل عند الحدود التي تتواصل عبرها الخدمات. ويقلّل قرص العسل الجهد المبذول على تفاصيل التنفيذ الداخلية ويزيده إلى أقصى حد على نقاط التكامل والتحقق من العقود.</p>
<p>وإن كنت تدير إعدادًا من <a href="https://stevekinney.com/courses/enterprise-ui/module-federation">Module Federation</a> بوحدات بعيدة تُنشر بشكل مستقل، فإن تشديد قرص العسل على اختبار الحدود يتوافق جيدًا مع الواقع. فأنت لا تحتاج إلى 300 اختبار وحدة تثبت أن آلة الحالة الداخلية لوحدة بعيدة تعمل. بل تحتاج إلى اختبارات عقود تثبت أن الوحدة البعيدة ما زالت تحترم توقعات القشرة.</p>
<h3 id="أي-شكل-يناسب-حالتك">أي شكل يناسب حالتك؟</h3>
<pre><code>flowchart TB
  subgraph pyramid[&quot;Test Pyramid&quot;]
    direction TB
    p3[&quot;E2E&quot;]
    p2[&quot;Integration&quot;]
    p1[&quot;Unit Tests ✦&quot;]
  end

  subgraph trophy[&quot;Testing Trophy&quot;]
    direction TB
    t4[&quot;E2E&quot;]
    t3[&quot;Integration ✦&quot;]
    t2[&quot;Unit&quot;]
    t1[&quot;Static Analysis&quot;]
  end

  subgraph honeycomb[&quot;Testing Honeycomb&quot;]
    direction TB
    h3[&quot;System E2E&quot;]
    h2[&quot;Service Integration ✦&quot;]
    h1[&quot;Implementation&quot;]
  end

  style p1 fill:#4ade80,color:#000
  style p2 fill:#fbbf24,color:#000
  style p3 fill:#f87171,color:#000
  style t1 fill:#a78bfa,color:#000
  style t2 fill:#fbbf24,color:#000
  style t3 fill:#4ade80,color:#000
  style t4 fill:#f87171,color:#000
  style h1 fill:#fbbf24,color:#000
  style h2 fill:#4ade80,color:#000
  style h3 fill:#f87171,color:#000
</code></pre>
<p>تُعلّم علامة ✦ مركز ثقل كل نموذج — الطبقة التي يركّز فيها أكبر جهد اختباري.</p>
<table>
<thead>
<tr>
<th>النموذج</th>
<th>مركز الثقل</th>
<th>الأنسب لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td>الهرم</td>
<td>اختبارات الوحدة</td>
<td>الخلفيات الغنية بالمنطق، وقواعد الشيفرة المثقلة بالدوال النقية</td>
</tr>
<tr>
<td>الكأس</td>
<td>اختبارات التكامل</td>
<td>تطبيقات الصفحة الواحدة القائمة على المكوّنات، والواجهات الحديثة</td>
</tr>
<tr>
<td>قرص العسل</td>
<td>تكامل الخدمات</td>
<td>الواجهات المصغّرة، والخدمات المصغّرة، والأنظمة الموزّعة</td>
</tr>
</tbody>
</table>
<p>والجواب الصادق أن معظم التطبيقات الكبيرة تحتاج <em>عناصر من الثلاثة جميعًا</em>. فمنطق العمل النقي ما زال يستحق اختبارات وحدة. وتركيب المكوّنات يستحق اختبارات تكامل. وحدود الخدمات المتبادلة تستحق اختبارات عقود. والشكل يخبرك أين تضع <em>أكبر</em> جهد، لا الجهد <em>الوحيد</em>.</p>
<blockquote>
<p><strong>النمط المضاد للهرم المقلوب</strong></p>
<p>هناك شكل واحد يجب تجنّبه بنشاط: <strong>الهرم المقلوب</strong> (ويُسمى أحيانًا «مخروط الآيس كريم»). وهو ما تحصل عليه عندما يذهب معظم جهد الاختبار إلى الاختبار اليدوي ومجموعات E2E البطيئة، مع تغطية ضئيلة من اختبارات الوحدة أو التكامل في القاعدة. إنه مكلف وبطيء، وأول ما ينهار تحت الضغط. وإن كانت مجموعة اختبارات فريقك تستغرق 45 دقيقة ومعظمها Selenium، فأنت تعيش في الهرم المقلوب شئت أم أبيت.</p>
</blockquote>
<h2 id="اختبارات-الوحدة-في-واجهات-المؤسسات">اختبارات الوحدة في واجهات المؤسسات</h2>
<p>اختبارات الوحدة في واجهة كبيرة لا تتعلق باختبار <code>add(2, 3)</code>. بل بالتحقق من منطق العمل الذي يعيش في الخُطّافات والمخفّضات (reducers) وآلات الحالة ودوال الأدوات المساعدة.</p>
<h3 id="إدارة-الحالة-بوصفها-الهدف-عالي-القيمة">إدارة الحالة بوصفها الهدف عالي القيمة</h3>
<p>المخفّضات وإجراءات المخزن وانتقالات آلات الحالة هي أعلى الأهداف ثقةً لاختبارات الوحدة لأنها دوال نقية. فبالنظر إلى الحالة A والحدث B، تكون النتيجة دائمًا الحالة C. لا DOM، ولا تصيير، ولا عمل غير متزامن — مجرد تحويلات على البيانات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { cartReducer, initialState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./cart-reducer&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;cartReducer&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;adds an item to an empty cart&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">cartReducer</span>(initialState, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;sku-1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Widget&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-number">1</span> },
    });

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">items</span>).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">total</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">25</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;increments quantity for duplicate items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> stateWithItem = <span class="hljs-title function_">cartReducer</span>(initialState, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;sku-1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Widget&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-number">1</span> },
    });
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">cartReducer</span>(stateWithItem, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;sku-1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Widget&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-number">1</span> },
    });

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">items</span>).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">items</span>[<span class="hljs-number">0</span>].<span class="hljs-property">quantity</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">total</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">50</span>);
  });
});
</code></pre>
<p>هذا هو نوع المنطق الذي يستحق اختبار وحدة مستقصيًا. فانتقالات الحالة في تدفّق الدفع، وحسابات الأذونات في نظام التحكم بالوصول المبني على الأدوار، وحسابات الأسعار في وحدة الفوترة — كلها حتمية وحرجة ورخيصة الاختبار. والفرق التي تحقق تغطية عالية لانتقالات الحالة تميل إلى إنتاج حوادث أقل من نوع «المجموع كان خاطئًا».</p>
<h3 id="مسألة-المحاكاة">مسألة المحاكاة</h3>
<p>استراتيجية المحاكاة التي تختارها تؤثر تأثيرًا مباشرًا في المدة التي تظل فيها مجموعة اختباراتك مفيدة. فهناك طيف، وكل موضع عليه يقايض شيئًا.</p>
<p><strong>المحاكاة على مستوى الوحدة</strong> (<code>jest.mock</code>، <code>vi.mock</code>) تستبدل وحدة كاملة ببديل مزيف. وهي سريعة وسهلة، وهي أيضًا الأكثر عرضة لإنتاج بدائل مُحاكاة قديمة — اختبارات تنجح لأن البديل لم يعد يطابق الواقع، لا لأن الشيفرة تعمل. فإن حاكيت وحدة ثم تغيّرت واجهتها البرمجية، لم ينكسر شيء في الاختبار. وذلك هو نمط الفشل.</p>
<p><strong>حقن الاعتماد</strong> يمرّر الاعتمادات كوسائط، فيجعل التبديل صريحًا وآمن من حيث الأنواع. والمقايضة هي عبء معماري — إذ تحتاج شيفرتك إلى قبول اعتماداتها بدل استيرادها مباشرة. وهو في الخدمات والأدوات غالبًا القرار الصحيح، أما في مكوّنات React فقد يبدو مبالغة في الهندسة.</p>
<p><strong>الاعتراض على مستوى الشبكة</strong> عبر <a href="https://stevekinney.com/courses/enterprise-ui/mock-service-worker">Mock Service Worker</a> يقف بين تطبيقك والشبكة. فشيفرة التطبيق تعمل تمامًا كما تعمل في الإنتاج. ويعترض MSW على مستوى عامل الخدمة في المتصفح وعلى مستوى وحدة <code>http</code> في Node.js. وهذا هو الافتراضي الصحيح لأي شيء يجري نداءات إلى الواجهات البرمجية، لأن البديل المُحاكى واقعي، وشيفرة التطبيق لم تُمسّ، والمجموعة نفسها من المعالجات تعمل في اختبارات الوحدة، واختبارات التكامل، وStorybook، والتطوير المحلي.</p>
<p>والفرق هو أين يحدث الاعتراض:</p>
<pre><code>flowchart LR
  Code[&quot;Application Code&quot;] --&gt; Import[&quot;Module Import&quot;]
  Import --&gt; Service[&quot;Service / Utility&quot;]
  Service --&gt; Client[&quot;HTTP Client&quot;]
  Client --&gt; Network[&quot;Network&quot;]

  Mock[&quot;vi.mock&quot;] -.-&gt;|intercepts| Import
  DI[&quot;Dependency Injection&quot;] -.-&gt;|intercepts| Service
  MSW[&quot;MSW&quot;] -.-&gt;|intercepts| Network

  style Mock fill:#f87171,color:#000
  style DI fill:#fbbf24,color:#000
  style MSW fill:#4ade80,color:#000
</code></pre>
<p>وكلما اتجهت في الاعتراض إلى اليمين، صار الاختبار أشبه بالإنتاج — لكنك تحتاج إلى بنية تحتية أكثر. ويقف MSW عند حدود الشبكة، ما يعني أن مسار الشيفرة كاملًا في التطبيق يعمل تمامًا كما يعمل في الإنتاج.</p>
<p>والنمط الذي رأيته ينجح أفضل ما يكون في قواعد الشيفرة الكبيرة: استخدم MSW لكل محاكاة الواجهات البرمجية، واستخدم حقن الاعتماد لمنطق الخدمات المعقّد، ولا تلجأ إلى <code>vi.mock</code> إلا لاعتمادات الأوراق الطرفية الحقيقية مثل مكتبات التواريخ أو مولّدات الأرقام العشوائية حيث يكون البديل أسوأ.</p>
<h2 id="اختبارات-التكامل-كطبقة-الثقة">اختبارات التكامل كطبقة الثقة</h2>
<p>تتحقق اختبارات التكامل من أن المكوّنات والخُطّافات ووحدات الحالة تتركّب بشكل صحيح. وفي تطبيق كبير، هنا تختبئ معظم الأخطاء عالية القيمة — لا في الوحدات الفردية، بل في المفاصل بينها.</p>
<p>و<a href="https://testing-library.com/docs/guiding-principles">مكتبة Testing Library</a> تُقنّن الفلسفة الصحيحة: تفاعل مع DOM كما يتفاعل المستخدم. استعلم بالدور والتسمية والنص — لا بصنف CSS أو بمعرّف اختبار. وأطلق أحداثًا حقيقية. وتحقّق من النواتج المرئية. وإن كنت تمدّ يدك إلى داخل المكوّن لتفحص قيم الحالة، فأنت تختبر التنفيذ لا السلوك. وهذا الفرق هو الفرق بين اختبارات تنجو من إعادة الهيكلة واختبارات تنكسر كلما أعاد أحد تسمية متغيّر.</p>
<p>والقاعدة العملية لاختبارات التكامل في المؤسسات: اختبر <em>الميزات</em> لا <em>المكوّنات</em>. فاختبار تكامل لـ«البحث والتصفية» يمرّن حقل الإدخال، وخُطّاف تأخير الإدخال، ونداء الواجهة البرمجية (الذي يعترضه MSW)، وتحديث الحالة، وتصيير النتائج — كل ذلك في تدفّق واحد. وذلك هو التركيب الذي تحتاج فعلًا إلى التحقق منه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen, waitFor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserSearch</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./user-search&#x27;</span>;

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;filters users by search term&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> user = userEvent.<span class="hljs-title function_">setup</span>();
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserSearch</span> /&gt;</span></span>);

  <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">type</span>(screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;searchbox&#x27;</span>), <span class="hljs-string">&#x27;Ada&#x27;</span>);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Ada Lovelace&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">queryByText</span>(<span class="hljs-string">&#x27;Alan Turing&#x27;</span>)).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<p>بلا محاكاة لدواخل المكوّن. وبلا فحص لحالة الخُطّاف. فقط «اكتب اسمًا، وسترى النتائج الصحيحة». هذا الاختبار سينجو من إعادة هيكلة من Redux إلى Zustand، ومن ترحيل من Axios إلى <code>fetch</code>، ومن إعادة كتابة كاملة لمنطق تأخير الإدخال — لأنه يختبر العقد لا الآلة.</p>
<h2 id="اختبار-الطرف-إلى-الطرف-على-نطاق-واسع">اختبار الطرف إلى الطرف على نطاق واسع</h2>
<p>تُشغّل اختبارات E2E التطبيق كاملًا في متصفح حقيقي. وهي أكثر الاختبارات كلفةً مما يمكنك كتابته — أبطؤها تشغيلًا، وأكثرها بنية تحتية للصيانة، وأشدّها عرضة للتذبذب — وهي أيضًا الاختبارات الوحيدة التي تتحقق من المنظومة كاملة مُركَّبة. والهدف ليس تغطية كل شيء، بل تغطية <strong>رحلات المستخدم الحرجة</strong> التي لو تعطّلت لأحدثت ضررًا تجاريًا حقيقيًا.</p>
<h3 id="playwright-مقابل-cypress">Playwright مقابل Cypress</h3>
<p>يمثّل إطارا E2E المهيمنان قرارين معماريين مختلفين جذريًا.</p>
<p><strong>Cypress</strong> يعمل داخل حلقة تنفيذ المتصفح. فالاختبارات والتطبيق يتشاركان بيئة تشغيل JavaScript نفسها. وهذا ينتج تجربة تصحيح أخطاء ممتازة — إذ يمكنك ملاحظة حالة التطبيق مباشرة، والانتظار التلقائي في Cypress بديهي. أما القيد فهو الصندوق الأمني للمتصفح. فاختبار تبويبات متعددة، والتنقل عبر أصول مختلفة، وأي شيء يتطلب التحكم بسلوك المتصفح من <em>خارج</em> التبويب — كلها مقيّدة معماريًا.</p>
<p>أما <strong>Playwright</strong> فيتواصل مع المتصفحات عبر <a href="https://chromedevtools.github.io/devtools-protocol/">بروتوكول Chrome DevTools</a> فوق WebSocket. وهو يعمل خارج العملية، ما يعني أنه يستطيع إدارة سياقات تبويبات ونطاقات متعددة أصلًا بشكل أصلي. ويدعم Chromium وFirefox وWebKit (Safari) من واجهة واحدة. وله تنفيذ متوازٍ من الدرجة الأولى مع تقسيم قائم على العمال. ولا يتطلب خدمة سحابية مدفوعة للتوازي في CI.</p>
<p>والفرق المعماري يبدو هكذا:</p>
<pre><code>flowchart TB
  subgraph cypress[&quot;Cypress&quot;]
    direction TB
    CyTest[&quot;Test Code&quot;] --&gt; CyBrowser[&quot;Browser Runtime&quot;]
    CyApp[&quot;Application&quot;] --&gt; CyBrowser
    CyBrowser --&gt; CyDOM[&quot;Shared DOM&quot;]
  end

  subgraph playwright[&quot;Playwright&quot;]
    direction TB
    PwTest[&quot;Test Code&quot;] --&gt;|WebSocket / CDP| PwBrowser[&quot;Browser Process&quot;]
    PwBrowser --&gt; PwDOM[&quot;DOM&quot;]
    PwTest --&gt;|WebSocket / CDP| PwBrowser2[&quot;Browser Process 2&quot;]
    PwBrowser2 --&gt; PwDOM2[&quot;DOM&quot;]
  end

  style cypress fill:#1e293b,color:#f1f5f9
  style playwright fill:#1e293b,color:#f1f5f9
</code></pre>
<p>يتشارك Cypress بيئة التشغيل مع التطبيق — وهذا رائع للملاحظة، ومحدود في السيناريوهات متعددة السياقات. أما Playwright فيتحكم بالمتصفحات من الخارج، ما يعني أنه يستطيع إدارة سياقات وتبويبات متعددة، وحتى محرّكات متصفح مختلفة، في الوقت نفسه.</p>
<p>ولاختبار على نطاق المؤسسات — حيث تحتاج إلى تغطية عبر متصفحات متعددة، وتنفيذ متوازٍ على عشرات عُقد CI، ورحلات مستخدم عبر نطاقات متعددة — تتوسّع معمارية Playwright على نحو أفضل. فنموذج Cypress داخل المتصفح رائع لتجربة المطوّر في المجموعات الأصغر، لكنك ستتجاوزه بمجرد أن تتخطى مجموعة E2E بضعة عشرات من الاختبارات وتحتاج إلى التشغيل في أقل من عشر دقائق.</p>
<h3 id="هيكلة-اختبارات-e2e-لقابلية-الصيانة">هيكلة اختبارات E2E لقابلية الصيانة</h3>
<p>تتحلّل مجموعة E2E الكبيرة سريعًا بلا أنماط هيكلية. فـ<strong>نموذج كائن الصفحة</strong> (Page Object Model) يجرد تفاعلات مستوى الصفحة في أصناف، فينفصل منطق الاختبار عن محدِّدات DOM. لكن في المعماريات القائمة على المكوّنات يكون <strong>نموذج كائن المكوّن</strong> (Component Object Model) غالبًا أنسب — فهو يعامل شذرات واجهة المستخدم القابلة لإعادة الاستخدام (أشرطة التنقل، وجداول البيانات، والنوافذ المنبثقة) كائنات قابلة للتركيب يمكن استخدامها في عدة اختبارات على مستوى الصفحة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Component object for a shared data table</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">DataTable</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">page</span>: <span class="hljs-title class_">Page</span></span>) {}

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">rowCount</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">page</span>.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;row&#x27;</span>).<span class="hljs-title function_">count</span>() - <span class="hljs-number">1</span>; <span class="hljs-comment">// subtract header</span>
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">cellText</span>(<span class="hljs-params"><span class="hljs-attr">row</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">page</span>
      .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;row&#x27;</span>)
      .<span class="hljs-title function_">nth</span>(row + <span class="hljs-number">1</span>)
      .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;cell&#x27;</span>, { <span class="hljs-attr">name</span>: column })
      .<span class="hljs-title function_">textContent</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">sortBy</span>(<span class="hljs-params"><span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">page</span>.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;columnheader&#x27;</span>, { <span class="hljs-attr">name</span>: column }).<span class="hljs-title function_">click</span>();
  }
}

<span class="hljs-comment">// Used across multiple test files</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;users table sorts by name&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/users&#x27;</span>);
  <span class="hljs-keyword">const</span> table = <span class="hljs-keyword">new</span> <span class="hljs-title class_">DataTable</span>(page);

  <span class="hljs-keyword">await</span> table.<span class="hljs-title function_">sortBy</span>(<span class="hljs-string">&#x27;Name&#x27;</span>);
  <span class="hljs-keyword">const</span> firstCell = <span class="hljs-keyword">await</span> table.<span class="hljs-title function_">cellText</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;Name&#x27;</span>);
  <span class="hljs-title function_">expect</span>(firstCell).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Ada Lovelace&#x27;</span>);
});
</code></pre>
<p>عندما يتغير بنية HTML لجدول البيانات، تحدّث صنفًا واحدًا. وكل اختبار يستخدمه يظل يعمل. وهذا هو الفرق بين مجموعة E2E قابلة للصيانة وكومة من المحدِّدات المكررة يهجرها صاحبها بعد إعادة الهيكلة الثالثة.</p>
<h3 id="التذبذب-مشكلة-استراتيجية">التذبذب مشكلة استراتيجية</h3>
<p>اختبار بموثوقية 99% يبدو جيدًا. لكن مجموعة من 200 اختبار بموثوقية 99% لكل منها ستنتج فشلًا زائفًا واحدًا على الأقل في 87% من التشغيلات. وعلى نطاق المؤسسات، ليس التذبذب مجرد إزعاج — بل هو ما يجعل الفرق تكفّ عن الثقة بمجموعة الاختبارات وتبدأ بالدمج دون CI أخضر.</p>
<p>والدفاعات:</p>
<ul>
<li><strong>محدِّدات حتمية.</strong> استخدم <code>getByRole</code> أو <code>getByLabel</code> أو خصائص <code>data-testid</code>. لا تعتمد أبدًا على أصناف CSS أو فهارس الوسوم أو تعبيرات XPath التي تنكسر عندما يعيد أحد ترتيب <code>div</code>.</li>
<li><strong>عزل الاختبارات.</strong> يحصل كل اختبار على سياق متصفح جديد، وحالة جلسة جديدة، وبيانات اختبار فريدة. لا حالة قاعدة بيانات مشتركة بين الاختبارات. ولا «الاختبار B يعتمد على ما أنشأه الاختبار A».</li>
<li><strong>ميزانيات إعادة المحاولة.</strong> اسمح بإعادة المحاولات لأعطال البنية التحتية العابرة (مهل الشبكة، وحالات التسابق في تشغيل المتصفح)، لكن <em>سجّل كل إعادة محاولة</em>. فإن احتاج اختبار إلى إعادة المحاولات ليعمل بموثوقية، ففيه خطأ — وإعادة المحاولة ضمادة لا علاج. تتبّع معدلات إعادة المحاولة وحقّق في الاختبارات التي تعيد المحاولة كثيرًا.</li>
<li><strong>التقسيم المتوازي.</strong> وزّع المجموعة على عدة عمال CI لتبقى مدة التنفيذ الكلية تحت عشر دقائق. وتتولى راية <code>--shard</code> في Playwright ذلك بشكل أصلي.</li>
</ul>
<h2 id="اختبار-الانحدار-البصري">اختبار الانحدار البصري</h2>
<p>تخبرك الاختبارات الوظيفية أن الزر يعمل. وتخبرك اختبارات الانحدار البصري أن الزر لا يبدو وكأنه نجا من زلزال CSS.</p>
<p>يلتقط اختبار الانحدار البصري لقطات لحالات واجهة المستخدم ويقارنها بكسلًا بكسل مقابل خطوط أساس معتمدة. وهو يلتقط انزياحات التخطيط، والاصطفاف المكسور، وانحدارات الألوان، ومشكلات ترتيب الطبقات التي تفوّتها الاختبارات الوظيفية تمامًا — لأن الاختبارات الوظيفية لا تنظر إلى الشاشة.</p>
<p>و<strong>Chromatic</strong> هو الأداة المعيارية لتدفّقات العمل المدفوعة بـStorybook. فهو يلتقط كل قصة كلقطة بصرية ويقارنها بالخط الأساس السابق. وعند اكتشاف تغيّر بصري، يظهر في طلب السحب للمراجعة. فتُعتمد التغيرات المقصودة، وتحجب التغيرات غير المقصودة الدمج. والميزة الأساسية على مقارنة اللقطات الخام أن خوارزميات Chromatic تتعامل مع فروق التنعيم الضدّي وضجيج التصيير التحت-بكسلي، فلا تغرق في الإيجابيات الزائفة.</p>
<p>ولاختبار بصري على مستوى الصفحة في تدفّقات E2E، يضم Playwright <a href="https://playwright.dev/docs/test-snapshots">مقارنة اللقطات</a> مدمجة:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;dashboard renders correctly&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForSelector</span>(<span class="hljs-string">&#x27;[data-loaded=&quot;true&quot;]&#x27;</span>);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;dashboard.png&#x27;</span>, {
    <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
  });
});
</code></pre>
<p>والاندماج في سير العمل مهم بقدر أهمية الأداة نفسها. فينبغي أن تظهر الفروق البصرية في طلبات السحب، لا في أداة منفصلة لا يفتحها أحد. وينبغي أن يستطيع المصمّمون والمهندسون معًا مراجعة التغيرات واعتمادها. وينبغي أن تكون عملية تحديث الخط الأساس صريحة — فتحديث خطوط الأساس بالخطأ في غير موضعها هو الطريقة التي تُخبز بها الانحدارات البصرية في قاعدة الشيفرة خبزًا دائمًا.</p>
<h2 id="أنماط-اختبار-خاصة-بالمؤسسات">أنماط اختبار خاصة بالمؤسسات</h2>
<p>للتطبيقات الكبيرة متطلبات اختبار لا تغطيها معظم الدروس، لأن معظم الدروس ليست مبنية لبرمجيات تتعامل مع أموال حقيقية، أو التزامات تنظيمية حقيقية، أو تحكم حقيقي بالوصول.</p>
<h3 id="التحكم-بالوصول-المبني-على-الأدوار-واختبار-الأذونات">التحكم بالوصول المبني على الأدوار واختبار الأذونات</h3>
<p>إن كان تطبيقك يتضمن تحكمًا بالوصول مبنيًا على الأدوار، فأنت تحتاج إلى اختبار حدود الأذونات — لا المسار السعيد فقط. و<strong>مصفوفة الأذونات</strong> تربط الأدوار بالإجراءات المسموح بها:</p>
<table>
<thead>
<tr>
<th>الدور</th>
<th>الإنشاء</th>
<th>القراءة</th>
<th>التحديث</th>
<th>الحذف</th>
</tr>
</thead>
<tbody>
<tr>
<td>مدير</td>
<td>نعم</td>
<td>نعم</td>
<td>نعم</td>
<td>نعم</td>
</tr>
<tr>
<td>محرّر</td>
<td>نعم</td>
<td>نعم</td>
<td>نعم</td>
<td>لا</td>
</tr>
<tr>
<td>مشاهد</td>
<td>لا</td>
<td>نعم</td>
<td>لا</td>
<td>لا</td>
</tr>
</tbody>
</table>
<p>والاختبارات المهمة ليست اختبارات «المدير يستطيع فعل كل شيء». فتلك سهلة ونادرًا ما تفشل. الاختبارات المهمة هي <strong>السيناريوهات السلبية</strong>: هل يرى دور المشاهد <em>فعلًا</em> زر حذف معطّلًا؟ وهل يعيد نداء الواجهة البرمجية رمز 403 لا 500؟ وإن وصل مشاهد بطريقة ما إلى <code>/admin/users/delete/42</code>، فهل يعيده حارس المسار، أم يصيّر صفحة مكسورة؟</p>
<p>أتمِت اختبارات التحكم بالوصول عبر كل الأدوار الأساسية للميزات الحرجة. وشغّلها في كل إصدار. فالأخطاء التي تتسلل عبر حدود الأذونات هي غالبًا التي تنتهي في تقارير الحوادث الأمنية.</p>
<h3 id="عزل-المستأجرين-المتعددين">عزل المستأجرين المتعددين</h3>
<p>بالنسبة لمنصات SaaS، يتحقق اختبار تعدد المستأجرين من أن المستأجر A لا يستطيع الوصول إلى بيانات المستأجر B. وهذا يبدو بديهيًا، وهو كذلك، حتى يكتب أحدهم استعلامًا ينسى تضمين مرشّح <code>tenant_id</code>.</p>
<p>والنمط الاختباري هو إنشاء سيناريوهات اختبار بمستأجرين اثنين والتحقق من العزل الصارم للبيانات:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;tenant A cannot access tenant B resources&#x27;</span>, <span class="hljs-title function_">async</span> ({ request }) =&gt; {
  <span class="hljs-keyword">const</span> tenantAToken = <span class="hljs-keyword">await</span> <span class="hljs-title function_">authenticate</span>(<span class="hljs-string">&#x27;tenant-a-user&#x27;</span>);
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/projects/tenant-b-project-id&#x27;</span>, {
    <span class="hljs-attr">headers</span>: { <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${tenantAToken}</span>\`</span> },
  });

  <span class="hljs-title function_">expect</span>(response.<span class="hljs-title function_">status</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">403</span>);
});
</code></pre>
<p>وتنتمي هذه الاختبارات إلى مجموعة التكامل، لا إلى E2E فقط. فبحلول الوقت الذي يصل فيه عطل عزل المستأجرين إلى E2E، يكون الضرر معماريًا.</p>
<h3 id="التدويل">التدويل</h3>
<p>يتجاوز اختبار التدويل سؤال «هل حُمّلت نص الترجمة». فللتدويل في المؤسسات ثلاثة أنماط فشل لا تلتقطها الاختبارات الوظيفية:</p>
<ul>
<li><strong>اختبار التمدد</strong>: قد يكون النص الألماني والفنلندي أطول بنسبة 30–40% من الإنجليزي. فالزر الذي يقول «Submit» بالإنجليزية يقول «Einreichen» بالألمانية، وإن كان الحاوي بعرض ثابت فسيطفح النص أو يلتفّ بقبح. وتلتقط اختبارات الانحدار البصري بلقطات مبدَّلة اللغة هذا العيب.</li>
<li><strong>الانعكاس من اليمين إلى اليسار</strong>: تُفعّل العربية والعبرية تخطيط RTL. فينقلب التنقل، وتنعكس الأيقونات، وينعكس اصطفاف النص. وقد يكون مكوّن يبدو مثاليًا بالإنجليزية مكسورًا تمامًا بالعربية إن لم تتعامل CSS مع <code>direction: rtl</code> بشكل صحيح.</li>
<li><strong>التنسيق الخاص بكل لغة</strong>: تُصيَّر التواريخ والعملات والأرقام بشكل مختلف. فـ<code>$1,234.56</code> في الولايات المتحدة هي <code>1.234,56 €</code> في ألمانيا. وإن كان منطق التنسيق لديك يستخدم فواصل مكتوبة يدويًا بدل <code>Intl.NumberFormat</code>، فهو خاطئ في نصف العالم.</li>
</ul>
<h3 id="إمكانية-الوصول-كطبقة-اختبار">إمكانية الوصول كطبقة اختبار</h3>
<p>اختبار إمكانية الوصول ليس اختياريًا في برمجيات المؤسسات — بل غالبًا مطلوب قانونيًا. والأدوات الآلية مثل <a href="https://www.deque.com/axe/">axe-core</a> تلتقط نحو 30–50% من مخالفات WCAG: تسميات ARIA المفقودة، وتباين الألوان غير الكافي، والأدوار غير الصحيحة. ادمج axe في قصص المكوّنات وفي اختبارات E2E معًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">AxeBuilder</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@axe-core/playwright&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;dashboard has no critical a11y violations&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
  <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AxeBuilder</span>({ page }).<span class="hljs-title function_">analyze</span>();

  <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">violations</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> v.<span class="hljs-property">impact</span> === <span class="hljs-string">&#x27;critical&#x27;</span>)).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">0</span>);
});
</code></pre>
<p>لكن الفحوص الآلية لا تلتقط إلا المخالفات الميكانيكية. أما التنقل بلوحة المفاتيح، وإدارة التركيز، وسلوك قارئ الشاشة فتحتاج إلى اختبارات تفاعل صريحة. هل تستطيع التنقل بمفتاح الجدولة عبر النموذج كاملًا؟ وهل يعود التركيز إلى زر الإطلاق عند إغلاق نافذة منبثقة؟ وهل يعلن قارئ الشاشة تغيّرات الحالة؟ هذه أمور تحتاج أن تُكتب اختبارات، لا أن تُرجى نتائج.</p>
<h2 id="استراتيجيات-الاختبار-في-المستودع-الأحادي">استراتيجيات الاختبار في المستودع الأحادي</h2>
<h3 id="كشف-المتأثر">كشف المتأثر</h3>
<p>قد يحتوي مستودع أحادي فيه أكثر من 50 حزمة على آلاف الاختبارات. وتشغيلها كلها في كل طلب سحب مضيعة وتباطؤ. والحل هو <strong>كشف المتأثر</strong> — تحليل رسم الاعتمادات لتحديد الحزم التي تغيّرت وتشغيل اختباراتها فقط، مع اختبارات الحزم التي تعتمد عليها.</p>
<p>ويتولى <a href="https://stevekinney.com/courses/enterprise-ui/turborepo">Turborepo</a> ذلك عبر رسم مهامه والتخزين المؤقت. فإن لم تتغير مدخلات حزمة منذ آخر تشغيل اختبارات ناجح، تُعاد النتيجة المخزّنة مؤقتًا. وعمليًا، يقلّص هذا مجموعة اختبارات كاملة تستغرق 20 دقيقة إلى 2–3 دقائق لمعظم طلبات السحب.</p>
<p>ويتخذ Nx مقاربة أكثر صراحة عبر <code>nx affected:test</code>، الذي يستخدم رسم مشروعه لتحديد الحزم المتأثرة. وكلا الأداتين تحقق الهدف نفسه: تغذية راجعة سريعة في CI دون التضحية بتغطية الشيفرة المتغيرة.</p>
<h3 id="بنية-الاختبار-المشتركة">بنية الاختبار المشتركة</h3>
<p>تمركز أدوات الاختبار يمنع كل فريق من إعادة اختراع بيانات البدائل ومُساعِدات التصيير:</p>
<pre><code>packages/
  test-utilities/
    fixtures/
      user.factory.ts
      product.factory.ts
    mocks/
      handlers.ts
    helpers/
      render-with-providers.tsx
</code></pre>
<p>دوال المصنع تولّد بيانات اختبار جديدة صالحة لكل اختبار. ومعالجات MSW المشتركة توفّر سلوكًا متسقًا للواجهة البرمجية في كل مجموعات الاختبار. ويساعد <code>renderWithProviders</code> على تغليف المكوّنات بمزوّدات السمة والمصادقة والموجّه وعميل الاستعلامات التي تحتاجها — فلا تبني الاختبارات الفردية كل واحدة منها كومتها الخاصة من المزوّدات المختلفة اختلافًا طفيفًا.</p>
<p>والقاعدة: حاكِ الواجهات البرمجية <em>الخارجية</em> بـMSW. واختبر تفاعلات الحزم <em>الداخلية</em> اختبارًا أصيلًا. فإن كانت <code>@acme/ui</code> تعتمد على <code>@acme/tokens</code>، فلا تحاكِ حزمة الرموز — استوردها واختبر التكامل الحقيقي. فمحاكاة حزمك الداخلية تناقض الغرض من وجود مستودع أحادي.</p>
<h3 id="تنظيم-الاختبارات">تنظيم الاختبارات</h3>
<p>مكان الاختبارات يؤثر في طريقة تشغيلها:</p>
<ul>
<li><strong>اختبارات الوحدة</strong>: بجوار الشيفرة المصدرية (<code>Button.test.tsx</code> قرب <code>Button.tsx</code>). ويكتشفها Vitest أو Jest تلقائيًا.</li>
<li><strong>اختبارات التكامل</strong>: في دليل <code>__tests__/</code> عند جذر الحزمة، مع التركيز على التدفقات العابرة للوحدات داخل تلك الحزمة.</li>
<li><strong>اختبارات E2E</strong>: في حزمة مخصّصة <code>e2e/</code> أو دليل <code>apps/app-name-e2e/</code>. ومركزية لأنها تمرّن التطبيق المُركَّب، لا الحزم الفردية.</li>
</ul>
<p>وهذا الفصل مهم لأداء CI:</p>
<pre><code>flowchart LR
  Push[&quot;Push / PR&quot;] --&gt; Affected[&quot;Affected Detection&quot;]
  Affected --&gt; Unit[&quot;Unit + Integration\\n(per-package, cached)&quot;]
  Unit --&gt; E2E_Stage[&quot;E2E Stage&quot;]
  E2E_Stage --&gt; Browser[&quot;Install Browsers&quot;]
  Browser --&gt; DevServer[&quot;Start Dev Server&quot;]
  DevServer --&gt; E2E[&quot;Run E2E Suite\\n(sharded)&quot;]
  E2E --&gt; Report[&quot;Merge Results&quot;]

  style Affected fill:#4ade80,color:#000
  style Unit fill:#4ade80,color:#000
  style E2E fill:#fbbf24,color:#000
</code></pre>
<p>تعمل اختبارات الوحدة والتكامل لكل حزمة مع كشف المتأثر — فلا تُختبر إلا الحزم المتغيرة وتوابعها. أما اختبارات E2E فتعمل على التطبيق المُركَّب في مرحلة CI منفصلة مع تثبيت المتصفحات وخادم تطوير يعمل.</p>
<h2 id="فجوة-اختبار-الواجهات-المصغرة">فجوة اختبار الواجهات المصغّرة</h2>
<p>تخلق الواجهات المصغّرة مشكلة اختبار خاصة لا تعالجها اختبارات الوحدة ولا اختبارات E2E التقليدية معالجة نظيفة. فكل وحدة بعيدة يمكن اختبارها بمعزل — مكوّناتها تُصيّر، وحالتها تُدار بشكل صحيح، ونداءاتها البرمجية تعيد البيانات الصحيحة. لكن التطبيق <em>المُركَّب</em> يُدخل مفاصل تكامل لا وجود لها في مجموعة اختبارات أي وحدة بعيدة منفردة.</p>
<pre><code>flowchart TB
  subgraph isolated[&quot;Per-Remote Testing (covered)&quot;]
    RA[&quot;Remote A Tests&quot;] --&gt; RA_Unit[&quot;Unit + Integration&quot;]
    RB[&quot;Remote B Tests&quot;] --&gt; RB_Unit[&quot;Unit + Integration&quot;]
  end

  subgraph gap[&quot;The Gap&quot;]
    direction TB
    Contract[&quot;Shell ↔ Remote Contracts&quot;]
    CrossComm[&quot;Cross-Remote Communication&quot;]
    Composed[&quot;Composed Layout + Styling&quot;]
  end

  subgraph shell_test[&quot;Composed Testing (thin)&quot;]
    Shell[&quot;Shell + Remotes&quot;] --&gt; E2E[&quot;Boundary E2E Tests&quot;]
  end

  isolated --&gt; gap
  gap --&gt; shell_test

  style gap fill:#fbbf24,color:#000,stroke:#f59e0b
  style isolated fill:#1e293b,color:#f1f5f9
  style shell_test fill:#1e293b,color:#f1f5f9
</code></pre>
<p>تظهر الفجوة في ثلاثة مواضع:</p>
<ul>
<li><strong>عقود القشرة مع الوحدات البعيدة.</strong> هل ما زالت القشرة توفّر الخصائص والسياق ورموز السمات التي تتوقعها الوحدة البعيدة؟ وانزياح الإصدارات بين القشرة والوحدة البعيدة هو أكثر مصادر أعطال الإنتاج شيوعًا في إعدادات Module Federation.</li>
<li><strong>التواصل بين الوحدات البعيدة.</strong> إن تشاركت وحدتان بعيدتان الحالة عبر <a href="https://stevekinney.com/courses/enterprise-ui/nanostores">Nanostores</a> أو <a href="https://stevekinney.com/courses/enterprise-ui/broadcast-channel">BroadcastChannel</a> أو أحداث مخصّصة، فمن يختبر أن الرسائل متوافقة؟</li>
<li><strong>التخطيط والأنماط المركّبة.</strong> قد تنكسر وحدة بعيدة تبدو صحيحة في وضعها المستقل عند تصييرها داخل تخطيط القشرة — فتصادمات ترتيب الطبقات، وتجاوزات متغيّرات CSS، والأنماط العامة المتعارضة تظل غير مرئية حتى تُركَّب الوحدات البعيدة.</li>
</ul>
<p>و<a href="https://stevekinney.com/courses/enterprise-ui/api-contract-testing">اختبار العقود</a> يتولى الفجوة الأولى. فالقشرة تُعلن ما تتوقعه من كل وحدة بعيدة، وكل وحدة بعيدة تتحقق من أنها تستطيع تلبية تلك التوقعات. أما الفجوتان الثانية والثالثة فتحتاجان إلى اختبارات تكامل مركّبة — عدد صغير من اختبارات Playwright تحمّل القشرة مع وحداتها البعيدة وتتحقق من مفاصل التكامل الحرجة. وهذه <em>ليست</em> اختبارات رحلة E2E كاملة. بل اختبارات حدود: هل تُركَّب الوحدة البعيدة؟ وهل تستقبل السمة؟ وهل يعمل التنقل بين الوحدات البعيدة؟ وهل تنتشر الحالة المشتركة؟</p>
<p>أبقِ هذه المجموعة المركّبة صغيرة. فغرضها التقاط أعطال التكامل، لا إعادة اختبار كل ميزة تغطيها مجموعات الوحدات البعيدة أصلًا.</p>
<h2 id="vitest-مقابل-jest">Vitest مقابل Jest</h2>
<p>إن كنت تبدأ مشروعًا جديدًا أو تُرحّل بنية الاختبار في مستودع أحادي، فاختيار مشغّل الاختبارات مهم لتجربة المطوّر وكلفة CI.</p>
<p>كان <strong>Jest</strong> هو الافتراضي لسنوات. وله ميزات شاملة، ونظام بيئي ضخم من المطابِقات والإضافات، وألفة شبه عالمية. لكنه أيضًا يعمل بـCommonJS افتراضيًا، ويستخدم خط تحويل وحدات خاصًا به، وقد يكون بطيئًا في المستودعات الأحادية الكبيرة لأنه لا يشارك الإعداد مع أدوات البناء لديك.</p>
<p>أما <strong>Vitest</strong> فمبني على Vite، ما يعني أنه يستخدم الحازمة (bundler) نفسها ودقة الوحدات نفسها التي تستخدمها عمليات بناء تطويرك وإنتاجك. فلا تناقضات سلوكية بين «كيف يحل مشغّل الاختبارات الاستيرادات» و«كيف يحل التطبيق الاستيرادات فعلًا». ويدعم ESM الأصلي، ويعمل أسرع من Jest بمقدار 5–10 أضعاف في معظم المقارنات، ويستهلك ذاكرة أقل (وهذا مهم عندما تشغّل آلاف الاختبارات على التوازي في CI)، ويعرض واجهة شبه مطابقة فتكون الهجرة ميكانيكية في معظمها.</p>
<p>وفي المستودعات الأحادية تتراكم ميزة سرعة Vitest. فمجموعة اختبارات تستغرق 8 دقائق مع Jest قد تستغرق دقيقتين مع Vitest — وعندما تعمل تلك المجموعة في كل دفعة عبر عشرات الحزم، تتراكم وفورات كلفة CI.</p>
<p>ومسار الهجرة واضح: استبدل <code>jest</code> بـ<code>vitest</code> في ملفات اختبارك، وبدّل <code>jest.fn()</code> بـ<code>vi.fn()</code>، وحدّث ملف الإعداد، وشغّل المجموعة. ومعظم الاختبارات تعمل بلا تغييرات لأن واجهات التحقّق والمحاكاة متوافقة عن قصد.</p>
<h2 id="بيانات-الاختبار-والبيئات">بيانات الاختبار والبيئات</h2>
<h3 id="إدارة-بيانات-الاختبار">إدارة بيانات الاختبار</h3>
<p>غالبًا ما تحتاج اختبارات المؤسسات إلى حالة معقّدة متعددة المراحل، مملّة الإعداد وخطيرة المشاركة بين الاختبارات.</p>
<p><strong>دوال المصنع</strong> تولّد كائنات بيانات جديدة صالحة لكل اختبار. بلا بيانات ثابتة مشتركة. وبلا «مستخدم اختبار 42» الذي تعتمد عليه سبعة ملفات اختبار مختلفة في حالات متباينة قليلًا. كل اختبار يُنشئ ما يحتاجه ويمحوه عند انتهائه.</p>
<p><strong>تغذية الواجهات البرمجية بالبيانات</strong> تُنشئ الحالة الخلفية عبر واجهة التطبيق البرمجية نفسها بدل التلاعب المباشر بقاعدة البيانات. وهذا أبطأ لكنه أكثر واقعية — فإن كانت الواجهة البرمجية تتحقق من البيانات عند الدخول، فبيانات اختبارك تجتاز التحقق نفسه. أما الإدراج المباشر في قاعدة البيانات فتخطّى التحقق، ما يعني أن بيانات اختبارك قد تكون غير صحيحة بطرق خفية تُنتج سلوكًا مختلفًا عن الإنتاج.</p>
<p><strong>إخفاء البيانات</strong> متطلب امتثالي عند استخدام لقطات من بيانات الإنتاج في بيئات التجهيز أو الاختبار. فإن كانت بيانات اختبارك الثابتة تحتوي أسماء عملاء حقيقية أو عناوين بريد إلكتروني أو بيانات مالية، فهذا انتهاك لخصوصية البيانات ينتظر أن يقع. أخفِ هوية البيانات قبل أن تغادر الإنتاج.</p>
<h3 id="البيئات-العابرة">البيئات العابرة</h3>
<p>بيئات التجهيز المشتركة هي أكبر عنق زجاجة في خطوط أنابيب اختبار المؤسسات. ففريقان ينشران إلى بيئة التجهيز نفسها في الوقت نفسه يلوّثان اختبارات بعضهما. ونشر مكسور يوقف الجميع حتى يُصلحه أحد أو يتراجع عنه. وطابور «الانتظار لبيئة التجهيز» هو المكان الذي تموت فيه السرعة.</p>
<p>أما <strong>البيئات العابرة</strong> — نسخ قصيرة العمر ومعزولة من المنظومة كاملة تُوفَّر لكل طلب سحب — فتُلغي عنق الزجاجة. فيحصل كل طلب سحب على واجهته وخلفيته وقاعدة بياناته. وتعمل الاختبارات بمعزل. بلا طوابير. وبلا تلوّث. وعند دمج طلب السحب أو إغلاقه، تُفكَّك البيئة.</p>
<p>وكلفة البنية التحتية حقيقية، لكن مكسب سرعة الهندسة يبرّرها عادةً. فالفرق التي تستخدم بيئات عابرة تُصدر أسرع باطراد لأنها لا تتوقف أبدًا في انتظار مورد مشترك.</p>
<h2 id="حوكمة-الاختبار">حوكمة الاختبار</h2>
<p>على النطاق الواسع، <em>من يملك ماذا</em> مهم بقدر أهمية <em>ما تختبره</em>. فبلا ملكية واضحة، تصبح أعطال الاختبارات مشكلة لا تخص أحدًا، وتتراكم الاختبارات المتذبذبة، وتتحول المجموعة تدريجيًا إلى شيء يتجاهله الجميع.</p>
<p>ونموذج حوكمة عملي:</p>
<ul>
<li><strong>فرق الحزم تملك اختبارات وحدتها وتكاملها.</strong> فإن فشل اختبار في <code>@acme/checkout</code>، حقّق فريق الدفع. لا فريق المنصة. ولا فريق ضمان الجودة. الفريق الذي يملك الشيفرة يملك الاختبارات.</li>
<li><strong>فريق منصة يملك البنية التحتية للاختبار.</strong> الأدوات المشتركة، وإعداد CI، وتثبيت المتصفحات، وترقيات مشغّل الاختبارات، وخط أنابيب كشف المتأثر. هم يسهّلون على الفرق كتابة اختبارات جيدة، ولا يكتبون الاختبارات نيابة عنها.</li>
<li><strong>اختبارات E2E للرحلات الحرجة لها ملاك صريحون.</strong> فاختبار E2E الخاص بـ«إتمام الدفع بنجاح» لا يملكه «الجميع»، بل يملكه فريق الدفع، وهو المسؤول عن إبقائه أخضر وتحديثه عند تغيّر الرحلة.</li>
<li><strong>اعزل الاختبارات المتذبذبة، لا تحذفها.</strong> ضع عليها الوسم <code>@quarantine</code> واستبعدها من حجب الدمج. وتتبّعها في لوحة معلومات. وحقّق فيها وأصلحها بوتيرة منتظمة. فالاختبار المعزول مشكلة معروفة، أما الاختبار المحذوف فاستثمار ضائع.</li>
</ul>
<p>والمبدأ الجامع: الاختبار على نطاق واسع مشكلة تنظيمية، لا تقنية فقط. فالأدوات هي الجزء السهل. والجزء الصعب هو ضمان أن أحدهم يهتم بما يكفي لإصلاح اختبار فاشل — وأن لديه السياق لفعل ذلك بسرعة.</p>
<hr>
<h2 id="الخلاصة-السريعة">الخلاصة السريعة</h2>
<h3 id="أشكال-الاختبارات">أشكال الاختبارات</h3>
<blockquote>
<p>ثلاثة نماذج لمقدار ما تكتبه من كل نوع من الاختبارات.</p>
</blockquote>
<table>
<thead>
<tr>
<th>النموذج</th>
<th>الشكل</th>
<th>التشديد</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>هرم الاختبارات</strong></td>
<td>△</td>
<td>كثير من الوحدة، وأقل من التكامل، وأدنى حد من E2E</td>
</tr>
<tr>
<td><strong>كأس الاختبارات</strong></td>
<td>🏆</td>
<td>تكامل كثيف، ووحدة وE2E بدرجة معتدلة</td>
</tr>
<tr>
<td><strong>قرص عسل الاختبارات</strong></td>
<td>⬡</td>
<td>التكامل أولًا للخدمات المصغّرة</td>
</tr>
</tbody>
</table>
<p><strong>بالنسبة للواجهات المصغّرة:</strong> يميل نموذج الكأس إلى كونه الأنسب.</p>
<ul>
<li>اختبر منطق العمل وإدارة الحالة باختبارات وحدة.</li>
<li>اختبر الواجهة المركّبة باختبارات تكامل مع واجهات برمجية مُحاكاة بـMSW.</li>
<li>اختبر تدفقات المستخدم الحرجة بين الوحدات البعيدة باختبارات E2E فقط (فهي بطيئة ومتذبذبة).</li>
<li>اختبر عقود حدود الواجهة البرمجية بين الوحدات البعيدة وBFF.</li>
</ul>
<hr>
<h3 id="اختبار-الانحدار-البصري">اختبار الانحدار البصري</h3>
<blockquote>
<p>التقط التغيرات البصرية غير المقصودة تلقائيًا.</p>
</blockquote>
<ul>
<li><strong>Chromatic</strong> — قائم على Storybook، يلتقط كل قصة كخط أساس.</li>
<li><strong>لقطات Playwright</strong> — تلتقط الصفحات في حالات مفصلية وتقارنها بخطوط الأساس.</li>
<li><strong>Percy</strong> — لقطات بصرية عبر متصفحات متعددة في CI.</li>
</ul>
<p><strong>في سياق نظام التصميم:</strong></p>
<ul>
<li>كل تنويعة مكوّن تحصل على خط أساس بصري.</li>
<li>طلبات السحب التي تغيّر أنماط المكوّنات تُظهر فروقًا بصرية في المراجعة.</li>
<li>يمنع ذلك «غيّرت رمزًا فكسرت 47 مكوّنًا بالخطأ».</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,o as default,p as headings,l as html,a as slug,e as title};
