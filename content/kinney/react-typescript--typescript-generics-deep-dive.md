---
title: "غوص عميق في الأنواع العامة (Generics) في TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/typescript-generics-deep-dive"
---

الأنواع العامة (Generics) هي القوة الخارقة في TypeScript لكتابة شيفرة قابلة لإعادة الاستخدام وآمنة نوعيًا. إنها تشبه معاملات الدوال، لكنها للأنواع. وحين تفهم الأنواع العامة فهمًا حقيقيًا، ستكتب شيفرة أقل تفعل أكثر، وستكون أكثر أمانًا من أي وقت مضى. لكن الأنواع العامة قد تبدو مخيفة بكل تلك الأقواس الزاوية ومعاملات الأنواع المجردة. دعنا نزيل الغموض عنها تمامًا.

فكّر في الأنواع العامة كقوالب أو مخططات. فكما يمكن لقالب البسكويت أن يصنع بسكويتًا من أي نوع من العجين مع الحفاظ على الشكل نفسه، تتيح لك الأنواع العامة كتابة أنماط شيفرة تعمل مع أي نوع مع الحفاظ على أمان الأنواع.

## فهم الأنواع العامة: النموذج الذهني

قبل الغوص في الصياغة، دعنا نبني النموذج الذهني الصحيح للتفكير في الأنواع العامة.

### المشكلة التي تحلها الأنواع العامة

```typescript
// Without generics, we duplicate code for different types
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstBoolean(arr: boolean[]): boolean | undefined {
  return arr[0];
}

// Or we lose type safety with any
function getFirstAny(arr: any[]): any {
  return arr[0]; // No type safety!
}

// With generics, we write once and preserve types
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript infers the type
const firstNumber = getFirst([1, 2, 3]); // number | undefined
const firstString = getFirst(['a', 'b', 'c']); // string | undefined
const firstUser = getFirst([{ name: 'Alice' }]); // { name: string } | undefined
```

### معاملات النوع تشبه معاملات الدالة

```typescript
// Regular function with value parameters
function add(a: number, b: number): number {
  return a + b;
}

// Generic function with type parameters
function identity<T>(value: T): T {
  return value;
}

// Multiple parameters work the same way
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// You can even have default type parameters
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const strings = createArray(3, 'hello'); // string[]
const numbers = createArray(3, 42); // number[]
const defaultStrings = createArray(3, 'hello'); // string[] (uses default)
```

## الدوال العامة

دعنا نستكشف أنماطًا مختلفة للدوال العامة.

### الدوال العامة الأساسية

```typescript
// Simple generic function
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Multiple type parameters
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped = swap(['hello', 42]); // [number, string]

// Generic arrow functions
const identity = <T>(value: T): T => value;

// In TSX files, use trailing comma to avoid JSX ambiguity
const identity2 = <T>(value: T): T => value;

// Generic function expressions
const processList: <T>(items: T[]) => T[] = (items) => {
  return items.filter(Boolean);
};
```

### قيود معاملات النوع

```typescript
// Unconstrained generics accept any type
function logLength<T>(value: T) {
  console.log(value.length); // ❌ Error: T might not have length
}

// Constrain T to types with a length property
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length); // ✅ Works!
  return value;
}

logLength('hello'); // Works: string has length
logLength([1, 2, 3]); // Works: array has length
logLength({ length: 5 }); // Works: has length property
logLength(123); // ❌ Error: number doesn't have length

// Multiple constraints
interface Timestamped {
  timestamp: number;
}

interface Named {
  name: string;
}

function processRecord<T extends Timestamped & Named>(record: T): T {
  console.log(`${record.name} at ${record.timestamp}`);
  return record;
}

// Using keyof for property constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'Alice', age: 30, city: 'NYC' };
const name = getProperty(person, 'name'); // string
const age = getProperty(person, 'age'); // number
const invalid = getProperty(person, 'height'); // ❌ Error: 'height' doesn't exist
```

### استنتاج الأنواع العامة

```typescript
// TypeScript infers type parameters when possible
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}

// No need to specify types - TypeScript infers them
const numbers = [1, 2, 3];
const strings = map(numbers, (n) => n.toString()); // string[]
const doubled = map(numbers, (n) => n * 2); // number[]

// Sometimes you need to help TypeScript
function createPair<T>(value: T): [T, T] {
  return [value, value];
}

// Explicit type argument
const pair1 = createPair<string | number>('hello');
// Type: [string | number, string | number]

// Inferred type
const pair2 = createPair('hello');
// Type: [string, string]

// Partial type argument inference (coming in future TypeScript)
function partialInfer<T, U = string>(t: T, u: U): [T, U] {
  return [t, u];
}
```

