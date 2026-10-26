const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="visual-regression-as-a-feedback-loop",e="الانحدار البصري كحلقة تغذية راجعة",p=[{depth:2,id:"لماذا-يفوت-تأطير-ci-وحده-الفكرة",text:"لماذا يفوّت تأطير CI وحده الفكرة"},{depth:2,id:"الأداة-المدمجة-في-playwright-tohavescreenshot",text:"الأداة المدمجة في Playwright: toHaveScreenshot"},{depth:2,id:"جعل-اختبارات-لقطات-الشاشة-موثوقة",text:"جعل اختبارات لقطات الشاشة موثوقة"},{depth:2,id:"لقطات-على-مستوى-المكون-مقابل-لقطات-على-مستوى-الصفحة",text:"لقطات على مستوى المكوّن مقابل لقطات على مستوى الصفحة"},{depth:2,id:"chromatic-وpercy-والأدوات-السحابية",text:"Chromatic وPercy والأدوات السحابية"},{depth:2,id:"تغذية-الفروق-إلى-الوكيل",text:"تغذية الفروق إلى الوكيل"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>أمضيت سنوات أعتبر فيها اختبار الانحدار البصري شأنًا يخصّ CI وحده. تُودِع لقطة شاشة، ثم يقارنها CI باللقطة في التشغيل التالي، ويفشل البناء إن وُجد اختلاف. ميزة لطيفة إن توفّرت، ومزعجة بعض الشيء في صيانتها، فتتجاهلها إن كان وقتك ضيقًا.</p>
<p>ثم بدأت أستخدم الوكلاء بجدّية، فانقلب الأمر رأسًا على عقب. لم يعد الانحدار البصري بالنسبة لي بوابة CI بالدرجة الأولى. بل صار أضيق حلقة تغذية راجعة أملكها لأخبر الوكيل أن تغييره <em>يبدو</em> خاطئًا بطرق لن يلتقطها أي تأكيد.</p>
<p>دعني أشرح إعادة التأطير هذه، ثم ننظر في كيفية ربطها فعليًا.</p>
<h2 id="لماذا-يفوت-تأطير-ci-وحده-الفكرة">لماذا يفوّت تأطير CI وحده الفكرة</h2>
<p>تسير رواية CI وحدها هكذا: أنت قلق من أن يغيّر أحدهم حشوة زرّ عن غير قصد، أو يقلب لونًا، أو يكسر تخطيطًا، ولن يلتقط ذلك أي اختبار آخر. يلتقطه الانحدار البصري بلقطة شاشة يقارنها بالأساس المُودَع.</p>
<p>هذا صحيح، ولا بأس به. لكن إن كان هذا تأطيرك الوحيد، فأنت تعامل الانحدار البصري كتأمين—تدفع ثمنه مرة واحدة، وتأمل ألّا تحتاجه أبدًا، وتتذمّر عندما يحتاج أساسٌ إلى تحديث.</p>
<p>تأطير الوكيل مختلف. عندما يلمس وكيل واجهة المستخدم، يوجد نوعان من «الخطأ». الأول خطأ في السلوك: زرّ لا يُرسل، أو نموذج لا يتحقّق، أو رابط يقود إلى المكان الخطأ. تلتقط اختبارات Playwright هذه الأخطاء. والثاني خطأ في المظهر: الزرّ موجود ويُرسل فعلًا، لكنه أطول بثلاثة بكسلات مما كان فأصبحت البطاقة تفيض، أو صار النص أبيض على أبيض بسبب مشكلة في التتالي. لا شيء في مجموعة اختباراتك يلتقط ذلك، لأن لا اختبار يؤكّد على المظهر البصري.</p>
<p>إلى أن تضيف فرق لقطة شاشة.</p>
<p>الآن صار لدى الوكيل إشارة. «لقد غيّرت مكوّن الزر. لقطة شاشة صفحة Shelf مختلفة. هذا هو الفرق. هل كان ذلك مقصودًا؟» في معظم الأحيان يكون الجواب «لا، أصلحه من فضلك». وأحيانًا يكون «نعم، حدّث الأساس». في الحالتين، يعرف الوكيل أن شيئًا قد حدث لن تشير إليه أي اختبارات وظيفية.</p>
<p>وهنا الجزء الذي لم أتوقّعه: <strong>الفرق مقروء بالنسبة للوكيل.</strong> يمكنك تمرير فرق انحدار بصري إلى وكيل يستطيع قراءة الصور، وسيخبرك بلغة واضحة بما تغيّر. «الزر في أعلى اليمين أصبح أطول ولم يعد محاذيًا لشريط البحث.» هذه تغذية راجعة حقيقية قابلة للتنفيذ يمكن للوكيل أن يتصرف بناءً عليها دون وجود إنسان في الحلقة.</p>
<h2 id="الأداة-المدمجة-في-playwright-tohavescreenshot">الأداة المدمجة في Playwright: <code>toHaveScreenshot</code></h2>
<p>يملك Playwright تأكيدًا على لقطات الشاشة يكفي لبناء مجموعة انحدار بصري حقيقية عليه. ليس بلمعان <a href="https://www.chromatic.com/">Chromatic</a> أو <a href="https://www.browserstack.com/percy">Percy</a>، لكنه مجاني، ويعمل محليًا، ويُودِع اللقطات في git إلى جانب الشيفرة، ويفعل بالضبط ما نحتاجه لحلقة التغذية الراجعة أثناء التطوير.</p>
<p><a href="https://playwright.dev/docs/test-snapshots">أداة <code>toHaveScreenshot</code> في Playwright</a> هي الأداة التي سنستخدمها لكل الانحدار البصري في هذه الورشة.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;shelf page matches visual baseline&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;shelf-page.png&#x27;</span>);
});
</code></pre>
<p>بعد أن تنتهي من المختبر المرافق، سيشغّل Shelf اختبارات بصرية موثّقة داخل مشروع Playwright نفسه المسمّى <code>authenticated</code> الذي تستخدمه بقية المجموعة، مع <code>beforeEach</code> ينادي <code>resetShelfContent</code> كي يبدأ كل فرق من حالة رفّ مزروعة واحدة. إن كان لمشروعك سبب لفصل القراءات البصرية عن الاختبارات الكثيفة الكتابة (مثلًا لأن المجموعتين تتسابقان على بيانات المستخدم نفسه)، فيمكنك توجيه مشروع Playwright ثانٍ إلى ملف حالة تخزين مختلف، لكن لا تلجأ إلى هذا التعقيد قبل أن يفرضه تعارض ملموس.</p>
<p>في التشغيل الأول: يأخذ Playwright لقطة شاشة ويكتبها تحت <code>tests/visual-authenticated.spec.ts-snapshots/</code>. يحمل اسم الملف افتراضيًا لاحقة المشروع والمنصّة أيضًا (مثلًا <code>shelf-page-authenticated-darwin.png</code>)، لأن <code>snapshotPathTemplate</code> الافتراضي في Playwright يضيف <code>{-projectName}{-snapshotSuffix}</code> إلى الوسيط الذي مرّرته. يمكنك الإبقاء على تلك اللاحقة أو تجاوز القالب في <code>playwright.config.ts</code> إن أردت اسم ملف أقصر. يبقى مجلد اللقطات مسمّى باسم ملف الاختبار، لذا فإن ملفًا مختلفًا باسم <code>&lt;test-file&gt;.spec.ts</code> سينتج مجلد <code>&lt;test-file&gt;.spec.ts-snapshots/</code> مختلفًا. الاختبار «ينجح» لعدم وجود ما يُقارن به.</p>
<p>في كل تشغيل لاحق: يأخذ Playwright لقطة جديدة ويقارنها بالأساس المُودَع. إن تطابقتا بكسلًا ببكسل (مع هامش تفاوت صغير)، ينجح الاختبار. وإن لم تتطابقا، يفشل الاختبار، ويكتب Playwright ثلاثة ملفات في مجلد التقارير: الأساس، والفعلي، وصورة فرق تُبرز البكسلات المتغيّرة.</p>
<p>أنت تُودِع الأساس في git. وعندما تُجري تغييرًا بصريًا مقصودًا، تعيد توليد الأساس (<code>--update-snapshots</code>) في الالتزام نفسه. يرى المراجعون الأساس القديم يُستبدل بالأساس الجديد في الفرق، ويستطيعون الحكم بالنظر إن كان التغيير مقصودًا.</p>
<p>بعد إكمال المختبر المرافق، سيصبح لدى Shelf الملف <code>tests/visual-authenticated.spec.ts</code> مستخدمًا <code>expect.toHaveScreenshot(...)</code>، مع الأساسات المُودَعة تحت <code>tests/visual-authenticated.spec.ts-snapshots/</code>. الطريق المعتاد عبر الحلقة هو <code>npm run test</code>، والطريق المركّز هو <code>npm run test -- --grep visual</code>، ومسار تحديث الأساس المقصود هو <code>npm run test -- --update-snapshots</code>.</p>
<h2 id="جعل-اختبارات-لقطات-الشاشة-موثوقة">جعل اختبارات لقطات الشاشة موثوقة</h2>
<p>الشكوى الأكثر شيوعًا بشأن الانحدار البصري هي «الأساسات دائمًا متقلّبة». وهذا قابل للإصلاح في كل الحالات تقريبًا. ينبع التقلّب في لقطات الشاشة من مصادر محدّدة قليلة، ولكل واحد منها مِقبض محدّد.</p>
<p><strong>اختلافات رسم الخطوط.</strong> الخط نفسه، ونظام تشغيل مختلف، وتنعيم حواف مختلف. تختبر على جهاز Mac، وتُودِع الأساس، ثم ينتج CI (على Linux) نصًا مختلفًا اختلافًا دقيقًا. الإصلاح هو تشغيل اللقطات في بيئة متّسقة. استخدم صورة Docker الخاصة بـ Playwright في كل مكان، أو شغّل اختبارات اللقطات على CI فقط بصورة Linux مثبّتة. تفضيلي: إجراء التشغيلين في Docker حتى يطابق الأساس على حاسوبك الأساس على CI.</p>
<p><strong>الحركات والانتقالات.</strong> زرّ بحركة عند التحويم، أو مؤشّر تحميل دوّار، أو انتقال بتلاشٍ تدريجي—أي شيء يتحرّك سيصنع لقطة متقلّبة. يدعم <code>toHaveScreenshot</code> في Playwright الخيار <code>animations: 'disabled'</code> في الإعداد، وهو يحقن CSS يعطّل الحركات. استخدمه.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// playwright.config.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">expect</span>: {
    <span class="hljs-attr">toHaveScreenshot</span>: {
      <span class="hljs-attr">animations</span>: <span class="hljs-string">&#x27;disabled&#x27;</span>,
      <span class="hljs-attr">caret</span>: <span class="hljs-string">&#x27;hide&#x27;</span>,
      <span class="hljs-attr">scale</span>: <span class="hljs-string">&#x27;css&#x27;</span>,
      <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
    },
  },
});
</code></pre>
<p><code>animations: 'disabled'</code> يُنهي انتقالات CSS. و<code>caret: 'hide'</code> يخفي مؤشّر الكتابة الوامض في الحقول (وهو يتغيّر كل نصف ثانية ويُفسد اللقطات). و<code>scale: 'css'</code> يضمن أن تستخدم اللقطة بكسلات CSS بصرف النظر عن كثافة بكسلات الجهاز.</p>
<p><strong>المحتوى الديناميكي.</strong> طابع زمني يقول «قبل دقيقتين» سيصبح «قبل ثلاث دقائق» في التشغيل التالي. صورة رمزية يولّدها المستخدم، أو اقتباس عشوائي لليوم، أو تاريخ ظاهر—أي من هذه سيكسر الفرق. أمامك خياران: محاكاة المحتوى الديناميكي (مثلًا تثبيت <code>page.clock</code> وضبط وقت ثابت، أو زرع قاعدة البيانات بمحتوى ثابت)، أو حجب المناطق الديناميكية بخيار <code>mask</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;shelf-page.png&#x27;</span>, {
  <span class="hljs-attr">mask</span>: [page.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;current-time&#x27;</span>), page.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;user-avatar&#x27;</span>)],
});
</code></pre>
<p>تُطلَى المناطق المحجوبة بلون صلب في الأساس والفعلي معًا، لذا لا تؤثر في الفرق أبدًا.</p>
<p>من المقابض قليلة الاستخدام في <a href="https://playwright.dev/docs/api/class-pageassertions">واجهة تأكيدات الصفحة</a> اثنان: <code>maskColor</code> و<code>stylePath</code>.</p>
<ul>
<li><code>maskColor</code> يغيّر لون الحجب الوردي الصارخ الافتراضي إلى لون أقل تشتيتًا في الفروق.</li>
<li><code>stylePath</code> يطبّق ورقة أنماط مؤقتة أثناء التقاط اللقطة فقط. استخدمه لإنهاء حركات النبض، أو إخفاء شارة متقلّبة، أو تحييد تضمين مزعج دون تغيير التطبيق نفسه.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;shelf-page.png&#x27;</span>, {
  <span class="hljs-attr">mask</span>: [page.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;current-time&#x27;</span>), page.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;user-avatar&#x27;</span>)],
  <span class="hljs-attr">maskColor</span>: <span class="hljs-string">&#x27;#1f2937&#x27;</span>,
  <span class="hljs-attr">stylePath</span>: <span class="hljs-string">&#x27;tests/fixtures/visual-stabilize.css&#x27;</span>,
});
</code></pre>
<p>الجزء الخفي النافع هو <code>stylePath</code>. يطبّق Playwright تلك الورقة عبر Shadow DOM والإطارات الداخلية أيضًا، وهو بالضبط نوع الغش المنضبط الذي تحتاجه اختبارات اللقطات أحيانًا. إن نزلت إلى <code>page.screenshot()</code> بدلًا من <code>toHaveScreenshot()</code>، فالنسخة الأدنى من ذلك المِقبض هي <code>style</code> المضمّنة بدلًا من <code>stylePath</code>.</p>
<p><strong>أشرطة التمرير.</strong> تختلف باختلاف نظام التشغيل. تتجاهلها لقطات Playwright افتراضيًا في معظم الإعدادات، لكن تحقّق مرتين إن كان تخطيطك يتضمّن مناطق قابلة للتمرير.</p>
<p>أصلح هذه الأمور الأربعة، تصبح اختبارات اللقطات مملّة وموثوقة. تجاهلها، تصبح أكثر اختبارات مجموعتك تقلّبًا. لا يوجد حلّ وسط.</p>
<h2 id="لقطات-على-مستوى-المكون-مقابل-لقطات-على-مستوى-الصفحة">لقطات على مستوى المكوّن مقابل لقطات على مستوى الصفحة</h2>
<p>اللقطات على مستوى الصفحة هي ما عرضته أعلاه: <code>expect(page).toHaveScreenshot</code>. وهي ما تريده لالتقاط انحدارات التخطيط والتغييرات البصرية الكبيرة.</p>
<p>اللقطات على مستوى المكوّن هي ما تريده لالتقاط انحراف نظام التصميم. إن كان لديك مكوّن <code>&lt;Button&gt;</code> يُستخدم في كل مكان، فخذ لقطة له في كل حالة (الافتراضية، والتحويم، والتعطيل، والتحميل) وأكّد عليها. الآن إن غيّر أحدهم أنماط الزر الأساسية، تفشل لقطات المكوّن <em>قبل</em> أن تسنح لأي لقطة صفحة فرصة الفشل، ويكون الفشل أكثر تحديدًا بكثير.</p>
<p>يتيح لك اختبار المكوّنات في Playwright فعل ذلك، لكن بصراحة، النمط الأبسط في SvelteKit هو أن يكون لديك مسار <code>/design-system</code> (أو <a href="https://storybook.js.org/">Storybook</a> إن كنت تستخدمه بالفعل) يعرض كل مكوّن في كل حالة، ثم تأخذ لقطة صفحة <em>له</em>. إنه أقل سحرًا ويستخدم الأدوات نفسها التي تستخدمها بقية مجموعة اختباراتك من طرف إلى طرف.</p>
<p>سيأتي Shelf بمسار <code>/design-system</code> لهذا الغرض تحديدًا. اختبار لقطة واحد يغطّيه. نظام التصميم كله تحت الانحدار البصري بسطر شيفرة واحد.</p>
<h2 id="chromatic-وpercy-والأدوات-السحابية">Chromatic وPercy والأدوات السحابية</h2>
<p>اللقطات المدمجة رائعة لحلقة التطوير. لكنها أكثر محدودية من الأدوات السحابية في أمرين:</p>
<ul>
<li><strong>مصفوفة المتصفحات المتعددة.</strong> يشغّل Chromatic لقطاتك عبر Chrome وSafari وFirefox وعدد من أحجام العرض بالتوازي. يستطيع Playwright فعل ذلك أيضًا، لكن كل متصفح مشروع منفصل والتنسيق عليك.</li>
<li><strong>سير عمل المراجعة.</strong> واجهة Chromatic على الويب لمراجعة الفروق البصرية (الموافقة، والرفض، ومقارنة الفروع) أفضل بكثير من التحديق في ملفات PNG داخل طلب سحب. لفريق يشحن تغييرات بصرية كثيرًا، تجربة المراجعة تستحق الثمن.</li>
</ul>
<p>توصيتي: ابدأ بالمدمج. إن وجدت فريقك يغرق في مراجعة الفروق يدويًا، أو احتجت تغطية متعددة المتصفحات، فأضف Chromatic فوقه. لا تمدّ يدك إلى الأداة السحابية أولًا لمجرد أنها أكثر لمعانًا. اللقطات المدمجة تمنح الوكيل التغذية الراجعة التي يحتاجها أثناء التطوير، وهذه هي المشكلة الأصعب.</p>
<h2 id="تغذية-الفروق-إلى-الوكيل">تغذية الفروق إلى الوكيل</h2>
<p>وهنا الجزء الذي كان جديدًا عليّ.</p>
<p>عندما يفشل اختبار لقطة، يتضمّن تقرير الفشل صورة الفرق. يستطيع Claude Code ووكلاء آخرون يستطيعون قراءة الصور استخدام ذلك الفرق مباشرة.</p>
<p>لكن ثمة تصحيح مهم: هذا <strong>ليس</strong> خطّاف Git.</p>
<p>خطّافات Git مثل تلك الموجودة في <a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خطّافات Git مع Lefthook</a> تعمل عند الالتزام أو الدفع. وهي جيدة لإجبار اختبار اللقطة على العمل قبل أن يغادر الكود جهازك. لكنها ليست المكان المناسب لإثراء دورة الوكيل التالية بالأثر الفاشل.</p>
<p>إن أردت أن يتفاعل الوكيل فورًا بعد فشل اختبار اللقطة، فالتجريد الصحيح هو <strong>خطّاف وكيل</strong>:</p>
<ul>
<li>في Claude Code، <a href="https://code.claude.com/docs/en/hooks">خطّاف <code>PostToolUseFailure</code></a></li>
<li>في Codex، <a href="https://developers.openai.com/codex/hooks">خطّاف Bash من نوع <code>PostToolUse</code> أو <code>PreToolUse</code></a></li>
</ul>
<p>حتى <strong>14 أبريل 2026</strong>، ما تزال خطّافات Codex مصنّفة تجريبية، وما يزال اعتراض Bash فيها جزئيًا، لذا يستخدم المثال الملموس أدناه Claude Code. والفكرة نفسها تنتقل: افحص أمر الاختبار الفاشل، واعثر على أحدث فرق لقطة على القرص، ثم أعِد ذلك المسار إلى حلقة الوكيل.</p>
<p>كذلك: الخطّاف لا يرفع بايتات PNG حرفيًا إلى سياق النموذج. واجهات الخطّافات الموثّقة تضيف <strong>سياقًا نصيًا</strong>. عمليًا، هذا يعني أن على الخطّاف أن يخبر الوكيل بالضبط أي ملف فرق يفتحه تاليًا.</p>
<p>إليك خطّاف Claude Code أدنى يفعل ذلك:</p>
<pre><code class="language-json"><span class="hljs-comment">// .claude/settings.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;PostToolUseFailure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;matcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Bash&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;command&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node \\&quot;$CLAUDE_PROJECT_DIR/.claude/hooks/visual-diff-feedback.mjs\\&quot;&quot;</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// .claude/hooks/visual-diff-feedback.mjs</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">const</span> input = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(fs.<span class="hljs-title function_">readFileSync</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>));
<span class="hljs-keyword">const</span> command = input.<span class="hljs-property">tool_input</span>?.<span class="hljs-property">command</span> ?? <span class="hljs-string">&#x27;&#x27;</span>;
<span class="hljs-keyword">const</span> cwd = input.<span class="hljs-property">cwd</span> ?? process.<span class="hljs-title function_">cwd</span>();

