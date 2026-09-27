---
title: "إضافة Alpine"
lang: en
---

In the [previous example](/examples/1-first) we built a counter with Astro and htmx. Let’s add the “A” at the end of AHA.

We’ll add a Reset button. But resetting is destructive, so we want the user to confirm first.

Here’s the rule of thumb: anything that talks to the server is htmx. Anything that’s just UI state, living only in the browser, is Alpine.

“Am I asking for confirmation right now?” is UI state. Alpine’s job.

“Set the count to zero” talks to the server. htmx’s job.

Install Alpine by adding a `` tag to the ``, next to htmx:

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
```

Now add this to the ``, below the two buttons:

```html
<div x-data="{ confirming: false }">
  <button x-show="!confirming" @click="confirming = true">Reset</button>
  <span x-show="confirming">
    Sure?
    <button hx-post="/api/reset" @click="confirming = false">Yes</button>
    <button @click="confirming = false">No</button>
  </span>
</div>
```

 Reset  Sure? Yes No ">

Let’s see what’s going on.

`x-data` creates a little piece of state, `confirming`, scoped to this `div`. It starts as `false`.

`x-show` shows or hides an element depending on a condition. When `confirming` is `false` we see the Reset button. When it’s `true` we see the question.

`@click` runs some JavaScript when the element is clicked. Here we just flip `confirming`.

The “Yes” button is where htmx and Alpine meet. `hx-post` sends the request to the server. `@click` closes the confirmation. Two attributes, two libraries, one button.

Now the server side. Create `src/pages/api/reset.astro`:

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

await env.DB.prepare('UPDATE counter SET value = 0 WHERE id = 1').run()
---

<span id='count' hx-swap-oob='true'>0</span>
```

0">

Same pattern as increment and decrement. Update the database, return the new count as an oob swap.

Try it at [https://demo.ahastack.dev/counter](https://demo.ahastack.dev/counter).

There are [18 demos](https://demo.ahastack.dev) on that site: active search, todos, inline validation, infinite scroll, polling, modals, optimistic UI, error handling, boosted navigation and more. Each one has a “what to look at” section and a link to its source.

Notice what we did *not* do. We did not write an event listener. We did not query the DOM. We did not track state in a JavaScript variable somewhere else and sync it with the HTML.

The state lives right where it’s used. You read the HTML and you know what happens.

That’s the sprinkle of interactivity. Alpine is great at these small, local things: toggling, showing and hiding, tracking an input value, reacting to a keypress.

Full page code, `src/pages/index.astro`:

```astro
---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width' />
    <title>AHA counter</title>
    <script src='https://cdn.jsdelivr.net/npm/htmx.org@4.0.0'></script>
    <script defer src='https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js'
    ></script>
  </head>
  <body>
    <h1>Count: <span id='count'>{count}</span></h1>

    <button hx-post='/api/increment'>Increment</button>
    <button hx-post='/api/decrement'>Decrement</button>

    <div x-data='{ confirming: false }'>
      <button x-show='!confirming' @click='confirming = true'>Reset</button>
      <span x-show='confirming'>
        Sure?
        <button hx-post='/api/reset' @click='confirming = false'>Yes</button>
        <button @click='confirming = false'>No</button>
      </span>
    </div>
  </body>
</html>
```

    AHA counter    

# Count: {count}

 Increment Decrement  Reset  Sure? Yes No   ">
