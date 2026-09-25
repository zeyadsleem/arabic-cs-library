---
title: التحميل المسبق (Preload)
lang: ar
source: https://www.patterns.dev/vanilla/preload/
---

[التحميل المسبق](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) (preload) (``) هو [تحسين للمتصفح](https://web.dev/uses-rel-preload/) يتيح طلب الموارد الحرجة (التي قد يُتعرَّف عليها متأخرًا) في وقت أبكر. إذا كنت مرتاحًا للتفكير في كيفية ترتيب تحميل مواردك الأساسية يدويًا، فيمكنه أن يكون له أثر إيجابي على أداء التحميل والمقاييس في [Core Web Vitals](https://web.dev/vitals). ومع ذلك، فإن التحميل المسبق ليس حلًا سحريًا ويتطلب الإلمام ببعض المفاضلات.

HTML5 iconindex.html

```
<link rel="preload" href="emoji-picker.js" as="script">
  ...
  </head>
  <body>
    ...
    <script src="stickers.js" defer></script>
    <script src="video-sharing.js" defer></script>
    <script src="emoji-picker.js" defer></script>
```

[افتح CodeSandbox](https://codesandbox.io/embed/preload-shvwk)

عند تحسين المقاييس مثل [Time To Interactive](https://web.dev/tti) أو [First Input Delay](https://web.dev/fid)، يمكن أن يكون التحميل المسبق مفيدًا لتحميل حزم JavaScript (أو القطع، chunks) الضرورية للتفاعلية. وضع في اعتبارك أن استخدام التحميل المسبق يتطلب عناية كبيرة، إذ تريد تجنب تحسين التفاعلية على حساب تأخير الموارد (مثل الصور الرئيسية أو الخطوط) الضرورية لـ [First Contentful Paint](https://web.dev/fcp) أو [Largest Contentful Paint](https://web.dev/lcp).

إذا كنت تحاول تحسين تحميل JavaScript الخاص بالطرف الأول، فيمكنك أيضًا التفكير في استخدام `` في المستند `` مقابل `` للمساعدة في اكتشاف هذه الموارد مبكرًا.

## التحميل المسبق في تطبيقات الصفحة الواحدة

في حين أن **الجلب المسبق** (prefetch) طريقة ممتازة لتخزين الموارد مؤقتًا (cache) التي قد يُطلب قريبًا، يمكننا **التحميل المسبق** للموارد التي يلزم استخدامها فورًا. ربما يكون خطًا معيّنًا يُستخدم في العرض الأولي، أو صورًا معيّنة يراها المستخدم على الفور.

لنفترض أن مكوّن `EmojiPicker` لدينا ينبغي أن يكون ظاهرًا فورًا عند العرض الأولي. ورغم أنه لا ينبغي أن يكون مشمولًا في الحزمة الرئيسية (bundle)، فلا بد من أن يتم تحميله *بالتوازي*. ومثل تمامًا *الجلب المسبق*، يمكننا إضافة تعليق سحري كي نعلم Webpack بأن هذه الوحدة ينبغي أن يتم تحميلها مسبقًا.

```
const EmojiPicker = import(/* webpackPreload: true */ "./EmojiPicker");
```

JavaScript iconChatInput.jsicon-square-bigwebpack.config.js

```javascript
import React, { Suspense, lazy } from "react";
import Send from "./icons/Send";
import Emoji from "./icons/Emoji";


const EmojiPicker = lazy(() => import("./EmojiPicker"));
const ChatInput = () => {
  const [pickerOpen, togglePicker] = React.useReducer(state => !state, true);


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

[افتح CodeSandbox](https://codesandbox.io/embed/preload-shvwk)

> يسمح Webpack 4.6.0+ بالتحميل المسبق للموارد عبر إضافة `/* webpackPreload: true */` إلى الاستيراد. ولجعل التحميل المسبق يعمل في الإصدارات الأقدم من webpack، ستحتاج إلى إضافة [`preload-webpack-plugin`](https://github.com/GoogleChromeLabs/preload-webpack-plugin) إلى إعداد webpack لديك.



بعد بناء التطبيق، يمكننا أن نرى أن `EmojiPicker` سيتم جلبه مسبقًا.

```
 Asset                             Size       Chunks                          Chunk Names
    emoji-picker.bundle.js         1.49 KiB   emoji-picker [emitted]          emoji-picker
    vendors~emoji-picker.bundle.js 171 KiB    vendors~emoji-picker [emitted]  vendors~emoji-picker
    main.bundle.js                 1.34 MiB   main  [emitted]                 main

Entrypoint main = main.bundle.js
(preload: vendors~emoji-picker.bundle.js emoji-picker.bundle.js)
```

يظهر الناتج الفعلي على شكل وسم `link` يحمل `rel="preload"` في `head` الخاص بمستندنا.

```
<link rel="prefetch" href="emoji-picker.bundle.js" as="script" />
<link rel="prefetch" href="vendors~emoji-picker.bundle.js" as="script" />
```

يمكن تحميل `EmojiPicker` المحمَّل مسبقًا بالتوازي مع حزمة التحميل الأولية. وبخلاف `prefetch`، حيث كان للمتصفح دور في تحديد ما إذا كان يظن أنه يملك اتصال إنترنت وعرض نطاق كافيين لجلب المورد فعليًا، فإن المورد **المحمَّل مسبقًا** سيُحمَّل مسبقًا في كل الأحوال.



بدلًا مناضطرارنا إلى انتظار تحميل `EmojiPicker` بعد العرض الأولي، سيكون المورد متاحًا لنا فورًا! ولأننا نحمّل الأصول بترتيب أذكى، فإن زمن التحميل الأولي قد يزداد بدرجة كبيرة اعتمادًا على جهاز المستخدم واتصاله بالإنترنت. لا تُحمِّل مسبقًا إلا الموارد التي يلزم أن تكون مرئية بعد نحو ثانية واحدة من العرض الأولي.

## التحميل المسبق مع حيلة `async`

إذا أردت أن تقوم المتصفحات بتنزيل سكربت بأولوية عالية، من دون أن تعيق المحلل (parser) في انتظار السكربت، فيمكنك الاستفادة من حيلة التحميل المسبق مع async أدناه. وسيؤدي التحميل المسبق في هذه الحالة إلى تأخير تنزيل الموارد الأخرى، لكن هذه مفاضلة على المطوّر أن يجريها:

```
<link rel="preload" href="emoji-picker.js" as="script">
<script src="emoji-picker.js" async>
```

## التحميل المسبق في Chrome 95+

بفضل بعض [الإصلاحات](https://twitter.com/patmeenan/status/1436374668450177026) لسلوك [العبور في قائمة الانتظار](https://docs.google.com/document/d/1ZEi-XXhpajrnq8oqs5SiW-CXR3jMc20jWIzN5QRy1QA/edit?usp=sharing) الخاص بالتحميل المسبق في Chrome 95+، أصبحت هذه الخاصية أكثر أمانًا قليلًا في الاستخدام على نطاق أوسع. وتوصيات Pat Meenan في توصيات Chrome الجديدة للتحميل المسبق تقترح:

- وضعه في ترويسات HTTP سيجعله يتقدّم على كل ما عداه
- عمومًا، ستُحمَّل الموارد المسبقة التحميل بالترتيب الذي يصل به المحلل إليها لكل أولوية متوسطة أو أعلى، لذا كن حذرًا عند وضع التحميل المسبق في بداية HTML.
- من الأفضل غالبًا وضع التحميل المسبق للخطوط في نهاية وسم head أو في بداية وسم body
- ينبغي أن يتم التحميل المسبق للاستيرادات بعد وسم السكربت الذي يحتاج إلى الاستيراد (حتى يتم تحميل السكربت الفعلي وتحليله أولًا)
- سيكون للتحميل المسبق للصور أولوية منخفضة، وينبغي أن يُرتَّب بالنسبة إلى السكربتات غير المتزامنة والوسوم الأخرى ذات الأولوية المنخفضة أو الأدنى

## الخلاصات

مرة أخرى، استخدم التحميل المسبق باعتدال وقِس دائمًا أثره في بيئة الإنتاج. إذا كان التحميل المسبق لصورتك يسبق موضعها في المستند، فقد يساعد ذلك المتصفحات على اكتشافها (وترتيبها بالنسبة إلى الموارد الأخرى). وعند استخدامه بشكل خاطئ، يمكن أن يؤدي التحميل المسبق إلى تأخير صورتك لـ First Contentful Paint (مثل CSS والخطوط) — وهو عكس ما تريده. ولاحظ أيضًا أن فاعلية إجراءات إعادة ترتيب الأولويات هذه تعتمد بدورها على [الخوادم التي تعطي الأولوية للطلبات](https://github.com/andydavies/http2-prioritization-issues#cdns--cloud-hosting-services) بشكل صحيح.

قد تجد أيضًا أن `` مفيد في الحالات التي تحتاج فيها إلى جلب سكربتات [دون تنفيذها](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content#scripting_and_preloads).

تتناول مجموعة متنوعة من مقالات web.dev كيفية استخدام التحميل المسبق من أجل:

- [التحميل المسبق للسكربتات الأساسية المطلوبة للتفاعلية](https://web.dev/uses-rel-preload/)
- [التحميل المسبق لصورة Largest Contentful Paint](https://web.dev/preload-responsive-images/)
- [تحميل الخطوط مع منع إزاحات التخطيط](https://web.dev/preload-optional-fonts/)
