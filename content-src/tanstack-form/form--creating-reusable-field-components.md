---
title: "Creating Reusable Field Components"
lang: en
chapter: form
slug: creating-reusable-field-components
order: 16
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=6626s"
---

> **Code repository for this lesson**
>
> Branch: [`useAppForm-3`](https://github.com/alialaa/tanstack-form-course/tree/useAppForm-3)


[00:01] maybe define a component for our text field. And for the other fields, uh I maybe also going to do them and walk you through them quickly. But let's do the uh the text field or text input. So in here, let's go into our um let's say in

[00:15] our components folder. Let's maybe create another folder. Uh so this UI one is uh the chat components. Let's create another one for our own components.

[00:26] Let's call it maybe form.

[00:28] Inside of form, let's create a component for our text input. So, let's call it text input.tsx.

[00:37] Now, in here, let's uh just define a react component. And what we need to do is we need to copy the stuff that we do in our form in order to display the input. So, let's copy all of that from here.

[00:48] And let's actually cut it as well. So, I'm going to cut this from here. And just simply put it here like so. And we need to also import our stuff. Let's maybe copy this from here.

[01:02] Import our stuff like so. Uh we don't need all of that. So let's remove unused imports.

[01:09] And uh let's also import our input. And let's save. And now we're going to have this problem where we need to have access to the field in here. When we created the form, we have access to this field in this function, right? But now

[01:20] as we've mentioned, we're going to have access to it using the context. So in here in form context.tsx remember we were exporting a field context and use field context and we are passing this field context to uh the function that

[01:35] creates use app form here or here. So when we use use app form now in our form which we are doing uh use app form when we create a component for a field this field is going to have the field context provided. So we can just simply use the

[01:55] use field context function in order to have access to the field. So in here we can use uh we can call use field context. Just make sure this is the use field context that you exported from uh this form context file here. Right? And

[02:12] we just need to give it a type. Uh so this is a text input. So our field is going to be a string.

[02:18] And by doing so I guess we should not have any errors. What we need to do though is we have some hardcoded stuff here. So the label, the description, the placeholder and so on. So what we need to do is we need to be able to change

[02:32] these when we use our component. So we can just pass these as props. So let's define our props here. Let's say label description. And also uh remember we have this ID that we pass here and here.

[02:45] We need to make this a prop as well.

[02:47] Let's also give it a type. So label is going to be a string. already string description. Let's make it optional string as well. Now we can simply remove this replace it with label.

[03:01] Let's also make the placeholder the same as the label. You can make a specific prop for it but uh let's keep it simple.

[03:08] And for this and this we need to pass the ID.

[03:12] And in here we need to pass our description like so. Sorry description.

[03:20] And in here we are just rendering the errors. I guess we will not have to change anything here. And now by having this component we can go in our form.tsx and pass it here in our field components so that we can have access to it in our

[03:33] form and just use it instead of having to do all of the boiler plate for each field. So in here we can pass a component. You can call it anything. I'm going to go to text input and pass it our text input component

[03:49] that we just created which is uh make sure to import the right one which is inside of the forms folder or sorry the form folder that we created inside of components like so. And now finally we can go back to our form and remember we

[04:06] removed the stuff that we were returning for first name and now we can simply return field and then inside of field we're going to have access to the text input component that we pass uh in here when we defined our hook. However, we

[04:22] have to modify something a little bit.

[04:24] So now instead of using form do field we need to use form app field. Why? because this is going to provide the context needed uh for our text input component the context that we are using here. So we need to change this from form field

[04:41] to form app field and then close it like so.

[04:45] And now uh we're going to have access to our components. In our case we have our text input where we just need to pass it uh the first uh sorry the ID. Let's say first name the label and uh we also have an optional description as well. Uh by

[05:03] the way I think we need to uh in here we need to check that we have a description before displaying sorry before displaying the uh field description component.

[05:15] So now if we save this we get our first name. However, as you can see this is now a lot smaller than what we had before. We don't have to pass any values, any callbacks, just this simple field component. If we would like, we

[05:28] can also pass a description. And uh it should show up like so.

[05:34] And now we can simply do the same for the rest of our fields. So let's maybe uh do it for the last name as well. So remember if we have a first name, we have this last name field. So in here, as you can see, this is the amount of

[05:50] code that we can remove. now. So let's remove this and simply oh sorry let's remove from here from field to here like so and simply change this

[06:06] to app field and in here just simply uh use field dot text input and post our stuff. So, our ID, a label, and optionally a description as well.

[06:24] So, great. As you can see, our forms can be a lot smaller in size. Now, if we do the same thing for the rest of our fields, I'm also going to uh remember we had some stuff that we were testing with here. So, these validators, for example,

[06:37] let's just uh instead of having a lot of noise here, remove these and the listeners as well from here like so.

[06:46] And also remember we were having form.subscribe here in order to only show the last name if we have a first name. This was just an example also. So let's maybe remove it. Uh remove this and only keep our form like so. Uh our

[07:02] field sorry. And now what I'm going to do is I'm going to do the same for the rest of our fields. So I'm going to create a component for the dropdown, a component for the checkbox and so on.

[07:14] and also use him here and u walk you through the result. I'm not going to do this on screen because I guess uh it will just be pointless. It is going to be the same process just creating components and using them here. So now

[07:26] after I am done with uh creating components for our inputs and updating our form and using these components as you can see our file our register form uh is now almost half in size and we can even do better. We're going to see

[07:41] later, but for now uh this is much better. So what I have done is I've went into our uh components folder. In here in the form folder, I created a component for checkbox and for select as well. And also for text input, I have

[07:59] just uh modified it a little bit so that it accepts a type as well. By default, it is text but uh we can override the type so that we can use it for the password field as well. But then I created a checkbox component in a

[08:11] similar way. Uh, of course I'm going to put you the code for this and I just realized uh this I have no idea how this happened. However, let's fix it quickly.

[08:22] Uh, we also need to pass maybe an ID here for our uh component and then give ID to our checkbox and in HTML 4 here pass the ID like so.

[08:37] Sorry for that. But anyway, the same concept. We create our checkbox. We pass it our stuff. We have access to the field using a use field context. And we also display our errors. And uh this should be called checkbox. Looks like I

[08:50] was in a hurry when I created these. And let's also call it something else because we already are already importing the checkbox from chaten.

[09:00] But anyways, now also the select component as well. I've done it in the same way just using the chat components and passing the props that we need uh and displaying the errors and so on. And then in our form we need to pass these

[09:16] components to create form hook so that when we use use app form we're going to have access to these and by doing so in our form I have used these components for all of our fields. So let's go through these

[09:30] quickly. We have our first name now it is much smaller. our last name, our address as well. Just don't forget that you need to wrap your components with form.app field instead of form.field for the password as well. Same thing.

[09:47] Just pass the type of password here.

[09:48] Confirm password. And then for the skills array, I have um changed the styling a little bit, but it is pretty much the same. But now I'm using the of course, don't forget the form.app field here and here. And also I use the select

[10:05] component uh that I defined here as well.

[10:10] Finally um for our checkbox as you can see much smaller just need to pass the ID that we just fixed.

[10:19] So let's say accept terms and in here form.subscribe and the buttons. Uh I have not done anything here. So it should work exactly the same. If we submit we should get our validation and everything. But now our form is a lot

[10:33] smaller in size and a lot easier to use as well. We can still do better though.
