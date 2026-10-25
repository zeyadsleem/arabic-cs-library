---
title: "رفع الملفات وتنظيمها"
---

لديك حاوية. والآن تحتاج إلى ملفات فيها. فهذه مخرجات `npm run build` الخاصة بك تذهب إلى السحابة—HTML وCSS وJavaScript والصور التي يتكوّن منها تطبيق الواجهة الأمامية. ويمنحك AWS CLI أمرين أساسيين لإدخال الملفات إلى S3: `aws s3 cp` لنسخ الملفات الفردية و`aws s3 sync` للحفاظ على تزامن دليل محلي وحاوية. كلاهما ضروري، ومعرفة متى تستخدم كلًّا منهما توفر عليك الوقت والنطاق الترددي.

إن أردت نسخة AWS من سطح الأوامر قريبة منك، فأبقِ [دليل مستخدم Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) و[مرجع الأمر `aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) مفتوحين.

## نسخ الملفات باستخدام `aws s3 cp`

يعمل أمر `cp` كما تتوقع—ينسخ ملفًا من مكان إلى آخر. ويمكنك النسخ من جهازك المحلي إلى S3، أو من S3 إلى جهازك، أو من موقع S3 إلى آخر.

ارفع ملفًا واحدًا:

```bash
aws s3 cp ./build/index.html s3://my-frontend-app-assets/index.html \
  --region us-east-1
```

ارفع دليلًا كاملًا بإضافة علم `--recursive`:

```bash
aws s3 cp ./build/ s3://my-frontend-app-assets/ \
  --recursive \
  --region us-east-1
```

هذا ينسخ كل ملف في دليل `build/` المحلي إلى جذر حاوية S3، مع الحفاظ على بنية الدليل. وإذا كانت مخرجات بنائك تبدو هكذا:

```
build/
├── index.html
├── assets/
│   ├── main.js
│   ├── main.css
│   └── logo.png
└── favicon.ico
```

ستحمل كائنات S3 الناتجة هذه المفاتيح:

- `index.html`
- `assets/main.js`
- `assets/main.css`
- `assets/logo.png`
- `favicon.ico`

تذكّر: لا يوجد مجلد `assets/` حقيقي في S3. فالشرطة المائلة جزء من سلسلة المفتاح. لكن كل أداة—CLI ووحدة التحكم وSDK—تعامله كمجلد افتراضي، وفي الممارسة العملية هذا كل ما تحتاج معرفته.

## المزامنة باستخدام `aws s3 sync`

أمر `sync` هو ما ستستخدمه للنشر. فعلى خلاف `cp`، لا يرفع إلا الملفات التي تغيّرت—يقارن أحجام الملفات وأختامها الزمنية بين دليلك المحلي والحاوية، ولا ينقل إلا الفروق.

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1
```

شغّله بعد كل بناء ولن تُرفع إلا الملفات التي تغيّرت. وفي نشر نمطي غيّرت فيه بضعة مكوّنات، يعني هذا رفع حفنة من حزم JavaScript بدلًا من دليل البناء كله.

### علم `--delete`

افتراضيًا، لا يحذف `sync` من S3 الملفات التي لم تعد موجودة محليًا. فإذا أعدت تسمية ملف أو حذفت صفحة، تبقى النسخة القديمة في الحاوية. ويصلح علم `--delete` هذا:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete
```

هذا يجعل حاوية S3 مرآة دقيقة لدليل `build/` المحلي. فالملفات الموجودة في الحاوية وغير الموجودة محليًا تُحذف.

> **تحذير**
>
> يحذف علم `--delete` الكائنات من S3 نهائيًا. وإذا لم تكن النسخ المُصدَّرة مفعّلة (سنغطي هذا في [النسخ المُصدَّرة ودورة الحياة والتكلفة في S3](https://stevekinney.com/courses/aws/s3-versioning-lifecycle-and-cost))، فتلك الملفات قد ذهبت. تحقق دائمًا من أنك تزامن الدليل الصحيح قبل استخدام `--delete` في الإنتاج.

### العلَمان `--exclude` و`--include`

أحيانًا تريد مزامنة معظم مخرجات بنائك مع استثناء ملفات معينة—ربما ملف `.DS_Store` الذي يتركه macOS، أو `sourcemap` لا تريد أن يكون متاحًا للعامة:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete \
  --exclude "*.map" \
  --exclude ".DS_Store"
```

## أنواع المحتوى مهمة

إليك المأزق الذي يعثر فيه كل مهندس واجهة أمامية في أول نشر له إلى S3: **أنواع المحتوى**. فعندما ترفع ملفًا إلى S3، يخمّن CLI نوع MIME بناءً على امتداد الملف. ويصيب في معظمها—`.html` تصبح `text/html`، و`.css` تصبح `text/css`، و`.js` تصبح `text/javascript`. لكنه لا يخمّن بشكل صحيح دائمًا، خصوصًا لصيغ ملفات أحدث مثل `.woff2` أو `.webp` أو `.mjs`.

إذا قدّمت S3 ملف JavaScript بنوع محتوى خاطئ، فسيرفض المتصفح تنفيذه. وسترى خطأً في وحدة التحكم مثل `Refused to execute script because its MIME type is not an executable MIME type`. لقد أمضيت وقتًا أطول مما أرغب في الاعتراف به في تصحيح هذه المشكلة نفسها.

يمكنك تعيين نوع المحتوى صراحةً عند الرفع:

```bash
aws s3 cp ./build/assets/main.js s3://my-frontend-app-assets/assets/main.js \
  --content-type "application/javascript" \
  --region us-east-1
```

وللرفع بالجملة، يمكنك الجمع بين `--exclude` و`--include` مع `--content-type` لمعالجة أنواع ملفات محددة:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --exclude "*.js" \
  --delete

aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript"
```

> **نصيحة**
>
> عمليًا، يعمل تخمين CLI لنوع MIME جيدًا مع أنواع ملفات الواجهة الأمامية الأكثر شيوعًا. وعادةً لا تحتاج إلى تجاوز أنواع المحتوى إلا في الحالات الحدية. لكن إذا حُمّل موقعك ولم يعمل JavaScript، فتحقق من نوع المحتوى أولًا—فغالبًا هو المشكلة.

## تنظيم الملفات ببادئات المفاتيح

لا تملك S3 مجلدات حقيقية، لكن **بادئات المفاتيح** تمنحك طريقة لتنظيم الكائنات تعمل جيدًا بما يكفي. ومعظم أدوات بناء الواجهة الأمامية تخرج الملفات أصلًا في بنية معقولة، وهذه البنية تتحول مباشرة إلى مفاتيح S3.

نمط شائع لنشر الواجهة الأمامية:

```
my-frontend-app-assets/
├── index.html
├── assets/
│   ├── main.a1b2c3d4.js
│   ├── main.e5f6g7h8.css
│   └── vendor.i9j0k1l2.js
├── images/
│   ├── logo.png
│   └── hero.webp
└── fonts/
    ├── inter.woff2
    └── mono.woff2
```

أسماء الملفات المُجزّأة (`main.a1b2c3d4.js`) مهمة. فمعظم أدوات بناء الواجهة الأمامية (Vite وwebpack وNext.js) تضيف تجزئات محتوى إلى أسماء الملفات حتى تحمل الملفات الجديدة أسماء مختلفة عند نشر نسخة جديدة، فلا تتداخل الملفات القديمة المخزنة مؤقتًا. يُسمى هذا **إبطال التخزين المؤقت**، وهو يتناغم مع سلوك التخزين المؤقت في S3 وCloudFront.

### سرد الكائنات حسب البادئة

يمكنك سرد كل الكائنات تحت بادئة محددة:

```bash
aws s3 ls s3://my-frontend-app-assets/assets/ \
  --region us-east-1
```

أو الحصول على سرد مفصّل بأمر `s3api`:

```bash
aws s3api list-objects-v2 \
  --bucket my-frontend-app-assets \
  --prefix "assets/" \
  --region us-east-1 \
  --output json
```

```json
{
  "Contents": [
    {
      "Key": "assets/main.a1b2c3d4.js",
      "LastModified": "2026-03-18T12:00:00.000Z",
      "Size": 245678,
      "StorageClass": "STANDARD"
    },
    {
      "Key": "assets/main.e5f6g7h8.css",
      "LastModified": "2026-03-18T12:00:00.000Z",
      "Size": 34567,
      "StorageClass": "STANDARD"
    }
  ]
}
```

## الرفع نفسه باستخدام SDK

سكربتات البناء وأدوات نشر التطبيقات بلا خادم والتطبيقات التي ترفع محتوى المستخدمين كلها تلجأ إلى SDK بدلًا من تنفيذ أوامر shell. وإليك مكافئات SDK للأوامر أعلاه:

```typescript
import { readFile } from 'node:fs/promises';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3 = new S3Client({ region: 'us-east-1' });

// Single-object upload (the SDK equivalent of `aws s3 cp`):
await s3.send(
  new PutObjectCommand({
    Bucket: 'my-frontend-app-assets',
    Key: 'index.html',
    Body: await readFile('./build/index.html'),
    ContentType: 'text/html',
    CacheControl: 'public, max-age=60',
  }),
);

// Streaming upload for large files — use @aws-sdk/lib-storage's `Upload`
// helper, which handles multipart automatically once the body exceeds
// the part threshold. `aws s3 cp` does this implicitly for you.
import { createReadStream } from 'node:fs';
await new Upload({
  client: s3,
  params: {
    Bucket: 'my-frontend-app-assets',
    Key: 'assets/bundle.zip',
    Body: createReadStream('./build/bundle.zip'),
    ContentType: 'application/zip',
  },
}).done();
```

لا يوجد في SDK مكافئ مباشر لـ `aws s3 sync`—فـ `sync` تسهيل على مستوى CLI يمشي عبر دليل، ويقارنه بالحاوية، ويصدر استدعاءات `PutObject`/`DeleteObject` لكل ملف. وإعادة إنتاجه بنفسك تعني جولة `fs.readdir` زائد `PutObjectCommand` لكل ملف تغيّر. وبالنسبة إلى سكربتات النشر، عادةً يكون تنفيذ `aws s3 sync` من Node أبسط من إعادة بناء منطق الفروق. ويفوز SDK عندما ترفع محتوى *التطبيق*—صور المستخدمين الرمزية، وتصديرات CSV، والتقارير المولّدة—ملفًا واحدًا في كل مرة.

## الرفع من وحدة التحكم

تعمل وحدة تحكم AWS جيدًا لرفع ملف أو ملفين أثناء التطوير. انتقل إلى S3، وانقر على حاويتك، وانقر «Upload»، واسحب ملفاتك إليها. بل تتيح لك وحدة التحكم تعيين البيانات الوصفية (بما في ذلك نوع المحتوى) لكل ملف.

![مربع حوار الرفع في S3 يعرض منطقة السحب والإفلات قبل إضافة أي ملفات.](/images/kinney/656328e94b299001.webp)

بعد إفلات ملفاتك، يضعها مربع حوار الرفع في قائمة للمراجعة قبل أن تنقر **Upload**.

![مربع حوار الرفع في S3 مع أربعة ملفات في القائمة: index.html وerror.html وstyles.css وapp.js.](/images/kinney/d127b7280063626e.webp)

بعد اكتمال الرفع، تعرض وحدة التحكم ملخص نجاح، ويمكنك رؤية الملفات الأربعة كلها مسرودة في علامة تبويب **Objects** الخاصة بالحاوية.

![صفحة نجاح الرفع في S3 تؤكد رفع الملفات الأربعة بنجاح.](/images/kinney/ff975818d0c17a55.webp)

![علامة تبويب Objects في حاوية S3 تسرد index.html وerror.html وstyles.css وapp.js مع أحجامها وتواريخ آخر تعديل.](/images/kinney/92e1343b83f83889.webp)

يمكنك أيضًا فحص كائن فردي للتحقق من نوع محتواه. انقر على أي ملف في علامة تبويب Objects لفتح صفحة تفاصيله، ثم مرّر إلى **Metadata**.

![صفحة تفاصيل كائن S3 للملف index.html تُظهر حقل البيانات الوصفية Content-Type معيَّنًا إلى text/html.](/images/kinney/a5732d18d33b3a95.webp)

لكن لا تعتمد على وحدة التحكم في النشر. فهي بطيئة وعرضة للخطأ ويستحيل أتمتتها. وCLI هي الأداة الصحيحة لأي شيء ستفعله أكثر من مرة—ولاحقًا في هذه الدورة، ستؤتمت عملية النشر كاملة باستخدام CLI وGitHub Actions.

## سكربت نشر

إليك نمط نشر عملي يجمع ما تعلمته. بعد تشغيل بنائك، زامن المخرجات إلى S3:

```bash
# Build the frontend
npm run build

# Sync to S3, removing old files
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete \
  --exclude ".DS_Store"
```

هذا نشر بأمرين. ليس أنيقًا تمامًا مثل `git push` إلى Vercel، لكن لديك تحكم كامل في ما يُرفع، وإلى أين يذهب، وكيف يُقدَّم. وعندما تضيف إبطال CloudFront إلى هذا السكربت في قسم CloudFront، ستحصل على خط أنابيب نشر يضاهي أي شيء تقدمه Vercel أو Netlify، إلا أنك تملك كل جزء منه.

ملفاتك في الحاوية، لكن لا أحد يراها بعد. فالحاوية مقفلة افتراضيًا مع تفعيل حظر الوصول العام. بعد ذلك، ستكتب **سياسة حاوية** تمنح وصول قراءة عامًا إلى أصولك الثابتة—وتفهم كيف ترتبط سياسات الحاويات بسياسات IAM التي كتبتها في [كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy).
