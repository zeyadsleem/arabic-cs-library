---
title: "نشر دالة Lambda واختبارها"
---

لديك معالج TypeScript مُجمّع ودور تنفيذ بأذونات تسجيل. الآن تحتاج إلى نقل الشيفرة إلى Lambda والتحقق من أنها تعمل. وسير العمل هو: جمّع TypeScript، وغلّف المخرجات في zip، وأنشئ الدالة (أو حدّثها)، واستدعها، واقرأ النتائج. وكل هذا يحدث عبر CLI.

إذا أردت سطح الأوامر الدقيق في AWS أثناء عملك، فأبقِ [مرجع أمر `aws lambda create-function`](https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html)، و[مرجع أمر `aws lambda update-function-code`](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html)، و[مرجع أمر `aws lambda invoke`](https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html) مفتوحة.

## بناء حزمة النشر

تتوقع Lambda ملف zip يحتوي JavaScript المُجمّع وأي اعتمادات. ابدأ بجمع TypeScript وإنشاء ملف zip:

```bash
cd lambda
npm run build
```

ينتج هذا الملف `dist/handler.js` (وخرائط المصدر المرتبطة به). الآن غلّف محتويات دليل `dist/`:

```bash
cd dist
zip -r ../function.zip .
cd ..
```

يجب أن يحتوي ملف zip على ملف معالجك في المستوى الجذري — لا متداخلًا داخل مجلد `dist/`. ولهذا تنتقل بـ `cd` إلى `dist/` قبل التغليف: تبحث Lambda عن المعالج في المسار الذي تحدّده (مثل `handler.handler`)، وإذا كان ملفك في `dist/handler.js` داخل zip، فلن تجده Lambda.

> **تحذير**
>
> إذا كانت دالتك تستخدم اعتمادات `node_modules` (خارج ما يوفّره وقت تشغيل Lambda)، فتحتاج إلى تضمينها في zip. انسخ `node_modules` إلى دليل `dist/` قبل التغليف. وفي هذا الدرس، لا يملك المعالج أي اعتمادات وقت تشغيل — فـ `@types/aws-lambda` اعتماد تطوير يُستخدم فقط أثناء التجميع.

### مشكلة حجم الحزمة

يعمل نهج `tsc` + zip مع المعالجات البسيطة التي بلا اعتمادات وقت تشغيل. لكن بمجرد أن تستورد AWS SDK — `@aws-sdk/client-dynamodb` أو `@aws-sdk/lib-dynamodb` أو `@aws-sdk/client-ssm` — ينتفخ ملف zip إلى **37 MB** لأن `tsc` ينسخ كل ملف ولا يمكنه إزالة الشيفرة غير المستخدمة (tree-shaking).

الإصلاح هو **esbuild**. فهو يغلّف معالجك في ملف واحد، ويزيل الشيفرة الميتة، والأهم أنه يتيح لك وسم AWS SDK على أنه *خارجي* (external) كي لا يُضمّن في الحزمة إطلاقًا. فوقت تشغيل Lambda `nodejs22.x` يتضمن AWS SDK v3 بالفعل، لذا يمكن لمعالجك أن يستدعي `require('@aws-sdk/client-dynamodb')` في وقت التشغيل دون شحنه.

```bash
npx esbuild src/handler.ts \
  --bundle \
  --platform=node \
  --target=node22 \
  --outfile=dist/handler.js \
  --external:@aws-sdk/*
```

النتيجة: **37 MB ← أقل من 6 KB**. ملف واحد، بلا `node_modules`، وzip صغير بما يكفي كي لا تفكر أبدًا في حد الرفع البالغ 50 MB في Lambda.

إذا سبق أن استخدمت Vite، فـ esbuild يعمل بالفعل في الخلفية — فـ Vite يستخدمه لتحويلات التطوير. والفرق هنا أنك تشغّله مباشرة، بعلم واحد (`--external`) يخبره بتخطّي AWS SDK لأن Lambda توفّره.

> **نصيحة**
>
> استخدم `tsc --noEmit` للتحقق من الأنواع وesbuild للبناء الفعلي. فهما يتكاملان: يلتقط TypeScript أخطاء الأنواع، وينتج esbuild أثر النشر. ويحتوي [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab) على هذا معدًّا كـ `npm run build:check` (tsc) و`npm run build` (esbuild) في دليل `lambda/`.

## إنشاء الدالة

استخدم `aws lambda create-function` لنشر دالتك لأول مرة:

```bash
aws lambda create-function \
  --function-name my-frontend-app-api \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \
  --handler handler.handler \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

لنفكّك هذه الأعلام:

- **`--function-name`**: اسم دالتك. وهكذا تشير إليها في كل مكان في AWS.
- **`--runtime`**: وقت تشغيل اللغة. يشغّل `nodejs22.x` الإصدار 22 من Node.js. وAWS SDK v3 مضمّن في وقت التشغيل هذا، لكن AWS تثبّت إصدارًا فرعيًا محدّدًا — لا أحدث إصدار — وقد يختلف حسب المنطقة. وفي الإنتاج، غلّف SDK في حزمة نشرك لتتحكم في الإصدار صراحةً.
- **`--role`**: ARN دور التنفيذ الذي أنشأته في [أدوار تنفيذ Lambda وأذوناتها](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions).
- **`--handler`**: مسار دالة المعالج لديك بصيغة `<filename>.<export>`. وبما أن ملفك المُجمّع هو `handler.js` والدالة المصدّرة هي `handler`، فهذا `handler.handler`. (نعم، `handler.handler` يبدو مكرّرًا. لكنك تعتاد عليه.)
- **`--zip-file`**: حزمة النشر. وتخبر البادئة `fileb://` CLI بقراءة الملف كبيانات ثنائية.

تؤكد الاستجابة أن الدالة أُنشئت:

```json
{
  "FunctionName": "my-frontend-app-api",
  "FunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api",
  "Runtime": "nodejs22.x",
  "Role": "arn:aws:iam::123456789012:role/my-frontend-app-lambda-role",
  "Handler": "handler.handler",
  "CodeSize": 1234,
  "Timeout": 3,
  "MemorySize": 128,
  "State": "Active"
}
```

لاحظ الافتراضيات: مهلة 3 ثوانٍ وذاكرة 128 MB. وهذه مناسبة لمعالج API بسيط. ويمكنك تغييرها لاحقًا باستخدام `aws lambda update-function-configuration`.

في لوحة التحكم، تتيح لك صفحة **Create function** اختيار وقت التشغيل وضبط الإعدادات الأساسية قبل النشر.

صفحة Lambda Create Function وهي تعرض اختيار Author from scratch وإدخال اسم دالة واختيار وقت تشغيل Node.js.

بعد الإنشاء، يعرض تبويب **Code** شيفرة المعالج المنشورة في المحرّر المضمّن.

صفحة تفاصيل دالة Lambda وهي تعرض تبويب Code مع المحرّر المضمّن يعرض دالة المعالج.

ويعرض تبويب **Configuration** إعدادات وقت التشغيل للدالة — الذاكرة والمهلة والتخزين المؤقت وSnapStart. وستعود هنا عندما تحتاج إلى تعديلها أو إضافة متغيّرات بيئة.

تبويب Lambda Configuration وهو يعرض General configuration بذاكرة 128 MB ومهلة 10 ثوانٍ وتخزين مؤقت 512 MB.

## استدعاء الدالة

الآن اختبرها. أمر `aws lambda invoke` يستدعي دالتك مباشرة، دون المرور بـ API Gateway:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload '{"requestContext": {"http": {"method": "GET", "path": "/"}}, "queryStringParameters": {"name": "AWS"}}' \
  --region us-east-1 \
  --output json \
  response.json
