---
title: نمط مزوّد البيانات
lang: ar
source: https://www.patterns.dev/vue/data-provider/
---
في [مقال](/book/patterns-dev/vue/renderless-components) سابق، تعلّمنا كيف تساعدنا المكوّنات بلا عرض (renderless components) على فصل منطق المكوّن عن عرضه. ويصبح هذا مفيدًا عندما نحتاج إلى إنشاء منطق قابل لإعادة الاستخدام يمكن تطبيقه على تنفيذات واجهة مستخدم (UI) مختلفة.

كما تتيح لنا المكوّنات بلا عرض الاستفادة من نمط مفيد آخر يُعرف بـ**نمط مزوّد البيانات (data provider pattern)**.

## نمط مزوّد البيانات (Data Provider Pattern)

نمط مزوّد البيانات هو نمط تصميم (design pattern) يكمّل نمط المكوّنات بلا عرض في Vue، إذ يركّز على توفير البيانات وقدرات إدارة الحالة للمكوّنات *دون preoccupation بكيفية عرض البيانات أو إظهارها*.

في نمط مزوّد البيانات، يتغلّف مكوّن مزوّد البيانات منطق جلب البيانات وإدارتها وإتاحتها لمكوّناته التابعة. ثم يمكن للمكوّنات التابعة استهلاك هذه البيانات واستخدامها في عرضها أو سلوكها الخاص.

![مخطط نمط مزوّد البيانات](/images/patterns-dev/vue-data-provider-0-data_provider_pattern.webp)

يشجّع هذا النمط على الفصل بين المسؤوليات (separation of concerns)، إذ يتولّى مكوّن مزوّد البيانات المهامّ المتعلقة بالبيانات، بينما يمكن للمكوّنات التابعة التركيز على العرض والتفاعل.

