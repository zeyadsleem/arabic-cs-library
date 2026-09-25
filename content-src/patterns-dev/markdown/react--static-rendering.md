---
title: Static Rendering
lang: en
source: https://www.patterns.dev/react/static-rendering/
---

Static rendering — also called static site generation (SSG) — produces the HTML for every route at build time. Each URL maps to a file on disk that a CDN can serve from cache in tens of milliseconds, regardless of where the user is or how many other requests are in flight at the same time. The server does no work per request, so TTFB is bounded only by network latency.

This is the rendering strategy with the simplest performance profile and the lowest operating cost. It is also the one with the most rigid constraint: every visitor sees the same HTML. If two users would see different content, static rendering on its own isn’t enough — but it composes well with client-side fetches, ISR, and partial prerendering to handle dynamic data without giving up the cache.



## Where static wins

Static rendering is the right call when:

- Content updates on a publishing cadence, not on a request cadence (marketing pages, documentation, blog posts, changelogs, landing pages, legal pages).
- The same HTML is correct for every visitor, or can be made so by deferring user-specific bits to a client component.
- You want a flat operating cost — a CDN bill instead of a serverless function bill.
- You need resilience: a fully prerendered site keeps serving even if your origin or database is down.

It’s a poor fit when:

- Content changes per request (search results, dashboards, anything authenticated).
- Build times grow large enough to slow your deploy loop (more on this below).
- You need to respect the user’s geography, cookies, or A/B-test cohort in the HTML.

![](/images/patterns-dev/react-static-rendering-0-Screen_Shot_2021_04_03_at_5.52.41_PM.webp)

## Static pages in the App Router

In the Next.js App Router, a server component without any dynamic data sources is statically rendered automatically. There is no `getStaticProps` to call — the component itself runs at build time.

```javascript
// app/pricing/page.tsx

export default function Pricing() {

  return (

    <main>

      <h1>Pricing</h1>

      <p>Three tiers, no surprises.</p>

    </main>

  );

}
```

Run `next build` and Next emits a static HTML file for `/pricing`. No server runtime is involved when a request comes in.

Things that *opt a route out* of static rendering, and into dynamic rendering instead:

- Reading `cookies()`, `headers()`, or `draftMode()`.
- Using `searchParams` in a server component (in Next.js 15 these are async).
- Calling `fetch()` with `cache: "no-store"` or `next: { revalidate: 0 }`.
- Exporting `dynamic = "force-dynamic"` from the route file.

If none of those happen, the route is static.

## Static rendering with data

Most real sites pull content from a CMS, a database, or a filesystem. In the App Router this is a plain async server component — Next runs it at build time and caches the result.

```javascript
// app/blog/page.tsx

import Link from "next/link";\n

export default async function BlogIndex() {

  const posts = await getAllPosts();

  return (

    <ul>

      {posts.map((post) => (

        <li key={post.slug}>

          <Link href={`/blog/${post.slug}`}>{post.title}</Link>

        </li>

      ))}

    </ul>

  );

}
```

Next.js will detect this has no request-scoped inputs and prerender `/blog` at build time. The data fetch runs once, on the build server, and the rendered HTML goes to the CDN.

## Dynamic routes with `generateStaticParams`

The App Router replacement for `getStaticPaths` is `generateStaticParams`. Export it from a dynamic-segment route file and Next renders one HTML file per returned param set.

```javascript
// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";\n

export async function generateStaticParams() {

  const posts = await getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));

}\n

// Reject params not returned above. Default in Next 15 is true.

export const dynamicParams = false;\n

export default async function Post({ params }) {

  const { slug } = await params; // params is async in Next 15

  const post = await getPost(slug);

  if (!post) notFound();\n

  return (

    <article>

      <h1>{post.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

    </article>

  );

}
```

Set `dynamicParams = true` (or omit it) to render unknown slugs on demand at request time, then cache the result — that’s ISR territory and we cover it in the next pattern.

