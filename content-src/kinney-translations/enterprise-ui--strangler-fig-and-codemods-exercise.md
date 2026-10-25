---
title: "التمرين 9: شجرة الخنّاق التينيّ وأدوات التحويل البرمجي (Codemods)"
---

## ما الذي ستفعله

ظهر تطبيق قديم في المستودع الأحادي عند `apps/legacy/`. وفيه مكوّنات على الطراز القديم، وبنية ملفات مسطّحة، وبلا فصل بين الحزم. وستُنشئ شجرة خنّاق تينيّ على مستوى التوجيه بحيث يتعايش التطبيقان، وتهاجر مسارًا واحدًا من القديم إلى الحديث، وتكتب أداة تحويل برمجي بـjscodeshift تُؤتمت تحويلات الاستيراد اللازمة لنقل بقية قاعدة الشفرة.

## لماذا يهم هذا

لا أحد يبدأ من الصفر. ففي الواقع العملي ترث شفرة قديمة وتهاجر تدريجيًا. ويمنحك نمط شجرة الخنّاق التينيّ استراتيجية تعايش آمنة: المسارات الجديدة تذهب إلى التطبيق الحديث، والمسارات القديمة تبقى في التطبيق القديم، وتهاجر مسارًا واحدًا في كل مرة حتى يخلو التطبيق القديم. وتُؤتمت أدوات التحويل البرمجي الأجزاء الميكانيكية من الترحيل — إعادة تسمية الاستيرادات، وتحديث نداءات API، وتحويل الأنماط — فيقضي المطوّرون وقتهم في القرارات لا في البحث والاستبدال. والجمع بين شجرة الخنّاق التينيّ وأدوات التحويل البرمجي هو كيف تهاجر الفرق الكبيرة دون تجميد تطوير الميزات.

## المتطلبات المسبقة

- Node.js 20+
- pnpm 9+

## التهيئة

ينبغي أن تكون مكملًا من حيث انتهى التمرين 9 (استراتيجيات الاختبار). وإذا احتجت إلى اللحاق:

```bash
git checkout 09-migration-start
pnpm install
```

## استكشف التطبيق القديم

ابدأ بفهم ما تهاجر منه.

افتح `apps/legacy/src/legacy-app.tsx`. ولاحظ الأنماط التي تدل على أن هذه شفرة قديمة:

*apps/legacy/src/legacy-app.tsx*

```typescript
// Old-style React — no packages, no separation of concerns
import { LegacyAnalytics } from "./legacy-analytics";

export function LegacyApp() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#333" }}>Pulse (Legacy)</h1>
      <nav style={{ marginBottom: "20px" }}>
        <a href="/legacy/analytics">Analytics</a>
        {" | "}
        <a href="/legacy/settings">Settings</a>
      </nav>
      <LegacyAnalytics />
    </div>
  );
}
```

> **ما الذي يجعل هذا «قديمًا»**
>
> الأمر ليس في عمر الشفرة — بل في الأنماط. أنماط مضمّنة بدل نظام تصميم. واستيرادات ملفات محلية بدل استيرادات حزم. وبلا أنواع TypeScript من `@pulse/shared`. وبلا فصل بين حزم الميزات. وكل شيء يعيش في مجلد مسطّح. هذا هو التطبيق الشامل قبل المعمارية.

افتح `apps/legacy/src/legacy-analytics.tsx`. يفعل هذا المكوّن ما يفعله `@pulse/analytics`، لكن بلا فصل بين الحزم:

*apps/legacy/src/legacy-analytics.tsx*

```typescript
import { LegacyChart } from './legacy-chart';

export function LegacyAnalytics() {
  // ... fetches data inline, renders stats and chart
  // Uses local components instead of @pulse/ui
  // No Suspense, no streaming, no loading skeletons
}
```

