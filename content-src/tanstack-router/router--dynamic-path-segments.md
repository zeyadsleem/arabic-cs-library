---
title: "Dynamic Path Segments"
lang: en
chapter: router
slug: dynamic-path-segments
order: 9
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=3199s"
---

> **Code repository for this lesson**
>
> Branch: [`dynamic-path-segments`](https://github.com/alialaa/tanstack-router-course/tree/dynamic-path-segments)


[00:01] Of course in many situations in your applications you are going to need to have routes with dynamic parameters. So we might have for example a blog or so and our URL should be maybe posts/ some ID and this id is a dynamic parameter.

[00:16] It is not something that we know. So in this case we also use a special syntax when we name our files and folders. For the rest of uh this video I think I'm going to carry on with this flat way of doing things. However, of course as you

[00:31] know anything that we can do using this flat way can be done in folders as well.

[00:35] All right. So let's create uh let's say we need to have um some routes. So let's say we have our root route here and we need to create three new routes. One for posts is going to be a list of posts. So we're going to have here posts and then

[00:53] we need to have posts/ ID. However, keep in mind that posts/ ID should be a separate route and not a child to posts.

[01:02] So it's going to look like so post/ ID.

[01:05] So let's say this is posts. This is posts / id. And then let's say we need a route to edit a post. So we need our URL to be posts / id/edit. However, also keep in mind that when we create this edit route, we don't need it to be a

[01:21] child to post/ id. We don't need it to be here. However, we need it to also be its own route. Uh posts id/edit because it's going to contain completely different things. it is not going to be a child to post / id. So we will not

[01:37] have this route. Right? So let's see how can we do that. We should already know uh everything we need in order to create this except of course how to create dynamic routes which we're going to see now. So let's first create the slash uh

[01:52] posts route which is going to contain maybe a list of posts. Remember we need this to not be apparent to anything. So to do that we just create a new file and call it posts.index.tsx.

[02:06] By adding this index post is not going to be apparent. It is only going to be matched if our URL is posts exactly not posts uh/ something. We already know that right? So now we have this route and of course by default uh we have some

[02:21] text generated here uh hello posts.

[02:25] Now let's say we need to create posts/ id. In order to create a dynamic route we use dollar sign. So create a new file and then let's say posts and then to have a dynamic parameter we use dollar sign and give it any name. So let's say

[02:40] post ID or so and then uh tsx. And of course if you uh are using the folder way you can create a folder called posts inside of it a file called dollar sign post id.tsx.

[02:53] Right. So now we can visit U posts/ something and we're going to get this route.

[03:01] Now finally let's create our final one.

[03:03] So as we've mentioned we need to have posts uh post/ id/edit right. So we can simply go in here create a new file post dot and then dollar sign post id and then ededit.tsx.

[03:21] However, if we take a look at our dev tools, this edit route is going to be a child to posts/ ID. And as we've mentioned, we need these to be separate routes. So remember how to do that to make edit not

[03:37] use posts/post ID as a parent. We can do it actually in a couple of ways. We can rename this to posts.post ID.index like so. And now this is going to be its own route. If we take a look, we're

[03:53] going to have three separate routes.

[03:55] Posts, post ID, and then post ID/edit.

[04:01] However, we also have another way. So, let's get get this back without index.

[04:07] We have another way using this underscore syntax. So, remember in order to make a child route not use its parent as a layout, we can use underscore, right? So in here in this edit route we can make this route not use posts as a

[04:23] parent by renaming this and adding underscore here after posts. And now as you can see we get the same result posts posts/ost ID/edit and then post uh / id right. So we have these uh two approaches of doing this. Of course, now

[04:44] uh let's say we are visiting some post.

[04:47] So post/ some id in our route. Of course, we are going to need to use this ID somehow. So later we're going to discuss uh load functions or loader functions. This is probably the place that you are going to need to access

[05:01] this ID in because this is where you are going to load your data. However, if you need to access this id in your component as well, you can go here uh in post uh / post id or the edit one as well and we can do something. So in here we have

[05:16] this route. In this route we have a bunch of hooks that we can access. So we can create a new constant here and then route dot use uh params sorry use params. In here we're going to have access to the post ID and it's going to

[05:32] be uh we have auto completion here. is going to be type save and everything. So we have post ID here. Let's maybe put it in a new line. Let's say post ID and put it here. So now we have our post ID.

[05:48] Let's assume uh this component maybe lives in a different file. So we're not going to have access to this route. How can we access use params in this case?

[05:57] So let's assume maybe in our components folder. Uh let's say we have a component for the post. Let's call it post.tsx.

[06:05] And let's actually copy uh our stuff from here. So let's copy that and create a new component and just put this.

[06:17] And now we need to access post ID in a separate component and then use this component here. So let's return this component that we defined like so. So of course we can pass maybe post ID as a prop here. However, there is an easier

[06:33] way to do that. So, let's remove this.

[06:35] You might think uh we can maybe import route this route. We can import it from this file into this file and then use the hook. However, this is not the recommended way to do it. The recommended way to do it is to use a

[06:48] function called get route API. So, let's create a constant here and we can call a function get route API. In this function, we can pass the route that we need to get the API for the hooks of this route. In our case, we need this

[07:04] one posts uh/post id. We're going to get from this an object that contains the hooks for this route. So, we can access use params like so.

[07:15] And then we can simply get uh from use params our post ID. And as you can see, everything is type safe. We have auto completion for everything. And as you can see, this is uh this is still going

[07:30] to work as well.

[07:33] Right. Finally, let's see how can we link to uh parameters with dynamic segments. So let's maybe go to /osts and uh later we're going to have a list of posts here. But let's from now just add some dummy links. So let's go to this

[07:47] route which is posts index.

[07:50] And let's say we need to link to some posts in here. Of course, we still use this link component and let's say maybe go to post or so. However, when we specify our dynamic parameters, we do it in a certain way. So,

[08:06] into we don't put um posts/ the ID itself. We put posts slash the dollar sign post ID which is the post to our folder. And to specify this dynamic parameter and do it in a type safe way, we pass it here in a separate prop which

[08:24] is params. In params, we're going to get type safety. So if we type P here, we are going to get post ID. And if we maybe pass it as a number, we're going to get an error. We should pass it as a string. If we maybe have some typo here

[08:38] in our parameter name, we're going to get an error as well. And so on. By doing this, we're going to get this link. go to post. If we click on it, it should go to this post.

[08:51] We have another way as well. So, let's go back and let's create another link.

[08:55] Or actually, let's maybe duplicate this one. And instead of passing parameters as an object, we can also pass it as a function. So, in here we can get our previous parameters and then we can return an object with our new

[09:09] parameters. So, can return an object.

[09:13] Maybe we need to keep let's say we have multiple dynamic parameters. So let's say we have uh parameter one/parameter 2/ameter 3 and so on and we only need to update one of them and maintain the others. This is going to be uh perfect

[09:28] in this situation. In our case, of course, this will not make a difference since we have only one dynamic parameter. If we have multiple, we can keep the previous ones and update one.

[09:38] In our case, we have post ID and we can pass it here as well. So, this link should work as well. So, now
