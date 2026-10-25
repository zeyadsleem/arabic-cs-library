---
title: "حالات التحميل ومعالجة الأخطاء"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/loading-states-error-handling"
---

نصف العمل في بناء تجربة مستخدم رائعة هو التعامل مع المسارات غير الموفّقة برشاقة. حين تجلب المهام (todos) من واجهة برمجية (API)، يحتاج المستخدمون إلى معرفة وقت تحميل البيانات، ووقت نجاحها، والأهم من ذلك: وقت فشلها وما الذي يمكنهم فعله حيال ذلك. تتيح لنا الاتحادات المُميَّزة (discriminated unions) في TypeScript نمذجة هذه الحالات بطريقة تجعل كتابة الأخطاء مستحيلةً حرفيًا.

في هذا الدليل سنستكشف أنماطًا لتمثيل الحالات غير المتزامنة تُزيل فئات كاملة من الأخطاء، وتوفّر تجربة مستخدم أفضل، وتجعل شيفرتك أكثر قابلية للصيانة.

## المشكلة مع الأعلام المنطقية

لنبدأ بما لا ينبغي فعله. هذه هي الطريقة التي يقترب بها كثير من المطوّرين من الحالة غير المتزامنة في البداية:

```typescript
// ❌ The problematic boolean approach
function BadTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // This allows impossible states:
  // - isLoading=true AND hasError=true?
  // - todos.length > 0 AND isLoading=true?
  // - hasError=false BUT errorMessage='Something went wrong'?

  // Your UI logic becomes a maze of conditionals
  if (isLoading && hasError) {
    // This shouldn't be possible but it is!
    return <div>Loading... but also error?</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {errorMessage}</div>;
  if (todos.length === 0) return <div>No todos</div>; // Or are we still loading?

  return <div>...</div>;
}
```

المشكلة؟ إنك تستطيع تمثيل حالات مستحيلة، وفي النهاية ستقوم بذلك.

## الاتحادات المُميَّزة: جعل الحالات المستحيلة مستحيلة

إليك طريقة أفضل باستخدام الاتحادات المُميَّزة في TypeScript:

```typescript
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Each state is mutually exclusive
type TodosState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Todo[] }
  | { status: 'error'; error: Error };

function GoodTodoList() {
  const [state, setState] = useState<TodosState>({ status: 'idle' });

  useEffect(() => {
    const fetchTodos = async () => {
      setState({ status: 'loading' });

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchTodos();
  }, []);

  // TypeScript ensures we handle every case
  switch (state.status) {
    case 'idle':
      return <div>Ready to load todos</div>;

    case 'loading':
      return <div>Loading todos...</div>;

    case 'error':
      return (
        <div>
          <h3>Failed to load todos</h3>
          <p>{state.error.message}</p>
          <button onClick={() => setState({ status: 'idle' })}>Try Again</button>
        </div>
      );

    case 'success':
      return (
        <ul>
          {state.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      );

    // TypeScript knows this is exhaustive
    default:
      const _exhaustive: never = state;
      return null;
  }
}
```

الآن أصبح من المستحيل أن تكون الحالة في تحميل وفي الوقت نفسه هناك خطأ. لن يسمح لك TypeScript بالوصول إلى `data` ما لم تكن الحالة `success`. رائع!

## نوع عام للحالة غير المتزامنة

لنجعل هذا النمط قابلًا لإعادة الاستخدام:

```typescript
// Generic type for any async operation
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Helper functions to create states
const asyncStates = {
  idle: <T>(): AsyncState<T> => ({ status: 'idle' }),
  loading: <T>(): AsyncState<T> => ({ status: 'loading' }),
  success: <T>(data: T): AsyncState<T> => ({ status: 'success', data }),
  error: <T>(error: Error): AsyncState<T> => ({ status: 'error', error })
};

// Custom hook using the generic type
function useAsyncState<T>(asyncFunction: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>(asyncStates.idle());

  const execute = useCallback(async () => {
    setState(asyncStates.loading());

    try {
      const data = await asyncFunction();
      setState(asyncStates.success(data));
    } catch (error) {
      setState(asyncStates.error(
        error instanceof Error ? error : new Error('Unknown error')
      ));
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState(asyncStates.idle());
  }, []);

  return { state, execute, reset };
}

// Usage
function TodoListWithHook() {
  const { state, execute, reset } = useAsyncState(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json() as Promise<Todo[]>;
  });

  useEffect(() => {
    execute();
  }, [execute]);

  switch (state.status) {
    case 'idle':
      return <button onClick={execute}>Load Todos</button>;

    case 'loading':
      return <div>Loading...</div>;

    case 'error':
      return (
        <div>
          <p>Error: {state.error.message}</p>
          <button onClick={execute}>Retry</button>
        </div>
      );

    case 'success':
      return (
        <div>
          <button onClick={reset}>Reset</button>
          <ul>
            {state.data.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      );
  }
}
```

