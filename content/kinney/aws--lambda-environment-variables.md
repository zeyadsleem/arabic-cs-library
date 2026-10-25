---
title: "متغيرات البيئة والإعدادات"
lang: ar
source: "https://stevekinney.com/courses/aws/lambda-environment-variables"
---

تعمل متغيرات البيئة في Lambda بالطريقة نفسها التي تعمل بها في Vercel أو Netlify: تضبط أزواج المفتاح والقيمة على الدالة، ويقرأها كودك من `process.env`. عنوان نقطة نهاية API لخدمة خارجية، أو اسم جدول DynamoDB، أو راية ميزة—أي قيمة تتغيّر بين البيئات أو لا ينبغي تثبيتها في الكود تذهب إلى متغيّر بيئة.

إن أردت أن تكون قواعد AWS وحدودها الدقيقة أمامك أثناء القراءة، فإن [دليل متغيرات البيئة في Lambda](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html) هو المرجع الرسمي.

إن سبق لك ضبط `NEXT_PUBLIC_API_URL` في ملف `.env.local` أو تهيئة متغيرات البيئة في لوحة تحكم Vercel، فأنت تفهم الفكرة بالفعل. الفرق الوحيد هو طريقة ضبطها.

## تعيين متغيرات البيئة عبر سطر الأوامر

يمكنك ضبط متغيرات البيئة عند إنشاء الدالة أو تحديثها على دالة موجودة. إليك كيفية إضافتها أثناء الإنشاء:

```bash
aws lambda create-function \
  --function-name my-frontend-app-api \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \
  --handler handler.handler \
  --zip-file fileb://function.zip \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data,STAGE=production}' \
  --region us-east-1 \
  --output json
```

لتحديث متغيرات البيئة على دالة موجودة، استخدم `update-function-configuration`:

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data,STAGE=production,LOG_LEVEL=info}' \
  --region us-east-1 \
  --output json
```

في وحدة التحكم، يعرض قسم **Configuration → Environment variables** جميع المتغيرات بنص صريح مع زر **Edit** يتيح لك إضافتها أو تعديلها أو حذفها.

يعرض تبويب Configuration في دالة Lambda قسم Environment variables مع ضبط TABLE_NAME على frontend-items.

> **تحذير**
>
> تستبدل راية `--environment` **جميع** متغيرات البيئة على الدالة، لا المتغيرات التي تحددها وحدها. إذا كانت لدالتك ثلاثة متغيرات موجودة وشغّلت `update-function-configuration` بمتغيرين فقط، فسيُحذف المتغير الثالث. أدرج دائمًا كل متغير تريد أن تحتفظ به الدالة.

## الوصول إلى متغيرات البيئة داخل المعالج

في معالج TypeScript لديك، تتاح متغيرات البيئة عبر `process.env`، تمامًا كما هي في أي تطبيق Node.js:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const tableName = process.env.TABLE_NAME;
const stage = process.env.STAGE ?? 'development';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!tableName) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'TABLE_NAME environment variable is not set' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      table: tableName,
      stage,
      message: 'Configuration loaded successfully',
    }),
  };
};
```

*ملاحظة:* قراءة `process.env` في المستوى الأعلى تُنفَّذ مرة واحدة أثناء التهيئة، لا في كل استدعاء.

هناك نمطان يستحقان الانتباه هنا. أولًا، قراءة متغيرات البيئة في المستوى الأعلى (خارج دالة المعالج) تعني أن القيمة تُقرأ مرة واحدة أثناء مرحلة التهيئة وتُعاد استخدامها عبر الاستدعاءات. هذا أكفأ من قراءة `process.env` في كل طلب. ثانيًا، تحقّق دائمًا من وجود متغيرات البيئة المطلوبة—فـ `process.env.TABLE_NAME` نوعه `string | undefined` في TypeScript، وينبغي أن تفشل دالتك بوضوح عند غياب متغيّر بدلًا من أن تنكسر بصمت.

## متغيرات البيئة المدمجة في Lambda

تضبط Lambda أيضًا عدة متغيرات بيئة تلقائيًا. أنت لا تهيّئ هذه المتغيرات—فهي موجودة دائمًا:

