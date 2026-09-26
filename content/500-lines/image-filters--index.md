---
title: "صناعة مرشِّحات الصور الخاصة بك"
lang: ar
source: https://aosabook.org/en/500L/image-filters.html
---

_تركت كيت صناعة التقنية وأنفقت سنة تبحث عن طريقها إلى العودة بينما تبني مشروعها الشغوف Show & Hide. وهي مديرة الهندسة المتنقلة في Ride، وتتحدث دوليًا عن التطوير المتنقل وثقافة الهندسة، وتُنسّق معًا سلسلة Technically Speaking، وهي مستشارة في Glowforge. لا تعيش كيت في كولومبيا تحديدًا لكنها تقضي فيها وقتًا طويلًا، وقد عاشت وعملت في المملكة المتحدة وأستراليا وكندا والصين والولايات المتحدة، وقد عملت سابقًا كمهندسة في Google، ومتدربة في برنامج Extreme Blue في IBM، ومعلمة تزلج. تكتب كيت في مدونة [Accidentally in Code](http://www.catehuston.com/blog/) وهي على تويتر [@catehstn](https://twitter.com/catehstn)._

## فكرة عبقرية (لم تكن عبقرية إلى هذا الحد)

عندما كنت مسافرًا في الصين كثيرًا ما رأيت سلاسل من أربع لوحات تُظهر المكان
نفسه في فصول مختلفة. واللون&mdash;أبيض البرد الباردة، وتدرجات الربيع الباهتة،
وأخضر الصيف الكثيف، وأحمر الخريف وصفاره&mdash;هو ما
يميّز
الفصول بصريًا. وفي عام 2011 تقريبًا، خطرت لي فكرة ظننتها عبقرية:
أردت أن أستطيع تمثيل سلسلة صور على هيئة سلسلة ألوان. ظننت
أنها ستُظهر السفر، والتقدّم عبر الفصول.

لكنني لم أعرف كيف أحسب اللون الغالب من صورة. فكّرت
في تصغير الصورة حتى مربّع 1x1 والنظر إلى ما يتبقّى، لكن ذلك
بدا لي غشًّا. غير أنني كنت أعرف كيف أريد عرض الصور، وهو في
تخطيط يسمى [تخطيط
Sunflower](http://www.catehuston.com/applets/Sunflower/index.html). إنه أكثر
تخطيط كفاءة لرصف الدوائر.

تركت هذا المشروع سنوات، وانشغلت بالعمل والحياة والسفر والمحاضرات.
وفي النهاية عدتُ إليه، وعرفت كيف أحسب اللون
الغالب، و[أكملت
تمثيلي البصري](http://www.catehuston.com/blog/2013/09/02/visualising-a-photo-series/).
وهنا فقط اكتشفت أن هذه الفكرة لم تكن عبقرية في الواقع.
لم يكن التقدّم واضحًا كما توقعت، ولم يكن اللون
الغالب المستخرج هو عادةً الدرجة الأكثر جاذبية، واستغرق الإنشاء وقتًا
طويلًا (بضع ثوانٍ لكل صورة)، واحتجت مئات الصور لأصنع
شيئًا رائعًا (\aosafigref{500l.imagefilters.sunflower}).

\aosafigure[180pt]/images/500-lines/image-filters-0-sunflower.webp{Sunflower layout}{500l.imagefilters.sunflower}

قد تظن أن هذا محبط، لكن حين وصلت إلى هذه النقطة كنت قد تعلمت
الكثير من الأمور التي لم تأتني من قبل — عن فضاءات
الألوان ومعالجة البكسلات — وكنت قد بدأت في صنع تلك الصور
ملوّنة جزئيًا الرائعة، من النوع الذي تجده على بطاقات لندن
بالحافلات الحمراء أو أكشاك الهاتف وكل ما عداه بالأبيض والأسود.

استخدمت إطار عمل اسمه [Processing](https://processing.org/) لأنني كنت
متمرسًا عليه من تطوير مناهج البرمجة، ولأنني كنت أعرف أنه
يجعل إنشاء التطبيقات البصرية سهلًا. إنه أداة صُمّمت
أصلًا للفنانين، لذا فهي تُخفي عنك كثيرًا من شيفرة القالب الجاهزة (boilerplate). وقد سمح
لي أن ألعب وأجرّب.

الجامعة، ثم العمل لاحقًا، ملأت وقتي بأفكار أولويات
الآخرين. وكان جزء من إتمام هذا المشروع هو تعلّم كيف تحجز وقتًا
لتحقيق تقدّم في أفكارك الخاصة؛ فقد احتجت
حوالي أربع ساعات من الوقت الذهني الجيد أسبوعيًا. وإذن فالأداة التي تتيح لي
أن أتحرك بسرعة أكبر مفيدة حقًا، بل ضرورية&mdash;مع أنها جاءت
بمجموعة مشكلاتها الخاصة، ولا سيما حول كتابة الاختبارات.

شعرت بأن الاختبارات
الشاملة مهمة على نحو خاص للتحقق من أن المشروع يعمل، ولجعل
من الأسهل استئناف مشروع كثيرًا ما يجمَّد في الجليد
لأسابيع، بل لأشهر في كل مرة. وشكّلت الاختبارات (ومشاركات المدونة!)
توثيق هذا المشروع. فيمكنني ترك اختبارات فاشلة توثّق ما ينبغي أن يحدث
ولم أصل إليه بعد، وأُجري تغييرات بثقة من أن إن
غيّرت شيئًا كنت قد نسيت أنه حاسم،
فستذكّرني الاختبارات بذلك.

سيغطي هذا الفصل بعض التفاصيل عن Processing، ويرشدك عبر فضاءات
الألوان، وتفكيك الصورة إلى بكسلات ومعالجتها، والاختبار
الوحدوي لشيء لم يُصمَّم مراعاةً للاختبار. لكنني آمل أيضًا أنه
سيحفّزك على أن تحقق بعض التقدّم في أي فكرة لم تجد لها وقتًا
مؤخرًا؛ حتى لو انتهت فكرتك بالسوء الذي انتهت به فكرتي،
فقد تصنع شيئًا رائعًا وتتعلم شيئًا مثيرًا في
أثناء ذلك.

## التطبيق

سيعرض هذا الفصل كيف تنشئ تطبيق مرشِّح صور
يمكنك استخدامه
لمعالجة صورك الرقمية باستخدام مرشِّحات تنشئها أنت.
وسنستخدم Processing، وهي لغة برمجة وبيئة تطوير مبنية على
Java.
وسنغطي تهيئة التطبيق في Processing، وبعض
ميزات Processing، وجوانب تمثيل اللون، وكيف تنشئ مرشِّحات لونية (تحاكي ما كان
مستخدمًا في التصوير التقليدي). وسننشئ أيضًا نوعًا خاصًا من المرشِّح
لا يمكن إلا إنشاؤه رقميًا: تحديد درجة اللون الغالبة في صورة
وإظهارها أو إخفاءها، لإنشاء صور ملوّنة جزئيًا ذات طابع مريب.

وأخيرًا، سنضيف مجموعة اختبارات شاملة، ونغطي كيفية التعامل مع بعض
قيود Processing فيما يتعلق بقابلية الاختبار.

## الخلفية

اليوم يمكننا التقاط صورة ومعالجتها ومشاركتها مع كل أصدقائنا في
أمر من ثوانٍ. غير أن زمنًا طويلًا جدًا (بالمعنى الرقمي)،
كانت عملية تستغرق أسابيع.

في الأيام القديمة، كنا نلتقط الصورة، ثم حين نستهلك لفافة كاملة من الفيلم، كنا
نأخذها لتُطوَّر (غالبًا في الصيدلية). ثم نلتقط الصور المطوّرة بعد أيام
أخرى&mdash;ونكتشف أن كثيرًا منها به خلل.
أيدينا لم تستقر بما يكفي؟ شخص أو شيء عشوائي لم نلاحظه في
ذلك الحين؟ زيادة تعرض؟ نقص تعرض؟ وبالطبع فقد كان الوقت قد فات حينئذٍ لإصلاح المشكلة.

كانت العملية التي تحوّل الفيلم إلى صور عمليةً لا يفهمها معظم
الناس. كان الضوء مشكلة، لذا كان عليك أن تكون حذرًا مع الفيلم.
وهناك عملية تنطوي على غرف معتمة ومواد كيميائية، كانوا
يعرضونها أحيانًا في الأفلام أو على التلفزيون.

لكن ربما كان عدد أقل من الناس يفهمون كيف ننتقل من
الضغط على زر في كاميرا هاتفنا الذكي إلى صورة على Instagram.
وهناك في الواقع أوجه تشابه كثيرة.

### التصوير بالطريقة القديمة

تُنشأ الصور الفوتوغرافية بفعل الضوء على سطح حساس للضوء.
ويكون الفيلم الفوتوغرافي مغطّى ببلورات هاليد الفضة. (تُستخدم طبقات إضافية
لإنشاء الصور الملوّنة — ولتبسيط الأمر سنلتزم هنا
بالتصوير بالأبيض والأسود.)

عند الحديث عن صورة فوتوغرافية تقليدية — بفيلم — فإن الضوء يصيب
الفيلم وفقًا لما تصوّبه إليه، وتتغيّر البلورات عند تلك النقاط
بدرجات متفاوتة، بحسب كمية الضوء. ثم إن عملية
[عملية
التطوير](http://photography.tutsplus.com/tutorials/step-by-step-guide-to-developing-black-and-white-t-max-film--photo-2580)
تحوّل الأملاح الفضية إلى فضة معدنية، فتُنتج السالب. يتمتع
السالب بمناطق الصورة الفاتحة والداكنة معكوسة. ومجرد
أن تُطوَّر الأسبار، تتوالى سلسلة أخرى من الخطوات لعكس
الصورة وطباعتها.

### التصوير بالطريقة الرقمية

عند التقاط الصور بهواتفنا الذكية أو الكاميرات الرقمية، لا يوجد
فيلم. فهناك شيء اسمه *مستشعر البكسل النشط* يعمل بطريقة
مماثلة. وحيث كنا نملك بلورات الفضة، نملك الآن بكسلات — مربعات
صغيرة. (وبالفعل، كلمة pixel اختصار لعبارة "picture element".) والصور الرقمية
مكوَّنة من بكسلات، وكلما زادت الدقة زاد عدد البكسلات.
وهذا هو سبب وصف الصور منخفضة الدقة بأنها "منقّطة" (pixelated) — إذ تبدأ
أن ترى المربعات. وتُخزَّن هذه البكسلات في مصفوفة، ويحتوي الرقم
في كل «خانة» في المصفوفة على اللون.

في \aosafigref{500l.imagefilters.animals}، نرى صورة عالية الدقة لبعض الحيوانات
المكبَّرة الملتُقطة في MoMA في نيويورك. أما \aosafigref{500l.imagefilters.pixelanimals} فهو
الصورة نفسها مكبَّرة، لكن بـ 24 × 32 بكسلًا فقط.

\aosafigure[220pt]/images/500-lines/image-filters-1-animals.webp{Blow-up animals at MoMA NY}{500l.imagefilters.animals}

\aosafigure[220pt]/images/500-lines/image-filters-2-pixelanimals.webp{Blow-up animals, blown up}{500l.imagefilters.pixelanimals}

انظر كيف تبدو ضبابية إلى هذا الحد؟ إننا نسمّي ذلك
_التنقيطَ_ (_pixelation_)، أي أن الصورة أكبر من عدد البكسلات التي
تحتويها فتصبح المربعات مرئية. يمكننا هنا أن نستفيد منه لنحصل على
فهم أفضل لدورة مكونة من مربعات لونية.

فكيف تبدو هذه البكسلات؟ إن طبعنا ألوان بعض
البكسلات في الوسط (من 10,10 إلى 10,14) مستخدمين الدالة العملية `Integer.toHexString`
في Java، تحصل على ألوان سداسية:

```
FFE8B1
FFFAC4
FFFCC3
FFFCC2
FFF5B7
```


الألوان السداسية ستة محارف طويلة. أول محرفين يمثلان قيمة الأحمر، والمحرفان
الثانيان قيمة الأخضر، والمحرفان الثالثان قيمة الأزرق. وأحيانًا يوجد
محرفان إضافيان يمثلان قيمة الشفافية (alpha). في هذه الحالة تعني `FFFAC4`:

\newpage

- red = FF (hex) = 255 (base 10)
- green = FA (hex) = 250 (base 10)
- blue = C4 (hex) = 196 (base 10)

## تشغيل التطبيق

في \aosafigref{500l.imagefilters.app}، لدينا صورة لتطبيقنا قيد التشغيل.
أعرف أنه مصمَّم إلى حدٍّ كبير من منظور المبرمجين، لكن لدينا 500 سطر
من Java فحسب لنعمل بها، لذا كان لا بد من أن يُضحَّى بشيء ما! يمكنك أن ترى قائمة الأوامر على اليمين.
وإليك بعض ما يمكننا فعله:

- ضبط مرشِّحات RGB.
- ضبط «تسامح درجة اللون».
- ضبط مرشِّحات درجة اللون الغالبة، إما لإظهار درجة اللون الغالبة أو لإخفائها.
- تطبيق إعدادنا الحالي (من غير عملي تشغيله عند كل ضغطة مفتاح).
- إعادة تعيين الصورة.
- حفظ الصورة التي صنعناها.

\aosafigure[266pt]/images/500-lines/image-filters-3-app.webp{The App}{500l.imagefilters.app}

تجعل Processing إنشاء تطبيق
صغير ومعالجة الصور أمرًا بسيطًا؛
فهي ذات تركيز بصري شديد. وسنعمل مع النسخة المبنية على Java، مع أن Processing
تم نقلها الآن إلى لغات أخرى.

في هذا الدليل، أستخدم Processing داخل Eclipse بإضافة `core.jar` إلى مسار البناء. فإذا
رغبت في ذلك، يمكنك استخدام بيئة التطوير المتكاملة الخاصة بـ Processing، مما يلغي
الحاجة إلى كثير من شيفرة Java الجاهزة. وإذا أردت لاحقًا نقله إلى Processing.js
ورفعه إلى الإنترنت، فستحتاج إلى استبدال منتقي الملفات بشيء آخر.

هناك تعليمات مفصّلة مصحوبة بلقطات شاشة في
[مستودع المشروع](https://github.com/aosabook/500lines/blob/master/image-filters/SETUP.MD).
فإن كنت على دراية بـEclipse وJava بالفعل فلن تحتاج إليها.

## أساسيات Processing

### الحجم واللون

لا نريد أن يكون تطبيقنا نافذة رمادية صغيرة، لذا فإن الدالتين الأساسيتين
الذين سنبدأ بتجاوزهما هما
[`setup()`](http://processing.org/reference/setup_.html) و
[`draw()`](http://processing.org/reference/draw_.html). وتُستدعى الدالة `setup()`
عند بدء التطبيق فقط، وهي المكان الذي نفعل فيه أشياء مثل ضبط حجم
نافذة التطبيق. وتُستدعى الدالة `draw()` لكل إطار متحرك، أو بعد
إطلاق إجراء ما باستدعاء `redraw()`. (وكما ورد في
توثيق Processing، فلا ينبغي استدعاء `draw()` صراحةً.)

صُمّمت Processing لتعمل بشكل جيد في إنشاء الرسوم المتحرّكة، لكن في هذه
الحالة لا نريد حركة[^noanim]، بل نريد الاستجابة لضغطات المفاتيح. ولمنع
الحركة (التي كانت ستُثقل الأداء) سنستدعي
[`noLoop()`](http://www.processing.org/reference/noLoop_.html) من setup. وهذا
يعني أن `draw()` لن تُستدعى إلا مباشرة بعد `setup()`، وكلما
استدعينا `redraw()`.

[^noanim]: لو أردنا إنشاء رسم متحرك لما استدعينا
`noLoop()` (أو، لو أردنا بدء الحركة لاحقًا، لاستدعينا `loop()`).
وتحدّد `frameRate()` تكرار الإطارات المتحركة.

```java
private static final int WIDTH = 360;
private static final int HEIGHT = 240;

public void setup() {
  noLoop();

  // Set up the view.
  size(WIDTH, HEIGHT);
  background(0);
}
    
public void draw() {
  background(0);
}
```

لا تفعل هاتان الدالتان الكثير حتى الآن، لكن جرّب تشغيل التطبيق من جديد، واضبط الثابتين
في `WIDTH` و`HEIGHT`، لترى مقاسات مختلفة.

تحدّد `background(0)` خلفية سوداء. جرّب تغيير الرقم الممرَّر
إلى `background()` وانظر ما يحدث — إنها قيمة الشفافية، لذا فإن مرورك
برقم واحد فقط يعني أنها دائمًا بتدرّج رمادي. وبدلًا من ذلك يمكنك استدعاء
`background(int r, int g, int b)`.

### PImage

[kائن PImage](http://processing.org/reference/PImage.html) هو
كائن Processing الذي يمثّل صورة. وسنستخدمه كثيرًا،
لذا فإن قراءة توثيقه تستحق العناء. لديه ثلاثة حقول
(\aosatblref{500l.imagefilters.pimagefields}) إضافة إلى بعض الدوال التي
سنستخدمها (\aosatblref{500l.imagefilters.pimagemethods}).


<table>
  <tr>
    <td>`pixels[]`</td>
    <td>مصفوفة تحتوي على لون كل بكسل في الصورة</td>
  </tr>
  <tr>
    <td>`width`</td>
    <td>عرض الصورة بالبكسلات</td>
  </tr>
  <tr>
    <td>`height`</td>
    <td>ارتفاع الصورة بالبكسلات</td>
  </tr>
</table>
: \label{500l.imagefilters.pimagefields} حقول PImage

<latex>
\begin{table}
\centering
{\footnotesize
\rowcolors{2}{TableOdd}{TableEven}
\begin{tabular}{ll}
\hline
pixels[] & Array containing the color of every pixel in the image \\
width & Image width in pixels \\
height & Image height in pixels \\
\hline
\end{tabular}
}
\caption{PImage fields}
\label{500l.imagefilters.pimagefields}
\end{table}
</latex>


<table>
  <tr>
    <td>`loadPixels`</td>
    <td>يُحمّل بيانات بكسلات الصورة في مصفوفة `pixels[]` الخاصة بها</td>
  </tr>
  <tr>
    <td>`updatePixels`</td>
    <td>يحدّث الصورة بالبيانات الموجودة في مصفوفة `pixels[]`</td>
  </tr>
  <tr>
    <td>`resize`</td>
    <td>يغيّر حجم الصورة إلى عرض وارتفاع جديدين</td>
  </tr>
  <tr>
    <td>`get`</td>
    <td>يقرأ لون أي بكسل أو يلتقط مستطيلًا من البكسلات</td>
  </tr>
  <tr>
    <td>`set`</td>
    <td>يكتب لونًا في أي بكسل أو يكتب صورة في أخرى</td>
  </tr>
  <tr>
    <td>`save`</td>
    <td>يحفظ الصورة في ملف بصيغة TIFF أو TARGA أو PNG أو JPEG</td>
  </tr>
</table>
: \label{500l.imagefilters.pimagemethods} دوال PImage

<latex>
\begin{table}
\centering
{\footnotesize
\rowcolors{2}{TableOdd}{TableEven}
\begin{tabular}{ll}
\hline
loadPixels & Loads the pixel data for the image into its `pixels[]` array \\
updatePixels & Updates the image with the data in its `pixels[]` array \\
resize & Changes the size of an image to a new width and height \\
get & Reads the color of any pixel or grabs a rectangle of pixels \\
set & Writes a color to any pixel or writes an image into another \\
save & Saves the image to a TIFF, TARGA, PNG, or JPEG file \\
\hline
\end{tabular}
}
\caption{PImage methods}
\label{500l.imagefilters.pimagemethods}
\end{table}
</latex>

### منتقي الملفات
تتولى Processing معظم عملية اختيار الملف؛ كل ما نحتاجه هو استدعاء
[`selectInput()`](http://www.processing.org/reference/selectInput_.html)، و
تنفيذ دالة استدعاء (callback) (يجب أن تكون public).

قد يبدو هذا غريبًا لمن اعتاد Java؛ إذ قد يبدو المستمع أو تعبير
lambda سيبدو منطقيًا أكثر. لكن بما أن Processing طُوّرت كأداة
للفنانين، فإن هذه الأمور اختُزلت في الغالب بواسطة اللغة
حتى تبقى غير مخيفة. وهذا خيار اتخذه
المصمّمون: تقديم الأولوية للبساطة وسهولة الإقبال على حساب القوة
والمرونة. فإن استخدمت محرر Processing المجرّد، بدلًا من
استخدام Processing كمكتبة داخل Eclipse، فلن تحتاج حتى إلى تعريف أسماء الأصناف.

ومصممو اللغات الآخرون، ذوو الجماهير المستهدفة المختلفة، يتخذون خيارات
مختلفة، كما ينبغي. فمثلًا، في Haskell، وهي لغة
وظيفية خالصة، يُقدَّم فيها نقاء النماذج البرمجية الوظيفية على كل
شيء آخر. وهذا يجعلها أداة أفضل للمشكلات الرياضية
مما هي عليه لأي شيء يتطلب الإدخال/الإخراج.

```java
// Called on key press.
private void chooseFile() {
  // Choose the file.
  selectInput("Select a file to process:", "fileSelected");
}

public void fileSelected(File file) {
  if (file == null) {
    println("User hit cancel.");
  } else {
    // save the image
    redraw(); // update the display
  }
}
```

### الاستجابة لضغطات المفاتيح

عادةً في Java، تتطلب الاستجابة لضغطات المفاتيح إضافة مستمعات وتنفيذ
دوال مجهولة. لكن، كما في منتقي الملفات، تتولى Processing الكثير
من ذلك نيابةً عنا. كل ما نحتاجه هو تنفيذ
[`keyPressed()`](https://www.processing.org/reference/keyPressed_.html).

```java
public void keyPressed() {
  print(“key pressed: ” + key);
}
```

إذا شغّلت التطبيق من جديد، فسيُخرج كل مفتاح تضغطه إلى
وحدة التحكم. لاحقًا سترغب في فعل أشياء مختلفة تبعًا للمفتاح الذي
ضغطته، يكفي أن تبدّل على قيمة المفتاح. (وهذا موجود في
الصنف الأعلى `PApplet`، ويحوي آخر مفتاح ضُغط.)


## كتابة الاختبارات

لا يفعل هذا التطبيق الكثير حتى الآن، لكننا نستطيع بالفعل أن نرى عددًا من المواضع التي
قد تسوء فيها الأمور؛ مثل إطلاق الإجراء الخطأ عند ضغط المفاتيح.
ومع ازدياد التعقيد، نضيف مشكلات محتملة أكثر، مثل تحديث
حالة الصورة على نحو خاطئ، أو حساب ألوان البكسلات خطأً بعد تطبيق
مرشِّح. كما أنني أستمتع ببساطة (وإن كان بعضهم يظنها غريبة) بكتابة اختبارات وحدوية. ورغم
أن بعض الناس يبدو أنهم يظنون أن الاختبار شيء يؤخّر التحقق من إدخال الشيفرة، إلا أنني
أرى في الاختبارات أداة تصحيح الأخطاء رقم واحد عندي، وفرصة لفهم عميق لما
يجري في شيفرتي.

أُعجب بـProcessing كثيرًا، لكنها مصمَّمة
لإنشاء التطبيقات البصرية، وفي هذا المجال ربما لا تكون الاختبارات الوحدوية
مصدر قلق كبير. ومن الواضح أنها لم تُكتب بقابلية الاختبار في الحسبان؛ بل إنها مكتوبة
بطريقة تجعلها غير قابلة للاختبار بطبيعتها. وجزء من ذلك أنها تخفي
تعقيدًا، وبعض ذلك التعقيد المخفي مفيد فعلًا في كتابة الاختبارات
الوحدوية. فاستخدام الدوال الساكنة (static) والنهائية (final) يجعل من
الصعب جدًا استخدام الكائنات الوهمية (mocks)
(وهي كائنات تسجّل التفاعل وتتيح لك انتحال جزء من نظامك للتحقق
من سلوك جزء آخر على نحو صحيح)، إذ تعتمد تلك على القدرة على الوراثة.

قد نبدأ مشروعًا جديدًا بنوايا حسنة لممارسة التطوير المُوجَّه
بالاختبارات (TDD) وتحقيق تغطية اختبارية مثالية، لكن الواقع أننا
عادة ما ننظر إلى كتل من الشيفرة كتبها أشخاص متنوعون ونحاول
أن نكتشف ما يفترض أن يفعله، وكيف ولماذا
يذهب إلى الخطأ. لم نكتب اختبارات مثالية، لكن كتابة الاختبارات
بحد ذاتها ستساعدنا على اجتياز الموقف، وتوثيق ما يجري، والمضي
قُدُمًا.

ننشئ «مِلعَمات» (_seams_) تتيح لنا تفكيك شيء ما من
كتلته المشابكة والتحقق منه على أجزاء. ولهذا سننشئ أحيانًا
أصناف غلاف يمكن إحداث كائنات وهمية لها. وهذه الأصناف لا تفعل أكثر من
احتواء مجموعة من الدوال المتشابهة، أو تحويل الاستدعاءات إلى كائن آخر
لا يمكن إحداث كائن وهمي له (بسبب دوال نهائية أو ساكنة)، ومن ثم فهي
ممل جدًا في الكتابة، لكنه جوهري في إنشاء المِلعَمات وجعل الشيفرة قابلة
للاختبار.

استخدمت JUnit للاختبارات، لأنني كنت أعمل في Java مع Processing كمكتبة.
ولإحداث الكائنات الوهمية استخدمت Mockito. يمكنك تنزيل
[Mockito](https://code.google.com/p/mockito/downloads/list) وإضافة ملف JAR إلى
مسار البناء بالطريقة نفسها التي أضفت بها `core.jar`. وأنشأت صنفَي
مساعدة يتيحان إمكانية إحداث كائنات وهمية للتطبيق واختباره (وإلا لم نتمكن من اختبار
السلوك الذي يشمل دوال `PImage` أو `PApplet`).

`IFAImage` هو غلاف رقيق حول PImage. أما `PixelColorHelper` فهو غلاف
حول دوال ألوان البكسل في applet. تستدعي هذه الأغلفة الدوال النهائية
والساكنة، لكن دوال المستدعي ليست نهائية ولا ساكنة بذاتها — وهذا
يسمح بإحداث كائنات وهمية لها. وهذه الأغلفة خفيفة الوزن عن قصد، وكان بوسعنا
أن نذهب أبعد من ذلك، لكن هذا يكفي لمعالجة المشكلة الكبرى في
قابلية الاختبار عند استخدام Processing — الدوال الساكنة
والنهائية. فكان الهدف هو إنشاء تطبيق، بعد كل شيء — لا إطار اختبار وحدوي لـProcessing!

ويشكّل صنف اسمه `ImageState` «نموذج» (_model_) لهذا التطبيق، فهو يزيل
أقصى قدر ممكن من المنطق من الصنف الممتد من `PApplet`، من أجل قابلية
اختبار أفضل. كما أنه ينتج تصميمًا أنظف وفصلًا أفضل للمسؤوليات:
فـ`App` يتحكم في التفاعلات وواجهة المستخدم، لا في معالجة
الصورة.

## مرشِّحات تصنعها بنفسك

### مرشِّحات RGB
قبل أن نبدأ في كتابة معالجة بكسلات أعقد، يمكننا أن نبدأ بتمرين
قصير سيجعلنا مرتاحين في معالجة البكسلات. سننشئ
مرشِّحات لونية قياسية (أحمر، أخضر، أزرق) تتيح لنا خلق
الأثر نفسه الذي ينتج عن وضع لوح ملوّن أمام عدسة الكاميرا، وهي لاتمرّر
إلا الضوء الذي يحتوي على قدر كافٍ من الأحمر (أو الأخضر، أو الأزرق).


بتطبيق مرشِّحات مختلفة على هذه الصورة
\aosafigref{500l.imagefilters.frankfurt} (التُقطت في رحلة ربيعية إلى فرانكفورت)
 يكاد الأمر يكون كأن الفصول مختلفة. (أتذكر لوحات الفصول الأربعة
التي تخيلناها في وقت سابق؟) لاحظ كم تصير الشجرة أكثر خضرة
عند تطبيق المرشِّح الأحمر.

\aosafigure[240pt]/images/500-lines/image-filters-4-frankfurt.webp{Four (Simulated) Seasons in Frankfurt}{500l.imagefilters.frankfurt}

<latex>
By applying different RGB filters to an image we can make it almost seem like
the seasons are different depending which colors are filtered out 
and which are emphasized. (Remember the four-seasons paintings
we imagined earlier?) 
</latex>

كيف نفعل ذلك؟

- اضبط المرشِّح. (يمكنك أن تجمع مرشِّحات الأحمر والأخضر والأزرق كما في الصورة
  السابقة؛ لم أفعل ذلك في هذه الأمثلة حتى يكون الأثر أوضح.)

- لكل بكسل في الصورة، افحص قيمة RGB الخاصة به.

- إذا كان الأحمر أقل من مرشِّح الأحمر، فاضبط الأحمر على الصفر.
- إذا كان الأخضر أقل من مرشِّح الأخضر، فاضبط الأخضر على الصفر.
- إذا كان الأزرق أقل من مرشِّح الأزرق، فاضبط الأزرق على الصفر.
- أي بكسل يفتقر إلى هذه الألوان جميعها سيكون أسود.

رغم أن صورتنا ثنائية الأبعاد، فإن البكسلات تعيش في مصفوفة
أحادية البعد تبدأ من أعلى اليسار وتتحرك [من اليسار إلى اليمين، ومن أعلى إلى
أسفل](https://processing.org/tutorials/pixels/). وتُبيَّن هنا فهارس المصفوفة
لصورة 4×4:


<table>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
  <tr>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
  </tr>
  <tr>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
  </tr>
  <tr>
    <td>12</td>
    <td>13</td>
    <td>14</td>
    <td>15</td>
  </tr>
</table>
: \label{500l.imagefilters.pixelindices} فهارس البكسلات في صورة 4×4

<latex>
\begin{table}
\centering
{\footnotesize
\rowcolors{2}{TableOdd}{TableOdd}
\begin{tabular}{cccc}
\hline
0 & 1 & 2 & 3 \\
4 & 5 & 6 & 7 \\
8 & 9 & 10 & 11 \\
12 & 13 & 14 & 15 \\
\hline
\end{tabular}
}
\caption{Pixel indices for a 4x4 image}
\label{500l.imagefilters.pixelindices}
\end{table}
</latex>

```java
public void applyColorFilter(PApplet applet, IFAImage img, int minRed,
      int minGreen, int minBlue, int colorRange) {  
  img.loadPixels();
  int numberOfPixels = img.getPixels().length;
  for (int i = 0; i < numberOfPixels; i++) {
    int pixel = img.getPixel(i);
    float alpha = pixelColorHelper.alpha(applet, pixel);
    float red = pixelColorHelper.red(applet, pixel);
    float green = pixelColorHelper.green(applet, pixel);
    float blue = pixelColorHelper.blue(applet, pixel);
      
    red = (red >= minRed) ? red : 0;
    green = (green >= minGreen) ? green : 0;
    blue = (blue >= minBlue) ? blue : 0;
    
    image.setPixel(i, pixelColorHelper.color(applet, red, green, blue, alpha));
  }
}
```

### اللون
وكما أظهر مثالنا الأول لمرشِّح صور، فإن مفهوم اللون وتمثيله
في برنامج مهم إلى حدٍّ كبير لفهم كيفية عمل مرشِّحاتنا.
ولكي نستعد للعمل على مرشِّحنا التالي، فلنستكشف مفهوم
اللون بمزيد قليل.

كنا نستخدم مفهومًا
في القسم السابق اسمه «فضاء اللون» (_color space_)، وهو طريقة لتمثيل
اللون رقميًا. ويتعلم الأطفال الذين يخلطون الألوان أن الألوان يمكن أن تُصنع من
ألوان أخرى؛ والأمور تعمل بصورة مشابهة لكن مختلفة قليلًا في العالم
الرقمي (مع مخاطرة أقل بالتغطية بالطلاء!). وتجعل Processing من العمل
مع أي فضاء ألوان تريده أمرًا سهلًا حقًا، لكن عليك أن تعرف أيّها
تختار، لذا من المهم أن تفهم كيف تعمل.

#### ألوان RGB
فضاء الألوان الذي يعرفه معظم المبرمجين هو RGBA: الأحمر والأخضر
والأزرق والشفافية؛ وهو ما كنا نستخدمه أعلاه. وفي النظام السداسي (الأساس 16)، يكون أول محرفين هو مقدار
الأحمر، والمحرفان الثانيان الأزرق، والمحرفان الثالثان الأخضر، والمحرفان الأخيران
(إن وُجدا) هما قيمة الشفافية. وتتراوح القيم من 00 في الأساس 16 (أي 0 في الأساس
10) وصولًا إلى FF (أي 255 في الأساس 10). ويمثّل الـalpha
العتامة، حيث 0 شفاف و100% معتم.

#### ألوان HSB أو HSV
فضاء الألوان هذا ليس معروفًا إلى حدٍّ بقدر RGB. يمثل الرقم الأول
درجة اللون، والرقم الثاني التشبّع (إلى أي حدٍّ كثيف اللون)، والرقم
الثالث السطوع. ويمكن تمثيل فضاء ألوان HSB بمخروط: فدرجة اللون
هي الموضع حول المخروط، والتشبّع هو البعد عن المركز، و
السطوع هو الارتفاع (السطوع صفر يعني الأسود).

### استخراج درجة اللون الغالبة من صورة
الآن وقد ارتحنا إلى معالجة البكسلات، فلنفعل شيئًا لا يمكننا
فعله إلا رقميًا. ويمكننا أن نعالج الصورة بطريقة ليست
موحّدة إلى هذا الحد.

عندما أتصفح مجرى صوري أستطيع أن أرى الموضوعات
منبثقة. سلسلة الليل التي التقطتها عند الغروب من مركب في ميناء
هونغ كونغ، والرمادي في كوريا الشمالية، والأخضر الكثيف في بالي، والأبيض الجليدي
والأزرق الباهت في شتاء آيسلندي. فهل يمكننا التقاط صورة واستخراج ذلك
اللون الرئيسي الذي يهيمن على المشهد؟

من المنطقي استخدام فضاء ألوان HSB هنا — فنحن مهتمون بدرجة اللون
حين نحدّد ما هو اللون
الرئيسي. ومن الممكن فعل ذلك باستخدام قيم RGB، لكنه أصعب (فقد
نضطر إلى مقارنة القيم الثلاث) وكان أكثر حساسية للظلام.
و يمكننا الانتقال إلى فضاء ألوان HSB باستخدام
[colorMode](http://processing.org/reference/colorMode_.html).

وبعد أن استقرّينا على فضاء الألوان هذا، صار الأمر أبسط مما كان سيكون
مع RGB. فنحتاج إلى معرفة درجة لون كل بكسل، ومعرفة أيّها «الأكثر
شيوعًا». وعلى الأرجح لا نريد الدقة التامة — بل نريد تجميع درجات
الألوان المتشابهة جدًا معًا، يمكننا التعامل مع هذا باستخدام استراتيجيتين.

أولًا، سنقرّب الكسور العشرية التي تعود بنا إلى أعداد صحيحة، لأن هذا
يجعل من البسيط تحديد أي «دلو» نضع فيه كل بكسل. ثانيًا يمكننا
تغيير مدى درجات الألوان. فإذا استرجعنا في أذهاننا تمثيل المخروط أعلاه، فقد
نتعامل مع درجات الألوان على أنها تملك 360 درجة (مثل دائرة). وتستخدم Processing 255
افتراضيًا، وهو الأمر المعتاد في RGB أيضًا (255 هي FF في النظام السداسي).
وكلما كان المدى الذي نستخدمه أكبر، كانت درجات الألوان في الصورة أكثر
تمييزًا. واسمخدام مدى أصغر سنتمكن من تجميع درجات الألوان المتشابهة معًا. فباستخدام مدى 360
درجة، من المستبعدل أن نتمكن من التمييز بين
درجة لون 224 ودرجة لون 225، لأن الفرق صغير جدًا. وإذا جعلنا
المدى ثلث ذلك، أي 120، تصبح الدرجتان كلتاهما 75 بعد التقريب.

ويمكننا تغيير مدى درجات الألوان باستخدام `colorMode`. فإذا استدعينا `colorMode(HSB, 120)`
فقد جعلنا كشف درجة اللون أقل دقة بمقدار النصف تقريبًا مما لو استخدمنا
مدى 255. ونعلم أيضًا أن درجات ألواننا ستقع في 120 «دلوًا»، لذا يمكننا
ببساطة أن نمر على صورتنا، ونأخذ درجة لون البكسل، ونضيف واحدًا إلى
العدّاد المقابل في مصفوفة. وسيكون هذا $O(n)$، حيث $n$ هو
عدد البكسلات، لأنه يتطلب إجراءً مع كل واحد منها.

```java
for(int px in pixels) {
  int hue = Math.round(hue(px));
  hues[hue]++;
}
```


في النهاية يمكننا طباعة درجة اللون هذه على الشاشة، أو عرضها بجوار
الصورة (\aosafigref{500l.imagefilters.hueranges}).

\aosafigure[240pt]/images/500-lines/image-filters-5-hueranges.webp{Dominant hue versus size of range (number of buckets) used}{500l.imagefilters.hueranges}



<latex>
At the end we can print this hue to the screen, or display it next to the
picture. 
</latex>


بمجرد أن استخرجنا درجة اللون «الغالبة»، يمكننا أن نختار إما إظهارها أو
إخفائها في الصورة. ويمكننا إظهار درجة اللون الغالبة بدرجات تسامح متفاوتة (مجالات
حولها نقبلها). ويمكن تغيير البكسلات التي لا تقع في هذا المجال إلى
تدرّج رمادي عبر ضبط القيمة بناءً على السطوع.
يُظهر \aosafigref{500l.imagefilters.showdominant} درجة اللون الغالبة المحدَّدة
باستخدام مدى 240، وبدرجات تسامح متفاوتة. أما التسامح فهو
المقدار على جانبي درجة اللون الأكثر شيوعًا الذي يُجمَّع معًا.

\aosafigure[240pt]/images/500-lines/image-filters-6-showdominant.webp{Showing dominant hue}{500l.imagefilters.showdominant}


<latex>
Once we've extracted the "dominant" hue, we can choose to either show or hide
it in the image. We can show the dominant hue with varying tolerance (ranges
around it that we will accept). Pixels that don't fall into this range can be
changed to grayscale by setting the value based on the brightness.
Alternatively, we can hide the dominant hue by setting the color for pixels with that hue to greyscale, and leaving other pixels as they are. 
</latex>


وبدلًا من ذلك، يمكننا إخفاء درجة اللون الغالبة. في
\aosafigref{500l.imagefilters.hidedominant}، تكون الصور جنبًا إلى جنب:
الأصل في الوسط، وعلى اليسار تُعرض درجة اللون الغالبة (اللون البني الفاتح
للطريق)، وعلى اليمين تُخفى درجة اللون الغالبة (مدى 320، تسامح 20).

\aosafigure[240pt]/images/500-lines/image-filters-7-hidedominant.webp{Hiding dominant hue}{500l.imagefilters.hidedominant}


تتطلب كل صورة مرورًا مزدوجًا (النظر في كل بكسل مرتين)، لذا فإن الصور
ذات العدد الكبير من البكسلات قد تستغرق وقتًا ملحوظًا.

```java
public HSBColor getDominantHue(PApplet applet, IFAImage image, int hueRange) {
  image.loadPixels();
  int numberOfPixels = image.getPixels().length;
  int[] hues = new int[hueRange];
  float[] saturations = new float[hueRange];
  float[] brightnesses = new float[hueRange];

  for (int i = 0; i < numberOfPixels; i++) {
    int pixel = image.getPixel(i);
    int hue = Math.round(pixelColorHelper.hue(applet, pixel));
    float saturation = pixelColorHelper.saturation(applet, pixel);
    float brightness = pixelColorHelper.brightness(applet, pixel);
    hues[hue]++;
    saturations[hue] += saturation;
    brightnesses[hue] += brightness;
  }

  // Find the most common hue.
  int hueCount = hues[0];
  int hue = 0;
  for (int i = 1; i < hues.length; i++) {
    if (hues[i] > hueCount) {
      hueCount = hues[i];
      hue = i;
    }
  }

  // Return the color to display.
  float s = saturations[hue] / hueCount;
  float b = brightnesses[hue] / hueCount;
  return new HSBColor(hue, s, b);
}


public void processImageForHue(PApplet applet, IFAImage image, int hueRange,
    int hueTolerance, boolean showHue) {
  applet.colorMode(PApplet.HSB, (hueRange - 1));
  image.loadPixels();
  int numberOfPixels = image.getPixels().length;
  HSBColor dominantHue = getDominantHue(applet, image, hueRange);
  // Manipulate photo, grayscale any pixel that isn't close to that hue.
  float lower = dominantHue.h - hueTolerance;
  float upper = dominantHue.h + hueTolerance;
  for (int i = 0; i < numberOfPixels; i++) {
    int pixel = image.getPixel(i);
    float hue = pixelColorHelper.hue(applet, pixel);
    if (hueInRange(hue, hueRange, lower, upper) == showHue) {
      float brightness = pixelColorHelper.brightness(applet, pixel);
      image.setPixel(i, pixelColorHelper.color(applet, brightness));
    }
  }
  image.updatePixels();
}
```

### دمج المرشِّحات

مع واجهة المستخدم كما هي، يستطيع المستخدم أن يجمع مرشِّحات الأحمر
والأخضر والأزرق معًا. لكن إذا جُمعت مرشِّحات درجة اللون الغالبة مع
مرشِّحات الأحمر والأخضر والأزرق، فقد تكون النتائج أحيانًا غير متوقعة قليلًا، بسبب
تغيّر فضاءات الألوان.

ولدى Processing بعض [الدوال
المدمجة](https://www.processing.org/reference/filter_.html) التي تدعم
معالجة الصور؛ مثل `invert` و`blur`.

ولتحقيق آثار مثل التفتيح أو التمويه أو التأثير السيبيا، فإننا نطبّق
مصفوفات (matrices). فلكل بكسل في الصورة، خذ مجموع حاصلات الضرب، حيث كل
حاصل ضرب هو قيمة لون البكسل الحالي أو أحد جيرانه، مضروبة في
القيمة المقابلة في [مصفوفة
المرشِّح](http://lodev.org/cgtutor/filtering.html). وهناك بعض المصفوفات
الخاصة بقيم محددة تُحسِّن الصور.

## البنية

هناك ثلاثة مكوّنات رئيسية للتطبيق (\aosafigref{500l.imagefilters.architecture}).

### التطبيق
يتكوّن التطبيق من ملف واحد: `ImageFilterApp.java`. وهذا
الصنف يمتد من `PApplet` (الصنف الأعلى لتطبيقات
Processing) ويتولى التخطيط وتفاعل المستخدم وما إلى ذلك. وهذا الصنف
هو الأصعب في الاختبار، لذا نريد إبقاءه صغيرًا قدر الإمكان.

### النموذج
يتكوّن النموذج من ثلاثة ملفات: `HSBColor.java` حاوية بسيطة لألوان HSB
(المكوّنة من درجة اللون والتشبّع والسطوع). و`IFAImage` هو
غلاف حول `PImage` من أجل قابلية الاختبار. (يحتوي `PImage` على عدد من الدوال النهائية
التي لا يمكن إحداث كائنات وهمية لها.) وأخيرًا، `ImageState.java` هو الكائن
الذي يصف حالة الصورة — أي مستوى المرشِّحات الذي ينبغي تطبيقه،
وأي المرشِّحات — ويتولى تحميل الصورة. (لاحظ: تحتاج الصورة إلى إعادة التحميل
في كل مرة تُخفَّض فيها مرشِّحات الألوان، وكلما أُعيد حساب درجة اللون الغالبة.
ولأجل الوضوح، فإننا نعيد التحميل في كل مرة تُعالَج فيها الصورة.)

### اللون
يتكوّن اللون من ملفين: `ColorHelper.java` هو المكان الذي تجري فيه كل
معالجة الصور والترشيح، و`PixelColorHelper.java`
يُجَرِّد دوال `PApplet` النهائية الخاصة بألوان البكسلات من أجل قابلية الاختبار.

\aosafigure[240pt]/images/500-lines/image-filters-8-architecture.webp{Architecture diagram}{500l.imagefilters.architecture}

### أصناف الغلاف والاختبارات
كما ذُكر بإيجاز أعلاه، هناك صنفا غلاف (`IFAImage` و
`PixelColorHelper`) يغلّفان دوال المكتبة من أجل قابلية الاختبار. والسبب في ذلك أن
كلمة "final" في Java تشير إلى دالة لا يمكن تجاوزها أو إخفاؤها بواسطة
الأصناف الفرعية، ما يعني أنه لا يمكن إحداث كائنات وهمية لها.

يغلّف `PixelColorHelper` دوال applet. وهذا يعني أننا نحتاج إلى تمرير applet
في كل استدعاء دالة. (وبدلًا من ذلك، يمكننا جعله حقلًا
وضبطه عند التهيئة.)

```java
package com.catehuston.imagefilter.color;

import processing.core.PApplet;

public class PixelColorHelper {

  public float alpha(PApplet applet, int pixel) {
    return applet.alpha(pixel);
  }

  public float blue(PApplet applet, int pixel) {
    return applet.blue(pixel);
  }

  public float brightness(PApplet applet, int pixel) {
    return applet.brightness(pixel);
  }

  public int color(PApplet applet, float greyscale) {
    return applet.color(greyscale);
  }

  public int color(PApplet applet, float red, float green, float blue,
           float alpha) {
    return applet.color(red, green, blue, alpha);
  }

  public float green(PApplet applet, int pixel) {
    return applet.green(pixel);
  }

  public float hue(PApplet applet, int pixel) {
    return applet.hue(pixel);
  }

  public float red(PApplet applet, int pixel) {
    return applet.red(pixel);
  }

  public float saturation(PApplet applet, int pixel) {
    return applet.saturation(pixel);
  }
}
```

و`IFAImage` هو غلاف حول `PImage`، لذا فإننا في تطبيقنا لا نهيّئ كائن
`PImage` بل كائن `IFAImage` — مع أننا مضطرون إلى كشف
`PImage` كي يمكن عرضه.

```java
package com.catehuston.imagefilter.model;

import processing.core.PApplet;
import processing.core.PImage;

public class IFAImage {

  private PImage image;

  public IFAImage() {
    image = null;
  }

  public PImage image() {
    return image;
  }

  public void update(PApplet applet, String filepath) {
    image = null;
    image = applet.loadImage(filepath);
  }

  // Wrapped methods from PImage.
  public int getHeight() {
    return image.height;
  }

  public int getPixel(int px) {
    return image.pixels[px];
  }

  public int[] getPixels() {
    return image.pixels;
  }

  public int getWidth() {
    return image.width;
  }

  public void loadPixels() {
    image.loadPixels();
  }

  public void resize(int width, int height) {
    image.resize(width, height);
  }

  public void save(String filepath) {
    image.save(filepath);
  }

  public void setPixel(int px, int color) {
    image.pixels[px] = color;
  }

  public void updatePixels() {
    image.updatePixels();
  }
}
```

وأخيرًا، لدينا صنف الحاوية البسيط `HSBColor`. ولاحظ أنه
غير قابل للتغيير (فبمجرد إنشائه لا يمكن تغييره). والأصناف غير القابلة للتغيير أفضل
لأجل سلامة الخيوط (وهو أمر لسنا بحاجة إليه هنا!) لكنها أيضًا أسهل
في الفهم والاستدلال. وعلى العموم، أميل إلى جعل أصناف النموذج البسيطة
غير قابلة للتغيير ما لم أجد سببًا جيدًا لغير ذلك.

قد يعرف بعضكم أن هناك بالفعل أصنافًا تمثّل اللون في
[Processing](https://www.processing.org/reference/color_datatype.html) وفي
[Java نفسها](https://docs.oracle.com/javase/7/docs/api/java/awt/Color.html).
ودون الدخول في تفاصيلهما كثيرًا، كلاهما يركّز على
لون RGB أكثر، وصنف Java تحديدًا يضيف تعقيدًا أكبر بكثير مما نحتاجه.
ربما كان الأمر لائقًا لو أردنا استخدام `awt.Color` من Java؛ لكن
[مكوّنات awt GUI لا يمكن استخدامها في
Processing](http://processing.org/reference/javadoc/core/processing/core/PApplet.html)،
لذا فإن إنشاء صنف الحاوية البسيط هذا ليحمل قطع البيانات التي نحتاجها
هو الأسهل لأغراضنا.

```java
package com.catehuston.imagefilter.model;

public class HSBColor {

  public final float h;
  public final float s;
  public final float b;

  public HSBColor(float h, float s, float b) {
    this.h = h;
    this.s = s;
    this.b = b;
  }
}
```

### ColorHelper والاختبارات المرتبطة به

`ColorHelper` هو المكان الذي تعيش فيه كل معالجة الصور. ويمكن أن تكون دوال هذا
الصنف ساكنة (static) لولا حاجتها إلى `PixelColorHelper`. (مع أننا
لن ندخل في نقاش مزايا الدوال الساكنة هنا.)

```java
package com.catehuston.imagefilter.color;

import processing.core.PApplet;

import com.catehuston.imagefilter.model.HSBColor;
import com.catehuston.imagefilter.model.IFAImage;

public class ColorHelper {

  private final PixelColorHelper pixelColorHelper;

  public ColorHelper(PixelColorHelper pixelColorHelper) {
    this.pixelColorHelper = pixelColorHelper;
  }

  public boolean hueInRange(float hue, int hueRange, float lower, float upper) {
    // Need to compensate for it being circular - can go around.
    if (lower < 0) {
      lower += hueRange;
    }
    if (upper > hueRange) {
      upper -= hueRange;
    }
    if (lower < upper) {
      return hue < upper && hue > lower;
    } else {
      return hue < upper || hue > lower;
    }
  }

  public HSBColor getDominantHue(PApplet applet, IFAImage image, int hueRange) {
    image.loadPixels();
    int numberOfPixels = image.getPixels().length;
    int[] hues = new int[hueRange];
    float[] saturations = new float[hueRange];
    float[] brightnesses = new float[hueRange];

    for (int i = 0; i < numberOfPixels; i++) {
      int pixel = image.getPixel(i);
      int hue = Math.round(pixelColorHelper.hue(applet, pixel));
      float saturation = pixelColorHelper.saturation(applet, pixel);
      float brightness = pixelColorHelper.brightness(applet, pixel);
      hues[hue]++;
      saturations[hue] += saturation;
      brightnesses[hue] += brightness;
    }

    // Find the most common hue.
    int hueCount = hues[0];
    int hue = 0;
    for (int i = 1; i < hues.length; i++) {
      if (hues[i] > hueCount) {
        hueCount = hues[i];
        hue = i;
      }
    }

    // Return the color to display.
    float s = saturations[hue] / hueCount;
    float b = brightnesses[hue] / hueCount;
    return new HSBColor(hue, s, b);
  }

  public void processImageForHue(PApplet applet, IFAImage image, int hueRange,
      int hueTolerance, boolean showHue) {
    applet.colorMode(PApplet.HSB, (hueRange - 1));
    image.loadPixels();
    int numberOfPixels = image.getPixels().length;
    HSBColor dominantHue = getDominantHue(applet, image, hueRange);
    // Manipulate photo, grayscale any pixel that isn't close to that hue.
    float lower = dominantHue.h - hueTolerance;
    float upper = dominantHue.h + hueTolerance;
    for (int i = 0; i < numberOfPixels; i++) {
      int pixel = image.getPixel(i);
      float hue = pixelColorHelper.hue(applet, pixel);
      if (hueInRange(hue, hueRange, lower, upper) == showHue) {
        float brightness = pixelColorHelper.brightness(applet, pixel);
        image.setPixel(i, pixelColorHelper.color(applet, brightness));
      }
    }
    image.updatePixels();
  }

  public void applyColorFilter(PApplet applet, IFAImage image, int minRed,
      int minGreen, int minBlue, int colorRange) {
    applet.colorMode(PApplet.RGB, colorRange);
    image.loadPixels();
    int numberOfPixels = image.getPixels().length;
    for (int i = 0; i < numberOfPixels; i++) {
      int pixel = image.getPixel(i);
      float alpha = pixelColorHelper.alpha(applet, pixel);
      float red = pixelColorHelper.red(applet, pixel);
      float green = pixelColorHelper.green(applet, pixel);
      float blue = pixelColorHelper.blue(applet, pixel);

      red = (red >= minRed) ? red : 0;
      green = (green >= minGreen) ? green : 0;
      blue = (blue >= minBlue) ? blue : 0;

      image.setPixel(i, pixelColorHelper.color(applet, red, green, blue, alpha));
    }
  }
}
```

لا نريد اختبار هذا بصور كاملة، لأننا نريد صورًا نعرف
خصائصها ونستطيع الاستدلال بشأنها. ونقارب ذلك بإحداث كائنات وهمية
للصور تجعلها تُعيد مصفوفة بكسلات — في هذه الحالة، 5. وهذا
يتيح لنا
التحقق من أن السلوك هو السلوك المتوقع. وقد غطّينا سابقًا مفهوم الكائنات
الوهمية، وهنا نرى استخدامها. ونحن نستخدم
[Mockito](http://docs.mockito.googlecode.com/hg/org/mockito/Mockito.html) بوصفه
إطار عمل الكائنات الوهمية لدينا.

ولإنشاء كائن وهمي نستخدم التعليق التوضيحي `@Mock` على متغيّر نسخة، وسيُحداث كائنه الوهمي في وقت التشغيل بواسطة
`MockitoJUnitRunner`.

ولتجهيز (ضبط سلوك) دالة، نستخدم:

```java
    when(mock.methodCall()).thenReturn(value)
```

وللتحقق من أن دالة قد استُدعيت، نستخدم `verify(mock.methodCall())`.

وسنعرض هنا بضع حالات اختبار نموذجية؛ فإذا رغبت في رؤية الباقي، فزر
مجلد المصدر لهذا المشروع في [مستودع GitHub الخاص بـ_500 Lines or
Less_](https://github.com/aosabook/500lines/tree/master/image-filters).

```java
package com.catehuston.imagefilter.color;

/* ... Imports omitted ... */

@RunWith(MockitoJUnitRunner.class)
public class ColorHelperTest {

  @Mock PApplet applet;
  @Mock IFAImage image;
  @Mock PixelColorHelper pixelColorHelper;

  ColorHelper colorHelper;

  private static final int px1 = 1000;
  private static final int px2 = 1010;
  private static final int px3 = 1030;
  private static final int px4 = 1040;
  private static final int px5 = 1050;
  private static final int[] pixels = { px1, px2, px3, px4, px5 };

  @Before public void setUp() throws Exception {
    colorHelper = new ColorHelper(pixelColorHelper);
    when(image.getPixels()).thenReturn(pixels);
    setHsbValuesForPixel(0, px1, 30F, 5F, 10F);
    setHsbValuesForPixel(1, px2, 20F, 6F, 11F);
    setHsbValuesForPixel(2, px3, 30F, 7F, 12F);
    setHsbValuesForPixel(3, px4, 50F, 8F, 13F);
    setHsbValuesForPixel(4, px5, 30F, 9F, 14F);
  }

  private void setHsbValuesForPixel(int px, int color, float h, float s, float b) {
    when(image.getPixel(px)).thenReturn(color);
    when(pixelColorHelper.hue(applet, color)).thenReturn(h);
    when(pixelColorHelper.saturation(applet, color)).thenReturn(s);
    when(pixelColorHelper.brightness(applet, color)).thenReturn(b);
  }

  private void setRgbValuesForPixel(int px, int color, float r, float g, float b, 
            float alpha) {
    when(image.getPixel(px)).thenReturn(color);
    when(pixelColorHelper.red(applet, color)).thenReturn(r);
    when(pixelColorHelper.green(applet, color)).thenReturn(g);
    when(pixelColorHelper.blue(applet, color)).thenReturn(b);
    when(pixelColorHelper.alpha(applet, color)).thenReturn(alpha);
  }

    @Test public void testHsbColorFromImage() {
    HSBColor color = colorHelper.getDominantHue(applet, image, 100);
    verify(image).loadPixels();

    assertEquals(30F, color.h, 0);
    assertEquals(7F, color.s, 0);
    assertEquals(12F, color.b, 0);
  }

  @Test public void testProcessImageNoHue() {
    when(pixelColorHelper.color(applet, 11F)).thenReturn(11);
    when(pixelColorHelper.color(applet, 13F)).thenReturn(13);
    colorHelper.processImageForHue(applet, image, 60, 2, false);
    verify(applet).colorMode(PApplet.HSB, 59);
    verify(image, times(2)).loadPixels();
    verify(image).setPixel(1, 11);
    verify(image).setPixel(3, 13);
  }

  @Test public void testApplyColorFilter() {
    setRgbValuesForPixel(0, px1, 10F, 12F, 14F, 60F);
    setRgbValuesForPixel(1, px2, 20F, 22F, 24F, 70F);
    setRgbValuesForPixel(2, px3, 30F, 32F, 34F, 80F);
    setRgbValuesForPixel(3, px4, 40F, 42F, 44F, 90F);
    setRgbValuesForPixel(4, px5, 50F, 52F, 54F, 100F);

    when(pixelColorHelper.color(applet, 0F, 0F, 0F, 60F)).thenReturn(5);
    when(pixelColorHelper.color(applet, 20F, 0F, 0F, 70F)).thenReturn(15);
    when(pixelColorHelper.color(applet, 30F, 32F, 0F, 80F)).thenReturn(25);
    when(pixelColorHelper.color(applet, 40F, 42F, 44F, 90F)).thenReturn(35);
    when(pixelColorHelper.color(applet, 50F, 52F, 54F, 100F)).thenReturn(45);

    colorHelper.applyColorFilter(applet, image, 15, 25, 35, 100);
    verify(applet).colorMode(PApplet.RGB, 100);
    verify(image).loadPixels();

    verify(image).setPixel(0, 5);
    verify(image).setPixel(1, 15);
    verify(image).setPixel(2, 25);
    verify(image).setPixel(3, 35);
    verify(image).setPixel(4, 45);
  }
}
```

\newpage

لاحظ ما يلي:

- نستخدم مُشغِّل `MockitoJUnit`.
- نُحدث كائنات وهمية لـ`PApplet` و`IFAImage` (أُنشئ خصيصًا لهذا الغرض) و`ImageColorHelper`.
- دوال الاختبار موسومة بالتعليق التوضيحي `@Test`[^habits]. فإذا أردت تجاهل اختبار (مثلًا أثناء تصحيح الأخطاء) يمكنك إضافة التعليق التوضيحي `@Ignore`.
- في `setup()`، ننشئ مصفوفة البكسلات ونجعل الصورة الوهمية تعيدها دائمًا.
- دوال المساعدة تجعل ضبط التوقعات للمهام المتكررة أسهل (مثل `set*ForPixel()`).

[^habits]: لم تعد أسماء الدوال في الاختبارات تحتاج إلى أن تبدأ بـ`test` منذ JUnit 4، لكن العادات صعبة الكسر.

### حالة الصورة والاختبارات المرتبطة بها
تحمل `ImageState` «حالة» الصورة الحالية — الصورة نفسها، والإعدادات
والمرشِّحات التي ستُطبَّق. وسنُغفل التنفيذ الكامل
لـ`ImageState` هنا، لكننا سنعرض كيف يمكن اختباره. ويمكنك زيارة مستودع المصدر
لهذا المشروع لرؤية التفاصيل الكاملة.

```java
package com.catehuston.imagefilter.model;

import processing.core.PApplet;
import com.catehuston.imagefilter.color.ColorHelper;

public class ImageState {

  enum ColorMode {
    COLOR_FILTER,
    SHOW_DOMINANT_HUE,
    HIDE_DOMINANT_HUE
  }

  private final ColorHelper colorHelper;
  private IFAImage image;
  private String filepath;

  public static final int INITIAL_HUE_TOLERANCE = 5;

  ColorMode colorModeState = ColorMode.COLOR_FILTER;
  int blueFilter = 0;
  int greenFilter = 0;
  int hueTolerance = 0;
  int redFilter = 0;

  public ImageState(ColorHelper colorHelper) {
    this.colorHelper = colorHelper;
    image = new IFAImage();
    hueTolerance = INITIAL_HUE_TOLERANCE;
  }
  /* ... getters & setters */
  public void updateImage(PApplet applet, int hueRange, int rgbColorRange, 
          int imageMax) { ... }

  public void processKeyPress(char key, int inc, int rgbColorRange,
          int hueIncrement, int hueRange) { ... }

  public void setUpImage(PApplet applet, int imageMax) { ... }

  public void resetImage(PApplet applet, int imageMax) { ... }

  // For testing purposes only.
  protected void set(IFAImage image, ColorMode colorModeState,
            int redFilter, int greenFilter, int blueFilter, int hueTolerance) { ... }
}
```

وهنا يمكننا أن نختبر أن الإجراءات الملائمة تحدث للحالة المعطاة؛ وأن
الحقول تُزاد وتُنقص على النحو المناسب.

```java
package com.catehuston.imagefilter.model;

/* ... Imports omitted ... */

@RunWith(MockitoJUnitRunner.class)
public class ImageStateTest {

  @Mock PApplet applet;
  @Mock ColorHelper colorHelper;
  @Mock IFAImage image;

  private ImageState imageState;

  @Before public void setUp() throws Exception {
    imageState = new ImageState(colorHelper);
  }

  private void assertState(ColorMode colorMode, int redFilter,
      int greenFilter, int blueFilter, int hueTolerance) {
    assertEquals(colorMode, imageState.getColorMode());
    assertEquals(redFilter, imageState.redFilter());
    assertEquals(greenFilter, imageState.greenFilter());
    assertEquals(blueFilter, imageState.blueFilter());
    assertEquals(hueTolerance, imageState.hueTolerance());
  }

  @Test public void testUpdateImageDominantHueHidden() {
    imageState.setFilepath("filepath");
    imageState.set(image, ColorMode.HIDE_DOMINANT_HUE, 5, 10, 15, 10);

    imageState.updateImage(applet, 100, 100, 500);

    verify(image).update(applet, "filepath");
    verify(colorHelper).processImageForHue(applet, image, 100, 10, false);
    verify(colorHelper).applyColorFilter(applet, image, 5, 10, 15, 100);
    verify(image).updatePixels();
  }

  @Test public void testUpdateDominantHueShowing() {
    imageState.setFilepath("filepath");
    imageState.set(image, ColorMode.SHOW_DOMINANT_HUE, 5, 10, 15, 10);

    imageState.updateImage(applet, 100, 100, 500);

    verify(image).update(applet, "filepath");
    verify(colorHelper).processImageForHue(applet, image, 100, 10, true);
    verify(colorHelper).applyColorFilter(applet, image, 5, 10, 15, 100);
    verify(image).updatePixels();
  }

  @Test public void testUpdateRGBOnly() {
    imageState.setFilepath("filepath");
    imageState.set(image, ColorMode.COLOR_FILTER, 5, 10, 15, 10);

    imageState.updateImage(applet, 100, 100, 500);

    verify(image).update(applet, "filepath");
    verify(colorHelper, never()).processImageForHue(any(PApplet.class), 
                any(IFAImage.class), anyInt(), anyInt(), anyBoolean());
    verify(colorHelper).applyColorFilter(applet, image, 5, 10, 15, 100);
    verify(image).updatePixels();
  }

  @Test public void testKeyPress() {
    imageState.processKeyPress('r', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 5, 0, 0, 5);

    imageState.processKeyPress('e', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);

    imageState.processKeyPress('g', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 5, 0, 5);

    imageState.processKeyPress('f', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);

    imageState.processKeyPress('b', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 5, 5);

    imageState.processKeyPress('v', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);

    imageState.processKeyPress('h', 5, 100, 2, 200);
    assertState(ColorMode.HIDE_DOMINANT_HUE, 0, 0, 0, 5);

    imageState.processKeyPress('i', 5, 100, 2, 200);
    assertState(ColorMode.HIDE_DOMINANT_HUE, 0, 0, 0, 7);

    imageState.processKeyPress('u', 5, 100, 2, 200);
    assertState(ColorMode.HIDE_DOMINANT_HUE, 0, 0, 0, 5);

    imageState.processKeyPress('h', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);

    imageState.processKeyPress('s', 5, 100, 2, 200);
    assertState(ColorMode.SHOW_DOMINANT_HUE, 0, 0, 0, 5);

    imageState.processKeyPress('s', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);

    // Random key should do nothing.
    imageState.processKeyPress('z', 5, 100, 2, 200);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);
  }

  @Test public void testSave() {
    imageState.set(image, ColorMode.SHOW_DOMINANT_HUE, 5, 10, 15, 10);
    imageState.setFilepath("filepath");
    imageState.processKeyPress('w', 5, 100, 2, 200);

    verify(image).save("filepath-new.png");
  }

  @Test public void testSetupImageLandscape() {
    imageState.set(image, ColorMode.SHOW_DOMINANT_HUE, 5, 10, 15, 10);
    when(image.getWidth()).thenReturn(20);
    when(image.getHeight()).thenReturn(8);
    imageState.setUpImage(applet, 10);
    verify(image).update(applet, null);
    verify(image).resize(10, 4);
  }

  @Test public void testSetupImagePortrait() {
    imageState.set(image, ColorMode.SHOW_DOMINANT_HUE, 5, 10, 15, 10);
    when(image.getWidth()).thenReturn(8);
    when(image.getHeight()).thenReturn(20);
    imageState.setUpImage(applet, 10);
    verify(image).update(applet, null);
    verify(image).resize(4, 10);
  }

  @Test public void testResetImage() {
    imageState.set(image, ColorMode.SHOW_DOMINANT_HUE, 5, 10, 15, 10);
    imageState.resetImage(applet, 10);
    assertState(ColorMode.COLOR_FILTER, 0, 0, 0, 5);
  }
}
```

\newpage لاحظ ما يلي:

- كشفنا عن طريقة تهيئة محميّة اسمها `set` لأغراض الاختبار، تساعدنا على إدخال نظام الاختبار بسرعة في حالة معيّنة.
- نُحدث كائنات وهمية لـ`PApplet` و`ColorHelper` و`IFAImage` (أُنشئ خصيصًا لهذا الغرض).
- هذه المرة نستخدم دالة مساعدة (`assertState()`) لتبسيط التحقق من حالة الصورة.

#### قياس تغطية الاختبارات
أستخدم [EclEmma](http://www.eclemma.org/installation.html#marketplace) لقياس
تغطية الاختبارات داخل Eclipse. وعمومًا يبلغ تغطية اختبارات التطبيق
لدي 81%، حيث لا شيء من `ImageFilterApp` مغطّى، و94.8% لـ`ImageState`،
و100% لـ`ColorHelper`.

### ImageFilterApp
هنا تجتمع كل الأمور معًا، لكننا نريد قدرًا ضئيلًا من الشيفرة هنا قدر الإمكان. فالتطبيق
صعب الاختبار الوحدوي (كثير منه تخطيط)، لكن لأننا دفعنا قسمة كبيرة من

نضبط حجم التطبيق ونقوم بالتخطيط. (تُتحقق هذه الأمور بتشغيل
التطبيق والتأكد من أنه يبدو جيدًا مهما كان تغطية الاختبار جيدة،
فيجب ألا تُتخطى هذه الخطوة!)

```java
package com.catehuston.imagefilter.app;

import java.io.File;

import processing.core.PApplet;

import com.catehuston.imagefilter.color.ColorHelper;
import com.catehuston.imagefilter.color.PixelColorHelper;
import com.catehuston.imagefilter.model.ImageState;

@SuppressWarnings("serial")
public class ImageFilterApp extends PApplet {

  static final String INSTRUCTIONS = "...";

  static final int FILTER_HEIGHT = 2;
  static final int FILTER_INCREMENT = 5;
  static final int HUE_INCREMENT = 2;
  static final int HUE_RANGE = 100;
  static final int IMAGE_MAX = 640;
  static final int RGB_COLOR_RANGE = 100;
  static final int SIDE_BAR_PADDING = 10;
  static final int SIDE_BAR_WIDTH = RGB_COLOR_RANGE + 2 * SIDE_BAR_PADDING + 50;

  private ImageState imageState;

  boolean redrawImage = true;

  @Override
  public void setup() {
    noLoop();
    imageState = new ImageState(new ColorHelper(new PixelColorHelper()));

    // Set up the view.
    size(IMAGE_MAX + SIDE_BAR_WIDTH, IMAGE_MAX);
    background(0);

    chooseFile();
  }

  @Override
  public void draw() {
    // Draw image.
    if (imageState.image().image() != null && redrawImage) {
      background(0);
      drawImage();
    }

    colorMode(RGB, RGB_COLOR_RANGE);
    fill(0);
    rect(IMAGE_MAX, 0, SIDE_BAR_WIDTH, IMAGE_MAX);
    stroke(RGB_COLOR_RANGE);
    line(IMAGE_MAX, 0, IMAGE_MAX, IMAGE_MAX);

    // Draw red line
    int x = IMAGE_MAX + SIDE_BAR_PADDING;
    int y = 2 * SIDE_BAR_PADDING;
    stroke(RGB_COLOR_RANGE, 0, 0);
    line(x, y, x + RGB_COLOR_RANGE, y);
    line(x + imageState.redFilter(), y - FILTER_HEIGHT,
        x + imageState.redFilter(), y + FILTER_HEIGHT);

    // Draw green line
    y += 2 * SIDE_BAR_PADDING;
    stroke(0, RGB_COLOR_RANGE, 0);
    line(x, y, x + RGB_COLOR_RANGE, y);
    line(x + imageState.greenFilter(), y - FILTER_HEIGHT,
        x + imageState.greenFilter(), y + FILTER_HEIGHT);

    // Draw blue line
    y += 2 * SIDE_BAR_PADDING;
    stroke(0, 0, RGB_COLOR_RANGE);
    line(x, y, x + RGB_COLOR_RANGE, y);
    line(x + imageState.blueFilter(), y - FILTER_HEIGHT,
        x + imageState.blueFilter(), y + FILTER_HEIGHT);

    // Draw white line.
    y += 2 * SIDE_BAR_PADDING;
    stroke(HUE_RANGE);
    line(x, y, x + 100, y);
    line(x + imageState.hueTolerance(), y - FILTER_HEIGHT,
        x + imageState.hueTolerance(), y + FILTER_HEIGHT);

    y += 4 * SIDE_BAR_PADDING;
    fill(RGB_COLOR_RANGE);
    text(INSTRUCTIONS, x, y);
    updatePixels();
  }

  // Callback for selectInput(), has to be public to be found.
  public void fileSelected(File file) {
    if (file == null) {
      println("User hit cancel.");
    } else {
      imageState.setFilepath(file.getAbsolutePath());
      imageState.setUpImage(this, IMAGE_MAX);
      redrawImage = true;
      redraw();
    }
  }

  private void drawImage() {
    imageMode(CENTER);
    imageState.updateImage(this, HUE_RANGE, RGB_COLOR_RANGE, IMAGE_MAX);
    image(imageState.image().image(), IMAGE_MAX/2, IMAGE_MAX/2, 
                imageState.image().getWidth(), imageState.image().getHeight());
    redrawImage = false;
  }

  @Override
  public void keyPressed() {
    switch(key) {
    case 'c':
      chooseFile();
      break;
    case 'p':
      redrawImage = true;
      break;
    case ' ':
      imageState.resetImage(this, IMAGE_MAX);
      redrawImage = true;
      break;
    }
    imageState.processKeyPress(key, FILTER_INCREMENT, RGB_COLOR_RANGE, 
                HUE_INCREMENT, HUE_RANGE);
    redraw();
  }

  private void chooseFile() {
    // Choose the file.
    selectInput("Select a file to process:", "fileSelected");
  }
}
```

لاحظ ما يلي:

- تنفيذنا يمتد من `PApplet`.
- معظم العمل يُنجَز في `ImageState`.
- `fileSelected()` هي دالة الاستدعاء (_callback_) الخاصة بـ`selectInput()`.
- تُعرَّف الثوابت `static final` في الأعلى.

## قيمة النمذجة الأولية
في البرمجة الواقعية، نقضي وقتًا طويلًا في عمل الإنتاجية.
في جعل الأشياء تبدو في حدّ الكمال. وفي صيانة 99.9%
من زمن التشغيل. ونقضي وقتًا أطول في الحالات الحدية مما نقضيه في تنقيح الخوارزميات.

هذه القيود والمتطلبات مهمة لمستخدمينا. غير أنه أيضًا
متّسع لنحرّر أنفسنا منها لنلعب ونستكشف.

وفي النهاية قرّرت أن أنقل هذا إلى تطبيق متنقل أصلي. لدى Processing
مكتبة لـAndroid، لكن كما يفعل كثير من مطوّري التطبيقات المتنقلة، اخترت أن أبدأ بـiOS. فقد
كانت لدي سنوات من الخبرة في iOS، مع أنني لم أفعل الكثير مع CoreGraphics، لكنني
لا أظن أنني كنت سأتمكن من بنائه فورًا على iOS حتى لو خطرت لي هذه الفكرة في البداية.
أجبرتني المنصة على العمل في فضاء ألوان RGB،
وجعلت استخراج البكسلات من الصورة صعبًا (مرحبًا، C).
كانت الذاكرة والانتظار خطرًا رئيسيًا.

كانت هناك لحظات مذهلة،
حين عمل الأمر لأول مرة. حين شغّل على جهازي أول مرة... دون
انهيار. حين حسّنت استهلاك الذاكرة بنسبة 66% وقصرت ثوانٍ من زمن التشغيل.
وكانت هناك فترات طويلة مقفلة في غرفة مظلمة، كنت
لاعنًا بين حين وآخر.

ولأنني كنت أملك النموذج الأولي، استطعت أن أشرح لشريكي في العمل ولمصمّمنا
ما كنت أفكر فيه وما سيفعله التطبيق. وهذا يعني أنني فهمت بعمق كيف
سيعمل، ولم يكن الأمر سوى جعله يعمل
بصورة جميلة على هذه المنصة الأخرى. كنت أعرف ما كنت أستهدفه، لذا في نهاية
يوم طويل مقفَل فيه أُصارعه وأشعر أن لديlittle ما أعرضه
، كنت أواصل العمل… ثم أبلغ لحظة مذهلة ومحطة مهمة في
صباح اليوم التالي.

إذن، كيف تجد اللون الغالب في صورة؟ هناك تطبيق
لذلك: [Show & Hide](http://showandhide.com).
