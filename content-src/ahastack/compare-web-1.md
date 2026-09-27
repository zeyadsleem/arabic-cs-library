---
title: "مقارنة مع تطبيق Web 1.0"
lang: en
---

Let’s compare the AHA stack to the traditional server-rendered HTML approach, think for example built using Django or Rails or Laravel, that does not use any client-side JavaScript to add interactivity:

- Using the AHA stack you can deliver a much more interactive application. Traditional “Web 1.0” apps are quite clunky to use with their full page reloads, feel old. Every request replaces the screen. Flickers when navigating. You lose the scroll position. Doesn’t seem modern.
- Client-side interactivity is declarative thanks to Alpine.js. You’ll need to write some client-side JavaScript, but not a lot of it, as most needs and client-side patterns will be solved easily with Alpine.
- When some client-server interaction happens, you render HTML partials directly in the page, without navigating away if not needed, as opposed to rendering a whole new HTML page and doing full page refreshes. This feels way more interactive and gives life to a page in a way that’s impossible with the old-style server-rendered HTML approach.
