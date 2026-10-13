---
title: "Integration with Mock Service Worker"
lang: en
source: "https://stevekinney.com/courses/storybook/mock-service-worker"
---

You can have your stories fetch data from an API using [loaders](https://stevekinney.com/courses/storybook/loaders), but you probably don’t want to have to go through the hassle of spinning up a local server just to view your component library. You also probably don’t wan to take on the dependency of an external API that could go down and break your Storybook.

A potential solution is to use [Mock Server Worker](https://mswjs.io/) to intercept requests at the browser level and then return mock data back to your components. As far as your stories and components are concerned, they’re taking to a real API, but with none of the drawbacks that I mentioned earlier.

You can install Mock Service Worker and [the Storybook addon](https://storybook.js.org/addons/msw-storybook-addon/) as follows:

```bash
npm -D i msw msw-storybook-addon
```

You’ll need to configure your Mock Service Worker endpoints if you haven’t already. I’m using Vite, so I am going to assume that our static assets directory is located at `/public`.

```bash
npx msw init public/
```

## Adding the Addon

```typescript
import { initialize, mswLoader } from 'msw-storybook-addon';
initialize();

const preview = {
  //… other stuff
  loaders: [mswLoader],
};

export default preview;
```
