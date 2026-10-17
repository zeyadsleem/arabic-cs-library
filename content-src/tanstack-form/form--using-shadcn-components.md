---
title: "Using shadcn Components"
lang: en
chapter: form
slug: using-shadcn-components
order: 14
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=5718s"
---

> **Code repository for this lesson**
>
> Branch: [`shadcn-components`](https://github.com/alialaa/tanstack-form-course/tree/shadcn-components)


[00:00] So now that we are familiar with TanStack form APIs let's now see how we would actually use TanStack form in production. So normally in production you might be using something like a components library or you might have

[00:13] your own components. However, you are probably not going to use uh just a normal input tag here and style it every time you need to use it and so on. You probably have a component that you're using or you are using some components

[00:24] library. In our case we are having chats installed. So let's try and integrate chats with TanStack form and use the field component that we get in chat. So in chat scene we have this field component where we can have a field and

[00:37] uh it can be just a text input a dropown it can be a checkbox it can be anything and in addition to that we also have components for validation errors for example. So if we scroll down here uh somewhere here we should find uh this

[00:51] field error component for example that we can use to display errors instead of the uh stuff that we are doing here at the moment. So let's now try to use this field component. So what we need to do first is um we need to add the uh chat

[01:05] in component that we need to our project. So I'm going to go here in my terminal. I'm going to run this. So mpx chat and latest and then add and then I'm going to add the field component the input select checkbox and the button

[01:19] component as well. Now if I run this uh we should in our project have these components in our folder. So after this is done, if we go back here, we should find the components folder with all the components that we have

[01:35] installed. And now let's try to use it for maybe our first name first. Uh so in here we have the field for our first name. Now when we render our children, let's maybe uh remove all of that. And now let's use our um chat component. So

[01:50] in here I'm going to import the field from our UI components UI folder, the field component. And then to add a label, we use the field label component.

[02:01] And then let's add first name. And in here, let's add HTML 4. Uh let's say first name as well. And I guess I did not import the field. Let's import it.

[02:12] And now after our field, we need to import our input from our components folder. And in our input, we're going to need to similar to what we've done with the HTML input pass our stuff. So we need to have an ID here of first name.

[02:25] And just to save some time, this is going to be very straightforward. So I'm going to paste the stuff that we need.

[02:30] Just add a type of text, a placeholder, and also we need to pass the value from our field that we get here in our function umbl and onchange similar to what we've done with the HTML input.

[02:41] Over in chat, we also have a description component field description that we can use. So maybe in here you can add some description. And finally, we need to display our errors. So remember uh how we display our errors is that we check

[02:54] if our field is not valid. We display this div. Let's actually copy that again and put it here after our description.

[03:02] However, now instead of using this div, let's actually use a component from chaten which is field error. This one.

[03:11] And let's close it like so. And just put the error inside of this component. Now if we save this, as you can see, we get our component here. And if we have errors, it should display uh like so. We also need to um wrap everything with a

[03:28] field group component. This is going to help in styling. So maybe before after inside of our form and before our fields, wrap all of our field with a field uh group component that is actually also installed in chat. So

[03:45] let's close this in here like so.

[03:51] So now we have some spacing after our field. And now we can just simply do the same for the rest of our fields. I'm going to do it and walk you through it quickly because uh it is kind of pointless to do it on screen. So now I

[04:04] have changed all of our components to uh the chat ones. So the first name we've already done it. Uh the last name is actually also a text input. So it is in just exactly similar. So let's maybe close that. And for uh the street, this

[04:23] is also a text field. Exactly similar for the password. Also a text field. The only difference is maybe just the type of password here. And same for confirm password as well. For this array um array of skills, I have just used uh

[04:38] some components here from chat as well.

[04:40] Field set, field legend, and then another field group wrapping everything in our loop. and then I'll just display uh a field. But now in this case we have a drop down and not a text input. So I just used uh this select component from

[04:55] shad CN. However, something that might be different uh from one component library to the other is maybe these events. So for this select component for example, we pass it the value here. We also pass it on value change when the

[05:07] value changes. So we need to call handle change in this callback. However, unblur in this component uh is passed to this select trigger and not to the select. So maybe this is just something that you have to be aware of depending on which

[05:21] components library you are using. And then we have this select content where we put our options uh for the dropdown.

[05:28] So we have our beginner intermediate expert like so. And of course I also used the button component from chaten.

[05:36] So now we're using the button component from chats and not the normal HTML button. And finally uh we also have this uh accept terms field where I use this checkbox component from chat and I pass it our stuff. So maybe for the checkbox

[05:53] uh the value is going to be in this checked component. So we need to pass our value from our field state to the checked prop. And also when the value changes this is going to be handled by this unchecked change. So we need to

[06:05] call handle change in this uh call back and the blur is simply on blur and this is mainly it for also the submit buttons I just uh removed the HTML buttons with the styling that we were using and just used the button component from chaten as

[06:23] well. So I'm going to put you the code for this if you would like to take a look as well. So now by using the chaten
