---
title: "Adding Pagination"
lang: en
chapter: router
slug: adding-pagination
order: 20
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=8161s"
---

> **Code repository for this lesson**
>
> Branch: [`loaders-2`](https://github.com/alialaa/tanstack-router-course/tree/loaders-2)


[00:01] But let's now say we need to implement pagionation for our list of posts. So let's say in our URL, we need to be able to pass uh a URL parameter. Let's say page. And if we set it to two, for example, we need to load page two. Of

[00:14] course, currently um this is not going to do anything since in our load function we are not passing a page here.

[00:20] So remember in this function get posts.

[00:23] We can pass a page and this is going to add a skip uh in our URL call and it's going to load a different page. So I'm limiting by 10 posts here and then I'm skipping by the page number multiplied by 10. So if we call this function and

[00:37] pass it whatever we have in our URL parameter, we should load the next page.

[00:41] But there is something important that you need to know when you try to access search parameters in your load functions.

[00:48] Let's first um add this search parameter. We've seen how to do that before. So let's do it quickly. So we just need to import um z from Zod. And then we define our schema. We're going to just have a page of type number. And

[01:01] let's also make it optional. And if it does not exist, we're just going to fall back to one. And now in here in our route we just need to pass our validate search and pass it Zod validator since we are using Zod and then pass this our

[01:16] schema like so.

[01:19] But as we've mentioned in this loader function we don't have access to our search parameters and we need to access our search parameters here in order to get the page and boset to get post function. So why don't we have access to

[01:31] search parameters here? There is actually a reason for that. So tst query is going to as we've mentioned cache the data that we return here from our loader function. And since in our case the data that we return in our loader function is

[01:45] going to depend on something in our search parameters which is the page. In this case we need our cache key to be unique based on the route name which is /osts but also based on the page that we're trying to load. So when we cache

[02:01] the posts route, we need our cache to take into account which page exactly we are caching so that when we try to load a certain page, we're going to get the correct cache for the correct page. If we don't take this uh page search

[02:15] parameter into account when caching our data, we might get a wrong page or wrong data when we load our data from the cache. And don't worry, we're going to talk more about caching later. So if we have access to search parameters

[02:27] directly here in our loader function, this can lead to bugs because we need to somehow explicitly let tack router know which data exactly in our search parameter we depend on to load our data so that it can catch our data correctly.

[02:43] So we can do that by specifying loader dependencies here or loader depths and in here we're going to get a function and in this function we're going to have access to our search parameters. So let's just uh return

[02:55] something here and uh here we have access to search parameters and we can return an object with the stuff that we depend on in our search parameters. So in our case it is just the page. So we can return the page in an object and

[03:11] access the page from our search parameters page like so.

[03:16] By doing this, since we are accessing search page here, this is going to be a dependency to our load function and it's going to be taken into account when caching our data. And now since we are specifying our dependencies here in our

[03:29] loader function, we have access to these dependencies. So in here, we have access to dependencies like so. And in dependencies, we're going to have access to our page which we are returning here.

[03:41] And by doing this this way, TanStack router will be aware exactly on what you depend on from your search parameters and caching should work correctly in this in this way. So let's now try to load different pages. Uh let's why don't

[03:56] we um before our title maybe put our ID here. So post do ID so that we just uh know uh we just can make sure that you're loading different posts for different pages.

[04:09] So now if we go to /posts, uh looks like we're getting page two.

[04:14] Maybe you have a bug here. Oh yeah, sorry. This should be page uh -1 * 10.

[04:21] So that when we load page one, our skip is going to be zero. Sorry for that.

[04:27] So now if we refresh here, we should get the first page. Now if we pause here page two we should get the second page page three and so on. And now you can just simply uh add pagionation buttons here to uh go to the same route and just

[04:46] update this page parameter and we've seen how to do that in a previous section. So let's have a quick example here to add a button maybe to go to the next page. Uh so in here in our component maybe after the posts loop

[05:00] let's maybe remove these old links. I'm going to put this link here where we navigate to our current route which is the post route. However, we just update our search parameters. Uh I'm passing a function here where we're going to have

[05:14] our previous search parameters. So we increment the previous page and fall back to one if uh we did not have a previous page. And of course you can do the same for a previous page button. And uh you know you can add conditions to

[05:26] show or hide these buttons. So if you are in page one for example uh you should not have a previous page button.

[05:32] If you are in the last page you should not have a go to next page button and so on. So you can add these conditions as well. But let's try this. So go to next page and uh as you can see looks like it is
