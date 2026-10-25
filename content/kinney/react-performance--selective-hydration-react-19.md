---
title: "الترطيب الانتقائي في تطبيقات React الحديثة"
lang: ar
source: "https://stevekinney.com/courses/react-performance/selective-hydration-react-19"
---

لا يهم مستخدميك أن يكون التذييل تفاعليًا وهم يحاولون النقر على «أضف إلى السلة». يتيح لك الترطيب الانتقائي (selective hydration) في React 18 والإصدارات الأحدث إعطاء الأولوية لما يُرطَّب أولًا، فتغدو تطبيقاتك المصيّرة على الخادم سريعة الاستجابة حيث يهمّ ذلك أكثر — حتى بينما لا تزال بقية صفحتك تستيقظ في الخلفية.

تخيّل الترطيب كملء حوض سباحة: فبدلًا من انتظار امتلاء الحوض بأكمله قبل أن يسبح أحد، يتيح لك الترطيب الانتقائي أن يقفز الناس إلى الطرف الضحل بينما لا يزال الطرف العميق يمتلئ. تصبح مكوّناتك الحرجة تفاعلية فورًا، بينما تُرطَّب المكوّنات الأقل أهمية على وتيرتها.

## ما الترطيب الانتقائي؟

الترطيب التقليدي كل شيء أو لا شيء. يجب أن يُرطَّب تطبيق React بأكمله قبل أن يصبح أي جزء منه تفاعليًا — حتى لو كان المستخدمون مهتمين بنقر زر واحد فقط في أعلى الشاشة. يخلق هذا تجارب محبطة ينقر فيها المستخدمون أشياء تبدو تفاعلية لكنها لا تستجيب لأن JavaScript لم ينتهِ من التحميل والتنفيذ.

يغيّر الترطيب الانتقائي هذا. فهو يتيح لـ React أن:

1. **يبدأ ترطيب المكوّنات ذات الأولوية العالية فورًا**
2. **يؤجّل ترطيب الأقسام الأقل أولوية**
3. **يستجيب لتفاعلات المستخدم بإعطاء الأولوية لتلك المكوّنات**
4. **يدفّق المكوّنات وهي تصبح جاهزة**

والفكرة الجوهرية؟ ليست كل أجزاء واجهتك متساوية الأهمية عند التحميل الأول للصفحة.

## كيف يعمل الترطيب الانتقائي من الداخل

قدّم React 18 قدرات تزامنية تتيح الترطيب الانتقائي عبر حدود `Suspense`. وإليك السحر:

```typescript
// ✅ Components wrap in Suspense can hydrate independently
function App() {
  return (
    <div>
      <Header /> {/* Always hydrates first */}
      <Suspense fallback={<ShoppingCartSkeleton />}>
        <ShoppingCart /> {/* High priority - hydrates early */}
      </Suspense>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList /> {/* Medium priority */}
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer /> {/* Low priority - hydrates last */}
      </Suspense>
    </div>
  );
}
```

حين يحاول المستخدم التفاعل مع مكوّن لم يُرطَّب بعد، يعطي React الأولوية تلقائيًا لترطيب ذلك المكوّن أولًا. الأمر كأن لديك نادلًا ذكيًا يجلب المقبّلات لك قبل حلوى رفيقك على الطاولة، حتى لو كانت الحلوى قد طُلبت أولًا.

## إعداد الترطيب الانتقائي

لنبنِ مثالًا واقعيًا. تخيّل صفحة منتج في متجر إلكتروني بأقسام متعددة متمايزة لها أولويات مختلفة.

### الإعداد الأساسي باستخدام حدود `Suspense`

