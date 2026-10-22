---
title: "`useRef` والمقابض الإجرائية"
---

أحيانًا لا يكفي نموذج React التصريحي (declarative) تمامًا — فأنت بحاجة إلى تركيز حقل إدخال بشكل إجرائي، أو قياس عقدة DOM، أو استدعاء تابع في مكتبة من طرف ثالث. هنا يأتي دور المراجع (refs): مخرج React إلى الوصول المباشر إلى DOM وإلى الواجهات الإجرائية للمكوّنات. سنستكشف كيف تُنمّط المراجع بشكل صحيح في TypeScript، ونتفهم متى تتفوّق مراجع الاستدعاء (callback refs) على `useRef`، ونبني واجهات إجرائية نظيفة باستخدام `forwardRef` و`useImperativeHandle`.

إذا سبق لك أن وجدت نفسك تقول «دعني فقط آخذ ذلك العنصر من DOM»، فالمراجع في صفّك. لكن مثل كل أداة قوية، لها حوافّ حادة — ولا سيما في TypeScript حيث تحتاج إلى مصارعة الأنواع الخاصة بعناصر DOM وكائنات المراجع القابلة للتغيير وواجهات المكوّنات.

## ملعب `useRef`

لنبدأ بأشيع نمط مراجع: `useRef` للوصول إلى عناصر DOM. يحتاج TypeScript إلى أن يعرف ما الذي تخزّنه، وعناصر DOM لها أنواع محدّدة.

```typescript
import { useRef, useEffect } from 'react';

export function InputFocus() {
  // ✅ Explicitly type the ref for HTMLInputElement
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TypeScript knows this could be null
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused input" />;
}
```

السحر يحدث مع ذلك المعامل العام: `useRef<HTMLInputElement>(null)`. هذا يخبر TypeScript أنك تخزّن مرجعًا إلى عنصر إدخال، وأن القيمة الأولية هي `null` (لأن React لم يُصيّر بعد).

وهنا مثال أشمل يعرض أنواعًا مختلفة من عناصر DOM:

```typescript
import { useRef } from 'react';

export function DOMReferences() {
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMeasure = () => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      console.log(`Div dimensions: ${width}x${height}`);
    }
  };

  const handleCanvasSetup = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.fillRect(0, 0, 100, 100);
    }
  };

  return (
    <div>
      <div ref={divRef} className="measured-div">
        Measure me!
      </div>
      <button ref={buttonRef} onClick={handleMeasure}>
        Measure Div
      </button>
      <canvas ref={canvasRef} width={200} height={200} onClick={handleCanvasSetup} />
    </div>
  );
}
```

## تخزين القيم باستخدام `useRef`

`useRef` ليس مخصّصًا لعناصر DOM فحسب — بل مثالي أيضًا لتخزين القيم القابلة للتغيير التي تبقى بين التصييرات (renders) دون أن تسبّب تصييرات جديدة. فكّر فيه كـ«صندوق» يمكنك وضع أي شيء بداخله.

```typescript
import { useRef, useEffect, useState } from 'react';

export function TimerComponent() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ✅ Store the timer ID - number or undefined
  const timerRef = useRef<number | undefined>();

  // ✅ Track previous count value
  const prevCountRef = useRef<number>();

  useEffect(() => {
    prevCountRef.current = count;
  });

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      // Store the timer ID in the ref
      timerRef.current = window.setInterval(() => {
        setCount(c => c + 1);
      }, 100);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setIsRunning(false);
    }
  };

  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
    </div>
  );
}
```

> **نصيحة**
>
> عند تخزين قيم غير مرتبطة بـ DOM داخل المراجع، نمّطها صراحةً في كل مرة. فـ`useRef<number>()` دون قيمة أولية ينشئ `MutableRefObject<number | undefined>`، وهو ما تريده عادةً لمعرّفات المؤقّتات (timers) أو غيرها من القيم الاختيارية.

## مراجع الاستدعاء: حين لا يكفي `useRef`

أحيانًا يبدو `useRef` مرهقًا — مثلًا حين تحتاج إلى تشغيل شيفرة فور توفّر عنصر DOM، أو حين تعمل مع عناصر ديناميكية. تتيح لك مراجع الاستدعاء تمرير دالة بدل كائن مرجع، ويستدعيها React مع العنصر.

```typescript
import { useState, useCallback } from 'react';

export function CallbackRefExample() {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // ✅ Callback ref - receives the element directly
  const measuredRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div>
      <div
        ref={measuredRef}
        style={{
          width: '50%',
          height: '200px',
          backgroundColor: '#f0f0f0',
          padding: '20px'
        }}
      >
        This div measures itself!
      </div>
      {dimensions && (
        <p>Dimensions: {dimensions.width.toFixed(0)}px × {dimensions.height.toFixed(0)}px</p>
      )}
    </div>
  );
}
```

وتتألق مراجع الاستدعاء حقًا حين تحتاج إلى التعامل مع قوائم ديناميكية أو عناصر تُصيَّر بشروط:

```typescript
import { useState, useCallback } from 'react';

interface Item {
  id: string;
  name: string;
}

export function DynamicListRefs() {
  const [items] = useState<Item[]>([
    { id: '1', name: 'First item' },
    { id: '2', name: 'Second item' },
    { id: '3', name: 'Third item' },
  ]);

  const [itemHeights, setItemHeights] = useState<Record<string, number>>({});

  // ✅ Callback ref factory - creates a ref callback for each item
  const createItemRef = useCallback((itemId: string) =>
    (element: HTMLLIElement | null) => {
      if (element) {
        const height = element.getBoundingClientRect().height;
        setItemHeights(prev => ({ ...prev, [itemId]: height }));
      }
    }, []);

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id} ref={createItemRef(item.id)} style={{ padding: '10px' }}>
            {item.name}
            {itemHeights[item.id] && (
              <span style={{ color: '#666', marginLeft: '10px' }}>
                ({itemHeights[item.id].toFixed(0)}px tall)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## تمرير المراجع: تفويض المسؤولية

عندما تنشئ مكوّنات قابلة لإعادة الاستخدام، فغالبًا ما تريد للمكوّنات الأب أن تصل إلى عناصر DOM الداخلية. يتيح لك `forwardRef` «تمرير» مرجع عبر مكوّنك إلى العنصر في داخله.

```typescript
import { forwardRef, useRef, useImperativeHandle } from 'react';

interface CustomInputProps {
  label: string;
  placeholder?: string;
}

// ✅ forwardRef with proper typing
export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder }, ref) => {
    return (
      <div className="custom-input">
        <label>
          {label}
          <input
            ref={ref}
            placeholder={placeholder}
            style={{
              marginLeft: '10px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>
    );
  }
);

// Don't forget the display name for debugging
CustomInput.displayName = 'CustomInput';
```

الآن تستطيع المكوّنات الأب الوصول المباشر إلى عنصر الإدخال:

```typescript
import { useRef } from 'react';

export function ParentWithForwardedRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <CustomInput ref={inputRef} label="Name:" placeholder="Enter your name" />
      <div style={{ marginTop: '10px' }}>
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={clearInput} style={{ marginLeft: '10px' }}>
          Clear & Focus
        </button>
      </div>
    </div>
  );
}
```

> **تحذير**
>
> عند استخدام `forwardRef`، تستقبل دالة المكوّن `props` أولًا ثم `ref` ثانيًا. ويختلف هذا عن النمط المعتاد حيث يكون `ref` جزءًا من `props`.

## المقابض الإجرائية: واجهات منتقاة

أحيانًا لا تريد كشف عنصر DOM بالكامل — بل تريد إنشاء واجهة إجرائية منتقاة. يتيح لك `useImperativeHandle` تخصيص ما يُكشف عندما يصل المكوّن الأب إلى مرجعك.

```typescript
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';

interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface VideoPlayerProps {
  src: string;
  onTimeUpdate?: (currentTime: number) => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // ✅ Expose only specific methods via useImperativeHandle
    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
        setIsPlaying(true);
      },
      pause: () => {
        videoRef.current?.pause();
        setIsPlaying(false);
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => {
        return videoRef.current?.currentTime ?? 0;
      },
      getDuration: () => {
        return videoRef.current?.duration ?? 0;
      },
    }), []);

    return (
      <div className="video-player">
        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={() => {
            if (videoRef.current && onTimeUpdate) {
              onTimeUpdate(videoRef.current.currentTime);
            }
          }}
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <div style={{ marginTop: '10px' }}>
          Status: {isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
```

الآن تحصل المكوّنات الأب على واجهة نظيفة ومتحكَّم بها بدل عنصر الفيديو كاملًا:

```typescript
import { useRef, useState } from 'react';

export function VideoController() {
  const videoRef = useRef<VideoPlayerHandle>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();
  const handleSeek = (time: number) => videoRef.current?.seek(time);

  return (
    <div>
      <VideoPlayer
        ref={videoRef}
        src="/sample-video.mp4"
        onTimeUpdate={setCurrentTime}
      />

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause} style={{ marginLeft: '10px' }}>
          Pause
        </button>
        <button onClick={() => handleSeek(30)} style={{ marginLeft: '10px' }}>
          Skip to 30s
        </button>

        <p>Current time: {currentTime.toFixed(2)}s</p>
      </div>
    </div>
  );
}
```

## الأنماط الشائعة والمزالق

### رقصة التحقّق من القيم الفارغة

تبدأ مراجع DOM بقيمة `null`، لذا ستجري تحقّقات من `null` باستمرار. إليك بعض الأنماط التي تجعل ذلك أقل إزعاجًا:

```typescript
import { useRef, useCallback } from 'react';

export function NullCheckPatterns() {
  const elementRef = useRef<HTMLDivElement>(null);

  // ✅ Early return pattern
  const handleMeasure = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    console.log('Dimensions:', rect.width, rect.height);
  }, []);

  // ✅ Optional chaining for simple operations
  const handleFocus = useCallback(() => {
    elementRef.current?.focus();
  }, []);

  // ✅ Helper function for common operations
  const withElement = useCallback((callback: (el: HTMLDivElement) => void) => {
    if (elementRef.current) {
      callback(elementRef.current);
    }
  }, []);

  const handleComplexOperation = useCallback(() => {
    withElement((el) => {
      el.style.backgroundColor = 'lightblue';
      el.scrollIntoView({ behavior: 'smooth' });
      // More complex operations without null checks
    });
  }, [withElement]);

  return (
    <div ref={elementRef} tabIndex={0}>
      <button onClick={handleMeasure}>Measure</button>
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleComplexOperation}>Complex Operation</button>
    </div>
  );
}
```

### مزالق التوقيت في المراجع

المراجع غير متاحة أثناء أول تصيير — تُضبط في مرحلة الالتزام (commit). إذا احتجت إلى تشغيل شيفرة عند توفّر المرجع، فاستخدم `useEffect`:

```typescript
import { useRef, useEffect } from 'react';

