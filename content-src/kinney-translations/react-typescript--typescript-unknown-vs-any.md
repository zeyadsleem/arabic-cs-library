---
title: "`unknown` مقابل `any`"
---

لنتحدّث عن طريقتي TypeScript لقول «لا أعرف نوع هذا» — وهما `any` و`unknown`. إحداهما مخرجٌ خطر يُفقد TypeScript غرضه، والأخرى طريقة آمنة للتعامل مع البيانات الديناميكية حقًا. ولنتعلّم متى وكيف نستخدم كلًّا منهما (**تحذير مسبق**: ستريد `unknown` في أغلب الأحوال).

## المشكلة مع `any`

حين تستخدم `any`، فأنت تعطّل TypeScript عمليًا:

```typescript
let value: any = 42;

// TypeScript allows ALL of these, even the ones that will crash
value.toLowerCase(); // Runtime error!
value.foo.bar.baz; // Runtime error!
value(); // Runtime error!
const result = value + 'hello'; // Works, but what's the result?
```

فهو كأنك تقول لـ TypeScript «ثق بي، أنا أعرف ما أفعله» — إلا أنك قد لا تعرف، وTypeScript لن يساعدك حين تخطئ.

## حان دور `unknown`: البديل الآمن

يشبه `unknown` أخًا مسؤولًا لـ `any`. فهو يستطيع حمل أي قيمة، لكن عليك أن تفحص ما هو قبل استخدامه:

```typescript
let value: unknown = 42;

// TypeScript blocks all of these
value.toLowerCase(); // Error: Object is of type 'unknown'
value.foo.bar.baz; // Error: Object is of type 'unknown'
value(); // Error: Object is of type 'unknown'

// You must check first
if (typeof value === 'string') {
  // Now TypeScript knows it's safe
  console.log(value.toLowerCase());
}
```

## سيناريوهات من العالم الحقيقي

### استجابات API

عند التعامل مع واجهات API خارجية، غالبًا ما لا تعرف الشكل الدقيق للبيانات:

```typescript
// ❌ Bad: Using any
async function fetchUserBad(id: string): Promise<any> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

const user = await fetchUserBad('123');
console.log(user.namee); // Typo! But TypeScript won't catch it
console.log(user.email.toLowerCase()); // Might crash if email is null

// ✅ Good: Using unknown with validation
async function fetchUserGood(id: string): Promise<unknown> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Type guard to validate the response
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'email' in value &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string'
  );
}

const data = await fetchUserGood('123');
if (isUser(data)) {
  // Safe to use as User
  console.log(data.name);
  console.log(data.email.toLowerCase());
} else {
  console.error('Invalid user data received');
}
```

### معالِجات الأحداث

غالبًا ما تتعامل معالِجات أحداث React مع أنواع أحداث غير معروفة:

```typescript
// ❌ Bad: Using any
const handleEvent = (e: any) => {
  console.log(e.target.value); // Might not exist
  e.preventDefault(); // Might not be a function
};

// ✅ Good: Using unknown with checks
const handleEvent = (e: unknown) => {
  // Check if it's an event
  if (e instanceof Event) {
    e.preventDefault();

    // Check if target has value
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      console.log(target.value);
    }
  }
};

// Even better: Use proper types when possible
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TypeScript knows this is a form event
};
```

### تحليل JSON

تُعيد `JSON.parse` القيمة `any` افتراضيًا، وهذا أمر خطر:

```typescript
// ❌ Dangerous default behavior
const data = JSON.parse('{"name": "Alice"}');
console.log(data.age.years); // Runtime error, but TypeScript doesn't warn

// ✅ Safe wrapper
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJSON('{"name": "Alice"}');
// Now you must validate before use
if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log((data as { name: string }).name);
}
```

## حرّاس الأنواع لـ `unknown`

إليك كيف تضيّق أنواع `unknown` بأمان:

### حرّاس أنواع أساسيّة

```typescript
function processValue(value: unknown) {
  // Check for primitives
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  if (typeof value === 'number') {
    return value.toFixed(2);
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Check for null/undefined
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  // Check for arrays
  if (Array.isArray(value)) {
    return value.length;
  }

  // Check for objects
  if (typeof value === 'object') {
    return Object.keys(value).length;
  }

  // Check for functions
  if (typeof value === 'function') {
    return 'function';
  }
}
```

### حرّاس أنواع مخصّصة

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}

function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'price' in value &&
    typeof (value as Product).id === 'string' &&
    typeof (value as Product).name === 'string' &&
    typeof (value as Product).price === 'number'
  );
}

