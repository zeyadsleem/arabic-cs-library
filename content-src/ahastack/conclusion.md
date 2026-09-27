---
title: "الخلاصة"
lang: en
---

So, in addition to the Web Server we have 2 tools:

- **htmx**, to make it easy to create client-server communication and “react” after a response is received
- **Alpine.js**, to add client-side interactivity to each page

Those are rather recent tools (the first public release of Alpine.js is dated Nov 2019 and htmx 0.0.1 is May 2020), but I’ve seen them mentioned a lot in the past few years.

htmx has almost 50k stars on GitHub and Alpine.js more than 30k (at the time of writing), which means they’re popular enough. And they’re well maintained and developed.

Both can be included easily with a script tag in the HTML, and have no dependencies whatsoever.

This heavily simplifies your app builds, and both being authored in plain JavaScript make sure nothing can break in the future (because JavaScript never introduces breaking changes in its releases, just like HTML and CSS).

It’s back to basics.

Those technologies are great, but they are not set in stone. You can change them per your preference and switch to different ones in the future. They’re just tools.

Not fundamentals.

![](/images/ahastack/conclusion-0-post-react-3.CyHm2io7_1nuwyj.webp)

You could pick a complex SPA framework that reinvents everything and forces you to learn patterns and concepts that are completely made-up.

Or, you can use the Web platform as it was intended.

Adding some thin layers on top of it, to add those last bits we need in order to match the user experience that people expect us to be able to deliver.

The end goal is to make our life easier, simpler, because using this stack you can learn the few concepts htmx and Alpine require in an afternoon, and then *that’s it*.

The mental model is super simple, much closer to the Web first principles, and it lets you focus on the actual application you’re building, rather than learning yet another overcomplicated framework that introduces its own set of principles and ideas.

Did this introduction inspire you?

Did it unlock the idea of building a test application with this stack in the future, to see how it looks like?

I hope so.

![](/images/ahastack/conclusion-1-post-react.D1NY5GlO_wTJtr.webp)

![](/images/ahastack/conclusion-2-post-react-2.DFbBU3qi_Z1qpWD3.webp)
