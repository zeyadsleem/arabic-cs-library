---
title: "تحسين التصيير على الخادم (SSR)"
lang: ar
source: "https://stevekinney.com/courses/react-performance/optimizing-server-side-rendering"
---

يستطيع التصيير على الخادم (SSR) أن يحسّن الأداء الملموس لتطبيقك تحسينًا هائلًا عبر إيصال محتوى ذي معنى قبل تحميل JavaScript — لكن SSR ضعيف التحسين قد يضرّ أكثر مما ينفع. فبين أزمنة التصيير الطويلة على الخادم، وجلب البيانات على شكل شلال، والترطيب المكلف، توجد طرق كثيرة لإيذاء نفسك. لنستكشف تقنيات عملية لبناء SSR سريع حقًا: استجابات متدفقة، واستراتيجيات تخزين مؤقت ذكية، وأنماط محسّنة لجلب البيانات، وترطيب لا يحجب الخيط الرئيسي.

## تحدّي أداء SSR

يضيف SSR خطوة حاسمة إلى خط التصيير لديك: إذ يحتاج خادمك إلى توليد HTML *قبل* إرسال أي شيء إلى العميل. وهذا يُدخل اختناقات أداء جديدة لا وجود لها في التطبيقات التي تعمل على العميل وحده:

- **تأخيرات زمن الوصول إلى البايت الأول (TTFB)** بينما يجلب خادمك البيانات ويصيّر
- **جلب البيانات على شكل شلال** الذي يحجب توليد HTML
- **الترطيب الثقيل** الذي يجمّد الصفحة بمجرد تحميل JavaScript
- تعقيد **إبطال الذاكرة المؤقتة** بين الخادم والعميل

والخبر السار؟ أن React 19 والأطر الحديثة تمنحنا أدوات قوية لحلّ هذه المشكلات بصورة منهجية.

## نظرة عامة على SSR المتدفق

يتيح SSR المتدفق إرسال HTML أثناء توليده بدل انتظار اكتمال الصفحة. وهذا يقلّل زمن الوصول إلى البايت الأول (TTFB) تقليلًا هائلًا ويحسّن الأداء الملموس.

أهم مزايا التدفق:

- **TTFB أسرع** - أرسل HTML الأولي فورًا
- **تحميل تدريجي** - بثّ المحتوى فور توفّر البيانات
- **تجربة مستخدم أفضل** - يرى المستخدمون المحتوى بينما تُحمَّل الأقسام الأبطأ
- **Core Web Vitals أفضل** - نتائج LCP وFID أحسن

