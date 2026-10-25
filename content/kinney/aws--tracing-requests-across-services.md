---
title: "تتبّع الطلبات عبر الخدمات"
lang: ar
source: "https://stevekinney.com/courses/aws/tracing-requests-across-services"
---

الإنذار يخبرك بأن شيئًا تعطّل. والسجلات تخبرك بما حدث. لكن عندما يبلّغ مستخدم بأن «نقرت على الزر ولم يحدث شيء»، تحتاج إلى تتبع ذلك الطلب الواحد من لحظة وصوله إلى API Gateway، مرورًا بدالة Lambda، إلى DynamoDB، ثم عودته. وهذا يعني ربط مدخلات السجلات عبر الخدمات في قصة واحدة.

إن أردت نسخة AWS من مكدّس المراقبة قريبة منك أثناء القراءة، فإن [نظرة عامة على CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) هي المرجع الرسمي.

هذا هو الفرق بين المراقبة و**القابلية للملاحظة**. فالمراقبة تخبرك بأن «الأخطاء ارتفعت». أما القابلية للملاحظة فتتيح لك أن تسأل «لماذا فشل *هذا الطلب تحديدًا*؟» وتتبع الخيوط إلى الجواب. وأجد هذا التمييز أهم مما يبدو عليه.

```
flowchart LR
    Browser["Browser request"] --> APIGateway["API Gateway"]
    APIGateway --> Lambda["Lambda logs requestId"]
    Lambda --> DynamoDB["DynamoDB operation"]
    DynamoDB --> Lambda
    Lambda --> Logs["Structured logs in CloudWatch"]
    APIGateway --> Logs
    Logs --> Insights["Logs Insights query by correlation ID"]
```

## المشكلة: سجلات غير مترابطة

الآن، ينتج تطبيقك سجلات في أماكن متعددة:

- **API Gateway** يسجّل طلب HTTP الوارد (الطريقة، المسار، رمز الحالة، زمن الاستجابة)
- **Lambda** يسجّل كل ما تكتبه بـ `console.log`—ومع التسجيل المهيكل من [مجموعات سجلات CloudWatch والتسجيل المهيكل](https://stevekinney.com/courses/aws/cloudwatch-log-groups-and-structured-logging)، يتضمن كل مدخل حقولًا مثل `level` و`message` و`duration`
- **DynamoDB** ينشر مقاييس (زمن الاستجابة، السعة المستهلكة) لكنه لا ينتج سجلات لكل طلب

التحدي: هذه السجلات تعيش في مجموعات سجلات منفصلة بلا رابط بينها. عالج API Gateway طلبًا، وشغّلت Lambda دالة، وخزّن DynamoDB عنصرًا—لكن لا شيء يربط هذه الأحداث الثلاثة معًا. وإذا فشلت دالة Lambda، فلا يمكنك معرفة طلب API Gateway الذي أطلقها أو عملية DynamoDB التي كانت تحاولها.

## معرّفات الترابط: الخيط الرابط

**معرّف الترابط** معرّف فريد يتبع الطلب عبر كل خدمة يلمسها. ويولّد API Gateway واحدًا لكل طلب وارد—وهو `requestId` في كائن الحدث الذي تتلقاه Lambda. وبإدراج هذا المعرّف في كل مدخل سجل تكتبه دالة Lambda، تُنشئ خيطًا يربط كل شيء معًا.

رأيت هذا في مثال التسجيل المهيكل من الدرس السابق. وإليك نسخة أكثر اكتمالًا تسجّل في كل مرحلة من دورة حياة الطلب:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

interface LogEntry {
  level: string;
  message: string;
  requestId: string;
  [key: string]: unknown;
}

function log(entry: LogEntry): void {
  console.log(JSON.stringify(entry));
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const requestId = event.requestContext?.requestId ?? crypto.randomUUID();
  const method = event.requestContext?.http?.method ?? 'UNKNOWN';
  const path = event.rawPath ?? '/';

  log({
    level: 'INFO',
    message: 'Request started',
    requestId,
    method,
    path,
    queryParams: event.queryStringParameters ?? {},
  });

  try {
    const itemId = event.queryStringParameters?.id;

    if (method === 'GET' && itemId) {
      const dynamoStart = Date.now();

      const result = await client.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id: itemId },
        }),
      );

      const dynamoDuration = Date.now() - dynamoStart;

      log({
        level: 'INFO',
        message: 'DynamoDB read completed',
        requestId,
        operation: 'GetItem',
        tableName: TABLE_NAME,
        itemId,
        found: !!result.Item,
        dynamoDuration,
      });

      return {
        statusCode: result.Item ? 200 : 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.Item ?? { error: 'Not found' }),
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body ?? '{}');
      const newItem = { id: crypto.randomUUID(), ...body, createdAt: new Date().toISOString() };
      const dynamoStart = Date.now();

      await client.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newItem,
        }),
      );

      const dynamoDuration = Date.now() - dynamoStart;

      log({
        level: 'INFO',
        message: 'DynamoDB write completed',
        requestId,
        operation: 'PutItem',
        tableName: TABLE_NAME,
        itemId: newItem.id,
        dynamoDuration,
      });

      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      };
    }

    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    log({
      level: 'ERROR',
      message: 'Request failed',
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
```

*ملاحظة:* `requestId` من API Gateway يصبح معرّف الترابط لهذا الطلب كله.

كل مدخل سجل يتضمن `requestId` نفسه. فالطلب الواحد ينتج مدخلات سجل متعددة—`Request started` و`DynamoDB read completed` وربما `Request failed`—كلها مرتبطة بمعرّف الترابط.

## الاستعلام بمعرّف الترابط

عندما تحتاج إلى تتبع طلب محدد، تشغّل استعلام Logs Insights يصفّي حسب `requestId`:

```
fields @timestamp, level, message, requestId, operation, dynamoDuration, error
| filter requestId = "abc-123-def-456"
| sort @timestamp asc
```

يعيد هذا كل مدخل سجل لذلك الطلب بترتيب زمني. ويمكنك أن ترى:

1. متى بدأ الطلب
2. أي طريقة ومسار استُخدما
3. هل نجحت عملية DynamoDB
4. كم استغرقت DynamoDB
5. هل فشل الطلب ولماذا

### تشغيل الاستعلام من CLI

```bash
aws logs start-query \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --start-time $(date -v-1H +%s) \
  --end-time $(date +%s) \
  --query-string 'fields @timestamp, level, message, requestId, operation, dynamoDuration, error | filter requestId = "abc-123-def-456" | sort @timestamp asc' \
  --region us-east-1 \
  --output json
```

ثم اجلب النتائج:

```bash
aws logs get-query-results \
  --query-id "your-query-id-here" \
  --region us-east-1 \
  --output json
```

## استعلامات تتبّع شائعة

إلى جانب البحث عن طلب واحد، تساعدك استعلامات Insights على اكتشاف الأنماط.

### إيجاد أبطأ عمليات DynamoDB

```
fields @timestamp, requestId, operation, dynamoDuration, itemId
| filter dynamoDuration > 0
| sort dynamoDuration desc
| limit 20
```

يُظهر لك هذا الطلبات التي كانت تفاعلاتها مع قاعدة البيانات هي الأبطأ. وإذا رأيت عمليات `GetItem` تستغرق 200+ مللي ثانية بانتظام، فقد يكون لديك مفتاح قسم ساخن—راجع [جداول ومفاتيح DynamoDB](https://stevekinney.com/courses/aws/dynamodb-tables-and-keys) لتصميم المفاتيح.

### إيجاد كل الطلبات الفاشلة في الساعة الأخيرة

```
fields @timestamp, requestId, message, error
| filter level = "ERROR"
| sort @timestamp desc
| limit 50
```

### ربط الأخطاء بعمليات محددة

```
fields @timestamp, requestId, operation, error
| filter level = "ERROR" and operation = "PutItem"
| sort @timestamp desc
```

يُظهر لك هذا إخفاقات الكتابة فقط—ربما لا تملك دالة Lambda أذونات كافية للكتابة إلى DynamoDB (تحقق من دور التنفيذ الذي أعددته في [أدوار وأذونات تنفيذ Lambda](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions)).

### حساب نسب زمن استجابة DynamoDB المئوية

```
filter message = "DynamoDB read completed"
| stats avg(dynamoDuration) as avgLatency,
        pct(dynamoDuration, 95) as p95Latency,
        pct(dynamoDuration, 99) as p99Latency
  by bin(5m)
```

يمنحك هذا عرضًا لسلاسل زمنية لزمن استجابة القراءة من قاعدة بياناتك، مقسّمًا إلى حزم من 5 دقائق. وإذا كان p99 يرتفع مع الوقت، فشيء ما يتغير—ربما حجم جدول متزايد، وربما تحوّل في أنماط الوصول.

## تجميع مسار الطلب الكامل

إليك كيف يبدو طلب متتبَّع عندما تجمع كل شيء. يستدعي مستخدم واجهة API الخاصة بك، فتعيد بناء المسار الكامل من السجلات:

**الخطوة 1: يستقبل API Gateway الطلب.** يمكنك رؤية ذلك في سجلات وصول API Gateway (إن كانت مفعّلة) أو استنتاجه من أول مدخل في سجل Lambda. ويصبح `requestId` من API Gateway معرّف الترابط الخاص بك.

**الخطوة 2: تبدأ Lambda التنفيذ.** يُطلق أول مدخل سجل مهيكل: `Request started` مع `requestId` والطريقة والمسار ومعاملات الاستعلام.

**الخطوة 3: تستدعي Lambda خدمة DynamoDB.** يلتقط مدخل سجلك نوع العملية واسم الجدول وكم استغرق الاستدعاء.

**الخطوة 4: تعيد Lambda استجابة.** إذا نجح الطلب، يقول مدخل السجل الأخير `Request completed` مع رمز الحالة والمدة الإجمالية. وإذا فشل، يلتقط مدخل الخطأ رسالة الخطأ وتتبّع المكدس.

استعلام Logs Insights يعيد بناء هذا الجدول الزمني:

```
fields @timestamp, level, message, operation, dynamoDuration, error
| filter requestId = "abc-123-def-456"
| sort @timestamp asc
```

قد تبدو النتيجة هكذا:

| @timestamp | level | message | operation | dynamoDuration | error |
| --- | --- | --- | --- | --- | --- |
| 14:30:00.100 | INFO | Request started |  |  |  |
| 14:30:00.145 | INFO | DynamoDB read completed | GetItem | 42 |  |
| 14:30:00.150 | INFO | Request completed |  |  |  |

ثلاثة مدخلات سجل، و50 مللي ثانية إجمالًا، منها 42 قضتها DynamoDB. ولو فشل هذا الطلب، لاستُبدل مدخل `Request completed` بمدخل `Request failed` مع رسالة خطأ وتتبّع مكدس.

## أبعد من التتبع اليدوي

ما بنيته هنا—معرّفات الترابط مع التسجيل المهيكل مع استعلامات Insights—هو أساس تتبّع الطلبات. وتقدّم AWS تتبعًا أكثر تطورًا عبر **AWS X-Ray**، الذي يزوّد استدعاءات SDK بالقياس تلقائيًا وينتج خرائط خدمة مرئية. فـ X-Ray هي البنية التحتية الأساسية، و**CloudWatch Application Signals** (متاحة عمومًا في يوليو 2024) هي واجهة وحدة التحكم الحديثة التي تعرض فيها التتبعات الموزعة وخرائط الخدمة واتفاقيات مستوى الخدمة (SLOs). والمسار مفتوح المصدر هو **AWS Distro for OpenTelemetry (ADOT)**—توزيعة OpenTelemetry المدعومة من AWS، التي تتيح لك إرسال التتبعات إلى X-Ray *وإلى* خلفيات خارجية متوافقة مع OTLP (Datadog وHoneycomb وGrafana Tempo). وإذا صادفت وصفًا وظيفيًا يطلب «OpenTelemetry on AWS»، فـ ADOT هي المقصودة. وكل الثلاثة خارج نطاق هذه الدورة، لكن أنماط التسجيل المهيكل التي تعلمتها هنا تعمل إلى جانبها—فمعرّفات الترابط والسجلات المهيكلة هي الحد الأدنى القابل للتطبيق من القابلية للملاحظة لأي تطبيق إنتاجي.

> **نصيحة**
>
> إذا أعادت واجهتك الأمامية معرّف طلب إلى المستخدم (في ترويسة استجابة أو رسالة خطأ)، تصبح حوادث الدعم أسهل بكثير. يقول المستخدم «حصلت على الخطأ abc-123»، وتشغّل استعلام Insights، فتحصل على التتبع الكامل في ثوانٍ.

لديك الآن مكدّس المراقبة الكامل: سجلات مهيكلة يمكنك الاستعلام عنها، ولوحات مقاييس يمكنك إلقاء نظرة عليها، وإنذارات تخبرك عندما تتعطل الأشياء، ومعرّفات ترابط تتيح لك تتبع الطلبات الفردية عبر الخدمات. وفي التمرين التالي، ستضع مهارات الإنذار موضع التطبيق—بإنشاء إنذارات للأخطاء والمدة لدالة Lambda، وربطها بـ SNS، وإطلاقها عمدًا للتحقق من أن خط الأنابيب يعمل من البداية إلى النهاية.
