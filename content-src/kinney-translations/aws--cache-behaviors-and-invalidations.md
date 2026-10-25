---
title: "سلوكات التخزين المؤقت وعمليات الإبطال"
---

القيمة الكاملة التي يقدّمها CloudFront هي التخزين المؤقت: تقديم المحتوى من مواقع حافة قريبة من المستخدمين بدلًا من القيام برحلات ذهاب وعودة إلى أصلك. لكن التخزين المؤقت يخلق مشكلة سبق أن تعاملت معها على الأرجح — المحتوى القديم. فأنت تنشر إصلاحًا، لكن المستخدمين ما زالوا يرون النسخة القديمة لأن الشبكة لم تلتقط التغيير بعد.

إذا أردت النسخة الدقيقة من AWS للمقابض التي تديرها هنا، فأبقِ [مرجع إعدادات سلوك التخزين المؤقت](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html) و[دليل الإبطال في CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html) و[مرجع أمر `aws cloudfront create-invalidation`](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html) مفتوحة.

على Vercel، تتولى المنصة كسر التخزين المؤقت عنك. أما على AWS فأنت تديره. وهذا يعني فهم سلوكات التخزين المؤقت ومدد TTL واستراتيجيات الإبطال.

```
flowchart LR
    Request["Viewer request"] --> Match["Match path to cache behavior"]
    Match --> Key["Build cache key<br/>path + selected headers, query strings, or cookies"]
    Key --> Hit{"Cached object still valid?"}
    Hit -- "Yes" --> Return["Return cached response"]
    Hit -- "No" --> Origin["Fetch from origin"]
    Origin --> TTL["Store using TTL and Cache-Control rules"]
    TTL --> Return
    Deploy["New deployment"] --> Bust{"Change URL or invalidate?"}
    Bust -- "Cache busting" --> NewUrl["New hashed filename"]
    Bust -- "Invalidation" --> Purge["Drop cached copies early"]
    NewUrl --> Hit
    Purge --> Hit
```

## كيف تقرّر CloudFront ما تخزّنه مؤقتًا

يُقيَّم كل طلب إلى توزيع CloudFront لديك وفق مجموعة قواعد تُسمّى **سلوكات التخزين المؤقت**. ويحدّد كل سلوك:

- **نمط المسار**: عناوين URL التي ينطبق عليها هذا السلوك (مثل `*.html` أو `/api/*` أو `*` لكل شيء).
- **سياسة التخزين المؤقت**: مدة تخزين المحتوى مؤقتًا والعوامل التي تجعل الاستجابة المخزّنة فريدة.
- **الأصل**: الأصل الذي تُجلب منه المحتوى عند عدم وجوده في ذاكرة التخزين المؤقت.
- **سياسة بروتوكول المشاهد**: هل يُسمح بـ HTTP أو HTTPS أو إعادة توجيه HTTP إلى HTTPS.

ولكل توزيع **سلوك تخزين مؤقت افتراضي** (`*`) ينطبق على كل الطلبات التي لا يطابقها سلوك أكثر تحديدًا. ولموقع ثابت، غالبًا يكون السلوك الافتراضي كل ما تحتاجه.

وفي لوحة التحكم، يسرد تبويب **Behaviors** كل سلوكات التخزين المؤقت لتوزيعك مع أنماط مساراتها وأصولها والسياسات المرفقة بها.

![تبويب Behaviors في توزيع CloudFront وهو يعرض سلوك التخزين المؤقت الافتراضي بنمط المسار Default والأصل وسياسة Managed-CachingOptimized.](/images/kinney/70d2449b3b9efcb8.webp)

## سياسات التخزين المؤقت ومدد TTL

تتحكم **سياسة التخزين المؤقت** في ثلاث قيم TTL تحدّد مدة تخزين CloudFront لكائن ما:

| الإعداد | الافتراضي في CachingOptimized | ما يفعله |
| --- | --- | --- |
| **الحد الأدنى لـ TTL** | ثانية واحدة | الأرضية. تخزّن CloudFront المحتوى مؤقتًا لهذه المدة على الأقل، حتى لو أرسل الأصل `Cache-Control: no-cache`. |
| **TTL الافتراضي** | 86,400 ثانية (24 ساعة) | يُستخدم عندما لا يرسل الأصل ترويسات `Cache-Control` أو `Expires`. |
| **الحد الأقصى لـ TTL** | 31,536,000 ثانية (365 يومًا) | السقف. حتى لو أرسل الأصل `Cache-Control: max-age=999999999`، يحدّ CloudFront التخزين المؤقت عند هذه القيمة. |

والسياسة المُدارة **CachingOptimized** (المعرّف: `658327ea-f89d-4fab-a63d-7e88639e58f6`) التي أرفقتها في [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution) تستخدم هذه الافتراضيات. ولمعظم المواقع الثابتة، هذه القيم معقولة — فيُخزَّن محتواك مؤقتًا لمدة 24 ساعة إلا إذا حدّد أصلك غير ذلك.

### كيف تتفاعل مدد TTL مع ترويسات الأصل

لا تخزّن CloudFront كل شيء مؤقتًا بشكل أعمى لمدة TTL الافتراضية، بل تحترم ترويسات `Cache-Control` من أصلك (S3) ضمن حدود الحدّين الأدنى والأقصى لـ TTL:

- يرسل الأصل `Cache-Control: max-age=3600` (ساعة واحدة): تخزّن CloudFront مؤقتًا لمدة ساعة (بين الحد الأدنى والأقصى، فتُحترم القيمة).
- يرسل الأصل `Cache-Control: max-age=0`: تخزّن CloudFront مؤقتًا لثانية واحدة (فيتغلّب الحد الأدنى لـ TTL على قيمة الأصل).
- لا يرسل الأصل ترويسة `Cache-Control`: تخزّن CloudFront مؤقتًا لمدة 24 ساعة (وهو TTL الافتراضي).
- يرسل الأصل `Cache-Control: max-age=63072000` (سنتان): تخزّن CloudFront مؤقتًا لمدة 365 يومًا (فيحدّها الحد الأقصى لـ TTL).

> **نصيحة**
>
> يمكنك ضبط ترويسات `Cache-Control` على كائنات S3 عند رفعها. وهذا يمنحك تحكمًا لكل ملف على حدة في التخزين المؤقت: خزّن `index.html` مؤقتًا لمدة 60 ثانية (ليحصل المستخدمون على التحديثات سريعًا)، لكن خزّن الأصول المُجزَّأة مثل `main.a1b2c3.js` مؤقتًا لمدة سنة (فهي غير قابلة للتغيير — يتغيّر اسم الملف عندما يتغيّر المحتوى).

```bash
# Short cache for HTML files
aws s3 cp ./build/index.html s3://my-frontend-app-assets/index.html \
  --cache-control "public, max-age=60" \
  --content-type "text/html" \
  --region us-east-1

# Long cache for hashed assets
aws s3 sync ./build/assets s3://my-frontend-app-assets/assets \
  --cache-control "public, max-age=31536000, immutable" \
  --region us-east-1
```

## مفاتيح التخزين المؤقت

تستخدم CloudFront **مفتاح تخزين مؤقت** لتحديد ما إذا كانت استجابة مخزّنة تستطيع خدمة طلب معين. وافتراضيًا يتكون مفتاح التخزين المؤقت من مسار URL وترويسة `Host`. فالطلبان إلى المسار نفسه ينتجان مفتاح التخزين المؤقت نفسه ويحصلان على الاستجابة المخزّنة نفسها.

ويمكنك توسيع مفتاح التخزين المؤقت ليشمل:

- **سلاسل الاستعلام**: `?v=2` و`?v=3` تُخزَّنان مؤقتًا بشكل منفصل.
- **ترويسات الطلب**: استجابات مختلفة لـ `Accept-Encoding: gzip` مقابل `Accept-Encoding: br`.
- **ملفات تعريف الارتباط**: استجابات مختلفة للمستخدمين المُصادَق عليهم مقابل المجهولين.

