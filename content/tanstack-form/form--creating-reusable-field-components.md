---
title: "بناء مكوّنات حقول قابلة لإعادة الاستخدام"
lang: ar
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=6626s"
---

## ماذا سنتعلّم؟

أنهينا الدرس السابق بخُطّاف `useAppForm` جاهز لكنّه فارغ: `createFormHook` بُني بالسياقين وسجلّي مكوّنات خاليين، فلم يتغيّر شيء في الاستمارة. في هذا الدرس نملأ السجلّ الأوّل، `fieldComponents`، ونجني الثمرة التي من أجلها أعدنا الهيكلة: مكوّن حقل واحد يُكتب مرّة ويُستعمل في كلّ حقل من نوعه.

نبني ثلاثة مكوّنات في مجلّد جديد `src/components/form`: صندوق نصّ، ومربّع اختيار، وقائمة منسدلة. كلّ واحد يقرأ الحقل من السياق المحيط بدل أن يستقبله وسيطًا، ويأخذ تسميته ووصفه ومعرّفه خصائصَ عادية. ثم نسجّلها في `src/hooks/form.tsx`، ونستهلكها عبر `form.AppField` الذي يوفّر السياق.

## الشرح

### لماذا لا يكفي `form.Field`؟

في الدرس السابق كان كائن الحقل يصل إلى الواجهة عبر دالة تصيير: `form.Field` ينادي الدالة ويمرّر لها `field`. هذا يعمل ما دام العرض مكتوبًا في المكان نفسه، لكنّه ينتهي عند أوّل مكوّن مستقلّ: المكوّن الجديد يستقبل خصائصه وحده، فلن يعرف أيّ قيمة يقرأ ولا إلى أين يكتب.

لهذا وُجد سياق الحقل. `useAppForm` يلفّ كلّ حقل بالسياق، ومكوّن الحقل يقرأه بخُطّاف `useFieldContext` بلا وسائط، والخُطّاف المستورد يجب أن يكون نفسه المصدَّر من `src/hooks/form-context.tsx`، لأنّ نسخة السياق الثانية لا تعرف شيئًا عن الأولى، فيعود الحقل `undefined` بلا خطأ يشرح السبب.

### مكوّن `TextInput`

ننشئ أوّلًا مجلّد `src/components/form` بجانب مجلّد مكوّنات `shadcn/ui`، ونكتب فيه ملف `TextInput.tsx`. هذا نصّ الملف في فرع الدرس:

```tsx
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "@/hooks/form-context";

export default function TextInput({
  label,
  description,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  description?: string;
  type?: string;
}) {
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {!field.state.meta.isValid && (
        <FieldError>
          {field.state.meta.errors.map((error) => error?.message).join(", ")}
        </FieldError>
      )}
    </Field>
  );
}
```

أهمّ سطر فيه هو `useFieldContext<string>()`. الوسيط النوعي ليس زينة: هو ما يجعل `field.state.value` نصًّا و`field.handleChange` لا يقبل إلّا نصًّا. لو كتبت `useFieldContext<number>()` لرفض المترجم تمرير `e.target.value`. أي أنّ المكوّن يعلن نوع القيمة التي يخدمها، وTanStack Form يتحقّق من ذلك عند التركيب.

بقية الجسم هي الشيفرة نفسها التي كانت مكتوبة داخل الاستمارة، منقولةً لا معاد كتابتها: `value` من حالة الحقل، و`handleBlur` و`handleChange` من واجهة الحقل، ثم كتلة الأخطاء التي تُعرض فقط حين يكون `field.state.meta.isValid` غير صحيح، والأخطاء تُجمع بـ`join(", ")` لعرض أكثر من رسالة في سطر واحد.

### من القيم المثبتة إلى الخصائص

التسمية والوصف ونصّ العنصر النائب كانت مكتوبة داخل المكوّن، وهذا يجعله صالحًا لحقل واحد فقط. لذلك تصبح هذه القيم خصائص: `label` نصّ إلزامي، و`description` نصّ اختياري، و`id` نصّ إلزامي، و`type` نصّ له قيمة افتراضية `"text"`.

