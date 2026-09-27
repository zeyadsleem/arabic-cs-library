---
title: "كيف وصلنا إلى هنا"
lang: en
---

For years and years we’ve been building Web Applications using good old server-rendered HTML. Using the Web Platform as it was intended. Links to navigate to other pages, forms to send data to the server, server processes data and returns a new page with updated data.

The Web, originally meant as a way to read things and click links to read other things, found itself in this sweet position where people wanted to use it for more.

People needed to build for more complex user interfaces.

So people created more technologies to make this possible.

One of the technologies that gained traction was AJAX. Introduced by Microsoft with IE, it made possible to build apps like Gmail and Google Maps, which now we think they’re normal but were ground-breaking at the time they were introduced.

AJAX meant we could send a request to a URL, using JavaScript, and get some data back. Using JavaScript, we could add this new data to the page. Awesome. It was a bit complex initially, but libraries like jQuery introduced nice APIs like `$.ajax()` or `$.post()` to work with this approach. Now I’m getting nostalgic.

But at some point JavaScript became so powerful, and computers got so fast, that another idea started to emerge: what if we create a JavaScript application that runs inside the browser, whose job is to render HTML that the browser displays to the user?

That’s how we ended up with stuff like React.

React wasn’t the first (among the first we can remember Backbone, Ember, Knockout..) but it ended up being the most successful.

So to recap, Web Applications went from a Client-Server architecture where the client was “dumb” and was only responsible for displaying the HTML sent by the server, to becoming “smart” and running entire applications within a window.

You still need a Web Server, who is responsible for sending data, typically in the JSON format, which is a JavaScript-like serialized data format that got hugely popular, and handling actions and data mutations, interfacing with a database for example.

Most of the websites you use are applications.

And some of those applications are very complex. For example I think about Figma, things like Photopea, Google Maps which we already mentioned, even video editors like Descript are entirely browser-based.

Those applications wouldn’t be possible without a TON of JavaScript running in the client. It’s just incredible what we can do.

But most apps I build, and you build, are not on this level.

You might have a login workflow, some forms, people enter data, visualize data, etc etc, but they’re not inherently complex.

They’re just CRUD apps.

And the modern SPA approach is overkill for them.
