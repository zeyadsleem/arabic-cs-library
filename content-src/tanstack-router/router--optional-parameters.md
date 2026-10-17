---
title: "Optional Parameters"
lang: en
chapter: router
slug: optional-parameters
order: 11
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=4160s"
---

> **Code repository for this lesson**
>
> Branch: [`optional-params`](https://github.com/alialaa/tanstack-router-course/tree/optional-params)


[00:01] Something else that you maybe have seen in other routers as well is the ability to have uh optional parameters. So let's say we need to have a route uh for example for an archive of something. So we're going to need to create a route

[00:15] that is going to be /archive.

[00:21] And for this archive for example, we can you can visit archive itself and we're going to get everything in this archive or we can narrow it down by passing a date here for example. And we can narrow it down even more by passing maybe a

[00:31] month and then a day and so on. But all of these are optional. And also let's say we have multiple languages. So before archive we can have a language like so. But this is optional as well.

[00:44] If we don't pass it we're going to get a default language. So let's maybe visit this route which is of course going to be not found for now. Let's see how can we create it here in our routes folder.

[00:55] So in order to create optional parameters we do it this way. So we use dollar sign and then the parameter name normally. However to make it optional we put it in curly brackets and then put minus before the parameter. So minus

[01:08] dollar sign and then for this first one we need it to be the language. So let's say local and then slash archive and then slash and then we have the rest of our optional parameters which is year.

[01:20] So minus dollar sign year and then we also have the month and finally we have the day as well.

[01:30] And of course don't forget the uh tsx.

[01:32] However uh I did it so that it will create folders inside of each other.

[01:37] Let's do it also using the flat way. So instead of uh creating folders, let's replace these slashes with dots instead.

[01:46] Uh so that we can just carry on with the flat way that we've been using. But of course, you can also do it with folders.

[01:53] By creating this, we're going to uh our route is going to be matched now. And uh we can see in our dev tools that we have this route with our optional parameters.

[02:04] And we can simply access our optional parameters in our route using the uh use params hook as well. So in our route dot use params hook route use params we're going to get all of our parameters the local the year the day and the

[02:24] month. Over notice that for the type since they are optional they are going to be string or undefined.

[02:31] So let's display these here. Maybe I'm going to put this div to display our parameters. And now if we save, we're going to get our local year, month, and day. But we don't have to pass all of these. We can maybe remove the language

[02:44] from the URL. We're going to get undefined. We can remove maybe the day.

[02:49] We're going to get undefined here, but the route is still going to be matched.

[02:54] And of course, when we use these parameters, we're going to need to check if they exist or not before we maybe do some action.

[03:02] And now to navigate to this route and pass optional parameters. We also simply use the link uh URL. Let's maybe go to our home route which is inside of index and then uh add a link here and try to navigate to our route with optional

[03:18] parameters.

[03:20] So let's say go to archive and then inside of two we're going to need to oh sorry let's import link first.

[03:30] And inside of two, we're going to need to put our route, which is this one. And then we can simply specify our parameters using the params prop here. But we don't have to put all of our parameters since they

[03:44] are optional. So we can maybe put uh just the language for example. If we do so, this is going to take us to uh the language/archchive without any year or month or day. Of course, we can maybe add a year.

[04:00] Now sorry this has to be a string as well. And now this link is going to take us to frrarchchives slash the year and so on. We can also pass parameters uh as we've seen before as a function if we would like to maybe maintain our

[04:15] existing parameters and only update uh one parameter. And this can be very useful in our case to maybe create a language switcher. So let's say uh let's maybe go to a URL which is language archive slash month sorry month/day for

[04:34] example and now let's say we need to have here in this route let's go back to this route we need to have a way to switch our languages however without affecting the currently selected date. So we only

[04:47] need to change this fr parameter. So this can be easily done since we can pass a function to params uh to the params prop instead of just um an object. So let's maybe have uh here let's define a couple of available

[05:02] languages and let's loop through these languages and display a link that is going to take us to the existing URL but only update the language. So in here, let's maybe add a div. And inside of here, I'm just going to display it uh to

[05:17] add the background, color, padding, and so on. And then inside of here, I'm going to loop through my languages. So languages map. And uh in this array, we have the code and the name. So in here, let's dstructure our code and our name.

[05:33] And then let's return a link component.

[05:36] So let's import link like so. And uh let's put maybe the name of the language. Oh, sorry. The name of the language in here. And of course, let's add a key as well. Maybe let's add the code as a key. If we save this,

[05:52] we're going to get this. But now let's make this link go to our route, which is this one.

[06:01] And then let's also pass our parameters.

[06:04] And now let's pass it as a function instead in order to maintain our previous parameters but only update the language. So in previous uh we're going to get previous here and we can return an object and maintain our previous

[06:18] parameters and then post the new local.

[06:22] The new local let's say if it is English we don't need to post it. Uh we don't need to add it to the URL since this is maybe our default language. So let's check here if our language is English.

[06:34] If we don't need to pass it, we can explicitly specify this to be undefined.

[06:39] Otherwise, just pass the code like so.

[06:42] I'm also going to add this class name here to highlight the currently selected language. So, if the language is equals to the current code or if the language is undefined and the current code is English, then we need to highlight

[06:56] English. So, we are going to make our font bold in these cases. So, now we have u French highlighted here.

[07:04] since our local is French. And now we can switch. And notice that when we chose English in our URL, we don't have anything before archive since this is what we've done in our code. And our local is undefined. And um the rest of

[07:19] our optional parameters were maintained since we are passing this function here and maintaining our previous parameters.

[07:25] And we can go to other languages as well. And this is going to update our URL.
