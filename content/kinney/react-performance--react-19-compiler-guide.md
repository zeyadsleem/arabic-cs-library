---
title: "مصرّف React 19 (React Compiler)"
lang: ar
source: "https://stevekinney.com/courses/react-performance/react-19-compiler-guide"
---

يمثّل مصرّف React (React Compiler) أكبر تحوّل في تحسين أداء React منذ الخُطّافات. فبدلًا من رشّ `useMemo` و`useCallback` و`React.memo` في أنحاء مستودعك كأنها غبار الأداء السحري، يحلّل المصرّف شيفرتك وقت البناء ويطبّق التحسينات تلقائيًا في المواضع التي تهمّ فعلًا. فالأمر ليس جعل React أسرع — بل جعل تحسين React تلقائيًا.

لكن إليك الحقيقة: المصرّف ليس سحرًا. إنه أداة تحليل ساكن متطوّرة تفهم قواعد React وأنماطها. لا يستطيع تحسين شيفرة تنتهك تلك القواعد، ولن ينقذك من مشكلات معمارية جوهرية. يعرض عليك هذا الدليل بالتفصيل كيفية عمل المصرّف، وكيف تهيّئ مستودعك له، وما يستطيع فعله وما لا يستطيع، وكيف تقيس ما إذا كان يساعد تطبيقك تحديدًا فعلًا.

