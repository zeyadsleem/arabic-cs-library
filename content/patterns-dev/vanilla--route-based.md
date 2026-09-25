---
title: التقسيم حسب المسار (Route Based Splitting)
lang: ar
source: https://www.patterns.dev/vanilla/route-based/
---
نستطيع طلب الموارد التي لا تلزم إلا لمسارات (routes) محددة، وذلك بإضافة *التقسيم حسب المسار* (route-based splitting). ومن خلال الجمع بين **React Suspense** أو `loadable-components` مع مكتبات مثل `react-router`، يمكننا تحميل المكوّنات ديناميكيًا (dynamic import) بناءً على المسار الحالي.

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

[افتح CodeSandbox](https://codesandbox.io/embed/webpack-dev-server-9shfr)

من خلال تحميل المكوّنات بشكل كسول (lazy loading) لكل مسار، فإننا نطلب الحزمة (bundle) التي تحتوي على الشيفرة الضرورية للمسار الحالي فقط. وبما أن معظم الناس معتادون على وجود بعض زمن التحميل أثناء إعادة التوجيه، فإن هذا هو المكان المثالي لتحميل المكوّنات بشكل كسول!