export function RefTimingExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ❌ This won't work - ref is null during first render
  // const ctx = canvasRef.current?.getContext('2d');

  useEffect(() => {
    // ✅ This works - ref is available after commit
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(10, 10, 100, 100);
      }
    }
  }, []); // Empty dependency array - run once after mount

  return <canvas ref={canvasRef} width={200} height={200} />;
}
```

### الجمع بين عدة مراجع

أحيانًا تحتاج إلى استخدام مرجع مُمرَّر ومرجع داخلي خاص بك في الوقت نفسه. إليك كيفية التعامل مع ذلك:

```typescript
import { forwardRef, useRef, useImperativeHandle } from 'react';

interface EnhancedButtonHandle {
  focus: () => void;
  click: () => void;
}

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const EnhancedButton = forwardRef<EnhancedButtonHandle, EnhancedButtonProps>(
  ({ children, onClick }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => buttonRef.current?.focus(),
      click: () => buttonRef.current?.click(),
    }), []);

    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {children}
      </button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';
```

## متى تستخدم ماذا

إليك شجرة قرار سريعة لاختيار نهج المرجع المناسب:

- **هل تحتاج إلى الوصول إلى عنصر DOM؟** → `useRef<HTMLElementType>(null)`
- **هل تحتاج إلى تخزين قيمة قابلة للتغيير عبر التصييرات؟** → `useRef<ValueType>(initialValue)`
- **هل تحتاج إلى تشغيل شيفرة عند ظهور عنصر؟** → مرجع استدعاء (callback ref)
- **هل تعمل مع قوائم ديناميكية؟** → مراجع استدعاء مع دوال مُولِّدة (factories)
- **هل تبني مكوّنًا قابلًا لإعادة الاستخدام ينبغي أن يكشف عنصره؟** → `forwardRef`
- **هل تريد كشف واجهة منتقاة بدل العنصر الخام؟** → `forwardRef` + `useImperativeHandle`

## حالات استخدام من العالم الحقيقي™

### إدارة التركيز (Focus Management)

```typescript
import { useRef, useEffect } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  active: boolean;
}

export function FocusTrap({ children, active }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement;

    // Focus the container
    containerRef.current.focus();

    // Return focus when deactivating
    return () => {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      style={{
        outline: active ? '2px solid blue' : 'none',
        padding: '20px',
        border: '1px solid #ccc'
      }}
    >
      {children}
    </div>
  );
}
```

### تنسيق حقول النماذج

```typescript
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface FormFieldHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

interface FormFieldProps {
  label: string;
  type?: string;
  required?: boolean;
}

export const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  ({ label, type = 'text', required }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.focus();
        }
      },
      getValue: () => inputRef.current?.value ?? '',
    }), []);

    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </label>
        <input
          ref={inputRef}
          type={type}
          required={required}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '100%'
          }}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
```

## الخلاصة

تربط المراجع عالم React التصريحي بواجهات DOM الإجرائية التي تحتاجها أحيانًا. يجعلها TypeScript أكثر أمانًا عبر التقاط عدم تطابق الأنواع وقت التصريف (compilation)، لكنك ما زلت بحاجة إلى معالجة واقع التشغيل لمراجع `null` وإدارة دورة الحياة بشكل صحيح.

أهم ما ينبغي أن تأخذه معك:

- نمّط مراجعك صراحةً دائمًا —‏ `useRef<HTMLInputElement>(null)` أفضل من `useRef(null)`
- استخدم مراجع الاستدعاء في السيناريوهات الديناميكية وللوصول الفوري إلى DOM
- ينشئ `forwardRef` مع `useImperativeHandle` واجهات مكوّنات نظيفة دون كشف تفاصيل التنفيذ
- تذكّر أن المراجع تبقى `null` حتى بعد أول تصيير

المراجع هي مخرجك حين لا يكفي تدفّق البيانات المعتاد في React. استخدمها بحكمة، ونمّطها بشكل صحيح، وسيشكرك نسختك المستقبلية عند تنقيح تفاعلات DOM في الساعة الثانية فجرًا.
