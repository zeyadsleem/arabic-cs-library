---
title: نمط المكوّن من رتبة عليا (HOC)
lang: ar
source: https://www.patterns.dev/react/hoc-pattern/
---
## مشهد يحفّز الحاجة إلى هذا النمط

لديك قاعدة شيفرة React واسعة النطاق. تحتاج كل شاشة إلى إطلاق حدث تحليلي عند التركيب (mount)، لكن فقط عندما يكون المستخدم الحالي قد وافق على التتبّع. رشّ هذا المنطق في كل مكوّن صفحة سيكون مكررًا وسهل النسيان وكارثةً حين تتحدّث حزمة التحليلات.

نمط المكوّن من رتبة عليا (Higher-Order Component، HOC) هو أحد أقدم الحلول في React لمعالجة هذه المشكلات العابرة للطبقات. المكوّن من رتبة عليا مجرد دالة: يقبل مكوّنًا ويعيد مكوّنًا جديدًا يلفّ المكوّن الأصلي بسلوك إضافي. فكّر فيه كأنّه مزخرف (decorator) للمكوّنات.

```javascript
// The shape of every HOC

type HOC<P> = (Wrapped: React.ComponentType<P>) => React.ComponentType<P>;
```

لا يحتاج المكوّن الملفوف إلى معرفة أي شيء عن السلوك الذي يضيفه HOC. هذا الفصل هو جوهر الأمر كله: يركّز مكوّن `Page` على العرض، ويتولى `withAnalytics(Page)` التتبّع بهدوء.

> **تنبيه:** في قاعدة شيفرة جديدة تمامًا، ستستخدم عادةً خطافًا مخصصًا (custom hook) قبل HOC. لا يزال هذا النمط حاضرًا في شيفرة الإنتاج طويلة العمر (`withAuth` و`withTranslation` و`withRouter` و`connect` من React Redux)، ولذلك يستحق الفهم العميق حتى لو كتبت القليل منه بنفسك. سنغطي البدائل الحديثة في نهاية هذه المقالة.

## بناء أول HOC الخاص بك

لننفّذ `withAnalytics`. ينبغي له أن:

- يُطلق حدث `page_view` عند تركيب المكوّن الملفوف للمرة الأولى.
- يقبل `eventName` حتى يمكن إعادة استخدام HOC نفسه لأي شاشة.
- يمرّر كل خاصية إلى المكوّن الملفوف دون تغيير.

```javascript
import { useEffect } from "react";

import { track } from "./analytics";

export function withAnalytics<P extends object>(

Wrapped: React.ComponentType<P>,

eventName: string,

) {

function WithAnalytics(props: P) {

useEffect(() => {

track(eventName, { path: window.location.pathname });

}, []);

return <Wrapped {...props} />;

}

// Helpful in React DevTools

WithAnalytics.displayName = `withAnalytics(${

Wrapped.displayName ?? Wrapped.name ?? "Component"

})`;

return WithAnalytics;

}
```

الاستخدام عبارة عن سطر واحد عند التصدير:

```javascript
function CheckoutPage(props: CheckoutPageProps) {

return <main>{/* ...checkout UI... */}</main>;

}

export default withAnalytics(CheckoutPage, "checkout_viewed");
```

هناك بعض التفاصيل التي يوضحها المثال أعلاه وستنسخها في كل HOC تكتبه تقريبًا:

- **التعميمات (generics) على الخصائص.** يقيّد `P extends object` أنواع المكوّن الملفوف. يحصل مستهلكو `withAnalytics(CheckoutPage, ...)` على IntelliSense كامل لـ`CheckoutPageProps`.
- **`displayName` لأغراض التصحيح.** من دونه، تعرض React DevTools شجرة مليئة بالغلّافات مجهولة الهوية، وهي مشكلة «ما الذي أنظر إليه؟» تحديدًا التي يفترض أن يتجنبها هذا النمط.
- **نشر `{...props}` في النهاية (أو في البداية، عن قصد).** الترتيب الذي تنشر به الخصائص يحدّد أيهما يفوز عند التعارض. نتناول هذه الفخ أكثر من ذلك.

