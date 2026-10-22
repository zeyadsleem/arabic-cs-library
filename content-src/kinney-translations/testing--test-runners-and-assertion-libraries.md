---
title: "أي إطار اختبار ينبغي أن أستخدم؟"
---

*يمكنك* تقسيم مكتبات الاختبار إلى صنفين:

- **مكتبة تحقّق (assertion library)**: مكتبة تضمن أن شيفرتك تفعل ما تتوقعه (أو ترمي خطأ إن لم تفعل). من الأمثلة عليها [Chai](https://www.chaijs.com/)، و[Should.js](https://shouldjs.github.io/)، و[وحدة `assert` المدمجة في Node](https://nodejs.org/api/assert.html).
- **مشغّل اختبارات (test runner)**: عملية تمرّ على كل اختباراتك وتولّد تقارير. [Mocha](https://mochajs.org/) مثال على ذلك. المشغّل الأساسي جدًا قد يبحث عن كل الملفات التي تنتهي بـ `*.test.js` وينفّذها باستخدام Node.

بعض أطر الاختبار الحديثة (وهي: [Jasmine](https://jasmine.github.io/) و[Jest](https://jestjs.io/) و[Vitest](https://vitest.dev/)) تدمج مشغّل اختبارات مع مكتبة تحقّق. لذا فالأرجح أن هذا التمييز ليس مهمًا كثيرًا هذه الأيام، لكني أرى أنه يستحق التنبيه. إن وُجدت مكتبة تحقّق تعجبك *أكثر* من أي شيء يأتي مدمجًا مع Jest، *يمكنك* استبدالها بمكتبة تحقّق أخرى وسيعمل كل شيء كما هو متوقع.

لن أضيّع وقتك وأجبرك على أكل خضرواتك وبناء واحدة من الصفر لمجرد إثبات وجهة نظر.

## إضافة Vitest إلى Visual Studio Code

إن كنت تستخدم Vitest وVisual Studio Code، فهناك [إضافة مفيدة لـ Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer) تجعل تشغيل اختباراتك من داخل محرّرك أمرًا سهلًا. وهناك أيضًا [إضافة Visual Studio Code لـ Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest).