```

يفعل هذا الأمر شيئين: يستدعي الدالة ويكتب قيمة إرجاع الدالة إلى `response.json`. وتعرض مخرجات الطرفية بيانات وصفية عن الاستدعاء:

```json
{
  "StatusCode": 200,
  "ExecutedVersion": "$LATEST"
}
```

الاستجابة الفعلية من معالجك موجودة في `response.json`:

```bash
cat response.json
```

```json
{
  "statusCode": 200,
  "headers": { "Content-Type": "application/json" },
  "body": "{\"greeting\":\"Hello, AWS!\",\"timestamp\":\"2026-03-18T12:00:00.000Z\"}"
}
```

تلقّت دالتك الحدث، وقرأت معامل الاستعلام `name`، وأرجعت تحية. إنها تعمل.

في لوحة التحكم، يتيح لك تبويب **Test** ضبط حدث اختبار وتشغيل الدالة مباشرة. اختر **Create new event**، وأعطه اسمًا، والصق حمولة JSON في المحرّر.

تبويب Lambda Test وهو يعرض خيار Create new event مختارًا مع محرّر Event JSON جاهزًا للإدخال.

بعد إدخال حمولة الاختبار، انقر **Test**. ويقبل محرّر **Event JSON** أي حمولة JSON، وتعرض نتيجة التنفيذ الاستجابة والسجلات مضمّنة.

تبويب Lambda Test وهو يعرض محرّر Event JSON مهيّأً بحمولة نموذجية، جاهزًا لاستدعاء الدالة.

بعد النقر على **Test**، تتوسّع النتيجة فوق محرّر الحدث لتعرض الحالة ونص الاستجابة ومخرجات السجل.

تبويب Lambda Test وهو يعرض نتيجة التنفيذ كـ Succeeded مع توسّع استجابة JSON التي تعرض statusCode 200 ونص Hello from Lambda.

> **نصيحة**
>
> العلم `--cli-binary-format raw-in-base64-out` مطلوب عند تمرير `--payload` مع AWS CLI v2. فمن دونه، تحاول CLI ترميز حمولتك بـ base64، وهو ما لا تريده لأحداث اختبار JSON.

## استخدام ملفات أحداث الاختبار

تكتب حمولات JSON على سطر الأوامر تصبح مرهقة سريعًا. احفظ حدث اختبارك في ملف بدلًا من ذلك:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/greeting"
    }
  },
  "queryStringParameters": {
    "name": "Frontend Engineer"
  },
  "headers": {
    "content-type": "application/json"
  }
}
```

احفظ هذا باسم `test-event.json` واستدعِ باستخدام:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --region us-east-1 \
  --output json \
  response.json
```

استخدام `file://` (لا `fileb://` — فالحمولات نصية لا ثنائية) يحمّل الحدث من ملف. واحتفظ بمجموعة أحداث اختبار في مشروعك لسيناريوهات مختلفة: معاملات ناقصة، وطلبات POST، وأجسام JSON مشوّهة.

## تحديث شيفرة الدالة

لن تنشئ دالة جديدة كلما غيّرت شيفرتك. بعد `create-function` الأولي، استخدم `update-function-code` لنشر التغييرات:

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

يستبدل هذا شيفرة الدالة مع الحفاظ على كل الإعدادات (وقت التشغيل والذاكرة والمهلة ومتغيّرات البيئة ودور التنفيذ). والتحديث ذرّي — تقدّم Lambda الشيفرة القديمة حتى تجهز الجديدة، ثم تنتقل إليها.

## قراءة السجلات

في لوحة التحكم، يعرض تبويب **Monitor** مقاييس الاستدعاء والمدة ومعدّلات الأخطاء بنظرة واحدة. ويربط أيضًا مباشرة بمجموعة سجلات CloudWatch لدالتك.

تبويب Lambda Monitor وهو يعرض عدد الاستدعاءات والمدة ومقاييس الأخطاء مع رابط إلى CloudWatch Logs.

تذهب مخرجات `console.log` من دالتك إلى CloudWatch Logs. وأبسط طريقة لمراقبة السجلات في الوقت الفعلي هي `aws logs tail`:

```bash
aws logs tail /aws/lambda/my-frontend-app-api \
  --follow \
  --region us-east-1
```

يبثّ `--follow` الأحداث الجديدة عند وصولها — وهو مفيد عندما تستدعي الدالة في طرفية أخرى وتريد رؤية المخرجات فورًا.

وللمعالجة اللاحقة البرمجية — أرشفة السجلات أو البحث عن أخطاء في CI — يمنحك الزوج `describe-log-streams` و`get-log-events` تحكمًا أكبر:

```bash
aws logs get-log-events \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --log-stream-name "$(aws logs describe-log-streams \
    --log-group-name /aws/lambda/my-frontend-app-api \
    --order-by LastEventTime \
    --descending \
    --limit 1 \
    --query 'logStreams[0].logStreamName' \
    --output text \
    --region us-east-1)" \
  --region us-east-1 \
  --output json
```

يجد ذلك الأمر المتداخل أحدث تدفق سجلات ثم يجلب أحداثه. وتتضمن المخرجات رسائل `console.log` لديك، وبداية كل استدعاء ونهايته، والمدة المفوترة.

سنغطّي CloudWatch بعمق في قسم CloudWatch. أما الآن، فـ `aws logs tail` هو أداة التصحيح الأساسية لديك.

> **نصيحة**
>
> يمكنك أيضًا تضمين `--log-type Tail` في أمر `aws lambda invoke`. ويُرجع هذا آخر 4 KB من مخرجات السجل كسلسلة مرمّزة بـ base64 في الاستجابة، ويمكنك فكّ ترميزها باستخدام `base64 --decode`. وهو أسرع من الاستعلام عن CloudWatch في التصحيح البسيط.

