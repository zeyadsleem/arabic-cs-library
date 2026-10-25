---
title: "قراءة البيانات وكتابتها باستخدام SDK"
---

لديك جدول DynamoDB. الآن تحتاج إلى وضع البيانات فيه وإخراجها منه. تعرض DynamoDB أربع عمليات أساسية للعمل مع العناصر الفردية: **PutItem** (إنشاء أو استبدال)، و**GetItem** (قراءة بالمفتاح)، و**UpdateItem** (تحديث جزئي)، و**DeleteItem** (إزالة). وهذه تقابل مباشرةً عمليات CRUD التي بنيتها مئة مرة في تطبيقات الواجهة الأمامية.

إذا أردت نسخة AWS الدقيقة من سلوك الوصول إلى البيانات أثناء القراءة، فإن [دليل مطوّر DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) هو المرجع المعتمد.

يوفّر AWS SDK v3 طريقتين لاستدعاء هذه العمليات. فـ `DynamoDBClient` منخفض المستوى يتطلب منك وصف بياناتك بصيغة واصفات الأنواع في DynamoDB—بتغليف كل نص في `{ S: "value" }` وكل رقم في `{ N: "123" }`. أما `DynamoDBDocumentClient` عالي المستوى فيتولى ذلك التسويق نيابةً عنك، فتعمل بكائنات JavaScript عادية. استخدم عميل المستندات. دائمًا.

## إعداد عميل المستندات

ثبّت حزم SDK في مشروع Lambda لديك:

```bash
cd lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

أنشئ العميل على المستوى الأعلى في ملف المعالج. فالشيفرة خارج دالة المعالج تُنفّذ أثناء مرحلة التهيئة وتُعاد استخدامها عبر الاستدعاءات الدافئة—وأنت لا تريد إنشاء عميل جديد مع كل طلب.

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
```

*ملاحظة:* إنشاء العميل خارج المعالج يعني أنه يبقى عبر الاستدعاءات الدافئة.

الكائن الفارغ `{}` الذي يُمرّر إلى `DynamoDBClient` يعني «استخدم الإعداد الافتراضي»—المنطقة من بيئة تنفيذ Lambda، وبيانات الاعتماد من دور التنفيذ. لست بحاجة إلى كتابة منطقة بشكل صريح أو تمرير مفاتيح وصول.

## PutItem: إنشاء عنصر أو استبداله

يكتب `PutCommand` عنصرًا إلى الجدول. وإذا كان هناك عنصر بالمفتاح الأساسي نفسه موجودًا بالفعل، فإنه يُستبدل كليًا.

```typescript
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

async function createItem(userId: string, itemId: string, title: string) {
  await client.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        userId,
        itemId,
        title,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    }),
  );
}
```

لاحظ أنك تمرّر كائن JavaScript عاديًا كـ `Item`. فعميل المستندات يتولى تحويله إلى الصيغة الداخلية لـ DynamoDB. لست بحاجة إلى `{ S: "user-123" }`—بل تكتب `"user-123"` فقط.

> **تحذير**
>
> يستبدل `PutCommand` العنصر بأكمله إذا وُجد عنصر بالمفتاح نفسه. وإذا أردت تحديث سمات محدّدة دون المساس بغيرها، فاستخدم `UpdateCommand` بدلًا من ذلك. وهذا مصدر شائع لفقدان البيانات—فتجلب عنصرًا، وتعدّل حقلًا واحدًا، ثم تضع العنصر بأكمله، فتكتب فوق تغييرات أجراها طلب آخر بين قراءتك وكتابتك.

## GetItem: القراءة بالمفتاح

يجلب `GetCommand` عنصرًا واحدًا بمفتاحه الأساسي الكامل. أما جدول المفتاح المركّب، فيجب أن تقدّم كلا مفتاحي التقسيم والفرز.

```typescript
import { GetCommand } from '@aws-sdk/lib-dynamodb';

async function getItem(userId: string, itemId: string) {
  const result = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        userId,
        itemId,
      },
    }),
  );

  return result.Item;
}
```

