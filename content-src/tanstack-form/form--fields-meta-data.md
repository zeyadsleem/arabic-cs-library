---
title: "Fields Meta Data"
lang: en
chapter: form
slug: fields-meta-data
order: 3
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=939s"
---

> **Code repository for this lesson**
>
> Branch: [`field-meta`](https://github.com/alialaa/tanstack-form-course/tree/field-meta)


[00:01] take a look at uh these meta information that we get for each field and what they mean exactly. So we can use the dev tools. However, for me, when I have the dev tools opened and I change something, uh, the field becomes a little bit

[00:15] laggy. So, I'm not going to use these for now. What I'm going to do is I'm just going to display the meta information in our markup by going in here and maybe when we display uh our input for our field, let's also display

[00:29] the meta information for this field by maybe going here and uh displaying this using JSON. Stringify. So JSON stringify and then pass our field. This is sorry field. This is going to live in state and then meta.

[00:44] In order to make this look pretty, we need to pass null here and two for the tab width. And also we need to wrap this in a pre-tag like so.

[00:53] By having this, we're going to have the um information for this field in here.

[00:59] But now let's give it a refresh. Start from scratch. And let's discuss some of these and what they mean. Of course, you might already be familiar with these terms. So, is touched for example is going to be false initially until we

[01:13] either change our value or just focus on our value and blur. So, if we go in here, change something as you can see is touched is now true. However, let's refresh. If we just uh focus and blur is touched is also going to be true even if

[01:30] we did not change the value. And then we also have is blurred which is pretty self-explanatory. If we blur if we were focused on the field and then blur this is going to be true. And then we have is dirty which is going to be true only

[01:46] when we change the value of the field.

[01:49] So if we do some changes here is dirty is going to be true. Even if we reverted our value back to uh the original or the default value, is dirty is still going to remain true since it was changed at least once. Even if the value for it now

[02:05] is the default value, it's going to remain dirty. Is pristine is the opposite of is dirty. Initially is going to be true. Once we change something in our field, it is going to be false.

[02:18] We're going to skip is valid for now.

[02:19] This is related to validation which we're going to discuss later. However, is default value. This can be used if you need to check that uh the value of the field is currently the default value even if it was touched before. So even

[02:32] if the value is dirty but it has the default value, this is going to be true.

[02:37] So we can do something here. Now it is false. However, unlike is dirty, if we revert back our field to the default value, this is going to be now true. And this is how we can know if our value is the default value. we should rely on

[02:52] this and not on is 30. So that's it for now. The rest of the meta information we're going to take a look at later.

[02:59] However, what we can do now is in addition to having these um information on the field level. So remember currently we are displaying this in the field for our first name. But we can also access the same information in the

[03:14] form level as well. So in this form object we also have some information. So let's maybe uh add another pre-tag here.

[03:23] However, this one let's add it before the form and it displays form.state.

[03:29] If we save this, as you can see, we get a lot of stuff here. So it uh ends here and it starts from here including the values and also we have meta information for each field.

[03:42] So we have our meta information for first name and we have the same stuff that we have on the field level.

[03:48] However, let's try to change something here. So now is dirty for example is supposed to be true. However, if we take a look at it here or sorry maybe I guess we just need to refresh.

[04:01] So initially is dirty for example is false here and in the um in the form level field meta is not going to contain anything initially. Now if we change something here is dirty is true and field meta is

[04:17] still an empty object. It did not update when we change something in our field.

[04:23] And this is because by default um tstack form is going to avoid unnecessary rerenders to your form component when something in your form changes. So if you need to depend on something in this form object here, you need to somehow

[04:38] subscribe to it, which is our next topic. Let's now say we need to use