> **لا يزال مصرّف React في مرحلة ما قبل الإصدار.**
>
> وقت كتابة هذه السطور — 1 أكتوبر 2025 — انتقل مصرّف React من «بيتا» إلى إصدار مرشّح (RC) في أبريل 2025. ويقول [فريق React إن الإصدار المرشّح «مستقر وقريب من النهائي» وآمن للتجربة في الإنتاج](https://react.dev/blog/2025/04/21/react-compiler-rc)، وإن لم يكن وسم «المستقر» النهائي بعد.
>
> لذا سنتحدّث عنه، مع التحفّظ بأن الأمور *قد* تتغيّر قليلًا.

**ملاحظة جديرة بالانتباه**: مصرّف React رائع، لكنه ليس سحرًا. يستحق التفعيل لدى معظم الفرق التي تكتب React على النمط الاصطلاحي — تعامل معه فقط كسياج حماية لحفظ النتائج، لا كحلّ شامل.

يُؤتمت المصرّف الأجزاء المملّة من حفظ النتائج — تثبيت القيم والدوال حتى تتخطّى المكوّنات العمل غير الضروري — فيقلّل الحاجة إلى `useMemo` و`useCallback` وكثير من أسوار `React.memo`. وهذا يخفض مباشرةً إعادات التصيير الناتجة عن تقلّب الخصائص دون أن ترشّ شيفرة تخزين يدوية في كل مكان.

**إليك الأمر**: ما زال عليك كتابة React «صحيحة». (آسف على ذلك.)

- يفترض المصرّف الالتزام [بقواعد React (the Rules of React)](https://react.dev/reference/rules). فيجب أن تكون المكوّنات نقية وعديمة الأثر التكراري، وأن تُعامَل الخصائص والحالة كغير قابلة للتغيير، وأن تُبقى التأثيرات الجانبية خارج التصيير. وإن انتهكت شيفرتك هذه القواعد، فإما أن يتخطّى المصرّف التحسين، وإما أن ترى *غرابة* وقت التشغيل.
- حفظ النتائج من أجل صحّة السلوك سلاح قابل للانطلاق في القدم. إن كان تطبيقك يعتمد على تساوي المراجع (referential equality) — مثل تأثيرات لا تعمل إلا لأن هوية كائن ما تبقى مستقرة — فقد [يحفظ المصرّف النتائج بطريقة مختلفة](https://react.dev/learn/react-compiler/debugging) فيكشف تلك الأخطاء: تخيّل تأثيرات تُطلَق أكثر من اللازم أو حلقات لا تنتهي. والإصلاح هو إزالة الاعتماد، لا مصارعة المصرّف.
- [توافق المكتبات متفاوت](https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library). تشير قواعد الفحص (lints) الرسمية إلى بعض الأنماط بأنها «غير متوافقة»، وسيتخطّى المصرّف تلك المناطق بأمان؛ وأنماط المراقب (observer) على طريقة MobX مزلق معروف قد تحتاج إلى الاستثناء منه.
- قد تصبح عمليات البناء أبطأ قليلًا. يدمج [Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler) إضافة Babel مع تحسين SWC لإبقاء الأثر صغيرًا، لكنك قد تلاحظ مع ذلك كلفة إضافية مقارنةً بخطوط أنابيب SWC وحدها.
- النطاق مهم. يركّز المصرّف على حفظ النتائج. وهو *لن* يغني عن معمارية الحالة الصحيحة، أو المحاكاة الافتراضية (virtualization)، أو Suspense والبثّ، أو إصلاح شلالات الشبكة — فما زلت بحاجة إلى تلك الأنماط.

> **باختصار**
>
> يُؤتمت حفظ النتائج — وهذا ممتاز لتقلّب الخصائص وهوية دوال الاستدعاء — لكنه لا يغني عن معمارية حالة جيدة، ولا عن المحاكاة الافتراضية للقوائم الضخمة، ولا عن حلّ شلالات الشبكة واستراتيجية SSR. ما زلت تصمّم من أجل ذلك؛ فالمصرّف يزيل فقط صنفًا كبيرًا من إعادات التصيير حتى تبرز بقية أعمالك.
>
> - **متى يكون مكسبًا واضحًا** أنت تلتزم أصلًا بقواعد React وتتجنّب التأثيرات الجانبية أثناء التصيير. ومعظم «مشكلات الأداء» تأتي من تقلّب هوية الخصائص ودوال الاستدعاء غير المستقرة وإعادة حساب البيانات المشتقّة — والمصرّف يحيّد كثيرًا من ذلك تلقائيًا.
>   - أنت تلتزم أصلًا بقواعد React وتتجنّب التأثيرات الجانبية أثناء التصيير.
>   - ومعظم «مشكلات الأداء» تأتي من تقلّب هوية الخصائص ودوال الاستدعاء غير المستقرة وإعادة حساب البيانات المشتقّة — والمصرّف يحيّد كثيرًا من ذلك تلقائيًا.
> - **متى تتراجع أو تقيّده** أنت تعتمد على حفظ النتائج لضمان صحّة السلوك (اعتمادات تأثيرات يجب أن تبقى مستقرة مرجعيًا، ومنطق شرطي مبني على فحوص المراجع). نظّف ذلك أولًا أو استثنِ الملفات المشكلة. أنت تستخدم مكتبات أو أنماطًا تصفها قواعد الفحص بأنها غير متوافقة. أبقِ تلك المسارات بلا تصريف.
>   - أنت تعتمد على حفظ النتائج لضمان صحّة السلوك (اعتمادات تأثيرات يجب أن تبقى مستقرة مرجعيًا، ومنطق شرطي مبني على فحوص المراجع). نظّف ذلك أولًا أو استثنِ الملفات المشكلة.
>   - أنت تستخدم مكتبات أو أنماطًا تصفها قواعد الفحص بأنها غير متوافقة. أبقِ تلك المسارات بلا تصريف.

## كيف يعمل مصرّف React فعليًا

يعمل المصرّف وقت البناء، فيحوّل شيفرة React لديك قبل أن تصل إلى المتصفح أصلًا:

```typescript
// What you write (clean, simple React)
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.price * product.discountRate;
  const finalPrice = product.price - discount;

  const handleAdd = () => {
    trackEvent('add_to_cart', { productId: product.id });
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <span className="price">${finalPrice.toFixed(2)}</span>
      {discount > 0 && <span className="discount">Save ${discount.toFixed(2)}</span>}
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

// What the compiler generates (optimized but equivalent)
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Compiler adds memoization for expensive computations
  const discount = useMemo(
    () => product.price * product.discountRate,
    [product.price, product.discountRate],
  );

  const finalPrice = useMemo(() => product.price - discount, [product.price, discount]);

  // Compiler stabilizes callback identity
  const handleAdd = useCallback(() => {
    trackEvent('add_to_cart', { productId: product.id });
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);

  // Compiler can even optimize JSX creation
  return useMemo(
    () => (
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <span className="price">${finalPrice.toFixed(2)}</span>
        {discount > 0 && <span className="discount">Save ${discount.toFixed(2)}</span>}
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    ),
    [product.image, product.name, finalPrice, discount, handleAdd],
  );
}
```

### شجرة قرارات المصرّف

يستخدم المصرّف استدلالات متطوّرة لتحديد ما ينبغي تحسينه:

```typescript
// Compiler optimization decision flowchart
interface CompilerDecisionCriteria {
  // Will optimize
  willOptimize: {
    expensiveComputations: 'Operations with high computational cost';
    stableReferences: 'Functions and objects passed as props';
    pureComponents: 'Components without side effects';
    staticElements: 'JSX that rarely changes';
  };

  // Won't optimize
  wontOptimize: {
    trivialOperations: 'Simple property access or arithmetic';
    alwaysChanging: 'Values that change on every render';
    sideEffects: 'Operations with external dependencies';
    dynamicCode: 'Code patterns it cannot analyze statically';
  };

  // Context-dependent
  contextual: {
    listItems: 'Optimizes based on list size and complexity';
    conditionals: 'Analyzes branch likelihood';
    hooks: 'Considers hook dependencies and frequency';
  };
}
```

## التحضير قبل الترحيل

قبل تفعيل المصرّف، يحتاج مستودعك إلى الالتزام الصارم بقواعد React:

### الخطوة 1: فعّل الوضع الصارم في كل مكان

```typescript
// The compiler requires Strict Mode for safety checks
// In your app root:
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <YourAppContent />
    </StrictMode>
  );
}

// Strict Mode catches:
// - Components with side effects during render
// - Deprecated lifecycle methods
// - Unsafe practices the compiler can't optimize
```

### الخطوة 2: دقّق في تحسيناتك الحالية

```typescript
// Script to analyze existing manual optimizations
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import * as path from 'path';

class OptimizationAuditor {
  private stats = {
    useMemo: 0,
    useCallback: 0,
    ReactMemo: 0,
    totalComponents: 0,
    suspiciousPatterns: [] as string[],
  };

  analyzeFile(filePath: string) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    traverse(ast, {
      CallExpression: (path) => {
        const node = path.node;
        if (node.callee.type === 'Identifier') {
          switch (node.callee.name) {
            case 'useMemo':
              this.stats.useMemo++;
              this.checkMemoUsage(path, filePath);
              break;
            case 'useCallback':
              this.stats.useCallback++;
              this.checkCallbackUsage(path, filePath);
              break;
            case 'memo':
              this.stats.ReactMemo++;
              break;
          }
        }
      },
      FunctionDeclaration: (path) => {
        if (this.isReactComponent(path.node.id?.name)) {
          this.stats.totalComponents++;
        }
      },
    });
  }

  private checkMemoUsage(path: any, filePath: string) {
    // Check for common anti-patterns
    const deps = path.node.arguments[1];
    if (!deps) {
      this.stats.suspiciousPatterns.push(`Missing dependencies in useMemo at ${filePath}`);
    }
  }

  private checkCallbackUsage(path: any, filePath: string) {
    // Check for unnecessary callbacks
    const func = path.node.arguments[0];
    if (func?.body?.body?.length === 1) {
      // Single statement callbacks might not need memoization
      this.stats.suspiciousPatterns.push(`Possibly unnecessary useCallback at ${filePath}`);
    }
  }

  private isReactComponent(name?: string): boolean {
    return !!name && /^[A-Z]/.test(name);
  }

  generateReport() {
    console.log('=== Optimization Audit Report ===');
    console.table({
      'Total Components': this.stats.totalComponents,
      'useMemo Calls': this.stats.useMemo,
      'useCallback Calls': this.stats.useCallback,
      'React.memo Wraps': this.stats.ReactMemo,
      'Suspicious Patterns': this.stats.suspiciousPatterns.length,
    });

    if (this.stats.suspiciousPatterns.length > 0) {
      console.log('\n⚠️ Suspicious Patterns Found:');
      this.stats.suspiciousPatterns.forEach((pattern) => {
        console.log(`  - ${pattern}`);
      });
    }

    // Calculate optimization density
    const optimizationDensity =
      (this.stats.useMemo + this.stats.useCallback + this.stats.ReactMemo) /
      this.stats.totalComponents;

    console.log(`\nOptimization Density: ${optimizationDensity.toFixed(2)} per component`);

    if (optimizationDensity > 3) {
      console.log(
        '⚠️ High optimization density detected. The compiler will likely help significantly.',
      );
    }
  }
}

// Run the audit
const auditor = new OptimizationAuditor();
const srcDir = './src';

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      auditor.analyzeFile(filePath);
    }
  });
}

walkDir(srcDir);
auditor.generateReport();
```

### الخطوة 3: أصلح انتهاكات قواعد React

```typescript
// Common violations that break compiler optimization

// ❌ Bad: Side effects during render
function BrokenComponent({ userId }: { userId: string }) {
  // This breaks compiler assumptions
  localStorage.setItem('lastUserId', userId);

  return <div>User: {userId}</div>;
}

// ✅ Good: Side effects in useEffect
function FixedComponent({ userId }: { userId: string }) {
  useEffect(() => {
    localStorage.setItem('lastUserId', userId);
  }, [userId]);

  return <div>User: {userId}</div>;
}

// ❌ Bad: Mutating props or state
function MutatingComponent({ items }: { items: Item[] }) {
  // Compiler can't track mutations
  items.sort((a, b) => a.name.localeCompare(b.name));

  return <List items={items} />;
}

// ✅ Good: Create new arrays/objects
function ImmutableComponent({ items }: { items: Item[] }) {
  // Compiler can optimize immutable operations
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return <List items={sortedItems} />;
}

// ❌ Bad: Conditional hooks
function ConditionalHooks({ isSpecial }: { isSpecial: boolean }) {
  if (isSpecial) {
    // Breaks React's rules and compiler optimization
    useState(0);
  }

  return <div>Component</div>;
}

// ✅ Good: Hooks at top level
function ProperHooks({ isSpecial }: { isSpecial: boolean }) {
  const [state] = useState(0);
  // Use the state conditionally, not the hook
  const value = isSpecial ? state : null;

  return <div>Component</div>;
}
```

## تفعيل مصرّف React

ملاحظة: يركّز هذا الدليل على إعداد Vite. أما Webpack وغيره من المُجمِّعات فخارج النطاق حاليًا.

### التثبيت والإعداد

```bash
# Install the compiler
npm install --save-dev @react/compiler
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              compilationMode: 'opt-in',
              enableDebugInfo: true,
            },
          ],
        ],
      },
    }),
  ],
});
```

### استراتيجية الترحيل التدريجي

ابدأ بالوضع الاختياري (opt-in) ثم توسّع تدريجيًا:

```typescript
// Use directives to control compilation per file

// Option 1: Opt-in specific components
'use compiler';

function OptimizedComponent() {
  // This component will be compiled
  return <div>Optimized by compiler</div>;
}

// Option 2: Opt-out specific components
('use no-compiler');

function LegacyComponent() {
  // This component won't be compiled
  // Useful for components with complex patterns
  return <div>Manual optimizations preserved</div>;
}

// Option 3: File-level configuration
// At the top of the file
('use compiler');

// All components in this file will be compiled
export function Component1() {
  /* ... */
}
export function Component2() {
  /* ... */
}
export function Component3() {
  /* ... */
}
```

## قياس أثر المصرّف

### المقاييس قبل التفعيل وبعده

```typescript
// Create a performance baseline before enabling compiler
class PerformanceBaseline {
  private metrics: Map<string, number[]> = new Map();

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  getBaseline(name: string) {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return null;

    return {
      mean: values.reduce((a, b) => a + b, 0) / values.length,
      median: this.median(values),
      p95: this.percentile(values, 95),
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }

  private median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index];
  }

  compareWithBaseline(name: string, newValue: number) {
    const baseline = this.getBaseline(name);
    if (!baseline) return null;

    const improvement = ((baseline.mean - newValue) / baseline.mean) * 100;

    return {
      baseline: baseline.mean,
      current: newValue,
      improvement: improvement.toFixed(2) + '%',
      significant: Math.abs(improvement) > 10,
    };
  }
}

// Use in your app
const baseline = new PerformanceBaseline();

function MeasuredComponent() {
  useEffect(() => {
    const start = performance.now();

    // Component work...

    const duration = performance.now() - start;
    baseline.recordMetric('ComponentRender', duration);

    // After enabling compiler, compare
    const comparison = baseline.compareWithBaseline('ComponentRender', duration);
    if (comparison?.significant) {
      console.log(`Compiler impact: ${comparison.improvement}`);
    }
  }, []);

  return <div>Measured Component</div>;
}
```

### مقارنة مقاييس المستخدمين الحقيقيين

```typescript
// Track real user metrics before and after compiler
class RealUserMetrics {
  private enabled = false;
  private sessionId = this.generateSessionId();

  constructor(private compilerEnabled: boolean) {}

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  trackCoreWebVitals() {
    // Using web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      getCLS((metric) => this.sendMetric('CLS', metric.value));
      getFID((metric) => this.sendMetric('FID', metric.value));
      getLCP((metric) => this.sendMetric('LCP', metric.value));
      getFCP((metric) => this.sendMetric('FCP', metric.value));
      getTTFB((metric) => this.sendMetric('TTFB', metric.value));
    });
  }

  trackInteraction(name: string, duration: number) {
    this.sendMetric('interaction', duration, { name });
  }

  trackRenderTime(componentName: string, duration: number) {
    this.sendMetric('render', duration, {
      component: componentName,
      compilerEnabled: this.compilerEnabled,
    });
  }

  private sendMetric(name: string, value: number, metadata?: Record<string, any>) {
    // Send to your analytics service
    if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
      const data = {
        metric: name,
        value,
        sessionId: this.sessionId,
        compilerEnabled: this.compilerEnabled,
        timestamp: Date.now(),
        ...metadata,
      };

      navigator.sendBeacon('/api/metrics', JSON.stringify(data));
    }
  }
}

// Initialize metrics tracking
const metrics = new RealUserMetrics(process.env.REACT_APP_COMPILER_ENABLED === 'true');

metrics.trackCoreWebVitals();
```

## متى لا يستطيع المصرّف المساعدة

فهم حدود المصرّف أمر بالغ الأهمية:

### أنماط الشيفرة الديناميكية

```typescript
// ❌ Compiler can't optimize dynamic property access
function DynamicComponent({ data, fields }: Props) {
  const values = fields.map((field) => {
    // Dynamic property access prevents optimization
    return data[field];
  });

  return <div>{values.join(', ')}</div>;
}

// ✅ Better: Explicit property access when possible
function ExplicitComponent({ data }: Props) {
  // Compiler can track these dependencies
  const { name, email, phone } = data;

  return (
    <div>
      {name}, {email}, {phone}
    </div>
  );
}
```

### الاعتمادات الخارجية

```typescript
// ❌ Compiler can't optimize external library calls
function ExternalLibComponent() {
  // Lodash operations aren't optimized by React compiler
  const result = _.debounce(() => {
    console.log('Debounced');
  }, 300);

  return <button onClick={result}>Click</button>;
}

// ✅ Better: Use React patterns the compiler understands
function OptimizableComponent() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### منطق الحالة المعقّد

```typescript
// ❌ Compiler struggles with complex reducer logic
function ComplexReducerComponent() {
  const [state, dispatch] = useReducer(complexReducer, initialState);

  // Complex reducer with many cases
  function complexReducer(state: State, action: Action) {
    switch (action.type) {
      case 'COMPLEX_MUTATION':
        // Nested object updates
        return {
          ...state,
          nested: {
            ...state.nested,
            deep: {
              ...state.nested.deep,
              value: action.payload,
            },
          },
        };
      // Many more cases...
    }
  }

  return <div>{/* Component JSX */}</div>;
}

// ✅ Better: Simpler state patterns
function SimplerStateComponent() {
  // Break down complex state into smaller pieces
  const [basicState, setBasicState] = useState(initialBasic);
  const [nestedState, setNestedState] = useState(initialNested);

  // Compiler can optimize these simpler patterns
  const updateNested = useCallback((value: string) => {
    setNestedState((prev) => ({ ...prev, value }));
  }, []);

  return <div>{/* Component JSX */}</div>;
}
```

## أنماط الترحيل وأفضل الممارسات

### النمط 1: إزالة حفظ النتائج الزائد

```typescript
// Before compiler: Manually optimized
function BeforeCompiler({ items, filter }: Props) {
  // Manual memoization everywhere
  const filteredItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter],
  );

  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  const totals = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  return (
    <div>
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
      <Total value={totals} />
    </div>
  );
}

// After compiler: Clean code, same performance
function AfterCompiler({ items, filter }: Props) {
  // Compiler handles optimization
  const filteredItems = items.filter((item) => item.category === filter);

  const handleClick = (id: string) => {
    console.log('Clicked:', id);
  };

  const totals = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
      <Total value={totals} />
    </div>
  );
}
```

### النمط 2: الإبقاء على التحسينات اليدوية الاستراتيجية

```typescript
// Some optimizations should stay even with the compiler

