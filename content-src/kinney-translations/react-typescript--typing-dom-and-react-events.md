---
title: "نمطجة أحداث DOM وأحداث React"
---

معالجة الأحداث هي المكان الذي تلتقي فيه React بفوضى تفاعل المستخدم — النقرات وضغطات المفاتيح وإرسال النماذج وكل الفوضى التي تجعل تطبيقات الويب تبدو حيّة. يمكن لـ TypeScript مساعدتك في ترويض هذا التعقيد عبر نمطجة دقيقة لمعالِج الأحداث، لكن ذلك فقط إن كنت تعرف أي الأنواع تستخدم ومتى. لنستكشف كيف تنمّط أحداث React بشكل صحيح فتعمل معالِجاتك على نحو يمكن التنبؤ به ويصبح محرّرك البرمجي حليفًا لك لا خصمًا.

تلفّ React أحداث DOM الأصلية داخل كائنات `SyntheticEvent` لتوفّر التوافق بين المتصفحات ووظائف إضافية. ورغم أن هذا التجريد غير مرئي غالبًا أثناء التطوير، إلا أنه يظهر بوضوح تام حين تحاول إرضاء مدقّق أنواع TypeScript. والخبر الجيد؟ حين تتعلّم الأنماط، تصبح نمطجة الأحداث أمرًا بديهيًا.

## الأساس: فهم SyntheticEvent

يستقبل كل معالِج أحداث في React كائن `SyntheticEvent` — وهو غلاف React لأحداث DOM الأصلية. لهذه الأحداث الاصطناعية الواجهة نفسها التي للأحداث الأصلية لكن باتّساق مضمون بين المتصفحات.

```typescript
import { SyntheticEvent } from 'react';

function handleGenericEvent(event: SyntheticEvent) {
  // Works with any React event
  console.log('Event type:', event.type);
  event.preventDefault();
  event.stopPropagation();
}

// ❌ Too generic - you lose specific event properties
function Button() {
  return <button onClick={handleGenericEvent}>Click me</button>;
}
```

رغم أن `SyntheticEvent` يصلح للحالات الأساسية، فغالبًا ما ستحتاج إلى أنواع أدقّ للوصول إلى الخصائص الخاصة بالحدث والحصول على IntelliSense أفضل.

## أحداث الفأرة: نقرات وتحوّمات والمزيد

أحداث الفأرة على الأرجح أكثر الأحداث التي ستتعامل معها. توفّر React أنواعًا محدّدة للتفاعلات المختلفة مع الفأرة:

```typescript
import { MouseEvent } from 'react';

function handleClick(event: MouseEvent<HTMLButtonElement>) {
  // ✅ Full access to mouse event properties
  console.log('Clicked at:', event.clientX, event.clientY);
  console.log('Button pressed:', event.button); // 0 = left, 1 = middle, 2 = right
  console.log('Alt key held:', event.altKey);

  // The target is properly typed as HTMLButtonElement
  console.log('Button text:', event.currentTarget.textContent);
}

function InteractiveButton() {
  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = '#blue';
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.backgroundColor = '';
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Hover and click me
    </button>
  );
}
```

> **نصيحة**
>
> استخدم `event.currentTarget` بدلًا من `event.target` حين تحتاج إلى العنصر الذي مُرفق به معالِج الحدث. أما `event.target` فيعطيك العنصر الذي أطلق الحدث (قد يكون عنصرًا فرعيًا).

## أحداث لوحة المفاتيح: ما هو أبعد من مجرد «اضغط Enter»

أحداث لوحة المفاتيح أساسية لإمكانية الوصول (accessibility) ولمسارات عمل المستخدمين المحترفين. يساعدك TypeScript على التعامل معها بشكل صحيح:

```typescript
import { KeyboardEvent } from 'react';

function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
  // ✅ Access to keyboard-specific properties
  if (event.key === 'Enter' && event.ctrlKey) {
    console.log('Ctrl+Enter pressed!');
    // Submit form or perform action
    return;
  }

  // Check for specific keys
  if (event.key === 'Escape') {
    event.currentTarget.blur(); // Remove focus
    return;
  }

  // Access the input value
  const currentValue = event.currentTarget.value;
  console.log('Typing in:', currentValue);
}

function KeyboardInput() {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Prevent certain keys from being processed
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      // Handle custom tab navigation
    }
  };

  return (
    <input
      type="text"
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
      placeholder="Try Ctrl+Enter or Escape"
    />
  );
}
```

