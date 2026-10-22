---
title: "حِيَل الأنواع المتقدّمة في React"
---

هناك خطّ تتوقّف عنده مساعدة TypeScript ويبدأ عنده الشعور بأنك تصارع مُصرِّفًا أذكى منك. لكن ما إن تتجاوز الأساسيات حتى يصير TypeScript قادرًا فعليًا على جعل مكوّنات React أكثر تعبيرًا وأمانًا ومتعةً في العمل معها. سنستكشف في ما يلي حِيَل الأنواع المتقدّمة التي تحوّل TypeScript من «شرٍّ لا بدّ منه» إلى «قوة سرّية» (وربما تساعدك على الظهور كالساحر في مراجعة الشيفرة القادمة).

وفي نهاية هذا، ستفهم كيف تستخدم `satisfies` لتأكيدات أنواع لا تستسلم فيها للاستنتاج، وتأكيدات const لتثبيت واجهات مكوّناتك ثبات الصخر، والأنواع الشرطية والمُسقطة التي تتكيّف مع أي بيانات تُلقيها عليها.

## معامل `satisfies`: أمان أنواع بلا قيود

معامل `satisfies` (المُقدَّم في TypeScript 4.9) يتيح لك التحقّق من أن شيئًا يطابق نوعًا ما دون تغيير نوعه المستنتج فعليًا. فهو كأن لديك حرّاس أنواع لا يسرق معلومات نوعك.

وهنا المشكلة التي يحلّها. لنفرض أنك تبني إعدادات سِمة (theme) لتطبيقك:

```typescript
// ❌ Bad: We lose specific type information
const theme: Record<string, string> = {
  primary: '#3b82f6',
  secondary: '#64748b',
  danger: '#ef4444',
} as const;

// TypeScript now thinks theme.primary is just `string`, not the literal '#3b82f6'
```

ومع `satisfies` تحصل على أفضل الخيارين:

```typescript
// ✅ Good: We verify the shape AND keep the literal types
const theme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  danger: '#ef4444',
} as const satisfies Record<string, string>;

// Now theme.primary has type '#3b82f6', not just string!
type PrimaryColor = typeof theme.primary; // '#3b82f6'
```

ويصبح هذا قويًا عند بناء تنويعات المكوّنات بأنواع صارمة:

```typescript
interface ButtonVariants {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
}

const buttonStyles = {
  variant: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white',
  },
  size: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
} as const satisfies {
  [K in keyof ButtonVariants]: Record<ButtonVariants[K], string>;
};

function Button({ variant, size }: ButtonVariants) {
  // TypeScript knows these are safe and gives you autocomplete!
  const variantClass = buttonStyles.variant[variant];
  const sizeClass = buttonStyles.size[size];

  return <button className={`${variantClass} ${sizeClass}`}>Click me</button>;
}
```

> **نصيحة**
>
> استخدم `satisfies` حين تريد التحقّق من قيد نوعي دون فقدان النوع المستنتج المحدّد. وهو مفيد بصفة خاصة لكائنات الإعداد وجداول البحث.

## تأكيدات const: واجهات مكوّنات لا تُخترق

تحوّل تأكيدات const (لاحقة `as const`) القيم القابلة للتغيير إلى أنواع للقراءة فقط وأنواع حرفية. وبالنسبة لمكوّنات React، يجعل هذا واجهاتك أكثر قابلية للتنبؤ ويجعل الإكمال التلقائي أكثر نفعًا بكثير.

ودون تأكيدات const، يتّخذ TypeScript افتراضات قد لا تطابق نيّتك:

```typescript
// ❌ Without const assertion
const sizes = ['sm', 'md', 'lg'];
// TypeScript infers: string[]

function Avatar({ size }: { size: (typeof sizes)[number] }) {
  // size has type: string (not very helpful!)
  return <img className={`w-${size}`} />;
}
```

ومع تأكيدات const تحصل على أنواع حرفية دقيقة:

```typescript
// ✅ With const assertion
const sizes = ['sm', 'md', 'lg'] as const;
// TypeScript infers: readonly ['sm', 'md', 'lg']

function Avatar({ size }: { size: (typeof sizes)[number] }) {
  // size has type: 'sm' | 'md' | 'lg' (much better!)
  return <img className={`w-${size}`} />;
}
```

