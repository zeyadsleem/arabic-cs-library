---
title: نمط المزيج (mixin)
lang: ar
source: https://www.patterns.dev/vanilla/mixin-pattern/
---

**المزيج (mixin)** حزمة من السلوك قابلة لإعادة الاستخدام يمكن دمجها في صنف أو كائن ليكتسب قدرات من دون أن يكون جزءًا من سلسلة وراثة. تسمح JavaScript بوراثة صنف واحد فقط، لذلك تسد المزيجات هذه الفجوة: تتيح لك مشاركة مسؤوليات مستقلة — مثل التسجيل وتتبع الاتساخ والتحليل التسلسلي وإدارة الأحداث — عبر أصناف لا تشترك في شيء آخر.

لا يزال النمط ظاهرًا في قواعد الشيفرة الحديثة، من «أصناف المزيج» في TypeScript إلى `mixins` في Vue 2 و`Object.extend` في Backbone وحتى تفاصيل المتصفح مثل `WindowOrWorkerGlobalScope`، لكنه نادرًا ما يكون الخيار الأول في عام 2024. فالتركيب والخطافات ووحدات الأدوات الصغيرة تغطي معظم ما صُممت المزيجات لحلها، عادةً مع مفاجآت أقل.

## مثال عملي: تتبّع التغييرات

لنفترض لدينا صنف `Document` لتطبيق ملاحظات. نريد معرفة ما إذا كان المستند يحتوي على تعديلات غير محفوظة، ومتى آخر تعديل، ونريد «إعادة تعيين» حالة التغيير بعد الحفظ. يمكننا كتابة ذلك مباشرة على الصنف، لكن السلوك نفسه مفيد في `Note` و`Folder` و`Tag` وكل ما يستطيع المستخدم تحريره. وهذا يجعله مرشحًا مثاليًا لمزيج.

```
class Document {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}
```

نبدأ بكائن سمة عادي يلتقط سلوك تتبّع التغييرات:

```
const dirtyTrackable = {
  markDirty() {
    this._dirty = true;
    this._lastModified = Date.now();
  },
  markClean() {
    this._dirty = false;
  },
  isDirty() {
    return Boolean(this._dirty);
  },
  lastModified() {
    return this._lastModified ?? null;
  },
};
```

لطبيقه، نثبت السمة على النموذج الأولي باستخدام `Object.assign`. تحصل الآن كل نسخة من `Document` وكل صنف فرعي على الطرق الأربعة مجانًا:

```
class Document {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

Object.assign(Document.prototype, dirtyTrackable);

const draft = new Document("Patterns", "Mixins, composition, hooks...");
draft.markDirty();
draft.isDirty(); // true
draft.markClean();
draft.isDirty(); // false
```

هذه أبسط صيغة للنمط: كائن سمة مع استدعاء `Object.assign`. تصلح للاستخدام المنفرد، لكنها تعاني مشكلتين معروفتين. أولًا، تحجب الطرق الجديدة بهدوء أي شيء بالاسم نفسه على النموذج الأولي. ثانيًا، لا يوجد أي سجل على `Document` يثبت تطبيق السمة، فيضطر القرّاء إلى البحث عنها.

## تركيب عدة سمات باستخدام مساعدة

عمليًا، تريد عادةً تطبيق عدة سمات بترتيب معلوم، مع وجود عنصر صريح في موقع الاستدعاء. تقوم مساعدة صغيرة اسمها `applyTraits` بالأمرين:

```
function applyTraits(target, ...traits) {
  for (const trait of traits) {
    for (const key of Reflect.ownKeys(trait)) {
      if (key === "constructor") continue;
      if (Object.prototype.hasOwnProperty.call(target.prototype, key)) {
        throw new Error(`Trait conflict on "${String(key)}"`);
      }
      Object.defineProperty(
        target.prototype,
        key,
        Object.getOwnPropertyDescriptor(trait, key)
      );
    }
  }
  return target;
}
```

يمكننا الآن تراكم عدة سمات على صنف والحصول على خطأ صريح إذا تعارض اثنتان منها بدلًا من أن تفوز إحداهما بصمت:

```
const serializable = {
  toJSON() {
    return { title: this.title, body: this.body };
  },
};

const eventEmitting = {
  on(event, handler) {
    (this._handlers ??= new Map()).set(event, handler);
  },
  emit(event, payload) {
    this._handlers?.get(event)?.(payload);
  },
};

applyTraits(Document, dirtyTrackable, serializable, eventEmitting);
```

## مزيجات مصنع (factory) الأصناف الفرعية

يغطي كائن السمة معظم الحالات، لكنه لا يستطيع توسيع السلوك؛ إذ لا يمكن للسمة استدعاء إصدار `super` من دالة، لعدم وجود صنف أب تشير إليه. وتصحح صيغة مصنع الصنف الفرعي ذلك. يصبح المزيج دالة تأخذ صنفًا أبًا وتعيد صنفًا فرعيًا جديدًا:

```
const Timestamped = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.createdAt = new Date();
    }
    touch() {
      this.updatedAt = new Date();
    }
  };

const Versioned = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.version = 1;
    }
    bump() {
      this.version += 1;
    }
  };

class Note {}
class TrackedNote extends Versioned(Timestamped(Note)) {}

const n = new TrackedNote();
n.touch();
n.bump();
```

