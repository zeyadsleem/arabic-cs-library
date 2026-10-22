---
title: "React Query مع tRPC"
---

بناء طبقة بيانات آمنة النوع بالكامل بين واجهة React الأمامية وخادمك الخلفي هو من تلك الأشياء التي تبدو معقّدة، لكنها تصبح مدهشة في البساطة بمجرد أن تضع القطع في مواضعها. حين تجمع بين التخزين المؤقت القوي وإدارة الحالة في React Query وبين الأمان النوعي من الطرف إلى الطرف في tRPC، تحصل على شيء سحري: استنتاجًا كاملًا من TypeScript من دوال الخادم وصولًا إلى مكوّنات React، دون أي تعريفات أنواع يدوية.

إليك ما نحن بصدد حله: واجهات REST التقليدية تُلزمك بالحفاظ يدويًا على تزامن أنواع الواجهة الأمامية مع الأنواع الخلفية، ومفاتيح التخزين المؤقت في React Query مجرد نصوص (فمن السهل أن يخطئ فيها أحد)، وأنت تكتب باستمرار شيفرة متكرّرة لأنماط جلب البيانات. يزيل tRPC الانحراف النوعي بين العميل والخادم، بينما يتولى React Query كل فوضى إدارة الحالة غير المتزامنة — وحين يعملان معًا تصير طبقة بياناتك قويّة وآمنة النوع بالكامل في آن واحد.

## ما الذي يجعل tRPC مع React Query مميّزًا

قبل أن نغوص في التنفيذ، لنفهم لماذا هذا المزيج مقنع إلى هذا الحد:

**يمنحك tRPC**:

- أمانًا نوعيًا من الطرف إلى الطرف من الخادم إلى العميل
- شيفرة عميل مولَّدة تلقائيًا من موجّه الخادم (server router)
- لا مزيد من أنواع API يدوية ولا من الحاجة إلى مزامنة المخططات (schemas)
- أخطاء وقت ترجمة (compile-time) حين تتغير واجهات الخادم

**يضيف React Query**:

- تخزينًا مؤقتًا ذكيًا مع تحديثات خلفية تلقائية
- إلغاء تكرار الطلبات (request deduplication) وحالات تحميل صحيحة
- تحديثات متفائلة (optimistic updates) وإبطال الذاكرة المؤقتة
- معالجة أخطاء سليمة ومنطق إعادة المحاولة

معًا، يخلقان طبقة بيانات يستطيع محرّرك أن يكمل فيها أسماء دوال الخادم ومعاملاتها وأنواع إرجاعها تلقائيًا — بينما يتولى React Query كل التعقيد غير المتزامن في الخلفية.

## وضع الأساس

لنبدأ بإعداد tRPC بسيط. أولًا، ثبّت الاعتماديات:

```bash
# Server packages
npm install @trpc/server @trpc/client @trpc/react-query
npm install @tanstack/react-query zod

# If using Next.js
npm install @trpc/next
```

وهذا إعداد خادم tRPC أدنى:

```typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Example router with some procedures
export const appRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    // Your database call here
    return {
      id: input.id,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
    };
  }),

  getUsers: publicProcedure.query(async () => {
    // Return array of users
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      // Create user in database
      return {
        id: Math.random().toString(),
        ...input,
        createdAt: new Date(),
      };
    }),
});

export type AppRouter = typeof appRouter;
```

السحر هنا في نوع `AppRouter` — إذ سيستخدمه tRPC لتوليد شيفرة عميل مُنمَّطة بالكامل.

## إعداد العميل مع التكامل مع React Query

الآن لنجهّز جانب العميل. تكامل tRPC مع React Query يمنحك خُطّافات (hooks) تعمل تمامًا مثل React Query العادي، لكن مع أمان نوعي كامل:

```typescript
// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/trpc';

export const trpc = createTRPCReact<AppRouter>();
```

اضبط المزوّدات (providers) — يبدو هذا مثل إعداد React Query العادي إلى حد بعيد:

```typescript
// app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import { useState } from 'react';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc', // Your tRPC endpoint
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserDashboard />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

## استخدام استعلامات tRPC في المكوّنات

هنا يحدث السحر. يحصل مكوّناتك على خُطّافات مُنمَّطة بالكامل تعرف دوال الخادم لديك:

```typescript
// components/UserDashboard.tsx
import { trpc } from '../utils/trpc';