ثلاثة قرارات هنا تستحقّ التوقّف. الأوّل أنّ `id` صار خاصية رغم أنّه ليس بيانات عرض: `shadcn/ui` تربط التسمية بالحقل عبر `htmlFor`، فلو تُرك المعرّف ثابتًا لتكرّر في كلّ الحقول وصارت التسميات كلّها تشير إلى حقل واحد. والثاني أنّ `description` اختياري، فيُصيَّر بشرط `description &&` وإلّا ظهر عنصر وصف فارغ يزحزح ما بعده. والثالث أنّ `type` له قيمة افتراضية، فتستعمل المكوّن نفسه للنصّ العادي وكلمة المرور. واختيار أنّ `placeholder` يأخذ قيمة `label` تبسيط مقصود.

### تسجيل المكوّنات في `createFormHook`

المكوّن موجود، لكنّ الخُطّاف لا يعرفه. التسجيل هو ما يجعله مرئيًّا داخل الاستمارة، ويحدث في `src/hooks/form.tsx` الذي كان سجلّاه فارغين:

```tsx
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import TextInput from "@/components/form/TextInput";
import Select from "@/components/form/Select.tsx";
import Checkbox from "@/components/form/Checkbox.tsx";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext: fieldContext,
  formContext: formContext,
  fieldComponents: {
    TextInput: TextInput,
    Select: Select,
    Checkbox: Checkbox,
  },
  formComponents: {},
});
```

هذا الملف صورة الفرع بعد إتمام الدرس، وفيه الثلاثة مسجّلون دفعةً واحدة؛ في الفيديو يسجّل المؤلف صندوق النصّ أوّلًا ويتحقّق منه، ثم يضيف الآخرين. المفتاح في الكائن هو الاسم الذي ستستعمله داخل الاستمارة، والقيمة هي المكوّن: المفتاح `TextInput` يعطي `field.TextInput`، ولو كتبته صغيرًا لأصبح الاستعمال `field.textInput`.

السجلّ الثاني `formComponents` بقي فارغًا لأنّ الدرس كلّه عن الحقول؛ مكوّنات الاستمارة ككتلة، كزرّ إرسال يقرأ `canSubmit`، لها درسها الخاصّ، وهي تحصل على سياق الاستمارة لا على سياق الحقل.

### `form.AppField` بدل `form.Field`

بقي أن نستهلك المكوّن، وهنا التغيير الذي يجب ألّا تنساه: `form.AppField` لا `form.Field`. الأوّل يوفّر سياق الحقل الذي يقرأه `useFieldContext`، والثاني لا يوفّره لأنّه واجهة الطريق الطويل. هذا الحقل الأوّل في الاستمارة بعد التعديل:

```tsx
          <form.AppField name="firstName">
            {(field) => {
              return (
                <field.TextInput
                  id="firstName"
                  label="First Name"
                  description="Your First Name"
                />
              );
            }}
          </form.AppField>
```

قارن هذا بما كان: أحد عشر سطرًا بدل نحو أربعين، وليس فيها `value` ولا `onChange` ولا `onBlur` ولا كتلة أخطاء. اسم الحقل ما زال `name="firstName"`، فالتوصيف النوعي يعمل: اسم غير موجود في المخطّط خطأ يرفضه المترجم، والنوع المستنتج يحدّد `useFieldContext<string>()` في المكوّن. ودالة `children` تستقبل `field` لتسجّل به المكوّن، والمكوّن نفسه يعرف حقله من السياق.

وإن تركت `description` خارج الاستعمال اختفت من الواجهة. ولو نسيت استبدال `form.Field` بـ`form.AppField` لظهر الخطأ في وقت التشغيل لا في الترجمة، لأنّ المكوّن سيبحث عن سياق الحقل فلا يجده.

### تكرار النمط: كلمة المرور والمربّع والقائمة

بعد أن يعمل حقل واحد يصبح الباقي تكرارًا ميكانيكيًّا. حقل كلمة المرور يستعمل `TextInput` نفسه مع تمرير النوع:

```tsx
          <form.AppField name="password">
            {(field) => {
              return (
                <field.TextInput
                  label="Password"
                  id="password"
                  type="password"
                  description="Your password (must be at least 8 characters long)"
                />
              );
            }}
          </form.AppField>
```

