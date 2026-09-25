---
title: PRPL Pattern
lang: en
source: https://www.patterns.dev/vanilla/prpl/
---

PRPL - **Push, Render, Pre-cache, Lazy-load** - is a loading strategy Google introduced in 2016 to make web apps usable on flaky mobile networks and underpowered phones. It was the dominant pattern for mobile-first delivery from roughly 2016 through 2019; today its pillars are still good advice, but the *implementations* have moved on. Server push is gone from Chrome, app shells have been largely absorbed into modern SSR with streaming, and the metrics we measure against are LCP and INP rather than time-to-interactive heuristics.

This article keeps the original four-pillar framing because it is still a useful checklist, then shows what each pillar looks like right now.

## A quick refresher on the four pillars

| Pillar | The 2016 intent | The current implementation |
| --- | --- | --- |
| **Push** | Deliver critical resources alongside the document via HTTP/2 server push | ``, ``, and HTTP `103 Early Hints` |
| **Render** | Get the first route interactive as fast as possible | Optimize LCP and INP via SSR, streaming, and route-level code splitting |
| **Pre-cache** | Use a service worker to fill the cache for likely-next routes | Workbox runtime caching, ``, framework-level prefetch (Next/Remix/SvelteKit) |
| **Lazy-load** | Defer everything that isn’t needed for the first paint | Dynamic `import()`, native lazy loading (`loading="lazy"`), priority hints (`fetchpriority`), `content-visibility` |

## Why PRPL existed in the first place

A naive page load is a chain of round-trips. The browser asks for the HTML, parses it, discovers a stylesheet, asks for that, discovers a script, asks for that, discovers a font, and so on. On a 4G connection with 100ms+ RTT, each step is visible to the user. PRPL was a response to this: do everything you can to compress those round-trips, then aggressively cache the result so the *next* visit pays even less.



The original PRPL essay leaned heavily on HTTP/2 server push as the answer to the round-trip problem. That story has changed.

## Push: from server push to Early Hints

When PRPL was published, the recommendation was to push critical CSS and the initial JavaScript chunks along with the HTML response so the browser would not have to discover them and ask. The mechanism was HTTP/2 server push.

