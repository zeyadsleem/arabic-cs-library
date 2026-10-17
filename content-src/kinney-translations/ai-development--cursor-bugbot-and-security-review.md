---
title: "Bugbot والمراجعة الأمنية"
---

يضيف [Cursor Bugbot](https://cursor.com/docs/bugbot) و[وكلاء الأمان في Cursor](https://cursor.com/docs/security-agent) أسطح مراجعة آلية حول تغييرات الشيفرة. وهي مفيدة لأنها تنظر إلى الفرق بعينين مختلفتين. لكنها ليست بديلًا عن الملكية.

## Bugbot

يراجع Bugbot التغييرات ويشير إلى العيوب المحتملة. استخدمه كمراجع ثانٍ لطلبات السحب، خصوصًا عندما يمسّ تغيير حالات حافة أو معالجة أخطاء أو سلوكًا بين الملفات.

المتابعة الجيدة مع Bugbot تطلب دليلًا:

```
For each Bugbot finding, verify whether the issue is real by reading the changed
code and the closest tests. Fix only confirmed issues. If a finding is invalid,
explain why with file references.
```

لا تقبل نتيجة روبوت بشكل أعمى. ولا تتجاهلها بشكل أعمى أيضًا.

## المراجعة الأمنية

يركّز وكلاء الأمان على المخاطر: الأسرار، والتفويض، والحقن، وسطح الاعتماديات، والأوامر الخطيرة، وما شابه. وهم أكثر قيمة عندما يسمّي الطلب نموذج التهديد:

```
Review this pull request for authorization bypasses and secret exposure.
Ignore style issues. Cite exact files and propose the smallest fix for confirmed
security issues.
```

## الأمان و MCP

يمكن أن تكشف خوادم MCP أدوات وبيانات قوية. وينبغي أن يعامل وكيل المراجعة تهيئة MCP كجزء من سطح التطبيق، لا كزينة للمحرّر. ابحث عن خوادم غير موثوقة، وصلاحيات واسعة، وتسرّبات متغيّرات البيئة، وأدوات تستطيع الكتابة إلى أنظمة خارجية.

## انضباط الدمج

مخرَج المراجعة الآلية مُدخَل. ويبقى قرار الدمج لإنسان. وقبل الدمج، تأكد من حلّ الملاحظات، ونجاح الاختبارات، وأن الفرق النهائي مفهوم دون محادثة الروبوت.
