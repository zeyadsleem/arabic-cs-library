---
title: "دليل useTransition وstartTransition"
---

قدّم React 18 ميزات متزامنة تساعد في إبقاء تطبيقك مستجيبًا حتى أثناء أداء عمل مكلف. وفي قلب ذلك يكمن مفهوم **الانتقالات** — تعليم بعض التحديثات بأنها أقل إلحاحًا حتى لا تُحجب التحديثات الأهم (مثل الاستجابة لإدخال المستخدم). تخيّل الأمر كإدارة مرور: مسارات سريعة للتحديثات العاجلة، ومسارات عادية لكل ما سواها.

يتيح لك `useTransition` و`startTransition` تأجيل تحديثات الحالة غير العاجلة، ومنعها من حجب خيط واجهة المستخدم أثناء كتابة المستخدمين أو نقرهم أو تمريرهم النشط. فبدل أن يتجمّد تطبيقك أثناء الحسابات الثقيلة، يبقى تفاعليًا بينما يجري العمل المكلف في الخلفية.

## المشكلة: تحديثات تحجب الواجهة

قبل أن نغوص في الحل، لنفهم ما الذي نحلّه. تأمّل مكوّن البحث هذا الذي يرشّح قائمة كبيرة:

```typescript
// ❌ This blocks the UI during expensive filtering
function SearchResults() {
  const [query, setQuery] = useState('');
  const [items] = useState(generateLargeDataset()); // 10,000+ items

  // This filtering happens synchronously and blocks typing
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      {filteredItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

عندما تكتب في مربع البحث، تُطلق كل ضغطة مفتاح عملية ترشيح مكلفة تحجب واجهة المستخدم. ويبدو حقل الإدخال بطيئًا لأن React لا يستطيع تحديث قيمته حتى يكتمل الترشيح. وليست هذه تمامًا التجربة السلسة التي يتوقّعها مستخدموك.

## دور `useTransition`

يمنحك `useTransition` طريقة لتعليم تحديثات بأنها «انتقالات» — تحديثات غير عاجلة يمكن أن يقاطعها عمل أهم:

```typescript
import { useTransition, useState } from 'react';

