---
title: Mediator/Middleware Pattern
lang: en
source: https://www.patterns.dev/vanilla/mediator-pattern/
---

A mediator is the object in the middle. Components that would otherwise have to know about each other talk to the mediator instead, and the mediator decides what should happen next. Think of a moderator in a busy chat room: every message goes through them, and they enforce the rules — who can speak, who gets muted, whose message gets pinned. The participants don’t need to know the others by name. They just need to know there’s a moderator listening.

Without a mediator, a system with N components that all need to talk to each other ends up with on the order of N² connections. Each component knows about each other component, change one and the blast radius is everything. With a mediator, every component has exactly one line of communication: to the middle. The middle is the only thing that has to understand the choreography.

## A simple custom mediator

Here’s a small mediator that coordinates the steps of a multi‑step form wizard. The wizard has independent step components (personal info, shipping address, payment), and somebody needs to decide what “next” means based on the current state. That decision belongs in the mediator, not duplicated in each step.

```
class WizardMediator {
  #steps = [];
  #current = 0;
  #data = {};
  #listeners = new Set();

  registerSteps(steps) {
    this.#steps = steps;
  }

  notify(sender, event, payload) {
    switch (event) {
      case "submit": {
        Object.assign(this.#data, payload);
        const nextIndex = this.#computeNext(sender, payload);
        if (nextIndex >= this.#steps.length) {
          this.#emit({ type: "complete", data: this.#data });
        } else {
          this.#current = nextIndex;
          this.#emit({ type: "advance", step: this.#steps[nextIndex] });
        }
        break;
      }
      case "back":
        this.#current = Math.max(0, this.#current - 1);
        this.#emit({ type: "advance", step: this.#steps[this.#current] });
        break;
      case "cancel":
        this.#data = {};
        this.#current = 0;
        this.#emit({ type: "reset" });
        break;
    }
  }

  // The conditional flow lives here, not in any one step.
  #computeNext(sender, payload) {
    if (sender === "personal" && payload.accountType === "guest") {
      return this.#steps.indexOf("payment"); // skip address-on-file
    }
    return this.#current + 1;
  }

  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }

  #emit(event) {
    for (const fn of this.#listeners) fn(event);
  }
}
```

Each step component now has a tiny contract with the mediator: call `notify("submit", { ... })` when the user clicks Next. The step doesn’t import any other step, doesn’t know which step comes after it, and doesn’t make decisions about the flow. The mediator owns all of that.

If marketing tells you next quarter that the address step should be skipped for B2B accounts, you change one branch in `#computeNext`. The step components don’t need to know that the rule exists.

## Mediator vs. middleware

Middleware — Redux middleware, Apollo Link, Hono, fastify, server frameworks of every shape — is mediator dressed up as a pipeline. Instead of a single object deciding what to do, you compose a chain of small functions, each of which can inspect, transform, short‑circuit, or pass along the message.

Here is a tiny middleware engine, the same shape every Express‑like framework uses internally:

```
function createPipeline(...middleware) {
  return function dispatch(ctx) {
    let index = -1;

    function runFrom(i) {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      const fn = middleware[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, () => runFrom(i + 1)));
    }

    return runFrom(0);
  };
}
```

A handler is `(context, next) => ...`. Calling `next()` yields to the next link in the chain; not calling it short‑circuits the rest. Because each step gets the same `ctx`, mutations stack the same way they do in Express, Koa, or Hono.

```
const handle = createPipeline(
  async (ctx, next) => {
    const started = performance.now();
    await next();
    console.log(`${ctx.path} ${performance.now() - started}ms`);
  },

  async (ctx, next) => {
    const token = ctx.headers.authorization;
    if (!token) {
      ctx.response = { status: 401, body: "Unauthorized" };
      return; // short-circuit
    }
    ctx.user = await verify(token);
    await next();
  },

  async (ctx) => {
    ctx.response = { status: 200, body: `Hello, ${ctx.user.name}` };
  }
);

await handle({ path: "/me", headers: { authorization: "Bearer ..." } });
```

The same shape powers **Redux middleware** (each middleware sees an action and decides whether to dispatch the next one), **Apollo Link** (each link wraps an operation), and **Hono / Koa** (each middleware wraps a request). Once you recognize the pattern you see it everywhere.

