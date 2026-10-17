---
title: "Claude Code وسكربتات Bash"
---

في أول مرة يشغّل فيها الوكيل أمر صدفة خاطئًا بثقة، تتعلم لماذا يحتاج مخرَج الطرفية إلى أن يكون دليلًا لا انطباعًا.

يستطيع [Claude Code](https://code.claude.com/docs/en/overview) تشغيل أوامر الصدفة، ويستطيع المستخدمون تشغيل أوامر bash داخل الجلسة. واعتبارًا من [Claude Code 2.1.186](https://code.claude.com/docs/en/changelog)، فإن الأوامر المُدخَلة بـ `!` تُطلق استجابة من Claude افتراضيًا إلا إذا ضُبط [`respondToBashCommands`](https://code.claude.com/docs/en/settings) على `false`.

وهذا يجعل مخرَج الطرفية جزءًا من المحادثة. فتعامل معه كدليل.

## فضّل سكربتات المستودع

اطلب من Claude تشغيل السكربتات الموثّقة بدلًا من سلاسل أوامر مرتجلة:

```
Run the targeted test command from package.json. If it fails, report the command
and failure before editing files.
```

السكربتات الجيدة قابلة للتكرار. أما خطوط أنابيب الصدفة الطويلة ذات الاستخدام الواحد فمراجعتها أصعب، والخطأ فيها أسهل.

## اجعل الأوامر محدودة

تجنّب الأوامر التي قد تتوقف بلا نهاية، أو تكتب إلى الإنتاج، أو تغيّر حالة واسعة. وللتحقيق، فضّل:

```bash
rg "expired token" src tests
git status --short
bun test src/lib/server/invitations.test.ts
```

وللعمليات الخطيرة، اشترط شرحًا صريحًا قبل التنفيذ:

```
Before running any command that deletes files, changes branches, or writes to an
external service, explain the command and wait for approval.
```

## حوّل عمل الصدفة المتكرر إلى سكربتات

إذا صار تسلسل أوامر جزءًا من سير العمل، فأودعه سكربتًا باسم واضح. عندئذٍ تستطيع القواعد والمهارات والخطّافات والبشر أن تنادي الشيء نفسه.

الوكلاء بارعون في الاستدلال على مخرَج الأوامر. ومع ذلك يجب أن تبقى أنظمة البناء مملوكة للمستودع.
