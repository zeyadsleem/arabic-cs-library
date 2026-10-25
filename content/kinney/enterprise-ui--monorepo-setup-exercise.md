---
title: "التمرين 4: إعداد المستودع الأحادي"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/monorepo-setup-exercise"
---

تضم مساحة العمل أربع حزم (`analytics` و`users` و`ui` و`shared`) وتطبيق لوحة معلومات، لكن لا يوجد تنسيق للبناء. وتشغيل `pnpm -r build` يعيد بناء كل شيء في كل مرة، حتى الحزم غير المتغيرة. وأنت ستنشئ تهيئة `turbo.json` وتربط Turborepo كي تصير البناءات مخزّنة مؤقتًا وواعية بالاعتمادات وسريعة.

## لماذا يهمّ

بلا منسّق بناء، تبدأ كل تشغيلة CI وكل بناء محلي من الصفر. وفي مستودع أحادي بخمس حزم يستغرق ذلك ثوانٍ؛ وفي مستودع بخمسين حزمة يستغرق دقائق. ويعني التجزئة الواعية بالمحتوى في Turborepo أن بناءً نجح سابقًا بالمدخلات نفسها لا يُعاد أبدًا. فالبناء الثاني مجاني. وتغيير حزمة ورقية واحدة يعيد بناء المعتمَدات عليها فقط، لا الرسم البياني كامل. وهذه هي الأداة التي تجعل المستودعات الأحادية مجدية على نطاق واسع.

> **ملاحظة**
>
> في هذه المرحلة، تضم مساحة العمل `packages/users` — حزمة ميزة لإدارة المستخدمين. وهي تتبع النمط نفسه الذي يتبعه `packages/analytics`: ملف `package.json` خاص بها، و`tsconfig.json`، و`src/index.ts` بواجهة برمجية عامة صريحة.

## اشعر بالمشكلة

شغّل البناء دون Turborepo لتفهم ما الذي تصلحه.

شغّل البناء عبر كل حزم مساحة العمل:

```bash
pnpm -r build
```

لاحظ المخرَج — كل حزمة تُبنى بالتتابع. ولاحظ كم يستغرق.

والآن شغّله مجددًا فورًا، دون تغيير أي شيء:

```bash
pnpm -r build
```

الوقت نفسه. المخرَج نفسه. أُعيد بناء كل حزمة رغم أن شيئًا لم يتغيّر. فعلم `--recursive` في pnpm بلا تخزين مؤقت — إنه يشغّل سكربت `build` في كل حزمة لديها واحد فقط.

> **لماذا لا تكفي pnpm وحدها**
>
> تتولّى مساحات عمل pnpm حلّ الحزم وربط الاعتمادات — فهي تضمن أن `@pulse/analytics` يستطيع استيراد `@pulse/ui` عبر بروتوكول مساحة العمل (`workspace:*`). لكن pnpm ليس له رأي في تنسيق المهام. فهو لا يعرف أن `@pulse/analytics` يعتمد على `@pulse/ui`، وأنه لذلك يجب بناء `@pulse/ui` أولًا. ولا يخزّن المخرجات مؤقتًا. ولا يتخطى الحزم غير المتغيرة. وهذا ما يضيفه منسّق بناء مثل Turborepo فوق ذلك.

### نقطة تحقّق

شغّلت `pnpm -r build` مرتين واستغرقت التشغيلتان وقتًا متقاربًا. لا تخزين مؤقت، ولا ترتيب اعتمادات، ولا توازٍ.

## كيف ينسّق Turborepo البناءات

يقرأ Turborepo رسم الاعتمادات من ملفات `package.json` لديك ويستخدم سابقة `^` في `dependsOn` لتحديد ترتيب البناء. وتُبنى الحزم في العمق نفسه بالتوازي. ويخزّن المخزن المؤقت المخرجات بمفاتيح من تجزئة مدخلات كل حزمة.

```
graph TD
    Shared["@pulse/shared"]
    UI["@pulse/ui"]
    Analytics["@pulse/analytics"]
    Users["@pulse/users"]
    Dashboard["@pulse/dashboard"]

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

```
flowchart LR
    subgraph Inputs
        Src["Source Files"]
        Deps["Dependency Hashes"]
        Env["Environment Variables"]
        Lock["Lockfile Entries"]
        Config["turbo.json Task Config"]
    end

    Hash["Content Hash"]
    Cache{{"Cache Lookup"}}
    Hit["Cache Hit → Restore dist/ + replay logs"]
    Miss["Cache Miss → Execute build → Store in cache"]

    Src --> Hash
    Deps --> Hash
    Env --> Hash
    Lock --> Hash
    Config --> Hash
    Hash --> Cache
    Cache -->|"match"| Hit
    Cache -->|"no match"| Miss
