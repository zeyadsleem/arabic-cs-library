---
title: "تمرين: تخزين سرّ واسترجاعه في Lambda"
lang: ar
source: "https://stevekinney.com/courses/aws/secrets-in-lambda-exercise"
---

ستخزّن سرًّا في Parameter Store، وتكتب دالة Lambda تقرأه عند بدء التشغيل، وتمنح دور تنفيذ الدالة الصلاحيات المناسبة، وتتحقق من أن السلسلة كاملة تعمل عبر API Gateway.

هذا هو سير العمل نفسه الذي ستستخدمه في الإنتاج لإبقاء مفاتيح API بعيدة عن متغيّرات البيئة وعن شيفرة المصدر.

إن أردت نسخة AWS من سير عمل تخزين الأسرار مفتوحة أمامك أثناء العمل، فأبقِ [نظرة عامة على AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) و[وثائق Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) قريبين منك.

## لماذا يهمّ هذا

على Vercel، الأسرار هي متغيّرات بيئة—تضبطها في لوحة التحكم وتثق بالمنصّة. أما على AWS، فأنت تختار أين تعيش الأسرار ومن يستطيع الوصول إليها. وهذا الخيار له عواقب: فالسرّ الموجود في متغيّر بيئة Lambda مرئي لأي شخص يستطيع وصف الدالة. أما السرّ في Parameter Store فمشفَّر بـ KMS، ومحدَّد النطاق بـ IAM، ومُدقَّق في CloudTrail. يجعل هذا التمرين ذلك الفرق ملموسًا.

## مهمتك

1. خزّن مفتاح API لطرف ثالث في Parameter Store على هيئة SecureString
2. اكتب دالة Lambda تقرأ السرّ عند التهيئة وتستخدمه في الاستجابات
3. امنح دور تنفيذ الدالة صلاحية قراءة المُعامل وفك تشفيره
4. استدعِ الدالة وتحقق من قدرتها على الوصول إلى السرّ
5. نادِ الدالة عبر API Gateway من متصفح أو من `curl`

استخدم معرّف الحساب `123456789012`، والمنطقة `us-east-1`، وبيئة التشغيل `nodejs22.x`.

## تخزين السرّ في Parameter Store

أنشئ مُعامل SecureString في المسار `/my-frontend-app/production/third-party-api-key`. استخدم أي قيمة تريدها للسرّ—شيء مثل `sk_test_exercise_abc123` كافٍ.

استخدم `aws ssm put-parameter` مع:

- `--name` مضبوطًا على المسار الكامل
- `--value` مضبوطًا على مفتاح API التجريبي الخاص بك
- `--type` مضبوطًا على `SecureString`
- `--region us-east-1`

بعد إنشائه، تحقّق من وجود المُعامل باسترجاعه بـ`aws ssm get-parameter`. واحرص على تضمين العلم الذي يفكّ تشفير القيمة—فبدونه سترى نصًا مشفّرًا بدلًا من مفتاحك.

### نقطة تحقق

`aws ssm get-parameter --name "/my-frontend-app/production/third-party-api-key" --with-decryption --region us-east-1 --output json` يعيد مُعاملك مع القيمة مفكوكة التشفير.

## كتابة معالج Lambda

