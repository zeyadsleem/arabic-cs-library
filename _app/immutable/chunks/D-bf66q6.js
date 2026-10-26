const n="kinney",t="self-testing-ai-agents",s="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="lab-add-cross-browser-coverage",i="مختبر: إضافة تغطية عبر المتصفحات",l=[{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"الخطوة-1-أضف-مشاريع-المتصفحات",text:"الخطوة 1: أضف مشاريع المتصفحات"},{depth:2,id:"الخطوة-2-وسم-مجموعة-الدخان-الفرعية",text:"الخطوة 2: وسّم مجموعة الدخان الفرعية"},{depth:2,id:"الخطوة-3-أضف-أوامر-مركزة",text:"الخطوة 3: أضف أوامر مركّزة"},{depth:2,id:"الخطوة-4-أبق-العناصر-خاصة-بكل-متصفح",text:"الخطوة 4: أبقِ العناصر خاصة بكل متصفح"},{depth:2,id:"الخطوة-5-تحقق-من-التقسيم",text:"الخطوة 5: تحقّق من التقسيم"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:2,id:"استكشاف-الأخطاء",text:"استكشاف الأخطاء"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],o=`<p>يأخذ هذا المختبر النصيحة المجرّدة ويحوّلها إلى تخطيط Playwright فعلي يستطيع الوكيل تشغيله دون إذابة الحلقة السريعة.</p>
<blockquote>
<p><strong>المتطلّب المسبق</strong></p>
<p>أكمل <a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقّق عبر المتصفحات دون إحراق حلقة التطوير</a> أولًا. يفترض هذا المختبر أنك <em>لا</em> تضع المجموعة الكاملة على كل متصفح عن قصد.</p>
</blockquote>
<h2 id="المهمة">المهمة</h2>
<p>أضف تغطية Firefox وWebKit إلى مجموعة فرعية موسومة من اختبارات الدخان في Shelf مع إبقاء Chromium المتصفح الافتراضي محليًا وفي طلبات السحب.</p>
<h2 id="الخطوة-1-أضف-مشاريع-المتصفحات">الخطوة 1: أضف مشاريع المتصفحات</h2>
<p>حدّث <code>playwright.config.ts</code> في Shelf كي يعرّف مشاريع من أجل:</p>
<ul>
<li>Chromium</li>
<li>Firefox</li>
<li>WebKit</li>
</ul>
<p>أبقِ Chromium المشروع الافتراضي الذي تشغّله أكثر من غيره.</p>
<p>يحتوي قسم <strong>مشاريع Playwright التي تقسّم العمل</strong> في درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقّق عبر المتصفحات دون إحراق حلقة التطوير</a> على كتلة إعداد كاملة متعددة المشاريع لـShelf. وفي النسخة الانطلاقية الحالية، أصغر نسخة عملية هي:</p>
<ul>
<li><code>chromium</code> للحلقة المحلية العادية</li>
<li><code>firefox-smoke</code> لمجموعة الدخان العامة الموسومة</li>
<li><code>webkit-smoke</code> لمجموعة الدخان العامة الموسومة</li>
</ul>
<p>إن كنت بنيت أصلًا مشروعي <code>setup</code> و<code>authenticated</code> في مختبرات المصادقة السابقة، فأبقهما في Chromium أيضًا. والحيلة الأساسية أن سكربت <code>test</code> الافتراضي يشغّل صراحة مشروع Chromium السريع وحده، فيبقى Firefox وWebKit خارج الحلقة اليومية.</p>
<p>قبل أن تستطيع فعلًا <em>تشغيل</em> المشاريع الجديدة محليًا، ثبّت المتصفحات البديلة التي لم ينزّلها Playwright حين أعددت الحلقة السريعة:</p>
<pre><code class="language-bash">npx playwright install --with-deps firefox webkit
</code></pre>
<p>يشرح تنبيه <strong>ثبّت المتصفحات الإضافية أولًا</strong> في الدرس لماذا هذا مطلوب (فـPlaywright يقصر افتراضيًا على Chromium). افعل هذا مرة واحدة لكل آلة؛ وسيحتاج منفّذو CI إليه أيضًا — ولهذا ينبغي أن يشغّل سير العمل الليلي الذي تبنيه في المختبر التالي السطر نفسه قبل خطوة الاختبار.</p>
<h2 id="الخطوة-2-وسم-مجموعة-الدخان-الفرعية">الخطوة 2: وسّم مجموعة الدخان الفرعية</h2>
<p>اختر مجموعة صغيرة من الاختبارات ووسّمها للتنفيذ عبر المتصفحات.</p>
<p>مرشحات جيدة:</p>
<ul>
<li>ملف <code>tests/smoke.spec.ts</code> الانطلاقي</li>
<li>ملف <code>tests/playground.spec.ts</code> العام إن كنت بنيته في مختبر المحددات</li>
<li>تدفّق نموذج واحد</li>
<li>تفاعل نافذة منبثقة أو درج واحد</li>
</ul>
<p>يعرض قسم <strong>وسّم الاختبارات الصحيحة، لا كل الاختبارات</strong> في الدرس صيغة الوسم في Playwright — <code>test('...', { tag: '@cross-browser' }, async ({ page }) =&gt; {...})</code> — ونداء CLI المطابق <code>--grep @cross-browser</code>. استخدم ذلك النمط مباشرة. وأبسط شكل حالي في Shelf هو وسم الاختبارات في <code>tests/smoke.spec.ts</code> وترك مشروعي Firefox وWebKit يطابقان تلك المجموعة الموسومة وحدها.</p>
<h2 id="الخطوة-3-أضف-أوامر-مركزة">الخطوة 3: أضف أوامر مركّزة</h2>
<p>اعرض أوامر كهذه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --project=chromium&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;test:cross-browser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قد تختلف أسماء السكربتات الدقيقة. أما التقسيم فلا ينبغي أن يختلف.</p>
<h2 id="الخطوة-4-أبق-العناصر-خاصة-بكل-متصفح">الخطوة 4: أبقِ العناصر خاصة بكل متصفح</h2>
<p>إن كان إعداد Playwright أو مهمة CI لديك يرفع الآثار ولقطات الشاشة، فتأكّد من ظهور اسم المتصفح في مسار العنصر أو اسم المهمة.</p>
<p>تريد أن تُقرأ الإخفاقات هكذا:</p>
<ul>
<li>فشل Firefox في اختبار دخان تسجيل الدخول</li>
<li>فشل WebKit في اختبار دخان تركيز النافذة المنبثقة</li>
</ul>
<p>لا هكذا:</p>
<ul>
<li>فشل متصفح ما في مكان ما، حظًا سعيدًا</li>
</ul>
<h2 id="الخطوة-5-تحقق-من-التقسيم">الخطوة 5: تحقّق من التقسيم</h2>
<p>شغّل الأمرين:</p>
<ul>
<li>حلقة Chromium الافتراضية</li>
<li>حلقة الدخان عبر المتصفحات</li>
</ul>
<p>ثم اكسر شيئًا عمدًا من المرجّح أن يهمّ أحد المتصفحات البديلة:</p>
<ul>
<li>تأكيد إدارة التركيز</li>
<li>محدد حسّاس للتخطيط</li>
<li>سلوك عنصر تحكّم في نموذج</li>
</ul>
<p>أنت لا تحاول إنتاج «خطأ Safari» مزيف. أنت تتحقّق من أن سير العمل يستطيع جعل إخفاق خاص بمتصفح مقروءًا.</p>
<h2 id="معايير-القبول">معايير القبول</h2>
<ul>
<li>يعرّف Shelf مشاريع Playwright لـChromium وFirefox وWebKit</li>
<li>يبقى Chromium أمر المتصفح السريع الافتراضي</li>
<li>توجد مجموعة دخان موسومة للتغطية عبر المتصفحات</li>
<li>أمر مسمّى يشغّل مجموعة الدخان عبر المتصفحات على مشاريع المتصفحات الثلاثة كلها</li>
<li>العناصر أو أسماء المهام الخاصة بكل متصفح تجعل الإخفاقات سهلة التمييز</li>
<li>يظل أمر Chromium الافتراضي يعمل دون سحب مصفوفة المتصفحات الكاملة إلى كل تشغيل</li>
</ul>
<h2 id="استكشاف-الأخطاء">استكشاف الأخطاء</h2>
<ul>
<li>إن كانت مجموعة المتصفحات المتعددة بطيئة، فقلّص قائمة الاختبارات قبل أن تحسّن البنية التحتية.</li>
<li>إن كان الاختبار نفسه متذبذبًا في كل متصفح، فليست لديك مشكلة متصفح. لديك مشكلة انتظار أو حتمية.</li>
<li>إن تصرّف WebKit بشكل مختلف، فاعتبر ذلك إشارة أولًا. وتستطيع أن تقرّر لاحقًا إن كان خطأ منتج، أو غرابة متصفح، أو افتراضًا في الاختبار.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>شغّل مجموعة الدخان عبر المتصفحات فقط على طلبات السحب التي تمسّ مسارات الواجهة.</li>
<li>أضف أمر إعادة إنتاج خاص بمتصفح إلى <code>CLAUDE.md</code>.</li>
<li>خزّن ملاحظة قصيرة في المستودع تسرد المسارات التي استحقّت تغطية دخان عبر المتصفحات ولماذا.</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>المكسب هنا ليس «نشغّل متصفحات أكثر». المكسب هو «نشغّل المتصفحات الصحيحة على الاختبارات الصحيحة دون جعل الحلقة السريعة غير قابلة للاستخدام».</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/add-cross-browser-coverage-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop">التحقّق عبر المتصفحات دون إحراق حلقة التطوير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">حلقات التحقّق الليلية</a></li>
</ul>
`,p={book:n,chapter:t,chapterTitle:s,slug:e,title:i,headings:l,html:o};export{n as book,t as chapter,s as chapterTitle,p as default,l as headings,o as html,e as slug,i as title};
