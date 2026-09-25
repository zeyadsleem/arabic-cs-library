---
title: Streaming Server-Side Rendering
lang: en
source: https://www.patterns.dev/react/streaming-ssr/
---

Classic SSR has a buffering problem. The server runs the full render — including every async data fetch the page needs — and only then writes a single HTML response. If the slowest fetch on the page takes 800 ms, the user waits at least 800 ms for *any* content to paint. The page’s fastest parts are held hostage by its slowest.

Streaming SSR fixes this by letting React send HTML to the browser as it becomes available. The shell (header, navigation, layout chrome, anything that doesn’t depend on async data) flushes immediately. The slow parts — wrapped in `` — stream in as later chunks of the same HTTP response, each replacing a fallback that was already visible.



The browser begins parsing as soon as bytes arrive. Time to First Byte drops because the server doesn’t wait. Largest Contentful Paint usually drops because the main content is in the first chunk. And the user sees movement — fallback placeholders becoming real content — instead of staring at a blank tab.

## The two streaming APIs in React 18+

React 18 redesigned the server APIs around streaming. There are two depending on your runtime:

- **`renderToPipeableStream`** — for Node.js. Returns a Pipeable stream you `pipe()` into the response. Uses `onShellReady` / `onAllReady` / `onError` callbacks.
- **`renderToReadableStream`** — for Web/Edge runtimes (Cloudflare Workers, Vercel Edge, Deno, Bun). Returns a Promise of a Web `ReadableStream` you return as the response body.

The older `renderToNodeStream` was removed in React 19. If you’re maintaining a server that still uses it, this is the migration to do — it does not support `` or any of the streaming guarantees described below.

## Streaming on Node with `renderToPipeableStream`

Here’s a complete streaming SSR setup for an analytics dashboard page. The shell renders immediately; the chart and recent-activity feed each suspend on their own fetches and stream in independently.

```
// server.jsx
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import Dashboard from "./Dashboard";\n
const app = express();\n
app.get("/", (req, res) => {
  let didError = false;\n
  const { pipe, abort } = renderToPipeableStream(<Dashboard />, {
    bootstrapModules: ["/static/client.js"],
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-Type", "text/html");
      pipe(res);
    },
    onShellError(error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.send("<h1>Dashboard unavailable</h1>");
    },
    onError(error) {
      didError = true;
      console.error(error);
    },
  });\n
  // Drop the connection if a client hangs for too long.
  setTimeout(abort, 10_000);
});\n
app.listen(3000);
```

And the page itself, with two suspending data dependencies:

```
// Dashboard.jsx
import { Suspense } from "react";
import ChartCard from "./ChartCard";
import ActivityFeed from "./ActivityFeed";\n
export default function Dashboard() {
  return (
    <html>
      <body>
        <header>
          <h1>Analytics</h1>
          <nav>{/* always-fast nav */}</nav>
        </header>\n
        <Suspense fallback={<ChartCardSkeleton />}>
          <ChartCard /> {/* fetches a slow time series */}
        </Suspense>\n
        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeed /> {/* fetches the last 50 events */}
        </Suspense>
      </body>
    </html>
  );
}
```

What the browser sees, in order:

- **The shell** (HTML, header, navigation, both skeletons) — flushed when `onShellReady` fires.
- **Whichever data finishes first** — its HTML streams in, along with an inline script that swaps the corresponding skeleton out.
- **The other one**, when ready.

If the activity feed resolves in 80 ms and the chart in 600 ms, the user sees the activity feed at 80 ms instead of waiting the full 600. The page felt 7× faster.

## `onShellReady` vs `onAllReady`

These two callbacks model fundamentally different intents:

- **`onShellReady`** fires the moment everything *outside* of any `` boundary can render. This is what you want for users — flush the shell ASAP and let the rest stream.
- **`onAllReady`** fires only when the entire tree is rendered, including all `` content. Use this for clients that can’t or won’t process streamed updates: crawlers (some of them), email rendering, social-card preview fetchers, RSS exporters.

A common pattern is to detect the user-agent and pick the right callback:

```
const isCrawler = /bot|crawler|spider|crawling/i.test(req.headers["user-agent"] || "");\n
const { pipe } = renderToPipeableStream(<App />, {
  bootstrapModules: ["/static/client.js"],
  [isCrawler ? "onAllReady" : "onShellReady"]() {
    res.statusCode = didError ? 500 : 200;
    res.setHeader("Content-Type", "text/html");
    pipe(res);
  },
  onError(err) {
    didError = true;
    console.error(err);
  },
});
```

## Streaming on the edge with `renderToReadableStream`

Edge runtimes don’t have Node streams; they speak Web Streams. The shape is similar but the API is promise-based:

```
// edge-handler.jsx
import { renderToReadableStream } from "react-dom/server";
import App from "./App";\n
export default {
  async fetch(request) {
    let didError = false;\n
    const stream = await renderToReadableStream(<App />, {
      bootstrapModules: ["/static/client.js"],
      onError(err) {
        didError = true;
        console.error(err);
      },
    });\n
    // Wait for the shell before responding — analogous to onShellReady.
    await stream.allReady; // omit this to flush as early as possible
    // Or, for crawlers, wait for the whole tree:
    // await stream.allReady;\n
    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { "content-type": "text/html" },
    });
  },
};
```

The Promise returned by `renderToReadableStream` resolves once the shell is ready. The stream itself has an `allReady` Promise you can await when you need the whole tree (the crawler case). If you don’t await anything past the initial Promise, the response starts streaming immediately.

## Hydration with streaming

Hydration in a streaming world is the dual of rendering: as each chunk arrives, React on the client matches the new DOM nodes to component code and attaches their event listeners. This is **selective hydration**, and it has two important properties:

- **Hydration happens in chunks.** A `` boundary hydrates independently of the rest of the page. The user can interact with the navigation while the chart is still loading.
- **User input wins.** If the user clicks a button in a region that hasn’t hydrated yet, React prioritizes hydrating *that* region first. Selective hydration prevents the worst form of the uncanny-valley — a click being silently dropped because hydration was busy elsewhere.

On the client side, use `hydrateRoot`:

```
// client.jsx
import { hydrateRoot } from "react-dom/client";
import App from "./App";\n
hydrateRoot(document, <App />);
```

`ReactDOM.hydrate` was removed in React 19. If you’re still using it, switching to `hydrateRoot` is the upgrade path.

## Error boundaries are not optional with streaming

When the shell has already flushed, an error in a deeper component can’t change the HTTP status code. Your only options are to (a) replace the affected region with a fallback in the stream, or (b) let React tear it down on the client during hydration. Both require an Error Boundary.

```
<ErrorBoundary fallback={<p>Could not load reviews.</p>}>
  <Suspense fallback={<ReviewSkeleton />}>
    <Reviews productId={id} />
  </Suspense>
</ErrorBoundary>
```

The pattern is: wrap each streaming region in *both* an error boundary and a suspense boundary. The suspense boundary handles the “still loading” state. The error boundary handles the “loaded, but failed” state.

For graceful error recovery, the `onError` callback of `renderToPipeableStream` is where you log; the error boundary is where you render an alternative UI.

## Streaming in Next.js

The App Router does all of this for you. Any `loading.tsx` file in a route segment becomes a `` boundary automatically; any async server component that suspends streams in when its data resolves.

```
app/dashboard/
  layout.tsx       <-- always renders, flushed first
  loading.tsx      <-- Suspense fallback for the page
  page.tsx         <-- async, can fetch data
  @analytics/
    loading.tsx
    page.tsx       <-- parallel route, streams independently
  error.tsx        <-- error boundary
```

You don’t write `renderToPipeableStream` directly — Next.js calls it (or its edge equivalent) for you and wires up streaming based on those file conventions. The result is the same: the static layout flushes immediately, slow data streams in, and selective hydration handles interactivity.

## What streaming costs

Streaming isn’t free. A few things to be aware of:

- **You can’t change response headers after the first chunk.** Status code, `Set-Cookie`, redirects, security headers — all decided before the first flush. If a deeper component would have triggered a 404, you can render an in-band error message, but the response status is locked at 200.
- **Some middleware breaks.** Anything that buffers the full response (compression done wrong, certain WAF or CDN configurations) defeats streaming entirely. Verify by curling and watching `Transfer-Encoding: chunked` actually behave like a stream.
- **TTFB looks lower than the actual experience.** The first byte arrives quickly, but it might be just the ``. Track LCP and INP, not TTFB alone, when comparing streaming SSR to non-streaming SSR.
- **Suspense changes data fetching patterns.** A component that suspends must use a Suspense-compatible data layer — React’s `use()` hook, a framework primitive (Next.js `fetch`, Remix `useLoaderData`), or a library that adapts (TanStack Query’s `useSuspenseQuery`). Plain `useEffect` doesn’t suspend.

## When streaming SSR is the right call

| Page profile | Use streaming SSR? |
| --- | --- |
| Dashboard with several slow fetches | Yes — biggest win. |
| Marketing page, all static data | No — use SSG or PPR. |
| Auth-gated page with one fast fetch | Optional — gains are small if there’s nothing to overlap. |
| Live, real-time data updates | Streaming SSR handles the initial paint; use WebSocket or SSE for ongoing updates. |
| Pages crawlers need fully rendered | Yes, but use `onAllReady` for those user agents. |

Streaming SSR pairs especially well with **Partial Prerendering** (a static shell streamed before any dynamic work begins) and with **React Server Components** (which can do their data fetching server-side without contributing to the client bundle). The next pattern in this series, **Progressive Hydration**, picks up where streaming SSR leaves off — solving the question of *how much* JavaScript needs to ship for the page to become interactive, not just how to get its HTML painted.
