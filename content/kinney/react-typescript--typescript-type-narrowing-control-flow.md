---
title: "تضييق الأنواع وتحليل تدفّق التحكم"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/typescript-type-narrowing-control-flow"
---

يمتلك TypeScript قدرة مذهلة على فهم منطق شيفرتك وتضييق الأنواع بناءً على الفحوص التي تجريها. فهو كمساعد ذكي جدًا يتابعك أثناء كتابة الشروط ويساعدك على ضمان سلامة الأنواع. ولنتعمّق في كيفية جعل تحليل تدفّق التحكم في TypeScript لشيفرة React أكثر أمانًا وقابلية للتنبؤ.

## ما هو تضييق الأنواع؟

تضييق الأنواع هو أن يصقل TypeScript نوعًا ليصبح أكثر تحديدًا بناءً على تدفّق التحكم في الشيفرة. فكّر فيه كأن TypeScript يتتبّع منطقك:

```typescript
function processValue(value: string | number) {
  // Here, value is string | number

  if (typeof value === 'string') {
    // Here, TypeScript knows value is string
    console.log(value.toUpperCase());
  } else {
    // Here, TypeScript knows value is number
    console.log(value.toFixed(2));
  }
}
```

## حرّاس الأنواع: أدواتك للتضييق

### حرّاس الأنواع عبر typeof

معامل `typeof` هو خط دفاعك الأول أمام الأنواع الأولية:

```typescript
function formatValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    // value is string
    return value.trim();
  }

  if (typeof value === 'number') {
    // value is number
    return value.toLocaleString();
  }

  // value is boolean
  return value ? 'Yes' : 'No';
}

// In React components
const DisplayValue = ({ value }: { value: string | number | null }) => {
  if (typeof value === 'string') {
    return <span className="text-value">{value}</span>;
  }

  if (typeof value === 'number') {
    return <span className="number-value">{value.toFixed(2)}</span>;
  }

  return <span className="null-value">No value</span>;
};
```

### حرّاس الأنواع عبر instanceof

للنسخ الخارجة من الأصناف وللكائنات المدمجة:

```typescript
class ValidationError extends Error {
  field: string;

  constructor(field: string, message: string) {
    super(message);
    this.field = field;
  }
}

function handleError(error: Error | ValidationError) {
  if (error instanceof ValidationError) {
    // error is ValidationError
    console.log(`Field ${error.field}: ${error.message}`);
  } else {
    // error is Error
    console.log(`General error: ${error.message}`);
  }
}

// Works with built-in types too
function processDate(value: Date | string) {
  if (value instanceof Date) {
    // value is Date
    return value.toISOString();
  }

  // value is string
  return new Date(value).toISOString();
}
```

### حرّاس الأنواع عبر المعامل in

تحقّق من وجود الخاصية لتضييق أنواع الكائنات:

```typescript
interface Car {
  drive(): void;
  wheels: number;
}

interface Boat {
  sail(): void;
  rudder: boolean;
}

function operateVehicle(vehicle: Car | Boat) {
  if ('wheels' in vehicle) {
    // vehicle is Car
    vehicle.drive();
    console.log(`Car has ${vehicle.wheels} wheels`);
  } else {
    // vehicle is Boat
    vehicle.sail();
    console.log(`Boat rudder: ${vehicle.rudder}`);
  }
}

// React example
interface TextProps {
  text: string;
  maxLength?: number;
}

interface ComponentProps {
  component: React.ComponentType;
  props?: Record<string, any>;
}

const DynamicRender = (props: TextProps | ComponentProps) => {
  if ('text' in props) {
    // props is TextProps
    const displayText = props.maxLength
      ? props.text.slice(0, props.maxLength)
      : props.text;
    return <p>{displayText}</p>;
  }

  // props is ComponentProps
  const Component = props.component;
  return <Component {...props.props} />;
};
```

## التضييق بالصحّة (truthiness)

يفهم TypeScript صحّة القيم في JavaScript:

```typescript
function processUser(user: User | null | undefined) {
  if (!user) {
    // user is null | undefined
    return 'No user';
  }

  // user is User
  return `Hello, ${user.name}`;
}

// More specific checks
function handleValue(value: string | null | undefined | '') {
  if (value) {
    // value is string (and not empty)
    return value.toUpperCase();
  }

  // value is null | undefined | ''
  return 'No value';
}

// Array checking
function processItems<T>(items: T[] | null | undefined) {
  if (!items?.length) {
    // items is null | undefined | empty array
    return [];
  }

  // items is non-empty T[]
  return items.map((item) => processItem(item));
}
```

## التضييق بالمساواة

يضيّق TypeScript الأنواع بناءً على فحوص المساواة:

```typescript
function handleStatus(status: 'loading' | 'success' | 'error' | null) {
  if (status === null) {
    // status is null
    return 'Not started';
  }

  if (status === 'loading') {
    // status is 'loading'
    return <Spinner />;
  }

  if (status === 'success') {
    // status is 'success'
    return <SuccessMessage />;
  }

  // status is 'error'
  return <ErrorMessage />;
}

// Using switch for exhaustive checks
type Action =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      // action is { type: 'increment'; amount: number }
      return state + action.amount;

    case 'decrement':
      // action is { type: 'decrement'; amount: number }
      return state - action.amount;

    case 'reset':
      // action is { type: 'reset' }
      return 0;

    default:
      // TypeScript knows this is unreachable
      const exhaustive: never = action;
      throw new Error(`Unhandled action: ${exhaustive}`);
  }
}
```

## حرّاس أنواع مخصّصة

أنشئ دوال حرّاس أنواع خاصة بك:

```typescript
// Simple type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// More complex type guard
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    typeof (value as User).id === 'number' &&
    typeof (value as User).name === 'string' &&
    typeof (value as User).email === 'string'
  );
}

// Using the type guard
function processData(data: unknown) {
  if (isUser(data)) {
    // data is User
    console.log(`User: ${data.name} (${data.email})`);
  } else if (isString(data)) {
    // data is string
    console.log(`String: ${data}`);
  } else {
    console.log('Unknown data type');
  }
}
```

## حرّاس الأنواع للمصفوفات

يتطلب التعامل مع المصفوفات عناية خاصة:

```typescript
// Filter with type guards
const mixedArray: (string | number | null)[] = ['a', 1, null, 'b', 2];

// This doesn't narrow the type
const filtered = mixedArray.filter((item) => item !== null);
// filtered is still (string | number | null)[]

// Use a type guard function
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

const filtered2 = mixedArray.filter(isNotNull);
// filtered2 is (string | number)[]

// Or be more specific
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const strings = mixedArray.filter(isString);
// strings is string[]
```

## تحليل تدفّق التحكم

يتبع TypeScript منطق شيفرتك:

```typescript
function processValue(value: string | number | null) {
  // value is string | number | null

  if (value === null) {
    return 'null';
  }
  // value is string | number

  if (typeof value === 'string') {
    return value.length;
  }
  // value is number

  return value * 2;
}

// Assignment narrowing
let value: string | number = 'hello';
// value is string | number, but currently 'hello'

value = 42;
// value is still string | number, but currently 42

if (Math.random() > 0.5) {
  value = 'world';
  // value is string in this block
  console.log(value.toUpperCase());
} else {
  value = 100;
  // value is number in this block
  console.log(value.toFixed(2));
}
```

## never والشمول (exhaustiveness)

استخدم `never` لتتأكّد من أنك تعالج كل الحالات:

```typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;

    case 'square':
      return shape.size ** 2;

    case 'triangle':
      return (shape.base * shape.height) / 2;

    default:
      // If we miss a case, TypeScript will error here
      const exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${exhaustive}`);
  }
}

// React reducer example
type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };

    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload };

    case 'FETCH_ERROR':
      return { status: 'error', error: action.error };

    case 'RESET':
      return { status: 'idle' };

    default:
      const exhaustive: never = action;
      return state;
  }
}
```

## دوال التأكيد (assertion functions)

أنشئ دوال تؤكّد شروطًا:

```typescript
function assertIsDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}

