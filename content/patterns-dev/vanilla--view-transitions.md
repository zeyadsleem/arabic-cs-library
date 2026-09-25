---
title: تحريك انتقال العرض (view transition)
lang: ar
source: https://www.patterns.dev/vanilla/view-transitions/
---
**ملاحظة:** واجهة View Transitions API لتطبيقات الصفحة الواحدة متاحة في Chrome 111+.

## مقدمة إلى انتقال العرض

تقدّم [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/) طريقة بسيطة لانتقال أي تغيير بصري في DOM من حالة إلى الحالة التالية. وقد يشمل ذلك تغييرات صغيرة مثل إظهار محتوى أو إخفائه، أو تغييرات أوسع مثل الانتقال من صفحة إلى أخرى. وفيما يلي [عرض توضيحي](https://astro-movies.pages.dev/) لـ View Transitions API في تطبيق SPA (تطبيق صفحة واحدة) [src](https://github.com/Charca/astro-movies):

تتمركز واجهة JavaScript حول `document.startViewTransition(callback)`، حيث `callback` دالة تنشئ DOM عادةً ليحدّثه إلى الحالة الجديدة.

لنأخذ إظهار عنصر `` وإخفائه مثالًا بسيطًا:

```javascript
if (document.startViewTransition) {

// (check for browser support)

document.addEventListener("click", function (event) {

if (event.target.matches("summary")) {

event.preventDefault(); // (we'll toggle the element ourselves)

const details = event.target.closest("details");

document.startViewTransition(() => details.toggleAttribute("open"));

}

});

}
```

يأخذ `document.startViewTransition` لقطة شاشة من DOM الحالي قبل استدعاء `callback`. وفي مثالنا، لا يفعل `callback` سوى تبديل السمة `open`. وبعد الاكتمال، يستطيع المتصفح الانتقال بين لقطة الشاشة الأولية والإصدار الجديد.

تُعرض النسختان القديمة والجديدة كعناصر زائفة، ويمكن الإشارة إليهما في CSS باستخدام `::view-transition-old(root)` و`::view-transition-new(root)` على الترتيب. وعلى سبيل المثال، لإبراز الانتقال، يمكننا إطالة `animation-duration` هكذا:

```javascript
::view-transition-old(root),

::view-transition-new(root) {

animation-duration: 2s;

}
```

يمكن أيضًا لانتقالات العرض تحريك تغييرات متعددة بحركات أكثر تقدمًا تتجاوز التلاشي المتبادل الافتراضي. ومنح عناصر محددة اسم CSS خاصًا بـ`view-transition-name`، مع `containment` بقيمة `layout` أو `paint`، يمنح المطوّرين تحكمًا دقيقًا في كيفية انتقال العناصر، بما في ذلك عرضها وارتفاعها وموضعها. ويمكن لهذه الانتقالات المتقدمة أن تساعد فعليًا في توضيح التدفق من صفحة إلى أخرى.

لنأخذ [معرض الصور](https://charming-crumble-af45ba.netlify.app/) مثالًا:

أوضح انتقال هو حجم الصورة وموضعها، إذ يتحقق تلقائيًا عند منح عنصر `` في كل صفحة الاسم الفريد نفسه `view-transition-name`، وقيمة CSS `containment` بقيمة `layout`. وفي هذا العرض التوضيحي، تكون أسماء `view-transition-name` مكتوبة مباشرة في سمتَي `style`، لكن يمكنك إضافتها ديناميكيًا أيضًا، مثلًا في معالج `onclick`، طالما كانت فريدة داخل الصفحة وأُضيفت قبل بدء الانتقال.

تحتاج تفاصيل الصورة أدناه إلى قدر قليل من التنسيق الإضافي. لاحظ أن هناك حركة منزلقة متدرجة للدخول أو الخروج لكل سطر في التفاصيل.

نمنح كل عنصر سطر اسم `view-transition-name` خاصًا به:

```javascript
figcaption h2 {

contain: layout;

view-transition-name: photo-heading;

}

figcaption div {

contain: layout;

view-transition-name: photo-location-time;

}

figcaption dl {

contain: layout;

view-transition-name: photo-meta;

}
```

يولّد ذلك *مجموعات انتقال* لكل منطقة، وهي مثل لقطات الشاشة الجديدة والقديمة التي ذُكرت سابقًا، لكنها تغطي جزءًا من الصفحة بدل المستند بأكمله. ومثلما يمكن استهداف عناصر انتقال المستند كاملًا باستخدام `::view-transition-old(root)` و`::view-transition-new(root)`، يمكن استهداف مجموعات الانتقال هذه باستخدام `::view-transition-old(NAME)` و`::view-transition-new(NAME)`. لاحظ أن نص التفاصيل غير موجود في صفحة شبكة الصور، لذلك عند الانتقال من الشبكة إلى صفحة الصورة، سيوجد فقط `::view-transition-new(NAME)`، *ولا يوجد* `::view-transition-old(NAME)`، والعكس عند الانتقال بالاتجاه الآخر. يمكننا استهداف هذه الحالات باستخدام الصنف الزائف `:only-child` وتخصيص الحركة. وبالنسبة إلى مجموعة `photo-heading`:

```javascript
/* Enter */

::view-transition-new(photo-heading):only-child {

animation: 300ms ease 50ms both fade-in, 300ms ease 50ms both slide-up;

}

/* Exit */

::view-transition-old(photo-heading):only-child {

animation: 200ms ease 150ms both fade-out, 200ms ease 150ms both slide-down;

}
```

هذه أساسيات الواجهة. يغطي [مقال Jake Archibald الرائع عن انتقال العرض](https://developer.chrome.com/docs/web-platform/view-transitions) التفاصيل جيدًا. للآن، لنرَ كيف يمكننا تنفيذ انتقالات تنقل الصفحات كاملة.

## التنقل بين الصفحات

يبدو التنقل المعتاد بين الصفحات كالتالي:

- ينقر المستخدم على رابط
- يُرسل طلب (request) للحصول على البيانات
- يُحدَّث DOM بالاستجابة (response)

لتطبيق انتقال عرض على هذا التدفق، هناك اعتبارات بشأنها.

أولًا، يجب تقليل الوقت الذي تبقى فيه الشاشة متجمدة. ربما لاحظت من مثال الانتقال البطيء أعلاه أن DOM يصبح غير تفاعلي بعد بدء انتقال العرض حتى تكتمل `callback`. وإذا بدأنا الانتقال عندما ينقر المستخدم على الرابط، فقد ينتظر طويلًا أمام واجهة متجمدة. ولتقليل هذا الإزعاج، من المثالي استدعاء `document.startViewTransition` بعد اكتمال الطلب. بهذه الطريقة، نكون مستعدين للتغير، ويمكن تحديث DOM في أسرع وقت.

ثانيًا، نحتاج إلى التأكد من التقاط لقطة DOM الأولية قبل تحديث DOM. وعند العمل مع تنقل الصفحات في أطر خارجية، لا نملك تحكمًا كاملًا في عملية العرض (rendering)؛ فـDOM يُحدّث تلقائيًا عند وصول الاستجابة. لذلك لا يتوفر لدينا دالة مستقلة نمررها إلى `document.startViewTransition` لتحديث DOM بصورة مرتبة. قد نحتاج إلى اعتراض العرض وإيقافه ثم استئنافه لنوحي بأن لدينا دالة واحدة تحدّث DOM.

ولحسن الحظ، إذا أعدنا وعدًا من `callback` تحديث DOM، فستنتظر واجهة انتقال العرض حلّه قبل تنفيذ الحركة. يمكننا استخدام هذه الميزة لمعالجة مشكلات التوقيت المذكورة أعلاه.

### مثال مكون React

لمعالجة المشكلات السابقة، سننشئ مكون صنف من React، لأن شرح التدفق أسهل منه مقارنة بمكون دالة. سنستخدم طرق دورة الحياة التالية للتحكم في العرض:

- `shouldComponentUpdate`: سنعيد `false` هنا ونبدأ انتقال العرض؛ وهذا يتيح لنا بعض الوقت لاكتمال التقاط لقطة الشاشة
- `forceUpdate`: لإعادة عرض المكون يدويًا بعد التقاط لقطة الشاشة
- `componentDidUpdate`: لإخطار واجهة انتقال العرض بأن DOM قد حُدّث

إليك الشكل:

```javascript
import { Component } from "react";

export default class ViewTransition extends Component {

shouldComponentUpdate() {

if (!document.startViewTransition) return true; // skip when not supported

document.startViewTransition(() => this.#updateDOM());

return false; // don't update the component, we'll do this manually

}

#updateDOM() {

// now we know the screenshot has been taken, we can force render

// (which skips `shouldComponentUpdate`)

this.forceUpdate();

// set up a promise that will resolve when the component renders

return new Promise((resolve) => {

this.#rendered = resolve;

});

}

render() {

return this.props.children;

}

#rendered = () => {};

componentDidUpdate() {

// resolve the `updateDOM` promise to notify the View Transition API

// that the DOM has been updated

this.#rendered();

}

}
```

**ملاحظة:** كان [Next.js App Router](https://beta.nextjs.org/docs/app-directory-roadmap) في نسخة تجريبية وقت كتابة هذا المقال، وقد تتغير أفضل الممارسات المحيطة به وبمجلد pages.

لاستخدامه في تطبيق Next.js، سنعطل أولًا وضع React الصارم في التطوير. يشغّل الوضع الصارم فحوصاته بعرض المكون مرتين. وهذا يتعارض مع تدفق العرض في `ViewTransition` أثناء التطوير، لذا سنعطله عالميًا ثم نعيد تفعيله للمكونات الفرعية بمكون `StrictMode`.

```javascript
// next.config.js

const nextConfig = {

reactStrictMode: false,

};

module.exports = nextConfig;
```

بعد ذلك، في `pages/_app.js`، سنغلّف `Component` بمكونات `ViewTransition` و`StrictMode`، ونبدأ برؤية انتقالات متحركة:

```javascript
// pages/_app.js

import "@/styles/globals.css";

import { StrictMode } from "react";

import ViewTransition from "@/components/ViewTransition";

export default function App({ Component, pageProps }) {

return (

<ViewTransition>

<StrictMode>

<Component {...pageProps} />

</StrictMode>

</ViewTransition>

);

}
```

شاهد [عرض Next.js التوضيحي](https://frolicking-dusk-29be0a.netlify.app/)، و[عرض Next.js المباشر](https://photography-view-transitions-nextjs.vercel.app/)، و[مصدره](https://github.com/domchristie/photography-view-transitions-nextjs).

**ملاحظة**: تنصح وثائق React بعدم استخدام `shouldComponentUpdate` و`forceUpdate`، وتذكر أنهما ينبغي ألا يُستخدما إلا لتحسينات الأداء (performance)، وأن استدعاء `shouldComponentUpdate` غير مضمون. وبما أن حركات الصفحات تحسين إضافي، وأن هذا المكون سيعمل حتى لو لم يُستدعَ `shouldComponentUpdate`، فأنا مقبول مع هذا التحفظ.

### نهج بديل من دون انتقالات العرض

من عيوب View Transitions API اللازمة لانتقالات الصفحات أنها تحتاج إلى HTML الصفحة الجديدة قبل بدء الحركة. وقد يستغرق هذا وقتًا ويترك المستخدم بلا أي تغذية راجعة بعد نقره على رابط. وقد تملأ مؤشرات التحميل الفجوة، لكن يمكننا كسب بعض الوقت بتحريك العناصر خارج الشاشة فور نقر المستخدم على الرابط، ثم تحريك HTML الجديد إلى الداخل عند وصوله. وهذا مشابه لطريقة انتقال iOS القياسية، إذ تنزلق على الشاشة الفورية أثناء تحميل الشاشة التالية.

- ينقر المستخدم على رابط
- تتحرك العناصر إلى الخارج؛ وفي هذه الأثناء يُرسل طلب البيانات
- ننتظر اكتمال الاستجابة والحركات معًا
- تتحرك الاستجابة إلى الداخل

الفرق الرئيسي بين هذا النهج ونهج View Transitions API أنه لا يستطيع *انتقال* العناصر من حالة إلى الحالة التالية، لأنه عند تحريكها إلى الخارج لا يملك HTML الجديد بعد.

كلا النهجين مفيد حسب الحالة. على سبيل المثال، إذا كانت هناك عناصر مشتركة من صفحة إلى أخرى، فقد تختار انتقال عرض. أما إذا كان التغيير كبيرًا مع وجود عناصر مشتركة قليلة، فقد تستفيد من التغذية الراجعة الفورية للحركة الخارجة.

لتنفيذ ذلك، سنحتاج إلى الارتباط بأحداث التوجيه، وسيعتمد ذلك على الإطار أو المكتبة التي تستخدمها. على وجه الخصوص، سنحتاج إلى إشعارنا عندما ينتقل المستخدم. ومع Next.js، يمكننا استخدام [حدث الموجّه `routeChangeStart`](https://nextjs.org/docs/api-reference/next/router#routerevents) لبدء حركات الخروج، لكن لنرَ كيف يمكننا تحقيق ذلك *من دون* Next.js أو React أو HTML معروض بالكامل على العميل (client).

### تحريك تطبيقات الصفحات المتعددة المعروضة من الخادم باستخدام Turbo وTurn

**ملاحظة:** هناك خطط لتعمل View Transition API مع التنقل متعدد الصفحات، أي من دون JavaScript. لكن قد تبقى واجهة JavaScript ضرورية للانتقالات الأكثر تقدمًا.

يقدم [Turbo](https://turbo.hotwired.dev/)، وهو جزء من مجموعة مكتبات [Hotwire](https://hotwired.dev/) (لا ينبغي الخلط بينه وبين [Turbo من Vercel](https://turbo.build/))، نهج عرض يحسّن تطبيقات الصفحات المتعددة (MPAs) تدريجيًا. ويهدف إلى تحقيق سرعة SPA من دون الحاجة إلى هندسة شيفرتك كتطبيق معروض بالكامل على العميل (client)، وذلك من خلال التقاط نقرات الروابط وإرسال النماذج، وتنفيذ الطلب باستخدام JavaScript، واستبدال `` بـ`` الجديد من الاستجابة. وهكذا، إنه نهج هجين: يُنشأ HTML على الخادم (server)، لكن يُحدّث DOM عبر JavaScript.

[Turn](https://github.com/domchristie/turn) مكتبة لتحريك التنقل بين الصفحات باستخدام Turbo. وهي تدعم منهجَي الحركة، رغم أن انتقالات العرض تجريبية حاليًا. يضيف Turn الصنفين `turn-before-exit` و`turn-exit` و`turn-enter` إلى عنصر `` في الأوقات المناسبة، مما يتيح للمطورين تخصيص الحركات.

لتشغيله، أضف السمتين `data-turn-exit` و`data-turn-enter` إلى العناصر التي تريد تحريكها، ثم طبّق أنماط CSS. على سبيل المثال، لحركة التلاشي عند الدخول والخروج:

```javascript
html.turn-exit [data-turn-exit] {

animation-name: fade-out;

animation-duration: 0.3s;

animation-fill-mode: forwards;

}

html.turn-enter [data-turn-enter] {

animation-name: fade-in;

animation-duration: 0.6s;

animation-fill-mode: forwards;

}

@keyframes fade-out {

0% {

opacity: 1;

}

100% {

opacity: 0;

}

}

@keyframes fade-in {

0% {

opacity: 0;

}

100% {

opacity: 1;

}

}
```

استورد مكتبة `Turn` إلى JavaScript في تطبيقك، ثم استدعِ `Turn.start()`.

يعمل عبر الارتباط بأحداث عرض Turbo والتحكم في التدفق حسب الحاجة:

- `turbo:visit`: قبل بدء الطلب مباشرة، أضف الصنف `turn-exit`
- `turbo:before-render`: بعد اكتمال الطلب وقبل عرض HTML الجديد (شبيه بـ`shouldComponentUpdate` في React)، أوقف العرض وانتظر اكتمال حركات الخروج
- `turbo:render`: بعد عرض HTML الجديد، أزل صنف `turn-exit` وأضف صنف `turn-enter`
- بمجرد اكتمال حركات الخروج، أزل صنف `turn-enter`

كما يدعم Turn انتقالات العرض تجريبيًا، ويُفعّل بضبط `Turn.config.experimental.viewTransitions = true`. وسيستخدم انتقالات العرض حيث كانت مدعومة، ويعود إلى نهج حركة CSS. (استكشاف كيفية تفعيل النهج حالةً بحالة عمل جارٍ :)

## الخلاصة

يمكن أن تكون انتقالات الصفحات وسيلة فعالة للإبلاغ عن التغييرات من صفحة إلى أخرى. ويمكن لواجهة View Transitions API المدمجة الجديدة تنفيذ انتقالات معقدة عند تزويدها بالحالتين القديمة والجديدة. ومن خلال الارتباط بأحداث الإطار، يمكننا إبلاغ الواجهة بتغييرات الحالة هذه. وبالنسبة إلى تنقل الصفحات، من المثالي أن تحدث الانتقالات بعد انتهاء الطلب لتجنب بقاء DOM في حالة خاملة.

الأسلوب البديل، أو التكميلي، هو تنفيذ حركات الخروج فور أن ينقر المستخدم على رابط. وتفيد هذه الطريقة في كسب بعض الوقت ليكتمل الطلب قبل وصول HTML الجديد.

#### Dom Christie

مهندس برمجيات

Twitter

الموقع

Github
