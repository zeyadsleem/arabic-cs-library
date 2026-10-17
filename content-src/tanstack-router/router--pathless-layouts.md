---
title: "Pathless Layouts"
lang: en
chapter: router
slug: pathless-layouts
order: 6
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2239s"
---

> **Code repository for this lesson**
>
> Branch: [`pathless-layouts`](https://github.com/alialaa/tanstack-router-course/tree/pathless-layouts)


[00:01] What if we would like to have a parent route that can act as a common layout for some routes? However, we don't need this parent layout to have a path. So for example, in our case, we have this settings parent which can act as a

[00:14] layout for any route that is a child to it. So if you go to settings/p payments settings/profile, we're going to have this settings route displayed here rendered and we can use it as a layout to display a navigation

[00:26] for example uh as we have here. But what if we would like to have that layout but without this path without having to go to settings/ something in 10stack router we can have bothless layouts as well. So let's say we need to maybe go back to uh

[00:44] this approach, this one where we're going to have our root layout and we're going to have settings as its own uh route and settings/ payment as its own route, setting slash profile as its own route as well. However, we need all of

[00:58] these routes to have a common layout without having a path. Right? So we need to have some sort of a layout here and then we can have our routes. Uh so settings settings/ payments settings/profile and so on. However,

[01:14] this parent here we don't need it to have a path. We just needed to act as a layout for common UI elements like navigation for example. To do so we can uh use a special syntax in our folder.

[01:27] So let's go in here and instead of this folder being named as settings, we can rename it. And in order to make this parent not have a path, we just add an underscore.

[01:39] And then we add a unique identifier for our pathless layout. Let's maybe make it more clear and call this settings layout like so.

[01:49] And what we need to do is we need to keep uh this route.tsx as it is. Right?

[01:56] So let's also close this file.

[01:59] So now we are going to have errors because we don't have these paths anymore. But we're going to fix that in a moment. So now inside of this settings layout and then route, this is going to act as our layout for any route that

[02:13] we're going to put inside of this folder. So now as you can see here in our tree, we have uh this layout as a parent. However, it does not have a path. So we can directly go to payment.

[02:27] We can directly go to profile without settings. But as you can see, this parent layout is going to be matched and it is going to be displayed here. Let's now make it more clear that this is a postless layout and not uh a parent

[02:43] route like so. So, we're going to have our navigation. Uh we're going to have our text here, but now we need to fix these links because now we don't have / settings. We just have payment and profile like so. And this should still

[03:00] work like so. And of course, we can still make the URL / settings/ something and still use this layout. How? By uh let's actually get back this URL to SL settings/ something. And simply inside of our layout, we can create a new

[03:16] folder settings and move payment and profile inside of settings like so.

[03:25] Now uh we shouldn't have errors in our uh route here in our route. TSX inside of settings layout. We shouldn't have errors because now we have settings/p payment and settings / profile. Now we

[03:39] can uh if we take a look at our tree, we're going to have this layout which is a parent to settings/p payment and settings/profile.

[03:48] What if we would like to have slash settings as well as a route that uses this pathless layout as well? Remember, in order to do that, we can create an index file inside of settings like so. So, index.tsx.

[04:07] And now we're going to have settings matched as well. And it is going to be a child to our settings layout here.

[04:16] So now we are able to achieve uh this approach. However, where settings and settings/ payment and settings/ profile all have a common layout that does not have a path.

[04:31] All right, great. Uh let's now make it maybe do one final thing for this in our layout. So remember our layout is going to live in route.tsx inside of the layout. Let's make a link uh that goes to SL settings. So in here, let's maybe

[04:49] uh duplicate one of these and make it go to SL settings directly.

[04:56] And uh let's make it say general settings or so. Right? When we have this, it is going to work. However, if we go to payment, this is going to still be active. Right? So this happens by default. The active link is going to be

[05:13] considered active if it is matched or if so if settings exactly is matched or settings/ something is matched as well.

[05:22] However, in our case we don't need to have that. So in here we can pass exact.

[05:27] Oh sorry not here in active options we can pass exact and set it to true. And this is going to make this link active only when settings is exactly matched, not settings/ something. So this is going to fix it.

[05:46] And by the way, we can set this option for a specific link or we can set it globally as well when we define our router. Sometimes in your folder, you
