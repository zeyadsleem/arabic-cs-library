---
title: Route Based Splitting
lang: en
source: https://www.patterns.dev/vanilla/route-based/
---

We can request resources that are only needed for specific routes, by adding *route-based splitting*. By combining **React Suspense** or `loadable-components` with libraries such as `react-router`, we can dynamically load components based on the current route.

JavaScript iconindex.js

```javascript
import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";


const App = lazy(() => import(/* webpackChunkName: "home" */ "./App"));
const Overview = lazy(() =>
  import(/* webpackChunkName: "overview" */ "./Overview")
);
const Settings = lazy(() =>
  import(/* webpackChunkName: "settings" */ "./Settings")
);


render(
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById("root")
);


module.hot.accept();
```

[Open CodeSandbox](https://codesandbox.io/embed/webpack-dev-server-9shfr)

By lazily loading the components per route, we’re only requesting the bundle that contains the code that’s necessary for the current route. Since most people are used to the fact that there may be some loading time during a redirect, it’s the perfect place to lazily load components!