**Server push is effectively dead.** Chrome [disabled HTTP/2 server push by default in version 106 (late 2022)](https://developer.chrome.com/blog/removing-push) after years of measurement showed it wasn’t winning - only ~1.25% of HTTP/2 sites used it, and in many cases pushed resources duplicated bytes the cache already had. The HTTP/3 spec dropped push almost entirely.

What replaced it:

**``** declares a high-priority fetch directly in the HTML. It is the workhorse for telling the browser, “you are going to need this font/script/image - don’t wait until you parse far enough to discover it.”

```
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="modulepreload" href="/assets/app.js">
```

**HTTP `103 Early Hints`** is the modern successor to server push - and the one that actually solves the round-trip problem PRPL cared about. Before the server has finished generating the full response, it can send a `103` interim response with `Link` headers telling the browser what to start fetching:

```
HTTP/1.1 103 Early Hints
Link: </assets/app.js>; rel=preload; as=script
Link: </assets/app.css>; rel=preload; as=style

HTTP/1.1 200 OK
Content-Type: text/html
...
```

Unlike server push, Early Hints keep the browser in charge: it can ignore the hint if the resource is already cached, so you don’t waste bytes. It is supported in Chrome, Edge, Firefox, and is exposed by Cloudflare, Fastly, and Vercel.

**Priority hints** (`fetchpriority="high"`) and `` round out the toolkit. Use preconnect for cross-origin asset hosts; use `fetchpriority` to nudge the LCP image up the queue.

## Render: optimize for LCP, not “interactive”

The “R” in PRPL was render the initial route as fast as possible. The advice is the same; the metric has changed.

Currently the relevant numbers are the Core Web Vitals: **LCP** (Largest Contentful Paint, target ≤ 2.5s), **INP** (Interaction to Next Paint, which [replaced FID in March 2024](https://web.dev/articles/inp), target ≤ 200ms), and **CLS** (Cumulative Layout Shift, target ≤ 0.1). LCP is the one most affected by the Render pillar.

Concrete tactics that move LCP today:

- **Server-render the above-the-fold content** so the LCP element is in the initial HTML. Frameworks like Next.js, Remix, SvelteKit, Nuxt, and Astro do this by default.
- **Stream the response** so the browser starts parsing and discovering assets before the server is done rendering. React 18’s `renderToPipeableStream` and `` boundaries make this incremental: the shell ships immediately and slower fragments arrive as they resolve.
- **Inline critical CSS** for the above-the-fold styles so first paint isn’t blocked on a stylesheet round-trip.
- **Self-host fonts and preload them** with `crossorigin`; web fonts are a common LCP regression.
- **Give the LCP image `fetchpriority="high"`** and skip lazy-loading on it.

The original PRPL essay was written before “render” had standardized success metrics. Anchoring to LCP/INP makes the pillar testable - you can prove a change helped instead of guessing.

## Pre-cache: service workers, prefetch, and CDN edges

The third pillar uses idle time to prepare for the user’s *next* request. There are three layers worth using together:

**Runtime caching with a service worker.** [Workbox](https://developer.chrome.com/docs/workbox) is the de-facto library: pick a strategy per route (`StaleWhileRevalidate` for the app shell, `CacheFirst` with expiration for images, `NetworkFirst` for API responses), and Workbox generates the service worker for you. This is the layer that gives you a useful offline experience.

```
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

registerRoute(
  ({ request }) => request.destination === "script",
  new StaleWhileRevalidate({ cacheName: "scripts" })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  })
);
```

**Framework-level link prefetch.** Next.js, Remix, SvelteKit, and Nuxt all prefetch the JS bundles for links in the viewport (or on hover) so navigation feels instant. You usually do not configure this - it is on by default. If you are hand-rolling, `` is the low-level primitive.

**CDN edge caching.** A lot of what an app-shell + service-worker setup used to do is now handled by putting an edge cache (Cloudflare, Fastly, Vercel, Netlify) in front of the origin and caching the SSR HTML for as long as the data allows. ISR (Next.js) and stale-while-revalidate at the edge are the modern equivalents of “warm the next page in the background”.

## Lazy-load: native primitives are usually enough

Lazy-loading was the most labor-intensive pillar in 2016 - it meant route-based code splitting, manual dynamic imports, and intersection-observer-driven image loading. Most of that is now built into the platform.

- **Dynamic `import()`** is the native way to split JavaScript at runtime. Bundlers turn each `import()` call into a separate chunk automatically.
- **``** and **``** defer offscreen media without a single line of JavaScript. Combine with `decoding="async"` for images.
- **`content-visibility: auto`** lets the browser skip layout and paint for offscreen sections, which is a big win for long pages.
- **Route-level splitting** is the default in every modern meta-framework; you rarely need to configure it.

The one place lazy-loading still needs care is the LCP element. Never lazy-load the hero image, and never code-split the component that contains it.

## Is the app shell still a thing?

The original PRPL writeup leaned on the **app-shell model**: ship a minimal HTML+JS shell first, render skeletons, then fill in content. It made sense for client-rendered SPAs on slow phones.

Currently, the app shell has mostly been replaced by:

- **SSR with streaming** (React 18, Solid, Astro, Qwik) - the server *is* the shell, and Suspense boundaries are the skeleton.
- **PWAs with Workbox** for the offline + install story.
- **Edge rendering** so the first byte is fast regardless of the user’s distance from the origin.

You can still build an app-shell PWA - and for highly interactive web apps (collaborative editors, dashboards) it is often the right choice - but it is no longer the *default* answer to “make this load fast”.

## Is PRPL still the right framing?

PRPL is best understood as a 2016 packaging of ideas that are still individually correct. The packaging itself is showing its age: server push is gone, the app-shell narrative has been folded into streaming SSR, and what we measure has shifted from “time to interactive” to LCP and INP.

The four pillars are still a useful checklist when you audit a page:

- **Push:** Are you using `preload`, `modulepreload`, and Early Hints for the resources you know the browser will need?
- **Render:** Is your LCP element in the initial HTML, and is your LCP under 2.5s on the 75th percentile of real-user data?
- **Pre-cache:** Is the next likely navigation already prefetched? Do you have a service worker for repeat visits?
- **Lazy-load:** Is everything not needed for the first interaction deferred - and is the LCP element *not* in that bucket?

If you want the modern shorthand: build on a meta-framework that does streaming SSR, put it behind an edge CDN, enable Early Hints, follow the Core Web Vitals, and you have PRPL without having to think about it as PRPL.

## References

- [Removing HTTP/2 Server Push from Chrome](https://developer.chrome.com/blog/removing-push) - Chrome Developers
- [Early Hints](https://developer.chrome.com/docs/web-platform/early-hints) - Chrome Developers
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp) - web.dev
- [Workbox](https://developer.chrome.com/docs/workbox) - Chrome Developers
- [The PRPL Pattern](https://web.dev/articles/apply-instant-loading-with-prpl) - web.dev (archived)
