---
title: "الحل"
---

هذا هو الحل الكامل لكل خطوة، بما في ذلك كل أوامر CLI والمخرجات المتوقعة في كل مرحلة.

> **نصيحة**
>
> إذا أردت إبقاء نسخة AWS من تدفّق الإنذار مفتوحة أثناء عملك، فأبقِ [نظرة CloudWatch العامة](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) قريبة. فهي أسرع طريقة للتحقق من تسميات لوحة التحكم ومصطلحات الإنذار عندما تتغيّر الواجهة.

## لماذا ينجح هذا

- تفصل SNS تسليم الإشعارات عن تعريفات الإنذارات، فيمكن لعدة إنذارات أن تتفرّع إلى مسار تنبيه واحد دون تكرار الإعداد.
- لا تهم حدود الإنذار إلا إذا كانت تراقب المقياس والإحصاءة والأبعاد الصحيحة، ولهذا يحظى ربط المقياس بالعناية نفسها التي تحظى بها قيمة الحد.
- فرض حالة إنذار هو أسرع طريقة للتحقق من مسار الإشعارات قبل أن تثق به أثناء انقطاع حقيقي.

## إنشاء موضوع SNS

```bash
aws sns create-topic \
  --name my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "TopicArn": "arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"
}
```

### التحقق

```bash
aws sns list-topics \
  --region us-east-1 \
  --output json
```

تتضمن المخرجات موضوعك في مصفوفة `Topics`:

```json
{
  "Topics": [
    {
      "TopicArn": "arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"
    }
  ]
}
```

## الاشتراك ببريدك الإلكتروني

```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --protocol email \
  --notification-endpoint your-email@example.com \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "SubscriptionArn": "pending confirmation"
}
```

افحص بريدك الإلكتروني وانقر رابط التأكيد. ثم تحقّق:

```bash
aws sns list-subscriptions-by-topic \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة بعد التأكيد:

```json
{
  "Subscriptions": [
    {
      "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts:a1b2c3d4-5678-90ab-cdef-example11111",
      "Owner": "123456789012",
      "Protocol": "email",
      "Endpoint": "your-email@example.com",
      "TopicArn": "arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"
    }
  ]
}
```

أصبح `SubscriptionArn` ARN حقيقيًا الآن، وليس `pending confirmation`.

> **تحذير**
>
> إذا كان `SubscriptionArn` لا يزال يعرض `pending confirmation`، فأنت لم تنقر رابط التأكيد في البريد. افحص مجلد الرسائل غير المرغوب فيها. لن تسلّم SNS إشعارات الإنذار حتى يُؤكَّد الاشتراك.

## إنشاء إنذار عدد الأخطاء

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-error-count \
  --alarm-description "Alarm when Lambda error count exceeds 3 in 5 minutes" \
  --namespace AWS/Lambda \
  --metric-name Errors \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 3 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

لا ينتج هذا الأمر أي مخرجات عند النجاح. تحقّق باستخدام:

```bash
aws cloudwatch describe-alarms \
  --alarm-names my-frontend-app-api-error-count \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة (الحقول ذات الصلة):

```json
{
  "MetricAlarms": [
    {
      "AlarmName": "my-frontend-app-api-error-count",
      "AlarmDescription": "Alarm when Lambda error count exceeds 3 in 5 minutes",
      "StateValue": "INSUFFICIENT_DATA",
      "MetricName": "Errors",
      "Namespace": "AWS/Lambda",
      "Statistic": "Sum",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "my-frontend-app-api"
        }
      ],
      "Period": 300,
      "EvaluationPeriods": 2,
      "Threshold": 3.0,
      "ComparisonOperator": "GreaterThanThreshold",
      "AlarmActions": ["arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"],
      "OKActions": ["arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"]
    }
  ]
}
```

قيمة `StateValue` وهي `INSUFFICIENT_DATA` متوقعة لإنذار جديد — فـ CloudWatch لم تقيّمه بعد.

## إنشاء إنذار المدة

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-high-duration \
  --alarm-description "Alarm when average Lambda duration exceeds 2 seconds" \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 2000 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

تحقّق:

```bash
aws cloudwatch describe-alarms \
  --alarm-names my-frontend-app-api-high-duration \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة (الحقول ذات الصلة):

```json
{
  "MetricAlarms": [
    {
      "AlarmName": "my-frontend-app-api-high-duration",
      "AlarmDescription": "Alarm when average Lambda duration exceeds 2 seconds",
      "StateValue": "INSUFFICIENT_DATA",
      "MetricName": "Duration",
      "Namespace": "AWS/Lambda",
      "Statistic": "Average",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "my-frontend-app-api"
        }
      ],
      "Period": 300,
      "EvaluationPeriods": 2,
      "Threshold": 2000.0,
      "ComparisonOperator": "GreaterThanThreshold",
      "AlarmActions": ["arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts"]
    }
  ]
}
```

يحتوي هذا الإنذار على `AlarmActions` فقط (دون `OKActions`). وإضافة إجراءات OK هي أحد الأهداف الإضافية.

## اختبار إنذار الأخطاء

افرض على الإنذار الانتقال إلى الحالة `ALARM`:

```bash
aws cloudwatch set-alarm-state \
  --alarm-name my-frontend-app-api-error-count \
  --state-value ALARM \
  --state-reason "Testing alarm notification pipeline" \
  --region us-east-1 \
  --output json
```

لا ينتج هذا الأمر أي مخرجات عند النجاح. افحص بريدك الإلكتروني — ينبغي أن تتلقى إشعارًا من `AWS Notifications` يتضمن تفاصيل الإنذار:

- **اسم الإنذار**: `my-frontend-app-api-error-count`
- **الحالة الجديدة**: `ALARM`
- **السبب**: `Testing alarm notification pipeline`
- **وقت تغيّر الحالة**: الطابع الزمني الذي شغّلت فيه الأمر

سيعود الإنذار إلى حالته الفعلية (`INSUFFICIENT_DATA` أو `OK`) في فترة التقييم التالية (خلال 5 دقائق).

> **نصيحة**
>
> إذا لم تتلقَّ البريد، فافحص ثلاثة أمور: (1) أن اشتراك SNS مؤكّد، (2) أن البريد ليس في مجلد الرسائل غير المرغوب فيها، (3) أن ARN في `--alarm-actions` يطابق ARN موضوع SNS لديك تمامًا.

## إطلاق إنذار حقيقي (اختياري)

### نشر معالج فاشل

أنشئ ملفًا باسم `failing-handler.ts`:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async () => {
  throw new Error('Intentional error to trigger CloudWatch alarm');
};
```

استبدل محتوى `src/handler.ts` بشيفرة المعالج الفاشل أعلاه، ثم ابنِ الحزمة وغلّفها وانشر:

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

### الاستدعاء المتكرر لتوليد أخطاء

```bash
for i in {1..5}; do
  aws lambda invoke \
    --function-name my-frontend-app-api \
    --cli-binary-format raw-in-base64-out \
    --payload '{}' \
    --region us-east-1 \
    --output json \
    /tmp/response-$i.json
  echo "Invocation $i complete"
done
```

سيُرجع كل استدعاء حقل `FunctionError`:

```json
{
  "StatusCode": 200,
  "FunctionError": "Unhandled",
  "ExecutedVersion": "$LATEST"
}
```

تشير القيمة `FunctionError: "Unhandled"` إلى أن الدالة أطلقت استثناءً غير معالَج. ومع ذلك تُرجع Lambda `StatusCode: 200` على مستوى الاستدعاء — فقيمة 200 تعني أن Lambda *استدعت* الدالة بنجاح، لا أن الدالة نجحت.

### انتظار الإنذار

الإنذار مهيّأ بفترة مدتها 5 دقائق وفترتَي تقييم، لذا تحتاج إلى انتظار حتى 10 دقائق حتى ينتقل الإنذار من `INSUFFICIENT_DATA` إلى `ALARM`. يمكنك مراقبة الحالة:

```bash
aws cloudwatch describe-alarms \
  --alarm-names my-frontend-app-api-error-count \
  --region us-east-1 \
  --output json \
  --query 'MetricAlarms[0].{State:StateValue,Reason:StateReason}'
```

بمجرد انطلاق الإنذار، ستتلقى إشعار بريد إلكتروني.

### إعادة نشر المعالج العامل

لا تترك الدالة المعطّلة منشورة. أعد نشر معالجك العامل الأصلي:

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

بعد بضع استدعاءات ناجحة (أو فترة بلا أخطاء)، ينتقل الإنذار عائدًا إلى `OK` وتتلقى إشعارًا آخر.

## سرد كل الإنذارات

```bash
aws cloudwatch describe-alarms \
  --alarm-name-prefix my-frontend-app \
  --region us-east-1 \
  --output json
```

تُظهر المخرجات المتوقعة كلا الإنذارين:

```json
{
  "MetricAlarms": [
    {
      "AlarmName": "my-frontend-app-api-error-count",
      "MetricName": "Errors",
      "Statistic": "Sum",
      "Threshold": 3.0,
      "ComparisonOperator": "GreaterThanThreshold",
      "Period": 300,
      "EvaluationPeriods": 2
    },
    {
      "AlarmName": "my-frontend-app-api-high-duration",
      "MetricName": "Duration",
      "Statistic": "Average",
      "Threshold": 2000.0,
      "ComparisonOperator": "GreaterThanThreshold",
      "Period": 300,
      "EvaluationPeriods": 2
    }
  ]
}
```

## هدف إضافي: إنذار 5XX في API Gateway

اعثر على معرّف API الخاص بـ API Gateway:

```bash
aws apigatewayv2 get-apis \
  --region us-east-1 \
  --output json \
  --query 'Items[?Name==`my-frontend-app-api`].ApiId'
```

أنشئ الإنذار:

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-5xx \
  --alarm-description "Alarm when API Gateway returns any 5XX error" \
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

يستخدم هذا الإنذار فترة تقييم واحدة وحدًّا صفريًا — أي خطأ 5XX يطلقه فورًا.

## هدف إضافي: إضافة إجراءات OK إلى إنذار المدة

أعد تشغيل `put-metric-alarm` بالمعاملات نفسها مع `--ok-actions`:

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name my-frontend-app-api-high-duration \
  --alarm-description "Alarm when average Lambda duration exceeds 2 seconds" \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=my-frontend-app-api \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 2000 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

يحدّث `put-metric-alarm` إنذارًا موجودًا إذا كان هناك إنذار بالاسم نفسه — فلست بحاجة إلى حذفه أولًا.

## هدف إضافي: سجل الإنذار

```bash
aws cloudwatch describe-alarm-history \
  --alarm-name my-frontend-app-api-error-count \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة (إذا كنت قد اختبرت الإنذار):

```json
{
  "AlarmHistoryItems": [
    {
      "AlarmName": "my-frontend-app-api-error-count",
      "Timestamp": "2026-03-18T15:05:00.000Z",
      "HistoryItemType": "StateUpdate",
      "HistorySummary": "Alarm updated from ALARM to INSUFFICIENT_DATA",
      "HistoryData": "{\"version\":\"1.0\",\"oldState\":{\"stateValue\":\"ALARM\"},\"newState\":{\"stateValue\":\"INSUFFICIENT_DATA\",\"stateReason\":\"Unchecked: Initial alarm creation\"}}"
    },
    {
      "AlarmName": "my-frontend-app-api-error-count",
      "Timestamp": "2026-03-18T15:00:00.000Z",
      "HistoryItemType": "StateUpdate",
      "HistorySummary": "Alarm updated from INSUFFICIENT_DATA to ALARM",
      "HistoryData": "{\"version\":\"1.0\",\"oldState\":{\"stateValue\":\"INSUFFICIENT_DATA\"},\"newState\":{\"stateValue\":\"ALARM\",\"stateReason\":\"Testing alarm notification pipeline\"}}"
    }
  ]
}
```

يعرض هذا الجدول الزمني الكامل لانتقالات الحالة — وهو مفيد لفهم مدى تكرار انطلاق إنذارك وما إذا كان حساسًا أكثر من اللازم أو هادئًا أكثر من اللازم.

## التنظيف

إذا انتهيت من التجربة ولا تريد إنذارات شاردة تزعجك (أو اشتراك بريد إلكتروني عالقًا نسيت أمره)، ففكّك كل شيء بالترتيب العكسي لما بنيته.

احذف الإنذارات:

```bash
aws cloudwatch delete-alarms \
  --alarm-names my-frontend-app-api-error-count my-frontend-app-api-high-duration my-frontend-app-api-5xx \
  --region us-east-1
```

ألغِ اشتراك بريدك الإلكتروني في موضوع SNS. احصل على ARN الاشتراك أولًا:

```bash
aws sns list-subscriptions-by-topic \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1 \
  --output json
```

ثم ألغِ الاشتراك باستخدام `SubscriptionArn` من الاستجابة:

```bash
aws sns unsubscribe \
  --subscription-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts:abcd1234-... \
  --region us-east-1
```

احذف الموضوع نفسه:

```bash
aws sns delete-topic \
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \
  --region us-east-1
```
