---
title: نمط النموذج الأولي (prototype)
lang: ar
source: https://www.patterns.dev/vanilla/prototype-pattern/
---

في أدبيات أنماط التصميم (design patterns) الكلاسيكية، يتعلق **النموذج الأولي (prototype)** بـ*الاستنساخ*: تحتفظ بكائن قالب، ثم تستخرج نسخًا منه كلما احتجت نسخة جديدة. كان هذا التصور منطقيًا في C++ وSmalltalk، حيث كان إنشاء كائن من صنف يعني استدعاء دالة منشئة تعيد تشغيل شيفرة الإعداد في كل مرة.

يعكس JavaScript هذا النمط. فالاستنساخ ما زال مهمًا — سننظر لاحقًا إلى `structuredClone` وHTML `` — لكن *اللغة نفسها* مبنية على آلية نموذج أولي تفعل شيئًا لا يستطيع الاستنساخ الكلاسيكي فعله: **التفويض (delegation)**. يمكن للكائن أن يسلّل عمليات البحث إلى كائن آخر في وقت التشغيل، من دون أي نسخة. هذه هي الآلية التي تجعل `class` تعمل، وهي الجزء المحدد من النمط الذي يجعله مثيرًا للاهتمام في JavaScript.

يستعرض هذا المقال جانبَي النمط: النموذج الأولي بوصفه تفويضًا (الشكل الأصلي في JavaScript)، والنموذج الأولي بوصفه قالبًا (شكل الاستنساخ)، مع واجهات برمجية حديثة ستستخدمها فعليًا في عام 2025.

## التفويض: كل كائن يشير إلى كائن آخر

كل كائن JavaScript له خانة داخلية، `[[Prototype]]`، تكون إما `null` أو مرجعًا إلى كائن آخر. عندما تقرأ خاصية، يفحص المحرك الكائن نفسه أولًا؛ وإذا لم يجد تطابقًا، يتبع `[[Prototype]]` ويحاول مجددًا، ماشيًا في السلسلة حتى يجد الخاصية أو يصل إلى `null`.

يمكنك رؤية السلسلة مباشرة:

```
const widget = {
  render() {
    return `<div class="${this.theme}">${this.label}</div>`;
  },
};

const button = Object.create(widget);
button.label = "Save";
button.theme = "primary";

button.render();             // "<div class=\"primary\">Save</div>"
Object.getPrototypeOf(button) === widget; // true
```

يمتلك `button` خاصيتين بالضبط: `label` و`theme`. توجد طريقة `render` على `widget`، لكن يستطيع `button` استدعاؤها لأن البحث يتسرب إلى أسفل السلسلة. هذا هو نمط النموذج الأولي كاملًا بصياغته في JavaScript — لا نسخة، ولا صنف، مجرد كائن يفوّض العمل إلى آخر.

الأصناف مجرد سكر نحوي فوق الآلية نفسها. عندما تكتب:

```
class Widget {
  render() {
    return `<div class="${this.theme}">${this.label}</div>`;
  }
}

class IconButton extends Widget {
  constructor({ label, theme, icon }) {
    super();
    this.label = label;
    this.theme = theme;
    this.icon = icon;
  }
}
```

... تستقر طريقة `render` على `Widget.prototype`، ولكل نسخة من `IconButton` سلسلة `[[Prototype]]` تنتهي بـ `IconButton.prototype → Widget.prototype → Object.prototype → null`. ويجري حل الاستدعاء `new IconButton(...).render()` عبر تلك السلسلة، تمامًا كما فعل المثال الحرفي باستخدام `Object.create`. إن `class` مجرد طريقة أكثر ملاءمة لكتابة الشيء نفسه.

النتيجة العملية: توجد الطرق *مرة واحدة* لكل صنف، لا مرة واحدة لكل نسخة. تتشارك عشرة آلاف نسخة من `IconButton` مرجعًا واحدًا لوظيفة `render`. هذه هي الميزة في الذاكرة التي كانت مجموعة الأربعة (GoF) تهتم بها، لكنك تحصل عليها مجانًا في JavaScript ما دمت تحتفظ بالطرائق على النموذج الأولي، أي معرفتها داخل جسم `class` لا تعيينها داخل الدالة المنشئة.

