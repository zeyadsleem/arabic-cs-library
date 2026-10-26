---
title: "استخدام مكوّنات shadcn: حين تتغيّر الواجهة ويبقى العقد"
lang: ar
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=5718s"
---

## ماذا سنتعلّم؟

حتى الآن كانت استمارتنا تعمل، لكن عناصرها وسوم `input` و`button` خامّة، والتنسيق مكتوب يدويًا في كلّ موضع. هذا مقبول في درس، وغير مقبول في تطبيق: لا أحد يعيد كتابة تنسيق الحقل في كلّ استمارة. الحلّ المعتاد مكتبة مكوّنات، وفي درسنا هذا المكتبة هي `shadcn/ui`.

الفكرة التي يثبتها الدرس ليست «كيف نُنسّق الحقول»، بل أين تنتهي مسؤولية `TanStack Form` وأين تبدأ مسؤولية المكتبة. `TanStack Form` لا يرسم شيئًا بنفسه: يحتفظ بالقيم والأخطاء وحالة كلّ حقل، ويترك التصيير لك. فإن غيّرنا طبقة التصيير وحدها، وجب أن تبقى الاستمارة تعمل كما كانت: التحقّق من الصحة، والحقول المرتبطة، ومصفوفة المهارات، والإرسال. لذلك نستبدل كلّ عنصر بمكوّن من المكتبة، ونفحص عند كلّ استبدال العقد نفسه: القيمة تدخل إلى العنصر، والتغيير يعود إلى الاستمارة، والمغادرة تُعلِم الحقل، والخطأ يُعرض في مكانه.

## الشرح

### ما تضيفه المكتبة فعلًا

نبدأ بإضافة المكوّنات التي نحتاجها من الطرفية بالأمر `npx shadcn@latest add field input select checkbox button`. لكن ما يحدث بعد الأمر هو الأهم: هذه المكتبة لا تُثبّت حزمة مكوّنات جاهزة تستوردها كما تستورد `React`، بل تنسخ ملفات مصدر إلى `src/components/ui/` فتصبح شيفرة تملكها وتعدّلها، وتضيف في المقابل الحزم التي تعتمد عليها تلك الملفات. مقتطف من `package.json` في فرع الدرس يبيّن ما أُضيف:

```json
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@tailwindcss/vite": "^4.1.14",
    "@tanstack/react-devtools": "^0.7.4",
    "@tanstack/react-form": "^1.23.6",
    "@tanstack/react-form-devtools": "^0.1.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.14",
    "zod": "^4.1.12"
  },
```

ما نراه هنا هو تركيب المكوّنات التي سنستعملها: `@radix-ui/react-select` و`@radix-ui/react-checkbox` تمنح السلوك الجاهز — لوحة مفاتيح، وإدارة تركيز، وسمات وصولية — و`class-variance-authority` تصف أشكال المكوّن وأحجامه، و`lucide-react` يرسم الأيقونات الصغيرة داخل القائمة المنسدلة وخانة الاختيار. أمّا `clsx` و`tailwind-merge` فلهما وظيفة واحدة تظهر في مساعدٍ صغير يُستعمل في كلّ ملف من ملفات المكتبة:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

الدالة `cn` تدمج أصناف `Tailwind` القادمة من الخارج مع أصناف المكوّن الافتراضية، و`tailwind-merge` يحلّ التعارض بينهما لصالح ما مرّرتَه أنت. هذا هو سبب قدرتك على كتابة `className` على أيّ مكوّن من المكتبة دون أن تفسد مظهره الأساسي.

### العقد الثلاثي: القيمة والتغيير والمغادرة

كلّ حقل في `TanStack Form` يسلّمك دالة تصيير (`render prop`) تستقبل كائن الحقل. هذا الكائن هو كلّ ما تحتاجه المكتبة لتعمل: `field.state.value` القيمة الحالية، و`field.handleChange` لإبلاغ الاستمارة بالتغيير، و`field.handleBlur` لإبلاغها بأن المستخدم غادر الحقل. الحقل الأول في فرع الدرس بعد الاستبدال:

```tsx
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>Your First Name.</FieldDescription>
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </FieldError>
                  )}
                </Field>
```

