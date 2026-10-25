---
title: "مختبر"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-the-static-layer-into-shelf"
---

أطول مختبرات اليوم. متعدّد الأجزاء. وزّع وتيرتك—كل جزء فحص مكتفٍ بذاته، ويمكنك التوقف بين الأجزاء إن احتجت.

> **في النسخة الأولية الحالية**
>
> صار Shelf يبدأ أصغر عن قصد. فالنسخة الأولية تحتوي بالفعل على ESLint وTypeScript وحلقة Playwright الدنيا، لكنها **لا** تشحن `knip.json` ولا `lefthook.yml` ولا `.gitleaks.toml` ولا `scripts/run-gitleaks-staged.ts`. هذا المختبر هو حيث تضيف تلك الملفات ثم تتحقّق من كل واحد منها مقابل مدخل سيئ مزروع.

## المهمة

ابنِ الطبقة الثابتة الكاملة لـ Shelf وتحقّق من أن كل قطعة تنطلق عند مدخل سيئ مزروع. ولكل جزء: أضف الملف أو وسّعه، ثم أعد قراءة القاعدة التي أنشأتها للتو، ثم أشعل المجسّ وراقبه يلتقط.

## ما يمكنك التحقّق منه محليًا

كل شيء في الأجزاء من الأول إلى الخامس محلي وآلي: وسّع `eslint.config.js` و`tsconfig.json`، وأنشئ `knip.json` و`lefthook.yml` و`.gitleaks.toml` و`scripts/run-gitleaks-staged.ts`، وشغّل `npm run lint` و`npm run typecheck` و`npm run knip` و`npm run test` و`npm run pre-push`، وازرع مدخلًا سيئًا واحدًا في كل مرة، ثم راقب الطبقة الصحيحة تفشل. والجزء السادس محلي أيضًا إن كنت تحدّث `CLAUDE.md` الخاص بك أو ملف إرشادات Codex.

## ما يبقى يدويًا أو خارجيًا

الجزء غير الآلي الوحيد هو الحكم على سلوك الوكيل في النهاية. فالمطالبة الأخيرة موجودة لاختبار ما إن كانت الإرشادات والطبقة الثابتة قوية بما يكفي ليقرأ الوكيل الخطأ ويصلح الشيفرة ويعيد تشغيل الفحوص دون تدريب. وإن قرّرت فتح طلب سحب بعد ذلك، فاعتبره متابعة مستضافة اختيارية، لا شرطًا لإكمال المختبر محليًا.

## الجزء الأول: قواعد ESLint المخصّصة

افتح `eslint.config.js`. وابحث عن كتلة `no-restricted-syntax`. إنها تحظر أربعة أنماط:

- `page.waitForTimeout` (في أي مكان داخل `tests/end-to-end/`). المحدِّد: `CallExpression[callee.property.name='waitForTimeout']`. الرسالة: `"page.waitForTimeout is banned. See CLAUDE.md → Playwright → Waiting."`
- `page.locator` المستدعاة بوسيط نصي (في أي مكان داخل `tests/end-to-end/`). المحدِّد: `CallExpression[callee.property.name='locator'][arguments.0.type='Literal']`. الرسالة: `"Use a getByRole/getByLabel locator. See CLAUDE.md → Playwright → Locators."`
- `page.waitForLoadState('networkidle')` (في أي مكان). المحدِّد: `CallExpression[callee.property.name='waitForLoadState'] Literal[value='networkidle']`. الرسالة: `"networkidle is unreliable. Wait on a real signal."`
- قراءة `userId` من جسم الطلب في معالج مسار. المحدِّد: `MemberExpression[object.type='MemberExpression'][object.property.name='body'][property.name='userId']`. الرسالة: `"Read userId from the session, not the request body. See CLAUDE.md → Auth."`

لكل قاعدة `selector` و`message`. ونصوص الرسائل تؤدّي دورًا حاسمًا — فهي تسمّي الملف والقسم والإصلاح. وذلك هو الفرق بين خطأ lint يتجاهله الوكيل وخطأ lint يقرأه الوكيل ويتصرّف بناءً عليه.

قسم **كتابة قاعدة `no-restricted-syntax`** في درس [Lint والأنواع كحواجز حماية](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails) يشرح كل واحد من هذه المحدّدات الأربعة لشجرة النحو المجرّدة (AST) شرحًا نثريًا مفصّلًا. اقرأه إلى جانب الملف الذي تبنيه هنا كي تفهم *لماذا* تستخدم قاعدة `body.userId` مطابقة `MemberExpression` متداخلة بدلًا من اسم خاصية فقط، ولماذا تستخدم قاعدة `networkidle` مُركِّب السليل.

