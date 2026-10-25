---
title: "ربط API Gateway بـ Lambda"
---

لديك HTTP API بعنوان URL يُرجع 404 لكل شيء. ولديك دالة Lambda تعمل عندما تستدعيها مباشرة. الآن تربط بينهما. تتكون عملية الربط من ثلاث خطوات: إنشاء تكامل، وإنشاء مسار، ومنح إذن. وإن أغفلت أيًّا منها، فستُرجع واجهتك 404 أو 500 دون رسالة خطأ مفيدة. وقد رأيت كلًّا من هذه العقبات تعثر بها الناس مرة واحدة على الأقل.

إذا أردت أن تطّلع على نسخة AWS من آليات التكامل أثناء القراءة، فإن [دليل تكامل وكيل Lambda لواجهات HTTP](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) هو المرجع الرسمي.

## القطع الثلاث

هكذا تترابط القطع:

1. **التكامل** — يخبر API Gateway أي خلفية يستدعي (دالة Lambda لديك) وكيف يستدعيها (تكامل وكيل بصيغة الحمولة الإصدار 2.0).
2. **المسار** — يربط طريقة HTTP ومسارًا (مثل `GET /items`) بذلك التكامل.
3. **الإذن** — سياسة قائمة على المورد على دالة Lambda تسمح لـ `apigateway.amazonaws.com` باستدعائها.

```
flowchart LR
    Request["HTTP request"] --> Route["Route<br/>METHOD /path"]
    Route --> Integration["Integration<br/>AWS_PROXY"]
    Integration --> Lambda["Lambda function"]
    Permission["Lambda resource policy<br/>allow apigateway.amazonaws.com"] -. required .-> Lambda
```

