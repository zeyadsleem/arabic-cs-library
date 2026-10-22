---
title: "التوجيه والمعاملات المُنوَّعة النوع"
---

عناوين URL هي واجهة برمجة الويب (API) للويب — تحمل البيانات والحالة والنوايا. لكنها افتراضيًا مجرد سلاسل نصية، ما يعني أن معامل `userId` عندك قد يكون `"definitely-not-a-number"` بينما يسمح لك TypeScript مرتاحًا أن تمرّره إلى دالة تتوقع عددًا. وهنا يأتي التوجيه المُنوَّع النوع (typed routing): طريقة تجعل عناوين URL آمنة الأنواع مثل بقية تطبيق React عندك، فيلتقط المعاملات غير المتطابقة عند وقت التصريف بدلًا من أن يتعثّر المستخدمون في صفحات مكسورة.

تدعم مكتبات التوجيه الحديثة في React كلٌّ من [React Router v6.4+](https://reactrouter.com/) و[TanStack Router](https://tanstack.com/router) و[Next.js 13+ App Router](https://nextjs.org/docs/app) شكلًا ما من التوجيه الآمن الأنواع. سنتكشف كيف تقيّد معاملات المسار، وتتحقق من معاملات البحث (search parameters)، وتضمن ألا تتلقى محمّلات بياناتك (data loaders) أنواعًا غير متوقعة أبدًا — لأن أحدًا لا يريد في الثانية فجرًا تصحيح سبب إرجاع `parseInt("banana")` قيمة `NaN`.

## مشكلة التوجيه القائم على السلاسل النصية

يتعامل التوجيه التقليدي مع كل شيء بوصفه سلاسل نصية. تأمّل هذه التهيئة النمطية من React Router:

```typescript
// ❌ No type safety here
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams(); // userId is string | undefined

  // This could blow up if userId is "not-a-number"
  const id = parseInt(userId!); // Non-null assertion = danger

  return <div>User {id}</div>;
}
```

المشاكل واضحة:

- قد يكون `userId` قيمة `undefined` أو سلسلة نصية مشوّهة
- تُخفي التأكيدات النوعية (`!`) أخطاء وقت التشغيل المحتملة
- لا ضمانًا عند وقت التصريف بوجود معامل المسار
- ومعاملات البحث فهي «غرب بريّ»™ بمعنى الحرف

## تهيئة مسارات مُنوَّعة الأنواع بواسطة React Router

لنبدأ بـ React Router لأنه الأوسع استخدامًا. سنستخدم [Zod](https://zod.dev/) للتحقّق وقت التشغيل والاستنتاج النوعي (type inference) — اتحاد مثالي بين أمان التصريف وأمان التشغيل.

```bash
npm install react-router-dom zod
npm install -D @types/react-router-dom
```

لننشئ أولًا مخططًا لمعاملات مساراتنا:

```typescript
import { z } from 'zod';

// Define schemas for different route parameter patterns
export const userParamsSchema = z.object({
  userId: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().positive()),
});

export const postParamsSchema = z.object({
  userId: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().positive()),
  postId: z.string().uuid(),
});

// Generate TypeScript types
export type UserParams = z.infer<typeof userParamsSchema>;
export type PostParams = z.infer<typeof postParamsSchema>;
```

يمكننا الآن إنشاء خُطّاف مُنوَّع يتحقق من المعاملات:

```typescript
import { useParams } from 'react-router-dom';
import { z } from 'zod';

function useTypedParams<T>(schema: z.ZodSchema<T>): T {
  const params = useParams();

  const result = schema.safeParse(params);

  if (!result.success) {
    // In a real app, you might want to redirect to a 404 page
    throw new Error(`Invalid route parameters: ${result.error.message}`);
  }

  return result.data;
}

// Usage in components
function UserProfile() {
  const { userId } = useTypedParams(userParamsSchema); // userId is number!

  return <div>User {userId}</div>;
}

function PostDetail() {
  const { userId, postId } = useTypedParams(postParamsSchema);
  // userId is number, postId is string (valid UUID)

  return (
    <div>
      Post {postId} by User {userId}
    </div>
  );
}
```

## التعامل مع معاملات البحث

معاملات البحث (سلاسل الاستعلام) أصعب تصرّفًا لأنها اختيارية وقد تحمل قيمًا عدّة. لنبنِ حلًّا مُنوَّع النوع:

```typescript
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

// Schema for search parameters with sensible defaults
export const searchParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .pipe(z.number().min(1).default(1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .pipe(z.number().min(1).max(100).default(10)),
  sort: z.enum(['date', 'title', 'author']).optional().default('date'),
  search: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

function useTypedSearchParams<T>(schema: z.ZodSchema<T>): [T, (updates: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URLSearchParams to plain object
  const paramsObject = Object.fromEntries(searchParams.entries());

  const result = schema.safeParse(paramsObject);

  const validatedParams = result.success ? result.data : schema.parse({}); // Use defaults if validation fails

  const updateParams = (updates: Partial<T>) => {
    const newParams = { ...validatedParams, ...updates };

    // Convert back to URLSearchParams, filtering out undefined values
    const urlParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(key, String(value));
      }
    });

    setSearchParams(urlParams);
  };

  return [validatedParams, updateParams];
}

// Usage
function PostsList() {
  const [searchParams, setSearchParams] = useTypedSearchParams(searchParamsSchema);

  // All parameters are properly typed with defaults applied
  const { page, limit, sort, search } = searchParams;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div>
      <input
        value={search || ''}
        onChange={(e) => setSearchParams({ search: e.target.value })}
        placeholder="Search posts..."
      />
      <select
        value={sort}
        onChange={(e) => setSearchParams({ sort: e.target.value as SearchParams['sort'] })}
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      {/* Your posts list here */}
    </div>
  );
}
```

## تعريفات مسارات مُنوَّعة الأنواع

لمزيد من أمان الأنواع، لنبنِ نظامًا تضم فيه تعريفاتُ المسارات مخططات معاملاتها:

```typescript
import { z } from 'zod';

// Route definition with embedded schemas
export const routes = {
  home: {
    path: '/',
    params: z.object({}),
    search: z.object({}),
  },
  user: {
    path: '/users/:userId',
    params: userParamsSchema,
    search: z.object({}),
  },
  post: {
    path: '/users/:userId/posts/:postId',
    params: postParamsSchema,
    search: searchParamsSchema,
  },
} as const;

// Type-safe navigation helper
function createTypedNavigate() {
  const navigate = useNavigate();

  return <K extends keyof typeof routes>(
    route: K,
    params: z.infer<(typeof routes)[K]['params']>,
    search?: z.infer<(typeof routes)[K]['search']>,
  ) => {
    let path = routes[route].path;

    // Replace path parameters
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });

    // Add search parameters
    if (search && Object.keys(search).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(search).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.set(key, String(value));
        }
      });
      path += `?${searchParams.toString()}`;
    }

    navigate(path);
  };
}

// Usage
function SomeComponent() {
  const typedNavigate = createTypedNavigate();

  const goToUserPost = () => {
    typedNavigate(
      'post',
      { userId: 123, postId: 'uuid-here' }, // ✅ Typed parameters
      { page: 2, sort: 'title' }, // ✅ Typed search params
    );
  };

  return <button onClick={goToUserPost}>View Post</button>;
}
```

## محمّلات بيانات مُنوَّعة النوع

إن كنت تستخدم ميزات تحميل البيانات في React Router، فيمكنك أن تُنوّع محمّلاتك أيضًا:

```typescript
import { LoaderFunctionArgs } from 'react-router-dom';

// Typed loader function
export async function userLoader({ params }: LoaderFunctionArgs) {
  // Validate parameters at the loader level
  const { userId } = userParamsSchema.parse(params);

  const user = await fetchUser(userId); // userId is guaranteed to be a number

  if (!user) {
    throw new Response('User not found', { status: 404 });
  }

  return user;
}

// Type-safe data access in components
function UserProfile() {
  const user = useLoaderData() as Awaited<ReturnType<typeof userLoader>>;

  return <div>Welcome, {user.name}!</div>;
}
```

> **نصيحة**
>
> لمزيد من الاستنتاج النوعي مع المحمّلات، خُذ في الحسبان مكتبات مثل [Remix](https://remix.run/) أو [TanStack Router](https://tanstack.com/router)، فهي تقدّم دعمًا من الطبقة الأولى لـ TypeScript في تحميل البيانات.

## الأمان النوعي الكامل بواسطة TanStack Router

إن أردت ذروة أمان الأنواع في التوجيه، فإن TanStack Router يقدّم أمانًا نوعيًا من الطرف إلى الطرف (end-to-end) جاهزًا مباشرة:

```typescript
import { createRoute, createRouter } from '@tanstack/react-router';
import { z } from 'zod';

// Define route with built-in validation
const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  validateSearch: z.object({
    tab: z.enum(['posts', 'followers', 'following']).optional(),
  }),
  component: UserProfile,
});

function UserProfile() {
  const { userId } = userRoute.useParams(); // Fully typed!
  const { tab } = userRoute.useSearch(); // Also typed!

  return (
    <div>
      User {userId} - Tab: {tab || 'posts'}
    </div>
  );
}
```

يولّد TanStack Router الأنواع تلقائيًا ويلتقط أخطاء التوجيه عند وقت التصريف. وهو أقوى ما يكون في التطبيقات المركّبة التي يكون أمان الأنواع فيها جوهريًا.

## اعتبارات من الواقع العملي

### أثر الأداء

يطرأ التحقق من المعاملات عند كل تغييرٍ للمسار، فأبقِ المخططات خفيفة الوزن:

```typescript
// ✅ Good: Simple transformations
const simpleSchema = z.object({
  id: z.string().transform(Number),
});

// ❌ Avoid: Complex async validations in route parameters
const heavySchema = z.object({
  id: z.string().refine(async (id) => await validateInDatabase(id)),
});
```

### حدود الأخطاء (Error Boundaries)

غلّف مكوّنات توجيهك بحدود أخطاء لتتعامل مع إخفاقات التحقق برفق:

```typescript
function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<div>Invalid route parameters</div>}
      onError={(error) => {
        console.error('Route validation error:', error);
        // Log to your error tracking service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### التوافق مع الإصدارات السابقة

إن كنت تضيف أمان الأنواع إلى تطبيق قائم، فاستخدم التحسين التدريجي (progressive enhancement):

```typescript
function useTypedParamsWithFallback<T>(schema: z.ZodSchema<T>) {
  const params = useParams();

  const result = schema.safeParse(params);

  if (result.success) {
    return { data: result.data, isValid: true };
  }

  // Fall back to raw params for backward compatibility
  console.warn('Route params validation failed, using raw params:', result.error);
  return { data: params as T, isValid: false };
}
```

## اختبار المسارات المُنوَّعة

المسارات الآمنة الأنواع أسهل اختبارًا لأنك تعرف تمامًا شكل البيانات الذي تتوقعه:

```typescript
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

test('renders user profile with valid params', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/users/:userId',
        element: <UserProfile />,
      },
    ],
    {
      initialEntries: ['/users/123'],
    },
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByText('User 123')).toBeInTheDocument();
});

