---
title: "فحوصات التساوي المخصّصة عبر areEqual"
---

ميزات حفظ النتائج في React مثل `React.memo()` و`useMemo()` و`useCallback()` أدوات أداء قوية، لكنها لا تكون أذكى من فحوصات التساوي الخاصة بها. فافتراضيًا يستخدم React المقارنة السطحية — وهي تعمل على نحو ممتاز حتى تتوقف عن ذلك. وعندما تحتاج إلى تحكّم أكبر في موعد إعادة تصيير مكوّناتك، تتيح لك دوال التساوي المخصّصة مع `areEqual` كتابة منطق خاص بمجال عملك يكون سريعًا وصحيحًا في آن واحد.

وإن فهم متى تكتب فحوصات التساوي المخصّصة وكيفية كتابتها أمر حاسم لبناء تطبيقات React تبقى سريعة مع نموّها. وسنستكشف المقايضات والأنماط الشائعة والتقنيات العملية لتنفيذ دوال `areEqual` التي تتجنّب فخ الأداء الناتج عن المقارنة العميقة مع الحفاظ على اتساق واجهتك.

## لماذا لا يكفي التساوي الافتراضي دائمًا

تعمل المقارنة السطحية الافتراضية في React بشكل مثالي مع القيم الأولية ومراجع الكائنات البسيطة:

```typescript
// ✅ Shallow equality handles these well
const MemoizedCounter = React.memo(({ count, label }) => (
  <div>
    {label}: {count}
  </div>
));

// Won't re-render if count and label haven't changed
<MemoizedCounter count={5} label="Items" />;
```

لكن الأمور تتعقّد مع الكائنات المعقّدة والمصفوفات، أو عندما تحتاج إلى مقارنات خاصة بمنطق عملك:

```typescript
// ❌ This will always re-render due to new object reference
const user = { id: 123, name: 'Alice', lastSeen: new Date() };
<UserProfile user={user} />;

// ❌ Array contents are the same, but reference changes
const items = users.map((u) => u.id);
<ItemList items={items} />;

// ❌ Configuration object recreated on every render
const settings = { theme: 'dark', notifications: true };
<Dashboard settings={settings} />;
```

وهنا تتألّق دوال التساوي المخصّصة — فهي تتيح لك تحديد معنى «التساوي» بدقة لحالة استخدامك الخاصة.

## توقيع دالة areEqual

عند استخدام `React.memo()` مع دالة تساوي مخصّصة، فأنت تنفّذ نمط `areEqual`:

```typescript
const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  // Return true if props are "equal" (don't re-render)
  // Return false if props are "different" (do re-render)
};

const MemoizedComponent = React.memo(Component, areEqual);
```

> **ملاحظة**
>
> قيمة الإرجاع معكوسة عمّا قد تتوقّع: فالقيمة `true` تعني «لا تُعِد التصيير» والقيمة `false` تعني «أعِد التصيير».

## أنماط عملية لـ areEqual

### مقارنة خصائص محدّدة من الكائن

بدلًا من المقارنة العميقة لكائنات بأكملها، ركّز على الخصائص التي تهمّ فعلًا:

```typescript
interface UserProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    lastLogin: Date;
    preferences: Record<string, unknown>;
  };
  onEdit: () => void;
}

const areEqual = (prev: UserProfileProps, next: UserProfileProps): boolean => {
  // Only care about user identity and display name, not lastLogin or preferences
  return (
    prev.user.id === next.user.id &&
    prev.user.name === next.user.name &&
    prev.user.email === next.user.email &&
    prev.onEdit === next.onEdit
  );
};

const UserProfile = React.memo(
  ({ user, onEdit }) => (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  ),
  areEqual,
);
```

لن يُعاد تصيير هذا المكوّن عند تغيّر `lastLogin` أو `preferences`، لكنه سيُحدَّث عند تغيّر معلومات العرض الخاصة بالمستخدم.

### مقارنة محتوى المصفوفات

للمصفوفات التي يهمّ فيها الترتيب لكنك تريد تجنّب إعادات التصيير غير الضرورية:

```typescript
interface TaskListProps {
  tasks: Array<{ id: string; title: string; completed: boolean }>;
  filter: 'all' | 'active' | 'completed';
}

const areEqual = (prev: TaskListProps, next: TaskListProps): boolean => {
  if (prev.filter !== next.filter) return false;
  if (prev.tasks.length !== next.tasks.length) return false;

  // Compare each task by its essential properties
  return prev.tasks.every((prevTask, index) => {
    const nextTask = next.tasks[index];
    return (
      prevTask.id === nextTask.id &&
      prevTask.title === nextTask.title &&
      prevTask.completed === nextTask.completed
    );
  });
};

const TaskList = React.memo(({ tasks, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}, areEqual);
```

### أنماط كائنات التهيئة

