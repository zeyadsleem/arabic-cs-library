---
title: "استقرار هوية الخصائص"
lang: ar
source: "https://stevekinney.com/courses/react-performance/identity-stability-props"
---

يقوم نموذج أداء React على مقارنة القيم لتحديد متى تحتاج المكوّنات إلى إعادة التصيير. وعندما تمرّر كائنات أو مصفوفات أو دوال كخصائص، فإن **هويتها** — لا محتواها فقط — هي ما يحدّد ما إذا كان React يعتبرها «الشيء نفسه». فإن أخطأت في ذلك، أطلقت إعادات تصيير غير ضرورية قد تنتشر عبر شجرة مكوّناتك. وإن أحسنت، بقي تطبيقك سريع الاستجابة حتى مع نموّه.

والجزء الصعب ليس فهم المفهوم (تساوي المراجع مقابل التساوي العميق)، بل معرفة متى يهمّ فعلًا وكيف تصلحه دون إفراط في هندسة شيفرتك باستخدام `useMemo` و`useCallback` في كل مكان.

## متى تهمّ الهوية فعلًا

ليست كل مرجع غير مستقر يسبّب مشكلات أداء. فReact سريع جدًا في إعادة تصيير المكوّنات التي لم تتغيّر فعلًا. لكن استقرار الهوية يصبح حاسمًا في حالات محددة قليلة:

### المكوّنات المحفوظة ذات الخصائص الكائنية

عندما تلفّ مكوّنًا بـ `React.memo()`، فإنه يجري مقارنة سطحية للخصائص. وإذا مرّرت مرجع كائن جديدًا في كل تصيير — حتى بمحتوى مطابق — يفشل الحفظ.

```typescript
// ❌ This will re-render every time, despite React.memo
const ExpensiveList = React.memo(
  ({ items, config }: { items: string[]; config: { sortBy: string; filterBy: string } }) => {
    console.log('Rendering expensive list...');
    return (
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  },
);

function App() {
  const [count, setCount] = useState(0);
  const items = ['apple', 'banana', 'cherry'];

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      {/* New config object created every render! */}
      <ExpensiveList items={items} config={{ sortBy: 'name', filterBy: 'all' }} />
    </div>
  );
}
```

### اعتمادات `useEffect`

المراجع غير المستقرة في مصفوفات الاعتمادات تجعل التأثيرات تعمل في كل تصيير، حتى عندما لا تتغيّر البيانات الفعلية:

```typescript
// ❌ Effect runs on every render
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData(userId, {
      fields: ['name', 'email', 'avatar'],
      cache: true,
    }).then(setUser);
  }, [userId, { fields: ['name', 'email', 'avatar'], cache: true }]);
  //           ^^^^ New object every render!

  return <div>{user?.name}</div>;
}
```

### قيم السياق

ولعلّها أخطر حالة — فعندما تتغيّر هوية قيم السياق (context)، يُعاد تصيير كل مستهلك:

```typescript
// ❌ All consumers re-render when App re-renders
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        user,
        updateUser: (data) => setUser((prev) => ({ ...prev, ...data })),
      }}
    >
      <Dashboard />
    </AppContext.Provider>
  );
}
```

## تشريح المراجع غير المستقرة

لنستعرض أكثر الطرق شيوعًا التي ينشئ بها المطوّرون مراجع جديدة عن غير قصد:

### كائنات حرفية مضمّنة

في كل مرة تكتب `{}` في JSX، فأنت تنشئ كائنًا جديدًا:

```typescript
// ❌ New object every render
<Component config={{ theme: 'dark', timeout: 5000 }} />;

// ✅ Stable reference
const config = { theme: 'dark', timeout: 5000 };
<Component config={config} />;

// ✅ Or memoize if it depends on props/state
const config = useMemo(
  () => ({
    theme: currentTheme,
    timeout: 5000,
  }),
  [currentTheme],
);
```

### توابع المصفوفات التي تعيد مصفوفات جديدة

عمليات مثل `.filter()` و`.map()` و`.slice()` تعيد دائمًا مصفوفات جديدة، حتى لو كان المحتوى مطابقًا:

```typescript
function TodoList({ todos }: { todos: Todo[] }) {
  // ❌ Creates new array every render, even if no todos are completed
  const completedTodos = todos.filter((todo) => todo.completed);

  // ✅ Memoize when the operation might be expensive or affects children
  const completedTodos = useMemo(() => todos.filter((todo) => todo.completed), [todos]);

  return <ExpensiveCompletedList todos={completedTodos} />;
}
```

### تعريفات الدوال

الدوال المعرّفة داخل المكوّنات يُعاد إنشاؤها في كل تصيير:

```typescript
// ❌ New function every render
function SearchResults({ query }: { query: string }) {
  const handleSort = (field: string) => {
    // sorting logic
  };

  return <SortableTable onSort={handleSort} />;
}

// ✅ Stable callback
function SearchResults({ query }: { query: string }) {
  const handleSort = useCallback((field: string) => {
    // sorting logic
  }, []); // No dependencies = same function every time

  return <SortableTable onSort={handleSort} />;
}
```

## استراتيجيات للحصول على هوية مستقرة

المفتاح هو تطبيق التقنية المناسبة في الوقت المناسب. وهذه هي أدواتك:

### انقل القيم الثابتة خارج المكوّنات

إذا كانت القيمة لا تتغيّر أبدًا، فعرّفها خارج المكوّن:

```typescript
// ✅ Defined once, never recreated
const DEFAULT_FILTERS = {
  category: 'all',
  sortBy: 'date',
  ascending: true,
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
  },
};

function Dashboard() {
  return (
    <div>
      <FilterPanel config={DEFAULT_FILTERS} />
      <Chart options={CHART_OPTIONS} />
    </div>
  );
}
```

### `useMemo` للحسابات المكلفة

استخدم `useMemo` عندما تقوم بعمل لا تريد تكراره فعلًا:

```typescript
function ProductGrid({ products, filters, sortBy }: Props) {
  // ✅ Only recompute when inputs change
  const filteredAndSorted = useMemo(() => {
    return products
      .filter((product) => matchesFilters(product, filters))
      .sort((a, b) => compareBy(a, b, sortBy));
  }, [products, filters, sortBy]);

  return (
    <Grid>
      {filteredAndSorted.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
```

### `useCallback` لاستقرار الدوال

استخدم `useCallback` عندما تؤثّر هوية الدالة في تصيير المكوّنات الأبناء:

```typescript
function DataTable({ data }: { data: TableRow[] }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // ✅ Function identity stable unless data changes
  const handleRowToggle = useCallback((rowId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  }, []); // No dependencies - function never changes

  return (
    <table>
      {data.map((row) => (
        <MemoizedRow
          key={row.id}
          row={row}
          isSelected={selectedRows.has(row.id)}
          onToggle={handleRowToggle}
        />
      ))}
    </table>
  );
}
```

### استخرج المكوّنات الأبناء

أحيانًا يكون الحل الأنظف هو نقل JSX المعقّد إلى مكوّنات منفصلة:

```typescript
// ❌ Recreates complex config object every render
function Dashboard({ user }: { user: User }) {
  return (
    <UserChart
      user={user}
      config={{
        showTooltips: true,
        animationDuration: 300,
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
        legend: { position: 'bottom', fontSize: 12 },
      }}
    />
  );
}

// ✅ Stable component with stable config
const CHART_CONFIG = {
  showTooltips: true,
  animationDuration: 300,
  colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  legend: { position: 'bottom' as const, fontSize: 12 },
};

function UserChartSection({ user }: { user: User }) {
  return <UserChart user={user} config={CHART_CONFIG} />;
}

function Dashboard({ user }: { user: User }) {
  return <UserChartSection user={user} />;
}
```

## أنماط قيم السياق

السياق هو المجال الذي يهمّ فيه استقرار الهوية أكثر من أي مكان آخر، لأن القيم غير المستقرة تجعل كل مستهلك يعيد التصيير. وهذه أنماط فعّالة:

### قسّم السياق حسب وتيرة التحديث

بدلًا من سياق واحد كبير، قسّم القيم التي تتغيّر بمعدّلات مختلفة:

```typescript
// ✅ Theme rarely changes - separate context
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>(null!);

// ✅ User data changes more frequently - separate context
const UserContext = createContext<{
  user: User | null;
  updateUser: (data: Partial<User>) => void;
}>(null!);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);

  // ✅ Stable theme context value
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  // ✅ Stable user context value
  const userValue = useMemo(
    () => ({
      user,
      updateUser: (data: Partial<User>) => setUser((prev) => (prev ? { ...prev, ...data } : null)),
    }),
    [user],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <Dashboard />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### استخدم المخفّضات للحالة المعقّدة

عندما يدير السياق حالة معقّدة بأنماط تحديث متعددة، توفّر المخفّضات (reducers) دوال إرسال (dispatch) مستقرة:

```typescript
type AppState = {
  user: User | null;
  settings: Settings;
  notifications: Notification[];
};

type AppAction =
  | { type: 'SET_USER'; user: User }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'ADD_NOTIFICATION'; notification: Notification };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    default:
      return state;
  }
}

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    settings: {},
    notifications: [],
  });

  // ✅ dispatch is always stable - no useMemo needed!
  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

## أنماط مضادة شائعة يجب تجنّبها

### لا تحفظ كل شيء