// Using assertion functions
function processConfig(config: Config | null) {
  assertIsDefined(config);
  // config is Config from here on

  console.log(config.apiUrl);
  console.log(config.timeout);
}

// React example
const UserProfile = ({ userId }: { userId: string | null }) => {
  assertIsDefined(userId);
  // userId is string from here on

  const user = useUser(userId);

  return <div>User: {user.name}</div>;
};
```

## السلسلة الاختيارية والتضييق

يفهم TypeScript السلسلة الاختيارية:

```typescript
interface User {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

function getCity(user: User) {
  const city = user.address?.city;
  // city is string | undefined

  if (city) {
    // city is string
    return city.toUpperCase();
  }

  return 'No city';
}

// With nullish coalescing
function getDisplayName(user: User | null) {
  const name = user?.name ?? 'Anonymous';
  // name is string (never undefined or null)

  return name.toUpperCase();
}
```

## تضييق الأنواع في React

### خصائص المكوّنات

```typescript
type ButtonProps =
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string }
  | { variant: 'disabled' };

const Button = (props: ButtonProps) => {
  switch (props.variant) {
    case 'primary':
      // props has onClick
      return (
        <button className="btn-primary" onClick={props.onClick}>
          Click me
        </button>
      );

    case 'link':
      // props has href
      return (
        <a className="btn-link" href={props.href}>
          Visit
        </a>
      );

    case 'disabled':
      // props has no additional properties
      return (
        <button className="btn-disabled" disabled>
          Disabled
        </button>
      );

    default:
      const exhaustive: never = props;
      throw new Error(`Unhandled variant: ${exhaustive}`);
  }
};
```

### التصيير الشرطي

```typescript
interface DataState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: Error;
}

function DataDisplay<T>({ state }: { state: DataState<T> }) {
  if (state.status === 'idle') {
    return <div>Ready to load</div>;
  }

  if (state.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (state.status === 'error') {
    // TypeScript knows error exists when status is 'error'
    return <div>Error: {state.error?.message}</div>;
  }

  // state.status is 'success', data should exist
  return <div>Data: {JSON.stringify(state.data)}</div>;
}
```

### التحقّق من النماذج

```typescript
type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; error: string };

function validateEmail(input: string): ValidationResult {
  if (!input.includes('@')) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true, value: input.trim().toLowerCase() };
}

const EmailInput = () => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const result = validateEmail(input);

    if (result.valid) {
      // result.value is available
      submitEmail(result.value);
    } else {
      // result.error is available
      showError(result.error);
    }
  };

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      onBlur={handleSubmit}
    />
  );
};
```

## أنماط متقدّمة

### الاتحادات المميّزة (discriminated unions) ذات الحقول المتعدّدة

```typescript
type Response<T> =
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: Error; retryAfter?: number }
  | { status: 'pending'; progress?: number };

function handleResponse<T>(response: Response<T>) {
  if (response.status === 'success') {
    // All success fields are available
    console.log(`Success at ${response.timestamp}: ${response.data}`);
  } else if (response.status === 'error') {
    // All error fields are available
    console.error(`Error: ${response.error.message}`);
    if (response.retryAfter) {
      setTimeout(retry, response.retryAfter);
    }
  } else {
    // response.status === 'pending'
    console.log(`Pending... ${response.progress ?? 0}%`);
  }
}
```

### دمج حرّاس الأنواع

```typescript
interface Admin {
  role: 'admin';
  permissions: string[];
}

interface User {
  role: 'user';
  subscription?: 'free' | 'premium';
}

type Person = Admin | User;

function hasPermission(person: Person, permission: string): boolean {
  // First narrow by role
  if (person.role === 'admin') {
    // person is Admin
    return person.permissions.includes(permission);
  }

  // person is User
  // Further narrow by subscription
  if (person.subscription === 'premium') {
    // Premium users have some permissions
    return ['read', 'write'].includes(permission);
  }

  // Free users have limited permissions
  return permission === 'read';
}
```

### التضييق مع الأنواع العامة

```typescript
function processValue<T>(value: T | null, processor: (value: T) => void): void {
  if (value !== null) {
    // value is T (not null)
    processor(value);
  }
}

