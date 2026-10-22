---
title: "فصل الإجراءات عن الحالة: سياقان"
---

سياق React (Context) أداة قوية لمشاركة الحالة بين المكوّنات، لكنه يحمل معه فخًّا في الأداء يقع فيه معظمنا في مرحلة ما: كلما تغيّرت قيمة السياق، أُعيد تصيير كل مستهلك له. ويصبح هذا مؤلمًا بشكل خاص عندما تمرّر الحالة ودوال تحديثها معًا عبر السياق نفسه — لأن إنشاء دوال التحديث تلك داخل المكوّن مباشرةً يعني أن قيمة السياق تتغيّر مع كل تصيير، حتى إذا لم تتغيّر الحالة الفعلية.

والحل؟ افصل سياقاتك. ضع حالتك في سياق والإجراءات في سياق آخر. بهذه الطريقة، لن يُعاد تصيير المكوّنات التي تحتاج إلى قراءة الحالة فقط عند إعادة إنشاء دوال الإجراءات، ولن يُعاد تصيير المكوّنات التي تحتاج إلى إرسال الإجراءات فقط عندما تتغيّر الحالة. لنستكشف كيف ننفّذ هذا النمط بفعالية.

## مشكلة السياق الواحد

إليك ما يفعله معظمنا أولًا — ولماذا يضرّ ذلك بالأداء:

```typescript
// ❌ The performance trap
const TodoContext = createContext<{
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
} | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // These functions are recreated on every render
  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // This value object is recreated on every render
  const value = { todos, addTodo, toggleTodo, deleteTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
```

في كل مرة يُصيّر `TodoProvider` — ويحدث ذلك كلما تغيّرت `todos` — تُنشأ مراجع دوال جديدة لـ `addTodo` و`toggleTodo` و`deleteTodo`. ولأن كائن `value` بأكمله يُعاد إنشاؤه أيضًا، سيُعاد تصيير كل مكوّن يستهلك هذا السياق، حتى إن كان يهتم فقط بقراءة المهام الحالية ولا يحتاج إلى دوال الإجراءات.

## حل السياقين

لنقسّم هذا إلى سياقين منفصلين: واحد للحالة وآخر للإجراءات:

```typescript
// ✅ Split contexts for better performance
const TodoStateContext = createContext<Todo[]>([]);
const TodoActionsContext = createContext<{
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
} | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Memoize actions so they have stable references
  const actions = useMemo(
    () => ({
      addTodo: (text: string) => {
        setTodos((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text,
            completed: false,
          },
        ]);
      },

      toggleTodo: (id: string) => {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        );
      },

      deleteTodo: (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      },
    }),
    [],
  ); // Empty dependency array since we only use setTodos

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoActionsContext.Provider value={actions}>{children}</TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}
```

الآن عندما تتغيّر مصفوفة todos، لن يُعاد تصيير إلا المكوّنات المشتركة في `TodoStateContext`. أما المكوّنات التي تحتاج إلى إرسال الإجراءات فقط فتبقى دون مساس.

## خُطّافات مخصّصة لواجهة نظيفة

غلّف استهلاك السياق في خُطّافات مخصّصة لتوفير واجهة برمجية أنظف ومعالجة أخطاء أفضل:

```typescript
function useTodos() {
  const todos = useContext(TodoStateContext);
  if (todos === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return todos;
}

function useTodoActions() {
  const actions = useContext(TodoActionsContext);
  if (!actions) {
    throw new Error('useTodoActions must be used within a TodoProvider');
  }
  return actions;
}

// Convenience hook for components that need both
function useTodosWithActions() {
  return {
    todos: useTodos(),
    actions: useTodoActions(),
  };
}
```

## استخدام السياقين المفصولين

الآن يمكن لمكوّناتك أن تكون أكثر انتقائية فيما تشترك فيه:

```typescript
// ✅ Only re-renders when todos array changes
function TodoList() {
  const todos = useTodos(); // Only subscribes to state

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// ✅ Only re-renders when its own todo prop changes
function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodoActions(); // Only subscribes to actions

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

// ✅ Never re-renders after mount (stable action references)
function AddTodoForm() {
  const { addTodo } = useTodoActions();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo..." />
      <button type="submit">Add</button>
    </form>
  );
}
```

لاحظ كيف لا يُعاد تصيير `TodoItem` و`AddTodoForm` أبدًا عندما تتغيّر مصفوفة المهام — فهما يهتمّان بالإجراءات فقط. في المقابل، يُعاد تصيير `TodoList` عندما تتغيّر المهام لكنه لا يتأثّر بإعادة إنشاء دوال الإجراءات.

## نمط متقدّم: بديل `useReducer`

لإدارة حالة أكثر تعقيدًا، يمكنك دمج هذا النمط مع `useReducer` للحصول على تحديثات أكثر قابلية للتوقّع:

```typescript
type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.text,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
}

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Actions stay completely stable across renders
  const actions = useMemo(
    () => ({
      addTodo: (text: string) => dispatch({ type: 'ADD_TODO', text }),
      toggleTodo: (id: string) => dispatch({ type: 'TOGGLE_TODO', id }),
      deleteTodo: (id: string) => dispatch({ type: 'DELETE_TODO', id }),
    }),
    [],
  );

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoActionsContext.Provider value={actions}>{children}</TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}
```

