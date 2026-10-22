# router--validating-search-params-with-zod — Validating Search Params with Zod

- الفرع: origin/search-2
- الأساس: origin/search-1
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## ملفات تغيّرت في هذا الدرس

- `package.json` (معدَّل)
- `src/routes/index.tsx` (معدَّل)
- `src/routes/products.index.tsx` (معدَّل)

### `package.json`

```json
{
  "name": "tanstack-router",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.12",
    "@tanstack/react-router": "^1.131.28",
    "@tanstack/react-router-devtools": "^1.131.28",
    "@tanstack/zod-adapter": "^1.131.32",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "tailwindcss": "^4.1.12"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@tanstack/router-plugin": "^1.131.28",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.39.1",
    "vite": "^7.1.2"
  }
}
```

### `src/routes/index.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-violet-500">
      <h3 className="text-xl font-bold">Home</h3>
      <Link
        to="/{-$locale}/archive/{-$year}/{-$month}/{-$day}"
        params={{
          locale: "fr",
          year: "2009",
        }}
      >
        Go to Archive
      </Link>
      <br />
      <Link
        to="/products"
        search={{
          sort_by: "price",
          product_type: "shoes",
          pagination: {
            page: 1,
            pageSize: 10,
          },
          // colors: ["red", "blue"],
          // sale: true,
        }}
      >
        Products with Filters
      </Link>
    </div>
  );
}
```

### `src/routes/products.index.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const productSearchParamsSchema = z.object({
  sort_by: z.enum(["newest", "oldest", "price"]),
  product_type: z.enum(["shoes", "t-shirts"]).default("shoes"),
  pagination: z
    .object({
      page: z.number().default(1),
      pageSize: z.number().default(10),
    })
    .default({}),
  colors: z.array(z.enum(["red", "blue", "green"])).optional(),
  sale: z.boolean().default(true),
});

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  validateSearch: zodValidator(productSearchParamsSchema),
});

function RouteComponent() {
  const search = Route.useSearch();
  console.log(search);
  return <div>Hello "/products/"!</div>;
}
```

## الشيفرة الكاملة عند الفرع `search-2`

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

### `src/routes/-components/Nav.tsx`

```tsx
import { Link } from "@tanstack/react-router";

export default function Nav() {
  return (
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
  );
}
```

### `src/routes/-components/Post.tsx`

```tsx
import { getRouteApi } from "@tanstack/react-router";

export default function Post() {
  const { useParams } = getRouteApi("/posts/$postId");
  const { postId } = useParams();
  return (
    <div>
      Hello "/posts/$postId"!
      <br /> Post ID: {postId}
    </div>
  );
}
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

### `src/routes/_settingsLayout.settings.payment.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_settingsLayout/settings/payment"!</div>
}
```

### `src/routes/_settingsLayout.settings.profile.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_settingsLayout/settings/profile"!</div>
}
```

### `src/routes/_settingsLayout.settings.tsx`

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_settingsLayout/settings/"!
      <Outlet />
    </div>
  );
}
```

### `src/routes/_settingsLayout.settings_.password.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings_/password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings_/password"!</div>
}
```

### `src/routes/_settingsLayout.tsx`

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Nav from "./-components/Nav";

export const Route = createFileRoute("/_settingsLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _settingsLayout
      <Nav />
      <Outlet />
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

### `src/routes/file.file-{$fileId}.{$}[.]txt.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/file/file-{$fileId}/{$}.txt")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat, fileId } = Route.useParams();
  return (
    <div>
      Hello "/file/$"! <br /> File Path: {_splat} <br /> File ID: {fileId}
    </div>
  );
}
```

### `src/routes/posts.$postId.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import Post from "./-components/Post";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Post />;
}
```

### `src/routes/posts.index.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/posts/"! <br />
      <Link
        to="/posts/$postId"
        params={{
          postId: "434",
        }}
      >
        Go to Post
      </Link>
      <Link
        to="/posts/$postId"
        params={(prev) => ({ ...prev, postId: "34435" })}
      >
        Go to Post
      </Link>
    </div>
  );
}
```

### `src/routes/posts_.$postId.edit.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts_/$postId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/$postId/edit"!</div>
}
```

### `src/routes/{-$locale}.archive.{-$year}.{-$month}.{-$day}.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
];

export const Route = createFileRoute(
  "/{-$locale}/archive/{-$year}/{-$month}/{-$day}"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale, year, day, month } = Route.useParams();
  return (
    <div>
      Hello "/-$locale/archive/-$year/-$month/-$day"!
      <div>
        <div className="flex gap-2 bg-amber-700 p-2 my-2">
          {languages.map(({ code, name }) => (
            <Link
              key={code}
              to="/{-$locale}/archive/{-$year}/{-$month}/{-$day}"
              params={(prev) => ({
                ...prev,
                locale: code === "en" ? undefined : code,
              })}
              className={
                locale === code || (!locale && code === "en") ? "font-bold" : ""
              }
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p>Locale: {locale}</p>
        <p>Year: {year}</p>
        <p>Month: {month}</p>
        <p>Day: {day}</p>
      </div>
    </div>
  );
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