```typescript
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load non-critical components
const Reviews = lazy(() => import('./Reviews'));
const RecommendedProducts = lazy(() => import('./RecommendedProducts'));
const Footer = lazy(() => import('./Footer'));

function ProductPage({ productId }: { productId: string }) {
  return (
    <div>
      {/* Critical above-the-fold content - always hydrates first */}
      <ProductHeader productId={productId} />
      <ProductImages productId={productId} />
      <AddToCartButton productId={productId} />

      {/* Medium priority - user might scroll to quickly */}
      <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100" />}>
        <ErrorBoundary fallback={<div>Product details unavailable</div>}>
          <ProductDetails productId={productId} />
        </ErrorBoundary>
      </Suspense>

      {/* Lower priority - typically below the fold */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-50" />}>
        <ErrorBoundary fallback={<div>Reviews temporarily unavailable</div>}>
          <Reviews productId={productId} />
        </ErrorBoundary>
      </Suspense>

      {/* Lowest priority - auxiliary content */}
      <Suspense fallback={<div className="h-48 animate-pulse bg-gray-50" />}>
        <RecommendedProducts productId={productId} />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
```

### الأولوية الذكية مع تفاعلات المستخدم

هنا يتألق الترطيب الانتقائي حقًا. حين يتفاعل المستخدمون مع المكوّنات، يرفع React أولوية ترطيبها تلقائيًا:

```typescript
function ProductPage({ productId }: { productId: string }) {
  return (
    <div>
      <ProductHeader productId={productId} />

      {/* If user clicks on reviews tab, this gets priority */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews
          productId={productId}
          onTabClick={() => {
            // React automatically prioritizes this component's hydration
            // when user interaction is detected
          }}
        />
      </Suspense>

      {/* Same for recommended products carousel */}
      <Suspense fallback={<CarouselSkeleton />}>
        <RecommendedProducts
          productId={productId}
          onProductClick={(id) => {
            // User interaction triggers priority hydration
            navigate(`/products/${id}`);
          }}
        />
      </Suspense>
    </div>
  );
}
```

## أنماط متقدمة واستخدامات واقعية

### التحسين التدريجي مع اكتشاف الميزات

لا تحتاج كل الميزات إلى أن تكون تفاعلية فورًا. يمكنك تحسين واجهتك تدريجيًا:

```typescript
function SearchBar() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Component is now hydrated and interactive
    setIsHydrated(true);
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className={`w-full rounded border p-2 ${
          isHydrated ? 'border-blue-500' : 'border-gray-300'
        }`}
      />

      {/* Only show interactive features after hydration */}
      {isHydrated && (
        <Suspense fallback={null}>
          <SearchSuggestions query={query} />
        </Suspense>
      )}
    </div>
  );
}
```

### الترطيب الانتقائي المعتمد على البيانات

أحيانًا تعتمد أولوية الترطيب على البيانات نفسها:

```typescript
function DashboardWidget({
  widget,
  priority,
}: {
  widget: Widget;
  priority: 'high' | 'medium' | 'low';
}) {
  // High priority widgets load immediately
  if (priority === 'high') {
    return <InteractiveWidget data={widget} />;
  }

  // Lower priority widgets use Suspense
  return (
    <Suspense fallback={<WidgetSkeleton title={widget.title} height={widget.height} />}>
      <LazyInteractiveWidget data={widget} priority={priority} />
    </Suspense>
  );
}

function Dashboard({ widgets }: { widgets: Widget[] }) {
  // Sort widgets by priority for hydration order
  const prioritizedWidgets = useMemo(
    () =>
      widgets.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
    [widgets],
  );

  return (
    <div className="grid gap-4">
      {prioritizedWidgets.map((widget) => (
        <DashboardWidget key={widget.id} widget={widget} priority={widget.priority} />
      ))}
    </div>
  );
}
```

## المزالق الشائعة وكيفية تجنّبها

### الإفراط في تغليف المكوّنات بـ Suspense

لا تغلّف كل مكوّن على حدة بـ Suspense. فهذا يخلق عبئًا إضافيًا غير ضروري:

```typescript
// ❌ Bad: Too granular
function ProductCard({ product }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductImage src={product.image} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductTitle title={product.title} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductPrice price={product.price} />
      </Suspense>
    </div>
  );
}

// ✅ Good: Group related functionality
function ProductCard({ product }) {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ProductCardContent product={product} />
    </Suspense>
  );
}
```

### نسيان حدود الأخطاء

