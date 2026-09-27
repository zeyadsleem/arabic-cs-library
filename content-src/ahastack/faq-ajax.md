---
title: "أليس هذا مجرد AJAX؟"
lang: en
---

I’ve seen this kind of thing on Twitter referring to htmx:

![](/images/ahastack/faq-ajax-0-faq-ajax-1.CkPYS-s7_Z72IOa.webp)

![](/images/ahastack/faq-ajax-1-faq-ajax-2.NmTQt93N_20cLMO.webp)

![](/images/ahastack/faq-ajax-2-faq-ajax-3.CM2xLC79_9Q9Kj.webp)

I would encourage looking at it with a fresh mind, and trying it first, instead of saying “it’s just AJAX”.

If by AJAX we mean “communication between client and server outside of a full-page request”, then yes htmx is AJAX. Just like when you use fetch() in client-side JS or Axios or react-query or any data fetching library.

Other than that, there’s nothing that resembles old-school AJAX.

With old-school AJAX, there was TON of JavaScript involved.

Try reading one of those 2006-2007 books about AJAX and you’ll see.

Between starting requests, and processing the response, it was a lot.

htmx is a declarative approach at data fetching and in general client-server HTTP communication, and also, it’s a declarative approach at defining what happens *after* the response.

It’s an HTML extension, really.

It offers an incredible layer of abstraction and it can do a lot of work for us.

And this makes a world of difference.

Like using `p { color: red }` in CSS, or using the [CSS Paint API](https://developer.chrome.com/blog/paintapi/) to achieve the same effect.

Even ChatGPT doesn’t recommend this:

![](/images/ahastack/faq-ajax-3-houdini.m5fFPpKF_Z1zXm0n.webp)
