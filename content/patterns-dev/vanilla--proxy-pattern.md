---
title: نمط الوسيط (proxy)
lang: ar
source: https://www.patterns.dev/vanilla/proxy-pattern/
---

باستخدام كائن Proxy، نحصل على تحكم أكبر في التفاعلات مع كائنات معينة. ويمكن لكائن الوسيط (proxy) أن يحدد السلوك في كل مرة نتفاعل فيها مع الكائن، على سبيل المثال عندما نحصل على قيمة أو عندما نضبط قيمة.

عمومًا، الوساطة تعني وجود شخص يحل محل شخص آخر. وبدلًا من التحدث إلى ذلك الشخص مباشرةً، فإنك ستتحدث إلى شخص الوسيط الذي سيمثل الشخص الذي كنت تحاول الوصول إليه. ويحدث الشيء نفسه في JavaScript: بدلًا من التفاعل مع الكائن الهدف مباشرةً، سنتفاعل مع كائن Proxy.

لننشئ كائن `person` الذي يمثل John Doe.

```
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};
```

بدلًا من التفاعل مع هذا الكائن مباشرةً، نريد التفاعل مع كائن وسيط. وفي JavaScript، يمكننا بسهولة إنشاء وسيط جديد عبر إنشاء نسخة جديدة من `Proxy`.

```
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {});
```

المُعامل الثاني لـ `Proxy` هو كائن يمثّل *المُعالِج* (handler). وفي كائن المعالج، يمكننا تعريف سلوك محدد بناءً على نوع التفاعل. ورغم أن هناك [طرقًا كثيرة](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) يمكنك إضافيتها إلى معالج Proxy، فإن أكثر طريقتين شيوعًا هما `get` و`set`:

- `get`: تُستدعى عند محاولة **الوصول** إلى خاصية
- `set`: تُستدعى عند محاولة **تعديل** خاصية

وبالفعالية، فإن ما سيحدث في نهاية المطاف هو الآتي:



بدلًا من التفاعل مع كائن `person` مباشرةً، سنتفاعل مع `personProxy`.

لنضِف معالجات إلى كائن Proxy أي `personProxy`. فعند محاولة تعديل خاصية، أي استدعاء الأسلوب `set` على `Proxy`، نريد أن يسجّل الوسيط القيمة السابقة والقيمة الجديدة للخاصية. وعند محاولة الوصول إلى خاصية، أي استدعاء الأسلوب `get` على `Proxy`، نريد أن يسجّل الوسيط جملة أكثر قابلية للقراءة تحتوي على اسم الخاصية وقيمتها.

```
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});
```

ممتاز! لنرَ ما يحدث عندما نحاول تعديل خاصية أو استرجاعها.

JavaScript iconindex.js

```
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};


const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  }
});


personProxy.name;
personProxy.age = 43;
```

[افتح CodeSandbox](https://codesandbox.io/embed/cocky-bird-rkgyo)

عند الوصول إلى الخاصية `name`، أعاد الوسيط جملة أوضح: `The value of name is John Doe`.

وعند تعديل الخاصية `age`، أعاد الوسيط القيمة السابقة والجديدة لهذه الخاصية: `Changed age from 42 to 43`.

يمكن أن يكون الوسيط مفيدًا لإضافة **التحقق من صحة البيانات** (validation). فلا ينبغي أن يستطيع المستخدم تغيير عمر `person` إلى قيمة نصية، أو أن يعطيه اسمًا فارغًا. وأيضًا، إذا كان المستخدم يحاول الوصول إلى خاصية على الكائن غير موجودة، فينبغي أن نخبره بذلك.

```
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});
```

لنرَ ما يحدث عندما نحاول تمرير قيم خاطئة!

JavaScript iconindex.js

```
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};


const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn&#x27;t seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  }
});


personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";
```

[افتح CodeSandbox](https://codesandbox.io/embed/focused-rubin-dgk2v)

تأكّد الوسيط من أننا لم نعدّل كائن `person` بقيم خاطئة، مما يساعدنا في الحفاظ على نقاء بياناتنا!

## `Reflect`

يوفّر JavaScript كائنًا مدمجًا باسم `Reflect`، الذي يجعل التلاعب بالهدف أصعب عند العمل مع الوسطاء.

في السابق، كنا نحاول تعديل الخصائص والوصول إليها على الكائن الهدف داخل الوسيط من خلال الحصول على القيم أو ضبطها مباشرةً باستخدام صيغة الأقواس المربعة. وبدلًا من ذلك، يمكننا استخدام كائن `Reflect`. وللأساليب الموجودة على كائن `Reflect` الاسم نفسه الذي تحمله أساليب كائن `handler`.

بدلًا من الوصول إلى الخصائص عبر `obj[prop]` أو ضبط الخصائص عبر `obj[prop] = value`، يمكننا الوصول إلى الخصائص على الكائن الهدف أو تعديلها عبر `Reflect.get()` و`Reflect.set()`. وتستقبل هذه الأساليب المعطيات نفسها التي تستقبلها أساليب كائن المعالج.

```
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  },
});
```

ممتاز! يمكننا الوصول إلى الخصائص على الكائن الهدف وتعديلها بسهولة باستخدام كائن `Reflect`.

JavaScript iconindex.js

```
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};


const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});


personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
```

[افتح CodeSandbox](https://codesandbox.io/embed/gallant-violet-o1hjx)

## المفاضلات

الوسطاء طريقة قوية لإضافة التحكم في سلوك كائن ما. وللوسيط حالات استخدام متنوعة: فيمكنه المساعدة في التحقق من صحة البيانات، والتنسيق، والإشعارات، أو التصحيح الأخطاء.

الإفراط في استخدام كائن `Proxy` أو تنفيذ عمليات ثقيلة مع كل استدعاء لأسلوب من أساليب `handler` يمكن أن يؤثر بسهولة وبشكل سلبي في أداء تطبيقك. ومن الأفضل ألا تستخدم الوسطاء مع الشيفرة الحرجة للأداء.

## المراجع

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) - MDN
- [JavaScript Proxy](https://davidwalsh.name/javascript-proxy) - David Walsh
- [Awesome ES2015 Proxy](https://github.com/mikaelbr/awesome-es2015-proxy) - GitHub @mikaelbr
- [Thoughts on ES6 Proxies Performance](http://thecodebarbarian.com/thoughts-on-es6-proxies-performance) - Valeri Karpov
