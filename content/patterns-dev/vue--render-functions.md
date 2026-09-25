---
title: دوال العرض
lang: ar
source: https://www.patterns.dev/vue/render-functions/
---
يوصي Vue بأن نستخدم القوالب (أي صيغة ``) لبناء ترميز (markup) مكوّنات Vue. غير أننا نُتاح لنا أيضًا فرصة استخدام ما يُعرف بـ **دوال العرض** (render functions) مباشرة لبناء ترميز مكوّناتنا كذلك.

يأخذ Vue القوالب التي ننشئها لمكوّناتنا وقت البناء (build time) ويترجمها إلى دوال عرض. وعند دوال العرض المترجمة هذه، يبني Vue تمثيلًا افتراضيًا للعقد التي تشكّل الـ DOM الافتراضي (virtual DOM).

> إذا كنت مهتمًا، فإن قسم [آلية العرض](https://vuejs.org/guide/extras/rendering-mechanism.html) في توثيق Vue يتعمّق أكثر في مفهوم الـ DOM الافتراضي وآلية العرض الداخلية في Vue.

باستخدام دوال العرض، فإننا نتخطّى خطوة الترجمة التي يقوم بها Vue لترجمة قوالبنا، ونتمكّن من بناء قوالب مكوّناتنا بمساعدة JavaScript البرمجية.

## لكن لماذا؟

تدخل دوال العرض إلى الصورة عندما نحتاج إلى مستوى أعلى من التخصيص والمرونة ليسهل تحقيقه بصيغة القوالب المعيارية. قد يبدو هذا غير بديهي في البداية، ولا سيما بالنظر إلى تركيز Vue على بساطة نظام القوالب وقابليته للقراءة. باختصار، قد تفضّل استخدام دوال العرض:

- عندما تحتاج إلى عرض المكوّنات أو العناصر ديناميكيًا بناءً على منطق معقّد يكون التعبير عنه داخل قالب مرهقًا.
- عندما تريد الإمساك مباشرةً بالـ DOM الافتراضي لإجراء تعديلات متقدّمة.
- عندما تريد استخدام JSX لبناء قالب مكوّناتك.

خارج هذه الحالات الفريدة، ينبغي أن تبقى صيغة قوالب Vue هي الطريقة المفضّلة لبناء ترميز المكوّنات. لكن في المواقف الفريدة، قد يكون من المهمّ فهم كيفية عمل دوال العرض. لذا سنغوص في هذا المقال في دوال العرض ونستكشف كيفية استخدامها لبناء مكوّن أساسي.

## دوال العرض

لنفترض لدينا المكوّن التالي الذي يحتوي على عنصر `` يضمّ عنصر `` بداخله. ويعرض المحتوى النصّي للعنصر `` ببساطة قيمة الخاصية `message`.

```javascript
<template>

<div class="render-card">

<header class="card-header card-header-title">{{ message }}</header>

</div>

</template>

<script setup>

const { message } = defineProps(["message"]);

</script>
```

سنعيد إنشاء ترميز المكوّن خطوةً بخطوة بمساعدة دالة العرض — أي الدالة `h()`.

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

</script>
```

`h` اختصار لكلمة **hyperscript**، وهي مصطلح يُستخدم كثيرًا في تطبيقات الـ DOM الافتراضي للإشارة إلى صيغة JavaScript التي تُنتج HTML. وبعبارة مبسّطة، الدالة `h()` هي دالة العرض التي تتيح لنا إنشاء التمثيل «الافتراضي» لعقد الـ DOM التي يستخدمها Vue لتتبّعها ثمّ عرضها على الصفحة.

تأخذ الدالة `h()` ثلاثة وسائط خاصة بها:

- اسم وسم HTML أو تعريف مكوّن.
- الخصائص (props) والسمات (attributes) التي ستُمرَّر إلى العنصر (مستمعات الأحداث، سمات `class`، إلخ).
- العقد الفرعية للعقدة الأصل.

اسم وسم HTML للعقدة الأصل التي نريد إنشاءها هو عنصر ``. سنُسند نتيجة الدالة `h()` إلى ثابت يحمل الاسم `render` ونمرّر سلسلة قيمتها `'div'` كوسيط أول:

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

const render = () => {

return h("div");

};

</script>
```

سنهتمّ بتطبيق صنف CSS ذا الاسم `.render-card` على عنصر `` الأصل. ولتحقيق ذلك، سنصرّح في الوسيط الثاني من الدالة `h()` بأن كائن البيانات يحتوي على خاصية `class` قيمتها سلسلة نصّية هي `'render-card'`:

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

const render = () => {

return h("div", {

class: "render-card",

});

};

</script>
```

> ورغم أننا لن نفعل الكثير في هذا المثال، هناك طرق عديدة ومختلفة لتعريف السمات باستخدام كائن البيانات في الوسيط الثاني. إذا كنت مهتمًا، فبالتأكّد من الاطّلاع على [توثيق Vue](https://vuejs.org/guide/extras/render-function.html#creating-vnodes) للحصول على ملخّص جيّد.

سنريد أن يحتوي عنصر `` الأصل على عنصر `` فرعي خاص به. وفي الوسيط الثالث من الدالة `h()`، يمكننا إمّا تحديد سلسلة نصّية بسيطة لعرض نصّ، أو مصفوفة لعرض عقد افتراضية أكثر (أي عناصر أكثر).

ولأننا سنعرض عنصرًا آخر مُولَّدًا كعنصر فرعي، سنصرّح بالدالة `h()` داخل مصفوفة العقد الفرعية ونعطيها قيمة سلسلة نصّية هي `'header'`:

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

const render = () => {

return h(

"div",

{

class: "render-card",

},

[h("header")]

);

};

</script>
```

العنصر الفرعي `header` ينبغي أن يكون له أصناف خاصة به، لذا سنمرّر كائن سمات في الدالة `h()` المتداخلة تصريحًا بالأصناف التي ينبغي أن يحملها عنصر `header`:

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

const render = () => {

return h(

"div",

{

class: "render-card",

},

[

h("header", {

class: "card-header card-header-title",

}),

]

);

};

</script>
```

العنصر الفرعي `header` ينبغي ألّا يحتوي على أي عناصر فرعية خاصة به، وأن يعرض ببساطة قيمة الخاصية `message`. ولكي يعرض عنصر `header` الخاصية `message` كمحتوى فرعي له، سنصرّح بقيمة `message` في الوسيط الثالث من الدالة `h()` المتداخلة.

```javascript
<script setup>

import { h } from "vue";

const { message } = defineProps(["message"]);

const render = () => {

return h(

"div",

{

class: "render-card",

},

[

h(

"header",

{

class: "card-header card-header-title",

},

message

),

]

);

};

</script>
```

وهذا كل شيء! آخر ما تبقى لنا فعله هو وضع عنصر العقدة الافتراضية `render` الذي أنشأناه في قسم القالب داخل المكوّن.

```javascript
<template>

<render />

</template>

<script setup>

import { h } from "vue";

/* eslint-disable-next-line no-undef, no-unused-vars */

const { message } = defineProps(["message"]);

/* eslint-disable-next-line no-unused-vars */

const render = () => {

return h(

"div",

{

class: "render-card",

},

[

h(

"header",

{

class: "card-header card-header-title",

},

message

),

]

);

};

</script>
```

يمكنك الآن المضي قدمًا وعرض المكوّن أعلاه في نسخة `App.vue` الأصل وتمرير قيمة `"Hello World!"` إلى الخاصية `message`.

```javascript
<template>

<RenderComponent message="Hello world!" />

</template>

<script setup>

import RenderComponent from "./components/RenderComponent.vue";

</script>
```

عند حفظ هذه التغييرات، سيُعرض لنا في واجهة المستخدم `“Hello World!”` ما يخبرنا أننا قد عرضنا المكوّن الفرعي على النحو المناسب.

![دالة العرض التي تُنتج العنصر](/images/patterns-dev/vue-render-functions-0-render_function.webp)

يا إلهي. إذا كنت تشعر بالارتباك هنا، فلا داعي للقلق. فرغم أن دوال العرض تمنحنا قوة أكبر في تخصيص ترميز مكوّناتنا كما نرغب، فإن استخدام القوالب القياسية يكون عادةً *أسهل بكثير* في الغالبية العظمى من الوقت. ولا يُلجأ إلى دوال العرض إلا في الحالات الفريدة التي تتطلّب عرضًا ديناميكيًا معقّدًا أو تخصيصًا.

JavaScript iconRenderComponent.vue

```javascript
<template>
  <render />
</template>

<script setup>
import { h } from "vue";

/* eslint-disable-next-line no-undef, no-unused-vars */
const { message } = defineProps(["message"]);

/* eslint-disable-next-line no-unused-vars */
const render = () => {
  return h(
    "div",
    {
      class: "render-card",
    },
    [
      h(
        "header",
        {
          class: "card-header card-header-title",
        },
        message
      ),
    ]
  );
};
</script>
```

[Open CodeSandbox](https://codesandbox.io/embed/render-functions-1-r27yxv)

## دوال العرض وJSX

كان سبب رئيسي يجعل التطبيق الذي أنجزناه أعلاه يبدو نوعًا ما مؤلمًا هو أننا كتبنا دالة العرض باستخدام JavaScript أصلية خام. وللمساعدة في جعل كتابة دوال العرض أسهل بكثير، يمنحنا Vue القدرة على كتابة دوال العرض باستخدام JSX بمساعدة [إضافة Babel](https://github.com/vuejs/babel-plugin-jsx) مناسبة!

> إذا كنت قادمًا من خلفية React، فقد يكون JSX موضوعًا مألوفًا لك. وببساطة، JavaScript XML (أو ما هو معروف أكثر باسم JSX) هو امتداد يتيح لنا كتابة JavaScript يشبه HTML (أي كتابة صيغة شبيهة بـ XML داخل JavaScript).

يمكن أن يساعد JSX على إعادة إنشاء تطبيق العرض الخاص بنا بطريقة أسهل بكثير في القراءة، لأننا نستطيع الكتابة بأمان داخل دالة العرض بصيغة HTML:

```javascript
<template>

<render />

</template>

<script setup lang="jsx">

const { message } = defineProps(["message"]);

const render = (

<div class="render-card">

<header class="card-header card-header-title">{message}</header>

</div>

);

</script>
```

مع JSX، لا تبدو دالة العرض صعبة البتّة! ومن المهمّ أن ندرك أن JSX هو أداة تطوير تحتاج دائمًا إلى أن تُترجم (transpile) بمساعدة حزمة Babel (مثل [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)) إلى JavaScript قياسية. ويمتلك كلٌّ من [create-vue](https://github.com/vuejs/create-vue) و[Vue CLI](https://cli.vuejs.org/) خيارات لتوليد مشاريع ذات دعم JSX مُهيّأ مسبقًا.

JavaScript iconRenderComponent.vue

```javascript
<template>
  <render />
</template>

<script setup lang="jsx">
const { message } = defineProps(["message"]);

const render = <div class="render-card"><header class="card-header card-header-title">{message}</header></div>
</script>
```

[Open CodeSandbox](https://codesandbox.io/embed/render-functions-2-347w23)

## المكوّنات الوظيفية

المكوّنات الوظيفية (functional components)، وهي نوع من دوال العرض، توفّر طريقة لتعريف المكوّنات **باستخدام دوال عادية**. والمكوّنات الوظيفية هي نوع مميّز من المكوّنات يفتقر إلى حالة داخلية. وهي تشبه الدوال الخالصة (pure functions)، إذ تقبل الخصائص (props) كمدخلات وتُنتج عقدًا افتراضية كمخرجات.

ولإنشاء مكوّن وظيفي، نستخدم دالة بسيطة بدلًا من كائن خيارات (options). وتؤدي هذه الدالة فعليًا دور دالة العرض المسؤولة عن توليد ناتج المكوّن.

```javascript
function RenderComponent(props, { slots, emit, attrs }) {

// ...

}

export default RenderComponent;
```

يمكنك استخدام الدالة `h()` لإنشاء قالب مكوّننا كما رأينا سابقًا.

```javascript
import { h } from "vue";

function RenderComponent(props) {

return h(

"div",

{

class: "render-card",

},

[

h(

"header",

{

class: "card-header card-header-title",

},

props.message

),

]

);

}

export default RenderComponent;
```

بالإضافة إلى ذلك، يمكننا أيضًا استخدام JSX لعرض قالب المكوّن بطريقة أسهل في القراءة.

```javascript
function RenderComponent(props) {

return (

<div class="render-card">

<header class="card-header card-header-title">{props.message}</header>

</div>

);

}

export default RenderComponent;
```

مع هذا الإعداد للمكوّن الوظيفي، سيعرض مكوّننا نفس العبارة “Hello World!” في واجهة المستخدم.

JavaScript iconRenderComponent.vue

```javascript
function RenderComponent(props) {
    return (
      <div class="render-card">
        <header class="card-header card-header-title">{props.message}</header>
      </div>
    );
  }
  
  export default RenderComponent;
```

[Open CodeSandbox](https://codesandbox.io/embed/render-functions-3-cvvf2m)

## الخلاصة

تقدّم دوال العرض طريقة قوية لبناء ترميز مكوّنات Vue برمجيًا باستخدام JavaScript. وهي تتيح لنا إنشاء تمثيلات افتراضية لعقد الـ DOM التي يستخدمها Vue لتتبّعها وعرضها على الصفحة.

وبينما توفّر دوال العرض مرونة وتخصيصًا، فإنها قد تكون أعقد مقارنةً باستخدام القوالب القياسية. إذا شعرت أنك لم تفهم المعلومات الواردة في هذا المقال فهمًا كاملًا — **فهذا أمر طبيعي تمامًا**. يوصي Vue بأن نستخدم القوالب القياسية كلما أمكننا ذلك، لأن دوال العرض أصعب في الفهم والتنفيذ داخل التطبيق. لكن دوال العرض قد تكون مفيدة في السيناريوهات الفريدة التي تحتاج فيها إلى قوة ومرونة أكبر في تخصيص ترميز المكوّنات.

## مصادر مفيدة

- [دوال العرض وJSX | توثيق Vue](https://vuejs.org/guide/extras/render-function.html)
- [آلية العرض | توثيق Vue](https://vuejs.org/guide/extras/rendering-mechanism.html)
