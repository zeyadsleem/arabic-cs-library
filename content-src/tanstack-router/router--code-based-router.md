---
title: "Code Based Router"
lang: en
chapter: router
slug: code-based-router
order: 2
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=434s"
---

> **Code repository for this lesson**
>
> Branch: [`code-based-init`](https://github.com/alialaa/tanstack-router-course/tree/code-based-init)


[00:01] TanStack router to create a router we need to compose a tree where we are going to have a root node. So we're going to have some root route and this is going to be the root of our tree. It is always going to exist. It has no path

[00:16] and it is always matched which means the component that we're going to define in this root node is always going to exist.

[00:22] But now as children to this root node we can create our routes. So we can have maybe couple of routes. Let's say uh we have a home route and let's say we also have a slash about route and of course this can go on we can have

[00:39] other children to about and so on.

[00:43] So in order to create a 10stack router we need to create this tree somehow and we can do that in a couple of ways.

[00:50] First code based and second filebased.

[00:54] Let's try code based uh first and then we're going to see that maybe it is not the ideal way to create our router and we're going to move to filebased uh after it. But let's first see how can we create a code-based router. So in here

[01:09] uh in our app we have this main.tsx file and in here we are we are rendering this app component which we can find here uh that displays these logos and this uh counter component and so on. However, of course we're not going to use that.

[01:22] We're going to instead render a new router. So let's remove this and let's remove app and let's create our router and put it here instead. So first of all, as we've mentioned, we're going to have this root route. So how can we

[01:37] create this? We can do uh create a new constant. Let's call it root route. And then we can call a function create root route which is imported from uh from tstack React Router. And in here we composite a component that is going to

[01:53] be rendered. And as we've mentioned this component is going to exist for all routes. It's going to be the parent of all routes. So in here in this object we can pass a component. And uh it's going to be just a function that returns some

[02:07] JSX. So in here I'm maybe going to put some div for now. And this div uh just has a background color and also some text root route. And now let's save this and create our children. So we need to create a home route and a /about route.

[02:24] To do that using the the codebased approach, we also similarly create a new constant. Let's call it index route or home route. And in this case we call a function create uh create route. So create route.

[02:40] And then we pass it some options as well. First of all, we need to make sure to indicate that this index route is a child of our root route. So to do that, we use an option here, get parent route.

[02:53] And this is going to be a function that returns the parent route, which is root route. We have to do this for all of our routes in order to make sure we get the type safety features uh that we're going to see later. Then we uh specify the

[03:07] path that is going to be matched for this route, which is forward slash. This is our home route. And then of course we specify a component as well that's going to be rendered when we visit this route.

[03:18] So of course we can create these components in separate files and then import them here. But since uh this is just an example, I'm going to put the component here in the same file. Just a very simple component that uh displays a

[03:30] div with some background color and a text of home as well. And similarly I'm going to create the about route as well which is going to be exactly the same.

[03:39] So I'm going to put this here about route. We specify the parent the path /about and another component with some text that says about here. And now by having these we need to construct our tree. So to do that we define our tree.

[03:57] So let's create a constant router or let's say route tree and we get our root route and we call a function called add children.

[04:08] So yes we have to do that. Even though we specify that this route is a child of the root route, we still have to define our tree by adding children to our root route. So in here, we can add an array of children. In our case, we have the

[04:23] index route and we have the about route.

[04:27] And of course, this tree can be bigger.

[04:29] We can have we can add children to about route and so on. But let's keep it simple for now.

[04:35] Finally, we create our router. So let's create our router and to do that we call a function create router. So create router from tst sorry and poset our tree like so in an option called route tree.

[04:55] So we pass it the route tree that we define here. And now finally we need to render our router. So inside of here instead of rendering this app component we need to render our router. So, so what this does, it gets an element with

[05:06] an id of root. So, if we take a look at our index.html we have a div with a with an id of root and inside of here we need to render our app which is going to be our router. So, we get this element and then render and

[05:20] inside of strict mode here we can import a function called router provider from 10 stack and then pass it the router that we created here. So, router and pass our router. Now if we save as you can see we get our root route. However

[05:38] uh currently we are visiting our home.

[05:40] So we should get this home text as well but we're not getting that because in our root route we need to render our children. So this root route is going to have children. We need to render these.

[05:51] And to do that in TanStack router we use a component called outlet. So by adding outlet here we're going to get our children. And now we can go to home. We can go to about as well.

[06:05] All right. In here we can also add our dev tools. So remember when we installed TanStack router, we also installed some dev tools. If we import from these dev tools, TanStack router dev tools component like so. Remember this is

[06:22] imported from here. TanStack react router dev tools and save. We're going to get this. We can also change its uh position. So we can put it maybe in the top right. Let's say we're going to get it here. If we click on this, it is

[06:41] going to contain a lot of useful information uh that we're going to see more throughout uh the video. However, what we can do for example, currently we don't have any links to navigate between home and about. We can do that from

[06:53] here. In here we are going to get our routes and the ones marked in green here are going to be the currently matched routes or currently rendered components.

[07:03] So we are in home. So the rendered components are going to be the root and the home component. So this is what we get here. Root and then home. And we can go to about by clicking on this arrow.

[07:14] And now the green ones are going to be root and about and so on. Of course, as we create more complex routes, this is going to be more useful where it is going to show uh the tree how the tree looks like if we have a lot of nested

[07:28] stuff and so on. But now let's see how
