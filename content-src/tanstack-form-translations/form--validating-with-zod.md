---
title: "التحقّق من الصحة بمخطّط Zod (Validating with ZOD)"
---

## ماذا سنتعلّم؟

حتى الآن كان كل حقل يحمل محقّقه الخاص: دالة تستقبل القيمة وتُعيد نصًّا أو `undefined`. هذا يعمل، لكنه يتضخّم بسرعة؛ فكل قاعدة تحتاج سطورًا، وحين تتشابه قاعدتان بين حقلين تنسخ المنطق وتغيّر الرسالة فقط، حتى يصبح معظم الملف تحقّقًا لا واجهة.

في هذا الدرس نستبدل تلك الدوال بمخطّط (schema) واحد يصف شكل الاستمارة وقواعدها، ونمرّره إلى `validators` حيث كانت توضع الدالة. الفكرة أنّ هذا الموضع لا يطلب دالة بذاتها: تدعم `TanStack Form` كل مكتبة تتبع مواصفة `Standard Schema` — مثل `Zod` و`Valibot` و`ArkType` — فيعمل المخطّط في مستوى الحقل والاستمارة بلا طبقة وسيطة. لكن المخطّط يُعيد كائنات لا نصوصًا، فتتعطّل طريقة العرض التي بنيناها حتى نُعدّلها في كل موضع؛ وهذا هو النصف الثاني من الدرس.

## الشرح

### نبدأ من استمارة بلا تحقّق

يبدأ المؤلف بتنظيف ما بناه سابقًا: يحذف `validators` من `confirmPassword` ثم من `firstName`، فلا يبقى فحص في الحقول. ويُبقي `validationLogic` مع `revalidateLogic` كما هو، لأنّه سياسة توقيت لا قاعدة تحقّق، وسيعود إليه لاحقًا. البدء من استمارة بلا فحص يجعل كل رسالة تظهر بعدها منسوبة إلى المخطّط وحده، لا إلى بقايا درس سابق.

ثم يثبّت الحزمة بالأمر `npm install zod`، فيُضاف سطر واحد إلى آخر قائمة الاعتماد:

```json
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.14",
    "zod": "^4.1.12"
```

ولاحظ الإصدار `^4.1.12`: دعم `Standard Schema` في `Zod` لم يكن موجودًا في الإصدارات القديمة، فمخطّط من إصدار سابق قد لا يُقبل في `validators` بهذا الشكل. ثم يأتي الاستيراد:

```tsx
import {
  formOptions,
  revalidateLogic,
  useForm,
  useStore,
} from "@tanstack/react-form";
import * as z from "zod";
```

السطر الأخير هو الجديد: `import * as z from "zod"`، وهو العُرف الشائع الذي يضع كل باني في المخطّط تحت حرف واحد: `z.string` و`z.object` و`z.array`.

### مخطّط واحد للاستمارة كلها

بدلًا من دالة لكل حقل، يُعرَّف كائن واحد يصف الاستمارة كلها، ويوضع أعلى الملف لأنّه وصف ثابت لا يعتمد على حالة التصيير:

```tsx
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name should be at least 2 characters.")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name should be at least 2 characters.")
    .max(50),
  age: z
    .number()
    .min(18, "You must be at least 18 years old.")
    .max(120, "Age must be less than 120.")
    .optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  email: z.email("Invalid email address.").optional(),
  password: z.string().min(6, "Password should be at least 6 characters."),
  confirmPassword: z.string(),
  address: z.object({
    street: z.string().min(5, "Street should be at least 5 characters."),
    city: z.string().min(2, "City should be at least 2 characters.").optional(),
    state: z
      .string()
      .min(2, "State should be at least 2 characters.")
      .optional(),
    zipCode: z
      .string()
      .min(5, "Zip Code should be at least 5 characters.")
      .optional(),
  }),
  skills: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
      level: z.enum(["beginner", "intermediate", "expert"]),
    })
  ),
});
```

اقرأه بترتيبه، فكل سطر فيه قاعدة:

- `firstName` و`lastName`: نصّ بين حرفين وخمسين حرفًا، مع رسالة لحدّها الأدنى. والحدّ الأقصى بلا رسالة فيعرض `Zod` رسالته الافتراضية، وهو نادر الوصول في هذه الاستمارة.
- `age`: رقم بين ثمانية عشر ومئة وعشرين، ثم `.optional()`، لأنّ الحقل قد يصل فارغًا، والفارغ ليس رقمًا صالحًا.
- `acceptTerms`: قيمة منطقية، ثم قاعدة لا تملكها دوال `Zod` الجاهزة، وهي أن تكون `true`؛ نعود إليها بعد قليل.
- `email`: فحص صيغة البريد بـ`z.email(...)`، و`.optional()` لأنّ الحقل اختياري.
- `password`: ستّة أحرف على الأقل. و`confirmPassword` بلا قاعدة سوى أنّه نصّ، ووجوده في المخطّط ضروري ليصف الشكل كاملًا، وهو شرط اشتقاق النوع بعد قليل.
- `address`: كائن داخل كائن، فالشارع بخمسة أحرف والبقية اختيارية، وتصبح مسارات حقوله `address.street` و`address.city` كما تكتبها في `form.Field`.
- `skills`: مصفوفة من كائنات فيها `name` و`id` و`level`، و`level` تعداد يحصر القيمة في الثلاث التي يعرضها `select`، فيمنع أيّ قيمة رابعة تصل من الشبكة أو من خطأ برمجي.

الفرق الجوهري أنّ الرسالة تسكن بجانب القاعدة التي تنتجها، لا بجانب الحقل الذي يعرضها؛ فتغيير نصّ خطأ صار تعديلًا واحدًا في المخطّط.

### النوع يُشتقّ من المخطّط

قبل الدرس كان هناك `interface` باسم `RegisterForm` يصف القيم، ونوعٌ آخر مكتوب بجانب `defaultValues`. بعد وجود المخطّط صار الوصفان تكرارًا، فيمكن استخراج النوع منه مباشرة:

```tsx
const defaultValues: z.infer<typeof formSchema> = {
  firstName: "",
  lastName: "",
  age: undefined,
  email: "",
  password: "",
  confirmPassword: "",
  address: { street: "", city: "", state: "", zipCode: "" },
  skills: [
    {
      name: "HTML",
      id: crypto.randomUUID(),
      level: "beginner",
    },
    {
      name: "CSS",
      id: crypto.randomUUID(),
      level: "beginner",
    },
    {
      name: "JavaScript",
      id: crypto.randomUUID(),
      level: "beginner",
    },
  ],
  acceptTerms: false,
};

const formOpts = formOptions({
  defaultValues,
});
```

`z.infer<typeof formSchema>` يُقرأ من الداخل: `typeof formSchema` يأخذ نوع قيمة المخطّط، ثم `z.infer` يحوّله إلى نوع البيانات التي يقبلها. النتيجة نوع يتبع القواعد تلقائيًا؛ إن أضفت حقلًا ظهر فيه، وإن غيّرت نوعه تغيّر معك، ولا وصف ثانٍ يتخلّف عن الأول.

لكن القيم نفسها يجب أن تطابق المخطّط. لهذا يأتي `age` بـ`undefined` لا بصفر: الصفر رقم يخضع لقاعدة الحدّ الأدنى فيُرفض، بينما تعفيه `.optional()`. وتأتي المهارات الثلاث بمعرّفات من `crypto.randomUUID()`، لأنّ `id` نصّ مطلوب في المخطّط.

### تمرير المخطّط إلى `useForm`

```tsx
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    },
    validators: {
      onChange: formSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        console.log(formApi, fieldApi);
      },
    },
  });
```

الموضع هو نفسه الذي كانت توضع فيه الدالة: `validators.onChange`. لا حقل جديد ولا مُحوّل خاص، لأنّ `TanStack Form` يتعرّف على المخطّط عبر مواصفة `Standard Schema`؛ ولهذا يعمل السطر نفسه لو كان المخطّط مكتوبًا بـ`Valibot` أو `ArkType`.

و`validationLogic` مع `revalidateLogic` بقي كما بناه المؤلف سابقًا: المخطّط يقول ما هي القواعد، و`validationLogic` يقول متى تُشغَّل، فلا تتكرّر سياسة التوقيت مع كل قاعدة تُضاف.

وأمّا لماذا تُفحَص كل الحقول عند تغيير حقل واحد، فالسبب في المخطّط نفسه: `formSchema` يتحقّق من الكائن كاملًا ولا يعرف أيّ حقل تغيّر، فيُعيد كل مسار مخالف مع كل تغيير. و`TanStack Form` يتولّى التوزيع: كل خطأ يصل إلى `meta.errors` في الحقل الذي يطابق مساره، بلا كود منّا.

