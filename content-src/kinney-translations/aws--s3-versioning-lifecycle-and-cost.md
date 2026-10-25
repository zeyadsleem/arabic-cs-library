---
title: "الإصدارات وقواعد دورة الحياة والكلفة"
---

لديك موقع ثابت عامل على S3. الآن تحتاج إلى حمايته. فكل عملية نشر تجريها تكتب فوق النسخة السابقة من ملفاتك. وإذا خرج بناء سيئ وأردت التراجع، فتلك الملفات القديمة قد اختفت. وإذا نفّذ شخص في فريقك بالخطأ `aws s3 sync --delete` على الدليل الخطأ، فكل شيء يختفي. (اسألني كيف أعرف.) **الإصدارات** تحلّ هذا بالاحتفاظ بكل إصدار من كل كائن في الحاوية، و**قواعد دورة الحياة** تمنع الإصدارات من رفع كلفة تخزينك.

إذا أردت مواد AWS المصدرية إلى جانب هذا الدرس، فأبقِ [دليل الإصدارات في S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html) و[مرجع قواعد دورة الحياة](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) و[صفحة أسعار Amazon S3](https://aws.amazon.com/s3/pricing/) في متناول يدك.

## لماذا تهمّ الإصدارات

بدون الإصدارات، S3 نظام «الكتابة الأخيرة تفوز». فعندما ترفع `index.html` جديدًا، يُستبدل القديم بصمت. وعندما تحذف `main.js`، يختفي نهائيًا. لا سلة محذوفات، ولا تراجع، ولا مطالبة «هل أنت متأكد؟».

مع تمكين **الإصدارات**، تحتفظ S3 بكل إصدار من كل كائن. ارفع `index.html` جديدًا، وتبقى النسخة القديمة موجودة، ويمكن الوصول إليها بمعرّف إصدارها. واحذف `index.html`، فتضيف S3 **علامة حذف** بدلًا من إزالة الكائن فعليًا—فتصبح النسخة الحالية غير مرئية، لكن كل الإصدارات السابقة ما زالت قابلة للاسترجاع.

هذه شبكة أمانك. نشر سيئ؟ تراجع إلى الإصدار السابق. حذف عرضي؟ أزل علامة الحذف. هل كتب شخص فوق الملف الخطأ؟ كل إصدار ما زال موجودًا.

```
flowchart LR
    Upload["Upload index.html"] --> Current["Current version"]
    NewUpload["Upload a newer index.html"] --> Noncurrent["Previous version becomes noncurrent"]
    Delete["Delete the object"] --> Marker["Delete marker becomes current"]
    Noncurrent --> Retain["Retained for rollback"]
    Retain --> Rule["Lifecycle rule after N days"]
    Rule --> Expire["Expire or transition old versions"]
```

## تمكين الإصدارات

مكّن الإصدارات على حاويتك:

```bash
aws s3api put-bucket-versioning \
  --bucket my-frontend-app-assets \
  --versioning-configuration Status=Enabled \
  --region us-east-1
```

تحقّق:

```bash
aws s3api get-bucket-versioning \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

```json
{
  "Status": "Enabled"
}
```

من هذه اللحظة فصاعدًا، يحصل كل كائن ترفعه على معرّف إصدار، والحذف أو الكتابة فوق كائن يحفظ الإصدارات السابقة.

تبويب خصائص حاوية S3 وهو يعرض حالة الإصدارات مضبوطة على Enabled مع شريط نجاح يؤكد التغيير.

> **تحذير**
>
> لا يمكن تعطيل الإصدارات بعد تمكينها—بل تعليقها فقط. وعند التعليق، تُخزّن الكائنات الجديدة بلا معرّفات إصدار، لكن الكائنات ذات الإصدارات تبقى. فإن مكّنت الإصدارات، فخطّط لإبقائها مفعّلة واستخدام قواعد دورة الحياة لإدارة الإصدارات القديمة. فتبديل الإصدارات تشغيلًا وإيقافًا يُنشئ خليطًا مربكًا من الكائنات ذات الإصدارات وغيرها.

## العمل مع الإصدارات

بعد تمكين الإصدارات ورفع ملف بضع مرات، يمكنك سرد كل الإصدارات:

```bash
aws s3api list-object-versions \
  --bucket my-frontend-app-assets \
  --prefix "index.html" \
  --region us-east-1 \
  --output json
```

```json
{
  "Versions": [
    {
      "Key": "index.html",
      "VersionId": "3HL4kqtJvjVBH40Nrjfkd",
      "IsLatest": true,
      "LastModified": "2026-03-18T14:00:00.000Z",
      "Size": 1234
    },
    {
      "Key": "index.html",
      "VersionId": "2LB2z3tPdN2aRFGhK0mRr",
      "IsLatest": false,
      "LastModified": "2026-03-18T12:00:00.000Z",
      "Size": 1180
    }
  ]
}
```

لاسترجاع إصدار محدّد:

```bash
aws s3api get-object \
  --bucket my-frontend-app-assets \
  --key "index.html" \
  --version-id "2LB2z3tPdN2aRFGhK0mRr" \
  --region us-east-1 \
  index-previous.html
```

هذا ينزّل الإصدار الأقدم إلى ملف محلي يُسمى `index-previous.html`. ويمكنك فحصه، أو مقارنته بالإصدار الحالي، أو رفعه مجددًا للتراجع.

## مشكلة الكلفة

الإصدارات رائعة للسلامة، لكن لها كلفة: كل إصدار من كل كائن يشغل مساحة تخزين. فإذا نشرت واجهتك الأمامية ثلاث مرات يوميًا وكان ناتج بنائك 50 MB، فذلك 150 MB من الكائنات ذات الإصدارات يوميًا—نحو 4.5 GB شهريًا. وبسعر S3 Standard (0.023 دولار لكل GB شهريًا)، فهذا نحو 0.10 دولار شهريًا. ليس كثيرًا.

لكن إذا كنت تعمل منذ سنة بلا قواعد دورة حياة، فلديك 54 GB من الإصدارات القديمة راكدة تكلّفك نحو 1.25 دولار شهريًا. ما زال ليس كثيرًا، لكن المبدأ مهم: البيانات غير المستخدمة لا ينبغي أن تتراكم إلى ما لا نهاية. وهنا تأتي قواعد دورة الحياة.

## قواعد دورة الحياة

**قاعدة دورة الحياة** تخبر S3 بما تفعله بالكائنات (أو الإصدارات القديمة من الكائنات) بعد عدد معيّن من الأيام. وأكثر إجراءين فائدة لنشر الواجهة الأمامية:

1. **نقل** الإصدارات القديمة إلى فئة تخزين أرخص
2. **إبطال** (حذف) الإصدارات القديمة بعد عدد معيّن من الأيام

بالنسبة إلى موقع ثابت، النهج العملي هو حذف الإصدارات غير الحالية بعد فترة استبقاء معقولة. فنادرًا ما تحتاج إلى التراجع أكثر من بضعة أيام.

### إنشاء قاعدة دورة حياة

أنشئ ملف إعداد لدورة الحياة:

```json
{
  "Rules": [
    {
      "ID": "DeleteOldVersions",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 30
      }
    }
  ]
}
```

تسري هذه القاعدة على كل الكائنات في الحاوية (البادئة الفارغة تعني كل شيء) وتحذف الإصدارات غير الحالية بعد 30 يومًا. أما الإصدارات الحالية (الأحدث) فلا تتأثر بهذه القاعدة أبدًا.

في لوحة التحكم، يتيح لك نموذج **Create lifecycle rule** في تبويب **Management** في الحاوية إعداد القاعدة نفسها بصريًا—بإعطائها اسمًا، وضبط النطاق، واختيار إجراء الإبطال.

نموذج S3 Create Lifecycle Rule وهو يعرض اسم القاعدة expire-old-versions وخيارات النطاق للتصفية حسب البادئة.

طبّقها:

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket my-frontend-app-assets \
  --lifecycle-configuration file://lifecycle.json \
  --region us-east-1
```

