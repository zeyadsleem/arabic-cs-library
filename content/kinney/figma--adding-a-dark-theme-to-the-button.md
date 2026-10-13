---
title: "Adding a Dark Mode"
lang: en
source: "https://stevekinney.com/courses/figma/adding-a-dark-theme-to-the-button"
---

Let’s say we want to add a dark mode theme to our button.

> **Variable modes require a being on a paid tier**
>
> Figma modes are not available on their free tier. You can have up to four modes per collection in their professional and organization plans and then up 40 on their enterprise plan.

Let’s take our button components from [the previous section](https://stevekinney.com/courses/figma/creating-a-button-component).

Figma button variants

I don’t want to make *even* more components for a dark theme, but I’d like to be able to change the colors a but when we’re in dark mode.

To do this, I’ll add an extra mode for my variables.

Figma variables for dark mode

## Inheriting a Mode

The cool thing about modes in Figma is that you can inherit the mode from any parent layer. Once of the things I like to do is to make some containers and then see how the modes change as I move my components around.

Let’s make some base variables for the overall theme of our design system.

Variables for our base layer

Next, make a container that uses that color variable as a fill color.

A container with a variable for the fill color

For the second copy of the layer, change the mode.

A second copy of the container in a dark mode

And now, your button will inherit the mode of the container.
