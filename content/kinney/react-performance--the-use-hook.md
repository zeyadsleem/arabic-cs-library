---
title: "خُطّاف use"
lang: ar
source: "https://stevekinney.com/courses/react-performance/the-use-hook"
---

يغيّر خُطّاف `use()` في React 19 جذريًا طريقة تعاملك مع البيانات غير المتزامنة والسياق في مكوّناتك. فبدلًا من إدارة حالات التحميل وحدود الأخطاء وحلّ الوعود بنفسك، يتيح لك `use()` أن «تفكّ» الوعود وقيم السياق مباشرة في متن مكوّنك — بينما يتولّى Suspense التنسيق. الأمر أشبه بامتلاك `await` لمكوّنات React، لكن بتركيب أفضل ومعالجة أخطاء أنظف.

يعمل خُطّاف `use()` مع نوعين من الموارد: **الوعود** (promises) للبيانات غير المتزامنة، و**السياق** للحالة المشتركة. فعند تمرير وعد إلى `use()`، يُعلّق React المكوّن حتى يتحلّل الوعد، ثم يصيّر بالقيمة المتحلّلة. وعند تمرير سياق، فهو فعليًا نسخة أكثر مرونة من `useContext` يمكن نداؤها شرطيًا.

لنستكشف كيف يبسّط `use()` جلب البيانات، ويحسّن الأداء، وينشئ معماريات مكوّنات أسهل صيانة.

## لماذا يهم use()

قبل `use()`، كان التعامل مع البيانات غير المتزامنة يعني التلاعب بحالات التحميل وحدود الأخطاء وحلّ الوعود عبر خُطّافات متعددة. وكنت ترى عادةً شيئًا كهذا:

```typescript
// ❌ The old way: lots of ceremony
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) throw error;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

مع `use()` وSuspense، يصبح هذا أبسط بكثير:

```typescript
// ✅ The new way: direct resource consumption
function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}
```

تُعالَج حالات التحميل ومعالجة الأخطاء الآن عبر حدود Suspense الأعلى في شجرة مكوّناتك، ما يفضي إلى فصل أفضل للمسؤوليات وشيفرة أكثر تصريحية.

## الاستخدام الأساسي للوعود

أكثر حالات استخدام `use()` شيوعًا هو استهلاك الوعود. وإليك كيف يعمل ذلك عمليًا:

```typescript
import { use, Suspense } from 'react';

