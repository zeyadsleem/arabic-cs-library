---
title: "مساعدات createContext أكثر أمانًا"
---

React Context قوي، لكن واجهة `createContext` الافتراضية تترك لك حقيقة غير مريحة: قد تكون قيمة السياق `undefined` إن نسي أحدهم تغليف شجرة مكوّناته بمزوّد (Provider). وهذا يقود إلى برمجة دفاعية، وفحوص وقت التشغيل، وجلسات تنقيح متأخرة حين تكتشف أخيرًا سبب رمي تطبيقك للأخطاء في الإنتاج.

لنبنِ بعض الدوال المساعدة التي تمنحك سياقًا متينًا مع TypeScript — حيث تضمن الأنواع أن سياقك متاح دائمًا، ولا تحتاج أبدًا إلى كتابة رسالة خطأ «يجب استخدام السياق داخل المزوّد» مرة أخرى.

## المشكلة مع createContext الافتراضي

إليك ما يلجأ إليه أغلب المطوّرين عند إنشاء سياق مكتوب الأنواع:

```typescript
import { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ❌ The context value could be undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // ... your state logic here
  const value: UserContextType = {
    user: currentUser,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  // ❌ You have to remember this check everywhere
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

هذا النمط يعمل، لكنه هشّ. كل خُطّاف مخصّص يحتاج إلى ذلك الفحص وقت التشغيل، ولا يستطيع TypeScript مساعدتك على التقاط المزوّدات المفقودة وقت التجميع، وأنت دائمًا على بُعد مزوّد واحد منسي من خطأ وقت التشغيل.

## مساعد createContext أكثر أمانًا

لنبنِ مساعدًا يزيل هذه المشكلات:

```typescript
import { createContext, useContext, Context, ReactNode } from 'react';

/**
 * Creates a context that never returns undefined and provides a typed hook
 * @param displayName - Name for debugging and error messages
 * @returns Tuple of [hook, Provider component, raw context]
 */
export function createSafeContext<T>(displayName: string) {
  // ✅ No undefined in the type - we're confident about this
  const context = createContext<T | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    context.displayName = displayName;
  }

  // ✅ Custom hook that guarantees a value
  function useContextHook(): T {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider. ` +
          `Make sure your component is wrapped with <${displayName}Provider>.`,
      );
    }

    return contextValue;
  }

  // ✅ Provider component that prevents null values
  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  // Set display names for better debugging
  if (process.env.NODE_ENV !== 'production') {
    useContextHook.displayName = `use${displayName}`;
    ContextProvider.displayName = `${displayName}Provider`;
  }

  return [useContextHook, ContextProvider, context] as const;
}
```

الآن يصبح إنشاء سياقك نظيفًا وآمنًا:

```typescript
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ Returns exactly what you need: hook, Provider, and raw context
const [useUser, UserProvider] = createSafeContext<UserContextType>('User');

// ✅ Your component logic stays focused on business logic
export function UserManager({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await authApi.login(email, password);
    setCurrentUser(user);
  };

  const logout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  const value: UserContextType = {
    user: currentUser,
    login,
    logout,
  };

  return <UserProvider value={value}>{children}</UserProvider>;
}

// ✅ Components can use the hook without fear
function UserProfile() {
  const { user, logout } = useUser(); // Never undefined!

  if (!user) return <LoginPrompt />;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## متقدّم: سياق بنمط الإجراءات

للحالة الأكثر تعقيدًا، قد ترغب في سياقات منفصلة للحالة والإجراءات (وهذا يمنع إعادة التصيير غير الضرورية حين تحتاج المكوّنات إلى إطلاق الإجراءات فقط):

```typescript
/**
 * Creates separate state and actions contexts for performance optimization
 */
export function createStateActionContext<State, Actions>(displayName: string) {
  const StateContext = createContext<State | null>(null);
  const ActionsContext = createContext<Actions | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    StateContext.displayName = `${displayName}State`;
    ActionsContext.displayName = `${displayName}Actions`;
  }

  function useStateHook(): State {
    const state = useContext(StateContext);
    if (state === null) {
      throw new Error(`use${displayName}State must be used within a ${displayName}Provider`);
    }
    return state;
  }

  function useActionsHook(): Actions {
    const actions = useContext(ActionsContext);
    if (actions === null) {
      throw new Error(`use${displayName}Actions must be used within a ${displayName}Provider`);
    }
    return actions;
  }

  function Provider({
    children,
    state,
    actions,
  }: {
    children: ReactNode;
    state: State;
    actions: Actions;
  }) {
    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
      </StateContext.Provider>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    useStateHook.displayName = `use${displayName}State`;
    useActionsHook.displayName = `use${displayName}Actions`;
    Provider.displayName = `${displayName}Provider`;
  }

  return [useStateHook, useActionsHook, Provider] as const;
}
```

إليك كيف تستخدمه مع قائمة مهام:

````typescript
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}

## Example: Non‑Nullable ThemeContext

A concrete example with a `ThemeContext` that can’t be used outside its provider.

```tsx
type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
}

