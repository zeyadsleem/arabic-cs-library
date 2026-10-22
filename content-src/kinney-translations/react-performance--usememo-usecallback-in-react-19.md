---
title: "استخدام useMemo وuseCallback"
---

إنّ `useMemo` و`useCallback` في React خُطّافا تحسين للأداء — مع التركيز على كلمة *التحسين*. فهما ليسا حلًّا سحريًا يجعل تطبيقك سريعًا، بل أداتان جراحيتان لمعالجة اختناقات أداء محددة. ومع تحسينات المترجم (compiler) في React 19 وسلوكه الافتراضي الأفضل، يصبح فهم متى وكيف تستخدم هذين الخُطّافين أكثر إلحاحًا (ولحسن الحظ، أقل تكرارًا).

في هذا الدليل، سنستكشف متى يفيد حفظ النتائج فعلًا، ومتى يضرّ، وكيف يغيّر React 19 قواعد اللعبة. وبحلول النهاية، ستعرف تمامًا متى تلجأ إلى هذين الخُطّافين ومتى تترك تحسينات React المدمجة تقوم بالعمل الشاق.

## ما الذي يحلّه حفظ النتائج فعلًا

قبل الغوص في الخُطّافين أنفسهما، لنوضّح المشكلات التي يعالجها حفظ النتائج في React:

1. **الحسابات المكلفة**: عندما يُعاد تصيير مكوّن، تُعاد أي حسابات مكلفة داخل دالة التصيير — حتى لو لم تتغيّر المدخلات.
2. **مشكلات تساوي المراجع**: الكائنات والدوال الجديدة التي تُنشأ في كل تصيير قد تُسبّب إعادة تصيير غير ضرورية في المكوّنات الأبناء التي تعتمد على تساوي المراجع.
3. **استقرار الاعتمادات**: خُطّافات مثل `useEffect` تعتمد على تساوي المراجع لتحديد موعد إعادة التشغيل.

فكّر في حفظ النتائج كالتخزين المؤقت — فأنت تخزّن نتيجة وتعيد استخدامها حتى تتغيّر المدخلات. لكنه، مثل كل ذاكرات التخزين المؤقت، يأتي بتكلفة إضافية.

> **تحذير**
>
> حفظ النتائج ليس مجانيًا. فكل قيمة محفوظة تحتاج إلى ذاكرة لتخزينها ومنطق مقارنة لفحص الاعتمادات. لا تلجأ إلى حفظ النتائج إلا إذا كنت تعالج مشكلة أداء حقيقية.

## `useMemo`: تخزين الحسابات المكلفة مؤقتًا

يخزّن `useMemo` نتيجة عملية حسابية، ولا يعيد حسابها إلا عندما تتغيّر اعتماداته.

### النمط الأساسي

