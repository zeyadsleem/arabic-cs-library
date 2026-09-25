---
title: HOC Pattern
lang: en
source: https://www.patterns.dev/react/hoc-pattern/
---

## A motivating scenario

You have a sprawling React codebase. Every screen needs to fire an analytics event when it mounts, but only when the current user has consented to tracking. Sprinkling that logic into each page component would be repetitive, easy to forget, and a nightmare to update when the analytics SDK changes.

The Higher-Order Component (HOC) pattern is one of React’s oldest answers to this kind of cross-cutting problem. A HOC is just a function: it accepts a component and returns a new component that wraps the original with extra behavior. Think of it as a decorator for components.

```
// The shape of every HOC
type HOC<P> = (Wrapped: React.ComponentType<P>) => React.ComponentType<P>;
```

The wrapped component does not need to know anything about the behavior added by the HOC. That separation is the whole point: a `Page` component focuses on rendering, and `withAnalytics(Page)` quietly takes care of the tracking.

> **Heads up:** In a brand-new codebase you’ll usually reach for a custom hook before a HOC. The pattern still appears throughout long-lived production code (`withAuth`, `withTranslation`, `withRouter`, `connect` from React Redux) so it is worth understanding deeply, even if you write few of them yourself. We’ll cover the modern alternatives toward the end of this article.

## Building your first HOC

Let’s implement `withAnalytics`. It should:

- Fire a `page_view` event the first time the wrapped component mounts.
- Accept an `eventName` so the same HOC can be reused for any screen.
- Pass every prop through to the wrapped component untouched.

```
import { useEffect } from "react";
import { track } from "./analytics";

export function withAnalytics<P extends object>(
  Wrapped: React.ComponentType<P>,
  eventName: string,
) {
  function WithAnalytics(props: P) {
    useEffect(() => {
      track(eventName, { path: window.location.pathname });
    }, []);

    return <Wrapped {...props} />;
  }

  // Helpful in React DevTools
  WithAnalytics.displayName = `withAnalytics(${
    Wrapped.displayName ?? Wrapped.name ?? "Component"
  })`;

  return WithAnalytics;
}
```

Usage is a one-liner at the export site:

```
function CheckoutPage(props: CheckoutPageProps) {
  return <main>{/* ...checkout UI... */}</main>;
}

export default withAnalytics(CheckoutPage, "checkout_viewed");
```

A few details that the example above demonstrates and that you will copy into almost every HOC you write:

- **Generics on the props.** `P extends object` keeps the wrapped component’s typings intact. Consumers of `withAnalytics(CheckoutPage, ...)` still get full IntelliSense on `CheckoutPageProps`.
- **`displayName` for debugging.** Without it, React DevTools shows a tree full of anonymous wrappers — exactly the “what am I looking at?” problem the pattern is supposed to avoid.
- **Spread `{...props}` last (or first, intentionally).** The order you spread props decides who wins on collision. More on that pitfall below.

## Adding behavior, not just side effects

HOCs become more interesting when they *inject* props that the wrapped component can read. `withFeatureFlag` is a classic example: ship two variants of a component, let the HOC decide which one to render based on a remote flag service.

```
import { useFlag } from "./flagsClient";

export function withFeatureFlag<P extends object>(
  flagKey: string,
  Treatment: React.ComponentType<P>,
  Control: React.ComponentType<P>,
) {
  return function WithFeatureFlag(props: P) {
    const enabled = useFlag(flagKey);
    return enabled ? <Treatment {...props} /> : <Control {...props} />;
  };
}

// At the call site:
export const PricingPage = withFeatureFlag(
  "pricing_redesign_2025",
  PricingPageNew,
  PricingPageLegacy,
);
```

Notice that `withFeatureFlag` doesn’t render anything itself. It is purely a switch. That is fine — a HOC’s “extra behavior” can be a side effect, an injected prop, a conditional render, or all three.

## Composing HOCs

The whole point of the pattern is that HOCs are *just functions*, and functions compose. A common production layering looks like this:

```
export default withErrorBoundary(
  withAuthorization(
    withAnalytics(CheckoutPage, "checkout_viewed"),
    { requiredRole: "customer" },
  ),
  { fallback: <SomethingWentWrong /> },
);
```

Once you start nesting three or four of these, the call site becomes hard to read. Two common ways teams clean this up:

```
// 1. Pipe-style composition with a tiny helper
const compose =
  (...hocs) =>
  (Component) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component);

export default compose(
  withErrorBoundary({ fallback: <SomethingWentWrong /> }),
  withAuthorization({ requiredRole: "customer" }),
  withAnalyticsEvent("checkout_viewed"),
)(CheckoutPage);
```

```
// 2. A decorator-like factory: each HOC takes its config first,
//    returns the actual (Component) => Component function.
const withAnalyticsEvent = (eventName: string) =>
  <P extends object>(C: React.ComponentType<P>) =>
    withAnalytics(C, eventName);
```

