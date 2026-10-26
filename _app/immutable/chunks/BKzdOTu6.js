const e="kinney",s="self-testing-ai-agents",t="وكلاء ذكاء اصطناعي يختبرون أنفسهم",n="triage-three-traces-solution",o="الحل",a=[{depth:2,id:"الأثر-a-عدم-تطابق-التهيئة-المصادقة",text:"الأثر A: عدم تطابق التهيئة / المصادقة"},{depth:2,id:"الأثر-b-حالة-تسابق-توقيتية",text:"الأثر B: حالة تسابق توقيتية"},{depth:2,id:"الأثر-c-تصيير-معتمد-على-الترتيب-التباس-في-المحدد",text:"الأثر C: تصيير معتمد على الترتيب / التباس في المحدد"},{depth:2,id:"الدرس-الأعلى",text:"الدرس الأعلى"},{depth:2,id:"الشيء-الآخر",text:"الشيء الآخر"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>جولة واحدة عبر الآثار الثلاثة، مع الدليل الذي سأستشهد به لكل منها. إن بدت تشخيصاتك مختلفة في <em>التفاصيل</em> — صياغة إصلاح مختلفة، أو أرقام أسطر محددة مختلفة — فلا بأس. الذي ينبغي أن يتطابق هو الدلو واللوحة.</p>
<p>تأتي الآثار من ثلاث مواصفات في <code>tests/labs/broken-traces/</code>. وكل واحدة من تلك المواصفات تبدأ حاليًا بـ<code>test.skip()</code> كبوابة أمان، ومشروع <code>labs-broken-traces</code> المستقبلي غير معرّف بعد في <code>playwright.config.ts</code> الخاص بنسخة البداية — فعلى دالة المولِّد المساعدة التي تضيفها في المختبر أن تزيل (أو تغلّف) نداءات <code>test.skip()</code> وتربط ذلك المشروع قبل أن يمكن التقاط أي أثر فعلًا. وبعد أن تضيف دالة المولِّد المساعدة في المختبر، ولّدها بـ:</p>
<pre><code class="language-bash">npm run traces:generate
</code></pre>
<p>ثم افتح كل واحدة بـ<code>npx playwright show-trace playwright-report/lab-traces/&lt;name&gt;.zip</code> واقرأ معي.</p>
<h2 id="الأثر-a-عدم-تطابق-التهيئة-المصادقة">الأثر A: عدم تطابق التهيئة / المصادقة</h2>
<p><strong>المواصفة</strong>: <code>trace-a-config.spec.ts</code>، وهي تبدأ بـ<code>test.use({ storageState: { cookies: [], origins: [] } })</code> للخروج من سياق المصادقة الافتراضي، ثم تنتقل إلى <code>/shelf</code> وتؤكد ظهور عنوان «Your books».</p>
<p><strong>اسم الخطوة الفاشلة</strong>: <code>expect(heading).toBeVisible()</code> في السطر 25 (المواصفة لا تستخدم <code>test.step</code>، فنحصل على عنوان الاختبار مع رقم السطر).</p>
<p><strong>اللوحة الحاملة للدليل القاطع</strong>: الشبكة.</p>
<p><strong>الدليل</strong>: انقر إجراء <code>goto('/shelf')</code> في الخط الزمني، ثم افتح لوحة الشبكة. تُظهر اللوحة طلبين:</p>
<ul>
<li><code>GET /shelf</code> → <code>302 Found</code>، مع ترويسة استجابة <code>Location: /login</code>.</li>
<li><code>GET /login</code> → <code>200 OK</code>.</li>
</ul>
<p>أعاد التطبيق التوجيه إلى <code>/login</code> قبل أن تُصيَّر صفحة الرف إطلاقًا. وتؤكد ذلك لقطة DOM عند الفشل — فالصفحة تعرض نموذج تسجيل دخول، لا رفًا. ووحدة التحكم فارغة لأن هذا إعادة توجيه من جانب الخادم، لا خطأ من جانب العميل.</p>
<p><strong>السبب</strong>: عدم تطابق التهيئة / المصادقة. فالاختبار بلا حالة تخزين، و<code>/shelf</code> محجوبة من جانب الخادم على <code>locals.user</code> في تطبيق Shelf.</p>
<p><strong>الإصلاح المقترح</strong>: بعد أن تربط مشروع <code>labs-broken-traces</code> المستقبلي (نسخة البداية الحالية لا تعرّفه — تضيفه إلى جانب مختبر حالة التخزين)، احذف سطر <code>test.use({ storageState: { cookies: [], origins: [] } })</code> في أعلى المواصفة ودع <code>storageState: storageStatePath</code> الافتراضي في المشروع يتولى الأمر. فالافتراضي يركّب ملف تعريف ارتباط جلسة القارئ، فلن يُطلق التوجيه.</p>
<p>إن أردت الاحتفاظ بالسيناريو غير الموثّق <em>و</em> الوصول إلى صفحة شبيهة بالرف، فستحتاج إلى تأكيد مختلف — ربما فحص عنوان نموذج تسجيل الدخول بدلًا من «Your books». لكن ذلك اختبار مختلف. أما الإصلاح هنا فهو الربط.</p>
<h2 id="الأثر-b-حالة-تسابق-توقيتية">الأثر B: حالة تسابق توقيتية</h2>
<p><strong>المواصفة</strong>: <code>trace-b-race.spec.ts</code>، وهي تنقر نجمة تقييم الكتاب على Station Eleven وتؤكد فورًا ظهور نص التقييم بفترة سماح <code>{ timeout: 1 }</code>، دون انتظار استجابة <code>PATCH /api/shelf/:id</code>.</p>
<p><strong>اسم الخطوة الفاشلة</strong>: <code>expect(stationEleven.getByText('Rated: 4/5')).toBeVisible({ timeout: 1 })</code> في السطر 36.</p>
<p><strong>اللوحة الحاملة للدليل القاطع</strong>: الشبكة.</p>
<p><strong>الدليل</strong>: امشِ على الخط الزمني. تُظهر قائمة الإجراءات النقر على زر الحفظ، ثم <code>expect</code> الفوري، ثم طلب <code>PATCH /api/shelf/:entryId</code> <em>ما زال معلّقًا</em> في لحظة تشغيل التأكيد. ويُظهر صف الشبكة أن الطلب بدأ عند (ولنقل) 1.187s واكتمل عند 1.420s. أما التأكيد فقد أُطلق عند 1.188s، واستسلم عند 1.189s، وفشل.</p>
<p>وتؤكد لقطة DOM عند الفشل ذلك: مقال Station Eleven لا يُظهر نص «Rated: 4/5». فالواجهة لم تتحدّث لأن الخادم لم يستجب، والعميل لا يصيّر التقييم تفاؤليًا.</p>
<p><strong>السبب</strong>: حالة تسابق توقيتية. فقد أكّد الاختبار قبل اكتمال رحلة الشبكة ذهابًا وإيابًا.</p>
<p><strong>الإصلاح المقترح</strong>: انتظر استجابة <code>PATCH</code> قبل تأكيد حالة الواجهة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> ratingResponse = page.<span class="hljs-title function_">waitForResponse</span>(
  <span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> <span class="hljs-regexp">/\\/api\\/shelf\\/.+/</span>.<span class="hljs-title function_">test</span>(response.<span class="hljs-title function_">url</span>()) &amp;&amp; response.<span class="hljs-title function_">request</span>().<span class="hljs-title function_">method</span>() === <span class="hljs-string">&#x27;PATCH&#x27;</span>,
);
<span class="hljs-keyword">await</span> dialog.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Save rating&#x27;</span> }).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">await</span> ratingResponse;

<span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(stationEleven.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Rated: 4/5&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>لاحظ أن الإصلاح <em>ليس</em> «ارفع المهلة من 1ms إلى 5000ms». فذلك سيغطي على حالة التسابق دون حلّها — سينجح الاختبار معظم الوقت ويفشل في تشغيل CI الوحيد الذي يكون فيه الخادم أبطأ من 5 ثوانٍ. الإصلاح الصحيح هو انتظار الشيء المحدد الذي تعتمد عليه، لا الانتظار مدة أطول.</p>
<p>هذا هو نمط الفشل نفسه الذي حذّرك منه <a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a>.</p>
<h2 id="الأثر-c-تصيير-معتمد-على-الترتيب-التباس-في-المحدد">الأثر C: تصيير معتمد على الترتيب / التباس في المحدد</h2>
<p><strong>المواصفة</strong>: <code>trace-c-stale-locator.spec.ts</code>، وهي تنتقل إلى <code>/shelf</code> (وفيه أصلًا Station Eleven وPiranesi على الرف بفضل دالة الزرع المساعدة من مختبر الحالة الحتمية) وتنادي <code>page.getByRole('button', { name: 'Rate this book' }).click()</code> دون تحديد النطاق إلى مقال بعينه.</p>
<p><strong>اسم الخطوة الفاشلة</strong>: النقر في السطر 33، <code>page.getByRole('button', { name: 'Rate this book' }).click()</code>.</p>
<p><strong>اللوحة الحاملة للدليل القاطع</strong>: وحدة التحكم / المصدر. تُظهر لوحة الخطأ رسالة مخالفة الوضع الصارم من Playwright مباشرة:</p>
<pre><code>Error: strict mode violation: getByRole('button', { name: 'Rate this book' })
resolved to 2 elements:
  1) &lt;button&gt;…Rate this book&lt;/button&gt; aka getByRole('article', { name: /Station Eleven/i }).getByRole('button')
  2) &lt;button&gt;…Rate this book&lt;/button&gt; aka getByRole('article', { name: /Piranesi/i }).getByRole('button')
</code></pre>
<p>تطبع Playwright العنصرين المطابقين <em>مع مسار وصول مقترح لكل منهما</em>، وهذه هدية. وتؤكد لقطة DOM ذلك: صفحة الرف فيها عنصرا <code>&lt;article&gt;</code>، لكل منهما <code>&lt;button&gt;Rate this book&lt;/button&gt;</code> خاص به.</p>
<p><strong>السبب</strong>: تصيير معتمد على الترتيب / التباس في المحدد. فالمحدد يطابق عناصر متعددة لأن الصفحة فيها كتب متعددة.</p>
<p><strong>الإصلاح المقترح</strong>: حدّد نطاق المحدد إلى مقال بعينه أولًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page
  .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> })
  .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Rate this book&#x27;</span> })
  .<span class="hljs-title function_">click</span>();
