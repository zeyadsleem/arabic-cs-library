---
title: "التحكّم في الوصول إلى الأصل في S3"
---

الآن، توزيع CloudFront لديك يعمل — يجلب الملفات من حاوية S3 ويقدّمها عبر مواقع الحافة. لكن حاوية S3 لديك متاحة للعامة أيضًا. فأي شخص يعرف عنوان URL الحاوية يمكنه تجاوز CloudFront كليًا والوصول إلى ملفاتك مباشرة من S3. وهذا يعني أنه يتخطّى التخزين المؤقت، ويتخطّى تهيئة HTTPS، ويتخطّى ترويسات الأمان، وربما يتخطّى أي ضوابط وصول تضعها على الحافة.

إن أردت نسخة AWS خطوة بخطوة من الإعداد نفسه، فإن [دليل CloudFront لتقييد الوصول إلى أصل S3](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) هو المرجع الرسمي.

**التحكّم في الوصول إلى الأصل** (OAC) يصلح هذا. فهو يقيّد حاوية S3 بحيث لا يقرأ منها إلا CloudFront. وعناوين URL المباشرة لـ S3 تُرجع «Access Denied». وكل حركة المرور تتدفق عبر توزيعك: مخزّنة مؤقتًا، ومضغوطة، ومؤمّنة.

```
flowchart LR
    Viewer["Viewer request"] --> Edge["CloudFront"]
    Edge --> Cache{"Cache hit?"}
    Cache -- "Yes" --> Response["Return cached object"]
    Cache -- "No" --> Signed["Signed origin request via OAC"]
    Signed --> Bucket["Private S3 bucket"]
    Bucket --> Edge
    Edge --> Viewer
    Direct["Direct S3 URL"] --> Denied["403 Access Denied"]
```

## لماذا يهمّ OAC

قد تفكّر: «من يهتم إن وصل أحد إلى حاويتي مباشرة؟ إنه موقع ويب عام.» إليك لماذا تهتم:

1. **التكلفة**: نقل بيانات S3 أغلى من نقل بيانات CloudFront في معظم الحالات. فإن تجاوز المستخدمون CloudFront وضربوا S3 مباشرة، دفعت أكثر.
2. **التخزين المؤقت**: طلبات S3 المباشرة تتخطّى ذاكرة CDN المؤقتة، ما يعني أن كل طلب يصل إلى S3. وCloudFront يمتصّ قمم حركة المرور؛ أما S3 فلا.
3. **ترويسات الأمان**: أي ترويسات أمان تهيّئها على توزيع CloudFront (HSTS وCSP وX-Frame-Options) لا تُطبَّق على استجابات S3 المباشرة. وستعدّ هذه في [ترويسات CloudFront وCORS والأمان](https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security).
4. **ضبط الوصول**: إن أضفت لاحقًا مصادقة أو قيودًا جغرافية على مستوى CloudFront، فالوصول المباشر إلى S3 يتجاوزها كلها.

> **نصيحة**
>
> إن كنت تستخدم Vercel أو Netlify، فإن OAC هو مقابل ما تفعله تلك المنصّات لضمان أن مخرجات بنائك لا يمكن الوصول إليها إلا عبر شبكة CDN الخاصة بها، لا عبر تخزين الكائنات الأساسي. لكنك لم تضطر إلى التفكير في الأمر قط لأن المنصّة كانت تتولّاه.

## OAC مقابل OAI

قد ترى إشارات إلى **هوية الوصول إلى الأصل** (OAI) في دروس ووثائق أقدم. وOAI هو سلف OAC، وما زال يعمل، لكن AWS توصي بـ OAC لكل التوزيعات الجديدة. وOAC يدعم ميزات إضافية لا يدعمها OAI:

- التشفير من جانب الخادم باستخدام AWS KMS (SSE-KMS)
- الطلبات الديناميكية (PUT وPOST وDELETE) إلى S3
- حاويات S3 في كل مناطق AWS، بما في ذلك المناطق الاختيارية الأحدث

في هذه الدورة، ستستخدم OAC حصريًا. وإن صادفت OAI في الواقع، فالمفاهيم متشابهة لكن التهيئة مختلفة.

