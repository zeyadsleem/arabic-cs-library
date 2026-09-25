---
title: التوفير/الحقن
lang: ar
source: https://www.patterns.dev/vue/provide-inject/
---

عند إدارة البيانات بين المكوّنات الأم والمكوّنات الفرعية، تمنحنا Vue القدرة على استخدام ما يُعرف بـ**الخصائص (props)** لتمرير البيانات من الأب إلى الابن. ولا يمكن أن تتدفّق الخصائص إلا في اتجاه واحد، من المكوّنات الأم إلى المكوّنات الفرعية (وما دونها). وعندما تحدث تغييرات في الحالة على العناصر الأمّية، فإن Vue ستعيد عرض المكوّنات التي تعتمد على تلك القيم.

تعمل الخصائص (props) بشكل جيّد في معظم الحالات. لكن عند العمل في تطبيقات كبيرة تحتوي على عدد كبير من المكوّنات في شجرة المكوّنات، قد يصبح صعبًا صيانة الخصائص، إذ يلزم التصريح بها في *كل مكوّن على حدة* ضمن شجرة المكوّنات.

وعند التفكير في كيفية إدارة البيانات بين عدد كبير من المكوّنات، فإن الأفضل غالبًا هو التوجّه نحو حلّ يتيح إدارة حالة على مستوى التطبيق بطريقة قابلة للصيانة والتسيير (مثل إنشاء مخزن قابل لإعادة الاستخدام، أو استخدام Pinia، إلخ). وقد تناولنا هذا بالتفصيل في دليل [إدارة الحالة](/book/patterns-dev/vue/state-management).

لكن Vue توفّر أيضًا نمطًا معيّنًا يساعد على تجنّب الحاجة إلى حَفْر الخصائص (prop drilling) المعقّد في تطبيق Vue، ويُعرف بـ provide/inject.

## التوفير/الحقن (Provide/Inject)

تتيح لنا الدالة `provide()` في Vue تمرير البيانات عبر شجرة مكوّنات دون الحاجة إلى *حَفْر الخصائص* (أي تمرير الخصائص يدويًا في كل مستوى). ومن جهة أخرى، يُستخدم الخيار `inject()` في المكوّنات الفرعية للوصول إلى البيانات أو الدوال الموفَّرة من المكوّن الأب أو أيّ مكوّن سلف (ancestor).

لنمرّ على مثال بسيط لتوضيح كيفية accomplishing ذلك. لنفترض لدينا مكوّن أب اسمه `App` يريد مشاركة جزء من البيانات مع مكوّنه الابن `ChildComponent`. وبدلًا من تمرير هذه البيانات كخاصية (prop)، يمكننا استخدام `provide()` في المكوّن الأب لجعل البيانات متاحة لجميع مكوّناته الفرعية.

```
<template>
  <div id="app">
    <ChildComponent />
  </div>
</template>

<script setup>
  import { provide } from "vue";
  import ChildComponent from "./components/ChildComponent";

  provide("data", "Data from parent!");
</script>
```

يمكننا عندها الوصول إلى هذه البيانات الموفَّرة في `ChildComponent` بفضل الدالة `inject()`.

```
<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
  import { inject } from "vue";

  const data = inject("data");
</script>
```

بتحديد `inject("data")` في المكوّن الفرعي (`ChildComponent`)، فإننا نصل مباشرةً إلى قيمة `data` الموفَّرة من المكوّن الأب. ثم نربط `data` بالقالب لعرض قيمتها.

JavaScript iconApp.vue

```
<template>
  <div id="app">
    <ChildComponent />
  </div>
</template>


<script setup>
import { provide } from "vue";
import ChildComponent from "./components/ChildComponent";


provide("data", "Data from parent!");
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/provide-inject-1-xqhxlm)

مع provide/inject، سنلاحظ السلوك نفسه الذي رأيناه أعلاه حتى لو كان لدينا عدد كبير من المكوّنات الفرعية ضمن شجرة التسلسل الهرمي للمكوّنات. وكمثال، لنفترض لدينا المكوّنات `` و`` و`` و`` و`` بحيث يكون كل مكوّن فرعي أبًا للمكوّن الذي يليه.

```
<!-- ChildComponent5 -->
<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
  import { inject } from "vue";
  const data = inject("data");
</script>
<!--  ------------- -->

<!-- ChildComponent4 -->
<template>
  <ChildComponent5 />
</template>

<script setup>
  import ChildComponent5 from "./ChildComponent5";
</script>
<!--  ------------- -->

