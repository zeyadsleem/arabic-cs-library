---
title: "Flat Routes"
lang: en
chapter: router
slug: flat-routes
order: 8
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2743s"
---

> **Code repository for this lesson**
>
> Branch: [`flat-routes`](https://github.com/alialaa/tanstack-router-course/tree/flat-routes)


[00:01] to being able to nest routes by creating folders and putting routes inside of folders and so on, we can also have this routes folder completely flat without any folder nesting by following a certain uh way to name our files when we

[00:16] create our routes. So, what I'm going to do is I'm going to maybe completely redo everything that we've done regarding these nested routes, but without any nesting, without nesting any folders.

[00:28] Our routes folder is going to be completely flat. So, what I'm going to do is I'm just maybe going to create a temp folder inside of our source folder and move our nested stuff. So move settings underscore here

[00:43] and also move this settings layout inside of this temp folder as well. So now we don't have any nesting inside of routes and let's try to recreate these folders but without uh nesting any folders. So in order to do that we use

[00:57] dot in order to nest layouts and routes.

[01:00] So in here for example we need to define our layout settings layout. So what we can do is in here we can create a file underscore settings layout. And notice that this is a file and not a folder. So we don't need to create a route.tsx

[01:15] inside of it. We're just going to have that.

[01:18] And this is going to be our layout. We can just copy the stuff that we had before in route.tsx and uh maybe just copy this div and put it here instead.

[01:30] So we had this uh let's import outlet and we had this nav component that was defined in this components folder. Let's actually move this components folder now inside of our rows folder like so since we are not going to have this underscore

[01:45] settings layout folder anymore. And now we can just import nav from this folder like so.

[01:54] So here we have our settings uh layout as a file without any folder and any route uh tsx file. So now what if we would like to create a route that is a child to this layout. Now that we don't have a folder what we can do is we can

[02:11] use dot. So we can create a new file like so. So remember we had uh inside of this layout we had our settings route and we also had settings/profile and settings/p payment. So how can we do that now without any folders? We can

[02:26] create settings uh underscore settings layout and then dot and then settings dot index to create of course tsx to create the settings index route. So remember we had a folder settings layout and then

[02:42] settings and then index to convert that into a flat route. We just create a file settings layout settings index. And now we can go to this old index file.

[02:54] Uh or we actually didn't do anything here. So let's maybe just keep it like so. And now if we save this we should be able to visit / settings. If we take a look at our tree, we have settings layout and as a child we have settings.

[03:10] Let's now do settings uh / payment and settings/profile which is going to be exactly similar but instead of index here we're going to have dot something else. So let's do actually quickly I'm going to copy this

[03:25] uh name from here and inside of routes create a new file paste. Instead of index, let's do profile.

[03:33] And uh let's do another one for payment.

[03:39] And uh now as you can see we have settings layout. And as a child we have our settings payment, settings profile and settings index.

[03:48] So this should be it for uh this settings layout folder. We have moved everything into flat files here. Uh it looks like it's not working. We should have our navigation here uh to navigate between different settings pages. I

[04:03] think maybe we just need to maybe restart our server or so.

[04:07] Let's try to do that. Uh still not working. Oh, actually, sorry. Uh I have a typo here. This should be settings and not setting.

[04:18] And uh yeah, this should work.

[04:21] So now everything is working as before.

[04:24] But now uh we don't have any nesting inside of our routes folder. Everything is flat. Finally, remember we had the settings underscore folder and then we had password. In order to make password not use the settings uh layout, we can

[04:39] do that as well in a flat way by simply creating a file called settings underscore and then dot password.tsx.

[04:54] This way. If we take a look at our dev tools, we're going to have settings/p password, but it is not a child to the settings layout. And if we visit this route where we're not going to have the navigation and so on. So now everything

[05:06] that we've done, we can now remove this temp folder and everything that we've done using the folder we can do using uh this flat way as well. We can also use both ways

[05:19] together. So we can have a folder inside of it. We can use this dot uh syntax as well. So of course this is up to your preference. Maybe you are okay with some nesting but maybe you don't want to go very deep in nesting folders. So you can

[05:33] create maybe some folders but then you can use this dot notation as well. By the way I just uh realized something that uh in our case uh the underscore after settings here would not matter uh because settings is not the parent. So

[05:48] if we actually remove this underscore uh sorry rename remove this underscore this will not make a difference because settings is not a parent anyways.

[05:59] Remember we are not using settings as a layout. Settings is uh is its own separate route here. We have an index for it. So this will not make a difference. We can still visit uh settings/p password and it is still

[06:11] going to not be a child of this layout of course uh because we don't have settings layout in the folder name. We will need this underscore however if we had settings as a parent. So if we maybe rename this index uh remove this index

[06:27] from our name and maybe go in here and in here maybe uh just display an outlet so that settings can be apparent to any child like so and also let's assume uh this settings password is also using this settings layout. So let's rename

[06:46] this like so settings layout settings password. so on.

[06:53] Now, as you can see, we have settings layout and then we have settings as a parent and it has a password, payment, profile and so on. If we need password in this case to not use the settings as a layout. Now, in this case the

[07:09] underscore will be helpful. So, here we can rename this uh sorry here rename this and put the underscore like so.

[07:21] And now as you can see now settings is only apparent to payment and profile.

[07:27] However, settings/p password is not a child of settings.

[07:32] So I just needed to clarify that to avoid any confusion.
