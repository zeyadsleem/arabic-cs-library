---
title: "تجنّب الإفراط في حفظ النتائج"
---

خُطّافات حفظ النتائج في React أدوات أداء قوية. لكنك، كما هو الحال مع أي أداة، قد تفرط في استخدامها تمامًا. فعندما تحفظ نتائج كل شيء «احتياطًا»، فقد تجعل تطبيقك أبطأ في الواقع. يركّز هذا الدليل على تحديد أنماط الإفراط في حفظ النتائج وتجنّبها.

للاطلاع على تفاصيل الواجهة البرمجية، راجع [useMemo وuseCallback في React 19](https://stevekinney.com/courses/react-performance/usememo-usecallback-in-react-19). وللاطلاع على حفظ نتائج المكوّنات، راجع [React.memo في React 19 وعصر المترجم](https://stevekinney.com/courses/react-performance/react-memo-react-19-and-compiler-era).

## ضريبة حفظ النتائج

في كل مرة تستخدم فيها `useMemo` أو `useCallback`، فأنت تطلب من React أن:

1. **يخزّن** المدخلات والنتيجة السابقتين في الذاكرة
2. **يقارن** المدخلات الحالية بالسابقة (باستخدام التساوي السطحي)
3. **يقرّر** ما إذا كان سيعيد النتيجة المخزّنة مؤقتًا أم يحسب نتيجة جديدة

هذا ليس مجانيًا. فأنت تقايض الذاكرة بوقت الحساب، وتضيف تكلفة مقارنة في كل تصيير. وأحيانًا تستحقّ هذه المقايضة العناء تمامًا — لكنك أحيانًا تدفع إيجارًا لذاكرة مؤقتة لم تكن بحاجة إليها أبدًا.

إليك مثالًا كلاسيكيًا على الإفراط في حفظ النتائج:

```typescript
// ❌ Unnecessary memoization
function UserProfile({ user }: { user: User }) {
  const displayName = useMemo(() => {
    return `${user.firstName} ${user.lastName}`;
  }, [user.firstName, user.lastName]);

  const handleClick = useCallback(() => {
    console.log('Profile clicked');
  }, []);

  return (
    <div onClick={handleClick}>
      <h1>{displayName}</h1>
    </div>
  );
}
```

ما الخطأ هنا؟ كلا الحفظين يكلّف أكثر مما يوفّر. فدمج النصوص سريع للغاية، ودالة `console.log` لا تعتمد على أي خصائص أو حالة. وتكلفة المقارنة تفوق أي فائدة.

```typescript
// ✅ Just let it render
function UserProfile({ user }: { user: User }) {
  const displayName = `${user.firstName} ${user.lastName}`;

  const handleClick = () => {
    console.log('Profile clicked');
  };

  return (
    <div onClick={handleClick}>
      <h1>{displayName}</h1>
    </div>
  );
}
```

## متى يفيد حفظ النتائج فعلًا

يتألّق حفظ النتائج عندما تكون لديك **حسابات مكلفة** أو عندما تحتاج إلى **استقرار المراجع** لمنع إعادات التصيير غير الضرورية في المكوّنات التابعة. وهذه هي الحالات التي يفيد فيها فعلًا:

### الحسابات المكلفة

```typescript
// ✅ Good use of useMemo
function DataAnalysis({ dataset }: { dataset: number[] }) {
  const statistics = useMemo(() => {
    // This is computationally expensive
    return {
      mean: dataset.reduce((a, b) => a + b, 0) / dataset.length,
      median: [...dataset].sort((a, b) => a - b)[Math.floor(dataset.length / 2)],
      standardDeviation: calculateStdDev(dataset), // Complex calculation
    };
  }, [dataset]);

  return <StatsDashboard stats={statistics} />;
}
```

### منع إعادة تصيير المكوّنات الأبناء

```typescript
// ✅ memo prevents unnecessary re-renders
const ExpensiveChild = memo(function ExpensiveChild({
  data,
  onUpdate,
}: {
  data: ComplexData;
  onUpdate: () => void;
}) {
  // This component does heavy rendering work
  return <ComplexVisualization data={data} onUpdate={onUpdate} />;
});

function Parent({ items, selectedId }: Props) {
  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId],
  );

  const handleUpdate = useCallback(
    () => {
      // Update logic here
    },
    [/* dependencies */],
  );

  return (
    <div>
      {/* Other content that re-renders frequently */}
      <ExpensiveChild data={selectedItem} onUpdate={handleUpdate} />
    </div>
  );
}
```

### مراجع مستقرة لاعتمادات التأثيرات

```typescript
// ✅ Prevents infinite re-renders
function DataFetcher({ userId, filters }: Props) {
  const requestConfig = useMemo(
    () => ({
      userId,
      ...filters,
      headers: { Authorization: `Bearer ${token}` },
    }),
    [userId, filters, token],
  );

  useEffect(() => {
    fetchData(requestConfig).then(setData);
  }, [requestConfig]); // Won't cause infinite loop

  return <DataDisplay data={data} />;
}
```

## النموذج الذهني: قِس الأداء قبل أن تحسّن

بدلًا من حفظ النتائج بشكل دفاعي، قِس الأداء باستراتيجية. فمحلّل الأداء (profiler) المدمج في React (أو أدوات مثل React DevTools Profiler) سيريك:

- أي المكوّنات تُصيَّر بأكبر تكرار
- كم يستغرق كل تصيير من الوقت
- ما إذا كانت المكوّنات الأبناء يُعاد تصييرها بلا داعٍ

إليك سير عمل عمليًا:

1. **ابنِ أولًا، واحفظ النتائج لاحقًا**: اجعل مكوّنك يعمل بشكل صحيح
2. **قِس المناطق المشبوهة**: استخدم React DevTools لتحديد الاختناقات الفعلية
3. **قِس قبل وبعد**: تأكّد من أن حفظ النتائج يفيد فعلًا
4. **ركّز على الأداء الذي يراه المستخدم**: المكوّن الذي يُصيَّر في 0.1ms لا يحتاج إلى تحسين

## أنماط الإفراط الشائعة في حفظ النتائج التي يجب تجنّبها

### حفظ القيم الأولية والحسابات البسيطة

```typescript
// ❌ Not worth it
const isEven = useMemo(() => count % 2 === 0, [count]);
const message = useMemo(() => `Hello ${name}`, [name]);
const isEmpty = useMemo(() => items.length === 0, [items.length]);

// ✅ Just compute them
const isEven = count % 2 === 0;
const message = `Hello ${name}`;
const isEmpty = items.length === 0;
```

### حفظ دوال لا تسبّب إعادة تصيير

```typescript
// ❌ Callback doesn't prevent any re-renders
const handleSubmit = useCallback(
  (data) => {
    onSubmit(data);
  },
  [onSubmit],
);

return <form onSubmit={handleSubmit}>/* ... */</form>;
```

إذا لم يكن النموذج ملفوفًا بـ `memo`، فتحسين دالة الاستدعاء بلا جدوى.

### حفظ كل خاصية على حدة

```typescript
// ❌ Memoization overload
function TodoList({ todos, filter, sortBy }: Props) {
  const filteredTodos = useMemo(
    () => todos.filter((todo) => todo.category === filter),
    [todos, filter],
  );

  const sortedTodos = useMemo(
    () => filteredTodos.sort((a, b) => a[sortBy].localeCompare(b[sortBy])),
    [filteredTodos, sortBy],
  );

  const todoCount = useMemo(() => sortedTodos.length, [sortedTodos]);

  const completedCount = useMemo(
    () => sortedTodos.filter((todo) => todo.completed).length,
    [sortedTodos],
  );

  // ... more memoized values
}
```

لقد أنشأت سلسلة اعتمادات تعتمد فيها كل قيمة محفوظة على القيمة السابقة لها. وغالبًا ما يكون حساب هذه القيم مباشرة أو ربطها في `useMemo` واحد أنظف وأسرع.

## استراتيجيات ذكية لحفظ النتائج

### الحفظ الانتقائي

ركّز على الأجزاء المكلفة:

```typescript
// ✅ Memoize only the expensive calculation
function ProductList({ products, searchTerm, priceRange }: Props) {
  // Filter is cheap enough to run every time
  const filteredProducts = products.filter(
    (p) => p.name.includes(searchTerm) && p.price >= priceRange.min && p.price <= priceRange.max,
  );

  // But complex sorting/grouping might be worth memoizing
  const groupedProducts = useMemo(() => {
    return groupByCategory(filteredProducts);
  }, [filteredProducts]);

  return <GroupedProductDisplay groups={groupedProducts} />;
}
```

### احفظ النتائج في المستوى الصحيح

أحيانًا لا تكون المشكلة في أنك تحفظ أكثر من اللازم، بل في أنك تحفظ في المكان الخطأ:

```typescript
// ❌ Memoizing in every instance
function TodoItem({ todo }: { todo: Todo }) {
  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat('en-US').format(todo.createdAt),
    [todo.createdAt],
  );

  return <div>{formattedDate}</div>;
}

// ✅ Memoize the formatter, not the result
const dateFormatter = new Intl.DateTimeFormat('en-US');

function TodoItem({ todo }: { todo: Todo }) {
  const formattedDate = dateFormatter.format(todo.createdAt);
  return <div>{formattedDate}</div>;
}
```

## React 19 والتحسين التلقائي

للحصول على معلومات مفصّلة عن كيفية تغيير مترجم React 19 لاحتياجات حفظ النتائج، راجع [React.memo في React 19 وعصر المترجم](https://stevekinney.com/courses/react-performance/react-memo-react-19-and-compiler-era) و[useMemo وuseCallback في React 19](https://stevekinney.com/courses/react-performance/usememo-usecallback-in-react-19).

والخلاصة الأساسية: سيتولّى مترجم React كثيرًا من التحسينات تلقائيًا، ما يقلّل الحاجة إلى الحفظ اليدوي بمرور الوقت.

## قياس الأثر

إليك طريقة بسيطة لقياس ما إذا كان حفظ النتائج يفيدك:

```typescript
function ExpensiveComponent({ data }: Props) {
  console.time('expensive-calculation');

  const result = useMemo(() => {
    const computed = performExpensiveCalculation(data);
    console.timeEnd('expensive-calculation');
    return computed;
  }, [data]);

  return <div>{result}</div>;
}
```

إذا أظهر المؤقّت باستمرار قيمًا أقل من 1-2ms، فأنت على الأرجح لا تحتاج إلى حفظ النتائج. وإذا كان يُظهر 10ms أو أكثر على الأجهزة الأبطأ، فأبقِ عليه.

## المنهج العملي

بدلًا من إضافة `useMemo` و`useCallback` في كل مكان، جرّب هذا المنهج:

1. **ابدأ ببساطة**: اكتب مكوّناتك دون أي حفظ للنتائج
2. **قِس الأداء عندما تلاحظ بطئًا**: استخدم React DevTools للعثور على مشكلات الأداء الفعلية
3. **احفظ النتائج باستراتيجية**: لا تضف الحفظ إلا حيث يُظهر القياس أنه يفيد
4. **أزِله عند الشك**: إذا لم تستطع قياس الفائدة، فأزل الحفظ

تذكّر: التحسين قبل الأوان أصل كل الشرور، لكن تجاهل مشكلات الأداء الحقيقية كذلك. والمفتاح هو إيجاد التوازن — وعادة ما يتضمّن هذا التوازن حفظًا أقل للنتائج مما قد تظن.