function UserDashboard() {
  // ✅ Fully typed query - IDE knows return type and loading states
  const { data: users, isLoading, error } = trpc.getUsers.useQuery();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserCard({ user }: { user: { id: string; name: string; email: string } }) {
  // Query with parameters - also fully typed
  const { data: userData, isLoading } = trpc.getUser.useQuery({
    id: user.id,
  });

  if (isLoading) return <div>Loading {user.name}...</div>;

  return (
    <div className="user-card">
      <h3>{userData?.name}</h3>
      <p>{userData?.email}</p>
      <small>Created: {userData?.createdAt.toLocaleDateString()}</small>
    </div>
  );
}
```

لاحظ أنه لا حاجة إلى أي كتابة يدوية للأنواع — فقد استنتج tRPC أنواع الإرجاع من موجّه الخادم لديك، ويقدّم React Query كل حالات التحميل ومعالجة الأخطاء.

## الطفرات مع التحديثات المتفائلة

تعمل طفرات tRPC بسلاسة تامّة مع أنماط التحديث المتفائلة في React Query:

````typescript
function CreateUserForm() {
  const utils = trpc.useUtils();

  const createUser = trpc.createUser.useMutation({
    // Optimistically update the cache
    onMutate: async (newUser) => {
      await utils.getUsers.cancel();

      const previousUsers = utils.getUsers.getData();

      // Optimistically add the new user
      utils.getUsers.setData(undefined, (old = []) => [
        ...old,
        {
          id: 'temp-' + Date.now(),
          ...newUser,
        },
      ]);

      return { previousUsers };
    },

    // If mutation fails, rollback
    onError: (err, newUser, context) => {
      utils.getUsers.setData(undefined, context?.previousUsers);
    },

    // Always refetch after error or success
    onSettled: () => {
      utils.getUsers.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createUser.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={createUser.isLoading}>
        {createUser.isLoading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

## Vanilla React Query: Typed Patterns

Even without tRPC, you can get strong typing with plain React Query by typing your fetchers, query keys, and error types.

```ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// 1) Typed fetchers + inferred data
async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as { id: string; name: string };
}

type InferPromise<T> = T extends Promise<infer U> ? U : never;
type UserData = InferPromise<ReturnType<typeof fetchUser>>; // { id: string; name: string }

// 2) Tuple query keys with const assertions for safety
const userKey = (id: string) => ['user', id] as const;

// 3) Typed error channel (e.g., Error)
function useUser(id: string): UseQueryResult<UserData, Error> {
  return useQuery<UserData, Error>({
    queryKey: userKey(id),
    queryFn: () => fetchUser(id),
    // Select can further transform types
    select: (u) => ({ ...u, display: u.name.toUpperCase() }),
    staleTime: 60_000,
  });
}

// Usage
const { data, error } = useUser('123');
````

- استخدم `as const` في مفاتيح الاستعلامات (query keys) لتبقيها حرفية ومستقرة.
- فضّل إعادة بيانات مُنمَّطة من دوال الجلب (fetchers) والاستنتاج عبر `ReturnType` أو مُساعد صغير اسمه `InferPromise`.
- حدّد معامل نوع الخطأ (error type parameter) afin تتّسق معالجة `error` في واجهة المستخدم.

## أنماط الاستعلام المتقدمة

### استعلامات الاعتمادية

أحيانًا تحتاج إلى سلسلة استعلامات — تجلب مستخدمًا ثم تجلب مقالاته:

```typescript
function UserWithPosts({ userId }: { userId: string }) {
  const { data: user } = trpc.getUser.useQuery({ id: userId });

  // Only fetch posts if we have a user
  const { data: posts, isLoading: postsLoading } = trpc.getUserPosts.useQuery(
    { userId },
    {
      enabled: !!user, // Dependent query pattern
    },
  );

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      {postsLoading ? (
        <div>Loading posts...</div>
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
```

### الاستعلامات اللانهائية

للترقيم الصفحي، ينسجم tRPC مع الاستعلامات اللانهائية في React Query:

```typescript
// Server procedure with cursor-based pagination
export const appRouter = router({
  getPostsPaginated: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
      }),
    )
    .query(async ({ input }) => {
      const posts = await getPosts({
        cursor: input.cursor,
        limit: input.limit + 1, // Get one extra to determine if there's more
      });

      const hasNextPage = posts.length > input.limit;
      const items = hasNextPage ? posts.slice(0, -1) : posts;

      return {
        items,
        nextCursor: hasNextPage ? items[items.length - 1].id : null,
      };
    }),
});
```

