---
title: "واجهة cache()"
lang: ar
source: "https://stevekinney.com/courses/react-performance/react-cache-api"
---

تأخذ دالة `cache()` في React الدوال النقية فتحوّلها إلى دوال محفوظة النتائج ومعزولة التكرار ومستقرة في شجرة React كلها. اعتبرها نسخة معزّزة من `useMemo()` تعمل على مستوى الدالة لا على مستوى المكوّن، والأهم أنها تشارك النتائج بين المكوّنات حين تستدعي الدالة نفسها بالوسائط نفسها.

ومع أن `cache()` مصمّمة أساسًا لمكوّنات الخادم في React (React Server Components) والتصيير على الخادم، فإن فهم طريقة عملها يمنحك أدوات قوية لتحسين العمليات المكلفة في تطبيقك كله. فتستطيع أن تلغي نداءات API المكررة، واستعلامات قاعدة البيانات، والحسابات الثقيلة التي كانت ستُنفَّذ مرات عدة على البيانات نفسها.

## ما المشكلات التي تحلّها cache()؟

قبل الغوص في طريقة عمل `cache()`، لنفهم المشكلات التي تعالجها. تخيّل هذا السيناريو: لديك مكوّن لمنشور مدوّنة يحتاج معلومات المستخدم، وعدة مكوّنات ابنة تحتاج هي أيضًا بيانات المستخدم نفسها.

```typescript
// ❌ Without cache() - multiple redundant calls
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId); // First API call

  return (
    <div>
      <UserAvatar userId={userId} /> {/* Second API call inside */}
      <UserPosts userId={userId} />  {/* Third API call inside */}
      <h1>{user.name}</h1>
    </div>
  );
}

async function UserAvatar({ userId }: { userId: string }) {
  const user = await fetchUser(userId); // Duplicate call!
  return <img src={user.avatar} alt={user.name} />;
}
```

من دون `cache()`، يستدعي كل مكوّن `fetchUser()` بنفسه، حتى وإن كانت جميعها تطلب المستخدم نفسه. وهذا يخلق طلبات شبكة غير ضرورية، وضربات متكررة على قاعدة البيانات، وعقبات في الأداء.

## الاستخدام الأساسي {#basic-usage}

استخدام دالة `cache()` بسيط: تغلّف أي دالة نقية، ويتولّى React إزالة التكرار تلقائيًا:

```typescript
import { cache } from 'react';

// ✅ Cached version - only one call per unique userId per request
const fetchUser = cache(async (userId: string) => {
  console.log(`Fetching user ${userId}`); // This logs only once per userId
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId); // First call

  return (
    <div>
      <UserAvatar userId={userId} /> {/* Uses cached result */}
      <UserPosts userId={userId} />  {/* Uses cached result */}
      <h1>{user.name}</h1>
    </div>
  );
}

async function UserAvatar({ userId }: { userId: string }) {
  const user = await fetchUser(userId); // Returns cached result instantly
  return <img src={user.avatar} alt={user.name} />;
}
```

مع `cache()`، يتتبّع React نداءات الدوال وفق وسائطها ويعيد النتيجة نفسها للمدخلات المطابقة. ولا يظهر سجل «Fetching user» إلا مرة واحدة لكل `userId` فريد، مهما كان عدد المكوّنات التي تستدعي الدالة.

## نطاق الذاكرة المؤقتة ودورة حياتها

فهم متى وأين تعمل `cache()` أمر جوهري لاستخدامها بفعالية. فللذاكرة المؤقتة حدود محدّدة:

### النطاق على الخادم

في مكوّنات الخادم في React والتصيير على الخادم (SSR)، تدوم الذاكرة المؤقتة طوال طلب واحد فقط:

```typescript
const getPostWithComments = cache(async (postId: string) => {
  // This expensive join query runs only once per postId per request
  return db.query(`
    SELECT posts.*, comments.*
    FROM posts
    LEFT JOIN comments ON posts.id = comments.post_id
    WHERE posts.id = ?
  `, [postId]);
});

// Multiple components can use this without duplicate database hits
async function BlogPost({ postId }: { postId: string }) {
  const data = await getPostWithComments(postId);

  return (
    <article>
      <PostContent postId={postId} /> {/* Uses cache */}
      <CommentSection postId={postId} /> {/* Uses cache */}
    </article>
  );
}
```

### السلوك على جهة العميل

على جهة العميل، يعتمد سلوك `cache()` على إصدار React وإعداداتك. وفي React 19 وما بعده، تحافظ الدوال المخزّنة على ذاكرتها المؤقتة ما دام مرجع الدالة مستقرًا:

```typescript
const expensiveCalculation = cache((data: number[]) => {
  console.log('Computing expensive result');
  return data.reduce((acc, val) => acc + Math.sqrt(val), 0);
});

function DataVisualization({ dataset }: { dataset: number[] }) {
  // This computation runs only once until dataset changes
  const result = expensiveCalculation(dataset);

  return (
    <div>
      <Chart data={result} />
      <Summary data={result} /> {/* Uses cached result */}
    </div>
  );
}
```

> **ملاحظة**
>
> لا يزال التخزين المؤقت على جهة العميل بواسطة `cache()` في تطوّر مستمر. وفي تطبيقات الإنتاج، اعتبره أداة تحسين على الخادم بالأساس.

## أنماط متقدّمة

### التخزين المؤقت مع وسائط معقّدة

تستخدم دالة `cache()` مقارنة سطحية للوسائط، لذا تهمّ مراجع الكائنات:

```typescript
const queryProducts = cache(async (filters: ProductFilters) => {
  return db.products.findMany({
    where: filters,
    include: { category: true, reviews: true },
  });
});

// ❌ Creates new object each render - cache miss
function ProductList() {
  const products = queryProducts({ category: 'electronics', inStock: true });
  // ...
}

// ✅ Stable object reference - cache hit
const ELECTRONICS_FILTER = { category: 'electronics', inStock: true };

function ProductList() {
  const products = queryProducts(ELECTRONICS_FILTER);
  // ...
}
```

أما المرشّحات المتغيّرة، ففكّر في استراتيجية تخزين مؤقت منفصلة أو في تطبيع كائن المرشّحات:

```typescript
const normalizeFilters = (filters: ProductFilters) => {
  // Sort keys to ensure consistent object structure
  const sortedEntries = Object.entries(filters).sort(([a], [b]) => a.localeCompare(b));
  return Object.fromEntries(sortedEntries);
};

const queryProducts = cache(async (filters: ProductFilters) => {
  const normalizedFilters = normalizeFilters(filters);
  return db.products.findMany({ where: normalizedFilters });
});
```

### الدمج مع ميزات React الأخرى

تعمل الذاكرة المؤقتة بانسجام تام مع Suspense وحدود الأخطاء (error boundaries):

```typescript
const fetchUserProfile = cache(async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${userId}`);
  }
  return response.json();
});

function UserDashboard({ userId }: { userId: string }) {
  return (
    <ErrorBoundary fallback={<div>Failed to load user</div>}>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId={userId} />
        <UserSettings userId={userId} /> {/* Shares cached data */}
      </Suspense>
    </ErrorBoundary>
  );
}

async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUserProfile(userId);
  return <div>{user.name}</div>;
}

async function UserSettings({ userId }: { userId: string }) {
  const user = await fetchUserProfile(userId); // Same cache entry
  return <div>{user.email}</div>;
}
```

### أنماط إبطال الذاكرة المؤقتة

بما أن `cache()` لا توفّر إبطالًا مدمجًا، فستحتاج إلى استراتيجيات للتعامل مع البيانات القديمة:

```typescript
// Strategy 1: Time-based cache busting
const fetchWithTimestamp = cache(async (key: string, timestamp: number) => {
  return fetch(`/api/data/${key}`).then((r) => r.json());
});

function DataComponent({ key }: { key: string }) {
  // Refresh every 5 minutes
  const timestamp = Math.floor(Date.now() / (5 * 60 * 1000));
  const data = fetchWithTimestamp(key, timestamp);
  // ...
}

// Strategy 2: Version-based invalidation
let cacheVersion = 0;

const invalidateCache = () => {
  cacheVersion++;
};

const fetchWithVersion = cache(async (key: string, version: number) => {
  return fetch(`/api/data/${key}`).then((r) => r.json());
});

function DataComponent({ key }: { key: string }) {
  const data = fetchWithVersion(key, cacheVersion);
  // ...
}
```

## حالات استخدام من العالم الحقيقي™

### تحسين استعلامات قاعدة البيانات

مثالية لإلغاء مشكلات الاستعلامات N+1 في مكوّنات الخادم:

```typescript
const getUserById = cache(async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true, settings: true }
  });
});

const getPostsByUserId = cache(async (userId: string) => {
  return prisma.post.findMany({
    where: { authorId: userId },
    include: { comments: true }
  });
});

