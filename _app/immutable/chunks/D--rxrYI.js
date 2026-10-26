const o="kinney",e="ai-development-setup",s="تهيئة بيئة التطوير بالذكاء الاصطناعي",n="hooks",c="الخطّافات (Hooks)",t=[{depth:2,id:"ما-هي-الخطافات",text:"ما هي الخطّافات"},{depth:2,id:"تحذير-من-شخص-استخدمها",text:"تحذير من شخص استخدمها"},{depth:2,id:"كيف-تعمل-الخطافات",text:"كيف تعمل الخطّافات"},{depth:2,id:"تهيئة-الخطافات",text:"تهيئة الخطّافات"},{depth:2,id:"الخطافات-والصلاحيات",text:"الخطّافات والصلاحيات"}],a=`<p>كتبت «شغّل المُنسّق دائمًا» في <code>CLAUDE.md</code>. نفّذ الوكيل ذلك تسع مرات من عشر. وفي المرة العاشرة لم يفعل، فاكتشفت الأمر في مراجعة الشيفرة.</p>
<p>جملة في ملف تعليمات هي طلب. أما <strong>الخطّاف (hook)</strong> فهو شيفرة. يعمل في كل مرة، سواء تذكّر النموذج أم لم يتذكّر. توجد الخطّافات في <a href="https://code.claude.com/docs/en/hooks">Claude Code</a>، وقد صُمّمت <a href="https://developers.openai.com/codex/hooks">خطّافات Codex</a> على غرارها: العقد الأساسي نفسه، مع اختلافات في الثقة والحدود القصوى وبعض الأحداث.</p>
<h2 id="ما-هي-الخطافات">ما هي الخطّافات</h2>
<p>يشغّل الخطّاف شيفرة حتمية عند <em>حدث دورة حياة</em>: نقطة محددة في عمل الوكيل، مثل «بدأت جلسة للتو» أو «أداة على وشك أن تعمل». ويستطيع إرجاع تغذية راجعة عند ذلك الحدث. لكنه <em>لا يستطيع</em> فرض مسارات لا تمرّ به أصلًا.</p>
<p>الخطّافات أفضل ما تكون لـ «كلما وقع هذا الحدث، افعل هذا الشيء المحدد». وهي عادةً الخيار الخاطئ لـ «اكتشف العمل المطلوب وأدره».</p>
<p>الاستخدامات المناسبة:</p>
<ul>
<li>حجب الكتابة إلى الفروع المحمية.</li>
<li>التحقّق من مدخلات الأدوات.</li>
<li>تنسيق ملف بعد تحريره.</li>
<li>تسجيل تسليم محدود: ملاحظة قصيرة بسقف حجم، مثل ملف تقدّم، تلتقط منه الجلسة التالية.</li>
<li>طلب دليل حديث قبل الإعلان عن الإنجاز.</li>
</ul>
<p>وفيما يلي بعض الأحداث التي ستراها في أثناء هذه الدورة:</p>
<ul>
<li><code>SessionStart</code>: تبدأ جلسة (محادثة واحدة، من الإطلاق حتى الخروج).</li>
<li><code>PreToolUse</code>: نداء أداة، مثل قراءة ملف أو تشغيل أمر صدفة، على وشك التنفيذ. ويستطيع الخطّاف حجبه.</li>
<li><code>PostToolUse</code>: أداة نُفّذت للتو. الوقت متأخر عن الحجب، لكنه مناسب للتغذية الراجعة والتنظيف.</li>
<li><code>UserPromptSubmit</code>: أرسلت للتو طلبًا. ويستطيع الخطّاف إضافة سياق إلى جانبه، لكنه لا يستطيع استبداله.</li>
<li><code>PermissionRequest</code>: الوكيل ينتظر موافقتك على شيء.</li>
<li><code>Stop</code>: الوكيل على وشك إنهاء دور (جولة استجابة واحدة، قد تشمل تشغيل عدة أدوات) وانتظارك.</li>
<li><code>SubagentStop</code>: وكيل فرعي (وكيل مساعد بسياق جديد لا يعيد إلا تقريرًا نهائيًا) على وشك الانتهاء.</li>
</ul>
<p>وهناك المزيد، منها <code>TaskCreated</code> و<code>TaskCompleted</code> و<code>TeammateIdle</code> الخاصة بـ <a href="https://stevekinney.com/courses/ai-development-setup/agent-teams">فرق الوكلاء</a>، و<code>PreCompact</code> و<code>PostCompact</code> حول الضغط (compaction). ويسرد <a href="https://code.claude.com/docs/en/hooks">مرجع الخطّافات</a> كلها.</p>
<h2 id="تحذير-من-شخص-استخدمها">تحذير من شخص استخدمها</h2>
<p>في كل مرة تقريبًا قررت فيها استخدام الخطّافات، انتهى بي الأمر إلى إزالتها لأنها كانت أكثر إزعاجًا من كونها مفيدة.</p>
<p>والبيانات تخالفني قليلًا. عندما جعلت الوكلاء يدقّقون جلساتي الخاصة، بقيت المشكلات التي أصلحتها بخطّاف أو سكربت <em>مُصلَحة</em>، أما التي أصلحتها بجملة في <code>CLAUDE.md</code> فلم تبقَ.</p>
<p>وإليك ما استقررت عليه: أبقِ خطّافات <em>الفرض</em> للقليل من القواعد التي يجب أن تصمد في كل مرة، واستخدم <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder">سلّم الفرض</a> لتقرير ما هي تلك القواعد. والخطّافات الخفيفة، مثل مُنسّق أو إشعار أو محمّل سياق، لا بأس بها أيضًا، لأن لا شيء يعتمد على صمودها.</p>
<h2 id="كيف-تعمل-الخطافات">كيف تعمل الخطّافات</h2>
<p>العقد مملّ إلى حدّ منعش. ترسل المنصة حدث JSON إلى سكربتيك عبر stdin، ورمز الخروج هو من يتكلم:</p>
<ul>
<li><strong>الخروج بـ <code>0</code></strong>: «لا اعتراض». وهذا <em>ليس</em> مثل الموافقة. فقواعد الصلاحيات تبقى صاحبة الكلمة الأخيرة.</li>
<li><strong>الخروج بـ <code>2</code></strong>: حجب، حيث يدعم الحدث الحجب. وكل ما كتبته إلى stderr يصل إلى Claude، فاشرح له السبب.</li>
<li><strong>أي شيء آخر</strong>: خطأ غير حاجب. يمضي الإجراء قدمًا، فخطّاف ينهار بالخروج بـ <code>1</code> لا يوقف شيئًا. ولـ <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder">سلّم الفرض</a> حكاية عن كيف ينتهي ذلك.</li>
</ul>
<p>والطريقة الأخرى الوحيدة للحجب هي طباعة قرار JSON إلى stdout والخروج بـ <code>0</code>. والخروج بـ <code>2</code> أبسط لحجب سريع مع رسالة. استخدم JSON حين تريد تحكمًا أكبر، مثل سؤالك بدلًا من الرفض، أو أن يعيد خطّاف <code>PreToolUse</code> كتابة مدخلات الأداة بحقل <code>updatedInput</code>.</p>
<p>بعض التفاصيل التي ستوفر عليك أمسية:</p>
<ul>
<li><strong>حقول القرار تختلف حسب الحدث</strong>: يأخذ <code>PreToolUse</code> القيمة <code>{&quot;hookSpecificOutput&quot;: {&quot;hookEventName&quot;: &quot;PreToolUse&quot;, &quot;permissionDecision&quot;: &quot;deny&quot;, &quot;permissionDecisionReason&quot;: &quot;...&quot;}}</code>. ويأخذ <code>Stop</code> و<code>SubagentStop</code> القيمة <code>{&quot;decision&quot;: &quot;block&quot;, &quot;reason&quot;: &quot;...&quot;}</code>. ويستخدم <code>PermissionRequest</code> الحقل <code>hookSpecificOutput.decision.behavior</code>. و JSON المُشكَّل لحدث خاطئ لا يفعل شيئًا، بصمت.</li>
<li><strong>ليست كل الأحداث تستطيع الحجب</strong>: لا يستطيع <code>PostToolUse</code> ذلك لأن الأداة نُفّذت بالفعل. ولا يستطيع <code>SessionStart</code> كذلك. فالخروج بـ <code>2</code> هناك لا يوقف الجلسة.</li>
<li><strong>المطابِقات لا ترى إلا ما تطابقه</strong>: <em>المطابِق</em> هو النمط الذي يحدد أي نداءات الأدوات تُشغّل خطّافًا. فمطابِق <code>Edit|Write</code> يفوّت الكتابات المنفَّذة عبر Bash. والشبكة الخلفية العامة لنظام الملفات هي فحص للمستودع عند <code>Stop</code>: يكشف المشكلة بعد وقوعها ويستطيع رفض السماح للوكيل بالانتهاء حتى تُصلَح. أما <code>FileChanged</code> فلا يبلّغ إلا عن الملفات المراقبة صراحةً ولا يستطيع حجب التغييرات. ويسجّل مطابِقه أسماء ملفات حرفية في دليل العمل، مفصولة بـ <code>|</code>، لذا يسجّل <code>*</code> ملفًا اسمه حرفيًا <code>*</code>، لا كل ملف. أما المسارات الديناميكية، فأعد <code>watchPaths</code> مطلقة من خطّاف مدعوم واحذف مطابِق <code>FileChanged</code> للتعامل مع كل ملف مراقب. ويوضّح <a href="https://code.claude.com/docs/en/hooks#filechanged">مرجع FileChanged</a> كيفية تهيئة قائمة المراقبة تلك وتحديثها.</li>
<li><strong>استخدم معالجات <code>command</code> لثوابت النظام</strong>: المعالج هو ما يعمل عند إطلاق الخطّاف. ومعالج <code>command</code> يشغّل برنامجًا كتبته أنت. أما معالجات <code>prompt</code> (تسأل نموذجًا) و<code>agent</code> (تشغّل وكيلًا) و<code>http</code> (تنادي عنوان URL) فلا بأس بها للنصيحة أو سياسة مركزية، لكنها ليست بوابات حتمية.</li>
<li><strong>المخرَج المحقون محدود</strong>: مخرَج الخطّاف المحقون في سياق النموذج لا يتجاوز 10,000 حرف.</li>
</ul>
<h2 id="تهيئة-الخطافات">تهيئة الخطّافات</h2>
<p>يحمل كل حدث مجموعات مطابِقات، وتحمل كل مجموعة معالجات. وللمعالج <code>type</code> و<code>command</code> و<code>timeout</code> بالثواني. ومعظم خطّافات الأوامر مدتها الافتراضية 600 ثانية، أما <code>UserPromptSubmit</code> و<code>PreModelSwitch</code> فمدتهما الافتراضية 30، و<code>SessionEnd</code> مدته الافتراضية 1.5 مع ميزانية تنفيذ مشتركة. ويمكن للمهلة الزمنية أن تلغي الخطّاف قبل أن يعيد قراره، لذا راجع الحدث في <a href="https://code.claude.com/docs/en/hooks">مرجع الخطّافات</a> واضبط مهلة صريحة تناسب العمل.</p>
<p>وهذا مثال أدنى، تحت المفتاح <code>hooks</code> في <code>.claude/settings.json</code>، يشغّل سكربتًا قبل كل نداء <code>Bash</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;PreToolUse&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;matcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Bash&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;command&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\\&quot;\${CLAUDE_PROJECT_DIR}/.claude/hooks/allow-lint.sh\\&quot;&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;timeout&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يبقي المسار المطلق <code>\${CLAUDE_PROJECT_DIR}</code> الخطّاف مرتكزًا إلى مشروع الإطلاق عندما يغيّر Claude الأدلة أو يدخل worktree. أما الحقل <code>cwd</code> في مدخلات JSON فيظل يبيّن أين سيعمل نداء الأداة.</p>
<p>وهذا سكربت ضيّق عمدًا: لا يقبل إلا الأمر المطابق تمامًا <code>bun run lint</code>. وكل شيء آخر، بما في ذلك حدث JSON مشوّه أو <code>jq</code> غير موجود، يُحجب بالخروج بـ <code>2</code>.</p>
<pre><code class="language-bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-keyword">if</span> ! jq -e -s <span class="hljs-string">&#x27;
  length == 1 and
  (.[0] | type == &quot;object&quot; and
    .tool_name == &quot;Bash&quot; and
    .tool_input.command == &quot;bun run lint&quot;)
&#x27;</span> &gt;/dev/null; <span class="hljs-keyword">then</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Blocked: expected one Bash event for exactly bun run lint&quot;</span> &gt;&amp;2
  <span class="hljs-built_in">exit</span> 2
<span class="hljs-keyword">fi</span>
<span class="hljs-built_in">exit</span> 0
</code></pre>
<p>يقارن هذا الأمر كاملًا بدلًا من تحليل صيغة الصدفة، لذا يفشل <code>bun run lint &amp;&amp; rm -rf x</code>، والمسافات البادئة، والأغلفة، جميعها. ويبقى عليك الثقة في سكربت الفحص والخطّاف معًا: فالأمر المطابق يشغّل كل ما يحتويه ذلك السكربت. وقبل تثبيته، غذِّ الخطّاف بأحداث صحيحة وأخرى مشوّهة وتحقق من رمزَي الخروج.</p>
<p>أما لقيود الأوامر العادية، فاستخدم <a href="https://code.claude.com/docs/en/permissions#compound-commands">مطابقة الأوامر المركّبة</a> الموثّقة في Claude Code بدلًا من اختبار بادئة مصنوع يدويًا. فقاعدة رفض بـ <code>Bash(rm *)</code> تلتقط <code>cd /tmp &amp;&amp; rm -rf x</code>، لكن الاستدعاءات البديلة مثل <code>/bin/rm</code> تحتاج قواعدها الخاصة. واستخدم ضوابط نظام الملفات في العزل الرملي (sandbox) عندما يكون الحد الفاصل هو ما يمكن حذفه، بصرف النظر عن صيغة الأمر.</p>
<p>يمكن أن تسكن الخطّافات في جملة مواضع. وتُدمج كلها، ويعمل كل خطّاف مطابق على التوازي، بلا ترتيب مضمون:</p>
<ul>
<li>ملفات الإعدادات: <code>~/.claude/settings.json</code> لك عبر المشاريع، و<code>.claude/settings.json</code> للمشروع (مُودَع، فيصل إلى فريقك)، و<code>.claude/settings.local.json</code> لك في هذا المشروع وحده. وإذا تعارض الإعداد نفسه بين المستويات، فالأسبقية تجري: المستخدم، ثم المشروع، ثم المحلي، ثم علامة سطر الأوامر، ثم السياسة.</li>
<li>السياسة المُدارة (إعدادات تدفعها مؤسسة إلى كل جهاز)، حيث يتجاهل <code>allowManagedHooksOnly</code> كل ما عداها.</li>
<li>ترويسة (frontmatter) المهارات والوكلاء، أي كتلة YAML في أعلى تلك الملفات. (انظر <a href="https://stevekinney.com/courses/ai-development-setup/skill-configuration">تهيئة المهارات</a> و<a href="https://stevekinney.com/courses/ai-development-setup/subagent-configuration">تهيئة الوكلاء الفرعيين</a>.)</li>
<li>ملف <code>hooks/hooks.json</code> الخاص بإضافة. (الإضافة حزمة من المهارات والخطّافات والوكلاء تثبّتها معًا.)</li>
</ul>
<p>وبعض الحقول الجديرة بالمعرفة:</p>
<ul>
<li><code>args</code>: يشغّل الأمر بصيغة exec، بلا صدفة وسيطة، وهو أكثر أمانًا عندما تحتوي المدخلات على أحرف غريبة.</li>
<li><code>if</code>: يرشّح باستخدام صيغة قواعد الصلاحيات. وهو بذل أفضل جهد، فلا تعتمد عليه لمنح أو رفض صارم.</li>
<li>ثبّت مطابِقاتك لأسماء MCP والإضافات، مثل <code>^mcp__x__y$</code>، وإلا فقد يطابق اسم قصير أكثر مما قصدت. (خادم MCP برنامج يضيف أدوات إلى المنصة عبر <a href="https://modelcontextprotocol.io/">بروتوكول سياق النموذج</a>.)</li>
</ul>
<h2 id="الخطافات-والصلاحيات">الخطّافات والصلاحيات</h2>
<p>لكل جانب الكلمة الأخيرة في شيء مختلف. فللخطّاف الكلمة الأخيرة في <em>الحجب</em>: فالخروج بـ <code>2</code> (أو رفض JSON) يوقف النداء حتى لو كانت قواعد الصلاحيات تسمح به. ولقواعد الصلاحيات (إعدادات تسمح بنداءات أدوات محددة أو تسأل عنها أو ترفضها) الكلمة الأخيرة في <em>السماح</em>.</p>
<p>فلا يستطيع الخطّاف منح ما ترفضه قاعدة صلاحيات. وتحلّ قواعد الصلاحيات الرفض أولًا، ثم السؤال، ثم السماح، ويفوز أول تطابق. والرفض في أي مستوى يتغلب على كل المستويات الأخرى، وخطّاف <code>PreToolUse</code> الذي يعيد <code>allow</code> لا يتجاوز قاعدة رفض أو سؤال مطابقة. وهذا ما يجعل «اسمح بـ <code>Bash</code>، ثم احجب أوامر محددة بخطّاف» نمطًا موثّقًا. انظر <a href="https://code.claude.com/docs/en/permissions">توثيق الصلاحيات</a> للقواعد الكاملة.</p>
<p>استخدم خطّافًا حين لا يكون «عادةً» كافيًا. واستخدم قاعدة صلاحيات حين يكون الجواب نعم أو لا صارمًا.</p>
`,d={book:o,chapter:e,chapterTitle:s,slug:n,title:c,headings:t,html:a};export{o as book,e as chapter,s as chapterTitle,d as default,t as headings,a as html,n as slug,c as title};
