---
title: "توليد مكتبة أيقونات"
---

أيقونات

يأتي أي نظام تصميم أو تطبيق بقدر معيّن من الأيقونات. وهذه دائمًا رقصة صعبة، إذ تريد عادةً **الكثير بقدر ما تحتاج والقليل بقدر ما يمكنك الاستغناء عنه**. ومرة أخرى، سأترك الفلسفة والنظرية للخبراء، وسنركّز على الجوانب العملية لكيفية توليد مكتبة أيقونات في Figma — وسننظر في [دورة أخرى](https://stevekinney.com/courses/storybook/) في كيفية تنفيذها في الشيفرة.

كبداية، يعجبني [Lucide](https://lucide.dev/) كنقطة انطلاق لمكتبة أيقوناتي. وفي وقت كتابة هذا النص، يحتوي على 1,452 أيقونة، وهو ما يبدو أكثر من كافٍ لأغراضنا.

وهذه خطة العمل:

1. سنتصفّح [Lucide](https://lucide.dev/) ونختار بعض الأيقونات التي نريد استخدامها.
2. سننشئ مكوّن **Icon** في Figma.
3. سنجعل كل أيقونة نمطًا بديلًا من ذلك المكوّن.

## إحضار أيقونة إلى Figma

هناك إضافات لـ Figma، لكن بصراحة، من السهل جدًا مجرد أخذ أيقونة بصيغة SVG ولصقها في Figma.

أيقونة Lucide سننسخها بصيغة SVG

سأنسخ الأيقونات التالية:

- [Triangle Alert](https://lucide.dev/icons/triangle-alert)، وسأسميها **Warn**
- [Bug](https://lucide.dev/icons/bug)
- [Check](https://lucide.dev/icons/check)
- [Circle Check](https://lucide.dev/icons/circle-check)، وسأسميها **Success**
- [Clipboard List](https://lucide.dev/icons/clipboard-list)
- [Flame](https://lucide.dev/icons/flame)
- [Circle Help](https://lucide.dev/icons/circle-help)، وسأسميها **Help**
- [Info](https://lucive.dev/icons/info)
- [List](https://lucive.dev/icons/list)
- [Pencil](https://lucive.dev/icons/pencil)
- [Quote](https://lucive.dev/icons/quote)
- [X](https://lucive.dev/icons/x)
- [Zap](https://lucive.dev/icons/zap)
- [Plus](https://lucive.dev/icons/plus)
- [Trash 2](https://lucide.dev/icons/trash-2)، وسأسميها **Trash**
- [Skull](https://lucive.dev/icons/skull)
- [External Link](https://lucive.dev/icons/external-link)
- [Link](https://lucive.dev/icons/link)
- [Hash](https://lucide.dev/icons/hash)

> **لقد أنجزت عنك الجزء الممل**
>
> يمكنك — بل ينبغي لك — أن [تستعير أيقوناتي من هنا](https://www.figma.com/file/1v4uGneHKyq6SfxPWI7KJc/Figma-for-Developers-v2%2C-Frontend-Masters?type=design&node-id=6-1296&mode=design&t=xaxtUNN7AZ04byvE-4).

## إنشاء المكوّنات

إذا كنت تريد أن تسهّل حياتك المستقبلية — اذهب وأعد تسمية كل المكوّنات وأضف إليها البادئة **Type=**، ويمكنك فعل ذلك بسهولة باستخدام **Type=$&**.

إعادة تسمية الأيقونات دفعة واحدة

بعد ذلك، سنختار **Create component set**.

إنشاء طقم مكوّنات

سيكون لديك الآن مكوّن يمكنك إعادة تسميته إلى **Icon**. وهذا يمنحك قائمة سريعة وسهلة بالأيقونات المعتمدة لاستخدامها في نظام تصميمك.
