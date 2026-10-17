---
title: "تمرين 6: التدقيق المعماري (Architectural Linting)"
---

## ما الذي تقوم به

لا شيء يمنع حاليًا `packages/analytics` من استيراد مكوّن `UserList` الداخلي مباشرةً من `@pulse/users/src/user-list`، متجاوزًا الواجهة البرمجية العامة للحزمة. ولا شيء يمنع حزمة `@pulse/ui` من استيراد شيفرة على مستوى التطبيق من `apps/dashboard`. هذه الانتهاكات تُصرَّف بلا مشاكل وتجتاز كل الفحوص الموجودة. ستقوم بتهيئة `eslint-plugin-boundaries` لتُرمّز مخطط الاعتماديات المقصود في صورة قواعد تدقيق (lint) حتى تُلتقط هذه الانتهاكات تلقائيًا.

## لماذا يهمّ هذا

في المستودع الأحادي (monorepo)، مخطط اعتماديات الحزم هو معمارك. ينبغي ألا تستورد الحزم في القاع (مثل `@pulse/shared`) أبدًا من حزم أعلى منها (مثل `apps/dashboard`). وينبغي ألا تمتد حزم الميزات إلى داخليات بعضها البعض. لكن بلا فرض، يسلك المطوّرون طرقًا مختصرة — استيراد داخلي سريع هنا، واعتمادية دائرية هناك — فيتآكل المعمار. يحوّل `eslint-plugin-boundaries` القصد المعماري إلى فحوص آلية تعمل عند كل حفظ، وكل إيداع، وكل تشغيل لخط CI.

## المتطلبات المسبقة

- Node.js 20+
- pnpm 9+

## التهيئة

يُفترض أنك تُكمل من حيث انتهى التمرين 5. إن احتجت إلى اللحاق بالركب:

```bash
git checkout 06-linting-start
pnpm install
```

## أظهر المشكلة

قبل إضافة أي قواعد، أثبت أن المعمار قابل للانتهاك دون أي عاقبة.

افتح `packages/analytics/src/analytics-dashboard.tsx` وأضف هذا الاستيراد في الأعلى:

*packages/analytics/src/analytics-dashboard.tsx*

```typescript
import { UserList } from '@pulse/users/src/user-list';
```

احفظ الملف. قد يشتكي TypeScript أو قد لا يشتكي، حسب ما إذا كنت قد أكملت التمرين 5 (مراجع TypeScript). إن كنت قد أضفت مراجع المشروع، سيرفض TypeScript هذا الاستيراد لأن `@pulse/users` ليس ضمن مراجع `@pulse/analytics`. وإن لم تفعل، فسيُحلّ الاستيراد عبر مساحة العمل. في الحالتين، تابع — فالنقطة هي أن *المدقّق* لا رأي له في هذا الاستيراد.

شغّل المدقّق:

```bash
pnpm turbo lint
```

> **ملاحظة**
>
> سترى خطأ `@typescript-eslint/no-unused-vars` لأن الرمز المستورد لا يُستخدم أبدًا — وهذا يأتي من القواعد الموصى بها في TypeScript ESLint، لا من `eslint-plugin-boundaries`. لا توجد **أخطاء حدود (boundaries)**. وهذه هي النقطة: لا رأي لـ ESLint حاليًا في الانتهاكات المعمارية عابرة الحزم. تجاهل خطأ المتغيّرات غير المستخدمة في الوقت الحالي؛ وستزيل الاستيراد بعد قليل.

الآن جرّب انتهاكًا أسوأ. افتح `packages/shared/src/api-client.ts` وأضف:

*packages/shared/src/api-client.ts*

```typescript
import { AnalyticsDashboard } from '@pulse/analytics';
```

يخلق هذا اعتمادية دائرية — فـ `@pulse/shared` يستورد من `@pulse/analytics`، وهي نفسها تعتمد على `@pulse/shared`. لا يلتقط TypeScript هذا لأن حلّ مساحة العمل يتولّاه. وقد ينجح البناء حتى، حسب ترتيب التقييم. لكنه خطأ معماريًا.

