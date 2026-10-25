---
title: "المهارات وClawHub"
lang: ar
source: "https://stevekinney.com/courses/openclaw/skills-and-clawhub"
---

**المهارة (skill)** مجلد يحتوي على ملف `SKILL.md`. ويعلّم الملف وكيلك إجراءً: متى يفعل شيئًا، وأي الأدوات يستخدم، وكيف تبدو النتيجة الجيدة. بالمهارات يوسّع معظم الناس OpenClaw يومًا بيوم، والنمط الأكثر شيوعًا في المجتمع هو أن يطلبوا من الوكيل أن يكتب واحدة لنفسه.

تضع وثائق OpenClaw الفرق بين أنواع التوسعة الثلاثة بوضوح: الأدوات أفعال يستطيع الوكيل استدعاءها، والمهارات تعلّمه كيف يعمل، والإضافات تضيف قدرات تشغيل جديدة. فالتجأ إلى مهارة حين يملك الوكيل الأدوات التي يحتاجها بالفعل ولا يبقى عليه سوى معرفة كيف يستخدمها جيدًا.

> **المهارة تعلّم. إنها لا تمنح، وليست معزولة.**
>
> لا تستطيع المهارة أن تمنح وكيلك أداة، ولا بيانات اعتماد، ولا وصولًا إلى سطر الأوامر لم يكن يملكه بالفعل. لكن هذا يعمل في الاتجاهين: فبمجرد تثبيتها، تعمل المهارة بكل صلاحيات الوكيل، ولا شيء يعزلها عنها. والمهارة المجتمعية شيفرة وتعليمات غير موثوقة. اقرأها قبل أن تُفعّلها.

## أين تعيش المهارات

يبحث OpenClaw عن المهارات في عدة مواضع. وعندما تشترك مهارتان في الاسم، تفوز المهارة الأعلى في هذه القائمة:

| # | الموضع | من يراها |
| --- | --- | --- |
| 1 | `<workspace>/skills/` | الوكيل الذي يملك مساحة العمل تلك |
| 2 | `<workspace>/.agents/skills/` | الوكيل نفسه (تخطيط بنمط المشروع) |
| 3 | `~/.agents/skills/` | كل وكيل (مهاراتك الشخصية) |
| 4 | `~/.openclaw/skills/` | كل وكيل على البوابة (تثبيتات `--global`) |
| 5 | `~/.openclaw/agents/<agentId>/agent/workshop-skills/` | المهارات التي يكتبها وكيل واحد بنفسه (انظر [أدناه](#skills-that-write-themselves)) |
| 6 | مرفقة مع OpenClaw | كل وكيل |
| 7 | `skills.load.extraDirs` ومهارات الإضافات | كل وكيل |

مساحة العمل الافتراضية هي `~/.openclaw/workspace`، لذا توضع مهاراتك عادةً في `~/.openclaw/workspace/skills/<name>/SKILL.md`.

هذه المسارات على **مضيف البوابة (Gateway host)**، وليس بالضرورة على الحاسوب الذي تكتب عليه. في [قالب Railway](https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale) مثلًا، يعيش دليل الحالة على وحدة التخزين تحت `/data/.openclaw`.

تفسّر الأولوية عطلًا محبِطًا: إن عدّلت مهارة ولم يتغيّر شيء، فتحقق مما إذا كانت هناك نسخة بالاسم نفسه في موضع أعلى من القائمة. فالنسخة الأعلى تفوز بصمت.

## اعرف ما لديك بالفعل

يأتي OpenClaw بعدة عشرات من المهارات المرفقة، وقد طلب منك [درس Gmail](https://stevekinney.com/courses/openclaw/gmail-and-google-calendar-integration) بالفعل أن تبحث عن واحدة منها، وهي `gog`. وتُظهر ثلاثة أوامر ما هو محمَّل:

```bash
openclaw skills list
openclaw skills check
openclaw skills info <name>
```

تسأل الأوامر الثلاثة البوابة، فتبلّغك برؤية البوابة حتى حين تشغّلها من جهاز آخر.

يعرض `list` كل مهارة مع حالتها: **جاهزة**، أو **تحتاج تهيئة**، أو **معطّلة**. ويلخّص `check` ما يستطيع وكيل واحد استخدامه فعلًا:

```
Agent: main
Total: 56
✓ Eligible: 22
✓ Visible to model: 22
✓ Available as command: 20
Disabled: 31
Blocked by allowlist: 0
Excluded by agent allowlist: 0
✗ Missing requirements: 3
```

ستختلف أرقامك. وهذا معنى السطور:

- **ظاهرة للنموذج** تعني أن اسم المهارة ووصفها موجودان في مطالبة الوكيل، فيستطيع اختيار المهارة بنفسه.
- **متاحة كأمر** تعني أنك تستطيع أيضًا استدعاءها كأمر شرطة مائلة (slash command). وقد يكون عددها أقل من «الظاهرة» لأن بعض المهارات تختار ألا تكون أوامر.
- المهارات **المعطّلة** مُطفأة في الإعدادات، فلا تُعرض أبدًا.
- **المتطلبات المفقودة** تعني أن المهارة تحتاج شيئًا لا يملكه المضيف. ويخبرك `info` بما هو:

```
⏰ apple-reminders △ Needs setup
  Source: openclaw-bundled
  Visible to model: no
  Available as command: no
Requirements:
  Binaries: ✗ remindctl
  OS: ✓ (darwin)
```

ثبّت الثنائي المفقود على مضيف البوابة (أو على [عقدة مقترنة](https://stevekinney.com/courses/openclaw/connecting-a-remote-node) توفّره) فتصبح المهارة جاهزة.

## اكتب مهارتك الأولى

ابدأ بمهارة لا تحتاج إلى أي أدوات إطلاقًا، فلا يكون الشيء الوحيد الذي تختبره سوى ما إذا كان OpenClaw يجدها ويستخدمها.

### الخطوة 1: أنشئ المجلد

على مضيف البوابة:

```bash
mkdir -p ~/.openclaw/workspace/skills/meeting-notes
```

أبقِ اسم المجلد و`name` الخاص بالمهارة متماثلين.

### الخطوة 2: اكتب `SKILL.md`

أنشئ `~/.openclaw/workspace/skills/meeting-notes/SKILL.md`:

```markdown
---
name: meeting-notes
description: Turn rough meeting notes into a summary with decisions, action items, and open questions.
---

# Meeting Notes

Use this when the user pastes notes from a meeting and asks you to clean them up.

1. Write a two-sentence summary of what the meeting was about.
2. List every decision under **Decisions**. Only include things that were actually decided.
3. List action items under **Action Items** as `- [ ] Owner: task (due date if mentioned)`.
   If no owner was named, write `Owner: unassigned` rather than guessing.
4. List anything unresolved under **Open Questions**.
5. Don't add commentary or recommendations unless the user asks for them.
```

الواجهة الأمامية (frontmatter) هي الجزء الذي يقرأه OpenClaw ليقرّر *متى* يستخدم المهارة. أما المتن فهو ما يقرأه الوكيل بعد أن يقرّر ذلك. واكتب `description` كإجابة من سطر واحد عن سؤال «متى ينبغي للوكيل أن يلجأ إلى هذه؟»، في أقل من 160 حرفًا.

### الخطوة 3: تأكّد من أنها حُمِّلت

```bash
openclaw skills info meeting-notes
```

تريد أن ترى `Source: openclaw-workspace` و`Visible to model: yes`.

يراقب OpenClaw مجلدات المهارات، فتظهر المهارة الجديدة أو المعدّلة في دور الوكيل التالي. وإن لم يحدث ذلك، فقد تكون الجلسة محتفظة بنسخة قديمة. أرسل `/new` لبدء جلسة جديدة، أو أعد تشغيل البوابة.

### الخطوة 4: استخدمها

هناك ثلاث طرق لاستدعاء مهارة:

| الطريقة | مثال |
| --- | --- |
| أن يختارها الوكيل من الوصف | «أيمكنك ترتيب هذه الملاحظات؟ …» |
| الإشارة إليها في رسالة بعلامة `$` | `$meeting-notes` متبوعة بالملاحظات |
| استدعاؤها كأمر شرطة مائلة | `/meeting_notes ...` أو `/skill meeting-notes ...` |

لا يمكن لأسماء أوامر الشرطة المائلة أن تستخدم سوى الحروف الصغيرة والأرقام والشرطات السفلية، لذا تصبح الشرطات العادية شرطات سفلية. ويعمل `/skill <name>` دائمًا، أيًّا كان الاسم.

**اختبر الطريقة الأولى، لا الأخيرتين فقط.** الصق بعض الملاحظات غير المرتبة دون تسمية المهارة. فإن لم يستخدمها الوكيل، فوصفك لا يقول بوضوح كافٍ متى تنطبق. أعد كتابته وحاول مرة أخرى.

## أضف سكربتًا

تصبح المهارات أكثر فائدة حين تضمّ سكربتًا. وما زال الوكيل يشغّل السكربت بأداة `exec` الخاصة به، لذا ينطبق كل ما في [الأمن والموافقات](https://stevekinney.com/courses/openclaw/security-and-approvals).

```
~/.openclaw/workspace/skills/repo-standup/
├── SKILL.md
└── scripts/
    └── standup.sh
```

`SKILL.md`:

```markdown
---
name: repo-standup
description: Summarize the last day of commits in a Git repository as a short standup update.
metadata: { 'openclaw': { 'requires': { 'bins': ['git'] } } }
---

# Repo Standup

When the user asks for a standup update for a repository:

1. If they haven't given a repository path, ask for one.
2. Run `{baseDir}/scripts/standup.sh <repository-path>` with the `exec` tool.
3. Group the commits by theme and write three to five bullet points. Don't list every commit.
4. If the script prints nothing, say there were no commits. Don't invent work.
```

`scripts/standup.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$1"
git log --since="24 hours ago" --no-merges --pretty=format:'%h %an %s'
```

اجعل السكربت قابلًا للتنفيذ بـ `chmod +x scripts/standup.sh`.

هناك شيئان جديدان هنا:

- يرجع **`{baseDir}`** إلى مجلد المهارة نفسه، فلا تُثبّت أبدًا دليل المنزل في الشيفرة.
- **`metadata.openclaw.requires.bins`** بوابة. فإن لم يكن `git` على `PATH` الخاص بالمضيف، ظهرت المهارة بحالة «تحتاج تهيئة» وبقيت خارج التوجيه، بدلًا من أن تفشل في منتصف الطريق.

إن كانت سياسة التنفيذ لديك تسأل قبل تشغيل أوامر غير مألوفة، فسيُنتج التشغيل الأول طلب موافقة. واختيار **السماح دائمًا** يوافق على هذا الأمر بالضبط في دليل العمل هذا، فلا تسأل عمليات التشغيل اللاحقة ضد المستودع نفسه مرة أخرى.

## مرجع الواجهة الأمامية {#frontmatter-reference}

| المفتاح | الافتراضي | ما يفعله |
| --- | --- | --- |
| `name` | — | مطلوب. حروف صغيرة وأرقام وشرطات عادية |
| `description` | — | مطلوب. سطر واحد، في أقل من 160 حرفًا |
| `user-invocable` | `true` | اضبط `false` لإخفاء المهارة من أوامر الشرطة المائلة |
| `disable-model-invocation` | `false` | اضبط `true` حتى لا يختارها الوكيل بنفسه أبدًا؛ ويظل `$name` يعمل |
| `homepage` | — | رابط يُعرض في واجهة المستخدم |

تقع البوابات تحت `metadata.openclaw`. والمهارة التي بلا بوابات مؤهَّلة دائمًا.

| المفتاح | القاعدة |
| --- | --- |
| `requires.bins` | يجب أن يكون كل ثنائي مدرج على `PATH` |
| `requires.anyBins` | يجب أن يكون واحد على الأقل على `PATH` |
| `requires.env` | يجب أن يُضبط كل متغيّر بيئة، أو يُوفَّر عبر الإعدادات |
| `requires.config` | يجب أن يكون كل مسار `openclaw.json` مدرج صادقًا (truthy) |
| `os` | `darwin` و`linux` و/أو `win32` |
| `always` | تخطّي فحوص `requires` (لكن ليس `os`) |
| `primaryEnv` | متغيّر البيئة الذي يملؤه `skills.entries.<name>.apiKey` |

لاحظ أن `os` و`always` يقعان بجوار `requires` لا داخله:

```markdown
metadata: { "openclaw": { "os": ["darwin"], "requires": { "bins": ["memo"] } } }
```

### منح مهارة مفتاحًا

لا تضع بيانات اعتماد أبدًا في `SKILL.md` أو ملفاته. وإن أعلنت المهارة عن `primaryEnv`، فأعطها المفتاح عبر الإعدادات بدلًا من ذلك:

```json5
{
  skills: {
    entries: {
      'my-search': {
        apiKey: { source: 'env', provider: 'default', id: 'SEARCH_API_KEY' },
      },
    },
  },
}
```

يُحقن المفتاح في البيئة لدور الوكيل ذلك فقط، وعلى المضيف وحده. **وهو لا يصل إلى بيئة معزولة.** ويحتاج الوكيل المعزول إلى تمرير المتغيّر عبر `agents.defaults.sandbox.docker.env` بدلًا من ذلك، وإلى تثبيت الثنائي المبوَّب داخل الحاوية.

## العثور على المهارات في ClawHub

[ClawHub](https://clawhub.ai/) هو السجل العام لمهارات OpenClaw وإضافاته. ويمكنك تصفّحه على الويب أو البحث من الطرفية:

```bash
openclaw skills search "calendar"
```

لكل مهارة صفحة تضم أمر تثبيتها، و`SKILL.md` الخاص بها، وملفاتها، وسجل إصداراتها، وفحصًا أمنيًا:

صفحة ClawHub لمهارة gog، تعرض أمر التثبيت، وتبويبات SKILL.md وSkill Card وFiles وVersions وRequirements، ونتيجة فحص أمني هي Pass

أشِر إلى المهارات بـ**المالك والاسم**، مثل `@steipete/gog`. فالأسماء الشائعة تجذب المتشابهات: بحث عن «calendar» يعيد عدة مهارات من مالكين مختلفين بأوصاف متطابقة تقريبًا. والمالك جزء مما تثق به.

## فحص مهارة قبل تثبيتها

يحصل كل إصدار على فحص أمني من ClawHub. انقر النتيجة في صفحة المهارة لقراءة التقرير الكامل:

صفحة الفحص الأمني في ClawHub لمهارة gog، وفيها نظرة عامة على ما تفعله المهارة، ونتيجة Pass، وتاريخ الفحص، وقائمة بأنماط الثغرات التي فُحصت مقابلها

يعطي الفحص إجابتين منفصلتين. أما **الحالة** فتقول ما تفعله بالنتيجة:

| الحالة | ما تعنيه |
| --- | --- |
| Pass | لم يُعثر على أي شيء يتجاوز الخطورة المنخفضة |
| Review | اقرأ النتائج أولًا. فقد تظل المهارة مشروعة |
| Warn | عُثر على مشكلة عالية الأثر. توخَّ حذرًا شديدًا |
| Malicious | لا تثبّتها |
| Pending | لم ينته الفحص بعد |
| Error | تعذّر إكمال الفحص |

ويقول **مستوى الخطورة** (منخفض أو متوسط أو مرتفع) مقدار القوة التي تملكها المهارة إن عملت تمامًا كما يُقصد بها. فالمهارة التي ترسل البريد يمكن أن تكون صادقة تمامًا وتبقى متوسطة الخطورة، لأن إرسال البريد باسمك قوة كبيرة.

يمكنك التحقق من المعلومات نفسها من الطرفية:

```bash
openclaw skills verify @steipete/gog --card
openclaw skills verify @steipete/gog
```

يطبع الأمر الأول بطاقة المهارة، وهي قائمة قصيرة بمخاطر المهارة وكيفية تقليلها. ويطبع الثاني حكم ClawHub، وعند توفره رابطًا إلى إيداع المصدر بالضبط الذي فُحص. وهو لا يعيد فحص أي شيء ولا يفحص الملفات على قرصك.

**النجاح (Pass)** علامة جيدة لا ضمان. وقبل التثبيت، افعل هذا أيضًا:

1. **اقرأ `SKILL.md`** في تبويب Files. وابحث عن تعليمات تغيّر أهداف الوكيل، أو تكتب إلى الذاكرة، أو تطلب منه تجاهل قواعده.
2. **اقرأ كل سكربت.** وابحث عن التنزيلات، ونداءات الشبكة إلى مواضع لا سبب للمهارة في الاتصال بها، وأي شيء يقرأ متغيّرات البيئة أو ملفات بيانات الاعتماد.
3. **افحص المتطلبات.** أي الثنائيات ومتغيّرات البيئة تحتاجها، وهل تناسب ما تدّعي المهارة أنها تفعله؟
4. **افحص المالك وسجل الإصدارات.** فمهارة قديمة من ناشر موثّق رهان مختلف عن مهارة نُشرت أمس.
5. **ثبّت بضيق.** ثبّتها في مساحة عمل وكيل واحد بدلًا من التثبيت العام، وثبّت إصدارًا بعينه بعد أن تراجعها.

> **ليست كل المصادر مفحوصة**
>
> المهارات المثبّتة بمرجع `skills-sh:` يحلّها ClawHub إلى إيداع GitHub لكنها تُوسم بأنها **غير مفحوصة من ClawHub**. أما المهارات المثبّتة مباشرة من Git أو من مجلد محلي فلا تُفحص إطلاقًا. وفي تلك الحالات، تكون مراجعتك أنت هي المراجعة الوحيدة.

## التثبيت والتحديث والإزالة

ثبّت مهارة راجعتها بـ:

```bash
openclaw skills install @steipete/gog
```

افتراضيًا تذهب إلى مجلد `skills/` في مساحة عمل الوكيل الحالي. استخدم `--agent <id>` لاختيار وكيل بعينه، و`--global` للتثبيت في `~/.openclaw/skills` لكل وكيل، و`--version <version>` لتثبيت إصدار بعينه.

يكتب `install` إلى مساحة عمل على الجهاز الذي تشغّله عليه، لذا **شغّله على مضيف البوابة**. وإن كانت بوابتك بعيدة، فإما أن تشغّله هناك (على [قالب Railway](https://railway.com/?referralCode=kinney)، عبر `railway ssh --service openclaw -- openclaw skills install ...`) أو تثبّت من واجهة التحكم: افتح **Plugins**، وانتقل إلى تبويب **Skills**، واستخدم بحث ClawHub هناك.

قبل التنزيل، يفحص التثبيت الفحص الأمني الخاص بالإصدار:

- تطبع **Review** ملخّص الفحص ورابطًا، ثم تتابع.
- تُرفض الإصدارات **الخبيثة** أو المحظورة.
- تنتظر المهارات المدعومة من GitHub والتي حالتها **Pending** انتهاء الفحص. وهناك علم `--force-install` لتخطّي الانتظار. لا تستخدمه لمجرد تجاوز الفحص.

للتحديث:

```bash
openclaw skills update @steipete/gog
openclaw skills update --all
```

تنطبق التحديثات على المهارات المثبّتة من ClawHub فقط. وإن كنت قد عدّلت مهارة مثبّتة، رفض التحديث بدلًا من الكتابة فوق تغييراتك، إلا إذا مرّرت `--force`.

لا يوجد `openclaw skills uninstall`. فالإزالة تتم عبر واجهة سطر أوامر ClawHub نفسها، موجّهة إلى المجلد الذي ثبّتت فيه:

```bash
npm install -g clawhub
clawhub --workdir ~/.openclaw/workspace uninstall @steipete/gog
```

وفي تثبيت `--global`، استخدم `--workdir ~/.openclaw` بدلًا من ذلك. ثم تأكّد من اختفاء المهارة بـ `openclaw skills list`.

## اختيار المهارات التي يراها كل وكيل

افتراضيًا، يرى كل وكيل كل مهارة مؤهَّلة. ويمكنك تضييق ذلك بقوائم السماح:

```json5
{
  agents: {
    defaults: {
      skills: ['meeting-notes', 'repo-standup', 'gog'],
    },
    entries: {
      researcher: { skills: ['summarize'] },
      'locked-down': { skills: [] },
    },
  },
}
```

- قائمة الوكيل نفسه **تستبدل** القائمة الافتراضية. وهي لا تضيف إليها.
- `[]` تعني لا مهارات إطلاقًا.
- لإطفاء مهارة في كل مكان، اضبط `skills.entries.<name>.enabled: false`.

ويمكنك أيضًا تشغيل المهارات وإطفاءها لمحادثة واحدة في واجهة التحكم: في محرّر الرسالة، انقر **+** ثم **Skills**.

قائمة السماح تقرّر فقط المهارات التي *يعرف عنها* الوكيل. وهي ليست حدًّا للصلاحيات. فالوكيل الذي يستطيع تشغيل أوامر سطر الأوامر يمكنه أيضًا تشغيل أي ثنائي على المضيف، سواء ذكرته مهارة أو لم تذكره. وأذونات الأوامر تحددها [موافقات التنفيذ](https://stevekinney.com/courses/openclaw/security-and-approvals)، لا المهارات.

## المهارات التي تكتب نفسها {#skills-that-write-themselves}

تتيح **ورشة المهارات (Skill Workshop)** لوكيلك إنشاء مهاراته الخاصة وتحسينها من الخبرة. وهي كما تأتي جاهزة أكثر استقلالية مما قد تتوقع:

| الإعداد | الافتراضي | ما يعنيه الافتراضي |
| --- | --- | --- |
| `skills.workshop.autonomous.mode` | `auto` | يعدّل الوكيل مهارات الورشة الخاصة به مباشرةً بأدوات الملفات لديه |
| `skills.workshop.approvalPolicy` | `auto` | يستطيع الوكيل تطبيق مقترحاته الخاصة دون أن يسألك |

الضابط في وضع `auto` هو حدّ دليل، لا مراجع بشري. فلا يستطيع الوكيل الكتابة إلا داخل مجلد `workshop-skills` الخاص به، ولا يمسّ أبدًا مهارة من مصدر آخر. لكن داخل ذلك المجلد، لا تمرّ التغييرات عبر مقترح ولا فحص ولا لقطة استرجاع.

وإن كنت تفضّل الموافقة على كل تغيير، فانتقل إلى المقترحات:

```bash
openclaw config set skills.workshop.autonomous.mode propose
openclaw config set skills.workshop.approvalPolicy pending
```

ثم راجع ما يقترحه الوكيل:

```bash
openclaw skills workshop list
openclaw skills workshop inspect <proposal-id>
openclaw skills workshop apply <proposal-id>
openclaw skills workshop reject <proposal-id> --reason "Too specific"
```

القائمة نفسها موجودة في واجهة التحكم تحت **Plugins**، في تبويب **Skill Workshop**، تحت **Suggestions**.

تبويب ورشة المهارات في واجهة التحكم، وفيه تبويبان فرعيان Skills وSuggestions، ومفتاح Self-learning، ومهارات الورشة المثبّتة للوكيل مسرودة بجوار معاينة للمهارة المختارة

أيًّا كان الوضع، يمكنك طلب مهارة مباشرةً. أرسل `/learn` بعد محادثة سارت على ما يرام، واختياريًا مع طلب مثل `/learn a skill for triaging my GitHub notifications`. وهي تصوغ مهارة واحدة للمراجعة ولا تطبّقها بنفسها أبدًا.

## جرّب بنفسك

1. **أثبت أن الاكتشاف يعمل.** أنشئ `meeting-notes`، وتأكّد منها بـ `openclaw skills info`، واجعل الوكيل يستخدمها دون أن تسمّيها.
2. **اكسر بوابة عن قصد.** عدّل `repo-standup` لتتطلب ثنائيًا غير موجود، مثل `gitx`. تأكّد أن `openclaw skills check` يسردها تحت المتطلبات المفقودة وأن الوكيل لم يعد يعرضها. ثم أعدها كما كانت.
3. **اخسر معركة أولوية.** ضع مجلد `meeting-notes` ثانيًا في `~/.openclaw/skills/` بمتن مختلف. اطلب من الوكيل استخدامه وتأكّد أن نسخة مساحة العمل ما زالت تفوز. احذف النسخة الإضافية.
4. **افحص مهارة حقيقية.** اختر مهارة على ClawHub قد تريدها فعلًا. اقرأ فحصها الأمني، و`SKILL.md` الخاص بها، وسكربتاتها، وشغّل `openclaw skills verify @owner/name --card`. ودوّن شيئًا واحدًا تريد معرفته قبل تثبيتها.
5. **دع الوكيل يكتب واحدة.** بعد مهمة تكرّرها كثيرًا، أرسل `/learn`. وافحص المسودة قبل تطبيق أي شيء.

## استكشاف الأخطاء وإصلاحها

| العَرَض | ما تفحصه |
| --- | --- |
| المهارة ليست في `openclaw skills list` | اسم المجلد والملف (`SKILL.md`)، وحقل `name`، وكونها على مضيف البوابة |
| إنها مسرودة لكن الوكيل لا يستخدمها أبدًا | الوصف، وقائمة سماح المهارات لدى الوكيل، و`disable-model-invocation` |
| تقول «تحتاج تهيئة» | `openclaw skills info <name>` للثنائي المفقود أو متغيّر البيئة أو نظام التشغيل |
| تعديلاتك لا تظهر | مهارة بالاسم نفسه أعلى في قائمة الأولوية، أو جلسة قديمة (أرسل `/new`) |
| تعمل عادةً لكنها تفشل في بيئة معزولة | المفاتيح لا تُمرَّر إلى البيئات المعزولة، ويجب أن توجد الثنائيات المبوَّبة داخل الحاوية |
| تفشل عند تشغيلها بواسطة وكيل فرعي | قد يُمنع `exec` على الوكلاء الفرعيين. انظر [الوكلاء الفرعيون والتنسيق](https://stevekinney.com/courses/openclaw/subagents-and-orchestration) |
| `openclaw skills uninstall` غير موجود | استخدم `clawhub --workdir <folder> uninstall @owner/name` |

> **الأوامر والأعلام تتغيّر**
>
> يطابق هذا الدرس إصدار OpenClaw `2026.9.8`. وإن لم يتصرّف شيء كما هو موصوف، فشغّل الأمر مع `--help` وراجع [وثائق OpenClaw](https://docs.openclaw.ai/).
