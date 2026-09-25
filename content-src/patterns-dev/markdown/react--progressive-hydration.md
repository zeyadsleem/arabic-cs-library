---
title: Progressive Hydration
lang: en
source: https://www.patterns.dev/react/progressive-hydration/
---

A server-rendered page paints fast. The HTML is on screen long before any React code runs. But the page isn’t *interactive* until React has downloaded the JS bundle, walked the entire DOM, matched every node to a component, and attached event listeners. That step — hydration — happens all at once, synchronously, and it grows linearly with the size of your component tree.

The result is a familiar failure mode: a complete-looking page sits on screen for a half-second or more, dropping clicks and looking broken. The metric Google uses to capture this is **Interaction to Next Paint (INP)**, which replaced First Input Delay in Core Web Vitals in March 2024. Hydration is one of the largest contributors to bad INP scores on otherwise well-built sites.



Progressive hydration is the family of techniques that splits hydration into pieces and runs each piece at the moment it actually matters — when its JS arrives, when the user scrolls it into view, or when the user tries to interact with it. The goal is the same hydration outcome with much less work on the page’s critical path.

## What “all at once” actually costs

A few numbers to ground the discussion. On a 2019 mid-range Android phone:

- Parsing 200 KB of compressed JS takes roughly 300–500 ms.
- Hydrating a moderately complex page (say, 1,500 React nodes) takes another 150–300 ms.
- The main thread is blocked the entire time, which means clicks, scrolls, and CSS animations all stutter or queue.

If your hero, your nav, and a footer-mounted chat widget all hydrate together, the chat widget — the part nobody touches for 30 seconds — is part of your INP-blocking budget right from page load. Progressive hydration’s premise is that this is silly. Hydrate what’s interactive *now*; defer the rest.



## The shape of the technique

A holistic progressive-hydration system needs five things:

- The server renders the full HTML for every component (no missing content while waiting for hydration).
- Each component’s JavaScript is in its own code-split chunk.
- Hydration runs per chunk, in a defined or trigger-based order.
- Already-hydrated regions stay interactive while other regions are still hydrating.
- There is a visible, non-jarring loading state when needed.

React 18 ships most of this out of the box. The next sections show how to use it.

## Selective hydration: the built-in baseline

If you’re already using `hydrateRoot` with ``, you’re already doing the simplest form of progressive hydration. Any tree wrapped in `` hydrates *independently* of the rest of the page. And if the user clicks inside a region that hasn’t hydrated yet, React reprioritizes — that region jumps the queue.

```
import { Suspense, lazy } from "react";\n
const ProductReviews = lazy(() => import("./ProductReviews"));
const RelatedProducts = lazy(() => import("./RelatedProducts"));
const Comments = lazy(() => import("./Comments"));\n
export default function ProductPage({ product }) {
  return (
    <>
      <ProductDetails product={product} /> {/* hydrates first */}\n
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={product.id} />
      </Suspense>\n
      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedProducts productId={product.id} />
      </Suspense>\n
      <Suspense fallback={null}>
        <Comments productId={product.id} />
      </Suspense>
    </>
  );
}
```

The result on the wire:

- `ProductDetails` hydrates as part of the main bundle.
- The other three regions each fetch their own chunk and hydrate when it arrives.
- If the user clicks “post a comment” before the comments chunk has loaded, React loads and hydrates *that* region first.

This is enough for most sites. You don’t need a custom hydrator or a third-party library — `` plus `lazy()` plus `hydrateRoot` is the entire mechanism.

## Visibility-based hydration

For below-the-fold content, you can do better than “load it eventually” — you can wait until the user actually scrolls it into view. This is the same idea as image lazy-loading, applied to JavaScript.

A small `` wrapper using `IntersectionObserver` looks like this:

```
"use client";
import { useState, useEffect, useRef, Suspense } from "react";\n
export function LazyHydrate({ children, rootMargin = "200px" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);\n
  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;\n
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);\n
  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
```

In Next.js, the more idiomatic version is `next/dynamic`:

```
import dynamic from "next/dynamic";\n
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <ChartSkeleton />,
});
```

