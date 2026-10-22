---
title: "React.memo في عصر React 19 والمُصرّف"
---

يأتي React 19 بمُصرّف React (React Compiler) متاحًا للعموم، واعدًا بتحسين مكوّناتك تلقائيًا من أجل الأداء. لكن هل يعني ذلك أن `React.memo` صار عتيقًا؟ ليس تمامًا. فمع أن المُصرّف يتولّى كثيرًا من الحالات التي كانت تتطلّب حفظ النتائج يدويًا، يبقى فهم متى وكيف تستخدم `React.memo` بفعالية جوهريًا لبناء تطبيقات React عالية الأداء. لنستكشف المواضع التي ما زال `React.memo` يتألّق فيها، ومتى تجعله React الحديثة زائدًا عن الحاجة، وكيف تكتب مقارنات تساوٍ سليمة عند الحاجة إليها.

## ما هو `React.memo`؟

`React.memo` مكوّن أعلى رتبة يمنع إعادات التصيير غير الضرورية عبر حفظ نتيجة المكوّن. فهو يقارن الخصائص الحالية بالخصائص السابقة بمقارنة سطحية، ولا يعيد التصيير إلا إن تغيّرت. فكّر فيه كتحسين للأداء يقول «يا React، لا تُعِد تصيير هذا المكوّن إلا إذا تغيّرت الخصائص فعلًا».

```typescript
// Basic usage
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Some computationally expensive rendering logic
  return (
    <div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
});
```

عندما يُعاد تصيير الأب، تتخطّى React إعادة تصيير `ExpensiveComponent` إن لم تتغيّر خصائصه. بسيط بما يكفي، أليس كذلك؟

## مُصرّف React 19 يغيّر كل شيء

يحدّد مُصرّف React (المعروف سابقًا بـ React Forget) فرص حفظ النتائج تلقائيًا ويطبّقها خلف الكواليس. فهو يحلّل مخطط اعتماديات مكوّنك ويُدرج التحسينات المناسبة في وقت البناء.

```typescript
// Before: You'd manually wrap this
const UserCard = React.memo(({ user, theme }) => {
  return (
    <div className={`card card--${theme}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// After: The compiler handles this automatically
