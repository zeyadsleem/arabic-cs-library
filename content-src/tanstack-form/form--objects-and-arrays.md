---
title: "Objects & Arrays"
lang: en
chapter: form
slug: objects-and-arrays
order: 5
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=1842s"
---

> **Code repository for this lesson**
>
> Branch: [`objects-arrays-booleans`](https://github.com/alialaa/tanstack-form-course/tree/objects-arrays-booleans)


[00:02] add inputs in order to change our fields. However, we tried to change our first name and last name. But what about changing fields uh that are nested? So, if we would like to change the street inside of address, how would we do that

[00:15] in Danstack form? And it's actually very simple. So, let's go down here in our form. Let's say after our last name which is inside of subscribe here let's put a new field and what we simply need to do is when we specify our name for

[00:30] our field so field uh sorry form field in here when we put our name we just put our nested object or our nested item in the object using dots and we are and we actually get autocomplete here so you get an idea of how it is done. So if

[00:46] we'd like to change the street for example, we do address street and then inside of here it is just exactly similar to what we've done before. So we have a function where we get our field and in here we can return our field. I'm

[01:00] just going to paste this markup. It is going to be exactly similar to what we've done before.

[01:06] So now we have the street input and if we change it is going to change the street that is nested inside of address.

[01:14] But what about arrays? So in here we have this uh skills array and let's say we need to be able to add items to this array, remove items, uh change stuff inside of the items in the array. So this is remember an array of skills and

[01:29] each skill is going to contain name ID and a level. Let's say you would like to change the level for a skill inside of our array. How can we handle that in 10 stack 4? First of all, I am going to put some dummy skills initially in our

[01:43] default values. So in here I'm going to put like so an array of dummy skills. So just a name, random ID, and a level. And what we need to do first is just display our skills. So in here, let's go after our um field that we just added the

[01:59] street one. And let's put a new field.

[02:02] So form field. And this one is going to be for our skills. However, we need to do something else here. So in addition to name of skills, sorry skills, we also need to add a mode of array, right?

[02:16] And now inside of here, we are normally going to get a function with our field like so. And in here, we can return our markup. In our markup, let's maybe just wrap everything with a div. And let's maybe add some text of skills. Oh,

[02:31] sorry. And then maybe inside of another div, let's do a loop to loop through our existing skills. So this is going to be found in uh in field state value. And this is going to be an array that we can map through and for each item we let's

[02:48] call it skill. And we're also going to have our index. And then we can return something for each skill. So in here, let's also maybe do a div. And inside of here, let's display our skill name. And let's also add a dash here and display

[03:07] the uh skill level as well.

[03:11] If we save this, we're going to get uh let's maybe give it a refresh.

[03:17] Uh let's also maybe uh let's maybe hide this or maybe let's put this uh object that we are logging uh below our form.

[03:26] We're going to need to take a look at it. But uh let's maybe just put it down here. So now we should have our skills and we have our list of skills here, HTML, CSS, and JavaScript and so on. And what we need to do next is we

[03:41] need to be able to add new skills, remove skills, and also change the skill level as well. Uh I'm just going to quickly make things a little bit clear.

[03:50] Uh let's give uh some styles to this submit button. And also let's uh for this pre-tag add some space here. And uh sorry margin top.

[04:01] And I'm just going to keep it uh we're going to need to take a look at it later. But for now let's handle uh removing skills and adding skills as well. And this is actually made very simple by TanStack form. TanStack form

[04:14] is going to provides us with some functions that's going to make adding and removing pretty easy. So in here for each skill, let's say we need to add a remove button. So maybe in here, of course, I'm not giving too much

[04:25] attention to our markup and styling and so on. We just need to focus on the concepts. So let's add a quick button here. Sorry, button like so. And let's say maybe uh let's add an X here. And I'm going to give it some styles. So

[04:40] we're going to have this button. And now let's do something on click. And on click, we need to remove the uh skill.

[04:49] So how can we do that? intent stack form we get a inside of our field we get a function here to remove items from this array. So we have remove value and then in here we just posit the index of the value that we need to remove. Of course

[05:03] we get the index here from our map function and that's pretty much it. If we now click on this we're going to remove our skills.

[05:11] And of course as you can see this reflects here as well. So now we have an empty array. Let's refresh. And let's add another button to add elements to this array, which is also pretty simple.

[05:22] So, let's maybe go in here after our loop, maybe after this div, let's add a button to add a new skill. So, I'm going to add a button. Uh, let's add some text. Add skill.

[05:36] In here, I'm going to add some styling.

[05:38] So, we have this button here. And then on click, let's add a new skill. Of course, I'm going to just add some dummy skill here. This can be uh of course in reality something integrated with some back end that you have and stuff like

[05:50] that. But I'm just going to add uh some dummy skill. So to add something to our array, we call field push value and we just simply pass a new value. So in our case, we have an array of objects. So we need to add an object here with our

[06:04] name. For our name, I'm just going to add a new skill. And maybe we can in here uh check the current length for our field. So field state value uh llength and then maybe add one to it just some random text and then I'm going to also

[06:24] add a random ID so we can use crypto u ID and finally I'm going to add a level let's say beginner and just by doing that now if we click on add skill we're going to get a new

[06:39] skill added here and of course it goes without saying but if we Take a look at the value for our skills field. Now we should have the new items in our array as well.

[06:51] All right. Now let's do one final thing which is editing the uh skill level inside of our items inside of our array.

[07:00] So we need to have fields to manipulate this value the value that we have inside of our array for our level inside of this object. Right? So how can we do that? Let's go back here.

[07:14] Let's maybe clean things up a little bit. So, let's open the div that contains our skills. And by the way, in our loop, we need to add a key here. So, let's say skill id. What I'm going to do is I'm going to maybe uh remove our

[07:29] level from here. We're going to display it in a different way. And let's also wrap this in a span, the skill name.

[07:36] And let's make everything um next to each other by adding a class name, a flex and items center like so. Let's add some margin bottom and also let's add a gap of two as well.

[07:51] Now we have this and what we need to do now is we need to put a drop down next to the skill which is going to display the currently selected skill level and we are going to be able to change it from this dropdown as well. Right? So

[08:03] notice that we are already inside of a field uh in here which is the skills field and we need to put another field inside of it for the skill level. So we need to have some sort of a sub field inside of the skills field and we can do

[08:16] that normally by just adding another field inside of this skills field which remember has a mode of an array. So let's put it after the name here. Uh I guess we will need more space. Let's put another field for the skill level. So in

[08:31] here form field and the name is going to be let's close this. So the name is going to be inside of the skills array we need to target a specific skill. So one of these objects and then inside of these uh inside one of these objects we

[08:47] need to access the level. So we're going to need to have some dynamic stuff here.

[08:52] So let's put this in a string uh template. So and inside of skills we need to target the current uh item in our array. So we have our index. So what we need to achieve eventually is something like this skills of zero uh

[09:07] level so on. But of course this zero we don't need to hardcode it. We need it uh we need to depend on this index.

[09:15] So we can just remove this and put our index like so. And let's maybe inside of this field just display our value quickly. In here we're going to similar to any field get a function with our field. Let's maybe call it sub field

[09:28] this time and we can return something.

[09:31] For now let's maybe just uh display the sub field dot uh state value. And now if you take a look here we have our value beginner beginner beginner and so but now that we have

[09:46] this as a field we can now add of course instead of just displaying this value we can add an input a dropdown to be able to manipulate this value as well. So this is also going to be similar uh to what we've done with the input but we're

[09:59] going to just use a dropown instead. So let's do it this time. Let's add a select input and I'm going to give it uh just some class names for styling.

[10:10] So it should look like this. And now we need to put our possible options which are the um beginner uh intermediate expert and so on. So we can do that like so just putting some option tags here with our values and our text. So now we

[10:27] have that. And finally we need uh similar to what we've done with the other inputs we need to forward we need to display our value of course and then forward on change and unlur uh so that when we change our field it will

[10:39] actually change in our form. So this is also going to be pretty similar. Uh let's do it in our select here. Let's put our value which is going to be um sub field this time and then state dot value. And similarly we can do the blur

[10:59] which is going to be inside of sub field handle uh blur. And finally on change sorry on change in here we're going to get our event that contains our value and what we need to do is we need to call sub field and

[11:17] then handle on change or handle change and then pass it to the value which is going to be in event target uh value like so and now by doing that uh I guess uh this should be everything now if we change

[11:34] something here. Let's change this to expert. This should update our form and we should see it here. So we have level expert and of course we can do it to any other field. So here we go. And now we are able to add, remove and also change

[11:51] something inside of our array of objects in our form. So this is how we can deal with arrays and sub fields in 10 stack form. So now we've seen how to handle normal strings. We've seen objects and also arrays. Uh let's also finally see

[12:06] this uh boolean that we have here and how to manipulate this value as well which is going to actually be very straightforward. So let's do it quickly.

[12:14] So after maybe this uh long one this array let's put a field. I'm going to paste it because it's going to be pretty straightforward very similar to what we've already done. So I'm going to paste this field which is going to be

[12:28] responsible for the accept terms item that we have here which is a boolean.

[12:33] But now when we render our field I'm going to render a checkbox. So I have an input here with a type of checkbox and I'm just normally passing the value unblur and onchange.

[12:43] Maybe the only difference here is that um onchange here is going to have the value in event.target checked and not event.target uh value.

[12:53] This is maybe the only difference. And now if we save this, we are going to have a check box here. If we check it, it should update our accept terms and set it to true. Uncheck it, it should be false. And so now, of course, I know

[13:08] what you might be thinking. We are having a lot of code here, a lot of boilerplate uh for a form that is relatively simple. But as we've mentioned before, don't worry. Uh at the end of the video, we're going to

[13:20] discover a way to somehow abstract our form and make it a lot smaller in size.

[13:24] Uh however, for now, let's focus on our next important topic, which is validation. Let's now see how can we
