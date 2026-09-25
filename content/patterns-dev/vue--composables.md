---
title: دوال التركيب
lang: ar
source: https://www.patterns.dev/vue/composables/
---
## Options API

قبل تقديم Composition API في Vue، كان المطوّرون يعتمدون على **Options API** لتنظيم منطق المكوّنات، والذي يشمل البيانات التفاعلية (reactive data)، ودورات الحياة، والخصائص المحسوبة (computed properties)، وغيرها. سمحت Options API بتعريف هذه الجوانب ضمن خيارات محدّدة، كما هو موضح في المثال أدناه:

```javascript
<!-- Template -->

<script>

export default {

name: "MyComponent",

props: {

// props

},

data() {

// data

},

computed: {

// computed properties

},

watch: {

// properties to watch

},

methods: {

// methods

},

created() {

// lifecyle methods like created

},

// ...

};

</script>

<!-- Styles -->
```

رغم أن هذا النهج يؤدّي غرضه ولا يزال قابلًا للتطبيق في Vue v3، إلا أنه قد يصبح صعب الإدارة والصيانة مع نمو المكوّنات وتعقيدها. فتعريف منطق المكوّن ضمن خيارات محدّدة يجعل قراءة الشيفرة وفهمها أصعب، خصوصًا عند التعامل مع مكوّنات كبيرة. كما يصبح استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات صعبًا في هذا الإعداد.

لننظر إلى مثال بسيط لمكوّن `App` يعرض مكوّنين فرديين تابعين له — `Count` و`Width`.

```javascript
<template>

<div class="App">

<Count :count="count" :increment="increment" :decrement="decrement" />

<div id="divider" />

<Width :width="width" />

</div>

</template>

<script>

import Count from "./components/Count.vue";

import Width from "./components/Width.vue";

export default {

name: "App",

data() {

return {

count: 0,

width: 0,

};

},

mounted() {

this.handleResize();

window.addEventListener("resize", this.handleResize);

},

beforeUnmount() {

window.removeEventListener("resize", this.handleResize);

},

methods: {

increment() {

this.count++;

},

decrement() {

this.count--;

},

handleResize() {

this.width = window.innerWidth;

},

},

components: {

Count,

Width,

},

};

</script>
```

يمثّل مقتطف الشيفرة أعلاه مكوّن Vue أحادي الملف (SFC) باسم `App`.

يحدّد قسم `` ترميز المكوّن (markup). وفي حالتنا هذه، يحتوي على عنصر `` بالتصنيف “App” يلتف بمكوّنين تابعين: `` و``. وتُمرَّر بعض الخصائص إلى هذين المكوّنين التابعين باستخدام صيغة ربط السمات في Vue (`:count` و`:increment` و`:decrement` و`:width`).

يحتوي قسم `` على شيفرة JavaScript الخاصة بالمكوّن. وهو يبدأ باستيراد المكوّنَين `Count` و`Width` من ملفّيهما. وتُستخدم عبارة `export default` لتصدير تعريف المكوّن. وداخل تعريف المكوّن لدينا:

- الدالة `data` التي تُعيد كائنًا يحتوي على خصائص البيانات الأولية للمكوّن، وهي `count` و`width` المهيّأَين إلى 0.
- خطّاف دورة الحياة `mounted()` يُستخدم لتنفيذ الشيفرة بعد أن يكون المكوّن قد ثُبِّت في DOM. وفي هذه الحالة، يستدعي الدالة `handleResize()` ويضيف مستمعًا لحدث تغيير الحجم (resize).
- خطّاف دورة الحياة `beforeUnmount()` يُستخدم لتنفيذ الشيفرة قبل أن يُزال المكوّن ويُدمَّر. وهنا يزيل مستمع الحدث الخاص بتغيير الحجم.
- يحتوي الكائن `methods` على دوال المكوّن. وهو يعرّف الدوال `increment()` و`decrement()` و`handleResize()` التي تتلاعب بخصائص البيانات `count` و`width` استنادًا إلى أحداث أو إجراءات معيّنة.

