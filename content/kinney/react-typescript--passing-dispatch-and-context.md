---
title: "تمرير dispatch واستخدام Context"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/passing-dispatch-and-context"
---

بنيت تطبيق React بحجم معقول باستخدام TypeScript، وفي مرحلة ما بدأت تمرّر دوال dispatch عبر عدّة طبقات من المكوّنات. ربما بدأ الأمر بريئًا — تمرير `dispatch` من `useReducer` نزولًا مستوى واحد فقط. لكنك الآن تمرّرها عبر أربعة مكوّنات لا تحتاجها أصلًا، لمجرد أن تصل إلى المكوّن الذي يحتاجها فعلًا.

سنمرّ معًا على رحلة إعادة الهيكلة من دوال dispatch المنقولة عبر الخصائص (prop drilling) إلى حلٍّ نظيف ومكتوب الأنواع يعتمد على Context. ستتعلّم كيف تنتقل بأمان، وكيف تحافظ على أمان الأنواع طوال الطريق، وكيف تتجنّب الأخطاء الشائعة التي تجعل المطوّرين يلعنون واجهات Context.

## المشكلة: تمرير dispatch عبر الخصائص عمليًا

إليك سيناريو نموذجي ينمو عضويًا في تطبيقات React. تبدأ باستخدام `useReducer` في المكوّن الرئيسي وتحتاج إلى تمرير دالة dispatch نزولًا إلى المكوّنات المتداخلة بعمق:

```typescript
// Types for our todo application
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; priority: Todo['priority'] } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_PRIORITY'; payload: { id: string; priority: Todo['priority'] } };

// ❌ The problematic pattern - prop drilling dispatch everywhere
function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <div>
      <Header dispatch={dispatch} />
      <MainContent todos={todos} dispatch={dispatch} />
      <Sidebar dispatch={dispatch} />
    </div>
  );
}

function MainContent({ todos, dispatch }: { todos: Todo[]; dispatch: Dispatch<TodoAction> }) {
  return (
    <div>
      <TodoList todos={todos} dispatch={dispatch} />
      <TodoStats todos={todos} />
    </div>
  );
}

function TodoList({ todos, dispatch }: { todos: Todo[]; dispatch: Dispatch<TodoAction> }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}

// Finally! The component that actually needs dispatch
function TodoItem({ todo, dispatch }: { todo: Todo; dispatch: Dispatch<TodoAction> }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
      />
      <span>{todo.text}</span>
      <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
        Delete
      </button>
    </li>
  );
}
```

لاحظ كيف لا يستخدم `MainContent` و`TodoList` دالة dispatch *فعليًا* — إنما يمرّرانها كأنها بطاطا ساخنة. هذه هي مشكلة تمرير الخصائص عبر الطبقات (prop drilling) الكلاسيكية، وهي تتفاقم كلما نمت شجرة مكوّناتك.

> **تحذير**
>
> تمرير دوال dispatch عبر الخصائص ينشئ اقترانًا محكمًا بين المكوّنات ويجعل إعادة الهيكلة مؤلمة. فنقل مكوّن يحتاج إلى dispatch يصبح عملية جراحية كبرى تمسّ كل مكوّن في الشجرة.

## الخطوة 1: أنشئ سياقك المكتوب الأنواع

الخطوة الأولى في ترحيلنا هي إنشاء سياق مكتوب الأنواع بشكل صحيح. سنبدأ باستخراج أنواع الحالة وdispatch، ثم إنشاء بنية السياق:

```typescript
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// ✅ First, centralize your action types
export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; priority: Todo['priority'] } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_PRIORITY'; payload: { id: string; priority: Todo['priority'] } };

// ✅ Define what our context will provide
interface TodoContextValue {
  todos: Todo[];
  dispatch: Dispatch<TodoAction>;
}

// ✅ Create context with undefined as default
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// ✅ Custom hook with runtime safety
export function useTodoContext(): TodoContextValue {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
```

يعطينا هذا سياقًا مكتوب الأنواع مع أمان وقت التشغيل. القيمة الافتراضية `undefined` تفرض علينا توفير خُطّاف مخصّص يفحص ما إذا كنا داخل مزوّد فعلًا.

