---
title: "التمرين 5: مراجع TypeScript"
---

## ما الذي تفعله

يفحص TypeScript حاليًا كل حزمة باستقلال دون فحص تزايدي عبر حدود الحزم. وتغيير نوع في `@pulse/shared` يفرض إعادة فحص كاملة لكل حزمة تستوردها. وأنت ستضيف `composite: true` ومصفوفات `references` إلى ملف `tsconfig.json` لكل حزمة كي يستطيع TypeScript تتبّع الاعتمادات العابرة للحزم وتخطي إعادة فحص الحزم التي لم تتغيّر مدخلاتها.

## لماذا يهمّ

في مستودع أحادي بخمس حزم، يستغرق فحص الأنواع الكامل ثوانٍ. وفي مستودع بخمسين حزمة يستغرق دقائق. وميزة مراجع المشاريع في TypeScript (تركيب `composite` مع `references`) تمكّن التصريف التزايدي: فيولّد TypeScript ملفات `.tsbuildinfo` تسجّل ما فُحص وما كانت النتائج. وفي التشغيل التالي، يعيد فحص الحزم التي تغيّرت ملفاتها المصدرية أو ملفات تعريفاتها الأعلى فقط. وهذا هو الفرق بين فحص أنواع يعطّل سير عملك وآخر تكاد لا تلاحظه.

## المتطلبات المسبقة

- Node.js 20+
- pnpm 9+

## الإعداد

ينبغي أن تكون مكملًا من حيث انتهى التمرين 4. وإن احتجت إلى اللحاق بالركب:

```bash
git checkout 05-typescript-start
pnpm install
```

## قِس خط الأساس

شغّل فحص الأنواع لترى كم يستغرق دون مراجع المشاريع.

شغّل فحص الأنواع عبر كل الحزم:

```bash
pnpm turbo typecheck
```

لاحظ الزمن الكامل. فكل حزمة تشغّل `tsc --noEmit` باستقلال. ولا توجد حالة تزايدية — كل تشغيل يبدأ من الصفر.

> **`tsc --noEmit` و`tsc --build`**
>
> يشغّل `tsc --noEmit` فاحص الأنواع على مشروع واحد ويبلّغ بالأخطاء، لكنه لا يُنتج ملفات مخرجات — لا `.js`، ولا `.d.ts`، ولا `.tsbuildinfo`. إنه تمرير تحقق لمرة واحدة يبدأ من الصفر في كل مرة. أما `tsc --build` (أو `tsc -b`) فواعٍ بالمشاريع وتزايدي: يقرأ مصفوفة `references` في `tsconfig.json`، ويبني المشاريع بترتيب الاعتمادات، ويولّد ملفات التعريفات وبيانات `.tsbuildinfo` الوصفية، ويتخطى في التشغيلات التالية أي مشروع لم تتغيّر مدخلاته. والفرق الجوهري أن `--build` يفهم العلاقة بين المشاريع في المستودع الأحادي، بينما يعامل `--noEmit` كل استدعاء كفحص أنواع معزول بلا ذاكرة لتشغيلات سابقة. وستنتقل من `--noEmit` إلى `--build` لاحقًا في هذا التمرين لتُفعّل فحص الأنواع التزايدي عبر الحزم.

شغّله مجددًا:

```bash
pnpm turbo typecheck
```

يخزّن Turborepo النتيجة مؤقتًا، فالتشغيلة الثانية سريعة. لكن هذا مخزن Turborepo المؤقت، لا مخزن TypeScript. فإن غيّرت نوعًا في `@pulse/shared`، يُبطل Turborepo المخزن المؤقت لكل حزمة أسفلها، ويعيد TypeScript فحصها كلها من الصفر.

