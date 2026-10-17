---
title: "Search Parameters"
lang: en
chapter: router
slug: search-parameters
order: 12
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=4610s"
---

> **Code repository for this lesson**
>
> Branch: [`search-1`](https://github.com/alialaa/tanstack-router-course/tree/search-1)


[00:00] Search parameters are a great way to store the state of your application. So let's say you have an application that maybe has a lot of um filtering, pagionation, sorting and so on. If you store this information, the information

[00:13] regarding the current page for example, uh the current filters and so on in the URL. This means that you can easily maybe share this URL or bookmark it or open it in a new tab without losing the state since the state lives in the URL.

[00:29] Unlike when you for example store your state uh or store these information in a react state once you navigate away from the page or refresh or anything like that you are going to lose this state.

[00:40] So if you have an application that maybe relies heavily on search parameters to do things like filtering pagionation sorting and so on. It is important to be able to manage search parameters easily.

[00:51] Being able to validate search parameters, have type safety for search parameters when you manipulate them and also be able to store complex data uh like arrays and objects for example in search parameters and not just simple

[01:05] strings. TanStack router allows us to do all of that pretty easily. So let's see how can we manage search parameters in 10 stack router. So I'm going to assume we have a new route here. Uh let's say maybe for products. So

[01:20] products.index.tsx.

[01:24] And maybe in here we're going to have a list of products or so. And we're going to have some filters to filter our products. Pagionation sorting and so on.

[01:32] So let's create this route. And now we can visit this route by going to slash products.

[01:40] And now let's say uh in our homepage for example. So let's go to our index and let's say in here we're going to have a link that is going to take us to the products route. So let's say products with filters and let's say we

[01:56] need to include some filters in our search parameters.

[01:59] So we're just simply going to go to our products route and then to add some search parameters we simply add a search uh prop here and then in an object put our parameters. So in here I'm going to put some items and as we mentioned

[02:15] intense stack router we can pass anything here. We can pass strings. So sort by price for example. We can pass arrays. Maybe filter by product type and pass an array here. We can have a pageionation which can be an object with

[02:28] our page and page size. We can have another array filtering by colors. We can have a boolean as well and so on.

[02:37] Now, if we save this, go to our homepage and click on this link, which is uh this one, products with filters. Let's actually add a new line here.

[02:51] We're going to go to a link with all of our uh all of our stuff included, all of our search parameters. So, as you can see here, we have products and then we have our sort by and our encoded array and object and so on. So in our search

[03:04] parameters we can pass any JSON serializable data like as we've seen here arrays and objects and so on and then stack router is going to serialize it in the URL as we see here and when we use it in our route it is going to des

[03:18] serialize it and get it back to this state here uh where we're going to have an object with our strings arrays and objects and so on. If you take a look at our dev tools here in here, we're going to find our search parameters and as you

[03:33] can see, uh I'm not sure if we can move this like so. As you can see, we have our search parameters here. We have our sort by price. We have our arrays pagination object and so on. I guess we just need to Yeah, here we go. And now

[03:49] of course we can access our search parameters in our component or in load functions uh that we're going to discuss later of course. So let's try in our component to access our search parameters. And this can be done

[04:03] by accessing in our route uh another hook which is called use search. So use search like so.

[04:12] And uh from here we can get our search parameters. Let's actually try to log these and we should get the same stuff that we uh that we've seen in the dev tools. We have our object containing our uh colors pagination product type and so

[04:27] on. And of course now we can use this information in our component to maybe highlight the currently selected filters and so on. But as you can see when we created this link in our homepage to link to the products uh route we did not

[04:41] get any type safety when we specified our search parameters here. We can just pass anything and we're not going to get any errors. We can maybe set this to be a boolean. We're not going to get an error and so on. So let's now see how

[04:54] can we validate and add type safety to our search parameters. So in our component the component where we pass our search parameters which in our case the products component in here we can pass a function called validate search.

[05:09] In validate search we're going to get the search parameters that we are passing in our URL. So this is going to be an object. So we can give it a type of record where the key is going to be a string. The value is going to be

[05:22] unknown. Right? And in this function we can return an object where this object is going to contain our validated and typed search parameters. So what we receive here as an argument is whatever we pass to our URL which can be any

[05:40] untyped unvalidated data. And in this function we're going to take this validated and give it a type. So for example let's maybe do it for now for sort by. So let's say sort by uh needs to be a string. So in here we can pass

[05:57] search do sort by as string give it a type of string and maybe if it does not exist let's pass an empty string.

[06:07] So now by having that we're going to get errors because we are passing stuff that we are not specifying here. So let's maybe remove these for now. Maybe comment these. And now we're not getting an error because we are passing sort by

[06:20] as a string. If we maybe pass it as a boolean, we're going to get an error because we specified this to be a string here.

[06:29] And now this link is still going to work. But of course, we're only going to get uh the sort by parameter here.

[06:36] However, it is recommended, especially if you maybe have a lot of uh search parameters in your component, to use a validation library like Zod. So in case
