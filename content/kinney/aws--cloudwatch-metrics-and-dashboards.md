---
title: "المقاييس ولوحات المعلومات"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudwatch-metrics-and-dashboards"
---

تخبرك السجلات بما حدث. أما **المقاييس** (metrics) فتخبرك كيف تسير الأمور. كل خدمة AWS نشرتها في هذه الدورة — Lambda وAPI Gateway وDynamoDB — تنشر قياسات رقمية إلى CloudWatch على فترات منتظمة. أعداد الاستدعاءات، ومعدّلات الأخطاء، ومئينات زمن الاستجابة، والطلبات المقيّدة. وقد كانت هذه البيانات تتراكم منذ أن نشرت دالة Lambda لأول مرة. لكنك لم تنظر إليها بعد.

إذا أردت أن تطّلع على نسخة AWS من نموذج المقاييس أثناء القراءة، فإن [نظرة CloudWatch العامة](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) هي المرجع المعتمد.

في هذا الدرس، ستتعلم أي المقاييس تهم لكل خدمة، وكيف تستعلم عنها من CLI، وكيف تبني لوحة معلومات CloudWatch تعرض صحة تطبيقك بنظرة واحدة.

## كيف تعمل المقاييس

**المقياس** سلسلة نقاط بيانات مرتبة زمنيًا. ولكل نقطة بيانات طابع زمني وقيمة ووحدة. وتنشر Lambda نقطة بيانات `Duration` في كل مرة تعمل فيها دالتك — والقيمة هي زمن التنفيذ بالمللي ثانية. وعلى مدى يوم، قد يكون لديك آلاف نقاط بيانات `Duration`، ويمكن لـ CloudWatch تجميعها في متوسطات أو قيم عظمى أو مئينات أو مجاميع على أي نافذة زمنية تختارها.

تُنظّم المقاييس حسب **مساحة الأسماء** (الخدمة التي نشرتها)، و**اسم المقياس** (ما يُقاس)، و**الأبعاد** (أي مورد محدّد داخل تلك الخدمة). مثلًا:

- مساحة الأسماء: `AWS/Lambda`
- اسم المقياس: `Duration`
- البُعد: `FunctionName = my-frontend-app-api`

يحدّد هذا المزيج بشكل فريد «كم تستغرق دالة Lambda الخاصة بي للتنفيذ؟»

## المقاييس الرئيسية حسب الخدمة

لست بحاجة إلى مراقبة كل مقياس تنشره AWS. وهذه هي المقاييس التي تهم لواجهة خلفية لتطبيق أمامي.

### Lambda (`AWS/Lambda`)

| المقياس | ما يخبرك به | الإحصاءة التي تراقبها |
| --- | --- | --- |
| `Invocations` | عدد مرات تشغيل دالتك | `Sum` — إجمالي حجم الاستدعاءات |
| `Errors` | عدد الاستدعاءات التي أرجعت خطأً | `Sum` — إجمالي حالات الفشل |
| `Duration` | مدة كل استدعاء (بالملي ثانية) | `Average` و`p95` — زمن الاستجابة النموذجي والأسوأ |
| `Throttles` | الاستدعاءات المرفوضة بسبب حدود التزامن | `Sum` — يجب أن تكون صفرًا |
| `ConcurrentExecutions` | عدد البيئات العاملة في الوقت نفسه | `Maximum` — ذروة التزامن |

معدّل الأخطاء هو `Errors / Invocations`. فإذا كانت `Invocations` تساوي 1,000 و`Errors` تساوي 50، فمعدّل أخطائك 5%. وهذا أهم مقياس منفرد لأي واجهة خلفية API. ولو كان بوسعي مراقبة رقم واحد فقط، لكان هذا هو.

### API Gateway (`AWS/ApiGateway`)

| المقياس | ما يخبرك به | الإحصاءة التي تراقبها |
| --- | --- | --- |
| `Count` | إجمالي طلبات API | `Sum` — حجم حركة المرور |
| `4XXError` | أخطاء العميل (طلبات سيئة، غير موجود، غير مصرّح) | `Sum` و`Average` — المعدّل المرتفع يعني أن عقد API غير واضح أو أن العملاء يسيئون التصرف |
| `5XXError` | أخطاء الخادم (فشلت دالة Lambda أو انتهت مهلتها) | `Sum` — يجب أن تكون قريبة من الصفر |
| `Latency` | الزمن الكلي من استلام الطلب إلى الاستجابة (بالملي ثانية) | `Average` و`p95` |
| `IntegrationLatency` | الزمن الذي قضته دالة Lambda تحديدًا (بالملي ثانية) | `Average` — قارنه بـ `Latency` لترى الحمل الإضافي لـ API Gateway |

الفجوة بين `Latency` و`IntegrationLatency` هي الحمل الإضافي لـ API Gateway. فإذا كانت `IntegrationLatency` تساوي 50 مللي ثانية بينما `Latency` تساوي 200 مللي ثانية، فإن API Gateway يضيف 150 مللي ثانية — وقد يشير ذلك إلى بدء بارد أو حمل إضافي من التفويض.

> **نصيحة**
>
> تستخدم مقاييس API Gateway البُعد `ApiId` (المعرّف الفريد لواجهتك) بدلًا من اسم API. ويمكنك العثور على معرّف API باستخدام `aws apigatewayv2 get-apis --region us-east-1 --output json`.

### DynamoDB (`AWS/DynamoDB`)

| المقياس | ما يخبرك به | الإحصاءة التي تراقبها |
| --- | --- | --- |
| `ConsumedReadCapacityUnits` | معدّل النقل القرائي المستهلك | `Sum` — مقدار سعة القراءة التي تستخدمها |
| `ConsumedWriteCapacityUnits` | معدّل النقل الكتابي المستهلك | `Sum` — مقدار سعة الكتابة التي تستخدمها |
| `ThrottledRequests` | الطلبات المرفوضة بسبب حدود معدّل النقل | `Sum` — يجب أن تكون صفرًا في الجداول عند الطلب |
| `SuccessfulRequestLatency` | الزمن الذي استغرقته DynamoDB لمعالجة طلب (بالملي ثانية) | `Average` — DynamoDB سريعة؛ فإن ارتفع هذا فثمة خطب في نمط وصولك |
| `SystemErrors` | أخطاء DynamoDB الداخلية | `Sum` — نادرة، لكنها تستحق المراقبة |

إذا كنت تستخدم وضع السعة عند الطلب (الذي أعددته في [ما هي DynamoDB؟](https://stevekinney.com/courses/aws/what-is-dynamodb))، فينبغي أن يبقى `ThrottledRequests` عند الصفر ما لم تكن تصل إلى حدود على مستوى الحساب.

## الاستعلام عن المقاييس من CLI

يمكنك سحب بيانات المقاييس مباشرة من سطر الأوامر باستخدام `aws cloudwatch get-metric-statistics`. وهذا مفيد للفحوص السريعة دون فتح لوحة التحكم.

احصل على عدد أخطاء Lambda للساعة الأخيرة:

```bash
# macOS
START=$(date -v-1H -u +%Y-%m-%dT%H:%M:%SZ)
# Linux
START=$(date -d '1 hour ago' -u +%Y-%m-%dT%H:%M:%SZ)

aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Errors \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --start-time $START \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 300 \
  --statistics Sum \
  --region us-east-1 \
  --output json
```

يُرجع هذا نقاط بيانات مجمّعة في حزم مدتها 5 دقائق (300 ثانية):

```json
{
  "Label": "Errors",
  "Datapoints": [
    {
      "Timestamp": "2026-03-18T14:00:00+00:00",
      "Sum": 0.0,
      "Unit": "Count"
    },
    {
      "Timestamp": "2026-03-18T14:05:00+00:00",
      "Sum": 2.0,
      "Unit": "Count"
    }
  ]
}
```

احصل على متوسط مدة Lambda للساعة الأخيرة:

```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --start-time $START \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 300 \
  --statistics Average Maximum \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> يمكنك طلب إحصاءات متعددة في استدعاء واحد بسردها بعد `--statistics`. فـ `Average Maximum` يمنحك المدة النموذجية والأسوأ في الاستجابة نفسها.

## إنشاء لوحة معلومات CloudWatch

**لوحة المعلومات** صفحة قابلة للتخصيص من الودجات (widgets) تعرض المقاييس. فبدلًا من تشغيل أوامر CLI كلما أردت فحص صحة تطبيقك، تبني لوحة معلومات مرة واحدة وتلقي عليها نظرة كلما احتجت.

### إنشاء لوحة المعلومات

تُعرَّف لوحات معلومات CloudWatch بصيغة JSON. وتحدّد كل ودجة المقاييس التي تُرسم بيانيًا وكيفية عرضها. وهذه لوحة معلومات بثلاث ودجات: أخطاء Lambda، ومدة Lambda، وزمن استجابة API Gateway.

```bash
aws cloudwatch put-dashboard \
  --dashboard-name my-frontend-app-dashboard \
  --dashboard-body '{
    "widgets": [
      {
        "type": "metric",
        "x": 0,
        "y": 0,
        "width": 12,
        "height": 6,
        "properties": {
          "title": "Lambda Errors",
          "metrics": [
            ["AWS/Lambda", "Errors", "FunctionName", "my-frontend-app-api", {"stat": "Sum", "period": 300}]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": "us-east-1"
        }
      },
      {
        "type": "metric",
        "x": 12,
        "y": 0,
        "width": 12,
        "height": 6,
        "properties": {
          "title": "Lambda Duration (ms)",
          "metrics": [
            ["AWS/Lambda", "Duration", "FunctionName", "my-frontend-app-api", {"stat": "Average", "period": 300}],
            ["AWS/Lambda", "Duration", "FunctionName", "my-frontend-app-api", {"stat": "p95", "period": 300}]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": "us-east-1"
        }
      },
      {
        "type": "metric",
        "x": 0,
        "y": 6,
        "width": 12,
        "height": 6,
        "properties": {
          "title": "API Gateway Latency (ms)",
          "metrics": [
            ["AWS/ApiGateway", "Latency", "ApiId", "your-api-id", {"stat": "Average", "period": 300}],
            ["AWS/ApiGateway", "Latency", "ApiId", "your-api-id", {"stat": "p95", "period": 300}]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": "us-east-1"
        }
      },
      {
        "type": "metric",
        "x": 12,
        "y": 6,
        "width": 12,
        "height": 6,
        "properties": {
          "title": "DynamoDB Throttled Requests",
          "metrics": [
            ["AWS/DynamoDB", "ThrottledRequests", "TableName", "my-frontend-app-data", {"stat": "Sum", "period": 300}]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": "us-east-1"
        }
      }
    ]
  }' \
  --region us-east-1 \
  --output json
```

تتحكم خاصيتا `x` و`y` في موضع الودجة على شبكة من 24 عمودًا. وتتحكم خاصيتا `width` و`height` في الحجم. وودجتان جنبًا إلى جنب بعرض 12 لكل منهما تملآن الصف كاملًا.

لعرض المئينات، يقبل JSON لوحة معلومات CloudWatch الصيغة المختصرة للإحصاءة مثل `"stat": "p95"`. ولست بحاجة إلى كتابتها `p95.00`.

### التحقق من لوحة المعلومات

```bash
aws cloudwatch list-dashboards \
  --region us-east-1 \
  --output json
```

يمكنك أيضًا فتح لوحة تحكم CloudWatch في متصفحك، والانتقال إلى **Dashboards**، ورؤية `my-frontend-app-dashboard` مع عرض جميع الودجات الأربع بيانات حقيقية.

> **تحذير**
>
> لوحات معلومات CloudWatch مجانية لأول ثلاث لوحات (حتى 50 مقياسًا لكل منها). وبعد ذلك، تكلّف كل لوحة 3 دولارات شهريًا. ولتطبيق واحد، لوحة واحدة بعدد قليل من الودجات هي كل ما تحتاجه.

## باستخدام SDK

```typescript
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  PutDashboardCommand,
  PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

const cloudwatch = new CloudWatchClient({ region: 'us-east-1' });

// Emit a custom metric from application code. This is how you get metrics
// for things CloudWatch doesn't produce automatically (sign-ups, cart
// conversions, business KPIs).
await cloudwatch.send(
  new PutMetricDataCommand({
    Namespace: 'MyFrontendApp',
    MetricData: [{ MetricName: 'SignUps', Value: 1, Unit: 'Count' }],
  }),
);

// Read aggregated metrics back:
const stats = await cloudwatch.send(
  new GetMetricStatisticsCommand({
    Namespace: 'AWS/Lambda',
    MetricName: 'Errors',
    Dimensions: [{ Name: 'FunctionName', Value: 'my-frontend-app-api' }],
    StartTime: new Date(Date.now() - 60 * 60 * 1000),
    EndTime: new Date(),
    Period: 300,
    Statistics: ['Sum'],
  }),
);

// Create or overwrite a dashboard:
await cloudwatch.send(
  new PutDashboardCommand({
    DashboardName: 'my-frontend-app',
    DashboardBody: JSON.stringify({
      widgets: [
        {
          type: 'metric',
          properties: {
            metrics: [['AWS/Lambda', 'Errors', 'FunctionName', 'my-frontend-app-api']],
            stat: 'Sum',
            period: 60,
            region: 'us-east-1',
          },
        },
      ],
    }),
  }),
);
```

## اختيار الإحصاءة الصحيحة

تدعم المقاييس إحصاءات متعددة، واختيار الإحصاءة الخاطئة يمنحك صورة مضللة.

- **Sum**: العدد الإجمالي. استخدمها مع `Invocations` و`Errors` و`Throttles` و`Count`. «كم خطأ حدث في الساعة الأخيرة؟»
- **Average**: المتوسط الحسابي. استخدمها مع `Duration` و`Latency`. «ما زمن الاستجابة النموذجي؟» كن حذرًا — فالمتوسطات تخفي القيم الشاذة.
- **Maximum**: أسوأ حالة في الفترة. مفيدة لرصد حالات البدء البارد في `Duration`.
- **p95 / p99**: إحصاءات المئينات. «اكتملت 95% من الطلبات خلال X مللي ثانية.» وهذا مفيد دائمًا تقريبًا أكثر من Average لمقاييس زمن الاستجابة، لأنه يريك ما يعيشه أبطأ مستخدميك.
- **SampleCount**: عدد نقاط البيانات التي جُمّعت. مفيد للتحقق من أن دالتك تتلقى حركة مرور فعلًا.

لزمن الاستجابة، ارسم دائمًا Average وp95 معًا. فإن كانا متقاربين، فأداؤك متسق. وإن كان p95 ثلاثة أضعاف المتوسط، فلديك قيم شاذة (غالبًا حالات بدء بارد) تستحق التحقيق.

يمكنك رؤية مقاييسك الآن ولديك لوحة معلومات. لكن لوحات المعلومات تتطلب منك أن تنظر إليها. في الدرس التالي، ستنشئ إنذارات تراقب هذه المقاييس نيابة عنك وترسل إشعارات بريد إلكتروني عندما يسوء شيء — لتكتشف المشكلات قبل مستخدميك.

## التنظيف

حين تنتهي من لوحة المعلومات، احذفها لتبقي مساحة عمل CloudWatch مرتبة:

```bash
aws cloudwatch delete-dashboards \
  --dashboard-names my-frontend-app-dashboard \
  --region us-east-1
```

لوحات معلومات CloudWatch مجانية لأول ثلاث، لذا فالأمر ليس شاغلًا فاتوريًا على نطاق الدورة — لكن تنظيف ما تنشئه عادة جيدة.
