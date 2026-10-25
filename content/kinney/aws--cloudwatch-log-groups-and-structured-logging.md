---
title: "مجموعات السجلات وتدفقاتها والتسجيل المهيكل"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudwatch-log-groups-and-structured-logging"
---

كل `console.log` كتبته في دوال Lambda لديك كان يصل إلى CloudWatch Logs منذ [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function). السجلات موجودة — لكن إن سبق أن حاولت العثور على خطأ محدّد في جدار نصي غير مهيكل، فأنت تعلم أن امتلاك السجلات والقدرة على استخدامها أمران مختلفان.

إذا أردت أن تطّلع على نسخة AWS من واجهة خدمة التسجيل أثناء القراءة، فإن [نظرة CloudWatch العامة](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) هي المرجع الرسمي الذي يُستحسن إبقاؤه قريبًا.

في هذا الدرس، ستتعلم كيف تنظّم CloudWatch السجلات، وكيف تنتقل من `console.log('something happened')` إلى تسجيل JSON مهيكل، وكيف تستعلم عن سجلاتك باستخدام CloudWatch Logs Insights — لغة استعلام شبيهة بـ SQL تجعل سجلاتك قابلة للبحث فعلًا.

## مجموعات السجلات وتدفقاتها

تنظّم CloudWatch السجلات في مستويين: **مجموعات السجلات** (log groups) و**تدفقات السجلات** (log streams).

**مجموعة السجلات** حاوية لسجلات مصدر واحد. تُنشئ Lambda مجموعة تلقائيًا لكل دالة، وفق اصطلاح التسمية `/aws/lambda/<function-name>`. وتحصل دالتك على `/aws/lambda/my-frontend-app-api`. ويمكن لـ API Gateway أيضًا أن يكتب إلى مجموعات السجلات إذا مكّنت تسجيل الوصول (وهو مشمول في [مراحل API Gateway والنطاقات المخصّصة](https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains)).

**تدفق السجلات** سلسلة من أحداث السجل داخل مجموعة سجلات. وتنشئ Lambda تدفق سجلات جديدًا لكل بيئة تنفيذ. فإذا توسّعت دالتك إلى ثلاث بيئات متزامنة، فسترى ثلاثة تدفقات سجلات. ويتضمن اسم كل تدفق التاريخ ومعرّفًا فريدًا — شيء مثل `2026/03/18/[$LATEST]a1b2c3d4e5f6`.

لرؤية مجموعات سجلاتك من CLI:

```bash
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \
  --region us-east-1 \
  --output json
```

لسرد تدفقات السجلات داخل مجموعة:

```bash
aws logs describe-log-streams \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --order-by LastEventTime \
  --descending \
  --limit 5 \
  --region us-east-1 \
  --output json
```

## إعدادات الاحتفاظ

افتراضيًا، تحتفظ CloudWatch Logs بسجلاتك **إلى الأبد**. وهذا ليس ما تريده غالبًا. تتراكم السجلات، وتنمو تكاليف التخزين، ولا أحد يقرأ مخرجات تصحيح عمرها ستة أشهر.

اضبط سياسة احتفاظ على مجموعة سجلاتك:

```bash
aws logs put-retention-policy \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --retention-in-days 30 \
  --region us-east-1 \
  --output json
```

تشمل قيم الاحتفاظ الصالحة 1 و3 و5 و7 و14 و30 و60 و90 و120 و150 و180 و365 و400 و545 و731 و1096 و1827 و2192 و2557 و2922 و3288 و3653 يومًا. وللتطوير، 30 يومًا معقولة. وللإنتاج، تمنحك 90 يومًا تاريخًا كافيًا للتحقيق في الحوادث دون دفع تكلفة تخزين سنوات.

> **تحذير**
>
> إذا لم تضبط سياسة احتفاظ، فستنمو تكاليف تخزين سجلاتك بلا حد. وهذا أحد افتراضات AWS التي تكلّفك المال بصمت مع مرور الوقت.

يعيش الاحتفاظ على مجموعة السجلات، لا على الدالة. فإذا حذفت الدالة وأعدت نشرها، تنشئ Lambda مجموعة سجلات جديدة باحتفاظ لا نهائي — ويضيع إعداد الاحتفاظ لديك. لذلك كوّد الاحتفاظ في البنية التحتية كشيفرة (IaC) لديك (فبنية `Function` في CDK تكشف `logRetention`)، أو أنشئ مجموعة السجلات مسبقًا مع ضبط الاحتفاظ قبل نشر الدالة.

### باستخدام SDK

