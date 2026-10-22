---
title: "جدولة React المتزامنة (Concurrent Scheduling)"
---

قدّم React 18 ميزات متزامنة تغيّر جذريًا طريقة معالجة React للتحديثات. فبدلًا من حجب الخيط الرئيسي حتى يُصيّر كل مكوّن، يستطيع React الآن إيقاف العمل مؤقتًا واستئنافه — فيبقى تطبيقك مستجيبًا حتى أثناء العمليات المكلفة. والأمر لا يتعلق فقط بجعل الأمور أسرع؛ بل بجعل *الأمور الصحيحة* سريعة وبضمان ألا تبدو تفاعلات المستخدم بطيئة أبدًا.

يساعدك فهم مُجدوِل React (scheduler) على كتابة مكوّنات تتعاون مع النظام بدل مصارعته. وستتعلّم التمييز بين العمل العاجل وغير العاجل، والاستفادة من ترتيب الأولويات المدمج، وتصميم واجهات تبدو سلسة مهما كان التعقيد الجاري تحتها.

## كيف يعمل مُجدوِل React

قبل الميزات المتزامنة، كان تصيير React أشبه بطريق بمسار واحد — فبمجرد أن يبدأ React التصيير، لا يستطيع التوقّف حتى تكتمل شجرة المكوّنات بأكملها. وإن كان لديك مكوّن ثقيل يستغرق تصييره 200 مللي ثانية، تجمّدت واجهتك بأكملها طوال هذه المدة.

يقدّم مُجدوِل React المتزامن **تقسيم الزمن** (time-slicing) و**الجدولة القائمة على الأولوية**. تخيّل الأمر كترقية من طريق بمسار واحد إلى نظام مرور ذكي متعدد المسارات، له قواعد أولوية، وقدرة على إيقاف حركة الأولوية الأدنى عند حاجة مركبات الطوارئ إلى المرور.

وإليك الرؤية الجوهرية: ليست كل التحديثات سواء. فالمستخدم الذي ينقر زرًّا يتوقّع استجابة فورية، بينما يمكن أن ينتظر تحديث تصوّر بياني بضع مللي ثانية. ويستخدم المُجدوِل هذا التراتب من الأولويات:

```typescript
// From React's internal priority levels (simplified)
enum Priority {
  ImmediatePriority = 1, // User input, focus events
  UserBlockingPriority = 2, // Click handlers, form inputs
  NormalPriority = 3, // Data fetching, network requests
  LowPriority = 4, // Analytics, logging
  IdlePriority = 5, // Background cleanup tasks
}
```

يستطيع المُجدوِل مقاطعة العمل ذي الأولوية الأدنى عند وصول عمل ذي أولوية أعلى، فيبقى تطبيقك مستجيبًا لتفاعلات المستخدم.

## فهم الانتقالات (Transitions)

الطريقة العملية الأكثر نفعًا للاستفادة من مُجدوِل React هي **الانتقالات**. فالانتقال يعلّم تحديثًا بأنه غير عاجل، ما يتيح لـ React مقاطعته لأجل عمل أهم.

```typescript
import { useTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery); // Urgent: update input immediately

    startTransition(() => {
      // Non-urgent: expensive filtering can be interrupted
      const filtered = expensiveSearch(searchQuery);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <div>Searching...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

يبقي هذا النمط حقل الإدخال مستجيبًا — فيرى المستخدمون ما يكتبونه فورًا — بينما تجري عملية البحث المكلفة في الخلفية، ويمكن مقاطعتها إن واصلوا الكتابة.

## القيم المؤجَّلة للحسابات المكلفة

أحيانًا لا تتحكّم في تحديث الحالة (فلعله يأتي من مكوّن أب)، لكنك ما زلت تريد تأجيل العمل المكلف. يتيح لك `useDeferredValue` إنشاء نسخة «متأخّرة» من قيمة تتخلّف عن الركب أثناء التحديثات السريعة.

```typescript
import { useDeferredValue, useMemo } from 'react';