test('handles invalid user ID', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/users/:userId',
        element: <UserProfile />,
        errorElement: <div>Invalid user ID</div>,
      },
    ],
    {
      initialEntries: ['/users/not-a-number'],
    },
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Invalid user ID')).toBeInTheDocument();
});
```

## الخطوات التالية

يحوّل التوجيه المُنوَّع عناوين URL من سلاسل نصية كثير الغلط إلى عقود بيانات موثوقة مُتحقَّقة. ابدأ بالصغير — أضف التحقق من المعاملات أولًا إلى مساراتك الأكثر جوهرية، ثم وسّع النظام كلما رأيت المنافع.

فكّر في هذه التحسينات كلما نما توجيهك:

- **تقسيم الشيفرة حسب المسار** مع تحميل خامل (lazy loading) مُنوَّع
- **عناوين URL صديقة لمحركات البحث** مع التحقق من الـ slug وتحويله
- **توجيه متعدّد اللغات** مع مخططات معاملات واعية ببيئة اللغة (locale)
- **اندماج في التحليلات (analytics)** يتتبّع انتقالات المسارات المُنوَّعة

الغاية ليست الكمال في اليوم الأول، بل بناء نظام يلتقط المزيد من الأخطاء عند وقت التصريف ويجعل منطق توجيهك أكثر قابلية للتنبّؤ. وستشكرك نفسُك المستقبليّة (ومستخدموك معها) حين لا يروا بعد اليوم خطأً آخر من جنس «Cannot read property of undefined» نتيجة معاملاتٍ مُشوَّهة لعنوان URL.