عند التعامل مع كائنات الإعدادات أو التهيئة، غالبًا ما يهمّك التساوي المنطقي بدلًا من تساوي المراجع:

```typescript
interface ChartProps {
  data: Array<{ x: number; y: number }>;
  options: {
    width: number;
    height: number;
    showGrid: boolean;
    colors: string[];
    animation?: { duration: number; easing: string };
  };
}

const areEqual = (prev: ChartProps, next: ChartProps): boolean => {
  // Data comparison - check length first for quick exit
  if (prev.data.length !== next.data.length) return false;
  if (!prev.data.every((point, i) => point.x === next.data[i].x && point.y === next.data[i].y)) {
    return false;
  }

  // Options comparison - focus on visual impact
  const prevOpts = prev.options;
  const nextOpts = next.options;

  if (prevOpts.width !== nextOpts.width) return false;
  if (prevOpts.height !== nextOpts.height) return false;
  if (prevOpts.showGrid !== nextOpts.showGrid) return false;

  // Array comparison for colors
  if (prevOpts.colors.length !== nextOpts.colors.length) return false;
  if (!prevOpts.colors.every((color, i) => color === nextOpts.colors[i])) {
    return false;
  }

  // Animation is optional and doesn't affect the chart structure
  return true;
};

const Chart = React.memo(({ data, options }) => {
  // Expensive chart rendering logic
  return <canvas {...options} />;
}, areEqual);
```

## تقنيات متقدّمة لـ areEqual

### استخدام WeakMap من أجل الأداء

للكائنات المعقّدة التي تقارنها كثيرًا، فكّر في تخزين نتائج المقارنة مؤقتًا:

```typescript
const comparisonCache = new WeakMap();

const areEqual = (prev: ComplexProps, next: ComplexProps): boolean => {
  // Check cache first
  const cacheKey = prev.complexObject;
  const cachedResult = comparisonCache.get(cacheKey);

  if (cachedResult && cachedResult.nextObject === next.complexObject) {
    return cachedResult.result;
  }

  // Perform actual comparison
  const result =
    prev.complexObject.id === next.complexObject.id &&
    prev.complexObject.version === next.complexObject.version;

  // Cache the result
  comparisonCache.set(cacheKey, {
    nextObject: next.complexObject,
    result,
  });

  return result;
};
```

### تساوٍ تقريبي للبيانات الرقمية

أحيانًا يكون التساوي التام صارمًا أكثر من اللازم — خصوصًا مع الأعداد العشرية أو الخصائص البصرية:

```typescript
const EPSILON = 0.001;

interface AnimatedProps {
  position: { x: number; y: number };
  rotation: number;
  scale: number;
}

const areEqual = (prev: AnimatedProps, next: AnimatedProps): boolean => {
  const fuzzyEqual = (a: number, b: number) => Math.abs(a - b) < EPSILON;

  return (
    fuzzyEqual(prev.position.x, next.position.x) &&
    fuzzyEqual(prev.position.y, next.position.y) &&
    fuzzyEqual(prev.rotation, next.rotation) &&
    fuzzyEqual(prev.scale, next.scale)
  );
};

const AnimatedElement = React.memo(
  ({ position, rotation, scale }) => (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)
                rotate(${rotation}deg)
                scale(${scale})`,
      }}
    >
      Animated Content
    </div>
  ),
  areEqual,
);
```

## مزالق شائعة وكيفية تجنّبها

### فخ التساوي العميق

```typescript
// ❌ Don't do this - it's slow and defeats the purpose
const areEqual = (prev: Props, next: Props): boolean => {
  return JSON.stringify(prev) === JSON.stringify(next);
};
```

قد تكون فحوصات التساوي العميق أبطأ من إعادة التصيير نفسها. فكن انتقائيًا في ما تقارنه بدلًا من ذلك.

### نسيان مراجع الدوال

```typescript
// ❌ Missing function comparison
const areEqual = (prev: Props, next: Props): boolean => {
  return prev.data === next.data; // Forgot about prev.onSave!
};

// ✅ Include all relevant props
const areEqual = (prev: Props, next: Props): boolean => {
  return prev.data === next.data && prev.onSave === next.onSave;
};
```

### الإفراط في التحسين

ليست كل مكوّن بحاجة إلى تساوٍ مخصّص. قِس الأداء أولًا، وحسّن ثانيًا:

```typescript
// ❌ Unnecessary complexity for a simple component
const SimpleButton = React.memo(
  ({ label, onClick }) => <button onClick={onClick}>{label}</button>,
  (prev, next) => prev.label === next.label && prev.onClick === next.onClick,
);

// ✅ Default shallow comparison is fine here
const SimpleButton = React.memo(({ label, onClick }) => <button onClick={onClick}>{label}</button>);
```

## حالات استخدام واقعية™

### تحسين حقول النماذج

تستفيد النماذج ذات الحقول الكثيرة من فحوصات التساوي الدقيقة:

```typescript
interface FormFieldProps {
  field: {
    name: string;
    value: string;
    error?: string;
    touched: boolean;
  };
  onChange: (name: string, value: string) => void;
}