```typescript
// Client component with infinite scroll
function InfinitePostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.getPostsPaginated.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

## إدارة الذاكرة المؤقتة والإبطال

إحدى أقوى قدرات React Query هي الإدارة الذكية للذاكرة المؤقتة. ومع tRPC تحصل على أدوات مُنمَّطة لإدارة الذاكرة المؤقتة:

```typescript
function useUserActions(userId: string) {
  const utils = trpc.useUtils();

  const updateUser = trpc.updateUser.useMutation({
    onSuccess: (updatedUser) => {
      // Invalidate and refetch specific user
      utils.getUser.invalidate({ id: userId });

      // Update user in the users list cache
      utils.getUsers.setData(undefined, (oldUsers = []) =>
        oldUsers.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user)),
      );

      // Invalidate any related queries
      utils.getUserPosts.invalidate({ userId });
    },
  });

  const deleteUser = trpc.deleteUser.useMutation({
    onSuccess: () => {
      // Remove from all relevant caches
      utils.getUser.invalidate({ id: userId });
      utils.getUsers.invalidate();
      utils.getUserPosts.invalidate({ userId });
    },
  });

  return {
    updateUser,
    deleteUser,
  };
}
```

## التحسين عبر الجلب المسبق

يمكنك جلب البيانات مسبقًا قبل أن تلزم — وهو أمر ممتاز لحالات التمرير المؤشر (hover states) أو التنقّل المتوقّع:

```typescript
function UserListItem({ user }: { user: { id: string; name: string } }) {
  const utils = trpc.useUtils();

  const prefetchUserDetails = () => {
    // Prefetch user details on hover
    utils.getUser.prefetch({ id: user.id });
  };

  return (
    <div onMouseEnter={prefetchUserDetails} className="user-item">
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  );
}
```

وللتصيير على الخادم (server-side rendering) أو التوليد الساكن (static generation)، يمكنك جلب الاستعلامات مسبقًا:

```typescript
// In Next.js, prefetch during SSG/SSR
export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
  });

  await ssg.getUsers.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