// Using the guard
function displayProduct(data: unknown) {
  if (isProduct(data)) {
    return (
      <div>
        <h2>{data.name}</h2>
        <p>${data.price.toFixed(2)}</p>
      </div>
    );
  }

  return <div>Invalid product data</div>;
}
```

## مكتبات التحقّق وقت التشغيل

للتحقّق المعقّد، استخدم مكتبات مثل Zod:

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(150),
  roles: z.array(z.string())
});

type User = z.infer<typeof UserSchema>;

// Safe parsing
function parseUser(data: unknown): User | null {
  try {
    return UserSchema.parse(data);
  } catch (error) {
    console.error('Invalid user data:', error);
    return null;
  }
}

// In a React component
const UserProfile = ({ data }: { data: unknown }) => {
  const user = parseUser(data);

  if (!user) {
    return <div>Invalid user data</div>;
  }

  // TypeScript knows user is fully typed
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Age: {user.age}</p>
      <ul>
        {user.roles.map(role => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
  );
};
```

## معالجة الأخطاء

قد تكون الأخطاء في JavaScript أيّ شيء، فتعامل معها بأمان:

```typescript
// ❌ Bad: Assuming error shape
try {
  await someOperation();
} catch (error: any) {
  console.log(error.message); // Might not exist
  console.log(error.response.data); // Might crash
}

// ✅ Good: Safe error handling
try {
  await someOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    // Standard Error object
    console.log(error.message);
    console.log(error.stack);
  } else if (typeof error === 'string') {
    // String error
    console.log(error);
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    // Custom error object
    console.log((error as { message: string }).message);
  } else {
    // Unknown error type
    console.log('An unknown error occurred:', error);
  }
}

// Better: Create error type guards
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError === true
  );
}

try {
  await axios.get('/api/data');
} catch (error: unknown) {
  if (isAxiosError(error)) {
    console.log(error.response?.data);
    console.log(error.response?.status);
  } else if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Unknown error:', error);
  }
}
```

## العمل مع مكتبات الطرف الثالث

حين تكون أنواع المكتبات رديئة أو مفقودة:

```typescript
// Some library without types
declare module 'untyped-library' {
  export function doSomething(input: any): any;
}

// ❌ Bad: Propagating any
import { doSomething } from 'untyped-library';

function myFunction(data: any) {
  return doSomething(data); // Still any
}

// ✅ Good: Contain the any, expose unknown
import { doSomething } from 'untyped-library';

function myFunction(data: unknown): unknown {
  // Validate input
  if (typeof data !== 'string') {
    throw new Error('Expected string input');
  }

  // Call the untyped function
  const result = doSomething(data);

  // Return as unknown for safe consumption
  return result as unknown;
}

// Even better: Add runtime validation
function myFunctionSafe(data: unknown): string {
  if (typeof data !== 'string') {
    throw new Error('Expected string input');
  }

  const result = doSomething(data);

  if (typeof result !== 'string') {
    throw new Error('Unexpected result from library');
  }

  return result;
}
```

## خصائص مكوّنات React

التعامل الآمن مع الخصائص الديناميكية:

```typescript
// ❌ Bad: Any props
const DynamicComponent = (props: any) => {
  return <div>{props.message}</div>;  // Might crash
};

// ✅ Good: Unknown with validation
const DynamicComponent = (props: unknown) => {
  // Validate props
  if (
    typeof props === 'object' &&
    props !== null &&
    'message' in props &&
    typeof (props as any).message === 'string'
  ) {
    return <div>{(props as { message: string }).message}</div>;
  }

  return <div>Invalid props</div>;
};

// Better: Type guard
interface MessageProps {
  message: string;
}

function isMessageProps(props: unknown): props is MessageProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    'message' in props &&
    typeof (props as any).message === 'string'
  );
}

const DynamicComponent = (props: unknown) => {
  if (isMessageProps(props)) {
    return <div>{props.message}</div>;
  }

  return <div>Invalid props</div>;
};
```

## التخزين المحلي وتخزين الجلسة

يُعيد تخزين المتصفّح نصوصًا تحتاج إلى تحليل:

```typescript
// ❌ Bad: Trusting localStorage
const data: any = JSON.parse(localStorage.getItem('user') || '{}');
console.log(data.name); // Might not exist

// ✅ Good: Safe storage access
function getFromStorage<T>(key: string, validator: (value: unknown) => value is T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed: unknown = JSON.parse(item);
    if (validator(parsed)) {
      return parsed;
    }

    console.warn(`Invalid data in localStorage for key: ${key}`);
    return null;
  } catch (error) {
    console.error(`Error parsing localStorage item: ${key}`, error);
    return null;
  }
}

// Usage
const user = getFromStorage('user', isUser);
if (user) {
  console.log(user.name); // Safe!
}
```

## استراتيجية الترحيل: من `any` إلى `unknown`