// Type guard with generics
function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function filterDefined<T>(items: (T | undefined)[]): T[] {
  return items.filter(isDefined);
}
```

## مثال من العالم الحقيقي: معالج نموذج

```typescript
type FieldValue = string | number | boolean | Date | null;

interface Field {
  name: string;
  value: FieldValue;
  validation?: (value: FieldValue) => string | null;
}

interface Form {
  fields: Field[];
  isValid: boolean;
}

function validateField(field: Field): string | null {
  const { value, validation } = field;

  // Check for required field
  if (value === null || value === undefined) {
    return 'Field is required';
  }

  // Type-specific validation
  if (typeof value === 'string') {
    if (value.trim().length === 0) {
      return 'Field cannot be empty';
    }
    if (value.length > 255) {
      return 'Field is too long';
    }
  }

  if (typeof value === 'number') {
    if (isNaN(value)) {
      return 'Invalid number';
    }
    if (value < 0) {
      return 'Number must be positive';
    }
  }

  if (value instanceof Date) {
    if (isNaN(value.getTime())) {
      return 'Invalid date';
    }
    if (value < new Date()) {
      return 'Date must be in the future';
    }
  }

  // Custom validation
  if (validation) {
    return validation(value);
  }

  return null;
}

const FormComponent = ({ form }: { form: Form }) => {
  const handleSubmit = () => {
    const errors = form.fields
      .map(field => ({
        field: field.name,
        error: validateField(field)
      }))
      .filter(result => result.error !== null);

    if (errors.length === 0) {
      // All fields are valid
      submitForm(form);
    } else {
      // Show errors
      errors.forEach(({ field, error }) => {
        console.error(`${field}: ${error}`);
      });
    }
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }}>
      {form.fields.map(field => (
        <FieldRenderer key={field.name} field={field} />
      ))}
    </form>
  );
};
```

## أفضل الممارسات {#best-practices}

### استخدم الاتحادات المميّزة

```typescript
// ✅ Good - Easy to narrow
type Result<T> = { success: true; data: T } | { success: false; error: string };

// ❌ Avoid - Harder to narrow
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### اجعل الحالات غير الصالحة غير قابلة للتمثيل

```typescript
// ✅ Good - Can't have both data and error
type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ Avoid - Could have data and error simultaneously
interface State<T> {
  isLoading: boolean;
  data?: T;
  error?: Error;
}
```

### استخدم الفحوص الشاملة

```typescript
// ✅ Always include exhaustive checks
function handle(value: 'a' | 'b' | 'c') {
  switch (value) {
    case 'a':
      return 1;
    case 'b':
      return 2;
    case 'c':
      return 3;
    default:
      const exhaustive: never = value;
      throw new Error(`Unhandled value: ${exhaustive}`);
  }
}
```

### فضّل حرّاس الأنواع على تأكيدات الأنواع

```typescript
// ✅ Good - Safe type narrowing
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

if (isString(value)) {
  console.log(value.toUpperCase());
}

// ❌ Avoid - Unsafe type assertion
console.log((value as string).toUpperCase());
```

## الخلاصة

تضييق الأنواع وتحليل تدفّق التحكم أساسيان في كتابة شيفرة TypeScript آمنة. وهما يتيحان لك:

1. **اكتب شيفرة أكثر أمانًا** — يضمن TypeScript أنك تعالج كل الحالات
2. **تجنّب أخطاء وقت التشغيل** — التقط مشكلات الأنواع وقت التصريف
3. **عبّر عن النية بوضوح** — فحوص أنواعك توثّق منطقك
4. **قلّل الشيفرة الدفاعية** — يعرف TypeScript متى تكون الفحوص غير ضرورية
5. **فعّل إعادة هيكلة أفضل** — تُلتقط التغييرات في الأنواع فورًا

أتقن هذه المفاهيم، وستكتب مكوّنات React لا آمنةً من حيث الأنواع فحسب، بل أسهل في الصيانة وأوضح في التفكير فيها.
