---
title: "إدارة حالة React مع TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/react-state-management-with-typescript"
---

خُطّافات إدارة الحالة في React بسيطةً إلى حدّ الجمال في JavaScript، لكنّ TypeScript يحوّلها إلى أدواتٍ دقيقّة تلتقط الأخطاء قبل وقوعها. فبدلًا من أن تقطب أصابعك وتمنّي أن تعمل تحديثات حالتك كما ينبغي، يمكنك نمذجة حالتك بأنواع اتحادية مُميَّزة، واستخدام حرّاس أنواع (type guards) صحيحة، وبناء مخفّضات (reducers) تجعل الحالات المستحيلة مستحيلةَ التمثيل حرفيًا. فلنستكشف كيف تُوظّف هذه الخُطّافات بكامل قوّة نظام أنواع TypeScript.

## `useState`: الاستنتاج والأنماط والمزالق

يتبع استنتاج TypeScript مع `useState` أنماطًا يمكن التنبّؤ بها، لكنّ هناك حالات حدّية قد تفاجئك. وفهم هذه الأنماط يساعدك على كتابة شيفرة إدارة حالة أكثر موثوقية وتجنّب المفاجآت وقت التشغيل.

### كيف يعمل استنتاج `useState`

يستنتج TypeScript نوع الحالة من القيمة الابتدائية التي تمرّرها إلى `useState`. وهذا يعمل بإتقان في الحالات المباشرة:

```typescript
const [count, setCount] = useState(0); // inferred as number
const [name, setName] = useState('Alice'); // inferred as string
const [isVisible, setVisible] = useState(true); // inferred as boolean
```

كما أنّ دوال الضبط تأخذ أنواعها الصحيحة. فـ `setCount` يتوقّع `number` أو `(prev: number) => number`، وستصرخ TypeScript في وجهك إن حاولت تمرير نصّ.

لكنّ هنا يبدأ الجزء المثير: يستنتج TypeScript *النوع الحرفي* (literal type) من قيمتك الابتدائية:

```typescript
const [status, setStatus] = useState('idle'); // inferred as string, not 'idle'
const [theme, setTheme] = useState('light'); // inferred as string, not 'light'
```

هذا هو ما تريده عادةً، لكنّك أحيانًا تحتاج إلى دقّة أكبر.

### العمل مع الأنواع الاتحادية

حين تريد تقييد الحالة بقيم معيّنة، عليك أن توجّه استنتاج TypeScript. وأشيع نهج هو التحديد الصريح للنوع:

```typescript
// ✅ Explicit union type
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

// ✅ Using const assertion for the initial value
const [theme, setTheme] = useState('light' as const);
// Note: This only constrains the initial value, not subsequent updates
```

يُفضَّل نهج التحديد الصريح عادةً لأنه يقيّد كلٌّ من القيمة الابتدائية وكل التحديثات اللاحقة:

```typescript
const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

// ✅ This works
setStatus('loading');

// ❌ TypeScript error: Argument of type '"pending"' is not assignable
setStatus('pending');
```

> **تلميح**
>
> عند العمل مع الأنواع الاتحادية، عرّفها على حدة من أجل إعادة الاستخدام وتحسين رسائل الأخطاء.

```typescript
type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

const [status, setStatus] = useState<LoadingStatus>('idle');
```

### فخّ المصفوفة الفارغة والكائن

هنا يقع كثير من المطوّرين في الفخّ: تهيئة الحالة بمصفوفة أو كائن فارغ.

```typescript
// ❌ Inferred as never[] - you can't add anything!
const [items, setItems] = useState([]);

// ❌ This will cause a TypeScript error
setItems(['first item']); // Type 'string' is not assignable to type 'never'
```

يستنتج TypeScript النوع `never[]` لأنّ المصفوفة الفارغة لا تقدّم أي تلميح عن الأنواع التي يجب أن تحتويها. عليك أن تكون صريحًا:

```typescript
// ✅ Explicit typing
const [items, setItems] = useState<string[]>([]);
const [users, setUsers] = useState<User[]>([]);

// ✅ With interface for complex objects
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const [todos, setTodos] = useState<Todo[]>([]);
```

المبدأ نفسه ينطبق على الكائنات:

```typescript
// ❌ Inferred as {}, which is not very useful
const [filters, setFilters] = useState({});

// ✅ Be explicit about the shape
interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
}

const [filters, setFilters] = useState<FilterState>({
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
});

// ✅ Or use Partial if some properties are optional initially
const [filters, setFilters] = useState<Partial<FilterState>>({});
```

### نمط الحالة الابتدائية null/undefined

سيناريو شائع آخر هو البدء بـ `null` أو `undefined` حين لا تكون البيانات قد حُمِّلت بعد:

```typescript
// ❌ Inferred as null - you can never update it!
const [user, setUser] = useState(null);

// ✅ Explicit union with null
const [user, setUser] = useState<User | null>(null);

// ✅ Using undefined as the "not loaded" state
const [data, setData] = useState<ApiResponse | undefined>(undefined);
```

هذا النمط شائع خصوصًا مع تحميل البيانات غير المتزامنة:

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const [profile, setProfile] = useState<UserProfile | null>(null);

useEffect(() => {
  async function loadProfile() {
    const userData = await fetchUserProfile();
    setProfile(userData); // ✅ TypeScript knows this should be UserProfile | null
  }

  loadProfile();
}, []);
```

## `useReducer`: حالة متقدّمة بأمان في الأنواع

يتألّق `useReducer` حين يصبح منطق حالتك معقّدًا. ومع التحديد الصحيح للأنواع، تحصل على ضمانات وقت التصريف بشأن أفعالك وانتقالات حالتك.

### التحديد الأساسي بأنواع `useReducer`

أبسط حالة لـ `useReducer` مع TypeScript:

```typescript
interface CounterState {
  count: number;
  step: number;
}

// Define all possible actions with discriminated union
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set':
      return { ...state, count: action.payload }; // TypeScript knows payload exists
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      // This ensures we handle all action types
      const _exhaustive: never = action;
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  // TypeScript validates these action objects
  const increment = () => dispatch({ type: 'increment' });
  const setCount = (value: number) => dispatch({ type: 'set', payload: value });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>+{state.step}</button>
    </div>
  );
}
```

النوع `never` في الحالة الافتراضية حيلةٌ أنيقة — إن أضفت نوع إجراء جديد ونسيتَ معالجته، لصاحبت TypeScript في وجهك.

### الأنواع الاتحادية المُميَّزة للحالة المعقّدة

بدلًا من نمذجة حالات التحميل بأعلام منطقية منفصلة (وهو ما قد يؤدي إلى تركيبات مستحيلة)، استخدم أنواعًا اتحادية مُميَّزة تجعل الحالات غير الصالحة غير قابلة للتمثيل:

```typescript
// ❌ Problematic approach - allows impossible states
interface BadAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
// What if loading=true AND error=true? What if data exists but loading=true?