أنشئ مشروع Lambda (أو أعد استخدام المشروع من [تمرين دالة Lambda](https://stevekinney.com/courses/aws/lambda-function-exercise)) بالاعتماديات التالية:

```bash
npm install @aws-sdk/client-ssm
npm install -D typescript @types/aws-lambda @types/node
```

اكتب معالجًا في `src/handler.ts` يقوم بما يلي:

1. يستورد `SSMClient` و`GetParameterCommand` من `@aws-sdk/client-ssm`
2. ينشئ عميل SSM على مستوى الوحدة
3. يعلن متغيّرًا على مستوى الوحدة لمفتاح API المخزّن مؤقتًا
4. يعرّف دالة غير متزامنة `loadConfig` تجلب المُعامل (مع فك التشفير) وتخزّنه مؤقتًا—لكنها تتخطى الجلب إن كانت القيمة مخزّنة بالفعل
5. ينادي `loadConfig()` في أعلى المعالج
6. يعيد استجابة JSON تحتوي على `message` وعلى أول 7 أحرف من مفتاح API (لإثبات أن الدالة تستطيع قراءته دون كشف القيمة كاملة)

استخدم النوع `APIGatewayProxyHandlerV2` للمعالج.

ابنِ المشروع وتحقّق من أنه يُترجَم بلا أخطاء.

### نقطة تحقق

تشغيل `npm run build` ينتج `dist/handler.js` دون أخطاء TypeScript.

## تحديث دور التنفيذ

يحتاج دور تنفيذ Lambda الخاص بك (`my-frontend-app-lambda-role`) إلى صلاحيتين جديدتين:

1. **`ssm:GetParameter`** على ARN المُعامل المحدد. تذكّر: ARN المُعامل المسمّى `/my-frontend-app/production/third-party-api-key` هو `arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key`. لاحظ أن المسار في ARN لا يضاعف الشرطة المائلة الأولى.
2. **`kms:Decrypt`** على مفتاح KMS الذي تديره AWS لخدمة SSM، حتى تستطيع الدالة فك تشفير قيمة SecureString.

اكتب ملف JSON للسياسة وأرفقه بدور التنفيذ باستخدام `aws iam put-role-policy` (سياسة مضمّنة) أو `aws iam create-policy` متبوعًا بـ`aws iam attach-role-policy` (سياسة مُدارة). في هذا التمرين، فضّل النهج **المضمّن**—فالسياسة خاصة بهذا الدور وحده ولا تحتاج إلى مشاركتها، وهذا يطابق النمط المستخدم في [أدوار وصلاحيات تنفيذ Lambda](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions). أما السياسات المُدارة فهي الخيار الصحيح عندما تُعاد السياسة نفسها عبر أدوار متعددة.

تحقّق من إرفاق السياسة بسرد سياسات الدور.

### نقطة تحقق

لدور التنفيذ سياسة تمنح `ssm:GetParameter` على ARN المُعامل المحدد و`kms:Decrypt` على مفتاح KMS.

## النشر والاستدعاء

حزّم دالة Lambda وانشرها:

1. ابنِ مشروع TypeScript
2. اضغط محتويات مجلد `dist/` (مع `node_modules/`—احزم `@aws-sdk/client-ssm` رغم أن بيئة التشغيل تتضمنه، حتى تتحكم في نسخة SDK الدقيقة بدلًا من الاعتماد على ما تثبّته AWS في بيئة التشغيل)
3. أنشئ دالة Lambda أو حدّثها

> **نصيحة**
>
> إن كان لديك بالفعل دالة باسم `my-frontend-app-api` من تمرين سابق، فاستخدم `aws lambda update-function-code` بدلًا من `create-function`.

استدعِ الدالة بحدث اختبار:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --payload '{"requestContext":{"http":{"method":"GET","path":"/secret"}},"queryStringParameters":{}}' \
  --cli-binary-format raw-in-base64-out \
  --region us-east-1 \
  --output json \
  response.json
```

اقرأ ملف الاستجابة وتحقّق من أن الدالة أعادت أول 7 أحرف من مفتاح API الخاص بك.

### نقطة تحقق

يحتوي ملف الاستجابة على رمز حالة 200 وجسم يحمل رسالة تؤكد تحميل السرّ. وتطابق بادئة المفتاح أول 7 أحرف من القيمة التي خزّنتها.

## الاختبار عبر API Gateway

إن كانت لديك واجهة HTTP API في API Gateway من [توصيل API Gateway بـ Lambda](https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda)، فأضف مسارًا يشير إلى هذه الدالة—أو استدعِ نقطة النهاية الموجودة إن كانت الدالة موصولة بالفعل.

وإن لم يكن لديك API Gateway مُعدّ، فيمكنك الاختبار باستدعاء سطر الأوامر من القسم السابق. وتكامل API Gateway هدف إضافي.

### نقطة تحقق

طلب `curl` إلى نقطة نهاية API Gateway يعيد استجابة JSON وقد حُمّل السرّ بنجاح.

## التحقق من أن السرّ ليس في متغيّرات البيئة

شغّل `get-function-configuration` وتأكد من أن مفتاح API **ليس** ضمن متغيّرات البيئة:

```bash
aws lambda get-function-configuration \
  --function-name my-frontend-app-api \
  --query 'Environment.Variables' \
  --region us-east-1 \
  --output json
```

ينبغي أن يُظهر الناتج إعدادك غير الحساس (مثل `TABLE_NAME`) دون مفتاح API. فمفتاح API يعيش في Parameter Store، ولا يمكن الوصول إليه إلا عبر SDK بصلاحيات IAM مناسبة.

### نقطة تحقق

متغيّرات بيئة الدالة لا تحتوي على مفتاح API. فالمفتاح موجود في Parameter Store فقط.

## ملخص نقاط التحقق

- مُعامل SecureString موجود في `/my-frontend-app/production/third-party-api-key`
- `aws ssm get-parameter` مع `--with-decryption` يعيد القيمة الصحيحة
- معالج Lambda يُترجَم ويقرأ المُعامل باستخدام `SSMClient`
- دور التنفيذ لديه صلاحيتا `ssm:GetParameter` و`kms:Decrypt`
- استدعاء الدالة يعيد أول 7 أحرف من مفتاح API
- مفتاح API **لا** يظهر في متغيّرات بيئة الدالة

## تشخيص الأعطال

- **المعالج يرمي خطأ وصول عند قراءة المُعامل:** دور التنفيذ تفتقده إما `ssm:GetParameter` لمسار المُعامل أو `kms:Decrypt` للمفتاح الذي يحمي SecureString.
- **النشر ينجح لكن الدالة تعيد `undefined` أو قيمة قديمة:** اسم المُعامل في الشيفرة لا يطابق المسار المخزّن، أو أنك حدّثت المُعامل لكنك لم تعِد نشر الشيفرة التي تشير إليه.
- **السرّ لا يزال يظهر في إعداد الدالة:** لقد أصلحت مسار الجلب لكنك أبقيت متغيّر البيئة القديم في مكانه. أزل السرّ من إعداد Lambda كليًا حتى يكون Parameter Store المصدر الوحيد للحقيقة.

## أهداف إضافية

- **جلب عدة مُعاملات باستخدام `GetParametersByPath`.** خزّن مُعاملًا ثانيًا في `/my-frontend-app/production/api-endpoint` على هيئة `String` عادي. عدّل المعالج ليستخدم `GetParametersByPathCommand` لتحميل كل المُعاملات تحت `/my-frontend-app/production/` في استدعاء واحد. تحقّق من ظهور القيمتين في الاستجابة.
- **أضف مدة صلاحية للتخزين المؤقت.** عدّل دالة `loadConfig` لتعيد جلب المُعامل بعد 5 دقائق بدلًا من تخزينه مؤقتًا إلى ما لا نهاية. اختبر ذلك بتحديث قيمة المُعامل في Parameter Store ثم استدعاء الدالة بعد انتهاء مدة الصلاحية.
- **جرّب امتداد Lambda.** أضف طبقة AWS Parameters and Secrets Lambda Extension إلى دالتك. عدّل المعالج ليجلب المُعامل عبر `http://localhost:2773` بدلًا من SDK. قارن مدة البدء البارد مع الامتداد وبدونه.

حين تكون جاهزًا، تحقّق من عملك مقابل [الحل: تخزين سرّ واسترجاعه في Lambda](https://stevekinney.com/courses/aws/secrets-in-lambda-solution).
