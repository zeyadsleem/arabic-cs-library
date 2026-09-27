---
title: "htmx"
lang: en
---

htmx defines itself as an “extension of HTML”.

It brings a few brilliant ideas:

- any HTML element can initiate an HTTP request (not just forms or links)
- any event can trigger an HTTP request
- you can use all HTTP methods (PUT, DELETE, PATCH) declaratively in addition to GET (forms and links) and POST (available only to forms in HTML)

Those 3 ideas alone are genius.

Then, it allows us to easily overcome the “replace the entire screen” concept, and introduces “replace just this part of the HTML with a snippet of HTML”.

It’s a brilliant little library, with no dependencies, that you install through a script tag. It’s backend-agnostic.

The current version is htmx 4. See [what’s changed since 2024](/aha/6-whats-changed) if you used an earlier one.

We use htmx to handle client-server HTTP communication once the page is loaded.

So for example the user clicks a link, and we load some data from the server, which we get back as HTML, and we add it to the page dynamically.

And we do this in a way that’s declarative.

Not imperatively writing JavaScript to tell the page what to do, instead, we go up a level of abstraction, and declare what we want it to do.

[See the htmx homepage](https://htmx.org)

[Learn htmx on The Valley of Code](https://thevalleyofcode.com/htmx)