// Multiple components can use these without duplicate database hits
async function UserPage({ userId }: { userId: string }) {
  const user = await getUserById(userId);
  const posts = await getPostsByUserId(userId);

  return (
    <div>
      <UserHeader user={user} />
      <UserStats userId={userId} /> {/* Reuses getUserById cache */}
      <PostList posts={posts} />
    </div>
  );
}
```

### إزالة تكرار استجابات API

ألغِ نداءات API الخارجية المكررة في شجرة مكوّناتك:

```typescript
const fetchWeatherData = cache(async (city: string) => {
  const response = await fetch(
    `https://api.weather.com/current?city=${encodeURIComponent(city)}`
  );
  return response.json();
});

function WeatherDashboard({ city }: { city: string }) {
  return (
    <div>
      <CurrentWeather city={city} />     {/* First API call */}
      <WeatherForecast city={city} />    {/* Uses cache */}
      <WeatherAlerts city={city} />      {/* Uses cache */}
    </div>
  );
}
```

### الحسابات المكلفة

خزّن الحسابات الثقيلة التي تعتمد على مدخلات مستقرة:

```typescript
const calculateComplexMetrics = cache((rawData: DataPoint[]) => {
  console.log('Running expensive calculation...');

  return {
    mean: rawData.reduce((sum, point) => sum + point.value, 0) / rawData.length,
    standardDeviation: calculateStdDev(rawData),
    percentiles: calculatePercentiles(rawData),
    trendAnalysis: performTrendAnalysis(rawData)
  };
});

function AnalyticsDashboard({ data }: { data: DataPoint[] }) {
  const metrics = calculateComplexMetrics(data);

  return (
    <div>
      <MetricsSummary metrics={metrics} />
      <TrendChart metrics={metrics} />      {/* Reuses calculation */}
      <PercentileChart metrics={metrics} />  {/* Reuses calculation */}
    </div>
  );
}
```

## اعتبارات الأداء

مع أن `cache()` قوية، استخدمها بتأنٍّ:

### استهلاك الذاكرة

تبقى النتائج المخزّنة في الذاكرة إلى أن ينتهي نطاق التخزين المؤقت. وفي طلبات الخادم يعني ذلك إلى أن يكتمل الطلب. فاحترس من بنى البيانات الضخمة:

```typescript
// ❌ Potentially memory-heavy
const loadEntireDataset = cache(async () => {
  return db.hugeTable.findMany(); // Could be gigabytes
});

// ✅ More targeted caching
const loadUserSubset = cache(async (userId: string) => {
  return db.users.findUnique({
    where: { id: userId },
    include: { recentActivity: { take: 10 } },
  });
});
```

### نقاء الدوال

لا تخزّن إلا الدوال النقية، أي الدوال التي تعيد المخرج نفسه للمدخل نفسه ولا آثار جانبية لها:

```typescript
// ❌ Not pure - has side effects
const logAndFetch = cache(async (id: string) => {
  console.log(`Fetching user ${id}`); // Side effect
  await incrementCounter(); // Side effect
  return fetchUser(id);
});

// ✅ Pure function - perfect for caching
const fetchUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});
```

### تعقيد الوسائط

الوسائط البسيطة هي الأفضل. أما الكائنات المعقّدة فتتطلّب عناية ودقّة:

```typescript
// ✅ Simple, stable arguments
const fetchUser = cache(async (id: string) => {
  /* ... */
});
const calculateSum = cache((numbers: number[]) => {
  /* ... */
});

// ⚠️ Complex arguments - ensure stability
const complexQuery = cache(async (filters: ComplexFilters) => {
  // Make sure filters object is stable across calls
});
```

## متى لا تستخدم cache()

ليست الذاكرة المؤقتة الخيار الصحيح دائمًا:

1. **بيانات تتغيّر باستمرار**: إذا تغيّرت المدخلات في كل نداء، فلا فائدة من التخزين المؤقت
2. **الدوال ذات الآثار الجانبية**: الدوال التي تعدّل حالة خارجية يجب ألا تُخزَّن
3. **البيئات المحدودة الذاكرة**: قد تسبب النتائج المخزّنة الكبيرة مشكلات في الذاكرة
4. **React 18 وما دونه على جهة العميل**: دعم محدود وسلوك غير متوقّع

## الخطوات التالية

الآن بعد أن فهمت `cache()`، تستطيع أن تلغي العمل المكرر في تطبيقات React لديك. وفكّر في كيف تتكامل مع ميزات React 19 الأخرى مثل مكوّنات الخادم وخُطّاف `use()` لبناء تطبيقات كفؤة وعالية الأداء.