const [useTheme, ThemeProvider] = createSafeContext<ThemeContextValue>('Theme');

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeProvider value={value}>{children}</ThemeProvider>;
}

// ❌ If you forget to wrap with <AppThemeProvider>, useTheme() will throw
export function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Never undefined
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}
````

```typescript
interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
}

const [useTodoState, useTodoActions, TodoProvider] = createStateActionContext<
  TodoState,
  TodoActions
>('Todo');

export function TodoManager({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });

  const actions: TodoActions = {
    addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: { text } }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: { id } }),
    deleteTodo: (id) => dispatch({ type: 'DELETE_TODO', payload: { id } }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: { filter } }),
  };

  return (
    <TodoProvider state={state} actions={actions}>
      {children}
    </TodoProvider>
  );
}

// ✅ Components only re-render when their specific slice changes
function TodoFilters() {
  const { filter } = useTodoState(); // Only re-renders when filter changes
  const { setFilter } = useTodoActions(); // Never re-renders

  return (
    <div>
      {(['all', 'active', 'completed'] as const).map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={filter === filterOption ? 'active' : ''}
        >
          {filterOption}
        </button>
      ))}
    </div>
  );
}
```

## التحقّق وقت التشغيل باستخدام Zod

لمزيد من الأمان، يمكنك الجمع بين هذا النمط والتحقّق وقت التشغيل:

```typescript
import { z } from 'zod';

const UserContextSchema = z.object({
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    })
    .nullable(),
  login: z.function(),
  logout: z.function(),
});

type UserContextType = z.infer<typeof UserContextSchema>;

export function createValidatedContext<T>(displayName: string, schema: z.ZodSchema<T>) {
  const context = createContext<T | null>(null);

  function useContextHook(): T {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
    }

    // ✅ Runtime validation ensures the context value matches your schema
    const validationResult = schema.safeParse(contextValue);

    if (!validationResult.success) {
      console.error(`${displayName} context validation failed:`, validationResult.error);
      throw new Error(`${displayName} context value is invalid. Check the console for details.`);
    }

    return validationResult.data;
  }

  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  return [useContextHook, ContextProvider, context] as const;
}

// Usage with validation
const [useValidatedUser, ValidatedUserProvider] = createValidatedContext('User', UserContextSchema);
```

> **تحذير**
>
> التحقّق وقت التشغيل يضيف عبئًا، لذا استخدمه بحكمة. فهو ممتاز أثناء التطوير وللسياقات التي تستقبل بيانات من مصادر خارجية، لكن قد ترغب في تعطيله في بناءات الإنتاج.

## حالات الاستخدام الواقعية™

### سياق السمة مع كشف تفضيل النظام

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const [useTheme, ThemeProvider] = createSafeContext<ThemeContextType>('Theme');

