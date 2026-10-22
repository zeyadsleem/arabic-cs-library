---
title: "مكوّنات الخادم في React (React Server Components)"
---

تغيّر مكوّنات الخادم في React (React Server Components، وتُختصر RSC) جذريًا نظرتنا إلى تطبيقات React، إذ تنقل الحساب إلى الخادم وتبثّ الأجزاء التفاعلية إلى العميل. فبدلًا من إرسال حزم JavaScript ضخمة وجعل كل مكوّن على جهة العميل افتراضيًا، تتيح لك RSC تصيير المكوّنات على الخادم، فتبقي جلب البيانات الثقيل ومكتبات الطرف الثالث ومنطق العمل بعيدًا عن جهاز مستخدمك، ولا تُرطّب إلا الأجزاء التي تحتاج إلى تفاعل.

إذا كنت تصارع أحجام الحزم، أو بطء التحميل الأولي، أو تعقيد إدارة حالة الخادم، فإن RSC تقدّم لك طريقًا واعدًا. سنستكشف ما هي مكوّنات الخادم، وكيف تختلف عن الأساليب التقليدية، والأهم من ذلك: متى وكيف تستخدمها بفعالية في تطبيقاتك على React 19.

## ما مكوّنات الخادم في React؟

تعمل مكوّنات الخادم في React على الخادم حصريًا ولا تُرطَّب على العميل أبدًا. وتستطيع الوصول مباشرةً إلى قاعدة بياناتك، أو نظام الملفات، أو أي واجهات API خاصة بالخادم، من دون المخاوف الأمنية أو تضخّم الحزمة الذي يأتي مع شيفرة جهة العميل. وعندما يُصيّر مكوّن الخادم، يُسلسل React خرجه ويبثّه إلى العميل بصيغة خاصة يمكن دمجها بسلاسة مع مكوّنات العميل لديك.

فكّر في مكوّنات الخادم كهدف تصيير جديد، شبيه بتصيير React إلى نص باستخدام `renderToString()`، لكنك بدلًا من HTML ساكن تحصل على شجرة غنية وتفاعلية يمكن أن تجمع بين محتوى مصيّر على الخادم ومكوّنات على جهة العميل.

وإليك ما يميّزها عن التصيير التقليدي على الخادم (SSR):

- **ترطيب انتقائي**: لا تُرطَّب على العميل إلا مكوّنات العميل
- **البثّ**: تُبثّ مكوّنات الخادم فور اكتمالها، ما يحسّن الأداء الملموس
- **وصول مباشر إلى الخادم**: لا حاجة إلى طبقة API للبيانات الخاصة بالخادم
- **إلغاء الحزمة**: الاعتمادات الخاصة بالخادم لا تصل إلى العميل أبدًا

## مكوّنات الخادم مقابل مكوّنات العميل عمليًا

لنبدأ بمثال عملي. تخيّل أنك تبني صفحة منتج تحتاج إلى جلب بيانات من قاعدة بياناتك وعرض سلة تسوّق تفاعلية.

### الأسلوب التقليدي (كل شيء على جهة العميل)

```typescript
// ❌ Everything runs on the client
export default function ProductPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <ProductDetails product={product} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

مشكلات هذا الأسلوب:

- حالات التحميل ومعالجة الأخطاء تُثقل مكوّنك
- شلال الشبكة: يُحمَّل HTML، ثم تُحمَّل JavaScript، ثم يحدث نداء API
- بنى بيانات مكررة بين الخادم والعميل
- نقطة نهاية API تُحتاج فقط للجسر بين بيانات الخادم والعميل

### أسلوب مكوّنات الخادم

```typescript
// ✅ Server Component - runs only on the server
import { getProduct } from '@/lib/db';

