---
book: mit-6100l
chapter: lecture-25
slug: notes
lang: ar
title: "المحاضرة 25: الرسم البياني (Plotting)"
---

# المحاضرة 25: الرسم البياني (Plotting)

## المصادر والنسبة والترخيص

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة على MIT OpenCourseWare: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-25-plotting/
- ملف الشرائح (صفحة الوصف): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25_pdf/
- ملف الشرائح (PDF مباشر): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec25.pdf
- ملف الشيفرة: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25_code_zip/
- تفريغ المحاضرة على MIT OpenCourseWare (بالإنجليزية): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25/
- الترخيص: CC BY-NC-SA 4.0 — https://creativecommons.org/licenses/by-nc-sa/4.0/
- شروط الاستخدام في MIT OpenCourseWare: https://ocw.mit.edu/terms/

**منهج الترجمة:** نُقلت هذه المحاضرة ترجمةً عربية كاملة أمينة لشرائح MIT الأصلية تحت رخصة CC BY-NC-SA 4.0، التي تسمح بإعادة التوزيع مع الإسناد وذكر التغييرات وبشرط الاستخدام غير التجاري وأن تُوزَّع كل ترجمة مشتقّة تحت الرخصة نفسها. ملف هذه المحاضرة لا يحمل أي إشعار حقوق طرف ثالث؛ لذلك تُعرض أسفل كل عنوان صورة الشريحة الأصلية كاملةً كما وردت في ملف MIT، ويليها النصّ العربي لمحتواها. أُبقيت الشيفرة وأسماء دوال matplotlib بالإنجليزية كما هي، وأُلحق في نهاية الصفحة ملف الشيفرة الكامل `lec25.py` كما نشرته MIT؛ إذ إن الشيفرة المعروضة داخل الشرائح جزءٌ من صورها لا نصًّا مستخرَجًا. أسماء ملفات البيانات في الشرائح (`USPopulation.txt` و`countryPops.txt` و`temperatures.csv`) تظهر داخل حزمة الشيفرة بالأسماء `lec25_USPopulation.txt` و`lec25_countryPops.txt` و`lec25_temperatures.csv`.

## الشريحة 1: الرسم البياني (Plotting)

![الشريحة 1: الرسم البياني (Plotting)](/images/mit-6100l/lecture-25-slide-01.webp)

هذه المحاضرة عن الرسم البياني. يُرفق ملف الشرائح وملفات `.py` للمتابعة جنبًا إلى جنب.

## الشريحة 2: لماذا نرسم؟

![الشريحة 2: لماذا نرسم؟](/images/mit-6100l/lecture-25-slide-02.webp)

- عاجلًا أم آجلًا، سيحتاج الجميع إلى إنتاج رسوم بيانية.
- تساعدنا على تصوّر البيانات (visualize data) لرؤية الاتجاهات، وطرح أسئلة حاسوبية نختبرها.
- إن التحقت بمقرر 6.100B فستستخدمها على نطاق واسع.
- أمّا من يغادرنا بعد الأسبوع المقبل فهذه طريقة قيّمة لتصوّر البيانات.
- هذا مثال على الاستفادة من مكتبة موجودة بدل كتابة الإجراءات (procedures) من الصفر.
- تقدّم Python مكتبات من أجل:
  - الرسم البياني (Plotting)
  - الحساب العددي (Numerical computation)
  - الحساب العشوائي (Stochastic computation)
  - وغيرها كثير.

## الشريحة 3: مكتبة Matplotlib

![الشريحة 3: مكتبة Matplotlib](/images/mit-6100l/lecture-25-slide-03.webp)

- يمكن استيراد المكتبة إلى بيئة الحساب:

```python
import matplotlib.pyplot as plt
```

- يتيح هذا للشيفرة الإشارة إلى إجراءات المكتبة بالشكل `plt.<processName>`.
- يوفّر الوصول إلى مجموعة موجودة من إجراءات الرسوم البيانية.
- سنعرض اليوم بعض الأمثلة البسيطة فقط، ومعلومات إضافية كثيرة متاحة في التوثيق المرتبط بـ matplotlib.
- سترى أمثلة وتفاصيل أخرى كثيرة لهذه الأفكار إن أخذت مقرر 6.100B.

## الشريحة 4: مثال بسيط

![الشريحة 4: مثال بسيط](/images/mit-6100l/lecture-25-slide-04.webp)

الفكرة: أنشئ دوالًا مختلفة لمتغيّر `n`، ثم صوّر الفروق بينها.

## الشريحة 5: رسم البيانات

![الشريحة 5: رسم البيانات](/images/mit-6100l/lecture-25-slide-05.webp)

- لتوليد رسم بياني:

```python
plt.plot(<x values>, <y values>)
```

- الوسائط قوائم (أو تسلسلات) من الأعداد.
- يجب أن تكون القائمتان بالطول نفسه.
- يولّد سلسلة قيم `<x, y>` على شبكة إحداثيات كارتزية (Cartesian grid).
- تُرسم بالترتيب ثم تُوصَل بخطوط.
- يمكن تغيير سطر أوامر iPython ليولّد الرسوم في نافذة جديدة، عبر Preferences:
  - مضمّنة داخل السطر (Inline in the console).
  - في نافذة جديدة (In a new window).

## الشريحة 6: مثال

![الشريحة 6: مثال](/images/mit-6100l/lecture-25-slide-06.webp)

لاحظ كيف يملأ `matplotlib` الرسمَ الإطارَ (frame) تلقائيًا.

## الشريحة 7: ترتيب النقاط مهم

![الشريحة 7: ترتيب النقاط مهم](/images/mit-6100l/lecture-25-slide-07.webp)

- لنفرض أنني أنشأت مجموعة قيم لـ `n` و لـ `n2`، لكن بترتيب عشوائي.
- ترسم Python باستخدام ترتيب النقاط وتوصيل النقاط المتتالية.