## سكربت النشر الكامل

إليك سير عمل البناء والنشر الكامل في سكربت واحد. وستشغّل نسخة منه كلما حدّثت دالتك:

```bash
# Build
cd lambda
npm run build

# Package
cd dist
zip -r ../function.zip .
cd ..

# Deploy (use create-function the first time, update-function-code after that)
aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json

# Test
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

هذه هي النسخة اليدوية. لاحقًا في الدورة، ستؤتمت هذا في سير عمل GitHub Actions، كما أتمتت نشر الواجهات الأمامية الثابتة في قسم النشر.

## باستخدام SDK

غالبًا ما تريد سكربتات النشر البقاء في JavaScript بدلًا من استدعاء `aws lambda` عبر الصدفة. وهذا مكافئ SDK:

```typescript
import { readFile } from 'node:fs/promises';
import {
  LambdaClient,
  UpdateFunctionCodeCommand,
  InvokeCommand,
  waitUntilFunctionUpdatedV2,
} from '@aws-sdk/client-lambda';

const lambda = new LambdaClient({ region: 'us-east-1' });

const zip = await readFile('./function.zip');

await lambda.send(
  new UpdateFunctionCodeCommand({
    FunctionName: 'my-frontend-app-api',
    ZipFile: zip, // Uint8Array / Buffer, not a base64 string
  }),
);

// Block until the update has propagated — Lambda briefly rejects invokes
// during an update.
await waitUntilFunctionUpdatedV2(
  { client: lambda, maxWaitTime: 60 },
  { FunctionName: 'my-frontend-app-api' },
);

const result = await lambda.send(
  new InvokeCommand({
    FunctionName: 'my-frontend-app-api',
    Payload: new TextEncoder().encode(JSON.stringify({ name: 'Steve' })),
  }),
);

// Response `Payload` is a Uint8Array — decode it before parsing.
const body = new TextDecoder().decode(result.Payload);
console.log(JSON.parse(body));
```

ثمة مزلقان خاصان بالإصدار v3: يجب أن تكون `Payload` في الطلب `Uint8Array` (لا سلسلة نصية)، و`Payload` في الاستجابة أيضًا `Uint8Array` — و`TextDecoder` هي طريقة قراءتها. أما SDK v2 فكان يخزّنها مؤقتًا نيابة عنك.

## أخطاء شائعة

**مسار معالج خاطئ.** إذا حصلت على «Runtime.HandlerNotFound» عند الاستدعاء، فقيمة `--handler` لديك لا تطابق اسم الملف والتصدير داخل zip. تحقّق مرتين من أن `handler.js` في جذر zip (لا في دليل فرعي) وأن الدالة المصدّرة اسمها `handler`.

**zip يحتوي الدليل بدلًا من المحتويات.** إذا شغّلت `zip -r function.zip dist/`، فسيحتوي zip على مجلد `dist/`، وستبحث Lambda عن `dist/handler.handler` بدلًا من `handler.handler`. انتقل دائمًا بـ `cd` إلى الدليل وغلّف المحتويات.

**الدور لم ينتشر.** إذا فشل `create-function` برسالة «The role defined for the function cannot be assumed by Lambda»، فانتظر 10–15 ثانية وحاول مرة أخرى. فانتشار دور IAM متسق في النهاية.

دالتك منشورة ويمكنك استدعاؤها مباشرة. لكن الاستدعاء المباشر ليس طريقة استدعاء واجهة أمامية لواجهة API. فأنت تحتاج إلى نقطة نهاية HTTP. وقبل أن تصل إلى قسم API Gateway، ثمة موضوعان آخران عن Lambda يجب تغطيتهما: متغيّرات البيئة، للإعدادات التي لا ينبغي تضمينها مباشرة، والبدايات الباردة، وهي خاصية الأداء الأهم لزمن استجابة API.

## التنظيف

> **ملاحظة**
>
> تُعاد هذه الدالة استخدامها في أقسام API Gateway وDynamoDB وSecrets Manager وCloudWatch. فلا تحذفها إلا إذا انتهيت من الدورة بالكامل.

```bash
aws lambda delete-function \
  --function-name my-frontend-app-api \
  --region us-east-1

# The log group is NOT deleted automatically when the function is deleted
aws logs delete-log-group \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --region us-east-1
```
