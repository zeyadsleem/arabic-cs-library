---
title: "جلب البيانات باستخدام `useState` و`useEffect`"
---

جلب البيانات هو النقطة التي تلتقي فيها تطبيقات React بالعالم الحقيقي، وهو أيضًا حيث يبدع TypeScript حقًا. حين تجمع بين `useState` و`useEffect` لجلب البيانات، يساعدك TypeScript على التعامل مع جميع الحالات الحدّية: حالات التحميل، ومعالجة الأخطاء، وسباقات الطلبات (race conditions)، والتنظيف (cleanup). لا مزيد من أخطاء «Cannot read property 'title' of undefined» في بيئة الإنتاج.

في هذا الدليل سنبني أنماطًا متينة لجلب البيانات باستخدام واجهة مهام JSONPlaceholder، بدءًا من الجلب الأساسي وصولًا إلى أنماط جاهزة للإنتاج مع معالجة أخطاء سليمة ومنع سباقات الطلبات.

## النمط الأساسي للجلب

لنبدأ بجلب بسيط يجلب كل المهام:

```typescript
import { useState, useEffect } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Todo[]) => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []); // Empty dependency array = run once on mount

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.completed ? '✅' : '⭕'} {todo.title}
        </li>
      ))}
    </ul>
  );
}
```

هذا يعمل، لكن هناك عدة تحسينات يمكننا إجراءها لشيفرة الإنتاج.

## نمط async/await مع معالجة أخطاء سليمة

صياغة async/await أنظف تجعل معالجة الأخطاء أكثر وضوحًا:

```typescript
function ImprovedTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setError(null); // Clear previous errors

        const response = await fetch('https://jsonplaceholder.typicode.com/todos');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        // Type guard to ensure we have an Error object
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Todos ({todos.length})</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## منع سباقات الطلبات عبر التنظيف

حين تجلب البيانات اعتمادًا على الخصائص (props) أو الحالة، عليك التعامل مع الحالة التي يُحدَّث فيها المكوّن قبل اكتمال الطلب السابق:

```typescript
function UserTodos({ userId }: { userId: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This flag prevents setting state after unmount
    let isCancelled = false;

    const fetchUserTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch todos for user ${userId}`);
        }

        const data: Todo[] = await response.json();

        // Only update state if this effect hasn't been cancelled
        if (!isCancelled) {
          setTodos(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setIsLoading(false);
        }
      }
    };

    fetchUserTodos();

    // Cleanup function - runs when component unmounts or userId changes
    return () => {
      isCancelled = true;
    };
  }, [userId]); // Re-run when userId changes

  if (isLoading) return <div>Loading todos for user {userId}...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>User {userId}'s Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.completed ? 0.5 : 1 }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## استخدام AbortController للإلغاء الحقيقي

للتحكم الأفضل، استخدم AbortController لإلغاء طلب الشبكة فعليًا:

```typescript
function CancellableTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          signal: abortController.signal, // Pass the abort signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        // Check if the error is from aborting
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();

    // Cleanup: abort the fetch if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## خُطّاف جلب عام لإعادة الاستخدام

لنصنع خُطّافًا قابلًا لإعادة الاستخدام يتولى كل الشيفرة المتكرّرة (boilerplate):

```typescript
// Generic type for any API response
function useFetch<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, dependencies); // Re-run when dependencies change

  return { data, isLoading, error, refetch: () => {} };
}

// Usage with type inference
function TodoListWithHook() {
  const {
    data: todos,
    isLoading,
    error,
  } = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos', []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!todos) return <div>No todos found</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## التعامل مع عدة حالات غير متزامنة

حين تحتاج إلى تنسيق عدة عمليات جلب:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function TodoWithUserInfo({ todoId }: { todoId: number }) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTodoAndUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch todo first
        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
          signal: abortController.signal,
        });

        if (!todoResponse.ok) {
          throw new Error('Failed to fetch todo');
        }

        const todoData: Todo = await todoResponse.json();
        setTodo(todoData);

        // Then fetch the user
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${todoData.userId}`,
          { signal: abortController.signal },
        );

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData: User = await userResponse.json();
        setUser(userData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoAndUser();

    return () => {
      abortController.abort();
    };
  }, [todoId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo || !user) return <div>Data not found</div>;

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>
        Assigned to: {user.name} ({user.email})
      </p>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}
```

## الجلب المتوازي عبر Promise.all

حين لا تعتمد عمليات الجلب بعضها على بعض، شغّلها بالتوازي:

```typescript
function DashboardData() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both in parallel
        const [todosResponse, usersResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/todos', {
            signal: abortController.signal,
          }),
          fetch('https://jsonplaceholder.typicode.com/users', {
            signal: abortController.signal,
          }),
        ]);

        // Check both responses
        if (!todosResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        // Parse both responses
        const [todosData, usersData] = await Promise.all([
          todosResponse.json() as Promise<Todo[]>,
          usersResponse.json() as Promise<User[]>,
        ]);

        setTodos(todosData);
        setUsers(usersData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      abortController.abort();
    };
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Users ({users.length})</h3>
        <h3>Total Todos ({todos.length})</h3>
        <h3>Completed ({todos.filter((t) => t.completed).length})</h3>
      </div>
    </div>
  );
}
```

## الترقيم الصفحي والتمرير اللانهائي

التعامل مع البيانات المقسّمة إلى صفحات باستخدام TypeScript:

```typescript
function PaginatedTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`,
          { signal: abortController.signal },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const newTodos: Todo[] = await response.json();

        if (newTodos.length === 0) {
          setHasMore(false);
        } else {
          setTodos((prev) => [...prev, ...newTodos]);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();

    return () => {
      abortController.abort();
    };
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h2>Todos (Paginated)</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      {isLoading && <div>Loading more...</div>}
      {error && <div>Error: {error}</div>}

      {hasMore && !isLoading && <button onClick={loadMore}>Load More</button>}

      {!hasMore && <div>No more todos to load</div>}
    </div>
  );
}
```

