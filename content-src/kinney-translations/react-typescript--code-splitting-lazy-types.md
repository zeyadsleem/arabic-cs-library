---
title: "تقسيم الشيفرة والأنواع الكسولة"
---

تقسيم الشيفرة (code-splitting) هو واحد من تلك تحسينات الأداء التي تبدو مخيفة، لكنها تكتشف أنّها أبسط مما تظنّ بمجرد أن تفهم آليّتها. فأنت في الأساس تخبر حُزّام ملفاتك (على الأغلب Webpack أو Vite) أن ينشئ مقاطع JavaScript منفصلة تُحمَّل عند الحاجة، بدلًا من حشر كل شيء في حزمة واحدة ضخمة. ومع دالة `lazy` في React ونظام الأنواع في TypeScript، يمكنك تقسيم مكوّناتك مع الحفاظ على سلامة أنواعك—بلا أي مساومة.

وتبدأ السحر الحقيقي حين تدمج `React.lazy()` مع استنتاج الأنواع في TypeScript. فالمكوّنات المحمّلة كسولًا تحصل على الفحص نفسه الذي تحصل عليه المكوّنات العادية، ويتحقّق التحقّق من الخصائص (props) كما هو متوقّع، ويظلّ محرّكك البرمجي يقدّم لك الإكمال التلقائي. وكأنّك تأكل الكعكة وتحتفظ بها معًا، مع الفارق أنّ الكعكة تُحمَّل أسرع ولا يضطرّ المستخدمون إلى انتظار مقاطع قد لا يحتاجونها أبدًا.

## الإعداد الأساسي

لنبدأ بالأساسيات. تتوقّع `React.lazy()` دالة تُعيد وعدًا (promise) يُحلّ إلى وحدة فيها تصدير افتراضي (default export). إليك أبسط مثال ممكن:

```typescript
import React, { Suspense, lazy } from 'react';

// ✅ This works - default export component
const LazyComponent = lazy(() => import('./components/ExpensiveChart'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

المطلب الأساسي هنا هو أن يكون `ExpensiveChart` **تصديرًا افتراضيًا (default export)**. وهذا ما يُوقع كثيرًا من المطوّرين في حيرة، إذ يفضّلون التصدير المسمّى (named export)، لكن آلية التحميل الكسول في React تبحث تحديدًا عن التصدير الافتراضي من الوحدة المستوردة.

```typescript
// ✅ Good - default export
export default function ExpensiveChart() {
  return <div>Complex chart goes here</div>;
}

// ❌ Bad - named export won't work with React.lazy
export function ExpensiveChart() {
  return <div>This won't work</div>;
}
```

## التعامل مع الخصائص مع السلامة النمطية

السؤال الحقيقي هو: كيف تمرّر الخصائص إلى المكوّنات الكسولة مع الحفاظ على السلامة النمطية؟ والخبر الجيّد هو أنّ استنتاج TypeScript يتعامل مع هذا على نحو رائع بمجرد أن تضبط بنية التصدير بشكل صحيح.

```typescript
// components/UserProfile.tsx
interface UserProfileProps {
  userId: string;
  showAvatar?: boolean;
  onUserUpdate?: (user: User) => void;
}

export default function UserProfile({ userId, showAvatar = true, onUserUpdate }: UserProfileProps) {
  // Component implementation
  return (
    <div>
      <h2>User Profile</h2>
      {/* ... rest of component */}
    </div>
  );
}
```

```typescript
// App.tsx
import React, { Suspense, lazy } from 'react';

const LazyUserProfile = lazy(() => import('./components/UserProfile'));

function App() {
  const handleUserUpdate = (user: User) => {
    console.log('User updated:', user);
  };

  return (
    <div>
      <Suspense fallback={<div>Loading user profile...</div>}>
        <LazyUserProfile userId="123" showAvatar={false} onUserUpdate={handleUserUpdate} />
      </Suspense>
    </div>
  );
}
```

يستنتج TypeScript تلقائيًا أنواع الخصائص من التصدير الافتراضي للمكوّن. فتحصل على IntelliSense كامل، وعلى التحقّق من الخصائص، وعلى فحص الأنواع وقت التصريف—بالضبط ما تتوقّعه من مكوّن عادي.

## العمل مع التصديرات المسمّاة

أحيانًا يكون لديك مكوّن ليس التصدير الافتراضي، أو إذا احتجت إلى تحميل تصدير مسمّى محدّد كسولًا. يمكنك معالجة ذلك بإنشاء وحدة غلاف صغيرة أو باستخدام الاستيراد الديناميكي بذكاء:

```typescript
// Method 1: Re-export as default
// components/LazyDashboard.ts
export { Dashboard as default } from './Dashboard';

// Method 2: Create a wrapper component
// components/LazySettings.tsx
import { Settings } from './Settings';
export default Settings;

