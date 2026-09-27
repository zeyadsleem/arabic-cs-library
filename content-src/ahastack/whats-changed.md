---
title: "ما تغيّر منذ 2024"
lang: en
---

I wrote most of this site at the end of 2023. The tools moved on. The ideas didn’t.

Here’s what’s different, and what it means for you.

## htmx

[Section titled “htmx”](#htmx)

htmx 2 came out in June 2024. It dropped Internet Explorer, moved extensions out of the core file, and changed a few defaults. Nothing that touches the mental model.

htmx 4 came out in 2026. This one is a bigger step. The main changes:

- attribute inheritance is now explicit. If you want a child to inherit `hx-target` from a parent, you write `hx-target:inherited` on the parent
- responses with a `4xx` or `5xx` status are swapped by default, so you can render error messages from the server
- history navigation asks the server for the page again instead of using a local snapshot
- a new `` tag lets one response update many parts of the page, without relying on `id` matching

The core idea is identical: any element can make a request, any event can trigger it, the server sends back HTML.

htmx 4 is not marked as `latest` on npm yet, so `npm install htmx.org` still gives you 2.x. The team plans to flip that in 2027. The examples on this site use 4.

There is an upgrade checker if you have a 2.x app:

Terminal window

```sh
npx htmx.org@4.0.0 upgrade-check -- .
```

## Alpine.js

[Section titled “Alpine.js”](#alpinejs)

Alpine is still on version 3. Same API, same script tag, steady releases.

That’s a feature. You learned it once, it still works.

## Astro

[Section titled “Astro”](#astro)

Astro moved fastest of the three. Three major versions.

Astro 5 (December 2024) introduced the content layer and server islands. The `output: 'hybrid'` mode went away: you now use `output: 'static'` and mark single pages with `export const prerender = false`, or `output: 'server'` to render everything on demand.

Astro 6 (2026) rebuilt the dev server so it runs your real production runtime. For Cloudflare this is a big deal: `astro dev` runs on `workerd`, and bindings like D1 and KV work locally. You import them with `import { env } from 'cloudflare:workers'`. It also added a Fonts API, live content collections, and Content Security Policy support.

Astro 7 (2026) is about speed. The compiler and the Markdown pipeline are now written in Rust, and builds run on Vite 8. It also added advanced routing through a `src/fetch.ts` file, so you can wrap Astro in Hono or plain `fetch` handlers.

One thing to know if you come from Astro 4: on-demand rendered pages now check the `Origin` header on `POST` requests by default. htmx requests from your own pages pass. A bare `curl -X POST` gets rejected.

## What I’d do differently

[Section titled “What I’d do differently”](#what-id-do-differently)

Not much.

The [little example](/examples/1-first) now runs on Cloudflare Workers with D1 instead of a file in `/tmp`. Same three files, same htmx attributes.

The stack still fits in an afternoon.
