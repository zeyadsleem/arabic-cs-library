---
title: "رفع الحالة بذكاء (Lifting State Intelligently)"
lang: ar
source: "https://stevekinney.com/courses/react-performance/lifting-state-intelligently"
---

«ارفع الحالة إلى أعلى» من أكثر الشعارات تكرارًا في React — ولسبب وجيه. فعندما تحتاج عدة مكوّنات إلى القطعة نفسها من البيانات، يصبح نقلها إلى أقرب سلف مشترك لها منطقيًا تمامًا. لكن كمعظم النصائح المعمارية، يسهل المبالغة في ذلك وإنشاء اختناقات أداء بالخطأ تنتشر في شجرة مكوّناتك بأكملها.

والرؤية الجوهرية؟ **لا ترفع الحالة إلا عندما تحتاج المكوّنات فعلًا إلى مشاركتها**. وكل ما عدا ذلك يمكنه (بل ينبغي له) أن يبقى محليًا. وعندما ترفع الحالة فعلًا، فكن متعمّدًا في اختيار موضع استقرارها وكيفية انتشار التغييرات. فقليل من التفكير المسبق ينجيك من تصحيح واجهات بطيئة لاحقًا.

## مشكلة المبالغة في رفع الحالة

لنفترض أنك تبني لوحة تحكّم فيها عدة أدوات مصغّرة. لكل أداة حالة التحميل الخاصة بها وبياناتها وتفاعلات مستخدميها. وقد يكون النهج الساذج هو رفع كل الحالة إلى المستوى الأعلى — فالحالة المركزية تبدو منظّمة، أليس كذلك؟

```typescript
// ❌ Over-lifting state creates unnecessary re-renders
function Dashboard() {
  const [widget1Loading, setWidget1Loading] = useState(false);
  const [widget1Data, setWidget1Data] = useState(null);
  const [widget2Loading, setWidget2Loading] = useState(false);
  const [widget2Data, setWidget2Data] = useState(null);
  const [widget3Loading, setWidget3Loading] = useState(false);
  const [widget3Data, setWidget3Data] = useState(null);

  return (
    <div>
      <Widget1
        loading={widget1Loading}
        data={widget1Data}
        setLoading={setWidget1Loading}
        setData={setWidget1Data}
      />
      <Widget2
        loading={widget2Loading}
        data={widget2Data}
        setLoading={setWidget2Loading}
        setData={setWidget2Data}
      />
      <Widget3
        loading={widget3Loading}
        data={widget3Data}
        setLoading={setWidget3Loading}
        setData={setWidget3Data}
      />
    </div>
  );
}
```

وهنا المشكلة: كلما حمّلت أي أداة بياناتها، يُعاد تصيير مكوّن `Dashboard` بأكمله — مع كل أداة أخرى — مع أنه لا علاقة بينها. لقد أنشأت نقطة اختناق في الأداء تُطلق فيها تغييرات معزولة عملًا غير ضروري في شجرتك بأكملها.

## أبقِ الحالة محلية افتراضيًا

والنهج الأفضل؟ **ابدأ محليًا، ولا ترفع إلا عند الضرورة**. ينبغي لكل أداة أن تدير حالتها بنفسها حتى يوجد سبب قوي لمشاركتها.

```typescript
// ✅ Keep independent state local
function Dashboard() {
  return (
    <div>
      <Widget1 />
      <Widget2 />
      <Widget3 />
    </div>
  );
}

function Widget1() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchWidget1Data();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Spinner /> : <WidgetContent data={data} />}
      <button onClick={loadData}>Refresh</button>
    </div>
  );
}
```

الآن عندما تحمّل `Widget1` بياناتها، لا يُعاد تصيير إلا `Widget1`. وتبقى الأدوات الأخرى في غفلة سعيدة، وتبقى لوحة التحكّم لديك سريعة الاستجابة.

> **ملاحظة**
>
> هذا هو السلوك الافتراضي في React وهو في صالحك. فلا يُعاد تصيير المكوّنات إلا عندما تتغيّر حالتها هي أو يمرّر لها الأب خصائص مختلفة.