## الواجهات والأنواع العامة

تعمل الأنواع العامة مع الواجهات والأسماء المستعارة للأنواع أيضًا.

### الواجهات العامة

```typescript
// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// Implementation specifies the type
class StringContainer implements Container<string> {
  value: string = '';

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}

// Generic interface with multiple parameters
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = {
  key: 'age',
  value: 30
};

// Generic interface with constraints
interface Comparable<T> {
  compareTo(other: T): number;
}

interface SortedList<T extends Comparable<T>> {
  items: T[];
  add(item: T): void;
  getS orted(): T[];
}
```

### الأسماء المستعارة للأنواع العامة

```typescript
// Generic type alias
type Result<T> = { success: true; data: T } | { success: false; error: string };

function processData<T>(data: T): Result<T> {
  try {
    // Process data...
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Generic union types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

// Generic tuple types
type Pair<T> = [T, T];
type Triple<T> = [T, T, T];
type Tuple<T, N extends number> = T[] & { length: N };

// Generic function types
type Predicate<T> = (value: T) => boolean;
type Mapper<T, U> = (value: T) => U;
type Reducer<T, U> = (acc: U, value: T) => U;
```

## الأصناف العامة

يمكن أن تكون الأصناف عامة أيضًا، فتوفّر حاويات وهياكل بيانات آمنة نوعيًا.

### الأصناف العامة الأساسية

```typescript
// Generic class
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box<string>('hello');
const numberBox = new Box<number>(42);
const inferredBox = new Box('inferred'); // Box<string>

// Generic class with multiple type parameters
class Pair<T, U> {
  constructor(
    public first: T,
    public second: U,
  ) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const pair = new Pair('hello', 42);
const swapped = pair.swap(); // Pair<number, string>
```

### وراثة الأصناف العامة

```typescript
// Base generic class
abstract class Collection<T> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  abstract find(predicate: (item: T) => boolean): T | undefined;
}

// Derived class specifies type
class NumberCollection extends Collection<number> {
  find(predicate: (item: number) => boolean): number | undefined {
    return this.items.find(predicate);
  }

  sum(): number {
    return this.items.reduce((a, b) => a + b, 0);
  }
}

// Derived class remains generic
class SearchableCollection<T> extends Collection<T> {
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  findAll(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }
}
```

### الأعضاء الساكنة في الأصناف العامة

```typescript
class GenericClass<T> {
  // ❌ Static members cannot reference type parameters
  static staticValue: T; // Error!

  // ✅ Static members can be generic themselves
  static staticMethod<U>(value: U): U {
    return value;
  }

  // Instance members can use T
  instanceValue: T;

  constructor(value: T) {
    this.instanceValue = value;
  }
}

// Static factory pattern
class Factory<T> {
  static create<U>(value: U): Factory<U> {
    return new Factory(value);
  }

  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const factory = Factory.create('hello'); // Factory<string>
```

## أنماط الأنواع العامة المتقدمة

دعنا نستكشف أنماطًا أكثر تطورًا للأنواع العامة.

### الأنواع الشرطية مع الأنواع العامة

```typescript
// Basic conditional type
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string>; // false
type Test2 = IsArray<string[]>; // true

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type StringElement = ElementType<string[]>; // string
type NumberElement = ElementType<number[]>; // number
type NotArray = ElementType<string>; // never

// Conditional type with multiple conditions
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends boolean
      ? 'boolean'
      : T extends undefined
        ? 'undefined'
        : T extends Function
          ? 'function'
          : 'object';

type T1 = TypeName<string>; // "string"
type T2 = TypeName<() => void>; // "function"
type T3 = TypeName<string[]>; // "object"
```

### الأنواع المعيَّنة مع الأنواع العامة

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Transform property types
type Stringify<T> = {
  [P in keyof T]: string;
};

interface Person {
  name: string;
  age: number;
  active: boolean;
}

type StringPerson = Stringify<Person>;
// { name: string; age: string; active: string; }

