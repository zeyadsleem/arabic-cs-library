---
title: "Introduction"
lang: en
chapter: form
slug: index
order: 0
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=0s"
---

[00:02] Today we are taking a look at TanStack form which is TanStack's library for managing forms. So TanStack form provides a powerful and flexible approach to form management. It is completely type safe and you can use it

[00:13] with any component library and you can also use it with any framework. So it is pretty flexible. In fact if you take a look here at the documentation it does not only support React but you're going to find a lot of frameworks that it

[00:26] supports here. In this video, we're going to use React because this is probably what most of you are familiar with. However, you can use it with any of these libraries as well. So, tensstack form provides us with APIs to

[00:39] do things like maybe uh validation, error handling and so on. However, these APIs are pretty flexible. So, we can for example choose when exactly to do validation, maybe onsubmit, on change, on blur and so on. And we also have the

[00:53] flexibility to display our UI components, our inputs and so on using these APIs. So let's take a look at a very quick example here before diving deeper into tstack form. So for example in here we have a form. We define a form

[01:07] using this use form hook. We have our default values and we have an onsubmit callback and when we display our form we simply use some components inside of this form that we create here and in these components we define how to

[01:21] validate uh this form. and so on. So for example in here we have our form and we have a field here and in this field we have a validators uh object where we do our validations. We can do our validations on change. We can also do it

[01:35] on submit on blur and so on. We can also do async validation as well. We're going to take a look at that in details but this is just a quick overview. And then in the uh in the children for this component we display our UI. So in here

[01:49] for example we display an input a label and so on. But of course this can be an input from a component library if you're using some sort of a component library.

[01:59] And we can get everything related to our field uh using this field that we get here in this function. And we're going to have our um value for the field.

[02:08] We're going to have callbacks that we need to pass to umbl and onchange. We're going to have information related to errors so that we can display errors and so on. But when you look at this, you might think uh this is maybe too much

[02:20] code to write for a very simple form.

[02:23] However, at the end of the video, we're going to see a way that tentstack form provides in order to avoid writing a lot of boiler plate and make our forms very easy to use and very composable as well.

[02:35] So let's get started with TanStack form.