لأنماط تنفيذ التدفق المفصّلة، راجع [تحسين SSR المتدفق](https://stevekinney.com/courses/react-performance/streaming-ssr-optimization).

```typescript
// Quick streaming example
const stream = await renderToReadableStream(<App />, {
  bootstrapScripts: ['/client.js'],
    onError(error) {
      console.error('SSR Error:', error);
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

### حدود `Suspense` الاستراتيجية

ضع حدود `Suspense` حول المكوّنات التي قد تؤخّر التصيير الأولي:

```typescript
function ProductPage({ productId }: { productId: string }) {
  return (
    <div>
      {/* ✅ Static content streams immediately */}
      <Header />
      <nav>
        <SearchBar />
      </nav>

      {/* ✅ Product details stream when data arrives */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={productId} />
      </Suspense>

      {/* ✅ Reviews stream independently */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={productId} />
      </Suspense>

      <Footer />
    </div>
  );
}

async function ProductDetails({ productId }: { productId: string }) {
  // This data fetch doesn't block the header/nav from streaming
  const product = await getProduct(productId);

  return (
    <section>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
    </section>
  );
}
```

> **نصيحة**
>
> ضع حدود Suspense عند مستوى التفصيل الذي كنت ستُظهر عنده حالات التحميل بصورة طبيعية. فكثرة الحدود تخلق تعقيدًا، وقلّتها تفقدك مزايا التدفق.

## أنماط جلب البيانات الذكية

أكبر قاتل لأداء SSR هو جلب البيانات المتسلسل. فلا ينبغي لمكوّناتك أن تنشئ شلالات بيانات — اجلب ما تحتاجه على التوازي، وخزّن مؤقتًا بلا تردّد.

### التحميل المسبق للبيانات الحرجة

ابدأ جلب البيانات مبكرًا في معالج الطلب، قبل أن يبدأ React التصيير حتى:

```typescript
export async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get('productId');

  // ✅ Start critical data fetching immediately
  const dataPromises = {
    product: productId ? getProduct(productId) : null,
    user: getUserFromSession(request),
    categories: getCategories(), // Usually static/cached
  };

  // Start rendering while data fetches continue
  const stream = await renderToReadableStream(
    <App
      productPromise={dataPromises.product}
      userPromise={dataPromises.user}
      categoriesPromise={dataPromises.categories}
    />,
    { bootstrapScripts: ['/client.js'] },
  );

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

### استخدم خُطّاف `use()` في React لفكّ الوعود

يتيح خُطّاف `use()` في React 19 للمكوّنات استهلاك الوعود (promises) مباشرة، فيُغني عن إدارة حالة معقّدة:

```typescript
function ProductDetails({ productPromise }: { productPromise: Promise<Product> }) {
  // ✅ Suspends until promise resolves
  const product = use(productPromise);

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} loading="lazy" />
      <p>{product.description}</p>
    </div>
  );
}

function ProductPage({ productPromise }: { productPromise: Promise<Product> }) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails productPromise={productPromise} />
    </Suspense>
  );
}
```

### جلب البيانات على التوازي مع حدود الأخطاء

اجلب البيانات المستقلة على التوازي وتعامل مع الإخفاقات بلباقة:

```typescript
async function getPageData(productId: string) {
  // ✅ Fetch everything in parallel
  const [productResult, reviewsResult, recommendationsResult] = await Promise.allSettled([
    getProduct(productId),
    getProductReviews(productId),
    getRecommendations(productId),
  ]);

  return {
    product: productResult.status === 'fulfilled' ? productResult.value : null,
    reviews: reviewsResult.status === 'fulfilled' ? reviewsResult.value : [],
    recommendations:
      recommendationsResult.status === 'fulfilled' ? recommendationsResult.value : [],
    errors: [productResult, reviewsResult, recommendationsResult]
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason),
  };
}

function ProductPage({ data }: { data: Awaited<ReturnType<typeof getPageData>> }) {
  if (!data.product) {
    throw new Error('Product not found');
  }

  return (
    <div>
      <ProductDetails product={data.product} />

      {data.reviews.length > 0 && <ProductReviews reviews={data.reviews} />}

      {data.recommendations.length > 0 && <Recommendations items={data.recommendations} />}
    </div>
  );
}
```

## استراتيجيات تخزين مؤقت تنجح فعلًا

يعمل التخزين المؤقت الفعّال لـ SSR على مستويات متعددة: استجابات HTTP، والمكوّنات المصيّرة، وعمليات جلب البيانات. والمفتاح هو إبطال كل مستوى بالطريقة المناسبة.

### تخزين الاستجابات مؤقتًا على مستوى HTTP

خزّن استجابات HTML الكاملة مؤقتًا للصفحات التي لا تتغيّر كثيرًا:

```typescript
const cache = new Map<string, { html: string; timestamp: number }>();

export async function renderWithCache(url: string, ttl = 300000) {
  // 5 minutes
  const cacheKey = url;
  const cached = cache.get(cacheKey);

  // ✅ Serve from cache if still fresh
  if (cached && Date.now() - cached.timestamp < ttl) {
    return new Response(cached.html, {
      headers: {
        'Content-Type': 'text/html',
        'X-Cache': 'HIT',
      },
    });
  }

  // Render fresh HTML
  const stream = await renderToReadableStream(<App url={url} />);
  const html = await streamToString(stream);

  // Cache the complete HTML
  cache.set(cacheKey, { html, timestamp: Date.now() });

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Cache': 'MISS',
    },
  });
}

async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }

  return html;
}
```

### التخزين المؤقت على مستوى المكوّن

خزّن تصييرات المكوّنات المكلفة مؤقتًا بمعزل عن الصفحة الكاملة:

```typescript
const componentCache = new Map<string, React.ReactElement>();

function CachedExpensiveComponent({ data, ttl = 60000 }: { data: ComplexData; ttl?: number }) {
  const cacheKey = `expensive-${data.id}-${data.version}`;

  // Check for cached component
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey)!;
  }

  // Render expensive component
  const rendered = (
    <div>
      {/* Expensive calculations/rendering here */}
      <ComplexChart data={data.chartData} />
      <DataVisualization metrics={data.metrics} />
    </div>
  );

  // Cache with TTL cleanup
  componentCache.set(cacheKey, rendered);
  setTimeout(() => componentCache.delete(cacheKey), ttl);

  return rendered;
}
```

### جلب البيانات مع إزالة التكرار

امنع استدعاءات API المكرّرة عندما تحتاج مكوّنات متعددة إلى البيانات نفسها:

```typescript
const dataCache = new Map<string, Promise<any>>();

export function cachedFetch<T>(url: string, options: RequestInit = {}, ttl = 300000): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options)}`;

  // Return existing promise if already fetching
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey)!;
  }

  // Create new fetch promise
  const promise = fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .finally(() => {
      // Remove from cache after TTL
      setTimeout(() => dataCache.delete(cacheKey), ttl);
    });

  dataCache.set(cacheKey, promise);
  return promise;
}

