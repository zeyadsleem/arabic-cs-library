---
title: "Error Handling"
lang: en
chapter: router
slug: error-handling
order: 24
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=9310s"
---

> **Code repository for this lesson**
>
> Branch: [`error-handling-1`](https://github.com/alialaa/tanstack-router-course/tree/error-handling-1)


[00:01] Let's talk a bit about how we can handle errors in our tens router application.

[00:07] So let's say for example we're trying to access a post that does not exist. So I'm going to go to uh /ost slash some ID that does not exist. Maybe you can put uh some numbers or some letters here.

[00:20] And as you can see uh we're going to get an error fail to fetch post which is the error that we are throwing here uh in our data posts file in our get post function. In here we are throwing this error and this is what we are getting

[00:34] here because in this case the API is going to return an error. What we can do is we can of course customize this error page and make it look like uh it belongs to our application a little bit more.

[00:46] And we also have a call back that is going to run in case any error happened in our route. And in this callback we can maybe uh report the error to some error reporting service for example. So let's go to this route. Of course, what

[00:58] we're going to do can be done in any route, but let's try in our posts/ id route.

[01:04] In here, we can have this code back on error that is going to run whenever an error happens. And we're going to receive the error here.

[01:13] And in here, we can maybe do something like reporting the error as we've mentioned. For now, let's just maybe console log it. And uh let's make sure this is working. Oh, sorry.

[01:25] Let's make sure this is working by taking a look at our console here and we should get the message that we are logging here error loading post and then we get our error and to customize the error component similar to pending

[01:39] component we also have error component as well. So in here we can pass error component but in here we're going to have access to a couple of things. So in this error component

[01:52] we have access of course to the error itself and we also have access to a reset function. In the error we're going to have the error itself of course the error message and so on. And this reset function we can call it in order to

[02:04] retry and rerender our route. So let's say in here we can return a component.

[02:11] Let's return a div. And maybe let's display the error message like so.

[02:18] And maybe after the error message, let's maybe save this and refresh. We should now get this message. And we can have a button here and call this reset function in order in order to uh retry and uh rerender the route. So let's add a

[02:33] button here. Let's say maybe retry.

[02:37] And then on click we can uh just call our reset function like so.

[02:46] So now we should have this button and this button is going to try and rerender the um route component this component here. However, it is not going to retry to load the data. So this loader function is not going to run again. And

[03:03] actually the error in our case is coming from this loader function. It's coming from uh when we fetch the post. So maybe in some situations we would like when we retry uh to reload the route to try to refetch the data as well. So if we open

[03:17] our network here and click on on retry as you can see no requests are being recent.

[03:24] So in order to retry and uh fetch the data in addition to rerendering the route we can use router.invalidate instead. Remember we've used router.invalidate before to uh recomputee our um context. We can use it

[03:39] also for this purpose. So let's define a router here. And to access our router, we can use the use router hook. And of course use router is imported from uh 10 stack router. And now instead of reset, we can maybe call router invalidate.

[03:57] And now if you save this, let's also refresh. Let's clear our network here.

[04:04] And let's click on retry. And uh as you can see now when we retry the requests are going to be uh resent.

[04:13] Of course we are still going to get the error since we are passing a wrong ID here. But now let's say we don't have this uh network or API error. So let's go to a post that actually exists.

[04:25] Now we don't have an error. Everything is working fine. Let's say we had another error that did not happen in our loader function when we load our data.

[04:33] However, it happened when we render the component itself. So in here in our post component, let's say we maybe try to access something that does not exist. Of course, it this is going to be called by TypeScript. But let's say you

[04:45] accidentally have this error and now our um our error component is going to show up with our error. However, if you notice in the uh in the console, we do not get the on error uh call back here. This did not run when

[05:02] we had an error in our component when rendering our component. This will run if you had errors while uh loading your data. However, if you had errors in your component while rendering your component, we're going to get these in

[05:14] on catch. So, we can have on catch here and in on catch, we can uh also report this error. So, we're going to get the error. Let's console log uh the error as well. Let's maybe say here on catch and if we save this and uh sorry

[05:36] and refresh now we should have this on catch running and in here we can maybe report the error also.

[05:45] So what happens behind the scenes is when you render um your component your route component tstack router is going to automatically wrap it with a component which is catch boundary and this component

[05:58] is going to catch any errors that happens in its children. And if an error happens in the children this component is going to catch it and when this happens you have this uh on catch call back here that you can pause in order to

[06:12] see the error log it and so on. But we don't have to do that manually. This is done uh by stack router. And we can access this on catch function here. When we define uh our route
