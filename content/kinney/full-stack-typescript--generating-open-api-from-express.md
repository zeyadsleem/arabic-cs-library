---
title: "توليد OpenAPI من Express"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/generating-open-api-from-express"
---

إنشاء عقد OpenAPI من واجهة Express (API) موجودة يمكن أن يكون طريقة قيمة لتوثيق واجهتك، وتحسين التعاون، وتوليد حزم تطوير برامج (SDK) للعملاء. يُوضّح هذا الدليل خطوات توليد مواصفة OpenAPI من مسارات Express الموجودة.

## فحص مسارات Express الموجودة

قبل توليد عقد OpenAPI، افحص بعناية مسارات Express الموجودة. انتبه إلى:

- **النقاط (Endpoints):** اسرد جميع نقاط API (مثلاً `/users`, `/products/{id}`).
- **طرق HTTP:** حدّد طرق HTTP المستخدمة لكل نقطة (مثلاً GET, POST, PUT, DELETE).
- **مُعامِلات الطلب:** لاحظ أي مُعامِلات مسار، أو مُعامِلات استعلام، أو هياكل جسم الطلب.
- **هياكل الاستجابة:** وثّق هياكل الاستجابة المتوقعة لكل نقطة.
- **الرؤوس والكوكيز:** حدّد أي رؤوس مخصّصة أو كوكيز مستخدمة في الطلبات أو الاستجابات.

## اختيار أداة توليد OpenAPI

عدة أدوات يمكن أن تساعد في توليد عقود OpenAPI من واجهات Express (API) الموجودة. الخيارات الشائعة تشمل:

- **[`swagger-jsdoc`](https://www.npmjs.com/package/swagger-jsdoc):** يُولّد مواصفات OpenAPI من تعليقات JSDoc في شيفرتك.
- **[`express-openapi`](https://www.npmjs.com/package/express-openapi):** يتيح لك تعريف واجهتك باستخدام ملف YAML أو JSON وربطه بمسارات Express.
- **[`ts-node-dev`](https://www.npmjs.com/package/ts-node-dev) و [`openapi-typescript`](https://www.npmjs.com/package/openapi-typescript):** عند دمجهما مع شيفرة ذات أنواع صحيحة، يمكنك توليد مواصفة openapi من شيفرة TypeScript الخاصة بك.
- **[`openapi-express`](https://www.npmjs.com/package/openapi-express):** يُولّد مواصفة openapi من خادم express قيد التشغيل.
