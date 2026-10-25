---
title: "كتابة أول سياسة IAM لك"
---

تعرف كيف أن لكل نقطة نهاية API في تطبيق الواجهة الأمامية برمجية وسيطة تتحقق مما إذا كان المستخدم يملك الأذونات الصحيحة قبل السماح بمرور الطلب؟ سياسات IAM هي تلك البرمجية الوسيطة، لكن لكل AWS. إنها مستندات JSON—وأنت تعرف JSON بالفعل—وبمجرد أن تفهم الحقول الخمسة المهمة، تستطيع كتابتها من الصفر بدلًا من نسخ أمثلة من Stack Overflow والأمل في الأفضل. (لقد مررت بذلك، وكلنا مررنا بذلك.)

إن أردت نسخة AWS من لغة السياسات أثناء القراءة، فإن [مرجع سياسات IAM بصيغة JSON](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) هو المصدر الرسمي الموثوق.

## بنية سياسة IAM

كل **سياسة IAM** تتبع الشكل نفسه:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DescriptiveNameForThisStatement",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    }
  ]
}
```

خمسة حقول. هذا كل شيء. لنفصّل كل واحد منها.

### Version

```json
"Version": "2012-10-17"
```

هذه هي **نسخة لغة السياسة**، لا تاريخًا تحدّثه. والنسخة الحالية (والعملية الوحيدة) هي `2012-10-17`. طرحتها AWS في 2012 وأبقتها منذ ذلك الحين. وهناك نسخة أقدم (`2008-10-17`) تفتقر إلى ميزات مثل متغيرات السياسة—لا تستخدمها.

أدرج هذا الحقل دائمًا، واضبطه دائمًا على `2012-10-17`، ثم انتقل.

### Statement

الـ **Statement** مصفوفة من قواعد الأذونات الفردية. كل عنصر في المصفوفة قاعدة واحدة تسمح أو تمنع إجراءات محددة على موارد محددة. ويمكن لسياسة واحدة أن تحتوي عدة بيانات:

```json
"Statement": [
  { "Effect": "Allow", "Action": "s3:GetObject", "Resource": "..." },
  { "Effect": "Allow", "Action": "s3:PutObject", "Resource": "..." }
]
```

يمكنك دمجها في بيان واحد بمصفوفة إجراءات (سنصل إلى ذلك)، لكن فصلها يحافظ على قابلية قراءة كل قاعدة.

### Sid (اختياري)

الـ **Sid** (معرّف البيان) تسمية اختيارية مقروءة بشريًا للبيان. ولا أثر وظيفي له على التقييم—فهو لك ولزملائك البشر فقط.

```json
"Sid": "AllowReadAccessToAssetsBucket"
```

أنصحك بإدراج واحد دائمًا. فعندما تحدّق في سياسة بعد ستة أشهر محاولًا معرفة ما تفعله، فإن Sid وصفيًا يستحق وزنه ذهبًا.

### Effect

**Effect** إما `"Allow"` أو `"Deny"`. ولا خيارات أخرى. ويحدد هذا الحقل ما إذا كان البيان يمنح الوصول أو يحجبه.

كما شرحنا في [النموذج الذهني لـ IAM](https://stevekinney.com/courses/aws/iam-mental-model)، فإن `Deny` يتغلب على `Allow` دائمًا. فإذا قال بيان `Allow` وقال آخر `Deny` للإجراء والمورد نفسيهما، يفوز الـ `Deny`.

> **`Effect` مقابل `Action`**
>
> فكّر في **Action** باعتباره *ما يحاول شخص فعله* وفي **Effect** باعتباره *جواب AWS على ذلك الطلب*. `s3:GetObject` هو الإجراء، و`"Allow"` أو `"Deny"` هو الأثر. وجمعهما معًا يعطيك قاعدة كاملة: «اسمح بـ `s3:GetObject`» أو «امنع `s3:GetObject`». الإجراء نفسه، والحكم مختلف.

### Action

يحدد **Action** عمليات AWS API التي ينطبق عليها البيان. وتتبع الإجراءات النمط `<service>:<operation>`:

- `s3:GetObject`—قراءة ملف من S3
- `s3:PutObject`—رفع ملف إلى S3
- `cloudfront:CreateInvalidation`—إبطال الملفات المخزنة مؤقتًا في CloudFront
- `iam:CreateUser`—إنشاء مستخدم IAM جديد

يمكنك تحديد إجراء واحد كسلسلة أو إجراءات متعددة كمصفوفة:

```json
"Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
```

تعمل أحرف البدل أيضًا. `s3:*` تعني «كل إجراءات S3»، و`s3:Get*` تعني «كل إجراءات S3 التي تبدأ بـ Get». وسنتحدث عن سبب خطورة أحرف البدل في [مبدأ أقل الامتيازات](https://stevekinney.com/courses/aws/principle-of-least-privilege).

> **نصيحة**
>
> لست بحاجة إلى حفظ أسماء الإجراءات. فـ AWS توثّق كل إجراء لكل خدمة. ابحث عن «IAM actions for S3» أو «IAM actions for CloudFront» وستجد القائمة الكاملة. ويمكن أن تساعدك أداة AWS Policy Generator أيضًا في اكتشاف أسماء الإجراءات الصحيحة.

### Resource

يحدد حقل **Resource** موارد AWS التي ينطبق عليها البيان، معرّفة بـ **ARN (Amazon Resource Name)**. والـ ARNs معرّفات فريدة عالميًا تتبع هذه الصيغة:

```
arn:aws:<service>:<region>:<account-id>:<resource-type>/<resource-id>
```

بضعة أمثلة:

| المورد | ARN |
| --- | --- |
| حاوية S3 محددة | `arn:aws:s3:::my-frontend-app-assets` |
| كل الكائنات في تلك الحاوية | `arn:aws:s3:::my-frontend-app-assets/*` |
| توزيع CloudFront محدد | `arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7` |
| كل الموارد (خطير) | `*` |

لاحظ أن ARNs حاويات S3 لا تتضمن منطقة أو معرّف حساب—فأسماء الحاويات فريدة عالميًا، لذا لا تحتاج AWS إليها لتحديد المورد. أما الخدمات الأخرى فتشمل المنطقة والحساب. وستألف نمط كل خدمة مع استخدامك لها.

> **تحذير**
>
> الفرق بين `arn:aws:s3:::my-frontend-app-assets` (الحاوية نفسها) و`arn:aws:s3:::my-frontend-app-assets/*` (الكائنات داخل الحاوية) مهم. فـ `s3:ListBucket` يعمل على الحاوية، بينما `s3:GetObject` يعمل على الكائنات داخل الحاوية. وإذا خلطت بينهما، فلن تعمل سياستك ولن تخبرك رسائل الخطأ بالسبب.

## سياسة حقيقية: وصول للقراءة فقط إلى حاوية الأصول

> **نصيحة**
>
> جميع سياسات IAM في هذا الدرس متاحة كملفات JSON مستقلة في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/policies/iam-policies).

لنكتب سياسة تمنح وصولًا للقراءة فقط إلى حاوية أصولك الثابتة. هذا نوع السياسة الذي ترفقه بدور لا يحتاج إلا إلى تقديم الملفات—لا رفع ولا حذف.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets"
    },
    {
      "Sid": "AllowReadObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    }
  ]
}
```

*ملاحظة:* `s3:ListBucket` يعمل على ARN الحاوية، لا على الكائنات داخلها.

*ملاحظة:* `s3:GetObject` يعمل على الكائنات، لذا ينتهي الـ ARN بـ `/*`.

بيانان، ونطاقان مختلفان للموارد. الأول يتيح لك سرد ما في الحاوية، والثاني يتيح لك قراءة الملفات الفردية. ومعهما تحصل على وصول للقراءة فقط. لا أكثر.

## إرفاق سياسة

السياسة الموجودة بمفردها لا تفعل شيئًا. عليك إرفاقها بمستخدم أو مجموعة أو دور.

### باستخدام وحدة التحكم

1. انتقل إلى **IAM** > **Policies** > **Create policy**.
2. انقر على علامة تبويب **JSON** (المحرر المرئي جيد للاستكشاف، لكن يجب أن تعرف JSON).
3. الصق مستند سياستك.
4. انقر **Next**، وأعطها اسمًا مثل `S3AssetsReadOnly`، ثم انقر **Create policy**.
5. انتقل إلى المستخدم أو الدور الذي تريد منحه هذه الأذونات.
6. انقر **Add permissions** > **Attach policies**.
7. ابحث عن `S3AssetsReadOnly` وأرفقها.

### باستخدام CLI

يمكنك أيضًا إنشاء السياسات وإرفاقها عبر AWS CLI:

```bash
aws iam create-policy \
  --policy-name S3AssetsReadOnly \
  --policy-document file://s3-assets-read-only.json \
  --region us-east-1 \
  --output json
```

يعيد هذا الأمر **ARN** الخاص بالسياسة، وستحتاجه لإرفاقها:

```bash
aws iam attach-user-policy \
  --user-name admin \
  --policy-arn arn:aws:iam::123456789012:policy/S3AssetsReadOnly \
  --region us-east-1 \
  --output json
```

### باستخدام SDK

```typescript
import { IAMClient, CreatePolicyCommand, AttachUserPolicyCommand } from '@aws-sdk/client-iam';

const iam = new IAMClient({ region: 'us-east-1' });

const policy = await iam.send(
  new CreatePolicyCommand({
    PolicyName: 'S3AssetsReadOnly',
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'AllowListBucket',
          Effect: 'Allow',
          Action: ['s3:ListBucket'],
          Resource: 'arn:aws:s3:::my-frontend-app-assets',
        },
        {
          Sid: 'AllowReadObjects',
          Effect: 'Allow',
          Action: ['s3:GetObject'],
          Resource: 'arn:aws:s3:::my-frontend-app-assets/*',
        },
      ],
    }),
  }),
);

await iam.send(
  new AttachUserPolicyCommand({
    UserName: 'admin',
    PolicyArn: policy.Policy!.Arn!,
  }),
);
```

## سياسة أكثر عملية: أذونات النشر

إليك شيئًا أقرب إلى ما ستحتاجه فعلًا. تتيح هذه السياسة لمستخدم مزامنة ملفات إلى حاوية S3 وإنشاء إبطالات CloudFront—وهما العمليتان اللازمتان لنشر واجهة أمامية ثابتة:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Sync",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-frontend-app-assets", "arn:aws:s3:::my-frontend-app-assets/*"]
    },
    {
      "Sid": "AllowCloudFrontInvalidation",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
    }
  ]
}
```

*ملاحظة:* النطاق محصور في توزيع محدد واحد، لا في كل التوزيعات في الحساب.

لاحظ أن حقل **Resource** في بيان CloudFront يستهدف توزيعًا محددًا عبر ARN الخاص به. فلا يستطيع المستخدم إبطال ذاكرات التخزين المؤقت في توزيعات أخرى—فقط في التوزيع الذي حددته. وهذا مقصود.

> **نصيحة**
>
> عند بناء سياسة، ابدأ بالسؤال: «ما أوامر CLI أو استدعاءات SDK التي يحتاج هذا المستخدم إلى تشغيلها؟» فكل أمر CLI يقابل إجراء IAM واحدًا أو أكثر. `aws s3 sync` يحتاج `s3:PutObject` و`s3:DeleteObject` و`s3:ListBucket`، و`aws cloudfront create-invalidation` يحتاج `cloudfront:CreateInvalidation`. اعمل بالاتجاه المعاكس من الأوامر إلى السياسة.

## مفاتيح الشروط: تضييق عمليات السماح

الحقول الخمسة أعلاه (`Version` و`Statement` و`Effect` و`Action` و`Resource`) تشكّل سياسة صالحة. والحقل السادس، `Condition`، يتيح لك تضييق السماح كي يعمل فقط عندما تطابق سمات طلب معينة. وهو ما يحوّل «اسمح بهذا الإجراء على هذا المورد» إلى «اسمح بهذا الإجراء على هذا المورد *فقط عندما يأتي الطلب من منطقتي أنا*» أو «فقط عندما يكون عنوان IP المصدر للمتصل ضمن نطاق معين».

مثال ملموس واحد: قصر مستخدم IAM على عمليات في `us-east-1` فقط. فحتى لو كان لديه إذن استدعاء `ec2:RunInstances`، يرفض الشرط الاستدعاء ما لم يكن الطلب محصور النطاق في `us-east-1`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-east-1"
        }
      }
    }
  ]
}
```

`aws:RequestedRegion` هو **مفتاح شرط عالمي**—متاح في كل طلب. ومن المفاتيح الأخرى الجديرة بالمعرفة:

- **`aws:SourceIp`** — وصول محصور بنطاق CIDR (شبكات المكتب).
- **`aws:SourceVpc`** — من VPC محدد فقط (للأحمال الخاصة).
- **`aws:MultiFactorAuthPresent`** — اشتراط MFA للإجراءات الحساسة.
- **`aws:PrincipalTag/<tagKey>`** — تحكم بنمط ABAC عبر وسم المتصل.

القائمة الكاملة موجودة في [مرجع مفاتيح سياق الشروط العالمية في AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html).

## أخطاء شائعة

**نسيان حقل `Version`.** بدونه، ترجع AWS إلى لغة سياسات 2008، التي تتصرف بشكل مختلف. أدرج دائمًا `"Version": "2012-10-17"`.

**استخدام `Resource: "*"` بدافع العادة.** هذا يمنح الوصول إلى كل مورد من نوع الإجراء في حسابك. وأحيانًا يكون ضروريًا (إجراءات IAM مثل `iam:ListUsers` لا تدعم قيودًا على مستوى المورد)، لكن بالنسبة إلى S3 وCloudFront، احصر النطاق دائمًا في ARNs محددة.

**الخلط بين ARNs الحاويات وARNs الكائنات.** `arn:aws:s3:::my-bucket` هو الحاوية، و`arn:aws:s3:::my-bucket/*` هو الكائنات داخل الحاوية. فبعض الإجراءات تعمل على الحاوية (مثل `s3:ListBucket`)، وأخرى تعمل على الكائنات (مثل `s3:GetObject`). وإذا لم تعمل سياستك، فهذا أول ما تتحقق منه.

أنت تعرف الآن كيف تكتب سياسة من الصفر. وفي [مبدأ أقل الامتيازات](https://stevekinney.com/courses/aws/principle-of-least-privilege)، سنتحدث عن كيفية التأكد من أن سياساتك لا تمنح وصولًا أكثر مما ينبغي.
