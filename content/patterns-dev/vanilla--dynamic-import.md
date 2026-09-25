---
title: الاستيراد الديناميكي (Dynamic Import)
lang: ar
source: https://www.patterns.dev/vanilla/dynamic-import/
---
في تطبيق الدردشة الخاص بنا، لدينا أربعة مكونات رئيسية: `UserInfo` و`ChatList` و`ChatInput` و`EmojiPicker`. لكن ثلاثة فقط من هذه المكونات تُستخدم فورًا عند التحميل الأولي للصفحة: `UserInfo` و`ChatList` و`ChatInput`. أما `EmojiPicker` فلا يظهر مباشرةً، وقد لا يُعرض أصلًا إذا لم ينقر المستخدم على `Emoji` من أجل إظهار `EmojiPicker`. وهذا يعني أننا أضفنا وحدة `EmojiPicker` بلا داعٍ إلى حزمة التحميل الأولية (bundle) لدينا، مما قد يزيد زمن التحميل!

لحل هذه المشكلة، يمكننا *استيراد* (import) مكوّن `EmojiPicker` ديناميكيًا، أي الاستيراد الديناميكي (dynamic import). وبدلًا من استيراده بشكل ساكن (static import)، سنستورده فقط عندما نرغب في إظهار `EmojiPicker`. إحدى الطرق السهلة لاستيراد المكونات ديناميكيًا في React هي استخدام [**React Suspense**](https://reactjs.org/docs/concurrent-mode-suspense.html). يتلقى المكوّن `React.Suspense` المكوّن الذي ينبغي تحميله ديناميكيًا، مما يتيح لمكوّن `App` أن يعرض محتوياته بسرعة أكبر من خلال تعليق استيراد وحدة `EmojiPicker`! وعندما ينقر المستخدم على الإيموجي، يُعرض المكوّن `EmojiPicker` للمرة الأولى. ويعرض المكوّن `EmojiPicker` بدوره مكوّن `Suspense`، الذي يتلقى الوحدة المستوردة بشكل كسول (lazily imported)، وهي `EmojiPicker` في هذه الحالة. ويقبل المكوّن `Suspense` خاصية `fallback`، التي تتلقى المكوّن الذي ينبغي عرضه أثناء ما زال المكوّن المعلَّق قيد التحميل!

بدلًا من إضافة `EmojiPicker` بلا داعٍ إلى حزمة التحميل الأولية، يمكننا تقسيمها إلى حزمة خاصة بها (تقسيم الشيفرة، code splitting) وتقليل حجم حزمة التحميل الأولية!

حجم حزمة التحميل الأولية الأصغر يعني تحميلًا أوليًا أسرع: لا يضطر المستخدم إلى الانتظار أمام شاشة تحميل فارغة لمدى أطول. يخبر المكوّن `fallback` المستخدم أن تطبيقنا لم يتجمّد: عليه ببساطة الانتظار قليلًا ريثما تُعالَج الوحدة وتُنفَّذ.

```javascript
Asset                             Size         Chunks            Chunk Names

emoji-picker.bundle.js           1.48 KiB      1    [emitted]    emoji-picker

main.bundle.js                   1.33 MiB      main [emitted]    main

vendors~emoji-picker.bundle.js   171 KiB       2    [emitted]    vendors~emoji-picker
```

في حين كانت حزمة التحميل الأولية في السابق بحجم `1.5MiB`، تمكنا من تقليلها إلى `1.33 MiB` بفضل تعليق استيراد `EmojiPicker`!

في وحدة التحكم، يمكنك أن ترى أن `EmojiPicker` لا يُنفَّذ إلا عندما نقوم بإظهار `EmojiPicker`!

JavaScript iconChatInput.js

```javascript
import React, { Suspense, lazy } from "react";
  // import Send from "./icons/Send";
  // import Emoji from "./icons/Emoji";
  const Send = lazy(() =>
    import(/*webpackChunkName: "send-icon" */ "./icons/Send")
  );
  const Emoji = lazy(() =>
    import(/*webpackChunkName: "emoji-icon" */ "./icons/Emoji")
  );
  // Lazy load EmojiPicker  when <EmojiPicker /> renders
  const Picker = lazy(() =>
    import(/*webpackChunkName: "emoji-picker" */ "./EmojiPicker")
  );

const ChatInput = () => {
    const [pickerOpen, togglePicker] = React.useReducer(state => !state, false);

return (
      <Suspense fallback={<p id="loading">Loading...</p>}>
        <div className="chat-input-container">
          <input type="text" placeholder="Type a message..." />
          <Emoji onClick={togglePicker} />
          {pickerOpen && <Picker />}
          <Send />
        </div>
      </Suspense>
    );
  };

console.log("ChatInput loaded", Date.now());

export default ChatInput;
```

[افتح CodeSandbox](https://codesandbox.io/embed/dynamicimport-rjcmc)

عند بناء التطبيق، يمكننا أن نرى الحزم (bundles) المختلفة التي أنشأها Webpack.

باستيراد المكوّن `EmojiPicker` ديناميكيًا، تمكنا من تقليل حجم حزمة التحميل الأولية من `1.5MiB` إلى `1.33 MiB`! ورغم أن المستخدم قد يظل مضطرًا إلى الانتظار قليلًا حتى يتم تحميل `EmojiPicker` بالكامل، فقد حسّنا تجربة المستخدم من خلال ضمان عرض التطبيق وتفاعله بينما ينتظر المستخدم تحميل المكوّن.

## المكوّنات القابلة للتحميل

لا يدعم التصيير على جانب الخادم (server-side rendering) خاصية React Suspense (بعد). البديل الجيد لـ React Suspense هو مكتبة [`loadable-components`](https://loadable-components.com/docs/getting-started/)، التي يمكن استخدامها في تطبيقات SSR.

JavaScript iconChatInput.js

```javascript
import React from "react";
import loadable from "@loadable/component";

import Send from "./icons/Send";
import Emoji from "./icons/Emoji";

const EmojiPicker = loadable(() => import("./EmojiPicker"), {
  fallback: <div id="loading">Loading...</div>
});

const ChatInput = () => {
  const [pickerOpen, togglePicker] = React.useReducer(state => !state, false);

return (
    <div className="chat-input-container">
      <input type="text" placeholder="Type a message..." />
      <Emoji onClick={togglePicker} />
      {pickerOpen && <EmojiPicker />}
      <Send />
    </div>
  );
};

export default ChatInput;
```

[افتح CodeSandbox](https://codesandbox.io/embed/confident-pond-5bil0)

على غرار React Suspense، يمكننا تمرير الوحدة المستوردة بشكل كسول إلى `loadable`، التي لن تستورد الوحدة إلا عند طلب وحدة `EmojiPicker`! وأثناء تحميل الوحدة، يمكننا عرض مكوّن `fallback`.

ورغم أن المكوّنات القابلة للتحميل بديل رائع لـ React Suspense في تطبيقات SSR، فإنها مفيدة أيضًا في تطبيقات CSR من أجل تعليق استيراد الوحدات.

JavaScript iconChatInput.js

```javascript
import React from "react";
  import Send from "./icons/Send";
  import Emoji from "./icons/Emoji";
  import loadable from "@loadable/component";

const EmojiPicker = loadable(() => import("./components/EmojiPicker"), {
    fallback: <p id="loading">Loading...</p>
  });

const ChatInput = () => {
    const [pickerOpen, togglePicker] = React.useReducer(state => !state, false);

return (
      <div className="chat-input-container">
        <input type="text" placeholder="Type a message..." />
        <Emoji onClick={togglePicker} />
        {pickerOpen && <EmojiPicker />}
        <Send />
      </div>
    );
  };

console.log("ChatInput loaded", Date.now());

export default ChatInput;
```

[افتح CodeSandbox](https://codesandbox.io/embed/loadablecomponents-qr6md)
