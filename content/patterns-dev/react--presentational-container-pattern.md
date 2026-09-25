---
title: نمط الحاوية/العرض التقديمي
lang: ar
source: https://www.patterns.dev/react/presentational-container-pattern/
---
في React، إحدى الطرق لتفرض فصل المسؤوليات (separation of concerns) هي استخدام **نمط الحاوية/المكوّن التقديمي (Container/Presentational pattern)**. وبهذا النمط يمكننا فصل العرض (view) عن منطق التطبيق.

لنفترض أننا نريد إنشاء تطبيق يجلب 6 صور لكلاب، ويعرض هذه الصور على الشاشة.

JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js

```javascript
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

[افتح CodeSandbox](https://codesandbox.io/embed/sleepy-murdock-if0ec)

من الناحية المثلى، نريد فرض فصل المسؤوليات بتقسيم هذه العملية إلى جزأين:

- **المكوّنات التقديمية (Presentational Components)**: مكوّنات تهتم بـ ***كيفية*** عرض البيانات للمستخدم. في هذا المثال، هو *عرض قائمة صور الكلاب*.
- **مكوّنات الحاوية (Container Components)**: مكوّنات تهتم بـ ***ما هي*** البيانات التي تُعرض للمستخدم. في هذا المثال، هو *جلب صور الكلاب*.

أما جلب صور الكلاب فيتعلّق بـ **منطق التطبيق (application logic)**، في حين أن عرض الصور لا يتعلّق إلا بـ **العرض (view)**.

## المكوّن التقديمي (Presentational Component)

يتلقّى المكوّن التقديمي بياناته عبر `props` (الخصائص). ووظيفته الأساسية هي ببساطة **عرض البيانات التي يتلقاها** بالطريقة التي نريدها، بما في ذلك الأنماط (styles)، *من دون تعديل* تلك البيانات.

لننظر إلى المثال الذي يعرض صور الكلاب. عند عرض صور الكلاب، نريد ببساطة المرور على كل صورة كلاب تم جلبها من الواجهة البرمجية (API)، وعرض تلك الصور. وللقيام بذلك، يمكننا إنشاء مكوّن دالتي (functional component) يتلقّى البيانات عبر `props`، ويعرض ما يتلقّاه.

JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js

```javascript
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

