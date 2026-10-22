---
title: "الأنواع الاتحادية المُميَّزة"
---

إن كان هناك نمط واحد في TypeScript سيغيّر نظرتك إلى إدارة الحالة في React، فهو الأنواع الاتحادية المُميَّزة. فهي السلاح السريّ لجعل الحالات غير الصالحة مستحيلةَ التمثيل، وستوفّر عليك عددًا لا يُحصى من الأخطاء. فلنغوص بعمق في هذا النمط تغيير قواعد اللعبة.

## ما هي الأنواع الاتحادية المُميَّزة؟

النوع الاتحادي المُميَّز (ويُعرف أيضًا بالاتحاد المُوسوم) هو نمطٌ تستخدم فيه خاصيةً مشتركة للتمييز بين أشكال مختلفة من البيانات. تخيّله طريقة TypeScript في القول: «هذا الشيء يمكن أن يكون واحدًا من عدّة أشكال محدّدة، وسأساعدك في معرفة أيّها هو».

```typescript
// This is a discriminated union
type Status =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: string }
  | { type: 'error'; message: string };

// The 'type' field is the discriminator
```

> **ما الفرق بين النوع الاتحادي والنوع الاتحادي المُميَّز؟**
>
> في TypeScript، النوع الاتحادي ليس سوى طريقة لقول إنّ القيمة يمكن أن تكون واحدًا من عدّة أنواع مختلفة — فمثلًا `string | number` يعني أنّ القيمة قد تكون نصًّا أو عددًا، لكنّ TypeScript لا يعرف أيّهما هي في كل لحظة بطبيعتها. أما النوع الاتحادي المُميَّز (ويسمى أحيانًا الاتحاد المُوسوم) فيضيف خاصيةً مشتركة خاصّة، عادةً نوعًا حرفيًا مثل `kind: "circle" | "square"`، تعمل كوسمٍ يخبر المُصرِّف (وأنت) أيّ فرعٍ من الاتحاد تعمل عليه. ويتيح هذا «المُميِّز» لـ TypeScript تضييق النوع تلقائيًا وبأمانٍ عند فحصك قيمة تلك الخاصية، ما يجعل الأنواع الاتحادية المُميَّزة أقوى بكثير في نمذجة البيانات البنيوية وضمان الفحص الشامل.

## لماذا هي قويّة

يحدث السحر حين يستخدم TypeScript المُميِّز لتضييق النوع:

```typescript
function handleStatus(status: Status) {
  switch (status.type) {
    case 'idle':
      // TypeScript knows status is { type: 'idle' }
      return 'Ready to start';

    case 'loading':
      // TypeScript knows status is { type: 'loading' }
      return 'Loading...';

    case 'success':
      // TypeScript knows status is { type: 'success'; data: string }
      return `Success: ${status.data}`;

    case 'error':
      // TypeScript knows status is { type: 'error'; message: string }
      return `Error: ${status.message}`;
  }
}
```

## مثال واقعي في React

لنبنِ مكوّنًا لجلب البيانات يستخدم الأنواع الاتحادية المُميَّزة:

```typescript
// Define our state shape
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Custom hook using the discriminated union
function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' });

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setState({ status: 'loading' });

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error')
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

// Component using the hook
const UserProfile = ({ userId }: { userId: string }) => {
  const userState = useFetch<User>(`/api/users/${userId}`);

  switch (userState.status) {
    case 'idle':
      return <div>Ready to load user</div>;

    case 'loading':
      return <div>Loading user...</div>;

    case 'success':
      // TypeScript knows userState.data exists and is a User
      return (
        <div>
          <h1>{userState.data.name}</h1>
          <p>{userState.data.email}</p>
        </div>
      );

    case 'error':
      // TypeScript knows userState.error exists
      return <div>Error: {userState.error.message}</div>;

    default:
      // This ensures we handle all cases
      const exhaustive: never = userState;
      throw new Error(`Unhandled state: ${exhaustive}`);
  }
};
```

## جعل الحالات غير الصالحة مستحيلة

إليك القوة الحقيقية — الأنواع الاتحادية المُميَّزة تمنع الحالات غير الصالحة:

```typescript
// ❌ Bad: Multiple booleans lead to invalid states
interface BadState {
  isLoading: boolean;
  isError: boolean;
  data?: User;
  error?: Error;
}
// What if isLoading AND isError are both true?
// What if we have data AND error?

// ✅ Good: Discriminated union makes invalid states impossible
type GoodState =
  { status: 'loading' } | { status: 'error'; error: Error } | { status: 'success'; data: User };
// Can't be loading AND error
// Can't have data without success
// Can't have error without error status
```

## التعامل مع النماذج عبر الأنواع الاتحادية المُميَّزة

النماذج مثالية للأنواع الاتحادية المُميَّزة:

```typescript
type FormField<T> =
  | { status: 'empty' }
  | { status: 'validating' }
  | { status: 'valid'; value: T }
  | { status: 'invalid'; error: string; value?: T };

interface LoginForm {
  email: FormField<string>;
  password: FormField<string>;
}

const LoginComponent = () => {
  const [form, setForm] = useState<LoginForm>({
    email: { status: 'empty' },
    password: { status: 'empty' }
  });

  const validateEmail = async (email: string) => {
    setForm(prev => ({
      ...prev,
      email: { status: 'validating' }
    }));

    // Simulate async validation
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!email.includes('@')) {
      setForm(prev => ({
        ...prev,
        email: { status: 'invalid', error: 'Invalid email format', value: email }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        email: { status: 'valid', value: email }
      }));
    }
  };

  const canSubmit =
    form.email.status === 'valid' &&
    form.password.status === 'valid';

  return (
    <form>
      <div>
        <input
          type="email"
          onChange={e => validateEmail(e.target.value)}
          className={form.email.status === 'invalid' ? 'error' : ''}
        />
        {form.email.status === 'invalid' && (
          <span className="error-message">{form.email.error}</span>
        )}
        {form.email.status === 'validating' && (
          <span className="validating">Checking...</span>
        )}
      </div>
      <button disabled={!canSubmit}>Login</button>
    </form>
  );
};
```

## قواعد التحقّق عبر الأنواع الاتحادية المُميَّزة

يمكنك أيضًا نمذجة قواعد التحقّق كنوع اتحادي مُميَّز للحصول على معالجة واضحة وشاملة.

```typescript
type ValidationRule<T> =
  | { type: 'required'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'custom'; validate: (value: T) => boolean | string };

function validateField<T>(value: T, rules: ValidationRule<T>[]): string | null {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value) {
          return rule.message || 'This field is required';
        }
        break;

      case 'minLength':
        if (typeof value === 'string' && value.length < rule.value) {
          return rule.message || `Minimum length is ${rule.value}`;
        }
        break;

      case 'maxLength':
        if (typeof value === 'string' && value.length > rule.value) {
          return rule.message || `Maximum length is ${rule.value}`;
        }
        break;

      case 'pattern':
        if (typeof value === 'string' && !rule.value.test(value)) {
          return rule.message || 'Invalid format';
        }
        break;

      case 'custom':
        const result = rule.validate(value);
        if (result !== true) {
          return typeof result === 'string' ? result : 'Validation failed';
        }
        break;
    }
  }

  return null;
}
```

## سير عمل إرسال النموذج

كثيرًا ما تستفيد سير العمل للنموذج بالكامل من حالات موسومة مثل التحقّق، وخطأ التحقّق، والإرسال، والنجاح، والخطأ.

