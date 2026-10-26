const e="kinney",s="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="lab-rewrite-the-bad-claude-md",t="مختبر (اختياري)",o=[{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"معايير-القبول",text:"معايير القبول"},{depth:3,id:"الفحص-بضربة-واحدة",text:"الفحص بضربة واحدة"},{depth:2,id:"كيف-يبدو-هذا-أمام-وكيل-حقيقي",text:"كيف يبدو هذا أمام وكيل حقيقي"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-ينبغي-أن-يتبقى-معك",text:"ما ينبغي أن يتبقّى معك"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>حان وقت فعل الشيء.</p>
<p>افتح مستودع Shelf الانطلاقي. في الجذر يوجد ملف <a href="https://docs.claude.com/en/docs/claude-code/memory"><code>CLAUDE.md</code></a>. في نسخة الدورة المحلّية، هو مسوّدة مقبولة — ليست سيئة، لكنها ما زالت غامضة في مواضع. مهمتك في هذا المختبر أن تُحكمه حتى تصبح كل قاعدة شيئًا يستطيع الوكيل التصرّف فيه آليًا.</p>
<h2 id="الإعداد">الإعداد</h2>
<p>استخدم نسخة Shelf موجودة مع الحزم مثبّتة والتطبيق متاحًا في سير عملك المحلّي المعتاد. افتح <a href="https://docs.claude.com/en/docs/claude-code/memory"><code>CLAUDE.md</code></a> و<code>package.json</code> جنبًا إلى جنب في محرّرك. تأتي بذرة Shelf بقواعد المسارات والمصادقة والاختبار جاهزة — هذا المختبر عن جعل تلك القواعد <em>قابلة للفرض آليًا</em> وقصيرة بما يكفي كي يتبّعها الوكيل فعلًا دون أن تكرّر نفسك. أبقِ ما يستحقّ مكانه وأحكِم ما ما زال غامضًا.</p>
<h2 id="المهمة">المهمة</h2>
<p>أعد كتابة <a href="https://docs.claude.com/en/docs/claude-code/memory"><code>CLAUDE.md</code></a> بحيث تصبح كل قاعدة فيه شيئًا يستطيع الوكيل التصرّف فيه آليًا. يُسمح لك بالحذف <em>بجرأة</em>. ويُشجَّع لك أن تحذف أكثر مما تبقي.</p>
<p>تحديدًا، ينبغي أن يتضمّن الملف الجديد:</p>
<ul>
<li>قسم «ما معنى النجاح» يسمّي الأوامر الدقيقة التي ينبغي أن يشغّلها الوكيل قبل إعلان انتهاء المهمة. ابحث في <code>package.json</code> عن أسماء السكربتات الفعلية. لا تختلق أوامر.</li>
<li>قاعدة واحدة على الأقل عن كيفية كتابة الاختبارات (ترتيب TDD، وموضع الملف، واصطلاح التسمية — القرار لك).</li>
<li>قاعدة واحدة على الأقل عن كيفية اختيار محدّدات <a href="https://playwright.dev/">Playwright</a>.</li>
<li>قاعدة واحدة على الأقل عن بقاء النصوص الموجّهة للمستخدم بصوت المنتج. فملاحظات الدورة، وتعليل الاختبارات، وأسماء المسارات، وتفاصيل البنية التحتية مكانها الوثائق أو التعليقات، لا الواجهة.</li>
<li>قاعدة واحدة على الأقل عن شيء يجب ألّا يفعله الوكيل في هذه الشيفرة (دليل يُترك وشأنه، أو نمط يُتجنّب، أو تبعية لا تُضاف).</li>
</ul>
<p>أبقِ الملف تحت ستين سطرًا. فإن كان أطول، فأنت على الأرجح تكتب تعليمات لنفسك لا للوكيل.</p>
<p>تأتي البذرة بمسارات حقيقية تستحق التسمية. استخدم ذلك. فقاعدة تقول «أعد استخدام <code>src/lib/components</code>» أو «ضع مواصفات Playwright في <code>tests/</code>» أقوى من قاعدة غامضة عن البقاء منظّمًا.</p>
<h2 id="معايير-القبول">معايير القبول</h2>
<p>كل بند قابل للفحص باستقلال. لا تنتقل حتى تُعلَّم كلها.</p>
<ul>
<li><a href="https://docs.claude.com/en/docs/claude-code/memory"><code>CLAUDE.md</code></a> موجود في جذر المستودع وتحت ستين سطرًا (<code>wc -l CLAUDE.md</code> يعطي رقمًا ≤ 60).</li>
<li>يحتوي الملف قسمًا يسمّي ثلاثة أوامر صدفية دقيقة على الأقل ينبغي أن يشغّلها الوكيل قبل إعلان انتهاء المهمة.</li>
<li>كل أمر مسمّى في ذلك القسم موجود فعلًا في <code>package.json</code> (تحقّق بـ <code>cat package.json | grep &lt;command-name&gt;</code> لكل أمر).</li>
<li>يحتوي الملف صفر حالات من الكلمات «clean» أو «best practices» أو «good» أو «appropriate» (<code>grep -iE 'clean|best practices|good|appropriate' CLAUDE.md</code> لا يعيد أي تطابق).</li>
<li>يحتوي الملف قاعدة واحدة على الأقل تذكر مسار ملف محدّدًا في المستودع، وذلك المسار يُحلّ (<code>ls &lt;path&gt;</code> يخرج بالرمز صفر للمسار الذي سمّيته).</li>
<li>يحتوي الملف قاعدة واحدة على الأقل عن اختيار محدّد <a href="https://playwright.dev/">Playwright</a> تسمّي واجهة برمجية محدّدة في <a href="https://playwright.dev/">Playwright</a> (مثل <code>getByRole</code> أو <code>getByLabel</code> أو <code>data-testid</code>).</li>
<li>يحتوي الملف قاعدة واحدة على الأقل تُبقي النصوص الموجّهة للمستخدم عن الكتب والقراءة، وتُخرج ملاحظات الدورة أو الاختبار من الواجهة.</li>
<li>شغّلت <code>npm run lint</code> و<code>npm run typecheck</code> و<code>npm run test</code> بعد التعديل وخرجت الثلاثة بالرمز صفر. (<code>CLAUDE.md</code> ملف markdown، لذا ينبغي ألّا تتأثّر، لكن العادة هي المقصد.)</li>
<li>التزمت التغيير برسالة تبدأ بـ <code>lab(rewrite-the-bad-claude-md):</code> والتجزئة موجودة على <code>HEAD</code>.</li>
</ul>
<p>إن تذبذب <code>npm run test</code> هنا لأن البذرة ما زالت تستخدم تسجيل الدخول التفاعلي داخل اختبارات المتصفح، فسجّل ذلك وامضِ. المختبر التالي مباشرةً موجود لتقوية نمط الفشل ذلك بعينه.</p>
<h3 id="الفحص-بضربة-واحدة">الفحص بضربة واحدة</h3>
<p>انسخ هذا المقطع وألصقه في جذر المستودع لتشغيل كل فحص آلي أعلاه دفعة واحدة. يخرج بالرمز صفر حين ينجح الملف، ويطبع القاعدة الفاشلة تحديدًا حين لا ينجح:</p>
<pre><code class="language-bash"><span class="hljs-built_in">set</span> -e