## Static rendering with a client-side fetch

When most of the page is static but one slice is genuinely per-request — a “currently watching” count, a personalized recommendation strip, a logged-in greeting — you can keep the page static and let a client component fill in the dynamic part after hydration.

```javascript
// app/products/[id]/page.tsx

import RecommendationsClient from "./RecommendationsClient";\n

export async function generateStaticParams() {

  const products = await getAllProducts();

  return products.map((p) => ({ id: p.id }));

}\n

export default async function Product({ params }) {

  const { id } = await params;

  const product = await getProduct(id);\n

  return (

    <>

      <ProductDetails product={product} />

      {/* hydrated separately, fetches at runtime */}

      <RecommendationsClient productId={product.id} />

    </>

  );

}
```

The HTML still ships pre-rendered. The recommendations widget hydrates and runs its own fetch, typically via TanStack Query or SWR for caching and revalidation. This pattern gives you static’s TTFB on the main content and per-user freshness where it matters.

## Partial Prerendering: static shell + streamed dynamic holes

Partial Prerendering (PPR) is an experimental Next.js feature that blends static and dynamic into a *single* render. The static parts of the page ship as a prerendered shell. Dynamic parts — wrapped in `` — stream in from the server runtime within the same response.

```javascript
// app/page.tsx

import { Suspense } from "react";

import { cookies } from "next/headers";\n

export const experimental_ppr = true;\n

async function GreetingForUser() {

  const cookieStore = await cookies(); // dynamic

  const session = cookieStore.get("session");

  const name = session ? await lookupName(session.value) : "there";

  return <p>Hello, {name}</p>;

}\n

export default function Home() {

  return (

    <main>

      <h1>Welcome to the store</h1> {/* static */}

      <Hero /> {/* static */}\n

      <Suspense fallback={<p>Hello...</p>}>

        <GreetingForUser /> {/* dynamic, streamed */}

      </Suspense>\n

      <FeaturedProducts /> {/* static, data fetched at build */}

    </main>

  );

}
```

The user gets the static shell at CDN latency. The dynamic hole streams in as a chunked addition to the same response, with the fallback bridging the gap. You get static’s TTFB on the parts that are static and SSR’s freshness on the parts that aren’t, without splitting the page into separate routes.

Enable PPR in `next.config.js` with `experimental.ppr = "incremental"` to opt in route-by-route.

## The performance shape

| Metric | Pure SSG | SSG + client fetch | SSR | PPR |
| --- | --- | --- | --- | --- |
| TTFB | Excellent (CDN cache) | Excellent | Slow (per-request) | Excellent (static shell streams first) |
| LCP | Excellent | Good | Variable | Excellent |
| Personalization in HTML | No | After hydration | Yes | Yes (in dynamic holes) |
| Server cost per request | $0 | Low | Per render | Per dynamic segment |
| Cache invalidation | Rebuild & redeploy | N/A for dynamic part | N/A | Per-segment revalidation |

## Build-time considerations

Static rendering has one operational cost that scales with content volume: build time. If your e-commerce site has 200,000 products and each detail page takes 50 ms to render, a full build is ~3 hours of single-threaded rendering. Strategies that help:

- **Prerender only the top-N pages** with `generateStaticParams`, return the rest dynamically on first request, cache via ISR. This is what most large sites do.
- **Parallelize the build** across multiple workers — most modern frameworks do this automatically but it scales with CPU count.
- **Cache fetches between builds** using the framework’s incremental cache (Next.js stores prior fetch results and reuses them when unchanged).
- **Use on-demand revalidation** instead of rebuilding the whole site when a single page changes.

## When static rendering isn’t enough

Static rendering’s central constraint — same HTML for every visitor, only updated at build — is what makes it cheap and fast. When the constraint chafes, the next pattern, **Incremental Static Regeneration (ISR)**, relaxes the “only updated at build” half. After that, **Streaming SSR** and **React Server Components** address the “same HTML for everyone” half.
