---
title: "التحقق من المدخلات باستخدام Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/input-validation-with-zod"
---

أحد الأساليب الشائعة هو استخدام [React Hook Form](https://react-hook-form.com/) مع [Zod](https://zod.dev/). ويقدّم React Hook Form دعمًا رسميًا لـ Zod عبر محلّل (resolver). ويبدو الإعداد هكذا:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});
type FormData = z.infer<typeof FormSchema>;

function MyFormComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Valid form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {…register("username")} placeholder="Username" />
      {errors.username && <span>{errors.username.message}</span>}

      <input {…register("password")} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

في هذا المثال، يخبر `zodResolver(FormSchema)` مكتبة React Hook Form بأن تستخدم Zod للتحقق من قيم النموذج وفق `FormSchema`. وسيحتوي كائن `errors` على أي أخطاء تحقق (مع رسائلنا المخصّصة، إن وُفّرت في المخطط). ورسالة خطأ كل حقل متاحة بسهولة (مثل `errors.username.message`). ويضمن هذا الإعداد أنه عندما يرسل المستخدم النموذج (أو عند مغادرته الحقول، حسب الإعداد)، يعمل مخطط Zod إمّا فيسمح بالإضافة (مع كون `data` محدّدة الأنواع ومتحقَّقًا منها بالكامل) أو يعيد أخطاء يمكنك عرضها.

وميزة هذا الأسلوب هي **مصدر حقيقة واحد** للتحقق — إذ يمكن استخدام المخطط نفسه على الواجهة الخلفية للتحقق من البيانات الواردة. ويعني ذلك أيضًا ربطًا يدويًا أقل لرسائل الخطأ؛ فتمرّ رسائل Zod وأخطاؤه طبيعيًا إلى النموذج. علاوة على ذلك، بالتحقق على جانب العميل تحسّن تجربة المستخدم بالتقاط الأخطاء مبكرًا (مثل إظهار «يجب أن تتكوّن كلمة المرور من 8 أحرف على الأقل» بمجرد فشل الفحص) بدلًا من انتظار رحلة ذهاب وإياب إلى الخادم.

وحتى إن لم تكن تستخدم مكتبة نماذج، يمكنك مع ذلك استخدام Zod في React باستدعاء `schema.safeParse` يدويًا عند إرسال النموذج مثلًا. فمثلًا، يمكنك استخدام حالة مكوّن React لمدخلات النموذج، وعند الإرسال تنفّذ `const result = FormSchema.safeParse(formState)`. وإذا كان `result.success` مساويًا `false`، فاضبط رسائل الخطأ وفق ذلك؛ وإن كان `true`، فتابع. لكن مكتبات مثل React Hook Form تبسّط هذا بربطها بحالة المكوّن وإعادة تصييره نيابةً عنك.

يساعد Zod في الواجهة الأمامية على الحفاظ على **أمان الأنواع واتساق التحقق**. إذ تستفيد من قواعد التحقق القوية نفسها في المتصفح، ما يؤدي إلى تطبيقات أكثر مرونة. وبفضل تكاملات مثل محلّل React Hook Form، يصبح إعداده مريحًا جدًا — إذ تُوصِل مخططك فحسب وتترك المكتبة تتولّى الباقي.
