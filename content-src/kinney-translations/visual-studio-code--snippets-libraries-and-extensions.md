---
title: "مكتبات المقتطفات وإضافاتها"
---

## مكتبات المقتطفات وإضافاتها

### المقتطفات المدمجة

يأتي Visual Studio Code بمجموعة من المقتطفات المدمجة لكثير من اللغات الشائعة. وتوفّر هذه المقتطفات بنى شيفرة أساسية، وهي نقطة بداية جيدة لفهم استخدام المقتطفات.

- **الوصول إلى المقتطفات المدمجة:** لرؤية المقتطفات المدمجة للغة معيّنة، افتح ملفًا من نوع تلك اللغة (مثل `.js` لـ JavaScript و `.py` لـ Python). واكتب كلمة مفتاحية أو بادئة شائعة (مثل `for` في JavaScript و `def` في Python). وسيقترح IntelliSense في Visual Studio Code المقتطفات المدمجة إلى جانب إكمالات الشيفرة الأخرى. وابحث عن أيقونة المقتطف في قائمة الاقتراحات.
- **استكشاف المقتطفات المدمجة:** لا يمكنك تحرير المقتطفات المدمجة مباشرةً. ومع ذلك، يمكنك غالبًا العثور على تعريفاتها داخل ملفات إضافات Visual Studio Code إن أردت فهم بنيتها أو إنشاء تنويعات خاصة بك. وقد يختلف الموضع الدقيق للمقتطفات المدمجة حسب إضافة اللغة.
- **أمثلة على المقتطفات المدمجة:** **JavaScript:** `for`، `foreach`، `function`، `class`، `console.log`، `import`. **Python:** `def`، `class`، `if`، `for`، `while`، `try`. **HTML:** `!`، `html:5`، `link`، `script`. **CSS:** `anim`، `bgc`، `dis`، `pos`.
  - **JavaScript:** `for`، `foreach`، `function`، `class`، `console.log`، `import`.
  - **Python:** `def`، `class`، `if`، `for`، `while`، `try`.
  - **HTML:** `!`، `html:5`، `link`، `script`.
  - **CSS:** `anim`، `bgc`، `dis`، `pos`.

استكشف المقتطفات المدمجة للغات التي تستخدمها بانتظام لتكتشف اختصارات سريعة وتفهم أنماط الشيفرة الشائعة.

### مقتطفات المجتمع: الإضافات والمكتبات

يعجّ سوق إضافات Visual Studio Code بإضافات ومكتبات مقتطفات أنشأها المجتمع. وتوفّر هذه الإضافات مجموعات مقتطفات جاهزة للغات وأطر ومكتبات متنوّعة، فتوفّر عليك عناء إنشاء كل شيء من الصفر.

> **لا أستخدم أيًا من هذه.**
>
> الناس يحبّونها، لكني شخص متوتّر *جدًا* وأفضّل بناء مقتطفاتي بنفسي. وقد تختلف تجربتك.

### انطلق للبحث عن إضافة مقتطفات

1. **افتح عرض الإضافات:** انقر أيقونة الإضافات في شريط النشاط على جانب Visual Studio Code (أو اضغط `Ctrl+Shift+X` / `Cmd+Shift+X`).
2. **ابحث عن “snippets”:** في شريط البحث في سوق الإضافات، اكتب “snippets” ثم اللغة أو الإطار الذي يهمّك (مثل “snippets javascript” و “snippets react” و “snippets python”).
3. **تصفّح وثبّت:** استكشف نتائج البحث. وابحث عن إضافات بتقييمات جيدة وعدد تثبيتات كبير وتحديثات حديثة. واقرأ وصف الإضافة وميزاتها لترى إن كانت تلبي احتياجاتك.
4. **ثبّت الإضافة:** انقر زر “Install” لتثبيت الإضافة. وسينزّل Visual Studio Code الإضافة وينشّطها.

### بعض الخيارات الشائعة

- **ES7+ React/Redux/React-Native snippets:** لتطوير React.
- **Python Snippets:** لتطوير Python.
- **Angular Snippets (Version 15):** لتطوير Angular.
- **Vue 3 Snippets:** لتطوير Vue.js.
- **Go Snippets:** لتطوير Go.
- **PHP Snippets:** لتطوير PHP.
- **HTML Snippets:** مقتطفات HTML محسّنة.
- **CSS Peek:** وإن كان مخصّصًا أساسًا للنظر في CSS، فهو يتضمّن غالبًا مقتطفات CSS.

### إنشاء إضافات المقتطفات

> **سنتحدّث أكثر عن الإضافات لاحقًا.**
>
> لكني أظنّ أنك إن قرأت إلى هنا، فقد يكون هذا المحتوى مفيدًا لك أو مثيرًا لاهتمامك.

إذا أنشأت مجموعة قيّمة من المقتطفات وتريد مشاركتها مع مجتمع Visual Studio Code الأوسع، ففكّر في إنشاء إضافة مقتطفات ونشرها.

1. **هيّئ بيئة تطوير الإضافات:** اتبع [توثيق واجهة برمجة إضافات Visual Studio Code](https://www.google.com/url?sa=E&source=gmail&q=https://code.visualstudio.com/api/get-started/your-first-extension&authuser=1) لتهيئة بيئة تطوير إضافاتك وتثبيت مولّد إضافات Visual Studio Code من Yeoman (`yo code`).
2. **ولّد إضافة المقتطفات:** استخدم مولّد Yeoman لإنشاء مشروع إضافة مقتطفات جديد بصيغة Bash <code><span class="line"><span style="color:#D6DEEB">yo code</span></span></code> واختر “New Snippets package” عند سؤالك.
3. **عرّف المقتطفات في الإضافة:** داخل مشروع إضافتك، ستجد مجلد `snippets`. وأنشئ ملفات `.code-snippets` داخل هذا المجلد لتعريف مقتطفاتك (مثل `my-language-snippets.code-snippets`). واتبع صيغة JSON القياسية للمقتطفات.
4. **حزّم وانشر:** استخدم أداة `vsce` (Visual Studio Code Extension Manager) لحزم إضافتك ونشرها في سوق إضافات Visual Studio Code. وراجع [توثيق سوق إضافات Visual Studio Code](https://www.google.com/url?sa=E&source=gmail&q=https://code.visualstudio.com/api/working-with-extensions/publishing-extension&authuser=1) لخطوات النشر المفصّلة.