هذا هو مكسب القيمة الافتراضية لـ`type`: الحقل يبدو مختلفًا في المتصفّح، والمكوّن واحد، وحقل تأكيد كلمة المرور يتبع النمط نفسه.

أمّا مربّع الاختيار فيحتاج مكوّنًا آخر لأنّ واجهته مختلفة: القيمة `boolean` لا `string`، والحدث `onCheckedChange` لا `onChange`، والتسمية تجلس بجانب المربّع لا فوقه:

```tsx
import { useFieldContext } from "@/hooks/form-context";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";

import { Checkbox } from "../ui/checkbox";

export default function CustomCheckbox({
  label,
  id,
}: {
  label: string;
  id: string;
}) {
  const field = useFieldContext<boolean>();
  return (
    <Field>
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          onBlur={field.handleBlur}
        />
        <FieldContent>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
        </FieldContent>
      </div>
      {!field.state.meta.isValid && (
        <FieldError>
          {field.state.meta.errors.map((error) => error?.message).join(", ")}
        </FieldError>
      )}
    </Field>
  );
}
```

لاحظ `checked === true`: مكوّن `Checkbox` يعطي `boolean | "indeterminate"`، والحقل يقبل قيمة منطقية صريحة، فالتحويل يمنع تمرير الحالة الثالثة التي لا معنى لها في هذا المخطّط. ولاحظ الاسم `CustomCheckbox`، لأنّ الملف يستورد `Checkbox` من `../ui/checkbox`، فلو حمل المكوّن الاسم نفسه لتضارب الاستيرادان. والقائمة المنسدلة تحتاج مكوّنًا ثالثًا لسبب مشابه: قيمتها واحدة من ثلاث، والحدث `onValueChange`:

```tsx
import { useFieldContext } from "@/hooks/form-context";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dropdown({
  label,
  id,
  description,
}: {
  label: string;
  id: string;
  description?: string;
}) {
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value as any)}
      >
        <SelectTrigger id={id} onBlur={field.handleBlur}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="expert">Expert</SelectItem>
        </SelectContent>
      </Select>

      {description && <FieldDescription>{description}</FieldDescription>}
      {!field.state.meta.isValid && (
        <FieldError>
          {field.state.meta.errors.map((error) => error?.message).join(", ")}
        </FieldError>
      )}
    </Field>
  );
}
```

الخيارات الثلاثة مكتوبة في المكوّن لا في خصائصه، لأنّها تخصّ مستوى المهارة وحده؛ ولو أردت قائمة عامّة لنقلتها إلى خاصية. أمّا `value as any` فمساحة تنازل صريحة: مكوّن `Select` يعطي نصًّا عامًّا، والحقل يتوقّع واحدة من ثلاث قيم حرفية.

ثم تُستهلك الثلاثة داخل الاستمارة. في مصفوفة المهارات يستعمل كلّ صفّ القائمة المسجّلة، والاسم في السجلّ `Select` فصار الاستعمال `subField.Select`:

```tsx
                          <form.AppField
                            key={index}
                            name={`skills[${index}].level`}
                          >
                            {(subField) => {
                              return (
                                <subField.Select
                                  label="Skill Level"
                                  id={`skills-${index}-level`}
                                />
                              );
                            }}
                          </form.AppField>
```

هنا مكسبان معًا. الأوّل أنّ `id` يُبنى من الفهرس `skills-${index}-level`، فكلّ صفّ له معرّف فريد وتسميته تشير إلى قائمته، وهذا مستحيل حين يكون المعرّف مثبّتًا في المكوّن. والثاني أنّ `field` في `form.AppField` الأب هو المصفوفة و`subField` في الابن حقل واحد منها.

ومربّع الشروط أقصر استعمال في الملف:

```tsx
          <form.AppField name="acceptTerms">
            {(field) => {
              return <field.Checkbox id="acceptTerms" label="Accept Terms" />;
            }}
          </form.AppField>
```

سطر واحد مقابل الكتلة الطويلة السابقة، ومنه نرى أنّ `id` صار يُمرَّر دائمًا بعد إصلاح المكوّن؛ كان ناقصًا في النسخة الأولى فلم تكن التسمية مرتبطة بالمربّع.

### تنظيف بقايا التجارب