By default this still ships server-side. Use `{ ssr: false }` to skip server rendering for genuinely client-only widgets (a Mapbox map, a code editor), letting their JS download and execute completely off the critical path.

## Interaction-based hydration (“hydrate on hover”, “hydrate on click”)

For UI that the user *might* engage with — a search dropdown, a date picker, a complex menu — you can delay even loading the chunk until the user signals intent. This is what frameworks like Astro and Qwik formalize as `client:idle`, `client:visible`, `client:media`, `client:only`.

In a Next.js app you can replicate it with a small wrapper:

```
"use client";
import { useState, lazy, Suspense } from "react";\n
const SearchModal = lazy(() => import("./SearchModal"));\n
export function SearchTrigger() {
  const [open, setOpen] = useState(false);\n
  return (
    <>
      <button onClick={() => setOpen(true)}>Search</button>
      {open && (
        <Suspense fallback={<p>Loading search...</p>}>
          <SearchModal onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
```

The trigger button is hydrated as part of the main bundle (it’s tiny). The modal — which carries the heavy dependencies (fuzzy-search library, recent-history state, telemetry) — doesn’t ship to the client until the user clicks. Zero hydration cost up front; small latency on first interaction.

## React 19 transitions help here too

Hydration competes for the main thread with everything else the browser is doing. React 19 stabilized **async transitions** and **Actions**, which give you tools to keep hydration from blocking interaction:

- Mark heavy state updates as transitions with `startTransition` so React can interrupt them.
- The Actions API runs form submissions through a transition automatically, so a click that submits a form remains responsive even while related components are still hydrating.
- `useActionState` and `useFormStatus` give progressive-enhancement-friendly form handling — the form works before JavaScript loads at all.

```
"use client";
import { useActionState } from "react";
import { subscribeAction } from "./actions";\n
export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);\n
  return (
    <form action={formAction}>
      <input type="email" name="email" required />
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

Because the form’s `action` is a real Server Action, the form submits even before this component hydrates. Progressive enhancement gives you a no-hydration baseline; React 19’s hooks let you upgrade to the rich UX after.

## React Server Components: hydration’s other escape hatch

The most aggressive form of “don’t hydrate this” is “don’t ship its JS at all”. A React Server Component renders entirely on the server, never produces a client bundle, and has nothing to hydrate. Hydration cost for an RSC is exactly zero.

```
// app/page.tsx  -- Server Component by default
import ClientCounter from "./ClientCounter";\n
export default async function Home() {
  const posts = await db.posts.findMany();\n
  return (
    <main>
      <h1>Latest posts</h1>
      <ul>
        {posts.map((p) => <li key={p.id}>{p.title}</li>)} {/* no client JS */}
      </ul>
      <ClientCounter /> {/* the only thing that hydrates */}
    </main>
  );
}
```

This is the framing the React team has been pushing toward: instead of optimizing how hydration works, eliminate it for the parts of the page that don’t need it. Combine RSCs (for static and data-driven parts) with `'use client'` islands (for genuinely interactive parts) and you reduce hydration to a tiny fraction of the page.

## What to measure

Progressive hydration is invisible if you’re not measuring the right things. Track:

- **INP (Interaction to Next Paint)** — the headline metric. Anything under 200 ms is good; over 500 ms is poor.
- **Total Blocking Time (TBT)** in lab tests (Lighthouse, WebPageTest). High TBT during hydration shows up here.
- **Long Animation Frames (LoAF)** — newer API that surfaces specific JS tasks blocking the main thread.
- **JS bytes per route** — track per-route bundle size in CI so regressions don’t sneak in.

## The decision tree

For each component on a server-rendered page:

- Does it need to be interactive at all? If no, make it a Server Component (or pure HTML).
- Is it above the fold and immediately useful? Hydrate it in the main bundle.
- Is it below the fold but eventually likely to be used? `next/dynamic` or visibility-based hydration.
- Is it triggered by an explicit user action (modal, dropdown)? Interaction-based hydration.
- Is it conditional on viewport, network, or other media? Conditional client directives.

Apply this to every region of your page and the total cost of becoming interactive collapses. Progressive hydration is less a single feature than a posture: assume hydration is expensive, and treat every component’s hydration moment as a decision rather than a default.
