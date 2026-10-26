const s="kinney",e="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="mocking-browser-apis",t="محاكاة واجهات المتصفح البرمجية",p=[{depth:2,id:"استخدم-المقبض-الحقيقي-أولا",text:"استخدم المقبض الحقيقي أولًا"},{depth:2,id:"التحكم-في-الساعة-أغنى-من-تجميد-الوقت",text:"التحكم في الساعة أغنى من «تجميد الوقت»"},{depth:2,id:"ثبت-البدائل-المحاكاة-قبل-التنقل",text:"ثبّت البدائل المُحاكاة قبل التنقّل"},{depth:2,id:"الواجهات-للقراءة-فقط-تحتاج-حركة-مختلفة",text:"الواجهات للقراءة فقط تحتاج حركة مختلفة"},{depth:2,id:"مثل-الأحداث-لا-القيم-فقط",text:"مثّل الأحداث، لا القيم فقط"},{depth:2,id:"تحقق-من-النداءات-حين-يكون-العقد-مهما",text:"تحقّق من النداءات حين يكون العقد مهمًا"},{depth:2,id:"حالات-الاستخدام-الشائعة",text:"حالات الاستخدام الشائعة"},{depth:3,id:"واجهات-الوسائط-والتفضيلات",text:"واجهات الوسائط والتفضيلات"},{depth:3,id:"الحافظة",text:"الحافظة"},{depth:3,id:"واجهات-المراقب",text:"واجهات المراقب"},{depth:3,id:"الأذونات-وقدرات-المتصفح",text:"الأذونات وقدرات المتصفح"},{depth:3,id:"الواجهات-التجريبية-أو-غير-المدعومة-بالكامل",text:"الواجهات التجريبية أو غير المدعومة بالكامل"},{depth:2,id:"أين-تساعد-التجهيزات",text:"أين تساعد التجهيزات"},{depth:2,id:"المزالق",text:"المزالق"},{depth:3,id:"المحاكاة-في-وقت-متأخر-جدا",text:"المحاكاة في وقت متأخر جدًا"},{depth:3,id:"استخدام-بديل-محاكى-بينما-يملك-playwright-دعما-حقيقيا",text:"استخدام بديل مُحاكى بينما يملك Playwright دعمًا حقيقيًا"},{depth:3,id:"إعادة-القيمة-بلا-الشكل",text:"إعادة القيمة بلا الشكل"},{depth:3,id:"محاكاة-المصادقة-عبر-localstorage",text:"محاكاة المصادقة عبر localStorage"},{depth:3,id:"نسيان-فروق-المتصفحات",text:"نسيان فروق المتصفحات"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الذي-يجب-تذكره",text:"الشيء الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>تحظى محاكاة الشبكة بكل الاهتمام لأنها صاخبة. أما محاكاة واجهات المتصفح البرمجية فأهدأ، لكنها تعضّ بقوة مماثلة. يقرأ تطبيقك <code>matchMedia</code> أو <code>navigator.clipboard</code> أو <code>Notification.permission</code> أو <code>ResizeObserver</code> أو واجهة تجريبية لامعة ما. ويعيش مشغّل الاختبار في متصفح لا يتصرف تمامًا كما تتصرف متصفحات مستخدميك. وفجأة لم يعد الاختبار عن ميزتك. بل صار عن الفجوة بين «متصفح حقيقي بما يكفي» و«سطح المتصفح المحدد الذي يفترضه هذا المكوّن».</p>
<p>لدى <a href="https://playwright.dev/">Playwright</a> دليل رسمي هو <a href="https://playwright.dev/docs/mock-browser-apis">Mock browser APIs</a>، والفكرة الكبرى فيه بسيطة للغاية: إن كان Playwright يمنحك أصلًا مقبضًا من الدرجة الأولى، فاستخدمه. وإن لم يفعل، فثبّت البديل المُحاكى <em>قبل تحميل الصفحة</em> واجعل سلوكه شبيهًا بالواجهة الحقيقية بما يكفي كي لا يكون تطبيقك تحت الاختبار في مواجهة خيال.</p>
<h2 id="استخدم-المقبض-الحقيقي-أولا">استخدم المقبض الحقيقي أولًا</h2>
<p>قبل أن تكتب بديلًا مُحاكى، تحقّق مما إذا كان Playwright يمثّل الشيء مباشرة بالفعل.</p>
<p>أمثلة جيدة:</p>
<ul>
<li><a href="https://playwright.dev/docs/emulation#geolocation"><code>geolocation</code></a> مع <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions"><code>grantPermissions</code></a> بدلًا من محاكاة واجهات الموقع يدويًا</li>
<li><a href="https://playwright.dev/docs/emulation#locale--timezone"><code>locale</code></a> و<code>timezoneId</code> و<code>colorScheme</code> وخيارات منفذ العرض بدلًا من متغيرات عامة مرتجلة</li>
<li><a href="https://playwright.dev/docs/clock"><code>Clock</code></a> بدلًا من تجاوز <code>Date.now()</code> برقعة هشة لمرة واحدة</li>
<li><a href="https://playwright.dev/docs/auth"><code>storageState</code></a> بدلًا من حشو حالة المصادقة يدويًا في <code>localStorage</code></li>
</ul>
<p>القاعدة ليست «لا تحاكِ أبدًا». القاعدة هي «فضّل نموذج المتصفح الذي يعرف Playwright كيف يقوده بالفعل». فالواجهة من الدرجة الأولى تشتري لك شيفرة أقل، وأكاذيب أقل، وسلوكًا أفضل عبر المتصفحات.</p>
<h2 id="التحكم-في-الساعة-أغنى-من-تجميد-الوقت">التحكم في الساعة أغنى من «تجميد الوقت»</h2>
<p>يستحق <a href="https://playwright.dev/docs/clock">دليل Clock</a> أن تقرأه كاملًا مرة واحدة، لأن هناك مستويين هنا في الحقيقة.</p>
<p>استخدم <code>clock.setFixedTime()</code> حين لا تحتاج إلا إلى قراءات حتمية لساعة الحائط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">setFixedTime</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-string">&#x27;2026-04-14T09:00:00-05:00&#x27;</span>));
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
</code></pre>
<p>واستخدم <code>clock.install()</code> حين يعتمد التطبيق على مؤقتات أو إطارات حركة أو وقت منقضٍ:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">install</span>();
<span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">pauseAt</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-string">&#x27;2026-04-14T09:00:00-05:00&#x27;</span>));

