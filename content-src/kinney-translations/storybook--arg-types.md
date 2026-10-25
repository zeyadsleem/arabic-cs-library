---
title: "تحسين argTypes بالبيانات الوصفية"
---

## إضافة بيانات وصفية إلى `argTypes`

تحاول Storybook أن تستنتج قدر ما تستطيع، لكن كلما أضفت بيانات أكثر، حصلت على جدول أفضل. لنمرّ على هذا المثال.

```typescript
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Text to display on the button',
    },
    variant: {
      name: 'Variant',
      description: 'Variant of the button',
      control: 'select',
    },
    size: {
      name: 'Size',
      control: 'select',
      description: 'Size of the button',
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: 'Disables the button',
    },
  },
};
```

## تهيئة جدول أدوات التحكم

يأخذ كل `argType` مجموعة من المعاملات لا تتعلق بالضرورة بالوسيط أو الخاصية نفسها، بل بكيفية رغبتك في أن تصيّر Storybook أداة التحكم في الجدول.

### إخفاء أداة تحكم

ليس مفيدًا كثيرًا أن تكون لديك أداة تحكم لعنوان الزر. فنحن نعرف كيف يعمل هذا. لذا قد نرغب في إخفائها.

```typescript
const meta: Meta<typeof Button> = {
  // Other metadata…
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Text to display on the button',
      table: {
        disable: true,
      },
    },
    // The rest of the argTypes…
};
```

## عرض قيمة افتراضية

تحاول Storybook أن تستنتج القيمة الافتراضية بتحليل شيفرتك، لكن يمكنك أيضًا مساعدتها حيث تقصّر. فمثلًا، لا نذكر خاصية `disabled` أبدًا في شيفرتنا، لأننا نستخدم خاصية HTML المدمجة فقط. و*يمكننا* إضافة بعض المعلومات الإضافية إلى الجدول.

```typescript
const meta: Meta<typeof Button> = {
  // Other metadata…
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: 'Disables the button',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    // The rest of the argTypes…
};
```

وإضافة إلى ذلك، يمكنك إضافة تفاصيل أكثر، لكنك على الأرجح لا تحتاج ذلك.

```typescript
const meta: Meta<typeof Button> = {
  // Other metadata…
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: 'Disables the button',
      table: {
        defaultValue: {
          summary: false,
          detail: "Defers to the built-in HTML attribute."
        },
      },
    },
    // The rest of the argTypes…
};
```

سيصيّر هذا تلميحًا صغيرًا يحمل تفصيلك الإضافي.

![تُصيَّر التفاصيل الإضافية في تلميح صغير](/images/kinney/1399822d6bdf4c7a.webp)

وإليك ملخص تغييراتنا حتى الآن لمن يتابع منكم في المنزل.

```diff
diff --git a/src/components/button/button.stories.tsx b/src/components/button/button.stories.tsx
index 4348e02..34ba94e 100644
--- a/src/components/button/button.stories.tsx
+++ b/src/components/button/button.stories.tsx
@@ -16,21 +16,39 @@ const meta = {
       name: 'Label',
       control: 'text',
       description: 'Text to display on the button',
+      table: {
+        disable: true,
+      },
     },
     variant: {
       name: 'Variant',
       description: 'Variant of the button',
       control: 'select',
+      table: {
+        defaultValue: {
+          summary: 'primary',
+        },
+      },
     },
     size: {
       name: 'Size',
       control: 'select',
       description: 'Size of the button',
+      table: {
+        defaultValue: {
+          summary: 'medium',
+        },
+      },
     },
     disabled: {
       name: 'Disabled',
       control: 'boolean',
       description: 'Disables the button',
+      table: {
+        defaultValue: {
+          summary: false,
+        },
+      },
     },
   },
 } satisfies Meta<typeof Button>;
```

## أدوات تحكم إضافية

يمكنك أيضًا استخدام الخاصيتين `category` و`subcategory` على `table` للتقسيم. لمزيد من التنظيم لأدوات تحكمك. ليس لدينا الكثير لتنظيمه *الآن*، لكني أردت أن أضعه على رادارك.

![أدوات تحكم Figma مع الفئات والفئات الفرعية](/images/kinney/31b18f78c73e0647.webp)