> **ملاحظة**
>
> في مستودع ورشة Shelf، `npm` هو مصدر الحقيقة. فإن كان مشروعك يستخدم Bun، فأعد صياغة الأوامر إلى `bun` كما يليق. المهم أن تكون الفحوص سكربتات حقيقية مسمّاة يُلزَم الوكيل بتشغيلها.

### معايير قبول الجزء الأول

- أن يحتوي `eslint.config.js` على قواعد النحو المقيّد الأربع أعلاه (محدِّد + رسالة).
- أن ينتهي `npm run lint` على مستودع Shelf الحالي (النظيف) بالرمز صفر.
- أن يجعل إضافة سطر `page.waitForTimeout(1000)` إلى أي ملف تحت `tests/end-to-end/` الأمرَ `npm run lint` ينتهي برمز غير صفري، وأن يحتوي الناتج على السلسلة الفرعية `page.waitForTimeout is banned`.
- أن يجعل إضافة سطر `page.locator('.foo')` إلى أي ملف تحت `tests/end-to-end/` الأمرَ `npm run lint` ينتهي برمز غير صفري، وأن يحتوي الناتج على السلسلة الفرعية `Use a getByRole/getByLabel locator`.
- أن يعيد التراجع عن تغييرات الاختبار نظافة lint (`npm run lint` ينتهي بالرمز صفر).

## الجزء الثاني: الوضع الصارم في TypeScript

افتح `tsconfig.json`. وابحث عن كل راية صرامة من الدرس—`strict: true`، و`noUncheckedIndexedAccess`، و`exactOptionalPropertyTypes`، و`noUnusedLocals`، و`noUnusedParameters`، و`noImplicitReturns`، و`noFallthroughCasesInSwitch`. كلها موجودة هناك. اقرأ كل واحدة وتأكّد أنك تستطيع أن تشرح في جملة واحدة أي صنف من الأخطاء تلتقطه، وأي صنف كان `strict: true` وحده سيفوته.

### معايير قبول الجزء الثاني

- `tsconfig.json` يحوي `strict: true`.
- `tsconfig.json` يفعّل صراحةً `noUncheckedIndexedAccess` و`exactOptionalPropertyTypes` و`noUnusedLocals` و`noUnusedParameters`.
- `npm run typecheck` ينتهي بالرمز صفر على شيفرة Shelf الحالية.
- إضافة `const x: string = items[0]` (بلا حارس) إلى أي ملف تنتج خطأ في فحص الأنواع.

## الجزء الثالث: كشف الشيفرة الميتة

أنشئ `knip.json`. اضبط أنماط glob في `entry` و`project` كي يعرف knip أي الملفات تُعدّ جذورًا (صفحات SvelteKit والاختبارات والسكربتات) وأي الملفات داخل نطاق تحليل التصديرات غير المستخدمة. ثم شغّل `npm run knip` لتراه يبلّغ عن صفر نتائج على المستودع الحالي.

> **ملاحظة**
>
> في نسخة Shelf الأولية الحالية، يستطيع `drizzle.config.ts` أن يعود بالفعل إلى `file:./local.db`، فقد لا تحتاج إلى غلاف `DATABASE_URL=...` إضافي أصلًا. وإن كانت تهيئة مشروعك تنهار بدونه، فأضف عنوان قاعدة بيانات عابرًا في السكربت هناك. المقصود من المختبر هو حلقة الشيفرة الميتة، لا الألعاب البهلوانية مع متغيّرات البيئة.

### معايير قبول الجزء الثالث

- `knip.json` موجود بأنماط `entry` و`project` معقولة.
- `npm run knip` ينتهي بالرمز صفر على مستودع Shelf الحالي.
- إضافة ملف `.ts` غير مُشار إليه تحت `src/lib/` تجعل `npm run knip` يبلّغ عنه كغير مستخدم.
- حذف الملف يعيد ناتج knip نظيفًا.
- إن كان مستودعك ما يزال يحوي شجرة متقاعدة مثل `src/lib/legacy-auth/`، فهي متجاهلة صراحةً. وإن لم تحوِ نسختك المحلية من Shelf ذلك المجلد، فلا تخترعه لمجرد إرضاء المختبر.

## الجزء الرابع: Lefthook