## الاستنساخ: متى لا يكون التفويض هو الحل

التفويض رائع لمشاركة *السلوك*. لكنه الأداة الخطأ لمشاركة *الحالة*. إذا احتاج كائنان إلى نسختيهما المستقلتين من تكوين متداخل، فيجب عليك فعليًا نسخه.

هناك ثلاثة خيارات تزايدًا مع درجة الدقة.

### 1. عامل الانتشار (spread) للنسخ السطحي مع الاستبدالات

```
const baseConfig = {
  retries: 3,
  timeoutMs: 5000,
  headers: { "User-Agent": "patterns.dev" },
};

const prodConfig = { ...baseConfig, timeoutMs: 30_000 };
```

هذا هو النمط الذي تلجأ إليه في 90% من الوقت. تذكر فقط أن `prodConfig.headers === baseConfig.headers` — فعامل الانتشار يعمل على مستوى واحد. سيؤدي تعديل `prodConfig.headers["X-Trace"]` إلى تعديل `baseConfig.headers` أيضًا. وهذا مصدر حقيقي للأخطاء.

### 2. `structuredClone` للنسخ العميق

دالة أصلية وموحّدة المعايير؛ مدعومة في كل متصفح حديث وNode 17+ وDeno وBun. تتعامل مع `Date` و`Map` و`Set` و`RegExp` والمصفوفات المكتوبة والرسوم البيانية الدورية، ولا ينجو أي منها من `JSON.parse(JSON.stringify(x))`.

```
const config = {
  createdAt: new Date(),
  tags: new Set(["beta", "internal"]),
  endpoints: new Map([["read", "/r"], ["write", "/w"]]),
};

const copy = structuredClone(config);
copy.tags.add("experimental");
config.tags.has("experimental"); // false — independent
```

لا تنسخ الدوال أو عُقد DOM أو نسخ الأصناف؛ إذ تحصل على كائن عادي من دون نموذج أولي. تعامل معها بوصفها «نسخًا عميقًا لحالة قابلة للتسلسل»، لا «نسخًا عامًا لكائن».

### 3. استنساخ نسخة صنف

يتطلب استنساخ نسخة من صنف مع إبقاء النموذج الأولي سليمًا مساعدة صغيرة:

```
function cloneInstance(instance) {
  const copy = Object.create(Object.getPrototypeOf(instance));
  return Object.assign(copy, structuredClone({ ...instance }));
}
```

يمنحك `Object.create(proto)` كائنًا جديدًا على سلسلة النماذج الأولي الصحيحة، كي يستمر عمل `instanceof`. ويجري `structuredClone({ ...instance })` نسخًا عميقًا للخصائص الذاتية. وبدمجهما، تكون قد أعدت بناء الأصل. هذا أقرب ما يصل إليه JavaScript إلى فكرة «النموذج الأولي بوصفه قالبًا» في GoF، وهو مفيد للاحتفاظ به في جعبتك لأشياء مثل مكدسات التراجع في المحررات أو بانئات بيانات الاختبار.

## عنصر HTML `` هو نمط النموذج الأولي في DOM

يأتي المتصفح بنمط نموذج أولي مدمج لعُقد DOM. ضع ترميزًا خاملًا داخل ``، واستنسخه كلما احتجت نسخة جديدة، ثم أدرجه في الشجرة الحية:

```
<template id="card">
  <article class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </article>
</template>
```

```
const cardTemplate = document.getElementById("card");

function makeCard({ title, body }) {
  const node = cardTemplate.content.cloneNode(true);
  node.querySelector(".card-title").textContent = title;
  node.querySelector(".card-body").textContent = body;
  return node;
}

list.append(makeCard({ title: "Hello", body: "World" }));
```

يُحلّل DOM للقالب مرة واحدة. وينتج `cloneNode(true)` نسخة عميقة من تلك الشجرة الفرعية من دون إعادة تحليل HTML أو تشغيل سكربتات جزء المستند. هذا هو النمط نفسه المستخدم في استنساخ كائن JavaScript — القالب هو النموذج الأولي، والعُقد الحية هي النسخ — وهو أسرع بكثير من `innerHTML = "..."` داخل حلقة.