### الخطأ صار كائنًا: تعديل العرض

هنا يظهر الثمن. مع الدالة كانت `meta.errors` مصفوفة نصوص و`join(", ")` تكفي لعرضها. أمّا المخطّط فيُعيد كائنات تحمل `message`، و`join` على كائنات تطبع `[object Object]` لا الرسالة. لذلك يتوقّف العرض حتى نُعدّله، كما في حقل الاسم الأول:

```tsx
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-black text-white border border-white p-2 w-full"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <div className="text-red-500 mt-2" role="alert">
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </div>
                )}
```

`map` تستخرج الرسالة من كل كائن، و`?.` تحمي من عنصر بلا قيمة، ثم `join` تجمعها في نصّ واحد. والجمع ضروري لأنّ الحقل قد يحمل أكثر من خطأ في اللحظة نفسها: قيمة قصيرة وقاعدة أخرى تخالفها تنتجان خطأين يقرأهما المستخدم معًا.

هذا الشكل ليس عيبًا بل ميزة، فالكائن يحمل ما يكفي لواجهة أدقّ لاحقًا؛ لكنّه يفرض تعديل كل موضع عرض، ولهذا يمرّ المؤلف على الحقول واحدًا واحدًا وينسخ الكتلة نفسها: الاسم الأول، والشارع، وكلمة المرور، وتأكيدها، وصفّ المهارات، ومربّع الشروط.

### موضعان يحتاجان انتباهًا

أوّلهما صفّ المهارات: الكتلة منسوخة داخل `form.Field` فرعي للصفّ، لكنّها تقرأ `field` لا `subField`، أي حالة حقل المصفوفة لا حالة الصفّ. لا يظهر أثر ذلك هنا لأنّ المستويات الثلاثة `beginner` وهي مسموحة، لكنّه موضع يُخدَع به من يجرّب قيمة رابعة.

والثاني مربّع الشروط، إذ لا `input` له يعرض الخطأ تحته كبقية الحقول، فوضع المؤلف الخطأ بعد `label` لا داخله:

```tsx
        <form.Field name="acceptTerms">
          {(field) => {
            return (
              <div className="mb-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    className="bg-black text-white border border-white p-2"
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Accept Terms
                </label>
                {!field.state.meta.isValid && (
                  <div className="text-red-500 mt-2" role="alert">
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </div>
                )}
              </div>
            );
          }}
        </form.Field>
```

والرسالة ليست مكتوبة هنا، بل تأتي من `z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions." })`. و`refine` باب ما لا تكفيه `min` و`max` و`z.email`: تستقبل القيمة وتُعيد شرطًا، فإن كان كاذبًا صار الحقل غير صالح. وقد جرّب المؤلف القاعدة نفسها على نصّ في الاسم الأول ثم حذفها، لأنّها كانت مثالًا لا طلبًا في التطبيق.

### أخطاء الاستمارة نفسها

بقي موضع قديم فوق الاستمارة يعرض أخطاء الاستمارة ككل، ولم يسلم من تغيّر الشكل. الفرع يُظهر ذلك بأمانة: السطر معلّق ومعه الاشتراك في الخطأ:

```tsx
  const values = useStore(form.store, (state) => state.values);
  const errors = useStore(form.store, (state) => state.errors);

  return (
    <div className="text-start max-w-[400px] p-4">
      {/* {JSON.stringify(errors)} */}
```

`useStore` يشترك في قطعة محدّدة من الحالة، فلا يُعاد تصيير المكوّن إلا حين تتغيّر؛ وهنا القطعة هي `state.errors`. وكانت سابقًا نصوصًا تُطبع بـ`join`، أمّا الآن فما تحمله ليس نصوصًا، فطبع المؤلف `JSON.stringify(errors)` ليفحص شكله، ثم علّق السطر: المخطّط يوزّع الأخطاء على حقولها أصلًا، فطباعة الكائن أعلى الاستمارة تكرار لما يظهر تحتها. ويُبقي `useStore` لأنّ العرض سيُنقل إلى مكوّن منفصل في درس لاحق؛ فالموضع مؤقّت صريح لا سهو.

### الخطأ قبل أن يلمس المستخدم الحقل

لأنّ المخطّط يُشغَّل على الاستمارة كلها، يظهر خطأ حقل لم يلمسه المستخدم: الشارع في لقطة الدرس فارغ وتحته رسالة حمراء، مع أنّ الكتابة كانت في الاسم الأول. سلوك صحيح من جهة الصحة، مزعج من جهة التجربة.

