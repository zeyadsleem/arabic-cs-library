---
title: "Loading Data in Parallel: Single Blog Post Page"
lang: en
chapter: router
slug: loading-data-in-parallel-single-blog-post-page
order: 21
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=8507s"
---

> **Code repository for this lesson**
>
> Branch: [`loaders-3`](https://github.com/alialaa/tanstack-router-course/tree/loaders-3)


[00:00] working fine. So in this route we only uh needed to send one request to fetch our posts. However, in many situations, you might have to send multiple requests here and you also need to ensure that you do it as efficiently as possible.

[00:14] So, let's say in one of our posts, so uh let's go to posts maybe / one or so. And in here, let's say we need to load the data for this post. Of course, as we know, we have the necessary functions to do so. we have get posts or get post

[00:31] where we pass it the id and we get the post and also get post comments where we get the comments for a specific post. So now let's say we need to send these two requests in the load function for this route. So this route lives here in posts

[00:46] post id tsx. So let's open that up and in here let's pass our loader function and let's load our data. This is going to be async of course. So let's say uh let's create a constant post and then let's await get post and pass it the id.

[01:05] The id is going to live in our URL parameters which we have access to here.

[01:09] So params and in here we can just pass params id uh or sorry post id which is going to be a string. Uh in this function we expect a number. So we can just parse it to a number like so. And we can do the same

[01:22] for a comments and just call get post comments like so.

[01:31] And what we can do is we can just return the posts or the post and the comments for the post. If we take a look at our um network here, we're going to find out, let's maybe refresh. We're going to find that our requests are being sent.

[01:48] However, this one is going to be sent first and then after it is done, this one is going to be sent after it. And this is of course not very efficient since these two requests uh do not depend on each

[02:01] other. So we don't have to wait for this to finish in order to uh run this other request. We can run these in parallel by using promise.all. So let's maybe copy this uh get comment get post comments.

[02:14] Let's remove this. And now let's add an array here where we're going to get our post and comments. And let's in here instead await promise doall.

[02:25] And of course, as you may know, in promise.all, we can post an array of promises that are going to run in parallel. So we need to put here our comments one. And let's copy this and put our post one. So it's going to

[02:39] look like so. And now we're going to have the same thing. However, if we refresh, as you can see, both requests are being sent in parallel.

[02:49] And now we have our data. We can just uh add some markup. Remember in this component we had the post in a different component.

[02:58] And we get the hooks for it using get route API. So in here we can get our use loader data and from this hook I'm going to get my comments and my post. So in here, use loader data. And then let's get the post and the comments. I'm just

[03:17] going to paste some markup here. Pretty pretty straightforward.

[03:22] Let's save. And in here, I'm just listing my post title, the post body, the contents of the post. And in this div, we have the comments. Each comment, I have it in this alli with this purple background.

[03:35] And I have the body of the comment and the username of the uh comment author.

[03:40] We have a TypeScript error here because when I defined uh the type for the comments, I forgot to add the type for the user which is returned by the API.

[03:51] So we have the user ID and username.

[03:55] So now as you can see we have our post here with our comments.
