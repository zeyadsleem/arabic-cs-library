---
title: "Field Level Validations"
lang: en
chapter: form
slug: field-level-validations
order: 6
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=2651s"
---

> **Code repository for this lesson**
>
> Branch: [`validation-1`](https://github.com/alialaa/tanstack-form-course/tree/validation-1)


[00:02] validate our fields in tst form. So in tst form, we can either do validation on the field level for each field or we can also do it on the form level as well.

[00:13] And we're going to see how to do both.

[00:14] But let's maybe first uh start with the field level. So let's say we need to validate this first name um field here.

[00:22] Then what we can do is simply add a validators prop here. And we can validate um or we can choose when exactly to perform our validation. So we have on change here. We have on blur. We also have on submit when we submit our

[00:37] form. And also we can do it dynamically using on dynamic which we are going to discuss later as well. But for now let's say we need to do our validation on change when we change uh our field or as we type in our field. So let's add in

[00:50] change here. And also validation can either be synchronous or asynchronous.

[00:55] So maybe in some situations we need in order to validate our field we need to maybe send some network request. This is also supported in 10 stack form using on change a sync on blur a sync on submit a sync and so on. And we're also going to

[01:09] take a look at that later. But for now let's focus on the basic validation using an onchange function here. So now in this function we're going to pass um or sorry we're going to get an argument here containing our value. So we can

[01:22] dstructure our value from here and we are going to get our value and we can do uh we can write some logic here in order to validate this field. So for example in here let's say we need our field to be at least two characters. So we can

[01:36] check here if our value.length length is maybe less than two then we can return something and if we return something here that is not false then this is going to be considered an error so we can simply just return a string with an

[01:53] error message for example so I'm going to return this message here first name must be at least two characters and now if you save this let's also remember we had um in our field we were displaying the meta information for our field let's

[02:07] maybe get this back so that we can see it. And as you can see for this field, we have errors. We also have error map and error source map and so on. And this is going to contain information about our errors. So now that we're doing our

[02:21] validation on change, now as we type here, we should get our error messages if we have any validation errors. In our case, we have one character here. So we get in our errors an array with our errors. And this is an array because we

[02:32] can have multiple errors as well. And also we get this error map containing the function that triggered this error which is in our case on change and the error message because we can also have multiple functions here. We can have

[02:47] validation that happens on change and validations that happen on blur as well.

[02:51] And we're going to get uh which error happened by which function in this error map here. But now if we continue to type uh we don't have errors now. So this uh these errors are going to be gone.

[03:05] Right? So now that we have that uh why don't we show this error after our field. So after our input when we display our input here let's add a condition and check if we have any errors. Let's display it somehow. So in

[03:18] addition to these errors we also get uh this is valid property here which is going to be false if we have any validation errors. So we can check for that here. So let's say if not valid. So if not field uh state dot meta is valid

[03:35] then our form is not valid. We have errors and we need to display them. So let's display some errors here. And our errors is going to live in this errors array in addition to this error map as well. So depending on what on how you

[03:47] want to display your errors, you can choose uh one of these. For now I'm just going to use this errors array. So I'm simply just going to put a div with a red text here. And in here I'm going to uh remember this is an array. So we need

[04:02] to display all of our errors. For now I'm just simply going to convert this array into a string using join. So let's get our errors. Oh sorry our errors array like so. And then use join to create a string from our array and uh

[04:18] use a comma as a separator. So now by having that we should get our error displayed here.

[04:28] And as we type our validation is going to happen and our errors are going to show and hide as we type. Of course we can also change this and make it on blur as well so that uh sorry on blur so that our validation only runs when we blur

[04:43] the field. So oh sorry not in listeners but in validators here. Let's also give it a refresh. Now, as we type, nothing is happening. But if we blur our field uh and we have an error, we should get our error. Yeah.

[05:01] All right.

[05:02] For now, I'm going to maybe keep it as unchanged. And now, let's do something.

[05:07] Uh I'm going to maybe just comment this for now so that we have our whole form here. And let's say if we have errors in our form, if we have any error, we should maybe disable this submit button.

[05:22] So how can we do that? We need to subscribe to something in our form state. So remember we can do that either using store or we can do it also using the subscribe component uh that we actually have used here as well. I'm

[05:36] going to use subscribe because we need to change something in our UI based on whether we can submit our form or not.

[05:42] So in here, let's go to our submit button and uh down here. And I'm going to maybe just cut it from here for now.

[05:51] And then wrap it in this subscribe component. So in here, let's use form.subscribe. And what we need to subscribe to is something in the state of the form, a flag that is called uh use can submit. So as a selector here,

[06:06] I'm going to pass a function in our function. Remember we get the state of our form and we can subscribe to things uh sorry we can subscribe to things in the state of our form. What we need to subscribe to is state dot cansubmit.

[06:22] This is going to be false if we have any validation errors. And now in our children we can pass a function where we are going to have our state that we subscribe to. So let's here in here pause function. We're going to have

[06:34] access to can submit.

[06:36] And now from this function we can return our button. So I'm going to paste back my button. But now we have access to can submit and we can disable our button if we cannot submit. So if not can submit we are going to disable uh the

[06:50] button. Also to make this uh visible I'm going to if our button is disabled um make maybe the opacity maybe 40 or so.

[06:59] And also let's add uh if we are disabled let's make the cursor not allowed. So let's add here cursor and uh not allowed as well.

[07:10] So now as you can see our button is disabled but if we don't have any errors our button is going to be enabled again.

[07:18] Great. So one more thing that we can do as we've mentioned remember let's get back our uh comment for our state for the meta data for our field our first name field here. And we've seen this error map property that we have here

[07:33] that's going to contain our errors if we have errors. However, unlike this errors property that is just going to be an array of errors, this is uh going to be a map where we have additional information of how this error happened

[07:45] whether using the onchange function on blur and so on. So let's give it a quick try here by adding an unblur function here as well because we can do validation using multiple functions. We can do validations as we type and also

[07:58] we can do other validations as we or when we blur our feed. So we can add an own blur here as well. And we're also going to get our value and let's say let's do sorry let's do some other validation here. So let's check maybe if

[08:12] our value is maybe not equals to John.

[08:17] Let's return another error and let's say your name must be John. So now and this maybe give it refresh as well. So now as we type the error from onchange is going to happen. However when we blur the other error from on blur is going to run

[08:36] and we now get two errors. We have our error from onchange and our error from on blur in this array. However in addition to that in this error map we also get both of our errors. But this time we know that this error happened on

[08:49] blur and this one would change. And maybe uh you might need to use this information in your UI somehow. For me, I'm not going to use it, but I just wanted to mention that you can also have um multiple validations using multiple

[09:03] functions in this validators prop here.
