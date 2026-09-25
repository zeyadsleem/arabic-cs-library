---
title: Server-side Rendering
lang: en
source: https://www.patterns.dev/react/server-side-rendering/
---

Server-side rendering (SSR) turns a React component tree into HTML on the server and ships that HTML in the initial response. The browser paints something meaningful before any application JavaScript has parsed. After the document arrives, React runs again on the client and *hydrates* the markup — attaching event listeners and reconnecting the DOM to the component tree so it becomes interactive.

SSR is the right default when the page contents depend on the request — the signed-in user, a cookie, an A/B-test cohort, a geolocation header — *and* the page is read often enough that doing the render per request is worth it. A product detail page personalized to the viewer’s region, an authenticated dashboard, a search result page parameterized by the query string: these are SSR’s home turf.



## What SSR buys you

| Concern | Outcome with SSR |
| --- | --- |
| LCP on cold loads | Improved — main content is in the initial HTML. |
| SEO and link previews | Crawlers see fully rendered markup, no JS execution required. |
| Personalization | Native — request headers, cookies, and session data are available at render time. |
| TTFB | Slower than static — work happens per request. |
| Server cost | Higher than static — every request runs the render. |
| Hydration cost | Real — the client still needs the JS to make the UI interactive. |

SSR is best understood as a tradeoff against **static rendering** (faster TTFB, no per-request work) and against **CSR** (much lower hydration cost, smaller initial paint).

## A modern SSR pipeline with `renderToPipeableStream`

React 18 replaced the older string-based server APIs with streaming variants. On Node runtimes you use `renderToPipeableStream`; on Web/Edge runtimes (Cloudflare Workers, Vercel Edge, Deno) you use `renderToReadableStream`. Both support `` for partial streaming and unlock React’s concurrent features on the server.

The client counterpart for SSR is `hydrateRoot` (not `createRoot`, and not the old `ReactDOM.hydrate` which was removed in React 19).

Here is a minimal Express server rendering a product detail page:

JavaScript iconserver.jsxJavaScript iconclient.jsxJavaScript iconProductPage.jsx

```javascript
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import ProductPage from "./ProductPage";


const app = express();
app.use("/static", express.static("dist"));


app.get("/products/:id", async (req, res) => {
  const product = await loadProduct(req.params.id);


  let didError = false;
  const { pipe } = renderToPipeableStream(
    <ProductPage product={product} />,
    {
      bootstrapModules: ["/static/client.js"],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-Type", "text/html");
        pipe(res);
      },
      onShellError(err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.send("<h1>Something went wrong</h1>");
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
});


app.listen(3000);
```



A few details worth highlighting:

- **`onShellReady`** fires as soon as the part *outside* any `` boundary is renderable. The server flushes that shell immediately, so the browser starts painting while slower data continues to resolve.
- **`onAllReady`** is the alternative callback — wait for it instead when you need the complete HTML (crawlers that don’t execute streamed scripts, RSS feeds, email rendering).
- **`bootstrapModules`** tells React which scripts to inject so hydration begins automatically when the shell arrives.
- The `Reviews` component can throw a promise (via a Suspense-compatible data layer). When it resolves, React streams an additional HTML chunk *with* an inline script that swaps the fallback in place. No client-side polling needed.

## Hydration, and why it is the expensive part

Hydration is the step where React walks the server-rendered DOM, matches each node to the component tree, and attaches event listeners. It produces no visual change, but it has to run the entire component tree at least once — which is why hydration cost roughly equals an initial client render.

This creates the “uncanny valley” of SSR: the page looks ready, but clicks and inputs are silently dropped until the bundle parses and hydration completes. The metric Google now tracks for this is **Interaction to Next Paint (INP)**, which replaced FID in Core Web Vitals in March 2024.

Three patterns reduce hydration cost:

- **Streaming SSR + ``** lets parts of the page hydrate as their JS arrives, rather than blocking on the full bundle.
- **Selective hydration** (built into React 18+) prioritizes hydrating whichever component the user is currently interacting with.
- **React Server Components** eliminate hydration for any component that doesn’t need to be interactive — their JS never ships at all.

## SSR in Next.js App Router

In the App Router, server rendering is the default and there is no `getServerSideProps`. A page is dynamic — that is, rendered per request — as soon as it reads request-time data. Reading `cookies()`, `headers()`, or `searchParams` opts the route into dynamic rendering automatically. (In Next.js 15, these APIs became async and must be awaited.)

```javascript
// app/dashboard/page.tsx

import { cookies } from "next/headers";\n

export default async function Dashboard() {

  const cookieStore = await cookies();

  const session = cookieStore.get("session");\n

  const user = await fetchUser(session?.value);

  const widgets = await fetchWidgets(user.id);\n

  return (

    <section>

      <h1>Welcome back, {user.name}</h1>

      <WidgetGrid widgets={widgets} />

    </section>

  );

}`
```

A few things changed in Next.js 15 that affect SSR specifically:

- `fetch()` calls are **no longer cached by default**. You opt in per-request via `fetch(url, { cache: "force-cache" })` or the `next.revalidate` option. This makes the SSR-vs-static line easier to reason about.
- `cookies()`, `headers()`, `draftMode()`, and dynamic `params`/`searchParams` are all async and must be awaited.
- The new `'use cache'` directive (experimental, behind a flag) lets you mark a function or component as cacheable independent of fetches.

## Edge SSR

Running SSR on an edge runtime (Cloudflare Workers, Vercel Edge Functions, Deno Deploy) physically moves the render close to the user. TTFB drops dramatically — typically from 200–600 ms on a centralized origin to 30–80 ms at the edge — and serverless cold-start time approaches zero on modern platforms.

Trade-offs to weigh:

- The edge runtime is a **subset of Node** — no native modules, no file system, limited Buffer support. Use `renderToReadableStream`, not `renderToPipeableStream`.
- Edge functions have tight CPU and memory limits (typically 50–128 MB and tens of milliseconds of CPU per request).
- Data fetches still need to reach an origin. If your database is in `us-east-1` and your edge worker runs in São Paulo, you’ve just added latency. Pair edge rendering with edge-replicated data (Cloudflare D1, Turso, Upstash, Neon’s read replicas).

## When *not* to use SSR

- **Truly static content** (marketing pages, blog posts, docs): use static rendering. Same HTML, no per-request cost.
- **Highly interactive apps with a stable shell** (a Figma-style editor): hydration cost outweighs SSR’s benefit. CSR with an app shell is fine.
- **Pages that can tolerate a few minutes of staleness**: use ISR with revalidation. You keep CDN-edge caching while still getting fresh content.

## A practical checklist

Before shipping SSR to production, verify:

- You’re using `renderToPipeableStream` (Node) or `renderToReadableStream` (edge), not the deprecated `renderToString` for primary rendering.
- The client uses `hydrateRoot`, not `ReactDOM.hydrate`.
- An `onError` handler logs streaming errors and at least one boundary catches render failures.
- `` wraps slow data so the shell can stream first.
- Long-running data fetches have request-scoped caching (per render) to avoid duplicate calls.
- Your bundle is route-split — hydration only needs the JS for the current page.

The next patterns we’ll look at — Streaming SSR, Static Rendering, ISR, Progressive Hydration, and React Server Components — each refine some part of this baseline.
