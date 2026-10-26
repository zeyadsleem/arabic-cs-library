const n="kinney",s="openclaw",t="OpenClaw: مساعدك الذكي الشخصي",e="subagents-and-orchestration",o="الوكلاء الفرعيون والتنسيق",a=[{depth:2,id:"كيف-يعمل-التوليد",text:"كيف يعمل التوليد"},{depth:2,id:"جرب-وكيلك-الفرعي-الأول",text:"جرّب: وكيلك الفرعي الأول"},{depth:2,id:"ما-لا-يستطيع-الوكيل-الفرعي-فعله",text:"ما لا يستطيع الوكيل الفرعي فعله"},{depth:2,id:"تحديد-ما-يستطيع-الأبناء-فعله",text:"تحديد ما يستطيع الأبناء فعله"},{depth:3,id:"الرافعة-1-قاعدة-لكل-وكيل-فرعي",text:"الرافعة 1: قاعدة لكل وكيل فرعي"},{depth:3,id:"الرافعة-2-وكيل-مخصص-للعمل-المحفوف-بالمخاطر",text:"الرافعة 2: وكيل مخصّص للعمل المحفوف بالمخاطر"},{depth:2,id:"الحدود-القصوى-والميزانيات",text:"الحدود القصوى والميزانيات"},{depth:2,id:"مقدار-ما-يفوضه-وكيلك",text:"مقدار ما يفوّضه وكيلك"},{depth:2,id:"الوصول-بين-الوكلاء-مفعل-افتراضيا",text:"الوصول بين الوكلاء مفعّل افتراضيًا"},{depth:2,id:"أنماط-تستحق-الاقتباس",text:"أنماط تستحق الاقتباس"},{depth:3,id:"البحث-المتوازي",text:"البحث المتوازي"},{depth:3,id:"القارئ-المعزول",text:"القارئ المعزول"},{depth:3,id:"فريق-مع-منسق",text:"فريق مع منسّق"},{depth:3,id:"الكاتب-والناقد",text:"الكاتب والناقد"},{depth:2,id:"أمور-توجع",text:"أمور تُوجع"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],c=`<p><strong>الوكيل الفرعي (subagent)</strong> تشغيل في الخلفية يبدأه وكيلك ليتولّى جزءًا من مهمة. يحصل على جلسته الخاصة، ويعمل بسياقه الخاص، ويبلّغ حين ينتهي. وتبقى محادثتك الرئيسية نظيفة، ويمكن لعدة أبناء أن يعملوا في وقت واحد، ويمكن لكل واحد أن يعمل على نموذج أرخص أو بأدوات أقل مما يملكه وكيلك الرئيسي.</p>
<p>كل تثبيت لـ OpenClaw يستطيع فعل هذا. لا شيء يحتاج إلى تفعيل. اطلب من وكيلك أن «يولّد وكيلًا فرعيًا» فيستدعي أداة <code>sessions_spawn</code> الخاصة به. بل إن OpenClaw يحثّ الوكلاء افتراضيًا على التفويض في جلستهم الرئيسية.</p>
<blockquote>
<p><strong>الوكلاء الفرعيون ليسوا جلسات ACP</strong></p>
<p>يغطي <a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin">درس ACPX</a> تسليم العمل إلى أداة برمجة خارجية مثل Claude Code أو Codex. فهي تستخدم أداة التوليد نفسها لكنها شيء مختلف. أما هذا الدرس فيتناول الوكلاء الفرعيين الأصليين، الذين يعملون داخل OpenClaw بأدوات OpenClaw وسياساته.</p>
</blockquote>
<h2 id="كيف-يعمل-التوليد">كيف يعمل التوليد</h2>
<ol>
<li><strong>التوليد.</strong> يستدعي وكيلك <code>sessions_spawn</code> بمهمة. ويعود النداء فورًا بمعرّف؛ فهو لا ينتظر انتهاء الابن.</li>
<li><strong>التشغيل.</strong> يعمل الابن في جلسته الخاصة، بمفتاح مثل <code>agent:main:subagent:&lt;uuid&gt;</code>. ويبدأ بسياق جديد: المهمة، إضافة إلى <code>AGENTS.md</code> الخاص بك. وهو <strong>لا</strong> يحصل على <code>SOUL.md</code> أو <code>USER.md</code> أو <code>IDENTITY.md</code> أو <code>MEMORY.md</code>، لذا ضع كل ما يحتاج الابن معرفته في المهمة نفسها.</li>
<li><strong>الإبلاغ.</strong> حين ينتهي الابن، تُرسَل إجابته النهائية إلى الأصل مع حالة (<code>ok</code> أو <code>error</code> أو <code>timeout</code>) وسطر إحصاءات يضم زمن التشغيل والرموز (tokens) وتكلفة مقدّرة إن كنت قد هيّأت تسعير النموذج. وتأتي الحالة من ما حدث للتشغيل فعلًا، لا من ما قاله الابن عن نفسه.</li>
<li><strong>الأرشفة.</strong> تُؤرشف جلسة الابن بعد 60 دقيقة افتراضيًا.</li>
</ol>
<p>بينما يعمل الأبناء، ينتظر الأصل إبلاغاتهم بدلًا من السؤال عنهم مرة بعد مرة. وينتهي التشغيل، لكن جلسته تبقى حتى تُؤرشف، فتستطيع أن تقرأ ما فعله.</p>
<h2 id="جرب-وكيلك-الفرعي-الأول">جرّب: وكيلك الفرعي الأول</h2>
<p>أرسل إلى وكيلك شيئًا مثل هذا:</p>
<blockquote>
<p>ولّد وكيلًا فرعيًا ليقرأ <code>AGENTS.md</code> في مساحة عملك ويسرد كل قاعدة فيه كقائمة مرقّمة. وأبلغني بما وجده.</p>
</blockquote>
<p>ثم انظر ما حدث:</p>
<pre><code>/subagents list
/subagents info 1
/subagents log 1 tools
</code></pre>
<p>يعرض <code>list</code> الأبناء النشطين والأخيرين. ويعرض <code>info</code> حالة الابن وتوقيته ومعرّف جلسته ومسار نصّه. ويعرض <code>log</code> أدواره الأخيرة، وإضافة <code>tools</code> تُدرج نداءات الأدوات التي أجراها. ويمكنك الإشارة إلى ابن برقمه في القائمة أو بمعرّفه.</p>
<p>لا يتيح لك <code>/subagents</code> سوى النظر. ولإيقاف العمل، أرسل <code>/stop</code>، الذي يوقف التشغيل الحالي <strong>وكل أبنائه</strong>. ويمكنك أيضًا النقر على <strong>Stop</strong> في واجهة التحكم. ولا يوجد <code>/subagents kill</code>.</p>
<blockquote>
<p><strong>الأبناء يعيشون أطول من آبائهم</strong></p>
<p>لا يُلغى الابن عندما ينهي الأصل دوره. فإن بدأت أمرًا كبيرًا وغيّرت رأيك، فاستخدم <code>/stop</code>، وإلا استمرّ الأبناء في العمل وإنفاق الرموز (tokens).</p>
</blockquote>
<h2 id="ما-لا-يستطيع-الوكيل-الفرعي-فعله">ما لا يستطيع الوكيل الفرعي فعله</h2>
<p>كل وكيل فرعي، أيًّا كانت تهيئته، يفقد هذه الأدوات:</p>
<ul>
<li><code>message</code>: لا يستطيع مراسلتك أو مراسلة أي شخص آخر مباشرةً</li>
<li><code>cron</code> (الأتمتات): لا يستطيع جدولة أي شيء</li>
<li><code>gateway</code>: لا يستطيع تغيير إعدادات البوابة</li>
<li><code>sessions_send</code> و<code>agents_list</code> و<code>session_status</code> و<code>progress_card</code> وأدوات <code>conversations_*</code></li>
</ul>
<p>لا يمكنك إعادة هذه الأدوات. لذا لا يستطيع وكيل فرعي أن يراسلك في الثالثة فجرًا، ولا أن يترك مهمة مجدولة خلفه، ولا أن يعيد تهيئة البوابة.</p>
<p><strong>كل ما عدا ذلك موروث.</strong> فالوكيل الفرعي التابع لوكيلك الرئيسي يحصل على سياسة أدوات الوكيل الرئيسي. وإن كان وكيلك الرئيسي يستطيع تشغيل أوامر سطر الأوامر، فكذلك أبناؤه، ولا شيء في نص المهمة يغيّر ذلك. فقول «لا تستخدم سطر الأوامر» في مطالبة طلب، أما سياسة الأدوات فضمان.</p>
<h2 id="تحديد-ما-يستطيع-الأبناء-فعله">تحديد ما يستطيع الأبناء فعله</h2>
<p>لديك رافعتان.</p>
<h3 id="الرافعة-1-قاعدة-لكل-وكيل-فرعي">الرافعة 1: قاعدة لكل وكيل فرعي</h3>
<p><code>tools.subagents.tools</code> يرشّح الأدوات <strong>لكل</strong> الوكلاء الفرعيين:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> tools.subagents.tools.deny <span class="hljs-string">&#x27;[&quot;exec&quot;]&#x27;</span>
</code></pre>
<p>تفوز <code>deny</code> على كل شيء. ويمكنك أيضًا ضبط <code>allow</code>، التي تجعلها قائمة سماح فقط. لكن <code>allow</code> لا تستطيع إلا أن تسلب الأدوات؛ فلا يمكنها منح ابن أداة أزالها الملف الشخصي بالفعل.</p>
<p>هذا خشن. فهو ينطبق على كل ابن، وأي مهارة تستدعي سطر الأوامر ستتوقف عن العمل داخل الوكلاء الفرعيين. ويميل العطل إلى الظهور كإجابة غامضة أسوأ بدلًا من خطأ صلاحيات واضح.</p>
<h3 id="الرافعة-2-وكيل-مخصص-للعمل-المحفوف-بالمخاطر">الرافعة 2: وكيل مخصّص للعمل المحفوف بالمخاطر <span class="content-anchor" id="lever-2-a-dedicated-agent-for-risky-work"></span></h3>
<p>الأداة الأفضل هي <strong>وكيل مهيّأ بشكل منفصل</strong> يُسمح لوكيلك الرئيسي بتوليده. فالابن المولَّد كوكيل آخر يحصل على سياسة أدوات ذلك الوكيل ومساحة عمله ونموذجه وبيئته المعزولة، لا على ما للأصل. وهذه هي الطريقة الوحيدة لمنح أبناء مختلفين قوى مختلفة.</p>
<p>إليك <code>researcher</code> يستطيع القراءة والبحث في الويب لكنه لا يستطيع تشغيل الأوامر ولا كتابة الملفات ولا تشغيل المتصفّح.</p>
<p><strong>الخطوة 1: أنشئ الوكيل.</strong> يأتي دور <code>researcher</code> مع تعليمات تشغيل مناسبة للمهمة:</p>
<pre><code class="language-bash">openclaw agents add researcher --role researcher --non-interactive
</code></pre>
<p>يهيّئ الدور ملفات مساحة عمل الوكيل وهويّته. <strong>وهو لا يقيّد أي أدوات.</strong> وتلك هي الخطوة التالية.</p>
<p><strong>الخطوة 2: امنحه سياسة أدوات ضيقة.</strong></p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> agents.entries.researcher.tools <span class="hljs-string">&#x27;{ profile: &quot;minimal&quot;, alsoAllow: [&quot;read&quot;, &quot;web_search&quot;, &quot;web_fetch&quot;], deny: [&quot;group:runtime&quot;, &quot;write&quot;, &quot;edit&quot;, &quot;apply_patch&quot;, &quot;browser&quot;] }&#x27;</span>
openclaw config <span class="hljs-built_in">set</span> agents.entries.researcher.subagents.allowAgents <span class="hljs-string">&#x27;[]&#x27;</span>
</code></pre>
<p><code>allowAgents</code> الفارغة تمنع researcher من التفويض إلى أي شخص آخر.</p>
<p><strong>الخطوة 3: اسمح لوكيلك الرئيسي بتوليده.</strong> فافتراضيًا لا يستطيع الوكيل توليد سوى نسخ من نفسه.</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> agents.entries.main.subagents.allowAgents <span class="hljs-string">&#x27;[&quot;researcher&quot;]&#x27;</span>
openclaw config validate
</code></pre>
<p>تبدو النتيجة هكذا في <code>openclaw.json</code>:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  agents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      main<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        subagents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> allowAgents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;researcher&#x27;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      researcher<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-comment">// ...plus the workspace and identity that \`agents add\` created</span>
        subagents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> allowAgents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        tools<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          profile<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;minimal&#x27;</span><span class="hljs-punctuation">,</span>
          alsoAllow<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;read&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;web_search&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;web_fetch&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
          deny<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;group:runtime&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;write&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;edit&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;apply_patch&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;browser&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>الخطوة 4: استخدمه.</strong> سمِّ الوكيل في طلبك:</p>
<blockquote>
<p>استخدم وكيل researcher لمعرفة موعد الإصدار التالي من Node.js LTS. وأعد التاريخ ورابطًا إلى المصدر.</p>
</blockquote>
<p>ينبغي أن يعرض <code>/subagents list</code> مفتاح جلسة يبدأ بـ <code>agent:researcher:subagent:</code>. ولا يعمل البحث في الويب إلا إن كنت قد هيّأت مزوّد بحث. وبدونه، ما زال researcher قادرًا على قراءة الملفات.</p>
<p>هذا هو النمط الذي يوصي به <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#prompt-injection">درس الأمن</a> للمحتوى غير الموثوق. فيقرأ researcher صفحات الويب والرسائل التي قد تحمل تعليمات محقونة، وليس لديه سطر أوامر ليتبعها به. ولا يرى وكيلك الرئيسي سوى الملخّص.</p>
<h2 id="الحدود-القصوى-والميزانيات">الحدود القصوى والميزانيات</h2>
<p>تقع هذه الإعدادات تحت <code>agents.defaults.subagents</code>:</p>
<table>
<thead>
<tr>
<th>الإعداد</th>
<th>الافتراضي</th>
<th>ما يحدّه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>maxSpawnDepth</code></td>
<td><code>5</code></td>
<td>إلى أي عمق يستطيع الأبناء توليد أبنائهم (1–5)</td>
</tr>
<tr>
<td><code>maxChildrenPerAgent</code></td>
<td><code>5</code></td>
<td>الأبناء النشطون لكل جلسة (1–20)</td>
</tr>
<tr>
<td><code>maxConcurrent</code></td>
<td><code>8</code></td>
<td>الأبناء الذين يعملون في وقت واحد من جلسة واحدة</td>
</tr>
<tr>
<td><code>runTimeoutSeconds</code></td>
<td><code>0</code></td>
<td>المدة التي يجوز أن يعملها الابن. <strong><code>0</code> تعني بلا حد</strong></td>
</tr>
<tr>
<td><code>archiveAfterMinutes</code></td>
<td><code>60</code></td>
<td>متى تُؤرشف الأبناء المنتهون</td>
</tr>
<tr>
<td><code>model</code></td>
<td>نموذج الأصل</td>
<td>أي نموذج يستخدمه الأبناء</td>
</tr>
</tbody>
</table>
<p>اثنان من هذه يستحقان التغيير:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  agents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    defaults<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      subagents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        maxSpawnDepth<span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
        runTimeoutSeconds<span class="hljs-punctuation">:</span> <span class="hljs-number">900</span><span class="hljs-punctuation">,</span>
        model<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;your-cheaper-model&#x27;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong>العمق الضحل</strong> يمنحك عمّالًا لا يستطيعون تجنيد مزيد من العمّال. والأبناء عند العمق الأقصى يفقدون أدوات التوليد تمامًا.</li>
<li><strong>المهلة</strong> ضابط أمان بقدر ما هي ضابط تكلفة. ولا يوجد حد زمني افتراضيًا.</li>
<li><strong>النموذج الأرخص</strong> يناسب معظم العمل المفوَّض، مثل القراءة والبحث والتلخيص. ولكل ابن سياقه الخاص، لذا يكلّف تفريع خمسة أبناء نحو خمسة أضعاف تكلفة واحد.</li>
</ul>
<p>معظم هذه لا يمكن ضبطها إلا في <code>defaults</code>. ولكل وكيل، يمكنك ضبط <code>model</code> و<code>thinking</code> و<code>allowAgents</code> و<code>delegationMode</code> و<code>requireAgentId</code>.</p>
<h2 id="مقدار-ما-يفوضه-وكيلك">مقدار ما يفوّضه وكيلك</h2>
<p>يتحكم <code>delegationMode</code> في مدى قوة حثّ الوكيل على التفويض. فالجلسات الرئيسية تفترض <code>prefer</code>، وكل ما عداها يفترض <code>suggest</code>. وهذا لا يغيّر سوى تعليمات الوكيل. وهو لا يجدول شيئًا ولا يفرضه. وإن كان وكيلك يولّد أبناء لمهام لا تحتاجهم، فأخفِضه:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> agents.entries.main.subagents.delegationMode suggest
</code></pre>
<h2 id="الوصول-بين-الوكلاء-مفعل-افتراضيا">الوصول بين الوكلاء مفعّل افتراضيًا</h2>
<p>بمجرد أن يصبح لديك أكثر من وكيل واحد، يحدّد إعدادان ما يمكنهم رؤيته من بعضهم البعض:</p>
<table>
<thead>
<tr>
<th>الإعداد</th>
<th>الافتراضي</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>tools.agentToAgent.enabled</code></td>
<td><code>true</code></td>
<td>تستطيع الوكلاء قراءة جلسات بعضها ومراسلتها</td>
</tr>
<tr>
<td><code>tools.sessions.visibility</code></td>
<td><code>all</code></td>
<td>أي الجلسات تستطيع أدوات الجلسات رؤيتها: <code>self</code> أو <code>tree</code> أو <code>agent</code> أو <code>all</code></td>
</tr>
</tbody>
</table>
<p>من السهل أن تفترض أن هذين يبدآن مغلقين. لكنهما يبدآن مفتوحين، ووجودهما <em>لتضييق</em> الوصول. وإن أضفت وكيلًا يتعامل مع محتوى غير موثوق، ففكّر في تشديدهما. ويستخدم خط الأساس المشدَّد في وثائق OpenClaw الإعدادين <code>visibility: &quot;agent&quot;</code> و<code>agentToAgent.enabled: false</code>. واختبر أن تفويضك ما زال يعمل بعد تغييرهما.</p>
<h2 id="أنماط-تستحق-الاقتباس">أنماط تستحق الاقتباس</h2>
<h3 id="البحث-المتوازي">البحث المتوازي</h3>
<p>قسّم العمل حسب المصدر المستقل، واطلب المخرج نفسه من كل ابن، وادمج فقط حين ينتهوا جميعًا:</p>
<blockquote>
<p>أريد تحديثًا لحالة المشروع X. ولّد ثلاثة وكلاء فرعيين بالتوازي: واحد يقرأ إيداعات المستودع في الأسبوع الماضي، وواحد يقرأ المسائل المفتوحة، وواحد يقرأ سجل النشر. وليعد كل واحد التنسيق نفسه: ملخّص من ثلاث نقاط، وقائمة بالعوائق، وقائمة «مصادر». وإن لم يستطع ابن الوصول إلى مصدره، فعليه أن يقول «المصدر غير متاح» بدلًا من التخمين. وانتظر الثلاثة جميعًا، ثم اكتب تحديثًا واحدًا مدموجًا.</p>
</blockquote>
<p>طلب «المصدر غير متاح» مهم. فبدونه، يميل الابن الذي يصطدم بخطأ إلى ملء الفراغ بشيء معقول.</p>
<h3 id="القارئ-المعزول">القارئ المعزول</h3>
<p>اجعل <a href="#lever-2-a-dedicated-agent-for-risky-work">researcher</a> يقرأ أي شيء غير موثوق، وتصرّف أنت بناءً على ملخّصه:</p>
<blockquote>
<p>استخدم وكيل researcher ليقرأ أحدث ثلاث رسائل من المورّدين ويلخّص ما يطلبه كل واحد منها. لا تتخذ أي إجراء. سأقرّر أنا ما أفعل.</p>
</blockquote>
<h3 id="فريق-مع-منسق">فريق مع منسّق</h3>
<p>يستطيع OpenClaw إنشاء فريق جاهز: منسّق مع باحث وكاتب ومراجع.</p>
<pre><code class="language-bash">openclaw agents team create --prefix team --non-interactive
openclaw agent --agent team-coordinator --message <span class="hljs-string">&quot;Research the tradeoffs of SQLite vs. Postgres for a personal project and write a one-page recommendation.&quot;</span>
</code></pre>
<p>يمنح <code>--prefix</code> الوكلاء الأربعة أسماء مثل <code>team-researcher</code>، فلا تتصادم مع <code>researcher</code> الذي أنشأته أعلاه. وإن كان أي من الأسماء موجودًا بالفعل، فلا يضيف الأمر شيئًا.</p>
<p>يُسمح للمنسّق بتوليد المتخصّصين الثلاثة، ويُطلب منه تفضيل التفويض. ولا يستطيع المتخصّصون توليد أي أحد، فلا يدورون في حلقة على بعضهم. ولا يغيّر الفريق أي سياسة أدوات، لذا امنح كل متخصّص كتلة <code>tools</code> الخاصة به كما في <a href="#lever-2-a-dedicated-agent-for-risky-work">الرافعة 2</a>. وتحدّث إلى المنسّق مباشرةً بدلًا من توليده، لأنه يعتمد على أدوات لا يحصل عليها الوكلاء الفرعيون.</p>
<h3 id="الكاتب-والناقد">الكاتب والناقد</h3>
<p>اجعل ابنًا يصوغ مسوّدة وآخر يراجع مقابل قائمة تحقّق، مع قرار منك أو من الأصل بين الجولات. وأبقِ الحلقة محدودة بأن تقول كم جولة مسموح بها. فالوكلاء الذين يستطيعون الرد على بعضهم سيستمرون بسرور.</p>
<blockquote>
<p><strong>ميزتان مرتبطتان</strong></p>
<p><strong>الأسراب (Swarms)</strong> تشغّل أبناء متشابهين كثيرين من سكربت صغير وتجمع نتائج منظّمة. وهي مقصودة لخمس مهام متطابقة تقريبًا أو أكثر ولها <a href="https://stevekinney.com/courses/openclaw/swarms">درسها الخاص</a>. أما <strong>الوكلاء الفرعيون المرتبطون بخيط محادثة</strong> فيمنحون الابن خيط دردشة خاصًا به يمكنك التحدّث إليه مباشرةً. وهي تعمل على Discord وMatrix، لا على Telegram.</p>
</blockquote>
<h2 id="أمور-توجع">أمور تُوجع</h2>
<ul>
<li><strong>لا مهلة افتراضيًا.</strong> اضبط <code>runTimeoutSeconds</code>.</li>
<li><strong>إعادة التشغيل لا تعيد إطلاق العمل.</strong> فإن أُعيد تشغيل البوابة في منتصف التشغيل، يُنهى الأبناء المتقطّعون بوصفهم متقطّعين، لا يُعاد تشغيلهم. افحص <code>/subagents list</code> وقرّر ما يزال يحتاج إلى عمل قبل أن تسأل مرة أخرى، وإلا فقد تؤدي العمل مرتين.</li>
<li><strong>مخرجات الابن دليل، لا تعليمات.</strong> فالابن الذي قرأ صفحة خبيثة قد يعيد نصًا يحاول توجيه الأصل. عامل الملخّصات بارتياب مثل المحتوى الذي جاءت منه.</li>
<li><strong>البيئات المعزولة لا تُفتح.</strong> فجلسة معزولة لا تستطيع توليد وكيل يعمل بغير عزل.</li>
<li><strong>أسماء الوكلاء القديمة تكسر التوليد.</strong> فإن حذفت وكيلًا لا يزال مدرجًا في <code>allowAgents</code>، فشل التوليد. ويُنظّف <code>openclaw doctor --fix</code> القائمة.</li>
</ul>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li><strong>افحص ابنًا.</strong> ولّد قارئ <code>AGENTS.md</code> من السابق، وتنقّل عبر <code>/subagents list</code> و<code>info</code> و<code>log ... tools</code>.</li>
<li><strong>اسأل ابنًا عمّا لديه.</strong> ولّد وكيلًا فرعيًا واطلب منه سرد أدواته التي يملكها وأي ملفات مساحة عملك يستطيع رؤيتها. وقارن قائمة أدواته بـ <code>/tools</code> في جلستك الرئيسية. وينبغي أن تكون <code>message</code> و<code>cron</code> و<code>gateway</code> مفقودة. لكن وصف الابن لأدواته ليس دليلًا. فإن سرد واحدة من هذه، فاطلب منه أن يستدعيها فعلًا وتأكّد أن النداء مرفوض.</li>
<li><strong>اسلب سطر الأوامر.</strong> شغّل <code>openclaw config set tools.subagents.tools.deny '[&quot;exec&quot;]'</code>، ثم اطلب من وكيل فرعي تشغيل <code>uname -a</code>. وينبغي أن يبلّغ أنه لا يستطيع. وأعد الأمر بـ <code>openclaw config unset tools.subagents.tools.deny</code>.</li>
<li><strong>أثبت أن researcher مقفل.</strong> اطلب من وكيل researcher تشغيل <code>ls ~</code>. وينبغي أن يفشل، بينما ينجح بحث في الويب.</li>
<li><strong>اصطدم بحدّ العمق.</strong> اضبط <code>agents.defaults.subagents.maxSpawnDepth</code> على <code>1</code>، ثم اطلب من وكيل فرعي توليد وكيل فرعي خاص به. وينبغي ألا يستطيع، لأن الأبناء عند العمق الأقصى لا يحصلون على أداة التوليد. ثم أعده إلى ما كان عليه سابقًا (الافتراضي <code>5</code>).</li>
<li><strong>فرّع.</strong> شغّل مطالبة البحث المتوازي على شيء حقيقي، وتأكّد أن كل ابن أعاد التنسيق نفسه.</li>
<li><strong>أوقف شجرة.</strong> اطلب تفريعًا كبيرًا، وأرسل <code>/stop</code> في منتصفه، وتأكّد بـ <code>/subagents list</code> أن الأبناء توقفوا أيضًا.</li>
</ol>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<table>
<thead>
<tr>
<th>العَرَض</th>
<th>ما تفحصه</th>
</tr>
</thead>
<tbody>
<tr>
<td>يُرفض توليد وكيل آخر</td>
<td><code>subagents.allowAgents</code> على الوكيل الذي يقوم بالتوليد</td>
</tr>
<tr>
<td>استخدم ابن أداة ظننت أنك حظرتها</td>
<td>الأبناء من الوكيل نفسه يرثون سياسة الأصل. استخدم وكيلًا مخصّصًا أو <code>tools.subagents.tools</code></td>
</tr>
<tr>
<td>لم تفعل إضافة أداة إلى <code>tools.subagents.tools.allow</code> شيئًا</td>
<td><code>allow</code> تزيل الأدوات فقط. أضفها إلى الملف الشخصي بـ <code>alsoAllow</code> بدلًا من ذلك</td>
</tr>
<tr>
<td>تعمل مهارة في الجلسة الرئيسية لا في ابن</td>
<td>قد يكون <code>exec</code> ممنوعًا على الوكلاء الفرعيين، أو المهارة ليست في قائمة سماح الوكيل الابن</td>
</tr>
<tr>
<td>يفقد الابن سياقًا ظننت أنه يملكه</td>
<td>لا يحصل الأبناء إلا على <code>AGENTS.md</code> والمهمة. ضع الباقي في المهمة</td>
</tr>
<tr>
<td>لم يصل أي إبلاغ أبدًا</td>
<td><code>/subagents list</code> لمعرفة حالته، وما إذا انتهت مهلته أو أُوقف</td>
</tr>
<tr>
<td>يفشل التوليد بعد حذف وكيل</td>
<td><code>openclaw doctor --fix</code> لإزالة إدخالات <code>allowAgents</code> القديمة</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يطابق هذا الدرس إصدار OpenClaw <code>2026.9.8</code>. وإن لم يتصرّف شيء كما هو موصوف، فشغّل الأمر مع <code>--help</code> وراجع <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,p={book:n,chapter:s,chapterTitle:t,slug:e,title:o,headings:a,html:c};export{n as book,s as chapter,t as chapterTitle,p as default,a as headings,c as html,e as slug,o as title};
