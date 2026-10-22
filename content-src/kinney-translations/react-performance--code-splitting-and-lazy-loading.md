---
title: "تقسيم الشيفرة والتحميل الكسول"
---

حزمتك من JavaScript تخرج عن السيطرة. فما بدأ تطبيق React متواضعًا صار كتلة واحدة بحجم 2MB يستغرق زمنًا طويلًا للتحميل، خصوصًا على الاتصالات الأبطأ. والمستخدمون يغادرون قبل أن يروا حتى مؤشر التحميل الجميل الذي بنيته (وهو على الأرجح مفرط الهندسة على أي حال). وهنا يأتي تقسيم الشيفرة والتحميل الكسول — تقنيتا تحسين أداء تتيحان لك تقديم ما يحتاجه المستخدمون فعلًا فقط، حين يحتاجونه.

يقسّم تقسيم الشيفرة حزمتك إلى قطع أصغر يمكن تحميلها عند الطلب، بينما يؤجّل التحميل الكسول الموارد غير الحرجة حتى الحاجة إليها. ومعًا، يخفضان حجم حزمتك الأولي بدرجة هائلة ويحسّنان مؤشرات الويب الأساسية — لا سيما **أكبر رسم للمحتوى** (LCP) و**تأخّر أول إدخال** (FID). والأهم أنهما يُبقيان مستخدميك سعداء ومتفاعلين.

## مشكلة حجم الحزمة

قبل أن نغوص في الحلول، لنفهم ما الذي نحلّه. فتطبيقات React الحديثة تعاني غالبًا من «تضخّم الحزمة» — إذ تُرسل ملفات JavaScript ضخمة تتضمن كل شيء من منطق المصادقة إلى لوحة الإدارة النادر استخدامها إلى مكتبة lodash كاملة (لأن أحدهم استورد `debounce` مرة واحدة).

والتدرّج النموذجي يبدو هكذا:

1. **النسخة الأولى (MVP)**: حزمة بحجم 200KB تُحمَّل فورًا
2. **إضافة الميزات**: حزمة بحجم 500KB ما زالت مقبولة
3. **تكاملات الأطراف الثالثة**: حزمة بحجم 1.2MB تبدأ بالبطء
4. **«مكتبة واحدة أخيرة فقط»**: حزمة بحجم 2.5MB والمستخدمون يتذمّرون

وحين تلاحظ المشكلة، تكون تُرسل JavaScript أكثر بكثير مما تحتاجه أي صفحة واحدة. ويعالج تقسيم الشيفرة ذلك بتحويل كتلتك الواحدة إلى قطع سهل الاستيعاب.

## تقسيم الشيفرة حسب المسارات

أسهل مكسب هو تقسيم تطبيقك حسب المسارات. فمعظم المستخدمين لا يزورون كل صفحة في الجلسة نفسها، فلماذا تُجبرهم على تنزيل لوحة الإدارة كاملة وهم يريدون تحديث ملفهم الشخصي فقط؟

### التقسيم الأساسي للمسارات مع React Router

وإليك كيفية تنفيذ التقسيم حسب المسارات مع React Router v6:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// ✅ Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

> **نصيحة**
>
> غلّف دائمًا المكوّنات المحمّلة كسولًا بـ `Suspense`. فبدونه، سيرمي React خطأً عند محاولة تصيير مكوّن ما زال قيد التحميل.

### تقسيم متقدّم للمسارات

في التطبيقات الأكبر، قد ترغب في إنشاء وحدات مسار لا تشمل المكوّن فحسب، بل أيضًا الأدوات المساعدة والخُطّافات والأنماط المرتبطة به:

```typescript
// pages/Dashboard/index.ts
export { default } from './Dashboard';

// pages/Dashboard/Dashboard.tsx
import { DashboardChart } from './components/DashboardChart';
import { useDashboardData } from './hooks/useDashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const { data, loading } = useDashboardData();

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <DashboardChart data={data} />
    </div>
  );
}
```

يضمن هذا الأسلوب ألا تُحمَّل الشيفرة الخاصة بلوحة المعلومات (بما فيها CSS والأدوات المساعدة) إلا عند زيارة المستخدمين مسار لوحة المعلومات.

## تقسيم الشيفرة حسب المكوّنات

تحتاج أحيانًا إلى تحكم أدق تفصيلًا. فربما لديك مكوّن ثقيل لا يظهر إلا شرطيًا — مثل محرّر نص منسّق يظهر عند نقر المستخدمين على «Edit» أو تصوّر بيانات يُصيّر بناءً على تفضيلات المستخدم.

### التحميل الكسول لمكوّنات النوافذ المنبثقة

النوافذ المنبثقة (modals) مرشّح مثالي للتحميل الكسول لأنها مخفية افتراضيًا:

```typescript
import { useState, Suspense, lazy } from 'react';

// ✅ Only load the heavy modal when needed
const EditPostModal = lazy(() => import('./components/EditPostModal'));
const DeleteConfirmModal = lazy(() => import('./components/DeleteConfirmModal'));

function PostActions({ postId }: { postId: string }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditModal(true)}>Edit Post</button>
      <button onClick={() => setShowDeleteModal(true)}>Delete Post</button>

      <Suspense fallback={<div>Loading...</div>}>
        {showEditModal && <EditPostModal postId={postId} onClose={() => setShowEditModal(false)} />}
        {showDeleteModal && (
          <DeleteConfirmModal postId={postId} onClose={() => setShowDeleteModal(false)} />
        )}
      </Suspense>
    </div>
  );
}
```

### التحميل الكسول بناءً على أذونات المستخدم

يمكنك أيضًا تحميل المكوّنات شرطيًا بناءً على أدوار المستخدمين أو أذوناتهم:

```typescript
import { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';

// ✅ Admin-only components are split into separate bundles
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const UserDashboard = lazy(() => import('./components/UserDashboard'));

function Dashboard() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </Suspense>
  );
}
```

## تقسيم شيفرة المكتبات الخارجية (vendor)

قد تكون مكتبات الأطراف الثالثة ضخمة. فـ Chart.js أو moment.js أو حتى React نفسه قد يسيطر على حجم حزمتك. وتستطيع أدوات التجميع الحديثة تقسيم شيفرة المورّدين تلقائيًا، لكن يمكنك تحسين الأمر أكثر باستيرادات مدروسة.

### تقسيم المكتبات الثقيلة

بدلًا من استيراد المكتبات كاملة مسبقًا، حمّلها عند الحاجة:

```typescript
import { useState, useEffect } from 'react';

type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
  }>;
};

function DataVisualization({ data }: { data: ChartData }) {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    // ✅ Only load Chart.js when this component mounts
    import('chart.js/auto').then((ChartModule) => {
      setChart(() => ChartModule.Chart);
    });
  }, []);

  if (!Chart) {
    return <div>Loading chart...</div>;
  }

  return <canvas ref={(canvas) => new Chart(canvas, { data })} />;
}
```

### تحليل الحزمة وتحسينها

استخدم webpack-bundle-analyzer أو أدوات مشابهة لتحديد فرص التحسين:

```bash
# Install the analyzer
npm install --save-dev webpack-bundle-analyzer

# For analyzing bundle composition
npm install --save-dev source-map-explorer

# Analyze your bundle
npm run build
npx source-map-explorer 'dist/assets/*.js'
```

يُظهر هذا التمثيل البصري بالضبط أي المكتبات تستهلك حجم حزمتك، ما يساعدك على تقرير ما يجب تقسيمه أو استبداله.

## أنماط متقدّمة وأفضل الممارسات

### التحميل المسبق للمسارات الحرجة

يمكنك تحميل المسارات التي يُرجَّح أن يزورها المستخدمون تاليًا مسبقًا:

```typescript
import { useEffect } from 'react';

function HomePage() {
  useEffect(() => {
    // ✅ Preload the dashboard route when user is likely to navigate there
    const timer = setTimeout(() => {
      import('../pages/Dashboard');
    }, 2000); // Preload after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, []);

  return <div>Welcome to our app!</div>;
}
```

### حدود الأخطاء للمكوّنات الكسولة

غلّف دائمًا المكوّنات الكسولة بحدود أخطاء لتتولّى إخفاقات التحميل بلطف:

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

class LazyErrorBoundary extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong loading this component.</div>;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <LazyErrorBoundary fallback={<div>Failed to load page</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyRoute />
      </Suspense>
    </LazyErrorBoundary>
  );
}
```

### مكوّنات بديلة ذكية

بدلًا من رسائل «Loading…» العامة، أنشئ بدائل ذات معنى تناسب واجهتك:

```typescript
import { Suspense } from 'react';

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 rounded bg-gray-200"></div>
        <div className="h-32 rounded bg-gray-200"></div>
        <div className="h-32 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

<Suspense fallback={<DashboardSkeleton />}>
  <Dashboard />
</Suspense>;
```

## قياس الأثر

### المقاييس قبل وبعد

تابع هذه المقاييس الرئيسية لقياس نجاح تقسيم شيفرتك:

- **حجم الحزمة الأولي**: مقدار JavaScript المحمَّل في أول زيارة
- **زمن أول رسم للمحتوى (FCP)**: متى يرى المستخدمون شيئًا مفيدًا
- **زمن التفاعل (TTI)**: متى تصبح الصفحة تفاعلية بالكامل
- **سرعة الانتقال بين المسارات**: مدى سرعة تحميل المسارات الكسولة

### استخدام أداة Profiler في React DevTools

تستطيع أداة Profiler في React DevTools أن تُريك بالضبط المدة التي يستغرقها كل مكوّن للتحميل والتصيير:

```typescript
import { Profiler } from 'react';

function onRenderCallback(id: string, phase: string, actualDuration: number) {
  console.log(`${id} (${phase}) took ${actualDuration}ms to render`);
}

<Profiler id="LazyDashboard" onRender={onRenderCallback}>
  <Suspense fallback={<DashboardSkeleton />}>
    <Dashboard />
  </Suspense>
</Profiler>;
```

## مزالق شائعة وكيفية تجنّبها

### الإفراط في التقسيم

لا تقسّم كل شيء. فالمكوّنات الصغيرة جدًا (< 10KB) قد لا تستحق التقسيم بسبب الكلفة الزائدة لطلبات الشبكة الإضافية.

```typescript
// ❌ Probably not worth splitting
const SmallIcon = lazy(() => import('./SmallIcon')); // 2KB component

// ✅ Definitely worth splitting
const RichTextEditor = lazy(() => import('./RichTextEditor')); // 200KB component
```

### نسيان معالجة حالات التحميل

وفّر دائمًا حالات تحميل ذات معنى. فلا ينبغي للمستخدمين أن يروا شاشات فارغة أو تخطيطات مكسورة أثناء تحميل المكوّنات.

```typescript
// ❌ Bad: No loading state
<Suspense>
	<HeavyComponent />
</Suspense>

// ✅ Good: Meaningful loading state
<Suspense fallback={<ComponentSkeleton />}>
	<HeavyComponent />
</Suspense>
```

### التقسيم في وقت متأخر جدًا

طبّق تقسيم الشيفرة مبكرًا في التطوير، لا كفكرة لاحقة حين يصبح الأداء مشكلة. فبناء المعمارية للتقسيم من البداية أسهل بكثير.
