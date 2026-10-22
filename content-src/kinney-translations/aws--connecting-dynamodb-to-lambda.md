---
title: "ربط DynamoDB بـ Lambda"
---

لديك كل القطع: جدول DynamoDB لتخزين البيانات، ودالة Lambda لتشغيل الشيفرة، وAPI Gateway لعرضها عبر HTTP. الآن توصلها في الحلقة التي يحتاجها كل تطبيق أمامي متكامل: تطبيق React يجري طلب HTTP، ويوجّهه API Gateway إلى Lambda، فتقرأ Lambda من DynamoDB أو تكتب فيها، ثم تتدفق الاستجابة عائدة إلى المتصفح.

إذا أردت أن تطّلع على نسخة AWS من نموذج الوصول إلى الجداول أثناء القراءة، فإن [دليل مطوّر DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) هو المرجع الرسمي.

هذه هي اللحظة التي تنتقل فيها الدورة من «أستطيع نشر ملفات ثابتة» إلى «لدي واجهة خلفية عاملة».

## حلقة الطلب الكاملة

إليك ما يحدث عندما يستدعي متصفح المستخدم واجهتك:

1. **الواجهة الأمامية** تجري استدعاء `fetch()` إلى عنوان URL الخاص بـ API Gateway
2. **API Gateway** يتلقى طلب HTTP ويطلق دالة Lambda لديك (وقد أعددت هذا في [ربط API Gateway بـ Lambda](https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda))
3. **Lambda** تحلّل الطلب، وتستدعي DynamoDB، وتبني استجابة
4. **DynamoDB** تقرأ البيانات أو تكتبها وتُرجع النتيجة إلى Lambda
5. **Lambda** تُرجع استجابة HTTP إلى API Gateway
6. **API Gateway** يرسل الاستجابة عائدة إلى المتصفح

```
flowchart LR
    Frontend["Frontend fetch()"] --> APIGateway["API Gateway"]
    APIGateway --> Lambda["Lambda handler"]
    Lambda --> DynamoDB["DynamoDB table"]
    DynamoDB --> Lambda
    Lambda --> APIGateway
    APIGateway --> Frontend
```

القطعة الوحيدة الناقصة: دالة Lambda لديك لا تملك إذنًا للتحدث إلى DynamoDB بعد. فدور التنفيذ الذي أنشأته في [أدوار تنفيذ Lambda وأذوناتها](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions) يملك أذونات التسجيل فقط. وتحتاج إلى إضافة سياسة DynamoDB.

## تحديث دور التنفيذ

تحتاج دالة Lambda إلى إذن لتنفيذ عمليات DynamoDB على جدول `my-frontend-app-data`. أنشئ سياسة تمنح العمليات التي يستخدمها معالجك بالضبط — لا أكثر.