## متى ترفع الحالة فعلًا

ينبغي أن ترفع الحالة عندما تحتاج المكوّنات إلى:

1. **مشاركة البيانات نفسها** وعرضها باتساق
2. **تنسيق السلوك** (مثل واجهات الرئيس/التفصيل)
3. **مزامنة التغييرات** عبر مواضع متعددة

لننظر إلى مثال واقعي يكون فيه رفع الحالة منطقيًا:

```typescript
// ✅ Lift state when components need to share data
function OrderManagement() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <div className="flex">
      <OrderList
        orders={orders}
        selectedOrderId={selectedOrderId}
        onSelectOrder={setSelectedOrderId}
      />
      <OrderDetails
        orderId={selectedOrderId}
        onOrderUpdate={(updatedOrder) => {
          setOrders((prev) =>
            prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
          );
        }}
      />
    </div>
  );
}
```

هنا يحتاج `OrderList` و`OrderDetails` فعلًا إلى التنسيق — فاختيار طلب من القائمة ينبغي أن يعرض تفاصيله، وتحديث طلب ينبغي أن يحدّث القائمة. والحالة المشتركة مبرَّرة.

## استراتيجيات ذكية لموضع الحالة

### أبقِ الحالة قريبة من المكوّنات التي تحتاجها

ضع الحالة قريبة قدر الإمكان من المكوّنات التي تستخدمها. فإن كان مكوّنان شقيقان فقط يحتاجان إلى مشاركة البيانات، فارفعها إلى أبيهما المباشر — لا إلى سلف بعيد على بُعد ثلاثة مستويات.

```typescript
// ✅ Lift to the closest common parent
function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <ProductDetails /> {/* This component manages its own state */}
      <RelatedProductsSection /> {/* This section has shared state */}
    </div>
  );
}

function RelatedProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);

  return (
    <section>
      <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      <ProductGrid products={products} category={selectedCategory} />
    </section>
  );
}
```

### استخدم حاويات حالة متعددة

لا تشعر بأنك مضطر إلى حشر كل شيء في كائن حالة واحد. فغالبًا ما تكون قطع الحالة المتعددة المركّزة أفضل من كائن واحد متضخّم.

```typescript
// ❌ Monolithic state object
function App() {
  const [appState, setAppState] = useState({
    user: null,
    currentPage: 'home',
    sidebarOpen: false,
    notifications: [],
    theme: 'light',
  });

  // Every state change re-renders the entire app
}

// ✅ Separate concerns
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <Header user={user} />
      <Sidebar /> {/* Manages its own open/closed state */}
      <NotificationSystem /> {/* Manages its own notifications */}
      <ThemeProvider>
        {' '}
        {/* Manages theme separately */}
        <PageContent page={currentPage} />
      </ThemeProvider>
    </div>
  );
}
```

### احصر تغييرات الحالة باستخدام `React.memo`

عندما تحتاج فعلًا إلى رفع الحالة لكنك تريد تقليل أثر إعادة التصيير إلى أدنى حد، استخدم `React.memo` لإنشاء حدود للتصيير:

```typescript
// ✅ Memo prevents unnecessary re-renders of expensive components
const ExpensiveWidget = memo(function ExpensiveWidget({
  data,
  onAction,
}: {
  data: WidgetData;
  onAction: () => void;
}) {
  // This component only re-renders when data or onAction changes
  return <ComplexVisualization data={data} />;
});

function Dashboard() {
  const [sharedCounter, setSharedCounter] = useState(0);
  const [widgetData, setWidgetData] = useState(null);

  const handleAction = useCallback(() => {
    // Stable callback prevents ExpensiveWidget re-renders
    console.log('Action performed');
  }, []);

  return (
    <div>
      <button onClick={() => setSharedCounter((c) => c + 1)}>Count: {sharedCounter}</button>
      <ExpensiveWidget data={widgetData} onAction={handleAction} />
    </div>
  );
}
```

