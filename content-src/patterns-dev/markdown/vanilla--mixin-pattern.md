---
title: Mixin Pattern
lang: en
source: https://www.patterns.dev/vanilla/mixin-pattern/
---

A **mixin** is a reusable bundle of behavior that can be folded into a class or object so it gains capabilities without sitting inside an inheritance chain. JavaScript only allows single-class inheritance, so mixins fill the gap: they let you share orthogonal concerns - things like logging, dirty-tracking, serialization, or eventing - across classes that have nothing else in common.

The pattern still shows up in modern codebases (TypeScript’s “mixin classes”, Vue 2’s `mixins`, Backbone’s `Object.extend`, even browser internals like `WindowOrWorkerGlobalScope`), but in 2024 it is rarely the first tool you should reach for. Composition, hooks, and small utility modules cover most of what mixins were designed to solve - usually with less surprise.

## A practical example: dirty tracking

Suppose we have a `Document` class for a notes app. We want to know whether a document has unsaved edits, when it was last modified, and we want to “reset” the dirty state after a save. We could write this directly on the class, but the same behavior is useful on `Note`, `Folder`, `Tag`, and anything else the user can edit. That makes it a perfect candidate for a mixin.

```javascript
class Document {

  constructor(title, body) {

    this.title = title;

    this.body = body;

  }

}
```

We start with a plain trait object that captures the dirty-tracking behavior:

```javascript
const dirtyTrackable = {

  markDirty() {

    this._dirty = true;

    this._lastModified = Date.now();

  },

  markClean() {

    this._dirty = false;

  },

  isDirty() {

    return Boolean(this._dirty);

  },

  lastModified() {

    return this._lastModified ?? null;

  },

};
```

To apply it, we install the trait onto the prototype with `Object.assign`. Every instance of `Document` (and every subclass) now gets the four methods for free:

```javascript
class Document {

  constructor(title, body) {

    this.title = title;

    this.body = body;

  }

}



Object.assign(Document.prototype, dirtyTrackable);



const draft = new Document("Patterns", "Mixins, composition, hooks...");

draft.markDirty();

draft.isDirty(); // true

draft.markClean();

draft.isDirty(); // false
```

This is the simplest form of the pattern: a trait object plus an `Object.assign` call. It is fine for one-off use, but it has two well-known problems. First, the new methods silently shadow anything with the same name on the prototype. Second, there is no record on `Document` that the trait was applied - readers have to grep for it.

## Composing multiple traits with a helper

In practice you usually want to apply several traits in a known order and have something explicit at the call site. A tiny `applyTraits` helper does both:

```javascript
function applyTraits(target, ...traits) {

  for (const trait of traits) {

    for (const key of Reflect.ownKeys(trait)) {

      if (key === "constructor") continue;

      if (Object.prototype.hasOwnProperty.call(target.prototype, key)) {

        throw new Error(`Trait conflict on "${String(key)}"`);

      }

      Object.defineProperty(

        target.prototype,

        key,

        Object.getOwnPropertyDescriptor(trait, key)

      );

    }

  }

  return target;

}
```

Now we can layer multiple traits onto a class and get a loud error if two of them collide instead of one silently winning:

```javascript
const serializable = {

  toJSON() {

    return { title: this.title, body: this.body };

  },

};



const eventEmitting = {

  on(event, handler) {

    (this._handlers ??= new Map()).set(event, handler);

  },

  emit(event, payload) {

    this._handlers?.get(event)?.(payload);

  },

};



applyTraits(Document, dirtyTrackable, serializable, eventEmitting);
```

## Subclass-factory mixins

The trait-object form covers most cases, but it cannot extend behavior - traits cannot call a “super” version of a method, because there is no parent to point at. The subclass-factory form fixes that. A mixin becomes a function that takes a superclass and returns a new subclass:

```javascript
const Timestamped = (Base) =>

  class extends Base {

    constructor(...args) {

      super(...args);

      this.createdAt = new Date();

    }

    touch() {

      this.updatedAt = new Date();

    }

  };



const Versioned = (Base) =>

  class extends Base {

    constructor(...args) {

      super(...args);

      this.version = 1;

    }

    bump() {

      this.version += 1;

    }

  };



class Note {}

class TrackedNote extends Versioned(Timestamped(Note)) {}



const n = new TrackedNote();

n.touch();

n.bump();
```

This is more verbose, but it composes naturally with `extends`, plays well with TypeScript’s mixin-class typing, and lets each layer call `super`. Most TypeScript codebases that need mixins use this form.

## Mixins in the browser

You don’t have to invent mixin examples - the web platform is full of them. The `Window` object pulls in methods from [`WindowOrWorkerGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope) (which is where `setTimeout`, `fetch`, `queueMicrotask`, and `isSecureContext` come from) and from [`WindowEventHandlers`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers) (the `onbeforeunload`-style properties). These are defined in the spec as mixin interfaces - you cannot instantiate them on their own, you only ever see their members on hosts like `Window` or `WorkerGlobalScope`.

## Mixins vs composition vs hooks

Mixins were invented before JavaScript had ergonomic alternatives. Today, you almost always have a choice. A short decision guide:

| Need | Reach for | Why |
| --- | --- | --- |
| Share behavior across plain classes | Trait-object mixin | Lowest ceremony when there is no `super` call to make. |
| Layered behavior that calls into the chain | Subclass-factory mixin | Each layer is a real subclass, so `super.method()` works. |
| Share behavior across React components | Custom hook | Hooks compose linearly, are explicit at the call site, and don’t pollute the component instance. |
| Share behavior across Vue components | Composables (`useX`) | Same advantages as React hooks. The legacy `Vue.mixin` API still works but is discouraged in Vue 3. |
| “Has-a” relationships | Composition (a field on the class) | The single most under-used answer. If `Document` simply held a `DirtyTracker` instance, none of this would matter. |

The React team [retired mixins in 2016](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html); higher-order components took over for a while and have themselves been largely replaced by Hooks. The same trajectory has played out in Vue (Options API mixins to Composition API composables) and in Svelte (no mixin concept; behavior is shared through stores and actions). The direction of travel is clear: explicit composition wins over implicit prototype merging.

## The decorator angle

The [Stage 3 Decorators proposal](https://github.com/tc39/proposal-decorators), shipped in TypeScript 5.0, gives a more focused way to attach single capabilities. A `@dirtyTrackable` class decorator could install the same methods as our mixin while leaving a visible annotation in the source. Until decorators ship natively in browsers and Node, mixins remain the lower-friction option, but it is worth knowing the standards body’s preferred direction.

## Trade-offs

Mixins reduce duplication and are easy to apply, but they have real costs. Methods appear on instances without being declared on the class, so static analysis, IDE jump-to-definition, and code review all get harder. Conflicting method names silently overwrite each other unless you use a helper that checks. Deep mixin chains are difficult to debug because the prototype hierarchy no longer matches the source.

The rule of thumb: use a mixin when the shared behavior is genuinely orthogonal to every class it lands on (logging, dirty-tracking, serialization, eventing). Reach for composition whenever the behavior could plausibly live in a collaborator object instead. And in component frameworks, prefer hooks or composables - they were designed specifically to replace this pattern.

## References

- [Functional Mixins](https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c) - Eric Elliott
- [Mixins](https://javascript.info/mixins) - JavaScript Info
- [TypeScript Handbook: Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)
- [Stage 3 Decorators](https://github.com/tc39/proposal-decorators) - TC39
- [Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) - React Team
