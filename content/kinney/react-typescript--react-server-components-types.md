---
title: "أنواع مكوّنات خادم React"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/react-server-components-types"
---

تغيّر مكوّنات خادم React (React Server Components) جوهريًا الطريقة التي نفكّر بها في حدود العميل والخادم داخل تطبيقات React. بدلًا من تصيير كل شيء في جهة العميل وجلب البيانات عبر واجهات برمجية، تعمل بعض المكوّنات على الخادم، وبعضها في العميل، وبعضها يستطيع العمل في الاثنين حسب مكان استيرادها. هذه المرونة قوية، لكنها تأتي مع شرط: عليك أن تكون مقصودًا فيما يعبر الشبكة من بيانات، وكيف تفرض هذه الحدود باستخدام TypeScript.

سنستكشف كيف تنشئ عقودًا آمنة النوع بين مكوّنات الخادم والعميل، وتضمن أن يعمل التسلسل (serialization) للبيانات بشكل صحيح، وتلتقط مخالفات الحدود في وقت التصريف (compile time) بدلًا من وقت التشغيل. وفي النهاية، ستملك أنماطًا لبناء مكوّنات خادم React تكون سريعة ومتينة في آن واحد.

## فهم حدود المكوّنات

تقدّم مكوّنات خادم React ثلاثة أنواع من المكوّنات:

- **مكوّنات الخادم**: تعمل على الخادم فقط أثناء التصيير
- **مكوّنات العميل**: تعمل في المتصفح (تُوسَم بـ `"use client"`)
- **المكوّنات المشتركة**: يمكن أن تعمل في أي من البيئتين حسب مكان استيرادها

النقطة الصعبة أن البيانات المتدفقة بين هذه البيئات يجب أن تكون قابلة للتسلسل — لا دوال ولا نسخ أصناف ولا قيم أخرى غير قابلة لـ JSON. يمكن لـ TypeScript أن يساعد في فرض هذه القواعد، لكن عليك إعداد القيود المناسبة.

```typescript
// ✅ Server Component - runs on server
export default async function ProductList() {
  const products = await fetchProducts(); // Direct database access
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Client Component - runs in browser
('use client');
export function AddToCartButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  // ... interactive logic
}
```

يظهر التحدي عند تمرير البيانات بين هذه الحدود. لنجعل ذلك آمنًا النوع.

## إنشاء عقود أنواع قابلة للتسلسل

أولًا، نحتاج إلى أنواع تمثّل البيانات القابلة للتسلسل فقط. إليك نوعًا مساعدًا يُزيل القيم غير القابلة للتسلسل:

```typescript
// Utility type for serializable data
type Serializable =
  string | number | boolean | null | undefined | SerializableObject | SerializableArray;

type SerializableObject = { [Key in string]: Serializable };
type SerializableArray = ReadonlyArray<Serializable>;

// Helper to ensure a type is serializable
type EnsureSerializable<T> = T extends Serializable ? T : never;
```

الآن لنعرّف عقود بياناتنا:

```typescript
// Raw database/API types (server-only)
interface ProductEntity {
  id: string;
  name: string;
  price: number;
  createdAt: Date; // ❌ Not serializable
  updateInventory: (count: number) => Promise<void>; // ❌ Not serializable
}

// Serializable contract for client
export interface SerializableProduct {
  id: string;
  name: string;
  price: number;
  createdAt: string; // ✅ Serialized as ISO string
  // Functions are excluded
}

// Ensure our contract is actually serializable
type ValidProduct = EnsureSerializable<SerializableProduct>; // ✅ Compiles
```

هذا النمط يلتقط مشكلات التسلسل في وقت التصريف بدلًا من وقت التشغيل.

## حرّاس الأنواع الخاصة بالخادم والعميل

يمكننا إنشاء حدود أقوى باستخدام حلّ الوحدات (module resolution) في TypeScript والأنواع الموسومة (branded types):

```typescript
// server-only-types.ts
declare const SERVER_ONLY: unique symbol;
export interface ServerOnlyData {
  readonly [SERVER_ONLY]: true;
}

export interface DatabaseProduct extends ServerOnlyData {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  inventory: {
    count: number;
    updateCount(delta: number): Promise<void>;
  };
}
```