<!-- ChildComponent3 -->
<template>
  <ChildComponent4 />
</template>

<script setup>
  import ChildComponent4 from "./ChildComponent4";
</script>
<!--  ------------- -->

<!-- ChildComponent2 -->
<template>
  <ChildComponent3 />
</template>

<script setup>
  import ChildComponent3 from "./ChildComponent3";
</script>
<!--  ------------- -->

<!-- ChildComponent -->
<template>
  <ChildComponent2 />
</template>

<script setup>
  import ChildComponent2 from "./ChildComponent2";
</script>
<!--  ------------- -->

<!-- App -->
<template>
  <div id="app">
    <ChildComponent />
  </div>
</template>

<script setup>
  import { provide } from "vue";
  import ChildComponent from "./components/ChildComponent";

  provide("data", "Data from parent!");
</script>
<!--  ------------- -->
```

ستُعرض البيانات القادمة من المكوّن الأب `` في المكوّن `` دون الحاجة إلى حَفْر الخصائص عبر كل مكوّن في الشجرة، وذلك بفضل provide/inject!

JavaScript iconApp.vue

```
<template>
  <div id="app">
    <ChildComponent />
  </div>
</template>


<script setup>
import { provide } from "vue";
import ChildComponent from "./components/ChildComponent";


provide("data", "Data from parent!");
</script>
```

[فتح CodeSandbox](https://codesandbox.io/embed/provide-inject-2-6d5sd7)

إلى جانب قدرتنا على استدعاء `provide()` بالبيانات من مكوّن أب، يمكننا رفع `provide()` إلى مستوى التطبيق أيضًا (أي الموضع الذي أنشئ فيه تطبيق Vue).

```
import { createApp } from "vue";
import App from "./App.vue";
import "./styles.css";

const app = createApp(App);

// app-level provide
app.provide("data", "Data from parent!");

app.mount("#app");
```

وبما أن عمليات التوفير على مستوى التطبيق تجعل البيانات متاحة لـ*جميع* المكوّنات، فإنها غالبًا مفيدة عند إنشاء [الإضافة (plugins)](https://vuejs.org/guide/reusability/plugins.html) — وهي شيفرة مكتفية بذاتها تضيف وظائف إلى تطبيق Vue بأكمله.

## الخصائص مقابل التوفير/الحقن (Props vs. provide/inject)

متى نختار بين الخصائص ونمط provide/inject؟ كلا النهجين له مزاياه وعيوبه.

### مع الخصائص (props):

- نتبع نمطًا واضحًا يمرّر البيانات تدريجيًا من مستوى إلى آخر (ميزة).
- لكن إذا احتوت شجرة التسلسل الهرمي لمكوّناتنا على عدد كبير من المكوّنات، فإن عملية تمرير بيانات الخصائص مستوى بعد مستوى قد تصبح مرهقة (عيب).

### مع التوفير/الحقن (provide/inject)

- يمكن للمكوّنات الفرعية الوصول مباشرةً إلى بيانات المكوّنات الأمّية التي تقع عدة مستويات أعلى، مما يلغي الحاجة إلى تمرير البيانات في كل مستوى (ميزة).
- لكن عند ظهور الأخطاء،قد يصبح التصحيح (debugging) أصعب مع provide/inject. ويصبح هذا التحدي أكثر وضوحًا في التطبيقات واسعة النطاق التي تحتوي على مزوّدين (providers) مختلفين كثيرين (عيب).

نمط provide/inject هو الأنسب على الإطلاق لبيانات العميل على مستوى التطبيق، مثل معلومات السمة (theme)، وتفضيلات اللغة أو المنطقة المحلية (locale)، وتفاصيل مصادقة المستخدم. فهذه الأنواع من البيانات تُدار بشكل أفضل عبر provide/inject، لأن أيّ مكوّن داخل التطبيق قد يحتاج إلى الوصول إليها في أي وقت.

ومن جهة أخرى، تكون الخصائص (props) مثالية عندما تحتاج البيانات إلى أن تبقى معزولة ضمن مجموعة محدّدة من المكوّنات فقط.

## مصادر مفيدة

- [Provide / Inject | توثيق Vue](https://vuejs.org/guide/components/provide-inject.html)

![التوفير/الحقن](/images/patterns-dev/vue-provide-inject-70-props.webp) ![التوفير/الحقن](/images/patterns-dev/vue-provide-inject-71-nested_props.webp) ![التوفير/الحقن](/images/patterns-dev/vue-provide-inject-72-provide_inject.webp)
