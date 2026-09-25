---
title: Client-side Rendering
lang: en
source: https://www.patterns.dev/react/client-side-rendering/
---

Client-side rendering (CSR) ships an almost empty HTML document. A small bootstrap script downloads, parses, and executes JavaScript that constructs the DOM, fetches data, wires up routing, and paints every pixel the user sees. The server’s only job is to hand over an HTML shell and the JavaScript needed to run the app in the browser.

This model powered the rise of single-page applications. It made web apps feel like installed software — instant route transitions, optimistic updates, and rich interaction without the page ever reloading. The cost is that the *first* paint depends entirely on how fast the client can download and execute the bundle.

CSR is still a useful pattern today, but its place has narrowed. It remains a strong fit for authenticated dashboards, internal tools, and embedded widgets. It is no longer the default for content-heavy or public-facing sites, where the first-load tradeoffs are too steep relative to what modern frameworks deliver out of the box.

## When CSR fits, when it doesn’t

CSR works well when:

- The page lives behind authentication (SEO is a non-goal).
- The user opens the app once and stays — long session depth amortizes the bundle cost.
- Interactivity is dense and stateful (drawing tools, spreadsheets, IDEs, design canvases).
- The app needs offline support via a service worker and an app shell.

CSR is a poor fit when:

- The page must be indexed by search engines or shared via link previews.
- The user lands cold and bounces quickly (marketing pages, blog posts, news).
- Time to Largest Contentful Paint (LCP) and Time to First Byte (TTFB) are critical business metrics.
- The audience is on low-end devices or slow networks where JavaScript parse/execute cost dominates.

For everything in the second group, a hybrid model — server rendering or static generation for the initial response, then hydration on the client — beats pure CSR on every Core Web Vital that matters.

## A minimal modern CSR setup

Here is the smallest meaningful CSR example using the current React 18+ API. `ReactDOM.render` was deprecated in React 18 and removed conceptually in favor of `createRoot`, which opts your tree into Concurrent Rendering.

JavaScript iconmain.jsxJavaScript iconApp.jsxJavaScript iconindex.html

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";


const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```



The browser receives an empty ``, downloads `main.jsx` (and whatever it imports), then React mounts the tree. Every byte of UI, data, and behavior travels over the wire as JavaScript.

## The performance shape of a CSR page

CSR moves work from the server to the client. That shifts the performance curve in a predictable way:

| Metric | CSR behavior |
| --- | --- |
| TTFB | Fast — server returns a static shell. |
| FCP | Late — blocked on bundle download, parse, and first render. |
| LCP | Late — typically gated on the largest in-app fetch returning. |
| TTI / INP | Late initially, very low afterward — no round trip per interaction. |
| CLS | Risk — empty shell to populated UI is a layout-shift waiting to happen unless you reserve space. |

The TTI and FCP both push out roughly linearly with bundle size and parse cost. On a mid-tier Android phone, every 100 KB of compressed JavaScript adds a noticeable delay before paint.

## Tradeoffs worth naming

**SEO.** Crawlers now execute JavaScript, but they do so with a queue and a budget. A page that needs three sequential fetches before its main content exists may be indexed late, indexed partially, or have its link previews come back empty. If discoverability matters, do not rely on CSR alone.

**Perceived performance.** The user stares at a blank screen — or worse, a spinner over a blank screen — for the full duration of bundle download plus first data fetch. The longer the chain, the more the page feels broken.

**Device variance.** A modern MacBook can parse a megabyte of JS in tens of milliseconds. A three-year-old Android phone may take well over a second on the same bundle. CSR puts the *user’s* CPU on the critical path; SSR and SSG put the server’s there.

**Code duplication.** Validation rules, formatters, and date logic often need to exist on both sides of the network boundary. CSR pushes everything to the client, but you still need to mirror the server’s contract.

**Data fetching pattern.** Almost all CSR apps end up with a `useEffect` → `fetch` → `setState` pattern, which creates request waterfalls when components fetch in series. Libraries like TanStack Query or SWR mitigate this with caching and deduplication, but the fundamental shape — fetch *after* mount — remains.

## Squeezing more out of CSR

When CSR is the right call, treat the JavaScript bundle as the budget that determines your user experience.

- **Set a real budget.** Aim for under ~170 KB of compressed JavaScript on the critical path for initial load. Measure on a throttled mid-tier device, not your laptop.
- **Route-level code splitting.** Use `React.lazy` and dynamic `import()` so each route only ships what it needs. A bundle visualizer like `rollup-plugin-visualizer` or `webpack-bundle-analyzer` will tell you what is bloating each chunk.
- **Suspense for declarative loading.** Wrap lazy boundaries with `` so loading states are explicit and predictable, and the rest of the page is unaffected.
- **Preload the critical chain.** Use `` for entry chunks and `` for the first data request. Reduces the head-of-line latency that hurts LCP.
- **Defer non-critical UI.** Below-the-fold widgets, chat bubbles, comments, third-party scripts — load them via `IntersectionObserver` or after the main content is interactive.
- **App shell + service worker.** Cache the shell and static assets. Repeat visits become near-instant and work offline.
- **Skeleton UI, not spinners.** A skeleton that matches the final layout prevents CLS and reads as faster than a centered spinner.
- **Use a data fetching library.** TanStack Query, SWR, or Apollo Client give you request deduplication, caching, stale-while-revalidate semantics, and a unified loading/error model. They are not optional for serious CSR apps.

## How React 18+ changed the picture

A few concurrent-rendering features mitigate some classic CSR pain points:

- **Automatic batching** collapses multiple state updates inside async callbacks into a single render, which used to require `unstable_batchedUpdates`.
- **`useTransition`** lets you mark expensive updates (filter changes, large list re-renders) as non-urgent so the UI stays responsive.
- **`useDeferredValue`** keeps an input snappy while a derived view (search results, autocomplete) catches up.
- **Selective hydration** isn’t directly a CSR feature, but the same scheduler powers concurrent rendering in CSR apps, making large updates interruptible.

These don’t change CSR’s fundamental cost — JavaScript still has to arrive before anything renders — but they smooth out the *interactive* experience once the app is running.

## When you outgrow CSR

If your CSR app started as a quick prototype and is now serving real users, the upgrade path is well-trodden:

- Move to **Next.js**, **Remix**, or **TanStack Start** to get SSR or SSG for the initial response while keeping the SPA-style navigation you’re used to.
- Convert public, content-driven routes to **Server Components** (zero client JS for the static parts) and keep the heavily interactive screens client-side with `'use client'`.
- Use **streaming SSR** so the user sees a meaningful first paint before any data finishes loading.

The remaining patterns in this section walk through each of those alternatives.
