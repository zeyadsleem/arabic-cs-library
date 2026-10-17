---
title: "Loader Functions: Posts Page"
lang: en
chapter: router
slug: loader-functions-posts-page
order: 19
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=7730s"
---

> **Code repository for this lesson**
>
> Branch: [`loaders-1`](https://github.com/alialaa/tanstack-router-course/tree/loaders-1)


[00:01] When it comes to loading data in 10 stack router, we don't just load data inside of our route component, maybe in an effect or so. However, how we do it is by defining a load function that we can pass here to create file route. So

[00:14] in here we can pass a load function or sorry loader function and in here we can do any data fetching that we need. This ensures that the data required for the route is going to be loaded as early as possible and it can also be preloaded

[00:29] even before we visit the route. We're going to talk more about uh pre-loading later. And also by default any data that we're going to load here is going to be cached as well. And we can control the behavior of this cache. We are going to

[00:43] also uh discuss caching in a later section. In this loader function, we're going to receive things like the context. We're also going to get our uh URL parameters in params. We're also going to get the route itself,

[00:56] information about the route. However, we're not going to get the search parameters. So if you type search here, we're not going to find any property for search parameters. And this is for a reason that we're going to discuss also

[01:09] uh in a moment. And we also have in addition to loader, we also have a before load function that we can pass here. And this can be very useful in many situations. So for example, maybe we need before rendering our route,

[01:24] before loading any data, we need to redirect to a different route. Maybe we're not authenticated for example. So need to redirect. And also remember when we discussed context, we mentioned that in addition to having root context that

[01:38] is going to be available everywhere, we can also have context for a specific route and it's going to be available only for this route and its children.

[01:48] And this can be done using this before load function by returning an object here. If we return an object, this is going to be the context only for this route and its children. And we're going to try that uh in a moment also. But

[02:02] let's for now load some data from this dummy JSON API. So we have this dummy JSON placeholder API here where we can just send some requests and receive some dummy data. So let's use that to maybe try to load some data in our

[02:15] application.

[02:16] So what I'm going to do is I'm going to define some functions to fetch some data from this dummy API. Uh I'm going to put these in maybe in our source folder. I'm going to create a file inside of data.

[02:29] Let's call it posts also since we're going to load some dummy posts in here.

[02:34] I'm going to paste some stuff and let's go through it quickly. So I have the types that are returned by this API. So the post is going to contain ID, title, body, user ID and so on. It also returns other stuff as well, but uh let's keep

[02:47] it simple and let's say we are only caring about uh these properties.

[02:52] We're also going to load comments for the post and this is the type for it.

[02:57] And when we send a request to fetch posts, we're going to receive the posts uh which are an array of posts in addition to pageionation information. So we have total skip limit and similar for when fetching comments as well. And in

[03:11] here I have a couple of or actually three functions. One to get a post uh or sorry to get a list of posts. And we have page here where we can load different pages. So we call this dummy API and just add a limit and skip to

[03:25] load different pages based on this page argument here. And then we return our JSON if our response is okay otherwise we throw an error and uh we do the same for the other functions as well. So get post this gets a specific post by

[03:39] receiving the id and we call this endpoint pass it the ID return the data or throw an error and so on and similar for comments as well. So I'm going to save this file and now let's try to use uh these functions in our route. So

[03:52] remember we had this route posts.index.tsx which is uh / posts which uh should maybe contain a list of posts. So let's try to call the get post function in order to load some data and then use

[04:05] this data in our component. Let's also try to pass uh the function the get posts uh function this one as a context for this route by returning in here. So in before load we can just return and uh let's say get posts and let's

[04:25] import our get posts function.

[04:29] This is going to ensure that this context is available for this route which is / posts and if it has any children. So in our loader function we can get our context and in our context we're going to find that we have access

[04:43] to our parent context user login logout in addition to get posts and this is going to be similar for uh if the post rout had any children as well they're going to have access to get posts. So context can also be useful for passing

[04:59] functions that are maybe going to be used by multiple routes. So maybe in our example it's not very useful but as you can imagine there can be use cases to this but let's now try to in our loader function now get from our context

[05:16] uh let's dstructure our get posts function and let's call it by creating a constant call it posts and then uh await get posts and since we're using a wait let's make this an async function but remember uh this function is going to

[05:32] return uh posts response which is going to contain the posts and the pagionation information. But let's say we only need to return the posts. So let's in here return posts or actually sorry let's return an object containing our posts

[05:46] which are going to live in posts.posts.

[05:53] Um I think I maybe have yeah I have a comma missing here.

[05:56] So by returning some data from this loader function this data is going to be available in our component. And how can we access it is by also using a hook. So let's in here use a hook inside of our route. And this one is called use loader

[06:12] data. And since we have type safety for everything, of course, we're going to get autocomplete here for our posts.

[06:18] It's going to be correctly typed as well. And we can just uh simply loop through our posts and display them. I'm going to put some code here. This is pretty straightforward. Let's say uh maybe in here. Let's put this loop.

[06:32] So what we're doing here is just a a loop through our posts and then displaying a link that is going to display the title of the post and it's going to take us to posts/post ID and we're passing the post ID of the uh post

[06:46] that we're get that we're getting in our loop.

[06:49] However, it looks like we have an error.

[06:52] Uh let's maybe refresh.

[06:54] Yeah. So when I refreshed, here we go.

[06:56] We have our list of posts here. When we click on one of our posts, we're going to go to posts uh / id. And in this route, we can load this specific post.

[07:07] Uh but let's leave it like that for now, and we're going to do it later.
