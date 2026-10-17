---
title: "Code Splitting"
lang: en
chapter: router
slug: code-splitting
order: 27
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=10307s"
---

> **Code repository for this lesson**
>
> Branch: [`code-splitting`](https://github.com/alialaa/tanstack-router-course/tree/code-splitting)


[00:01] about code splitting and pre-loading in Danstack router. And let's start with code splitting in TanStack router. So code splitting as you may know is a technique for improving the bundle size and load performance of your

[00:13] application. So with code splitting we can reduce the amount of code uh that we need to load initially when we first load our application so that our application can load faster and then later when we request certain routes in

[00:26] our application we can load more chunks of code on demand. So stack router separates code into two categories.

[00:34] critical route configuration and non-critical route configuration. So critical route configuration is the code that is required to render the current route and kick off the data loading process as early as possible. So for

[00:47] example, when we define a route, we have our route definition, we have our search parameters validation, we have our loader function context and so on. All of these things are critical. So they should exist in the main bundle of our

[01:00] application and code splitting should not be applied to them. However, we have also non-critical route configuration.

[01:08] For example, the route component itself that we define in order to render our route, the error component, the pending component, not found component and so on. The code for these is nonritical to match the route and therefore we can

[01:21] load it on demand. We can code split it.

[01:23] So we don't have to include all of these components for all of our routes in our main bundle. So of course you can read more about code splitting here. However, let's maybe see it in action uh by going in here. And what I need to do is

[01:38] remember in our about route uh so in here about we had this example where we uh did a redirection to posts we were just testing this navigate component but uh let's remove this for now since we are going to use the about route in our

[01:53] example. So now we can normally go to about and now let's go back to home and let's maybe refresh and let's open our uh network tab. So let's open our network tab here. And while we have it opened, let's navigate to about. As you

[02:09] can see, when we navigated uh to about, nothing happened in our network. Nothing was loaded because currently we are not enabling code splitting. So all the code for this about route including the route component. Uh if we have a not found

[02:24] component and so on, all of that is going to be included in the main bundle.

[02:28] However, we can enable code splitting in order to make our main bundle a little bit slower or sorry, a little bit smaller and split the code for our routes into smaller chunks. And to do that, we can go into our vit config. So,

[02:42] vit config and in here in 10 stack router we can enable code splitting by adding here uh auto code splitting and set it to true.

[02:53] By doing this uh we might need to restart the server or actually it uh looks like it automatically restarted.

[03:01] Now let's try to go back to home refresh and let's clear our network tab and let's now navigate to about and as you can see we have some stuff going on here. We have the component for about loaded on demand when we navigate to

[03:16] about. So as you can see here we have the component for about. If we take a closer look here, we're going to find uh maybe the route component here. And maybe if we search for uh the about text that we have, we might actually find it

[03:31] here as well. So remember we had uh in here an H3 tag with about text. Here we here we have it an H3 tag and we have our about text and our classes and so on. So it looks like the code for this

[03:47] component was loaded on demand since we are now doing the automatic code splitting. Let's also try it with another route and uh this is the post route. So remember in our single post route which is posts uh post ID we had

[04:02] some more stuff. So remember we had the pending component as well and we also have the error component and not found component. All of these are going to be uh code split as well. So if we go to slashposts and try to visit posts

[04:16] uh try to visit some single posts. So let's clear our network and in our list of posts let's visit post one. No as you can see in addition to the network request that fetches the post and the comments we also have requests to fetch

[04:34] the post component. And these are the other components as well. the uh error component, not found component and so on. Now, if we let's maybe clear this and let's go back and let's go to another post. So, let's go here to post

[04:50] two, for example. Now, as you can see, we only get the network requests for the uh post itself and the comments and and we did not get the requests for the components. Why? Because these are the same components that we used when we

[05:05] loaded post one. Remember post one and post two are both are both using the same route and the same components. So we don't need to load them every time we visit a different post.

[05:17] All right. So that's mainly it. However, you can do further customizations if you would like. So in here as you can see uh in this uh documentation page here we can customize how auto code splitting works by specifying what exactly uh to

[05:37] code split. So in here uh we have these things that we can code split the uh main component for the route the error component pending component not found component all of these are going to be code split by default. We can also code

[05:50] split uh the loader as well the loader function. However, this is not actually recommended. And if we go down here, uh we're going to see examples on uh customizing the behavior which we can do globally by going into our V config and

[06:05] changing the default behavior here or we can also have programmatic control by passing a function instead. And so we can do it differently maybe for different routes. So we can pass a function here split behavior where we're

[06:16] going to get the route ID and maybe based on the route we need to split uh certain things for this route. However, I guess most of the time maybe the default behavior would be enough. But what you can also do if you would like

[06:29] uh you can also find this link here where you can control exactly what to code split if you are not using auto code splitting. So if you for some reason are not able to use the automatic uh code splitting feature in your V

[06:45] configuration, you can still code split your route files by adding this lazy.tsx suffix.

[06:53] And you have examples here on how to do that. So for example, this is how we would normally uh define a route. But let's say we would like to code split the component the component for the route but not code split the loader.

[07:07] Then we're going to need to split our file uh split this file into two files.

[07:12] One for critical things like the loader in our example and one for non-critical things that can be codeplit like the component. So in this case we're going to have this posts.tsx file that is going to contain the loader and a

[07:25] posts.lazy.tsx tsx file uh where we're going to create lazy file route instead of create fire route and then pass the things that we need to code split like the component.

[07:37] So this is how you can do it manually if you are not enabling auto code splitting for some reason. However, by enabling auto code splitting all of that is going to happen for you behind the scenes uh for all of your routes. And now that we
