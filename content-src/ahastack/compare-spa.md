---
title: "مقارنة مع تطبيق SPA"
lang: en
---

Let’s compare the AHA stack to the typical SPA approach, for example an app built using React:

- It’s simpler to reason about, so you have less stuff to think about, so you can think about other important things instead. For example, “how will people find my app” or “let me add this feature quickly”.
- It’s more true to the platform. It’s using the Web as it was intended.
- It gives you less complex performance issues, because you’re using the Web as it was intended.
- It requires less JavaScript. Raise your hand if you’ve ever visited a live website that’s a blank page with a ton of errors in the DevTools console or (worse) has a JavaScript error printed right on the page.
- It requires less lock-in. If you build an app with React, you’re a React developer. Use Svelte? You’re a Svelte developer. You are tied to that, there’s no way you’re going to rewrite the app in another framework/library because you’d have to rewrite everything from scratch. The approach I use has different smaller dependencies that you can swap at any time with an alternative. Even write your own, because [htmx is just one file](https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js).
- First load is way faster because it’s just some HTML rendered server-side, you don’t need to first load a ton of JavaScript and then initialize and then call some JSON that is then rendered…