function StrategicOptimization({ data }: { data: LargeDataset }) {
  // Keep: Expensive initialization
  const processedData = useMemo(() => {
    // Explicitly expensive operation
    console.time('ProcessingData');
    const result = performExpensiveProcessing(data);
    console.timeEnd('ProcessingData');
    return result;
  }, [data]);

  // Remove: Trivial memoization
  // const simpleCalc = useMemo(() => x + y, [x, y]);
  // Becomes:
  const simpleCalc = x + y; // Compiler handles this

  // Keep: Ref callbacks for DOM measurements
  const measureRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // DOM measurements need manual optimization
      const rect = node.getBoundingClientRect();
      reportMeasurement(rect);
    }
  }, []);

  return <div ref={measureRef}>{/* Content */}</div>;
}
```

### النمط 3: تصميم مكوّنات صديقة للمصرّف

```typescript
// Design components to maximize compiler optimization

// ✅ Compiler-friendly: Pure, predictable
function CompilerFriendly({ user, posts }: Props) {
  // Simple, direct data access
  const userPosts = posts.filter((p) => p.authorId === user.id);
  const postCount = userPosts.length;

  // Clear component boundaries
  return (
    <div>
      <UserHeader user={user} postCount={postCount} />
      <PostList posts={userPosts} />
    </div>
  );
}

