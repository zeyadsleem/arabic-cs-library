---
title: "الحوافّ، وSSR، وأنواع حمولات الترطيب"
---

قدرات التصيير من جانب الخادم (SSR) والبثّ (streaming) الحديثة في React 19 قوية، لكنها تأتي بتعقيدٍ خفي: فعليَ بياناتك أن تنجو من رحلة خطِرة من الخادم إلى العميل، مرورًا ببيئات تنفيذ (runtimes) متعددة وحدود تسلسل (serialization) ومراحل ترطيب (hydration). وإنّ اختلالًا صغيرًا في الأنواع—مثل كائن `Date` يغدو سلسلة نصّية، أو `undefined` يختفي كليًّا—قد يحوّل شيفرتك جهة الخادم المحدَّدة الأنواع على نحوٍ مثالي إلى كابوس عدم تطابق الترطيب (hydration mismatch) في العميل. لنستكشف كيف نبني أنواع حمولات ترطيب متينةً تعمل بسلاسة عبر دوال الحوافّ (edge functions)، وخوادم Node.js، وعملية ترطيب React.

## مشكلة حمولة الترطيب

الترطيب (hydration) هو عملية React في إحياء HTML المُصيَّر على الخادم بربطه مع معالجات الأحداث وجعله تفاعليًّا. لكن بينهما توجد خطوة حرجة: على بياناتك أن تُسلسَل (إلى JSON في الغالب)، وأن تُغرز في HTML، ثم يُفكّ تسلسلها وتمرَّر إلى مكوّنات (components) React.

في هذه العملية البسيطة ظاهريًّا تنهار تطبيقات كثيرة آمنة الأنواع:

```typescript
// ❌ Server code - looks perfectly typed
interface User {
  id: string;
  name: string;
  lastLogin: Date; // This is a Date object
  preferences?: {
    // This is optional
    theme: 'light' | 'dark';
  };
}

export async function getServerSideProps() {
  const user: User = await fetchUser();

  return {
    props: { user }, // TypeScript thinks this is safe
  };
}

// ❌ Client receives this after JSON serialization:
const actualClientData = {
  id: '123',
  name: 'Alice',
  lastLogin: '2025-01-06T12:00:00.000Z', // Now a string!
  // preferences disappeared (undefined was dropped)
};
```

يتوقّع مكوّن (component) العميل `User` فيه كائن `Date`، لكنه يستقبل سلسلة نصّية. ولا يُمسكه TypeScript لأنّ التسلسل يقع وقت التشغيل، ما يخلق عدم تطابق ترطيب.

## بناء أنواع آمنة التسلسل

يبدأ الحل بتصميم أنواع تراعي بوضوح حدّ التسلسل. وبدلًا من الأمل في أن تنجو أنواعك الغنية في الرحلة، صمّم أنواع حمل (payload) آمنة JSON بطبيعتها:

```typescript
import { z } from 'zod';

// ✅ JSON-serializable payload type
export const HydrationUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastLogin: z.string().datetime(), // ISO string, not Date
  preferences: z
    .object({
      theme: z.enum(['light', 'dark']),
    })
    .nullable(), // Explicit null instead of undefined
});

export type HydrationUser = z.infer<typeof HydrationUserSchema>;

// ✅ Rich client-side type (derived from payload)
export interface ClientUser {
  id: string;
  name: string;
  lastLogin: Date; // Converted back to Date on client
  preferences: {
    theme: 'light' | 'dark';
  } | null;
}
```

لاحظ الفروق الجوهرية في نوع حمولة الترطيب:

- الكائنات `Date` تغدو سلاسل ISO
- الخصائص الاختيارية تغدو `null` صريحةً (لأن JSON يُسقِط `undefined`)
- نستخدم Zod للتحقّق من البنية وقت التشغيل

## نمط عقد الترطيب

أنشئ عقودًا صريحة بين الخادم والعميل تُدير تحويلات الأنواع:

```typescript
// hydration-contract.ts
export class HydrationContract {
  static serializeUser(user: User): HydrationUser {
    return {
      id: user.id,
      name: user.name,
      lastLogin: user.lastLogin.toISOString(),
      preferences: user.preferences || null,
    };
  }

  static deserializeUser(payload: unknown): ClientUser {
    // Validate the payload shape first
    const validated = HydrationUserSchema.parse(payload);

    return {
      id: validated.id,
      name: validated.name,
      lastLogin: new Date(validated.lastLogin),
      preferences: validated.preferences,
    };
  }
}

// ✅ Server-side usage
export async function getServerSideProps() {
  const user = await fetchUser();

  return {
    props: {
      userPayload: HydrationContract.serializeUser(user)
    }
  };
}

// ✅ Client-side component
interface UserProfileProps {
  userPayload: HydrationUser;
}

export function UserProfile({ userPayload }: UserProfileProps) {
  // Safe deserialization with validation
  const user = useMemo(() => {
    try {
      return HydrationContract.deserializeUser(userPayload);
    } catch (error) {
      console.error('Invalid user payload:', error);
      return null;
    }
  }, [userPayload]);

  if (!user) return <div>Invalid user data</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Last login: {user.lastLogin.toLocaleDateString()}</p>
      <p>Theme: {user.preferences?.theme ?? 'not set'}</p>
    </div>
  );
}
```

## اعتبارات وقت التنفيذ في الحوافّ

تضيف دوال الحوافّ (edge functions) طبقة تعقيد إضافية. فهي تعمل في بيئة مقيَّدة بواجهات محدودة، وتحتاج حمولات الترطيب لديك إلى أن تكون خفيفة الوزن بوجهٍ خاصة. هكذا تبني عقود ترطيب محسّنة للحوافّ:

```typescript
// edge-safe-types.ts
import { z } from 'zod';

// ✅ Edge-optimized payload (minimal, serializable)
export const EdgeUserPayloadSchema = z.object({
  id: z.string(),
  name: z.string(),
  theme: z.enum(['light', 'dark']).nullable(),
  // Avoid complex nested objects that bloat payload size
  lastLoginTimestamp: z.number(), // Unix timestamp instead of ISO string
});

export type EdgeUserPayload = z.infer<typeof EdgeUserPayloadSchema>;

// ✅ Edge-safe contract
export class EdgeHydrationContract {
  // Validate environment compatibility
  static isEdgeCompatible(data: unknown): boolean {
    try {
      EdgeUserPayloadSchema.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  static serializeForEdge(user: User): EdgeUserPayload {
    return {
      id: user.id,
      name: user.name,
      theme: user.preferences?.theme || null,
      lastLoginTimestamp: user.lastLogin.getTime(),
    };
  }

  static deserializeFromEdge(payload: EdgeUserPayload): ClientUser {
    const validated = EdgeUserPayloadSchema.parse(payload);

    return {
      id: validated.id,
      name: validated.name,
      lastLogin: new Date(validated.lastLoginTimestamp),
      preferences: validated.theme ? { theme: validated.theme } : null,
    };
  }
}
```

## التعامل مع عدم تطابق الترطيب

حتى مع تحديد الأنواع بعناية، قد يقع عدم تطابق الترطيب. React 19 يوفّر أدوات أفضل للتعامل مع هذه الحالات بسلاسة:

```typescript
import { useSyncExternalStore } from 'react';

// ✅ Hook for safe hydration with mismatch detection
export function useHydratedUser(serverPayload: HydrationUser) {
  const [hydrationError, setHydrationError] = useState<string | null>(null);

  // Track hydration status
  const isHydrated = useSyncExternalStore(
    (callback) => {
      // Subscribe to hydration completion
      if (typeof window !== 'undefined') {
        callback();
      }
      return () => {};
    },
    () => typeof window !== 'undefined',  // Client value
    () => false  // Server value
  );

  const user = useMemo(() => {
    try {
      return HydrationContract.deserializeUser(serverPayload);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setHydrationError(`Hydration mismatch: ${errorMessage}`);

      // Log detailed debug info in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Hydration payload validation failed:', {
          error,
          payload: serverPayload,
          expected: 'HydrationUser schema'
        });
      }

      return null;
    }
  }, [serverPayload]);

  return { user, isHydrated, hydrationError };
}

// ✅ Component with graceful error handling
export function UserProfile({ userPayload }: UserProfileProps) {
  const { user, isHydrated, hydrationError } = useHydratedUser(userPayload);

  // Show loading state during hydration
  if (!isHydrated) {
    return <UserSkeleton />;
  }

  // Handle hydration errors gracefully
  if (hydrationError) {
    return (
      <ErrorBoundary
        fallback={<UserErrorFallback error={hydrationError} />}
        onError={(error) => {
          // Report to error tracking service
          reportHydrationError(error, userPayload);
        }}
      >
        <div>User data temporarily unavailable</div>
      </ErrorBoundary>
    );
  }

  if (!user) {
    return <div>No user data</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Last login: {user.lastLogin.toLocaleDateString()}</p>
      <p>Theme: {user.preferences?.theme ?? 'not set'}</p>
    </div>
  );
}
```

