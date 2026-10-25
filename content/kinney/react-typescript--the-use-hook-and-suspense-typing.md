---
title: "الخُطّاف use وحدود Suspense: تحديد الأنواع"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/the-use-hook-and-suspense-typing"
---

الخُطّاف `use()` في React هو تغييرٌ جذري في التعامل مع البيانات غير المتزامنة — فهو يتيح لك استهلاك الوعود (promises) والمصادر مباشرةً من دون مراسم `useEffect` المعتادة. ومع حدود Suspense، يمكنك بناء مكوّنات تتعامل مع حالات التحميل والأخطاء بأناقة. والجزء الصعب؟ أن تتأكّد من أن TypeScript يفهم ما يجري حين تبدأ مكوّناتك في رمي الوعود حولها (حرفيًا).

سنستكشف كيفية تحديد أنواع الخُطّاف `use()` على نحو صحيح، والتعامل مع حدود Suspense بثقة، وتجنّب الفخاخ التي تنشأ عن مزج البيانات غير المتزامنة مع TypeScript. وفي نهايتك، ستكتب مكوّنات تبدو سحرية في الاستخدام لكنها تبقى آمنة الأنواع تمامًا في العمق.

## أساسيات use()

الخُطّاف `use()` هو أحدث طريقة في React لفكّ تغليف الوعود وقيم السياق. وبخلاف الخُطّافات التقليدية، يمكن استدعاؤه بشكل شرطي بل وحتى داخل الحلقات — وهو ما يجعله مرنًا للغاية في سيناريوهات جلب البيانات الديناميكية.

```typescript
import { use } from 'react';

// ✅ Basic promise consumption
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>Hello, {user.name}!</h1>;
}
```

وتحدث السحر عندما يصطدم مكوّنك بوعدٍ لم يُحلّ بعد. سيعلّق React المكوّن (برمي الوعد)، ويلتقط أقرب حدّ Suspense له، ويعرض بديلًا (fallback) إلى أن يُحلّ الوعد. وبعد الحلّ، يعيد React تصيير المكوّن بالبيانات الفعلية.

وهنا تصبح TypeScript مثيرة للاهتمام. يحتاج الخُطّاف `use()` إلى فهم النوع الذي يُحلّ إليه وعدك، ويحتاج مكوّنك إلى تحديد دقيق للحالتين: المعلَّقة والمحلولة.

## تحديد أنواع البيانات المبنيّة على الوعود

لنبدأ بالسيناريو الأكثر شيوعًا — جلب البيانات من واجهة برمجية واستهلاكها عبر `use()`.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userPromise: Promise<User>;
}

function UserProfile({ userPromise }: UserProfileProps) {
  // TypeScript infers that `user` is of type `User`
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

الخُطّاف `use()` ذكيّ بما يكفي لاستنتاج النوع المحلول من وعدك. فإن مرّرت `Promise<User>` ستحصل على `User` في المقابل. وإن مرّرت `Promise<string[]>` ستحصل على `string[]`. ولا حاجة إلى أي تعليقات نوعية إضافية.

لكن ماذا يحدث إذا كان وعدك قد يُرفض؟ هنا يأتي دور حدود الأخطاء (error boundaries).

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const userPromise = fetchUser(123);

  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

> **ملاحظة**
>
> تلتقط حدود الأخطاء رفض الوعود الصادرة عن `use()`، بينما تلتقط حدود Suspense الوعود نفسها أثناء حالة الانتظار.

## إنشاء مصانع موارد مُنمَّطة

في السيناريوهات الأكثر تعقيدًا، ستحتاج غالبًا إلى إنشاء مصانع موارد تُعيد وعودًا مُحكمة الأنواع. وإليك نمطًا يعمل جيدًا مع TypeScript:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

// Generic resource factory with proper typing
function createResource<T>(fetcher: () => Promise<T>): Promise<T> {
  return fetcher();
}

// Usage with automatic type inference
const userResource = createResource(() =>
  fetch('/api/users/123').then((res) => res.json() as Promise<User>),
);

function UserProfile() {
  // TypeScript knows this is User
  const user = use(userResource);
  return <h1>{user.name}</h1>;
}
```

ولإدارة موارد أكثر تطوّرًا، قد ترغب في إنشاء مورد يتعامل مع التخزين المؤقت ومنع التكرار:

```typescript
interface ResourceState<T> {
  promise: Promise<T>;
  status: 'pending' | 'resolved' | 'rejected';
  data?: T;
  error?: Error;
}

function createCachedResource<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // Implementation would include caching logic
  // For now, simplified version:
  return fetcher();
}