export default async function ProductPage({ productId }: { productId: string }) {
  // Direct database access - no API layer needed
  const product = await getProduct(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
      {/* Only this component needs client-side interactivity */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// Server Component - no interactivity needed
function ProductDetails({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
}

// Client Component - needs onClick handler
('use client');
import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(productId);
    setIsAdding(false);
  };

  return (
    <button onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

مع مكوّنات الخادم:

- لا حاجة إلى حالات تحميل، فالبيانات متاحة فورًا
- استعلامات قاعدة بيانات مباشرة بلا نقاط نهاية API
- حزمة عميل أصغر، فلا يُرسَل إلى العميل إلا `AddToCartButton`
- تحسين محركات البحث وأداء الرسم الأولي

## توجيه «use client»

توجيه `'use client'` هو اختيارك الصريح للتصيير على جهة العميل. فافتراضيًا تكون المكوّنات مكوّنات خادم في الأطر التي تدعم RSC مثل موجّه التطبيقات في Next.js (Next.js App Router).

وإليك كيف تفكّر في الحدّ الفاصل:

```typescript
// Server Component (default)
import { getUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Server Component */}
      <UserProfile user={user} />
      {/* Client Component boundary starts here */}
      <InteractiveChart data={user.analytics} />
    </div>
  );
}

// Still a Server Component
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <p>{user.bio}</p>
    </div>
  );
}

// Client Component - needs interactivity
('use client');
import { useState } from 'react';

export function InteractiveChart({ data }: { data: AnalyticsData }) {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div>
      <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>
      <Chart data={data} timeRange={timeRange} />
    </div>
  );
}
```

> **نصيحة**
>
> بمجرد إضافة `'use client'` إلى مكوّن، يصبح كل أبنائه مكوّنات عميل أيضًا. فصمّم حدود مكوّناتك بعناية لتقليل ما يحتاج إلى العمل على العميل.

## أنماط شائعة وأفضل الممارسات

### النمط 1: غلاف مكوّن خادم مع جزر عميل

أبقِ مكوّنات الخادم في المستوى الأعلى، وأضف مكوّنات العميل فقط حيث تدعو الحاجة:

```typescript
// Server Component - fetches data
export default async function PostPage({ slug }: { slug: string }) {
  const post = await getPost(slug);
  const comments = await getComments(post.id);

  return (
    <article>
      {/* Server-rendered content */}
      <PostContent post={post} />

      {/* Client islands for interactivity */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
      <ShareDialog url={post.url} title={post.title} />
      <CommentSection initialComments={comments} postId={post.id} />
    </article>
  );
}
```

### النمط 2: البثّ باستخدام `Suspense`

تعمل مكوّنات الخادم بانسجام تام مع Suspense في React لبثّ المحتوى فور توفّره:

```typescript
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Fast content renders immediately */}
      <QuickStats />

      {/* Slow content streams in when ready */}
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsChart />
      </Suspense>

      <Suspense fallback={<div>Loading recent activity...</div>}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

// This might be slow due to complex queries
async function AnalyticsChart() {
  const data = await getAnalyticsData(); // Slow database query
  return <Chart data={data} />;
}
```

### النمط 3: التحسين التدريجي

تتفوّق مكوّنات الخادم في التحسين التدريجي، أي بناء تجارب تعمل بلا JavaScript ثم تتحسّن به:

```typescript
// Server Component renders the initial state
export default async function ProductList({ category }: { category: string }) {
  const products = await getProducts(category);

  return (
    <div>
      {/* Works without JavaScript */}
      <ProductGrid products={products} />

      {/* Enhanced with JavaScript */}
      <FilterControls category={category} />
      <LoadMoreButton />
    </div>
  );
}

// Client Component adds filtering without page reloads
('use client');
export function FilterControls({ category }: { category: string }) {
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Update URL without page reload
    router.push(`/products/${category}?${new URLSearchParams(newFilters)}`);
  };

  return <div>{/* Filter controls */}</div>;
}
```

## فوائد الأداء والمقايضات

### الجانب الجيّد

**حزم JavaScript أصغر**: لا يُرسَل إلى العميل إلا المكوّنات التفاعلية. في مثال صفحة المنتج لدينا، بدلًا من إرسال React وكامل شيفرة تطبيقك ومنطق جلب البيانات، لا ترسل إلا مكوّن `AddToCartButton`.

**تحميل أولي أسرع للصفحة**: تُصيّر مكوّنات الخادم فورًا على الخادم، فلا حاجة إلى طلبات شبكة للبيانات الأولية.

**مؤشرات Core Web Vitals أفضل**: JavaScript أقل يعني زمنًا أقصر حتى التفاعل (TTI) ونتائج أفضل في إزاحة التخطيط التراكمية (CLS).

**وصول مباشر إلى الخادم**: لا حاجة إلى إنشاء نقاط نهاية API لمجرد جلب البيانات للتصيير الأولي.

### المقايضات

**تعقيد الإطار**: تتطلب RSC إطارًا مثل Next.js أو Remix مع أدوات بناء مناسبة. فلا تستطيع إسقاط مكوّنات الخادم في أي تطبيق React كما تشاء.

**تغيّر في النموذج الذهني**: عليك التفكير في الحدود بين الخادم والعميل وفهم قيود التسلسل.

**تحديات في التنقيح**: قد تمتد آثار المكدّس بين الخادم والعميل، ما يجعل التنقيح أكثر تعقيدًا.

**دعم محدود من المنظومة**: ليست كل مكتبات React تعمل مع مكوّنات الخادم بعد.

## استراتيجية الانتقال في العالم الحقيقي

إذا كنت تفكّر في تبنّي RSC لتطبيق قائم، فإليك مقاربة عملية:

### المرحلة 1: تحديد المرشّحين لمكوّنات الخادم

ابحث عن المكوّنات التي:

- تجلب البيانات عند التثبيت باستخدام `useEffect`
- لا تحتاج تفاعل المستخدم (نقرات، حقول نماذج، وما شابه)
- تصيّر المحتوى نفسه لجميع المستخدمين (أو يمكن تخصيصها على الخادم)
- تستورد مكتبات ثقيلة يمكن أن تبقى على الخادم

```typescript
// ✅ Great Server Component candidate
function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(slug).then(setPost);
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### المرحلة 2: استخراج جزر العميل

حدّد الأجزاء التفاعلية وافصلها:

```typescript
// Server Component
export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Client island */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}

// Client Component - only ships interactive code
('use client');
function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  // Interactive logic here...
}
```

### المرحلة 3: توسيع مكوّنات الخادم تدريجيًا

بعد أن تألف هذه الأنماط، انقل مزيدًا من المكوّنات إلى الخادم تدريجيًا:

- مكوّنات المحتوى الساكن (الترويسات، والتذييلات، والتنقّل)
- المكوّنات كثيفة البيانات (لوحات المعلومات، والتقارير، وقوائم المنتجات)
- الصفحات الحسّاسة لتحسين محركات البحث (صفحات الهبوط، ومنشورات المدوّنات، وصفحات المنتجات)

## مزالق شائعة وكيف تتجنّبها

### المزلق 1: حدود تسلسل الخصائص

لا تستطيع مكوّنات الخادم تمرير إلا بيانات قابلة للتسلسل إلى مكوّنات العميل:

```typescript
// ❌ This won't work
function ServerComponent() {
  const handleClick = () => console.log('clicked');
  return <ClientComponent onClick={handleClick} />; // Functions aren't serializable
}

// ✅ Instead, handle events in Client Components
function ClientComponent({ data }: { data: SerializableData }) {
  const handleClick = () => console.log('clicked');
  return <button onClick={handleClick}>Click me</button>;
}
```

### المزلق 2: الإفراط في مكوّنات العميل

لا تضع `'use client'` على كل شيء احتياطًا:

```typescript
// ❌ Unnecessary client boundary
'use client';
export default function Page() {
  return (
    <div>
      <StaticHeader /> {/* Could be Server Component */}
      <UserDashboard /> {/* Could be Server Component */}
      <InteractiveWidget /> {/* Actually needs client */}
    </div>
  );
}

// ✅ Only client components need the directive
export default function Page() {
  // Server Component
  return (
    <div>
      <StaticHeader /> {/* Server Component */}
      <UserDashboard /> {/* Server Component */}
      <InteractiveWidget /> {/* Client Component */}
    </div>
  );
}
```

### المزلق 3: خلط الاستيرادات

احترس من استيراد شيفرة خاصة بالخادم داخل مكوّنات العميل:

```typescript
// ❌ This will cause build errors
'use client';
import { db } from '@/lib/database'; // Server-only import

export function ClientComponent() {
  // This won't work - db access is server-only
}

// ✅ Pass data from Server Component
export default async function ServerWrapper() {
  const data = await db.getUser(); // Server-only
  return <ClientComponent data={data} />;
}

('use client');
function ClientComponent({ data }: { data: User }) {
  // Use the pre-fetched data
}
```

## متى تستخدم مكوّنات الخادم

تتألّق مكوّنات الخادم حين:

- **الواجهات كثيفة البيانات**: لوحات المعلومات، ولوحات الإدارة، وأدوات التقارير
- **الصفحات كثيفة المحتوى**: المدوّنات، والتوثيق، والصفحات التسويقية
- **صفحات منتجات التجارة الإلكترونية**: حيث تكون سرعة التحميل الأولي حرجة
- **تطبيقات الويب التقدّمية**: حيث تريد تحميلًا أوليًا سريعًا مع تفاعلية معزّزة

وهي أقل ملاءمةً لـ:

- **التطبيقات شديدة التفاعلية**: الألعاب الزمنية الحقيقية، وتطبيقات الرسم، ومحرّرات النصوص الغنية
- **التطبيقات كثيفة التوجيه على جهة العميل**: حيث تحتاج تنقّلًا فوريًا
- **التطبيقات المليئة بالمحتوى الديناميكي المخصّص**: الذي لا يمكن حسابه على الخادم