```typescript
type FormState<T> =
  | { status: 'idle' }
  | { status: 'validating' }
  | { status: 'validation-error'; errors: Record<keyof T, string[]> }
  | { status: 'submitting'; data: T }
  | { status: 'success'; result: string }
  | { status: 'error'; error: string };

interface LoginForm {
  email: string;
  password: string;
}

function LoginForm() {
  const [state, setState] = useState<FormState<LoginForm>>({ status: 'idle' });
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'validating' });

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setState({ status: 'validation-error', errors });
      return;
    }

    setState({ status: 'submitting', data: formData });

    try {
      const result = await submitLogin(formData);
      setState({ status: 'success', result });
    } catch (error) {
      setState({ status: 'error', error: error instanceof Error ? error.message : String(error) });
    }
  };

  switch (state.status) {
    case 'idle':
    case 'validating':
      return (
        <form onSubmit={handleSubmit} aria-busy={state.status === 'validating'}>
          {/* inputs omitted for brevity */}
          <button type="submit" disabled={state.status === 'validating'}>
            {state.status === 'validating' ? 'Validating…' : 'Login'}
          </button>
        </form>
      );
    case 'validation-error':
      return <ErrorsList errors={state.errors} />;
    case 'submitting':
      return <Spinner label={`Submitting for ${state.data.email}…`} />;
    case 'success':
      return <Success message={state.result} />;
    case 'error':
      return <ErrorBanner message={state.error} />;
  }
}
```

## الأفعال والمخفّضات

تتألّق الأنواع الاتحادية المُميَّزة في المخفّضات بأسلوب Redux:

```typescript
// Action types using discriminated unions
type CartAction =
  | { type: 'ADD_ITEM'; item: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; code: string; percentage: number }
  | { type: 'CHECKOUT_START' }
  | { type: 'CHECKOUT_SUCCESS'; orderId: string }
  | { type: 'CHECKOUT_FAILURE'; error: string };

interface CartState {
  items: CartItem[];
  discount: number;
  checkoutStatus: 'idle' | 'processing' | 'success' | 'error';
  orderId?: string;
  error?: string;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      // TypeScript knows action has item and quantity
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.item,
            quantity: action.quantity,
          },
        ],
      };

    case 'REMOVE_ITEM':
      // TypeScript knows action has productId
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };

    case 'UPDATE_QUANTITY':
      // TypeScript knows action has productId and quantity
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      };

    case 'APPLY_DISCOUNT':
      // TypeScript knows action has code and percentage
      return {
        ...state,
        discount: action.percentage,
      };

    case 'CHECKOUT_SUCCESS':
      // TypeScript knows action has orderId
      return {
        ...state,
        checkoutStatus: 'success',
        orderId: action.orderId,
        items: [],
      };

    case 'CHECKOUT_FAILURE':
      // TypeScript knows action has error
      return {
        ...state,
        checkoutStatus: 'error',
        error: action.error,
      };

    default:
      // Exhaustiveness check
      const exhaustive: never = action;
      return state;
  }
};
```

## عدّة مُميِّزات

أحيانًا تحتاج إلى حقول متعدّدة للتمييز:

```typescript
type NotificationStyle = 'banner' | 'toast' | 'modal';
type NotificationLevel = 'info' | 'warning' | 'error' | 'success';

type Notification =
  | { style: 'banner'; level: 'info'; message: string }
  | { style: 'banner'; level: 'warning'; message: string; dismissible: boolean }
  | { style: 'toast'; level: NotificationLevel; message: string; duration: number }
  | { style: 'modal'; level: 'error'; message: string; details: string; onConfirm: () => void };

function renderNotification(notification: Notification) {
  if (notification.style === 'banner') {
    if (notification.level === 'warning') {
      // TypeScript knows dismissible exists
      return (
        <Banner warning dismissible={notification.dismissible}>
          {notification.message}
        </Banner>
      );
    }
    // info banner
    return <Banner>{notification.message}</Banner>;
  }

  if (notification.style === 'toast') {
    // TypeScript knows duration exists
    return (
      <Toast level={notification.level} duration={notification.duration}>
        {notification.message}
      </Toast>
    );
  }

  // Must be modal with error
  // TypeScript knows details and onConfirm exist
  return (
    <Modal onConfirm={notification.onConfirm}>
      <h2>Error</h2>
      <p>{notification.message}</p>
      <details>{notification.details}</details>
    </Modal>
  );
}
```

## أنواع اتحادية مُميَّزة متداخلة

يمكنك تداخل الأنواع الاتحادية المُميَّزة للحالات المعقّدة:

```typescript
type ConnectionState =
  | { status: 'disconnected' }
  | { status: 'connecting'; attempt: number }
  | { status: 'connected'; socket: WebSocket }
  | { status: 'error'; error: Error; canRetry: boolean };

type DataState<T> =
  | { status: 'idle' }
  | { status: 'fetching' }
  | { status: 'success'; data: T; updatedAt: Date }
  | { status: 'error'; error: Error };

interface AppState<T> {
  connection: ConnectionState;
  data: DataState<T>;
}

function getStatusMessage<T>(state: AppState<T>): string {
  // Handle connection state
  if (state.connection.status === 'disconnected') {
    return 'Disconnected from server';
  }

  if (state.connection.status === 'connecting') {
    return `Connecting... (attempt ${state.connection.attempt})`;
  }

  if (state.connection.status === 'error') {
    return state.connection.canRetry
      ? 'Connection failed. Retrying...'
      : 'Connection failed. Please refresh.';
  }

  // Connected - check data state
  switch (state.data.status) {
    case 'idle':
      return 'Connected. Ready to load data.';
    case 'fetching':
      return 'Loading data...';
    case 'success':
      return `Data updated at ${state.data.updatedAt.toLocaleTimeString()}`;
    case 'error':
      return `Error loading data: ${state.data.error.message}`;
  }
}
```

## إدارة حالة الموجّه (Router)

الأنواع الاتحادية المُميَّزة مثالية للتوجيه (routing):

```typescript
type Route =
  | { path: 'home' }
  | { path: 'profile'; userId: string }
  | { path: 'post'; postId: string; section?: 'comments' | 'edit' }
  | { path: 'search'; query: string; filters: SearchFilters }
  | { path: 'not-found' };

interface RouterState {
  current: Route;
  previous?: Route;
  isTransitioning: boolean;
}

const Router = ({ state }: { state: RouterState }) => {
  const { current } = state;

  switch (current.path) {
    case 'home':
      return <HomePage />;

    case 'profile':
      // TypeScript knows userId exists
      return <ProfilePage userId={current.userId} />;

    case 'post':
      // TypeScript knows postId and optional section exist
      return (
        <PostPage
          postId={current.postId}
          section={current.section}
        />
      );

    case 'search':
      // TypeScript knows query and filters exist
      return (
        <SearchPage
          query={current.query}
          filters={current.filters}
        />
      );

    case 'not-found':
      return <NotFoundPage />;

    default:
      const exhaustive: never = current;
      throw new Error(`Unhandled route: ${exhaustive}`);
  }
};
```

## نمط العمليات غير المتزامنة

إليك نمطًا قابلًا لإعادة الاستخدام للعمليات غير المتزامنة:

```typescript
type AsyncOperation<TParams, TResult> =
  | { status: 'idle' }
  | { status: 'pending'; params: TParams }
  | { status: 'success'; params: TParams; result: TResult; timestamp: Date }
  | { status: 'failure'; params: TParams; error: Error; canRetry: boolean };

// Generic hook for async operations
function useAsyncOperation<TParams, TResult>(
  operation: (params: TParams) => Promise<TResult>
) {
  const [state, setState] = useState<AsyncOperation<TParams, TResult>>({
    status: 'idle'
  });

  const execute = useCallback(async (params: TParams) => {
    setState({ status: 'pending', params });

    try {
      const result = await operation(params);
      setState({
        status: 'success',
        params,
        result,
        timestamp: new Date()
      });
      return result;
    } catch (error) {
      setState({
        status: 'failure',
        params,
        error: error instanceof Error ? error : new Error('Unknown error'),
        canRetry: true
      });
      throw error;
    }
  }, [operation]);

  const retry = useCallback(() => {
    if (state.status === 'failure' && state.canRetry) {
      execute(state.params);
    }
  }, [state, execute]);

  return { state, execute, retry };
}

// Using the hook
const SaveButton = ({ data }: { data: FormData }) => {
  const { state, execute, retry } = useAsyncOperation(saveData);

  const handleSave = () => execute(data);

  switch (state.status) {
    case 'idle':
      return <button onClick={handleSave}>Save</button>;

    case 'pending':
      return <button disabled>Saving...</button>;

    case 'success':
      return (
        <div>
          ✓ Saved at {state.timestamp.toLocaleTimeString()}
          <button onClick={handleSave}>Save Again</button>
        </div>
      );

    case 'failure':
      return (
        <div>
          <span className="error">Failed: {state.error.message}</span>
          {state.canRetry && (
            <button onClick={retry}>Retry</button>
          )}
        </div>
      );
  }
};
```

