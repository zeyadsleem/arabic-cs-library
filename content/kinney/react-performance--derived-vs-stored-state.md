---
title: "الحالة المشتقّة مقابل الحالة المخزّنة (Derived vs Stored State)"
lang: ar
source: "https://stevekinney.com/courses/react-performance/derived-vs-stored-state"
---

غالبًا ما تبدو إدارة الحالة في React كموازنة بين «خزّن كل شيء» و«احسب كل شيء». لكن إليك الحقيقة — يميل معظم المطوّرين أكثر مما ينبغي إلى تخزين الحالة حين ينبغي لهم اشتقاقها. فعندما تخزّن حالة زائدة يمكن حسابها من قيم أخرى، فأنت تسجّل نفسك في أخطاء المزامنة، واستهلاك ذاكرة إضافي، وإعادات تصيير غير ضرورية. لنستكشف متى تخزّن الحالة ومتى تشتقّها، وكيف يمكن للاختيار الصحيح أن يحسّن أداء تطبيقك وموثوقيته جذريًا.

والقاعدة الذهبية؟ **خزّن الحد الأدنى من الحالة اللازمة، ثم اشتقّ كل ما عداها.** فكّر في الأمر كمخطط قاعدة بيانات محكم التصميم — تُطبّع بياناتك لإزالة التكرار، ثم تستخدم الاستعلامات (أو الحسابات في حالة React) للحصول على العروض التي تحتاجها.

## مشكلة الإفراط في تخزين الحالة

لنبدأ بنمط مضاد شائع. تخيّل أنك تبني مكوّن سلة تسوّق يحتاج إلى عرض العناصر والسعر الإجمالي وعدد العناصر:

```typescript
// ❌ Storing too much state
function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const addItem = (item: CartItem) => {
    const newItems = [...items, item];
    setItems(newItems);
    setTotal(newItems.reduce((sum, i) => sum + i.price, 0));
    setItemCount(newItems.length);
  };

  // ... more methods that need to keep everything in sync
}
```

لهذا النهج مشكلات عدة:

1. **أخطاء المزامنة**: إذا نسيت تحديث `total` أو `itemCount` في أي تابع، تصبح واجهتك غير متسقة
2. **إعادات تصيير إضافية**: كل نداء `setState` يُطلق إعادة تصيير، فإضافة عنصر واحد تسبّب ثلاث إعادات تصيير
3. **حمل ذاكرة إضافي**: تخزّن بيانات كان يمكن حسابها عند الطلب
4. **شيفرة هشّة**: كلما أضفت قيمة محسوبة جديدة، تحتاج إلى تذكّر تحديثها في كل مكان

## الحل: الحالة المشتقّة

إليك المكوّن نفسه باستخدام الحالة المشتقّة:

```typescript
// ✅ Store minimal state, derive the rest
function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Derive everything else from the single source of truth
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
    // That's it! No need to manually update derived values
  };

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total.toFixed(2)}</p>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

الآن لديك مصدر حقيقة واحد (`items`)، وكل ما عداه يُحسب منه. لا أخطاء مزامنة، وإعادات تصيير أقل، وشيفرة أبسط بكثير في الصيانة.

## متى تخزّن ومتى تشتقّ

إليك إطارًا عمليًا لاتخاذ القرار:

### خزّن الحالة عندما:

- **تكون مدخلًا من المستخدم**: حقول النموذج، والمفاتيح، والاختيارات
- **تُجلب من مصادر خارجية**: استجابات API، وبيانات التخزين المحلي
- **تمثّل قطعة مميزة من حالة التطبيق**: المستخدم الحالي، والتبويب النشط، وفتح النافذة المنبثقة أو إغلاقها
- **يكون حسابها مكلفًا**: حسابات معقّدة تضرّ بالأداء لو نُفّذت في كل تصيير

### اشتقّ الحالة عندما:

- **يمكن حسابها من حالة موجودة**: المجاميع، والأعداد، والقوائم المفلترة
- **تكون تحويلًا لبيانات موجودة**: تواريخ منسّقة، ونصوص بأحرف كبيرة، ونتائج تحقّق
- **تكون شرطًا منطقيًا**: «هل النموذج صالح؟»، «هل كل العناصر محدّدة؟»
- **يكون الحساب رخيصًا**: رياضيات بسيطة، وعمليات مصفوفات، ومعالجة نصوص

## مثال من الواقع: إدارة المستخدمين

لننظر إلى مثال أكثر واقعية — واجهة إدارة مستخدمين تعرض المستخدمين مع الفلترة والترتيب:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  lastLogin: Date;
  isActive: boolean;
}

// ✅ Storing only what we need, deriving the rest
function UserManagement() {
  // Stored state - the minimal set we need
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<keyof User>('name');

  // Derived state - computed from the stored state
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  });

  const activeUserCount = users.filter((user) => user.isActive).length;
  const adminCount = users.filter((user) => user.role === 'admin').length;

  return (
    <div>
      <div className="stats">
        <span>Total Users: {users.length}</span>
        <span>Active: {activeUserCount}</span>
        <span>Admins: {adminCount}</span>
        <span>Showing: {sortedUsers.length}</span>
      </div>

      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <UserList users={sortedUsers} />
    </div>
  );
}
```

لاحظ أننا لا نخزّن إلا الحالة الجوهرية:

- `users`: البيانات المصدر
- `searchQuery`: مدخل المستخدم للفلترة
- `selectedRole`: اختيار المستخدم للفلترة
- `sortBy`: تفضيل المستخدم للترتيب

