---
title: "إضافة متغيّر الحجم باستخدام CVA"
---

في [القسم السابق](https://stevekinney.com/courses/storybook/class-variance-authority)، نظرنا في استخدام [Class Variance Authority](https://cva.style/) لتطبيق أصناف Tailwind المساعدة برمجيًا بناءً على الخصائص (props) المُمرَّرة. والآن نريد أن نفعل ذلك للنمط (style) أيضًا.

الخطوة الأولى هي إضافة متغيّر آخر.

```diff
@@ -52,9 +52,15 @@ export const variants = cva(
           'active:bg-danger-400',
         ],
       },
+      size: {
+        small: ['text-sm', 'px-2', 'py-1'],
+        medium: ['text-sm', 'px-2.5', 'py-1.5'],
+        large: ['text-sm', 'px-3', 'py-2'],
+      },
     },
     defaultVariants: {
       variant: 'secondary',
+      size: 'medium',
     },
   },
 );
```

بعد ذلك، نستخدمه في مكوّننا.

```diff
@@ -68,5 +68,5 @@ export const variants = cva(
 type ButtonVariants = VariantProps<typeof variants>;

 export const Button = ({ variant = 'primary', size = 'medium', ...props }: ButtonProps) => {
-  return <button className={clsx(variants({ variant }), styles[size])} {...props} />;
+  return <button className={clsx(variants({ variant, size }))} {...props} />;
 };
```

وأخيرًا، يمكننا أن نجعل نوعنا أنظف أكثر.

```diff
@@ -4,10 +4,7 @@ import clsx from 'clsx';

 import styles from './button.module.css';

-type ButtonProps = ComponentProps<'button'> & {
-  variant?: ButtonVariants['variant'];
-  size?: 'small' | 'medium' | 'large';
-};
+type ButtonProps = ComponentProps<'button'> & ButtonVariants;

 export const variants = cva(
   [
```
