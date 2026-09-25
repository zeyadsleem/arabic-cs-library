---
title: النمط المركّب
lang: ar
source: https://www.patterns.dev/react/compound-pattern/
---
في تطبيقنا، لدينا غالبًا مكوّنات (components) تخصّ بعضها بعضًا. فهي تعتمد على بعضها عبر الحالة (state) المشتركة، وتتشارك المنطق معًا. ونرى هذا غالبًا في مكوّنات مثل `select`، ومكوّنات القوائم المنسدلة (dropdown)، أو عناصر القوائم. يتيح لك **نمط المكوّنات المركّبة (compound component pattern)** إنشاء مكوّنات تعمل جميعها معًا لإنجاز مهمة واحدة.

## واجهة السياق (Context API)

لننظر إلى مثال: لدينا قائمة من صور سنجاب! إلى جانب عرض صور السنجاب فقط، نريد إضافة زر يتيح للمستخدم تحرير الصورة أو حذفها. يمكننا تنفيذ مكوّن `FlyOut` يعرض قائمة عندما يبدّل المستخدم حالة المكوّن.

داخل مكوّن `FlyOut` لدينا أساسًا ثلاثة أشياء:

- غلاف `FlyOut`، الذي يحتوي زر التبديل والقائمة
- زر `Toggle`، الذي يبدّل حالة `List`
- `List`، التي تحتوي على قائمة عناصر القائمة

