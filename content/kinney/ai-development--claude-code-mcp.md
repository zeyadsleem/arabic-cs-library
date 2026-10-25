---
title: "استخدام خوادم MCP"
lang: ar
source: "https://stevekinney.com/courses/ai-development/claude-code-mcp"
---

يتصل [Claude Code](https://code.claude.com/docs/en/mcp) بخوادم [MCP](https://modelcontextprotocol.io/) للحصول على أدوات وبيانات خارجية. استخدمه عندما يحتاج الوكيل إلى سياق موثوق أو يجب أن يتفاعل مع نظام آخر عبر واجهة منظَّمة.

## أضف الخوادم وافحصها

استخدم واجهة سطر الأوامر:

```bash
claude mcp add
claude mcp list
claude mcp get
claude mcp remove
```

وللخوادم المدعومة بـ OAuth، استخدم:

```bash
claude mcp login
claude mcp logout
```

يمكن أن تسكن الخوادم ذات النطاق المشروع في `.mcp.json`. استخدم نطاق المشروع عندما يكون الخادم جزءًا من سير عمل المستودع. واستخدم نطاق المستخدم للأدوات الشخصية.

## فضّل HTTP للخوادم البعيدة الجديدة

يدعم Claude Code ناقلات `stdio` و HTTP و SSE. وللخوادم البعيدة الجديدة، فضّل HTTP حيث أمكن. ويظل SSE مدعومًا للتوافق، لكن التوثيق الحالي يصفه بأنه مهجور.

## الصلاحيات

تعمل أدوات MCP عبر نموذج صلاحيات Claude Code. أبقِ أدوات الكتابة خلف قواعد السؤال إلا إذا كانت البيئة معزولة والإجراء منخفض الخطورة.

اطلب استخدام الأدوات المهمة صراحةً:

```
Use the GitHub MCP server only to read the pull request checks and comments.
Do not post comments or update labels.
```

## مراجعة الأمان

قبل إضافة خادم، أجب عن:

- ما الأنظمة الخارجية التي يستطيع الوصول إليها؟
- ما بيانات الاعتماد التي يتلقاها؟
- هل يستطيع الكتابة إلى أنظمة مشتركة؟
- هل يكشف السجلات أو الطلبات أو وسائط الأدوات؟
- هل تستطيع تهيئة المشروع إضافة الخادم أو استبداله؟

MCP حدّ قدرات. فعامله على هذا الأساس.
