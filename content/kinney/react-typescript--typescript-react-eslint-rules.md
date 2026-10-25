---
title: "قواعد ESLint"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/typescript-react-eslint-rules"
---

إليك ما تفعله كل قاعدة:

- **`react/display-name`: 2**: تتطلّب أن تمتلك مكوّنات React خاصية `displayName` (مفيدة أثناء تصحيح الأخطاء وReact DevTools). أما المكوّنات مجهولة الهوية في React.memo() أو React.forwardRef() فستُطلق هذا الخطأ.
- **`react/jsx-key`: 2**: تُلزم بأن للعناصر داخل المصفوفات والمكرِّرات خاصية `key` فريدة. وهي تمنع مشكلات تصيير React ومشاكل الأداء.
- **`react/jsx-no-comment-textnodes`: 2**: تمنع تصيير نص التعليق بالخطأ كمحتوى مرئي (مثلًا، `<div>// comment</div>` كان سيعرض ”// comment” على الشاشة).
- **`react/jsx-no-duplicate-props`: 2**: تمنع الخصائص المكرّرة في عناصر JSX (مثلًا، `<div id="1" id="2" />` خطأ).
- **`react/jsx-no-target-blank`: 2**: تتطلّب `rel="noopener noreferrer"` عند استخدام `target="_blank"` في الروابط، لمنع الثغرات الأمنية (reverse tabnabbing).
- **`react/jsx-no-undef`: 2**: تمنع استخدام مكوّنات غير معرَّفة في JSX (تلتقط الأخطاء الإملائية مثل `<Buton>` بدلًا من `<Button>`).
- **`react/jsx-uses-react`: 2**: تُعلِّم `React` على أنه مستخدَم عند وجود JSX (تمنع أخطاء “React is defined but never used”). اضبطها على 0 مع React 17+ في حالة استخدام تحويل JSX الجديد.
- **`react/jsx-uses-vars`: 2**: تُعلِّم متغيّرات مكوّنات JSX على أنها مستخدَمة (تمنع `<MyComponent>` من إطلاق خطأ “MyComponent is defined but never used”).
- **`react/no-children-prop`: 2**: تمنع تمرير الأبناء كخاصية صراحةً (`<div children="foo" />`) — ينبغي تضمين الأبناء بدلًا من ذلك (`<div>foo</div>`).
- **`react/no-danger-with-children`: 2**: تمنع استخدام `dangerouslySetInnerHTML` وخاصية `children` معًا (لأنهما يتعارضان — React لا يعرف أيّهما يصيّر).
- **`react/no-deprecated`: 2**: تحذّر من توابع React المهمَلة (componentWillMount وcomponentWillReceiveProps وغيرها).
- **`react/no-direct-mutation-state`: 2**: تمنع التعديل المباشر على `this.state` (يجب استخدام `setState()` بدلًا من ذلك). وهي تنطبق فقط على مكوّنات الأصناف.
- **`react/no-find-dom-node`: 2**: تمنع استخدام `ReactDOM.findDOMNode()` المهمَلة — استخدم المراجع (refs) بدلًا من ذلك.
- **`react/no-is-mounted`: 2**: تمنع استخدام تابع `isMounted()` المهمَل (نمط مضاد يشير إلى تصميم شيفرة مشكِل).
- **`react/no-render-return-value`: 2**: تمنع استخدام القيمة المُعادة من `ReactDOM.render()` (فهي مهمَلة وستُزال).
- **`react/no-string-refs`: 2**: تمنع المراجع النصّية (`ref="myRef"`)، وتُلزم باستخدام مراجع دالّة (callback refs) أو `useRef` بدلًا من ذلك.
- **`react/no-unescaped-entities`: 2**: تمنع كيانات HTML غير المُهرَّبة في JSX التي تبدو كالأخطاء الإملائية (مثلًا، ظهور `>` أو `"` كنص).
- **`react/no-unknown-property`: 2**: تمنع خصائص DOM غير المعروفة (تلتقط `class` بدلًا من `className` و`for` بدلًا من `htmlFor`).
- **`react/no-unsafe`: 0**: عند تفعيلها تحذّر من توابع دورة الحياة غير الآمنة (componentWillMount وcomponentWillReceiveProps وcomponentWillUpdate). اضبطها على 0 (معطّلة).
- **`react/prop-types`: 2**: تتطلّب التحقّق عبر PropTypes لخصائص المكوّنات. وغالبًا ما تُعطَّل عند استخدام TypeScript.
- **`react/react-in-jsx-scope`: 2**: تتطلّب وجود `React` في النطاق عند استخدام JSX. اضبطها على 0 مع React 17+ في حالة استخدام تحويل JSX الجديد.
- **`react/require-render-return`: 2**: تُلزم بأن يكون لتابعَي render() في مكوّنات الأصناف جملة إرجاع.
- **`react-hooks/rules-of-hooks`: "error"**: تُلزم بقواعد React Hooks: لا تُستدعى الخُطّافات إلا في المستوى الأعلى، ولا تُستدعى إلا من دوال React. وهي حاسمة لنعمل الخُطّافات على نحو صحيح.
- **`react-hooks/exhaustive-deps`: "warn"**: تحذّر عند نقص الاعتماديات في مصفوفات اعتماديات useEffect وuseCallback وuseMemo. وهي تساعد على منع الأخطاء الناتجة عن الإغلاقات القديمة (stale closures).
