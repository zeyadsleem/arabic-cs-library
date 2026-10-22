---
title: "واجهات التحميل المسبق للموارد"
---

إن انتظار تحميل الموارد من الأمور التي تجعل تطبيقات الويب تبدو متثاقلة، حتى وهي سريعة فعلًا. ينقر المستخدم زرًا، ويحدّق في مؤشّر تحميل دوّار، ويتساءل إن كان عليه تحديث الصفحة (حرق الأحداث: سيفعل ذلك على الأرجح). وهنا تأتي واجهات التحميل المسبق للموارد (resource preloading APIs) في React 19 — مجموعة من الدوال تتيح لك تهيئة ذاكرة المتصفح المؤقتة بالموارد التي سيحتاجها المستخدمون بعد قليل، قبل أن يحتاجوها فعلًا.

تخيّل الأمر كأن تكون قهوتك جاهزة قبل أن تستيقظ تمامًا، أو كأن تجهّز الحلقة التالية بينما لا تزال تشاهد الحالية. بحلول الوقت الذي تحتاج فيه هذه الموارد فعلًا، تكون هناك بالفعل، ما يجعل تطبيقك أسرع استجابةً وأكثر سلاسة.

## عائلة التحميل المسبق للموارد

يمنحك React 19 ثلاث دوال رئيسية للتحميل المسبق للموارد: `preload` و`prefetchDNS` و`preinit`. لكل منها غرض مختلف، ومعرفة متى تستخدم أيّها قد تصنع الفرق بين تجربة مستخدم سلسة وأخرى متعثّرة.

### نظرة سريعة

- **`preload`**: ينزّل موردًا ويخزّنه مؤقتًا، لكنه لا ينفّذه
- **`prefetchDNS`**: يحلّ استعلامات DNS مسبقًا للنطاقات الخارجية
- **`preinit`**: ينزّل الموارد ويخزّنها مؤقتًا ويهيّئها (مثل أوراق الأنماط والسكربتات)

صُمّمت كل هذه الدوال لتكون آمنة — فهي لا تنزّل الموارد مرتين إن نُوديت عدة مرات، ولا تعيق الخيط الرئيسي ولا تضرّ بمؤشرات الويب الأساسية (Core Web Vitals).

## فهم `preload`

دالة `preload` هي خيارك المفضّل لتنزيل الموارد التي سيحتاجها المستخدمون قريبًا على الأرجح، لكن لا يجب تنفيذها فورًا. هذا مثالي لأشياء مثل صور الصفحة التالية، أو الخطوط التي قد تُحتاج، أو بيانات API التي قد تُطلب.

```typescript
import { preload } from 'react-dom';

function ProductList() {
  const handleProductHover = (productId: string) => {
    // When user hovers over a product, preload its detailed image
    preload(`/api/products/${productId}/image-hd.jpg`, {
      as: 'image',
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onMouseEnter={() => handleProductHover(product.id)}
          className="cursor-pointer"
        >
          <img src={product.thumbnail} alt={product.name} />
          <h3>{product.name}</h3>
        </div>
      ))}
    </div>
  );
}
```

تخبر معلمة `as` المتصفح بنوع المورد، ما يساعد في التخزين المؤقت وتحديد الأولوية. من القيم الشائعة:

- `'image'` - للصور
- `'font'` - لخطوط الويب (أضف `crossOrigin: 'anonymous'` للخطوط عبر النطاقات)
- `'script'` - لملفات JavaScript
- `'style'` - لملفات CSS
- `'fetch'` - لاستدعاءات API أو طلبات fetch الأخرى

### التحميل المسبق لبيانات API

يمكنك أيضًا تحميل استجابات API مسبقًا، وهذا مفيد خاصةً عندما تعلم أن المستخدمين مرجّحون للانتقال إلى مكان يتطلب بيانات محدّدة:

```typescript
import { preload } from 'react-dom';

function NavigationMenu() {
  const handleDashboardHover = () => {
    // Preload the user's dashboard data when they hover over the nav link
    preload('/api/dashboard/summary', {
      as: 'fetch',
      crossOrigin: 'anonymous',
    });
  };

  return (
    <nav>
      <Link to="/dashboard" onMouseEnter={handleDashboardHover}>
        Dashboard
      </Link>
    </nav>
  );
}
```

> **نصيحة**
>
> يمنحك التحميل المسبق عند المرور بالمؤشر توازنًا جميلًا — فالمستخدمون الذين يتصفحون فقط لن يطلقوا طلبات غير ضرورية، أما المهتمون فعلًا فيحصلون على شروع مبكر.

## التحميل المسبق لـ DNS باستخدام `prefetchDNS`

قبل أن يستطيع متصفحك تنزيل أي مورد من نطاق خارجي، عليه أن يحلّ ذلك النطاق إلى عنوان IP. قد يضيف استعلام DNS هذا مئات الأجزاء من الثانية إلى زمن طلبك، خصوصًا للمستخدمين على شبكات أبطأ أو البعيدين جغرافيًا عن خوادم DNS.

تخبر `prefetchDNS` المتصفح بحلّ هذه الاستعلامات مسبقًا:

```typescript
import { prefetchDNS } from 'react-dom';

function App() {
  useEffect(() => {
    // Prefetch DNS for external services we'll likely use
    prefetchDNS('https://api.stripe.com');
    prefetchDNS('https://fonts.googleapis.com');
    prefetchDNS('https://cdn.jsdelivr.net');
  }, []);

  return <Router>...</Router>;
}
```

يكون هذا ذا قيمة خاصة عندما:

- تحمّل موارد من شبكات CDN
- تجري استدعاءات API إلى خدمات خارجية
- تحمّل خطوطًا من Google Fonts أو خدمات مشابهة
- لديك سكربتات تحليلات أو تتبّع من نطاقات طرف ثالث

جمال `prefetchDNS` أنه مجاني تقريبًا — فهو لا ينزّل أي محتوى فعلي، بل يحلّ اسم النطاق فقط. حتى إن لم يحتج المستخدم تلك الموارد إطلاقًا، كانت التكلفة ضئيلة.

## التهيئة المسبقة للموارد باستخدام `preinit`

بينما تنزّل `preload` الموارد دون تنفيذها، تذهب `preinit` أبعد من ذلك بتنزيلها *وتهيئتها*. يعني هذا أن المورد يصبح متاحًا للاستخدام الفوري.

### التهيئة المسبقة لأوراق الأنماط

هذا مفيد خاصةً لأوراق الأنماط التي تعلم أنك ستحتاجها:

```typescript
import { preinit } from 'react-dom';

function SettingsPage() {
  useEffect(() => {
    // Preinit the theme switcher styles since users often toggle themes
    preinit('/styles/themes/dark-mode.css', { as: 'style' });
    preinit('/styles/themes/light-mode.css', { as: 'style' });
  }, []);

  return (
    <div className="settings-page">
      <ThemeSelector />
      {/* rest of your settings */}
    </div>
  );
}
```

### التهيئة المسبقة للسكربتات

يمكنك أيضًا تهيئة ملفات JavaScript مسبقًا تحتوي على شيفرة ستحتاجها قريبًا:

```typescript
import { preinit } from 'react-dom';

function PaymentForm() {
  useEffect(() => {
    // Preinit payment processing scripts when the form loads
    preinit('https://js.stripe.com/v3/', { as: 'script' });
  }, []);

  const [showPayment, setShowPayment] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPayment(true)}>Proceed to Payment</button>
      {showPayment && <StripePaymentForm />}
    </div>
  );
}
```

> **تحذير**
>
> توخَّ الحذر مع `preinit` للسكربتات — فهي تُنفَّذ فورًا عند تنزيلها. لا تهيّئ مسبقًا إلا السكربتات التي تثق بأنك ستحتاجها والتي يكون تشغيلها مبكرًا آمنًا.