## نماذج المعالج والنماذج متعددة الخطوات

الأنواع الاتحادية المُميَّزة تتفوّق في العمليات متعددة الخطوات:

```typescript
type WizardStep =
  | { step: 'personal'; data?: PersonalData }
  | { step: 'contact'; data: PersonalData }
  | { step: 'preferences'; data: PersonalData & ContactData }
  | { step: 'review'; data: PersonalData & ContactData & PreferencesData }
  | { step: 'complete'; data: CompleteProfile };

interface WizardState {
  current: WizardStep;
  history: WizardStep[];
  validationErrors?: Record<string, string>;
}

const ProfileWizard = () => {
  const [state, setState] = useState<WizardState>({
    current: { step: 'personal' },
    history: []
  });

  const goToNext = () => {
    const { current } = state;

    switch (current.step) {
      case 'personal':
        // Validate and collect personal data
        const personalData = validatePersonalData();
        if (personalData) {
          setState({
            current: { step: 'contact', data: personalData },
            history: [...state.history, current]
          });
        }
        break;

      case 'contact':
        // Current.data is PersonalData
        const contactData = validateContactData();
        if (contactData) {
          setState({
            current: {
              step: 'preferences',
              data: { ...current.data, ...contactData }
            },
            history: [...state.history, current]
          });
        }
        break;

      case 'preferences':
        // Current.data is PersonalData & ContactData
        const prefsData = validatePreferencesData();
        if (prefsData) {
          setState({
            current: {
              step: 'review',
              data: { ...current.data, ...prefsData }
            },
            history: [...state.history, current]
          });
        }
        break;

      case 'review':
        // Current.data is complete
        submitProfile(current.data).then(result => {
          setState({
            current: { step: 'complete', data: result },
            history: [...state.history, current]
          });
        });
        break;
    }
  };

  // Render appropriate step
  switch (state.current.step) {
    case 'personal':
      return <PersonalInfoForm onNext={goToNext} />;

    case 'contact':
      return <ContactInfoForm data={state.current.data} onNext={goToNext} />;

    case 'preferences':
      return <PreferencesForm data={state.current.data} onNext={goToNext} />;

    case 'review':
      return <ReviewStep data={state.current.data} onSubmit={goToNext} />;

    case 'complete':
      return <SuccessMessage profile={state.current.data} />;
  }
};
```

## مطابقة الأنماط عبر المكتبات

رغم أنّ TypeScript لا يملك مطابقة أنماط مدمجة، فإنّ مكتبات مثل `ts-pattern` تجعلها أقوى بكثير:

```typescript
import { match } from 'ts-pattern';

type Result<T, E> = { type: 'ok'; value: T } | { type: 'error'; error: E };

const processResult = <T, E>(result: Result<T, E>) =>
  match(result)
    .with({ type: 'ok' }, ({ value }) => `Success: ${value}`)
    .with({ type: 'error' }, ({ error }) => `Error: ${error}`)
    .exhaustive();

// More complex matching
type Event =
  | { type: 'click'; x: number; y: number }
  | { type: 'keypress'; key: string; shift: boolean }
  | { type: 'scroll'; delta: number };

const handleEvent = (event: Event) =>
  match(event)
    .with({ type: 'click', x: P.number, y: P.number }, ({ x, y }) => `Clicked at (${x}, ${y})`)
    .with({ type: 'keypress', shift: true }, ({ key }) => `Shift+${key} pressed`)
    .with({ type: 'keypress' }, ({ key }) => `${key} pressed`)
    .with({ type: 'scroll' }, ({ delta }) => `Scrolled ${delta}px`)
    .exhaustive();
```

## اختبار الأنواع الاتحادية المُميَّزة

تجعل الأنواع الاتحادية المُميَّزة الاختبار أسهل:

```typescript
// Easy to test each state
describe('UserProfile', () => {
  it('shows loading state', () => {
    const state: FetchState<User> = { status: 'loading' };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('shows user data on success', () => {
    const state: FetchState<User> = {
      status: 'success',
      data: { id: '1', name: 'Alice', email: 'alice@example.com' }
    };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Alice')).toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    const state: FetchState<User> = {
      status: 'error',
      error: new Error('Network error')
    };
    const { getByText } = render(<UserDisplay state={state} />);
    expect(getByText('Network error')).toBeInTheDocument();
  });
});
```

## أنماط شائعة ونصائح

### اجعل المُميِّز دائمًا موجودًا

```typescript
// ✅ Good - has discriminator
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number };

// ❌ Bad - no discriminator
type Shape = { radius: number } | { size: number };
// TypeScript can't easily tell these apart
```

### استخدم الأنواع الحرفية للمُميِّزات

```typescript
// ✅ Good - literal types
type Status = { type: 'success' } | { type: 'error' };

// ❌ Bad - using boolean
type Status = { success: true } | { success: false };
// Harder to extend and less clear
```

### أبقِ البيانات المترابطة معًا

```typescript
// ✅ Good - error with its message
type Result = { status: 'success'; data: string } | { status: 'error'; message: string };

// ❌ Bad - separate optional fields
interface Result {
  status: 'success' | 'error';
  data?: string;
  errorMessage?: string;
}
```

### استخدم الفحوصات الشاملة

```typescript
function handle(value: 'a' | 'b' | 'c') {
  switch (value) {
    case 'a':
      return 1;
    case 'b':
      return 2;
    case 'c':
      return 3;
    default:
      // This ensures we handle all cases
      const exhaustive: never = value;
      throw new Error(`Unhandled value: ${exhaustive}`);
  }
}
```

## متقدّم: بناء آلة حالات

الأنواع الاتحادية المُميَّزة مثالية لآلات الحالة:

```typescript
type TrafficLightState =
  | { color: 'red'; canWalk: true; next: 'green' }
  | { color: 'yellow'; canWalk: false; next: 'red' }
  | { color: 'green'; canWalk: false; next: 'yellow' };

class TrafficLight {
  private state: TrafficLightState = {
    color: 'red',
    canWalk: true,
    next: 'green'
  };

  transition() {
    switch (this.state.color) {
      case 'red':
        this.state = { color: 'green', canWalk: false, next: 'yellow' };
        break;
      case 'green':
        this.state = { color: 'yellow', canWalk: false, next: 'red' };
        break;
      case 'yellow':
        this.state = { color: 'red', canWalk: true, next: 'green' };
        break;
    }
  }

  getState() {
    return this.state;
  }
}

// React component using the state machine
const TrafficLightComponent = () => {
  const [light] = useState(() => new TrafficLight());
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      light.transition();
      forceUpdate();
    }, 2000);

    return () => clearInterval(interval);
  }, [light]);

  const state = light.getState();

  return (
    <div>
      <div className={`light ${state.color}`} />
      {state.canWalk && <div>🚶 Walk</div>}
      <div>Next: {state.next}</div>
    </div>
  );
};
```

## خصائص حصرية من دون مُميِّزات

أحيانًا تريد حصريةً متبادلة من دون خاصية تنويع صريحة. وهذا نمطٌ يستخدم الأنواع الاتحادية والنوع `never`:

```typescript
type ExclusiveProps<T, U> =
  | (T & { [K in keyof U]?: never })
  | (U & { [K in keyof T]?: never });

type IconButtonProps = ExclusiveProps<
  { icon: string; 'aria-label': string },
  { children: React.ReactNode }
>;

function IconButton(props: IconButtonProps) {
  if ('icon' in props) {
    return (
      <button aria-label={props['aria-label']}>
        <Icon name={props.icon} />
      </button>
    );
  }

  return <button>{props.children}</button>;
}
```

وهذا ينشئ علاقة «أو هذا أو ذاك» من دون الحاجة إلى مُميِّز:

```typescript
// ✅ Valid uses
<IconButton icon="search" aria-label="Search" />
<IconButton>Click me</IconButton>

// ❌ Invalid combinations caught by TypeScript
<IconButton icon="search">Text and icon</IconButton>
<IconButton aria-label="Label only" /> // Missing icon
```

