---
title: "لماذا Astro؟"
lang: en
---

First, note that you can use any backend framework you prefer.

But I have to suggest one, and I pick Astro because it’s my favorite tool ever.

If you’re unfamiliar with it, let me explain the basics.

I’ve been using it for years now, and I’ve built dozens of sites with it.

You can create both static sites or server-rendered sites, or hybrid (some pages static, some server-rendered)

This makes sure you only use the server resources you need, and you can deploy it on any major deployment platform, including serverless platforms.

It has a simple mental model.

By default, no JavaScript is shipped to the client. At all. Pages are generated on the server, at build time by default.

Then it just ships HTML.

Which makes it perfect for The AHA Stack.

It provides a great JSX-like templating language that’s just perfect in my opinion (I consider JSX the best feature introduced by React). But unlike JSX in React, Astro renders on the server, either at build time or request time (SSG or SSR).

And using this templating language we can design UIs on the server using JS-based components, like you are used to in the frontend, and use the JavaScipt import syntax to use them (game changer feature).

If you want, you can then add any kind of frontend framework you want, in the so-called “island architecture”. Basically you can add a React component, or Svelte component, anything you want, inside a page. You don’t have “React runs the site” but “the site runs some React thing on this page”. Which is great when you need more interactivity that The AHA Stack default tooling allows.

Letting us build a fast Multi Page Application.

You can create API routes easily.

And with server-rendering you can process form requests using the Web platform’s FormData, Request, Response. Process cookies, connect to a DB, whatever.

You can do what you want, basically.

Then, most sites are about content, and Astro’s content story is unparalleled. Markdown support out of the box, content collections for content-heavy sites, image processing, and much more.

It has sane defaults.

It is growing in popularity, but stays true to its principles.

The team building it is amazing.

But then again, if you prefer, bring your own backend here.

No problem.