## تحسين الحمولات المتقدّم

قد تحتاج في التطبيقات المعقّدة إلى معالجة حمولات أكثر تطوّرًا:

### الحمولات المجزَّأة

قسّم حمولات الترطيب الكبيرة إلى قطع تُحمَّل تدرّجيًّا:

```typescript
// ✅ Chunked hydration for large datasets
export const UserPayloadChunkSchema = z.object({
  essential: z.object({
    id: z.string(),
    name: z.string(),
  }),
  preferences: z
    .object({
      theme: z.enum(['light', 'dark']),
      notifications: z.boolean(),
    })
    .optional(),
  activity: z
    .array(
      z.object({
        type: z.string(),
        timestamp: z.number(),
      }),
    )
    .optional(),
});

export function useChunkedUser(chunks: Partial<z.infer<typeof UserPayloadChunkSchema>>) {
  const [loadedChunks, setLoadedChunks] = useState(chunks);

  const loadChunk = useCallback(
    async (chunkName: keyof typeof chunks) => {
      if (loadedChunks[chunkName]) return;

      try {
        const chunk = await fetchUserChunk(chunkName);
        setLoadedChunks((prev) => ({ ...prev, [chunkName]: chunk }));
      } catch (error) {
        console.error(`Failed to load user chunk ${chunkName}:`, error);
      }
    },
    [loadedChunks],
  );

  return { loadedChunks, loadChunk };
}
```

### الحمولات المضغوطة

في دوال الحوافّ ذوات قيود الحجم، نفّذ ضغطًا للحمولات:

```typescript
// ✅ Compressed payloads for edge functions
export class CompressedHydrationContract {
  static compress(data: HydrationUser): string {
    // Simple compression strategy - remove nulls, use short keys
    const compressed = {
      i: data.id,
      n: data.name,
      l: data.lastLoginTimestamp,
      t: data.preferences?.theme,
    };

    return JSON.stringify(compressed);
  }

  static decompress(compressed: string): HydrationUser {
    try {
      const data = JSON.parse(compressed);

      return {
        id: data.i,
        name: data.n,
        lastLoginTimestamp: data.l,
        preferences: data.t ? { theme: data.t } : null,
      };
    } catch (error) {
      throw new Error(`Failed to decompress payload: ${error}`);
    }
  }
}
```

## اختبار حمولات الترطيب

لا تنسَ اختبار عقود الترطيب لديك اختبارًا شاملًا:

```typescript
// hydration-contract.test.ts
describe('HydrationContract', () => {
  const mockUser: User = {
    id: '123',
    name: 'Alice',
    lastLogin: new Date('2025-01-06T12:00:00.000Z'),
    preferences: { theme: 'dark' },
  };

  test('serializes and deserializes user correctly', () => {
    const serialized = HydrationContract.serializeUser(mockUser);
    const deserialized = HydrationContract.deserializeUser(serialized);

    expect(deserialized.id).toBe(mockUser.id);
    expect(deserialized.name).toBe(mockUser.name);
    expect(deserialized.lastLogin).toEqual(mockUser.lastLogin);
    expect(deserialized.preferences).toEqual(mockUser.preferences);
  });

  test('handles malformed payload gracefully', () => {
    const malformed = { id: 123, name: null, lastLogin: 'invalid-date' };

    expect(() => {
      HydrationContract.deserializeUser(malformed);
    }).toThrow();
  });

  test('survives JSON serialization round-trip', () => {
    const payload = HydrationContract.serializeUser(mockUser);
    const jsonString = JSON.stringify(payload);
    const parsed = JSON.parse(jsonString);
    const user = HydrationContract.deserializeUser(parsed);

    expect(user.lastLogin.getTime()).toBe(mockUser.lastLogin.getTime());
  });

  test('validates payload schema strictly', () => {
    const result = HydrationUserSchema.safeParse({
      id: '123',
      name: 'Alice',
      lastLogin: '2025-01-06T12:00:00.000Z',
      preferences: { theme: 'dark' },
      extraField: 'should-be-ignored', // This should be stripped
    });

    expect(result.success).toBe(false); // Strict validation
  });
});
```