// ✅ Better approach - impossible states are impossible
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function useAsyncData<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const fetchData = async () => {
    setState({ status: 'loading' });

    try {
      const data = await fetchFn();
      setState({ status: 'success', data });
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return { state, fetchData };
}
```

يفرض هذا النهج عليك معالجة كل حالة صراحةً ويمنع أخطاءً مثل إظهار مؤشّرات التحميل مع عرض رسائل الخطأ في الوقت نفسه.

## أنماط متقدّمة في تحديد أنواع الإجراءات

عند بناء تطبيقات معقّدة، تصبح أنواع أفعالك حيويةً للصيانة. وهذه أنماط مجرَّبة في الميدان لتوسيع منطق مخفّض الحالة.

### الحل القائم على النوع الاتحادي

بدلًا من ثوابت نصّية، عرّف أفعالك كنوع اتحادي مُميَّز. هذا يمنحك أمانًا وقت التصريف لكلٍّ من دوال إنشاء الإجراءات ومنطق المخفّض:

```typescript
// ✅ Type-safe actions with discriminated union
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; value: number }
  | { type: 'incrementBy'; amount: number };

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'set':
      // TypeScript knows `value` exists here
      return action.value;
    case 'incrementBy':
      // TypeScript knows `amount` exists here
      return state + action.amount;
    default:
      // This ensures exhaustive handling
      const _exhaustive: never = action;
      return state;
  }
}
```

### دوال إنشاء الإجراءات بأنواع آمنة

أنشئ دوال إنشاء إجراءات آمنةً من حيث الأنواع تمنع الأفعال المشوّهة:

```typescript
// Action creators with proper typing
const counterActions = {
  increment: (): CounterAction => ({ type: 'increment' }),
  decrement: (): CounterAction => ({ type: 'decrement' }),
  set: (value: number): CounterAction => ({ type: 'set', value }),
  incrementBy: (amount: number): CounterAction => ({ type: 'incrementBy', amount }),
} as const;

// Usage in component
function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterActions.increment())}>+1</button>
      <button onClick={() => dispatch(counterActions.incrementBy(5))}>+5</button>
      <button onClick={() => dispatch(counterActions.set(0))}>Reset</button>
    </div>
  );
}
```

### إجراءات عامة للأنماط الشائعة

للأفعال التي تتبع أنماطًا متشابهة، يمكنك إنشاء أنواع إجراءات عامة:

```typescript
// Generic action patterns
type AsyncAction<T extends string, TData = undefined> = TData extends undefined
  ? { type: `${T}_PENDING` } | { type: `${T}_FULFILLED` } | { type: `${T}_REJECTED`; error: string }
  : | { type: `${T}_PENDING` }
    | { type: `${T}_FULFILLED`; data: TData }
    | { type: `${T}_REJECTED`; error: string };

// Usage for API calls
type UserAction = AsyncAction<'FETCH_USER', User> | AsyncAction<'DELETE_USER'>;

// This generates:
// | { type: 'FETCH_USER_PENDING' }
// | { type: 'FETCH_USER_FULFILLED'; data: User }
// | { type: 'FETCH_USER_REJECTED'; error: string }
// | { type: 'DELETE_USER_PENDING' }
// | { type: 'DELETE_USER_FULFILLED' }
// | { type: 'DELETE_USER_REJECTED'; error: string }
```

## مثال واقعي: حالة نموذج معقّدة

إليك مثالًا عمليًا يستعرض أنماط تحديد متقدّمة للأنواع في إدارة النماذج:

```typescript
interface FormState {
  fields: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: Partial<Record<keyof FormState['fields'], string>>;
  isSubmitting: boolean;
  submitCount: number;
}
```

## نموذج مدفوع بالمخفّض مع أنواع Action وDispatch المشتقّة

اشتقّ `Action` و`Dispatch` مباشرةً من دوال إنشاء الإجراءات حتى تبقى العناصر كلّها متزامنة، وتُثبت الشمول بالاستعانة بـ `never`.

```typescript
// 1) State
interface LoginState {
  email: string;
  password: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  error?: string;
}

// 2) Action creators (as const for literal types)
const loginActions = {
  updateEmail: (value: string) => ({ type: 'updateEmail', value }) as const,
  updatePassword: (value: string) => ({ type: 'updatePassword', value }) as const,
  submit: () => ({ type: 'submit' }) as const,
  success: () => ({ type: 'success' }) as const,
  failure: (message: string) => ({ type: 'failure', message }) as const,
};

// 3) Derive Action and Dispatch from creators
type LoginAction = ReturnType<(typeof loginActions)[keyof typeof loginActions]>;
type LoginDispatch = React.Dispatch<LoginAction>;

