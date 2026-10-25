---
title: "الإنذارات والإشعارات باستخدام SNS"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudwatch-alarms-and-sns"
---

لوحات المعلومات رائعة حين تنظر إليها بنشاط. أما الإنذارات فهي للحين الذي لا تنظر فيه. **إنذار CloudWatch** يراقب مقياسًا ويطلق إجراءً عندما يتجاوز ذلك المقياس حدًّا تحدّده أنت. والإجراء الأكثر شيوعًا: إرسال بريد إلكتروني إليك عبر **SNS** (خدمة الإشعارات البسيطة). تستيقظ على بريد يقول «ارتفع معدّل أخطاء Lambda عند الساعة 3 صباحًا» بدلًا من شكوى مستخدم عند الساعة 9 صباحًا.

إذا أردت أن تطّلع على نسخة AWS من أوليات المراقبة أثناء القراءة، فإن [نظرة CloudWatch العامة](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) هي المرجع الرسمي.

إذا كنت قد استخدمت إشعارات النشر في Vercel أو تنبيهات فشل GitHub Actions، فهذا هو المفهوم نفسه — إلا أنك تحدّد بالضبط ما يعنيه «الفشل» وكيف تُبلَّغ به.

```
flowchart LR
    Metric["CloudWatch metric"] --> Alarm["Alarm evaluates threshold<br/>period + evaluation windows"]
    Alarm --> State{"Alarm state"}
    State -- "OK" --> Healthy["No action or OK notification"]
    State -- "ALARM" --> SNS["SNS topic"]
    SNS --> Email["Email notification"]
    State -- "INSUFFICIENT_DATA" --> Wait["Wait for more data"]
```

## كيف تعمل الإنذارات

يتكوّن الإنذار من ثلاثة عناصر:

1. **مقياس تراقبه** — مثل `Errors` في Lambda من أجل `my-frontend-app-api`
2. **شرط** — مثل «مجموع الأخطاء أكبر من 5»
3. **إجراء** — مثل «أرسل إشعارًا إلى موضوع SNS هذا»

تقيّم الإنذارات الشرط على نافذة زمنية قابلة للضبط. وتحدّد **فترة** (مدة كل نافذة تقييم) و**فترات تقييم** (عدد النوافذ المتتالية التي يجب أن تتجاوز الحد قبل أن ينطلق الإنذار). وهذا يمنع الارتفاعات العابرة من إيقاظك ليلًا.

### حالات الإنذار

يكون كل إنذار في واحدة من ثلاث حالات في أي لحظة:

- **OK**: المقياس ضمن الحد. كل شيء على ما يرام.
- **ALARM**: تجاوز المقياس الحد لعدد فترات التقييم المطلوب. وهناك ما يستدعي الانتباه.
- **INSUFFICIENT_DATA**: لا تملك CloudWatch بيانات كافية لتقييم الشرط. وهذه هي الحالة الابتدائية لكل إنذار جديد. وهي أيضًا الحالة التي يدخلها إنذارك عندما لا تكون دالتك قد استُدعيت مؤخرًا — فلا استدعاءات تعني لا نقاط بيانات.

> **نصيحة**
>
> يبدأ الإنذار الجديد في `INSUFFICIENT_DATA`، لا في `OK`. وهذا طبيعي. وبمجرد أن تتلقى دالتك حركة مرور وتملك CloudWatch نقاط بيانات كافية لتقييم الشرط، سينتقل الإنذار إلى `OK` (أو إلى `ALARM`، إن كان يومك سيئًا).

في لوحة التحكم، تعرض صفحة **Alarms** إنذارك مع حالته الحالية وإعداد الإجراء ووقت آخر تحديث للحالة.

صفحة CloudWatch Alarms وهي تعرض إنذارًا واحدًا باسم my-frontend-app-api-errors في حالة Insufficient data مع تمكين الإجراءات.

## إعداد SNS

قبل إنشاء إنذار، تحتاج إلى مكان لإرسال الإشعارات إليه. **SNS** (خدمة الإشعارات البسيطة) هي خدمة المراسلة نشر/اشتراك في AWS. تُنشئ **موضوعًا** (قناة إشعارات)، وتشترك ببريدك الإلكتروني فيه، ثم توجّه إنذاراتك إلى ذلك الموضوع.

