---
title: "أنماط useDeferredValue"
---

بنيتَ مكوّن بحث يرشّح قائمة ضخمة من المنتجات. ويبدأ مستخدموك في كتابة «iPhone» فيلاحظون فورًا أن حقل الإدخال يبدو بطيئًا — فكل ضغطة مفتاح تكاد تتعلّق لجزء من الثانية. إذ تنهال على خيط واجهة المستخدم عمليات مكلفة تُطلق مع كل تغيير حرف، فتبدو واجهتك التي كانت سريعة خرقاء.

وهنا يأتي `useDeferredValue` — حلّ React الأنيق لإبقاء التحديثات عالية الأولوية (مثل إدخال المستخدم) مستجيبة، مع السماح للتحديثات الأدنى أولوية (مثل الحسابات المكلفة) بالحدوث عندما يتوفّر للمتصفح دورات فائضة. اعتبره طريقة واجهتك في القول: «عالج الأمور العاجلة أولًا، وتولَّ العمل الثقيل حين يتوفّر الوقت».

وخلافًا للتخميد (debouncing) الذي يؤجّل التحديثات مدة زمنية ثابتة، فإن `useDeferredValue` متكيّف — لا يؤجّل التحديثات إلا عندما يكون React مشغولًا بعمل أهم. وحين يكون تطبيقك خاملًا، تتحدّث القيم المؤجَّلة فورًا. أما حين يكون React غارقًا في العمل، فإنها تتنحّى بأناقة.

## النمط الأساسي

لنبدأ بمثال بسيط يوضّح المفهوم الجوهري:

```typescript
import { useDeferredValue, useState, useMemo } from 'react';

function SearchResults({ query }: { query: string }) {
  // Defer the expensive computation
  const deferredQuery = useDeferredValue(query);

  // Only recompute when the deferred value changes
  const results = useMemo(() => {
    return searchExpensiveDatabase(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <SearchResults query={query} />
    </div>
  );
}
```

وإليك ما يحدث: عندما تكتب بسرعة، يتحدّث `query` فورًا (فيبقى حقل الإدخال مستجيبًا)، أما `deferredQuery` فلا يتحدّث إلا حين يقرّر React أن ذلك آمن دون حجب تحديثات أكثر إلحاحًا. ويحصل حساب البحث المكلف على القيمة المؤجَّلة، فلا يتعارض مع الكتابة.

> **نصيحة**
>
> اقترن `useDeferredValue` دائمًا بـ `useMemo` أو `useCallback` — وإلا فستظل مكوّناتك تُعاد للتصيير مع كل تغيير، فتذهب الفائدة سدًى.

## واجهة بحث واقعية

لنبنِ واجهة بحث أكمل تُظهر عدة أنماط تعمل معًا:

```typescript
import { useDeferredValue, useState, useMemo, useTransition, Suspense } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [isPending, startTransition] = useTransition();

  // Defer the expensive filtering operation
  const deferredQuery = useDeferredValue(query);
  const deferredCategory = useDeferredValue(category);

  const filteredProducts = useMemo(() => {
    if (!deferredQuery && deferredCategory === 'all') {
      return products; // Return all products if no filters
    }

    return products.filter((product) => {
      const matchesQuery =
        deferredQuery === '' ||
        product.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(deferredQuery.toLowerCase());

      const matchesCategory = deferredCategory === 'all' || product.category === deferredCategory;

      return matchesQuery && matchesCategory;
    });
  }, [deferredQuery, deferredCategory]);

  const handleCategoryChange = (newCategory: string) => {
    startTransition(() => {
      setCategory(newCategory);
    });
  };

  return (
    <div className="product-search">
      <div className="search-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductList products={filteredProducts} isStale={isPending || query !== deferredQuery} />
      </Suspense>
    </div>
  );
}

function ProductList({ products, isStale }: { products: Product[]; isStale: boolean }) {
  return (
    <div className={`product-list ${isStale ? 'stale' : ''}`}>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p className="category">{product.category}</p>
          <p className="price">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

يجمع هذا المثال عدة أنماط قوية:

- **قيم مؤجَّلة** لكل من عبارة البحث ومرشّح الفئة
- **انتقالات** لتغييرات الفئة (لأنها عادةً أقل إلحاحًا من الكتابة)
- **استجابة بصرية** عندما تصبح النتائج قديمة (لاحظ خاصية `isStale`)
- **حساب محفوظ النتائج** لمنع الترشيح غير الضروري

## نمط متقدّم: التأجيلات المتتابعة

أحيانًا تكون لديك مستويات متعددة من الحسابات المكلفة. إليك نمطًا للتعامل مع التأجيلات المتتابعة:

```typescript
function DataDashboard() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState<FilterOptions>({});

  // First level: defer the raw data fetching
  const deferredDateRange = useDeferredValue(dateRange);

  const rawData = useMemo(() => {
    return fetchAnalyticsData(deferredDateRange);
  }, [deferredDateRange]);

  // Second level: defer the filtering of that data
  const deferredFilters = useDeferredValue(filters);

  const filteredData = useMemo(() => {
    return applyFilters(rawData, deferredFilters);
  }, [rawData, deferredFilters]);

  // Third level: defer the expensive chart calculations
  const chartData = useMemo(() => {
    return generateChartData(filteredData);
  }, [filteredData]);

  return (
    <div>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <FilterControls value={filters} onChange={setFilters} />
      <ExpensiveChart data={chartData} />
    </div>
  );
}
```

يحمي كل مستوى من التأجيل التحديثات الأكثر إلحاحًا فوقه. فغييرات نطاق التاريخ لن تحجب تحديثات المرشّحات، وغييرات المرشّحات لن تحجب تصيير الرسم البياني.

## التعامل مع حالات التحميل

من تحديات `useDeferredValue` إدارة حالات التحميل. وإليك نمطًا نظيفًا لتوضيح للمستخدمين متى تصبح النتائج قديمة:

```typescript
function SearchWithLoadingState() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    // Simulate expensive search
    return performExpensiveSearch(deferredQuery);
  }, [deferredQuery]);

  // Key insight: results are "stale" when the current query
  // doesn't match the deferred query
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />

      <div className="results-container">
        {isStale && <div className="loading-overlay">Searching...</div>}
        <div className={isStale ? 'results stale' : 'results'}>
          {results.map((result) => (
            <div key={result.id}>{result.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

فحص `isStale` صديقك — فهو يخبرك عندما تعرض واجهة المستخدم نتائج قديمة بينما تُحسب نتائج جديدة.

## متى لا تستخدم `useDeferredValue`

ليست كل عملية مكلفة تستفيد من `useDeferredValue`. وإليك بعض الحالات التي لا تكون فيها الأداة المناسبة:

```typescript
// ❌ Don't defer critical user feedback
function LoginForm() {
  const [email, setEmail] = useState('');
  const deferredEmail = useDeferredValue(email); // Bad idea!

  const validationErrors = useMemo(() => {
    return validateEmail(deferredEmail);
  }, [deferredEmail]);

  // User expects immediate validation feedback
  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {validationErrors.map((error) => (
        <div key={error}>{error}</div>
      ))}
    </div>
  );
}

// ❌ Don't defer simple computations
function SimpleCounter() {
  const [count, setCount] = useState(0);
  const deferredCount = useDeferredValue(count); // Unnecessary overhead

  return <div>Count: {deferredCount}</div>;
}

// ✅ DO use it for expensive, non-critical updates
function AnalyticsDashboard() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const expensiveStats = useMemo(() => {
    return calculateComplexAnalytics(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ComplexChart data={expensiveStats} />
    </div>
  );
}
```

## الدمج مع الميزات المتزامنة

يعمل `useDeferredValue` بانسجام مع بقية ميزات React المتزامنة:

```typescript
function ModernSearchApp() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return searchDatabase(deferredQuery);
  }, [deferredQuery]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery); // High priority - updates immediately

    // Low priority updates can be wrapped in transitions
    startTransition(() => {
      updateRecentSearches(newQuery);
      logSearchAnalytics(newQuery);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Search..."
      />

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults results={results} isLoading={isPending || query !== deferredQuery} />
      </Suspense>
    </div>
  );
}
```

## نصائح للأداء

إليك بعض النصائح العملية للاستفادة القصوى من `useDeferredValue`:

### قِس قبل أن تُحسّن

```typescript
// Use React DevTools Profiler to identify actual bottlenecks
function ExpensiveComponent({ data }: { data: string }) {
  const deferredData = useDeferredValue(data);

  const result = useMemo(() => {
    console.time('expensive-computation');
    const result = doExpensiveWork(deferredData);
    console.timeEnd('expensive-computation');
    return result;
  }, [deferredData]);

  return <div>{result}</div>;
}
```

### تأجيلات دقيقة

أحيانًا يكون من الأفضل تأجيل أجزاء محددة بدلًا من كائنات كاملة:

```typescript
// ❌ Defers the entire filter object
const deferredFilters = useDeferredValue(filters);

// ✅ Defer only the expensive parts
const deferredSearchTerm = useDeferredValue(filters.searchTerm);
const deferredCategory = useDeferredValue(filters.category);
// Keep sort order immediate since it's not expensive
const sortOrder = filters.sortOrder;
```

### خُطّافات مخصّصة للأنماط الشائعة

أنشئ خُطّافات قابلة لإعادة الاستخدام لأنماط التأجيل الشائعة:

```typescript
function useDeferredSearch<T>(
  items: T[],
  query: string,
  searchFn: (items: T[], query: string) => T[],
) {
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return searchFn(items, deferredQuery);
  }, [items, deferredQuery, searchFn]);

  const isStale = query !== deferredQuery;

  return { results, isStale };
}

// Usage
function ProductSearch() {
  const [query, setQuery] = useState('');
  const { results, isStale } = useDeferredSearch(products, query, (products, q) =>
    products.filter((p) => p.name.includes(q)),
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ProductList products={results} isStale={isStale} />
    </div>
  );
}
```

## مزالق شائعة

### المزلق 1: حفظ نتائج مفقود

```typescript
// ❌ Still re-renders on every change
function BadExample({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  // This runs on every render!
  const results = expensiveComputation(deferredQuery);

  return <div>{results}</div>;
}

// ✅ Properly memoized
function GoodExample({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return expensiveComputation(deferredQuery);
  }, [deferredQuery]);

  return <div>{results}</div>;
}
```

### المزلق 2: تأجيل الشيء الخطأ

```typescript
// ❌ Deferring the final result instead of the input
function BadExample({ items, query }: { items: Item[]; query: string }) {
  const filteredItems = items.filter((item) => item.name.includes(query));
  const deferredItems = useDeferredValue(filteredItems); // Wrong!

  return <ItemList items={deferredItems} />;
}

// ✅ Defer the input, memoize the computation
function GoodExample({ items, query }: { items: Item[]; query: string }) {
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.name.includes(deferredQuery));
  }, [items, deferredQuery]);

  return <ItemList items={filteredItems} />;
}
```

## الخلاصة

‏`useDeferredValue` أداة قوية لبناء واجهات مستجيبة تتعامل مع العمليات المكلفة بسلاسة. وأهم المبادئ التي يجب تذكّرها:
