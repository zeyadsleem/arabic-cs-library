---
title: "دليل تصحيح أخطاء TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/debugging-typescript-errors-guide"
---

قد تبدو أخطاء TypeScript وكأنّك تقرأ الهيروغليفية القديمة. تعلم أنّ شيئًا ما خاطئ، لكنّ رسالة الخطأ جدارٌ من تعريفات الأنواع يبدو أنه صُمّم ليُربك لا ليُعين. لكن إليك السر: حين تتعلم فك شفرة لغة أخطاء TypeScript، تتحوّل تلك الرسائل المبهمة إلى أفضل أداة تصحيح (debugging) لديك. لنحوّلك من شخصٍ يخشى أخطاء TypeScript إلى شخصٍ يقرأها كالمحترفين.

فكّر في أخطاء TypeScript على أنها صديقٌ مُفرط في المضاهرة إنما يحاول مساعدتك فعلًا. قد يكون كثير الكلام ومُزعجًا أحيانًا، لكنه يشير غالبًا بضبطٍ إلى ما الخطأ—كل ما تحتاجه أن تعرف كيف تُصغي.

## فهم لغة أخطاء TypeScript

قبل الخوض في أخطاء بعينها، لنفهم كيف يوصل TypeScript المشكلات إليك.

### تشريح خطأ TypeScript

```typescript
// Let's trigger a complex error
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

function processUser(user: AdminUser) {
  console.log(user.permissions);
}

const user: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  role: 'user',
};

processUser(user);
// Error: Argument of type 'User' is not assignable to parameter of type 'AdminUser'.
//   Types of property 'role' are incompatible.
//     Type '"admin" | "user"' is not assignable to type '"admin"'.
//       Type '"user"' is not assignable to type '"admin"'.
```

لنفكّك الرسالة:

1. **ما الذي وقع**: «Argument of type 'User' is not assignable»
2. **أين وقع**: «to parameter of type 'AdminUser'»
3. **لماذا وقع**: «Types of property 'role' are incompatible»
4. **المشكلة بعينها**: النوع '«user»' غير قابل للإسناد إلى النوع '«admin»'

### قراءة أخطاء الأنواع المعقّدة

```typescript
// A more complex example
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  features: {
    auth: boolean;
    analytics: boolean;
  };
}

function updateConfig(config: Config, updates: DeepPartial<Config>) {
  // Implementation
}

updateConfig({} as Config, {
  database: {
    credentials: {
      username: 123, // Wrong type!
    },
  },
});

// Error: Type 'number' is not assignable to type 'DeepPartial<string>' | undefined
```

**نصيحة محترفين**: ابدأ من أعمق خطأ وتقدّم نحو الخارج. هنا، `123` رقم، بينما `username` يتوقّع نصًّا (string).

## الأخطاء الشائعة في React مع TypeScript

لنتعامل مع الأخطاء التي ستواجهها أكثر من غيرها في تطوير React.

### الخطأ: «نوع عنصر JSX '…' لا يحتوي على أي توقيعات بناء أو استدعاء»

```typescript
// ❌ This causes the error
const components = {
  Button: './Button',
  Input: './Input'
};

function App() {
  const Component = components.Button;
  return <Component />; // Error!
}

// ✅ Solution 1: Import actual components
import Button from './Button';
import Input from './Input';

const components = {
  Button,
  Input
};

// ✅ Solution 2: Use proper typing
const components: Record<string, React.ComponentType> = {
  Button: lazy(() => import('./Button')),
  Input: lazy(() => import('./Input'))
};

// ✅ Solution 3: Type guard
function isComponent(
  value: unknown
): value is React.ComponentType {
  return typeof value === 'function';
}

function SafeRender({ componentKey }: { componentKey: string }) {
  const Component = components[componentKey];

  if (!isComponent(Component)) {
    return <div>Component not found</div>;
  }

  return <Component />;
}
```

### الخطأ: «الخاصية 'children' غير موجودة في النوع»

```typescript
// ❌ This causes the error
interface ButtonProps {
  onClick: () => void;
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>; // Error!
}

// ✅ Solution 1: Add children to props
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// ✅ Solution 2: Use PropsWithChildren
import { PropsWithChildren } from 'react';

interface ButtonBaseProps {
  onClick: () => void;
}

function Button({ onClick, children }: PropsWithChildren<ButtonBaseProps>) {
  return <button onClick={onClick}>{children}</button>;
}

// ✅ Solution 3: Make children optional
interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}
```

