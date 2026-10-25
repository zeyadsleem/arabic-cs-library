---
title: "طلب شهادة في ACM"
---

تعرف لماذا يهمّ HTTPS. والآن تحتاج إلى شهادة. **AWS Certificate Manager (ACM)** هي الخدمة التي توفّر شهادات SSL/TLS وتديرها وتجدّدها للاستخدام مع خدمات AWS. طلب الشهادة مباشر، لكن ثمة قرارات قليلة عليك اتّخاذها مسبقًا — وقيد حرج واحد يتعلّق بالمنطقة سيوفّر عليك ساعات من التنقيح إن عرفته الآن.

في هذه المرحلة من الدورة، لديك بالفعل المتطلّب المسبق الغائب الذي يتعثّر فيه معظم الناس: السيطرة على النطاق ومكان لنشر سجلات DNS. وهذا مهم لأن التحقّق في ACM ليس طقسًا مجرّدًا لشهادة. إنه مهمة DNS.

## قبل أن تبدأ: مسألة المنطقة

شهادات ACM موارد إقليمية. فالشهادة الموفَّرة في `us-west-2` متاحة فقط للخدمات العاملة في `us-west-2`. وهذا مهم لأن CloudFront — شبكة CDN التي ستستخدمها لاحقًا في مسار الاستضافة الثابتة لتقديم واجهتك الأمامية — خدمة عالمية تتطلّب أن تكون شهاداتها في **`us-east-1`** (الولايات المتحدة الشرقية، شمال فرجينيا).

إذا وفّرت شهادتك في أي منطقة أخرى، فلن تراها CloudFront. لن تظهر في القائمة المنسدلة بوحدة التحكّم. وسيُرجع CLI خطأ. ولا سبيل إلى نقل شهادة أو نسخها بين المناطق.

> **تحذير**
>
> أنشئ دائمًا شهادات CloudFront في `us-east-1`. هذا هو الخطأ الواحد الأكثر شيوعًا لدى الناس مع ACM. وإن لم تتذكّر شيئًا آخر من هذه الوحدة، فتذكّر هذا.

أعددت AWS CLI بملفات تعريف مسمّاة في [إعداد AWS CLI](https://stevekinney.com/courses/aws/setting-up-the-aws-cli). تأكّد من أن أوامرك تحدّد `--region us-east-1` صراحةً.

## طلب شهادة من وحدة التحكّم

يمنحك سير العمل في وحدة التحكّم صورة واضحة عمّا تفعله ACM تحت الغطاء.

1. افتح [وحدة تحكّم ACM](https://console.aws.amazon.com/acm/home?region=us-east-1). تأكّد من أن القائمة المنسدلة للمنطقة في الزاوية العلوية اليمنى تقول **US East (N. Virginia)**. وإن لم تقل ذلك، فبدّلها قبل المتابعة.
2. انقر **Request a certificate**.
3. اختر **Request a public certificate** ثم انقر **Next**.
4. تحت **Domain names**، أدخل نطاقك: `example.com`. وإن أردت النطاق الجذري و`www` معًا، فأضف `www.example.com` اسم نطاق إضافيًا. (سنغطّي شهادات Wildcard في درس لاحق.)
5. تحت **Validation method**، اختر **DNS validation**. هذا هو الافتراضي والخيار الصحيح في معظم الحالات. وسنغطّي الفرق بين التحقّق عبر DNS والتحقّق عبر البريد في الدرس التالي.
6. تحت **Key algorithm**، اترك الافتراضي: **RSA 2048**. فهو متوافق مع كل شيء.
7. انقر **Request**.

تنشئ ACM الشهادة وتضبط حالتها على **Pending validation**. والشهادة غير قابلة للاستخدام بعد — إذ عليك إثبات أنك تملك النطاق. وتُغطّى خطوة التحقّق تلك في الدرس التالي.

## طلب شهادة باستخدام CLI

CLI أسرع وقابل للبرمجة النصية. وهذا مكافئ لما فعلته للتوّ في وحدة التحكّم:

```bash
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names www.example.com \
  --validation-method DNS \
  --region us-east-1 \
  --output json
```

تُرجع ACM استجابة JSON تتضمّن **ARN** الشهادة (اسم مورد Amazon):

```json
{
  "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

احفظ قيمة ARN هذه. ستحتاجه عندما ترفق الشهادة بـ CloudFront، وعندما تفحص حالة التحقّق، وعندما تنقّح أي شيء يتعلّق بهذه الشهادة. فكل عملية في ACM تشير إلى الشهادة عبر ARN الخاص بها.

> **نصيحة**
>
> يمكنك تخزين ARN في متغيّر صدفة لاستخدامه في الأوامر اللاحقة:
>
> ```bash
> CERT_ARN=$(aws acm request-certificate \
>   --domain-name example.com \
>   --subject-alternative-names www.example.com \
>   --validation-method DNS \
>   --region us-east-1 \
>   --output text)
> ```
>
> يُرجع العلم `--output text` سلسلة ARN وحدها دون تنسيق JSON، وهو أسهل في الالتقاط داخل متغيّر.

## باستخدام SDK

```typescript
import {
  ACMClient,
  RequestCertificateCommand,
  DescribeCertificateCommand,
  waitUntilCertificateValidated,
} from '@aws-sdk/client-acm';

const acm = new ACMClient({ region: 'us-east-1' }); // must be us-east-1 for CloudFront

const requested = await acm.send(
  new RequestCertificateCommand({
    DomainName: 'example.com',
    SubjectAlternativeNames: ['www.example.com'],
    ValidationMethod: 'DNS',
    IdempotencyToken: `cert-${Date.now()}`, // optional, prevents dupes on retry
  }),
);
const certArn = requested.CertificateArn!;

// Read back the DNS validation records so you can write them into Route 53:
const described = await acm.send(new DescribeCertificateCommand({ CertificateArn: certArn }));
const validationRecords = described.Certificate?.DomainValidationOptions?.map(
  (opt) => opt.ResourceRecord,
).filter(Boolean);

// After the DNS validation records are in Route 53, block until issuance:
await waitUntilCertificateValidated(
  { client: acm, maxWaitTime: 1800 },
  { CertificateArn: certArn },
);
```

الدالة المساعدة `waitUntilCertificateValidated` هي مكافئ SDK لـ`aws acm wait certificate-validated` — فأداة الانتظار في CLI والدالة المساعدة في SDK مولّدتان من مواصفة الانتظار نفسها التي تنشرها AWS، لذا سلوكهما متطابق.

## دورة حياة الشهادة

بعد أن تطلب شهادة، تمرّ بسلسلة من الحالات. أنصحك بمسح هذه القائمة الآن لتعرف ما الذي ستتوقّعه:

1. **Pending validation**: أنشأت ACM الشهادة لكنها تنتظر منك إثبات ملكيتك للنطاق. وبمجرد نشر سجلات DNS، يتحوّل التحقّق عادةً إلى **Issued** في غضون دقائق، وإن كانت AWS تمنح نفسها حتى 30 دقيقة. ولست مضطرًا إلى مراقبتها — فدرس التمرين يستخدم `aws acm wait certificate-validated` للانتظار حتى تصبح الشهادة جاهزة.
2. **Issued**: نجح التحقّق. والشهادة جاهزة للإرفاق بتوزيع CloudFront أو موازن حمل أو نقطة نهاية API Gateway.
3. **Inactive**: تُدرجه [واجهة ACM البرمجية](https://docs.aws.amazon.com/acm/latest/APIReference/API_CertificateDetail.html) حالةً محتملة، لكنه نادر في الاستخدام العادي. ولن تصادفه مع الشهادات `AMAZON_ISSUED` المتحقّقة عبر DNS التي تنشئها هذه الدورة.
4. **Expired**: بلغت الشهادة تاريخ انتهائها دون تجديد. وتجدّد ACM تلقائيًا الشهادات المستخدمة التي لديها سجلات تحقّق DNS صالحة، لذا لا يحدث هذا عادةً إلا إذا حدث خطأ في التجديد.
5. **Revoked**: أُبطلت الشهادة صراحةً. وهذا نادر.
6. **Failed**: فشل التحقّق — عادةً لأن التحقّق عبر DNS أو البريد لم يكتمل خلال 72 ساعة.

يمكنك فحص حالة شهادتك في أي وقت:

```bash
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  --region us-east-1 \
  --output json
```

تتضمّن الاستجابة كل شيء عن الشهادة — حالتها، وأسماء نطاقاتها، وطريقة التحقّق، وسجلات التحقّق التي تحتاج إلى إضافتها إلى DNS:

```json
{
  "Certificate": {
    "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "DomainName": "example.com",
    "SubjectAlternativeNames": ["example.com", "www.example.com"],
    "Status": "PENDING_VALIDATION",
    "Type": "AMAZON_ISSUED",
    "KeyAlgorithm": "RSA-2048",
    "DomainValidationOptions": [
      {
        "DomainName": "example.com",
        "ValidationDomain": "example.com",
        "ValidationStatus": "PENDING_VALIDATION",
        "ResourceRecord": {
          "Name": "_abc123.example.com.",
          "Type": "CNAME",
          "Value": "_def456.acm-validations.aws."
        },
        "ValidationMethod": "DNS"
      },
      {
        "DomainName": "www.example.com",
        "ValidationDomain": "www.example.com",
        "ValidationStatus": "PENDING_VALIDATION",
        "ResourceRecord": {
          "Name": "_ghi789.www.example.com.",
          "Type": "CNAME",
          "Value": "_jkl012.acm-validations.aws."
        },
        "ValidationMethod": "DNS"
      }
    ]
  }
}
```

تحتوي مصفوفة `DomainValidationOptions` على سجلات DNS التي تحتاج إلى إضافتها. فكل نطاق (أو نطاق فرعي) في شهادتك يحصل على سجل تحقّق خاص به. وفي الدرس التالي، سنستعرض إضافة هذه السجلات وإكمال التحقّق.

## أذونات IAM لـ ACM

لطلب شهادة، يحتاج مستخدم أو دور IAM لديك إلى الإذن `acm:RequestCertificate`. وإذا اتبعت إعداد الحساب في [إنشاء حساب AWS وتأمينه](https://stevekinney.com/courses/aws/creating-and-securing-an-aws-account) وكنت تستخدم مستخدمًا إداريًا، فلديك هذا الإذن بالفعل. ولإعدادات أكثر تقييدًا، هذه سياسة دنيا:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["acm:RequestCertificate", "acm:DescribeCertificate", "acm:ListCertificates"],
      "Resource": "*"
    }
  ]
}
```

> **نصيحة**
>
> لا تدعم ACM أذونات على مستوى المورد لـ`RequestCertificate` — إذ يجب أن يكون `Resource` هو `"*"`. يمكنك تقييد `DescribeCertificate` وغيرها من عمليات القراءة إلى ARNs شهادات محدّدة بعد وجود الشهادة، لكن الطلب الأول يتطلّب دائمًا موردًا شموليًا.

## ما لديك حتى الآن

في هذه المرحلة، لديك شهادة في ACM حالتها **Pending validation**. إنها موجودة، ولها ARN، لكنها غير قابلة للاستخدام بعد. والخطوة التالية هي إثبات لـ ACM أنك تملك النطاق المذكور في الشهادة فعلًا — ولهذا تحتاج إلى فهم الفرق بين التحقّق عبر DNS والتحقّق عبر البريد.