// 4) Reducer with exhaustive check
function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'updateEmail':
      return { ...state, email: action.value };
    case 'updatePassword':
      return { ...state, password: action.value };
    case 'submit':
      return { ...state, status: 'submitting', error: undefined };
    case 'success':
      return { ...state, status: 'success' };
    case 'failure':
      return { ...state, status: 'error', error: action.message };
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}

// 5) Hook that exposes typed dispatch
function useLoginForm() {
  const [state, dispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
    status: 'idle',
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(loginActions.updateEmail(e.target.value));
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(loginActions.updatePassword(e.target.value));

  const submit = async () => {
    dispatch(loginActions.submit());
    try {
      await fakeLogin(state.email, state.password);
      dispatch(loginActions.success());
    } catch (e) {
      dispatch(loginActions.failure(e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  return { state, dispatch: dispatch as LoginDispatch, onEmailChange, onPasswordChange, submit };
}
```

```typescript
type FormAction =
| { type: 'updateField'; field: keyof FormState['fields']; value: string }
| { type: 'setError'; field: keyof FormState['fields']; error: string }
| { type: 'clearError'; field: keyof FormState['fields'] }
| { type: 'setSubmitting'; isSubmitting: boolean }
| { type: 'submitAttempt' }
| { type: 'reset' };

function formReducer(state: FormState, action: FormAction): FormState {
switch (action.type) {
case 'updateField':
return {
...state,
fields: {
...state.fields,
[action.field]: action.value,
},
// Clear error when user starts typing
errors: {
...state.errors,
[action.field]: undefined,
},
};
case 'setError':
return {
...state,
errors: {
...state.errors,
[action.field]: action.error,
},
};
case 'clearError':
return {
...state,
errors: {
...state.errors,
[action.field]: undefined,
},
};
case 'setSubmitting':
return { ...state, isSubmitting: action.isSubmitting };
case 'submitAttempt':
return { ...state, submitCount: state.submitCount + 1 };
case 'reset':
return {
fields: { email: '', password: '', confirmPassword: '' },
errors: {},
isSubmitting: false,
submitCount: 0,
};
default:
const \_exhaustive: never = action;
return state;
}
}

function useForm() {
const [state, dispatch] = useReducer(formReducer, {
fields: { email: '', password: '', confirmPassword: '' },
errors: {},
isSubmitting: false,
submitCount: 0,
});

const updateField = (field: keyof FormState['fields'], value: string) => {
dispatch({ type: 'updateField', field, value });
};

const validateAndSubmit = async () => {
// Validation logic here...
dispatch({ type: 'submitAttempt' });
dispatch({ type: 'setSubmitting', isSubmitting: true });

    try {
      // Submit logic...
      console.log('Form submitted:', state.fields);
    } catch (error) {
      dispatch({ type: 'setError', field: 'email', error: 'Submission failed' });
    } finally {
      dispatch({ type: 'setSubmitting', isSubmitting: false });
    }

};

return { state, updateField, validateAndSubmit, dispatch };
}
```

## التحديثات الوظيفية وأمان الأنواع

يتألّق استنتاج TypeScript مع التحديثات الوظيفية للحالة. فمعامل الاستدعاء يأخذ نوعه الصحيح تلقائيًا:

```typescript
const [items, setItems] = useState<string[]>([]);

// ✅ TypeScript knows `prev` is string[]
setItems((prev) => [...prev, 'new item']);

// ✅ Works with complex objects too
interface FormState {
  email: string;
  password: string;
  errors: string[];
}

const [form, setForm] = useState<FormState>({
  email: '',
  password: '',
  errors: [],
});

setForm((prev) => ({
  ...prev,
  errors: [...prev.errors, 'Email is required'], // TypeScript validates everything
}));
```

> **تحذير**
>
> احذر أن تعدّل الحالة مباشرة، حتى مع التحديثات الوظيفية. أعِد دائمًا كائنًا أو مصفوفة جديدة.

## خُطّافات مخصّصة مع إدارة الحالة

الخُطّافات المخصّصة التي تستخدم `useState` في داخلها تستفيد من التحديد العام للأنواع لتصبح قابلة لإعادة الاستخدام:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage with proper type inference
const [settings, setSettings] = useLocalStorage('userSettings', {
  theme: 'light' as const,
  notifications: true,
});
```

## اعتبارات الأداء

لا يقتصر التحديد الصحيح للأنواع على منع الأخطاء — بل يمكنه أن يوجّه تحسينات الأداء أيضًا. فحين تنمذج حالتك بدقّة، تتمكّن من استخدام خُطّافات تحسين React بفاعلية أكبر:

```typescript
interface OptimizedState {
  expensiveData: ComplexObject[];
  uiState: {
    selectedId: string | null;
    isModalOpen: boolean;
  };
}

function useOptimizedState() {
  const [state, setState] = useState<OptimizedState>({
    expensiveData: [],
    uiState: { selectedId: null, isModalOpen: false },
  });

  // Separate setters for different concerns
  const updateUiState = useCallback((updates: Partial<OptimizedState['uiState']>) => {
    setState((prev) => ({
      ...prev,
      uiState: { ...prev.uiState, ...updates },
    }));
  }, []);

  const updateExpensiveData = useCallback((data: ComplexObject[]) => {
    setState((prev) => ({ ...prev, expensiveData: data }));
  }, []);

  return { state, updateUiState, updateExpensiveData };
}
```

## الأخطاء الشائعة وأفضل الممارسات

### تحديد الأنواع العامة أكثر من اللازم

```typescript
// ❌ Unnecessary - TypeScript can infer this
const [name, setName] = useState<string>('');

// ✅ Let TypeScript infer simple types
const [name, setName] = useState('');

// ✅ But be explicit when necessary
const [user, setUser] = useState<User | null>(null);
```

### عدم استنفاد الأنواع الاتحادية المُميَّزة

```typescript
type Status = 'loading' | 'success' | 'error' | 'idle';

function handleStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Success!';
    case 'error':
      return 'Error occurred';
    // ❌ Missing 'idle' case - but TypeScript won't catch this without...
  }

  // ✅ Add this to catch missing cases
  const _exhaustive: never = status;
  throw new Error(`Unhandled status: ${status}`);
}
```

### النسيان للإغلاقات القديمة

```typescript
function Timer() {
  const [count, setCount] = useState(0);

  // ❌ Use functional updates to avoid stale closures
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1); // Always gets current value
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Now the empty deps array is safe
}
```

## ملخّص أفضل الممارسات

1. **دع الاستنتاج يعمل مع الأنواع الأولية**: `useState(0)` و`useState('')` و`useState(false)`
2. **كن صريحًا مع الأنواع الاتحادية**: `useState<Status>('idle')`
3. **حدّد أنواع الحاويات الفارغة دائمًا**: `useState<T[]>([])` و`useState<Partial<T>>({})`
4. **استخدم الأنواع الاتحادية المُميَّزة للحالة المعقّدة**: تمنع تركيبات الحالات المستحيلة
5. **فضّل التحديثات الوظيفية**: فهي أكثر أمانًا وتحصل على فحص أنواع أفضل
6. **عرّف الأنواع على حدة**: اجعلها قابلة لإعادة الاستخدام وحسّن رسائل الأخطاء
7. **استخدم الفحص الشامل**: أضف فحوصات `never` في مخفّضات الحالة

بهذه الأنماط، ستكتب شيفرة إدارة حالة في React آمنةً من حيث الأنواع وقابلةً للصيانة في آنٍ واحد. والمفتاح أن تفكّر في شكل حالتك مسبقًا وأن تنمذجه وأنت تراعي نظام أنواع TypeScript.

وسيشكرك نفسك في المستقبل (وزملاؤك) على أمان الأنواع الإضافي حين لا يبلغ خللُ الحالة الصعب إلى بيئة الإنتاج.
