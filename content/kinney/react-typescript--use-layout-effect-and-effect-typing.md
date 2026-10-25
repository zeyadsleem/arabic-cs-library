---
title: "استخدام useLayoutEffect وتحديد أنواع التأثيرات"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/use-layout-effect-and-effect-typing"
---

يبدو `useEffect` و`useLayoutEffect` في React متطابقين تقريبًا على السطح، لكن فروق التوقيت بينهما قد تصنع واجهتك أو تهدمها. أحدهما يعمل بعد تحديث DOM، والآخر يعمل بشكل متزامن قبل أن يرسم المتصفح—واختيار الخطأ قد يؤدي إلى تخطيطات وامضة أو حركات متقطعة. ومع TypeScript، يمكننا جعل هذه التأثيرات آمنة من حيث الأنواع والتقاط المزالق الشائعة قبل أن تصل إلى الإنتاج.

إن فهم متى تلجأ إلى `useLayoutEffect` بدلًا من `useEffect` أمر بالغ الأهمية لبناء تطبيقات React عالية الأداء. الفرق الجوهري ليس فقط *متى* يعمل كل منهما—بل يتعلق بمنع التفاوتات البصرية التي تجعل تطبيقك يبدو معطوبًا في نظر المستخدمين.

## الفرق الجوهري

يتبع كلا الخطافين الواجهة البرمجية نفسها، لكن توقيت تنفيذهما مختلف تمامًا:

```typescript
// ✅ useEffect: Runs asynchronously after DOM updates and paint
useEffect(() => {
  // Runs after the browser has painted the screen
  console.log('DOM is painted, user can see changes');
}, []);

// ✅ useLayoutEffect: Runs synchronously before paint
useLayoutEffect(() => {
  // Runs after DOM mutations but before browser paint
  console.log("DOM is updated, but user hasn't seen changes yet");
}, []);
```

فكّر في الأمر هكذا: `useEffect` يشبه إرسال بطاقة بريدية—تصل في النهاية، بعد الانتهاء من كل شيء آخر. أما `useLayoutEffect` فيشبه مكالمة هاتفية—تحدث فورًا وتعطّل كل شيء آخر حتى تنتهي.

> **ملاحظة**
>
> لكلا الخطافين توقيعان متطابقان في TypeScript، لكن آثار التوقيت لديهما تؤثر في كيفية تحديد أنواع اعتمادياتهما ودوال التنظيف.

## متى تستخدم `useLayoutEffect`

استخدم `useLayoutEffect` عندما تحتاج إلى:

1. **قياس عناصر DOM** قبل أن يرسم المتصفح
2. **تعديل الأنماط** التي قد تسبب إزاحات تخطيط مرئية
3. **تحديث الحالة بشكل متزامن** بناءً على قياسات DOM
4. **منع الوميض** في الحركات أو الانتقالات

إليك حالة استخدام شائعة من العالم الحقيقي™—قياس أبعاد عنصر:

```typescript
import { useLayoutEffect, useRef, useState } from 'react';

interface ElementDimensions {
  width: number;
  height: number;
}

function useMeasure<T extends HTMLElement>(): [React.RefObject<T>, ElementDimensions] {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState<ElementDimensions>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = (): void => {
      const { offsetWidth, offsetHeight } = ref.current!;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    };

    measure(); // Initial measurement

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, dimensions];
}
```

لاحظ أننا نستخدم `useLayoutEffect` هنا لأننا نحتاج إلى قياسات DOM *قبل* أن يرسم المتصفح. لو استخدمنا `useEffect`، لكان المكوّن يُرسم بـ `width: 0, height: 0` في البداية، ثم يقفز إلى الأبعاد الصحيحة—مما يسبب وميضًا بصريًا.

> **نصيحة**
>
> تساعد فحوصات null الصارمة في TypeScript على التقاط أخطاء الوصول إلى ref. تحقق دائمًا من وجود `ref.current` قبل استخدامه، حتى في تأثيرات التخطيط.

## تحديد أنواع اعتماديات التأثيرات

يتطلب كلا التأثيرين تحديد أنواع اعتمادياته بعناية. إليك كيفية تجنب المزالق الشائعة في TypeScript:

```typescript
// ❌ Bad: Poorly typed dependencies
function BadExample({ userId }: { userId: string | undefined }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TypeScript can't guarantee userId isn't undefined here
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]); // This dependency could be undefined

  return user ? <div>{user.name}</div> : null;
}

// ✅ Good: Properly typed with guards
interface User {
  id: string;
  name: string;
  email: string;
}

function GoodExample({ userId }: { userId: string | undefined }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const controller = new AbortController();

    const fetchUser = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [userId]); // Now properly guarded against undefined

  return user ? <div>{user.name}</div> : null;
}
```

## تحديد أنواع دوال التنظيف

يمكن لكلا التأثيرين إرجاع دوال تنظيف، ويساعد TypeScript على ضمان تحديد أنواعها بشكل صحيح:

```typescript
// ✅ Good: Properly typed cleanup with explicit return type
useLayoutEffect((): (() => void) | void => {
  if (!ref.current) return; // Early return, no cleanup needed

  const element = ref.current;
  const handleResize = (): void => {
    // Handle resize logic
  };

  element.addEventListener('resize', handleResize);

  // TypeScript ensures this returns the correct cleanup type
  return (): void => {
    element.removeEventListener('resize', handleResize);
  };
}, []);
```

> **تحذير**
>
> لا تُعد أبدًا promise من دالة تنظيف تأثير. يتوقع React أن يكون التنظيف متزامنًا.

```typescript
// ❌ Bad: Returning a promise from cleanup
useEffect(() => {
  return async () => {
    await cleanup(); // TypeScript error: cleanup must be synchronous
  };
}, []);

// ✅ Good: Synchronous cleanup with async handling
useEffect(() => {
  return () => {
    cleanup().catch((error) => {
      console.error('Cleanup failed:', error);
    });
  };
}, []);
```

## اعتبارات الأداء وتحديد الأنواع

`useLayoutEffect` متزامن ويعطّل الرسم، لذلك يمكن أن يساعدنا TypeScript على أن نكون أكثر وعيًا بالعمليات المكلفة:

```typescript
interface ExpensiveCalculationResult {
  result: number;
  computationTime: number;
}

// ❌ Bad: Expensive sync operation in useLayoutEffect
function BadPerformance() {
  const [result, setResult] = useState<number>(0);

  useLayoutEffect(() => {
    // This blocks painting! Don't do this.
    const expensive = heavyComputation();
    setResult(expensive);
  }, []);

  return <div>{result}</div>;
}

// ✅ Good: Move expensive work to useEffect
function GoodPerformance() {
  const [result, setResult] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(true);

  useEffect(() => {
    const performCalculation = async (): Promise<void> => {
      setIsCalculating(true);

      // Use setTimeout to yield control back to the browser
      const calculation = await new Promise<ExpensiveCalculationResult>(resolve => {
        setTimeout(() => {
          const start = performance.now();
          const result = heavyComputation();
          const computationTime = performance.now() - start;

          resolve({ result, computationTime });
        }, 0);
      });

      setResult(calculation.result);
      setIsCalculating(false);
    };

    performCalculation();
  }, []);

  if (isCalculating) {
    return <div>Calculating...</div>;
  }

  return <div>{result}</div>;
}
```

## مزالق TypeScript الشائعة

### الإغلاقات القديمة مع معالجات الأحداث

```typescript
// ❌ Bad: Stale closure captures old count value
function StaleClosureExample() {
  const [count, setCount] = useState<number>(0);

  useLayoutEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        // This captures the initial count value (0) forever
        setCount(count + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty deps array creates stale closure

  return <div>Count: {count}</div>;
}

// ✅ Good: Use functional updates to avoid stale closures
function FreshClosureExample() {
  const [count, setCount] = useState<number>(0);

  useLayoutEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        // Functional update always gets the latest state
        setCount(currentCount => currentCount + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Now the empty deps array is safe

  return <div>Count: {count}</div>;
}
```

### حراس الأنواع على ref.current