لنوضّح نمط مزوّد البيانات بمثال. تخيّل تطبيقًا بسيطًا يعرض مقدّمة نكتة طريفة يتبعها ردّها الطريف (punchline). وللمساعدة في إظهار نكتات مختلفة عشوائيًا، سنستخدم نقطة نهاية الواجهة البرمجية العامة المجانية [https://official-joke-api.appspot.com/random_joke](https://official-joke-api.appspot.com/random_joke) التي تُعيد نكتة عشوائية بصيغة JSON.

```javascript
# https://official-joke-api.appspot.com/random_joke

{

"type": "general",

"setup": "How good are you at Power Point?",

"punchline": "I Excel at it.",

"id": 129

}
```

سننشئ أولًا مكوّن مزوّد للبيانات اسمه `DataProvider` يتولّى مسؤولية جلب النكتة من الواجهة البرمجية. وفي قسم `` من المكوّن، سنستورد الدالتين `ref()` و`reactive()` من مكتبة Vue، ونسنِد قيمة عنوان نقطة النهاية إلى ثابت، ونضبط خصائص `data` و`loading` التفاعليّتين لالتقاط البيانات وحالة التحميل لطلب الواجهة البرمجية.

```javascript
<script setup>

import { ref, reactive } from "vue";

const API_ENDPOINT_URL = "https://official-joke-api.appspot.com/random_joke";

const data = reactive({

setup: null,

punchline: null,

});

const loading = ref(false);

</script>
```

سننشئ بعد ذلك دالة غير متزامنة (async) اسمها `fetchJoke()` مسؤولة عن جلب نكتة من نقطة نهاية الواجهة البرمجية المحدّدة. وستقوم الدالة بما يلي:

- تبدأ بضبط القيمة التفاعلية `loading` على `true`، ما يشير إلى أن النكتة قيد الجلب.
- تستخدم الدالة الأصلية في المتصفّح [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) لإرسال طلب GET إلى نقطة نهاية الواجهة البرمجية.
- تحوّل الاستجابة من الواجهة البرمجية إلى صيغة JSON باستخدام الدالة `response.json()`.
- تستخرج قيمتَي `setup` و`punchline` من بيانات الطلب التي تمّ الحصول عليها وتسنيدهما إلى الخصائص المقابلة في كائن `data`.
- وأخيرًا، تعيد ضبط القيمة `loading` إلى `false`، ما يشير إلى أنه تمّ جلب النكتة.

مع هذه التغييرات، ستبدو دالتنا `fetchJoke()` على النحو التالي:

```javascript
<script setup>

import { ref, reactive } from "vue";

const API_ENDPOINT_URL = "https://official-joke-api.appspot.com/random_joke";

const data = reactive({

setup: null,

punchline: null,

});

const loading = ref(false);

const fetchJoke = async () => {

loading.value = true;

const response = await fetch(API_ENDPOINT_URL);

const responseData = await response.json();

data.setup = responseData.setup;

data.punchline = responseData.punchline;

loading.value = false;

};

fetchJoke();

</script>
```

لاحظ أننا نستدعي الدالة `fetchJoke()` في نهاية قسم ``؟ هذا يضمن جلب النكتة فور عرض مكوّن `DataProvider`.

آخر ما تبقّى علينا فعله هو جعل الخصائص `data` و`loading` متاحة في المستهلك (المكوّن الذي يستهلك) لمكوّن `DataProvider`. وللقيام بذلك، يمكننا تمرير هذه الخصائص إلى عنصر `` سنضعه في قسم ``.

```javascript
<template>

<slot :checkbox="checkbox" :toggleCheckbox="toggleCheckbox"></slot>

</template>

<script setup>

import { ref, reactive } from "vue";

const API_ENDPOINT_URL = "https://official-joke-api.appspot.com/random_joke";

const data = reactive({

setup: null,

punchline: null,

});

const loading = ref(false);

const fetchJoke = async () => {

loading.value = true;

const response = await fetch(API_ENDPOINT_URL);

const responseData = await response.json();

data.setup = responseData.setup;

data.punchline = responseData.punchline;

loading.value = false;

};

fetchJoke();

</script>
```

مع اكتمال مكوّن مزوّد البيانات بلا عرض، يمكننا الآن استخدامه في تطبيقنا. وفي مكوّن التطبيق الأب، سنستورد مكوّن `DataProvider` ونضعه داخل القالب.

```javascript
<template>

<DataProvider v-slot="{ data, loading }">

<!-- ... -->

</DataProvider>

</template>

<script setup>

import DataProvider from "./components/DataProvider.vue";

</script>
```

بمجرد عرض مكوّن ``، فإننا نُجري طلبًا إلى نقطة النهاية لجلب نكتة، ويمكننا الوصول إلى قيمتَي `data` و`loading` الخاصتين بالطلب بفضل التوجيه `v-slot`.

داخل تصريح المكوّن ``، يمكننا إنشاء واجهة المستخدم التي تعرض رسالة تحميل إذا كان الطلب في حالة التحميل، أو تعرض مقدّمة النكتة وردّها الطريف عندما تكون البيانات متاحة.

```javascript
<template>

<DataProvider v-slot="{ data, loading }">

<div class="joke-section">

<p v-if="loading">Joke is loading...</p>

<p v-if="!loading">{{ data.setup }}</p>

<p v-if="!loading">{{ data.punchline }}</p>

</div>

</DataProvider>

</template>

<script setup>

import DataProvider from "./components/DataProvider.vue";

</script>
```

عند حفظ تغييراتنا، ستظهر لنا رسالة تحميل قصيرة يتبعها نكتة عشوائية.

![مثال تطبيقي لمزوّد البيانات](/images/patterns-dev/vue-data-provider-1-data_provider_example.webp)

وإذا احتجنا عرض نسخة أخرى من مقدّمة النكتة وردّها، ربما حتى بقالب مختلف، يمكننا ببساطة إعادة استخدام مكوّن `` وإنشاء العناصر الفرعية الجديدة التي نرغب في إظهارها.

```javascript
<template>

<DataProvider v-slot="{ data, loading }">

<div class="joke-section">

<p v-if="loading">Joke is loading...</p>

<p v-if="!loading">{{ data.setup }}</p>

<p v-if="!loading">{{ data.punchline }}</p>

</div>

</DataProvider>

<DataProvider v-slot="{ data, loading }">

<p v-if="loading">Hold on one sec...</p>

<div v-else class="joke-section">

<details>

<summary>{{ data.setup }}</summary>

<p>{{ data.punchline }}</p>

</details>

</div>

</DataProvider>

</template>

<script setup>

import DataProvider from "./components/DataProvider.vue";

</script>
```

في واجهة المستخدم التي عرضناها للتو، نضع الآن ردّ النكتة الطريف داخل عنصر كشف (disclosure element) بفضل عنصري HTML `` و``.

![مثال تطبيقي آخر لمزوّد البيانات](/images/patterns-dev/vue-data-provider-2-data_provider_example_2.webp)

مع نمط مزوّد البيانات، أصبح بإمكاننا إدارة البيانات وتوفيرها لعناصر/مكوّنات مختلفة بطريقة مفكوكة (decoupled) وقابلة لإعادة الاستخدام. وبتجريد منطق جلب الواجهة البرمجية في مكوّن بلا عرض، يمكننا إعادة استخدام طلب بيانات الواجهة البرمجية في سياقات مختلفة دون تكرار الشيفرة.

JavaScript iconDataProvider.vue

```javascript
<template>
  <slot :data="data" :loading="loading"></slot>
</template>

<script setup>
import { ref, reactive } from "vue";

const API_ENDPOINT_URL = "https://official-joke-api.appspot.com/random_joke";

const data = reactive({
  setup: null,
  punchline: null,
});
const loading = ref(false);

const fetchJoke = async () => {
  loading.value = true;

const response = await fetch(API_ENDPOINT_URL);
  const responseData = await response.json();

data.setup = responseData.setup;
  data.punchline = responseData.punchline;
  loading.value = false;
};

fetchJoke();
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/data-provider-1-5s36xn)

## هل يمكننا استخدام دوال التركيب (Composables) بدلًا من ذلك؟

نعم! بدلًا من استخدام نمط مزوّد البيانات، يمكننا ببساطة الاستفادة من دوال التركيب (composables) لاستخراج منطق الجلب إلى دالة قابلة لإعادة الاستخدام.

```javascript
import { ref, reactive } from "vue";

const API_ENDPOINT_URL = "https://official-joke-api.appspot.com/random_joke";

export function useGetJoke() {

const data = reactive({

setup: null,

punchline: null,

});

const loading = ref(false);

const fetchJoke = async () => {

loading.value = true;

const response = await fetch(API_ENDPOINT_URL);

const responseData = await response.json();

data.setup = responseData.setup;

data.punchline = responseData.punchline;

loading.value = false;

};

fetchJoke();

return { data, loading };

}
```

في نسخ المكوّنات لدينا، يمكننا عندها استيراد دالة التركيب واستخدامها للحصول على بيانات `data` وحالة `loading` لطلب معيّن.

```javascript
<template>

<div class="joke-section">

<p v-if="loading">Joke is loading...</p>

<p v-if="!loading">{{ data.setup }}</p>

<p v-if="!loading">{{ data.punchline }}</p>

</div>

</template>

<script setup>

import { useGetJoke } from "./composables/useGetJoke";

const { data, loading } = useGetJoke();

</script>
```

سيتصرّف تطبيقنا الآن تمامًا كما كان قبله مع مثال مزوّد البيانات الخاص بنا.

JavaScript iconApp.vue

```javascript
<template>
  <div class="joke-section">
    <p v-if="loading">Joke is loading...</p>
    <p v-if="!loading">{{ data.setup }}</p>
    <p v-if="!loading">{{ data.punchline }}</p>
  </div>
</template>

<script setup>
import { useGetJoke } from "./composables/useGetJoke";

const { data, loading } = useGetJoke();
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/data-provider-2-s3r847)