ولموقع ثابت، مفتاح التخزين المؤقت الافتراضي (مسار URL فقط) هو الصحيح تمامًا. فأنت لا تريد أن تفتّت سلاسل الاستعلام أو الترويسات أو ملفات تعريف الارتباط ذاكرتك المؤقتة. وكل طلب لـ `/index.html` يجب أن يحصل على الاستجابة المخزّنة نفسها بصرف النظر عن معاملات الاستعلام أو ملفات تعريف الارتباط.

## سلوكات تخزين مؤقت مخصّصة

تحتاج أحيانًا إلى قواعد تخزين مؤقت مختلفة لمسارات مختلفة. وأمثلة شائعة:

- **ملفات HTML**: خزّنها مؤقتًا لفترة قصيرة (60 ثانية) ليحصل المستخدمون على التحديثات سريعًا.
- **ملفات JS وCSS المُجزَّأة**: خزّنها مؤقتًا بقوة (سنة واحدة) لأن اسم الملف يتغيّر عندما يتغيّر المحتوى.
- **وكيل API**: لا تخزّن مؤقتًا على الإطلاق (إن كنت توجّه طلبات API عبر CloudFront).

تضيف السلوكات المخصّصة بتحديث إعدادات التوزيع. فلكل سلوك نمط مسار وسياسة تخزين مؤقت خاصة به:

```json
{
  "CacheBehaviors": {
    "Quantity": 1,
    "Items": [
      {
        "PathPattern": "/assets/*",
        "TargetOriginId": "S3-my-frontend-app-assets",
        "ViewerProtocolPolicy": "redirect-to-https",
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true,
        "AllowedMethods": {
          "Quantity": 2,
          "Items": ["GET", "HEAD"],
          "CachedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"]
          }
        }
      }
    ]
  }
}
```

تقيّم CloudFront السلوكات بالترتيب، من الأكثر تحديدًا إلى الأقل. فأول سلوك يطابق نمط مساره الطلب هو الفائز، ويُقيَّم السلوك الافتراضي (`*`) دائمًا أخيرًا.

ولمعظم عمليات نشر الواجهة الأمامية، لا تحتاج إلى سلوكات تخزين مؤقت مخصّصة. فمزيج سياسة التخزين المؤقت CachingOptimized مع ترويسات `Cache-Control` لكل ملف على كائنات S3 يمنحك تحكمًا كافيًا. وتصبح السلوكات المخصّصة مفيدة عندما تبدأ في توجيه مسارات مختلفة إلى أصول مختلفة (مثلًا يذهب `/api/*` إلى API Gateway بينما يذهب `/*` إلى S3).

## عمليات إبطال ذاكرة التخزين المؤقت

عندما تنشر محتوى جديدًا إلى S3، قد تظل النسخ القديمة مخزّنة مؤقتًا في مواقع حافة CloudFront. ولديك خياران لإيصال المحتوى الجديد إلى المستخدمين: **إبطال ذاكرة التخزين المؤقت** و**كسر التخزين المؤقت**.

### الإبطال: اطلب من CloudFront إسقاط النسخ المخزّنة

يعلّم الإبطال الكائنات المخزّنة مؤقتًا بأنها قديمة. وعند الطلب التالي لذلك الكائن في كل موقع حافة (بعد أن يستقبل الموقع الإبطال)، تجلب CloudFront أحدث نسخة من الأصل. ولا تُزال النسخ المخزّنة القائمة فعليًا — بل تُوسم فقط بأنها لم تعد صالحة.

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/index.html" "/about/index.html" \
  --region us-east-1 \
  --output json
