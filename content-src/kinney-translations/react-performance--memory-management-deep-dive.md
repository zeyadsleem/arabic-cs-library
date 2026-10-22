---
title: "إدارة الذاكرة بعمق"
---

بنيت تطبيق React جميلًا. أحبّه المستخدمون. ثم بدأت تذاكر الدعم تتوافد: «يصبح التطبيق أبطأ مع الوقت.» «انهار تبويب المتصفّح لديّ.» «إنه يستهلك 2 غيغابايت من الذاكرة العشوائية!» هل يبدو هذا مألوفًا؟ أهلًا بك في عالم إدارة ذاكرة JavaScript، حيث ينشئ حتى أفضل المطوّرين بالخطأ تسرّبات ذاكرة تخنق تطبيقاتهم ببطء.

وإليك المشكلة: نموذج React التصريحي يجعل من السهل نسيان الذاكرة. تُركَّب المكوّنات، وتُفكَّك، وتُعاد تصييرها… لكن ماذا عن كل مستمعات الأحداث والمؤقّتات والاشتراكات والإغلاقات التي أنشأتها على الطريق؟ إنها ما زالت هناك، تحتفظ بالمراجع، وتمنع جمع المهملات، وتستهلك ذاكرة المستخدمين ببطء.

لنغصّ في أعماق كيفية عمل الذاكرة في JavaScript وReact، وكيفية تحديد التسرّبات وإصلاحها، وكيفية بناء تطبيقات تعمل أيامًا دون تدهور.

## فهم إدارة الذاكرة في JavaScript

قبل أن نصلح مشكلات الذاكرة، علينا أن نفهم كيف تدير JavaScript الذاكرة.

```typescript
interface MemoryLifecycle {
  allocation: 'automatic';
  usage: 'tracked by references';
  deallocation: 'garbage collection';
}

// Memory allocation happens automatically
const user = { name: 'Alice' }; // Allocates memory for object
const numbers = [1, 2, 3]; // Allocates memory for array
const handler = () => {}; // Allocates memory for function

// Memory is freed when no longer referenced
let data = { large: 'dataset' };
data = null; // Original object can now be garbage collected
```

### جامع المهملات

تستخدم JavaScript جمع المهملات بالتحديد والكنس (mark-and-sweep):

```typescript
interface GarbageCollectionProcess {
  markPhase: 'identify reachable objects from roots';
  sweepPhase: 'free memory of unreachable objects';
  roots: ['global object', 'currently executing stack', 'DOM references'];
}

// Objects reachable from roots stay in memory
const globalRef = { keepMe: true }; // Root reference

function createLeak() {
  const localData = { temporary: true };

  // ❌ Creates a leak - global reference to local data
  window.leaked = localData;

  // ✅ No leak - local data can be collected
  const isolated = { temporary: true };
  return null;
}
```

## مصادر تسرّبات الذاكرة في معمارية React

