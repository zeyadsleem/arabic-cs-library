---
title: "Validating with ZOD (Refine and Async)"
lang: en
chapter: form
slug: validating-with-zod-refine-and-async
order: 12
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=5082s"
---

> **Code repository for this lesson**
>
> Branch: [`zod-2`](https://github.com/alialaa/tanstack-form-course/tree/zod-2)


[00:02] other problem which is uh validating the password. So in our schema we have a validation rule for our password. Uh it should be at least six characters.

[00:12] However, for confirm password, we need to validate that. Of course, confirm password is the same as password. We've seen how to do that if we are not using zot. However, how can we handle this if we are using zot. So, for example, I can

[00:24] type here 1 2 3 4 5 6, I don't get an error here. But if I type something different here, uh I should get an error. But we're not handling this at the moment. So to do that in Zod in our schema. So in this after the closing of

[00:41] this object which is here we can add a refine function. I'm sorry refine to check for custom things like this. So in here we can pass function and we are going to get in this function the value for our entire form our entire object.

[00:57] So let's call it data and then in here we can check data dot password is equals to data dot confirm password. So as we've mentioned before in this refine function if we return false from here our uh field is going to be considered

[01:16] invalid. So if the passwords are not equal this is going to return false and we need to display an error message and we also need to specify which field exactly to display the error message at right. So in the second argument we can

[01:29] pass our message in error. So let's say passwords do not match and we need to display this error in the confirm password field. So we can add a boss here and specify that we need to display this in confirm

[01:47] password. Of course what uh what we type here should match what we have here in our schema, right? And and that's it. So if we save this now uh let's maybe give it a refresh. Type something here.

[02:00] And as you can see we get passwords do not match in the confirm password field.

[02:06] Using refine we can also do async validation if we are using Zod to do our validation. So let's go to maybe uh our first name field and let's say we need to have an asynchronous validation for our first name field. So we can get back

[02:20] our validators in here. Let's say we need to do this on change. So let's add on change async the bounce to the bounce our function. And let's add sorry on change async. And now that we are using Zod in instead of passing a function

[02:36] here we can pass zed we need to validate that this is a string and then we need to refine this and do something asynchronous in this refine function. So refine can also accept an asynchronous function. So we can pass an asynchronous

[02:50] function here where we are going to get our value as well. So we can do something with that send a request and so on. I'm just going to uh simulate that we're doing something here and then return uh something and if this

[03:05] something is false our field is invalid.

[03:07] So let's say if our name is not John and of course the second argument to refine can be our message which we can add here in error. So let's add uh some message here. First name cannot be John.

[03:23] And let's say this is coming from our async um validation function here.

[03:29] So now let's give it a refresh. Let's try to type something here that is not John. And we don't get an error.

[03:36] However, if we type John, after a second, we should get our error here.

[03:42] Let's finally uh try one final thing. So before using Zod we had this on dynamic where uh when we define our form here we pass validation logic and we specify that we need our validation to run on submit but then after the first

[03:58] submission we need our validation to run on blur. We can use on dynamic with Zod as well just in here when we specify our validators we can use on dynamic and pass our schema. And now if we refresh our validations are going to only run on

[04:15] uh on submit for the first time. So after submitting the form but then after that it's going to run on blur as you can see here.
