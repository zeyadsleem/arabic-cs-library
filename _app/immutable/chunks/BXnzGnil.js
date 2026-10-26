const n="kinney",s="openclaw",e="OpenClaw: مساعدك الذكي الشخصي",a="acpx-runtime-plugin",t="إضافة ACPX لبيئة التشغيل",o=[{depth:2,id:"ما-هو-acp",text:"ما هو ACP"},{depth:3,id:"لا-يعد-acp-وكيلا-فرعيا",text:"لا يُعدّ ACP وكيلًا فرعيًا"},{depth:2,id:"الخطوة-1-ثبت-الإضافة-وفعلها",text:"الخطوة 1: ثبّت الإضافة وفعّلها"},{depth:2,id:"الخطوة-2-تحقق-من-سلامة-الخلفية",text:"الخطوة 2: تحقّق من سلامة الخلفية"},{depth:2,id:"الخطوة-3-اختر-harness",text:"الخطوة 3: اختر harness"},{depth:2,id:"الخطوة-4-اضبط-acp",text:"الخطوة 4: اضبط ACP"},{depth:3,id:"الأذونات-هي-الجزء-الذي-يستحق-التفكير",text:"الأذونات هي الجزء الذي يستحقّ التفكير"},{depth:3,id:"جسور-الأدوات-توسع-سطح-الهجوم",text:"جسور الأدوات توسّع سطح الهجوم"},{depth:2,id:"الخطوة-5-ابدأ-جلسة",text:"الخطوة 5: ابدأ جلسة"},{depth:3,id:"لمرة-واحدة-مقابل-المستمرة",text:"لمرة واحدة مقابل المستمرة"},{depth:3,id:"التشغيل-من-الوكيل",text:"التشغيل من الوكيل"},{depth:3,id:"ربط-محادثة",text:"ربط محادثة"},{depth:3,id:"التحكم-في-الجلسات-الجارية",text:"التحكّم في الجلسات الجارية"},{depth:2,id:"جربها-بنفسك",text:"جرّبها بنفسك"},{depth:3,id:"قبل-أن-تبدأ",text:"قبل أن تبدأ"},{depth:3,id:"التمرين-1-اختبار-سريع-للقراءة-فقط",text:"التمرين 1: اختبار سريع للقراءة فقط"},{depth:3,id:"التمرين-2-السؤال-نفسه-harness-اثنان",text:"التمرين 2: السؤال نفسه، harness اثنان"},{depth:3,id:"التمرين-3-شاهد-فشل-الكتابة",text:"التمرين 3: شاهد فشل الكتابة"},{depth:3,id:"التمرين-4-دعه-يكتب-بأمان",text:"التمرين 4: دعه يكتب، بأمان"},{depth:3,id:"التمرين-5-جلسة-مستمرة-يمكنك-محادثتها",text:"التمرين 5: جلسة مستمرة يمكنك محادثتها"},{depth:3,id:"التمرين-6-التوجيه-والإلغاء",text:"التمرين 6: التوجيه والإلغاء"},{depth:3,id:"التمرين-7-أثبت-أنه-ليس-وكيلا-فرعيا",text:"التمرين 7: أثبت أنه ليس وكيلًا فرعيًا"},{depth:3,id:"التمرين-8-عطله-عن-قصد",text:"التمرين 8: عطّله عن قصد"},{depth:3,id:"عند-الانتهاء",text:"عند الانتهاء"},{depth:2,id:"حدود-ينبغي-أن-تعرفها",text:"حدود ينبغي أن تعرفها"},{depth:2,id:"acp-وعقد-mac",text:"ACP وعُقد Mac"},{depth:3,id:"ما-يعمل-وأين",text:"ما يعمل وأين"},{depth:3,id:"ما-يعمل-فعلا-codex-الأصلي-على-عقدة",text:"ما يعمل فعلًا: Codex الأصلي على عقدة"},{depth:3,id:"وماذا-عن-claude-code-على-جهاز-mac",text:"وماذا عن Claude Code على جهاز Mac؟"},{depth:3,id:"الاختيار",text:"الاختيار"},{depth:2,id:"استخدامه-على-railway",text:"استخدامه على Railway"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"اختيار-المسار-الصحيح",text:"اختيار المسار الصحيح"}],c=`<p>يستطيع OpenClaw أن يفعل الكثير بمفرده، لكن أفضل من ينفّذ مهمة ما قد يكون وكيلًا آخر تمامًا: Claude Code يعيد هيكلة مستودع، أو Codex يعمل على إصلاح خطأ، أو Gemini CLI يقرأ قاعدة شيفرة. لا تريد أن تعيد بناء هذه الأدوات بنفسك، بل تريد أن <strong>يُسلّم OpenClaw المهمة إليها</strong> ويتتبّع النتيجة.</p>
<p>هذا ما تفعله إضافة <code>@openclaw/acpx</code>. إنها الخلفية (backend) الرسمية التي تتيح لـ OpenClaw تشغيل وكيل برمجة خارجي (يُسمّى <strong>harness</strong>) وإدارته كجلسة.</p>
<h2 id="ما-هو-acp">ما هو ACP</h2>
<p>‏<strong>ACP</strong> هو بروتوكول عميل الوكيل (Agent Client Protocol)، وهو طريقة قياسية ليتحدّث برنامج مع وكيل. وفي OpenClaw يشير هذا الاسم إلى اتجاهين متعاكسين، والاسم المشترك بينهما يسبّب الالتباس:</p>
<table>
<thead>
<tr>
<th>الاتجاه</th>
<th>ما يعنيه</th>
<th>الأمر</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>OpenClaw → harness</strong></td>
<td>يشغّل OpenClaw وكيل برمجة خارجيًا ويشرف عليه</td>
<td><code>/acp spawn</code></td>
</tr>
<tr>
<td><strong>المحرّر → OpenClaw</strong></td>
<td>يستخدم محرّر يدعم ACP برنامج OpenClaw كوكيل له</td>
<td><code>openclaw acp</code></td>
</tr>
</tbody>
</table>
<p>يتناول هذا الدرس الاتجاه الأول، أي <strong>الصادر</strong>. وإضافة ACPX هي القطعة التي تجعله يعمل. وفي حالة Claude Code تبدو المنظومة كاملة هكذا:</p>
<pre><code>OpenClaw ACP session control  →  ACPX plugin  →  Claude ACP adapter  →  Claude Code
</code></pre>
<p>يشرف OpenClaw على العمل ويكشف أدوات التحكّم. أما التنفيذ الفعلي فيقوم به الـ harness، مستخدمًا أدواته الخاصة وأذوناته الخاصة وتسجيل دخوله الخاص.</p>
<h3 id="لا-يعد-acp-وكيلا-فرعيا">لا يُعدّ ACP وكيلًا فرعيًا</h3>
<p>يمتلك OpenClaw أيضًا <strong>وكلاء فرعيين</strong> أصليين يعملون داخل بيئة تشغيل OpenClaw نفسها. وهي تبدو مشابهة، لأن كليهما يستخدم أداة التشغيل نفسها، لكنهما شيئان مختلفان:</p>
<table>
<thead>
<tr>
<th></th>
<th>جلسة ACP</th>
<th>وكيل فرعي أصلي</th>
</tr>
</thead>
<tbody>
<tr>
<td>تعمل على</td>
<td>harness خارجي، عبر خلفية</td>
<td>بيئة تشغيل OpenClaw نفسها</td>
</tr>
<tr>
<td>مفتاح الجلسة</td>
<td><code>agent:&lt;agentId&gt;:acp:&lt;uuid&gt;</code></td>
<td><code>agent:&lt;agentId&gt;:subagent:&lt;uuid&gt;</code></td>
</tr>
<tr>
<td>تُتحكَّم بـ</td>
<td><code>/acp ...</code></td>
<td><code>/subagents ...</code></td>
</tr>
<tr>
<td>تُشغَّل بـ</td>
<td><code>sessions_spawn</code> مع <code>runtime: &quot;acp&quot;</code></td>
<td><code>sessions_spawn</code> (الافتراضي)</td>
</tr>
</tbody>
</table>
<p>استخدم ACP عندما يكون المنفّذ الذي تريده harness خارجيًا تحديدًا. واستخدم وكيلًا فرعيًا عندما تريد مجرد تفويض محدود داخل OpenClaw. ويتناول <a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيون والتنسيق</a> هذه الحالات.</p>
<p>وهناك أمر آخر ينبغي ألا تخلط فيه: اختيار طراز <code>openai/gpt-*</code> يشغّل وكيلك على بيئة تشغيل Codex الأصلية في OpenClaw، لا على Codex عبر ACP، وتسمية طراز باسم harness ما لا تجعل شيئًا ما يعمل عبر ACP. وبالنسبة إلى Codex على وجه الخصوص، فإن إضافة Codex الأصلية في OpenClaw هي الافتراضي، أما Codex عبر ACP فهو البديل الصريح، ويُختار عبر <code>runtime: &quot;acp&quot;</code> و<code>agentId: &quot;codex&quot;</code>.</p>
<h2 id="الخطوة-1-ثبت-الإضافة-وفعلها">الخطوة 1: ثبّت الإضافة وفعّلها</h2>
<pre><code class="language-bash">openclaw plugins install @openclaw/acpx
openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.enabled <span class="hljs-literal">true</span>
</code></pre>
<p>إذا كنت قد قيّدت الإضافات عبر <code>plugins.allow</code>، فيجب أن يكون <code>acpx</code> على القائمة. وإذا منعته عبر <code>plugins.deny</code>، أو أردت العودة إلى الإضافة المضمّنة بدلًا من بناء محلي، فشغّل الأمرين أعلاه مرة أخرى.</p>
<h2 id="الخطوة-2-تحقق-من-سلامة-الخلفية">الخطوة 2: تحقّق من سلامة الخلفية</h2>
<p>من أي دردشة مع وكيلك، شغّل:</p>
<pre><code>/acp doctor
</code></pre>
<p>يخبرك بما إذا كانت الخلفية مفعّلة وسليمة. ويخبرك أيضًا إذا كان <code>acpx</code> غائبًا عن <code>plugins.allow</code>، أو إذا فشل محوّل (adapter) في التنزيل أو التشغيل.</p>
<p>وهذا شكل تثبيت سليم على بوابة جديدة، قبل تشغيل أي جلسة (المعرّفات مختصرة):</p>
<pre><code>configuredBackend: acpx
activeRuntimeSessions: 0
runtimeIdleTtlMs: 0
evictedIdleRuntimes: 0
activeTurns: 0
queueDepth: 0
turnLatencyMs: avg=0, max=0
turnCounts: completed=0, failed=0
errorCodes: (none)
registeredBackend: acpx
runtimeDoctor: ok (embedded ACP runtime ready)
runtimeDoctorDetail: agent=codex
runtimeDoctorDetail: command=/usr/local/bin/node /data/.openclaw/acpx/codex-acp-wrapper.mjs --openclaw-acpx-lease-id probe-&lt;lease-id&gt; --openclaw-gateway-instance-id &lt;gateway-instance-id&gt;
runtimeDoctorDetail: cwd=/data/.openclaw/workspace
runtimeDoctorDetail: protocolVersion=1
healthy: yes
capabilities: session/set_config_option, session/set_mode, session/status
</code></pre>
<p>وفي واجهة التحكّم (Control UI)، يظهر التقرير نفسه كردٍّ من وكيلك:</p>
<p><img src="/arabic-cs-library/images/kinney/3cc7484b0e0974f2.webp" alt="دردشة في واجهة التحكّم يردّ فيها الوكيل على أمر acp doctor بتقرير خلفية ACPX، وينتهي بالعبارة healthy: yes"></p>
<p>والأسطر التي تستحقّ القراءة:</p>
<ul>
<li><strong><code>healthy: yes</code></strong> و**<code>runtimeDoctor: ok</code>** تعنيان أن OpenClaw شغّل محوّلًا وأكمل مصافحة البروتوكول. وهذا هو السطر الذي تبحث عنه.</li>
<li><strong><code>registeredBackend: acpx</code></strong> يؤكّد أن الإضافة هي الخلفية النشطة.</li>
<li><strong><code>agent=codex</code></strong> هو الـ harness الذي استخدمه فحص السلامة. وهو وكيل التحقّق (probe agent)، وافتراضيًا يكون أول عنصر في <code>acp.allowedAgents</code>، أو <code>codex</code> إذا لم تضبط أي عنصر. والنتيجة السليمة تخبرك عن ذلك المحوّل وحده. وللفحص من harness آخر، اضبط <code>probeAgent</code> (انظر الخطوة 4).</li>
<li><strong><code>command=…/codex-acp-wrapper.mjs</code></strong> هو سكربت تشغيل صغير أنشأته ACPX داخل مجلد حالة البوابة. وعلى قالب <a href="https://railway.com/?referralCode=kinney">Railway</a> يكون هذا المجلد <code>/data/.openclaw</code>، وهو موجود على وحدة التخزين (volume).</li>
<li><strong>العدّادات</strong> (<code>activeRuntimeSessions</code> و<code>turnCounts</code> و<code>errorCodes</code> وما شابهها) كلها صفر لأن شيئًا لم يُشغَّل بعد. وهي الطريقة التي سترى بها النشاط لاحقًا.</li>
</ul>
<p>لا يُثبت الفحص النظيف أن الـ harness مسجّل الدخول. إنه يُثبت أن المحوّل يبدأ ويتحدّث بروتوكول ACP. أما تسجيل الدخول الغائب أو المنتهي فيظهر عند تشغيل دورة حقيقية (turn)، وهذا بالضبط ما تهدف إليه التمارين أدناه.</p>
<h2 id="الخطوة-3-اختر-harness">الخطوة 3: اختر harness</h2>
<p>لكل harness معرّف تمرّره عند تشغيل جلسة. وهذه أكثرها احتمالًا للاستخدام:</p>
<table>
<thead>
<tr>
<th>المعرّف</th>
<th>harness</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>claude</code></td>
<td>Claude Code</td>
</tr>
<tr>
<td><code>codex</code></td>
<td>Codex CLI</td>
</tr>
<tr>
<td><code>gemini</code></td>
<td>Gemini CLI</td>
</tr>
<tr>
<td><code>copilot</code></td>
<td>GitHub Copilot CLI</td>
</tr>
<tr>
<td><code>cursor</code></td>
<td>Cursor CLI</td>
</tr>
<tr>
<td><code>opencode</code></td>
<td>OpenCode</td>
</tr>
<tr>
<td><code>openclaw</code></td>
<td>جسر ACP الخاص بـ OpenClaw</td>
</tr>
</tbody>
</table>
<p>وهناك الكثير غيرها (Droid وKimi وKiro وQwen Code وغيرها). والقائمة الكاملة موجودة في وثائق الإضافة.</p>
<p>وبضعة أمور ينبغي معرفتها عن هذه الـ harnesses:</p>
<ul>
<li><strong>تنزّل ACPX المحوّلات نيابةً عنك.</strong> فمحوّلات ACP الخاصة بـ Claude وCodex تُجلب عبر <code>npx</code> عند أول استخدام، فلا تثبّتها يدويًا. وإذا فشل التنزيل، أخبرك <code>/acp doctor</code> بذلك.</li>
<li><strong>يجب أن يعمل الـ harness نفسه على مضيف البوابة.</strong> فـ ACP ليس سوى البروتوكول؛ فهو لا يثبّت Claude Code ولا يسجّل دخولك. ويجب أن تكون واجهة سطر الأوامر (CLI) موجودة ومُوثَّقة على الجهاز (وتحت حساب نظام التشغيل) الذي يشغّل البوابة.</li>
<li><strong>معرّفات الطرازات غير قابلة للنقل.</strong> فالطراز الموجود في Claude Code ليس بالضرورة صالحًا في Codex، لذا تحقّق من الطراز مقابل الـ harness الذي اخترته.</li>
</ul>
<h2 id="الخطوة-4-اضبط-acp">الخطوة 4: اضبط ACP</h2>
<p>هناك طبقتان من الإعدادات. الأولى هي كتلة <code>acp</code> الأساسية، وهي التي تفعّل الميزة وتحدّد أي harnesses مسموح بها:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  acp<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    enabled<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    backend<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;acpx&#x27;</span><span class="hljs-punctuation">,</span>
    defaultAgent<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;codex&#x27;</span><span class="hljs-punctuation">,</span>
    allowedAgents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;claude&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;codex&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;gemini&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;opencode&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يستحق <code>allowedAgents</code> أن تضبطه. إنه قائمة السماح بالـ harnesses التي يجوز لـ OpenClaw تشغيلها، بحيث لا تكشف إلا ما ثبّتّه فعلًا وتريد استخدامه.</p>
<p>أما الطبقة الثانية فتقع تحت <code>plugins.entries.acpx.config</code>. وهذه هي المفاتيح المهمة:</p>
<table>
<thead>
<tr>
<th>المفتاح</th>
<th>الافتراضي</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>permissionMode</code></td>
<td><code>approve-reads</code></td>
<td>ما يجوز للـ harness فعله دون سؤال. انظر أدناه.</td>
</tr>
<tr>
<td><code>nonInteractivePermissions</code></td>
<td><code>fail</code></td>
<td>ما يحدث عندما يظهر طلب موافقة لكن لا يمكن لأحد الإجابة عنه.</td>
</tr>
<tr>
<td><code>timeoutSeconds</code></td>
<td><code>120</code></td>
<td>الحد الأقصى لعمليات البدء والتحكّم.</td>
</tr>
<tr>
<td><code>probeAgent</code></td>
<td>أول وكيل مسموح، أو <code>codex</code></td>
<td>الـ harness الذي يستخدمه فحص السلامة.</td>
</tr>
<tr>
<td><code>agents.&lt;id&gt;.command</code> / <code>.args</code></td>
<td>مدمج</td>
<td>تجاوز طريقة تشغيل الـ harness.</td>
</tr>
<tr>
<td><code>pluginToolsMcpBridge</code></td>
<td>معطّل</td>
<td>كشف أدوات الإضافات المثبّتة لجلسات ACP.</td>
</tr>
<tr>
<td><code>openClawToolsMcpBridge</code></td>
<td>معطّل</td>
<td>كشف بعض أدوات OpenClaw المدمجة (بدءًا بـ <code>cron</code>) لجلسات ACP.</td>
</tr>
</tbody>
</table>
<p>اضبطها عبر <code>openclaw config set</code>:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.timeoutSeconds 180
openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.probeAgent claude
</code></pre>
<h3 id="الأذونات-هي-الجزء-الذي-يستحق-التفكير">الأذونات هي الجزء الذي يستحقّ التفكير</h3>
<p>يأخذ <code>permissionMode</code> واحدة من ثلاث قيم:</p>
<table>
<thead>
<tr>
<th>القيمة</th>
<th>السلوك</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>approve-reads</code></td>
<td>القراءة تلقائية. أما الكتابة وأوامر الصدفة فتحتاج إلى طلب موافقة. (الافتراضي)</td>
</tr>
<tr>
<td><code>approve-all</code></td>
<td>كل شيء تلقائي: كل عمليات كتابة الملفات وكل أوامر الصدفة.</td>
</tr>
<tr>
<td><code>deny-all</code></td>
<td>يُرفض كل طلب إذن.</td>
</tr>
</tbody>
</table>
<p>وهنا المفاجأة: جلسة ACP <strong>غير تفاعلية دائمًا</strong>، لأنه لا توجد طرفية (terminal) يسألك فيها الـ harness. لذا مع الإعدادات الافتراضية، حين يريد الـ harness كتابة ملف أو تشغيل أمر لأول مرة، لن يوجد من يوافق عليه، فيُجهَض التشغيل بـ <code>PermissionPromptUnavailableError</code>.</p>
<p>ولديك بضع طرق للتعامل مع ذلك:</p>
<ul>
<li><strong>العمل للقراءة فقط</strong> (مراجعة شيفرة، أو شرح وحدة، أو بحث) يعمل جيدًا مع الإعدادات الافتراضية.</li>
<li><strong>الفشل اللطيف</strong> عبر ضبط <code>nonInteractivePermissions</code> على <code>deny</code>. فتُرفض الأفعال المحظورة ويستمر الـ harness بدلًا من أن يُجهَض.</li>
<li><strong>الكتابة والأوامر</strong> تحتاج إلى <code>approve-all</code>. إنه إعداد «كسر الزجاج» للطوارئ، ويصنّفه <code>openclaw security audit</code> كخيار خطير، لذا تصرّف بحذر ووعي.</li>
</ul>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.permissionMode approve-all
</code></pre>
<p>وإذا استخدمته فعلًا، فحدّ من نطاق الضرر. وجّه الجلسات إلى نسخة مؤقتة قابلة للحذف أو شجرة عمل (worktree) عبر <code>cwd</code>، واجعل <code>acp.allowedAgents</code> قصيرة، ثم أعدها إلى <code>approve-reads</code> عند الانتهاء.</p>
<blockquote>
<p><strong>هذه الأذونات منفصلة عن موافقات OpenClaw</strong></p>
<p>أذونات ACPX ليست هي نفسها <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#layer-3-exec-approvals">موافقات التنفيذ</a> الخاصة بـ OpenClaw، وليست إحداهما بديلًا عن الأخرى. فللـ harness نموذج أذونات خاص به، وتنعكس عليه أذونات ACPX. تحقّق مما منحته فعلًا في كل طبقة.</p>
</blockquote>
<h3 id="جسور-الأدوات-توسع-سطح-الهجوم">جسور الأدوات توسّع سطح الهجوم</h3>
<p>افتراضيًا، لا تكون أدوات OpenClaw متاحة داخل الـ harness. ويغيّر <code>pluginToolsMcpBridge</code> ذلك عبر كشف كل أداة إضافة نشطة كخادم MCP. وهذا يضع تلك الأدوات في متناول وكيل خارجي، بحدّ الثقة نفسه الذي ينطبق على تشغيل الإضافات داخل OpenClaw نفسه. راجع ما هو مثبّت قبل تفعيله، ولا تجسر إلا ما يحتاجه سير العمل.</p>
<h2 id="الخطوة-5-ابدأ-جلسة">الخطوة 5: ابدأ جلسة</h2>
<p>من الدردشة، شغّل جلسة بمعرّف الـ harness:</p>
<pre><code>/acp spawn claude
</code></pre>
<p>ثم أضف أعلامًا (flags) للتحكّم في سلوكها:</p>
<table>
<thead>
<tr>
<th>العلم</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--mode oneshot|persistent</code></td>
<td>مهمة لمرة واحدة، أو جلسة تستمر</td>
</tr>
<tr>
<td><code>--cwd &lt;absolute-path&gt;</code></td>
<td>مجلد العمل الذي يعمل فيه الـ harness</td>
</tr>
<tr>
<td><code>--label &lt;name&gt;</code></td>
<td>اسم يمكّنك من التمييز بين الجلسات</td>
</tr>
<tr>
<td><code>--bind here|off</code></td>
<td>تثبيت المحادثة الحالية بالجلسة</td>
</tr>
<tr>
<td><code>--thread auto|here|off</code></td>
<td>إنشاء خيط أو موضوع للجلسة أو استخدامه</td>
</tr>
</tbody>
</table>
<p>لا يمكن استخدام <code>--bind</code> و<code>--thread</code> في الأمر نفسه. على سبيل المثال:</p>
<pre><code>/acp spawn codex --mode oneshot --thread off
/acp spawn codex --mode persistent --thread auto
/acp spawn codex --bind here
</code></pre>
<h3 id="لمرة-واحدة-مقابل-المستمرة">لمرة واحدة مقابل المستمرة</h3>
<ul>
<li><strong>الجلسة لمرة واحدة</strong> تنفّذ مهمة محدودة. ويملك الوكيل الأب النتيجة ويقرّر كيف يخبرك بها.</li>
<li><strong>الجلسة المستمرة</strong> تُبقي الجلسة حيّة بحيث تذهب الرسائل اللاحقة إلى الـ harness نفسه مع بقاء حالته سليمة. وهذا ما تريده لجلسة برمجة متواصلة.</li>
</ul>
<h3 id="التشغيل-من-الوكيل">التشغيل من الوكيل</h3>
<p>يستطيع وكيلك بدء هذه الجلسات بنفسه عبر أداة <code>sessions_spawn</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">sessions_spawn</span>({
  <span class="hljs-attr">runtime</span>: <span class="hljs-string">&#x27;acp&#x27;</span>,
  <span class="hljs-attr">agentId</span>: <span class="hljs-string">&#x27;claude&#x27;</span>,
  <span class="hljs-attr">task</span>: <span class="hljs-string">&#x27;Review the open TODOs in src/ and summarize which are still relevant.&#x27;</span>,
  <span class="hljs-attr">cwd</span>: <span class="hljs-string">&#x27;/workspace/my-project&#x27;</span>,
  <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;todo-review&#x27;</span>,
});
</code></pre>
<p>وهي تقبل هذه المعاملات: <code>task</code> و<code>runtime</code> و<code>agentId</code> و<code>thread</code> و<code>mode</code> و<code>cwd</code> و<code>label</code> و<code>resumeSessionId</code> و<code>streamTo</code> و<code>model</code> و<code>thinking</code>. وفي هذا الشكل، تكون <code>mode</code> إما <code>&quot;run&quot;</code> (الافتراضي، لمرة واحدة) أو <code>&quot;session&quot;</code> (مستمرة، وتتطلّب <code>thread: true</code>). واذكر <code>runtime: &quot;acp&quot;</code> صراحة دائمًا؛ فبدونها تحصل على وكيل فرعي أصلي.</p>
<p>ولاستئناف جلسة harness سابقة بدلًا من البدء من جديد، مرّر معرّفها كـ <code>resumeSessionId</code>. ويعيد OpenClaw تشغيل تاريخ تلك الجلسة، لكن فقط للمعرّفات التي تخصّ الطالب وتطابق الخلفية والـ harness. ولا يُعدّ الاستئناف مثل إعادة تشغيل سياق OpenClaw كله داخل الـ harness.</p>
<h3 id="ربط-محادثة">ربط محادثة</h3>
<p>مع <code>--bind here</code> تُثبَّت الدردشة بجلسة ACP. وكل ما ترسله يذهب إلى الـ harness، ويُعيد <code>/new</code> و<code>/reset</code> ضبطها في مكانها، ويزيل <code>/acp close</code> الربط. وتبقى عمليات الربط صالحة بعد إعادة تشغيل البوابة.</p>
<p>لا يعمل هذا إلا على القنوات التي تدعم ربط المحادثة الحالية. وفي غيرها يخبرك OpenClaw بأن ذلك غير مدعوم. أما الربط بـ <em>خيط</em> (<code>--thread</code>) فنطاقه أضيق: في وقت كتابة هذا الدرس يعني خيوط وقنوات Discord، وموضوعات Telegram (موضوعات المنتدى في المجموعات، وموضوعات الرسائل الخاصة). وإذا أردت أن تكون محادثة Telegram أو Discord دائمًا لـ harness معيّن، فيمكنك أيضًا جعل ذلك دائمًا في الإعدادات:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  agents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    ownership<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;explicit&#x27;</span><span class="hljs-punctuation">,</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      claude<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        runtime<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          type<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;acp&#x27;</span><span class="hljs-punctuation">,</span>
          acp<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> agent<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;claude&#x27;</span><span class="hljs-punctuation">,</span> backend<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;acpx&#x27;</span><span class="hljs-punctuation">,</span> mode<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;persistent&#x27;</span><span class="hljs-punctuation">,</span> cwd<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;/workspace/repo&#x27;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  bindings<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      type<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;acp&#x27;</span><span class="hljs-punctuation">,</span>
      agentId<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;claude&#x27;</span><span class="hljs-punctuation">,</span>
      match<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        channel<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;telegram&#x27;</span><span class="hljs-punctuation">,</span>
        accountId<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;default&#x27;</span><span class="hljs-punctuation">,</span>
        peer<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> kind<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;group&#x27;</span><span class="hljs-punctuation">,</span> id<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;-1001234567890:topic:42&#x27;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      acp<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> label<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;claude-repo&#x27;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تُحلّ الإعدادات بهذا الترتيب: قيم <code>acp.*</code> الخاصة بالربط، ثم <code>runtime.acp.*</code> الخاصة بالوكيل، ثم الإعدادات الافتراضية العامة لـ <code>acp</code>.</p>
<h3 id="التحكم-في-الجلسات-الجارية">التحكّم في الجلسات الجارية</h3>
<p>يحتوي الأمر <code>/acp</code> على أوامر فرعية أكثر من <code>spawn</code>:</p>
<pre><code>/acp spawn | cancel | steer | close | sessions | status | set-mode | set | cwd
     | permissions | timeout | model | reset-options | doctor | install | help
</code></pre>
<p>استخدم <code>cancel</code> لإيقاف تشغيل، و<code>steer</code> لوضع تعليمة متابعة في قائمة الانتظار تُنفَّذ بعد انتهاء الدورة الحالية، و<code>sessions</code> و<code>status</code> لرؤية ما يجري تشغيله، و<code>close</code> لإنهاء جلسة. وتتطلّب أدوات التحكّم في وقت التشغيل هوية المالك، لذا عليك أن تكون مالك الأمر (انظر <a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">اختيار سياسة الرسائل الخاصة</a>). شغّل <code>/acp help</code> لمعرفة الصيغة الدقيقة لكل أمر، لأنها قد تختلف باختلاف الإصدار.</p>
<p>عند انتهاء تشغيل لمرة واحدة، تُبلَّغ النتيجة إلى الوكيل الأب، الذي يعيد عادةً صياغتها بأسلوبه. فإتمام العمل وتسليم الرسالة حدثان منفصلان، لذا لا يضمن انتهاء الـ harness ظهورَ رسالة في دردشتك.</p>
<h2 id="جربها-بنفسك">جرّبها بنفسك</h2>
<p>لا تكفي القراءة عن ACP وحدها. تمتدّ هذه التمارين من اختبار سريع غير ضار إلى harness يكتب شيفرة، بحيث ترى بنفسك كل سلوك وصفناه أعلاه. ونفّذها بالترتيب، لأن كل تمرين يبني على الإعداد الذي قبله.</p>
<h3 id="قبل-أن-تبدأ">قبل أن تبدأ</h3>
<p>أنشئ مجلدًا مؤقتًا فارغًا ليعمل فيه الـ harness. وكل عملية كتابة أدناه تحدث هنا، ولا مكان آخر:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p ~/acp-playground
</code></pre>
<p>وعلى قالب Railway، أنشئه على وحدة التخزين باسم مستخدم البوابة بدلًا من ذلك:</p>
<pre><code class="language-bash">railway ssh --service openclaw -- as-node <span class="hljs-built_in">mkdir</span> -p /data/scratch/acp-playground
</code></pre>
<p>وأينما وضعته، سجّل <strong>المسار المطلق</strong>. وتسمّيه الأمثلة أدناه <code>&lt;scratch&gt;</code>.</p>
<p>ثم شغّل <code>/acp doctor</code> وتأكّد أنه يقول <code>healthy: yes</code>. واحتفظ بالمخرجات في متناول يدك، لأنك ستقارنها في النهاية. وستحتاج أيضًا إلى أن تكون مالك الأمر، لأن أدوات التحكّم في وقت تشغيل <code>/acp</code> مقصورة على المالك.</p>
<p>ستطلب من وكيلك بدء جلسات بكلمات واضحة. واذكر دائمًا «ACP» وسمِّ الـ harness. وإلا فقد يلجأ الوكيل إلى وكيل فرعي أصلي بدلًا من ذلك، وحينها لن تكون تختبر ما تظن أنك تختبره.</p>
<h3 id="التمرين-1-اختبار-سريع-للقراءة-فقط">التمرين 1: اختبار سريع للقراءة فقط</h3>
<p>يُثبت هذا أن السلسلة كاملة تعمل، من وكيلك إلى الإضافة إلى الـ harness، دون السماح بتغيير أي شيء. وفي الوضع الافتراضي <code>approve-reads</code> تكون القراءة تلقائية، فلا حاجة إلى أي إعداد.</p>
<p>أرسل إلى وكيلك:</p>
<blockquote>
<p>استخدم <code>sessions_spawn</code> مع <code>runtime: &quot;acp&quot;</code> و<code>agentId: &quot;codex&quot;</code> لسرد الملفات في مساحة عملك وتلخيص ما فيها. للقراءة فقط، بلا تغييرات.</p>
</blockquote>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>رد يلخّص مساحة العمل، جاء من الـ harness ونقله وكيلك.</li>
<li>إذا فشل بخطأ توثيق (authentication)، فالـ harness غير مسجّل الدخول على مضيف البوابة. أصلح تسجيل الدخول قبل المتابعة.</li>
<li>شغّل <code>/acp doctor</code> مرة أخرى. ينبغي أن تكون العدّادات قد تحرّكت، وأن يُظهر <code>turnCounts</code> دورة مكتملة.</li>
</ul>
<p>وهذا شكل فشل التوثيق عندما يكون الـ harness غير مسجّل الدخول على مضيف البوابة. كان <code>/acp doctor</code> سليمًا، ومع ذلك فشل التشغيل:</p>
<p><img src="/arabic-cs-library/images/kinney/1b3dfe3cd651b50d.webp" alt="محادثة في واجهة Control UI يبلّغ فيها الوكيل بأن sessions_spawn لمنصّة codex فشل بسبب «Authentication required»، دون تغيير أي ملفات"></p>
<p>دردشة في واجهة التحكّم يبلّغ فيها الوكيل بأن sessions_spawn الخاص بـ harness اسمه codex فشل بخطأ Authentication required، دون تغيير أي ملف</p>
<h3 id="التمرين-2-السؤال-نفسه-harness-اثنان">التمرين 2: السؤال نفسه، harness اثنان</h3>
<p>تعطي الـ harnesses المختلفة إجابات مختلفة، بأسلوب مختلف وسرعة مختلفة. اطرح السؤال نفسه للقراءة فقط على اثنين منها وقارن.</p>
<blockquote>
<p>شغّل جلستَي ACP، إحداهما بـ <code>agentId: &quot;codex&quot;</code> والأخرى بـ <code>agentId: &quot;claude&quot;</code>، مع ضبط <code>cwd</code> على مساحة عملك في كلتيهما. اسأل كلًّا منهما: «ما أهم ثلاثة ملفات هنا، ولماذا؟» للقراءة فقط. ثم اعرض لي الإجابتين جنبًا إلى جنب ولاحظ أي اختلافات.</p>
</blockquote>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>ما إذا كان الـ harnesses كلاهما يبدأ فعلًا. وإذا بدأ واحد فقط، فإما أن الآخر غائب عن <code>acp.allowedAgents</code>، أو غير مثبّت، أو غير مسجّل الدخول.</li>
<li>كيف تختلف الإجابات. فهذا هو جوهر ACP: أنت تختار منفّذًا له قوة معيّنة.</li>
<li>خطأ «الطراز غير موجود» إذا طلبت من harness طرازَ harness آخر. فمعرّفات الطرازات غير قابلة للنقل.</li>
</ul>
<h3 id="التمرين-3-شاهد-فشل-الكتابة">التمرين 3: شاهد فشل الكتابة</h3>
<p>الآن شاهد سلوك الأذونات بنفسك، بدلًا من تصديقه بلا دليل. مع بقاء الإعدادات الافتراضية، اطلب شيئًا يتطلّب الكتابة:</p>
<blockquote>
<p>شغّل جلسة ACP بـ <code>agentId: &quot;codex&quot;</code> و<code>cwd: &quot;&lt;scratch&gt;&quot;</code>. واطلب منها إنشاء ملف باسم <code>hello.txt</code> يحتوي «hello from ACP».</p>
</blockquote>
<p>مع <code>approve-reads</code> و<code>nonInteractivePermissions: fail</code>، يحتاج الـ harness إلى موافقة ليكتب، ولا يمكن لأحد منحها، فيُجهَض التشغيل.</p>
<p>وما الذي تبحث عنه:</p>
<ul>
<li><code>PermissionPromptUnavailableError</code>.</li>
<li>عدم وجود <code>hello.txt</code> في المجلد المؤقت.</li>
</ul>
<p>الآن جرّب الخيار الألطف. إنه لا يمنح أي وصول جديد، بل يغيّر فقط طريقة سلوك الرفض:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.nonInteractivePermissions deny
</code></pre>
<p>أعد الطلب. ينبغي أن تبقى الكتابة مرفوضة، لكن هذه المرة يستمر الـ harness ويخبرك بأنه لم يستطع، بدلًا من إجهاض التشغيل كله.</p>
<h3 id="التمرين-4-دعه-يكتب-بأمان">التمرين 4: دعه يكتب، بأمان</h3>
<p>للحصول على عمل حقيقي من harness، عليك منحه حقّ الكتابة، فافعل ذلك بوعي وبأضيق نطاق ممكن. هذا إعداد «كسر الزجاج» للطوارئ، فلا تفعّله إلا مع توجيه <code>cwd</code> إلى المجلد المؤقت:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.permissionMode approve-all
</code></pre>
<p>ثم أرسل إلى وكيلك:</p>
<blockquote>
<p>شغّل جلسة ACP بـ <code>agentId: &quot;claude&quot;</code> و<code>cwd: &quot;&lt;scratch&gt;&quot;</code>. واطلب منها كتابة سكربت صغير باسم <code>fizzbuzz.js</code> يطبع FizzBuzz من 1 إلى 20، وتشغيله، والإبلاغ عن المخرجات.</p>
</blockquote>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>وجود <code>fizzbuzz.js</code> في المجلد المؤقت. افتحه وتفقّده بنفسك.</li>
<li>تشغيل الـ harness للسكربت وإبلاغه بمخرجات حقيقية، وهو أمر صدفة بلا طلب موافقة. وهذا معنى <code>approve-all</code>.</li>
<li>ألّا يتغيّر أي شيء خارج <code>&lt;scratch&gt;</code>.</li>
</ul>
<p><strong>والآن أعِد الإعداد.</strong> لا تترك هذا مفعّلًا:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.config.permissionMode approve-reads
</code></pre>
<p>شغّل <code>openclaw security audit</code> وتأكّد أنه لم يعد يصنّف <code>approve-all</code> كخطر.</p>
<h3 id="التمرين-5-جلسة-مستمرة-يمكنك-محادثتها">التمرين 5: جلسة مستمرة يمكنك محادثتها</h3>
<p>التشغيل لمرة واحدة مناسب لمهمة واحدة. أما الجلسة المستمرة فتتيح لك إجراء محادثة مع الـ harness، وهو أقرب إلى استخدام Claude Code مباشرة. ابدأ واحدة:</p>
<pre><code>/acp spawn claude --mode persistent --thread auto --cwd &lt;scratch&gt;
</code></pre>
<p>على Discord أو Telegram، ينشئ <code>--thread auto</code> خيطًا أو موضوعًا للجلسة. وعلى قناة لا تدعم الخيوط، يمكنك تجربة <code>--bind here</code> بدلًا من ذلك لتثبيت المحادثة الحالية بها. وإذا كانت القناة لا تدعم الربط، أخبرك OpenClaw بذلك. وفي هذه الحالة استخدم جلسة لمرة واحدة واطلب من وكيلك متابعتها.</p>
<p>وتحادث معها:</p>
<ol>
<li>اطلب منها وصف <code>fizzbuzz.js</code>.</li>
<li>تابع بشيء يعتمد على الإجابة الأولى، مثل «الآن غيّره ليعدّ حتى 30». فهذا يُثبت أنها حافظت على حالتها.</li>
<li>تفقّد ما يعمل عبر <code>/acp sessions</code> و<code>/acp status</code>.</li>
<li>أنهها بـ <code>/acp close</code>.</li>
</ol>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>أن تعمل المتابعة دون أن تعيد السياق.</li>
<li>أن إغلاق الجلسة يزيل الربط، وأن كل ما تكتبه بعد ذلك يذهب إلى وكيلك العادي من جديد.</li>
</ul>
<p>ستحتاج <code>permissionMode approve-all</code> مرة أخرى ليمرّ التعديل. فعّله لهذا التمرين، ثم أطفئه بعد الانتهاء.</p>
<h3 id="التمرين-6-التوجيه-والإلغاء">التمرين 6: التوجيه والإلغاء</h3>
<p>المهام الحقيقية تسوء في منتصف الطريق. تدرّب على الطريقتين لتصحيح مسار harness. ابدأ مهمة تستغرق بعض الوقت:</p>
<blockquote>
<p>شغّل جلسة ACP بـ <code>agentId: &quot;codex&quot;</code> و<code>cwd: &quot;&lt;scratch&gt;&quot;</code>. واطلب منها كتابة ملف README لهذا المجلد يتضمّن قسمًا لكل ملف، بأكبر قدر من التفصيل تستطيعه.</p>
</blockquote>
<p>وبينما تعمل:</p>
<ol>
<li>استخدم <code>/acp steer</code> لوضع متابعة في قائمة الانتظار، مثل أن تطلب منها تقصير كل قسم إلى جملتين. شغّل <code>/acp help</code> إذا احتجت الصيغة الدقيقة.</li>
<li>لاحظ ما يحدث: لا يقاطع التوجيه الدورة الحالية، بل ينتظر انتهاءها ثم يُنفَّذ كتعليمة تالية في الجلسة نفسها.</li>
<li>ابدأ مهمة طويلة أخرى. لكن هذه المرة، أعد توجيهها بشكل صحيح: أوقفها بـ <code>/acp cancel</code>، وتأكّد من إيقافها بـ <code>/acp status</code>، ثم أرسل التعليمة الجديدة.</li>
</ol>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>أن <code>/acp steer</code> متابعة في قائمة الانتظار، لا تصحيح أثناء الدورة. ولتغيير المسار بينما يعمل الـ harness، ألغِ أولًا.</li>
<li>أن التشغيل الملغى يستقرّ فعلًا. فالإلغاء نصفان: مستوى التحكّم والعملية الخارجية، لذا تأكّد من النتيجة بدلًا من افتراضها.</li>
</ul>
<h3 id="التمرين-7-أثبت-أنه-ليس-وكيلا-فرعيا">التمرين 7: أثبت أنه ليس وكيلًا فرعيًا</h3>
<p>يسهل تجاوز جدول المقارنة السابق بلمحة سريعة. وهذا التمرين يجعله ملموسًا. اطلب من وكيلك المهمة البسيطة نفسها مرتين:</p>
<blockquote>
<p>أولًا، شغّل جلسة ACP بـ <code>agentId: &quot;claude&quot;</code> لتشرح ما يفعله <code>fizzbuzz.js</code>. ثم شغّل وكيلًا فرعيًا أصليًا، بلا <code>runtime: &quot;acp&quot;</code>، ليفعل الشيء نفسه.</p>
</blockquote>
<p>ثم افحص كلًّا منهما:</p>
<pre><code>/acp sessions
/subagents list
</code></pre>
<p>وما الذي تبحث عنه:</p>
<ul>
<li>يبدو مفتاح جلسة ACP هكذا: <code>agent:&lt;agentId&gt;:acp:&lt;uuid&gt;</code>.</li>
<li>ويبدو مفتاح الوكيل الفرعي هكذا: <code>agent:&lt;agentId&gt;:subagent:&lt;uuid&gt;</code>.</li>
<li>أن كلًّا منهما يظهر تحت أمره الخاص. وبهذه الطريقة تعرف أي بيئة تشغيل تملك عملًا ما.</li>
</ul>
<h3 id="التمرين-8-عطله-عن-قصد">التمرين 8: عطّله عن قصد</h3>
<p>معرفة كيف يفشل نصف معرفة كيفية استخدامه. جرّب كلًّا مما يلي، واقرأ الخطأ، ثم أصلحه:</p>
<ol>
<li><strong>غير مسموح.</strong> اضبط <code>acp.allowedAgents</code> على <code>[&quot;codex&quot;]</code> فقط، ثم اطلب <code>claude</code>. ينبغي أن يُرفض التشغيل.</li>
<li><strong>مجلد خاطئ.</strong> شغّل مع <code>cwd</code> غير موجود.</li>
<li><strong>بيئة تشغيل خاطئة.</strong> اطلب harness دون ذكر <code>runtime: &quot;acp&quot;</code> وانظر ما تحصل عليه.</li>
</ol>
<p>وعند الانتهاء، أعِد <code>allowedAgents</code> إلى الـ harnesses التي تريدها فعلًا، وتحقّق من أن المجلد المؤقت هو المكان الوحيد الذي كُتب فيه أي شيء.</p>
<h3 id="عند-الانتهاء">عند الانتهاء</h3>
<p>راجع هذه القائمة:</p>
<ul>
<li>أن <code>permissionMode</code> عاد إلى <code>approve-reads</code>.</li>
<li>أن <code>nonInteractivePermissions</code> مضبوط بالطريقة التي تريدها على المدى الطويل (<code>fail</code> هو الافتراضي).</li>
<li>عدم بقاء أي جلسات تعمل: تفقّد <code>/acp sessions</code>.</li>
<li>أن <code>/acp doctor</code> لا يزال يبلّغ <code>healthy: yes</code>، وأن عدّاداته تعكس كل ما فعلته للتو.</li>
<li>أن <code>openclaw security audit</code> نظيف.</li>
</ul>
<h2 id="حدود-ينبغي-أن-تعرفها">حدود ينبغي أن تعرفها</h2>
<ul>
<li><strong>جلسات ACP تعمل على المضيف، لا داخل بيئة OpenClaw المعزولة.</strong> فسياسة العزل في OpenClaw لا تُغلّف الـ harness. ويُحكَم الـ harness بأذونات واجهة سطر الأوامر الخاصة به وبـ <code>cwd</code> الخاص به، بينما يفرض OpenClaw بوابات الميزات وقائمة السماح وملكية الجلسة والتسليم.</li>
<li><strong>الجلسات المعزولة لا تستطيع تشغيل ACP مطلقًا.</strong> فإذا كانت الجلسة الطالبة معزولة، يُحظر كل من <code>/acp spawn</code> و<code>sessions_spawn({ runtime: &quot;acp&quot; })</code>، ولا يكون <code>sandbox: &quot;require&quot;</code> مدعومًا. وإذا احتجت عملًا مفروضًا بالعزل، فاستخدم وكيلًا فرعيًا أصليًا.</li>
<li><strong>تسجيلات الدخول هي وصول.</strong> فبمجرد أن يسجّل harness الدخول على مضيف البوابة، يستطيع وكيل استخدام ذلك الحساب. ويمكن لـ Claude Code أو Codex المسجّل الدخول تعديل الشيفرة ودفعها، ما يجعل حقن التوجيهات (prompt injection) أكثر خطورة.</li>
<li><strong>البدايات غير المؤكّدة تحتاج إلى فحص.</strong> فإذا انتهت مدة التشغيل أو أُعيد تشغيل البوابة، فلا تكتفِ بإعادة المحاولة. فقد يكون الـ harness قد بدأ وغيّر ملفات. تفقّد <code>/acp sessions</code> ومجلد العمل أولًا.</li>
</ul>
<h2 id="acp-وعقد-mac">ACP وعُقد Mac <span class="content-anchor" id="acp-and-mac-nodes"></span></h2>
<p>إذا كنت قد <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">قرنت جهاز Mac كعقدة</a>، فالسؤال الطبيعي هو هل يستطيع OpenClaw الآن تشغيل Claude Code عليه. <strong>ليس عبر ACP.</strong> فـ ACP والعُقد آليتان منفصلتان، ولا شيء في وثائق OpenClaw يربط بينهما.</p>
<h3 id="ما-يعمل-وأين">ما يعمل وأين</h3>
<table>
<thead>
<tr>
<th>القطعة</th>
<th>أين تعمل</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>harness ACP</strong> (Claude Code وغيره)</td>
<td>بيئة تشغيل مضيف البوابة، خارج بيئة OpenClaw المعزولة</td>
</tr>
<tr>
<td><strong>عقدة Mac مقترنة</strong></td>
<td>الأوامر والقدرات التي وافقت عليها فقط، وتستدعيها البوابة</td>
</tr>
<tr>
<td><strong>Codex الأصلي مع التوضيع (placement)</strong></td>
<td>يبقى «دماغ» Codex على البوابة، وتعمل أوامره ووصوله إلى الملفات على العقدة</td>
</tr>
</tbody>
</table>
<p>لذا مع بوابة بعيدة، يشغّل <code>/acp spawn claude</code> برنامج Claude Code على خادم البوابة، على ملفات موجودة هناك. ومستودعات جهاز Mac ليست في المتناول، ولا تصف وثائق ACP ولا استضافة الجلسات ولا تنفيذ العُقد تشغيل harness ACP على عقدة.</p>
<p>يسرد طلب الموافقة على العقدة أمرين قد يبدوان متعلّقين، مثل «Sessions: Claude, Codex». ولم أجد وثائق تشرح ما تفعله هذه، فلا تقرأها كدعم لـ ACP على Mac.</p>
<h3 id="ما-يعمل-فعلا-codex-الأصلي-على-عقدة">ما يعمل فعلًا: Codex الأصلي على عقدة</h3>
<p>هناك طريقة موثّقة لتشغيل وكيل برمجة على جهاز مقترن، لكنها مخصّصة لـ <strong>Codex، عبر بيئة تشغيله الأصلية</strong>، لا عبر ACP. وبمصطلحات OpenClaw يُسمّى هذا <strong>التوضيع (placement)</strong>: تحتفظ البوابة بخادم تطبيق Codex واتصال الطراز والسجل، بينما تحدث أوامر صدفة Codex ووصوله إلى الملفات وطلبات HTTP على جهاز Mac. وتشغّل العقدة <code>codex exec-server</code> في مساحة عمل جلسة، ثم تُوفَّق التغييرات التي يجريها في شجرة عمل (worktree) تملكها البوابة.</p>
<p>وبضعة أمور يجب معرفتها قبل أن تجرّبه:</p>
<ul>
<li><strong>يُتحكَّم به عبر <code>/codex</code>،</strong> لا <code>/acp</code>.</li>
<li><strong>يحدث العمل في مساحة عمل مُدارة،</strong> تنشئها البوابة وتزامنها. وهي ليست مجلدًا تشير إليه على جهاز Mac. فالجلسة الجديدة تبدأ من مساحة عمل فارغة، أو من مستودع GitHub، أو من نسخة مسحوبة (checkout) على البوابة، ولا تتصفّح نظام ملفات الجهاز لاختيارها.</li>
<li><strong>لا تحتاج إلى تسجيل الدخول إلى Codex على جهاز Mac.</strong> فبيانات اعتماد المزوّد تبقى على البوابة، وتحصل العقدة على مجلد رئيسي خاص جديد وبيئة منقّاة.</li>
<li><strong>الطلبات التي تحمل بيانات اعتماد تُرفض على العقدة.</strong> فكل ما يحتاج رمز حامل (bearer token) أو ملفات تعريف ارتباط (cookies) يجب أن يعمل على البوابة.</li>
</ul>
<p>يتكوّن الإعداد من ثلاثة أجزاء. أولًا، فعّل إضافة Codex على <strong>كلٍّ</strong> من البوابة وجهاز Mac (وأضف <code>codex</code> إلى <code>plugins.allow</code> على أي منهما يستخدم قائمة سماح). ثانيًا، اسمح بأمر العقدة على البوابة، لأنه عالي الخطورة وغير مسموح به افتراضيًا:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  gateway<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    nodes<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      commands<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        allow<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;codex.exec-server.stdio.v1&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  plugins<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      codex<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        enabled<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثالثًا، فعّل استضافة الجلسات على جهاز Mac. إنه إعداد محلي على العقدة:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  nodeHost<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    workerRuns<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> enabled<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>افتراضيًا، توفّر العقدة فتحة منفّذ واحدة لكل نواة معالج. ويغيّر <code>nodeHost.workerRuns.capacity</code> ذلك، ويشغّل <code>nodeHost.workerRuns.isolation: &quot;container&quot;</code> كل جلسة مستضافة في حاوية خاصة بها (مع <code>nodeHost.workerRuns.containerImage</code> لاختيار الصورة). ويمكن لمضيف عقدة بلا واجهة (headless) الاشتراك عبر <code>openclaw node run --session-host</code>.</p>
<p>ثم أعد تشغيل التطبيق أو مضيف العقدة. ولأن مجموعة أوامر العقدة تغيّرت، فأعد ربطها ووافق على الطلب الجديد من البوابة:</p>
<pre><code class="language-bash">openclaw nodes pending
openclaw nodes approve &lt;requestId&gt;
</code></pre>
<p>اختر الجهاز المقترن من منتقي <strong>Place</strong> عند بدء جلسة جديدة في واجهة التحكّم. ومن سطر الأوامر، يمكنك إرسال جلسة قائمة في شجرة عمل مُدارة إلى جهاز:</p>
<pre><code class="language-bash">openclaw gateway call sessions.dispatch \\
  --params <span class="hljs-string">&#x27;{&quot;key&quot;:&quot;agent:main:device-work&quot;,&quot;deviceId&quot;:&quot;&lt;paired-device-id&gt;&quot;}&#x27;</span>
</code></pre>
<p><strong>عمليات التشغيل تحتاج إلى موافقتك.</strong> فبدء exec-server يُظهر طلب موافقة حرجًا. و<strong>السماح مرة واحدة</strong> يغطّي تشغيلًا واحدًا. أما <strong>السماح دائمًا</strong> فيغطّي عمليات التشغيل اللاحقة فقط ما دام التوضيع كما هو تمامًا، وهو محفوظ في ذاكرة البوابة ويُمحى عند إعادة تشغيلها. والسماح بالأمر في الإعدادات لا يتخطّى الطلب. والاستثناء الوحيد هو جلسة ضبطتها صراحةً على <strong>الوصول الكامل (Full access)</strong>، وذلك فقط عندما تسمح سياسة التنفيذ الخاصة بجهاز Mac نفسها بالتشغيل دون موافقة.</p>
<p>إذا انقطع الاتصال أو ألغيت الدورة، تنتهي المحاولة وتُقتل عملياتها البعيدة. ويعيد الاتصال بدء محاولة جديدة، ولا يستأنف القديمة أبدًا.</p>
<blockquote>
<p><strong>الموافقة ليست عزلاً</strong></p>
<p>بمجرد أن توافق على تشغيل، تستطيع العملية الوصول إلى كل ما يستطيع حسابك على Mac الوصول إليه. ومجلد العمل يحدّد فقط من أين تبدأ. لا تقرن إلا الأجهزة التي تثق بها، وإذا أردت عزلاً حقيقيًا، فشغّل العقدة تحت حساب macOS منفصل بأقلّ صلاحيات ممكنة.</p>
</blockquote>
<p>هذه الميزة جديدة نسبيًا، ولا تذكر الوثائق أنظمة التشغيل المدعومة. راجع <a href="https://docs.openclaw.ai/plugins/codex-harness/placement">صفحة توضيع Codex</a> بالنسبة إلى الإصدار المثبّت لديك قبل أن تعتمد عليها.</p>
<h3 id="وماذا-عن-claude-code-على-جهاز-mac">وماذا عن Claude Code على جهاز Mac؟</h3>
<p>لا يوجد توضيع موثّق لـ Claude Code. ولديك ثلاثة خيارات واقعية:</p>
<table>
<thead>
<tr>
<th>تريد…</th>
<th>افعل هذا</th>
</tr>
</thead>
<tbody>
<tr>
<td>أن يعمل Claude Code على مستودعات موجودة على جهاز Mac</td>
<td>شغّل البوابة على جهاز Mac، بحيث <em>يكون</em> مضيف البوابة هو Mac ويعمل ACP هناك</td>
</tr>
<tr>
<td>أن يعمل Claude Code على نسخة، مع بوابة بعيدة</td>
<td>استمر في استخدام ACP على مضيف البوابة، مع نسخة مسحوبة مؤقتة هناك، ثم أعِد النتائج عبر Git</td>
</tr>
<tr>
<td>أوامر لمرة واحدة على جهاز Mac</td>
<td>شغّل واجهة سطر الأوامر كأمر عادي عبر <code>/exec host=node</code>، مع إدراج الملف التنفيذي في قائمة السماح أولًا بـ <code>openclaw approvals allowlist add --node &lt;id&gt; &quot;&lt;path&gt;&quot;</code></td>
</tr>
</tbody>
</table>
<p>هذا الخيار الأخير أمر صدفة، لا جلسة ACP. وستفقد تتبّع الجلسة و<code>steer</code> و<code>cancel</code> وعمليات الربط وبقية أدوات التحكّم في ACP، ولا تقدّم الوثائق أي إرشاد لتشغيل واجهة سطر أوامر للبرمجة بهذه الطريقة. ولم أجرّبه، فاعتبره تجربة، واجعل قائمة السماح بأضيق نطاق ممكن.</p>
<h3 id="الاختيار">الاختيار</h3>
<table>
<thead>
<tr>
<th>تريد…</th>
<th>استخدم…</th>
</tr>
</thead>
<tbody>
<tr>
<td>أي harness ACP (Claude Code وGemini CLI وغيرهما)</td>
<td>ACP، الذي يعمل على مضيف البوابة</td>
</tr>
<tr>
<td>أن يقوم Codex بعمل على جهاز Mac، مع بوابة بعيدة</td>
<td>توضيع Codex الأصلي على العقدة</td>
</tr>
<tr>
<td>Claude Code على مستودعات جهاز Mac نفسه</td>
<td>بوابة تعمل على ذلك الجهاز</td>
</tr>
<tr>
<td>جلسات OpenClaw البرمجية نفسها على جهاز Mac</td>
<td>استضافة الجلسات على الجهاز المقترن</td>
</tr>
</tbody>
</table>
<h2 id="استخدامه-على-railway">استخدامه على Railway</h2>
<p>إذا كنت قد تابعت <a href="https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale">درس Railway</a>، فإن القالب يتضمّن أصلًا <code>claude</code> و<code>codex</code>، ومجلد <code>HOME</code> موجود على وحدة التخزين، لذا تبقى تسجيلات الدخول بعد عمليات إعادة النشر. ويلتقط Claude Code المتغيّر <code>ANTHROPIC_API_KEY</code> من متغيّرات الخدمة عند ضبطه، وهكذا تعمل مهارة <code>coding-agent</code> في القالب. ولاستخدام اشتراك بدلًا من ذلك، سجّل الدخول من صدفة <code>railway ssh</code> باسم مستخدم البوابة:</p>
<pre><code class="language-bash">railway ssh --service openclaw
as-node claude auth login
</code></pre>
<p>شغّل أوامر الإضافة بالطريقة نفسها التي تشغّل بها أوامر OpenClaw الأخرى هناك:</p>
<pre><code class="language-bash">railway ssh --service openclaw -- openclaw plugins install @openclaw/acpx
railway ssh --service openclaw -- openclaw config <span class="hljs-built_in">set</span> plugins.entries.acpx.enabled <span class="hljs-literal">true</span>
</code></pre>
<p>تجعل حاوية القالب الخالية من العزل قسم الأذونات أكثر أهمية. فـ harness يعمل بـ <code>approve-all</code> هناك يستطيع الوصول إلى وحدة التخزين، التي تحمل الرموز والسجل. أبقِه موجّهًا إلى مجلد مؤقت.</p>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<table>
<thead>
<tr>
<th>العَرَض</th>
<th>ما يجب تفقّده</th>
</tr>
</thead>
<tbody>
<tr>
<td>يقول <code>/acp doctor</code> إن الخلفية محظورة</td>
<td>أن <code>plugins.allow</code> مضبوطة لكنها لا تتضمّن <code>acpx</code></td>
</tr>
<tr>
<td>يُرفض التشغيل من أجل ذلك الـ harness</td>
<td>أن المعرّف ليس في <code>acp.allowedAgents</code></td>
</tr>
<tr>
<td>لا يبدأ الـ harness أبدًا</td>
<td>أن واجهة سطر الأوامر الخاصة به غير مثبّتة على مضيف البوابة، أو غير مسجّل الدخول تحت حساب نظام تشغيل البوابة</td>
</tr>
<tr>
<td><code>PermissionPromptUnavailableError</code></td>
<td>أن الـ harness احتاج إلى الكتابة أو التشغيل. انظر قسم الأذونات</td>
</tr>
<tr>
<td>«الطراز غير موجود»</td>
<td>أن معرّف الطراز هذا غير موجود لهذا الـ harness. فالمعرّفات غير قابلة للنقل</td>
</tr>
<tr>
<td>يُرفض <code>cwd</code></td>
<td>أنه غير موجود أو غير قابل للوصول. استخدم مسارًا مطلقًا، أو احذفه</td>
</tr>
<tr>
<td>يُحظر التشغيل من جلسة معزولة</td>
<td>أنه لا يمكن بدء ACP من طالب معزول. استخدم وكيلًا فرعيًا</td>
</tr>
<tr>
<td>جلسة Codex لا تتصرّف مثل Codex الأصلي</td>
<td>أنك على Codex عبر ACP، لا على إضافة Codex الأصلية. فهما بيئتا تشغيل مختلفتان</td>
</tr>
</tbody>
</table>
<h2 id="اختيار-المسار-الصحيح">اختيار المسار الصحيح</h2>
<table>
<thead>
<tr>
<th>تحتاج…</th>
<th>استخدم…</th>
</tr>
</thead>
<tbody>
<tr>
<td>تفويضًا محدودًا أصيلًا في OpenClaw</td>
<td>وكيلًا فرعيًا أصليًا</td>
</tr>
<tr>
<td>وكيل برمجة خارجيًا يديره OpenClaw</td>
<td>ACP مع إضافة ACPX</td>
</tr>
<tr>
<td>ربط وتحكّم أصيلين في دردشة Codex</td>
<td>إضافة Codex الأصلية</td>
</tr>
<tr>
<td>أن يتحدّث محرّرك مع جلسة بوابة</td>
<td><code>openclaw acp</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يتبع هذا الدرس وثائق OpenClaw للإصدار <code>2026.9.x</code>. وقائمة الـ harnesses المدعومة والصيغة الدقيقة للأوامر الفرعية لـ <code>/acp</code> تتغيّر كثيرًا، لذا شغّل <code>/acp help</code> وراجع <a href="https://docs.openclaw.ai/tools/acp-agents">وثائق وكلاء ACP</a> قبل الاعتماد على علم معيّن.</p>
</blockquote>
`,d={book:n,chapter:s,chapterTitle:e,slug:a,title:t,headings:o,html:c};export{n as book,s as chapter,e as chapterTitle,d as default,o as headings,c as html,a as slug,t as title};
