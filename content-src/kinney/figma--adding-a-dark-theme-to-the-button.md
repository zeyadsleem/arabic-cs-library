---
title: "Adding a Dark Mode"
lang: "en"
chapter: "figma"
slug: "adding-a-dark-theme-to-the-button"
order: 25
source: "https://stevekinney.com/courses/figma/adding-a-dark-theme-to-the-button"
---

Let’s say we want to add a dark mode theme to our button.

> **Variable modes require a being on a paid tier**
>
> Figma modes are not available on their free tier. You can have up to four modes per collection in their professional and organization plans and then up 40 on their enterprise plan.

Let’s take our button components from [the previous section](https://stevekinney.com/courses/figma/creating-a-button-component).

![Figma button variants](/images/kinney/e31be24e0fb3194f.webp)

I don’t want to make *even* more components for a dark theme, but I’d like to be able to change the colors a but when we’re in dark mode.

To do this, I’ll add an extra mode for my variables.

![Figma variables for dark mode](/images/kinney/08132a52ee6d9ace.webp)

## Inheriting a Mode

The cool thing about modes in Figma is that you can inherit the mode from any parent layer. Once of the things I like to do is to make some containers and then see how the modes change as I move my components around.

Let’s make some base variables for the overall theme of our design system.

![Variables for our base layer](/images/kinney/23445e34e3d013d6.webp)

Next, make a container that uses that color variable as a fill color.

![A container with a variable for the fill color](/images/kinney/670df35272ed543c.webp)

For the second copy of the layer, change the mode.

![A second copy of the container in a dark mode](/images/kinney/6dc04a606b12b7f1.webp)

And now, your button will inherit the mode of the container.