> **نصيحة**
>
> استخدم `undefined` دائمًا كقيمة افتراضية لسياقك، وقدّم خُطّافًا مخصّصًا. هذا يمنع الاستخدام العرضي للسياق خارج المزوّد، وهو ما كان سيفشل بصمت مع كائن افتراضي.

## الخطوة 2: نفّذ المزوّد

لننشئ الآن مكوّن المزوّد (Provider) الذي سيحلّ محل تمرير الخصائص. المفتاح هنا هو أن هذا المزوّد يجب أن يغلّف كل منطق إدارة الحالة:

```typescript
interface TodoProviderProps {
  children: ReactNode;
  initialTodos?: Todo[];
}

export function TodoProvider({ children, initialTodos = [] }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ todos, dispatch }), [todos]);

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
}

// ✅ Your reducer stays the same
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          priority: action.payload.priority,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'SET_PRIORITY':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, priority: action.payload.priority } : todo,
      );
    default:
      return state;
  }
}
```

لاحظ أننا نستخدم `useMemo` لقيمة السياق. هذا أمر حاسم — فمن دونه سيُنشئ كل تصيير كائنًا جديدًا، مما يُعيد تصيير جميع المكوّنات المستهلكة بلا داعٍ.

## الخطوة 3: استراتيجية الترحيل التدريجي

إليك جمال هذا الأسلوب: يمكنك ترحيل المكوّن واحدًا تلو الآخر دون كسر أي شيء. ابدأ من أعمق المكوّنات وتدرّج إلى الأعلى:

```typescript
// ✅ Step 3a: First, wrap your app with the provider
function App() {
  return (
    <TodoProvider>
      <div>
        <Header />
        <MainContent />
        <Sidebar />
      </div>
    </TodoProvider>
  );
}

// ✅ Step 3b: Update the leaf components first
function TodoItem({ todo }: { todo: Todo }) {
  const { dispatch } = useTodoContext();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
      />
      <span>{todo.text}</span>
      <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
        Delete
      </button>
    </li>
  );
}

// ✅ Step 3c: Remove props from parent components
function TodoList() {
  const { todos } = useTodoContext();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// ✅ Step 3d: Clean up intermediate components
function MainContent() {
  const { todos } = useTodoContext();

  return (
    <div>
      <TodoList />
      <TodoStats todos={todos} />
    </div>
  );
}
```

الترحيل تدريجي وآمن — يمكنك النشر بعد كل خطوة دون كسر الوظائف القائمة.

> **ملاحظة**
>
> ابدأ الترحيل من المكوّنات الطرفية (التي تستخدم dispatch فعليًا) وتدرّج إلى الأعلى. هذا يضمن أن يبقى لديك تطبيق يعمل في كل أثناء الترحيل.

## الخطوة 4: أنماط محسّنة لتجربة أفضل

بعد أن يعمل السياق الأساسي، يمكنك تحسينه بأنماط أكثر ملاءمة. تحسين شائع هو فصل dispatch إلى منشئ إجراءات دلالية (semantic action creators):

```typescript
// ✅ Create action creators for better developer experience
export function useTodoActions() {
  const { dispatch } = useTodoContext();

  return useMemo(
    () => ({
      addTodo: (text: string, priority: Todo['priority']) => {
        dispatch({ type: 'ADD_TODO', payload: { text, priority } });
      },
      toggleTodo: (id: string) => {
        dispatch({ type: 'TOGGLE_TODO', payload: { id } });
      },
      deleteTodo: (id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: { id } });
      },
      setPriority: (id: string, priority: Todo['priority']) => {
        dispatch({ type: 'SET_PRIORITY', payload: { id, priority } });
      },
    }),
    [dispatch],
  );
}

// ✅ Now your components become much cleaner
function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodoActions();

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

function AddTodoForm() {
  const { addTodo } = useTodoActions();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), priority);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo..." />
      <select value={priority} onChange={(e) => setPriority(e.target.value as Todo['priority'])}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
```

يمنحك هذا النمط عدّة فوائد:

- **إكمال تلقائي أفضل**: يمكن لمحرّرك أن يقترح `addTodo` بدلًا من إجبارك على تذكّر شكل الإجراء بالضبط
- **أمان الأنواع**: يضمن TypeScript أنك تمرّر المعاملات الصحيحة
- **إعادة هيكلة أسهل**: غيّر شكل الإجراء في مكان واحد بدلًا من في كل مكوّناتك

## الخطوة 5: أمان أنواع متقدّم مع بُناة الإجراءات

لمنح أمان أنواع أفضل، يمكنك إنشاء بُناة إجراءات (action builders) تضمن أن تكون إجراءاتك مصوغة على نحو صحيح دائمًا:

```typescript
// ✅ Action builders with full type safety
export const todoActions = {
  addTodo: (text: string, priority: Todo['priority']): TodoAction => ({
    type: 'ADD_TODO',
    payload: { text, priority },
  }),
  toggleTodo: (id: string): TodoAction => ({
    type: 'TOGGLE_TODO',
    payload: { id },
  }),
  deleteTodo: (id: string): TodoAction => ({
    type: 'DELETE_TODO',
    payload: { id },
  }),
  setPriority: (id: string, priority: Todo['priority']): TodoAction => ({
    type: 'SET_PRIORITY',
    payload: { id, priority },
  }),
} as const;

// ✅ Enhanced actions hook using builders
export function useTodoActions() {
  const { dispatch } = useTodoContext();

  return useMemo(
    () => ({
      addTodo: (text: string, priority: Todo['priority']) =>
        dispatch(todoActions.addTodo(text, priority)),
      toggleTodo: (id: string) => dispatch(todoActions.toggleTodo(id)),
      deleteTodo: (id: string) => dispatch(todoActions.deleteTodo(id)),
      setPriority: (id: string, priority: Todo['priority']) =>
        dispatch(todoActions.setPriority(id, priority)),
    }),
    [dispatch],
  );
}
```

يبسّط هذا الأسلوب الاختبار أيضًا — يمكنك اختبار بُناة الإجراءات بمعزل عن مكوّناتك:

```typescript
// ✅ Easy to test action builders
import { todoActions } from './TodoContext';

describe('todoActions', () => {
  test('addTodo creates correct action', () => {
    const action = todoActions.addTodo('Buy groceries', 'high');
    expect(action).toEqual({
      type: 'ADD_TODO',
      payload: { text: 'Buy groceries', priority: 'high' },
    });
  });

  test('toggleTodo creates correct action', () => {
    const action = todoActions.toggleTodo('todo-123');
    expect(action).toEqual({
      type: 'TOGGLE_TODO',
      payload: { id: 'todo-123' },
    });
  });
});
```

## مثال ترحيل واقعي: إدارة حالة النماذج

إليك مثالًا أكثر تعقيدًا يوضّح كيفية ترحيل إدارة حالة النماذج من تمرير الخصائص إلى السياق. هذا النمط مفيد بشكل خاص للنماذج متعدّدة الخطوات أو المعالجات المتدرجة:

```typescript
// Before: Prop drilling form dispatch through multiple steps
interface RegistrationFormState {
  currentStep: number;
  userData: {
    personalInfo?: PersonalInfo;
    accountDetails?: AccountDetails;
    preferences?: UserPreferences;
  };
  validation: {
    personalInfo?: ValidationErrors;
    accountDetails?: ValidationErrors;
    preferences?: ValidationErrors;
  };
  isSubmitting: boolean;
}

type FormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'UPDATE_ACCOUNT_DETAILS'; payload: AccountDetails }
  | { type: 'UPDATE_PREFERENCES'; payload: UserPreferences }
  | { type: 'SET_VALIDATION_ERRORS'; payload: { step: string; errors: ValidationErrors } }
  | { type: 'SET_SUBMITTING'; payload: boolean };

// ✅ After: Clean context-based approach
const RegistrationContext = createContext<
  | {
      state: RegistrationFormState;
      dispatch: Dispatch<FormAction>;
    }
  | undefined
>(undefined);

export function useRegistrationForm() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrationForm must be used within RegistrationProvider');
  }
  return context;
}

export function useRegistrationActions() {
  const { dispatch } = useRegistrationForm();

  return useMemo(
    () => ({
      nextStep: () => dispatch({ type: 'NEXT_STEP' }),
      prevStep: () => dispatch({ type: 'PREV_STEP' }),
      updatePersonalInfo: (info: PersonalInfo) =>
        dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info }),
      updateAccountDetails: (details: AccountDetails) =>
        dispatch({ type: 'UPDATE_ACCOUNT_DETAILS', payload: details }),
      updatePreferences: (prefs: UserPreferences) =>
        dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs }),
      setValidationErrors: (step: string, errors: ValidationErrors) =>
        dispatch({ type: 'SET_VALIDATION_ERRORS', payload: { step, errors } }),
      setSubmitting: (isSubmitting: boolean) =>
        dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting }),
    }),
    [dispatch],
  );
}

// ✅ Now form steps are clean and focused
function PersonalInfoStep() {
  const { state } = useRegistrationForm();
  const { updatePersonalInfo, nextStep } = useRegistrationActions();

  // Only concerned with personal info, no prop drilling needed
  const handleSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    nextStep();
  };

  return <PersonalInfoForm onSubmit={handleSubmit} data={state.userData.personalInfo} />;
}
```

## اعتبارات الأداء والمَطبّات

عند الانتقال من تمرير الخصائص إلى السياق، انتبه إلى هذه الآثار على الأداء:

### التخزين المؤقت لقيمة السياق

```typescript
// ❌ This causes all consumers to re-render on every provider render
function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return <TodoContext.Provider value={{ todos, dispatch }}>{children}</TodoContext.Provider>;
}

// ✅ Memoize the context value
function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const contextValue = useMemo(
    () => ({ todos, dispatch }),
    [todos, dispatch], // dispatch is stable from useReducer
  );

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
}
```

### الاشتراكات الانتقائية في السياق

لأداء أفضل مع كائنات حالة كبيرة، فكّر في فصل سياقك:

```typescript
// ✅ Split state and actions for better performance
const TodoStateContext = createContext<Todo[] | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(undefined);

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within TodoProvider');
  }
  return context;
}

// Components that only dispatch actions won't re-render when state changes
function AddTodoButton() {
  const dispatch = useTodoDispatch();
  return (
    <button onClick={() => dispatch(todoActions.addTodo('New todo', 'medium'))}>Add Todo</button>
  );
}
```

## اختبار ترحيل السياق

يصبح الاختبار السليم أكثر وضوحًا بعد الترحيل:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider, useTodoActions, useTodoState } from './TodoContext';

// ✅ Test wrapper for components that use context
function TestWrapper({ children }: { children: ReactNode }) {
  return <TodoProvider>{children}</TodoProvider>;
}