## الشريحة 8: مثال غير مرتّب

![الشريحة 8: مثال غير مرتّب](/images/mit-6100l/lecture-25-slide-08.webp)

صورة تُظهر كيف يبدو الرسم حين تكون نقاط `n` غير مرتّبة.

## الشريحة 9: الرسم المبعثر (Scatter Plot) لا يوصّل نقاط البيانات

![الشريحة 9: الرسم المبعثر (Scatter Plot) لا يوصّل نقاط البيانات](/images/mit-6100l/lecture-25-slide-09.webp)

صورة توضّح الفرق: `plt.scatter` يرسم النقاط فقط بلا خطوط وصل.

## الشريحة 10: إظهار كل البيانات على رسم واحد

![الشريحة 10: إظهار كل البيانات على رسم واحد](/images/mit-6100l/lecture-25-slide-10.webp)

صورة تُظهر ما يحدث عند جمع كل البيانات في رسم بياني واحد.

## الشريحة 11: إنتاج عدّة رسوم بيانية

![الشريحة 11: إنتاج عدّة رسوم بيانية](/images/mit-6100l/lecture-25-slide-11.webp)

- لنرسم كلًّا منها في إطار/نافذة منفصلة. نستدعي:

```python
plt.figure(<arg>)
```

- ينشئ عرضًا جديدًا بهذا الاسم إن لم يكن موجودًا.
- وإذا كان هناك عرض بهذا الاسم، فإعادة فتحه لمعالجة إضافية.

## الشريحة 12: شيفرة المثال

![الشريحة 12: شيفرة المثال](/images/mit-6100l/lecture-25-slide-12.webp)

تعرض الشريحة شيفرة المثال الكاملة التي تُنتج الرسوم الأربعة التالية، وهي ضمن ملف `lec25.py` الملحق في نهاية الصفحة.

## الشريحة 13: عرض `quad`

![الشريحة 13: عرض `quad`](/images/mit-6100l/lecture-25-slide-13.webp)

صورة الرسم البياني للدالة التربيعية.

## الشريحة 14: عرض `cube`

![الشريحة 14: عرض `cube`](/images/mit-6100l/lecture-25-slide-14.webp)

صورة الرسم البياني للدالة التكعيبية.

## الشريحة 15: عرض `lin`

![الشريحة 15: عرض `lin`](/images/mit-6100l/lecture-25-slide-15.webp)

صورة الرسم البياني للدالة الخطّية.

## الشريحة 16: عرض `expo`

![الشريحة 16: عرض `expo`](/images/mit-6100l/lecture-25-slide-16.webp)

لاحظ كيف يوسّع `matplotlib` المقياس تلقائيًا ليلائم الرسمين داخل الإطار.

## الشريحة 17: مثال «واقعي»

![الشريحة 17: مثال «واقعي»](/images/mit-6100l/lecture-25-slide-17.webp)

اختارت `matplotlib` تلقائيًا مقياسَي `x` و `y` الأنسب للبيانات.

## الشريحة 18: مثال «واقعي»

![الشريحة 18: مثال «واقعي»](/images/mit-6100l/lecture-25-slide-18.webp)

صورة تالية من تسلسل المثال الواقعي.

## الشريحة 19: مثال «واقعي»

![الشريحة 19: مثال «واقعي»](/images/mit-6100l/lecture-25-slide-19.webp)

صورة تالية من تسلسل المثال الواقعي.

## الشريحة 20: مثال «واقعي»

![الشريحة 20: مثال «واقعي»](/images/mit-6100l/lecture-25-slide-20.webp)

صورة تالية من تسلسل المثال الواقعي.

## الشريحة 21: مثال «واقعي»

![الشريحة 21: مثال «واقعي»](/images/mit-6100l/lecture-25-slide-21.webp)

صورة تالية من تسلسل المثال الواقعي.

## الشريحة 22: إضافة خطوط الشبكة

![الشريحة 22: إضافة خطوط الشبكة](/images/mit-6100l/lecture-25-slide-22.webp)

يمكن التبديل بخطوط الشبكة (grid lines) تشغيلًا وإيقافًا عبر:

```python
plt.grid()
```

## الشريحة 23: لنضف مدينة أخرى

![الشريحة 23: لنضف مدينة أخرى](/images/mit-6100l/lecture-25-slide-23.webp)

تعرض الشريحة شيفرة إضافة مدينة ثانية إلى الرسم بوسم (`label`) خاص بها.

## الشريحة 24: لكن أين أنا؟

![الشريحة 24: لكن أين أنا؟](/images/mit-6100l/lecture-25-slide-24.webp)

صورة الرسم بعد إضافة المدينة الثانية، مع إبراز السؤال: أين الأشهر على المحور الأفقي، وأين درجات الحرارة على المحور الرأسي؟

## الشريحة 25: لنضف مدينة أخرى

![الشريحة 25: لنضف مدينة أخرى](/images/mit-6100l/lecture-25-slide-25.webp)

تعرض الشريحة شيفرة إضافة مدينة ثالثة ثم تحديد موضع مفتاح الرسم (`legend`).

## الشريحة 26: رسم بمنحنيين

![الشريحة 26: رسم بمنحنيين](/images/mit-6100l/lecture-25-slide-26.webp)

لاحظ: اختارت Python ألوانًا مختلفة لكل رسم؛ يمكننا تحديدها إن أردنا.

## الشريحة 27: التحكّم في المعاملات

![الشريحة 27: التحكّم في المعاملات](/images/mit-6100l/lecture-25-slide-27.webp)

- لنفرض أننا نريد التحكّم في تفاصيل العروض. أمثلة:
  - تغيير لون مجموعة بيانات أو نمطها.
  - تغيير عرض الخطوط أو أبعاد العروض.
  - استخدام الأجزاء الفرعية (subplots).
- يمكن تمرير وسيط «صيغة» (format) إلى `plot`:
  - `marker`، `line`، `color`.