مع `useReducer`، يبقى مرجع دالة `dispatch` مستقرًّا دائمًا، لذا لا يحتاج كائن الإجراءات المحفوظ إلى التغيّر أبدًا — ما يجعل هذا النهج أصدق مع الأداء.

## مثال واقعي: مصادقة المستخدم

إليك كيف يبدو هذا النمط في مثال أكثر تعقيدًا وواقعية:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_ERROR'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthActionsContext = createContext<{
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { user: action.user, loading: false, error: null };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'LOGOUT':
      return { user: null, loading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: false,
    error: null,
  });

  const actions = useMemo(
    () => ({
      login: async (email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });
        try {
          const user = await authenticateUser(email, password);
          dispatch({ type: 'LOGIN_SUCCESS', user });
        } catch (error) {
          dispatch({
            type: 'LOGIN_ERROR',
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      logout: () => {
        dispatch({ type: 'LOGOUT' });
      },

      clearError: () => {
        dispatch({ type: 'CLEAR_ERROR' });
      },
    }),
    [],
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
}

// Custom hooks
function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

function useAuthActions() {
  const context = useContext(AuthActionsContext);
  if (!context) {
    throw new Error('useAuthActions must be used within an AuthProvider');
  }
  return context;
}
```

الآن يمكن للمكوّنات أن تكون جراحية في تحديد ما تشترك فيه:

```typescript
// ✅ Only re-renders when auth state changes
function UserProfile() {
  const { user, loading } = useAuthState();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Never re-renders after mount
function LoginForm() {
  const { login } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

## فوائد الاختبار

من الفوائد التي لا تُقدَّر حقّ قدرها في هذا النمط أنه يسهّل الاختبار كثيرًا. يمكنك اختبار منطق الحالة ومنطق الإجراءات كلًّا على حدة:

```typescript
// Test state transformations in isolation
describe('todoReducer', () => {
  it('adds a todo', () => {
    const initialState: Todo[] = [];
    const action = { type: 'ADD_TODO', text: 'Learn React' } as const;
    const newState = todoReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].text).toBe('Learn React');
    expect(newState[0].completed).toBe(false);
  });

  it('toggles a todo', () => {
    const initialState: Todo[] = [{ id: '1', text: 'Learn React', completed: false }];
    const action = { type: 'TOGGLE_TODO', id: '1' } as const;
    const newState = todoReducer(initialState, action);

    expect(newState[0].completed).toBe(true);
  });
});

// Test components with mock contexts
const MockTodoProvider = ({
  children,
  todos = [],
}: {
  children: React.ReactNode;
  todos?: Todo[];
}) => {
  const mockActions = {
    addTodo: vi.fn(),
    toggleTodo: vi.fn(),
    deleteTodo: vi.fn(),
  };

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoActionsContext.Provider value={mockActions}>{children}</TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
};

test('TodoList renders todos', () => {
  const todos = [
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Build an app', completed: true },
  ];

  render(
    <MockTodoProvider todos={todos}>
      <TodoList />
    </MockTodoProvider>,
  );

  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build an app')).toBeInTheDocument();
});
```

## متى تستخدم هذا النمط

يتألّق نمط السياقين هذا عندما:

- **لديك مستهلكون كثر**: تحتاج مكوّنات متعددة إلى الحالة أو الإجراءات (وليس بالضرورة إلى كليهما)
- **تحديثات حالة متكررة**: تتغيّر حالتك كثيرًا وتريد تقليل عمليات إعادة التصيير إلى أدنى حد
- **منطق إجراءات معقّد**: تتضمّن إجراءاتك عمليات غير متزامنة أو تحويلات حالة معقّدة
- **الأداء حرج**: تُحسّن من أجل أقل عدد ممكن من عمليات إعادة التصيير في شجرة مكوّنات كبيرة

وقد يكون مبالغة في الحالات التالية:

- **حالة بسيطة ونادرة التغيّر**: مفتاح تبديل يتغيّر بين حين وآخر لا يحتاج إلى هذا التعقيد
- **أشجار مكوّنات صغيرة**: إذا كانت لديك مكوّنات قليلة فقط، فلا تستحق فائدة الأداء الشيفرة الإضافية
- **الحالة والإجراءات تُستخدمان معًا دائمًا**: إذا كان كل مكوّن يحتاج إلى قدرتي القراءة والكتابة معًا

## مقايضات يجب مراعاتها

**المزايا:**

- عمليات إعادة تصيير جراحية: لا تتحدّث المكوّنات إلا عندما تتغيّر اعتماداتها المحدّدة
- مراجع إجراءات مستقرة: لا تسبّب دوال الإجراءات عمليات إعادة تصيير غير ضرورية
- قابلية اختبار أفضل: يمكن اختبار منطق الحالة والإجراءات كلًّا على حدة
- فصل واضح للمسؤوليات: مسارا القراءة والكتابة منفصلان صراحةً

**العيوب:**

- شيفرة نموذجية أكثر: تحتاج إلى سياقات ومزوّدات وخُطّافات منفصلة
- نموذج ذهني أعقد قليلًا: يحتاج المطوّرون إلى فهم هذا الفصل
- احتمال مبالغة في الهندسة: قد يكون مبالغة في سيناريوهات الحالة البسيطة
