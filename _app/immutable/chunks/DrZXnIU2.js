const n="kinney",e="openclaw",s="OpenClaw: مساعدك الذكي الشخصي",a="configuring-your-openclaw",t="تهيئة OpenClaw لديك",l=[{depth:2,id:"agentsmd-دليل-التشغيل",text:"AGENTS.md: دليل التشغيل"},{depth:3,id:"ما-الذي-يندرج-هنا",text:"ما الذي يندرج هنا"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"ما-الذي-لا-يندرج-هنا",text:"ما الذي لا يندرج هنا"},{depth:2,id:"soulmd-الشخصية-والمبادئ-السلوكية",text:"SOUL.md: الشخصية والمبادئ السلوكية"},{depth:3,id:"ما-الذي-يندرج-هنا-1",text:"ما الذي يندرج هنا"},{depth:3,id:"مثال-1",text:"مثال"},{depth:3,id:"ما-الذي-لا-يندرج-هنا-1",text:"ما الذي لا يندرج هنا"},{depth:2,id:"usermd-سياق-عملك-الشخصي",text:"USER.md: سياق عملك الشخصي"},{depth:3,id:"ما-الذي-يندرج-هنا-2",text:"ما الذي يندرج هنا"},{depth:3,id:"مثال-2",text:"مثال"},{depth:3,id:"ما-الذي-لا-يندرج-هنا-2",text:"ما الذي لا يندرج هنا"},{depth:2,id:"memorymd-المعرفة-طويلة-المدى",text:"MEMORY.md: المعرفة طويلة المدى"},{depth:3,id:"ما-الذي-يندرج-هنا-3",text:"ما الذي يندرج هنا"},{depth:3,id:"مثال-3",text:"مثال"},{depth:3,id:"التمييز-بين-memorymd-والذاكرة-اليومية",text:"التمييز بين MEMORY.md والذاكرة اليومية"}],i=`<p><img src="/arabic-cs-library/images/kinney/5ab65f84ff54ce57.webp" alt="صفحة إعدادات وكلاء OpenClaw تعرض الهوية ومساحة العمل واختيار النموذج"></p>
<table>
<thead>
<tr>
<th>الملف</th>
<th>السؤال الذي يجيب عنه</th>
<th>النطاق</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AGENTS.md</code></td>
<td>كيف يجب أن أعمل؟</td>
<td>القواعد والإجراءات واتخاذ القرارات</td>
</tr>
<tr>
<td><code>SOUL.md</code></td>
<td>كيف يجب أن أتصرّف؟</td>
<td>الشخصية والنبرة والقيم والحدود</td>
</tr>
<tr>
<td><code>IDENTITY.md</code></td>
<td>من أنا؟</td>
<td>الاسم والدور والصورة الرمزية والهوية</td>
</tr>
<tr>
<td><code>USER.md</code></td>
<td>لمن أنا أساعد؟</td>
<td>تفضيلاتك وخلفيتك وأسلوب عملك</td>
</tr>
<tr>
<td><code>TOOLS.md</code></td>
<td>كيف تعمل هذه البيئة؟</td>
<td>ملف قديم، دُمج الآن في <code>AGENTS.md</code></td>
</tr>
<tr>
<td><code>MEMORY.md</code></td>
<td>ماذا تعلّمت؟</td>
<td>المعرفة الدائمة والقرارات والسياق التاريخي</td>
</tr>
</tbody>
</table>
<p>يمكنك قراءة الملفات الأساسية وتحريرها من واجهة التحكم. افتح الإعدادات، واختر الوكلاء، ثم اختر تبويب الملفات.</p>
<p><img src="/arabic-cs-library/images/kinney/b5ea739b81c7b719.webp" alt="تبويب الملفات في إعدادات وكيل OpenClaw، حيث تبويبات AGENTS وSOUL وUSER وMEMORY ومحرّر يعرض AGENTS.md"></p>
<p>هذه الملفات ليست مجرد اصطلاحات تنظيمية. أغلبها يُدرَج تلقائيًا في سياق الوكيل، لذلك لكل فقرة زائدة كلفة على مستوى الرموز (tokens) والانتباه، وربما على مستوى تعليمات متعارضة.</p>
<h2 id="agentsmd-دليل-التشغيل"><code>AGENTS.md</code>: دليل التشغيل</h2>
<p>يعرّف <code>AGENTS.md</code> كيف يتعامل الوكيل مع المهام، وكيف يتعامل مع عدم اليقين، وكيف يستخدم الأدوات، وكيف يطلب الإذن، وكيف يفوّض الأعمال، وكيف يحفظ المعلومات.</p>
<p>فكّر فيه بوصفه أوامر الوكيل الدائمة.</p>
<h3 id="ما-الذي-يندرج-هنا">ما الذي يندرج هنا</h3>
<ul>
<li>قواعد للتخطيط وتنفيذ المهام.</li>
<li>متى يطلب الإذن ومتى يتصرّف باستقلالية.</li>
<li>إرشادات لاستخدام الأدوات والتفويض.</li>
<li>كيفية إدارة الجلسات وتحديث الذاكرة.</li>
<li>ما الذي يُعدّ إتمامًا ناجحًا للمهمة.</li>
<li>اصطلاحات الأدوات الخاصة ببيئة التنفيذ.</li>
</ul>
<h3 id="مثال">مثال</h3>
<pre><code class="language-markdown"><span class="hljs-section"># Operating Instructions</span>

<span class="hljs-section">## General Principles</span>

<span class="hljs-bullet">-</span> Prefer completing tasks rather than merely explaining how to complete them.
<span class="hljs-bullet">-</span> Use evidence rather than assumptions when facts can be verified.
<span class="hljs-bullet">-</span> Make reasonable, reversible decisions independently.
<span class="hljs-bullet">-</span> Ask for approval before irreversible or externally visible actions.
<span class="hljs-bullet">-</span> State uncertainty explicitly.

<span class="hljs-section">## Task Execution</span>

For complex tasks:

<span class="hljs-bullet">1.</span> Establish the objective and acceptance criteria.
<span class="hljs-bullet">2.</span> Break the work into independently verifiable steps.
<span class="hljs-bullet">3.</span> Execute using the appropriate tools.
<span class="hljs-bullet">4.</span> Validate the results.
<span class="hljs-bullet">5.</span> Report the outcome and any limitations.

<span class="hljs-section">## Autonomy</span>

You may independently:

<span class="hljs-bullet">-</span> Read files and gather information from approved sources.
<span class="hljs-bullet">-</span> Conduct research and synthesize findings.
<span class="hljs-bullet">-</span> Create drafts and temporary artifacts.
<span class="hljs-bullet">-</span> Run non-destructive diagnostics.

Require approval before:

<span class="hljs-bullet">-</span> Sending messages or emails.
<span class="hljs-bullet">-</span> Deleting or overwriting important files.
<span class="hljs-bullet">-</span> Changing infrastructure or permissions.
<span class="hljs-bullet">-</span> Spending money or publishing content.

<span class="hljs-section">## Delegation</span>

Delegate work when it can be completed independently and the result can be clearly evaluated.

Keep task coordination and final verification in the parent agent.

<span class="hljs-section">## Memory</span>

Record significant decisions and discoveries.

Keep daily observations in memory/YYYY-MM-DD.md.
Keep durable non-profile facts in MEMORY.md.
Keep user preferences in USER.md.

Do not record secrets in memory files.

<span class="hljs-section">## Tools</span>

Prefer existing capabilities over installing new ones.
Use read-only operations when investigating unfamiliar systems.
Verify the outcome of any state-changing action.
</code></pre>
<h3 id="ما-الذي-لا-يندرج-هنا">ما الذي لا يندرج هنا</h3>
<p>لا تضع هنا سيرتك الذاتية، ولا شخصية الوكيل، ولا ملاحظات تفصيلية عن المشاريع السابقة.</p>
<p>وكذلك تجنّب نسخ تعريفات المهارات كاملة إلى <code>AGENTS.md</code>. فقاعدة مثل «استخدم مهارة البحث عند إجراء أبحاث جوهرية» توضع هنا، أما إجراء البحث الفعلي فيعود إلى <a href="https://stevekinney.com/courses/openclaw/skills-and-clawhub">المهارة</a>.</p>
<p>تمييز مفيد: يُخبر <code>AGENTS.md</code> الوكيل متى وكيف يتعامل مع نوع من الأعمال، بينما توفر المهارة الإجراء التفصيلي لقدرة محددة.</p>
<h2 id="soulmd-الشخصية-والمبادئ-السلوكية"><code>SOUL.md</code>: الشخصية والمبادئ السلوكية</h2>
<p>إذا شرح <code>AGENTS.md</code> ما الذي يجب فعله، فإن <code>SOUL.md</code> يشرح أيّ نوع من المساعدين تريد أن تكون.</p>
<p>الموضوع هنا عن السلوك المتسق لا عن آليات التشغيل.</p>
<p>يعامل OpenClaw هذا الملف صراحةً بوصفه البيت للشخصية (persona) والنبرة والحدود.</p>
<h3 id="ما-الذي-يندرج-هنا-1">ما الذي يندرج هنا</h3>
<ul>
<li>أسلوب التواصل والشخصية.</li>
<li>الموقف تجاه عدم اليقين.</li>
<li>المبادئ الفكرية.</li>
<li>كيف ينبغي أن يتعامل مع خلافات.</li>
<li>نوع العلاقة التي ينبغي أن تربطه بك.</li>
</ul>
<h3 id="مثال-1">مثال</h3>
<pre><code class="language-markdown"><span class="hljs-section"># Personality</span>

You are a thoughtful, capable, technically sophisticated collaborator.

<span class="hljs-section">## Communication</span>

<span class="hljs-bullet">-</span> Be direct, concise, and substantive.
<span class="hljs-bullet">-</span> Avoid unnecessary enthusiasm, flattery, and filler.
<span class="hljs-bullet">-</span> Prefer plain language without oversimplifying.
<span class="hljs-bullet">-</span> Explain tradeoffs instead of presenting false certainty.
<span class="hljs-bullet">-</span> Use humor sparingly and naturally.

<span class="hljs-section">## Intellectual Character</span>

<span class="hljs-bullet">-</span> Be curious and skeptical.
<span class="hljs-bullet">-</span> Challenge assumptions when evidence warrants it.
<span class="hljs-bullet">-</span> Prefer understanding underlying principles over
  blindly following conventions.
<span class="hljs-bullet">-</span> Be comfortable disagreeing respectfully.
<span class="hljs-bullet">-</span> Distinguish facts, interpretations, and speculation.

<span class="hljs-section">## Initiative</span>

Be proactive without being presumptuous.

Identify opportunities, risks, and useful connections but do not take consequential actions without authorization.

<span class="hljs-section">## Trust</span>

<span class="hljs-bullet">-</span> Never pretend to have completed work you have not done.
<span class="hljs-bullet">-</span> Acknowledge mistakes and correct them.
<span class="hljs-bullet">-</span> Be transparent about important limitations.
</code></pre>
<h3 id="ما-الذي-لا-يندرج-هنا-1">ما الذي لا يندرج هنا</h3>
<p>التفضيلات التقنية التفصيلية، أو تاريخ المشروع، أو جداول الأتمتة، أو تعليمات تشغيل الأدوات.</p>
<p>عبارة مثل «كن فضوليًّا فكريًّا» تندرج في <code>SOUL.md</code>.</p>
<p>أما عبارة مثل «ابحث في أوراق arXiv الجديدة كل يوم اثنين» فتندرج في أتمتة مجدولة، لا في شخصية الوكيل.</p>
<p>أنا أفضّل أن أُبقي هذا الملف قصيرًا إلى حد كبير. فالشخصيات الطويلة قد تصير مجموعة مكلفة من الصفات التي لا تُحسّن السلوك تحسّنًا ذا معنى.</p>
<h2 id="usermd-سياق-عملك-الشخصي"><code>USER.md</code>: سياق عملك الشخصي</h2>
<p>يشرح هذا الملف من أنت، وما الذي يهمّك، وكيف ينبغي للوكيل أن يتكيف معك.</p>
<p>من السهل الخلط بينه وبين <code>MEMORY.md</code>، لكن التمييز بينهما مهم.</p>
<p>ينبغي أن يضمّ <code>USER.md</code> معلومات نسبيًا ثابتة عنك، مصاغة في صورة إرشادات تؤثر في سلوك الوكيل.</p>
<h3 id="ما-الذي-يندرج-هنا-2">ما الذي يندرج هنا</h3>
<ul>
<li>تفضيلاتك التقنية.</li>
<li>خلفيتك المهنية ذات صلة بالمهام.</li>
<li>مستوى التفصيل الذي تفضّله.</li>
<li>كيف تتخذ القرارات.</li>
<li>مجالات تركيزك الحالية.</li>
<li>تفضيلات شخصية ثابتة مرتبطة بالمساعدة.</li>
</ul>
<h3 id="مثال-2">مثال</h3>
<pre><code class="language-markdown"><span class="hljs-section"># User Profile</span>

<span class="hljs-section">## Background</span>

Steve is an experienced software engineer, engineering leader, educator, and technical author.

He has significant experience with frontend engineering, developer tools, TypeScript, and engineering management.

Avoid introductory explanations of familiar software engineering concepts unless requested.

<span class="hljs-section">## Technical Preferences</span>

<span class="hljs-bullet">-</span> Prefer TypeScript for application development.
<span class="hljs-bullet">-</span> Prefer Bun as the JavaScript runtime.
<span class="hljs-bullet">-</span> Prefer SvelteKit for web applications.
<span class="hljs-bullet">-</span> Prefer Neon for PostgreSQL.
<span class="hljs-bullet">-</span> Prefer Upstash for Redis.
<span class="hljs-bullet">-</span> Use descriptive identifiers rather than abbreviations.

<span class="hljs-section">## Communication</span>

<span class="hljs-bullet">-</span> Be direct and technically precise.
<span class="hljs-bullet">-</span> Explain underlying architectural tradeoffs.
<span class="hljs-bullet">-</span> Provide concrete implementation examples.
<span class="hljs-bullet">-</span> Avoid generic advice that lacks actionable detail.
<span class="hljs-bullet">-</span> Assume substantial technical expertise.

<span class="hljs-section">## Working Style</span>

<span class="hljs-bullet">-</span> Favor practical solutions over unnecessary abstraction.
<span class="hljs-bullet">-</span> Consider maintainability and operational complexity.
<span class="hljs-bullet">-</span> Present alternatives when architectural decisions
  have meaningful tradeoffs.
<span class="hljs-bullet">-</span> Verify claims about rapidly changing technologies.

<span class="hljs-section">## Current Interests</span>

<span class="hljs-bullet">-</span> Agentic coding workflows.
<span class="hljs-bullet">-</span> AI orchestration and automation.
<span class="hljs-bullet">-</span> Developer tooling.
<span class="hljs-bullet">-</span> Knowledge management and research.
</code></pre>
<h3 id="ما-الذي-لا-يندرج-هنا-2">ما الذي لا يندرج هنا</h3>
<p>سجلّ زمني لكل ما ناقشته.</p>
<p>على سبيل المثال:</p>
<ul>
<li>«يفضّل Bun على Node في المشاريع الجديدة» تندرج في <code>USER.md</code>.</li>
<li>«اتُّخذ قرار نشر المشروع X على Railway في 7 أكتوبر» تندرج في <code>MEMORY.md</code>.</li>
<li>«أصلحنا اليوم خطأ في إعدادات Railway» تندرج في ملف الذاكرة اليومي.</li>
</ul>
<p>وأيضًا، لا تخزّن كل تفصيل شخصي ممكن لمجرد أنه متاح. فنموذج قصير ودقيق للمستخدم أنفع بكثير من سيرة ذاتية مصغّرة.</p>
<p>ويمنح OpenClaw حاليًا <code>USER.md</code> حدًّا منفصلًا للحقن قدره 4000 حرف، لذا إبقاؤه مركّزًا مهمّ جدًا.</p>
<h2 id="memorymd-المعرفة-طويلة-المدى"><code>MEMORY.md</code>: المعرفة طويلة المدى</h2>
<p>هنا يحتفظ الوكيل بالمعلومات التي تعلّمها والتي ينبغي أن تبقى بعد المحادثات الفردية.</p>
<p>وعلى خلاف <code>USER.md</code> الذي يصف سمات وتفضيلات نسبيًا ثابتة عنك، يسجّل <code>MEMORY.md</code> حقائق وقرارات وسياقًا تراكمت جميعها عبر عملكم معًا.</p>
<h3 id="ما-الذي-يندرج-هنا-3">ما الذي يندرج هنا</h3>
<ul>
<li>القرارات المعمارية وأسباب ومبرراتها.</li>
<li>حالة المشروع الجارية.</li>
<li>الاكتشافات المهمة.</li>
<li>القرارات التي لا ينبغي استعراضها مرارًا وتكرارًا.</li>
<li>مراجع إلى معلومات أكثر تفصيلًا.</li>
</ul>
<h3 id="مثال-3">مثال</h3>
<pre><code class="language-markdown"><span class="hljs-section"># Long-Term Memory</span>

<span class="hljs-section">## OpenClaw Architecture</span>

Decision: Use a VPS-hosted Gateway with a local Mac node for device-specific capabilities.

Rationale:

<span class="hljs-bullet">-</span> Gateway remains available independently of the Mac.
<span class="hljs-bullet">-</span> Local capabilities can be exposed selectively.
<span class="hljs-bullet">-</span> Centralized coordination simplifies operations.

<span class="hljs-section">## Development Infrastructure</span>

Decision: Prefer Neon for PostgreSQL and Upstash
for Redis in new applications.

This is a preference, not a universal requirement. Evaluate alternatives when project constraints warrant it.

<span class="hljs-section">## Agentic Development</span>

Research topics:

<span class="hljs-bullet">-</span> Delegation between orchestrators and workers.
<span class="hljs-bullet">-</span> Effective boundaries between skills and subagents.
<span class="hljs-bullet">-</span> Deterministic workflows versus agentic execution.

See memory/ for dated research and decisions.

<span class="hljs-section">## Active Projects</span>

<span class="hljs-section">### Research Automation</span>

Goal: Build reusable research workflows that collect sources, evaluate evidence, and generate structured deliverables.

Status: Design and experimentation.

Next consideration: Evaluate deterministic collection with agent-driven synthesis.
</code></pre>
<h3 id="التمييز-بين-memorymd-والذاكرة-اليومية">التمييز بين <code>MEMORY.md</code> والذاكرة اليومية</h3>
<p>يستخدم OpenClaw أيضًا ملفات ذاكرة مؤرَّخة:</p>
<pre><code>memory/
├── 2026-10-05.md
├── 2026-10-06.md
└── 2026-10-07.md
</code></pre>
<p>فكّر في مستويَي التخزين هذين بالصورة التالية:</p>
<table>
<thead>
<tr>
<th><code>MEMORY.md</code></th>
<th><code>memory/YYYY-MM-DD.md</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>معارف منقّحة</td>
<td>ملاحظات مرتبة زمنيًا</td>
</tr>
<tr>
<td>قرارات دائمة</td>
<td>أحداث فردية</td>
</tr>
<tr>
<td>إشارة عالية وحجم منخفض</td>
<td>سياق تاريخي مفصّل</td>
</tr>
<tr>
<td>تُراجَع عند تغيّر الحقائق</td>
<td>تُضاف إليها أثناء العمل</td>
</tr>
<tr>
<td>موجز يكفي للسياق المتكرّر</td>
<td>تُستدعى عند الحاجة</td>
</tr>
</tbody>
</table>
<p>على سبيل المثال، قد تدوّن ذاكرة اليوم أنك بحثت ثلاثة مزوّدي VPS، وقارنت تكاليف تشغيلهم، واخترت أحدهم.</p>
<p>أما الذاكرة طويلة المدى فتحتفظ بالاختيار النهائي وبالمنطق الذي خلفه.</p>
<p>يمكن إعادة إدراج الملاحظات اليومية الحديثة عند بدء جلسة جديدة، لكن الأرشيف اليومي الكامل يُستعلم عنه عادةً عند الطلب. ويُدرَج <code>MEMORY.md</code> في سياق وقت التشغيل المضمَّن المعتاد حين ينطبق ذلك، مع معالجة مختلفة في بعض بيئات التنفيذ.</p>
<p>لهذا أفضّل أن أُبقي <code>MEMORY.md</code> صغيرًا ومنقَّحًا بقصد.</p>
<p>القاعدة التي أعتمدها: <code>AGENTS.md</code> يحكم الأفعال، و<code>SOUL.md</code> يحكم الخُلق، و<code>IDENTITY.md</code> يقرّر الهوية، و<code>USER.md</code> يصفك، و<code>MEMORY.md</code> يحفظ ما تعلّمه. أما اصطلاحات الأدوات فتندرج داخل <code>AGENTS.md</code>.</p>
`,o={book:n,chapter:e,chapterTitle:s,slug:a,title:t,headings:l,html:i};export{n as book,e as chapter,s as chapterTitle,o as default,l as headings,i as html,a as slug,t as title};
