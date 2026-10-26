const n="kinney",s="openclaw",t="OpenClaw: مساعدك الذكي الشخصي",e="skills-and-clawhub",a="المهارات وClawHub",o=[{depth:2,id:"أين-تعيش-المهارات",text:"أين تعيش المهارات"},{depth:2,id:"اعرف-ما-لديك-بالفعل",text:"اعرف ما لديك بالفعل"},{depth:2,id:"اكتب-مهارتك-الأولى",text:"اكتب مهارتك الأولى"},{depth:3,id:"الخطوة-1-أنشئ-المجلد",text:"الخطوة 1: أنشئ المجلد"},{depth:3,id:"الخطوة-2-اكتب-skillmd",text:"الخطوة 2: اكتب SKILL.md"},{depth:3,id:"الخطوة-3-تأكد-من-أنها-حملت",text:"الخطوة 3: تأكّد من أنها حُمِّلت"},{depth:3,id:"الخطوة-4-استخدمها",text:"الخطوة 4: استخدمها"},{depth:2,id:"أضف-سكربتا",text:"أضف سكربتًا"},{depth:2,id:"مرجع-الواجهة-الأمامية",text:"مرجع الواجهة الأمامية"},{depth:3,id:"منح-مهارة-مفتاحا",text:"منح مهارة مفتاحًا"},{depth:2,id:"العثور-على-المهارات-في-clawhub",text:"العثور على المهارات في ClawHub"},{depth:2,id:"فحص-مهارة-قبل-تثبيتها",text:"فحص مهارة قبل تثبيتها"},{depth:2,id:"التثبيت-والتحديث-والإزالة",text:"التثبيت والتحديث والإزالة"},{depth:2,id:"اختيار-المهارات-التي-يراها-كل-وكيل",text:"اختيار المهارات التي يراها كل وكيل"},{depth:2,id:"المهارات-التي-تكتب-نفسها",text:"المهارات التي تكتب نفسها"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],l=`<p><strong>المهارة (skill)</strong> مجلد يحتوي على ملف <code>SKILL.md</code>. ويعلّم الملف وكيلك إجراءً: متى يفعل شيئًا، وأي الأدوات يستخدم، وكيف تبدو النتيجة الجيدة. بالمهارات يوسّع معظم الناس OpenClaw يومًا بيوم، والنمط الأكثر شيوعًا في المجتمع هو أن يطلبوا من الوكيل أن يكتب واحدة لنفسه.</p>
<p>تضع وثائق OpenClaw الفرق بين أنواع التوسعة الثلاثة بوضوح: الأدوات أفعال يستطيع الوكيل استدعاءها، والمهارات تعلّمه كيف يعمل، والإضافات تضيف قدرات تشغيل جديدة. فالتجأ إلى مهارة حين يملك الوكيل الأدوات التي يحتاجها بالفعل ولا يبقى عليه سوى معرفة كيف يستخدمها جيدًا.</p>
<blockquote>
<p><strong>المهارة تعلّم. إنها لا تمنح، وليست معزولة.</strong></p>
<p>لا تستطيع المهارة أن تمنح وكيلك أداة، ولا بيانات اعتماد، ولا وصولًا إلى سطر الأوامر لم يكن يملكه بالفعل. لكن هذا يعمل في الاتجاهين: فبمجرد تثبيتها، تعمل المهارة بكل صلاحيات الوكيل، ولا شيء يعزلها عنها. والمهارة المجتمعية شيفرة وتعليمات غير موثوقة. اقرأها قبل أن تُفعّلها.</p>
</blockquote>
<h2 id="أين-تعيش-المهارات">أين تعيش المهارات</h2>
<p>يبحث OpenClaw عن المهارات في عدة مواضع. وعندما تشترك مهارتان في الاسم، تفوز المهارة الأعلى في هذه القائمة:</p>
<table>
<thead>
<tr>
<th>#</th>
<th>الموضع</th>
<th>من يراها</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td><code>&lt;workspace&gt;/skills/</code></td>
<td>الوكيل الذي يملك مساحة العمل تلك</td>
</tr>
<tr>
<td>2</td>
<td><code>&lt;workspace&gt;/.agents/skills/</code></td>
<td>الوكيل نفسه (تخطيط بنمط المشروع)</td>
</tr>
<tr>
<td>3</td>
<td><code>~/.agents/skills/</code></td>
<td>كل وكيل (مهاراتك الشخصية)</td>
</tr>
<tr>
<td>4</td>
<td><code>~/.openclaw/skills/</code></td>
<td>كل وكيل على البوابة (تثبيتات <code>--global</code>)</td>
</tr>
<tr>
<td>5</td>
<td><code>~/.openclaw/agents/&lt;agentId&gt;/agent/workshop-skills/</code></td>
<td>المهارات التي يكتبها وكيل واحد بنفسه (انظر <a href="#skills-that-write-themselves">أدناه</a>)</td>
</tr>
<tr>
<td>6</td>
<td>مرفقة مع OpenClaw</td>
<td>كل وكيل</td>
</tr>
<tr>
<td>7</td>
<td><code>skills.load.extraDirs</code> ومهارات الإضافات</td>
<td>كل وكيل</td>
</tr>
</tbody>
</table>
<p>مساحة العمل الافتراضية هي <code>~/.openclaw/workspace</code>، لذا توضع مهاراتك عادةً في <code>~/.openclaw/workspace/skills/&lt;name&gt;/SKILL.md</code>.</p>
<p>هذه المسارات على <strong>مضيف البوابة (Gateway host)</strong>، وليس بالضرورة على الحاسوب الذي تكتب عليه. في <a href="https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale">قالب Railway</a> مثلًا، يعيش دليل الحالة على وحدة التخزين تحت <code>/data/.openclaw</code>.</p>
<p>تفسّر الأولوية عطلًا محبِطًا: إن عدّلت مهارة ولم يتغيّر شيء، فتحقق مما إذا كانت هناك نسخة بالاسم نفسه في موضع أعلى من القائمة. فالنسخة الأعلى تفوز بصمت.</p>
<h2 id="اعرف-ما-لديك-بالفعل">اعرف ما لديك بالفعل</h2>
<p>يأتي OpenClaw بعدة عشرات من المهارات المرفقة، وقد طلب منك <a href="https://stevekinney.com/courses/openclaw/gmail-and-google-calendar-integration">درس Gmail</a> بالفعل أن تبحث عن واحدة منها، وهي <code>gog</code>. وتُظهر ثلاثة أوامر ما هو محمَّل:</p>
<pre><code class="language-bash">openclaw skills list
openclaw skills check
openclaw skills info &lt;name&gt;
</code></pre>
<p>تسأل الأوامر الثلاثة البوابة، فتبلّغك برؤية البوابة حتى حين تشغّلها من جهاز آخر.</p>
<p>يعرض <code>list</code> كل مهارة مع حالتها: <strong>جاهزة</strong>، أو <strong>تحتاج تهيئة</strong>، أو <strong>معطّلة</strong>. ويلخّص <code>check</code> ما يستطيع وكيل واحد استخدامه فعلًا:</p>
<pre><code>Agent: main
Total: 56
✓ Eligible: 22
✓ Visible to model: 22
✓ Available as command: 20
Disabled: 31
Blocked by allowlist: 0
Excluded by agent allowlist: 0
✗ Missing requirements: 3
</code></pre>
<p>ستختلف أرقامك. وهذا معنى السطور:</p>
<ul>
<li><strong>ظاهرة للنموذج</strong> تعني أن اسم المهارة ووصفها موجودان في مطالبة الوكيل، فيستطيع اختيار المهارة بنفسه.</li>
<li><strong>متاحة كأمر</strong> تعني أنك تستطيع أيضًا استدعاءها كأمر شرطة مائلة (slash command). وقد يكون عددها أقل من «الظاهرة» لأن بعض المهارات تختار ألا تكون أوامر.</li>
<li>المهارات <strong>المعطّلة</strong> مُطفأة في الإعدادات، فلا تُعرض أبدًا.</li>
<li><strong>المتطلبات المفقودة</strong> تعني أن المهارة تحتاج شيئًا لا يملكه المضيف. ويخبرك <code>info</code> بما هو:</li>
</ul>
<pre><code>⏰ apple-reminders △ Needs setup
  Source: openclaw-bundled
  Visible to model: no
  Available as command: no
Requirements:
  Binaries: ✗ remindctl
  OS: ✓ (darwin)
</code></pre>
<p>ثبّت الثنائي المفقود على مضيف البوابة (أو على <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">عقدة مقترنة</a> توفّره) فتصبح المهارة جاهزة.</p>
<h2 id="اكتب-مهارتك-الأولى">اكتب مهارتك الأولى</h2>
<p>ابدأ بمهارة لا تحتاج إلى أي أدوات إطلاقًا، فلا يكون الشيء الوحيد الذي تختبره سوى ما إذا كان OpenClaw يجدها ويستخدمها.</p>
<h3 id="الخطوة-1-أنشئ-المجلد">الخطوة 1: أنشئ المجلد</h3>
<p>على مضيف البوابة:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p ~/.openclaw/workspace/skills/meeting-notes
</code></pre>
<p>أبقِ اسم المجلد و<code>name</code> الخاص بالمهارة متماثلين.</p>
<h3 id="الخطوة-2-اكتب-skillmd">الخطوة 2: اكتب <code>SKILL.md</code></h3>
<p>أنشئ <code>~/.openclaw/workspace/skills/meeting-notes/SKILL.md</code>:</p>
<pre><code class="language-markdown">---
name: meeting-notes
<span class="hljs-section">description: Turn rough meeting notes into a summary with decisions, action items, and open questions.
---</span>

<span class="hljs-section"># Meeting Notes</span>

Use this when the user pastes notes from a meeting and asks you to clean them up.

<span class="hljs-bullet">1.</span> Write a two-sentence summary of what the meeting was about.
<span class="hljs-bullet">2.</span> List every decision under <span class="hljs-strong">**Decisions**</span>. Only include things that were actually decided.
<span class="hljs-bullet">3.</span> List action items under <span class="hljs-strong">**Action Items**</span> as <span class="hljs-code">\`- [ ] Owner: task (due date if mentioned)\`</span>.
   If no owner was named, write <span class="hljs-code">\`Owner: unassigned\`</span> rather than guessing.
<span class="hljs-bullet">4.</span> List anything unresolved under <span class="hljs-strong">**Open Questions**</span>.
<span class="hljs-bullet">5.</span> Don&#x27;t add commentary or recommendations unless the user asks for them.
</code></pre>
<p>الواجهة الأمامية (frontmatter) هي الجزء الذي يقرأه OpenClaw ليقرّر <em>متى</em> يستخدم المهارة. أما المتن فهو ما يقرأه الوكيل بعد أن يقرّر ذلك. واكتب <code>description</code> كإجابة من سطر واحد عن سؤال «متى ينبغي للوكيل أن يلجأ إلى هذه؟»، في أقل من 160 حرفًا.</p>
<h3 id="الخطوة-3-تأكد-من-أنها-حملت">الخطوة 3: تأكّد من أنها حُمِّلت</h3>
<pre><code class="language-bash">openclaw skills info meeting-notes
</code></pre>
<p>تريد أن ترى <code>Source: openclaw-workspace</code> و<code>Visible to model: yes</code>.</p>
<p>يراقب OpenClaw مجلدات المهارات، فتظهر المهارة الجديدة أو المعدّلة في دور الوكيل التالي. وإن لم يحدث ذلك، فقد تكون الجلسة محتفظة بنسخة قديمة. أرسل <code>/new</code> لبدء جلسة جديدة، أو أعد تشغيل البوابة.</p>
<h3 id="الخطوة-4-استخدمها">الخطوة 4: استخدمها</h3>
<p>هناك ثلاث طرق لاستدعاء مهارة:</p>
<table>
<thead>
<tr>
<th>الطريقة</th>
<th>مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td>أن يختارها الوكيل من الوصف</td>
<td>«أيمكنك ترتيب هذه الملاحظات؟ …»</td>
</tr>
<tr>
<td>الإشارة إليها في رسالة بعلامة <code>$</code></td>
<td><code>$meeting-notes</code> متبوعة بالملاحظات</td>
</tr>
<tr>
<td>استدعاؤها كأمر شرطة مائلة</td>
<td><code>/meeting_notes ...</code> أو <code>/skill meeting-notes ...</code></td>
</tr>
</tbody>
</table>
<p>لا يمكن لأسماء أوامر الشرطة المائلة أن تستخدم سوى الحروف الصغيرة والأرقام والشرطات السفلية، لذا تصبح الشرطات العادية شرطات سفلية. ويعمل <code>/skill &lt;name&gt;</code> دائمًا، أيًّا كان الاسم.</p>
<p><strong>اختبر الطريقة الأولى، لا الأخيرتين فقط.</strong> الصق بعض الملاحظات غير المرتبة دون تسمية المهارة. فإن لم يستخدمها الوكيل، فوصفك لا يقول بوضوح كافٍ متى تنطبق. أعد كتابته وحاول مرة أخرى.</p>
<h2 id="أضف-سكربتا">أضف سكربتًا</h2>
<p>تصبح المهارات أكثر فائدة حين تضمّ سكربتًا. وما زال الوكيل يشغّل السكربت بأداة <code>exec</code> الخاصة به، لذا ينطبق كل ما في <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">الأمن والموافقات</a>.</p>
<pre><code>~/.openclaw/workspace/skills/repo-standup/
├── SKILL.md
└── scripts/
    └── standup.sh
</code></pre>
<p><code>SKILL.md</code>:</p>
<pre><code class="language-markdown">---
name: repo-standup
description: Summarize the last day of commits in a Git repository as a short standup update.
<span class="hljs-section">metadata: { &#x27;openclaw&#x27;: { &#x27;requires&#x27;: { &#x27;bins&#x27;: [&#x27;git&#x27;] } } }
---</span>

<span class="hljs-section"># Repo Standup</span>

When the user asks for a standup update for a repository:

<span class="hljs-bullet">1.</span> If they haven&#x27;t given a repository path, ask for one.
<span class="hljs-bullet">2.</span> Run <span class="hljs-code">\`{baseDir}/scripts/standup.sh &lt;repository-path&gt;\`</span> with the <span class="hljs-code">\`exec\`</span> tool.
<span class="hljs-bullet">3.</span> Group the commits by theme and write three to five bullet points. Don&#x27;t list every commit.
<span class="hljs-bullet">4.</span> If the script prints nothing, say there were no commits. Don&#x27;t invent work.
</code></pre>
<p><code>scripts/standup.sh</code>:</p>
<pre><code class="language-bash"><span class="hljs-meta">#!/usr/bin/env bash</span>
<span class="hljs-built_in">set</span> -euo pipefail
<span class="hljs-built_in">cd</span> <span class="hljs-string">&quot;<span class="hljs-variable">$1</span>&quot;</span>
git <span class="hljs-built_in">log</span> --since=<span class="hljs-string">&quot;24 hours ago&quot;</span> --no-merges --pretty=format:<span class="hljs-string">&#x27;%h %an %s&#x27;</span>
</code></pre>
<p>اجعل السكربت قابلًا للتنفيذ بـ <code>chmod +x scripts/standup.sh</code>.</p>
<p>هناك شيئان جديدان هنا:</p>
<ul>
<li>يرجع <strong><code>{baseDir}</code></strong> إلى مجلد المهارة نفسه، فلا تُثبّت أبدًا دليل المنزل في الشيفرة.</li>
<li><strong><code>metadata.openclaw.requires.bins</code></strong> بوابة. فإن لم يكن <code>git</code> على <code>PATH</code> الخاص بالمضيف، ظهرت المهارة بحالة «تحتاج تهيئة» وبقيت خارج التوجيه، بدلًا من أن تفشل في منتصف الطريق.</li>
</ul>
<p>إن كانت سياسة التنفيذ لديك تسأل قبل تشغيل أوامر غير مألوفة، فسيُنتج التشغيل الأول طلب موافقة. واختيار <strong>السماح دائمًا</strong> يوافق على هذا الأمر بالضبط في دليل العمل هذا، فلا تسأل عمليات التشغيل اللاحقة ضد المستودع نفسه مرة أخرى.</p>
<h2 id="مرجع-الواجهة-الأمامية">مرجع الواجهة الأمامية <span class="content-anchor" id="frontmatter-reference"></span></h2>
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
<td><code>name</code></td>
<td>—</td>
<td>مطلوب. حروف صغيرة وأرقام وشرطات عادية</td>
</tr>
<tr>
<td><code>description</code></td>
<td>—</td>
<td>مطلوب. سطر واحد، في أقل من 160 حرفًا</td>
</tr>
<tr>
<td><code>user-invocable</code></td>
<td><code>true</code></td>
<td>اضبط <code>false</code> لإخفاء المهارة من أوامر الشرطة المائلة</td>
</tr>
<tr>
<td><code>disable-model-invocation</code></td>
<td><code>false</code></td>
<td>اضبط <code>true</code> حتى لا يختارها الوكيل بنفسه أبدًا؛ ويظل <code>$name</code> يعمل</td>
</tr>
<tr>
<td><code>homepage</code></td>
<td>—</td>
<td>رابط يُعرض في واجهة المستخدم</td>
</tr>
</tbody>
</table>
<p>تقع البوابات تحت <code>metadata.openclaw</code>. والمهارة التي بلا بوابات مؤهَّلة دائمًا.</p>
<table>
<thead>
<tr>
<th>المفتاح</th>
<th>القاعدة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>requires.bins</code></td>
<td>يجب أن يكون كل ثنائي مدرج على <code>PATH</code></td>
</tr>
<tr>
<td><code>requires.anyBins</code></td>
<td>يجب أن يكون واحد على الأقل على <code>PATH</code></td>
</tr>
<tr>
<td><code>requires.env</code></td>
<td>يجب أن يُضبط كل متغيّر بيئة، أو يُوفَّر عبر الإعدادات</td>
</tr>
<tr>
<td><code>requires.config</code></td>
<td>يجب أن يكون كل مسار <code>openclaw.json</code> مدرج صادقًا (truthy)</td>
</tr>
<tr>
<td><code>os</code></td>
<td><code>darwin</code> و<code>linux</code> و/أو <code>win32</code></td>
</tr>
<tr>
<td><code>always</code></td>
<td>تخطّي فحوص <code>requires</code> (لكن ليس <code>os</code>)</td>
</tr>
<tr>
<td><code>primaryEnv</code></td>
<td>متغيّر البيئة الذي يملؤه <code>skills.entries.&lt;name&gt;.apiKey</code></td>
</tr>
</tbody>
</table>
<p>لاحظ أن <code>os</code> و<code>always</code> يقعان بجوار <code>requires</code> لا داخله:</p>
<pre><code class="language-markdown">metadata: { &quot;openclaw&quot;: { &quot;os&quot;: [&quot;darwin&quot;], &quot;requires&quot;: { &quot;bins&quot;: [&quot;memo&quot;] } } }
</code></pre>
<h3 id="منح-مهارة-مفتاحا">منح مهارة مفتاحًا</h3>
<p>لا تضع بيانات اعتماد أبدًا في <code>SKILL.md</code> أو ملفاته. وإن أعلنت المهارة عن <code>primaryEnv</code>، فأعطها المفتاح عبر الإعدادات بدلًا من ذلك:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  skills<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&#x27;my-search&#x27;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        apiKey<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> source<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;env&#x27;</span><span class="hljs-punctuation">,</span> provider<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;default&#x27;</span><span class="hljs-punctuation">,</span> id<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;SEARCH_API_KEY&#x27;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يُحقن المفتاح في البيئة لدور الوكيل ذلك فقط، وعلى المضيف وحده. <strong>وهو لا يصل إلى بيئة معزولة.</strong> ويحتاج الوكيل المعزول إلى تمرير المتغيّر عبر <code>agents.defaults.sandbox.docker.env</code> بدلًا من ذلك، وإلى تثبيت الثنائي المبوَّب داخل الحاوية.</p>
<h2 id="العثور-على-المهارات-في-clawhub">العثور على المهارات في ClawHub</h2>
<p><a href="https://clawhub.ai/">ClawHub</a> هو السجل العام لمهارات OpenClaw وإضافاته. ويمكنك تصفّحه على الويب أو البحث من الطرفية:</p>
<pre><code class="language-bash">openclaw skills search <span class="hljs-string">&quot;calendar&quot;</span>
</code></pre>
<p>لكل مهارة صفحة تضم أمر تثبيتها، و<code>SKILL.md</code> الخاص بها، وملفاتها، وسجل إصداراتها، وفحصًا أمنيًا:</p>
<p><img src="/arabic-cs-library/images/kinney/59856eb369840dc1.webp" alt="صفحة ClawHub لمهارة gog، تعرض أمر التثبيت، وتبويبات SKILL.md وSkill Card وFiles وVersions وRequirements، ونتيجة فحص أمني هي Pass"></p>
<p>أشِر إلى المهارات بـ<strong>المالك والاسم</strong>، مثل <code>@steipete/gog</code>. فالأسماء الشائعة تجذب المتشابهات: بحث عن «calendar» يعيد عدة مهارات من مالكين مختلفين بأوصاف متطابقة تقريبًا. والمالك جزء مما تثق به.</p>
<h2 id="فحص-مهارة-قبل-تثبيتها">فحص مهارة قبل تثبيتها</h2>
<p>يحصل كل إصدار على فحص أمني من ClawHub. انقر النتيجة في صفحة المهارة لقراءة التقرير الكامل:</p>
<p><img src="/arabic-cs-library/images/kinney/4fec0d0e4dc4fc26.webp" alt="صفحة الفحص الأمني في ClawHub لمهارة gog، وفيها نظرة عامة على ما تفعله المهارة، ونتيجة Pass، وتاريخ الفحص، وقائمة بأنماط الثغرات التي فُحصت مقابلها"></p>
<p>يعطي الفحص إجابتين منفصلتين. أما <strong>الحالة</strong> فتقول ما تفعله بالنتيجة:</p>
<table>
<thead>
<tr>
<th>الحالة</th>
<th>ما تعنيه</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pass</td>
<td>لم يُعثر على أي شيء يتجاوز الخطورة المنخفضة</td>
</tr>
<tr>
<td>Review</td>
<td>اقرأ النتائج أولًا. فقد تظل المهارة مشروعة</td>
</tr>
<tr>
<td>Warn</td>
<td>عُثر على مشكلة عالية الأثر. توخَّ حذرًا شديدًا</td>
</tr>
<tr>
<td>Malicious</td>
<td>لا تثبّتها</td>
</tr>
<tr>
<td>Pending</td>
<td>لم ينته الفحص بعد</td>
</tr>
<tr>
<td>Error</td>
<td>تعذّر إكمال الفحص</td>
</tr>
</tbody>
</table>
<p>ويقول <strong>مستوى الخطورة</strong> (منخفض أو متوسط أو مرتفع) مقدار القوة التي تملكها المهارة إن عملت تمامًا كما يُقصد بها. فالمهارة التي ترسل البريد يمكن أن تكون صادقة تمامًا وتبقى متوسطة الخطورة، لأن إرسال البريد باسمك قوة كبيرة.</p>
<p>يمكنك التحقق من المعلومات نفسها من الطرفية:</p>
<pre><code class="language-bash">openclaw skills verify @steipete/gog --card
openclaw skills verify @steipete/gog
</code></pre>
<p>يطبع الأمر الأول بطاقة المهارة، وهي قائمة قصيرة بمخاطر المهارة وكيفية تقليلها. ويطبع الثاني حكم ClawHub، وعند توفره رابطًا إلى إيداع المصدر بالضبط الذي فُحص. وهو لا يعيد فحص أي شيء ولا يفحص الملفات على قرصك.</p>
<p><strong>النجاح (Pass)</strong> علامة جيدة لا ضمان. وقبل التثبيت، افعل هذا أيضًا:</p>
<ol>
<li><strong>اقرأ <code>SKILL.md</code></strong> في تبويب Files. وابحث عن تعليمات تغيّر أهداف الوكيل، أو تكتب إلى الذاكرة، أو تطلب منه تجاهل قواعده.</li>
<li><strong>اقرأ كل سكربت.</strong> وابحث عن التنزيلات، ونداءات الشبكة إلى مواضع لا سبب للمهارة في الاتصال بها، وأي شيء يقرأ متغيّرات البيئة أو ملفات بيانات الاعتماد.</li>
<li><strong>افحص المتطلبات.</strong> أي الثنائيات ومتغيّرات البيئة تحتاجها، وهل تناسب ما تدّعي المهارة أنها تفعله؟</li>
<li><strong>افحص المالك وسجل الإصدارات.</strong> فمهارة قديمة من ناشر موثّق رهان مختلف عن مهارة نُشرت أمس.</li>
<li><strong>ثبّت بضيق.</strong> ثبّتها في مساحة عمل وكيل واحد بدلًا من التثبيت العام، وثبّت إصدارًا بعينه بعد أن تراجعها.</li>
</ol>
<blockquote>
<p><strong>ليست كل المصادر مفحوصة</strong></p>
<p>المهارات المثبّتة بمرجع <code>skills-sh:</code> يحلّها ClawHub إلى إيداع GitHub لكنها تُوسم بأنها <strong>غير مفحوصة من ClawHub</strong>. أما المهارات المثبّتة مباشرة من Git أو من مجلد محلي فلا تُفحص إطلاقًا. وفي تلك الحالات، تكون مراجعتك أنت هي المراجعة الوحيدة.</p>
</blockquote>
<h2 id="التثبيت-والتحديث-والإزالة">التثبيت والتحديث والإزالة</h2>
<p>ثبّت مهارة راجعتها بـ:</p>
<pre><code class="language-bash">openclaw skills install @steipete/gog
</code></pre>
<p>افتراضيًا تذهب إلى مجلد <code>skills/</code> في مساحة عمل الوكيل الحالي. استخدم <code>--agent &lt;id&gt;</code> لاختيار وكيل بعينه، و<code>--global</code> للتثبيت في <code>~/.openclaw/skills</code> لكل وكيل، و<code>--version &lt;version&gt;</code> لتثبيت إصدار بعينه.</p>
<p>يكتب <code>install</code> إلى مساحة عمل على الجهاز الذي تشغّله عليه، لذا <strong>شغّله على مضيف البوابة</strong>. وإن كانت بوابتك بعيدة، فإما أن تشغّله هناك (على <a href="https://railway.com/?referralCode=kinney">قالب Railway</a>، عبر <code>railway ssh --service openclaw -- openclaw skills install ...</code>) أو تثبّت من واجهة التحكم: افتح <strong>Plugins</strong>، وانتقل إلى تبويب <strong>Skills</strong>، واستخدم بحث ClawHub هناك.</p>
<p>قبل التنزيل، يفحص التثبيت الفحص الأمني الخاص بالإصدار:</p>
<ul>
<li>تطبع <strong>Review</strong> ملخّص الفحص ورابطًا، ثم تتابع.</li>
<li>تُرفض الإصدارات <strong>الخبيثة</strong> أو المحظورة.</li>
<li>تنتظر المهارات المدعومة من GitHub والتي حالتها <strong>Pending</strong> انتهاء الفحص. وهناك علم <code>--force-install</code> لتخطّي الانتظار. لا تستخدمه لمجرد تجاوز الفحص.</li>
</ul>
<p>للتحديث:</p>
<pre><code class="language-bash">openclaw skills update @steipete/gog
openclaw skills update --all
</code></pre>
<p>تنطبق التحديثات على المهارات المثبّتة من ClawHub فقط. وإن كنت قد عدّلت مهارة مثبّتة، رفض التحديث بدلًا من الكتابة فوق تغييراتك، إلا إذا مرّرت <code>--force</code>.</p>
<p>لا يوجد <code>openclaw skills uninstall</code>. فالإزالة تتم عبر واجهة سطر أوامر ClawHub نفسها، موجّهة إلى المجلد الذي ثبّتت فيه:</p>
<pre><code class="language-bash">npm install -g clawhub
clawhub --workdir ~/.openclaw/workspace uninstall @steipete/gog
</code></pre>
<p>وفي تثبيت <code>--global</code>، استخدم <code>--workdir ~/.openclaw</code> بدلًا من ذلك. ثم تأكّد من اختفاء المهارة بـ <code>openclaw skills list</code>.</p>
<h2 id="اختيار-المهارات-التي-يراها-كل-وكيل">اختيار المهارات التي يراها كل وكيل</h2>
<p>افتراضيًا، يرى كل وكيل كل مهارة مؤهَّلة. ويمكنك تضييق ذلك بقوائم السماح:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  agents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    defaults<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      skills<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;meeting-notes&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;repo-standup&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;gog&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      researcher<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> skills<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;summarize&#x27;</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&#x27;locked-down&#x27;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> skills<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>قائمة الوكيل نفسه <strong>تستبدل</strong> القائمة الافتراضية. وهي لا تضيف إليها.</li>
<li><code>[]</code> تعني لا مهارات إطلاقًا.</li>
<li>لإطفاء مهارة في كل مكان، اضبط <code>skills.entries.&lt;name&gt;.enabled: false</code>.</li>
</ul>
<p>ويمكنك أيضًا تشغيل المهارات وإطفاءها لمحادثة واحدة في واجهة التحكم: في محرّر الرسالة، انقر <strong>+</strong> ثم <strong>Skills</strong>.</p>
<p>قائمة السماح تقرّر فقط المهارات التي <em>يعرف عنها</em> الوكيل. وهي ليست حدًّا للصلاحيات. فالوكيل الذي يستطيع تشغيل أوامر سطر الأوامر يمكنه أيضًا تشغيل أي ثنائي على المضيف، سواء ذكرته مهارة أو لم تذكره. وأذونات الأوامر تحددها <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">موافقات التنفيذ</a>، لا المهارات.</p>
<h2 id="المهارات-التي-تكتب-نفسها">المهارات التي تكتب نفسها <span class="content-anchor" id="skills-that-write-themselves"></span></h2>
<p>تتيح <strong>ورشة المهارات (Skill Workshop)</strong> لوكيلك إنشاء مهاراته الخاصة وتحسينها من الخبرة. وهي كما تأتي جاهزة أكثر استقلالية مما قد تتوقع:</p>
<table>
<thead>
<tr>
<th>الإعداد</th>
<th>الافتراضي</th>
<th>ما يعنيه الافتراضي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>skills.workshop.autonomous.mode</code></td>
<td><code>auto</code></td>
<td>يعدّل الوكيل مهارات الورشة الخاصة به مباشرةً بأدوات الملفات لديه</td>
</tr>
<tr>
<td><code>skills.workshop.approvalPolicy</code></td>
<td><code>auto</code></td>
<td>يستطيع الوكيل تطبيق مقترحاته الخاصة دون أن يسألك</td>
</tr>
</tbody>
</table>
<p>الضابط في وضع <code>auto</code> هو حدّ دليل، لا مراجع بشري. فلا يستطيع الوكيل الكتابة إلا داخل مجلد <code>workshop-skills</code> الخاص به، ولا يمسّ أبدًا مهارة من مصدر آخر. لكن داخل ذلك المجلد، لا تمرّ التغييرات عبر مقترح ولا فحص ولا لقطة استرجاع.</p>
<p>وإن كنت تفضّل الموافقة على كل تغيير، فانتقل إلى المقترحات:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> skills.workshop.autonomous.mode propose
openclaw config <span class="hljs-built_in">set</span> skills.workshop.approvalPolicy pending
</code></pre>
<p>ثم راجع ما يقترحه الوكيل:</p>
<pre><code class="language-bash">openclaw skills workshop list
openclaw skills workshop inspect &lt;proposal-id&gt;
openclaw skills workshop apply &lt;proposal-id&gt;
openclaw skills workshop reject &lt;proposal-id&gt; --reason <span class="hljs-string">&quot;Too specific&quot;</span>
</code></pre>
<p>القائمة نفسها موجودة في واجهة التحكم تحت <strong>Plugins</strong>، في تبويب <strong>Skill Workshop</strong>، تحت <strong>Suggestions</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/33a961e95cb17177.webp" alt="تبويب ورشة المهارات في واجهة التحكم، وفيه تبويبان فرعيان Skills وSuggestions، ومفتاح Self-learning، ومهارات الورشة المثبّتة للوكيل مسرودة بجوار معاينة للمهارة المختارة"></p>
<p>أيًّا كان الوضع، يمكنك طلب مهارة مباشرةً. أرسل <code>/learn</code> بعد محادثة سارت على ما يرام، واختياريًا مع طلب مثل <code>/learn a skill for triaging my GitHub notifications</code>. وهي تصوغ مهارة واحدة للمراجعة ولا تطبّقها بنفسها أبدًا.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li><strong>أثبت أن الاكتشاف يعمل.</strong> أنشئ <code>meeting-notes</code>، وتأكّد منها بـ <code>openclaw skills info</code>، واجعل الوكيل يستخدمها دون أن تسمّيها.</li>
<li><strong>اكسر بوابة عن قصد.</strong> عدّل <code>repo-standup</code> لتتطلب ثنائيًا غير موجود، مثل <code>gitx</code>. تأكّد أن <code>openclaw skills check</code> يسردها تحت المتطلبات المفقودة وأن الوكيل لم يعد يعرضها. ثم أعدها كما كانت.</li>
<li><strong>اخسر معركة أولوية.</strong> ضع مجلد <code>meeting-notes</code> ثانيًا في <code>~/.openclaw/skills/</code> بمتن مختلف. اطلب من الوكيل استخدامه وتأكّد أن نسخة مساحة العمل ما زالت تفوز. احذف النسخة الإضافية.</li>
<li><strong>افحص مهارة حقيقية.</strong> اختر مهارة على ClawHub قد تريدها فعلًا. اقرأ فحصها الأمني، و<code>SKILL.md</code> الخاص بها، وسكربتاتها، وشغّل <code>openclaw skills verify @owner/name --card</code>. ودوّن شيئًا واحدًا تريد معرفته قبل تثبيتها.</li>
<li><strong>دع الوكيل يكتب واحدة.</strong> بعد مهمة تكرّرها كثيرًا، أرسل <code>/learn</code>. وافحص المسودة قبل تطبيق أي شيء.</li>
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
<td>المهارة ليست في <code>openclaw skills list</code></td>
<td>اسم المجلد والملف (<code>SKILL.md</code>)، وحقل <code>name</code>، وكونها على مضيف البوابة</td>
</tr>
<tr>
<td>إنها مسرودة لكن الوكيل لا يستخدمها أبدًا</td>
<td>الوصف، وقائمة سماح المهارات لدى الوكيل، و<code>disable-model-invocation</code></td>
</tr>
<tr>
<td>تقول «تحتاج تهيئة»</td>
<td><code>openclaw skills info &lt;name&gt;</code> للثنائي المفقود أو متغيّر البيئة أو نظام التشغيل</td>
</tr>
<tr>
<td>تعديلاتك لا تظهر</td>
<td>مهارة بالاسم نفسه أعلى في قائمة الأولوية، أو جلسة قديمة (أرسل <code>/new</code>)</td>
</tr>
<tr>
<td>تعمل عادةً لكنها تفشل في بيئة معزولة</td>
<td>المفاتيح لا تُمرَّر إلى البيئات المعزولة، ويجب أن توجد الثنائيات المبوَّبة داخل الحاوية</td>
</tr>
<tr>
<td>تفشل عند تشغيلها بواسطة وكيل فرعي</td>
<td>قد يُمنع <code>exec</code> على الوكلاء الفرعيين. انظر <a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيون والتنسيق</a></td>
</tr>
<tr>
<td><code>openclaw skills uninstall</code> غير موجود</td>
<td>استخدم <code>clawhub --workdir &lt;folder&gt; uninstall @owner/name</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يطابق هذا الدرس إصدار OpenClaw <code>2026.9.8</code>. وإن لم يتصرّف شيء كما هو موصوف، فشغّل الأمر مع <code>--help</code> وراجع <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,d={book:n,chapter:s,chapterTitle:t,slug:e,title:a,headings:o,html:l};export{n as book,s as chapter,t as chapterTitle,d as default,o as headings,l as html,e as slug,a as title};
