---
title: "أنواع الأدوات في التطبيق العملي"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/utility-types-in-practice"
---

أنواع أدوات TypeScript ليست مجرّد بنيات أكاديميّة فاخرة — إنها أدوات عملية لبناء مكوّنات React أنظف وأسهل في الصيانة. فاستخدامها بعناية يُمكِّن `Partial` و`Pick` و`Omit` و`Record` من تحويل واجهات خصائص فوضوية وإدارة حالة معقّدة إلى واجهات أنيقة آمنة من حيث الأنواع تجعل العمل مع مكوّناتك متعةً.

لنستكشف كيف تحلّ أنواع الأدوات هذه مشكلات العالم الحقيقي™ في تطبيقات React، من تبسيط تحديثات الحالة إلى إنشاء واجهات مكوّنات مرنة دون شيفرة متكرّرة.

## المشكلة مع الأنواع الجامدة

تأمّل هذا المشهد الشائع: أنت تبني نموذج ملف تعريف مستخدم يحتاج إلى التعامل مع تحديثات جزئية. ودون أنواع الأدوات، قد تنتهي إلى فوضى كهذه:

```typescript
// ❌ Brittle and verbose
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

interface UserUpdateProps {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: 'admin' | 'user';
  // createdAt intentionally omitted - shouldn't be updatable
}

function ProfileForm({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate: (updates: UserUpdateProps) => void;
}) {
  // Component implementation...
}
```

ولهذا النهج عدّة مشكلات:

- **التكرار**: أنت تحافظ على الحقول نفسها في مواضع متعدّدة
- **خطر الانحراف**: حين يتغيّر `User`، قد تنسى تحديث `UserUpdateProps`
- **الاستثناءات اليدوية**: عليك أن تتذكّر أيّ الحقول لا يجوز تحديثها

## ولأنواع الأدوات موضعها

تحلّ أنواع الأدوات هذه المشكلات عبر تحويل الأنواع القائمة بدلًا من تكرارها. وإليك المثال نفسه بعد التنظيف:

```typescript
// ✅ Clean and maintainable
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Derive types instead of duplicating them
type UserUpdate = Partial<Pick<User, 'name' | 'email' | 'avatar' | 'role'>>;

function ProfileForm({ user, onUpdate }: { user: User; onUpdate: (updates: UserUpdate) => void }) {
  // Component implementation...
}
```

أصبح لديك الآن مصدر واحد موثوق لشكل المستخدم، ويبقى نوع التحديث لديك متزامنًا معه تلقائيًا.

## Partial: جعل كل شيء اختياريًا

يجعل `Partial<T>` جميع الخصائص في `T` اختيارية، وهو مثالي لتحديثات الحالة وكائنات الإعداد.

### تحديثات الحالة بتصميم بسيط

```typescript
interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function useFormState(initialState: FormState) {
  const [state, setState] = useState<FormState>(initialState);

  // ✅ Accept partial updates without defining a separate interface
  const updateState = (updates: Partial<FormState>) => {
    setState((current) => ({ ...current, ...updates }));
  };

  return { state, updateState };
}

// Usage is clean and type-safe
const { state, updateState } = useFormState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// All of these work:
updateState({ name: 'Alice' });
updateState({ email: 'alice@example.com', password: 'secret' });
updateState({ confirmPassword: 'secret' });
```

### كائنات الإعداد

يتألّق `Partial` عند بناء واجهات إعدادات مرنة:

```typescript
interface ChartConfig {
  width: number;
  height: number;
  backgroundColor: string;
  showLegend: boolean;
  animationDuration: number;
}

const defaultConfig: ChartConfig = {
  width: 800,
  height: 400,
  backgroundColor: '#ffffff',
  showLegend: true,
  animationDuration: 300
};

function Chart({ config = {} }: { config?: Partial<ChartConfig> }) {
  const finalConfig = { ...defaultConfig, ...config };

  return (
    <div
      style={{
        width: finalConfig.width,
        height: finalConfig.height,
        backgroundColor: finalConfig.backgroundColor
      }}
    >
      {/* Chart implementation */}
    </div>
  );
}

// Usage is flexible and self-documenting
<Chart config={{ width: 600, showLegend: false }} />
```

## Pick: اختيار ما تحتاجه

ينشئ `Pick<T, K>` نوعًا جديدًا عبر انتقاء الخصائص المحدّدة فقط من `T`. وهو مثالي لخصائص المكوّنات التي تحتاج مجرّد مجموعة جزئية من واجهة أكبر.

### مكوّنات البطاقات ببيانات مرنة