احفظ هذا باسم `lambda-dynamodb-policy.json` (وهو متاح أيضًا باسم [`lambda-dynamodb.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-dynamodb.json) في مستودع Scratch Lab):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDynamoDBAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data"
    }
  ]
}
```

يتبع هذا مبدأ الامتياز الأدنى من [مبدأ الامتياز الأدنى](https://stevekinney.com/courses/aws/principle-of-least-privilege): يمكن للدالة قراءة العناصر وكتابتها وتحديثها وحذفها والاستعلام عنها — لكن على هذا الجدول المحدّد فقط. ولا يمكنها إنشاء الجداول أو حذفها، ولا فحص الجدول كاملًا، ولا لمس أي جدول آخر في حسابك.

في لوحة التحكم، يمكنك إنشاء هذه السياسة في محرّر JSON في **Create policy** ضمن IAM — وهو المكان نفسه الذي عرّفت فيه سياسة الثقة لدور التنفيذ.

محرّر IAM Create Policy JSON وهو يعرض سياسة بإجراءات DynamoDB تشمل PutItem وGetItem وUpdateItem وQuery مقصورة على ARN جدول محدّد.

أنشئ السياسة وأرفقها:

```bash
aws iam create-policy \
  --policy-name MyFrontendAppLambdaDynamoDB \
  --policy-document file://lambda-dynamodb-policy.json \
  --region us-east-1 \
  --output json
```

```bash
aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB \
  --region us-east-1 \
  --output json
```

تحقّق من أن الدور يملك الآن السياستين:

```bash
aws iam list-attached-role-policies \
  --role-name my-frontend-app-lambda-role \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "AttachedPolicies": [
    {
      "PolicyName": "AWSLambdaBasicExecutionRole",
      "PolicyArn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    },
    {
      "PolicyName": "MyFrontendAppLambdaDynamoDB",
      "PolicyArn": "arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB"
    }
  ]
}
```

> **تحذير**
>
> إذا نسيت إضافة هذه السياسة، فستُطلق دالة Lambda استثناء `AccessDeniedException` عندما تحاول استدعاء DynamoDB. وستخبرك رسالة الخطأ بالضبط أي إجراء رُفض وعلى أي مورد — استخدم ذلك لإصلاح السياسة. لا تحلّ هذا بمنح `dynamodb:*` على `*`. فذلك يمنح دالتك وصولًا إلى كل جدول DynamoDB في حسابك.

## المعالج الكامل

هذا معالج Lambda كامل ينفّذ واجهة API لعمليات CRUD على العناصر المخزّنة في DynamoDB. وهو المعالج الذي ستنشره خلف API Gateway الذي أعددته سابقًا في الدورة.

> **يجب أن يأتي `userId` من JWT، لا من سلسلة الاستعلام**
>
> في تطبيق حقيقي، اقرأ `userId` من `event.requestContext.authorizer?.jwt?.claims?.sub` بعد التحقق من JWT — لا من معاملات الاستعلام أبدًا، لأن أي مستدعٍ يمكنه تزويرها. ونحن نقرأ من `queryStringParameters` تبسيطًا تعليميًا. راجع [قراءة البيانات وكتابتها باستخدام SDK](https://stevekinney.com/courses/aws/dynamodb-reading-and-writing-data) للشرح الكامل.

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return respond(400, { error: 'Missing userId parameter' });
  }

  try {
    switch (method) {
      case 'GET': {
        const itemId = event.queryStringParameters?.itemId;

        if (itemId) {
          const result = await client.send(
            new GetCommand({
              TableName: TABLE_NAME,
              Key: { userId, itemId },
            }),
          );

          if (!result.Item) {
            return respond(404, { error: 'Item not found' });
          }

          return respond(200, result.Item);
        }

        const result = await client.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: { ':userId': userId },
          }),
        );

        return respond(200, { items: result.Items ?? [] });
      }

      case 'POST': {
        const body = JSON.parse(event.body ?? '{}');

        if (!body.title) {
          return respond(400, { error: 'Missing title in request body' });
        }

        const itemId = crypto.randomUUID();

        const item = {
          userId,
          itemId,
          title: body.title,
          status: body.status ?? 'pending',
          createdAt: new Date().toISOString(),
        };

        await client.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
          }),
        );

        return respond(201, item);
      }

      case 'DELETE': {
        const itemId = event.queryStringParameters?.itemId;

        if (!itemId) {
          return respond(400, { error: 'Missing itemId parameter' });
        }

        await client.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { userId, itemId },
          }),
        );

        return respond(200, { deleted: true });
      }

      default:
        return respond(405, { error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Handler error:', error);
    return respond(500, { error: 'Internal server error' });
  }
};

