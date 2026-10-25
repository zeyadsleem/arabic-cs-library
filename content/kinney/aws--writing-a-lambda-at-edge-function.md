---
title: "كتابة دالة Lambda@Edge"
lang: ar
source: "https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function"
---

تمثّل Lambda@Edge دالة Lambda كاملة تعمل في ذاكرات الحافة الإقليمية في CloudFront بدلًا من منطقة واحدة. فإن كانت CloudFront Functions أشبه بـ Vercel Edge Functions — صغيرة وسريعة ومقيّدة — فإن Lambda@Edge أشبه بـ Vercel Serverless Function نقلتها AWS أقرب إلى مستخدميك. فتحصل على وقت تشغيل Node.js كامل، وحزم npm، ووصول إلى الشبكة، وحتى 30 ثانية من وقت التنفيذ في أحداث الأصل.

وإن أردت نسخة AWS من نموذج وقت التشغيل والنسخ المتماثل أثناء القراءة، فإن [دليل Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html) هو المرجع الرسمي.

لقد كتبت دالة Lambda ونشرتها بالفعل في [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function). ويتبع Lambda@Edge النمط العام نفسه، لكن مع حفنة من القيود الإضافية التي توقع الناس في الأخطاء. ويمرّ هذا الدرس عليها كلها. وبصراحة، معظم المزالق ليست صعبة بمجرد أن تعرف بوجودها — المشكلة هي المرة الأولى التي لا تعرف فيها.

## شرط us-east-1

يجب إنشاء دوال Lambda@Edge في `us-east-1`. وهذا هو الشرط نفسه الذي صادفته مع شهادات ACM في [تجديد الشهادات وشرط us-east-1](https://stevekinney.com/courses/aws/certificate-renewal-and-us-east-1) — فـ CloudFront خدمة عالمية، ومستوى التحكّم فيها يعيش في `us-east-1`. وعندما تربط دالة Lambda بتوزيع CloudFront، تنسخ AWS كود دالتك إلى ذاكرات الحافة الإقليمية حول العالم. لكن مصدر الحقيقة لذلك النسخ هو `us-east-1` دائمًا.

وإن حاولت ربط دالة Lambda من أي منطقة أخرى بسلوك CloudFront، فسترفضها الواجهة البرمجية.

## توقيع المعالج

تستخدم معالجات Lambda@Edge النوعين `CloudFrontRequestHandler` أو `CloudFrontResponseHandler` من `@types/aws-lambda`. وبنية الحدث مختلفة عمّا استخدمته مع API Gateway.

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;

  // Modify the request
  request.uri = request.uri.replace(/^\/api\//, '/v2/api/');

  return request;
};
```

*ملاحظة:* يعيش الطلب في `event.Records[0].cf.request` — لا في `event.request` كما في CloudFront Functions.

يلفّ كائن الحدث بيانات CloudFront داخل `event.Records[0].cf`. ووجود هذه البنية سببه أن Lambda@Edge يستخدم آلية تسليم الأحداث نفسها التي تستخدمها محفّزات Lambda الأخرى — مصفوفة `Records` — رغم أنه يوجد دائمًا سجل واحد بالضبط.

### شكل كائن الحدث

بالنسبة إلى حدث **طلب الأصل** (origin request)، يبدو كائن الحدث هكذا:

```typescript
{
  Records: [
    {
      cf: {
        config: {
          distributionDomainName: 'd111111abcdef8.cloudfront.net',
          distributionId: 'E1A2B3C4D5E6F7',
          eventType: 'origin-request',
          requestId: 'abcdef123456',
        },
        request: {
          clientIp: '203.0.113.1',
          method: 'GET',
          uri: '/about',
          querystring: 'page=1',
          headers: {
            host: [{ key: 'Host', value: 'example.com' }],
            'user-agent': [{ key: 'User-Agent', value: 'Mozilla/5.0...' }],
          },
          origin: {
            s3: {
              domainName: 'my-frontend-app-assets.s3.amazonaws.com',
              path: '',
              region: 'us-east-1',
              authMethod: 'none',
            },
          },
        },
      },
    },
  ];
}
```

لاحظ الفروق عن CloudFront Functions:

- **الترويسات** مصفوفات من كائنات لها خاصيتا `key` و`value`، لا كائنات مفردة. والسبب أن ترويسات HTTP يمكن أن تحمل قيمًا متعددة.
- **سلسلة الاستعلام** سلسلة نصية عادية، لا كائنًا محلَّلًا.
- **الخاصية `origin`** موجودة في أحداث طلب الأصل وتخبرك إلى أين ستوجّه CloudFront الطلب. ويمكنك تعديلها لتغيير الأصل ديناميكيًا.

> **لماذا `authMethod: 'none'`**
>
> الحقل `authMethod` يتتبّع OAI (هوية الوصول إلى الأصل) فقط. و[توثّق AWS ذلك صراحةً](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html): فالحقل «لا يدعم التحكم في الوصول إلى الأصل (OAC)». وإذا كان توزيعك يستخدم OAC — وهو النمط الحديث الذي تعلّمه هذه الدورة — فمصادقة OAC تحدث في طبقة التوزيع وتكون غير مرئية لحدث Lambda@Edge. اضبط `authMethod: 'none'`. وإن كنت على نمط OAI القديم، فاستخدم `'origin-access-identity'` بدلًا من ذلك.

### إرجاع طلب مقابل استجابة

تمامًا كما في CloudFront Functions، إرجاع كائن `request` يخبر CloudFront بمواصلة المعالجة. أما إرجاع كائن **استجابة** فيقصر مسار طلب الأصل ويرسل استجابة مباشرة:

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;

  if (request.uri === '/health') {
    return {
      status: '200',
      statusDescription: 'OK',
      headers: {
        'content-type': [{ key: 'Content-Type', value: 'application/json' }],
      },
      body: JSON.stringify({ status: 'healthy' }),
    };
  }

  return request;
};
```

> **تحذير**
>
> في كائنات استجابة Lambda@Edge، يكون `status` **سلسلة نصية**، لا رقمًا. فكتابة `status: 200` بدلًا من `status: '200'` تسبّب خطأ وقت التشغيل. وهذا يوقع القادمين من معالجات Lambda العادية حيث يكون `statusCode` رقمًا.

## كتابة الدالة ونشرها

### كتابة المعالج

أنشئ دالة Lambda@Edge تضيف ترويسة مخصّصة إلى طلبات الأصل. وهذا مفيد لتمرير معلومات إلى أصلك لم يرسلها المشاهد.

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;

  request.headers['x-forwarded-by-edge'] = [
    {
      key: 'X-Forwarded-By-Edge',
      value: 'true',
    },
  ];

  return request;
};
```

ابنِ هذه الحزمة وحزّمها بالطريقة نفسها التي فعلتها في [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function): ترجِم بـ TypeScript، ثم اضغط الناتج في ملف zip.

### إنشاء دور التنفيذ

يتطلّب Lambda@Edge سياسة ثقة تسمح **لكلٍّ من** `lambda.amazonaws.com` و`edgelambda.amazonaws.com` بتبنّي الدور. وهذا مختلف عن دالة Lambda العادية التي تحتاج `lambda.amazonaws.com` فقط. وهو أمر يسهل تفويته.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name my-frontend-app-edge-role \
  --assume-role-policy-document file://edge-trust-policy.json \
  --region us-east-1 \
  --output json
```

