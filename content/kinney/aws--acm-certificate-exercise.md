---
title: "تمرين: طلب شهادة والتحقّق منها"
lang: ar
source: "https://stevekinney.com/courses/aws/acm-certificate-exercise"
---

لقد قرأت عن ACM والشهادات والتحقّق عبر DNS. والآن ستفعل ذلك فعلًا: اطلب شهادة، وأضف سجلات التحقّق، وتحقّق من أن ACM تُصدر الشهادة. وبحلول نهاية هذا التمرين، سيكون لديك شهادة SSL/TLS صالحة في `us-east-1` جاهزة للإرفاق بتوزيع CloudFront.

## لماذا يهمّ

كل واجهة أمامية إنتاجية على AWS تحتاج إلى شهادة. وسير عمل طلب الشهادة والتحقّق منها شيء تفعله مرة لكل نطاق (أو مرة لكل نطاق wildcard)، وإذا فعلته بشكل صحيح، فتتولّى ACM التجديد لبقية عمر الشهادة. وإتقان هذا من المحاولة الأولى يعني شيئًا أقل لتنقّحه عند ربط CloudFront.

## المتطلّبات المسبقة {#prerequisites}

- حساب AWS مع إعداد وصول CLI (انظر [إعداد AWS CLI](https://stevekinney.com/courses/aws/setting-up-the-aws-cli))
- اسم نطاق تتحكّم به.
- صلاحية DNS لذلك النطاق: **المسار الموصى به:** يستضيف Route 53 نظام DNS للنطاق، إما لأنك سجّلت النطاق هناك أو لأنك وجّهت المسجّل بالفعل إلى منطقة استضافة في Route 53. **المسار البديل:** DNS مستضاف في مكان آخر ويمكنك إضافة سجلات CNAME يدويًا.
  - **المسار الموصى به:** يستضيف Route 53 نظام DNS للنطاق، إما لأنك سجّلت النطاق هناك أو لأنك وجّهت المسجّل بالفعل إلى منطقة استضافة في Route 53.
  - **المسار البديل:** DNS مستضاف في مكان آخر ويمكنك إضافة سجلات CNAME يدويًا.

> **نصيحة**
>
> النسخة الأسهل من هذا التمرين نطاق يكون DNS فيه مستضافًا بالفعل في Route 53. فإن اتبعت دروس النطاقات وDNS بنطاق رخيص مسجّل في Route 53، فالتحقّق في ACM أشبه بمسألة نسخ ولصق بدلًا من رحلة بحث في لوحة مزوّد آخر.

## طلب الشهادة

اطلب شهادة تغطّي النطاق الجذري وكل النطاقات الفرعية. استبدل `example.com` بنطاقك الفعلي:

```bash
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names "*.example.com" \
  --validation-method DNS \
  --region us-east-1 \
  --output json
```

يجب أن ترى استجابة تتضمّن `CertificateArn`. احفظ هذه القيمة — ستحتاجها في الخطوات المتبقية.

```json
{
  "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### نقطة تحقّق

- تلقّيت `CertificateArn` في الاستجابة.
- اكتمل الأمر دون أخطاء.
- حدّدت `--region us-east-1`.

## استرجاع سجلات التحقّق

احصل على سجلات CNAME التي تحتاج ACM إلى إضافتها إلى DNS:

```bash
aws acm describe-certificate \
  --certificate-arn <your-certificate-arn> \
  --region us-east-1 \
  --output json \
  --query "Certificate.DomainValidationOptions[*].{Domain:DomainName,Name:ResourceRecord.Name,Value:ResourceRecord.Value,Status:ValidationStatus}"
```

تُظهر المخرجات سجل CNAME واحدًا أو أكثر، مع حالة التحقّق الخاصة به:

```json
[
  {
    "Domain": "example.com",
    "Name": "_abc123.example.com.",
    "Value": "_def456.acm-validations.aws.",
    "Status": "PENDING_VALIDATION"
  }
]
```

دوّن `Name` و`Value` لكل سجل. فأنت تحتاج إلى إضافتها إلى DNS.

### نقطة تحقّق

- ترى سجل CNAME واحدًا أو أكثر بحالة `PENDING_VALIDATION`.
- دوّنت `Name` و`Value` لكل سجل.

## إضافة سجلات التحقّق إلى DNS

**إذا كان DNS نطاقك في Route 53:** أبسط نهج هو وحدة تحكّم ACM. افتح [وحدة تحكّم ACM](https://console.aws.amazon.com/acm/home?region=us-east-1)، واعثر على شهادتك، ووسّعها، وانقر **Create records in Route 53**. فتنشئ ACM سجلات CNAME في منطقة استضافتك تلقائيًا.

**إذا كان نطاقك مستضافًا في مكان آخر:** سجّل الدخول إلى وحدة تحكّم مزوّد DNS لديك وأنشئ سجل CNAME بالخصائص التالية:

- **Name/Host**: القيمة من حقل `Name` (مثل `_abc123.example.com`). بعض المزوّدين يريدون `_abc123` فقط دون لاحقة النطاق — راجع توثيق مزوّدك.
- **Type**: CNAME
- **Value/Points to**: القيمة من حقل `Value` (مثل `_def456.acm-validations.aws`). بعض المزوّدين يريدونها دون النقطة الأخيرة.
- **TTL**: 300 (5 دقائق) مناسب.

كرّر ذلك لكل نطاق في شهادتك إن كانت سجلات التحقّق متعددة.

### نقطة تحقّق

- أضفت كل سجلات تحقّق CNAME إلى DNS.
- يمكنك التحقّق من وجود السجلات بـ`dig` أو `nslookup`:

```bash
dig CNAME _abc123.example.com
```

يجب أن ترى القيمة `_def456.acm-validations.aws.` في قسم الإجابة.

## انتظار التحقّق

تفحص ACM سجلات DNS دوريًا. ويكتمل التحقّق عادةً في غضون دقائق لكن قد يستغرق حتى 30 دقيقة.

يمكنك استقصاء الحالة دوريًا:

```bash
aws acm describe-certificate \
  --certificate-arn <your-certificate-arn> \
  --region us-east-1 \
  --output json \
  --query "Certificate.Status"
```

أو استخدم أداة الانتظار المدمجة للانتظار حتى يكتمل التحقّق:

```bash
aws acm wait certificate-validated \
  --certificate-arn <your-certificate-arn> \
  --region us-east-1
```

يخرج هذا الأمر صامتًا عندما تبلغ الشهادة حالة `ISSUED`، أو تنتهي مهلته بعد نحو 40 دقيقة.

### نقطة تحقّق

- حالة الشهادة `ISSUED`.
- خرج أمر `wait` دون خطأ.

## التحقّق من الشهادة

أكّد أن الشهادة صادرة وتغطّي النطاقات الصحيحة:

```bash
aws acm describe-certificate \
  --certificate-arn <your-certificate-arn> \
  --region us-east-1 \
  --output json \
  --query "Certificate.{Status:Status,Domains:SubjectAlternativeNames,Renewal:RenewalEligibility}"
```

المخرجات المتوقّعة:

```json
{
  "Status": "ISSUED",
  "Domains": ["example.com", "*.example.com"],
  "Renewal": "ELIGIBLE"
}
```

### نقطة تحقّق

- الحالة `ISSUED`.
- الشهادة تغطّي `example.com` و`*.example.com` (أو أي نطاقات طلبتها).
- أهلية التجديد `ELIGIBLE`.

## تشخيص الفشل

- **تبقى الشهادة في `PENDING_VALIDATION`:** سجل CNAME للتحقّق عبر DNS مفقود، أو نُسخ الاسم أو القيمة بشكل خاطئ، أو قام مزوّد DNS لديك بتسوية السجل أو توكيله بدلًا من نشره تمامًا كما طلبت ACM.
- **تحقّقت من اسم واحد فقط وتوقّعت الاثنين:** أعد تشغيل `describe-certificate` وافحص `DomainValidationOptions`. فأحيانًا تعيد ACM استخدام سجل تحقّق واحد للنطاق الجذري وأسماء wildcard، لكنك ما زلت بحاجة إلى تأكيد ما يتوقّعه طلب شهادتك فعلًا.
- **تبدو الشهادة سليمة لكن CloudFront لا يستطيع استخدامها لاحقًا:** طُلبت الشهادة خارج `us-east-1`. ولا تقبل CloudFront شهادات ACM إلا من تلك المنطقة.

## ما بنيته

لديك الآن شهادة SSL/TLS صالحة في `us-east-1` تغطّي نطاقك وكل النطاقات الفرعية. وستتجدّد هذه الشهادة تلقائيًا ما دام سجل تحقّق CNAME باقيًا في DNS والشهادة مرتبطة بخدمة AWS. والمهمة التالية إرفاقها بـ CloudFront كي يستطيع التوزيع الإجابة عن نطاقك الحقيقي عبر HTTPS.

> **تحذير**
>
> لا تحذف سجلات تحقّق CNAME من DNS. فهي مطلوبة للتجديد التلقائي. عاملها كسجلات دائمة.

## أهداف إضافية

- **سرد كل الشهادات**: شغّل `aws acm list-certificates --region us-east-1 --output json` لترى كل شهادة في حسابك. لاحظ كيف تُظهر كل واحدة نطاقها وحالتها.
- **طلب شهادة ثانية**: جرّب طلب شهادة لنطاق فرعي مختلف (مثل `staging.example.com`) دون wildcard. قارن عملية التحقّق — هل هي مختلفة؟
- **استكشاف المخرجات الكاملة**: شغّل `aws acm describe-certificate` دون علم `--query` لترى بيانات الشهادة الوصفية الكاملة: خوارزمية المفتاح، والجهة المُصدرة، وتاريخ الإنشاء، وبنية `DomainValidationOptions` الكاملة.
- **أتمتتها**: اكتب سكربت صدفة قصيرًا يطلب شهادة، ويستخرج سجلات CNAME، ويطبع السجلات التي تحتاج إلى إضافتها إلى DNS. إضافة: إن كان نطاقك في Route 53، فاجعل السكربت ينشئ السجلات تلقائيًا.

## التنظيف

شهادات ACM مجانية ما دامت غير مستخدمة، لكن سجل CNAME للتحقّق يبقى في Route 53 وقد يسبّب ارتباكًا إن نسيت وجوده. وعندما تنتهي من شهادة:

```bash
aws acm delete-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234 \
  --region us-east-1
```

ثم احذف سجل CNAME للتحقّق من Route 53 باستخدام `change-resource-record-sets` مع `Action: DELETE`. اسم السجل وقيمته هما نفس ما استخدمته للتحقّق — اعثر عليهما بـ`aws acm describe-certificate` إن لم تكن بحوزتك.

> **تحذير**
>
> إذا كانت هذه الشهادة ما زالت مرفقة بتوزيع CloudFront، فسترفض ACM حذفها. افصلها عن التوزيع أولًا.
