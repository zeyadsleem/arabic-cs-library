const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="structured-cli-output-as-pipeline-glue",p="مخرجات سطر الأوامر المُهيكلة كغراء للخطوط الأنابيب",e=[{depth:2,id:"الميكانيكا",text:"الميكانيكا"},{depth:2,id:"المخطط-هو-العقد",text:"المخطّط هو العقد"},{depth:2,id:"فرز-ملفات-الفشل",text:"فرز ملفّات الفشل"},{depth:2,id:"توليد-تعليقات-ci",text:"توليد تعليقات CI"},{depth:2,id:"نمطان-آخران-باختصار",text:"نمطان آخران، باختصار"},{depth:2,id:"عندما-تكون-المخرجات-المهيكلة-الأداة-الخاطئة",text:"عندما تكون المخرجات المُهيكلة الأداة الخاطئة"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],o=`<p>علّمك درس MCP اتجاهًا واحدًا من فكرة العقد المُهيكل: تُغلّف منطق التحقّق لديك في أداة، فيستدعيها الوكيل. ويحصل الوكيل على نتيجة مُنمّطة يستطيع الاستدلال عليها. تلك شيفرتك تخدم الوكيل.</p>
<p>هذا الدرس هو الاتجاه الآخر. <em>سكربتاتك</em> تستدعي الوكيل وتحصل على JSON مُنمّط في المقابل. فيصير حكم الوكيل — «هل هذا الفشل تقلّب عابر أم خلل حقيقي»، «هل يُدخل هذا الفرق مشكلة أمنية»، «أي هذه الأخطاء الخمسة هو السبب الجذري» — خطوة في خط أنابيب تستطيع أن تمرّرها على <code>jq</code>، وتتفرّع عليها، وتغذّي بها المرحلة التالية. الفرضية نفسها كدرس MCP: عقود مُهيكلة بين الشيفرة والنماذج اللغوية الكبيرة. لكن الاتجاه مختلف.</p>
<h2 id="الميكانيكا">الميكانيكا</h2>
<p>الأداة الأساسية هي <a href="https://docs.claude.com/en/docs/claude-code/overview">Claude Code</a> في وضع الطباعة مع قيد مخطّط JSON. والاستدعاء هو:</p>
<pre><code class="language-bash">SCHEMA=$(jq -c . schema.json)

claude -p --bare \\
  --output-format json \\
  --json-schema <span class="hljs-string">&quot;<span class="hljs-variable">$SCHEMA</span>&quot;</span> \\
  <span class="hljs-string">&quot;Analyze the following test output and classify each failure.&quot;</span> \\
  &lt; playwright-report/dossier.md
</code></pre>
<p>وثمّة أمور قليلة تحتاج إلى تفكيك.</p>
<p><code>--bare</code> يجعل الاستدعاء محكم الإغلاق (hermetic). فهو يتخطّى اكتشاف <code>CLAUDE.md</code>، والخطّافات المحلية، وخوادم MCP، والذاكرة التلقائية. فحين تشغّل Claude كخطوة في خط أنابيب، لا تريد حالة محيطة تتسرّب إلى النتيجة. وينبغي أن يُنتج الأمر المخرجات نفسها على حاسوبك، وفي CI، وعلى جهاز زميل.</p>
<p><code>--output-format json</code> يطلب من Claude أن يُعيد JSON بدلًا من نص عادي. ويحمل المغلّف الخارجي بيانات وصفية عن التشغيل، وبياناتك المُهيكلة تعيش في الحقل <code>structured_output</code> على المستوى الأعلى.</p>
<p><code>--json-schema &quot;$SCHEMA&quot;</code> يقيّد الاستجابة لتطابق مخطّطك. ويظلّ Claude قادرًا على استخدام الأدوات والاستدلال للوصول إلى هناك، لكن المخرجات النهائية JSON مُتحقَّق منه ومطابق للشكل الذي عرّفته.</p>
<p>ولاستخراج بياناتك وحدها:</p>
<pre><code class="language-bash">claude -p --bare \\
  --output-format json \\
  --json-schema <span class="hljs-string">&quot;<span class="hljs-variable">$SCHEMA</span>&quot;</span> \\
  <span class="hljs-string">&quot;Classify these failures.&quot;</span> \\
  &lt; dossier.md \\
  | jq <span class="hljs-string">&#x27;.structured_output&#x27;</span>
</code></pre>
<p>هذه هي المصافحة كلها. أنت تعرّف الشكل، وClaude يملؤه، وسكربتك يقرأه.</p>
<blockquote>
<p><strong>قابلية النقل</strong></p>
<p>يستخدم الوضع غير التفاعلي في <a href="https://openai.com/index/codex/">Codex</a> مسار ملف بدلًا من نص مضمّن: <code>codex exec --output-schema ./schema.json -o ./result.json &quot;Classify these failures.&quot; &lt; dossier.md</code>. وملف المخطّط هو نفسه — <code>schema.json</code> واحد مُودَع، وأداتا سطر أوامر. يقرأه Claude عبر متغيّر صدفة، ويقرأه Codex عبر علم. وإن كنت تعمل عبر عائلات نماذج مختلفة، فالمخطّط هو العقد القابل للنقل.</p>
</blockquote>
<h2 id="المخطط-هو-العقد">المخطّط هو العقد</h2>
<p>هذا ما أعنيه بـ«العقد». مخطّط كهذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;object&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;properties&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;failures&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;array&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;object&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;properties&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;test_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;root_cause&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;suggested_fix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;confidence&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;enum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;high&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;medium&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;low&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;related_files&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;array&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;string&quot;</span> <span class="hljs-punctuation">}</span> <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;required&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;test_name&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;root_cause&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;suggested_fix&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;confidence&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;required&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;failures&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا المخطّط يؤدي الوظيفة نفسها التي يؤديها <code>outputSchema</code> في أداة <code>verify_shelf_page</code> من درس غلاف MCP. فهو يحبس مرونة النموذج اللغوي الكبير داخل شكل يستطيع سكربتك استهلاكه. فالنموذج يقرّر <em>ما</em> السبب الجذري. والمخطّط يقرّر <em>كيف</em> يُشكَّل الجواب. وسكربتك اللاحق لا يضطرّ أبدًا إلى تحليل نص حرّ.</p>
<p>أودِع المخطّط في المستودع إلى جانب السكربت الذي يستخدمه. فحين يسأل أحدهم «ماذا تُنتج خطوة الفرز؟»، يكون الجواب <code>schema.json</code>.</p>
<h2 id="فرز-ملفات-الفشل">فرز ملفّات الفشل</h2>
<p>هذا هو النمط الذي أعود إليه أكثر من غيره. علّمك <a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">درس ملفّات الفشل</a> أن تُولّد <code>dossier.md</code> — ملخّص ماركداون مُهيكل لكل اختبار فاشل، مع رسائل الأخطاء ومسارات لقطات الشاشة وأوامر إعادة الإنتاج. وذلك الملفّ جيّد بما يكفي ليقرأه الوكيل تفاعليًا.</p>
<p>لكنك تريد أحيانًا أن يقوم سكربت بالقراءة. ربما تُفرز عشرة إخفاقات دفعة واحدة وتريدها مرتّبة بحسب الثقة. وربما تريد فتح مسائل GitHub للإخفاقات منخفضة الثقة وتسليم مرتفعة الثقة إلى الوكيل في خطوة منفصلة ومُتحقَّق منها. وربما تكون الساعة الثانية صباحًا وقد فشل التشغيل الليلي وتريد ملخّصًا مقروءًا آليًا ينتظرك في الصباح.</p>
<pre><code class="language-bash"><span class="hljs-meta">#!/usr/bin/env bash</span>
<span class="hljs-built_in">set</span> -euo pipefail

SCHEMA=$(jq -c . scripts/triage-schema.json)

claude -p --bare \\
  --output-format json \\
  --json-schema <span class="hljs-string">&quot;<span class="hljs-variable">$SCHEMA</span>&quot;</span> \\
  --append-system-prompt-file prompts/triage-system.md \\
  <span class="hljs-string">&quot;Triage every failure in this dossier.&quot;</span> \\
  &lt; playwright-report/dossier.md \\
  | jq <span class="hljs-string">&#x27;.structured_output.failures[] | select(.confidence == &quot;low&quot;)&#x27;</span> \\
  &gt; needs-human-review.json

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-subst">$(jq length needs-human-review.json)</span> failures flagged for human review&quot;</span>
</code></pre>
<p>لاحظ <code>--append-system-prompt-file</code>. فبما أن <code>--bare</code> يتخطّى <code>CLAUDE.md</code>، فملف طلب النظام هو المكان الذي يذهب إليه سياق مستودعك: أي فئات تستخدم، وما معنى «الثقة» في مشروعك، وأي أسماء اختبارات معروفة بالتقلّب. وهو يُضاف فوق طلب النظام الافتراضي في Claude بدلًا من أن يستبدله. أما طلب المستخدم — ملفّ الفشل نفسه — فيأتي عبر المدخل القياسي. أودِع الملفّين في التحكّم بالإصدارات. وهذا هو المكافئ المحكم لـ<code>CLAUDE.md</code> في استدعاءات خطوط الأنابيب.</p>
<p>يتوقّف السكربت عند التصنيف. ولا يطبّق الإصلاحات تلقائيًا. فالثقة التي يبلّغ عنها النموذج نافعة للتوجيه، لا لتغييرات شيفرة بلا إشراف. ودرس <a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفّات الفشل</a> يمنح الوكيل أمر إعادة إنتاج لكل فشل — <em>هناك</em> تحدث حلقة الإصلاح، فشلًا واحدًا في كل مرة، والاختبارات تحرس كل خطوة.</p>
<h2 id="توليد-تعليقات-ci">توليد تعليقات CI</h2>
<p>نمط أقصر بعائد كبير. تدعم GitHub Actions تعليقات من نوع <code>::error file=...,line=...::message</code> تُعرض سطريًا على فروق طلبات السحب. وخطوة مخرجات مُهيكلة تستطيع أن تحوّل مراجعة نموذج لغوي إلى تعليقات أصلية:</p>
<pre><code class="language-bash">SCHEMA=$(jq -c . scripts/annotation-schema.json)

claude -p --bare \\
  --output-format json \\
  --json-schema <span class="hljs-string">&quot;<span class="hljs-variable">$SCHEMA</span>&quot;</span> \\
  <span class="hljs-string">&quot;Review this diff for correctness issues. Be specific about file and line.&quot;</span> \\
  &lt; &lt;(git diff HEAD~1) \\
  | jq -r <span class="hljs-string">&#x27;.structured_output.annotations[] | &quot;::\\(.level) file=\\(.file),line=\\(.line)::\\(.message)&quot;&#x27;</span>
</code></pre>
<p>حيث يفرض <code>annotation-schema.json</code> الشكل <code>{ annotations: [{ file, line, level, message }] }</code> مع <code>level</code> مقيّدًا بـ<code>&quot;error&quot; | &quot;warning&quot; | &quot;notice&quot;</code>. وسطر <code>jq</code> الواحد يُنسّق كل نتيجة كتعليق GitHub. أضِف هذا في خطوة CI فتظهر مراجعة النموذج اللغوي كتعليقات سطريّة على طلب السحب، كما يفعل أي أداة تدقيق.</p>
<p>وهذا يتناسب جيدًا مع <a href="https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort">درس CI</a>. فالمخطّط المُهيكل هو ما يجعل الخطوة قابلة للتركيب مع بقية سير العمل.</p>
<h2 id="نمطان-آخران-باختصار">نمطان آخران، باختصار</h2>
<p><strong>فحوص الصحة الليلية.</strong> يعلّم <a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">درس التحقّق الليلي</a> فحوصًا مجدولة تعمل بلا إشراف. والمخرجات المُهيكلة تحوّل نتائجها إلى تقارير حالة مقروءة آليًا: <code>{ status: &quot;healthy&quot; | &quot;degraded&quot; | &quot;broken&quot;, checks: [...], action_required: boolean }</code>. فيقرأ مغلّف cron قيمة <code>action_required</code>، ويفتح مسألة GitHub إن كانت صحيحة، ويعود إلى النوم. خمسة أسطر من <code>jq</code>، لا محلّل مخصّص.</p>
<p><strong>بوابة مراجعة دلالية.</strong> الشكل نفسه كنمط تعليقات CI، لكنها تُستخدم كخطّاف قبل الدفع أو كخطوة في CI فقط — لا قبل الإيداع. فـ<a href="https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook">قاعدة العشر ثوانٍ لخطّافات ما قبل الإيداع</a> في الدورة تستبعد استدعاءات النماذج اللغوية عبر الشبكة. وقبل الدفع أو في CI توجد ميزانية زمن الاستجابة. والمخطّط يمنحك <code>{ pass: boolean, issues: [...] }</code>، ويخرج السكربت بقيمة غير صفرية إن كانت <code>pass</code> خاطئة، فتكون قد بنيت تمريرة تدقيق دلالي تلتقط أشياء لا تستطيع أي قاعدة AST التعبير عنها.</p>
<h2 id="عندما-تكون-المخرجات-المهيكلة-الأداة-الخاطئة">عندما تكون المخرجات المُهيكلة الأداة الخاطئة</h2>
<p>الاستدلال الاستكشافي نفسه كالذي في درس <a href="https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper">MCP</a> تحت عنوان «ما الذي تُغلّفه وما الذي تتركه».</p>
<p><strong>أداة خاطئة حين:</strong> تكون المهمة توليدًا مفتوح النهاية (لا تحقّقًا)، أو يصير المخطّط أعقد من المحلّل الذي يستبدله، أو لا يكون حكم النموذج اللغوي موثوقًا بما يكفي في هذا النطاق، أو تحتاج زمن استجابة أقل من ثانية. فخطّافات git التي تعمل عند كل حفظ، وتكاملات المحرّرات التي تحتاج تغذية راجعة فورية — تلك لا تستطيع انتظار رحلة ذهاب وعودة عبر الشبكة.</p>
<p><strong>أداة صحيحة حين:</strong> التحقّق، والفرز، والتصنيف — أي مكان كنت ستُحلّل فيه نصًّا حرًّا وتستطيع تحمّل بضع ثوانٍ من زمن الاستجابة. والنقطة المثلى هي «أحتاج حكم النموذج اللغوي، وأحتاج أيضًا النتيجة في شكل يستطيع سكربتي التفرّع عليه».</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>مخطّط JSON يحوّل «اسأل نموذجًا لغويًا كبيرًا» إلى خطوة في خط أنابيب. فالمخطّط هو العقد: مرونة النموذج تبقى داخل الشكل، وحاجة سكربتك إلى القدرة على التنبّؤ يشبعها الشكل. أودِع المخطّط، وأودِع ملف الطلب، وشغّل بـ<code>--bare</code>، فيصير الأمر كله محكم الإغلاق، ومُتحكَّمًا بإصداراته، وقابلًا للتركيب مع كل حلقة أخرى في المكدّس.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper">كتابة غلاف MCP مخصّص</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build">ملفّات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops">حلقات التحقّق الليلية</a></li>
</ul>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,e as headings,o as html,t as slug,p as title};
