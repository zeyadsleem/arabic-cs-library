---
title: "استضافة موقع ثابت على S3"
lang: ar
source: "https://stevekinney.com/courses/aws/static-website-hosting-on-s3"
---

لديك دلو S3 يحتوي على ملفات، وسياسة دلو تسمح بالقراءة العامة. لكن إذا انتقلت الآن إلى `https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/`، فستحصل على صفحة خطأ XML — لأن S3 لا يعرف أنك تريده أن يقدّم `index.html` عندما يصل أحدهم إلى عنوان الجذر. السبب أن السلوك الافتراضي لـ S3 هو تخزين الكائنات، لا استضافة الويب. ولتحويل دلوك إلى موقع فعلي، عليك تفعيل **استضافة الموقع الثابت**.

إذا أردت نسخة AWS الدقيقة من سير عمل استضافة الموقع، فإن [درس S3 لاستضافة المواقع الثابتة](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) هو الدليل الرسمي.

> **نقطة تعلّم، وليست هدف الإنتاج**
>
> هذا الدرس هو النسخة التي تُظهر لك «القطع» في الاستضافة الثابتة. يمنحك نقطة نهاية موقع حقيقية بسرعة، وهو أمر مفيد لفهم كيف يتصرف S3 كأصل ويب. لكنه ليس المعمارية النهائية التي تريد شحنها. لاحقًا ستضع CloudFront أمام دلو خاص وتُخرج الوصول المباشر إلى S3 من الصورة.

## ما الذي تضيفه استضافة الموقع الثابت

بدون استضافة الموقع الثابت، S3 مجرّد مخزن مفتاح-قيمة. تطلب مفتاحًا محددًا فتحصل على كائن محدد. تطلب مفتاحًا غير موجود فتحصل على خطأ XML. تطلب مسار الجذر فلا تحصل على شيء مفيد.

تفعيل استضافة الموقع الثابت يمنحك ثلاثة أشياء:

1. **مستند فهرس**—يقدّم S3 ملفًا افتراضيًا (عادةً `index.html`) عندما يطلب أحدهم مسارًا ينتهي بـ `/`. هذا هو السلوك الذي تتوقعه من أي خادم ويب.
2. **مستند خطأ**—يقدّم S3 صفحة خطأ مخصّصة بدلًا من خطأ XML الافتراضي عندما لا يوجد المفتاح المطلوب.
3. **نقطة نهاية موقع**—يمنحك S3 عنوانًا مخصّصًا يقدّم دلوك كموقع، مع تفعيل سلوك مستند الفهرس ومستند الخطأ.

هذا هو الفرق بين «رفعت ملفات إلى تخزين سحابي» و«لديّ موقع ويب».

## تفعيل استضافة الموقع الثابت

يمكنك تفعيلها بأمر واحد في CLI:

```bash
aws s3 website s3://my-frontend-app-assets/ \
  --index-document index.html \
  --error-document error.html
```

هذا كل شيء. أصبح دلوك الآن مهيّأ لتقديم `index.html` كمستند افتراضي، و`error.html` لأي أخطاء 404.

إذا أردت تحكّمًا أكبر أو احتجت إلى أتمتة ذلك في خط أنابيب، فاستخدم أمر `s3api` الأدنى مستوى:

```bash
aws s3api put-bucket-website \
  --bucket my-frontend-app-assets \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "error.html"}
  }' \
  --region us-east-1
```

يمكنك التحقق من التهيئة:

```bash
aws s3api get-bucket-website \
  --bucket my-frontend-app-assets \
  --region us-east-1 \
  --output json
```

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

قبل التفعيل، يُظهر تبويب **Properties** أن **استضافة الموقع الثابت** في حالة **معطّلة**.

يعرض تبويب Properties في دلو S3 استضافة الموقع الثابت معطّلة في أسفل الصفحة.

في وحدة التحكم، يعرض قسم **Static website hosting** في تبويب **Properties** نموذج التهيئة حيث تُدخل أسماء مستند الفهرس ومستند الخطأ.

يعرض نموذج تعديل استضافة الموقع الثابت في S3 الميزةَ مفعّلة، مع تعيين مستند الفهرس إلى index.html ومستند الخطأ إلى error.html.

بعد الحفظ، يعرض القسم عنوان **Bucket website endpoint** الذي يمكنك فتحه في المتصفح.

يعرض تبويب Properties في دلو S3 استضافة الموقع الثابت مفعّلة، مع إظهار عنوان نقطة نهاية الموقع.

## عنوان نقطة نهاية الموقع

بمجرد تفعيل استضافة الموقع الثابت، يمنحك S3 نقطة نهاية مخصّصة للموقع. يعتمد التنسيق على منطقتك:

```
http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
```

تستخدم بعض المناطق تنسيقًا مختلفًا قليلًا بنقطة بدلًا من شرطة:

```
http://my-frontend-app-assets.s3-website.us-east-1.amazonaws.com
```

في `us-east-1`، التنسيق هو `s3-website-us-east-1` (بشرطة قبل اسم المنطقة).

> **تحذير**
>
> نقاط نهاية مواقع S3 تدعم HTTP فقط، لا HTTPS. إذا حمّلت موقعك عبر عنوان موقع S3، فسيعرضه المتصفح على أنه «غير آمن». هذا أحد الأسباب الرئيسية التي تجعل مسار الإنتاج يضع CloudFront أمام الدلو — لأن CloudFront يمنحك HTTPS بشهادة ACM. في الوقت الحالي، HTTP كافٍ للاختبار والتطوير.

> **نقطة نهاية الموقع مقابل نقطة نهاية REST**
>
> يعرض S3 نقطتَي نهاية مختلفتين لكل دلو. **نقطة نهاية الموقع** (`bucket.s3-website-us-east-1.amazonaws.com`) هي ما تستخدمه في هذا الدرس — وهي تدعم مستندات الفهرس ومستندات الخطأ وإعادة التوجيه، لكن بلا HTTPS وبلا استدعاءات واجهة REST البرمجية من نوع `s3:GetObject`. أما **نقطة نهاية REST** (`bucket.s3.us-east-1.amazonaws.com`) فهي نقطة نهاية واجهة S3 الكاملة — تدعم HTTPS واستدعاءات SDK، لكنها لا تحترم تهيئة استضافة الموقع. عندما تربط CloudFront في [إنشاء توزيع CloudFront](https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution)، ستستخدم **نقطة نهاية REST** كأصل (لا نقطة نهاية الموقع)، لأن CloudFront يتحدث واجهة REST. واستخدام النقطة الخاطئة هنا مصيدة شائعة — فمزيج CloudFront مع نقطة نهاية الموقع *يبدو* ناجحًا حتى تصل إلى OAC أو استجابات الخطأ المخصّصة، ثم يفشل بصمت.

## كيف يعمل مستند الفهرس

مع تفعيل استضافة الموقع الثابت، يتعامل S3 مع طلبات الجذر والمجلدات بالطريقة التي تتوقعها من خادم ويب:

- **`/`** يقدّم `index.html` من جذر الدلو
- **`/about/`** يقدّم `about/index.html` (إن وُجد)
- **`/about`** (بدون شرطة مائلة أخيرة) **لا** يُحلّ تلقائيًا إلى `about/index.html` — وهذا ما يفاجئ الناس

النقطة الأخيرة مهمة. إذا كان لديك ملف بالمفتاح `about/index.html` وانتقل أحدهم إلى `/about` (بلا شرطة مائلة)، فسيعيد S3 رمز 404. الشرطة المائلة الأخيرة مهمة لأن S3 لا يبحث عن لاحقة مستند الفهرس إلا عندما ينتهي المسار بـ `/`. أعني، هذا منطقي بمجرد أن تتذكّر أن S3 ليس خادم ويب حقيقيًا — إنه تخزين كائنات يتظاهر بأنه كذلك.

في تطبيق صفحة واحدة حيث يحدث كل التوجيه في جهة العميل، هذا غير ذي صلة في الغالب — فلديك `index.html` واحد فقط في الجذر، وكل مسار لا يطابق ملفًا حقيقيًا يجب أن يسقط إلى مستند الخطأ (الذي تهيّئه ليكون `index.html` أيضًا). المزيد عن ذلك بعد قليل.

> **نصيحة**
>
> إذا كنت تنشر موقعًا ثابتًا متعدد الصفحات (لا تطبيق صفحة واحدة)، فتأكد من أن أداة البناء لديك تولّد ملفات `index.html` داخل كل مجلد. مثلًا، صفحة «about» يجب أن تكون في `about/index.html`، لا `about.html`. هذا يضمن أن يعمل `/about/` والروابط إلى المجلد بشكل صحيح.

## تهيئة مستند الخطأ لتطبيقات الصفحة الواحدة