## بيانات الاختبار وبانئات الكائنات

كمية كبيرة بشكل مفاجئ من شيفرة الاختبار هي نمط النموذج الأولي بارتداء قبعة مختلفة. تتبع مكتبات مثل `fishery` و`factory-bot` وأنماط `createBuilder` في Vitest الشكل نفسه:

```
function buildUser(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    email: "user@example.com",
    role: "viewer",
    createdAt: new Date(),
    ...overrides,
  };
}

const admin = buildUser({ role: "admin" });
const banned = buildUser({ role: "viewer", bannedAt: new Date() });
```

الكائن الأساسي هو النموذج الأولي. يدمج كل استدعاء الاستبدالات فوقه بعمق، أو يوزعها سطحيًا. وهذا أكثر قابلية للصيانة بصورة هائلة من إنشاء الكائن الكامل مباشرة داخل كل اختبار.

## `Object.create(null)`: قواميس بلا نموذج أولي

عندما تريد خريطة مفتاح/قيمة عادية ولا تريد أن تنتقل عمليات البحث إلى `Object.prototype`، فأنشئ الكائن من دون نموذج أولي على الإطلاق:

```
const headers = Object.create(null);
headers.toString = "I'm just a header value, not the toString method";
headers["__proto__"] = "and this is just a string, not a security hole";
```

يكتسب هذا الأمر أهمية كلما أتت المفاتيح من إدخال غير موثوق. مع كائن `{}` عادي، يستطيع المهاجم الذي يمكنه الكتابة إلى `__proto__` أو `constructor` أن يفسد سلسلة النماذج الأولية العالمية — وهي عائلة الأخطاء المعروفة بـ**تلوث النموذج الأولي (prototype pollution)** (وقد ظهرت ثغرات CVE حقيقية في `lodash.merge` و`set-value` و`dot-prop` ووسائط Express). و`Object.create(null)` تزيل سطح الهجوم تمامًا، إذ لا يوجد نموذج أولي يمكن تلويثه. أما إدخال المستخدم العشوائي، فالأفضل استخدام `Map`، التي لا تحمل مشكلات مفاتيح النموذج الأولي من الأساس.

## السجلات والمجموعات (TC39)

يقدّم [اقتراح Records and Tuples](https://github.com/tc39/proposal-record-tuple) (في المرحلة 2 وقت كتابة هذا المقال) أنواعًا أولية غير قابلة للتغيير بعمق — `#{ x: 1 }` للسجل و`#[1, 2]` للمجموعة. تقارَن بنيويًا (`#{ x: 1 } === #{ x: 1 }` يعطي `true`)، و«استنساخها» لا معنى له لأنها قيم بالفعل. وعندما تصل هذه الأنواع، ستبسّط كثير من شيفرة النسخ العميق مع الاستبدال الموجودة اليوم. من المفيد معرفتها كي لا تكتب الآن شيفرة تندم عليها بعد عامين.

## متى يناسب النمط

| الاستخدام | الأسلوب |
| --- | --- |
| مشاركة السلوك بين كائنات متشابهة كثيرة | `class` (أو `Object.create`) — تفويض عبر سلسلة النموذج الأولي |
| إنشاء متغير معدل من تكوين | الانتشار بعمق واحد، و`structuredClone` للعناصر المتداخلة |
| إعادة استخدام شجرة فرعية من DOM مرات كثيرة | `` + `cloneNode(true)` |
| توليد بيانات اختبار بقيم افتراضية منطقية | دالة باني مع استبدالات قابلة للنشر |
| إنشاء قاموس آمن للمفتاح والقيمة | `Object.create(null)` أو `Map` |
| تكرار نسخة من صنف | `Object.create(getPrototypeOf(x))` + نسخ عميق للخصائص الذاتية |

## المراجع

- [الوراثة وسلسلة النموذج الأولي](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) - MDN
- [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) - MDN
- [عنصر HTML ``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) - MDN
- [شرح تلوث النموذج الأولي](https://snyk.io/blog/javascript-prototype-pollution/) - Snyk
- [اقتراح Records and Tuples](https://github.com/tc39/proposal-record-tuple) - TC39
