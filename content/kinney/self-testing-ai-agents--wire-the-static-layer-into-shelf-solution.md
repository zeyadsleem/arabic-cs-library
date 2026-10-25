---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/wire-the-static-layer-into-shelf-solution"
---

هذا أطول مختبر وأطول حل. مشروع Shelf الأولي الحالي أصغر عمدًا، لذا هذا الحل هو النسخة القابلة للنسخ من الطبقة الساكنة التي تضيفها أثناء المختبر. سأستعرض كل جزء بالترتيب، وأعرض الملف الذي يجب إنشاؤه أو توسيعه، وأشرح السبب، وأعطيك الأوامر التي تثبت أنه يعمل.

## ما يجب إضافته

### الجزء 1: قواعد ESLint المخصصة

افتح `eslint.config.js`. بعد كتل إعداد Svelte/TypeScript/Prettier القياسية، توجد كتلتان من `no-restricted-syntax`.

الكتلة الأولى تُطبَّق عالميًا — على كل ملف في المشروع:

```javascript
{
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.property.name='waitForLoadState'] > Literal[value='networkidle']",
        message: 'networkidle is unreliable. Wait on a real signal.'
      },
      {
        selector:
          "MemberExpression[object.type='MemberExpression'][object.property.name='body'][property.name='userId']",
        message: 'Read userId from the session, not the request body. See CLAUDE.md → Auth.'
      }
    ]
  }
}
```

تستخدم قاعدة `networkidle` المُركِّب الابني (`>`) لمطابقة عقدة `Literal` قيمتها `'networkidle'` وتكون وسيطًا مباشرًا لـ `waitForLoadState`. أما قاعدة `userId` فتستخدم مطابقة `MemberExpression` متداخلة — `body.userId` — لأن فحص اسم خاصية بسيط على `userId` سيُفعَّل مع كل كائن يصادف أن لديه حقل `userId`. التداخل يقول «تحديدًا `something.body.userId`»، وهذا هو شكل القراءة من جسم طلب مُحلَّل.

الكتلة الثانية محصورة في `tests/end-to-end/**/*.ts` فقط:

```javascript
{
  files: ['tests/end-to-end/**/*.ts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.property.name='waitForTimeout']",
        message: 'page.waitForTimeout is banned. See CLAUDE.md → Playwright → Waiting.'
      },
      {
        selector: "CallExpression[callee.property.name='locator'][arguments.0.type='Literal']",
        message: 'Use a getByRole/getByLabel locator. See CLAUDE.md → Playwright → Locators.'
      },
      {
        selector:
          "CallExpression[callee.property.name='waitForLoadState'] > Literal[value='networkidle']",
        message: 'networkidle is unreliable. Wait on a real signal.'
      }
    ]
  }
}
```

إن حظر `waitForTimeout` واستدعاء `locator()` الخام لا ينطبق إلا على ملفات اختبارات من طرف إلى طرف. فحظر `waitForTimeout` في شيفرة التطبيق سيكون مبالغة — فهناك استخدامات مشروعة لـ `setTimeout` في منطق التطبيق. لكن في ملفات الاختبار، كل `waitForTimeout` هو تقلّب ينتظر أن يحدث، وكل `page.locator('.some-class')` خام هو محدِّد هشّ ينبغي أن يكون `getByRole` أو `getByLabel`.

تظهر قاعدة `networkidle` في *كلتا* الكتلتين. وهذا متعمد: فالكتلة العالمية تلتقط معالجات المسارات أو شيفرة الأدوات المساعدة التي قد تستدعي `waitForLoadState`، والكتلة المحصورة تضمن ألا تحجب كتلة القواعد الخاصة بالاختبارات الكتلة العالمية عن غير قصد. فقاعدة `no-restricted-syntax` في ESLint تستبدل القاعدة بأكملها عندما يعيد إعداد محصور تعريفها، لذا يجب أن تعيد كتلة الاختبار تضمين الأنماط التي تريد الاحتفاظ بها.

**التحقق:**

```bash
# Clean baseline
npm run lint

# Prove waitForTimeout fires
echo "page.waitForTimeout(1000);" >> tests/smoke.spec.ts
npm run lint 2>&1 | grep "waitForTimeout is banned"
git checkout tests/smoke.spec.ts
```

### الجزء 2: الوضع الصارم في TypeScript

افتح `tsconfig.json`. كتلة `compilerOptions`:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

