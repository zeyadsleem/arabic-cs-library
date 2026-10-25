---
title: "التثبيت والإعداد"
lang: ar
source: "https://stevekinney.com/courses/ai-development/installing-cursor"
---

لا يزال أسهل شرح لـ [Cursor](https://cursor.com/) أنه محرّر شيفرة له وكيل مدمج في سير العمل. والتحديث المهم هو أن المحرّر لم يعد المنتج بأكمله. فـ Cursor الحالي يتضمّن أيضًا وكلاء سحابيين، وأتمتات، ووكلاء فرعيين، وخطّافات، ومهارات، وBugbot، ووكلاء أمن، وواجهة طرفية.

ابدأ بتطبيق سطح المكتب لأن حلقة التغذية الراجعة اليومية تكون أقوى هناك.

## ثبّت تطبيق سطح المكتب

نزّل Cursor من [cursor.com](https://cursor.com/). وأثناء التهيئة الأولية، يستطيع Cursor استيراد الإضافات والإعدادات واختصارات لوحة المفاتيح والسمات من [Visual Studio Code](https://code.visualstudio.com/). وهذه الهجرة مفيدة لأن Cursor مألوف بما يكفي بحيث لا ينبغي أن يكون المحرّر هو الشيء الجديد الذي تتعلّمه، بل سير عمل الوكيل.

بعد التثبيت، تحقّق من هذه الإعدادات قبل أن تسلّمه مستودعًا حقيقيًا:

- فعّل [**وضع الخصوصية**](https://cursor.com/help/security-and-privacy/privacy) إذا كان المستودع يحتوي على شيفرة مملوكة.
- قرّر ما إذا كانت طلبات النموذج يمكنها استخدام نماذج مميّزة (premium) أو نماذج [Max Mode](https://cursor.com/docs/models-and-pricing).
- أضف قواعد المستخدم (User Rules) فقط للتفضيلات التي ينبغي أن تلازمك عبر كل مستودع.
- أبقِ القواعد الخاصة بالمستودع في `.cursor/rules/*.mdc`.
- اضبط خوادم [MCP](https://modelcontextprotocol.io/) الموثوقة في `.cursor/mcp.json` أو `~/.cursor/mcp.json`.

القاعدة المبدئية بسيطة: الإعدادات الشخصية الافتراضية توضع في إعدادات المستخدم، وسلوك المستودع يوضع في المستودع، وينبغي أن تكون الأدوات الخارجية صريحة بما يكفي ليستطيع أحد أعضاء الفريق تدقيقها.

## ثبّت واجهة سطر الأوامر

يشحن Cursor أيضًا وكيلًا للطرفية. ثبّته بالمثبّت الرسمي:

```bash
curl https://cursor.com/install -fsS | bash
```

على Windows، استخدم PowerShell:

```powershell
irm 'https://cursor.com/install?win32=true' | iex
```

الأمر هو `agent` وليس `cursor`. شغّل `agent` داخل مستودع لجلسة تفاعلية، أو استخدم وضع الطباعة (print mode) للأتمتة:

```bash
agent -p "Review the staged changes for correctness."
```

يتطلّب تعديل الملفات من [وضع الطباعة](https://cursor.com/docs/cli/headless) علامة صريحة مثل `--force` أو `--yolo`، وهو اسم صادق على الأقل بشأن القرار المصيري الذي تتّخذه. عامل ذلك كقرار صلاحيات حقيقي، لا كمفتاح راحة.

## إعداد المشروع الأول

لمستودع جادّ، أنشئ الملفات على مستوى المشروع قبل أن تطلب من الوكيل تعديل الشيفرة:

```
.cursor/
  rules/
    architecture.mdc
    testing.mdc
  mcp.json
```

أضف المهارات فقط عندما يحتاج سير عمل إلى بنية أكبر مما تستطيع قاعدة توفيره:

```
.cursor/
  skills/
    release-checklist/
      SKILL.md
```

إذا كان المستودع يحتوي بالفعل على [`AGENTS.md`](https://agents.md/)، فسيقرؤه Cursor كمصدر تعليمات. وما زلت أفضّل وضع السلوك الخاص بـ Cursor في ملفات Cursor ليعرف القارئ أي أداة تملك أي تعليمة.

## قائمة التحقق

قبل أن تثق بإعداد جديد، اطلب من Cursor إجراء جولة تعريفية للقراءة فقط:

```
Read this repository and summarize the build, test, lint, and release commands.
Do not edit files. Cite the files you used.
```

ثم قارن إجابته بنصوص المستودع. وإذا اختلق أوامر، فأصلح القواعد أو السياق قبل أن تستخدم وضع الوكيل (Agent mode) لإجراء تغييرات.
