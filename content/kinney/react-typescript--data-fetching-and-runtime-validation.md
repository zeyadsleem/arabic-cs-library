---
title: "جلب البيانات والتحقّق وقت التشغيل"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/data-fetching-and-runtime-validation"
---

حين تجلب البيانات في React، يمنحك TypeScript أمانًا ممتازًا وقت التجميع — لكنّه لا يستطيع أن يضمن بشكل سحري أنّ الواجهة البرمجية التي تستدعيها تُعيد ما تتوقّعه. وهنا يأتي دور التحقّق وقت التشغيل، الذي يسدّ الفجوة بين التحليل الساكن في TypeScript وعالم البيانات الخارجية الفوضوي غير المتوقّع. وتجعل أنماط اللاتزامنية المحسّنة في React 19 هذا الأمر أكثر أهمية (لحسن الحظ، وبأناقة أكبر) في ضبطه.

وهنا التحدّي الجوهري: أنواع TypeScript ليست سوى تلميحات للمُصرِّف تختفي وقت التشغيل، لكنّ واجهاتك البرمجية قد تُعيد أي شيء — بيانات مشوّهة أو حقول ناقصة أو بنى لا تتوقّعها البتّة. وحرفٌ واحد خطأ في ترحيلٍ في الخادم، وفجأة يصبح `user.firstName` بقيمة `undefined`، فينهار شجرة مكوّناتك بالكامل بطرق لم ينبّهك إليها TypeScript يومًا.

## المشكلة مع تأكيدات النوع الساذجة

لنبدأ بما ينبغي ألّا تفعله. ربّما رأيت (أو كتبت) شيفرة كهذه:

```typescript
// ❌ Bad: Just assuming the API returns what you expect
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const user = (await response.json()) as User; // 🚨 Lying to TypeScript
  return user;
}
```

هذا النهج هشّ لأنّك تُجري تأكيد نوع غير آمن (`as User`) من دون أن تتحقّق فعليًا من مطابقة البيانات لتوقّعاتك. وحين يتغيّر الخادم لا محالة أو يُعيد استجابة خطأ، سينفجر مكوّنك بطرق غير متوقّعة.

## الدخول إلى التحقّق وقت التشغيل مع Zod

