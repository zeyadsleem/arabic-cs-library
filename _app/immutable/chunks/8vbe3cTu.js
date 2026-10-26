const s="kinney",e="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",a="making-it-hard-to-cheat-the-guardrails",o="جعل التلاعب بالقضبان صعبًا",t=[{depth:2,id:"التحايلات-الشائعة",text:"التحايلات الشائعة"},{depth:2,id:"ابدأ-بقاعدة-صريحة-في-التعليمات",text:"ابدأ بقاعدة صريحة في التعليمات"},{depth:2,id:"امنع-الأمر-السيئ-قبل-تشغيله",text:"امنع الأمر السيئ قبل تشغيله"},{depth:2,id:"اعكس-الفحوص-المحلية-في-ci",text:"اعكس الفحوص المحلية في CI"},{depth:2,id:"احم-طبقة-الحماية",text:"احمِ طبقة الحماية"},{depth:2,id:"اجعل-قواعد-الدمج-هي-الإنفاذ-الحقيقي",text:"اجعل قواعد الدمج هي الإنفاذ الحقيقي"},{depth:2,id:"تعامل-مع-تخطي-الخطاف-كحوادث-لا-كميزات",text:"تعامل مع تخطي الخُطّاف كحوادث، لا كميزات"},{depth:2,id:"راقب-التحايل-الأخفى",text:"راقب التحايل الأخفى"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الذي-يجب-تذكره",text:"الشيء الذي يجب تذكّره"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],i=`<p>إن استطاع وكيل أن يتحايل على القضيب أول مرة يضيق بها، فذلك لم يكن قضيبًا. كان اقتراحًا بطباعة أنيقة.</p>
<p>خُطّافات <a href="https://git-scm.com/">Git</a> المحلية ما زالت تستحق الوجود. أحبّ تهيئة سريعة لـ <a href="https://github.com/evilmartians/lefthook"><code>Lefthook</code></a> أو <a href="https://typicode.github.io/husky/"><code>Husky</code></a> لأنها تقصّر الحلقة وتُبقي الأخطاء الواضحة على الحاسوب. لكن الخُطّافات طبقة واحدة فقط. سيكتشف الوكلاء بالتأكيد <code>git commit --no-verify</code>، ومتغيّرات البيئة الخاصة بتخطي الأدوات، وملفات القواعد القابلة للتحرير، و«ماذا لو غيّرت سير العمل فحسب؟» إن تركت تلك الأبواب مفتوحة.</p>
<p>إذن السؤال الحقيقي ليس «كيف أقول للوكيل ألا يتلاعب؟» السؤال الحقيقي هو: <em>كم طبقة يجب أن تتفق قبل أن تصل الشيفرة السيئة إلى main؟</em></p>
<h2 id="التحايلات-الشائعة">التحايلات الشائعة</h2>
<p>لنسمِّ الواضحة منها، لأن أنماط الفشل غير المسماة تستمر في الظهور في تقارير ما بعد الحوادث.</p>
<ul>
<li><code>git commit --no-verify</code></li>
<li>مفاتيح التخطي الخاصة بكل أداة مثل <code>HUSKY=0</code> أو <code>LEFTHOOK=0</code> أو <code>LEFTHOOK_EXCLUDE=...</code></li>
<li>تحرير <code>lefthook.yml</code> أو <code>.husky/*</code> أو سكربتات <code>package.json</code> أو ملفات القواعد لإضعاف الفحوص</li>
<li>تغيير CI بحيث لا تعمل الفحوص المكلفة أو ذات المعنى بعد الآن</li>
<li>الدفع مباشرة إلى فرع مسموح له بتجاوز المراجعة أو الفحوص المطلوبة</li>
<li>الدفع القسري لإبعاد تاريخ غير مريح بعد خيار محلي سيئ</li>
</ul>
<p>لا شيء من هذا نظري. هذه بالضبط ما سيجده وكيل سريع الحركة إن كان يحسّن من أجل «نجح الأمر» بدلًا من «التغيير موثوق».</p>
<h2 id="ابدأ-بقاعدة-صريحة-في-التعليمات">ابدأ بقاعدة صريحة في التعليمات</h2>
<p>الطبقة الأولى ما زالت الأبسط: قل القاعدة بصوت عالٍ في <code>AGENTS.md</code> أو <code>CLAUDE.md</code> أو <code>.cursor/rules</code> أو ملف السياسة المكافئ.</p>
<p>تريد لغة صريحة، لا انطباعات:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Git and verification</span>

<span class="hljs-bullet">-</span> Never use <span class="hljs-code">\`--no-verify\`</span>, <span class="hljs-code">\`HUSKY=0\`</span>, <span class="hljs-code">\`LEFTHOOK=0\`</span>, or other hook-skipping
  flags or environment variables.
<span class="hljs-bullet">-</span> Never weaken hook, CI, or ruleset configuration to make a failing change
  pass. Fix the code or stop and explain the blocker.
<span class="hljs-bullet">-</span> Changes to hook configuration, workflow files, or agent policy files
  require the same review standard as application code.
</code></pre>
<p>هل تكفي التعليمات وحدها؟ لا. لكنها تفعل أمرين مهمين:</p>
<ul>
<li>تجعل السياسة مقروءة</li>
<li>تعطي طبقة الإنفاذ التالية شيئًا محددًا تُنفّذه</li>
</ul>
<h2 id="امنع-الأمر-السيئ-قبل-تشغيله">امنع الأمر السيئ قبل تشغيله</h2>
<p>هذا أنظف تحكّم تقني حين تدعمه بيئة تشغيل وكيلك. إن كانت الأداة تستطيع فحص أوامر الصدفة <em>قبل</em> التنفيذ، فامنع التحايلات هناك.</p>
<p>النمط أوسع من <code>--no-verify</code>. تعامل مع مفاتيح التخطي ومتغيّرات بيئة التخطي كصنف واحد من منافذ الهروب:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;

<span class="hljs-keyword">const</span> input = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(fs.<span class="hljs-title function_">readFileSync</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>));
<span class="hljs-keyword">const</span> command = input.<span class="hljs-property">tool_input</span>?.<span class="hljs-property">command</span> ?? <span class="hljs-string">&#x27;&#x27;</span>;

<span class="hljs-keyword">const</span> bypassPattern = <span class="hljs-regexp">/(^|\\s)(--no-verify|HUSKY=0|LEFTHOOK=0|LEFTHOOK=false|LEFTHOOK_EXCLUDE=)/</span>;

<span class="hljs-keyword">if</span> (!bypassPattern.<span class="hljs-title function_">test</span>(command)) {
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>);
}

process.<span class="hljs-property">stdout</span>.<span class="hljs-title function_">write</span>(
  <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
    <span class="hljs-attr">hookSpecificOutput</span>: {
      <span class="hljs-attr">hookEventName</span>: <span class="hljs-string">&#x27;PreToolUse&#x27;</span>,
      <span class="hljs-attr">permissionDecision</span>: <span class="hljs-string">&#x27;deny&#x27;</span>,
      <span class="hljs-attr">permissionDecisionReason</span>:
        <span class="hljs-string">&#x27;Do not bypass local verification. Fix the failing guardrail instead.&#x27;</span>,
    },
  }),
);

process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>);
</code></pre>
<p>ذلك السكربت هو الجزء القابل للنقل. وصّله بأي بيئة تشغيل تستخدمها:</p>
<ul>
<li><a href="https://docs.claude.com/en/docs/claude-code/hooks">خُطّافات Claude Code</a> تستطيع منع أمر <code>Bash</code> قبل تشغيله.</li>
<li><a href="https://developers.openai.com/codex/hooks">خُطّافات Codex</a> تستطيع فعل الشيء نفسه مع استخدام أداة <code>Bash</code>.</li>
<li><a href="https://docs.cursor.com/cli/reference/permissions">أذونات Cursor CLI</a> أخشن، لذا قد تحتاج إلى موافقة على كل أوامر <code>git</code> ذات الطابع الكتابي، أو قاعدة منع لـ <code>Shell(git)</code> إن أردت حدًّا صلبًا فعلًا.</li>
</ul>
<p>درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خُطّافات Git مع Lefthook</a> السابق يمشي في الشكل الخاص بكل أداة. الفكرة الأكبر هنا أنك ينبغي أن تحجب <em>صنف</em> التحايل، لا علمًا واحدًا فقط.</p>
<h2 id="اعكس-الفحوص-المحلية-في-ci">اعكس الفحوص المحلية في CI</h2>
<p>هذه هي الطبقة الأكثر أهمية.</p>
<p>إن لم تعمل فحوص التنسيق والنوع والوحدة ومن طرف إلى طرف وإمكانية الوصول والملف التعريفي نفسها في CI، فتجاوز خُطّاف محلي يصبح مهمًا فعلًا. أما إن أعاد CI تشغيل المجموعة المرجعية، فيصبح التجاوز المحلي إزعاجًا بدلًا من مشكلة في سلسلة التوريد.</p>
<p>تقسيمي الافتراضي يبدو هكذا:</p>
<ul>
<li>قبل الإيداع: تنسيق الملفات المُجهَّزة، والفحص، ومسح الأسرار</li>
<li>قبل الدفع: فحوص محلية أبطأ لكنها تبقى في حدود دقيقتين</li>
<li>CI: المجموعة المرجعية الشاملة، تعمل من بيئة نظيفة</li>
</ul>
<p>جزء «البيئة النظيفة» مهم. ينبغي ألا يرث CI ذاكراتك المؤقتة المحلية، ولا الخوادم المعاد استخدامها، ولا الخدمات المُقلعة يدويًا. ينبغي أن يثبت الفرع من الصفر.</p>
<h2 id="احم-طبقة-الحماية">احمِ طبقة الحماية</h2>
<p>إن استطاع وكيل تغيير القواعد التي تقيّمه، فلديك مشكلة حوكمة.</p>
<p>ضع ملفات الحماية تحت ضغط المراجعة نفسه الذي تخضع له شيفرة الإنتاج:</p>
<ul>
<li><a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners"><code>CODEOWNERS</code></a> على <code>lefthook.yml</code> و<code>.husky/**</code> و<code>.github/workflows/**</code> و<code>.claude/**</code> و<code>.codex/**</code> و<code>.cursor/**</code> وملفات السياسة</li>
<li>مراجعات مطلوبة لتلك المسارات</li>
<li>تنبيهات في قوالب المراجعة أو أوصاف طلبات السحب حين تتغيّر ملفات البنية التحتية</li>
</ul>
<p>أحبّ أيضًا أن تكون أسماء فحوص CI مستقرة وواضحة. «typecheck» و«unit» و«end-to-end» و«secret-scan» أصعب في التلاعب من مهمة واحدة مبهمة تُسمّى «verify».</p>
<h2 id="اجعل-قواعد-الدمج-هي-الإنفاذ-الحقيقي">اجعل قواعد الدمج هي الإنفاذ الحقيقي</h2>
<p>على <a href="https://github.com/">GitHub</a>، حدّ الإنفاذ الذي يمكنك الاعتماد عليه ليس الخُطّاف المحلي. إنه <a href="https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches">حماية الفروع</a> أو، أفضل من ذلك، <a href="https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets">مجموعات القواعد</a> مع فحوص الحالة المطلوبة.</p>
<p>مكدّس القضبان الذي أثق به يبدو هكذا:</p>
<ul>
<li>طلبات السحب مطلوبة للفروع المحمية</li>
<li>فحوص الحالة المطلوبة للبوابات نفسها التي تعكسها الخُطّافات</li>
<li>قيود الدفع القسري على الفروع المحمية</li>
<li>قواعد إسقاط المراجعة أو متطلبات مراجعة توقف مسار «غيّر سير العمل ثم ادمجه بنفسك»</li>
</ul>
<p>إن كنت تشغّل خادم Git خاصًا بك، فخُطّافات pre-receive على جانب الخادم أقوى. لكن معظم الفرق تعيش على منصات Git المستضافة، ما يعني أن مجموعات القواعد والفحوص المطلوبة هي الحدّ الذي يُحتسب فعلًا.</p>
<h2 id="تعامل-مع-تخطي-الخطاف-كحوادث-لا-كميزات">تعامل مع تخطي الخُطّاف كحوادث، لا كميزات</h2>
<p>بعض الأدوات توثّق مسارات التخطي لأن البشر يحتاجونها أحيانًا. <a href="https://typicode.github.io/husky/how-to.html"><code>Husky</code></a> توثّق <code>HUSKY=0</code> صراحةً. و<a href="https://lefthook.dev/usage/env.html"><code>Lefthook</code></a> توثّق <code>LEFTHOOK=0</code> و<code>LEFTHOOK_EXCLUDE</code> صراحةً. تلك التوثيق ليس إذنًا للوكلاء بالارتجال حول معاييرك. إنه تذكير بأن الخُطّافات المحلية شيفرة في فضاء المستخدم، وبالتالي قابلة للتجاوز.</p>
<p>هذا ينبغي أن يدفعك إلى قرارين:</p>
<ul>
<li>أبقِ الخُطّافات سريعة بما يكفي حتى لا يريد الناس تخطيها</li>
<li>افترض أن التخطي ممكن وابنِ الطبقة التالية على أي حال</li>
</ul>
<p>الخُطّافات السريعة تقلّل الإغراء. وCI وقواعد الدمج تقلّلان نطاق الضرر.</p>
<h2 id="راقب-التحايل-الأخفى">راقب التحايل الأخفى</h2>
<p>النسخة الأكثر خبثًا ليست <code>--no-verify</code>. النسخة الأكثر خبثًا هي إضعاف القاعدة نفسها:</p>
<ul>
<li>حذف مهمة من سير العمل</li>
<li>تغيير اسم فحص مطلوب</li>
<li>تضييق نمط ملف (glob) حتى تتوقف الخُطّافة عن رؤية ملفات مهمة</li>
<li>نقل أمر من قبل الدفع إلى «سنفعله لاحقًا»</li>
</ul>
<p>لهذا أحبّ حماية المسارات على ملفات البنية التحتية، ولهذا أذكرها بالاسم في المراجعة. المشكلة ليست فقط «الوكيل تخطّى الخُطّافة». المشكلة أيضًا «الوكيل جعل الخُطّافة بلا معنى ثم أطاعها تقنيًا».</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Guardrails</span>

<span class="hljs-bullet">-</span> Never bypass hooks with <span class="hljs-code">\`--no-verify\`</span>, <span class="hljs-code">\`HUSKY=0\`</span>, <span class="hljs-code">\`LEFTHOOK=0\`</span>,
  <span class="hljs-code">\`LEFTHOOK_EXCLUDE\`</span>, or similar escape hatches.
<span class="hljs-bullet">-</span> Never modify hook, workflow, or policy configuration to make a failing
  change pass unless the task is explicitly about changing that
  configuration.
<span class="hljs-bullet">-</span> Local hooks are convenience. CI and merge rules are authority. Keep the
  same critical checks in both places.
<span class="hljs-bullet">-</span> Treat changes to infrastructure guardrails as high-risk edits that require
  explicit review.
</code></pre>
<h2 id="الشيء-الذي-يجب-تذكره">الشيء الذي يجب تذكّره</h2>
<p>أنت لا تمنع تجاوز القضبان بالتشدد في ملف ماركداون. تمنعه بترصيف السياسة، والمنع قبل التنفيذ، والإعداد المحمي، ومرايا CI، وقواعد الدمج، بحيث لا يكفي أي اختصار منفرد. الخُطّافات المحلية تُبقي الحلقة سريعة. وبقية المكدّس تُبقي الحلقة أمينة.</p>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">خُطّافات Git مع Lefthook</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks">مسح الأسرار مع Gitleaks</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">CI كحلقة الملاذ الأخير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation">التحقق بعد الدمج وبعد النشر</a></li>
</ul>
`,l={book:s,chapter:e,chapterTitle:n,slug:a,title:o,headings:t,html:i};export{s as book,e as chapter,n as chapterTitle,l as default,t as headings,i as html,a as slug,o as title};
