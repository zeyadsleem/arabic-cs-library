---
title: "Creating Reusable Form Components"
lang: en
chapter: form
slug: creating-reusable-form-components
order: 17
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7262s"
---

> **Code repository for this lesson**
>
> Branch: [`useAppForm-4`](https://github.com/alialaa/tanstack-form-course/tree/useAppForm-4)


[00:02] So in addition to let's maybe close these. In addition to field components that we have here, we also have form components as well. In here we can pass components related to the form itself not a field component. Like for example

[00:16] these submit buttons. So in here these submit buttons we are using form.subscribe and then we are rendering our buttons and so on. Instead of having to do all of that here, we can also abstract this into a separate component

[00:30] and use it here uh similar to what we are doing with the fields. And we can do that by going into our create form hook, create a component for the submit buttons and pass it here. So let's do that. So in my form uh folder here, I'm

[00:46] going to create a new file, new component. Let's call it submit button.tsx.

[00:57] And in here, let's create a new React component.

[00:59] And let's just go to our form and let's copy the stuff related to the submit button starting from form.subscribe here. Like so. Let's copy this or cut it from here. And let's just put it here.

[01:15] Now, we need to um of course import some stuff and so on. So, let's import the button from our UI.

[01:23] Um I guess that's actually it. But now we need to have access to the form similar to the field context. Remember we also have the form context as well that we are getting from here and we are passing here. So we're going to have

[01:37] access to our form using the form context as well and we can access it using the use form context function.

[01:45] So in here we can do constant form and just use form context. Oh, sorry.

[01:54] Use form context like so.

[01:58] And this should work. Of course, in this component, we can have uh maybe props to customize things uh that need to be customized here. Maybe the data that we are sending when we submit maybe the text and stuff like that. However, I'm

[02:12] just going to keep it simple. And now that we have this component, I'm going to pass it here. Uh give it a name.

[02:20] submit button for example and pass the component that we just defined which is submit button like so.

[02:29] By doing so we can go back here in our form and in the form that we get uh from use app form we should have access to this component. However in order to use this component we need to provide it with the context it needs in order to

[02:45] access the form. And to do that we need to wrap our entire form with um form app form. So let's wrap everything with form app form. This is going to ensure that the context needed uh for the form components is going to

[03:03] be available similar to when we used the field form.app field here in order to have context available in our components as well.

[03:12] But now that we're doing this, let's go here after uh or before closing our form and just simply use form dot uh submit button like so.

[03:24] By doing this, if we save now, we should have our buttons back. And this should work exactly the same. Let's refresh.

[03:32] Let's submit. Everything is working exactly the same, but our form is now even much smaller in size. What we've
