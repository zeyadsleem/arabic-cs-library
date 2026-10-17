---
title: "Lazy Loading Form Components"
lang: en
chapter: form
slug: lazy-loading-form-components
order: 18
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7482s"
---

> **Code repository for this lesson**
>
> Branch: [`lazy-loading`](https://github.com/alialaa/tanstack-form-course/tree/lazy-loading)


[00:01] done so far is great. However, in some cases, you might have a lot of form and field components that you define here uh in form.tsx. And in this case, if you import your components like so, they are going to be included in your bundle in

[00:16] your JavaScript bundle even if you are not using all of them in all of your forms.

[00:22] So, what we can do is we can lazily import these components so that they will not be included in our JavaScript bundle. However, they're only going to be loaded when they are actually needed in a specific form that we are trying to

[00:35] view. So, this can be simply done by instead of importing like so, we can just import lazy from React. So, import lazy from React and then we can simply lazily import our components like so.

[00:50] So, the same thing text input select checkbox submit button. However, we import using lazy and we compose them the same way. And when we do so, we'll just have to wrap our form component with suspense. So remember uh in our

[01:06] app.tsx, this is where we are displaying our register form. Since in here we have things that are lazily loaded, we need to wrap it in suspense so that we can have a loading fallback while our components are loaded. Uh so we can

[01:19] import suspense. Sorry, suspense from React. Wrap our form with it. And then we can provide uh a fullback. You can do anything. I'm just going to for now put a B tag with loading like so.

[01:36] Now, if we refresh, you might find this maybe less than a second of loading until our components are loaded and then our form is displayed. We've managed to
