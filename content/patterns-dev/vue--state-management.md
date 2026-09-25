---
title: إدارة الحالة
lang: ar
source: https://www.patterns.dev/vue/state-management/
---
**مكوّنات Vue هي لبنات البناء الأساسية لتطبيقات Vue**، إذ تتيح لنا دمج الترميز (HTML) والمنطق (JS) والأنماط (CSS) داخلها.

إليك مثالًا على مكوّن أحادي الملف (Single-File component) يعرض سلسلة من الأعداد انطلاقًا من خاصية بيانات:

```javascript
<template>

<div>

<h2>The numbers are {{ numbers }}!</h2>

</div>

</template>

<script setup>

import { ref } from "vue";

const numbers = ref([1, 2, 3]);

</script>
```

تُهيّئ الدالة `ref()` المكوّن ليكون *تفاعليًا* (reactive). وإذا تغيّرت قيمة خاصية تفاعلية مستخدَمة في القالب، فإن عرض المكوّن سيُعاد عرضه ليُظهر التغيير.

في المثال أعلاه، تكون `numbers` هي قيمة البيانات التفاعلية المستخدَمة في المكوّن. وماذا لو كانت `numbers` قيمة بيانات،تحتاج الوصول إليها من مكوّن آخر؟ على سبيل المثال، قد نحتاج إلى مكوّن يكون مسؤولًا عن عرض `numbers` (كما في الأعلى) وآخر للتعامل مع قيمة `numbers`.

إذا أردنا مشاركة `numbers` بين عدّة مكوّنات، فإن `numbers` لا تصبح بيانات على مستوى المكوّن فحسب *بل أيضًا* بيانات على مستوى التطبيق. وهذا يقودنا إلى موضوع **إدارة الحالة** (state management) — أي إدارة بيانات مستوى التطبيق.

قبل أن نتناول كيفية إدارتنا للحالة في التطبيق، سنبدأ بالنظر في كيفيةVERBirement **الخصائص** (props) مشاركة البيانات بين المكوّنات الأصل والفرعية.

## الخصائص

لنفترض لدينا تطبيقًا افتراضيًا يحتوي في البداية على مكوّن أصل ومكوّن فرعي فقط. ويمنحنا Vue القدرة على استخدام **الخصائص** (props) لتمرير البيانات من المكوّن الأصل إلى المكوّن الفرعي.

![إدارة الحالة عبر الخصائص](/images/patterns-dev/vue-state-management-0-props.webp)