```

## استراتيجيات معالجة الأخطاء

يتكامل tRPC مع معالجة الأخطاء في React Query، لكن يمكنك تخصيص سلوك الأخطاء:

```typescript
// Global error handling
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              // Don't retry 4xx errors, but retry 5xx
              if (error instanceof TRPCError && error.data?.httpStatus < 500) {
                return false;
              }
              return failureCount < 3;
            },
            onError: (error) => {
              console.error('Query error:', error);
              // Could show toast notification here
            },
          },
          mutations: {
            onError: (error) => {
              console.error('Mutation error:', error);
              // Handle mutation errors globally
            },
          },
        },
      }),
  );

  // ... rest of setup
}
```

```typescript
// Component-level error handling
function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    error,
    isError,
    refetch,
  } = trpc.getUser.useQuery(
    { id: userId },
    {
      retry: false, // Override global retry for this query
      onError: (error) => {
        if (error.data?.code === 'NOT_FOUND') {
          // Handle user not found specifically
          navigate('/users');
        }
      },
    },
  );

  if (isError) {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // ... rest of component
}
```

## اعتبارات الأداء

### تجميع الاستعلامات

يجمع tRPC تلقائيًا عدة استعلامات أُنشئت في نبضة زمنية واحدة:

```typescript
function Dashboard() {
  // These will be batched into a single request
  const { data: user } = trpc.getUser.useQuery({ id: '1' });
  const { data: posts } = trpc.getUserPosts.useQuery({ userId: '1' });
  const { data: notifications } = trpc.getNotifications.useQuery();

  // All three queries sent in one HTTP request!
}
```

### الإبطال الانتقائي

كن دقيقًا في إبطال الذاكرة المؤقتة لتتجنّب إعادة الجلب غير الضرورية:

```typescript
const createPost = trpc.createPost.useMutation({
  onSuccess: (newPost) => {
    // ✅ Good: Only invalidate queries that actually changed
    utils.getUserPosts.invalidate({ userId: newPost.authorId });

    // ❌ Avoid: Don't invalidate everything
    // utils.invalidate();
  },
});
```

### أنماط الاشتراك

للميزات الفورية (real-time)، يدعم tRPC الاشتراكات (subscriptions)، وإن كان ذلك يتطلب إعداد WebSocket:

```typescript
// Server
export const appRouter = router({
  onPostAdded: publicProcedure.subscription(() => {
    return observable<Post>((emit) => {
      // Set up WebSocket or SSE listener
      const unsubscribe = onNewPost((post) => {
        emit.next(post);
      });

      return unsubscribe;
    });
  }),
});
```

```typescript
// Client
function PostFeed() {
  const { data: posts } = trpc.getPosts.useQuery();

  // Subscribe to new posts
  trpc.onPostAdded.useSubscription(undefined, {
    onData: (newPost) => {
      utils.getPosts.setData(undefined, (oldPosts = []) => [newPost, ...oldPosts]);
    },
  });

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## أنماط البنية المعمارية في العالم الحقيقي

### تنظيم الاستعلامات

مع نمو تطبيقك، نظّم الاستعلامات ترتيبًا منطقيًا:

```typescript
// routers/users.ts
export const usersRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(/* ... */),

  getUserPosts: publicProcedure.input(z.object({ userId: z.string() })).query(/* ... */),

  updateUser: publicProcedure.input(UserUpdateSchema).mutation(/* ... */),
});

// routers/posts.ts
export const postsRouter = router({
  getPosts: publicProcedure.query(/* ... */),
  createPost: publicProcedure.mutation(/* ... */),
});

// Main router
export const appRouter = router({
  users: usersRouter,
  posts: postsRouter,
});
```

```typescript
// Usage with nested routers
const { data: user } = trpc.users.getUser.useQuery({ id: '1' });
const createPost = trpc.posts.createPost.useMutation();
```

### خُطّافات مخصّصة لمنطق العمل

غلّف أنماط الاستعلامات المعقّدة في خُطّافات مخصّصة:

```typescript
function useUserWithPosts(userId: string) {
  const userQuery = trpc.users.getUser.useQuery({ id: userId });
  const postsQuery = trpc.users.getUserPosts.useQuery({ userId }, { enabled: !!userQuery.data });

  return {
    user: userQuery.data,
    posts: postsQuery.data,
    isLoading: userQuery.isLoading || postsQuery.isLoading,
    error: userQuery.error || postsQuery.error,
    refetch: () => {
      userQuery.refetch();
      postsQuery.refetch();
    },
  };
}
```

## الأخطاء الشائعة والحلول

### الالتباس في مفاتيح الذاكرة المؤقتة

تذكّر أن tRPC يولّد مفاتيح الذاكرة المؤقتة بناءً على أسماء الإجراءات (procedure names) ومدخلاتها:

```typescript
// ❌ These create separate cache entries
trpc.getUser.useQuery({ id: '1' });
trpc.getUser.useQuery({ id: '1', includeProfile: true });

// ✅ Use consistent input shapes
const UserQueryInput = z.object({
  id: z.string(),
  includeProfile: z.boolean().default(false),
});
```

### الإبطال المفرط

تجنّب الإبطال الواسع جدًا:

```typescript
const updateUser = trpc.updateUser.useMutation({
  onSuccess: () => {
    // ❌ Bad: Invalidates all queries
    utils.invalidate();

    // ✅ Good: Surgical invalidation
    utils.users.getUser.invalidate({ id: userId });
    utils.users.getUserPosts.invalidate({ userId });
  },
});
```

### تسرّب الذاكرة مع الاشتراكات

نظّف الاشتراكات دائمًا:

```typescript
function useRealtimeData(userId: string) {
  useEffect(() => {
    const subscription = trpc.onUserUpdate.useSubscription(
      { userId },
      {
        onData: (data) => {
          // Handle update
        },
      },
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [userId]);
}
```

## الخطوات التالية

يولّد المزيج بين tRPC و React Query تجربة تطوير مذهلة وإنتاجية إلى حد بعيد — تحصل على أمان نوعي من الطرف إلى الطرف، وتخزينًا مؤقتًا ذكيًا، وكل أنماط إدارة الحالة غير المتزامنة التي تحتاجها. وحين تتقن الأساسيات، فكّر في استكشاف:

- **أنماط المصادقة** مع وسيط tRPC (tRPC middleware) للإجراءات المحميّة
- **رفع الملفات** ومعالجة البيانات غير بصيغة JSON عبر tRPC
- **مراقبة الأخطاء** لتتبّع فشل الاستعلامات في بيئة الإنتاج
- **أنماط ذاكرة مؤقتة متقدّمة** مثل تسخين الذاكرة المؤقتة (cache warming) والتحديثات الخلفية
- **استراتيجيات الاختبار** للمكوّنات التي تستخدم استعلامات tRPC

الفكرة المحورية هي أن جلب البيانات الآمن نوعيًا في العصر الحديث ليس مجرد منع للأخطاء (وإن كان يفعل ذلك بامتياز) — بل هو صنع تجربة تطوير تفهم فيها أدواتك تدفّق بياناتك، فتتمكن من بناء الميزات أسرع وبثقة أكبر.
