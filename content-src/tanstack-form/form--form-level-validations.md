---
title: "Form Level Validations"
lang: en
chapter: form
slug: form-level-validations
order: 7
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=3196s"
---

> **Code repository for this lesson**
>
> Branch: [`validation-2`](https://github.com/alialaa/tanstack-form-course/tree/validation-2)


[00:01] As we've mentioned, in addition to doing validations on the field level, we can also do validations on the form level as well. So in here, when we define our form using use form, we can also add validators here. However, we need to

[00:16] differentiate between two things. We need to differentiate between errors that we're going to return as a general error for the entire form and errors that belong to a specific field. So in here uh sorry this is an object not a

[00:31] function and in here we can pass it the same stuff that we can pass in the field level on change on blur and so on. So let's do unchange for example. But now in this function what we are going to get as a value is the value of the

[00:45] entire form and not a specific field. So let's maybe try the console log this.

[00:50] And this should contain the values for um all of our fields. So in here by the way also let's remove this object that we are displaying here.

[01:01] And now if you go to our console and maybe change something here from this console log in our own change validator which is in line 64 here we we are getting the values for our entire form.

[01:16] So what we can do here is we can check for any field that we need to check for.

[01:19] So let's say uh let's also sorry by the way just to avoid any confusion let's for now comment the validators for the field level and only keep the one on the form level. In here we can check maybe for the first name as well. So value do

[01:34] first name and let's just do the same check that we did. If the first name is not John, we're going to return your name must be John. However, let's give it a refresh. And when we uh return some error in the validators that are defined

[01:49] on the form level, what we're going to return here is going to be a general error for the form. It is not going to be tied to a specific field. So if we type here something that is not John, we're going to get an error for this

[02:02] field because this is not an error for this field. It is a general error for the form. And how we can access this is we can access it in the state of the form itself which as we know now we can subscribe to things in the state of the

[02:15] form using store uh and also using the form.subscribe. But for this time let's subscribe to our errors for the form using the use store hook. In here we can pass the store form.store and in the state of the form we have

[02:32] access to errors.

[02:35] These errors are general errors for the form that we returned from here and not errors related to a specific field. So I'm just going to display these errors just before rendering the form since they are not related to a specific

[02:48] field. We can put these errors before the form like so. Now if we take a look as we type we're going to get this error which is a general error for the form and not an error tied to a specific field. However this does not mean that

[03:04] in this validators object in uh that we define in use form on the form level does not mean that we cannot return errors related to specific fields. We can do that as well. So let's say let's maybe remove this check here and let's

[03:19] say we need to return an error that belongs to the first name that should appear after the first name since we are remember displaying errors here after the input for first name. Let's say we need to populate the errors for this

[03:32] first name. So what we can do is instead of just returning the error we can return an object that contains fields.

[03:40] So return and in here return an object that contains fields and in fields we can then choose a field like first name for example and return an error for first name. So maybe just type some random stuff here uh and save. Now let's

[03:58] give it refresh.

[04:00] As we type here we're going to get this error. Now this error is related to first name since we are returning this fields object here. But now we can do actual stuff here. So I'm just going to do a quick one here. Maybe check if not

[04:14] value. Remember value is the value for our entire form. So if not value first name, let's return first name is required. Save this. Refresh. And now if we as we type remove our first name, we should get first name is required. So

[04:29] from here we can also target specific fields.

[04:32] And now you might be asking how can we target fields uh that are nested like this street field for example. And quite simply we can just uh use dots here again. So address

[04:46] street for example. Let's say we need to return an error for this. Now we can um just do that. I'm also going to do a quick check here. If we don't have value address street return an error. However, remember that uh we are only displaying

[05:01] errors for this input which belongs to the first name field. We need to do the same for the rest of our fields as well.

[05:09] So, I'm going to copy this bit of code that displays the error and put it for the street uh field as well, which is this one.

[05:19] And don't worry, I know this is a bit of a repetition, but later we're going to clean things up and make our form more reusable. But let's put this here for now.

[05:29] And now if we type remove we should get this error for the street field as well.

[05:34] We can also do it for arrays. So if we go back here in our use form validators for our use form in our fields. Remember we have an array of skills. Each uh skill is an object that contains uh the name of the skill ID and a level. Let's

[05:50] say we need to return an error for the level input of the first item in our skills array. We can do that by adding in here skills of zero for example. And then this is an object. We need the level item in this object. And for this

[06:08] level, we can maybe also do a check if our value uh skills of zero dot level is not expert. For example, let's return some error as well. So I'm going to return you must be an expert otherwise just return undefined which means there

[06:25] are no errors.

[06:28] Again we are not displaying errors for this dropdown. So let's do it quickly here. Let's copy this bit of code.

[06:35] And remember this um dropdown was in this sub field that we are looping through. Here we have our dropdown. So in here after maybe our select let's maybe wrap our select in some fragment or so.

[06:56] And then let's put this here.

[06:56] However, remember this should be now sub field and not field like so. So sorry for uh we have a lot of nesting here. But this should work.

[07:06] If we change something here and we do not choose experts, we should get this error. You must be an expert as well.

[07:16] So we have both options. We can do our validations on the field level but we can also do them on the form level as well. But one thing that you should be aware of if you have both if you have uh validations that happen on the form

[07:30] level here and maybe you return an error for first name but then in first name itself you have the validators and you have an error from here as well. This one is going to override the one from the form level in 10 stack form. And you
