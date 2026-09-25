---
title: Module Pattern
lang: en
source: https://www.patterns.dev/vanilla/module-pattern/
---

A module is a file that owns a piece of behavior, decides what to share, and keeps everything else to itself. Today, “module” in JavaScript means **ES modules** — a real specification baked into the language, supported natively by every modern browser and by Node.js. The patterns and trade‑offs that defined module systems before 2015 (closures faking privacy, AMD loaders, CommonJS wrapping) are mostly historical curiosities now. What replaces them is more interesting, and that’s what this article focuses on.

The mental model is short:

- A module is a file. The file is its own scope.
- Anything not `export`ed is private to the file.
- A module is evaluated **once** per realm. Every importer sees the same bindings.
- `import` statements are static and hoisted; `import()` is dynamic and returns a promise.

Hold onto those four points — everything else is variations on them.

## Exports and imports, the modern shape

```javascript
// inventory.js

const cache = new Map();



export function get(sku) {

  return cache.get(sku);

}



export async function refresh() {

  const response = await fetch("/api/inventory");

  const items = await response.json();

  cache.clear();

  for (const item of items) cache.set(item.sku, item);

}



export const ready = refresh(); // top-level await also works in modules
```

Two things to notice. First, `cache` is unreachable from outside this file. There’s no `Object.freeze`, no closure trick, no naming convention — the language gives you privacy for free. Second, `ready` is the result of a top‑level `await` expression, an ES2022 feature: if the importing module wants to wait for the initial fetch, it can `await` the export.

On the consumer side:

```javascript
// app.js

import { get, refresh, ready } from "./inventory.js";



await ready;

console.log(get("ABC-123"));
```

Named exports are the default style from 2024 onwards. Default exports still exist (`export default Foo`) and have their place — most useful when a file represents a single thing (a React component, a class, the entry point of a library). For multi‑function utility files, named exports are easier to refactor and tree‑shake.

## ESM in Node.js

Node decides whether a file is a module by looking at three things, in order:

- The file extension. `.mjs` is always a module; `.cjs` is always CommonJS.
- The closest `package.json`. If it has `"type": "module"`, then `.js` files are modules. If it has `"type": "commonjs"` (or omits the field), `.js` files are CommonJS.
- The `--input-type` flag for stdin.

A modern Node package looks like this:

```json
{

  "name": "@example/inventory",

  "version": "1.0.0",

  "type": "module",

  "exports": {

    ".": "./dist/index.js",

    "./schema": "./dist/schema.js",

    "./package.json": "./package.json"

  },

  "imports": {

    "#config": "./src/config.js",

    "#test/*": "./test/helpers/*.js"

  }

}
```

The `exports` field is the modern replacement for `main`. It does two important things: it controls **which subpaths consumers can import** (anything not listed is private to the package), and it can map the same subpath to different files depending on the environment (`import` vs `require`, browser vs node, development vs production).

```javascript
"exports": {

  ".": {

    "types":  "./dist/index.d.ts",

    "browser": "./dist/index.browser.js",

    "node":    "./dist/index.node.js",

    "default": "./dist/index.js"

  }

}
```

These are **conditional exports**. The runtime picks the first matching condition, top to bottom — so order matters, and `"types"` should come first because TypeScript reads them.

The `imports` field is a sibling feature for **subpath imports inside your own package**. Anywhere in the package, `import config from "#config"` resolves to whatever `imports["#config"]` maps to. It’s a cleaner alternative to `../../../../config.js` paths, and it gives you a single place to swap implementations for testing.

## ESM/CJS interop, briefly

You will run into this. The rules:

- **ESM importing CJS:** allowed. The CJS `module.exports` becomes the ESM `default` export. Named imports work for static analyzable named exports, but anything dynamic on `module.exports` is only accessible through the default.
- **CJS requiring ESM:** historically forbidden, but Node 22+ permits `require()` of ESM when the target module has no top‑level `await`. Otherwise, use `await import()` inside an async function.
- **Dual packages:** publish both formats from one package using conditional exports. Keep state out of the package, or you’ll end up with two copies of it at runtime — the “dual package hazard.”

