---
title: "Creating a Callout Component"
lang: "en"
chapter: "figma"
slug: "creating-a-callout-component"
order: 17
source: "https://stevekinney.com/courses/figma/creating-a-callout-component"
---

Let’s look at taking some of the concepts we’ve learned so far and creating a **Callout** component that we can use in our designs. Our end result will look *something* like this.

![The completed callout component](/images/kinney/bc3a717a1a862f17.webp)

## Surface and Border Colors

We’ll start with a basic frame, but we want to give it the background and border variables that we set up in the [semantic colors](https://stevekinney.com/courses/figma/semantic-colors) section.

![The basics of a Figma callout with our semantic color variables](/images/kinney/7359e1e0561d4e5a.webp)

## Border Radius

Next, we’ll attach our [border radius variable](https://stevekinney.com/courses/figma/number-variable-tokens).

![Using a Figma variable for the border radius](/images/kinney/bcacf3c9a8d02002.webp)

## Using an Auto Layout

We’re probably going to end with two auto layouts.

- One between the icon and title and the body text. This one will be the component itself.
- One for the icon and title.

Pressing **Shift-A** on the component will turn it into an auto layout frame.

From here we’ll use our [spacing variables](https://stevekinney.com/courses/figma/number-variable-tokens) to set the padding and gap on the auto layout.

![Using a variable to set the padding and gap in an auto layout](/images/kinney/b1dc54b98c93c51c.webp)

We’ll use that **slight** spacing between the icon and the title and then our **base** spacing for the padding of the callout and the spacing between the title and the body.

We now have a pretty good stating place for our callout component.

![The basic layout of our callout component](/images/kinney/fa3fb6407b65caaa.webp)

We’re ready to go ahead and select **Create a component**.

## Setting up the Properties

We’re going to want to expose some properties of our component in order to make it easier to work with.

Let’s expose the nested properties from the **Icon**. Click the **+** next to **Properties** and select **Expose properties from Nested Instances**.

![Expose properties from nested instances](/images/kinney/4bbcd7334879a1b6.webp)

## Hiding and Showing the Body

We might not always want to show the body. In this case, we can connect it to a boolean [component property](https://stevekinney.com/courses/figma/component-properties) in order to create a toggle.

On the layer for the text of the body of the component, click on the little icon in the upper-right.

![Create a boolean property](/images/kinney/509d3ddd59792200.webp)

You’ll then see a prompt that has most of what you want in place.

![Create a boolean property for the callout body](/images/kinney/f15bd086986992d5.webp)

## Adding Variants

We now want to add the following variants:

- Primary
- Secondary
- Success
- Info
- Warning
- Danger

You can create [variants](https://stevekinney.com/courses/figma/variants) where you adjust the colors according to the [semantic-colors](https://stevekinney.com/courses/figma/semantic-colors) that we set up earlier. You can also go ahead and set a default icon for each—this can be overridden with the nested properties that we set up earlier.

![The properties of our callout component](/images/kinney/57fa10ef8b4d5cd6.webp)

## Extensions

In the name of time we’re going to move on, but if the spirit moves you—or, if it ends up moving me. You can take your component and apply the following:

- Some kind of shadow effect to the callout itself.
- Apply our [typography](https://stevekinney.com/courses/figma/typography) styles to the title and body.
