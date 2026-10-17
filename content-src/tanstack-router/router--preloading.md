---
title: "Preloading"
lang: en
chapter: router
slug: preloading
order: 28
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=10777s"
---

> **Code repository for this lesson**
>
> Branch: [`preloading`](https://github.com/alialaa/tanstack-router-course/tree/preloading)


[00:01] know about code splitting let's also talk about preloading. And this is something that you might also be familiar with in other uh frameworks if you have worked with Next.js for example.

[00:12] This is where the router is going to load the code and the data for the route before the user actually navigates to it. So that when the user actually navigates they are going to load as fast as possible. So if we have maybe some

[00:26] links like here in our menu and we expect the user to visit one of these links before the user even clicks on the link the router is going to preload the data and the code for this route so that when he actually clicks when the user

[00:40] actually clicks it's going to almost be instant and this happens by few ways.

[00:46] One of them is by hovering just by hovering over a link then maybe it is safe to assume that the user is going to click on this links. Once the user hovers, we can preload. It can also be done for all links in a certain page. So

[00:59] when we visit a certain route, any link that exists in this route, we can preload the code and data for it. And also another way is when a link appears in the viewport. So if you are scrolling in a route and a link appears without

[01:14] even hovering, we are just going to preload the data for uh the route that this link points to. So let's see that in action. Let's go to this uh about link. Remember this lived in our uh root route. And in here in the about link

[01:32] which is this one we can add this property preload and as a value we have intent render viewport. Intent means that uh the code for the route is going to load when we hover over this link. So let's maybe uh give it a refresh. Let's

[01:51] clear our network and let's only hover over about here. And as you can see the code for about was loaded. So this is of course assuming we are enabling code splitting and we need to load the component for the route or if we have

[02:06] some data in this route uh in the loader function the loader function is also going to run and the data is going to be pre-loaded as well. So let's actually maybe also try it just to clarify this.

[02:17] Let's try it in the posts route.

[02:19] posts.index.tsx.

[02:21] And in this links, let's go to this route here.

[02:25] So, slashposts.

[02:27] And for these links, let's clear our network tab. And let's add for these links uh h sorry preload intent as well.

[02:38] And let's clear our network. And let's hover. And as you can see, all the components were loaded. the not found component and the error component and the main component and so on and in addition to

[02:52] that the network requests to fetch the post and the comments as well. So whatever we have in our load function also uh was also preloaded as well. But we also have another option. So let's maybe uh let's maybe keep it simple and

[03:08] try it here in the homepage. Clear everything and in the root route let's change the about uh link the preload in about link instead of intent to render and render means that just by this link existing in the page it is going to be

[03:25] preloaded when we visit the route. So if we refresh now and take a look here somewhere we're going to find our about route uh loaded. So here it is. As you can see we have our about.tsx tsx file loaded. So now if we clear our network

[03:44] however nothing is going to be loaded because it is already loaded when we just uh visited the home route which has the about uh link just existing here without even having to hover over it. It is going to be preloaded. The other

[04:00] option that we have is viewport. This is where the route is going to be preloaded when the link appears in the viewport.

[04:07] And for this one, uh, I'm going to add somewhere here, let's say, uh, maybe before this navigation, I'm going to add a very large div here just to be able to scroll. And then, uh, in here, I'm going to add viewport as a value for

[04:24] preload.

[04:26] Now, let's save this. Let's refresh.

[04:28] Let's clear our network. And let's keep loading uh, or sorry, scrolling. And as long as our link appears in the network tab, we should have our request for about as you can see here. But of course, we will not have to add this

[04:44] preload uh prop for all of our links. We can let's actually remove this. And let's also remove the one that we added in the posts index.

[04:53] And what we can do is we can go into our main.tsx file. When we define our router, we can specify an option here of default preload. So default preload and whatever we're going to specify here is going to be applied to all of our links.

[05:11] So if we added the intent here uh let's also sorry let's remove this uh div that we added.

[05:20] Now without even having the preload attribute on the link when we hover over it is going to load. And for any link that we have, let's try the posts.

[05:30] If we hover over any post, we're going to get the data and the files loaded for uh this route. We can also we have an option here uh which is default preload delay. So default preload delay. This one if you would like to add a delay

[05:49] before your data is preloaded. So when you hover, let's say you would like to wait for maybe a second before pre-loading the data. You can specify this here. So let's save. Let's hover over about. As you can see, you will

[06:01] have to hover for a second for your data to preload.

[06:05] If we let's maybe refresh again, just hover for a for less than a second, then it is not going to preload. So this is maybe also something that you would like to do to maybe avoid unnecessary preloading.

[06:19] Also some other options that you can set here are options related to caching. So when we preload a route. So let's say uh let's refresh here. Let's maybe hover over about.

[06:31] Now as you can see it is preloaded. If we hover over it again it is not going to preload again until a certain amount of time has passed. It is going to be cached for some time. And we can control this cache by using the default preload

[06:45] max age here which is 30 seconds by default. After 30 seconds, any cached uh pre-loaded routes are going to be removed. And also we can control um how long preloaded data is considered fresh by using these options. Default preload

[07:02] stale time in our uh create router when we define our router or preload still time if we would like to specify this option for a specific route and not for all of our routes. But let's not get too deep into this because actually in the

[07:17] next section we're going to talk about caching in general in TanStack router.