<span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/(playwright|npm run test|pnpm test|bun test)/</span>.<span class="hljs-title function_">test</span>(command)) {
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-keyword">const</span> matches = [];

<span class="hljs-keyword">const</span> <span class="hljs-title function_">walk</span> = (<span class="hljs-params">dir</span>) =&gt; {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> fs.<span class="hljs-title function_">readdirSync</span>(dir, { <span class="hljs-attr">withFileTypes</span>: <span class="hljs-literal">true</span> })) {
    <span class="hljs-keyword">const</span> fullPath = path.<span class="hljs-title function_">join</span>(dir, entry.<span class="hljs-property">name</span>);

    <span class="hljs-keyword">if</span> (entry.<span class="hljs-title function_">isDirectory</span>()) {
      <span class="hljs-title function_">walk</span>(fullPath);
      <span class="hljs-keyword">continue</span>;
    }

    <span class="hljs-keyword">if</span> (!entry.<span class="hljs-title function_">isFile</span>()) <span class="hljs-keyword">continue</span>;

    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(^|[-/])(diff|.*-diff)\\.png$/i</span>.<span class="hljs-title function_">test</span>(entry.<span class="hljs-property">name</span>)) {
      matches.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">file</span>: fullPath,
        <span class="hljs-attr">mtimeMs</span>: fs.<span class="hljs-title function_">statSync</span>(fullPath).<span class="hljs-property">mtimeMs</span>,
      });
    }
  }
};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> root <span class="hljs-keyword">of</span> [<span class="hljs-string">&#x27;playwright-report&#x27;</span>, <span class="hljs-string">&#x27;test-results&#x27;</span>]) {
  <span class="hljs-keyword">const</span> fullRoot = path.<span class="hljs-title function_">join</span>(cwd, root);
  <span class="hljs-keyword">if</span> (fs.<span class="hljs-title function_">existsSync</span>(fullRoot)) <span class="hljs-title function_">walk</span>(fullRoot);
}

