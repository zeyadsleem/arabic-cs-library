---
title: "CatchBoundary"
lang: en
chapter: router
slug: catchboundary
order: 26
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=10146s"
---

> **Code repository for this lesson**
>
> Branch: [`error-handling-3`](https://github.com/alialaa/tanstack-router-course/tree/error-handling-3)


[00:01] Let's discuss one final thing regarding error handling. So let's say we are visiting a post and remember in our posts routes we were loading the post or we were waiting for the post to be loaded before rendering our route and

[00:14] then we loaded the comments in the background.

[00:17] Let's assume some error happened when we are loading the comments. So let's go to this comments function in here and let's maybe uh get this back time out and then let's say after this timeout some error happened. So let's throw a new error and

[00:35] let's say failed to fetch comments also.

[00:38] Now if we try to refresh this our comments are going to be loading and then our whole page is going to crash.

[00:46] It would be much nicer if we keep our post as it is and just display an error here in place of the comments. To do that we can remember in our uh post route we are rendering this post component. In this post component we are

[01:01] having a waited here in order to wait for the comments to load and then display the comments. What we need to do is we need if any error happened in this awaited component we need to display an error component instead of just crashing

[01:14] the whole page. So what we can do is we can wrap this in a catch boundary component that we can import from 10 stack and we can wrap everything like so. And by doing this if any error is thrown by

[01:32] the children of catch boundary we can instead of crashing the whole page catch this error and display an error component instead. So in here let's say uh let's have some text failed to load comments

[01:47] and also if we would like to log this error we can have an on catch call back here. However, this is optional but what is required is um a prop called get reset key and in here we can return a function and in this function we can

[02:02] return a certain key anything and when this key changes this error boundary or this catch boundary is going to be reset. So we can put here something dynamic that we need uh whenever it changes the catch boundary

[02:16] will be reset. However, for now, let's just post some static string. And maybe you can implement a way to update this key in order to reset the error boundary. However, I'm going to keep it like that for now. And if we now save

[02:29] and refresh and wait for the error, we should now get fail to load comments only here.

[02:36] However, we still have our post and we do not crash our entire page. Let's talk