هذه الصيغة أكثر تفصيلًا، لكنها تتركب بصورة طبيعية مع `extends`، وتتوافق مع أنواع أصناف المزيج في TypeScript، وتتيح لكل طبقة استدعاء `super`. تستخدم معظم قواعد شيفرة TypeScript التي تحتاج إلى مزيجات هذه الصيغة.

## المزيجات في المتصفح (browser)

لا حاجة إلى اختلاق أمثلة للمزيجات؛ فمنصة الويب مليئة بها. يسحب كائن `Window` طرقًا من [`WindowOrWorkerGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope) (ومنه تأتي `setTimeout` و`fetch` و`queueMicrotask` و`isSecureContext`) ومن [`WindowEventHandlers`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers) (خصائص شبيهة بـ`onbeforeunload`). وتُعرَّف هذه في المواصفة كواجهات مزيج؛ لا يمكنك إنشاء نسخ منها بصورة مستقلة، وإنما ترى أعضائها فقط على المضيفات مثل `Window` أو `WorkerGlobalScope`.

## المزيجات مقابل التركيب مقابل الخطافات

اختُرعت المزيجات قبل أن تتوفر بدائل مريحة في JavaScript. اليوم، يكاد يكون أمامك خيار دائمًا. إليك دليل قرار موجزًا:

| الحاجة | الأداة المناسبة | السبب |
| --- | --- | --- |
| مشاركة السلوك عبر أصناف عادية | مزيج بكائن سمة | أقل التكاليف الإجرائية عندما لا توجد استدعاءات `super`. |
| سلوك متراكم يستدعي السلسلة | مزيج مصنع صنف فرعي | كل طبقة صنف فرعي حقيقي، لذا تعمل `super.method()`. |
| مشاركة السلوك عبر مكونات React | خطاف مخصص | تتركب الخطافات خطيًا، وتكون صريحة في موقع الاستدعاء، ولا تلوث نسخة المكون. |
| مشاركة السلوك عبر مكونات Vue | دوال تركيب (`useX`) | المزايا نفسها التي تقدمها خطافات React. ما زالت واجهة `Vue.mixin` القديمة تعمل لكنها غير موصى بها في Vue 3. |
| علاقات الاحتواء (has-a) | التركيب (حقل على الصنف) | الإجابة الأقل استخدامًا على الإطلاق. لو كان `Document` يحتفظ ببساطة بنسخة `DirtyTracker`، فلن يهم أيٌّ من هذا. |

أوقف فريق React [المزيجات في عام 2016](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html). حلّت محلها المكونات عالية الترتيب لفترة، ثم استبدلت بها الخطافات في معظمها. وقد سلك المسار نفسه Vue، من مزيجات Options API إلى دوال تركيب Composition API، وSvelte، حيث لا يوجد مفهوم المزيج وتُشارك السلوكيات عبر المخازن والإجراءات. اتجاه التطور واضح: يتفوق التركيب الصريح على الدمج الضمني في النماذج الأولية.

## زاوية المزخرفات (decorators)

يقترح [مقترح المزخرفات في المرحلة 3](https://github.com/tc39/proposal-decorators)، الصادر مع TypeScript 5.0، طريقة أكثر تركيزًا لإرفاق قدرة مفردة. يمكن لمزخرف صنف `@dirtyTrackable` أن يثبت الطرق نفسها التي يثبتها مزيجنا مع ترك تعليق ظاهر في المصدر. وإلى أن تتوفر المزخرفات أصلًا في المتصفحات وNode، تظل المزيجات الخيار الأقل احتكاكًا، لكن من المفيد معرفة الاتجاه الذي تفضله هيئة المعايير.

## المقايضات

تقلل المزيجات التكرار وسهل تطبيقها، لكن لها تكاليف حقيقية. تظهر الطرق على النسخ من دون أن تُعلن على الصنف، فيصعب التحليل الثابت والانتقال إلى التعريف في بيئات التطوير ومراجعة الشيفرة. وتطمس أسماء الطرق المتعارضة بعضها بعض بصمت ما لم تستخدم مساعدة تتحقق من ذلك. كما يصعب تصحيح سلاسل المزيجات العميقة لأن التسلسل الهرمي للنماذج الأولية لم يعد يطابق المصدر.

القاعدة الإرشادية: استخدم المزيج عندما يكون السلوك المشترك مستقلًا فعلًا عن كل صنف يُطبَّق عليه، مثل التسجيل أو تتبّع التغييرات أو التحليل التسلسلي أو إدارة الأحداث. ثم فكّر في التركيب كلما كان من المعقول أن يعيش السلوك في كائن متعاون. وفي أطر المكونات، فضّل الخطافات أو دوال التركيب؛ فهي صُممت تحديدًا لتحل محل هذا النمط.

## المراجع

- [المزيجات الوظيفية](https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c) - Eric Elliott
- [المزيجات](https://javascript.info/mixins) - JavaScript Info
- [دليل TypeScript: المزيجات](https://www.typescriptlang.org/docs/handbook/mixins.html)
- [مزخرفات المرحلة 3](https://github.com/tc39/proposal-decorators) - TC39
- [المزيجات ضارة](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) - فريق React
