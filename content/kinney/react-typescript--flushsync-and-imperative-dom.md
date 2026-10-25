---
title: "`flushSync` والـ DOM الأمْرِيّ مع الأنواع"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/flushsync-and-imperative-dom"
---

نموذج React الإعلاني (declarative) رائع—إلى أن تحتاج التناغم مع الـ DOM نفسه. فأحيانًا تحتاج إلى قياس العناصر، أو التركيز على حقول الإدخال، أو ضبط توقيت الحركات بدقّة. وها أنتَ مع `flushSync` ومساعدات React للـ DOM الأمْرِيّ (imperative DOM) التي تتيح لك الخروج من عالم React غير المتزامن متى دَعَت الحاجة (ويساعدك TypeScript على فعله بأمان).

يُجبِر `flushSync` React على تفريغ التحديثات تزامنيًّا بدلًا من تجميعها معًا، بينما تستخدم أنماط الـ DOM الأمْرِيّة مراجع (refs) لمعالجة عناصر DOM مباشرةً. وكلاهما مخارج هروب من النموذج الإعلاني لـ React—أدوات قوية ينبغي استخدامها باقتصاد ودواعٍ وجيهة.

## فهم التحديثات غير المتزامنة في React

قبل الغوص في `flushSync`، لنفهم أولًا لماذا تُجمّع React التحديثات أصلًا. تجمع React تحديثات حالة متعددة معًا لتفادي إعادة التصيير (re-render) غير اللازمة، وهو ما يُحسّن الأداء لكنه قد يخلق تحديات توقيت:

```typescript
function AsyncExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Count is now ${count + 1}`);
    // Both updates are batched together
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>{message}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}
```

التجميع هو عادةً ما تريد، لكن أحيانًا تحتاج أن تجري التحديثات فورًا—وهنا يقطع `flushSync` عزمًا.

## متى تستخدم `flushSync`

يُجبِر `flushSync` React على تفريغ التحديثات إلى الـ DOM تزامنيًّا. فاستعمله باقتصاد في هذه الحالات بعينها:

- **إدارة التركيز**: ضمان أن يكون العنصر قد انتُج بالتصيير قبل التركيز عليه
- **قياسات DOM**: الحصول على أبعاد دقيقة بعد تغيّرات الحالة
- **توقيت الحركات**: التنسيق مع مكتبات الحركات (animation)
- **موضع التمرير**: تحديث موضع التمرير بعد تغيّر المحتوى

> **تحذير**
>
> قد يُضرّ `flushSync` بالأداء بمنع تحسينات React. لا تستخدمه إلا إذا كان عندك شرط توقيت بعينه.

## استخدام `flushSync` الأساسي مع الأنواع

هكذا تستخدم `flushSync` مع أنواع TypeScript سليمة:

```typescript
import { flushSync } from 'react-dom';
import { useState, useRef, type RefObject } from 'react';

interface ListItem {
  id: string;
  text: string;
}

function TodoList() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const listRef: RefObject<HTMLUListElement> = useRef(null);

  const addItem = () => {
    if (!newItem.trim()) return;

    const item: ListItem = {
      id: crypto.randomUUID(),
      text: newItem,
    };

    // ✅ Good: Force sync update before measuring/focusing
    flushSync(() => {
      setItems((prev) => [...prev, item]);
      setNewItem('');
    });

    // Now we can safely interact with the DOM
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Scroll to show the new item
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <ul ref={listRef} style={{ maxHeight: '200px', overflow: 'auto' }}>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <input
        ref={inputRef}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addItem()}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
```

## مثال واقعي: إدارة التركيز في النافذة المنبثقة

هذا مثال تطبيقي يضمن فيه `flushSync` إدارة التركيز في نافذة منبثقة (modal):

```typescript
import { flushSync } from 'react-dom';
import { useState, useRef, useEffect, type RefObject } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef: RefObject<HTMLDialogElement> = useRef(null);
  const firstFocusableRef: RefObject<HTMLButtonElement> = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      // ✅ Good: Ensure modal is rendered before focusing
      flushSync(() => {
        modal.showModal();
      });

      // Now safely focus the first element
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }
    } else {
      modal.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={modalRef} onClose={onClose}>
      <div>
        <header>
          <h2>{title}</h2>
          <button ref={firstFocusableRef} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </header>
        <main>{children}</main>
      </div>
    </dialog>
  );
}

// Usage with proper typing
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Settings">
        <p>Modal content here...</p>
      </Modal>
    </div>
  );
}
```

## أنماط الـ DOM الأمْرِيّة مع الأنواع

أحيانًا تحتاج معالجة عناصر DOM مباشرةً. وهذه أنماط شائعة بأنواع TypeScript سليمة:

### خُطّاف مخصّص للتركيز على المدخلات

```typescript
import { useRef, useCallback, type RefObject } from 'react';

// ✅ Good: Generic hook with proper constraints
function useFocusableRef<T extends HTMLElement>(): [RefObject<T>, () => void] {
  const ref: RefObject<T> = useRef(null);

  const focus = useCallback(() => {
    if (ref.current && 'focus' in ref.current) {
      (ref.current as HTMLElement & { focus(): void }).focus();
    }
  }, []);

  return [ref, focus];
}

