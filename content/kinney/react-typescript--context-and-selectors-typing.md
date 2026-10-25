---
title: "أنواع Context والمحدِّدات"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/context-and-selectors-typing"
---

السياق (context) في React يشبه ذلك الصديق الذي يعرف كل الحاضرين في الحفلة — مفيدٌ جدًا لمشاركة البيانات عبر شجرة مكوّناتك، لكن من دون أنواع دقيقة قد يتحوّل إلى مصدر مفاجآت وقت التشغيل وآلام التنقيح. لنتعرّف كيف نبني سياقات (contexts) مكتوبة الأنواع بالكامل باستخدام TypeScript، لا تكتفي بمنع الأخطاء بل تقدّم أيضًا تجربة تطوير ممتازة عبر أنماط الحالة والإجراءات ومحدِّدات (selectors) محسّنة للأداء.

سنغطّي كل شيء من السياقات المكتوبة الأنواع الأساسية إلى الأنماط المتقدّمة مثل السياقات المعتمدة على المحدِّدات التي تقلّل إعادة التصيير غير الضرورية، إضافة إلى بعض «حالات الاستخدام الواقعية™» التي تبرز فيها هذه الأنماط.

## النمط الأساسي للسياق المكتوب الأنواع

لنبدأ بالأساس — سياق مكتوب الأنواع بشكل صحيح يلتقط الأخطاء وقت التجميع بدلًا من وقت التشغيل. إليك ما يلجأ إليه أغلب المطوّرين أولًا:

```typescript
import { createContext, useContext, ReactNode } from 'react';

// ✅ Define your context value type explicitly
interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ Create context with undefined as default
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  // Your state logic here...
  const value: UserContextType = {
    currentUser,
    isLoading,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// ✅ Custom hook with runtime safety check
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

يمنحنا هذا النمط أمان الأنواع وفحوصًا وقت التشغيل، لكن ما زال ثمة مجال للتحسين. المشكلة الرئيسة؟ كل مكوّن يستخدم `useUser()` سيُعاد تصييره كلما تغيّر *أيّ* جزء من قيمة السياق، حتى إن كان يهمّه `currentUser.name` وحدها.

> **نصيحة**
>
> أنشئ دائمًا خُطّافًا مخصّصًا للسياق بدلًا من تعريض `useContext` مباشرة. يتيح لك ذلك إضافة فحوص وقت التشغيل وتغليف نمط استخدام السياق.

## نمط فصل الحالة والإجراءات

للحالة الأكثر تعقيدًا، يمكن فصل السياق إلى حالة وإجراءات منفصلتين لتحسين الأداء وقابلية الصيانة معًا. يستعير هذا النمط أفكارًا من Redux لكنه يبقي الأمور أبسط:

```typescript
import { createContext, useContext, useReducer, ReactNode } from 'react';

// ✅ Separate state and actions
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
  loadTodos: () => Promise<void>;
}

// ✅ Create separate contexts
const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoActionsContext = createContext<TodoActions | undefined>(undefined);

// ✅ Reducer for state management
type TodoAction =
  | { type: 'ADD_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: TodoState['filter'] } }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }
  | { type: 'SET_TODOS'; payload: { todos: Todo[] } };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
            createdAt: new Date(),
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    // ... other cases
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });

  // ✅ Actions that use the dispatch function
  const actions: TodoActions = {
    addTodo: (text: string) => {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: crypto.randomUUID(), text },
      });
    },
    toggleTodo: (id: string) => {
      dispatch({ type: 'TOGGLE_TODO', payload: { id } });
    },
    deleteTodo: (id: string) => {
      dispatch({ type: 'DELETE_TODO', payload: { id } });
    },
    setFilter: (filter: TodoState['filter']) => {
      dispatch({ type: 'SET_FILTER', payload: { filter } });
    },
    loadTodos: async () => {
      dispatch({ type: 'SET_LOADING', payload: { isLoading: true } });
      try {
        const todos = await fetchTodos();
        dispatch({ type: 'SET_TODOS', payload: { todos } });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
      }
    },
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoActionsContext.Provider value={actions}>{children}</TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}

// ✅ Separate hooks for state and actions
export function useTodoState(): TodoState {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
}

export function useTodoActions(): TodoActions {
  const context = useContext(TodoActionsContext);
  if (context === undefined) {
    throw new Error('useTodoActions must be used within a TodoProvider');
  }
  return context;
}
```

لهذا النهج عدّة مزايا:

- **الأداء**: المكوّنات التي تُطلق الإجراءات فقط لا تُعاد تصييرها عند تغيّر الحالة
- **الوضوح**: الفصل يجعل من الواضح ما هي الحالة وما هو السلوك
- **الاختبار**: يمكنك اختبار الإجراءات بمعزل عن المكوّنات التي تستخدمها

## نمط المحدِّد: أداء يهمّ فعلًا

هنا تصبح الأمور مثيرة. يتيح لك نمط المحدِّد أن تشترك المكوّنات في الشرائح المحدّدة من الحالة التي تعنيها فقط، ما يقلّل بشكل كبير إعادة التصيير غير الضرورية:

```typescript
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

