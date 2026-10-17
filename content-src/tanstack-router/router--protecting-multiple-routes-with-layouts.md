---
title: "Protecting Multiple Routes with Layouts"
lang: en
chapter: router
slug: protecting-multiple-routes-with-layouts
order: 32
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=12776s"
---

> **Code repository for this lesson**
>
> Branches: [`auth-2`](https://github.com/alialaa/tanstack-router-course/tree/auth-2) · [`auth-3`](https://github.com/alialaa/tanstack-router-course/tree/auth-3)


[00:01] in order to do that, in order to protect multiple routes with a layout, we need to add a parent to the routes that we need to protect. And this parent can either be a postless layout or just a normal parent route that can have a path

[00:15] as well. So, let's go back in here and let's say in our about route, I'm going to remove this protection that we have here.

[00:23] So, now about is not protected. And uh let's do this in the other way. So now I'm uh let's also in our main.tsx log out initially by changing this back to null like so.

[00:40] So now we should be logged out and uh we are able to access about since we have removed this protection.

[00:47] Now what we can do is let's do it maybe with a postless layout. have a passwordless layout that performs the authentication checks and then if we need to protect any route we just make it a child of this layout. So in here

[01:03] let's go in our routes folder and let's create this botless layout. Remember to do that we use underscore and let's call it maybe authenticated sorry authenticated tsx.

[01:21] And in here, we're not going to do anything. We're just simply going to render our outlet so that we can render our children. But in the markup, we're not going to do anything else. What we're going to do, however, is a before

[01:31] load function here to do our check. And actually, this is going to be exactly the same uh as we've done here. So remember, we just check our context and redirect to login with our search parameter. We can actually copy this

[01:44] from here.

[01:46] Uh and let's keep it removed from about so that we can draw it using the layout.

[01:51] So in here, let's just paste this import redirect.

[01:56] And uh I guess this should actually be it.

[02:00] Now by adding this as a parent to any route, this before load function is going to run first before any children renders. And if you're not logged in, we're going to redirect and none of the children are going to be loaded or

[02:12] rendered. And so we can protect our routes this way. Let's write in the about route by making about a child of this authenticated uh route. Let's actually copy the name from here. And let's in here rename about to

[02:31] uh underscore authenticated.about.

[02:34] And now it is uh it should be a children of this layout um a child of this layout.

[02:40] And uh as you can see if we try to access about it should now be protected. We are redirected to login with our redirect search parameter as well. Why don't we maybe try it with another route as well?

[02:56] So let's say uh random word. This one we can access it since uh it is not protected. Let's say we need it to be protected. Then we can just rename this and in here put our authenticated layout random word. And now it should be

[03:15] protected as you can see and we are redirected to login with a redirect parameter of random word.

[03:24] Another option that we have is maybe uh when you try to access a protected route instead of redirecting to login maybe you just need to show an error. So what we can do is let's maybe comment before load for now in our authenticated

[03:37] layout. So now nothing is going to be protected. We can access about normally.

[03:43] Uh let's go to /ab about and we should be able to access about and let's say we just need to display a message uh that we're not that we don't have access instead of redirecting to login. Now what we can do is in our parent

[03:58] component the authenticated layout instead of rendering the children we can render this message instead. And remember in here we have access to our context using the hook. So we can access from route uh dot use context.

[04:14] We can get our user from here and we can do our check here as well. So let's maybe add this condition here. If not user, we're going to return this div instead.

[04:25] So, as you can see, it works. Let's try it for random word as well. And it seems to be working. However, if we take a look at our network uh in here, let's maybe go to about and uh clear and then let's go to random word. As you can see,

[04:42] we are not we're seeing this message.

[04:44] However, the network request for the uh random word was sent.

[04:50] And this is not good. Of course, if we have a protected route, we need to avoid the loader function of this protected route from running. Even though uh even if we don't display any content, we need to avoid the loader function from

[05:03] running. So, we can either go to our uh our random word route and in our loader function, we have access to our context here. So, maybe before loading any data, we can check our context, make sure we are logged in.

[05:20] Or instead of having to do that for all protected route, we can maybe also instead of displaying our message like so, we can get our before load function back in our layout in our authenticated

[05:34] layout. However, what we're going to do here is instead of redirecting, so let's actually have our function get our context and uh let's add this check if you're not logged in. Instead of redirecting, we can just throw an error.

[05:49] So by throwing an error here, this is going to prevent any child load function from running. So let's throw a new error and let's say maybe o error or so. But now if we save this um and try to access random word for

[06:08] example, we're going to get the error like so. We're not going to get this because this component is not going to be even rendered. So what we need to do instead is pass an error component. And in the error component, you can check

[06:21] the error, check if it's an authentication error. You can display an authentication error because it can be another error as well. However, I'm just going to keep it simple and assume we have an authentication error and just

[06:34] display this message in our error component. So now if we try to refresh, we should get this.

[06:42] And now we can maybe remove this check from here.

[06:51] All right.

[06:51] And also to make sure let's go to about then go to random word. As you can see, nothing is sent in our network. Uh let's also finally try to click on login here.

[07:03] And this should reload our route and it should be working now. So that's mainly
