---
title: "الحل"
---

هذا هو الحل الكامل لتمرين نشر موقع ثابت على S3. وكل أمر معروض مع ناتجه المتوقع لتتمكن من التحقق من كل خطوة.

> **نصيحة**
>
> إن تحرّكت تسميات لوحة التحكم أثناء أدائك هذا التمرين، فأبقِ [درس موقع S3 الثابت](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) و[مرجع أمر `aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) مفتوحين. فـ AWS تغيّر واجهة المستخدم أكثر مما تغيّر المفاهيم الأساسية.

## لماذا يعمل هذا

- تحوّل استضافة المواقع في S3 حاوية مليئة بالكائنات إلى أصل HTTP له سلوك مستند الفهرسة ومستند الخطأ.
- سياسة الحاوية العامة للقراءة هي ما يجعل نقطة نهاية الموقع قابلة للاستخدام من متصفح؛ فالرفع وحده لا يكفي.
- تمنحك الإصدارات مسار استرداد في اللحظة التي تكتب فوق `index.html`، ولهذا تنتمي إلى التمرين نفسه الذي فيه أول عملية نشر.

## إنشاء ملفات الموقع الثابت

> **نصيحة**
>
> هذه الملفات متاحة أيضًا في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/playground/build) إن كنت تفضّل استنساخها بدلًا من إنشائها يدويًا.

أنشئ مجلد `build/` فيه أربعة ملفات:

```bash
mkdir -p build
```

أنشئ `build/index.html`:

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

أنشئ `build/styles.css`:

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

أنشئ `build/app.js`:

```javascript
document.getElementById('timestamp').textContent =
  'Page loaded at: ' + new Date().toLocaleTimeString();
```

أنشئ `build/error.html`:

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

## إنشاء الحاوية

```bash
aws s3 mb s3://my-frontend-app-assets \
  --region us-east-1
```

الناتج المتوقع:

```
make_bucket: my-frontend-app-assets
```

تحقّق:

```bash
aws s3 ls --region us-east-1
```

الناتج المتوقع (سيختلف التاريخ لديك):

```
2026-03-18 12:00:00 my-frontend-app-assets
```

## تعطيل حجب الوصول العام

```bash
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-1
```

لا ينتج هذا الأمر أي مخرجات عند النجاح.

تحقّق:

```bash
aws s3api get-public-access-block \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

الناتج المتوقع:

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

## تطبيق سياسة الحاوية

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

لا ينتج هذا الأمر أي مخرجات عند النجاح.

تحقّق:

```bash
aws s3api get-bucket-policy \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

الناتج المتوقع (تُعاد السياسة كنص JSON داخل حقل `Policy`):

```json
{
  "Policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicReadGetObject\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::my-frontend-app-assets/*\"}]}"
}
```

## رفع الملفات

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1
```

الناتج المتوقع:

```
upload: build/app.js to s3://my-frontend-app-assets/app.js
upload: build/error.html to s3://my-frontend-app-assets/error.html
upload: build/index.html to s3://my-frontend-app-assets/index.html
upload: build/styles.css to s3://my-frontend-app-assets/styles.css
```

تحقّق:

```bash
aws s3 ls s3://my-frontend-app-assets/ \
  --region us-east-1
```

الناتج المتوقع (ستختلف الأحجام والتواريخ):

```
2026-03-18 12:00:00         98 app.js
2026-03-18 12:00:00        587 error.html
2026-03-18 12:00:00        488 index.html
2026-03-18 12:00:00        374 styles.css
```

## تمكين استضافة الموقع الثابت

```bash
aws s3 website s3://my-frontend-app-assets/ \
  --index-document index.html \
  --error-document error.html
```

لا ينتج هذا الأمر أي مخرجات عند النجاح.

تحقّق:

```bash
aws s3api get-bucket-website \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

الناتج المتوقع:

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

افتح عنوان URL هذا في متصفحك:

```
http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
```

ويجب أن ترى:

- العنوان «Hello from S3» في وسط خلفية داكنة
- النص «This site is hosted entirely on Amazon S3.»
- طابعًا زمنيًا يبيّن وقت تحميل الصفحة

![متصفح يعرض موقع S3 الثابت المنشور، وفيه عنوان Hello from S3 على خلفية داكنة وطابع زمني لتحميل الصفحة.](/images/kinney/72c4395efa79b42b.webp)

اختبر صفحة الخطأ بالانتقال إلى مسار غير موجود:

```
http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com/nonexistent
```

ويجب أن ترى صفحة 404 المخصّصة وفيها «This page does not exist.»

ويمكنك التحقق أيضًا باستخدام `curl`:

```bash
curl -s http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com | head -5
```

الناتج المتوقع:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
</html>
```

## تمكين الإصدارات

```bash
aws s3api put-bucket-versioning \
  --bucket my-frontend-app-assets \
  --versioning-configuration Status=Enabled \
  --region us-east-1
```

لا ينتج هذا الأمر أي مخرجات عند النجاح.

تحقّق:

```bash
aws s3api get-bucket-versioning \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

الناتج المتوقع:

```json
{
  "Status": "Enabled"
}
```

## نشر تحديث والتحقق من الإصدارات

عدّل `build/index.html` وغيّر وسم `<h1>`:

```html
<h1>Hello from S3 (v2)</h1>
```

أعد النشر:

```bash
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1
```

الناتج المتوقع (يُرفع الملف المتغيّر فقط):

```
upload: build/index.html to s3://my-frontend-app-assets/index.html
```

تحقّق من أن الإصدارات حفظت النسختين:

```bash
aws s3api list-object-versions \
  --bucket my-frontend-app-assets \
  --prefix "index.html" \
  --region us-east-1 \
  --output json
```

الناتج المتوقع (ستختلف معرّفات الإصدارات):

```json
{
  "Versions": [
    {
      "Key": "index.html",
      "VersionId": "3HL4kqtJvjVBH40Nrjfkd",
      "IsLatest": true,
      "LastModified": "2026-03-18T14:00:00.000Z",
      "Size": 493,
      "StorageClass": "STANDARD"
    },
    {
      "Key": "index.html",
      "VersionId": "2LB2z3tPdN2aRFGhK0mRr",
      "IsLatest": false,
      "LastModified": "2026-03-18T12:00:00.000Z",
      "Size": 488,
      "StorageClass": "STANDARD"
    }
  ]
}
```

المدخل الأول (`IsLatest: true`) هو النسخة المحدّثة التي تحمل «Hello from S3 (v2)». أما المدخل الثاني فهو النسخة الأصلية.

## هدف إضافي: إضافة قاعدة دورة حياة

أنشئ ملفًا اسمه `lifecycle.json`:

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
        "NoncurrentDays": 7
      }
    }
  ]
}
```

طبّقه:

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

الناتج المتوقع:

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
        "NoncurrentDays": 7
      }
    }
  ]
}
```

## هدف إضافي: اختبار التراجع

نزّل النسخة السابقة باستخدام معرّف إصدارها (استخدم معرّف الإصدار الفعلي من ناتج `list-object-versions`):

```bash
aws s3api get-object \
  --bucket my-frontend-app-assets \
  --key "index.html" \
  --version-id "2LB2z3tPdN2aRFGhK0mRr" \
  --region us-east-1 \
  index-old.html
