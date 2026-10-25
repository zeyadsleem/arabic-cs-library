---
title: "المشروع الختامي: واجهة برمجية متكاملة من الطرف إلى الطرف لتطبيق Scratch Lab"
---

لقد بنيت كل الأجزاء. حان الآن لبناء الواجهة الخلفية التي تتجمّع منها هذه الأجزاء.

هذا هو المشروع الختامي للجزء الثاني—النظير المقابل لـ[تمرين: نشر موقع ثابت من الطرف إلى الطرف](https://stevekinney.com/courses/aws/static-site-deployment-exercise) الذي ختم الجزء الأول. بنهاية هذا التمرين، يجب أن يستطيع تطبيق المفكّرة [Scratch Lab](https://github.com/stevekinney/scratch-lab) أن ينفّذ `fetch()` على واجهة برمجية حقيقية على نطاقك أنت، تصل إلى دالة Lambda حقيقية، تقرأ من جدول DynamoDB حقيقي وتكتب فيه، باستخدام بيانات اعتماد تُجلب من Parameter Store (أو Secrets Manager). كل طبقة تعرّفت عليها، مكدّسة فوق بعضها.

## لماذا يهمّ هذا

كل خدمة بمفردها لعبة. أما حين تُوصَل ببعضها فإنها تصبح واجهة خلفية. السبب في أن الدورة تعلّم Lambda وAPI Gateway وDynamoDB وSecrets Manager كلًا على حدة هو أن الأجزاء المتحركة أسهل في التفكير فيها بمعزل عن غيرها—لكن شحن البرمجيات يعني جمعها معًا والتعايش مع الحواف الخشنة عند نقاط الالتحام. تلك هي المهارة التي يبنيها هذا المشروع الختامي.

## مهمتك

ابنِ واجهة خلفية للملاحظات من أجل [Scratch Lab](https://github.com/stevekinney/scratch-lab) تقوم بما يلي:

- تكشف خمسة مسارات عبر API Gateway HTTP API: `GET /notes` → إعادة كل الملاحظات الخاصة بالمستخدم المُوثَّق. `POST /notes` → إنشاء ملاحظة جديدة وإعادتها. `GET /notes/{noteId}` → إعادة ملاحظة واحدة. `PUT /notes/{noteId}` → تحديث ملاحظة وإعادتها. `DELETE /notes/{noteId}` → حذف ملاحظة.
  - `GET /notes` → إعادة كل الملاحظات الخاصة بالمستخدم المُوثَّق.
  - `POST /notes` → إنشاء ملاحظة جديدة وإعادتها.
  - `GET /notes/{noteId}` → إعادة ملاحظة واحدة.
  - `PUT /notes/{noteId}` → تحديث ملاحظة وإعادتها.
  - `DELETE /notes/{noteId}` → حذف ملاحظة.
- تشغّل دالة Lambda واحدة (`scratch-lab-api`) خلف API Gateway، وتتعامل مع المسارات الخمسة كلها عبر فحص `event.requestContext.http`.
- تحفظ الملاحظات في جدول DynamoDB (`scratch-lab-notes`) بمفتاح تقسيم `userId` ومفتاح ترتيب `noteId`.
- تقرأ مفتاح `SEARCH_API_KEY` العائد لطرف ثالث من Parameter Store أو Secrets Manager عند البدء البارد لدالة Lambda وتخزّنه مؤقتًا في نطاق الوحدة (module scope).
- تعيد استجابات صحيحة من حيث CORS حتى تستطيع واجهة Scratch Lab الأمامية (المقدَّمة من توزيع CloudFront الذي أنشأته في الجزء الأول) أن تنادي الواجهة البرمجية من المتصفح.

يملك Scratch Lab بالفعل طبقة تخزين عبر واجهة برمجية مدمجة فيه. استنسخ المستودع، واضبط متغيّر البيئة `VITE_API_URL` على نقطة نهاية API Gateway الخاصة بك، وسينادي التطبيق واجهتك الخلفية تلقائيًا. ترسل الواجهة الأمامية ترويسة `x-notepad-user-id` مع كل طلب لتحديد هوية المستخدم.

## المتطلبات المسبقة

يجب أن تكون قد أكملت الجزء الأول (الموقع الثابت على CloudFront) وكل دروس الجزء الثاني حتى هذه النقطة. ينبغي أن يكون لديك بالفعل:

- نشر S3 + CloudFront من [تمرين: نشر موقع ثابت من الطرف إلى الطرف](https://stevekinney.com/courses/aws/static-site-deployment-exercise).
- مشروع Lambda عامل من [تمرين: بناء دالة Lambda ونشرها](https://stevekinney.com/courses/aws/lambda-function-exercise).
- HTTP API من [تمرين: بناء واجهة برمجية باستخدام API Gateway وLambda](https://stevekinney.com/courses/aws/api-gateway-lambda-exercise).
- نمط جدول DynamoDB من [تمرين: بناء واجهة برمجية للبيانات باستخدام DynamoDB](https://stevekinney.com/courses/aws/dynamodb-lambda-exercise).
- سرّ مخزَّن وقابل للقراءة من [تمرين: تخزين سرّ واسترجاعه في Lambda](https://stevekinney.com/courses/aws/secrets-in-lambda-exercise).

لا شيء في هذا التمرين يقدّم خدمة لم تستخدمها من قبل. الهدف هو التوصيل، لا الاكتشاف.

## الخطوات التفصيلية

### 1. إنشاء جدول DynamoDB

أنشئ `scratch-lab-notes` بما يلي:

- مفتاح التقسيم: `userId` (String)
- مفتاح الترتيب: `noteId` (String)
- وضع الفوترة: عند الطلب (on-demand)

عُد إلى [الجداول ومفاتيح التقسيم ومفاتيح الترتيب](https://stevekinney.com/courses/aws/dynamodb-tables-and-keys) إن كانت صيغة أعلام `aws dynamodb create-table` غامضة عليك.

### 2. تخزين مفتاح واجهة البحث البرمجية

اختر واحدة من الخدمتين اللتين تعلمتهما:

- **Parameter Store** على هيئة `SecureString` في المسار `/scratch-lab/production/search-api-key`، أو
- **Secrets Manager** في المسار `/scratch-lab/production/search-api-key`.

استخدم ما تشعر معه براحة أكبر. درس [Parameter Store مقابل Secrets Manager](https://stevekinney.com/courses/aws/parameter-store-vs-secrets-manager) هو شجرة القرار.

### 3. تحديث دور تنفيذ Lambda

يحتاج دور التنفيذ الخاص بك إلى:

- `dynamodb:GetItem` و`PutItem` و`DeleteItem` و`Query` على `scratch-lab-notes`.
- `ssm:GetParameter` (و`kms:Decrypt` إن استخدمت `SecureString` مع مفتاح يديره العميل) أو `secretsmanager:GetSecretValue`، بحسب المخزن الذي اخترته.
- `logs:CreateLogGroup` و`logs:CreateLogStream` و`logs:PutLogEvents` (وهي موجودة عادةً بالفعل من أساسيات دور تنفيذ Lambda).

اجعل نطاق كل ARN لمورد محددًا للجدول أو المُعامل أو السرّ المعني. لا تستخدم `*`.

### 4. كتابة معالج Lambda

على المعالج أن:

- يوجّه الطلبات بناءً على `event.requestContext.http.method` و`event.requestContext.http.path`. عبارة `switch` صغيرة على `${method} ${routeKey}` تكفي تمامًا—لست بحاجة إلى إطار عمل للتوجيه.
- يستخرج معرّف المستخدم من ترويسة `x-notepad-user-id`. يولّد Scratch Lab هذا المعرّف تلقائيًا ويرسله مع كل طلب.
- يستخدم DynamoDB Document Client (`@aws-sdk/lib-dynamodb`) حتى لا تضطر إلى تحويل الأنواع يدويًا.
- يحمّل مفتاح واجهة البحث البرمجية مرة واحدة لكل بدء بارد ويخزّنه في متغيّر على مستوى الوحدة. لا تعِد جلبه مع كل استدعاء.
- يعيد ترويسات CORS مع كل استجابة (`Access-Control-Allow-Origin` و`Access-Control-Allow-Methods` و`Access-Control-Allow-Headers`).

ثمة تفصيل يستحق أن تُحسنه: يجب أن يعيد `GET /notes` مصفوفة `Note[]` مسطّحة، لا كائنًا يغلّفها مثل `{ notes: [...] }`. تنادي واجهة Scratch Lab الأمامية `response.json()` وتتوقع المصفوفة مباشرة.

### 5. توصيل مسارات API Gateway

أنشئ خمسة مسارات على HTTP API الموجود لديك، ويكون `scratch-lab-api` هدف التكامل مع Lambda في كل منها:

```
GET    /notes
POST   /notes
GET    /notes/{noteId}
PUT    /notes/{noteId}
DELETE /notes/{noteId}
```

فعّل CORS على الواجهة البرمجية مع نطاق CloudFront الخاص بك كأصل مسموح. تأكد من أن الطرق المسموحة تتضمن `PUT` وأن الترويسات المسموحة تتضمن `x-notepad-user-id`. ثم انشر إلى مرحلتك.

### 6. إضافة نطاق مخصص (اختياري لكنه واقعي)

وجّه `api.example.com` إلى مرحلة API Gateway باستخدام النمط الوارد في [المراحل والنشر والنطاقات المخصصة](https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains). يتيح لك ذلك أن تنادي الواجهة الأمامية `fetch('https://api.example.com/notes')` بدلًا من عنوان `*.execute-api.amazonaws.com`.

### 7. النداء من الواجهة الأمامية

استنسخ [Scratch Lab](https://github.com/stevekinney/scratch-lab) واضبط متغيّر البيئة `VITE_API_URL` على نقطة نهاية API Gateway الخاصة بك:

```bash
VITE_API_URL=https://api.example.com npm run dev
```

يتحوّل التطبيق من localStorage إلى الواجهة الخلفية البرمجية تلقائيًا عند ضبط `VITE_API_URL`. أنشئ ملاحظة، وحرّرها، وتحقق من أن الرحلة الكاملة تعمل من الطرف إلى الطرف: المتصفح → Route 53 → API Gateway → Lambda → DynamoDB → الاستجابة → المتصفح.

## نقاط التحقق

- طلب `POST /notes` بجسم JSON يحفظ عنصرًا جديدًا يمكنك رؤيته في وحدة تحكم DynamoDB.
- يعيد `GET /notes` كل الملاحظات الخاصة بقيمة ترويسة `x-notepad-user-id` على هيئة مصفوفة JSON مسطّحة.
- يعيد `GET /notes/{noteId}` ملاحظة واحدة أو استجابة 404.
- يحدّث `PUT /notes/{noteId}` الحقول `title` و`body` و`updatedAt` في الملاحظة، ويعيد طلب GET لاحق القيم الجديدة.
- يحذف `DELETE /notes/{noteId}` العنصر، ويعيد طلب GET لاحق استجابة 404.
- تسجّل Lambda رسالة واحدة «loaded search api key» عند البدء البارد ولا تسجّل شيئًا في الاستدعاءات الدافئة. (أثبت أن التخزين المؤقت يعمل.)
- يستطيع المتصفح نداء الواجهة البرمجية من أصل CloudFront الخاص بك دون خطأ CORS في طلب الفحص المسبق.
- كل ARN لمورد في IAM على دور التنفيذ يشير إلى جدول أو مُعامل أو سرّ محدد، لا إلى `*`.

## تشخيص الأعطال

- **`AccessDeniedException: User is not authorized to perform: dynamodb:...`** — دور التنفيذ تفتقده صلاحية DynamoDB أو أن ARN المورد لا يطابق ARN الجدول الفعلي. نفّذ `aws dynamodb describe-table --table-name scratch-lab-notes --query 'Table.TableArn'` وقارن.
- **خطأ CORS في المتصفح، وLambda لا يسجّل أي وصول** — طلب الفحص المسبق `OPTIONS` يفشل عند API Gateway، لا عند دالة Lambda. أصلح CORS على مستوى الواجهة البرمجية (وجّه `OPTIONS` أو فعّل CORS على الواجهة)، لا داخل المعالج.
- **البدء البارد يستغرق 3 ثوانٍ أو أكثر** — أنت تجلب السرّ وتتصل بـ DynamoDB داخل المعالج بدلًا من نطاق الوحدة. انقل الاثنين إلى `const` على مستوى الوحدة.
- **`ValidationException` عند الكتابة إلى DynamoDB** — أنت تمرّر أنواع JavaScript الأصلية إلى عميل DynamoDB منخفض المستوى بدلًا من Document Client. انتقل إلى `@aws-sdk/lib-dynamodb`.

## أهداف إضافية

- **مصادقة حقيقية.** استبدل ترويسة `x-notepad-user-id` بمُوثِّق JWT على API Gateway، باستخدام مصدر رموز تُصدره مسبقًا. يغطي درس [المصادقة باستخدام API Gateway](https://stevekinney.com/courses/aws/api-gateway-authentication) شكل ذلك.
- **القابلية للملاحظة.** أضف سجلات منظّمة من [مجموعات السجلات وتدفقاتها والتسجيل المنظّم](https://stevekinney.com/courses/aws/cloudwatch-log-groups-and-structured-logging) مع `awsRequestId` في كل سطر سجل، ثم إنذارًا من [الإنذارات والإشعارات باستخدام SNS](https://stevekinney.com/courses/aws/cloudwatch-alarms-and-sns) على معدل استجابات 5xx.
- **البحث من جهة الخادم.** ترسل واجهة Scratch Lab الأمامية بالفعل مُعامل الاستعلام `?search=` مع `GET /notes`. نفّذه في معالج Lambda باستخدام `Scan` من DynamoDB مع `FilterExpression` يفحص `contains(title, :q) OR contains(body, :q)`. هذا مقبول في النطاقات الصغيرة—وإن أزعجك، فذلك بالضبط هو الوقت الذي تلجأ فيه إلى OpenSearch.

حين يعمل كل شيء، تكون قد حصلت على واجهة خلفية حقيقية على AWS بمقاس الإنتاج—كل خدمة من الجزء الثاني موصولة في مسار طلب واحد. وهذا هو مغزى الدورة بأكملها.
