---
title: "كتابة معالج Lambda في TypeScript"
---

أنت تعرف ما هو Lambda وكيف يعمل نموذج التنفيذ. الآن تحتاج إلى كتابة الشيفرة التي تشغّلها Lambda فعليًا. **معالج** Lambda هو مجرد دالة غير متزامنة مُصدَّرة بتوقيع محدّد — يستقبل حدثًا، وينفّذ بعض العمل، ويعيد استجابة. إذا سبق أن كتبت مسار API في Next.js أو دالة serverless في Vercel، فالشكل يكاد يكون متطابقًا.

إذا أردت نسخة AWS من عقد المعالج أمامك، فإن [دليل معالجات Node.js في Lambda](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) هو المرجع الرسمي.

## إعداد المشروع

ابدأ بإنشاء دليل مشروع Lambda وتهيئته. هذا يتبع بنية المشروع المستخدمة في أعراف الدورة:

```
my-frontend-app/
├── lambda/
│   ├── src/
│   │   └── handler.ts
│   ├── package.json
│   └── tsconfig.json
```

هيّئ المشروع وثبّت التبعيات:

```bash
mkdir -p lambda/src
cd lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
```

التبعية الأساسية هنا هي `@types/aws-lambda` — توفّر هذه الحزمة تعريفات أنواع TypeScript لكل مصدر أحداث في Lambda. لن تثبّت AWS SDK كتبعية لأن Lambda توفّره في بيئة التنفيذ مسبقًا. تحتاج إلى الأنواع فقط.

## ملف tsconfig.json

أنشئ ملف `tsconfig.json` في الدليل `lambda/`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "types": ["node"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

> **نصيحة**
>
> يستخدم وقت تشغيل Node.js 22 في Lambda نظام CommonJS افتراضيًا. إبقاء `"module": "commonjs"` يبقي الأمور بسيطة. يمكنك استخدام ESM مع Lambda، لكنه يضيف عبئًا في التهيئة بلا فائدة عملية لمعظم دوال Lambda.

## توقيع المعالج

يتبع كل معالج Lambda النمط نفسه: دالة غير متزامنة مُصدَّرة تستقبل `event` وتعيد استجابة. يعتمد نوع الحدث على ما يشغّل الدالة. وبما أنك تبني خلفية API ستقف خلف API Gateway لاحقًا في الدورة، فستستخدم النوع `APIGatewayProxyHandlerV2`.

إليك المعالج الأدنى:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from Lambda' }),
  };
};
```

لنفصّل هذا.

### النوع: `APIGatewayProxyHandlerV2`

يأتي هذا النوع من `@types/aws-lambda` ويخبر TypeScript بثلاثة أمور:

1. المعامل `event` هو `APIGatewayProxyEventV2` — طلب HTTP من HTTP API في API Gateway.
2. نوع الإرجاع هو `APIGatewayProxyResultV2` — استجابة HTTP تحتوي على `statusCode` و`headers` و`body`.
3. المعالج غير متزامن ويعيد `Promise`.

تشير “V2” في الاسم إلى HTTP API في API Gateway (النسخة الأحدث والأرخص والأسرع). يوجد أيضًا `APIGatewayProxyHandler` (بدون V2) لواجهة REST API الأقدم. تستخدم هذه الدورة HTTP APIs، لذا ستستخدم أنواع V2 في كل مكان.

### كائن الحدث

يحتوي كائن `event` على كل ما يتعلق بطلب HTTP الوارد. إليك الحقول التي ستستخدمها أكثر من غيرها:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;
  const queryParams = event.queryStringParameters;
  const body = event.body ? JSON.parse(event.body) : null;
  const headers = event.headers;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method,
      path,
      queryParams,
      receivedBody: body,
    }),
  };
};
```

*ملاحظة:* طريقة HTTP مضمّنة داخل `requestContext`، وليست في المستوى الأعلى.