```

أعد رفعها كنسخة حالية:

```bash
aws s3 cp index-old.html s3://my-frontend-app-assets/index.html \
  --region us-east-1
```

حدّث المتصفح — ويجب أن ترى العنوان الأصلي «Hello from S3» (بلا «(v2)»).

## هدف إضافي: التحقق من أنواع المحتوى

افحص نوع محتوى ملف CSS لديك:

```bash
aws s3api head-object \
  --bucket my-frontend-app-assets \
  --key "styles.css" \
  --region us-east-1 \
  --output json
```

الناتج المتوقع (جزئيًا):

```json
{
  "ContentType": "text/css",
  "ContentLength": 374,
  "LastModified": "2026-03-18T12:00:00.000Z"
}
```

يجب أن تكون قيمة `ContentType` هي `text/css`. وافحص ملف JavaScript بالطريقة نفسها — ويجب أن تكون `text/javascript`.

## الخلاصة

لقد نشرت موقعًا ثابتًا على S3 مع:

- حاوية متاحة للعموم بسياسة حاوية
- استضافة موقع ثابت بمستندي الفهرسة والخطأ
- إصدارات مُمكّنة للحماية بالتراجع
- قاعدة دورة حياة لتنظيف الإصدارات القديمة

هذا هو الأساس الذي يبني عليه بقية مسار الاستضافة. وبعد ذلك، ستنتقل إلى التحكم في النطاق وسلطة DNS لتتمكن من التحقق من شهادة ACM بنظافة، ثم تضع CloudFront أمام هذه الحاوية لإضافة HTTPS والتخزين المؤقت العالمي على الحافة وسير عمل نشر سليم.
