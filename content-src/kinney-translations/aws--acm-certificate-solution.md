---
title: "الحل"
---

هذا هو حلّ [تمرين شهادة ACM](https://stevekinney.com/courses/aws/acm-certificate-exercise). تتضمّن كل خطوة الأوامر الدقيقة والمخرجات المتوقّعة. وإن اختلفت مخرجاتك، فالملاحظات التي تلي كل أمر تشرح ما ينبغي فحصه.

> **نصيحة**
>
> إن أردت أن تُبقي نسخة AWS من سير عمل التحقّق مفتوحة أثناء عملك، فأبقِ [دليل مستخدم AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html) قريبًا منك. فهو أسرع طريقة للتأكّد من سلامة مسار وحدة التحكّم عندما تعيد ACM تحريك الأزرار مرة أخرى.

## لماذا ينجح هذا

- لا تُصدر ACM الشهادة إلا بعد أن يُثبت DNS أنك تتحكّم بالنطاق، ولهذا فإن سجل التحقّق هو البوّابة الحقيقية في سير العمل هذا.
- إبقاء الشهادة في `us-east-1` يجعلها متوافقة مع شرط CloudFront الإقليمي، بدلًا من إنشاء شهادة لا تستطيع ربطها لاحقًا.
- يبقى التجديد تلقائيًا ما دام سجل التحقّق موجودًا في DNS وما دامت الشهادة مرتبطة بخدمة AWS.

## طلب الشهادة

```bash
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names "*.example.com" \
  --validation-method DNS \
  --region us-east-1 \
  --output json
```

**المخرجات المتوقّعة:**

```json
{
  "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

خزّن ARN في متغيّر حتى لا تضطر إلى نسخه ولصقه في كل أمر لاحق:

```bash
CERT_ARN="arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

أو التقطه في خطوة واحدة:

```bash
CERT_ARN=$(aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names "*.example.com" \
  --validation-method DNS \
  --region us-east-1 \
  --output text)

echo "$CERT_ARN"
```

**إن حدث خطأ ما:**

- `An error occurred (AccessDeniedException)`: مستخدم IAM لديك لا يملك أذونات `acm:RequestCertificate`. وإن كنت تستخدم المستخدم الإداري من [إنشاء حساب AWS وتأمينه](https://stevekinney.com/courses/aws/creating-and-securing-an-aws-account)، فلا ينبغي أن يحدث هذا. تحقّق من أن ملف تعريف CLI لديك مهيّأ بشكل صحيح.
- `An error occurred (LimitExceededException)`: لقد بلغت حدّ شهادات ACM لحسابك (الافتراضي 2,500 لكل منطقة). وهذا غير مرجّح في حساب جديد، لكن إن حدث فاحذف الشهادات غير المستخدمة عبر `aws acm delete-certificate`.

## استرجاع سجلات التحقّق

```bash
aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --output json \
  --query "Certificate.DomainValidationOptions[*].{Domain:DomainName,RecordName:ResourceRecord.Name,RecordType:ResourceRecord.Type,RecordValue:ResourceRecord.Value,Status:ValidationStatus}"
```

**المخرجات المتوقّعة:**

```json
[
  {
    "Domain": "example.com",
    "RecordName": "_abc123.example.com.",
    "RecordType": "CNAME",
    "RecordValue": "_def456.acm-validations.aws.",
    "Status": "PENDING_VALIDATION"
  },
  {
    "Domain": "*.example.com",
    "RecordName": "_abc123.example.com.",
    "RecordType": "CNAME",
    "RecordValue": "_def456.acm-validations.aws.",
    "Status": "PENDING_VALIDATION"
  }
]
```

لاحظ أن `example.com` و`*.example.com` كثيرًا ما يتشاركان سجل CNAME نفسه لأنهما يشتركان في النطاق الأب. ولا تحتاج إلى إضافته إلا مرة واحدة.

**إن كانت حقول `ResourceRecord` مفقودة:** قد يستغرق ظهور سجلات CNAME بضع ثوانٍ بعد طلب الشهادة. انتظر 10 ثوانٍ ثم شغّل الأمر مرة أخرى.

## إضافة سجلات التحقّق إلى DNS

### الخيار أ: Route 53 (CLI)

إن كان DNS نطاقك مستضافًا في Route 53، فابحث أولًا عن معرّف المنطقة المستضافة:

```bash
aws route53 list-hosted-zones \
  --output json \
  --query "HostedZones[?Name=='example.com.'].{Id:Id,Name:Name}"
```

```json
[
  {
    "Id": "/hostedzone/Z1234567890ABC",
    "Name": "example.com."
  }
]
```

ثم أنشئ سجل التحقّق. استبدل `Name` و`Value` بالقيم الفعلية من الخطوة 2:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "_abc123.example.com.",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [
            {
              "Value": "_def456.acm-validations.aws."
            }
          ]
        }
      }
    ]
  }'
```

**المخرجات المتوقّعة:**

```json
{
  "ChangeInfo": {
    "Id": "/change/C1234567890ABC",
    "Status": "PENDING",
    "SubmittedAt": "2026-03-18T12:00:00.000Z"
  }
}
```

تعني حالة `PENDING` أن Route 53 ينشر التغيير. ويستغرق هذا عادةً من 30 إلى 60 ثانية.

### الخيار ب: Route 53 (اختصار وحدة التحكّم)

افتح [وحدة تحكّم ACM](https://console.aws.amazon.com/acm/home?region=us-east-1). اعثر على شهادتك، ووسّعها، ثم انقر **Create records in Route 53**. ستُنشئ ACM سجلات CNAME نيابةً عنك. وهذا أسرع خيار إن كان نطاقك في Route 53.

### الخيار ج: مزوّد DNS خارجي

سجّل الدخول إلى مزوّد DNS لديك وأنشئ سجل CNAME. تختلف الخطوات الدقيقة بحسب المزوّد، لكنك تحتاج إلى:

- **الاسم**: `_abc123` (بعض المزوّدين يريدون الاسم الكامل `_abc123.example.com`، وآخرون يريدون البادئة فقط)
- **النوع**: CNAME
- **القيمة**: `_def456.acm-validations.aws` (بعض المزوّدين يطلبون النقطة في النهاية، وآخرون لا)
- **TTL**: 300

### التحقّق من وجود السجل

بعد إضافة السجل، تأكّد من أنه قابل للاستعلام:

```bash
dig CNAME _abc123.example.com +short
```

**المخرجات المتوقّعة:**

```
_def456.acm-validations.aws.
```

إن لم ترَ أي مخرجات، فالسجل لم ينتشر بعد. انتظر دقيقة ثم حاول مجددًا. وإن لم يظهر بعد 5 دقائق، فافحص السجل مرة أخرى في واجهة مزوّد DNS—فالخطأ الأكثر شيوعًا هو إدخال اسم السجل بشكل غير صحيح.

## انتظار التحقّق

استخدم أداة الانتظار في ACM لحجب التنفيذ حتى تصدر الشهادة:

```bash
aws acm wait certificate-validated \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1
```

لا يُنتج هذا الأمر أي مخرجات عند النجاح. ويخرج بصمت عندما تتغيّر حالة الشهادة إلى `ISSUED`. وإن انتهت مهلة الانتظار (بعد نحو 40 دقيقة)، فالأرجح أن سجل DNS غير مهيّأ بشكل صحيح.

يمكنك أيضًا الاستعلام يدويًا:

```bash
aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --output json \
  --query "Certificate.DomainValidationOptions[*].{Domain:DomainName,Status:ValidationStatus}"
```

**أثناء التحقّق:**

```json
[
  {
    "Domain": "example.com",
    "Status": "PENDING_VALIDATION"
  },
  {
    "Domain": "*.example.com",
    "Status": "PENDING_VALIDATION"
  }
]
```

**بعد التحقّق:**

```json
[
  {
    "Domain": "example.com",
    "Status": "SUCCESS"
  },
  {
    "Domain": "*.example.com",
    "Status": "SUCCESS"
  }
]
```

## التحقّق من الشهادة

```bash
aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --output json \
  --query "Certificate.{Status:Status,Domains:SubjectAlternativeNames,Renewal:RenewalEligibility,KeyAlgorithm:KeyAlgorithm,Issuer:Issuer}"
```

**المخرجات المتوقّعة:**

```json
{
  "Status": "ISSUED",
  "Domains": ["example.com", "*.example.com"],
  "Renewal": "ELIGIBLE",
  "KeyAlgorithm": "RSA-2048",
  "Issuer": "Amazon"
}
```

الأمور الأساسية التي يجب تأكيدها:

- **الحالة** هي `ISSUED`، لا `PENDING_VALIDATION` ولا `FAILED`.
- **النطاقات** تسرد كلاً من `example.com` و`*.example.com`.
- **التجديد** هو `ELIGIBLE`، ما يعني أن ACM سيجدّد هذه الشهادة تلقائيًا.
- **الجهة المُصدرة** هي `Amazon`، ما يؤكّد أن هذه شهادة تُديرها ACM.

## الملخّص

سير العمل الكامل، مختصرًا:

```bash
# Request the certificate
CERT_ARN=$(aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names "*.example.com" \
  --validation-method DNS \
  --region us-east-1 \
  --output text)

# Get the validation CNAME records
aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --output json \
  --query "Certificate.DomainValidationOptions[*].ResourceRecord"

# Add the CNAME to Route 53 (or your DNS provider)
# ... (see Step 3 above)

# Wait for validation
aws acm wait certificate-validated \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1

# Verify
aws acm describe-certificate \
  --certificate-arn "$CERT_ARN" \
  --region us-east-1 \
  --output json \
  --query "Certificate.{Status:Status,Domains:SubjectAlternativeNames}"
```

لديك الآن شهادة صادرة في `us-east-1`. بعد ذلك، ستربط هذه الشهادة بتوزيع CloudFront حتى تستطيع واجهتك الأمامية أن تستجيب على النطاق الحقيقي بدلًا من عنوان URL بصيغة `*.cloudfront.net`.

## التنظيف

شهادات ACM مجانية ما دامت غير مستخدمة، لكن سجل CNAME الخاص بالتحقّق يبقى في Route 53. وعندما تنتهي من الشهادة:

```bash
aws acm delete-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234 \
  --region us-east-1
```

ثم احذف سجل CNAME الخاص بالتحقّق من Route 53 باستخدام `change-resource-record-sets` مع `Action: DELETE`. اسم السجل وقيمته هما نفس ما أضفته أثناء التحقّق.

> **تحذير**
>
> إن كانت هذه الشهادة لا تزال مرتبطة بتوزيع CloudFront، فسترفض ACM حذفها. افصلها من التوزيع أولًا.
