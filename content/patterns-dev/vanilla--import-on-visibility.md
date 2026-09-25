---
title: الاستيراد عند الظهور (Import On Visibility)
lang: ar
source: https://www.patterns.dev/vanilla/import-on-visibility/
---

إلى جانب تفاعل المستخدم، لدينا غالبًا مكونات لا تظهر في الصفحة الأولية. ومن الأمثلة الجيدة على ذلك التحميل الكسول (lazy loading) للصور التي لا تظهر مباشرةً في إطار العرض (viewport)، والتي لا تُحمَّل إلا عندما يمرّر المستخدم إلى الأسفل.



ولأننا لا نطلب جميع الصور فورًا، يمكننا تقليل زمن التحميل الأولي. ويمكننا فعل الشيء نفسه مع المكونات! ولأنعرف ما إذا كانت المكونات موجودة حاليًا في إطار العرض لدينا، يمكننا استخدام [`IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)، أو استخدام مكتبات مثل `react-lazyload` أو `react-loadable-visibility` لإضافة الاستيراد عند الظهور إلى تطبيقنا بسرعة.

JavaScript iconChatInput.jsJavaScript iconChatList.jsicon-square-bigwebpack.config.js

```javascript
import React from "react";
import Send from "./icons/Send";
import Emoji from "./icons/Emoji";
import LoadableVisibility from "react-loadable-visibility/react-loadable";


const EmojiPicker = LoadableVisibility({
  loader: () => import("./EmojiPicker"),
  loading: <p id="loading">Loading</p>
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


console.log("ChatInput loading", Date.now());


export default ChatInput;
```

[افتح CodeSandbox](https://codesandbox.io/embed/onvisibility-4ew4f)

في كل مرة يُعرض فيها `EmojiPicker` على الشاشة، بعد أن ينقر المستخدم على زر Gif، تكتشف `react-loadable-visibility` أن عنصر `EmojiPicker` ينبغي أن يكون مرئيًا على الشاشة. وعندئذٍ فقط ستبدأ باستيراد الوحدة، بينما يرى المستخدم مكوّن تحميل قيد العرض.



هذا المكوّن الاحتياطي (fallback) يخبر المستخدم بأن تطبيقنا لم يتجمّد: عليه ببساطة الانتظار قليلًا ريثما تُحمَّل الوحدة وتُحلَّل وتُصرَّف وتُنفَّذ!