*ملاحظة:* يكون `result.Item` مساويًا لـ `undefined` إذا لم يطابق أي عنصر المفتاح—وهذا ليس خطأً، بل `undefined` فقط.

`GetItem` سريع ورخيص—فهو يقرأ عنصرًا واحدًا بمفتاحه الأساسي بزمن استجابة متوقّع بغض النظر عن حجم الجدول. هذه هي نقطة قوة DynamoDB، وبصراحة، إنها العملية التي أستخدمها أكثر من غيرها.

إذا لم يكن العنصر موجودًا، فإن `result.Item` يساوي `undefined`. لا تُطلق DynamoDB خطأً عند غياب العنصر—بل عليك أن تتحقق من `undefined` بنفسك.

## UpdateItem: التحديثات الجزئية

يعدّل `UpdateCommand` سمات محدّدة في عنصر موجود دون استبداله بأكمله. وهو يستخدم **تعبيرات التحديث**—لغة مصغّرة لوصف التغييرات التي تريد إجراءها.

```typescript
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

async function updateItemStatus(userId: string, itemId: string, status: string) {
  const result = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        userId,
        itemId,
      },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    }),
  );

  return result.Attributes;
}
```

*ملاحظة:* `ReturnValues: 'ALL_NEW'` يُرجع العنصر كاملًا بعد التحديث.

هذا أكثر إسهابًا من PutItem، لكن دعنا نمضي خلاله:

- **`UpdateExpression`**: يصف ما يجب تغييره. و`SET` يعيّن القيم. ويمكنك أيضًا استخدام `REMOVE` لحذف السمات، و`ADD` لزيادة الأرقام، و`DELETE` لإزالة عناصر من المجموعات.
- **`ExpressionAttributeNames`**: يربط أسماء العناصر النائبة (المسبوقة بـ `#`) بأسماء السمات الفعلية. وتحتاج إليه من أجل `status` لأنه كلمة محجوزة في DynamoDB.
- **`ExpressionAttributeValues`**: يربط القيم النائبة (المسبوقة بـ `:`) بالقيم التي تريد تعيينها.
- **`ReturnValues`**: يتحكم بما يُعاد. فـ `ALL_NEW` يُرجع العنصر بأكمله بعد التحديث. ومن الخيارات الأخرى `NONE` (الافتراضي)، و`ALL_OLD`، و`UPDATED_OLD`، و`UPDATED_NEW`.

> **نصيحة**
>
> لدى DynamoDB أكثر من 500 كلمة محجوزة—منها كلمات شائعة مثل `status` و`name` و`data` و`type` و`count`. فإذا حصلت على `ValidationException` بشأن كلمات محجوزة، فغلّف اسم السمة في `ExpressionAttributeNames`. وعادة آمنة: استخدم دائمًا عناصر نائبة بـ `#` لأسماء السمات في التعبيرات.

## الكتابات الشرطية (القفل المتفائل)

يقبل كل من `PutCommand` و`UpdateCommand` تعبير `ConditionExpression` يفشل الكتابة إذا لم يتحقق شرط على العنصر. وهكذا تُنفّذ التزامن المتفائل: اقرأ عنصرًا، وتذكّر رقم إصداره، وعند الكتابة مرة أخرى، اشترط أن الإصدار ما زال مطابقًا.

```typescript
// Two users editing the same list. Fetch current version:
const current = await client.send(
  new GetCommand({
    TableName: TABLE_NAME,
    Key: { userId, listId },
  }),
);
const currentVersion = current.Item?.version ?? 0;

// Write only if the version hasn't changed since we read it:
await client.send(
  new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { userId, listId },
    UpdateExpression: 'SET #n = :name, version = version + :inc',
    ConditionExpression: 'version = :expected',
    ExpressionAttributeNames: { '#n': 'name' },
    ExpressionAttributeValues: {
      ':name': 'Updated name',
      ':inc': 1,
      ':expected': currentVersion,
    },
  }),
);
```