// ✅ Smooth typing with transitions
function SearchResults() {
  const [query, setQuery] = useState('');
  const [filteredQuery, setFilteredQuery] = useState('');
  const [items] = useState(generateLargeDataset());
  const [isPending, startTransition] = useTransition();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filteredQuery.toLowerCase()),
  );

  const handleSearch = (value: string) => {
    setQuery(value); // Urgent: update input immediately

    startTransition(() => {
      setFilteredQuery(value); // Non-urgent: defer filtering
    });
  };

  return (
    <div>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />
      {isPending && <div>Filtering...</div>}
      {filteredItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

وإليك ما يجري:

- **تحديث فوري**: يعمل `setQuery(value)` تزامنيًا، فتبقى الكتابة مستجيبة
- **تحديث مؤجَّل**: يحصل `setFilteredQuery(value)` داخل `startTransition` على أولوية أدنى
- **حالة التحميل**: يخبرنا `isPending` بأن الانتقال ما زال قيد المعالجة

يتحدّث حقل الإدخال فورًا بينما يجري الترشيح المكلف في الخلفية. وإن واصل المستخدم الكتابة، سيقاطع React الترشيح الجاري ليعالج الإدخال الجديد.

## تعمّق في خُطّاف `useTransition`

يعيد خُطّاف `useTransition` زوجًا من عنصرين:

```typescript
const [isPending, startTransition] = useTransition();
```

### قيمة isPending

قيمة منطقية تشير إلى ما إذا كان أي انتقال معلّقًا حاليًا. استخدمها لعرض مؤشرات التحميل:

```typescript
function FilteredList() {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {isPending && <div className="loading-spinner">Updating results...</div>}
      {/* Your filtered content */}
    </div>
  );
}
```

### الدالة startTransition

دالة تغلّف تحديثات الحالة التي تريد تعليمها كانتقالات:

```typescript
const handleExpensiveUpdate = (newData) => {
  // Urgent updates outside the transition
  setLoadingState(true);

  startTransition(() => {
    // Non-urgent updates inside the transition
    setFilteredData(processData(newData));
    setCurrentPage(1);
    setSelectedItems([]);
  });
};
```

تُجمَّع تحديثات الحالة المتعددة داخل `startTransition` معًا في انتقال واحد قابل للمقاطعة.

## الدالة startTransition المستقلة

لا تحتاج دائمًا إلى حالة `isPending`. وفي الحالات التي تريد فيها فقط تعليم التحديثات بأنها غير عاجلة، استورد `startTransition` مباشرةً:

```typescript
import { startTransition } from 'react';

function TabContainer() {
  const [activeTab, setActiveTab] = useState('home');
  const [tabContent, setTabContent] = useState(getHomeContent());

  const switchTab = (tab: string) => {
    setActiveTab(tab); // Urgent: update tab highlight immediately

    startTransition(() => {
      // Non-urgent: load expensive tab content
      setTabContent(getContentForTab(tab));
    });
  };

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? 'active' : ''}
            onClick={() => switchTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabContent}</div>
    </div>
  );
}
```

يحدث تمييز التبويب فورًا (تجربة استخدام ممتازة)، بينما يجري تحميل المحتوى الذي قد يكون مكلفًا في صورة انتقال.

## أنماط واقعية

### بحث مع التخميد (debouncing)

اجمع الانتقالات مع التخميد للحصول على أداء بحث أفضل:

```typescript
function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Debounce the search to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      startTransition(() => {
        // This could be an API call or expensive filtering
        performSearch(searchQuery).then(setResults);
      });
    }, 300),
    [],
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {isPending && <div>Searching...</div>}

      <div className="results">
        {results.map((result) => (
          <SearchResult key={result.id} item={result} />
        ))}
      </div>
    </div>
  );
}
```

### تحديثات تصوّر البيانات

مثالي للرسوم والمخططات التي تحتاج إعادة حسابات مكلفة:

```typescript
function DataDashboard() {
  const [filters, setFilters] = useState(defaultFilters);
  const [chartData, setChartData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters); // Update UI immediately

    startTransition(() => {
      // Expensive data processing doesn't block filter UI
      const processedData = processLargeDataset(rawData, newFilters);
      setChartData(processedData);
    });
  };

  return (
    <div>
      <FilterControls filters={filters} onChange={updateFilters} />

      {isPending && <div className="chart-loading">Updating visualization...</div>}

      <Chart data={chartData} />
    </div>
  );
}
```

## متى لا تستخدم الانتقالات

ليست الانتقالات هي الجواب دائمًا. تجنّبها في:

### استجابة المستخدم الحرجة

لا تؤجّل التحديثات التي تقدّم استجابة فورية لأفعال المستخدم:

```typescript
// ❌ Don't defer form validation feedback
const handleSubmit = () => {
  startTransition(() => {
    setErrors(validateForm(formData)); // User needs immediate feedback
  });
};

// ✅ Show validation errors immediately
const handleSubmit = () => {
  setErrors(validateForm(formData));
};
```

### تحديثات التنقّل

ينبغي أن تبدو تغييرات المسار فورية:

```typescript
// ❌ Don't defer navigation
const handleNavigation = (route: string) => {
  startTransition(() => {
    navigate(route); // Users expect immediate navigation
  });
};

// ✅ Navigate immediately, defer expensive route data
const handleNavigation = (route: string) => {
  navigate(route);

  startTransition(() => {
    loadRouteData(route).then(setRouteData);
  });
};
```

### التحديثات الصغيرة السريعة

في تغييرات الحالة التافهة، تضيف الانتقالات تعقيدًا بلا داعٍ:

```typescript
// ❌ Overkill for simple updates
const [count, setCount] = useState(0);

const increment = () => {
  startTransition(() => {
    setCount((c) => c + 1); // This is already fast
  });
};

// ✅ Keep it simple
const increment = () => {
  setCount((c) => c + 1);
};
```

## اعتبارات الأداء

### قياس الأثر

استخدم مُنمّق React DevTools لقياس الأثر الفعلي:

```typescript
// Before adding transitions, profile this component
function ExpensiveList({ items, query }) {
  const filteredItems = useMemo(() => {
    // Expensive filtering logic
    return items.filter((item) => complexFilterLogic(item, query));
  }, [items, query]);

  return (
    <div>
      {filteredItems.map((item) => (
        <ExpensiveListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

> **نصيحة**
>
> لا تُضف الانتقالات إلا إذا استطعت قياس تحسّن حقيقي في تجربة المستخدم. ولا تُحسّن قبل الأوان.

### اعتبارات الذاكرة

قد تُبقي الانتقالات عدة نسخ من البيانات في الذاكرة في الوقت نفسه:

```typescript
function OptimizedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Cleanup old results to prevent memory leaks
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isPending) {
        // Clean up any cached expensive computations
        cleanupExpensiveOperations();
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isPending]);

  // ... rest of component
}
```

## استراتيجية الترحيل

تحويل المكوّنات القائمة لاستخدام الانتقالات:

### الخطوة 1: حدّد العمليات المكلفة

ابحث عن العمليات التي تسبّب تجمّدًا ملحوظًا في الواجهة:

- ترشيح وترتيب قوائم كبيرة
- حسابات معقّدة
- تحديثات DOM ثقيلة
- معالجة البيانات

### الخطوة 2: افصل الحالة

افصل التحديثات الفورية عن المكلفة:

```typescript
// Before: Single state causes blocking updates
const [searchState, setSearchState] = useState({
  query: '',
  results: [],
});

