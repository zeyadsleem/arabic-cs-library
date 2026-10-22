---
title: "خصائص مكوّنات React"
---

الخصائص هي واجهة البرمجة (API) لمكوّنات React — فهي الطريقة التي سيتفاعل بها المطوّرون الآخرون (ومنهم أنت في المستقبل) مع ما بنيته. والحصول على الأنواع الصحيحة ليس مجرد تجنّب أخطاء وقت التشغيل، بل هو إنشاء مكوّنات سهلة الاستخدام، تشرح نفسها، ولا يمكن إساءة استخدامها.

أنواع الخصائص الجيدة تحكي قصة عن كيفية استخدام المكوّن. فهي تجعل المسار السعيد واضحًا والمسار الخاطئ مستحيلًا. ويغطي هذا الدليل كل شيء من أنماط الخصائص الأساسية إلى تقنيات الأنواع المتقدمة التي تصنع تجارب مطوّرين ممتعة.

## الأساس: الخصائص المطلوبة مقابل الاختيارية

أهم قرار يخص أي خاصية هو: هل هي مطلوبة أم اختيارية؟ يجعل TypeScript هذا التمييز صريحًا، ويستحق التفكير الجاد في ضرورة كل خاصية.

```typescript
interface ButtonProps {
  // Required props - must be provided
  children: React.ReactNode;
  onClick: () => void;

  // Optional props - can be omitted
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// ✅ Good - required props are provided
<Button onClick={() => alert('clicked')}>
  Click me
</Button>

// ❌ Bad - TypeScript error: missing required 'onClick'
<Button>
  Click me
</Button>
```

قاعدة الإبهام: اجعل الخصائص مطلوبة حين لا يستطيع المكوّن أن يعمل بدونها فعلًا. وكل ما عدا ذلك ينبغي أن يكون اختياريًا مع قيم افتراضية مناسبة.

> **نصيحة**
>
> إذا وجدت نفسك أمام كثير من الخصائص المطلوبة، فكّر فيما إذا كان مكوّنك يحاول أن يفعل أكثر مما ينبغي. أحيانًا يقسّم المكوّن إلى مكوّنات أصغر محدّدة الغرض يخلق واجهة برمجية أفضل.

## توفير قيم افتراضية مناسبة

يجري سحب `defaultProps` من React لصالح معاملات ES6 الافتراضية وقيم التفكيك الافتراضية. وهذا الأسلوب أكثر ملاءمة لـ TypeScript ويُبقي قيمك الافتراضية قريبة من مواضع استخدامها.

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'medium',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size}`}
    >
      {children}
    </button>
  );
}
```

لهذا النمط عدة مزايا:

