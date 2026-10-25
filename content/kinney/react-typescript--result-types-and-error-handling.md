---
title: "أنواع النتيجة ومعالجة الأخطاء في React"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/result-types-and-error-handling"
---

يصعب الاستثناءات تمثيلها بالأنواع، والاختبار أصدَر منها. تجعل أنواع النتيجة/إما-أو (Result/Either) الإخفاقات صريحةً وتُبسّط المكوّنات (components).

## أساسيات neverthrow

```typescript
import { ok, err, Result } from 'neverthrow';

type User = { id: string; name: string };
type UserError = 'NotFound' | 'Network';

async function getUser(id: string): Promise<Result<User, UserError>> {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) return err('NotFound');
    return ok(await res.json());
  } catch {
    return err('Network');
  }
}
```

## أريحية الاستخدام في المكوّنات

```typescript
function UserCard({ result }: { result: Result<User, UserError> }) {
  return result.match({
    ok: (user) => <div>{user.name}</div>,
    err: (e) => <ErrorView code={e} />,
  });
}
```

## اتحادات أخطاء الإجراءات

استعمِل أنواعًا اتحادية قابلة للتمييز (discriminated unions) لنمذجة نتائج إجراء الخادم (server action) فيتبسّط فروع واجهة المستخدم ويضمن الشمولية (exhaustiveness).

```typescript
type CreateUserResult =
  | { status: 'success'; userId: string }
  | { status: 'validation-error'; issues: string[] }
  | { status: 'network-error' };

export async function createUserAction(fd: FormData): Promise<CreateUserResult> {
  try {
    const res = await fetch('/api/users', { method: 'POST', body: fd });
    if (res.status === 400) {
      const issues = (await res.json()).issues as string[];
      return { status: 'validation-error', issues };
    }
    if (!res.ok) return { status: 'network-error' };
    const { id } = await res.json();
    return { status: 'success', userId: id };
  } catch {
    return { status: 'network-error' };
  }
}
```

```typescript
function CreateUserForm() {
  const action = async (formData: FormData) => createUserAction(formData);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await action(new FormData(e.currentTarget));
    switch (result.status) {
      case 'success':
        // navigate
        break;
      case 'validation-error':
        // show issues
        break;
      case 'network-error':
        // retry UI
        break;
      default:
        const never: never = result; // exhaustiveness
        return never;
    }
  };
  return <form onSubmit={onSubmit}>{/* fields */}</form>;
}
```

## تحويل الاستثناءات إلى نتائج

```typescript
import { Result, err, ok } from 'neverthrow';

export async function wrap<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try {
    return ok(await fn());
  } catch (e) {
    return err(e as Error);
  }
}
```

## التحويل والتسلسل بالـ map

```typescript
const res = await getUser('123')
  .andThen((u) => (u ? ok(u) : err<'NotFound'>('NotFound')))
  .map((u) => u.name)
  .mapErr((e) => (e === 'NotFound' ? 'UserMissing' : 'Unknown')); // re-map domain errors
```
