---
title: "Suspense لجلب البيانات"
---

يغيّر React Suspense جذريًا طريقة تفكيرنا في حالات التحميل وجلب البيانات. فبدلًا من توصيل مؤشرات التحميل وحدود الأخطاء يدويًا في أنحاء شجرة مكوّناتك، يتيح لك Suspense تعريف حدود تحميل تصريحية تتولّى العمليات غير المتزامنة بسلاسة. وتُركّب هذه الحدود بذكاء لإبقاء أجزاء من واجهتك تفاعلية بينما تُحمَّل أجزاء أخرى — فتحوّل نمط «الكل ينتظر الكل» التقليدي إلى ما يشبه التحسين التدريجي.

القوة الحقيقية تأتي من تعاون حدود Suspense مع أنماط جلب البيانات الحديثة لإنشاء واجهات متدفقة تكشف المحتوى بمجرد جهوزه، بدل حجب الصفحة كلها انتظارًا لأبطأ اعتماد بيانات.

> انظر أيضًا: [خُطّاف use](https://stevekinney.com/courses/react-performance/the-use-hook) للأنماط الخاصة بـ `use()`، وتركيب Suspense الأساسي، ومعالجة الأخطاء. وتركّز هذه الصفحة على أنماط جلب البيانات المتمركزة حول Suspense، وميكانيكا التخزين المؤقت (رمي الوعود)، والمزالق الشائعة.

## تهيئة حدود `Suspense`

يفترض هذا الدليل إلمامًا بتركيب الحدود الأساسي. ولمقدّمة وأمثلة على التحسين التدريجي، انظر [خُطّاف use](https://stevekinney.com/courses/react-performance/the-use-hook).

## أنماط جلب البيانات مع `Suspense`

لكي يعمل مع Suspense، يحتاج جلب بياناتك إلى اتّباع نمط «التصيير أثناء الجلب». وإليك كيفية تنفيذ خُطّاف جلب بيانات متوافق مع Suspense:

```typescript
// Simple cache to store promises and results
const cache = new Map<string, Promise<any> | any>();

function fetchUser(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`).then((response) => {
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  });
}

function useUser(userId: string): User {
  const cacheKey = `user-${userId}`;

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);

    // If it's a promise, the request is in flight - throw it for Suspense
    if (cached instanceof Promise) {
      throw cached;
    }

    // If it's data, return it
    return cached;
  }

  // No cache entry - start the request
  const promise = fetchUser(userId).then((user) => {
    // Replace promise with actual data in cache
    cache.set(cacheKey, user);
    return user;
  });

  // Cache the promise and throw it
  cache.set(cacheKey, promise);
  throw promise;
}
```

يضمن هذا النمط ما يلي:

1. أول تصيير يرمي وعدًا ← يعرض Suspense البديل
2. عند تحلّل الوعد ← يُعيد المكوّن التصيير مع البيانات
3. التصييرات اللاحقة تستخدم البيانات المخزّنة مؤقتًا فورًا

> **نصيحة**
>
> في الإنتاج، استخدم مكتبات مثل [SWR](https://swr.vercel.app/) أو [TanStack Query](https://tanstack.com/query) أو [Relay](https://relay.dev/) التي تدعم Suspense مدمجًا، بدل بناء ذاكرتك المؤقتة بنفسك.

## حدود الأخطاء مع `Suspense`

ارجع إلى [خُطّاف use](https://stevekinney.com/courses/react-performance/the-use-hook) لأنماط حدود الأخطاء التأسيسية مع Suspense و`use()`. وتركّز هذه الصفحة على التخزين المؤقت والتدفّق والمزالق لا على معالجة الأخطاء عمومًا.

## نمط من الواقع العملي: تدفّق البيانات

انظر أمثلة التركيب التدريجي في [خُطّاف use](https://stevekinney.com/courses/react-performance/the-use-hook). ونركّز فيما يلي على بدء الطلبات مبكرًا لتجنّب الشلالات.

### بدء الطلبات مبكرًا

مفتاح تجربة المستخدم الجيدة مع Suspense هو بدء طلبات البيانات قبل تصيير المكوّنات التي تحتاجها:

```typescript
// ❌ Don't start fetch inside component render
function UserProfile({ userId }: { userId: string }) {
  const user = useUser(userId); // Starts fetch on first render
  return <div>{user.name}</div>;
}

// ✅ Start fetch before rendering
function App() {
  const [userId, setUserId] = useState('123');

  // Warm the cache before rendering UserProfile
  useEffect(() => {
    warmCache(userId);
  }, [userId]);

  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}

function warmCache(userId: string) {
  // This puts the promise in cache before component renders
  if (!cache.has(`user-${userId}`)) {
    cache.set(`user-${userId}`, fetchUser(userId));
  }
}
```

## متقدّم: الميزات المتزامنة

تعمل الميزات المتزامنة في React 18 بشكل جيد خصوصًا مع Suspense. ويتيح لك `startTransition` تعليم تحديثات بأنها غير عاجلة، فتمنعها من حجب واجهة المستخدم:

```typescript
import { startTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery); // Update immediately for input responsiveness

    startTransition(() => {
      setDeferredQuery(newQuery); // This won't block the UI
    });
  };

  return (
    <div>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResultsList query={deferredQuery} />
      </Suspense>
    </div>
  );
}
```

يبقى حقل الإدخال مستجيبًا بينما تُحمَّل نتائج البحث في الخلفية.

## مزالق شائعة وحلولها

### المشكلة: إبطال الذاكرة المؤقتة

بلا إدارة سليمة للذاكرة المؤقتة، قد تعرض بيانات قديمة:

```typescript
// ✅ Add cache invalidation
function invalidateUser(userId: string) {
  cache.delete(`user-${userId}`);
}

function updateUserMutation(userId: string, updates: Partial<User>) {
  return fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }).then(() => {
    invalidateUser(userId); // Clear cache to force refetch
  });
}
```

### المشكلة: وميض حالات التحميل

إذا حُمّلت البيانات سريعًا جدًا، فقد تومض مؤشرات التحميل بشكل مزعج:

```typescript
import { useDeferredValue } from 'react';

function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '200px' }}>
          {/* Use a delayed skeleton to avoid flashing */}
          <DelayedSkeleton delay={100} />
        </div>
      }
    >
      <ResultsList query={deferredQuery} />
    </Suspense>
  );
}
```

### المشكلة: التعليق عند التنقّل

احترس من تغليف تطبيقك كله بـ Suspense — إذ قد يُعلّق الواجهة كلها أثناء التنقّل:

```typescript
// ❌ This suspends everything during route changes
function App() {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

// ✅ Keep navigation responsive with page-level boundaries
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<ProfileSkeleton />}>
              <ProfilePage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
```

## متى تستخدم `Suspense`

يتألق Suspense في هذه السيناريوهات:

- **واجهات على نمط لوحات المعلومات** بمصادر بيانات مستقلة متعددة
- **الصفحات الغنية بالمحتوى** حيث تريد تدفّق الأقسام تدريجيًا
- **واجهات البحث** حيث تريد إبقاء حقول الإدخال مستجيبة أثناء البحث
- **الأخبار الاجتماعية** حيث يمكن للمحتوى الجديد أن يظهر دون حجب المحتوى الموجود

وهو أقل فائدة في:

- النماذج البسيطة ذات العمليات غير المتزامنة المحدودة
- التطبيقات التي معظم محتواها ثابت
- الحالات التي تحتاج فيها إلى تحكم دقيق في التحميل لكل حقل على حدة