```typescript
// ❌ Bad: Not checking ref.current exists
function UnsafeRefAccess() {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    // TypeScript error: Object is possibly 'null'
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}

// ✅ Good: Always guard ref access
function SafeRefAccess() {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();

    // TypeScript knows input is non-null in this block
    const handleFocus = (): void => {
      input.select(); // Safe to access input here
    };

    input.addEventListener('focus', handleFocus);

    return (): void => {
      input.removeEventListener('focus', handleFocus);
    };
  }, []);

  return <input ref={inputRef} />;
}
```

## مثال من العالم الحقيقي: تحديد موضع التلميح

إليك مثالًا عمليًا يجمع بين تحديد الأنواع الصحيح و`useLayoutEffect` لتحديد موضع التلميح:

```typescript
interface Position {
  top: number;
  left: number;
}

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  isVisible: boolean;
}

function Tooltip({ children, content, isVisible }: TooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) {
      return;
    }

    const calculatePosition = (): Position => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const tooltipRect = tooltipRef.current!.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = triggerRect.bottom + 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

      // Prevent tooltip from going off-screen
      if (left < 8) left = 8;
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }

      if (top + tooltipRect.height > viewportHeight - 8) {
        top = triggerRect.top - tooltipRect.height - 8;
      }

      return { top, left };
    };

    const newPosition = calculatePosition();
    setPosition(newPosition);
  }, [isVisible]); // Recalculate when visibility changes

  return (
    <>
      <div ref={triggerRef}>
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}
```

يستخدم هذا المثال `useLayoutEffect` لأننا نحتاج إلى:

1. قياس عنصري المُشغِّل والتلميح
2. حساب الموضع الأمثل
3. تطبيق الموضع قبل أن يرسم المتصفح

استخدام `useEffect` هنا سيجعل التلميح يظهر لفترة وجيزة في الموضع الخاطئ قبل أن يقفز إلى المكان الصحيح.

## اختبار تأثيرات التخطيط

يتطلب اختبار المكوّنات التي تستخدم `useLayoutEffect` اعتبارًا خاصًا لأنها تعمل بشكل متزامن:

```typescript
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react';

// Mock ResizeObserver for tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

test('measures element dimensions synchronously', () => {
  const TestComponent = () => {
    const [ref, dimensions] = useMeasure<HTMLDivElement>();

    return (
      <div
        ref={ref}
        data-testid="measured-element"
        style={{ width: 200, height: 100 }}
      >
        {dimensions.width}x{dimensions.height}
      </div>
    );
  };

  // act() ensures layout effects run before assertions
  act(() => {
    render(<TestComponent />);
  });

  expect(screen.getByTestId('measured-element')).toHaveTextContent('200x100');
});
```

> **نصيحة**
>
> غلّف دائمًا عمليات الرسم التي تشغّل تأثيرات التخطيط داخل `act()` لتضمن اكتمالها قبل تنفيذ التحققات.

## النقاط الرئيسية

- **استخدم `useLayoutEffect`** عندما تحتاج إلى قياسات DOM متزامنة أو تحديثات أنماط تمنع الوميض البصري
- **استخدم `useEffect`** للعمليات غير المتزامنة واستدعاءات API والآثار الجانبية التي لا تحتاج إلى تعطيل الرسم
- **حدد أنواع اعتمادياتك دائمًا** بشكل صريح واستخدم حراس الأنواع المناسبين لقيم ref والقيم القابلة لأن تكون null
- **كن واعيًا بالأداء**—`useLayoutEffect` يعطّل دورة الرسم في المتصفح
- **اختبر تأثيرات التخطيط** باستخدام `act()` لتضمن اكتمالها قبل التحققات

غالبًا ما يتلخص الاختيار بين هذين الخطافين في تجربة المستخدم. إذا كان مستخدموك سيلاحظون قفزة بصرية أو وميضًا، فالجأ إلى `useLayoutEffect`. وإذا لم يلاحظوا التأخير، فالتزم بـ `useEffect` وأبقِ الخيط الرئيسي مستجيبًا.

مع تحديد الأنواع الصحيح في TypeScript، يمكنك التقاط المشكلات المحتملة مبكرًا وضمان تعامل تأثيراتك مع الحالات الحدية بأناقة—مما يؤدي إلى تطبيقات React أكثر قوة وأداءً وتبدو مصقولة لمستخدميك.
