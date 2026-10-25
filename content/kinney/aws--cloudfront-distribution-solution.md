---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudfront-distribution-solution"
---

هذا هو الحل الكامل لـ[تمرين توزيع CloudFront](https://stevekinney.com/courses/aws/cloudfront-distribution-exercise). وكل أمر معروض مع ناتجه المتوقع.

## لماذا يعمل هذا

- تُبقي Origin Access Control حاوية S3 خاصة مع السماح لـ CloudFront بقراءة الملفات التي يحتاجها مستخدموك.
- تجعل استجابات الأخطاء المخصّصة تطبيق الصفحة الواحدة يتصرف كموجّه واجهة أمامية بدلًا من كومة أخطاء كائنات مفقودة.
- يصبح التوزيع نقطة فرض HTTPS والتخزين المؤقت وترويسات الأمان، ولهذا يجلس بين مستخدميك والحاوية.

> **نصيحة**
>
> إن تغيّر ناتج وحدة التحكم أو CLI أثناء عملك، فأبقِ [دليل مطوّري CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) و[دليل إعداد OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) مفتوحين.

## إنشاء Origin Access Control

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "my-frontend-app-oac",
    "Description": "OAC for my-frontend-app-assets S3 bucket",
    "SigningProtocol": "sigv4",
    "SigningBehavior": "always",
    "OriginAccessControlOriginType": "s3"
  }' \
  --region us-east-1 \
  --output json
```

الناتج المتوقع:

```json
{
  "Location": "https://cloudfront.amazonaws.com/2020-05-31/origin-access-control/E1OAC2EXAMPLE",
  "ETag": "E1ETAG1EXAMPLE",
  "OriginAccessControl": {
    "Id": "E1OAC2EXAMPLE",
    "OriginAccessControlConfig": {
      "Name": "my-frontend-app-oac",
      "Description": "OAC for my-frontend-app-assets S3 bucket",
      "SigningProtocol": "sigv4",
      "SigningBehavior": "always",
      "OriginAccessControlOriginType": "s3"
    }
  }
}
```

احفظ قيمة `Id` (`E1OAC2EXAMPLE`).

## إنشاء التوزيع

احفظ ما يلي باسم `distribution-config.json` (وهو متاح أيضًا في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/blob/main/cloudfront/distribution-config.json)):

```json
{
  "CallerReference": "my-frontend-app-2026-03-18",
  "Comment": "CloudFront distribution for my-frontend-app-assets",
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "PriceClass": "PriceClass_100",
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-my-frontend-app-assets",
        "DomainName": "my-frontend-app-assets.s3.us-east-1.amazonaws.com",
        "OriginAccessControlId": "E1OAC2EXAMPLE",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-my-frontend-app-assets",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true,
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    }
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 10
      },
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 10
      }
    ]
  },
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true
  },
  "Restrictions": {
    "GeoRestriction": {
      "RestrictionType": "none",
      "Quantity": 0
    }
  }
}
```

أنشئ التوزيع:

```bash
aws cloudfront create-distribution \
  --distribution-config file://distribution-config.json \
  --region us-east-1 \
  --output json
