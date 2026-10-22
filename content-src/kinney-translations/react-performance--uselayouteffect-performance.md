---
title: "خصائص الأداء في useLayoutEffect"
---

يعمل `useLayoutEffect` تزامنيًا بعد كل تعديلات DOM لكن قبل رسم المتصفح. هذا التوقيت يجعله قويًا في منع العيوب البصرية، لكنه قد يكون مكلفًا للأداء. لنستكشف متى تحتاجه، ومتى لا تحتاجه، وكيف تقيس أثره على استجابة تطبيقك.

الفكرة الجوهرية: يجبر `useLayoutEffect` React على حجب عملية رسم المتصفح حتى ينتهي تأثيرك. قد يكون هذا بالضبط ما تحتاجه — أو بالضبط ما يقتل معدل الإطارات لديك.

## فهم فرق التوقيت

يوفر React خُطّافين للتأثيرات الجانبية التي تعمل بعد التصيير: `useEffect` و`useLayoutEffect`. الفرق يكمن في علاقتهما بخط أنابيب التصيير في المتصفح.

```typescript
function TimingDemo() {
  const [count, setCount] = useState(0);

  // ✅ Runs asynchronously after paint
  useEffect(() => {
    console.log('useEffect runs after paint');
  }, [count]);

  // 🟡 Runs synchronously before paint (blocking)
  useLayoutEffect(() => {
    console.log('useLayoutEffect runs before paint');
  }, [count]);

  return <div>Count: {count}</div>;
}
```

إليك ما يحدث أثناء دورة تصيير نموذجية:

1. يصيّر React مكوّنك
2. تُطبَّق تعديلات DOM
3. **يعمل `useLayoutEffect` تزامنيًا** ← يحجب هنا
4. يرسم المتصفح الشاشة
5. يعمل `useEffect` بشكل غير متزامن

هذا التنفيذ التزامني هو القوة الخارقة لـ `useLayoutEffect` ومزلق أدائه في الوقت نفسه.

## متى تحتاج `useLayoutEffect` فعلًا

استخدم `useLayoutEffect` عندما تحتاج إلى القراءة من DOM أو الكتابة إليه قبل أن يرسم المتصفح — عادةً لمنع الوميض البصري أو قياس العناصر.

### قياس عناصر DOM

أكثر حالة استخدام مشروعة شيوعًا هي قياس عناصر تعتمد على محتوى ديناميكي:

```typescript
function AutoResizingTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  // ✅ Good use of useLayoutEffect - prevents visible height jumps
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to measure natural height
    textarea.style.height = '0px';
    const scrollHeight = textarea.scrollHeight;

    // Apply the measured height
    textarea.style.height = `${scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ resize: 'none', overflow: 'hidden' }}
    />
  );
}
```

### منع اهتزاز التخطيط

عندما تحتاج إلى قراءة خصائص التخطيط وكتابتها فورًا:

```typescript
function ScrollSyncedHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Read and write in the same frame to prevent thrashing
    const opacity = Math.max(0, 1 - scrollY / 100);
    header.style.opacity = opacity.toString();

    // Position sticky header based on scroll
    header.style.transform = `translateY(${Math.max(0, scrollY - 50)}px)`;
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header ref={headerRef}>Scroll-synced header</header>;
}
```

## خصائص الأداء والتكاليف

لـ `useLayoutEffect` آثار أداء قابلة للقياس لأنه يحجب الخيط الرئيسي خلال مسار التصيير الحرج.

### حجب عملية الرسم

كل جزء من الثانية يُنفق داخل `useLayoutEffect` يؤخّر مباشرة متى يرى المستخدمون تحديثاتك:

```typescript
function ExpensiveLayoutEffect() {
  const [data, setData] = useState<number[]>([]);

  // ❌ Bad - blocks paint for expensive computation
  useLayoutEffect(() => {
    // Simulating expensive DOM measurements
    const measurements = [];
    for (let i = 0; i < 1000; i++) {
      const element = document.querySelector(`[data-item="${i}"]`);
      if (element) {
        measurements.push(element.getBoundingClientRect());
      }
    }

    console.log('Blocking paint for', measurements.length, 'measurements');
  }, [data]);

  // ✅ Better - use useEffect unless sync timing is critical
  useEffect(() => {
    // Same expensive work, but doesn't block paint
    // User sees the update immediately, measurements happen after
  }, [data]);
}
```

### الأثر على الميزات التزامنية

يعمل `useLayoutEffect` تزامنيًا حتى في الوضع التزامني (Concurrent Mode) في React، ما قد يتعارض مع ميزات مثل تقطيع الوقت:

```typescript
function ConcurrentUnfriendly() {
  const [items, setItems] = useState<Item[]>([]);

  // This blocks even during concurrent rendering
  useLayoutEffect(() => {
    // Heavy DOM work that can't be interrupted
    items.forEach((item, index) => {
      const element = document.querySelector(`[data-id="${item.id}"]`);
      if (element) {
        // Expensive layout calculations
        element.style.transform = calculateTransform(item, index);
      }
    });
  }, [items]);
}
```

## قياس أثر الأداء

استخدم React DevTools Profiler وأدوات أداء المتصفح لقياس التكلفة الفعلية:

```typescript
function MeasuredLayoutEffect() {
  const [trigger, setTrigger] = useState(0);

  useLayoutEffect(() => {
    const start = performance.now();

    // Your layout effect work
    document.querySelectorAll('.measured-element').forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Do something with measurements
    });

    const end = performance.now();
    console.log(`Layout effect took ${end - start}ms`);
  }, [trigger]);

  return <button onClick={() => setTrigger((t) => t + 1)}>Trigger Layout Effect</button>;
}
```

> **نصيحة**
>
> استخدم `performance.mark()` و`performance.measure()` لتنميط أكثر تطورًا يتكامل مع أدوات مطوّري المتصفح.

## استراتيجيات التحسين

### تجميع عمليات DOM

عندما تضطر إلى استخدام `useLayoutEffect`، جمّع عمليات DOM لتقليل اهتزاز التخطيط:

```typescript
function BatchedLayoutOperations() {
  const [items, setItems] = useState<Item[]>([]);

  useLayoutEffect(() => {
    // ❌ Bad - causes multiple layout recalculations
    items.forEach((item) => {
      const el = document.querySelector(`[data-id="${item.id}"]`);
      if (el) {
        el.style.height = `${item.height}px`; // Layout recalc
        el.style.width = `${item.width}px`; // Layout recalc
      }
    });

    // ✅ Better - batch style changes
    const updates = items.map((item) => ({
      element: document.querySelector(`[data-id="${item.id}"]`),
      styles: { height: `${item.height}px`, width: `${item.width}px` },
    }));

    // Apply all changes together
    updates.forEach(({ element, styles }) => {
      if (element) {
        Object.assign(element.style, styles);
      }
    });
  }, [items]);
}
```

### استخدم ResizeObserver عند الاقتضاء

لقياس العناصر، فكّر في `ResizeObserver` كبديل لتأثيرات التخطيط:

```typescript
function ResizeObserverExample() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // ResizeObserver is more efficient than layout effects for size changes
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={elementRef}>
      Content that might resize: {dimensions.width}x{dimensions.height}
    </div>
  );
}
```

## أنماط مضادة شائعة يجب تجنّبها

### استخدام `useLayoutEffect` لتأثيرات جانبية غير متعلقة بـ DOM

```typescript
// ❌ Bad - doesn't need to block paint
useLayoutEffect(() => {
  // API calls don't need synchronous timing
  fetchUserData(userId).then(setUser);
}, [userId]);

