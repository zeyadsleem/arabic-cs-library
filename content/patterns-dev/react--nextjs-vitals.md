---
title: تحسين تطبيقات Next.js وفق Core Web Vitals
lang: ar
source: https://www.patterns.dev/react/nextjs-vitals/
---
يتطلب تحسين تجربة المستخدم (user experience) وفق [Core Web Vitals](https://web.dev/vitals) تحسين سرعة الصفحة وتفاعليتها واستقرارها البصري. ويتيح Next.js، عبر عدة مكوّنات بُنيت بالتعاون مع [فريق Chrome](https://web.dev/aurora)، تحسين مقاييس Core Web Vitals.

- `next/image`: مكوّن `next/image` المصمم لتحسين الصور وتحسين [Largest Contentful Paint](https://web.dev/lcp) (LCP) و[Cumulative Layout Shift](https://web.dev/cls) (CLS) تلقائيًا عبر تغيير حجمها وضغطها وتحميلها كسولًا. ويمكن أيضًا استخدامه لعرض صور متجاوبة تتكيف مع أحجام الشاشات المختلفة.
- `next/script`: يمكن استخدام مكوّن `next/script` لتحميل سكربتات الأطراف الثالثة بصورة غير متزامنة لتحسين سرعة الصفحة وتفاعليتها. ويمكن استخدامه أيضًا لتأجيل تحميل السكربتات غير الحرجة، مثل سكربتات التحليلات، لمنعها من إبطاء التحميل الأولي للصفحة. ويمكن لهذه التقنيات تحسين مقاييس مثل [First Input Delay](https://web.dev/fid) (FID) و[Interaction To Next Paint](https://web.dev/inp) (INP).
- `next/font`: يمكن استخدام مكوّن `next/font` لتحسين تحميل خطوط الويب عبر تحميلها بصورة غير متزامنة وإعطاء الأولوية لأنماط الخطوط الأهم في التحميل الأولي للصفحة. ويمكن أن يساعد ذلك على تحسين سرعة الصفحة واستقرارها البصري بمنع إزاحات التخطيط (CLS) الناتجة عن تحميل الخطوط.

لنراجع ما يفعله كل مكوّن بمزيد من التفصيل.

## مكوّن Image في Next.js

مكوّن Image في Next.js، أي [next/image](https://nextjs.org/docs/basic-features/image-optimization)، هو امتداد لعنصر HTML `&#x3C;img>`؛ فهو يوفر تحسينات للأداء (performance) تساعدك على تحقيق نتائج جيدة في [Core Web Vitals](https://web.dev/vitals). هذه الدرجات مؤشرات مهمة عن مدى جودة تجربة المستخدمين لموقعك، وقد تؤثر في ترتيب نتائج بحث Google.

وثائق Next.js الرسمية:

- [بناء مكوّن Image فعّال](https://developer.chrome.com/blog/image-component/)
- [نظرة عامة على ميزة `next/image`](https://nextjs.org/docs/basic-features/image-optimization)
- [مرجع واجهة `next/image`](https://nextjs.org/docs/api-reference/next/image)
- [وثائق تحسين محركات البحث لـ `next/image`](https://nextjs.org/learn/seo/improve/images)

### التحسينات المدمجة

تشمل بعض التحسينات المدمجة في مكوّن Image ما يلي:

- **أداء محسّن**: تقديم صورة بالحجم الصحيح لكل جهاز دومًا، باستخدام صيغ الصور الحديثة
- **استقرار بصري**: منع [Cumulative Layout Shift](https://web.dev/cls) تلقائيًا. **تحميل أسرع للصفحات**: لا تُحمَّل الصور إلا عند دخولها مجال الرؤية، مع عناصر نائبة اختيارية تُظهر نسخة ضبابية أولًا
- **مرونة الأصول**: تغيير حجم الصور عند الطلب، حتى الصور المخزّنة على خوادم بعيدة. استخدام مكوّن Image

لإضافة صورة إلى تطبيقك، استورد مكوّن `next/image`:

```javascript
import Image from "next/image";
```

يمكنك الآن تعريف `src` للصورة، سواء كانت محلية أو بعيدة.

**الصور المحلية** لاستخدام صورة محلية، استورد ملفات `.jpg` أو `.png` أو `.webp`:

```javascript
import profilePic from "../public/me.png";
```

يجب أن يكون الاستيراد ثابتًا كي يمكن تحليله وقت البناء.

يحدد Next.js تلقائيًا عرض الصورة وارتفاعها بناءً على الملف المستورد. وتستخدم هذه القيم لمنع Cumulative Layout Shift أثناء تحميل الصورة.

```javascript
import Image from "next/image";

import profilePic from "../public/me.png";

function Home() {

return (

&#x3C;>

&#x3C;h1>My Homepage&#x3C;/h1>

&#x3C;Image

src={profilePic}

alt="Picture of the author"

// width={500} automatically provided

// height={500} automatically provided

// blurDataURL="data:..." automatically provided

// placeholder="blur" // Optional blur-up while loading

/>

&#x3C;p>Welcome to my homepage!&#x3C;/p>

&#x3C;/>

);

}
```

#### الصور البعيدة

لاستخدام صورة بعيدة، يجب أن تكون الخاصية `src` سلسلة URL، نسبية أو مطلقة. ولأن Next.js لا يمكنه الوصول إلى الملفات البعيدة أثناء عملية البناء، فستحتاج إلى توفير خصائص العرض والارتفاع و`blurDataURL` الاختيارية يدويًا:

```javascript
import Image from "next/image";

export default function Home() {

return (

&#x3C;>

&#x3C;h1>My Homepage&#x3C;/h1>

&#x3C;Image

src="/me.png"

alt="Picture of the author"

width={500}

height={500}

/>

&#x3C;p>Welcome to my homepage!&#x3C;/p>

&#x3C;/>

);

}
```

**النطاقات**

قد ترغب أحيانًا في تحسين صورة بعيدة مع الاستمرار في استخدام واجهة Next.js المدمجة لتحسين الصور. ولأجل ذلك، اترك المُحمِّل (loader) على إعداده الافتراضي وأدخل عنوان URL مطلقًا لخاصية `src` في Image.

لحماية تطبيقك من المستخدمين الخبيثين، عليك تحديد قائمة بأسماء المضيفات البعيدة التي تنوي استخدامها مع مكوّن `next/image`.

**المُحمِّلات** لاحظ أن المثال السابق استخدم URL جزئيًا، هو `/me.png`، لصورة بعيدة. وهذا ممكن بسبب بنية المُحمِّل.

المُحمِّل دالة تولّد عناوين URL لصورتك. تعدّل `src` المعطى، وتولّد عناوين URL متعددة لطلب الصورة بأحجام مختلفة. وتولّد عناوين URL هذه

**الصور البعيدة مع التحجيم التلقائي**

إذا كنت تستخدم صورة بعيدة، فعليك توفير الخاصيتين `width` و`height` لمكوّن Image. لكن إذا كنت لا تعرف أبعاد الصورة البعيدة، فيمكنك دمج الخاصية `layout` مع الخاصية `aspectRatio` كي يحسب Next.js العرض والارتفاع تلقائيًا.

على سبيل المثال، إذا أردت عرض صورة بعيدة بنسبة عرض إلى ارتفاع 16:9 وأردت لمكوّن Image أن يملأ حاويته، فيمكنك استخدام الشيفرة التالية:

```javascript
import Image from "next/image";

function Home() {

return (

&#x3C;>

&#x3C;h1>My Homepage&#x3C;/h1>

&#x3C;div style={{ width: "100%", height: "50vh" }}>

&#x3C;Image

src="https://example.com/my-image.jpg"

alt="My Image"

layout="fill"

objectFit="cover"

aspectRatio={16 / 9}

/>

&#x3C;/div>

&#x3C;p>Welcome to my homepage!&#x3C;/p>

&#x3C;/>

);

}
```

في هذا المثال، تُضبط الخاصية `layout` على `fill`، مما يطلب من Next.js ملء أبعاد الحاوية الأصل. وتُضبط الخاصية `objectFit` على `cover`، مما يحجم الصورة لتغطية الحاوية كاملة مع الحفاظ على نسبة أبعادها. وتُضبط الخاصية `aspectRatio` على `16 / 9`، وهي نسبة أبعاد الصورة.

**المُحمِّلات المخصصة**

يستخدم Next.js افتراضيًا واجهة تحسين الصور المدمجة لتحسين الصور وتقديمها. لكن إذا أردت تقديم صورك من مصدر آخر، مثل CDN أو خادم صور، فيمكنك تعريف دالة مُحمِّل مخصصة.

دالة المُحمِّل هي دالة تولّد عناوين URL لصورك. تأخذ وسيط `src`، وهو عنوان URL المصدر للصورة، وتعيد كائنًا بالخصائص التالية:

- `src`: عنوان URL للصورة الأصلية.
- `width`: عرض الصورة.
- `height`: ارتفاع الصورة.
- `blurDataURL`: سلسلة مرمّزة بـ base64 تمثل نسخة ضبابية من الصورة. تُستخدم كعنصر نائب أثناء تحميل الصورة.

إليك مثالًا على دالة مُحمِّل مخصصة تولّد عناوين URL للصور المخزّنة في AWS S3:

```javascript
import Image from "next/image";

function myLoader({ src, width, quality }) {

return `https://example.com/images/${src}?w=${width}&#x26;q=${quality || 75}`;

}

function Home() {

return (

&#x3C;>

&#x3C;h1>My Homepage&#x3C;/h1>

&#x3C;Image

loader={myLoader}

src="my-image.jpg"

alt="My Image"

width={500}

height={500}

/>

&#x3C;p>Welcome to my homepage!&#x3C;/p>

&#x3C;/>

);

}
```

في هذا المثال، تُضبط الخاصية `loader` على `myLoader`، وهي دالة مُحمِّل مخصصة تولّد عناوين URL للصور المخزّنة في AWS S3. وتُضبط الخاصية `src` على `my-image.jpg`، وهو اسم ملف الصورة. وتُضبط الخاصيتان `width` و`height` على `500`، وهو حجم الصورة.

### الخلاصة

باختصار، مكوّن Image في Next.js أداة قوية لتحسين الصور في تطبيق Next.js. فهو يتضمن مجموعة متنوعة من تحسينات الأداء المدمجة لمساعدتك على تحقيق نتائج جيدة في Core Web Vitals، مثل تحسين الأداء والاستقرار البصري وتحميل الصفحات بسرعة ومرونة الأصول.

يمكنك استخدام مكوّن Image لإضافة صور محلية أو بعيدة إلى تطبيقك، وسيحدد Next.js تلقائيًا عرض الصورة وارتفاعها لمنع Cumulative Layout Shift أثناء تحميل الصورة. ويمكنك أيضًا استخدام مُحمِّلات مخصصة.

## مكوّن Script في Next.js

الوثائق الرسمية:

- [تحسين تحميل السكربتات في Next.js](https://developer.chrome.com/blog/script-component/)
- [وثائق ميزة `next/script`](https://nextjs.org/docs/basic-features/script)
- [مرجع واجهة `next/script`](https://nextjs.org/docs/api-reference/next/script)

تمثل سكربتات الأطراف الثالثة طريقة شائعة للمطورين لتوفير الوقت والاستفادة من الحلول الموجودة لتنفيذ ميزات شائعة. لكن مطوّري هذه السكربتات كثيرًا ما يهملون تأثير شيفرتها على الأداء في المواقع التي تستخدمها، مما يؤدي إلى تجربة مستخدم دون المستوى الأمثل. كما تشكل هذه السكربتات تحديًا للمطورين، الذين قد لا يعرفون كيفية تحسين أدائها.

تمثل السكربتات كمية كبيرة من بايتات الأطراف الثالثة التي تنزلها المواقع ضمن فئات مختلفة من طلبات الأطراف الثالثة. وافتراضيًا، تعطي المتصفحات الأولوية للسكربتات وفق موقعها في المستند، وقد يؤخر ذلك اكتشاف السكربتات الحرجة لتجربة المستخدم أو تنفيذها. ينبغي تحميل مكتبات الأطراف الثالثة اللازمة للتخطيط مبكرًا من أجل عرض الصفحة، بينما ينبغي تأجيل الأطراف الثالثة غير الحرجة كي لا تحجب عمليات أخرى على الخيط الرئيسي. لدى Lighthouse فحصان لتمييز السكربتات التي تحجب العرض أو الخيط الرئيسي. من المهم مراعاة ترتيب تحميل موارد الصفحة كي لا تتأخر الموارد الحرجة ولا تحجب الموارد غير الحرجة الموارد الحرجة.

طوّر Next.js مكوّن Script يضم ميزات ترتيب تمنح المطورين تحكمًا أفضل في تحميل سكربتات الأطراف الثالثة. وينفذ المكوّن طرائق لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة، ويقدم قالبًا للمطورين لتعريف استراتيجية تحميله. وبمجرد تحديد الاستراتيجية المناسبة، سيُحمَّل بأكفأ طريقة من دون حجب الموارد الحرجة الأخرى.

قبل مناقشة مكوّن Script في Next.js، لنراجع الإرشادات المتاحة لتقليل تأثير السكربتات التي تحجب العرض.

**طرائق لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة**

تقدّم الإرشادات المتاحة الطرق التالية لتحميل سكربتات الأطراف الثالثة وترتيبها بكفاءة:

استخدم الخاصية `async` أو `defer` مع وسوم `&#x3C;script>` لتخبر المتصفح بتحميل سكربتات الأطراف الثالثة غير الحرجة من دون حجب محلّل المستند. ويمكن اعتبار السكربتات غير المطلوبة للتحميل الأولي للصفحة أو لأول تفاعل للمستخدم غير حرجة.

```javascript
&#x3C;script src="https://example.com/script1.js" defer>&#x3C;/script>

&#x3C;script src="https://example.com/script2.js" async>&#x3C;/script>

Establish early connections to required origins using preconnect and

dns-prefetch. This allows critical scripts to start downloading earlier.

&#x3C;head>

&#x3C;link rel="preconnect" href="http://PreconnThis.com" />

&#x3C;link rel="dns-prefetch" href="http://PrefetchThis.com" />

&#x3C;/head>
```

حمّل موارد وتضمينات الأطراف الثالثة كسولًا بعد انتهاء تحميل المحتوى الرئيسي للصفحة أو عندما يمرر المستخدم إلى الجزء الذي توجد فيه.

**مكوّن Script في Next.js**

يبني مكوّن Script في Next.js على وسم HTML `&#x3C;script>` ويوفر خيارًا لتعيين أولوية التحميل لسكربتات الأطراف الثالثة باستخدام الخاصية `strategy`. وبمجرد تحديد الاستراتيجية المناسبة، سيُحمَّل بأكفأ طريقة من دون حجب الموارد الحرجة الأخرى.

```javascript
// Example for beforeInteractive:

&#x3C;script

src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver"

strategy="beforeInteractive"

/>

// Example for afterInteractive (default):

&#x3C;script src="https://example.com/samplescript.js" />

// Example for lazyonload:

&#x3C;script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload" />
```

يمكن أن تأخذ الخاصية `strategy` ثلاث قيم:

- `beforeInteractive`: يمكن استخدام هذا الخيار مع السكربتات الحرجة التي ينبغي أن تُنفَّذ قبل أن تصبح الصفحة تفاعلية. يضمن Next.js حقن هذه السكربتات في HTML الأولي على الخادم وتنفيذها قبل JavaScript المجمّع الذاتي. وإدارة موافقة المستخدم وسكربتات كشف الروبوتات أو مكتبات المساعدات اللازمة لعرض المحتوى الحرج مرشحات جيدة لهذه الاستراتيجية.
- `afterInteractive`: هذه هي الاستراتيجية الافتراضية المطبقة، وتكافئ تحميل سكربت باستخدام الخاصية `defer`.
- `lazyOnloadExternal`: يمكن استخدام هذا الخيار لتحميل سكربتات ذات أولوية منخفضة مستضافة على خوادم خارجية عندما يكون المتصفح خاملًا. وهذه الاستراتيجية مفيدة خصوصًا عندما لا تكون السكربتات حرجة لعرض صفحة ويمكن تحميلها بعد التحميل الأولي. ومن أمثلتها سكربتات الإعلانات التي يمكن تحميلها بعد التحميل الأولي عندما يكون المستخدم خاملًا.

يوفر مكوّن Script كذلك آلية لتضمين سكربتات الأطراف الثالثة داخل الصفحة باستخدام الخاصية `inline`. ويمكن لتضمين السكربتات أن يقلل عدد الطلبات التي يرسلها الموقع، وقد يكون ذلك مفيدًا 특히ًا مع السكربتات الصغيرة. ومع ذلك، لا يُستحسن تضمين السكربتات الكبيرة لأنها قد تزيد حجم مستند HTML فتجعل تنزيله أبطأ.

```javascript
// Example for inlining a script:

&#x3C;script inline src="https://example.com/inlinescript.js" />
```

إلى جانب ما سبق، يوفر مكوّن Script ميزات أخرى مثل تخزين السكربتات مؤقتًا وإزالة تكرارها وإمداد البدائل الاحتياطية لها. ويمكن لتخزين السكربتات مؤقتًا أن يحسن زمن تحميل الصفحة، ولا سيما عندما يعود المستخدمون إلى موقع. ويمكن لإزالة تكرار السكربتات أن تقلل عدد الطلبات المرسلة إلى الخادم، بما يخفف الحمل عليه. وأخيرًا، يمكن استخدام بدائل السكربتات لتحميل سكربت مختلف إذا فشل تحميل السكربت الأساسي.

## مكوّن Font في Next.js

يعد تحسين الخطوط البديلة بالغ الأهمية لأداء الويب وإمكانية الوصول. فحين يزور المستخدم موقعًا، ينبغي أن يرى المحتوى في أقرب وقت ممكن، حتى لو لم يُحمّل الخط المخصص الذي يستخدمه الموقع بعد. سنستكشف في هذه المقالة مكوّن Font في Next.js وكيف يساعد في تحسين الخطوط البديلة.

- [ميزات تحسين الخطوط في Next.js](https://nextjs.org/docs/basic-features/font-optimization)
- [أدوات إطار العمل للخطوط البديلة](https://developer.chrome.com/blog/framework-tools-font-fallback/)
- [مرجع واجهة `next/font`](https://nextjs.org/docs/api-reference/next/font)

يوفر Next.js طريقة مدمجة لتفعيل تحسين الخطوط البديلة. وتكون هذه الميزة مفعّلة افتراضيًا عند تحميل الخطوط باستخدام مكوّن `@next/font`. أُضيف مكوّن `@next/font` في الإصدار 13 من Next.js ويوفر واجهة لاستيراد Google Fonts أو خطوط مخصصة إلى صفحاتك. ويضم كذلك استضافة ذاتية تلقائية مدمجة لملفات الخطوط.

عند الاستخدام، تُحسب مقاييس الخط البديل تلقائيًا وتُحقن في ملف CSS. ويضمن ذلك أن يطابق الخط البديل الخط المخصص في الحجم وارتفاع السطر عندما لا يكون الخط المخصص متاحًا. ويمنع ذلك إزاحات التخطيط التي قد تحدث عند تحميل الخط البديل.

**استخدام مكوّن Font في Next.js**

لنفترض أنك تستخدم خط Roboto. عادةً ما تعرّفه في CSS هكذا:

```javascript
@font-face {

font-family: "Roboto";

font-display: swap;

src: url("/fonts/Roboto.woff2") format("woff2"), url("/fonts/Roboto.woff")

format("woff");

font-weight: 700;

}

body {

font-family: Roboto;

}
```

للانتقال إلى مكوّن Font في Next.js، انقل تعريف خط Roboto إلى JavaScript عن طريق استيراد دالة `Roboto` من `next/font`. وستعيد الدالة اسم `class` يمكنك الاستفادة منه في قالب المكوّن. تذكر إضافة `display: swap` إلى كائن الإعداد لتفعيل الميزة.

```javascript
import { Roboto } from "@next/font/google";

const roboto = Roboto({

weight: "400",

subsets: ["latin"],

display: "swap", // Using display swap automatically enables the feature

});
```

في المكوّن، استخدم اسم `class` المولّد:

```javascript
export default function RootLayout({

children,

}: {

children: React.ReactNode,

}) {

return (

&#x3C;html lang="en" className={roboto.className}>

&#x3C;body>{children}&#x3C;/body>

&#x3C;/html>

);

}
```

لاحظ أن مكوّن Font في Next.js مصمم لدعم خطي `Arial` و`Times New Roman` فقط كخطوط بديلة. ويرجع هذا الاختيار أساسًا إلى الدعم الواسع لهذين الخطين عبر المنصات.

**خيار الإعداد `adjustFontFallback`**

يحتوي مكوّن Font في Next.js على خيار إعداد `adjustFontFallback` يمكن استخدامه لتفعيل الخطوط البديلة التلقائية أو تعطيلها. وبالنسبة إلى `@next/font/google`، تكون هذه قيمة منطقية تحدد ما إذا كان ينبغي استخدام خط بديل تلقائي لتقليل Cumulative Layout Shift. القيمة الافتراضية هي `true`. ويضبط Next.js خطك البديل تلقائيًا على `Arial` أو `Times New Roman` حسب نوع الخط، أي serif أو sans-serif على التوالي.

وبالنسبة إلى `@next/font/local`، تكون هذه قيمة نصية أو القيمة المنطقية `false`، وتحدد ما إذا كان ينبغي استخدام خط بديل تلقائي لتقليل Cumulative Layout Shift. والقيم الممكنة هي `Arial` أو `Times New Roman` أو `false`. والقيمة الافتراضية هي `Arial`. وإذا أردت استخدام خط serif، ففكر في ضبط هذه القيمة على `Times New Roman`.

**تحسين Google Fonts**

إذا لم يكن استخدام مكوّن Font في Next.js خيارًا متاحًا، فهناك طريقة أخرى لاستخدام هذه الميزة مع Google Fonts عبر علم `optimizeFonts`. وتكون ميزة `optimizeFonts` في Next.js مفعّلة افتراضيًا. تضمّن هذه الميزة CSS الخاص بـ Google Font داخل استجابة HTML. وفعلًا، يمكنك أيضًا تفعيل ميزة ضبط الخطوط البديلة عبر ضبط علم `experimental.adjustFontFallbacksWithSizeAdjust` في `next`

مع مكوّن `@next/font`، يمكنك أيضًا استيراد خطوط مخصصة إلى صفحاتك. لاستخدام خط مخصص، عليك أولًا رفع ملفات الخط إلى دليل `public`. بعد ذلك، يمكنك استخدام قاعدة CSS ‏`@font-face` لتعريف عائلة الخط ومصادره.

إليك مثالًا على استخدام خط مخصص مع مكوّن `@next/font`:

```javascript
// In your component

import { MyCustomFont } from "@next/font/local";

const myCustomFont = MyCustomFont({

weight: "normal",

src: 'url("/fonts/MyCustomFont.woff2") format("woff2")',

});

export default function MyComponent() {

return (

&#x3C;div className={myCustomFont.className}>

&#x3C;h1>Hello World&#x3C;/h1>

&#x3C;/div>

);

}
```

```javascript
// In your CSS

@font-face {

font-family: "MyCustomFont";

font-weight: normal;

src: url("/fonts/MyCustomFont.woff2") format("woff2");

}
```

مع مكوّن `@next/font`، يمكنك أيضًا تحسين تحميل الخطوط بتحميل الخطوط المطلوبة في الصفحة فقط. ولأجل ذلك، يمكنك استخدام Font Observer API للكشف عند الحاجة إلى خط في الصفحة وتحميله بصورة ديناميكية.

إليك مثالًا على استخدام Font Observer API مع مكوّن `@next/font`:

```javascript
// In your component

import { useFontObserver } from "@next/font";

export default function MyComponent() {

const [isFontReady, fontClassName] = useFontObserver("Inter", {

weight: "400",

subsets: ["latin"],

});

return (

&#x3C;div className={fontClassName}>

{isFontReady ? (

&#x3C;h1>Hello World&#x3C;/h1>

) : (

&#x3C;h1 style={{ fontFamily: "sans-serif" }}>Hello World&#x3C;/h1>

)}

&#x3C;/div>

);

}
```

في هذا المثال، يُستخدم خطاف `useFontObserver` للكشف عن الوقت الذي يحتاج فيه خط `Inter` بوزن 400 ومجموعة فرعية لاتينية إلى الاستخدام في الصفحة. ويعيد الخطاف قيمة منطقية تبين ما إذا كان الخط جاهزًا للاستخدام، واسم `class` للخط يمكن تطبيقه على المكوّن.

إذا لم يكن الخط جاهزًا بعد، يعرض المكوّن خطًا بديلًا باستخدام خاصية CSS ‏`fontFamily`. وعندما يصبح الخط جاهزًا، يعرض المكوّن النص بخط `Inter`.

باختصار، يوفر مكوّن `@next/font` طريقة سهلة لتحسين الخطوط البديلة في تطبيق Next.js. وباستخدام هذا المكوّن، يمكنك تحسين الأداء وتجربة المستخدم في تطبيق الويب من خلال تحميل الخطوط الضرورية فقط وتقليل Cumulative Layout Shift الناتج عن تحميل الخطوط.

## الخلاصة

يمكن لـ `next/image` و`next/script` و`next/font` أن يكون لها تأثير كبير في تحسين Core Web Vitals. فإذا كنت تبني تطبيق Next.js وتريد ضمان تجربة ممتازة للمستخدم، ففكر في الاستفادة منها.