```

الناتج المتوقع (مختصرًا إلى الحقول التي تحتاجها):

```json
{
  "Distribution": {
    "Id": "E1A2B3C4D5E6F7",
    "ARN": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7",
    "DomainName": "d1234abcdef.cloudfront.net",
    "Status": "InProgress",
    "DistributionConfig": {
      "CallerReference": "my-frontend-app-2026-03-18",
      "Comment": "CloudFront distribution for my-frontend-app-assets",
      "Enabled": true,
      "DefaultRootObject": "index.html",
      "PriceClass": "PriceClass_100",
      "HttpVersion": "http2and3",
      "IsIPV6Enabled": true,
      "Origins": {
        "Quantity": 1,
        "Items": [
          {
            "Id": "S3-my-frontend-app-assets",
            "DomainName": "my-frontend-app-assets.s3.us-east-1.amazonaws.com",
            "OriginAccessControlId": "E1OAC2EXAMPLE",
            "S3OriginConfig": {
              "OriginAccessIdentity": ""
            }
          }
        ]
      },
      "DefaultCacheBehavior": {
        "TargetOriginId": "S3-my-frontend-app-assets",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true,
        "AllowedMethods": {
          "Quantity": 2,
          "Items": ["GET", "HEAD"],
          "CachedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"]
          }
        }
      },
      "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
          {
            "ErrorCode": 403,
            "ResponsePagePath": "/index.html",
            "ResponseCode": "200",
            "ErrorCachingMinTTL": 10
          },
          {
            "ErrorCode": 404,
            "ResponsePagePath": "/index.html",
            "ResponseCode": "200",
            "ErrorCachingMinTTL": 10
          }
        ]
      },
      "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
      },
      "Restrictions": {
        "GeoRestriction": {
          "RestrictionType": "none",
          "Quantity": 0
        }
      }
    }
  }
}
```

احفظ معرّف التوزيع (`E1A2B3C4D5E6F7`) واسم النطاق (`d1234abcdef.cloudfront.net`).

انتظر نشر التوزيع:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

يحجب هذا الأمر التنفيذ حتى تتغير الحالة من `InProgress` إلى `Deployed`. وعدم وجود ناتج يعني النجاح.

## تحديث سياسة حاوية S3

احفظ ما يلي باسم `bucket-policy-oac.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
        }
      }
    }
  ]
}
```

طبّق السياسة:

```bash
aws s3api put-bucket-policy \
  --bucket my-frontend-app-assets \
  --policy file://bucket-policy-oac.json \
  --region us-east-1
```

لا ناتج عند النجاح.

تحقّق من السياسة:

```bash
aws s3api get-bucket-policy \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

اختبر الوصول عبر CloudFront:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

المتوقع:

```
HTTP/2 200
content-type: text/html
```

اختبر أن الوصول المباشر إلى S3 محظور:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

المتوقع:

```
HTTP/1.1 403 Forbidden
```

## إعادة تمكين حظر الوصول العام

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
  --region us-east-1
```

لا ناتج عند النجاح.

تحقّق من تمكين حظر الوصول العام:

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

المتوقع:

```json
{
  "PublicAccessBlockConfiguration": {
    "BlockPublicAcls": true,
    "IgnorePublicAcls": true,
    "BlockPublicPolicy": true,
    "RestrictPublicBuckets": true
  }
}
```

تحقّق من أن CloudFront ما زال يعمل:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

ما زال `200 OK`. فسياسة الخدمة الأساسية لـ CloudFront لا تُعد سياسة «عامة».

## اختبار توجيه SPA

```bash
curl -I https://d1234abcdef.cloudfront.net/dashboard/settings
```

المتوقع:

```
HTTP/2 200
content-type: text/html
```

تعترض استجابة الخطأ المخصّصة رمز 403 القادم من S3 (لأن `/dashboard/settings` غير موجود ككائن) وتعيد `/index.html` برمز حالة 200. أما موجّهك في جهة العميل فيتولى الباقي.

اختبر مسارًا آخر غير موجود:

```bash
curl -I https://d1234abcdef.cloudfront.net/users/123/profile
```

النتيجة نفسها: `200 OK` مع `text/html`.

## إرفاق سياسة ترويسات الأمان

اجلب تهيئة التوزيع الحالية:

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > distribution-config-current.json
```

دوّن `ETag` في الاستجابة (مثل `E3ETAG3EXAMPLE`).

عدّل `DistributionConfig` لتضيف `ResponseHeadersPolicyId` إلى `DefaultCacheBehavior`. وينبغي أن يبدو السلوك المحدّث هكذا:

```json
{
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-my-frontend-app-assets",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "ResponseHeadersPolicyId": "67f7725c-6f97-4210-82d7-5512b31e9d03",
    "Compress": true,
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    }
  }
}
```

استخرج `DistributionConfig` (دون غلاف `ETag`) إلى `distribution-config-updated.json` وأرسله:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match E3ETAG3EXAMPLE \
  --distribution-config file://distribution-config-updated.json \
  --region us-east-1 \
  --output json
```

انتظر النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

تحقّق من ترويسات الأمان:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

المتوقع (من بين ترويسات أخرى):

```
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
```

## التحقق النهائي

شغّل كل الفحوصات:

```bash
# Distribution status
aws cloudfront get-distribution \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json \
  --query "Distribution.{Id:Id,Domain:DomainName,Status:Status}"
```

المتوقع:

```json
{
  "Id": "E1A2B3C4D5E6F7",
  "Domain": "d1234abcdef.cloudfront.net",
  "Status": "Deployed"
}
```

```bash
# HTTPS works
curl -I https://d1234abcdef.cloudfront.net