</code></pre>
<p>هذا هو النمط نفسه الذي يسميه <a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">درس المحددات</a> «المحددات محددة النطاق بالمنطقة». والإصلاح ليس <code>.first()</code>، فهي ستنجح لكنها ستنكسر بصمت إن تغيّر ترتيب الرف يومًا. الإصلاح هو <em>أن تسمّي المقال الذي تريده</em>.</p>
<h2 id="الدرس-الأعلى">الدرس الأعلى</h2>
<p>لاحظ أين كان الدليل القاطع في كل أثر:</p>
<ul>
<li><strong>الأثر A</strong>: الشبكة.</li>
<li><strong>الأثر B</strong>: الشبكة.</li>
<li><strong>الأثر C</strong>: وحدة التحكم / المصدر.</li>
</ul>
<p>اثنان من الثلاثة كانا في لوحة الشبكة، وكل واحد منهما كان نوعًا <em>مختلفًا</em> من أدلة الشبكة. فدليل الأثر A القاطع كان رمز الحالة 302. ودليل الأثر B القاطع كان طلبًا معلّقًا. اللوحة نفسها، وإشارة مختلفة تمامًا.</p>
<p>أما دليل الأثر C القاطع فلم يكن في لوحة الشبكة إطلاقًا. كان في رسالة الخطأ التي طبعتتها Playwright مباشرة — على مستوى أعلى من اللوحات، ويسهل تفويته إن قفزت إلى عارض الآثار وبدأت النقر هنا وهناك.</p>
<p>الانضباط الذي يدرّبه المختبر: <em>امسح اللوحات الأربع كلها</em> قبل أن تقرر أيها تحمل الدليل القاطع. فالوكلاء يميلون افتراضيًا إلى النقر في الخط الزمني وعدم فتح لوحة الخطأ لأن «الخطأ واضح، إنه في سجل الاختبار». اقرأ لوحة الخطأ على أي حال. أحيانًا تحكي لك القصة كاملة فلا تحتاج إلى فتح لقطة إطلاقًا.</p>
<h2 id="الشيء-الآخر">الشيء الآخر</h2>
<p>الأثر هو <em>بيانات</em>. سكربت المولِّد في المختبر، <code>scripts/generate-lab-traces.mjs</code>، يحلّل بنية مجلد <code>playwright-report/test-results/</code> ويستخرج ثلاثة ملفات zip محددة بمطابقة بادئة المشروع + المواصفة. إنه نحو 100-150 سطرًا من Node، بلا اعتماديات، ويتعامل مع الحالة التي تخرج فيها Playwright بقيمة غير صفرية لأن مواصفات المختبر حمراء بالتصميم. ونسخة Shelf الانطلاقية لا تشحن تلك الدالة المساعدة، فهذا الحل هو المرجع للملف الذي تضيفه أثناء المختبر.</p>
<p>يمكنك كتابة سكربت مشابه لاستخراج الأدلة من الآثار برمجيًا — أعطه ملف zip الأثر، ودعه ينظر في سجل الشبكة بحثًا عن استجابات 4xx/5xx، ودعه يعلّم الطلبات المعلّقة في لحظة الفشل. وهذا ليس هدفًا إضافيًا لهذا المختبر؛ إنه إشارة إلى أين يقود هذا المسار. فالآثار بنيوية؛ يمكنك كتابة سكربتات عليها؛ ويمكنك بناء تشخيصاتك الخاصة فوقها. ومعظم الناس لا يفعلون. وتلك فرصة.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/reading-a-trace">قراءة أثر</a> — المرجع لوحة بلوحة.</li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/flaky-test-triage">فرز الاختبارات المتذبذبة: حين تكذب عليك إعادات المحاولة</a> — تصنيف الدلاء الأربعة.</li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a> — الدرس الذي يعود إليه الأثر B إلى وسطه تمامًا.</li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحددات وتسلسل الوصول</a> — الدرس الذي ينتهي إليه الأثر C.</li>
</ul>
`,l={book:e,chapter:s,chapterTitle:t,slug:n,title:o,headings:a,html:c};export{e as book,s as chapter,t as chapterTitle,l as default,a as headings,c as html,n as slug,o as title};
