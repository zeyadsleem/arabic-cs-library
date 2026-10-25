---
title: "عرض توضيحي لذاكرة OpenClaw"
lang: ar
source: "https://stevekinney.com/courses/openclaw/demonstrating-openclaw-memory"
---

إليك عرضًا توضيحيًا بسيطًا للذاكرة الدائمة في OpenClaw. والهدف هو تعليمه شيئًا في جلسة واحدة، والتحقّق من أنه حفظ المعلومة، ثم اختبار ما إذا كان يتذكّرها في جلسة جديدة تمامًا.

## الخطوة 1: اطلب من OpenClaw أن يتذكّر شيئًا

الصق هذا في دردشة OpenClaw:

```
I want to test your long-term memory.

Please remember the following information about me:

- My favorite fictional project is called Project Magpie.
- Project Magpie is a personal knowledge management application.
- Its technology stack is SvelteKit, TypeScript, Bun, and Neon Postgres.
- My favorite color for Project Magpie is burnt orange.
- I strongly prefer descriptive variable names over abbreviations.

Store this as durable memory so you can recall it in future sessions, not just from our current conversation.

After saving it, tell me:

1. Which memory file you updated.
2. What information you stored.

3. How you verified that the information was written successfully.
```

يمنحنا المشروع الخيالي اختبارًا سهل التمييز دون خلط معلومات تجريبية في تفضيلاتك الحقيقية.

## الخطوة 2: تحقّق من كتابة الذاكرة

لا تقبل «سأتذكّر ذلك» دليلًا. فالنماذج اللغوية بارعة بشكل استثنائي في الإبلاغ بثقة عن إنجازها أمورًا.

الصق هذا بعد ذلك:

```
Verify that you actually persisted the Project Magpie information.

Read the relevant memory file from disk using your available tools.

Show me the exact Markdown content containing the Project Magpie information and the full path of the file.

Do not answer based solely on our conversation history. If you cannot access or verify the file, say so explicitly.
```

دردشة Control UI تُظهر الوكيل وهو يقرأ MEMORY.md من القرص بعد طلب Project Magpie

حسب تهيئة وكيلك، قد يخزّن المعلومة في `MEMORY.md`، أو في ملف Markdown بتاريخ ضمن `memory/`، أو في خلفية ذاكرة أخرى مُهيّأة.

## الخطوة 3: ابدأ جلسة جديدة تمامًا

في OpenClaw، اكتب:

```
/new
```

في Control UI، يؤدي كتابة `/` إلى فتح قائمة أوامر، ويظهر `/new` تحت Session كأمر يبدأ جلسة جديدة.

قائمة أوامر الشرطة المائلة في محرّر Control UI مع إبراز الأمر new

يبدأ هذا جلسة جديدة دون السياق النشط للمحادثة السابقة.

الآن اسأل:

```
I'm starting a new conversation and want to check your long-term memory.

What do you remember about Project Magpie?

Specifically:
- What kind of application is it?
- What technology stack does it use?
- What color did I choose?
- What naming conventions do I prefer?

Use your persistent memory, not previous conversation history. Tell me which memory sources you used.
```

ينبغي للاستجابة الناجحة أن تحدّد التفاصيل الأربعة كلها بشكل صحيح دون الحاجة إلى المحادثة الأصلية.

جلسة جديدة تجيب عن أسئلة Project Magpie وتسمّي MEMORY.md وUSER.md كمصدرين لها

## الخطوة 4: اختبر الاسترجاع الدلالي من الذاكرة

هذا هو الاختبار الأكثر إثارة للاهتمام لأنه يفحص ما إذا كان OpenClaw قادرًا على استرجاع المعلومة حين يستخدم سؤالك صياغة مختلفة.

```
I'm considering restarting that fictional personal knowledge management application we discussed previously.

What technical choices and visual preferences had I settled on?

Search your persistent memory for relevant information. Don't guess if you can't find it.
```

من الناحية المثالية، ينبغي أن يستعيد اسم المشروع والحزمة التقنية وتفضيل اللون البرتقالي المحروق.

يمكن لـ `memory_search` في OpenClaw استرجاع الذكريات ذات الصلة دلاليًا، بينما يمكن لـ `memory_get` قراءة محتواها الأصلي.

## الخطوة 5: افحص الذاكرة بشكل مستقل

إذا كان لديك وصول طرفية إلى الجهاز الذي يستضيف OpenClaw، فافحص الملفات الأساسية:

```bash
cat ~/.openclaw/workspace/MEMORY.md
cat ~/.openclaw/workspace/USER.md
grep -Rni "Project Magpie" ~/.openclaw/workspace/memory/
```

تفترض هذه المسارات مساحة العمل الافتراضية للوكيل. وإذا كان وكيلك يستخدم مساحة عمل مخصّصة، فاستبدل ذلك الموقع.

## ما الذي يُعدّ نجاحًا؟

| الاختبار | النتيجة المتوقعة |
| --- | --- |
| طلب الذاكرة الأولي | يكتب الوكيل المعلومة إلى القرص |
| التحقّق من الملف | المعلومة موجودة في ملف ذاكرة |
| التذكّر في جلسة جديدة | يستدعي الوكيل المشروع بشكل صحيح |
| الاسترجاع الدلالي | يستدعي الوكيل التفاصيل دون كلمات مفتاحية مطابقة |
| التحقّق من المصدر | يحدّد الوكيل ملف الذاكرة الذي استخدمه |

وملاحظة واحدة: قد تُحمّل الجلسة الجديدة الذاكرة طويلة المدى تلقائيًا. وهذا هو السلوك المقصود، لا اختبار فاشل. والمقصود أن المعلومة تأتي من تخزين دائم لا من السياق النشط للمحادثة السابقة.

وأفضل دليل هو الجمع بين كتابة مُتحقَّق منها على القرص واستدعاء ناجح بعد `/new`. وأي منهما وحده دليل أضعف.

تصف وثائق OpenClaw الحالية هذا النهج المدعوم بالملفات في نظرة عامة الذاكرة.