أنشئ `lefthook.yml`. وأضف كتلتي `pre-commit` و`pre-push`. ينبغي أن يشغّل pre-commit فحوصًا سريعة على `{staged_files}` مع `parallel: true` و`stage_fixed: true`، بينما يشغّل pre-push سكربت `npm run pre-push` الأبطأ قليلًا (الذي ينادي فحص الأنواع وknip واختبارات الوحدة) على الشجرة كلها. اقرأ درس [خطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook) إن أردت المنطق وراء هذا التقسيم.

### معايير قبول الجزء الرابع

- `lefthook.yml` موجود في جذر المستودع.
- `pre-commit` يشغّل ESLint وPrettier وفحص أسرار على `{staged_files}`، وكلها معلّمة `parallel: true`، وأي ملفات صُحّحت تلقائيًا يُعاد ترحيلها عبر `stage_fixed: true`.
- `pre-push` يشغّل `npm run pre-push`، الذي يشغّل بدوره على الأقل `npm run typecheck` و`npm run knip`.
- إجراء تغيير فيه خطأ lint ثم تشغيل `lefthook run pre-commit` يُجهض الالتزام مع ظهور خطأ lint.
- المشكلات القابلة للتصحيح التلقائي (التنسيق) تُصحَّح وتُعاد مرحلتها تلقائيًا.

## الجزء الخامس: فحص الأسرار

أضف أمر `secrets` تحت `pre-commit` في `lefthook.yml` بحيث يستدعي `npx tsx scripts/run-gitleaks-staged.ts`. ثم أعد قراءة ذلك السكربت وتأكّد من أنه يجسّد الفهرس المرحّل في مجلد مؤقت قبل تشغيل `gitleaks dir`.

أنشئ ملف طُعم صغيرًا مثل `sample-config.json` أثناء المختبر كي يكون لديك إيجابية كاذبة غير ضارّة واحدة تُدرجها في قائمة السماح عن قصد. وفي نسخة Shelf الأولية الحالية، يُعدّ `tests/data/users.json` مرشّحًا آخر متعمّدًا لقائمة السماح، لأنه يخزّن بيانات اعتماد ورشة وهمية تعتمد عليها مختبرات الزرع.

> **ملاحظة**
>
> مع إصدار Gitleaks الحالي المستخدم في هذه الورشة، لم يكن `gitleaks git --staged` مُتحقِّقًا موثوقًا قبل الالتزام للملفات المضافة حديثًا. يعالج مستودع Shelf المحلي ذلك بتجسيد فهرس git الدقيق في مجلد مؤقت وتشغيل `gitleaks dir` هناك من `scripts/run-gitleaks-staged.ts`. وذلك الغلاف هو ما يستدعيه أمر `secrets` في lefthook.

### معايير قبول الجزء الخامس

- `gitleaks version` يعمل على جهازك.
- `lefthook.yml` يحوي أمر `secrets` تحت `pre-commit` يستدعي `npx tsx scripts/run-gitleaks-staged.ts`.
- `.gitleaks.toml` يدرج `sample-config.json` و`tests/data/users.json` في قائمة السماح (أو `tests/data/` إن كنت تفضّل قاعدة على مستوى المجلد).
- تشغيل سكربت اللقطة المرحّلة مباشرةً (`npx tsx scripts/run-gitleaks-staged.ts`) ينتهي بالرمز صفر لحالة الفهرس المرحّل النظيفة.
- محاولة ترحيل ملف يحوي `BETTER_AUTH_SECRET="7Xse4XqnSo3hcT31Yb2vi7LMt6BYI93w.0EWmIcjHKAdde1SY5TEVqh5fPu6NvFBf"` تُطلق الخطّاف وتحجب الالتزام.
- يبقى ملف `sample-config.json` قابلًا للالتزام دون مشكلة (قائمة السماح تعمل).

## الجزء السادس: تحديث `CLAUDE.md`

أضف إلى `CLAUDE.md` أقسامًا تعكس كل طبقة ربطتها. على الأقل:

- قسم «الفحوص الثابتة» يسرد `npm run lint` و`npm run typecheck` و`npm run knip` كأوامر إلزامية قبل إعلان الإنجاز.
- في نسخة Shelf الأولية، «منجَز» لا تعني إلا `npm run typecheck` و`npm run lint` و`npm run test`. هذا المختبر هو حيث توسّع ذلك التعريف ليشمل `npm run knip` و`npm run pre-push`.
- قواعد بشأن `@ts-expect-error` و`eslint-disable` و`--no-verify`.
- قسم أسرار وفق درس gitleaks.
- إحالة راجعة إلى قواعد Playwright ([المحددات](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy)، و[الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)، و[المصادقة](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)) بحيث تُربط قواعد lint المخصّصة بمصدر الحقيقة نفسه.

