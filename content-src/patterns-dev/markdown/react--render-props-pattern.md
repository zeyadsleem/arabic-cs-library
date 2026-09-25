---
title: Render Props Pattern
lang: en
source: https://www.patterns.dev/react/render-props-pattern/
---

## A motivating scenario

You’re building a `GeolocationProvider` for a mapping app. The provider needs to ask the browser for permission, subscribe to position updates, handle errors when the user is offline, and clean up the watcher when the consumer unmounts. The *logic* is identical everywhere it appears in the app — but the UI around it is different on every screen: a banner on one page, a map marker on another, a hidden debug panel during development.

How do you ship the logic once and let each consumer decide what to render?

The **Render Props pattern** is one answer. The component encapsulating the behavior doesn’t decide how the result is displayed. It accepts a function as a prop, calls that function with whatever data it has, and renders whatever JSX the function returns.

```
type RenderProp<T> = (value: T) => React.ReactNode;

function Geolocation({ render }: { render: RenderProp<GeoState> }) {
  const state = useGeolocation(); // does the actual work
  return <>{render(state)}</>;
}
```

The consumer wires it up at the call site, deciding what the UI looks like for *this* page:

```
<Geolocation
  render={({ coords, error, status }) => {
    if (status === "pending") return <Spinner />;
    if (error) return <PermissionPrompt error={error} />;
    return <MapMarker lat={coords.latitude} lng={coords.longitude} />;
  }}
/>
```

The “render prop” doesn’t have to be called `render`. Any prop whose value is a function returning JSX qualifies — `children`, `renderItem`, `renderEmpty`, you name it.

## A complete example: a reusable form validator

Imagine a `` that owns the rules and the field state but lets the calling page decide what the inputs and error messages look like.

```
import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

type FormApi<T> = {
  values: T;
  errors: Errors<T>;
  isValid: boolean;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  submit: () => void;
};

type Props<T> = {
  initialValues: T;
  validate: (values: T) => Errors<T>;
  onSubmit: (values: T) => void;
  children: (api: FormApi<T>) => React.ReactNode;
};

export function FormValidator<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  children,
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const setField = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (isValid) onSubmit(values);
  };

  return <>{children({ values, errors, isValid, setField, submit })}</>;
}
```

The consumer is free to render the form however it wants — using a design system, custom layout, server-rendered shell, anything:

```
<FormValidator
  initialValues={{ email: "", password: "" }}
  validate={(v) => ({
    email: v.email.includes("@") ? undefined : "Not an email",
    password: v.password.length >= 8 ? undefined : "Too short",
  })}
  onSubmit={(v) => signIn(v)}
>
  {({ values, errors, isValid, setField, submit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <TextField
        label="Email"
        value={values.email}
        error={errors.email}
        onChange={(v) => setField("email", v)}
      />
      <TextField
        label="Password"
        type="password"
        value={values.password}
        error={errors.password}
        onChange={(v) => setField("password", v)}
      />
      <PrimaryButton type="submit" disabled={!isValid}>
        Sign in
      </PrimaryButton>
    </form>
  )}
</FormValidator>
```

Notice that `FormValidator` does no rendering of inputs, labels, or buttons. It is pure logic with a render hatch.

## The “children as a function” variant

The example above already uses the children-as-a-function variant. It is the more idiomatic of the two — most modern libraries pick it because passing JSX between opening and closing tags reads more naturally than an explicit `render={...}` prop. The mechanics are identical: `children` is just a prop whose value happens to be the function you pass between the tags.

You’ll see both styles in the wild:

```
// Explicit render prop
<Subscribe topic="orders" render={(orders) => <OrderList orders={orders} />} />

// children-as-function
<Subscribe topic="orders">
  {(orders) => <OrderList orders={orders} />}
</Subscribe>
```