export function ThemeManager({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return <ThemeProvider value={value}>{children}</ThemeProvider>;
}

// Components can safely assume theme context exists
function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Never undefined!

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
  );
}
```

### سلة التسوّق مع تحديثات متفائلة

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isUpdating: boolean;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const [useCartState, useCartActions, CartProvider] = createStateActionContext<
  CartState,
  CartActions
>('Cart');

// Usage in components
function CartBadge() {
  const { items } = useCartState(); // Only re-renders when items change
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return <Badge count={itemCount} />;
}

function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartActions(); // Never re-renders

  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
```

## اختبار سياقاتك الآمنة

يصبح الاختبار أنظف بكثير حين لا تتعامل مع قيم سياق غير معرّفة:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

function TestComponent() {
  const { user, logout } = useUser();

  return (
    <div>
      <div data-testid="user-name">{user?.name || 'No user'}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

test('provides user context correctly', () => {
  const mockUser = { id: '1', name: 'Alice', email: 'alice@example.com' };
  const mockLogout = jest.fn();

  render(
    <UserProvider
      value={{
        user: mockUser,
        login: jest.fn(),
        logout: mockLogout,
      }}
    >
      <TestComponent />
    </UserProvider>,
  );

  expect(screen.getByTestId('user-name')).toHaveTextContent('Alice');

  fireEvent.click(screen.getByText('Logout'));
  expect(mockLogout).toHaveBeenCalledTimes(1);
});

test('throws helpful error when used outside provider', () => {
  // Use error boundary to catch the error
  expect(() => {
    render(<TestComponent />);
  }).toThrow('useUser must be used within a UserProvider');
});
```

## اعتبارات الأداء

تضيف هذه الدوال المساعدة عبئًا ضئيلًا، لكن إليك بعض النصائح للحصول على أفضل أداء:

### التخزين المؤقت لقيمة المزوّد

```typescript
export function OptimizedUserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: currentUser,
      login: async (email: string, password: string) => {
        const user = await authApi.login(email, password);
        setCurrentUser(user);
      },
      logout: () => {
        authApi.logout();
        setCurrentUser(null);
      },
    }),
    [currentUser],
  );

  return <UserProvider value={contextValue}>{children}</UserProvider>;
}
```

### ثبات دوال الاستدعاء

```typescript
export function StableCallbackProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Stable callbacks don't cause unnecessary re-renders
  const login = useCallback(async (email: string, password: string) => {
    const user = await authApi.login(email, password);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserProvider value={value}>{children}</UserProvider>;
}
```

## الخلاصة

تساعد مساعدات السياق الآمنة على إزالة فئة كاملة من أخطاء React، مع توفير تجربة تطوير أفضل. وهذه هي الفوائد الأساسية:

- **أمان الأنواع**: قيم السياق لا تكون `undefined` أبدًا — وTypeScript يعرف ذلك
- **رسائل خطأ أفضل**: رسائل خطأ واضحة وقابلة للتنفيذ عند غياب المزوّدات
- **الأداء**: فصل سياقات الحالة والإجراءات يمنع إعادة التصيير غير الضرورية
- **تجربة المطوّر**: شيفرة أقل، وتركيز أكبر على منطقك الفعلي
- **أمان وقت التشغيل**: تحقّق اختياري يضمن ثبات عقود السياق لديك

تتقدّم هذه الأنماط من مبدّل سمات بسيط إلى إدارة حالة تطبيق معقّدة. وهي تعمل بشكل ممتاز خاصة في أنظمة التصميم ومكتبات المكوّنات حيث تريد تقديم واجهات برمجية خالية من الأخطاء للمطوّرين الآخرين.

الاستثمار في إنشاء هذه المساعدات يدفع أرباحه مع نمو تطبيقك — ستقضي وقتًا أقل في تنقيح المشكلات المتعلقة بالسياق ووقتًا أطول في بناء المزايا التي تهمّ مستخدميك.