<span class="hljs-keyword">if</span> (matches.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-keyword">const</span> latest = matches.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">mtimeMs</span> - a.<span class="hljs-property">mtimeMs</span>)[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> relativePath = path.<span class="hljs-title function_">relative</span>(cwd, latest.<span class="hljs-property">file</span>);

process.<span class="hljs-property">stdout</span>.<span class="hljs-title function_">write</span>(
  <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
    <span class="hljs-attr">decision</span>: <span class="hljs-string">&#x27;block&#x27;</span>,
    <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;Playwright screenshot diff detected. Review the diff before changing the baseline.&#x27;</span>,
    <span class="hljs-attr">hookSpecificOutput</span>: {
      <span class="hljs-attr">hookEventName</span>: <span class="hljs-string">&#x27;PostToolUseFailure&#x27;</span>,
      <span class="hljs-attr">additionalContext</span>: [
        <span class="hljs-string">\`A screenshot diff was written to <span class="hljs-subst">\${relativePath}</span>.\`</span>,
        <span class="hljs-string">&#x27;Open that image before touching the snapshot.&#x27;</span>,
        <span class="hljs-string">&#x27;If the UI change was intentional, update the baseline deliberately.&#x27;</span>,
        <span class="hljs-string">&#x27;If it was not intentional, fix the UI and rerun the test.&#x27;</span>,
      ].<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27; &#x27;</span>),
    },
  }),
);
</code></pre>
<p>ما يمنحك إياه هذا الخطّاف بسيط:</p>
<ul>
<li>اختبار اللقطة الفاشل يبقى مصدر الحقيقة</li>
<li>يحوّل الخطّاف «يوجد فرق في مكان ما داخل <code>playwright-report/</code>» إلى «افتح هذا الملف تحديدًا تاليًا»</li>
<li>يحصل الوكيل على الخطوة التالية كتغذية راجعة منظمة بدلًا من الارتجال انطلاقًا من سطر اختبار أحمر</li>
</ul>
<p>سيقول الوكيل أشياء مثل: «زر «Rate» أصبح أطول بـ4 بكسلات لأن مكوّن الأيقونة الجديد يحمل حشوة إضافية. مكوّن <code>ShelfCard</code> أصبح يفيض الآن. إمّا أن تقلّل الحشوة أو أن تزيد ارتفاع البطاقة.» هذا هو الفرق مقروءًا باللغة الطبيعية، كتوجيه للتعديل التالي.</p>
<p>هذا هو الوكيل يصحّح نفسه بناءً على تغذية راجعة بصرية. لم يكن هذا بعيدًا جدًا من الخيال العلمي. والآن صار خطّافًا صغيرًا في بيئة تشغيل وكيلك.</p>
<p>وثمة سؤال تالٍ طبيعي بعد «هل تغيّرت الواجهة بصريًا؟»: «هل جعل التغيير نفسه التطبيق أبطأ أو أثقل؟» لا تجيب فروق اللقطات عن ذلك. أما <a href="https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop">ميزانيات الأداء كحلقة تغذية راجعة</a> فتفعل.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Visual regression</span>

<span class="hljs-bullet">-</span> Page screenshots live in <span class="hljs-code">\`tests/visual.spec.ts\`</span> and use
  <span class="hljs-code">\`expect(page).toHaveScreenshot(name)\`</span>. Baselines are committed.
<span class="hljs-bullet">-</span> Before regenerating a baseline, check that the change is intentional.
  Do not update baselines to &quot;make the test pass.&quot;
<span class="hljs-bullet">-</span> When a screenshot test fails, read the diff image in
  <span class="hljs-code">\`playwright-report/\`</span> before proposing a fix.
<span class="hljs-bullet">-</span> Dynamic regions (timestamps, user-generated content, loading
  indicators) must be masked via the <span class="hljs-code">\`mask\`</span> option or mocked via seed
  data. Do not disable the screenshot test to work around flakiness.
<span class="hljs-bullet">-</span> Animations are disabled globally via <span class="hljs-code">\`playwright.config.ts\`</span>. Do not
  re-enable them per test.
</code></pre>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>الانحدار البصري ليس تأمينًا. إنه قناة تواصل بينك (أو بين وكيلك) وبين الواجهة. كل لقطة فاشلة هي الواجهة تخبرك: «شيء ما تغيّر لم تلاحظه أي من اختباراتك الأخرى.» وبالنسبة للوكيل، إنها حلقة التغذية الراجعة الوحيدة التي تفحص <em>المظهر</em>، وتبيّن أن هذا هو بالضبط صنف الأخطاء الذي يُدخله الوكلاء في أغلب الأحيان.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop">ميزانيات الأداء كحلقة تغذية راجعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-visual-regression-into-the-dev-loop">مختبر: ربط الانحدار البصري بحلقة التطوير</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,t as slug,e as title};
