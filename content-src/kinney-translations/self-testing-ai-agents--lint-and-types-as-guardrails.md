---
title: "Lint والأنواع كقضبان حماية"
---

إعداد [ESLint](https://eslint.org/) الموصى به جيد. و[الوضع الصارم](https://www.typescriptlang.org/tsconfig/#strict) في [TypeScript](https://www.typescriptlang.org/) جيد. إن لم تفعل شيئًا آخر، فشغّل كليهما وستكون قد أغلقت الباب أمام فئات كاملة من أخطاء الوكيل. لن أضيع وقتًا في تبرير أي منهما — إن كنت هنا فأنت تؤمن بهما أصلًا.

ما أريد الحديث عنه هو القواعد *التي تتجاوز* الافتراضات: تلك التي تكتبها لأن لقاعدة شيفرتك أنماط فشل خاصة بها، ولأن الوكيل يظل يرتكب الخطأ نفسه حتى تصرخ فيه قاعدة lint.

## عقلية القاعدة المخصصة

كل قاعدة من صباح اليوم مرشحة لأن تكون قاعدة lint. هذا هو الإطار.

- الانتظار: `page.waitForTimeout` محظور. افحصه بـlint.
- المحددات: `page.locator` بمحدد CSS غير مستحسن. افحصه بـlint.
- المصادقة: `page.goto('/login')` في ملف اختبار غير إعدادي محظور. افحصه بـlint.
- لقطات الشاشة: إضافة أساس لقطة جديد دون رسالة التزام تذكره أمر مريب. افحصه بـlint.
- معالجات API: قراءة `userId` من جسم الطلب محظورة. افحصها بـlint.
- معالجات المسارات: `catch` الذي يعيد 200 محظور. افحصه بـlint.

ليست كل واحدة من تلك قاعدة lint اليوم. بعضها كذلك. وبعضها يحتاج قاعدة مخصصة. وبعضها يحتاج أداة مختلفة. لكن العقلية هي: *أي شيء أظل أجده في مراجعة الـPR وأستطيع وصفه ميكانيكيًا هو شيء أستطيع فحصه بـlint، وينبغي أن أفعل.*

هذا الطرف الرخيص من حلقة التصحيح الذاتي. كل قاعدة تضيفها خطأ مستقبلي يلتقطه الوكيل ويصلحه دونك.

## قواعد ESLint التي تستحق التفعيل افتراضيًا

قائمة قصيرة بقواعد [ESLint](https://eslint.org/) التي تدفع ثمنها في قاعدة شيفرة يقودها وكيل، فيما يتجاوز ما يغطيه `@eslint/js/recommended` أصلًا:

- [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax)—سكين الجيش السويسري للقواعد المخصصة. استخدمها لحظر `waitForTimeout`، و`networkidle`، و`goto('/login')` في الاختبارات، وأي شيء آخر تستطيع وصفه بمحدد AST.
- `@typescript-eslint/no-floating-promises`—كل وعد غير مُنتظَر في شيفرة وكيل هو حالة تسابق تنتظر الحدوث. خطأ صارم.
- `@typescript-eslint/no-misused-promises`—استخدام `await` في سياق منطقي، أو تمرير دالة غير متزامنة إلى دالة رد نداء تتوقّع مزامنة، إلخ. خطأ صارم.
- `@typescript-eslint/strict-boolean-expressions`—تفرض فحوص null صريحة بدلًا من `if (user)`، فتلقط فئة من أخطاء «السلسلة الفارغة كاذبة». تستحق.
- `no-console` مع قائمة سماح لـ`error` و`warn`—يمنع بعثرة `console.log` التي حذّرت منها في [ملفات تشخيص الفشل](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build).
- لدى [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn) مجموعة قواعد ذات رأي تلتقط أخطاء JavaScript الحديثة الدقيقة. لا أفعّل كلها، لكن `prefer-node-protocol` و`no-null` و`error-message` كلها تلتقط أشياء.

قد يختلف نصيبك من الأخيرة حسب ذوق الفريق. الأربع الأولى غير قابلة للتفاوض عندي.

## كتابة قاعدة `no-restricted-syntax`

هذه هي القاعدة التي تستحق بقاءها. تأخذ `no-restricted-syntax` محدد ESLint (لغة استعلام AST صغيرة) وتبلّغ عن أي عقدة تطابقه. تستطيع حظر نداءات دوال محددة، وأنماط محددة، واستخدامات API محددة، دون كتابة إضافة كاملة.

احظر `page.waitForTimeout`:

```javascript
// eslint.config.js
export default [
  {
    files: ['tests/end-to-end/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.property.name='waitForTimeout']",
          message:
            'page.waitForTimeout is banned. Use expect(locator).toBeVisible() or page.waitForResponse instead. See agent rules → Playwright waiting.',
        },
      ],
    },
  },
];
```

لاحظ رسالة الخطأ. فهي تسمّي المخالفة، وتعرض البدائل، وتشير إلى قواعد الوكيل. وحين يتعثّر الوكيل بهذه القاعدة، تكون رسالة الخطأ مطالبة إصلاح قائمة بذاتها — تخبر الوكيل بما يفعله تاليًا. اكتب رسائل lint كأنها مطالبات لأنها *مطالبات*.

الآن مدّ القاعدة نفسها لتحظر بقية أنماط Playwright المضادة التي اصطدمنا بها في [دروس Playwright](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy)، زائد خطأ خادم متكرر — المعالجات التي تسحب `userId` من جسم الطلب بدلًا من الجلسة المُوثَّقة. كل محدد استعلام AST صغير؛ اقرأ تفسيرها تحت كتلة الشيفرة لتبني النموذج الذهني.

```javascript
{
  files: ['tests/end-to-end/**/*.ts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.property.name='waitForTimeout']",
        message: 'page.waitForTimeout is banned. Use expect(locator).toBeVisible() or page.waitForResponse instead. See agent rules → Playwright waiting.',
      },
      {
        selector: "CallExpression[callee.property.name='locator'][arguments.0.type='Literal']",
        message: 'page.locator with a string selector is discouraged. Use page.getByRole, getByLabel, getByText, or getByTestId. See agent rules → Playwright locators.',
      },
      {
        selector: "CallExpression[callee.property.name='waitForLoadState'] Literal[value='networkidle']",
        message: 'page.waitForLoadState("networkidle") is unreliable. Wait on a specific DOM signal or network response instead.',
      },
    ],
  },
},
{
  files: ['src/routes/api/**/*.ts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "MemberExpression[object.type='MemberExpression'][object.property.name='body'][property.name='userId']",
        message: 'Read userId from locals.user, not the request body. Trusting the client on identity is a permission bug.',
      },
    ],
  },
},
```

أربع قواعد، وملف إعداد واحد. وإليك ترجمة كل محدد إلى لغة بشرية مفهومة:

- **`CallExpression[callee.property.name='waitForTimeout']`** يطابق *أي* نداء يكون فيه المُنادي `<something>.waitForTimeout(...)`. جزء `CallExpression` يستهدف نداء دالة. ومرشّح السمة `[callee.property.name='waitForTimeout']` يقول «يجب أن يكون المُنادي تعبير عضو اسم خاصيته `waitForTimeout`». فتحصل على `page.waitForTimeout(100)` وأيضًا `otherPage.waitForTimeout(100)`، وهذا جيد — فكلاهما ينبغي إعادة كتابته بالطريقة نفسها.
- **`CallExpression[callee.property.name='locator'][arguments.0.type='Literal']`** الشكل نفسه، زائد قيد أن الوسيط الأول (`arguments.0`) حرفي نص أو رقم أو regex. وهذا هو شكل «CSS الخام»؛ أما `page.locator(heading)` حيث `heading` متغيّر فيمرّ لأن الوسيط الأول `Identifier` لا `Literal`.
- **`CallExpression[callee.property.name='waitForLoadState'] Literal[value='networkidle']`** يستخدم عامل التركيب *التابع* (المسافة): «اعثر على أي `Literal` قيمته بالضبط السلسلة `networkidle`، في أي مكان داخل نداء `waitForLoadState`». وهكذا تطابق سلسلة *الوسيط* لا اسم الدالة.
- **`MemberExpression[object.type='MemberExpression'][object.property.name='body'][property.name='userId']`** يطابق تعبير عضو متداخلًا من الشكل `<something>.body.userId`. المطابقة الخارجية تستهدف الوصول إلى `.userId`، وقيد `object` يقول إن الشيء الذي يُوصَل إليه يجب أن يكون هو نفسه وصولًا إلى `<x>.body`. فينطلق على `request.body.userId` و`body.userId` وأي شيء آخر بهذا الشكل، بينما يترك `locals.user.id` وحده. والقاعدة تعيش تحت `src/routes/api/**/*.ts` لأن هناك يهمّ الخطأ.

أربع قواعد، وملف إعداد واحد، وكلها تنطلق عند كل حفظ. وفي المرة التالية التي يمدّ فيها الوكيل يده إلى نمط محظور، يضع المحرّر تحته خطًا أحمر ويكون الإصلاح على بعد خطوة.

> **اكتب رسائل قواعد ESLint كأنها مطالبات إصلاح**
>
> كل رسالة خطأ أعلاه تسمّي المخالفة، وتشير إلى البديل، وتذكر قواعد الوكيل. وحين يتعثّر الوكيل بالقاعدة، تكون الرسالة *هي* التعليم التالي في سياقه. تعامل مع هذه الرسائل كما تتعامل مع [ملف تشخيص فشل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build): كلما كانت الرسالة أغنى، قلّ العمل الذي على الوكيل فعله للتعافي.

## القاعدة الصعبة: حظر `any` تدريجيًا

`@typescript-eslint/no-explicit-any` قاعدة أريدها مفعّلة، لكن قلبها إلى `error` في قاعدة شيفرة قائمة انتحار — كل `any` في كل مكان ينفجر دفعة واحدة ويكرهني الفريق. والحل هو التشديد التدريجي.

- ابدأ بـ`@typescript-eslint/no-explicit-any`: `warn`. يرى الوكيل التحذيرات لكنه لا يُحظر.
- اقترنها بـ`@typescript-eslint/no-unsafe-assignment`، و`no-unsafe-member-access`، و`no-unsafe-call` كـ`warn`. فهي تلتقط الآثار *اللاحقة* لـ`any` — حيث يتسرّب `any` إلى شيفرة أخرى.
- ضع قاعدة «الملفات الجديدة» عبر [eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries) أو تجاوز بسيط `files: ['src/new-module/**']` يقلب القواعد إلى `error` في الشيفرة الجديدة.
- تتبّع عدد التحذيرات في CI وارفض دمج طلبات الـPR التي تزيده. أستخدم سكربت `bun run lint --max-warnings=<current-count>` يثبّت العدد.

الأثر: الشيفرة الجديدة مكتوبة بأنواع صارمة، والشيفرة القديمة تُنظّف انتهازيًا، والوكيل — الذي يكتب شيفرة جديدة في الغالب — يرى أخطاء صارمة في عمله لكنه لا يغرق في تحذيرات موجودة سلفًا. هذا هو النمط الذي يتيح تفعيل قواعد صارمة على قاعدة شيفرة من 10,000 ملف دون إحراقها.

## TypeScript: الوضع الصارم، مع الأدلّة

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

`strict: true` يمنحك معظم هذه تلقائيًا. والتي تستحق التسمية صراحة لأنها معطّلة افتراضيًا حتى تحت strict:

- **[`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)**—هذه هي التي تحوّل `array[0]` إلى `T | undefined`. إنها مزعجة. وهي أيضًا القاعدة التي تلتقط «افترض الوكيل أن للمصفوفة عنصرًا عند الفهرس 0 ولم يكن كذلك». أبقِها مفعّلة. وابتلع الإزعاج.
- **`exactOptionalPropertyTypes`**—تميّز بين `{ x?: number }` و`{ x: number | undefined }`، وهو فرق دقيق لكنه يهمّ عقود API.
- **`noUnusedLocals` / `noUnusedParameters`**—تلتقط الاستيرادات الميتة والوسائط المنسية. ومكافأة إضافية: كثيرًا ما تلتقط عمليات إعادة هيكلة نصف مكتوبة حيث أعاد الوكيل تسمية شيء وترك المرجع القديم خلفه.

كل هذه رخيصة التفعيل على قاعدة شيفرة جديدة ومكلفة على قاعدة قديمة. إن كان Shelf جديدًا، ففعّل كل شيء. وإن كان مشروعك الحقيقي أقدم، فاستخدم نمط التشديد التدريجي من قسم `any` أعلاه.

## قواعد الوكيل

قواعد lint لا تساوي شيئًا إن لم يشغّلها الوكيل. حدّث ملف التعليمات:

```markdown
## Static checks

Run these before declaring a task done. They must exit zero:

- `npm run lint`—ESLint with strict custom rules
- `npm run typecheck`—TypeScript strict mode

If lint fails, read the error message. It names the violation, the
file, and the fix. Do not add `eslint-disable` comments to bypass. Do
not change a rule from `error` to `warn`. Fix the code.

If typecheck fails, fix the types. Do not use `any`. Do not use
`@ts-expect-error`. If you truly cannot type something (rare), ask
before silencing.
```

قاعدة «لا تستخدم `@ts-expect-error`» موجودة تحديدًا لمنع مخرج الهروب المفضل لدى الوكيل. حين لا يستطيع وكيل إرضاء TypeScript، سيلجأ افتراضيًا إلى `@ts-expect-error` مع تعليق غامض ويمضي. وذلك انحدار صامت في سلامة أنواعك. احظره على مستوى القواعد.

## ما ينتمي بجانب lint والأنواع في الطبقة الثابتة

Lint والأنواع هما الجزء الخاص بـ*شكل الشيفرة* في الطبقة الثابتة. وهناك فحصان آخران ينتميان إلى المرتبة نفسها رغم أنهما ليسا قواعد ESLint. أذكرهما هنا لتعرف أين يقعان؛ ولكل منهما درسه.

- **كشف الشيفرة الميتة** بـ`knip`. فالملفات اليتيمة التي لم يعد أحد يستوردها نوع محدد من نتائج lint. ويغطي [كشف الشيفرة الميتة](https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection) إعداد `knip.json`.
- **فحص الأسرار** بـ`gitleaks`. هذه تستحق التنبيه لأن مختبر الطبقة الثابتة يتوقع منك ربطها في `lefthook.yml` كأمر `secrets` بجانب أمري ESLint وPrettier، كي يشغّل pre-commit lint والتنسيق وفحص الأسرار بالتوازي. راجع [فحص الأسرار مع Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks) للأمر `secrets` الكامل والسكربت المساعد الذي يفحص اللقطة *المرحّلة* لا شجرة العمل.

لا تحتاج إلى ربطهما بعد — فذلك المختبر. لكن ينبغي أن يكون كلاهما في ذهنك كـ«يعيش بجانب ESLint في حلقة pre-commit» بحلول انتهائك من هذا الدرس.

## الشيء الوحيد الذي يجب تذكّره

افتراضات ESLint أرضية، لا هدف. وكل خطأ وكيل متكرر مرشح لقاعدة مخصصة، و`no-restricted-syntax` معبّرة بما يكفي لتشفير معظمها. اكتب رسائل الخطأ كأنها مطالبات، لأنها أول ما يقرأه الوكيل حين يتعثّر بالقاعدة. والفحوص الثابتة المحكمة تعيد ثمنها فورًا تقريبًا — فهي أرخص وأسرع حلقة تغذية راجعة في المكدّس كله.

## قراءات إضافية

- [الطبقة الثابتة كبطانة أساس](https://stevekinney.com/courses/self-testing-ai-agents/the-static-layer-as-underlayment)
- [كشف الشيفرة الميتة](https://stevekinney.com/courses/self-testing-ai-agents/dead-code-detection)