جرّب المؤلف حلًّا بسيطًا: يضيف إلى شرط `!field.state.meta.isValid` قراءة `field.state.meta.isDirty`، فلا يُعرض الخطأ إلا بعد تغيير الحقل، وذكر `isTouched` بديلًا. ثم حذف التعديل لأنّ تنظيف العرض ونقله إلى مكوّن منفصل سيأتي في درس لاحق، ولا معنى لتثبيت شرط في ستّة مواضع ثم إزالته. أبقِ الفرق: `isValid` تسأل «هل القيمة سليمة؟»، و`isDirty` تسأل «هل أتيحت للمستخدم فرصة تصحيحها؟».

## النتيجة

![لقطة استمارة التسجيل بعد ربطها بمخطّط `Zod`: الاسم الأول فيه الحرف A وتحته `First name should be at least 2 characters.` بالأحمر، والشارع فارغ وتحته `Street should be at least 5 characters.`، وكلمة المرور فارغة وتحتها `Password should be at least 6 characters.`، والاسم الأخير وتأكيد كلمة المرور بلا رسالة، وثلاث مهارات مستواها `beginner` وإلى جانب كلّ منها زرّ حذف أحمر، ثم `Add Skill`، ومربّع الشروط غير محدّد وتحته `You must accept the terms and conditions.`، وزرّ الإرسال باهت، وأسفل الاستمارة كتلة القيم بصيغة `JSON`](/images/tanstack-form/form--validating-with-zod--zod-errors.png)

لم يبق محقّق مكتوب بيد: القواعد كلها في `formSchema`، والرسائل الحمراء في الصورة نصوص المخطّط، ولهذا تظهر بالإنجليزية كما كتبها المؤلف في الفرع. وظهور أربع منها معًا سببه أنّ حرفًا واحدًا في الاسم الأول يُشغّل المخطّط على القيم كلها.

الاسم الأخير يظهر بلا رسالة مع أنّ الفرع النهائي يعرض خطأه أيضًا، فاللقطة سُجّلت أثناء المرور على الحقول. أمّا تأكيد كلمة المرور فلا قاعدة له سوى أنّه نصّ. والمهارات الثلاث `beginner` ولا خطأ عليها لأنّ التعداد يقبلها. وزرّ الإرسال باهت لأنّ `canSubmit` كاذبة ما دام في الاستمارة حقل غير صالح، وتحت الاستمارة كتلة القيم: `firstName` بالحرف `A`، وثلاثة معرّفات مهارات، و`acceptTerms` كاذبة.

## جرّب بنفسك

1. اكتب حرفًا واحدًا في الاسم الأول ثم حرفًا ثانيًا: ستختفي الرسالة عند الثاني وحده، لأنّ `min(2)` تُقاس بعدد المحارف، ثم امسح الاسم لترى الخطأ يعود مع كل تغيير.
2. أزل التعليق عن `{JSON.stringify(errors)}` وأرسل استمارة فارغة، ثم قارن ما يظهر بالشكل القديم: كائنات فيها `message` و`path` بدل نصوص مجرّدة.
3. أضف `form.Field` باسم `email` يعرض خطأه بالكتلة الجديدة، واكتب `abc` فيه، لتظهر رسالة `Invalid email address.` من المخطّط دون قاعدة في الحقل.
4. غيّر رسالة `min` في `firstName` إلى نصّ عربي ثم اكتب حرفًا واحدًا: تظهر الرسالة العربية، وقد تغيّر موضع واحد هو المخطّط، وهذا معنى مصدر واحد للقواعد.
5. أضف شرط `field.state.meta.isDirty` إلى عرض خطأ الشارع كما جرّبه المؤلف، واكتب في الاسم الأول فقط: سيختفي خطأ الشارع حتى تعدّل الشارع نفسه.

## المراجع

- [فيديو الدرس: Validating with ZOD](https://www.youtube.com/watch?v=H2T21r5wu3g&t=4367s)
- [شيفرة الدرس: فرع zod-1](https://github.com/alialaa/tanstack-form-course/tree/zod-1)
- [التوثيق الرسمي: التحقّق من الصحة بمكتبات المخطّطات](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
- [التوثيق الرسمي: نظرة عامة على TanStack Form](https://tanstack.com/form/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Validating with ZOD» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي، وما أضافه المعدّ من توضيح لا يُنسب إلى المؤلف.
