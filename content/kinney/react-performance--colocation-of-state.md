---
title: "إبقاء الحالة قريبة من موضع استخدامها (Colocation of State)"
lang: ar
source: "https://stevekinney.com/courses/react-performance/colocation-of-state"
---

إبقاء الحالة قريبة من موضع استخدامها أحد أنماط أداء React التي يبدو اسمها متأنّقًا لكنها في حقيقتها مجرّد حكمة بديهية: أبقِ حالتك قريبة قدر الإمكان من موضع استخدامها الفعلي. فبدلًا من رفع كل شيء إلى قمة شجرة المكوّنات «تحسّبًا لأي طارئ»، تضع الحالة حيث تنتمي بالضبط — قرب المكوّنات التي تحتاجها فعلًا.

يمكن لهذا المبدأ البسيط أن يقلّل جذريًا عمليات إعادة التصيير غير الضرورية، وأن يجعل مكوّناتك أسهل في الاختبار والاستدلال، وأن ينجيك من كابوس تمرير الخصائص المتشعّب المخيف. فضلًا عن أنه يجعل شيفرتك أكثر قابلية للصيانة عندما تحتاج حتمًا إلى نقل المكوّنات هنا وهناك (وثق بي، ستحتاج إلى ذلك).

## لماذا يهمّ إبقاء الحالة قريبة

عندما تعيش الحالة بعيدًا عن موضع استهلاكها، ينتهي بك الأمر إلى مشكلات عدة:

- **عواصف التصيير**: تغييرات الحالة عالية المستوى تُطلق إعادات تصيير في مكوّنات لا تهمّها تلك التغييرات فعلًا
- **تمرير الخصائص المتشعّب**: تُمرّر الخصائص عبر طبقات مكوّنات متعددة لا تحتاج إليها
- **الاقتران المحكم**: تصبح المكوّنات معتمدة على حالة أب لا ينبغي أن تعرف عنها شيئًا
- **تعقيد الاختبار**: تحتاج إلى إعداد أشجار مكوّنات كاملة لمجرّد اختبار جزء صغير من الوظائف

السلوك الافتراضي في React هو إعادة تصيير المكوّن وكل أبنائه كلما تغيّرت الحالة. وإذا كانت لديك حالة في جذر تطبيقك لا تؤثّر إلا في جزء صغير من واجهتك، فأنت ربما تعيد تصيير تطبيقك بأكمله بلا سبب وجيه.

## النمط المضاد: كل شيء في App

لنبدأ بما *لا* ينبغي فعله. إليك نمطًا مضادًا شائعًا تعيش فيه كل الحالة في المستوى الأعلى:

```typescript
// ❌ Bad: Everything lives in App
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      <Header user={user} onLogout={() => setUser(null)} />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onResultsChange={setSearchResults}
      />
      <ProductGrid
        products={searchResults}
        onProductSelect={setSelectedProduct}
        onModalOpen={() => setIsModalOpen(true)}
      />
      <Cart items={cartItems} onItemsChange={setCartItems} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  );
}
```

يبدو هذا منظّمًا للوهلة الأولى، لكن كل تغيير في الحالة يُطلق إعادة تصيير لمكوّن `App` بأكمله وكل أبنائه. فعندما يكتب أحدهم في شريط البحث، يُعاد تصيير الترويسة وسلة التسوّق والنافذة المنبثقة جميعًا بلا داعٍ.

## الأفضل: حالة قريبة من موضع استخدامها

إليك الوظائف نفسها مع حالة موضوعة على النحو الصحيح قرب موضع استخدامها:

```typescript
// ✅ Good: State lives close to where it's used
function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <Header user={user} onLogout={() => setUser(null)} />
      <SearchSection />
      <Cart />
    </div>
  );
}

function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResultsChange={setSearchResults}
      />
      <ProductGrid
        products={searchResults}
        onProductSelect={setSelectedProduct}
        onModalOpen={() => setIsModalOpen(true)}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </section>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return <aside>{/* Cart implementation */}</aside>;
}
```

الآن عندما يكتب أحدهم في شريط البحث، لا يُعاد تصيير إلا مكوّن `SearchSection` وأبنائه. أما الترويسة وسلة التسوّق فتبقيان بمنأى تمامًا.

## مثال من الواقع: حالة نموذج

النماذج مثال مثالي على الموضع الذي يتألّق فيه إبقاء الحالة قريبًا. لننظر إلى نموذج ملف تعريف مستخدم يوضّح الفرق:

```typescript
// ❌ Bad: Form state scattered throughout parent components
function UserProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Submit logic...
    setIsSubmitting(false);
  };

  return (
    <div>
      <PageHeader />
      <UserProfileForm
        name={name}
        onNameChange={setName}
        email={email}
        onEmailChange={setEmail}
        bio={bio}
        onBioChange={setBio}
        avatar={avatar}
        onAvatarChange={setAvatar}
        isSubmitting={isSubmitting}
        errors={errors}
        onSubmit={handleSubmit}
      />
      <Sidebar />
    </div>
  );
}
```

كل ضغطة مفتاح في النموذج تُطلق إعادة تصيير لـ `UserProfilePage` و`PageHeader` و`Sidebar`. وهذا إهدار.

```typescript
// ✅ Good: Form state colocated
function UserProfilePage() {
  return (
    <div>
      <PageHeader />
      <UserProfileForm />
      <Sidebar />
    </div>
  );
}

function UserProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof typeof formData) => (value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Submit logic...
    } catch (error) {
      // Error handling...
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => updateField('name')(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email')(e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={formData.bio}
        onChange={(e) => updateField('bio')(e.target.value)}
        placeholder="Bio"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
```

