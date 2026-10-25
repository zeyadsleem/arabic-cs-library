---
title: "تنقيح عمليات Node قيد التشغيل"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/debugging-running-node-processes"
---

بديلًا عن ذلك، يمكنك إرفاق المُنقّح بعملية Node قيد التشغيل بالفعل. ولتفعل ذلك، شغّل برنامج Node مع تمكين المفتّش (مثل `node --inspect-brk app.js` للتوقّف عند السطر الأول، أو `node --inspect app.js` للاستماع فقط). ثم استخدم إعدادًا يحمل `"request": "attach"`، مع تحديد `"port"` (والافتراضي 9229 لمفتّش Node) و`"address"` (مثل `"localhost"` إذا كان التشغيل محليًا). فمثلًا:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach to Node",
  "address": "localhost",
  "port": 9229
}
```

عند بدء إعداد الإرفاق هذا (F5)، سيحاول Visual Studio Code الإرفاق بـ Node على ذلك المضيف والمنفذ. وهذا مفيد في سيناريوهات التنقيح التي تُطلَق فيها عملية Node خارج Visual Studio Code (مثل الإطلاق عبر طرفية أو عملية nodemon). ويستطيع Visual Studio Code أيضًا **الإرفاق التلقائي** بعمليات Node التي تعمل في الطرفية المدمجة إن مكّنت ذلك (وسنتناول هذا بمزيد من التفصيل في *الميزات الأقل شهرة*).
