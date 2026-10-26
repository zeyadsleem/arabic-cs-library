---
title: "بناء مكوّنات نموذج قابلة لإعادة الاستعمال"
lang: ar
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7262s"
---

## ماذا سنتعلّم؟

في الدرس السابق نقلنا مكوّنات الحقول إلى سجلّ مركزي، فصار استدعاء `field.TextInput` كافيًا لتحصل على حقل كامل بعنوانه ووصفه ورسالة خطئه. بقي في النموذج جزء لم نمسّه: زرّا الإرسال. فكل نموذج يحتاج إلى زر يحفظ، وزرّ يحفظ ثم يعود، وكلاهما يحتاج إلى قراءة `canSubmit` وتعطيل نفسه عند الحاجة. ومع كل نموذج جديد تعيد كتابة الكتلة نفسها.

تلك الكتلة ليست حقلًا، فلا يصحّ وضعها في سجلّ الحقول. لهذا يقدّم `createFormHook` سجلًّا ثانيًا اسمه `formComponents`، موضوعه المكوّنات التي تنتمي إلى النموذج كلّه لا إلى حقل واحد. سنستخرج في هذا الدرس زرّي الإرسال إلى مكوّن مستقل، ونسجّله في ذلك السجل، ثم نتعلّم لماذا لا يعمل هذا المكوّن إلّا داخل غلاف `<form.AppForm>` ولا يحتاج إلى أي خاصية ليعرف النموذج الذي يخدمه.

## سجلّان لا سجلّ واحد

```tsx
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import TextInput from "@/components/form/TextInput";
import Select from "@/components/form/Select.tsx";
import Checkbox from "@/components/form/Checkbox.tsx";
import SubmitButton from "@/components/form/SubmitButton";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext: fieldContext,
  formContext: formContext,
  fieldComponents: {
    TextInput: TextInput,
    Select: Select,
    Checkbox: Checkbox,
  },
  formComponents: {
    SubmitButton: SubmitButton,
  },
});
```

قارن هذا الملف بنسخته في الدرس الماضي: المفاتيح الثلاثة في `fieldComponents` لم تتغيّر، وأُضيف كائن `formComponents` بمفتاح واحد. هذا التمييز هو جوهر الدرس. مكوّن الحقل يُستعمل داخل `form.AppField` ويقرأ الحقل الذي يحيط به، وهذا ما يجعله يعرف اسمه وقيمته وأخطاءه دون أن تُمرّر له. أمّا مكوّن النموذج فيُستعمل في أي مكان داخل النموذج، ويقرأ النموذج نفسه من سياقه. الاثنان يشتركان في أنّ الأسماء المختصرة `form.SubmitButton` و`field.TextInput` تُشتقّ من مفاتيح السجل، فاختيار الاسم هنا قرار واجهة برمجية لا تفصيلًا شكليًّا.

## استخراج زرّي الإرسال

```tsx
import { useFormContext } from "@/hooks/form-context";
import { Button } from "../ui/button";

export default function SubmitButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.canSubmit}>
      {(canSubmit) => (
        <div>
          <Button
            disabled={!canSubmit}
            type="submit"
            onClick={() => form.handleSubmit({ submitAction: "save" })}
          >
            Save
          </Button>
          <Button
            disabled={!canSubmit}
            type="submit"
            onClick={() => form.handleSubmit({ submitAction: "goback" })}
          >
            Save & Go back
          </Button>
        </div>
      )}
    </form.Subscribe>
  );
}
```

الجزء الأول من الملف منسوخ حرفيًّا من النموذج: `<form.Subscribe>` على `canSubmit`، ثم الزرّان مع `disabled` والبيانات الوصفية التي تميّز كل زر عن الآخر. لم نُضف منطقًا جديدًا؛ المهمّ أنّ هذه الكتلة صارت في مكان واحد يُصلَح فيه الخطأ مرة واحدة.

والجزء الثاني هو الجديد فعلًا: `useFormContext()`. حين انتقلت الكتلة إلى ملف مستقل فقدت المتغيّر `form` الذي كان في نطاق النموذج، وكان الحلّ البديهي تمرير النموذج خاصيةً: `<SubmitButton form={form} />`. لكنّ ذلك يعيدنا إلى ما تخلّصنا منه: كل استعمال يحتاج تمريرًا، وكل مكوّن وسيط يحتاج أن يعرف عن النموذج. بدلًا من ذلك يقرأ المكوّن النموذج من `formContext` الذي أنشأناه في الدرس الماضي عبر `createFormHookContexts`، فتصبح الكتلة قابلة للنسخ إلى أي نموذج بلا وسيط.

## لماذا نحتاج `<form.AppForm>`؟

إن وضعت `<form.SubmitButton />` داخل النموذج مباشرة فلن يجد السياق الذي يقرأ منه، لأنّ `formContext` لا يُوفَّر تلقائيًّا. الغلاف `<form.AppForm>` هو الذي يوفّره، تمامًا كما يوفّر `<form.AppField>` سياق الحقل لمكوّن الحقل:

```tsx
      <form.AppForm>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit({ key: "value" });
          }}
        >
```