```typescript
import { useMemo } from 'react';

function ExpensiveComponent({ items, searchTerm }: Props) {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...'); // This should only run when dependencies change
    return items
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm]);

  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

لولا `useMemo`، لجرى هذا الترشيح والترتيب في كل تصيير — حتى لو لم يتغيّر `items` و`searchTerm`. ومع وجود آلاف العناصر، يكون ذلك إسرافًا.

### متى يفيد `useMemo` فعلًا

هذه هي الحالات التي يقدّم فيها `useMemo` قيمة حقيقية:

**1. العمليات المكلفة حسابيًا**

```typescript
function DataAnalyzer({ dataset }: { dataset: number[] }) {
  // ✅ Good: Expensive statistical calculation
  const statistics = useMemo(() => {
    const sorted = [...dataset].sort((a, b) => a - b);
    const mean = dataset.reduce((sum, n) => sum + n, 0) / dataset.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const standardDeviation = Math.sqrt(
      dataset.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / dataset.length,
    );

    return { mean, median, standardDeviation };
  }, [dataset]);

  return <div>{/* Render statistics */}</div>;
}
```

**2. تحويلات البيانات المعقّدة**

```typescript
function UserList({ users, filters }: Props) {
  // ✅ Good: Complex filtering and transformation
  const processedUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (filters.department && user.department !== filters.department) return false;
        if (filters.active !== undefined && user.active !== filters.active) return false;
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .map((user) => ({
        ...user,
        displayName: `${user.name} (${user.department})`,
        initials: user.name
          .split(' ')
          .map((part) => part[0])
          .join(''),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, filters]);

  return <div>{/* Render processed users */}</div>;
}
```

**3. تثبيت مراجع الكائنات للمكوّنات الأبناء**

```typescript
interface ChartConfig {
  type: 'line' | 'bar';
  colors: string[];
  animations: boolean;
}

function Dashboard({ data, chartType }: Props) {
  // ✅ Good: Prevents unnecessary re-renders of expensive Chart component
  const chartConfig: ChartConfig = useMemo(
    () => ({
      type: chartType,
      colors: ['#ff6384', '#36a2eb', '#ffce56'],
      animations: true,
    }),
    [chartType],
  );

  return <ExpensiveChart data={data} config={chartConfig} />;
}

const ExpensiveChart = React.memo(({ data, config }: ChartProps) => {
  // Expensive rendering logic here
  console.log('Chart re-rendering'); // Should only log when data or config changes
  return <div>{/* Complex chart rendering */}</div>;
});
```

### متى لا يفيد `useMemo` (وقد يضرّ)

**1. الحسابات البسيطة**

```typescript
function UserCard({ user }: { user: User }) {
  // ❌ Bad: The memoization overhead exceeds the computation cost
  const displayName = useMemo(() => {
    return `${user.firstName} ${user.lastName}`;
  }, [user.firstName, user.lastName]);

  // ✅ Better: Just do it inline
  const displayName = `${user.firstName} ${user.lastName}`;
}
```

**2. الاعتمادات التي تتغيّر دائمًا**

```typescript
function Timer() {
  const [time, setTime] = useState(Date.now());

  // ❌ Bad: time changes constantly, so memoization never helps
  const formattedTime = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(time));
  }, [time]);

  // ✅ Better: Just format it directly
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(time));
}
```

**3. القيم الأولية**

```typescript
function Counter({ count }: { count: number }) {
  // ❌ Bad: Primitives are already "memoized" by reference
  const doubled = useMemo(() => count * 2, [count]);

  // ✅ Better: Direct calculation
  const doubled = count * 2;
}
```

## `useCallback`: تثبيت مراجع الدوال

يحفظ `useCallback` تعريف دالة — لا نتيجتها. وهذا مفيد بالأساس لمنع إعادة التصيير غير الضرورية في المكوّنات الأبناء التي تعتمد على تساوي مراجع الدوال.

### النمط الأساسي

```typescript
function TodoList({ todos }: { todos: Todo[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Function reference stays stable unless editingId changes
  const handleToggleEdit = useCallback((id: string) => {
    setEditingId((current) => (current === id ? null : id));
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleEdit={handleToggleEdit}
          isEditing={editingId === todo.id}
        />
      ))}
    </div>
  );
}