<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">fastForward</span>(<span class="hljs-number">5000</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">runFor</span>(<span class="hljs-number">10_000</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">resume</span>();
</code></pre>
<p><code>install()</code> هي النسخة الثقيلة. إنها تتجاوز المؤقتات و<code>Date</code> وواجهات إطارات الحركة و<code>performance</code> وبقية سطح الوقت. أما <code>setFixedTime()</code> فهي النسخة الأخف: «اجعل <code>Date.now()</code> حتميًا فقط».</p>
<p>اقرن هذا بخيار <code>timezoneId</code> في سياق المتصفح حين تكون الميزة تحت الاختبار حساسة للتواريخ. فتجميد الساعة وترك المنطقة الزمنية طليقة هو الطريق الذي تنتهي به الفرق إلى تصحيح هراء «يعمل في شيكاغو ويفشل في UTC» الذي كتبته بنفسها.</p>
<h2 id="ثبت-البدائل-المحاكاة-قبل-التنقل">ثبّت البدائل المُحاكاة قبل التنقّل</h2>
<p>يشدد الدليل الرسمي على هذه النقطة لسبب: إن كانت الصفحة تنادي الواجهة أثناء الإقلاع، فيجب أن يوجد بديلك المُحاكى <em>قبل</em> أن تبدأ الصفحة التحميل. وهذا يعني <a href="https://playwright.dev/docs/api/class-page#page-add-init-script"><code>page.addInitScript()</code></a> أو <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script"><code>browserContext.addInitScript()</code></a>، لا <code>page.evaluate()</code> بعد <code>goto</code>.</p>
<p>هذا هو النمط الأدنى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">addInitScript</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">matchMedia</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> ({
      <span class="hljs-attr">media</span>: query,
      <span class="hljs-attr">matches</span>: query === <span class="hljs-string">&#x27;(prefers-reduced-motion: reduce)&#x27;</span>,
      <span class="hljs-attr">onchange</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">addEventListener</span>: <span class="hljs-function">() =&gt;</span> {},
      <span class="hljs-attr">removeEventListener</span>: <span class="hljs-function">() =&gt;</span> {},
      <span class="hljs-attr">addListener</span>: <span class="hljs-function">() =&gt;</span> {},
      <span class="hljs-attr">removeListener</span>: <span class="hljs-function">() =&gt;</span> {},
      <span class="hljs-attr">dispatchEvent</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">false</span>,
    });
  });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;respects reduced motion preference&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/settings&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Animations reduced&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
});
</code></pre>
<p>التوقيت هو الجزء المهم. فإن نقلت البديل المُحاكى إلى ما بعد <code>goto</code>، فقد قرأ التطبيق نتيجة <code>matchMedia</code> الحقيقية بالفعل، واختبارك الآن يثبت شيئًا عن توقيت رقعتك، لا عن واجهتك.</p>
<p>وإن خلطت بين <code>browserContext.addInitScript()</code> و<code>page.addInitScript()</code>، فلا تبنِ اختبارًا يعتمد على ترتيبهما النسبي. أبقِ المنطق المرتبط بوقت الإقلاع في مكان واحد، إلا إذا كنت تختبر الطبقات عن قصد.</p>
<blockquote>
<p><strong>هذا البديل المُحاكى أدنى عمدًا</strong></p>
<p>إن كانت شيفرتك تشترك عبر <code>addEventListener</code> أو <code>addListener</code> أو تتوقع تحديثات حية لاستعلامات الوسائط، فهذه القصاصة لا تكفي. استخدم نسخة قادرة على الأحداث في تجهيزة مشتركة كي يمارس الاختبار العقد نفسه الذي يستخدمه مكوّنك في الإنتاج.</p>
</blockquote>
<h2 id="الواجهات-للقراءة-فقط-تحتاج-حركة-مختلفة">الواجهات للقراءة فقط تحتاج حركة مختلفة</h2>
<p>بعض واجهات المتصفح البرمجية قابلة للكتابة. وبعضها ليس كذلك. يستخدم دليل Playwright المثال <code>navigator.cookieEnabled</code>، وهو مثال جيد: الإسناد إليه مباشرة لا يفعل شيئًا. فإن كانت الخاصية قابلة للتهيئة، فاستخدم <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty"><code>Object.defineProperty</code></a> على النموذج الأولي الصحيح بدلًا من ذلك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">addInitScript</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getPrototypeOf</span>(navigator), <span class="hljs-string">&#x27;cookieEnabled&#x27;</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-literal">false</span>,
  });
});
</code></pre>
<p>هذا هو الجزء الذي يفاجئ الناس. الاختبار «عيّن» الخاصية. والتطبيق ما زال يرى القيمة الأصلية. ولم يكن العيب في الميزة. كان العيب في البديل المُحاكى.</p>
<h2 id="مثل-الأحداث-لا-القيم-فقط">مثّل الأحداث، لا القيم فقط</h2>
<p>هذا أكبر خطأ في محاكاة واجهات المتصفح بفارق كبير.</p>
<p>النسخة الأولى من البديل المُحاكى تعيد قيمة. فيُصيّر التطبيق بشكل صحيح عند أول رسم. ويشعر الجميع بالرضا. ثم تتعطل الميزة الحقيقية لأن التطبيق كان يستمع إلى تحديثات ولم يصدرها البديل المُحاكى قط.</p>
<p>إن كان مكوّنك يشترك في التغييرات، فيجب أن يدعم بديلك المُحاكى التغييرات.</p>
<p><a href="https://playwright.dev/docs/mock-browser-apis">مثال البطارية في دليل Playwright</a> يستحق الدراسة لهذا السبب بالضبط: إنه يخزّن المستمعين، ويحدّث الحالة الداخلية، ويطلق الأحداث نفسها التي يطلقها التنفيذ الحقيقي. هذا هو السقف. لا دقة متصفح مثالية. بل سلوك يكفي لأن يُختبر المكوّن مقابل العقد نفسه الذي يستخدمه في الإنتاج.</p>
<p>أستخدم هذا النموذج الذهني:</p>
<ul>
<li>إن كانت الصفحة تقرأ مرة واحدة فقط، فقد تكفي قيمة إرجاع بسيطة.</li>
<li>وإن كانت تشترك، فيجب أن يدعم البديل المُحاكى المستمعين.</li>
<li>وإن كانت تتفرّع على حالة الإذن، فيجب أن يتفق الإذن وسطح الواجهة معًا.</li>
</ul>
<h2 id="تحقق-من-النداءات-حين-يكون-العقد-مهما">تحقّق من النداءات حين يكون العقد مهمًا</h2>
<p>أحيانًا لا يكون الجزء المثير مجرد «تغيّرت الواجهة». أحيانًا تريد أن تثبت أن الصفحة طلبت من المتصفح الشيء الذي كان ينبغي أن تطلبه. ويوصي دليل Playwright بـ<a href="https://playwright.dev/docs/api/class-page#page-expose-function"><code>page.exposeFunction()</code></a> لهذا، وهي حيلة لطيفة.</p>
<p>اعرض مسجّلًا من الاختبار، ودع البديل المُحاكى يناديه، ثم أكّد على تسلسل النداءات. هذا يحوّل «أظن أن التطبيق استعلم الواجهة على الأرجح» إلى عقد حقيقي.</p>
<p>وهذا مهم جدًا في:</p>
<ul>
<li>واجهات الاشتراك</li>
<li>طلبات الإذن</li>
<li>قراءات الحافظة وكتاباتها</li>
<li>فروع كشف الميزات مثل <code>if ('share' in navigator)</code></li>
</ul>
<p>إن اكتفيت بالتأكيد على الواجهة النهائية، فقد تجعل قيمة مخزّنة مؤقتًا قديمة الاختبار ينجح للسبب الخطأ.</p>
<h2 id="حالات-الاستخدام-الشائعة">حالات الاستخدام الشائعة</h2>
<p>هذا هو الجزء الذي كنت أتمنى أن تدوّنه مزيد من الفرق. محاكاة واجهات المتصفح البرمجية ليست غريبة. إنها تظهر باستمرار.</p>
<h3 id="واجهات-الوسائط-والتفضيلات">واجهات الوسائط والتفضيلات</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"><code>matchMedia</code></a> من أجل:</p>
<ul>
<li><code>prefers-reduced-motion</code></li>
<li><code>prefers-color-scheme</code></li>
<li>فروع الواجهة المدفوعة بنقاط التوقف</li>
</ul>
<p>إن كان التطبيق يغيّر التخطيط أو سلوك الحركة بناءً على تفضيلات المتصفح، فالبديل المُحاكى هو غالبًا أبسط طريق حتمي.</p>
<h3 id="الحافظة">الحافظة</h3>
<p>دعم <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API"><code>Clipboard API</code></a> مثال كلاسيكي. أزرار «انسخ رابط الدعوة» يسهل اختبارها بمجرد أن تستبدل <code>navigator.clipboard.writeText</code> ببديل يسجّل القيمة المكتوبة.</p>
<h3 id="واجهات-المراقب">واجهات المراقب</h3>
<p>تظهر <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"><code>IntersectionObserver</code></a> و<a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver"><code>ResizeObserver</code></a> في التحميل الكسول والترويسات اللاصقة والتجزيء والمكوّنات المتجاوبة. وهي أيضًا المكان الذي تموت فيه البدائل المُحاكاة الناقصة. فإن كان إطارك يتوقع <code>observe</code> و<code>unobserve</code> ودلالات توقيت النداء الراجع، فعلى البديل المُحاكى أن يوفرها.</p>
<h3 id="الأذونات-وقدرات-المتصفح">الأذونات وقدرات المتصفح</h3>
<p><code>Notification.permission</code> و<code>navigator.share</code> و<code>navigator.permissions.query()</code> كلها مواضع يمكن أن يتفرّع فيها التطبيق بناءً على دعم المتصفح أو حالة الإذن. وهذه الاختبارات ليست عادة عن ميزة المتصفح نفسها. بل عن واجهتك البديلة، أو تدفق التمكين لديك، أو معالجة الأخطاء لديك.</p>
<h3 id="الواجهات-التجريبية-أو-غير-المدعومة-بالكامل">الواجهات التجريبية أو غير المدعومة بالكامل</h3>
<p>هذا هو الدلو الذي يستهدفه دليل Playwright الرسمي فعلًا. حالة البطارية. ذاكرة الجهاز. بعض الواجهات القريبة من العتاد. الميزة موجودة في منتجك. وسطح الأتمتة ليس من الدرجة الأولى في كل مكان. والمحاكاة هي الحركة العملية.</p>
<h2 id="أين-تساعد-التجهيزات">أين تساعد التجهيزات</h2>
<p>شجرة القرار الكاملة بين الدوال المساعدة والتجهيزات موجودة في <a href="https://stevekinney.com/courses/self-testing-ai-agents/where-fixtures-actually-help">أين تساعد التجهيزات فعلًا</a>. وهنا القاعدة في سطر واحد أبسط: إن كانت اختبارات عدة تحتاج عقد المتصفح نفسه، فاجعلها تجهيزة.</p>
<p>مرشحات جيدة للتجهيزات:</p>
<ul>
<li><code>reducedMotionPage</code> تُستخدم في ملف مواصفات كامل يركّز على الوصول</li>
<li>تجهيزة <code>clipboardRecorder</code> تثبّت البديل المُحاكى وتكشف الكتابات الملتقطة</li>
<li><code>batteryAwarePage</code> أو <code>offlineCapablePage</code> تُستخدم في سيناريوهات متعددة</li>
<li>تجهيزة <code>context</code> مشتركة تحجب عمّال الخدمة وتثبّت طبقات محاكاة المتصفح وقت الإقلاع</li>
</ul>
<p>هذا يبقي الجزء المثير في المواصفة ظاهرًا:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;copies the invite link&#x27;</span>, <span class="hljs-title function_">async</span> ({ clipboardRecorder, page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/settings/team&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Copy invite link&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-title function_">expect</span>(clipboardRecorder.<span class="hljs-property">writes</span>).<span class="hljs-title function_">toEqual</span>([<span class="hljs-string">&#x27;https://shelf.test/invite/abc123&#x27;</span>]);
});
</code></pre>
<p>(تدفق <code>/settings/team</code> هذا مثال مُركَّب للتوضيح؛ Shelf لا يشحن صفحة رابط دعوة اليوم.)</p>
<p>فيُقرأ ذلك كسلوك، لا كإعداد.</p>
<h2 id="المزالق">المزالق</h2>
<h3 id="المحاكاة-في-وقت-متأخر-جدا">المحاكاة في وقت متأخر جدًا</h3>
<p>إن كان التطبيق يُقلع قبل وجود البديل المُحاكى، فأنت مخطئ بالفعل.</p>
<h3 id="استخدام-بديل-محاكى-بينما-يملك-playwright-دعما-حقيقيا">استخدام بديل مُحاكى بينما يملك Playwright دعمًا حقيقيًا</h3>
<p>إن كان الشيء هو الموقع الجغرافي أو الأذونات أو الساعة أو اللغة أو منفذ العرض أو حالة التخزين، فابدأ بميزة Playwright من الدرجة الأولى. فالبديل المكتوب يدويًا تراجع عادة في هذه الحالات.</p>
<h3 id="إعادة-القيمة-بلا-الشكل">إعادة القيمة بلا الشكل</h3>
<p>غالبًا ما تتوقع شيفرة الأطر وجود توابع ونقاط تسجيل أحداث حتى لو لم يهتم الاختبار المعني بها. «إنها تعيد القيمة المنطقية الصحيحة» لا يكفي إن كان المكوّن ينادي <code>addEventListener</code> أيضًا.</p>
<h3 id="محاكاة-المصادقة-عبر-localstorage">محاكاة المصادقة عبر <code>localStorage</code></h3>
<p>إن كان التطبيق الحقيقي يصادق عبر حالة المتصفح، فاستخدم <code>storageState</code> أو تدفق تسجيل الدخول الحقيقي في التطبيق. محاكاة تخزين المصادقة يدويًا طريقة رائعة لصنع مجموعة اختبارات تنجح بينما مسار تسجيل الدخول الفعلي معطل.</p>
<h3 id="نسيان-فروق-المتصفحات">نسيان فروق المتصفحات</h3>
<p>كلما صار بديلك المُحاكى أكثر تخصيصًا، صار أسهل أن تثبّت سلوك <a href="https://www.chromium.org/chromium-projects/">Chromium</a> بالخطأ داخل اختبار تحسبه محمولًا. وهذا أحد المواضع التي تستحق فيها جولة دخان صغيرة في <a href="https://www.mozilla.org/firefox/">Firefox</a> أو <a href="https://webkit.org/">WebKit</a> عناءها.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Mocking browser APIs</span>