> **الاعتماديات الدائرية**
>
> أولًا، يصبح ترتيب التهيئة غير قابل للتنبؤ: فحين تستورد الوحدة A الوحدة B وتستورد الوحدة B الوحدة A، سيرى أحدهما نسخة غير مكتملة (مُهيّأة جزئيًا) من الآخر عند الاستيراد، ما يؤدي إلى أخطاء `undefined` خفيّة لا تظهر إلا وقت التشغيل وتتوقف على أي وحدة يصادف أن يُقيّمها المُجمِّع (bundler) أولًا. ثانيًا، تجد المُجمِّعات صعوبة في تهذيب شجرة (tree-shake) مخططات الاعتماديات الدائرية لأنها لا تستطيع تحديد أي الصادرات غير مستخدمة فعلًا — فإن كانت A تشير إلى B وB تشير إلى A، فقد يكسر حذف أيّ منهما الآخر، فيحتفظ المُجمِّع بكل شيء على سبيل الاحتياط، فتتضخّم حزمة البناء. ثالثًا، تجعل الاعتماديات الدائرية النظام أصعب في الاستيعاب: لا يمكنك فهم الوحدة A دون فهم الوحدة B والعكس، ما يعني أن كل تغيير في أي منهما يتطلب التفكير في كليهما. وفي المستودع الأحادي، تكون الاعتمادية الدائرية بين الحزم خطيرة بشكل خاص لأنها تُبطل الغرض من وجود حزم منفصلة أصلًا — فهي لم تعد مفهومة أو قابلة للنشر باستقلال.

أزل كلا الاستيرادين. أنت على وشك جعل المدقّق يلتقطهما.

> **لماذا لا يلتقط TypeScript الانتهاكات المعمارية**
>
> مهمة TypeScript صحة الأنواع، لا الصحة المعمارية. فإن وُجد ملف وصدّر قيمة متوافقة من ناحية النوع، اعتبر TypeScript الاستيراد صالحًا. وهو لا يعرف ولا يهمّه أن `@pulse/shared` ينبغي ألا يستورد من `@pulse/analytics` — فتلك قيد معماري، لا قيد نوعي. ولهذا تحتاج أداة منفصلة (ESLint مع boundaries) لفرض مخطط الاعتماديات.

### نقطة تحقق

لقد تأكدت من أن الاستيرادات الداخلية عابرة الحزم والاعتماديات الدائرية تُصرَّف وتجتاز التدقيق دون أخطاء. المعمار غير مفروض.

## مخطط الاعتماديات المسموح

تُرمّز قواعد الحدود مخططًا موجّهًا للاستيرادات المسموحة. تحدد أنواع العناصر أصناف الشيفرة، وتحدد القواعد أي الأنواع يمكنها الاستيراد من أي. تمثّل الأسهم اتجاهات الاستيراد المسموحة — وكل ما لم يُعرض مرفوض افتراضيًا.

```
graph TD
    Test["test"]
    App["app"]
    Mock["mock"]
    Package["package"]

    Test -->|"allowed"| App
    Test -->|"allowed"| Package
    Test -->|"allowed"| Mock
    App -->|"allowed"| Package
    App -->|"allowed"| Mock
    Mock -->|"allowed"| Package
    Package -->|"allowed"| Package

    App x-.-x|"denied"| App
    Package x-.-x|"denied"| App
    Package x-.-x|"denied"| Mock
```

## تهيئة أنواع العناصر

افتح `eslint.config.js` في الجذر. ينبغي أن يحتوي على تهيئة ESLint أساسية لكن دون قواعد حدود. ستضيف إضافة (plugin) الحدود وتحدّد أنواع العناصر التي يتكوّن منها معمارك.

استورد إضافة الحدود في أعلى `eslint.config.js`:

*eslint.config.js*

```javascript
import boundaries from 'eslint-plugin-boundaries';
```

أضف كائن تهيئة إلى `eslint.config.js` يتضمّن الإضافة وإعدادات أنواع العناصر:

*eslint.config.js*

```javascript
export default [
  // ... existing config entries (keep these in place)
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'apps/*' },
        { type: 'package', pattern: 'packages/*' },
        { type: 'mock', pattern: 'mocks' },
        { type: 'test', pattern: 'tests/*' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
  },
];
```

*ملاحظة:* تحدّد أنواع العناصر المفردات المعمارية لقواعد الحدود لديك.

ثم أضف تهيئة محلّل الاستيراد (import resolver) إلى الكائن نفسه في `eslint.config.js` حتى تتمكن إضافة الحدود من ربط `@pulse/analytics` بـ `packages/analytics`. بدون هذا، لا تستطيع الإضافة تحديد نوع العنصر الذي ينتمي إليه الاستيراد فتتخطّى الفرض بصمت:

*eslint.config.js*

```javascript
{
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.base.json",
      },
    },
    "boundaries/elements": [
      { type: "app", pattern: "apps/*" },
      { type: "package", pattern: "packages/*" },
      { type: "mock", pattern: "mocks" },
      { type: "test", pattern: "tests/*" },
    ],
    "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
  },
}
```