[افتح CodeSandbox](https://codesandbox.io/embed/sleepy-murdock-if0ec)

المكوّن `DogImages` هو مكوّن تقديمي. والمكوّنات التقديمية *عادةً* عديمة الحالة (stateless): فهي لا تحتوي على حالة React خاصة بها، إلا إذا كانت تحتاج إلى حالة لأغراض الواجهة. أما البيانات التي تتلقاها فلا تُغيّرها المكوّنات التقديمية نفسها.

وتتلقّى المكوّنات التقديمية بياناتها من **مكوّنات الحاوية (container components)**.

## مكوّنات الحاوية (Container Components)

وظيفة مكوّنات الحاوية الأساسية هي **تمرير البيانات** إلى المكوّنات التقديمية التي *تحتويها*. أما مكوّنات الحاوية نفسها فعادةً لا تعرض أي مكوّنات أخرى سوى المكوّنات التقديمية التي تهتم ببياناتها. ولأنها لا تعرض شيئًا بنفسها، فإنها عادةً لا تحتوي على أي تنسيق (styling) أيضًا.

في مثالنا، نريد تمرير صور الكلاب إلى المكوّن التقديمي `DogsImages`. وقبل أن نتمكن من ذلك، نحتاج إلى جلب الصور من واجهة برمجية خارجية. فنحتاج إلى إنشاء **مكوّن حاوية (container component)** يجلب هذه البيانات، ويمرّرها إلى المكوّن التقديمي `DogImages` لعرضها على الشاشة.

JavaScript iconDogImages.jsJavaScript iconDogImagesContainer.js

```javascript
import React from "react";
import DogImages from "./DogImages";

export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

[افتح CodeSandbox](https://codesandbox.io/embed/sleepy-murdock-if0ec)

يدمج هذان المكوّنان معًا إمكانية فصل التعامل مع منطق التطبيق عن العرض.

## الخطّافات (Hooks)

في كثير من الحالات، يمكن استبدال نمط الحاوية/العرض التقديمي بخطّافات React. فقد جعل إدخال الخطّافات من السهل على المطوّرين إضافة حالة (state) من دون الحاجة إلى مكوّن حاوية يوفّر تلك الحالة.

بدلًا من وضع منطق جلب البيانات في المكوّن `DogImagesContainer`، يمكننا إنشاء خطّاف مخصّص (custom hook) يجلب الصور ويُعيد مصفوفة الكلاب.

```javascript
export default function useDogImages() {

const [dogs, setDogs] = useState([]);

useEffect(() => {

fetch("https://dog.ceo/api/breed/labrador/images/random/6")

.then((res) => res.json())

.then(({ message }) => setDogs(message));

}, []);

return dogs;

}
```

باستخدام هذا الخطّاف، لم نعد بحاجة إلى مكوّن الحاوية `DogImagesContainer` الغالب ليجلب البيانات ويمرّرها إلى المكوّن التقديمي `DogImages`. وبدلًا من ذلك، يمكننا استخدام هذا الخطّاف مباشرةً في المكوّن التقديمي `DogImages` لدينا!

JavaScript iconDogImages.jsJavaScript iconuseDogImages.js

```javascript
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

[افتح CodeSandbox](https://codesandbox.io/embed/rough-brook-tzp7i)

باستخدام خطّاف `useDogImages`، فإننا لا زلنا نفصل منطق التطبيق عن العرض. فنحن نكتفي باستخدام البيانات المُعادة من خطّاف `useDogImages`، من دون تعديل تلك البيانات داخل المكوّن `DogImages`.

تجعل الخطّافات من السهل فصل المنطق عن العرض داخل المكوّن، تمامًا كما يفعل نمط الحاوية/العرض التقديمي. وهي توفر علينا الطبقة الإضافية التي كانت ضرورية لتغليف المكوّن التقديمي داخل مكوّن الحاوية.

## المميزات

هناك فوائد كثيرة لاستخدام نمط الحاوية/العرض التقديمي.

يشجّع نمط الحاوية/العرض التقديمي على فصل المسؤوليات. فيمكن أن تكون المكوّنات التقديمية دوال نقية (pure functions) مسؤولة عن واجهة المستخدم، بينما تكون مكوّنات الحاوية مسؤولة عن حالة التطبيق وبياناته. وهذا يجعل فرض فصل المسؤوليات سهلًا.

وتصبح المكوّنات التقديمية سهلة إعادة الاستخدام، لأنها *تعرض* البيانات فحسب دون تغييرها. يمكننا إعادة استخدام المكوّنات التقديمية في أنحاء تطبيقنا لأغراض مختلفة.

ولأن المكوّنات التقديمية لا تغيّر منطق التطبيق، فإن مظهرها يمكن أن يغيّره بسهولة شخص لا يعرف قاعدة الأكواد (codebase)، مثل مصمّم. وإذا أُعيد استخدام المكوّن التقديمي في أجزاء كثيرة من التطبيق، فإن التغيير سيكون متسقًا في التطبيق كله.

واختبار المكوّنات التقديمية سهل، لأنها عادةً دوال نقية. فنحن نعرف ما الذي سيعرضه المكوّن بناءً على البيانات التي نمرّرها، من دون الحاجة إلى محاكاة (mocking) مخزن بيانات.

## العيوب

يتيح نمط الحاوية/العرض التقديمي فصل منطق التطبيق عن منطق العرض بسهولة. لكن الخطّافات تجعل من الممكن تحقيق النتيجة نفسها من دون الحاجة إلى استخدام نمط الحاوية/العرض التقديمي، ومن دون الحاجة إلى إعادة كتابة مكوّن دالتي عديم الحالة ليصبح مكوّن صنف (class component). ولاحظ أننا اليوم لم نعد بحاجة إلى إنشاء مكوّنات أصناف لاستخدام الحالة.

ولرغم أننا ما زلنا نستطيع استخدام نمط الحاوية/العرض التقديمي حتى مع خطّافات React، فإن هذا النمط يمكن أن يكون مبالغًا فيه بسهولة في التطبيقات الأصغر حجمًا.

> **ملاحظة (React 18+):** يفضّل React الحديث بقوةً **الخطّافات على مكوّنات الحاوية** لفصل المنطق عن العروض. يمكن للخطّافات المخصّصة أن تحلّ محلّ الحاويات القائمة على الأصناف بالكامل — فمثلًا، يستطيع خطّاف `useDogImages` جلب البيانات باستخدام `useState` و`useEffect`، ثم يستطيع أي مكوّن أن ينادي `const dogs = useDogImages()` للحصول على البيانات. وهذا يحقق فصل المسؤوليات نفسه (جلب البيانات مقابل واجهة المستخدم) مع شيفرة تكرارية أقل وبدون أي مكوّن غلاف. وهذا الأسلوب القائم على الخطّافات صديق أيضًا لتحسينات React القادمة — إذ يستطيع مُصرِّف React (React Compiler) تحسين المكوّنات الدالية والخطّافات على نحو أفضل من دورات حياة الأصناف.

## المراجع

- [Presentational and Container Components - Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