// Your existing async functions work as-is
async function fetchUserData(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

function UserCard({ userId }: { userId: string }) {
  // use() unwraps the promise and gives you the resolved value
  const user = use(fetchUserData(userId));

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Wrap with Suspense to handle the loading state
function App() {
  return (
    <Suspense fallback={<div>Loading user…</div>}>
      <UserCard userId="123" />
    </Suspense>
  );
}
```

عندما يُصيّر `UserCard`، فإن `use(fetchUserData(userId))` سيقوم بما يلي:

1. يُعلّق المكوّن في أول تصيير ما دام الوعد معلّقًا
2. يعرض بديل Suspense حتى يتحلّل الوعد
3. يُعيد التصيير بالبيانات المتحلّلة بمجرد توفّرها
4. يرمي الخطأ إلى أقرب حد أخطاء إذا رُفض الوعد

> **ملاحظة**
>
> لا يمكن نداء `use()` إلا أثناء التصيير — لا في معالجات الأحداث ولا في التأثيرات ولا في سياقات أخرى خارج التصيير. والسبب أنه يحتاج إلى التكامل مع دورة تصيير React لتنسيق التعليق.

## العمل مع السياق

يعمل خُطّاف `use()` أيضًا مع سياق React، فيوفّر بديلًا أكثر مرونة من `useContext`:

```typescript
import { use, createContext } from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemedButton() {
  // This is equivalent to useContext(ThemeContext)
  const theme = use(ThemeContext);

  return <button className={`btn-${theme}`}>Themed Button</button>;
}
```

الفرق الجوهري أن `use()` يمكن نداؤه شرطيًا، بينما يجب نداء `useContext` دائمًا في المستوى الأعلى:

```typescript
function ConditionalTheme({ showThemed }: { showThemed: boolean }) {
  // ✅ This works with use()
  const theme = showThemed ? use(ThemeContext) : 'default';

  // ❌ This wouldn't work with useContext
  // const theme = showThemed ? useContext(ThemeContext) : 'default';

  return <div className={`theme-${theme}`}>Content</div>;
}
```

هذه المرونة مفيدة خصوصًا للمكوّنات التي قد لا تحتاج دائمًا إلى قيم السياق، أو عند بناء مكوّنات قابلة لإعادة الاستخدام تعمل مع مزوّدي سياق اختياريين.

## التخزين المؤقت والأداء

من الجوانب الحاسمة في `use()` فهم كيفية تعامل React مع تخزين الوعود مؤقتًا. لا يخزّن React الوعود تلقائيًا — فإذا مرّرت نسخة وعد جديدة في كل تصيير، دخلت في حلقة لا نهائية من التعليق وإعادة التصيير:

```typescript
// ❌ Creates a new promise on every render - infinite loop!
function BadExample({ userId }: { userId: string }) {
  const user = use(fetch(`/api/users/${userId}`).then((r) => r.json()));
  return <div>{user.name}</div>;
}
```

بدلًا من ذلك، عليك ضمان استقرار الوعد. وإليك عدة مقاربات:

### تخزين الوعود مؤقتًا (memoization)

```typescript
import { use, useMemo, Suspense } from 'react';

function UserProfile({ userId }: { userId: string }) {
  // Memoize the promise to prevent recreation on every render
  const userPromise = useMemo(() => fetchUser(userId), [userId]);

  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

### إدارة الوعود خارج المكوّن

```typescript
// Create promises outside of components or in a cache
const userPromiseCache = new Map<string, Promise<User>>();

function getCachedUserPromise(userId: string) {
  if (!userPromiseCache.has(userId)) {
    userPromiseCache.set(userId, fetchUser(userId));
  }
  return userPromiseCache.get(userId)!;
}

function UserProfile({ userId }: { userId: string }) {
  const user = use(getCachedUserPromise(userId));
  return <div>{user.name}</div>;
}
```

### الاستخدام مع مكتبات جلب البيانات

مكتبات مثل SWR وReact Query وRelay تتولّى تخزين الوعود مؤقتًا نيابةً عنك بالفعل:

```typescript
import { use } from 'react';
import useSWR from 'swr';

function UserProfile({ userId }: { userId: string }) {
  const { data } = useSWR(`/api/users/${userId}`, fetcher, {
    suspense: true, // Enable Suspense mode
  });

  // No need for use() here - SWR handles it
  return <div>{data.name}</div>;
}

// Or if you want to use use() directly with a cached promise:
function UserProfileWithUse({ userId }: { userId: string }) {
  const userPromise = useMemo(
    () => mutate(`/api/users/${userId}`), // Returns the cached promise
    [userId],
  );

  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

## معالجة الأخطاء

تتبع معالجة الأخطاء مع `use()` نمط حدود الأخطاء القياسي في React. فعند رفض وعد، يُرمى الخطأ أثناء التصيير ويلتقطه أقرب حد أخطاء:

```typescript
import { use, Suspense, ErrorBoundary } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // Throws if promise rejects
  return <div>{user.name}</div>;
}

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userId="123" />
      </Suspense>
    </ErrorBoundary>
  );
}
```

لمعالجة أخطاء أكثر تفصيلًا، يمكنك التقاط الأخطاء داخل دوال جلب البيانات:

```typescript
async function fetchUserSafely(userId: string): Promise<User | null> {
  try {
    return await fetchUser(userId);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null; // Return fallback instead of throwing
  }
}

function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUserSafely(userId));

  if (!user) {
    return <div>User not found</div>;
  }

  return <div>{user.name}</div>;
}
```

## أنماط من الواقع العملي

### تركيب موارد غير متزامنة متعددة

من نقاط قوة `use()` تركيب موارد غير متزامنة متعددة بنظافة:

```typescript
function UserDashboard({ userId }: { userId: string }) {
  // These can resolve in parallel or in sequence
  const user = use(fetchUser(userId));
  const posts = use(fetchUserPosts(userId));
  const stats = use(fetchUserStats(userId));

  return (
    <div>
      <UserHeader user={user} />
      <UserStats stats={stats} />
      <PostsList posts={posts} />
    </div>
  );
}

// Wrap in Suspense to handle loading states collectively
function App() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard userId="123" />
    </Suspense>
  );
}
```

### التحميل المتتالي مقابل التحميل المتوازي

انتبه إلى طريقة هيكلة نداءاتك غير المتزامنة. فنداءات `use()` المتتابعة تُنشئ شلالات تحميل:

```typescript
// ❌ Waterfall: second request waits for first
function UserWithPosts({ userId }: { userId: string }) {
  const user = use(fetchUser(userId));
  const posts = use(fetchUserPosts(user.id)); // Waits for user to resolve

  return <UserPostsList user={user} posts={posts} />;
}