*ملاحظة:* يربط المحلّل `@pulse/analytics` بـ `packages/analytics` حتى تستطيع الحدود تصنيف الاستيرادات.

> **محلّل الاستيراد مطلوب**
>
> تحلّ حزمة `eslint-import-resolver-typescript` معرّفات حزم مساحة العمل مثل `@pulse/analytics` إلى مسارات ملفاتها الفعلية (مثل `packages/analytics/src/index.ts`). بدونها، ترى إضافة الحدود استيرادًا من `@pulse/analytics` لكنها لا تستطيع ربطه بنوع العنصر `packages/*`، فتتخطّى الفحص كليًا. وهذا فشل صامت — ستظن أن الحدود مفروضة وهي ليست كذلك.

> **ما الذي تمثّله أنواع العناصر**
>
> يعرّف كل مدخل في `boundaries/elements` صنفًا من الشيفرة في مستودعك. الـ `pattern` نمط عام (glob) يطابق مسارات المجلدات — فـ `apps/*` يطابق `apps/dashboard` و`apps/legacy` ويصنّفهما من النوع `"app"`. ونمط `packages/*` يطابق `packages/analytics` و`packages/ui` وما إلى ذلك، ويصنّفها من النوع `"package"`. هذه الأنواع هي المفردات التي تستخدمها في قواعد الحدود: «يمكن للتطبيق أن يستورد من حزمة» أو «لا يمكن لحزمة أن تستورد من تطبيق».

> **لماذا نتجاهل ملفات الاختبار**
>
> يستثني إعداد `boundaries/ignore` ملفات الاختبار من فرض الحدود. غالبًا ما تحتاج الاختبارات إلى الاستيراد من طبقات متعددة — فقد يستورد اختبار `@pulse/analytics` معالِجات MSW من `mocks/` وبيانات تجريبية من `tests/`. وفرض حدود زمن الإنتاج على شيفرة الاختبار سيخلق احتكاكًا دون فائدة معمارية ذات معنى.

## حدّد الاعتماديات المسموحة

أضف قاعدة `boundaries/element-types` إلى كائن التهيئة نفسه في `eslint.config.js` لتحدّد أنواع العناصر المسموح لها بالاستيراد من أي أنواع:

*eslint.config.js*

```javascript
{
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.base.json",
      },
    },
    "boundaries/elements": [
      { type: "app", pattern: "apps/*" },
      { type: "package", pattern: "packages/*" },
      { type: "mock", pattern: "mocks" },
      { type: "test", pattern: "tests/*" },
    ],
    "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
  },
  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          { from: "app", allow: ["package", "mock"] },
          { from: "package", allow: ["package"] },
          { from: "test", allow: ["app", "package", "mock"] },
          { from: "mock", allow: ["package"] },
        ],
      },
    ],
  },
}
```

### ماذا تعني كل قاعدة

- **`default: "disallow"`**: إن لم تسمح قاعدة صراحةً باستيراد ما، فهو خطأ. هذا هو الرفض الافتراضي (deny-by-default)، وهو الافتراض الآمن للفرض المعماري.
- **`from: "app", allow: ["package", "mock"]`**: يمكن للتطبيقات أن تستورد من الحزم والبدائل المُحاكاة (mocks). ولا يمكنها الاستيراد من تطبيقات أخرى (ما يمنع الارتباط بين `apps/dashboard` و`apps/legacy`).
- **`from: "package", allow: ["package"]`**: يمكن للحزم أن تستورد من حزم أخرى. ولا يمكنها الاستيراد من التطبيقات أو البدائل المُحاكاة. هذا يمنع `@pulse/ui` من الاعتماد على `apps/dashboard`، وهو ما كان سيخلق اعتمادية صاعدة.
- **`from: "test", allow: ["app", "package", "mock"]`**: يمكن للاختبارات أن تستورد من أي شيء. فهي تحتاج الوصول إلى التطبيقات (لاختبارها)، والحزم (لاستخدامها)، والبدائل المُحاكاة (لبيانات الاختبار).
- **`from: "mock", allow: ["package"]`**: يمكن للبدائل المُحاكاة أن تستورد من الحزم (لاستخدام أنواعها) لكن لا من التطبيقات.

> **إعداد `default: "disallow"` حرج**
>
> بدونه، سيمرّ أي استيراد لا تغطّيه قاعدة بصمت. ومعه، تحصل على سلوك الفشل المُغلَق (fail-closed): فإن أضاف أحدهم نوع عنصر جديدًا (لنقل مجلد `scripts/`) دون تحديث قواعد الحدود، فسيُعلَّم أي استيراد من ذلك النوع أو إليه. وهذا يجبرك على أن تقرّر صراحةً ما يُسمح للنوع الجديد بالوصول إليه.

