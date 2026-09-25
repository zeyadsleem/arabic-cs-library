---
title: Hooks Pattern
lang: en
source: https://www.patterns.dev/react/hooks-pattern/
---

## Why hooks reshaped React

When React 16.8 shipped hooks in early 2019, it quietly retired most of the design patterns React developers had been arguing about for years. Higher-order components, render props, mixins, container/presentational splits — all of those existed primarily to answer one question: *how do I share stateful logic between components without rewriting it?*

A hook is just a function. It can hold state, run side effects, read context, subscribe to external stores. Components call hooks; hooks call other hooks. There is no wrapping component, no extra node in the tree, no `this` binding, no implicit prop merging. That deceptive simplicity is the whole story.

By now hooks have moved from “the new thing” to “the only way most React code is written.” React 19, released in December 2024, doubles down on the model with several new hooks — `use`, `useOptimistic`, `useActionState`, `useFormStatus` — that lean on Suspense and Actions to handle async work that used to require a state library.

This article covers the core hooks you’ll use every day, the rules that govern them, the React 19 additions, and the patterns that emerge when you start composing your own.

## The two rules that govern every hook

Before any API surface, the rules. Both are enforced by the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) package — install it on day one.

- **Only call hooks at the top level.** Never inside loops, conditions, or nested functions. React identifies each hook call by its *position* in the call order, so the order has to be stable across renders.
- **Only call hooks from React functions.** That means components (`function MyComponent()`) or other hooks (`function useMyThing()`). A plain utility function cannot call `useState`.

A convention follows from rule 2: any function that calls hooks must start with `use`. The linter uses that prefix to know which rules apply.

```javascript
// Allowed: hook calling a hook

function useDarkMode() {

  const [isDark, setIsDark] = useState(false);

  // ...

}



// NOT allowed: condition wraps the hook

function Avatar({ user }) {

  if (user) {

    const [hovered, setHovered] = useState(false); // breaks rule 1

  }

}
```

## The built-in hooks, organised

There are more built-in hooks than most people remember. Grouping them by purpose helps:

| Purpose | Hooks |
| --- | --- |
| **State** | `useState`, `useReducer` |
| **Effects & lifecycle** | `useEffect`, `useLayoutEffect`, `useInsertionEffect` |
| **Context** | `useContext`, `use` (React 19) |
| **Refs & DOM** | `useRef`, `useImperativeHandle` |
| **Performance** | `useMemo`, `useCallback`, `useTransition`, `useDeferredValue` |
| **External stores** | `useSyncExternalStore`, `useDebugValue` |
| **Forms & Actions (React 19)** | `useActionState`, `useFormStatus`, `useOptimistic` |
| **IDs** | `useId` |

You will use perhaps four of these on a given workday — `useState`, `useEffect`, `useRef`, and one of the React 19 form hooks. The rest exist for specific problems; reach for them when you hit those problems.

## State without classes

Adding state to a function component is two lines: a destructured tuple and the initial value.

```javascript
import { useState } from "react";



function Counter() {

  const [count, setCount] = useState(0);

  return (

    <button onClick={() => setCount((c) => c + 1)}>

      Clicked {count} times

    </button>

  );

}
```

Two details worth noting:

- **Pass an updater function when the new state depends on the old.** `setCount((c) => c + 1)` is safe under React’s automatic batching; `setCount(count + 1)` is not.
- **Initial values can be computed lazily.** Pass a function — `useState(() => expensiveDefault())` — when computing the default itself is expensive. React only invokes it on the first render.

For state with multiple sub-values that update together, prefer `useReducer`. The reducer collects all the transitions in one place and makes them straightforward to unit-test:

```javascript
type State = { status: "idle" | "loading" | "ok" | "error"; data?: Order[]; error?: Error };

type Action =

  | { type: "fetch" }

  | { type: "success"; data: Order[] }

  | { type: "failure"; error: Error };



function reducer(state: State, action: Action): State {

  switch (action.type) {

    case "fetch":   return { status: "loading" };

    case "success": return { status: "ok", data: action.data };

    case "failure": return { status: "error", error: action.error };

  }

}



function Orders() {

  const [state, dispatch] = useReducer(reducer, { status: "idle" });

  // ...

}
```

## Effects, and why most “effects” shouldn’t be effects

`useEffect` is the escape hatch for talking to the world *outside* React: subscriptions, browser APIs, network logging, manual DOM measurements. The React docs are emphatic on this:

> If there is no external system involved, you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone. — [react.dev — *You Might Not Need an Effect*](https://react.dev/learn/you-might-not-need-an-effect)

A few of the most common misuses, with their fixes:

**1. Computing derived state in an Effect.**

```javascript
// Anti-pattern

const [fullName, setFullName] = useState("");

useEffect(() => {

  setFullName(`${first} ${last}`);

}, [first, last]);



// Fix: just compute it

const fullName = `${first} ${last}`;
```

**2. Resetting state when a prop changes.**

```javascript
// Anti-pattern: extra render after every prop change

useEffect(() => {

  setSelection(null);

}, [list]);



// Fix: use a `key` to remount the subtree, or store derived state with the prop value
```

**3. Handling user events.**

```javascript
// Anti-pattern: an effect that "watches" a form submission

useEffect(() => {

  if (justSubmitted) postOrder(values);

}, [justSubmitted]);



// Fix: do the work in the event handler itself

const onSubmit = (e) => {

  e.preventDefault();

  postOrder(values);

};
```

When you *do* need an effect, the shape is almost always the same: subscribe in the body, return a cleanup function.

```javascript
useEffect(() => {

  const id = setInterval(tick, 1000);

  return () => clearInterval(id);

}, []);
```

The dependency array is not optional decoration. Anything you read inside the effect that comes from props, state, or context must appear in it, or you will get stale closures. The linter will tell you which ones are missing.

## Custom hooks: where the pattern earns its keep

The point of hooks isn’t `useState`; it’s the ability to extract any stateful logic into a function and reuse it. A custom hook is just a function whose name starts with `use` and which is allowed to call other hooks.

Two examples that earn their place in almost every codebase.

### `useLocalStorage`

Mirror a piece of state in `localStorage` so it survives a page reload.

```javascript
import { useEffect, useState } from "react";



export function useLocalStorage<T>(key: string, initial: T) {

  const [value, setValue] = useState<T>(() => {

    if (typeof window === "undefined") return initial; // SSR-safe

    const stored = window.localStorage.getItem(key);

    return stored !== null ? (JSON.parse(stored) as T) : initial;

  });



  useEffect(() => {

    window.localStorage.setItem(key, JSON.stringify(value));

  }, [key, value]);



  return [value, setValue] as const;

}
```

Using it reads exactly like `useState`:

```javascript
function ThemeToggle() {

  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (

    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>

      Switch to {theme === "light" ? "dark" : "light"} mode

    </button>

  );

}
```

> **Going to production?** Subscribe to `window`’s `"storage"` event to keep multiple open tabs in sync, and consider [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) instead of the manual `useState` + `useEffect` pair. That hook was designed precisely for “reflect this external thing into React” cases.

### `useMediaQuery`

Render branches based on a CSS media query. Useful for adapting to user preferences such as `prefers-reduced-motion` or `prefers-color-scheme`.

```javascript
import { useEffect, useState } from "react";



export function useMediaQuery(query: string) {

  const [matches, setMatches] = useState(() =>

    typeof window === "undefined" ? false : window.matchMedia(query).matches,

  );



  useEffect(() => {

    const mql = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);

  }, [query]);



  return matches;

}



// Usage

function MotionAwareIntro() {

  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return reduceMotion ? <StaticHero /> : <AnimatedHero />;

}
```

A few more hooks you will be glad you have on hand: `useDebounce`, `useOnlineStatus`, `useClipboard`, `usePrevious`, `useIntersectionObserver`. Rather than write all of them yourself, browse a curated collection:

- [`usehooks-ts`](https://usehooks-ts.com/) — TypeScript-first, well-tested
- [`react-use`](https://github.com/streamich/react-use) — large kitchen-sink library
- [`usehooks.com`](https://usehooks.com/) — copy-paste recipes

## React 19: hooks for async, forms, and Actions

React 19 (stable December 2024) introduces several hooks that change how you handle async work and forms. They are designed to work together with **Actions** — async functions you pass directly to `` or call from a transition.

### `use()` — read promises and context conditionally

`use` is a special function (not bound by the “no conditional hooks” rule for promise unwrapping) that suspends until a promise resolves, then returns its value. It can also read context, replacing many `useContext` calls.

```javascript
import { use, Suspense } from "react";



function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {

  // Suspends here until the promise settles

  const comments = use(commentsPromise);

  return <ul>{comments.map((c) => <li key={c.id}>{c.text}</li>)}</ul>;

}



export default function Post({ id }: { id: string }) {

  const commentsPromise = fetchComments(id); // started during render

  return (

    <Suspense fallback={<p>Loading…</p>}>

      <Comments commentsPromise={commentsPromise} />

    </Suspense>

  );

}
```

In Server Components, `use` lets you drop in async data without lifting it into a separate `useEffect` round-trip.

### `useActionState` — manage form submission state

`useActionState` replaces a lot of `useState` boilerplate for forms. Pair it with an async action and it returns the latest result, a wrapped action, and a pending flag.

```javascript
import { useActionState } from "react";



async function subscribeAction(_prev: State, formData: FormData) {

  const email = formData.get("email") as string;

  try {

    await subscribe(email);

    return { ok: true } as const;

  } catch (err) {

    return { ok: false, error: (err as Error).message } as const;

  }

}



function NewsletterForm() {

  const [state, formAction, isPending] = useActionState(subscribeAction, { ok: false });



  return (

    <form action={formAction}>

      <input name="email" type="email" required />

      <button type="submit" disabled={isPending}>

        {isPending ? "Subscribing…" : "Subscribe"}

      </button>

      {state.ok && <p>You're in.</p>}

      {!state.ok && "error" in state && <p>{state.error}</p>}

    </form>

  );

}
```

### `useFormStatus` — read the parent form’s submission state

Useful inside a button or input that needs to know whether the enclosing form is currently being submitted, without having to thread props down.

```javascript
import { useFormStatus } from "react-dom";



function SubmitButton({ children }: { children: React.ReactNode }) {

  const { pending } = useFormStatus();

  return (

    <button type="submit" disabled={pending} aria-busy={pending}>

      {children}

    </button>

  );

}
```

### `useOptimistic` — instant UI before the server confirms

Show the result immediately, reconcile when the real response arrives.

```javascript
import { useOptimistic, useTransition } from "react";



function LikeButton({ post }: { post: Post }) {

  const [optimisticLikes, addOptimistic] = useOptimistic(

    post.likes,

    (current, delta: number) => current + delta,

  );

  const [, startTransition] = useTransition();



  return (

    <button

      onClick={() =>

        startTransition(async () => {

          addOptimistic(1);

          await like(post.id);

        })

      }

    >

      {optimisticLikes} likes

    </button>

  );

}
```

## The React Compiler and the end of manual memoization

For years, `useMemo`, `useCallback`, and `React.memo` were the standard tools for keeping renders cheap. They are also a perennial source of bugs (stale closures, missing deps) and noise (every callback wrapped in `useCallback` just in case).

The [React Compiler](https://react.dev/learn/react-compiler), released alongside React 19, statically analyses your components and inserts the equivalent memoization automatically. The official docs put it plainly: the compiler *“handles memoization for you, eliminating the need for manual `useMemo`, `useCallback`, and `React.memo`”* in most cases.

Practical implications:

- **In new projects with the compiler enabled,** drop manual memoization unless profiling proves you need it.
- **In existing projects,** leave existing memoization in place; the compiler is designed to coexist.
- **Write idiomatic code.** The compiler is most effective when components are pure, side effects live in effects, and you don’t mutate props or state.

## A worked refactor: class to hooks

To make the comparison concrete, here is a small class component that tracks the user’s scroll position and saves it to session storage on unmount.

```javascript
class ScrollTracker extends React.Component<{ pageId: string }, { y: number }> {

  state = { y: 0 };

  onScroll = () => this.setState({ y: window.scrollY });



  componentDidMount() {

    window.addEventListener("scroll", this.onScroll, { passive: true });

  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.onScroll);

    sessionStorage.setItem(`scroll:${this.props.pageId}`, String(this.state.y));

  }

  render() {

    return <ScrollIndicator y={this.state.y} />;

  }

}
```

As a function component with a custom hook, the *behavior* gets a name (`useScrollPosition`) and is trivially reusable.

```javascript
function useScrollPosition() {

  const [y, setY] = useState(0);

  useEffect(() => {

    const onScroll = () => setY(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  return y;

}



function ScrollTracker({ pageId }: { pageId: string }) {

  const y = useScrollPosition();

  useEffect(() => {

    return () => sessionStorage.setItem(`scroll:${pageId}`, String(y));

  }, [pageId, y]);

  return <ScrollIndicator y={y} />;

}
```

The hook version is shorter, has no `this`, no method binding, no lifecycle method to remember, and the scroll-tracking logic is now a unit you can drop into any component.

## Trade-offs and gotchas

Hooks aren’t free. The patterns they replaced (HOCs, render props, classes) had real benefits in certain situations, and hooks have their own failure modes worth knowing.

- **Stale closures.** Every render captures its own snapshot of state and props. An interval set up in an effect with no dependencies will always see the *first* render’s values. The fix is usually a ref or a correctly-populated dependency array.
- **Effect overuse.** This is the single most common hook mistake. If you’re using `useEffect` to derive state from props, react to a click, or sync two pieces of local state, you almost certainly don’t need an effect.
- **Hidden ordering rules.** “Only call hooks at the top level” sounds obvious until you try to early-return before a hook, or call one inside a `try/catch`. The linter is your friend; trust it.
- **Test ergonomics.** Hooks have to be called inside a component. Test them through a component or with [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/)’s `renderHook` utility — don’t try to invoke them directly.

## What to remember

- Hooks let you extract any stateful logic into a plain function that other components — or other hooks — can compose.
- Two rules: top level only, React functions only. The lint plugin will keep you honest.
- `useEffect` is for talking to the outside world, not for deriving state from props or reacting to user events.
- React 19 adds first-class hooks for async work (`use`), forms (`useActionState`, `useFormStatus`), and optimistic UI (`useOptimistic`).
- The React Compiler removes most of the need for manual `useMemo`/`useCallback` — write clean components and let the optimizer do the rest.
- When a component starts to feel tangled, look for the verbs hiding inside it (`useScrollPosition`, `useDebouncedSearch`, `useFeatureFlag`) and lift them into hooks.

## References

- [Hooks reference — react.dev](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React 19 release notes](https://react.dev/blog/2024/12/05/react-19)
- [React Compiler](https://react.dev/learn/react-compiler)
- [`usehooks-ts`](https://usehooks-ts.com/) — a TypeScript-first hooks library