// ✅ Parallel: both requests start immediately
function UserWithPosts({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const postsPromise = useMemo(() => fetchUserPosts(userId), [userId]);

  const user = use(userPromise);
  const posts = use(postsPromise);

  return <UserPostsList user={user} posts={posts} />;
}
```

### التحسين التدريجي

يعمل `use()` بامتياز في التحسين التدريجي حيث تريد عرض بيانات جزئية فورًا:

```typescript
function ArticlePage({ articleId }: { articleId: string }) {
  return (
    <div>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent articleId={articleId} />
      </Suspense>

      <Suspense fallback={<CommentsSkeleton />}>
        <ArticleComments articleId={articleId} />
      </Suspense>

      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedArticles articleId={articleId} />
      </Suspense>
    </div>
  );
}
```

يمكن لكل قسم أن يُحمَّل باستقلال، ما يوفّر تجربة مستخدم أفضل من انتظار تحميل كل شيء دفعة واحدة.

## استراتيجيات الترحيل

### من `useEffect` + `useState`

إذا كنت تُرحّل من أنماط `useEffect` + `useState` التقليدية:

```typescript
// Before: manual state management
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

// After: use() + Suspense
function UserProfile({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

### من مكتبات جلب البيانات

تدعم مكتبات جلب البيانات كثيرة بالفعل وضع Suspense، ما يجعل الترحيل مباشرًا:

```typescript
// With React Query
function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    suspense: true, // Enable Suspense integration
  });

  return <div>{user.name}</div>;
}

// Or using use() directly with React Query's promise
function UserProfile({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const userPromise = useMemo(
    () => queryClient.fetchQuery(['user', userId], () => fetchUser(userId)),
    [userId, queryClient],
  );

  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

## اعتبارات الأداء

### متى تستخدم use() مقابل الخُطّافات التقليدية

يبدع `use()` عندما تريد:

- **شيفرة غير متزامنة تصريحية**: بلا حالات تحميل يدوية
- **تركيبًا أفضل**: موارد غير متزامنة متعددة في مكوّن واحد
- **معالجة أخطاء مبسّطة**: دع حدود الأخطاء تتولّى الإخفاقات
- **التصيير على الخادم**: يعمل أفضل مع RSC وSSR

والتزم بالخُطّافات التقليدية عندما تحتاج إلى:

- **تحكم أمرّي**: حالات تحميل يدوية أو جلب شرطي
- **توافق مع الشيفرة القديمة**: العمل مع إصدارات React الأقدم
- **تجربة تحميل دقيقة التفصيل**: حالات تحميل مختلفة لأجزاء مختلفة من واجهتك

### حجم الحزمة واهتزاز الشجرة

`use()` جزء من حزمة React الأساسية، فلا وزن إضافي. لكن انتبه إلى كيفية هيكلة جلب بياناتك لتجنّب تضمين شيفرة غير ضرورية:

```typescript
// ✅ Good: conditional imports
function UserProfile({ userId, includeAnalytics }: Props) {
  const user = use(fetchUser(userId));

  const analytics = includeAnalytics
    ? use(import('./analytics').then((m) => m.fetchAnalytics(userId)))
    : null;

  return (
    <div>
      <UserCard user={user} />
      {analytics && <AnalyticsPanel data={analytics} />}
    </div>
  );
}
```

## نظرة إلى الأمام

يجسّد خُطّاف `use()` رؤية React لبرمجة غير متزامنة أبسط وأكثر تصريحية. ومع مكوّنات خادم React وواجهات التخزين المؤقت القادمة، فهو يمكّن أنماطًا مثل:

- **إزالة التكرار التلقائية**: الوعد نفسه المستخدم في مكوّنات متعددة يتحلّل مرة واحدة
- **SSR متدفق**: يمكن للمحتوى المصيَّر على الخادم أن يتدفّق تدريجيًا
- **تجربة تطوير أفضل**: كود متكرر أقل، ونية أوضح، وتنقيح أسهل

ومع تطوّر المنظومة، توقّع أن تتبنّى مكتبات وأطر أكثر `use()` لأنماط غير متزامنة أنظف. والمفتاح هو فهم متى وكيف تطبّقه بفعالية — وهو ما يعني غالبًا إعادة التفكير في تدفّق بياناتك من إدارة حالة أمرّية إلى استهلاك تصريحي للموارد.

## المتطلبات السابقة {#prerequisites}

- فهم React Suspense وحدود الأخطاء
- خبرة بالوعود وasync/await في JavaScript
- معرفة أساسية بسياق React
- إلمام بأنماط جلب البيانات

## أمثلة عملية

سيناريوهات من الواقع العملي يتألق فيها use():

- **تطبيقات لوحات المعلومات** - مصادر بيانات متعددة تُحمَّل بالتوازي
- **أنظمة إدارة المحتوى** - تحميل تدريجي للمحتوى
- **مواقع التجارة الإلكترونية** - تفاصيل المنتج مع العناصر المرتبطة
- **أخبار وسائل التواصل الاجتماعي** - تركيب المنشورات والتعليقات وبيانات المستخدم

ابدأ صغيرًا بترحيل بضعة مكوّنات غير متزامنة بسيطة إلى `use()`، وتآلف مع أنماط حدود Suspense، ثم طبّقها تدريجيًا على سيناريوهات جلب بيانات أكثر تعقيدًا. وسيشكرك مستقبلك (وزملاؤك) على الشيفرة الأنظف والأسهل صيانة.
