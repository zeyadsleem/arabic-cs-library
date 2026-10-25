---
title: "إنشاء HTTP API"
lang: ar
source: "https://stevekinney.com/courses/aws/creating-an-http-api"
---

اخترت HTTP APIs. الآن تحتاج إلى إنشاء واحدة. على Vercel، توجد نقطة نهاية API بمجرد إنشاء ملف في دليل `api/`. وعلى AWS، تُنشئ واجهة API صراحةً — مورد مسمّى بعنوان URL خاص وإعدادات خاصة ودورة حياة خاصة. والميزة أنك تتحكم في كل شيء. والعيب أنك *مضطر* إلى إنشاء كل شيء.

إذا أردت نسخة AWS الدقيقة من إعداد HTTP API أثناء القراءة، فأبقِ [وثائق HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) و[مرجع أمر `aws apigatewayv2 create-api`](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-api.html) مفتوحين.

الخبر السار: إنشاء HTTP API من CLI يتطلب أمرًا واحدًا.

## إنشاء API

استخدم `aws apigatewayv2 create-api` لإنشاء HTTP API جديدة:

```bash
aws apigatewayv2 create-api \
  --name my-frontend-app-api \
  --protocol-type HTTP \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة الحقول التي ستحتاجها لكل ما يلي:

```json
{
  "ApiEndpoint": "https://abc123def4.execute-api.us-east-1.amazonaws.com",
  "ApiId": "abc123def4",
  "CreatedDate": "2026-03-18T12:00:00+00:00",
  "Name": "my-frontend-app-api",
  "ProtocolType": "HTTP",
  "RouteSelectionExpression": "${request.method} ${request.path}"
}
```

أمران يستحقان الملاحظة هنا:

- **`ApiId`**: هذا هو المعرّف الذي ستستخدمه في كل أمر لاحق. احفظه. فكل مسار وتكامل ومرحلة وإعداد نطاق يشير إلى هذا المعرّف.
- **`ApiEndpoint`**: هذا هو عنوان URL المولّد تلقائيًا الذي ستكون واجهتك متاحة عليه.

في لوحة التحكم، تعرض صفحة **Create API** الاختيار بين HTTP API وWebSocket API وREST API منذ البداية — وHTTP API هو الخيار الصحيح لنقطة نهاية REST مدعومة بـ Lambda.

صفحة API Gateway Create API وهي تعرض خيارات HTTP API وWebSocket API وREST API مع أزرار Build. وهي تتبع النمط `https://{api-id}.execute-api.{region}.amazonaws.com`. وستستبدل هذا بنطاق مخصّص لاحقًا، لكنه يعمل فورًا للاختبار.

> **نصيحة**
>
> احفظ `ApiId` في متغيّر صدفة كي تشير إليه في الأوامر اللاحقة دون نسخ ولصق:
>
> ```bash
> API_ID="abc123def4"
> ```

## المرحلة `$default`

عندما تنشئ HTTP API باستخدام لوحة التحكم أو الإنشاء السريع (`--target`)، تنشئ API Gateway تلقائيًا **مرحلة `$default`**. وعندما تبني API خطوة بخطوة من CLI (وهو ما نفعله في هذه الدورة)، فأنت بحاجة إلى إنشائها بنفسك:

```bash
aws apigatewayv2 create-stage \
  --api-id abc123def4 \
  --stage-name '$default' \
  --auto-deploy \
  --region us-east-1 \
  --output json
```

لمرحلة `$default` خاصيتان مهمتان:

1. **النشر التلقائي ممكّن.** فأي تغييرات تجريها على المسارات أو التكاملات أو الإعدادات تُنشر تلقائيًا. ولست بحاجة إلى تشغيل أمر نشر منفصل.
2. **لا بادئة مرحلة في عنوان URL.** تقدّم مرحلة `$default` واجهتك عند جذر عنوان `ApiEndpoint`. فإذا كانت نقطة نهايتك `https://abc123def4.execute-api.us-east-1.amazonaws.com`، فالمسار `/items` متاح على `https://abc123def4.execute-api.us-east-1.amazonaws.com/items` — بلا بادئة `/prod` أو `/dev`.

وهذا يختلف عن REST APIs، حيث يكون لديك دائمًا اسم مرحلة في عنوان URL (مثل `/prod/items`). وتحافظ مرحلة `$default` على نظافة عناوين URL وتطابق سلوك التوجيه الذي اعتدته من Vercel أو Netlify.

يمكنك التحقق من وجود المرحلة:

```bash
aws apigatewayv2 get-stages \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

```json
{
  "Items": [
    {
      "AutoDeploy": true,
      "CreatedDate": "2026-03-18T12:00:00+00:00",
      "DefaultRouteSettings": {
        "DetailedMetricsEnabled": false
      },
      "StageName": "$default",
      "StageVariables": {}
    }
  ]
}
```

في لوحة التحكم، يعرض النقر على مرحلة `$default` **Invoke URL** — عنوان URL الأساسي لكل مساراتك.

![صفحة تفاصيل مرحلة API Gateway وهي تعرض اسم المرحلة $default وعنوان URL للاستدعاء في منطقة us-east-1.](/images/kinney/a7d91278d57741d1.webp)

## تعبير اختيار المسار

كان `RouteSelectionExpression` في مخرجات API هو `${request.method} ${request.path}`. وهذا يخبر API Gateway كيف يطابق الطلبات الواردة مع المسارات. ولـ HTTP APIs، يكون هذا دائمًا `${request.method} ${request.path}` — طريقة HTTP يتبعها المسار. ولا يمكنك تغييره، ولست بحاجة إلى ذلك.

عندما يأتي طلب، تقيّم API Gateway الطريقة والمسار مقابل مساراتك المعرّفة. فمفتاح مسار مثل `GET /items` يطابق طلبات GET إلى `/items`. ومفتاح مسار مثل `POST /items` يطابق طلبات POST إلى المسار نفسه. وإن لم يطابق أي مسار، يحصل الطلب على 404.

## الإنشاء السريع: الاختصار

إذا كان لديك دالة Lambda بالفعل وتريد تخطّي خطوتَي التكامل والمسار المنفصلتين (اللتين سنغطّيهما في الدرس التالي)، فيمكنك استخدام علم `--target` لإنشاء كل شيء بأمر واحد:

```bash
aws apigatewayv2 create-api \
  --name my-frontend-app-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api \
  --region us-east-1 \
  --output json
```

ينشئ هذا واجهة API، ومسار التقاط شامل `$default`، وتكامل وكيل Lambda — كل ذلك في ضربة واحدة. وينشئ أيضًا مرحلة `$default` مع تمكين النشر التلقائي.

المشكلة: يربط الإنشاء السريع مسار التقاط شامل واحدًا (`$default`) يرسل كل طلب إلى دالة Lambda واحدة. وهذا مناسب لواجهات API البسيطة التي يتولى فيها معالجك التوجيه بنفسه، لكنه يمنحك تحكمًا أقل في الإعداد لكل مسار. وفي هذه الدورة، سننشئ المسارات والتكاملات صراحةً لتفهم كيف تترابط القطع.

> **تحذير**
>
> لا يمنح الإنشاء السريع API Gateway إذنًا لاستدعاء دالة Lambda تلقائيًا. فلا تزال بحاجة إلى تشغيل `aws lambda add-permission` بشكل منفصل، وهو ما نغطّيه في الدرس التالي. ومن دون ذلك الإذن، يُرجع كل طلب خطأ 500 برسالة «Internal Server Error» وبلا تفاصيل مفيدة.

## باستخدام SDK

```typescript
import {
  ApiGatewayV2Client,
  CreateApiCommand,
  GetApiCommand,
  GetApisCommand,
} from '@aws-sdk/client-apigatewayv2';

const apigw = new ApiGatewayV2Client({ region: 'us-east-1' });

const created = await apigw.send(
  new CreateApiCommand({
    Name: 'my-frontend-app-api',
    ProtocolType: 'HTTP',
    Description: 'HTTP API for the frontend',
    CorsConfiguration: {
      AllowOrigins: ['https://example.com'],
      AllowMethods: ['GET', 'POST'],
      AllowHeaders: ['content-type'],
    },
  }),
);
console.log(created.ApiId, created.ApiEndpoint);
```

## التحقق من واجهتك

تحقّق من وجود API وافحص إعداداته في أي وقت:

```bash
aws apigatewayv2 get-api \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

إذا كانت لديك واجهات API متعددة وتحتاج إلى العثور على الصحيحة:

```bash
aws apigatewayv2 get-apis \
  --region us-east-1 \
  --output json
```

في هذه المرحلة، لديك HTTP API بمرحلة `$default` وعنوان URL مولّد تلقائيًا. ولا تملك واجهة API أي مسارات أو تكاملات بعد، لذا فإن الوصول إلى عنوان URL يُرجع استجابة `{"message":"Not Found"}`. وهذا صحيح — فأنت لم تخبر API Gateway إلى أين يرسل الطلبات.

## التنظيف

إذا احتجت إلى البدء من جديد أو حذف واجهة API أنشأتها للاختبار:

```bash
aws apigatewayv2 delete-api \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

يزيل هذا واجهة API وكل مساراتها وتكاملاتها ومراحلها. ولا تتأثر دالة Lambda — فهي لا تزال موجودة، لكن دون واجهة API أمامها.

واجهة API بلا مسارات هي واجهة API تُرجع 404 لكل شيء. في الدرس التالي، ستنشئ تكامل وكيل Lambda وتربط المسارات بدالة Lambda لديك بحيث تصل طلبات HTTP فعلًا إلى معالجك. وستمنح API Gateway أيضًا إذنًا لاستدعاء الدالة — وهي خطوة توقع الجميع تقريبًا في المرة الأولى.
