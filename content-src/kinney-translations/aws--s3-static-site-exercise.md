---
title: "تمرين: نشر موقع ثابت على S3"
---

لقد تعلمت الأجزاء المنفردة: إنشاء دلو، ورفع الملفات، وكتابة سياسة دلو، وتمكين استضافة المواقع الثابتة، وتهيئة الإصدارات. الآن اجمعها كلها. في هذا التمرين، ستنشر موقعًا ثابتًا كاملًا على S3 وتصل إليه في المتصفح.

> **نصيحة**
>
> إذا تحرّكت تسميات وحدة التحكم أثناء إنجازك هذا التمرين، فأبقِ [درس استضافة موقع ثابت على S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) و[مرجع الأمر `aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) مفتوحين. تغيّر AWS واجهة المستخدم أكثر مما تغيّر المفاهيم الأساسية.

## لماذا يهمّ هذا

كل نشر للواجهة الأمامية هو في جوهره الشيء نفسه: خذ مخرجات البناء، وضعها في مكان يمكن الوصول إليه، ووجّه عنوان URL إليها. يخفي Vercel وNetlify هذه العملية خلف `git push`. وإنجازها يدويًا على S3 يعلّمك ما يحدث فعليًا تحت الغطاء—ويمنحك الأساس لخط الأنابيب الآلي الذي ستبنيه لاحقًا في هذه الدورة.

## جهّز موقعك الثابت

أنشئ موقعًا ثابتًا بسيطًا على جهازك المحلي. لا تحتاج إلى إطار عمل—HTML وCSS وJavaScript العادية تكفي.

> **نصيحة**
>
> هذه الملفات متاحة أيضًا في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/playground/build) إذا كنت تفضّل استنساخها بدلًا من إنشائها يدويًا.

أنشئ مجلدًا باسم `build/` يحتوي هذه الملفات الثلاثة:

**`build/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My S3 Static Site</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>Hello from S3</h1>
      <p>This site is hosted entirely on Amazon S3.</p>
      <p id="timestamp"></p>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

**`build/styles.css`**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0a0a;
  color: #ededed;
}

.container {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #999;
  margin-bottom: 0.5rem;
}
```

**`build/app.js`**

```javascript
document.getElementById('timestamp').textContent =
  'Page loaded at: ' + new Date().toLocaleTimeString();
```

**`build/error.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #0a0a0a;
        color: #ededed;
      }
      .error {
        text-align: center;
      }
      h1 {
        font-size: 4rem;
      }
      a {
        color: #4a9eff;
      }
    </style>
  </head>
  <body>
    <div class="error">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <p><a href="/">Go back home</a></p>
    </div>
  </body>
</html>
```

## أنشئ الدلو

أنشئ دلو S3. تذكّر أن أسماء الدلاء فريدة عالميًا—إذا كان `my-frontend-app-assets` محجوزًا، فأضف لاحقة فريدة.

```bash
aws s3 mb s3://my-frontend-app-assets \
  --region us-east-1
```

### نقطة تحقّق

شغّل `aws s3 ls --region us-east-1` وتأكد من ظهور دلوك في القائمة.

## تعطيل حظر الوصول العام

بما أنك تستضيف موقعًا عامًا، فعطّل Block Public Access:

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-1
```

### نقطة تحقّق

شغّل ما يلي وتأكد من أن الإعدادات الأربعة كلها `false`:

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

## تطبيق سياسة دلو

طبّق سياسة دلو تسمح بالقراءة العامة:

```bash
aws s3api put-bucket-policy \
  --bucket my-frontend-app-assets \
  --policy '{
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
  }' \
  --region us-east-1
```

### نقطة تحقّق

شغّل `aws s3api get-bucket-policy --bucket my-frontend-app-assets --region us-east-1 --output json` وتأكد من أن السياسة مطبقة.

## ارفع ملفاتك

زامن مجلد `build/` المحلي مع الدلو:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1
```

### نقطة تحقّق

شغّل `aws s3 ls s3://my-frontend-app-assets/ --region us-east-1` وتأكد من رؤية الملفات الأربعة كلها: `index.html` و`styles.css` و`app.js` و`error.html`.

المخرجات المتوقعة:

```
2026-03-18 12:00:00        456 app.js
2026-03-18 12:00:00        612 error.html
2026-03-18 12:00:00        534 index.html
2026-03-18 12:00:00        423 styles.css
```

## تمكين استضافة المواقع الثابتة

هيّئ الدلو لاستضافة المواقع الثابتة:

```bash
aws s3 website s3://my-frontend-app-assets/ \
  --index-document index.html \
  --error-document error.html
```

### نقطة تحقّق

شغّل ما يلي وتأكد من ضبط مستندي الفهرس والخطأ:

```bash
aws s3api get-bucket-website \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "error.html"
  }
}
```

## اعرض موقعك

افتح عنوان URL هذا في متصفحك (استبدل اسم دلوك الفعلي):

