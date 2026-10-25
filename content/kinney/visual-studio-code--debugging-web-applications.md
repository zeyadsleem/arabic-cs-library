---
title: "تنقيح تطبيقات الويب"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/debugging-web-applications"
---

يمكنك أيضًا الإرفاق بتطبيقات الويب قيد التشغيل بسهولة عبر Visual Studio Code.

## إضافة الإعداد

**أضف إعداد تشغيل للتنقيح إلى `.vscode/launch.json`:** إن لم يكن مجلد `.vscode` موجودًا فأنشئه، ثم أنشئ ملف `launch.json`.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## تشغيل التطبيق

- في الطرفية، شغّل `npm run dev`.
- في عرض Debug في Visual Studio Code، اختر “Launch Chrome against localhost” (أو “Launch Edge against localhost”) واضغط F5.

## أمثلة على سيناريوهات التنقيح

### تنقيح `addItem`

- ضع نقطة توقّف داخل دالة `addItem`.
- أضف عنصرًا إلى القائمة.
- تقدّم في الشيفرة سطرًا بسطر وافحص المتغيّرات `newItem` و`items` و`setItems`.

### تنقيح `calculateTotal`

- ضع نقطة توقّف داخل دالة `calculateTotal`.
- أضف عناصر أو احذفها لتحفيز إعادة الحساب.
- افحص المتغيّرات `sum` و`items` و`total`.

### تنقيح `removeItem`

- ضع نقطة توقّف داخل دالة removeItem.
- احذف عنصرًا من القائمة.
- تحقّق من محتوى المصفوفة `newItems`.

### تنقيح useEffect

- ضع نقطة توقّف داخل دالة الاستدعاء الخاصة بـ useEffect.
- أضف عناصر إلى القائمة أو احذفها، وتحقق من استدعاء useEffect.
- تحقّق من تحديث المجموع بشكل صحيح.

### فحص حالة مكوّنات React

- استخدم إضافة React Developer Tools في Chrome أو Edge لفحص حالة المكوّن وخصائصه. وهذا يتيح لك ملاحظة كيف تتغيّر الحالة بمرور الوقت.
