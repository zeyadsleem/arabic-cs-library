---
title: "توجيه نطاق إلى CloudFront"
lang: ar
source: "https://stevekinney.com/courses/aws/pointing-a-domain-to-cloudfront"
---

توزيع CloudFront الخاص بك أصبح يعمل، لكنك تصل إليه الآن عبر شيء مثل `d111111abcdef8.cloudfront.net`. هذا ليس ما تنشره في الإنتاج. تريد أن يزور المستخدمون `example.com` ويُخدَم لهم واجهتك الأمامية عبر CloudFront—بشهادة ACM الخاصة بك، وسلوكيات ذاكرة التخزين المؤقت، وتحكّم وصول الأصل. هنا تربط Route 53 البنية التحتية ببعضها: تنشئ سجلات DNS تشير بنطاقك إلى التوزيع، فيختفي رابط CloudFront خلف علامتك التجارية.

إذا أردت نسخة AWS من آليات التوجيه أثناء عملك، فأبقِ [دليل تهيئة DNS في Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html) و[مرجع أمر `aws route53 change-resource-record-sets`](https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html) مفتوحين.

## المتطلبات المسبقة {#prerequisites}

قبل أن تنشئ سجلات DNS، تحتاج إلى ثلاثة أشياء جاهزة:

1. **توزيع CloudFront** مُدرج فيه نطاقك كـ**اسم نطاق بديل (CNAME)**. هيّأت التوزيع في [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution) وأضفت الأسماء المستعارة في [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate). إذا لم يُدرج توزيعك `example.com` (واختياريًا `www.example.com`) كاسم نطاق بديل، فسترفض Route 53 إنشاء سجل alias يشير إليه.
2. **شهادة ACM** تغطي نطاقك، ومرفقة بالتوزيع. طلبتها في [طلب شهادة في ACM](https://stevekinney.com/courses/aws/requesting-a-certificate-in-acm)، وتحقّقت منها في [التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني](https://stevekinney.com/courses/aws/dns-validation-vs-email-validation)، وأرفقتها في [إرفاق شهادة SSL](https://stevekinney.com/courses/aws/attaching-an-ssl-certificate). يجب أن تكون الشهادة في `us-east-1`.
3. **منطقة مستضافة في Route 53** لنطاقك، مع خوادم أسماء مهيّأة عند مسجّل النطاق لديك. أعددت ذلك في دروس أساس النطاقات وDNS.

## إنشاء سجل A Alias للنطاق الجذري

الإعداد الأكثر شيوعًا هو توجيه النطاق المجرّد (`example.com`) إلى توزيع CloudFront. ولأن `example.com` هو **جذر المنطقة**، لا يمكنك استخدام سجل CNAME هنا (نغطي السبب في [سجلات Alias مقابل سجلات CNAME](https://stevekinney.com/courses/aws/alias-records-vs-cname-records)). بدلًا من ذلك، تستخدم **سجل alias** في Route 53.

أولًا، احصل على معرّف منطقتك المستضافة:

```bash
aws route53 list-hosted-zones \
  --output json \
  --query "HostedZones[?Name=='example.com.'].Id"
```

```json
["/hostedzone/Z1234567890ABC"]
```

الآن أنشئ سجل A من نوع alias. تستخدم توزيعات CloudFront دائمًا `Z2FDTNDATAQYW2` كمعرّف المنطقة المستضافة لأهداف alias—وهي قيمة ثابتة لكل توزيعات CloudFront عالميًا:

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

ثمة أمور قليلة جديرة بالملاحظة في ذلك الأمر:

- **`HostedZoneId`** هو `Z2FDTNDATAQYW2`. هذا ليس معرّف منطقتك المستضافة—بل هو المعرّف الثابت الذي تستخدمه Route 53 لكل توزيعات CloudFront. كل سجل alias يشير إلى CloudFront يستخدم القيمة نفسها.
- **`DNSName`** هو اسم نطاق توزيع CloudFront الخاص بك (قيمة `d111111abcdef8.cloudfront.net`).
- **`EvaluateTargetHealth`** هو `false`. لا تدعم CloudFront فحوص صحة Route 53، لذا يجب أن تكون هذه القيمة `false` دائمًا لأهداف alias الخاصة بـ CloudFront.
- لا يوجد حقل `TTL`. ترث سجلات alias قيمة TTL من المورد الهدف—وتتولى Route 53 ذلك تلقائيًا.

تؤكد الاستجابة التغيير:

```json
{
  "ChangeInfo": {
    "Id": "/change/C1234567890ABC",
    "Status": "PENDING",
    "SubmittedAt": "2026-03-18T12:00:00.000Z"
  }
}
```

تعني `PENDING` أن Route 53 ينشر التغيير. يكتمل هذا عادةً في أقل من 60 ثانية.

## إضافة سجل AAAA Alias لدعم IPv6

تدعم CloudFront بروتوكول IPv6 افتراضيًا. لضمان تحليل نطاقك بشكل صحيح للعملاء على شبكات IPv6، أنشئ سجل alias ثانيًا من النوع `AAAA`:

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

الأمر مطابق لسجل A، إلا أن `"Type"` هو `"AAAA"`. يحلّل Route 53 الـ alias إلى عناوين IPv6 المناسبة لتوزيع CloudFront الخاص بك. (أعلم أنه يبدو زائدًا عن الحاجة، لكن دعم IPv6 من الأشياء التي ستكون سعيدًا لأنك أعددتها من البداية.)

> **نصيحة**
>
> يمكنك دمج السجلين في استدعاء واحد لـ `change-resource-record-sets` بتضمين التغييرين في مصفوفة `Changes`. هذا أنظف للنصوص البرمجية ويضمن إنشاء السجلين بشكل ذرّي.

## التعامل مع النطاق الفرعي www

تعرض معظم المواقع حركة المرور على `example.com` و`www.example.com` معًا. لديك خياران:

### الخيار أ: سجلات Alias لكليهما

أنشئ سجلات alias نفسها من النوعين A وAAAA لـ `www.example.com`، تشير إلى توزيع CloudFront نفسه. هذا يعني أن الجذر و`www` يحلّان مباشرة إلى CloudFront:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.example.com",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "d111111abcdef8.cloudfront.net",
            "EvaluateTargetHealth": false
          }
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.example.com",
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

تأكد من أن `www.example.com` مُدرج كاسم نطاق بديل في توزيع CloudFront الخاص بك، وأن شهادة ACM تغطيه (شهادة wildcard مثل `*.example.com` تتولى ذلك تلقائيًا).

### الخيار ب: CNAME من www إلى الجذر

أنشئ سجل CNAME يربط `www.example.com` بـ `example.com`. ولأن `www` ليس جذر المنطقة، فسجل CNAME صالح هنا:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --output json \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.example.com",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [
            {
              "Value": "example.com"
            }
          ]
        }
      }
    ]
  }'
