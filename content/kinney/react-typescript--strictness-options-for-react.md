---
title: "خيارات الصرامة في React"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/strictness-options-for-react"
---

الوضع الصارم في TypeScript لا يقتصر على إرضاء آلهة فحص الأنواع — إنه عن التقاط الأخطاء الدقيقة التي كانت ستبيد يوم ثلاثاء في الساعة الثالثة بعد الظهر لولاها. وحين تبني تطبيقات React، تتصرّف بعض خيارات الصرامة كأنها نظام إنذار مبكر من نوع أخطاء وقت التشغيل التي تجعل المستخدمين ينقرون بعيدًا ويجعل المهندسين يتساءلون عن خياراتهم في الحياة.

سنستكشف خيارات مُصرِّف TypeScript المحدّدة التي تمنحك أكبر عائد في مستودعات React، ونفهم لماذا تهمّ لثبات المكوّنات، ونرى أمثلة عملية على الأخطاء التي تمنعها. وفي النهاية، ستعرف أي الخيارات ينبغي تفعيلها أولًا وكيف تتبنّى إعدادات أكثر صرامة تدريجيًا من دون أن يتحوّل مستودعك إلى بحر من الخطوط المتعرّجة الحمراء الغاضبة.

## النقطة المثلى: خيارات الصرامة الأساسية

ليست جميع خيارات صرامة TypeScript متساوية. بعضها يلتقط أخطاء حرجة، وبعضها الآخر يبدو عملاً مملًا وإصرارًا على التفاصيل. وبالنسبة لتطبيقات React، تقدّم هذه الخيارات الأربعة أكبر قيمة:

### `strict: true` - الأساس

الخيار النووي الذي يفعّل معظم فحوص الصرامة دفعة واحدة. لكن إليك المسألة — من المرجّح أنك ترغب في تفعيل الخيارات الفردية تدريجيًا بدلًا من قلب هذا المفتاح في مستودع قائم (ما لم تكن تستمتع بتصحيح 400 خطأ في TypeScript).

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

هذا يفعّل عدة خيارات فرعية سنناقشها كلًا على حدة. للمشاريع الجديدة، ابدأ من هنا. أما القائمة منها، فواصل القراءة.

### `noImplicitAny: true` - توقّف عن تخمين الأنواع

هذا يمنع TypeScript من الرجوع إلى نوع `any` المرعب عندما لا يستطيع استنتاج ما قصدته. في عالم React، يلتقط هذا الخصائص التي ينبغي كتابتها بأنواع، ومعالِج الأحداث بلا توقيعات سليمة، وتلك الاستدعاءات الغامضة لـ `useState()`.

```typescript
// ❌ Without noImplicitAny - compiles but risky
function UserProfile({ user }) {
  // user is implicitly 'any' - no type safety
  return <div>{user.name}</div>;
}

// ✅ With noImplicitAny - forced to be explicit
interface User {
  name: string;
  email: string;
}

function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

العائد: ستلتقط الأخطاء الإملائية في أسماء الخصائص والخصائص الناقصة وتعارضات بنى البيانات قبل أن تصل إلى الإنتاج.

### `strictNullChecks: true` - تبنَّ حالة الـ null

هذا الخيار يغيّر قواعد اللعبة في تطبيقات React. فهو يجعل TypeScript يميّز بين `T` و`T | null | undefined`، ويجبرك على التعامل مع حقيقة أن البيانات قد لا توجد.

```typescript
// ❌ Without strictNullChecks - runtime error waiting to happen
interface Props {
  user?: User;
}

function UserProfile({ user }: Props) {
  // TypeScript thinks user.name is always safe
  return <div>Welcome, {user.name}!</div>;
}

// ✅ With strictNullChecks - forced to handle missing data
function UserProfile({ user }: Props) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}

