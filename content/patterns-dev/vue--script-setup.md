---
title: إعداد السكربت
lang: ar
source: https://www.patterns.dev/vue/script-setup/
---
قبل أن نتعمق في صيغة `` الخاصة بإعداد السكربت (script setup) وما هي، لنراجع بسرعة مفهومين — **المكوّنات أحادية الملف (single-file components)** و**Composition API**.

في Vue، تساعد SFCs على ربط المنطق عن طريق تمكيننا من تحديد HTML/CSS وJS للمكوّن داخل ملف **`.vue`** واحد. يتكون المكوّن أحادي الملف من ثلاثة أجزاء:

```javascript
<template>

<!-- HTML template goes here -->

</template>

<script>

// JavaScript logic goes here

</script>

<style>

/* CSS styles go here */

</style>
```

يحتوي `` على ترميز المكوّن بصيغة HTML خالصة، ويصدّر `` كائن المكوّن الذي يتكون من كل منطق JS داخله، ويحتوي `` على جميع أنماط المكوّن.

توفر Composition API دوال مستقلة تمثل القدرات الأساسية لـ Vue. تُستخدم هذه الدوال في المقام الأول داخل خيار `setup()` واحد، الذي يعمل كنقطة دخول لاستخدام Composition API.

```javascript
<!-- Template -->

<script>

export default {

name: "MyComponent",

setup() {

// the setup function

},

};

</script>

<!-- Styles -->
```

> تأكد من قراءة دليل [الدوال القابلة للتركيب (composables)](/book/patterns-dev/vue/composables) للاطلاع بمزيد من التفصيل على المزايا التي توفرها Composition API مقارنة بصيغة Options API التقليدية.

## `` — إعداد السكربت (script setup)