## إنشاء تحكّم بالوصول إلى الأصل

أولًا، أنشئ مورد OAC:

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "my-frontend-app-oac",
    "Description": "OAC for my-frontend-app-assets S3 bucket",
    "SigningProtocol": "sigv4",
    "SigningBehavior": "always",
    "OriginAccessControlOriginType": "s3"
  }' \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة معرّف OAC:

```json
{
  "OriginAccessControl": {
    "Id": "E1OAC2EXAMPLE",
    "OriginAccessControlConfig": {
      "Name": "my-frontend-app-oac",
      "Description": "OAC for my-frontend-app-assets S3 bucket",
      "SigningProtocol": "sigv4",
      "SigningBehavior": "always",
      "OriginAccessControlOriginType": "s3"
    }
  }
}
```

بضعة أمور عن التهيئة:

- **`SigningProtocol`**: `sigv4` هو AWS Signature Version 4، آلية التوقيع المعيارية لطلبات واجهة AWS البرمجية. وهو الخيار الوحيد المدعوم لأصول S3.
- **`SigningBehavior`**: `always` يعني أن CloudFront يوقّع كل طلب إلى S3. والبديل `no-override` يوقّع فقط الطلبات التي لا تحمل ترويسة `Authorization` أصلًا — ولن تحتاجه لموقع ثابت.
- **`OriginAccessControlOriginType`**: `s3` يخبر CloudFront أن هذا OAC مخصّص لأصل S3. ويدعم CloudFront أيضًا OAC لأنواع أصول أخرى (MediaStore وعناوين URL لدوال Lambda)، لكن S3 هو ما تحتاجه هنا.

احفظ قيمة `Id` — ستحتاجها في الخطوة التالية.

في لوحة التحكم، يتولّى معالج **Create distribution** هذا تلقائيًا: اختيار «Allow private S3 bucket access to CloudFront» في خطوة تحديد الأصل ينشئ OAC ويرفقه في عملية واحدة.

معالج CloudFront يعرض خانة «Allow private S3 bucket access to CloudFront» محدّدة وخيار «Use recommended origin settings» مختارًا.

### باستخدام SDK

```typescript
import {
  CloudFrontClient,
  CreateOriginAccessControlCommand,
  GetDistributionConfigCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

const oac = await cloudfront.send(
  new CreateOriginAccessControlCommand({
    OriginAccessControlConfig: {
      Name: 'my-frontend-app-oac',
      Description: 'OAC for my-frontend-app-assets S3 bucket',
      SigningProtocol: 'sigv4',
      SigningBehavior: 'always',
      OriginAccessControlOriginType: 's3',
    },
  }),
);
const oacId = oac.OriginAccessControl!.Id!;

// Fetch, mutate, update — same three-step dance as the CLI, just without jq:
const current = await cloudfront.send(new GetDistributionConfigCommand({ Id: 'E1A2B3C4D5E6F7' }));
const config = current.DistributionConfig!;
config.Origins!.Items![0].OriginAccessControlId = oacId;
config.Origins!.Items![0].S3OriginConfig!.OriginAccessIdentity = '';

await cloudfront.send(
  new UpdateDistributionCommand({
    Id: 'E1A2B3C4D5E6F7',
    IfMatch: current.ETag,
    DistributionConfig: config,
  }),
);
```

يتجنّب SDK بهلوانيات jq — فـ `GetDistributionConfigCommand` يُرجع التهيئة ككائن عادي يمكنك تعديله وإعادته إلى `UpdateDistributionCommand` مع `ETag` المُرجَع.

## تحديث التوزيع لاستخدام OAC

تحديث توزيع CloudFront عملية من ثلاث خطوات: اجلب التهيئة الحالية، وعدّلها، وقدّم التحديث مع `ETag` من الجلب.