// Or use optional chaining
function UserProfile({ user }: Props) {
  return <div>Welcome, {user?.name ?? 'Guest'}!</div>;
}
```

> **ملاحظة**
>
> يلتقط هذا الخيار أخطاء React أكثر من أي خيار آخر. فالخصائص الاختيارية واستجابات API التي قد تكون null والحالة غير المتزامنة — كلها تصبح أكثر أمانًا بكثير.

### `noImplicitReturns: true` - كل مسار يجب أن يُعيد قيمة

ينبغي لمكوّنات React أن تُعيد JSX (أو `null`) دائمًا. يضمن هذا الخيار أن كل مسار شيفري في دوالك يُعيد شيئًا ما، ما يمنع أخطاء «undefined is not valid JSX» المحيّرة.

```typescript
// ❌ Without noImplicitReturns - missing return in some branches
function ConditionalComponent({ shouldShow, data }: Props) {
  if (shouldShow) {
    return <div>{data}</div>;
  }
  // Oops - no return here! Returns undefined at runtime
}

// ✅ With noImplicitReturns - all paths covered
function ConditionalComponent({ shouldShow, data }: Props) {
  if (shouldShow) {
    return <div>{data}</div>;
  }
  return null; // Explicit early return
}
```

### `strictFunctionTypes: true` - أمان المعاملات

يضمن هذا أن معاملات الدوال تُفحص بصرامة أكبر. وهو مفيد خصوصًا لمعالِج الأحداث وخصائص الاستدعاء (callback props) في React.

```typescript
interface Props {
  onUserClick: (user: User) => void;
}

// ❌ Less strict - might accept incompatible functions
// Could accidentally pass a function expecting different params
function UserList({ onUserClick }: Props) {
  const handleClick = (event: MouseEvent) => {
    // Wrong signature but might compile without strictFunctionTypes
    onUserClick(event); // Runtime error!
  };
  // ...
}

// ✅ With strictFunctionTypes - catches parameter mismatches
function UserList({ onUserClick }: Props) {
  const handleClick = (user: User) => {
    onUserClick(user); // Type-safe
  };
  // ...
}
```

## استراتيجية التبنّي التدريجي

لا يلزم أن يكون تفعيل خيارات الصرامة في مستودع React قائم بالأمر المؤلم. إليك نهجًا مجرَّبًا:

### الخطوة 1: ابدأ بـ `noImplicitAny`

عادةً ما يكون لهذا الخيار أعلى نسبة أخطاء إلى قيمة. معظم الأخطاء تتعلق بإضافة تعليقات أنواع صريحة — مملّة لكن مباشرة.

```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

أصلح الأخطاء بإضافة واجهات خصائص مناسبة، وكتابة أنواع استدعاءات `useState`، ووضع تعليقات على معالِج الأحداث:

```typescript
// Before
const [user, setUser] = useState();

// After
const [user, setUser] = useState<User | null>(null);
```

### الخطوة 2: أضف `strictNullChecks`

هذا الخيار يتطلّب تفكيرًا أكثر لكنه يلتقط أكثر أخطاء وقت التشغيل. تعامل مع المكوّنات واحدًا تلو الآخر:

```typescript
// Common pattern: optional props become explicit
interface Props {
  user?: User; // Already nullable in the type
}

function UserProfile({ user }: Props) {
  // Now you must handle the undefined case
  return user ? <UserDetails user={user} /> : <LoginPrompt />;
}
```

### الخطوة 3: أضف الباقي طبقة فوق طبقة

بعد أن يتصفّن الخياران، أضف `noImplicitReturns` و`strictFunctionTypes`. فهما يُنتجان عادةً أخطاء أقل لكنهما يلتقطان حالات حدّية دقيقة.

## العقود والحلول في العالم الحقيقي

### فخّ الخاصية الاختيارية

أحد أكثر أخطاء `strictNullChecks` شيوعًا في React:

```typescript
interface Props {
  title?: string;
}

// ❌ Error: title might be undefined
function Header({ title }: Props) {
  return <h1>{title.toUpperCase()}</h1>;
}

// ✅ Handle the optional case
function Header({ title }: Props) {
  return <h1>{title?.toUpperCase() ?? 'Untitled'}</h1>;
}

// ✅ Or provide a default
function Header({ title = 'Untitled' }: Props) {
  return <h1>{title.toUpperCase()}</h1>;
}
```