<span class="hljs-comment"># Length cap</span>
[ <span class="hljs-string">&quot;<span class="hljs-subst">$(wc -l &lt; CLAUDE.md)</span>&quot;</span> -le 60 ] || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;fail: CLAUDE.md has more than 60 lines&quot;</span>; <span class="hljs-built_in">exit</span> 1; }

<span class="hljs-comment"># Banned vague words</span>
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> clean <span class="hljs-string">&quot;best practices&quot;</span> good appropriate; <span class="hljs-keyword">do</span>
  <span class="hljs-keyword">if</span> grep -iq <span class="hljs-string">&quot;<span class="hljs-variable">$word</span>&quot;</span> CLAUDE.md; <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;fail: CLAUDE.md contains banned word &#x27;<span class="hljs-variable">$word</span>&#x27;&quot;</span>
    <span class="hljs-built_in">exit</span> 1
  <span class="hljs-keyword">fi</span>
<span class="hljs-keyword">done</span>

<span class="hljs-comment"># Commands referenced in CLAUDE.md must exist in package.json</span>
<span class="hljs-keyword">for</span> cmd <span class="hljs-keyword">in</span> $(grep -oE <span class="hljs-string">&#x27;npm run [a-z:-]+&#x27;</span> CLAUDE.md | awk <span class="hljs-string">&#x27;{print $3}&#x27;</span> | <span class="hljs-built_in">sort</span> -u); <span class="hljs-keyword">do</span>
  grep -q <span class="hljs-string">&quot;\\&quot;<span class="hljs-variable">$cmd</span>\\&quot;:&quot;</span> package.json || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;fail: npm run <span class="hljs-variable">$cmd</span> not in package.json&quot;</span>; <span class="hljs-built_in">exit</span> 1; }