- **أمان الأنواع**: يعرف TypeScript قيمك الافتراضية وقت الترجمة (compilation)
- **القرب**: تظهر القيم الافتراضية في المكان نفسه الذي يُعرَّف فيه المكوّن
- **الأداء**: لا دمج إضافي للخصائص وقت التشغيل
- **المستقبلية**: تعمل مع مُجمِّع React (React's Compiler) والتحسينات الأخرى

## خصائص الأنواع الأولية: لبنات البناء

يبدأ كل مكوّن React بخصائص من الأنواع الأولية — نصوصًا وأرقامًا وقيمًا منطقية. هذه هي خبزك وخيرك، لكن حتى الأنواع الأولية البسيطة تستفيد من كتابة أنواع بعناية:

```typescript
interface AlertProps {
  // String literals are often better than plain strings
  variant: 'success' | 'warning' | 'error' | 'info';

  // Numbers with constraints tell a story
  timeout?: number; // milliseconds

  // Booleans for toggles and states
  dismissible?: boolean;

  // Sometimes strings need constraints too
  title: string;
}

function Alert({
  variant,
  timeout = 5000,
  dismissible = true,
  title
}: AlertProps) {
  // TypeScript knows variant is one of four specific strings
  const iconName = variant === 'success' ? 'check' : 'alert';

  return (
    <div className={`alert alert--${variant}`}>
      <h3>{title}</h3>
      {dismissible && <button>×</button>}
    </div>
  );
}
```

## خصائص المصفوفات: المجموعات والقوائم

المصفوفات في كل مكان في React — قوائم عناصر ومجموعات خيارات ومجموعات بيانات. والمفتاح هو كتابة نوع بنية المصفوفة ومحتوياتها بدقّة:

```typescript
// Simple array of primitives
interface TagListProps {
  tags: string[];
}

// Array of objects with consistent shape
interface UserListProps {
  users: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }[];
}

// Array with discriminated unions
interface NotificationProps {
  notifications: Array<
    | { type: 'message'; content: string; sender: string }
    | { type: 'system'; content: string; level: 'info' | 'warning' }
    | { type: 'error'; content: string; code?: string }
  >;
}

function NotificationList({ notifications }: NotificationProps) {
  return (
    <div>
      {notifications.map((notification, index) => {
        // TypeScript knows the shape based on the type discriminant
        if (notification.type === 'message') {
          return (
            <div key={index} className="notification--message">
              <strong>{notification.sender}:</strong> {notification.content}
            </div>
          );
        }

        if (notification.type === 'system') {
          return (
            <div key={index} className={`notification--${notification.level}`}>
              {notification.content}
            </div>
          );
        }

        // Must be error type
        return (
          <div key={index} className="notification--error">
            Error {notification.code}: {notification.content}
          </div>
        );
      })}
    </div>
  );
}
```

## خصائص الكائنات: بنى بيانات معقّدة

تتطلب خصائص الكائنات تفكيرًا دقيقًا. أحيانًا تحتاج إلى بنى صارمة، وأحيانًا أخرى تكون المرونة هي المفتاح:

```typescript
// Strict object shape
interface ConfigProps {
  settings: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}

// Flexible with index signatures
interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    width?: number;
  }>;
  // Flexible row data
  data: Array<{
    id: string | number;
    [key: string]: any; // Allow any additional properties
  }>;
}

// Nested with optional properties
interface FormProps {
  initialValues: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      address?: {
        street: string;
        city: string;
        country: string;
        postalCode?: string;
      };
    };
  };
}
```

## خصائص الدوال: الاستدعاءات ومعالِجات الأحداث

الدوال المستخدَمة كخصائص تحتاج إلى كتابة أنواع دقيقة لضمان أمان الأنواع لكل من المعاملات وقيم العائد:

```typescript
interface SearchProps {
  // Simple callback
  onSearch: (query: string) => void;

  // Async callback with error handling
  onSubmit: (query: string) => Promise<void>;

  // Callback with multiple parameters
  onFilter: (category: string, tags: string[]) => void;

  // Optional callback with event
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Callback that returns a value
  validator?: (value: string) => string | undefined; // Returns error message
}

function Search({ onSearch, onSubmit, onChange }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(query);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e); // Optional chaining for optional callback
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

## خصائص شرطية مع الأنواع الاتحادية المُميَّزة

أحيانًا تعتمد الخصائص على بعضها — فحين تكون خاصية موجودة تصبح أخرى مطلوبة أو ممنوعة. وتساعد الأنواع الاتحادية المُميَّزة (discriminated unions) على نمذجة هذه العلاقات بدقّة:

```typescript
type ButtonProps = {
  children: React.ReactNode;
} & (
  | {
      variant: 'button';
      onClick: () => void;
      disabled?: boolean;
    }
  | {
      variant: 'link';
      href: string;
      target?: '_blank' | '_self';
    }
  | {
      variant: 'submit';
      form?: string;
      disabled?: boolean;
    }
);

function Button(props: ButtonProps) {
  const { children } = props;

  switch (props.variant) {
    case 'button':
      return (
        <button onClick={props.onClick} disabled={props.disabled}>
          {children}
        </button>
      );

    case 'link':
      return (
        <a href={props.href} target={props.target}>
          {children}
        </a>
      );

    case 'submit':
      return (
        <button type="submit" form={props.form} disabled={props.disabled}>
          {children}
        </button>
      );
  }
}

// TypeScript ensures correct prop combinations
<Button variant="button" onClick={() => {}}>Click</Button>
<Button variant="link" href="/home">Home</Button>
<Button variant="submit" form="myForm">Submit</Button>
```

## الخصائص العامة للمكوّنات القابلة لإعادة الاستخدام

تجعل الأنواع العامة المكوّنات قابلة لإعادة الاستخدام حقًا مع الحفاظ على أمان الأنواع:

````typescript
interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  placeholder?: string;
}

## Generic TextField with Typed onChange

Create a `TextField` that accepts `value`/`defaultValue` generically and narrows `onChange` to the right event based on the underlying element.

```tsx
type TextFieldAs = 'input' | 'textarea';

type TextFieldCommon = {
  label: string;
  error?: string;
  as?: TextFieldAs;
};

type InputFieldProps = TextFieldCommon & Omit<JSX.IntrinsicElements['input'], 'onChange'> & {
  as?: 'input';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TextareaFieldProps = TextFieldCommon & Omit<JSX.IntrinsicElements['textarea'], 'onChange'> & {
  as: 'textarea';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type TextFieldProps = InputFieldProps | TextareaFieldProps;

export function TextField(props: TextFieldProps) {
  const { label, error, as = 'input', ...rest } = props as TextFieldProps & { as: TextFieldAs };

  return (
    <label className={`text-field ${error ? 'has-error' : ''}`}>
      <span className="label">{label}</span>
      {as === 'textarea' ? (
        <textarea {...(rest as TextareaFieldProps)} />
      ) : (
        <input {...(rest as InputFieldProps)} />
      )}
      {error && <span className="error">{error}</span>}
    </label>
  );
}

// Usage with correct event narrowing
<TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
<TextField as="textarea" label="Bio" defaultValue={bio} onChange={(e) => setBio(e.target.value)} />

function Select<T>({
options,
value,
onChange,
getLabel,
getValue,
placeholder = 'Select an option'
}: SelectProps<T>) {
return (
<select
value={value ? getValue(value) : ''}
onChange={(e) => {
const selected = options.find(
opt => String(getValue(opt)) === e.target.value
);
if (selected) onChange(selected);
}} >
<option value="">{placeholder}</option>
{options.map((option, index) => (
<option key={index} value={getValue(option)}>
{getLabel(option)}
</option>
))}
</select>
);
}

// Type-safe usage with different types
interface User {
id: number;
name: string;
email: string;
}

<Select<User>
options={users}
value={selectedUser}
onChange={setSelectedUser}
getLabel={(user) => user.name}
getValue={(user) => user.id}
/>

<Select<string>
options={['Red', 'Green', 'Blue']}
value={color}
onChange={setColor}
getLabel={(c) => c}
getValue={(c) => c}
/>
````

## توسيع خصائص عناصر HTML

كثيرًا ما تريد لمكوّناتك أن تقبل كل سمات HTML القياسية إضافة إلى خصائصك المخصّصة:

```typescript
// Extending button props
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

function CustomButton({
  variant = 'primary',
  loading,
  children,
  disabled,
  ...rest
}: CustomButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

// Omitting specific HTML props
interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  type?: 'text' | 'email' | 'password'; // Restrict to specific types
  onChange: (value: string) => void; // Simplify onChange signature
}

function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

## أنواع المساعدات المدمجة في React

يوفّر React عدة أنواع مساعِدة تزيل التكرار وتجعّل خصائص مكوّناتك أكثر تعبيرًا. وتتعامل هذه المساعدات مع أنماط شائعة يمرّ بها كل مطوّر React، من إضافة خاصية العناصر الفرعية إلى إدارة المراجع (refs).

### PropsWithChildren: مساعد العناصر الفرعية

هل مللت من إضافة `children` يدويًا إلى كل مكوّن حاوٍ؟ فـ `PropsWithChildren` يغطّي ظهرك:

```typescript
import { PropsWithChildren } from 'react';

// ❌ The old way: manually adding children
interface CardProps {
  title: string;
  variant?: 'default' | 'highlighted';
  children?: React.ReactNode;
}

// ✅ The clean way: using PropsWithChildren
interface CardProps {
  title: string;
  variant?: 'default' | 'highlighted';
}

function Card({ title, variant = 'default', children }: PropsWithChildren<CardProps>) {
  return (
    <div className={`card card--${variant}`}>
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}
```

«PropsWithChildren» مطابق تمامًا لإضافة `children?: ReactNode` إلى خصائصك:

```typescript
// These are identical:
type WithChildrenManual = CardProps & { children?: ReactNode };
type WithChildrenHelper = PropsWithChildren<CardProps>;

// The actual implementation is simple:
type PropsWithChildren<P> = P & { children?: ReactNode };
```

استخدم `PropsWithChildren` حين:

- كان مكوّنك حاوية تلفّ محتوى آخر
- أردت كتابة نوع موحّد للعناصر الفرعية في كامل شيفرتك
- كنت تبني مكوّنات تخطيط أو التفاف

### PropsWithoutChildren: الورقة الصريحة

أحيانًا تحتاج إلى أن تكون صريحًا بأنه لا ينبغي أن يكون لمكوّنك عناصر فرعية. ورغم ندرة استخدامها مباشرة، فإن `PropsWithoutChildren` يجعل نيتك واضحة:

```typescript
import { PropsWithoutChildren } from 'react';

// Components that should never have children
type InputProps = PropsWithoutChildren<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}>;

function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// ❌ TypeScript error if someone tries to add children
<Input value="test" onChange={setValue}>
  This will cause a type error!
</Input>
```

القوة الحقيقية لـ `PropsWithoutChildren` تظهر عند بناء أدوات الأنواع:

```typescript
// Creating a type helper that strips children from any props
type LeafComponent<P> = React.FC<PropsWithoutChildren<P>>;

// Now you can create leaf components with guaranteed no children
const StatusBadge: LeafComponent<{ status: 'online' | 'offline' }> = ({ status }) => {
  return <span className={`badge badge--${status}`}>{status}</span>;
};
```

### RefAttributes: مراجع آمنة من ناحية الأنواع

حين تحتاج إلى إتاحة المراجع من مكوّناتك، توفّر `RefAttributes` الكتابة الصحيحة:

```typescript
import { forwardRef, RefAttributes } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// RefAttributes adds the optional ref prop with proper typing
type ButtonPropsWithRef = ButtonProps & RefAttributes<HTMLButtonElement>;

// Using with forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', onClick, children }, ref) => {
    return (
      <button ref={ref} className={`btn btn--${variant}`} onClick={onClick}>
        {children}
      </button>
    );
  }
);

// The ref is properly typed
function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={buttonRef}
      onClick={() => buttonRef.current?.focus()}
    >
      Focus me!
    </Button>
  );
}
```

«RefAttributes» مفيدة بشكل خاص عند تركيب أنواع خصائص معقّدة:

```typescript
// Combining multiple type helpers
type CompleteButtonProps = PropsWithChildren<
  ButtonProps & RefAttributes<HTMLButtonElement>