`strict: true` هو المظلة — فهو يفعّل `strictNullChecks` و`strictFunctionTypes` و`strictBindCallApply` و`strictPropertyInitialization` و`noImplicitAny` و`noImplicitThis` و`alwaysStrict` و`strictBuiltinIteratorReturn` و`useUnknownInCatchVariables`. أما الأعلام الستة المذكورة بعده فليست *مشمولة* في `strict` ويجب تفعيلها فرادى.

`noUncheckedIndexedAccess` هو العلم الذي يغيّر حياتك اليومية أكثر من غيره. فبتفعيله، يصبح نوع `items[0]` هو `T | undefined` بدلًا من `T`. وكل وصول إلى فهرس مصفوفة أو قوس كائن يجبرك على التعامل مع الحالة المفقودة. إنه مزعج في الساعة الأولى ثم يلتقط خطأً حقيقيًا، ولن تعطّله بعدها أبدًا.

`exactOptionalPropertyTypes` أكثر صرامة مما تكلف به معظم المشاريع. فهو يعني أن `{ x?: string }` يسمح بـ `undefined` *فقط* عندما يكون المفتاح غائبًا — فلا يمكنك تعيين `x: undefined` صراحةً. إن كانت الشيفرة القائمة تُصرَّف بنظافة مع هذا العلم، فأبقه مفعّلًا. وإن لم يكن مشروعك كذلك، فهو العلم الوحيد في هذه القائمة الذي يستحق التأجيل.

**التحقق:**

```bash
npm run typecheck
```

### الجزء 3: كشف الشيفرة الميتة باستخدام knip

افتح `knip.json`:

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": [
    "src/app.html",
    "src/routes/**/+*.{ts,svelte}",
    "tests/**/*.{test,spec}.ts",
    "tests/helpers/*.ts",
    "scripts/*.{ts,mjs}"
  ],
  "project": ["src/**/*.{ts,svelte,svelte.ts}", "tests/**/*.ts", "scripts/**/*.{ts,mjs}"],
  "ignoreDependencies": ["@tailwindcss/forms", "@tailwindcss/typography", "tailwindcss"]
}
```

مصفوفة `entry` تخبر knip من أين يبدأ التنفيذ — ملفات مسارات SvelteKit (`+page.ts` و`+server.ts` و`+layout.ts`)، وملفات الاختبار، والملفات المساعدة، والسكربتات. وكل ما يمكن الوصول إليه من نقاط الدخول هذه يُعدّ «مستخدمًا». وكل ما هو في أنماط `project` و*لا* يمكن الوصول إليه هو شيفرة ميتة. إن أضفت مختبرات لاحقة مثل التهيئة الموثّقة أو خادم MCP مخصص، فوسّع هذه الأنماط حينها بدلًا من شحنها في المشروع الأولي.

تتعامل مصفوفة `ignoreDependencies` مع Tailwind. فـ Tailwind v4 يستخدم توجيهات `@import` في CSS لجلب إضافاته، لا استيرادات JavaScript، لذا لا يستطيع knip تتبّع سلسلة الاعتماديات. وبدون قائمة التجاهل، يبلّغ knip عن `tailwindcss` و`@tailwindcss/forms` و`@tailwindcss/typography` كاعتماديات غير مستخدمة في كل تشغيل.

**التحقق:**

```bash
npm run knip
```

### الجزء 4: Lefthook

ملف واحد. افتح `lefthook.yml` في جذر المستودع:

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{ts,svelte,js,mjs,cjs}'
      run: npx eslint --fix --max-warnings=0 {staged_files}
      stage_fixed: true
    format:
      glob: '*.{ts,svelte,js,mjs,cjs,json,md,yml,yaml,css}'
      run: npx prettier --write {staged_files}
      stage_fixed: true
    secrets:
      run: npx tsx scripts/run-gitleaks-staged.ts

pre-push:
  commands:
    checks:
      run: npm run pre-push
```

تشغّل كتلة `pre-commit` ثلاثة أوامر على التوازي. فأمر `lint` يوسّع `{staged_files}` إلى الملفات المرحّلة المطابقة لـ `glob` ويسلّمها إلى ESLint مع `--fix --max-warnings=0` — فتُصحَّح المشكلات القابلة للإصلاح التلقائي، ويتحول أي تحذير متبقٍّ إلى خطأ. وأمر `format` يفعل الشيء نفسه مع Prettier، عبر نمط أوسع يغطي أيضًا JSON وMarkdown وYAML وCSS. ويستخدم الأمران `stage_fixed: true`، الذي يعيد ترحيل كل ما غيّرته أدوات الإصلاح التلقائي. وأمر `secrets` يشغّل غلاف gitleaks الذي نتناوله في الجزء 5 — وهو غير محصور بـ `glob` عمدًا لأن الغلاف يعيد سرد الفهرس المرحّل بنفسه وسيُربك بقائمة وسائط مُصفّاة مسبقًا.