- يمكن تخطّي أيّ من هذه الاختيارات، فيأخذ `plot` القيمة الافتراضية.
- الترتيب لا يهمّ، إذ لا التباس بين الرموز.

## الشريحة 28: التحكّم في اللون والنمط

![الشريحة 28: التحكّم في اللون والنمط](/images/mit-6100l/lecture-25-slide-28.webp)

تعرض الشريحة شيفرة تغيير اللون والنمط بمعاملات موضعية مختصرة (`'b-'` و`'r--'` و`'g-.'`).

## الشريحة 29: التحكّم في اللون والنمط

![الشريحة 29: التحكّم في اللون والنمط](/images/mit-6100l/lecture-25-slide-29.webp)

صورة أخرى للتحكّم في اللون والأسلوب.

## الشريحة 30: استخدام الكلمات المفتاحية

![الشريحة 30: استخدام الكلمات المفتاحية](/images/mit-6100l/lecture-25-slide-30.webp)

تعرض الشريحة الشيفرة نفسها بوسائط مسمّاة بالكلمات المفتاحية (`color` و`linestyle` و`label`).

## الشريحة 31: التحكّم في اللون والنمط

![الشريحة 31: التحكّم في اللون والنمط](/images/mit-6100l/lecture-25-slide-31.webp)

صورة أخرى للتحكّم في اللون والنمط.

## الشريحة 32: خيارات الخط واللون والعلامة

![الشريحة 32: خيارات الخط واللون والعلامة](/images/mit-6100l/lecture-25-slide-32.webp)

**نمط الخط (Line Style):**

| الرمز | المعنى |
|---|---|
| `-` | خط متصل (solid line) |
| `--` | خط متقطّع (dashed line) |
| `-.` | خط منقّط مع شرطة (dash dot line) |
| `:` | خط منقّط (dotted line) |

**خيارات اللون (Color Options) — وهناك المزيد:**

| الرمز | اللون |
|---|---|
| `b` | أزرق (blue) |
| `g` | أخضر (green) |
| `r` | أحمر (red) |
| `c` | سماوي (cyan) |
| `m` | أرجواني (magenta) |
| `y` | أصفر (yellow) |
| `k` | أسود (black) |
| `w` | أبيض (white) |

**خيارات العلامة (Marker Options) — وهناك المزيد:**

| الرمز | العلامة |
|---|---|
| `.` | نقطة (point) |
| `o` | دائرة (circle) |
| `v` | مثلث متجه لأسفل (triangle down) |
| `^` | مثلث متجه لأعلى (triangle up) |
| `*` | نجمة (star) |

## الشريحة 33: التحكّم في اللون والنمط

![الشريحة 33: التحكّم في اللون والنمط](/images/mit-6100l/lecture-25-slide-33.webp)

تعرض الشريحة الشيفرة نفسها بمعاملات موضعية مختصرة مع العلامات (`'.b-'` و`'or--'` و`'*g-.'`).

## الشريحة 34: مع العلامات

![الشريحة 34: مع العلامات](/images/mit-6100l/lecture-25-slide-34.webp)

لاحظ كيف صارت النقاط الفعلية المرسومة مُعلَّمة الآن.

## الشريحة 35: التحكّم في عرض الخط

![الشريحة 35: التحكّم في عرض الخط](/images/mit-6100l/lecture-25-slide-35.webp)

تعرض الشريحة شيفرة تغيير عرض الخط بكلمة `linewidth` المفتاحية (2 و10 و20).

## الشريحة 36: خيارات أخرى كثيرة

![الشريحة 36: خيارات أخرى كثيرة](/images/mit-6100l/lecture-25-slide-36.webp)

تُظهر الشريحة الرسم بعد تغيير عرض الخطوط.

## الشريحة 37: رسوم داخل رسوم

![الشريحة 37: رسوم داخل رسوم](/images/mit-6100l/lecture-25-slide-37.webp)

تعرض الشريحة شيفرة رسمين فوق بعضهما في نافذة واحدة، بدءًا بالجزء الأول `plt.subplot(2,1,1)`.

## الشريحة 38: ويتّسع الرسم

![الشريحة 38: ويتّسع الرسم](/images/mit-6100l/lecture-25-slide-38.webp)

لكن هل يمكن أن يكون هذا مضلِّلًا؟ مقاييس `Y` مختلفة!

## الشريحة 39: رسوم داخل رسوم

![الشريحة 39: رسوم داخل رسوم](/images/mit-6100l/lecture-25-slide-39.webp)

تعرض الشريحة الجزء الثاني من الشيفرة نفسها (`plt.subplot(2,1,2)`).

## الشريحة 40: ويتّسع الرسم

![الشريحة 40: ويتّسع الرسم](/images/mit-6100l/lecture-25-slide-40.webp)

تُظهر الشريحة الرسم البياني بعد تقسيم النافذة إلى جزأين فوق بعضهما.

## الشريحة 41: كثير من الأجزاء الفرعية

![الشريحة 41: كثير من الأجزاء الفرعية](/images/mit-6100l/lecture-25-slide-41.webp)

تعرض الشريحة شيفرة شبكة من الأجزاء الفرعية بأربع نوافذ، من `plt.subplot(2,2,1)` إلى `plt.subplot(2,2,3)`.

## الشريحة 42: ويتّسع الرسم

![الشريحة 42: ويتّسع الرسم](/images/mit-6100l/lecture-25-slide-42.webp)

تُظهر الشريحة الشبكة النهائية بأربعة أجزاء فرعية في نافذة واحدة.

## الشريحة 43: سكان الولايات المتحدة — مثال

![الشريحة 43: سكان الولايات المتحدة — مثال](/images/mit-6100l/lecture-25-slide-43.webp)

شريحة فاصلة تعلن مثالًا جديدًا.

## الشريحة 44: مثال أكثر إثارة للاهتمام

![الشريحة 44: مثال أكثر إثارة للاهتمام](/images/mit-6100l/lecture-25-slide-44.webp)