>;

// For function components that accept refs
interface FancyInputProps extends RefAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FancyInput = forwardRef<HTMLInputElement, FancyInputProps>(
  ({ label, error }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} className={error ? 'error' : ''} />
        {error && <span>{error}</span>}
      </div>
    );
  }
);
```

### دمج أنواع المساعدين: أنماط من العالم الحقيقي

تتألق أنواع المساعدين عند دمجها لإنشاء أنماط خصائص تعبيرية وقابلة لإعادة الاستخدام:

```typescript
// A card component that needs children and refs
interface CardBaseProps {
  title: string;
  footer?: ReactNode;
}

type CardProps = PropsWithChildren<CardBaseProps> & RefAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, footer, children }, ref) => {
    return (
      <div ref={ref} className="card">
        <header>{title}</header>
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    );
  }
);

// A form field that explicitly has no children
type FieldProps = PropsWithoutChildren<{
  name: string;
  value: string;
  onChange: (value: string) => void;
}> & RefAttributes<HTMLInputElement>;

// A layout component with optional children
interface LayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
}

function Layout({ sidebar, header, children }: PropsWithChildren<LayoutProps>) {
  return (
    <div className="layout">
      {header && <header>{header}</header>}
      <div className="layout-body">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{children}</main>
      </div>
    </div>
  );
}
```

### أنواع المساعدين مقابل التعريفات اليدوية

متى ينبغي أن تستخدم هذه المساعدات بدلًا من تعريف الخصائص يدويًا؟

```typescript
// ✅ Use PropsWithChildren for consistency
interface ContainerProps {
  className?: string;
}
function Container({ className, children }: PropsWithChildren<ContainerProps>) {
  return <div className={className}>{children}</div>;
}

