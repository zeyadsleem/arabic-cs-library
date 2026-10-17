---
title: "Caching"
lang: en
chapter: router
slug: caching
order: 29
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=11218s"
---

> **Code repository for this lesson**
>
> Branch: [`caching-1`](https://github.com/alialaa/tanstack-router-course/tree/caching-1)


[00:01] As we've mentioned in TanStack router we have built-in caching and this caching can be enough for uh as mentioned here small to medium-sized application.

[00:11] However, you can also integrate something like tanstag query for a more advanced caching solution if you need that. So if you are working on a project, make sure to take a look at uh maybe this page. Uh here we have the

[00:24] pros and cons listed for the caching that comes with TanStack router by default. And so by reading this, you can probably decide if you can use this caching or you need to use something like TanStack query with TanStack

[00:36] router. However, what we're going to do is we're going to discuss the built-in cache uh in 10stack router. We're not going to use TanStack query for this video. So let's take a look at this default caching. Let's go back to our

[00:48] application and uh let's maybe uh let's actually keep here in this post route and let's say uh the post is going to take some time to load for example. So we can go to our post post id route and we can make this a little bit slower by

[01:04] maybe in our loader function in here.

[01:06] Let's add some artificial delay in here like so. So now let's maybe give it a refresh. If we visit um any post, it is going to take some time to load.

[01:20] However, after loading, it is going to be cached. So, if we go back and visit the same post again, as you can see, it did not take any time to load. So, in 10 stack router, we have this uh still while revalidate caching by default,

[01:34] which means if we have something in the cache, we're going to serve it and then refresh our data in the background. So if we take a look at our network here, let's clear uh let's go back and clear our network.

[01:47] If we visit this post again, as you can see, we got something instantly.

[01:52] However, the load function still ran and after 3 seconds, we got our requests here. So even though we got something from the cache, we still refresh our data every time. And this is referred to as still while revalidate or SWR. But

[02:06] this cache, however, only lives in memory. uh once we refresh our page it is going to be gone. So let's go back for example refresh and if we click on the same post again now it's going to load again nothing is

[02:20] going to be served from the cache because the cache is gone since we have refreshed our page and of course we have some options to play around with the caching settings how long should it live and so on. So in order to demonstrate

[02:33] these options, let's have a quick example here by creating a route that displays a random word. So in here I'm going to create a new route. So uh let's say in our routes create a new file. I'm going to call it random dashword also

[02:51] and tsx of course. And I'm not going to write this from scratch. I'm just going to put some stuff here.

[02:59] It is pretty basic. We have a route that has a loader function. In this loader function, I make it a little bit slow by adding a delay of 1 second here, just of course to demonstrate caching. And then I found this API that generates a random

[03:13] word. I'm using this to return this random word from our loader function.

[03:17] And then I'm accessing this random word uh using loader data to display it in this route component.

[03:25] So by saving this if we go to / random route or random word we should find uh so sorry the API that I was using was not responding when I was recording. So uh I just replaced it with another one. If this is also not

[03:41] working with you, you are going to find others as well. But anyways uh now if we have this we're going to find a random word here and every time refresh it should be a new one. So now what I'm going to do, I'm going to go to my menu.

[03:57] This one uh that contains home and about. I'm going to put a link to our random word um route. So in here, I'm going to go to my root route and I'm going to add this link after about here to take us to the random word route like

[04:12] so. Now if we let's say go to the about route and then go back to random word we should be served the cached word and then a new word is going to be fetched in the background. So if we click now we're getting this. If we go back to

[04:26] about and then go to random word we're going to get the same word uh and then a new word is going to be fetched in the background and that's why I added this delay in order to see that we're going to get the cached word initially. So now

[04:39] we have a simple example in order to see the options that we can change in caching. However, before doing that, I also need to add one more thing. I need to add a search parameter here that we depend on in order to display our word.

[04:51] So let's say we're going to have a lang search parameter in order to change the language of the word. And this is going to be important because we need if we have a different language here to have a different cache for each language so

[05:02] that we don't get um a wrong language from our cache when we get uh when we get served a cacheed word here. So remember we have discussed that before that when we depend on something in our search parameter we do it in a specific

[05:16] way. But let's first uh I'm going to do it quickly add my search parameter.

[05:21] Remember how to do that? We create a schema using Zod. So let's actually import dot like so and my schema uh my lang my my um search parameter is going to be called lang and it's going to be one of these English,

[05:35] Spanish, French and Chinese. I'm also going to add this lang type which is going to infer the type script type of this lang parameter from the from the zot schema using z.infer uh and therefore we're going to get this

[05:49] English uh Spanish French Chinese or undefined. We're going to use this later. And then remember uh we just add here a validate search option and we use Zod validator and pass it our schema which is this like so.

[06:09] But now in our loader function we need to use this search parameter and add here in addition to this words parameter add a language parameter as well uh which is going to be a variable. So let's uh change this to a template and

[06:24] pass a variable here. However, remember we don't have access to search parameters in here and we've mentioned that this is for caching reasons. If we would like to have dependencies from our search parameters, we do it this way. So

[06:39] we add loader dependencies here and in loader dependencies we can pause a function and in this function uh we can return an object. In this function, we're going to have access to our search parameters and we can return

[06:54] the lang that we can access from our search parameters lang like so.

[07:00] We do this in order for TanStack router to be aware of what we depend on on the search parameter. So it can create a separate cache for each search parameter separately and they are not going to be mixed up. So now in our loader function

[07:14] we are going to have access to this depend uh dependencies and we can just simply pass it here in this language. Uh I think I have an equals missing here.

[07:25] So language and then equals dependencies dot lang if it does not exist because I'm making it uh making it optional here. If it does not exist, let's fall back to English. So, sorry, fall back to English like so.

[07:42] So, now uh if we don't pass anything here, we're going to get an English word. If we however pass a lang of let's say French, we should get uh something in French.

[08:00] If we pass Chinese for example, we should get something in Chinese. And now if we let's say have a language switcher in this page, which I'm going to do quickly here. Uh maybe before displaying our word, I'm going to add this div. Uh

[08:16] let's import link. And we've seen something like this before. So no uh no need to type it from scratch. We're just looping through our languages. And here I'm using the lang type that I defined here. And I'm just uh displaying a link

[08:29] that goes to the same route. So here we have a dot into and we're just updating the uh search parameter which is lang to the lang in our loop currently which is going to be one of these. So by saving this we're going to have this language

[08:43] switcher. And now that we have um the lang search parameter as a dependency, if we switch between these, we're not going to get any um or we are going to get a separate cache for each one of these routes depending on the

[09:02] length that we pass here. So let's say uh let's maybe go to English and we're getting this word. If we go to Spanish, we're going to get a different word. If we go back to English, we're going to get the cast word that was cast in

[09:16] English and then we're going to get a new one in the background. And same if we go now to Spanish, we're going to get the old word that we got before and then a new one is going to be fetched in the background. And so our cache is going to

[09:29] take into consideration this lang parameter and it's going to create separate caches depending on this language parameter.