<span class="hljs-bullet">-</span> Use Playwright&#x27;s first-class emulation and browser options before writing a
  custom browser API mock.
<span class="hljs-bullet">-</span> Install custom browser API mocks with <span class="hljs-code">\`page.addInitScript()\`</span> or
  <span class="hljs-code">\`browserContext.addInitScript()\`</span> before navigation.
<span class="hljs-bullet">-</span> If the app listens for browser API updates, the mock must fire the same
  events the real API would fire.
<span class="hljs-bullet">-</span> Keep one-off mocks in the test. Move shared browser-environment contracts
  into fixtures.
<span class="hljs-bullet">-</span> Do not fake authentication with ad-hoc <span class="hljs-code">\`localStorage\`</span> writes when
  <span class="hljs-code">\`storageState\`</span> or the real login flow exists.
</code></pre>
<h2 id="الشيء-الذي-يجب-تذكره">الشيء الذي يجب تذكّره</h2>
<p>البدائل المُحاكاة لواجهات المتصفح لا تكون مفيدة إلا حين تحفظ العقد الذي يستخدمه تطبيقك فعلًا. وهذا يعني التثبيت المبكر، وشكل الكائن الصحيح، وسلوك الأحداث الحقيقي حين يشترك المكوّن. وأي شيء أقل من ذلك طريق سريع لتثبت أن بديلك المُحاكى يعمل.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception">اعتراض الشبكة عبر المسارات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة بحالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/where-fixtures-actually-help">أين تساعد التجهيزات فعلًا</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقق عبر المتصفحات دون حرق حلقة التطوير</a></li>
</ul>
`,o={book:s,chapter:e,chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,e as chapter,a as chapterTitle,o as default,p as headings,l as html,n as slug,t as title};