<span class="hljs-keyword">done</span>

<span class="hljs-comment"># At least one Playwright locator API is named</span>
grep -qE <span class="hljs-string">&#x27;getByRole|getByLabel|getByText|data-testid&#x27;</span> CLAUDE.md \\
  || { <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;fail: no Playwright locator rule&quot;</span>; <span class="hljs-built_in">exit</span> 1; }

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;ok: CLAUDE.md passes every mechanical check&quot;</span>
</code></pre>
<p>شغّل ذلك المقطع داخل المستودع بعد كل تعديل على <code>CLAUDE.md</code>. وحين يطبع <code>ok</code>، يكون النصف الآلي من المختبر قد انتهى ويمكنك الانتقال إلى النصف الذاتي («هل يتبّع الوكيل هذه القواعد فعلًا حين تعطيه مهمة»).</p>
<h2 id="كيف-يبدو-هذا-أمام-وكيل-حقيقي">كيف يبدو هذا أمام وكيل حقيقي</h2>
<p>حين ينجح ملفك في الفحوص الآلية، يصبح السؤال الحقيقي: هل يغيّر سلوك الوكيل فعلًا؟ هذا ما تبدو عليه جولة أمام Claude Code مع <code>CLAUDE.md</code> محكَم في مكانه. الطلب:</p>
<blockquote>
<p>أضف عدّاد «أنجزت هذا العام» إلى صفحة الإحصاءات. واتّبع القواعد في CLAUDE.md.</p>
</blockquote>
<p>ملف <code>CLAUDE.md</code> محكَم ينتج جلسة تبدو تقريبًا هكذا. يفترض هذا النص أن مختبر الطبقة الثابتة أضاف <code>npm run knip</code>؛ وإن كنت تنفّذ هذا المختبر بمعزل، فتجاهل خطوة knip — فالبوابات الثلاث في <code>package.json</code> الانطلاقي هي <code>typecheck</code> و<code>lint</code> و<code>test</code>.</p>
<pre><code>Reading CLAUDE.md...

I see the &quot;Done means green&quot; section. I'll need to run typecheck, lint,
knip, and test before I can report this complete.

Let me find the stats page. Grepping for &quot;stats&quot; in src/routes/...
  → src/routes/(app)/goals/+page.svelte exists. That looks like the
    closest thing to a stats page Shelf has today.

Reading +page.server.ts for the goals route to understand the data
shape... the loader already returns shelfEntries with finishedAt
timestamps. Good — I can compute the &quot;finished this year&quot; count from
that without adding a new query.

Editing +page.svelte to add a $derived expression:
  let finishedThisYear = $derived(
    shelfEntries.filter(entry =&gt;
      entry.finishedAt &amp;&amp;
      new Date(entry.finishedAt).getFullYear() === new Date().getFullYear()
    ).length
  );

And the rendering:
  &lt;p&gt;You've finished {finishedThisYear} books this year.&lt;/p&gt;

CLAUDE.md says user-facing strings are about books, shelves, and reading.
This one is. Good.

Running npm run typecheck...
  → exit 0, 3 pre-existing warnings in playground, not mine.

Running npm run lint...
  → exit 0.