// Conditional mapped types
type NullableProperties<T> = {
  [P in keyof T]: T[P] | null;
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

### قيود الأنواع العامة مع الأنواع الشرطية

```typescript
// Constrain based on type structure
type HasLength<T> = T extends { length: number } ? T : never;

function processWithLength<T extends HasLength<T>>(value: T): number {
  return value.length;
}

// Extract function return types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type StringReturn = ReturnType<() => string>; // string
type NumberReturn = ReturnType<() => number>; // number

// Extract promise types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Unwrapped1 = UnwrapPromise<Promise<string>>; // string
type Unwrapped2 = UnwrapPromise<string>; // string (not a promise)

// Recursive unwrapping
type DeepUnwrapPromise<T> = T extends Promise<infer U> ? DeepUnwrapPromise<U> : T;

type Nested = DeepUnwrapPromise<Promise<Promise<string>>>; // string
```

## التباين في الأنواع العامة

فهم التباين أمر بالغ الأهمية للاستخدام المتقدم للأنواع العامة.

### التباين المشترك والتباين المضاد

```typescript
// Covariance (outputs) - preserves subtype relationship
interface Producer<out T> {
  produce(): T;
}

class Animal {
  name: string = '';
}

class Dog extends Animal {
  breed: string = '';
}

// Dog producer can be used where Animal producer is expected (covariant)
const dogProducer: Producer<Dog> = {
  produce: () => new Dog(),
};

const animalProducer: Producer<Animal> = dogProducer; // ✅ OK

// Contravariance (inputs) - reverses subtype relationship
interface Consumer<in T> {
  consume(value: T): void;
}

// Animal consumer can be used where Dog consumer is expected (contravariant)
const animalConsumer: Consumer<Animal> = {
  consume: (animal: Animal) => console.log(animal.name),
};

const dogConsumer: Consumer<Dog> = animalConsumer; // ✅ OK

// Invariance (both input and output) - exact type match required
interface Processor<T> {
  process(value: T): T;
}

// Neither direction works
const animalProcessor: Processor<Animal> = {
  process: (animal: Animal) => animal,
};

const dogProcessor: Processor<Dog> = animalProcessor; // ❌ Error
```

### التباين الثنائي في معاملات الدوال

```typescript
// TypeScript is bivariant with method parameters by default
interface EventHandler<T> {
  handleEvent(event: T): void;
}

class MouseEvent {
  x: number = 0;
  y: number = 0;
}

class ClickEvent extends MouseEvent {
  button: number = 0;
}

// Both directions work (bivariant)
const mouseHandler: EventHandler<MouseEvent> = {
  handleEvent: (event: MouseEvent) => {},
};

const clickHandler: EventHandler<ClickEvent> = mouseHandler; // OK
const reverseHandler: EventHandler<MouseEvent> = clickHandler; // Also OK

// Use strictFunctionTypes for safer variance
```

## أفضل ممارسات الأنواع العامة

### استخدم أسماء وصفية لمعاملات النوع

```typescript
// ❌ Poor naming
function process<T, U, V>(t: T, u: U): V {
  // What do T, U, V represent?
}

// ✅ Good naming
function convert<TInput, TOutput>(input: TInput, converter: (value: TInput) => TOutput): TOutput {
  return converter(input);
}

// ✅ Common conventions
// T - Type
// K - Key
// V - Value
// E - Element
// P - Property
```

### ابدأ ببساطة، وأضف القيود عند الحاجة

```typescript
// Start with unconstrained generic
function processItem<T>(item: T): T {
  // Process...
  return item;
}

// Add constraints when needed
function processNamed<T extends { name: string }>(item: T): T {
  console.log(item.name);
  return item;
}

// Add more specific constraints
interface Identifiable {
  id: string;
}

interface Timestamped {
  timestamp: number;
}

function processRecord<T extends Identifiable & Timestamped>(record: T): T {
  console.log(`Processing ${record.id} at ${record.timestamp}`);
  return record;
}
```

### تجنّب الإفراط في التعميم

```typescript
// ❌ Too generic - hard to understand
type SuperGeneric<T, U, V, W> = T extends U ? (V extends W ? T & V : never) : U | W;

// ✅ Specific and clear
type Result<T> = { success: true; data: T } | { success: false; error: Error };

// ❌ Generic when not needed
function addNumbers<T extends number>(a: T, b: T): T {
  return (a + b) as T; // Unnecessary generic
}

// ✅ Simple and clear
function addNumbers(a: number, b: number): number {
  return a + b;
}
```

## أنماط الأنواع العامة في العالم الحقيقي

### نمط المستودع

```typescript
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

abstract class Repository<T extends Entity> {
  protected items: Map<string, T> = new Map();

  async findById(id: string): Promise<T | undefined> {
    return this.items.get(id);
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async save(entity: T): Promise<T> {
    entity.updatedAt = new Date();
    this.items.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  abstract validate(entity: T): boolean;
}

interface User extends Entity {
  name: string;
  email: string;
}

class UserRepository extends Repository<User> {
  validate(user: User): boolean {
    return user.email.includes('@');
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.findAll();
    return users.find((u) => u.email === email);
  }
}
```

### نمط باثّ الأحداث

```typescript
type EventMap = Record<string, any>;

class TypedEventEmitter<T extends EventMap> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const listeners = this.listeners[event];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}

// Usage with specific event types
interface AppEvents {
  login: { user: string; timestamp: number };
  logout: { user: string };
  error: { message: string; code: number };
}

const emitter = new TypedEventEmitter<AppEvents>();

emitter.on('login', (data) => {
  console.log(`${data.user} logged in at ${data.timestamp}`);
});

emitter.emit('login', { user: 'Alice', timestamp: Date.now() });
```

### نمط الباني

```typescript
class Builder<T> {
  private object: Partial<T> = {};

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.object[key] = value;
    return this;
  }

  build(): T {
    // In real code, validate that all required fields are set
    return this.object as T;
  }
}

interface Config {
  host: string;
  port: number;
  secure: boolean;
  timeout?: number;
}

const config = new Builder<Config>()
  .set('host', 'localhost')
  .set('port', 3000)
  .set('secure', false)
  .set('timeout', 5000)
  .build();
```

## أدوات الأنواع العامة

### إنشاء أدوات الأنواع الخاصة بك

```typescript
// DeepPartial - make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// DeepRequired - make all properties required recursively
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Mutable - remove readonly from all properties
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// PromiseType - extract the type from a Promise
type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

// AsyncReturnType - get return type of async function
type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never;

// Entries - get entries type of object
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

// ExcludeNull - remove null and undefined
type ExcludeNull<T> = T extends null | undefined ? never : T;

// FunctionKeys - get all function property keys
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
```

## المزالق الشائعة والحلول

### القيم الافتراضية لمعاملات النوع

```typescript
// ❌ Problem: Forgetting to specify generic type
class Container<T> {
  value?: T;
}

const container = new Container(); // Container<unknown> - not useful!

// ✅ Solution: Provide default type
class BetterContainer<T = any> {
  value?: T;
}

const container2 = new BetterContainer(); // Container<any> - more useful

// ✅ Even better: Meaningful defaults
class StringContainer<T = string> {
  value?: T;
}
```

### حراس الأنواع العامة

```typescript
// ❌ Problem: Type guards don't work with generics directly
function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

// ✅ Solution: Use unknown or specific constraints
function isArrayProper(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

// Or use overloads
function isArrayOf<T>(value: T | T[]): value is T[];
function isArrayOf(value: unknown): value is unknown[];
function isArrayOf(value: unknown): boolean {
  return Array.isArray(value);
}
```

## الأنواع العامة في مكونات React

تستفيد مكونات React استفادة هائلة من الأنواع العامة. دعنا نستكشف الأنماط الأساسية.

### خصائص المكوّن العام

يتبع تشريح مكوّن React العام نمطًا بسيطًا:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T) => string | number;
}