> **ملاحظة**
>
> `onKeyPress` مهجور لصالح `onKeyDown` في معظم حالات الاستخدام. استخدم `onKeyDown` لكشف المفاتيح و`onKeyUp` للإجراءات التي ينبغي أن تحدث عند إفلات المفاتيح.

## أحداث النماذج: الخبز والزبدة

التعامل مع النماذج هو حيث تبرز نمطجة الأحداث الصحيحة. ستتعامل بانتظام مع إرسال النماذج وتغيّر حقول الإدخال وأحداث التركيز:

```typescript
import { FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Focused:', event.currentTarget.name);
    // Maybe clear validation errors for this field
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Blurred:', event.currentTarget.name);
    // Maybe validate this field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## التعامل مع عناصر النماذج المختلفة

لكل عنصر في النماذج أنواع أحداث مختلفة. إليك كيفية التعامل مع العناصر الشائعة بشكل صحيح:

```typescript
import { ChangeEvent } from 'react';

function FormElementExamples() {
  // ✅ Input elements
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.currentTarget.value);
  };

  // ✅ Textarea elements
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Textarea value:', event.currentTarget.value);
  };

  // ✅ Select elements
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected option:', event.currentTarget.value);
    // For multi-select, you'd need to iterate through options
  };

  return (
    <form>
      <input onChange={handleInputChange} placeholder="Text input" />

      <textarea
        onChange={handleTextareaChange}
        placeholder="Long text input"
      />

      <select onChange={handleSelectChange}>
        <option value="">Choose an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </form>
  );
}
```

## متقدّم: معالِج أحداث عامة

أحيانًا تريد كتابة معالِج أحداث قابل لإعادة الاستخدام يعمل مع عدة أنواع من العناصر. المعاملات العامة (generics) في TypeScript تجعل ذلك ممكنًا:

````typescript
import { ChangeEvent } from 'react';

// ✅ Generic handler that works with any form element
function createFormHandler<T extends HTMLElement>(
  callback: (name: string, value: string) => void
) {
  return (event: ChangeEvent<T>) => {
    const target = event.currentTarget;
    const name = target.getAttribute('name') || '';

    // Handle different element types
    let value = '';
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      value = target.value;
    } else if (target instanceof HTMLSelectElement) {
      value = target.value;
    }

    callback(name, value);
  };
}

## Typed Event Helpers and Overloads

Sometimes you want ergonomic handlers that accept either raw events or pre-extracted values. You can model this with function overloads while keeping call sites clean.

```tsx
// Overload to accept either the event or the extracted value
function onInputChange(handler: (value: string) => void): (e: React.ChangeEvent<HTMLInputElement>) => void;
function onInputChange(handler: (e: React.ChangeEvent<HTMLInputElement>) => void): (e: React.ChangeEvent<HTMLInputElement>) => void;
function onInputChange(
  handler: ((value: string) => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void),
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the handler expects a value, pass value; otherwise pass event
    if (handler.length === 1) {
      try {
        (handler as (value: string) => void)(e.target.value);
        return;
      } catch {
        // fall-through to event
      }
    }
    (handler as (e: React.ChangeEvent<HTMLInputElement>) => void)(e);
  };
}

// Usage
<input onChange={onInputChange((value) => setQuery(value))} />
<input onChange={onInputChange((e) => console.log(e.target.selectionStart))} />

// Key handlers with discriminated keys
type ArrowKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

function onArrow(handler: (key: ArrowKey, e: React.KeyboardEvent) => void) {
  return (e: React.KeyboardEvent) => {
    const k = e.key as ArrowKey;
    if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
      handler(k, e);
    }
  };
}

<div onKeyDown={onArrow((key) => console.log('pressed', key))} />
```

These helpers keep component code concise while preserving strong typing for both ergonomic and low-level cases.

```tsx
function GenericForm() {
const handleChange = createFormHandler((name, value) => {
console.log(`Field ${name} changed to: ${value}`);
});

return (
<form>
<input name="firstName" onChange={handleChange} />
<textarea name="bio" onChange={handleChange} />
<select name="country" onChange={handleChange}>
<option value="us">United States</option>
<option value="ca">Canada</option>
</select>
</form>
);
}
```

## Custom Event Handlers and Event Delegation

Sometimes you need to create custom event handlers or implement event delegation patterns. Here's how to do it with proper typing:

```ts
import { MouseEvent, useRef } from 'react';