أداة `ExclusiveProps` تجعل خصائص أحد النوعين من نوع `never` حين يكون النوع الآخر نشطًا، فتمنع الاستخدام المختلط.

## أنماط React متقدّمة

### اتحادات حقول النماذج

لنبنِ مكوّن حقل نموذج مرنًا يتعامل مع أنواع إدخال مختلفة:

```typescript
type BaseFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
};

type TextFieldProps = BaseFieldProps & {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type SelectFieldProps = BaseFieldProps & {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

type CheckboxFieldProps = BaseFieldProps & {
  type: 'checkbox';
  checked: boolean;
  onChange: (checked: boolean) => void;
};

type FieldProps = TextFieldProps | SelectFieldProps | CheckboxFieldProps;

function Field(props: FieldProps) {
  const { label, name, required, error } = props;

  const renderInput = () => {
    switch (props.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <input
            type={props.type}
            name={name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            required={required}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            required={required}
          >
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={name}
            checked={props.checked}
            onChange={(e) => props.onChange(e.target.checked)}
            required={required}
          />
        );
    }
  };

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {renderInput()}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

يضمن TypeScript ألّا تخلط خصائص غير متوافقة — لا `placeholder` في القوائم المنسدلة، ولا `options` في حقول النص.

### مكوّن زر بتنويعات

إليك كيف تنشئ زرًا يكون إمّا زرًا وإمّا رابطًا:

```typescript
type ButtonAsButton = {
  variant: 'button';
  onClick: () => void;
  disabled?: boolean;
};

type ButtonAsLink = {
  variant: 'link';
  href: string;
  disabled?: boolean;
};

type ButtonProps = {
  children: React.ReactNode;
} & (ButtonAsButton | ButtonAsLink);

function Button(props: ButtonProps) {
  const { children } = props;

  if (props.variant === 'button') {
    // TypeScript knows this is ButtonAsButton
    return (
      <button onClick={props.onClick} disabled={props.disabled}>
        {children}
      </button>
    );
  }

  // TypeScript knows this is ButtonAsLink
  return (
    <a href={props.href} className={props.disabled ? 'disabled' : ''}>
      {children}
    </a>
  );
}
```

## التحقّق وقت التشغيل مع Zod

لأمانٍ إضافي، وخصوصًا عند التعامل مع بيانات خارجية، اجمع الأنواع الاتحادية المُميَّزة مع التحقّق وقت التشغيل:

```typescript
import { z } from 'zod';

const ButtonSchemaAsButton = z.object({
  variant: z.literal('button'),
  onClick: z.function(),
  disabled: z.boolean().optional(),
});

const ButtonSchemaAsLink = z.object({
  variant: z.literal('link'),
  href: z.string().url(),
  disabled: z.boolean().optional(),
});

const ButtonPropsSchema = z
  .object({
    children: z.any(), // React.ReactNode is hard to validate
  })
  .and(z.union([ButtonSchemaAsButton, ButtonSchemaAsLink]));

type ButtonProps = z.infer<typeof ButtonPropsSchema>;

function Button(props: ButtonProps) {
  // Runtime validation catches props that TypeScript might miss
  const validatedProps = ButtonPropsSchema.parse(props);

  // Your component logic here...
}
```

وهذا ذو قيمة خاصة للمكوّنات التي تتلقّى خصائصها من واجهات البرمجة أو ملفات الإعداد حيث لا يمكن لـ TypeScript المساعدة.

### التحقّق وقت التشغيل لحالة الواجهة غير المتزامنة

يمكنك أيضًا التحقّق من حالة الواجهة الموسومة وقت التشغيل عبر مصنع مخططات قابل لإعادة الاستخدام:

```typescript
import { z } from 'zod';

const AsyncStateSchema = <T extends z.ZodTypeAny, E extends z.ZodTypeAny = z.ZodString>(
  dataSchema: T,
  errorSchema?: E,
) =>
  z.discriminatedUnion('status', [
    z.object({ status: z.literal('idle') }),
    z.object({ status: z.literal('loading') }),
    z.object({ status: z.literal('success'), data: dataSchema }),
    z.object({ status: z.literal('error'), error: (errorSchema ?? z.string()) as E }),
  ]);

