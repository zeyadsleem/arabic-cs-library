---
title: "تمرين: تهيئة DNS لموقعك"
lang: ar
source: "https://stevekinney.com/courses/aws/route-53-dns-exercise"
---

لديك توزيع CloudFront يقدّم واجهتك الأمامية وشهادة ACM مرفقة به. ويعمل التوزيع على عنوان URL الخاص به `d111111abcdef8.cloudfront.net`، لكن لا أحد يطلق نطاق CloudFront إلى الإنتاج. في هذا التمرين، ستوصل نطاقك الخاص بحيث يزور المستخدمون `example.com` فيحصلون على موقعك المقدَّم عبر CloudFront.

> **نصيحة**
>
> إذا بدت وحدة تحكّم Route 53 مختلفة قليلًا عند تنفيذك هذا، فأبقِ [دليل تهيئة DNS في Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html) و[مرجع الأمر `aws route53 change-resource-record-sets`](https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html) مفتوحين.

## لماذا يهمّ

DNS هو القطعة الأخيرة في مكدّس الاستضافة الثابتة. فبدونه، يكون نشرك عاملًا لكنه غير قابل للوصول على نطاق حقيقي. وبمجرد إكمال هذا التمرين، سيكون لديك نشر كامل من الطرف إلى الطرف: يخزّن S3 الملفات، وتوزّعها CloudFront، ويؤمّن ACM الاتصال، ويجعل Route 53 كل شيء قابلًا للوصول على اسم نطاقك. وهذا هو المكدّس نفسه الذي تعمل عليه تطبيقات الواجهة الأمامية الإنتاجية.

## المتطلّبات المسبقة {#prerequisites}