```typescript
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  tags: string[];
  readTime: number;
}

// ✅ Different components need different slices of the same data
function ArticleCard({ article }: {
  article: Pick<Article, 'title' | 'excerpt' | 'author' | 'publishedAt'>
}) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="meta">
        <span>{article.author.name}</span>
        <time>{article.publishedAt.toLocaleDateString()}</time>
      </div>
    </div>
  );
}

function ArticlePreview({ article }: {
  article: Pick<Article, 'title' | 'readTime' | 'tags'>
}) {
  return (
    <div className="article-preview">
      <h4>{article.title}</h4>
      <div className="tags">
        {article.tags.map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <span className="read-time">{article.readTime} min read</span>
    </div>
  );
}
```

### مكوّنات حقول النماذج

ممتاز `Pick` لإنشاء مكوّنات نماذج قابلة لإعادة الاستخدام تعمل مع أشكال بيانات مختلفة:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: Date;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// ✅ Generic name field that works with any object that has a name
function NameField<T extends { name: string }>({
  item,
  onChange
}: {
  item: Pick<T, 'name'>;
  onChange: (name: string) => void;
}) {
  return (
    <input
      type="text"
      value={item.name}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter name"
    />
  );
}

// Works with both User and Product
<NameField item={user} onChange={(name) => updateUser({ name })} />
<NameField item={product} onChange={(name) => updateProduct({ name })} />
```

## Omit: استبعاد ما لا تريده

ينشئ `Omit<T, K>` نوعًا جديدًا عبر استبعاد الخصائص المحدّدة من `T`. وهو عكس `Pick` ومثالي لإنشاء واجهات عامة انطلاقًا من أنواع داخلية.

### خصائص المكوّنات العامة مقابل الخاصة

```typescript
interface InternalButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  // Internal props that consumers shouldn't set
  _testId?: string;
  _analyticsEvent?: string;
}

// ✅ Clean public API that hides internal concerns
export type ButtonProps = Omit<InternalButtonProps, '_testId' | '_analyticsEvent'>;

export function Button(props: ButtonProps) {
  const internalProps: InternalButtonProps = {
    ...props,
    _testId: `button-${props.variant}`,
    _analyticsEvent: `button_click_${props.variant}`
  };

  // Implementation uses internal props
  return <button {...internalProps} />;
}
```

### إزالة الخصائص المتعارضة

أحيانًا تحتاج إلى تغليف عنصر أصلي لكن مع التحكّم في سلوكيات معيّنة:

```typescript
// ✅ Input that manages its own value but accepts all other input props
interface ControlledInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  value: string;
  onChange: (value: string) => void;
}