إذا حدّث كاتب آخر العنصر بين قراءتك وكتابتك، يفشل `ConditionExpression` وتُرجع DynamoDB `ConditionalCheckFailedException`. ويمكن لمعالجك التقاط ذلك، وإعادة القراءة، والمحاولة مجددًا—أو عرض 409 للعميل.

يغطي `ConditionExpression` أيضًا «أدرج فقط إذا لم يكن هذا العنصر موجودًا بالفعل» (`attribute_not_exists(userId)` على `PutCommand`)، ما يمنع طلبي POST متزامنين من إنشاء المورد نفسه بالمعرّف نفسه.

## DeleteItem: إزالة عنصر

يزيل `DeleteCommand` عنصرًا بمفتاحه الأساسي.

```typescript
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

async function deleteItem(userId: string, itemId: string) {
  await client.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        userId,
        itemId,
      },
    }),
  );
}
```

إذا لم يكن العنصر موجودًا، ينجح `DeleteCommand` بصمت. لا خطأ ولا استثناء. وهذا عادةً ما تريده—فحذف شيء اختفى بالفعل ليس مشكلة.

## تجميع كل ذلك في معالج

> **تحذير**
>
> في تطبيق حقيقي، لا تقبل `userId` أبدًا من معاملات الاستعلام—فأي مستدعٍ يمكنه تزويرها. اقرأه من `event.requestContext.authorizer?.jwt?.claims?.sub` بعد أن يتحقق مُوثِّق JWT (راجع [مصادقة API Gateway](https://stevekinney.com/courses/aws/api-gateway-authentication)) من الرمز. ونحن نستخدم معاملات الاستعلام هنا كتبسيط تعليمي فقط.

إليك معالجًا كاملًا يستخدم العمليات الأربع كلها، وموجّهًا حسب طريقة HTTP:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  const userId = event.queryStringParameters?.userId;
  const itemId = event.queryStringParameters?.itemId;

  if (!userId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing userId parameter' }),
    };
  }

  try {
    switch (method) {
      case 'GET': {
        if (!itemId) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Missing itemId parameter' }),
          };
        }

        const result = await client.send(
          new GetCommand({
            TableName: TABLE_NAME,
            Key: { userId, itemId },
          }),
        );

        if (!result.Item) {
          return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Item not found' }),
          };
        }

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.Item),
        };
      }

      case 'POST': {
        const body = JSON.parse(event.body ?? '{}');
        const newItemId = crypto.randomUUID();

        await client.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: {
              userId,
              itemId: newItemId,
              title: body.title ?? 'Untitled',
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          }),
        );

        return {
          statusCode: 201,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, itemId: newItemId }),
        };
      }

      case 'DELETE': {
        if (!itemId) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Missing itemId parameter' }),
          };
        }

        await client.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { userId, itemId },
          }),
        );

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deleted: true }),
        };
      }

      default:
        return {
          statusCode: 405,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error('DynamoDB error:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
```

نمط المعالج هذا—تحليل الطريقة، والتحقق من المعاملات، واستدعاء DynamoDB، وإرجاع استجابة—هو النمط نفسه الذي ستستخدمه لكل نقطة نهاية API مدعومة بـ Lambda.

## معدّلات الأداء

خياران في `GetCommand` و`QueryCommand` يستحقّان المعرفة. لا تحتاج أيًّا منهما في التمرين، لكنهما يظهران أول مرة تهتم فيها بالكلفة أو الصحة على نطاق واسع.

**`ProjectionExpression`** يخبر DynamoDB بالسمات التي يجب إرجاعها. فافتراضيًا، كل قراءة تعيد العنصر بأكمله—بما في ذلك سمات كبيرة مثل النصوص الطويلة أو الكائنات الثنائية أو JSON المتداخل. والإسقاط يضيّق الحمولة:

```typescript
const result = await client.send(
  new GetCommand({
    TableName: TABLE_NAME,
    Key: { userId, itemId },
    ProjectionExpression: 'userId, itemId, #n',
    ExpressionAttributeNames: { '#n': 'name' },
  }),
);
```

العنصر النائب `#n` ضروري لأن `name` كلمة محجوزة في DynamoDB—وقاعدة العناصر النائبة نفسها تنطبق على الإسقاطات كما تنطبق على تعبيرات التحديث. وشيء لا تشدّد عليه الوثائق: `ProjectionExpression` لا يقلّل رسوم RCU في `GetItem` (فـ DynamoDB تُفوتر بناءً على حجم العنصر لا الحجم المُعاد) ولا يقلّل RCU في `Query`/`Scan` أيضًا (فهي تُفوتر بالبيانات الممسوحة لا المسقَطة). وما *يفعله* هو تقليل البايتات المنقولة—وهو مفيد للعناصر الكبيرة على نطاق واسع، لا لتمرين تعليمي.

**`ConsistentRead: true`** يفرض قراءة متسقة بقوة مضمونة لرؤية أحدث كتابة مُثبّتة. فافتراضيًا، تكون القراءات متسقة في النهاية: تنتشر الكتابة عبر التخزين الموزّع في DynamoDB في جزء من الثانية، وقد *تُرجع* قراءة خلال تلك النافذة القيمة السابقة. والقراءات القوية تكلف ضعف عدد وحدات RCU.

```typescript
const result = await client.send(
  new GetCommand({
    TableName: TABLE_NAME,
    Key: { userId, itemId },
    ConsistentRead: true,
  }),
);
```

بالنسبة إلى واجهة API خلفية للواجهة الأمامية، الافتراضي (الاتساق في النهاية) هو ما تريده دائمًا تقريبًا—فاحتمال أن يقرأ المستخدم بياناته في المللي ثانية نفسها التي كتبها فيها منخفض، و404 مع إعادة المحاولة مقبول عادةً. ولا تلجأ إلى `ConsistentRead: true` إلا عندما يكتب طلب واحد عنصرًا ويقرأه في الوقت نفسه، ويجب أن تعكس القراءة الكتابة.

## أخطاء شائعة

**نسيان مفتاح الفرز في GetItem أو DeleteItem.** إذا كان جدولك ذا مفتاح مركّب، فيجب تقديم مفتاحي التقسيم والفرز. وتقديم مفتاح التقسيم وحده يُرجع `ValidationException`، لا قائمة بالعناصر المطابقة. ولجلب عدة عناصر بمفتاح التقسيم، استخدم Query (وسنغطيه في الدرس التالي).

**عدم معالجة `undefined` من GetItem.** لا تُطلق DynamoDB خطأً عند غياب العنصر—بل تُرجع `undefined`. فإذا تلقّت واجهتك الأمامية استجابة 200 بلا بيانات ولم تتحقق من ذلك، فستقضي ساعة في تصحيح ما يبدو خطأً في التسلسل.

**حزم SDK.** وقت التشغيل `nodejs22.x` يحزم AWS SDK v3، لذا يُحلّ `@aws-sdk/client-dynamodb` و`@aws-sdk/lib-dynamodb` في وقت التشغيل دون أن يكونا في ملف zip لديك. وللتعلم، هذا جيد. أما للإنتاج، فاحزم SDK بنفسك—فـ AWS تثبّت إصدارًا فرعيًا محدّدًا في وقت التشغيل (لا الأحدث)، وهو يختلف حسب المنطقة. والتحكم في الإصدار في `package.json` الخاص بك يعني أنك لن تُفاجأ أبدًا بتحديث وقت التشغيل.

الآن بعد أن تستطيع قراءة العناصر الفردية وكتابتها، فإن الخطوة التالية هي جلب عدة عناصر دفعة واحدة باستخدام Query وScan—ولماذا يجب أن تفضّل Query دائمًا تقريبًا.
