---
title: "Hono Stacks"
book: hono
chapter: concepts
slug: stacks
order: 27
source: https://hono.dev/docs/concepts/stacks
lang: ar
---

يجعل Hono الأمور السهلة سهلة والصعبة سهلة.
إنه مناسب ليس فقط لإرجاع JSON، بل إنه رائع أيضًا لبناء تطبيق كامل المكدس (full-stack) بما في ذلك خوادم REST API والعميل.

## RPC

تتيح لك ميزة RPC في Hono مشاركة مواصفات API مع تغيير بسيط في الكود الخاص بك.
العميل الناتج عن `hc` سيقرأ المواصفة (spec) ويصل إلى نقطة النهاية بأمان الأنواع (type-safety).

المكتبات التالية تجعل ذلك ممكنًا.

- Hono - خادم API
- [`Zod`](https://zod.dev) - المدقق
- [وسيط التحقق Zod](https://github.com/honojs/middleware/tree/main/packages/zod-validator)
- `hc` - عميل `HTTP`

يمكننا تسمية مجموعة هذه المكوّنات بـ **Hono Stack**.
الآن لننشئ خادم API وعميلًا باستخدامه.

## كتابة API

أولًا، اكتب نقطة نهاية (endpoint) تستقبل طلب GET وتُعيد JSON.

```ts twoslash
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', (c) => {
  return c.json({
    message: `Hello!`,
  })
})
```

## التحقق باستخدام Zod

تحقّق باستخدام Zod لتلقّي قيمة معامل الاستعلام (query parameter).

![](/images/hono/sc01.gif)

```ts
import { zValidator } from '@hono/zod-validator'
import * as z from 'zod'

app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.json({
      message: `Hello! ${name}`,
    })
  }
)
```

## مشاركة الأنواع

لإصدار مواصفة نقطة النهاية، صدّر نوعها.


لكي يستنتج RPC المسارات بشكل صحيح، يجب أن تكون جميع الطرق المضمنة متسلسلة (chained)، ويجب استنتاج نوع نقطة النهاية أو التطبيق من متغير معلن. لمزيد من التفاصيل، راجع [أفضل الممارسات لـ RPC](https://hono.dev/docs/guides/best-practices#if-you-want-to-use-rpc-features).


```ts{1,17}
const route = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.json({
      message: `Hello! ${name}`,
    })
  }
)

export type AppType = typeof route
```

## العميل

التالي، التنفيذ من جانب العميل.
أنشئ كائن عميل بتمرير `AppType` اكتب إلى `hc` كأنواع عامة.
بعد ذلك، وبشكل سحري، يعمل الإكمال التلقائي ويتم اقتراح مسار نقطة النهاية (endpoint) ونوع الطلب.

![](/images/hono/sc03.gif)

```ts
import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('/api')
const res = await client.hello.$get({
  query: {
    name: 'Hono',
  },
})
```

الـ `Response` متوافق مع واجهة fetch (fetch API)، لكن البيانات التي يمكن استرجاعها باستخدام `json()` له نوع.

![](/images/hono/sc04.gif)

```ts
const data = await res.json()
console.log(`${data.message}`)
```

مشاركة مواصفات API تعني أنك تستطيع الاطلاع على التغييرات من جانب الخادم.

![](/images/hono/ss03.png)

## مع React

يمكنك إنشاء تطبيقات على Cloudflare Workers باستخدام React.

خادم API.

```ts
// src/index.ts
import { Hono } from 'hono'
import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
  id: z.string(),
  title: z.string(),
})

type Todo = z.infer<typeof schema>

const todos: Todo[] = []

const api = new Hono()
  .post('/todo', zValidator('form', schema), (c) => {
    const todo = c.req.valid('form')
    todos.push(todo)
    return c.json({
      message: 'created!',
    })
  })
  .get('/todo', (c) => {
    return c.json({
      todos,
    })
  })

export type AppType = typeof api

const app = new Hono()
app.route('/api', api)

export default app
```

العميل مع React وReact Query.

```tsx
// src/App.tsx
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { AppType } from '../functions/api/[[route]]'
import { hc, InferResponseType, InferRequestType } from 'hono/client'

const queryClient = new QueryClient()
const client = hc<AppType>('/api')

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

const Todos = () => {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.todo.$get()
      return await res.json()
    },
  })

  const $post = client.todo.$post

  const mutation = useMutation<
    InferResponseType<typeof $post>,
    Error,
    InferRequestType<typeof $post>['form']
  >({
    mutationFn: async (todo) => {
      const res = await $post({
        form: todo,
      })
      return await res.json()
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now().toString(),
            title: 'Write code',
          })
        }}
      >
        Add Todo
      </button>

      <ul>
        {query.data?.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