// ❌ Compiler-hostile: Too much indirection
function CompilerHostile({ data }: Props) {
  // Complex property chains
  const value = data?.nested?.deep?.maybe?.exists || fallback;

  // Dynamic method calls
  const processor = processors[data.type];
  const result = processor?.(data);

  // Unclear dependencies
  return <div>{result}</div>;
}
```

## تصحيح مشكلات المصرّف

عندما لا تسير الأمور كما هو متوقّع:

```typescript
// Enable compiler debug mode
const CompilerDebugger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      if (window.__REACT_COMPILER_DEBUG__) {
        console.log('Compiler Debug Info:', window.__REACT_COMPILER_DEBUG__);
      }
    }
  }, []);

  return null;
};

// Add compiler hints for edge cases
function HintedComponent({ complexProp }: Props) {
  // Compiler hint: This is expensive
  /* @compiler-expensive */
  const result = veryExpensiveOperation(complexProp);

  // Compiler hint: Don't optimize this
  /* @compiler-skip */
  const dynamic = dynamicOperation();

  // Compiler hint: These are stable
  /* @compiler-stable */
  const config = { ...defaultConfig, ...userConfig };

  return <div>{/* Component content */}</div>;
}
```

## لوحة مقارنة الأداء

ابنِ لوحة معلومات لتتبّع فعالية المصرّف:

```typescript
function CompilerDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [compilerEnabled] = useState(() => process.env.REACT_APP_COMPILER === 'true');

  useEffect(() => {
    // Collect metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const newMetrics = entries.map((entry) => ({
        name: entry.name,
        duration: entry.duration,
        timestamp: entry.startTime,
        compilerEnabled,
      }));

      setMetrics((prev) => [...prev, ...newMetrics]);
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, [compilerEnabled]);

  const analysis = useMemo(() => {
    const grouped = metrics.reduce(
      (acc, metric) => {
        const key = `${metric.name}-${metric.compilerEnabled}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(metric.duration);
        return acc;
      },
      {} as Record<string, number[]>,
    );

    return Object.entries(grouped).map(([key, durations]) => {
      const [name, enabled] = key.split('-');
      return {
        name,
        compilerEnabled: enabled === 'true',
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        min: Math.min(...durations),
        max: Math.max(...durations),
        count: durations.length,
      };
    });
  }, [metrics]);

  return (
    <div className="compiler-dashboard">
      <h2>Compiler Performance Impact</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Without Compiler</th>
            <th>With Compiler</th>
            <th>Improvement</th>
          </tr>
        </thead>
        <tbody>
          {analysis.map((metric) => {
            const withoutCompiler = analysis.find(
              (m) => m.name === metric.name && !m.compilerEnabled,
            );
            const withCompiler = analysis.find((m) => m.name === metric.name && m.compilerEnabled);

            if (!withoutCompiler || !withCompiler) return null;

            const improvement =
              ((withoutCompiler.avg - withCompiler.avg) / withoutCompiler.avg) * 100;

            return (
              <tr key={metric.name}>
                <td>{metric.name}</td>
                <td>{withoutCompiler.avg.toFixed(2)}ms</td>
                <td>{withCompiler.avg.toFixed(2)}ms</td>
                <td className={improvement > 0 ? 'positive' : 'negative'}>
                  {improvement.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

## قائمة تدقيق الترحيل

قبل إعلان اكتمال ترحيلك:

```typescript
interface MigrationChecklist {
  preparation: {
    strictMode: 'Enable React.StrictMode everywhere';
    rulesOfReact: 'Fix all Rules of React violations';
    baseline: 'Measure performance baseline metrics';
    tests: 'Ensure all tests pass before starting';
  };

  implementation: {
    gradual: 'Start with opt-in mode';
    measure: 'Compare metrics after each phase';
    debug: 'Enable debug mode in development';
    monitor: 'Watch for runtime errors or warnings';
  };

  validation: {
    performance: 'Verify performance improvements';
    functionality: 'Test all features still work';
    bundle: 'Check bundle size impact';
    memory: 'Monitor memory usage changes';
  };

  cleanup: {
    memoization: 'Remove unnecessary manual optimizations';
    comments: 'Update code comments about optimization';
    documentation: 'Document compiler configuration';
    monitoring: 'Set up ongoing performance tracking';
  };
}
```

## إرشادات تبنّي لن تلدغك

ابدأ بدليل «التبنّي التدريجي» الرسمي: فعّل إضافة Babel، وقيّد التصريف بمجلد أو راية ميزة (feature flag)، واتّكئ على التوجيهات. فضّل وضع الاستنتاج الافتراضي؛ واستثنِ المواضع الساخنة صراحةً بتوجيه بينما تصلح روائح الشيفرة. ([React](https://react.dev/learn/react-compiler/installation))

```typescript
function HotPathPanel() {
  'use no memo'; // temporary escape hatch while refactoring
  // …
}
```

ويوصي التوثيق بهذا كسياج مؤقّت؛ وهناك أيضًا [توجيه `'use memo'`](https://react.dev/reference/react-compiler/directives/use-no-memo)، لكنك نادرًا ما تحتاجه خارج وضع التعليقات التوضيحية.

فعّله — عن قصد. سيمحو المصرّف كثيرًا من الشيفرة النموذجية الحشوية الخاصة بالحفظ، ويمنع أصنافًا كاملة من إعادات التصيير العارضة، لكنه لن يطمس مشكلات معمارية أو سوء استخدام للتأثيرات. تبنَّه تدريجيًا، وقِس، واحتفظ بمخرج طوارئ سهل في المواضع القليلة التي يتعارض فيها مع أنماطك الحالية. ثم دعه يفعل ما يفعل.

يمكنني توليد قائمة تدقيق قصيرة «فعّل ← قيّد ← قِس ← وسّع» مفصّلة على مقوّماتك التقنية (Next + Vite + Tailwind + TS) متى شئت.

## الخلاصة

مصرّف React أداة قوية يمكنها تبسيط مستودعك تبسيطًا جذريًا مع الحفاظ على الأداء أو تحسينه. ومفتاح التبنّي الناجح هو فهم ما يستطيع فعله وما لا يستطيع، وتهيئة مستودعك تهيئة صحيحة، وقياس الأثر الفعلي في تطبيقك تحديدًا.

ابدأ بترحيل تدريجي، وقِس كل شيء، ولا تخشَ الإبقاء على بعض التحسينات اليدوية حيث تكون منطقية. فالمصرّف لا يهدف إلى استبدال كل التحسين اليدوي — بل إلى أتمتة التحسينات الروتينية لتتفرّغ للقرارات المعمارية التي تهمّ حقًّا.

تذكّر: أفضل تحسين للأداء هو الذي لا تحتاج إلى التفكير فيه. ويقرّبنا مصرّف React من تلك الغاية، إذ يتيح لنا كتابة شيفرة React نظيفة وبسيطة مع الحصول على أداء محسّن تلقائيًا.