```

## ثبّت Turborepo وأنشئ `turbo.json`

ثبّت Turborepo كاعتماد تطوير في جذر مساحة العمل:

```bash
pnpm add -Dw turbo
```

أنشئ `turbo.json` في جذر المستودع:

*turbo.json*

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

*ملاحظة:* سابقة ^ تبني الاعتمادات أولًا. و«outputs» تخبر Turborepo بما يخزّنه مؤقتًا.

*ملاحظة:* لا ينبغي تخزين خوادم التطوير طويلة التشغيل مؤقتًا أبدًا.

### ماذا يعني كل حقل

- **`"dependsOn": ["^build"]`**: سابقة `^` تعني «شغّل هذه المهمة في اعتماداتي أولًا». فقبل بناء `@pulse/analytics`، يتأكد Turborepo أن `@pulse/ui` و`@pulse/shared` بُنيتا سابقًا. وبلا السابقة، سيعني `dependsOn: ["build"]` «شغّل build في *هذه* الحزمة أولًا» (اعتماد على الذات، وهو عادةً ليس ما تريد).
- **`“outputs”: [“dist/**”]`**: يخبر Turborepo أي الملفات يخزّن. فبعد بناء ناجح، يجزّئ المدخلات (ملفات المصدر، والاعتمادات، ومتغيّرات البيئة) ويخزّن المخرجات. وفي التشغيل التالي بالمدخلات نفسها، يعيد تشغيل المخرجات المخزّنة بدل تنفيذ البناء مجددًا.
- **`"lint": {}`**: بلا `dependsOn`، وبلا `outputs`. ففحص كل حزمة مستقل — لا تحتاج إلى فحص الاعتمادات أولًا، ولا شيء يُخزَّن مؤقتًا أبعد من نتيجة النجاح أو الفشل.
- **`"cache": false`**: يجب ألا تُخزَّن مهمة `dev` مؤقتًا أبدًا. فهي عملية طويلة التشغيل (خادم تطوير)، لا أمرًا لمرة واحدة.
- **`"persistent": true`**: يخبر Turborepo أن `dev` عملية طويلة التشغيل لا تنتهي. وبدونه، سينتظر Turborepo انتهاءها قبل تشغيل المهام المعتمدة (وهو ما سيتعلّق إلى الأبد).

> **سابقة `^` أهم مفهوم في Turborepo**
>
> إنها ترمّز رسم الاعتمادات في خط أنابيب مهامك. فعندما تشغّل `turbo build`، يقرأ Turborepo ملف `package.json` لكل حزمة ليبني رسم الاعتمادات، ثم يستخدم `^build` لتحديد ترتيب التنفيذ. فـ`@pulse/shared` بلا اعتمادات، فتُبنى أولًا. و`@pulse/ui` تعتمد على `@pulse/shared`، فتُبنى ثانيًا. و`@pulse/analytics` تعتمد على الاثنتين، فتُبنى ثالثًا. ولوحة المعلومات تعتمد على كل شيء، فتُبنى أخيرًا. ويشغّل Turborepo الحزم في العمق نفسه بالتوازي — فيمكن بناء `@pulse/ui` و`@pulse/users` في الوقت نفسه لأن إحداهما لا تعتمد على الأخرى.

## حدّث سكربتات `package.json` في الجذر

افتح `package.json` الجذري واستبدل قسم `scripts` القائم. كانت السكربتات القديمة تشغّل أوامر pnpm مباشرة — أما الجديدة فتفوّض الأمر إلى Turborepo:

*package.json*

```json
{
  "scripts": {
    "build": "turbo build",
    "typecheck": "turbo typecheck",
    "lint": "turbo lint",
    "test": "turbo test",
    "dev": "turbo dev",
  },
}
```

*ملاحظة:* كل السكربتات الآن تفوّض الأمر إلى Turborepo بدل تشغيل pnpm -r مباشرةً.

الآن يفوّض `pnpm build` الأمر إلى Turborepo بدل تشغيل السكربتات مباشرةً.

> **ملاحظة**
>
> **ما زال بوسعك استخدام مرشّحات pnpm إلى جانب Turborepo.** فتشغيل `pnpm turbo build --filter=@pulse/analytics` يبني `@pulse/analytics` واعتماداتها فقط. وتشغيل `pnpm turbo build --filter=@pulse/analytics...` (باللاحقة `...`) يبني `@pulse/analytics` وكل ما يعتمد عليها. وبهذه المرشّحات تبني خطوط CI ما غيّره طلب سحب فقط.

## شغّل Turborepo لأول مرة

شغّل البناء عبر Turborepo:

```bash
pnpm turbo build
```

راقب المخرَج. يطبع Turborepo كل مهمة أثناء تشغيلها، عارضًا ترتيب الاعتمادات:

```
@pulse/shared:build: cache miss, executing
@pulse/legacy:build: cache miss, executing
@pulse/ui:build: cache miss, executing
@pulse/analytics:build: cache miss, executing
@pulse/users:build: cache miss, executing
@pulse/dashboard:build: cache miss, executing
```

كل مهمة تقول «cache miss» لأن هذه أول تشغيلة — لا يوجد مخزن مؤقت بعد.

شغّله مجددًا فورًا:

```bash
pnpm turbo build
```

الآن يختلف المخرَج:

```
@pulse/shared:build: cache hit, replaying logs
@pulse/legacy:build: cache hit, replaying logs
@pulse/ui:build: cache hit, replaying logs
@pulse/analytics:build: cache hit, replaying logs
@pulse/users:build: cache hit, replaying logs
@pulse/dashboard:build: cache hit, replaying logs

 Tasks:    6 successful, 6 total
Cached:    6 cached, 6 total
  Time:    103ms >>> FULL TURBO
```

كل مهمة تعرض «cache hit». وينخفض الزمن الكامل إلى أقل من ثانية. و`FULL TURBO` تعني أن كل مهمة جاءت من المخزن المؤقت.

> **كيف يعمل المخزن المؤقت في Turborepo**
>
> لكل مهمة، يحسب Turborepo تجزئة من:
>
> 1. ملفات المصدر في الحزمة
> 2. تجزئات كل حزم الاعتماد
> 3. تعريف المهمة في `turbo.json`
> 4. متغيّرات البيئة ذات الصلة
> 5. مدخلات ملف القفل للاعتمادات الخارجية
>
> فإن طابقت التجزئة تشغيلة سابقة، استعاد Turborepo المخرجات المخزّنة (`outputs`، أي مجلد `dist/`) وأعاد تشغيل المخرجات المسجّلة stdout/stderr بدل تنفيذ الأمر. والمخزن محلي افتراضيًا (يُحفظ في `node_modules/.cache/turbo`)، لكن يمكن مشاركته عبر عوامل CI بالتخزين المؤقت البعيد.

### نقطة تحقّق

`pnpm turbo build` بمخزن مؤقت نظيف يبني كل شيء. والتشغيلة الثانية تعرض `FULL TURBO` وتكتمل في أقل من ثانية.

![أول بناء بـturbo يعرض حالات cache miss لكل الحزم](/images/kinney/97f966da08c122d2.webp)

![البناء الثاني بـturbo يعرض FULL TURBO مع كل حالات cache hit](/images/kinney/72f4d6eb0a1c7233.webp)

## راقب البناءات الجزئية

والآن غيّر شيئًا وراقب Turborepo يعيد بناء ما يلزم فقط.

افتح `packages/ui/src/button.tsx` وأجرِ تغييرًا صغيرًا — أضف تعليقًا في أعلى الملف:

```typescript
// Updated button styling
```

احفظ الملف وشغّل البناء مجددًا:

```bash
pnpm turbo build
```

انظر إلى المخرَج بعناية:

```
@pulse/shared:build: cache hit, replaying logs
@pulse/legacy:build: cache hit, replaying logs
@pulse/ui:build: cache miss, executing
@pulse/analytics:build: cache miss, executing
@pulse/users:build: cache miss, executing
@pulse/dashboard:build: cache miss, executing
```

`@pulse/shared` و`@pulse/legacy` حالات cache hit — لم تتغيّرا ولا اعتماد لهما على `@pulse/ui`. لكن `@pulse/ui` حالة cache miss (لأنك غيّرتها)، وكل ما يعتمد على `@pulse/ui` يُعاد بناؤه أيضًا: `@pulse/analytics` و`@pulse/users` و`@pulse/dashboard`.

> **يعيد Turborepo بناء المعتمَدات، لا الحزمة المتغيرة فقط**
>
> لأن التجزئة تضم تجزئات الاعتمادات. فعندما تتغيّر `@pulse/ui`، تتغيّر تجزئتها. و`@pulse/analytics` تعتمد على `@pulse/ui`، فتضم تجزئة مدخلاتها تجزئة `@pulse/ui` — التي تغيّرت. وتستمر السلسلة صعودًا في الرسم البياني. وهذا صحيح: فتغيير في `@pulse/ui` قد يؤثر في مخرجات بناء أي حزمة تستوردها. والتحسين الآمن الوحيد هو تخطي الحزم التي يستحيل إثبات تأثرها — أي الحزم التي لا مسار اعتماد يصل بها إلى الحزمة المتغيرة.

أعد تغييرك في `packages/ui/src/button.tsx` (أزل التعليق) وشغّل `pnpm turbo build` مجددًا. ينبغي أن يكون `FULL TURBO` — فقد عادت الملفات إلى الحالة المخزّنة.

### نقطة تحقّق

بعد تغيير `packages/ui`، تظهر `@pulse/shared` وحدها كحالة cache hit. ويُعاد بناء كل ما هو أسفل `@pulse/ui`. وبعد التراجع، يُستعاد المخزن المؤقت.

## افحص رسم الاعتمادات

يستطيع Turborepo عرض رسم المهام الذي يبنيه.

ولّد الرسم:

```bash
pnpm turbo build --graph=graph.html
```

يولّد هذا ملف HTML فيه تصوّر لرسم الاعتمادات. افتح `graph.html` في متصفحك. ينبغي أن ترى:

- `@pulse/shared` في الأسفل (بلا اعتمادات)
- `@pulse/ui` في مستوى واحد أعلى (تعتمد على `@pulse/shared`)
- `@pulse/analytics` و`@pulse/users` في المستوى التالي (كلتاهما تعتمد على `@pulse/ui` و`@pulse/shared`)
- `@pulse/dashboard` في الأعلى (تعتمد على كل شيء)

> **الرسم البياني هو المعمارية**
>
> هذا التصوّر ليس أداة تنقيح فقط — بل خريطة لاقتران نظامك. فإن رأيت حزمة في أسفل الرسم بحواف تصل إلى كل حزمة أخرى، فتلك أهم اعتماد مشترك لديك. وإن رأيت حزمتين بلا حواف بينهما، فبوسعهما البناء والاختبار بالتوازي. ويخبرك الرسم حيث يكون التوازي ممكنًا، وأين توجد الاختناقات، وما نطاق تأثير أي تغيير.

والآن جرّب المرشّح مع الرسم:

```bash
pnpm turbo build --filter=@pulse/analytics... --graph=graph-analytics.html
```

يولّد هذا رسمًا يعرض فقط الرسم الفرعي المتصل بـ`@pulse/analytics` واعتماداتها.

### نقطة تحقّق

تستطيع تصوّر رسم الاعتمادات وتحديد أي الحزم أعلى وأسفل أي حزمة معينة.

```
graph TD
    Dashboard["@pulse/dashboard#build"]
    Users["@pulse/users#build"]
    Analytics["@pulse/analytics#build"]
    UI["@pulse/ui#build"]
    Shared["@pulse/shared#build"]
    Legacy["@pulse/legacy#build"]
    Mocks["@pulse/mocks#build"]
    Codemods["@pulse/codemods#build"]
    Root(("Root"))

    Dashboard --> Users
    Dashboard --> Analytics
    Dashboard --> UI
    Dashboard --> Shared
    Users --> UI
    Users --> Shared
    Analytics --> UI
    Analytics --> Shared
    UI --> Shared
    Legacy --> Mocks
    Mocks --> Shared
    Codemods --> Shared
    Codemods --> Root
    Shared --> Root
```

## الحل

إن احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة في فرع `05-typescript-start`:

```bash
git checkout 05-typescript-start
pnpm install
```

## أهداف إضافية

- **بناءات مرشَّحة:** شغّل `pnpm turbo build --filter=@pulse/analytics...` لبناء analytics واعتماداتها فقط. وقارن عدد المهام ببناء كامل.
- **تشغيل تجريبي:** شغّل `pnpm turbo build --dry-run=json` لترى بالضبط ما سينفّذه Turborepo دون تشغيل أي شيء. وافحص مخرَج JSON لفهم حساب التجزئة.
- **متغيّرات البيئة:** أضف متغيّر بيئة إلى مفتاح `env` في مهمة `build` داخل `turbo.json` ولاحظ أن تغيير المتغيّر يُبطل المخزن المؤقت.

## ما التالي

لديك الآن بناءات مخزّنة مؤقتًا وواعية بالاعتمادات. لكن TypeScript ما زال يفحص كل حزمة باستقلال — لا يوجد فحص أنواع تزايدي عبر حدود الحزم. فتغيير نوع في `@pulse/shared` يفرض إعادة فحص كاملة لكل حزمة. وفي التمرين التالي، ستضيف `composite: true` ومراجع المشاريع كي يستطيع TypeScript فحص الأنواع تزايديًا عبر الحزم.
