---
title: "تشغيل الاختبارات باستخدام Vitest"
---

من داخل [المستودع المرافق](https://github.com/stevekinney/introduction-to-testing)، سننتقل إلى `examples/basic-math`. ستجد أن لدينا ملفين في `src`:

- `calculator.js`
- `calculator.test.js`

يمكنك استخدام `vitest` لتشغيل اختباراتك.

```bash
npx vitest

# Or, if you wanted to run your tests with Vitest UI.
npx vitest --ui
```

في حالتنا هذه، لدينا الأمر معرّفًا في `package.json`. على سبيل المثال، قد يكون لديك السكربت التالي في `package.json`.

```json
{
  // … other stuff
  "scripts": {
    "test": "vitest"
  }
  // more stuff …
}
```

وكما لاحظت على الأرجح، فقد فعلت هذا نيابةً عنك مسبقًا.

هذا يعني أنه يمكنك تنفيذ `npm test` لتشغيل اختباراتنا. وإن أردت تشغيلها مع الواجهة، يمكنك تنفيذ `npm test -- --ui` لتمرير العلم إلى سكربت `npm`.

بشكل افتراضي، يشغّل معظم مشغّلات الاختبارات *كل* اختبار يوافق أي اصطلاح لتسمية الملفات صُمّمت عليه. لكن يمكنك التحكّم في ذلك بعض الشيء عبر [تزويد مرشّح للاختبارات التي تريد تشغيلها](https://stevekinney.com/courses/testing/filtering-tests).

## قراءات إضافية

- [ترشيح الاختبارات](https://stevekinney.com/courses/testing/filtering-tests)
- [تنظيم الاختبارات والتعليق عليها](https://stevekinney.com/courses/testing/organizing-and-annotating-tests)
- [تشغيل اختبارات الملفات ذات الصلة](https://stevekinney.com/courses/testing/running-tests-for-related-files)
