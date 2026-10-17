---
title: "Creating Reusable Group of Fields with withFieldGroup HOC"
lang: en
chapter: form
slug: creating-reusable-group-of-fields-with-withfieldgroup-hoc
order: 20
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7864s"
---

> **Code repository for this lesson**
>
> Branch: [`withFieldGroup`](https://github.com/alialaa/tanstack-form-course/tree/withFieldGroup)


[00:01] with form we were able to split our form into smaller parts. However, these smaller parts that we created must be a child of our main form. So we created register skills here register skills can only be used as a child to our main form

[00:16] uh that we define here. So notice that we pass the same options register form options when we use use app form and also when we use with form like so. So these two components are tied together.

[00:30] register skills must be used within the same form that we defined here. And this is fine. Maybe this is what you need.

[00:37] However, sometimes you might need to do something similar. However, instead of creating a component that is tied to one form like this register skills component, maybe you would like to create some reusable group of fields

[00:49] that can be used in any form, not just in a specific form. For example, we have here password and confirm password for example. So maybe these uh two fields are going to be used here in a register form, maybe also in a change password

[01:05] form and so on. So we need to be able to instead of having to create these fields for multiple forms, just have these defined once somehow and then be able to reuse uh these fields in multiple forms.

[01:18] We can do that with this other export that we have here in form.tsx which is with field group. So let's see how can we use it and let's as an example try to move password and confirm password into a separate component that can be used in

[01:32] multiple forms. So let's do that by moving uh these fields into a separate component. So as I mentioned what we're going to do now is we're going to create a component containing password and confirm password and this component can

[01:45] be used within any form. So it is not tied to register form. So maybe instead of creating this component inside of register form, we can maybe put it in some shared folder maybe in components or uh actually let's put it in in inside

[02:00] of components and then form in here.

[02:02] Let's create a new file. Let's call it maybe password fields.tsx.

[02:11] And let's in here see how are we going to create this component. So in here let's export a new component. Let's call it password fields. And this component is going to be wrapped inside of the width field group uh higher order

[02:22] component that we can import from our hooks. And in here similar to with form we need to posit uh default values.

[02:30] However, unlike with form uh that we have used uh here in register skills we're not going to posit the same options of our register form because this is now not tied to any specific form. So what we can do is we can just

[02:44] pass it default values like so. And in here I'm going to define some types and the default values for our password and confirm password. So our type is going to contain our password string, confirm password string. And our default values

[02:59] are just going to be password and confirm password with empty strings here. And this is what we're going to pass here as default values for these groups of fields. But now, sorry, let's remove this as well.

[03:12] And now we can also pass our render component similar to with form. In here we need to pass a function like so. So function and a function called render.

[03:22] And then in here we're going to have access to a group.

[03:26] Right? I'm going to return maybe a fragment because I don't want to wrap my fields in any div.

[03:34] And in here we can use this group that we get here to define our fields. So inside of group we're going to get our app field app form field and so on. So notice that this time we don't get a a form here because these fields are not

[03:48] tied to a specific form over we get this group and now we can go into our form and we can copy our uh password and confirm password fields. So let's uh copy these. So cut these from here and I'm going to go to my password

[04:06] fields component and I'm going to paste these. However, now we're not going to use form. We're going to use group instead like so.

[04:19] All right.

[04:19] By having that we can use this component in any form and it is just going to add these fields to whatever form we are using this component in. And we can also let's say inside of a group we need to have access to things like maybe things

[04:33] that are related to the form. So maybe we need to subscribe to uh form.cansubmit for example we can do that in this group. We're going to have access to the form. So we have group form uh and this form is going to be

[04:46] whatever form we are using our component in. So if we need to subscribe to cans submit for example we're going to normally use the use store hook. And to get our store now we use group.form.store. store and then we're

[04:59] going to get our state and we can subscribe to things related to the form uh that we are using this component in.

[05:05] But now let's try to use this component in our register form by going in here and then let's in here import our password fields component and we need to posit some stuff. So we need to pass it to the form itself like

[05:22] so and we also need to pass it a prop fields. So let's say in our form our register form remember we have our um default values and so on in here in this shared file in our schema our password fields look like so we have password and

[05:41] we have confirm password. However it could have also been something like this. So maybe we had passwords uh data and then nested inside of it we have our password and confirm password like so right. So we need to specify where

[06:00] exactly in our schema our password fields are stored. So remember in our password fields component we have a couple of fields password and confirm password.

[06:09] we need to somehow map these fields that we have here in this sub component. Map them to the place where they exist in our main component. So if they exist like so inside of maybe passwords data field then we need to pass here

[06:27] in this fields um prop passwords data.

[06:32] By doing so, whatever we type in our password fields is going to be put in passwords data dot password and password data confirm password. However, this is not the case for us in our schema. Let's remove what we've done here. In our

[06:47] schema, we don't have our password and confirm password nested in another key.

[06:50] However, they are separate keys in our schema. So, what we can do is we can map also which field in our schema corresponds to which field in our password fields component. In our case, they are the same. Password maps to

[07:04] password. Confirm password maps to confirm password. However, they can have different names. So, we can map them to different names as well. But in our case, uh they don't have different names. So, what we can do, we can post

[07:14] an object here like so. And then specify that our password field maps to password in our schema. So, password in the password fields component maps to password in our schema. and then confirm password in our password fields

[07:32] component maps to confirm password in our schema like so. However, uh if the if these have different names, if the fields in password fields maybe had different names, then we are just going to specify that in this map here.

[07:46] However, by having that this should work and uh if we maybe type something here uh just to confirm that this is working, let's open our console as well. Remember we are logging our values when we submit our form. So let's submit.

[08:02] Oh and sorry we have to have uh we have to have a valid form. So let's uh just type anything here.

[08:10] And this should be at least six characters.

[08:20] Let's accept. And now let's submit. And uh in here we should get our password populated and also confirm password which means uh this is working properly and we are using our sub component here in order to populate some fields in our

[08:34] main form. But now this can not only be used in this form it can be used in any form and you can just map fields like so depending on how your form looks like.

[08:45] But one final thing uh if you noticed our validation worked here. Uh let's maybe refresh. Our validation worked for our password and confirm password. So I'm going to type maybe passwords that are not matching

[08:59] and submit. And as you can see the validation is working. Why? Because here in our main schema for this form we are doing this validation. So in here in our schema in this shared folder we are doing the validation for the

[09:14] password here using refine. However this way every time we use these fields we're going to have to do the validation for every form because our validation lives in the form level and not in this group of fields that we have defined. So what

[09:30] we can do is we can remove this from here. So I'm going to maybe let's just comment it for now. And also I'm going to remove the password fields from here as well. So remove password and remove confirm password. So we don't have these

[09:43] fields in our schema. Right? And what I'm going to do is I'm going to go back into our shared uh password fields component here. And instead of defining the type like so, I'm going to define a schema like so that contains uh we need

[09:58] also to import z uh z from Zod. So now in here I defined a schema that contains my password field and the confirm password field with all the validation that we need and also I had the refine here instead and this way we can have

[10:14] our validation for password and confirm password defined only once in this group but then I just need to modify this um now that we have removed our password fields type let's infer our type from our schema so

[10:27] infer sorry infer like so and then type of and then our schema which we called password schema like so and now what we need to do if you notice here I'm exporting the

[10:41] schema and what we need to do in every form that we need to use password and confirm password when we define our schema for this form so for example here we need to use um so sorry in our shared folder we need to use our schema our

[10:56] stuff in our schema first name last name and so on in addition to passwords and confirm password. However, instead of defining these here and defining the validation for these here, we can just extend the schema that we defined in our

[11:11] uh password feeds here. And to do that using zot, we can after defining our schema call end and then import the passwords schema like so.

[11:25] So doing so it's as if we are having our um password confirm password field and our refine as well but we are just defining these here separately so that we can reuse it in multiple forms and by having this if we refresh as well and

[11:41] type password we should have our validation still working as well.

[11:48] So that's it for this video. I hope you enjoyed it. Make sure to leave a like, leave maybe a comment, and subscribe to the channel for more content.