> **تخزين Turborepo المؤقت مقابل بناءات TypeScript التزايدية**
>
> هما متكاملان لا متكرران. يخزّن Turborepo النتائج على مستوى المهمة — فإن لم تتغيّر مدخلات `@pulse/analytics:typecheck`، يعيد تشغيل نتيجتها. لكن عندما *تتغيّر* المدخلات، يشغّل Turborepo أمر فحص الأنواع كاملًا من الصفر. أما بناءات TypeScript التزايدية (عبر `.tsbuildinfo`) فتخزّن على حبيبات أدقّ — معلومات أنواع على مستوى الملف الفردي. فحتى عندما يقرّر Turborepo أن فحصًا يحتاج إلى إعادة تشغيل، يستطيع TypeScript تخطي الملفات غير المتغيرة داخل تلك الحزمة. ومعًا، يقلّلان العمل على مستويين مختلفين.

### نقطة تحقّق

قِست زمن فحص الأنواع الأساسي. وكل حزمة تُفحص باستقلال بلا حالة تزايدية.

## كيف تعمل مراجع المشاريع

تنشئ مراجع مشاريع TypeScript رسمًا بيانيًا للبناء يحاكي اعتمادات حزمك. وكل حزمة تولّد ملفات تعريفات `.d.ts` تقرؤها الحزم الأسفل بدل إعادة تحليل المصدر. وعندما لا تتغيّر تعريفات حزمة أعلى، تتخطى الحزم الأسفل إعادة فحصها تمامًا.

```
graph TD
    Shared["@pulse/shared\ncomposite → .d.ts + .tsbuildinfo"]
    UI["@pulse/ui\nreferences: shared"]
    Analytics["@pulse/analytics\nreferences: ui, shared"]
    Users["@pulse/users\nreferences: ui, shared"]
    Dashboard["apps/dashboard\nreferences: all packages"]

    Dashboard --> Analytics
    Dashboard --> Users
    Dashboard --> UI
    Dashboard --> Shared
    Analytics --> UI
    Analytics --> Shared
    Users --> UI
    Users --> Shared
    UI --> Shared
```

## أضف `composite: true` إلى كل حزمة

يخبر علم `composite` TypeScript أن هذا المشروع جزء من بناء أكبر وأنه ينبغي أن يولّد البيانات الوصفية اللازمة للتصريف التزايدي.

افتح `packages/shared/tsconfig.json`. ينبغي أن يبدو هكذا:

*packages/shared/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

أضف `"composite": true` و`"declaration": true` إلى `compilerOptions`:

*packages/shared/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "include": ["src"],
}
```

*ملاحظة:* يفعّل هذان الحقلان فحص الأنواع التزايدي عبر الحزم.

> **`composite: true` تشترط `declaration: true`**
>
> عندما تكون الحزمة مركّبة (composite)، يولّد TypeScript ملفات تعريفات `.d.ts` إلى جانب مخرجاتها. وتقرأ الحزم الأسفل هذه التعريفات بدل إعادة تحليل ملفات المصدر. وهذا ما يجعل الفحص التزايدي عبر الحزم ممكنًا — يقارن TypeScript مخرَج التعريفات الحالي بـ`.tsbuildinfo` من التشغيل السابق ويعيد الفحص فقط إن تغيّرت التعريفات. وبلا `declaration: true`، لا يملك TypeScript أثرًا مستقرًا يقارن به.

> **ملفات التعريفات**
>
> يحتوي ملف `.d.ts` على تواقيع الأنواع لكل دالة وصنف وواجهة ومتغيّر مُصدَّر، لكن بلا شيفرة تنفيذ — لا أجساد دوال، ولا تعبيرات، ولا منطق وقت تشغيل. وعندما يفحص TypeScript ملفًا يستورد من حزمة أخرى، يقرأ ملف التعريفات بدل إعادة تحليل الشيفرة المصدرية كاملة وتحليلها من جديد. وهذا أسرع كثيرًا لأن ملفات التعريفات أصغر ومحلولة بالكامل — بلا حاجة إلى استنتاج الأنواع. وفي مستودع أحادي بـ`composite: true`، يولّد TypeScript ملفات التعريفات هذه تلقائيًا ويستخدمها «عقدًا» بين المشاريع: فإن لم يتغيّر ملف تعريفات منذ آخر بناء، تستطيع المشاريع الأسفل تخطي إعادة الفحص تمامًا.

سطرا `"composite": true` و`"declaration": true` هما التغييران الوحيدان—وكل ما عداهما في كل `tsconfig.json` يبقى كما هو.

كرّر ذلك لكل حزمة. أضف `"composite": true` و`"declaration": true` إلى:

- `packages/ui/tsconfig.json`
- `packages/analytics/tsconfig.json`
- `packages/users/tsconfig.json`
- `apps/dashboard/tsconfig.json`

> **`composite` تفرض أيضًا نظافة مشاريع أصرم**
>
> عند تفعيلها، يشترط TypeScript أن يكون كل ملف تطابق `include` جزءًا فعليًا من التصريف — بلا ملفات شاردة. ويشترط أيضًا ضبط `rootDir` كي تكون مسارات ملفات التعريفات متوقّعة. وإن رأيت أخطاءً عن ملفات غير مشمولة في التصريف، فافحص أنماط `include` لديك. وهذه الصرامة مقصودة: فهي تضمن أن لكل مشروع حدودًا محدّدة جيدًا، وهذا بالضبط ما تريده في مستودع أحادي.

## أضف مصفوفات `references`

تخبر المراجع TypeScript أي المشاريع الأخرى تعتمد عليها الحزمة. وهذا يحاكي رسم الاعتمادات في ملفات `package.json` لديك.

لا يحتاج `packages/shared/tsconfig.json` إلى مراجع. فهي حزمة ورقية بلا اعتمادات داخلية:

*packages/shared/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

ويشير `packages/ui/tsconfig.json` إلى `@pulse/shared`:

*packages/ui/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "include": ["src"],
  "references": [{ "path": "../shared" }],
}
```

*ملاحظة:* يعلن الاعتماد على `@pulse/shared` على مستوى TypeScript.

ويشير `packages/analytics/tsconfig.json` إلى `@pulse/ui` و`@pulse/shared`:

*packages/analytics/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "include": ["src"],
  "references": [
    { "path": "../ui" },
    { "path": "../shared" },
  ],
}
```

*ملاحظة:* حاكِ الاعتمادات من `package.json` كي يبني tsc بالترتيب الصحيح.

ويحصل `packages/users/tsconfig.json` على المراجع نفسها التي في analytics:

*packages/users/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "include": ["src"],
  "references": [
    { "path": "../ui" },
    { "path": "../shared" },
  ],
}
```

*ملاحظة:* المراجع نفسها التي في analytics — فكلا حزمتَي الميزة تعتمدان على ui وshared.

ويشير `apps/dashboard/tsconfig.json` إلى كل الحزم:

