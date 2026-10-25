---
title: "إعداد Rsbuild"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/rsbuild-configuration"
---

أرسى محاضرة [Rspack وwebpack وVite](https://stevekinney.com/courses/enterprise-ui/rspack-webpack-and-vite) أن Rsbuild هو أداة البناء الأعلى مستوى التي تجلس فوق Rspack — مقارنةً بـVite في سهولة الاستخدام، لكنها تعتمد نموذج «المجمّع أولًا» في التطوير والإنتاج معًا. وتستعرض هذه المحاضرة ملفات `rsbuild.config.ts` الفعلية المستخدمة في [تمرين التركيب وقت التشغيل](https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise)، وتشرح ما يفعله كل جزء من الإعداد، ولماذا هو موجود، وما يحدث عند تغييره.

إذا سبق أن أعددت webpack، فسيبدو Rsbuild مألوفًا لكن أقل إسهابًا بملاحظة واضحة. وإذا سبق أن أعددت Vite، فسيبدو مألوفًا لكن بنموذج إضافات مختلف في الأساس. وفي كلتا الحالتين، سطح الإعداد صغير بما يكفي ليستقر في رأسك، وهذا هو الهدف كله من استخدام أداة أعلى مستوى بدل Rspack الخام.

## الصورة الكاملة

هذا هو ملف `rsbuild.config.ts` الكامل لتطبيق المضيف من التمرين. ويشير كل قسم أدناه إلى هذا الملف.

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      remotes: {
        remoteAnalytics: 'remoteAnalytics@http://localhost:3001/mf-manifest.json',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        nanostores: { singleton: true, eager: true },
        '@nanostores/react': { singleton: true, eager: true },
        '@pulse/shared': { singleton: true, eager: true },
      },
    }),
  ],
  html: { template: './src/index.html' },
});
```

وهذا ملف الريموت:

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: { port: 3001 },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remoteAnalytics',
      dts: false,
      exposes: {
        './analytics-dashboard': './src/analytics-dashboard',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        nanostores: { singleton: true, eager: true },
        '@nanostores/react': { singleton: true, eager: true },
        '@pulse/shared': { singleton: true, eager: true },
      },
    }),
  ],
  html: { template: './src/index.html' },
});
```

الملفان قصيران. وهذا مقصود — فالإعدادات الافتراضية في Rsbuild تتولى معظم إعداد البناء، وما يتبقى هو ما يخصّ تطبيقك فعلًا.

## `defineConfig`

```typescript
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  // ...
});
```

`defineConfig` دالة هوية. فهي لا تفعل شيئًا وقت التشغيل — بل توجد فقط لكي يقدّم TypeScript ومحررك الإكمال التلقائي وفحص الأنواع على كائن الإعداد. ويمكنك تصدير كائن عادي وسيعمل الأمر نفسه تمامًا، لكنك ستفقد تلميحات الأنواع، وهي مهمة عندما تحاول تذكّر ما إذا كان الخيار `server.port` أم `devServer.port`.

