# router--loading-data-in-parallel-single-blog-post-page — Loading Data in Parallel: Single Blog Post Page

- الفرع: origin/loaders-3
- الأساس: origin/loaders-2
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## ملفات تغيّرت في هذا الدرس

- `src/data/posts.ts` (معدَّل)
- `src/routes/-components/Post.tsx` (معدَّل)
- `src/routes/posts.$postId.tsx` (معدَّل)

### `src/data/posts.ts`

```ts
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
type PostComment = {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user: {
    id: number;
    username: string;
  };
};

type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};
type PostCommentsResponse = {
  comments: PostComment[];
  total: number;
  skip: number;
  limit: number;
};

export async function getPosts(page = 1) {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`
  );
  if (res.ok) {
    return (await res.json()) as PostsResponse;
  } else {
    throw new Error("Failed to fetch posts");
  }
}
export async function getPost(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (res.ok) {
    return (await res.json()) as Post;
  } else {
    throw new Error("Failed to fetch post");
  }
}
export async function getPostComments(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  if (res.ok) {
    return (await res.json()) as PostCommentsResponse;
  } else {
    throw new Error("Failed to fetch post comments");
  }
}
```

### `src/routes/-components/Post.tsx`

```tsx
import { getRouteApi } from "@tanstack/react-router";

export default function Post() {
  const { useParams, useLoaderData } = getRouteApi("/posts/$postId");
  const { postId } = useParams();
  const { post, comments } = useLoaderData();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p>{post.body}</p>
      <div className="border-2 p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <ul>
          {comments.comments.map((comment) => (
            <li key={comment.id} className="bg-purple-800 border-1 p-2 mb-2">
              {comment.body}
              <br />
              <span className="text-sm text-gray-200">
                - {comment.user.username}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### `src/routes/posts.$postId.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import Post from "./-components/Post";
import { getPost, getPostComments } from "../data/posts";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const [post, comments] = await Promise.all([
      getPost(+params.postId),
      getPostComments(+params.postId),
    ]);
    return {
      post,
      comments,
    };
  },
});

function RouteComponent() {
  return <Post />;
}
```

## الشيفرة الكاملة عند الفرع `loaders-3`

### `src/main.tsx`

```tsx
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { User } from "./types";
import { flushSync } from "react-dom";

const router = createRouter({
  routeTree,
  context: {
    user: null,
    login: () => {},
    logout: () => {},
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  async function login(user: User) {
    flushSync(() => {
      setUser(user);
    });
    router.invalidate();
  }
  function logout() {
    flushSync(() => {
      setUser(null);
    });
    router.invalidate();
  }
  return <RouterProvider router={router} context={{ user, login, logout }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
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

### `src/routes/__root.tsx`

```tsx
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { User } from "../types";

interface RootRouteContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { user, login, logout } = Route.useRouteContext();
  return (
    <div className="bg-blue-950 p-2">
      <h1 className="text-2xl font-bold">Root Route</h1>
      {user ? (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Welcome, Guest!</h2>
          <button onClick={() => login({ id: "dwdw", name: "Test" })}>
            Login
          </button>
        </div>
      )}
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
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  if (true) {
    return <Navigate to="/posts" />;
  }
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

### `src/routes/index.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as productsRoute } from "./products.index";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-violet-500">
      <h3 className="text-xl font-bold">Home</h3>
      <Link
        to="/{-$locale}/archive/{-$year}/{-$month}/{-$day}"
        hash="section-1"
        params={{
          locale: "fr",
          year: "2009",
        }}
      >
        Go to Archive
      </Link>
      <br />
      <Link
        to={productsRoute.to}
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

### `src/routes/posts.index.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "../data/posts";
import z from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const postsSearchParamsSchema = z.object({
  page: z.number().optional(),
});

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  validateSearch: zodValidator(postsSearchParamsSchema),
  beforeLoad: () => {
    return {
      getPosts: getPosts,
    };
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    const { getPosts } = context;
    const posts = await getPosts(deps.page);
    return {
      posts: posts.posts,
    };
  },
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();
  return (
    <div>
      Hello "/posts/"! <br />
      {posts.map((post) => (
        <div key={post.id}>
          <Link
            to={`/posts/$postId`}
            params={{ postId: String(post.id) }}
            className="underline font-bold text-lg"
          >
            {post.id}- {post.title}
          </Link>
        </div>
      ))}
      <br />
      <Link
        from={Route.fullPath}
        to="."
        search={(prev) => ({ page: (prev.page || 1) + 1 })}
      >
        Go to Next Page
      </Link>
    </div>
  );
}
```

### `src/routes/posts_.$postId.edit.tsx`

```tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/posts_/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });
  return (
    <div>
      Hello "/posts/$postId/edit"!
      <br />
      <Link to="/posts">All Posts</Link>
      <br />
      <Link from="/posts/$postId/edit" to="../../../posts">
        All Posts
      </Link>
      <br />
      <Link from={Route.fullPath} to="../../../posts">
        All Posts
      </Link>
      <br />
      <Link to="..">Back to Post</Link>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate({
            to: "..",
          });
        }}
      >
        <button>Submit</button>
      </form>
    </div>
  );
}
```

### `src/routes/products.index.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const productSearchParamsSchema = z.object({
  sort_by: fallback(z.enum(["newest", "oldest", "price"]), "newest").default(
    "newest"
  ),
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
  errorComponent: () => <p>Error.</p>,
});

function RouteComponent() {
  const search = Route.useSearch();
  console.log(search);
  return (
    <div>
      Hello "/products/"!
      <br />
      <Link
        to="."
        search={(prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            page: (prev.pagination?.page || 1) + 1,
          },
        })}
      >
        Go to Next Page
      </Link>
    </div>
  );
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

### `src/types/index.ts`

```ts
export interface User {
  id: string;
  name: string;
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
