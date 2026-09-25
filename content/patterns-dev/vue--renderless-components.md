---
title: المكوّنات بلا عرض
lang: ar
source: https://www.patterns.dev/vue/renderless-components/
---
المكوّنات بلا عرض (renderless components) هي نمط في Vue **يفصل منطق المكوّن عن عرضه التقديمي**. ويوفّر هذا النمط طريقة لتغليف الوظائف دون *فرض التمثيل البصري للمكوّن*. وبعبارة أخرى، يركّز المكوّن بلا عرض على المنطق والسلوك فقط، ويترك عملية العرض إلى المكوّن الأصل.

تُعدّ المكوّنات بلا عرض مفيدة بشكل خاص عندما نحتاج إلى إنشاء منطق قابل لإعادة الاستخدام يمكن تطبيقه على تطبيقات واجهة مستخدم مختلفة. فمن خلال استخراج المنطق في مكوّن بلا عرض، يمكننا إعادة استخدامه بسهولة في سياقات مختلفة دون تكرار الشيفرة. وإذا كنت لا تزال مشتبكًا في هذه المرحلة، فلا تقلق! لنتعمّق أكثر في هذا المفهوم من خلال مثال.

## تبديل، تبديل، تبديل

تخيّل أن لديك عنصر واجهة تبديل (toggle) يحتاج إلى الاستخدام في أجزاء مختلفة من تطبيقك، لكن قد تكون لكل نسخة تمثيل بصري مختلف. فبعض مفاتيح التبديل قد تُعرض كأزرار، بينما قد تكون أخرى مربّعات اختيار أو مفاتيح تحويل.

![مكوّنات بلا عرض بأزرار تبديل](/images/patterns-dev/vue-renderless-components-0-renderless_toggles.webp)

يمكننا ببساطة إنشاء ثلاثة مكوّنات تبديل مختلفة للمثال أعلاه، لكننا نلاحظ أن كل عنصر تبديل يتشارك المنطق والسلوك نفسه. ولكل مفتاح تبديل حالة خاملة وأخرى نشطة تُتابَع عبر خاصية بيانات في المكوّن (مثل `checked`). وعندما يُنقر على مفتاح التبديل، تنتقل حالة المكوّن من الخاملة إلى النشطة والعكس (أي `checked = !checked`).

إليك صورة توضّح كيف يُبنى القسمان `` و`` في كل مكوّن:

![الشكل البصري لأزرار التبديل في المكوّنات بلا عرض](/images/patterns-dev/vue-renderless-components-1-renderless_toggles_visual.webp)

نرى فورًا أننا يمكننا إنشاء نمط أكثر قابلية لإعادة الاستخدام عبر استخراج المنطق والسلوك المشتركين بحيث لا نضطر إلى تعريف الحالة وطرق التبديل مرارًا وتكرارًا في كل مكوّن تبديل على حدة. وهذه حالة ممتازة لاستخدام [الدوال المركّبة (composables)](/book/patterns-dev/vue/composables)، إذ تتيح لنا هذه الدوال تغليف المنطق ذي الحالة المشترك ومشاركته عبر مكوّنات التبديل المختلفة.

**useCheckboxToggle**:

```javascript
import { ref } from "vue";

export function useCheckboxToggle() {

const checkbox = ref(false);

const toggleCheckbox = () => {

checkbox.value = !checkbox.value;

};

return {

checkbox,

toggleCheckbox,

};

}
```

**مكوّن تبديل**:

```javascript
<template>

<div class="comp">

<label class="switch">

<input type="checkbox" :value="checkbox" @click="toggleCheckbox" />

<div class="slider rounded" :class="checkbox ? 'active' : ''"></div>

</label>

</div>

</template>

<script setup>

import { useCheckboxToggle } from "./composables/useCheckboxToggle";

const { checkbox, toggleCheckbox } = useCheckboxToggle();

</script>
```

ورغم أن ما سبق يعمل جيّدًا جدًا لحالة الاستخدام لدينا، فإن Vue يقدّم لنا نمطًا آخر يوضّح كيف يمكننا إعادة استخدام منطق ذي حالة مع إبقائه منفصلًا عن العرض.

## المكوّنات بلا عرض

الفكرة الأساسية وراء المكوّنات بلا عرض هي إنشاء مكوّن لا يعرض أي HTML أو عناصر واجهة مستخدم بنفسه، بل يعرض حالته الداخلية وطرقه إلى المكوّن الأصل. ثم يتولّى المكوّن الأصل مهمة عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاح من المكوّن بلا عرض.