```typescript
// client-safe-types.ts
export interface ClientSafeProduct {
  id: string;
  name: string;
  price: number;
  createdAt: string; // Always serialized
  inventoryCount: number; // Flattened, no methods
}
```

الآن أنشئ دوال تحويل بحدود أنواع صريحة:

```typescript
// server/transforms.ts
import type { DatabaseProduct } from './server-only-types';
import type { ClientSafeProduct } from './client-safe-types';

export function toClientSafeProduct(serverProduct: DatabaseProduct): ClientSafeProduct {
  return {
    id: serverProduct.id,
    name: serverProduct.name,
    price: serverProduct.price,
    createdAt: serverProduct.createdAt.toISOString(),
    inventoryCount: serverProduct.inventory.count,
    // ✅ Methods and complex objects are stripped
  };
}

// This function signature prevents accidental server data leakage
export async function getProductsForClient(): Promise<ClientSafeProduct[]> {
  const serverProducts = await fetchProductsFromDatabase();
  return serverProducts.map(toClientSafeProduct);
}
```

## فرض حدود المكوّنات عبر الخصائص (props)

لننشئ أنواع غلاف تفرض الاستخدام الصحيح للخصائص:

```typescript
// Component boundary types
type ServerComponentProps<T = {}> = T & {
  children?: React.ReactNode;
};

type ClientComponentProps<T = {}> = EnsureSerializable<T> & {
  children?: React.ReactNode;
};

// Usage in components
export default async function ProductListServer(
  props: ServerComponentProps<{ category?: string }>
) {
  const { category } = props;
  const products = await getProductsForClient(); // Already serialized

  return (
    <div>
      {products.map(product => (
        <ProductClientCard key={product.id} product={product} />
      ))}
    </div>
  );
}

"use client";
export function ProductClientCard(
  props: ClientComponentProps<{ product: ClientSafeProduct }>
) {
  const { product } = props;
  // ✅ TypeScript ensures product is serializable
}
```

يكشف هذا الأسلوب مخالفات الخصائص في وقت التصريف:

```typescript
// ❌ TypeScript error - Date is not serializable
<ProductClientCard product={{
  id: "1",
  name: "Widget",
  createdAt: new Date() // Error!
}} />

// ✅ Compiles correctly
<ProductClientCard product={{
  id: "1",
  name: "Widget",
  createdAt: new Date().toISOString()
}} />
```

## التحقق في وقت التشغيل باستخدام Zod

للتطبيقات الإنتاج، ادمج TypeScript مع التحقق في وقت التشغيل باستخدام Zod:

```typescript
import { z } from 'zod';

// Zod schema for serializable data
const SerializableProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  createdAt: z.string().datetime(), // ISO string
  inventoryCount: z.number().int().min(0),
});

// Infer TypeScript type from schema
export type SerializableProduct = z.infer<typeof SerializableProductSchema>;

// Server-to-client boundary with validation
export function validateForClient<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error('Serialization validation failed:', result.error);
    throw new Error('Invalid data passed to client component');
  }

  return result.data;
}

// Usage in server component
export default async function ProductList() {
  const rawProducts = await fetchProductsFromDatabase();
  const safeProducts = rawProducts.map(product =>
    validateForClient(toClientSafeProduct(product), SerializableProductSchema)
  );

  return <ProductGrid products={safeProducts} />;
}
```

يمنحك هذا أمانًا في وقت التصريف وفي وقت_runtime معًا لحدود المكوّنات لديك.

## التعامل مع أنماط التسلسل المعقّدة

### الاتحاديات المُميَّزة (Discriminated Unions)

عند تمرير حالة معقّدة، استخدم الاتحاديات المُميَّزة للحفاظ على أمان النوع:

```typescript
type ClientSafeState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: SerializableProduct[] };

"use client";
export function ProductDisplay({
  state
}: ClientComponentProps<{ state: ClientSafeState }>) {
  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'error':
      return <ErrorMessage message={state.message} />;
    case 'success':
      return <ProductList products={state.products} />;
  }
}
```

### هياكل البيانات المتداخلة

للكائنات المتداخلة بعمق، أنشئ أدوات تسلسل تكرارية (recursive):

