---
title: "First Form"
lang: en
chapter: form
slug: first-form
order: 2
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=313s"
---

> **Code repository for this lesson**
>
> Branch: [`first-form`](https://github.com/alialaa/tanstack-form-course/tree/first-form)


[00:01] let's say now that we have a register form for example that we need to create.

[00:05] So first of all I'm going to go in here uh maybe in this lip folder or so create a new component. So in here I'm going to create a component. Let's call it register form.tsx.

[00:17] Now first of all I'm going to create a TypeScript interface here that is going to contain everything that our form is going to have. So let's assume our form is going to have. We have an interface here register form. We're going to have

[00:29] first name, last name, age, uh email, password, confirm password. In addition to that, we're also going to have nested stuff. So we're going to have uh an address. An address is an object and inside of it we have nested uh fields

[00:44] like street, city, state and so on. And we also have an array for example. So we have an array of skills and this is an array of object where each object in this array contains a name, ID and a level of experience uh beginner,

[00:58] intermediate, expert and we can have a boolean as well. So we have an accept terms field here. So in here we have pretty much all possible types uh that we can have in a form.

[01:10] So this would be a good example. But now let's create our component. So I'm going to create a component here register form. And from here we're going to return some markup. So in order to use tst form first of all we use uh the use

[01:25] form hook. So in here I'm going to define a new form and I'm going to import use form from tst form and in here we need to specify our default values. So we can specify default values here.

[01:39] And let's say initially we're going to have an empty form. So in here I'm going to define this constant default values which has a type of register form. And then I'm going to just uh define some empty values in here. So in here we can

[01:52] just pass this to our use form hook.

[01:56] You can however maybe you have an edit form that will have some fields populated. What you can do is you can populate the fold values with something that you maybe load from an API or database and so on. You can do that by

[02:08] simply uh we have an example here in your default values add some data from some state. So in here for example we have uh an example using the use query hook from um TanStack query where we load some data from maybe a database and

[02:24] we get our data and we put our data here in our default values instead of just the empty fields that we have here and also we only render our form when our loading is done as well. But in our case, let's maybe keep it simple and use

[02:39] our empty form for now. But now that we have this form, we're going to be able to render our fields by using some components inside of this form. So in here, let's first create a form. And uh we're going to maybe handle submission

[02:54] later, but let's have just a form. And in here, we need to render our fields.

[02:58] So what we can do is we can use form dot field. And in here, we will need to give it a name. And this name should be one of our fields. So we're going to have TypeScript completion here and type safety for our possible fields that we

[03:12] specified in our type. In our case, let's maybe uh let's say we need to render our first name as children or as a child to form field. We can pass a function and in this function we're going to have access to this field

[03:27] object. So we're going to take a look at that in a moment. So in here we can return something. Let's maybe just return nothing for now. And let's maybe console log this field. See what what we're going to have inside of it. And

[03:42] also while we are here, let's console log our form as well to maybe take a look at what we're going to have in this form. So by saving this, let's inspect here and take a look at our console.

[03:56] And of course, sorry, we need in our app.tsx, we need to render our form. So let's import register form from our lib like so.

[04:06] So we have a form API and we have a field API. So of course form API is coming from here. Field API is coming from here. In the form API, we have some stuff related to the entire form. We're not going to go into details for now,

[04:23] but these are some APIs related to our entire form and not just a specific field.

[04:29] And then in our field API, we have things related to our specific field. So have things like get value, get meta. We also have the name of our field. As you can see here, first name. We should also have a state here for our field which is

[04:44] going to contain everything related to our field. Uh errors, the value, if our field is dirty, and so on. We're going to see everything in details. Uh this is just a quick look. But now let's remove these logs and let's actually use

[04:59] something from our form API that we've seen which is a function that is going to handle submission. So in here uh on submit we're going to need to pass a function here and in here we are going to need to prevent the default

[05:11] submission and let stack form handle the submission by calling a function in inside of this form API. So in here in form we have handle submit that we can call. This is going to handle uh submission validation and so on. We're

[05:26] going to see more details in a moment.

[05:29] But before submitting our form just need to mention something quickly here. So when we pass these default values uh we can pass them like so which is fine.

[05:38] However we can also use a function called form options where we can define form options that can be shared across multiple forms. So in here for example we can have a constant let's call it form options. In here we can call a

[05:52] function called form options from uh TanStack form and in here we can pass some form options like validation uh sorry like default values uh sorry let's call this maybe something else. Now by having this we can maybe export this and

[06:08] use it uh across multiple forms. how by just simply in here instead of defining default values we can just spread whatever we have in form options like so and this is going to be exactly the same. So now for this specific form we

[06:21] can reuse these options and then we can maybe add specific options for uh this form as well. So great. So let's now pass the first option that we need to pass which is onsubmit. This is going to be the function responsible for handling

[06:35] the submission of your form. So when we submit our form, this function is going to run and we're going to get some stuff in here. Let's maybe call it data and let's console log it.

[06:48] So let's console log data. And now let's submit our form by maybe in here just add a quick button here. Submit. And give it a type of submit as well. So now we have this submit button. When we click on this, remember when we submit

[07:04] our form, we are already calling form.andsubmit. handle submit which is going to call this function that we pass here in use form. So let's click on that and we're going to get some stuff including our value the value for our

[07:17] form. Of course we did not um change anything in our fields. So we get our default values here. So from this function we can get our value and maybe we can do something with it. Send the request to some API and so on. But now

[07:33] let's finally display our fields. So remember in here we have this form field and we were returning uh just nothing here. Now let's return some input to manipulate our first name. So I'm going first to use uh just a normal HTML input

[07:47] and then later we're going to use components from chatan as well. But let's for now just add uh some wrapper div here with some margin bottom. And now let's add our input. Sorry. In our input, we're going to need to pass some

[08:03] stuff from this field that we get here.

[08:05] First of all, I'm just going to add some styling. So, it is going to look like so. Also, let's just make it uh let's add some classes to this div so that it looks a little bit smaller. So, here it is. So, what do we need to do here? We

[08:22] need to pass the value for our field which we can get from our field. And then inside of state we get our value.

[08:33] And now we need whenever we update our input to update the the value of this field. And we can do that by passing an onchange function here. And on change we need to get our value which we can get from our event. and then call a function

[08:47] that exists also in our field which is um handle change. So handle change and we need to pass the value which is event target value.

[09:02] Finally we also need to add an unlur function and call a function from our field that is going to handle blur because blur we can do some validation as well. So we need 10 stack form to handle that. So we need to call a

[09:11] function from field which is handled blur like so.

[09:17] And this should be pretty much everything that we need to pass to our input from our field that we get here.

[09:24] Let's also just maybe add a placeholder here. First name. And now let's maybe give it a refresh. And now when we type something here, this should update our form. How can we know? Uh, of course we can confirm by maybe taking a look at

[09:40] our console logs and click on submit.

[09:43] And now in our remember in here we are logging our value for our form. Now in here we get the value for our first name that we typed.

[09:52] We can also um use these dev tools.

[09:55] However, as I'm recording this uh these dev tools are a little bit buggy. So sometimes it might not show the form here. But anyways we have uh we can click on tstack form. You should have a form here and in here you will have

[10:10] information about your form and as you can see we have the value for our first name and we also have some meta information. It's going to contain information about our fields um if it has errors and so on and this is what

[10:24] we're going to discuss next. Let's now
