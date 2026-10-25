---
title: "خط أنابيب الموقع الثابت الكامل"
---

تخيّل شخصًا يفتح رابطًا إلى موقعك ليتحقّق مما إذا كانت معدات التخييم الربيعية الجديدة متاحة بعد. لا يهمّه أن متجرك في الحقيقة حاوية S3 خاصة خلف CloudFront. ما يهمّه أن الصفحة تُحمَّل بسرعة، وتستخدم HTTPS، ولا تنهار عندما يُحدّث مسارًا عميقًا. وتلك السباكة غير المرئية هي خط الأنابيب الذي تبنيه الآن.

لقد أمضيت قوس الاستضافة الثابتة المبكّر في تعلّم خدمات AWS الفردية. تستطيع إنشاء حاوية S3، وضبط توزيع CloudFront، وتقييده بالتحكم في الوصول إلى الأصل. وكل قطعة تعمل بمفردها. لكن القيمة في كيفية تركيبها: يصل الطلب إلى CloudFront، فيقدّم CloudFront محتوى مخزّنًا مؤقتًا من S3 عبر HTTPS، ويكلّف الأمر كله بنسات. هذا هو خط الأنابيب. ويرسم هذا الدرس المعمارية من طرف إلى طرف ويشرح ترتيب العمليات: ما تنشئه أولًا، وما يعتمد على ما، ولماذا.

وإن أردت كتل البناء المعتمدة من AWS مفتوحة إلى جانب هذا الدرس، فأبقِ [درس موقع S3 الثابت](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) و[دليل OAC في CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) قريبين.

## لماذا يهم هذا

هذه أول لحظة تتوقّف فيها الدورة عن كونها «حفنة من خدمات AWS صرت تعرفها معرفة غامضة» وتصبح «نشرًا يمكنك شحنه فعلًا». فإن فهمت هذا التدفق، فلكل وحدة لاحقة مكان تتعلّق به. فـ Lambda يضيف حوسبة إلى الواجهة الأمامية نفسها. وAPI Gateway يضيف حافة HTTP إلى النطاق نفسه. وDynamoDB يضيف حالة إلى التطبيق نفسه. فهذا هو العمود الفقري.

## يبني على