// Usage in components
async function ProductDetails({ productId }: { productId: string }) {
  // ✅ Multiple components can call this safely - only one actual fetch occurs
  const product = await cachedFetch<Product>(`/api/products/${productId}`);

  return <div>{product.name}</div>;
}
```

## تحسين أداء الترطيب

عند الترطيب غالبًا ما تتعثّر تطبيقات SSR — إذ يصبح HTML المصيّر على الخادم تفاعليًا، لكن هذه العملية قد تحجب الخيط الرئيسي مئات الملّيثانية.

### الترطيب الانتقائي مع `Suspense`

لا تُرطّب كل شيء دفعة واحدة. استخدم حدود Suspense لترطيب المكوّنات تدريجيًا:

```typescript
function App() {
  return (
    <div>
      {/* ✅ Critical interactive elements hydrate first */}
      <Header />
      <SearchForm />

      {/* ✅ Less critical components hydrate when ready */}
      <Suspense fallback={null}>
        <CommentSection />
      </Suspense>

      <Suspense fallback={null}>
        <RecommendedProducts />
      </Suspense>

      {/* ✅ Heavy components can hydrate last */}
      <Suspense fallback={null}>
        <InteractiveMap />
      </Suspense>
    </div>
  );
}
```

### تصغير حجم حزمة JavaScript

JavaScript أقل يعني ترطيبًا أسرع. قسّم الشيفرة بلا تردّد وحمّل المكوّنات غير الحرجة عند الحاجة:

```typescript
import { lazy } from 'react';

// ✅ Load heavy components only when needed
const InteractiveChart = lazy(() => import('./InteractiveChart'));
const VideoPlayer = lazy(() => import('./VideoPlayer'));
const CommentEditor = lazy(() => import('./CommentEditor'));

function ProductPage() {
  const [showChart, setShowChart] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div>
      <ProductInfo />

      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <InteractiveChart />
        </Suspense>
      )}

      {showComments && (
        <Suspense fallback={<CommentsSkeleton />}>
          <CommentEditor />
        </Suspense>
      )}

      <button onClick={() => setShowChart(true)}>Show Analytics</button>
      <button onClick={() => setShowComments(true)}>Add Comment</button>
    </div>
  );
}
```

### تجنّب عدم تطابق الترطيب

يجبر عدم التطابق بين الخادم والعميل React على إعادة تصيير كل شيء من الصفر. ومن الأسباب الشائعة الطوابع الزمنية، والمعرّفات العشوائية، وواجهات API الخاصة بالمتصفح:

```typescript
// ❌ Will cause hydration mismatch
function CurrentTime() {
  return <div>Current time: {new Date().toLocaleString()}</div>;
}

// ✅ Consistent between server and client
function CurrentTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);

  // Show static content during hydration
  if (time === null) {
    return <div>Loading current time...</div>;
  }

  return <div>Current time: {time}</div>;
}

// ❌ Random IDs cause mismatches
function generateId() {
  return Math.random().toString(36);
}

// ✅ Stable IDs using useId hook
function StableComponent() {
  const id = useId(); // Same on server and client

  return (
    <div>
      <label htmlFor={id}>Username:</label>
      <input id={id} type="text" />
    </div>
  );
}
```

## استراتيجية التنفيذ الواقعية

إليك مقاربة عملية لتنفيذ SSR محسّن في تطبيقك:

### قِس أولًا، ثم حسّن

أنشئ خطوط أساس للأداء قبل إجراء أي تغييرات:

```typescript
// Add performance timing to your SSR handler
export async function handleSSRRequest(request: Request) {
  const start = performance.now();

  try {
    const response = await renderPageWithStreaming(request);

    const renderTime = performance.now() - start;
    console.log(`SSR render time: ${renderTime.toFixed(2)}ms`);

    // Add timing header for monitoring
    response.headers.set('X-Render-Time', renderTime.toString());

    return response;
  } catch (error) {
    const errorTime = performance.now() - start;
    console.error(`SSR error after ${errorTime.toFixed(2)}ms:`, error);
    throw error;
  }
}
```

### مقاربة التحسين التدريجي

ابدأ بأساس SSR متين، ثم أضف التحسينات طبقة فوق طبقة:

```typescript
export class SSROptimizer {
  private cacheEnabled = false;
  private streamingEnabled = false;

