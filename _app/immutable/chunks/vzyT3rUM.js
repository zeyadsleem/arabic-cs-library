const e="kinney",o="self-testing-ai-agents",t="وكلاء ذكاء اصطناعي يختبرون أنفسهم",d="lab-wire-the-static-layer-into-shelf",c="مختبر",n=[{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"ما-يمكنك-التحقق-منه-محليا",text:"ما يمكنك التحقّق منه محليًا"},{depth:2,id:"ما-يبقى-يدويا-أو-خارجيا",text:"ما يبقى يدويًا أو خارجيًا"},{depth:2,id:"الجزء-الأول-قواعد-eslint-المخصصة",text:"الجزء الأول: قواعد ESLint المخصّصة"},{depth:3,id:"معايير-قبول-الجزء-الأول",text:"معايير قبول الجزء الأول"},{depth:2,id:"الجزء-الثاني-الوضع-الصارم-في-typescript",text:"الجزء الثاني: الوضع الصارم في TypeScript"},{depth:3,id:"معايير-قبول-الجزء-الثاني",text:"معايير قبول الجزء الثاني"},{depth:2,id:"الجزء-الثالث-كشف-الشيفرة-الميتة",text:"الجزء الثالث: كشف الشيفرة الميتة"},{depth:3,id:"معايير-قبول-الجزء-الثالث",text:"معايير قبول الجزء الثالث"},{depth:2,id:"الجزء-الرابع-lefthook",text:"الجزء الرابع: Lefthook"},{depth:3,id:"معايير-قبول-الجزء-الرابع",text:"معايير قبول الجزء الرابع"},{depth:2,id:"الجزء-الخامس-فحص-الأسرار",text:"الجزء الخامس: فحص الأسرار"},{depth:3,id:"معايير-قبول-الجزء-الخامس",text:"معايير قبول الجزء الخامس"},{depth:2,id:"الجزء-السادس-تحديث-claudemd",text:"الجزء السادس: تحديث CLAUDE.md"},{depth:3,id:"معايير-قبول-الجزء-السادس",text:"معايير قبول الجزء السادس"},{depth:2,id:"التحقق-من-طرف-إلى-طرف",text:"التحقق من طرف إلى طرف"},{depth:2,id:"معايير-القبول-النهائية",text:"معايير القبول النهائية"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],i=`<p>أطول مختبرات اليوم. متعدّد الأجزاء. وزّع وتيرتك—كل جزء فحص مكتفٍ بذاته، ويمكنك التوقف بين الأجزاء إن احتجت.</p>
<blockquote>
<p><strong>في النسخة الأولية الحالية</strong></p>
<p>صار Shelf يبدأ أصغر عن قصد. فالنسخة الأولية تحتوي بالفعل على ESLint وTypeScript وحلقة Playwright الدنيا، لكنها <strong>لا</strong> تشحن <code>knip.json</code> ولا <code>lefthook.yml</code> ولا <code>.gitleaks.toml</code> ولا <code>scripts/run-gitleaks-staged.ts</code>. هذا المختبر هو حيث تضيف تلك الملفات ثم تتحقّق من كل واحد منها مقابل مدخل سيئ مزروع.</p>
</blockquote>
<h2 id="المهمة">المهمة</h2>
<p>ابنِ الطبقة الثابتة الكاملة لـ Shelf وتحقّق من أن كل قطعة تنطلق عند مدخل سيئ مزروع. ولكل جزء: أضف الملف أو وسّعه، ثم أعد قراءة القاعدة التي أنشأتها للتو، ثم أشعل المجسّ وراقبه يلتقط.</p>
<h2 id="ما-يمكنك-التحقق-منه-محليا">ما يمكنك التحقّق منه محليًا</h2>
<p>كل شيء في الأجزاء من الأول إلى الخامس محلي وآلي: وسّع <code>eslint.config.js</code> و<code>tsconfig.json</code>، وأنشئ <code>knip.json</code> و<code>lefthook.yml</code> و<code>.gitleaks.toml</code> و<code>scripts/run-gitleaks-staged.ts</code>، وشغّل <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run knip</code> و<code>npm run test</code> و<code>npm run pre-push</code>، وازرع مدخلًا سيئًا واحدًا في كل مرة، ثم راقب الطبقة الصحيحة تفشل. والجزء السادس محلي أيضًا إن كنت تحدّث <code>CLAUDE.md</code> الخاص بك أو ملف إرشادات Codex.</p>
<h2 id="ما-يبقى-يدويا-أو-خارجيا">ما يبقى يدويًا أو خارجيًا</h2>
<p>الجزء غير الآلي الوحيد هو الحكم على سلوك الوكيل في النهاية. فالمطالبة الأخيرة موجودة لاختبار ما إن كانت الإرشادات والطبقة الثابتة قوية بما يكفي ليقرأ الوكيل الخطأ ويصلح الشيفرة ويعيد تشغيل الفحوص دون تدريب. وإن قرّرت فتح طلب سحب بعد ذلك، فاعتبره متابعة مستضافة اختيارية، لا شرطًا لإكمال المختبر محليًا.</p>
<h2 id="الجزء-الأول-قواعد-eslint-المخصصة">الجزء الأول: قواعد ESLint المخصّصة</h2>
<p>افتح <code>eslint.config.js</code>. وابحث عن كتلة <code>no-restricted-syntax</code>. إنها تحظر أربعة أنماط:</p>
<ul>
<li><code>page.waitForTimeout</code> (في أي مكان داخل <code>tests/end-to-end/</code>). المحدِّد: <code>CallExpression[callee.property.name='waitForTimeout']</code>. الرسالة: <code>&quot;page.waitForTimeout is banned. See CLAUDE.md → Playwright → Waiting.&quot;</code></li>
<li><code>page.locator</code> المستدعاة بوسيط نصي (في أي مكان داخل <code>tests/end-to-end/</code>). المحدِّد: <code>CallExpression[callee.property.name='locator'][arguments.0.type='Literal']</code>. الرسالة: <code>&quot;Use a getByRole/getByLabel locator. See CLAUDE.md → Playwright → Locators.&quot;</code></li>
<li><code>page.waitForLoadState('networkidle')</code> (في أي مكان). المحدِّد: <code>CallExpression[callee.property.name='waitForLoadState'] Literal[value='networkidle']</code>. الرسالة: <code>&quot;networkidle is unreliable. Wait on a real signal.&quot;</code></li>
<li>قراءة <code>userId</code> من جسم الطلب في معالج مسار. المحدِّد: <code>MemberExpression[object.type='MemberExpression'][object.property.name='body'][property.name='userId']</code>. الرسالة: <code>&quot;Read userId from the session, not the request body. See CLAUDE.md → Auth.&quot;</code></li>
</ul>
<p>لكل قاعدة <code>selector</code> و<code>message</code>. ونصوص الرسائل تؤدّي دورًا حاسمًا — فهي تسمّي الملف والقسم والإصلاح. وذلك هو الفرق بين خطأ lint يتجاهله الوكيل وخطأ lint يقرأه الوكيل ويتصرّف بناءً عليه.</p>
<p>قسم <strong>كتابة قاعدة <code>no-restricted-syntax</code></strong> في درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails">Lint والأنواع كحواجز حماية</a> يشرح كل واحد من هذه المحدّدات الأربعة لشجرة النحو المجرّدة (AST) شرحًا نثريًا مفصّلًا. اقرأه إلى جانب الملف الذي تبنيه هنا كي تفهم <em>لماذا</em> تستخدم قاعدة <code>body.userId</code> مطابقة <code>MemberExpression</code> متداخلة بدلًا من اسم خاصية فقط، ولماذا تستخدم قاعدة <code>networkidle</code> مُركِّب السليل.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>في مستودع ورشة Shelf، <code>npm</code> هو مصدر الحقيقة. فإن كان مشروعك يستخدم Bun، فأعد صياغة الأوامر إلى <code>bun</code> كما يليق. المهم أن تكون الفحوص سكربتات حقيقية مسمّاة يُلزَم الوكيل بتشغيلها.</p>
</blockquote>
<h3 id="معايير-قبول-الجزء-الأول">معايير قبول الجزء الأول</h3>
<ul>
<li>أن يحتوي <code>eslint.config.js</code> على قواعد النحو المقيّد الأربع أعلاه (محدِّد + رسالة).</li>
<li>أن ينتهي <code>npm run lint</code> على مستودع Shelf الحالي (النظيف) بالرمز صفر.</li>
<li>أن يجعل إضافة سطر <code>page.waitForTimeout(1000)</code> إلى أي ملف تحت <code>tests/end-to-end/</code> الأمرَ <code>npm run lint</code> ينتهي برمز غير صفري، وأن يحتوي الناتج على السلسلة الفرعية <code>page.waitForTimeout is banned</code>.</li>
<li>أن يجعل إضافة سطر <code>page.locator('.foo')</code> إلى أي ملف تحت <code>tests/end-to-end/</code> الأمرَ <code>npm run lint</code> ينتهي برمز غير صفري، وأن يحتوي الناتج على السلسلة الفرعية <code>Use a getByRole/getByLabel locator</code>.</li>
<li>أن يعيد التراجع عن تغييرات الاختبار نظافة lint (<code>npm run lint</code> ينتهي بالرمز صفر).</li>
</ul>
<h2 id="الجزء-الثاني-الوضع-الصارم-في-typescript">الجزء الثاني: الوضع الصارم في TypeScript</h2>
<p>افتح <code>tsconfig.json</code>. وابحث عن كل راية صرامة من الدرس—<code>strict: true</code>، و<code>noUncheckedIndexedAccess</code>، و<code>exactOptionalPropertyTypes</code>، و<code>noUnusedLocals</code>، و<code>noUnusedParameters</code>، و<code>noImplicitReturns</code>، و<code>noFallthroughCasesInSwitch</code>. كلها موجودة هناك. اقرأ كل واحدة وتأكّد أنك تستطيع أن تشرح في جملة واحدة أي صنف من الأخطاء تلتقطه، وأي صنف كان <code>strict: true</code> وحده سيفوته.</p>
<h3 id="معايير-قبول-الجزء-الثاني">معايير قبول الجزء الثاني</h3>
<ul>
<li><code>tsconfig.json</code> يحوي <code>strict: true</code>.</li>
<li><code>tsconfig.json</code> يفعّل صراحةً <code>noUncheckedIndexedAccess</code> و<code>exactOptionalPropertyTypes</code> و<code>noUnusedLocals</code> و<code>noUnusedParameters</code>.</li>
<li><code>npm run typecheck</code> ينتهي بالرمز صفر على شيفرة Shelf الحالية.</li>
<li>إضافة <code>const x: string = items[0]</code> (بلا حارس) إلى أي ملف تنتج خطأ في فحص الأنواع.</li>
</ul>
<h2 id="الجزء-الثالث-كشف-الشيفرة-الميتة">الجزء الثالث: كشف الشيفرة الميتة</h2>
<p>أنشئ <code>knip.json</code>. اضبط أنماط glob في <code>entry</code> و<code>project</code> كي يعرف knip أي الملفات تُعدّ جذورًا (صفحات SvelteKit والاختبارات والسكربتات) وأي الملفات داخل نطاق تحليل التصديرات غير المستخدمة. ثم شغّل <code>npm run knip</code> لتراه يبلّغ عن صفر نتائج على المستودع الحالي.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>في نسخة Shelf الأولية الحالية، يستطيع <code>drizzle.config.ts</code> أن يعود بالفعل إلى <code>file:./local.db</code>، فقد لا تحتاج إلى غلاف <code>DATABASE_URL=...</code> إضافي أصلًا. وإن كانت تهيئة مشروعك تنهار بدونه، فأضف عنوان قاعدة بيانات عابرًا في السكربت هناك. المقصود من المختبر هو حلقة الشيفرة الميتة، لا الألعاب البهلوانية مع متغيّرات البيئة.</p>
</blockquote>
<h3 id="معايير-قبول-الجزء-الثالث">معايير قبول الجزء الثالث</h3>
<ul>
<li><code>knip.json</code> موجود بأنماط <code>entry</code> و<code>project</code> معقولة.</li>
<li><code>npm run knip</code> ينتهي بالرمز صفر على مستودع Shelf الحالي.</li>
<li>إضافة ملف <code>.ts</code> غير مُشار إليه تحت <code>src/lib/</code> تجعل <code>npm run knip</code> يبلّغ عنه كغير مستخدم.</li>
<li>حذف الملف يعيد ناتج knip نظيفًا.</li>
<li>إن كان مستودعك ما يزال يحوي شجرة متقاعدة مثل <code>src/lib/legacy-auth/</code>، فهي متجاهلة صراحةً. وإن لم تحوِ نسختك المحلية من Shelf ذلك المجلد، فلا تخترعه لمجرد إرضاء المختبر.</li>
</ul>
<h2 id="الجزء-الرابع-lefthook">الجزء الرابع: Lefthook</h2>
<p>أنشئ <code>lefthook.yml</code>. وأضف كتلتي <code>pre-commit</code> و<code>pre-push</code>. ينبغي أن يشغّل pre-commit فحوصًا سريعة على <code>{staged_files}</code> مع <code>parallel: true</code> و<code>stage_fixed: true</code>، بينما يشغّل pre-push سكربت <code>npm run pre-push</code> الأبطأ قليلًا (الذي ينادي فحص الأنواع وknip واختبارات الوحدة) على الشجرة كلها. اقرأ درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خطّافات Git مع Lefthook</a> إن أردت المنطق وراء هذا التقسيم.</p>
<h3 id="معايير-قبول-الجزء-الرابع">معايير قبول الجزء الرابع</h3>
<ul>
<li><code>lefthook.yml</code> موجود في جذر المستودع.</li>
<li><code>pre-commit</code> يشغّل ESLint وPrettier وفحص أسرار على <code>{staged_files}</code>، وكلها معلّمة <code>parallel: true</code>، وأي ملفات صُحّحت تلقائيًا يُعاد ترحيلها عبر <code>stage_fixed: true</code>.</li>
<li><code>pre-push</code> يشغّل <code>npm run pre-push</code>، الذي يشغّل بدوره على الأقل <code>npm run typecheck</code> و<code>npm run knip</code>.</li>
<li>إجراء تغيير فيه خطأ lint ثم تشغيل <code>lefthook run pre-commit</code> يُجهض الالتزام مع ظهور خطأ lint.</li>
<li>المشكلات القابلة للتصحيح التلقائي (التنسيق) تُصحَّح وتُعاد مرحلتها تلقائيًا.</li>
</ul>
<h2 id="الجزء-الخامس-فحص-الأسرار">الجزء الخامس: فحص الأسرار</h2>
<p>أضف أمر <code>secrets</code> تحت <code>pre-commit</code> في <code>lefthook.yml</code> بحيث يستدعي <code>npx tsx scripts/run-gitleaks-staged.ts</code>. ثم أعد قراءة ذلك السكربت وتأكّد من أنه يجسّد الفهرس المرحّل في مجلد مؤقت قبل تشغيل <code>gitleaks dir</code>.</p>
<p>أنشئ ملف طُعم صغيرًا مثل <code>sample-config.json</code> أثناء المختبر كي يكون لديك إيجابية كاذبة غير ضارّة واحدة تُدرجها في قائمة السماح عن قصد. وفي نسخة Shelf الأولية الحالية، يُعدّ <code>tests/data/users.json</code> مرشّحًا آخر متعمّدًا لقائمة السماح، لأنه يخزّن بيانات اعتماد ورشة وهمية تعتمد عليها مختبرات الزرع.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>مع إصدار Gitleaks الحالي المستخدم في هذه الورشة، لم يكن <code>gitleaks git --staged</code> مُتحقِّقًا موثوقًا قبل الالتزام للملفات المضافة حديثًا. يعالج مستودع Shelf المحلي ذلك بتجسيد فهرس git الدقيق في مجلد مؤقت وتشغيل <code>gitleaks dir</code> هناك من <code>scripts/run-gitleaks-staged.ts</code>. وذلك الغلاف هو ما يستدعيه أمر <code>secrets</code> في lefthook.</p>
</blockquote>
<h3 id="معايير-قبول-الجزء-الخامس">معايير قبول الجزء الخامس</h3>
<ul>
<li><code>gitleaks version</code> يعمل على جهازك.</li>
<li><code>lefthook.yml</code> يحوي أمر <code>secrets</code> تحت <code>pre-commit</code> يستدعي <code>npx tsx scripts/run-gitleaks-staged.ts</code>.</li>
<li><code>.gitleaks.toml</code> يدرج <code>sample-config.json</code> و<code>tests/data/users.json</code> في قائمة السماح (أو <code>tests/data/</code> إن كنت تفضّل قاعدة على مستوى المجلد).</li>
<li>تشغيل سكربت اللقطة المرحّلة مباشرةً (<code>npx tsx scripts/run-gitleaks-staged.ts</code>) ينتهي بالرمز صفر لحالة الفهرس المرحّل النظيفة.</li>
<li>محاولة ترحيل ملف يحوي <code>BETTER_AUTH_SECRET=&quot;7Xse4XqnSo3hcT31Yb2vi7LMt6BYI93w.0EWmIcjHKAdde1SY5TEVqh5fPu6NvFBf&quot;</code> تُطلق الخطّاف وتحجب الالتزام.</li>
<li>يبقى ملف <code>sample-config.json</code> قابلًا للالتزام دون مشكلة (قائمة السماح تعمل).</li>
</ul>
<h2 id="الجزء-السادس-تحديث-claudemd">الجزء السادس: تحديث <code>CLAUDE.md</code></h2>
<p>أضف إلى <code>CLAUDE.md</code> أقسامًا تعكس كل طبقة ربطتها. على الأقل:</p>
<ul>
<li>قسم «الفحوص الثابتة» يسرد <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run knip</code> كأوامر إلزامية قبل إعلان الإنجاز.</li>
<li>في نسخة Shelf الأولية، «منجَز» لا تعني إلا <code>npm run typecheck</code> و<code>npm run lint</code> و<code>npm run test</code>. هذا المختبر هو حيث توسّع ذلك التعريف ليشمل <code>npm run knip</code> و<code>npm run pre-push</code>.</li>
<li>قواعد بشأن <code>@ts-expect-error</code> و<code>eslint-disable</code> و<code>--no-verify</code>.</li>
<li>قسم أسرار وفق درس gitleaks.</li>
<li>إحالة راجعة إلى قواعد Playwright (<a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحددات</a>، و<a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">الانتظار</a>، و<a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">المصادقة</a>) بحيث تُربط قواعد lint المخصّصة بمصدر الحقيقة نفسه.</li>
</ul>
<h3 id="معايير-قبول-الجزء-السادس">معايير قبول الجزء السادس</h3>
<ul>
<li><code>CLAUDE.md</code> يسرد كل أوامر الفحوص الثابتة تحت عنوان «ماذا يعني منجَز».</li>
<li><code>CLAUDE.md</code> يحظر صراحةً التجاوز عبر <code>@ts-expect-error</code> أو <code>eslint-disable</code> أو <code>--no-verify</code>.</li>
<li>الأقسام تُحيل إلى بعضها حيث تتداخل القواعد (مثلًا قاعدة lint الخاصة بـ<code>waitForTimeout</code> تشير إلى المصدر نفسه الذي تشير إليه قواعد الانتظار في Playwright).</li>
<li>ما يزال <code>wc -l CLAUDE.md</code> يبلّغ عن رقم أقل من 150. (سيكبر؛ لا بأس. فقط لا تدعه يصير رواية.)</li>
</ul>
<h2 id="التحقق-من-طرف-إلى-طرف">التحقق من طرف إلى طرف</h2>
<p>حين تكون كل طبقة في مكانها، سلّم الوكيل مطالبة واحدة تمرّنها كلها:</p>
<blockquote>
<p>أضف مسارًا جديدًا <code>/shelf/export</code> يتيح للمستخدم تنزيل رفّه كملف JSON. وأضف اختبار Playwright له. وشغّل كل الفحوص الثابتة والاختبارات قبل أن تعلن الإنجاز.</p>
</blockquote>
<p>راقب ما يفعله الوكيل. السلوك الصحيح هو:</p>
<ol>
<li>يكتب معالج المسار.</li>
<li>يكتب اختبار Playwright.</li>
<li>يشغّل <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run knip</code> و<code>npm run test</code> و<code>npm run pre-push</code> (الذي يغطّي اختبارات الوحدة).</li>
<li>إن فشل أي منها، يقرأ الخطأ ويصلحه ويعيد التشغيل.</li>
<li>لا يستخدم <code>page.waitForTimeout</code>، ولا يستخدم <code>page.locator</code> بمحدّد CSS، ولا يستخدم تسجيل دخول عبر الواجهة، ولا يقرأ <code>userId</code> من جسم الطلب، ولا يترك شيفرة ميتة خلفه.</li>
</ol>
<p>إن فعل الوكيل أيًّا من الأمور المحظورة، فاذهب وانظر لماذا لم تلتقطه الطبقة الثابتة. تلك هي الفجوة.</p>
<h2 id="معايير-القبول-النهائية">معايير القبول النهائية</h2>
<ul>
<li>اكتملت المطالبة من طرف إلى طرف أعلاه مع تشغيل الوكيل <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run knip</code> و<code>npm run test</code> و<code>npm run pre-push</code> دون تذكير.</li>
<li>لم يصل أي نمط محظور إلى الشيفرة النهائية.</li>
<li>إن فتحت طلب سحب، فهو نظيف.</li>
<li>كل مربّع اختيار في الأجزاء من الأول إلى السادس مؤشَّر.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li>أضف خطّاف <code>PostToolUse</code> خاصًا بـClaude يشغّل <code>npm run lint -- --quiet</code> بعد كل تعديل، وفق درس خطّافات Claude.</li>
<li>أضف إلى pre-push سكربتًا مثبّتًا لعدّ knip يفشل إن ارتفع عدد غير المستخدم عن خط أساس مُودَع (نمط السقّاطة).</li>
<li>هيّئ dependency-cruiser بقاعدة <code>no-orphans</code>، وقاعدة <code>legacy-auth</code> إن كان مستودعك ما يزال يحمل تلك الحدود، وشغّله في pre-push.</li>
<li>اكتب تقريرًا صغيرًا في نهاية المختبر: أي طبقة التقطت ماذا، وأي طبقة لم تنطلق قط. الطبقات التي لم تنطلق قط قد تكون متراخية أكثر من اللازم (أو قد تكون تعمل جيدًا لدرجة أنه لا شيء لتفعله).</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>الطبقة الثابتة خمس أدوات وساعة من الإعداد. كل واحدة منها تعمل تحت كل ما عداها، وتلتقط صنفًا محدّدًا من الأخطاء في اللحظة الأرخص ممكنة، وتتراكم مع الأخريات. في نهاية هذا المختبر، يعمل الوكيل تحت شبكة تغذية راجعة محكمة لدرجة أن معظم الأخطاء لا تستطيع البقاء طويلًا بما يكفي لتصل إلى الاختبارات التي أمضينا الصباح في بنائها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/wire-the-static-layer-into-shelf-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-static-layer-as-underlayment">الطبقة الثابتة كطبقة أساس</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails">Lint والأنواع كحواجز حماية</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection">كشف الشيفرة الميتة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خطّافات Git مع Lefthook</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks">فحص الأسرار باستخدام Gitleaks</a></li>
</ul>
`,l={book:e,chapter:o,chapterTitle:t,slug:d,title:c,headings:n,html:i};export{e as book,o as chapter,t as chapterTitle,l as default,n as headings,i as html,d as slug,c as title};