// Method 3: Use dynamic import with destructuring
const LazySettings = lazy(async () => {
  const { Settings } = await import('./components/Settings');
  return { default: Settings };
});
```

لكل نهج مزاياه. النهج الأول نظيف في إعادة التصدير البسيط، والنهج الثاني يوفّر لك موضعًا لإضافة منطق الغلاف عند الحاجة، والنهج الثالث يُبقي كل شيء في مكانه (مع أنه أطول قليلًا).

## أنماط متقدّمة مع حدود الأخطاء

حين تفشل المكوّنات في التحميل—بسبب مشكلات في الشبكة أو مقاطع مفقودة أو أعطال في الخادم—فأنت تريد تدهورًا رشيقًا (graceful degradation). وجمع حدود الأخطاء مع `Suspense` يمنحك تحكّمًا كاملًا في تجربة التحميل:

```typescript
import React, { ErrorBoundary } from 'react-error-boundary';

function ChunkErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert" className="error-fallback">
      <h2>Something went wrong loading this section</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const LazyDashboard = lazy(() => import('./components/Dashboard'));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ChunkErrorFallback}>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <LazyDashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
```

> **تلميح**
>
> لُفّ المكوّنات الكسولة دائمًا داخل `Suspense` (لحالات التحميل) و`ErrorBoundary` (لحالات الفشل) معًا. وسيشكرلك المستخدمون حين تتعثّر شبكة اتصالاتهم المتنقّلة الهشّة.

## استراتيجيات التحميل المسبق

أحيانًا تريد تحميل المكوّنات قبل أن تكون ضرورية فعلًا. ربما تعرف أن مستخدمًا ما سينتقل إلى قسم معيّن على الأرجح، أو تريد التحميل المسبق في وقت الخمول (idle time). لا يوفّر React ذلك جاهزًا، لكن يمكنك بناءه بنفسك:

```typescript
// Create a preloadable lazy component
function createPreloadableComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
) {
  const LazyComponent = lazy(importFunc);

  // Create a preload function that triggers the import
  (LazyComponent as any).preload = importFunc;

  return LazyComponent as typeof LazyComponent & { preload: () => Promise<{ default: T }> };
}

// Usage
const LazyUserSettings = createPreloadableComponent(() => import('./components/UserSettings'));

function App() {
  // Preload on hover or any other trigger
  const handleMouseEnter = () => {
    LazyUserSettings.preload();
  };

  return (
    <div>
      <button onMouseEnter={handleMouseEnter}>Settings</button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyUserSettings />
      </Suspense>
    </div>
  );
}
```

هذا النمط يمنحك تحكّمًا دقيقًا في توقيت تحميل المقاطع، ويمكنه أن يُحسّن الأداء المُدرَك بشكل ملحوظ.

## التقسيم على مستوى المسارات

أكثر مكان شائع لتطبيق تقسيم الشيفرة هو مستوى المسارات (routes). فكل صفحة تصبح مقطعها الخاص، يُحمَّل فقط عندما ينتقل المستخدم إليها:

```typescript
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-load page components
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <div className="app">
      <nav>{/* Navigation components load immediately */}</nav>

      <main>
        <Suspense fallback={<div className="page-loading">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
```

يمكن لهذا النهج أن يُقلّل حجم حزمتك الأوّلي بشكل لافت. فالمستخدمون الذين ينزّلون تطبيقك لا يحصلون في البداية إلّا على شيفرة الصفحة الرئيسية، ثم تُحمَّل مقاطع إضافية مع تنقّلهم.

## السلامة النمطية مع المكوّنات المعقّدة

حين تعمل مع تسلسلات هرمية من المكوّنات أكثر تعقيدًا، يواصل استنتاج الأنواع في TypeScript عمله بسلاسة. فالمكوّنات العامة (generics) والمكوّنات الأعلى ترتيبًا (higher-order components) والمراجع المُمرَّرة (forwarded refs) تنسجم جميعها مع التحميل الكسول:

```typescript
// Generic lazy component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) -> JSX.Element;
  loading?: boolean;
}

function DataList<T>({ items, renderItem, loading = false }: ListProps<T>) {
  if (loading) return <div>Loading items...</div>;

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default DataList;
```

```typescript
// Usage with full type safety
const LazyDataList = lazy(() => import('./components/DataList'));

interface User {
  id: string;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <Suspense fallback={<div>Loading user list...</div>}>
      <LazyDataList
        items={users}
        renderItem={(user) => (
          <span>
            {user.name} - {user.email}
          </span>
        )}
      />
    </Suspense>
  );
}
```

يستنتج TypeScript على نحو صحيح أنّ `user` في دالة `renderItem` من النوع `User`، فتأمن لك سلامة نمطية كاملة حتى مع المكوّنات العامة المحمّلة كسولًا.

## الأخطاء الشائعة والحلول

### فخّ غياب التصدير الافتراضي

هذه على الأرجح الخطأ الأكثر شيوعًا الذي يقع فيه المطوّرون عند تطبيق تقسيم الشيفرة:

```typescript
// ❌ This will cause runtime errors
export function MyComponent() {
  return <div>Hello</div>;
}

const LazyComponent = lazy(() => import('./MyComponent'));
// Error: Element type is invalid - expected string or class/function
```

رسالة الخطأ ليست مفيدة بشكل خاص، لكن الحل بسيط—تأكّد من أنّ مكوّنك لديه تصدير افتراضي:

```typescript
// ✅ Fixed version
function MyComponent() {
  return <div>Hello</div>;
}

