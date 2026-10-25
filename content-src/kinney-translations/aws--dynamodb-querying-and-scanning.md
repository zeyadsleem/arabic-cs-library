---
title: "الاستعلام والمسح الضوئي في DynamoDB"
---

يجلب GetItem عنصرًا واحدًا بمفتاحه الأساسي الدقيق. لكن تطبيقات الواجهة الأمامية نادرًا ما تحتاج عنصرًا واحدًا في المرة—تحتاج إلى قائمة. «أرني كل عناصر هذا المستخدم». «أرني عناصر هذا المستخدم المنشأة بعد تاريخ معيّن». يمنحك DynamoDB أداتين لاسترجاع عناصر متعددة: **Query** و**Scan**. يبدوان متشابهين، لكنهما مختلفان جوهريًا في طريقة عملهما، وتكلفتهما، ومتى ينبغي استخدام كل منهما.

إن أردت صياغة AWS الدقيقة للمقايضة التي تجريها هنا، فأبقِ [دليل Query في DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html) و[دليل Scan في DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html) مفتوحين.

```
flowchart LR
    Query["Query userId = user-123"] --> Partition["Read one matching partition"]
    Partition --> Results["Return sorted items"]
    Scan["Scan table"] --> All["Read every partition"]
    All --> Filter["Filter after reading"]
    Filter --> Cost["Higher latency and read cost"]
```

## Query: الطريقة الصحيحة لقراءة عناصر متعددة

يسترجع **Query** العناصر من قسم واحد. تحدد مفتاح القسم (وهو إلزامي) وتُصفّي اختياريًا بمفتاح الفرز. يعثر DynamoDB على القسم، ويقرأ العناصر داخله، ويعيدها—مرتبة مسبقًا حسب مفتاح الفرز.

هذا فعّال لأن DynamoDB يعرف بالضبط أين ينظر. لا يمسح الجدول بأكمله. يذهب مباشرة إلى القسم الذي حددته ويقرأ فقط العناصر المطابقة لشرط مفتاحك.

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

async function getItemsForUser(userId: string) {
  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }),
  );

  return result.Items ?? [];
}
```

*ملاحظة:* `Items` مصفوفة من كائنات JavaScript العادية، بفضل عميل المستندات.

إن **`KeyConditionExpression`** هو المعامل الحاسم. يحدد قيمة مفتاح القسم التي تريد الاستعلام عنها، ويقيّد مفتاح الفرز اختياريًا. يستخدم التعبير بنية العناصر النائبة نفسها التي رأيتها مع UpdateCommand—القيم المسبوقة بـ `:` تُعرّف في `ExpressionAttributeValues`.

### شروط مفتاح الفرز

يدعم مفتاح الفرز عدة معاملات مقارنة في تعبير شرط المفتاح:

```typescript
// Items where itemId begins with a prefix
const result = await client.send(
  new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'userId = :userId AND begins_with(itemId, :prefix)',
    ExpressionAttributeValues: {
      ':userId': 'user-123',
      ':prefix': 'item-2026',
    },
  }),
);
```

معاملات مفتاح الفرز المتاحة:

| المعامل | مثال | حالة الاستخدام |
| --- | --- | --- |
| `=` | `itemId = :id` | تطابق تام |
| `<`، `<=`، `>`، `>=` | `createdAt > :date` | استعلامات نطاقية على الطوابع الزمنية |
| `BETWEEN` | `itemId BETWEEN :start AND :end` | نطاق بحدّين أدنى وأعلى |
| `begins_with` | `begins_with(itemId, :prefix)` | مطابقة البادئة |

تعمل هذه المعاملات على مفتاح الفرز فقط داخل `KeyConditionExpression`. أما مفتاح القسم فيجب أن يستخدم `=` دائمًا.

### تصفية النتائج

أحيانًا تحتاج إلى التصفية بسمات ليست جزءًا من المفتاح. لهذا تضيف **`FilterExpression`**:

```typescript
async function getPendingItems(userId: string) {
  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':userId': userId,
        ':status': 'pending',
      },
    }),
  );

  return result.Items ?? [];
}
```

> **تحذير**
>
> لا تقلّل `FilterExpression` كمية البيانات التي يقرأها DynamoDB—إنها تقلّل فقط ما يعود في الاستجابة. يقرأ DynamoDB كل العناصر المطابقة لـ `KeyConditionExpression`، ثم يطبّق المرشح على النتائج. ما زلت تدفع ثمن القراءات. إذا كان في القسم 1,000 عنصر وطابق المرشح 10 عناصر، فأنت تُحاسَب على قراءة الألف كلها. المرشحات مفيدة لتقليل نقل الشبكة، لكنها ليست بديلًا عن تصميم مفاتيح جيد.

### الترتيب والتحديد

تُرتَّب العناصر داخل القسم تلقائيًا حسب مفتاح الفرز. يمكنك عكس الترتيب وتحديد عدد العناصر المعادة:

```typescript
async function getRecentItems(userId: string, limit: number) {
  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ScanIndexForward: false,
      Limit: limit,
    }),
  );

  return result.Items ?? [];
}
```

- **`ScanIndexForward: false`** يعكس ترتيب الفرز (تنازليًا حسب مفتاح الفرز). القيمة الافتراضية هي `true` (تصاعديًا).
- **`Limit`** يحدّ عدد العناصر المعادة. ومع عكس ترتيب الفرز، يمنحك هذا «أحدث N عنصرًا»—وهو نمط تستخدمه تطبيقات الواجهة الأمامية باستمرار.

## Scan: قراءة الجدول بأكمله

يقرأ **Scan** كل عنصر في الجدول، صفحة واحدة في المرة. وخلافًا لـ Query الذي يستهدف قسمًا معينًا، يفحص Scan كل عنصر على حدة ويطبّق مرشحًا على النتائج اختياريًا.

```typescript
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