// Type-safe resource creation
const postsResource = createCachedResource('posts', (): Promise<Post[]> =>
  fetch('/api/posts').then((res) => res.json()),
);

function PostsList() {
  const posts = use(postsResource); // TypeScript knows this is Post[]

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## الاستدعاءات الشرطية لـ use() وأمان الأنواع

من المزايا الفريدة لـ `use()` أنّه يمكن استدعاؤه بشكل شرطي. وهذا يولّد سيناريوهات أنواع مثيرة للاهتمام:

```typescript
interface ConditionalDataProps {
  shouldLoad: boolean;
  dataPromise?: Promise<User>;
}

function ConditionalData({ shouldLoad, dataPromise }: ConditionalDataProps) {
  // TypeScript needs to understand this conditional usage
  const user = shouldLoad && dataPromise ? use(dataPromise) : null;

  if (!user) {
    return <div>No data to display</div>;
  }

  // TypeScript knows `user` is definitely of type `User` here
  return <h1>{user.name}</h1>;
}
```

ولمنطق شرطي أكثر تعقيدًا، قد تحتاج إلى مساعدة TypeScript على فهم مجرى التنفيذ:

```typescript
interface MultiResourceProps {
  userPromise?: Promise<User>;
  profilePromise?: Promise<UserProfile>;
  mode: 'user' | 'profile' | 'none';
}

function MultiResource({ userPromise, profilePromise, mode }: MultiResourceProps) {
  if (mode === 'user' && userPromise) {
    const user = use(userPromise);
    return <UserCard user={user} />;
  }

  if (mode === 'profile' && profilePromise) {
    const profile = use(profilePromise);
    return <ProfileCard profile={profile} />;
  }

  return <div>Nothing to show</div>;
}
```

## تحديد أنواع حدود `Suspense`

حدود Suspense نفسها لا تحتاج إلى تحديد أنواع خاصّ، لكنّ المكوّنات التي تغلّفها تحتاج إلى ذلك. وإليك كيفية إنشاء بنية مكوّنات غير متزامنة مُحكمة الأنواع:

```typescript
interface AsyncPageProps {
  userId: string;
}

// The async component that uses `use()`
function AsyncUserPage({ userId }: AsyncPageProps) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);

  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>User ID: {user.id}</p>
    </div>
  );
}

// The wrapper that handles Suspense
function UserPage(props: AsyncPageProps) {
  return (
    <Suspense fallback={<UserPageSkeleton />}>
      <AsyncUserPage {...props} />
    </Suspense>
  );
}
```

وللمكوّنات التي تحتاج إلى التعامل مع عدّة موارد غير متزامنة، يمكنك تركيبها بأناقة:

```typescript
function ComplexAsyncPage({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const postsPromise = useMemo(() => fetchUserPosts(userId), [userId]);

  // Both promises are consumed independently
  const user = use(userPromise);
  const posts = use(postsPromise);

  return (
    <div>
      <UserHeader user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

## معالجة الأخطاء بأمان الأنواع

حين تُرفض الوعود، تحتاج إلى حدود أخطاء ملائمة. وإليك كيفية إنشاء معالجة أخطاء آمنة الأنواع:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

interface ApiError {
  message: string;
  status: number;
  code: string;
}

function ErrorFallback({ error }: { error: ApiError }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <p>Status: {error.status}</p>
    </div>
  );
}

function TypedErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}

// Usage
function App() {
  return (
    <TypedErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AsyncUserProfile userId="123" />
      </Suspense>
    </TypedErrorBoundary>
  );
}
```

## حالات الاستخدام من العالم الحقيقي™

إليك بعض الأنماط التي من المرجّح أن تصادفها في تطبيقات الإنتاج:

### نتائج بحث مُنمَّطة

```typescript
interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

function SearchResults<T>({ searchPromise }: { searchPromise: Promise<SearchResult<T>> }) {
  const results = use(searchPromise);

  return (
    <div>
      <p>{results.total} results found</p>
      {results.items.map((item, index) => (
        <SearchResultItem key={index} item={item} />
      ))}
      {results.hasMore && <LoadMoreButton />}
    </div>
  );
}

// Usage with type inference
const userSearchPromise = searchUsers('john'); // Returns Promise<SearchResult<User>>
<SearchResults searchPromise={userSearchPromise} />;
```

### التحميل المتوازي للبيانات

```typescript
interface DashboardData {
  user: User;
  notifications: Notification[];
  stats: UserStats;
}

function Dashboard({ userId }: { userId: string }) {
  // Create all promises upfront for parallel loading
  const [userPromise, notificationsPromise, statsPromise] = useMemo(
    () => [fetchUser(userId), fetchNotifications(userId), fetchUserStats(userId)],
    [userId],
  );

  // Consume them all with proper typing
  const user = use(userPromise);
  const notifications = use(notificationsPromise);
  const stats = use(statsPromise);

  return (
    <div>
      <UserHeader user={user} />
      <StatsWidget stats={stats} />
      <NotificationList notifications={notifications} />
    </div>
  );
}
```

## المآخذ الشائعة وكيف تتجنّبها

### لا تنشئ وعودًا أثناء التصيير

```typescript
// ❌ Bad: Creates new promise on every render
function BadExample({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // New promise every time!
  return <h1>{user.name}</h1>;
}

// ✅ Good: Memoize the promise
function GoodExample({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
```

### تعامل مع توقيت حلّ الوعد

```typescript
// ✅ Good: Handle the case where data might not be available
function SafeComponent({ dataPromise }: { dataPromise: Promise<Data> | null }) {
  if (!dataPromise) {
    return <div>No data requested</div>;
  }

  const data = use(dataPromise);
  return <DataDisplay data={data} />;
}
```

### حدّد أنواع مصانع الوعود على نحو صحيح

```typescript
// ❌ Bad: Loses type information
const createUserFetcher = (id: string) => fetch(`/api/users/${id}`).then((res) => res.json());

// ✅ Good: Explicit return type
const createUserFetcher = (id: string): Promise<User> =>
  fetch(`/api/users/${id}`).then((res) => res.json() as User);

// ✅ Even better: Runtime validation
const createUserFetcher = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data); // Assuming you're using Zod
};
```

> **تحذير**
>
> تحقّق دائمًا من استجابات الواجهة البرمجية وقت التشغيل. أنواع TypeScript لا وجود لها وقت التشغيل، لذا فالبيانات الخارجية تحتاج إلى تحقّق.

## الأنماط المتقدّمة

### تركيب موارد مُنمَّط

```typescript
interface CompositeResource<T, U> {
  primary: T;
  secondary: U;
}

function createCompositeResource<T, U>(
  primaryPromise: Promise<T>,
  secondaryPromise: Promise<U>,
): Promise<CompositeResource<T, U>> {
  return Promise.all([primaryPromise, secondaryPromise]).then(([primary, secondary]) => ({
    primary,
    secondary,
  }));
}

// Usage
function CompositeView({ userId }: { userId: string }) {
  const compositePromise = useMemo(
    () => createCompositeResource(fetchUser(userId), fetchUserPreferences(userId)),
    [userId],
  );

  const { primary: user, secondary: preferences } = use(compositePromise);

  return (
    <div>
      <UserProfile user={user} />
      <PreferencesPanel preferences={preferences} />
    </div>
  );
}
```

### مورد مع حالات تحميل

```typescript
interface ResourceWithMeta<T> {
  data: T;
  loading: boolean;
  error?: Error;
}

// This is more of a conceptual pattern since use() handles this automatically
function createResourceWithMeta<T>(promise: Promise<T>): Promise<ResourceWithMeta<T>> {
  return promise.then(
    (data) => ({ data, loading: false }),
    (error) => ({ data: null as any, loading: false, error }),
  );
}
```

## الخطوات التالية

يوفّر الخُطّاف `use()` مع Suspense أساسًا قويًا للتعامل مع البيانات غير المتزامنة في تطبيقات React. ومع التكامل السليم مع TypeScript، يمكنك بناء مكوّنات سريعة وآمنة الأنواع في آنٍ واحد.

أهم الخلاصات:

- خزّن الوعود مؤقتًا دائمًا لتجنّب إعادة الجلب غير الضرورية
- استخدم حدود أخطاء ملائمة إلى جانب حدود Suspense
- تحقّق من البيانات الخارجية وقت التشغيل لا في وقت التجميع وحده
- أنشئ مصانع موارد مُنمَّطة لأنماط غير متزامنة قابلة لإعادة الاستخدام
- تذكّر أنّ `use()` يمكن استدعاؤه بشكل شرطي — فاحتضن هذه المرونة

أثناء بناء تطبيقات أكثر تعقيدًا، فكّر في استكشاف مكتبات مثل [TanStack Query](https://tanstack.com/query/latest) أو [SWR](https://swr.vercel.app/) التي تقدّم ميزات إضافية مثل التخزين المؤقت والتحديثات في الخلفية ومعالجة أخطاء أكثر تطوّرًا — كلّها بدعم ممتاز من TypeScript.
