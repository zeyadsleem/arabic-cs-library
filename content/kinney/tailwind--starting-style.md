---
title: "بداية الأنماط (@starting-style)"
lang: ar
source: "https://stevekinney.com/courses/tailwind/starting-style"
---

يتيح مُبدّل `starting` (جديد في Tailwind 4) حركات سلسة عندما تظهر العناصر أول مرة أو تنتقل من `display: none`.

## المشكلة

لا تعمل انتقالات CSS عند التصيير الأول أو عند التبديل من `display: none`، لأن المتصفح يحتاج حالتين ينتقل بينهما.

```css
/* Won't animate on first appearance */
.modal {
  opacity: 1;
  transition: opacity 0.3s;
}
```

## الحل

تُعرّف قاعدة CSS `@starting-style` الأنماط الأولية للتصيير الأول:

```css
.modal {
  opacity: 1;
  transition: opacity 0.3s;
}

@starting-style {
  .modal {
    opacity: 0; /* Starting state */
  }
}
```

## استخدام مُبدّل `starting`

يلفّ Tailwind الأصناف المساعِدة داخل `@starting-style` تلقائيًا:

*استخدام مُبدّل starting — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7a732a7546ca055b25a4cb861ddfa5fd502e6e531421a38cfc4407658980a7fc.html)*

```html
<!-- Fade in on appearance -->
<div class="opacity-100 transition-opacity duration-300 starting:opacity-0">Fades in smoothly</div>

<!-- Slide and fade -->
<div
  class="translate-y-0 opacity-100 transition-all duration-300 starting:translate-y-4 starting:opacity-0"
>
  Slides up while fading in
</div>
```

## الأنماط الشائعة

**مربّعات الحوار (modals):**

*الأنماط الشائعة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7fea11cce421fae0fd797cad5d7d3966ded8b14bc99203bb7df9296f06c5daa4.html)*

```html
<dialog
  open
  class="scale-100 opacity-100 transition-all duration-200 starting:scale-95 starting:opacity-0"
>
  Modal content (open so the starting state can be inspected)
</dialog>
```

**إشعارات التنبيه (toasts):**

*الأنماط الشائعة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4420e2fff3d8f073d49279500119a9d65db1f9cb88ad70c4194c604d62432100.html)*

```html
<div class="translate-x-0 transition-transform duration-300 starting:translate-x-full">
  Slides in from right
</div>
```

**القوائم المنسدلة (dropdowns):**

*الأنماط الشائعة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/463f1809ec9bf780467b2e33c395fda67e1940f90c38f0634a1818324eba1d18.html)*

```html
<ul
  class="translate-y-0 opacity-100 transition-all duration-150 starting:-translate-y-2 starting:opacity-0"
>
  <li>Menu item</li>
</ul>
```

## مع انتقالات العرض

فعّل الانتقالات عند تغيّرات الخاصية `display`:

*مع انتقالات العرض — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c045102f9c6b8f87860169d9b79b5927b94617b92ceb5f29dec7f1c335da1f3b.html)*

```html
<details open class="transition-[display,opacity] duration-300 starting:opacity-0">
  <summary class="cursor-pointer font-medium">Toggle the displayed content</summary>
  <p class="mt-2">Native details provides the visible and hidden states.</p>
</details>
```

**ملاحظة:** يتطلّب `transition-behavior: allow-discrete` (وهو مُضمَّن عندما تستخدم `transition-[display]`).

## دعم المتصفحات

- Chrome/Edge 117+
- Firefox 129+
- Safari 17.5+

دائمًا قدّم بدائل احتياطية غير متحرّكة للمتصفحات غير المدعومة.

## أفضل الممارسات {#best-practices}

1. اجعل الحركات خفيفة وسريعة (150-300ms)
2. استخدمه مع مُبدّلات `motion-reduce:` لإتاحة الوصول
3. اختبره في المتصفحات غير المدعومة
4. اجمعه مع JavaScript للحصول على حركات الخروج (غير مدعومة في CSS حتى الآن)