async function getAllItems() {
  const result = await client.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    }),
  );

  return result.Items ?? [];
}
```

هذا يعمل، ولجدول فيه 50 عنصرًا أثناء التطوير، لا بأس به. لكن Scan له تكلفة تنمو خطيًا مع حجم الجدول:

- جدول فيه 100 عنصر: يقرأ Scan 100 عنصر. سريع ورخيص.
- جدول فيه 100,000 عنصر: يقرأ Scan 100,000 عنصر. بطيء ومكلف.
- جدول فيه 10 ملايين عنصر: يقرأ Scan 10 ملايين عنصر. بطيء جدًا ومكلف جدًا.

يعتمد أداء Query على حجم القسم. ويعتمد أداء Scan على حجم الجدول. مع نمو جدولك، يبقى Query سريعًا ويصبح Scan أبطأ.

> **نصيحة**
>
> قاعدة عملية مفيدة: إذا وجدت نفسك تمتدّ يدك إلى Scan، فاسأل هل سيتيح لك تصميم مفاتيح مختلف استخدام Query بدلًا منه. في معظم الحالات، الجواب هو نعم. Scan رائحة كود في DynamoDB—فهو يعني عادةً أن تصميم مفاتيحك لا يطابق أنماط وصولك.

### متى يكون Scan مقبولًا

Scan ليس خاطئًا دائمًا. تشمل حالات الاستخدام المعقولة:

- **أدوات الإدارة** التي تحتاج إلى تصدير الجدول بأكمله أو تدقيقه
- **الجداول الصغيرة** (أقل من بضعة آلاف من العناصر) حيث تكون التكلفة ضئيلة
- **ترحيل البيانات لمرة واحدة** حيث تحتاج إلى لمس كل عنصر
- **التطوير وتصحيح الأخطاء**—مسح جدول فيه 20 عنصرًا تجريبيًا أمر لا بأس به

بالنسبة لنقطة نهاية API في الواجهة الأمامية تعمل في كل طلب، يكاد Scan لا يكون الخيار الصحيح أبدًا.

## الترقيم باستخدام `LastEvaluatedKey`

يعيد كل من Query وScan 1 MB من البيانات كحد أقصى في كل طلب. إذا كانت هناك عناصر أخرى للقراءة، تتضمن الاستجابة `LastEvaluatedKey`—علامة مرجعية تخبر DynamoDB من أين يكمل في الطلب التالي.

```typescript
async function getAllItemsForUser(userId: string) {
  const allItems: Record<string, unknown>[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await client.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
        ExclusiveStartKey: lastKey,
      }),
    );

    allItems.push(...(result.Items ?? []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return allItems;
}
```

النمط:

1. أرسل الطلب الأول دون `ExclusiveStartKey`
2. إذا تضمنت الاستجابة `LastEvaluatedKey`، فأرسل طلبًا آخر بتلك القيمة كـ `ExclusiveStartKey`
3. كرّر حتى تصبح `LastEvaluatedKey` غير معرّفة

بالنسبة لواجهات API الأمامية، لا تريد عادةً ترقيم كل شيء—تريد إعادة صفحة من النتائج إلى العميل وتركه يطلب الصفحة التالية. يمكنك تمرير `LastEvaluatedKey` مرة أخرى إلى الواجهة الأمامية (بترميز base64) كمؤشر ترقيم:

```typescript
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const userId = event.queryStringParameters?.userId;
  const cursor = event.queryStringParameters?.cursor;

  const result = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      Limit: 20,
      ExclusiveStartKey: cursor ? JSON.parse(atob(cursor)) : undefined,
    }),
  );

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: result.Items ?? [],
      nextCursor: result.LastEvaluatedKey ? btoa(JSON.stringify(result.LastEvaluatedKey)) : null,
    }),
  };
};
```

> **نصيحة**
>
> نمط الترقيم القائم على المؤشر شائع في واجهات API المدعومة بـ DynamoDB. يتلقى العميل `nextCursor` مع كل استجابة. وللحصول على الصفحة التالية، يدرج العميل `?cursor=...` في الطلب. عندما تكون `nextCursor` مساوية لـ `null`، لم تبقَ صفحات أخرى.

## Query مقابل Scan: الملخّص

|  | Query | Scan |
| --- | --- | --- |
| يقرأ | قسمًا واحدًا | الجدول بأكمله |
| المعاملات المطلوبة | مفتاح القسم | لا شيء |
| الأداء | ثابت وسريع | يتدهور مع حجم الجدول |
| التكلفة | تتناسب مع العناصر المطابقة | تتناسب مع حجم الجدول |
| يُستخدم لـ | نقاط نهاية التطبيق | أدوات الإدارة والترحيل |

صمّم مفاتيح جدولك حول Query. واستخدم Scan فقط عندما تحتاج حقًا إلى قراءة كل شيء. وجدت أنني إذا أُغريت باللجوء إلى Scan في كود الإنتاج، فهذا يعني دائمًا تقريبًا أنني بحاجة إلى إعادة التفكير في تصميم مفاتيحي.
