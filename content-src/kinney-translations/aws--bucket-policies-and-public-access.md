---
title: "سياسات الحاويات والوصول العام"
---

ملفاتك موجودة في الحاوية، لكن لا أحد يستطيع الوصول إليها. وهذا مقصود—فالوضع الافتراضي في S3 هو «ارفض كل شيء ما لم يُسمح به صراحة». ولتقديم موقع ثابت، عليك أن تخبر S3 بأن الجمهور مسموح له بقراءة ملفاتك. تفعل ذلك عبر **سياسة حاوية**.

إن أردت نسخة AWS من الحواجز قريبة منك، فإن [دليل مستخدم Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) و[توثيق حظر الوصول العام](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) هما المرجعان الرسميان.

إذا كنت قد أكملت [كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy) في قسم أساسيات IAM، فستبدو بنية سياسة الحاوية مألوفة لديك. فشكل JSON شبه مطابق. والفرق يكمن في مكان وجود السياسة ومن تنطبق عليه.

![مخطط يقارن بين سياسات IAM وسياسات الحاوية وS3 Block Public Access، ويوضح كيفية تقييم طلب قراءة عام.](/images/kinney/9001c5485feca325.svg)

## سياسات IAM مقابل سياسات الحاويات

في قسم أساسيات IAM، أرفقت سياسات IAM بمستخدمين أو مجموعات أو أدوار. تلك السياسات تسافر مع الهوية: «هذا المستخدم مسموح له بفعل هذه الأشياء». أما سياسة الحاوية فهي العكس—تُرفق بالمورد وتقول: «هؤلاء الأشخاص مسموح لهم بفعل أشياء بي».

كلتاهما مستندات JSON تحتوي على `Version` و`Statement` و`Effect` و`Action` و`Resource`. والفرق الجوهري هو حقل **Principal**:

- **سياسات IAM** لها principal ضمني—أيًّا كان من أُرفقت به السياسة.
- **سياسات الحاويات** لها حقل **Principal** صريح يحدد من تنطبق عليه السياسة. وللوصول العام، يكون الـ principal هو `"*"`، أي الجميع.

أفكر في الأمر هكذا: سياسة IAM هي **شارة** ترتديها، وسياسة الحاوية هي **لافتة على الباب**.

> **نصيحة**
>
> عندما تنطبق سياسة IAM وسياسة حاوية على الطلب نفسه، تقيّمهما AWS معًا. وأي `Deny` صريح في أي منهما يفوز. وإذا لم يوجد `Deny` صريح، فإن `Allow` في أي منهما يمنح الوصول. يُسمى هذا **منطق تقييم السياسات**، وفهمه يوفر ساعات من تصحيح أخطاء «Access Denied».

## تعطيل حظر الوصول العام

قبل أن تتمكن من إرفاق سياسة حاوية عامة، عليك تعطيل إعدادات حظر الوصول العام التي تُمكّنها AWS افتراضيًا. في حاوية جديدة، تُظهر علامة تبويب **Permissions** الإعدادات الأربعة كلها مفعّلة.

علامة تبويب Permissions في حاوية S3 تعرض إعداد حظر الوصول العام موسومًا بـ On مع تفعيل القيود الأربعة كلها. وتحديدًا، عليك إيقاف `BlockPublicPolicy` (حتى تستطيع وضع سياسة عامة على الحاوية) و`RestrictPublicBuckets` (حتى تصبح السياسة العامة سارية فعلًا).

ومن أجل البساطة، ولأننا نستضيف موقعًا ثابتًا عامًا، سنعطّل إعدادات حظر الوصول العام الأربعة كلها:

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-1
```

تحقق من التغيير:

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "PublicAccessBlockConfiguration": {
    "BlockPublicAcls": false,
    "IgnorePublicAcls": false,
    "BlockPublicPolicy": false,
    "RestrictPublicBuckets": false
  }
}
```

في وحدة التحكم، يبدو تعطيل الإعدادات الأربعة في نموذج **Edit Block Public Access** هكذا—كل مربعات الاختيار فارغة.

![نموذج Edit Block Public Access في S3 مع إلغاء تحديد مربعات الاختيار الأربعة، جاهزًا للحفظ.](/images/kinney/395c2d1df85d2aab.webp)

بعد الحفظ، تؤكد علامة تبويب **Permissions** أن حظر الوصول العام أصبح الآن **Off** مع لافتة نجاح.

![علامة تبويب Permissions في حاوية S3 تعرض حظر الوصول العام موسومًا بـ Off مع لافتة نجاح تؤكد حفظ التغيير.](/images/kinney/3a0a4e4c6063ed2c.webp)

> **تحذير**
>
> تعطيل حظر الوصول العام مناسب لحاوية تقدّم ملفات موقع ثابت عام. لكنه غير مناسب للحاويات التي تحتوي بيانات مستخدمين أو سجلات أو نسخًا احتياطية أو أي شيء حساس. وفي قسم CloudFront، ستنتقل إلى نهج مختلف هو Origin Access Control، يحافظ على خصوصية الحاوية ويسمح لـ CloudFront وحدها بالقراءة منها.

