---
title: "تمرين 1: التركيب وقت التشغيل"
---

لنلقِ نظرة على إعداد واجهة مصغّرة وقت التشغيل. سنربط قشرة مضيف ووحدة تحليلات بعيدة باستخدام [اتحاد الوحدات](https://stevekinney.com/courses/enterprise-ui/module-federation). فحمّل تطبيق المضيف (المنفذ `3000`) لوحة التحليلات من وحدة بعيدة تُبنى وتُقدَّم بشكل منفصل (المنفذ `3001`) وقت التشغيل. وعلى الطريق ستهيّئ تفاوض الاعتمادات المشتركة، وتكتشف أن [سياق React](https://react.dev/reference/react/createContext) لا يستطيع عبور حدود الاتحاد، وتحلّ مشكلة التواصل العابر للحدود باستخدام [nanostores](https://github.com/nanostores/nanostores).

## لماذا يهم

تمنح الواجهات المصغّرة وقت التشغيل الفرق عمليات بناء ونشرًا مستقلة—لكنها تأتي بكلف تشغيلية حقيقية. خادما تطوير، وبيانات مدخل الوحدة البعيدة، وتفاوض الاعتمادات المشتركة، وإدارة حالة عابرة للحدود. وفي رأيي المتواضع، تحتاج إلى أن تعيش تلك الكلف بنفسك كي تتخذ قرارًا معماريًا مستنيرًا بشأن ما إذا كنت تحتاج فعلًا التركيب وقت التشغيل أم أن التركيب وقت البناء ([التمرين 2](https://stevekinney.com/courses/enterprise-ui/build-time-composition-exercise)) هو الأنسب.

## المتطلبات المسبقة

تستطيع *على الأرجح* أن تكتفي بإصدارات أقدم قليلًا من كليهما. لكن، من أجل سلامة عقلك، لنفترض أن لديك الإصدارات التالية من المتطلبات المسبقة.

في هذا التمرين، نعمل عبر مستودع [enterprise-ui-federation](https://github.com/stevekinney/enterprise-ui-federation).

- [Node](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 10+

## الإعداد

```bash
pnpm install
pnpm dev
```

افتح [http://localhost:3000](http://localhost:3000/) (**تطبيق المضيف**) و[http://localhost:3001](http://localhost:3001/) (**الوحدة البعيدة المستقلة**).

## استكشف إعداد الاتحاد

لنبدأ بمشاهدة التطبيق العامل، ثم نفهم كيف يربط [اتحاد الوحدات](https://stevekinney.com/courses/enterprise-ui/module-federation) القطع معًا.

### استكشف في المتصفح

1. افتح [http://localhost:3000](http://localhost:3000/)
2. افتح **DevTools** → تبويب **الشبكة (Network)**
3. ابحث عن `mf-manifest.json` وهو يُحمَّل من المنفذ 3001
4. سترى أيضًا ملفات الحزم محمَّلة من الوحدة البعيدة—وهي شيفرة لوحة التحليلات، مُقدَّمة من خادم تطوير الوحدة البعيدة.

[وإليك مثال](https://gist.github.com/stevekinney/47acdccfd1a3e3a7230d4d8f28b16023) عمّا يمكن أن تتوقعه من `mf-manifest.json`.

على أي حال، *ينبغي* أن ترى لوحة التحليلات تُحمَّل داخل قشرة المضيف. ويعرض الشريط الجانبي **Grace Hopper** وتحته **admin** بنص رمادي، وتعرض المساحة الرئيسية شاشة التحليلات مع بطاقات إحصاءات ومخطط. وفي تبويب الشبكة، يمكنك رؤية `mf-manifest.json` وملفات الحزم قادمة من `localhost:3001`.

قشرة المضيف تعرض شارة «Not authenticated»

> **ملاحظة**
>
> ستلاحظ أيضًا شارة كهرمانية «Not authenticated» في ترويسة لوحة التحليلات—رغم أن الشريط الجانبي يعرض مستخدمًا مسجّل الدخول. وهذا مقصود. إنه العطل الذي ستحقّق فيه في الخطوة 3 وتصلحه في الخطوة 4.

والآن لننظر إلى التهيئة التي تجعل هذا يعمل.

### ما الذي تنظر إليه

افتح [`host/rsbuild.config.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/rsbuild.config.ts) وابحث عن تهيئة `remotes`:

*host/rsbuild.config.ts*

```typescript
remotes: {
  remoteAnalytics:
    "remoteAnalytics@http://localhost:3001/mf-manifest.json",
},
```

يخبر هذا المضيف بمكان إيجاد بيان وحدات الوحدة البعيدة وقت التشغيل. والبيان (`mf-manifest.json`) هو العقد بين المضيف والوحدة البعيدة: فهو يسرد كل وحدة تكشفها الوحدة البعيدة، وأي حزم JavaScript تنفّذها، وأي اعتمادات مشتركة تعلنها الوحدة البعيدة. ويجلب المضيف ملف JSON هذا في **وقت التشغيل**، *قبل* تحميل أي شيفرة من الوحدة البعيدة، فيعرف ما هو متاح ويستطيع التفاوض على الاعتمادات المشتركة. ولهذا يجب أن يعمل خادما التطوير *كليهما* في الوقت نفسه: فالمضيف يُجري طلب شبكة إلى المنفذ `3001` عند كل تحميل صفحة.

> **ملاحظة**
>
> رأيت `mf-manifest.json` بالفعل في تبويب الشبكة. ذلك الطلب هو تفاوض اتحاد الوحدات وقت التشغيل في أبهى صوره: يتفق المضيف والوحدة البعيدة على الاعتمادات المشتركة والوحدات المتاحة قبل تنفيذ أي شيفرة من الوحدة البعيدة.

افتح [`remote-analytics/rsbuild.config.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts) وابحث عن تهيئة `exposes`:

*remote-analytics/rsbuild.config.ts*

```typescript
exposes: {
  "./analytics-dashboard": "./src/analytics-dashboard",
},
```

يعلن هذا الوحدات التي تتيحها الوحدة البعيدة للمستهلكين. فكّر في `exposes` كسطح الواجهة البرمجية العام للوحدة البعيدة: فالمسارات المدرجة هنا وحدها قابلة للاستيراد من المستهلكين. ويصير المفتاح على اليسار (`"./analytics-dashboard"`) مسار الاستيراد الذي يستخدمه المستهلكون (مثل `import("remoteAnalytics/analytics-dashboard")`)، أما القيمة على اليمين فهي ملف المصدر الفعلي.

افتح [`host/src/app.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/app.tsx) لترى الاستيراد الديناميكي:

*host/src/app.tsx*

```typescript
const AnalyticsDashboard = React.lazy(() => import('remoteAnalytics/analytics-dashboard'));
```

يحمّل المضيف مكوّن الوحدة البعيدة تحميلًا متأخرًا وقت التشغيل. فهو غير محزَّم في بناء المضيف. أما [`React.lazy`](https://react.dev/reference/react/lazy) مقترنًا بـ`import()` الديناميكي فيعني أن المتصفح لا ينزّل حزم JavaScript الخاصة بالوحدة البعيدة إلا عندما يُصيَّر `<AnalyticsDashboard />` أول مرة، لا عند تحميل الصفحة الأولى.

> **ماذا لو تجاهلت `React.lazy` واستخدمت استيرادًا ساكنًا؟**
>
> قد تجرّب `import AnalyticsDashboard from 'remoteAnalytics/analytics-dashboard'`—وهو استيراد عادي في المستوى الأعلى. سيفشل هذا وقت البناء. فوحدة `remoteAnalytics` غير موجودة في `node_modules` لدى المضيف: فحلّها يحدث *وقت التشغيل* من وقت تشغيل اتحاد الوحدات، لا وقت البناء من المُجمِّع. فالاستيراد الساكن يخبر المُجمِّع أن يحلّ الوحدة ويحزمها أثناء خطوة البناء، والمُجمِّع لا يعرف ما هو `remoteAnalytics`. أما `import()` الديناميكي فيعمل لأن اتحاد الوحدات يعترضه وقت التشغيل ويوجّهه عبر حلّ الوحدات الخاص به، فيجلب شيفرة الوحدة البعيدة عبر الشبكة. و`React.lazy` مجرد غلاف مريح يحوّل ذلك `import()` الديناميكي إلى مكوّن يعرف React كيف يصيّره مع حدّ `<Suspense>`.

افتح [`host/src/index.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/index.tsx)—وستلاحظ أنه مجرد `import("./bootstrap")`. فهذا الحدّ غير المتزامن مطلوب كي يعمل تفاوض الوحدات المشتركة في اتحاد الوحدات. وبدونه، تفشل الوحدات المشتركة المتلهّفة في الحلّ.

> **لماذا يحتوي `index.tsx` على استيراد ديناميكي فحسب**
>
> تفاوض الوحدات المشتركة في اتحاد الوحدات غير متزامن: فعلى وقت التشغيل أن يتصل بكل الوحدات البعيدة المسجَّلة ويحلّ أي إصدار من كل اعتماد مشترك سيُستخدم قبل أن تعمل أي شيفرة تطبيق. ولو استورد `index.tsx` شيفرة تطبيق بشكل تزامني، لنُفّذت تلك الشيفرة قبل اكتمال التفاوض وحصلت على خطأ وقت تشغيل: `Uncaught Error: Shared module is not available for eager consumption`. أما `import("./bootstrap")` الديناميكي فيؤجّل كل شيء حتى يصير وقت تشغيل الاتحاد جاهزًا.

### نقطة تحقق

رأيت التطبيق العامل في المتصفح وفهمت التهيئة التي تشغّله: `remotes` لدى المضيف وهي تشير إلى عنوان البيان، و`exposes` لدى الوحدة البعيدة وهي تعلن وحداتها العامة، والاستيراد الديناميكي المتأخر في المضيف، والحدّ غير المتزامن في `index.tsx`.

## تفاوض الاعتمادات المشتركة

يستخدم كل من المضيف والوحدة البعيدة React. وبلا تهيئة الاعتمادات المشتركة، سيحزم كل منهما نسخته الخاصة—وهو ما يكسر الخطافات والسياق وكل ما يعتمد على نسخة React واحدة.

### ما الذي تنظر إليه

في ملفي تهيئة rsbuild ([`host/rsbuild.config.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/rsbuild.config.ts) و[`remote-analytics/rsbuild.config.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts))، ابحث عن تهيئة `shared`. ويضبط الملفان `singleton: true` و`eager: true` على كل الاعتمادات المشتركة:

*rsbuild.config.ts (shared)*

```typescript
shared: {
  react: { singleton: true, eager: true },
  "react-dom": { singleton: true, eager: true },
  nanostores: { singleton: true, eager: true },
  "@nanostores/react": { singleton: true, eager: true },
  "@pulse/shared": { singleton: true, eager: true },
},
```

- **`singleton: true`**: لا تُحمَّل إلا نسخة واحدة من React، حتى لو أعلن المضيف والوحدة البعيدة إصدارين مختلفين. ويختار وقت تشغيل اتحاد الوحدات أعلى إصدار متوافق متاح ويفرض استخدام نسخة واحدة بالضبط. وبدون ذلك، يحمّل كل مشارك نسخته الخاصة، وهو ما يكسر كل ما يعتمد على نسخة وحدة واحدة: فخطافات React والسياق والمخازن كلها تقع في هذه الفئة. وهذا القيد عام: فإن أعلن *أي* مشارك وحدة كأحادية النسخة، فرضها وقت التشغيل على الجميع، فيستطيع المضيف حماية سلامته حتى إن نسيَت وحدة بعيدة ضبطها.
- **`eager: true`**: يحمّل الجانبان الوحدات المشتركة فورًا. وبدون `eager: true`، تتوقع الوحدة البعيدة أن يوفّر *المضيف* وحدات مشتركة مثل React وقت التشغيل. وهذا يعمل عند التحميل عبر مضيف، لكنه يعني أن الوحدة البعيدة لا تستطيع الإقلاع وحدها: فليس لديها من أين تحصل على React. أما `eager: true` فتحزم React مباشرةً في مخرجات الوحدة البعيدة كبديل احتياطي مكتفٍ بذاته. وما زال وقت تشغيل الاتحاد يزيل التكرار وقت التشغيل عند وجود المضيف، فلن تنتهي بنسختين من React في الإنتاج؛ و`eager` تضمن فقط أن يبقى النمط المستقل (`localhost:3001`) عاملًا.

> **عن Nanostores**
>
> يظهر [`@nanostores/react`](https://npm.im/@nanostores/react) في تهيئة المشاركة لدى الوحدة البعيدة رغم أنه ليس في `package.json` الخاصة بها بعد—وهذا مقصود. فقد هُيّئ مسبقًا كي تكون إزالة التكرار في الاتحاد جاهزة عندما تثبّت الحزمة في **الخطوة 4c**. ولن تحتاج إلى لمس التهيئة لاحقًا.

**تجربة:** أضف `requiredVersion` و`strictVersion` إلى مدخل React القائم لديك في [`rsbuild.config.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts) الخاص بالوحدة البعيدة. أبقِ `singleton: true` و`eager: true` في مكانهما، وأضف الحقلين الجديدين فقط:

*rsbuild.config.ts (shared)*

```typescript
shared: {
  react: {
    singleton: true,
    eager: true,
    requiredVersion: "^19.0.0",
    strictVersion: true,
  },
  // ... other shared entries unchanged
},
```

مع `strictVersion: true`، يرمي اتحاد الوحدات خطأً إن لم يلبِّ الإصدار الموفَّر شرط `requiredVersion`. واستخدام `"^19.0.0"` هنا سيُشغّل الخطأ لأن هذا المشروع يستخدم React 18. أوقف خوادم التطوير (`Ctrl+C`)، وشغّل `pnpm dev` مرة أخرى، ثم افتح `http://localhost:3001`. وستصير الصفحة **فارغة** (فلا يبدأ React أبدًا)، وسترى عدم توافق الإصدار في **DevTools → Console**:

```
Error: [ Federation Runtime ]: Version 18.3.1 from remoteAnalytics of shared singleton module react does not satisfy the requirement of remoteAnalytics which needs ^19.0.0)
```

وهذا مقصود: فقد رفضت الوحدة البعيدة إصدار React المتاح قبل أن تُصيَّر أي واجهة. وهكذا تلتقط انحراف الإصدارات بين وحدات بعيدة تُنشر باستقلال.

صفحة فارغة بعد خطأ عدم توافق الإصدار

**أزل الحقلين وأعد التهيئة الأصلية قبل المتابعة.** أوقف خوادم التطوير وشغّل `pnpm dev` مرة أخرى لالتقاط التهيئة المُرجَعة.

### نقطة تحقق

ينبغي أن تكون الطرفية نظيفة: بلا أخطاء وحدات مشتركة. ولا تُحمَّل إلا نسخة واحدة من React. وإن كانت React DevTools مثبَّتة لديك، فسترى شجرة React واحدة تمتد عبر مكونات المضيف والوحدة البعيدة معًا.

> **رسائل `[Federation Runtime] Warn`**
>
> قد ترى هذه في الطرفية طوال التمرين. وتظهر كلما هُيّئ اعتماد مشترك بلا `requiredVersion` صريحة (وهو حال معظم المدخلات في تهيئة المشاركة لدينا). وليست أخطاء، بل رسائل إعلامية فحسب من وقت تشغيل اتحاد الوحدات عن تفاوض الإصدارات. ويمكنك تجاهلها بأمان.

## مشكلة سياق المصادقة

والآن انظر إلى لوحة التحليلات بعناية أكبر. ثمة شيء خطأ.

### اكتشف العطل

1. انظر إلى **التنقل في الشريط الجانبي**: فهو يعرض «Grace Hopper» بدور «admin». ولدى المضيف بيانات المصادقة.
2. انظر إلى ترويسة **لوحة التحليلات**: فهي تعرض شارة كهرمانية **«Not authenticated»**. أما الوحدة البعيدة فـ*لا* تملك بيانات المصادقة.

### لماذا يحدث هذا

يعتمد سياق React على هوية الكائن: فيجب أن يُنتج استدعاء `createContext()` نفسه الكائن نفسه على الجانبين. وفي إعداد اتحادي، تنشئ الحزم المبنية منفصلةً كائنات سياق منفصلة، فلا يتطابق الموفّر والمستهلك أبدًا.

```
sequenceDiagram
    participant Host as Host Bundle
    participant Context as React Context Registry
    participant Remote as Remote Bundle

    Host->>Context: createContext() → ContextA
    Host->>Context: Provide value via ContextA
    Remote->>Context: createContext() → ContextB
    Remote->>Context: useContext(ContextB)
    Context-->>Remote: Default value (no match)
    Note over Host,Remote: ContextA !== ContextB—different object identity
```

افتح [`host/src/shell/auth-provider.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/shell/auth-provider.tsx). فالمضيف يجلب المستخدم الحالي من `/api/users/me` ويوفّره عبر سياق React:

*host/src/shell/auth-provider.tsx*

```typescript
const AuthContext = createContext<AuthContextType>({ ... });

export function AuthProvider({ children }) {
  // Fetches user, provides via context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

والآن افتح [`remote-analytics/src/analytics-dashboard.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/src/analytics-dashboard.tsx). وابحث عن قيم المصادقة المكتوبة مباشرةً قرب أعلى المكوّن:

*remote-analytics/src/analytics-dashboard.tsx*

```typescript
// THE BUG: This component has no access to the host's auth context.
// It cannot read the current user or auth token.
// On the main branch, this is intentionally broken.
const isAuthenticated = false;
const userName: string | null = null;
```

*ملاحظة:* هذه مكتوبة مباشرةً لأن سياق React لا يستطيع عبور حدود الاتحاد

لا سبيل للوحدة البعيدة إلى الوصول إلى سياق React لدى المضيف. فرغم أن `<AnalyticsDashboard />` يُصيَّر *داخل* `<AuthProvider>` لدى المضيف، فإن شيفرة المكوّن *بُنيت منفصلة*. ولا يعبر سياق React حدود اتحاد الوحدات: فحلّ وحدة React لدى الوحدة البعيدة يرى كائن سياق مختلفًا عن الذي يراه المضيف.

> **يُطابَق سياق React بهوية الكائن، لا بالنوع.**
>
> عندما ينادي المضيف `createContext(...)`، يعود إليه كائن JavaScript محدد—لنسمّه `ContextA`. وعندما تنادي الحزمة المبنية منفصلةً في الوحدة البعيدة `createContext(...)` كذلك (أو تستورد ما يبدو أنه السياق نفسه من ملف مشترك)، يعود إليها كائن JavaScript *مختلف* هو `ContextB`. ويعمل خُطّاف [`useContext`](https://react.dev/reference/react/useContext) في React بالصعود في شجرة المكوّنات للعثور على `<Context.Provider>` يكون كائن سياقه `===` للكائن الممرَّر. فـ`<AuthContext.Provider>` لدى المضيف يوفّر `ContextA`؛ أما `useContext(AuthContext)` لدى الوحدة البعيدة فيطلب `ContextB`. ولا يتطابقان أبدًا—فتقرأ الوحدة البعيدة القيمة الافتراضية دائمًا.
>
> قد تظن: «صدّر السياق من `@pulse/shared` واستورده في الموضعين». حتى هذا لن يعمل: فهوية سياق React تقوم على *نسخة الوحدة*، لا على النوع. فأنواع TypeScript تُمحى وقت التصريف؛ وما يهم وقت التشغيل هو هل تلقّى جزءا الشيفرة *كائن JavaScript نفسه*. ومع اتحاد الوحدات، ما لم تُعلَن حزمة كاعتماد مشترك أحادي النسخة، يقيّمها المضيف والوحدة البعيدة باستقلال—فيُشغَّل `createContext()` مرتين، منتجًا كائنين متمايزين. ونقل `createContext` إلى حزمة مشتركة لا يفيد إلا إن كانت تلك الحزمة نفسها وحدة مشتركة أحادية النسخة.

### نقطة تحقق

فهمت لماذا تعرض لوحة التحليلات **Not authenticated**: فأشجار سياق React لا تمتد عبر حدود الاتحاد. ولدى المضيف بيانات المصادقة، لكن الوحدة البعيدة لا تستطيع الوصول إليها عبر آليات React المدمجة.

## التواصل العابر للحدود

الحل هو استخدام مكتبة إدارة حالة مستقلة عن إطار العمل يستطيع المضيف والوحدة البعيدة مشاركتها. و`nanostores` مثبَّتة بالفعل في `@pulse/shared`، وكل ما تحتاجه هو إنشاء المخزن وربطه.

### أنشئ مخزن المصادقة

أنشئ ملفًا جديدًا `shared/src/auth-store.ts` (ملاحظة: [`auth.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/auth.ts) موجود بالفعل في ذلك المجلد، وهو يحوي أدوات قناة البث ولا علاقة له بما تحتاجه هنا):

> **ما هي ذرّة nanostore؟**
>
> `atom` أبسط عنصر أولي في nanostores: حاوية تفاعلية لقيمة واحدة. واستدعاء `atom(initialValue)` يعيد كائن مخزن بثلاث دوال: `.get()` لقراءة القيمة الحالية، و`.set(newValue)` لكتابة قيمة جديدة وإخطار كل المشتركين، و`.subscribe(callback)` للاستماع إلى التغييرات. ويغلّف خُطّاف `useStore` من [`@nanostores/react`](https://github.com/nanostores/react) الدالة `.subscribe()` في خُطّاف React، فيعيد تصيير المكوّن كلما تغيّرت قيمة الذرّة. والذرّة نفسها بلا أي اعتماد على React: فهي JavaScript صرفة، ولهذا بالضبط تستطيع عبور حدود أطر العمل والاتحاد التي لا تستطيع العناصر الأولية الخاصة بـReact عبورها.

*shared/src/auth-store.ts*

```typescript
import { atom } from 'nanostores';
import type { AuthContext } from './types';

export const authStore = atom<AuthContext>({
  user: null,
  isAuthenticated: false,
  token: null,
});
```

ثم أضف التصدير التالي إلى [`shared/src/index.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/index.ts):

*shared/src/index.ts*

```typescript
export * from './auth-store';
```

### اكتب إلى المخزن من المضيف

افتح [`host/src/shell/auth-provider.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/shell/auth-provider.tsx). واستورد المخزن وحدّثه عند تغيّر حالة المصادقة.

أضف استيرادًا ثانيًا من `@pulse/shared`—وأبقِه منفصلًا عن الاستيراد الحالي الخاص بالأنواع وحده، لأن هذا استيراد لقيمة وقت تشغيل:

> **ملاحظة**
>
> تُمحى صيغة `import type` في TypeScript كليًا وقت التصريف: فهي موجودة لفحص الأنواع فقط ولا تنتج أي مخرجات JavaScript. ولا يمكن تضمين قيمة وقت تشغيل مثل `authStore` في عبارة `import type`. وإبقاؤهما في سطري `import` منفصلين أوضح طريقة للإشارة إلى أي الاستيرادات للأنواع وحدها وأيها يحمل شيفرة وقت تشغيل.

*host/src/shell/auth-provider.tsx*

```typescript
import type { User, AuthContext as AuthContextType } from '@pulse/shared';
import { authStore } from '@pulse/shared';
```

داخل `useEffect`، اكتب إلى مخزن nanostores مباشرةً بعد استدعائي الحالة القائمين في كتلة `try`:

*host/src/shell/auth-provider.tsx*

```typescript
try {
  const response = await fetch('/api/users/me');
  const data: User = await response.json();
  setUser(data);
  setToken('mock-jwt-token-' + data.id);
  authStore.set({
    user: data,
    isAuthenticated: true,
    token: 'mock-jwt-token-' + data.id,
  });
} catch (error) {
  console.error('Failed to fetch current user:', error);
}
```

*ملاحظة:* يكتب إلى مخزن nanostores المشترك كي تستطيع الوحدة البعيدة قراءته

### اقرأ من المخزن في الوحدة البعيدة

أولًا، أضف `@nanostores/react` إلى الوحدة البعيدة كي تستطيع استخدام ارتباطات React. وفي طرفية منفصلة (لا التي تشغّل `pnpm dev`)، شغّل من جذر المستودع:

```bash
pnpm --filter @pulse/remote-analytics add @nanostores/react
```

> **لماذا؟**
>
> يستخدم pnpm عزلًا صارمًا للوحدات: فلا تستطيع كل حزمة أن تستورد إلا اعتماداتها المعلنة. فرغم أن `@pulse/shared` يعتمد بالفعل على `@nanostores/react`، تحتاج الوحدة البعيدة إلى إعلانها الخاص لحلّ الاستيراد وقت البناء. أما وقت التشغيل، فتهيئة الأحادية النسخة في اتحاد الوحدات تضمن ألا تُحمَّل إلا نسخة واحدة.

والآن افتح [`remote-analytics/src/analytics-dashboard.tsx`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/src/analytics-dashboard.tsx). واستبدل قيم المصادقة المكتوبة مباشرةً بمخزن nanostores.

أضف هذين الاستيرادين:

*remote-analytics/src/analytics-dashboard.tsx*

```typescript
import { useStore } from '@nanostores/react';
import { authStore } from '@pulse/shared';
```

داخل المكوّن، ابحث عن كتلة التعليق `// THE BUG` وسطري `const` المكتوبين مباشرةً تحتها واحذفها، ثم استبدلها بمخزن nanostores:

```typescript
// Delete these five lines:
// THE BUG: This component has no access to the host's auth context.
// It cannot read the current user or auth token.
// On the main branch, this is intentionally broken.
const isAuthenticated = false;
const userName: string | null = null;
```

*remote-analytics/src/analytics-dashboard.tsx*

```typescript
// Add these three lines in their place:
const auth = useStore(authStore);
const isAuthenticated = auth.isAuthenticated;
const userName = auth.user?.name ?? null;
```

*ملاحظة:* يقرأ من نسخة الذرّة نفسها التي يكتب إليها المضيف

### لماذا ينجح هذا

ثمة أمران يجعلان هذا ينجح:

1. **`@pulse/shared` اعتماد مشترك أحادي النسخة** في ملفي تهيئة rsbuild. هذا يعني أن المضيف والوحدة البعيدة يتشاركان نسخة الوحدة نفسها بالضبط من `@pulse/shared` وقت التشغيل: فالذرّة `authStore` التي ينشئها `atom(...)` في `auth-store.ts` هي الكائن نفسه في المضيف والوحدة البعيدة معًا.
2. **`nanostores` و`@nanostores/react` اعتمادان مشتركان أحاديا النسخة أيضًا.** وهذا يضمن أن مكتبة المخزن وارتباطاتها بـReact نسخة واحدة على الجانبين، فيشترك `useStore()` في الوحدة البعيدة في الذرّة نفسها التي يكتب إليها المضيف.

وعندما ينادي المضيف `authStore.set(...)`، يرى خُطّاف `useStore(authStore)` في الوحدة البعيدة التحديث فورًا، لأنهما حرفيًا الكائن نفسه في الذاكرة.

> **ارتباط الأحادية النسخة حمولة إنشائية.**
>
> كل جزء من هذا الحل يعتمد على إعلان `@pulse/shared` كاعتماد مشترك أحادي النسخة في ملفي تهيئة rsbuild. فلو غاب عن `shared`، لحزم اتحاد الوحدات نسخة منفصلة من `@pulse/shared` في المضيف والوحدة البعيدة معًا. وحينها يكتب `authStore.set(...)` لدى المضيف إلى كائن ذرّة واحد، بينما يشترك `useStore(authStore)` لدى الوحدة البعيدة في كائن ذرّة مختلف تمامًا لا يتلقى أي تحديثات قط. وسترى «Not authenticated» إلى الأبد، بلا خطأ وبلا سبب ظاهر. وينطبق الأمر نفسه على `nanostores` نفسها: فلو تكررت المكتبة التي تنفّذ `.subscribe()` و`.set()`، لغدت الاشتراكات المُنشأة على إحدى النسختين غير مرئية للأخرى. ويجب أن تكون الحزم الثلاث كلها—`@pulse/shared` و`nanostores` و`@nanostores/react`—أحادية النسخة كي تعمل التفاعلية العابرة للحدود.

> **إن كانت الشارة ما زالت تقول «Not authenticated»**
>
> بعد إجراء هذه التغييرات، تحقق من إدراج `@pulse/shared` في تهيئة `shared` في ملفي `rsbuild.config.ts`. فبدون ذلك، تحزم كل جهة نسختها الخاصة من `@pulse/shared` وتنشئ نسخ ذرّات منفصلة: يكتب المضيف إلى ذرّة وتقرأ الوحدة البعيدة من أخرى مختلفة.

وهذا هو الإدراك الجوهري: **الحالة المستقلة عن إطار العمل (nanostores، وBroadcastChannel، والأحداث المخصصة) تعبر الحدود التي لا تستطيع الحالة الخاصة بإطار العمل (سياق React) عبورها**—لكن فقط إن كانت الوحدة التي تنشئ الحالة مشتركة بين الجانبين.

أوقف خوادم التطوير (`Ctrl+C`) وشغّل `pnpm dev` مرة أخرى لالتقاط الملف الجديد، والتصدير الجديد، والاعتماد المثبَّت حديثًا. ثم افتح [http://localhost:3000](http://localhost:3000/).

### نقطة تحقق

تعرض لوحة التحليلات الآن شارة خضراء **«Viewing as: Grace Hopper»** بدل الشارة الكهرمانية «Not authenticated». فسياق المصادقة يتدفق من المضيف إلى الوحدة البعيدة عبر مخزن nanostores المشترك.

التطبيق بعد الإصلاح يعرض Viewing as Grace Hopper

## أهداف إضافية

- [BroadcastChannel للتواصل العابر للحدود](https://stevekinney.com/courses/enterprise-ui/broadcast-channel): طبّق المصادقة العابرة للحدود نفسها باستخدام واجهة `BroadcastChannel` في المتصفح بدل nanostores—بلا حاجة إلى اعتمادات مشتركة أحادية النسخة.
- [حدود الأخطاء واتحاد الوحدات](https://stevekinney.com/courses/enterprise-ui/error-boundaries-and-federation): أوقف خادم تطوير الوحدة البعيدة، وأعد تحميل المضيف، واكتشف لماذا لا تستطيع حدود أخطاء React التقاط أعطال الاتحاد.
- [الوحدات البعيدة المستقلة](https://stevekinney.com/courses/enterprise-ui/standalone-remotes): زُر `localhost:3001` مباشرةً وافهم لماذا النمط المستقل أهم قرار لتجربة المطوّر في معمارية اتحادية.

## التركيب وقت التشغيل مقابل وقت البناء

لقد خضت الآن الكلفة التشغيلية الكاملة لاتحاد الوحدات. وقبل المتابعة، يجدر أن نكون صادقين بشأن أين تبرَّر تلك الكلفة وأين لا تبرَّر.

### أين يتفوق التركيب وقت التشغيل

**عمليات النشر المستقلة.** هذا هو السبب الوحيد للتوجه إلى اتحاد الوحدات. فعندما تصدر فرقة التحليلات وفرقة القشرة وفق جدولين مختلفين، يتيح لهما التركيب وقت التشغيل النشر باستقلال: فيجلب المضيف ما تقدمه الوحدة البعيدة حاليًا بلا إصدار منسّق. ولا تمنحك أي استراتيجية تركيب أخرى ذلك.

**عزل التقنيات.** لأن الحدّ عقد شبكي (البيان ومسارات الوحدات المكشوفة)، تستطيع وحدات بعيدة مختلفة استخدام أطر عمل مختلفة، أو إصدارات React مختلفة، أو حتى أدوات بناء مختلفة—ما دامت تكشف واجهة متوافقة. فيمكن أن يحمّل مضيف React 18 وحدة بعيدة بـReact 19، أو تمزج React وVue، بطرق لا تستطيع حزمة مشتركة استيعابها.

**الخنق التدريجي.** تستطيع وحدة بعيدة أن تلفّ شيفرة قديمة وتكشفها كمكوّن حديث. ولا يحتاج المضيف إلى معرفة ذلك أبدًا. وهذا يجعل اتحاد الوحدات أداة عملية لترحيل التطبيقات القديمة الكبيرة بلا إعادة كتابة جذرية—وهو ما ستستكشفه مباشرةً في [التمرين 9](https://stevekinney.com/courses/enterprise-ui/strangler-fig-and-codemods-exercise).

### أين تكلّفك

**تجربة المطوّر.** شغّلت خادمَي تطوير، وهيّأت عناوين بيانات، ونقّحت أخطاء إقلاع غير متزامن، وتصارعت مع علمَي `singleton`/`eager`. لا شيء من ذلك موجود في مستودع أحادي بمساحة عمل. وضريبة تجربة المطوّر حقيقية ومستمرة: فكل مطوّر جديد في الفريق يحتاج إلى فهم طوبولوجيا الاتحاد قبل أن ينقّح بفعالية.

**سلامة الأنواع تتوقف عند الحدّ.** فلا يستطيع TypeScript أن يرى عبر مدخل وحدة بعيدة. ويعيد `import('remoteAnalytics/analytics-dashboard')` لدى المضيف النوع `any` إلا إن كنت تحافظ يدويًا على بدائل تعريفات أنواع أو تستخدم إضافة تولّدها. والأخطاء التي كانت ستُلتقط وقت التصريف في مستودع أحادي تصير أعطالًا وقت التشغيل في الإنتاج.

**إدارة الحالة تصير قيدًا.** فسياق React، ومخازن Zustand، وRedux، وأي مكتبة حالة أخرى تعتمد على نسخة الوحدة، تنكسر بصمت عبر حدود الاتحاد. وعليك أن تتوجه إلى عناصر أولية مستقلة عن إطار العمل—nanostores، وBroadcastChannel، والأحداث المخصصة—وأن تعلن كل شيء مشترك كأحادي النسخة. وهذا يعمل، لكنه يضيف طبقة تعقيد لا وجود لها في التركيب وقت البناء.

**أنماط الفشل غير مرئية.** فعندما يفشل تحميل وحدة بعيدة، لا تستطيع حدود أخطاء React التقاط خطأ وقت تشغيل الاتحاد: فتحصل على قسم فارغ بلا أي إشارة مرئية إلى ما جرى. ويتطلب التنقيح أن تعرف أن تفحص تبويب الشبكة بحثًا عن طلب البيان، ثم الطرفية بحثًا عن تحذيرات وقت تشغيل الاتحاد، ثم عنوان الوحدة البعيدة المستقل للتأكد من أنها تعمل أصلًا.

### القرار

|  | وقت التشغيل (الاتحاد) | وقت البناء (مساحة العمل) |
| --- | --- | --- |
| عمليات النشر المستقلة | نعم | لا |
| فحص الأنواع وقت التصريف | لا (تعريفات يدوية) | نعم، عبر كل الحزم |
| إعادة التحميل الساخن عبر الحدود | لا (أعد بناء الوحدة البعيدة) | نعم |
| الحالة العابرة للحدود | nanostores / BroadcastChannel | سياق React |
| تهيئة الاعتمادات المشتركة | مطلوبة (`singleton`, `eager`) | لا حاجة لأي منها |
| خوادم التطوير | واحد لكل وحدة بعيدة + المضيف | واحد |
| تعقيد التنقيح | مرتفع | منخفض |

الاختيار الصحيح هو التركيب وقت البناء في الغالبية العظمى من الحالات—إلى أن لا يكون. فإن كانت فرقك تنشر وفق جداول مختلفة، أو كان مستودعك يمتد عبر حدود تقنية لا يمكن توحيدها، فاتحاد الوحدات يستحق كلفته. وإلا فأنت تدفع كلفة تشغيلية إضافية لمشكلة لا تملكها.

## ما التالي

لقد لمست فعلًا ما تكلّفه التركيب وقت التشغيل. والسؤال التالي الطبيعي: ماذا لو استهلكت وحدة التحليلات نفسها كحزمة مساحة عمل عادية—بلا مدخل وحدة بعيدة، ولا بيان، ولا تفاوض اعتمادات مشتركة؟ المنتج نفسه، ومعمار أبسط جذريًا. وهذا ما يستكشفه [التركيب وقت البناء](https://stevekinney.com/courses/enterprise-ui/build-time-composition-exercise).
