---
title: "نظرة عامة على الحزمة"
lang: en
---

## Who is it for?

[Section titled “Who is it for?”](#who-is-it-for)

Perfect for frontend developers that know React / JSX and want a similar DX, but also want much more simplicity in their life by generating HTML on the server and writing as little client-side JavaScript as possible.

## What is it?

[Section titled “What is it?”](#what-is-it)

The AHA Stack is built upon the fundamental technologies of the Web:

- HTTP
- HTML
- CSS
- JavaScript
- Web Servers
- Web Browsers
- The DOM
- Browser events
- Forms and FormData
- XHR, fetch(), Request, Response
- Cookies

Those are the founding technologies that power the Web. Together, they form the **Web Platform**. Those are our north stars. Industry standards. Set in stone.

They’re never going to change, they’re rock solid, they just work, they never get a “version 2.0” that breaks compatibility, because that just doesn’t happen.

They provide:

- a language used to create user interfaces declaratively (HTML)
- a language used to style user interfaces declaratively (CSS)
- a way for clients to request data from a server (HTTP)
- a way to send data from a client to a server (XHR / fetch)

But that’s not enough to build modern Web Applications. We need *something more*. Something on top of those primitives, to make our life easier, and help build applications.

That’s where The AHA Stack comes into play, providing a few things that can greatly enhance the Web Development experience, and the kind of applications we can build.

We should use the platform as much as possible, without reinventing anything, in order to take advantage of all the technology that the Web provides us.

But unless we decide to write a ton of JavaScript to add interactivity to our websites, that’s not enough for our modern user experience standards. We can’t expect full page loads on every action, that’s what you end up with otherwise.

So here’s the idea.

We introduce a library that makes it easier to manage HTTP connections to our servers. When the user does something specific that needs to trigger an action on the server it creates the request, get some HTML back, and inject this HTML directly into a portion of the page.

We use this library to handle interactions once the page is loaded. So for example the user clicks a link, and we load some data from the server, which returns the data as HTML, and we add it to the page dynamically. Sending HTML over the wire.

And we do this in a way that’s declarative, not imperatively writing JavaScript to tell the page what to do, instead, we go up a level of abstraction, and declare what we want it to do.

The library should allow us to send any HTTP method to the server, be it POST, GET, DELETE, PUT or PATCH.

Then, we need a way to serve HTML pages over HTTP. A Web Server, basically. Nothing new here. We use the Web Server to build a Multi Page Application (instead of Single Page Application). A Web Server that can handle server-side rendering and communicate with a database to fetch (and store) data. The only thing this tool needs is the ability to handle HTTP responses, communicate with a database if needed, and reply with full HTML pages, or HTML partials.

We have routes, each route serves the HTML of a page, generated server-side.

There is no JavaScript framework that decides what appears on the page.

The Web server does it all. Old-school.

With a “pure” Single Page Application, we’d have a page with no HTML body being shipped to the browser, with some JavaScript linked to it. The JavaScript is downloaded, runs when it’s ready, then fetches some data from the server in form of JSON, and finally the page is built by the application, using the DOM API.

Meta-frameworks and routing libraries usually help with generating a page dynamically on the server, so you ship an initial HTML to the client, and only subsequent navigations are handled client-side. What happens in this case is that clicking a link triggers a request to the server to get the new page back, typically as a JavaScript file if the meta-framework separates each page in different JavaScript files, or we get the data we need as JSON, and the client-side application processes it, and uses this data to generate the UI using the DOM API.

In both cases you have JavaScript doing way more than it should.

What The AHA Stack does is, it relies a lot more on the server. We load the initial page requested from the server. We click a link? We load a new page from the server. There is no “big client-side JavaScript app that decides how the page should look like”.

That’s how the Web is (was?) supposed to work. No need to fight the framework to do basic Web stuff. It just works.

When more app-like functionality is needed, we add so-called “JavaScript sprinkles of interactivity”. You do this using JavaScript of course, for the reason it was created in the first place. You can do this with simple, “vanilla” JavaScript, or using a library that helps you manage that.

In the end, we add 2 tools on top of the Web Platform, to:

1. Make it easy to create client-server interoperation
2. Add client-side interactivity to each page

Those will make it easy for us to ditch the “virtual DOM”-style SPA frameworks complexity, and build better and more maintainable apps, faster.

I propose the “AHA” toolset: **Astro**, **htmx**, **Alpine.js**.