- [إنشاء حاوية S3 وإعدادها](https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket)
- [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution)
- [التحكم في الوصول إلى الأصل في S3](https://stevekinney.com/courses/aws/origin-access-control-for-s3)
- [سلوكات التخزين المؤقت والإبطال](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations)

## المعمارية

هذا شكل خط الأنابيب الأساسي:

```
flowchart LR
    Browser["Browser"] --> CloudFront["CloudFront distribution<br/>HTTPS, cache, SPA fallback<br/>*.cloudfront.net"]
    CloudFront -->|cache miss| S3["Private S3 bucket<br/>static assets"]
```

1. **CloudFront** ينهي HTTPS باستخدام شهادته الافتراضية، ويفحص ذاكرة الحافة المؤقتة، وعند غياب الملف (miss) يجلب من S3 باستخدام التحكم في الوصول إلى الأصل.
2. **S3** يخزّن الملفات الثابتة في حاوية خاصة. ولا يقرأ منها إلا CloudFront.

خدمتان، ومسؤوليتان محدّدتان بوضوح. بلا خوادم. بلا حاويات. بلا موازنات حمل. وأنا أحبّ فعلًا مدى بساطة ما ينتهي إليه الأمر.

وإن كان لديك نطاق مخصّص، فيمكنك اختياريًا إضافة Route 53 وACM إلى خط الأنابيب. ويُغطّى ذلك في قسم [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) في نهاية الدورة. والمعمارية الموسّعة تبدو هكذا:

```
flowchart LR
    Browser["Browser"] --> Route53["Route 53 alias record<br/>example.com"]
    Route53 --> CloudFront["CloudFront distribution<br/>HTTPS, cache, SPA fallback"]
    CloudFront -->|cache miss| S3["Private S3 bucket<br/>static assets"]
    ACM["ACM certificate<br/>us-east-1"] --> CloudFront
```

## ترتيب العمليات

الترتيب مهم. فلا يمكنك إرفاق OAC بتوزيع غير موجود. ولا يمكنك تقييد S3 قبل أن يكون لدى CloudFront ARN توزيع. وهذا هو التتابع الذي يحافظ على صدق سلسلة التبعيات.

### إنشاء حاوية S3

تبقى الحاوية أساس التخزين: فهي تحمل ملفاتك. ولا شيء آخر في خط الأنابيب يعتمد على تهيئة S3 بطريقة معيّنة وقت الإنشاء — فيمكنك تحديث سياسة الحاوية لاحقًا دائمًا. وقد غطّيت هذا في [إنشاء حاوية S3 وإعدادها](https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket) ورفعت الملفات في [رفع الملفات وتنظيمها](https://stevekinney.com/courses/aws/uploading-and-organizing-files).

في هذه المرحلة، يمكن أن تكون الحاوية عامة أو خاصة. وتطلب منك الدورة جعلها عامة مؤقتًا لترى استضافة S3 المباشرة بمعزل عن غيرها. فتلك نقطة تعلّم عابرة، لا الحالة النهائية. والحالة النهائية هي حاوية خاصة مع CloudFront وOAC.

### إنشاء توزيع CloudFront مع OAC

بعد أن تصبح الحاوية جاهزة، يمكنك إنشاء التوزيع. وهذه هي الخطوة التي يجتمع فيها كل شيء:

- **الأصل** يشير إلى حاوية S3 لديك. وقد أعددت هذا في [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution).
- **التحكم في الوصول إلى الأصل** يقيّد الحاوية بحيث لا يقرأ منها إلا CloudFront. وقد أعددته في [التحكم في الوصول إلى الأصل في S3](https://stevekinney.com/courses/aws/origin-access-control-for-s3).
- **شهادة CloudFront الافتراضية** توفّر HTTPS على نطاق `*.cloudfront.net` تلقائيًا.
- **سلوكات التخزين المؤقت** و**استجابات الأخطاء المخصّصة** تتولّيان التخزين المؤقت وتوجيه SPA. وقد أعددتهما في [سلوكات التخزين المؤقت والإبطال](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations) و[صفحات الأخطاء المخصّصة وتوجيه SPA](https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing).

بعد إنشاء التوزيع، تحدّث سياسة حاوية S3 لتسمح فقط للكيان الخدمي (service principal) الخاص بـ CloudFront، وتعيد تمكين حجب الوصول العام على الحاوية. وعند هذه النقطة، تُرجع عناوين URL المباشرة لـ S3 الرمز 403.

وعند هذه النقطة، يصبح موقعك حيًّا على نطاق `*.cloudfront.net`. وإن أردت إضافة نطاق مخصّص، فقسم [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) الاختياري في نهاية الدورة يغطّي Route 53 وACM وربط كل شيء معًا.

## لماذا هذا الترتيب

تسير سلسلة التبعيات في اتجاه واحد:

```
flowchart RL
    CloudFront["CloudFront"] --> S3["S3"]
```

- CloudFront يعتمد على S3 (بوصفه أصله).
- سياسة حاوية S3 تعتمد على ARN توزيع CloudFront.
- لا يمكن إرفاق OAC قبل وجود التوزيع.

الترتيب ليس اعتباطيًا: بل يفرضه الاعتماد المتبادل بين الخدمات. فإن حاولت ضبط OAC قبل وجود التوزيع، فلا شيء تُرفقه به. وإن حاولت تقييد الحاوية قبل أن تحصل على ARN التوزيع، فليس للسياسة كيان تثق به.

## صلاحيات IAM التي تجعله يعمل

كل عملية في خط الأنابيب هذا تتطلّب صلاحيات IAM. وقد بنيت الفهم الأساسي في [نموذج IAM الذهني](https://stevekinney.com/courses/aws/iam-mental-model) و[كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy). وبالنسبة إلى خط أنابيب النشر، الصلاحيات الأساسية هي:

- **S3**: `s3:PutObject` و`s3:DeleteObject` و`s3:ListBucket` على حاويتك.
- **CloudFront**: `cloudfront:CreateInvalidation` على توزيعك.

وقد بنيت روبوت نشر محدود النطاق بهذه الصلاحيات نفسها لـ S3 وCloudFront في [تمرين سياسة IAM لروبوت النشر](https://stevekinney.com/courses/aws/iam-policy-exercise). والسياسة نفسها هي ما ستستخدمه في خطوط أنابيب CI/CD.

## ما تفعله كل خدمة وقت التشغيل

بعد نشر خط الأنابيب، هذا ما يحدث عندما يزور مستخدم `https://d1234abcdef.cloudfront.net/dashboard`:

1. **تحليل DNS**: يستعلم المتصفح DNS عن نطاق `*.cloudfront.net` ويحصل على عنوان IP لأقرب موقع حافة.
2. **مصافحة TLS**: يتّصل المتصفح بموقع حافة CloudFront. ويعرض CloudFront شهادته الافتراضية. فيتحقّق منها المتصفح وينشئ اتصالًا مشفّرًا.
3. **فحص ذاكرة الحافة المؤقتة**: يفحص CloudFront ما إذا كان `/dashboard` مخزّنًا مؤقتًا في موقع الحافة هذا.
4. **غياب في الذاكرة المؤقتة (الزيارة الأولى)**: يرسل CloudFront طلبًا موقّعًا إلى S3 (باستخدام بيانات اعتماد SigV4 الخاصة بـ OAC). ولا يملك S3 ملفًا عند `/dashboard`، فيُرجع 403.
5. **استجابة خطأ مخصّصة**: تعترض استجابة الخطأ المخصّصة في CloudFront الرمز 403، وتقدّم `/index.html` بدلًا منه، وتُرجع رمز الحالة 200. ثم يتولّى الموجّه في جانب العميل ويعرض واجهة `/dashboard`.
6. **إصابة في الذاكرة المؤقتة (الزيارات اللاحقة)**: يُقدَّم الطلب التالي لـ `/dashboard` من موقع الحافة نفسه مباشرة من الذاكرة المؤقتة. بلا رحلة ذهاب وعودة إلى S3.

كل طبقة تفعل شيئًا واحدًا. S3 يخزّن الملفات. CloudFront يخزّن مؤقتًا ويوجّه. ACM يؤمّن. Route 53 يحلّ الأسماء. والقطع تتركّب دون تداخل.

```
sequenceDiagram
    participant Browser
    participant CloudFront
    participant S3

    Browser->>CloudFront: GET /dashboard
    alt Cache hit
        CloudFront-->>Browser: Cached response
    else Cache miss
        CloudFront->>S3: Signed origin request
        S3-->>CloudFront: 403 for missing object
        CloudFront-->>Browser: index.html with SPA fallback
    end
```

## سير عمل النشر

بعد أن تصبح البنية التحتية في مكانها، نشر نسخة جديدة من موقعك أمران فقط:

```bash
# Upload new files to S3
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete \
  --output json

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

الخيار `--delete` يحذف من S3 الملفات القديمة التي لم تعد موجودة في مجلد البناء لديك. والإبطال يخبر CloudFront بإسقاط النسخ المخزّنة مؤقتًا كي تجلب مواقع الحافة النسخ الجديدة. وقد تعلّمت عن هذين في [سلوكات التخزين المؤقت والإبطال](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations).

هذا هو الأساس. وفي الدرسين التاليين، ستلفّ هذين الأمرين في سكربت نشر ثم تؤتمتهما بـ GitHub Actions بحيث يحدث النشر في كل دفعة إلى `main`.

> **نصيحة**
>
> إن أردت اختبار خط الأنابيب قبل أتمتته، فشغّل الأمرين أعلاه يدويًا بعد كل بناء. فهذا بالضبط ما يفعله خط الأنابيب المؤتمت: إنه فقط يزيلك من الحلقة.

## التحقق

استخدم هذه الفحوصات بعد ربط تطبيق Scratch Lab معًا:

```bash
curl -I https://YOUR_CLOUDFRONT_DOMAIN
curl -I https://YOUR_CLOUDFRONT_DOMAIN/collections/tents
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

تريد أن تتحقّق ثلاثة أمور:

- أن يُرجع `curl -I https://YOUR_CLOUDFRONT_DOMAIN` الرمز `200` مع مصافحة TLS صحيحة.
- أن يُرجع المسار العميق `200` ويقدّم HTML، مما يثبت عمل احتياطي SPA.
- أن يُرجع عنوان URL المباشر لـ S3 الرمز `403`، مما يثبت أن الحاوية خاصة.

## أنماط الفشل الشائعة

- **الحاوية ما زالت عامة:** إذا كان عنوان URL لـ S3 يعمل مباشرة، فالتحكم في الوصول إلى الأصل لا يحمي الحاوية فعليًا.
- **احتياطي SPA مضبوط في S3 فقط:** يمنحك ذلك صفحة، لكن غالبًا برمز حالة خاطئ. وينبغي أن يمتلك CloudFront سلوك المتصفح النهائي.
- **CloudFront يُرجع 403 لملفات موجودة:** سياسة الحاوية لا تثق بكيان التوزيع الخدمي، أو أن OAC غير مُرفق بالأصل.

## ما بعد هذه الدورة: النشر المستمر

بعد أن يستقرّ خط الأنابيب هذا، يتيح لك **النشر المستمر في CloudFront** شحن تغييرات عالية المخاطر على التوزيع (سلوكات تخزين مؤقت جديدة، وإعدادات أصل جديدة، وCloudFront Functions جديدة) خلف تقسيم مرجّح. فتنشئ *توزيعًا مرحليًا* مرتبطًا بتوزيعك الأساسي، وتوجّه نسبة من الحركة إليه عبر سياسة نشر مستمر، ثم ترقّي إعدادات التوزيع المرحلي إلى الأساسي بعد التحقّق منها. فكّر فيه كـ blue/green لـ CloudFront نفسه. وهو غير مشمول في هذه الدورة — فالنطاق هو شحن النسخة الأولى، لا التحسين عليها — لكنه الإجابة الصحيحة عندما تحتاج إلى تغيير التوزيع دون انتقال خطير.
