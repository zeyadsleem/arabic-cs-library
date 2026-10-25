---
title: "خصائص التصيير وبدائل المكوّنات ذات الرتبة العليا"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/render-props-and-hoc-alternatives"
---

كان يومًا ما المكوّنات ذات الرتبة العليا (Higher-Order Components) هي النمط المفضّل في React لمشاركة المنطق بين المكوّنات. لكن مع TypeScript قد تتحوّل إلى كابوس في التعامل مع الأنواع، وخصوصًا حين تحتاج إلى تمرير الخصائص عبر عدّة طبقات. هنا يأتي دور خصائص التصيير (render props) — وهو نمط يمنحك القدرة نفسها مع أمانٍ أفضل في الأنواع ودعمٍ أفضل بكثير لـ IntelliSense. سنستكشف لماذا تتفوّق خصائص التصيير غالبًا في عالم React + TypeScript الحديث، ونعرض لك بدائل عملية تُبقي شيفرتك مرنة وآمنة الأنواع في الوقت نفسه.

## مشكلة المكوّنات ذات الرتبة العليا

قبل أن نغوص في الحلول، لنفهم ما الذي نحاول حله. تغلّف المكوّنات ذات الرتبة العليا مكوّناتك لحقن الخصائص أو السلوك فيها، لكنها تأتي مع بعض نقاط الألم في TypeScript:

```typescript
// ❌ Classic HOC - typing gets messy fast
function withAuth<P extends object>(Component: React.ComponentType<P & { user: User }>) {
  return function AuthenticatedComponent(props: Omit<P, 'user'>) {
    const user = useAuth();
    if (!user) return <LoginForm />;
    return <Component {...props} user={user} />;
  };
}

// Using it requires type gymnastics
const ProfilePage = withAuth<{ title: string }>(({ user, title }) => {
  // IntelliSense struggles here - it doesn't know about 'user'
  return (
    <h1>
      {title}: {user.name}
    </h1>
  );
});
```

تصبح المشكلات أكثر وضوحًا حين تبدأ في تركيب المكوّنات ذات الرتبة العليا معًا، أو حين لا يستطيع TypeScript استنتاج الخصائص المحقونة استنتاجًا صحيحًا. يختلط الإكمال التلقائي في محرّرك، وتصبح رسائل الأخطاء ملتبسة، ويصبح إعادةُ الهيكلة عمليةً محفوفة بالمخاطر.

## خصائص التصيير: البديل الصديق لـ TypeScript

تنقلب خصائص التصيير المعادلة رأسًا على عقب. فبدلًا من تغليف مكوّنك، تمرّر دالةً تستقبل البيانات وتعيد JSX. يحبّ TypeScript هذا النمط لأن تدفّق البيانات فيه صريح، ولأن استنتاج الأنواع يعمل فيه بإتقان.

```typescript
// ✅ Render prop component with excellent TypeScript support
interface AuthRenderProps {
  user: User | null;
  isLoading: boolean;
  error?: string;
}

interface AuthProviderProps {
  children: (props: AuthRenderProps) => React.ReactNode;
  fallback?: React.ReactNode;
}

function AuthProvider({ children, fallback }: AuthProviderProps) {
  const { user, isLoading, error } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user && fallback) return <>{fallback}</>;

  return <>{children({ user, isLoading, error })}</>;
}

// Usage is clean and type-safe
function ProfilePage() {
  return (
    <AuthProvider fallback={<LoginForm />}>
      {({ user }) => (
        <div>
          <h1>Welcome, {user?.name}!</h1>
          {/* Full IntelliSense support - TypeScript knows user exists here */}
        </div>
      )}
    </AuthProvider>
  );
}
```

ويحدث السحر في نوع خاصية `children`: `(props: AuthRenderProps) => React.ReactNode`. يعرف TypeScript تمامًا ما البيانات المتاحة داخل دالة التصيير، فيمنحك إكمالًا تلقائيًا مثاليًا وفحصًا دقيقًا للأخطاء.