ولاحظ أنّ الغلاف يحيط بعنصر `<form>` لا بداخله. هذا موضع منطقي: من يملك النموذج هو المكوّن الذي أنشأه بـ`useAppForm`، والغلاف يوزّع مرجعه على ما تحته. لذلك يتغيّر إغلاق الشجرة أيضًا:

```tsx
          <form.SubmitButton />
        </form>
      </form.AppForm>
```

هذان السطران يستبدلان الكتلة التي كانت تحتلّ نحو خمسة وعشرين سطرًا في نهاية الملف. لاحظ أيضًا أنّ اسم المكوّن في السجل `SubmitButton` فاستُعمل `form.SubmitButton`؛ لو أسميته `submitButton` لصار الاستدعاء بحرف صغير، والاختيار بين الحالين مسألة اصطلاح داخل فريقك لا مسألة تقنية.

## ما يتغيّر في النموذج

```tsx
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { revalidateLogic } from "@tanstack/react-form";
import { registerFormOpts, registerFormSchema } from "./shared";
import { useAppForm } from "@/hooks/form";

export default function RegisterForm() {
  const form = useAppForm({
    ...registerFormOpts,
    onSubmit: ({ value, meta }) => {
      console.log(value);
      console.log(registerFormSchema.parse(value));
      console.log(meta);
    },
    validators: {
      onDynamic: registerFormSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
  });
```

بقيت استيرادات النموذج كما هي تقريبًا، لأنّ `Button` ما زال مستعملًا في صفوف المهارات (زر الإزالة وزر الإضافة)، وهو مثال مفيد على أنّ الاستخراج لا يعني حذف كل ما يتعلق بالأزرار: نُقل ما يتكرّر، وبقي ما يخصّ هذا النموذج وحده.

تفصيل يستحقّ الانتباه: النموذج يمرّر بيانات وصفية مختلفة في الموضعين. مُعالج `<form onSubmit>` يمرّر `{ key: "value" }`، بينما يمرّر كل زر `{ submitAction: ... }`، والزرّان من النوع `submit`، فيقع الإرسال مرتين عند الضغط على أحدهما: مرة من `onClick` ومرة من حدث النموذج. الشيفرة كما كتبها صاحب الدورة، وأثرها العملي أن يصل إلى `onSubmit` آخرُ نداء؛ ولهذا جعلنا تنظيف هذا التداخل تمرينًا لا تعديلًا صامتًا.

## النتيجة

![نموذج التسجيل بعد استخراج زرّي الإرسال إلى مكوّن مسجَّل: حقول نصية بأوصافها، وثلاث بطاقات مهارات فيها قائمة مستوى «Beginner» وزر إزالة، ثم زر إضافة مهارة، ثم زرّا الحفظ أسفل الصفحة](/images/tanstack-form/form--creating-reusable-form-components--form.png)

اللقطة هي النموذج بعد النقل، ولا تكشف أي تغيير بصري: حقول الاسم الأول واسم العائلة والشارع وكلمة المرور وتأكيدها، ثم قسم المهارات ببطاقاته الثلاث (`HTML` و`CSS` و`JavaScript`) وفي كلّ منها قائمة المستوى على `Beginner` وزر إزالة أحمر، ثم زر إضافة مهارة، ثم خانة الموافقة وزرّا `Save` و`Save & Go back`.

وهذا هو المطلوب: إعادة التنظيم يجب أن تكون غير مرئية للمستخدم. الدليل على نجاحها ليس في الشكل بل في الملف: خمسة وعشرون سطرًا صارت سطرًا واحدًا، والزرّان يعملان كما كانا، وكل نموذج لاحق يحصل عليهما مجانًا.

## جرّب بنفسك

1. أضف خاصية `label` إلى `SubmitButton` لتغيير نصّ الزرّ الأول من خارج النموذج، ثم اقرأ النصّ داخل المكوّن بدلًا من كتابته ثابتًا.
2. أضف زرًّا ثالثًا للبيانات الوصفية الجديدة نفسها، مثل الحفظ كمسوّدة، دون تكرار منطق `canSubmit`.
3. انقل `<form.AppForm>` إلى داخل `<form>` ثم إلى خارج `<div>` الحاوي، وسجّل رسالة الخطأ التي تظهر في كل حالة.
4. أزل `type="submit"` من الزرّين وأبقِ `onClick`، ثم تحقّق هل ما زال الإرسال يحدث مرتين أم مرة واحدة، واشرح الفرق.
5. اكتب مكوّن نموذج آخر، مثل رسالة خطأ عامة تقرأ `state.errors`، وسجّله في `formComponents` واستعمله بجوار زرّ الإرسال.

## المراجع

- شرح الدرس في دورة TanStack Form: [Creating Reusable Form Components](https://www.youtube.com/watch?v=H2T21r5wu3g&t=7262s)
- شيفرة الفرع الكامل: [مستودع الدورة — الفرع `useAppForm-4`](https://github.com/alialaa/tanstack-form-course/tree/useAppForm-4)
- التوثيق الرسمي لسجلّات المكوّنات وسياقاتها: [تركيب النماذج والمكوّنات](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition)

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Creating Reusable Form Components» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.