function ExpensiveChart({ data }: { data: number[] }) {
  const deferredData = useDeferredValue(data);

  const chartElements = useMemo(() => {
    // This expensive computation uses the deferred value
    return deferredData.map((value, index) => (
      <ChartBar key={index} value={value} />
    ));
  }, [deferredData]);

  return (
    <div>
      {/* Show a hint that data is updating */}
      {data !== deferredData && (
        <div className="opacity-50">Updating chart...</div>
      )}
      <div className="chart">{chartElements}</div>
    </div>
  );
}
```

عندما تتغيّر `data` بسرعة، يتخلّف `deferredData` عنها، فلا تُعاد حسابات الرسم البياني المكلفة مع كل ضغطة مفتاح. ويجمع React التحديثات في دفعة واحدة ويعالجها عندما يتوفّر لديه وقت فائض.

## تجنّب مزالق الجدولة الشائعة

### لا تُغلّف كل شيء بالانتقالات

الانتقالات مخصّصة للتحديثات غير العاجلة التي يمكن مقاطعتها. لا تُغلّف تفاعلات عاجلة مثل نقرات الأزرار أو إرسال النماذج:

```typescript
// ❌ Bad: Makes button feel unresponsive
function Button({ onClick }: { onClick: () => void }) {
  const [, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(onClick)}
    >
      Submit
    </button>
  );
}

// ✅ Good: Button responds immediately
function Button({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}>
      Submit
    </button>
  );
}
```

### انتبه لحدود الانتقال

لا تؤثر الانتقالات إلا في التحديثات الواقعة داخل دالة الاستدعاء الممرّرة إلى `startTransition`. أما التحديثات خارجها فتبقى عاجلة:

```typescript
// ❌ This won't work as expected
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [, startTransition] = useTransition();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery); // Still urgent!

    startTransition(() => {
      const filtered = expensiveFilter(newQuery);
      setResults(filtered); // Only this is in the transition
    });
  };
}
```

إن أردت أن يكون التحديثان معًا جزءًا من الانتقال، فأدرجهما كليهما:

```typescript
// ✅ Both updates are now non-urgent
const handleSearch = (newQuery: string) => {
  startTransition(() => {
    setQuery(newQuery);
    const filtered = expensiveFilter(newQuery);
    setResults(filtered);
  });
};
```

## أنماط جدولة واقعية

### نمط التحسين التدريجي

أظهر استجابة فورية للتحديثات العاجلة مع تأجيل العمل الثانوي المكلف:

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<User[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Urgent: Load user data immediately
    fetchUser(userId).then(setUser);

    // Non-urgent: Recommendations can wait
    startTransition(() => {
      fetchRecommendations(userId).then(setRecommendations);
    });
  }, [userId]);

  return (
    <div>
      {user ? (
        <UserCard user={user} />
      ) : (
        <UserCardSkeleton />
      )}

      {recommendations.length > 0 && (
        <RecommendationsList users={recommendations} />
      )}
    </div>
  );
}
```

### التحديثات التفاؤلية مع بديل مؤقّت

اجمع الانتقالات مع التحديثات التفاؤلية للحصول على تفاعلات سلسة:

```typescript
function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  const [isOptimistic, setIsOptimistic] = useState(false);
  const [, startTransition] = useTransition();

  const handleToggle = () => {
    setIsOptimistic(true); // Immediate visual feedback

    startTransition(() => {
      onToggle(todo.id); // The actual update can be deferred
      setIsOptimistic(false);
    });
  };

  return (
    <div
      className={`todo-item ${isOptimistic ? 'updating' : ''}`}
      onClick={handleToggle}
    >
      <Checkbox checked={todo.completed} />
      <span>{todo.text}</span>
    </div>
  );
}
```

## التعامل مع المكتبات الخارجية

ليست كل المكتبات مهيّأة للتزامن. فبعضها ينفّذ عمليات تزامنية لا يمكن مقاطعتها:

```typescript
// ❌ Problematic: Heavy synchronous work
function DataGrid({ data }: { data: any[] }) {
  const deferredData = useDeferredValue(data);

  // This heavy calculation still blocks the main thread
  const processedData = heavySyncProcessing(deferredData);

  return <Grid data={processedData} />;
}

// ✅ Better: Break work into chunks
function DataGrid({ data }: { data: any[] }) {
  const deferredData = useDeferredValue(data);
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    // Process data in chunks with yielding
    processDataInChunks(deferredData, setProcessedData);
  }, [deferredData]);

  return <Grid data={processedData} />;
}

async function processDataInChunks(data: any[], setResult: (data: any[]) => void) {
  const chunks = chunkArray(data, 100);
  const results = [];

  for (const chunk of chunks) {
    const processed = processChunk(chunk);
    results.push(...processed);

    // Yield control back to the browser
    await new Promise(resolve => setTimeout(resolve, 0));
    setResult([...results]);
  }
}
```

## مراقبة الأداء والتنقيح

يساعدك مُنمّق React DevTools على فهم سلوك انتقالاتك:

```typescript
// Add labels to make transitions easier to identify in DevTools
function SearchResults() {
  const [, startTransition] = useTransition();

  const handleSearch = (query: string) => {
    startTransition(() => {
      // This label appears in React DevTools
      React.unstable_trace('search-filtering', () => {
        const results = expensiveSearch(query);
        setResults(results);
      });
    });
  };
}
```

ويمكنك أيضًا قياس أداء الانتقالات في الإنتاج:

```typescript
import { unstable_trace } from 'react';

function trackTransitionPerformance(name: string, fn: () => void) {
  const start = performance.now();

  unstable_trace(name, () => {
    fn();

    // Log timing data to your analytics
    const duration = performance.now() - start;
    analytics.track('transition-performance', { name, duration });
  });
}
```

## متى لا تستخدم الميزات المتزامنة

ليست الميزات المتزامنة هي الجواب دائمًا. تجنّبها عندما:

- **منطق عمل حرج**: لا تؤجّل التحقق من الصحة أو الفحوص الأمنية
- **تحديثات بسيطة وسريعة**: لا تستحق الكلفة الإضافية عمليات تافهة
- **متطلبات توقيت خارجية**: بعض العمليات تحتاج تحكّمًا دقيقًا في التوقيت

```typescript
// ❌ Don't defer critical validation
function PaymentForm() {
  const [, startTransition] = useTransition();

  const handleSubmit = (data: PaymentData) => {
    startTransition(() => {
      validatePayment(data); // This should be immediate!
      submitPayment(data);
    });
  };
}

// ✅ Keep validation urgent, defer non-critical work
function PaymentForm() {
  const [, startTransition] = useTransition();

  const handleSubmit = async (data: PaymentData) => {
    const isValid = await validatePayment(data); // Urgent
    if (!isValid) return;

    await submitPayment(data); // Also urgent

    // Non-urgent: Analytics and cleanup can wait
    startTransition(() => {
      trackPaymentSuccess(data);
      clearFormCache();
    });
  };
}
```

## الخطوات التالية

تمنحك ميزات React المتزامنة تحكّمًا دقيقًا في توقيت تنفيذ العمل، لكنها أدوات تتطلّب تطبيقًا مدروسًا. ابدأ بتحديد العمليات المكلفة في تطبيقك — معالجة البيانات، أو عمليات التصيير المعقّدة، أو الحسابات الثقيلة — وجرّب تغليفها بالانتقالات.

الهدف ليس جعل كل شيء متزامنًا، بل ضمان أن تبدو تفاعلات المستخدم مستجيبة دائمًا بينما يجري العمل غير الحرج في الخلفية. وسيلاحظ مستخدموك الفرق، حتى إن لم يستطيعوا تحديد السبب الذي يجعل تطبيقك يبدو أكثر صقلًا من المنافسين.
