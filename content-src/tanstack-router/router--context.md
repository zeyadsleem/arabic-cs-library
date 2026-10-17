---
title: "Context"
lang: en
chapter: router
slug: context
order: 17
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=6731s"
---

> **Code repository for this lesson**
>
> Branch: [`context-1`](https://github.com/alialaa/tanstack-router-course/tree/context-1)


[00:02] idea of context. It is somehow similar to the react context that you are maybe familiar with but they are two different things and they can actually be used together. So in tstack router in any node in our route tree we can define

[00:17] some context. So let's say in our root route when we initialize our router we pass some context uh this can be just some data a state it can be a function anything and when we define it here in the root it is going to be available for

[00:31] all of our routes we can access it in any route component or in any load function and of course we are still going to take a look at load functions um in an upcoming section. So this can be useful for sharing data across

[00:43] multiple routes. We can also pass functions like maybe data fetching functions or we can maybe initialize clients uh in the root and then pass this client everywhere so that it can be used without having to import and export

[00:55] stuff. We can also maybe use it for authentication information where in the root we maybe have some uh authentication provider which provides us with information about the user if the user is logged in and so on and we

[01:07] need to have access to that everywhere so that maybe we can protect some routes then we can use this context. We can also use it for other things like maybe breadcrumbs uh SEO stuff, title tags, meta tags, uh descriptions and so on. We

[01:22] can also instead of defining the context in the root and have access to it everywhere, we can also somehow we are going to see of course define some context in a specific route. So let's say here for example

[01:34] when we do so this context is only going to be available to this route and any of its children.

[01:42] So we can also do that if we have some data uh that is maybe only used for a certain segment in our route tree. So that's the general idea. Let's have uh maybe a couple of simple examples and maybe if you would like maybe we can do

[01:55] uh another video to have some more uh realistic examples for using context.

[02:01] But let's now go in here and we need to have a couple of files opened. Let's open our main uh thetsx file and also let's open our root route which is undersc root in our routes folder and let's say we have maybe um some

[02:17] authentication system. Of course what we're going to do is not very realistic but let's just have a simple example where we have a user uh that we need to post to all of our routes and if that user exists it means we're logged in. If

[02:29] not it means we're not logged in. So in my root route I'm going to just uh define a simple type for our user. Let's say we are going to have an ID and a name. And then if we need to pass some context in our root route instead of

[02:44] calling create root route we call create root route with context which we can import of course from uh from tstack React Router. And now we can remove this one. And in order to have type safety when we use this context. So

[02:59] when we set the context or access the context we need to specify its type and we can do that by passing here a generic and we can pass the type of our context.

[03:09] So let's say in our case let's define an interface here. Let's maybe call it root route context.

[03:16] And let's say in our case we're just going to have a user that we need to pass as a context. And this can be of type user or it can be null as well if we are logged out. Now we can just pass this here in this generic. And also

[03:30] notice that create root route with context is used a little bit differently. So this is not a function that we call directly. However, it is a function that returns another function that we need to call. So we need to call

[03:42] this function first here and then whatever function returned by this we're going to call it in order to pass our component and so so need to add just a couple of brackets here. And now we're going to need to pass an initial

[03:57] context. So if we go here we're going to main.tsx we're going to find out that we are now having an error because we specified our router to have some root context. However, we're not passing any context when we create our router. So to

[04:10] do that we need to pass here context and pass some initial context. In our case we have user and it can be null or a user. Of course initially we can just set it to null and then we can populate it later as you are

[04:24] going to see now. But first before we can see how can we uh maybe manipulate this context uh update it update the user or remove the user maybe when he logs out and so on. Let's first see how can we use it in our components. So as

[04:38] we've mentioned now that we have this context in our root we can use it anywhere including in our root component or in any other child route. So let's try to use it in our root component in here. And this is by using a hook. So in

[04:53] here we can access a hook inside of our route. So in any route sorry in any route remember the route is this constant that we define here. And in router we're going to have access to use context or use uh route context.

[05:10] And in here we're going to have access to our user. So what I'm going to do is maybe after this uh root route text that we have here I'm going to put this markup where we check if we have a user we're are just displaying a text of

[05:24] welcome and then user name. Otherwise we just have a text of welcome guest. So let's save this and we should get welcome guest. If we uh in here when we initialize our router maybe add some user let's add some

[05:42] ID and some name uh like so we should get here welcome text.

[05:52] So this context is going to be available in our components as we've seen here and also in load functions which are functions uh that we are going to use in order to load data in our routes. And this is a topic that we're going to

[06:05] discuss next. But first, as we can see, uh, when we pass data to our context, we're just passing some static data here. However, what we need to do is instead of doing so, we need to make this a react state so that we can

[06:19] manipulate it from our application.

[06:22] Maybe if the user logs in, we need to populate it. If the user logs out, we need to remove it and so on. So, we don't just need to pass some static data. We need this to be some sort of React state. So let's see how can we do

[06:33] that now. So in order to pass some state