// ✅ Define manually when children need special typing
interface ListProps {
  children: ReactElement<ItemProps>[] | ReactElement<ItemProps>;
  ordered?: boolean;
}

// ✅ Use RefAttributes for standard ref forwarding
const Input = forwardRef<HTMLInputElement, InputProps & RefAttributes<HTMLInputElement>>(
  (props, ref) => <input ref={ref} {...props} />
);

// ✅ Define manually for custom ref-like props
interface VideoPlayerProps {
  videoRef?: RefObject<HTMLVideoElement>;
  controlsRef?: RefObject<VideoControls>;
}
```

> **نصيحة**
>
> هذه الأنواع المساعدة تتعلق بالوضوح والاتساق. فهي تجعل شيفرتك أكثر قابلية للقراءة عبر التعبير الصريح عن النية — فالمكوّن إما أن يتوقّع عناصر فرعية أو لا يتوقّعها، وإما أن يمرّر المراجع أو لا يمرّرها. استخدمها لجعل واجهات مكوّناتك أكثر قابلية للتنبّؤ.

## توثيق الخصائص عبر JSDoc

أنواع TypeScript هي توثيق بحد ذاتها، لكنك أحيانًا تحتاج إلى سياق أكثر:

```typescript
interface ChartProps {
  /**
   * Data points to display in the chart
   * @example
   * [
   *   { x: 0, y: 10 },
   *   { x: 1, y: 20 }
   * ]
   */
  data: Array<{ x: number; y: number }>;

