---
title: "Reactivity & Listeners"
lang: en
chapter: form
slug: reactivity-and-listeners
order: 4
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=1220s"
---

> **Code repository for this lesson**
>
> Branch: [`reactivity-and-listeners`](https://github.com/alialaa/tanstack-form-course/tree/reactivity-and-listeners)


[00:02] something from this form object that we are logging here. Maybe let's say we need to use some of the values somewhere. Uh maybe we need to use um is dirty for example and so on. So let's maybe in here instead of uh printing

[00:16] this whole object, let's maybe print just a couple of stuff. So inside of a P tag here, I'm going to do form and then I'm going to access the state. And then let's say we need to get one of the values. Sorry, values. And let's say we

[00:31] need to display the first name for example. Let's also maybe put another one to display if the form is dirty or not. So I'm going to check form.state is dirty. And I'm going to display dirty or pristine based on this. So by the way

[00:44] this is dirty on the form is going to be true if any of the fields uh are dirty.

[00:50] However, of course we have another is dirty inside of the field itself and this is going to be specific for um a specific field. Anyways, if we save this now uh we're going to get nothing here for the first name and we're going to

[01:04] get pristine. But as we change nothing is going to be updated here in the form level because as we've mentioned danstack form is going to avoid unnecessary rerenders when something changes in the form and therefore we

[01:18] need to subscribe to certain things in the form in order to get their updated values when they change. So in our case we need to subscribe to first name for example and is dirty. So how can we do that? We can do that in a couple of

[01:30] ways. The first way is that we can use the use store hook. So in here we have a hook called use store. So let's say uh let's create a constant here. Let's say first name in order to get updates for first name we can use this use store

[01:45] hook that we can import from tstack React Form. In here we pass it form dots store and then we have a second argument that we should pass in order to get specific things from the form. We don't have to pass it by the way, but it is

[02:00] recommended to pass it uh so that we can avoid this value being updated every time anything in the form changes, which is probably not what you need. So, let's maybe call this store here. And let's just maybe display it the same way we

[02:15] did before, like so store.

[02:18] Now, we're going to have this, but this time, every time we update something, this entire store is going to update. As you can see, we have our first name. And now in our field uh meta we have first name and we have our is dirty set to

[02:31] true. Also the is dirty on the form level is set to true as well and so on.

[02:36] However we don't need to subscribe to this entire object. This is probably inefficient. We only need specific values. So how can we specify values to subscribe to? We pass a second argument here. So let's get uh this back to

[02:48] username. And if we need to get or sorry the first name if we need to only subscribe to the first name we pass a function here where we're going to get our state and we just return the things that we need. So state dot values

[03:05] do first name. And now we can maybe duplicate this and do the same for is dirty and subscribe to uh I think it would be in state is 30 like so.

[03:21] And now let's maybe remove this object and display these values first name and is dirty like so. Now if we save this do something we're going to get updates here.

[03:36] So this is how we can subscribe to something in our form object in the most efficient way to avoid unnecessary rerenders.

[03:43] But in addition to use store, we also have another way to subscribe to some value and this is using the form.subscribe component. And this is better if we would like to react to some change in our form in our UI for the

[03:56] component. So let's say in our markup for our form, we need to maybe show or hide some stuff based on some value in our form. This way we can use a component called form.subscribe. So inside of form sorry inside of form we

[04:12] have a subscribe component.

[04:15] In here we composite a selector prop and in here we can pass a function that is going to receive our state and then we can return the value that we need to subscribe to. So let's say in here we need to subscribe to first

[04:28] name for example. the state values first name and let's say we need when uh if we have a first name we need to display a field for the last name otherwise we need to hide the field for the last name so in

[04:44] addition to selector we can also pass children we can pass it like so as a prop or we can just pass it in here and in our children function we are going to get the value that we subscribe to which is first name

[04:58] and we can returns something from here.

[05:01] So in here we need to check uh let's say in here we need to check if we have a first name. We need to display the uh the field for the last name. So what I'm going to do is I'm going to check for first name and then display the field

[05:13] for last name which is going to be exactly similar to this one. So I'm not going to type everything from scratch.

[05:18] I'm just going to paste some stuff in here.

[05:22] So in here we have the markup for the last name exactly similar to first name.

[05:27] uh we are passing the name of the field here and then in here we're passing the input. We're forwarding our own change on blur the value and so on. Exactly similar to what we've done for first name. So now as you can see we have this

[05:41] field here. However, if we remove our first name, this is going to hide because in here we are subscribing to changes in first name and based on our first name, we are choosing to uh display this field or not. If we type

[05:55] again, it should appear again here.

[05:58] Let's also by the way remove this object. Uh this object is the meta information for this uh first name field. Uh we don't need it for now.

[06:06] Maybe let's comment it for now. And why don't we do something? So in here, let's instead of maybe subscribing to first name uh only uh and is dirty, let's subscribe to all of our values for our form. So in here, I'm going to subscribe

[06:21] to state values. And maybe let's remove is dirty. This was just for testing.

[06:27] And down here I'm going to remove this is dirty from here. And let's instead of first name display all the values for our form. So in here we have all of our values. And if we type something this should update.

[06:43] But now let's say we uh type the first name we have our last name field appearing here. And let's say we typed something. Everything is updating. But now let's say we removed our first name again. Our last name is going to remain.

[06:58] However, let's assume we need if we clear our first name, we need to also clear our last name as well. How can we do that in TanStack form? What we can do is we can use listeners. So for any form uh or sorry for any field we have

[07:12] listeners where we can listen for changes in our field and maybe do something whenever the field changes. So in any field in our case we need to listen for changes in the first name. So we can pass listeners here and we need

[07:26] to uh listen for changes on change we can also oh sorry we need to pass an object here we can pass here on change on blur uh probably on submit as well and so on. However let's say whenever we change something in our field we need to

[07:43] do something which is clearing the last name. So inside of here we are going to pass a function. In this function we're going to have access to the value of the first name field. So we can dstructure value from here. And what we can simply

[07:58] do we can check if we don't have a value. So if we cleared our first name we need to do something which is clearing our last name. How can we clear our last name? In our form we have we have access to this function set field

[08:10] value where we can set a value for a specific field. In our case, we need to set last name and set it to an empty string.

[08:19] If we save this, type something in our first name, something in our last name, and then clear our first name, our last name should be cleared as well. So unlike uh form.subscribe subscribe where we change something in our UI based on

[08:34] the value of some field that we have or some state. We can use listeners in order to do something programmatic when the value of some field uh changes as well. We can also debounce this function as well. So in here we have the bouncing

[08:47] options. So we have on change the bounce and the bounce and this can be useful if we maybe in this onchange function send a network request or something. Of course, it wouldn't be efficient to send the request every time we change every

[09:01] time we type something in our input. Uh in this case, we can use this the bounce option or we can have on change the bounce and set it to maybe 500 milliseconds or so. So that uh this function will only run if we stop typing

[09:15] for 500 milliseconds or any time that we pass here.

[09:20] Uh one last thing I would like to mention regarding listeners is that in addition to having them in the field level, we can also have listeners on the form level as well. So in our not here in our use form hook, we can also have

[09:33] listeners and in here this is going to run uh whenever anything in our form changes.

[09:39] So we can in here pass on change as well for example. And in here in this function we are going to have a couple of stuff. We're going to have the form API. We're also going to have the field API of the field that was changed. So if

[09:53] we try to maybe console log these in here, let's maybe open our console and let's try to change something. So change something in our first name. We get the form API which contains the stuff for our form. But also we get the

[10:09] field API for the value that was changed which is first name. If we change this clear, if we change last name, for example, we get the same. However, field API this time is going to be the last name field. So far, we've seen how to
