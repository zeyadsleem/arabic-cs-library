const s="kinney",e="openclaw",n="OpenClaw: مساعدك الذكي الشخصي",t="swarms",a="الأسراب (Swarms)",o=[{depth:2,id:"كيف-يختلف-أبناء-السرب",text:"كيف يختلف أبناء السرب"},{depth:2,id:"ما-تحتاجه-وضع-الشيفرة",text:"ما تحتاجه: وضع الشيفرة"},{depth:2,id:"كتابة-سرب",text:"كتابة سرب"},{depth:2,id:"الحدود",text:"الحدود"},{depth:2,id:"تشغيل-الجامعين-كوكيل-مقيد",text:"تشغيل الجامعين كوكيل مقيّد"},{depth:2,id:"المراقبة-والإيقاف",text:"المراقبة والإيقاف"},{depth:2,id:"بدون-وضع-الشيفرة",text:"بدون وضع الشيفرة"},{depth:2,id:"جربه",text:"جرّبه"},{depth:3,id:"1-افحص-هل-وضع-الشيفرة-نشط",text:"1. افحص هل وضع الشيفرة نشط"},{depth:3,id:"2-شغل-سربك-الأول",text:"2. شغّل سربك الأول"},{depth:3,id:"3-اجعل-ابنا-واحدا-يفشل",text:"3. اجعل ابنًا واحدًا يفشل"},{depth:3,id:"4-أكد-أن-الجامعين-لا-يسألون-أبدا",text:"4. أكّد أن الجامعين لا يسألون أبدًا"},{depth:3,id:"5-وجه-الجامعين-إلى-researcher",text:"5. وجّه الجامعين إلى researcher"},{depth:3,id:"6-أوقف-واحدا-في-منتصفه",text:"6. أوقف واحدًا في منتصفه"},{depth:3,id:"7-قرر-ما-الذي-تبقيه",text:"7. قرّر ما الذي تُبقيه"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],d=`<p><a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيون</a> مناسبون لتسليم بضع قطع من العمل. وحين تكون لديك مهام متشابهة كثيرة، مثل مراجعة عشرين ملفًا، أو فحص دستة من المورّدين، أو تلخيص كل مشكلة في مرحلة إنجاز، يصبح توليد الأبناء واحدًا واحدًا وانتظار كل إبلاغ أمرًا ثقيلًا. و<strong>السرب (swarm)</strong> هو أداة OpenClaw لذلك.</p>
<p>في السرب، يكتب وكيلك برنامج JavaScript قصيرًا يبدأ دفعة من الأبناء، وينتظرهم، ويجمع نتائجهم. والبرنامج هو الخطة: فـ <code>Promise.allSettled</code> و<code>if</code> و<code>while</code> العادية تقرّر ما يُشغَّل وبأي ترتيب. ولا توجد صيغة سير عمل خاصة.</p>
<p>وتقترح الوثائق استخدام سرب عندما تكون لديك نحو <strong>خمس مهام</strong> متشابهة ومستقلّة أو أكثر. أما مهمة واحدة أو بضع مهام، فالوكيل الفرعي العادي أبسط.</p>
<h2 id="كيف-يختلف-أبناء-السرب">كيف يختلف أبناء السرب</h2>
<p>يُسمّى أبناء السرب <strong>جامعين (collectors)</strong>. وهم جلسات وكلاء فرعيين عادية، لكن بطريقة مختلفة في الإنهاء:</p>
<table>
<thead>
<tr>
<th>الوكيل الفرعي العادي</th>
<th>جامع السرب</th>
</tr>
</thead>
<tbody>
<tr>
<td>يُعلن نتيجته إلى الأصل</td>
<td>يحفظ نتيجته ليأخذها السكربت</td>
</tr>
<tr>
<td>يمكن توجيهه أثناء تشغيله</td>
<td>لا يمكن توجيهه</td>
</tr>
<tr>
<td>ينتظر الموافقة مثل أي تشغيل</td>
<td><strong>لا يسأل أبدًا.</strong> وكل ما يحتاج موافقة يُرفض</td>
</tr>
<tr>
<td>يُعيد نصًا</td>
<td>يمكنه إعادة JSON مُتحقَّق منه عند إعطائه مخطّطًا</td>
</tr>
</tbody>
</table>
<p>وقاعدة الموافقة تلك هي ما يجب أن تبني تصميمك حوله. فالسرب غير مُراقَب بحكم تصميمه، فامنح الجامعين عملًا للقراءة فقط. وإن احتاجت مهمة أمرًا كان يسألك أولًا عادةً، يُبلّغ الجامع عن الرفض بدلًا من الانتظار.</p>
<p>وكل ما ورد في درس الوكلاء الفرعيين عن سياسة الأدوات يبقى ساريًا. فجامع تابع لوكيلك الرئيسي يرث أدواته، ناقصًا الأدوات التي يفقدها كل وكيل فرعي (مثل <code>message</code> و<code>cron</code>). ولتقييد الجامعين أكثر، شغّلهم كـ<a href="#run-collectors-as-a-locked-down-agent">وكيل مخصّص</a>.</p>
<h2 id="ما-تحتاجه-وضع-الشيفرة">ما تحتاجه: وضع الشيفرة</h2>
<p>الأسراب مفعّلة افتراضيًا. والطريقة السهلة لكتابة سرب، وهي دالة <code>agents.run()</code>، تحتاج إلى أن يكون <strong>وضع الشيفرة (Code Mode)</strong> نشطًا للتشغيل.</p>
<p><strong>وضع الشيفرة</strong> ميزة تجريبية تغيّر طريقة استخدام وكيلك للأدوات. فبدلًا من استدعاء الأدوات واحدة واحدة، يكتب النموذج برنامج JavaScript صغيرًا يستدعيها كدوال. وهذا ما يتيح له بدء عشرين ابنًا في دفعة واحدة.</p>
<p>الافتراضي في وضع الشيفرة هو <code>&quot;auto&quot;</code>، وهو يفعّله فقط للنماذج التي وسمها OpenClaw بأنها تعمل معه جيدًا. وتشمل تلك القائمة أحدث نماذج Claude Opus وSonnet وأحدث نماذج GPT، وغيرها. وهي لا تشمل نماذج أصغر مثل Haiku، ولا نماذج Ollama المحلية، ولا نقاط النهاية المخصّصة.</p>
<p>ولا يمكنك أن تعرف من تهيئتك هل هو مفعّل فعلًا، فافحص تشغيلًا حقيقيًا. وهذا يرسل رسالة واحدة في جلسة مؤقتة، فلا يزدحم به حديثك الرئيسي:</p>
<pre><code class="language-bash">openclaw agent --agent main --session-key agent:main:code-mode-check \\
  --message <span class="hljs-string">&quot;Reply with OK.&quot;</span> --json | grep codeModeEngaged
</code></pre>
<p>و<code>&quot;codeModeEngaged&quot;: true</code> يعني أنك جاهز. وإن كانت <code>false</code>، فيمكنك تفعيل وضع الشيفرة:</p>
<ul>
<li><strong>في واجهة التحكم:</strong> <strong>Settings → System → Labs → Code Mode</strong>. ويُطبَّق على التشغيل التالي، دون إعادة تشغيل.</li>
<li><strong>لكل الوكلاء:</strong> <code>openclaw config set tools.codeMode true</code></li>
<li><strong>لوكيل واحد:</strong> <code>openclaw config set agents.entries.main.tools.codeMode true</code></li>
</ul>
<p>و<code>true</code> يفرضه على كل نموذج، و<code>&quot;auto&quot;</code> يعود إلى الافتراضي. وإن كتبت <code>tools.codeMode</code> يومًا ككائن، فأدرج <code>enabled</code>. والكائن بلا <code>enabled</code> يُطفئ وضع الشيفرة.</p>
<blockquote>
<p><strong>وضع الشيفرة يغيّر طريقة عمل وكيلك عمومًا</strong></p>
<p>يؤثّر وضع الشيفرة على كل نداء أداة، لا على الأسراب فقط، وهو ما زال تجريبيًا. فإن ساء أداء وكيلك في المهام اليومية بعد فرضه، ففعّله لوكيل منفصل بدلًا من ذلك واستخدم ذاك للعمل المتفرّع.</p>
</blockquote>
<blockquote>
<p><strong>في نماذج OpenAI، افحص بيئة التشغيل لديك</strong></p>
<p>تعمل نماذج OpenAI عبر بيئة تشغيل Codex افتراضيًا، ولها وضع الشيفرة الخاص بها ولا تستخدم وضع OpenClaw أبدًا. والأسراب تعمل هناك أيضًا، لكن الأدوات تُستدعى باسم <code>tools.&lt;name&gt;</code> داخل السكربتات وتختلف التهيئة. ويفترض هذا الدرس بيئة تشغيل OpenClaw نفسه.</p>
</blockquote>
<h2 id="كتابة-سرب">كتابة سرب</h2>
<p>متى كان وضع الشيفرة نشطًا، صارت لوكيلك ثلاث دوال إضافية:</p>
<pre><code class="language-typescript">agents.<span class="hljs-title function_">run</span>(prompt, options?)   <span class="hljs-comment">// start one collector and wait for its result</span>
<span class="hljs-title function_">phase</span>(title)                   <span class="hljs-comment">// label a stage, shown in the progress widget</span>
<span class="hljs-title function_">log</span>(message)                   <span class="hljs-comment">// post a short progress note</span>
</code></pre>
<p>وتأخذ <code>agents.run</code> هذه الخيارات: <code>label</code> و<code>model</code> و<code>thinking</code> و<code>fastMode</code> و<code>agentId</code> و<code>phase</code> و<code>schema</code>. وبدون <code>schema</code>، تُحلّ إلى النص النهائي للابن. ومع واحد، يجب أن يقدّم الابن جوابًا يطابقه، فتُحلّ <code>agents.run</code> إلى تلك القيمة.</p>
<p>وهذا شكل سكربت نموذجي. يكتبه وكيلك؛ ولا يلزمك أنت:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> reviewSchema = {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;object&#x27;</span>,
  <span class="hljs-attr">properties</span>: {
    <span class="hljs-attr">file</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
    <span class="hljs-attr">purpose</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
    <span class="hljs-attr">suggestion</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
  },
  <span class="hljs-attr">required</span>: [<span class="hljs-string">&#x27;file&#x27;</span>, <span class="hljs-string">&#x27;purpose&#x27;</span>, <span class="hljs-string">&#x27;suggestion&#x27;</span>],
  <span class="hljs-attr">additionalProperties</span>: <span class="hljs-literal">false</span>,
};

<span class="hljs-keyword">const</span> files = [<span class="hljs-string">&#x27;AGENTS.md&#x27;</span>, <span class="hljs-string">&#x27;SOUL.md&#x27;</span>, <span class="hljs-string">&#x27;USER.md&#x27;</span>, <span class="hljs-string">&#x27;TOOLS.md&#x27;</span>, <span class="hljs-string">&#x27;MEMORY.md&#x27;</span>];
<span class="hljs-title function_">phase</span>(<span class="hljs-string">&#x27;Review workspace files&#x27;</span>);

<span class="hljs-keyword">const</span> settled = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">allSettled</span>(
  files.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span>
    agents.<span class="hljs-title function_">run</span>(<span class="hljs-string">\`Read <span class="hljs-subst">\${file}</span> in the workspace. Say what it&#x27;s for and suggest one improvement.\`</span>, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">\`review-<span class="hljs-subst">\${file}</span>\`</span>,
      <span class="hljs-attr">schema</span>: reviewSchema,
    }),
  ),
);

<span class="hljs-keyword">const</span> reviews = [];
<span class="hljs-keyword">const</span> failures = [];
settled.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">outcome, index</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (outcome.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span>) reviews.<span class="hljs-title function_">push</span>(outcome.<span class="hljs-property">value</span>);
  <span class="hljs-keyword">else</span> failures.<span class="hljs-title function_">push</span>({ <span class="hljs-attr">file</span>: files[index], <span class="hljs-attr">error</span>: <span class="hljs-title class_">String</span>(outcome.<span class="hljs-property">reason</span>) });
});

<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${reviews.length}</span> reviews, <span class="hljs-subst">\${failures.length}</span> failures\`</span>);
<span class="hljs-keyword">return</span> { reviews, failures };
</code></pre>
<p>وهناك أنماط قليلة تهمّ:</p>
<ul>
<li><strong>استخدم <code>Promise.allSettled</code> لا <code>Promise.all</code>.</strong> فمع <code>all</code>، يُهدر ابن فاشل واحد كل نتيجة أخرى. أما مع <code>allSettled</code>، فتحتفظ بما نجح ويمكنك الإبلاغ عمّا لم ينجح.</li>
<li><strong>الابن الفاشل يرفض بـ <code>SwarmAgentError</code>.</strong> وهي تحمل <code>runId</code> و<code>status</code> الخاصين بالابن. والابن الذي يُعيد JSON لا يطابق المخطّط يُحتسب فاشلًا.</li>
<li><strong>حدّد حلقاتك.</strong> فحلقة <code>while</code> التي تظل تولّد أبناء حتى يصير شيء ما «جاهزًا» ينبغي أن تتوقّف بعد عدد ثابت من الدورات. وحدود المجموعة أدناه ليست إلا شبكة أمان.</li>
<li><strong>لا تُعِد التشغيل عند الفشل تلقائيًا.</strong> أبلِغ عن الإخفاقات ودع الوكيل، أو نفسك، يقرّر.</li>
</ul>
<p>وعمليًا لن تكتب هذه السكربتات بيدك. تصف التفرّع، وتقول «استخدم Swarm» أو «استخدم <code>agents.run</code>»، وتطلب مخطّطًا و<code>Promise.allSettled</code>. ويكتب الوكيل السكربت.</p>
<h2 id="الحدود">الحدود</h2>
<p>وهذه تقع تحت <code>tools.swarm</code>:</p>
<table>
<thead>
<tr>
<th>الإعداد</th>
<th>الافتراضي</th>
<th>ما الذي يحدّه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>maxConcurrent</code></td>
<td><code>32</code></td>
<td>الأبناء العاملون في وقت واحد. والباقي ينتظر في الطابور</td>
</tr>
<tr>
<td><code>maxChildrenPerGroup</code></td>
<td><code>50</code></td>
<td>الأبناء الأحياء في سرب واحد</td>
</tr>
<tr>
<td><code>maxTotalPerGroup</code></td>
<td><code>200</code></td>
<td>الأبناء الذين قد يبدأهم سرب واحد إجمالًا</td>
</tr>
<tr>
<td><code>waitTimeoutSecondsMax</code></td>
<td><code>600</code></td>
<td>أطول مدة يمكن أن يستغرقها انتظار واحد</td>
</tr>
<tr>
<td><code>defaultAgentId</code></td>
<td>(فارغ)</td>
<td>أي وكيل يعمل الجامعون باسمه. والفارغ يعني وكيلك</td>
</tr>
<tr>
<td><code>enabled</code></td>
<td><code>true</code></td>
<td>اضبطه على <code>false</code> لإطفاء الأسراب</td>
</tr>
</tbody>
</table>
<p>ولا يُحتسب أبناء السرب على حدود الوكيل الفرعي العادية (<code>maxConcurrent: 8</code> و<code>maxChildrenPerAgent: 5</code>)، لكن <code>maxSpawnDepth</code> يبقى ساريًا.</p>
<p><strong>التكلفة تتناسب مع الدفعة.</strong> فكل ابن عامل هو محادثة نموذج مستقلة. وعشرون ابنًا تكلّف نحو عشرين ضعف ابن واحد. وللعمل المتفرّع الرخيص، مرّر <code>model</code> أرخص إلى <code>agents.run</code> أو شغّل الجامعين كوكيل ذي نموذج افتراضي أرخص.</p>
<h2 id="تشغيل-الجامعين-كوكيل-مقيد">تشغيل الجامعين كوكيل مقيّد <span class="content-anchor" id="run-collectors-as-a-locked-down-agent"></span></h2>
<p>يرسل <code>defaultAgentId</code> كل جامع إلى وكيل مختلف ما لم يقل السكربت غير ذلك. وجّهه إلى <code>researcher</code> الذي يعمل للقراءة فقط من <a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration#lever-2-a-dedicated-agent-for-risky-work">درس الوكلاء الفرعيين</a>، فيحصل كل ابن على سياسة الأدوات الضيّقة لذلك الوكيل ونموذجه ومساحة عمله:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> tools.swarm.defaultAgentId researcher
openclaw config <span class="hljs-built_in">set</span> agents.entries.researcher.tools.swarm <span class="hljs-literal">false</span>
</code></pre>
<p>ويمنع السطر الثاني researcher من بدء أسراب خاصة به. ويجب أن يكون الوكيل الهدف ضمن <code>subagents.allowAgents</code> لوكيلك الرئيسي، وهذا ما هو عليه بالفعل إن كنت قد اتّبعت ذلك الدرس. وإن لم يكن، رُفضت عمليات التوليد بدلًا من الرجوع إلى وكيلك الرئيسي.</p>
<h2 id="المراقبة-والإيقاف">المراقبة والإيقاف</h2>
<p>أبقِ المحادثة مفتوحة في <strong>واجهة التحكم</strong> (أو تطبيق macOS أو iOS أو Android) أثناء عمل السرب. وتظهر أداة تقدّم فوق مربّع الرسالة بأعداد المنتظر والعامل والمكتمل والفاشل-أو-المتوقّف. وانقر <strong>Child details</strong> لترى كل ابن والمدة التي استغرقها. وللجامعين أيضًا نصوصهم الخاصة، لكنهم لا يحصلون على صفوف في الشريط الجانبي للجلسات.</p>
<p>ولا يُظهر Telegram وتطبيقات الدردشة الأخرى أداة التقدّم. وإن كنت قد بدأت السرب هناك، فافتح الجلسة نفسها في واجهة التحكم لتراقبه.</p>
<p>لإيقاف سرب، انقر <strong>Stop</strong> في محادثة الأصل. وهذا يُلغي أبناء السرب وكل ما بدأوه. ومثل الوكلاء الفرعيين الآخرين، <strong>يستمر الجامعون الذين بدأوا بالفعل في العمل</strong> إن انتهى الأصل أو انتهت مهلته ببساطة، فأوقفهم صراحةً.</p>
<p>وإن أُعيد تشغيل البوابة في منتصف سرب، لا يُعاد إطلاق الأبناء المنقطعين، ولا يُستأنف السكربت نفسه. فانظر في ما انتهى قبل أن تطلب الباقي مرة أخرى.</p>
<h2 id="بدون-وضع-الشيفرة">بدون وضع الشيفرة</h2>
<p>إن لم تستطع تفعيل وضع الشيفرة أو لم ترغب فيه، فالآلية نفسها متاحة كأدوات عادية. فيستدعي وكيلك <code>sessions_spawn</code> مع <code>collect: true</code> (ومع <code>outputSchema</code> لنتائج JSON)، ثم يستدعي <code>agents_wait</code> بمعرّفات التشغيل لجمع النتائج. ويجب أن تسمح سياسة أدواتك بالأداتين. وهو أثقل، لأن النموذج يجري نداء أداة واحدًا لكل ابن، لكنه يعمل مع أي نموذج.</p>
<h2 id="جربه">جرّبه</h2>
<h3 id="1-افحص-هل-وضع-الشيفرة-نشط">1. افحص هل وضع الشيفرة نشط</h3>
<p>شغّل فحص <code>codeModeEngaged</code> من أعلاه. وإن قال <code>false</code>، ففعّل وضع الشيفرة بمفتاح Labs أو بـ <code>openclaw config set tools.codeMode true</code>، ثم افحص مرة أخرى.</p>
<h3 id="2-شغل-سربك-الأول">2. شغّل سربك الأول</h3>
<p>اطلب من وكيلك:</p>
<blockquote>
<p>استخدم Swarm. اكتب سكربت وضع شيفرة يستدعي <code>agents.run</code> مرة واحدة لكل ملف من ملفات مساحة العمل هذه: AGENTS.md وSOUL.md وUSER.md وTOOLS.md وMEMORY.md. ويقرأ كل ابن ملفه ويُعيد <code>{ file, purpose, suggestion }</code> باستخدام مخطّط. واستخدم <code>Promise.allSettled</code>. ثم أعطني جدولًا بالنتائج واسرد أي إخفاقات.</p>
</blockquote>
<p>افتح المحادثة في واجهة التحكم وراقب أداة التقدّم أثناء عمله. وحين ينتهي، ينبغي أن يكون لديك صف لكل ملف، مع اقتراح لكل منها. والاقتراحات نفسها مفيدة؛ ففكّر في تنفيذ أحدها.</p>
<p><img src="/arabic-cs-library/images/kinney/1f43dfbbefda49b0.webp" alt="محادثة واجهة التحكم بعد سرب من خمسة أبناء، مع جدول النتائج فوق أداة مهام متوازية تسرد خمسة أبناء مراجعة مكتملين والمدة التي استغرقها كل منهم"></p>
<h3 id="3-اجعل-ابنا-واحدا-يفشل">3. اجعل ابنًا واحدًا يفشل</h3>
<p>شغّله مرة أخرى بملف سادس غير موجود، مثل <code>NOPE.md</code>. ينبغي أن تحصل على خمس نتائج وإخفاق واحد مُبلَّغ عنه. وقد ينتهي ابن بشكل طبيعي بدلًا من ذلك ويبلّغ أنه لم يستطع تحديد شيء لأن الملف غير موجود، حسب النموذج، فيظهر الملف المفقود في ملخّص الوكيل. ثم اطلب السرب نفسه باستخدام <code>Promise.all</code> بدلًا من ذلك. فإن فشل ابن فشلًا صريحًا، يفشل التشغيل كله هذه المرة وتُفقد النتائج الخمس الجيدة. وإن انتهى كل ابن انتهاءً طبيعيًا، ينجح <code>Promise.all</code> أيضًا، لأن شيئًا لم يُرفض. وفي الحالتين، <code>allSettled</code> هو الذي لا يُهدر النتائج الجيدة أبدًا، ولهذا ينبغي أن تستخدمه السكربتات.</p>
<h3 id="4-أكد-أن-الجامعين-لا-يسألون-أبدا">4. أكّد أن الجامعين لا يسألون أبدًا</h3>
<p>إن كانت سياسة تنفيذك تسأل قبل تشغيل الأوامر (انظر <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">الأمن والموافقات</a>)، فاطلب سربًا من خمسة أبناء يشغّل فيه كل ابن <code>uname -a</code> ويبلّغ بالخرج. وينبغي ألا تظهر أي بطاقة موافقة. وينبغي أن يبلّغ كل ابن بأن الأمر رُفض. وقارن ذلك بمطالبة وكيلك الرئيسي بتشغيل <code>uname -a</code> مباشرةً، فهو يسألك أولًا فعلًا.</p>
<h3 id="5-وجه-الجامعين-إلى-researcher">5. وجّه الجامعين إلى researcher</h3>
<p>اضبط <code>tools.swarm.defaultAgentId</code> على <code>researcher</code> كما هو موضّح أعلاه، وشغّل مراجعة الملفات الخمسة مرة أخرى. وانظر في الأجوبة بدقة: فهي تصف الآن مساحة عمل researcher، لا مساحة عمل وكيلك الرئيسي، لأن لكل وكيل مساحته الخاصة. وقد تكون بعض الملفات مفقودة هناك. ثم اطلب سربًا يحاول فيه كل ابن تشغيل <code>ls ~</code>. وينبغي أن يبلّغ كل ابن بأنه لا يستطيع تشغيل الأوامر، لأن researcher لا يملك طرفية. وحين تنتهي، أزل الإعداد:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">unset</span> tools.swarm.defaultAgentId
</code></pre>
<h3 id="6-أوقف-واحدا-في-منتصفه">6. أوقف واحدًا في منتصفه</h3>
<p>اطلب سربًا من عشرة أبناء يبحث كل منهم في موضوع مختلف بعمق، حتى يستغرقوا وقتًا. وبينما تُظهر أداة التقدّم أبناءً عاملين، انقر <strong>Stop</strong>. وينبغي أن تنتقل الأعداد إلى فاشل-أو-متوقّف، وأن يبلّغ الوكيل بنتائج جزئية فقط.</p>
<h3 id="7-قرر-ما-الذي-تبقيه">7. قرّر ما الذي تُبقيه</h3>
<p>إن كنت قد فرضت وضع الشيفرة من أجل هذه التمارين فقط، فقرّر هل تُبقيه. استخدم وكيلك بشكل عادي ليوم واحد. فإن بدا أسوأ في المهام العادية، فأعِد <code>tools.codeMode</code> إلى <code>&quot;auto&quot;</code>، أو فعّله فقط لوكيل تفرّع مخصّص.</p>
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
<td>يقول الوكيل إن <code>agents.run</code> غير متاحة</td>
<td>هل وضع الشيفرة نشط (<code>codeModeEngaged</code>)، وأن <code>tools.swarm</code> ليس <code>false</code></td>
</tr>
<tr>
<td><code>codeModeEngaged</code> تساوي <code>false</code> رغم تفعيل وضع الشيفرة</td>
<td>نموذجك يعمل على بيئة تشغيل لها أدواتها الخاصة، مثل Codex لنماذج OpenAI</td>
</tr>
<tr>
<td>وضع الشيفرة مضبوط لكنه أطفأ نفسه</td>
<td>كائن <code>tools.codeMode</code> بلا <code>enabled</code> يعني الإطفاء</td>
</tr>
<tr>
<td>ابن «فشل» لكن جوابه يبدو جيدًا</td>
<td>لم يطابق JSON الخاص به المخطّط. افحص الخطأ بحثًا عن <code>schemaError</code></td>
</tr>
<tr>
<td>رُفضت عمليات توليد إلى وكيل آخر</td>
<td>يجب أن يكون ذلك الوكيل ضمن <code>subagents.allowAgents</code> لوكيلك</td>
</tr>
<tr>
<td>فشل توليد برسالة تحوي مفتاح تهيئة</td>
<td>بلغ السرب <code>maxChildrenPerGroup</code> أو <code>maxTotalPerGroup</code></td>
</tr>
<tr>
<td>كل ابن يبلّغ عن أمر مرفوض</td>
<td>الجامعون لا يطلبون الموافقة أبدًا. اجعل المهمة للقراءة فقط أو شغّلها خارج السرب</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يطابق هذا الدرس OpenClaw <code>2026.9.8</code>. ووضع الشيفرة تجريبي، فتوقّع أن يتغيّر. فإن لم يتصرّف شيء كما هو موصوف، فافحص <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,c={book:s,chapter:e,chapterTitle:n,slug:t,title:a,headings:o,html:d};export{s as book,e as chapter,n as chapterTitle,c as default,o as headings,d as html,t as slug,a as title};
