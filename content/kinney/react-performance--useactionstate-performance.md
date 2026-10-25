---
title: "أداء useActionState"
lang: ar
source: "https://stevekinney.com/courses/react-performance/useactionstate-performance"
---

النماذج والطفرات (mutations) هي الموضع الذي تصبح فيه تطبيقات React تقليديًا بطيئة ومربكة. يحلّ خُطّاف `useActionState` في React 19 بأناقة مشكلة تنسيق إدارة حالات الانتظار والنجاح والخطأ مع الحفاظ على أداء مكوّناتك. فبدلًا من نداءات `useState` المتناثرة وأعلام التحميل اليدوية، تحصل على خُطّاف واحد يتولّى دورة حياة الطفرة كاملة — مع تحسينات مدمجة تمنع عمليات التصيير غير الضرورية وتقدّم تغذية راجعة واضحة لتجربة المستخدم.

`useActionState` هو جواب React 19 على النمط الشائع لتغليف العمليات غير المتزامنة بحالات التحميل ومعالجة الأخطاء والتحديثات المتفائلة. فهو يستبدل الرقصة المطوّلة لخُطّافات `useState` المتعددة بواجهة برمجية ميسّرة تنسّق إجراءات الخادم وإرسالات النماذج والطفرات غير المتزامنة. اعتبره `useState` بقوى خارقة مصمَّمة خصيصًا للإجراءات التي تغيّر البيانات.

## الأسلوب التقليدي (ولماذا هو مؤلم)

قبل الغوص في `useActionState`، لننظر إلى ما كنّا نفعله سابقًا. إليك النمط النموذجي لمعالجة إرسال نموذج مع حالتي التحميل والخطأ:

```typescript
// ❌ The old way: verbose and error-prone
function UserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createUser(formData);
      setUser(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleSubmit}>
      {/* Form fields... */}
      {error && <div className="error">{error}</div>}
      <button disabled={isLoading}>{isLoading ? 'Creating...' : 'Create User'}</button>
    </form>
  );
}
```

لهذا الأسلوب عدة مشكلات:

1. **تحديثات حالة متعددة**: كل طفرة تُطلق 3-4 عمليات تصيير منفصلة
2. **كود متكرر في كل مكان**: النمط نفسه للتحميل والخطأ مكرّر عبر المكوّنات
3. **حالات تسابق**: يمكن للمستخدمين السريعين إطلاق إرسالات متعددة
4. **تجربة مستخدم غير متسقة**: حالات تحميل مختلفة في أنحاء تطبيقك

## ظهور `useActionState`

يجمع `useActionState` هذا النمط كله في خُطّاف واحد يدير دورة حياة الإجراء كاملة:

```typescript
// ✅ The new way: clean and performant
import { useActionState } from 'react';

function UserForm() {
  const [state, formAction] = useActionState(createUserAction, {
    user: null,
    error: null,
  });

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />

      {state.error && <div className="error">{state.error}</div>}

      <button disabled={state.pending}>{state.pending ? 'Creating...' : 'Create User'}</button>

      {state.user && <div>Welcome, {state.user.name}!</div>}
    </form>
  );
}
```

والسحر يحدث في دالة الإجراء نفسها:

```typescript
async function createUserAction(
  prevState: { user: User | null; error: string | null },
  formData: FormData,
): Promise<{ user: User | null; error: string | null }> {
  try {
    const user = await createUser(formData);
    return { user, error: null };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}
```

## مكاسب الأداء

### تصيير أقل وتجربة مستخدم أفضل

يُطلق الأسلوب التقليدي عمليات تصيير متعددة لكل طفرة:

1. ضبط التحميل على `true`
2. مسح الأخطاء السابقة
3. التحديث بالنجاح أو الخطأ
4. ضبط التحميل على `false`

يجمع `useActionState` هذه التحديثات في دورة تصيير واحدة. يعرف React أن `state.pending` مُدارة تلقائيًا، فيستطيع تحسين متى وكم مرة يُعيد تصيير مكوّنك.

### منع حالات التسابق المدمج

عندما ينقر المستخدمون أزرار الإرسال بسرعة (فقد مرّ بها جميعًا)، يمنع `useActionState` تلقائيًا التنفيذ المتزامن للإجراء نفسه. لا مزيد من الشيفرة الدفاعية أو التهدئة المخصّصة:

```typescript
// This just works—no extra race condition handling needed
const [state, formAction] = useActionState(slowNetworkAction, initialState);
```

