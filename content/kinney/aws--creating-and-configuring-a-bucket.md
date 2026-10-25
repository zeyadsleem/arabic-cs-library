---
title: "إنشاء حاوية S3 وإعدادها"
lang: ar
source: "https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket"
---

تعرف ما هو S3 وكيف تعمل الحاويات والكائنات. الآن حان وقت إنشاء واحدة. وبنهاية هذا الدرس، سيكون لديك حاوية S3 مهيّأة وجاهزة لاستيعاب ملفات موقعك الثابت. وسنستخدم AWS CLI لأنها الطريقة التي ستؤتمت بها هذا لاحقًا — فالنقر في لوحة التحكم مناسب للاستكشاف، لكنه لا يتوسّع.

إذا أردت نسخة AWS من قواعد الحاويات إلى جانب هذا الدرس، فأبقِ [دليل مستخدم Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) و[قواعد تسمية الحاويات](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) في متناول يدك.

## إنشاء حاوية باستخدام CLI

أبسط طريقة لإنشاء حاوية هي أمر `aws s3 mb` (وmb اختصار «make bucket»):

```bash
aws s3 mb s3://my-frontend-app-assets \
  --region us-east-1
```

ينبغي أن ترى مخرجات مثل:

```
make_bucket: my-frontend-app-assets
```

هذا كل شيء. لديك حاوية. وفي لوحة التحكم، يؤكد شريط نجاح أخضر إنشاء الحاوية وينقلك مباشرة إلى صفحة تفاصيلها.

![صفحة تفاصيل حاوية S3 وهي تعرض شريط نجاح أخضر بعنوان Successfully created bucket في الأعلى مع اسم الحاوية والمنطقة.](/images/kinney/f86e1083ae581dca.webp)

لكن الافتراضيات التي طبّقتها AWS عليها تهم كثيرًا، وفهمها سينقذك من فئة من مشكلات التصحيح تؤرق كل قادم جديد إلى S3.

> **نصيحة**
>
> إذا حصلت على خطأ `BucketAlreadyExists`، فشخص آخر في العالم يملك اسم الحاوية ذلك بالفعل. تذكّر: أسماء الحاويات فريدة عالميًا عبر كل حسابات AWS. جرّب إضافة لاحقة فريدة مثل اسمك أو سلسلة عشوائية: `my-frontend-app-assets-jsmith-2026`.

إذا كنت تفضّل إنشاء الحاوية عبر لوحة تحكم AWS، فإن نموذج Create Bucket يسأل عن الأمرين نفسهما: اسم ومنطقة.

![نموذج S3 Create Bucket وهو يعرض حقل اسم الحاوية مملوءًا بـ my-frontend-app-assets والمنطقة مضبوطة على US East (N. Virginia) us-east-1.](/images/kinney/d07fadea87edd0d9.webp)

## اختيار منطقة

نستخدم `us-east-1` في هذه الدورة، وثمة سبب عملي لذلك. فعندما تربط شهادة ACM بتوزيع CloudFront في النهاية، يجب توفير الشهادة في `us-east-1`. وتتطلب عدة خدمات AWS أخرى `us-east-1` لميزات محدّدة. وإبقاء حاوية S3 في المنطقة نفسها يبسّط كل شيء ويتجنّب تكاليف النقل بين المناطق.

ومع ذلك، يمكن أن توجد حاويات S3 في أي منطقة AWS. فإذا كان مستخدموك في أوروبا أساسًا، فقد تختار `eu-west-1`. وإن كانوا في آسيا، فـ `ap-northeast-1`. ولتطبيق إنتاجي، ينبغي أن تكون منطقة حاويتك قريبة من مستخدميك — أو، بدقة أكبر، قريبة من أصل CloudFront، لأن CloudFront سيكون ما يقدّم ملفاتك فعلًا.

يمكنك التحقق من منطقة حاويتك بعد الإنشاء:

```bash
aws s3api get-bucket-location \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "LocationConstraint": null
}
```

قيد الموقع `null` يعني `us-east-1` — وهي شذوذ تاريخي. وكل منطقة أخرى تُرجع اسمها كسلسلة نصية.

## فهم حجب الوصول العام

كل حاوية S3 أُنشئت منذ أبريل 2023 لديها **Block Public Access** ممكّنًا افتراضيًا. وهذه أربعة إعدادات منفصلة، وجميعها مفعّلة:

1. **BlockPublicAcls** — يحجب تطبيق قوائم ACL العامة الجديدة
2. **IgnorePublicAcls** — يتجاهل أي قوائم ACL عامة موجودة
3. **BlockPublicPolicy** — يحجب سياسات الحاوية العامة الجديدة
4. **RestrictPublicBuckets** — يقيّد الوصول لأي حاوية ذات سياسة عامة

هذا يعني أن AWS تقول: «نفترض أنك لا تريد هذه الحاوية عامة إلا إذا أخبرتنا بخلاف ذلك صراحةً.» ولمعظم حالات استخدام S3، هذا صحيح تمامًا. وللاستضافة موقع ثابت، لديك مساران:

**المسار 1: CloudFront مع التحكم في الوصول إلى الأصل (موصى به).** تُبقي Block Public Access ممكّنًا وتدع CloudFront يصل إلى الحاوية عبر آلية خاصة تسمى التحكم في الوصول إلى الأصل. وتبقى الحاوية خاصة، ويكون CloudFront الشيء الوحيد القادر على القراءة منها. وهذا مسار الإنتاج الذي ستبنيه بمجرد أن يبدأ قسم CloudFront.

**المسار 2: استضافة موقع S3 مباشرة.** تعطّل بعض إعدادات Block Public Access وترفق سياسة حاوية تسمح بالقراءات العامة. وهذا أبسط في الإعداد وهو ما سنفعله في هذه الوحدة لترى الأجزاء المتحركة بوضوح. والمقابل أن أي شخص يملك عنوان URL لـ S3 يمكنه الوصول إلى ملفاتك مباشرة.

في هذه الوحدة، سنختار المسار 2 لأنه يعلّم الآليات بوضوح. تعامل معه كنسخة مختبرية من النشر، لا كخط النهاية. وستقيّد الحاوية بشكل صحيح بمجرد انتقالك إلى CloudFront والتحكم في الوصول إلى الأصل.

لفحص إعدادات Block Public Access الحالية:

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "PublicAccessBlockConfiguration": {
    "BlockPublicAcls": true,
    "IgnorePublicAcls": true,
    "BlockPublicPolicy": true,
    "RestrictPublicBuckets": true
  }
}
```

في لوحة التحكم، يعرض تبويب **Permissions** في الحاوية هذه الإعدادات الأربعة نفسها ضمن **Block Public Access (bucket settings)** — وكلها ممكّنة افتراضيًا.

![تبويب S3 bucket Permissions وهو يعرض إعدادات Block Public Access مع تمكين الخيارات الأربعة كلها، وموسومة On في لوحة التحكم.](/images/kinney/8f28109774ea5b57.webp)

حين تكون مستعدًا لجعل الحاوية متاحة للعامة لاستضافة موقع ثابت، ستحتاج إلى تعطيل هذه الإعدادات. وسنفعل ذلك في [سياسات الحاويات والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access)، بعد أن تفهم ما هي سياسة الحاوية فعلًا.

> **تحذير**
>
> لا تعطّل Block Public Access حتى تفهم بالضبط ما تعرّضه. فالحاوية العامة المهيّأة بشكل خاطئ من أكثر حوادث الأمان شيوعًا في AWS. وكل بضعة أشهر، تتصدّر شركة الأخبار لأنها عرضت عن غير قصد حاوية S3 مليئة ببيانات العملاء. ولموقع ثابت فيه HTML وCSS وJavaScript، الوصول العام مقبول. أما لأي شيء يحتوي على بيانات مستخدمين أو مفاتيح API أو مستندات داخلية، فليس مقبولًا.

## التشفير الافتراضي

منذ يناير 2023، جميع حاويات S3 الجديدة لديها **تشفير من جانب الخادم** ممكّن افتراضيًا باستخدام مفاتيح مُدارة من Amazon S3 (SSE-S3). وهذا يعني أن كل كائن ترفعه يُشفّر تلقائيًا أثناء السكون. ولست بحاجة إلى ضبط أي شيء — إنه يعمل فقط.

ولموقع ثابت، هذا نظري في الغالب. فملفات HTML وJavaScript لديك عامة على أي حال، لذا لا يضيف تشفيرها أثناء السكون أمانًا ذا معنى. لكن من الجيد معرفة أن الافتراضي موجود، لأنه عندما تبدأ بتخزين بيانات خاصة (مثل رفعات المستخدمين أو حالة التطبيق)، يصبح التشفير أثناء السكون متطلبًا امتثاليًا تتولاه S3 نيابة عنك تلقائيًا.

يمكنك التحقق من إعداد التشفير:

```bash
aws s3api get-bucket-encryption \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "ServerSideEncryptionConfiguration": {
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        },
        "BucketKeyEnabled": true
      }
    ]
  }
}
```

## قوائم ACL معطّلة افتراضيًا

استخدم S3 تاريخيًا **قوائم التحكم في الوصول (ACLs)** لإدارة الأذونات على الحاويات والكائنات. وقوائم ACL آلية قديمة، وتوصي AWS الآن باستخدام سياسات الحاويات بدلًا منها. ومنذ أبريل 2023، جميع الحاويات الجديدة لديها قوائم ACL معطّلة افتراضيًا — فالحاوية مضبوطة على «BucketOwnerEnforced»، ما يعني أن مالك الحاوية يملك كل الكائنات، ولا تأثير لقوائم ACL.

وهذا هو الافتراضي الصحيح. ولا ينبغي أن تحتاج إلى لمس قوائم ACL لأي شيء في هذه الدورة. فإن رأيت دروسًا قديمة أو إجابات Stack Overflow تخبرك بضبط ACL مثل `--acl public-read`، فتجاهلها. وبصراحة، كمية النصائح القديمة عن S3 المنتشرة هناك *جديرة بالملاحظة*. استخدم سياسات الحاويات بدلًا منها — فهي أكثر مرونة وأسهل في التدقيق.

## إنشاء حاوية باستخدام API منخفض المستوى

أمر `aws s3 mb` هو الطريق السريع. ولمزيد من التحكم، استخدم `aws s3api create-bucket`:

```bash
aws s3api create-bucket \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "Location": "/my-frontend-app-assets"
}
```

ولمناطق غير `us-east-1`، تحتاج إلى تضمين `--create-bucket-configuration`:

```bash
aws s3api create-bucket \
  --bucket my-frontend-app-assets \
  --region us-west-2 \
  --create-bucket-configuration LocationConstraint=us-west-2 \
  --output json