*ملاحظة:* `event.body` دائمًا سلسلة نصية — تحتاج إلى تحليلها بنفسك.

### كائن الاستجابة

يجب أن تتضمّن الاستجابة `statusCode` و`body`. ويجب أن يكون `body` سلسلة نصية — فإن كنت تعيد JSON، فأنت بحاجة إلى `JSON.stringify` بنفسك. كائن `headers` اختياري لكن يجب أن تضبط `Content-Type` دائمًا.

```typescript
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  body: JSON.stringify({ message: 'Hello from Lambda' }),
};
```

> **تحذير**
>
> إذا نسيت استخدام `JSON.stringify` على الجسم، فستستدعي Lambda `.toString()` على الكائن الذي تمرّره، وستعيد واجهة API لديك `[object Object]` بدلًا من JSON. هذا من أكثر أخطاء Lambda شيوعًا.

## معالج كامل

إليك معالجًا أكثر واقعية يوضّح تحليل معاملات الاستعلام، والتعامل مع طرق HTTP المختلفة، وإعادة استجابات خطأ مناسبة:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface GreetingResponse {
  greeting: string;
  timestamp: string;
}

interface ErrorResponse {
  error: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;

  if (method !== 'GET') {
    const errorResponse: ErrorResponse = { error: 'Method not allowed' };

    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse),
    };
  }

  const name = event.queryStringParameters?.name ?? 'World';

  const response: GreetingResponse = {
    greeting: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
```

*ملاحظة:* يتعامل العامل `??` مع معاملات الاستعلام المفقودة وتلك التي قيمتها `undefined` على حد سواء.

هذا المعالج:

- يفحص طريقة HTTP ويعيد 405 إذا لم يكن الطلب من نوع GET
- يقرأ معامل الاستعلام `name`، ويستخدم “World” كقيمة افتراضية
- يعيد استجابة JSON تحتوي على تحية وطابع زمني

## كائن السياق

يستقبل المعالج أيضًا وسيطًا ثانيًا: كائن **السياق**. يحتوي على بيانات وصفية عن الاستدعاء نفسه:

```typescript
export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log('Request ID:', context.awsRequestId);
  console.log('Function name:', context.functionName);
  console.log('Remaining time:', context.getRemainingTimeInMillis(), 'ms');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestId: context.awsRequestId }),
  };
};
```

الحقول الأكثر فائدة:

- **`awsRequestId`**: معرّف فريد لهذا الاستدعاء. أدرجه في استجابات الخطأ حتى تتمكّن من العثور على مدخل السجل المقابل.
- **`functionName`**: اسم الدالة التي يجري استدعاؤها.
- **`getRemainingTimeInMillis()`**: مقدار الوقت المتبقي قبل أن تُنهي Lambda دالتك. مفيد إذا احتجت إلى الخروج من عملية طويلة بلطف.

لن تستخدم كائن السياق في كل معالج، لكن من الجيد أن تعرف أنه موجود.

## الترجمة والبناء

أضف نصًا برمجيًا للبناء إلى `lambda/package.json`:

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

شغّل البناء:

```bash
cd lambda
npm run build
```

يترجم TypeScript الملف `src/handler.ts` إلى `dist/handler.js`. ملف JavaScript المترجم هو ما تشغّله Lambda فعليًا. في الدرس التالي، ستحزم هذا الناتج في ملف zip وتنشره.

## أخطاء شائعة

**إعادة كائن بدلًا من جسم محوّل إلى سلسلة نصية.** تتوقّع Lambda أن يكون `body` سلسلة نصية. إذا مرّرت كائنًا، فستتشوّه الاستجابة. لقد أهدرت وقتًا على هذا الخطأ أكثر مما أود الاعتراف به.

**نسيان معالجة الحقول المفقودة.** يمكن أن تكون معاملات الاستعلام والترويسات وجسم الطلب جميعًا `undefined`. يساعد TypeScript هنا — يعلّم النوع `APIGatewayProxyEventV2` هذه الحقول كاختيارية، لذا سيحذّرك المترجم إذا وصلت إليها دون فحص.

**استخدام callbacks بدلًا من async/await.** تدعم Lambda النمطين، لكن نمط callback (`callback(null, response)`) من بقايا عصر Node.js 6. استخدم معالجات async. فهي أنظف، وتعمل مع try/catch، وهي ما تتوقّعه الأنواع.

> **نصيحة**
>
> تتضمّن حزمة `@types/aws-lambda` أنواعًا لكل مصدر أحداث في Lambda: أحداث S3، وتدفقات DynamoDB، ورسائل SNS، وطلبات CloudFront، وغيرها. ورغم أن هذه الدورة تركّز على أحداث API Gateway، ينطبق النمط نفسه على جميعها: استورد نوع المعالج المناسب، وسيخبرك TypeScript بالضبط كيف يبدو الحدث.

## معالجة الأخطاء ودلالات إعادة المحاولة

تعتمد طريقة تعامل Lambda مع الأخطاء المرمية كليًا على *من استدعى الدالة* — وهذا ما يربك الناس لأن القواعد ليست واضحة من منظور المعالج.

- **الاستدعاءات المتزامنة** (API Gateway، وعناوين URL للدوال، واستدعاءات `invoke` المباشرة): إذا رمى معالجك استثناءً، تُظهر Lambda الاستثناء للمستدعي. ويعيد API Gateway استجابة 5xx إلى المتصفح. وLambda **لا** تعيد المحاولة. المعالج مسؤول عن منطق إعادة المحاولة الخاص به.
- **الاستدعاءات غير المتزامنة** (أحداث S3، وSNS، وEventBridge): تعيد Lambda تلقائيًا محاولة الاستدعاء الفاشل **مرتين** (محاولتان إضافيتان، ثلاث محاولات إجمالًا)، مع تأخير أُسّي. إذا فشلت المحاولات الثلاث كلها، فإما يُسقَط الحدث أو يُرسَل إلى **وجهة** أو **قائمة انتظار الرسائل الميتة (DLQ)** إذا كانت مهيأة.
- **الاستدعاءات القائمة على التدفقات** (DynamoDB Streams، وKinesis): تعيد Lambda المحاولة *بلا نهاية* على الدفعة الفاشلة حتى تنجح أو يتقادم السجل ويخرج من التدفق — إلا إذا ضبطت `MaximumRetryAttempts` و`MaximumRecordAgeInSeconds` في تعيين مصدر الحدث. يمكن لسجل سام أن يعطّل شريحة إلى الأبد إذا لم تضبط ذلك.

بالنسبة إلى أحمال العمل غير المتزامنة، هيّئ دائمًا DLQ أو وجهة فشل حتى لا تفقد الأحداث بصمت:

```bash
aws lambda put-function-event-invoke-config \
  --function-name my-worker \
  --destination-config '{"OnFailure":{"Destination":"arn:aws:sqs:us-east-1:123456789012:my-worker-dlq"}}' \
  --region us-east-1
```

في شيفرة المعالج، فضّل التقاط الأخطاء المتوقعة وإعادة استجابة منظّمة بدلًا من تركها تُرمى. الرمي مخصّص للإخفاقات غير المتوقعة حقًا:

```typescript
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const data = await doWork(event);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.error('handler error', { error, awsRequestId: event.requestContext.requestId });
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'internal server error' }),
    };
  }
};
```

أصبح لديك معالج TypeScript مترجم جاهز. قبل أن تتمكّن من نشره، تحتاج إلى دور تنفيذ IAM — الدور الذي تفترضه Lambda عند تشغيل دالتك. يحدّد ذلك الدور خدمات AWS التي يمكن لدالتك الوصول إليها. ستنشئ واحدًا في الدرس التالي، بناءً على مفاهيم IAM من [نموذج IAM الذهني](https://stevekinney.com/courses/aws/iam-mental-model).
