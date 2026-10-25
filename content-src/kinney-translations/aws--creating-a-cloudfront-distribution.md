---
title: "إنشاء توزيع CloudFront"
---

لديك حاوية S3 تحتوي ملفات موقعك الثابت. الآن تحتاج إلى وضع شبكة توصيل محتوى (CDN) أمامها. وهذا يعني إنشاء **توزيع** (distribution) في CloudFront — المورد الذي يحدّد كيف تقدّم CloudFront محتواك للمستخدمين حول العالم.

إذا أردت مصطلحات AWS الدقيقة إلى جانب هذا الدرس، فإن [دليل مطوّر CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) و[مرجع إعدادات سلوك التخزين المؤقت](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html) هما المصدران الرسميان.

على Vercel، يحدث هذا تلقائيًا عندما تدفع إلى فرع Git. وعلى AWS، تضبطه صراحةً. والميزة: تتحكم في كل تفصيل. والعيب: هناك تفاصيل كثيرة.

> **ملاحظة**
>
> يستعرض هذا الدرس التوزيع *الأدنى القابل للتشغيل*: بلا OAC، ولا شهادة ACM، ولا نطاق مخصّص. وستحصل على «Access Denied» في المتصفح في النهاية، وهذا هو المقصود — فهو يمهّد للدرسين التاليين. ويجمع [تمرين إعداد توزيع CloudFront](https://stevekinney.com/courses/aws/cloudfront-distribution-exercise) القطع في الإعداد النهائي بمظهر الإنتاج بعد أن تكون قد عملت على OAC وACM.

## إنشاء توزيع في لوحة التحكم

يرشدك معالج **Create distribution** في CloudFront خلال العملية خطوة بخطوة. انتقل إلى **CloudFront → Distributions → Create distribution** للبدء.

### الخطوة 1: البدء

تسأل الشاشة الأولى عن **اسم التوزيع** و**نوع التوزيع**. أدخل اسمًا مثل `my-frontend-app` — ويُخزَّن هذا كوسم لتسهيل التعرّف. واترك نوع التوزيع على **Single website or app** (الافتراضي). ويمكنك تخطّي نطاق Route 53 الآن — ستضيف نطاقًا مخصّصًا لاحقًا.

![معالج CloudFront Create Distribution الخطوة 1، وهو يعرض حقل اسم التوزيع مملوءًا بـ my-frontend-app والنوع Single website or app مختارًا.](/images/kinney/0819cac04418b315.webp)

### الخطوة 2: تحديد الأصل

هنا تخبر CloudFront من أين تجلب محتواك. اختر **Amazon S3** كنوع الأصل، ثم أدخل اسم النطاق الإقليمي لحاوية S3: `my-frontend-app-assets.s3.us-east-1.amazonaws.com`.

![معالج CloudFront Create Distribution الخطوة 2، وهو يعرض اختيار Amazon S3 كنوع الأصل مع ملء عنوان URL لحاوية S3.](/images/kinney/f547fd15ca5c1091.webp)

> **تحذير**
>
> استخدم نقطة نهاية S3 REST (`my-frontend-app-assets.s3.us-east-1.amazonaws.com`)، لا نقطة نهاية موقع S3 (`my-frontend-app-assets.s3-website-us-east-1.amazonaws.com`). فـ CloudFront يتحدث إلى S3 عبر REST API، واستخدام نقطة نهاية الموقع يكسر مصادقة OAC.

مرّر لأسفل وسترى قسم **Settings**. اترك **Allow private S3 bucket access to CloudFront** محدّدًا — فهذا يضبط التحكم في الوصول إلى الأصل (OAC) بحيث لا يقرأ من حاويتك إلا CloudFront. وإعدادات الأصل والتخزين المؤقت الموصى بها مناسبة لموقع ثابت.

![إعدادات أصل CloudFront وهي تعرض مربّع اختيار OAC ممكّنًا، وإعدادات الأصل الموصى بها مختارة، وإعدادات التخزين المؤقت الموصى بها المصمّمة لمحتوى S3.](/images/kinney/24e7751db244abdb.webp)

### الخطوة 3: تمكين الأمان

يسأل المعالج إن كنت تريد تمكين AWS WAF (جدار حماية تطبيقات الويب). تضيف WAF تكلفة (14 دولارًا شهريًا لـ 10 ملايين طلب) وليست ضرورية لتمرين موقع ثابت. اختر **Do not enable security protections**.

![خطوة الأمان في CloudFront وهي تعرض خيارات WAF مع اختيار Do not enable security protections.](/images/kinney/9e01e32143974bc5.webp)

### الخطوة 4: الحصول على شهادة TLS

يسأل المعالج إن كنت تريد طلب شهادة ACM لنطاق مخصّص. وبما أننا نستخدم نطاق CloudFront الافتراضي `*.cloudfront.net` الآن، فتخطَّ هذه الخطوة بالنقر على **Next** دون إدخال نطاق. وسترفق شهادة مخصّصة لاحقًا في [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate) إن أعددت نطاقًا مخصّصًا.

### الخطوة 5: المراجعة والإنشاء

تعرض الخطوة الأخيرة ملخّصًا لكل ما أعددته — اسم التوزيع، وأصل S3 مع منح وصول CloudFront، وإعدادات التخزين المؤقت، وإعداد الأمان. تحقّق من التفاصيل وانقر **Create distribution**.

![خطوة المراجعة في CloudFront وهي تعرض اسم التوزيع وأصل S3 ووصول OAC الممنوح وإعدادات التخزين المؤقت قبل الإنشاء.](/images/kinney/6170037ae4d827ec.webp)

بعد الإنشاء، تنشر CloudFront توزيعك إلى مواقع الحافة حول العالم. ويستغرق هذا بضع دقائق — وتعرض لوحة التحكم حالة النشر.

![صفحة تفاصيل توزيع CloudFront وهي تعرض التوزيع بحالة Deploying فور الإنشاء.](/images/kinney/c030d7c76b45a438.webp)

## إعدادات التوزيع (CLI)

يمكنك أيضًا إنشاء توزيع عبر CLI بتمرير إعدادات JSON إلى `aws cloudfront create-distribution`. والإعدادات مطوّلة — فلدى CloudFront خيارات كثيرة، وتتطلب منك CLI تحديد معظمها حتى عندما تريد الافتراضيات. وهذا هو الإعداد الكامل الذي ينتج التوزيع نفسه الذي أنشأته للتو في لوحة التحكم.

احفظ هذا باسم `distribution-config.json`:

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

هذا JSON كثير. لنستعرضه.

## تفكيك الإعدادات

### CallerReference

```json
"CallerReference": "my-frontend-app-2026-03-18"
```

سلسلة فريدة تمنعك من إنشاء توزيعات مكرّرة عن غير قصد. فإذا أرسلت `CallerReference` نفسها مرتين، تُرجع CloudFront التوزيع الموجود بدلًا من إنشاء واحد جديد. استخدم طابعًا زمنيًا أو اسم مشروع — أي شيء فريد لهذا التوزيع.

### DefaultRootObject

```json
"DefaultRootObject": "index.html"
```

عندما يطلب أحدهم عنوان URL الجذري لتوزيعك (`https://d1234abcdef.cloudfront.net/`)، تقدّم CloudFront هذا الملف. وهذا مكافئ CDN لإعداد مستند الفهرس في S3. ومن دونه، يُرجع الطلب إلى `/` خطأً لأن CloudFront لا يعرف أي كائن يقدّم.

> **تحذير**
>
> ينطبق `DefaultRootObject` على عنوان URL الجذري (`/`) فقط. ولا ينطبق على مسارات الأدلّة الفرعية مثل `/about/`. فإذا احتجت إلى أن يقدّم `/about/` الملف `/about/index.html`، فستحتاج إلى CloudFront Function أو Lambda@Edge، وهو ما ستغطّيه في قسم الحوسبة على الحافة. وللتطبيقات أحادية الصفحة، يتولّى هذا استجابات الأخطاء المخصّصة، التي ستضبطها في [صفحات الأخطاء المخصّصة وتوجيه SPA](https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing).

### PriceClass

```json
"PriceClass": "PriceClass_100"
```

يتحكم في مواقع الحافة التي تقدّم محتواك. و`PriceClass_100` يغطّي أمريكا الشمالية وأوروبا وإسرائيل — وهو الخيار الأرخص. ويمكنك تغييره إلى `PriceClass_200` (يضيف آسيا وأفريقيا والشرق الأوسط) أو `PriceClass_All` (كل موقع حافة حول العالم) في أي وقت دون إنشاء توزيع جديد.

### Origins

```json
"Origins": {
  "Quantity": 1,
  "Items": [
    {
      "Id": "S3-my-frontend-app-assets",
      "DomainName": "my-frontend-app-assets.s3.us-east-1.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ]
}
```

**الأصل** هو المكان الذي تجلب منه CloudFront المحتوى عندما لا يكون لديها نسخة مخزّنة مؤقتًا. ولموقع ثابت، هذا هو حاوية S3 لديك. وبضعة أمور تستحق الملاحظة:

- **`Id`**: تسمية لهذا الأصل. وتشير إليها في سلوكات التخزين المؤقت لتخبر CloudFront أي أصل يستخدم لأي مسارات. والاسم اعتباطي.
- **`DomainName`**: اسم النطاق الإقليمي لحاوية S3. استخدم الصيغة `<bucket>.s3.<region>.amazonaws.com`، لا نقطة نهاية موقع S3. فـ CloudFront يتحدث إلى S3 عبر REST API، لا عبر نقطة نهاية الموقع. (هذه أزعجتني أول مرة أعددت فيها هذا — استخدمت نقطة نهاية الموقع وأمضيت وقتًا طويلًا في التصحيح.)
- **`S3OriginConfig.OriginAccessIdentity`**: مضبوط على سلسلة فارغة الآن. فنحن لا نستخدم هوية الوصول إلى الأصل القديمة (OAI). وفي الدرس التالي، ستضبط **التحكم في الوصول إلى الأصل** (OAC) الأحدث، وهو النهج الموصى به.

> **تحذير**
>
> لا تستخدم عنوان URL لنقطة نهاية موقع S3 (مثل `my-frontend-app-assets.s3-website-us-east-1.amazonaws.com`) كاسم نطاق الأصل. فتلك النقطة مخصصة للوصول المباشر من المتصفح. ويحتاج CloudFront إلى نقطة نهاية REST API (`my-frontend-app-assets.s3.us-east-1.amazonaws.com`) لمصادقة الطلبات بشكل صحيح، خاصة عندما تضيف التحكم في الوصول إلى الأصل.

### DefaultCacheBehavior

```json
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
}
```

هذا هو **السلوك** الافتراضي — القواعد التي تنطبق على كل طلب لا يطابق نمط مسار أكثر تحديدًا. والحقول المهمة:

- **`TargetOriginId`**: يجب أن يطابق `Id` لأحد أصولك.
- **`ViewerProtocolPolicy`**: تعني `"redirect-to-https"` أن أي طلب HTTP يحصل على إعادة توجيه 301 إلى HTTPS. وهذا ما تريده لأي موقع إنتاجي.
- **`CachePolicyId`**: بدلًا من تحديد مدة الصلاحية والقيم الممرّرة يدويًا، تشير إلى **سياسة تخزين مؤقت** مُدارة. والمعرّف `658327ea-f89d-4fab-a63d-7e88639e58f6` هو سياسة **CachingOptimized** في AWS، التي تضبط مدة صلاحية افتراضية قدرها 86,400 ثانية (24 ساعة)، وحدًّا أقصى 31,536,000 ثانية (365 يومًا)، وحدًّا أدنى ثانية واحدة.
- **`Compress`**: عندما تكون `true`، تضغط CloudFront الملفات تلقائيًا باستخدام gzip أو Brotli قبل إرسالها إلى المتصفح. وتفحص CloudFront ترويسة `Accept-Encoding` وتختار Brotli عندما يعلن المتصفح دعمه (وكل متصفح حديث يفعل)، وإلا فترجع إلى gzip. وتحصل Brotli على حمولات أصغر بنحو 15–20% من gzip في المحتوى النصي. تحسين أداء مجاني في الحالتين.

### ViewerCertificate

```json
"ViewerCertificate": {
  "CloudFrontDefaultCertificate": true
}
```

الآن، نستخدم شهادة CloudFront الافتراضية، التي تمنحك HTTPS على نطاق `*.cloudfront.net`. وفي [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate)، ستستبدلها بشهادة ACM لاستخدام نطاق مخصّص.

> **ملاحظة**
>
> ما دمت تستخدم شهادة `*.cloudfront.net` الافتراضية، تفرض CloudFront سياسة الأمان TLS 1.0 بغض النظر عما تضبطه هنا — فـ `MinimumProtocolVersion` يُتجاهل بصمت عندما تكون `CloudFrontDefaultCertificate` مساوية `true`. وستشدّد هذا إلى `TLSv1.2_2021` في درس [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate) بمجرد أن تجلب شهادة ACM الخاصة بك.

## إنشاء التوزيع

بعد حفظ ملف الإعدادات، أنشئ التوزيع:

```bash
aws cloudfront create-distribution \
  --distribution-config file://distribution-config.json \
  --region us-east-1 \
  --output json
```

الاستجابة كبيرة — فـ CloudFront يُرجع إعدادات التوزيع الكاملة إضافة إلى حالته الحالية. والحقول التي تهمك الآن:

```json
{
  "Distribution": {
    "Id": "E1A2B3C4D5E6F7",
    "DomainName": "d1234abcdef.cloudfront.net",
    "Status": "InProgress",
    "DistributionConfig": {
      "...": "the config you submitted"
    }
  }
}
```

- **`Id`**: المعرّف الفريد لتوزيعك. وستستخدمه في كل عملية لاحقة — الإبطال والتحديث والحذف.
- **`DomainName`**: عنوان URL في CloudFront الذي أصبح موقعك متاحًا عليه. وهو نطاق `*.cloudfront.net` يمكنك فتحه في متصفح.
- **`Status`**: تعني `"InProgress"` أن CloudFront ينشر توزيعك إلى مواقع الحافة حول العالم. ويستغرق هذا بضع دقائق.

في لوحة التحكم، تعرض صفحة تفاصيل التوزيع تقدّم النشر. ويعرض عمود **Last modified** عبارة «Deploying» بينما تنتشر CloudFront إلى كل مواقع الحافة.

صفحة تفاصيل توزيع CloudFront وهي تعرض التوزيع بحالة Deploying فور الإنشاء.

## انتظار النشر

تحتاج توزيعات CloudFront وقتًا للنشر — عادةً من 5 إلى 15 دقيقة. ويمكنك فحص الحالة:

```bash
aws cloudfront get-distribution \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json \
  --query "Distribution.Status"
```

عندما تتغيّر الحالة من `"InProgress"` إلى `"Deployed"`، يصبح توزيعك حيًّا. ويمكنك أيضًا استخدام أمر `wait` للحجب حتى يكتمل النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

ينتهي هذا الأمر بصمت عندما يكون التوزيع منشورًا بالكامل. ولا مخرجات تعني النجاح.

في لوحة التحكم، تعرض قائمة التوزيعات التوزيع بحالة **Enabled** واسم النطاق `*.cloudfront.net` بمجرد اكتمال النشر.

![قائمة توزيعات CloudFront وهي تعرض التوزيع بحالة Enabled واسم نطاقه cloudfront.net.](/images/kinney/2f13031a971ba614.webp)

## اختبار توزيعك

بعد النشر، افتح اسم نطاق CloudFront في متصفحك:

```
https://d1234abcdef.cloudfront.net
```

ينبغي أن ترى موقعك — الملفات نفسها التي رفعتها إلى S3 في [رفع الملفات وتنظيمها](https://stevekinney.com/courses/aws/uploading-and-organizing-files)، تُقدَّم الآن عبر CloudFront بـ HTTPS. عنوان URL ليس جميلًا، لكنه يثبت أن التوزيع يعمل. وسترفق نطاقًا مخصّصًا لاحقًا.

> **هل ترى «Access Denied»؟**
>
> إذا حصلت على خطأ XML يقول «Access Denied» في المتصفح، فهذا متوقع في هذه المرحلة: CloudFront يصل إلى S3، لكن S3 لا يسمح له بالدخول بعد. والإصلاح هو الدرس التالي — ستوصل **التحكم في الوصول إلى الأصل** بحيث تحصل CloudFront على هويتها التي تثق بها سياسة الحاوية. لا تُرخِ سياسة الحاوية ولا تعِد تمكين الوصول العام لإزالة هذا. انتقل إلى [التحكم في الوصول إلى الأصل في S3](https://stevekinney.com/courses/aws/origin-access-control-for-s3)، ثم عُد وأعد التحميل.

## باستخدام SDK

```typescript
import {
  CloudFrontClient,
  CreateDistributionCommand,
  GetDistributionCommand,
  ListDistributionsCommand,
  waitUntilDistributionDeployed,
} from '@aws-sdk/client-cloudfront';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

const created = await cloudfront.send(
  new CreateDistributionCommand({
    DistributionConfig: {
      CallerReference: `my-frontend-app-${Date.now()}`,
      Comment: 'CloudFront distribution for my-frontend-app-assets',
      Enabled: true,
      DefaultRootObject: 'index.html',
      PriceClass: 'PriceClass_100',
      HttpVersion: 'http2and3',
      IsIPV6Enabled: true,
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: 'S3-my-frontend-app-assets',
            DomainName: 'my-frontend-app-assets.s3.us-east-1.amazonaws.com',
            S3OriginConfig: { OriginAccessIdentity: '' },
          },
        ],
      },
      DefaultCacheBehavior: {
        TargetOriginId: 'S3-my-frontend-app-assets',
        ViewerProtocolPolicy: 'redirect-to-https',
        CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
        Compress: true,
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET', 'HEAD'],
          CachedMethods: { Quantity: 2, Items: ['GET', 'HEAD'] },
        },
      },
      ViewerCertificate: { CloudFrontDefaultCertificate: true },
      Restrictions: { GeoRestriction: { RestrictionType: 'none', Quantity: 0 } },
    },
  }),
);

// The v3 SDK ships CloudFormation-style waiter helpers for long-running
// operations — no manual polling loop.
await waitUntilDistributionDeployed(
  { client: cloudfront, maxWaitTime: 1800 },
  { Id: created.Distribution!.Id! },
);
```

لاحظ الدالة المساعدة `waitUntilDistributionDeployed` — فهي تغلّف منطق الاستعلام الدوري نفسه الذي يستخدمه `aws cloudfront wait distribution-deployed`، لكنها تُرجع وعدًا حقيقيًا يمكنك `await`ه، ما يجعل تركيبها في سكربت نشر أسهل بكثير.

## سرد التوزيعات ووصفها

لرؤية كل توزيعاتك:

```bash
aws cloudfront list-distributions \
  --region us-east-1 \
  --output json \
  --query "DistributionList.Items[*].{Id:Id,Domain:DomainName,Status:Status,Comment:Comment}"
```

للحصول على الإعدادات الكاملة لتوزيع محدّد:

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json
```

ستستخدم `get-distribution-config` كثيرًا — فتحديث توزيع يتطلب جلب الإعدادات الحالية، وتعديلها، ثم إعادة إرسالها مع `ETag` من الاستجابة. والمزيد عن ذلك عندما تحدّث التوزيع في الدروس اللاحقة.

توزيعك يعمل، لكن أي شخص يمكنه الآن تجاوز CloudFront والوصول إلى حاوية S3 مباشرة. وهذا يبطل الغرض من امتلاك CDN — فأنت تريد أن تتدفق كل حركة المرور عبر CloudFront لتحصل على التخزين المؤقت وHTTPS وترويسات الأمان. في الدرس التالي، ستضبط **التحكم في الوصول إلى الأصل** لتقييد حاوية S3 بحيث لا يقرأ منها إلا CloudFront.
