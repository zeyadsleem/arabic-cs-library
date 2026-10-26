const e="kinney",o="ai-development-setup",d="تهيئة بيئة التطوير بالذكاء الاصطناعي",s="claude-code-and-codex-together",n="Claude Code و Codex معًا (Claude Code and Codex, Together)",c=[{depth:2,id:"نداء-codex-من-claude-code",text:"نداء Codex من Claude Code"},{depth:2,id:"نداء-claude-code-من-codex",text:"نداء Claude Code من Codex"},{depth:2,id:"أمور-ستزعجك",text:"أمور ستُزعجك"}],a=`<p>اقتران وكيلين يبدو كترقية مجانية. وهو ليس كذلك، إلا إن كنت واضحًا في سبب فعلك ذلك. مدّ يدك إلى الوكيل الآخر لأنه <em>مختلف</em>، لا لأنه أفضل. فالنموذج من مختبر آخر يفشل في مواضع أخرى، فأنت تشتري أخطاءً غير مترابطة، لا ذكاءً إضافيًا.</p>
<p>النسخة المختصرة: كل مسار تقريبًا يستدعي الوضع بلا واجهة للوكيل الآخر—<code>claude -p &quot;…&quot;</code> أو <code>codex exec</code>، وكل منهما يشغّل جلسة واحدة غير تفاعلية ثم يخرج. وحتى الإضافات تغلّف ذلك النداء. والاستثناء الحقيقي الوحيد هو <code>claude mcp serve</code>، المشروح أدناه. والعمل الحقيقي هو احتواء مخرجات الوكيل الآخر، وصندوق رماله (sandbox)، وفاتورته.</p>
<h2 id="نداء-codex-من-claude-code">نداء Codex من Claude Code <span class="content-anchor" id="calling-codex-from-claude-code"></span></h2>
<p>هناك مساران.</p>
<ul>
<li><strong>الطريقة السهلة</strong>: <a href="https://github.com/openai/codex-plugin-cc">إضافة Codex الرسمية لـ Claude Code</a> من OpenAI. و <code>/codex:review</code> و <code>/codex:adversarial-review</code> مراجعتان للقراءة فقط. و <code>/codex:rescue</code> يسلّم Codex مهمة عبر وكيل فرعي. وتأخذ المهام الطويلة <code>--background</code>، ثم <code>/codex:status</code> و <code>/codex:result</code>. وهي تقود تثبيتك المحلي لـ Codex وتسجيل دخولك.</li>
<li><strong>طريقة افعلها بنفسك</strong>: <code>codex exec --sandbox read-only</code>. و <code>codex exec</code> هو الوضع بلا واجهة في Codex: يشغّل جلسة واحدة غير تفاعلية ثم يخرج. ثبّت صندوق الرمل صراحةً: فتهيئة المستخدم المحمّلة قد تستبدل الافتراضي.</li>
</ul>
<pre><code class="language-bash">verdict_file=$(<span class="hljs-built_in">mktemp</span>) || <span class="hljs-built_in">exit</span> 1
<span class="hljs-built_in">trap</span> <span class="hljs-string">&#x27;rm -f &quot;$verdict_file&quot;&#x27;</span> EXIT
<span class="hljs-keyword">if</span> ! codex <span class="hljs-built_in">exec</span> --sandbox read-only --ephemeral -o <span class="hljs-string">&quot;<span class="hljs-variable">$verdict_file</span>&quot;</span> <span class="hljs-string">&quot;Is the retry path in src/queue.ts safe?&quot;</span> &lt; /dev/null; <span class="hljs-keyword">then</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Review process failed&quot;</span> &gt;&amp;2
  <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>
<span class="hljs-keyword">if</span> [ ! -s <span class="hljs-string">&quot;<span class="hljs-variable">$verdict_file</span>&quot;</span> ]; <span class="hljs-keyword">then</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Review produced no verdict&quot;</span> &gt;&amp;2
  <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>
<span class="hljs-built_in">cat</span> <span class="hljs-string">&quot;<span class="hljs-variable">$verdict_file</span>&quot;</span>
</code></pre>
<p>ذلك يثبّت صندوق رمل صدفةً للقراءة فقط (<code>--sandbox read-only</code>)، ويشغّل سؤالًا واحدًا بلا جلسة محفوظة (<code>--ephemeral</code>)، ويكتب الإجابة النهائية فقط إلى ملف (<code>-o</code>)، ويغلق المدخل القياسي. وبعض العادات تجعله موثوقًا:</p>
<ul>
<li><strong>اقرأ ملف <code>-o</code>، لا التدفّق</strong>: فهو يحوي الرسالة النهائية فقط. أضِف <code>--output-schema schema.json</code> حين تحتاج الشيفرة إلى التصرّف بناءً على الإجابة.</li>
<li><strong>أغلق المدخل القياسي وتحقق من الملف</strong>: يُلحق <code>codex exec</code> أي شيء على المدخل القياسي بطلبك. وحين يشغّله وكيل آخر أو سكربت، قد لا يُغلق المدخل القياسي أبدًا، فينتظر Codex إلى الأبد أو يخرج بالرمز <code>0</code> دون أن يفعل شيئًا، مطبوعًا فقط <code>Reading additional input from stdin...</code> (<a href="https://developers.openai.com/codex/noninteractive">وثائق <code>codex exec</code></a> تغطّي سلوك المدخل القياسي). أعِد توجيه المدخل القياسي من <code>/dev/null</code>، واكتب إلى مسار <code>mktemp</code> جديد في كل مرة كي لا يعيد نداء فاشل استخدام حكم سابق، واطلب نجاح الخروج وملفًا غير فارغ معًا. فالمراجع الذي لم ينتج شيئًا لم يوافق على شيء. ويغطّي <a href="https://stevekinney.com/courses/ai-development-setup/verification-and-evidence#agent-reviewers">مراجعو الوكلاء</a> استخدام الوكلاء كمراجعين.</li>
<li><strong>تحكّم في التهيئة</strong>: يعطّل <code>--ephemeral</code> استمرارية الجلسة فقط. أضِف <code>--ignore-user-config</code> حين يجب أن تستبعد المراجعة تهيئة المستخدم وخوادم MCP الخاصة بها أيضًا، كما يصف <a href="https://learn.chatgpt.com/docs/non-interactive-mode#permissions-and-safety">مرجع الوضع غير التفاعلي</a>. راجع أي تهيئة مشروع متبقية والأدوات الممكّنة بشكل منفصل؛ فصندوق رمل الصدفة لا يقيّد خدمة MCP خارجية.</li>
<li><strong>احتوِه</strong>: استدعِه من <a href="https://stevekinney.com/courses/ai-development-setup/subagents">وكيل فرعي</a> (وكيل مساعد بسياقه الجديد الخاص) أو من <a href="https://stevekinney.com/courses/ai-development-setup/skills">مهارة</a> تعمل بـ <code>context: fork</code>، فيبقى ناتج Codex خارج سياقك الرئيسي. والمهارة العادية تُحمَّل في محادثتك الحالية، فلا تفعل ذلك.</li>
</ul>
<h2 id="نداء-claude-code-من-codex">نداء Claude Code من Codex</h2>
<ul>
<li><strong>لرأي ثانٍ</strong>: شغّل <code>claude -p &quot;…&quot; --permission-mode plan --output-format json --max-turns 5 --max-budget-usd 1</code>. وضع الخطة يمنعه من التحرير. والحدود تمنعه من التشعّب: يحسب <code>--max-turns</code> دورات الوكيل (كل طلب نموذج ونداءات الأدوات التي يجريها)، ويحدّ <code>--max-budget-usd</code> الإنفاق. أضِف <code>--json-schema</code> للحصول على إجابة متحقَّق منها، وتعود في <code>.structured_output</code>.</li>
<li><strong>لأدوات Claude Code، لا لحكمه</strong>: <code>codex mcp add claude-code -- claude mcp serve</code>، وهذا يشغّل Claude Code كخادم MCP (برنامج يضيف أدوات إلى إطار). فيحصل Codex على أدوات Claude Code، بما فيها Bash و Edit و Write، لكن لا على حكمه. وهذه قوة كبيرة تُعرّضها، فحدّد نطاقها عن قصد.</li>
<li><strong>كإضافة</strong>: لا توجد إضافة رسمية وجدتها. وإضافة المجتمع <a href="https://github.com/sendbird/cc-plugin-codex"><code>cc-plugin-codex</code></a> من Sendbird تحاكي إضافة OpenAI (<code>$cc:review</code>, <code>$cc:rescue</code>) وتبدأ <code>claude -p</code> جديدًا لكل نداء.</li>
</ul>
<h2 id="أمور-ستزعجك">أمور ستُزعجك <span class="content-anchor" id="things-that-will-bite-you"></span></h2>
<ul>
<li><strong>صناديق الرمل لا تتعشّش</strong>: صندوق الرمل عزل على مستوى نظام التشغيل لما تستطيع أوامر صدفة الوكيل الوصول إليه. على macOS، لا يستطيع Codex بدء صندوق رماله الخاص داخل صندوق Claude Code (<code>sandbox_apply: Operation not permitted</code>). أخرِج نداء Codex بـ <code>sandbox.excludedCommands</code> ودع Codex يصنع صندوق رمل نفسه.</li>
<li><strong>إعادة التوجيه تُبقي النداء داخل صندوق الرمل</strong>: استبعاد أمر من صندوق رمل Claude Code لا ينجح إن كان الأمر يحوي إعادة توجيه، حتى <code>&lt; /dev/null</code>. لذا مثال <code>codex exec … &lt; /dev/null</code> أعلاه ينجح من الطرفية أو سكربت، لكنه يبقى داخل صندوق الرمل ويفشل حين يشغّله Claude Code مباشرة. ضع إعادة التوجيه في سكربت غلاف صغير خارج المستودع، فلا يغيّر شيء يحرّره الوكيل ما يُشغَّل بلا قيود، واستبعد الغلاف.</li>
<li><strong>صندوق رمل Codex بلا شبكة افتراضيًا</strong>: على <code>claude -p</code> أن يصل إلى Anthropic. فوافق على التصعيد، أو اضبط <code>network_access = true</code> تحت <code>[sandbox_workspace_write]</code>، وهذا يفتح الشبكة لكل ما يشغّله Codex.</li>
<li><strong>فاتورتان</strong>: وجود <code>ANTHROPIC_API_KEY</code> في بيئة Codex ينقل <code>claude -p</code> بهدوء إلى فوترة API حسب الرموز.</li>
<li><strong>زمن الاستجابة</strong>: قد تستغرق الاستشارة دقائق. أعطِ الغلاف مهلة زمنية، وقرّر ما يحدث عند انقضائها.</li>
<li><strong>بوّابات المراجعة تتكرّر</strong>: كلتا الإضافتين (إضافة OpenAI لـ Claude Code وإضافة Sendbird لـ Codex) تقدّمان بوّابة مراجعة اختيارية، وهي خُطّاف يشغّل مراجعة كل مرة يحاول الوكيل التوقّف، وكلتاهما تحذّر من أنها قد تستنزف حدود استخدامك بسرعة.</li>
<li><strong>ثبّت واختبر</strong>: ثبّت النموذج (<code>-m</code>, <code>--model</code>)، وأعِد تشغيل أول استدعاء لك يدويًا بعد ترقية أي من الـ CLI.</li>
</ul>
<p>قضايا صندوق الرمل وبيانات الاعتماد هنا هي نفسها التي تجعل <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder#blast-radius">نطاق الانفجار</a> يستحق التخطيط. امنح الوكيل الثاني أضيق أذونات تتيح له الإجابة مع ذلك.</p>
`,t={book:e,chapter:o,chapterTitle:d,slug:s,title:n,headings:c,html:a};export{e as book,o as chapter,d as chapterTitle,t as default,c as headings,a as html,s as slug,n as title};