| المتغيّر | القيمة |
| --- | --- |
| `AWS_REGION` | منطقة الدالة (مثل `us-east-1`) |
| `AWS_LAMBDA_FUNCTION_NAME` | اسم الدالة |
| `AWS_LAMBDA_FUNCTION_MEMORY_SIZE` | الذاكرة المخصصة بالميغابايت |
| `AWS_LAMBDA_FUNCTION_VERSION` | إصدار الدالة الذي يُنفَّذ |
| `AWS_EXECUTION_ENV` | معرّف بيئة التشغيل (مثل `AWS_Lambda_nodejs22.x`) |
| `_HANDLER` | إعداد المعالج (مثل `handler.handler`) |

هذه مفيدة للتسجيل وتصحيح الأخطاء. على سبيل المثال، قد تدرج `AWS_REGION` في مخرجات السجل لتتأكد من أن دالتك تعمل في المكان الذي تتوقعه. أحبّ تسجيل اسم الدالة والمنطقة في كل بداية باردة—فهذا يوفر الوقت عند تصحيح الأخطاء عبر بيئات متعددة.

## حدّ 4 كيلوبايت

تفرض Lambda حدًا إجماليًا قدره **4 KB** على جميع متغيرات البيئة مجتمعة—بما في ذلك المفاتيح والقيم والتنسيق. يبدو هذا صغيرًا، وهو *بالفعل* كذلك. حفنة من قيم الإعداد القصيرة تتسع بسهولة؛ أما كتلة JSON تحتوي إعدادات تطبيقك بالكامل فلا.

إذا وصلت إلى حدّ 4 KB، فهذه إشارة إلى أن إعداداتك تجاوزت متغيرات البيئة. عند تلك النقطة، ينبغي أن تنقل الإعدادات إلى **Parameter Store**، الذي ستغطيه في قسم الأسرار. يدعم قيمًا تصل إلى 8 KB لكل معامل (أو 64 KB للمعاملات المتقدمة) دون حد إجمالي لعدد المعاملات.

> **نصيحة**
>
> قاعدة عملية تقريبية: استخدم متغيرات البيئة للقيم البسيطة غير الحساسة التي تحتاجها دالتك عند بدء التشغيل—أسماء الجداول، ومعرّفات المراحل، ورايات الميزات، وعناوين URL لنقاط نهاية API. واستخدم Parameter Store أو Secrets Manager لكل ما هو حساس أو كبير أو يحتاج إلى مشاركة بين دوال متعددة.

## متى لا تستخدم متغيرات البيئة

متغيرات البيئة هي الأداة الصحيحة للإعدادات التي:

- تتغيّر بين البيئات (dev وstaging وproduction)
- ليست حساسة بما يكفي لتستوجب التشفير عند التخزين
- صغيرة (اسم جدول، أو URL، أو معرّف مرحلة)
- تحتاج إلى أن تكون متاحة فورًا عند بدء تشغيل الدالة

وهي الأداة **الخاطئة** لـ:

- **مفاتيح API وكلمات مرور قواعد البيانات والرموز.** ينبغي أن تذهب هذه إلى Secrets Manager أو إلى نوع `SecureString` في Parameter Store. متغيرات البيئة مرئية لأي شخص يملك إذن `lambda:GetFunctionConfiguration`، وتظهر في وحدة تحكم Lambda بنص صريح. يغطي قسم الأسرار الإعداد الآمن بالتفصيل.
- **كائنات الإعداد الكبيرة.** إذا كان إعدادك يقترب من حدّ 4 KB، فانقله إلى Parameter Store.
- **الإعدادات التي تتغيّر كثيرًا.** يتطلب تحديث متغيّر بيئة تشغيل `update-function-configuration`، وهذا يطلق تحديثًا قصيرًا للدالة. أما الإعدادات التي تريد تغييرها دون إعادة نشر، فيتيح لك Parameter Store تحديث القيمة والتقاطها من دالتك في الاستدعاء التالي (مع التخزين المؤقت المناسب).

## باستخدام SDK

نمط القراءة-التعديل-الكتابة أدناه أنظف مع SDK لأنك تحصل على دمج صحيح للكائنات بدلًا من بهلوانيات `jq` في الصدفة:

```typescript
import {
  LambdaClient,
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand,
} from '@aws-sdk/client-lambda';

const lambda = new LambdaClient({ region: 'us-east-1' });

const current = await lambda.send(
  new GetFunctionConfigurationCommand({ FunctionName: 'my-frontend-app-api' }),
);

await lambda.send(
  new UpdateFunctionConfigurationCommand({
    FunctionName: 'my-frontend-app-api',
    Environment: {
      Variables: {
        ...(current.Environment?.Variables ?? {}),
        LOG_LEVEL: 'debug',
      },
    },
  }),
);
```

التحذير نفسه كما في CLI: يُستبدل `Environment.Variables` عبر API ولا يُدمج. النشر (spread) أعلاه يقوم بالدمج على جهة العميل قبل الاستدعاء.

## تحديث متغيّر واحد

بما أن راية `--environment` تستبدل جميع المتغيرات، يتطلب تحديث متغيّر واحد إعادة تحديد كل شيء. هذا مزعج لكنه قابل للإدارة. أحد الأساليب هو استخدام `get-function-configuration` لقراءة المتغيرات الحالية، ثم تعديل JSON، ثم إعادة تمريره:

```bash
# Get current environment variables
aws lambda get-function-configuration \
  --function-name my-frontend-app-api \
  --query 'Environment.Variables' \
  --region us-east-1 \
  --output json
```

يعيد هذا:

```json
{
  "TABLE_NAME": "my-frontend-app-data",
  "STAGE": "production",
  "LOG_LEVEL": "info"
}
```

ثم حدّث بالمجموعة المعدّلة:

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data,STAGE=production,LOG_LEVEL=debug}' \
  --region us-east-1 \
  --output json
```

> **ماذا يحدث للحاويات الدافئة؟**
>
> إخبار Lambda بتحديث متغيرات البيئة يعني استبدال بيئة تنفيذ جديدة في الاستدعاء التالي—تُلتقط القيمة الجديدة فورًا، لا تدريجيًا. أي حاويات دافئة تعمل بالقيم القديمة تُسحب في الخلفية. لا تحتاج إلى إعادة نشر الكود لدفع تغيير إعداد، ولا تحتاج إلى انتظار طرح تدريجي: الطلب التالي يحصل على الإعداد الجديد.

## متغيرات البيئة والبدايات الباردة

تكون متغيرات البيئة متاحة أثناء مرحلة التهيئة، ما يعني أنه يمكنك قراءتها بأمان في كود الوحدة النمطية في المستوى الأعلى. هذا هو النمط الموصى به فعليًا: اقرأ الإعدادات مرة واحدة أثناء التهيئة وأعد استخدامها عبر الاستدعاءات. لا تقرأ `process.env` داخل معالجك في كل طلب—فهو يعمل، لكنه يهدر الوقت في شيء يحتاج إلى الحدوث مرة واحدة فقط.

```typescript
// Good: read once during init
const tableName = process.env.TABLE_NAME;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // tableName is already available here
};
```

```typescript
// Works but wasteful: read on every invocation
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const tableName = process.env.TABLE_NAME;
  // reads process.env on every single request
};
```

فرق الأداء ضئيل لمتغيّر واحد، لكن النمط مهم: التهيئة في المستوى الأعلى ممارسة Lambda فضلى تؤتي ثمارها عندما تهيّئ عملاء قواعد البيانات أو تحلل إعدادات معقدة أو تحمّل بيانات مخزّنة مؤقتًا.

دالتك منشورة ومهيّأة وقابلة للاستدعاء. الموضوع الأخير قبل ربطها بالإنترنت عبر API Gateway هو موضوع يؤثر في كل API تبنيه بـ Lambda: البدايات الباردة. في الدرس التالي، ستتعلم ما يسببها، وكيف تؤثر في زمن الاستجابة، وما يمكنك فعله حيالها.