Running npm run knip...
  → exit 0.

Running npm run test...
  → 38 passed. The authenticated visual baseline for /shelf didn't
    change because I edited /goals, not /shelf.

All four gates green. Task complete.
</code></pre>
<p>ثمّة أمران يجب ملاحظتهما في هذا النص:</p>
<ul>
<li>قرأ الوكيل <code>CLAUDE.md</code> أولًا واستخرج قاعدة «الانتهاء يعني النجاح» قبل أن يلمس أي شيفرة. لم يحتج إلى تذكير.</li>
<li>فحص قاعدة نصوص المنتج على مخرجاته قبل أن يمضي. فالقاعدة اشتغلت كحاجز، لا كفحص لاحق.</li>
</ul>
<p>ملف <code>CLAUDE.md</code> <em>رخو</em> — ذاك الذي تشحنه البذرة — ينتج جلسة مختلفة جدًا. فما زال الوكيل يكتب الميزة، لكنه إمّا يتخطّى البوابات كليًا أو يشغّلها بترتيب خاطئ، ويصبح «من فضلك شغّل البوابات» شيئًا عليك قوله في المحادثة. والفرق بين النسختين هو الفرق بين «تعليمات يستشيرها الوكيل» و«تعليمات يطيعها الوكيل آليًا». والثانية هي التي تريدها.</p>
<p>إن كنت متشكّكًا، فجرّب بنفسك: أعد <code>CLAUDE.md</code> إلى حالته الانطلاقية (أو علّق قسم «الانتهاء يعني النجاح»)، وأعطِ Claude Code الطلب نفسه، وقارن النصوص. ستكون شيفرة الميزة متشابهة؛ أما العملية حولها فلن تكون.</p>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<p>إن انتهيت مبكرًا:</p>
<ul>
<li>أضف قاعدة تشير إلى ملف لم تنشئه بعد، ثم أنشئه. (دروس تسجيل HAR اللاحقة في الدورة ستعمر <code>tests/fixtures/</code> — وقاعدة اصطلاح للـ fixtures تناسب أن تُرسى مبكرًا.)</li>
<li>شغّل المهمة نفسها أمام وكيل ثانٍ (Cursor أو Codex أو Copilot) باستخدام ملف التعليمات نفسه مترجمًا إلى اسم ملف ذلك الوكيل. لاحظ أين تصمد القواعد في النقل وأين لا.</li>
<li>خذ أسوأ قاعدة <em>أبقيتها</em> وحاول جعلها أكثر قابلية للفحص آليًا. الهدف ليس الكمال؛ الهدف أن تشعر بالفرق بين قاعدة يستطيع الوكيل التصرّف فيها وأخرى لا يستطيع.</li>
</ul>
<h2 id="ما-ينبغي-أن-يتبقى-معك">ما ينبغي أن يتبقّى معك</h2>
<p>ملف <code>CLAUDE.md</code> كنت تتمنّى فعلًا أن يقرأه الوكيل. أقصر من الذي بدأت به. أكثر حسمًا. كل سطر يستحقّ مكانه لأنه شيء يفعله الوكيل، لا شيء <em>يكون</em> عليه الوكيل.</p>
<p>سنعود إلى هذا الملف في كل درس تقريبًا من هنا. وبحلول نهاية اليوم، سيكون فيه قواعد من محدّدات <a href="https://playwright.dev/">Playwright</a> والانتظار (راجع <a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">تسلسل المحدّدات الهرمي</a> و<a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a>)، و<a href="https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails">التدقيق وكشف الشيفرة الميتة</a>، و<a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">أمر التكامل المستمر المعتمد</a>. وإعادة الكتابة التي تجريها اليوم هي العمود الذي يتعلّق به بقيّة اليوم.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/rewrite-the-bad-claude-md-solution">الحل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in">تعليمات تربط الوكيل بالحلقة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-hypothesis">الفرضية</a></li>
</ul>
`,i={book:e,chapter:s,chapterTitle:n,slug:a,title:t,headings:o,html:l};export{e as book,s as chapter,n as chapterTitle,i as default,o as headings,l as html,a as slug,t as title};
