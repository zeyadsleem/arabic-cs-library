---
title: Overview of Next.js
lang: en
source: https://www.patterns.dev/react/nextjs/
---

Next.js, created by Vercel, is a full-stack React framework optimized for production. With recent updates, Next.js emphasizes the App Router architecture, React Server Components, and seamless full-stack capabilities. Let’s explore modern Next.js features and patterns.

## Core Architecture

### App Router, Routing & Code Organization

Next.js 13+ introduced the [App Router](https://nextjs.org/docs/app) as the recommended approach for building applications, bringing powerful routing and code organization capabilities:

```
app/
  layout.tsx         # Root layout (applies to all routes)
  page.tsx          # Home page (/)
  about/
    page.tsx        # About page (/about)
  blog/
    layout.tsx      # Blog layout
    page.tsx        # Blog list (/blog)
    [slug]/
      page.tsx      # Dynamic blog post (/blog/post-1)
    categories/
      [...slug]/    # Catch-all segments (/blog/categories/a/b/c)
        page.tsx
  (marketing)/      # Route groups
    page.tsx
  @modal/          # Parallel routes
    page.tsx
  not-found.tsx    # Custom 404 page
  error.tsx        # Error boundary
  loading.tsx      # Loading UI
```

Key routing features:

- **File-based routing**: URLs mirror your file structure
- **Dynamic segments**: `[param]` for dynamic routes
- **Catch-all routes**: `[...slug]` for flexible paths
- **Route groups**: `(group)` for logical organization
- **Parallel routes**: `@name` for simultaneous views
- **Intercepting routes**: `(..)photo` for modal-like UIs

Key features:

- **Server Components by default** (zero client-side JS)
- **Nested layouts** with partial rendering
- **Streaming** for progressive content loading
- **Simplified data fetching** with async/await
- **Built-in error handling** with error.tsx
- **Loading states** with loading.tsx
- **404 pages** with not-found.tsx

### Code-Splitting & Bundle Optimization

Next.js automatically implements several code-splitting strategies:

- **Route-based Splitting**: Each route is automatically code-split
- Only the code needed for the current route is loaded
- Prefetching of likely routes based on viewport
- Automatic static optimization when possible
- **Component-level Splitting**:

```
// Dynamic imports for components
import dynamic from 'next/dynamic'

const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // Disable server-rendering
})

// Conditional imports
const AdminPanel = dynamic(() => 
  import('@/components/Admin').then(mod => mod.AdminPanel), {
  loading: () => <p>Loading admin panel...</p>
})
```

- **Library-level Splitting**: Third-party modules are automatically split
- Shared chunks for commonly used code
- Module federation support for micro-frontends
- **Image Optimization**: Automatic lazy loading of images
- Viewport-based loading strategies
- Format optimization (WebP/AVIF)

### Hybrid Rendering

Next.js supports multiple rendering strategies in a single application:

- **Static Site Generation (SSG)**: Pre-render at build time
- **Incremental Static Regeneration (ISR)**: Update static content post-build
- **Server-Side Rendering (SSR)**: Render on each request
- **Client-Side Rendering (CSR)**: Traditional React hydration

Modern pattern:

```
// app/page.tsx
export default async function Home() {
  const data = await fetchData(); // Server-side fetch
  
  return (
    <main>
      <StaticContent data={data} />
      <ClientComponent />
    </main>
  )
}
```

## Modern Data Fetching

### App Router Data Patterns

| Feature | App Router Approach |
| --- | --- |
| Static Props | `generateStaticParams()` |
| Server-side Props | Async Server Components |
| Client-side Data | SWR/TanStack Query + `use()` |

Example static generation:

```
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Full-Stack Capabilities

Next.js 14 introduces [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions) for secure backend operations:

```
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  await db.post.create({
    data: { title: formData.get('title') }
  });
}

// app/page.tsx
import { createPost } from './actions';

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

## Performance Optimization

### Image Handling

Modern Image component usage:

```
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero Image"
  width={1200}
  height={800}
  priority
  className="rounded-lg"
/>
```

Best practices:

- Use `priority` for above-the-fold images
- Configure `remotePatterns` in next.config.js
- Prefer AVIF format with `quality` optimization

### Font Optimization

Built-in font system:

```
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  )
}
```

## Advanced Features

### Middleware & Advanced Routing

Edge-ready middleware:

```
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return validateUserSession(request);
  }
}
```

Dynamic route handlers:

```
// app/api/route.ts
export async function GET(request: Request) {
  return new Response(JSON.stringify({ data: 'Hello' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Partial Prerendering (Experimental)

Next.js 14 introduces [Partial Prerendering](https://nextjs.org/blog/next-14#partial-prerendering) for dynamic static pages:

```
// app/dashboard/page.tsx
import { unstable_noStore as noStore } from 'next/cache';

export default function Page() {
  noStore(); // Opt-out of static rendering
  return <RealTimeDashboard />;
}
```

## Getting Started

- Create new project:

```
npx create-next-app@latest
```

- Choose modern configuration:

```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
```

- Development workflow:

```
npm run dev    # Local development
npm run build  # Production build
npm run start  # Start production server
```

Modern Next.js emphasizes:

- **App Router** for file-based routing
- **React Server Components** by default
- **Edge Runtime** for optimal performance
- **TypeScript** first-class support
- **Turbopack** for faster development (beta)
