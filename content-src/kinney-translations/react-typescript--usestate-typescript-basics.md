---
title: "useState مع TypeScript: الأساسيات"
---

حين تجمع خُطّاف `useState` في React مع TypeScript، تحصل على ثنائيٍّ قويّ يلتقط الأخطاء قبل وقوعها. لكنّ الأمر يتجاوز مجرّد وضع الأنواع على متغيّرات حالتك. إن فهمتَ كيف يستنتج TypeScript الأنواع، ومتى ينبغي أن تكون صريحًا، وكيف تتعامل مع أشكال الحالة المعقّدة، فإنّ تجربة تطويرك في React ستتحوّل من «آمل أن يعمل» إلى «متيقّن من أنّه يعمل».

في هذا الدليل، سنبني تدريجيًا من أبسط أنماط useState إلى التعامل مع أشكال الحالة المعقّدة، مستخدمين واجهة JSONPlaceholder لقوائم المهام مثالًا واقعيًا في كلّ مراحل الشرح.

## استنتاج الأنواع: حين يعرف TypeScript وحده

TypeScript ذكيّ في استنتاج الأنواع من القيم الابتدائية. وللأنواع الأولية البسيطة، لن تحتاج غالبًا إلى أنواع صريحة:

```typescript
import { useState } from 'react';

function TodoCounter() {
  // TypeScript infers these types automatically
  const [count, setCount] = useState(0); // number
  const [title, setTitle] = useState(''); // string
  const [isDone, setIsDone] = useState(false); // boolean

  return (
    <div>
      <p>Todos completed: {count}</p>
      <button onClick={() => setCount(count + 1)}>Mark one complete</button>

      {/* TypeScript ensures type safety */}
      <button onClick={() => setCount('five')}>
        {' '}
        {/* ❌ Error: string not assignable to number */}
        This won't compile
      </button>
    </div>
  );
}
```

أين الجمال هنا؟ يقيّد TypeScript تلقائيًا نوع `setCount` ليقبل الأعداد فقط أو دالةً تُعيد عددًا. فتحصل على أمانٍ وقت التصريف دون كتابة أي تعليق نوع واحد.

## حين لا يكفي الاستنتاج: كن صريحًا

رغم أنّ الاستنتاج ممتاز مع الأنواع الأولية، ستحتاج إلى أن تكون صريحًا في عدّة سيناريوهات شائعة:

### المصفوفات الفارغة: الفخّ الكلاسيكي

```typescript
function TodoList() {
  // ❌ Bad: TypeScript infers never[] - you can't add anything!
  const [items, setItems] = useState([]);

  // This will cause a TypeScript error
  setItems(['Buy milk']); // Error: Type 'string' is not assignable to type 'never'
}
```

الحلّ؟ كن صريحًا بشأن ما ستحتوي عليه المصفوفة:

```typescript
function TodoList() {
  // ✅ Good: Explicitly typed array
  const [items, setItems] = useState<string[]>([]);

  // Now this works perfectly
  setItems(['Buy milk', 'Walk the dog']);

  // TypeScript still protects you
  setItems([1, 2, 3]); // ❌ Error: number[] not assignable to string[]
}
```

### أنواع اتحادية للقيم المقيَّدة

حين لا ينبغي أن تتجاوز حالتك قيمًا معيّنة، وجّه TypeScript باستخدام الأنواع الاتحادية:

```typescript
type FilterStatus = 'all' | 'active' | 'completed';

function TodoFilter() {
  // Without explicit typing, TypeScript infers 'string'
  const [filter, setFilter] = useState<FilterStatus>('all');

  // TypeScript ensures only valid values
  setFilter('completed'); // ✅ Works
  setFilter('pending'); // ❌ Error: 'pending' not assignable to FilterStatus

  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
}
```

## العمل مع الكائنات: نوع Todo

لنعرّف نوع Todo استنادًا إلى بنية واجهة JSONPlaceholder:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function TodoItem() {
  // Single todo item (can be null initially)
  const [todo, setTodo] = useState<Todo | null>(null);

  // Array of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Example: Adding a new todo
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      userId: 1,
      id: Date.now(), // Temporary ID
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // Example: Toggling completion
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}
```

## نمط null/undefined للبيانات غير المتزامنة

حين لا تكون البيانات قد حُمِّلت بعد، فإن استخدام `null` أو `undefined` كقيمة ابتدائية للحالة نمطٌ شائع:

```typescript
function TodoDetail({ todoId }: { todoId: number }) {
  // null indicates "not loaded yet"
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load todo on mount
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((res) => res.json())
      .then((data: Todo) => setTodo(data))
      .catch((err) => setError(err.message));
  }, [todoId]);

  // TypeScript makes you handle all cases
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Loading...</div>;

  // TypeScript knows todo is definitely Todo here (not null)
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? 'Done' : 'Pending'}</p>
    </div>
  );
}
```

## التحديثات الوظيفية: الطريقة الآمنة

حين تعتمد حالتك التالية على حالتك السابقة، استخدم نمط التحديث الوظيفي. ويستنتج TypeScript تلقائيًا نوع المُعامل:

```typescript
function TodoStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  // TypeScript knows 'prev' has the shape of our stats object
  const incrementCompleted = () => {
    setStats((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      active: prev.active - 1,
    }));
  };

  // This pattern prevents stale closure bugs
  const batchUpdate = () => {
    // All three updates will use the latest state
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
    setStats((prev) => ({ ...prev, active: prev.active + 1 }));
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Active: {stats.active}</p>
    </div>
  );
}
```

## الحالة المعقّدة: متى تُقسِّم ومتى تُدمج

إن كان قرارك بين استخدام عدّة استدعاءات لـ `useState` أو دمج الحالة في كائن واحد يعتمد على العلاقة بين القيم:

```typescript
// ✅ Good: Related values that change together
function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // All form data is together
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      {/* Other fields... */}
    </form>
  );
}

