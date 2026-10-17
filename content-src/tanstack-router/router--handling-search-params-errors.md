---
title: "Handling Search Params Errors"
lang: en
chapter: router
slug: handling-search-params-errors
order: 14
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5390s"
---

> **Code repository for this lesson**
>
> Branch: [`search-3`](https://github.com/alialaa/tanstack-router-course/tree/search-3)


[00:01] But now what if someone edited maybe this URL and put wrong types here. So when we navigate inside of our application, if we pass something wrong, we're going to get an error. What if someone uh has a link that contains some

[00:16] wrong information? How are we going to deal with that? So let's say for example uh in sort by here we pass something wrong, something that is not price or oldest or newest. So I'm going to type anything here. And now as you can see

[00:30] we're going to get an error. So we can customize this error page. We're going to talk more later about error handling.

[00:38] But we can basically uh sorry not in here in our products route we can uh simply pass an error component here. And in here we can just pass a function and return some let's say maybe for now P tag. Let's say error.

[00:55] So now we're going to get this. So you can choose to do that display an error if if you have a wrong wrong data in your search parameters or maybe it would be a better experience to maybe if you have something wrong in one of your

[01:10] source parameters just fall back to a default value. So let's see how can we also do that. So let's maybe try it uh with the sort by one only as an example but you can do that for all the other attributes as well. So in Zod we can

[01:25] have a catch here dot catch so that if we had any type error here in our data we can provide a default value.

[01:37] So let's say newest for example.

[01:40] Now if we uh let's also open our uh console. If we save this and refresh we're not going to get an error. And in our search parameters, we're going to get newest in sort by. And also, of course, if you take a look at the URL,

[01:56] it is going to be changed to newest.

[01:59] However, by doing it this way, we're going to lose the type information uh in our link. So, for example, now if we pass anything here, we're not going to get a type error because the type for this is going to be unknown. So

[02:14] to fix this problem, Tstack router provides us with a way to provide a fallback while maintaining the type information. So instead of using cache uh catch here, let's remove this. And what we can do is we can import a

[02:28] function called fallback from the Z adapter then stack Z adapter and wrap our enum with it. And of course it doesn't have to be an enum. We can wrap any type with it. So let's wrap this with the fallback function like so. And

[02:43] then as a second argument to fall back.

[02:45] So in here we can pass a fallback value.

[02:48] Let's say newest. And now if we save this and go back here, as you can see now the type is maintained. If we have something wrong here, we're going to get an error. And if we in our URL pass something wrong in sort by,

[03:04] it is going to fall back to newest.

[03:08] And of course uh as we've done in one of our um parameters the sale one we can also still provide a default value if we don't pass sort by. So when we use fallback we can do this after fallback after closing our fallback function in

[03:22] here we can still provide a default. So we can default to newest for uh for example. And now if we don't pass newest let's maybe remove it from our URL like so.

[03:36] And uh if we take a look uh somewhere in our URL, we should have it. So let's go here. As you can see, we get sort by newest even though we did not uh we did not pass it in our URL.

[03:50] And of course, I've done this only for this parameter, but you can do the same for the rest as well. Provide the fallback in case uh something is wrong with the URL. So this is how we can um validate and type our search parameters

[04:05] in TanStack query.

[04:08] One thing that you can also do now I'm not going to do it but you can take a look at that if you would like. This is a little bit advanced which is customizing how the search parameters are serialized.

[04:20] So as we've mentioned when we pass a a URL here with search parameters it is going to be serialized in this URL and then it is going to be parsed when you use it in your load function or components and so on.

[04:34] You can customize how this process happens how your URL is serialized and parsed and so on. By default 10stack router parses and serializes your URL using JSON stringify and JSON.parse.

[04:48] However, you can customize this by passing a couple of functions parse search and stringify search and doing custom stuff here. So, we have some examples here. Uh maybe using base 64.

[05:02] You can pass custom functions here. You have other examples as well using query string library. You can also use it with stringify search and parse search.

[05:12] However, in most cases, I guess the default behavior is maybe going to be enough. But just know that this exists uh in case you are in a situation where you need to customize this behavior. But now something that you are probably

[05:26] going to have uh in your application when you have a lot of search parameters is uh you're going to probably have a component where where you are going to be able to uh change your filters or allow users to change the filters. And

[05:40] in this case, we're going to need to somehow update certain search parameters while maintaining the existing search parameters. We've already seen how to do that with URL parameters by passing a function to the params um prop here.

[05:56] Instead of just an object, we can do the same with search parameters as well. We can pass a function where you are going to receive your previous search parameters and you can uh return an updated object. However, before trying

[06:09] that, let's maybe u mention some more information about this link component because we haven't yet discussed everything about this link component.

[06:18] So, let's maybe discuss a couple of stuff about it and then get back to this search prop and try to pass a function instead of just an object. So far in our
