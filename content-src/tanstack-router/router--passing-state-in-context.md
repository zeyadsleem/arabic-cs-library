---
title: "Passing State in Context"
lang: en
chapter: router
slug: passing-state-in-context
order: 18
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=7125s"
---

> **Code repository for this lesson**
>
> Branch: [`context-2`](https://github.com/alialaa/tanstack-router-course/tree/context-2)


[00:02] to our TanStack query context and be able to manipulate it in our application we need to use the use state hook. Also in addition to state maybe you are using some hook some other hook maybe u an authentication provider use o for

[00:17] example and you need to pass data from use o to your context. In this case, you're also going to need to use a hook.

[00:23] And as you might know, we cannot use hooks except inside of React components.

[00:27] Over here, when we initialize this router and pass our context, we are not in a React component. So, what we need to do, let's get this back to null. And what we can do is we can initialize this context in a different way. So, in our

[00:42] router provider component, we can pass context as well. So what we're going to do is we're going to create um a component. Let's call it maybe app or so. So let's create a function app.

[00:55] And in here we're going to do stuff that we need to do in order to initialize our context or to get our context and then pass it to router provider. So I'm going to copy this cut it from here and return it here

[01:10] and use app here instead. Right. So now we have the chance to use hooks in this app component, use context, use any uh provider and so on and pass data from this provider or from this hook into our context by passing the context prop

[01:28] here, right? So let's do that. But first of all, uh remember we had here uh not here actually in this root component, we had this type for our user. We're actually going to need to use this in multiple

[01:41] places. So I'm going to cut it from here and put it somewhere common. Let's say maybe in our source for uh source folder. Let's create a folder called types and then index.ts or so. And then let's put this here and export it

[01:57] uh so that we can use it here. Let's import it here.

[02:01] And we're also going to need to use it here as well. So let's say we have uh some state. So I'm going to create a state user set user and we're going to use our uh use the use state hook and this state is going to have a type of

[02:20] user which we can import or null right and let's say let's initialize it to null.

[02:28] So initially we're not going to be logged in and now we can simply pass this state as our context. So in here we can pass our user uh sorry in an object we can pass our user like so.

[02:42] By doing so we have this set user function that we can also pass in our context and it can be available everywhere in order to be able to set the user to something else. So maybe when we log in or log out and so on. And

[02:56] of course this is a simple example in reality. Maybe you are using some authentication library and you're going to be maybe getting some information from a use o hook uh maybe the user stuff like that and then you can pass it

[03:10] to your context as well but we're just having a simple example here. So now since we are having null here we're we're getting welcome guest but of course we can change this to something and uh sorry let's give a name and we're

[03:26] going to get this here right but let's actually leave it as null and now let's have some sort of a way to maybe login out and so on and set this user so what I'm going to do is remember when we defined the type for our context which

[03:43] is Here, let's say in addition to the user, we're going to have a login function where we're going to get our user of type user and it's going to be a void function.

[03:55] And we're going to pass this function in our context here in the root so that it can be available everywhere, right? And let's also have a logout function which is going to be uh just a void function.

[04:07] And in this function, we're going to uh set our user to null.

[04:12] So now that we have that in our context, we need to specify that here, right? So what I'm going to do is I'm going to define these functions here. So let's create a function call it login and we're going to give it a user that we

[04:26] need to login of type user and then in here we are just going to uh set user and set it to whatever we pass to our function. Right? And similarly, let's actually duplicate this. Create logout.

[04:43] Set user to null. And we don't need this.

[04:47] And now we can just simply pass these functions here. So login and log out.

[04:52] Oh, sorry. Log out.

[04:55] And we're still getting an error. Yeah, we need also to to uh pass these functions here since they are part of our context. So in here maybe let's uh just pass an empty function for login and logout because anyways we are

[05:11] populating these functions here uh in this app component.

[05:15] So now these functions are going to be available everywhere in our app. So let's try to use them uh maybe also uh also in our root uh root component. So in here if we are logged in let's add a log out button and uh if we are logged

[05:29] out let's add a login button. So if we're logged in, I'm going to add a button here. Let's say log out. And uh when we click on it, we need to call the logout function that we pass to our context. So it should be available here.

[05:46] So let's also get login and get logout.

[05:49] And in here, let's call log out. And let's also copy this. And if we are logged in uh or sorry or if we are logged out let's say login and let's call login and just pass it some dummy user. So call

[06:06] login and in here let's maybe add an ID and some name of test.

[06:14] So now we have this login button. If we click on it however um as you can see nothing is going to happen. If we try to maybe go to a different route, as you can see now it is updated. So we get our log out and we get test here. But we had

[06:31] to move to a different route in order for this to update. So what we need to do let's maybe refresh this so so that we are logged out initially. What we need to do is when we update our context by updating our state which we are

[06:45] passing to our context, we need to call a function called router uh.invalidate invalidate in order to recomputee our context and updated in our UI. So in here in main.tsx we already have access to the router that we define here. If we

[07:01] are not here we can access this router using the use router hook. But uh we don't need to do that since we have already uh we already have access to router. So we can simply call router.invalidate invalidate here and we

[07:15] can do it here as well when we log out. However, if we save this, let's maybe refresh as well. It is still not going to work. And this is actually an issue that we can take a look here. Uh we can take a look at it

[07:31] here. And it is currently still opened.

[07:34] Uh but we have a couple of workarounds in order to fix this problem. So what is happening is we're setting our user here. But as you know when we set a state in React it is not set immediately. So when we run some code

[07:48] after setting a state it is not guaranteed that our state is updated yet. So this is probably what is happening when we set this user our state is not yet set and therefore router invalidate is is not going to do

[08:01] anything. So one way to fix this problem is to maybe wait for a second. So let's maybe make this function async and let's wait for a second here before calling router.in to invalidate. So by this time uh the user should be set at this point.

[08:17] This is of course uh not a great way to fix it. But if we give it a try, click on login. Wait for a second. As you can see, now we get our updated UI. But this is maybe a very hacky way to do it. One other way is to call a function called

[08:33] flush sync. Sorry, flush sync that we can import from React DOM. in this function uh this function we can pass it another function and if we set any state in this function it is going to be set immediately. So if we do any other thing

[08:47] after calling floss sync we're going to be guaranteed that the state is updated.

[08:53] Now if we save this and try again login as you can see we immediately get our updated uh our updated UI and we can do the same for log out as well wrap it in flush sync uh and this way if we log in log out

[09:10] both are working immediately.

[09:12] We can also in our dev tools uh take a look at our context as well if you need to maybe debug something. So if you choose any route you can see uh which context is available in this route. So in here we have our context we have our

[09:27] user and you can maybe use this for debugging if you have some sort of a problem.

[09:33] Um as we've mentioned we can also u make a context available to only a certain branch in our tree. However this is something that we're going to discuss when we discuss uh load functions. But that's it for context for now. Of

[09:47] course, this was just a very simple example, but if you would like, maybe in another video, we can actually uh use an actual authentication service integrated with our context and use it in our routes and so on. However, for this

[10:00] video, I just need to discuss as much uh features as possible uh using these simple examples.