// ✅ Good: Separate concerns that change independently
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Each piece of state has a single responsibility
  // They can be updated independently without affecting others
}
```

## خُطّافات مخصّصة عامة مع useState

أنشئ منطقًا ذا حالة قابلًا لإعادة الاستخدام عبر خُطّافات مخصّصة عامة:

```typescript
// Generic hook for any toggleable value
function useToggle<T>(initialValue: T, alternateValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const toggle = useCallback(() => {
    setValue((current) => (current === initialValue ? alternateValue : initialValue));
  }, [initialValue, alternateValue]);

  return [value, toggle, setValue] as const;
}

// Usage with different types
function TodoControls() {
  const [view, toggleView] = useToggle('list', 'grid');
  const [isDark, toggleTheme] = useToggle(false, true);
  const [sortOrder, toggleSort] = useToggle<'asc' | 'desc'>('asc', 'desc');

  return (
    <div>
      <button onClick={toggleView}>View: {view}</button>
      <button onClick={toggleTheme}>Theme: {isDark ? 'Dark' : 'Light'}</button>
      <button onClick={toggleSort}>Sort: {sortOrder}</button>
    </div>
  );
}
```

## الأخطاء الشائعة وكيف تتجنّبها

### الخطأ 1: تعديل الحالة مباشرة

```typescript
function TodoMutationBug() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ❌ Bad: Mutating state directly
  const buggyAddTodo = (newTodo: Todo) => {
    todos.push(newTodo); // This mutates the existing array
    setTodos(todos); // React won't re-render!
  };

  // ✅ Good: Creating a new array
  const correctAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]); // New array reference
  };

  // ✅ Better: Using functional update
  const bestAddTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]); // Always uses latest state
  };
}
```

### الخطأ 2: الإغلاقات القديمة (stale closures) في معالجات الأحداث

```typescript
function StaleClosureExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ❌ Bad: count is captured and becomes stale
    const timer = setInterval(() => {
      setCount(count + 1); // Always adds to the initial count!
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty deps means count is captured once

  // ✅ Good: Using functional update
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1); // Always uses current value
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Now the empty deps array is safe
}
```

### الخطأ 3: تحديد الأنواع أكثر من اللازم

```typescript
// ❌ Unnecessary: TypeScript can infer this
const [name, setName] = useState<string>('');

// ✅ Let inference work for simple cases
const [name, setName] = useState('');

// ✅ Be explicit only when needed
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
```

## نصائح الأداء

### نصيحة 1: حالة ابتدائية كسولة

حين تتطلّب الحالة الابتدائية حسابًا مكلفًا، استخدم دالةً:

```typescript
function ExpensiveComponent() {
  // ❌ This runs on every render
  const [data, setData] = useState(expensiveComputation());

  // ✅ This runs only once
  const [data, setData] = useState(() => expensiveComputation());

  // Real example: parsing localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
}
```

### نصيحة 2: تجميع تحديثات الحالة

يجمع React تحديثات الحالة تلقائيًا في معالجات الأحداث:

```typescript
function TodoBatching() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [count, setCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const handleClick = () => {
    // These are automatically batched - one re-render
    setTodos([]);
    setCount(0);
    setLastUpdate(new Date());
  };

  // In async code, updates are also batched in React 18+
  const handleAsync = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    // Still batched in React 18+
    setTodos(data);
    setCount(data.length);
    setLastUpdate(new Date());
  };
}
```

## تجميع كل ما سبق: مثال كامل

إليك كل ما تعلّمناه في مكوّن عملي لقائمة المهام:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type FilterStatus = 'all' | 'active' | 'completed';

function TodoManager() {
  // Multiple pieces of state with proper typing
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computed value based on state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodo: Todo = {
      userId: 1,
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setNewTodoTitle('');
  };

  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo Manager</h1>

      {/* Add new todo form */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
          All ({todos.length})
        </button>
        <button onClick={() => setFilter('active')} disabled={filter === 'active'}>
          Active ({todos.filter((t) => !t.completed).length})
        </button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
          Completed ({todos.filter((t) => t.completed).length})
        </button>
      </div>

      {/* Todo list */}
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## الخلاصات الأساسية

1. **دع TypeScript يستنتج متى أمكن** - بالنسبة للأنواع الأولية البسيطة، يكون استنتاج TypeScript كافيًا عادةً
2. **كن صريحًا مع الأنواع المعقّدة** - تحتاج المصفوفات والكائنات والأنواع الاتحادية إلى تحديدٍ صريح
3. **استخدم الأنواع الاتحادية مع null** - نمط `Type | null` مثالي للبيانات غير المتزامنة
4. **فضّل التحديثات الوظيفية** - فهي تمنع أخطاء الإغلاقات القديمة وأكثر قابلية للتنبّؤ
5. **قسّم الحالة بحسب المسؤوليات** - أبقِ الحالة غير المرتبطة منفصلة للحصول على شيفرة أنظف
6. **هيّئ الحالة المكلفة كسولًا** - استخدم الدوال للحسابات الابتدائية المكلفة

## ما التالي؟

الآن بعد أن فهمتَ أساسيات useState مع TypeScript، أصبحتَ مستعدًا لخوض غمار جلب البيانات غير المتزامنة. في الدليل التالي، سنجمع useState مع useEffect لجلب مهام حقيقية من واجهة JSONPlaceholder، ومعالجة حالات التحميل، وإدارة الأخطاء — كل ذلك بأمانٍ كامل في الأنواع.
