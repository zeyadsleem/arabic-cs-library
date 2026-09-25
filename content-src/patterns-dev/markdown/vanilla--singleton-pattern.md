---
title: Singleton Pattern
lang: en
source: https://www.patterns.dev/vanilla/singleton-pattern/
---

A Singleton is an object that exists exactly once for the lifetime of your application. Every caller that reaches for it gets the same instance — same state, same methods, same identity. The pattern shows up whenever a resource is genuinely shared: a pool of database connections, a feature‑flag client polling a remote service, a WebSocket that fans incoming messages out to many subscribers, or an analytics client that batches events before flushing.

In each of those cases you don’t want two of the thing. Two pools would double your connection count. Two analytics clients would race when flushing. The Singleton is the conventional answer to “make sure there is one, no matter how many places ask for it.”

Before reaching for it, though, it’s worth asking a question that the rest of this article will keep returning to: **do you actually need a Singleton, or do you just need a value that lives at module scope?** In modern JavaScript the two are often confused, and the latter is almost always the better choice.

## A baseline: the class‑based Singleton

Here is the textbook implementation, modernized with private class fields and a static accessor. We’ll use a feature‑flag client as the running example — a service that loads flag values once and serves them to the rest of the app.

```javascript
class FeatureFlags {

  // Private static slot for the one instance

  static #instance = null;



  // Private state — invisible outside the class

  #flags = new Map();

  #loaded = false;



  constructor() {

    if (FeatureFlags.#instance) {

      return FeatureFlags.#instance;

    }

    FeatureFlags.#instance = this;

  }



  static getInstance() {

    return (FeatureFlags.#instance ??= new FeatureFlags());

  }



  async load(url) {

    if (this.#loaded) return;

    const res = await fetch(url);

    const data = await res.json();

    for (const [key, value] of Object.entries(data)) {

      this.#flags.set(key, value);

    }

    this.#loaded = true;

  }



  isEnabled(name) {

    return this.#flags.get(name) === true;

  }

}



export default FeatureFlags;
```

Two things deserve attention. The `#instance` field uses an ES2022 private static field, so no outside code can swap it out. And the `??=` logical assignment (ES2021) keeps the lazy‑initialization branch to a single readable line — `getInstance()` either returns the existing one or creates it.

A caller never instantiates this directly:

```javascript
import FeatureFlags from "./feature-flags.js";



const flags = FeatureFlags.getInstance();

await flags.load("/config/flags.json");



if (flags.isEnabled("new-checkout")) {

  // render the new flow

}
```

If a stubborn caller does call `new FeatureFlags()` twice, the constructor short‑circuits and returns the existing instance — the `===` identity is preserved. That guarantee is the whole point of the pattern.

## The modern alternative: module‑scoped state

Here is the same feature‑flag client written without any of the Singleton machinery.

```javascript
// feature-flags.js

const flags = new Map();

let loaded = false;



export async function load(url) {

  if (loaded) return;

  const res = await fetch(url);

  const data = await res.json();

  for (const [key, value] of Object.entries(data)) {

    flags.set(key, value);

  }

  loaded = true;

}



export function isEnabled(name) {

  return flags.get(name) === true;

}
```

The ESM specification guarantees that a module is evaluated **exactly once** per realm. Everything declared at the top level is, by definition, a Singleton — the variables live for the lifetime of the module record, and every `import` from this file sees the same `flags` map. There is no constructor to defend, no `getInstance` to remember, no risk of accidentally calling `new` twice.

For most “I need one of these” problems in a modern codebase, this is the right answer. The class‑based Singleton earns its keep when you genuinely need encapsulation (private fields, inheritance, polymorphism), or when the instance needs to be constructed lazily with configuration that isn’t available at import time.

## When NOT to use a Singleton

Reach for something else if you encounter any of the following:

- **You need per‑request or per‑user state.** A Singleton is process‑wide. In an SSR or serverless context, that state will leak across requests — a classic source of “why is user A seeing user B’s data?” bugs.
- **You need to swap the implementation in tests.** Hard‑coding `MyService.getInstance()` deep in your code makes that instance impossible to replace without monkey‑patching. Inject the dependency instead (more on this below).
- **The “single instance” guarantee is enforced by convention, not necessity.** If nothing actually breaks when two of them exist, you have a normal object, not a Singleton.
- **You’re tempted to use it as a kitchen sink for app‑wide state.** That’s a global mutable bag with extra steps. Use a real state container.

## Alternatives worth knowing

### Dependency injection containers

