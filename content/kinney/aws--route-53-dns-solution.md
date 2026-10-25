---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/aws/route-53-dns-solution"
---

هذا هو حل [تمرين DNS في Route 53](https://stevekinney.com/courses/aws/route-53-dns-exercise). وتتضمن كل خطوة الأوامر الدقيقة، والمخرجات المتوقعة، وإرشادات استكشاف الأخطاء.

> **نصيحة**
>
> إذا بدت وحدة تحكم Route 53 مختلفة قليلًا عند تنفيذك، فأبقِ [دليل تهيئة DNS في Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html) و[مرجع أمر `aws route53 change-resource-record-sets`](https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html) مفتوحين.

## لماذا ينجح هذا

- سجلات الاسم المستعار تتيح لنطاق الجذر أن يشير إلى CloudFront دون خرق قواعد DNS المعتادة بشأن سجلات CNAME عند جذر المنطقة.
- لا يصبح Route 53 موثوقًا (authoritative) إلا بعد أن يفوّض المسجّل النطاق إلى خوادم أسمائه، ولهذا فإن تغييرات خوادم الأسماء تهمّ بقدر ما يهمّ إنشاء السجلات.
- التحقّق بـ `dig` والمتصفح معًا يثبت أن المكدّس من DNS إلى TLS إلى CloudFront يعمل فعلًا، لا أنه مُعدّ على الورق فقط.

## تأكيد المنطقة المستضافة

```bash
aws route53 list-hosted-zones-by-name \
  --dns-name example.com \
  --output json
```

**المخرجات المتوقعة:**

```json
{
  "HostedZones": [
    {
      "Id": "/hostedzone/Z1234567890ABC",
      "Name": "example.com.",
      "Config": {
        "PrivateZone": false
      },
      "ResourceRecordSetCount": 6
    }
  ]
}
```

احفظ معرّف المنطقة المستضافة لاستخدامه لاحقًا:

```bash
HOSTED_ZONE_ID="Z1234567890ABC"
```

أو استخرجه برمجيًا:

```bash
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \
  --output json \
  --query "HostedZones[?Name=='example.com.'].Id | [0]" \
  | tr -d '"' | sed 's|/hostedzone/||')

echo "$HOSTED_ZONE_ID"
```

**إذا حدث خطأ ما:**

- يعيد الاستعلام قائمة فارغة: ليس لديك منطقة مستضافة فعلًا بعد. ارجع إلى [المناطق المستضافة وأنواع السجلات](https://stevekinney.com/courses/aws/hosted-zones-and-record-types)، وأنشئ واحدة، وتأكّد من أن المسجّل يشير إلى خوادم أسمائها قبل المتابعة.
- المنطقة المستضافة موجودة لكن DNS العام يفشل لاحقًا: المسجّل ما زال يستخدم خوادم الأسماء الخطأ.

### تأكيد خوادم الأسماء (للمسجّل الخارجي فقط)

إذا كان نطاقك مسجّلًا خارج Route 53، فتأكّد من أن المسجّل يستخدم خوادم أسماء Route 53 بالفعل:

```
ns-1234.awsdns-56.org
ns-567.awsdns-12.net
ns-890.awsdns-34.co.uk
ns-123.awsdns-78.com
```

استخدم خوادم الأسماء الفعلية من منطقتك المستضافة، لا هذه الأمثلة. وبعد التحديث، تحقّق من أن التفويض يعمل:

```bash
dig example.com NS +short
```

**المخرجات المتوقعة** (بعد الانتشار):

```
ns-1234.awsdns-56.org.
ns-567.awsdns-12.net.
ns-890.awsdns-34.co.uk.
ns-123.awsdns-78.com.
```

إذا كنت لا تزال ترى خوادم الأسماء القديمة، فالانتشار لم يكتمل. وقد يستغرق ذلك حتى 48 ساعة، لكنه ينتهي عادةً في غضون ساعات قليلة.

## إنشاء سجل A مستعار لنطاق الجذر

احصل على اسم نطاق توزيع CloudFront لديك إن لم تكن قد حفظته:

```bash
aws cloudfront get-distribution \
  --id E1A2B3C4D5E6F7 \
  --output json \
  --query "Distribution.DomainName"
```

```json
"d111111abcdef8.cloudfront.net"
```

أنشئ سجل A المستعار:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
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

**المخرجات المتوقعة:**

```json
{
  "ChangeInfo": {
    "Id": "/change/C2345678901BCD",
    "Status": "PENDING",
    "SubmittedAt": "2026-03-18T12:01:00.000Z"
  }
}
```

**إذا حدث خطأ ما:**

- `InvalidChangeBatch: Alias target name does not lie within the target zone`: لا يطابق `DNSName` في هدف الاسم المستعار لديك توزيع CloudFront صالحًا. تحقّق مرتين من اسم نطاق التوزيع.
- `InvalidChangeBatch: RRSet with DNS name example.com. is not permitted in zone`: الأرجح أنك تحاول إنشاء السجل في المنطقة المستضافة الخطأ. تحقّق من أن المنطقة المستضافة خاصة بـ `example.com`.
- `NoSuchHostedZone`: معرّف المنطقة المستضافة خطأ. شغّل `aws route53 list-hosted-zones --output json` للعثور على المعرّف الصحيح.

## إنشاء سجل AAAA مستعار لـ IPv6

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
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

**المخرجات المتوقعة:**

```json
{
  "ChangeInfo": {
    "Id": "/change/C3456789012CDE",
    "Status": "PENDING",
    "SubmittedAt": "2026-03-18T12:02:00.000Z"
  }
}
```

المخرجات متطابقة في البنية مع سجل A. والفرق الوحيد هو `"Type": "AAAA"` في الطلب.

## إنشاء سجلات لـ www

أنشئ سجلي الاسم المستعار A وAAAA معًا لـ `www.example.com` في استدعاء واحد:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
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

**المخرجات المتوقعة:**

```json
{
  "ChangeInfo": {
    "Id": "/change/C4567890123DEF",
    "Status": "PENDING",
    "SubmittedAt": "2026-03-18T12:03:00.000Z"
  }
}
```

**إذا حدث خطأ ما:**

- `InvalidChangeBatch: Alias target name does not lie within the target zone`: تأكّد من أن `www.example.com` مُدرج كاسم نطاق بديل (CNAME) على توزيع CloudFront لديك. يمكنك التحقّق بالأمر: <code><span class="line"><span style="color:#82AAFF;font-style:italic">aws</span><span style="color:#ECC48D"> cloudfront</span><span style="color:#ECC48D"> get-distribution-config</span><span style="color:#F78C6C"> \</span></span>
<span class="line"><span style="color:#82AAFF"> --id</span><span style="color:#ECC48D"> E1A2B3C4D5E6F7</span><span style="color:#F78C6C"> \</span></span>
<span class="line"><span style="color:#82AAFF"> --output</span><span style="color:#ECC48D"> json</span><span style="color:#F78C6C"> \</span></span>
<span class="line"><span style="color:#82AAFF"> --query</span><span style="color:#D9F5DD"> "</span><span style="color:#ECC48D">DistributionConfig.Aliases</span><span style="color:#D9F5DD">"</span></span></code> ينبغي أن تتضمن المخرجات كلا الاسمين `example.com` و`www.example.com`. وإذا كان `www.example.com` مفقودًا، فحدّث التوزيع لإضافته.

## التحقق من تحليل DNS

انتظر نحو 60 ثانية، ثم تحقّق:

```bash
dig example.com A +short
```

**المخرجات المتوقعة** (ستختلف عناوين IP):

```
13.224.67.18
13.224.67.43
13.224.67.112
13.224.67.84
```

```bash
dig example.com AAAA +short
```

**المخرجات المتوقعة** (ستختلف عناوين IPv6):

```
2600:9000:2252:7800:1a:b6c1:4a40:93a1
2600:9000:2252:ae00:1a:b6c1:4a40:93a1
2600:9000:2252:c200:1a:b6c1:4a40:93a1
2600:9000:2252:a400:1a:b6c1:4a40:93a1
```

إذا لم تر نتائج، فاستعلم من خادم أسماء Route 53 مباشرةً:

```bash
dig example.com A @ns-1234.awsdns-56.org +short
```

إذا أعاد الاستعلام المباشر نتائج بينما لا يعيدها الاستعلام العام، فانتشار DNS الناتج عن تغيير خوادم الأسماء لدى المسجّل لا يزال جاريًا.

أما النطاق الفرعي www:

```bash
dig www.example.com A +short
```

ينبغي أن ترى النمط نفسه من عناوين IP الخاصة بـ CloudFront.

### التحقق في المتصفح

افتح `https://example.com` في متصفح. ينبغي أن ترى:

- محتوى واجهتك الأمامية محمّلًا من S3 عبر CloudFront
- شهادة SSL صالحة (انقر أيقونة القفل للتحقّق من أنها صادرة عن Amazon)
- عنوان URL يعرض `https://example.com` (لا نطاق CloudFront)

وإذا أنشأت سجلات www، فينبغي أن يعرض `https://www.example.com` المحتوى نفسه.

## سرد كل السجلات

```bash
aws route53 list-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --output json
```

**المخرجات المتوقعة:**

```json
{
  "ResourceRecordSets": [
    {
      "Name": "example.com.",
      "Type": "NS",
      "TTL": 172800,
      "ResourceRecords": [
        { "Value": "ns-1234.awsdns-56.org." },
        { "Value": "ns-567.awsdns-12.net." },
        { "Value": "ns-890.awsdns-34.co.uk." },
        { "Value": "ns-123.awsdns-78.com." }
      ]
    },
    {
      "Name": "example.com.",
      "Type": "SOA",
      "TTL": 900,
      "ResourceRecords": [
        { "Value": "ns-1234.awsdns-56.org. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400" }
      ]
    },
    {
      "Name": "example.com.",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net.",
        "EvaluateTargetHealth": false
      }
    },
    {
      "Name": "example.com.",
      "Type": "AAAA",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net.",
        "EvaluateTargetHealth": false
      }
    },
    {
      "Name": "www.example.com.",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net.",
        "EvaluateTargetHealth": false
      }
    },
    {
      "Name": "www.example.com.",
      "Type": "AAAA",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net.",
        "EvaluateTargetHealth": false
      }
    }
  ]
}
```

الأمور الأساسية التي يجب تأكيدها:

- سجلات **NS وSOA** موجودة لـ `example.com` (أُنشئت تلقائيًا، فلا تحذفها).
- سجلات **A وAAAA المستعارة** موجودة لـ `example.com`، وكلاهما يشير إلى توزيع CloudFront لديك.
- سجلات **A وAAAA المستعارة** موجودة لـ `www.example.com` (إن أنشأتها للنطاق الفرعي www).
- كل سجلات الاسم المستعار تعرض `"HostedZoneId": "Z2FDTNDATAQYW2"` واسم نطاق توزيع CloudFront لديك.

## الملخّص

التدفق الكامل، مكثّفًا:

```bash
# Store your values
HOSTED_ZONE_ID="Z1234567890ABC"
CF_DOMAIN="d111111abcdef8.cloudfront.net"

# Create hosted zone (skip if already exists)
aws route53 create-hosted-zone \
  --name example.com \
  --caller-reference "example-com-$(date +%s)" \
  --region us-east-1 \
  --output json

# Create all alias records in one call
aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --output json \
  --change-batch "{
    \"Changes\": [
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"example.com\",
          \"Type\": \"A\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
            \"DNSName\": \"$CF_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      },
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"example.com\",
          \"Type\": \"AAAA\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
            \"DNSName\": \"$CF_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      },
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"www.example.com\",
          \"Type\": \"A\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
            \"DNSName\": \"$CF_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      },
      {
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"www.example.com\",
          \"Type\": \"AAAA\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
            \"DNSName\": \"$CF_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      }
    ]
  }"

# Verify
dig example.com A +short
dig example.com AAAA +short
dig www.example.com A +short
```

أصبح لديك الآن DNS مُعدًّا بالكامل. وموقعك متاح على `https://example.com` و`https://www.example.com`، ويُقدَّم عبر CloudFront، ومؤمَّن بـ ACM، ومحتواه مخزّن في S3.