## مثال تنفيذ من الواقع

هذا تنفيذ كامل يريك كل هذه الأنماط وهي تعمل معًا:

```typescript
// user-hydration-system.ts
import { z } from 'zod';

// Base schemas
const UserPreferencesSchema = z
  .object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  })
  .nullable();

const HydrationUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  lastLoginTimestamp: z.number(),
  preferences: UserPreferencesSchema,
});

// Runtime detection
function getTargetRuntime(): 'browser' | 'node' | 'edge' {
  if (typeof window !== 'undefined') return 'browser';
  if (typeof process !== 'undefined' && process.versions?.node) return 'node';
  return 'edge';
}

// Universal hydration contract
export class UniversalHydrationContract {
  private static runtime = getTargetRuntime();

  static serializeUser(user: User): z.infer<typeof HydrationUserSchema> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      lastLoginTimestamp: user.lastLogin.getTime(),
      preferences: user.preferences || null,
    };

    // Validate the payload before sending
    const result = HydrationUserSchema.safeParse(payload);
    if (!result.success) {
      throw new Error(`Invalid hydration payload: ${result.error.message}`);
    }

    return result.data;
  }

  static deserializeUser(payload: unknown): ClientUser {
    const validated = HydrationUserSchema.parse(payload);

    return {
      id: validated.id,
      name: validated.name,
      email: validated.email,
      lastLogin: new Date(validated.lastLoginTimestamp),
      preferences: validated.preferences,
    };
  }

  // Runtime-specific optimizations
  static optimizeForRuntime(payload: z.infer<typeof HydrationUserSchema>) {
    switch (this.runtime) {
      case 'edge':
        // Minimize payload size for edge functions
        return {
          i: payload.id,
          n: payload.name,
          e: payload.email,
          l: payload.lastLoginTimestamp,
          p: payload.preferences,
        };
      case 'node':
      case 'browser':
      default:
        return payload;
    }
  }
}

// ✅ API route handler (works everywhere)
export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get('id');
    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await fetchUser(userId);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const payload = UniversalHydrationContract.serializeUser(user);
    const optimized = UniversalHydrationContract.optimizeForRuntime(payload);

    return Response.json(optimized, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('User API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## الخلاصات الأساسية

يتطلّب بناء أنواع موثوقة لحمولات الترطيب تفكيرًا فيما وراء ضمانات TypeScript وقت التصريف:

1. **صمّم مع التسلسل**—ينبغي أن تكون أنواعك آمنة JSON بطبيعتها
2. **تحقّق وقت التشغيل**—استخدم Zod لالتقاط عدم مطابقة الحمولة قبل أن تُسبّب أخطاء ترطيب
3. **عالج الفرق بين `undefined` و`null`**—تسلسل JSON يُسقِط قيم `undefined`، فاستعمل `null` صريحةً
4. **راعِ بيئة تنفيذك**—قيود دوال الحوافّ مختلفة عن خوادم Node.js
5. **اختبر الرحلة كاملةً**—تحقّق أنّ حمولاتك تجتاز تحولات الخادم ← JSON ← العميل
6. **خطّط للأخطاء**—سوف تقع حالات عدم تطابق الترطيب؛ فتعامل معها بسلاسة

النتيجة تطبيقات React بأمان أنواعٍ صخريّ يعمل بسلاسة عبر أيّ هدف نشر (deployment)—سواء كنت تشغّل على خوادم تقليدية، أو دوال بلا خادم (serverless)، أو بيئات تنفيذ الحوافّ. لن يرى مستخدموك عدم تطابق ترطيب، وسيشكرك زملاؤك المطوّرون على عقود البيانات المتوقَّعة وسليمة الأنواع.
