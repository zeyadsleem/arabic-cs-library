---
title: "Caching Options"
lang: en
chapter: router
slug: caching-options
order: 30
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=11794s"
---

> **Code repository for this lesson**
>
> Branch: [`caching-2`](https://github.com/alialaa/tanstack-router-course/tree/caching-2)


[00:00] But now that we have this example, let's now see what options we can change. uh in this default caching behavior that we get with tensac router. So we're going to try these options in this route. But any option that we're going to do here

[00:15] can be uh set globally as well when we define our router in our main.tsx file.

[00:22] So let's open our network tab here.

[00:23] We're going to need this a lot. And first of all, let's try something that we I think we've mentioned in the previous section which is preloading and caching. So as we know now when we hover over a route

[00:38] the uh data for this route is going to be fetched as you can see but when we hover again this is not going to happen again until some time has passed and by default this time is 30 seconds and we can change this by adding in here an

[00:55] option which is uh preload stale time.

[00:58] So preload stale time and let's set it uh for example to 5 seconds so that we can try and also let's uh maybe move this delay after our request so that we can just uh see our request in the network tab immediately without having

[01:14] to wait. And now let's try again. So let's maybe give it a refresh. Let's clear everything and let's hover over our random word route. We're going to get our stuff here. If we wait for 5 seconds over again, we should get our

[01:31] request again here. And uh if we wait for another 5 seconds, we should get it again. I think actually sorry, sorry for that. The delay that we're getting when we hover is from the option that I guess we set here. This one default preload

[01:46] delay. So let's remove this one.

[01:50] So now if we hover, we're going to get it.

[01:54] hover uh before 5 seconds is passed we shouldn't get it after 5 seconds we should get it and so on you get the idea so this is something that you can control another option that we can control is stale time so this is preload

[02:10] stale time which is for our pre-loaded data but we also have stale time uh which means the number of milliseconds that routes data should be considered fresh when attempting to load so for example let's go to our random word uh

[02:23] route here and we have a word here in English. If we go to Spanish, we are going to get something. When we go back to English, we should get the previous word which was already cached and then in the background a new one is going to

[02:37] be generated. Right? So by default, stale time is going to be zero which means the routes data is always going to be considered stale and is always going to be reloaded in the background. So every time we visit this route or we

[02:53] switch to any language, we're going to get a cast word first and then we're going to get a new word in the background because the cache data is always going to be considered stale.

[03:03] Right? So just to be clear on this uh because I feel like I have confused you uh let's go to the about route. Go to random word. As you can see we get a random word, right? Go back to about go back to random word. we're going to get

[03:17] the same word and then it's going to be loaded in the background because uh the currently cached word is going to be considered stale. But let's say and this is because stale time by default is zero. But let's say we need the cache

[03:30] word uh to not be considered stale so that we won't run another request in the background for a certain amount of time.

[03:37] We can control that with stale time.

[03:39] Let's set it maybe to let's say 30 seconds. Now, in this case, let's give that another try. Let's maybe go to about, go to random word.

[03:51] We're we're going to get a cast word. As you can see, let's try it again here. We're going to get this cast word. And it's not going to refresh in the background since we have a larger steel time. Now, when 30

[04:03] seconds pass, now this uh word is going to be marked as still. and it's going to be refreshed in the background when it is served from the cache. So I hope this is clear. Another option that we have is GC time or garbage collection time and

[04:19] we can set this to also a number of milliseconds and this means the amount of time that the routes data should be kept in the cache before being garbage collected. By default, it is 30 minutes, which means if any cache route data has

[04:32] not been accessed within 30 minutes, it is going to be completely removed from the cache. And you can control this as well. By default, it is 30 seconds.

[04:42] Another thing I would like to mention is calling router.invalidate. So remember in this login uh login button for example which is uh I guess it was in our root when we login uh this is coming from our context which

[04:57] we pass I guess also in main.tsx in here remember we call router.invalidate calling router.invalidate invalidate is going to force all active route to rerun their loader functions immediately and

[05:11] mark every cached route as stale. So if we click on login now as you can see we got a new word here because calling route router invalidate is going to force any active load function to rerun and any cache to be marked as st. The

[05:28] final thing I would like to mention about these caching options is in your route, you can also have this uh should reload function that you can pause here in order to control when exactly to rerun your load function. So this offers

[05:44] more control beyond uh just specifying the stale time here by in this function returning true or false based on something and if you return true the load function is going to rerun and in here you are going to receive the same

[05:57] things that you receive uh in the before load function which we've seen before.

[06:02] So in here you are going to get your context, you're going to get your parameters, you're going to get your dependencies and so on. You're also going to get information about your route. Pretty much everything that you

[06:14] are going to need in order to maybe based on something here decide when exactly to rerun your loader function.

[06:23] But this is mainly what I wanted to mention regarding to these caching options. And of course, if you'd like to read more about caching, you're going to find uh sections in the documentation related to caching that you can take a

[06:35] look at. Let's now see how we would