```

الخيار أ أفضل لأن سجلات alias مجانية (بلا رسوم استعلامات) وتُحلّ في خطوة واحدة. أما الخيار ب فيضيف بحث DNS إضافيًا ويتحمّل رسوم الاستعلامات المعتادة.

## مع SDK

```typescript
import {
  Route53Client,
  ChangeResourceRecordSetsCommand,
  ListHostedZonesCommand,
} from '@aws-sdk/client-route-53';

const r53 = new Route53Client({ region: 'us-east-1' });
// Route 53 is a global service — the SDK requires a region for signing but
// the actual API endpoint is us-east-1 behind the scenes.

const zones = await r53.send(new ListHostedZonesCommand({}));
const zoneId = zones.HostedZones?.find((z) => z.Name === 'example.com.')
  ?.Id?.split('/')
  .pop()!;

await r53.send(
  new ChangeResourceRecordSetsCommand({
    HostedZoneId: zoneId,
    ChangeBatch: {
      Changes: [
        // Apex A-alias + AAAA-alias + www in a single atomic change.
        ...(['A', 'AAAA'] as const).flatMap((type) =>
          ['example.com', 'www.example.com'].map((name) => ({
            Action: 'UPSERT' as const,
            ResourceRecordSet: {
              Name: name,
              Type: type,
              AliasTarget: {
                // The hardcoded CloudFront alias hosted zone ID.
                HostedZoneId: 'Z2FDTNDATAQYW2',
                DNSName: 'd1234abcdef.cloudfront.net',
                EvaluateTargetHealth: false,
              },
            },
          })),
        ),
      ],
    },
  }),
);
```

يتيح لك SDK تجميع عدة تغييرات سجلات في استدعاء واحد دون رقصة ملف JSON التي تحتاجها CLI. إن `UPSERT` عملية متساوية الأثر (idempotent): تنشئ السجل إن كان مفقودًا وتستبدله إن كان موجودًا.

## التحقق من تحليل DNS

بعد إنشاء سجلاتك، تحقّق من أن DNS يُحلّ بشكل صحيح.

افحص سجل A:

```bash
dig example.com A +short
```

ينبغي أن ترى عنوان IP واحدًا أو أكثر—وهي عناوين IP لخوادم حافة CloudFront. ستختلف حسب المنطقة وبمرور الوقت؛ وهذا متوقع.

افحص سجل AAAA:

```bash
dig example.com AAAA +short
```

ينبغي أن ترى عنوان IPv6 واحدًا أو أكثر.

لتجاوز ذاكرات التخزين المؤقت والاستعلام من Route 53 مباشرةً، استخدم أحد خوادم الأسماء من منطقتك المستضافة:

```bash
dig example.com A @ns-1234.awsdns-56.org +short
```

إذا أعاد هذا عناوين IP الصحيحة لكن `dig example.com A +short` لم يفعل، فالسجلات صحيحة عند المصدر وأنت تنتظر انتهاء صلاحية ذاكرات التخزين المؤقت.

يمكنك أيضًا التحقق في المتصفح. انتقل إلى `https://example.com`. إذا كانت شهادة ACM مرفقة بالتوزيع واسم النطاق البديل مهيأ، فينبغي أن ترى موقعك يُخدَم عبر HTTPS بشهادة صالحة. افحص شريط عنوان المتصفح بحثًا عن أيقونة القفل.