اجلب التهيئة الحالية:

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > distribution-config-current.json
```

تحتوي الاستجابة حقلين في المستوى الأعلى: `ETag` و`DistributionConfig`. وتحتاج إلى كليهما. فـ `ETag` معرّف إصدار — يستخدمه CloudFront لمنع التعديلات المتزامنة (النمط نفسه الذي تتبعه طلبات HTTP الشرطية).

الآن عدّل التهيئة. تحتاج إلى إجراء تغييرين على الأصل داخل `DistributionConfig.Origins.Items[0]`:

1. أضف `"OriginAccessControlId": "E1OAC2EXAMPLE"` إلى الأصل.
2. تأكّد من أن `S3OriginConfig.OriginAccessIdentity` مضبوط على `""` (سلسلة فارغة — فأنت لا تستخدم OAI القديم).

ينبغي أن يبدو الأصل المحدّث هكذا:

```json
{
  "Id": "S3-my-frontend-app-assets",
  "DomainName": "my-frontend-app-assets.s3.us-east-1.amazonaws.com",
  "OriginAccessControlId": "E1OAC2EXAMPLE",
  "S3OriginConfig": {
    "OriginAccessIdentity": ""
  }
}
```

استخرج الجزء `DistributionConfig` وحده إلى ملف جديد (مع إزالة غلاف `ETag`). لا تحاول تعديل هذا يدويًا — فالملف كبير، وطلب `update-distribution` يرفضه إن لم يطابق المخطط مطابقة تامة. استخدم `jq`:

```bash
jq '.DistributionConfig' distribution-config-current.json > distribution-config-updated.json

# Apply your two edits to distribution-config-updated.json:
#   1. Set .Origins.Items[0].OriginAccessControlId = "E1OAC2EXAMPLE"
#   2. Ensure .Origins.Items[0].S3OriginConfig.OriginAccessIdentity = ""
# You can do both in one shot with jq:

jq '.Origins.Items[0].OriginAccessControlId = "E1OAC2EXAMPLE"
    | .Origins.Items[0].S3OriginConfig.OriginAccessIdentity = ""' \
   distribution-config-updated.json > distribution-config-updated.tmp \
  && mv distribution-config-updated.tmp distribution-config-updated.json

# Capture the ETag for the --if-match flag:
ETAG=$(jq -r '.ETag' distribution-config-current.json)
```

الآن قدّم التحديث:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match "$ETAG" \
  --distribution-config file://distribution-config-updated.json \
  --region us-east-1 \
  --output json
```

إن لم يطابق `ETag`، رفض CloudFront التحديث — وهذا يمنعك من الكتابة فوق تغييرات أجراها شخص آخر (أو عملية متزامنة).

في لوحة التحكم، يعرض تبويب **Origins** في توزيعك OAC مرفقًا بأصل S3 في عمود **Origin access**.

تبويب Origins في توزيع CloudFront يعرض أصل S3 مع معرّف OAC في عمود Origin access.

## تحديث سياسة حاوية S3

OAC مرفق بـ CloudFront، لكن S3 لا يعرف عنه شيئًا بعد. تحتاج إلى استبدال سياسة حاويتك بسياسة تسمح لـ CloudFront بالقراءة من الحاوية وترفض كل من عداه.

