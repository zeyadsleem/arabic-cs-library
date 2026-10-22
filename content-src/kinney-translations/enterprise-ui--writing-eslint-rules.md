---
title: "كتابة قواعد ESLint الخاصة بنا"
---

كتابة قواعد ESLint المخصصة من الأمور التي تبدو أكثر غموضًا مما هي عليه بكثير. فتحت قشرة الطقوس، ليست [القاعدة](https://eslint.org/docs/latest/extend/custom-rules) سوى شيفرة تمشي في شجرة نحو مجردة (AST)، وتقرر ما إذا كان هناك خطأ ما، وتبلغ اختياريًا عن إصلاح أو اقتراح. والحيلة ليست *كيفية* كتابتها، بل معرفة متى تكون القاعدة المخصصة هي الأداة الصحيحة فعلًا، وكيف تكتبها بواجهة البرمجة المعاصرة في عصر الإعداد المسطح (flat config)، وكيف تتجنب بناء عفريت سياسات هشّ صغير يكرهه الجميع.

## ابدأ بأرخص وسيلة إنفاذ تفي بالغرض

لا تبدأ بكتابة إضافة لأن مهندسًا ما خاض تجربة روحية في `node_modules`. فـ[إرشاد](https://eslint.org/docs/latest/extend/custom-rule-tutorial) ESLint نفسه هو إنشاء قاعدة مخصصة فقط عندما لا تغطي القواعد المدمجة أو قواعد المجتمع حالتك، بل إن درس القواعد المخصصة يطلب منك البحث عن حل قائم أولًا. وعدد مفاجئ من أفكار «نحتاج قاعدة مخصصة» ليس في الحقيقة إلا إعدادًا، أو تقييدًا قائمًا على محددات عبر `no-restricted-syntax`.

كثير من القواعد التركيبية بحتًا ينبغي التعبير عنها بـ[المحدِّدات](https://eslint.org/docs/latest/extend/selectors) بدلًا من الشيفرة. فـESLint يدعم محددات AST شبيهة بـCSS مثل `VariableDeclarator > Identifier`، ومرشحات الخصائص مثل `[name="foo"]`، ومحددات الأخوة، والنفي، و`:matches()`، و`:exit`. وتعمل هذه المحددات داخل القواعد المخصصة، لكنها تعمل أيضًا في الإعداد عبر `no-restricted-syntax`. وإذا لم تكن تريد سوى «حظر هذا الشكل التركيبي»، فاجعل المحددات خيارك الأول. فلا أحد بحاجة إلى إضافة مفصّلة على الطلب لمجرد تجريم نمط AST واحد.

تصبح القواعد المخصصة جديرة بالجهد عندما تحتاج إلى أحد أربعة أشياء: سياسة خاصة بالمشروع، أو سياق غير تافه، أو إصلاح تلقائي آمن أو اقتراحات، أو فحوص دلالية واعية بأنواع TypeScript. وهناك تتوقف المحددات عن الكفاية ويستحق نموذج قاعدة حقيقي مكانه.

## واقع ESLint الراهن

كتابة القواعد *اليوم* تعني الكتابة لعصر الإعداد المسطح. فقد أصبح الإعداد المسطح الافتراضي في ESLint v9، وأصبح الإعداد الحديث يعيش في `eslint.config.js` أو أحد تنويعاته بصيغ الوحدات. والمنشورات القديمة التي تفترض افتراضات `.eslintrc` أو تحميل الإضافات بسلاسل نصية أو سلوك `RuleTester` القديم أصبحت أمثلة ممتازة على علم الآثار التقني.

حدث أكبر تغيير في واجهة البرمجة لمؤلفي القواعد في [الإصدار 9](https://eslint.org/docs/latest/use/migrate-to-9.0.0). فلم تعد القواعد بأسلوب الدوال مدعومة، لذا يجب أن تصدّر القاعدة كائنًا فيه `meta` و`create()`. كما نقل ESLint كثيرًا من الأدوات المساعدة من `context` إلى `SourceCode`، بما فيها أدوات النطاق والرموز مثل `getScope` و`getAncestors` و`getDeclaredVariables` و`markVariableAsUsed`. وإذا رأيت `TypeError: context.getScope is not a function`، فالكون لا يعاقبك؛ بل يعني ذلك أن القاعدة أو الإضافة لا تزال تستخدم واجهة ما قبل الإصدار 9.

ويؤثر هذا التغيير في الاختبارات أيضًا. ففي عالم الإعداد المسطح، يستخدم `RuleTester` افتراضات الإعداد المسطح، أي `ecmaVersion: "latest"` و`sourceType: "module"` ما لم تتجاوزهما. كما يستخدم إعداد حالات الاختبار `languageOptions` بدلًا من `parserOptions` القديمة على المستوى الأعلى. وشدّد ESLint v9 أيضًا قبضته على `RuleTester` بحيث بات يفرض أمورًا كانت تمر سابقًا، مثل اشتراط `message` أو `messageId`، واشتراط تأكيدات صريحة للاقتراحات، ومعاملة `output: null` كطريقة القول «لا إصلاح تلقائي».

## شكل القاعدة الحديثة

يصدّر نموذج القاعدة الحديث كائنًا بجزأين على المستوى الأعلى: `meta` و`create()`. فـ`meta` يصف القاعدة، و`create(context)` يعيد خريطة الزوار التي يستخدمها ESLint أثناء اجتيازه شجرة AST. وتعدّد وثائق ESLint حقول `meta` الرئيسية التي ستعنيها فعلًا: `type` و`docs` و`messages` و`fixable` و`hasSuggestions` و`schema` و`defaultOptions` وبيانات الإهمال الوصفية. وينبغي أن تكون قيمة `type` واحدة من `"problem"` أو `"suggestion"` أو `"layout"`، ويستخدم ESLint هذا التصنيف في أشياء مثل `--fix-type`.

هيكل أساسي جيد:

```javascript
// rules/no-window-fetch.js
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow window.fetch in application code',
      url: 'https://internal.example.com/eslint/no-window-fetch',
    },
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        properties: {
          allowInTests: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowInTests: true }],
    messages: {
      avoidWindowFetch: 'Use the shared API client instead of window.fetch().',
      replaceWithApiClient: 'Replace with apiClient.fetch().',
    },
  },

  create(context) {
    const [{ allowInTests }] = context.options;
    const isTestFile = /(^|[\\/])(.*\.)?(test|spec)\.[jt]sx?$/.test(context.filename);

    if (allowInTests && isTestFile) {
      return {};
    }

    return {
      "CallExpression[callee.type='MemberExpression'][callee.object.name='window'][callee.property.name='fetch']"(
        node,
      ) {
        context.report({
          node: node.callee,
          messageId: 'avoidWindowFetch',
          suggest: [
            {
              messageId: 'replaceWithApiClient',
              fix(fixer) {
                return fixer.replaceText(node.callee, 'apiClient.fetch');
              },
            },
          ],
        });
      },
    };
  },
};
```

هذا المثال وحده يعرض الأفكار الجوهرية المهمة. فالقاعدة بأسلوب الكائنات. وتستخدم `meta.messages` و`messageId` بدلًا من سلاسل نصية مكتوبة يدويًا. وتعلن `hasSuggestions: true` لأنها تصدر اقتراحات. وتعلن مخططًا لأنها تقبل خيارات. وتستخدم مستمع محدِّد بدلًا من كومة متداخلة عملاقة من جمل `if` لأن النمط تركيبي في معظمه. وتستخدم `defaultOptions` بحيث يستطيع المنطق التنفيذي افتراض شكل خيار دون دمج الافتراضات يدويًا في كل مرة. وتوثّق ESLint كل هذه القطع مباشرة، بما فيها اشتراط ضبط القواعد المُصدِّرة للاقتراحات لـ`hasSuggestions`، وسلوك الدمج التعاودي في `meta.defaultOptions`.

## الزوار والمحدِّدات وأحداث مسار الشيفرة

الكائن الذي يعيده `create()` هو **خريطة زوار**. فإن كان المفتاح نوع عقدة، شغّل ESLint تلك الدالة المرجعية عند دخوله تلك العقدة. وإن انتهى المفتاح بـ`:exit`، شغّله في طريق العودة. وإن كان المفتاح محدِّدًا، طبّق ESLint الدالة المرجعية عندما تطابق عقدة ذلك المحدِّد. وإن كان المفتاح أحد أحداث مسار الشيفرة، استدعاه ESLint أثناء تحليل مسار الشيفرة. وتعرض وثائق ESLint الأنماط الثلاثة صراحةً، بما فيها `FunctionExpression:exit` و`onCodePathStart` / `onCodePathEnd`.

[المحدِّدات](https://eslint.org/docs/latest/extend/selectors) هي القوة الخارقة المُهمَلة هنا. فيدعم ESLint أنواع العقد، ومحارف البدل، ووجود الخصائص ومقارنتها، والخصائص المتداخلة، والحقول، والأحفاد، والأبناء، والأخوة، والنفي، و`:matches()` / `:is()`. وعمليًا، غالبًا ما تجعل مستمعات المحدِّدات القاعدة أصغر وأكثر محلية وأسهل في الاستدلال من مسحات `Program()` الواسعة. استخدمها عندما يكون النمط بنيويًا، واستخدم مستمعات العقد العادية عندما يسهل التعبير عن المنطق في الشيفرة، ولا تستخدم أحداث مسار الشيفرة إلا عندما تحتاج فعلًا إلى معلومات الوصول أو تدفق التحكم.

وحين لا تكون متأكدًا من شكل شجرة AST، استخدم ESLint Code Explorer. فالوثائق تشير إليه مباشرة، وذلك هو التصرف الصحيح. فتخمين أشكال العقد من الذاكرة هو الطريق الذي ينتهي به الناس إلى كتابة قواعد ضد صياغة لم يحللوها فعليًا.

## كائن `context` و`SourceCode`

يمثل `context` رؤية القاعدة لتشغيل الفحص الحالي. وتوثّق ESLint أكثر الخصائص فائدة: `id` و`filename` و`physicalFilename` و`cwd` و`options` و`sourceCode` و`settings` و`languageOptions`. ويخبرك `languageOptions` بوضع التحليل الفعلي وإعداد المحلل للملف الحالي. ويتباعد `filename` و`physicalFilename` في سيناريوهات المعالجات مثل كتل الشيفرة، وهذا يهم أكثر مما يتوقعه الناس بمجرد أن يدخل Markdown أو محتوى مستخلص آخر في الصورة.

أصبح `context.sourceCode` الآن السطح الرئيسي للأدوات المساعدة. فهناك تحصل على نص المصدر والرموز والتعليقات والنطاقات والأسلاف والمتغيرات المعلنة وخدمات المحلل. وتوثّق ESLint توابع مثل `getText()` و`getCommentsBefore()` و`getCommentsAfter()` و`getCommentsInside()` و`getAncestors()` و`getDeclaredVariables()` و`getScope()` و`markVariableAsUsed()`. ولا يوفر المحلل الافتراضي أي خدمات محلل، لكن المحللات المخصصة تستطيع ذلك، وقواعد TypeScript تعتمد على هذا بالضبط.

وثمة نمط عملي مخفي في واجهات البرمجة تلك: فاجعل بيانات AST أولًا. ولا تلجأ إلى نصوص `SourceCode` وواجهات الرموز إلا عندما لا تخبرك شجرة AST بما يكفي، خصوصًا في القواعد الحساسة للتخطيط التي تتعلق بالفواصل أو الفواصل المنقوطة أو المسافات أو موضع التعليقات. وتوصي وثائق ESLint صراحةً بـ`sourceCode.getText()` في هذه الحالات، وتلاحظ أن استعلامات التعليقات تُحسب عند الطلب، وهو تلميح جيد إلى عدم رشّ مسحات التعليقات على كل زائر ساخن إلا إذا كنت تحتاجها فعلًا.

كما تتاح `settings` المشتركة لكل قاعدة عبر `context.settings`. ويدعم الإعداد المسطح كائن `settings` تحديدًا للمعلومات المشتركة بين القواعد، ويعرض مثال ESLint قاعدة إضافة تقرأ `context.settings.sharedData`. استخدم ذلك عندما تحتاج قواعد عدة إلى إعداد الإضافة العام نفسه، واستخدم خيارات القاعدة عندما يكون سلوك ما خاصًا بقاعدة بعينها. والخلط بينهما هو كيف يتحول إعداد الإضافات إلى فلكلور.

## الإبلاغ عن المشكلات على نحو سليم

الفعل الجوهري للقاعدة هو `context.report()`. وتوصي وثائق ESLint بـ`messageId` بدلًا من سلاسل `message` المضمنة لأنه يمركز الرسائل في `meta.messages`، ويقلل التكرار في الاختبارات، ويجعل تغيير الرسائل أقل إيلامًا. ويحتاج الإبلاغ إلى `node` أو `loc` على الأقل، ويمكن أن يتضمن `data` لعناصر استبدال الرسالة. هذا هو النمط الافتراضي الممل الصحيح.

مثال نظيف:

```javascript
context.report({
  node,
  messageId: 'avoidWindowFetch',
  data: {
    callee: 'window.fetch',
  },
});
```

وتساعد هذه البنية الاختبارات أيضًا. فـ`RuleTester` الحديث يريد `message` أو `messageId` صريحًا، وسيشتكي الآن إذا تُركت عناصر الاستبدال دون تعويض. وقد أصبحت الأداة أكثر تشددًا عن قصد، وهذا جيد. فالقواعد أسهل في الثقة عندما تكون الاختبارات أقل استعدادًا للتهاون.

## الإصلاحات التلقائية مقابل الاقتراحات

الإصلاحات التلقائية والاقتراحات ليسا الشيء نفسه، والفرق تخلط بينهما باستمرار. فـ**الإصلاح التلقائي** شيء قد يطبقه ESLint تلقائيًا عبر `--fix`. أما **الاقتراح** فهو إصلاح يظهر في المحرر أو يستدعيه المستخدم بوصفه مساعدًا اختياريًا. ويشترط ESLint ضبط `meta.fixable` للقواعد المُصلِحة تلقائيًا، و`meta.hasSuggestions` للقواعد التي تصدر اقتراحات. وإن حذفت هذين الحقلين وحاولت مع ذلك الإصلاح أو الاقتراح، رمى ESLint استثناءً.

وإرشادات ESLint نفسها لأفضل ممارسات الإصلاح صارمة لسبب وجيه: تجنّب الإصلاحات التي قد تغيّر سلوك وقت التشغيل، واجعل الإصلاحات أصغر ما يمكن، واقصرها على إصلاح مفهومي واحد لكل رسالة. فـESLint يعيد تشغيل القواعد بعد دورة الإصلاح، لذا لا تحتاج القاعدة إلى تلميع إصلاحها لتلبية كل قاعدة أخرى دفعة واحدة. ولهذا أيضًا ينبغي أن تكون إصلاحات الاقتراحات مركزة وألّا تحاول مطابقة تفضيلات أسلوب المستخدم. فالاقتراحات تغييرات قائمة بذاتها، لا مُنسّقات مصغرة.

وهذا يمنحك قاعدة قرار بسيطة: إذا كان التغيير آمنًا وميكانيكيًا بوضوح، فأصلحه تلقائيًا. وإذا كان التغيير قد يغيّر السلوك، أو يعتمد على القصد، أو له نتائج صحيحة متعددة، فاجعله اقتراحًا. وتذكر وثائق الاقتراحات في ESLint هذه الحالات بالضبط: الإصلاحات التي تغيّر السلوك، والحالات ذات الحلول الصحيحة المتعددة.

## الخيارات والمخططات

القواعد التي تقبل خيارات تحتاج الآن إلى مخطط حقيقي. فقد جعل ESLint [الإصدار 9](https://eslint.org/docs/latest/use/migrate-to-9.0.0) ذلك غير اختياري عمليًا: إذا مرّر المستخدمون خيارات إلى قاعدة بلا `meta.schema`، رمى ESLint استثناءً. والمخطط هو JSON Schema وتحديدًا Draft-04، ويتحقق ESLint من *مصفوفة الخيارات بعد درجة الخطورة*، لا من درجة الخطورة نفسها. وهذا يعني أن مخططك لا يرى `"error"` أو `"warn"` ولا يستطيع التحقق منهما.

وثمة نمطان للمخطط. فصيغة المصفوفة المختصرة تتحقق من `context.options` بحسب الموضع. أما صيغة JSON Schema الكاملة فتتحقق من مصفوفة الخيارات بأكملها وتلزم إذا أردت أشياء مثل `$ref` أو `oneOf` أو `anyOf` عبر بنية الخيارات كاملة. وتحذّر ESLint أيضًا من خطأ سهل: يجب أن يظل المخطط على المستوى الأعلى واصفًا مصفوفة خيارات لا كائنًا مجردًا، وإلا أصبحت القاعدة مستحيلة التمكين. وهذا نوع خاص من إحراز الهدف في مرماك الخاطئ.

يستحق `meta.defaultOptions` الاستخدام في أي قاعدة لها إعداد حقيقي. فـESLint يدمج تعاوديًا عناصر الخيارات التي قدمها المستخدم فوق الافتراضات، ويتحقق من النتيجة المدمجة مقابل المخطط، ثم يعرض تلك المصفوفة المدموجة على `context.options`. وهذا يتيح لمنطق قاعدتك معاملة الخيارات كأنها مُوحَّدة الوضع بالفعل.

نمط معقول:

```javascript
meta: {
  schema: [
    {
      type: "object",
      properties: {
        allowInTests: { type: "boolean" },
      },
      additionalProperties: false,
    },
  ],
  defaultOptions: [{ allowInTests: true }],
},
create(context) {
  const [{ allowInTests }] = context.options;
}
```

تنتمي تسوية الخيارات إلى البيانات الوصفية، لا إلى تلطيخ منطق الزوار بها.

## النطاق والمتغيرات ومسك سجل «الاستخدام»

إذا كانت قاعدتك بحاجة إلى الاستدلال على المعرّفات دلاليًا لا تركيبيًا، فواجهات نطاق `SourceCode` هي الأداة الصحيحة. وتوثّق ESLint `sourceCode.getScope(node)` للبحث عن النطاق، و`sourceCode.getDeclaredVariables(node)` لإعلانات المتغيرات، و`sourceCode.markVariableAsUsed(name, refNode)` للحالات التي ينبغي فيها لنمط الوصول المخصص لديك أن يفي بـ`no-unused-vars`. وهذه الواجهة الأخيرة مفيدة بشكل خاص للأطر أو الماكروات التي تشير إلى المتغيرات بشكل غير مباشر.

وهذا أيضًا فخ الترحيل الخاص بالإصدار 9 الذي يوقع القواعد القديمة. فما كان `context.getScope()` أصبح `sourceCode.getScope(node)`، وما كان `context.markVariableAsUsed(name)` أصبح `sourceCode.markVariableAsUsed(name, node)`. وإن كنت تحدّث قواعد داخلية، فأصلح هذين أولًا قبل أن تبدأ في شتم المحلل.

## اختبار القواعد بـ`RuleTester`

يجب أن يكون لكل قاعدة مخصصة اختبارات. لا لأن الاختبار فضيلة، بل لأن قواعد ESLint مُصرِّفات صغيرة لها من السطح ما يكفي بالضبط لتكون خاطئة بطرق خفية ومزعجة. ويوفر ESLint أداة `RuleTester`، وتسميها وثائق القواعد المخصصة صراحةً الطريقة المعيارية لاختبار القواعد. وفي عصر الإعداد المسطح، تكون افتراضات `RuleTester` هي `ecmaVersion: "latest"` و`sourceType: "module"` ما لم تتجاوزها.

وملف اختبار عادي يبدو الآن هكذا:

```javascript
import { RuleTester } from 'eslint';
import rule from '../rules/no-window-fetch.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

ruleTester.run('no-window-fetch', rule, {
  valid: [
    "apiClient.fetch('/users')",
    {
      code: "window.fetch('/users')",
      options: [{ allowInTests: true }],
      filename: 'api.test.ts',
    },
  ],
  invalid: [
    {
      code: "window.fetch('/users')",
      options: [{ allowInTests: false }],
      errors: [
        {
          messageId: 'avoidWindowFetch',
          suggestions: [
            {
              messageId: 'replaceWithApiClient',
              output: "apiClient.fetch('/users')",
            },
          ],
        },
      ],
      output: null,
    },
  ],
});
```

هذه `output: null` تهم. ففي `RuleTester` الحديث، تعني `output` أن «هذه الحالة تتوقع إصلاحًا تلقائيًا». وإذا لم يكن هناك إصلاح تلقائي، فاحذف `output` أو اضبطها على `null`. ويشترط ESLint v9 الآن أيضًا أن تكون الاختبارات صريحة بشأن وجود اقتراحات، وتحتاج تأكيدات الاقتراحات إلى `output` وإلى `desc` أو `messageId`. لذا لم تعد العادة القديمة في كتابة حالات غير صالحة غامضة والأمل في أن تفعل القاعدة الصواب مقبولة بالقدر نفسه. خسارة للفوضى، حقًا.

## قواعد خاصة بـTypeScript

إذا كانت قاعدة شيفرتك ثقيلة بـTypeScript، فلا تزال كتابة قواعد ESLint العادية ممكنة، لكن الأدوات الموصى بها تتغير. فـ[يوصي typescript-eslint](https://typescript-eslint.io/developers/custom-rules/) بـ`@typescript-eslint/utils` لكتابة القواعد، و`ESLintUtils.RuleCreator` لنماذج قواعد قوية الأنواع، و`@typescript-eslint/rule-tester` للاختبارات. والسبب بسيط: أنواع `eslint` العادية مبنية على ESTree العادي ولا تفهم العقد والخصائص الخاصة بـTypeScript فهمًا صحيحًا.

وتبدأ القاعدة المكتوبة بالأنواع عادة هكذا:

```typescript
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';

const createRule = ESLintUtils.RuleCreator((name) => `https://internal.example.com/eslint/${name}`);

export default createRule({
  name: 'no-enum-for-of',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow for...of over enums',
    },
    schema: [],
    messages: {
      noEnum: 'Do not iterate over enums with for...of.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ForOfStatement(node) {
        const services = ESLintUtils.getParserServices(context);
        const type = services.getTypeAtLocation(node.right);

        if (type.symbol && (type.symbol.flags & ts.SymbolFlags.Enum) !== 0) {
          context.report({
            node: node.right,
            messageId: 'noEnum',
          });
        }
      },
    };
  },
});
```

هذا النمط مأخوذ مباشرة من نموذج typescript-eslint. فـ`getParserServices(context)` يمنحك الجسر من عقد ESLint إلى عقد TypeScript ومعلومات الأنواع، بما فيها أدوات مساعدة مثل `getTypeAtLocation()` و`getSymbolAtLocation()`. وإن احتجت إلى واجهة المصرّف الخام، فيمكنك أيضًا استخدام `services.program.getTypeChecker()`.

ويستحق تحذير التصميم من typescript-eslint الاتباع أيضًا: لا تغيّر سلوك القاعدة صامتًا بناءً على ما إذا كانت معلومات الأنواع متاحة أم لا. فهم يوصون صراحةً بعدم كتابة قواعد تفعل شيئًا مع `services.program` وشيئًا آخر بدونه. وإذا كانت القاعدة تتطلب معلومات الأنواع حقًا، فوثّق ذلك، أو قيّدها بخيار صريح، أو قسّمها إلى قاعدة أو إعداد منفصل. وإلا حصل المستخدمون على قاعدة فحص شاذة على طريقة شرودنغر تغيّر شخصيتها حسب حوادث الإعداد.

ولاختبار القواعد المكتوبة بالأنواع، استخدم `@typescript-eslint/rule-tester` ومكّن الوضع الواعي بالأنواع عبر `parserOptions.projectService`، مع `allowDefaultProject` عادةً لملفات الاختبار و`tsconfigRootDir`. وهذا هو المسار الموصى به حاليًا للاختبارات الواعية بالأنواع. ويدعم مختبر typescript-eslint أيضًا بعض التيسيرات خارج نواة ESLint، مثل صيغة المصفوفة لـ`output` في الإصلاحات متعددة الدورات، وقيود الاعتماد للاختبارات المشروطة بالإصدار.

## تحزيم القواعد في إضافة

[الإضافة](https://eslint.org/docs/latest/extend/plugins) ليست سوى كائن. وتعرّف وثائق الإضافات في ESLint السطح الرئيسي بأنه `meta` و`configs` و`rules` و`processors`. وفي إضافات القواعد، الجزء الجوهري هو كائن `rules` الذي يعيّن أسماء القواعد إلى نماذج القواعد. وتوصي الوثائق أيضًا بكائن `meta` جذري فيه `name` و`version` و`namespace` لتسهيل التنقيح وجعل تخزين الإضافة مؤقتًا أكثر فعالية، وتلاحظ أن `meta.namespace` يساعد `defineConfig()` في العثور على إضافتك حتى لو أسند المستخدم إليها نطاق أسماء مختلفًا في الإعداد.

نقطة دخول نظيفة للإضافة:

```javascript
import noWindowFetch from './rules/no-window-fetch.js';

const plugin = {
  meta: {
    name: 'eslint-plugin-acme',
    version: '0.1.0',
    namespace: 'acme',
  },
  rules: {
    'no-window-fetch': noWindowFetch,
  },
  configs: {},
};

Object.assign(plugin.configs, {
  recommended: [
    {
      plugins: {
        acme: plugin,
      },
      rules: {
        'acme/no-window-fetch': 'error',
      },
    },
  ],
});

export default plugin;
```

هذا يتبع إرشاد الإضافات الحالي تمامًا: صدّر كائن إضافة، ثم علّق الإعدادات المشتركة على `plugin.configs`. وإذا احتجت إلى دعم الإعداد المسطح والإعداد القديم معًا، فتوصي ESLint بشحن الشكلين من كائن `configs` واستخدام أسماء مثل `legacy-recommended` أو `flat/recommended` لجعل التمييز واضحًا.

وبالنسبة إلى الإضافات الواعية بـTypeScript تحديدًا، [يوصي typescript-eslint](https://typescript-eslint.io/developers/eslint-plugins/) بـ`@typescript-eslint/utils` كاعتماد وقت تشغيل، و`@typescript-eslint/rule-tester` كاعتماد تطوير، واعتمادات نظير على `eslint` و`typescript` و`@typescript-eslint/parser` وأي محلل آخر تتوقع أن يستخدمه المستهلكون. ويوصون أيضًا بإبقاء كل حزم `@typescript-eslint` على خط الدلالات الدقيقة (semver) نفسه.

## استخدام القواعد الداخلية دون نشر أي شيء

بالنسبة إلى القواعد الخاصة بالشركة وحدها، يجعل الإعداد المسطح ذلك أجمل بكثير من رقصة `--rulesdir` القديمة. فـESLint يدعم تحميل كائن إضافة محلي من ملف، أو تعريف [إضافة افتراضية](https://eslint.org/docs/latest/use/configure/plugins) مباشرة داخل `eslint.config.js`. وهذا يعني أنك تستطيع إبقاء القواعد المحلية في المستودع قريبة من قاعدة الشيفرة وربطها مباشرة دون اختراع حزمة npm فقط لإجبار فريق واحد على التوقف عن استخدام `window.fetch`.

أخف إعداد هو الإضافة الافتراضية:

```javascript
// eslint.config.js
import { defineConfig } from 'eslint/config';
import noWindowFetch from './tools/eslint/rules/no-window-fetch.js';

export default defineConfig([
  {
    plugins: {
      local: {
        rules: {
          'no-window-fetch': noWindowFetch,
        },
      },
    },
    rules: {
      'local/no-window-fetch': 'error',
    },
  },
]);
```

وتوثّق ESLint هذا مباشرة كنمط الإضافة الافتراضية. وهو أفضل نقطة انطلاق للقواعد الخاصة لأنه يبقي التغذية الراجعة سريعة والطقوس منخفضة. وانشر لاحقًا إن أصبحت القواعد قابلة لإعادة الاستخدام على نطاق واسع. فليست كل عادة داخلية تستحق أسطورتها الخاصة في سجل الحزم.

## الأداء والتنقيح

تعمل القواعد المخصصة كثيرًا، لذا يهم الأداء. ولدى ESLint وضع توقيت مدمج: اضبط `TIMING=1` لترى أبطأ عشر قواعد، و`TIMING=all` لقائمة أطول، واجمعهما مع `--no-config-lookup --rule ...` عندما تريد عزل قاعدة واحدة. ويشير ESLint أيضًا إلى خيار `--stats` لتوقيت أدق لكل ملف وكل قاعدة. هذه هي الطريقة الرسمية للتوقف عن التخمين بشأن القاعدة البطيئة.

عمليًا، أكبر مكاسب الأداء مملة: استخدم زوارًا ضيقين بدلًا من عمل واسع على الشجرة كاملة. وفضّل مستمعات المحدِّدات عندما تتيح لـESLint إنجاز عمل المطابقة بدقة. وخزّن التعابير النمطية والإعداد لمرة واحدة خارج دوال العقد الساخنة. وتجنب مسحات النص الكامل أو التعليقات المتكررة عندما تكفي استعلامات محلية بالعقدة، خصوصًا وأن استعلامات التعليقات تُحسب عند الطلب. لا شيء من ذلك براق، لكن الانتظار ثلاث ثوانٍ إضافية في كل دورة فحص بسبب قاعدة تطمح أكثر من اللازم ليس براقًا أيضًا.

## التسمية والتوثيق وقابلية الصيانة

لا تزال [اصطلاحات التسمية](https://eslint.org/docs/latest/contribute/core-rules) في نواة ESLint افتراضًا جيدًا حتى للقواعد الخاصة: استخدم الشرطات، واستخدم `no-` للنواهي، واستخدم أسماء أمرية قصيرة للمتطلبات الإيجابية. فهذا يجعل حزمة القواعد تبدو مثل ESLint لا مثل لغة داخلية مخصصة عشوائية. وأدرج `docs.url` كلما استطعت، لأن المحررات تستخدمه لإظهار روابط مفيدة عند المخالفات.

وثمت قاعدتان لقابلية الصيانة تهمان أكثر من الباقي. الأولى: لا تبنِ فوق تنفيذات قواعد نواة ESLint. فـESLint يحذّر صراحةً من أن قواعد النواة ليست واجهة عامة وليست مصممة للتمديد. وإن احتجت إلى «القاعدة نفسها لكن باختلاف بسيط»، فانسخ الملف وتملّك نسختك. والثانية: لا تترك الخيارات بلا أنواع ولا توثيق. فـ`meta.schema` و`meta.defaultOptions` والاختبارات وصفحة توثيق حقيقية ليست عملًا شكليًا، بل هي ما يحوّل القاعدة من حيلة بارعة إلى بنية تحتية.

وبالنسبة إلى الإضافات الواعية بـTypeScript، يستحق تقسيم الإعدادات بوضوح أيضًا. فيوصي typescript-eslint إما بجعل `recommended` يشترط معلومات الأنواع وإما بنشر إعداد منفصل مثل `recommendedTypeChecked`، وينصحون بتوثيق هذه الاستراتيجية صراحةً. فهذا يمنع المستخدمين من تمكين مجموعة قواعدك ثم اكتشاف أن نصفها لا يعمل إلا عندما تُعدّ خدمة المشروع تعديلًا صحيحًا.

## متى تكون القاعدة نقطة تمديد خاطئة

ليست كل حاجة إلى فحص قاعدة. فـ[الإضافات](https://eslint.org/docs/latest/use/configure/plugins) يمكنها أيضًا تصدير معالجات ولغات. والمعالجات هي ما تريده عندما يلزم استخلاص JavaScript من نوع ملف آخر، مثل كتل شيفرة Markdown. أما اللغات فهي نقطة التمديد الأحدث لفحص لغات غير JavaScript عبر الإضافات. وإذا كانت مشكلتك الحقيقية «افحص شيفرة داخل Markdown» أو «افحص JSON كلغة من الدرجة الأولى»، فليست هذه مشكلة قاعدة مخصصة، بل مشكلة معالج أو لغة.

وبالمثل، إذا كانت الصياغة نفسها JavaScript غير معيارية، فذلك عادة [شأن محلل](https://eslint.org/docs/latest/extend/custom-parsers) لا شأن قاعدة. فالقواعد تفحص الشجرة التي تُعطاها، وليست مسؤولة عن اختراع شجرة لصياغة لا يفهمها المحلل.

## النهج الافتراضي الذي سأستخدمه

بالنسبة إلى قاعدة شيفرة داخلية، المسار المعقول ممل جدًا. ابدأ بالتحقق مما إذا كانت المحدِّدات و`no-restricted-syntax` كافيتين. وإن لم تكونا، اكتب قاعدة محلية كإضافة افتراضية في `eslint.config.js`. واستخدم القواعد بأسلوب الكائنات فقط. وضع كل الرسائل في `meta.messages`. وأضف `schema` و`defaultOptions` حقيقيين لكل ما هو قابل للإعداد. وفضّل الاقتراحات على الإصلاحات التلقائية حتى يصبح التغيير آمنًا بوضوح. واختبر كل قاعدة بـ`RuleTester`، بما في ذلك «لا إصلاح تلقائي» والاقتراحات والحالات الحدّية. ثم لا ترقِّها إلى إضافة منشورة بإعدادات مسماة إلا عندما تصبح مجموعة القواعد قابلة لإعادة الاستخدام عبر المستودعات فعلًا.

هذه هي اللعبة كلها. فكتابة قواعد ESLint ليست صعبة، لكنها سهلة الإنجاز برخاوة، والبنية التحتية الرخوة للفحص تملك موهبة خاصة في إغاظة كل مهندسي الشركة دفعة واحدة.

---

## الخلاصة السريعة (TL;DR)

### متى تكتب قاعدة مخصصة

> شجرة القرار.

- هل تستطيع حلّها بقاعدة أو إضافة قائمة؟ → استخدمها.
- هل هي عُرف خاص بـ*قاعدة شيفرتك* أنت؟ → اكتب قاعدة مخصصة.
- هل تفرض حدًا معماريًا؟ → اكتب قاعدة بلا تردد.

**أمثلة على قواعد مخصصة تستحق الكتابة:**

- لا استيرادات مباشرة من الحزم الداخلية لفريق آخر
- فرض اصطلاحات تسمية الأحداث عبر الواجهات المصغّرة
- اشتراط حدود الأخطاء حول الاستيرادات البعيدة الموحدة
- حظر أنماط API معينة تسبب مشكلات في الإنتاج

---

### تشريح القاعدة

> كل قاعدة ESLint زائر لشجرة AST.

```javascript
export default {
  meta: {
    type: 'problem', // 'problem' | 'suggestion' | 'layout'
    docs: { description: '...' },
    schema: [], // options the rule accepts
    fixable: 'code', // can auto-fix? 'code' | 'whitespace' | null
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        // Runs every time the parser encounters an import statement
        if (isForbiddenImport(node.source.value)) {
          context.report({
            node,
            message: 'Do not import from {{source}}',
            data: { source: node.source.value },
          });
        }
      },
    };
  },
};
```

---

### نمط زائر شجرة AST

> تعلن أنواع العقد التي تهمك، ويمشي ESLint في الشجرة.

```
Program
├── ImportDeclaration          ← "import X from 'Y'"
│   ├── ImportDefaultSpecifier ← "X"
│   └── Literal                ← "'Y'"
├── FunctionDeclaration        ← "function foo() {}"
│   └── BlockStatement
│       └── ReturnStatement
└── ExportDefaultDeclaration   ← "export default ..."
```

- استخدم [AST Explorer](https://astexplorer.net/) لترى العقد التي تنتجها شيفرتك.
- تطابق مفاتيح الزوار أسماء أنواع العقد: `ImportDeclaration` و`CallExpression` و`MemberExpression`.
- يمكنك أيضًا استخدام محددات شبيهة بـCSS: `CallExpression[callee.name="require"]`.

---

### اختبار القواعد بـRuleTester

> القواعد دوال نقية. فاختبرها كدوال نقية.

```javascript
const { RuleTester } = require('eslint');
const rule = require('./no-cross-team-imports');

const ruleTester = new RuleTester();

ruleTester.run('no-cross-team-imports', rule, {
  valid: [`import { Button } from '@design-system/ui'`, `import { utils } from './local-utils'`],
  invalid: [
    {
      code: `import { internal } from '@team-checkout/internals'`,
      errors: [{ message: /Do not import from/ }],
    },
  ],
});
```

- يجب ألّا تبلغ كل حالة صالحة عن شيء. ويجب أن تبلغ كل حالة غير صالحة بالأخطاء المتوقعة بالضبط.
- اختبر الحالات الحدّية: إعادات التصدير، والاستيرادات الديناميكية، والاستيرادات الخاصة بالأنواع فقط.
