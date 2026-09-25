---
title: Flyweight Pattern
lang: en
source: https://www.patterns.dev/vanilla/flyweight-pattern/
---

Flyweight is a structural pattern for situations where an app needs to render or track *a lot* of objects that look mostly the same. Instead of letting each one own the full set of data it needs to display, you pull out the parts that never vary and store them once, shared across every consumer.

The pattern only became a “design pattern” because it has a recognizable shape: a small, fixed pool of shared objects (the **flyweights**) plus per-instance context (the **extrinsic state**) supplied at call time. That shape shows up under many names today — instanced rendering, atomic CSS, object pools, hidden classes, formatter caches — and it is still a meaningful tool in 2025, just rarely for the reason the GoF originally pitched it.

## Intrinsic vs. extrinsic state

The trick to recognizing Flyweight is splitting an object into two buckets:

- **Intrinsic** — values that are the same for every consumer. Safe to share.
- **Extrinsic** — values that vary per consumer. Passed in from outside on each operation.

If you can do this split cleanly, the intrinsic bucket can usually be reduced from “thousands of objects” to “a handful,” which is the whole point.

## A chat-message renderer

Picture a chat UI rendering 50,000 messages while a user scrolls through the history. Each message has an author, an avatar, a role color, a display name — and a body, a timestamp, and a screen position.

A naive implementation stores all of that on every message:

```
// Naive: each message owns a full copy of the author info
const messages = history.map((m) => ({
  body: m.body,
  timestamp: m.timestamp,
  authorName: m.user.name,
  authorAvatar: m.user.avatarUrl,
  authorColor: m.user.color,
  authorRole: m.user.role,
}));
```

If 30 users wrote those 50,000 messages, the same name/avatar/color strings get duplicated tens of thousands of times. Garbage collection has to walk all of it. Diffing in a virtualized list has to compare it.

The Flyweight split: the **author profile** is intrinsic (it’s the same for every message that user sent), and the **body, timestamp, and position** are extrinsic.

```
// A WeakMap-backed pool keyed by user id.
// We use a plain Map here because user ids are primitives.
const authorPool = new Map();

function getAuthor(user) {
  let flyweight = authorPool.get(user.id);
  if (flyweight) return flyweight;

  flyweight = Object.freeze({
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    color: user.color,
    role: user.role,
  });
  authorPool.set(user.id, flyweight);
  return flyweight;
}

// Each message is now mostly extrinsic state plus a pointer to a shared author.
function makeMessage(raw) {
  return {
    author: getAuthor(raw.user),
    body: raw.body,
    timestamp: raw.timestamp,
  };
}
```

`Object.freeze` is a small but important detail: it documents the intent that nothing should mutate a shared flyweight, and most engines will skip a few checks for frozen objects.

Now 50,000 messages share ~30 author objects. Every render reads `message.author.color` instead of looking up a fresh string. The hot path gets shorter and the heap gets quieter.

## Why a factory?

The “factory” piece of Flyweight is doing one job: enforcing the invariant *one intrinsic key → one object*. If two call sites build their own author objects for the same user, you have two flyweights, the cache is wrong, and identity comparisons (`a.author === b.author`) silently break.

A `Map` works when keys are stable primitives (user ids, ISO codes, glyph code points). A `WeakMap` works when the key *is* the object you’re deduping by, and you want pooled values to vanish when their key is collected. A `Symbol`-keyed registry works when you want a private, collision-proof handle for the flyweight from elsewhere in the codebase.

## Where Flyweight matters today

On modern hardware the memory savings the GoF emphasized are rarely the dominant concern. The pattern still earns its keep wherever you have:

- A **tight render loop** that allocates per frame (canvas, WebGL, game engines).
- A **virtualized list or grid** rendering tens of thousands of cells.
- A **construction cost** for the shared object that you don’t want to pay repeatedly (regex compilation, `Intl` formatters, parsed schemas).

In all three, the cost being amortized is *creation and GC pressure*, not raw byte count.

## Modern variants you’ve probably already used

### `Intl.NumberFormat` and `Intl.Collator` caching