## البحث المؤجَّل (Debounced)

في ميزة البحث، أجّل استدعاءات الواجهة البرمجية (debounce):

```typescript
function TodoSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setTodos([]);
      return;
    }

    // Debounce the search
    const timeoutId = setTimeout(() => {
      const abortController = new AbortController();

      const searchTodos = async () => {
        try {
          setIsSearching(true);

          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos?q=${encodeURIComponent(searchTerm)}`,
            { signal: abortController.signal },
          );

          if (!response.ok) {
            throw new Error('Search failed');
          }

          const results: Todo[] = await response.json();
          setTodos(results);
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Search error:', err);
          }
        } finally {
          setIsSearching(false);
        }
      };

      searchTodos();

      // Cleanup for the fetch
      return () => {
        abortController.abort();
      };
    }, 500); // 500ms debounce delay

    // Cleanup for the timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
      />

      {isSearching && <div>Searching...</div>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## منطق إعادة المحاولة للطلبات الفاشلة

أضف إعادة محاولة تلقائية للأعطال العابرة:

```typescript
function TodosWithRetry() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchWithRetry = async () => {
      setIsLoading(true);
      setError(null);

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            signal: abortController.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Todo[] = await response.json();
          setTodos(data);
          setRetryCount(0); // Reset on success
          break; // Exit retry loop on success
        } catch (err) {
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
              break; // Don't retry if aborted
            }

            if (attempt === maxRetries) {
              setError(`Failed after ${maxRetries + 1} attempts: ${err.message}`);
              setRetryCount(attempt);
            } else {
              console.log(`Attempt ${attempt + 1} failed, retrying...`);
              // Wait before retrying (exponential backoff)
              await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
          }
        }
      }

      setIsLoading(false);
    };

    fetchWithRetry();

    return () => {
      abortController.abort();
    };
  }, []); // Add retryCount to deps if you want manual retry

  const manualRetry = () => {
    setRetryCount(0);
    // Trigger re-fetch by updating a dependency
  };

  if (isLoading) return <div>Loading (Attempt {retryCount + 1})...</div>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={manualRetry}>Retry</button>
      </div>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## أفضل الممارسات والأخطاء الشائعة

### تعامل دائمًا مع حالة التحميل

```typescript
// ❌ Bad: No loading state
function BadExample() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then(setData);
  }, []);

  // This will show "No todos" while loading!
  return data.length === 0 ? <div>No todos</div> : <div>...</div>;
}

// ✅ Good: Explicit loading state
function GoodExample() {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return data.length === 0 ? <div>No todos</div> : <div>...</div>;
}
```

### لا تنسَ التنظيف

```typescript
// ❌ Bad: No cleanup, can cause memory leaks
function BadCleanup({ id }: { id: number }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then(setData); // This might run after unmount!
  }, [id]);
}

// ✅ Good: Proper cleanup
function GoodCleanup({ id }: { id: number }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setData(data);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);
}
```

### صرّح بأنواع استجابات الواجهة البرمجية

```typescript
// ❌ Bad: Using 'any' type
const response = await fetch('/api/todos');
const data: any = await response.json();

// ✅ Good: Explicit typing
const response = await fetch('/api/todos');
const data: Todo[] = await response.json();

// ✅ Better: Runtime validation (covered in next tutorial)
const response = await fetch('/api/todos');
const data = await response.json();
const validatedData = TodoSchema.parse(data); // Using Zod
```

## الخلاصة

جلب البيانات باستخدام `useState` و`useEffect` يتطلب عناية دقيقة بما يلي:

1. **حالات التحميل** — اعرض دائمًا تغذية راجعة مناسبة
2. **معالجة الأخطاء** — التقط الأخطاء واعرضها برشاقة
3. **سباقات الطلبات** — ألغِ الطلبات القديمة
4. **التنظيف** — امنع تسريبات الذاكرة وتحديثات الحالة بعد إزالة المكوّن
5. **أنواع TypeScript** — صرّح بأنواع استجابات الواجهة البرمجية صراحةً

بهذه الأنماط تستطيع بناء جلب بيانات متين يتعامل مع جميع الحالات الحدّية التي سيواجهها المستخدمون في بيئة الإنتاج.

## ما التالي؟

في الدليل التالي، سنغوص أعمق في أنماط حالات التحميل ومعالجة الأخطاء، بما في ذلك الاتحادات المُميَّزة لتمثيل الحالات غير المتزامنة، وحدود الأخطاء، ورسائل الأخطاء المفهومة للمستخدم.
