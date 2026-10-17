---
title: "Linked Fields"
lang: en
chapter: form
slug: linked-fields
order: 10
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=4147s"
---

> **Code repository for this lesson**
>
> Branch: [`validation-5`](https://github.com/alialaa/tanstack-form-course/tree/validation-5)


[00:01] for some field can depend on another field. So for example let's say we have uh remember in our form we have password and confirm password in order to validate the confirm password field we depend on password and also when we

[00:16] change our password we need to update the validation for confirm password and so on.

[00:22] So first of all we don't have these fields yet in our UI. So let's add them.

[00:25] I'm going to paste uh these fields quickly since we have already done something similar. So let's put them here maybe after this uh street field that we have here. So we have our street. Let's maybe after our street I'm

[00:38] going to paste a couple of fields like so. So we have our password field which has an input of type password and we pass everything similar to what we've done in the other fields. And the same for confirm password as well. So now if

[00:53] I save this I'm going to have password and confirm password. In our confirm password uh this might have an error if our passwords do not match. So I'm just going to copy the uh how we display the error here from another field and also

[01:09] in our confirm password field I'm going to display this error. Now in our confirm password field let's add our validators right. So in validators I'm going to add an object and let's say let's do it on change for example every

[01:21] time we type we need to make sure the passwords are the same the main password and the confirm password. So in here we should get a function and in the function we have a couple of stuff. We have our value for the field but

[01:34] remember sorry remember we also have the field API as well. The value is going to be the value for confirm password. And to get the value for the password so that we can compare them we can use this field API. So in here we can check if

[01:50] the value is not equals to and then in field API we can have access to the form and in the form we have access to uh a function called get field value where we can get the value of any field.

[02:03] In our case we need to get the uh the value for password. If they do not match we need to return an error. Let's return passwords do not match. Otherwise, we just need to return undefined, which means we don't have any errors. And this

[02:18] should work. If we type maybe 1 2 3 4 here and 1 two here, we get our error.

[02:24] However, if I type 1 2 3 4, we should not get the error. However, now if I change the main password to maybe 1 2 3 4 5. Now, they do not match. However, we don't get the validation for confirm password. It is not going to run since

[02:40] we did not change the confirm password.

[02:42] However, we changed the password.

[02:44] However, we can make the validation for confirm password change when the main password changes by doing something here in validators. We can post on change listen to and then we can listen to we can pass an array here and we can listen

[03:00] to other fields when they change. In our case, we need to listen for password.

[03:05] So this means the onchange validation for confirm password is going to run when password changes as well. So if we save this now if we type here now it's not working. Maybe I need to refresh or so. So let's type 1 2 3 4 and uh maybe 1

[03:22] 2 3 4 and then change this to five. Now the validation for confirm password is running even though we did not change confirm password itself but we changed the other the main password and of course in addition to onchange listen to

[03:37] we also have on blur listen to as well.
