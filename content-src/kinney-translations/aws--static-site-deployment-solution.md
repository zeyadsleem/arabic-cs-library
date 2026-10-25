---
title: "الحل: نشر موقع ثابت من البداية إلى النهاية"
---

هذا هو الحل الكامل لـ[تمرين نشر موقع ثابت من البداية إلى النهاية](https://stevekinney.com/courses/aws/static-site-deployment-exercise). وقد أدرجت كل أمر مع ناتجه المتوقع كي تقارن أثناء عملك.

## لماذا يعمل هذا

- يحوّل سير العمل هذا خدمتين إلى مسار نشر واحد: S3 يخزّن الملفات، وCloudFront يقدّمها عبر HTTPS على نطاق `*.cloudfront.net`.
- تبقى الحاوية خاصة لأن CloudFront هو نقطة الدخول العامة الوحيدة التي تحتاج إلى وصول قراءة مباشر.
- حلقة المزامنة مع الإبطال في النهاية هي دورة النشر العملية التي ستكررها طويلًا بعد انتهاء التمرين.

إن أردت نسخة AWS من سير العمل من البداية إلى النهاية مفتوحة أثناء عملك، فأبقِ [درس موقع S3 الثابت](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) و[دليل OAC في CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) قريبين.

## إنشاء حاوية S3

أنشئ الحاوية:

```bash
aws s3 mb s3://my-frontend-app-assets \
  --region us-east-1
```

الناتج المتوقع:

```
make_bucket: my-frontend-app-assets
```

مكّن حظر الوصول العام:

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
  --region us-east-1
```

لا ناتج عند النجاح.

تحقّق:

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

## ارفع موقعك

أنشئ موقعًا أدنى إن لم يكن لديك واحد:

```bash
mkdir -p build
echo '<!DOCTYPE html><html><head><title>My Site</title></head><body><h1>It works.</h1></body></html>' > build/index.html
```

ارفع:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

الناتج المتوقع:

```
upload: build/index.html to s3://my-frontend-app-assets/index.html
```

تحقّق:

```bash
aws s3 ls s3://my-frontend-app-assets \
  --region us-east-1
```

المتوقع:

```
2026-03-18 12:00:00        102 index.html
```

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

المتوقع:

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

## إنشاء توزيع CloudFront

احفظ ما يلي باسم `distribution-config.json`:

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

المتوقع (مختصرًا):

```json
{
  "Distribution": {
    "Id": "E1A2B3C4D5E6F7",
    "ARN": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7",
    "DomainName": "d1234abcdef.cloudfront.net",
    "Status": "InProgress"
  }
}
```

احفظ معرّف التوزيع واسم النطاق.

انتظر النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

لا ناتج عند النجاح. تحقّق:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

المتوقع:

```
HTTP/2 200
content-type: text/html
```

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

تحقّق من أن CloudFront ما زال يعمل:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

المتوقع: `200 OK`.

تحقّق من أن الوصول المباشر إلى S3 محظور:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

المتوقع: `403 Forbidden`.

## التحقق من خط الأنابيب الكامل

```bash
# HTTPS works on the CloudFront domain
curl -I https://d1234abcdef.cloudfront.net
```

المتوقع:

```
HTTP/2 200
content-type: text/html
```

```bash
# SPA routing works
curl -I https://d1234abcdef.cloudfront.net/any/spa/route
```

المتوقع:

```
HTTP/2 200
content-type: text/html
```

```bash
# Direct S3 access is blocked
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

المتوقع:

```
HTTP/1.1 403 Forbidden
```

## اختبار عملية نشر

حدّث محتوى الموقع:

```bash
echo '<!DOCTYPE html><html><head><title>My Site</title></head><body><h1>Updated content.</h1></body></html>' > build/index.html
```

زامن إلى S3:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete \
  --output json
```

المتوقع:

```
upload: build/index.html to s3://my-frontend-app-assets/index.html
```

أبطل الذاكرة المؤقتة:

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

المتوقع:

```json
{
  "Invalidation": {
    "Id": "I1EXAMPLE",
    "Status": "InProgress",
    "CreateTime": "2026-03-18T12:05:00Z",
    "InvalidationBatch": {
      "Paths": {
        "Quantity": 1,
        "Items": ["/*"]
      },
      "CallerReference": "cli-1710763500"
    }
  }
}
```

انتظر دقيقة، ثم تحقّق:

```bash
curl -s https://d1234abcdef.cloudfront.net | grep "Updated content"
```

المتوقع:

```
<h1>Updated content.</h1>
```

## ملخص الموارد المنشأة

| المورد | المعرّف |
| --- | --- |
| حاوية S3 | `my-frontend-app-assets` |
| Origin Access Control | `E1OAC2EXAMPLE` |
| توزيع CloudFront | `E1A2B3C4D5E6F7` |
| نطاق CloudFront | `d1234abcdef.cloudfront.net` |
| سياسة حاوية S3 | وصول CloudFront فقط عبر OAC |

موقعك الثابت الآن مباشر على `https://d1234abcdef.cloudfront.net`، مقدَّمًا عالميًا عبر CloudFront، ومخزَّنًا في حاوية S3 خاصة، ومؤمَّنًا بـ HTTPS عبر شهادة CloudFront الافتراضية. وتحدّث دورة النشر (المزامنة + الإبطال) الموقع في أقل من دقيقة.

> **نصيحة**
>
> أتريد وضع هذا خلف نطاق مخصّص؟ راجع قسم [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) الاختياري في نهاية الدورة.