```typescript
import {
  CloudWatchLogsClient,
  PutRetentionPolicyCommand,
  DescribeLogGroupsCommand,
  StartQueryCommand,
  GetQueryResultsCommand,
} from '@aws-sdk/client-cloudwatch-logs';

const logs = new CloudWatchLogsClient({ region: 'us-east-1' });

await logs.send(
  new PutRetentionPolicyCommand({
    logGroupName: '/aws/lambda/my-frontend-app-api',
    retentionInDays: 30,
  }),
);

// Programmatic Insights query — useful for building small status pages
// or dashboards outside the AWS console.
const started = await logs.send(
  new StartQueryCommand({
    logGroupName: '/aws/lambda/my-frontend-app-api',
    startTime: Math.floor((Date.now() - 60 * 60 * 1000) / 1000),
    endTime: Math.floor(Date.now() / 1000),
    queryString: 'fields @timestamp, @message | filter level = "ERROR" | limit 20',
  }),
);

// Poll for completion (StartQuery is async):
let result;
do {
  await new Promise((r) => setTimeout(r, 500));
  result = await logs.send(new GetQueryResultsCommand({ queryId: started.queryId }));
} while (result.status === 'Running' || result.status === 'Scheduled');
console.log(result.results);
```

## مشكلة `console.log`

هكذا يسجّل معظم المطورين في دوال Lambda:

```typescript
console.log('Processing request for user:', userId);
console.log('Database query took', duration, 'ms');
console.log('Error:', error.message);
```

هذا يعمل. يمكنك قراءته في CloudWatch. لكن حين تكون لديك آلاف إدخالات السجل من مئات الاستدعاءات، فإن البحث عن «كل أخطاء المستخدم abc-123» يعني التمرير عبر نص غير مهيكل والأمل في أن تلتقطه عيناك.

المشكلة الجوهرية: يُنتج `console.log` سلاسل نصية. والسلاسل النصية يصعب تصفيتها وتجميعها والاستعلام عنها برمجيًا.

## تسجيل JSON المهيكل

**التسجيل المهيكل** (structured logging) يعني كتابة إدخالات السجل كائنات JSON بدلًا من سلاسل نصية عادية. ويمكن لـ CloudWatch Logs Insights تحليل JSON تلقائيًا، ما يعني أن كل حقل في JSON يصبح عمودًا قابلًا للبحث والتصفية.

هكذا يبدو التسجيل المهيكل عمليًا:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface LogEntry {
  level: string;
  message: string;
  requestId?: string;
  userId?: string;
  duration?: number;
  error?: string;
  [key: string]: unknown;
}

function log(entry: LogEntry): void {
  console.log(JSON.stringify(entry));
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const requestId = event.requestContext?.requestId ?? 'unknown';
  const userId = event.queryStringParameters?.userId;

  log({
    level: 'INFO',
    message: 'Request received',
    requestId,
    userId,
    path: event.rawPath,
    method: event.requestContext?.http?.method,
  });

  const start = Date.now();

  try {
    // Your business logic here
    const result = { greeting: `Hello, ${userId ?? 'World'}!` };
    const duration = Date.now() - start;

    log({
      level: 'INFO',
      message: 'Request completed',
      requestId,
      userId,
      duration,
      statusCode: 200,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (error) {
    const duration = Date.now() - start;

    log({
      level: 'ERROR',
      message: 'Request failed',
      requestId,
      userId,
      duration,
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
```

*ملاحظة:* يحلّل CloudWatch Logs Insights JSON تلقائيًا، ما يجعل كل حقل قابلًا للاستعلام.

الفرق الجوهري: بدلًا من `console.log('Error:', error.message)`، تكتب `console.log(JSON.stringify({ level: 'ERROR', message: 'Request failed', error: error.message }))`. كل إدخال سجل كائن JSON من سطر واحد يمكن لـ CloudWatch تحليله وفهرسته.

> **نصيحة**
>
> لست بحاجة إلى مكتبة تسجيل. فدالة مساعدة بسيطة باسم `log` تستدعي `console.log(JSON.stringify(entry))` هي كل ما تحتاجه في Lambda. ومكتبات مثل `pino` أو `winston` تضيف ميزات لا تحتاجها عمومًا في سياق بلا خوادم — فالمبتغى هو مخرجات JSON مهيكلة، و`JSON.stringify` توصلك إلى ذلك.

## الاستعلام باستخدام CloudWatch Logs Insights

**CloudWatch Logs Insights** لغة استعلام للبحث في بيانات السجلات وتحليلها. فإن كنت قد استخدمت SQL، فستبدو الصياغة مألوفة. وإن كنت قد استخدمت أدوات مطوّري المتصفح لتصفية مخرجات وحدة التحكم، فهذه هي النسخة الصناعية القوية.

### الاستعلامات الأساسية

اعثر على أحدث 25 إدخال سجل:

```
fields @timestamp, @message
| sort @timestamp desc
| limit 25
```

صفِّ الأخطاء فقط (بافتراض تسجيل JSON المهيكل):

```
fields @timestamp, level, message, error, requestId
| filter level = "ERROR"
| sort @timestamp desc
| limit 50
```

اعثر على كل طلبات مستخدم محدّد:

```
fields @timestamp, level, message, userId, duration
| filter userId = "abc-123"
| sort @timestamp desc
```

### استعلامات التجميع

احسب الأخطاء لكل ساعة:

```
filter level = "ERROR"
| stats count(*) as errorCount by bin(1h)
| sort errorCount desc
```

احصل على متوسط مدة الطلب والمئين 95:

```
filter level = "INFO" and message = "Request completed"
| stats avg(duration) as avgDuration,
        pct(duration, 95) as p95Duration
  by bin(5m)
```

اعثر على أبطأ الطلبات:

```
filter level = "INFO" and message = "Request completed"
| sort duration desc
| limit 10
```

### تشغيل استعلامات Insights من CLI

يمكنك تشغيل استعلامات Insights من سطر الأوامر باستخدام `aws logs start-query` و`aws logs get-query-results`. يعمل الاستعلام بشكل غير متزامن — فتبدأه، وتحصل على معرّف استعلام، ثم تستعلم عن النتائج.

```bash
# macOS
aws logs start-query \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --start-time $(date -v-1H +%s) \
  --end-time $(date +%s) \
  --query-string 'fields @timestamp, level, message, duration | filter level = "ERROR" | sort @timestamp desc | limit 20' \
  --region us-east-1 \
  --output json

# Linux
aws logs start-query \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --start-time $(date -d '1 hour ago' +%s) \
  --end-time $(date +%s) \
  --query-string 'fields @timestamp, level, message, duration | filter level = "ERROR" | sort @timestamp desc | limit 20' \
  --region us-east-1 \
  --output json
```

يُرجع هذا معرّف استعلام:

```json
{
  "queryId": "a1b2c3d4-5678-90ab-cdef-example11111"
}
```

اجلب النتائج:

```bash
aws logs get-query-results \
  --query-id "a1b2c3d4-5678-90ab-cdef-example11111" \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> يتوقع المعاملان `--start-time` و`--end-time` طوابع زمنية بنظام epoch (الثواني منذ 1 يناير 1970). على macOS، يعطيك `date -v-1H +%s` «قبل ساعة» كطابع زمني بنظام epoch. وعلى Linux، استخدم `date -d '1 hour ago' +%s`.

### مرجع صياغة استعلامات Insights

| الأمر | الغرض | مثال |
| --- | --- | --- |
| `fields` | اختيار الحقول التي تُعرض | `fields @timestamp, level, message` |
| `filter` | الإبقاء على السجلات المطابقة فقط | `filter level = "ERROR"` |
| `stats` | تجميع البيانات | `stats count(*) by level` |
| `sort` | ترتيب النتائج | `sort @timestamp desc` |
| `limit` | تحديد الحد الأقصى لعدد النتائج | `limit 25` |
| `parse` | استخراج حقول من نص غير مهيكل | `parse @message "User * performed *" as user, action` |

تشير البادئة `@` إلى حقول نظام تضيفها CloudWatch تلقائيًا: `@timestamp` و`@message` و`@logStream` و`@log`. أما حقول JSON المهيكلة لديك (مثل `level` و`requestId` و`duration`) فتُشار إليها دون البادئة `@`.

## التسجيل المهيكل مقابل النص العادي: العائد

إليك سيناريو التصحيح نفسه بالطريقتين.

**سجلات نصية عادية**: «اعثر على كل الطلبات الفاشلة للمستخدم abc-123 في الساعة الأخيرة». تفتح مجموعة السجلات، وتتمرّر عبر عشرات التدفقات، وتضغط `Ctrl+F` بحثًا عن «abc-123»، وتأمل أن تكون رسالة الخطأ قريبة من معرّف المستخدم في مخرجات السجل.

**سجلات JSON مهيكلة**: تشغّل استعلام Insights:

```
fields @timestamp, message, error, duration
| filter level = "ERROR" and userId = "abc-123"
| sort @timestamp desc
```

تظهر النتائج في ثوانٍ، مع استخراج كل حقل بعناية. وترى رسالة الخطأ، ومدة الطلب، والطابع الزمني لكل فشل. لا تمرير، ولا تخمين.

الدقائق الخمس التي تقضيها في الانتقال إلى التسجيل المهيكل تسدّد تكلفتها أول مرة تصحّح فيها مشكلة في الإنتاج عند الساعة 11 مساءً. لقد تعلمت هذا بالطريقة الصعبة — لا شيء يضاهي التمرير عبر نص غير مهيكل في منتصف الليل وأنت تتمنى لو أنفقت تلك الدقائق الخمس مبكرًا.

> **نصيحة**
>
> إذا أردت أغلفة التسجيل المهيكل دون كتابتها بنفسك، فإن **AWS Lambda Powertools for TypeScript** (`@aws-lambda-powertools/logger` و`metrics` و`tracer`) تتعامل مع معرّفات الارتباط وتنسيق سجلات JSON وإصدار المقاييس المخصّصة ببضعة أسطر من الإعداد. وهي مُدارة من AWS والمعيار الفعلي في دوال Lambda المكتوبة بـ TypeScript في الإنتاج.

الآن وقد أصبحت سجلاتك مهيكلة وقابلة للاستعلام، حان وقت النظر إلى الجانب الآخر من CloudWatch: المقاييس التي تنشرها Lambda وAPI Gateway وDynamoDB تلقائيًا. في الدرس التالي، ستبني لوحة معلومات تمنحك رؤية واحدة لصحة تطبيقك.
