---
title: "الوحدات (Modules)"
lang: ar
source: "https://programming-26.mooc.fi/part-7/1-modules"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستعرف ما هي وحدة Python (module)
- ستتمكن من تضمين وحدة في برنامجك باستخدام جملة `import`
- ستعرف كيف تبحث عن مزيد من المعلومات حول محتويات الوحدات

</text-box>

## التصحيح (Debugging) مراجعة

سبق أن تعرفنا على عدد من طرق التصحيح في هذه الدورة. [أداة التصور](http://www.pythontutor.com/visualize.html#mode=edit) يجب أن تكون مألوفة لك الآن، و [طباعة التصحيح](/part-2/1-programming-terminology#debugging) هي ركيزة قديمة جيدة الآن. ربما جربت أيضاً [مصحح الأخطاء المدمج](/part-4/1-vscode#the-built-in-debugger) في Visual Studio Code. إذا واجهت مشاكل في عدم العثور على ملفاتك، كانت هناك بعض النصائح للتعامل مع هذه الحالات في [الجزء السابق](/part-6/1-reading-files#debugging-code-which-handles-files).

أتى Python الإصدار 3.7 بأداة سهلة ومفيدة أخرى لتصحيح البرامج: أمر [breakpoint()](https://docs.python.org/3/library/functions.html?highlight=breakpoint#breakpoint).

يمكنك إضافة هذا الأمر في أي نقطة في كودك (ضمن قواعد بناء الجملة الطبيعية، بالطبع). عند تشغيل البرنامج، يتوقف التنفيذ في النقطة التي أدخلت فيها أمر `breakpoint`. إليك مثال على جهود التصحيح عند إكمال أحد التمارين من الجزء السابق (يرجى تجاهل أسماء المتغيرات الفنلندية في الصور، والتركيز على الوظيفة):

<img src="7_1_1.png">

عندما يتوقف التنفيذ عند أمر `breakpoint`، تفتح نافذة وحدة تحكم تفاعلية. هنا يمكنك كتابة أي كود تماماً كما تفعل في وحدة تحكم Python عادية، وترى كيف يعمل الكود في تلك النقطة بالضبط من البرنامج.

أمر `breakpoint` مفيد بشكل خاص عندما تعرف أن سطر كود ما يسبب خطأ، لكنك لست متأكداً تماماً لماذا. أضف نقطة توقف قبل السطر المشكل... (truncated in source)
