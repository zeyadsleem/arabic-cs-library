---
title: "Installation"
lang: en
chapter: form
slug: installation
order: 1
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=164s"
---

[00:04] >> So in here I have a react project opened and it is just created with vit and it has chatnen installed as well. So you can uh clone the repository that I'm going to provide if you would like to follow along or maybe you have your own

[00:15] react project that you need to work with. It doesn't matter. Uh if you would like to also do this from scratch in here you can find instructions in chaten website for how to uh create a react project with vit and chaten as well.

[00:29] This is pretty much what I did to create this project and you also don't have to use chaten. just using chat cm because later we're going to see how to integrate component libraries like this with TanStack form but maybe you are

[00:43] using any other component library uh this is also going to work but in here I have this app component which is displayed in our homepage like so so let's get started in this component so let's first install TanStack form so we

[01:00] need to install a few packages so first of all TanStack form itself which is npm install TanStack or at TanStack React Form or of course you might be using something else other than npm. I'm using npm so I'm going to

[01:15] install that and also uh tstack form provides us with some dev tools that we can use in order to debug our form and so on. So we can install that as well by installing uh TanStack react dev tools and in addition to that we also need to

[01:33] install TanStack React Form dev tools.

[01:36] So after this is done we can also install TanStack and then React Form dev tools like so.

[01:44] And now in order to use these dev tools we can go here in our um main.tsx file.

[01:50] This can be different for you if you created your own project. However, in here when we render this app component, we also need to render the TanStack dev tools. So in here, TanStack dev tools and then we need to posit the form

[02:05] plugin. So in in here in plugins, we need to pass it form dev tools plugin from TanStack um form dev tools like so.

[02:15] And we need to call this function.

[02:20] By having this we should be having this icon here uh that is going to display these dev tools. But now we can get started and create our first form. So