### الخطأ: «النوع '…' غير قابل للإسناد إلى نوع 'IntrinsicAttributes & …'»

```typescript
// ❌ This causes the error
interface CardProps {
  title: string;
}

function Card({ title, subtitle }: CardProps) { // Error: subtitle doesn't exist
  return <div>{title} - {subtitle}</div>;
}

// ✅ Solution 1: Add missing prop
interface CardProps {
  title: string;
  subtitle: string;
}

// ✅ Solution 2: Extend HTML attributes
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function Card({ title, ...props }: CardProps) {
  return <div {...props}>{title}</div>;
}

// ✅ Solution 3: Use intersection types
type CardProps = {
  title: string;
} & React.ComponentPropsWithoutRef<'div'>;
```

## أخطاء معالجات الأحداث

معالجات الأحداث مصدرٌ شائع لاستفزاز TypeScript.

### الخطأ: «النوع '…' غير قابل للإسناد إلى نوع 'MouseEventHandler'»

```typescript
// ❌ This causes the error
function Button() {
  const handleClick = (name: string) => {
    console.log(name);
  };

  return <button onClick={handleClick}>Click</button>; // Error!
}

// ✅ Solution 1: Fix the handler signature
function Button() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);
  };

  return <button onClick={handleClick}>Click</button>;
}

// ✅ Solution 2: Use inline arrow function
function Button() {
  const handleClick = (name: string) => {
    console.log(name);
  };

  return <button onClick={() => handleClick('John')}>Click</button>;
}

// ✅ Solution 3: Curry the handler
function Button() {
  const handleClick = (name: string) => (e: React.MouseEvent) => {
    console.log(name);
  };

  return <button onClick={handleClick('John')}>Click</button>;
}
```

### أخطاء أنواع أحداث النماذج

```typescript
// ❌ Common form errors
function Form() {
  const handleSubmit = (data: FormData) => { // Wrong!
    console.log(data);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// ✅ Correct form event handling
function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log(name, type === 'checkbox' ? checked : value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## أخطاء المكوّنات العامة

قد تُنتج الأنواع العامة (generics) من أويلر الأخطاء أكثر إرباكًا.

### الخطأ: «النوع 'T' لا يحقّق القيد»

```typescript
// ❌ This causes the error
function List<T>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li> // Error: T might not have id or name
      ))}
    </ul>
  );
}

// ✅ Solution 1: Add constraints
interface HasIdAndName {
  id: string | number;
  name: string;
}

function List<T extends HasIdAndName>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li> // Now TypeScript knows these exist
      ))}
    </ul>
  );
}

// ✅ Solution 2: Use render props
function List<T>({
  items,
  getKey,
  renderItem
}: {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// ✅ Solution 3: Use discriminated unions
type ListItem =
  | { type: 'user'; id: string; name: string }
  | { type: 'product'; id: number; title: string };

function List({ items }: { items: ListItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.type === 'user' ? item.name : item.title}
        </li>
      ))}
    </ul>
  );
}
```

## أخطاء الخُطّافات

قد تُنتج الخُطّافات (hooks) المخصّصة أخطاء TypeScript فريدة من نوعها.

### الخطأ: «الخُطّاف '…' في React يُستدعى بشكل شرطي»

```typescript
// ❌ This causes the error (TypeScript AND React error)
function Component({ shouldFetch }: { shouldFetch: boolean }) {
  if (shouldFetch) {
    const data = useFetch('/api/data'); // Error!
    return <div>{data}</div>;
  }
  return <div>No data</div>;
}

// ✅ Solution 1: Always call hooks
function Component({ shouldFetch }: { shouldFetch: boolean }) {
  const data = useFetch(shouldFetch ? '/api/data' : null);

  if (!shouldFetch) {
    return <div>No data</div>;
  }

  return <div>{data}</div>;
}

// ✅ Solution 2: Create a conditional hook
function useMaybeFetch<T>(url: string | null): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);

  return data;
}
```

### الخطأ: «النوع 'undefined' لا يصلح نوعًا للفهرس»

```typescript
// ❌ This causes the error
function useFormField(name?: string) {
  const [values, setValues] = useState<Record<string, string>>({});

  const value = values[name]; // Error: name might be undefined

  return { value };
}

// ✅ Solution 1: Add guard
function useFormField(name?: string) {
  const [values, setValues] = useState<Record<string, string>>({});

  const value = name ? values[name] : undefined;

  return { value };
}