// ❌ Bad - local storage doesn't need to block paint
useLayoutEffect(() => {
  localStorage.setItem('theme', currentTheme);
}, [currentTheme]);

// ✅ Good - use regular useEffect instead
useEffect(() => {
  fetchUserData(userId).then(setUser);
}, [userId]);
```

### الإفراط في استخدامه بذريعة «يبدو أسرع»

```typescript
function OverEngineeredComponent() {
  const [data, setData] = useState(null);

  // ❌ Bad - no visual benefit, just blocking paint
  useLayoutEffect(() => {
    // This doesn't prevent visual flicker, just delays everything
    processData(data);
  }, [data]);

  // ✅ Better - let the user see the update immediately
  useEffect(() => {
    processData(data);
  }, [data]);
}
```

## اعتبارات React 19

تجعل الميزات التزامنية في React 19 استخدام `useLayoutEffect` أكثر أهمية بأن يكون بحكمة. فالنموذج الجديد للتصيير يجعل العمل التزامني الحاجب أكثر وضوحًا للمستخدمين.

```typescript
function React19Aware() {
  const [items, setItems] = useState<Item[]>([]);

  // Consider if you can use startTransition to make updates non-blocking
  const updateItems = useCallback((newItems: Item[]) => {
    startTransition(() => {
      setItems(newItems);
    });
  }, []);

  // Only use layout effect if you absolutely need sync DOM access
  useLayoutEffect(() => {
    // Measure only what you must measure synchronously
    const criticalMeasurements = measureCriticalElements();
    applyCriticalUpdates(criticalMeasurements);
  }, [items]);

  // Move non-critical work to regular effects
  useEffect(() => {
    updateNonCriticalUI(items);
  }, [items]);
}
```

## اختبار أداء تأثير التخطيط

أنشئ معايير أداء للتحقق من صحة استخدامك لـ `useLayoutEffect`:

```typescript
function PerformanceTest() {
  const [iterations, setIterations] = useState(0);
  const timeRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    const start = performance.now();

    // Simulate your actual layout work
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div');
      document.body.appendChild(el);
      const rect = el.getBoundingClientRect(); // Force layout
      document.body.removeChild(el);
    }

    const duration = performance.now() - start;
    timeRef.current.push(duration);

    if (timeRef.current.length > 10) {
      const avg = timeRef.current.reduce((a, b) => a + b) / timeRef.current.length;
      console.log(`Average layout effect time: ${avg.toFixed(2)}ms`);
      timeRef.current = [];
    }
  }, [iterations]);

  return (
    <button onClick={() => setIterations((i) => i + 1)}>
      Run Performance Test (iterations: {iterations})
    </button>
  );
}
```
