---
title: "Catch-All Routes"
lang: en
chapter: router
slug: catch-all-routes
order: 10
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=3786s"
---

> **Code repository for this lesson**
>
> Branch: [`rest-params`](https://github.com/alialaa/tanstack-router-course/tree/rest-params)


[00:01] we know how to have a dynamic parameter in our URL. However, what we've seen is having a dynamic parameter of only one segment. So, in here, for example, we had our posts/ ID. We only have one segment here that is dynamic. Sometimes,

[00:16] however, we might have multiple segments that are dynamic. So for example, we might have maybe a route that is file slash a path to a file. So in this case we might have maybe x /y/ z dot something and so on. In this case this

[00:33] whole part is dynamic and now we have multiple segments here. So we have x and y and zed and so on. And we need our dynamic segment to be all of that and not only this x part that comes after the file. So similar to other routers

[00:49] that you might have used before in tan stack router we also have a way to catch multiple segments in a URL. So let's see how we can do that. So what we can do is we can go uh in here and let's say uh let's create this route file/ something.

[01:04] However this something is multiple segments and not just one segment. So in routes let's create a new file. Let's call it file and then dot and then to catch a lot of segments we use dollar sign without any name here. If we give a

[01:18] name here then this parameter is only going to be one segment. But if we need to catch multiple segments we just use dollar sign like so and then just simply tsx.

[01:30] Now in here we're going to be able to get our parameter and use it in this way. So remember we have used the route dot use params. So route use params uh hook to get our dynamic parameter. We're going to use this same hook. However, to

[01:49] get uh this whole segment x/y/z and so on, anything that comes after file, we can access this using underscore splat like so. So let's maybe add a new line here and let's say file path and let's display this.

[02:09] Now if you save this and let's go to this route right now as you can see we get our file path and we have captured everything after file x/y/z.txt right and of course we can combine this with other parameters as well. So let's

[02:28] say our route our URL is going to be file and then we're not going to have the path directly after file. Maybe we're going to have maybe some ID for the file uh for the file first and then the path and we need to capture this in

[02:41] a separate parameter and then capture the rest uh in this split parameter that we get here. Sorry. So how can we do that? Simply we can create another parameter.

[02:54] So before the dollar sign, we're going to have an ID for the file. So we can simply rename this and then file dot dollar sign and then give a name to the ID parameter that we're going to have after file. So file ID for example

[03:10] and then dot dollar sign which is going to capture everything after this ID. So if we save this and go back here and uh let's maybe visit a route that is maybe file slash some id /xyz.txt

[03:29] and so on. Now as you can see we still get x/y/z.txt as the file path and we don't get anything from this ID that we put here.

[03:41] If we need to access this ID this is going to be a separate parameter that we can get here.

[03:46] file ID. So let's maybe display it as well file ID and then let's put this and we get this in a separate parameter.

[03:56] We can also have for example prefixes and suffixes before our um parameters.

[04:02] So let's say for example before our ID we're going to have some prefix. Let's say file dash and then the ID. And we need to capture only this part as our ID parameter. Now, of course, if we visit this now, we're going to get file dash

[04:18] as a part of our ID, but we don't need that. We only need to capture this part.

[04:22] So, to do that, we can rename this file and then put file dash here and then put our parameter in curly brackets like so.

[04:34] Now if we save this go back here as you can see we only get this part as our ID even though we have file dash in our URL. Let's maybe try one final thing. Let's say uh we need our file path to be x/yz

[04:55] without the txt part. So let's say um our file is always going to be txt for example and we only need to get this part without txt. So we can make txt part of our file name and only make this part as our parameter our dynamic

[05:12] parameter. So can simply go here and uh let's rename this again. Now in this case we need to capture anything before txt. However, if we put dot here, this is going to uh indicate that this is a child route. But we don't need that. We

[05:29] only need to have .txt as a suffix to whatever comes after this dollar sign.

[05:35] So instead of just dot, we put dot in square brackets like so. And then txt.

[05:42] And then we also need to put our dollar sign in curly brackets like so.

[05:48] This way anything after the file ID and before txt is going to be captured in this dollar sign which we can access using this underscoreplat parameter.

[06:01] So if we save this as you can see uh we get our file path without txt and we get our ID normally and of course as you can see uh you can go crazy with this. You can do a lot of dynamic stuff here.
