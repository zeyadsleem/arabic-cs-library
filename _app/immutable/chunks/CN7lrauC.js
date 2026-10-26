const e="kinney",n="self-testing-ai-agents",s="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="ci-as-the-loop-of-last-resort",o="CI كحلقة الملاذ الأخير",i=[{depth:2,id:"ما-يلتقطه-ci-وحده",text:"ما يلتقطه CI وحده"},{depth:2,id:"ما-لا-ينبغي-أن-يفعله-ci",text:"ما لا ينبغي أن يفعله CI"},{depth:2,id:"سير-عمل-shelf-في-ci-على-مستوى-عال",text:"سير عمل Shelf في CI على مستوى عالٍ"},{depth:2,id:"التوازي-والتخزين-المؤقت-المقبضان-المهمان",text:"التوازي والتخزين المؤقت، المِقبضان المهمّان"},{depth:2,id:"التشظية-والتقارير-بعد-أن-تستحقها-المجموعة",text:"التشظية والتقارير، بعد أن تستحقها المجموعة"},{depth:2,id:"الفشل-السريع-لكن-ليس-بسرعة-مفرطة",text:"الفشل السريع، لكن ليس بسرعة مفرطة"},{depth:2,id:"الفحوص-المطلوبة-وحماية-الفروع",text:"الفحوص المطلوبة وحماية الفروع"},{depth:2,id:"ما-يراه-الوكيل-عندما-يفشل-ci",text:"ما يراه الوكيل عندما يفشل CI"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],a=`<p>اقتربنا من النهاية. بقي درس واحد، وهو الدرس الذي يعمل فيه كل ما بنيناه اليوم معًا، دون إشراف، داخل سير عمل <a href="https://docs.github.com/en/actions">GitHub Actions</a> تملكه أنت.</p>
<p>أريد تأطير هذا مسبقًا، لأن تأطير CI المعتاد يختلف عن تأطيري.</p>
<p>التأطير المعتاد: «CI هو المكان الذي تعمل فيه الاختبارات.» تُعِدّ CI <em>لأنك</em> تحتاج إلى تشغيل اختباراتك في مكان ما، وسير العمل قائمة خطوات تحدث عند كل دفع. أي أن CI لديك هو مجموعة اختباراتك، ببساطة.</p>
<p>تأطيري: <strong>CI هو حلقة الملاذ الأخير.</strong> كل ما بنيناه اليوم حلقة تعمل <em>قبل</em> CI. يعمل Lint عند الحفظ. ويعمل فحص الأنواع عند الحفظ. والاختبارات تعمل محليًا. ويعمل Knip عند الدفع. ويراجع Bugbot عند فتح طلب السحب. ويفحص الوكيل تغييراته بنفسه قبل أن يعلن الانتهاء. بحلول الوقت الذي يصل فيه الكود إلى CI، يكون معظم الأخطاء قد التُقط بالفعل، ومهمة CI أن تلتقط الباقي—إضافة إلى صنف الأخطاء الذي لا يمكنك التقاطه محليًا لأن حاسوبك ليس بيئة الإنتاج.</p>
<p>هذا التحوّل مهم لأنه يغيّر ما تضعه <em>داخل</em> CI. إن كان CI هو المكان الذي تعمل فيه الاختبارات، فستحشر كل شيء فيه وتنتظر عشر دقائق عند كل دفع. أما إن كان CI هو الملاذ الأخير، فتضع <em>النسخ الصارمة</em> من كل فحص في CI—مصفوفة Playwright الكاملة، والانحدار البصري الكامل، وفحص الأسرار الكامل مقابل السجل، وتدقيق الاعتماديات الكامل—وتقبل أن CI بطيء لأنك تشغّله مقابل البيئة التي تهمّك فعلًا.</p>
<p>ملاحظة على النطاق قبل أن نمضي: CI الأخضر ليس نهاية القصة. يلتقط <a href="https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation">التحقّق بعد الدمج وبعد النشر</a> ما يحدث بعد الدمج أو معاينة النشر. ويبني الملحق حلقات الليل والمتصفحات المتعددة الأوسع بمزيد من التفصيل.</p>
<p>يستخدم سير عمل Shelf المكتمل <code>npm</code> و<code>actions/setup-node@v6</code>، ويخزّن مؤقتًا كلا المسارين <code>~/.npm</code> و<code>~/.cache/ms-playwright</code>. هذا هو المرجع الملموس بينما تقرأ بقية هذا الدرس.</p>
<p>الملفات الملموسة تهمّ هنا أيضًا. بنهاية مختبر CI، تكون البوابة اليومية لـ Shelf في <code>.github/workflows/main.yml</code> والإيقاع البطيء في <code>.github/workflows/nightly.yml</code>. مهمة الطرف إلى الطرف تكتب <code>DATABASE_URL=file:./ci.db</code>، وتشغّل <code>npm run test</code>، ويمكنها عند الفشل رفع ناتج <code>npm run dossier</code> إن كنت قد أكملت ذلك المختبر. السطح الثابت في النسخة الأولية هو <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run test</code>؛ وتوسّعه المختبرات اللاحقة بـ <code>npm run knip</code> وgitleaks وتوليد الملف الجامع.</p>
<h2 id="ما-يلتقطه-ci-وحده">ما يلتقطه CI وحده</h2>
<p>قائمة قصيرة بأشياء يستطيع CI <em>وحده</em> التقاطها بثقة:</p>
<ul>
<li><strong>اختلافات المنصّات.</strong> حاسوبك macOS. والإنتاج Linux. وتختلف بكسلات لقطات Playwright بينهما. يعمل CI لديك على Linux فيلتقط الانحراف.</li>
<li><strong>اختلافات المتصفحات.</strong> محليًا تشغّل Chromium للسرعة. أما CI فيشغّل المصفوفة الكاملة (Chromium وFirefox وWebKit) ويلتقط صنف الخطأ «يعمل في Chrome، معطوب في Safari».</li>
<li><strong>أخطاء البيئة النظيفة.</strong> على حاسوب الوكيل عشرة أشهر من الاعتماديات المخزّنة مؤقتًا، ومتغيّرات البيئة، والأسماء المستعارة المخصّصة للصدفة. أما CI فيبدأ نظيفًا في كل تشغيل. أي شيء يعمل فقط بفضل الحالة المتراكمة على حاسوبك سيفشل في CI.</li>
<li><strong>التزامن على نطاق واسع.</strong> بمجرد أن تزيد عدد العمال، يظهر سباق التزامن الأعلى في CI. لا يثبّت Shelf قيمة <code>workers</code>، لكن في اللحظة التي تبدأ فيها المواصفات الموثّقة بمشاركة ملف SQLite واحد، يكون CI أول مكان تظهر فيه تسريبات العزل.</li>
<li><strong>الفحوص الحسّاسة للوقت.</strong> إعادة توليد ملفات HAR ليلًا، وتدقيق الاعتماديات أسبوعيًا، والتحقّق من تدوير الأسرار شهريًا—لا معنى لها محليًا. CI هو مكانها.</li>
<li><strong>فرض الآثار.</strong> حجب الدمج، ورفع التقارير، ونشر فحوص الحالة على طلبات السحب. يعيش غراء سير العمل في CI لأن مفاتيح API اللازمة لفعل ذلك تعيش هناك.</li>
</ul>
<p>إن لم يكن لديك أي من هذه الهواجس، فأنت لا <em>تحتاج</em> CI بالمعنى الدقيق. يمكنك تشغيل كل شيء محليًا. معظم الفرق تحتاج ثلاثة منها على الأقل، ولهذا وُجد CI.</p>
<h2 id="ما-لا-ينبغي-أن-يفعله-ci">ما <em>لا</em> ينبغي أن يفعله CI</h2>
<p>بالمثل: أشياء لا ينبغي أن يلتقطها CI، لأن شيئًا أبكر كان يجب أن يلتقطها.</p>
<ul>
<li><strong>أخطاء التنسيق.</strong> إن لم يكن Prettier يعمل في pre-commit، فأصلح خطّاف pre-commit. لا تدع CI يصبح المكان الذي تلاحظ فيه الشيفرة غير المنسّقة.</li>
<li><strong>أخطاء الأنواع في الملفات التي لمسها المطوّر.</strong> يلتقطها فحص الأنواع في pre-push. وفحص الأنواع في CI شبكة أمان، لا السطح الأساسي.</li>
<li><strong>مخالفات lint الواضحة.</strong> المنطق نفسه. إن كان CI أول مكان ترى فيه <code>no-unused-vars</code>، فمحرّرك وخطّافاتك مهيّأة خطأً.</li>
<li><strong>«هل نسي الوكيل تشغيل الاختبارات؟»</strong> يجب أن يلتقط هذا ملف التعليمات وخطّافات Claude. إن كنت تعتمد على CI لملاحظة أن الوكيل تخطّى الاختبارات المحلية، فقد فوّت حلقة أرخص.</li>
</ul>
<p>القاعدة: يلتقط CI المشكلات الخاصة بالبيئة والخاصة بالنطاق. وكل ما عدا ذلك كان يجب أن يُلتقط أبكر، وعندما يلتقط CI شيئًا كان يمكن التقاطه أبكر، فاعتبره عيبًا في حلقاتك الأبكر، لا ميزة في CI.</p>
<h2 id="سير-عمل-shelf-في-ci-على-مستوى-عال">سير عمل Shelf في CI على مستوى عالٍ</h2>
<p>يمرّ الدرس التالي على ملف YAML الفعلي. إليك الشكل قبل أن نصل إلى هناك.</p>
<p>عند كل دفع إلى أي فرع وكل طلب سحب إلى main:</p>
<ol>
<li><strong>الاستنساخ والتثبيت.</strong> استنسخ المستودع، واستعد المخازن المؤقتة، ثم <code>npm ci --ignore-scripts</code>.</li>
<li><strong>الطبقة الثابتة.</strong> شغّل lint وtypecheck وknip وgitleaks. في مستودع Shelf الخاص بالورشة تبقى هذه في مهمة <code>static</code> واحدة لأن كلفة التهيئة أكبر من فائدة توزيع أربعة فحوص قصيرة على أربعة منفّذين. استخدم إجراء Gitleaks الرسمي أو خطوة CLI مباشرة بحسب ما تسمح به خطتك وترخيصك.</li>
<li><strong>اختبارات الوحدة.</strong> <code>npm run test:unit</code>. سريعة.</li>
<li><strong>اختبارات الطرف إلى الطرف.</strong> Playwright، تشغيل Chromium كامل. ارفع آثار التتبّع ولقطات الشاشة والملف الجامع للفشل إن فشل أي شيء.</li>
</ol>
<p>هذا هو <code>main.yml</code> كله الذي يطلب منك المختبر بناءه: ثلاث مهام، لا سبع. الانحدار البصري يركب داخل مجموعة Playwright، والإضافات الخاصة بالاستضافة فقط (معاينات النشر، وفحص الدخان بعد النشر) تبقى خارج سير العمل الرئيسي حتى يوجد سبب ملموس لدفع تلك الكلفة.</p>
<p>على جدول ليلي:</p>
<ol>
<li><strong>تحديث ملفات HAR</strong> بإعادة التسجيل مقابل واجهة Open Library البرمجية الحقيقية. افتح طلب سحب بملفات HAR المحدّثة إن تغيّرت. ويراجعها إنسان.</li>
<li><strong>تدقيق الاعتماديات.</strong> شغّل <code>npm audit</code>، وافتح تذكرة أو طلب سحب إن ظهر أي جديد.</li>
<li><strong>تشغيل Playwright كامل عبر المتصفحات.</strong> Chromium وFirefox وWebKit. لإظهار اختلافات تفوتها تشغيلات Chromium اليومية وحدها.</li>
</ol>
<p>في مستودع GitHub موصول، يمكنك لاحقًا إضافة النشر إلى main وفحوص الدخان بعد النشر. يغطّي <a href="https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation">التحقّق بعد الدمج وبعد النشر</a> تلك الحلقة الأساسية. تحوّل دروس الملحق عناصر الليل والمتصفحات المتعددة المؤقتة إلى أنماط أكمل بعد انتهاء تدفّق الورشة ذي اليوم الواحد.</p>
<p>هذا هو الشكل كله الذي يطلب منك المختبر بناءه: ثلاث مهام في <code>.github/workflows/main.yml</code>، ولا سير عمل للنشر أو الليل بعد. يهبط العمل الليلي في مختبرات الملحق إلى جانب الأوامر التي يحكمها. كل مهمة مملّة. والقوة في التركيب.</p>
<h2 id="التوازي-والتخزين-المؤقت-المقبضان-المهمان">التوازي والتخزين المؤقت، المِقبضان المهمّان</h2>
<p>أمران تفعلهما مرة واحدة وتستفيد منهما في كل تشغيل.</p>
<p><strong>التوازي.</strong> تعمل مهام GitHub Actions بالتوازي افتراضيًا، لكن هذا لا يعني أن كل فحص يستحق مهمة خاصة به. في Shelf تبقى الفحوص الثابتة مجمّعة لأن كلفة التهيئة أكبر من فائدة توزيع أربع خطوات قصيرة. ثم تعمل مهمتا <code>unit</code> و<code>end-to-end</code> بالتوازي بعد نجاح <code>static</code>. وبمجرد أن تكبر المجموعة، يمكنك التقسيم أو التشظية بقوة أكبر.</p>
<p>إليك شكل سير عمل Shelf المتوازي:</p>
<pre><code>graph LR
  Static[&quot;Static job&lt;br/&gt;lint + typecheck + knip + gitleaks&quot;]
  Unit[&quot;Unit tests&quot;]
  E2E[&quot;End-to-end + screenshots + dossier&quot;]
  Merge{&quot;All Passed?&quot;}

  Static --&gt; Unit
  Static --&gt; E2E
  Unit --&gt; Merge
  E2E --&gt; Merge