// ✅ Solution 2: Use non-nullable type
function useFormField(name: string) {
  const [values, setValues] = useState<Record<string, string>>({});

  const value = values[name];

  return { value };
}

// ✅ Solution 3: Use optional chaining
function useFormField(name?: string) {
  const [values, setValues] = useState<Record<string, string>>({});

  const value = name && values[name];

  return { value };
}
```

## أخطاء `async` و `Promise`

تحتاج العمليات غير المتزامنة (async) في مكوّنات React إلى معالجة خاصة.

### الخطأ: «النوع 'Promise<…>' غير قابل للإسناد إلى نوع 'ReactElement'»

```typescript
// ❌ This causes the error
async function UserProfile({ id }: { id: string }) {
  const user = await fetchUser(id);
  return <div>{user.name}</div>; // Error in React <19!
}

// ✅ Solution 1: Use React 19 (supports async components)
// In React 19, the above code works!

// ✅ Solution 2: Use state and effects (React <19)
function UserProfile({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// ✅ Solution 3: Use suspense
const UserProfile = lazy(async () => {
  const user = await fetchUser(id);
  return {
    default: () => <div>{user.name}</div>
  };
});
```

## تقنيات التصحيح المتقدّمة

حين لا تفشل الحلول البسيطة بل لا تكفي، استخدم هذه القنوات المتقدّمة.

### التشخيص عبر التأكيدات النوعية

```typescript
// Temporary type assertions for debugging
function debugTypes<T>(value: T, label: string): T {
  console.log(`${label}:`, value);
  console.log(`${label} type:`, typeof value);
  return value;
}

// Use it to understand what TypeScript sees
function ComplexComponent({ data }: { data: unknown }) {
  const processed = debugTypes(
    processData(data),
    'Processed Data'
  );

  // Temporarily widen type to debug
  const debugData = processed as any;
  console.log('Shape:', Object.keys(debugData));

  // Proper typing once you understand the shape
  const typed = processed as ProcessedData;
  return <div>{typed.result}</div>;
}
```

### استخدام مُحدِّدات الأنواع للتشخيص

```typescript
// Create detailed type guards
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    console.error('Not an object:', value);
    return false;
  }

  const obj = value as Record<string, unknown>;

  if (typeof obj.id !== 'string') {
    console.error('Invalid id:', obj.id);
    return false;
  }

  if (typeof obj.name !== 'string') {
    console.error('Invalid name:', obj.name);
    return false;
  }

  if (typeof obj.email !== 'string') {
    console.error('Invalid email:', obj.email);
    return false;
  }

  return true;
}

// Use in components
function UserCard({ data }: { data: unknown }) {
  if (!isUser(data)) {
    console.error('Invalid user data received:', data);
    return <div>Invalid user data</div>;
  }

  // TypeScript now knows data is User
  return <div>{data.name}</div>;
}
```

### استخراج الأنواع المعقّدة

```typescript
// When types get too complex, extract and simplify
type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;
type ExtractState<T> = T extends React.Component<any, infer S> ? S : never;

// Debug complex component props
type ButtonProps = ExtractProps<typeof Button>;
type FormState = ExtractState<typeof FormComponent>;

// Use for debugging
const debugProps: ButtonProps = {
  // TypeScript will show you what's needed
};
```

## فكّ تشفير رسائل الأخطاء

إليك مُفكِّكًا للأنماط الشائعة من أخطاء TypeScript:

### «النوع '…' غير قابل للإسناد إلى نوع 'never'»

```typescript
// This usually means impossible state
type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Failed';
    default:
      // status is 'never' here - all cases handled
      const exhaustive: never = status;
      return exhaustive; // This ensures all cases are handled
  }
}
```

### «الكائن قد يكون 'null' أو 'undefined'»

```typescript
// ❌ Causes error
function DisplayUser({ user }: { user: User | null }) {
  return <div>{user.name}</div>; // Error!
}

// ✅ Solutions
// Option 1: Guard
function DisplayUser({ user }: { user: User | null }) {
  if (!user) return <div>No user</div>;
  return <div>{user.name}</div>;
}

// Option 2: Optional chaining
function DisplayUser({ user }: { user: User | null }) {
  return <div>{user?.name ?? 'No user'}</div>;
}

// Option 3: Non-null assertion (use carefully!)
function DisplayUser({ user }: { user: User | null }) {
  return <div>{user!.name}</div>; // Only if you're SURE it's not null
}
```

### «كان يُتوقّع X من المعاملات، لكن وصل Y»

```typescript
// ❌ Common with array methods
const numbers = [1, 2, 3];
const doubled = numbers.map(parseInt); // Error!

