# router--code-based-router — Code Based Router

- الفرع: origin/code-based-init
- الأساس: origin/app-init
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## ملفات تغيّرت في هذا الدرس

- `src/main.tsx` (معدَّل)

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <div className="bg-green-500 p-2">
      <h1 className="text-2xl font-bold">Root Route</h1>
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2 bg-violet-500">
        <h3 className="text-xl font-bold">Home</h3>
      </div>
    );
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function Index() {
    return (
      <div className="p-2 bg-pink-600">
        <h3 className="text-xl font-bold">About</h3>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

## الشيفرة الكاملة عند الفرع `code-based-init`

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
