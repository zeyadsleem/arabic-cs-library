---
title: "تمرين: إعداد توزيع CloudFront"
---

لديك حاوية S3 تحتوي ملفات موقع ثابت. ومهمّتك أن تضع CloudFront أمامها: أنشئ توزيعًا، وأحكِم إغلاق الحاوية بـ«التحكّم في الوصول إلى الأصل»، وهيئ توجيه SPA. وبحلول النهاية، ينبغي أن تكون لديك واجهة أمامية موزّعة عالميًا ومؤمّنة بـHTTPS على نطاق `*.cloudfront.net` تقدّم تطبيق SPA الخاص بك بشكل صحيح على كل المسارات.

## لماذا يهمّ هذا

بلا CloudFront، موقعك حاوية S3 في منطقة واحدة بلا HTTPS، وبلا تخزين مؤقت على الحافة، وبلا ترويسات أمان. أما مع CloudFront، فلديك شبكة CDN موزّعة عالميًا تقدّم المحتوى من مواقع حافة قريبة من مستخدميك، وتفرض HTTPS، وتتعامل مع توجيه SPA، وتضيف ترويسات أمان—وهي البنية نفسها التي تمنحك إياها Vercel وNetlify جاهزة. هذا التمرين هو الجسر من «ملفات في حاوية» إلى «نشر إنتاجي».

> **نصيحة**
>
> إن تغيّرت مخرجات وحدة التحكّم أو سطر الأوامر أثناء تنفيذك، فأبقِ [دليل مطوّر CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) و[دليل إعداد OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) مفتوحين.

## المتطلّبات المسبقة

قبل أن تبدأ، تأكّد من أن لديك:

- حاوية S3 (`my-frontend-app-assets`) تحتوي على الأقل ملف `index.html` محمّلًا. راجع [تحميل الملفات وتنظيمها](https://stevekinney.com/courses/aws/uploading-and-organizing-files) إن كنت بحاجة إلى إعداد ذلك.
- AWS CLI الإصدار 2 مهيّأ ببيانات اعتماد تملك أذونات CloudFront وS3.

## إنشاء تحكّم بالوصول إلى الأصل

أنشئ OAC سيستخدمه CloudFront لمصادقة الطلبات إلى حاوية S3 لديك.

- استخدم `aws cloudfront create-origin-access-control` مع تهيئة JSON.
- اضبط `SigningProtocol` على `sigv4`، و`SigningBehavior` على `always`، و`OriginAccessControlOriginType` على `s3`.
- احفظ `Id` الخاص بـOAC من الاستجابة—فأنت تحتاجه لتهيئة التوزيع.

### نقطة تحقّق

شغّل `aws cloudfront list-origin-access-controls --region us-east-1 --output json` وتأكّد من ظهور OAC الخاص بك في القائمة.

## إنشاء التوزيع

أنشئ توزيع CloudFront بهذه الإعدادات:

- **الأصل**: حاوية S3 لديك (`my-frontend-app-assets.s3.us-east-1.amazonaws.com`)، مع إرفاق معرّف OAC.
- **كائن الجذر الافتراضي**: `index.html`
- **فئة السعر**: `PriceClass_100`
- **سياسة التخزين المؤقت**: استخدم السياسة المُدارة `CachingOptimized` (`658327ea-f89d-4fab-a63d-7e88639e58f6`).
- **سياسة بروتوكول المشاهد**: `redirect-to-https`
- **الضغط**: مُفعّل
- **إصدار HTTP**: `http2and3`
- **شهادة المشاهد**: استخدم شهادة CloudFront الافتراضية (`CloudFrontDefaultCertificate: true`). فهذا يمنحك HTTPS على نطاق `*.cloudfront.net` تلقائيًا. وإن أردت نطاقًا مخصّصًا لاحقًا، فراجع القسم الاختياري [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) في نهاية الدورة.
- **استجابات الأخطاء المخصّصة**: اربط كلاً من `403` و`404` بـ`/index.html` مع رمز استجابة `200` ومدة تخزين مؤقت للأخطاء `10` ثوانٍ.

اكتب تهيئة التوزيع الكاملة بصيغة JSON واستخدم `aws cloudfront create-distribution --distribution-config file://distribution-config.json`.

### نقطة تحقّق

يعيد أمر `create-distribution` معرّف توزيع `Id` و`DomainName`. احفظ كليهما. وينبغي أن تكون `Status` هي `"InProgress"`. انتظر النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id YOUR_DISTRIBUTION_ID \
  --region us-east-1
```

## تحديث سياسة حاوية S3

استبدل سياسة حاويتك الحالية بأخرى تسمح لـCloudFront فقط بالقراءة منها:

- **الأصل**: أصل الخدمة `cloudfront.amazonaws.com`.
- **الإجراء**: `s3:GetObject`.
- **المورد**: `arn:aws:s3:::my-frontend-app-assets/*`.
- **الشرط**: `StringEquals` على `AWS:SourceArn` مطابقًا لـARN توزيعك (`arn:aws:cloudfront::123456789012:distribution/YOUR_DISTRIBUTION_ID`).

طبّق السياسة عبر `aws s3api put-bucket-policy`.

### نقطة تحقّق

اختبر أن CloudFront يقدّم محتواك:

```bash
curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
```

ينبغي أن تحصل على `200 OK`. والآن اختبر أن الوصول المباشر إلى S3 محجوب:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

ينبغي أن تحصل على `403 Forbidden`.

## إعادة تفعيل حجب الوصول العام

لم تعد حاويتك بحاجة إلى أن تكون متاحة للعامة. أعد تفعيل إعدادات حجب الوصول العام الأربعة كلها:

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
  --region us-east-1
```

### نقطة تحقّق

تحقّق من أن CloudFront لا يزال يعمل بعد إعادة تفعيل حجب الوصول العام:

```bash
curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
```

لا يزال `200 OK`. فسياسة أصل خدمة CloudFront لا تتأثّر بحجب الوصول العام.

## اختبار توجيه SPA

انتقل إلى مسار لا يقابل ملفًا حقيقيًا في حاوية S3 لديك:

```bash
curl -I https://YOUR_DISTRIBUTION_DOMAIN/dashboard/settings
```

ينبغي أن تحصل على `200 OK` مع `content-type: text/html`. وهذا يؤكّد أن استجابة الخطأ المخصّصة تعمل—فـCloudFront يقدّم `index.html` للمسارات المفقودة.

### نقطة تحقّق

افتح نطاق توزيعك في متصفّح وانتقل إلى مسار SPA. ينبغي أن تُحمّل الصفحة بشكل صحيح، وألّا يُنتج التحديث خطأ 403 أو 404.

## إرفاق سياسة ترويسات الاستجابة

أرفق السياسة المُدارة `SecurityHeadersPolicy` (`67f7725c-6f97-4210-82d7-5512b31e9d03`) بسلوك التخزين المؤقت الافتراضي:

- اجلب تهيئة التوزيع الحالية عبر `aws cloudfront get-distribution-config`.
- أضف `ResponseHeadersPolicyId` إلى `DefaultCacheBehavior`.
- حدّث التوزيع عبر `aws cloudfront update-distribution`، مستخدمًا `ETag` من الجلب.

### نقطة تحقّق

بعد نشر التوزيع، تحقّق من ترويسات الأمان:

```bash
curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
```

ينبغي أن ترى:

```
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
```

## التحقّق النهائي

في هذه المرحلة، ينبغي أن يكون توزيع CloudFront لديك:

1. أصل S3 مع تحكّم في الوصول إلى الأصل (بلا وصول عام إلى الحاوية).
2. سياسة التخزين المؤقت المُدارة `CachingOptimized`.
3. HTTPS عبر شهادة CloudFront الافتراضية مع `redirect-to-https`.
4. استجابات أخطاء مخصّصة لتوجيه SPA (403 و404 إلى `/index.html` مع 200).
5. ترويسات أمان عبر سياسة ترويسات الاستجابة.

شغّل فحصًا نهائيًا:

```bash
# Distribution details
aws cloudfront get-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --region us-east-1 \
  --output json \
  --query "Distribution.{Id:Id,Domain:DomainName,Status:Status}"

# Verify HTTPS works
curl -I https://YOUR_DISTRIBUTION_DOMAIN

# Verify SPA routing
curl -I https://YOUR_DISTRIBUTION_DOMAIN/any/spa/route

# Verify S3 is locked down
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

## تشخيص الأعطال

- **يعيد CloudFront الخطأ `403 Forbidden` لملفات موجودة:** سياسة حاوية S3 لا تثق بتحكّم الوصول إلى الأصل الخاص بتوزيعك، أو أن الأصل لا يزال مهيّأً لاستخدام الحاوية بشكل غير صحيح.
- **يعيد `/dashboard/settings` رمز 403 أو 404 بدلًا من هيكل تطبيقك:** استجابات الأخطاء المخصّصة لتوجيه SPA مفقودة أو تشير إلى المسار الخطأ.
- **لا يزال الوصول المباشر إلى S3 يعمل بعد تهيئة CloudFront:** أعد تفعيل حجب الوصول العام وتأكّد من أن سياسة الحاوية تمنح صلاحية القراءة لـCloudFront فقط، ولم تعد تمنحها لـ`Principal: "*"`.

## أهداف إضافية

- **سياسة ترويسات استجابة مخصّصة**: أنشئ سياسة مخصّصة بـ`max-age` لـHSTS مدّته سنتان، مع `includeSubDomains` و`preload`. وأضف ترويسة `Permissions-Policy` تعطّل الكاميرا والميكروفون وتحديد الموقع الجغرافي.
- **ترويسات Cache-Control على كائنات S3**: أعد تحميل أصولك بترويسات `Cache-Control` متباينة: مدة قصيرة لـ`index.html`، ومدة طويلة مع `immutable` للأصول المُجزَّأة.
- **إبطال مستهدف**: انشر تغييرًا على `index.html`، ثم أنشئ إبطالًا لـ`/index.html` فقط بدلًا من `/*`. وتحقق من أن النسخة القديمة لا تزال مخزّنة مؤقتًا للمسارات الأخرى.