- لنجرّب رسم بيانات أكثر تعقيدًا.
- زوّدنا ملفًا فيه عدد سكان الولايات المتحدة مسجَّلًا كل 10 أعوام على مدى أربعة قرون.
- نودّ استخدام الرسم لفحص تلك البيانات.
- نستخدم الرسم للمساعدة على تصوّر الاتجاهات فيها.
- نستخدم الرسم لطرح أسئلة يمكن اختبارها حسابيًا (وسترى المزيد من هذا إن أخذت مقرر 6.100B).

## الشريحة 45: ملف الإدخال

![الشريحة 45: ملف الإدخال](/images/mit-6100l/lecture-25-slide-45.webp)

اسم الملف `USPopulation.txt`، ويحتوي على قائمة بأرقام السكان.

## الشريحة 46: رسم البيانات

![الشريحة 46: رسم البيانات](/images/mit-6100l/lecture-25-slide-46.webp)

تعرض الشريحة شيفرة قراءة الملف ورسم بياناته.

## الشريحة 47: نمو السكان

![الشريحة 47: نمو السكان](/images/mit-6100l/lecture-25-slide-47.webp)

- تصوّر البيانات قد يكشف أمورًا لا تُرى بسهولة في البيانات الخام.
- «ماذا يحدث في السنوات المبكّرة؟»
- «هل يمكنني تصوّر هذا بطريقة مختلفة؟»
- أثر الحرب العالمية الثانية.
- أثر الحرب الأهلية.

## الشريحة 48: تغيير المقياس

![الشريحة 48: تغيير المقياس](/images/mit-6100l/lecture-25-slide-48.webp)

المقياس اللوغاريتمي (log scale) يعني أن كل زيادة على المحور تقابل زيادة أُسّية في الحجم، بينما في المقياس العادي كل زيادة تقابل زيادة خطّية في الحجم.

## الشريحة 49: نمو السكان

![الشريحة 49: نمو السكان](/images/mit-6100l/lecture-25-slide-49.webp)

- «ماذا يعني النمو الخطّي على مقياس لوغاريتمي؟»
- «يمكننا الآن أن نرى أن نموًّا حدث في وقت مبكّر، وسرعته كانت في الواقع أسرع من السنوات اللاحقة.»

## الشريحة 50: أيّهما وجدته أكثر إفادة؟

![الشريحة 50: أيّهما وجدته أكثر إفادة؟](/images/mit-6100l/lecture-25-slide-50.webp)

- تغيير طريقة التصوّر (visualization) قد يكشف اتجاهات في البيانات لا تُرى بالرسم القياسي.
- التصوّر يطرح أسئلة، مثل: بالنظر إلى العين، يبدو أن هناك ثلاث فترات نمو أُسّية مختلفة.

## الشريحة 51: سكان الدول — مثال

![الشريحة 51: سكان الدول — مثال](/images/mit-6100l/lecture-25-slide-51.webp)

شريحة فاصلة.

## الشريحة 52: ملف البيانات

![الشريحة 52: ملف البيانات](/images/mit-6100l/lecture-25-slide-52.webp)

اسم الملف `countryPops.txt`. مهتمّون بتحليل أرقام السكان، ولا نهتمّ بالترتيب أو الدولة أو السنة.

## الشريحة 53: تحميل البيانات ورسمها

![الشريحة 53: تحميل البيانات ورسمها](/images/mit-6100l/lecture-25-slide-53.webp)

تعرض الشريحة شيفرة قراءة الملف ثم رسمه.

## الشريحة 54: أحجام السكان

![الشريحة 54: أحجام السكان](/images/mit-6100l/lecture-25-slide-54.webp)

صورة رسم بياني لأحجام سكان الدول.

## الشريحة 55: تحقيق غريب: الخانات الأولى

![الشريحة 55: تحقيق غريب: الخانات الأولى](/images/mit-6100l/lecture-25-slide-55.webp)

صورة تُظهر توزيع الخانات الأولى لأرقام السكان.

## الشريحة 56: تكرار كل خانة

![الشريحة 56: تكرار كل خانة](/images/mit-6100l/lecture-25-slide-56.webp)

