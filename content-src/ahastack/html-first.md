---
title: "HTML أولاً"
lang: en
---

One of the core concepts of the AHA stack is “HTML first”.

The server responds to the initial request using a complete HTML page, DOCTYPE, ``, ``, `` and all.

This can be HTML that’s being pregenerated and cached, or generated dynamically at request time, it doesn’t matter.

The browser gets this HTML and renders it. This is the browser’s job, and it’s very fast and efficient at this.

When the User Interface demands to be dynamically updated, for example if the user clicks a button to “load more” items in a list, the server can respond with an **HTML partial**, just some bits of HTML that the browser needs.

htmx takes care of adding this new HTML into the page.

This is the super simple mental model of the HTML-first concept.

It’s all just HTML.

And CSS, or course.

And some JavaScript sprinkles for client-side interactivity when needed.

But at the core, we ship HTML to the browser. Not some JSON or other data formats the browser needs to interpret.
