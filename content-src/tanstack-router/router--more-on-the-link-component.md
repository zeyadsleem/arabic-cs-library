---
title: "More on the Link Component"
lang: en
chapter: router
slug: more-on-the-link-component
order: 15
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5776s"
---

> **Code repository for this lesson**
>
> Branch: [`more-on-link`](https://github.com/alialaa/tanstack-router-course/tree/more-on-link)


[00:01] links, we've been using in this two prop the absolute path to a route when we need to navigate to a certain route. So, in here, for example, we need to navigate to the products route. So in here we put the full path to the

[00:14] products route. And if we if this was nested somehow, we're going to need to put the full path like so.

[00:21] We can either do it like so by hard coding the route name and if we have any typo, we're going to get a type error.

[00:27] Or we can also do it dynamically by importing. So I'm currently in my home route. If we need to navigate to the products route, we can import from the products route this route constant that we are exporting here. And in this

[00:41] constant in this object we're going to get a two property where we can dynamically pass our uh the path to our route. So for example I can import route from products index as products route for example. And then in here

[00:56] instead of passing this like so we can make it dynamic by putting products route dot two. And this is going to dynamically put the path to the products route. This can maybe be useful if you at some point changed uh the route name

[01:12] which is maybe unlikely but if you do so you will not have to update your links since you are having dynamic uh two prop here. What we can also do with this link component is in addition to having absolute paths we can also have relative

[01:25] paths by passing a from prop in addition to the two prop. So in the two prop we can have a path relative to whatever we pass to the from prop. So let's explain more by maybe going to uh some nested route that we have. Let's say the one

[01:39] for editing a post. So posts uh/post id/edit for example. And in here let's say we need to uh navigate from posts/post ID/edit back to posts. So of course let's maybe add a new line. Of course we can just simply

[01:56] uh add a link. Let's say all posts. And we can simply add two here and navigate to posts like so. Uh let's import link.

[02:08] And now let's try to visit this route.

[02:10] So posts slash any id /edit. And uh let's save this. And we're going to have this link where we can navigate back to all posts. However, what we can also do is uh let's maybe duplicate this link.

[02:24] And we can pass a from prop here. And in from we can either also hardcode um a route that we need to navigate from. So let's say this edit route posts post id edit.

[02:38] Now into in the two prop we can put a path relative to from. So we need to navigate from this route to posts. So we need to go uh up. So we can go up like so. And as you can see we also get auto completion. If we put a wrong relative

[02:54] path here we should get a type error as well. So we need to go up one level and then up again and then up again and then go to posts like so. So this is the path to posts relative to uh the posts/post id/edit.

[03:10] And if we just add a new line here and if we try this it should work as well.

[03:16] What we can also do is instead of maybe hard coding this route since we are already in this route let's maybe duplicate this link.

[03:24] Let's add a new line. Since we are already in this route and we have our route here, we can get the full path of this route in this route object as well.

[03:33] So instead of hard coding this, we can pass uh in here route dot full path and this is going to be the full path of our uh edit route that we are defining here.

[03:46] So this should also work the same. And uh let's say for example we had a a mistake here. Maybe we go up only two levels instead of three. We should get a type error because as we know now everything is type safe in Danstack

[04:02] router. Now let's say we are uh still in the edit route. So posts post id edit and maybe we need to have a back button that is going to take us to u the post that we are editing. So by back I don't mean clicking back on the browser and

[04:17] going to the previous link that we were visiting. What I mean is going from edit from the edit route to its parent which is posts / id. So we can also do that using relative path as well. And in this case we don't even have to pass the

[04:31] from. What we can do is we can just add a link. Let's say back to post and in here instead of two we can just add dot dot in order to go up one level uh in our route tree. So by having this if we click on back to post

[04:50] we should go to the post/ id route.

[04:55] But if we specified the from here then we're going to navigate to the parent of whatever we pass in from not the parent of the current route. So if we for example pass maybe the about route then by putting two dots here we're going to

[05:11] go to the parent of about which should be our home. So, if we go back now to this edit post route and click on back to posts, we're going to go to our home, right? But I'm going to remove this. And what we can also do is instead of two

[05:26] dots, we can only add one dot, which means we need to navigate to the same route that we're currently in. So, if I save this and click on back to post, nothing is going to happen. So, I'm going to change this back to two dots.

[05:41] So, how this can be useful navigating to the same route? It can be useful when we need to navigate to the same route that we're currently in and update some search parameters that we have in our uh route. So maybe let's go back to the

[05:54] products route and remember in here we had some search parameters. Let's say in our products route we have a component where we can update our filters and so on. So we need to navigate to the same route products

[06:08] but update some search parameters. So we can use dot in order to do that. So in here let's maybe add a new link by importing link from tst router. And let's say maybe we need uh we need to have some sort of pagionation where we

[06:25] need to go to the next page. So we need to keep everything that we have in our filters but update this pageionation object with our next page. So remember our pageionation is an object with a page and page size. So let's say we need

[06:40] to keep everything but update this page inside of this pageionation object.

[06:46] So let's say go to next page and in here we need to navigate to the same route that we're currently in products. So we can put just a dot. However, in search we can now have a function where we are going to get our previous search

[07:00] parameters and we can uh just return an object with our new search parameters.

[07:06] So we need to keep our previous search parameters but only update pagenation sorry pagionation and pagionation is an object. So we need to also keep everything that was in it. So previous

[07:20] dot uh pagenation and only update the page and for the page we need to increment it. So we can just simply uh get the previous page. So previous pagionation page and just add one. If pagionation uh does not exist for any

[07:38] reason, maybe we need to fall back to page one. So what we can do is we can just put this in brackets and let's say or one here. And now if we save this, we have this link to go to the next page.

[07:52] And uh let's also maybe open the console in order to see our search parameters.

[07:57] So currently we have pagionation with page one. If we click on go to next page, we should have pagionation with page two. Click again page three and so on. And of course, this should be reflected in the URL as well. And if we

[08:12] are loading data based on this page search parameter here, our data should be reloaded and we should fetch our new page as well. So great. Uh one last thing I would like to mention about this link component is you can pass a hash as

[08:26] well. So let's go to home maybe uh here and in here as well. And let's maybe for any link that we have um add this hash prop and pass something.

[08:38] So let's say you need to navigate to a section in your page, a div that has an ID, a specific ID. Then we can pass this ID here. Let's say maybe section one.

[08:51] And by doing so is going to add a hash to the URL. So, if we click on this link now, as you can see, we're going to have this hash here. Uh, and if we have this uh a div with this ID in our route, we're going to scroll to this part in

[09:06] our page. Of course, currently we don't have it, but you get the idea.