## حالات استخدام من العالم الحقيقي™

لنلقِ نظرة على بعض السيناريوهات العملية التي يمكن أن يُحدث فيها التحميل المسبق للموارد فرقًا ملموسًا في تجربة المستخدم.

### صفحات منتجات التجارة الإلكترونية

```typescript
import { preload, prefetchDNS } from 'react-dom';

function ProductCard({ product }: { product: Product }) {
  const handleMouseEnter = () => {
    // Preload high-res images for the product detail page
    preload(`/images/products/${product.id}/hero.jpg`, { as: 'image' });
    preload(`/images/products/${product.id}/gallery.jpg`, { as: 'image' });

    // Preload the product details API call
    preload(`/api/products/${product.id}`, { as: 'fetch' });
  };

  return (
    <Link to={`/products/${product.id}`} onMouseEnter={handleMouseEnter}>
      <img src={product.thumbnail} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </Link>
  );
}
```

### النماذج متعددة الخطوات

```typescript
import { preload, preinit } from 'react-dom';

function OnboardingFlow() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Always prefetch DNS for services we'll use
    prefetchDNS('https://api.stripe.com');
    prefetchDNS('https://maps.googleapis.com');

    // Preload resources for likely next steps
    if (step === 1) {
      preload('/api/validate-business', { as: 'fetch' });
    } else if (step === 2) {
      preinit('https://js.stripe.com/v3/', { as: 'script' });
      preload('/api/payment-methods', { as: 'fetch' });
    }
  }, [step]);

  return (
    <div>
      {step === 1 && <BusinessInfoStep onNext={() => setStep(2)} />}
      {step === 2 && <PaymentStep onNext={() => setStep(3)} />}
      {step === 3 && <ConfirmationStep />}
    </div>
  );
}
```

### تطبيقات لوحات المعلومات

```typescript
import { preload, prefetchDNS } from 'react-dom';

function Dashboard() {
  useEffect(() => {
    // Preload common dashboard resources
    prefetchDNS('https://api.analytics.com');

    // Preload data for tabs users commonly switch between
    preload('/api/dashboard/analytics', { as: 'fetch' });
    preload('/api/dashboard/reports', { as: 'fetch' });

    // Preload chart rendering library (but don't preinit it)
    preload('/scripts/chart-library.js', { as: 'script' });
  }, []);

  return (
    <div className="dashboard">
      <TabNav />
      <MainContent />
    </div>
  );
}
```

## اعتبارات الأداء

قد يحسّن التحميل المسبق للموارد الأداء المدرَك تحسينًا جذريًا، لكن من المهم استخدامه بتفكير. إليك الأمور الرئيسية التي ينبغي وضعها في الاعتبار:

### لا تحمّل كل شيء مسبقًا

الإغراء هو تحميل كل الأشياء مسبقًا، لكن هذا قد ينعكس سلبًا:

```typescript
// ❌ This will hurt more than it helps
useEffect(() => {
  // Don't do this - you're wasting bandwidth and potentially blocking more important resources
  preload('/images/gallery/image1.jpg', { as: 'image' });
  preload('/images/gallery/image2.jpg', { as: 'image' });
  preload('/images/gallery/image3.jpg', { as: 'image' });
  // ... 50 more images
}, []);

// ✅ Better - preload strategically
const handleGalleryEnter = () => {
  // Only preload the first few images when user shows intent
  preload('/images/gallery/image1.jpg', { as: 'image' });
  preload('/images/gallery/image2.jpg', { as: 'image' });
};
```

### اعتبارات الهاتف المحمول

كن حذرًا بشكل خاص على شبكات الهاتف المحمول حيث النطاق الترددي محدود والبيانات مكلّفة:

```typescript
import { preload } from 'react-dom';

function usePreloadStrategy() {
  const [connection] = useState(
    () =>
      // @ts-ignore - not all browsers support this yet
      navigator.connection || navigator.mozConnection || navigator.webkitConnection,
  );

  const shouldPreload = useMemo(() => {
    // Don't preload on slow connections or when user has data saver enabled
    if (connection?.saveData) return false;
    if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return false;
    }
    return true;
  }, [connection]);

  return { shouldPreload };
}

function ProductGrid() {
  const { shouldPreload } = usePreloadStrategy();

  const handleProductHover = (productId: string) => {
    if (shouldPreload) {
      preload(`/api/products/${productId}`, { as: 'fetch' });
    }
  };

  // ... rest of component
}
```

### تجنّب التحميل المزدوج

من الأمور الرائعة في دوال التحميل المسبق في React أنها ذكية في عدم تحميل الموارد مرتين:

```typescript
function ComponentA() {
  useEffect(() => {
    preload('/api/user-data', { as: 'fetch' });
  }, []);

  return <div>Component A</div>;
}

function ComponentB() {
  useEffect(() => {
    // This won't trigger another download - React knows this resource is already preloaded
    preload('/api/user-data', { as: 'fetch' });
  }, []);

  return <div>Component B</div>;
}
```

## المزالق الشائعة وكيفية تجنّبها

### تحميل الموارد مسبقًا في وقت مبكر جدًا

```typescript
// ❌ This preloads immediately when the app starts, potentially wasting bandwidth
function App() {
  useEffect(() => {
    preload('/api/premium-features', { as: 'fetch' }); // Most users might never need this
  }, []);

  return <Router />;
}

// ✅ Better - preload when there's user intent
function PricingPage() {
  const handleUpgradeHover = () => {
    preload('/api/premium-features', { as: 'fetch' }); // Now we know they're interested
  };

  return <button onMouseEnter={handleUpgradeHover}>Upgrade to Premium</button>;
}
```

### نسيان CORS للموارد عبر النطاقات

```typescript
// ❌ This might fail for cross-origin requests
preload('https://api.external.com/data', { as: 'fetch' });

// ✅ Include CORS headers when needed
preload('https://api.external.com/data', {
  as: 'fetch',
  crossOrigin: 'anonymous',
});
```

### عدم مراعاة ترويسات التخزين المؤقت

تأكّد من أن خادمك يضبط ترويسات تخزين مؤقت مناسبة للموارد المحمّلة مسبقًا. إن كانت استجابات API لديك تحمل `Cache-Control: no-cache`، فلن يفيد تحميلها مسبقًا كثيرًا لأنها لا يمكن تخزينها مؤقتًا.

```typescript
// Your API endpoint should include proper cache headers
app.get('/api/products/:id', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
  res.json(productData);
});
```

## قائمة أفضل الممارسات

إليك قائمة سريعة لاستخدام التحميل المسبق للموارد بفاعلية:

- ✅ حمّل الموارد مسبقًا بناءً على نية المستخدم (المرور، التركيز، القرب من التمرير)
- ✅ استخدم `prefetchDNS` للنطاقات الخارجية التي ستحتاجها على الأرجح
- ✅ راعِ ظروف الشبكة وتفضيلات موفّر البيانات
- ✅ حمّل الموارد عالية الأثر أولًا (الصور الحرجة، استدعاءات API الأولية)
- ✅ اختبر على شبكات بطيئة للتأكد من أنك تحسّن الأداء فعلًا
- ✅ راقب مقاييس التحميل لديك للتحقق من أن التحميل المسبق يساعد
- ❌ لا تحمّل الموارد مسبقًا «تحسّبًا» — كن استراتيجيًا
- ❌ لا تنسَ ترويسات CORS للموارد عبر النطاقات
- ❌ لا تحمّل الموارد الكبيرة مسبقًا إلا إذا كنت واثقًا من الحاجة إليها
