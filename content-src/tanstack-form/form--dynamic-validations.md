---
title: "Dynamic Validations"
lang: en
chapter: form
slug: dynamic-validations
order: 9
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=3934s"
---

> **Code repository for this lesson**
>
> Branch: [`validation-4`](https://github.com/alialaa/tanstack-form-course/tree/validation-4)


[00:01] addition to on change on blur on change as sync on blur a sync onsubmit and so on we also have one option that we can have here which is on dynamic. So on dynamic allows us to change when exactly the validation is going to run however

[00:17] dynamically. So we don't have to make it always on change or always on blur. We can make it dynamic based on the state of the form. So for example, let's say we need to run our validations on submit initially before we submit the form for

[00:32] the first time. But if we submitted the form for the first time, now we need our validations to run on blur for example or on change or anything. So we need our function here to be somehow dynamic. So to do that we have on dynamic as well

[00:47] and of course also on dynamic async. So to keep things uh simple, let's maybe remove uh the async one and let's also keep one validation which is uh which checks for the length here. However, let's change it from onchange to on

[01:03] dynamic like so. However, in order for on dynamic to work, we need to go back to our use form hook here and we need to pass an option which is validation logic. And in here we need to import a function called revalidate logic.

[01:20] uh that we can import from um pstack React Form like so. Revalidate logic and we just call it like so. And what is going to happen now is by default when we use this revalidate logic function it is going to make this on dynamic behave

[01:38] like so. Our validation is going to run on submit initially and then after our first submission our validation is going to run on change. So let's maybe try to refresh this. Type something here that has an error. We don't get validations

[01:53] because our validations are going to run on submit. So let's submit.

[01:58] Now after submitting we get our error.

[02:01] But then since we submitted our form for the first time now our validation is going to happen on change. So as we type now we're going to get our validation.

[02:10] We can customize this behavior by adding some options to this revalidate logic function. So in here we can pass an object. We can pass a mode here and this is going to be the initial mode. So let's maybe keep it as submit which is

[02:25] the default. However, we also have this option mode after submission which is going to be the mode after we submit our form for the first time. By default it is unchanged. Let's maybe make it blur.

[02:37] Now let's refresh our form. Type something that has an error. Initially we don't get validation. When we submit, we get our validation error. Now, if we type, we're only going to get our validation once we blur. So, I'm going

[02:52] to blur now. Now, we get our validation like so.

[02:57] All right. So, I hope this is clear. And also notice that in our error map now, we get on dynamic as well. So, that if you need to know uh that this error came from on dynamic, you're also able to know from this error map as well. And by

[03:11] using uh on dynamic it does not mean that you cannot use other validation functions as well in addition to on dynamic. So in here you can normally have an onchange validation on blur validation on submit validation and so

[03:24] on in addition to on dynamic and as we mentioned on dynamic have an async version as well on dynamic async that you can use. Sometimes our validation
