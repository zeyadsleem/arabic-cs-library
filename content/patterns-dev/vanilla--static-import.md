---
title: الاستيراد الساكن (Static Import)
lang: ar
source: https://www.patterns.dev/vanilla/static-import/
---

تتيح لنا الكلمة المفتاحية `import` استيراد الشيفرة التي تم تصديرها من وحدة أخرى. بشكل افتراضي، تُضاف جميع الوحدات التي نقوم بـ*استيرادها بشكل ساكن* (static import) إلى حزمة التحميل الأولية (bundle). وأي وحدة يتم استيرادها باستخدام صيغة الاستيراد الافتراضية في ES2015، أي `import module from 'module'`، فهي مستوردة بشكل ساكن.



لننظر إلى مثال! يحتوي تطبيق دردشة بسيط على مكوّن `Chat`، نقوم فيه باستيراد ثلاثة مكونات بشكل ساكن وعرضها: `UserProfile` و`ChatList` و`ChatInput` لكتابة الرسائل وإرسالها! وداخل وحدة `ChatInput`، نقوم باستيراد مكوّن `EmojiPicker` بشكل ساكن كي نتمكّن من إظهار منتقي الإيموجي للمستخدم عندما يُبدّل حالة زر الإيموجي.

JavaScript iconApp.js

```
import React from "react";


// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from "./components/UserInfo";
import ChatList from "./components/ChatList";
import ChatInput from "./components/ChatInput";


import "./styles.css";


console.log("App loading", Date.now());


const App = () => (
  <div className="App">
    <UserInfo />
    <ChatList />
    <ChatInput />
  </div>
);


export default App;
```

[افتح CodeSandbox](https://codesandbox.io/embed/staticimport-b0cgl)

تُنفَّذ الوحدات فور وصول المحرك (engine) إلى السطر الذي استوردناها فيه. وعندما تفتح وحدة التحكم، يمكنك أن ترى الترتيب الذي حُمِّلت به الوحدات!

JavaScript iconApp.js

```
import React from "react";


// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from "./components/UserInfo";
import ChatList from "./components/ChatList";
import ChatInput from "./components/ChatInput";


import "./styles.css";


console.log("App loading", Date.now());


const App = () => (
  <div className="App">
    <UserInfo />
    <ChatList />
    <ChatInput />
  </div>
);


export default App;
```

[افتح CodeSandbox](https://codesandbox.io/embed/pedantic-keldysh-bv7cj)

ولأن المكونات تم استيرادها بشكل ساكن، قام Webpack بتجميع الوحدات في حزمة التحميل الأولية. يمكننا رؤية الحزمة التي ينشئها Webpack بعد بناء التطبيق:

```
Asset           Size      Chunks            Chunk Names
main.bundle.js  1.5 MiB    main  [emitted]  main
```

يتم تجميع الشيفرة المصدرية لتطبيق الدردشة الخاص بنا في حزمة واحدة: `main.bundle.js`. ويمكن لحجم الحزمة الكبير أن يؤثر بشكل كبير في زمن تحميل تطبيقنا، وذلك يعتمد على جهاز المستخدم واتصاله بالشبكة. وقبل أن يتمكّن مكوّن `App` من عرض محتوياته على شاشة المستخدم، عليه أولًا أن يحمّل جميع الوحدات ويحللها.

ولحسن الحظ، هناك طرق كثيرة لتسريع زمن التحميل! فنحن لا نضطر دائمًا إلى استيراد جميع الوحدات دفعة واحدة: ربما توجد وحدات ينبغي ألا تُعرض إلا استنادًا إلى تفاعل المستخدم، مثل `EmojiPicker` في هذه الحالة، أو تُعرض في موضع أدنى في الصفحة. وبدلًا من استيراد جميع المكونات بشكل ساكن، يمكننا *استيراد* الوحدات ديناميكيًا (dynamic import) بعد أن يكون مكوّن `App` قد عرض محتوياته وأصبح بإمكان المستخدم التفاعل مع تطبيقنا.