function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={getKey ? getKey(item) : index}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage - TypeScript infers the type
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  getKey={(user) => user.id}
/>
```

### مكونات النماذج العامة

ابنِ مكونات نماذج مرنة تعمل مع أي بنية بيانات:

```typescript
interface FormFieldProps<T, K extends keyof T> {
  value: T[K];
  onChange: (value: T[K]) => void;
  label: string;
  type?: 'text' | 'number' | 'email';
}

function FormField<T, K extends keyof T>({
  value,
  onChange,
  label,
  type = 'text'
}: FormFieldProps<T, K>) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T[K])}
      />
    </div>
  );
}

// Usage with type safety
interface User {
  name: string;
  age: number;
  email: string;
}

<FormField<User, 'name'>
  value={user.name}
  onChange={(name) => setUser({...user, name})}
  label="Name"
/>
```

### مكوّن القائمة المنسدلة العام

قائمة منسدلة قابلة لإعادة الاستخدام تعمل مع أي نوع بيانات:

```typescript
interface DropdownProps<T> {
  items: T[];
  value?: T;
  onChange: (value: T) => void;
  getLabel?: (item: T) => string;
  getValue?: (item: T) => string;
}

function Dropdown<T>({
  items,
  value,
  onChange,
  getLabel = String,
  getValue = String
}: DropdownProps<T>) {
  return (
    <select
      value={value ? getValue(value) : ''}
      onChange={(e) => {
        const selectedItem = items.find(
          item => getValue(item) === e.target.value
        );
        if (selectedItem) onChange(selectedItem);
      }}
    >
      {items.map((item, index) => (
        <option key={index} value={getValue(item)}>
          {getLabel(item)}
        </option>
      ))}
    </select>
  );
}