// ✅ Solution: Wrap in arrow function
const doubled = numbers.map(n => parseInt(n.toString()));

// ❌ Common with event handlers
<button onClick={doSomething('arg')} /> // Error!

// ✅ Solution: Use arrow function
<button onClick={() => doSomething('arg')} />
```

## أدوات لرسائل أخطاء أفضل

### مترجم أخطاء TypeScript

```typescript
// Use the @typescript/error-translator
// npm install -g @typescript/error-translator

// Or use online: https://ts-error-translator.vercel.app/
```

### مُبلِّغ أخطاء مخصّص

```typescript
// Create your own error formatter
class TypeScriptErrorFormatter {
  format(error: string): string {
    // Simplify common patterns
    return error
      .replace(
        /Type '(.+?)' is not assignable to type '(.+?)'/,
        "❌ Can't use $1 where $2 is expected",
      )
      .replace(
        /Property '(.+?)' does not exist on type '(.+?)'/,
        "❌ $2 doesn't have a property called $1",
      )
      .replace(/Cannot find name '(.+?)'/, '❌ $1 is not defined');
  }
}
```

### إعداد IDE من أجل رسائل أخطاء أفضل

```json
// .vscode/settings.json
{
  "typescript.suggest.completeJSDocs": true,
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true
}
```

## مزالق شائعة وحلولها

### React.FC مقابل تعريف الدالة

```typescript
// ❌ React.FC can cause issues
const Component: React.FC<Props> = ({ children }) => {
  // children is implicitly included, might not want that
};

// ✅ Prefer explicit function declaration
function Component({ children }: PropsWithChildren<Props>) {
  // Explicit about children
}
```

### تأكيدات `const`

```typescript
// ❌ Type is string[]
const colors = ['red', 'green', 'blue'];

// ✅ Type is readonly ['red', 'green', 'blue']
const colors = ['red', 'green', 'blue'] as const;

// Now this works
type Color = (typeof colors)[number]; // 'red' | 'green' | 'blue'
```

### توقيعات الفهارس

```typescript
// ❌ Too permissive
interface Data {
  [key: string]: any;
}

// ✅ More specific
interface Data {
  [key: string]: string | number | boolean;
  id: string; // Specific required props
  name: string;
}

// ✅ Even better: Use Records or Maps
type Data = Record<string, unknown>;
type StrictData = Map<string, string>;
```

## سير عمل التصحيح

إليك نهجًا منهجيًا لتصحيح أخطاء TypeScript:

1. **اقرأ رسالة الخطأ الفعليّة** (لا الخط الأحمر المتعرّج وحده)
2. **حدّد الأنواع المعنيّة** (أشر بفأرتك فوق المتغيّرات)
3. **تقفّي تدفّق النوع** (من أين جاء النوع؟)
4. **بسّط المشكلة** (استخرجها في مثال أصغر)
5. **استخدم التأكيدات النوعية مؤقتًا** (لتفهم المشكلة)
6. **أصلِح على الوجه الصحيح** (أرجِع التأكيدات، وأضف الأنواع السليمة)

```typescript
// Example debugging workflow
function debuggingWorkflow() {
  // Step 1: See error
  const result = complexFunction(data); // Error here

  // Step 2: Check types
  type DataType = typeof data; // Hover to see
  type ExpectedType = Parameters<typeof complexFunction>[0];

  // Step 3: Temporarily assert
  const debugResult = complexFunction(data as any);
  console.log('Shape:', debugResult);

  // Step 4: Fix properly
  const properData: ExpectedType = {
    ...data,
    missingField: 'default',
  };
  const fixed = complexFunction(properData);
}
```

## الخلاصة

قد تبدو أخطاء TypeScript مرهبةً في البداية، لكنها في الحقيقة أعزّ أصدقائك في التقاط الأعطال قبل بلوغها الإنتاج. والمفتاح هو تعلّم قراءتها منهجيًا، وفهم الأنماط الشائعة، ومعرفة الإصلاحات الصحيحة. وبالتقنيات في هذا الدليل، ستنتقل من اشمئزازك نحو أخطاء TypeScript إلى تقديرك للشبكة الأمنية التي توفّرها.

تذكّر: كل خطأ في TypeScript يمنع انهيارًا محتملًا وقت التشغيل. احتضنها، وتعلّم منها، ودعها ترشدك إلى كتابة تطبيقات React أفضل وأكثر أمانًا.