إن كنت قد اتبعت [سياسات الحاويات والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access)، فحاويتك تحمل الآن سياسة قراءة عامة فيها `"Principal": "*"`. استبدلها بهذه (وهي متوفرة أيضًا باسم [`cloudfront-oac.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/bucket-policies/cloudfront-oac.json) في مستودع Scratch Lab):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
        }
      }
    }
  ]
}
```

تفعل هذه السياسة شيئين:

- **تسمح** للمبدأ الخدمي لـ CloudFront (`cloudfront.amazonaws.com`) باستدعاء `s3:GetObject` على حاويتك.
- **تقيّد** ذلك الوصول بتوزيعك المحدّد باستخدام **شرط**. فلا يمكن إلا للتوزيع `E1A2B3C4D5E6F7` في الحساب `123456789012` أن يقرأ من هذه الحاوية. أما توزيعات CloudFront الأخرى — حتى تلك الموجودة في حساب AWS نفسه — فمحجوبة.

طبّق السياسة:

```bash
aws s3api put-bucket-policy \
  --bucket my-frontend-app-assets \
  --policy file://bucket-policy-oac.json \
  --region us-east-1
```

في لوحة التحكم، يعرض تبويب **Permissions** في الحاوية السياسة المحدّثة مع المبدأ الخدمي `cloudfront.amazonaws.com` وARN التوزيع في الشرط.

تبويب Permissions في حاوية S3 يعرض سياسة الحاوية مع cloudfront.amazonaws.com كمبدأ خدمي وشرط يقيّد الوصول إلى ARN توزيع محدّد.

## إعادة تفعيل حجب الوصول العام

مع وجود OAC، لم تعد حاويتك بحاجة إلى أن تكون متاحة للعامة. أعد تفعيل إعدادات حجب الوصول العام التي عطّلتها في [سياسات الحاويات والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access):

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
  --region us-east-1
```

> **تحذير**
>
> انتظر — هل أعدت للتو تفعيل حجب الوصول العام مع وجود سياسة حاوية تسمح لـ CloudFront؟ نعم. فسياسة المبدأ الخدمي لـ CloudFront ليست سياسة «عامة» في تعريف AWS. فحجب الوصول العام يحجب السياسات التي فيها `"Principal": "*"` (الجميع) أو السياسات التي تمنح الوصول لأي مستخدم مجهول. أما سياسة مقيّدة بالمبدأ الخدمي `cloudfront.amazonaws.com` مع شرط على ARN توزيع محدّد، فلا تُعدّ عامة. وهكذا تريد AWS بالضبط أن تعمل.

## التحقّق من أنه يعمل

اختبر أن CloudFront ما زال يقدّم محتواك:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

ينبغي أن تحصل على استجابة `200 OK` مع ترويسات CloudFront.

الآن اختبر أن الوصول المباشر إلى S3 محجوب:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

ينبغي أن تحصل على استجابة `403 Forbidden`. فالحاوية لم تعد متاحة للعامة — لا يقرأ منها إلا CloudFront.

## الصورة الكاملة

إليك ما تبدو عليه البنية بعد تهيئة OAC:

1. يطلب المستخدم `https://d1234abcdef.cloudfront.net/index.html`.
2. يفحص CloudFront ذاكرته المؤقتة على الحافة.
3. عند غياب الكائن من الذاكرة المؤقتة، يرسل CloudFront طلبًا موقّعًا إلى S3 باستخدام بيانات اعتماد SigV4 الخاصة بـ OAC.
4. تفحص S3 سياسة الحاوية، وترى أن الطلب من `cloudfront.amazonaws.com` مع ARN التوزيع الصحيح، فتُرجع الكائن.
5. يخزّن CloudFront الكائن مؤقتًا ويعيده إلى المستخدم.
6. أي طلب مباشر إلى S3 (دون توقيع CloudFront) يُرفض.

هذه هي البنية الصحيحة لواجهة أمامية ثابتة على AWS. وبصراحة، هو أحد تلك الأمور التي تبدو ككثير من الطقوس أول مرة تعدّها، لكنك لا تفكّر فيه مجددًا بعد أن يستقرّ. فملفاتك تعيش في حاوية S3 خاصة، والسبيل الوحيد للوصول إليها هو توزيع CloudFront لديك.

> **نصيحة**
>
> إن احتجت يومًا إلى تصحيح مشكلات OAC، فافحص ثلاثة أشياء: (1) أن معرّف OAC على أصل التوزيع يطابق OAC الذي أنشأته، (2) أن سياسة الحاوية تمنح `s3:GetObject` للمبدأ الخدمي `cloudfront.amazonaws.com` مع شرط على ARN توزيعك، (3) أن حقل `S3OriginConfig.OriginAccessIdentity` سلسلة فارغة (لا محذوف — فارغة).

محتواك مقفل خلف CloudFront ومؤمّن بشكل صحيح. في الدرس التالي، ستتعلم كيف يخزّن CloudFront محتواك مؤقتًا — كيف تعمل سلوكيات التخزين المؤقت ومدد TTL وعمليات الإبطال — حتى تتحكّم فيما يُخزَّن مؤقتًا، وكم من الوقت، وكيف تفرض تحديثًا بعد عمليات النشر.