## خصائص تصيير عامة لأقصى حدّ من المرونة

عندما تحتاج إلى التعامل مع أنواع بيانات مختلفة، تجعل الأنواع العامة (generics) خصائص التصيير أقوى بكثير:

```typescript
interface DataFetcher<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface FetchDataProps<T> {
  url: string;
  children: (state: DataFetcher<T>) => React.ReactNode;
}

function FetchData<T>({ url, children }: FetchDataProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// Usage with different data types - TypeScript infers everything
interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  return (
    <FetchData<User> url={`/api/users/${userId}`}>
      {({ data: user, loading, error, refetch }) => {
        if (loading) return <div>Loading user...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!user) return <div>User not found</div>;

        return (
          <div>
            <h2>{user.name}</h2> {/* TypeScript knows this is a User! */}
            <p>{user.email}</p>
            <button onClick={refetch}>Refresh</button>
          </div>
        );
      }}
    </FetchData>
  );
}
```

لاحظ كيف يستنتج TypeScript تلقائيًا أن `user` من نوع `User` داخل دالة التصيير. لا حاجة إلى تأكيدات أنواع يدوية.

## الخُطّافات المخصّصة: البديل الحديث

أحيانًا لا تحتاج إلى غلاف المكوّن أصلًا. تستطيع الخُطّافات المخصّصة أن توفّر مشاركة المنطق نفسها بصياغة أنظف بكثير:

```typescript
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
  }, []);

  return { user, isLoading, error, logout };
}

// Usage is incredibly clean
function ProfilePage() {
  const { user, isLoading, error, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <LoginForm />;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

تمنحك الخُطّافات المخصّصة أفضل ما في العالمين: منطقًا مشتركًا دون غلاف مكوّن، ودعمًا من TypeScript لا يُقدَّم له مثيل.

## المكوّنات المركّبة مع خصائص التصيير

لأنماط واجهة المستخدم الأكثر تعقيدًا، يمكنك الجمع بين خصائص التصيير والمكوّنات المركّبة لإنشاء واجهات مرنة وقابلة لإعادة الاستخدام:

```typescript
interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  selectedValue: string | null;
  select: (value: string) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

interface DropdownProps {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}

function Dropdown({ children, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const select = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onSelect?.(value);
      close();
    },
    [onSelect, close],
  );

  const contextValue: DropdownContextValue = {
    isOpen,
    toggle,
    close,
    selectedValue,
    select,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

// Render prop child component
interface DropdownListProps {
  children: (context: DropdownContextValue) => React.ReactNode;
}

function DropdownList({ children }: DropdownListProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownList must be used within Dropdown');
  }

  if (!context.isOpen) return null;

  return (
    <div className="absolute top-full left-0 rounded border bg-white shadow-lg">
      {children(context)}
    </div>
  );
}

