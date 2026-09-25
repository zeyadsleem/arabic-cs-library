---
title: المكوّنات الديناميكية
lang: ar
source: https://www.patterns.dev/vue/dynamic-components/
---

تمثّل المكوّنات الديناميكية (dynamic components) القدرة على تغيير (أي التبديل بين) المكوّنات ديناميكيًا عبر ربط سمة `is` بالعنصر المحجوز ``.

سنمرّ على مثال لفهم كيفية عمل المكوّنات الديناميكية على أفضل وجه. لنفترض لدينا مكوّنات منفصلة بعنوان `Home` و`Feed` و`History` تعرض ببساطة نصًا يوضّح أي مكوّن هي.

```
<!-- Home -->
<template><div class="tab">Home component</div></template>

<!-- Feed -->
<template><div class="tab">Feed component</div></template>

<!-- History -->
<template><div class="tab">History component</div></template>
```

هدفنا هو بناء واجهة تعرض قائمة من علامات التبويب (tabs) يمكن النقر عليها. وبحسب علامة التبويب التي يتم النقر عليها، نريد عرض مكوّن معيّن ديناميكيًا.

عند التنقّل بين علامات التبويب، نريد أن يتم فكّ تركيب المكوّنات وتركيبها ديناميكيًا دون استخدام التوجيه (routing). ورغم أن تأمين شيء كهذا ممكن عبر عرض قوالب فرعية بشكل مشروط بمساعدة توجيهات مثل [`v-if` و`v-else`](https://vuejs.org/guide/essentials/conditional.html)، فإنها حالة مثالية لاستخدام المكوّنات الديناميكية في Vue.

في مكوّن `App` الأب الخاص بتطبيقنا، يمكننا أولًا استيراد المكوّنات الثلاثة منفردة لتكون متاحة في القالب. وسننشئ أيضًا خاصية تفاعلية باسم `currentTab` تُسنِد إليها قيمة أولية وهي `"Home"`.

```
<script setup>
  import { ref } from "vue";
  import Home from "./components/Home.vue";
  import Feed from "./components/Feed.vue";
  import History from "./components/History.vue";

  const currentTab = ref("Home");
  const tabs = {
    Home,
    Feed,
    History,
  };
</script>
```

لاحظ أن كائن `tabs` لدينا يُشير إلى تعريفات المكوّنات الفعلية وليس إلى أسماء المكوّنات فقط.

في قالب مكوّن `App`، سنرغب في عرض ثلاثة أزرار تبويب منفصلة — واحد لكل مكوّن نعتزم عرضه. وسنستخدم [التوجيه `v-for`](https://vuejs.org/api/built-in-directives.html#v-for) للمساعدة في تحقيق ذلك. سنمرّ عبر قائمة `tabs` ونعرض قائمة من عناصر ``. ولكل عنصر `` يُعرض، سنربط قيمة علامة التبويب بسمة `key` في العنصر، ونعرض ديناميكيًا التصنيف `.active` إذا كانت علامة التبويب محدّدة/نشطة، ونضع معالج نقر (click handler) لتحديث قيمة المكوّن `currentTab` عند تحديد علامة التبويب.

```
<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import Home from "./components/Home.vue";
  import Feed from "./components/Feed.vue";
  import History from "./components/History.vue";

  const currentTab = ref("Home");
  const tabs = {
    Home,
    Feed,
    History,
  };
</script>
```

مع هذه التغييرات، ستظهر لنا ثلاثة أزرار تبويب في الوقت الحالي.

لعرض مكوّن فرعي معيّن ديناميكيًا، سنربط سمة `is` بالعنصر المحجوز ``. وينبغي أن تطابق القيمة المُسنَدة إلى السمة `is` المكوّن الفرعي الذي نريد عرضه ديناميكيًا. وفي حالتنا، سنستخدم خاصية البيانات `currentTab` لتحديد المكوّن الفرعي المختار في لحظة معيّنة.

```
<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import Home from "./components/Home.vue";
  import Feed from "./components/Feed.vue";
  import History from "./components/History.vue";

  // eslint-disable-next-line no-unused-vars
  const currentTab = ref("Home");

  // eslint-disable-next-line no-unused-vars
  const tabs = {
    Home,
    Feed,
    History,
  };
</script>
```

مع وضع العنصر الديناميكي `` في قالبنا، سنلاحظ أن المكوّنات الفرعية يتم الآن فكّ تركيبها وتركيبها ديناميكيًا بحسب علامة التبويب التي تمّ اختيارها.

JavaScript iconApp.vue

```
<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="[&#x27;tab-button&#x27;, { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>


<script setup>
import { ref } from "vue";
import Home from "./components/Home.vue";
import Feed from "./components/Feed.vue";
import History from "./components/History.vue";


const currentTab = ref("Home");
const tabs = {
  Home,
  Feed,
  History,
};
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/dynamic-components-1-7qlvhk)

## الحفاظ على الحالة (state)

قد يكون الحفاظ على الحالة اعتبارًا مهمًا ينبغي الإبقاء عليه في الاعتبار عند استخدام المكوّنات الديناميكية. وبالافتراضي، عند فكّ تركيب المكوّن تُفقد حالته. لكن Vue توفّر طريقة للحفاظ على حالة المكوّنات الديناميكية باستخدام مكوّن ``.

للحفاظ على حالة المكوّنات الديناميكية، يمكننا تغليف العنصر `` بمكوّن `<KeepAlive`>.

```
<template>
  <div class="demo">
    <!--  -->
    <KeepAlive>
      <component :is="tabs[currentTab]" class="tab"></component>
    </KeepAlive>
  </div>
</template>

<script setup>
  // ...
</script>
```

مع تغليف مكوّن `` للعنصر ``، ستُحفظ حالة المكوّنات الديناميكية عند فكّ تركيبها. وهذا يعني أن أيّ بيانات أو حالة للمكوّن ستبقى محفوظة، وسيحتفظ المكوّن بحالته السابقة عند تركيبه مرة أخرى.

ولرؤية مثال على ذلك، يمكننا تحديث كل مكوّن من مكوّناتنا الفرعية ليحتوي على عدّاد بسيط تتم زيادته.

```
<!-- Repeat this counter example for Home, Feed, and History -->
<template>
  <div class="tab">
    Home component
    <p>Counter: {{ counter }}</p>
    <button @click="incrementCounter">Increment</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const counter = ref(0);

  // eslint-disable-next-line no-unused-vars
  const incrementCounter = () => {
    counter.value++;
  };
</script>
```

مع هذه التغييرات، سنلاحظ أن حالة العدّاد لكل مكوّن فرعي تبقى محفوظة حتى مع تبديلنا الديناميكي بين المكوّنات.

وباستخدام مكوّن ``، يمكننا تحسين سلوك المكوّنات الديناميكية بحفظ حالتها وتوفير تجربة مستخدم أكثر سلاسة عند التنقّل بين علامات التبويب.

JavaScript iconApp.vue

```
<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="[&#x27;tab-button&#x27;, { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <KeepAlive>
      <component :is="tabs[currentTab]" class="tab"></component>
    </KeepAlive>
  </div>
</template>


<script setup>
import { ref } from "vue";
import Home from "./components/Home.vue";
import Feed from "./components/Feed.vue";
import History from "./components/History.vue";


const currentTab = ref("Home");
const tabs = {
  Home,
  Feed,
  History,
};
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/dynamic-components-2-7q9q4r)

## مصادر مفيدة

- [المكوّنات الديناميكية | توثيق Vue](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)
- [KeepAlive | توثيق Vue](https://vuejs.org/guide/built-ins/keep-alive.html)

![المكوّنات الديناميكية](/images/patterns-dev/vue-dynamic-components-67-dynamic_tabs.webp) ![المكوّنات الديناميكية](/images/patterns-dev/vue-dynamic-components-68-dynamic_tabs_initial.webp) ![المكوّنات الديناميكية](/images/patterns-dev/vue-dynamic-components-69-dynamic_components_preserve.webp)