const UserSchema = z.object({ id: z.string(), name: z.string(), email: z.string().email() });
const UserAsyncSchema = AsyncStateSchema(UserSchema);
type UserAsyncState = z.infer<typeof UserAsyncSchema>;

function parseUserAsync(input: unknown): UserAsyncState | null {
  const result = UserAsyncSchema.safeParse(input);
  return result.success ? result.data : null;
}
```

## اعتبارات الأداء

الأنواع الاتحادية المُميَّزة والخصائص الحصرية هما بنى وقت التصريف — ولا تضيفان أي عبءٍ وقت التشغيل. إذ تتحوّل فحوصات المُميِّز إلى وصولٍ بسيط إلى خاصية، ويُلغى تضييق الاتحاد من TypeScript أثناء التصريف.

لكنّ كن منتبهًا لما يلي:

- **الأنواع الاتحادية المعقّدة** قد تُبطئ تصريف TypeScript في قواعد الشيفرة الكبيرة جدًّا
- **التداخل العميق** للأنواع الاتحادية المُميَّزة قد يجعل رسائل الأخطاء أصعب في القراءة
- **التحقّق وقت التشغيل** له كلفة — استخدمه بحكمة في المسارات الحرجة للأداء

## الأخطاء الشائعة

### نسيان المُميِّز

```typescript
// ❌ This doesn't work—no discriminant
type BadUnion = { a: string } | { b: number };

function process(props: BadUnion) {
  if ('a' in props) {
    // This is a runtime check, not great
    return props.a;
  }
  return props.b.toString();
}
```

### جعل المُميِّزات اختيارية

```typescript
// ❌ Optional discriminants defeat the purpose
type WeakUnion = { type?: 'A'; propA: string } | { type?: 'B'; propB: number };
```

### تعقيد الحالات البسيطة

```typescript
// ❌ Overkill for a simple boolean flag
type OverEngineered = { visible: true; content: string } | { visible: false };

// ✅ Sometimes simple is better
type Simple = {
  visible: boolean;
  content?: string;
};
```

## متى تستخدم كل نمط

**استخدم الأنواع الاتحادية المُميَّزة عندما:**

- لديك تنويعات واضحة لسلوك المكوّن
- للخصائص معانٍ مختلفة تمامًا حسب السياق
- تريد واجهات برمجية صريحة ووثّقة بذاتها
- تحتاج مطابقة أنماط شاملة في جمل switch

**استخدم الخصائص الحصرية عندما:**

- لديك عدد أقلّ من الخيارات المتباعدة حصريًّا
- العلاقة أقرب إلى «أو هذا أو ذاك» منها إلى تنويعات متميّزة
- تريد واجهة برمجية أنظف من دون خصائص مُميِّز إضافية

**اجمعها مع التحقّق وقت التشغيل عندما:**

- تأتي الخصائص من مصادر خارجية (واجهات البرمجة، ملفات الإعداد)
- تبني مكتبة مكوّنات للاستهلاك الخارجي
- سلامة البيانات أمرٌ حاسم للأمان أو لمنطق العمل

## الخلاصة

الأنواع الاتحادية المُميَّزة إحدى مزايا TypeScript القاتلة في تطوير React. فهي:

1. **تجعل الحالات غير الصالحة مستحيلة** - لا يمكن تمثيل التركيبات الخاطئة
2. **تتيح الفحص الشامل** - يضمن TypeScript معالجتك لكل الحالات
3. **توفّر دعمًا ممتازًا لـ IntelliSense** - تعرف بيئة التطوير الخصائص المتاحة تمامًا
4. **توثّق نيتك** - تشرح الأنواع نفسها الحالات الممكنة
5. **تبسّط الاختبار** - من السهل اختبار كل حالة على حدة

أتقن هذا النمط، وستكتب تطبيقات React لا آمنةً من حيث الأنواع فحسب بل سليمةً معماريًّا. وسيشكرك نفسك في المستقبل (وزملاؤك)!