</code></pre>
<p>لاحظ: تعمل المهمة الثابتة أولًا، ثم تعمل مهمتا الوحدة والطرف إلى الطرف بالتوازي. الزمن الكلي محدود بالأبطأ من المهمتين اللاحقتين، لا بمجموع كل فحص على حدة.</p>
<p><strong>التخزين المؤقت.</strong> ينتج Bun وnpm وyarn جميعًا مخازن مؤقتة مستقرة بحسب تجزئة ملف القفل. يخزّن Shelf كلا المسارين <code>~/.npm</code> و<code>~/.cache/ms-playwright</code> بدلًا من الالتزام باستراتيجية تخزين لـ <code>node_modules</code>. وهذا يكفي لقطع الأجزاء المكلفة من سير العمل دون إضافة طبقة تخزين أكثر هشاشة.</p>
<p>يبدو إجراء <code>cache</code> الفعلي في GitHub Actions عند Shelf هكذا:</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Cache</span> <span class="hljs-string">dependencies</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/cache@v5</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">path:</span> <span class="hljs-string">|
      ~/.npm
      ~/.cache/ms-playwright
</span>    <span class="hljs-attr">key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">runner.os</span> <span class="hljs-string">}}-deps-\${{</span> <span class="hljs-string">hashFiles(&#x27;package-lock.json&#x27;)</span> <span class="hljs-string">}}-playwright-\${{</span> <span class="hljs-string">hashFiles(&#x27;playwright.config.ts&#x27;)</span> <span class="hljs-string">}}</span>
</code></pre>
<p>هذا هو شكل التخزين المؤقت نفسه الذي يستخدمه Shelf. ابدأ منه قبل أن تبتكر شيئًا أكثر ذكاءً.</p>
<h2 id="التشظية-والتقارير-بعد-أن-تستحقها-المجموعة">التشظية والتقارير، بعد أن تستحقها المجموعة</h2>
<p>بمجرد أن تصبح مهمة الطرف إلى الطرف كبيرة بما يكفي، يصير المِقبض التالي هو التشظية. التفصيل المهم من وثائق Playwright هو أن <code>fullyParallel: true</code> يجعل التشظية أكثر عدلًا لأن العمل يتوازن على مستوى <strong>الاختبار</strong> بدلًا من مستوى <strong>الملف</strong>. إن كان أحد الملفات وحشًا وبقية الملفات ضئيلة، فهذا الفرق مهم.</p>
<p>عندما تُشظّي فعلًا، فبدّل المُبلِّغ المستخدم في توزيع CI إلى <a href="https://playwright.dev/docs/test-sharding#merging-reports-from-multiple-shards">صيغة تقرير blob</a>. تتضمّن تقارير blob الاختبارات مع مرفقاتها، وتنجو من رفع وتنزيل الآثار بسلام، ويمكن دمجها لاحقًا بـ:</p>
<pre><code class="language-bash">npx playwright merge-reports --reporter html ./all-blob-reports
</code></pre>
<p>إن احتاج التشغيل إلى وسم بيئي، فاضبط <a href="https://playwright.dev/docs/api/class-testproject#test-project-metadata"><code>metadata</code></a> لكل مشروع على كل مسار (أو وسِم الاختبارات الفردية بتعليقات <code>@firefox-smoke</code> / <code>@APIv2</code>) حتى تستطيع التقارير المدموجة أن تخبرك «هذا جاء من تشغيل الدخان على Firefox» بدلًا من إلقاء كل شظية في دلو واحد بلا هوية.</p>
<p>وإن استضفت المرفقات في مكان غير مجلد الآثار المستنسخ، فـ <a href="https://playwright.dev/docs/test-reporters"><code>attachmentsBaseURL</code></a> هو ما يجعل تقرير HTML يعرف أين ينظر. هذا أحد الإعدادات التي لا تحتاجها أبدًا حتى اليوم الذي تشير فيه كل روابط تقريرك إلى لا مكان.</p>
<h2 id="الفشل-السريع-لكن-ليس-بسرعة-مفرطة">الفشل السريع، لكن ليس بسرعة مفرطة</h2>
<p>خطأ شائع: <code>fail-fast: true</code> على كل مهمة، وهذا يجعل أي فحص أحمر واحد يلغي سير العمل كله. يبدو هذا فعّالًا—لماذا تستمر في التشغيل إن فشل شيء بالفعل؟—لكنه المقايضة الخطأ لحلقة بمستوى الورشة.</p>
<p>الافتراضي الأفضل هو <code>fail-fast: false</code>. شغّل كل شيء حتى الاكتمال. يريد الوكيل أن يرى <em>كل</em> الإخفاقات دفعة واحدة، لا الأول فقط، لأن إصلاحها واحدًا واحدًا أبطأ من إصلاحها في مرور واحد. وتشغيل كل شيء يعني أيضًا حصولك على آثار كاملة (التتبّعات، ولقطات الشاشة، والملفات الجامعة) لكل فشل، لا للفشل الذي انطلق أولًا فقط.</p>
<p>الاستثناء: تبعيات المهام. إن كانت مهمة Playwright تعتمد على بناء ناجح، فلا تشغّل Playwright حين يكون البناء أحمر. استخدم <code>needs:</code> للتعبير عن ذلك، ودع <code>fail-fast: false</code> يتولّى الباقي.</p>
<h2 id="الفحوص-المطلوبة-وحماية-الفروع">الفحوص المطلوبة وحماية الفروع</h2>
<p>بمجرد أن يصبح سير العمل موثوقًا، فعّل حماية الفروع على <code>main</code>:</p>
<ul>
<li>اشترط نجاح فحوص الحالة قبل الدمج.</li>
<li>اشترط الفحوص المحدّدة التي تهمّك. في سير عمل Shelf الحالي يعني ذلك <code>static</code> و<code>end-to-end</code> على الأقل، وعادةً <code>unit</code> أيضًا.</li>
<li>اختياريًا، اشترط أن يكون Bugbot (أو روبوت المراجعة الذي تختاره) قد أكمل وترك تعليقًا غير حاجب.</li>
<li>اشترط مراجعًا بشريًا للتغييرات خارج مسارات معيّنة.</li>
</ul>
<p>حماية الفروع هي البوابة الصلبة. وكل ما قبلها ليّن—يستطيع الوكيل تجاهل الفحوص المحلية إن كان مصمّمًا. CI مع حماية الفروع هو الطبقة غير القابلة للتفاوض.</p>
<h2 id="ما-يراه-الوكيل-عندما-يفشل-ci">ما يراه الوكيل عندما يفشل CI</h2>
<p>هذا هو الجزء الذي أريدك أن تحسّنه.</p>
<p>عندما يفشل CI، يجب أن يتمكّن الوكيل من التعافي دون إنسان يلصق رسائل الخطأ. وهذا يعني:</p>
<ul>
<li>أن تكون رسائل الفشل في ملخّص فحص الحالة محدّدة، لا «فشلت المهمة».</li>
<li>أن تُرفع الآثار (التتبّعات، ولقطات الشاشة، والملف الجامع، وتقرير JSON) إلى التشغيل.</li>
<li>أن يحصل طلب السحب على تعليق فيه رابط إلى الآثار وملخّص قصير.</li>
<li>أن يعمل سكربت الملف الجامع من <a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفات الفشل الجامعة</a> في CI ويُرفع ناتجه كأثر.</li>
</ul>
<p>مع توفّر ذلك، يستطيع الوكيل قراءة طلب السحب، وقراءة فحص الحالة، وتنزيل أثر الملف الجامع، ثم التكرار. لا يلزم أن تكون أنت المرحّل. يكرّر الوكيل حتى يصبح أخضر أو حتى يعلق بطريقة يستطيع أن يبلّغك بها.</p>
<p>رأيت هذا يحدث. يفتح وكيل طلب سحب، فيفشل CI، فيقرأ الوكيل أثر الملف الجامع، ويجري إصلاحًا، ويدفع التزامًا جديدًا، فيفشل CI على نحو مختلف، فيقرأ الوكيل الملف الجامع الجديد، ويصلحه، ويدفع مرة أخرى، فيصبح CI أخضر، ثم أعرف بالقصة كلها عندما أنظر إلى طلب السحب بعد ثلاثين دقيقة. إصلاحات أخطاء كاملة، مدفوعة ذاتيًا، لأن ناتج CI مقروء للوكيل. تلك هي الحلقة.</p>
<p>إن لم تكن لنسختك من Shelf نهاية بعيدة مستضافة بعد، فلا يمكنك إغلاق تلك الحلقة من طرف إلى طرف. ما <em>تستطيعه</em> هو جعل سير العمل مقروءًا مسبقًا: YAML صالح، وأوامر حقيقية، ومسارات آثار صريحة، ومدة احتفاظ محدودة، ولا سكربتات خفية خاصة بسير العمل. بمجرد ربط المستودع بـ GitHub، يكون الجزء الناقص الوحيد هو المنفّذ المستضاف.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## CI</span>

