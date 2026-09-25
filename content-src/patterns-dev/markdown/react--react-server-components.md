---
title: React Server Components
lang: en
source: https://www.patterns.dev/react/react-server-components/
---

React Server Components (RSC) are React components that run exclusively on the server, never ship their code to the browser, and produce output that the client tree can render and interleave with normal client components. They aren’t a replacement for SSR — they’re a different layer of the rendering stack. SSR turns React into HTML for the initial paint; RSCs let parts of your tree never become client JavaScript at all.

The shift in mental model is significant. In a classic React app, every component runs in the browser. With RSC, components are partitioned by *where they run*: server (default), or client (opt in with `'use client'`). The partition is enforced by the build, and the boundary between the two is a standard component prop interface — a Server Component can pass props (including pre-fetched data) into a Client Component, just like any normal React component composition.

This is the model that landed first in the Next.js App Router (Next.js 13 in late 2022, stable defaults since), shipped in Shopify Hydrogen, and is now being adopted by Remix, TanStack Start, and Waku. It is the direction React is moving as a default.

## RSC vs SSR: not the same thing

The two are easy to confuse because both involve React running on the server. They solve different problems.

|  | SSR | RSC |
| --- | --- | --- |
| What runs on the server | The whole tree, once per request | Only components marked as server-side |
| What ships to the client | HTML + JS for the whole tree | HTML + JS *only* for client components |
| Hydration cost | Whole tree | Just client components |
| Data fetching | Inside server render | Inside server components (with `await`) |
| When it runs | Per request (SSR) or build (SSG) | Same — composes with both |
| Output format | HTML | A serialized component tree (RSC payload), then optionally HTML |

You usually want both. RSC reduces *how much* JS you ship; SSR delivers what JS you do ship as HTML for a fast first paint. In the App Router, when you write an async server component that fetches data, Next does both: renders it on the server, sends HTML to the browser, and sends a compact RSC payload alongside so the client can update the tree on later navigations without a full page reload.

## The two directives

The whole RSC system is governed by two file-level directives:

- **`'use client'`** at the top of a file marks every component exported from it as a client component. Client components are the React you’ve always known: they can use hooks (`useState`, `useEffect`), event handlers, and browser APIs.
- **`'use server'`** at the top of a file marks every exported function as a server action — a function that’s safe to call from a client component but actually executes on the server.

A file with neither directive, in a server-component-aware framework, is a Server Component by default. It can be `async`, can `await` data fetches, can read from the database directly, can use server-only secrets, and cannot use hooks or event handlers.

```
// app/posts/page.tsx  -- Server Component (no directive)
import LikeButton from "./LikeButton";\n
export default async function Posts() {
  const posts = await db.posts.findMany({ orderBy: { createdAt: "desc" } });\n
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <LikeButton postId={post.id} initialCount={post.likes} />
        </li>
      ))}
    </ul>
  );
}
```

```
// app/posts/LikeButton.tsx
"use client";
import { useState } from "react";\n
export default function LikeButton({ postId, initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Likes: {count}
    </button>
  );
}
```

The list renders entirely on the server. Its code — the database query, the `map` over posts, the JSX for each `` — never appears in the client bundle. The only JavaScript that ships is `LikeButton`, because it’s marked `'use client'`. If the list has 50 posts, you ship one button’s worth of code, not fifty.

## What changes inside a Server Component

Server Components have access to the server environment, which means:

- **Direct database queries.** No API layer needed. The component itself can `await db.users.findUnique(...)`. There is no client-to-server hop for that data — the fetch happens in the same process as the render.
- **Server-only secrets.** Environment variables, API keys, database URLs are safe to reference; they will never be bundled for the browser.
- **Large dependencies for free.** Importing `marked`, `prismjs`, or a 600-KB date library inside a Server Component costs zero client bytes. The library runs on the server; only its rendered output reaches the user.
- **Top-level `await`.** Server Components are async functions. You can `await` directly in the function body. No `useEffect` dance for initial data.

And things they can’t do:

- No `useState`, `useEffect`, or any other React hook that depends on the rendering lifecycle.
- No event handlers (`onClick`, `onChange`). Pass props *down* to a client component instead.
- No browser APIs (`window`, `localStorage`, `IntersectionObserver`).

## Server Actions: calling the server from a client component

Server Components are read-heavy by nature. For writes — submitting a form, deleting a row, toggling a setting — React 19 stabilized **Server Actions**: server functions you import directly into client components and call like any other async function.

```
// app/posts/actions.ts
"use server";
import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";\n
export async function likePost(postId: string) {
  const user = await auth();
  if (!user) throw new Error("Not authenticated");\n
  await db.likes.create({ data: { postId, userId: user.id } });
  revalidateTag(\`post:\${postId}\`);
}
```

```
// app/posts/LikeButton.tsx
"use client";
import { useTransition } from "react";
import { likePost } from "./actions";\n
export default function LikeButton({ postId }) {
  const [isPending, startTransition] = useTransition();\n
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => likePost(postId))}
    >
      {isPending ? "Liking..." : "Like"}
    </button>
  );
}
```

A few things happen here that are worth naming:

- The function `likePost` lives on the server. The build system replaces the client-side `import` with a reference — a string ID — that the runtime uses to call back to the server.
- The button doesn’t need a hand-written `/api/like` route. The framework handles request/response plumbing.
- After the action succeeds, `revalidateTag` invalidates any cached fetches tagged with the post’s id, so the next render returns fresh data.

Server Actions also work as a form’s `action` attribute, in which case they degrade gracefully — the form submits even before JavaScript loads.

```
// app/comments/CommentForm.tsx
"use client";
import { useActionState } from "react";
import { postComment } from "./actions";\n
export function CommentForm({ postId }) {
  const [state, formAction, isPending] = useActionState(postComment, null);\n
  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <textarea name="body" required />
      <button disabled={isPending}>
        {isPending ? "Posting..." : "Post comment"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

`useActionState` is one of the new React 19 hooks; `useFormStatus` is another, useful inside a submit button to read whether the parent form is currently submitting.

## Composition rules

The rules for mixing server and client components are simple but have a couple of sharp corners:

- A Server Component can render a Client Component. (Pass data as props.)
- A Client Component can render a Server Component **only if the Server Component was passed in as `children` or as a prop**. A Client Component cannot import a Server Component directly — once a tree crosses into `'use client'`, everything imported from inside that tree is also client.
- Anything passed across the boundary as props must be serializable: numbers, strings, booleans, arrays, plain objects, Dates, Maps, Sets, promises (React serializes pending promises), and JSX elements. No functions, no class instances.

Pattern #2 is the most common stumble. The fix is the “wrap, don’t import” rule:

```
// Bad: ClientLayout imports a Server Component
"use client";
import ServerSidebar from "./ServerSidebar"; // ERROR\n
export default function ClientLayout({ children }) {
  return (
    <div>
      <ServerSidebar />
      {children}
    </div>
  );
}
```

```
// Good: ClientLayout takes the Server Component as a child
"use client";
export default function ClientLayout({ sidebar, children }) {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
}\n
// And the parent (a Server Component) composes them:
// app/layout.tsx
import ClientLayout from "./ClientLayout";
import ServerSidebar from "./ServerSidebar";\n
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout sidebar={<ServerSidebar />}>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

## Bundle size, in practice

The original RSC RFC estimated 18–29 % bundle reductions. Real-world reports from teams that migrated to the App Router land in a similar band — typically a 20–40 % reduction in JS shipped to the client, with the bigger wins on content-heavy routes where most of the page is data display rather than interaction.

The shape of the win:

- **Imports inside Server Components contribute zero.** A markdown renderer, a syntax highlighter, a heavy date library — none of it ships.
- **Data-fetching code stays server-side.** Auth checks, query builders, ORM clients all stay on the server.
- **Client components shrink to actual interactivity.** A typical client component is a button, a modal, an input — small.

It’s not free. Server Components run on the server, which costs serverless or container minutes, and the RSC payload itself adds bytes to each navigation. But on most pages, the JavaScript saved dwarfs the payload added.

## File conventions in the Next.js App Router

The App Router builds RSC into the filesystem. A typical route has these special files, each one a Server Component unless it carries `'use client'`:

| File | Purpose |
| --- | --- |
| `page.tsx` | The route’s main UI. |
| `layout.tsx` | Wraps `page.tsx` and any nested routes. Persists across navigations within its scope. |
| `loading.tsx` | A `` fallback for `page.tsx`’s initial render. |
| `error.tsx` | An error boundary scoped to the route. Must be a Client Component. |
| `not-found.tsx` | Renders when `notFound()` is called. |
| `template.tsx` | Like `layout.tsx` but remounts on each navigation. |
| `route.ts` | An HTTP handler (no rendering — for APIs, webhooks). |

These conventions let the router stream layouts, parallel routes, and intercepted routes without you having to wire up `` or error boundaries by hand. The shell of the page is in `layout.tsx`; the slow data is in `page.tsx`; `loading.tsx` is the fallback. The framework composes them into a single streaming response.

## When to reach for what

Use the following as a rule of thumb when laying out a new route:

- **Page-level shell, navigation, footer, headings**: Server Components. They never need to be interactive.
- **Lists of content from a database or CMS**: Server Components, with `await` data fetching inline.
- **Forms**: a Client Component for the form fields and submit state, calling a Server Action.
- **Anything that uses `useState`, `useEffect`, or event handlers**: Client Component. Keep its imports minimal.
- **Heavy libraries used only for rendering output** (markdown, syntax highlighting, charts as SVG): Server Components, to keep them out of the client bundle.
- **Truly interactive widgets** (rich text editor, map, code editor): Client Component, often loaded via `next/dynamic` to keep its cost off the initial path.

The mental shift is to treat `'use client'` as the *exception*, declared at the leaves of the tree where interactivity actually lives. The default is server.

## What’s still moving

RSC is stable in React 19 and in the Next.js App Router, but the surrounding ecosystem is still evolving:

- **`use cache` directive** (experimental in Next.js 15) lets you mark a function or component as cacheable independent of its data fetches. This is the cleanest way to express “render this on the server, cache the output by argument” without scattering `fetch` options.
- **Async request APIs**: in Next.js 15, `cookies()`, `headers()`, `draftMode()`, dynamic `params`, and `searchParams` are all async and must be awaited. This change makes the dynamic/static boundary easier for the framework to reason about and unlocks Partial Prerendering.
- **Adoption beyond Next.js**: Waku, RedwoodJS, TanStack Start, and Remix v3 are all building RSC support. The protocol is meant to be portable across frameworks, not Next.js-specific.
- **The streaming-and-caching story** is converging on tags-and-paths revalidation everywhere, with `revalidateTag` and `revalidatePath` becoming the universal invalidation primitives.

The endpoint of this evolution is a model where rendering, data fetching, mutations, and cache invalidation all use the same React primitives — server components, server actions, suspense, and tagged caches — instead of being separate concepts you wire together by hand. RSC is the structural change that makes that endpoint reachable.