> **تحذير**
>
> إذا رأيت خطأ CloudFront مثل «Bad Request» أو «The request could not be satisfied»، فالسبب الأرجح أن نطاقك غير مُدرج كاسم نطاق بديل في توزيع CloudFront. ترفض CloudFront الطلبات لأسماء المضيف التي لا تعرفها. تحقّق مرة أخرى من إعدادات التوزيع في وحدة التحكم أو شغّل `aws cloudfront get-distribution-config --id E1A2B3C4D5E6F7 --output json --query "DistributionConfig.Aliases"`.

## زمن الانتشار

تسري تغييرات DNS في Route 53 خلال 60 ثانية على خوادم أسماء Route 53 نفسها. لكن هذا لا يعني أن كل مستخدم على الإنترنت يرى التغيير فورًا. ربما خزّنت المحلّلات العودية حول العالم الإجابة القديمة مؤقتًا، وستستمر في تقديمها حتى تنتهي صلاحية TTL.

إذا ضبطت TTL بقيمة 300 ثانية (5 دقائق) على السجل السابق، فأسوأ حالة هي أن يرى بعض المستخدمين السجل القديم لمدة تصل إلى 5 دقائق بعد التغيير. أما السجلات الجديدة التي لم تكن موجودة سابقًا، فلا ذاكرة قديمة تنتهي صلاحيتها—يصبح السجل مرئيًا بمجرد أن ينشره Route 53.

## ما الذي بنيته

أنشأت سجلات alias من النوعين A وAAAA توجّه نطاقك إلى توزيع CloudFront الخاص بك. أصبح موقعك الآن متاحًا على `example.com` عبر HTTPS، يُخدَم من خلال شبكة الحافة العالمية لـ CloudFront، مع سحب المحتوى من حاوية S3 الخاصة بك. هذه هي الحزمة: S3 يخزّن الملفات، وCloudFront يوزّعها، وACM يؤمّنها، وRoute 53 يجعلها قابلة للوصول على نطاقك.