<span class="hljs-bullet">-</span> The CI workflow lives at <span class="hljs-code">\`.github/workflows/main.yml\`</span>. Read it before
  proposing changes to the CI configuration.
<span class="hljs-bullet">-</span> When CI fails, download the dossier artifact from the failed run:
  <span class="hljs-code">\`gh run download &lt;run-id&gt; -n failure-dossier\`</span>. Read the dossier,
  reproduce the failure locally, fix it, push a new commit.
<span class="hljs-bullet">-</span> Do not add <span class="hljs-code">\`continue-on-error: true\`</span> to any job without written
  justification in the commit message.
<span class="hljs-bullet">-</span> Do not reduce the strictness of CI checks to &quot;fix&quot; a failure. If a
  check is too strict, say so explicitly and propose the relaxation
  as a separate decision, not as part of a bug fix.
<span class="hljs-bullet">-</span> The nightly HAR refresh opens a PR. If the diff is suspicious, do not
  merge it—investigate whether the upstream API changed in a way that
  requires application code changes.
</code></pre>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>CI هو حيث تجتمع الحلقات التي بنيتها طوال اليوم، مرة أخرى، في بيئة نظيفة، بالنسخ الصارمة من كل فحص. إن كانت هذه <em>أول</em> مرة تعمل فيها أي من تلك الفحوص، فقد أسأت التوزيع. وإن كانت <em>آخر</em> مرة، بأضيق إعداد، وتلتقط أخطاء خاصة بالبيئة لا يستطيع حاسوبك التقاطها، فأنت تفعلها كما ينبغي.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفات الفشل الجامعة: ما يحتاجه الوكلاء فعلًا من بناء أحمر</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation">التحقّق بعد الدمج وبعد النشر</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">حلقات التحقّق الليلية</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-write-the-ci-workflow-from-scratch">مختبر: كتابة سير عمل CI من الصفر</a></li>
</ul>
`,l={book:e,chapter:n,chapterTitle:s,slug:t,title:o,headings:i,html:a};export{e as book,n as chapter,s as chapterTitle,l as default,i as headings,a as html,t as slug,o as title};