اقرن Suspense دائمًا بمعالجة أخطاء مناسبة:

```typescript
function SafeSelectiveComponent({ data }: { data: unknown }) {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong. Please try again.</div>}
      onError={(error) => {
        // Log error for monitoring
        console.error('Component failed to hydrate:', error);
      }}
    >
      <Suspense fallback={<ComponentSkeleton />}>
        <LazyComponent data={data} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### حالات التحميل البديلة غير المتسقة

تأكّد من أن حالات الهياكل العظمية لديك تطابق أبعاد المحتوى الفعلي:

```typescript
// ✅ Good: Skeleton matches actual content layout
function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
```

## مزايا الأداء والمقايضات

### الأخبار السارة

يمكن أن يحسّن الترطيب الانتقائي الأداء المدرَك تحسينًا جذريًا:

- **زمن وصول إلى التفاعل أسرع** للمكوّنات الحرجة
- **تجربة مستخدم أفضل** أثناء الترطيب
- **تعطيل أقل للخيط الرئيسي** أثناء التحميل الأولي
- **إدارة أولويات تلقائية** بناءً على تفاعلات المستخدم

### الاعتبارات

مثل أي تحسين، للترطيب الانتقائي مقايضات:

- **تعقيد متزايد** في معمارية المكوّنات
- **تقسيم حزم أكثر** قد يزيد حجم الحزمة الإجمالي
- **حدود الأخطاء تصبح حرجة** لتجربة مستخدم جيدة
- **الاختبار يصبح أكثر تعقيدًا** مع التحميل غير المتزامن

## متى تستخدم الترطيب الانتقائي

يعمل الترطيب الانتقائي أفضل ما يعمل عندما يكون لديك:

1. **تسلسل هرمي واضح للمحتوى** (أعلى/أسفل الشاشة، ميزات أساسية/ثانوية)
2. **مكوّنات ثقيلة** مكلفة الترطيب
3. **تفاعلات يقودها المستخدم** يمكنك التنبؤ بأولويتها
4. **تصيير من جانب الخادم** قائم أصلًا

اعتبره ضروريًا في:

- **مواقع التجارة الإلكترونية** (صفحات المنتجات، سلال التسوق)
- **لوحات المعلومات** (تخطيطات قائمة على الودجات)
- **مواقع المحتوى** (مقالات مع تعليقات ومحتوى ذي صلة)
- **منصات التواصل** (خلاصات مع تمرير لا نهائي)

## قياس النجاح

تتبّع هذه المقاييس للتحقق من صحة تنفيذك للترطيب الانتقائي:

```typescript
// Simple performance tracking
function measureHydrationPerformance() {
  const navigationStart = performance.getEntriesByType('navigation')[0]?.startTime || 0;

  // Measure when critical components become interactive
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'critical-component-hydrated') {
        console.log(`Critical hydration completed in ${entry.startTime - navigationStart}ms`);
      }
    }
  });

  observer.observe({ entryTypes: ['measure'] });
}

// Mark critical hydration completion
function CriticalComponent() {
  useEffect(() => {
    performance.mark('critical-component-hydrated');
  }, []);

  return <div>{/* Your critical content */}</div>;
}
```

ركّز على:

- **زمن الوصول إلى التفاعل (TTI)** للمكوّنات الحرجة
- **تحسينات تأخير الإدخال الأول (FID)**
- **معدلات نجاح تفاعلات المستخدم** أثناء الترطيب
- **الإزاحة التراكمية للتخطيط (CLS)** الناتجة عن انتقالات الهياكل العظمية

## الخلاصة

يحوّل الترطيب الانتقائي التطبيقات المصيّرة على الخادم من «كل شيء أو لا شيء» إلى «تدريجي افتراضيًا». فبتغليف المكوّنات الأقل حرجًا في حدود Suspense والاستفادة من تحديد الأولويات التلقائي في React، يمكنك بناء تطبيقات تبدو سريعة الاستجابة من لحظة تحميلها — حتى بينما لا تزال أجزاء منها تُرطَّب في الخلفية.
