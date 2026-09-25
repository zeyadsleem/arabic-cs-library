---
title: Observer Pattern
lang: en
source: https://www.patterns.dev/vanilla/observer-pattern/
---

Imagine you’re building a stock dashboard. The price ticker arrives over a WebSocket, and several unrelated pieces of UI need to react: a chart redraws, a row in a watchlist flashes green or red, a portfolio total recalculates, and an audit log records the tick. The WebSocket has no business knowing about any of those consumers. What it needs is a way to say “here is a new tick” and let interested parties decide what that means for them.

That is the Observer pattern. A **subject** maintains a list of **observers** and broadcasts to them when something changes. New observers can attach themselves whenever they like; existing observers can detach when they’re done. Nothing in the subject is hard‑coded to a specific consumer.

## The core shape

At minimum, a subject needs three things: somewhere to keep observers, a way to add and remove them, and a way to push updates. Here’s a small implementation that uses a `Set` so we get O(1) removal and deduplication for free.

```
class Subject {
  #observers = new Set();

  subscribe(observer) {
    this.#observers.add(observer);
    // Hand back an unsubscribe function — easier than asking
    // the caller to hold onto the reference they passed in.
    return () => this.#observers.delete(observer);
  }

  notify(payload) {
    for (const observer of this.#observers) {
      observer(payload);
    }
  }
}
```

The return value of `subscribe` is a small ergonomic win that pays for itself the first time you forget what you passed in. The caller stores the returned function and calls it when they’re done — no lookup, no equality comparison, no `unsubscribe` method on the subject at all.

## A concrete example: a stock ticker

Let’s wire the subject to a stream of prices and a few consumers that want to know about them.

```
const ticker = new Subject();

// A chart that buffers ticks and redraws every animation frame.
const chartQueue = [];
let pending = false;
const drawChart = (tick) => {
  chartQueue.push(tick);
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    renderChart(chartQueue);
    chartQueue.length = 0;
    pending = false;
  });
};

// A watchlist row that flashes when its symbol updates.
const flashRow = ({ symbol, price, previous }) => {
  if (symbol !== "AAPL") return;
  document
    .querySelector('[data-symbol="AAPL"]')
    ?.classList.toggle("up", price > previous);
};

// A logger that records every tick for replay.
const logTick = (tick) => console.debug("[tick]", tick);

const unsubChart = ticker.subscribe(drawChart);
const unsubRow   = ticker.subscribe(flashRow);
const unsubLog   = ticker.subscribe(logTick);

// Somewhere else, the WebSocket pushes new prices in:
socket.addEventListener("message", (event) => {
  const tick = JSON.parse(event.data);
  ticker.notify(tick);
});
```

Each consumer is a small, focused function. The ticker doesn’t know any of them by name. If you decide later that the watchlist row should debounce, or that the logger should sample only one in ten ticks, you change the consumer — the ticker is untouched. That decoupling is the entire payoff of the pattern.

## Using the browser’s built‑in Observer: `EventTarget`

You don’t always need to write your own `Subject`. Since 2017, every browser has shipped a constructable `EventTarget` — the same machinery the DOM uses for `addEventListener`, available for arbitrary objects.

```
class Ticker extends EventTarget {
  push(tick) {
    this.dispatchEvent(new CustomEvent("tick", { detail: tick }));
  }
}

const ticker = new Ticker();

ticker.addEventListener("tick", (e) => drawChart(e.detail));
ticker.addEventListener("tick", (e) => flashRow(e.detail));
```

This gets you a ready‑made pub/sub mechanism with one significant bonus: **`AbortSignal` integration**. Cleanup becomes a one‑liner regardless of how many listeners you registered.

```
const controller = new AbortController();
const { signal } = controller;

ticker.addEventListener("tick", drawChart, { signal });
ticker.addEventListener("tick", flashRow,  { signal });
ticker.addEventListener("tick", logTick,   { signal });

// Later, when the dashboard unmounts:
controller.abort(); // every listener attached with `signal` is removed
```

If you’ve ever forgotten to remove a listener and chased a memory leak through Chrome DevTools’ heap snapshots, this should look like a small miracle. The signal turns “remember every subscription so you can clean it up” into a single `abort()` call.

## Observer vs. Pub/Sub

The two patterns are siblings, and they’re often conflated. The distinction is real and useful.

|  | Observer | Pub/Sub |
| --- | --- | --- |
| **Coupling** | Observer knows about the subject | Publisher and subscriber both know only the broker |
| **Routing** | One subject, all observers receive every notification | Topic / channel — subscribers opt into specific names |
| **Implementation** | Method on the subject | Separate broker object (event bus) |
| **Typical use** | Domain object notifying its watchers | App‑wide event bus across unrelated modules |