لقد كتبت المعالج ونشرته بالفعل في [كتابة معالج Lambda](https://stevekinney.com/courses/aws/writing-a-lambda-handler) و[نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function). والآن تربط طبقة HTTP.

> **متى لا تحتاج إلى API Gateway**
>
> إذا كان كل ما تريده هو *نقطة نهاية* HTTPS واحدة لدالة Lambda واحدة — بلا نطاق مخصّص، ولا مسارات، ولا مصادقة، ولا مراحل — فإن **عناوين URL لدوال Lambda** (Lambda Function URLs) تفعل ذلك بأمر واحد. وهي تمنحك عنوان URL بالشكل `https://<id>.lambda-url.us-east-1.on.aws` موصولًا مباشرة بدالة، مع مصادقة IAM اختيارية، دون تكلفة إضافية تتجاوز استدعاء Lambda. وهي لا تحلّ محل API Gateway لواجهات API الحقيقية (فلا توجيه، ولا تقييد معدّل، ولا مُفوّضين، ولا خطط استخدام)، لكنها مثالية لمستقبِل webhook أو نقطة نهاية لمرة واحدة.
>
> ```bash
> aws lambda create-function-url-config \
>   --function-name my-webhook \
>   --auth-type NONE \
>   --region us-east-1
> ```
>
> ولكل ما تبقّى في هذه الدورة، ستلتزم بـ API Gateway — فأنت تريد المسارات وCORS والنطاق المخصّص.

## إنشاء التكامل

**التكامل** يربط واجهتك بخدمة خلفية. وفي هذه الدورة، تكون الخلفية دائمًا دالة Lambda، ما يجعله **تكامل وكيل Lambda** (Lambda proxy integration). وتعني كلمة «وكيل» أن API Gateway يمرّر طلب HTTP كاملًا إلى Lambda ويُرجع استجابة Lambda مباشرة إلى العميل — بلا تحويل للطلب أو الاستجابة.

```bash
aws apigatewayv2 create-integration \
  --api-id abc123def4 \
  --integration-type AWS_PROXY \
  --integration-uri arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api \
  --payload-format-version 2.0 \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة `IntegrationId`:

```json
{
  "ConnectionType": "INTERNET",
  "IntegrationId": "a1b2c3",
  "IntegrationType": "AWS_PROXY",
  "IntegrationUri": "arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api",
  "PayloadFormatVersion": "2.0",
  "TimeoutInMillis": 30000
}
```

احفظ `IntegrationId` — ستحتاجه في الخطوة التالية.

```bash
INTEGRATION_ID="a1b2c3"
```

في لوحة التحكم، تتيح لك صفحة **Integrations → Attach integrations to routes** اختيار مسار والاختيار بين إنشاء تكامل جديد أو إرفاق تكامل موجود — ثم اختر **Lambda function** من قائمة نوع التكامل المنسدلة.

![نموذج API Gateway Create an integration وهو يعرض اختيار Lambda function كنوع التكامل مع ظهور حقلي AWS Region وLambda function.](/images/kinney/87a03c09041974d4.webp)

بضعة أمور عن هذه الخيارات:

- **`--integration-type AWS_PROXY`**: هذا نوع التكامل لتكاملات وكيل Lambda. يرسل API Gateway طلب HTTP الكامل كحدث Lambda ويُرجع استجابة Lambda كاستجابة HTTP.
- **`--integration-uri`**: ARN دالة Lambda. وهو ARN نفسه الذي حصلت عليه عند نشر الدالة.
- **`--payload-format-version 2.0`**: يخبر هذا API Gateway باستخدام صيغة الحدث الإصدار 2.0 (`APIGatewayProxyEventV2`)، وهي الصيغة التي يتوقعها معالج TypeScript لديك. والإصدار 1.0 هو الصيغة الأقدم التي تستخدمها واجهات REST API. استخدم دائمًا 2.0 مع واجهات HTTP API.

> **تحذير**
>
> إذا أغفلت `--payload-format-version`، فسيلجأ API Gateway إلى `1.0` في بعض إعدادات التكامل. وهذا يعني أن دالة Lambda تتلقى `APIGatewayProxyEvent` (الإصدار 1) بدلًا من `APIGatewayProxyEventV2` (الإصدار 2). وأشكال الأحداث مختلفة — فالحقول في مواضع مختلفة، وبعض الحقول ناقصة كليًا. فإن تعذّر على معالجك فجأة العثور على `event.requestContext.http.method`، فافحص إصدار صيغة الحمولة.

## إنشاء المسارات

**المسار** يربط طريقة HTTP ومسارًا بتكامل. ويتبع مفتاح المسار الصيغة `METHOD /path`. أنشئ مسارًا لـ `GET /items`:

```bash
aws apigatewayv2 create-route \
  --api-id abc123def4 \
  --route-key "GET /items" \
  --target "integrations/a1b2c3" \
  --region us-east-1 \
  --output json
```

```json
{
  "ApiKeyRequired": false,
  "RouteId": "xyz789",
  "RouteKey": "GET /items",
  "Target": "integrations/a1b2c3"
}
```

قيمة `--target` هي `integrations/{IntegrationId}` — لاحظ البادئة `integrations/`. وهذه هي الصيغة التي يتوقعها API Gateway.

في لوحة التحكم، يعرض نموذج **Create a route** قائمة الطريقة المنسدلة (ANY وGET وPOST وغيرها) وحقل المسار جنبًا إلى جنب.

![نموذج API Gateway Create a route وهو يعرض الطريقة مضبوطة على ANY وحقل المسار مملوءًا بـ /items.](/images/kinney/d8334b11050a28a2.webp)

أنشئ مسارًا ثانيًا لـ `POST /items`:

```bash
aws apigatewayv2 create-route \
  --api-id abc123def4 \
  --route-key "POST /items" \
  --target "integrations/a1b2c3" \
  --region us-east-1 \
  --output json
```

يشير المساران إلى التكامل نفسه (دالة Lambda نفسها). وشيفرة معالجك مسؤولة عن التمييز بين GET وPOST باستخدام `event.requestContext.http.method` — وهو النمط الذي أعددته بالفعل في [كتابة معالج Lambda](https://stevekinney.com/courses/aws/writing-a-lambda-handler).

بعد إضافة المسارات، تعرض صفحة **Routes** كل المسارات المهيّأة في عرض شجري مع مسار الالتقاط الشامل `$default` الذي أنشأه معالج لوحة التحكم.

![صفحة API Gateway Routes وهي تعرض شجرة المسارات مع مسار التقاط شامل $default وتكامل Lambda المرفق.](/images/kinney/3d3db919a58ef7fb.webp)

### معاملات المسار

تدعم المسارات معاملات المسار باستخدام الأقواس المعقوفة:

```bash
aws apigatewayv2 create-route \
  --api-id abc123def4 \
  --route-key "GET /items/{id}" \
  --target "integrations/a1b2c3" \
  --region us-east-1 \
  --output json
```

في معالج Lambda لديك، تتوفر قيمة معامل المسار عند `event.pathParameters.id`.

### مسارات الالتقاط الشامل

يمكنك إنشاء مسار التقاط شامل باستخدام `$default` كمفتاح مسار:

```bash
aws apigatewayv2 create-route \
  --api-id abc123def4 \
  --route-key "$default" \
  --target "integrations/a1b2c3" \
  --region us-east-1 \
  --output json
```

يطابق مسار `$default` أي طلب لا يطابق مسارًا أكثر تحديدًا. وهذا مفيد عندما تريد دالة Lambda واحدة تتولى كل التوجيه داخليًا — على غرار طريقة عمل مسار الالتقاط الشامل في API الخاص بـ Next.js.

## منح الإذن

هذه هي الخطوة التي توقع الجميع. فيمكن لـ API Gateway التوجيه إلى دالة Lambda، لكن دالة Lambda لم تأذن لـ API Gateway باستدعائها. ومن دون هذا الإذن، يُرجع كل طلب خطأ 500.

الإذن هو **سياسة قائمة على المورد** على دالة Lambda — المفهوم نفسه الذي تعلمته في [سياسات الحاويات والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access)، لكنه مطبّق على دالة Lambda بدلًا من حاوية S3. وهو يخبر Lambda: «يُسمح لـ API Gateway هذا باستدعائك».

```bash
aws lambda add-permission \
  --function-name my-frontend-app-api \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:123456789012:abc123def4/*" \
  --region us-east-1 \
  --output json
```

```json
{
  "Statement": "{\"Sid\":\"apigateway-invoke\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-east-1:123456789012:abc123def4/*\"}}}"
}
```

لنفكّك `--source-arn`:

- `arn:aws:execute-api` — مساحة أسماء الخدمة لـ API Gateway
- `us-east-1` — المنطقة
- `123456789012` — معرّف حسابك
- `abc123def4` — معرّف API
- `/*` — يسمح لأي مرحلة وطريقة ومسار باستدعاء الدالة

محرف البدل `/*` مناسب هنا لأن دالة Lambda لديك تتولى التوجيه داخليًا. وإذا أردت تقييد الاستدعاء بمسارات محدّدة، فيمكنك استخدام نمط أكثر تحديدًا مثل `/*/GET/items`.

> **نصيحة**
>
> `--statement-id` مجرّد تسمية تعرّف بيان الإذن هذا. ويجب أن تكون فريدة داخل سياسة موارد الدالة. فإذا حاولت إضافة إذن بمعرّف بيان موجود بالفعل، فسيفشل الأمر. استخدم اسمًا وصفيًا مثل `apigateway-invoke` أو `apigateway-access`.

## اختبار الاتصال

بوجود القطع الثلاث كلها، تصبح واجهتك حيّة. ولأن المرحلة `$default` مفعّلة فيها النشر التلقائي، فمساراتك متاحة فورًا. اختبر باستخدام `curl`:

```bash
curl https://abc123def4.execute-api.us-east-1.amazonaws.com/items
```

إذا كان كل شيء موصولًا بشكل صحيح، فستستعيد استجابة JSON من دالة Lambda.

وإذا حصلت على خطأ 500 مع `{"message":"Internal Server Error"}`، فالسبب الأرجح هو إذن Lambda الناقص (الخطوة 3). افحص سياسة موارد الدالة:

```bash
aws lambda get-policy \
  --function-name my-frontend-app-api \
  --region us-east-1 \
  --output json
```

فإذا أرجع هذا «No policy is associated with the given resource»، فأنت بحاجة إلى تشغيل `aws lambda add-permission` مرة أخرى.

## سرد المسارات والتكاملات

لرؤية كل المسارات على واجهتك:

```bash
aws apigatewayv2 get-routes \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

لرؤية كل التكاملات:

```bash
aws apigatewayv2 get-integrations \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

## باستخدام SDK

```typescript
import {
  ApiGatewayV2Client,
  CreateIntegrationCommand,
  CreateRouteCommand,
} from '@aws-sdk/client-apigatewayv2';
import { LambdaClient, AddPermissionCommand } from '@aws-sdk/client-lambda';

const apigw = new ApiGatewayV2Client({ region: 'us-east-1' });
const lambda = new LambdaClient({ region: 'us-east-1' });

const integration = await apigw.send(
  new CreateIntegrationCommand({
    ApiId: 'abc123def4',
    IntegrationType: 'AWS_PROXY',
    IntegrationUri: 'arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api',
    PayloadFormatVersion: '2.0',
  }),
);

for (const routeKey of ['GET /items', 'POST /items', 'GET /items/{id}'] as const) {
  await apigw.send(
    new CreateRouteCommand({
      ApiId: 'abc123def4',
      RouteKey: routeKey,
      Target: `integrations/${integration.IntegrationId}`,
    }),
  );
}

// Grant API Gateway permission to invoke the Lambda. This is a _resource
// policy_ on the Lambda, not an IAM policy — it lives on the Lambda itself.
await lambda.send(
  new AddPermissionCommand({
    FunctionName: 'my-frontend-app-api',
    StatementId: 'apigateway-invoke',
    Action: 'lambda:InvokeFunction',
    Principal: 'apigateway.amazonaws.com',
    SourceArn: 'arn:aws:execute-api:us-east-1:123456789012:abc123def4/*/*',
  }),
);
```

## أخطاء شائعة

**نسيان البادئة `integrations/` في `--target`.** يجب أن يكون الهدف `integrations/{IntegrationId}`، لا معرّف التكامل وحده. فمن دون البادئة، يُنشأ المسار لكن بلا هدف، وتطابق الطلبات المسار لكنها تُرجع 500.

**استخدام صيغة الحمولة الإصدار 1.0 مع أنواع المعالج الإصدار 2.** إذا كان معالجك يستخدم `APIGatewayProxyHandlerV2` بينما يستخدم التكامل صيغة الحمولة 1.0، فلن يطابق هيكل الحدث تعريفات نوعك. وستكون حقول مثل `event.requestContext.http` غير معرّفة.

**عدم تطابق معرّفات API.** عندما تعمل مع واجهات API متعددة أثناء التطوير، تحقق مرتين من أنك تنشئ المسارات والتكاملات على API الصحيح. ويجب أن يتطابق `--api-id` في كل الأوامر.

مسارات واجهتك حيّة، لكن ثمة فجوة بين ما تراه في `curl` وما يحدث في معالج Lambda. فكيف يتحول طلب HTTP إلى حدث Lambda؟ وكيف تتحول قيمة إرجاع معالجك إلى استجابة HTTP؟ يغطّي الدرس التالي ربط الطلب والاستجابة بالتفصيل — الشكل الدقيق لكائن الحدث الذي يتلقاه معالجك وصيغة الاستجابة التي يتوقعها API Gateway.
