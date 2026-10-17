---
title: "Refactoring Our Form & Using useAppForm"
lang: en
chapter: form
slug: refactoring-our-form-and-using-useappform
order: 15
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=6105s"
---

> **Code repository for this lesson**
>
> Branch: [`useAppForm-1`](https://github.com/alialaa/tanstack-form-course/tree/useAppForm-1)


[00:02] components we might have a nicer looking UI. However, we still have the problem of the amount of code that we had to write in order to create this simple form. So, as you can see here, uh this file is almost 500 or 400 lines of code.

[00:17] And if you have an application with a lot of forms or large forms, this is going to be a pain to write every time.

[00:23] You'll have to uh render your components. You will have to uh pass these codebacks like so. You'll have to render the errors uh like so and so on.

[00:33] And of course, this does not make sense.

[00:35] However, fortunately, TanStack form provides us with a way to make our forms a lot smaller. So, let's see how. But first, let's uh maybe clean things up a little bit. For example, we were logging this um values object here. Let's maybe

[00:50] remove this. And then up here, we were uh defining our schema and default values. These can obviously live in a separate file as well. So, let's do that. So in here I'm going to maybe um create a folder and put different files

[01:06] inside of it. So inside of uh this sl folder for example let's create another folder. Maybe let's call it register form or whatever this form should be.

[01:17] And inside of here let's create a file for shared things. So in here I'm going to create a file called shared ts. And let's in here move our stuff that is going to be shared by different files in this uh register form component uh

[01:34] register form folder. So for example the form schema the default values and the form options. Let's copy or cut these from here and uh let's just put them here and export. Uh of course we need to import

[01:50] Zod.

[01:52] We also need to uh import form options as well.

[01:56] Let's also maybe call it something more clear. Register form options.

[02:03] And let's export it.

[02:06] Let's also export our schema and our um default values like so.

[02:14] And now let's go back to our register form component and let's import uh these things. So in here let's import register form options.

[02:23] in here. Let's import form schema. I guess we might also call it register form schema and update this as well just to be more clear with what this is. So in here, let's import register form schema and

[02:40] put it here as well. And I guess if we save this uh everything should work.

[02:47] So if we refresh uh let's try to submit and everything is working our validation is working and so we can also remove uh imports that we're not using now uh these things we're not using anymore and I guess it's fine for now let's also

[03:09] move this uh component maybe in this folder as well so that we have everything living in this register for folder However, by doing that, we will need to go to the app, the tsx, and make sure uh

[03:22] that now your um import is updated to this path now. So, let's refresh.

[03:28] Everything should still be working. So, that was a bit of an organization, but now let's focus on our main problem.

[03:35] What we need to do now is we need every time we need to uh create a form and render our field. We need to figure out a way to avoid having to write all of that boiler plate just to display the input and display the errors for the

[03:47] input and so on. So what we can do is instead of using the use form hook provided by tstag form we can create a custom hook and this custom hook is already going to have our components our input components predefined and

[04:03] everything that we do here. Uh so when we pass our value our own blur and our own change and so on all of that is going to be predefined by this custom hook and we can just use our input component without having to pass all of

[04:16] that stuff. So let's see how can we do that. So in our folder I'm going to create maybe uh let's in our source folder create a new folder. Let's call it hooks and let's create this custom hook which is pretty simple. We won't

[04:31] actually have to do a lot of stuff ourselves. Uh tstack form provides us with a simple way to do that. So we create a new folder here. Uh let's call it maybe form context.tsx.

[04:43] And from here we're going to need to export some stuff from a function that we can import from uh tstack form which is create form uh this one hook contexts. Right?

[04:57] So this function is going to return some stuff that we can dstructure from here including field context form context and also uh use field context and use form context. and we

[05:12] need to export all of that so that we can use it in another file. So let's export all of that. So basically what we're going to do is we're going to define components for our forms. And when we define components for our forms,

[05:25] as you can see here, uh in our component, we need to have access to the field, right? In order to display the field value in order to pass on blur and change and so on, we need to have access to the field. But now that we're going

[05:36] to define these components uh in separate files as we're going to see now in order to have access to this field, we're going to do that using this context provided here. So field context and use field context are going to

[05:49] provide us access to our fields when we create components for our inputs. So if you're confused, we're going to see everything now. So let's now after creating this uh folder and exporting our stuff in our hooks folder, let's

[06:03] create another file. Let's call it form.tsx.

[06:07] In here, we need to define our custom hook that as we mentioned, we're going to use instead of this uh use form hook, right?

[06:17] So, in here, we need to call a function called create form hook like so.

[06:24] And then we need to pass it some stuff.

[06:26] And then is also going to return some stuff.

[06:30] So, what do we need to pass it? we need to pass it the context that we uh exported in the other file. So the field context. So field context equals to field context uh field context from the file that we just created. And also form

[06:45] context as well.

[06:48] And we can pass an object of field components. Let's set it to an empty object for now. And also we can have form components. Right? So in here we're going to pass different components that we're going to need to use in our forms.

[07:02] So in field components we can pass our inputs, our checkboxes and so on. And in form components we can have things like submit buttons, things related to the form itself, not a specific field. We're going to also have an example. And then

[07:15] this function is going to return our custom hook that we can use which is called use app form. It is also going to return with form and uh with field group which are functions that can also help us maybe organize our form a little bit.

[07:29] We're going to take a look at these later but for now let's uh focus on use app form. Let's also export all of that from this file. And now in our register form instead of using use form let's use app form from our hooks folder like so.

[07:48] So by doing this obviously nothing is going to change for now. But now what we can do is in here when we call create form hook we can define these components that we are uh using here in our form.

[08:02] So maybe the input component the checkbox component and so on. Define these in separate files and then pass them to this function in the field components. And by doing so using this use app form hook we won't have to write

[08:14] all of that every time. These components are going to be predefined by this hook.

[08:18] And we can just use them in a much simpler way than that. And when we define these components, we're going to have access to our field. Since we are in here already passing our field context and in here, we are uh exporting

[08:32] this use field context function. So using this function, we're going to have access to our field when we define our component. So let's now see how can we define our custom components. So let's