لاحظ ما تغيّر وما لم يتغيّر. تغيّر الغلاف: `Field` و`FieldLabel` و`FieldDescription` بدل `div` و`label` و`p`. ولم يتغيّر القلب: `value` و`onBlur` و`onChange` بالمعنى نفسه، مع فارق واحد صغير هو أن `Input` مكوّن `React` يستقبل الحدث كما يتلقّاه العنصر الأصلي، فتمرّر `e.target.value` إلى `handleChange`.

ولو حذفت واحدًا من الثلاثة لظهر الخلل فورًا. بدون `value` يصبح العنصر غير مضبوط، فتكتب فيه ويبقى مخزن الاستمارة فارغًا، ثم ترفض الاستمارة الإرسال بلا سبب ظاهر. وبدون `handleChange` لا تصل القيمة إلى المخزن أصلًا، فلا يعمل المستمع (listener) الذي يفرّغ حقل الاسم الأخير حين يُفرَّغ الاسم الأول، ولا يظهر حقل الاسم الأخير لأنه مربوط بـ`form.Subscribe` على قيمة الاسم الأول. وبدون `handleBlur` لا يُعلَّم الحقل كمُلامَس، ولا يعمل التحقّق عند المغادرة بعد أوّل إرسال، لأن `revalidateLogic` في هذه الاستمارة يعمل بـ`modeAfterSubmission: "blur"`.

### التغليف: `Field` و`FieldGroup` و`FieldSet`

المكوّنات الجديدة لا تغيّر البيانات، لكنها تضيف بنية وتنسيقًا. هذا مقتطف من `src/components/ui/field.tsx` يبيّن ثلاثة منها:

```tsx
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}
```

`FieldGroup` هو `div` بسيط مهمّته الفراغ الرأسي بين الحقول المتتالية؛ من دونه تلتصق الحقول ببعضها لأن النسخة السابقة كانت تعتمد على هوامش مكتوبة يدويًا في كلّ حقل. و`Field` هو الغلاف الذي يحمل `role="group"` ويضبط الاتجاه رأسيًا افتراضيًا، وفيه أيضًا تنسيق `data-[invalid=true]:text-destructive` الذي يجعل نصّ الحقل كلّه بلون الخطأ عند الحاجة. أمّا `FieldSet` و`FieldLegend` فهما `fieldset` و`legend` حقيقيان، فنستعملهما لمجموعة المهارات: حقول لها عنوان واحد يقرأه قارئ الشاشة مع كلّ حقل.

### الأخطاء: `FieldError` بدل `div` اليدوي

قبل هذا الدرس كنّا نعرض الأخطاء في `div` نكتبه بأنفسنا بعد ضمّ رسائل الخطأ بفاصلة. المكتبة تعطينا مكوّنًا يفعل ذلك بذكاء أكبر:

```tsx
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}
```

ثلاثة تفاصيل تستحقّ الانتباه. أولًا المكوّن يقبل خاصية `errors` ويقبل أيضًا `children` مباشرة، والدرس يستعمل الشكل الثاني فيمرّر النصّ المضموم. ثانيًا حين تتكرّر الرسالة نفسها — وهو شائع حين يطلق أكثر من مدقّق الخطأ ذاته — يزيل التكرار بـ`Map` قبل العرض، فلا يقرأ المستخدم الجملة نفسها مرتين. ثالثًا إن تعدّدت الرسائل المتبقية عرضها قائمة نقطية، وإن لم يبقَ شيء أعاد `null` فلم يحتلّ مساحة في الصفحة. ومع ذلك يبقى حوله في الدرس شرط `!field.state.meta.isValid`، وهو شرط «متى نعرض» لا «ماذا نعرض».

### الحقول النصّية: الاستبدال الرخيص

الاسم الأخير والشارع وكلمتا السرّ كلّها حقول نصّية، والفرق بينها وبين الاسم الأول سطر واحد:

```tsx
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
```

