---
title: "Ignored Folders"
lang: en
chapter: router
slug: ignored-folders
order: 7
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2592s"
---

[00:03] might need to create some folder here to maybe put inside of it some components.

[00:08] However, you don't need to create a route for this folder. So, for example, let's say inside of this settings layout, we need to put a folder to put inside of it components related to settings. Of course, you can put it

[00:20] outside of the routes folder in a shared component, but maybe you prefer to put components related to settings inside of the settings folder or settings layout.

[00:29] If you create a folder here and call it components, this is going to create a route. So in order to create a folder that is going to be ignored by TanStack router, you just add a minus or a dash before uh the folder name. So if you add

[00:44] dash components like so and then inside of it let's say uh add a component called navigation or so.tsx.

[00:54] Now this is going to be completely ignored by TanStack. If you take a look at our tree here, we're not going to have anything related to this folder.

[01:03] Now we can put uh let's say um in our route layout maybe we need to move this navigation to this component. So let's move it from here. Uh create a new component.

[01:19] Put this here.

[01:19] Import our stuff. So import link from tstack router. Let's remove this as well. Now we have this component here and we can just import it here. So nav from our components folder like so. And this

[01:35] one is ignored. So we are not going to have components/nav route. And now if you save this, we're going to get the same. But now we have our um layout more organized where we have a folder for components and we have our navigation

[01:50] inside of here. So I would like to also mention one final thing related to the folder structure and the naming conventions that we have here which is groups. So in your folder you can have in your routes folder of course you can

[02:04] have folders wrapped in brackets or parenthesis and these folders are not going to affect the URL in any way. They are purely organizational uh if you would like to just organize your routes into different folders.

[02:20] However, we're not going to have app in our URL. It's not going to have any effect. So, I'm not going to try it, but uh just keep this in mind if you'd like to use it in your project. In addition