interface ListItem {
  id: string;
  text: string;
  type: 'button' | 'link' | 'text';
}

function EventDelegationExample() {
  const listRef = useRef<HTMLUListElement>(null);

  const handleListClick = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;

    // Find the closest list item
    const listItem = target.closest('li');
    if (!listItem) return;

    const itemId = listItem.getAttribute('data-id');
    const itemType = listItem.getAttribute('data-type');

    console.log('Clicked item:', { itemId, itemType });

    // Handle different item types
    if (itemType === 'button') {
      // Handle button click
    } else if (itemType === 'link') {
      // Handle link click
    }
  };

  const items: ListItem[] = [
    { id: '1', text: 'Click me', type: 'button' },
    { id: '2', text: 'Visit link', type: 'link' },
    { id: '3', text: 'Just text', type: 'text' },
  ];

  return (
    <ul ref={listRef} onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id} data-type={item.type}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
````

## الأنماط الشائعة وأفضل الممارسات

إليك بعض الأنماط التي ستستخدمها بانتظام عند نمطجة أحداث React:

### استخراج معالِج الأحداث لإعادة الاستخدام

```typescript
// ✅ Extract handlers into custom hooks or separate functions
function useFormHandlers(onSubmit: (data: FormData) => void) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.currentTarget.reset();
  };

  return { handleSubmit, handleReset };
}

function MyForm() {
  const { handleSubmit, handleReset } = useFormHandlers((data) => {
    console.log('Form data:', Object.fromEntries(data));
  });

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input name="username" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}
```

### نمطج معالِج الأحداث داخل السطر عند البساطة

```typescript
function SimpleComponent() {
  return (
    <div>
      {/* ✅ Simple inline handlers can be typed automatically */}
      <button onClick={(e) => console.log('Clicked!')}>
        Click me
      </button>

      {/* ✅ Or explicitly when you need specific properties */}
      <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
        console.log('Value:', e.currentTarget.value);
      }} />
    </div>
  );
}
```

### التعامل الآمن مع العمليات غير المتزامنة

```typescript
import { FormEvent } from 'react';
import { useState } from 'react';

function AsyncForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      await submitFormData(formData);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="data" required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

// Mock async function
async function submitFormData(data: FormData): Promise<void> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

## أحداث التركيب (Composition): دعم الإدخال الدولي

بالنسبة إلى التطبيقات التي تحتاج إلى دعم المستخدمين الدوليين، تكون أحداث التركيب (composition events) حيوية للتعامل الصحيح مع إدخال النص، ولا سيما للغات التي تستخدم محرّكات الإدخال المنهجي (IMEs):

```typescript
import { CompositionEvent, ChangeEvent } from 'react';
import { useState } from 'react';

function InternationalInput() {
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState('');

  const handleCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(true);
    console.log('Composition started:', event.data);
  };

  const handleCompositionUpdate = (event: CompositionEvent<HTMLInputElement>) => {
    console.log('Composition updating:', event.data);
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    console.log('Composition ended:', event.data);
    // Now safe to process the final input
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    // Don't process changes during composition for IME languages
    if (!isComposing) {
      console.log('Processing change:', event.currentTarget.value);
      // Safe to trigger search, validation, etc.
    }
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionUpdate={handleCompositionUpdate}
      onCompositionEnd={handleCompositionEnd}
      placeholder="Type in any language"
    />
  );
}
```

> **نصيحة**
>
> تحقّق دائمًا من حالة `isComposing` قبل معالجة تغيّرات الإدخال في التطبيقات الدولية تفاديًا للتداخل مع طرق إدخال IME.

## أحداث السحب والإفلات: رفع الملفات ببساطة

أحداث السحب والإفلات مثالية لإنشاء واجهات رفع ملفات بديهية:

```typescript
import { DragEvent } from 'react';
import { useState } from 'react';