لا يكفي اختصار الحقول؛ كان في الملف بقايا من دروس سابقة. يحذف المؤلف المحقّقات المكتوبة داخل الحقل نفسه (`validators` على مستوى الحقل) و`listeners`، لأنّ التحقّق صار على مستوى الاستمارة عبر `registerFormSchema`. ويحذف أيضًا `form.Subscribe` الذي كان يعرض الاسم الأخير بشرط وجود الاسم الأوّل، فقد كان مثالًا لعرض مشروط.

الحذف ليس تجميلًا: `validators` داخل الحقل كانت ستُضاف إلى تحقّق المخطّط، فترى رسالتين لحقل واحد عند الخطأ، إحداهما من درس قديم. وإزالة `form.Subscribe` تُرجع الاسم الأخير إلى الظهور الدائم، وهو ما تراه في الصورة. أمّا `form.Subscribe` حول زرّي الإرسال فبقي لأنّه يقرأ `canSubmit`، وهو أمر يخصّ الاستمارة لا الحقل.

## النتيجة

![استمارة التسجيل بعد استبدال كلّ حقل بمكوّن مسجَّل: حقول نصّية بعناوينها وأوصافها، وأربع بطاقات مهارات بقوائمها، ثم مربّع الشروط وزرّا الإرسال](/images/tanstack-form/form--creating-reusable-field-components--form.png)

على خلفية داكنة، وفي عمود ضيّق إلى يسار الشاشة، يظهر الحقل الأوّل بتسمية `First Name` وداخله القيمة `Zayd` وتحته `Your First Name`، ثم `Last Name` بعبارته الإرشادية `Last Name` ووصفه `Your Last Name`، ثم `Street` بوصفه `Some Description`، ثم `Password` ووصفه `Your password (must be at least 8 characters long)`، ثم `Confirm Password`. بعدها قسم `Skills` بوصفه `Your skills and expertise.`، وفيه أربع بطاقات كحلية داكنة: `HTML` و`CSS` و`JavaScript` و`New Skill 4`، وفي كلّ بطاقة تسمية `Skill Level` وقائمة تُظهر `Beginner` وزرّ `Remove` أحمر. وجود البطاقة الرابعة يعني أنّ زرّ `Add Skill` العريض تحتها قد ضُغط مرّة. في الأسفل مربّع `Accept Terms` غير محدَّد، ثم زرّا `Save` و`Save & Go back`، وعلى الحافة اليمنى السفلية زرّ لوحة أدوات التطوير الدائري.

ما لا تراه في الصورة هو التغيير الحقيقي: ملف الاستمارة نزل إلى نحو نصف حجمه، ولم يتغيّر سلوك: أخطاء التحقّق تظهر كما كانت، والمخطّط ما زال يحكم الإرسال، والزرّان معطّلان حتى تصبح الاستمارة صالحة.

## جرّب بنفسك

1. احذف `description` من استعمال حقل `Street`، وتحقّق من أنّ الوصف يختفي وحدَه دون أن يترك فراغًا.
2. غيّر مفتاح التسجيل من `TextInput` إلى `textInput` في `src/hooks/form.tsx`، ثم استعمل `field.textInput`: الاسم الذي تكتبه في السجلّ هو الاسم الوحيد المتاح عند الاستعمال.
3. بدّل `useFieldContext<string>()` في `TextInput` إلى `useFieldContext<number>()`، ثم تأمّل رفض المترجم لـ`e.target.value`: النوع يأتي من الحقل المسجَّل لا من المكوّن وحده.
4. استبدل `form.AppField` بـ`form.Field` في حقل `acceptTerms` وحدها: مربّع الاختيار سيشتكي من غياب السياق، وهذا الفرق العملي بين الواجهتين.

## المراجع

- [فيديو الدرس: Creating Reusable Field Components](https://www.youtube.com/watch?v=H2T21r5wu3g&t=6626s)
- [شيفرة الدرس: فرع useAppForm-3](https://github.com/alialaa/tanstack-form-course/tree/useAppForm-3)
- [التوثيق الرسمي: تركيب النماذج في TanStack Form](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition)
- [التوثيق الرسمي: نظرة عامة على TanStack Form](https://tanstack.com/form/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Creating Reusable Field Components» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي. وما أضافه المترجم من توضيح لا يُنسب إلى المؤلف.