## اختبر قواعد أنواع العناصر

> **حلّ الاستيراد مهم**
>
> تعتمد إضافة الحدود على `eslint-import-resolver-typescript` لربط معرّفات الحزم (مثل `@pulse/analytics`) بمسارات الملفات. وفي مساحات عمل pnpm ذات الحلّ الصارم، لا يستطيع المحلّل حلّ إلا الحزم المُعلَنة كاعتماديات. يعني هذا أنه إن لم يُدرِج `@pulse/shared` الحزمة `@pulse/analytics` في `package.json` الخاص به، فلن يستطيع المحلّل ربط ذلك الاستيراد — وستتخطّى إضافة الحدود الفحص بصمت. تصف الخطوات أدناه السلوك *المقصود*. وقد لا ترى أخطاء التدقيق المتوقعة حسب تهيئة المحلّل لديك. وحتى حين لا تظهر الأخطاء في حالات الاختبار الاصطناعية هذه، فما زالت القواعد تقدّم قيمة بالتقاطها الانتهاكات حيث يستطيع محلّل الاستيراد حلّ المسار.

جرّب إضافة انتهاك معماري. افتح `packages/shared/src/api-client.ts` وأضف:

*packages/shared/src/api-client.ts*

```typescript
import { AnalyticsDashboard } from '@pulse/analytics';
```

شغّل المدقّق:

```bash
pnpm turbo lint
```

مع حلّ استيراد سليم، كان هذا سيُنتج خطأ حول الاعتماديات الدائرية — فـ `@pulse/shared` يستورد من `@pulse/analytics` بينما `@pulse/analytics` تعتمد على `@pulse/shared`. تلتقط قاعدة `boundaries/element-types` هذا لأن `default: "disallow"` يحجب أي استيراد يستطيع المحلّل تصنيفه ولم يُسمح به صراحةً.

أزل ذلك الانتهاك، ثم جرّب انتهاكًا آخر. افتح `packages/ui/src/button.tsx` وأضف:

*packages/ui/src/button.tsx*

```typescript
import { App } from '@pulse/dashboard/src/app';
```

شغّل التدقيق مرة أخرى. استيراد حزمة من تطبيق كان سيؤدي إلى:

```
error  Importing elements of type "app" is not allowed
       from elements of type "package"
       boundaries/element-types
```

أزل الانتهاك.

### نقطة تحقق

قواعد أنواع العناصر مُهيّأة. شغّل `pnpm turbo lint` وتأكد من نجاح كل الحزم دون انتهاكات (بعد إزالة استيرادات الاختبار).

مخرَج التدقيق يبيّن خطأ انتهاك حدود

## أضف قاعدة `no-private`

تفرض قواعد أنواع العناصر مخطط الاعتماديات بين الحزم. لكنها لا تمنع الامتداد إلى داخليات الحزمة. ما زال بإمكانك أن تفعل:

```typescript
import { StatsBar } from '@pulse/analytics/src/stats-bar';
```

يمرّ هذا من الواجهة البرمجية العامة المعرّفة في `@pulse/analytics/src/index.ts`. أضف قاعدة لمنعه.

أضف `boundaries/no-private` إلى كائن القواعد في `eslint.config.js`:

*eslint.config.js*

```javascript
rules: {
  "boundaries/element-types": [
    "error",
    {
      default: "disallow",
      rules: [
        { from: "app", allow: ["package", "mock"] },
        { from: "package", allow: ["package"] },
        { from: "test", allow: ["app", "package", "mock"] },
        { from: "mock", allow: ["package"] },
      ],
    },
  ],
  "boundaries/no-private": ["error"],
},
```

*ملاحظة:* يمنع الاستيرادات العميقة التي تتجاوز الواجهة البرمجية العامة للحزمة.

اختبرها بفتح `apps/dashboard/src/routes/analytics.tsx` وإضافة:

*apps/dashboard/src/routes/analytics.tsx*

```typescript
import { StatsBar } from '@pulse/analytics/src/stats-bar';
```

شغّل التدقيق:

```bash
pnpm turbo lint
```

مع حلّ سليم، كان هذا سيُنتج:

```
error  Importing private elements of "@pulse/analytics" is not allowed.
       Only public entry points can be imported.
       boundaries/no-private
```

الاستيراد من `@pulse/analytics` (باستخدام الواجهة البرمجية العامة) يعمل بلا مشكلة. والاستيراد من `@pulse/analytics/src/stats-bar` (بتجاوز الواجهة العامة) يُعدّ خاصًا لأنه لا يطابق نقطة الدخول المُعلَنة للحزمة.