JavaScript iconApp.vue

```javascript
<template>
  <div class="App">
    <Count :count="count" :increment="increment" :decrement="decrement" />
    <div id="divider" />
    <Width :width="width" />
  </div>
 </template>
 
 <script>
 import Count from "./components/Count.vue";
 import Width from "./components/Width.vue";
 
 export default {
  name: "App",
  data() {
    return {
      count: 0,
      width: 0,
    };
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    handleResize() {
      this.width = window.innerWidth;
    },
  },
  components: {
    Count,
    Width,
  },
 };
 </script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/composables-1-srzc9w)

عند تشغيل التطبيق، يُعرض العدد الحالي والعرض الداخلي للنافذة في الوقت الفعلي. ويمكن للمستخدم التفاعل مع المكوّن عبر زيادة العدد أو إنقاصه باستخدام الأزرار في مكوّن ``.

![دالة تركيب تُدار العدّاد](/images/patterns-dev/vue-composables-0-composables_count.webp)

وبالمثل، يُحدَّث العرض تلقائيًا كلما أُعيد تغيير حجم النافذة.

![توسيع وتصغير عرض النافذة](/images/patterns-dev/vue-composables-1-composables_width.webp)

يمكن تصور بنية مكوّن `App.vue` أحادي الملف على النحو التالي:

![مخطط تدفّق يوضّح الخيارات وOptions API](/images/patterns-dev/vue-composables-2-options_api_breakdown.webp)

رغم أن حجم هذا المكوّن صغير، فإن المنطق بداخله أصبح متشابكًا بالفعل. فبعض الأجزاء مخصّصة لوظيفة العدّاد، بينما تتعلّق أجزاء أخرى بمنطق العرض. ومع نمو المكوّن، يصبح تنظيم المنطق المرتبط داخله والعثور عليه أكثر صعوبة.

لمعالجة هذه التحديات، قدّم فريق Vue واجهة Composition API في Vue v3.

## Composition API

يمكن النظر إلى Composition API على أنها **واجهة برمجية توفّر دوال مستقلة تمثّل القدرات الأساسية لـ Vue**. وتُستخدم هذه الدوال أساسًا داخل خيار `setup()` واحد يعمل كنقطة دخول لاستخدام Composition API.

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

تُنفَّذ الدالة `setup()` قبل إنشاء المكوّن، وحين تكون خصائص المكوّن متاحة.

مع Composition API، يمكننا استيراد دوال مستقلة تساعدنا على الوصول إلى القدرات الأساسية لـ Vue داخل مكوّننا. لنُعِد كتابة مثال العدّاد والعرض الذي رأيناه أعلاه مع الاعتماد على صيغة Composition API.

```javascript
<template>

<div class="App">

<Count :count="count" :increment="increment" :decrement="decrement" />

<div id="divider" />

<Width :width="width" />

</div>

</template>

<script>

import { ref, onMounted, onBeforeUnmount } from "vue";

import Count from "./components/Count.vue";

import Width from "./components/Width.vue";

export default {

name: "App",

setup() {

const count = ref(0);

const width = ref(0);

const increment = () => {

count.value++;

};

const decrement = () => {

count.value--;

};

const handleResize = () => {

width.value = window.innerWidth;

};

onMounted(() => {

handleResize();

window.addEventListener("resize", handleResize);

});

onBeforeUnmount(() => {

window.removeEventListener("resize", handleResize);

});

return {

count,

width,

increment,

decrement,

};

},

components: {

Count,

Width,

},

};

