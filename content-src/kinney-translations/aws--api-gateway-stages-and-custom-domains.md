---
title: "المراحل والنشر والنطاقات المخصّصة"
---

حتى الآن، لدى HTTP API الخاصة بك مرحلة واحدة (`$default`) وعنوان URL واحد (نقطة النهاية `execute-api` المولّدة تلقائيًا). هذا يكفي للتطوير، لكن الإنتاج يحتاج إلى المزيد: اسم نطاق مخصّص يطابق واجهتك الأمامية، وبيئات منفصلة للتطوير والإنتاج، وعنوان URL لا يتغيّر عند إعادة إنشاء API. يغطي هذا الدرس الثلاثة جميعًا.

إذا أردت النسخة الرسمية من AWS لسلوك النطاقات المخصّصة أثناء قراءتك، فإن [دليل النطاقات المخصّصة في HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-custom-domain-names.html) هو المرجع المعتمد.

## المراحل: بيئات لواجهة API

**المرحلة** هدف نشر مسمّى لواجهة API الخاصة بك. فكّر فيها مثل فروع البيئات — `dev` و`staging` و`prod` — لكل منها عنوان URL خاص وربما تهيئة خاصة. مرحلة `$default` التي كنت تستخدمها هي الأبسط: النشر التلقائي مفعّل، والتغييرات تسري فورًا، ولا توجد بادئة مرحلة في عنوان URL.

### مرحلة `$default`

تُنشأ مرحلة `$default` تلقائيًا عند إنشاء HTTP API. ولها خاصيتان مميّزتان:

1. **النشر التلقائي** — كل تغيير في المسارات أو التكاملات أو التهيئة يُنشر فورًا.
2. **لا بادئة مرحلة** — عنوان URL هو `https://{api-id}.execute-api.{region}.amazonaws.com/items`، وليس `https://{api-id}.execute-api.{region}.amazonaws.com/prod/items`.

بالنسبة إلى كثير من التطبيقات، مرحلة `$default` هي كل ما تحتاجه. إذا كنت تبني واجهة API واحدة لواجهة أمامية واحدة، فلا سبب لإنشاء مراحل إضافية. استخدم متغيرات البيئة في دالة Lambda للتعامل مع السلوك الخاص بكل بيئة (مثل التوجيه إلى قواعد بيانات مختلفة).

### إنشاء مراحل مسمّاة

إذا أردت بيئات منفصلة ومعزولة — مرحلة `dev` تختبر فيها التغييرات ومرحلة `prod` يعمل فيها الشيفرة المستقرّة — يمكنك إنشاء مراحل مسمّاة:

```bash
aws apigatewayv2 create-stage \
  --api-id abc123def4 \
  --stage-name prod \
  --region us-east-1 \
  --output json
```

```json
{
  "AutoDeploy": false,
  "CreatedDate": "2026-03-18T12:00:00+00:00",
  "DefaultRouteSettings": {
    "DetailedMetricsEnabled": false
  },
  "StageName": "prod"
}
```

في وحدة التحكم، يعرض قسم **Stages** في التنقّل الأيسر جميع مراحل واجهة API. والنقر على مرحلة يكشف عنوان URL الخاص باستدعائها وإعدادات النشر.

تعرض صفحة Stages في API Gateway مرحلة $default مدرجة مع خيارات لتحديدها وعرض تفاصيلها بما في ذلك عنوان URL للاستدعاء.

لا تنشر المراحل المسمّاة تلقائيًا. تحتاج إلى إنشاء **عملية نشر** وربطها بالمرحلة:

```bash
aws apigatewayv2 create-deployment \
  --api-id abc123def4 \
  --stage-name prod \
  --region us-east-1 \
  --output json
```

تتضمّن المراحل المسمّاة اسم المرحلة في عنوان URL: `https://abc123def4.execute-api.us-east-1.amazonaws.com/prod/items`. تُزال هذه البادئة قبل أن يصل الطلب إلى معالج Lambda — فلا يزال `event.requestContext.http.path` يعرض `/items`، وليس `/prod/items`.

