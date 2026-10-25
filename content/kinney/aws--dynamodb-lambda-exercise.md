---
title: "تمرين: بناء واجهة API للبيانات باستخدام DynamoDB"
lang: ar
source: "https://stevekinney.com/courses/aws/dynamodb-lambda-exercise"
---

ستبني واجهة API بيانات كاملة مدعومة بـ DynamoDB. بحلول نهاية هذا التمرين، ستكون لديك نقطة نهاية عاملة يمكن لواجهتك الأمامية استدعاؤها لإنشاء العناصر وسردها وحذفها، مع تخزين البيانات في جدول DynamoDB وتقديمها عبر البنية نفسها من Lambda وAPI Gateway التي أعددتها سابقًا في الدورة.

هذا هو التمرين الذي يتحول فيه «الموقع الثابت» إلى «تطبيق متكامل». وهو محطتي المفضلة في هذه الدورة كلها.

> **نصيحة**
>
> إذا أردت أن تُبقي نسخة AWS من سلوك الجدول والاستعلام مفتوحة أثناء عملك، فأبقِ [مرجع أمر `aws dynamodb create-table`](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html)، و[دليل DynamoDB Query](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html)، و[دليل DynamoDB Scan](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html) قريبة منك.

## لماذا يهم ذلك

على Vercel أو Netlify، قد تستخدم قاعدة بيانات مستضافة مثل PlanetScale أو Supabase وتستدعيها من دالة بلا خادم. على AWS، تبني المكافئ — لكنك تملك كل قطعة. الجدول، والدالة، وطبقة HTTP، والأذونات. عندما يتعطل شيء، تعرف بالضبط أين تنظر. وعندما يكلفك شيء مالًا، تعرف بالضبط السبب.

## مهمتك

ابنِ واجهة API بيانات:

- تخزّن العناصر في جدول DynamoDB باسم `my-frontend-app-data`
- تدعم GET (سرد العناصر لمستخدم) وPOST (إنشاء عنصر) وDELETE (حذف عنصر)
- تعمل كدالة Lambda بالأذونات الصحيحة لـ DynamoDB
- تُرجع رموز حالة HTTP واستجابات JSON مناسبة

استخدم معرّف الحساب `123456789012`، والمنطقة `us-east-1`، وأسماء الجدول والدور من أعراف الدورة.

## إنشاء جدول DynamoDB

أنشئ جدول `my-frontend-app-data` بـ:

- **مفتاح تقسيم** باسم `userId` (سلسلة نصية)
- **مفتاح فرز** باسم `itemId` (سلسلة نصية)
- **فوترة عند الطلب** (`PAY_PER_REQUEST`)

استخدم CLI لإنشاء الجدول وانتظر حتى يصبح نشطًا.

في وحدة التحكم، تعرض قائمة **Tables** حالة الجدول على أنها **Active** بمجرد اكتمال التهيئة.

![قائمة جداول DynamoDB تعرض جدول frontend-items بالحالة Active.](/images/kinney/6cfa6c9fcac2fdb3.webp)

### نقطة تحقق

تشغيل `aws dynamodb describe-table --table-name my-frontend-app-data --region us-east-1 --output json --query "Table.TableStatus"` يُرجع `"ACTIVE"`.

## إضافة أذونات DynamoDB إلى دور Lambda

دور تنفيذ Lambda لديك (`my-frontend-app-lambda-role`) يملك حاليًا أذونات التسجيل فقط. أنشئ سياسة وأرفقها تمنح:

- `dynamodb:GetItem`
- `dynamodb:PutItem`
- `dynamodb:DeleteItem`
- `dynamodb:Query`

قيّد السياسة على ARN الجدول المحدد: `arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data`.