## إضافة السلوك، لا مجرد الآثار الجانبية

يصبح HOCs أكثر إثارة للاهتمام عندما يحقن خصائص (props) يستطيع المكوّن الملفوف قراءتها. يعد `withFeatureFlag` مثالًا كلاسيكيًا: يوفّر متغيرين من المكوّن، ويدع HOC يقرّر أيّهما يُعرض استنادًا إلى خدمة رايات بعيدة.

```javascript
import { useFlag } from "./flagsClient";

export function withFeatureFlag<P extends object>(

flagKey: string,

Treatment: React.ComponentType<P>,

Control: React.ComponentType<P>,

) {

return function WithFeatureFlag(props: P) {

const enabled = useFlag(flagKey);

return enabled ? <Treatment {...props} /> : <Control {...props} />;

};

}

// At the call site:

export const PricingPage = withFeatureFlag(

"pricing_redesign_2025",

PricingPageNew,

PricingPageLegacy,

);
```

لاحظ أن `withFeatureFlag` لا يعرض أي شيء بنفسه. فهو محضّر تبديل (switch). هذا مقبول؛ إذ يمكن أن يكون «السلوك الإضافي» في HOC أثرًا جانبيًا، أو خاصية محقونة، أو عرضًا شرطيًا، أو الثلاثة معًا.

## تركيب HOCs

الغرض الكامل من هذا النمط هو أن HOCs مجرد دوال، والدوال قابلة للتركيب. تبدو طبقة إنتاجية شائعة بالشكل الآتي:

```javascript
export default withErrorBoundary(

withAuthorization(

withAnalytics(CheckoutPage, "checkout_viewed"),

{ requiredRole: "customer" },

),

{ fallback: <SomethingWentWrong /> },

);
```

فور بدء تداخل ثلاثة أو أربعة منها، يصبح موضع الاستدعاء صعب القراءة. وفي ما يلي طريقتان شائعتان لتنظيفه:

```javascript
// 1. Pipe-style composition with a tiny helper

const compose =

(...hocs) =>

(Component) =>

hocs.reduceRight((acc, hoc) => hoc(acc), Component);

export default compose(

withErrorBoundary({ fallback: <SomethingWentWrong /> }),

withAuthorization({ requiredRole: "customer" }),

withAnalyticsEvent("checkout_viewed"),

)(CheckoutPage);
```

```javascript
// 2. A decorator-like factory: each HOC takes its config first,

//    returns the actual (Component) => Component function.

const withAnalyticsEvent = (eventName: string) =>

<P extends object>(C: React.ComponentType<P>) =>

withAnalytics(C, eventName);
```