إذا كنت تنشر تطبيق صفحة واحدة (React Router أو Vue Router أو ما شابه)، فأنت تحتاج أن يقدّم كل مسار غير مطابق ملف `index.html` كي يتولّاه الموجّه في جهة العميل. على Vercel أو Netlify تهيّئ ذلك بقاعدة `rewrites`. على S3 تضبط مستند الخطأ على `index.html`:

```bash
aws s3 website s3://my-frontend-app-assets/ \
  --index-document index.html \
  --error-document index.html
```

الآن عندما ينتقل أحدهم إلى `/dashboard/settings` ولا يوجد كائن بهذا المفتاح، يقدّم S3 ملف `index.html` مع رمز حالة 404. يلتقطه الموجّه في جهة العميل ويعرض الصفحة الصحيحة.

لكن هناك مشكلة: لا يزال S3 يعيد رمز حالة HTTP 404، رغم أن المستخدم يرى صفحة سليمة. تفسّر محرّكات البحث وبعض الأدوات ذلك الرمز 404 على أنه صفحة معطوبة. وهذا سبب آخر لأهمية CloudFront في معمارية الإنتاج: يستطيع CloudFront إعادة رمز 200 مع الاستمرار في تقديم بديل تطبيق الصفحة الواحدة.

## إنشاء صفحة خطأ

إذا لم تكن تبني تطبيق صفحة واحدة، فأنشئ صفحة خطأ مناسبة. صفحة `error.html` بسيطة:

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
        background: #f5f5f5;
      }
      .error {
        text-align: center;
      }
      h1 {
        font-size: 4rem;
        margin: 0;
        color: #333;
      }
      p {
        color: #666;
        font-size: 1.2rem;
      }
      a {
        color: #0066cc;
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

ارفعها إلى الدلو:

```bash
aws s3 cp ./error.html s3://my-frontend-app-assets/error.html \
  --content-type "text/html" \
  --region us-east-1
```

## جمع كل ذلك معًا

هذا هو التسلسل الكامل للانتقال من الصفر إلى موقع عامل مستضاف على S3. إذا كنت تتابع من البداية، فقد أنجزت معظم هذه الخطوات بالفعل:

```bash
# 1. Create the bucket
aws s3 mb s3://my-frontend-app-assets \
  --region us-east-1

# 2. Disable Block Public Access
aws s3api put-public-access-block \
  --bucket my-frontend-app-assets \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-1

# 3. Apply the bucket policy
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

# 4. Enable static website hosting
aws s3 website s3://my-frontend-app-assets/ \
  --index-document index.html \
  --error-document error.html

# 5. Upload your files
aws s3 sync ./build s3://my-frontend-app-assets \
  --region us-east-1 \
  --delete
```

افتح `http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com` في متصفحك. يجب أن ترى موقعك.

## ما الذي لا يمنحك إياه استضافة S3

استضافة المواقع الثابتة على S3 نقطة انطلاق، لا حلًا كاملًا. إليك ما ينقصك:

- **HTTPS**—نقاط نهاية مواقع S3 تعمل بـ HTTP فقط. تحتاج إلى CloudFront وشهادة ACM من أجل HTTPS.
- **الأداء العالمي**—يقدّم S3 الملفات من منطقة واحدة. المستخدمون على الجانب الآخر من العالم يحصلون على زمن استجابة أعلى. أما CloudFront فيخزّن الملفات مؤقتًا في مواقع حافة حول العالم.
- **نطاق مخصّص**—نقطة نهاية موقع S3 ليست عنوانًا جميلًا. تحتاج إلى Route 53 (أو مزوّد DNS آخر) لاستخدام نطاقك الخاص.
- **التحكم في التخزين المؤقت**—يقدّم S3 الملفات بترويسات تخزين مؤقت افتراضية. أما CloudFront فيمنحك تحكمًا دقيقًا في سلوك التخزين المؤقت ومدد TTL.

كل هذه الفجوات يسدّها بقية مسار الاستضافة الثابتة. S3 هو الأساس — المكان الذي تعيش فيه ملفاتك. أما التحكم في النطاق وACM وCloudFront وRoute 53 فهي الطبقات التي تحوّله إلى نشر بمستوى الإنتاج.

موقعك الآن حيّ على S3، لكن ماذا يحدث عندما تكتب فوق ملف بالخطأ أو تحذف شيئًا ما كان يجب حذفه؟ في الدرس التالي ستُفعّل **الإصدارات** للحماية من فقدان البيانات غير المقصود، وتُعدّ قواعد دورة الحياة لإدارة تكاليف التخزين، وتفهم كيف يعمل تسعير S3 حتى لا تكون هناك مفاجآت في فاتورتك.
