---
title: "Validating Search Params with Zod"
lang: en
chapter: router
slug: validating-search-params-with-zod
order: 13
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5016s"
---

> **Code repository for this lesson**
>
> Branch: [`search-2`](https://github.com/alialaa/tanstack-router-course/tree/search-2)


[00:01] you're not familiar, Zot is a library that can help us validate and type data.

[00:06] By defining a schema. So we can define a schema like so. We have an object with a key of name that has a type of string and so on. And using this schema, we can validate objects. In our case, we need to validate whatever we will pass in our

[00:19] search parameters. So let's see how can we use Zod with TanStack router. And by the way, 10stack router also supports other validation libraries as well. But let's for this example use Zod. And to use Zod with tensstack router, we need

[00:33] to install this package uh tense stack and then Zod adapter. This is going to install uh this adapter and also Zod itself as well. So let's install that uh sorry and let's see now how can we use it. So what we need to do uh is we need

[00:52] to define a schema that is going to contain everything that we are going to have in our search parameters. So let's define a schema and inside of it define the types for these things sort by product type pagination and so on. So so

[01:08] I'm going to create a constant here.

[01:09] Let's call it maybe product search params schema. And we need to import zed from Zod like so. Of course you you can call it anything. It is just usually named as Z here and then we need to have an object in our schema. So an object

[01:27] with these things. So first of all sort by and uh in here we can maybe pass it as a string. However, probably in our application we're going to be able to sort by certain things like price um popularity maybe stuff like that. It's

[01:42] going to be predefined things not just any string. So in Zod we can have an enum type. So zed enum. And in here we can pass things in an array. So let's say maybe sort by newest. Let's maybe add another one. Oldest. Let's maybe say

[02:01] uh price and so on. So this is basically the idea. I'm pretty sure you are already familiar with Zod. So what I'm going to do is I'm going to put the rest of our schema here and let's go through it quickly. So for product type uh we

[02:15] have this as an array. Let's also pass it as an enum for the type and let's maybe have an enum of shoes and t-shirts for example and we can have a default as well. Uh so let's maybe default it to shoes. And by having a default here if

[02:29] we don't pass this in our URL uh this is going to be used. We're going to see that in a moment for pagionation.

[02:35] Remember we can have an object with page and page size which are numbers. So here we have Z dot object page page size and they are numbers and they have a default value as well 1 and 10 and then colors and uh an array and this array can only

[02:52] have these things. So an enum red, blue and green and uh we can make this optional. I'm making this optional by passing optional here and then sale uh and this is a boolean and let's also default it to true.

[03:06] So you can put whatever you like here.

[03:07] But now that we have a schema, let's see how can we use it. So in this validate search function, instead of passing a function and doing uh the typing and the default values on our own, we can just remove this. Now, now that we have the

[03:21] types defined here and pass um Zod validator, which we can import from this package uh which we installed, right?

[03:30] And then pass it the schema. So we called it I guess yeah products search param schema. So we can pass this here and just by having that now let's in our URL let's maybe try to not pass anything in this search uh prop and we're going

[03:50] to get an error. Why are we getting an error? Because in here we are specifying sort by to be an enum but we're not having a default value for it and we're not marking this as optional. similar to what we're doing here. So sort by, we

[04:05] have to pass it. So if we pass sort by, we're not going to get any errors. And now if we navigate to this uh link. So let's go to home and then navigate to this. As you can see in our URL, we're not just going to get sort

[04:21] by. However, we're going to get the defaults of the other uh stuff that we have in our search parameters as well.

[04:29] So if you take a look at our logs here, remember we are in our component, we are logging our search parameters in our URL, we're going to get whatever we passed in sort by, but also we're going to get

[04:42] uh so remember in product type, we had a default of shoes. So we get this here.

[04:48] Also in pagionation, we had default values for uh page and page size. So we get these here as well.

[04:55] And also in sale we default uh we defaulted this to true so we get it here right colors however remember we made it optional so we might not have it here the type for colors is going to be uh an array or undefined. So by making this

[05:12] optional it is not guaranteed that we're going to get it in our search parameters. So if we take a look in our component at the type for our search parameters in colors we have undefined here. However, for anything that we have

[05:26] uh that are that is not optional or that we have defaults for we are not going to have undefined. It's going to guaranteed uh to exist in this search object even if we do not pass it here explicitly.

[05:39] Let's also maybe try to pass something uh outside of our enums. Remember here we specified newest, oldest, and price.

[05:48] If we pass something else, we're going to get a TypeScript error. And similarly here, um, if we pass, uh, I guess we have a problem here. Oh, so yeah, this is an enum, not an array of enums. So we need to either pass

[06:04] shoes or t-shirts. If we pass something else, we're going to get an error. In pagionation, for example, if we pass something wrong here, we should get an error and so on.