الآن لا تُعيد تفاعلات النموذج تصيير غير النموذج نفسه. وتبقى ترويسة الصفحة والشريط الجانبي في غفلة سعيدة عن كتابتك.

## متى لا تُبقي الحالة قريبة

هناك بالتأكيد أوقات لا ينبغي فيها إبقاء الحالة قريبة من موضع الاستخدام. إليك الاستثناءات الرئيسية:

### حالة مشتركة بين مكوّنات شقيقة

عندما تحتاج عدة مكوّنات في المستوى نفسه إلى الحالة ذاتها:

```typescript
// ✅ Good: Shared state lives in common parent
function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  return (
    <div>
      <DateRangePicker value={selectedDateRange} onChange={setSelectedDateRange} />
      <SalesChart dateRange={selectedDateRange} />
      <RevenueTable dateRange={selectedDateRange} />
    </div>
  );
}
```

### حالة التطبيق العامة

بعض الحالة تحتاج فعلًا إلى أن تكون عامة:

```typescript
// ✅ Good: Authentication state is global
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### حالة تحتاج إلى البقاء

إذا كانت الحالة تحتاج إلى البقاء بعد إلغاء تحميل المكوّن، فالأرجح أنها تنتمي إلى مستوى أعلى:

```typescript
// ✅ Good: Draft state persists when modal closes
function App() {
  const [draftPost, setDraftPost] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsComposeOpen(true)}>Write Post</button>
      {isComposeOpen && (
        <ComposeModal
          draft={draftPost}
          onDraftChange={setDraftPost}
          onClose={() => setIsComposeOpen(false)}
        />
      )}
    </div>
  );
}
```

## نمط متقدّم: رفع الحالة وخفضها

قد تحتاج أحيانًا إلى نقل الحالة صعودًا ونزولًا في شجرة المكوّنات مع تغيّر المتطلبات. وهذا طبيعي تمامًا! إليك كيف تفكّر في الأمر:

```typescript
// Initial implementation: colocated
function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => setIsLiked(!isLiked)}>{isLiked ? '❤️' : '🤍'}</button>
    </div>
  );
}
```

لاحقًا، تحتاج إلى عرض المنتجات المُعجَبة في جزء آخر من التطبيق:

```typescript
// Lifted state for sharing
function ProductSection() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <div>
      <ProductGrid products={products} likedProducts={likedProducts} onToggleLike={toggleLike} />
      <LikedProductsSidebar likedProducts={likedProducts} />
    </div>
  );
}
```

> **نصيحة**
>
> ابدأ بحالة قريبة من موضع استخدامها، ولا ترفعها إلا عندما تكون لديك حاجة ملموسة إلى مشاركتها. لا ترفع الحالة تحسّبًا.

## أثر الأداء بالأرقام

لوضع ذلك في المنظور الصحيح، إليك ما يحدث في شجرة مكوّنات نموذجية:

```typescript
// ❌ State at root causes 100+ component re-renders
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Header /> {/* Unnecessary re-render */}
      <Navigation /> {/* Unnecessary re-render */}
      <MainContent>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ProductGrid /> {/* Unnecessary re-render */}
      </MainContent>
      <Sidebar /> {/* Unnecessary re-render */}
      <Footer /> {/* Unnecessary re-render */}
    </div>
  );
}

// ✅ Colocated state causes 3-5 component re-renders
function MainContent() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <SearchResults query={searchQuery} />
    </section>
  );
}
```

يصبح الفرق أهمّ أضعافًا مضاعفة مع نموّ شجرة مكوّناتك. فتغيير يُطلق 5 عمليات إعادة تصيير بدل 100 هو تحسين في الأداء بنسبة 95%!

## فوائد الاختبار

تُبسّط الحالة القريبة من موضع استخدامها الاختبار كثيرًا، إذ لا تحتاج إلى محاكاة حالة أب معقّدة:

```typescript
// ✅ Easy to test - self-contained
describe('UserProfileForm', () => {
  it('validates email format', () => {
    render(<UserProfileForm />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByText('Save Profile'));

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});
```

قارن هذا باختبار المنطق نفسه عندما تعيش الحالة في مكوّن أب — إذ ستحتاج إلى إعداد التسلسل الهرمي للمكوّنات بأكمله لمجرّد اختبار التحقّق من البريد الإلكتروني.

## قائمة تحقّق سريعة لإبقاء الحالة قريبة

قبل أن تقرّر أين تضع الحالة، اسأل نفسك:

- **كم مكوّنًا يحتاج هذه الحالة فعلًا؟** إن كان مكوّنًا واحدًا فقط، فأبقِها قريبة منه.
- **هل تحتاج مكوّنات شقيقة إلى مشاركة هذه الحالة؟** إن كان نعم، فارفعها إلى الأب المشترك.
- **هل تحتاج هذه الحالة إلى البقاء عند إلغاء تحميل المكوّنات؟** إن كان نعم، ففكّر في رفعها.
- **هل هذه حالة عامة فعلًا** (مثل المصادقة أو السمة)؟ إن كان نعم، فضعها في مزوّد أو مخزن عام.
- **هل أرفع الحالة «تحسّبًا لأي طارئ»؟** لا تفعل ذلك — ابدأ بحالة قريبة من موضع استخدامها وارفعها عند الحاجة.