يمكنك تفعيل النشر التلقائي على مرحلة مسمّاة إذا أردت السلوك نفسه الذي توفّره مرحلة `$default`:

```bash
aws apigatewayv2 update-stage \
  --api-id abc123def4 \
  --stage-name prod \
  --auto-deploy \
  --region us-east-1 \
  --output json
```

### متغيرات المرحلة

يمكن أن تحتوي المراحل على متغيرات — أزواج مفتاح-قيمة تصل إليها من معالج Lambda عبر كائن الحدث:

```bash
aws apigatewayv2 update-stage \
  --api-id abc123def4 \
  --stage-name prod \
  --stage-variables '{"TABLE_NAME":"my-frontend-app-data","LOG_LEVEL":"warn"}' \
  --region us-east-1 \
  --output json
```

في معالجك، يمكن الوصول إلى متغيرات المرحلة عبر `event.stageVariables`:

```typescript
const tableName = event.stageVariables?.TABLE_NAME ?? 'my-frontend-app-data-dev';
```

> **نصيحة**
>
> تكون متغيرات المرحلة مفيدة لتوجيه المراحل المختلفة إلى موارد خلفية مختلفة — جدول DynamoDB في `dev` مقابل جدول DynamoDB في `prod`، على سبيل المثال. لكن للتهيئة الحسّاسة، استخدم متغيرات بيئة Lambda أو Secrets Manager بدلًا منها. متغيرات المرحلة مرئية في تهيئة API Gateway وغير مشفّرة.

## أسماء النطاقات المخصّصة

عنوان URL المولّد تلقائيًا (`https://abc123def4.execute-api.us-east-1.amazonaws.com`) يعمل، لكنه ليس شيئًا تريده في الإنتاج. يجب أن تستدعي واجهتك الأمامية `https://api.example.com`، بدلًا من اسم مضيف غامض تولّده AWS. تمنحك أسماء النطاقات المخصّصة عنوان URL ثابتًا بهوية علامتك يستمر حتى إذا أعدت إنشاء API.

### المتطلبات المسبقة

قبل إنشاء اسم نطاق مخصّص، تحتاج إلى:

1. **نطاق تتحكّم به** — يُدار عبر Route 53 أو أي مزوّد DNS.
2. **شهادة ACM** تغطي النطاق — تُنشأ في المنطقة نفسها التي توجد فيها واجهة API (بالنسبة إلى HTTP APIs، هذه هي المنطقة التي تعيش فيها API، على خلاف CloudFront الذي يتطلّب `us-east-1`). تُهيّأ شهادات ACM في [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate).

### إنشاء النطاق المخصّص

```bash
aws apigatewayv2 create-domain-name \
  --domain-name api.example.com \
  --domain-name-configurations \
    CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234-efgh-5678 \
  --region us-east-1 \
  --output json
```

```json
{
  "DomainName": "api.example.com",
  "DomainNameConfigurations": [
    {
      "ApiGatewayDomainName": "d-abc123.execute-api.us-east-1.amazonaws.com",
      "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234-efgh-5678",
      "DomainNameStatus": "AVAILABLE",
      "EndpointType": "REGIONAL",
      "SecurityPolicy": "TLS_1_2"
    }
  ]
}
```

تتضمّن الاستجابة `ApiGatewayDomainName` — وهذا هو الهدف الذي تحتاجه لسجل DNS لديك.

### إنشاء تعيين API

يربط **تعيين API** نطاقك المخصّص بواجهة API ومرحلة محدّدتين. وهذا يخبر API Gateway: «عندما يصل طلب إلى `api.example.com`، وجّهه إلى واجهة API هذه على هذه المرحلة.»

```bash
aws apigatewayv2 create-api-mapping \
  --domain-name api.example.com \
  --api-id abc123def4 \
  --stage '$default' \
  --region us-east-1 \
  --output json
```

```json
{
  "ApiId": "abc123def4",
  "ApiMappingId": "mapping123",
  "Stage": "$default"
}
```