كتلة `pre-push` تستدعي `npm run pre-push`، الذي يضيفه هذا المختبر للتحقق المحلي: `npm run typecheck && npm run knip && npm run test:unit`. والترتيب مهم — فحص الأنواع هو الأرخص، ثم knip، ثم اختبارات الوحدة أخيرًا. فإن فشل فحص الأنواع، فلن يعمل knip ولا الاختبارات أبدًا.

المشروع الأولي الأدنى لا يوصّل `lefthook install` بـ `prepare`. بعد إضافة `lefthook.yml`، شغّل `npx lefthook install` مرة واحدة محليًا، ثم قرّر إن كنت تريد طيّ خطوة التثبيت تلك في `prepare` لمشروعك.

**التحقق:**

```bash
# Prove pre-commit fires (from repo root, against whatever you have staged)
npx lefthook run pre-commit

# Prove pre-push fires
npx lefthook run pre-push
```

### الجزء 5: فحص الأسرار باستخدام gitleaks

افتح `scripts/run-gitleaks-staged.ts`. بحسب إصدار gitleaks المثبّت لديك، قد يفوت `gitleaks git --staged` الملفات المضافة حديثًا؛ وهذا السكربت الغلافي يزيل ذلك الغموض. فهو يُجسّد فهرس git المرحّل في دليل مؤقت، ويشغّل `gitleaks dir` عليه، ثم ينظّف.

يفعل السكربت أربعة أشياء:

يسرد الملفات المرحّلة باستخدام `git diff --cached --name-only --diff-filter=ACM -z`. ويستخدم علم `-z` بايتات فارغة كفواصل حتى لا تُفسد أسماء الملفات التي تحتوي مسافات التحليل. ويحدّ `--diff-filter=ACM` على الملفات المضافة والمنسوخة والمعدّلة — فالملفات المحذوفة لا تهمّ في فحص الأسرار.

ولكل ملف مرحّل، يستخرج المحتوى المرحّل بالضبط بـ `git show :<path>` ويكتبه في الدليل المؤقت. هذه هي النسخة المرحّلة، لا نسخة شجرة العمل — فإن كنت قد رحّلت ملفًا نظيفًا ثم لوّثته في محررك، فإن الفحص يرى النسخة النظيفة. وهذا هو السلوك الصحيح لخطاف ما قبل الإيداع.

ويحلّ مسار برنامج `gitleaks` بـ `which`. فإن لم يكن gitleaks مثبّتًا، طبع تحذيرًا وخرج بالرمز صفر. وهذا خيار متعمد: فالأداة المفقودة لا ينبغي أن تعيق التطوير، لكن ينبغي أن تكون صاخبة بشأن الفجوة. وفي CI، يُثبَّت gitleaks صراحةً، لذا لا يُفعَّل مسار التحذير إلا على أجهزة المطورين التي لم تشغّل `brew install gitleaks`.

ويشغّل `gitleaks dir <temp-dir> --redact` مع إعداد `.gitleaks.toml` إن وُجد. ويضمن علم `--redact` أنه إن عُثر على سرّ، فإن مخرجات الخطأ لا تردّد السرّ نفسه في الطرفية.

أمر `secrets` في `lefthook.yml` يستدعي هذا السكربت كبوابة ما قبل الإيداع الأخيرة:

```yaml
secrets:
  run: npx tsx scripts/run-gitleaks-staged.ts
```

لاحظ الغياب المتعمد لحقل `glob`. فالسكربت الغلافي يعيد تعداد الفهرس المرحّل بنفسه، لذا فإن تسليمه قائمة `{staged_files}` مُصفّاة مسبقًا سيضاعف التصفية. دع السكربت يقوم بسرده الخاص.

**التحقق:**

```bash
# Gitleaks is installed
gitleaks version

# Clean staged state passes
npx tsx scripts/run-gitleaks-staged.ts

# A real secret is caught (stage a file with a secret-shaped string, run the script, unstage)
```

### الجزء 6: تحديث CLAUDE.md

