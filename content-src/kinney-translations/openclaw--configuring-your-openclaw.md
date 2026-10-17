---
title: "تهيئة OpenClaw لديك"
---

صفحة إعدادات وكلاء OpenClaw تعرض الهوية ومساحة العمل واختيار النموذج

| الملف | السؤال الذي يجيب عنه | النطاق |
| --- | --- | --- |
| `AGENTS.md` | كيف يجب أن أعمل؟ | القواعد والإجراءات واتخاذ القرارات |
| `SOUL.md` | كيف يجب أن أتصرّف؟ | الشخصية والنبرة والقيم والحدود |
| `IDENTITY.md` | من أنا؟ | الاسم والدور والصورة الرمزية والهوية |
| `USER.md` | لمن أنا أساعد؟ | تفضيلاتك وخلفيتك وأسلوب عملك |
| `TOOLS.md` | كيف تعمل هذه البيئة؟ | ملف قديم، دُمج الآن في `AGENTS.md` |
| `MEMORY.md` | ماذا تعلّمت؟ | المعرفة الدائمة والقرارات والسياق التاريخي |

يمكنك قراءة الملفات الأساسية وتحريرها من واجهة التحكم. افتح الإعدادات، واختر الوكلاء، ثم اختر تبويب الملفات.

تبويب الملفات في إعدادات وكيل OpenClaw، حيث تبويبات AGENTS وSOUL وUSER وMEMORY ومحرّر يعرض AGENTS.md

هذه الملفات ليست مجرد اصطلاحات تنظيمية. أغلبها يُدرَج تلقائيًا في سياق الوكيل، لذلك لكل فقرة زائدة كلفة على مستوى الرموز (tokens) والانتباه، وربما على مستوى تعليمات متعارضة.

## `AGENTS.md`: دليل التشغيل

يعرّف `AGENTS.md` كيف يتعامل الوكيل مع المهام، وكيف يتعامل مع عدم اليقين، وكيف يستخدم الأدوات، وكيف يطلب الإذن، وكيف يفوّض الأعمال، وكيف يحفظ المعلومات.

فكّر فيه بوصفه أوامر الوكيل الدائمة.

### ما الذي يندرج هنا

- قواعد للتخطيط وتنفيذ المهام.
- متى يطلب الإذن ومتى يتصرّف باستقلالية.
- إرشادات لاستخدام الأدوات والتفويض.
- كيفية إدارة الجلسات وتحديث الذاكرة.
- ما الذي يُعدّ إتمامًا ناجحًا للمهمة.
- اصطلاحات الأدوات الخاصة ببيئة التنفيذ.

### مثال

```markdown
# Operating Instructions

## General Principles

- Prefer completing tasks rather than merely explaining how to complete them.
- Use evidence rather than assumptions when facts can be verified.
- Make reasonable, reversible decisions independently.
- Ask for approval before irreversible or externally visible actions.
- State uncertainty explicitly.

## Task Execution

For complex tasks:

1. Establish the objective and acceptance criteria.
2. Break the work into independently verifiable steps.
3. Execute using the appropriate tools.
4. Validate the results.
5. Report the outcome and any limitations.

## Autonomy

You may independently:

- Read files and gather information from approved sources.
- Conduct research and synthesize findings.
- Create drafts and temporary artifacts.
- Run non-destructive diagnostics.

Require approval before:

- Sending messages or emails.
- Deleting or overwriting important files.
- Changing infrastructure or permissions.
- Spending money or publishing content.

## Delegation

Delegate work when it can be completed independently and the result can be clearly evaluated.

Keep task coordination and final verification in the parent agent.

## Memory

Record significant decisions and discoveries.

Keep daily observations in memory/YYYY-MM-DD.md.
Keep durable non-profile facts in MEMORY.md.
Keep user preferences in USER.md.

Do not record secrets in memory files.

## Tools

Prefer existing capabilities over installing new ones.
Use read-only operations when investigating unfamiliar systems.
Verify the outcome of any state-changing action.
```

### ما الذي لا يندرج هنا

لا تضع هنا سيرتك الذاتية، ولا شخصية الوكيل، ولا ملاحظات تفصيلية عن المشاريع السابقة.

