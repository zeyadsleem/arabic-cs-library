---
title: "تمرين: نشر موقع ثابت من طرف إلى طرف"
---

ستنشر موقعًا ثابتًا من الصفر إلى الإنتاج. بلا اختصارات، وبلا تخطّي خطوات. هذا هو تمريني المفضّل في الدورة كلها. وبحلول النهاية، سيكون موقعك متاحًا مباشرةً على نطاق `*.cloudfront.net`—يُقدَّم عبر CloudFront، ومؤمّنًا بـHTTPS، ومخزّنًا في حاوية S3 خاصة. يدمج هذا التمرين مسار الاستضافة الثابتة الأساسي: IAM وS3 وCloudFront وOAC.

## لماذا يهمّ هذا

لقد بنيت كل قطعة على حدة في أقسام الاستضافة الثابتة المبكّرة. ويثبت هذا التمرين أنها تتكامل في نشر عامل. وهو أيضًا تجربة أولية لسير العمل الذي ستؤتمته بـGitHub Actions: فكل خطوة يدوية هنا تقابل خطوة في خط أنابيب CI/CD لديك. وإن استطعت فعلها يدويًا، فأنت تفهم ما تفعله الأتمتة.

إن أردت نسخة AWS من سير العمل من طرف إلى طرف مفتوحة أثناء عملك، فأبقِ [درس موقع S3 الثابت](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) و[دليل OAC في CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) قريبين منك.

## المتطلّبات المسبقة

قبل أن تبدأ:

- AWS CLI الإصدار 2 مهيّأ ببيانات اعتماد تملك أذونات بمستوى المسؤول (أو على الأقل: الوصول إلى S3 وCloudFront وIAM). راجع [إعداد AWS CLI](https://stevekinney.com/courses/aws/setting-up-the-aws-cli).
- دليل بناء موقع ثابت يحتوي على الأقل ملف `index.html`. وإن لم يكن لديك واحد، فأنشئ موقعًا بسيطًا:

```bash
mkdir -p build
echo '<!DOCTYPE html><html><head><title>My Site</title></head><body><h1>It works.</h1></body></html>' > build/index.html
```

## إنشاء حاوية S3

أنشئ حاوية لحفظ ملفاتك الثابتة. واحجب كل وصول عام من البداية—فسيكون CloudFront الطريق الوحيد للوصول إلى هذه الملفات.

- أنشئ الحاوية عبر `aws s3 mb`.
- فعّل حجب الوصول العام عبر `aws s3api put-public-access-block`.
- تحقّق من وجود الحاوية عبر `aws s3 ls`.

راجع [إنشاء حاوية وتهيئتها](https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket) للأوامر.

### نقطة تحقّق

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

ينبغي أن تكون الإعدادات الأربعة كلها `true`.

## تحميل موقعك

زامن دليل بنائك مع الحاوية:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

راجع [تحميل الملفات وتنظيمها](https://stevekinney.com/courses/aws/uploading-and-organizing-files) لخيارات مثل ترويسات `--cache-control`.

### نقطة تحقّق

```bash
aws s3 ls s3://my-frontend-app-assets \
  --region us-east-1
```

ينبغي أن ترى `index.html` (وأي ملفات أخرى) مدرجة.

## إنشاء تحكّم بالوصول إلى الأصل

أنشئ OAC سيستخدمه CloudFront لمصادقة الطلبات إلى حاوية S3 لديك:

- استخدم `aws cloudfront create-origin-access-control`.
- اضبط `SigningProtocol` على `sigv4`، و`SigningBehavior` على `always`، و`OriginAccessControlOriginType` على `s3`.
- احفظ `Id` الخاص بـOAC من الاستجابة.

راجع [التحكّم في الوصول إلى الأصل في S3](https://stevekinney.com/courses/aws/origin-access-control-for-s3).

### نقطة تحقّق

```bash
aws cloudfront list-origin-access-controls \
  --region us-east-1 \
  --output json \
  --query "OriginAccessControlList.Items[*].{Id:Id,Name:Name}"
```

ينبغي أن يظهر OAC الخاص بك في القائمة.

## إنشاء توزيع CloudFront

أنشئ توزيعًا يربط الحاوية وOAC والشهادة معًا. وينبغي أن تتضمّن تهيئة توزيعك:

- **الأصل**: حاوية S3 لديك مع إرفاق معرّف OAC.
- **كائن الجذر الافتراضي**: `index.html`.
- **سياسة بروتوكول المشاهد**: `redirect-to-https`.
- **سياسة التخزين المؤقت**: السياسة المُدارة `CachingOptimized` (`658327ea-f89d-4fab-a63d-7e88639e58f6`).
- **استجابات الأخطاء المخصّصة**: اربط 403 و404 بـ`/index.html` مع رمز استجابة 200.
- **شهادة المشاهد**: استخدم شهادة CloudFront الافتراضية (`CloudFrontDefaultCertificate: true`).

راجع [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution) و[صفحات الأخطاء المخصّصة وتوجيه SPA](https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing).

احفظ معرّف التوزيع واسم النطاق من الاستجابة.

### نقطة تحقّق

انتظر النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id YOUR_DISTRIBUTION_ID \
  --region us-east-1
```

ثم تحقّق من أن نطاق CloudFront يقدّم موقعك:

```bash
curl -I https://YOUR_CLOUDFRONT_DOMAIN/index.html
```

ينبغي أن تحصل على `200 OK`.

## تحديث سياسة حاوية S3

استبدل سياسة الحاوية بحيث تسمح لـCloudFront فقط بالقراءة من الحاوية:

- **الأصل**: أصل الخدمة `cloudfront.amazonaws.com`.
- **الإجراء**: `s3:GetObject`.
- **المورد**: `arn:aws:s3:::my-frontend-app-assets/*`.
- **الشرط**: `StringEquals` على `AWS:SourceArn` مطابقًا لـARN توزيعك.

راجع [التحكّم في الوصول إلى الأصل في S3](https://stevekinney.com/courses/aws/origin-access-control-for-s3) و[سياسات الحاوية والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access).

### نقطة تحقّق

ينبغي أن يظل CloudFront يعمل:

```bash
curl -I https://YOUR_CLOUDFRONT_DOMAIN/index.html
```

وينبغي أن يكون الوصول المباشر إلى S3 محجوبًا:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

ينبغي أن يُرجع `403 Forbidden`.

## التحقّق من خط الأنابيب الكامل

مرّ على كل طبقة من طبقات خط الأنابيب:

```bash
# HTTPS works on the CloudFront domain
curl -I https://YOUR_CLOUDFRONT_DOMAIN

# SPA routing works (returns index.html for non-existent paths)
curl -I https://YOUR_CLOUDFRONT_DOMAIN/any/spa/route

# Direct S3 access is blocked
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

### نقطة تحقّق

- `curl -I https://YOUR_CLOUDFRONT_DOMAIN` يعيد `200 OK`
- `curl -I https://YOUR_CLOUDFRONT_DOMAIN/any/spa/route` يعيد `200 OK` (توجيه SPA)
- الوصول المباشر إلى S3 يعيد `403 Forbidden`

## اختبار عملية نشر

انشر تغييرًا للتحقّق من أن دورة التحديث تعمل:

1. عدّل `index.html` (غيّر نص العنوان).
2. زامن الملف المحدّث مع S3:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete \
  --output json
```

1. أبطل ذاكرة CloudFront المؤقتة:

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

1. انتظر دقيقة، ثم أعد تحميل `https://YOUR_CLOUDFRONT_DOMAIN`. ينبغي أن ترى المحتوى المحدّث.

### نقطة تحقّق

محتواك المحدّث متاح مباشرةً على `https://YOUR_CLOUDFRONT_DOMAIN`. ودورة النشر (المزامنة + الإبطال) تعمل من طرف إلى طرف.

## تشخيص الأعطال

- **يعيد CloudFront الخطأ `403 Forbidden` لملفات موجودة:** سياسة حاوية S3 لا تثق بتحكّم الوصول إلى الأصل الخاص بتوزيعك، أو أن الأصل لا يزال مهيّأً بشكل غير صحيح.
- **لا تظهر الصفحة المحدّثة أبدًا بعد المزامنة:** وصل الملف الجديد إلى S3، لكن CloudFront لا يزال يقدّم النسخة المخزّنة مؤقتًا. تأكّد من اكتمال الإبطال قبل إعادة الاختبار.

## أهداف إضافية

- **ترويسات تخزين مؤقت متباينة**: أعد تحميل أصولك مع `--cache-control "public, max-age=31536000, immutable"` للملفات المُجزَّأة و`--cache-control "public, max-age=60"` لـ`index.html`. تحقّق من ظهور الترويسات في استجابات `curl -I`.
- **ترويسات أمان**: أرفق السياسة المُدارة `SecurityHeadersPolicy` (`67f7725c-6f97-4210-82d7-5512b31e9d03`) بسلوك التخزين المؤقت الافتراضي لتوزيعك. تحقّق من ظهور `strict-transport-security` و`x-content-type-options` و`x-frame-options` في ترويسات الاستجابة.
- **سكربت نشر**: اكتب سكربت `deploy.sh` يؤتمت خطوتي المزامنة والإبطال. راجع [أتمتة النشر باستخدام AWS CLI](https://stevekinney.com/courses/aws/automating-deploys-with-aws-cli) للقالب.

> **نصيحة**
>
> أتريد وضع هذا خلف نطاق مخصّص مع HTTPS على شهادتك الخاصة؟ راجع القسم الاختياري [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) في نهاية الدورة. فهو يستعرض Route 53 وACM وربط كل شيء معًا.

حين تصبح جاهزًا، قارن عملك بـ[الحل: نشر موقع ثابت من طرف إلى طرف](https://stevekinney.com/courses/aws/static-site-deployment-solution).
