---
title: "Protecting Routes"
lang: en
chapter: router
slug: protecting-routes
order: 31
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=12190s"
---

> **Code repository for this lesson**
>
> Branch: [`auth-1`](https://github.com/alialaa/tanstack-router-course/tree/auth-1)


[00:01] protect our routes if we have some sort of an authentication system. So, of course, currently we don't have a real authentication system. However, we have this button here where we have some state. So, remember in our um main.tsx

[00:14] file, we are having this user state here that we are passing as a context to our router provider in here. So, let's use this. Let's assume we have a real uh authentication system where this user is actually real and depend on this user to

[00:29] exist in order to know if we are logged in or not and based on that we're going to protect some routes and maybe in a later video if you would like maybe we can uh integrate some actual authentication uh with TanStack router.

[00:42] So as we know now we have our route tree in TanStack router. So let's maybe actually uh create another one here. So let's say we have our root route here.

[00:53] So this is our root and let's say we maybe have some route that is public. So maybe this is an about page also. And let's say I have some other route that we need to protect. So let's say this is protected.

[01:07] As we know now for every route we have a loader function that's going to load the data. But we also have a before load function. This before load function is going to be called as we know before loading any data for our route and

[01:23] before rendering the route. And therefore this will be a perfect place in order to check for authentication stuff since we have access to our context here as well. We can check for our context and based on that we can

[01:34] maybe redirect or throw an error inside of before load and by doing so the route is not going to render. And not only that, we can also protect a group of routes using layouts. So let's say we have maybe a group of routes here and

[01:51] all of these need to be protected instead of having to add a before load function for each one of them and check for authentication and so on. What we can do is we can add a parent here a parent layout for all of these functions

[02:05] or all of these routes like so. And in here in this layout we can add a before load function. And in this before load function we can check for authentication. And if we throw an error here none of the children will attempt

[02:18] to load. So we can use layouts in order to protect multiple routes as well. So let's actually see that in action.

[02:27] So first of all I'm going to add a new uh route here for login. So I'm going to add a login route. New file login.tsx.

[02:36] tsx and we're just uh going to put the same button that we have here. So remember in our root we had this login button.

[02:47] We can do the same thing. Let's actually copy this and in this login route let's put a login button. And how we get access to login is remember using context. Since you are passing this login function as a

[03:02] context in our root it's going to be available everywhere.

[03:06] So we can just in here from our route dot uh sorry route dot use context use route context we can get our login function like so. And now by saving this we can go to /lo and we're going to have this login page.

[03:24] If we click login we should be logged in. Of course, when we log in, we should uh redirect to somewhere else and also we should not be able to access this login route if we are already logged in.

[03:35] But uh let's work on that in a moment.

[03:37] First, let's maybe try to protect a route based on our context by adding a forload function for the route that we need to protect. Let's say maybe let's do it for the about route. So let's say this is a protected one. So let's go to

[03:52] about.tsx in here. And what we need to do is we need to add a before load function. In here we're going to have access to our context. Right? So inside of here we can get our context and we can simply check if we don't have a

[04:07] user. So if not context do user. Let's assume we are logged out. And in order to prevent the data from loading and the route from rendering, we need to either throw an error or we can also do a redirect by throwing a redirect in here.

[04:25] Uh and redirect we can import it from 10 stack React Router like so.

[04:30] In here we can pass of course where we need to redirect to. So we can pass to here and let's redirect to maybe the login route. So now if we save this and try to access about we are redirected to the login page. Right now when we click

[04:49] on login let's say we need to redirect to the route that we were trying to access. So let's say we were trying to access uh as we've seen here the protected route which is /about. We're going to be redirected to login since

[05:02] about is protected. So let's say when we actually login we need to go to the page that we were trying to access which is about. So in order to do that we need to pass the page that we were trying to access as a search parameter here in our

[05:14] login route. So let's do that by when redirecting here add a search parameter and then let's call it maybe redirect and then in here let's pass the location of the about route which we can get access to from here. We can have access

[05:32] to location and we can redirect to location.h.

[05:38] If we now save this and try to access about. So let's try to access about in here.

[05:45] Now we are redirected to login. But we have this search parameter redirect and it points to the about route. Now when we login we need to get this if it exists and redirect to it. Otherwise maybe have a default uh place to

[05:59] redirect to. let's say the home route also.

[06:02] So in our login route, let's say after logging in, let's maybe put uh curly brackets here.

[06:12] And after logging in, let's say we need to navigate. So in order to do that, we can use uh the use navigate hook. So in route, we have access to use navigate.

[06:22] And in here, we can do our navigation.

[06:26] However, let's also not forget that now since we have a search parameter for this route, we need to define the schema for it. So, I'm going to put this here and import Zod. We're going to have a redirect which is optional. And then we

[06:39] just need to add validate search here. Import Zod validator if you are using Zod and pass it the schema.

[06:48] And now that's finally in here after logging in. Let's navigate to so let's pause here too and let's get the redirect search parameter which we can get from our hook as well. So from our use search hook. So in route we have our

[07:06] use search in here we are going to have access to redirect which is going to be uh which can be undefined. So we need in here to either redirect to this or fall back to the home route like so.

[07:20] So now when we click on login we should be redirected to about. Now that we are logged in we are able to see our about route normally. Of course if we refresh since we're not persisting this we're going to be logged out. Let's now

[07:32] simulate that we're logged in initially by going here in our root um and uh in here when we pass our context our user context which was in um sorry it was actually in our main.tsx file. In here, let's in instead of null, let's pass any

[07:50] maybe dummy user like so.

[07:54] And now when we refresh, we should be logged in and we should be able to visit the about route. The problem now is if we navigate to login, we are going to be able to navigate to login even though we are logged in. So we need in our login

[08:08] route as well to add a before load function and check if we are already logged in. We should not be able to see this route.

[08:16] So in here we can also get access to our context.

[08:22] Let's also get access to our search parameter so that we can navigate to the redirect search parameter if we have it.

[08:29] So now we can check if context user if we are already logged in. Let's throw a redirect and go to um search redirect or sorry or our homepage like so.

[08:49] Uh I think I have a an arrow missing here.

[08:53] Yeah. So now if we try to navigate to login, we should go back to the home route. Now let's say we are in the about route and we're logged in and of course about is protected as we've done and let's say we click on log out. Now

[09:08] remember when we click on log out uh uh sorry in main.tsx remember when we log out we call router.invalidate and as we've mentioned router.invalidate is going to force any active route to reload. So when we click log out now

[09:23] we're going to be redirected since our about route is going to reload and uh we're going to have our check here which is going to redirect us to the login since we are logged out now and we don't have a user in our context.

[09:38] So this is looking fine. Let's do the other uh option that we have here which is protecting multiple routes using layouts as well. So, as we've mentioned,