// Usage combines the best of both patterns
function UserSelector() {
  return (
    <Dropdown onSelect={(userId) => console.log('Selected:', userId)}>
      <button>Select User</button>
      <DropdownList>
        {({ select, selectedValue }) => (
          <FetchData<User[]> url="/api/users">
            {({ data: users, loading }) => {
              if (loading) return <div className="p-2">Loading...</div>;

              return (
                <>
                  {users?.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => select(user.id.toString())}
                      className={`block w-full p-2 text-left hover:bg-gray-100 ${
                        selectedValue === user.id.toString() ? 'bg-blue-50' : ''
                      }`}
                    >
                      {user.name}
                    </button>
                  ))}
                </>
              );
            }}
          </FetchData>
        )}
      </DropdownList>
    </Dropdown>
  );
}
```

يمنحك هذا النمط أقصى قدر من المرونة مع الحفاظ على أمانٍ ممتاز في الأنواع. وتتلقّى خاصية التصيير السياق كاملًا بأنواعه الصحيحة، فتتمكّن من تركيب مصادر بيانات مختلفة بسهولة.

## اعتبارات الأداء

من المخاوف الشائعة مع خصائص التصيير الأداء. ولأنّك تنشئ دالةً جديدة في كل تصيير، قد يعيد React تصيير المكوّنات الفرعية دون داعٍ. وهذه بعض الاستراتيجيات لتحسين ذلك:

```typescript
// ✅ Memoize expensive render functions
function ExpensiveComponent() {
  const renderUsers = useCallback(({ data: users, loading }: DataFetcher<User[]>) => {
    if (loading) return <div>Loading...</div>;

    return (
      <div>
        {users?.map((user) => (
          <ExpensiveUserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }, []);

  return <FetchData<User[]> url="/api/users">{renderUsers}</FetchData>;
}

// ✅ Or use React.memo for the render prop component
const MemoizedFetchData = React.memo(FetchData) as typeof FetchData;
```

> **تلميح**
>
> في معظم الحالات، يكون الأثر على الأداء ضئيلًا. قِس الأداء قبل أن تحسّنه، وتذكّر أن فوائد أمان الأنواع وتجربة المطوّر غالبًا ما تفوق تكاليف الأداء البسيطة.

## متى تستخدم كل نمط

إليك دليلًا عمليًا لاختيار النمط المناسب:

**استخدم الخُطّافات المخصّصة عندما:**

- تشارك منطقًا ذا حالة بين المكوّنات
- لا يحتاج المنطق إلى التحكّم في التصيير
- تريد أنظف صياغة ممكنة
- تكون البيانات المشتركة بسيطة نسبيًا

**استخدم خصائص التصيير عندما:**

- تحتاج إلى التحكّم في متى وكيف تُصيَّر المكوّنات الفرعية
- تبني مكوّنات واجهة قابلة لإعادة الاستخدام
- يحتاج المكوّن إلى معالجة حالات التحميل والأخطاء وما شابه
- تريد تركيب عدة مصادر بيانات

**استخدم المكوّنات المركّبة عندما:**

- تبني مكوّنات واجهة معقّدة ومتعدّدة الأجزاء
- تحتاج إلى مشاركة الحالة بين مكوّنات فرعية متباعدة
- تريد مرونة في الواجهة البرمجية (فيستطيع المستخدمون ترتيب الأجزاء بطرق مختلفة)
- يتكوّن المكوّن من أجزاء متميّزة تعمل معًا

**تجنّب المكوّنات ذات الرتبة العليا عندما:**

- تستخدم TypeScript (إلّا إن كنت تعرف حقًّا ما تفعل)
- تحتاج إلى تركيب عدّة سلوكيات
- يجب أن تكون خصائص المكوّن الملفوف شفافة للمستهلكين

## حالات استخدام من العالم الحقيقي™

إليك بعض السيناريوهات العملية التي تتألّق فيها هذه الأنماط:

### إدارة حقول النماذج

```typescript
interface FieldState<T> {
  value: T;
  error: string | null;
  touched: boolean;
  setValue: (value: T) => void;
  setTouched: () => void;
  validate: () => boolean;
}

interface FormFieldProps<T> {
  initialValue: T;
  validator?: (value: T) => string | null;
  children: (field: FieldState<T>) => React.ReactNode;
}

function FormField<T>({ initialValue, validator, children }: FormFieldProps<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback(() => {
    if (validator) {
      const validationError = validator(value);
      setError(validationError);
      return !validationError;
    }
    return true;
  }, [value, validator]);

  const handleSetValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (touched && validator) {
        setError(validator(newValue));
      }
    },
    [touched, validator],
  );

  const handleSetTouched = useCallback(() => {
    setTouched(true);
    validate();
  }, [validate]);

  return (
    <>
      {children({
        value,
        error,
        touched,
        setValue: handleSetValue,
        setTouched: handleSetTouched,
        validate,
      })}
    </>
  );
}

// Usage with perfect type inference
function SignupForm() {
  return (
    <form>
      <FormField<string>
        initialValue=""
        validator={(email) => (email.includes('@') ? null : 'Please enter a valid email')}
      >
        {({ value, error, setValue, setTouched }) => (
          <div>
            <input
              type="email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={setTouched}
              className={error ? 'border-red-500' : ''}
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>
        )}
      </FormField>
    </form>
  );
}
```

### إدارة حالة واجهة البرمجة (API)

```typescript
interface ApiState<T, E = unknown> {
  data: T | null;
  loading: boolean;
  error: E | null;
}

function useApiState<T, E = string>(
  apiCall: () => Promise<T>,
): ApiState<T, E> & { execute: () => Promise<void> } {
  const [state, setState] = useState<ApiState<T, E>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as E,
      });
    }
  }, [apiCall]);

  return { ...state, execute };
}

