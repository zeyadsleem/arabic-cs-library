---
title: "Breaking Forms into Smaller Pieces with withForm HOC"
lang: en
chapter: form
slug: breaking-forms-into-smaller-pieces-with-withform-hoc
order: 19
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7586s"
---

> **Code repository for this lesson**
>
> Branch: [`withForm`](https://github.com/alialaa/tanstack-form-course/tree/withForm)


[00:01] make our form a lot smaller and more manageable. However, we can still do better. Tstack form provides us with a way to break our form into smaller pieces. So remember when we defined our um uh here in form.tsx when we created

[00:18] our hooks using create form hook, we got our use app form which we have used but we also got this with form function here which is a higher order component.

[00:29] So if you're not familiar, a higher order component in React is a component that you can wrap another component with and it's going to provide the component being wrapped with additional props. We can use this to create subsections of

[00:42] our form. So move some sections in our form into separate components. Wrap these components with with form and by doing so instead of these subcomponents or subsections, we're going to have access to our form as well. So let's see

[00:55] how can we do that. So for example uh in our form this uh skills part is taking a lot of space. This uh skills field here where we are looping through our skills and then displaying this as drop down in order to change the skill and so on. It

[01:12] is taking a lot of space. We can move this maybe into a separate file and then import this file here. So let's see how can we do that using the with form higher order component. So let's in here uh in our register form folder let's

[01:26] create a new component for our skills part. Let's call it register skills maybe or so.

[01:34] Now in here we're going to export a new component. However this component that we're going to export is going to be wrapped with uh use form. So let's export a new component. Let's say register skills. And in here we are

[01:48] going to import with form from our hooks folder. and then define our component here like so. What we need to do is we need to first of all pass our form options. So remember in our folder we created this shared folder that contains

[02:04] our form options that we are exporting from here. We're going to need to pass these uh into our with form higher order component as well. So what we can do is we can just spread everything in our register form options like so. And then

[02:20] we pass a render function in order to render our component. And in this render function, we're going to have access to our form in here.

[02:29] And by having access to our form, uh we're going to be able to display our fields and so on. So in here, let's uh return. And what we need to return is just simply uh sorry, this should be imported normally, not as a type.

[02:45] What we need to return here is let's go back to our form and we need to copy this part this uh skills field. Let's cut it from here and let's just paste it here like so. And now um we have access to our form here. So we don't have a

[03:01] problem accessing form.app field. And also since we are passing our form options here, we're going to get our type safety. Uh we have our stuff defined here, our default values and so on. However,

[03:14] we just need to import uh these components. So, we need field set, field legend or we need our description and our field group and also our button and uh that should be it. So, we have our component here and now we can just

[03:33] simply use it in here. So, how to do that is just uh import our component.

[03:38] However, we also need to pass it our form. So let's in here import our register skills and we just need to uh to pass it our form like so. Our form is of course what

[03:53] we get here from use app form.

[03:57] By doing so let's now save. Let's refresh. Everything should still be working exactly the same. However, now we just have a cleaner file here and we have divided our form into smaller parts and we can do that with other stuff as

[04:13] well. So remember for example in our form uh we did not put the fields for these but in our address for example we can have in addition to uh in here we can have in addition to street we have city state zip code and so on we can

[04:29] maybe put all of these fields uh in a separate component and then imported in our form so that we can just have a better organization for our form using