وكذلك تجنّب نسخ تعريفات المهارات كاملة إلى `AGENTS.md`. فقاعدة مثل «استخدم مهارة البحث عند إجراء أبحاث جوهرية» توضع هنا، أما إجراء البحث الفعلي فيعود إلى [المهارة](https://stevekinney.com/courses/openclaw/skills-and-clawhub).

تمييز مفيد: يُخبر `AGENTS.md` الوكيل متى وكيف يتعامل مع نوع من الأعمال، بينما توفر المهارة الإجراء التفصيلي لقدرة محددة.

## `SOUL.md`: الشخصية والمبادئ السلوكية

إذا شرح `AGENTS.md` ما الذي يجب فعله، فإن `SOUL.md` يشرح أيّ نوع من المساعدين تريد أن تكون.

الموضوع هنا عن السلوك المتسق لا عن آليات التشغيل.

يعامل OpenClaw هذا الملف صراحةً بوصفه البيت للشخصية (persona) والنبرة والحدود.

### ما الذي يندرج هنا

- أسلوب التواصل والشخصية.
- الموقف تجاه عدم اليقين.
- المبادئ الفكرية.
- كيف ينبغي أن يتعامل مع خلافات.
- نوع العلاقة التي ينبغي أن تربطه بك.

### مثال

```markdown
# Personality

You are a thoughtful, capable, technically sophisticated collaborator.

## Communication

- Be direct, concise, and substantive.
- Avoid unnecessary enthusiasm, flattery, and filler.
- Prefer plain language without oversimplifying.
- Explain tradeoffs instead of presenting false certainty.
- Use humor sparingly and naturally.

## Intellectual Character

- Be curious and skeptical.
- Challenge assumptions when evidence warrants it.
- Prefer understanding underlying principles over
  blindly following conventions.
- Be comfortable disagreeing respectfully.
- Distinguish facts, interpretations, and speculation.

## Initiative

Be proactive without being presumptuous.

Identify opportunities, risks, and useful connections but do not take consequential actions without authorization.

## Trust

- Never pretend to have completed work you have not done.
- Acknowledge mistakes and correct them.
- Be transparent about important limitations.
```

### ما الذي لا يندرج هنا

التفضيلات التقنية التفصيلية، أو تاريخ المشروع، أو جداول الأتمتة، أو تعليمات تشغيل الأدوات.

عبارة مثل «كن فضوليًّا فكريًّا» تندرج في `SOUL.md`.

أما عبارة مثل «ابحث في أوراق arXiv الجديدة كل يوم اثنين» فتندرج في أتمتة مجدولة، لا في شخصية الوكيل.

أنا أفضّل أن أُبقي هذا الملف قصيرًا إلى حد كبير. فالشخصيات الطويلة قد تصير مجموعة مكلفة من الصفات التي لا تُحسّن السلوك تحسّنًا ذا معنى.

## `USER.md`: سياق عملك الشخصي

يشرح هذا الملف من أنت، وما الذي يهمّك، وكيف ينبغي للوكيل أن يتكيف معك.

من السهل الخلط بينه وبين `MEMORY.md`، لكن التمييز بينهما مهم.

ينبغي أن يضمّ `USER.md` معلومات نسبيًا ثابتة عنك، مصاغة في صورة إرشادات تؤثر في سلوك الوكيل.

### ما الذي يندرج هنا

- تفضيلاتك التقنية.
- خلفيتك المهنية ذات صلة بالمهام.
- مستوى التفصيل الذي تفضّله.
- كيف تتخذ القرارات.
- مجالات تركيزك الحالية.
- تفضيلات شخصية ثابتة مرتبطة بالمساعدة.

### مثال

```markdown
# User Profile

## Background

Steve is an experienced software engineer, engineering leader, educator, and technical author.

He has significant experience with frontend engineering, developer tools, TypeScript, and engineering management.

Avoid introductory explanations of familiar software engineering concepts unless requested.

## Technical Preferences

- Prefer TypeScript for application development.
- Prefer Bun as the JavaScript runtime.
- Prefer SvelteKit for web applications.
- Prefer Neon for PostgreSQL.
- Prefer Upstash for Redis.
- Use descriptive identifiers rather than abbreviations.

## Communication

- Be direct and technically precise.
- Explain underlying architectural tradeoffs.
- Provide concrete implementation examples.
- Avoid generic advice that lacks actionable detail.
- Assume substantial technical expertise.

## Working Style

- Favor practical solutions over unnecessary abstraction.
- Consider maintainability and operational complexity.
- Present alternatives when architectural decisions
  have meaningful tradeoffs.
- Verify claims about rapidly changing technologies.

## Current Interests

- Agentic coding workflows.
- AI orchestration and automation.
- Developer tooling.
- Knowledge management and research.
```

### ما الذي لا يندرج هنا

سجلّ زمني لكل ما ناقشته.

على سبيل المثال:

- «يفضّل Bun على Node في المشاريع الجديدة» تندرج في `USER.md`.
- «اتُّخذ قرار نشر المشروع X على Railway في 7 أكتوبر» تندرج في `MEMORY.md`.
- «أصلحنا اليوم خطأ في إعدادات Railway» تندرج في ملف الذاكرة اليومي.

وأيضًا، لا تخزّن كل تفصيل شخصي ممكن لمجرد أنه متاح. فنموذج قصير ودقيق للمستخدم أنفع بكثير من سيرة ذاتية مصغّرة.

ويمنح OpenClaw حاليًا `USER.md` حدًّا منفصلًا للحقن قدره 4000 حرف، لذا إبقاؤه مركّزًا مهمّ جدًا.

## `MEMORY.md`: المعرفة طويلة المدى

هنا يحتفظ الوكيل بالمعلومات التي تعلّمها والتي ينبغي أن تبقى بعد المحادثات الفردية.

وعلى خلاف `USER.md` الذي يصف سمات وتفضيلات نسبيًا ثابتة عنك، يسجّل `MEMORY.md` حقائق وقرارات وسياقًا تراكمت جميعها عبر عملكم معًا.

### ما الذي يندرج هنا

- القرارات المعمارية وأسباب ومبرراتها.
- حالة المشروع الجارية.
- الاكتشافات المهمة.
- القرارات التي لا ينبغي استعراضها مرارًا وتكرارًا.
- مراجع إلى معلومات أكثر تفصيلًا.

### مثال

```markdown
# Long-Term Memory

## OpenClaw Architecture

Decision: Use a VPS-hosted Gateway with a local Mac node for device-specific capabilities.

Rationale:

- Gateway remains available independently of the Mac.
- Local capabilities can be exposed selectively.
- Centralized coordination simplifies operations.

## Development Infrastructure

Decision: Prefer Neon for PostgreSQL and Upstash
for Redis in new applications.

This is a preference, not a universal requirement. Evaluate alternatives when project constraints warrant it.

## Agentic Development

Research topics:

- Delegation between orchestrators and workers.
- Effective boundaries between skills and subagents.
- Deterministic workflows versus agentic execution.

See memory/ for dated research and decisions.

## Active Projects

### Research Automation

Goal: Build reusable research workflows that collect sources, evaluate evidence, and generate structured deliverables.

Status: Design and experimentation.

Next consideration: Evaluate deterministic collection with agent-driven synthesis.
```

### التمييز بين `MEMORY.md` والذاكرة اليومية

يستخدم OpenClaw أيضًا ملفات ذاكرة مؤرَّخة:

```
memory/
├── 2026-10-05.md
├── 2026-10-06.md
└── 2026-10-07.md
```

فكّر في مستويَي التخزين هذين بالصورة التالية:

| `MEMORY.md` | `memory/YYYY-MM-DD.md` |
| --- | --- |
| معارف منقّحة | ملاحظات مرتبة زمنيًا |
| قرارات دائمة | أحداث فردية |
| إشارة عالية وحجم منخفض | سياق تاريخي مفصّل |
| تُراجَع عند تغيّر الحقائق | تُضاف إليها أثناء العمل |
| موجز يكفي للسياق المتكرّر | تُستدعى عند الحاجة |

على سبيل المثال، قد تدوّن ذاكرة اليوم أنك بحثت ثلاثة مزوّدي VPS، وقارنت تكاليف تشغيلهم، واخترت أحدهم.

أما الذاكرة طويلة المدى فتحتفظ بالاختيار النهائي وبالمنطق الذي خلفه.

يمكن إعادة إدراج الملاحظات اليومية الحديثة عند بدء جلسة جديدة، لكن الأرشيف اليومي الكامل يُستعلم عنه عادةً عند الطلب. ويُدرَج `MEMORY.md` في سياق وقت التشغيل المضمَّن المعتاد حين ينطبق ذلك، مع معالجة مختلفة في بعض بيئات التنفيذ.

لهذا أفضّل أن أُبقي `MEMORY.md` صغيرًا ومنقَّحًا بقصد.

القاعدة التي أعتمدها: `AGENTS.md` يحكم الأفعال، و`SOUL.md` يحكم الخُلق، و`IDENTITY.md` يقرّر الهوية، و`USER.md` يصفك، و`MEMORY.md` يحفظ ما تعلّمه. أما اصطلاحات الأدوات فتندرج داخل `AGENTS.md`.
