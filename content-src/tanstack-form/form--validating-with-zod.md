---
title: "Validating with ZOD"
lang: en
chapter: form
slug: validating-with-zod
order: 11
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=4367s"
---

> **Code repository for this lesson**
>
> Branch: [`zod-1`](https://github.com/alialaa/tanstack-form-course/tree/zod-1)


[00:00] So as we've seen in tst form we have a lot of flexibility when it comes to validation we can choose when exactly to validate and we can also provide our own functions to perform our validation logic. However, as your forms grow or if

[00:14] you have a large application with a lot of forms, providing your own functions here can be a little bit verbose and you can find yourself writing a lot of code just for validation. So using a schema based validation library can make this

[00:27] whole process a lot easier. Tense tag form supports multiple libraries like Zod and Valbot and more. However, we're going to use Zod in this video. So what we can do instead of writing our own validation functions, we can just write

[00:40] a single schema and pass it to our entire form to validate all of our fields. We can also if we would like validate fields separately as well. So similar to what we can do with these functions, we can validate using Zod on

[00:54] the field level and also on the form level as well. So let's see how can we do that. So what I'm going to do is I'm going to remove any validation that we've done so far. uh so that we can just have a form without any validation

[01:06] and we can do our validation from scratch using Z. So we have validation here in validators in confirm password.

[01:13] Let's remove that completely. I think we also had it in the first name as well.

[01:18] So in the first name we had validators.

[01:21] Let's remove that. And uh I guess uh that was it. On the form level we had we used to have validations but we already removed uh validations on the form level. We only have validation logic here which I'm going to keep because

[01:34] we're going to use it later as well. So right now we have a form without any validation. Right?

[01:42] So let's now install Zod. So I'm going to go right here and just do mpm install Zod. And now let's use it. So I'm going to import Zod in here like so. Import everything as z from Zod. And we can define a schema for our entire form or

[01:58] we can also validate fields separately using Z. So we can go maybe here in our first name field for example and we can still have our validators like so and we can still have our own change validate on change but this time instead of

[02:12] passing a function we can pass Z dot uh we need this to be a string. So Z string and then we can say let's have a minimum length of two for example. So we can pass min too like so and we can also pass um a message. So let's say first

[02:30] name should be at least two characters.

[02:33] We can also pass max and so on. If you are familiar with sod, you should be already familiar with this.

[02:40] So now if we let's say type something that has an error uh we're going to get an object here because when we do validations with sod uh our validation error is going to be a little bit different. and it's not going to be a

[02:52] string. As you can see here, we have in our errors an array of objects, not an array of strings. And in each object, we have our message. So, we have first name should be at least two characters here.

[03:04] So, what we need to do is we just need to modify the markup where we display our error. So, instead of displaying our errors like so, we will need to loop through our errors array. So, we can do a map here. And then for each error,

[03:17] we're going to have our um error methods. So we can maybe just return the error dot message like so. So this is going to return an array of our messages and we just need to join them in order to make them a string. So we can just

[03:32] join and as a separator let's do our comma like so.

[03:37] Now if we save this we should have our error message like so. And of course we can also do the same with on blur and so on. So let's maybe add another one with on blur. And let's say this time we need to do something uh that we cannot do

[03:51] with the Z functions directly. So oh sorry not here not in our listeners in our validators. So in Z we have functions like min max and so on to check for things uh that are most commonly used. But let's say we need to

[04:06] validate similar to what we've done uh at some point to validate that our name is not equals to join uh to John. What we can do is in this case in Zod we have this refine function that we can use. So we can do Zod or z string. So we need

[04:20] this to be a string. However, instead of minimum and maximum, we can pass refine here to check for something in our uh in our string. So in here we can pass function. We're going to get our value.

[04:31] We can check maybe that our value is not equals to John. And if what we return from this function is false, then our field is going to be considered invalid.

[04:41] And we can return a message here. So we can pass an object with a message or actually sorry an error and we can say let's say uh first name cannot be John.

[04:56] So now if we we are doing this on blur.

[04:59] So if we type John here and blur our field we should get our error. First name cannot be John. Also in our error map we still get everything. We get the error from unblur. However, this time it is an array of objects and not an array

[05:14] of strings. However, it is probably more convenient when we are using Zod.

[05:19] Instead of validating each field on the field level, we can define a schema for our entire form and validate on the form level instead.

[05:27] So, I'm going to remove these. Uh, so this was just an example. Let's remove it for now. And let's do validation for our entire form by defining a single schema. So, in here, um, of course, don't worry. We're going to clean things

[05:40] up later. Uh we're just putting everything in one file for now. So in here maybe uh after this interface I'm going to define a schema. So let's call it form schema. And then in here we need to define a schema for all of our

[05:54] fields. So it's going to be a Zod object containing all of our fields which are first name, last name and so on. So I'm going to paste this. Uh it is very straightforward. So in here I have a schema uh where I just

[06:09] define the validation rules for each field. First name should be a string should have a minimum of two maximum of 50 and so on. And also we have a an age should be a number minimum maximum and so on. Acceptance should be a boolean.

[06:23] Email should be an email. So that the email is going to validate the email field to be a valid email address and so on. If you are familiar with that uh this should be very straightforward. Uh if not we can maybe do a video about

[06:35] Zod. Let me know if you'd like to do a dedicated video just for Zod. Anyways, we also have our address which is a nested object. So we have another Zod object and then we have our street, city, state and so on.

[06:48] And then our skills which is a zot array and in each array we have an object uh in each array item we have an object which contains name id and a level and the level is an enum with beginner intermediate expert and so but now that

[07:02] we have that first of all remember we have defined our default values and we've given it a type of register form which is the interface that we defined here. However, now that we have this Zot schema, we can maybe remove this

[07:16] completely and using Zot, we can infer our TypeScript type from our schema. So by defining the schema, we can somehow create or infer a TypeScript type from the schema instead of having to define our type like so. So when we give a type

[07:33] to our default values, instead of doing it like so, we can use Z.infer infer and we can infer the type of our schema by adding here in a generic uh type of and then the the name of our schema which is form schema like so. And now finally um

[07:52] in our form when we define our form using use form we can pass our validators and this time it's a schema and not a function. So we can pass here let's say we need to do on change. So sorry on change and we can do uh we can

[08:07] pass our form schema like so.

[08:11] So great uh let's give it a try. Let's also maybe just remove this um object here so that we can see things clearly.

[08:19] Let's give it a refresh. Let's type something. And as you can see we have errors. As we type uh we just need to modify the um how we display the errors similar to what we've done for this first field. So, let's actually do it

[08:32] quickly. Let's copy this. Remember, we uh are mapping through an array of objects now. So, we need to modify the rest of the of the fields. So, let's copy this and let's put it for all of our fields. So, let's maybe do it for

[08:45] first name. And also, don't worry, we're going to clean things up later. For now, we're just focusing on the concepts. So, let's do it for first name. Let's do it for replace this for this field, which is address.

[08:59] uh for password as well. Let's do let's do it for password itself as well because we have some validation rules for password and let's do it for confirm password.

[09:12] We also had it in uh the here for the skill level. So let's remove this uh this old one, replace it with a new one.

[09:21] We also have uh the accept terms field.

[09:24] Let's also if we don't accept the terms we need to display an error. We already have uh a validation rule for that defined in our schema. We have an error message as well. So if we don't accept the terms, we need to

[09:38] display an error. So let's go to our accept terms uh field which is here.

[09:44] And let's maybe after this label display this error as well.

[09:50] All right. So now we should have our errors displayed for all of our fields.

[09:55] Uh up here we remember before our form we were displaying errors that are related to the entire form and not uh just a specific field.

[10:05] And these are also now an array of objects instead of an array of strings.

[10:09] So we need to modify that as well. But let's maybe just for now remove this completely. And I'm just going to display the um the JSON for our form errors. So if we save this, we're going to get an array of errors for all of our

[10:23] errors. However, we don't need that. Uh what we're displaying here for now is enough. So I'm going to just comment this for now. Right.

[10:33] The main problem here now is if we refresh, if we type something in first name, all of our fields are going to be validated. And this happens by default when we use Z because we are passing uh our validation schema here that happens

[10:47] on change. So all of our fields are going to be validated against this schema whenever we change any field.

[10:55] Right? So if we would like to not display an error if we if we did not change a field, we can just um go uh let's just have an example in maybe this uh street for example. So let's go to the street. When we display our error,

[11:11] we can check is valid. But we can also check if the field um is touched and only display the error if the field is touched. Or maybe we can use is dirty as well. So we can check here if field state uh meta dot is let's say is dirty

[11:30] and save this. And now if we refresh type something here the error for street is not going to show up until we actually uh change something in street.

[11:40] And we can do that for all of our um errors. However, I'm going to remove this for now because later we're going to uh clean things up and move how we display errors in a separate component and so on. So let's maybe just remove it

[11:52] for now and later we're going to handle this, right? But then we also have this