استخدام نمط المكوّنات المركّبة مع [واجهة Context API في React](https://reactjs.org/docs/context.html) مثالي لهذا المثال!

أولًا، لنُنشئ مكوّن `FlyOut`. هذا المكوّن يحتفظ بالحالة، ويُعيد `FlyOutProvider` يحمل قيمة التبديل إلى كل الأبناء الذين يتلقاهم.

```javascript
const FlyOutContext = createContext();

function FlyOut(props) {

const [open, toggle] = useState(false);

return (

<FlyOutContext.Provider value={{ open, toggle }}>

{props.children}

</FlyOutContext.Provider>

);

}
```

لدينا الآن مكوّن `FlyOut` ذو حالة يمرّر قيمتَي `open` و`toggle` إلى أبنائه!

لنُنشئ الآن مكوّن `Toggle`. هذا المكوّن يعرض ببساطة العنصر الذي يمكن للمستخدم النقر عليه لتبديل حالة القائمة.

```javascript
function Toggle() {

const { open, toggle } = useContext(FlyOutContext);

return (

<div onClick={() => toggle(!open)}>

<Icon />

</div>

);

}
```

ولكي نمنح `Toggle` فعليًا وصولًا إلى مزوّد `FlyOutContext`، علينا عرضه كابن للمكوّن `FlyOut`! -*يمكننا* ببساطة عرضه كابن للمكوّن. لكن يمكننا أيضًا جعل المكوّن `Toggle` خاصية (property) من المكوّن `FlyOut`!*

```javascript
const FlyOutContext = createContext();

function FlyOut(props) {

const [open, toggle] = useState(false);

return (

<FlyOutContext.Provider value={{ open, toggle }}>

{props.children}

</FlyOutContext.Provider>

);

}

function Toggle() {

const { open, toggle } = useContext(FlyOutContext);

return (

<div onClick={() => toggle(!open)}>

<Icon />

</div>

);

}

FlyOut.Toggle = Toggle;
```

هذا يعني أنه إذا أردنا استخدام المكوّن `FlyOut` في أي ملف، فلن نضطر إلا إلى استيراد `FlyOut`!

```javascript
import React from "react";

import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {

return (

<FlyOut>

<FlyOut.Toggle />

</FlyOut>

);

}
```

مجرد زر تبديل لا يكفي. نحتاج أيضًا إلى `List` تحتوي على عناصر قائمة، تُفتح وتُغلق بناءً على قيمة `open`.

```javascript
function List({ children }) {

const { open } = React.useContext(FlyOutContext);

return open && <ul>{children}</ul>;

}

function Item({ children }) {

return <li>{children}</li>;

}
```

يعرض مكوّن `List` أبناءه بناءً على ما إذا كانت قيمة `open` هي `true` أو `false`. لنجعل `List` و`Item` خاصيتين من المكوّن `FlyOut`، تمامًا كما فعلنا مع المكوّن `Toggle`.

```javascript
const FlyOutContext = createContext();

function FlyOut(props) {

const [open, toggle] = useState(false);

return (

<FlyOutContext.Provider value={{ open, toggle }}>

{props.children}

</FlyOutContext.Provider>

);

}

function Toggle() {

const { open, toggle } = useContext(FlyOutContext);

return (

<div onClick={() => toggle(!open)}>

<Icon />

</div>

);

}

function List({ children }) {

const { open } = useContext(FlyOutContext);

return open && <ul>{children}</ul>;

}

function Item({ children }) {

return <li>{children}</li>;

}

FlyOut.Toggle = Toggle;

FlyOut.List = List;

FlyOut.Item = Item;
```

يمكننا الآن استخدامها كخصائص على المكوّن `FlyOut`! وفي حالتنا هذه نريد عرض خيارين للمستخدم: **تعديل (Edit)** و**حذف (Delete)**. لنُنشئ `FlyOut.List` يعرض مكوّنَي `FlyOut.Item`، أحدهما لخيار **تعديل (Edit)** والآخر لخيار **حذف (Delete)**.

```javascript
import React from "react";

import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {

return (

<FlyOut>

<FlyOut.Toggle />

<FlyOut.List>

<FlyOut.Item>Edit</FlyOut.Item>

<FlyOut.Item>Delete</FlyOut.Item>

</FlyOut.List>

</FlyOut>

);

}
```

ممتاز! لقد أنشأنا للتو مكوّن `FlyOut` كاملًا من دون إضافة أي حالة (state) في `FlyOutMenu` نفسه!

JavaScript iconindex.jsJavaScript iconFlyOut.jsJavaScript iconFlyoutMenu.jsJavaScript iconImages.js

```javascript
import React from "react";
import "./styles.css";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

[افتح CodeSandbox](https://codesandbox.io/embed/provider-pattern-2-ck29r)

النمط المركّب ممتاز عندما تبني مكتبة مكوّنات. وسترى هذا النمط كثيرًا عند استخدام مكتبات واجهة المستخدم مثل [Semantic UI](https://react.semantic-ui.com/modules/dropdown/#types-dropdown).

## [`React.Children.map`](https://reactjs.org/docs/react-api.html#reactchildrenmap)

يمكننا أيضًا تنفيذ نمط المكوّنات المركّبة عبر المرور على أبناء المكوّن (mapping over). يمكننا إضافة قيمتَي `open` و`toggle` إلى هذه العناصر، عبر [استنساخها (cloning)](https://reactjs.org/docs/react-api.html#cloneelement) مع الخصائص (props) الإضافية.

```javascript
export function FlyOut(props) {

const [open, toggle] = React.useState(false);

return (

<div>

{React.Children.map(props.children, (child) =>

React.cloneElement(child, { open, toggle })

)}

</div>

);

}
```

يتم استنساخ جميع المكوّنات الفرعية، ويُمرَّر إليها قيمتا `open` و`toggle`. وبدلًا من الحاجة إلى استخدام واجهة Context API كما في المثال السابق، أصبح بإمكاننا الوصول إلى هاتين القيمتين عبر `props`.

JavaScript iconindex.jsJavaScript iconFlyOut.jsJavaScript iconFlyoutMenu.jsJavaScript iconImages.js

```javascript
import React from "react";
import Icon from "./Icon";

const FlyOutContext = React.createContext();

export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

return (
    <div>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}

function Toggle() {
  const { open, toggle } = React.useContext(FlyOutContext);

return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

[افتح CodeSandbox](https://codesandbox.io/embed/provider-pattern-2-j9l1k)

## المميزات

تدير المكوّنات المركّبة حالتها الداخلية الخاصة، وتشاركها بين عدة مكوّنات فرعية. وعندما ننفّذ مكوّنًا مركّبًا، لا نضطر للقلق بشأن إدارة الحالة بأنفسنا.

وعند استيراد مكوّن مركّب، لا نضطر إلى استيراد المكوّنات الفرعية المتاحة على ذلك المكوّن بشكل صريح.

> **ملاحظة (React 18+):** يظل نمط المكوّنات المركّبة باستخدام واجهة Context API في React نمطًا **موصى به** للمكوّنات المرتبطة التي تتشارك الحالة. والتنفيذ باستخدام الخطّافات (Hooks) (`useState`، `useContext`) حديث ويتوافق مع أفضل الممارسات الحالية. وعند استخدام السياق، تجنّب عمليات إعادة العرض (re-render) غير الضرورية بعدم إعادة إنشاء قيم السياق في كل عرض. وفي السيناريوهات المعقدة، يمكنك تحسين الأداء عبر التخزين المؤقت (memoization) لقيمة السياق أو عبر تقسيم السياق (مثلًا: سياق للقيمة المنطقية `open` وآخر لدالة `toggle`). والنمط متوافق تمامًا مع ميزات React القادمة مثل مكوّنات الخادم (Server Components) — يكفي فقط أن تكون مزوّدات السياق والمستهلكون جميعها إمّا مكوّنات خادم أو مكوّنات عميل حسب الحاجة.

```javascript
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {

return (

<FlyOut>

<FlyOut.Toggle />

<FlyOut.List>

<FlyOut.Item>Edit</FlyOut.Item>

<FlyOut.Item>Delete</FlyOut.Item>

</FlyOut.List>

</FlyOut>

);

}
```

## العيوب

عند استخدام `React.Children.map` لتوفير القيم، يصبح تداخل المكوّنات محدودًا. فالأبناء *المباشرة* فقط للمكوّن الأب هي التي ستحصل على الخصائص `open` و`toggle`، ما يعني أننا لا يمكننا تغليف أي من هذه المكوّنات داخل مكوّن آخر.

```javascript
export default function FlyoutMenu() {

return (

<FlyOut>

{/* This breaks */}

<div>

<FlyOut.Toggle />

<FlyOut.List>

<FlyOut.Item>Edit</FlyOut.Item>

<FlyOut.Item>Delete</FlyOut.Item>

</FlyOut.List>

</div>

</FlyOut>

);

}
```

استنساخ عنصر عبر `React.cloneElement` يقوم بدمج سطحي. فالخصائص الموجودة أصلًا ستُدمج مع الخصائص الجديدة التي نمرّرها. وقد ينتهي هذا إلى تعارض في التسمية إذا كانت خاصية موجودة بالفعل تحمل الاسم نفسه مثل الخصائص التي نمرّرها إلى الدالة `React.cloneElement`. وبما أن الدمج سطحي، فإن قيمة تلك الخاصية ستُستبدل بأحدث قيمة نمرّرها.

## المراجع

- [Render Props - React](https://reactjs.org/docs/render-props.htm)
- [React Hooks: Compound Components - Kent C. Dodds](https://kentcdodds.com/blog/compound-components-with-react-hooks)