### رقصة توقيع معالِج الحدث

قد تكون أنواع الدوال الصارمة عنيدة مع معالِج الأحداث:

```typescript
interface Props {
  onChange: (value: string) => void;
}

// ❌ Might not match if function types aren't strict
function Input({ onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange expects string, but we might pass the whole event
    onChange(e); // Type error with strictFunctionTypes
  };

  return <input onChange={handleChange} />;
}

// ✅ Extract the value explicitly
function Input({ onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Now matches the expected signature
  };

  return <input onChange={handleChange} />;
}
```

### أنماط تحميل البيانات غير المتزامنة

يتألق `strictNullChecks` مع الحالة غير المتزامنة:

```typescript
interface User {
  name: string;
  email: string;
}

function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
}

function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>; // Required with strictNullChecks

  return <div>Welcome, {user.name}</div>; // TypeScript knows user exists here
}
```

## ما وراء الأساسيات: خيارات الصرامة المتقدّمة

بعد أن ترتاح لإتقان الأساسيات، فكّر في خيارات المستخدم المتقدّم هذه:

### `exactOptionalPropertyTypes: true`

يجعل الخصائص الاختيارية اختيارية حقًا — فلا يمكنك تعيينها صراحةً إلى `undefined`:

```typescript
interface Props {
  title?: string;
}

// ❌ With exactOptionalPropertyTypes
const props: Props = { title: undefined }; // Error!

// ✅ Either include it or don't
const props: Props = { title: 'Hello' }; // OK
const props: Props = {}; // Also OK
```

### `noUncheckedIndexedAccess: true`

يجعل الوصول إلى عناصر المصفوفات والكائنات بمفاتيح أأمن:

```typescript
const items = ['a', 'b', 'c'];

// ❌ Without the option - assumes items[10] exists
const item = items[10]; // Type: string (but actually undefined!)

// ✅ With the option - acknowledges it might not exist
const item = items[10]; // Type: string | undefined
if (item) {
  // Now you must check before using
  console.log(item.toUpperCase());
}
```

## تقييم المقايضة

**مزايا خيارات الصرامة:**

- التقاط أخطاء وقت التشغيل وقت التجميع
- فرض التعامل الصريح مع الحالات الحدّية
- دعم أفضل لمحرّرات الشيفرة وأمان إعادة الهيكلة
- شيفرة توثّق نفسها (الأنواع تكشف النية)
- تصحيح أسهل (أخطاء «undefined is not a function» أقلّ)

**العيوب التي ينبغي قارنها:**

- جهد أولي للترحيل في المستودعات القائمة
- شيفرة أكثر إسهابًا (في بعض الأحيان)
- منحنى تعلّم لأعضاء الفريق الجدد على TypeScript الصارم
- إيجابيات كاذبة عرضية في مواضع تعرف فيها أكثر من المُصرِّف

**الأثر على الأداء:** ضئيل وقت التشغيل — معظم الصرامة تخصّ وقت التجميع فقط. والتكلفة الأساسية هي سرعة التطوير أثناء التبنّي.

## اتخاذ القرار

ابدأ بـ `noImplicitAny` و`strictNullChecks` في أي مستودع React. فهاتان الخياران يلتقطان أكبر عدد من الأخطاء بجهد معقول. أضف الباقي تدريجيًا مع راحة فريقك.

للمشاريع الجديدة، فعّل `strict: true` من اليوم الأول. فعبء التطوير يسدّد نفسه خلال أسابيع.

> **نصيحة**
>
> استخدم تعليقات `// @ts-expect-error` في الحالات النادرة التي تعرف فيها أنت أكثر من TypeScript، لكن أضف تعليقًا يشرح السبب.

الهدف ليس صفاء الأنواع لذاته — بل هو تسليم تطبيقات React لا تنكسر عندما يتفاعل المستخدمون معها بطرق لم تتوقّعها. وخيارات TypeScript الصارمة هي خط دفاعك الأول أمام فوضى عالم وقت التشغيل.