ويتألّق هذا النمط عند بناء مكتبات مكوّنات قابلة لإعادة الاستخدام:

```typescript
const iconSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconColors = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;

type IconSize = (typeof iconSizes)[number]; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type IconColor = (typeof iconColors)[number]; // 'primary' | 'secondary' | etc.

interface IconProps {
  name: string;
  size?: IconSize;
  color?: IconColor;
}

function Icon({ name, size = 'md', color = 'primary' }: IconProps) {
  return (
    <svg className={`icon-${size} text-${color}`} aria-label={name}>
      {/* SVG content */}
    </svg>
  );
}

// TypeScript now provides autocomplete for both size and color!
<Icon name="heart" size="lg" color="danger" />;
```

ويمكنك أيضًا استخدام تأكيدات const مع إعدادات الكائنات:

```typescript
const statusConfig = {
  pending: { color: 'yellow', label: 'In Progress' },
  completed: { color: 'green', label: 'Done' },
  failed: { color: 'red', label: 'Failed' },
} as const;

type StatusType = keyof typeof statusConfig; // 'pending' | 'completed' | 'failed'

function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];

  return <span className={`badge bg-${config.color}`}>{config.label}</span>;
}
```

## الأنواع الشرطية: مكوّنات تتكيّف مع بياناتك

تتيح لك الأنواع الشرطية إنشاء مكوّنات تغيّر سلوكها بناءً على الأنواع التي تتلقّاها. فكّر فيها كأنها جمل if على مستوى الأنواع.

الصيغة الأساسية هي: `T extends U ? X : Y` — «إذا كان T قابلًا للإسناد إلى U، فالنتيجة X، وإلّا فالنتيجة Y».

إليك مثالًا عمليًا. لنبنِ مكوّن `DataTable` يتكيّف بناءً على ما إن كنت تمرّر مصفوفةًا أم حالة تحميل:

```typescript
type DataTableProps<T> = T extends readonly unknown[]
  ? {
      data: T;
      loading?: false;
      renderRow: (item: T[number], index: number) => React.ReactNode;
    }
  : {
      data?: undefined;
      loading: true;
      renderRow?: undefined;
    };

function DataTable<T extends readonly unknown[] | undefined>(props: DataTableProps<T>) {
  if (props.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table">
      {props.data.map((item, index) => (
        <div key={index} className="table-row">
          {props.renderRow(item, index)}
        </div>
      ))}
    </div>
  );
}

// Usage - TypeScript enforces the right props for each case:
<DataTable
  loading={true}
  // No data or renderRow needed!
/>

<DataTable
  data={users}
  renderRow={(user) => <span>{user.name}</span>}
  // loading not needed!
/>
```

وتعمل الأنواع الشرطية بشكل رائع أيضًا لبناء مكوّنات متعدّدة الأشكال (polymorphic) تغيّر سلوكها بناءً على الخصائص:

```typescript
type ButtonProps<T extends 'button' | 'link'> = {
  variant: T;
} & (T extends 'link'
  ? {
      href: string;
      target?: string;
    }
  : {
      onClick: () => void;
      type?: 'button' | 'submit';
    }
);

function Button<T extends 'button' | 'link'>(props: ButtonProps<T>) {
  if (props.variant === 'link') {
    return (
      <a href={props.href} target={props.target} className="btn">
        {props.children}
      </a>
    );
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className="btn"
    >
      {props.children}
    </button>
  );
}

// TypeScript enforces the right props:
<Button variant="link" href="/about" />
<Button variant="button" onClick={() => alert('clicked')} />
```

> **ملاحظة**
>
> يمكن أن تتعقّد الأنواع الشرطية بسرعة. ابدأ ببساطة، ولا تضف التعقيد إلا حين تبرّر فوائد أمان الأنواع كلفة التفكير الإضافي.

## الأنواع المُسقطة: حوِّل الأنواع كالمحترفين

تتيح لك الأنواع المُسقطة إنشاء أنواع جديدة عبر تحويل خصائص أنواع موجودة. فهي مثل `Array.map()` لكن لتعريفات الأنواع.

الصيغة الأساسية هي: `{ [K in keyof T]: SomeTransformation<T[K]> }`

وهذا مثال شائع على الاستخدام في العالم الحقيقي™: بناء مكوّنات نماذج تتعامل مع حالات التحقّق لكل حقل:

```typescript
type User = {
  name: string;
  email: string;
  age: number;
};

// Create a type where every property becomes optional with error states
type FormState<T> = {
  [K in keyof T]?: {
    value: T[K];
    error?: string;
    touched: boolean;
  };
};

// Results in:
// {
//   name?: { value: string; error?: string; touched: boolean };
//   email?: { value: string; error?: string; touched: boolean };
//   age?: { value: number; error?: string; touched: boolean };
// }

function useForm<T>(): {
  formState: FormState<T>;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
  validateField: <K extends keyof T>(field: K) => void;
} {
  // Implementation details...
  const [formState, setFormState] = useState<FormState<T>>({});

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        touched: true,
      },
    }));
  };

  return { formState, updateField, validateField: () => {} };
}

// Usage with full type safety:
function UserForm() {
  const { formState, updateField } = useForm<User>();

  return (
    <form>
      <input
        value={formState.name?.value || ''}
        onChange={(e) => updateField('name', e.target.value)}
      />
      {formState.name?.error && <span className="error">{formState.name.error}</span>}
    </form>
  );
}
```

ويمكنك أيضًا إنشاء أنواع مُسقطة تجعل الخصائص مطلوبة أو للقراءة فقط:

```typescript
// Make all properties required
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Combine with conditional types for advanced transformations
type StringifyValues<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : string;
};

type UserStrings = StringifyValues<User>;
// Results in: { name: string; email: string; age: string; }
```

وهذا مثال عملي لبناء معالِجات أحداث آمنة من حيث الأنواع:

```typescript
type EventMap = {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string };
  'product:view': { productId: string; userId?: string };
};

type EventHandlers<T> = {
  [K in keyof T]: (data: T[K]) => void;
};

class EventEmitter<T> {
  private handlers: Partial<EventHandlers<T>> = {};

  on<K extends keyof T>(event: K, handler: EventHandlers<T>[K]) {
    this.handlers[event] = handler;
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const handler = this.handlers[event];
    if (handler) {
      handler(data);
    }
  }
}

// Usage with full autocomplete and type checking:
const emitter = new EventEmitter<EventMap>();

emitter.on('user:login', (data) => {
  // data is automatically typed as { userId: string; timestamp: Date }
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit('user:login', {
  userId: '123',
  timestamp: new Date(),
  // TypeScript would error if you missed required properties
});
```

## أنواع الأدوات (utility types) التي تجعل كل شيء ينضبط

يأتي TypeScript بأنواع أدوات مدمجة تعمل بشكل رائع مع أنماط React. ولنتعرّف على كيفية استخدامها بفاعلية:

### `Pick` و `Omit` لتكوين المكوّنات

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  lastLoginAt: Date;
}

// Create a component that only shows public user info
function UserCard(props: Pick<User, 'name' | 'email' | 'avatar'>) {
  return (
    <div className="user-card">
      <img src={props.avatar} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.email}</p>
    </div>
  );
}

// Create a component that shows everything except sensitive data
function UserProfile(props: Omit<User, 'isAdmin'>) {
  return (
    <div className="user-profile">
      <UserCard {...props} />
      <p>Last login: {props.lastLoginAt.toLocaleDateString()}</p>
    </div>
  );
}
```

### `Partial` لدوال التحديث المرنة

```typescript
interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'en' | 'es' | 'fr';
}

function SettingsForm({
  settings,
  onUpdate,
}: {
  settings: UserSettings;
  onUpdate: (updates: Partial<UserSettings>) => void;
}) {
  return (
    <form>
      <select
        value={settings.theme}
        onChange={(e) => onUpdate({ theme: e.target.value as 'light' | 'dark' })}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <input
        type="checkbox"
        checked={settings.notifications}
        onChange={(e) => onUpdate({ notifications: e.target.checked })}
      />
    </form>
  );
}
```

## جمع كل ذلك معًا: خُطّاف آمن النوع لجلب البيانات

لنجمع كل هذه التقنيات في مثال عملي — خُطّاف لجلب البيانات يتكيّف مع استجابات API المختلفة:

```typescript
// Configuration for different API endpoints
const apiEndpoints = {
  users: { url: '/api/users', method: 'GET' },
  user: { url: '/api/user/:id', method: 'GET' },
  createUser: { url: '/api/users', method: 'POST' },
} as const satisfies Record<string, { url: string; method: string }>;