Some libraries (Formik historically, [Downshift](https://github.com/downshift-js/downshift)) expose both for backwards compatibility. Pick one style per codebase and stay consistent.

## Multiple render props on one component

A component can accept several render props, each responsible for a different slot. This is essentially a typed “slots” API:

```
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
};

function List<T>({ items, renderItem, renderEmpty, renderHeader }: ListProps<T>) {
  if (items.length === 0) return <>{renderEmpty?.()}</>;
  return (
    <section>
      {renderHeader?.()}
      <ul>{items.map((it, i) => <li key={i}>{renderItem(it, i)}</li>)}</ul>
    </section>
  );
}
```

This style — small, well-typed render slots — has aged better than monolithic render-prop wrappers. It is essentially how React Native’s `` (`renderItem`, `ListEmptyComponent`, `ListHeaderComponent`) has worked for years.

## Where render props still shine

In a 2025 codebase, render props are no longer the default tool for sharing logic — custom hooks are. But the pattern stays useful in a few situations where hooks struggle:

- **Components that need to own a subtree and slot consumer JSX into it.** Think drag-and-drop wrappers like [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd), which gives you `provided` and `snapshot` arguments to wire into your own JSX. A hook can give you state, but it cannot wrap your JSX in ``/`` boundaries.
- **Headless component libraries.** [Downshift](https://github.com/downshift-js/downshift), [React Aria](https://react-spectrum.adobe.com/react-aria/) (its `*Builder` APIs), and [TanStack Table](https://tanstack.com/table) all use render props or children-as-functions so they can ship the *behavior* (a11y, keyboard handling, focus management) without dictating the markup.
- **Animation primitives.** [Framer Motion](https://www.framer.com/motion/)’s `` and React Spring’s `Transition` use children-as-functions to thread interpolated values into your JSX every frame.

The common thread: render props win when the wrapper needs to *be* part of your tree (because it provides context, refs, or a portal) and *also* needs the consumer to author the JSX inside it.

## When NOT to use render props

- **For pure data sharing.** If a wrapper component only exists to call `props.children(data)`, a custom hook is almost always cleaner. `const data = useThing()` beats `{(data) => ...}` for readability.
- **When you’ll have to nest several of them.** Two `` components inside a `` quickly become the [callback-pyramid pain](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)) that hooks were partly designed to solve.
- **When the consumer always renders the same thing.** That is what a regular component plus props is for. Render props pay off only when the rendered output legitimately varies between call sites.

## Modernizing render props with hooks

Most libraries that championed the render-props pattern have shipped a hooks API alongside it. Apollo’s `` and `` components are still exported, but the docs now lead with `useQuery` and `useMutation`. React Router replaced `` with `` and the `useParams`/`useLoaderData` hooks. Formik users have moved largely to React Hook Form’s hook-first API.

Here is the same `Geolocation` problem from the top of the article, this time as a custom hook:

```
function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "pending" });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", error: new Error("Unsupported") });
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) =>
        setState({
          status: "ok",
          coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        }),
      (err) => setState({ status: "error", error: err }),
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}

// At the call site:
function NearbyStores() {
  const geo = useGeolocation();
  if (geo.status === "pending") return <Spinner />;
  if (geo.status === "error") return <PermissionPrompt error={geo.error} />;
  return <StoreMap lat={geo.coords.latitude} lng={geo.coords.longitude} />;
}
```

Two fewer indirections, no extra node in the tree, no closure-over-arguments to reason about. This is why most teams now reach for a hook first.

## Trade-offs at a glance

**Strengths**

- **No naming collisions.** Unlike HOCs, render props pass data explicitly as function arguments. There is no implicit prop merge, and the data flow is visible at the call site.
- **Maximum flexibility for the consumer.** The component owning the logic doesn’t dictate any markup, which is exactly why headless libraries love the pattern.
- **Plays nicely with TypeScript generics.** A ` renderItem={item => ...}>` gets you a fully typed `item` parameter for free.

**Weaknesses**

- **Callback pyramids.** Nesting multiple render-prop components for multiple data sources quickly becomes hard to read; flat hook calls are easier.
- **Re-render cost.** A fresh inline function on every parent render is fine in almost every app, but in tight performance-critical paths it can defeat memoization. The React Compiler helps here, but it is not magic.
- **One more concept to teach.** A new contributor has to recognise that `children` is sometimes a function.

## What to remember

- A render prop is a function-valued prop that returns JSX. The owner component runs the logic and calls the prop to display it.
- The pattern shines in **headless** libraries — drag and drop, animation, accessibility, table builders — where the library can’t dictate markup.
- For ordinary data-sharing, a custom hook is usually clearer, flatter, and friendlier to the React Compiler.
- If you find yourself writing a wrapper whose only job is `return props.children(data)`, that wrapper wants to be a hook.

## References

- [Render Props — React (legacy docs)](https://legacy.reactjs.org/docs/render-props.html)
- [Do Hooks replace render props and higher-order components? — React FAQ](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
- [Downshift — a headless combobox library built on render props](https://github.com/downshift-js/downshift)
- [React Aria — accessible primitives that use render props for behavior](https://react-spectrum.adobe.com/react-aria/)