// After: Split for different update priorities
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
```

### الخطوة 3: أضف الانتقالات تدريجيًا

ابدأ بأكثر المكوّنات إشكالًا:

```typescript
// Start here: Most obvious wins
function ProductSearch() {
  const [isPending, startTransition] = useTransition();
  // ... transition logic
}

// Then move to: Secondary bottlenecks
function DataTable() {
  // ... apply same pattern
}
```

### الخطوة 4: قِس وكرّر

استخدم تنميق الأداء للتحقق من التحسينات والعثور على هدف التحسين التالي.

## مزالق شائعة

### الإغلاقات القديمة في الانتقالات

احترس من الإغلاقات (closures) داخل `startTransition`:

```typescript
// ❌ This captures stale values
const handleUpdate = () => {
  startTransition(() => {
    // `someValue` might be stale if the transition is interrupted
    setResults(processData(someValue));
  });
};

// ✅ Get fresh values inside the transition
const handleUpdate = () => {
  startTransition(() => {
    setResults((currentResults) => processData(getCurrentValue()));
  });
};
```

### الانتقالات لا تجعل الشيفرة أسرع

لا تُسرّع الانتقالات شيفرتك بسحر — إنها فقط تمنع الشيفرة البطيئة من حجب التحديثات العاجلة:

```typescript
// ❌ Still slow, just non-blocking
startTransition(() => {
  setResults(reallySlowOperation(data)); // This is still slow!
});

// ✅ Combine with other optimizations
startTransition(() => {
  // Use web workers, memoization, virtualization, etc.
  setResults(optimizedOperation(data));
});
```

## الخطوات التالية

بعد أن فهمت الانتقالات، أصبحت جاهزًا لبناء تطبيقات React أكثر استجابة. والمفتاح هو تحديد أي التحديثات عاجل (إدخال المستخدم، والتنقّل) وأيها يمكن أن ينتظر (نتائج البحث، وتصوّر البيانات).