استخدام الخصائص بسيط إلى حدٍّ كبير. فكل ما نحتاج إليه فعليًا هو ربط قيمة بسمة الخاصية في الموضع الذي يُعرض فيه المكوّن الفرعي. وإليك مثالًا على استخدام الخصائص لتمرير مصفوفة قيم إلى الأسفل بمساعدة التوجيه [v-bind](https://vuejs.org/api/built-in-directives.html#v-bind):

**ParentComponent**

```javascript
<template>

<div>

<ChildComponent :numbers="numbers" />

</div>

</template>

<script setup>

import { ref } from "vue";

import ChildComponent from "./ChildComponent";

const numbers = ref([1, 2, 3]);

</script>
```

**ChildComponent**

```javascript
<template>

<div>

<h2>{{ numbers }}</h2>

</div>

</template>

<script setup>

const { buttonText } = defineProps(["numbers"]);

</script>
```

يمرّر المكوّن `ParentComponent` مصفوفة `numbers` كخصائص (props) تحمل الاسم نفسه إلى `ChildComponent`. و`ChildComponent` يربط ببساطة قيمة `numbers` على قالبه.

JavaScript iconParentComponent.vue

```javascript
<template>
  <div>
    <ChildComponent :numbers="numbers" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import ChildComponent from "./ChildComponent";

const numbers = ref([1, 2, 3]);
</script>
```

[Open CodeSandbox](https://codesandbox.io/embed/state-management-1-wsgmql)

## أحداث المكوّنات

ماذا لو احتجنا إلى إيجاد طريقة للتواصل في الاتجاه المعاكس؟ ويمكن أن يكون أحد الأمثلة السماح للمستخدم بإدخال عدد جديد إلى المصفوفة المعروضة في المثال أعلاه من المكوّن الفرعي.

لا يمكننا استخدام `props` لأن `props` لا يمكن استخدامها إلّا لتمرير البيانات بصيغة أحادية الاتجاه (من الأصل إلى الفرعي إلى حفيد…). ولتسهيل إعلام المكوّن الفرعي للمكوّن الأصل بشيء ما، يمكننا استخدام الأحداث المخصّصة.

![إدارة الحالة عبر الأحداث المخصّصة](/images/patterns-dev/vue-state-management-1-custom_events.webp)

تُرسَل الأحداث المخصّصة في Vue كأحداث [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) أصيلة، وتُستخدم للتواصل بين المكوّنات.

إليك مثالًا على استخدام الأحداث المخصّصة لتمكين `ChildComponent` من تيسير تغيير في خاصية بيانات `numbers` الخاصة بـ `ParentComponent`:

**ChildComponent**

```javascript
<template>

<div>

<h2>{{ numbers }}</h2>

<input v-model="number" type="number" />

<button @click="$emit('number-added', Number(number))">

Add new number

</button>

</div>

</template>

<script setup>

const { numbers } = defineProps(["numbers"]);

</script>
```

**ParentComponent**

```javascript
<template>

<div>

<ChildComponent :numbers="numbers" @number-added="(n) => numbers.push(n)" />

</div>

</template>

<script setup>

import { ref } from "vue";

import ChildComponent from "./ChildComponent";

const numbers = ref([1, 2, 3]);

</script>
```

يمتلك المكوّن `ChildComponent` حقل إدخال يلتقط قيمة `number` وزرًّا يُصدر حدثًا مخصّصًا اسمه `number-added` يحمل قيمة `number` الملتقطة.

وفي `ParentComponent`، يُحدَّد مستمع للحدث المخصّص يُشار إليه بـ `@number-added` في الموضع الذي يُعرض فيه المكوّن الفرعي. وعندما يُصدر هذا الحدث في المكوّن الفرعي، فإنه يدفع قيمة `number` القادمة من الحدث إلى مصفوفة `numbers` الخاصة بـ `ParentComponent`.

JavaScript iconParentComponent.vue

```javascript
<template>
  <div>
    <ChildComponent :numbers="numbers" @number-added="(n) => numbers.push(n)" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-unused-vars
import ChildComponent from "./ChildComponent";

// eslint-disable-next-line no-unused-vars
const numbers = ref([1, 2, 3]);
</script>
```

[Open CodeSandbox](https://codesandbox.io/embed/state-management-2-m52vxf)

## إدارة حالة بسيطة

يمكننا استخدام الخصائص لتمرير البيانات إلى الأسفل والأحداث المخصّصة لإرسال الرسائل إلى الأعلى. وكيف يمكننا تمرير البيانات أو تيسير التواصل بين مكوّنين مختلفين شقيقين؟

![التواصل بين المكوّنات الشقيقة](/images/patterns-dev/vue-state-management-2-sibling_components_communication.webp)

لا يمكننا استخدام الأحداث المخصّصة بالطريقة التي استخدمناها أعلاه، لأن تلك الأحداث تُصدر داخل واجهة مكوّن معيّن، ونتيجة لذلك فإن مستمع الحدث المخصّص يحتاج إلى التصريح عند الموضع الذي يُعرض فيه المكوّن. وفي مكوّنين منعزلين، لا يُعرض أحدهما داخل الآخر.

إحدى الطرق البسيطة لإدارة حالة مستوى التطبيق هي إنشاء نمط مخزن (store) قائم على مشاركة مخزن بيانات بين المكوّنات. ويمكن للمخزن إدارة حالة تطبيقنا فضلًا عن الطرق المسؤولة عن تغيير الحالة.

على سبيل المثال، يمكننا أن يكون لدينا مخزن بسيط على النحو التالي:

```javascript
import { reactive } from "vue";

export const store = reactive({

numbers: [1, 2, 3],

addNumber(newNumber) {

this.numbers.push(newNumber);

},

});
```

يحتوي المخزن على مصفوفة `numbers` وطريقة `addNumber` التي تقبل حمولة (payload) وتُحدّث مباشرةً قيمة `numbers` في المخزن.

لاحظ استخدام الدالة `reactive()` لتعريف كائن الحالة؟ مع Vue 3.x، يمكننا استيراد الدالة `reactive()` واستخدامها للتصريح بحالة تفاعلية انطلاقًا من كائن JavaScript. وعندما تتغيّر هذه الحالة التفاعلية عبر الطريقة `addNumber()`، فإن أي مكوّن يستخدم هذه الحالة التفاعلية سيُحدَّث تلقائيًا!

يمكننا أن يكون لدينا مكوّن واحد مسؤول عن عرض مصفوفة `numbers` من المخزن، وسنسميه `NumberDisplay`:

**NumberDisplay**:

```javascript
<template>

<div>

<h2>{{ store.numbers }}</h2>

</div>

</template>

<script setup>

import { store } from "../store.js";

</script>
```

ويمكننا الآن أن يكون لدينا مكوّن آخر يُسمّى `NumberSubmit` يسمح للمستخدم بإضافة عدد جديد إلى مصفوفة بياناتنا:

**NumberSubmit**:

```javascript
<template>

<div>

<input v-model="numberInput" type="number" />

<button @click="store.addNumber(numberInput)">Add new number</button>

</div>

</template>

<script setup>

import { ref } from "vue";

import { store } from "../store.js";

const numberInput = ref(0);

</script>
```

يمتلك المكوّن `NumberSubmit` طريقة `addNumber()` تستدعي تغيير (mutation) المخزن `store.addNumber()` وتمرّر الحمولة المتوقّعة.

تتلقّى طريقة المخزن الحمولة وتُعدّل مباشرةً مصفوفة `store.numbers`. وبفضل تفاعلية Vue، فكلما تغيّرت مصفوفة `numbers` في حالة المخزن، فإن الـ DOM ذي الصلة الذي يعتمد على هذه القيمة (قالب المكوّن `NumberDisplay`) *يُحدَّث تلقائيًا*.

JavaScript iconstore.js

```javascript
import { reactive } from "vue";

export const store = reactive({
    numbers: [1, 2, 3],
    addNumber(newNumber) {
      this.numbers.push(newNumber);
    },
  });
```

[Open CodeSandbox](https://codesandbox.io/embed/state-management-3-78vzcy)

حين نقول هنا إن المكوّنات تتفاعل بعضها مع بعض، فإننا نستخدم كلمة «تفاعل» بالمعنى الواسع. فالمكوّنات لن تفعل شيئًا تجاه بعضها، بل ستُحدث تغييرات على بعضها الآخر *عبر* المخزن.

![مخزن حالة تفاعلي بسيط](/images/patterns-dev/vue-state-management-3-simple_store.webp)

وإذا أمعنا النظر في جميع القطع التي تتفاعل مباشرةً مع المخزن، يمكننا حينها من المسى:

- الطريقة الموجودة في `NumberSubmit` هي المسؤولة عن العمل مباشرةً على طريقة المخزن، لذا يمكننا وسمها بـ **إجراء المخزن** (store action).
- طريقة المخزن هي أيضًا تحمل مسؤولية معيّنة — وهي تعديل حالة المخزن مباشرةً. لذا سنقول إنها **تغيير في المخزن** (store mutation).
- لا يهتمّ `NumberDisplay` حقًا بنوع الطرق الموجودة في المخزن أو في `NumberSubmit`، وكل ما يعنيه هو الحصول على المعلومات من المخزن. لذا سنقول إن `NumberDisplay` هو نوعًا ما **جالب من المخزن** (store getter).

يترتّب **الإجراء** (action) على **التغيير** (mutation). و**التغيير** يعدّل الحالة، وهو ما يؤثر بدوره في العرض/المكوّنات. أمّا العرض/المكوّنات فتسترجع بيانات المخزن عبر **الجوالب** (getters). إننا نبدأ بالاقتراب من طريقة أكثر تنظيمًا للتعامل مع حالة مستوى التطبيق.

## Pinia

[Pinia](https://pinia.vuejs.org/) هو نمط إدارة حالة ومكتبة (library) لـ Vue.js توفّر طريقة أكثر تنظيمًا وقابلية للتوسّع للتعامل مع حالة مستوى التطبيق.

يُعدّ Pinia بديلًا لحلول إدارة الحالة الأخرى مثل [Vuex](https://vuex.vuejs.org/) وهو الآن مكتبة إدارة الحالة الرسمية لـ Vue. وهو يوفّر طريقة بسيطة وفعّالة لإنشاء المخازن وإدارتها، حيث تغلق هذه المخازن الحالة والإجراءات والجوالب.

في Pinia، يمكننا تعريف مخزن باستخدام الدالة `defineStore()`. ويتيح لنا Pinia تعريف مخزن بصيغة تحاكي واجهة الخيارات (Options API) أو واجهة التركيب (Composition API). وهنا نستخدم صيغة واجهة التركيب لتعريف دالة `useNumbersStore()` لإنشاء مخزن `numbers`.

```javascript
import { ref } from "vue";

import { defineStore } from "pinia";

export const useNumbersStore = defineStore("numbers", () => {

const numbers = ref([1, 2, 3]);

function addNumber(newNumber) {

this.numbers.push(newNumber);

}

return { numbers, addNumber };

});
```

في المثال أعلاه، نعرّف مخزنًا يُسمّى `numbers` بحالة أولية تحتوي على خاصية `numbers`. ونعرّف أيضًا إجراءً واحدًا هو `addNumber()` يعدّل حالة `numbers`.

ويمكننا بعد ذلك إنشاء نسخة Pinia وتثبيتها في تطبيق Vue لدينا.

```javascript
import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";

import "./styles.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.mount("#app");
```

في هذه اللحظة، يمكننا استخدام المخزن الذي أنشأناه حديثًا في مكوّناتنا. وفي المكوّن `NumberDisplay`، سنستورد الدالة `useNumbersStore()` من ملف المخزن ونستدعيها للحصول على الوصول إلى نسخة المخزن. ويمكننا بعد ذلك الإشارة إلى قيمة `numbers` في المخزن داخل قالب المكوّن.

```javascript
<template>

<div>

<h2>{{ store.numbers }}</h2>

</div>

</template>

<script setup>

import { useNumbersStore } from "../store";

const store = useNumbersStore();

</script>
```

وفي المكوّن `NumberSubmit`، يمكننا فعل الشيء نفسه كما في الأعلى للوصول إلى طريقة المخزن `addNumber()` التي ستُستخدم لتحديث خاصية `numbers` في المخزن.

```javascript
<template>

<div>

<input v-model="numberInput" type="number" />

<button @click="store.addNumber(numberInput)">Add new number</button>

</div>

</template>

<script setup>

import { ref } from "vue";

import { useNumbersStore } from "../store";

const store = useNumbersStore();

const numberInput = ref(0);

</script>
```

مع هذه التغييرات، سيتصرّف تطبيقنا تمامًا كما كان من قبل.

JavaScript iconstore.js

```javascript
import { defineStore } from "pinia";
  import { ref } from "vue";
  
  export const useNumbersStore = defineStore("numbers", () => {
    const numbers = ref([1, 2, 3]);
  
    function addNumber(newNumber) {
      this.numbers.push(newNumber);
    }
  
    return { numbers, addNumber };
  });
```

[Open CodeSandbox](https://codesandbox.io/embed/state-management-4-3tr5qr)

بالنسبة إلى تطبيق بسيط كتطبيق، قد لا يكون مخزن Pinia ضروريًا حقًا، وسلوكه قريب جدًا من مجرد استخدام مخزن أُنشئ بالدالة `reactive()` ومع ذلك، يقدّم Pinia قدرات إضافية لحالات الاستخدام الأكثر تعقيدًا، مثل القدرة على [توسيع ميزات Pinia عبر الإضافات](https://pinia.vuejs.org/core-concepts/plugins.html)، والحصول على دعم لأدوات المطوّر (devtools)، وامتياز [دعم TypeScript](https://pinia.vuejs.org/core-concepts/state.html#typescript) و[دعم العرض في الخادم](https://pinia.vuejs.org/ssr/nuxt.html) الأكثر ملاءمة.

![Pinia داخل أدوات مطوّر Vue](/images/patterns-dev/vue-state-management-4-pinia_vue_devtools.webp)

## ما هي الطريقة الصحيحة؟

لكل طريقة لإدارة حالة مستوى التطبيق مزاياها وعيوبها.

### مخزن بسيط

- **الإيجابي**: سهل الإنشاء نسبيًا.
- **السلبي**: الحالة وتغيّرات الحالة المحتملة غير معرّفة صراحةً.

### Pinia

- **الإيجابي**: دعم أدوات المطوّر، وإضافات + typescript + دعم العرض في الخادم
- **السلبي**: شيفرة تمهيدية (boilerplate) إضافية.

في النهاية، الأمر يعود إلينا في فهم ما هو مطلوب في تطبيقنا وما قد يكون أفضل نهج.

## مصادر مفيدة

- [الخصائص | توثيق Vue](https://vuejs.org/guide/components/props.html#props)
- [أحداث المكوّنات | توثيق Vue](https://vuejs.org/guide/components/events.html#component-events)
- [إدارة حالة بسيطة عبر واجهة التفاعلية | توثيق Vue](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)
- [المفاهيم الأساسية | Pinia](https://pinia.vuejs.org/core-concepts/)