  /**
   * Chart dimensions in pixels
   * @default { width: 600, height: 400 }
   */
  size?: {
    width: number;
    height: number;
  };

  /**
   * Enable interactive tooltips
   * @default true
   */
  interactive?: boolean;

  /**
   * Callback fired when a data point is clicked
   * @param point - The clicked data point
   * @param index - Index of the point in the data array
   */
  onPointClick?: (point: { x: number; y: number }, index: number) => void;
}
```

## الأنماط الشائعة والأنماط المضادة

### ✅ الأنماط الجيدة

```typescript
// Use string literals for known values
type Size = 'small' | 'medium' | 'large';

// Make impossible states impossible
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Group related props
interface FormFieldProps {
  field: {
    name: string;
    value: string;
    error?: string;
  };
  label: string;
  required?: boolean;
}
```

### ❌ الأنماط المضادة التي ينبغي تجنّبها

```typescript
// Don't use 'any' for props
interface BadProps {
  data: any; // ❌ No type safety
}

// Don't make everything optional
interface TooFlexible {
  title?: string;
  content?: string;
  onClick?: () => void;
  // Component can't function without any props!
}

// Don't use boolean flags for multiple states
interface ConfusingStates {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  // These can conflict!
}
```

## أفضل الممارسات

1. **ابدأ صارمًا، وارخِ متى لزم**: ابدأ بأنواع صارمة ولا تليّنها إلا حين تكون المرونة مطلوبة فعلًا
2. **استخدم الأنواع الاتحادية المُميَّزة للخصائص المتبادلة الحصرية**: نمذج مجال عملك بدقّة
3. **وفّر قيمًا افتراضية للخصائص الاختيارية**: اجعل الحالة الشائعة سهلة
4. **وثّق الخصائص المعقّدة**: استخدم تعليقات JSDoc لتوفير سياق إضافي
5. **أبقِ الخصائص مسطّحة قدر الإمكان**: الخصائص المتداخلة بعمق أصعب في الاستخدام
6. **استخدم الأنواع العامة للمكوّنات القابلة لإعادة الاستخدام حقًا**: لكن لا تُفرط في تعقيد التصميم
