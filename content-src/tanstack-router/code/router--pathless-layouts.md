# router--pathless-layouts — Pathless Layouts

- الفرع: origin/pathless-layouts
- الأساس: origin/nesting-routes
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## ملفات تغيّرت في هذا الدرس

- `src/routes/_settingsLayout/route.tsx` (أُعيدت تسميته من `src/routes/settings/route.tsx`)
- `src/routes/_settingsLayout/settings/index.tsx` (جديد)
- `src/routes/_settingsLayout/settings/payment.tsx` (أُعيدت تسميته من `src/routes/settings/payment.tsx`)
- `src/routes/_settingsLayout/settings/profile.tsx` (أُعيدت تسميته من `src/routes/settings/profile.tsx`)

### `src/routes/_settingsLayout/route.tsx`

```tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _settingsLayout
      <div className="p-2 flex gap-2 mb-4 bg-yellow-600 border-2">
        <Link
          to="/settings"
          activeOptions={{
            exact: true,
          }}
          className="[&.active]:font-bold"
        >
          General
        </Link>
        <Link to="/settings/payment" className="[&.active]:font-bold">
          Payment
        </Link>
        <Link to="/settings/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
```

### `src/routes/_settingsLayout/settings/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_settingsLayout/settings/"!</div>
}
```

### `src/routes/_settingsLayout/settings/payment.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout/settings/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-amber-700 border-2">Hello "/settings/payment"!</div>
  );
}
```

### `src/routes/_settingsLayout/settings/profile.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-amber-700 border-2">Hello "/settings/profile"!</div>
  );
}
```

## الشيفرة الكاملة عند الفرع `pathless-layouts`

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

### `src/routes/__root.tsx`

```tsx
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-blue-950 p-2">
      <h1 className="text-2xl font-bold">Root Route</h1>
      <div className="p-2 flex gap-2 mb-4 bg-teal-600 border-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link className="[&.active]:font-bold" to="/about">
          About
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </div>
  );
}
```

### `src/routes/about.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-pink-600">
      <h3 className="text-xl font-bold">About</h3>
    </div>
  );
}
```

### `src/routes/index.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-violet-500">
      <h3 className="text-xl font-bold">Home</h3>
    </div>
  );
}
```

### `src/routes/settings_/password.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings_/password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/settings/passwrod"!</div>;
}
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
    }),
    react(),
    tailwindcss(),
  ],
});
```
