---
title: "دقّة تقسيم المكوّنات"
---

تقسيم المكوّنات سيف ذو حدّين في تحسين أداء React. إن قسّمت قليلًا حصلت على مكوّنات متجانسة ضخمة تُعيد تصيير كل شيء عند تغيّر خاصية واحدة. وإن قسّمت كثيرًا انتهيت إلى «قصاصات مكوّنات» متناثرة — عشرات القطع الصغيرة المبعثرة في أنحاء مستودعك تجعل تصحيح الأخطاء أشبه بالتنقيب الأثري. والسرّ هو العثور على النقطة المثالية حيث تتولّى كل قطعة مسؤولية واحدة بحدود واضحة، فيصبح تطبيقك سريعًا وقابلًا للصيانة معًا.

## لماذا تهمّ دقّة تقسيم المكوّنات

في كل مرة يُعاد تصيير مكوّن في React، قد يُطلق ذلك سلسلة من عمليات إعادة تصيير الأبناء. وعندما يكون لديك مكوّن كبير يدير عدة قطع من الحالة، فقد يؤدي تغيير أي قطعة واحدة إلى إعادة تصيير شجرة المكوّنات بأكملها بلا داعٍ. ويصبح هذا مؤلمًا بشكل خاص عندما تكون لديك:

- نماذج معقّدة فيها حقول إدخال متعددة
- قوائم بعناصر تفاعلية
- تخطيطات على نمط لوحات المعلومات فيها ودجات متعددة
- عربات تسوّق فيها كميات العناصر والمجاميع

الهدف ليس إنشاء أكبر عدد ممكن من المكوّنات — بل إنشاء مكوّنات تتغيّر معًا فتبقى معًا.

## مشكلة المكوّن المتجانس الضخم

لنبدأ بمثال كلاسيكي: بطاقة منتج تعرض أكثر مما ينبغي وتفعل أكثر مما ينبغي.

```typescript
// ❌ Monolithic component - everything re-renders when anything changes
function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // This effect runs on every render
  useEffect(() => {
    if (showDetails && reviews.length === 0) {
      setIsLoadingReviews(true);
      fetchReviews(product.id).then(setReviews);
    }
  }, [showDetails, reviews.length, product.id]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    // Changing quantity re-renders the entire card, including reviews
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Wishlist toggle re-renders everything
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>

      {/* Quantity selector */}
      <div>
        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>

      {/* Wishlist button */}
      <button onClick={toggleWishlist}>{isWishlisted ? '❤️' : '🤍'}</button>

      {/* Details toggle */}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>

      {/* Expensive reviews section */}
      {showDetails && (
        <div>
          {isLoadingReviews ? (
            <div>Loading reviews...</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <strong>{review.author}</strong>
                <p>{review.content}</p>
                <div>{'⭐'.repeat(review.rating)}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

يحمّل هذا المكوّن مسؤوليات أكثر من اللازم. عندما تتغيّر الكمية، تُعاد البطاقة بأكملها للتصيير — بما في ذلك قسم المراجعات الذي قد يضمّ عشرات من مكوّنات المراجعة. وعندما تبدّل حالة قائمة الرغبات، يُعاد تصيير محدد الكمية بلا داعٍ.

## التقسيم الاستراتيجي للمكوّنات

المفتاح هو تقسيم المكوّنات على حدود الحالة. ينبغي عمومًا أن تعيش كل قطعة حالة مستقلة في مكوّنها الخاص (أو على الأقل أن تُعزل عن الحالة غير المرتبطة بها).

```typescript
// ✅ Split into focused components
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <ProductImage src={product.image} alt={product.name} />
      <ProductInfo name={product.name} price={product.price} />
      <ProductActions productId={product.id} />
    </div>
  );
}

function ProductActions({ productId }: { productId: string }) {
  return (
    <div className="product-actions">
      <QuantitySelector />
      <WishlistButton productId={productId} />
      <ProductDetails productId={productId} />
    </div>
  );
}

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  // Only this component re-renders when quantity changes
  return (
    <div className="quantity-selector">
      <button onClick={() => setQuantity((q) => q - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((q) => q + 1)}>+</button>
    </div>
  );
}

function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Only this component re-renders when wishlist status changes
  return (
    <button onClick={() => setIsWishlisted(!isWishlisted)}>{isWishlisted ? '❤️' : '🤍'}</button>
  );
}