## معالجة الأخطاء المحسّنة بأنواع الأخطاء

الأخطاء المختلفة تحتاج معالجة مختلفة:

```typescript
// Classify different error types
type ErrorType = 'network' | 'timeout' | 'server' | 'validation' | 'unknown';

interface TypedError extends Error {
  type: ErrorType;
  statusCode?: number;
  retry?: boolean;
}

function classifyError(error: unknown): TypedError {
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    return {
      name: 'NetworkError',
      message: 'Network connection failed. Please check your internet connection.',
      type: 'network',
      retry: true,
    };
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return {
      name: 'TimeoutError',
      message: 'Request timed out. Please try again.',
      type: 'timeout',
      retry: true,
    };
  }

  if (error instanceof Response) {
    if (error.status >= 500) {
      return {
        name: 'ServerError',
        message: 'Server error. Please try again later.',
        type: 'server',
        statusCode: error.status,
        retry: true,
      };
    }

    if (error.status >= 400) {
      return {
        name: 'ClientError',
        message: 'Request failed. Please check your input.',
        type: 'validation',
        statusCode: error.status,
        retry: false,
      };
    }
  }

  return {
    name: 'UnknownError',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    type: 'unknown',
    retry: true,
  };
}

// Enhanced async state with typed errors
type EnhancedAsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; progress?: number }
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: TypedError; attemptCount: number };

function TodoListWithEnhancedErrors() {
  const [state, setState] = useState<EnhancedAsyncState<Todo[]>>({
    status: 'idle',
  });

  const fetchWithRetry = async (attemptCount = 0) => {
    setState({ status: 'loading' });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');

      if (!response.ok) {
        throw response;
      }

      const data: Todo[] = await response.json();
      setState({
        status: 'success',
        data,
        timestamp: new Date(),
      });
    } catch (error) {
      const typedError = classifyError(error);
      setState({
        status: 'error',
        error: typedError,
        attemptCount: attemptCount + 1,
      });

      // Auto-retry for certain errors
      if (typedError.retry && attemptCount < 3) {
        setTimeout(() => fetchWithRetry(attemptCount + 1), 2000 * (attemptCount + 1));
      }
    }
  };

  useEffect(() => {
    fetchWithRetry();
  }, []);

  switch (state.status) {
    case 'idle':
      return <div>Initializing...</div>;

    case 'loading':
      return (
        <div>
          <div>Loading todos...</div>
          {state.progress && (
            <progress value={state.progress} max={100}>
              {state.progress}%
            </progress>
          )}
        </div>
      );

    case 'error':
      return (
        <div className="error-container">
          <h3>
            {state.error.type === 'network' && '🌐'}
            {state.error.type === 'timeout' && '⏱️'}
            {state.error.type === 'server' && '🖥️'} Error Loading Todos
          </h3>
          <p>{state.error.message}</p>
          {state.error.statusCode && <code>Status: {state.error.statusCode}</code>}
          {state.attemptCount > 1 && <p>Attempted {state.attemptCount} times</p>}
          {state.error.retry && (
            <button onClick={() => fetchWithRetry(state.attemptCount)}>Try Again</button>
          )}
        </div>
      );

    case 'success':
      return (
        <div>
          <p>
            Loaded {state.data.length} todos at {state.timestamp.toLocaleTimeString()}
          </p>
          <ul>
            {state.data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      );
  }
}
```

## التحديثات المتفائلة مع التراجع

تعامل مع التحديثات المتفائلة التي قد تفشل:

```typescript
type OptimisticState<T> =
  | { status: 'stable'; data: T }
  | { status: 'updating'; data: T; optimisticData: T }
  | { status: 'reverting'; data: T; error: Error };

function TodoListWithOptimisticUpdates() {
  const [state, setState] = useState<OptimisticState<Todo[]>>({
    status: 'stable',
    data: [],
  });

  // Load initial data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data: Todo[]) => setState({ status: 'stable', data }));
  }, []);

  const toggleTodo = async (id: number) => {
    // Get current data
    const currentData = 'data' in state ? state.data : [];
    const todoIndex = currentData.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;

    // Create optimistic data
    const optimisticData = [...currentData];
    optimisticData[todoIndex] = {
      ...optimisticData[todoIndex],
      completed: !optimisticData[todoIndex].completed,
    };

    // Apply optimistic update
    setState({
      status: 'updating',
      data: currentData,
      optimisticData,
    });

    try {
      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: optimisticData[todoIndex].completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      // Commit the optimistic update
      setState({ status: 'stable', data: optimisticData });
    } catch (error) {
      // Revert on failure
      setState({
        status: 'reverting',
        data: currentData,
        error: error instanceof Error ? error : new Error('Update failed'),
      });

      // After showing error, revert to stable
      setTimeout(() => {
        setState({ status: 'stable', data: currentData });
      }, 2000);
    }
  };

  const displayData = state.status === 'updating' ? state.optimisticData : state.data;

  return (
    <div>
      {state.status === 'reverting' && (
        <div className="error-banner">Failed to update. Reverting changes...</div>
      )}

      <ul>
        {displayData.map((todo) => (
          <li
            key={todo.id}
            style={{
              opacity: state.status === 'updating' ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              disabled={state.status !== 'stable'}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## حالات التحميل الهيكلية

وفّر أداءً إدراكيًا أفضل باستخدام شاشات الهيكل (skeleton):

```typescript
function TodoSkeleton() {
  return (
    <div className="todo-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-checkbox" />
          <div className="skeleton-text" />
        </div>
      ))}
    </div>
  );
}

type LoadingState<T> =
  | { status: 'skeleton' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error; canRetry: boolean };

function TodoListWithSkeleton() {
  const [state, setState] = useState<LoadingState<Todo[]>>({
    status: 'skeleton',
  });

  useEffect(() => {
    // Show skeleton immediately
    setState({ status: 'skeleton' });

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setState((prev) =>
        prev.status === 'skeleton'
          ? { status: 'loading', progress: 10 }
          : prev.status === 'loading' && prev.progress < 90
            ? { status: 'loading', progress: prev.progress + 20 }
            : prev,
      );
    }, 200);

    // Fetch actual data
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: Todo[]) => {
        clearInterval(progressInterval);
        setState({ status: 'success', data });
      })
      .catch((error) => {
        clearInterval(progressInterval);
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
          canRetry: true,
        });
      });

    return () => clearInterval(progressInterval);
  }, []);

  switch (state.status) {
    case 'skeleton':
      return <TodoSkeleton />;

    case 'loading':
      return (
        <div>
          <TodoSkeleton />
          <progress value={state.progress} max={100}>
            {state.progress}%
          </progress>
        </div>
      );

    case 'error':
      return (
        <div className="error-state">
          <p>😔 {state.error.message}</p>
          {state.canRetry && <button onClick={() => window.location.reload()}>Retry</button>}
        </div>
      );

    case 'success':
      return (
        <ul>
          {state.data.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </li>
          ))}
        </ul>
      );
  }
}
```

## حدود الأخطاء للأخطاء غير المتوقعة

التقط الأخطاء التي تحدث أثناء التصيير (render):

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
    // Send to error reporting service
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry);
      }

      return (
        <div className="error-boundary-default">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error.message}</pre>
          </details>
          <button onClick={this.retry}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary
      fallback={(error, retry) => (
        <div className="custom-error">
          <h3>Oops! The todos couldn't load</h3>
          <p>{error.message}</p>
          <button onClick={retry}>Reload</button>
        </div>
      )}
    >
      <TodoListWithEnhancedErrors />
    </ErrorBoundary>
  );
}
```

## دمج عدة حالات غير متزامنة

حين تكون لديك عدة عمليات غير متزامنة:

```typescript
type MultiAsyncState<T, U> = {
  todos: AsyncState<T>;
  user: AsyncState<U>;
};

function DashboardWithMultipleStates() {
  const [state, setState] = useState<MultiAsyncState<Todo[], User>>({
    todos: { status: 'idle' },
    user: { status: 'idle' },
  });

  useEffect(() => {
    // Fetch todos
    setState((prev) => ({
      ...prev,
      todos: { status: 'loading' },
    }));

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setState((prev) => ({
          ...prev,
          todos: { status: 'success', data },
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          todos: {
            status: 'error',
            error: error instanceof Error ? error : new Error('Failed to fetch todos'),
          },
        }));
      });

    // Fetch user
    setState((prev) => ({
      ...prev,
      user: { status: 'loading' },
    }));

    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data: User) => {
        setState((prev) => ({
          ...prev,
          user: { status: 'success', data },
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          user: {
            status: 'error',
            error: error instanceof Error ? error : new Error('Failed to fetch user'),
          },
        }));
      });
  }, []);

  // Derive overall state
  const isLoading = state.todos.status === 'loading' || state.user.status === 'loading';
  const hasError = state.todos.status === 'error' || state.user.status === 'error';
  const isReady = state.todos.status === 'success' && state.user.status === 'success';

  if (isLoading) return <div>Loading dashboard...</div>;

  if (hasError) {
    return (
      <div>
        {state.todos.status === 'error' && <p>Todos error: {state.todos.error.message}</p>}
        {state.user.status === 'error' && <p>User error: {state.user.error.message}</p>}
      </div>
    );
  }

  if (isReady) {
    return (
      <div>
        <h2>Welcome, {state.user.data.name}!</h2>
        <h3>Your Todos:</h3>
        <ul>
          {state.todos.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>Initializing...</div>;
}
```

## أفضل الممارسات {#best-practices}

### 1. استخدم دائمًا الاتحادات المُميَّزة للحالة غير المتزامنة

```typescript
// ✅ Good: Impossible states are impossible
type State =
  { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error };

// ❌ Bad: Many impossible states
interface State {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
}
```

### 2. قدّم رسائل أخطاء مفهومة للمستخدم

```typescript
// ✅ Good: Helpful error message with action
<div>
  <h3>Unable to load your todos</h3>
  <p>Please check your internet connection and try again.</p>
  <button onClick={retry}>Retry</button>
</div>

// ❌ Bad: Technical error message
<div>Error: NetworkError: Failed to fetch</div>
```

### 3. تعامل مع جميع انتقالات الحالة

```typescript
// ✅ Good: Clear state flow
idle -> loading -> success/error
error -> loading -> success/error
success -> loading (refresh) -> success/error

// ❌ Bad: Unclear transitions
loading -> loading (what happened?)
success -> error (without loading?)
```

### 4. خذ بعين الاعتبار البيانات القديمة (stale data)

```typescript
type DataState<T> =
  | { status: 'loading'; staleData?: T } // Show old data while loading
  | { status: 'success'; data: T; isStale?: boolean }
  | { status: 'error'; error: Error; lastValidData?: T };
```

## الخلاصة

حالات التحميل ومعالجة الأخطاء السليمة أمران حاسمان لتطبيقات React الإنتاجية. أهم ما تأخذه معك:

1. **استخدم الاتحادات المُميَّزة** — اجعل الحالات المستحيلة غير قابلة للتمثيل
2. **صنّف الأخطاء** — الأخطاء المختلفة تحتاج معالجة مختلفة
3. **قدّم تغذية راجعة** — يجب أن يعرف المستخدمون دائمًا ما يحدث
4. **وفّر وسيلة للتعافي** — اعرض دائمًا طريقة لإعادة المحاولة أو للتعافي
5. **فكّر في التحديثات المتفائلة** — لكن عالج التراجع دائمًا
6. **استخدم حدود الأخطاء** — التقط أخطاء التصيير غير المتوقعة

## ما التالي؟

الآن وقد استطعنا التعامل مع التحميل والأخطاء على النحو الصحيح، لنبدأ بتنفيذ عمليات CRUD. يغطي الدليل التالي إنشاء المهام عبر طلبات POST.
