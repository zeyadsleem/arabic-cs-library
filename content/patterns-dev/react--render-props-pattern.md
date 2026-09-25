---
title: نمط خصائص العرض (render props)
lang: ar
source: https://www.patterns.dev/react/render-props-pattern/
---

## مشهد يحفّز الحاجة إلى هذا النمط

أنت تبني `GeolocationProvider` لتطبيق الخرائط. يحتاج المزوّد إلى أن يطلب الإذن من المتصفح، ويشترك في تحديثات الموقع، ويتعامل مع الأخطاء عندما يكون المستخدم غير متصل، وينظّف المراقب عندما يفكّ المستهلك تركيب المكوّن. *المنطق* متطابق في كل مكان يظهر فيه داخل التطبيق، لكن واجهة المستخدم المحيطة به تختلف في كل شاشة: لافتة في صفحة، وعلامة خريطة في أخرى، ولوحة تشخيص مخفية أثناء التطوير.

كيف تنشر المنطق مرة واحدة وتترك لكل مستهلك أن يقرّر ما الذي يُعرض؟

**نمط خصائص العرض (render props)** إحدى الإجابات. لا يقرّر المكوّن الذي يغلّف السلوك كيفية عرض النتيجة. بل يقبل دالة كخاصية، ويستدعي تلك الدالة بالبيانات المتوفرة لديه، ويعرض ما تعيده الدالة بصيغة JSX.

```
type RenderProp<T> = (value: T) => React.ReactNode;

function Geolocation({ render }: { render: RenderProp<GeoState> }) {
  const state = useGeolocation(); // does the actual work
  return <>{render(state)}</>;
}
```

يوصل المستهلك هذا المكوّن عند موضع الاستدعاء، ويقرّر شكل واجهة المستخدم في *هذه* الصفحة:

```
<Geolocation
  render={({ coords, error, status }) => {
    if (status === "pending") return <Spinner />;
    if (error) return <PermissionPrompt error={error} />;
    return <MapMarker lat={coords.latitude} lng={coords.longitude} />;
  }}
/>
```

لا يلزم أن تسمى خاصية العرض باسم `render`. أي خاصية تكون قيمتها دالة تعيد JSX تنطبق عليها هذه القاعدة، سواء كانت `children` أو `renderItem` أو `renderEmpty` أو أي اسم آخر.

## مثال كامل: مدقّق نموذج قابل لإعادة الاستخدام

تخيّل مكوّنًا `` يملك القواعد وحالة (state) الحقول، لكنه يترك للصفحة المستدعية أن تقرّر شكل حقول الإدخال ورسائل الخطأ.

```
import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

type FormApi<T> = {
  values: T;
  errors: Errors<T>;
  isValid: boolean;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  submit: () => void;
};

type Props<T> = {
  initialValues: T;
  validate: (values: T) => Errors<T>;
  onSubmit: (values: T) => void;
  children: (api: FormApi<T>) => React.ReactNode;
};

export function FormValidator<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  children,
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const setField = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (isValid) onSubmit(values);
  };

  return <>{children({ values, errors, isValid, setField, submit })}</>;
}
```

المستهلك حر في عرض النموذج كيفما يشاء، سواء باستخدام نظام تصميم أو تخطيط مخصص أو غلاف معروض على الخادم أو أي شيء آخر:

```
<FormValidator
  initialValues={{ email: "", password: "" }}
  validate={(v) => ({
    email: v.email.includes("@") ? undefined : "Not an email",
    password: v.password.length >= 8 ? undefined : "Too short",
  })}
  onSubmit={(v) => signIn(v)}
>
  {({ values, errors, isValid, setField, submit }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <TextField
        label="Email"
        value={values.email}
        error={errors.email}
        onChange={(v) => setField("email", v)}
      />
      <TextField
        label="Password"
        type="password"
        value={values.password}
        error={errors.password}
        onChange={(v) => setField("password", v)}
      />
      <PrimaryButton type="submit" disabled={!isValid}>
        Sign in
      </PrimaryButton>
    </form>
  )}
</FormValidator>
```

لاحظ أن `FormValidator` لا يعرض حقول الإدخال أو التسميات أو الأزرار. فهو منطق خالص مع منفذ عرض.

## صيغة «الأبناء في صورة دالة»