const TodoItem = React.memo(({ todo, onToggleEdit, isEditing }: TodoItemProps) => {
  console.log(`Rendering TodoItem ${todo.id}`); // Should minimize logs

  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => onToggleEdit(todo.id)}>{isEditing ? 'Cancel' : 'Edit'}</button>
    </div>
  );
});
```

لولا `useCallback`، لكان `handleToggleEdit` دالة جديدة في كل تصيير، ما يؤدي إلى إعادة تصيير جميع مكوّنات `TodoItem` حتى عندما لا تتغيّر خاصية `todo` الخاصة بها.

### أنماط `useCallback` الواقعية

**1. معالجات الأحداث للمكوّنات المحفوظة**

```typescript
function UserManagement({ users }: { users: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  // ✅ Stable function reference prevents unnecessary re-renders
  const handleUserSelect = useCallback((userId: string, selected: boolean) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(userId);
      } else {
        newSet.delete(userId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedUsers(new Set(users.map((u) => u.id)));
  }, [users]);

  return (
    <div>
      <button onClick={handleSelectAll}>Select All</button>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          selected={selectedUsers.has(user.id)}
          onSelect={handleUserSelect}
        />
      ))}
    </div>
  );
}
```

**2. دوال الاستدعاء (callbacks) ذات الاعتمادات الخارجية**

```typescript
function SearchResults({ searchTerm, onResultClick }: Props) {
  const [results, setResults] = useState<SearchResult[]>([]);

  // ✅ Function depends on searchTerm, so it's included in dependencies
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      // Log the search context with the click
      analytics.track('search_result_clicked', {
        searchTerm,
        resultId: result.id,
        resultType: result.type,
      });

      onResultClick(result);
    },
    [searchTerm, onResultClick],
  );

  return (
    <div>
      {results.map((result) => (
        <ResultCard key={result.id} result={result} onClick={handleResultClick} />
      ))}
    </div>
  );
}
```

### متى يصبح `useCallback` بلا جدوى

**1. لا توجد مكوّنات أبناء محفوظة**

```typescript
function BadExample({ items }: { items: Item[] }) {
  // ❌ Bad: No memoized children, so stable reference doesn't matter
  const handleClick = useCallback((id: string) => {
    console.log(`Clicked ${id}`);
  }, []);

  return (
    <div>
      {items.map((item) => (
        // Non-memoized component will re-render anyway
        <ItemCard key={item.id} item={item} onClick={() => handleClick(item.id)} />
      ))}
    </div>
  );
}
```

**2. الدوال التي تتغيّر دائمًا**

```typescript
function BadCounter() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // ❌ Bad: Dependencies change frequently, negating memoization benefits
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + multiplier);
    console.log(`New count will be: ${count + multiplier}`);
  }, [count, multiplier]); // Both values change often!
}
```

## React 19: نقطة التحوّل

يقدّم React 19 تغييرات جوهرية تؤثّر في متى تحتاج إلى هذين الخُطّافين:

### تحسينات مترجم React

يستطيع مترجم React في الإصدار 19 أن يحسّن تلقائيًا حالات كثيرة كنت تحتاج فيها سابقًا إلى حفظ النتائج يدويًا:

```typescript
// React 19 can optimize this automatically
function AutoOptimized({ items, filter }: Props) {
  // The compiler may automatically memoize this transformation
  const filteredItems = items
    .filter((item) => item.category === filter)
    .sort((a, b) => a.name.localeCompare(b.name));

  // The compiler may automatically stabilize this function reference
  const handleItemClick = (id: string) => {
    console.log(`Clicked item ${id}`);
  };

  return (
    <div>
      {filteredItems.map((item) => (
        <ItemCard key={item.id} item={item} onClick={() => handleItemClick(item.id)} />
      ))}
    </div>
  );
}
```

### متى لا يزال الحفظ اليدوي مفيدًا

حتى مع تحسينات React 19، يبقى حفظ النتائج اليدوي قيّمًا في حالات محددة:

**1. الحدود بين المكوّنات التي لا يراها المترجم**

```typescript
// ✅ Still valuable: External API calls or complex integrations
function WeatherWidget({ location }: { location: string }) {
  const weatherData = useMemo(() => {
    // Complex weather calculation that the compiler can't optimize
    return calculateWeatherMetrics(location);
  }, [location]);

  return <div>{/* weather display */}</div>;
}
```

**2. تكاملات مكتبات الطرف الثالث المكلفة**

```typescript
function ChartComponent({ data }: { data: ChartData }) {
  // ✅ Still needed: Third-party library optimizations
  const chartOptions = useMemo(() => {
    return expensiveChartLibrary.generateConfig(data);
  }, [data]);

  return <ExpensiveChart options={chartOptions} />;
}
```

## قياس أثر الأداء

قبل إضافة حفظ النتائج، قِس أثر الأداء. ويُعدّ React DevTools Profiler أفضل صديق لك هنا:

```typescript
function ProfiledComponent({ data }: Props) {
  // Add console.time to measure expensive operations
  console.time('data-processing');

  const processedData = useMemo(() => {
    const result = expensiveDataProcessing(data);
    console.timeEnd('data-processing');
    return result;
  }, [data]);

  return <div>{/* component content */}</div>;
}
```

> **نصيحة**
>
> استخدم React DevTools Profiler لتسجيل أزمنة تصيير المكوّنات قبل إضافة حفظ النتائج وبعده. إذا كان التحسّن ضئيلًا (< 16ms لـ 60fps)، فتخطَّ حفظ النتائج.

## أفضل الممارسات والإرشادات

### شجرة قرار حفظ النتائج

1. **هل الحساب مكلف فعلًا؟** (> 5ms باستمرار) إن كان لا: لا تلجأ إلى الحفظ، وإن كان نعم: تابع
   - إن كان لا: لا تلجأ إلى الحفظ
   - وإن كان نعم: تابع
2. **هل تتغيّر الاعتمادات بشكل متكرر؟** إن كان نعم: لن يفيد الحفظ كثيرًا، وإن كان لا: تابع
   - إن كان نعم: لن يفيد الحفظ كثيرًا
   - وإن كان لا: تابع
3. **هل تعالج مشكلة أداء حقيقية؟** إن كان لا: لا تُحسّن قبل الأوان، وإن كان نعم: احفظ النتائج
   - إن كان لا: لا تُحسّن قبل الأوان
   - وإن كان نعم: احفظ النتائج

### أفضل ممارسات مصفوفة الاعتمادات

```typescript
function GoodExample({ user, settings }: Props) {
  // ✅ Good: All dependencies included
  const userPreferences = useMemo(() => {
    return {
      theme: settings.theme,
      language: user.preferredLanguage,
      notifications: settings.notifications && user.allowNotifications,
    };
  }, [settings.theme, settings.notifications, user.preferredLanguage, user.allowNotifications]);

  // ✅ Good: No dependencies needed (uses setter function)
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);
}
```

### المزالق الشائعة

**1. الاعتمادات الناقصة**

```typescript
function BuggyComponent({ items, filter }: Props) {
  const [sortOrder, setSortOrder] = useState('asc');

  // ❌ Bug: Missing sortOrder in dependencies
  const sortedItems = useMemo(() => {
    return items
      .filter((item) => item.type === filter)
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
  }, [items, filter]); // Missing sortOrder!
}
```

**2. الكائنات كاعتمادات**

```typescript
function TrickyComponent({ config }: { config: Config }) {
  // ❌ Potentially problematic: config object might be new every render
  const processedData = useMemo(() => {
    return processData(config);
  }, [config]);

  // ✅ Better: Depend on specific properties
  const processedData = useMemo(() => {
    return processData(config);
  }, [config.apiUrl, config.timeout, config.retries]);
}
```

## اختبار المكوّنات المحفوظة

تتطلّب المكوّنات المحفوظة اعتبارات خاصة عند اختبارها:

```typescript
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

