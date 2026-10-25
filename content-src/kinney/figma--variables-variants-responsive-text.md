---
title: "Variants and Variable Modes for Responsive Text"
lang: "en"
chapter: "figma"
slug: "variables-variants-responsive-text"
order: 22
source: "https://stevekinney.com/courses/figma/variables-variants-responsive-text"
---

Let’s start with a component that looks something like this:

![Edit variant property](/images/kinney/75fd811b04c84390.webp)

In the example above, we have one heading component that has three different variants: One for each size.

Next, we’ll set up a variable that has one of three modes: **Phone**, **Tablet**, and **Desktop**. The important part is that there should be a direct mapping from the variable’s value in each mode and the name of the variant.

![Size modes using Figma variables](/images/kinney/fefa5fb1c1f40b1b.webp)

Now, here is where the magic happens. Let’s treat our initial component as a base component. You can rename it to **Base Heading** if you want.

Create an instance of your base component and assign the variant to your new variable.

![Bind a variant to a mode](/images/kinney/b9efd9a6e0d1c404.webp)

Create a component out of that new instance you just created.

![Responsive text using Figma variables](/images/kinney/c9945a2a159a6744.webp)

We’re not going to use the base component anymore at this point. Just our new **Heading** component. Now, you can set the mode of any parent frame and all of your components will instantly switch to the variant with that name.

![Using Figma modes for responsive text](/images/kinney/8b717ae77ed3ab29.webp)