وكل ما عدا ذلك يُشتقّ في كل تصيير. وهذا يبقي مكوّننا بسيطًا ويزيل مشكلات المزامنة.

## اعتبارات الأداء مع `useMemo`

قد تكون حسابات الحالة المشتقّة مكلفة أحيانًا. وهنا يأتي دور `useMemo`:

```typescript
function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Expensive filtering operation - memoize it
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Imagine this involves complex logic or API calls
      const matchesSearch = performExpensiveSearchMatch(user, searchQuery);
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, selectedRole]);

  // Cheap computation - no need to memoize
  const userCount = users.length;
  const activeCount = users.filter((user) => user.isActive).length;

  return (
    <div>
      <p>
        Filtered: {filteredUsers.length} of {userCount}
      </p>
      <p>Active: {activeCount}</p>
      {/* ... */}
    </div>
  );
}
```

> **نصيحة**
>
> لا تسارع إلى `useMemo`. قِس الأداء أولًا ثم حسّن. فمعظم الحسابات في تطبيقات React النموذجية سريعة بما يكفي للتنفيذ في كل تصيير.

## أنماط ومزالق شائعة

### نمط: التحقّق من النموذج

```typescript
// ✅ Good: Derive validation state
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Derived validation state
  const isNameValid = name.length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isMessageValid = message.length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={isNameValid ? '' : 'error'}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={isEmailValid ? '' : 'error'}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={isMessageValid ? '' : 'error'}
      />
      <button type="submit" disabled={!isFormValid}>
        Send Message
      </button>
    </form>
  );
}
```

### نمط مضاد: تخزين القيم المحسوبة

```typescript
// ❌ Bad: Storing what should be derived
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);

    // Now you have to remember to update these derived values!
    setDiscountedProducts(newProducts.filter((p) => p.discount > 0));
    setTotalValue(newProducts.reduce((sum, p) => sum + p.price, 0));
  };

  // What happens if you forget to update derived state in removeProduct?
  // Your UI becomes inconsistent!
}
```

### نمط: التصيير الشرطي

```typescript
// ✅ Good: Derive UI state
function Dashboard({ user }: { user: User }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Derive UI state from stored data
  const hasUnreadNotifications = notifications.some((n) => !n.read);
  const overdueTasks = tasks.filter((task) => task.dueDate < new Date() && !task.completed);
  const showUrgentAlert = overdueTasks.length > 0;
  const greetingMessage = `Good ${getTimeOfDay()}, ${user.name}!`;

  return (
    <div>
      <header>
        <h1>{greetingMessage}</h1>
        <NotificationBell hasUnread={hasUnreadNotifications} />
      </header>

      {showUrgentAlert && (
        <Alert type="warning">You have {overdueTasks.length} overdue tasks!</Alert>
      )}

      {/* ... */}
    </div>
  );
}
```

## متقدّم: خُطّافات مخصّصة للحالة المشتقّة

لمنطق الحالة المشتقّة المعقّد، فكّر في استخراجه إلى خُطّافات مخصّصة:

```typescript
function useFilteredAndSortedData<T>(data: T[], filterFn: (item: T) => boolean, sortKey: keyof T) {
  return useMemo(() => {
    const filtered = data.filter(filterFn);
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    });
  }, [data, filterFn, sortKey]);
}

function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<keyof Product>('name');

  const filteredProducts = useFilteredAndSortedData(
    products,
    (product) => category === 'all' || product.category === category,
    sortBy,
  );

  return (
    <div>
      <CategoryFilter value={category} onChange={setCategory} />
      <SortControls value={sortBy} onChange={setSortBy} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

## مقايضات الأداء

### اشتقاق الحالة (المزايا والعيوب)

**المزايا:**

- مصدر حقيقة واحد يزيل أخطاء المزامنة
- تحديثات حالة أقل تعني إعادات تصيير أقل
- استهلاك ذاكرة أقل
- شيفرة أبسط وأكثر قابلية للصيانة

**العيوب:**

- الحساب يحدث في كل تصيير
- قد يكون مكلفًا في الحسابات المعقّدة
- لا تحكّم في توقيت حدوث الحساب

### تخزين الحالة المحسوبة (المزايا والعيوب)

**المزايا:**

- تحكّم في توقيت تشغيل الحسابات المكلفة
- يمكن تحسينه بتقنيات مثل تهدئة التكرار (debouncing)
- وصول فوري إلى القيم المحسوبة

**العيوب:**

- خطر أخطاء المزامنة
- شيفرة أكثر تعقيدًا في الصيانة
- استهلاك ذاكرة أعلى
- إعادات تصيير أكثر بسبب تحديثات حالة متعددة

## إرشادات للتطبيقات الواقعية

1. **ابدأ بالحالة المشتقّة افتراضيًا**. ولا تنتقل إلى الحالة المخزّنة إلا عندما تواجه مشكلة أداء.
2. **قِس الأداء قبل التحسين**. فمعظم الحسابات سريعة بما يكفي للتنفيذ في كل تصيير.
3. **استخدم `useMemo` للحسابات المكلفة**، لكن لا تُكثر من استخدامه — فله حمل خاص به.
4. **ضع تجربة المستخدم في الحسبان**. فقد يكون تأخّر حساب طفيف أفضل من خطأ مزامنة يعرض بيانات خاطئة.
5. **اختبر إدارة حالتك**. اكتب اختبارات تتحقّق من بقاء قيمك المحسوبة متزامنة مع حالتك المخزّنة.
