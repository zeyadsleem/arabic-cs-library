---
title: "An Alternative Approach to Dark Mode"
lang: en
source: "https://stevekinney.com/courses/storybook/dark-mode-alternative"
---

We do something slightly different. We don’t even reference colors at all in our code. Instead, we have semantic colors for elements that reference CSS variables that are switched to different values when in dark mode.

Let’s take a look at [this file](https://github.com/temporalio/ui/blob/main/src/lib/theme/plugin.ts).