### معايير قبول الجزء السادس

- `CLAUDE.md` يسرد كل أوامر الفحوص الثابتة تحت عنوان «ماذا يعني منجَز».
- `CLAUDE.md` يحظر صراحةً التجاوز عبر `@ts-expect-error` أو `eslint-disable` أو `--no-verify`.
- الأقسام تُحيل إلى بعضها حيث تتداخل القواعد (مثلًا قاعدة lint الخاصة بـ`waitForTimeout` تشير إلى المصدر نفسه الذي تشير إليه قواعد الانتظار في Playwright).
- ما يزال `wc -l CLAUDE.md` يبلّغ عن رقم أقل من 150. (سيكبر؛ لا بأس. فقط لا تدعه يصير رواية.)

## التحقق من طرف إلى طرف

حين تكون كل طبقة في مكانها، سلّم الوكيل مطالبة واحدة تمرّنها كلها:

> أضف مسارًا جديدًا `/shelf/export` يتيح للمستخدم تنزيل رفّه كملف JSON. وأضف اختبار Playwright له. وشغّل كل الفحوص الثابتة والاختبارات قبل أن تعلن الإنجاز.

راقب ما يفعله الوكيل. السلوك الصحيح هو:

1. يكتب معالج المسار.
2. يكتب اختبار Playwright.
3. يشغّل `npm run lint` و`npm run typecheck` و`npm run knip` و`npm run test` و`npm run pre-push` (الذي يغطّي اختبارات الوحدة).
4. إن فشل أي منها، يقرأ الخطأ ويصلحه ويعيد التشغيل.
5. لا يستخدم `page.waitForTimeout`، ولا يستخدم `page.locator` بمحدّد CSS، ولا يستخدم تسجيل دخول عبر الواجهة، ولا يقرأ `userId` من جسم الطلب، ولا يترك شيفرة ميتة خلفه.

إن فعل الوكيل أيًّا من الأمور المحظورة، فاذهب وانظر لماذا لم تلتقطه الطبقة الثابتة. تلك هي الفجوة.

## معايير القبول النهائية

- اكتملت المطالبة من طرف إلى طرف أعلاه مع تشغيل الوكيل `npm run lint` و`npm run typecheck` و`npm run knip` و`npm run test` و`npm run pre-push` دون تذكير.
- لم يصل أي نمط محظور إلى الشيفرة النهائية.
- إن فتحت طلب سحب، فهو نظيف.
- كل مربّع اختيار في الأجزاء من الأول إلى السادس مؤشَّر.

## أهداف إضافية

- أضف خطّاف `PostToolUse` خاصًا بـClaude يشغّل `npm run lint -- --quiet` بعد كل تعديل، وفق درس خطّافات Claude.
- أضف إلى pre-push سكربتًا مثبّتًا لعدّ knip يفشل إن ارتفع عدد غير المستخدم عن خط أساس مُودَع (نمط السقّاطة).
- هيّئ dependency-cruiser بقاعدة `no-orphans`، وقاعدة `legacy-auth` إن كان مستودعك ما يزال يحمل تلك الحدود، وشغّله في pre-push.
- اكتب تقريرًا صغيرًا في نهاية المختبر: أي طبقة التقطت ماذا، وأي طبقة لم تنطلق قط. الطبقات التي لم تنطلق قط قد تكون متراخية أكثر من اللازم (أو قد تكون تعمل جيدًا لدرجة أنه لا شيء لتفعله).

## الشيء الوحيد الذي يجب تذكّره

الطبقة الثابتة خمس أدوات وساعة من الإعداد. كل واحدة منها تعمل تحت كل ما عداها، وتلتقط صنفًا محدّدًا من الأخطاء في اللحظة الأرخص ممكنة، وتتراكم مع الأخريات. في نهاية هذا المختبر، يعمل الوكيل تحت شبكة تغذية راجعة محكمة لدرجة أن معظم الأخطاء لا تستطيع البقاء طويلًا بما يكفي لتصل إلى الاختبارات التي أمضينا الصباح في بنائها.

## قراءات إضافية

- [الحل](https://stevekinney.com/courses/self-testing-ai-agents/wire-the-static-layer-into-shelf-solution)
- [الطبقة الثابتة كطبقة أساس](https://stevekinney.com/courses/self-testing-ai-agents/the-static-layer-as-underlayment)
- [Lint والأنواع كحواجز حماية](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails)
- [كشف الشيفرة الميتة](https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection)
- [خطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook)
- [فحص الأسرار باستخدام Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks)