يبحث Rsbuild عن [ملفات الإعداد](https://rsbuild.rs/guide/configuration/rsbuild) بترتيب محدد: `rsbuild.config.mjs`، ثم `.ts`، ثم `.js`، ثم `.cjs` و`.mts` و`.cts`. واستخدام `.ts` هو الخيار المعياري لمشاريع TypeScript، وهو ما يستخدمه التمرين.

ويقبل `defineConfig` أيضًا دالة بدل كائن. وتتلقى الدالة `env` (`'development'` أو `'production'`) و`command` (`'dev'` أو `'build'` أو `'preview'`)، ما يتيح لك إرجاع إعداد مختلف بحسب سياق البناء.

```typescript
export default defineConfig(({ env, command }) => ({
  server: {
    port: command === 'dev' ? 3000 : 8080,
  },
}));
```

لا يحتاج التمرين إلى ذلك — فالإعدادان ساكنان — لكن من المفيد معرفة أن هذا المخرج الطارئ موجود عندما تحتاج سلوكًا خاصًا ببيئة معينة.

## `server.port`

```typescript
server: { port: 3000 },
```

هذا يضبط المنفذ لخادم التطوير في Rsbuild. والقيمة الافتراضية `3000`، لذا إعداد المضيف زائد تقنيًا هنا، لكن التصريح به عادة جيدة عندما تشغّل خوادم تطوير متعددة في الوقت نفسه. ويضبط الريموت `port: 3001` لتفادي التعارض.

إذا كان المنفذ مشغولًا بالفعل، ينتقل Rsbuild بصمت إلى المنفذ المتاح التالي إلا إذا ضبطت [`server.strictPort`](https://rsbuild.rs/config/server/strict-port) على `true`، وهو ما يُطلق خطأً بدل ذلك. وفي تهيئة اتحاد، تكون تغييرات المنافذ الصامتة خطيرة — فإعداد `remotes` في المضيف يثبّت `localhost:3001` فيه، لذا إذا بدأ الريموت بهدوء على `3002`، جلب المضيف ملف تعريف غير موجود وفشلت مصافحة الاتحاد. وستكون المنافذ الصريحة مع `strictPort: true` الخيار الأكثر حصانة.

ويدعم كتلة `server` أيضًا `host` (أي واجهة يُربط بها)، و`open` (فتح عنوان URL في المتصفح تلقائيًا عند البدء)، وخيارات أخرى تتوقعها من خادم تطوير. ولا يستخدم التمرين إلا `port`.

## مصفوفة `plugins`

```typescript
plugins: [
  pluginReact(),
  pluginModuleFederation({ /* ... */ }),
],
```

نظام [الإضافات](https://rsbuild.rs/config/plugins) في Rsbuild هو نموذج التوسعة الأساسي فيه. وتعمل الإضافات بترتيب التصريح عنها، وتعمل إضافات Rsbuild المدمجة دائمًا قبل إضافات المستخدم. وتقبل المصفوفة كائنات `RsbuildPlugin`، وقيمًا زائفة (تُتجاهل بصمت)، ووعودًا، ومصفوفات متداخلة.

وهذه المعالجة للقيم الزائفة مفيدة للإضافات الشرطية:

```typescript
plugins: [
  pluginReact(),
  process.env.ANALYZE && pluginBundleAnalyzer(),
],
```

هناك تمييز يستحق الاستيعاب: مصفوفة `plugins` مخصّصة لإضافات *Rsbuild*. وإذا احتجت إلى استخدام إضافة Rspack أو webpack خام، فمكانها `tools.rspack.plugins` بدل ذلك. ونموذجا الإضافات ليسا قابلين للتبادل — فإضافات Rsbuild تتعشّق في دورة حياة Rsbuild، بينما تتعشّق إضافات Rspack في المجمّع الأساسي. ولا يستخدم التمرين إلا إضافات Rsbuild.

## `pluginReact`

```typescript
import { pluginReact } from '@rsbuild/plugin-react';
```

[`pluginReact`](https://rsbuild.rs/plugins/list/plugin-react) يتولى شؤون البناء الخاصة بـReact التي كانت ستتطلب إعدادًا يدويًا لـRspack: تصريف JSX عبر SWC، وReact Fast Refresh لأجل HMR في التطوير، وتقسيم الشفرة تلقائيًا لحزم React وأدوات التوجيه. وهو مكافئ Rsbuild لـ`@vitejs/plugin-react` في عالم Vite.

ويستدعي التمرين `pluginReact()` بلا معاملات، وهو ما يمنحك الإعدادات الافتراضية:

- **`runtime: 'automatic'`**: يستخدم تحويل JSX التلقائي في React 17+، فلا تحتاج إلى `import React from 'react'` في أعلى كل ملف.
- **`fastRefresh: true`**: يفعّل React Fast Refresh في التطوير — فتُحفظ حالة المكوّن عبر التعديلات بدل إعادة تحميل الصفحة كاملة.
- **`splitChunks: true`**: يقسّم حزم React وأدوات التوجيه تلقائيًا إلى أجزاء منفصلة لأجل تخزين مؤقت أفضل.

إذا كنت تستخدم مكتبة CSS-in-JS مثل Emotion توفّر وقت تشغيل JSX خاصًا بها، فستمرّر `swcReactOptions: { importSource: '@emotion/react' }`. وإذا احتجت إلى React Profiler في بناءات الإنتاج، فـ`enableProfiler: true` يفعّله. لكن لتطبيق React معياري مع اتحاد الوحدات، فإن الإعدادات الافتراضية هي الجواب الصحيح.

## `pluginModuleFederation`

```typescript
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
```

هذه إضافة Module Federation 2.0 لـRsbuild. وهي حزمة منفصلة عن Rsbuild نفسه، يصونها فريق [Module Federation](https://module-federation.io/guide/build-plugins/plugins-rsbuild). وتغطي [محاضرة اتحاد الوحدات](https://stevekinney.com/courses/enterprise-ui/module-federation) نموذج الاتحاد بعمق — أما هذا القسم فيركّز تحديدًا على سطح الإعداد كما يظهر في التمرين.

> **الإصدار 1.5 في مقابل الإصدار 2.0**
>
> لدى Rsbuild أيضًا مسار مدمج لـModule Federation v1.5 عبر مفتاح الإعداد `moduleFederation.options`، ولا يتطلب حزمة إضافية. ويستخدم التمرين إضافة v2.0 لأنها توفّر قدرات إضافية — تكامل مع Chrome DevTools، وتلميحات أنواع TypeScript ديناميكية، وإضافات وقت تشغيل، وتحميلًا قائمًا على ملف التعريف. وإذا لم تحتج إلى هذه الإضافات، فالمسار المدمج v1.5 يعمل جيدًا بشكل إعداد مختلف قليلًا.

### `name`

```typescript
name: 'host',
```

اسم الحاوية. وهو مطلوب ويجب أن يكون فريدًا بين كل المشاركين في الاتحاد. وتقول [توثيقات MF 2.0](https://module-federation.io/configure/name) إن الاسم يُستخدم لاسترجاع البيانات وقت التشغيل ولمراجع تخزين الأجزاء العام — لذا إذا تشاركت حاويتان اسمًا واحدًا، تصطدمتا بطرق تنتج أخطاء مربكة جدًا.

يستخدم المضيف `'host'` ويستخدم الريموت `'remoteAnalytics'`. والأسماء سلاسل نصية لا رموز، وتعيش في فضاء أسماء عام مسطّح. وفي نظام فيه ريموتات كثيرة، تصبح اصطلاحية التسمية مهمة — واسم الفريق أو النطاق أو نطاق الحزمة كلها تصلح كبادئات.

### `remotes`

```typescript
remotes: {
  remoteAnalytics:
    'remoteAnalytics@http://localhost:3001/mf-manifest.json',
},
```

هذا إعداد على جانب المستهلك. والمفتاح (`remoteAnalytics`) هو الاسم المستعار الذي تستورد منه شفرة تطبيقك — `import('remoteAnalytics/analytics-dashboard')` في مصدر المضيف. والقيمة سلسلة نصية بصيغة `containerName@entryUrl`.

يمكن أن يشير عنوان URL للمدخل إلى ملف `remoteEntry.js` أو ملف `mf-manifest.json`. ويستخدم التمرين ملف التعريف لأنه يفتح ميزات MF 2.0: تلميحات الأنواع الديناميكية، والتحميل المسبق للموارد، ودعم Chrome DevTools. وتشرح [توثيقات إعداد remotes](https://module-federation.io/configure/remotes) المقايضات بين الصيغتين.

لا يلزم أن يطابق الاسم المستعار `name` الخاص بالريموت. فيمكنك كتابة `remotes: { analytics: 'remoteAnalytics@...' }` والاستيراد من `analytics/analytics-dashboard` بدل ذلك. وعمليًا، إبقاء الاسم المستعار واسم الحاوية متوافقين يقلّل الالتباس، لكن لا يوجد شرط تقني.

### `exposes`

```typescript
exposes: {
  './analytics-dashboard': './src/analytics-dashboard',
},
```

هذا إعداد على جانب المنتج. وهو يعلن الوحدات التي يتيحها الريموت للمستهلكين. ولا يمكن استيراد إلا المسارات المذكورة هنا — وكل ما عداها في مصدر الريموت يبقى خاصًا.

ويصبح المفتاح (`'./analytics-dashboard'`) المسار الفرعي الذي يستخدمه المستهلكون في الاستيراد. وبادئة `./` مطلوبة — وتُصرّح [توثيقات exposes](https://module-federation.io/configure/exposes) بأن الأسماء المجرّدة بلا `./` غير مدعومة، وأن `.` وحدها تعني التصدير الافتراضي للحاوية. والقيمة على اليمين هي المسار إلى ملف المصدر الفعلي.

تُقسَّم الوحدات المكشوفة إلى أجزاء خاصة بها أثناء البناء. وهذا تلقائي — فلست بحاجة إلى إعداد تقسيم الأجزاء لها. أما بقية شفرة الريموت غير المكشوفة فتبقى في حزمة الريموت نفسها ولا يمكن للمضيف جلبها أبدًا.

### `dts`

```typescript
dts: false,
```

يضبط الريموت `dts: false` لتعطيل توليد أنواع TypeScript التلقائي. وفي MF 2.0 تكون قيمة `dts` افتراضيًا `true`، ما يعني أن المنتج يولّد ملف `@mf-types.zip` مضغوطًا أثناء البناء، ويُنزّل المستهلكون أنواع الريموت ويستخرجونها تلقائيًا إلى مجلد `@mf-types`. وهذه تجربة مطوّر جيدة فعلًا — إذ تحصل على الإكمال التلقائي وفحص الأنواع لوحدات الريموت دون صيانة ملفات تعريف محيطة.

ويعطّله التمرين لإبقاء التهيئة بسيطة وتفادي خطوة تنزيل الأنواع أثناء التطوير. وفي نظام إنتاجي، ستريد على الأغلب `dts: true` (أو على الأقل لا `false` صراحةً) حتى يحصل المستهلكون على أمان أنواع وقت البناء لواجهات الوحدات المكشوفة.

### `shared`

```typescript
shared: {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
  nanostores: { singleton: true, eager: true },
  '@nanostores/react': { singleton: true, eager: true },
  '@pulse/shared': { singleton: true, eager: true },
},
```

الاعتمادات المشتركة هي الجزء الأهم تشغيليًا في إعداد الاتحاد. فهي تتحكم في الحزم التي تُوحَّد وقت التشغيل بدل تجميعها منفصلةً في كل مشارك. ويغطي [قسم الاعتمادات المشتركة في محاضرة اتحاد الوحدات](https://stevekinney.com/courses/enterprise-ui/module-federation#shared-dependencies-properly-understood) النموذج كاملًا — وهذا شرح لكيفية عمل الخيارات المحددة في التمرين.

تظهر كتلة `shared` في إعداد المضيف *والريموت* معًا. ويجب أن يعلن الجانبان الحزم نفسها بخيارات متوافقة، وإلا فلن تنتج مفاوضات وقت التشغيل النتيجة التي تتوقعها.

#### `singleton`

```typescript
react: { singleton: true },
```

**`singleton: true`** يخبر وقت تشغيل اتحاد الوحدات بأن نسخة واحدة بالضبط من هذه الحزمة ينبغي أن توجد وقت التشغيل، بصرف النظر عن عدد المشاركين الذين يعلنونها. ويختار وقت التشغيل أعلى إصدار semver متوافق من كل المشاركين ويستخدم تلك النسخة الواحدة في كل مكان.

بالنسبة إلى React وReact DOM، فإن singleton غير قابل للتفاوض. فخُطّافات React والسياق والمطابقة (reconciliation) كلها تعتمد على نسخة وحدة واحدة. ووجود نسختين من React في الصفحة نفسها يعني سِجلي خُطّافات منفصلين، ما يعني أن الخُطّافات المُستدعاة في سياق إحدى النسختين لا تراها الأخرى — ورسائل الأخطاء ليست مفيدة.

كما يضع التمرين `nanostores` و`@nanostores/react` و`@pulse/shared` كأفراد مفردة. وذلك لأن [نمط الحالة عبر الحدود في nanostores](https://stevekinney.com/courses/enterprise-ui/nanostores#nanostores-in-a-federation-context) بأكمله يعتمد على امتلاك المضيف والريموت مرجعًا إلى *الذرّة* (atom) نفسها. وإن لم يكن `@pulse/shared` فردًا مفردًا، فسيُنشئ كل جانب ذرّته الخاصة، وتصبح الكتابات من المضيف غير مرئية للريموت. ويجب أن تكون مكتبة `nanostores` نفسها فردًا مفردًا أيضًا حتى تُشارَك آلية الاشتراك. والثلاثة تشكّل سلسلة — فإن انقطع أي رابط توقفت الحالة عن التدفق.

#### `eager`

```typescript
react: { singleton: true, eager: true },
```

**`eager: true`** يضمّ الاعتماد المشترك مباشرةً إلى مخرَج المشارك بدل تحميله بصورة غير متزامنة في مرحلة مفاوضات الاتحاد.

بلا `eager`، يتوقع الريموت أن يوفّر المضيف وحدات مشتركة مثل React وقت التشغيل. وهذا يعمل عندما يُحمَّل الريموت داخل المضيف، لكنه يعني أن الريموت لا يستطيع الإقلاع بمفرده — فليس لديه مصدر يجلب منه React. ويضبط التمرين `eager: true` على كل الاعتمادات المشتركة حتى يعمل المضيف والريموت باستقلال. ولا يزال وقت تشغيل اتحاد الوحدات يوحّد النسخ وقت التشغيل عند وجود الجانبين، فلن ينتهي بك الأمر بنسختين من React في الإنتاج. و`eager` يضمن فقط أن وضع الاستقلال يعمل.

والمقايضة هي حجم الحزمة. فالمشاركة المتلهفة تسحب الاعتماد إلى الجزء الأولي، ما يضخّم حزمة المدخل. وهذا مقبول لبضع حزم مشتركة. أما مع العشرات، فيبدأ الأمر بالتراكم. و[توثيقات MF 2.0](https://module-federation.io/configure/shared) تحذّر من ذلك صراحةً — استخدم `eager` عندما تريد عمدًا توفرًا متزامنًا، لا كافتراضي لكل شيء.

#### `requiredVersion` و`strictVersion`

لا تظهر هذه في إعداد التمرين المُودَع، لكن التمرين يطلب منك تجربتها:

```typescript
react: {
  singleton: true,
  eager: true,
  requiredVersion: '^18.0.0',
  strictVersion: true,
},
```

**`requiredVersion`** يعلن نطاق semver الذي يحتاجه هذا المشارك. وقيمته الافتراضية الإصدار الموجود في `package.json` الخاص بالمشارك. ويستخدمه وقت التشغيل أثناء المفاوضات ليقرر ما إذا كان الإصدار المقدَّم مقبولًا.

**`strictVersion: true`** يحوّل عدم تطابق الإصدار من تحذير إلى خطأ صارم. وبدونه، يستخدم وقت التشغيل أعلى إصدار متاح حتى لو لم يحقق `requiredVersion` — وقد يحصل الريموت صامتًا على React 19 بينما كان يتوقع React 18. ومع `strictVersion`، يُطلق عدم التطابق خطأً قبل تصيير أي واجهة، وهذا على الأقل صريح بشأن المشكلة.

ويطلب التمرين منك ضبط `requiredVersion: '^19.0.0'` مع `strictVersion: true` في مشروع يستخدم React 18، تحديدًا لترى الخطأ. وهذا نوع الحواجز الذي ستستخدمه في الإنتاج لالتقاط انحراف الإصدارات بين ريموتات منشورة باستقلال.

## `html.template`

```typescript
html: { template: './src/index.html' },
```

هذا يوجّه Rsbuild إلى ملف قالب HTML مخصّص بدل استخدام [الافتراضي المدمج](https://rsbuild.rs/config/html/template). والقالب الافتراضي في Rsbuild ملف HTML صغير فيه نقطة تركيب `<div id="root"></div>`. ويستخدم التمرين قالبًا مخصّصًا لأن المضيف والريموت يحتاجان بنيتين مختلفتين لـHTML — فالمضيف لديه هيكل الصفحة الكامل، وللريموت غلاف مستقل أبسط.

والمسار نسبي إلى جذر المشروع (حيث يعيش `rsbuild.config.ts`). ويمكن أيضًا أن يكون مسارًا مطلقًا، أو دالة تُرجع قوالب مختلفة لكل نقطة دخول في التطبيقات متعددة الصفحات.

## ما ليس في الإعداد

يتولى Rsbuild كثيرًا من الإعداد عبر افتراضيات لا يحتاج التمرين إلى تجاوزها. ومنها بضعة يستحق أن تعرفها:

- **`output.distPath`**: مكان مخرجات البناء. والقيمة الافتراضية `dist`. ويستخدم التمرين الافتراضي.
- **`source.entry`**: نقطة دخول التطبيق. والقيمة الافتراضية `src/index.(ts|js|tsx|jsx|mjs|mts)`. ويستخدم التمرين `src/index.tsx`، وهو مطابق للنمط الافتراضي.
- **`dev.assetPrefix`**: عند إعداد اتحاد الوحدات، يضبطه Rsbuild تلقائيًا على `true` بحيث تكون عناوين URL للموارد مطلقة لا نسبية. وهذا مهم لأن موارد الريموت يجب أن تكون قابلة للجلب من نطاق المضيف، والمسارات النسبية كانت ستُحلّ مقابل الأصل الخطأ.
- **`output.uniqueName`**: يضبطه Rsbuild تلقائيًا على `name` الخاص بالاتحاد عند إعداد اتحاد الوحدات. وهذا يمنع تصادم تسمية الأجزاء بين المشاركين. وقد كان على مستخدمي webpack ضبطه يدويًا — أما Rsbuild فيتولاه.
- **تقسيم الأجزاء**: تُعطَّل استراتيجية `split-by-experience` الافتراضية في Rsbuild تلقائيًا عند تفعيل اتحاد الوحدات، لأن للاتحاد سلوكه الخاص في تقسيم الأجزاء للوحدات المكشوفة والاعتمادات المشتركة.

هذه التعديلات التلقائية أحد أسباب استخدام إضافة اتحاد الوحدات في Rsbuild بدل إعداد Rspack الخام. فالإضافة تعرف أي افتراضيات Rsbuild يجب أن تتغير ليعمل الاتحاد، وتغيّرها نيابةً عنك.

## توسيع الإعداد

إعدادات التمرين دنيا لأنها تعلّم نموذج الاتحاد، لا مجموعة ميزات Rsbuild كاملة. وفي تهيئة إنتاجية، ستضيف على الأرجح بعضًا مما يلي:

**متغيرات البيئة** عبر `source.define` أو ملفات `.env`. يدعم Rsbuild ملفات `.env` و`.env.local` و`.env.development` و`.env.production` جاهزةً، والمتغيرات ذات البادئة `PUBLIC_` متاحة في شفرة العميل.

**إعداد الوسيط (proxy)** عبر `server.proxy` لطلبات API أثناء التطوير. وهو المفهوم نفسه في `server.proxy` لدى Vite أو `proxy` في webpack-dev-server — إذ يمرّر الطلبات المطابقة إلى خادم خلفي فلا تحتاج إلى ترويسات CORS في التطوير.

**أسماء مسارات TypeScript المستعارة** عبر `source.alias`. وإذا كان مشروعك يستخدم `paths` في `tsconfig.json`، فستكرّرها هنا حتى يحلّها المجمّع بشكل صحيح.

**إعداد CSS** عبر `tools.lightningcss` أو `tools.postcss`. ويستخدم Rsbuild معالجة CSS بـLightning CSS افتراضيًا، وهي تحل محل `postcss-loader` مع `autoprefixer` في معظم حالات الاستخدام.

**ميزانيات الأداء** عبر تلميحات الأداء في Rspack داخل `tools.rspack`. وتغطي [محاضرة ميزانيات الأداء](https://stevekinney.com/courses/enterprise-ui/performance-budgets) ذلك في سياق webpack — ويدعم Rspack الخيارات نفسها `performance.hints` و`maxAssetSize` و`maxEntrypointSize`.

لكن لا شيء من ذلك ضروري لفهم إعداد الاتحاد، وهو مقصد التمرين. ابدأ بأدنى إعداد يعمل، ولا تُضف تعقيدًا إلا عندما يكون لديك سبب.

---

## الخلاصة السريعة (TL;DR)

### Rsbuild لأجل اتحاد الوحدات

> البديل الحديث لـwebpack في التطبيقات الاتحادية.

- مبني على **Rspack** (بديل webpack قائم على Rust) — بناءات أسرع بـ5 إلى 10 أضعاف.
- إضافة اتحاد وحدات من الدرجة الأولى.
- متوافق مع بروتوكول الاتحاد في webpack — ويمكنه التبادل التشغيلي مع مضيفات/ريموتات webpack.

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'checkout',
      exposes: { './Cart': './src/Cart.tsx' },
      shared: { react: { singleton: true } },
    }),
  ],
});
```