// ✅ Test component that exercises the context
function TestComponent() {
  const todos = useTodoState();
  const { addTodo, toggleTodo } = useTodoActions();

  return (
    <div>
      <span data-testid="todo-count">{todos.length}</span>
      <button onClick={() => addTodo('Test todo', 'high')}>Add Todo</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span data-testid={`todo-${todo.id}`}>{todo.text}</span>
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
}

test('context works correctly', () => {
  render(<TestComponent />, { wrapper: TestWrapper });

  expect(screen.getByTestId('todo-count')).toHaveTextContent('0');

  fireEvent.click(screen.getByText('Add Todo'));

  expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
  expect(screen.getByText('Test todo')).toBeInTheDocument();
});

// ✅ Test hooks in isolation using renderHook
import { renderHook, act } from '@testing-library/react';

test('useTodoActions provides expected interface', () => {
  const { result } = renderHook(() => useTodoActions(), {
    wrapper: TestWrapper,
  });

  expect(typeof result.current.addTodo).toBe('function');
  expect(typeof result.current.toggleTodo).toBe('function');
  expect(typeof result.current.deleteTodo).toBe('function');
  expect(typeof result.current.setPriority).toBe('function');
});
```

## مَطبّات الترحيل الشائعة وحلولها

### المطبّة 1: نسيان التخزين المؤقت لمنشئي الإجراءات

```typescript
// ❌ This causes infinite re-renders
function useTodoActions() {
  const { dispatch } = useTodoContext();

  return {
    addTodo: (text: string, priority: Todo['priority']) => {
      dispatch({ type: 'ADD_TODO', payload: { text, priority } });
    },
    // ... other actions
  };
}

// ✅ Memoize action creators
function useTodoActions() {
  const { dispatch } = useTodoContext();

  return useMemo(
    () => ({
      addTodo: (text: string, priority: Todo['priority']) => {
        dispatch({ type: 'ADD_TODO', payload: { text, priority } });
      },
      // ... other actions
    }),
    [dispatch],
  );
}
```

### المطبّة 2: موضع مزوّد السياق

```typescript
// ❌ Provider too low in the tree
function App() {
  return (
    <div>
      <Header /> {/* This can't access TodoContext */}
      <main>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </main>
    </div>
  );
}

// ✅ Provider at the right level
function App() {
  return (
    <TodoProvider>
      <div>
        <Header /> {/* Now this can access TodoContext if needed */}
        <main>
          <TodoList />
        </main>
      </div>
    </TodoProvider>
  );
}
```

### المطبّة 3: الإفراط في استخدام السياق

```typescript
// ❌ Don't put everything in global context
function AppProvider() {
  return (
    <TodoProvider>
      <UserProvider>
        <ThemeProvider>
          <NotificationProvider>
            <ShoppingCartProvider>
              <AnalyticsProvider>
                {/* This is getting ridiculous */}
                <App />
              </AnalyticsProvider>
            </ShoppingCartProvider>
          </NotificationProvider>
        </ThemeProvider>
      </UserProvider>
    </TodoProvider>
  );
}

// ✅ Use context judiciously - compose providers where needed
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
}

function TodoSection() {
  return (
    <TodoProvider>
      <TodoList />
      <AddTodoForm />
    </TodoProvider>
  );
}
```

## متى لا تستخدم هذا النمط

السياق ليس الحل الصحيح دائمًا. التزم بتمرير الخصائص عندما:

- **يحتاج dispatch إلى النزول مستوى أو مستويين فقط**: يضيف السياق تعقيدًا بلا داعٍ في الحالات البسيطة
- **الحالة محلية فعلًا**: لا تجعل حالة خاصّة بمكوّن عامّة
- **الأداء حاسم وهناك تحديثات متكرّرة**: يسبّب السياق إعادة تصيير جميع المستهلكين
- **أنت تبني مكتبة مكوّنات قابلة لإعادة الاستخدام**: تقدّم الخصائص مرونة أفضل لمستهلكي المكتبة

## الخلاصة

الانتقال من دوال dispatch المنقولة عبر الخصائص إلى نمط Context مكتوب الأنواع يمنحك:

- **واجهات مكوّنات أنظف**: لا مزيد من تمرير خصائص لا تستخدمها المكوّنات
- **تجربة مطوّر أفضل**: منشئ إجراءات دلالية بدلًا من تذكّر أشكال dispatch
- **إعادة هيكلة أسهل**: انقل المكوّنات دون تحديث سلسلة الخصائص بالكامل
- **أمان أنواع في كل مكان**: يضمن TypeScript بقاء إجراءاتك وحالتك متزامنة
- **قابلية الاختبار**: خُطّافات السياق سهلة الاختبار بمعزلها

يمكن تنفيذ الترحيل تدريجيًا، مكوّنًا تلو الآخر، دون كسر وظائفك القائمة. ابدأ بالمكوّنات التي تستخدم dispatch فعليًا، وتدرّج صعودًا في شجرة المكوّنات، ولا تنسَ تخزين قيم السياق ومنشئي الإجراءات مؤقتًا.

يعمل هذا النمط بشكل ممتاز مع حالة النماذج، وسلات التسوّق، ومصادقة المستخدم، وأي سيناريو آخر تجد نفسك فيه تمرّر دالة dispatch نفسها عبر عدّة طبقات من المكوّنات. تصبح مكوّناتك أكثر تركيزًا على مسؤولياتها الفعلية بدلًا من أن تصبح خدمات توصيل لدوال dispatch لا تستخدمها.