```

ويمكنك أيضًا إبطال كل شيء:

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

وتتضمن الاستجابة معرّف إبطال يمكنك استخدامه لفحص الحالة:

```json
{
  "Invalidation": {
    "Id": "I1EXAMPLE",
    "Status": "InProgress",
    "CreateTime": "2026-03-18T12:00:00Z",
    "InvalidationBatch": {
      "Paths": {
        "Quantity": 1,
        "Items": ["/*"]
      },
      "CallerReference": "cli-1710763200"
    }
  }
}
```

تستغرق عمليات الإبطال عادةً من 5 إلى 15 دقيقة لتنتشر بالكامل في كل مواقع الحافة، فلا تتفاجأ إن أعاد طلب فوري بعد الإبطال محتوى قديمًا. وفي تلك النافذة *يحصل مستخدمون مختلفون على نسخ مختلفة من موقعك* — فقد يحصل المستخدم في سيدني على الحزمة الجديدة بينما لا يزال المستخدم في فرانكفورت يحصل على القديمة. وبالنسبة للأصول المُجزَّأة هذا مقبول (فالاسمان يتعايشان). أما بالنسبة لـ `index.html`، فهذا يعني أن متصفح أحدهم قد يحمّل HTML الجديد الذي يشير إلى `main.abc.js` قديم سبق حذفه بـ `--delete` من S3. ونمط TTL القصير مع تجزئة الأصول أدناه يجعل هذه الفجوة غير مرئية، وتجاهله يجعلها مرئية بوضوح.

وفي لوحة التحكم، يتيح لك تبويب **Invalidations** إنشاء عمليات إبطال بإدخال مسارات الكائنات. وتُبطل العلامة `/*` كل شيء في عملية واحدة.

![نموذج Create Invalidation في CloudFront مع إدخال /* في حقل مسارات الكائنات.](/images/kinney/af65f08e32f29ce3.webp)

نموذج Create Invalidation في CloudFront مع إدخال /* في حقل مسارات الكائنات.

وبمجرد أن تنتهي CloudFront من نشر الإبطال إلى كل مواقع الحافة، تتغيّر الحالة إلى **Completed**.

![تبويب Invalidations في CloudFront وهو يعرض الإبطال بحالة Completed.](/images/kinney/4c9240d0f3732203.webp)

### باستخدام SDK

```typescript
import {
  CloudFrontClient,
  CreateInvalidationCommand,
  GetInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

const result = await cloudfront.send(
  new CreateInvalidationCommand({
    DistributionId: 'E1A2B3C4D5E6F7',
    InvalidationBatch: {
      CallerReference: `deploy-${Date.now()}`,
      Paths: { Quantity: 1, Items: ['/*'] },
    },
  }),
);

// Optional: poll for completion before declaring the deploy done.
const invalidationId = result.Invalidation!.Id!;
const status = await cloudfront.send(
  new GetInvalidationCommand({ DistributionId: 'E1A2B3C4D5E6F7', Id: invalidationId }),
);
console.log(status.Invalidation?.Status); // 'InProgress' → 'Completed'
```

يعمل `CallerReference` كمفتاح إلغاء تكرار — فإن أرسلت القيمة نفسها مرتين، أعادت CloudFront الإبطال القائم بدلًا من إنشاء نسخة مكررة. وهذا مفيد إن كان سكربت النشر لديك يعيد المحاولة.

### تكاليف الإبطال

أول 1000 مسار إبطال شهريًا مجانًا. وبعد ذلك يكلّف كل مسار 0.005 دولار. وتُحتسب العلامة `/*` كمسار واحد، كما يُحتسب كل مسار ملف على حدة كمسار واحد.

> **تحذير**
>
> إبطال `/*` بعد كل عملية نشر نمط شائع، لكنه أداة فظّة. فهو يمسح كل شيء من ذاكرة التخزين المؤقت — بما في ذلك الملفات التي لم تتغيّر. وإن كان لديك موقع عالي الحركة، فإن إبطالًا كاملًا يسبب دفعة من حالات فقدان ذاكرة التخزين المؤقت في كل مواقع الحافة. ولمعظم مشاريع الواجهة الأمامية هذا مقبول، أما المواقع التي تتعامل مع ملايين الطلبات في الدقيقة فينبغي أن تفكّر في إبطالات موجّهة.

### كسر التخزين المؤقت: غيّر عنوان URL

البديل عن الإبطال هو **كسر التخزين المؤقت** — أي تغيير اسم الملف حتى تعامله CloudFront ككائن جديد. فإذا كانت أداة البناء لديك تولّد أسماء ملفات مُجزَّأة (مثلًا يصبح `main.a1b2c3.js` هو `main.d4e5f6.js` بعد تغيير)، فإن للملف الجديد مفتاح تخزين مؤقت مختلف. فتجليه CloudFront من S3 طازجًا، وتنتهي صلاحية النسخة القديمة طبيعيًا من ذاكرة التخزين المؤقت بانتهاء مدة TTL.

تولّد أدوات بناء الواجهة الأمامية الحديثة (Vite وwebpack وNext.js) أسماء ملفات مُجزَّأة افتراضيًا لحزم JavaScript وCSS. ولهذا يمكن تخزين تلك الملفات مؤقتًا لمدة سنة — فالتجزئة تتغيّر عندما يتغيّر المحتوى. والملف الوحيد الذي لا يحصل على تجزئة هو `index.html`، لأن عنوان URL الخاص به يجب أن يبقى ثابتًا.

### الاستراتيجية الموصى بها

لمعظم عمليات نشر الواجهة الأمامية، أفضل نهج هو:

1. **أسماء ملفات مُجزَّأة** لملفات JS وCSS وأصول الصور. خزّنها مؤقتًا بقوة باستخدام `Cache-Control: max-age=31536000, immutable`.
2. **TTL قصير أو بلا تخزين مؤقت** لـ `index.html`. فإما أن تضبط `Cache-Control: max-age=60` على كائن S3، وإما أن تعتمد على الإبطالات.
3. **أبطل `/*`** بعد كل عملية نشر. وهذا يضمن تحديث `index.html` فورًا، وجلب الأصول المُجزَّأة طازجة عند الحاجة (وإن كانت ستكون عناوين URL جديدة على أي حال).

هذه هي الاستراتيجية نفسها التي تستخدمها Vercel وNetlify خلف الكواليس. وقد استخدمت هذا النمط في كل عملية نشر إنتاجية أعددتها على AWS، وهو يعمل ببساطة. فالأصول غير القابلة للتغيير تحصل على مدخلات تخزين مؤقت طويلة الأمد، ونقطة دخول HTML تُحدَّث في كل عملية نشر.

## سكربت للنشر

إليك سكربت نشر بسيطًا يربط كل شيء معًا:

```bash
set -euo pipefail

# Guard: refuse to sync if the assets directory is missing or empty.
# `s3 sync --delete` will happily mirror an empty local directory to S3,
# wiping every hashed asset from the bucket and leaving the site in a
# half-broken state the next time the HTML tries to load them.
if [ ! -d ./build/assets ] || [ -z "$(ls -A ./build/assets 2>/dev/null)" ]; then
  echo "error: ./build/assets is missing or empty. Did the build succeed?" >&2
  exit 1
fi

# Sync hashed assets with long cache
aws s3 sync ./build/assets s3://my-frontend-app-assets/assets \
  --cache-control "public, max-age=31536000, immutable" \
  --region us-east-1 \
  --delete \
  --output json

# Sync HTML files with short cache
aws s3 cp ./build/index.html s3://my-frontend-app-assets/index.html \
  --cache-control "public, max-age=60" \
  --content-type "text/html" \
  --region us-east-1

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> راية `--delete` ضرورية وخطيرة بالقدر نفسه. فهي تزيل من S3 الملفات التي لم تعد موجودة في مجلد البناء المحلي — وهذا جيد، لأنه ينظّف الأصول المُجزَّأة القديمة. لكن إن لم يكن `./build/assets` موجودًا (بناء فاشل)، أو كان فارغًا (ناتج بناء سيّئ)، عامل `s3 sync --delete` كل أصل قائم في الحاوية على أنه «لم يعد محليًا» وحذفه. ولهذا يتوقّف السكربت قبل المزامنة إن كان المجلد المحلي مفقودًا أو فارغًا. لا تُزل هذا الحارس.

التخزين المؤقت أصبح مضبوطًا. لكن ثمة مشكلة أخرى: إن انتقل مستخدم إلى `/dashboard/settings` في تطبيق صفحتك الواحدة، طلبت CloudFront من S3 ملفًا في ذلك المسار. ولا يوجد في S3 ملف اسمه `/dashboard/settings`، فتُرجع خطأ 403 أو 404. وفي الدرس التالي، ستُعدّ استجابات أخطاء مخصّصة للتعامل مع توجيه SPA — إذ تخبر CloudFront أن يقدّم `index.html` كلما صادف أحد هذه الأخطاء.