إن كان لديك شيفرة قائمة تستخدم `any`، فإليك كيف ترحّل:

```typescript
// Step 1: Change any to unknown
// Before
function processData(data: any) {
  return data.value * 2;
}

// After - This will now show errors
function processData(data: unknown) {
  return data.value * 2; // Error: Object is of type 'unknown'
}

// Step 2: Add type guards
function processData(data: unknown) {
  if (
    typeof data === 'object' &&
    data !== null &&
    'value' in data &&
    typeof (data as any).value === 'number'
  ) {
    return (data as { value: number }).value * 2;
  }
  throw new Error('Invalid data shape');
}

// Step 3: Create proper types
interface DataWithValue {
  value: number;
}

function isDataWithValue(data: unknown): data is DataWithValue {
  return (
    typeof data === 'object' &&
    data !== null &&
    'value' in data &&
    typeof (data as any).value === 'number'
  );
}

function processData(data: unknown): number {
  if (isDataWithValue(data)) {
    return data.value * 2;
  }
  throw new Error('Invalid data shape');
}
```

## متى يكون `any` مقبولًا؟

هناك حالات نادرة قد يكون فيها `any` مقبولًا:

### شيفرة الترحيل

```typescript
// Temporarily during migration
// TODO: Add proper types
const legacyData: any = getLegacyData();
```

### شيفرة الاختبار

```typescript
// In tests where type safety is less critical
it('handles any input', () => {
  const testData: any = { foo: 'bar' };
  expect(someFunction(testData)).toBeDefined();
});
```

### التسجيل في الطرفية

```typescript
// For debugging only
function debugLog(label: string, value: any) {
  console.log(label, value);
}
```

لكن حتى في هذه الحالات، اسأل نفسك: هل سيعمل `unknown` بالمثل؟

## اعتبارات الأداء

لفحص الأنواع لا أيّ أثر في أداء وقت التشغيل، لكنّ التحقّق له أثر:

```typescript
// Lightweight check
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Heavier validation
function isComplexObject(value: unknown): value is ComplexType {
  // Many checks...
  return validateComplexStructure(value);
}

// Cache validation results for repeated checks
const validationCache = new WeakMap<object, boolean>();

function isCachedValid(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (validationCache.has(value)) {
    return validationCache.get(value)!;
  }

  const isValid = expensiveValidation(value);
  validationCache.set(value, isValid);
  return isValid;
}
```

## أفضل الممارسات

### اجعل `unknown` هو الافتراضي

```typescript
// ✅ Start with unknown
function processInput(input: unknown) {
  // Validate and narrow
}

// ❌ Don't default to any
function processInput(input: any) {
  // No safety
}
```

### أنشئ حرّاس أنواع قابلة لإعادة الاستخدام

```typescript
// Define once, use everywhere
const typeGuards = {
  isString: (value: unknown): value is string => typeof value === 'string',

  isNumber: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),

  isNonNullObject: (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null,

  hasProperty: <K extends string>(value: unknown, key: K): value is Record<K, unknown> =>
    typeGuards.isNonNullObject(value) && key in value,
};
```

### تحقّق عند الحدود

```typescript
// Validate data as it enters your application
async function fetchData(): Promise<ValidatedData> {
  const response = await fetch('/api/data');
  const data: unknown = await response.json();

  // Validate immediately
  if (!isValidData(data)) {
    throw new Error('Invalid data from API');
  }

  return data; // Now properly typed
}
```

### استخدم دوال التأكيد

```typescript
function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, got ${typeof value}`);
  }
}

function processName(name: unknown) {
  assertString(name);
  // name is now typed as string
  return name.toUpperCase();
}
```

## الخلاصة

الفرق بين `any` و`unknown` بسيط لكنه حاسم:

- **`any`**: «لا يهمّني ما نوع هذا» (خطر)
- **`unknown`**: «لا أعرف بعدُ ما نوع هذا» (آمن)

استخدم `unknown` حين:

- تتعامل مع بيانات خارجية (واجهات API، ومدخلات المستخدم، والتخزين المحلي)
- تتعامل مع الأخطاء في كتل catch
- تعمل مع مكتبات بلا أنواع
- تحلّل JSON أو غيره من البيانات الديناميكية

استخدم `any` فقط حين:

- ترحيل JavaScript إلى TypeScript (بشكل مؤقّت)
- في شيفرة الاختبار حيث لا تقلّ أهمية أمان الأنواع
- إذا كنت مضطرًا تمامًا ولديك سبب قويّ

تذكّر: كل `any` في قاعدتك البرمجية خطأ محتمل في وقت التشغيل بانتظار الحدوث. وكل `unknown` نقطة تحقّق تفرض عليك التحقّق قبل الاستخدام. اختَر الأمان!