يمكنك أيضًا استخدام المعامل `--api-mapping-key` لتعيين بادئة مسار. على سبيل المثال، التعيين باستخدام `--api-mapping-key v1` يجعل واجهة API متاحة على `api.example.com/v1/items` بدلًا من `api.example.com/items`. وهذا مفيد لإدارة إصدارات API.

### إنشاء سجل DNS

وجّه نطاقك المخصّص إلى اسم نطاق API Gateway. إذا كنت تستخدم Route 53، فأنشئ سجل A بهدف alias:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch '{
    "Changes": [
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "api.example.com",
          "Type": "A",
          "AliasTarget": {
            "DNSName": "d-abc123.execute-api.us-east-1.amazonaws.com",
            "HostedZoneId": "Z1UJRXOUMOOFQ8",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }' \
  --region us-east-1 \
  --output json
```

`DNSName` هو `ApiGatewayDomainName` من استجابة `create-domain-name`. أما `HostedZoneId` فهو المنطقة المستضافة لخدمة API Gateway في منطقتك — وهذه قيمة ثابتة لكل منطقة، وليست المنطقة المستضافة لنطاقك. بالنسبة إلى نقاط نهاية API Gateway الإقليمية في `us-east-1`، فإن معرّف المنطقة المستضافة في Route 53 هو `Z1UJRXOUMOOFQ8`.

> **تحذير**
>
> يستغرق انتشار DNS وقتًا. بعد إنشاء السجل، قد لا يُحلّ نطاقك المخصّص فورًا. أمهله بضع دقائق واختبر باستخدام `dig api.example.com` للتحقّق من وجود السجل قبل استكشاف الأخطاء.

إذا كنت تستخدم مزوّد DNS خارجيًا (ليس Route 53)، فأنشئ سجل CNAME يوجّه `api.example.com` إلى قيمة `ApiGatewayDomainName`. تذكّر الفرق بين سجلات alias وسجلات CNAME من [سجلات Alias مقابل سجلات CNAME](https://stevekinney.com/courses/aws/alias-records-vs-cname-records) — يُفضَّل سجل alias عند استخدام Route 53 لأنه يدعم قمة المنطقة ولا يفرض كلفة إضافية لاستعلام DNS.

## تحديث CORS لنطاقك المخصّص

بعد إعداد نطاق مخصّص، حدّث تهيئة CORS لتشمل الأصل الجديد الذي ستستخدمه واجهتك الأمامية. إذا كانت واجهتك الأمامية تستدعي `api.example.com` وموقعك يعمل على `example.com`:

```bash
aws apigatewayv2 update-api \
  --api-id abc123def4 \
  --cors-configuration '{"AllowOrigins":["https://example.com","http://localhost:3000"],"AllowMethods":["GET","POST","PUT","DELETE"],"AllowHeaders":["Content-Type","Authorization"],"MaxAge":86400}' \
  --region us-east-1 \
  --output json
```

## تحديد المعدّل

تعرض كل مرحلة في API Gateway عناصر تحكّم في تحديد المعدّل تحمي دوال Lambda من الاستغلال العابر. تهمّك قيمتان: **حدّ الاندفاع** (حجم دلو الرموز، الذي يحدّ الارتفاعات القصيرة) و**حدّ المعدّل** (معدّل إعادة التعبئة في الحالة المستقرّة، بالطلبات في الثانية). إن [القيم الافتراضية على مستوى الحساب](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html) — حدّ اندفاع **5,000** و**10,000** طلب في الثانية في الحالة المستقرّة، مشتركة بين *جميع* واجهات API في الحساب — سخية بما يكفي لإفلاس مشروع شخصي إذا ساء شيء. اضبط حدودًا صريحة ومتحفّظة على مرحلتك:

```bash
aws apigatewayv2 update-stage \
  --api-id "$API_ID" \
  --stage-name '$default' \
  --default-route-settings '{"ThrottlingBurstLimit":100,"ThrottlingRateLimit":50}' \
  --region us-east-1 \
  --output json
```

يقصّر هذا المرحلة على 50 طلبًا في الثانية بشكل مستمر، مع مجال لاستيعاب اندفاعات قصيرة تصل إلى 100 طلب قبل أن يبدأ تحديد المعدّل. (الاندفاع ليس هو «التنفيذات المتزامنة» — فذلك مفهوم في Lambda يُتحكّم به بشكل منفصل. الاندفاع هو حجم دلو الرموز الذي يسمح للحركة بتجاوز معدّل الحالة المستقرّة لفترة قصيرة.) تتلقّى الطلبات المحدّدة استجابة `429 Too Many Requests`. بالنسبة إلى واجهة API شخصية لواجهة أمامية، تترك هذه الأرقام هامشًا واسعًا للحركة الحقيقية مع منع العملاء الجامحين من توليد تكاليف استدعاء Lambda غير متوقّعة.

## باستخدام SDK

```typescript
import {
  ApiGatewayV2Client,
  CreateStageCommand,
  CreateDeploymentCommand,
  UpdateStageCommand,
  CreateDomainNameCommand,
  CreateApiMappingCommand,
} from '@aws-sdk/client-apigatewayv2';

const apigw = new ApiGatewayV2Client({ region: 'us-east-1' });

// Create a stage (called 'prod'), then deploy and point the stage at it.
const stage = await apigw.send(
  new CreateStageCommand({
    ApiId: 'abc123def4',
    StageName: 'prod',
    AutoDeploy: true,
    ThrottleSettings: { RateLimit: 50, BurstLimit: 100 },
  }),
);

// If AutoDeploy is off, you make a deployment + point the stage at it.
const deployment = await apigw.send(new CreateDeploymentCommand({ ApiId: 'abc123def4' }));
await apigw.send(
  new UpdateStageCommand({
    ApiId: 'abc123def4',
    StageName: 'prod',
    DeploymentId: deployment.DeploymentId,
  }),
);

// Custom domain + mapping:
await apigw.send(
  new CreateDomainNameCommand({
    DomainName: 'api.example.com',
    DomainNameConfigurations: [
      {
        CertificateArn: 'arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6',
        EndpointType: 'REGIONAL',
      },
    ],
  }),
);
await apigw.send(
  new CreateApiMappingCommand({
    DomainName: 'api.example.com',
    ApiId: 'abc123def4',
    Stage: 'prod',
  }),
);
```

## أخطاء شائعة

**استخدام منطقة الشهادة الخاطئة.** بالنسبة إلى HTTP APIs، يجب أن تكون شهادة ACM في المنطقة نفسها التي توجد فيها API. وهذا يختلف عن CloudFront، الذي يتطلّب شهادات في `us-east-1` بصرف النظر عن مكان تشغيل التوزيع.

**نسيان تعيين API.** إنشاء اسم نطاق مخصّص ليس كافيًا — تحتاج أيضًا إلى تعيين API لربط النطاق بواجهة API ومرحلة محدّدتين. وبدون التعيين، تعيد الطلبات إلى النطاق المخصّص 403.

**الخلط في بادئة المرحلة.** تضيف المراحل المسمّاة بادئة إلى عنوان URL الخاص بـ `execute-api`، لكن النطاقات المخصّصة مع تعيينات API لا تفعل ذلك. إذا كانت مرحلتك `prod` وكان نطاقك المخصّص يعيّن إليها، فإن الطلبات إلى `api.example.com/items` تُوجَّه بشكل صحيح — ولا تحتاج إلى `api.example.com/prod/items`.

واجهة API لديك منشورة وقابلة للتوجيه ولها اسم نطاق مناسب. لكنها مفتوحة على مصراعيها — فأي شخص يملك عنوان URL يمكنه استدعاء أي نقطة نهاية. يغطي الدرس التالي إضافة المصادقة إلى مسارات API لديك، بحيث لا يستطيع الوصول إلى نقاط النهاية الخاصة بك إلا المستخدمون المخوّلون.