In the stock ticker above, `ticker` is the subject and every subscriber receives every tick — that’s classic Observer. If we instead had `bus.publish("ticks/AAPL", price)` and subscribers selected by topic, that would be Pub/Sub.

A minimal Pub/Sub built on `EventTarget`:

```
class EventBus {
  #target = new EventTarget();

  publish(topic, data) {
    this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }));
  }

  subscribe(topic, handler, { signal } = {}) {
    const listener = (e) => handler(e.detail);
    this.#target.addEventListener(topic, listener, { signal });
    return () => this.#target.removeEventListener(topic, listener);
  }
}
```

## Modern variants you should know

### Async iterators

If your “events” are really a sequence, an async iterator turns them into a `for await...of` loop — readable top‑to‑bottom code that pauses at each iteration:

```
async function* watchTicks(socket, { signal }) {
  while (!signal.aborted) {
    const message = await new Promise((resolve, reject) => {
      socket.addEventListener("message", resolve, { once: true, signal });
      socket.addEventListener("error",   reject,  { once: true, signal });
    });
    yield JSON.parse(message.data);
  }
}

const controller = new AbortController();
for await (const tick of watchTicks(socket, { signal: controller.signal })) {
  drawChart(tick);
}
```

This composes well with `AsyncIterator.prototype.map` and friends — proposals that are progressing through TC39 and already work in modern engines via helper libraries.

### Reactive signals

A different take on Observer is the **signal**: a small reactive primitive that knows which functions read it and re‑runs them when it changes. Preact, Solid, Angular, and Vue have all converged on a similar shape, and a TC39 proposal is exploring a standardized version.

```
import { signal, computed, effect } from "@preact/signals-core";

const price    = signal(100);
const quantity = signal(2);
const total    = computed(() => price.value * quantity.value);

effect(() => console.log(`Total: $${total.value}`));

price.value = 110;   // logs "Total: $220"
quantity.value = 3;  // logs "Total: $330"
```

The subscription is invisible — `effect` simply re‑runs whenever any signal it read changes. Underneath, it’s still Observer: the signal is the subject, the effect is the observer.

### RxJS for stream composition

When the relationship between events matters — debouncing a search box, merging two streams, retrying on failure — RxJS earns its weight. Here’s a typeahead that waits for the user to stop typing, ignores duplicate searches, and cancels stale requests:

```
import { fromEvent, switchMap, debounceTime, distinctUntilChanged, map } from "rxjs";

const input = document.querySelector("#search");

fromEvent(input, "input").pipe(
  map((e) => e.target.value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((q) =>
    q ? fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.json()) : []
  )
).subscribe(renderResults);
```

`switchMap` automatically cancels the previous fetch when a new query arrives — exactly the behavior you want for typeahead. Building that by hand on top of plain Observer is doable but tedious; RxJS makes it declarative.

## Common pitfalls

### Memory leaks from forgotten subscriptions

This is the failure mode for the pattern. Every subscription is a reference from the subject to the observer; until you unsubscribe, the observer (and anything it closes over) cannot be garbage collected. Three mitigations:

- **Use `AbortSignal`** with `EventTarget` so cleanup is a single `abort()` call.
- **Return an unsubscribe function from `subscribe`** so callers don’t need to find their handler again.
- **Tie subscriptions to component lifecycles** in frameworks — React’s `useEffect` cleanup, Vue’s `onScopeDispose`, Svelte’s `onDestroy`.

### Notification order assumptions

Observers receive notifications in subscription order in most implementations, but you should not rely on that for correctness. If observer B genuinely needs to run after observer A, that’s a dependency the pattern can’t express — model it explicitly instead.

### Synchronous notification storms

`notify` runs every observer synchronously. If one observer takes 200 ms, every observer behind it waits. If a tick arrives every 16 ms and your observers take longer than that to run, you’re heading for frame drops or queue blowups. Consider batching (as in the chart example above) or offloading heavy work with `queueMicrotask` / `setTimeout`.

### Re‑entrant notifications

If an observer’s handler triggers a new `notify` on the same subject, you can end up in surprising recursion. If that’s a real risk in your domain, queue notifications instead of dispatching them inline.

## When NOT to use Observer

- **When one‑shot data flow would do.** A `Promise` is the right shape for “tell me when this finishes, once.” Observer is for repeated events.
- **When the subject and observer always live together.** If only one thing ever observes the subject and they’re created in the same place, a direct method call is simpler and easier to follow.
- **When you need a request/response round‑trip.** Observer is fire‑and‑forget. If callers expect an answer, use a function call, a promise, or a command bus.

## References

- [EventTarget — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [AbortController — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [RxJS](https://rxjs.dev)
- [Signals proposal — TC39](https://github.com/tc39/proposal-signals)
- [Async iterators — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