أما القدرة على جعل المكوّن الأصل يقرّر ما ينبغي عرضه فهي ممكنة بفضل المفهوم المعروف بـ **الفتحات (slots)**.

تتيح الفتحات للمكوّن الأصل حقن محتوى القالب في مكوّن فرعي، ويمكن اعتبارها أشبه بالخصائص (props)، لكن بدلًا من تمرير قيم JavaScript إلى الأسفل، فإنها تسمح بتمرير أجزاء من القالب إلى المكوّنات الفرعية.

لنبدأ بإنشاء مكوّن التبديل بلا عرض لدينا. وفي قسم `` من المكوّن، ستحتوي المنطق ذي الحالة المسؤول عن تبديل قيمة حالة `checkbox`.

```javascript
<script setup>

import { ref } from "vue";

const checkbox = ref(false);

const toggleCheckbox = () => {

checkbox.value = !checkbox.value;

};

</script>
```

وفي قسم `` من المكوّن، سنستخدم عنصر `` الخاص لنقرّر أن هذا هو المكان الذي سيوضع فيه محتوى القالب الذي يوفّره المكوّن الأصل.

```javascript
<template>

<slot></slot>

</template>

<script setup>

import { ref } from "vue";

const checkbox = ref(false);

const toggleCheckbox = () => {

checkbox.value = !checkbox.value;

};

</script>
```

سنحتاج إلى إتاحة الخصائص `checkbox` و`toggleCheckbox()` في المكوّن الأصل عندما نصرّح بالقالب الذي نريد عرضه في المكوّن الفرعي. ولتحقيق ذلك، يمكننا تمرير هاتين الخاصيتين إلى مخرج `` تمامًا كما نمرّر الخصائص إلى مكوّن.

```javascript
<template>

<slot :checkbox="checkbox" :toggleCheckbox="toggleCheckbox"></slot>

</template>

<script setup>

import { ref } from "vue";

const checkbox = ref(false);

const toggleCheckbox = () => {

checkbox.value = !checkbox.value;

};

</script>
```

في المكوّن الأصل، يمكننا الآن الإشارة إلى السمتين `checkbox` و`toggleCheckbox()` بينما نقرّر كيف نريد أن يُعرض المكوّن الفرعي.

لاحظ كيف أن المكوّن الذي أنشأناه لا يملك قالبًا خاصًا به؟ هذا بالضبط ما يجعله **مكوّنًا بلا عرض** — مكوّنًا يركّز على المنطق والسلوك فقط، ويترك العرض إلى المكوّن الأصل.

في المكوّن الأصل، سنحاول الآن عرض ثلاثة عناصر تبديل مختلفة، لكل منها تجربة مستخدم فريدة خاصة به. سنبدأ أولًا باستيراد المكوّن `ToggleComponent` بلا عرض الذي أنشأناه أعلاه.

```javascript
<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

الآن يمكننا محاولة عرض `` وأي ما نضعه داخل العناصر الفرعية للمكوّن سيكون هو محتوى فتحة القالب المُعرَض.

```javascript
<template>

<ToggleComponent>

<!-- slot content -->

<!-- (i.e. what gets rendered as the ToggleComponent template) -->

</ToggleComponent>

</template>

<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

وحين نعرض محتوى فتحة المكوّن، سنحتاج إلى الوصول إلى الخصائص الموجودة في نطاق المكوّن الفرعي (`checkbox` و`toggleCheckbox()`). ولأننا مرّرنا هاتين السمتين إلى مخرج الفتحة (``) في وقت سابق، يمكننا استخدام التوجيه `v-slot` لاستلام خصائص الفتحة هذه.

```javascript
<template>

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<!-- slot content -->

<!-- (i.e. what gets rendered as the ToggleComponent template) -->

</ToggleComponent>

</template>

<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

بعد أن صارت خصائص الفتحة ذات الصلة متاحة لنا، يمكننا الآن عرض عنصر التبديل الأول. وسيكون هذا العنصر مفتاح تحويل (switch) ينتقل من الحالة الخاملة إلى الحالة النشطة اعتمادًا على قيمة الخاصية `checkbox`.

```javascript
<template>

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<label class="switch">

<input type="checkbox" :value="checkbox" @click="toggleCheckbox" />

<div class="slider rounded" :class="checkbox ? 'active' : ''"></div>

</label>

</div>

</ToggleComponent>

</template>

<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

عند حفظ تغييراتنا، سيُعرض لنا مفتاح التحويل في تطبيقنا.