describe('MemoizedComponent', () => {
  it('should not recalculate when irrelevant props change', () => {
    const expensiveCalculation = vi.fn(() => 'calculated result');

    function TestComponent({ data, irrelevantProp }: Props) {
      const result = useMemo(() => expensiveCalculation(data), [data]);
      return <div>{result}</div>;
    }

    const { rerender } = render(<TestComponent data="test" irrelevantProp="value1" />);

    expect(expensiveCalculation).toHaveBeenCalledTimes(1);

    // Re-render with different irrelevant prop
    rerender(<TestComponent data="test" irrelevantProp="value2" />);

    // Should not call expensive calculation again
    expect(expensiveCalculation).toHaveBeenCalledTimes(1);
  });
});
```

## متى لا تقلق بشأن حفظ النتائج

تعني تحسينات React 19 أنه يمكنك غالبًا تخطّي التحسين اليدوي في هذه الحالات:

- مكوّنات بسيطة بحسابات ضئيلة
- مكوّنات لا يُعاد تصييرها إلا نادرًا
- نُسخ التطوير (ركّز على أداء نسخة الإنتاج)
- القوائم الصغيرة (أقل من 100 عنصر عادةً)
- التطبيقات التي لا تعاني مشكلات أداء

تذكّر: **التحسين قبل الأوان أصل كل الشرور**. ابدأ بشيفرة نظيفة ومقروءة. وأضف حفظ النتائج عندما تواجه مشكلات أداء فعلية، لا مشكلات متخيَّلة.

## الخلاصة
