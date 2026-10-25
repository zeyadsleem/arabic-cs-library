---
title: "إرفاق شهادة SSL"
lang: ar
source: "https://stevekinney.com/courses/aws/attaching-an-ssl-certificate"
---

> **ملاحظة**
>
> هذا الدرس جزء من ملحق **النطاقات المخصّصة وDNS والشهادات** الاختياري. فإن كنت تعمل في الدورة الأساسية، فتوزيع CloudFront لديك يقدّم المحتوى بالفعل عبر HTTPS على نطاقه `*.cloudfront.net`. عُد إلى هنا عندما تصبح مستعدًا لإرفاق نطاق مخصّص.

توزيع CloudFront لديك يعمل، لكنه ما زال يقدّم المحتوى على نطاق `*.cloudfront.net`. هذا مقبول للاختبار، لكنك تحتاج إلى نطاقك المخصّص مع HTTPS قبل أن يصبح جاهزًا للإنتاج. يربط هذا الدرس شهادة ACM التي أنشأتها في قسم ACM بتوزيع CloudFront لديك.

إن أردت نسخة AWS من قواعد أسماء النطاقات البديلة أثناء عملك، فـ[دليل CloudFront للنطاقات المخصّصة وCNAMEs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html) هو المرجع الرسمي.

إن لم تكن قد طلبت شهادة بعد، فعُد إلى [طلب شهادة في ACM](https://stevekinney.com/courses/aws/requesting-a-certificate-in-acm) وأنشئ واحدة لنطاقك. تحتاج إلى شهادة في حالة `ISSUED` قبل المتابعة.

## شرط us-east-1 (مجددًا)

يستحق هذا التكرار لأنه يوقع الناس في كل مرة: شهادة ACM لديك **يجب** أن تكون في `us-east-1`. فـ CloudFront خدمة عالمية، ومستوى التحكم فيها يسكن في `us-east-1`. ولا يرى إلا الشهادات الموجودة في تلك المنطقة.

إن أنشأت شهادتك في منطقة أخرى، فأنت بحاجة إلى شهادة جديدة في `us-east-1`. ولا سبيل إلى نسخ الشهادات أو نقلها بين المناطق. وقد غطّينا هذا بالتفصيل في [تجديد الشهادة وشرط us-east-1](https://stevekinney.com/courses/aws/certificate-renewal-and-us-east-1).

> **تحذير**
>
> شهادات CloudFront **يجب** أن تكون في `us-east-1`. فإن أنشأت شهادتك في أي منطقة أخرى، فلن تراها CloudFront. تحقّق من أن شهادتك في المنطقة الصحيحة قبل تحديث توزيعك:
>
> ```bash
> aws acm list-certificates \
>   --region us-east-1 \
>   --output json \
>   --query "CertificateSummaryList[*].{Domain:DomainName,ARN:CertificateArn,Status:Status}"
> ```

## تحديث تهيئة التوزيع

يتطلب إرفاق شهادة تحديث تهيئة `ViewerCertificate` في توزيعك وإضافة نطاقك المخصّص إلى قائمة `Aliases`. وهذا تغيير من جزأين.

أولًا، اجلب التهيئة الحالية:

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > distribution-config-current.json
```

دوّن `ETag` من الاستجابة—تحتاجه للتحديث.

### الجزء الأول: ViewerCertificate

استبدل قسم `ViewerCertificate` في `DistributionConfig`. التهيئة الحالية تستخدم شهادة CloudFront الافتراضية:

```json
{
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true
  }
}
```

في وحدة التحكم، تعرض صفحة **Edit settings** القائمة المنسدلة **Custom SSL certificate** دون شهادة محددة (أي باستخدام شهادة `*.cloudfront.net` الافتراضية).

نموذج Edit settings في CloudFront يعرض حقل Custom SSL certificate مع قائمة Choose certificate فارغة، ما يدل على أن شهادة CloudFront الافتراضية هي المستخدمة.

> **الشهادة الافتراضية تتجاهل `MinimumProtocolVersion`**
>
> عندما تكون `CloudFrontDefaultCertificate` مساوية لـ `true`، [تفرض CloudFront بصمت سياسة الأمان `TLSv1`](https://docs.aws.amazon.com/AmazonCloudFront/latest/APIReference/API_ViewerCertificate.html) بغضّ النظر عمّا تعيّنه في `MinimumProtocolVersion`. ولهذا لا يكلّفك مقطع الشهادة الافتراضية أعلاه عناء حقل `MinimumProtocolVersion`—فوجوده سيكون مجرد كذبة. وبمجرد أن تنتقل إلى شهادتك من ACM (التالي)، يصبح للحقل معنى.

استبدله بشهادتك من ACM:

```json
{
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}
```

لنفصّل كل حقل:

- **`ACMCertificateArn`**: ARN شهادتك من ACM. يحلّ هذا الحقل محل `CloudFrontDefaultCertificate`. ولا يمكنك الجمع بينهما—فإما الشهادة الافتراضية وإما شهادتك من ACM.
- **`SSLSupportMethod`**: تعني `"sni-only"` أن CloudFront يستخدم **Server Name Indication** (SNI) لتحديد الشهادة التي يقدّمها أثناء مصافحة TLS. هذا هو النهج القياسي وهو مجاني. أما البديل `"vip"` فيستخدم عنوان IP مخصّصًا في كل موقع حافة—ويكلّف 600 دولار شهريًا، ووُجد فقط للتوافق مع عملاء قديمين لا يدعمون SNI. استخدم `"sni-only"`.
- **`MinimumProtocolVersion`**: `"TLSv1.2_2021"` هي سياسة الأمان الأحدث لتوزيعات `sni-only`. وهي تتطلب TLS 1.2 أو أعلى وتستخدم مجموعات تشفير حديثة. لا تستخدم إصدارات أقدم مثل `TLSv1` أو `TLSv1_2016`—فهي تسمح بتشفيرات أضعف.

> **نصيحة**
>
> `"TLSv1.2_2021"` هي الحد الأدنى الموصى به لإصدار البروتوكول وقت كتابة هذا الدرس. تدعم TLS 1.2 و1.3، مع مجموعة حديثة من التشفيرات. وكل متصفح تقريبًا صدر في العقد الماضي يدعم TLS 1.2، فلا يوجد قلق عملي بشأن التوافق.

### الجزء الثاني: Aliases

تحتاج CloudFront إلى معرفة النطاقات المخصّصة التي ينبغي توجيهها إلى هذا التوزيع. أضف نطاقك (واختياريًا النطاق الفرعي `www`) إلى قسم `Aliases`:

```json
{
  "Aliases": {
    "Quantity": 2,
    "Items": ["example.com", "www.example.com"]
  }
}
```

إن لم تحتوِ التهيئة الحالية على أسماء بديلة، فستبدو هكذا:

```json
{
  "Aliases": {
    "Quantity": 0
  }
}
```

استبدلها بأسماء نطاقاتك. يجب أن تطابق النطاقات المذكورة هنا أسماء النطاقات التي تغطيها شهادتك من ACM. فإن كانت شهادتك تغطي `example.com` و`*.example.com` (نطاق شامل)، فيمكنك سرد أي نطاق فرعي. وإن كانت تغطي `example.com` فقط، فلا يمكنك سرد سوى `example.com`.

### الجزء الثالث: إعادة توجيه HTTPS

تأكد من أن `ViewerProtocolPolicy` في `DefaultCacheBehavior` مضبوطة على `"redirect-to-https"`. كان هذا مضبوطًا بالفعل في [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution)، لكن تحقّق من أنه ما زال في مكانه:

```json
{
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

يضمن هذا إعادة توجيه أي طلب HTTP إلى توزيعك تلقائيًا إلى HTTPS. فلا يرى المستخدمون اتصالًا غير آمن أبدًا.

## إرسال التحديث

طبّق التغييرات:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match E2QWRUHEXAMPLE \
  --distribution-config file://distribution-config-updated.json \
  --region us-east-1 \
  --output json
```

استبدل `E2QWRUHEXAMPLE` بقيمة `ETag` من استجابة `get-distribution-config`.

انتظر النشر:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

## مع SDK

```typescript
import {
  CloudFrontClient,
  GetDistributionConfigCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

const current = await cloudfront.send(new GetDistributionConfigCommand({ Id: 'E1A2B3C4D5E6F7' }));
const config = current.DistributionConfig!;

config.ViewerCertificate = {
  ACMCertificateArn:
    'arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  SSLSupportMethod: 'sni-only',
  MinimumProtocolVersion: 'TLSv1.2_2021',
};
config.Aliases = { Quantity: 2, Items: ['example.com', 'www.example.com'] };

await cloudfront.send(
  new UpdateDistributionCommand({
    Id: 'E1A2B3C4D5E6F7',
    IfMatch: current.ETag,
    DistributionConfig: config,
  }),
);
```

## DNS: القطعة المفقودة

بعد نشر التوزيع بشهادتك وأسمائك البديلة، تحتاج إلى إنشاء سجلات DNS تشير بنطاقك إلى توزيع CloudFront. وهذا عمل قسم توجيه النطاقات المخصّصة في Route 53. وإلى أن يحدث ذلك، موقعك متاح على:

- **نطاق CloudFront**: `https://d1234abcdef.cloudfront.net` (ما زال يعمل، مستخدمًا شهادة ACM الخاصة بـ `*.cloudfront.net` في الخلفية)
- **النطاق المخصّص**: `https://example.com` (لا يعمل إلا بعد إنشاء سجلات Alias النهائية في Route 53)

## التحقق من الشهادة

بعد تهيئة DNS (أو حتى قبلها، باستخدام نطاق CloudFront)، يمكنك التحقق من أن شهادة SSL مرفقة بشكل صحيح:

```bash
curl -vI https://d1234abcdef.cloudfront.net 2>&1 | grep -A 5 "SSL certificate"
```

أو استخدم `openssl` لمزيد من التفاصيل:

```bash
openssl s_client -connect d1234abcdef.cloudfront.net:443 -servername d1234abcdef.cloudfront.net < /dev/null 2>/dev/null | openssl x509 -noout -subject -dates
```

يعرض هذا موضوع الشهادة (اسم النطاق) وتواريخ صلاحيتها.

## أخطاء شائعة

**الشهادة في منطقة خاطئة**: تُرجع CloudFront خطأ مثل `InvalidViewerCertificate` إذا أشار ARN الشهادة إلى شهادة غير موجودة في `us-east-1`. تحقّق من المنطقة مرة أخرى.

**النطاق غير موجود في Aliases**: إن كانت شهادتك تغطي `example.com` لكنك لم تضف `example.com` إلى قائمة `Aliases`، فلن يستخدم CloudFront الشهادة لطلبات ذلك النطاق. فقائمة `Aliases` تخبر CloudFront عن النطاقات التي يجيب عنها هذا التوزيع.

**الشهادة غير صادرة بعد**: إذا كانت شهادتك ما زالت في حالة `PENDING_VALIDATION`، فترفضها CloudFront. أكمل عملية التحقق أولًا (راجع [التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني](https://stevekinney.com/courses/aws/dns-validation-vs-email-validation)). (لقد ارتكبت هذا الخطأ بالتأكيد—أرسلت التحديث قبل أن ينتشر التحقق عبر DNS ثم تساءلت لماذا تصرخ CloudFront في وجهي.)

**النطاق مستخدم بالفعل**: إذا كان `example.com` مدرجًا بالفعل كاسم بديل على توزيع CloudFront آخر (حتى في حساب AWS مختلف)، فترفض CloudFront التحديث. لا يمكن ربط كل نطاق إلا بتوزيع واحد في وقت واحد. أزله من التوزيع القديم أولًا.

> **نصيحة**
>
> إن حصلت على خطأ `CNAMEAlreadyExists`، فهذا يعني أن النطاق مرتبط بالفعل بتوزيع CloudFront آخر. قد يحدث هذا إن كنت تنتقل من إعداد أقدم. استخدم `aws cloudfront list-distributions` للعثور على التوزيع الآخر وإزالة الاسم البديل منه أولًا.

## كائن ViewerCertificate الكامل

إليك تهيئة التوزيع المحدّثة الكاملة مع الشهادة والأسماء البديلة وإعادة توجيه HTTPS للرجوع إليها:

```json
{
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Aliases": {
    "Quantity": 2,
    "Items": ["example.com", "www.example.com"]
  },
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

يمنحك هذا HTTPS على نطاقك المخصّص، مفروضًا عبر إعادة التوجيه، مع TLS 1.2 أو أحدث وتشفيرات حديثة. وهذا هو مستوى أمان TLS نفسه الذي تحصل عليه من Vercel أو Netlify افتراضيًا—أنت فقط تهيّئه صراحةً.

صار توزيعك يملك HTTPS، ونطاقًا مخصّصًا (بانتظار DNS)، وتوجيه SPA. وتبقى القطعة الأخيرة في أحجية CloudFront، وهي ترويسات الاستجابة: تهيئة CORS، وترويسات الأمان مثل HSTS وX-Frame-Options، وتوجيهات التحكم في الذاكرة. في الدرس التالي، ستهيّئ سياسة ترويسات استجابة ترفع وضع الأمان في توزيعك إلى المعايير الحديثة.