تحقّق:

```bash
aws s3api get-bucket-lifecycle-configuration \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> ثلاثون يومًا قيمة افتراضية معقولة لنشر الواجهة الأمامية. فتحصل على شهر كامل من إمكانية التراجع دون تكديس سنوات من الإصدارات القديمة. وإذا كان معدّل نشرك مرتفعًا وكنت واثقًا في خط أنابيب CI/CD، فيمكنك تقليله إلى 7 أو 14 يومًا.

### قاعدة أكثر تقدّمًا

إذا أردت توفير مزيد قبل الحذف، فيمكنك نقل الإصدارات القديمة إلى فئة تخزين أرخص أولًا:

```json
{
  "Rules": [
    {
      "ID": "ManageOldVersions",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "NoncurrentVersionTransitions": [
        {
          "NoncurrentDays": 30,
          "StorageClass": "STANDARD_IA"
        }
      ],
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 90
      }
    }
  ]
}
```

هذا ينقل الإصدارات غير الحالية إلى **S3 Standard-IA** (الوصول غير المتكرر) بعد 30 يومًا، ثم يحذفها بعد 90 يومًا. وتكلّف Standard-IA نحو 0.0125 دولار لكل GB شهريًا—نحو نصف سعر تخزين Standard. ولموقع واجهة أمامية، التوفير ضئيل، لكن النمط يستحق المعرفة عندما تدير حاويات ببيانات أكثر.

## باستخدام SDK

```typescript
import {
  S3Client,
  PutBucketVersioningCommand,
  PutBucketLifecycleConfigurationCommand,
  ListObjectVersionsCommand,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

await s3.send(
  new PutBucketVersioningCommand({
    Bucket: 'my-frontend-app-assets',
    VersioningConfiguration: { Status: 'Enabled' },
  }),
);

await s3.send(
  new PutBucketLifecycleConfigurationCommand({
    Bucket: 'my-frontend-app-assets',
    LifecycleConfiguration: {
      Rules: [
        {
          ID: 'expire-noncurrent-versions',
          Status: 'Enabled',
          Filter: {},
          NoncurrentVersionTransitions: [{ NoncurrentDays: 30, StorageClass: 'STANDARD_IA' }],
          NoncurrentVersionExpiration: { NoncurrentDays: 90 },
        },
      ],
    },
  }),
);

// Inspect every object version (including delete markers):
const versions = await s3.send(new ListObjectVersionsCommand({ Bucket: 'my-frontend-app-assets' }));
console.log(versions.Versions, versions.DeleteMarkers);
```

## فهم أسعار S3

لأسعار S3 ثلاثة مكوّنات:

**التخزين.** تدفع مقابل الحجم الإجمالي للبيانات المخزّنة. ويكلّف S3 Standard 0.023 دولار لكل GB شهريًا لأول 50 TB. ولتطبيق واجهة أمامية نموذجي بناتج بناء 50 MB وتاريخ إصدارات 30 يومًا، تكون كلفة التخزين الشهرية أقل بكثير من دولار واحد.

**الطلبات.** تدفع لكل طلب. وتكلّف طلبات PUT وCOPY وPOST وLIST 0.005 دولار لكل 1,000 طلب. وتكلّف طلبات GET وSELECT 0.0004 دولار لكل 1,000 طلب. ولموقع ثابت بحركة مرور منخفضة إلى متوسطة، هذه بنسات.

**نقل البيانات.** تدفع مقابل البيانات المنقولة من S3 إلى الإنترنت. وأول 100 GB شهريًا مجانية. وبعد ذلك، 0.09 دولار لكل GB للـ 10 TB التالية. ولمعظم مواقع الواجهة الأمامية، ستبقى داخل الفئة المجانية بسهولة—خصوصًا بمجرد وضع CloudFront أمام S3، لأن CloudFront يقدّم المحتوى المخبّأ من مواقعه الطرفية بدلًا من ضرب S3 مع كل طلب.

> **نصيحة**
>
> تتضمن فئة AWS المجانية 5 GB من تخزين S3 Standard، و20,000 طلب GET، و2,000 طلب PUT شهريًا للأشهر الاثني عشر الأولى. والمشروع الشخصي أو تمرين الدورة سيندرج بسهولة ضمن هذه الحدود.

## فئات التخزين في لمحة

تقدّم S3 عدة **فئات تخزين** بخصائص سعر ووصول مختلفة. ولنشر الواجهة الأمامية، ستستخدم S3 Standard حصريًا تقريبًا، لكن إليك المشهد:

| فئة التخزين | الكلفة لكل GB/شهر | حالة الاستخدام |
| --- | --- | --- |
| S3 Standard | $0.023 | بيانات يُوصل إليها بكثرة (بناؤك الحالي) |
| S3 Standard-IA | $0.0125 | وصول غير متكرر (الإصدارات القديمة) |
| S3 One Zone-IA | $0.01 | غير متكرر، ولا حاجة إلى مرونة متعددة مناطق التوفر |
| S3 Glacier Flexible Retrieval | $0.0036 | أرشفة (استرجاع يستغرق دقائق إلى ساعات) |
| S3 Glacier Deep Archive | $0.00099 | أرشفة طويلة الأمد (استرجاع يستغرق ساعات) |

لهذه الدورة، تحتاج فقط إلى Standard وربما Standard-IA لانتقالات دورة الحياة. أما فئتا Glacier فلأحمال عمل الأرشفة التي لا تحتاج وصولًا سريعًا—لا لتقديم موقع.

## ما الذي بنيته

في هذه المرحلة، لديك إعداد موقع S3 ثابت كامل:

- حاوية في `us-east-1` باسم فريد عالميًا
- ملفات بناء مرفوعة عبر `aws s3 sync`
- سياسة حاوية تمنح وصول قراءة عامًا
- استضافة موقع ثابت ممكّنة مع مستندي الفهرس والخطأ
- إصدارات ممكّنة للحماية من الكتابة فوق الملفات عرضيًا
- قاعدة دورة حياة لتنظيف الإصدارات القديمة بعد 30 يومًا

هذا موقع عامل متاح للعامة. وهو HTTP فقط، ويُقدَّم من منطقة واحدة، ويستخدم عنوان URL قبيحًا لنقطة نهاية S3—لكنه يعمل. والأهم أنك الآن تفهم طبقة التخزين جيدًا بما يكفي لتتوقف عن التعامل معها كسحر.

التالي، ستنتقل إلى جانب النطاقات من القصة: كيف تتحكم في نطاق، وكيف يصبح Route 53 مرجعًا موثوقًا له، ولماذا يجب أن يوجد ذلك قبل أن يعمل التحقق من ACM بنظافة. ثم ستعود وتبني مسار الإنتاج فوق أساس S3 هذا.

## التنظيف

لا يمكن حذف حاوية ذات إصدارات حتى تُزال كل نسخة كائن **و**كل علامة حذف. نفّذ هاتين المرحلتين—واحدة للإصدارات وواحدة لعلامات الحذف—مع حماية بحيث لا تفشل حاوية جديدة فارغة من إحدى القائمتين. ثم أزل الحاوية:

```bash
# 1. Delete every non-current object version (skip if there are none)
VERSIONS=$(aws s3api list-object-versions \
  --bucket my-frontend-app-assets \
  --output json \
  --query 'Versions[].{Key:Key,VersionId:VersionId}')
if [ "$VERSIONS" != "null" ] && [ "$VERSIONS" != "[]" ]; then
  aws s3api delete-objects \
    --bucket my-frontend-app-assets \
    --delete "{\"Objects\": $VERSIONS}" \
    --region us-east-1 \
    --output json
fi

# 2. Delete every delete marker (skip if there are none)
MARKERS=$(aws s3api list-object-versions \
  --bucket my-frontend-app-assets \
  --output json \
  --query 'DeleteMarkers[].{Key:Key,VersionId:VersionId}')
if [ "$MARKERS" != "null" ] && [ "$MARKERS" != "[]" ]; then
  aws s3api delete-objects \
    --bucket my-frontend-app-assets \
    --delete "{\"Objects\": $MARKERS}" \
    --region us-east-1 \
    --output json
fi

# 3. Remove the now-empty bucket
aws s3 rb s3://my-frontend-app-assets --region us-east-1
```

> **لماذا الحراسات في الصدفة**
>
> `aws s3api list-object-versions` [يُرجع `Versions` و`DeleteMarkers` كمصفوفتين منفصلتين](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) ويحذف أيًّا من المفتاحين كليًا عندما يكون فارغًا—فـ `--query` الذي يجلب المفتاح المفقود يعيده كـ `null`. وتمرير `{"Objects": null}` أو `{"Objects": []}` إلى `delete-objects` يفشل بخطأ تحقّق من المعاملات، لا بعملية صامتة بلا أثر، لذا يجب على كل مرحلة فحص القائمة قبل استدعاء API. وتخطَّ أي مرحلة عندما *توجد* مدخلات وستفشل `aws s3 rb` بـ `BucketNotEmpty`: فعلامات الحذف تُحتسب كائنات. وإذا كانت حاويتك تضم أكثر من 1,000 إصدار أو علامة حذف، فستحتاج أيضًا إلى الترقيم الصفحي—فـ `list-object-versions` يحدّ كل استجابة عند 1,000 مدخل.
