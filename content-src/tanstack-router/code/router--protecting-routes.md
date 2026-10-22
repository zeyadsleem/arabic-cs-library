# router--protecting-routes — Protecting Routes

- الفرع: origin/auth-1
- الأساس: origin/caching-2
- مستودع الدورة: https://github.com/alialaa/tanstack-router-course.git

## ملفات تغيّرت في هذا الدرس

- `src/main.tsx` (معدَّل)
- `src/routes/about.tsx` (معدَّل)
- `src/routes/login.tsx` (جديد)

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
  notFoundMode: "fuzzy",
  defaultPreload: "intent",
  // defaultPreloadDelay: 1000,
  defaultNotFoundComponent: () => <div>Default Not Found</div>,
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
  const [user, setUser] = useState<User | null>({ id: "1", name: "Test" });
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

### `src/routes/about.tsx`

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="p-2 bg-pink-600">
      <h3 className="text-xl font-bold">About</h3>
    </div>
  );
}
```

### `src/routes/login.tsx`

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const loginSearchParamsSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: zodValidator(loginSearchParamsSchema),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({ to: search.redirect || "/" });
    }
  },
});

function RouteComponent() {
  const { login } = Route.useRouteContext();
  const { redirect } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <div>
      Hello "/login"!
      <button
        onClick={() => {
          login({ id: "dwdw", name: "Test" });
          navigate({ to: redirect || "/" });
        }}
      >
        Login
      </button>
    </div>
  );
}
```

## الشيفرة الكاملة عند الفرع `auth-1`

### `src/data/posts.ts`

```ts
import { notFound } from "@tanstack/react-router";

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
    if (res.status === 404) {
      throw notFound();
    }
    throw new Error("Failed to fetch post");
  }
}
export async function getPostComments(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  await new Promise((r) => setTimeout(r, 3000));
  throw new Error("Failed to fetch post comments");
  if (res.ok) {
    return (await res.json()) as PostCommentsResponse;
  } else {
    throw new Error("Failed to fetch post comments");
  }
}
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
import { Await, CatchBoundary, getRouteApi } from "@tanstack/react-router";

export default function Post() {
  const { useParams, useLoaderData } = getRouteApi("/posts/$postId");
  const { postId } = useParams();
  const { post, commentsPromise } = useLoaderData();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p>{post.body}</p>
      <div className="border-2 p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <CatchBoundary
          errorComponent={() => <div>Failed to Load Comments</div>}
          getResetKey={() => "comments"}
        >
          <Await promise={commentsPromise} fallback={<div>Loading...</div>}>
            {(comments) => (
              <ul>
                {comments.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-purple-800 border-1 p-2 mb-2"
                  >
                    {comment.body}
                    <br />
                    <span className="text-sm text-gray-200">
                      - {comment.user.username}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </CatchBoundary>
      </div>
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
  notFoundComponent: () => <div>Root Not Found.</div>,
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
        <Link to="/random-word" className="[&.active]:font-bold">
          Random Word
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
  notFoundComponent: () => <div>Settings Not Found</div>,
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

### `src/routes/posts.$postId.tsx`

```tsx
import {
  CatchBoundary,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";
import Post from "./-components/Post";
import { getPost, getPostComments } from "../data/posts";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
  onError: (error) => {
    console.error("Error loading post:", error);
  },
  onCatch: (error) => {
    console.error("onCatch", error);
  },
  notFoundComponent: () => <div>Post Not Found</div>,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div>
        {error.message} <br />
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          Retry
        </button>
      </div>
    );
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 0,
  pendingMinMs: 500,
  loader: async ({ params }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const commentsPromise = getPostComments(+params.postId);
    const post = await getPost(+params.postId);

    return {
      post,
      commentsPromise,
    };
  },
});

function RouteComponent() {
  return <Post />;
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

### `src/routes/random-word.tsx`

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const randomWordSearchParamsSchema = z.object({
  lang: z.enum(["en", "es", "fr", "zh"]).optional(),
});

type LangType = z.infer<typeof randomWordSearchParamsSchema>["lang"];

export const Route = createFileRoute("/random-word")({
  component: RouteComponent,
  validateSearch: zodValidator(randomWordSearchParamsSchema),
  preloadStaleTime: 5_000,
  staleTime: 30_000,
  // shouldReload: ({context, params, deps, route}) => {

  // },
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: async ({ deps }) => {
    const res = await fetch(
      `https://random-words-api.kushcreates.com/api?words=1&language=${deps.lang || "en"}`
    );
    await new Promise((r) => setTimeout(r, 1000));
    const resJSON = await res.json();
    return { word: resJSON[0]?.word };
  },
});

function RouteComponent() {
  const { word } = Route.useLoaderData();
  return (
    <div className="flex flex-col items-center justify-center bg-black p-4 m-4">
      <div className="bg-gray-800 p-2 rounded-md mb-4">
        {["en", "es", "fr", "zh"].map((lang) => (
          <Link
            key={lang}
            to="."
            search={{ lang: lang as LangType }}
            className="[&.active]:font-bold mx-2"
          >
            {lang}
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold">{word}</h2>
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
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
});
```
