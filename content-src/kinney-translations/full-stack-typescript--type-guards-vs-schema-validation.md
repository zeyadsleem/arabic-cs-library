---
title: "حرّاس الأنواع والتحقّق عبر المخططات"
---

حرّاس الأنواع (type guards) طريقة لاستخدام منطق وقت التشغيل لتطمئن TypeScript بأن كائنًا معيّنًا هو فعلًا النوع الذي تظن أنه ينبغي أن يكونه. وإليك مثالًا سريعًا.

```typescript
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  side: number;
}

type Shape = Circle | Square;

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}

function calculateArea(shape: Shape) {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  return shape.side ** 2;
}
```

قد تكون نسخة سابقة مني ظنّت أنها *ذكية حقًا* حين صنعت حارس أنواع كهذا.

```typescript
// Define a type guard for User objects
function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.email === 'string'
  );
}
```

وبدلًا من ذلك، يمكنك أن تفعل شيئًا كهذا.

```typescript
// Runtime type checking can impact performance
function validateUser(data: unknown): User {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('username' in data) ||
    !('email' in data) ||
    typeof data.username !== 'string' ||
    typeof data.email !== 'string'
  ) {
    throw new ValidationError('Invalid user data');
  }

  return data as User;
}
```

مكتبات التحقّق بالمخططات مُحسّنة للأداء، ما يجعلها أفضل من التحقّق المكتوب يدويًا. لننظر إلى الفكرة نفسها، لكن باستخدام Zod.

```typescript
// More efficient with schema validation libraries
const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

function validateUser(data: unknown): User {
  return userSchema.parse(data);
}
```