أرفق سياسة دور التنفيذ الأساسي حتى تتمكّن الدالة من كتابة السجلات:

```bash
aws iam attach-role-policy \
  --role-name my-frontend-app-edge-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --region us-east-1 \
  --output json
```

### النشر إلى us-east-1

```bash
aws lambda create-function \
  --function-name my-frontend-app-edge-rewrite \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-edge-role \
  --handler handler.handler \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

### نشر نسخة مرقّمة

هذه هي الخطوة الحاسمة التي تختلف عن Lambda العادي. فـ Lambda@Edge **يتطلّب** نسخة منشورة ومرقّمة. ولا يمكنك استخدام `$LATEST`.

```bash
aws lambda publish-version \
  --function-name my-frontend-app-edge-rewrite \
  --description "Initial deployment" \
  --region us-east-1 \
  --output json
```

تتضمّن الاستجابة حقل `Version` (مثل `"1"`) وARN مُرقَّمًا:

```
arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-edge-rewrite:1
```

ذلك الـ ARN المُرَقَّم — مع `:1` في نهايته — هو ما تستخدمه عند ربط الدالة بـ CloudFront.

### الربط بسلوك CloudFront

استرجع إعدادات توزيعك، وأضف كتلة `LambdaFunctionAssociations` إلى السلوك، ثم حدّث:

```json
{
  "LambdaFunctionAssociations": {
    "Quantity": 1,
    "Items": [
      {
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-edge-rewrite:1",
        "EventType": "origin-request",
        "IncludeBody": false
      }
    ]
  }
}
```

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match ETAG_FROM_GET \
  --distribution-config file://dist-config.json \
  --region us-east-1 \
  --output json
```

بعد أن ينتهي نشر التوزيع (ويستغرق هذا بضع دقائق)، ستعمل دالة Lambda@Edge لديك في كل طلب أصل.

## نموذج النسخ المتماثل