function ProductDetails({ productId }: { productId: string }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      {showDetails && <ReviewsList productId={productId} />}
    </>
  );
}

function ReviewsList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews(productId).then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, [productId]);

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

// Individual review items are memoized to prevent unnecessary re-renders
const ReviewItem = memo(({ review }: { review: Review }) => (
  <div className="review">
    <strong>{review.author}</strong>
    <p>{review.content}</p>
    <div>{'⭐'.repeat(review.rating)}</div>
  </div>
));
```

الآن عندما تغيّر الكمية، لن يُعاد تصيير إلا `QuantitySelector`. وعندما تبدّل حالة قائمة الرغبات، لن يُعاد تصيير إلا `WishlistButton`. أما قائمة المراجعات المكلفة فلا تُصيّر إلا عند الحاجة، ولا يُعاد تصييرها أبدًا بسبب تغييرات حالة غير مرتبطة بها.

## فنّ اختيار نقاط التقسيم

ليست كل قطعة من JSX تحتاج إلى مكوّن خاص بها. إليك كيف تحدّد نقاط التقسيم الجيدة:

### قسّم عندما تكون الحالة مستقلة

```typescript
// ✅ Good split - each piece of state is independent
function UserProfile() {
  return (
    <div>
      <ProfilePicture /> {/* Has its own upload state */}
      <ContactInfo /> {/* Has its own editing state */}
      <PreferencesList /> {/* Has its own selection state */}
    </div>
  );
}

// ❌ Don't split purely for organization without performance benefit
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      {/* These don't need to be separate components */}
      <NameField name={name} onChange={setName} />
      <EmailField email={email} onChange={setEmail} />
    </div>
  );
}
```

### قسّم عندما تصبح المكوّنات معقّدة

استخدم «اختبار التمرير» — إن لم تستطع رؤية المكوّن بأكمله على شاشتك دفعة واحدة، فهو على الأرجح يفعل أكثر من اللازم.

```typescript
// ✅ Break down complex forms
function CheckoutForm() {
  return (
    <form>
      <ShippingAddress />
      <PaymentMethod />
      <OrderSummary />
      <PromoCodeInput />
    </form>
  );
}

// Each section manages its own validation and state
function ShippingAddress() {
  const [address, setAddress] = useState(initialAddress);
  const [errors, setErrors] = useState({});

  // Complex validation logic contained here
  const validateAddress = useCallback(() => {
    // ... validation logic
  }, [address]);

  return <fieldset>{/* Address form fields */}</fieldset>;
}
```

### قسّم عندما تحتاج إلى وتائر تحديث مختلفة

بعض أجزاء واجهتك تتحدّث كثيرًا بينما يبقى بعضها ساكنًا. افصل بينها لتجنّب العمل غير الضروري.

```typescript
// ✅ Separate frequently updating components
function TradingDashboard() {
  return (
    <div className="dashboard">
      <StaticHeader /> {/* Never changes */}
      <LivePriceTracker /> {/* Updates every second */}
      <UserPortfolio /> {/* Updates when user trades */}
      <StaticFooter /> {/* Never changes */}
    </div>
  );
}

const StaticHeader = memo(() => (
  <header>
    <h1>Trading Dashboard</h1>
    <nav>{/* Navigation links */}</nav>
  </header>
));

function LivePriceTracker() {
  const prices = useWebSocket('/api/prices');

  return (
    <div className="price-grid">
      {prices.map((price) => (
        <PriceCard key={price.symbol} price={price} />
      ))}
    </div>
  );
}
```

## المزالق الشائعة في التقسيم

### الإفراط في التقسيم: مشكلة قصاصات المكوّنات

```typescript
// ❌ Over-split - creates unnecessary complexity
function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <PostTitle title={post.title} />
      <PostDate date={post.date} />
      <PostAuthor author={post.author} />
      <PostContent content={post.content} />
      <PostTags tags={post.tags} />
    </article>
  );
}

