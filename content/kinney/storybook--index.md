---
title: "بناء أنظمة التصميم في Storybook"
lang: ar
source: "https://stevekinney.com/courses/storybook"
---

المواد في هذه الدورة مُعدّة لتسير جنبًا إلى جنب مع دورة [Design Systems with Storybook, v2](https://frontendmasters.com/courses/design-systems-v2/?utm_source=kinney&utm_medium=social&code=kinney) مع [Frontend Masters](https://frontendmasters.com/?utm_source=kinney&utm_medium=social&code=kinney).

حتى إن لم تكن تعمل في فريق أنظمة التصميم في شركتك، فمن المرجح أن تجد نفسك بعد مدة طويلة بما يكفي تعمل على نظام تصميم أو مكتبة مكوّنات. وامتلاك مجموعة موحّدة من المكوّنات يوفّر عليك إعادة اختراع العجلة في كل مرة تتناول فيها ميزة جديدة. والأهم من ذلك—على الأرجح—أنه يتيح لك إجراء تغييرات واسعة النطاق دون عناء تعديل كل عنصر يدويًا في مشروعك.

تقدّم هذه الورشة دليلًا شاملًا لبناء أنظمة التصميم باستخدام [Storybook](https://storybook.js.org/). وتغطي كل شيء من الإعداد الأساسي إلى الميزات المتقدّمة، وسيتعلّم الحاضرون التصميم الذرّي وإمكانية الوصول والاختبار المرئي للانحدار والتصميم المتجاوب وتنفيذ الوضع الداكن. وتشدّد الورشة على التعلّم العملي التطبيقي للتعاون والتوثيق الفعّالين في الفريق.

> **مواد الدورة**
>
> خلال وقتنا معًا، سنستخدم [هذا المستودع](https://github.com/stevekinney/anthology).
>
> ويمكن العثور على تصميمات Figma التي ألهمت مكوّنات هذا المستودع [هنا](https://www.figma.com/file/Qhb4PJucNK8bgvf4N65Jrm/Anthology?type=design&node-id=0%3A1&mode=design&t=Dr1OUnsNFnelFSUN-1).

## المتطلبات المسبقة {#prerequisites}

ستحتاج إلى ما يلي لمتابعة هذه الدورة. وستسنح لك الفرصة للتهيئة بكل شيء على طول الطريق. لكن إن أردت بداية مبكرة، فهيّئ نفسك بالأدوات أدناه.

- [حساب Chromatic](https://www.chromatic.com/)
- **مُوصى به، لكنه ليس مطلوبًا**: [pnpm](https://pnpm.io/installation)

## المكتبات والأدوات المستخدمة

إضافة إلى Storybook، سنستفيد أيضًا من بعض المكتبات الأخرى على طول الطريق. وستُضمَّن في أي من المستودعات المثالية حيث تُحتاج، لكني رأيت أنه سيكون مفيدًا إدراجها كلها في مكان واحد أيضًا

- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://npm.im/clsx)
- [Class Variance Authority](https://cva.style/docs)
- [Vite](https://vite.dev/)