[Zod](https://zod.dev/) هو المعيار الذهبي للتحقّق من المخطّطات (schemas) في عالم TypeScript. فهو يتيح لك تعريف مخطّطات تتحقّق من البيانات وقت التشغيل *و* تستنتج أنواع TypeScript في آنٍ واحد — مصدرًا واحدًا للحقيقة بشأن أشكال بياناتك.

```bash
npm install zod
```

وهكذا نعيد كتابة جلب المستخدم لدينا مع تحقّق سليم:

```typescript
import { z } from 'zod';

// ✅ Good: Schema that validates and provides types
const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Must be a valid email'),
});

// Automatically infer the TypeScript type
type User = z.infer<typeof UserSchema>;

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const data = await response.json();

  // Runtime validation that throws on invalid data
  return UserSchema.parse(data);
}
```

هكذا تحصل الآن على أمان الأنواع وقت التجميع والتحقّق وقت التشغيل معًا. فإن أعادت الواجهة البرمجية بيانات مشوّهة، فإنّ Zod سيرمي خطأً وصفيًا بدلًا من أن يسمح للبيانات غير الصالحة بأن تُفسد حالة مكوّنك بصمت.

## التعامل مع التحقّق بأناقة

أحيانًا تريد التعامل مع فشل التحقّق بأسلوب أنيق أكثر من رمي الاستثناءات. في هذه الحالة تُعيد طريقة `safeParse` في Zod كائن نتيجة بدلًا من ذلك:

```typescript
async function fetchUserSafely(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    const result = UserSchema.safeParse(data);

    if (!result.success) {
      console.error('Validation failed:', result.error.errors);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

يتيح لك هذا النهج التعامل مع أعطال الشبكة وأخطاء HTTP وفشل التحقّق باستراتيجيات مختلفة — ربّما تُعيد المحاولة عند أخطاء الشبكة لكنّك تسجّل وتُعيد null عند فشل التحقّق.

## React 19 والخُطّاف `use`

يقدّم React 19 الخُطّاف التجريبي `use` الذي يستطيع استهلاك الوعود مباشرةً. وهذا يتوافق بسلاسة مع جلب البيانات المُتحقَّق منه:

```typescript
import { use, Suspense } from 'react';

// Promise that fetches and validates user data
function createUserPromise(id: string) {
  return fetchUser(id); // Our validated fetching function from above
}

function UserProfile({ userId }: { userId: string }) {
  // React 19's use hook consumes the promise
  const user = use(createUserPromise(userId));

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
```

وبما أنّ دالة `fetchUser` لدينا تتضمّن التحقّق بالفعل، فإنّ أي بيانات مشوّهة ستُجعل الوعد يُرفض، فتُطلق معالجة حدّ الأخطاء في React بدلًا من تصيير واجهة مكسورة.

> **تلميح**
>
> لا يزال الخُطّاف `use` تجريبيًا حتى الآن في React 19. وفي شيفرة الإنتاج، التزم بأنماط اللاتزامنية التقليدية أو بمكتبات مثل React Query حتى يستقرّ.

## بناء خُطّاف متين لجلب البيانات

لنجمع كل ذلك معًا في نمط قابل لإعادة الاستخدام يتعامل مع حالات التحميل والأخطاء والتحقّق:

```typescript
import { useState, useEffect } from 'react';
import { z } from 'zod';

type AsyncState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

function useValidatedFetch<T>(url: string, schema: z.ZodSchema<T>, dependencies: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'loading',
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setState({ status: 'loading', data: null, error: null });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const rawData = await response.json();
        const result = schema.safeParse(rawData);

        if (!result.success) {
          const errorMessage = result.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ');
          throw new Error(`Validation failed: ${errorMessage}`);
        }

        if (!cancelled) {
          setState({
            status: 'success',
            data: result.data,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return state;
}
```

والآن يمكنك استخدام هذا الخُطّاف في أي موضع تحتاج فيه إلى جلب بيانات مُتحقَّق منها:

```typescript
function UserProfile({ userId }: { userId: string }) {
  const userState = useValidatedFetch(`/api/users/${userId}`, UserSchema, [userId]);

  if (userState.status === 'loading') {
    return <div>Loading user...</div>;
  }

  if (userState.status === 'error') {
    return <div>Error: {userState.error}</div>;
  }

  const { data: user } = userState;

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## التعامل مع أشكال البيانات المعقّدة

غالبًا ما تُعيد الواجهات البرمجية في العالم الحقيقي كائنات متداخلة ومصفوفات وحقولًا اختيارية. وZod متميّز في التعامل مع هذه السيناريوهات المعقّدة:

```typescript
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
});

const DetailedUserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  address: AddressSchema.optional(), // Optional nested object
  tags: z.array(z.string()).default([]), // Array with default
  preferences: z.record(z.string(), z.unknown()).optional(), // Key-value pairs
  createdAt: z.string().transform((date) => new Date(date)), // Transform string to Date
});

type DetailedUser = z.infer<typeof DetailedUserSchema>;
```

وهذا المخطّط يتعامل مع:

- الكائنات المتداخلة (`address`)
- الحقول الاختيارية (`.optional()`)
- المصفوفات مع قيم افتراضية (`.default([])`)
- كائنات المفاتيح والقيم المرنة (`z.record()`)
- تحويلات البيانات (`.transform()`)
- التحقّق المخصّص عبر أنماط التعبيرات النمطية (regex)

## حدود الأخطاء لفشل التحقّق

وبما أنّ فشل التحقّق يمكن أن يحدث في أي لحظة أثناء جلب البيانات، ينبغي أن تغلّف مكوّنات جلب البيانات لديك بحدود أخطاء:

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class DataValidationBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Data validation error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            <h2>Data Error</h2>
            <p>The data from the server doesn't match what we expected.</p>
            <details>
              <summary>Technical details</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

غلّف مكوّناتك المعتمدة على البيانات:

```typescript
function App() {
  return (
    <DataValidationBoundary>
      <UserProfile userId="123" />
    </DataValidationBoundary>
  );
}
```

## اعتبارات الأداء

التحقّق وقت التشغيل يضيف بعض الحمل الزائد، لكنّه عادةً لا يُذكر مقارنةً بطلبات الشبكة. ومع ذلك، هناك بضع استراتيجيات تحسين:

### تحقّق مرّة واحدة ثم ثق

إذا كنت تمرّر بيانات مُتحقَّق منها عبر عدّة مكوّنات، فلا حاجة لك إلى إعادة التحقّق منها:

```typescript
// ✅ Good: Validate at the boundary, pass typed data down
function UserDashboard({ userId }: { userId: string }) {
  const userState = useValidatedFetch(`/api/users/${userId}`, UserSchema, [userId]);

  if (userState.status === 'success') {
    // userState.data is already validated - pass it down safely
    return (
      <>
        <UserHeader user={userState.data} />
        <UserDetails user={userState.data} />
        <UserActivity user={userState.data} />
      </>
    );
  }

  return <div>Loading...</div>;
}

// These components can trust the data is valid
function UserHeader({ user }: { user: User }) {
  return (
    <h1>
      {user.firstName} {user.lastName}
    </h1>
  );
}
```

### التخزين المؤقت للمخطّطات

للمخطّطات المستخدَمة كثيرًا، من المفيد التفكير في تخزين دوالّ التحقّق المُصرَّفة مؤقتًا:

```typescript
const schemaCache = new Map();

function getCachedSchema<T>(key: string, schema: z.ZodSchema<T>) {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, schema);
  }
  return schemaCache.get(key);
}
```

### التحقّق الجزئي