عندما تربط دالة Lambda@Edge بتوزيع CloudFront، تنسخ AWS دالتك إلى ذاكرات الحافة الإقليمية في العالم. ولهذا ثلاثة آثار:

1. **النشر ليس فوريًا.** فبخلاف CloudFront Functions (التي تنتشر في ثوانٍ)، تستغرق نسخ Lambda@Edge عدة دقائق لتُنشر عالميًا.
2. **لا يمكنك حذف الدالة ما دامت النسخ موجودة.** فإذا أزلت ربط Lambda@Edge من توزيعك، فلا تحذف AWS النسخ فورًا. وقد تحتاج إلى الانتظار ساعات (وأحيانًا حتى يوم) قبل أن تتمكّن من حذف دالة Lambda نفسها. وستُرجع الواجهة البرمجية خطأ `ReplicatedFunctionStillCreating` أو `ResourceConflictException` حتى يكتمل تنظيف النسخ.
3. **كل تحديث يتطلّب نسخة جديدة.** فلا يمكنك تحديث نسخة في مكانها. بل تنشر نسخة جديدة (`:2`، `:3`، إلخ)، وتحدّث سلوك CloudFront ليشير إلى ARN النسخة الجديدة، وتنتظر النسخ المتماثل.

> **نصيحة**
>
> يتبع تحديث دالة Lambda@Edge هذه الدورة: حدّث كود الدالة، وانشر نسخة جديدة، وحدّث سلوك CloudFront ليشير إلى ARN النسخة الجديدة، وانتظر نشر التوزيع. إنها خطوات أكثر من CloudFront Functions، لكنك تحصل في المقابل على وقت تشغيل Node.js كامل.

## قيود يجب تذكّرها

- **لا متغيّرات بيئة يحدّدها المستخدم.** فـ Lambda@Edge لا يدعم متغيّرات البيئة التي يحدّدها المستخدم إطلاقًا، سواء عملت الدالة في أحداث المشاهد أو أحداث الأصل.
- **حدّ الذاكرة 128 ميغابايت لأحداث المشاهد.** فإن كانت دالتك التي تُطلقها أحداث المشاهد تحتاج ذاكرة أكثر، فعليك إعادة النظر في نهجك — إمّا نقل المنطق إلى محفّز أصل (حتى 10,240 ميغابايت) أو تبسيطه.
- **مهلة 5 ثوانٍ لأحداث المشاهد و30 ثانية لأحداث الأصل.** فدالة طلب مشاهد تستغرق 5 ثوانٍ ستجعل موقعك يبدو معطوبًا. أبقِ الدوال التي تُطلقها أحداث المشاهد سريعة — فإن كانت بطيئة بما يكفي ليلاحظها المستخدم، فهي بطيئة جدًا.
- **حجم حزمة 1 ميغابايت لأحداث المشاهد.** وهذا هو حجم ملف zip المضغوط. فإن حزمت مكتبات كبيرة، فقد تتجاوز ذلك. استخدم tree-shaking وأبقِ الاعتماديات في حدها الأدنى.

تُغطّى هذه القيود بالتفصيل في [تصحيح دوال الحافة وقيودها](https://stevekinney.com/courses/aws/edge-function-debugging-and-limitations). وأهم ما يجب تذكّره هنا هو الأقل بداهةً: Lambda@Edge لا يدعم متغيّرات البيئة التي يحدّدها المستخدم إطلاقًا، عدا المتغيّرات المحجوزة التي تحقنها AWS تلقائيًا.

## التنظيف

يستغرق تنظيف نسخ Lambda@Edge ساعات بعد فك الربط. فاتبع هذا التتابع بعناية.

أزل ربط Lambda@Edge من إعدادات سلوك توزيعك وانتظر حتى يصل التوزيع إلى حالة `Deployed`. ثم حاول حذف الدالة:

```bash
aws lambda delete-function \
  --function-name my-frontend-app-edge-rewrite \
  --region us-east-1
```

إذا أرجع هذا `ResourceConflictException`، فنسخ الحافة لم تنتهِ من التنظيف بعد. انتظر من 30 إلى 60 دقيقة وحاول مجددًا. وبعد حذف الدالة، نظّف أيضًا مجموعات سجلات CloudWatch في كل منطقة نُفّذت فيها الدالة — فـ Lambda@Edge ينشئ مجموعة سجلات لكل منطقة، لا في `us-east-1` فقط:

```bash
# List all Lambda@Edge log groups (they follow the pattern /aws/lambda/us-east-1.<function-name>)
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/ \
  --region us-east-1 \
  --query 'logGroups[*].logGroupName' \
  --output text
```

احذف كل مجموعة سجلات في كل منطقة وجدت فيها واحدة.
