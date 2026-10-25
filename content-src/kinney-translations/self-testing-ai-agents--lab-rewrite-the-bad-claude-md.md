---
title: "مختبر (اختياري)"
---

حان وقت فعل الشيء.

افتح مستودع Shelf الانطلاقي. في الجذر يوجد ملف [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory). في نسخة الدورة المحلّية، هو مسوّدة مقبولة — ليست سيئة، لكنها ما زالت غامضة في مواضع. مهمتك في هذا المختبر أن تُحكمه حتى تصبح كل قاعدة شيئًا يستطيع الوكيل التصرّف فيه آليًا.

## الإعداد

استخدم نسخة Shelf موجودة مع الحزم مثبّتة والتطبيق متاحًا في سير عملك المحلّي المعتاد. افتح [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory) و`package.json` جنبًا إلى جنب في محرّرك. تأتي بذرة Shelf بقواعد المسارات والمصادقة والاختبار جاهزة — هذا المختبر عن جعل تلك القواعد *قابلة للفرض آليًا* وقصيرة بما يكفي كي يتبّعها الوكيل فعلًا دون أن تكرّر نفسك. أبقِ ما يستحقّ مكانه وأحكِم ما ما زال غامضًا.

## المهمة

أعد كتابة [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory) بحيث تصبح كل قاعدة فيه شيئًا يستطيع الوكيل التصرّف فيه آليًا. يُسمح لك بالحذف *بجرأة*. ويُشجَّع لك أن تحذف أكثر مما تبقي.

تحديدًا، ينبغي أن يتضمّن الملف الجديد:

- قسم «ما معنى النجاح» يسمّي الأوامر الدقيقة التي ينبغي أن يشغّلها الوكيل قبل إعلان انتهاء المهمة. ابحث في `package.json` عن أسماء السكربتات الفعلية. لا تختلق أوامر.
- قاعدة واحدة على الأقل عن كيفية كتابة الاختبارات (ترتيب TDD، وموضع الملف، واصطلاح التسمية — القرار لك).
- قاعدة واحدة على الأقل عن كيفية اختيار محدّدات [Playwright](https://playwright.dev/).
- قاعدة واحدة على الأقل عن بقاء النصوص الموجّهة للمستخدم بصوت المنتج. فملاحظات الدورة، وتعليل الاختبارات، وأسماء المسارات، وتفاصيل البنية التحتية مكانها الوثائق أو التعليقات، لا الواجهة.
- قاعدة واحدة على الأقل عن شيء يجب ألّا يفعله الوكيل في هذه الشيفرة (دليل يُترك وشأنه، أو نمط يُتجنّب، أو تبعية لا تُضاف).

أبقِ الملف تحت ستين سطرًا. فإن كان أطول، فأنت على الأرجح تكتب تعليمات لنفسك لا للوكيل.

تأتي البذرة بمسارات حقيقية تستحق التسمية. استخدم ذلك. فقاعدة تقول «أعد استخدام `src/lib/components`» أو «ضع مواصفات Playwright في `tests/`» أقوى من قاعدة غامضة عن البقاء منظّمًا.

## معايير القبول

كل بند قابل للفحص باستقلال. لا تنتقل حتى تُعلَّم كلها.

- [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory) موجود في جذر المستودع وتحت ستين سطرًا (`wc -l CLAUDE.md` يعطي رقمًا ≤ 60).
- يحتوي الملف قسمًا يسمّي ثلاثة أوامر صدفية دقيقة على الأقل ينبغي أن يشغّلها الوكيل قبل إعلان انتهاء المهمة.
- كل أمر مسمّى في ذلك القسم موجود فعلًا في `package.json` (تحقّق بـ `cat package.json | grep <command-name>` لكل أمر).
- يحتوي الملف صفر حالات من الكلمات «clean» أو «best practices» أو «good» أو «appropriate» (`grep -iE 'clean|best practices|good|appropriate' CLAUDE.md` لا يعيد أي تطابق).
- يحتوي الملف قاعدة واحدة على الأقل تذكر مسار ملف محدّدًا في المستودع، وذلك المسار يُحلّ (`ls <path>` يخرج بالرمز صفر للمسار الذي سمّيته).
- يحتوي الملف قاعدة واحدة على الأقل عن اختيار محدّد [Playwright](https://playwright.dev/) تسمّي واجهة برمجية محدّدة في [Playwright](https://playwright.dev/) (مثل `getByRole` أو `getByLabel` أو `data-testid`).
- يحتوي الملف قاعدة واحدة على الأقل تُبقي النصوص الموجّهة للمستخدم عن الكتب والقراءة، وتُخرج ملاحظات الدورة أو الاختبار من الواجهة.
- شغّلت `npm run lint` و`npm run typecheck` و`npm run test` بعد التعديل وخرجت الثلاثة بالرمز صفر. (`CLAUDE.md` ملف markdown، لذا ينبغي ألّا تتأثّر، لكن العادة هي المقصد.)
- التزمت التغيير برسالة تبدأ بـ `lab(rewrite-the-bad-claude-md):` والتجزئة موجودة على `HEAD`.

إن تذبذب `npm run test` هنا لأن البذرة ما زالت تستخدم تسجيل الدخول التفاعلي داخل اختبارات المتصفح، فسجّل ذلك وامضِ. المختبر التالي مباشرةً موجود لتقوية نمط الفشل ذلك بعينه.

### الفحص بضربة واحدة

انسخ هذا المقطع وألصقه في جذر المستودع لتشغيل كل فحص آلي أعلاه دفعة واحدة. يخرج بالرمز صفر حين ينجح الملف، ويطبع القاعدة الفاشلة تحديدًا حين لا ينجح:

```bash
set -e

# Length cap
[ "$(wc -l < CLAUDE.md)" -le 60 ] || { echo "fail: CLAUDE.md has more than 60 lines"; exit 1; }

# Banned vague words
for word in clean "best practices" good appropriate; do
  if grep -iq "$word" CLAUDE.md; then
    echo "fail: CLAUDE.md contains banned word '$word'"
    exit 1
  fi
done

# Commands referenced in CLAUDE.md must exist in package.json
for cmd in $(grep -oE 'npm run [a-z:-]+' CLAUDE.md | awk '{print $3}' | sort -u); do
  grep -q "\"$cmd\":" package.json || { echo "fail: npm run $cmd not in package.json"; exit 1; }
done

# At least one Playwright locator API is named
grep -qE 'getByRole|getByLabel|getByText|data-testid' CLAUDE.md \
  || { echo "fail: no Playwright locator rule"; exit 1; }

echo "ok: CLAUDE.md passes every mechanical check"
```

شغّل ذلك المقطع داخل المستودع بعد كل تعديل على `CLAUDE.md`. وحين يطبع `ok`، يكون النصف الآلي من المختبر قد انتهى ويمكنك الانتقال إلى النصف الذاتي («هل يتبّع الوكيل هذه القواعد فعلًا حين تعطيه مهمة»).

## كيف يبدو هذا أمام وكيل حقيقي

حين ينجح ملفك في الفحوص الآلية، يصبح السؤال الحقيقي: هل يغيّر سلوك الوكيل فعلًا؟ هذا ما تبدو عليه جولة أمام Claude Code مع `CLAUDE.md` محكَم في مكانه. الطلب:

> أضف عدّاد «أنجزت هذا العام» إلى صفحة الإحصاءات. واتّبع القواعد في CLAUDE.md.

ملف `CLAUDE.md` محكَم ينتج جلسة تبدو تقريبًا هكذا. يفترض هذا النص أن مختبر الطبقة الثابتة أضاف `npm run knip`؛ وإن كنت تنفّذ هذا المختبر بمعزل، فتجاهل خطوة knip — فالبوابات الثلاث في `package.json` الانطلاقي هي `typecheck` و`lint` و`test`.

```
Reading CLAUDE.md...

I see the "Done means green" section. I'll need to run typecheck, lint,
knip, and test before I can report this complete.

Let me find the stats page. Grepping for "stats" in src/routes/...
  → src/routes/(app)/goals/+page.svelte exists. That looks like the
    closest thing to a stats page Shelf has today.

Reading +page.server.ts for the goals route to understand the data
shape... the loader already returns shelfEntries with finishedAt
timestamps. Good — I can compute the "finished this year" count from
that without adding a new query.

Editing +page.svelte to add a $derived expression:
  let finishedThisYear = $derived(
    shelfEntries.filter(entry =>
      entry.finishedAt &&
      new Date(entry.finishedAt).getFullYear() === new Date().getFullYear()
    ).length
  );

And the rendering:
  <p>You've finished {finishedThisYear} books this year.</p>

CLAUDE.md says user-facing strings are about books, shelves, and reading.
This one is. Good.

Running npm run typecheck...
  → exit 0, 3 pre-existing warnings in playground, not mine.

Running npm run lint...
  → exit 0.

Running npm run knip...
  → exit 0.

Running npm run test...
  → 38 passed. The authenticated visual baseline for /shelf didn't
    change because I edited /goals, not /shelf.

All four gates green. Task complete.
```

ثمّة أمران يجب ملاحظتهما في هذا النص:

- قرأ الوكيل `CLAUDE.md` أولًا واستخرج قاعدة «الانتهاء يعني النجاح» قبل أن يلمس أي شيفرة. لم يحتج إلى تذكير.
- فحص قاعدة نصوص المنتج على مخرجاته قبل أن يمضي. فالقاعدة اشتغلت كحاجز، لا كفحص لاحق.

ملف `CLAUDE.md` *رخو* — ذاك الذي تشحنه البذرة — ينتج جلسة مختلفة جدًا. فما زال الوكيل يكتب الميزة، لكنه إمّا يتخطّى البوابات كليًا أو يشغّلها بترتيب خاطئ، ويصبح «من فضلك شغّل البوابات» شيئًا عليك قوله في المحادثة. والفرق بين النسختين هو الفرق بين «تعليمات يستشيرها الوكيل» و«تعليمات يطيعها الوكيل آليًا». والثانية هي التي تريدها.

إن كنت متشكّكًا، فجرّب بنفسك: أعد `CLAUDE.md` إلى حالته الانطلاقية (أو علّق قسم «الانتهاء يعني النجاح»)، وأعطِ Claude Code الطلب نفسه، وقارن النصوص. ستكون شيفرة الميزة متشابهة؛ أما العملية حولها فلن تكون.

## أهداف إضافية

إن انتهيت مبكرًا:

- أضف قاعدة تشير إلى ملف لم تنشئه بعد، ثم أنشئه. (دروس تسجيل HAR اللاحقة في الدورة ستعمر `tests/fixtures/` — وقاعدة اصطلاح للـ fixtures تناسب أن تُرسى مبكرًا.)
- شغّل المهمة نفسها أمام وكيل ثانٍ (Cursor أو Codex أو Copilot) باستخدام ملف التعليمات نفسه مترجمًا إلى اسم ملف ذلك الوكيل. لاحظ أين تصمد القواعد في النقل وأين لا.
- خذ أسوأ قاعدة *أبقيتها* وحاول جعلها أكثر قابلية للفحص آليًا. الهدف ليس الكمال؛ الهدف أن تشعر بالفرق بين قاعدة يستطيع الوكيل التصرّف فيها وأخرى لا يستطيع.

## ما ينبغي أن يتبقّى معك

ملف `CLAUDE.md` كنت تتمنّى فعلًا أن يقرأه الوكيل. أقصر من الذي بدأت به. أكثر حسمًا. كل سطر يستحقّ مكانه لأنه شيء يفعله الوكيل، لا شيء *يكون* عليه الوكيل.

سنعود إلى هذا الملف في كل درس تقريبًا من هنا. وبحلول نهاية اليوم، سيكون فيه قواعد من محدّدات [Playwright](https://playwright.dev/) والانتظار (راجع [تسلسل المحدّدات الهرمي](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy) و[حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story))، و[التدقيق وكشف الشيفرة الميتة](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails)، و[أمر التكامل المستمر المعتمد](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort). وإعادة الكتابة التي تجريها اليوم هي العمود الذي يتعلّق به بقيّة اليوم.

## قراءات إضافية

- [الحل](https://stevekinney.com/courses/self-testing-ai-agents/rewrite-the-bad-claude-md-solution)
- [تعليمات تربط الوكيل بالحلقة](https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in)
- [الفرضية](https://stevekinney.com/courses/self-testing-ai-agents/the-hypothesis)