> **حظر الوصول العام على مستوى الحساب**
>
> يوجد حظر الوصول العام على *مستويين*: الحاوية والحساب. فإذا كان حظر الوصول العام **على مستوى الحساب** مفعّلًا (وهو الافتراضي في الحسابات المنشأة في السنوات الأخيرة)، فإنه يتجاوز إعدادات مستوى الحاوية—سترفض حاويتك السياسة العامة بخطأ `AccessDenied` أو `InvalidBucketAclWithBlockPublicAccess` مهما ضبطت على الحاوية نفسها. تحقق من الإعدادات على مستوى الحساب عبر **S3 Console → Block Public Access settings for this account**، أو عبر `aws s3control get-public-access-block --account-id 123456789012`. عطّلها إن لم يكن التغيير على مستوى الحاوية ساريًا، أو—وهذا أفضل—تجاوز مسار الحاوية العامة في هذا الدرس بالكامل وانتقل مباشرة إلى CloudFront + OAC بعد أن تقرأ المفاهيم هنا.

## كتابة سياسة حاوية للقراءة العامة

> **نصيحة**
>
> جميع سياسات الحاويات في هذا الدرس متاحة كملفات JSON مستقلة في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/policies/bucket-policies).

الآن يمكنك إرفاق سياسة حاوية. إليك سياسة كاملة تسمح لأي شخص بقراءة أي كائن في الحاوية:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    }
  ]
}
```

لنفصّل هذا:

- **`Version`**: دائمًا `"2012-10-17"`—هذه نسخة لغة السياسة، لا تاريخًا تحدّثه.
- **`Sid`**: معرّف مقروء بشريًا لهذا البيان. اختياري لكنه مفيد عند تصحيح الأخطاء.
- **`Effect`**: `"Allow"`—امنح الوصول بدلًا من منعه.
- **`Principal`**: `"*"`—الجميع، بما في ذلك المستخدمون غير الموثّقين. هذا ما يجعلها عامة.
- **`Action`**: `"s3:GetObject"`—السماح بقراءة الكائنات فقط. لا سرد، ولا حذف، ولا رفع. قراءة فقط.
- **`Resource`**: `"arn:aws:s3:::my-frontend-app-assets/*"`—تنطبق على جميع الكائنات داخل الحاوية. و`/*` حرجة: فبدونها تنطبق السياسة على الحاوية نفسها، لا على الكائنات داخلها.

> **تحذير**
>
> لاحظ أن `Resource` تنتهي بـ `/*`. فالـ ARN `arn:aws:s3:::my-frontend-app-assets` (بدون `/*`) يشير إلى الحاوية. والـ ARN `arn:aws:s3:::my-frontend-app-assets/*` يشير إلى الكائنات داخل الحاوية. وإجراء `s3:GetObject` يعمل على الكائنات، لذا تحتاج إلى `/*`. والخلط بينهما من أكثر أخطاء سياسات الحاويات شيوعًا.

## تطبيق سياسة الحاوية

احفظ JSON السياسة في ملف وطبّقها عبر CLI:

```bash
aws s3api put-bucket-policy \
  --bucket my-frontend-app-assets \
  --policy file://bucket-policy.json \
  --region us-east-1
```

في وحدة التحكم، تحدث العملية نفسها عبر محرر **Bucket Policy** في علامة تبويب **Permissions**. وتلصق JSON مباشرة في المحرر.

![محرّر Bucket Policy في S3 يعرض سياسة JSON للقراءة العامة مع Principal مضبوطًا على * وAction مضبوطًا على s3:GetObject.](/images/kinney/8387ada94181a23f.webp)

محرر سياسة حاوية S3 يعرض سياسة JSON للقراءة العامة مع تعيين Principal إلى * وAction إلى s3:GetObject.

يمكنك التحقق من تطبيق السياسة:

```bash
aws s3api get-bucket-policy \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

تُغلّف الاستجابة السياسة في حقل `Policy` كسلسلة JSON. وليس هذا أجمل ناتج، لكنه يؤكد أن السياسة في مكانها.

![علامة تبويب Permissions في حاوية S3 تعرض سياسة الحاوية المطبقة التي تمنح وصول قراءة عامًا إلى جميع الكائنات.](/images/kinney/dcd34f9efa156ce1.webp)

## باستخدام SDK

```typescript
import { S3Client, PutBucketPolicyCommand, GetBucketPolicyCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

const policy = {
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'PublicReadGetObject',
      Effect: 'Allow',
      Principal: '*',
      Action: 's3:GetObject',
      Resource: 'arn:aws:s3:::my-frontend-app-assets/*',
    },
  ],
};

await s3.send(
  new PutBucketPolicyCommand({
    Bucket: 'my-frontend-app-assets',
    Policy: JSON.stringify(policy),
    // Policy is a _string_, not an object. JSON.stringify is required.
  }),
);

const current = await s3.send(new GetBucketPolicyCommand({ Bucket: 'my-frontend-app-assets' }));
console.log(JSON.parse(current.Policy!));
```

## ما تفعله هذه السياسة (وما لا تفعله)

تمنح هذه السياسة إذنًا واحدًا محددًا: يمكن لأي شخص قراءة (تنزيل) الكائنات من الحاوية. وهذا بالضبط ما تحتاجه لموقع ثابت—فالمتصفحات تحتاج إلى تنزيل HTML وCSS وJavaScript الخاصة بك.

إليك ما **لا** تسمح به هذه السياسة:

- **سرد محتويات الحاوية** (`s3:ListBucket`). فلا يستطيع الزائر تصفح حاويتك ورؤية كل ملفاتك. عليه أن يعرف المفتاح الدقيق.
- **رفع الملفات** (`s3:PutObject`). فأنت وحدك (أو أي مستخدم IAM أو دور لديه أذونات رفع) يمكنك إضافة ملفات إلى الحاوية.
- **حذف الملفات** (`s3:DeleteObject`). كما سبق—لا يحذف إلا المستخدمون المصرّح لهم.
- **تعديل سياسة الحاوية** (`s3:PutBucketPolicy`). فلا يغيّر السياسة نفسها إلا مستخدم IAM أو الدور الخاص بك.

هذا هو **مبدأ أقل الامتيازات** في التطبيق: امنح الحد الأدنى من الأذونات اللازمة للمهمة. فالجمهور يحتاج إلى قراءة ملفاتك، ولا يحتاج إلى فعل أي شيء آخر.

## اختبار الوصول العام

بعد تطبيق السياسة، يمكنك اختبار إمكانية الوصول إلى الكائنات علنًا باستخدام رابط مباشر. وصيغة URL لكائنات S3 هي:

```
https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

جرّبها بـ `curl`:

```bash
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
```

ينبغي أن تحصل على استجابة `200 OK` مع ترويسات تُظهر نوع المحتوى والحجم. وإذا حصلت على `403 Forbidden`، فتحقق مرة أخرى من تعطيل حظر الوصول العام ومن تطبيق سياسة الحاوية بشكل صحيح.

## سياسة أكثر تقييدًا

السياسة أعلاه هي الحد الأدنى لموقع ثابت عام. لكن قد ترغب في أن تكون أكثر تحديدًا. إليك سياسة تقصر القراءة العامة على أنواع ملفات معينة فقط:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadStaticAssets",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::my-frontend-app-assets/*.html",
        "arn:aws:s3:::my-frontend-app-assets/*.css",
        "arn:aws:s3:::my-frontend-app-assets/*.js",
        "arn:aws:s3:::my-frontend-app-assets/*.png",
        "arn:aws:s3:::my-frontend-app-assets/*.jpg",
        "arn:aws:s3:::my-frontend-app-assets/*.ico",
        "arn:aws:s3:::my-frontend-app-assets/*.woff2",
        "arn:aws:s3:::my-frontend-app-assets/*.webp",
        "arn:aws:s3:::my-frontend-app-assets/*.svg"
      ]
    }
  ]
}
```

هذا أكثر عملًا في الصيانة لكنه يحدّ من التعرض. وعمليًا، يُعدّ حرف البدل `/*` كافيًا لحاوية موقع ثابت لا تحتوي إلا مخرجات البناء. وإذا بدأت تضع ملفات غير عامة في الحاوية نفسها (لا تفعل هذا)، تصبح السياسة التقييدية ضرورية.

## الجمع بين سياسات IAM وسياسات الحاويات

مستخدم IAM الخاص بك من قسم أساسيات IAM يستطيع بالفعل الوصول إلى هذه الحاوية عبر سياسات IAM. وسياسة الحاوية تضيف وصولًا عامًا فوق ذلك. والآليتان تعملان معًا:

- مستخدم IAM الخاص بك يمكنه الرفع والحذف والسرد (بموجب سياسة IAM المرفقة بمستخدمك أو مجموعتك).
- والجمهور يمكنه قراءة الكائنات (بموجب سياسة الحاوية).

إذا احتجت يومًا إلى تصحيح مشكلات الوصول، فتذكّر أن AWS تقيّم السياستين معًا. وأي `Deny` صريح في أي منهما يتجاوز أي `Allow`. وأكثر خطأ شائع هو وجود سياسة حاوية تسمح بالوصول مع نسيان تعطيل حظر الوصول العام—فإعدادات حظر الوصول العام تعمل كطبقة إنكار إضافية تتجاوز سياسات الحاويات.

لديك الآن ملفات في الحاوية وسياسة تسمح للجمهور بقراءتها. لكن الانتقال إلى رابط كائن S3 ليس مثل امتلاك موقع ويب. بعد ذلك، ستُفعّل **استضافة موقع S3 الثابت**، التي تمنحك نقطة نهاية موقع فعلية تدعم مستندات الفهرس (بحيث يقدّم `https://your-url/` الملف `index.html`) وصفحات خطأ مخصصة.