> **قاعدة `no-private` تعتمد على تهيئة نمط العناصر**
>
> إن لم تستطع إضافة الحدود إقامة علاقة أب-ابن بين `@pulse/analytics` والمسار الفرعي `@pulse/analytics/src/stats-bar`، فقد لا تُفعَّل القاعدة. وتوفّر قاعدة `boundaries/entry-point` (المذكورة في الأهداف الإضافية) بديلًا أكثر متانة لفرض حدود الواجهة البرمجية العامة.

أزل الانتهاك.

> **كيف تحدّد `no-private` ما هو خاص**
>
> تنظر القاعدة إلى نقطة دخول الحزمة — حقل `main` أو `exports` في `package.json`. فإن لم يطابق مسار الاستيراد نقطة دخول مُعلَنة، عُدّ خاصًا. وبما أن `@pulse/analytics` لا تملك سوى `"main": "./src/index.ts"`، فالاستيراد الصالح الوحيد هو `import { ... } from "@pulse/analytics"`. وأي مسار أعمق مثل `@pulse/analytics/src/stats-bar` خاص. وهذا هو الحدّ نفسه الذي عرّفته معماريًا حين اخترت تصدير `AnalyticsDashboard` فقط من `index.ts` — والآن يفرضه المدقّق.

### نقطة تحقق

ينجح `pnpm turbo lint` دون انتهاكات. الاستيراد من `@pulse/analytics` يعمل، لكن الاستيراد من `@pulse/analytics/src/stats-bar` يُفعّل خطأ تدقيق. حدّ الواجهة البرمجية العامة مفروض.

## تحقّق من التهيئة الكاملة

شغّل تمريرة التدقيق الكاملة للتأكد من أن كل شيء نظيف:

```bash
pnpm turbo lint
```

ينبغي أن تنجح كل الحزم. وينبغي أن يتضمّن ملف `eslint.config.js` النهائي ما يلي:

*eslint.config.js*

```javascript
import boundaries from 'eslint-plugin-boundaries';

export default [
  // ... existing config entries
  {
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.base.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'apps/*' },
        { type: 'package', pattern: 'packages/*' },
        { type: 'mock', pattern: 'mocks' },
        { type: 'test', pattern: 'tests/*' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['package', 'mock'] },
            { from: 'package', allow: ['package'] },
            { from: 'test', allow: ['app', 'package', 'mock'] },
            { from: 'mock', allow: ['package'] },
          ],
        },
      ],
      'boundaries/no-private': ['error'],
    },
  },
];
```

### نقطة تحقق

تهيئة الحدود الكاملة في مكانها. يمكن للتطبيقات أن تستورد من الحزم. ويمكن للحزم أن تستورد من حزم أخرى. ولا يستطيع أحد استيراد الداخليات الخاصة. المعمار مُرمَّز في الأدوات.

مخرَج تدقيق نظيف دون انتهاكات حدود

## الحل

إن احتجت إلى اللحاق بالركب، تتوفّر الحالة المكتملة لهذا التمرين على فرع `06-design-system-start`:

```bash
git checkout 06-design-system-start
pnpm install
```

## أهداف إضافية

- **الاستيرادات الخارجية الممنوعة:** أضف قاعدة ESLint تمنع أي حزمة عدا `@pulse/shared` من استيراد `lodash` مباشرةً. يجب أن تمرّ كل استخدامات الأدوات المساعدة عبر أغلفة مشتركة. هكذا تمنع وجود 12 نسخة من lodash في مستودعك الأحادي.
- **قاعدة `boundaries/entry-point`:** هيّئ قيود نقاط الدخول بحيث لا يمكن استيراد `@pulse/analytics` إلا عبر اسم حزمتها الأعلى، لا عبر مسارات فرعية مثل `@pulse/analytics/src/index`.
- **قاعدة مخصّصة لـ `displayName`:** اكتب قاعدة ESLint بسيطة تفرض أن تملك كل مكوّنات React المُصدَّرة خاصية `displayName`. يساعد هذا في التنقيح في React DevTools وحدود الأخطاء.

## ما التالي

لديك الآن فحص الأنواع، والتخزين المؤقت للبناء، والتدقيق المعماري، وكلها تعمل محليًا. لكن لا شيء من هذا يعمل تلقائيًا على طلبات السحب (pull requests). في التمرين التالي، ستبني خط أنابيب CI بـ GitHub Actions يستخدم Turborepo للتخزين المؤقت ويشغّل فحص الأنواع والتدقيق والاختبار والبناء عند كل دفع.