Libraries like [InversifyJS](https://inversify.io/) and [tsyringe](https://github.com/microsoft/tsyringe) let you register a service once and resolve it anywhere, but the binding is configured in one place — usually at the application’s composition root.

```javascript
import { container, singleton, inject } from "tsyringe";



@singleton()

class AnalyticsClient {

  track(event: string, props: Record<string, unknown>) { /* ... */ }

}



class CheckoutService {

  constructor(@inject(AnalyticsClient) private analytics: AnalyticsClient) {}



  complete(orderId: string) {

    this.analytics.track("order_completed", { orderId });

  }

}



const checkout = container.resolve(CheckoutService);
```

The DI container gives you the same “one instance everywhere” guarantee but lets tests register a fake binding before resolution. That single change unlocks isolated unit tests in a way a hand‑rolled Singleton never can.

### React Context for component‑tree scope

In React, “global” usually means “available to every component in this tree.” `createContext` plus a Provider gives you exactly that, with the bonus that the scope is the subtree — you can mount a different value in a test or in a Storybook story without touching the production code.

```javascript
const FeatureFlagsContext = createContext(null);



export function FeatureFlagsProvider({ client, children }) {

  return (

    <FeatureFlagsContext.Provider value={client}>

      {children}

    </FeatureFlagsContext.Provider>

  );

}



export function useFeatureFlag(name) {

  const client = useContext(FeatureFlagsContext);

  return client.isEnabled(name);

}
```

### Lightweight stores: Zustand, Jotai, Valtio

For app‑wide state with subscriptions, modern stores have largely replaced ad‑hoc Singletons. A Zustand store, for instance, is a function — not a class — that returns a hook bound to a single piece of state:

```javascript
import { create } from "zustand";



export const useSession = create((set) => ({

  user: null,

  login: (user) => set({ user }),

  logout: () => set({ user: null }),

}));
```

Any component can read or update the session without a Provider or a `getInstance` call, and the store is trivially mockable in tests.

## Pitfalls and trade‑offs

### Testing is the hard part

A Singleton holds state across tests by definition. If test A flips a flag and test B reads it, you’ve coupled your tests through hidden global state — and the failure mode is order‑dependent flakiness that’s brutal to debug. Mitigations:

- Expose a `reset()` method and call it in `beforeEach`.
- Inject the singleton through a constructor or factory argument so tests can pass a fresh one.
- Use Vitest’s or Jest’s module reset (`vi.resetModules()` / `jest.resetModules()`) — but be aware this only works cleanly with module‑scoped state, not classes that hold their own static reference.

### Hidden coupling

A function that calls `Logger.getInstance()` deep inside its body has a dependency that doesn’t appear in its signature. Two months later, when someone tries to use that function in a different context, they discover the coupling the hard way. Prefer passing the dependency explicitly:

```javascript
// Hidden dependency

function processOrder(order) {

  Logger.getInstance().info("processing", order.id);

}



// Explicit — the contract is in the signature

function processOrder(order, logger) {

  logger.info("processing", order.id);

}
```

### Server‑side state leakage

In a long‑lived Node process serving many requests, a module‑level cache or counter is shared across requests. That’s fine for stateless utilities like a configured logger, but disastrous for anything that ought to be per‑request. Frameworks like Next.js explicitly document which singletons are safe across requests and which need to be scoped via `AsyncLocalStorage` or React’s per‑request cache.

### Subclassing and lazy initialization

Classic Singleton implementations make subclassing awkward — the parent class hands back its own stored instance instead of constructing the subclass. If you genuinely need a polymorphic factory (“give me whichever client implementation is appropriate”), that’s a Factory pattern, not a Singleton.

## Singleton vs. module‑scoped state vs. global state

|  | Singleton class | Module‑scoped state | Global variable |
| --- | --- | --- | --- |
| **One instance per realm** | Yes (enforced) | Yes (ESM guarantee) | Yes |
| **Encapsulation** | Strong (private fields) | Strong (module scope) | None |
| **Lazy initialization** | Yes | Yes (top‑level `await`) | No |
| **Discoverable in imports** | Yes | Yes | No (accessed via `window` / `globalThis`) |
| **Testable in isolation** | Hard | Medium (module reset) | Hard |
| **Inheritance / polymorphism** | Yes | No | No |

The takeaway: if you don’t need the class features, the module is the simpler answer. If you do need them, build the Singleton on top of `#instance` and a static accessor — and inject it through your composition root so tests can replace it.

## References

- [JavaScript modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Private class features — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [tsyringe — Microsoft](https://github.com/microsoft/tsyringe)
- [Zustand](https://github.com/pmndrs/zustand)
- [Singleton — Refactoring Guru](https://refactoring.guru/design-patterns/singleton)