// Works with primitives and objects
<Dropdown<string>
  items={['apple', 'banana', 'cherry']}
  onChange={setFruit}
/>

<Dropdown<User>
  items={users}
  getLabel={(user) => user.name}
  getValue={(user) => user.id}
  onChange={setSelectedUser}
/>
```

### الخطافات المخصصة العامة

تستفيد الخطافات المخصصة استفادة كبيرة من الأنواع العامة لجلب البيانات القابل لإعادة الاستخدام:

```typescript
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Type-safe usage
const { data: users, loading, error } = useFetch<User[]>('/api/users');
```

### نمط السياق العام

أنشئ مزوّدات سياق قابلة لإعادة الاستخدام باستخدام الأنواع العامة:

```typescript
function createGenericContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error('useContext must be used within Provider');
    }
    return context;
  };

  return [Context.Provider, useContext] as const;
}

// Create specific contexts
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const [AuthProvider, useAuth] = createGenericContext<AuthContextType>();
```

### مكوّن النافذة المنبثقة العام

نافذة منبثقة مرنة تعمل مع أي نوع بيانات:

```typescript
interface ModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data?: T;
  renderContent: (data: T, onClose: () => void) => React.ReactNode;
  renderFooter?: (data: T, onClose: () => void) => React.ReactNode;
}

function Modal<T>({
  isOpen,
  onClose,
  title,
  data,
  renderContent,
  renderFooter
}: ModalProps<T>) {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>{title}</header>
        <main>{renderContent(data, onClose)}</main>
        {renderFooter && <footer>{renderFooter(data, onClose)}</footer>}
      </div>
    </div>
  );
}

// Type-safe modal usage
<Modal<User>
  isOpen={showUserModal}
  onClose={() => setShowUserModal(false)}
  title="Edit User"
  data={selectedUser}
  renderContent={(user) => <UserForm user={user} />}
  renderFooter={(user, onClose) => (
    <>
      <button onClick={onClose}>Cancel</button>
      <button onClick={() => saveUser(user)}>Save</button>
    </>
  )}
/>
```

## متى تستخدم الأنواع العامة

**استخدم الأنواع العامة عندما لديك:**

- أنماط متكررة عبر أنواع بيانات مختلفة (النماذج، والقوائم، والنوافذ المنبثقة)
- علاقات بين الأنواع تحتاج إلى الحفاظ عليها (يجب أن يطابق نوع الإدخال نوع الإخراج)
- أدوات مساعدة قابلة لإعادة الاستخدام تعمل مع أنواع متعددة (خطافات واجهات البرمجة، والتحقق، والتخزين)

**تجنّب الأنواع العامة عندما:**

- يكون المكوّن بسيطًا جدًا (الزر الأساسي لا يحتاج إلى أنواع عامة)
- تستخدمه في مكان واحد فقط (تضيف الأنواع العامة تعقيدًا بلا فائدة)
- تكون الأنواع غير مترابطة (لا تفرض الأنواع العامة حيث لا تنتمي)

## خاتمة

الأنواع العامة هي مفتاح كتابة شيفرة TypeScript قابلة لإعادة الاستخدام حقًا. فهي تتيح لك إنشاء تجريدات مرنة مع الحفاظ على أمان كامل للأنواع. من معاملات النوع البسيطة إلى الأنواع الشرطية والمعيَّنة المعقدة، تمنحك الأنواع العامة القدرة على التعبير عن علاقات نوعية متطورة.

مفتاح إتقان الأنواع العامة هو البدء ببساطة وإضافة التعقيد تدريجيًا حسب الحاجة. استخدم أسماء وصفية، وأضف القيود عندما تكون منطقية، وتذكّر أن الهدف هو جعل شيفرتك قابلة لإعادة الاستخدام وآمنة في آن واحد. بفضل الأنماط والتقنيات الواردة في هذا الدليل، أنت جاهز للاستفادة من الأنواع العامة إلى أقصى إمكاناتها في تطبيقات React وTypeScript.