const areEqual = (prev: FormFieldProps, next: FormFieldProps): boolean => {
  const prevField = prev.field;
  const nextField = next.field;

  return (
    prevField.name === nextField.name &&
    prevField.value === nextField.value &&
    prevField.error === nextField.error &&
    prevField.touched === nextField.touched &&
    prev.onChange === next.onChange
  );
};

const FormField = React.memo(
  ({ field, onChange }) => (
    <div>
      <input value={field.value} onChange={(e) => onChange(field.name, e.target.value)} />
      {field.touched && field.error && <span className="error">{field.error}</span>}
    </div>
  ),
  areEqual,
);
```

### مكوّنات تصوير البيانات

غالبًا ما تحتاج الرسوم البيانية والمنحنيات إلى تساوٍ مخصّص من أجل الأداء:

```typescript
interface DataVisualizationProps {
  dataset: Array<{ id: string; values: number[] }>;
  viewport: { startIndex: number; endIndex: number };
  styling: { colors: string[]; lineWidth: number };
}

const areEqual = (prev: DataVisualizationProps, next: DataVisualizationProps): boolean => {
  // Quick viewport check first
  if (
    prev.viewport.startIndex !== next.viewport.startIndex ||
    prev.viewport.endIndex !== next.viewport.endIndex
  ) {
    return false;
  }

  // Only compare data in the visible range
  const visiblePrev = prev.dataset.slice(prev.viewport.startIndex, prev.viewport.endIndex);
  const visibleNext = next.dataset.slice(next.viewport.startIndex, next.viewport.endIndex);

  if (visiblePrev.length !== visibleNext.length) return false;

  for (let i = 0; i < visiblePrev.length; i++) {
    if (visiblePrev[i].id !== visibleNext[i].id) return false;
    // Values array comparison could be optimized further based on your needs
  }

  // Styling comparison
  return (
    prev.styling.lineWidth === next.styling.lineWidth &&
    prev.styling.colors.length === next.styling.colors.length &&
    prev.styling.colors.every((color, i) => color === next.styling.colors[i])
  );
};
```

## اختبار دوال areEqual

ينبغي اختبار دوال التساوي المخصّصة مثل أي منطق عمل آخر:

```typescript
describe('UserProfile areEqual', () => {
  const baseUser = { id: 1, name: 'Alice', email: 'alice@example.com', lastLogin: new Date() };
  const baseProps = { user: baseUser, onEdit: jest.fn() };

  it('should return true when relevant props are unchanged', () => {
    const nextProps = {
      user: { ...baseUser, lastLogin: new Date() }, // Changed irrelevant prop
      onEdit: baseProps.onEdit,
    };

    expect(areEqual(baseProps, nextProps)).toBe(true);
  });

  it('should return false when user name changes', () => {
    const nextProps = {
      user: { ...baseUser, name: 'Bob' },
      onEdit: baseProps.onEdit,
    };

    expect(areEqual(baseProps, nextProps)).toBe(false);
  });

  it('should return false when callback changes', () => {
    const nextProps = {
      user: baseUser,
      onEdit: jest.fn(), // Different function reference
    };

    expect(areEqual(baseProps, nextProps)).toBe(false);
  });
});
```

## اعتبارات الأداء

### متى تستخدم areEqual

استخدم التساوي المخصّص عندما:

- تُسبّب المقارنة السطحية الافتراضية إعادات تصيير غير ضرورية
- تتعامل مع كائنات متداخلة معقّدة
- يكون تصيير المكوّن مكلفًا
- تكون لديك متطلبات تساوٍ خاصة بمجال عملك

### متى لا تستخدم areEqual

تخطَّ التساوي المخصّص عندما:

- يكون تصيير المكوّن سريعًا أصلًا
- تتغيّر الخصائص بشكل متكرر على أي حال
- يكون منطق التساوي نفسه معقّدًا وبطيئًا
- يكون السلوك الافتراضي جيدًا بما يكفي

> **نصيحة**
>
> قِس أداء تطبيقك بـ React DevTools Profiler قبل التحسين. فأحيانًا يكون فحص التساوي نفسه أكثر تكلفة من مجرد إعادة التصيير.

## التكامل مع الخُطّافات الأخرى

لا يقتصر التساوي المخصّص على `React.memo()`. فيمكنك تطبيق أنماط مشابهة مع خُطّافات أخرى:

```typescript
// Custom comparison in useMemo
const expensiveValue = useMemo(() => {
  return processData(data);
}, [data.id, data.version]); // Only depend on relevant properties

// Custom comparison function for useCallback
const memoizedCallback = useCallback(
  (id: string) => handleUserAction(id),
  [currentUser?.id], // Only recreate when current user changes
);
```