function respond(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
```

*ملاحظة:* تحافظ الدالة المساعدة `respond` على اتساق تنسيق الاستجابة عبر كل الفروع.

بضعة أمور تستحق الملاحظة:

- **GET دون `itemId`** يستعلم عن كل العناصر التي تخص المستخدم. وGET مع `itemId` يجلب عنصرًا واحدًا. وهذا نمط REST قياسي.
- **POST** يولّد `itemId` فريدًا باستخدام `crypto.randomUUID()` — أصلي في Node 18+، وخالٍ من التصادم، ولا يسرّب معلومات طابع زمني كما يفعل `Date.now()`.
- **الدالة المساعدة `respond`** تقلّل الشيفرة المتكررة. فكل استجابة تحتاج `statusCode` و`Content-Type` — ووضع ذلك في دالة يعني ألا تكرّره في كل فرع. ولـ HTTP APIs (وهي ما تستخدمه هذه الدورة)، تنتمي ترويسات CORS إلى إعداد API Gateway، لا إلى استجابة Lambda — راجع [إعداد CORS في API Gateway](https://stevekinney.com/courses/aws/api-gateway-cors-configuration).
- **معالجة الأخطاء** تلتقط أخطاء DynamoDB وتُرجع 500. وفي الإنتاج، ستسجّل الخطأ كاملًا وتُرجع رسالة منظّفة إلى العميل.

## ضبط اسم الجدول كمتغيّر بيئة

تضمين اسم الجدول مباشرة يعمل، لكن استخدام متغيّر بيئة يجعل دالتك قابلة للنقل بين البيئات (التطوير، والتهيئة، والإنتاج). حدّث إعداد الدالة:

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data}' \
  --region us-east-1 \
  --output json
```

يقرأ المعالج بالفعل من `process.env.TABLE_NAME` مع قيمة احتياطية هي `my-frontend-app-data`، لذا لا يتطلب هذا التغيير تحديث الشيفرة.

في لوحة التحكم، يعرض قسم **Configuration → Environment variables** المتغيّر `TABLE_NAME` إلى جانب أي متغيّرات أخرى تستخدمها الدالة.

نموذج Lambda Edit environment variables وهو يعرض TABLE_NAME مضبوطًا على frontend-items. لكن يمكنك الآن توجيه الشيفرة نفسها إلى جدول مختلف بتغيير متغيّر البيئة — وهذا مفيد عندما يكون لديك جدول `my-frontend-app-data-dev` للتطوير.

## النشر والاختبار

ابنِ المعالج المحدّث وغلّفه وانشره:

```bash
cd lambda
npm run build
cd dist && zip -r ../function.zip . && cd ..

aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

> **لماذا لا يوجد `node_modules` في ملف zip؟**
>
> لقد أضفت للتو `@aws-sdk/client-dynamodb` و`@aws-sdk/lib-dynamodb` إلى `package.json`، لذا قد تتساءل إن كان ملف zip يحتاج الآن إلى تضمين `node_modules`. إن وقت التشغيل `nodejs22.x` يضمّن AWS SDK v3، لذا فإن أي شيء تحت `@aws-sdk/*` يُحلّ في وقت التشغيل — ويكفي `npm install` المحلي للتحقق من الأنواع أثناء التطوير. ومع ذلك، تثبّت AWS إصدارًا فرعيًا محدّدًا في وقت التشغيل، لا أحدث إصدار، وهو يختلف حسب المنطقة. وللتعلم، الاعتماد على نسخة وقت التشغيل كافٍ. أما للإنتاج، فغلّف SDK بنفسك لتتحكم في الإصدار صراحةً ولا تُفاجأ عندما تتغيّر النسخة المضمّنة في وقت التشغيل. وبمجرد إضافة اعتماد *غير* مثبّت مسبقًا (محلّل Markdown، مكتبة تواريخ، أي شيء خارج `@aws-sdk/*`)، ستحتاج إلى نسخ `node_modules` إلى `dist/` قبل التغليف بغض النظر. راجع التحذير في [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function) للآليات الدقيقة.

اختبر إنشاء عنصر:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload '{"requestContext":{"http":{"method":"POST","path":"/"}},"queryStringParameters":{"userId":"user-123"},"body":"{\"title\":\"Deploy to production\"}"}' \
  --region us-east-1 \
  --output json \
  response.json
```

افحص الاستجابة:

```bash
cat response.json
```

ينبغي أن ترى استجابة 201 مع العنصر المنشأ، بما في ذلك `itemId` المولّد والطابع الزمني `createdAt`.

اختبر سرد العناصر الخاصة بالمستخدم:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload '{"requestContext":{"http":{"method":"GET","path":"/"}},"queryStringParameters":{"userId":"user-123"}}' \
  --region us-east-1 \
  --output json \
  response.json
```

ينبغي أن تتضمن الاستجابة العنصر الذي أنشأته للتو في مصفوفة `items`.

## استدعاؤها من الواجهة الأمامية

بمجرد أن تصبح واجهتك معروضة عبر API Gateway (وقد أعددته في [إنشاء HTTP API](https://stevekinney.com/courses/aws/creating-an-http-api) وأعددت CORS له في [إعداد CORS في API Gateway](https://stevekinney.com/courses/aws/api-gateway-cors-configuration))، تبدو شيفرة واجهتك الأمامية هكذا:

```typescript
const API_URL = 'https://your-api-id.execute-api.us-east-1.amazonaws.com';

async function createItem(userId: string, title: string) {
  const response = await fetch(`${API_URL}/?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  return response.json();
}

async function getItems(userId: string) {
  const response = await fetch(`${API_URL}/?userId=${userId}`);
  return response.json();
}
```

هذه هي واجهة `fetch` نفسها التي تستخدمها في أي تطبيق أمامي. والفرق الوحيد أن عنوان URL يشير إلى نقطة نهاية API Gateway بدلًا من دالة Vercel أو Netlify. هذا كل شيء — فمن منظور الواجهة الأمامية، هذه مجرد واجهة API أخرى.

> **نصيحة**
>
> إذا كنت تحصل على أخطاء CORS عند استدعاء واجهتك من الواجهة الأمامية، فالإصلاح يقع على HTTP API في API Gateway، لا في استجابة Lambda. راجع [إعداد CORS في API Gateway](https://stevekinney.com/courses/aws/api-gateway-cors-configuration) للإعداد الدقيق — دع API Gateway يتولى CORS كي لا تكرّر الترويسات في كل فرع من فروع Lambda.

## ما الذي بنيته

خُذ خطوة إلى الوراء وانظر إلى ما يعمل:

- **S3** يستضيف ملفات واجهتك الأمامية الثابتة.
- **CloudFront** يقدّمها عالميًا عبر HTTPS.
- **Route 53** يوجّه نطاقك إلى CloudFront.
- **API Gateway** يوفّر نقطة نهاية HTTP لواجهتك.
- **Lambda** تشغّل منطق واجهتك الخلفية.
- **DynamoDB** يخزّن بياناتك (هذه الوحدة)
- **IAM** يربط كل ذلك معًا بأذونات الامتياز الأدنى.

هذا تطبيق متكامل كامل وقادر على الإنتاج يعمل على بنية تحتية بلا خوادم. لا خوادم لإدارتها. ولا قواعد بيانات لترقيعها. ولا مجموعات اتصالات لضبطها. تدفع مقابل ما تستخدمه، وعند حركة المرور المنخفضة، لا يكلّفك ما تستخدمه شيئًا يُذكر.
