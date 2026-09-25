---
title: Factory Pattern
lang: en
source: https://www.patterns.dev/vanilla/factory-pattern/
---

A factory is a function whose job is to *return an object* — possibly different shapes of object depending on what you pass in — without making the caller deal with `new`, class hierarchies, or knowledge of which concrete type they’re getting back.

In modern JavaScript you almost never need a class to do this. A function that closes over some configuration and returns an object literal is enough. The interesting questions are no longer “how do I implement a factory” but “when does a factory beat a class, and when does it beat a discriminated union or a DI container?”

## A minimal factory function

```
const createLogger = ({ level = "info", prefix = "" } = {}) => {
  const ranks = { debug: 0, info: 1, warn: 2, error: 3 };
  const threshold = ranks[level];

  const log = (lvl, msg, ...rest) => {
    if (ranks[lvl] < threshold) return;
    console[lvl](`${prefix}${msg}`, ...rest);
  };

  return {
    debug: (m, ...r) => log("debug", m, ...r),
    info:  (m, ...r) => log("info", m, ...r),
    warn:  (m, ...r) => log("warn", m, ...r),
    error: (m, ...r) => log("error", m, ...r),
  };
};

const log = createLogger({ level: "warn", prefix: "[api] " });
log.info("ignored");          // silenced by threshold
log.warn("rate limit hit");   // [api] rate limit hit
```

Two things make this work as a factory rather than just “a function that returns an object”:

- **It encapsulates setup.** The `ranks` map and the `threshold` lookup happen exactly once, when the logger is constructed. Every call to `log.warn` reuses those captured values.
- **It returns an interface, not a type.** Callers depend on the shape `{ debug, info, warn, error }`. Whether that came from a class, an object literal, or a Proxy is invisible to them — and that’s the decoupling Factory was always trying to enable.

## A more useful example: an HTTP client factory

Configuration that varies per environment, per tenant, or per service is the prototypical factory case:

```
const createApiClient = ({ baseUrl, auth, fetch = globalThis.fetch }) => {
  const headers = () => ({
    "Content-Type": "application/json",
    ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),
  });

  const request = async (method, path, body) => {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: headers(),
      body: body && JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.status === 204 ? null : res.json();
  };

  return {
    get:  (p)     => request("GET", p),
    post: (p, b)  => request("POST", p, b),
    put:  (p, b)  => request("PUT", p, b),
    del:  (p)     => request("DELETE", p),
  };
};

const api = createApiClient({
  baseUrl: "https://api.example.com",
  auth: { token: process.env.API_TOKEN },
});
```

Note what *isn’t* here: no `this`, no `new`, no inheritance, no `bind` calls. The `fetch` parameter is intentional — passing it in makes the factory trivially testable by handing in a fake.

## Lookup-table factories: the Vehicle problem, done right

When the factory’s job is “pick the right implementation based on a string tag,” resist the urge to write a `switch`. A lookup table is shorter, easier to extend, and harder to forget to update:

```
const fieldFactories = {
  text:     (props) => ({ type: "text",     ...props, validate: nonEmpty }),
  email:    (props) => ({ type: "email",    ...props, validate: isEmail }),
  number:   (props) => ({ type: "number",   ...props, validate: isFinite }),
  checkbox: (props) => ({ type: "checkbox", ...props, validate: () => true }),
};

const createField = ({ type, ...rest }) => {
  const make = fieldFactories[type];
  if (!make) throw new Error(`Unknown field type: ${type}`);
  return make(rest);
};
```

Adding a new field type means adding a key to `fieldFactories` — no editing the dispatch, no merge conflicts on a long `switch` block, and you can introspect the registry (`Object.keys(fieldFactories)`) if you need to render a “supported field types” UI.

This same shape — `componentMap[type]` — drives most dynamic form renderers in React and Vue, and most plugin systems that ship in JS libraries.

## Factory vs. class vs. DI container

These three are often conflated. They solve overlapping problems but they cost different amounts:

| Approach | Best at | Cost |
| --- | --- | --- |
| **Class with `new`** | Long-lived objects with identity, polymorphism via `instanceof`, hot-path methods that benefit from shared prototype | `this` semantics, binding, harder to compose, harder to mock |
| **Factory function** | Configuration capture, environment switching, returning different shapes, easy mocking | One closure per instance (methods aren’t shared) |
| **DI container** (`tsyringe`, `InversifyJS`, NestJS providers) | Wiring graphs of services where ownership and lifecycle matter | Decorator/metadata machinery, runtime surprises, overkill outside large apps |

A useful heuristic: if you’d reach for `new SomeClass()` from more than a couple of places, you usually wanted a factory. If you’d reach for a factory from across module boundaries with cross-cutting lifecycle concerns (request-scoped, singleton, transient), you might want a container.

## Type-safe factories in TypeScript

The factory’s biggest payoff in TypeScript is **discriminated unions** plus **conditional return types**. The caller gets a precise type back based on the tag they passed:

```
type FieldSpec =
  | { type: "text"; placeholder?: string }
  | { type: "number"; min?: number; max?: number }
  | { type: "checkbox"; defaultChecked?: boolean };

type Field<T extends FieldSpec["type"]> = Extract<FieldSpec, { type: T }> & {
  id: string;
  validate(value: unknown): boolean;
};

function createField<T extends FieldSpec["type"]>(
  spec: Extract<FieldSpec, { type: T }>
): Field<T> {
  // implementation
  return { id: crypto.randomUUID(), validate: () => true, ...spec } as Field<T>;
}

const a = createField({ type: "number", min: 0 }); // typed with `min`/`max`
const b = createField({ type: "text" });           // typed with `placeholder`
```

The compiler narrows the return shape based on the input discriminator. This is the part of the pattern that classes still can’t replicate cleanly without overload soup.

## Curry as a lightweight factory

For one-method “objects,” a curried function *is* the factory:

```
const withRetries = (n) => async (fn) => {
  for (let i = 0; i < n; i++) {
    try { return await fn(); }
    catch (e) { if (i === n - 1) throw e; }
  }
};

const retry3 = withRetries(3);
await retry3(() => fetch("/flaky"));
```

`withRetries(3)` is a factory call that returns a closure parameterized by `n`. When the “object” you’d be returning has exactly one method, skip the object literal.

## When *not* to use a factory

- **You only ever construct it one way.** A factory whose only call site passes the same options is just a constructor with extra steps. Inline it.
- **You need `instanceof` checks.** Factories return plain objects; there’s no class to check against. If callers branch on type with `instanceof`, you want a class (or a discriminator field on the returned object).
- **You’re tempted to return a React/Vue component.** Component factories that close over render-time state usually misbehave with hooks and reactivity. Use composition or higher-order components instead.
- **The “factory” is just `new X()` wrapped.** That’s not abstraction, it’s noise.

## Trade-offs

| Benefit | Cost |
| --- | --- |
| No `new`, no `this`, no binding bugs | No shared prototype — methods are reallocated per instance |
| Easy to swap implementations behind a stable interface | No `instanceof` for runtime type checks |
| Trivially mockable (pass fakes through options) | Lookup-table dispatch loses static reachability tools (find-all-references on a class method) |
| Composes cleanly with closures and partial application | Can hide complexity that would be more honest as a class |

## References

- [JavaScript Factory Functions with ES6+](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1) - Eric Elliott
- [Discriminated unions in TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) - TypeScript Handbook
- [tsyringe](https://github.com/microsoft/tsyringe) - lightweight DI container for TypeScript
