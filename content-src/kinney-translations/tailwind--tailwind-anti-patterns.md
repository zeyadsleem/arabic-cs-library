---
title: "الأنماط المضادة"
---

## الإفراط في استخدام توجيه `@apply`

استخدام `@apply` لتضمين الأصناف المساعدة:

```css
/* ❌ Anti-pattern */
.btn {
  @apply bg-blue-500 px-4 py-2 text-white;
}
```

هذا ينهار لعدة أسباب:

- يكسر نموذج الأولوية للأدوات
- ينشئ أنماطًا غير مرنة
- لا تعمل المتغيّرات كما هو متوقع في Tailwind 4
- يزيد حجم حزمة CSS

**استخدمه *فقط* من أجل**: تجاوزات مكتبات الطرف الثالث أو احتياجات التوافق.

## توقّع سلوك المتغيّرات في مكوّنات `@layer`

تعريف أنماط مخصصة في مكوّنات `@layer` مع توقّع دعم المتغيّرات:

```css
/* ❌ Anti-pattern in Tailwind 4 */
@layer components {
  .my-button {
    background: blue;
  }
}
/* hover:my-button won't work */
```

**الإصلاح:** استخدم `@utility` لدعم المتغيّرات:

```css
/* ✅ Correct approach */
@utility my-button {
  background: blue;
}
```

## تجاهل المعمارية القائمة على المكوّنات

من الواضح أنك تستطيع استخدام Tailwind *دون* مكوّنات، لكن سرعان ما يتضح كم يمكن أن يصبح هذا صعبًا.

*تجاهل المعمارية القائمة على المكوّنات — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e4958d62b8ab1c724f2f6772aef503e9eab7bbdc74d4e28d2b9f8074c5f75c90.html)*

```html
<div class="space-x-2">
  <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
    Button
  </button>
  <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
    Button
  </button>
  <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
    Button
  </button>
</div>
```

**الإصلاح:** استخدم أُطر المكوّنات لتجنب التكرار. لديك خيارات: React وSvelte وAngular وVue وغيرها. أعني أنه يمكنك استخدام مكوّنات الويب. بل يمكنك حتى استخدام jQuery. بل يمكنك حتى استخدام القوالب من جهة الخادم. لكن، أجل، إن كنت تكتب كل هذا يدويًا أو ما شابه، فربما لا تكون Tailwind خيارًا مناسبًا.

## تجاهل تخصيص القالب

في وقت الضيق، قد يكون مغريًا استخدام قيم اعتباطية بدلًا من رموز التصميم.

*تجاهل تخصيص القالب — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/62c785664e78eb184df5663fbda8e1db32c8e7344d7d84bd72a4535ead4f6ede.html)*

```html
<!-- ❌ Anti-pattern: Magic values -->
<div class="bg-[#ff6b35] p-[123px] text-[14.5px]"></div>
```

لكني أظن أنه واضح تمامًا أنك ستندم على هذا الاختيار بعد فترة طويلة بما يكفي.

بدلًا من ذلك، استخدم تهيئة القالب أولًا بـ CSS:

```css
/* ✅ Define consistent tokens */
@theme {
  --color-brand: #ff6b35;
  --spacing-section: 123px;
}
```

## استهداف المتصفحات القديمة دون تفكير

يفعل Tailwind 4 الكثير مما يفعله بالاستفادة من ميزات المتصفحات الحديثة. وينهار بسرعة إن كنت تحاول دعم متصفحات أقدم من Chrome 111 أو Safari 16.4 أو Firefox 128. في هذه الحالة، استخدم Tailwind 3 مع PostCSS لتوفير بدائل لهذه الميزات. וכן، ابحث عن وظيفة جديدة.

كحد أدنى، تحتاج إلى دعم هذه الميزات.

- طبقات التسلسل (`@layer`)
- الخصائص المخصصة المسجّلة (`@property`)
- الدالة `color-mix()`

## استخدام معالجات CSS التقليدية

بما أنك ستسألني كيف تفعل هذا في مرحلة ما، دعني أعالج الأمر الآن. لا تستخدم Sass أو Less أو Stylus مع Tailwind 4.

## تطبيق الأدوات على مكوّنات عالية المستوى

استخدام مكوّنات منخفضة المستوى ثم بناء واجهتك الأكبر من تلك المكوّنات يجعل إجراء تغييرات أكبر أسرع.

```jsx
/* ❌ Anti-pattern */
function CheckoutForm() {
  return (
    <form className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
      {/* Complex checkout logic */}
    </form>
  );
}
```

```jsx
/* ✅ Better approach */
function Card({ children }) {
  return <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">{children}</div>;
}

function CheckoutForm() {
  return <Card>{/* Complex checkout logic using pre-styled components */}</Card>;
}
```

## باختصار

- تبنَّ نهج الأولوية للأدوات في HTML لديك
- استخدم تجريد المكوّنات لإعادة الاستخدام
- استفد من `@theme` لرموز تصميم متسقة
- استخدم `@utility` للأدوات المخصصة التي تحتاج إلى دعم المتغيّرات
- افهم متطلبات توافق المتصفحات قبل التبنّي
