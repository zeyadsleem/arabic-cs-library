---
title: "أداة in-*"
lang: ar
source: "https://stevekinney.com/courses/tailwind/in-utility"
---

ينسّق تنويع `in-*` (الجديد في Tailwind 4) العناصر اعتمادًا على حالة *أي* سلف. لا حاجة إلى صنف `group`!

## الاستخدام الأساسي {#basic-usage}

*الاستخدام الأساسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/626687c96f03213893ec6242ce64858f1228f399bfb3eb7680e8018fab709830.html)*

```html
<div>
  <!-- No group class needed -->
  <button>
    <span class="in-[:hover]:text-blue-500"> Changes when <em>any</em> ancestor is hovered</span>
  </button>
</div>
```

## الأنماط الشائعة

### تأثيرات التمرير المتداخلة

*تأثيرات التمرير المتداخلة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/85103b389955a8491e59c55d0c6911443b635666e5406aa32420cad9acc4257b.html)*

```html
<article>
  <h2 class="in-[:hover]:underline">Title</h2>
  <p class="in-[:hover]:text-gray-600">Description</p>
</article>
```

### حالات تركيز حقول النماذج

*حالات تركيز حقول النماذج — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/686fc35f43b517b850ec9ec6c8fe9f00ab14792a39c5587faec0b473b7d47b3a.html)*

```html
<label>
  <span class="in-[:focus]:text-blue-600">Email</span>
  <input type="email" />
</label>
```

## الفروق الجوهرية مقارنة بـ `group`

| الميزة | `group` | `in-*` |
| --- | --- | --- |
| الحاجة إلى صنف للأب | نعم | لا |
| استهداف أب معيّن | نعم (بأسماء) | لا (أي أب) |
| التحكّم الدقيق | أكثر دقّة | أقلّ دقّة |

## متى تستخدم كلًا منهما

استخدم `in-*` عندما:

- تريد تفاعلات بسيطة مع حالة الأب
- لا تحتاج إلى التمييز بين آباء مختلفين
- تريد ترميزًا (markup) أنظف

استخدم `group` عندما:

- تحتاج إلى استهداف أب معيّن
- لديك عناصر تفاعلية متداخلة
- تحتاج إلى مجموعات مسمّاة من أجل الوضوح

## قابلية التركيب

اجمعه مع تنويعات أخرى:

*قابلية التركيب — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9f564618d5f7ddd0f249fc6dbcb74021d815a748f8b6054a5892f15d81ec52e7.html)*

```html
<div class="in-[:focus]:not-[:disabled]:ring-2">...</div>
```