`type="password"` هو كلّ ما يميّز حقل كلمة السر؛ العقد نفسه: `value` من `field.state.value`، و`onBlur` إلى `field.handleBlur`، و`onChange` إلى `field.handleChange`. وهنا يظهر خطأ شائع لا يظهر في الشيفرة: يجب أن يطابق `htmlFor` في `FieldLabel` قيمة `id` في `Input`، وإلا نقر المستخدم على العنوان فلم ينتقل المؤشّر إلى الحقل، وفقد قارئ الشاشة اسم الحقل. لاحظ أن معرّف عنوان «Accept Terms» في فرع الدرس لا يقابل أيّ `id` على `Checkbox`، فالنقر على العنوان هناك لا يفعل شيئًا.

### مصفوفة المهارات: `Select` يختلف في الأسماء لا في المعنى

مصفوفة المهارات هي الجزء الذي يفضح الفرق بين مكتبة وأخرى. الحقل نفسه مُعرَّف بـ`mode="array"`، ونضيف عنصرًا بـ`pushValue` ونحذف بـ`removeValue`، ويبقى كلّ مستوى داخل المصفوفة حقلًا مستقلًا باسم `skills[${index}].level`:

```tsx
                                <Field>
                                  <div className="flex  gap-2 ">
                                    <FieldLabel>{skill.name}</FieldLabel>
                                    <Select
                                      value={subField.state.value}
                                      onValueChange={(value) =>
                                        subField.handleChange(value as any)
                                      }
                                    >
                                      <SelectTrigger
                                        onBlur={subField.handleBlur}
                                      >
                                        <SelectValue placeholder="Choose department" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="beginner">
                                          Beginner
                                        </SelectItem>
                                        <SelectItem value="intermediate">
                                          Intermediate
                                        </SelectItem>
                                        <SelectItem value="expert">
                                          Expert
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>

                                    <Button
                                      variant="destructive"
                                      type="button"
                                      onClick={() => field.removeValue(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>

                                  {!field.state.meta.isValid && (
                                    <FieldError>
                                      {field.state.meta.errors
                                        .map((error) => error?.message)
                                        .join(", ")}
                                    </FieldError>
                                  )}
                                </Field>
```

هنا تتغيّر أسماء الخصائص لأن المكوّن ليس عنصر HTML: جذر `Select` ليس عقدة في الصفحة، فيأخذ `value` و`onValueChange` بدل `onChange`، والقيمة تصل إلى النداء مباشرة لا داخل حدث. أمّا `onBlur` فيُمرَّر إلى `SelectTrigger`، أي إلى الزرّ الذي يراه المستخدم، لأن الجذر نفسه لا يستقبل تركيزًا ولا مغادرة. والخيارات تُوضع داخل `SelectContent` بـ`SelectItem` لكلّ قيمة. وتجد في الشيفرة `handleChange(value as any)`، وهي صياغة قسرية لأن قيمة القائمة تصل كنصّ عام بينما نوع الحقل في المخطّط تعداد (`enum`) محدود؛ في تطبيق أكبر يُفضَّل التحقّق من القيمة قبل تمريرها بدل القسر.

هذه هي الملاحظة العملية التي يشدّد عليها الدرس: عند الانتقال من مكتبة إلى أخرى لا تسأل «أين `onChange`؟» بل «أين يصل التغيير، وأين تُلتقط المغادرة، وما شكل القيمة الواصلة؟».

### خانة الاختيار: `checked` بدل `value`

الشيء نفسه يتكرّر مع الموافقة على الشروط، لكن باسمين مختلفين:

```tsx
                <Field>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                      onBlur={field.handleBlur}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
                        Accept Terms
                      </FieldLabel>
                    </FieldContent>
                  </div>
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </FieldError>
                  )}
                </Field>
```

القيمة المنطقية تُمرَّر إلى `checked` لا إلى `value`، والتغيير يصل عبر `onCheckedChange`. ولأن مكوّن `Checkbox` مبني على عنصر `Radix` قد يكون في حالة وسطى، فنوع الوسيط ليس `boolean` خالصًا، ولذلك كتب الدرس `field.handleChange(checked === true)` ليضمن أن المخزن يستقبل قيمة منطقية فقط. وهذا أيضًا سبب استعمال `FieldContent` هنا: صفّ أفقي يجعل المربّع بجانب عنوانه بدل أن يعلوه.

### الأزرار: `canSubmit` يبقى الحكم

لم يبقَ من HTML الخام شيء، حتى أزرار الإرسال:

```tsx
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
```