![عنصر التبديل النهائي](/images/patterns-dev/vue-renderless-components-2-toggle_element_1.webp)

و يمكننا المضي قدمًا وإنشاء عنصرَي التبديل الآخرين بطريقة متشابهة جدًا. وسيكون عنصر التبديل الثاني زرًّا، وإذا ما النُقر عليه، يتناوب بين النص `Toggle | Yes 😀` والنص `Toggle | No 😔`.

```javascript
<template>

<!-- Toggle element 1 -->

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<label class="switch">

<input type="checkbox" :value="checkbox" @click="toggleCheckbox" />

<div class="slider rounded" :class="checkbox ? 'active' : ''"></div>

</label>

</div>

</ToggleComponent>

<!-- Toggle element 2 -->

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<button class="toggle-button" @click="toggleCheckbox">

Toggle | <span>{{ checkbox ? "Yes 😀" : "No 😔" }}</span>

</button>

</div>

</ToggleComponent>

</template>

<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

وأخيرًا، سيكون عنصر التبديل الثالث زرَّي تبويب، وعند النقر على أيٍّ منهما تتبدّل الحالة النشطة للزرّين معًا.

```javascript
<template>

<!-- Toggle element 1 -->

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<label class="switch">

<input type="checkbox" :value="checkbox" @click="toggleCheckbox" />

<div class="slider rounded" :class="checkbox ? 'active' : ''"></div>

</label>

</div>

</ToggleComponent>

<!-- Toggle element 2 -->

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<button class="toggle-button" @click="toggleCheckbox">

Toggle | <span>{{ checkbox ? "Yes 😀" : "No 😔" }}</span>

</button>

</div>

</ToggleComponent>

<!-- Toggle element 3 -->

<ToggleComponent v-slot="{ checkbox, toggleCheckbox }">

<div class="comp">

<button

:class="['tab-button', { active: checkbox }]"

@click="toggleCheckbox"

>

On

</button>

<button

:class="['tab-button', { active: !checkbox }]"

@click="toggleCheckbox"

>

Off

</button>

</div>

</ToggleComponent>

</template>

<script setup>

import ToggleComponent from "./components/ToggleComponent";

</script>
```

بعد حفظ هذه التغييرات، سيُعرض لنا عناصر التبديل الثلاثة التي تبدو مختلفة لكنها تشترك في المنطق الأساسي نفسه.

JavaScript iconToggleComponent.vue

```javascript
<template>
  <slot :checkbox="checkbox" :toggleCheckbox="toggleCheckbox"></slot>
</template>

<script setup>
import { ref } from "vue";

const checkbox = ref(false);

/* eslint-disable-next-line no-unused-vars */
const toggleCheckbox = () => {
  checkbox.value = !checkbox.value;
};
</script>
```

[Open CodeSandbox](https://codesandbox.io/embed/renderless-components-1-99h8zq)

## الدوال المركّبة في مقابل المكوّنات بلا عرض

الدوال المركّبة (composables) والمكوّنات بلا عرض هما نمطان في Vue يقدّمان منهجيتين مختلفتين لتغليف المنطق وإعادة استخدامه.

لقد رأينا في [مقالنا السابق](/book/patterns-dev/vue/composables) أن الدوال المركّبة تتكوّن عادةً من دوال تُعيد بيانات وتفاعلية (reactive) وطرقًا، يمكن استيرادها واستخدامها في مكوّنات مختلفة. ومن جهة أخرى فإن المكوّنات بلا عرض تركّز على فصل منطق المكوّن عن عرضه التقديمي، عبر جعل المكوّن الأصل يتولّى عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاح من المكوّن بلا عرض.

يوصي [توثيق Vue](https://vuejs.org/guide/reusability/composables.html#vs-renderless-components) باستخدام الدوال المركّبة كلما أمكن ذلك، لأن نمط المكوّن بلا عرض قد يترتّب عليه أحيانًا عبء أداء بسبب عدد نسخ المكوّنات الإضافية التي يتم إنشاؤها. لكن المكوّنات بلا عرض قد تكون مفيدة أحيانًا في المواقف التي نحتاج فيها إلى تحكّم دقيق في العرض و/أو نحتاج إلى إعادة استخدام كلٍّ من المنطق والتخطيط البصري.

## مصادر مفيدة

- [الفتحات | توثيق Vue](https://vuejs.org/guide/components/slots.html#slots)
- [المكوّنات بلا عرض | توثيق Vue](https://vuejs.org/guide/components/slots.html#scoped-slots)