تُنشئ دورة حياة مكوّنات React وخُطّافاتها أنماطًا محدّدة تحدث فيها تسرّبات الذاكرة عادةً. ولمعرفة سير عمل الكشف والتنقيح العملي، راجع [كشف تسرّبات الذاكرة](https://stevekinney.com/courses/react-performance/memory-leak-detection).

### اعتبارات ذاكرة خاصة بـ React

```typescript
// React's reference management challenges
interface ReactMemoryConsiderations {
  componentLifecycle: 'mount → update → unmount';
  closureCapture: 'hooks capture variables from render scope';
  referenceStability: 'new objects created on every render';
  effectCleanup: 'manual cleanup required for side effects';
}

// Common React patterns that affect memory
const MemoryPatterns: React.FC = () => {
  // ✅ Stable references reduce memory pressure
  const stableCallback = useCallback(() => {
    // Function created once, reused across renders
  }, []);

  // ❌ New object every render
  const unstableStyle = { color: 'red', margin: 10 };

  // ✅ Stable style object
  const stableStyle = useMemo(() => ({
    color: 'red',
    margin: 10
  }), []);

  return <div style={stableStyle} onClick={stableCallback} />;
};
```

### أنماط ذاكرة الإغلاقات

فهم كيفية تفاعل الإغلاقات مع دورات التصيير في React:

```typescript
// Closure scope and memory implications
const ClosureMemoryExample: React.FC<{ data: LargeDataset }> = ({ data }) => {
  // ❌ Closure captures entire props object
  const processData = useCallback(() => {
    return data.items.map(item => transformItem(item));
  }, [data]); // Entire data object retained

  // ✅ Extract minimal closure scope
  const items = useMemo(() => data.items, [data.items]);
  const processDataOptimized = useCallback(() => {
    return items.map(item => transformItem(item));
  }, [items]); // Only items array retained

  // ✅ Even better: use refs for large stable data
  const dataRef = useRef(data);
  useEffect(() => { dataRef.current = data; }, [data]);

  const processWithRef = useCallback(() => {
    return dataRef.current.items.map(item => transformItem(item));
  }, []); // No closure capture at all

  return <ProcessedList processor={processWithRef} />;
};
```

## أنماط متقدّمة لتحسين الذاكرة

### WeakMap لبيانات المكوّن الوصفية

استخدم WeakMap للبيانات الوصفية التي ينبغي أن تُجمع مع المكوّنات:

```typescript
// Component metadata that doesn't prevent GC
const componentMetadata = new WeakMap<object, Metadata>();

const TrackedComponent: React.FC<Props> = (props) => {
  const componentRef = useRef({});

  useEffect(() => {
    // Metadata will be GC'd when component unmounts
    componentMetadata.set(componentRef.current, {
      mountTime: Date.now(),
      renderCount: 0,
    });

    // No need to manually clean WeakMap on unmount
    // Entry will be GC'd automatically
  }, []);

  return <div>{/* Component content */}</div>;
};
```

### تجميع الكائنات للتخصيصات المتكرّرة

أعد استخدام الكائنات بدل إنشاء كائنات جديدة:

```typescript
class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private reset: (obj: T) => void;

  constructor(factory: () => T, reset: (obj: T) => void) {
    this.factory = factory;
    this.reset = reset;
  }

  acquire(): T {
    return this.pool.pop() || this.factory();
  }

  release(obj: T): void {
    this.reset(obj);
    this.pool.push(obj);
  }
}

// Use in React component
const ParticleSystem: React.FC = () => {
  const particlePool = useMemo(() =>
    new ObjectPool<Particle>(
      () => ({ x: 0, y: 0, vx: 0, vy: 0, active: false }),
      (p) => { p.active = false; }
    ), []
  );

  const spawnParticle = useCallback(() => {
    const particle = particlePool.acquire();
    particle.x = Math.random() * 100;
    particle.y = Math.random() * 100;
    particle.active = true;
    return particle;
  }, [particlePool]);

  // Return particles to pool when done
  const destroyParticle = useCallback((particle: Particle) => {
    particlePool.release(particle);
  }, [particlePool]);

  return <Canvas onSpawn={spawnParticle} onDestroy={destroyParticle} />;
};
```

### إدارة حالة فعّالة في استهلاك الذاكرة

قلّل البصمة الذاكرية للحالة:

```typescript
// ❌ Storing entire objects in state
const InefficientState: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Duplicates user data in memory
  return <UserList users={users} selected={selectedUser} />;
};

// ✅ Store IDs and derive data
const EfficientState: React.FC = () => {
  const [userMap] = useState(() => new Map<string, User>());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedUser = selectedId ? userMap.get(selectedId) : null;

  return <UserList users={Array.from(userMap.values())} selected={selectedUser} />;
};
```

## تنميط الذاكرة وكشفها

### استخدام مُنمِّط ذاكرة Chrome DevTools

```typescript
// Mark important operations for profiling
const ProfiledOperation: React.FC = () => {
  const performOperation = useCallback(() => {
    // Mark in timeline
    performance.mark('operation-start');

    // Do expensive operation
    const result = expensiveOperation();

    performance.mark('operation-end');
    performance.measure('operation', 'operation-start', 'operation-end');

    // Log for analysis
    const measure = performance.getEntriesByName('operation')[0];
    console.log(`Operation took ${measure.duration}ms`);

    return result;
  }, []);

  return <button onClick={performOperation}>Run Operation</button>;
};
```

### الكشف الآلي عن تسرّبات الذاكرة

ابنِ مراقبة الذاكرة في تطبيقك:

```typescript
class MemoryMonitor {
  private baseline: number = 0;
  private threshold: number;
  private checkInterval: number;
  private intervalId?: NodeJS.Timeout;

  constructor(thresholdMB: number = 50, checkIntervalMs: number = 30000) {
    this.threshold = thresholdMB * 1024 * 1024;
    this.checkInterval = checkIntervalMs;
  }

  start() {
    if (!performance.memory) {
      console.warn('Memory API not available');
      return;
    }

    this.baseline = performance.memory.usedJSHeapSize;

    this.intervalId = setInterval(() => {
      const current = performance.memory.usedJSHeapSize;
      const increase = current - this.baseline;

      if (increase > this.threshold) {
        console.error(`Memory leak detected! Increase: ${(increase / 1024 / 1024).toFixed(2)}MB`);
        this.reportLeak(increase);
      }
    }, this.checkInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private reportLeak(bytes: number) {
    // Send to monitoring service
    fetch('/api/metrics/memory-leak', {
      method: 'POST',
      body: JSON.stringify({
        increase: bytes,
        current: performance.memory.usedJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: Date.now()
      })
    });
  }
}

// Use in your app
const App: React.FC = () => {
  useEffect(() => {
    const monitor = new MemoryMonitor();
    monitor.start();

    return () => monitor.stop();
  }, []);

  return <Router />;
};
```

### لقطات الذاكرة للاختبار

ادمج اختبار الذاكرة في مجموعة اختباراتك:

```typescript
// memory.test.ts
import { test, expect } from '@playwright/test';

test('should not leak memory on navigation', async ({ page }) => {
  await page.goto('/');

  // Take initial snapshot
  const initialMemory = await page.evaluate(() => {
    if (performance.memory) {
      return performance.memory.usedJSHeapSize;
    }
    return 0;
  });

  // Navigate through app
  for (let i = 0; i < 10; i++) {
    await page.click('[data-testid="next-page"]');
    await page.waitForLoadState('networkidle');
    await page.goBack();
  }

  // Force garbage collection (if available in test environment)
  await page.evaluate(() => {
    if (window.gc) window.gc();
  });

  // Check final memory
  const finalMemory = await page.evaluate(() => {
    if (performance.memory) {
      return performance.memory.usedJSHeapSize;
    }
    return 0;
  });

  // Allow for some growth but flag significant leaks
  const growth = finalMemory - initialMemory;
  const growthMB = growth / 1024 / 1024;

  expect(growthMB).toBeLessThan(10); // Less than 10MB growth
});
```

## إدارة الذاكرة في الإنتاج

### تنفيذ التعامل مع ضغط الذاكرة

استجب لضغط الذاكرة في المتصفّح:

```typescript
const useMemoryPressure = () => {
  const [pressure, setPressure] = useState<'low' | 'moderate' | 'critical'>('low');

  useEffect(() => {
    if (!('memory' in performance)) return;

    const checkPressure = () => {
      const used = performance.memory.usedJSHeapSize;
      const limit = performance.memory.jsHeapSizeLimit;
      const usage = used / limit;

      if (usage > 0.9) {
        setPressure('critical');
      } else if (usage > 0.7) {
        setPressure('moderate');
      } else {
        setPressure('low');
      }
    };

    const interval = setInterval(checkPressure, 5000);
    return () => clearInterval(interval);
  }, []);

  return pressure;
};

const AdaptiveComponent: React.FC = () => {
  const pressure = useMemoryPressure();

  // Adapt behavior based on memory pressure
  const renderQuality = useMemo(() => {
    switch (pressure) {
      case 'critical':
        return 'low'; // Minimal features
      case 'moderate':
        return 'medium'; // Reduced features
      default:
        return 'high'; // Full features
    }
  }, [pressure]);

  return (
    <div>
      {renderQuality === 'high' && <RichVisualizations />}
      {renderQuality === 'medium' && <BasicVisualizations />}
      {renderQuality === 'low' && <TextOnly />}
    </div>
  );
};
```

### تخزين مؤقت واعٍ بالذاكرة

نفّذ ذاكرات مؤقتة تستجيب لضغط الذاكرة:

```typescript
class MemoryAwareCache<K, V> {
  private cache = new Map<K, { value: V; size: number; lastAccess: number }>();
  private totalSize = 0;
  private maxSize: number;

  constructor(maxSizeMB: number = 50) {
    this.maxSize = maxSizeMB * 1024 * 1024;
  }

  set(key: K, value: V, sizeBytes: number) {
    // Remove old entry if exists
    if (this.cache.has(key)) {
      const old = this.cache.get(key)!;
      this.totalSize -= old.size;
    }

    // Evict if necessary
    while (this.totalSize + sizeBytes > this.maxSize && this.cache.size > 0) {
      this.evictLRU();
    }

    this.cache.set(key, {
      value,
      size: sizeBytes,
      lastAccess: Date.now(),
    });
    this.totalSize += sizeBytes;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (entry) {
      entry.lastAccess = Date.now();
      return entry.value;
    }
    return undefined;
  }

  private evictLRU() {
    let oldestKey: K | undefined;
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache) {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldestKey = key;
      }
    }

    if (oldestKey !== undefined) {
      const entry = this.cache.get(oldestKey)!;
      this.totalSize -= entry.size;
      this.cache.delete(oldestKey);
    }
  }

  clear() {
    this.cache.clear();
    this.totalSize = 0;
  }
}
```

## قائمة أفضل الممارسات

✅ **نظّف دائمًا في useEffect:**

- أزل مستمعات الأحداث
- ألغِ المؤقّتات والفترات
- أغلق الاتصالات
- ألغِ الاشتراكات

✅ **قلّل نطاق الإغلاق:**

- استخدم `refs` للحصول على مراجع مستقرة
- استخرج الدوال الثابتة
- احفظ دوال الاستدعاء في الذاكرة المؤقتة بحكمة

✅ **راقب الذاكرة في الإنتاج:**

- تتبّع مقاييس حجم الكومة
- أعدّ كشف التسرّبات
- نبّه عند ضغط الذاكرة

✅ **حسّن إدارة الحالة:**

- وحّد بنى البيانات
- استخدم المعرّفات بدل تكرار الكائنات
- نفّذ التمرير الافتراضي للقوائم الكبيرة

✅ **نمّط بانتظام:**

- خُذ لقطات للكومة أثناء التطوير
- شغّل اختبارات تسرّبات الذاكرة
- راقب الجلسات الطويلة

## الخلاصة

تتطلّب إدارة الذاكرة في React فهم جمع مهملات JavaScript وأنماط React الخاصة معًا:

1. **إدارة المراجع** - تحكّم في أي الكائنات يبقى في الذاكرة عبر التعامل الدقيق مع المراجع
2. **تحسين الإغلاقات** - قلّل احتجاز النطاق في الخُطّافات ودوال الاستدعاء
3. **الوعي بدورة الحياة** - استخدم أنماط التنظيف في React باستمرار
4. **المراقبة في الإنتاج** - تتبّع استهلاك الذاكرة واكشف التسرّبات في التطبيقات الحقيقية

أتقن هذه الأساسيات، وستصبح تسرّبات الذاكرة قابلة للمنع بدل أن تكون غامضة. يتولّى جامع المهملات التفاصيل — ومهمتك أنت إدارة ما يبقى قابلًا للوصول.