**قانون بنفورد (Benford's Law):**

$$P_d = \log_{10}\left(1 + \frac{1}{d}\right)$$

كثير من مجموعات البيانات تتبع هذا:

- متابعو وسائل التواصل الاجتماعي
- قيم الأسهم
- أسعار المواد الغذائية (groceries)
- إحصاءات الرياضة
- ارتفاعات المباني
- الضرائب المدفوعة

## الشريحة 57: مقارنة المدن — مثال

![الشريحة 57: مقارنة المدن — مثال](/images/mit-6100l/lecture-25-slide-57.webp)

شريحة فاصلة.

## الشريحة 58: مثال موسّع

![الشريحة 58: مثال موسّع](/images/mit-6100l/lecture-25-slide-58.webp)

- لنستخدم مثالًا آخر لنفحص كيف يسمح الرسم باستكشاف البيانات بطرق مختلفة، وكيف يوفّر طريقة قيّمة لتصويرها.
- لن ننظر في الشيفرة بالتفصيل.
- مثال على مجموعة بيانات:
  - متوسط درجة الحرارة اليومية لكل يوم على مدى 55 سنة لـ 21 مدينة أمريكية مختلفة.
- نودّ استكشاف التغيّرات عبر السنين، وعبر المدن.

## الشريحة 59: ملف البيانات

![الشريحة 59: ملف البيانات](/images/mit-6100l/lecture-25-slide-59.webp)

اسم الملف `temperatures.csv`.

## الشريحة 60: `temperatures.csv` — استخراج البيانات

![الشريحة 60: `temperatures.csv` — استخراج البيانات](/images/mit-6100l/lecture-25-slide-60.webp)

سيُعيد هذا قائمة بدرجات الحرارة (بالفهرنهايت) وقائمة موافقة بالتواريخ لمدينة معيّنة.

أول أربعة أسطر في الملف:

```text
CITY,TEMP,DATE
SEATTLE,3.1,19610101
SEATTLE,0.55,19610102
SEATTLE,0,19610103
SEATTLE,4.45,19610104
```

ملاحظتان على الشريحة:
- نريد حرارة **مدينة معيّنة فقط**، فنرشّح على `CITY`.
- الملف يخزّن البيانات كنصّ (str)، فنحتاج إلى التحويل.

## الشريحة 61: متوسطات الحرارة

![الشريحة 61: متوسطات الحرارة](/images/mit-6100l/lecture-25-slide-61.webp)

- يحسب هذا متوسط الحرارة على كل يوم من السنين الخمس والخمسين، لكل مدينة.
- احصل على قائمة المدن.
- احسب متوسط الحرارة.
- باستخدام أول حرفين كوسم (label).
- ارسم النقاط فقط كـ scatter plot (بلا خطوط وصل).

## الشريحة 62: ودرجة الحرارة هي …

![الشريحة 62: ودرجة الحرارة هي …](/images/mit-6100l/lecture-25-slide-62.webp)

صورة تُظهر أسماء المدن على المحور الرأسي، ومنها: San Juan، Miami، Phoenix ثم Detroit، Chicago، Boston.

## الشريحة 63: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن

![الشريحة 63: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن](/images/mit-6100l/lecture-25-slide-63.webp)

- لمدينة واحدة، احسب متوسط الحرارة في كل سنة.
- تحقّق أن المدخل يخصّ السنة الصحيحة.
- استعمل الشيفرة السابقة.
- احصل على بيانات الحرارة لتلك السنة.

## الشريحة 64: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن

![الشريحة 64: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن](/images/mit-6100l/lecture-25-slide-64.webp)

اختر بعض المدن لترسم 55 حرارة (المتوسط السنوي لكل سنة).

## الشريحة 65: «الطفل بارد في الخارج!»

![الشريحة 65: «الطفل بارد في الخارج!»](/images/mit-6100l/lecture-25-slide-65.webp)

صورة تُظهر عدد الأيام التي كانت فيها الحرارة اليومية أقلّ من 30 درجة فهرنهايت عبر الزمن لكل مدينة.

## الشريحة 66: لكن ما معنى التباين (Variation)؟

![الشريحة 66: لكن ما معنى التباين (Variation)؟](/images/mit-6100l/lecture-25-slide-66.webp)

الصورة تُظهر أعلى وأدنى ومتوسط الحرارة حسب السنة.

## الشريحة 67: لكن ما معنى التباين؟

![الشريحة 67: لكن ما معنى التباين؟](/images/mit-6100l/lecture-25-slide-67.webp)

الصورة نفسها مع توضيح مدرّجات أعلى/أدنى/متوسط.

## الشريحة 68: أمثلة على بعض المدن

![الشريحة 68: أمثلة على بعض المدن](/images/mit-6100l/lecture-25-slide-68.webp)

- يمكن رؤية المدى (range) لكل مدينة.
- لكنه غير مفيد للمقارنة بين المدن:
  - المحور الرأسي في Boston من 0 إلى 80.
  - المحور الرأسي في Miami من 40 إلى 90.
  - المحور الرأسي في San Diego من 50 إلى 90.

## الشريحة 69: استخدم المدى نفسه على المحور الرأسي لكل الرسوم

![الشريحة 69: استخدم المدى نفسه على المحور الرأسي لكل الرسوم](/images/mit-6100l/lecture-25-slide-69.webp)

ثبِّت مدى العرض للمحور الرأسي (`ylim`).

## الشريحة 70: مقارنة أفضل بين المدن

![الشريحة 70: مقارنة أفضل بين المدن](/images/mit-6100l/lecture-25-slide-70.webp)

- أحد أسباب الرسم البياني هو تصوّر البيانات.
- يمكن رؤية أن مدى التباين مختلف جدًّا في Boston مقارنةً بـ Miami أو San Diego.
- ويمكن أيضًا رؤية أن المتوسط في Miami أقرب بكثير إلى الحدّ الأقصى منه إلى الحدّ الأدنى، بخلاف Boston و San Diego.

## الشريحة 71: كم يومًا كانت حرارته…؟ في 1961؟

![الشريحة 71: كم يومًا كانت حرارته…؟ في 1961؟](/images/mit-6100l/lecture-25-slide-71.webp)

- جهّز قائمة من 100 عنصر، لتبني بنية تشبه المدرّج التكراري (histogram-like).
  - العنصر رقم 0 يخزّن عدد الأيام التي كانت حرارتها 0.
  - العنصر رقم 1 يخزّن عدد الأيام التي كانت حرارتها 1.
  - …
  - العنصر رقم 99 يخزّن عدد الأيام التي كانت حرارتها 99.
- أنشئ قائمة بدرجات الحرارة لسنة معيّنة.
- عُدّ عدد أيام سنة معيّنة التي كانت فيها حرارة معيّنة هي المتوسط اليومي.

## الشريحة 72: كم يومًا كانت حرارته…؟ في 1961؟

![الشريحة 72: كم يومًا كانت حرارته…؟ في 1961؟](/images/mit-6100l/lecture-25-slide-72.webp)

صورة تُظهر المدرّج التكراري لدرجة الحرارة في سنة 1961.

## الشريحة 73: هل San Diego مملّة؟

![الشريحة 73: هل San Diego مملّة؟](/images/mit-6100l/lecture-25-slide-73.webp)

صورة تُظهر توزيع الحرارة لـ San Diego.

سؤال على الشريحة: هل يمكننا ملاءمة منحنى (curve) لأجزاء من هذه البيانات؟ هل التوزيع منتظم؟ أم هل هو غاوسيّ (aka bell)؟

## الشريحة 74: التغيّر عبر الزمن؟

![الشريحة 74: التغيّر عبر الزمن؟](/images/mit-6100l/lecture-25-slide-74.webp)

ارسم توزيعين، أحدهما لسنة 1961 والآخر لسنة 2015.

## الشريحة 75: تراكب الأعمدة (Overlay Bar Charts)

![الشريحة 75: تراكب الأعمدة (Overlay Bar Charts)](/images/mit-6100l/lecture-25-slide-75.webp)

صورة تُظهر الأعمدة فوق بعضها.

## الشريحة 76: أو يمكن الرسم على حدة

![الشريحة 76: أو يمكن الرسم على حدة](/images/mit-6100l/lecture-25-slide-76.webp)

صورة تُظهر الرسم المنفصل للتوزيعين.

## الشريحة 77: يمكن التحكّم في أشياء كثيرة أخرى

![الشريحة 77: يمكن التحكّم في أشياء كثيرة أخرى](/images/mit-6100l/lecture-25-slide-77.webp)

- الحجم (Size of)
- العلامات (Markers)
- الخطوط (Lines)
- العنوان (Title)
- التسميات (Labels)
- تدريجات `x` و `y` (ticks)
- مقياسا المحورين (Scales of both axes)
- الأجزاء الفرعية (Subplots)
- مربّعات النصّ (Text boxes)
- نوع الرسم (Kind of plot):
  - الرسوم المبعثرة (Scatter plots)
  - الرسوم الشريطية (Bar plots)
  - المدرّجات التكرارية (Histograms)
  - …

«لقد كشطنا سطح الموضوع اليوم!»

## الشريحة 78: MIT OpenCourseWare

![الشريحة 78: MIT OpenCourseWare](/images/mit-6100l/lecture-25-slide-78.webp)

```
MITOpenCourseWare
https://ocw.mit.edu

6.100L Introduction to Computer Science and Programming Using Python
Fall 2022

For information about citing these materials or our Terms of Use, visit: https://ocw.mit.edu/terms.
```

## ملف الشيفرة الكامل (lec25.py)

هذا ملف الشيفرة الكامل كما نشرته MIT ضمن حزمة المحاضرة، منقولًا حرفيًا دون تغيير.

```python
import matplotlib.pyplot as plt

#set line width
plt.rcParams['lines.linewidth'] = 2
#set font size for titles
plt.rcParams['axes.titlesize'] = 16
#set font size for labels on axes
plt.rcParams['axes.labelsize'] = 16
#set size of numbers on x-axis
plt.rcParams['xtick.labelsize'] = 10
#set size of numbers on y-axis
plt.rcParams['ytick.labelsize'] = 10
#set size of ticks on x-axis
plt.rcParams['xtick.major.size'] = 5
#set size of ticks on y-axis
plt.rcParams['ytick.major.size'] = 5
#set size of markers
plt.rcParams['lines.markersize'] = 10
#set number of examples shown in legends
plt.rcParams['legend.numpoints'] = 1
#set the font size globally
plt.rcParams['xtick.labelsize']=20
plt.rcParams['ytick.labelsize']=20
plt.rcParams['axes.labelsize'] = 26 
plt.rcParams['axes.titlesize'] = 26 
plt.rcParams["figure.figsize"] = (15,10)

########################
## Plotting many lines 
########################
nVals = []
linear = []
quadratic = []
cubic = []
exponential = []

for i in range(0, 30):
    nVals.append(i)
    linear.append(i)
    quadratic.append(i**2)
    cubic.append(i**3)
    exponential.append(1.5**i)

# #### Plotting one line
# plt.plot(nVals, linear)


# ##### order of data points matters
testSamples = [0,5,3,6,15,2,1,4,25,20,7,21,22,23,9,8,24,10,12,11]
testValues =  [0,25,9,36,225,4,1,16,625,400,49,441,484,529,81,64,576,100,144,121]
## plot connects the points
# plt.plot(testSamples, testValues)
## scatter plot does not connect the points
# plt.scatter(testSamples, testValues)

# ##### Plotting many lines
# plt.plot(nVals, linear)
# plt.plot(nVals, quadratic)
# plt.plot(nVals, cubic)
# plt.plot(nVals, exponential)


# ###### Plotting two lines on one plot
# plt.figure('expo')
# plt.plot(nVals, exponential)
# plt.figure('lin')
# plt.plot(nVals, linear)
# plt.figure('quad')
# plt.plot(nVals, quadratic)
# plt.figure('cube')
# plt.plot(nVals, cubic)
# newExpo = []
# for i in range(30):
#     newExpo.append(1.6**i)
# plt.figure('expo')
# plt.plot(nVals, newExpo)


################
## Temperature with axes options
################
###### Plotting temperatures and changing xaxis
months = range(1, 13, 1)
temps = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, temps)

# # ## Add axes, labels, and a title
# plt.title('Ave. Temperature in Boston')
# plt.xlabel('Month')
# plt.ylabel('Degrees F')

# # #### Start axis at 1 to 12
# plt.xlim(1, 12)
# # ### Change x axes labels
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12))
# # #### Change x axes labels to custom labels
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#             ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

# # #### add/remove grid lines
# plt.grid()


###################################
## Temperatures for many cities 
###################################

###### Plotting multiple lines with labels
# months = range(1, 13, 1)
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, boston, label = 'Boston')
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.plot(months, phoenix, label = 'Phoenix')
# # Add labels and title
# plt.title('Ave. Temperatures')
# plt.xlabel('Month')
# plt.ylabel('Degrees F')
# # Change x axis labels to custom labels
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

# plt.legend(loc = 'best', fontsize=20) # position it automatically

###### Plotting multiple lines and changing their line style
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, boston, 'b-', label = 'Boston')
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.plot(months, phoenix, 'r--', label = 'Phoenix')
# msp = [16,19,34,48,59,70,75,73,64,60,37,21]
# plt.plot(months, msp, 'g-.', label = 'Minneapolis')
# plt.legend(loc = 'best', fontsize=20)
# plt.title('Ave. Temperatures')
# plt.xlabel('Month')
# plt.ylabel('Degrees F')
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

# # ###### Plotting with keywords (same plot as below)
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, boston, label = 'Boston',\
#           color = 'b', linestyle = '-')
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.plot(months, phoenix, label = 'Phoenix',\
#           color = 'r', linestyle = '--')
# msp = [16,19,34,48,59,70,75,73,64,60,37,21]
# plt.plot(months, msp, label = 'Minneapolis',\
#           color = 'g', linestyle = '-.')
# plt.legend(loc = 'best', fontsize=20)
# plt.title('Ave. Temperatures')
# plt.xlabel('Month')
# plt.ylabel(('Degrees F'))
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

###### Plotting with styled markers (same plot as above)
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, boston, '.b-', label = 'Boston')
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.plot(months, phoenix, 'or--', label = 'Phoenix')
# msp = [16,19,34,48,59,70,75,73,64,60,37,21]
# plt.plot(months, msp, '*g-.', label = 'Minneapolis')
# plt.legend(loc = 'best', fontsize=20)
# plt.title('Ave. Temperatures')
# plt.xlabel('Month')
# plt.ylabel(('Degrees F'))
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

###### Plotting with keywords, change width
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.plot(months, boston, label = 'Boston',\
#           color = 'b', linestyle = '-', linewidth = 2)
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.plot(months, phoenix, label = 'Phoenix',\
#           color = 'r', linestyle = '--', linewidth = 10)
# msp = [16,19,34,48,59,70,75,73,64,60,37,21]
# plt.plot(months, msp, label = 'Minneapolis',\
#           color = 'g', linestyle = '-.', linewidth = 20)
# plt.legend(loc = 'best', fontsize=20)
# plt.title('Ave. Temperatures')
# plt.xlabel('Month')
# plt.ylabel(('Degrees F'))
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

###### Using subplots
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.subplot(2,1,1)
# # plt.ylim(0, 100)
# plt.plot(months, boston, 'b-')
# plt.ylabel('Degrees F')
# plt.title('Boston vs. Phoenix')
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))
# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.subplot(2,1,2)
# # plt.ylim(0, 100)
# plt.plot(months, phoenix, 'r--')
# plt.ylabel('Degrees F')
# plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),
#           ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'))

###### Using subplots
# months = range(1, 13, 1)           
# boston = [28,32,39,48,59,68,75,73,66,54,45,34]
# plt.subplot(2,2,1)
# plt.ylim(0, 100)
# plt.plot(months, boston, 'b-')
# plt.ylabel('Degrees F')
# plt.title('Boston')
# plt.xticks((1,3,5,7,9,11),('Jan','Mar','May','Jul','Sep','Nov'))

# phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]
# plt.subplot(2,2,2)
# plt.ylim(0, 100)
# plt.plot(months, phoenix, 'r--')
# plt.title('Phoenix')
# plt.xticks((1,3,5,7,9,11),('Jan','Mar','May','Jul','Sep','Nov'))

# msp = [16,19,34,48,59,70,75,73,64,60,37,21]
# plt.subplot(2,2,3)
# plt.ylim(0, 100)
# plt.plot(months, msp, 'g-.')
# plt.ylabel('Degrees F')
# plt.title('Minneapolis')
# plt.xticks((1,3,5,7,9,11),('Jan','Mar','May','Jul','Sep','Nov'))

####################################
## US Population Example 
####################################

###### Read file data and plot it
def getUSPop(fileName):
    inFile = open(fileName, 'r')
    dates, pops = [], []
    for l in inFile:
        line = ''
        for c in l:
            if c in '0123456789 ':
                line += c
        line = line.split(' ')
        dates.append(int(line[0]))
        pops.append(int(line[1]))
    return dates, pops

# dates, pops = getUSPop('lec25_USPopulation.txt')
# plt.plot(dates, pops)
# plt.title('Population in What Is Now U.S.\n' +\
#           '(Native Am. Excluded Before 1860)')
# plt.xlabel('Year')
# plt.ylabel('Population')

####### Change the scale to semilog
# plt.semilogy()   


####################################
## Country Population Example 
####################################

###### Read file data from many countries and plot it
def getCountryPops(fileName):
    inFile = open(fileName, 'r')
    pops = []
    for l in inFile:
        line = l.split('\t')
        l = line[2]
        pop = ''
        for c in l:
            if c in '0123456789':
                pop += c
        pops.append(int(pop))
    return pops

pops = getCountryPops('lec25_countryPops.txt')


# ## Plot populations 
# plt.plot(pops)
# plt.title('Population Size of Countries July 2017')
# plt.ylabel('Population')
# plt.xlabel('Country Rank Based on Size')
# plt.semilogy()

# ## Investigate the first digits
pops = getCountryPops('lec25_countryPops.txt')
firstDigits = []
for p in pops:
    firstDigits.append(int(str(p)[0]))
# print(firstDigits)    

### Plot the fist digits, as found in order in the file
# plt.plot(firstDigits)

### Plot the histogram to show Benford's law
# plt.hist(firstDigits, bins = 9)


####################################
## Comparing Cities Example 
####################################
def getCities():
    inFile = open('lec25_temperatures.csv')
    cities = []
    for l in inFile:
        c = l.split(',')[0]
        if c not in cities:
            cities.append(c)
    return cities

def CtoF(c):
    return (c * 9/5) + 32

def getTempsForCity(city):
    inFile = open('lec25_temperatures.csv')
    temps = []
    dates = []
    for l in inFile:
        data = l.strip().split(',')
        c = data[0]
        tem = data[1]
        date = data[2]
        if c == city:
            temps.append(CtoF(float(tem)))
            dates.append(date)
    return temps, dates

def getAverageTemps():
    cities = getCities()[1:]
    xPts = range(len(cities))
    aveTemp = []
    cityLabels = []
    for c in cities:
        temps, dates = getTempsForCity(c)
        aveTemp.append(sum(temps)/len(temps))
        cityLabels.append(c[0:2])
        print(c[0:2], sum(temps)/len(temps))
        
    plt.figure('Temps')
    plt.scatter(xPts, aveTemp)
    plt.title('Ave. Temperatures')
    plt.xlabel('City')
    plt.ylabel(('Degrees F'))
    plt.xticks(xPts, cityLabels)

## print average temperatures for all cities (and plot them)
# getAverageTemps()

def getAvgTempForYear(tem, dat, y):
    yearlyTemps = []
    for i in range(len(tem)):
        if y == dat[i][:4]:
            yearlyTemps.append(tem[i])
    return sum(yearlyTemps)/len(yearlyTemps), y

## List of temps and a corresponding list of dates for a specific city
temps,dates = getTempsForCity('SEATTLE')
## zip makes tuples of (0th elem from temps and 0th from dates)
##                     (1st from temps and 1st from dates)
##                     (ith from temps and ith from dates), etc.
# print(list(zip(temps, dates)))

## average temperatures for one year
# print(getAvgTempForYear(temps, dates, '1961'))

            
##### plot average temperatures for a few different cities
def getTempsByYearForCity(city):
    temps, dates = getTempsForCity(city)
    averages = []
    years = []
    for y in range(1961,2016):
        tem = getAvgTempForYear(temps, dates, str(y))[0]
        averages.append(tem)
        years.append(str(y))
    return averages, years

if False:
    plt.close()
    for c in ('BOSTON','PHOENIX', 'MIAMI', 'SAN DIEGO'):
        
        av, yr = getTempsByYearForCity(c)
        xPts = range(len(yr))
        plt.figure('Temps by City')
        plt.plot(xPts, av, label = c)
        plt.title('Ave. Temperatures')
        plt.xlabel('Years since 1961')
        plt.ylabel(('Degrees F'))
        plt.legend(loc = 'best')
        
        
##### plot yearly average temperature for a city, including range

def getTempsForYearRange(tem, dat, y):
    yearly = []
    for i in range(len(tem)):
        if y == dat[i][:4]:
            yearly.append(tem[i])
    return sum(yearly)/len(yearly), max(yearly), min(yearly), y
            
def getTempsByYearForCityRange(city):
    temps, dates = getTempsForCity(city)
    averages = []
    maxes = []
    mins = []
    years = []
    for y in range(1961,2000):
        tem, mx, mn, y = getTempsForYearRange(temps, dates, str(y))
        averages.append(tem)
        maxes.append(mx)
        mins.append(mn)
        years.append(str(y))
    return averages, maxes, mins, years

if False:
    plt.close()
    for c in ('BOSTON','SAN DIEGO', 'MIAMI'):  # try for BOSTON, SAN DIEGO, MIAMI
        av, mx, mn, yr = getTempsByYearForCityRange(c)
        xPts = range(len(yr))
        plt.figure('Temps by City: '+c)
        plt.ylim(0, 100)
        plt.plot(xPts, av, label = 'mean')
        plt.plot(xPts, mx, label = 'max')
        plt.plot(xPts, mn, label = 'min')        
        plt.title('Temperature Range: ' + c)
        plt.xlabel('Years since 1961')
        plt.ylabel(('Degrees F'))
        plt.legend(loc = 'best')
        
        
## look at number of days with a particular temperature by city

def getDayDistributionForCity(city, year):
    # assume a range of temperatures from 0 to 100
    temps, dates = getTempsForCity(city)
    newTemps = []
    for i in range(len(dates)):
        if year == dates[i][:4]:
            newTemps.append(temps[i])
    ## want to map temperature to number of occurences
    d = [0]*100
    for t in newTemps:
        tRound = round(t)
        d[tRound] += 1
    return d

if False:
    plt.close()
    for c in ('BOSTON','SAN DIEGO', 'MIAMI'):  # try for BOSTON, SAN DIEGO, MIAMI
        ans = getDayDistributionForCity(c, '1961')
        temps = []
        for i in range(100):
            temps.append(i)
        plt.figure('Distribution of Temps by City: '+c)
        plt.bar(temps, ans)
       
        plt.title('Temperature Distribution: ' + c)
        plt.xlabel('Temperature')
        plt.ylabel(('Number of days'))


if False:
    plt.close()
    for c in ('SAN DIEGO',):  # try for BOSTON, SAN DIEGO
        plt.figure('Distribution of Temps by City')
        for y in ('1961','2015'): # also check ('1961','2015')
            ans = getDayDistributionForCity(c, y)
            temps = []
            for i in range(100):
                temps.append(i)
            if y == '1961':
                plt.bar(temps, ans, color = 'blue', label = y, alpha=0.5)
            else:
                plt.bar(temps, ans, color = 'red', label = y, alpha=0.5)
       
        plt.title('Temperature Distribution: ' + c)
        plt.xlabel('Temperature')
        plt.ylabel(('Number of days'))
        plt.legend(loc = 'best')

if False:
    plt.close()
    for c in ('BOSTON',):  # try for BOSTON, SAN DIEGO
        plt.figure('Distribution of Temps by City')
        for y in ('1961', '2015'):
            ans = getDayDistributionForCity(c, y)
            temps = []
            for i in range(100):
                temps.append(i)
            if y == '1961':
                plt.subplot(2,1,1)
                plt.ylim(0,20)
                plt.xlabel('Temperature')
                plt.ylabel(('Number of days'))
                plt.bar(temps, ans, color = 'blue', label = y)
            else:
                plt.subplot(2,1,2)
                plt.ylim(0,20)
                plt.xlabel('Temperature')
                plt.ylabel(('Number of days'))
                plt.bar(temps, ans, color = 'red', label = y)
       
        #plt.title('Temperature Distribution: ' + c)
        plt.legend(loc = 'best')
```