قارن مع `packages/analytics/src/analytics-dashboard.tsx`. الميزة نفسها في المنتج، ومعمارية مختلفة تمامًا. فالنسخة الحديثة تستخدم مكوّنات `@pulse/ui`، وأنواع `@pulse/shared`، وحدود Suspense، وجلب بيانات في المكان نفسه. أما النسخة القديمة فكل شيء فيها مضمَّن.

### نقطة تحقق

لقد فهمت الفروق البنيوية بين التطبيق القديم والحديث. فالتطبيق القديم بلا حدود حزم، وبلا أنواع مشتركة، وبلا تكامل مع نظام التصميم.

![تطبيق قديم بأنماط مضمّنة وبنية مسطّحة](/images/kinney/f8176c130a4cea8c.webp)

![تطبيق حديث بمعمارية قائمة على الحزم](/images/kinney/81f1a5072b60e7e4.webp)

## تهيئة شجرة الخنّاق التينيّ للتوجيه

يعمل نمط شجرة الخنّاق التينيّ بوضع طبقة توجيه أمام التطبيقين. فالمسارات الجديدة تذهب إلى التطبيق الحديث، والمسارات القديمة تذهب إلى التطبيق القديم. وبمرور الوقت تنقل المسارات من القديم إلى الحديث حتى لا تبقى للتطبيق القديم أي مسارات.

```
flowchart TD
    User["User Browser"]
    Proxy["Vite Dev Server (Port 5173)"]
    Modern["Modern Dashboard App"]
    Legacy["Legacy App (Port 5174)"]

    User -->|"all requests"| Proxy
    Proxy -->|"/legacy/*"| Legacy
    Proxy -->|"everything else"| Modern
```

> **نمط شجرة الخنّاق التينيّ**
>
> سُمّي نمط شجرة الخنّاق التينيّ على اسم شجرة الخنّاق التينيّ، التي تنمو بالتفافها حول شجرة مضيفة. ففي الطبيعة تنبت بذرة الخنّاق التينيّ في ظلّة شجرة قائمة، وترسل جذورًا إلى الأرض، وتغلّف تدريجيًا جذع الشجرة المضيفة ببنيّتها الجذرية. وعلى مدى سنوات، تتكاثف جذور التين وتلتحم حتى تكوّن شبكة قائمة بذاتها، ثم تتحلّل الشجرة المضيفة الأصلية — وقد لم تعد لازمة — وتتلاشى. واستعار مارتن فاولر هذه الاستعارة لترحيل البرمجيات: فبدل إعادة كتابة نظام قديم من الصفر (وهو نهج شديد الخطر)، تبني النظام الجديد حول القديم، موجّهًا الحركة إلى النظام الجديد نقطة نهاية واحدة أو ميزة واحدة في كل مرة. ويستمر النظام القديم في خدمة أي مسارات لم تُهاجر بعد، ويتقلّص تدريجيًا حتى لا يخدم أي حركة على الإطلاق ويمكن إزالته بأمان. والنمط قيّم تحديدًا لأنه يلغي الانتقال «الانفجاري» — ففي كل مرحلة من الترحيل يكون لديك نظام يعمل، وكل خطوة ترحيل منفردة صغيرة بما يكفي لمراجعتها واختبارها والرجوع عنها باستقلال.

افتح `apps/dashboard/vite.config.ts` وأضف إعداد وسيط يمرّر المسارات القديمة إلى خادم التطوير في التطبيق القديم:

*apps/dashboard/vite.config.ts*

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/legacy': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
    },
  },
});
```

بعد ذلك، أضف مسار الأساس إلى خادم التطوير في التطبيق القديم. افتح `apps/legacy/vite.config.ts` وأضف `base: "/legacy/"`:

*apps/legacy/vite.config.ts*

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  base: '/legacy/',
});
```

*ملاحظة:* يقدّم كل الموارد تحت /legacy/ حتى يعمل توجيه الوسيط بشكل صحيح.