*apps/dashboard/tsconfig.json*

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
  },
  "include": ["src"],
  "references": [
    { "path": "../../packages/analytics" },
    { "path": "../../packages/users" },
    { "path": "../../packages/ui" },
    { "path": "../../packages/shared" },
  ],
}
```

> **يجب أن تطابق المراجع رسم اعتماداتك الفعلي**
>
> إن كان `packages/analytics/package.json` يدرج `@pulse/ui` كاعتماد، فيجب أن يضم `packages/analytics/tsconfig.json` المدخل `{ "path": "../ui" }` في مراجعه. وأي عدم تطابق يعني أن TypeScript إما يفوّت اعتمادًا (ما يؤدي إلى معلومات أنواع قديمة) وإما يعلن اعتمادًا غير موجود (ما يؤدي إلى إعادة فحص غير ضرورية). ومصفوفة المراجع هي المرآة على مستوى TypeScript لاعتمادات `package.json` لديك.

## أنشئ تهيئة بناء جذرية

أنشئ أو حدّث `tsconfig.json` في جذر المستودع كي يعرف `tsc --build` بكل المشاريع:

*tsconfig.json*

```json
{
  "files": [],
  "references": [
    { "path": "packages/shared" },
    { "path": "packages/ui" },
    { "path": "packages/analytics" },
    { "path": "packages/users" },
    { "path": "apps/dashboard" },
  ],
}
```

*ملاحظة:* لا ملفات تُصرَّف هنا — إنها مجرد نقطة دخول لـ`tsc --build`.

> **`"files": []` مقصودة**
>
> لا يصرّف `tsconfig.json` الجذري أي ملفات بنفسه — إنه يعمل كنقطة دخول فقط تخبر `tsc --build` أي المشاريع موجودة. و`files: []` يمنع TypeScript من محاولة تصريف أي شيء في المجلد الجذري. وملف `tsconfig.json` الخاص بكل مشروع (بنمط `include` فيه) هو ما يحدّد ما يُصرَّف.

## شغّل `tsc --build`

شغّل بناء TypeScript من الجذر:

```bash
npx tsc --build
```

يعالج TypeScript كل مشروع بترتيب الاعتمادات: `@pulse/shared` أولًا (بلا اعتمادات)، ثم `@pulse/ui`، ثم `@pulse/analytics` و`@pulse/users` (ويمكن أن يعملا بالتوازي لأن إحداهما لا تعتمد على الأخرى)، ثم `apps/dashboard` أخيرًا.

وتحقّق من ملفات `.tsbuildinfo`:

```bash
ls packages/shared/*.tsbuildinfo
ls packages/ui/*.tsbuildinfo
ls packages/analytics/*.tsbuildinfo
```

صار لكل حزمة الآن ملف `.tsbuildinfo` يسجّل حالة التصريف.

شغّل `tsc --build` مجددًا:

```bash
npx tsc --build
```

وينبغي أن تكون التشغيلة الثانية أسرع بشكل ملحوظ. فيقرأ TypeScript كل ملف `.tsbuildinfo`، ويقارنه بالمصدر الحالي، ويتخطى المشاريع التي لم يتغيّر فيها شيء.

### نقطة تحقّق

يكتمل `tsc --build` بنجاح. ولكل حزمة ملف `.tsbuildinfo`. والتشغيلة الثانية أسرع لأن TypeScript يستخدم حالة تزايدية.

![أول تشغيل لـ`tsc --build` يعالج كل المشاريع](/images/kinney/60b0ceca38528002.webp)

![تشغيلات لاحقة لـ`tsc --build` بفحص تزايدي](/images/kinney/cfdc7dab2b7f9f11.webp)

## اختبر إعادة الفحص التزايدي

عندما تغيّر نوعًا في `@pulse/shared`، تنتشر السلسلة عبر رسم المراجع. ولا يُعاد فحص إلا الحزم التي لها مسار اعتماد إلى الحزمة المتغيرة — وكل ما عداها يُتخطّى.

```
flowchart TD
    Change["Change User interface\nin @pulse/shared"]
    Shared["@pulse/shared\n.d.ts output changes"]
    UI["@pulse/ui\nreads shared .d.ts"]
    Analytics["@pulse/analytics\nreads shared + ui .d.ts"]
    Users["@pulse/users\nreads shared + ui .d.ts"]
    Dashboard["apps/dashboard\nreads all .d.ts"]

    Change --> Shared
    Shared -->|".d.ts changed"| UI
    Shared -->|".d.ts changed"| Analytics
    Shared -->|".d.ts changed"| Users
    UI --> Dashboard
    Analytics --> Dashboard
```

افتح `packages/shared/src/types.ts` وأضف حقلًا جديدًا إلى واجهة `User`:

*packages/shared/src/types.ts*

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  avatar?: string;
  createdAt: string;
  department?: string;
}
```

*ملاحظة:* إضافة حقل مُصدَّر جديد تغيّر مخرَج .d.ts وتُطلق إعادة فحص للحزم الأسفل.

شغّل `tsc --build` وراقب المخرَج:

```bash
npx tsc --build --verbose
```

يعرض علم `--verbose` أي المشاريع تُفحص وأيها يُتخطّى. وينبغي أن ترى:

- `@pulse/shared` — أُعيد فحصها (تغيّر المصدر)
- `@pulse/ui` — أُعيد فحصها (تعتمد على `@pulse/shared`، التي تغيّرت تعريفاتها)
- `@pulse/analytics` — أُعيد فحصها (السبب نفسه)
- `@pulse/users` — أُعيد فحصها (السبب نفسه)
- `@pulse/dashboard` — أُعيد فحصها (تعتمد على كل شيء)

> **لماذا يُعاد فحص كل شيء عندما تغيّر نوعًا مشتركًا**
>
> واجهة `User` مُصدَّرة من `@pulse/shared`، ما يعني أن ملف `.d.ts` المولَّد يتغيّر. وكل مشروع يشير إلى `@pulse/shared` يقرأ هذه التعريفات، فتتغيّر تجزئة مدخلاته أيضًا. وهذا صحيح — فتغيير نوع في شيفرة مشتركة قد يُدخل أخطاءً في أي مكان. لكن إن غيّرت تفصيلًا تنفيذيًا *غير مُصدَّر* في `@pulse/shared` (مثل دالة مساعدة خاصة)، فلا تتغيّر التعريفات، وتتخطى المشاريع الأسفل إعادة الفحص تمامًا.

والآن أجرِ تغييرًا لا يؤثر في الواجهة البرمجية العامة. افتح `packages/ui/src/button.tsx` وأضف تعليقًا:

```typescript
// Internal styling update
```

شغّل `tsc --build --verbose` مجددًا. هذه المرة، ينبغي أن يُعاد فحص `@pulse/ui` والمعتمَدات عليها فقط. أما `@pulse/shared` فتُتخطّى لأنها لم تتغيّر.

أعِد التغييرين عند الانتهاء.

### نقطة تحقّق

تغيير نوع في `@pulse/shared` يدفع كل الحزم الأسفل إلى إعادة الفحص. وتغيير ملف داخلي في `@pulse/ui` يعيد فحص `@pulse/ui` والمعتمَدات عليها فقط، لا `@pulse/shared`. فالفحص التزايدي يعمل.

## الحل

إن احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة في فرع `06-linting-start`:

```bash
git checkout 06-linting-start
pnpm install
```

## أهداف إضافية

- **قِس التسريع:** أضف 10 واجهات أخرى إلى `@pulse/shared/src/types.ts`، وشغّل `tsc --build` لملء المخزن المؤقت، ثم غيّر واجهة واحدة وشغّل `tsc --build --verbose` مجددًا. فمع مزيد من المشاريع والأنواع، يصير التسريع التزايدي أكثر وضوحًا.
- **`declarationMap`:** أضف `"declarationMap": true` إلى `compilerOptions`. يولّد هذا ملفات `.d.ts.map` تتيح لمحرّرك «الانتقال إلى التعريف» على نوع من `@pulse/shared` والقفز إلى مصدر `.ts` الفعلي، لا إلى مخرَج `.d.ts`.
- **أسماء المسارات البديلة:** هيّئ أسماء مسارات بديلة في `tsconfig.base.json` كي يُحلّ `@pulse/shared` بنظافة دون مسارات نسبية. وتحقّق من أن كلا الأمرين `tsc --build` وVite يحلّان الأسماء البديلة بشكل صحيح.

## ما التالي

يفحص TypeScript الآن تزايديًا عبر حدود الحزم. لكن لا شيء يمنع الشيفرة من خرق تلك الحدود — فما زال بوسعك استيراد ملفات داخلية من حزمة أخرى، ولا يوجد فرض لرسم الاعتمادات على مستوى lint. وفي التمرين التالي، ستهيّئ `eslint-plugin-boundaries` لالتقاط المخالفات المعمارية قبل وصولها إلى مراجعة الشيفرة.
