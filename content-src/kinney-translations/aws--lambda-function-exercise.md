---
title: "تمرين: بناء دالة Lambda ونشرها"
---

ستبني دالة Lambda وتنشرها من الصفر—بلا معالجات إعداد في وحدة التحكّم، وبلا أطر عمل، وبلا تجريدات. وبحلول نهاية هذا التمرين، سيكون لديك دالة TypeScript تعمل في AWS يمكنك استدعاؤها من سطر الأوامر وقراءة سجلاتها في CloudWatch.

هذا هو سير العمل نفسه الذي ستستخدمه لكل دالة Lambda تنشرها في بقية الدورة. فاعتد عليه الآن.

> **نصيحة**
>
> إن بدت مخرجات وحدة التحكّم أو سطر الأوامر مختلفة قليلًا عند تنفيذك، فأبقِ [مرجع الأمر `aws lambda create-function`](https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html) و[مرجع الأمر `aws lambda update-function-code`](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html) مفتوحين.

## لماذا يهمّ هذا

على Vercel، يعني نشر دالة بلا خادم دفع الشيفرة إلى Git وانتظار المنصّة لتتدبّر الباقي. أما على AWS، فأنت تملك كل خطوة: كتابة المعالج، وإنشاء دور التنفيذ، وتضمين الشيفرة، ونشرها، والتحقّق من أنها تعمل. يبدو هذا عملًا إضافيًا—وهو كذلك—لكنه يعني أنك تفهم بالضبط ما الذي يعمل، وبأي أذونات، وأين تنظر حين ينكسر شيء.

## مهمّتك

ابنِ دالة Lambda باسم `my-frontend-app-api` وانشرها، بحيث:

- تقبل طلب GET مع معامل استعلام اختياري `name`
- تُرجع استجابة JSON تحتوي تحية وطابعًا زمنيًا
- تعمل بدور تنفيذ محدّد النطاق بشكل صحيح (أذونات التسجيل فقط)
- يمكن استدعاؤها من سطر الأوامر بحدث اختبار

استخدم معرّف الحساب `123456789012`، والمنطقة `us-east-1`، وبيئة التشغيل `nodejs22.x`.

## إعداد المشروع

أنشئ بنية المشروع:

```bash
mkdir -p lambda/src
cd lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
```

أنشئ `tsconfig.json` في دليل `lambda/` بهدف وحدة `commonjs`، وهدف `ES2022`، والوضع الصارم مُفعّلًا، والمخرجات إلى `dist/`.

### نقطة تحقّق

أصبح لديك دليل `lambda/` يحتوي `package.json` و`tsconfig.json` و`node_modules/` ودليل `src/` فارغ.

## كتابة المعالج

أنشئ `src/handler.ts` بمعالج يقوم بما يلي:

1. يستخدم النوع `APIGatewayProxyHandlerV2` من `@types/aws-lambda`
2. يقرأ معامل الاستعلام `name` من الحدث، بقيمة افتراضية `"World"`
3. يُرجع استجابة 200 مع `Content-Type: application/json`
4. ينبغي أن يكون جسم الاستجابة كائن JSON يحتوي `greeting` (سلسلة مثل `"Hello, World!"`) و`timestamp` (سلسلة تاريخ بصيغة ISO 8601)

أضف سكربت بناء إلى `package.json` يشغّل `tsc`، ثم ابنِ المشروع.

### نقطة تحقّق

تشغيل `npm run build` يُنتج `dist/handler.js` بلا أخطاء TypeScript.

## إنشاء دور التنفيذ

أنشئ ملف سياسة ثقة (`trust-policy.json`) يسمح لخدمة Lambda (`lambda.amazonaws.com`) بافتراض الدور.

استخدم سطر الأوامر من أجل:

1. إنشاء دور باسم `my-frontend-app-lambda-role` بسياسة الثقة تلك
2. إرفاق السياسة المُدارة `AWSLambdaBasicExecutionRole` بالدور

تذكّر:

- تحتاج سياسة الثقة إلى `sts:AssumeRole` كإجراء و`lambda.amazonaws.com` كأصل
- ARN الخاص بالسياسة المُدارة هو `arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`
- لقد غطّيت العلاقة بين الأدوار وسياسات الثقة وسياسات الأذونات في [النموذج الذهني لـIAM](https://stevekinney.com/courses/aws/iam-mental-model) و[كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy)

### نقطة تحقّق

يعيد `aws iam get-role --role-name my-frontend-app-lambda-role` الدور بسياسة الثقة الصحيحة. ويعرض `aws iam list-attached-role-policies --role-name my-frontend-app-lambda-role` السياسة `AWSLambdaBasicExecutionRole`.

## التضمين والنشر

أنشئ ملف zip الخاص بالنشر من المخرجات المُصرّفة:

1. انتقل إلى دليل `dist/`
2. اضغط المحتويات (لا الدليل نفسه)
3. استخدم `aws lambda create-function` مع اسم الدالة وبيئة التشغيل وARN الدور ومسار المعالج وملف zip و`--architectures arm64`

ينبغي أن يكون مسار المعالج `handler.handler`—فكلمة `handler` الأولى هي اسم الملف (بدون `.js`)، والثانية هي اسم الدالة المُصدَّرة.

### نقطة تحقّق

يعيد `aws lambda get-function --function-name my-frontend-app-api --region us-east-1` تهيئة الدالة عارضًا `nodejs22.x` كبيئة تشغيل وARN دور التنفيذ لديك.

## استدعاء الدالة

أنشئ ملف حدث اختبار (`test-event.json`) يحاكي طلب GET مع معامل الاستعلام `name=Lambda`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/greeting"
    }
  },
  "queryStringParameters": {
    "name": "Lambda"
  }
}
```

استدعِ الدالة باستخدام سطر الأوامر واقرأ ملف الاستجابة.

### نقطة تحقّق

يحتوي ملف الاستجابة على كائن JSON فيه `statusCode: 200` وجسم يتضمّن، عند تحليله، `greeting: "Hello, Lambda!"` و`timestamp` صالحًا.

## الاستدعاء دون معامل اسم

أنشئ حدث اختبار ثانيًا بلا `queryStringParameters` (أو احذف الحقل كليًا) واستدعِ الدالة مرة أخرى.

### نقطة تحقّق

تتضمّن الاستجابة `greeting: "Hello, World!"`—أي أن قيمتك الافتراضية تعمل بشكل صحيح.

## قراءة السجلات

بعد استدعاء الدالة، تحقّق من أن السجلات تتدفق إلى CloudWatch. وتأكّد من وجود مجموعة السجلات `/aws/lambda/my-frontend-app-api`:

```bash
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \
  --region us-east-1 \
  --output json
```

### نقطة تحقّق

مجموعة السجلات موجودة وتحتوي على تدفّق سجلات واحد على الأقل مع أحداث من استدعاءاتك.

## ملخّص نقاط التحقّق

- مشروع `lambda/` يُبنى بـ`npm run build` ويُنتج `dist/handler.js`
- دور IAM باسم `my-frontend-app-lambda-role` موجود بسياسة الثقة الصحيحة
- السياسة `AWSLambdaBasicExecutionRole` مُرفقة بالدور
- دالة `my-frontend-app-api` منشورة ببيئة تشغيل `nodejs22.x` ومعمارية `arm64`
- الاستدعاء بـ`name=Lambda` يعيد `"Hello, Lambda!"`
- الاستدعاء دون اسم يعيد `"Hello, World!"`
- مجموعة سجلات CloudWatch `/aws/lambda/my-frontend-app-api` موجودة ولديها أحداث سجل

## تشخيص الأعطال

- **يفشل `create-function` لأن Lambda لا تستطيع افتراض الدور:** سياسة الثقة خاطئة. يجب أن يثق الدور بأصل الخدمة `lambda.amazonaws.com`.
- **يفشل الاستدعاء بخطأ `Runtime.ImportModuleError` أو `Cannot find module`:** بنية ملف zip خاطئة، أو مسار المعالج لا يطابق الملف المنشور، أو أن `dist/handler.js` لم يُبنَ قبل التضمين.
- **تعمل الدالة لكن لا تظهر سجلات في CloudWatch:** دور التنفيذ يفتقد `AWSLambdaBasicExecutionRole`، أو أنك فحصت السجلات قبل أن يُنشئ أول استدعاء ناجح التدفّق.

## أهداف إضافية

- **أضف متغيّر بيئة.** اضبط متغيّر بيئة `GREETING_PREFIX` (مثل `"Howdy"`) واستخدمه في معالجك بدلًا من تثبيت `"Hello"` في الشيفرة. تحقّق من التغيير باستدعاء الدالة وفحص الاستجابة.
- **افحص مدة البدء البارد.** استدعِ الدالة مع `--log-type Tail` وفكّ ترميز مخرجات السجل بصيغة base64. وابحث عن حقل `Init Duration`. ثم استدعِها مرة أخرى وتأكّد من أن الاستدعاء الثاني لا يحتوي `Init Duration`—فهو بدء دافئ. هذا من الأمور التي تكون رؤيتها بنفسك أكثر إشباعًا بكثير من القراءة عنها.
- **قِس حجم حزمة النشر.** افحص حجم `function.zip`. جرّب إضافة اعتمادية (مثل `lodash`) لترى كيف يتغيّر حجم ملف zip. ثم أزلها—فأنت لا تحتاجها، وإبقاء الحزمة صغيرة يهمّ لأداء البدء البارد.

حين تصبح جاهزًا، قارن عملك بـ[الحل: بناء دالة Lambda ونشرها](https://stevekinney.com/courses/aws/lambda-function-solution).
