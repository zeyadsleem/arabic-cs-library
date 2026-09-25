---
title: Prototype Pattern
lang: en
source: https://www.patterns.dev/vanilla/prototype-pattern/
---

In the classical design-patterns literature, Prototype is about *cloning*: you keep a template object around and stamp out copies of it whenever you need a new one. That framing made sense in C++ and Smalltalk, where instantiating a class meant calling a constructor that re-ran setup code every time.

JavaScript turns the pattern on its head. Cloning still matters — we’ll look at `structuredClone` and HTML `` further down — but the *language itself* is built on a prototype mechanism that does something a classical clone never could: **delegation**. An object can hand off lookups to another object at runtime, no copy required. That’s the engine that makes `class` work, and it’s the part of the pattern that’s specifically interesting in JavaScript.

This article walks through both halves: prototype-as-delegation (the JS-native form) and prototype-as-template (the cloning form), with the modern APIs you’d actually reach for in 2025.

## Delegation: every object points at another one

Every JavaScript object has an internal slot, `[[Prototype]]`, that’s either `null` or a reference to another object. When you read a property, the engine first checks the object itself; if there’s no match, it follows `[[Prototype]]` and tries again, walking the chain until it either finds the property or hits `null`.

You can see the chain directly:

```javascript
const widget = {

  render() {

    return `<div class="${this.theme}">${this.label}</div>`;

  },

};



const button = Object.create(widget);

button.label = "Save";

button.theme = "primary";



button.render();             // "<div class=\"primary\">Save</div>"

Object.getPrototypeOf(button) === widget; // true
```

`button` owns exactly two properties: `label` and `theme`. The `render` method lives on `widget`, but `button` can call it because the lookup falls through the chain. This is the entire prototype pattern as JavaScript expresses it — no copy, no class, just one object delegating to another.

Classes are sugar on the same machinery. When you write:

```javascript
class Widget {

  render() {

    return `<div class="${this.theme}">${this.label}</div>`;

  }

}



class IconButton extends Widget {

  constructor({ label, theme, icon }) {

    super();

    this.label = label;

    this.theme = theme;

    this.icon = icon;

  }

}
```

…the `render` method ends up on `Widget.prototype`, and every `IconButton` instance has a `[[Prototype]]` chain that ends with `IconButton.prototype → Widget.prototype → Object.prototype → null`. Calling `new IconButton(...).render()` resolves via that chain, exactly as the literal `Object.create` example did. `class` is a more pleasant way to type the same thing.

The practical consequence: methods exist *once* per class, not once per instance. Ten thousand `IconButton` instances share a single `render` function reference. That’s the memory win the GoF cared about, but in JavaScript you get it for free as long as you keep methods on the prototype (i.e., declared inside the `class` body, not assigned inside the constructor).

## Cloning: when delegation isn’t the answer

Delegation is great for shared *behavior*. It’s the wrong tool for sharing *state*. If two objects need their own independent copies of a nested config, you actually have to copy.

Three options in increasing order of fidelity.

### 1. Spread for shallow copy plus overrides

```javascript
const baseConfig = {

  retries: 3,

  timeoutMs: 5000,

  headers: { "User-Agent": "patterns.dev" },

};



const prodConfig = { ...baseConfig, timeoutMs: 30_000 };
```

This is the pattern you reach for 90% of the time. Just remember `prodConfig.headers === baseConfig.headers` — the spread is one level deep. Mutating `prodConfig.headers["X-Trace"]` will mutate `baseConfig.headers` too. That’s a real source of bugs.

### 2. `structuredClone` for deep copy

Native and standardized; supported in every modern browser, Node 17+, Deno, and Bun. It handles `Date`, `Map`, `Set`, `RegExp`, typed arrays, and cyclic graphs — none of which `JSON.parse(JSON.stringify(x))` survives.

```javascript
const config = {

  createdAt: new Date(),

  tags: new Set(["beta", "internal"]),

  endpoints: new Map([["read", "/r"], ["write", "/w"]]),

};



const copy = structuredClone(config);

copy.tags.add("experimental");

config.tags.has("experimental"); // false — independent
```

It doesn’t clone functions, DOM nodes, or class instances (you get a plain object back, with no prototype). Treat it as “deep clone for serializable state,” not “general object copy.”

### 3. Class instance cloning

Cloning a class instance with its prototype intact takes a tiny helper:

```javascript
function cloneInstance(instance) {

  const copy = Object.create(Object.getPrototypeOf(instance));

  return Object.assign(copy, structuredClone({ ...instance }));

}
```

`Object.create(proto)` gives you a fresh object on the correct prototype chain so `instanceof` keeps working. `structuredClone({ ...instance })` deep-copies the own properties. Combine and you’ve reconstructed the original. This is the closest JavaScript gets to the GoF “prototype as template” idea, and it’s worth keeping in your back pocket for things like editor undo stacks or fixture builders.

## HTML `` is the DOM’s prototype pattern

The browser ships a built-in prototype pattern for DOM nodes. Put inert markup inside a ``, clone it whenever you need a new instance, and stamp the clone into the live tree:

```javascript
<template id="card">

  <article class="card">

    <h3 class="card-title"></h3>

    <p class="card-body"></p>

  </article>

</template>
```

```javascript
const cardTemplate = document.getElementById("card");



function makeCard({ title, body }) {

  const node = cardTemplate.content.cloneNode(true);

  node.querySelector(".card-title").textContent = title;

  node.querySelector(".card-body").textContent = body;

  return node;

}



list.append(makeCard({ title: "Hello", body: "World" }));
```

The template’s DOM is parsed once. `cloneNode(true)` produces a deep copy of that subtree without re-parsing HTML or running the document fragment’s scripts. This is the same pattern as cloning a JS object — the template is the prototype, the live nodes are instances — and it’s significantly faster than `innerHTML = "..."` in a loop.

## Test fixtures and object builders

A surprisingly large amount of test code is the prototype pattern wearing a different hat. Libraries like `fishery`, `factory-bot`, and Vitest’s `createBuilder` patterns all follow the same shape:

```javascript
function buildUser(overrides = {}) {

  return {

    id: crypto.randomUUID(),

    email: "user@example.com",

    role: "viewer",

    createdAt: new Date(),

    ...overrides,

  };

}



const admin = buildUser({ role: "admin" });

const banned = buildUser({ role: "viewer", bannedAt: new Date() });
```

The base object is the prototype. Each call deep-merges (or shallow-spreads) overrides on top. This is dramatically more maintainable than constructing the full object inline in every test.

## `Object.create(null)`: prototype-less dictionaries

When you want a plain key/value map and *don’t* want lookups to fall through to `Object.prototype`, create the object with no prototype at all:

```javascript
const headers = Object.create(null);

headers.toString = "I'm just a header value, not the toString method";

headers["__proto__"] = "and this is just a string, not a security hole";
```

This matters any time keys come from untrusted input. With a normal `{}`, an attacker who can write to `__proto__` or `constructor` can poison the global prototype chain — the family of bugs known as **prototype pollution** (real CVEs have shipped in `lodash.merge`, `set-value`, `dot-prop`, and Express middleware). `Object.create(null)` removes the attack surface entirely, because there’s no prototype to pollute. For arbitrary user input, prefer `Map`, which has no prototype-key footgun in the first place.

## Records and Tuples (TC39)

The [Records and Tuples proposal](https://github.com/tc39/proposal-record-tuple) (stage 2 at time of writing) introduces deeply-immutable primitives — `#{ x: 1 }` for a record, `#[1, 2]` for a tuple. They’re compared structurally (`#{ x: 1 } === #{ x: 1 }` is `true`) and “cloning” them is meaningless because they’re already values. When they land, a lot of the deep-clone-with-overrides code that exists today gets simpler. Worth knowing about so you don’t write code now that you’ll regret in two years.

## When the pattern fits

| Use | Approach |
| --- | --- |
| Share behavior across many similar objects | `class` (or `Object.create`) — prototype chain delegation |
| Make a tweaked variant of a configuration | Spread for one level, `structuredClone` for nested |
| Reuse a DOM subtree many times | `` + `cloneNode(true)` |
| Generate test data with sensible defaults | Builder function with spreadable overrides |
| Build a safe key/value dictionary | `Object.create(null)` or `Map` |
| Duplicate a class instance | `Object.create(getPrototypeOf(x))` + deep copy of own props |

## References

- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) - MDN
- [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) - MDN
- [HTML `` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) - MDN
- [Prototype pollution explained](https://snyk.io/blog/javascript-prototype-pollution/) - Snyk
- [Records and Tuples proposal](https://github.com/tc39/proposal-record-tuple) - TC39
