---
title: "Pending State Component"
lang: en
chapter: router
slug: pending-state-component
order: 22
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=8746s"
---

> **Code repository for this lesson**
>
> Branch: [`loaders-4`](https://github.com/alialaa/tanstack-router-course/tree/loaders-4)


[00:01] But let's say uh let's simulate our request uh being maybe a little bit slow and let's say the comments request is slow. So in here when we get our comments let's add some artificial delay here like so. So I'm just adding a

[00:18] delay of 3 seconds before we return our data. Now, if we save this, refresh, as you can see, we're going to get this blank page for 3 seconds or so, and then we're going to get our route displayed here. And the same is going to happen if

[00:33] we, let's say, in our posts route, and we navigate to uh any post. We're going to be stuck here for 3 seconds and then we're going to navigate. So, we can make this experience a little bit better by in our route. So in our post / id route

[00:51] we can here define a pending component and this component is going to be displayed instead of our um route component. This one that contains the post until our route is loaded. So as long as our component is pending or our

[01:05] route is pending. So in here uh let's just pass a function and you can put maybe a skeleton or something like that.

[01:11] However, for simplicity, I'm just going to put a div with some loading text like so.

[01:19] And uh I have a comma missing here. So now if we refresh, as you can see, we get this loading.

[01:27] And also if we maybe go to posts and then go to any post, we're going to be uh having a little bit of a better experience by having some loading indicator uh instead of just being stuck

[01:42] in the previous route.

[01:44] And we can also control how this uh pending component works by specifying some options either in the route or in uh our router when we first define our router here. But let's do it for this route first. So in here, let's say uh

[02:01] I'm going to go back again. Let's refresh.

[02:05] By default, this component is not going to show up except if our loading took more than uh a certain amount of time. I think 1 second or so. So I'm going to click it. it is not going to show up except after 1 second. After 1 second,

[02:19] we're going to see this. We can customize this by going in here and defining um pending ms milliseconds.

[02:28] And if we set it to zero, for example, sorry, zero, it is going to show up immediately. So if you go back so refresh click and immediately we're going to get this loading uh component here. And if

[02:44] you would like to set this option globally for all of our routes in here when we define our router we can uh define a default pending ms here but uh I'm not going to do it here.

[02:57] Let's just keep it in our route. We also have another option. So let's say um let's maybe go back to our function and remove this delay.

[03:08] And let's say our function our um data is loaded quick enough. If you go back now uh maybe refresh click on a post we're going to see this loading component for a very short amount of time and it can be even less than uh the

[03:24] time that we've seen here.

[03:26] So if it maybe showed up for only 1 millisecond or so, it's going to just flash and disappear immediately, which is maybe not a very good experience. And for this reason, by default, uh 10stack router is going to show this pending

[03:39] component for at least 500 milliseconds.

[03:43] Even if the data did not take 500 milliseconds to load, this component is going to show up for at least 500 milliseconds to avoid this uh flashing behavior. And we can also customize that by adding pending minimum milliseconds

[03:57] here. If we set this to zero for example and uh let's maybe try or actually to try it maybe set it to a large number so that we can see that it's going to stay for this number as a minimum. So if we go now

[04:13] as you can see our data is probably loaded but we uh still have this loading component for this amount of time. By default, it is 500 millisecond uh milliseconds to avoid this flashing behavior if your data loaded in a very

[04:27] short amount of time. And this option can also be set globally here by specifying default pending uh minimum milliseconds as well.