قد يكون العلاج أسوأ من الداء. لا تحفظ النتائج إلا عندما توجد فائدة أداء حقيقية:

```typescript
// ❌ Unnecessary memoization for simple values
const userName = useMemo(() => user?.name ?? 'Guest', [user]);
const isLoggedIn = useMemo(() => !!user, [user]);

// ✅ Simple derivations don't need memoization
const userName = user?.name ?? 'Guest';
const isLoggedIn = !!user;
```

### لا تحفظ خصائص تمرّرها فورًا إلى الأسفل

إذا كنت تمرّر قيمًا محفوظة كخصائص فقط، فقد لا تحتاج إلى الحفظ:

```typescript
// ❌ Memoizing just to pass down immediately
function Parent({ data }: { data: Item[] }) {
  const sortedData = useMemo(() => data.sort((a, b) => a.name.localeCompare(b.name)), [data]);

  return <Child data={sortedData} />;
}

// ✅ Let the child decide if it needs memoization
function Parent({ data }: { data: Item[] }) {
  return <Child data={data} />;
}

const Child = React.memo(({ data }: { data: Item[] }) => {
  const sortedData = useMemo(() => data.sort((a, b) => a.name.localeCompare(b.name)), [data]);

  return <div>{/* render sorted data */}</div>;
});
```

### لا تفرط في استخراج الاعتمادات

إدراج اعتمادات أكثر من اللازم يُبطل الغرض:

```typescript
// ❌ Too many dependencies
const expensiveValue = useMemo(() => {
  return data.filter((item) => item.category === selectedCategory);
}, [data, selectedCategory, user, theme, router]);
//     ^^^ user, theme, router don't affect the computation!

// ✅ Only include what actually matters
const expensiveValue = useMemo(() => {
  return data.filter((item) => item.category === selectedCategory);
}, [data, selectedCategory]);
```

## تصحيح مشكلات الهوية

عندما تشتبه في أن عدم استقرار الهوية يسبّب مشكلات أداء، إليك كيفية تتبّعه:

### استخدم React DevTools Profiler

يُظهر لك Profiler أي المكوّنات يُعاد تصييرها ولماذا:

1. ثبّت إضافة React DevTools في المتصفح
2. افتح تبويب Profiler
3. انقر على «Start profiling»
4. تفاعل مع تطبيقك
5. ابحث عن المكوّنات التي تُصيَّر أكثر من المتوقع

### أضف سجلات تصحيح

سجّل مؤقتًا وقت تشغيل العمليات المكلفة:

```typescript
const expensiveComputation = useMemo(() => {
  console.log('🔄 Recomputing expensive value');
  return data.reduce((acc, item) => {
    // expensive work
    return acc + item.value;
  }, 0);
}, [data]);
```

### استخدم why-did-you-render

تستطيع مكتبة [`why-did-you-render`](https://github.com/welldone-software/why-did-you-render) كشف إعادات التصيير غير الضرورية وتسجيلها تلقائيًا:

```typescript
// Install: npm install @welldone-software/why-did-you-render

// In development only:
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Then flag components you want to monitor:
const MyComponent = React.memo(() => <div>Hello</div>);
MyComponent.whyDidYouRender = true;
```

## مثال واقعي: عربة التسوّق

لنجمع كل ذلك في مثال واقعي لعربة تسوّق يعرض المشكلات والحلول معًا:

```typescript
// ❌ Problematic version with identity issues
function ShoppingApp() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addItem: (item) => setCartItems((prev) => [...prev, item]),
        removeItem: (id) => setCartItems((prev) => prev.filter((i) => i.id !== id)),
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        user,
        discounts: discounts.filter((d) => d.isActive), // New array every render!
      }}
    >
      <ShoppingCart />
    </CartContext.Provider>
  );
}
```

```typescript
// ✅ Optimized version with stable identities
type CartState = {
  items: CartItem[];
  user: User | null;
  discounts: Discount[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'SET_USER'; user: User | null }
  | { type: 'SET_DISCOUNTS'; discounts: Discount[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'SET_DISCOUNTS':
      return { ...state, discounts: action.discounts };
    default:
      return state;
  }
}

function ShoppingApp() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    user: null,
    discounts: [],
  });

  // ✅ Memoize expensive computations
  const total = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items],
  );

  const activeDiscounts = useMemo(
    () => state.discounts.filter((discount) => discount.isActive),
    [state.discounts],
  );

  // ✅ Stable context value
  const contextValue = useMemo(
    () => ({
      ...state,
      total,
      activeDiscounts,
      dispatch,
    }),
    [state, total, activeDiscounts],
  );

  return (
    <CartContext.Provider value={contextValue}>
      <ShoppingCart />
    </CartContext.Provider>
  );
}
```