function FileDropZone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    // Filter for specific file types
    const imageFiles = droppedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    setFiles(prev => [...prev, ...imageFiles]);
    console.log('Dropped files:', imageFiles.map(f => f.name));
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragOver ? '#007acc' : '#ccc'}`,
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: isDragOver ? '#f0f8ff' : '#fafafa'
      }}
    >
      {isDragOver ? (
        <p>Drop files here!</p>
      ) : (
        <p>Drag image files here to upload</p>
      )}

      {files.length > 0 && (
        <div>
          <h4>Uploaded files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name} ({file.size} bytes)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## حالات استخدام من العالم الحقيقي™

لننظر إلى بعض السيناريوهات العملية التي تنقذ فيها نمطجة الأحداث الصحيحة الموقف:

### بناء مكوّن بحث بإدخال مؤجَّل

```typescript
import { ChangeEvent, KeyboardEvent } from 'react';
import { useState, useEffect, useCallback } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

function SearchInput({ onSearch, placeholder = 'Search...', debounceMs = 300 }: SearchProps) {
  const [query, setQuery] = useState('');

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('');
      event.currentTarget.blur();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(query);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}
```

### نافذة منبثقة مع معالجة صحيحة لمفتاح Escape

```typescript
import { KeyboardEvent, MouseEvent } from 'react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  // Handle escape key globally when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        {children}
      </div>
    </div>
  );
}
```

## مرجع أنواع الأحداث

إليك مرجعًا سريعًا لأشهر أنواع أحداث React:

| نوع الحدث | الاستخدام | أنواع العناصر |
| --- | --- | --- |
| `MouseEvent<T>` | النقرات وحركة الفأرة | `HTMLButtonElement` و`HTMLDivElement` وغيرها |
| `KeyboardEvent<T>` | ضغطات المفاتيح | `HTMLInputElement` و`HTMLTextAreaElement` |
| `ChangeEvent<T>` | تغيّرات حقول النماذج | `HTMLInputElement` و`HTMLSelectElement` و`HTMLTextAreaElement` |
| `FormEvent<T>` | إرسال النموذج | `HTMLFormElement` |
| `FocusEvent<T>` | أحداث التركيز وفقدان التركيز | أي عنصر يقبل التركيز |
| `CompositionEvent<T>` | تركيب الإدخال عبر IME | `HTMLInputElement` و`HTMLTextAreaElement` |
| `DragEvent<T>` | عمليات السحب والإفلات | أي عنصر |
| `SyntheticEvent<T>` | بديل عام | أي عنصر |

## تشخيص المشكلات الشائعة

### «الخاصية غير موجودة على النوع EventTarget»

```typescript
// ❌ This will cause TypeScript errors
function badHandler(event: MouseEvent) {
  console.log(event.target.value); // Error! EventTarget doesn't have 'value'
}

// ✅ Use currentTarget or proper type assertions
function goodHandler(event: MouseEvent<HTMLInputElement>) {
  console.log(event.currentTarget.value); // Works!

  // Or use type assertion if you must use target
  console.log((event.target as HTMLInputElement).value);
}
```

### عدم تطابق أنواع معالِج الأحداث

```typescript
// ❌ Wrong element type
const handleClick = (event: MouseEvent<HTMLInputElement>) => {
  // Handler expects input element
};

// ❌ This will cause TypeScript error
<button onClick={handleClick}>Click</button>

// ✅ Match the handler type to the element
const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
  // Handler expects button element
};

<button onClick={handleButtonClick}>Click</button>
```

## الخطوات التالية

مع نمطجة الأحداث الصحيحة ضمن عُدّة أدواتك، يمكنك:

- تبني نماذج وأنت مطمئن إلى أن معالِجاتك ستتلقّى أنواع البيانات الصحيحة
- تنشئ أنماطًا قابلة لإعادة الاستخدام للتعامل مع الأحداث في تطبيقك كله
- تلتقط الأخطاء المتعلقة بالأحداث وقت التصريف بدلًا من وقت التشغيل
- تستفيد من الإكمال التلقائي في محرّرك البرمجي لخصائص الأحداث

وتذكّر: أحداث React الاصطناعية في صفّك، لكن نمطجة الأحداث في TypeScript هي ما يجعلها قويّة حقًا. ابدأ بأنواع الأحداث المحدّدة (`MouseEvent` و`ChangeEvent` وغيرها) بدل `SyntheticEvent` العام، ودع TypeScript يوجّهك نحو شيفرة أكثر متانة في التعامل مع الأحداث.
