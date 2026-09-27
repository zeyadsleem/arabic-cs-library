---
title: "الأنماط السلوكية"
lang: ar
source: https://gameprogrammingpatterns.com/
---

^title Behavioral Patterns

بمجرد أن تبني مسرح لعبتك وتزيّنه بالممثلين والدميّات، لا يبقى إلا أن تبدأ
المشهد. فتحتاج إلى سلوك (behavior) — وهو الكتاب المسرحي الذي يبيّن
لكل كيان (entity) في لعبتك ما الذي يفعله.

وبالطبع كل شيفرة هي «سلوك»، وكل برنامج هو تعريف لسلوك ما، لكن ما يميّز الألعاب
غالباً هو *اتساع* ذلك السلوك الذي عليك تنفيذه. فبينما قد يكون لمحرّك النصوص
لديك قائمة طويلة من المزايا، إلا أنه يبهُور مقارنةً بعدد السكان والغنائم
والمهام في لعبة أدوار نموذجية.

تساعدنا الأنماط في هذا الفصل على تعريف كمية كبيرة من السلوك القابل للصيانة
وتحسينه بسرعة. فـ [كائنات النوع](/book/game-programming-patterns/type-object/index) تخلق فئات من السلوك دون
جمود تعريف صنف حقيقي. و [صندوق الصنف الفرعي](/book/game-programming-patterns/subclass-sandbox/index) يمنحك
مجموعة آمنة من الأدوات الأولية يمكنك استخدامها لتعريف تنوّع من السلوكيات. أمّا
الخيار الأكثر تقدّماً فهو [شيفرة البايت](/book/game-programming-patterns/bytecode/index)، التي تنقل السلوك خارج
الشيفرة تماماً إلى داخل البيانات.

## الأنماط

* [شيفرة البايت (Bytecode)](/book/game-programming-patterns/bytecode/index)
* [صندوق الصنف الفرعي (Subclass Sandbox)](/book/game-programming-patterns/subclass-sandbox/index)
* [كائن النوع (Type Object)](/book/game-programming-patterns/type-object/index)