## معمارية حالة من الواقع

إليك كيف يمكنك هيكلة الحالة في تطبيق واقعي:

```typescript
// ✅ Thoughtful state architecture
function App() {
  // Global app state - truly shared across the app
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <ConnectionStatus isOnline={isOnline} />
      </Router>
    </UserContext.Provider>
  );
}

function Dashboard() {
  // Page-level state - shared within this page
  const [selectedDateRange, setSelectedDateRange] = useState('week');

  return (
    <div>
      <DateRangePicker value={selectedDateRange} onChange={setSelectedDateRange} />
      <MetricsGrid dateRange={selectedDateRange} />
      <ActivityFeed /> {/* Manages its own state independently */}
    </div>
  );
}

const MetricsGrid = memo(function MetricsGrid({ dateRange }: { dateRange: string }) {
  // Component-level state - local to this component tree
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch when dateRange changes
    loadMetrics(dateRange).then(setMetrics);
  }, [dateRange]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
});
```

## أنماط مضادة شائعة ينبغي تجنّبها

### فخّ «منع تمرير الخصائص المتشعّب»

مجرّد رغبتك في تجنّب تمرير الخصائص المتشعّب لا يعني أنه ينبغي لك رفع الحالة إلى المستوى الأعلى. فكّر بدلًا من ذلك في Context أو مكتبة إدارة حالة:

```typescript
// ❌ Lifting state too high to avoid props drilling
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <Layout theme={theme}>
      <Header theme={theme} />
      <Sidebar theme={theme} />
      <MainContent theme={theme}>
        <Dashboard theme={theme}>
          <Widget theme={theme} /> {/* This is getting ridiculous */}
        </Dashboard>
      </MainContent>
    </Layout>
  );
}

// ✅ Use Context for truly global concerns
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout>
        <Header />
        <Sidebar />
        <MainContent>
          <Dashboard>
            <Widget /> {/* Can access theme via useContext */}
          </Dashboard>
        </MainContent>
      </Layout>
    </ThemeContext.Provider>
  );
}
```

### مغالطة «التحوّط للمستقبل»

لا ترفع الحالة «تحسّبًا» لأنك قد تحتاجها لاحقًا. ينطبق مبدأ YAGNI (لن تحتاج إليه) على معمارية الحالة أيضًا:

```typescript
// ❌ Premature state lifting
function UserProfile() {
  const [userPreferences, setUserPreferences] = useState({});
  const [profileData, setProfileData] = useState({});
  const [accountSettings, setAccountSettings] = useState({});

  // Only one component uses each piece of state...

  return (
    <div>
      <PersonalInfo data={profileData} />
      <PreferencesPanel preferences={userPreferences} />
      <AccountSettings settings={accountSettings} />
    </div>
  );
}

// ✅ Let each section manage its own state until sharing is needed
function UserProfile() {
  return (
    <div>
      <PersonalInfo /> {/* Loads and manages its own data */}
      <PreferencesPanel /> {/* Loads and manages its own data */}
      <AccountSettings /> {/* Loads and manages its own data */}
    </div>
  );
}
```

## قياس الأثر

عندما تتردّد في رفع الحالة، قِس أداء تطبيقك. فبإمكان أداة Profiler في React DevTools أن تُظهر لك أيّ المكوّنات يُعاد تصييرها ولماذا:

1. **قبل الرفع**: افحص أداء تطبيقك الحالي
2. **بعد الرفع**: افحص الأداء مجددًا وقارن
3. **ابحث عن**: عمليات إعادة تصيير غير ضرورية في مكوّنات لا علاقة لها بالأمر
4. **حسّن**: أضف حدود `memo` أو أعد النظر في موضع الحالة

> **نصيحة**
>
> ليست عمليات إعادة التصيير غير الضرورية القليلة مشكلة دائمًا — فـ React سريعة جدًا. ركّز على التي تسبّب تأخّرًا ملحوظًا أو حسابات مكلفة.
