---
title: الجلب المسبق (Prefetch)
lang: ar
source: https://www.patterns.dev/vanilla/prefetch/
---

الجلب المسبق (prefetch) (``) هو تحسين للمتصفح يتيح لنا جلب الموارد التي قد تكون مطلوبة للمسارات (routes) أو الصفحات اللاحقة قبل أن نحتاج إليها. ويمكن تحقيق الجلب المسبق بعدة طرق. ويمكن تحقيق ذلك بشكل مصرَّح به في HTML (كما في المثال أدناه)، أو عبر ترويسة HTTP (`Link: ; rel=prefetch`)، أو عبر [Service Workers](https://googlechrome.github.io/samples/service-worker/prefetch/)، أو عبر وسائل أكثر تخصيصًا مثل Webpack.

```
<link rel="prefetch" href="/pages/next-page.html" />
<link rel="prefetch" href="/js/emoji-picker.js" />
```

## الجلب المسبق

في الأمثلة التي توضّح كيف يمكننا استيراد الوحدات بناءً على الظهور أو التفاعل، رأينا أن هناك كثيرًا ما يحدث من تأخير بين النقر على الزر من أجل إظهار المكوّن، وظهور المكوّن الفعلي على الشاشة. وقد حدث ذلك لأن الوحدة ما زالت بحاجة إلى أن تُطلب وتُحمَّل عندما ينقر المستخدم على الزر!



في كثير من الحالات، نعرف أن المستخدمين سيطلبون موارد معينة بعد العرض الأولي للصفحة بوقت قصير. ورغم أنها قد لا تكون مرئية فورًا، فلا ينبغي أن تُشمَل في حزمة التحميل الأولية (bundle)، سيكون رائعًا 줄 منهما زمن التحميل قدر الإمكان لمنح تجربة مستخدم أفضل!

يمكن **جلب** المكونات أو الموارد التي نعرف أنها من المحتمل أن تُستخدم في مرحلة ما من التطبيق مسبقًا. يمكننا إخبار Webpack بأن الحزم معينة تحتاج إلى جلب مسبق، وذلك بإضافة [تعليق سحري](https://webpack.js.org/api/module-methods/#magic-comments) إلى جملة الاستيراد: `/* webpackPrefetch: true */`.

```
const EmojiPicker = import(/* webpackPrefetch: true */ "./EmojiPicker");
```

JavaScript iconChatInput.js

```javascript
import React, { Suspense, lazy } from "react";
import Send from "./icons/Send";
import Emoji from "./icons/Emoji";


const EmojiPicker = lazy(() =>
  import(/*webpackPrefetch: true,
    webpackChunkName: "emoji-picker"*/
  "./EmojiPicker")
);
const ChatInput = ({ emojiPicker, gifPicker }) => {
  const [pickerOpen, togglePicker] = React.useReducer(state => !state, false);


  return (
    <div className="chat-input-container">
      <input type="text" placeholder="Type a message..." />
      <Emoji onClick={togglePicker} />
      {pickerOpen && (
        <Suspense fallback={<p id="loading">loading</p>}>
          <EmojiPicker />
        </Suspense>
      )}
      <Send />
    </div>
  );
};


console.log("ChatInput loading", Date.now());


export default ChatInput;
```

[افتح CodeSandbox](https://codesandbox.io/embed/prefetch-trni2)

بعد بناء التطبيق، يمكننا أن نرى أن `EmojiPicker` سيتم جلبه مسبقًا.

```
 Asset                             Size       Chunks                          Chunk Names
    emoji-picker.bundle.js         1.49 KiB   emoji-picker [emitted]          emoji-picker
    vendors~emoji-picker.bundle.js 171 KiB    vendors~emoji-picker [emitted]  vendors~emoji-picker
    main.bundle.js                 1.34 MiB   main  [emitted]                 main

Entrypoint main = main.bundle.js
(prefetch: vendors~emoji-picker.bundle.js emoji-picker.bundle.js)
```

يظهر الناتج الفعلي على شكل وسم `link` يحمل `rel="prefetch"` في `head` الخاص بمستندنا.

```
<link rel="prefetch" href="emoji-picker.bundle.js" as="script" />
<link rel="prefetch" href="vendors~emoji-picker.bundle.js" as="script" />
```

الوحدات التي يتم جلبها مسبقًا يطلبها المتصفح ويحمّلها **قبل أن يطلب المستخدم المورد**. وعندما يكون المتصفح خاملًا ويحتسب أنه يملك عرض نطاق كافيًا، فإنه سيُصدر طلبًا من أجل تحميل المورد وتخزينه مؤقتًا (cache). وتؤدي وجود المورد في ذاكرة المؤقتة إلى تقليل زمن التحميل بشكل كبير، إذ لا نحتاج إلى انتظار انتهاء الطلب بعد أن ينقر المستخدم على الزر. يمكننا ببساطة الحصول على المورد المحمَّل من الذاكرة المؤقتة.



ورغم أن الجلب المسبق طريقة ممتازة لتحسين زمن التحميل، فلا تفرط في ذلك. إذا لم يطلب المستخدم مكوّن `EmojiPicker` في النهاية، فقد حمّلنا المورد بلا داعٍ. وقد يكلّف هذا المستخدم مالًا أو يُبطئ التطبيق. لا تجلب مسبقًا إلا الموارد الضرورية.

قد تجد الموارد التالية عن الجلب المسبق مفيدة:

- [Preload, prefetch and priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
- [Faster navigations with predictive prefetching](https://web.dev/predictive-prefetching/)
- [Prefetching heuristics](https://blog.mgechev.com/2021/02/07/prefetching-strategies-heuristics-faster-web-apps/)
- [What not to prefetch](https://addyosmani.com/blog/what-not-to-prefetch-prerender/)