> **ملاحظة**
>
> المنفذ `port: 5174` مضبوط بالفعل في الإعداد الابتدائي. والتغيير الوحيد المطلوب هنا هو إضافة `base: "/legacy/"` حتى تُقدَّم موارد التطبيق القديم تحت بادئة المسار `/legacy/`، وهو ما يلزم ليمرّرها الوسيط بشكل صحيح.

شغّل خادمَي التطوير معًا. وأضف سكربتًا إلى `package.json` في الجذر أو شغّلهما يدويًا:

```bash
pnpm --filter @pulse/dashboard dev &
pnpm --filter @pulse/legacy dev &
```

اختبر التوجيه:

- افتح [http://localhost:5173](http://localhost:5173/) — فتُحمَّل لوحة التحكم الحديثة
- افتح [http://localhost:5173/legacy/](http://localhost:5173/legacy/) — فيُحمَّل التطبيق القديم، ممرَّرًا عبر خادم التطبيق الحديث

> **الوسيط هو الخنّاق**
>
> خادم التطوير في التطبيق الحديث هو نقطة الدخول الوحيدة. وهو يملك قرار التوجيه: الطلبات إلى `/legacy/*` تُمرَّر إلى الخادم القديم، وكل ما عداها يتولاه التطبيق الحديث. ولتهاجر مسارًا، تتوقف عن تمريره إلى القديم وتضيفه إلى موجّه التطبيق الحديث بدل ذلك. ولا يعرف المستخدم أبدًا أي تطبيق قدّم الصفحة — فبنية URL تبقى كما هي. وفي الإنتاج، سيكون هذا الوسيط وكيلًا عكسيًا (Nginx أو CloudFront أو التوجيه الطرفي في شبكة توصيل المحتوى لديك) لا وسيط Vite للتطوير.

### نقطة تحقق

التطبيقان متاحان عبر نقطة دخول واحدة عند `localhost:5173`. والمسارات الحديثة تُصيَّر من تطبيق لوحة التحكم. والمسارات القديمة تُمرَّر عبر الوسيط إلى التطبيق القديم على المنفذ 5174.

## هاجر مسارًا واحدًا

خُذ عرض التحليلات القديم واستبدله بحزمة `@pulse/analytics` الحديثة.

مسار التحليلات القديم عند `/legacy/analytics`. وتريد نقله بحيث يقدّم `/analytics` (أو `/`) النسخة الحديثة. وهذا هو الحال بالفعل — فتوجيه لوحة التحكم الحديثة يتولى `/` بمسار التحليلات. وتعني شجرة الخنّاق التينيّ أن المستخدمين الذين أضافوا `/legacy/analytics` إلى مفضلاتهم ينبغي في النهاية أن يُعاد توجيههم إلى `/`.

أضف إعادة توجيه في التطبيق القديم للمسار المهاجَر. واستبدل مكوّن `LegacyApp` كاملًا بنسخة تعيد توجيه المسارات المهاجَرة. فالمكوّن كان يصيّر التنقل ومكوّن `LegacyAnalytics` — أما الآن فيفحص مسار URL ويعيد توجيه `/legacy/analytics` إلى التطبيق الحديث عند `/`.

افتح `apps/legacy/src/legacy-app.tsx` واستبدل المكوّن:

*apps/legacy/src/legacy-app.tsx*

```typescript
export function LegacyApp() {
  const path = window.location.pathname;

  if (path === "/legacy/analytics") {
    window.location.href = "/";
    return <p>Redirecting to modern analytics...</p>;
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#333" }}>Pulse (Legacy)</h1>
      <p>Settings and other legacy routes still live here.</p>
    </div>
  );
}
```

*ملاحظة:* يعيد توجيه المسار المهاجَر إلى التطبيق الحديث حتى تظل الروابط المحفوظة القديمة تعمل.

تحقق من الترحيل:

- انتقل إلى [http://localhost:5173/legacy/analytics](http://localhost:5173/legacy/analytics) — ينبغي أن يعيد التوجيه إلى `/` (لوحة التحليلات الحديثة)
- انتقل إلى [http://localhost:5173/legacy/settings](http://localhost:5173/legacy/settings) — فتُحمَّل صفحة الإعدادات القديمة عادةً
- انتقل إلى [http://localhost:5173/](http://localhost:5173/) — فتُصيَّر لوحة التحليلات الحديثة بكل معمارية التمارين 2-8

> **الترحيل عملية مسار واحد في كل مرة**
>
> في مشروع حقيقي، ستهاجر أبسط مسار أو أكثره حركة أولًا — للتحقق من النمط وبناء الثقة. وكل ترحيل طلب سحب منفصل: حدّث الوسيط/التوجيه، وتحقّق من عمل النسخة الحديثة، وأضف إعادة التوجيه من القديم. ويتقلّص التطبيق القديم مع كل طلب سحب. وعندما تُهاجر كل المسارات، تحذف `apps/legacy/` بالكامل. والانتظام الجوهري هو: لا تهاجر مسارين في طلب السحب نفسه أبدًا. وينبغي أن يكون كل ترحيل قابلًا للرجوع عنه باستقلال.

### نقطة تحقق

مسار التحليلات مهاجَر بالكامل. والتحليلات القديمة تعيد التوجيه إلى التطبيق الحديث. وبقية المسارات القديمة ما زالت تعمل عبر الوسيط.

## اكتب أداة تحويل برمجي بـjscodeshift

في التطبيق القديم أنماط استيراد تحتاج إلى تحويل لأجل المعمارية الحديثة. وستكتب أداة تحويل برمجي تُؤتمت ذلك.

تُحلّل أداة التحويل البرمجي الشفرة المصدرية إلى شجرة صياغة مجرّدة، وتجد العُقد المطابقة لنمط ما، وتستبدلها بعُقد جديدة، وتطبع الشجرة المعدّلة مرة أخرى كشفرة مصدرية.

```
flowchart LR
    Source["Source Code"]
    Parse["Parser (tsx)"]
    AST["Abstract Syntax Tree"]
    Find["Find: ImportDeclaration\nfrom './legacy-*'"]
    Replace["Replace with:\n@pulse/analytics\n@pulse/ui"]
    Print["Print to Source"]
    Output["Transformed Code"]

    Source --> Parse --> AST --> Find --> Replace --> Print --> Output
```

افتح `codemods/src/migrate-legacy-import.ts`. فهو يحتوي على بديل فارغ:

*codemods/src/migrate-legacy-import.ts*

```typescript
import type { API, FileInfo } from 'jscodeshift';

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Your transform here

  return root.toSource();
}
```

نفّذ التحويل. ينبغي أن تجد الأداة استيرادات مثل:

```typescript
import { LegacyChart } from './legacy-chart';
```

وتحوّلها إلى:

```typescript
import { Chart } from '@pulse/analytics';
```

استبدل البديل الفارغ في `codemods/src/migrate-legacy-import.ts` بهذا التنفيذ:

*codemods/src/migrate-legacy-import.ts*

```typescript
import type { API, FileInfo } from 'jscodeshift';

const IMPORT_MAP: Record<string, { source: string; name: string }> = {
  LegacyChart: { source: '@pulse/analytics', name: 'Chart' },
  LegacyStatsBar: { source: '@pulse/analytics', name: 'StatsBar' },
  LegacyDataTable: { source: '@pulse/ui', name: 'DataTable' },
  LegacyButton: { source: '@pulse/ui', name: 'Button' },
};

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find all import declarations from legacy local files
  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const source = path.node.source.value;
      return typeof source === 'string' && source.startsWith('./legacy-');
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers;
      if (!specifiers) return;

      // Group new imports by their target package
      const newImports = new Map<string, string[]>();

      specifiers.forEach((specifier) => {
        if (specifier.type !== 'ImportSpecifier') return;

        const oldName = specifier.imported.name;
        const mapping = IMPORT_MAP[oldName];

        if (mapping) {
          const existing = newImports.get(mapping.source) || [];
          existing.push(mapping.name);
          newImports.set(mapping.source, existing);
        }
      });

      // Replace the old import with new package imports
      const replacements = Array.from(newImports.entries()).map(([source, names]) =>
        j.importDeclaration(
          names.map((name) => j.importSpecifier(j.identifier(name), j.identifier(name))),
          j.literal(source),
        ),
      );

      if (replacements.length > 0) {
        j(path).replaceWith(replacements);
      }
    });

  // Replace usage of old component names with new names
  Object.entries(IMPORT_MAP).forEach(([oldName, { name: newName }]) => {
    root.find(j.JSXIdentifier, { name: oldName }).forEach((path) => {
      path.node.name = newName;
    });

    root
      .find(j.Identifier, { name: oldName })
      .filter(
        (path) =>
          path.parent.node.type !== 'ImportSpecifier' &&
          path.parent.node.type !== 'ImportDefaultSpecifier',
      )
      .forEach((path) => {
        path.node.name = newName;
      });
  });

  return root.toSource();
}
```

*ملاحظة:* يربط كل مكوّن قديم بحزمته واسمه الحديثين.

*ملاحظة:* يجد عُقد شجرة الصياغة للاستيرادات من مسارات ./legacy-*.

*ملاحظة:* يستبدل عقدة الاستيراد القديمة باستيراد أو أكثر من استيرادات الحزم الحديثة.

*ملاحظة:* يعيد تسمية عناصر JSX مثل &lt;LegacyChart&gt; إلى &lt;Chart&gt; في الملف كله.

> **كيف يعمل jscodeshift**
>
> يُحلّل jscodeshift شفرة JavaScript/TypeScript إلى شجرة صياغة مجرّدة (AST)، ويتيح لك البحث في عُقد تلك الشجرة وتحويلها، ثم يطبع الشجرة المعدّلة مرة أخرى كشفرة مصدرية. وخلافًا للبحث والاستبدال بالتعبيرات النمطية، تفهم تحويلات شجرة الصياغة بنية الشفرة — فهي تستطيع التمييز بين `LegacyChart` في عبارة استيراد و`LegacyChart` في عنصر JSX. وتبحث الدالة `j.find()` عن عُقد شجرة الصياغة المطابقة لنمط ما، وتستبدلها الدالة `j.replaceWith()` بعُقد جديدة. وتتلقى دالة التحويل ملفًا واحدًا في المرة وتُرجع الشفرة المعدّلة.

> **أشجار الصياغة المجرّدة**
>
> شجرة الصياغة المجرّدة (AST) بنية بيانات على شكل شجرة تمثّل البنية النحوية للشفرة المصدرية. فحين يقرأ محلّل العبارة `import { Chart } from "@pulse/analytics"`، فإنه لا يرى سلسلة أحرف مسطّحة — بل ينتج شجرة تكون عقدتها العليا `ImportDeclaration`، ولها عُقد فرعية لكل محدِّد مستورَد (`Chart`) وللسلسلة المصدرية (`"@pulse/analytics"`). وكل تركيب في اللغة — تعريفات المتغيرات، ونداءات الدوال، وعناصر JSX، والتعبيرات الثنائية — يصبح عقدة في هذه الشجرة، وتعبيراته الفرعية أبناء لها. وتعتمد أدوات مثل jscodeshift وESLint وBabel وPrettier كلها على أشجار الصياغة لا على النص الخام، لأن عمليات الأشجار واعية بالبنية: فيمكنك أن تجد «كل عبارات الاستيراد التي يبدأ مصدرها بـ`./legacy-`» دون القلق بشأن المسافات أو التعليقات أو اختلافات التنسيق التي تُربك تعبيرًا نمطيًا. وكلمة «مجرّدة» في AST تعني أن الشجرة تحذف التفاصيل النحوية التي لا تؤثر في المعنى (مثل الأقواس المستخدمة للتجميع فقط أو الفواصل المنقوطة) وتركّز على البنية المنطقية للبرنامج.

## اختبر أداة التحويل

شغّل أداة التحويل على ملفات مصدر التطبيق القديم:

```bash
npx jscodeshift \
  --parser tsx \
  --transform codemods/src/migrate-legacy-import.ts \
  apps/legacy/src/
```

افحص الفرق (diff) لترى ما تغيّر:

```bash
git diff apps/legacy/src/
```

ينبغي أن ترى الاستيرادات محوّلة من المسارات المحلية القديمة إلى مسارات الحزم الحديثة، وأسماء المكوّنات محدّثة من `LegacyChart` إلى `Chart`، ومن `LegacyButton` إلى `Button`، وهكذا.

تحقق من صحة التحويلات. افتح الملفات المعدّلة وافحص:

- قديم: `import { LegacyChart } from "./legacy-chart"`
- جديد: `import { Chart } from "@pulse/analytics"`
- قديم: `<LegacyChart data={data} />`
- جديد: `<Chart data={data} />`

> **راجع مخرَج أداة التحويل دائمًا**
>
> أدوات التحويل قوية لكنها ليست معصومة. فالحالات الحدية — الاستيرادات المستعارة، وإعادة التصدير، والاستيرادات الديناميكية، والتضمين في سلاسل القوالب — قد تنتج تحويلات غير صحيحة. شغّل الأداة، وراجع الفرق، وشغّل فاحص الأنواع والاختبارات، ثم أودِع. وتعامل مع الأداة كموفّر للوقت، لا كطيّار آلي.

شغّل فاحص الأنواع على الملفات المعدّلة لالتقاط أي مشكلات:

```bash
pnpm turbo typecheck
```

> **فحص الأنواع سيفشل هنا**
>
> تحوّل أداة التحويل `import { LegacyChart } from "./legacy-chart"` إلى `import { Chart } from "@pulse/analytics"`، لكن التطبيق القديم لا يملك `@pulse/analytics` كتبعية. وفي ترحيل حقيقي، ستضيف الحزم الحديثة إلى `package.json` في التطبيق القديم قبل تشغيل فاحص الأنواع. وفي هذا التمرين، يؤكد خطأ الأنواع أن الأداة تنتج المخرَج الصحيح — فقط أرجع الملفات بـ`git checkout apps/legacy/src/` وانتقل إلى كتابة الاختبارات.

### نقطة تحقق

تحوّل أداة التحويل الاستيرادات القديمة إلى استيرادات الحزم الحديثة. ويعرض الفرق تغييرات نظيفة ومتوقعة.

![فرق Git يُظهر تحويلات الاستيراد التي أجرتها أداة التحويل](/images/kinney/181d4ee2a16088cc.webp)

## اكتب اختبارات لأداة التحويل

افتح `codemods/src/__tests__/migrate-legacy-import.test.ts` وأضف حالات اختبار:

*codemods/src/__tests__/migrate-legacy-import.test.ts*

```typescript
import { describe, it, expect } from 'vitest';
import jscodeshift from 'jscodeshift';
import transform from '../migrate-legacy-import';

function applyTransform(input: string): string {
  const result = transform(
    { source: input, path: 'test.tsx' },
    { jscodeshift, j: jscodeshift, stats: () => {}, report: () => {} },
  );
  return result;
}

describe('migrate-legacy-import', () => {
  it('transforms a single legacy import', () => {
    const input = `import { LegacyChart } from "./legacy-chart";`;
    const output = applyTransform(input);
    expect(output).toContain(`import { Chart } from "@pulse/analytics"`);
    expect(output).not.toContain('LegacyChart');
    expect(output).not.toContain('./legacy-chart');
  });

  it('transforms multiple imports from different legacy files', () => {
    const input = [
      `import { LegacyChart } from "./legacy-chart";`,
      `import { LegacyButton } from "./legacy-button";`,
    ].join('\n');
    const output = applyTransform(input);
    expect(output).toContain(`import { Chart } from "@pulse/analytics"`);
    expect(output).toContain(`import { Button } from "@pulse/ui"`);
  });

  it('leaves non-legacy imports unchanged', () => {
    const input = `import { useState } from "react";`;
    const output = applyTransform(input);
    expect(output).toBe(input);
  });

  it('transforms JSX element names', () => {
    const input = [
      `import { LegacyChart } from "./legacy-chart";`,
      `const App = () => <LegacyChart data={data} />;`,
    ].join('\n');
    const output = applyTransform(input);
    expect(output).toContain('<Chart');
    expect(output).not.toContain('<LegacyChart');
  });
});
```

*ملاحظة:* يختبر أدوات التحويل كتحويلات من نص إلى نص دون الحاجة إلى نظام ملفات.

شغّل الاختبارات:

```bash
pnpm --filter codemods test
```

> **اختبار أدوات التحويل هو اختبار تحويلات من نص إلى نص**
>
> تقدّم سلسلة نصية مصدرية، وتشغّل التحويل، وتتحقق من خصائص السلسلة الناتجة. ولا يحتاج الاختبار إلى نظام ملفات حقيقي ولا إلى تطبيق يعمل. وهذا يجعل اختبارات أدوات التحويل سريعة وسهلة الكتابة — أضف حالة اختبار لكل حالة حدية تصادفها. وعندما تنتج الأداة مخرَجًا غير صحيح على ملف حقيقي، انسخ القسم المشكِل من ذلك الملف إلى حالة اختبار، وأصلح التحويل، وتحقق من نجاح الاختبار.

### نقطة تحقق

تنجح اختبارات أداة التحويل. وكل اختبار يتحقق من سيناريو تحويل محدد. والحالات الحدية مغطاة.

![نتائج اختبارات أداة التحويل تُظهر نجاح كل الاختبارات](/images/kinney/7b59a6f171e7e252.webp)

## الحل

إذا احتجت إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة في الفرع `solution`:

```bash
git checkout solution
pnpm install
```

## أهداف موسّعة

- **التعامل مع الاستيرادات المستعارة:** وسّع أداة التحويل لتتعامل مع `import { LegacyChart as MyChart } from "./legacy-chart"` وتحفظ الاسم المستعار: `import { Chart as MyChart } from "@pulse/analytics"`.
- **وضع التجربة الجافة:** شغّل أداة التحويل مع `--dry` لترى الملفات التي ستُعدَّل دون تعديلها فعلًا. واستخدم هذا في CI للتحقق من عدم بقاء أي استيرادات قديمة غير مهاجَرة.
- **أضف أداة تحويل ثانية:** اكتب أداة تحوّل الأنماط المضمّنة (`style={{ color: "#333" }}`) إلى أصناف Tailwind CSS (`className="text-gray-700"`). وهذا تحويل أصعب لأنه يتطلب خريطة من خصائص CSS إلى أصناف Tailwind.

## ما التالي

لقد أكملت قوس الورشة كاملًا. عبر هذه التمارين، بنيت معمارية مستودع أحادي من الأساس: تركيب وقت البناء، والتصيير التدفقي SSR، وتنسيق Turborepo، ومراجع مشاريع TypeScript، والفحص المعماري، وCI/CD مع ميزانيات الأداء، واختبارات E2E بـPlaywright، والترحيل التدريجي بنمط شجرة الخنّاق التينيّ. وأضاف كل تمرين طبقة من البنية التحتية تجعل المعمارية أكثر قابلية للصيانة والفرض والتوسع. والخطوة التالية هي تطبيق هذه الأنماط على قاعدة شفرتك — ابدأ بالطبقة الأعلى أثرًا وتحرّك منها إلى الخارج.
