---
title: "Loading Data in the Background"
lang: en
chapter: router
slug: loading-data-in-the-background
order: 23
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=9022s"
---

> **Code repository for this lesson**
>
> Branch: [`loaders-5`](https://github.com/alialaa/tanstack-router-course/tree/loaders-5)


[00:01] What we can also do to make our route uh load faster is that we can instead of waiting for all of our data to be loaded before rendering our route, we can just wait for important data to be loaded then render our route and wait for maybe

[00:16] non-critical data to load in the background and then display it later after rendering our route.

[00:22] So let's have an example by maybe uh in our posts functions here. Let's get this back uh this time out here so that our comments are going to maybe take some more time to load than our main post uh that we're loading with get post here.

[00:38] So if we refresh now, we're going to we're going to get some loading time here.

[00:43] But what we need to do is we need when we uh visit this route to render the route immediately after our post is loaded even if the comments are not loaded yet. And then when the comments are loaded we need to display them

[00:57] later. So in this case we don't have to wait for the comments in order to render our route and we can do that by simply uh sorry in here in the post id route we can simply let's remove promise old now and we're going to do it in a

[01:11] different way. So let's get this back to where we load our posts like so. So await and then let's copy this and let's remove this. And what we can do is we can load our comments. So let's define

[01:29] comments and instead of awaiting our comments, we can just pass this as a promise. So let's maybe call it comments promise instead so that this is clear and pass it here as comments promise. So in this case, we're going to start

[01:46] loading our comments. However, we're not going to wait for it before rendering our route. We're only going to wait for posts uh for sorry the post since we are awaiting here. And once this is done we're going to render our post while

[02:00] this is loading in the background.

[02:03] And when this is done we're going to display it somehow. Uh we're going to see now of course. So now if we save this and go back to our post component now we're going to have an error because this is a promise and not our data. So

[02:15] we need to get the comments promise from here. And of course now we cannot loop through this because uh this is a promise and not our data. We need to await this promise somehow in our markup before uh displaying this ul which

[02:29] displays our comments. We can do that by using a component provided by tens router. But let's first uh mention something. So in here notice uh sorry not in here in our route. Notice that I in here I put this comments request

[02:44] first and then I put the uh request that we're awaiting here. If we do it the other way around. If we await this first and then uh fetch our comments, it is going to also work. We're going to wait for the post to be loaded and then

[02:59] render our route and this is going to be loaded in the background. However, we're not going to start to load the comments in the background until the post is loaded. And this is unnecessary by putting this after the comments. We're

[03:10] going to start loading the comments in the background and then uh start fetching the data for the post. And when this is done, we're going to render the post. So, we're just saving some time by starting this a little bit earlier. All

[03:24] right. But now, let's go back to our post component. And we have a component provided by TanStack router called await.

[03:34] So in here let's put a component called await that we can import from TanStack React Router.

[03:41] And in here we can pass a promise that we need to await. So in our case the comments promise can also pass a fallback that is going to display until our promise resolves.

[03:53] So you can put also a skeleton uh things like that. I'm just going to put maybe a div. Sorry. Let's put a div here with some loading text. And now when our promise is resolved, we're going to get our resolved data here in a function

[04:10] that we can pass in our children. So in here we can pass function that is going to contain our comments like so. And by having our comments, we can just return our ul. So in here we're going to have our comments. Now we can just copy this

[04:25] URL from here. Cut it from here and put it inside of here like so.

[04:32] So now let's maybe try to refresh.

[04:36] As you can see, we get our post immediately and then the comments are being loaded in the background.

[04:44] So this is of course maybe a much better user experience.
