---
title: "نظرية الأعداد"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# نظرية الأعداد

نظرية الأعداد هي دراسة الأعداد الصحيحة. وقد لا يكون واضحًا لماذا يريد أحد أن يدرس الأعداد الصحيحة. فأوّلًا، ما الذي يمكن معرفته فيها؟ هناك ٠، وهناك ١، و٢، و٣، وهكذا، ثم، بالطبع، \(-1\)، و\(-2\)، و… فأيّ هذه الأعداد هو الذي لا تفهمه؟ وأيّ قيمة عملية تُرجى منها؟

كان الرياضي هاردي (G. H. Hardy) يبتهج بعدم جدواها العملية، وقد كتب:

> قد يكون لعلماء الأعداد عذر في أن يبتهجوا بأن هناك علمًا واحدًا على الأقل، هو علمهم هم، من شأن بُعده الشديد عن أنشطة البشر العادية أن يبقيه وديعًا نظيفًا.

كان هاردي قَلِقًا بوجه خاص من أن يُستعمل علم الأعداد في الحرب؛ فقد كان من دعاة السلم. ويمكنك أن تصفّق لمشاعره، لكنه أخطأ التقدير: فعلم الأعداد هو ما يقوم عليه التشفير الحديث، وهو ما يجعل التواصل الآمن عبر الإنترنت ممكنًا. والتواصل الآمن حاسم بالطبع في الحرب — وليتطوّح هاردي في قبره. وهو أيضًا محور التجارة الإلكترونية: فكلّما اشتريت كتابًا من Amazon، أو استعملت شهادة رقمية للوصول إلى صفحة ويب، أو استخدمت حساب PayPal، فأنت تعتمد على خوارزميات من نظرية الأعداد.

ويوفّر علم الأعداد أيضًا بيئة ممتازة لتمرين تقنيات البرهان التي طوّرناها في الفصول السابقة وتطبيقها. وسنستخرج خواص القاسم المشترك الأكبر ونستعملها لبرهنة أن الأعداد الصحيحة تتحلّل إلى عوامل أوّلية تحلّلًا وحيدًا. ثم نُدخل الحساب النمطي ونستخرج من خواصه ما يكفي لشرح نظام RSA للتشفير بالمفتاح العام. وفي الطريق نمرّ بقصة آلان تورنغ ومحاولته المبكّرة — والفاشلة — في بناء شفرة على علم الأعداد، ثم نعود إلى SAT لنرى لماذا يهدّد وجود اختبار كفء لها أمنَ التشفير كلَّه. ولأننا سنركّز على خواص الأعداد الصحيحة، فسنعتمد في هذا الفصل العُرف الافتراضي القائل إن المتغيّرات تجري على مجموعة الأعداد الصحيحة \(\Z\).

## محتوى الفصل

- [القسمة](/book/mathematics-for-cs/ch09-number-theory/sec-divisibility)
- [Die Hard](/book/mathematics-for-cs/ch09-number-theory/sec-die-hard)
- [خوارزمية إقليدس](/book/mathematics-for-cs/ch09-number-theory/sec-euclids-algorithm)
- [المُسحِق](/book/mathematics-for-cs/ch09-number-theory/sec-the-pulverizer)
- [حلّ واحد لكل مسائل جرار الماء](/book/mathematics-for-cs/ch09-number-theory/sec-one-solution-for-all-water-jug-problems)
- [خواص القاسم المشترك الأكبر](/book/mathematics-for-cs/ch09-number-theory/sec-properties-of-the-gcd)
- [ألغاز الأعداد الأوّلية](/book/mathematics-for-cs/ch09-number-theory/sec-prime-mysteries)
- [المبرهنة الأساسية في الحساب](/book/mathematics-for-cs/ch09-number-theory/sec-fundamental-theorem-of-arithmetic)
- [برهان وحدة التحليل](/book/mathematics-for-cs/ch09-number-theory/sec-proving-unique-factorization)
- [آلان تورنغ](/book/mathematics-for-cs/ch09-number-theory/sec-alan-turing)
- [شفرة تورنغ (الإصدار ١٫٠)](/book/mathematics-for-cs/ch09-number-theory/sec-turings-code-version-1)
- [كسر شفرة تورنغ (الإصدار ١٫٠)](/book/mathematics-for-cs/ch09-number-theory/sec-breaking-turings-code-version-1)
- [الحساب النمطي](/book/mathematics-for-cs/ch09-number-theory/sec-modular-arithmetic)
- [حساب البواقي](/book/mathematics-for-cs/ch09-number-theory/sec-remainder-arithmetic)
- [حلقة الأعداد الصحيحة النمطية](/book/mathematics-for-cs/ch09-number-theory/sec-the-ring-zn)
- [شفرة تورنغ (الإصدار ٢٫٠)](/book/mathematics-for-cs/ch09-number-theory/sec-turings-code-version-2)
- [النظائر الضربية والاختصار](/book/mathematics-for-cs/ch09-number-theory/sec-multiplicative-inverses-and-cancelling)
- [فكّ التشفير (الإصدار ٢٫٠)](/book/mathematics-for-cs/ch09-number-theory/sec-decrypting-version-2)
- [كسر شفرة تورنغ (الإصدار ٢٫٠)](/book/mathematics-for-cs/ch09-number-theory/sec-breaking-turings-code-version-2)
- [خاتمة عن تورنغ](/book/mathematics-for-cs/ch09-number-theory/sec-turing-postscript)
- [مبرهنة أويلر](/book/mathematics-for-cs/ch09-number-theory/sec-eulers-theorem)
- [حساب دالة أويلر](/book/mathematics-for-cs/ch09-number-theory/sec-computing-eulers-function)
- [التشفير بالمفتاح العام RSA](/book/mathematics-for-cs/ch09-number-theory/sec-rsa-public-key-encryption)
- [ما علاقة SAT بهذا؟](/book/mathematics-for-cs/ch09-number-theory/sec-what-has-sat-got-to-do-with-it)