`` هو اختصار نحوي في وقت الترجمة يتيح صيغة أكثر إيجازًا وكفاءة عند تعريف خيارات Vue باستخدام Composition API. ووفقًا لتوثيق Vue، فإن هذه هي الصيغة الموصى بها إذا [استخدمتَ SFCs وComposition API معًا](https://vuejs.org/api/sfc-script-setup.html).

باستخدام كتلة ``، يمكننا ضغط منطق المكوّن في كتلة واحدة، مما يلغي الحاجة إلى دالة `setup()` صريحة. لاستخدام صيغة ``، يكفي أن نضيف السمة `setup` إلى كتلة ``.

```javascript
<script setup>

// ...

</script>
```

لنتستكشف بعض الاختلافات الرئيسية في الصيغة التي توفرها ``.

### لا توجد عبارة return

مع صيغة ``، لم نعد بحاجة إلى تعريف عبارة `return` في نهاية الكتلة. فالارتباطات المعلنة في المستوى الأعلى (الدوال والمتغيرات والاستيرادات وما إلى ذلك) تكون متاحة ويمكن استخدامها مباشرةً في القالب.

#### قبل

```javascript
<template>

<div>

<p>Count: {{ count }}</p>

<p>Username: {{ state.username }}</p>

<button @click="increment">Increment Count</button>

</div>

</template>

<script>

import { ref, reactive, onMounted } from "vue";

setup() {

const count = ref(0);

const state = reactive({username: "John"});

const increment = () => {

count.value++;

};

onMounted(() => {

console.log("Component mounted");

});

return {

count,

state,

increment

};

},

</script>
```

#### بعد

```javascript
<template>

<div>

<p>Count: {{ count }}</p>

<p>Username: {{ state.username }}</p>

<button @click="increment">Increment Count</button>

</div>

</template>

<script setup>

import { ref, reactive, onMounted } from "vue";

const count = ref(0);

const state = reactive({ username: "John" });

const increment = () => {

count.value++;

};

onMounted(() => {

console.log("Component mounted");

});

</script>
```

### لا توجد مكوّنات مسجلة محليًا

يتم التعرف على استيرادات المكوّنات وحلّها تلقائيًا داخل كتلة `` من دون الحاجة إلى 선언 المكوّن صراحةً ضمن خيار `components`.

#### قبل

```javascript
<template>

<ButtonComponent />

</template>

<script>

import ButtonComponent from "./components/ButtonComponent.vue";

export default {

setup() {

// the setup function

},

components: {

ButtonComponent,

},

};

</script>
```

#### بعد

```javascript
<template>

<ButtonComponent />

</template>

<script setup>

import { ButtonComponent } from "./components/Button";

</script>
```

### `defineProps()`

يمكن الوصول إلى الخصائص (`props`) مباشرةً داخل كتلة `` باستخدام دالة `defineProps()`.

#### قبل

```javascript
<template>

<button>{{ buttonText }}</button>

</template>

<script>

export default {

props: {

buttonText: String,

},

};

</script>
```

#### بعد

```javascript
<template>

<button>{{ buttonText }}</button>

</template>

<script setup>

const { buttonText } = defineProps({

buttonText: String,

});

</script>
```

تتيح `defineProps()` أيضًا الإعلان عن شكل الخصائص باستخدام TypeScript خالصًا.

```javascript
<template>

<button>{{ buttonText }}</button>

</template>

<script setup lang="ts">

const { buttonText } = defineProps<{ buttonText: string }>();

</script>
```

لتقديم قيم افتراضية للخصائص في الإعلان الذي يعتمد على النوع فقط أعلاه، يمكننا استخدام ماكرو المُجمِّع `withDefaults()` لتحقيق ذلك.

```javascript
<template>

<button>{{ buttonText }}</button>

</template>

<script setup lang="ts">

const { buttonText } = withDefaults(defineProps<{ buttonText: string }>(), {

buttonText: "Initial button text",

});

</script>
```

`defineProps` متاح فقط في `` ويمكن استخدامه من دون الحاجة إلى استيراده.

### `defineEmits()`

مثل الخصائص، يمكن إحداث (emit) الأحداث المخصصة مباشرةً داخل كتلة `` باستخدام دالة `defineEmits()` في المكوّن.

#### قبل

```javascript
<template>

<button @click="closeButton">Button Text</button>

</template>

<script>

export default {

emits: ["close"],

setup(props, { emit }) {

const closeButton = () => emit("close");

return {

closeButton,

};

},

};

</script>
```

#### بعد

```javascript
<template>

<button @click="closeButton">Button Text</button>

</template>

<script setup>

const emit = defineEmits(["close"]);

const closeButton = () => emit("close");

</script>
```

مثل `defineProps`، فإن `defineEmits` كلمة خاصة متاحة فقط في `` ويمكن استخدامها أيضًا من دون الحاجة إلى استيرادها. كما تتيح لنا تمرير الأنواع مباشرةً عند العمل ضمن إعداد TypeScript.

```javascript
<template>

<button @click="closeButton">Button Text</button>

</template>

<script setup lang="ts">

const emit = defineEmits<{ (e: "close"): void }>(["close"]);

const closeButton = () => emit("close");

</script>
```

## `` مقابل `setup()`

في المكوّنات الأكبر التي تحتوي على عدد كبير من الخيارات المُعادة ومكوّنات فرعية مسجلة محليًا، تساعد صيغة `` على إزالة الكثير من شيفرة التكرار، مما يؤدي إلى تعريفات أنظف وأكثر تركيزًا للمكوّنات، ويساعد لاحقًا على جعل الشيفرة أكثر قابلية للقراءة والصيانة.

![مخطط يوضّح استخدام script setup](/images/patterns-dev/vue-script-setup-0-script_setup_breakdown.webp)

إلى جانب تقليل شيفرة التكرار، توفر صيغة `` أيضًا أداءً (performance) أفضل وقت التشغيل، وأداءً أفضل لاستنتاج الأنواع في IDE، والقدرة على إعلان شكل الخصائص والأحداث المُحدَّثة باستخدام TypeScript.

للاطلاع على القائمة الكاملة للتغييرات التي يجب وضعها في الاعتبار عند العمل مع صيغة ``، راجع توثيق Vue الرسمي أدناه.

## موارد مفيدة

- [`` — إعداد السكربت (script setup) | توثيق Vue](https://vuejs.org/api/sfc-script-setup.html)
