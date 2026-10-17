---
title: "Installation"
lang: en
chapter: router
slug: installation
order: 1
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=165s"
---

> **Code repository for this lesson**
>
> Branch: [`app-init`](https://github.com/alialaa/tanstack-router-course/tree/app-init)


[00:00] So let's install a new stand stack router and in order to do that I'm going to create a new react project however without using any framework without using Next.js or any uh framework like that. What I'm going to do is I'm going

[00:13] to create a new uh react project with only vit as a bundler. So TanStack router supports multiple bundlers including vit uh which we're going to use. It also supports Webpack, ES Build, uh, and I think maybe others as well,

[00:28] but we're going to use VIT in order to create a new VIT project. Uh, let's maybe put this in my desktop.

[00:35] And I'm going to, uh, run mpm create and then vit at latest. And we're going to get a list of options. So, let's choose a name. Let's say 10 stack router. And let's choose a framework. Of course, we're going to use React. Uh by the way

[00:53] uh as we've mentioned tstack router supports solid as well over we're going to use react here. So let's choose react and in here by the way we can have uh we can select a template that already includes TanStack router. However I'm

[01:07] not going to do that because I would like to show you how to install tan uh stack router from scratch if you are for example using TanStack router in an existing project. So what I'm going to do is I'm just going to choose

[01:18] typescript. So let's choose TypeScript here and our project should be created in our desktop. Let's move to it and then let's run npm install.

[01:29] And I'm also going to open this project on my code editor. So now I have my project opened on VS Code and I've also installed my dependencies. But now let's install TanStack router. I'm also going to install uh Tailwind in order to do

[01:43] quick styling while we are having some examples throughout the video. So in order to install TanStack router we need to install these packages. So I'm going to do uh mpm install and as you can see we have here TanStack uh at TanStack

[01:59] React Router and at 10stack React Router dev tools. We need to install these and also as dev dependencies we need to have a a vit plugin. So after this is done, let's also install as a dev dependency TanStack router plugin.

[02:17] Let's run this. And then uh for Tailwind, I'm also going to add one more installation here which is npm install Tailwind CSS and Tailwind Vit. Right? So this is all what we need. Now we need to go into our Vit config in here and we

[02:37] need to do some stuff. So first of all we need to import our tailwind uh vit plugin. So let's do that here. And also we need to import our TanStack router v plugin which we can do by importing tstack router from from this import.

[02:54] And uh I'm also going to turn off um copilot completions because I think it's going to be annoying for you.

[03:02] However, what we need to do is simply uh use these plugins here in this plugins array for 10 stack router. We need to define it before the react one. So in here we can put 10 stack router like so.

[03:17] And we can pass options for now. Let's only pass target which is going to be react. It can be solid as well. And then we also need to add the Tailwind plugin in order to use Tailwind uh in our app. And now what we need to

[03:33] do uh is just in order to use tailwind let's go to the uh main styles index.tss here and let's import tailwind like so.

[03:43] I am also going to maybe remove some of these uh default styles. Let's maybe remove everything but maybe let's keep the uh let's keep the button styles. For example, let's maybe remove this

[03:57] H1 body.

[04:00] uh just remove these and keep the root styles, the button styles and uh the styles for dark mode or light mode as well. So this should be our app. Let's try to run it by running mpm rundev and let's try to open it in our browser. We

[04:18] have an error here. Uh we can ignore this for now, but let's now open this URL in our browser like so. And now we have this app and now we can start working with TanStack router. In