</script>
```

يبقى قسم `` لمكوّننا كما هو، لكن في قسم `` من مكوّننا نستخدم الآن Composition API مع الدالة `setup()`.

داخل الدالة `setup()`، نحن:

- نعرّف المتغيّرين التفاعليَّين `count` و`width` باستخدام الدالة `ref()` — وهي الدالة التي تقبل قيمة أولية واحدة (مثل سلسلة نصية أو رقم وغيرها) وتُعيد كائنًا تفاعليًّا قابلًا للتغيير.
- نعرّف كذلك الدوال المخصّصة `increment()` و`decrement()` و`handleResize()`. وهذه الدوال مشابهة للدوال التي عرّفناها في مثال Options API السابق.
- نستخدم دالة دورة الحياة `onMounted()` لاستدعاء الدالة المخصّصة `handleResize()` وإضافة مستمع لحدث تغيير الحجم عند تركيب المكوّن. وبالمثل، نستخدم دالة دورة الحياة `onBeforeUnmount()` لإزالة مستمع حدث تغيير الحجم قبل إزالة المكوّن.
- تُعاد بعدها المتغيّرات التفاعلية والدوال المعرَّفة في الدالة `setup()`، مما يجعلها متاحة في قالب المكوّن.

JavaScript iconApp.vue

```javascript
<template>
  <div class="App">
    <Count :count="count" :increment="increment" :decrement="decrement" />
    <div id="divider" />
    <Width :width="width" />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Count from "./components/Count.vue";
import Width from "./components/Width.vue";

export default {
  name: "App",
  setup() {
    const count = ref(0);
    const width = ref(0);

const increment = () => {
      count.value++;
    };

const decrement = () => {
      count.value--;
    };

const handleResize = () => {
      width.value = window.innerWidth;
    };

onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });

onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

return {
      count,
      width,
      increment,
      decrement,
    };
  },
  components: {
    Count,
    Width,
  },
};
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/composables-2-0j3l8z)

## دوال التركيب (composables)

مع مثال الشيفرة السابق، قد لا يزال يتساءل أحد كيف تقدّم الدالة `setup()` أي ميزة للتطوير، إذ يبدو أنها ببساطة تطلب إلينا تصريح خيارات المكوّن ضمن دالة واحدة.

من بين الفوائد الرائعة لاعتماد Composition API هي **القدرة على استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات**. ويرجع هذا الأمر إلى أننا نستطيع ببساطة تصريح دوال خاصة بنا تستخدم دوال التركيب (composition functions) المتاحة عالميًا في Vue، ويصبح من الممكن أن تكون دوالنا *سهلة الاستخدام في عدّة مكوّنات لتحقيق النتيجة نفسها*.

لنأخذ مثال العدّاد والعرض السابق خطوة أبعد، بإنشاء دوال تركيب (composables) تُغلّف المنطق المشترك بحيث يمكن إعادة استخدامه عبر المكوّنات.

أولًا، لننشئ دالة تركيب (composable) اسمها `useCounter`، وهي دالة تركيب تُغلّف وظيفة العدّاد وتُعيد القيمة الحالية لـ `count`، إضافة إلى دالة `increment()` ودالة `decrement()`.

> بحكم العرف، تبدأ أسماء دوال التركيب بكلمة المفتاح "use".

```javascript
import { ref } from "vue";

export function useCounter(initialCount = 0) {

const count = ref(initialCount);

function increment() {

count.value++;

}

function decrement() {

count.value--;

}

return {

count,

increment,

decrement,

};

}
```

وبالمثل، يمكننا إنشاء دالة تركيب اسمها `useWidth()` تُغلّف وظيفة العرض في تطبيقنا.

```javascript
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useWidth() {

const width = ref(0);

function handleResize() {

width.value = window.innerWidth;

}

onMounted(() => {

handleResize();

window.addEventListener("resize", handleResize);

});

onBeforeUnmount(() => {

window.removeEventListener("resize", handleResize);

});

return {

width,

};

}
```

في مكوّن `App` لدينا، يمكننا الآن استخدام دوال التركيب لتحقيق النتيجة نفسها:

```javascript
<template>

<div class="App">

<Count :count="count" :increment="increment" :decrement="decrement" />

<div id="divider" />

<Width :width="width" />

</div>

</template>

<script>

import Count from "./components/Count.vue";

import Width from "./components/Width.vue";

import { useCounter } from "./composables/useCounter";

import { useWidth } from "./composables/useWidth";

export default {

name: "App",

components: {

Count,

Width,

},

setup() {

const { count, increment, decrement } = useCounter(0);

const { width } = useWidth();

return {

count,

increment,

decrement,

width,

};

},

};

</script>
```

مع هذه التغييرات، سيعمل تطبيقنا كما كان عليه من قبل، لكن ضمن إعداد أكثر قابلية للتركيب.

JavaScript iconApp.vue

```javascript
<template>
  <div class="App">
    <Count :count="count" :increment="increment" :decrement="decrement" />
    <div id="divider" />
    <Width :width="width" />
  </div>
</template>

<script>
import Count from "./components/Count.vue";
import Width from "./components/Width.vue";
import { useCounter } from "./composables/useCounter";
import { useWidth } from "./composables/useWidth";

export default {
  name: "App",
  components: {
    Count,
    Width,
  },
  setup() {
    const { count, increment, decrement } = useCounter(0);
    const { width } = useWidth();

return {
      count,
      increment,
      decrement,
      width,
    };
  },
};
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/composables-3-zr4q7x)

باستخدام دوال التركيب ضمن إعداد Composition API، تمكّنّا من تفكيك سياق تطبيقنا إلى أجزاء أصغر قابلة لإعادة الاستخدام تفصل المنطق عن بعضها.

لنُصوِّر التغييرات التي أجريناها للتو مقارنةً بمثال المكوّن الأول في Options API.

![مخطط تدفّق لتفكيك دالة التركيب إلى أجزاء](/images/patterns-dev/vue-composables-3-composables_breakdown.webp)

أدى استخدام دوال التركيب في Vue إلى تسهيل فصل منطق مكوّننا إلى عدة أجزاء أصغر. وأصبحت إعادة استخدام المنطق ذي الحالة نفسه سهلة الآن، إذ لم نعد مقيدين بتنظيم شيفرتنا ضمن خيارات محدّدة في Options API.

مع دوال التركيب، لدينا المرونة لاستخراج المنطق المشترك وإعادة استخدامه عبر المكوّنات. وهذا الفصل بين المسؤوليات يتيح لنا التركيز على وظيفة محدّدة داخل كل دالة تركيب، مما يجعل شيفرتنا **أكثر وحداتية وأسهل في الصيانة**.

وبتقسيم المنطق إلى أجزاء أصغر قابلة لإعادة الاستخدام، يمكننا تركيب مكوّناتنا باستخدام دوال التركيب هذه، فتجتمع الوظائف اللازمة دون تكرار الشيفرة. ويشجّع هذا النهج على **إعادة استخدام الشيفرة** ويقلّل خطر ازدواج الشيفرة والتعارضات فيها.

إضافةً إلى ذلك، يوفّر استخدام Composition API **قابلية قراءة** و**فَهْم** أفضل لمنطق المكوّن. فكل دالة تركيب تُغلّف جانبًا محدّدًا من سلوك المكوّن، مما يجعل التفكير فيه واختباره أسهل. كما يتيح تعاونًا أسهل بين أعضاء الفريق، لأن الشيفرة تصبح أكثر تنظيمًا ونظامًا.

وأخيرًا، يتيح بناء تطبيقات Vue باستخدام Composition API **استنتاج الأنواع (type inference)** بشكل أفضل. ولأن Composition API تساعدنا على التعامل مع منطق المكوّن عبر المتغيّرات ودوال JavaScript القياسية، يصبح بناء تطبيقات Vue واسعة النطاق باستخدام نظام أنواع ساكن مثل TypeScript أسهل بكثير!

## مصادر مفيدة

- [دوال التركيب | توثيق Vue](https://vuejs.org/guide/reusability/composables.html)
- [مجموعة من أدوات Utility الخاصة بـ Vue Composition API | VueUse](https://vueuse.org/)