A working dual export looks like:

```javascript
"exports": {

  ".": {

    "import": "./dist/index.mjs",

    "require": "./dist/index.cjs"

  }

}
```

Build tools (tsup, unbuild, rollup) automate producing both bundles.

## ESM in the browser

A `` tells the browser to parse the file as a module. Modules are deferred by default, executed in order, and fetched with CORS:

```javascript
<script type="module" src="/app.js"></script>

<script nomodule src="/legacy-bundle.js"></script>
```

`nomodule` is the fallback for browsers that don’t support modules — fewer and fewer of those exist; for most projects, you can drop the legacy bundle entirely.

### Import maps

The big browser‑side improvement is **import maps**. They let you use bare specifiers (`import { x } from "lodash-es"`) in the browser without a bundler, by giving the browser a JSON mapping from name to URL.

```javascript
<script type="importmap">

{

  "imports": {

    "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",

    "@app/": "/src/app/"

  },

  "scopes": {

    "/legacy/": { "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js" }

  }

}

</script>



<script type="module">

  import { LitElement } from "lit";

  import { Router } from "@app/router.js";

</script>
```

`scopes` lets you override mappings under specific URL prefixes — handy when one part of your app needs an older version of a dependency. Import maps ship in every modern browser as of 2023.

### Module preload

A static `import` pauses execution while the dependency is fetched. For critical modules, `` warms the cache so the import resolves instantly:

```javascript
<link rel="modulepreload" href="/app.js">

<link rel="modulepreload" href="/router.js">

<link rel="modulepreload" href="/inventory.js">
```

The browser fetches, parses, and compiles the listed modules in parallel with the rest of the page. By the time `app.js` runs, its dependencies are already sitting in memory.

## Dynamic imports

A function‑like `import()` returns a promise for the module namespace. It’s the bread and butter of route‑based code splitting and on‑demand feature loading.

```javascript
// Route-based: load the editor only when the user navigates to /edit

router.on("/edit/:id", async ({ id }) => {

  const { mount } = await import("./editor.js");

  mount(document.querySelector("#root"), { id });

});



// Interaction-based: load a heavy library only when the user clicks

button.addEventListener("click", async () => {

  const { default: confetti } = await import("canvas-confetti");

  confetti();

});
```

Bundlers recognize `import()` calls and split the target into its own chunk automatically. Vite, esbuild, Rollup, webpack, Rspack — every modern bundler does this without configuration.

`import()` can be combined with `Promise.all` to parallelize:

```javascript
const [{ default: heavy }, { utils }] = await Promise.all([

  import("./heavy.js"),

  import("./utils.js"),

]);
```

And it accepts variables, which lets you compute the path at runtime:

```javascript
const lang = navigator.language.split("-")[0];

const { messages } = await import(`./i18n/${lang}.js`);
```

Be careful with this one: most bundlers will include every file that matches the pattern in the build, since they can’t predict the value statically. Constrain the pattern (a known directory, a fixed extension) to keep the chunk count sane.

## Import attributes

A 2024 feature (Stage 3, shipping in V8 and JavaScriptCore) is **import attributes**, which let you import non‑JavaScript resources by specifying their type:

```javascript
import config from "./config.json" with { type: "json" };

import sheet  from "./styles.css"   with { type: "css" };
```

The dynamic form takes the attributes as a second argument:

```javascript
const data = await import("./data.json", { with: { type: "json" } });
```

The `with` syntax replaces the earlier `assert` keyword from the original proposal. If you have older code using `assert { type: "json" }`, update it — `assert` is being removed.

JSON modules are the headline use case, but the same syntax is being extended to CSS Module Scripts and (in proposals) WebAssembly modules.

## Bundlers, tree‑shaking, and build output

Native ESM is a great development experience but ships a lot of small files. For production, bundlers consolidate modules and prune what isn’t used. The pruning step — **tree‑shaking** — depends on a few module‑level invariants:

- Imports and exports are static, so a bundler can statically determine which exports are referenced.
- The module is side‑effect free, or the package marks it with `"sideEffects": false` (or a list of side‑effectful files) in `package.json`.
- Re‑exports (`export { foo } from "./bar.js"`) are followed transitively.