`form.Subscribe` يشترك في `state.canSubmit` وحده، فلا يُعاد تصيير الأزرار مع كلّ حرف يُكتب في الاستمارة. و`Button` يمرّر خصائصه إلى زرّ HTML أصلي، فيبقى `type="submit"` و`disabled` يعملان كما كانا، ويبقى `form.handleSubmit` هو المسؤول عن الإرسال مع حمولة مختلفة لكلّ زرّ. وفي الوقت نفسه تحمل أزرار المصفوفة — «Remove» و«Add Skill» — الخاصية `type="button"`، وإلا لأرسلت الاستمارة كلّها عند حذف مهارة.

## النتيجة

![استمارة التسجيل بعد استبدال عناصرها بمكوّنات shadcn: حقول معنونة بوصف تحتها، وقائمة مهارات بقوائم منسدلة وأزرار حذف حمراء، وخانة موافقة، وزرّا إرسال، وأسفلها معاينة القيم](/images/tanstack-form/form--using-shadcn-components--form.png)

في الصورة نرى الاستمارة في عمود ضيّق على خلفية داكنة، وقد صار لكلّ حقل عنوان بارز ووصف صغير باهت تحته: الاسم الأول، ثم الشارع، ثم كلمة السر، ثم تأكيدها. تحت عنوان «Skills» ظهرت المهارات الثلاث — `HTML` و`CSS` و`JavaScript` — كلّ واحدة في صفّ يحمل قائمة منسدلة تعرض `Beginner` وزرًّا أحمر «Remove»، ثم زرّ عريض «Add Skill» يمتدّ على عرض العمود. بعدها مربّع اختيار فارغ بجانب `Accept Terms`، ثم زرّان: `Save` و`Save & Go back`. وأسفل الاستمارة تظهر معاينة القيم كـ`JSON`، وفيها `firstName` و`lastName` و`password` فارغة، والمهارات الثلاث بأسمائها ومعرّفاتها ومستواها `beginner`، و`acceptTerms` بقيمة `false`. ولاحظ أن حقل الاسم الأخير غائب عن الصورة: يظهر فقط بعد كتابة الاسم الأول، وقد كانت هذه الاستمارة فارغة عند التصوير.

المهم أن المظهر تغيّر كاملًا وبقي السلوك مطابقًا: نفس التحقّق، ونفس الربط، ونفس منع الإرسال قبل الموافقة.

## جرّب بنفسك

1. استبدل محتوى `FieldError` بخاصية `errors` بدل النصّ المضموم: `errors={field.state.meta.errors}`، ثم أرسل الاستمارة فارغة وقارن ما يُعرض حين يخطئ حقل واحد وحين يخطئ حقلان.
2. احذف `onBlur` من `SelectTrigger`، أرسل الاستمارة، ثم غادر القائمة المنسدلة وعُد إليها؛ ستجد أن التحقّق عند المغادرة لم يعد يعمل.
3. اجعل زرّ «Remove» من نوع `type="submit"` بدل `type="button"`، ثم احذف مهارة وراقب إرسال الاستمارة. هذه أسرع طريقة لفهم لماذا يُحدَّد نوع كلّ زرّ صراحةً.
4. أضف `orientation="horizontal"` إلى `Field` الخاصّ بالاسم الأول وراقب كيف ينتقل العنوان إلى جانب الحقل بفضل تنسيقات `Field` نفسها، بلا تعديل في منطق الاستمارة.
5. أضف `id` إلى `Checkbox` واجعله مطابقًا لـ`htmlFor` في عنوان «Accept Terms»، ثم انقر العنوان وتأكّد من تبديل المربّع.

## المراجع

- [فيديو الدرس: Using shadcn Components](https://www.youtube.com/watch?v=H2T21r5wu3g&t=5718s)
- [شيفرة الدرس: فرع shadcn-components](https://github.com/alialaa/tanstack-form-course/tree/shadcn-components)
- [التوثيق الرسمي: المفاهيم الأساسية في TanStack Form](https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts)
- [التوثيق الرسمي: نظرة عامة على TanStack Form](https://tanstack.com/form/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Using shadcn Components» في دورة TanStack Form التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي. وما أضافه المترجم من توضيح أو تنبيه لا يُنسب إلى المؤلف.