يستخدم المثال أعلاه أصلًا صيغة الأبناء في صورة دالة. وهي أكثر الصيغتين ملاءمة؛ إذ تختارها معظم المكتبات الحديثة لأن تمرير JSX بين وسمَي البداية والنهاية يُقرأ بطبيعية أكثر من خاصية `render={...}` الصريحة. والآلية متطابقة: `children` مجرد خاصية تكون قيمتها الدالة التي تمررها بين الوسمين.

سترى الصيغتين في الاستخدامات العملية:

```
// Explicit render prop
<Subscribe topic="orders" render={(orders) => <OrderList orders={orders} />} />

// children-as-function
<Subscribe topic="orders">
  {(orders) => <OrderList orders={orders} />}
</Subscribe>
```

تعرض بعض المكتبات، مثل Formik تاريخيًا و[Downshift](https://github.com/downshift-js/downshift)، الصيغتين كلتيهما من أجل التوافق مع الإصدارات السابقة. اختر أسلوبًا واحدًا لكل قاعدة شيفرة والتزم به.

## عدة خصائص عرض في مكوّن واحد

يمكن أن يقبل المكوّن عدة خصائص عرض، تكون كل واحدة مسؤولة عن موضع مختلف. هذا في جوهره واجهة «مواضع» (slots) مكتوبة الأنواع:

```
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
};

function List<T>({ items, renderItem, renderEmpty, renderHeader }: ListProps<T>) {
  if (items.length === 0) return <>{renderEmpty?.()}</>;
  return (
    <section>
      {renderHeader?.()}
      <ul>{items.map((it, i) => <li key={i}>{renderItem(it, i)}</li>)}</ul>
    </section>
  );
}
```

صمد هذا الأسلوب، الذي يعتمد على مواضع عرض صغيرة ومكتوبة أنواعها جيدًا، صمودًا أفضل من أغلفة خصائص العرض الاحادية. وهو في جوهره الأسلوب الذي تعمل به `` في React Native (`renderItem` و`ListEmptyComponent` و`ListHeaderComponent`) منذ سنوات.

## أين تظل خصائص العرض مفيدة

في قاعدة شيفرة عام 2025، لم تعد خصائص العرض الأداة الافتراضية لمشاركة المنطق؛ أصبحت الخطافات (hooks) هي كذلك. لكن النمط يظل مفيدًا في بعض الحالات التي تواجه فيها الخطافات صعوبة:

- **المكوّنات التي تحتاج إلى امتلاك شجرة فرعية وإدراج JSX الخاص بالمستهلك فيها.** فكّر في أغلفة السحب والإفلات مثل [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd)، التي تتيح لك وسيطي `provided` و`snapshot` لربطهما بـ JSX الخاص بك. يمكن للخطاف أن يوفّر لك الحالة، لكنه لا يستطيع التفاف JSX داخل حدود ``/``.
- **مكتبات المكوّنات بلا واجهة.** تستخدم [Downshift](https://github.com/downshift-js/downshift) و[React Aria](https://react-spectrum.adobe.com/react-aria/) (واجهات `*Builder` فيها) و[TanStack Table](https://tanstack.com/table) كلها خصائص العرض أو الأبناء في صورة دوال، حتى تتمكن من توفير *السلوك* (إمكانية الوصول، ومعالجة لوحة المفاتيح، وإدارة التركيز) من دون فرض ترميز محدد.
- **عناصر الحركة الأساسية.** يستخدم `` من [Framer Motion](https://www.framer.com/motion/) و`Transition` من React Spring الأبناء في صورة دوال لتمرير القيم المستقيمة إلى JSX الخاص بك في كل إطار.

القاسم المشترك: تتفوق خصائص العرض عندما يحتاج الغلاف إلى أن *يكون* جزءًا من شجرتك (لأنه يوفّر سياقًا أو مراجع أو بوابة) *وأيضًا* عندما يحتاج المستهلك إلى كتابة JSX داخله.

## متى لا تستخدم خصائص العرض

- **لمشاركة البيانات الخالصة.** إذا لم يكن وجود مكوّن غلاف إلا لاستدعاء `props.children(data)`، فسيكون الخطاف المخصص أنظف على نحو شبه دائم. فـ`const data = useThing()` أفضل من `{(data) => ...}` من حيث سهولة القراءة.
- **عندما تضطر إلى تداخل عدة منها.** يصبح مكوّن `` داخل مكوّن `` سريعًا [ألم أهرامات الاستدعاءات](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)) التي صُممت الخطافات جزئيًا لحلها.
- **عندما يعرض المستهلك الشيء نفسه دائمًا.** هذا هو غرض المكوّن العادي مع الخصائص. لا تكلّف خصائص العرض ثمنها إلا عندما يختلف الناتج المعروض على نحو مشروع بين مواضع الاستدعاء.

## تحديث خصائص العرض إلى الصيغة الحديثة باستخدام الخطافات

شجعت معظم المكتبات التي روّجت لنمط خصائص العرض على إطلاق واجهة للخطافات إلى جانبها. ما زالت مكوّنات `` و`` في Apollo مصدَّرة، لكن الوثائق تبدأ الآن بـ`useQuery` و`useMutation`. واستبدل React Router مكوّن `` بمكوّن `` وخطافي `useParams` و`useLoaderData`. وانتقل مستخدمو Formik إلى حد كبير إلى واجهة React Hook Form التي تبدأ بالخطافات.

إليك مشكلة `Geolocation` نفسها في أعلى هذه المقالة، لكن هذه المرة في صورة خطاف مخصص:

```
function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "pending" });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", error: new Error("Unsupported") });
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) =>
        setState({
          status: "ok",
          coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        }),
      (err) => setState({ status: "error", error: err }),
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}

// At the call site:
function NearbyStores() {
  const geo = useGeolocation();
  if (geo.status === "pending") return <Spinner />;
  if (geo.status === "error") return <PermissionPrompt error={geo.error} />;
  return <StoreMap lat={geo.coords.latitude} lng={geo.coords.longitude} />;
}
```

طبقتان أقل من التوجيه غير المباشر، ولا عقدة إضافية في الشجرة، ولا وسائط مغلقة يلزمك استنتاجها. لهذا تواصل معظم الفرق مع استخدام الخطاف أولًا.

## المفاضلات في لمحة

**نقاط القوة**

- **لا تعارضات في الأسماء.** على خلاف المكوّنات من رتبة عليا (higher-order components، HOCs)، تمرّر خصائص العرض البيانات صراحةً كوسائط للدالة. لا يحدث دمج ضمني للخصائص، وتدفق البيانات ظاهر عند موضع الاستدعاء.
- **أقصى مرونة للمستهلك.** لا يفرض المكوّن الذي يملك المنطق أي ترميز، وهذا تحديدًا سبب حب المكتبات بلا واجهة لهذا النمط.
- **توافق ممتاز مع تعميمات TypeScript.** توفّر الصيغة ` renderItem={item => ...}>` لك معامل `item` مكتوب أنواعه بالكامل مجانًا.

**نقاط الضعف**

- **أهرامات الاستدعاءات.** يصبح تداخل عدة مكوّنات باستخدام خصائص عرض لمصادر بيانات متعددة صعب القراءة بسرعة؛ في المقابل، استدعاءات الخطافات المسطحة أسهل.
- **تكلفة إعادة العرض (re-render).** إنشاء دالة مضمّنة جديدة عند كل عرض من المكوّن الأصل ليس مشكلة في كل تطبيق تقريبًا، لكنه في المسارات الحرجة للأداء قد يُبطل التخزين المؤقت (memoization). يساعد مصرّف React هنا، لكنه ليس سحرًا.
- **مفهوم إضافي يجب تعليمه.** على المساهم الجديد أن يدرك أن `children` يكون أحيانًا دالة.

## ما ينبغي تذكّره

- خاصية العرض خاصية قيمتها دالة تعيد JSX. المكوّن المالك يشغّل المنطق ويستدعي الخاصية لعرضه.
- يتألق النمط في المكتبات **بلا واجهة**، مثل السحب والإفلات والحركة وإمكانية الوصول وبناء الجداول، حيث لا تستطيع المكتبة فرض الترميز.
- لمشاركة البيانات العادية، يكون الخطاف المخصص عادةً أوضح وأقل تسطحًا وأكثر ملاءمة لمصرّف React.
- إذا وجدت نفسك تكتب غلافًا وظيفته الوحيدة هي `return props.children(data)`، فإن هذا الغلاف يحتاج إلى أن يكون خطافًا.

## المراجع

- [خصائص العرض — React (الوثائق القديمة)](https://legacy.reactjs.org/docs/render-props.html)
- [هل تحل الخطافات محل خصائص العرض والمكوّنات من رتبة عليا؟ — أسئلة React الشائعة](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
- [Downshift — مكتبة combobox بلا واجهة مبنية على خصائص العرض](https://github.com/downshift-js/downshift)
- [React Aria — عناصر وصولية تستخدم خصائص العرض للسلوك](https://react-spectrum.adobe.com/react-aria/)