The ecosystem has converged:

| Bundler | Engine | Notes |
| --- | --- | --- |
| **Vite** | Rollup (build) + esbuild (dev) | Default for new SPAs; native ESM in dev |
| **esbuild** | Native Go | Extremely fast; often used as a library by other tools |
| **Rollup** | JS | Library output is its sweet spot |
| **Rspack** | Rust port of webpack | Drop‑in webpack replacement, much faster |
| **Turbopack** | Rust | Next.js bundler; incremental, persistent cache |
| **Parcel** | JS / Rust | Zero‑config |

You don’t have to pick the “fastest” one — pick whichever fits your framework. The output across the modern bundlers is similar enough that performance differences are mostly at build time, not runtime.

A small gotcha worth knowing: re‑export barrel files (`index.js` that re‑exports everything in a directory) can defeat tree‑shaking if any module in the barrel has a side effect. Either mark the package side‑effect‑free, or import directly from the leaf file.

## HMR (Hot Module Replacement)

ESM is a near‑perfect fit for HMR because the module graph is explicit. When a file changes, the dev server can swap that module without reloading the page, and the framework can decide how to re‑run any code that depended on it.

The standard hook in Vite and most ESM‑native bundlers is `undefined`:

```javascript
// some-feature.js

export function mount(root) { /* ... */ }



if (import.meta.hot) {

  import.meta.hot.accept((newModule) => {

    // Re-run with the updated implementation

    newModule?.mount(document.querySelector("#root"));

  });



  import.meta.hot.dispose(() => {

    // Tear down state before the new module takes over

    document.querySelector("#root").innerHTML = "";

  });

}
```

`import.meta` is the per‑module metadata object — also where you’ll find `import.meta.url` (the URL of the current module) and, in Node, `import.meta.dirname` / `import.meta.filename` (added in 21+).

## Common pitfalls

### Live bindings catch people out

ESM exports are **live bindings**, not value copies. If a module exports a `let`, importers see the current value, not the value at the time of import. CommonJS works the opposite way:

```javascript
// counter.js

export let count = 0;

export function inc() { count++; }



// app.js

import { count, inc } from "./counter.js";

inc();

console.log(count); // 1, not 0
```

This is usually what you want, but it can surprise people coming from CommonJS.

### Cycles work, with caveats

A imports B; B imports A. ESM handles this — both modules are partially evaluated before either finishes — but if you reference an export from the partner module **during initialization** (not inside a function), you may see `undefined` for bindings that haven’t been assigned yet. Restructure to avoid initialization‑time access across a cycle.

### Path resolution differs from CommonJS

Node’s ESM resolution is stricter: extensions are required (`./foo.js`, not `./foo`), directory indices are not implicit, and the module specifier rules follow the WHATWG URL spec. The TypeScript option `moduleResolution: "bundler"` or `"node16"` aligns the compiler with what runtime resolution will actually do.

### Top‑level await blocks importers

`await` at module top level pauses the module’s completion, which means every importer also waits. Used judiciously (configuration loading, capability detection) it’s elegant. Used carelessly (a network call at the top of every leaf module) it serializes your startup.

## When to split into a new module

A module is the right unit when it owns a piece of state or behavior that has a clean API. A few practical heuristics:

- **One concept per file.** If you struggle to name the file in fewer than four words, it probably contains two concepts.
- **Hide what callers don’t need.** The fewer named exports, the easier the module is to use and refactor.
- **Don’t pre‑split.** Three closely related functions can live in one file. Splitting them increases the surface area without buying you anything.
- **Split when reuse is real**, not theoretical. Premature modularization is just as costly as premature abstraction.

## References

- [JavaScript modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ECMAScript modules — Node.js](https://nodejs.org/api/esm.html)
- [Package entry points — Node.js](https://nodejs.org/api/packages.html#package-entry-points)
- [Import maps — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
- [Import attributes — TC39](https://github.com/tc39/proposal-import-attributes)
- [Vite — HMR API](https://vitejs.dev/guide/api-hmr.html)