function ControlledInput({ value, onChange, ...inputProps }: ControlledInputProps) {
  return (
    <input
      {...inputProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// TypeScript prevents you from passing conflicting props
<ControlledInput
  value={inputValue}
  onChange={setInputValue}
  placeholder="Type here..."
  // value={someOtherValue}  // ❌ TypeScript error - good!
/>
```

## Record: إنشاء أنواع الفهرسة

ينشئ `Record<K, T>` نوع كائن بمفاتيح من النوع `K` وقيم من النوع `T`. وهو مثالي للقاموس وجداول البحث والحالة التي تُفهرَس بقيم ديناميكية.

### حالة نموذج ديناميكية

```typescript
// ✅ Type-safe form state for dynamic fields
interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

function DynamicForm({ fieldNames }: { fieldNames: string[] }) {
  const [fields, setFields] = useState<Record<string, FormField>>(() =>
    fieldNames.reduce((acc, name) => ({
      ...acc,
      [name]: { value: '', touched: false }
    }), {})
  );

  const updateField = (name: string, updates: Partial<FormField>) => {
    setFields(current => ({
      ...current,
      [name]: { ...current[name], ...updates }
    }));
  };

  return (
    <form>
      {fieldNames.map(name => (
        <div key={name}>
          <label>{name}</label>
          <input
            value={fields[name]?.value || ''}
            onChange={(e) => updateField(name, {
              value: e.target.value,
              touched: true
            })}
          />
          {fields[name]?.error && <span>{fields[name].error}</span>}
        </div>
      ))}
    </form>
  );
}
```

### حالة المكوّنات حسب المعرّف

إدارة المجموعات التي تحتاج فيها إلى عمليات بحث سريعة بالمعرّف:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListState {
  users: Record<string, User>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

function useUserList() {
  const [state, setState] = useState<UserListState>({
    users: {},
    loading: {},
    errors: {},
  });

  const loadUser = async (id: string) => {
    setState((current) => ({
      ...current,
      loading: { ...current.loading, [id]: true },
      errors: { ...current.errors, [id]: null },
    }));

    try {
      const user = await fetchUser(id);
      setState((current) => ({
        ...current,
        users: { ...current.users, [id]: user },
        loading: { ...current.loading, [id]: false },
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: { ...current.loading, [id]: false },
        errors: { ...current.errors, [id]: error.message },
      }));
    }
  };

  return { state, loadUser };
}
```

## دمج أنواع الأدوات

القوة الحقيقية تكمن في دمج أنواع الأدوات لإنشاء الواجهات التي تحتاجها بالضبط:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Compose utility types for different use cases
type UserCreateRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UserUpdateRequest = Partial<Pick<User, 'name' | 'email' | 'role'>>;
type UserResponse = Omit<User, 'password'>;
type UserSummary = Pick<User, 'id' | 'name' | 'role'>;

// Clean, expressive component APIs
function CreateUserForm({ onSubmit }: { onSubmit: (user: UserCreateRequest) => Promise<void> }) {
  // Form implementation
}

function EditUserForm({
  user,
  onUpdate,
}: {
  user: UserResponse;
  onUpdate: (updates: UserUpdateRequest) => Promise<void>;
}) {
  // Edit form implementation
}

function UserList({ users }: { users: UserSummary[] }) {
  // List implementation
}
```

## اعتبارات الأداء

تحدث أنواع الأدوات وقت التصريف — فهي لا تضيف أي عبء في وقت التشغيل. لكن هناك أمور ينبغي إبقاءها في الحسبان:

### لا تبالغ

```typescript
// ❌ Overly complex - hard to understand and debug
type ComplexType = Partial<Pick<Omit<User, 'password'>, 'name' | 'email'>> &
  Record<string, unknown>;

// ✅ Break it down into named intermediate types
type PublicUser = Omit<User, 'password'>;
type EditableFields = Pick<PublicUser, 'name' | 'email'>;
type UserUpdate = Partial<EditableFields>;
```

### فكّر في الأسماء المستعارة (type aliases)

للتوليفات المستخدَمة كثيرًا، أنشئ أسماءً مستعارة مسمّاة:

```typescript
// ✅ Clear, reusable type aliases
type CreateRequest<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateRequest<T> = Partial<Pick<T, keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>>>;

type UserCreate = CreateRequest<User>;
type UserUpdate = UpdateRequest<User>;
type ProductCreate = CreateRequest<Product>;
type ProductUpdate = UpdateRequest<Product>;
```

## متى لا تستخدم أنواع الأدوات

ليست أنواع الأدوات هي الحلّ دائمًا. أحيانًا تكون الواجهات الصريحة أوضح:

```typescript
// ❌ Over-engineered for a simple case
type ButtonProps = Pick<React.HTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'> & {
  children: React.ReactNode;
};

// ✅ Just be explicit when it's simple
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

استخدم أنواع الأدوات حين تقضي على التكرار أو تعبّر عن علاقات بين الأنواع. واستخدم الواجهات الصريحة حين يكون النوع بسيطًا أو حين يتفوّق الوضوح على الذكاء.

## أنماط شائعة ومَطبّات

### الدمج مع الأنواع العامة

تعمل أنواع الأدوات بسلاسة مع المكوّنات ذات الأنواع العامة:

```typescript
interface ApiResource {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends ApiResource {
  name: string;
  email: string;
}

interface Product extends ApiResource {
  name: string;
  price: number;
}

// ✅ Generic CRUD component that works with any resource
function ResourceForm<T extends ApiResource>({
  resource,
  onUpdate,
}: {
  resource?: T;
  onUpdate: (data: Omit<T, keyof ApiResource>) => void;
}) {
  // Form handles any resource type safely
}
```

### انتبه لتسرّب `any`

```typescript
// ❌ Record with any loses type safety
const state: Record<string, any> = {};

// ✅ Be specific about what you're storing
const state: Record<string, { value: string; error?: string }> = {};
```

## خلاصة

تغيّر أنواع الأدوات طريقة تفكيرك في واجهات المكوّنات في React. فبدلًا من تكرار الواجهات أو إنشاء أنواع خصائص متساهلة أكثر من اللازم، يمكنك اشتقاق ما تحتاجه بالضبط من أشكال بياناتك الأساسية.

المفتاح هو استخدامها بوعي استراتيجي:

- **`Partial`** للتحديثات الاختيارية والإعدادات المرنة
- **`Pick`** حين تحتاج المكوّنات أجزاء محدّدة من أنواع أكبر
- **`Omit`** لإنشاء واجهات عامة نظيفة انطلاقًا من الأنواع الداخلية
- **`Record`** لبنية البيانات الديناميكية المُفهرَسة

ابدأ ببساطة، وركّب بعناية، وأعطِ الأولوية دائمًا للوضوح على الذكاء. وسيشكرك نفسك في المستقبل (وزملاؤك) على واجهات تعبّر عن النية بوضوح وتبقى متزامنة تلقائيًا.

**التالي**: [حِيَل الأنواع المتقدّمة في React](https://stevekinney.com/courses/react-typescript/advanced-type-tricks-for-react)