// Better: Type-safe version for specific elements
function useInputFocus(): [RefObject<HTMLInputElement>, () => void] {
  const ref: RefObject<HTMLInputElement> = useRef(null);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  return [ref, focus];
}

// Usage
function SearchForm() {
  const [inputRef, focusInput] = useInputFocus();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);

    // Focus input after search (maybe for next query)
    flushSync(() => {
      setQuery('');
    });
    focusInput();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

### قياس DOM بالأنواع

```typescript
import { useState, useRef, useCallback, type RefObject } from 'react';
import { flushSync } from 'react-dom';

interface ElementDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
}

function useElementDimensions<T extends HTMLElement>(): [
  RefObject<T>,
  ElementDimensions | null,
  () => void,
] {
  const ref: RefObject<T> = useRef(null);
  const [dimensions, setDimensions] = useState<ElementDimensions | null>(null);

  const measure = useCallback(() => {
    if (!ref.current) {
      setDimensions(null);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    setDimensions({
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    });
  }, []);

  return [ref, dimensions, measure];
}

// Usage example
function ResizableBox() {
  const [content, setContent] = useState('Short content');
  const [boxRef, dimensions, measureBox] = useElementDimensions<HTMLDivElement>();

  const addContent = () => {
    // ✅ Good: Ensure content is rendered before measuring
    flushSync(() => {
      setContent((prev) => prev + '\nMore content here...');
    });
    measureBox();
  };

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          border: '1px solid #ccc',
          padding: '16px',
          whiteSpace: 'pre-line',
        }}
      >
        {content}
      </div>
      <button onClick={addContent}>Add Content</button>
      <button onClick={measureBox}>Measure Box</button>
      {dimensions && (
        <p>
          Size: {Math.round(dimensions.width)}×{Math.round(dimensions.height)}px
        </p>
      )}
    </div>
  );
}
```

## مثال عن التنسيق مع الحركات

هكذا تنسّق بين تغيّرات حالة React ومكتبات الحركات (animation):

```typescript
import { useState, useRef, useCallback, type RefObject } from 'react';
import { flushSync } from 'react-dom';

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function AnimatedList<T>({ items, renderItem, keyExtractor }: AnimatedListProps<T>) {
  const listRef: RefObject<HTMLUListElement> = useRef(null);
  const [animatingItems, setAnimatingItems] = useState(new Set<string>());

  const animateItemRemoval = useCallback((itemKey: string) => {
    const listElement = listRef.current;
    if (!listElement) return;

    const itemElement = listElement.querySelector(`[data-key="${itemKey}"]`);
    if (!itemElement) return;

    // Mark item as animating
    flushSync(() => {
      setAnimatingItems((prev) => new Set(prev).add(itemKey));
    });

    // Start animation
    itemElement
      .animate(
        [
          { opacity: 1, transform: 'translateX(0)' },
          { opacity: 0, transform: 'translateX(-100%)' },
        ],
        {
          duration: 300,
          easing: 'ease-out',
        },
      )
      .addEventListener('finish', () => {
        // Clean up after animation
        setAnimatingItems((prev) => {
          const next = new Set(prev);
          next.delete(itemKey);
          return next;
        });
      });
  }, []);

  return (
    <ul ref={listRef}>
      {items.map((item, index) => {
        const key = keyExtractor(item);
        const isAnimating = animatingItems.has(key);

        return (
          <li
            key={key}
            data-key={key}
            style={{
              opacity: isAnimating ? 0.5 : 1,
              transition: 'opacity 0.2s',
            }}
            onClick={() => animateItemRemoval(key)}
          >
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
}

// Usage
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Master TypeScript', completed: true },
  ]);

  return (
    <AnimatedList
      items={todos}
      keyExtractor={(todo) => todo.id}
      renderItem={(todo) => (
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}
    />
  );
}
```

## مزالق شائعة وأفضل الممارسات

### ❌ سيّئ: الإفراط في استخدام `flushSync`

```typescript
// Don't do this - unnecessary flushSync usage
function BadCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    flushSync(() => {
      setCount(count + 1);
    });
    // No reason for flushSync here!
  };

  return <button onClick={increment}>{count}</button>;
}
```

### ✅ جيّد: استخدام `flushSync` استراتيجيًّا

```typescript
// Do this - flushSync only when you need DOM coordination
function GoodInfiniteScroll() {
  const [items, setItems] = useState<string[]>([]);
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  const loadMore = useCallback(() => {
    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);

    // Only use flushSync when you need to measure/scroll after update
    flushSync(() => {
      setItems((prev) => [...prev, ...newItems]);
    });

    // Now safely scroll to new content
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const wasAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (wasAtBottom) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [items.length]);

  return (
    <div ref={scrollRef} style={{ height: '300px', overflow: 'auto' }}>
      {items.map((item) => (
        <div key={item} style={{ padding: '8px' }}>
          {item}
        </div>
      ))}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}
```

