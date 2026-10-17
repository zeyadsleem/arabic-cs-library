---
title: "Notes on Form Submission"
lang: en
chapter: form
slug: notes-on-form-submission
order: 13
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=5347s"
---

> **Code repository for this lesson**
>
> Branch: [`submission`](https://github.com/alialaa/tanstack-form-course/tree/submission)


[00:00] Let's talk a bit about submitting our form before cleaning things up in our form. So we have already seen that uh in our form uh when we use the use form hook we have this onsubmit and uh we can do something when we submit our form

[00:16] with our values. Let's open our console here and let's try to submit our form uh by having a valid form here. I'm going to just type things here. Uh let's also remove this annoying log uh from here.

[00:32] So I'm going to accept terms and uh I think we should now be able to submit.

[00:39] So sorry I realized we cannot submit our form because um in our schema we have validation rules for our email. Uh in here we have our email should be an email. We also have our uh city state and so on. And we don't actually have

[00:53] these fields here yet. So that's why we're getting validation errors uh even though we cannot see them. So sorry for that. But for now, I'm just going to um maybe not pass the email and not pass these things except the street which we

[01:07] have a field for.

[01:09] And um in our schema I guess we have um yes we have the email as optional. So now we should not get an error if we don't pass the email and also these uh things city, state and so on are optional as well. So now we should be

[01:23] able to um submit our form. So I'm going to just type anything for now. And now if I submit we should uh oh sorry looks like I have an error. Now if I submit we should have our stuff in our console which are the values of the form.

[01:42] However a very important thing to notice here is if you are familiar with Zod you know that the input for Zod can be different than the output. So when we have some sort of an object that we need to validate and we use zot to validate

[01:56] it after validating the object zot can actually produce a different output.

[02:01] However what we get here is the input and not the output. So just to um show you an example when we define a z k schema we can have things that can transform the input into something different. So for example you have this

[02:16] uh cose function that can coersse a string to a number and so on. we have transforms as well. So maybe in here after our schema we can have a transform. We can do something to transform our input when we validate uh

[02:30] our schema. So let's have a quick example here. In transform we get our data as well in a function and we can do something that is going to transform our data. So in here I'm going to maybe return another object that contains

[02:42] let's say all of our data. However, for our skills, let's say we need to just uh instead of having the array of objects, let's say we need to have an array of ids for our skills. So, we can get our data uh data skills and the map and for

[02:58] each skill, we can just return the id.

[03:02] So, by have by doing this and submitting our form again in our skills, as you can see, we still get the array of objects because this is the input. If we need to have the output of Zod, we need to do it ourselves. So in our onsubmit function,

[03:18] we're getting some errors here because of the transformation that we've done, but we're going to remove it in a moment. In our onsubmit function, we need to parse our input using Z ourselves. So we can use form schema.pse

[03:31] and then pass our value here. And this way, sorry, console log. And this way we are going to get the output of Z. So if we save now submit we get the input which contains the array of objects for the skills and the

[03:47] output of Zod which contains now the array of ids. So just keep this in mind when you are using Zod and you get the value here on submit the value is the input and not the output of Zod. But let's now remove this uh transform

[04:01] because it it is causing some errors.

[04:04] And uh we also have an error somewhere here.

[04:08] Yeah, from the listeners we're not using this. Let's actually remove it as well.

[04:14] Another thing that I would like to mention uh when submitting is that we can pass some metadata when we submit our form. So in here remember uh when we submit our form we call form.andsubmit.

[04:26] When we call form.andsubmit handle submit. We can pass any arbitrary object here. We can pass some metadata.

[04:33] So let's just do a key and value for now. And when we submit our form, we're going to get whatever we pass here in our onsubmit function. So in here we get meta as well.

[04:47] Uh so let's maybe console log this and save. And now if we submit, we should get our key value here. This can be useful. For example, let's say uh when you submit your form, you can submit it with multiple buttons. So

[05:02] maybe you can have this submit button here. Let's say this one saves the form for example. And let's say you have another one. So uh let's actually wrap everything with a div here. And let's say you have another button that should

[05:17] save and maybe go back. So save and go back.

[05:23] And based on which button you clicked, you need to know this information. You need to know which button was clicked in your submit uh function in your submit callback so that you can take an action after submitting your form. So we can

[05:35] maybe add an onclick handler here and on click we can from here call form.andsubmit uh instead of calling form.andle submit in the form itself when we submit our form and in here we can pass our data.

[05:50] So let's say maybe submit action and let's say save and let's do the same and this one should be maybe uh go back or something. Now by having this if we click on save we are going to get submit action save. If we click on save

[06:07] and go back we should get submit action go back.
