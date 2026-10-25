---
title: "flushSync في react-dom"
lang: ar
source: "https://stevekinney.com/courses/react-performance/flushsync-in-react-dom"
---

التصيير المتزامن (concurrent rendering) في React واحد من أقوى مزاياه — فهو يجمع التحديثات في دفعات، ويرتّب أولويات العمل، ويُبقي تطبيقك سريع الاستجابة عبر تقسيم التصيير إلى قطع. لكن أحيانًا تحتاج إلى إخبار React: «لا، فعلًا، أحتاج أن يحدث هذا التحديث الآن». هنا يأتي دور `flushSync` — أداة حادة تُجبر React على دفع التحديثات فورًا وبشكل متزامن.

تخيّل `flushSync` كفرامل الطوارئ في نظام التصيير لدى React. إنه مفيد للغاية عندما تحتاج إلى التنسيق مع واجهات برمجية أمرية (imperative APIs)، مثل تركيز العناصر أو قياس عقد DOM أو تشغيل الحركات، لكنه يأتي بمقايضات أداء تجعله شيئًا ينبغي أن تلجأ إليه نادرًا وعن قصد.

## ما هو `flushSync`؟

`flushSync` دالة من `react-dom` تُجبر React على دفع أي تحديثات معلّقة بشكل متزامن قبل المتابعة. وعندما تغلّف تحديث حالة داخل `flushSync`، تطبّق React ذلك التحديث على DOM فورًا — بلا تجميع في دفعات، وبلا جدولة متزامنة، وبلا انتظار.

```typescript
import { flushSync } from 'react-dom';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // This update happens immediately
    flushSync(() => {
      setCount(count + 1);
    });

    // By this point, the DOM has been updated
    console.log('DOM is now updated');
  };

  return <div onClick={handleClick}>{count}</div>;
}
```

الفرق الجوهري هو التوقيت: عادةً تجمع React التحديثات في دفعات وتدفعها خلال دورة التصيير التالية. أما مع `flushSync` فأنت تُجبر هذا الدفع على الحدوث فورًا داخل التنفيذ المتزامن الحالي.

## متى تحتاج إلى `flushSync` فعلًا

في معظم الأوقات، لا تحتاج إلى `flushSync`. فالسلوك الافتراضي في React بتجميع التحديثات هو غالبًا ما تريده. لكن هناك سيناريوهات محددة تصبح فيها التحديثات المتزامنة ضرورية:

### التنسيق مع إدارة التركيز

من أكثر الاستخدامات المشروعة شيوعًا إدارة التركيز بعد تغييرات DOM:

```typescript
function SearchableList({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      // We need the DOM to update before focusing
      flushSync(() => {
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
      });

      // Now we can safely focus the newly selected item
      const selectedItem = listRef.current?.querySelector(
        `[data-index="${selectedIndex}"]`,
      ) as HTMLElement;
      selectedItem?.focus();
    }
  };

  const filteredItems = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search items..."
      />
      <ul ref={listRef}>
        {filteredItems.map((item, index) => (
          <li
            key={item}
            data-index={index}
            tabIndex={-1}
            style={{
              backgroundColor: index === selectedIndex ? '#e0e0e0' : 'white',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

من دون `flushSync`، قد يحدث استدعاء التركيز قبل أن تحدّث React الـ DOM، ما يؤدي إلى تركيز العنصر الخطأ أو عدم تركيز أي عنصر إطلاقًا.

### قياس عناصر DOM بعد التحديثات

أحيانًا تحتاج إلى قياس العناصر فورًا بعد تغيّر الحالة:

```typescript
function CollapsiblePanel({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isExpanded) {
      // Expand first, then measure
      flushSync(() => {
        setIsExpanded(true);
      });

      // Now we can measure the actual height
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    } else {
      setIsExpanded(false);
      setHeight(undefined);
    }
  };

  return (
    <div>
      <button onClick={handleToggle}>{isExpanded ? 'Collapse' : 'Expand'}</button>
      <div
        ref={contentRef}
        style={{
          height: isExpanded ? height : 0,
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

هنا نحتاج إلى تصيير المحتوى (موسّعًا) قبل أن نتمكن من قياس ارتفاعه الطبيعي لأجل الحركة.

### التكامل مع مكتبات الطرف الثالث

عند التكامل مع مكتبات تتوقّع تحديثات DOM فورية:

```typescript
function ChartComponent({ data }: { data: ChartData[] }) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleChartTypeChange = (newType: 'bar' | 'line') => {
    // Update the state and flush immediately
    flushSync(() => {
      setChartType(newType);
    });

    // Now the DOM is updated, we can safely recreate the chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current!, {
      type: newType,
      data: data,
      // ... chart options
    });
  };

  return (
    <div>
      <select
        value={chartType}
        onChange={(e) => handleChartTypeChange(e.target.value as 'bar' | 'line')}
      >
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
      </select>
      <div ref={chartRef} />
    </div>
  );
}
```

تحتاج مكتبة المخططات إلى أن يعكس DOM الحالة الحالية قبل أن تتمكن من التهيئة على النحو الصحيح.

## كلفة الأداء

يأتي `flushSync` بتداعيات أداء حقيقية ينبغي أن تفهمها:

### كسر تجميع React للدفعات

عادةً تجمع React تحديثات حالة متعددة في دورة تصيير واحدة. ويكسر `flushSync` هذا التحسين:

```typescript
// ❌ Bad: Multiple flushSync calls
function BadExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    flushSync(() => setName('John')); // Render 1
    flushSync(() => setEmail('john@')); // Render 2
    flushSync(() => setAge(30)); // Render 3
  };
}

// ✅ Better: Batch updates when possible
function GoodExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
  });

  const handleSubmit = () => {
    // Single update, single render
    setFormData({
      name: 'John',
      email: 'john@example.com',
      age: 30,
    });
  };
}
```

### حجب الخيط الرئيسي

يُجبر `flushSync` عملًا متزامنًا على الخيط الرئيسي، ما قد يسبب تقطيعًا في الأداء:

```typescript
// ❌ Problematic: Large synchronous update
function ProblematicList({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('');

  const handleUrgentFilter = (newFilter: string) => {
    // This could block the thread if items is large
    flushSync(() => {
      setFilter(newFilter);
    });

    // Some imperative work that needs the filtered DOM
    performDOMWork();
  };

  const filteredItems = items.filter((item) => item.name.includes(filter));

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Better: Consider if you really need synchronous updates
function BetterList({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('');

  const handleFilter = (newFilter: string) => {
    // Let React batch and prioritize normally
    setFilter(newFilter);

    // Use useLayoutEffect for DOM work after render
    // or consider if the work can be async
  };

  // ... rest of component
}
```

## أفضل الممارسات والإرشادات

### استخدمه نادرًا وبهدف

لا تلجأ إلى `flushSync` إلا عندما تكون لديك حاجة تنسيق محددة:

```typescript
// ✅ Good: Clear coordination need
function Modal({ isOpen, onClose }: ModalProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    flushSync(() => {
      setIsOpen(true);
    });

    // Focus management requires immediate DOM update
    firstButtonRef.current?.focus();
  };
}

// ❌ Bad: No real coordination need
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Unnecessary - no imperative work after
    flushSync(() => {
      setCount((c) => c + 1);
    });
  };
}
```

### فضّل البدائل عندما يكون ذلك ممكنًا

غالبًا ما تستطيع آليات React المدمجة تلبية احتياجاتك من دون `flushSync`:

```typescript
// Instead of flushSync for DOM measurements, use useLayoutEffect
function MeasuredComponent({ content }: { content: string }) {
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Runs synchronously after DOM mutations
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [content]);

  return <div ref={ref}>{content}</div>;
}
```

### اجمع تحديثات متعددة

إذا كان لا بد من استخدام `flushSync`، فاجمع التحديثات المرتبطة معًا:

```typescript
// ✅ Good: Bundle related updates
const handleComplexUpdate = () => {
  flushSync(() => {
    setSelectedId(newId);
    setHighlighted(true);
    setScrollPosition(newPosition);
  });

  // Now perform imperative work
  performFocusWork();
};

// ❌ Bad: Multiple separate flushSync calls
const handleBadUpdate = () => {
  flushSync(() => setSelectedId(newId));
  flushSync(() => setHighlighted(true));
  flushSync(() => setScrollPosition(newPosition));
};
```

## اعتبارات React 18+

مع ميزات التصيير المتزامن في React 18، ثمة اعتبارات إضافية لـ `flushSync`:

### مقاطعة الانتقالات

سيقاطع `flushSync` أي انتقالات جارية:

```typescript
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);

    // This transition might be interrupted by flushSync elsewhere
    startTransition(() => {
      setResults(performSearch(newQuery));
    });
  };

  const handleUrgentUpdate = () => {
    // This will interrupt the above transition
    flushSync(() => {
      setSomeUrgentState(newValue);
    });
  };
}
```

### العمل مع `Suspense`

لا يتعامل `flushSync` بلطف مع حدود Suspense:

```typescript
// ❌ Problematic: flushSync with Suspense
function ProblematicComponent() {
  const [showSuspenseful, setShowSuspenseful] = useState(false);

  const handleShow = () => {
    // This might cause issues with Suspense
    flushSync(() => {
      setShowSuspenseful(true);
    });
  };

  return <Suspense fallback={<Loading />}>{showSuspenseful && <LazyComponent />}</Suspense>;
}
```

## تصحيح مشكلات `flushSync`

عندما تسوء الأمور مع `flushSync`، إليك أساليب التصحيح الشائعة:

### محلّل الأداء في React DevTools

يمكن لمحلّل الأداء في React DevTools أن يعرض لك أثر الأداء:

```typescript
// Add labels to make profiling clearer
function ProfiledComponent() {
  const handleUpdate = () => {
    React.unstable_trace('urgent-update', performance.now(), () => {
      flushSync(() => {
        setUrgentState(newValue);
      });
    });
  };
}
```

### قياس التوقيت بوحدة التحكم

قِس العمل المتزامن:

```typescript
function TimedComponent() {
  const handleUpdate = () => {
    console.time('flushSync-update');
    flushSync(() => {
      setLargeState(newLargeValue);
    });
    console.timeEnd('flushSync-update');

    // Additional imperative work
    performDOMWork();
  };
}
```

## متى لا تستخدم `flushSync`

إليك بعض الأنماط المضادة الشائعة التي ينبغي تجنّبها:

### التحقق من صحة النماذج

```typescript
// ❌ Don't use flushSync for form validation
function BadForm() {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (data: FormData) => {
    const newErrors = validateForm(data);

    // Unnecessary - validation errors don't need immediate DOM updates
    flushSync(() => {
      setErrors(newErrors);
    });
  };
}
```

### محفّزات الحركة

```typescript
// ❌ Don't use flushSync for CSS animations
function BadAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    // CSS animations don't need flushSync
    flushSync(() => {
      setIsAnimating(true);
    });
  };
}

// ✅ Better: Let React handle normally
function GoodAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true); // CSS will handle the animation
  };
}
```

### جلب البيانات

```typescript
// ❌ Don't use flushSync for loading states
function BadDataFetching() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    // Loading states don't need immediate DOM updates
    flushSync(() => {
      setIsLoading(true);
    });

    const data = await api.getData();
    setData(data);
    setIsLoading(false);
  };
}
```

## مثال من الواقع: إدارة التركيز في النافذة المنبثقة

إليك مثالًا كاملًا يوضّح الاستخدام الصحيح لـ `flushSync` لإدارة التركيز في النافذة المنبثقة:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // We need flushSync here because we need the modal
      // to be in the DOM before we can focus it
      flushSync(() => {
        // Modal is now rendered
      });

      // Focus the close button
      closeButtonRef.current?.focus();
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }

    // Trap focus within modal
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button ref={closeButtonRef} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // The flushSync happens inside the Modal component
    // when the DOM needs to be updated for focus management
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
        <p>This modal properly manages focus using flushSync where needed.</p>
        <button onClick={() => setIsModalOpen(false)}>Close from inside</button>
      </Modal>
    </div>
  );
}
```