  constructor(
    private options: {
      enableCache?: boolean;
      enableStreaming?: boolean;
      cacheMaxAge?: number;
    } = {},
  ) {
    this.cacheEnabled = options.enableCache ?? false;
    this.streamingEnabled = options.enableStreaming ?? false;
  }

  async render(url: string): Promise<Response> {
    // Start with basic SSR
    let renderFunction = this.basicSSR;

    // Add streaming if enabled
    if (this.streamingEnabled) {
      renderFunction = this.streamingSSR;
    }

    // Add caching if enabled
    if (this.cacheEnabled) {
      renderFunction = this.cachedSSR;
    }

    return renderFunction(url);
  }

  private async basicSSR(url: string): Promise<Response> {
    const html = await renderToString(<App url={url} />);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  private async streamingSSR(url: string): Promise<Response> {
    const stream = await renderToReadableStream(<App url={url} />);
    return new Response(stream, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  private async cachedSSR(url: string): Promise<Response> {
    // Implementation with caching layer
    // ...
  }
}
```

### راقب وكرّر

أعدّ المراقبة لتتبّع المقاييس المهمة:

```typescript
interface SSRMetrics {
  renderTime: number;
  dataFetchTime: number;
  cacheHitRate: number;
  hydrationTime: number;
  timeToFirstByte: number;
}

export function trackSSRMetrics(): SSRMetrics {
  const metrics = {
    renderTime: 0,
    dataFetchTime: 0,
    cacheHitRate: 0,
    hydrationTime: 0,
    timeToFirstByte: 0,
  };

  // Measure server-side rendering time
  const renderStart = performance.now();
  // ... render logic
  metrics.renderTime = performance.now() - renderStart;

  // Track cache performance
  metrics.cacheHitRate = (cacheHits / totalRequests) * 100;

  // Client-side hydration timing
  if (typeof window !== 'undefined') {
    const hydrationStart = performance.now();
    // ... hydration logic
    metrics.hydrationTime = performance.now() - hydrationStart;
  }

  return metrics;
}
```

## المزالق الشائعة وكيفية تجنّبها

### جلب بيانات مفرط في الحماس

لا تجلب بيانات لن تستخدمها. استخدم جلبًا مشروطًا للبيانات بناءً على أذونات المستخدم، أو أعلام الميزات (feature flags)، أو معاملات URL:

```typescript
// ❌ Always fetches all data
async function getPageData(userId: string) {
  const [user, posts, comments, analytics] = await Promise.all([
    getUser(userId),
    getPosts(userId),
    getComments(userId),
    getAnalytics(userId), // Only needed for admin users
  ]);

  return { user, posts, comments, analytics };
}

// ✅ Conditional data fetching
async function getPageData(userId: string, currentUser?: User) {
  const promises: Promise<any>[] = [getUser(userId), getPosts(userId)];

  // Only fetch comments if user has permission
  if (currentUser?.canViewComments) {
    promises.push(getComments(userId));
  }

  // Only fetch analytics for admin users
  if (currentUser?.isAdmin) {
    promises.push(getAnalytics(userId));
  }

  const results = await Promise.all(promises);

  return {
    user: results[0],
    posts: results[1],
    comments: currentUser?.canViewComments ? results[2] : null,
    analytics: currentUser?.isAdmin ? results[results.length - 1] : null,
  };
}
```

### تعقيد إبطال الذاكرة المؤقتة

أبقِ إبطال الذاكرة المؤقتة بسيطًا بأنماط متسقة:

```typescript
export class CacheManager {
  private cache = new Map<string, any>();
  private tags = new Map<string, Set<string>>(); // tag -> cache keys

  set(key: string, value: any, tags: string[] = []) {
    this.cache.set(key, value);

    // Associate cache entry with tags
    for (const tag of tags) {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, new Set());
      }
      this.tags.get(tag)!.add(key);
    }
  }

  // Invalidate all cache entries with specific tags
  invalidateByTags(tags: string[]) {
    for (const tag of tags) {
      const keys = this.tags.get(tag);
      if (keys) {
        for (const key of keys) {
          this.cache.delete(key);
        }
        this.tags.delete(tag);
      }
    }
  }

  get(key: string) {
    return this.cache.get(key);
  }
}

// Usage
const cacheManager = new CacheManager();

// Cache with relevant tags
cacheManager.set('user-123', userData, ['user', 'user-123']);
cacheManager.set('posts-user-123', userPosts, ['posts', 'user-123']);

// Invalidate all user-related cache when user updates
cacheManager.invalidateByTags(['user-123']);
```