```typescript
type DeepSerializable<T> = T extends (infer U)[]
  ? DeepSerializable<U>[]
  : T extends Record<string, any>
    ? { [K in keyof T]: DeepSerializable<T[K]> }
    : T extends Date
      ? string
      : T extends Function
        ? never
        : T;

interface ComplexServerData {
  user: {
    profile: {
      createdAt: Date;
      preferences: {
        theme: string;
        notifications: boolean;
      };
    };
  };
}

type SafeComplexData = DeepSerializable<ComplexServerData>;
// Result: { user: { profile: { createdAt: string; preferences: { theme: string; notifications: boolean } } } }
```

## الأخطاء الشائعة وحلولها

### تمرير بيانات الخادم بالخطأ

```typescript
// ❌ Common mistake - passing server objects directly
export default async function BadExample() {
  const user = await fetchUser(); // Returns Date objects, methods
  return <ClientProfile user={user} />; // Runtime serialization error
}

// ✅ Explicit transformation
export default async function GoodExample() {
  const serverUser = await fetchUser();
  const clientSafeUser: ClientSafeUser = {
    id: serverUser.id,
    name: serverUser.name,
    joinedAt: serverUser.createdAt.toISOString(),
  };
  return <ClientProfile user={clientSafeUser} />;
}
```

### استيرادات خاصة ببيئة معيّنة

```typescript
// server-utils.ts - mark as server-only
import 'server-only'; // Prevents client bundling

export async function fetchUserFromDatabase(id: string) {
  // Database logic here
}

// client-utils.ts - mark as client-only
import 'client-only'; // Prevents server usage

export function trackUserInteraction(event: string) {
  // Browser-only analytics
}
```

> **تحذير**
>
> دائمًا ثبّت حزمتَي `server-only` و`client-only` لفرض حدود البيئة في وقت البناء.

## نمط تطبيق واقعي

إليك نمطًا كاملًا لتطبيق إنتاج:

```typescript
// types/contracts.ts
export interface UserContract {
  id: string;
  email: string;
  profile: {
    displayName: string;
    avatarUrl: string | null;
    joinedAt: string;
  };
}

// server/user-service.ts
import 'server-only';
import { UserContract } from '@/types/contracts';

export async function getUserForClient(id: string): Promise<UserContract> {
  const user = await db.user.findUnique({ where: { id } });

  return {
    id: user.id,
    email: user.email,
    profile: {
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      joinedAt: user.createdAt.toISOString(),
    },
  };
}

// components/UserProfile.server.tsx
import { getUserForClient } from '@/server/user-service';
import { UserProfileClient } from './UserProfile.client';

export default async function UserProfile({ userId }: { userId: string }) {
  const user = await getUserForClient(userId);
  return <UserProfileClient user={user} />;
}

// components/UserProfile.client.tsx
"use client";
import { UserContract } from '@/types/contracts';

export function UserProfileClient({
  user
}: {
  user: UserContract
}) {
  // Interactive client logic here
  return (
    <div>
      <h1>{user.profile.displayName}</h1>
      <p>Joined: {new Date(user.profile.joinedAt).toLocaleDateString()}</p>
    </div>
  );
}
```

يمنحك هذا النمط:

- ✅ أمانًا في وقت التصريف لعقود البيانات
- ✅ فصلًا واضحًا بين شأني الخادم والعميل
- ✅ حدود تسلسل صريحة
- ✅ تحققًا في وقت التشغيل عند الحاجة
- ✅ اختبارًا سهلًا لكل مكوّن على حدة

## الخطوات التالية

الآن وقد كانت لديك حدود آمنة النوع بين مكوّنات الخادم والعميل، يمكنك:

1. **أضف تحققًا في وقت التشغيل** بمخططات Zod لأمان الإنتاج
2. **أنشئ أدوات تحويل قابلة لإعادة الاستخدام** لأنماط التسلسل الشائعة
3. **اضبط قواعد ESLint** لالتقاط مخالفات الحدود أثناء التطوير
4. **ابنِ أدوات اختبار** تتحقّق من عقود التسلسل لديك

المفتاح هو الوضوح الصريح بشأن حدودك بدلًا من الأمل بأن تسلسل React «يعمل كما ينبغي». مع عقود TypeScript صحيحة، ستلتقط المشكلات في وقت التصريف وتُنشر مكوّنات خادم أكثر موثوقية.