يساعد نمط مزوّد البيانات على فصل منطق المكوّن عن عرضه،eby جعل المكوّن الأب يتولّى عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاحَين من المكوّن بلا عرض. لكن مع القدرة على إنشاء دوال تركيب قابلة لإعادة الاستخدام في Vue 3، يمكن استخدام دوال التركيب بالمثل في أغلب الحالات التي يمكن أن يُستخدم فيها نمط مزوّد البيانات.

وعند المفاضلة بين استخدام نمط مزوّد البيانات أو استخدام دوال التركيب بدلًا منه، نوصي باستخدام دوال التركيب كلما أمكن، لأن ذلك يتجنّب الحاجة إلى عرض نسخة من المكوّن في كل مرة يجب فيها جلب البيانات (وهذا قد يسبب [عبء أداء (performance overhead)](https://vuejs.org/guide/reusability/composables.html#vs-renderless-components)).

إضافةً إلى ذلك، إذا كنت تستخدم أداة إدارة حالة مثل [Pinia](https://pinia.vuejs.org/) لإدارة كيفية توفير البيانات للمكوّنات، فمن المرجّح أن تكون طلبات الواجهة البرمجية لديك موجودة في [actions()](https://pinia.vuejs.org/core-concepts/actions.html#actions) الخاصة بمخزنك (store). ومع وجود نمط إدارة الحالة هذا بالفعل، تصبح الحاجة إلى استخدام نمط مكوّن مزوّد البيانات أقل أهمية.

## مصادر مفيدة

- [المكوّنات بلا عرض | توثيق Vue](https://vuejs.org/guide/components/slots.html#scoped-slots)