```

وهذا شذوذ تاريخي آخر — فـ `us-east-1` هي منطقة S3 الأصلية ولا تتطلب قيد الموقع. وكل منطقة أخرى تتطلبه.

> **نصيحة**
>
> إذا أنشأت الحاوية بالفعل باستخدام `aws s3 mb`، فلست بحاجة إلى إنشائها مرة أخرى باستخدام `s3api`. فالأمران ينشئان الحاوية نفسها — و`s3 mb` مجرّد غلاف أعلى مستوى حول `s3api create-bucket`.

## العملية نفسها باستخدام AWS SDK for JavaScript v3

كل أمر CLI في هذه الدورة يقابل استدعاء SDK. يقرأ مهندسو الواجهات الأمامية CLI على أنه «عمل بنية تحتية» وSDK على أنه «عمل تطبيق» — لكنها العمليات نفسها بوسائل نقل مختلفة. وهذا مكافئ SDK v3 لكل ما سبق:

```typescript
import {
  S3Client,
  CreateBucketCommand,
  PutBucketEncryptionCommand,
  PutPublicAccessBlockCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });
// Credentials resolve via the default provider chain: env vars, ~/.aws/credentials,
// IAM role, SSO session, etc. Never hardcode keys in application code.

await s3.send(
  new CreateBucketCommand({
    Bucket: 'my-frontend-app-assets',
    // us-east-1 is the only region where LocationConstraint must be omitted.
  }),
);

await s3.send(
  new PutPublicAccessBlockCommand({
    Bucket: 'my-frontend-app-assets',
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      IgnorePublicAcls: true,
      BlockPublicPolicy: true,
      RestrictPublicBuckets: true,
    },
  }),
);

await s3.send(
  new PutBucketEncryptionCommand({
    Bucket: 'my-frontend-app-assets',
    ServerSideEncryptionConfiguration: {
      Rules: [{ ApplyServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' } }],
    },
  }),
);

// Verify — HeadBucketCommand throws if the bucket doesn't exist or is forbidden.
await s3.send(new HeadBucketCommand({ Bucket: 'my-frontend-app-assets' }));
```

تصل CLI وSDK إلى نقاط نهاية API نفسها. فإن استطعت كتابة أحدهما، استطعت كتابة الآخر — فالأشكال متطابقة.

## التحقق من حاويتك

لنتأكد من أن كل شيء يبدو صحيحًا. اسرد حاوياتك:

```bash
aws s3api list-buckets \
  --region us-east-1 \
  --output json
```

ينبغي أن ترى حاويتك في القائمة مع تاريخ إنشاء. ويمكنك أيضًا فحص الحاوية تحديدًا:

```bash
aws s3api head-bucket \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

إذا عاد الأمر دون خطأ، فالحاوية موجودة ولديك وصول إليها. و404 تعني أن الحاوية غير موجودة؛ و403 تعني أنها موجودة لكنك لا تملك الإذن (وهو ما قد يحدث إن كان شخص آخر يملك حاوية بهذا الاسم، كما هو مشمول في [كتابة أول سياسة IAM لديك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy)).

![قائمة S3 Buckets وهي تعرض حاوية my-frontend-app-assets المنشأة حديثًا مع تاريخ إنشائها ومنطقتها.](/images/kinney/25ee600050e1c3e3.webp)

## ما لديك حتى الآن

لديك الآن حاوية S3 بـ:

- اسم فريد عالميًا
- تشفير من جانب الخادم ممكّن (افتراضي)
- Block Public Access ممكّن (افتراضي — سنعدّله لاحقًا)
- قوائم ACL معطّلة (افتراضي — لن نغيّر هذا)
- موطن في `us-east-1`

التالي، سترفع ملفات إلى هذه الحاوية وتتعلم كيف يعمل `aws s3 cp` و`aws s3 sync` — بما في ذلك المزالق المتعلقة بأنواع المحتوى التي توقع كل مهندس واجهات أمامية في المرة الأولى.
