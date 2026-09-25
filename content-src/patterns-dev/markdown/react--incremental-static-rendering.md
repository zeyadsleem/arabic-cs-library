---
title: Incremental Static Generation
lang: en
source: https://www.patterns.dev/react/incremental-static-rendering/
---

Pure static generation has a hard edge: every change to a page requires a full rebuild and redeploy. For a small docs site that’s a few seconds and nobody notices. For a marketplace with a hundred thousand product pages, it’s a multi-hour pipeline that blocks every fix to every typo.

**Incremental Static Regeneration (ISR)** loosens that constraint. The site is still rendered to HTML and served from a CDN cache, but the cache entries can be refreshed *after* deploy — either on a timer, or in direct response to an event (“a product was edited, invalidate that page”). New routes that weren’t part of the build can be rendered on first request, then cached for everyone who follows.

The behavior model is the HTTP-cache classic, **stale-while-revalidate**: a request gets the cached HTML immediately (fast), and if the entry is past its freshness window, the framework regenerates it in the background for the next visitor. Nobody waits on the regeneration, and the cache eventually catches up to reality.

## Two patterns inside ISR

ISR is really two related capabilities glued together:

- **On-demand generation of new routes** — render a page the first time someone asks for it, then cache it.
- **Revalidation of existing routes** — refresh a previously rendered page either after a time interval or after an explicit invalidation.

The App Router exposes these through different knobs than the legacy Pages Router did. There’s no `getStaticProps({ revalidate })` or `fallback: true` anymore.

## Time-based revalidation

The simplest case: prerender a page, then refresh it at most every N seconds. The cached HTML stays live until N seconds elapse and someone requests the page again, at which point the framework re-renders in the background.

In the App Router you set this either at the route level or per-fetch.

```
// app/blog/page.tsx
// Re-render at most once every 5 minutes.
export const revalidate = 300;\n
export default async function BlogIndex() {
  const posts = await getAllPosts();
  return <PostList posts={posts} />;
}
```

Per-fetch revalidation gives you finer control — different data on the same page can have different freshness windows:

```
// app/dashboard/page.tsx
export default async function Dashboard() {
  // Hourly: company-wide stats
  const stats = await fetch("/api/stats", {
    next: { revalidate: 3600 },
  }).then((r) => r.json());\n
  // Every 30 seconds: live notifications
  const alerts = await fetch("/api/alerts", {
    next: { revalidate: 30 },
  }).then((r) => r.json());\n
  return <DashboardView stats={stats} alerts={alerts} />;
}
```

Whichever fetch has the shortest revalidate window determines how often the page itself can be re-rendered. Note that in Next.js 15, `fetch` is **no longer cached by default** — you must opt in via `next.revalidate` or `cache: "force-cache"`.

## On-demand revalidation with paths and tags

Time-based ISR is fine for a blog index that’s allowed to be 5 minutes stale. It’s wrong for content where staleness is unacceptable — when an editor publishes a post or a price changes, the cached page should update *now*, not at the end of some arbitrary window.

The App Router gives you two precise tools: `revalidatePath` and `revalidateTag`.

**`revalidatePath`** invalidates a specific URL.

```
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";\n
export async function POST(req: Request) {
  const { secret, slug } = await req.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }\n
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ revalidated: true });
}
```

Wire your CMS to call this endpoint on publish. Within a second or two, the next request to `/blog/` will get the fresh version.

**`revalidateTag`** invalidates *every* fetch that was tagged with the given string, no matter which page it lived on.