export default MyComponent;
```

### موضع حدود `Suspense`

مشكلة شائعة أخرى هي وضع حدود `Suspense` في موضع مرتفع جدًّا أو منخفض جدًّا في شجرة المكوّنات لديك:

```typescript
// ❌ Too high - entire app shows loading state
function App() {
  return (
    <Suspense fallback={<div>Loading entire app...</div>}>
      <Header />
      <Navigation />
      <LazyMainContent />
      <Footer />
    </Suspense>
  );
}

// ✅ Just right - only the lazy component area shows loading
function App() {
  return (
    <div>
      <Header />
      <Navigation />
      <Suspense fallback={<div>Loading main content...</div>}>
        <LazyMainContent />
      </Suspense>
      <Footer />
    </div>
  );
}
```

ضع حدود `Suspense` قريبة من الموضعين اللذين تُستخدم فيهما المكوّنات الكسولة فعلًا، حتى تبقى بقية أجزاء واجهتك تفاعلية أثناء التحميل.

### تعبيرات الاستيراد الديناميكي

كن حذرًا مع تعبيرات الاستيراد الديناميكي—فهي تحتاج إلى أن تكون ثابتة بما يكفي ليتمكّن حُزّام الملفات من فهمها:

```typescript
// ❌ Too dynamic - bundler can't analyze
const LazyComponent = lazy(() => import(someVariable));

// ❌ Also too dynamic
const LazyComponent = lazy(() => import(`./components/${componentName}`));

// ✅ Static path - bundler can analyze and split properly
const LazyComponent = lazy(() => import('./components/MyComponent'));
```

تحتاج معظم حُزّام الملفات إلى القدرة على تحليل عبارات الاستيراد لديك تحليلًا ساكنًا كي تنشئ المقاطع المناسبة.

## اعتبارات الأداء

تقسيم الشيفرة ليس دائمًا مكسبًا صافيًا—هناك مقايضات يجب أخذها في الحسبان:

**الفوائد:**

- تقليل حجم الحزمة الأوّلية
- تحميل أسرع للصفحة الأولى
- تحميل الشيفرة التي يحتاجها المستخدمون فعلًا فقط
- تخزين مؤقت أفضل (تبقى المقاطع غير المتغيّرة مخزّنة)

**التكاليف:**

- طلبات شبكة إضافية للمقاطع
- حالات تحميل محتملة وتقطّعات بصرية
- تعقيد في التعامل مع حالات التحميل والأخطاء
- عبء تقسيم الحزم

تكون النقطة المثلى عادةً عند مستوى المسارات أو مع المكوّنات الثقيلة حقًّا (مكتبات الرسوم البيانية الكبيرة، ومحرّرات النصوص الغنية، ولوحات الإدارة التي لن يراها معظم المستخدمين). لا تقسّم كل مكوّن—ركّز على تلك التي ستُقلّل حجم حزمتك الأوّلي بصورة ذات معنى.

## تحليل الحزم وتحسينها

لاتخاذ قرارات مبنية على المعرفة بشأن تقسيم الشيفرة، تحتاج إلى رؤية واضحة لتكوين حزمتك. وتوفّر معظم حُزّام الملفات أدوات تحليل:

```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer

# Vite Bundle Analyzer
npm install --save-dev rollup-plugin-analyzer

# For Create React App
npm install --save-dev source-map-explorer
npm run build
npm run analyze
```

ابحث عن:

- اعتماديات كبيرة يمكن تقسيمها
- شيفرة مكرّرة عبر المقاطع
- مقاطع صغيرة جدًّا (عبء التقسيم أكبر من المنفعة)
- مكوّنات المسار الحرج التي ينبغي أن تُحمَّل فورًا

## الخلاصة

تقسيم الشيفرة باستخدام React.lazy وTypeScript يمنحك أدوات قويّة لتحسين أداء التحميل في تطبيقك دون التضحية بالسلامة النمطية. والمفتاح هو أن تكون استراتيجيًّا في تحديد مواضع التقسيم—ركّز على المسارات وعلى المكوّنات الثقيلة حقًّا بدلًا من تقسيم كل شيء.

ابدأ بالتقسيم على مستوى المسارات لتحصل على مكاسب فورية، ثم حدّد المكوّنات الثقيلة التي لا يحتاجها كل المستخدمين. واجمع التحميل الكسول مع حدود أخطاء وحالات تحميل سليمة لتحصل على تجربة مستخدم سلسة. وتذكّر: قِس دائمًا أثر تحسيناتك—فأحيانًا يكون أبسط حلّ هو أفضل حلّ.

وتُشكّل مجموعة `React.lazy()` و`Suspense` واستنتاج الأنواع في TypeScript أساسًا قويًّا لبناء تطبيقات سريعة وآمنة نمطيًا تتوسّع مع احتياجات مستخدميك. فتبقى حزمتك الأوّلية نحيلة، وتبقى أنواعك سليمة، ويحصل مستخدموك على تجربة أفضل. فما الذي لا يُعجبك في ذلك؟