### إنشاء موضوع SNS

```bash
aws sns create-topic \
  --name my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

يُرجع هذا ARN الموضوع:

```json
{
  "TopicArn": "arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"
}
```

احفظ ذلك ARN — ستستخدمه عند إنشاء الإنذارات.

### الاشتراك ببريدك الإلكتروني

```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --protocol email \
  --notification-endpoint your-email@example.com \
  --region us-east-1 \
  --output json
```

```json
{
  "SubscriptionArn": "pending confirmation"
}
```

> **تحذير**
>
> **يجب** أن تؤكّد الاشتراك. ترسل AWS رسالة تأكيد إلى العنوان الذي حدّدته. انقر الرابط في تلك الرسالة. وإلى أن تؤكّد، لن تسلّم SNS الإشعارات — فستنطلق إنذاراتك، لكنك لن ترى الرسائل أبدًا.

### التحقق من الاشتراك

بعد التأكيد، افحص حالة الاشتراك:

```bash
aws sns list-subscriptions-by-topic \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

ينبغي أن يكون `SubscriptionArn` الآن ARN حقيقيًا بدلًا من `pending confirmation`.

## إنشاء إنذار لأخطاء Lambda

ينطلق هذا الإنذار عندما تنتج دالة Lambda أكثر من 5 أخطاء في فترة مدتها 5 دقائق، لفترتين متتاليتين.

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-errors \
  --alarm-description "Alarm when Lambda error count exceeds 5 in 5 minutes" \
  --namespace AWS/Lambda \
  --metric-name Errors \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

لنفكّك ما يفعله كل معامل:

- **`--period 300`**: كل نافذة تقييم مدتها 5 دقائق (300 ثانية).
- **`--evaluation-periods 2`**: يجب تجاوز الحد لفترتين متتاليتين (10 دقائق إجمالًا) قبل أن ينطلق الإنذار.
- **`--threshold 5`**: أكثر من 5 أخطاء في فترة واحدة يطلق تجاوزًا.
- **`--comparison-operator GreaterThanThreshold`**: ينطلق الإنذار عندما تكون القيمة **أكبر من** 5، لا مساوية لـ 5.
- **`--alarm-actions`**: موضوع SNS الذي يُبلَّغ عند انتقال الإنذار إلى `ALARM`.
- **`--ok-actions`**: موضوع SNS الذي يُبلَّغ عند عودة الإنذار إلى `OK`. وهذا اختياري لكنه مفيد — فأنت تريد معرفة متى تُحلّ المشكلة، لا متى تبدأ فقط.

## إنشاء إنذار لمدة تنفيذ Lambda

ينطلق هذا الإنذار عندما يتجاوز متوسط مدة تنفيذ دالتك 3 ثوانٍ — وهي علامة على أن شيئًا يعمل ببطء، ربما بسبب البدء البارد (cold starts) أو خدمة لاحقة تستغرق وقتًا طويلًا.

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-duration \
  --alarm-description "Alarm when average Lambda duration exceeds 3 seconds" \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 3000 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

لاحظ أن `Duration` يُقاس بالمللي ثانية، لذا فإن حدّ 3 ثوانٍ هو `3000`.

## إنشاء إنذار لأخطاء 5XX في API Gateway

ينطلق هذا الإنذار عندما تُرجع واجهة API أخطاء خادم — أي أن دالة Lambda تتعطّل أو تنتهي مهلتها.

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-5xx \
  --alarm-description "Alarm when API Gateway 5XX error count exceeds 0" \
  --namespace AWS/ApiGateway \
  --metric-name 5XXError \
  --dimensions Name=ApiId,Value=your-api-id \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 0 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

يستخدم هذا الإنذار فترة تقييم واحدة وحدًّا صفريًا — أي خطأ 5XX في أي نافذة مدتها 5 دقائق يطلقه فورًا. وأخطاء 5XX خطيرة بما يكفي لأن تريد معرفتها على الفور. (ثق بي في هذه.)

> **نصيحة**
>
> إذا كانت واجهة API تتلقى حركة مرور غير متكررة، فستبقى الإنذارات غالبًا في `INSUFFICIENT_DATA` بدلًا من `OK`. أضف `--treat-missing-data notBreaching` إلى أي أمر `put-metric-alarm` لمعاملة الفترات الخالية من البيانات على أنها غير متجاوزة — وهذا يتجنّب انتقالات الحالة المزعجة في البيئات منخفضة الحركة وأثناء التطوير.

## باستخدام SDK

```typescript
import { SNSClient, CreateTopicCommand, SubscribeCommand } from '@aws-sdk/client-sns';
import { CloudWatchClient, PutMetricAlarmCommand } from '@aws-sdk/client-cloudwatch';

const sns = new SNSClient({ region: 'us-east-1' });
const cloudwatch = new CloudWatchClient({ region: 'us-east-1' });

const topic = await sns.send(new CreateTopicCommand({ Name: 'my-frontend-app-alerts' }));
await sns.send(
  new SubscribeCommand({
    TopicArn: topic.TopicArn,
    Protocol: 'email',
    Endpoint: 'alerts@example.com',
  }),
);

await cloudwatch.send(
  new PutMetricAlarmCommand({
    AlarmName: 'my-frontend-app-lambda-errors',
    AlarmDescription: 'Lambda function errors exceeded threshold',
    MetricName: 'Errors',
    Namespace: 'AWS/Lambda',
    Dimensions: [{ Name: 'FunctionName', Value: 'my-frontend-app-api' }],
    Statistic: 'Sum',
    Period: 60,
    EvaluationPeriods: 1,
    Threshold: 5,
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    AlarmActions: [topic.TopicArn!],
    TreatMissingData: 'notBreaching',
  }),
);
```

## التحقق من إنذاراتك

اسرد كل إنذاراتك:

```bash
aws cloudwatch describe-alarms \
  --alarm-name-prefix my-frontend-app \
  --region us-east-1 \
  --output json
```

يعرض هذا الحالة الحالية لكل إنذار وإعداده ووقت آخر تغيّر لحالته.

## اختبار إنذار

يمكنك ضبط حالة إنذار يدويًا للتحقق من أن اشتراك SNS يعمل:

```bash
aws cloudwatch set-alarm-state \
  --alarm-name my-frontend-app-api-errors \
  --state-value ALARM \
  --state-reason "Testing alarm notification" \
  --region us-east-1 \
  --output json
```

افحص بريدك الإلكتروني. ينبغي أن تتلقى إشعارًا من SNS. وبعد التحقق، سيعود الإنذار إلى حالته الفعلية في فترة التقييم التالية.

> **نصيحة**
>
> استخدم `set-alarm-state` لاختبار مسار الإشعارات قبل أي حادث حقيقي. فاكتشاف أن اشتراك بريدك غير مؤكّد أثناء انقطاع فعلي تجربة سيئة.

## اختيار الحدود

تعتمد قيم الحد على تطبيقك. وهذه نقاط بداية لواجهة خلفية نموذجية لواجهة أمامية:

| الإنذار | المقياس | الإحصاءة | الحد | الفترة | فترات التقييم |
| --- | --- | --- | --- | --- | --- |
| معدّل الأخطاء | `Errors` | `Sum` | 5 | 300s | 2 |
| المدة | `Duration` | `Average` | 3000 ms | 300s | 2 |
| أخطاء 5XX | `5XXError` | `Sum` | 0 | 300s | 1 |
| عمليات التقييد | `Throttles` | `Sum` | 0 | 300s | 1 |

ابدأ بهذه، وراقب كيف تتصرف مع حركة مرور حقيقية، ثم عدّل. فإن كان إنذار الأخطاء ينطلق عشر مرات يوميًا، فإما أن حدّك منخفض جدًا أو لديك مشكلة حقيقية تحتاج إلى إصلاح.

أصبح لديك الآن إنذارات تخبرك عندما يسوء شيء ما. لكن عندما ينطلق إنذار، تحتاج إلى معرفة *ما* الذي ساء. في الدرس التالي، ستتعلم تتبّع طلب واحد عبر API Gateway وLambda وDynamoDB باستخدام معرّفات الارتباط (correlation IDs) وCloudWatch Logs Insights — لتحوّل «شيء ما تعطّل» إلى «هذا الطلب المحدّد فشل في هذه الخطوة المحدّدة».