## When the mediator is a state machine

For genuinely complex coordination — a checkout flow with retries, an upload with pause/resume/cancel, a video player with buffering and error recovery — a finite state machine is often the right shape for the mediator. The states and transitions are the protocol, and components send events into the machine rather than calling each other.

[XState](https://stately.ai/docs/xstate) makes this explicit:

```
import { setup, createActor } from "xstate";

const uploadMachine = setup({
  actions: {
    sendBytes: ({ context }) => api.upload(context.file),
    cleanup:   ({ context }) => api.abort(context.uploadId),
  },
}).createMachine({
  id: "upload",
  initial: "idle",
  context: { file: null, uploadId: null, progress: 0 },
  states: {
    idle:     { on: { START:  "uploading" } },
    uploading: {
      entry: "sendBytes",
      on: {
        PROGRESS: { actions: ({ context, event }) => (context.progress = event.value) },
        DONE:    "success",
        ERROR:   "failed",
        CANCEL:  { target: "idle", actions: "cleanup" },
      },
    },
    success: { type: "final" },
    failed:  { on: { RETRY: "uploading" } },
  },
});

const upload = createActor(uploadMachine).start();
upload.send({ type: "START" });
```

The UI fires events. The machine decides what’s legal — `PROGRESS` while idle is silently ignored, `RETRY` only works from `failed`, etc. The illegal transitions can’t happen because they aren’t in the diagram.

## Mediator vs. Facade vs. Event Bus

These three patterns get conflated constantly. They are not the same thing.

|  | Mediator | Event Bus (Pub/Sub) | Facade |
| --- | --- | --- | --- |
| **Direction** | Multidirectional — components talk to it, it talks back | Fire‑and‑forget — publishers don’t know subscribers | Unidirectional — caller invokes, facade hides complexity |
| **Owns logic?** | Yes — the workflow lives here | No — just routing | No — just delegation |
| **Components know about it?** | Yes — they call its API | Yes — they publish/subscribe | Usually only the caller’s side knows |
| **Typical use** | Coordinating a workflow (wizard, upload, form) | Decoupled cross‑cutting events (analytics, telemetry) | Hiding a messy subsystem behind one clean entry point |

A useful test: if the middle thing makes decisions, it’s a mediator. If it just routes messages without inspecting them, it’s a bus. If it simplifies access to something complicated without coordinating multiple parties, it’s a facade.

## Common pitfalls

### The God‑object mediator

The mediator’s job is to coordinate, not to do. If every business rule in your app ends up inside a single `AppMediator` class, you’ve turned it into a 4,000‑line monolith — the very thing the pattern is supposed to prevent. Split mediators by domain (`CheckoutMediator`, `UploadMediator`, `ChatMediator`), and keep each one focused on one workflow.

### Components that secretly know each other

The pattern’s value comes from components only knowing the mediator. The moment Component A imports Component B “just for the type,” or fires an event whose name encodes Component B’s existence, you’ve reintroduced coupling. Watch for it in code review.

### Hard to trace at runtime

When everything goes through one switch statement, “what happens when I click this button?” can become a small detective story. Mitigate with structured logging in the mediator itself — every notify/emit gets logged with a correlation ID — and with state‑machine visualizers when you use XState or similar.

### Re‑entrant notifications

If handling an event causes the mediator to emit another event synchronously, you can end up with surprising recursion. For non‑trivial mediators, queue events with `queueMicrotask` so each one finishes before the next starts.

## When NOT to use a mediator

- **Two components that always talk only to each other.** Insert nothing in the middle. A direct call is simpler and easier to follow.
- **One‑off events with no coordination.** A plain event bus or callback is enough.
- **Pipelines where every step always runs in order.** A simple function composition is clearer than a middleware engine.

The mediator pays for itself when you have three or more interacting components and the rules of who‑talks‑to‑whom are non‑trivial. Below that bar it’s overhead.

## References

- [Redux middleware](https://redux.js.org/understanding/history-and-design/middleware)
- [Apollo Link](https://www.apollographql.com/docs/react/api/link/introduction)
- [Hono — Web standard middleware](https://hono.dev/)
- [XState — state machines for JavaScript](https://stately.ai/docs/xstate)
- [Mediator — Refactoring Guru](https://refactoring.guru/design-patterns/mediator)