type ApiEndpoint = keyof typeof apiEndpoints;

// Response types for each endpoint
type ApiResponses = {
  users: User[];
  user: User;
  createUser: { success: boolean; user: User };
};

// Conditional type for hook parameters
type UseApiParams<T extends ApiEndpoint> = T extends 'user'
  ? { endpoint: T; id: string }
  : T extends 'createUser'
    ? { endpoint: T; data: Omit<User, 'id'> }
    : { endpoint: T };

// The hook with full type safety
function useApi<T extends ApiEndpoint>(
  params: UseApiParams<T>,
): {
  data: ApiResponses[T] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<ApiResponses[T] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Build URL and make request based on endpoint config
      const config = apiEndpoints[params.endpoint];
      let url = config.url;

      if ('id' in params) {
        url = url.replace(':id', params.id);
      }

      const response = await fetch(url, {
        method: config.method,
        body: 'data' in params ? JSON.stringify(params.data) : undefined,
      });

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Usage with full type inference:
function UserList() {
  const { data, loading } = useApi({ endpoint: 'users' });
  // data is User[] | null

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}

function UserDetail({ userId }: { userId: string }) {
  const { data, loading } = useApi({ endpoint: 'user', id: userId });
  // data is User | null, and TypeScript enforced that we provided id

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>User not found</div>;

  return <UserProfile {...data} />;
}
```

## الأخطاء الشائعة وكيف تتجنّبها

### لا تُعقّد الأمور في البداية

ابدأ بأنواع بسيطة وأضف التعقيد فقط حين تحتاجه:

```typescript
// ❌ Overengineered from the start
type ButtonProps<
  T extends 'button' | 'link',
  V extends 'primary' | 'secondary',
  S extends 'sm' | 'md' | 'lg',
> = {
  variant: V;
  size: S;
} & (T extends 'link' ? LinkProps : ButtonHTMLAttributes<HTMLButtonElement>);

// ✅ Start simple, add complexity when needed
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

### انتبه للتداخل المفرط

تصبح الأنواع الشرطية المتداخلة بعمق صعبة في التنقيح:

```typescript
// ❌ Hard to understand and maintain
type ComplexType<T> = T extends string
  ? T extends `${infer Start}:${infer End}`
    ? Start extends 'user'
      ? { userAction: End }
      : End extends 'admin'
        ? { adminAction: Start }
        : never
    : never
  : never;

// ✅ Break it down into smaller, composable types
type ActionPrefix = 'user' | 'admin';
type ActionType<T extends string> = T extends `${ActionPrefix}:${infer Action}` ? Action : never;
```

### اعتبارات الأداء

يمكن للأنواع المعقّدة أن تُبطئ تصريف TypeScript. فإذا لاحظت بطئًا في فحص الأنواع:

- استخدم أنواعًا أبسط في التطوير، وأضف التعقيد فقط عند الحاجة
- فكّر في استخدام `any` أو `unknown` لواجهات API الخارجية المتداخلة بعمق
- قسّم الأنواع المعقّدة إلى أجزاء أصغر قابلة لإعادة الاستخدام

## إلى أين ننتقل من هنا

تفتح حِيَل الأنواع المتقدّمة هذه قدرات كثيرة، لكنها أدوات لا أهداف. فركّز على استخدامها لحلّ مشكلات حقيقية:

1. **ابدأ بـ `satisfies`** لكائنات الإعداد التي تحتاج فيها إلى التحقّق والأنواع المحدّدة معًا
2. **استخدم تأكيدات const** لواجهات المكوّنات ذات الخيارات المحدّدة
3. **جرّب الأنواع الشرطية** حين تحتاج مكوّنات تتكيّف بناءً على خصائصها
4. **جرّب الأنواع المُسقطة** في النماذج وأنماط تحويل البيانات

أفضل ما في TypeScript هو أنّه يبدو غير مرئي وهو يعمل — فهو يلتقط أخطاءك دون أن يعترض طريقك. وتقنياتك هذه تساعدك على بناء تلك التجربة.

في مشروعك القادم، جرّب أن تختار أحد هذه الأنماط وتطبّقه في مكوّن تعمل عليه بالفعل. وستندهش كم يصير تطويرك بـ React أكثر أمانًا ومتعةً حين يعمل TypeScript معك لا ضدّك.