// ✅ State store with subscription capabilities
class AppStateStore {
  private state: AppState;
  private listeners = new Set<() => void>();

  constructor(initialState: AppState) {
    this.state = initialState;
  }

  getState = (): AppState => {
    return this.state;
  };

  setState = (newState: Partial<AppState>): void => {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}

// ✅ Context that provides the store
const AppStateContext = createContext<AppStateStore | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const store = useMemo(
    () =>
      new AppStateStore({
        user: null,
        todos: [],
        theme: 'light',
        notifications: [],
        isLoading: false,
      }),
    [],
  );

  return <AppStateContext.Provider value={store}>{children}</AppStateContext.Provider>;
}

// ✅ Selector hook that prevents unnecessary re-renders
export function useAppState<T>(selector: (state: AppState) => T): T {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [selector, store]),
  );
}

// ✅ Actions hook for state updates
export function useAppActions() {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppActions must be used within AppStateProvider');
  }

  return {
    setUser: (user: User | null) => store.setState({ user }),
    addTodo: (todo: Todo) => {
      const currentState = store.getState();
      store.setState({ todos: [...currentState.todos, todo] });
    },
    setTheme: (theme: 'light' | 'dark') => store.setState({ theme }),
    setLoading: (isLoading: boolean) => store.setState({ isLoading }),
  };
}
```

الآن تستطيع المكوّنات أن تشترك في ما تحتاجه بالضبط:

```typescript
// ✅ This component only re-renders when the user changes
function UserProfile() {
  const user = useAppState((state) => state.user);
  const { setUser } = useAppActions();

  if (!user) return <LoginPrompt />;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

// ✅ This component only re-renders when todos change
function TodoCount() {
  const todoCount = useAppState((state) => state.todos.length);
  const completedCount = useAppState(
    (state) => state.todos.filter((todo) => todo.completed).length,
  );

  return (
    <div>
      {completedCount} of {todoCount} completed
    </div>
  );
}

// ✅ This component only re-renders when theme changes
function ThemeToggle() {
  const theme = useAppState((state) => state.theme);
  const { setTheme } = useAppActions();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

> **ملاحظة**
>
> خُطّاف `useSyncExternalStore` هو الطريقة التي توصي بها React 18 للاشتراك في المخازن الخارجية. فهو يتولّى التفاصيل المعقّدة لضمان عمل محدِّداتك بشكل صحيح مع ميزات React المتزامنة.

## أنواع متقدّمة عبر الاتحادات المُميَّزة

لمنح أمان أنواع أكبر، يمكنك استخدام الاتحادات المُميَّزة (discriminated unions) لضمان أن تكون حالة سياقك دائمًا في إعداد صالح:

```typescript
// ✅ Use discriminated unions for complex state
type AuthState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'authenticated'; user: User }
  | { status: 'error'; error: string };

interface AppContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

// ✅ Type-safe state transitions
export function useAuth() {
  const { auth, setAuth } = useAppContext();

  const login = async (credentials: LoginCredentials) => {
    setAuth({ status: 'loading' });
    try {
      const user = await authApi.login(credentials);
      setAuth({ status: 'authenticated', user });
    } catch (error) {
      setAuth({
        status: 'error',
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const logout = () => {
    setAuth({ status: 'idle' });
  };

  return { auth, login, logout };
}

// ✅ Components get full type narrowing
function AuthenticatedApp() {
  const { auth } = useAuth();

  switch (auth.status) {
    case 'idle':
      return <LoginForm />;
    case 'loading':
      return <LoadingSpinner />;
    case 'authenticated':
      // TypeScript knows auth.user exists here!
      return <Dashboard user={auth.user} />;
    case 'error':
      // TypeScript knows auth.error exists here!
      return <ErrorMessage error={auth.error} />;
  }
}
```

## حالات الاستخدام الواقعية™

إليك بعض السيناريوهات التي تبرز فيها هذه الأنماط فعلًا:

### سلة التسوّق مع تحسين الأداء

```typescript
// Separate contexts for cart data and UI state
const CartDataContext = createContext<CartState | undefined>(undefined);
const CartUIContext = createContext<CartUIActions | undefined>(undefined);

// Components that show cart count don't re-render when UI state changes
function CartBadge() {
  const itemCount = useCartData((state) => state.items.length);
  return <Badge count={itemCount} />;
}

// Cart drawer only re-renders when UI state changes
function CartDrawer() {
  const isOpen = useCartUI((state) => state.isDrawerOpen);
  const { closeDrawer } = useCartActions();

  return <Drawer isOpen={isOpen} onClose={closeDrawer} />;
}
```

### نموذج متعدّد الخطوات مع حالة التحقّق

```typescript
type FormState = {
  currentStep: number;
  formData: Partial<RegistrationData>;
  validation: ValidationErrors;
  isSubmitting: boolean;
};

// Each step component only subscribes to its relevant data
function PersonalInfoStep() {
  const personalInfo = useFormState((state) => state.formData.personalInfo);
  const errors = useFormState((state) => state.validation.personalInfo);

  // Component only re-renders when personal info or its validation changes
}
```

### لوحة تحكم لحظية

```typescript
// Dashboard components can subscribe to specific metrics
function MetricCard({ metric }: { metric: keyof DashboardMetrics }) {
  const value = useDashboardState((state) => state.metrics[metric]);
  const isLoading = useDashboardState((state) => state.loading[metric]);

  // Only re-renders when this specific metric changes
  return <Card value={value} loading={isLoading} />;
}
```

## مَطبّات الأداء وكيفية تجنّبها

عند تنفيذ هذه الأنماط، انتبه لهذه الأخطاء الشائعة:

### تساوي المراجع في المحدِّدات

```typescript
// ❌ This creates a new array on every selector call
function TodoList() {
  const activeTodos = useAppState((state) => state.todos.filter((todo) => !todo.completed));
  // This will cause re-renders even when the actual active todos haven't changed
}

// ✅ Use useMemo for expensive computations
function TodoList() {
  const todos = useAppState((state) => state.todos);
  const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
}

// ✅ Or move the memoization into a custom selector
function useActiveTodos() {
  return useAppState(useCallback((state) => state.todos.filter((todo) => !todo.completed), []));
}
```

### إعادة إنشاء مزوّد السياق

```typescript
// ❌ This creates a new context value object on every render
function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
}

// ✅ Memoize the context value
function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const contextValue = useMemo(() => ({ state, setState }), [state]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
```

## اختبار سياقاتك المكتوبة الأنواع

يصبح اختبار السياقات أسهل بكثير مع أنماط TypeScript الصحيحة:

```typescript
import { render, screen } from '@testing-library/react';
import { TodoProvider, useTodoState, useTodoActions } from './TodoContext';

// ✅ Create test wrapper
function TestComponent() {
  const { todos, isLoading } = useTodoState();
  const { addTodo } = useTodoActions();

  return (
    <div>
      <div data-testid="todo-count">{todos.length}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <button onClick={() => addTodo('New todo')}>Add Todo</button>
    </div>
  );
}

test('adds todo correctly', async () => {
  render(
    <TodoProvider>
      <TestComponent />
    </TodoProvider>,
  );

  expect(screen.getByTestId('todo-count')).toHaveTextContent('0');

  fireEvent.click(screen.getByText('Add Todo'));

  expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
});

// ✅ Test context hooks in isolation
test('useTodoActions provides expected methods', () => {
  const TestWrapper = ({ children }: { children: ReactNode }) => (
    <TodoProvider>{children}</TodoProvider>
  );

  const { result } = renderHook(() => useTodoActions(), {
    wrapper: TestWrapper,
  });

  expect(typeof result.current.addTodo).toBe('function');
  expect(typeof result.current.toggleTodo).toBe('function');
  expect(typeof result.current.deleteTodo).toBe('function');
});
```

## الخلاصة

تمنحك السياقات المكتوبة الأنواع مع أنماط المحدِّدات أفضل ما في العالمين: بساطة React Context مع سمات الأداء لحلول إدارة الحالة الأكثر تقدّمًا. وهذه هي الرؤى الأساسية:

- **افصل الحالة عن الإجراءات** لتحسين الأداء وقابلية الصيانة
- **استخدم المحدِّدات** لتقليل إعادة التصيير والاشتراك في البيانات المطلوبة فقط
- **استثمر الاتحادات المُميَّزة** لضمان انتقالات الحالة الآمنة من حيث الأنواع
- **أنشئ خُطّافات مخصّصة** تغلف استخدام السياق وتوفّر أمانًا وقت التشغيل
- **اختبر السياقات بانتظام** لضمان ثبات عقود الأنواع لديك وقت التشغيل

قد تبدو هذه الأنماط مبالغة في الحالات البسيطة (ومن المرجّح أنها كذلك — استخدم `useState` لحالة المكوّن المحلية!)، لكن حين تدير حالة تطبيق معقّدة تحتاج إلى المشاركة بين مكوّنات كثيرة، ستوفّر عليك آلام الأداء وجلسات التنقيح المتأخرة في الليل.

الأنماط التي غطّيناها هنا تتوسّع جيدًا من التطبيقات متوسطة الحجم إلى المستودعات المؤسسية الكبيرة، وهي تعمل بسلاسة مع بقية أدوات منظومة React. وسيشكرك نسختك المستقبلية من نفسك (وزملاؤك) على أمان التجميع وأداء وقت التشغيل الذي توفّره هذه المقاربات.
