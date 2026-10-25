---
title: "Building a Checkbox Component"
lang: "en"
chapter: "figma"
slug: "building-a-checkbox-component"
order: 26
source: "https://stevekinney.com/courses/figma/building-a-checkbox-component"
---

> **Solution**
>
> This is the solution for the exercise in the section on [interactive components](https://stevekinney.com/courses/figma/interactive-components).

Let’s start by setting up some color variables. I have long given up have the smallest possible set of variables for colors humanly possible. I now aim for the smallest set *practically possible*. So, I’ll probably make two variables for the background colors of the checkbox.

![New variables for the checkbox background](/images/kinney/ede35292cd48ac63.webp)

I going to make a few variations:

- **Checked** can either be true or false.
- **Focused** can either be true or false.

I’ll end up with something like this.

![Checkbox states](/images/kinney/26c10435026f8671.webp)

And now, we want to create a component set. Since I did a good job with my naming, we should get a fair amount for free here.

![Checkbox component variants in Figma](/images/kinney/ef758900a783f46d.webp)

Next, we want to add an interaction to the component.

If you wanted to, you could try to simulate the focused state with a hover transition, but that feels a little forced, so I’m not going to.

You can see in action [here](https://www.figma.com/proto/k2WU0bJ53LG4Kl6hoBCITR/Curricula-Components?page-id=0%3A1&type=design&node-id=22-1009&viewport=-5532%2C-4146%2C5.6&t=AyXsLsPZMzFZrDNN-1&scaling=min-zoom&mode=design).

## Expanding the Component

Next, we’re going to expand our checkbox to be a checklist item. This isn’t anything we haven’t seen before. We just need to create a component that also has some text and [auto-layout](https://stevekinney.com/courses/figma/auto-layout).

![The checklist item component](/images/kinney/4cc46c505f83cdf2.webp)

**The problem** with this component is that only the checkbox is interactive. We want to make clicking the element itself interactive.

Instead, we need to do something similar to the checkbox component and create two variants and connect their interactions. The **good news** is that we *still* inherit from the **Checkbox** component in terms of style. But, I haven’t found a good way to pass component properties through.

![Variants of the checklist item component](/images/kinney/9ad1abc7c4e0e8db.webp)

Now, the next logical thing to do is to make a checklist component with multiple checklist items. But, for that, we’ll need to leverage a technique called [cropped grid components](https://stevekinney.com/courses/figma/cropped-grid-components).