شاع هذا الأسلوب عبر المكتبة [`recompose`](https://github.com/acdlite/recompose). ويوصي ملف README الخاص بها الآن باستخدام الخطافات (hooks) للشيفرة الجديدة، وقد توقّفت صيانة الحزمة منذ سنوات، وهي إشارة مفيدة إلى المكان الذي تبوأه مجتمع React.

## الفخاخ في الإنتاج

يحتوي نمط HOC على عدد قليل من أنماط الفشل التي يسهل الوقوع فيها. معرفتها أكثر فائدة من حفظ النمط نفسه.

### تعارضات أسماء الخصائص

إذا كان HOC الخاص بك يحقن خاصية تحمل الاسم نفسه الذي يمرّره أحد الوالدين، فهناك خاسر. يعتمد السلوك على ترتيب نشر الخصائص:

```javascript
function withTheme<P extends { theme?: Theme }>(Wrapped: React.ComponentType<P>) {

return (props: Omit<P, "theme">) => {

const theme = useTheme();

// Parent-supplied props win because they are spread last

return <Wrapped theme={theme} {...(props as P)} />;

};

}
```

في قاعدة شيفرة صغيرة، هذا مقبول. وفي قاعدة كبيرة، فضّل وضع الخصائص المحقونة تحت خاصية نطاق مثل `analytics={...}` و`auth={...}` حتى تصبح التعارضات مستحيلة.

### الدوال الساكنة والمراجع لا تمر عبر الغلاف

إن لف `MyComponent` بـHOC ينتج مكوّنًا جديدًا تمامًا. لن توجد أي دالة ساكنة مثل `MyComponent.fetchData` على الغلاف، ولن يمرّ إليه أي `ref` موجَّه، ما لم تتخذ إجراءات إضافية. استخدم [`React.forwardRef`](https://react.dev/reference/react/forwardRef) (أو انتظر سلوك React 19+ حيث يصبح `ref` مجرد خاصية في المكوّنات الدالية)، وأداة مثل `hoist-non-react-statics` إذا احتجت إليها.

### جحيم الغلّافات

يضيف كل HOC عقدة أخرى إلى شجرة المكوّنات. عادةً ما تكون ثلاث أو أربع طبقات مقبولة؛ أما عشر طبقات فيبدأ DevTools فيبدو كدمية روسية وتصبح آثار المكدس مستعصية على الفهم.

```javascript
<WithRouter>

<WithAuth>

<WithTheme>

<WithAnalytics>

<CheckoutPage />

</WithAnalytics>

</WithTheme>

</WithAuth>

</WithRouter>
```

هذا هو أكبر سبب وحيد جعل الخطافات المخصصة تحلّ إلى حد كبير محل HOCs في الشيفرة الجديدة: الخطاف لا يضيف أي عقدة إلى الشجرة.

### HOCs ومصرّف React

يعمل [مصرّف React](https://react.dev/learn/react-compiler) (المحسّن الذي كان يُعرف سابقًا باسم «React Forget») بأفضل صورة عندما يستطيع تحليل جسم المكوّن تحليلًا ساكنًا. تخفي الطبقات الكثيفة من HOCs المنطق خلف استدعاءات دوال معتمة، مما يمنح المصرّف قدرًا أقل من المادة للعمل عليها.

## متى لا تستخدم HOC

استخدم أداة أخرى عندما:

- **يحتاج السلوك إلى تخصيص في كل موضع استدعاء.** الخطاف أكثر صدقًا في ذلك؛ فهو يعيش داخل المكوّن ويظهر التخصيص من الأعلى إلى الأسفل.
- **لا تحتاج إليه إلا في موضع أو موضعين.** لا تبرر التكلفة الإضافية لـHOC (مكوّن إضافي وتوجيه إضافي) إلا عندما تكون إعادة الاستخدام حقيقية.
- **تكون «المنطق المشترك» مجرد غلاف منسّق.** هذا هو الغرض من التركيب باستخدام `children`؛ إذ تتفوق `{...}` على `withCard(...)` في كل مرة.
- **تستخدمه لمشاركة الحالة (state).** إن تجمع بين Context وخطاف مخصص (`const { user } = useAuth()`) فسيكون أوضح على نحو شبه دائم من `withAuth(Component)`.

## البديل الحديث: الخطافات المخصصة

إليك فكرة `useFeatureFlag` نفسها، معادة صياغتها في صورة خطاف:

```javascript
function PricingPage(props: PricingPageProps) {

const showRedesign = useFlag("pricing_redesign_2025");

return showRedesign ? <PricingPageNew {...props} /> : <PricingPageLegacy {...props} />;

}
```

الفروق لافتة:

- لا يوجد مكوّن غلاف، لذا لا توجد عقدة إضافية في الشجرة ولا حاجة إلى إدارة `displayName`.
- منطق التفريع ظاهر *داخل* جسم المكوّن، مما يسهل العثور عليه وتنفيذه خطوة بخطوة في مصحّح الأخطاء.
- الاستدلال على الأنواع في TypeScript تلقائي، ولا حاجة إلى تمارين تعميم معقدة للحفاظ على خصائص المكوّن الملفوف.

تنص وثائق React على ذلك صراحةً: *«في معظم الحالات، تكون الخطافات (Hooks) كافية ويمكن أن تساعد على تقليل التداخل في شجرة المكوّنات.»* ([reactjs.org](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components))

ومع ذلك، ما زالت HOCs تستحق مكانها في بعض المواقف:

- **واجهات مكتبات تحتاج إلى لف أي شكل من المكوّنات.** يعمل `withTranslation` من [react-i18next](https://react.i18next.com/) و`withRouter` الخاص بـReact Router (لا يزال مستخدمًا في قواعد شيفرة `v5`) من دون أن يضطر المستهلك إلى إعادة كتابة مكوّنه على هيئة دالة.
- **المكوّنات الصنفية.** إذا كنت تصون قاعدة شيفرة قديمة لا تزال تشحن مكوّنات صنفية، فـHOC هو الخيار المريح الوحيد لمشاركة المنطق معها.
- **اللف بحدود خطأ أو حدود Suspense.** لا يزال كليهما بحاجة إلى أن يوجد كمكوّن في الشجرة، لذا يُعدّ تغليف HOC معقولًا تمامًا عبر `withErrorBoundary`.

## دراسة حالة واقعية: React Redux

يعد React Redux المثال المرجعي لاستخدام HOC في العالم الحقيقي. طوال عقد من الزمن، كانت طريقة منح مكوّن وصولًا إلى المخزن هي [`connect`](https://react-redux.js.org/api/connect):

```javascript
function CartSummary({ itemCount, total, checkout }) {

return (

<button onClick={checkout}>

Checkout ({itemCount}) — ${total}

</button>

);

}

const mapState = (state) => ({

itemCount: state.cart.items.length,

total: selectCartTotal(state),

});

const mapDispatch = { checkout: checkoutAction };

export default connect(mapState, mapDispatch)(CartSummary);
```

إن `connect` مصنع HOC؛ فـ`connect(mapState, mapDispatch)` يعيد دالة تلتف مكوّنك. كانت هذه الواجهة المهيمنة في تطبيقات React من نحو 2015 إلى 2019.

بعد React 16.8، أطلقت React Redux واجهة قائمة على الخطافات. ويصبح المكوّن نفسه:

```javascript
function CartSummary() {

const itemCount = useSelector((state) => state.cart.items.length);

const total = useSelector(selectCartTotal);

const dispatch = useDispatch();

return (

<button onClick={() => dispatch(checkoutAction())}>

Checkout ({itemCount}) — ${total}

</button>

);

}
```

لا يزال `connect` يعمل ومن المرجح ألّا يُحذف أبدًا، لأن هناك قدرًا كبيرًا من الشيفرة في العالم الحقيقي، لكن كل مثال في وثائق Redux الحديثة يستخدم صيغة الخطاف. هذا الاتجاه نموذجي: تقدّم مكتبة ناجحة HOC، ثم تطلق نسخة قائمة على الخطافات بعد انتشار الخطافات بوصفها الطريقة المعتادة، ثم توصي بهدوء باستخدام الخطاف في الشيفرة الجديدة.

## ما ينبغي تذكّره

- HOC دالة تأخذ مكوّنًا وتعيد مكوّنًا جديدًا مدمجًا فيه سلوك إضافي.
- استخدمه لـ**الاهتمامات العابرة للطبقات غير المخصصة**، مثل المصادقة والتحليلات وحدود الأخطاء ورايات الميزات والقياسات، عبر مواضع استدعاء كثيرة.
- اضبط `displayName` دائمًا، وقرّر استراتيجية للتعامل مع تعارض الخصائص، وفكّر في توجيه المراجع قبل شحن HOC داخل مكتبة.
- فضّل الخطاف المخصص عندما يُستهلك المنطق في موضع أو موضعين فقط، أو عندما يحتاج المستهلك إلى تخصيصه.

## المراجع

- [المكوّنات من رتبة عليا — React (الوثائق القديمة)](https://legacy.reactjs.org/docs/higher-order-components.html)
- [هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
- [`connect` — React Redux](https://react-redux.js.org/api/connect)
- [مصرّف React](https://react.dev/learn/react-compiler)
