---
title: "Typography"
lang: "en"
chapter: "figma"
slug: "typography"
order: 9
source: "https://stevekinney.com/courses/figma/typography"
---

> **Text properties currently do not support variables**
>
> [Variables](https://stevekinney.com/courses/figma/variables) are still in beta in Figma. At the time of this writing, there is no support for styling text using variables. However, it *is* on the roadmap and variables *will eventually support variables*. But, for now, we must use [styles](https://stevekinney.com/courses/figma/styles).

We can save any styling we do the text of a layer as a [style](https://stevekinney.com/courses/figma/styles). This allows you to update the style and then have any layers that use that style immediately inherit the changes.

![Adding a text style](/images/kinney/f18abe9f77321450.webp)

> **Using a slash in the title of style will help organize them**
>
> As with a lot of different things in Figma, using a slash in the title of the style adds a layer of organization.
>
> Using a slash in the title of a style will add a layer of organization

![Using a slash in the title of a style will add a layer of organization](/images/kinney/a13dc204cfb11a0c.webp)

## Viewing and Editing Text Styles

You can view, edit, and organize your text styles by clicking on the workspace (e.g. not any of your layers) and then looking in the **right sidebar**.

![Viewing local styles](/images/kinney/dcf2d1efd07eb399.webp)

This technique works if you have an existing type system that you’re looking to port into Figma. The other alternative is to generate your own typography system.

## Generating Your Own Typography System

### Typescales

There are a number of plugins out there for generating a typography system. One way to get started is to use the [Typescales](https://www.figma.com/community/plugin/739825414752646970) plugin.

![Typescales Plugin](/images/kinney/48ff5012ef469b0f.webp)

This will create a layer that you can further style with the font you want and then create styles for.

### Typescale

Another approach is to use the [Typescale](https://www.figma.com/community/plugin/967802396210455992) plugin. The difference here is that we start with a base style and then let it do some math to figure out the rest of our typography system.

![Figma Typescale plugin](/images/kinney/3149c1be0a387ceb.webp)

The end result needs a little bit of massaging, but you can quickly get it looking nice using [auto layout](https://stevekinney.com/courses/figma/auto-layout).

![Typescales generated from the typescale plugin](/images/kinney/a69c1912ce9091e6.webp)

## Bulk Creating Styles

With some kind of type system in place, you can use the [Styler](https://www.figma.com/community/plugin/820660579767995949) plugin to bulk create styles. The Styler plugin will use the names of your layers in order to name the styles and it’s much easier to rename layers than it is to rename styles (e.g. using **Command/Control+R**). The good news is that if you mess up, you can rename the styles and run the plugin again. Styler is smart enough to figure out that you’re just renaming some styles.

> **Exercise**
>
> Go ahead and create a set of bold fonts based on your current type system—or generate a new one if you want. Use **Styler** to bulk create your styles.