The library [`recompose`](https://github.com/acdlite/recompose) popularised this style. Its README now recommends using hooks for new code, and the package has been unmaintained for years — a useful signal about where the React community has landed.

## Pitfalls in production

The HOC pattern has a handful of failure modes that are easy to trip over. Knowing them is more useful than memorising the pattern itself.

### Prop name collisions

If your HOC injects a prop with the same name as one the parent passes in, *somebody* loses. The behavior depends on the order of your spreads:

```
function withTheme<P extends { theme?: Theme }>(Wrapped: React.ComponentType<P>) {
  return (props: Omit<P, "theme">) => {
    const theme = useTheme();
    // Parent-supplied props win because they are spread last
    return <Wrapped theme={theme} {...(props as P)} />;
  };
}
```

In a small codebase this is fine. In a large one, prefer scoping the injected props under a namespace prop (`analytics={...}`, `auth={...}`) so collisions become impossible.

### Static methods and refs don’t pass through

Wrapping `MyComponent` with a HOC produces a brand-new component. Any `MyComponent.fetchData` static method, and any `ref` forwarded to it, will not exist on the wrapper unless you do extra work. Use [`React.forwardRef`](https://react.dev/reference/react/forwardRef) (or wait for the React 19+ behavior where `ref` is just a prop on function components) and a utility like `hoist-non-react-statics` if you need them.

### Wrapper hell

Every HOC adds another node to the component tree. Three or four layers is usually fine; ten is where DevTools starts looking like a Russian doll and stack traces become indecipherable.

```
<WithRouter>
  <WithAuth>
    <WithTheme>
      <WithAnalytics>
        <CheckoutPage />
      </WithAnalytics>
    </WithTheme>
  </WithAuth>
</WithRouter>
```

This is the single biggest reason custom hooks have largely displaced HOCs for new code: a hook adds zero nodes to the tree.

### HOCs and the React Compiler

The [React Compiler](https://react.dev/learn/react-compiler) (the optimizer formerly known as “React Forget”) works best when it can statically analyse a component’s body. Heavy HOC layering hides logic behind opaque function calls, which gives the compiler less to work with. This is not a reason to rip out existing HOCs, but it is another small thumb on the scale for hooks in new code.

## When NOT to use a HOC

Reach for a different tool when:

- **The behavior needs to be customised per call site.** A hook is more honest about that: it lives inside the component and the customisation reads top-to-bottom.
- **You only need it in one or two places.** A HOC’s overhead (extra component, extra indirection) only pays off when reuse is real.
- **The “shared logic” is just a styled wrapper.** That is what composition with children is for — `{...}` beats `withCard(...)` every time.
- **You are reaching for it to share state.** Context plus a custom hook (`const { user } = useAuth()`) is almost always clearer than `withAuth(Component)`.

## The modern alternative: custom hooks

Here is the same `useFeatureFlag` idea, rewritten as a hook:

```
function PricingPage(props: PricingPageProps) {
  const showRedesign = useFlag("pricing_redesign_2025");
  return showRedesign ? <PricingPageNew {...props} /> : <PricingPageLegacy {...props} />;
}
```

The differences are striking:

- No wrapper component, so no extra node in the tree and no `displayName` bookkeeping.
- The branching logic is visible *inside* the component body — easy to grep for, easy to step through in a debugger.
- TypeScript inference is automatic; there is no generic gymnastics to preserve the wrapped component’s props.

The React docs put it bluntly: *“In most cases, Hooks will be sufficient and can help reduce nesting in your tree.”* ([reactjs.org](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components))

That said, HOCs still earn their keep in a few situations:

- **Library APIs that need to wrap any component shape.** `withTranslation` from [react-i18next](https://react.i18next.com/) and React Router’s `withRouter` (still used in v5 codebases) work without the consumer rewriting their component as a function.
- **Class components.** If you maintain an older codebase that still ships class components, a HOC is your only ergonomic option for sharing logic with them.
- **Wrapping with an error boundary or suspense boundary.** Both still need to exist as components in the tree, so a `withErrorBoundary` HOC is a perfectly reasonable encapsulation.

## A real-world case study: React Redux

React Redux is the canonical example of HOC use in the wild. For a decade, the way to give a component access to the store was [`connect`](https://react-redux.js.org/api/connect):

```
function CartSummary({ itemCount, total, checkout }) {
  return (
    <button onClick={checkout}>
      Checkout ({itemCount}) — ${total}
    </button>
  );
}

const mapState = (state) => ({
  itemCount: state.cart.items.length,
  total: selectCartTotal(state),
});

const mapDispatch = { checkout: checkoutAction };

export default connect(mapState, mapDispatch)(CartSummary);
```

`connect` is a HOC factory — `connect(mapState, mapDispatch)` returns a function that wraps your component. It was the dominant API in React apps from roughly 2015 to 2019.

After React 16.8, React Redux shipped a hook-based API. The same component becomes:

```
function CartSummary() {
  const itemCount = useSelector((state) => state.cart.items.length);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(checkoutAction())}>
      Checkout ({itemCount}) — ${total}
    </button>
  );
}
```

`connect` still works and is unlikely to ever be removed — there is too much code in the wild — but every example in the modern Redux docs uses the hook form. That trajectory is typical: a successful library introduces a HOC, then ships a hook-based version once Hooks become idiomatic, then quietly recommends the hook for new code.

## What to remember

- A HOC is a function that takes a component and returns a new component with extra behavior baked in.
- Use it for **uncustomised, cross-cutting concerns** — auth, analytics, error boundaries, feature flags, telemetry — applied to many call sites.
- Always set a `displayName`, decide a prop-collision strategy, and think about ref forwarding before shipping a HOC in a library.
- Prefer a custom hook when the logic is consumed in only one or two places, or when the consumer needs to customise it.

## References

- [Higher-Order Components — React (legacy docs)](https://legacy.reactjs.org/docs/higher-order-components.html)
- [Do Hooks replace render props and higher-order components? — React FAQ](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
- [`connect` — React Redux](https://react-redux.js.org/api/connect)
- [React Compiler](https://react.dev/learn/react-compiler)