# SPA routing works
curl -I https://d1234abcdef.cloudfront.net/any/spa/route

# S3 is locked down
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

النتائج المتوقعة: تعيد CloudFront الرمز `200 OK` لكل من الجذر ومسار SPA. أما الوصول المباشر إلى S3 فيعيد `403 Forbidden`.

افتح نطاق CloudFront في متصفح لترى الموقع مباشرًا:

الموقع الثابت المقدّم عبر CloudFront بـ HTTPS، ويعرض «Hello from S3» على خلفية داكنة مع طابع زمني لتحميل الصفحة.

## ملخص الموارد المنشأة

| المورد | المعرّف |
| --- | --- |
| Origin Access Control | `E1OAC2EXAMPLE` |
| توزيع CloudFront | `E1A2B3C4D5E6F7` |
| نطاق التوزيع | `d1234abcdef.cloudfront.net` |
| سياسة حاوية S3 | محدّثة لتسمح لـ CloudFront فقط |
| سياسة ترويسات الاستجابة | `67f7725c-6f97-4210-82d7-5512b31e9d03` (SecurityHeadersPolicy مُدارة) |
| سياسة الذاكرة المؤقتة | `658327ea-f89d-4fab-a63d-7e88639e58f6` (CachingOptimized مُدارة) |

توزيعك الآن مباشر ومؤمّن على نطاقه `*.cloudfront.net`. وإن أردت إرفاق نطاق مخصّص لاحقًا، فراجع قسم [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) الاختياري في نهاية الدورة.

## التنظيف

عندما تنتهي من هذا التمرين، فكّك الموارد لتجنّب الرسوم المستمرة. يجب أن يكون التوزيع *معطّلًا* قبل أن تسمح لك CloudFront بحذفه—والتعطيل هو الجزء البطيء (15–30 دقيقة). أما الحذف الفعلي فسريع بمجرد أن تبلغ الحالة `Deployed`.

> **قبل أن تنسخ هذه الأوامر**
>
> المعرّفات أدناه (`E1A2B3C4D5E6F7` للتوزيع، و`E1OAC2EXAMPLE` لـ OAC) هي عناصر نائبة—استبدلها بمعرّفاتك الفعلية. اعثر على معرّفاتك بالأمر `aws cloudfront list-distributions --query 'DistributionList.Items[].{Id:Id,Domain:DomainName}' --output table` و`aws cloudfront list-origin-access-controls --output table`.
>
> شغّل هذه الأوامر في جلسة shell واحدة كي تبقى `$ETAG` و`$NEW_ETAG` و`$OAC_ETAG` في النطاق. فإن عدت في طرفية جديدة، فأعد جلب كل ETag قبل تشغيل الأمر الذي يستخدمه.
>
> تحقّق مرة أخرى من أن `"Enabled": false` في `distribution-config.json` قبل إرسال التحديث. فتركها `true` هو أكثر طريقة شائعة لفشل هذا التنظيف—إذ يرفض `delete-distribution` توزيعًا ممكّنًا بخطأ `DistributionNotDisabled`، ويبدو استدعاء `wait distribution-deployed` التالي عالقًا.

اجلب التهيئة الحالية وETag:

```bash
ETAG=$(aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --query 'ETag' --output text)

aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --query 'DistributionConfig' \
  --output json > distribution-config.json
```

عدّل `distribution-config.json` واضبط `"Enabled": false`، ثم أرسل التحديث:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --distribution-config file://distribution-config.json \
  --if-match "$ETAG"
```

انتظر `Status: Deployed` (هذه هي الخطوة البطيئة—اصنع فنجان قهوة):

```bash
aws cloudfront wait distribution-deployed --id E1A2B3C4D5E6F7
```

اجلب ETag الجديد (فهو يتغير مع كل تحديث)، ثم احذف:

```bash
NEW_ETAG=$(aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --query 'ETag' --output text)

aws cloudfront delete-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match "$NEW_ETAG"
```

احذف OAC:

```bash
OAC_ETAG=$(aws cloudfront get-origin-access-control \
  --id E1OAC2EXAMPLE \
  --query 'ETag' --output text)

aws cloudfront delete-origin-access-control \
  --id E1OAC2EXAMPLE \
  --if-match "$OAC_ETAG"
```
