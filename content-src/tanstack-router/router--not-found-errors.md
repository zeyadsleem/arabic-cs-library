---
title: "Not Found Errors"
lang: en
chapter: router
slug: not-found-errors
order: 25
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=9695s"
---

> **Code repository for this lesson**
>
> Branch: [`error-handling-2`](https://github.com/alialaa/tanstack-router-course/tree/error-handling-2)


[00:00] in our app, we might have other errors like for example 404 errors. If a route is not found. So in here, let's try to visit a route that does not exist in our folder. I'm going to type anything here and I'm going to get this not found

[00:15] component here. So this is a default component that tack router is going to display if you type a route that is not matched in your folder. However, of course, we can customize it as well. And to do that, we can create a not found

[00:31] component for all of our app by defining this in our root route. So let's go to our root route. And in here, um, when we define our route here, we can specify a not found component like so. So let's say for this one let's maybe return a

[00:47] div and let's explicitly here type root uh not found in order to know which component exactly is being rendered by saving this and let's refresh and we're going to get root not found and by root note found I mean this is the notefound

[01:03] component coming from the root route we can however be a little bit more specific so remember we had in our app a settings route and in settings we had uh general We had payment, we had profile.

[01:17] What if we type here something uh settings/ something that does not exist.

[01:23] Remember in our settings route, settings is a parent. So if we take a look at here, settings is a parent to payment and profile. And in this parent, if we go in our folder to settings, uh settings layouts settings.tsx, tsx

[01:40] this parent has an outlet and it displays the children and so on. So if an error happened a 404 error happened where the parent is settings and the child is not found then this settings layout is going to be used and the

[01:57] default 404 uh error component is going to be used instead of this outlet. So as you can see we get our layout normally however our settings layout normally.

[02:06] However we get the default not found component here. However we can customize this by specifying in the settings parent itself the uh not found component.

[02:17] So let's say in here add some text of settings not found like so.

[02:25] Now if we refresh this we're getting uh we're going to get settings not found.

[02:30] So what is going to happen is the router will try to use the closest matching route that has an outlet and it's going to display the not found component using this route. However, we can customize this behavior as well. If we would like

[02:46] to um make the root notefound component be used for all of our routes. When we define our route which is uh in our main.tsx tsx file. In here we can specify um an option which is not found mode. If we set this to root then the

[03:05] root not found component is going to be used as you can see. However the default option is fuzzy which is going to be a little bit smarter and try to use the closest route with children in order to display the not found component like so.

[03:20] So I'm going to leave it like that fuzzy which is also the default. So you can maybe remove this option but remember if we don't have uh a not found component either for our root or for maybe uh the settings parent here. So let's maybe

[03:34] comment this for a moment and refresh this default not found component is going to be used. So maybe you would like to have a default a different default not found component instead of having to specify the not found

[03:47] component for each route or for each parent uh each parent component where you need to display a 404 error. In this case you can in uh main.tsx here when we define our router specify a default uh not found component like so.

[04:05] So for this one, I'm going to just put uh default not found as as a text here.

[04:11] And now, as you can see, we get this instead. But of course, we can still override this by going to our settings layout and uncommenting this. Now, this is going to be uh it's going to have more priority, and we're going to get it

[04:24] here. All right. So, I hope that's clear. Sometimes however uh we might have a matching route but the resource that we're trying to fetch does not exist. So for example we have a route which is post/ ID. So

[04:40] this route exists. However we might not have uh the ID that we passed here in our back end. So let's maybe pass a large number here that probably does not exist. So this route exists. However, when we fetch our data from the API,

[04:55] we're going to get a 404 from the API.

[04:58] What is going to happen is uh or sorry, this is posts.

[05:05] What is going to happen is remember we are uh handling errors using uh let's go back to the post route post/ id. We're handling our errors using this error component. And when you fetch our data which is in posts.ts, ts uh any error

[05:21] we're going to get we are just throwing an error. So actually not here in here in get post we're throwing an error for any error that we're going to get. So by throwing an error here this error component is going to be displayed.

[05:36] However we need to be more specific and display specifically a 404 error if we get a 404 error from the API. So if we inspect here, open our network, refresh, when this request uh is sent, we're going to get in the response. So let's

[05:55] take a look here.

[05:57] In the response, we're going to get a 404 not found error. So maybe we can check uh in here when we send this request if we had if the response is not okay maybe before throwing an error we can check if

[06:12] the response status is 404. In this case we might uh we can make TanStack router display the 404 component instead of the error component by throwing not found. So we can import not found

[06:27] from tstack React Router and throw this instead of throwing an error.

[06:35] Uh sorry I have a typo here.

[06:38] Not sure why it is not autoimp importing but uh let's just put it here like so by throwing not found when we get a 404 error. If we refresh now uh we should get the default not found component.

[06:52] Remember uh since we specified this in our main.ts the tsx to be our default component. However, of course, we can still customize it specifically for this route by passing uh sorry in here in posts uh post ID. In addition to our

[07:08] component, we can have a not found component as well. And in here for this one, let's say post not found. And if we save this, refresh, we're going to get post not found. So, this is mainly it.

[07:21] You can also find a page here in the docs for not found errors if you'd like to read more about this. However, uh we have covered mainly everything in here.