// Clean usage with excellent error handling
function UserDashboard({ userId }: { userId: number }) {
  const userApi = useApiState(() =>
    fetch(`/api/users/${userId}`).then((r) => r.json() as Promise<User>),
  );

  useEffect(() => {
    userApi.execute();
  }, [userId, userApi.execute]);

  if (userApi.loading) return <div>Loading user...</div>;
  if (userApi.error) return <div>Error loading user</div>;
  if (!userApi.data) return <div>User not found</div>;

  return <UserProfile user={userApi.data} />;
}
```

## الانتقال من المكوّنات ذات الرتبة العليا

إذا كنت مضطرًا للاحتفاظ بمكوّنات رتبة عليا قائمة، فإليك استراتيجية انتقال تدريجي:

```typescript
// Step 1: Create a render prop version alongside your HOC
function withAuthRenderProp<T extends object>(Component: React.ComponentType<T & { user: User }>) {
  return function AuthWrapper(props: Omit<T, 'user'>) {
    return (
      <AuthProvider>
        {({ user }) => {
          if (!user) return <LoginForm />;
          return <Component {...(props as T)} user={user} />;
        }}
      </AuthProvider>
    );
  };
}

// Step 2: Gradually replace HOC usage with direct render props
// Old: const ProtectedPage = withAuth(MyPage);
// New: Direct usage of AuthProvider with render props

// Step 3: Eventually remove the HOC wrapper entirely
```

يمكن أن يكون الانتقال تدريجيًا، فيتيح لك تحسين أمان الأنواع خطوةً بخطوة دون كسر الشيفرة القائمة.

## الخطوات التالية

تمثّل خصائص التصيير والخُطّافات المخصّصة الطريقة الحديثة لمشاركة المنطق في تطبيقات React مع TypeScript. فهي توفّر أمانًا أفضل في الأنواع وتدفّق بيانات أوضح وتجربة مطوّر أفضل بكثير مقارنةً بالمكوّنات ذات الرتبة العليا. ابدأ بتحديد المنطق المشترك في قاعدة شيفرتك الذي يمكن أن يستفيد من هذه الأنماط:

1. **راجع مكوّنات الرتبة العليا**: ابحث عن المكوّنات الصعبة في الأنواع أو التركيب
2. **استخرج خُطّافات مخصّصة**: حوّل المنطق البسيط ذا الحالة إلى خُطّافات أولًا
3. **ابنِ مكوّنات بخصائص التصيير**: لمنطق واجهة أكثر تعقيدًا يحتاج إلى التحكّم في التصيير
4. **امزج الأنماط**: استخدم المكوّنات المركّبة مع خصائص التصيير لأقصى مرونة

الهدف ليس إلغاء كل مكوّن ذي رتبة عليا بين ليلة وضحاها، بل أن تلجأ إلى هذه الأنماط عند بناء ميزات جديدة. وسيشكرك نفسك في المستقبل (وزملاؤك) على أمان الأنواع المحسّن والشيفرة الأنظف.