### إمكانية وصول تلقائية

يوفّر الخُطّاف ميزات إمكانية وصول مدمجة عبر حالة `pending`. يمكن لقارئات الشاشة الإعلان عن حالات التحميل، وتحصل عناصر التحكم في النماذج تلقائيًا على خصائص `aria-*` المناسبة:

```typescript
<button disabled={state.pending} aria-busy={state.pending}>
  {state.pending ? 'Saving...' : 'Save Changes'}
</button>
```

## أنماط من الواقع العملي

### التحسين التدريجي مع إجراءات الخادم

يعمل `useActionState` بشكل رائع مع مكوّنات خادم React وإجراءات الخادم، فيوفّر التحسين التدريجي جاهزًا:

```typescript
// Server Action
async function updateProfileAction(
  prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Server-side validation
  if (!name || !email) {
    return {
      ...prevState,
      error: 'Name and email are required',
    };
  }

  try {
    const profile = await updateProfile({ name, email });
    revalidatePath('/profile'); // Update the cache
    return {
      profile,
      error: null,
      success: 'Profile updated successfully!',
    };
  } catch (error) {
    return {
      ...prevState,
      error: 'Failed to update profile',
    };
  }
}

// Client Component
function ProfileForm({ initialProfile }: { initialProfile: Profile }) {
  const [state, formAction] = useActionState(updateProfileAction, {
    profile: initialProfile,
    error: null,
    success: null,
  });

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.profile.name} placeholder="Your name" />
      <input name="email" defaultValue={state.profile.email} placeholder="your.email@example.com" />

      {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      <button disabled={state.pending}>{state.pending ? 'Updating...' : 'Update Profile'}</button>
    </form>
  );
}
```

> **نصيحة**
>
> تعمل إجراءات الخادم تلقائيًا دون JavaScript — وتظل نماذجك صالحة للعمل حتى لو فشل تحميل حزمة العميل.

### التحديثات المتفائلة

بالنسبة إلى الإجراءات التي يُرجَّح نجاحها (مثل تبديل مفضَّلة أو زيادة عدّاد)، يمكنك تنفيذ التحديثات المتفائلة بتحديث حالتك المحلية فورًا:

```typescript
async function toggleFavoriteAction(
  prevState: FavoriteState,
  formData: FormData,
): Promise<FavoriteState> {
  const postId = formData.get('postId') as string;
  const currentlyFavorited = prevState.favorited;

  // Optimistic update - assume success
  const optimisticState = {
    ...prevState,
    favorited: !currentlyFavorited,
    error: null,
  };

  try {
    await toggleFavorite(postId);
    return optimisticState;
  } catch (error) {
    // Revert on failure
    return {
      ...prevState,
      error: 'Failed to update favorite',
    };
  }
}

function FavoriteButton({ postId, initialFavorited }: FavoriteProps) {
  const [state, formAction] = useActionState(toggleFavoriteAction, {
    favorited: initialFavorited,
    error: null,
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <button disabled={state.pending} className={state.favorited ? 'favorited' : 'not-favorited'}>
        {state.favorited ? '❤️' : '🤍'}
        {state.pending && ' (updating...)'}
      </button>
      {state.error && <span className="error">{state.error}</span>}
    </form>
  );
}
```

### انتقالات حالة معقدة

لسير عمل أكثر تطورًا، يمكن لإجرائك أن يُعيد حالة مفصّلة تقود حالات واجهة مختلفة:

```typescript
type CheckoutState = {
  step: 'idle' | 'validating' | 'processing' | 'complete' | 'error';
  order: Order | null;
  error: string | null;
  validationErrors: Record<string, string>;
};

async function processCheckoutAction(
  prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  // Validation step
  const validation = validateCheckoutForm(formData);
  if (!validation.success) {
    return {
      ...prevState,
      step: 'error',
      validationErrors: validation.errors,
    };
  }

  // Processing step
  try {
    const order = await processPayment(formData);
    return {
      step: 'complete',
      order,
      error: null,
      validationErrors: {},
    };
  } catch (error) {
    return {
      ...prevState,
      step: 'error',
      error: 'Payment failed. Please try again.',
    };
  }
}
```

## أنماط شائعة وأفضل الممارسات

### أمان الأنواع مع الاتحادات المتمايزة

هيكل حالة إجرائك كاتحاد متمايز (discriminated union) لأمان أنواع أفضل وانتقالات حالة أوضح:

```typescript
type ActionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

async function createUserAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await createUser(formData);
    return { status: 'success', data: user };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### الدمج مع `useTransition`

للإجراءات التي لا تتضمن نماذج، ادمج `useActionState` مع `useTransition` لمزيد من التحكم:

```typescript
function UserList() {
  const [state, dispatch] = useActionState(fetchUsersAction, {
    users: [],
    error: null,
  });
  const [isPending, startTransition] = useTransition();

  const refreshUsers = () => {
    startTransition(() => {
      dispatch(new FormData()); // Trigger the action
    });
  };

  return (
    <div>
      <button onClick={refreshUsers} disabled={isPending || state.pending}>
        {isPending || state.pending ? 'Refreshing...' : 'Refresh Users'}
      </button>

      {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
      <UserTable users={state.users} />
    </div>
  );
}
```

> **تحذير**
>
> لا تفرط في استخدام `useActionState` لتحديثات الحالة التزامنية البسيطة. التزم بـ `useState` العادي للحالة الخاصة بالعميل وحدها التي لا تتضمن عمليات غير متزامنة.

### اختبار الإجراءات

اختبار `useActionState` مباشر، لأن الإجراءات مجرّد دوال غير متزامنة:

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('createUserAction', () => {
  it('should return success state on valid input', async () => {
    const mockCreateUser = vi.fn().mockResolvedValue({ id: '1', name: 'John' });

    const formData = new FormData();
    formData.set('name', 'John');
    formData.set('email', 'john@example.com');

    const result = await createUserAction({ user: null, error: null }, formData);

    expect(result.user).toEqual({ id: '1', name: 'John' });
    expect(result.error).toBeNull();
  });

  it('should return error state on failure', async () => {
    const mockCreateUser = vi.fn().mockRejectedValue(new Error('Network error'));

    const formData = new FormData();
    formData.set('name', 'John');

    const result = await createUserAction({ user: null, error: null }, formData);

    expect(result.user).toBeNull();
    expect(result.error).toBe('Network error');
  });
});
```

## استراتيجية الترحيل

يمكن الانتقال من الأنماط التقليدية إلى `useActionState` تدريجيًا:

### الخطوة 1: تحديد مكوّنات الإجراءات

ابحث عن المكوّنات ذات هذا النمط:

- نداءات `useState` متعددة للتحميل والخطأ والبيانات
- دوال غير متزامنة تحدّث متغيّرات حالة متعددة
- إرسالات نماذج مع حالات تحميل

### الخطوة 2: استخلاص دوال الإجراءات

انقل منطقك غير المتزامن إلى دوال إجراءات مستقلة:

```typescript
// Before
const handleSubmit = async (data) => {
  setLoading(true);
  setError(null);
  try {
    const result = await api.createUser(data);
    setUser(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// After
async function createUserAction(prevState, formData) {
  try {
    const result = await api.createUser(formData);
    return { user: result, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}
```

### الخطوة 3: استبدال إدارة الحالة

استبدل خُطّافات `useState` المتعددة بخُطّاف `useActionState` واحد:

```typescript
// Before
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [user, setUser] = useState(null);

// After
const [state, formAction] = useActionState(createUserAction, {
  user: null,
  error: null,
});
```

## اعتبارات الأداء

### متى تستخدم `useActionState`

يبدع `useActionState` في:

- **إرسالات النماذج** مع التحقق ومعالجة الأخطاء
- **إجراءات الخادم** التي تحتاج تحسينًا تدريجيًا
- **الطفرات** التي تؤثر في حالة الخادم
- **الإجراءات** ذات انتقالات الحالة المعقدة

### متى تلتزم بـ `useState`

أبقِ على استخدام `useState` من أجل:

- **التحديثات التزامنية البسيطة** (تبديل عناصر الواجهة، تحديث حقول النماذج)
- **الحالة الخاصة بالعميل** التي لا تتضمن طلبات شبكة
- **التحديثات عالية التكرار** التي لا تستحق فيها كلفة الإجراء الزائدة

### الذاكرة وحجم الحزمة

يضيف `useActionState` كلفة زائدة ضئيلة — فهو في جوهره `useReducer` متخصص مع معالجة غير متزامنة مدمجة. وعادةً تفوق مكاسب الأداء الناتجة عن تقليل عمليات التصيير الزيادة الصغيرة في حجم الحزمة.