const UserCard = ({ user, theme }) => {
  return (
    <div className={`card card--${theme}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};
// Compiler output includes automatic memoization where beneficial
```

المُصرّف ذكيّ في تحديد متى يطبّق هذه التحسينات. فلا يحفظ نتائج مكوّنات:

- رخيصة التصيير
- تتغيّر خصائصها بشكل متكرّر
- تستفيد أكثر من تحسينات أخرى

> **ملاحظة**
>
> مُصرّف React اختياري في React 19. ستحتاج إلى تفعيله في إعدادات البناء للاستفادة من التحسينات التلقائية.

## متى يبقى `React.memo` مهمًّا

حتى مع المُصرّف، توجد حالات يبقى فيها الاستخدام اليدوي لـ `React.memo` ذا قيمة:

### مقارنات تساوٍ معقّدة

يستخدم المُصرّف المقارنة السطحية افتراضيًا، لكنك تحتاج أحيانًا إلى منطق مقارنة مخصّص:

```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    specs: Record<string, any>;
    lastUpdated: Date;
  };
  onAddToCart: (id: string) => void;
}

// Only re-render if product data meaningfully changed
const ProductCard = React.memo(
  ({ product, onAddToCart }: ProductCardProps) => {
    return (
      <div>
        <h3>{product.name}</h3>
        <ProductSpecs specs={product.specs} />
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom equality: ignore lastUpdated changes
    const prevProduct = prevProps.product;
    const nextProduct = nextProps.product;

    return (
      prevProduct.id === nextProduct.id &&
      prevProduct.name === nextProduct.name &&
      JSON.stringify(prevProduct.specs) === JSON.stringify(nextProduct.specs) &&
      prevProps.onAddToCart === nextProps.onAddToCart
    );
  },
);
```

> **تحذير**
>
> احذر استخدام `JSON.stringify` للمقارنة العميقة — فهو مكلف ولا يتعامل مع المراجع الدائرية. فكّر في استخدام مكتبة مقارنة عميقة مناسبة مثل `isEqual` من Lodash للكائنات المعقّدة.

### مكتبات الطرف الثالث والشيفرة القديمة

إذا كنت تعمل مع مكوّنات لم يعالجها المُصرّف (مكتبات طرف ثالث، شيفرة قديمة)، فلا يزال حفظ النتائج يدويًا يوفّر فوائد كبيرة:

```typescript
// Third-party component that isn't compiler-optimized
import { ExpensiveChart } from 'some-chart-library';

const OptimizedChart = React.memo(ExpensiveChart, (prevProps, nextProps) => {
  // Chart only needs to re-render if data actually changed
  return prevProps.data === nextProps.data && prevProps.config === nextProps.config;
});
```

### تحكّم دقيق

أنت تعرف أحيانًا أفضل من المُصرّف متى ينبغي إعادة تصيير المكوّن. ويصدق هذا خاصة في المكوّنات ذات الآثار الجانبية المكلفة أو منطق التصيير المعقّد:

```typescript
interface DataVisualizationProps {
  dataset: DataPoint[];
  filterOptions: FilterConfig;
  renderMode: 'canvas' | 'svg' | 'webgl';
}

const DataVisualization = React.memo(
  ({ dataset, filterOptions, renderMode }: DataVisualizationProps) => {
    // Expensive WebGL rendering that we want to control precisely
    const processedData = useMemo(() => {
      return processDataForVisualization(dataset, filterOptions);
    }, [dataset, filterOptions]);

    return <AdvancedChart data={processedData} mode={renderMode} />;
  },
  (prevProps, nextProps) => {
    // Only re-render if dataset reference changed or critical config changed
    return (
      prevProps.dataset === nextProps.dataset &&
      prevProps.renderMode === nextProps.renderMode &&
      isFilterConfigEqual(prevProps.filterOptions, nextProps.filterOptions)
    );
  },
);
```

## كتابة دوال areEqual فعّالة

عندما تحتاج فعلًا إلى مقارنات تساوٍ مخصّصة، اتبع هذه الإرشادات:

### أبقِها بسيطة وسريعة

تعمل دالة التساوي في كل إعادة تصيير محتملة، فاجعلها خفيفة:

```typescript
// ✅ Good: Fast property checks
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.status === nextProps.status &&
    prevProps.priority === nextProps.priority
  );
};

// ❌ Bad: Expensive deep equality on every render
const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};
```

### ركّز على ما يهمّ فعلًا

لا تفحص خصائص لا تؤثّر في التصيير:

```typescript
interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date; // Doesn't affect rendering
    internalTracking: any; // Doesn't affect rendering
  };
  onToggle: (id: string) => void;
}

const TaskItem = React.memo(
  ({ task, onToggle }: TaskItemProps) => {
    return (
      <div className={task.completed ? 'completed' : ''}>
        <span>{task.title}</span>
        <button onClick={() => onToggle(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only check properties that affect rendering
    const prevTask = prevProps.task;
    const nextTask = nextProps.task;

    return (
      prevTask.id === nextTask.id &&
      prevTask.title === nextTask.title &&
      prevTask.completed === nextTask.completed &&
      prevProps.onToggle === nextProps.onToggle
    );
  },
);
```

### تعامل مع خصائص الدوال بحذر

خصائص الدوال مصدر شائع لإعادات التصيير غير الضرورية. تأكّد من أن فحص التساوي لديك يتعامل معها على النحو المناسب:

```typescript
// If you know the function is stable (wrapped in useCallback), reference equality works
const SimpleComponent = React.memo(
  ({ data, onClick }) => {
    return <button onClick={onClick}>{data.label}</button>;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.label === nextProps.data.label && prevProps.onClick === nextProps.onClick // Reference equality for stable functions
    );
  },
);

// If functions might be recreated but are functionally equivalent, you might skip them
const FlexibleComponent = React.memo(
  ({ data, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <input defaultValue={data.value} />
      </form>
    );
  },
  (prevProps, nextProps) => {
    // Skip function comparison if the data is the same
    return prevProps.data.value === nextProps.data.value;
  },
);
```

## متى لا تستخدم `React.memo`

### مكوّنات يُعاد تصييرها دائمًا

إذا تغيّرت خصائص مكوّنك في كل تصيير للأب، فحفظ النتائج يضيف حملًا بلا فائدة:

```typescript
// ❌ Bad: Timestamp changes every render
const Clock = React.memo(() => {
  return <div>{new Date().toLocaleTimeString()}</div>;
});

// ✅ Better: Just let it re-render
const Clock = () => {
  return <div>{new Date().toLocaleTimeString()}</div>;
};
```

### مكوّنات رخيصة

في المكوّنات البسيطة، قد يفوق حمل حفظ النتائج فوائده:

```typescript
// ❌ Probably unnecessary
const SimpleLabel = React.memo(({ text, className }) => {
  return <span className={className}>{text}</span>;
});

// ✅ Just let it re-render—it's cheap
const SimpleLabel = ({ text, className }) => {
  return <span className={className}>{text}</span>;
};
```

### عندما تتوفّر لديك تحسينات المُصرّف

إذا كان مُصرّف React يتولّى مكوّنك، فقد يتعارض إضافة `React.memo` يدويًا مع تحسيناته أو ينشئ عملًا زائدًا.

## تصحيح مشكلات حفظ النتائج

عندما لا تسير الأمور كما هو متوقّع، فإن أداة Profiler في React DevTools هي صديقك المفضّل. لكن إليك بعض تقنيات التصحيح السريعة:

### سجّل تغييرات الخصائص

```typescript
const DebugMemo = React.memo(
  ({ data, config }) => {
    console.log('Component rendering with:', { data, config });
    return <ExpensiveComponent data={data} config={config} />;
  },
  (prevProps, nextProps) => {
    const isEqual = prevProps.data === nextProps.data && prevProps.config === nextProps.config;

    if (!isEqual) {
      console.log('Props changed:', {
        dataChanged: prevProps.data !== nextProps.data,
        configChanged: prevProps.config !== nextProps.config,
      });
    }

    return isEqual;
  },
);
```

### استخدم أداة Profiler في React DevTools

فعّل «Record why each component rendered» في React DevTools لترى بالضبط لماذا تُعاد المكوّنات للتصيير، حتى مع حفظ النتائج.

> **نصيحة**
>
> ثبّت إضافة المتصفّح React DevTools واستخدم تبويب Profiler لتحديد اختناقات الأداء. فسيُظهر لك أيّ المكوّنات يُعاد تصييرها ولماذا.

## أنماط من الواقع

### مكوّنات القوائم بمفاتيح مستقرة

```typescript
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = React.memo(
  ({ todos, onToggle, onDelete }: TodoListProps) => {
    return (
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
    );
  },
  (prevProps, nextProps) => {
    // List components benefit from checking array reference equality
    return (
      prevProps.todos === nextProps.todos &&
      prevProps.onToggle === nextProps.onToggle &&
      prevProps.onDelete === nextProps.onDelete
    );
  },
);
```

### مكوّنات كثيفة الإعدادات

```typescript
interface ChartProps {
  data: DataPoint[];
  options: ChartOptions;
  theme: ThemeConfig;
}

const Chart = React.memo(
  ({ data, options, theme }: ChartProps) => {
    return <ExpensiveChart data={data} options={options} theme={theme} />;
  },
  (prevProps, nextProps) => {
    // For config-heavy components, focus on reference equality
    // assuming parent properly memoizes these objects
    return (
      prevProps.data === nextProps.data &&
      prevProps.options === nextProps.options &&
      prevProps.theme === nextProps.theme
    );
  },
);
```

## مستقبل حفظ النتائج

مع نضوج مُصرّف React وانتشاره على نطاق أوسع، سيصبح حفظ النتائج اليدوي أقل ضرورة في معظم حالات الاستخدام. ومع ذلك، سيبقى `React.memo` ذا قيمة في:

- المكوّنات المعقّدة ذات احتياجات تحسين محدّدة
- التكامل مع أنظمة غير React
- الضبط الدقيق للأداء
- العمل مع شيفرة قديمة لا يمكنها استخدام المُصرّف

المفتاح هو فهم متى يدعمك المُصرّف ومتى تحتاج إلى التدخّل بتحسينات يدوية.

## ملخّص أفضل الممارسات

1. **اجعل الافتراضي أن يتولّى المُصرّف الأمر** إن كنت تستخدم React 19 مع تفعيل المُصرّف
2. **استخدم `React.memo` لمنطق تساوٍ مخصّص** عندما لا تكفي المقارنة السطحية
3. **أبقِ دوال `areEqual` سريعة ومركّزة** على الخصائص المتعلّقة بالتصيير
4. **قِس الأداء قبل التحسين** لتضمن أنك تحلّ مشكلات أداء حقيقية
5. **لا تحفظ نتائج كل شيء** — فالمكوّنات الرخيصة غالبًا لا تستفيد من حفظ النتائج
6. **احذر خصائص الدوال** — تأكّد من استقرارها أو التعامل معها على النحو المناسب في المقارنات