- حساب AWS مع إعداد وصول CLI (انظر [إعداد AWS CLI](https://stevekinney.com/courses/aws/setting-up-the-aws-cli))
- توزيع CloudFront مُدرج فيه نطاقك كاسم نطاق بديل وشهادة ACM مرفقة به (انظر [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution) و[إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate))
- اسم نطاق تتحكّم به، ويكون DNS مستضافًا بالفعل في Route 53 أو مفوَّضًا إلى منطقة استضافة في Route 53.

> **نصيحة**
>
> في مسار الدورة الجديد، يفترض أن تكون لديك منطقة الاستضافة بالفعل بحلول وصولك إلى هذا التمرين. فإن سجّلت النطاق عبر Route 53، فالأرجح أن AWS أنشأتها تلقائيًا. وإن كان النطاق في مكان آخر، فالأرجح أنك وجّهت المسجّل إلى خوادم أسماء Route 53 خلال دروس أساسيات DNS.

## تأكيد منطقة الاستضافة

قبل أن تضيف سجلات alias، تأكّد من أنك تعمل في منطقة الاستضافة الصحيحة. استبدل `example.com` بنطاقك الفعلي:

```bash
aws route53 list-hosted-zones-by-name \
  --dns-name example.com \
  --output json
```

من الاستجابة، لاحظ أمرين:

1. **معرّف منطقة الاستضافة** (مثل `/hostedzone/Z1234567890ABC`). ستستخدم جزء المعرّف (`Z1234567890ABC`) في الأوامر اللاحقة.
2. **اسم النطاق** في المنطقة يطابق النطاق الذي أنت على وشك توجيهه.

إذا **لم** تكن لديك منطقة استضافة بعد، فتوقّف هنا وأنشئ واحدة باستخدام [مناطق الاستضافة وأنواع السجلات](https://stevekinney.com/courses/aws/hosted-zones-and-record-types)، ثم تأكّد من أن مسجّلك يشير إلى خوادم أسماء Route 53 قبل المتابعة.

### نقطة تحقّق

- منطقة الاستضافة موجودة في Route 53.
- لديك معرّف منطقة الاستضافة محفوظًا.
- إذا كان نطاقك مسجّلًا خارجيًا، فخوادم أسمائه تشير بالفعل إلى Route 53.

## إنشاء سجل Alias من النوع A للنطاق الجذري

أنشئ سجل A من نوع alias يوجّه نطاقك المجرّد (`example.com`) إلى توزيع CloudFront. ستحتاج إلى:

- معرّف منطقة الاستضافة من الخطوة السابقة
- اسم نطاق توزيع CloudFront (مثل `d111111abcdef8.cloudfront.net`)

معرّف منطقة الاستضافة في CloudFront لأهداف alias هو دائمًا `Z2FDTNDATAQYW2`.

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "example.com",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "d111111abcdef8.cloudfront.net",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }'
```

### نقطة تحقّق

- أعاد الأمر كائن `ChangeInfo` مع `"Status": "PENDING"`.
- لا أخطاء بشأن هدف alias. وإن رأيت خطأً، فتحقّق من أن توزيع CloudFront يُدرج `example.com` كاسم نطاق بديل.

## إنشاء سجل Alias من النوع AAAA لـ IPv6

أنشئ سجل AAAA مطابقًا كي يُحلّ نطاقك عبر IPv6:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "example.com",
          "Type": "AAAA",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "d111111abcdef8.cloudfront.net",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }'
```

### نقطة تحقّق

- نجح الأمر مع `"Status": "PENDING"`.
- لديك الآن سجلّا alias من النوعين A وAAAA لـ`example.com`.

## إنشاء سجلات لـ www (اختياري لكن موصى به)

إذا أردت أن يعمل `www.example.com` أيضًا، فأنشئ سجلات alias له. تأكّد من إدراج `www.example.com` كاسم نطاق بديل في توزيع CloudFront (أو أن شهادة ACM تغطّي `*.example.com`).

أنشئ سجلي alias من النوعين A وAAAA لـ`www.example.com` يشيران إلى توزيع CloudFront نفسه.

### نقطة تحقّق

- إذا أنشأت سجلات www، فلديك الآن أربعة سجلات alias إجمالًا: A وAAAA لكل من `example.com` و`www.example.com`.

## التحقّق من تحليل DNS

انتظر نحو 60 ثانية كي تنشر Route 53 التغييرات، ثم تحقّق:

افحص سجل A:

```bash
dig example.com A +short
```

يجب أن ترى عنوان IP واحدًا أو أكثر (وهي عناوين IP لخوادم حافة CloudFront).

افحص سجل AAAA:

```bash
dig example.com AAAA +short
```

يجب أن ترى عنوان IPv6 واحدًا أو أكثر.

إذا لم تكن السجلات تُحلّ بعد، فاستعلم من خادم أسماء Route 53 مباشرةً لتأكيد صحة السجلات في المصدر:

```bash
dig example.com A @ns-1234.awsdns-56.org +short
```

استبدل خادم الأسماء بأحد الخوادم الأربعة من منطقة استضافتك.

### نقطة تحقّق

- يُرجع `dig example.com A +short` عناوين IP.
- يُرجع `dig example.com AAAA +short` عناوين IPv6.
- فتح `https://example.com` في متصفّح يُظهر واجهتك الأمامية بشهادة SSL صالحة.

## سرد كل السجلات في منطقة استضافتك

تحقّق من الحالة الكاملة لمنطقة استضافتك:

```bash
aws route53 list-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json
```

يجب أن ترى سجلات NS وSOA (منشأة تلقائيًا)، إضافة إلى سجلي alias من النوعين A وAAAA اللذين أنشأتهما للتوّ. وإذا أكملت تمرين ACM، فقد ترى أيضًا سجل تحقّق CNAME.

### نقطة تحقّق

- تتضمّن المخرجات سجلات NS وSOA وA وAAAA لنطاقك.
- تُظهر سجلات A وAAAA هدف `AliasTarget` باسم نطاق توزيع CloudFront.

## تشخيص الفشل

- **تبدو سجلات alias صحيحة في Route 53 لكن النطاق لا يُحلّ علنًا:** ما زال مسجّلك يشير إلى خوادم أسماء قديمة. قارن إعدادات المسجّل بسجلات NS الأربعة في منطقة استضافتك.
- **يعمل نطاق CloudFront لكن `https://example.com` لا يعمل:** سجلا alias من النوعين A وAAAA للنطاق الجذري مفقودان، أو يشيران إلى التوزيع الخاطئ أو معرّف منطقة الاستضافة الخاطئ.
- **يعمل `example.com` لكن `www.example.com` يفشل:** أنشأت سجلات النطاق الجذري فقط. أضف سجلات alias مطابقة لـ`www` إن أردت أن يُحلّ كلا الاسمين.

## ما بنيته

لديك الآن تهيئة DNS كاملة: منطقة استضافة في Route 53 مع سجلات alias توجّه نطاقك إلى توزيع CloudFront. وواجهتك الأمامية متاحة على `https://example.com` بشهادة SSL صالحة، وتوزيع CDN عالمي، وتحليل DNS يتولّاه Route 53.

بهذا يكتمل مكدّس الأساس: S3 (تخزين) + CloudFront (CDN) + ACM (شهادات) + Route 53 (DNS). ما زلت أشعر بشيء من الإثارة حين أرى نطاقًا حقيقيًا يُحلّ إلى بنية تحتية أعددتها بنفسي — إنها إحدى تلك اللحظات التي يتّضح فيها كل شيء.

## أهداف إضافية

- **الاختبار بـ`nslookup`**: شغّل `nslookup example.com` وقارن المخرجات بـ`dig`. لاحظ كيف يُظهر `nslookup` أي خادم أسماء أجاب عن الاستعلام.
- **فحص سلوك TTL**: شغّل `dig example.com A` (بلا `+short`) وانظر إلى قيمة TTL في قسم الإجابة. شغّله مرة أخرى بعد 30 ثانية ولاحظ أن TTL انخفض. هذا هو العدّ التنازلي للذاكرة المؤقتة.
- **الاستعلام من مُحلِّلات مختلفة**: قارن النتائج من مُحلِّلات DNS عامة مختلفة لترى ما إذا كانت كلها تُرجع الإجابة نفسها: <code><span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @1.1.1.1</span><span style="color:#ECC48D"> +short</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @8.8.8.8</span><span style="color:#ECC48D"> +short</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @9.9.9.9</span><span style="color:#ECC48D"> +short</span></span></code>
- **إعادة توجيه www إلى النطاق الجذري**: إذا لم تنشئ سجلات www، فأعدّ حاوية S3 بسيطة لإعادة التوجيه ترسل `www.example.com` إلى `example.com`. هذا يضمن أن المستخدمين الذين يكتبون `www` يصلون إلى موقعك.