تذكّر مبدأ الامتياز الأدنى من [مبدأ الامتياز الأدنى](https://stevekinney.com/courses/aws/principle-of-least-privilege)—لا تمنح `dynamodb:*` ولا تستخدم `*` كمورد.

### نقطة تحقق

`aws iam list-attached-role-policies --role-name my-frontend-app-lambda-role --region us-east-1 --output json` يعرض كلا من `AWSLambdaBasicExecutionRole` وسياستك الجديدة لـ DynamoDB.

## تثبيت SDK وتحديث المعالج

أضف حزم SDK الخاصة بـ DynamoDB إلى مشروع Lambda لديك:

```bash
cd lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

حدّث `src/handler.ts` ليقوم بما يلي:

1. إنشاء `DynamoDBDocumentClient` على المستوى الأعلى (خارج دالة المعالج)
2. قراءة اسم الجدول من `process.env.TABLE_NAME`، مع الرجوع إلى `my-frontend-app-data`
3. معالجة ثلاث طرق HTTP: **GET**: إذا تم توفير `itemId`، فأرجع ذلك العنصر الواحد (404 إذا لم يوجد). وإذا لم يوجد `itemId`، فاستعلم عن كل العناصر الخاصة بـ `userId` المعطى. **POST**: حلّل جسم الطلب بحثًا عن `title`، وأنشئ `itemId`، واكتب العنصر في DynamoDB. أرجع العنصر المنشأ بحالة 201. **DELETE**: احذف العنصر المحدد بـ `userId` و`itemId`. أرجع `{ "deleted": true }`.
  - **GET**: إذا تم توفير `itemId`، فأرجع ذلك العنصر الواحد (404 إذا لم يوجد). وإذا لم يوجد `itemId`، فاستعلم عن كل العناصر الخاصة بـ `userId` المعطى.
  - **POST**: حلّل جسم الطلب بحثًا عن `title`، وأنشئ `itemId`، واكتب العنصر في DynamoDB. أرجع العنصر المنشأ بحالة 201.
  - **DELETE**: احذف العنصر المحدد بـ `userId` و`itemId`. أرجع `{ "deleted": true }`.
4. إرجاع 400 للمعلمات المطلوبة المفقودة
5. إرجاع 405 لطرق HTTP غير المدعومة
6. التقاط الأخطاء وإرجاع 500 برسالة خطأ عامة

ابنِ المشروع وتحقق من أنه يُصرّف دون أخطاء.

### نقطة تحقق

`npm run build` يكتمل دون أخطاء TypeScript. و`dist/handler.js` موجود.

## تعيين متغير البيئة والنشر

عيّن متغير البيئة `TABLE_NAME` على دالة Lambda لديك:

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data}' \
  --region us-east-1 \
  --output json
```

حزّم وانشر شيفرة المعالج المحدثة.

### نقطة تحقق

`aws lambda get-function-configuration --function-name my-frontend-app-api --region us-east-1 --output json --query "Environment"` يعرض `TABLE_NAME` مضبوطًا على `my-frontend-app-data`.

## اختبار إنشاء عنصر

استدعِ الدالة بحدث POST:

```json
{
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  },
  "body": "{\"title\": \"Learn DynamoDB\"}"
}
```

احفظ هذا باسم `test-create.json` واستدعِ الدالة. تحقق من الاستجابة.

### نقطة تحقق

تحتوي الاستجابة على `statusCode: 201` ويتضمن الجسم `userId` و`itemId` و`title` و`status` و`createdAt`.

## اختبار سرد العناصر

أنشئ عنصرًا ثانيًا بعنوان مختلف (استخدم `userId` نفسه)، ثم استدعِ بحدث GET يتضمن `userId` فقط — دون `itemId`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  }
}
```

### نقطة تحقق

تحتوي الاستجابة على `statusCode: 200` ويتضمن الجسم مصفوفة `items` بالعنصرين اللذين أنشأتهما.

## اختبار حذف عنصر

استخدم `itemId` من أحد العناصر التي أنشأتها. استدعِ بحدث DELETE:

```json
{
  "requestContext": {
    "http": {
      "method": "DELETE",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123",
    "itemId": "item-1234567890"
  }
}
```

استبدل `item-1234567890` بـ `itemId` الفعلي من إحدى استجابات POST لديك. ثم اسرد العناصر مجددًا عبر GET للتأكد من زوال العنصر.

### نقطة تحقق

استجابة DELETE تحتوي على `statusCode: 200` و`{ "deleted": true }`. واستجابة GET اللاحقة للمستخدم نفسه تعرض عنصرًا واحدًا فقط.

## اختبار حالات الخطأ

استدعِ الدالة مع فقدان المعامل `userId` وتأكد من حصولك على استجابة 400. واستدعِ بطريقة غير مدعومة (مثل PUT) وتأكد من حصولك على 405.

### نقطة تحقق

فقدان `userId` يُرجع `statusCode: 400`. والطريقة غير المدعومة تُرجع `statusCode: 405`.

## ملخص نقاط التحقق

- جدول DynamoDB `my-frontend-app-data` موجود وحالته `ACTIVE`
- دور Lambda لديه `AWSLambdaBasicExecutionRole` وسياسة DynamoDB مرفقتان
- المعالج يُصرّف دون أخطاء
- متغير البيئة `TABLE_NAME` مضبوط على دالة Lambda
- POST ينشئ عنصرًا ويُرجع 201
- GET يسرد كل العناصر لمستخدم
- DELETE يحذف عنصرًا
- المعلمات المفقودة تُرجع 400
- الطرق غير المدعومة تُرجع 405

## تشخيص الفشل

- **يفشل استدعاء Lambda بـ `AccessDeniedException`:** دور التنفيذ تفتقد أذونات DynamoDB، أو تشير السياسة إلى ARN جدول خاطئ.
- **تحصل على أخطاء تحقق أو قراءات فارغة حتى بعد كتابة ناجحة:** متغير البيئة `TABLE_NAME` أو أسماء مفاتيح التقسيم والفرز في شيفرتك لا تطابق مخطط الجدول الفعلي.
- **DELETE ينجح لكن العنصر يظهر مجددًا في GET التالي:** أعدت استخدام `itemId` خاطئ، أو لم يتضمن طلب الحذف مفتاح التقسيم `userId` نفسه للعنصر الأصلي.

## أهداف إضافية

- **وصّلها عبر API Gateway.** إذا أكملت تمرين API Gateway، فاربط دالتك بمسار HTTP API واستدعها من `curl` أو المتصفح بدل استخدام `aws lambda invoke`.
- **أضف نقطة نهاية تحديث.** تعامل مع طلبات PATCH التي تحدّث حقل `status` لعنصر موجود باستخدام `UpdateCommand` مع `UpdateExpression`. أرجع العنصر المحدّث بـ `ReturnValues: 'ALL_NEW'`.
- **أضف ترقيم صفحات.** عدّل معالج GET لقبول معامل استعلام `limit` وإرجاع قيمة `nextCursor`. ويمكن للعميل تمرير المؤشر مرة أخرى للحصول على الصفحة التالية من النتائج.

عندما تكون جاهزًا، تحقق من عملك مقابل [الحل: بناء واجهة API للبيانات مدعومة بـ Lambda باستخدام DynamoDB](https://stevekinney.com/courses/aws/dynamodb-lambda-solution).