```
http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
```

ينبغي أن ترى صفحة «مرحبًا من S3» مع طابع زمني يعرض الوقت الحالي. ينبغي أن يكون CSS مطبّقًا (خلفية داكنة ونص موسّط) وينبغي أن يعمل JavaScript (يتحدّث الطابع الزمني في كل تحميل للصفحة).

### نقطة تحقّق

- تُحمَّل الصفحة وتعرض «مرحبًا من S3»
- يُطبَّق CSS (خلفية داكنة ونص فاتح)
- يظهر الطابع الزمني في الأسفل
- الانتقال إلى مسار غير موجود (مثل `/nonexistent`) يعرض صفحة 404 المخصصة

## تمكين الإصدارات

مكّن الإصدارات لتكون محميًا من الكتابة فوق الملفات بالخطأ:

```bash
aws s3api put-bucket-versioning \
  --bucket my-frontend-app-assets \
  --versioning-configuration Status=Enabled \
  --region us-east-1
```

### نقطة تحقّق

```bash
aws s3api get-bucket-versioning \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "Status": "Enabled"
}
```

## نشر تحديث

أجرِ تغييرًا على `build/index.html`—حدّث `<h1>` ليقول «مرحبًا من S3 (v2)». ثم أعد النشر:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1
```

حدّث المتصفح. ينبغي أن ترى العنوان المحدّث. الآن اسرد إصدارات `index.html`:

```bash
aws s3api list-object-versions \
  --bucket my-frontend-app-assets \
  --prefix "index.html" \
  --region us-east-1 \
  --output json
```

### نقطة تحقّق

ينبغي أن ترى نسختين من `index.html`—الأصلية والمحدّثة. وينبغي أن يكون حقل `IsLatest` في النسخة الأحدث `true`.

## تشخيص الأعطال

- **نقطة نهاية الموقع تعيد `403 Forbidden`:** أحد الأجزاء الثلاثة للاستضافة العامة مفقود. تحقق من Block Public Access، ثم سياسة الدلو، ثم تهيئة استضافة الموقع بهذا الترتيب.
- **متصفحك يحمّل HTML بأنماط أو JavaScript معطوبة:** إما أن الملفات لم تُزامَن من `build/` أو أن مفاتيح الكائنات لا تطابق أسماء الملفات المشار إليها في `index.html`.
- **رفعت التحديث لكنك ما زلت ترى الصفحة القديمة:** أعد تحميل المتصفح بقوة أو افتح الموقع في نافذة خاصة. مع استضافة المواقع المباشرة على S3، يكون التخزين المؤقت للمتصفح هو السبب عادةً.

## أهداف إضافية

- **أضف قاعدة دورة حياة** تحذف الإصدارات غير الحالية بعد 7 أيام. تحقق منها بـ `get-bucket-lifecycle-configuration`.
- **اختبر التراجع.** نزّل النسخة السابقة من `index.html` باستخدام معرّف إصدارها، ثم أعد رفعها بـ `aws s3 cp`. تأكد من عودة الموقع إلى المحتوى الأصلي.
- **أضف مجلدًا فرعيًا.** أنشئ صفحة `build/about/index.html` وتأكد من أن الانتقال إلى `/about/` (بشرطة مائلة نهائية) يقدّم الصفحة.
- **تحقق من أنواع المحتوى.** شغّل `aws s3api head-object --bucket my-frontend-app-assets --key "styles.css" --region us-east-1 --output json` وتأكد من أن نوع المحتوى هو `text/css`.

## التنظيف

لا يمكن حذف دلو ذي إصدارات حتى تُزال كل نسخة كائن **و**كل علامة حذف. شغّل هاتين المرحلتين—واحدة للإصدارات وواحدة لعلامات الحذف—مع حمايات حتى لا يفشل دلو جديد لا يحتوي على شيء في إحدى القائمتين. ثم أزل الدلو:

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

> **لماذا حمايات الصدفة**
>
> يُرجع `list-object-versions` [المصفوفتين `Versions` و`DeleteMarkers` منفصلتين](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) ويحذف أيًا من المفتاحين تمامًا عندما يكون فارغًا. استعلام `--query` يسترجع المفتاح المفقود يعطيك `null`، وتمرير `{"Objects": null}` (أو `{"Objects": []}`) إلى `delete-objects` يفشل في التحقق من المعاملات—فهو ليس عملية بلا أثر. تتخطى حمايات الصدفة الاستدعاء عندما لا يكون هناك شيء للحذف. تخطَّ أي مرحلة عندما *توجد* مدخلات وسيفشل `aws s3 rb` بـ `BucketNotEmpty`—فعلامات الحذف تُحتسب كائنات. إذا انتهى بك الأمر بأكثر من 1,000 مدخل من أي نوع، فستحتاج أيضًا إلى الترقيم: يحدّ `list-object-versions` كل استجابة عند 1,000.