```
// app/products/[id]/page.tsx
export default async function Product({ params }) {
  const { id } = await params;
  const product = await fetch(`https://api/products/${id}`, {
    next: { tags: [`product:${id}`, "products"] },
  }).then((r) => r.json());

  return <ProductView product={product} />;
}
```

When the product changes, you call `revalidateTag("product:" + id)` and just that product’s pages refresh. When you change pricing across the catalog, `revalidateTag("products")` invalidates every page that touched a product fetch. This is the cleanest way to model cache invalidation for a CMS-backed site — your tags align with your editorial model, not with your URL structure.

You can also call `revalidateTag` and `revalidatePath` directly from a **Server Action**, which is usually cleaner than building a separate revalidation endpoint:

```
"use server";
import { revalidateTag } from "next/cache";\n
export async function publishPost(formData: FormData) {
  const post = await db.posts.create({
    title: formData.get("title"),
    body: formData.get("body"),
  });
  revalidateTag("posts");
  return post;
}
```

## Generating pages on demand

For sites with too many possible routes to prerender all of them — a marketplace with millions of SKUs, a CMS with infinite slugs — you prerender the popular ones and let the rest be rendered on first request.

```
// app/products/[id]/page.tsx\n
// Prerender the top 1,000 most-viewed products at build time.
export async function generateStaticParams() {
  const top = await getTopProducts(1000);
  return top.map((p) => ({ id: p.id }));
}\n
// Allow other ids to render on demand and be cached afterward.
export const dynamicParams = true;\n
// Re-render any cached entry at most once an hour.
export const revalidate = 3600;\n
export default async function Product({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  return <ProductView product={product} />;
}
```

The first request for an uncached product triggers a render on the server, then the result joins the CDN cache for everyone else. The build stays fast (1,000 pages, not 1,000,000), the long-tail still loads quickly after its first warm-up, and stale entries auto-refresh in the background.

If you want unknown params to 404 instead of being lazily generated, set `dynamicParams = false`.

## Where ISR runs

ISR is most powerful when it runs at the edge. Vercel, Netlify, and Cloudflare all execute on-demand regenerations from their edge runtime and persist the result to a global cache. Visitors continent-by-continent see fast static responses without anyone having to round-trip to a central origin.

A subtle but important point: **revalidation doesn’t immediately propagate to every edge POP**. When you call `revalidatePath`, the cache entry is *marked* stale. The next request to a given POP triggers regeneration there. Most platforms propagate the invalidation signal quickly, but if your editors need byte-for-byte global consistency the moment they hit publish, plan to also purge the CDN cache directly.

## When ISR is the right tool

| Page type | Good fit? |
| --- | --- |
| Marketing pages updated weekly | Yes — `revalidate: 86400`. |
| News articles, blog posts | Yes — tag-based revalidation on publish. |
| E-commerce category pages | Yes — tag-based, revalidate when inventory changes. |
| Product detail pages | Yes — prerender top sellers, on-demand the long tail. |
| Live sports scores | No — use SSR or streaming SSR. |
| Personalized dashboard | No — use SSR or PPR with dynamic holes. |
| Search results | No — too many permutations; use SSR. |

## Tradeoffs

**Cache invalidation is a real problem** — the second of the two hard things in computer science. ISR pushes the difficulty into your hands: you have to remember which tags or paths to invalidate when data changes, and forgetting means users see stale prices, stale inventory, or stale headlines. Tag-based revalidation makes this manageable, but treat it as a discipline, not a feature.

**A bad regeneration sticks around.** If your data source returns a partial response or your render throws, the bad version may be cached and served to the next visitor. Wrap data-fetching in a real error boundary and return a thrown error to keep the previous good HTML in cache (Next.js will not replace a working cache entry with an errored one).

**ISR observability is its own skill.** Hit/miss ratios per route, average regeneration latency, count of background revalidations — none of this is in the default observability stack. Most platforms surface metrics for it; learn yours.

**Authenticated content doesn’t belong here.** The whole point of ISR is that one rendered HTML serves many users. If the HTML must differ per user, use SSR (or a static shell with a client-fetched personalized region).

## ISR vs SSR vs SSG, at a glance

| Property | SSG | ISR | SSR |
| --- | --- | --- | --- |
| Render time | Build | Build + on demand + background | Per request |
| Freshness | Until next deploy | Until next revalidate signal | Always fresh |
| TTFB | Edge cache (excellent) | Edge cache (excellent), occasional regen | Origin or edge (good) |
| Personalization | No | No | Yes |
| Operating cost | Lowest | Low | Highest |
| Failure mode | Whole rebuild required to fix | Bad revalidation; serve last good | 500s the request |

ISR is the right answer when most of your traffic deserves SSG’s economics but the *content* needs to keep moving. The next pattern — Streaming SSR — addresses a different problem: pages that genuinely need to be dynamic, but shouldn’t make the user wait for every byte to be ready before paint begins.
