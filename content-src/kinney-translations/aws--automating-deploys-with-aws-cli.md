---
title: "أتمتة عمليات النشر باستخدام AWS CLI"
---

تشغيل أمرين من أوامر CLI بعد كل عملية بناء لا بأس به في مشروع تعمل عليه في أصيل يوم سبت. لكنه ليس مقبولًا لفريق يشحن إلى الإنتاج. أنت تريد أمرًا واحدًا: `./deploy.sh`—ابنِ الموقع، وارفع الملفات، وأبطل صلاحية التخزين المؤقت، وانتهيت. يحوّل هذا الدرس عملية النشر اليدوية من [خط أنابيب الموقع الثابت الكامل](https://stevekinney.com/courses/aws/full-static-pipeline) إلى سكربت نشر قابل للتكرار ويسهل نسخه ولصقه.

إن أردت الاطلاع على نسخة AWS من أسطح الأوامر الدقيقة أثناء قراءتك، فأبقِ [مرجع الأمر `aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) و[مرجع الأمر `aws cloudfront create-invalidation`](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html) مفتوحين.

## الأمران اللذان تؤتمتهما

أنت تعرف بالفعل العمليتين الأساسيتين من [سلوكيات التخزين المؤقت وإبطال الصلاحية](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations):

1. **`aws s3 sync`**: ارفع مخرجات البناء إلى S3، مع إزالة الملفات التي لم تعد موجودة.
2. **`aws cloudfront create-invalidation`**: أخبر CloudFront بإسقاط النسخ المخزّنة مؤقتًا حتى تلتقط مواقع الحافة الملفات الجديدة.

يلفّ السكربت هذين الأمرين بمعالجة الأخطاء، وترويسات تخزين مؤقت متمايزة، وإخراج للحالة.

## سكربت النشر

> **نصيحة**
>
> هذا السكربت متاح باسم [`deploy.sh`](https://github.com/stevekinney/scratch-lab/blob/main/deploy.sh) في مستودع Scratch Lab.

احفظ هذا باسم `deploy.sh` في جذر مشروعك:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Configuration
BUCKET="my-frontend-app-assets"
DISTRIBUTION_ID="E1A2B3C4D5E6F7"
REGION="us-east-1"
BUILD_DIR="./build"

# Verify the build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build directory '$BUILD_DIR' not found. Run your build command first."
  exit 1
fi

echo "Deploying to s3://$BUCKET from $BUILD_DIR..."

# Step 1: Sync hashed assets with long-lived cache headers
echo "Uploading hashed assets..."
aws s3 sync "$BUILD_DIR/assets" "s3://$BUCKET/assets" \
  --cache-control "public, max-age=31536000, immutable" \
  --region "$REGION" \
  --delete \
  --output json

# Step 2: Upload index.html with a short cache TTL
echo "Uploading index.html..."
aws s3 cp "$BUILD_DIR/index.html" "s3://$BUCKET/index.html" \
  --cache-control "public, max-age=60" \
  --content-type "text/html" \
  --region "$REGION" \
  --output json

# Step 3: Sync everything else (favicon, robots.txt, etc.) with default cache
echo "Uploading remaining files..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET" \
  --exclude "assets/*" \
  --exclude "index.html" \
  --region "$REGION" \
  --delete \
  --output json

# Step 4: Invalidate the CloudFront cache
echo "Creating CloudFront invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --region "$REGION" \
  --query 'Invalidation.Id' \
  --output text)
echo "Invalidation created: $INVALIDATION_ID"

echo "Deploy complete."
```

*ملاحظة:* تزيل علامة `--delete` الملفات القديمة المُجزّأة من S3 التي لم يعد بناؤك ينتجها.

اجعل السكربت قابلًا للتنفيذ:

```bash
chmod +x deploy.sh
```

شغّله:

```bash
./deploy.sh
```

## ما الذي يفعله السكربت

يقسّم السكربت الرفع إلى ثلاث مراحل، لكل منها ترويسات `Cache-Control` مختلفة. وهذه هي استراتيجية التخزين المؤقت من [سلوكيات التخزين المؤقت وإبطال الصلاحية](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations) مطبَّقة على عملية النشر:

1. **الأصول المُجزّأة** (`/assets/*`): `max-age=31536000, immutable`. هذه هي مخرجات أداة التجميع لديك: `main.a1b2c3.js`، و`styles.d4e5f6.css`. تتغيّر أسماء الملفات عندما يتغيّر المحتوى، لذا يمكن تخزينها مؤقتًا إلى الأبد. وتوجّه تعليمة `immutable` المتصفحات إلى عدم إزعاج نفسها بإعادة التحقق.
2. **`index.html`**: `max-age=60`. يجب أن تتحدث نقطة الدخول لديك بسرعة. ستون ثانية مدة قصيرة بما يكفي ليرى المستخدمون أحدث عملية نشر خلال دقيقة، وطويلة بما يكفي لاستيعاب ذُرى الزيارات.
3. **كل شيء آخر**: `favicon.ico`، و`robots.txt`، و`manifest.json`، وأي شيء آخر في دليل البناء لديك. تستخدم هذه سلوك التخزين المؤقت الافتراضي في S3.

## علامة `--delete`

علامة `--delete` في `aws s3 sync` حاسمة. فبدونها تتراكم كل نسخة من كل أصل مُجزّأ في حاوية S3 لديك. وبعد بضعة أشهر، ستكون لديك آلاف الملفات اليتيمة: `main.a1b2c3.js`، و`main.d4e5f6.js`، و`main.g7h8i9.js`، كلها راقدة في S3، وكلها تكلّفك رسوم تخزين (ضئيلة جدًا، لكنها رسوم على أي حال).

مع `--delete`، يقارن `aws s3 sync` دليل البناء المحلي لديك بالحاوية، ويزيل أي شيء في الحاوية غير موجود في الدليل المحلي. وبذلك تُنظَّف الأصول المُجزّأة القديمة تلقائيًا.

> **تحذير**
>
> تعني علامة `--delete` أن دليل البناء لديك هو مصدر الحقيقة. فإذا كان بناؤك ناقصًا أو معطوبًا، فستزيل `--delete` الملفات العاملة من S3 وتستبدلها بما يوجد في دليل البناء لديك. شغّل أمر البناء دائمًا قبل النشر. يتحقق السكربت من وجود دليل البناء، لكنه لا يستطيع التحقق من نجاح البناء.

## الإبطال الانتقائي مقابل `/*`

يستخدم السكربت `--paths "/*"` لإبطال كل شيء. وهذه أبسط طريقة وتعمل جيدًا مع معظم المشاريع. لكن لديك خيارات:

**الإبطال الكامل** (`/*`): يمسح كل كائن مخزّن مؤقتًا في جميع مواقع الحافة. ويُحتسب مسار إبطال واحدًا. وبعد إبطال `/*`، يكون الطلب التالي لأي ملف إخفاقًا في التخزين المؤقت.

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/*" \
  --region us-east-1 \
  --output json
```

**الإبطال الانتقائي**: أبطل صلاحية الملفات التي تغيّرت فعليًا فقط. وهو أدقّ جراحيًا، لكنه يتطلب منك معرفة الملفات التي تغيّرت.

```bash
aws cloudfront create-invalidation \
  --distribution-id E1A2B3C4D5E6F7 \
  --paths "/index.html" "/manifest.json" \
  --region us-east-1 \
  --output json
```

**متى تستخدم الإبطال الانتقائي**: إذا كنت تنشر إلى موقع عالي الزيارات ولم يتغيّر معظم محتواك المخزّن مؤقتًا، فإن الإبطال الانتقائي يتجنب موجة من إخفاقات التخزين المؤقت لملفات ما تزال صالحة. وعمليًا، وبما أن أصولك المُجزّأة تحمل أسماء ملفات جديدة في كل عملية نشر على أي حال، فالملف الوحيد الذي يحتاج فعلًا إلى إبطال هو `index.html`. أما الأصول المُجزّأة القديمة فستنتهي صلاحيتها طبيعيًا.

> **نصيحة**
>
> بالنسبة إلى معظم مشاريع الواجهة الأمامية، `/*` هو الخيار الصحيح. فأول 1,000 مسار إبطال شهريًا مجاني، و`/*` يُحتسب مسارًا واحدًا. أنت لا توفّر المال بكونك انتقائيًا—بل توفّر كفاءة التخزين المؤقت. وما لم تكن تتعامل مع ملايين الطلبات في الدقيقة، فإن إعادة ملء التخزين المؤقت بعد إبطال `/*` لا تُذكر.

## استراتيجيات كسر التخزين المؤقت

يستخدم سكربت النشر بالفعل أكثر استراتيجيات كسر التخزين المؤقت فعالية: **أسماء ملفات مُجزّأة** للأصول و**مدد TTL قصيرة** لـ `index.html`. لكن هناك مقاربتين أخريين تستحقان الفهم:

### إصدار سلاسل الاستعلام

ألحق سلسلة استعلام للإصدار بروابط الأصول: `main.js?v=202603181200`. يعامل CloudFront كل رابط فريد (بما في ذلك سلاسل الاستعلام، إذا كانت سياسة التخزين المؤقت تشملها) ككائن منفصل مخزّن مؤقتًا. وهذا يتجنب عمليات الإبطال تمامًا—فالرابط الجديد إخفاق في التخزين المؤقت بحكم التعريف.

المشكلة: سياسة `CachingOptimized` الافتراضية في CloudFront لا تشمل سلاسل الاستعلام في مفتاح التخزين المؤقت. وستحتاج إلى سياسة تخزين مؤقت مخصّصة. كما يجب أن تشير شيفرة HTML لديك إلى الروابط ذات الإصدار، ما يعني أن أداة البناء لديك يجب أن تحقن سلسلة الإصدار. أدوات التجميع الحديثة تُجزّئ أسماء الملفات بالفعل، وهي مقاربة أفضل لأن التجزئة قائمة على المحتوى لا على الوقت.

### أدلّة ذات طوابع زمنية

ارفع كل عملية نشر إلى دليل ذي إصدار: `s3://my-frontend-app-assets/v20260318/`. ووجّه CloudFront إلى أحدث إصدار. وهذا يمنحك تراجعًا فوريًا (ما عليك إلا توجيه CloudFront إلى الإصدار السابق) لكنه يضيف تعقيدًا إلى خط أنابيب النشر وبنية الحاوية لديك.

بالنسبة إلى معظم مشاريع الواجهة الأمامية، تمثّل أسماء الملفات المُجزّأة مع إبطال `/*` التوازن الصحيح بين البساطة والفعالية. وبصراحة، لم أحتج يومًا إلى أكثر من ذلك.

## إضافة خطوة بناء

عمليًا، نادرًا ما تنشر دون أن تبني أولًا. إليك السكربت موسّعًا بخطوة بناء:

```bash
#!/usr/bin/env bash
set -euo pipefail

BUCKET="my-frontend-app-assets"
DISTRIBUTION_ID="E1A2B3C4D5E6F7"
REGION="us-east-1"
BUILD_DIR="./build"

echo "Building..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build did not produce '$BUILD_DIR' directory."
  exit 1
fi

echo "Deploying to s3://$BUCKET..."

aws s3 sync "$BUILD_DIR/assets" "s3://$BUCKET/assets" \
  --cache-control "public, max-age=31536000, immutable" \
  --region "$REGION" \
  --delete \
  --output json

aws s3 cp "$BUILD_DIR/index.html" "s3://$BUCKET/index.html" \
  --cache-control "public, max-age=60" \
  --content-type "text/html" \
  --region "$REGION" \
  --output json

aws s3 sync "$BUILD_DIR" "s3://$BUCKET" \
  --exclude "assets/*" \
  --exclude "index.html" \
  --region "$REGION" \
  --delete \
  --output json

INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --region "$REGION" \
  --query 'Invalidation.Id' \
  --output text)
echo "Deploy complete. Invalidation: $INVALIDATION_ID"
```

يضمن `set -euo pipefail` في الأعلى أن يتوقف السكربت فورًا إذا فشل أي أمر. فإذا خرج `npm run build` بقيمة غير صفرية، لا يستمر النشر. وإذا فشل `aws s3 sync`، لا يعمل الإبطال. وهذا يمنع عمليات النشر الجزئية.

## إصدار عمليات النشر

لأغراض التدقيق، قد ترغب في وسم كل عملية نشر. أضف هذا إلى سكربتك:

```bash
DEPLOY_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo "Deploying commit $GIT_SHA at $DEPLOY_TIMESTAMP"
```

يمنحك هذا أثرًا في مخرجات الطرفية لديك. ولمزيد من التتبع الدائم، يمكنك كتابة بيان نشر إلى S3:

```bash
echo "{\"commit\": \"$GIT_SHA\", \"timestamp\": \"$DEPLOY_TIMESTAMP\"}" | \
  aws s3 cp - "s3://$BUCKET/_deploy-manifest.json" \
  --content-type "application/json" \
  --region "$REGION"
```

الآن يمكنك دائمًا التحقق من الإصدار المنشور بجلب `https://example.com/_deploy-manifest.json`.

## سكربت نشر قائم على SDK

الفرق التي تعيش أصلًا في TypeScript تميل إلى تفضيل سكربت نشر قائم على Node على سكربت Bash—فمشاركة الأنواع مع بقية قاعدة الشيفرة أسهل، وهو يعمل بالطريقة نفسها على جهاز كل مطوّر دون غرائب `bash` / `zsh` / `fish`. إليك خط الأنابيب نفسه في TypeScript:

```typescript
// scripts/deploy.ts
import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join, relative } from 'node:path';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import mime from 'mime-types';

const BUCKET = 'my-frontend-app-assets';
const DISTRIBUTION_ID = 'E1A2B3C4D5E6F7';
const BUILD_DIR = './build';

const s3 = new S3Client({ region: 'us-east-1' });
const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

// Upload every file with appropriate Cache-Control + Content-Type.
const localKeys = new Set<string>();
for await (const file of walk(BUILD_DIR)) {
  const key = relative(BUILD_DIR, file).replace(/\\/g, '/');
  localKeys.add(key);
  const isHashed = key.startsWith('assets/');
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: createReadStream(file),
      ContentType: mime.lookup(file) || 'application/octet-stream',
      CacheControl: isHashed ? 'public, max-age=31536000, immutable' : 'public, max-age=60',
    }),
  );
}

// Delete anything in the bucket that's no longer in the build directory.
// ListObjectsV2 returns at most 1000 keys per call — paginate.
let continuationToken: string | undefined;
do {
  const existing = await s3.send(
    new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: continuationToken }),
  );
  for (const obj of existing.Contents ?? []) {
    if (obj.Key && !localKeys.has(obj.Key)) {
      await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: obj.Key }));
    }
  }
  continuationToken = existing.IsTruncated ? existing.NextContinuationToken : undefined;
} while (continuationToken);

await cloudfront.send(
  new CreateInvalidationCommand({
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: `deploy-${Date.now()}`,
      Paths: { Quantity: 1, Items: ['/*'] },
    },
  }),
);
```

شغّله بـ `npx tsx scripts/deploy.ts`. خط الأنابيب متطابق—والاختيار بين نسخة Bash وهذه النسخة مسألة تفضيل المطوّر وحده.

سكربت النشر يعمل، لكن ما يزال عليك تشغيله يدويًا. في الخطوة التالية، ستنقل هذا إلى سير عمل GitHub Actions يعمل تلقائيًا عند كل دفعة إلى `main`، بما في ذلك كيفية مصادقة GitHub Actions مع AWS باستخدام OIDC بدلًا من مفاتيح وصول طويلة العمر.