ملف `CLAUDE.md` الأولي في Shelf يسرد فقط حلقة المشروع الأولي الأصغر: `npm run typecheck` و`npm run lint` و`npm run test`. وهذا المختبر هو حيث توسّعه. أضف أقسام الطبقة الساكنة الآن: سمِّ `knip.json` و`lefthook.yml` و`.gitleaks.toml` و`scripts/run-gitleaks-staged.ts` صراحةً، وأضف `npm run knip` / `npm run pre-push` إلى قصة «تم»، وأبقِ قسم «لا تفعل» يحظر `@ts-expect-error` و`eslint-disable` و`--no-verify`.

## ما لا يزال عليك تشغيله

كل أمر تحقق، جزءًا بجزء:

```bash
# Part 1: ESLint
npm run lint

# Part 2: TypeScript
npm run typecheck

# Part 3: Knip
npm run knip

# Part 4: Lefthook
npx lefthook run pre-commit
npx lefthook run pre-push

# Part 5: Gitleaks
gitleaks version
npx tsx scripts/run-gitleaks-staged.ts

# Part 6: CLAUDE.md
wc -l CLAUDE.md
grep -c 'typecheck\|lint\|knip' CLAUDE.md
grep -c '@ts-expect-error\|eslint-disable\|no-verify' CLAUDE.md
```

والفحص الكامل للمنظومة الذي تتطلبه معايير القبول النهائية للمختبر:

```bash
npm run typecheck && npm run lint && npm run knip && npm run test
```

يجب أن تخرج الأربعة جميعًا بالرمز صفر بمجرد أن تنتهي من مرور الطبقة الساكنة.

## أنماط تستحق الاحتفاظ بها

- **رمّز القرارات كقواعد، لا كتعليقات.** محدِّد ESLint الذي يحظر `waitForTimeout` يُفعَّل عند كل حفظ. أما تعليق في `CLAUDE.md` يقول «لا تستخدم `waitForTimeout`» فيُفعَّل عندما يصادف أن يقرأه الوكيل. كلاهما مفيد. لكن قاعدة التحقق النصي *موثوقة*.
- **حدّد نطاق الحظر.** قاعدة `waitForTimeout` تنطبق على ملفات الاختبار فقط. وقاعدة `networkidle` تنطبق عالميًا. وقاعدة `userId` تنطبق عالميًا. فكل حظر محصور حيث يكون النمط خطيرًا فعلًا، لا حيث يكون ممكنًا نظريًا.
- **الوضع الصارم سقّاطة تمنع التراجع.** بمجرد تفعيل `noUncheckedIndexedAccess` وتصريف قاعدة الشيفرة بنظافة، يرث كل مساهم مستقبلي ذلك القيد دون أن يعرف أنه كان خيارًا متعمدًا. العلم *هو* التوثيق.
- **كشف الشيفرة الميتة يلتقط ما يتركه الوكيل خلفه.** يكتب الوكلاء شيفرة، ثم يدركون أنهم يحتاجون إلى نهج مختلف، فيتركون المحاولة الأولى في مكانها. knip يجدها. وبدون knip، تتراكم الأدوات المهجورة حتى يلاحظ أحدهم أن رسم الاستيرادات فوضوي.
- **الخطافات تأمين رخيص.** كتلة ما قبل الإيداع في Lefthook تعمل في أقل من ثانيتين في إيداع نموذجي — ESLint وPrettier وفحص الأسرار كلها تعمل على التوازي على الملفات المرحّلة. ويضيف خطاف ما قبل الدفع نحو خمس عشرة ثانية لفحص الأنواع وknip واختبارات الوحدة. والتكلفة ضئيلة. أما البديل — اكتشاف خطأ التحقق النصي في CI بعد عشر دقائق — فليس كذلك.
- **سكربت gitleaks حل وسط عملي.** تجسيد الفهرس المرحّل في دليل مؤقت أكثر موثوقية من أي من أعلام الملفات المرحّلة التي قدّمها gitleaks عبر الإصدارات. وعندما يستقر سلوك المنبع، يمكنك التبسيط. وحتى ذلك الحين، السكربت يعمل.

## قراءات إضافية

- [مختبر: توصيل الطبقة الساكنة بـ Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-the-static-layer-into-shelf)
- [الطبقة الساكنة كطبقة أساس](https://stevekinney.com/courses/self-testing-ai-agents/the-static-layer-as-underlayment)
- [التحقق النصي والأنواع كحواجز](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails)
- [كشف الشيفرة الميتة](https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection)
- [خطافات Git باستخدام Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook)
- [فحص الأسرار باستخدام Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks)