Constructing `new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })` is expensive — it loads ICU locale data. Doing it inside a render or a sort comparator devastates performance. The textbook fix is a tiny Flyweight pool keyed on the options:

```
const formatterPool = new Map();

function currency(locale, currency) {
  const key = `${locale}:${currency}`;
  let f = formatterPool.get(key);
  if (!f) {
    f = new Intl.NumberFormat(locale, { style: "currency", currency });
    formatterPool.set(key, f);
  }
  return f;
}

currency("en-US", "USD").format(42); // "$42.00"
```

Any list view that formats numbers should do something like this. Most don’t, and most are slower because of it.

### Object pools in WebGL and game engines

Three.js’s `InstancedMesh`, PixiJS’s `ParticleContainer`, and Babylon.js’s thin instances are all Flyweight in disguise: one piece of geometry plus one material, drawn N times with N different transform matrices. The geometry is intrinsic, the transform is extrinsic, and the GPU does the multiplication. Allocating a new `Mesh` per particle would be ruinous; instanced rendering lets a single draw call handle thousands.

Particle systems take the same idea further with explicit object pools — particles that die get returned to a free list instead of garbage-collected, so the next frame can reuse the same object instead of asking the allocator for a new one.

### Atomic CSS as a styling Flyweight

Tailwind, UnoCSS, and Atomizer are essentially a Flyweight pool for CSS rules. `p-4` exists in the stylesheet exactly once; the millions of elements that use it each carry only the class name, not a duplicated `padding: 1rem;` declaration. Intrinsic = the rule, extrinsic = which element it applies to.

### Structural sharing in Immer and Immutable.js

When you update one node deep in an immutable tree, you don’t clone the whole tree — you clone the path to that node and share every other branch with the previous version. That sharing is Flyweight applied to state trees: unchanged subtrees are intrinsic flyweights pointed to by multiple versions of the root.

### Hidden classes inside V8

This one is a runtime concern rather than a thing you write, but it’s worth knowing. V8 (and other modern engines) attach a *shape* to every object — the set of properties and their offsets. Objects with identical shapes share the same hidden class, which makes property access fast. When you construct objects with the same fields in the same order, you’re effectively asking the engine to use a Flyweight’d shape. Construct them in different orders and you fragment shapes, deoptimize inline caches, and lose performance for reasons that look nothing like a memory bug.

The practical advice: in hot constructors, initialize properties in a fixed order, and avoid adding new properties later. That’s a Flyweight discipline imposed by the engine.

## Glyph rendering: the canonical CS example

The reason Flyweight made it into the Gang of Four book at all was Knuth’s TeX, where every character on a page is rendered from a shared glyph atlas. A book might contain a million `e`s, but there’s exactly one glyph object describing how to draw `e` in 12pt Computer Modern — and a million `(x, y)` positions telling the renderer where to stamp it. Modern text rendering, including canvas font rendering and font shaping via HarfBuzz, is still built on this exact split.

## Caveats

- **Don’t pool things that change.** A shared mutable object is a bug waiting to be filed. Freeze the flyweight, or only pool deeply-immutable values.
- **Don’t pool things that are cheap.** A pool for `{ x, y }` points usually loses to just allocating them; the Map lookup costs more than the allocation it saves.
- **Watch for leaks.** A long-lived `Map` is a long-lived strong reference. If pool keys can be garbage-collected, prefer `WeakMap` or `WeakRef`-based eviction.

## Trade-offs

| Benefit | Cost |
| --- | --- |
| Fewer allocations, less GC pressure in hot paths | Extra indirection through a factory |
| Easier reasoning about identity (`===` works on shared objects) | Must distinguish intrinsic vs. extrinsic carefully |
| Plays well with virtualized lists and instanced rendering | Pool itself needs an eviction story if keys are unbounded |
| Aligns naturally with engine optimizations (hidden classes) | Mutating a flyweight breaks every consumer at once |

## References

- [Flyweight](https://refactoring.guru/design-patterns/flyweight) - Refactoring Guru
- [Three.js InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh) - three.js docs
- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) - MDN
- [V8 hidden classes and inline caches](https://v8.dev/blog/fast-properties) - V8 blog