// ✅ Better - only split where it provides value
function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <div className="meta">
          <time>{post.date}</time>
          <span>by {post.author}</span>
        </div>
      </header>
      <PostContent content={post.content} /> {/* Split because it's complex */}
      <TagList tags={post.tags} /> {/* Split because it's interactive */}
    </article>
  );
}
```

### تمرير الخصائص عبر الطبقات بسبب الإفراط في التقسيم

عندما تقسّم المكوّنات بشراسة مفرطة، قد تُنشئ مشكلات في تمرير الخصائص عبر طبقات متعددة (prop drilling). فكّر في استخدام السياق أو مكتبات إدارة الحالة للحالة المشتركة على أعماق بعيدة.

```typescript
// ❌ Creates prop drilling
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <Layout user={user} theme={theme}>
      <Sidebar user={user} theme={theme}>
        <Navigation user={user} theme={theme} />
      </Sidebar>
      <Main user={user} theme={theme}>
        <Content user={user} theme={theme} />
      </Main>
    </Layout>
  );
}

// ✅ Use context for widely shared state
const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, theme, setUser, setTheme }}>
      <Layout>
        <Sidebar>
          <Navigation />
        </Sidebar>
        <Main>
          <Content />
        </Main>
      </Layout>
    </AppContext.Provider>
  );
}
```

## اختبار المكوّنات المقسمة

من أكبر فوائد التقسيم الصحيح للمكوّنات تحسّن قابلية الاختبار. فالمكوّنات الأصغر والأكثر تركيزًا أسهل اختبارًا بمعزل عن غيرها.

```typescript
// ✅ Easy to test in isolation
import { render, fireEvent, screen } from '@testing-library/react';
import { QuantitySelector } from './QuantitySelector';

test('increments quantity when plus button is clicked', () => {
  render(<QuantitySelector />);

  const incrementButton = screen.getByText('+');
  const quantity = screen.getByText('1');

  fireEvent.click(incrementButton);

  expect(screen.getByText('2')).toBeInTheDocument();
});

test('decrements quantity when minus button is clicked', () => {
  render(<QuantitySelector />);

  const incrementButton = screen.getByText('+');
  const decrementButton = screen.getByText('-');

  fireEvent.click(incrementButton); // Go to 2
  fireEvent.click(decrementButton); // Back to 1

  expect(screen.getByText('1')).toBeInTheDocument();
});
```

قارن هذا باختبار مكوّن متجانس ضخم حيث تحتاج إلى تهيئة سياق المنتج بأكمله لمجرد اختبار منطق الكمية.

## مراقبة الأداء

استخدم مُنمّق React DevTools (Profiler) لقياس أثر تقسيمات مكوّناتك. وابحث عن:

- **زمن تصيير أقل** للمكوّنات الفردية
- **إعادات تصيير غير ضرورية أقل** عند تغيّر الحالة
- **مراحل إيداع أصغر** في المنمّق

```typescript
// Add display names for easier profiling
QuantitySelector.displayName = 'QuantitySelector';
WishlistButton.displayName = 'WishlistButton';
ReviewsList.displayName = 'ReviewsList';
```

> **نصيحة**
>
> قِس الأداء قبل التقسيم وبعده لتتأكد من أنك تحسّن الأداء فعلًا، لا أنك تنقل التعقيد من مكان إلى آخر فحسب.

## متى لا تقسّم

أحيانًا يكون إبقاء المكوّنات معًا هو الخيار الصحيح:

- **منطق مترابط بإحكام** يتغيّر دائمًا معًا
- **محتوى بسيط وساكن** لا يُعاد تصييره أبدًا
- **مكوّنات أصغر من 50 سطرًا** ذات مسؤولية واحدة
- **عندما يُنشئ التقسيم تمريرًا معقّدًا للخصائص**

```typescript
// ✅ Keep simple, coupled logic together
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Email and password validation are tightly coupled
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateLoginForm({ email, password });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Submit login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## استراتيجية تقسيم واقعية

إليك نهجًا عمليًا لتقسيم مكوّنات قائمة:

1. **حدّد حدود الحالة** - جمّع الحالة المترابطة معًا
2. **اعثر على العمليات المكلفة** - اعزل الحسابات الثقيلة أو نداءات API
3. **ابحث عن ميزات مستقلة** - أشياء يمكن أن تعمل بمعزل عن غيرها
4. **راعِ أنماط تفاعل المستخدم** - ما الذي يُنقر أو يتغيّر معًا؟
5. **قِس الأداء وراقبه** - تحقّق من أن التقسيمات تحسّن الأداء فعلًا

الهدف هو مكوّنات **مركّزة وقابلة للاختبار وعالية الأداء** — لا أكبر عدد ممكن من المكوّنات. وينبغي أن يكون لكل تقسيم مبرّر واضح: الأداء، أو قابلية الصيانة، أو قابلية إعادة الاستخدام.
