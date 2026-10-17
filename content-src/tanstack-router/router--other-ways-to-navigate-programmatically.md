---
title: "Other ways to Navigate Programmatically"
lang: en
chapter: router
slug: other-ways-to-navigate-programmatically
order: 16
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=6326s"
---

> **Code repository for this lesson**
>
> Branch: [`other-navigation`](https://github.com/alialaa/tanstack-router-course/tree/other-navigation)


[00:01] Sometimes we would like to navigate to a certain route programmatically without using a link. In 10stack router, we can also do that using the use navigate hook. However, make sure to only use this method in situations where you

[00:15] cannot use uh the link in any way. So, for example, let's say maybe in our u let's say in our edit post route as well. So, let's go to slash posts / some id/edit and let's go to this route here as well.

[00:32] And let's say maybe we have a form uh and when we submit this form we're going to save our post and when we save our post we need to navigate back to the post. So we are in post/ id/edit. We need to navigate back to posts / id.

[00:48] However we cannot do that using a link.

[00:50] We need to do it when we submit our form after saving our post for example. So let's say in here we have a form. Oh sorry a form. And uh let's maybe not have an action. Let's have an onsubmit handler. Onsubmit. And in the form,

[01:06] let's have a button to submit.

[01:10] And now in submit in our event, let's call event.prevent default. And let's maybe simulate that we're doing something by adding some fake uh timeout here. Let's also make this async. And after this timeout, let's say our post

[01:26] is now saved and we need to navigate back to the post uh itself. So what we can do is in here we have this hook that we can import. This one is not inside of route. This one we can just import it for for all of our routes. So let's

[01:41] create a constant called navigate and then import use navigate from uh 10 stack router like so. In here we can also specify the from in order to be able to navigate to relative paths. So let's say we need to navigate from our

[01:57] current route. So we have access to our route here. So you can pass route the full path. This is uh the route of the edit post route.

[02:06] And now using this navigate object we can navigate or sorry this is actually a function that we can call in order to navigate. So in here we can just call this uh navigate function and inside of here we can have the same options that

[02:20] we put in a link. So we have two for example we can also have our search parameters our URL parameters and so on.

[02:28] But let's say two and we need to navigate to post or post id. So of course we can do it like so post id but then we will have to pass uh the id in our parameters like so.

[02:41] What we can simply do is just go up one level in our tree. Since we are already in posts/post id/edit we need to go up one level and therefore since we specified from here we can just go up one level like so.

[02:58] By doing so, let's uh submit this form and wait a couple of seconds and we should go back to the post uh / id route. One thing I would like to mention is we can access this navigate function uh without using this hook which means

[03:15] we can navigate in our application outside of our component. So we don't have to use this hook. How? By coding.

[03:22] So remember when we defined our router uh which was in main.tsx tsx in here we defined this router. This router already contains the navigate method the navigate function and we can posit uh our stuff and so on to navigate

[03:39] in our router anywhere in our application even outside of our components. So we don't have to use the use navigate hook. I think this is maybe something uh you are unlikely going to do but also know that this is possible.

[03:53] Another way to navigate is also using the navigate component. So sometimes in a route you might need to maybe navigate immediately to some other route before rendering the route that you are trying to visit. So let's maybe have an example

[04:07] in this about route. Right? Let's go to this about route uh in here and let's say maybe based on some condition we need to navigate to another route. if we try to visit the about route. So maybe we have a condition

[04:25] here. Uh I'm just going to add if true, which of course doesn't make sense. But let's say we have a condition here. And if this condition is true, we need to navigate to a different route. In this case, it is recommended to use this

[04:36] navigate component that we can import from react 10stack React Router. Instead of using the use navigate hook and in here, you can uh sorry, of course, we need to return this. And then you can navigate to some other routes and you

[04:52] have all the options that you can post to a link. So let's maybe navigate to posts.

[04:59] So now as you can see if we try to visit about I'm clicking on about here but it is going to post. If we try to visit it uh using the URL we're going to get posts.

[05:13] So this is also another possible way to navigate in your TanStack router applications. One final thing I would like to mention regarding uh navigation before we move to something else uh is also we have uh a couple of um a hook

[05:26] and a component here that can be useful sometimes which is use match route and match route component. So you can use these to check if a route is currently matched and you can also check that if the currently matched route is pending

[05:40] or not is currently being loaded or not.

[05:42] And this can be useful if you would like to maybe display some sort of a spinner when you navigate between uh different routes. So we have a component here. Um we have an example here where we have a component and we have a link to a route

[05:53] called users and then we are using this match route component to check if the users route is matched and it is pending. So if it is matched and it is pending we need to display maybe a spinner after this user's link. So this

[06:07] is something that you can do with this component. You can also posit a function here and you can also use it uh in this way. Use a hook. Use match route. From this hook you're going to get a function. You can posit the route that

[06:21] you need to check that it is matched.

[06:23] And you can also pause pending. And you can do something if this route is matched and currently pending in an effect. For example, outside of your markup. If you need to use it in your markup, then the component option will

[06:36] be more suitable in this case. But I guess that's maybe all what we need to do regarding navigation for now. Let's now move to something else which is context. In 10 stack router we have this