### نصائح سلامة الأنواع

1. **استخدم أنواع عناصر محدّدة**: `RefObject<HTMLInputElement>` بدلًا من `RefObject<HTMLElement>`
2. **افحص null**: افحص `ref.current` دومًا قبل استخدامها
3. **حدّد نوع استدعاءات الحركات** (callbacks): استخدم أنواع أحداث مناسبة لأحداث الحركة
4. **قيود الأنواع العامة**: استخدم قيودًا مثل `T extends HTMLElement` للخُطّافات (hooks) القابلة لإعادة الاستخدام

## اعتبارات الأداء

يتجاوز `flushSync` تحسينات React للأداء، فاستخدمه بحكمة:

- **قِس أولًا**: اكتشف إن كان لديك مشكل توقيت فعلًا
- **جمّع العمليات**: أدرج تحديثات الحالة المتعددة في استدعاء واحد لـ `flushSync`
- **تجنّب استعماله في الحلقات**: لا تستدعِ `flushSync` مرارًا في حلقات مغلقة (tight loops)
- **فكّر في البدائل**: أحيانًا يكون `useLayoutEffect` خيارًا أفضل

```typescript
// ✅ Good: Batch multiple updates
flushSync(() => {
  setItems(newItems);
  setLoading(false);
  setError(null);
});

// ❌ Bad: Multiple flushSync calls
flushSync(() => setItems(newItems));
flushSync(() => setLoading(false));
flushSync(() => setError(null));
```

## متى تستخدم `useLayoutEffect` بدلًا منه

أحيانًا يكون `useLayoutEffect` خيارًا أفضل من `flushSync`:

```typescript
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

function AutoResizeTextarea() {
  const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const [value, setValue] = useState('');

  // ✅ Good: useLayoutEffect for DOM measurements
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
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

## حالات استخدام في الواقع™

هذه بعض السيناريوهات المطبِّقة التي تلمع فيها هذه الأنماط:

### التحقّق من النموذج مع التركيز

```typescript
interface FormError {
  field: string;
  message: string;
}

function ValidatedForm() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const fieldsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const validateAndFocus = (formData: FormData) => {
    const newErrors: FormError[] = [];

    // Validate fields...
    if (!formData.get('email')) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    }

    if (newErrors.length > 0) {
      // ✅ Good: Update errors first, then focus
      flushSync(() => {
        setErrors(newErrors);
      });

      // Focus first error field
      const firstErrorField = newErrors[0].field;
      fieldsRef.current[firstErrorField]?.focus();
    }

    return newErrors.length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (validateAndFocus(formData)) {
          console.log('Form submitted!');
        }
      }}
    >
      <input
        name="email"
        type="email"
        ref={(el) => (fieldsRef.current.email = el)}
        placeholder="Email"
      />
      {errors.find((e) => e.field === 'email') && <p style={{ color: 'red' }}>Email is required</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### محتوى ديناميكي مع الحفاظ على موضع التمرير

```typescript
function ChatMessages() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string }>>([]);
  const messagesRef: RefObject<HTMLDivElement> = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const addMessage = (text: string) => {
    const container = messagesRef.current;
    if (!container) return;

    // Check if user was at bottom before adding message
    const wasAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

    const newMessage = {
      id: crypto.randomUUID(),
      text,
    };

    // ✅ Good: Add message, then decide whether to scroll
    flushSync(() => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Only auto-scroll if user was already at bottom
    if (wasAtBottom || shouldScrollToBottom) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return (
    <div>
      <div
        ref={messagesRef}
        style={{
          height: '300px',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
      >
        {messages.map((message) => (
          <div key={message.id} style={{ padding: '8px' }}>
            {message.text}
          </div>
        ))}
      </div>
      <button onClick={() => addMessage(`Message ${messages.length + 1}`)}>Add Message</button>
    </div>
  );
}
```

## الخلاصة

أنماط `flushSync` والـ DOM الأمْرِيّة مخارج هروب قويّة من النموذج الإعلاني في React. استخدمها حين تحتاج دقّة في التوقيت لإدارة التركيز، أو قياسات الـ DOM، أو تنسيق الحركات—لكن قِس أثر الأداء دومًا، وفكّر هل تعمل البدائل الإعلانية على غرارها.

تذكّر: طبيعة React غير المتزامنة ميزة في الغالب لا خللًا. وعندما تحتاج فعلًا إلى الخروج من ذلك النموذج، يساعدك نظام أنواع TypeScript على ضمان أن تفعل بأمان، عبر التقاط أخطاء المراجع الفارغة (null reference) وتوفير أنواع عناصر مناسبة لمعالجاتك في الـ DOM.

المفتاح أن تعرف متى تكون هذه الأدوات ضرورية فعلًا ومتى تكون في محاربة الأنماط الطبيعية لـ React. عند الشكّ، ابدأ بالنهج الإعلاني، ولا تقبض على `flushSync` إلا إذا كان عندك شرط توقيت بعينه لا يحلّه غيره.
